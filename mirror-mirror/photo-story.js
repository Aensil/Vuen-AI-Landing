(() => {
  const root = document.querySelector('[data-photo-story]');
  if (!root || root.dataset.enhanced === 'true') return;

  const toggle = root.querySelector('[data-photo-toggle]');
  const toggleLabel = toggle?.querySelector('[data-photo-toggle-label]');
  const replay = root.querySelector('[data-photo-replay]');
  const stageLabel = root.querySelector('[data-photo-stage-label]');
  const stageDescription = root.querySelector('[data-photo-stage-description]');
  const status = root.querySelector('[data-photo-status]');
  const stepButtons = [...root.querySelectorAll('[data-photo-step]')];
  if (!toggle || !toggleLabel || !stageLabel || !stageDescription) return;

  const t = (key, params) => window.MirrorI18n.t(key, params);
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const lifetime = new AbortController();
  const listen = (target, type, handler, options = {}) => target?.addEventListener(type, handler, { ...options, signal: lifetime.signal });
  const durations = [2400, 2300, 3000];
  // Enhanced pages begin at the input photo before entering the viewport.
  // The HTML and reduced-motion experience retain the completed still result.
  let step = preference.matches ? 2 : 0;
  let playing = false;
  let pendingStart = false;
  let hasStarted = false;
  // Playback intention survives temporary visibility/overlay suspension.
  // Explicit Pause or a manually selected step clears it until Play is chosen.
  let wantsPlay = !preference.matches;
  let explicitReducedPlay = false;
  let remaining = durations[step];
  let timer = null;
  let timerStartedAt = 0;
  let scheduleVersion = 0;
  let startFrame = 0;
  let reconcileFrame = 0;
  let pageHidden = false;
  let disposed = false;
  let viewportObserver;
  let overlayObserver;
  let lastAnnouncement = null;

  function visibleFraction() {
    const bounds = root.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) return 0;
    const width = Math.max(0, Math.min(bounds.right, innerWidth) - Math.max(bounds.left, 0));
    const height = Math.max(0, Math.min(bounds.bottom, innerHeight) - Math.max(bounds.top, 0));
    return (width * height) / (bounds.width * bounds.height);
  }

  function canPlay() {
    return !disposed && !pageHidden && !document.hidden && visibleFraction() >= 0.35
      && (!preference.matches || explicitReducedPlay)
      && !root.closest('[inert]') && !document.querySelector('dialog[open]');
  }

  function render() {
    const active = playing || pendingStart;
    const action = active ? 'pause' : 'play';
    root.dataset.step = String(step);
    root.dataset.playing = String(playing);
    toggleLabel.textContent = t(`runtime.photo.${action}`);
    toggle.setAttribute('aria-label', t(`runtime.photo.${action}Label`));
    if (replay) replay.setAttribute('aria-label', t('runtime.photo.replayLabel'));
    stageLabel.textContent = t(`runtime.photo.stage.${step}.title`);
    stageDescription.textContent = t(`runtime.photo.stage.${step}.description`);
    for (const button of stepButtons) {
      button.setAttribute('aria-pressed', String(Number(button.dataset.photoStep) === step));
    }
  }

  // Status is deliberately written only by direct user actions. Automatic
  // stage changes update the visual caption without repeated live announcements.
  function announce(key, params) {
    lastAnnouncement = { key, params };
    renderStatus();
  }

  function renderStatus() {
    if (!status || !lastAnnouncement) return;
    const { key, params } = lastAnnouncement;
    const localized = params?.titleKey ? { ...params, title: t(params.titleKey) } : params;
    status.textContent = t(key, localized);
  }

  function halt() {
    ++scheduleVersion;
    if (timer !== null) {
      remaining = Math.max(0, remaining - (performance.now() - timerStartedAt));
      clearTimeout(timer);
      timer = null;
    }
    if (startFrame) cancelAnimationFrame(startFrame);
    startFrame = 0;
    pendingStart = false;
    playing = false;
  }

  function pause() {
    halt();
    render();
  }

  function scheduleStage() {
    if (!playing) return;
    const version = ++scheduleVersion;
    timerStartedAt = performance.now();
    timer = setTimeout(() => {
      timer = null;
      if (version !== scheduleVersion || !playing) return;
      remaining = 0;
      // Read current geometry and overlay state, not a potentially stale
      // observer entry, before granting the next stage ownership of the timer.
      if (!canPlay()) { pause(); return; }
      step = (step + 1) % durations.length;
      remaining = durations[step];
      render();
      scheduleStage();
    }, remaining);
  }

  function resume() {
    if (playing) return true;
    if (!canPlay()) { pause(); return false; }
    pendingStart = false;
    playing = true;
    render();
    scheduleStage();
    return true;
  }

  function restart() {
    const alreadyAtStart = hasStarted && step === 0;
    halt();
    hasStarted = true;
    step = 0;
    remaining = durations[0];
    pendingStart = canPlay();
    render();
    if (!pendingStart) return;
    if (alreadyAtStart && !preference.matches) {
      // Paint the paused state before restoring data-playing so CSS can
      // restart stage-zero decoration even when the selected step is unchanged.
      startFrame = requestAnimationFrame(() => {
        startFrame = requestAnimationFrame(() => {
          startFrame = 0;
          if (pendingStart) resume();
        });
      });
    } else {
      resume();
    }
  }

  function reconcile() {
    if (disposed) return;
    if ((playing || pendingStart) && !canPlay()) pause();
    // Resume the same stage and remaining time after temporary interruption.
    // Manual pauses/selections retain wantsPlay=false through these callbacks.
    if (!playing && !pendingStart && wantsPlay && canPlay()) {
      if (hasStarted) resume();
      else restart();
    }
  }

  function queueReconcile() {
    if (reconcileFrame || disposed) return;
    reconcileFrame = requestAnimationFrame(() => {
      reconcileFrame = 0;
      reconcile();
    });
  }

  listen(toggle, 'click', () => {
    if (playing || pendingStart) {
      wantsPlay = false;
      pause();
      announce('runtime.photo.status.paused');
    } else {
      wantsPlay = true;
      explicitReducedPlay = preference.matches;
      if (!hasStarted) {
        restart();
        announce(playing || pendingStart ? 'runtime.photo.status.replaying' : 'runtime.photo.status.paused');
      } else {
        announce(resume() ? 'runtime.photo.status.playing' : 'runtime.photo.status.paused');
      }
    }
  });

  listen(replay, 'click', () => {
    wantsPlay = true;
    explicitReducedPlay = preference.matches;
    restart();
    announce(playing || pendingStart ? 'runtime.photo.status.replaying' : 'runtime.photo.status.paused');
  });

  for (const button of stepButtons) {
    listen(button, 'click', () => {
      const next = Number(button.dataset.photoStep);
      if (!Number.isInteger(next) || next < 0 || next > 2) return;
      wantsPlay = false;
      hasStarted = true;
      halt();
      step = next;
      remaining = durations[step];
      render();
      announce('runtime.photo.status.step', {
        number: step + 1,
        titleKey: `runtime.photo.stage.${step}.title`,
      });
    });
  }

  listen(preference, 'change', () => {
    explicitReducedPlay = false;
    if (preference.matches) {
      wantsPlay = false;
      pause();
    }
    reconcile();
  });
  listen(document, 'visibilitychange', reconcile);
  listen(document, 'mirror:languagechange', () => {
    render();
    renderStatus();
  });
  listen(document, 'mirror:contact-open', reconcile);
  listen(window, 'resize', queueReconcile, { passive: true });
  listen(window, 'pagehide', event => {
    pageHidden = true;
    pause();
    if (!event.persisted) {
      disposed = true;
      viewportObserver?.disconnect();
      overlayObserver?.disconnect();
      if (reconcileFrame) cancelAnimationFrame(reconcileFrame);
      lifetime.abort();
    }
  });
  listen(window, 'pageshow', () => { pageHidden = false; reconcile(); });

  if ('IntersectionObserver' in window) {
    viewportObserver = new IntersectionObserver(reconcile, { threshold: [0, 0.01, 0.35] });
    viewportObserver.observe(root);
  } else {
    listen(window, 'scroll', queueReconcile, { passive: true });
  }
  if ('MutationObserver' in window) {
    overlayObserver = new MutationObserver(records => {
      // A rapidly opened-and-closed overlay must still invalidate playback.
      const wasObscured = records.some(record => record.oldValue === null
        && (record.attributeName === 'inert' && record.target.contains(root)
          || record.attributeName === 'open' && record.target.tagName === 'DIALOG'));
      if (wasObscured && (playing || pendingStart)) pause();
      reconcile();
    });
    overlayObserver.observe(document.body, {
      subtree: true, attributes: true, attributeFilter: ['open', 'inert'], attributeOldValue: true,
    });
  }

  render();
  root.dataset.enhanced = 'true';
  reconcile();
})();
