(() => {
  const t = (key, params) => window.MirrorI18n.t(key, params);
  const root = document.querySelector('.cinematic-experience');
  if (!root || root.dataset.cinematicReady === 'true') return;
  const video = root.querySelector('[data-cinematic-video]');
  const stage = root.querySelector('.cinematic-stage');
  const toggle = root.querySelector('[data-cinematic-toggle]');
  const replay = root.querySelector('[data-cinematic-replay]');
  const label = root.querySelector('[data-cinematic-label]');
  const icon = root.querySelector('[data-cinematic-icon]');
  const status = root.querySelector('.cinematic-status');
  if (!video || !stage || !toggle || !replay) return;

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const lifetime = new AbortController();
  const listen = (target, event, callback) => target?.addEventListener(event, callback, { signal: lifetime.signal });
  let userPaused = document.documentElement.dataset.motionPaused === 'true';
  let explicitReducedPlay = false;
  let visible = false;
  let pageHidden = false;
  let blockedByPolicy = false;
  let failed = false;
  let hasPlayedFrame = false;
  let attempt = 0;
  let pending = false;
  let pendingReplay = false;
  let disposed = false;
  let observer;
  let dialogObserver;
  let statusKey = null;

  // JavaScript owns autoplay so the OS preference and visibility policy apply
  // before any frame is revealed. The separate poster remains visible meanwhile.
  video.autoplay = false;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  video.pause();

  const reducedStopped = () => preference.matches && !explicitReducedPlay;
  const obscured = () => Boolean(document.querySelector('dialog[open], main[inert]'));
  const eligible = () => !disposed && !userPaused && !reducedStopped() && visible && !document.hidden && !pageHidden && !obscured();
  const announce = key => {
    statusKey = key;
    if (status) status.textContent = t(key);
  };

  function render() {
    const wantsPlay = userPaused || reducedStopped() || blockedByPolicy || failed;
    const state = failed ? 'error' : reducedStopped() ? 'reduced' : userPaused ? 'paused' : blockedByPolicy ? 'blocked' : !eligible() ? 'suspended' : pending ? 'loading' : video.paused ? 'paused' : 'playing';
    root.dataset.motionState = state;
    root.dataset.showVideo = String(hasPlayedFrame && !reducedStopped() && !failed);
    toggle.setAttribute('aria-pressed', String(wantsPlay));
    toggle.setAttribute('aria-label', t(failed ? 'runtime.cinematic.retryLabel' : wantsPlay ? 'runtime.cinematic.playLabel' : 'runtime.cinematic.pauseLabel'));
    toggle.title = t(reducedStopped() ? 'runtime.cinematic.reducedTitle' : wantsPlay ? 'runtime.cinematic.playLabel' : 'runtime.cinematic.pauseLabel');
    if (label) label.textContent = t(failed ? 'runtime.cinematic.retry' : wantsPlay ? 'runtime.cinematic.play' : 'runtime.cinematic.pause');
    if (icon) icon.textContent = wantsPlay ? '▶' : 'Ⅱ';
  }

  function stop() {
    ++attempt;
    pending = false;
    if (!video.paused) video.pause();
  }

  function start() {
    if (!eligible() || blockedByPolicy || failed || pending || !video.paused) return;
    const token = ++attempt;
    pending = true;
    render();
    let request;
    try { request = video.play(); }
    catch (error) { handleFailure(error, token); return; }
    Promise.resolve(request).then(() => {
      if (token !== attempt || disposed) {
        if (!eligible() && !video.paused) video.pause();
        return;
      }
      pending = false;
      if (!eligible()) stop();
      else if (!video.paused) hasPlayedFrame = true;
      render();
    }).catch(error => handleFailure(error, token));
  }

  function handleFailure(error, token) {
    if (token !== attempt || disposed) return;
    pending = false;
    if (error?.name === 'NotAllowedError' || error?.name === 'AbortError') {
      // A rejected attempt is retried only by an explicit visitor action.
      blockedByPolicy = true;
      announce('runtime.cinematic.blocked');
    } else {
      failed = true;
      announce('runtime.cinematic.error');
    }
    render();
  }

  function reconcile() {
    if (disposed) return;
    if (!eligible() || blockedByPolicy || failed) stop();
    else start();
    render();
  }

  function sharePause(paused) {
    userPaused = paused;
    document.documentElement.dataset.motionPaused = String(paused);
    document.dispatchEvent(new CustomEvent('mirror:motion-toggle', { bubbles: true, detail: { paused } }));
  }

  function explicitPlay(fromBeginning = false) {
    ++attempt;
    pending = false;
    explicitReducedPlay = preference.matches;
    blockedByPolicy = false;
    const retry = failed || Boolean(video.error);
    failed = false;
    if (retry) { hasPlayedFrame = false; video.load(); }
    if (fromBeginning) {
      pendingReplay = video.readyState < 1;
      if (!pendingReplay) {
        try { video.currentTime = 0; } catch { pendingReplay = true; }
      }
    }
    sharePause(false);
    // Keep the play request inside the initiating click's activation scope.
    reconcile();
    announce(fromBeginning ? 'runtime.cinematic.replaying' : 'runtime.cinematic.playing');
  }

  listen(toggle, 'click', () => {
    if (userPaused || reducedStopped() || blockedByPolicy || failed) explicitPlay();
    else { sharePause(true); reconcile(); announce('runtime.cinematic.paused'); }
  });
  listen(replay, 'click', () => explicitPlay(true));
  const onGlobalToggle = event => {
    if (typeof event.detail?.paused !== 'boolean') return;
    userPaused = event.detail.paused;
    document.documentElement.dataset.motionPaused = String(userPaused);
    reconcile();
  };
  listen(document, 'mirror:motion-toggle', onGlobalToggle);
  listen(window, 'mirror:motion-toggle', onGlobalToggle);
  listen(video, 'loadedmetadata', () => {
    if (!pendingReplay) return;
    try { video.currentTime = 0; pendingReplay = false; } catch { /* Keep the requested replay for the next metadata update. */ }
  });
  listen(video, 'playing', () => {
    if (!eligible() || blockedByPolicy || failed) { stop(); render(); return; }
    hasPlayedFrame = true;
    render();
  });
  listen(video, 'pause', () => {
    if (!video.paused || disposed) return;
    // Browser-initiated pauses (for example Low Power Mode) are not fought with
    // repeated play() calls. The next attempt requires the Play control.
    if (eligible() && !pending && !failed) blockedByPolicy = true;
    render();
  });
  const onMediaError = () => {
    failed = true;
    stop();
    render();
    announce('runtime.cinematic.error');
  };
  listen(video, 'error', onMediaError);
  video.querySelectorAll('source').forEach(source => listen(source, 'error', onMediaError));
  listen(preference, 'change', () => {
    explicitReducedPlay = false;
    if (preference.matches) stop();
    reconcile();
  });
  listen(document, 'visibilitychange', reconcile);
  listen(document, 'mirror:languagechange', () => {
    render();
    if (statusKey && status) status.textContent = t(statusKey);
  });
  listen(document, 'mirror:contact-open', reconcile);
  listen(document, 'mirror:demo-open', reconcile);
  listen(window, 'pagehide', event => {
    pageHidden = true;
    stop();
    if (!event.persisted) {
      disposed = true;
      observer?.disconnect();
      dialogObserver?.disconnect();
      lifetime.abort();
    }
  });
  listen(window, 'pageshow', () => { pageHidden = false; reconcile(); });

  function checkViewport() {
    const bounds = stage.getBoundingClientRect();
    visible = bounds.bottom > 0 && bounds.top < innerHeight && bounds.right > 0 && bounds.left < innerWidth;
  }
  checkViewport();
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= 0.01; reconcile(); }, { threshold: 0.01 });
    observer.observe(stage);
  } else {
    listen(window, 'scroll', () => { checkViewport(); reconcile(); });
    listen(window, 'resize', () => { checkViewport(); reconcile(); });
  }
  dialogObserver = new MutationObserver(reconcile);
  dialogObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open', 'inert'] });
  video.controls = false;
  root.dataset.cinematicReady = 'true';
  if (video.error) failed = true;
  reconcile();
})();
