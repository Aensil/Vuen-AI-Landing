(() => {
  const t = (key, params) => window.MirrorI18n.t(key, params);
  const player = document.querySelector('[data-video-player]');
  if (!player || player.dataset.playerReady === 'true') return;
  const video = player.querySelector('video');
  const playButton = player.querySelector('.demo-play');
  const playLabel = player.querySelector('[data-play-label]');
  const loading = player.querySelector('.demo-loading');
  const error = player.querySelector('.demo-error');
  const status = player.querySelector('[data-demo-status]');
  const audioButton = player.querySelector('.demo-audio');
  const chapters = [...player.querySelectorAll('[data-chapter]')];
  if (!video || !playButton || !loading || !error || !status) return;
  const stage = player.querySelector('.demo-stage') || player;
  const main = player.closest('main');
  video.preload = 'none';
  video.autoplay = false;

  let action = 0;
  let pendingSeek = null;
  let state = 'ready';
  let started = false;
  let pauseMessageKey = null;
  let messageKey = 'runtime.media.ready';
  let sourcePreparation = null;
  let sourceReady = false;
  let swappingSource = false;
  let blobUrl = null;
  const originalSource = video.currentSrc || video.querySelector('source')?.src || video.src;

  const messageKeys = {
    ready: 'runtime.media.ready',
    loading: 'runtime.media.loading',
    playing: 'runtime.media.playing',
    paused: 'runtime.media.paused',
    ended: 'runtime.media.ended',
    blocked: 'runtime.media.blocked',
    error: 'runtime.media.error',
  };

  function renderState() {
    player.dataset.state = state;
    playButton.hidden = !['ready', 'ended', 'blocked'].includes(state);
    loading.hidden = state !== 'loading';
    error.hidden = state !== 'error';
    const label = t(state === 'ended' ? 'runtime.media.replay' : state === 'blocked' ? 'runtime.media.retry' : 'runtime.media.play');
    if (playLabel) playLabel.textContent = label;
    playButton.setAttribute('aria-label', t(state === 'ended' ? 'runtime.media.replayLabel' : 'runtime.media.playLabel'));
    const nextMessage = t(messageKey);
    if (status.textContent !== nextMessage) status.textContent = nextMessage;
    player.setAttribute('aria-busy', String(state === 'loading'));
  }

  function setState(next, nextMessageKey) {
    state = next;
    messageKey = nextMessageKey || messageKeys[next];
    renderState();
  }

  function selectChapter(time) {
    let active = null;
    for (const button of chapters) {
      if (time >= Number(button.dataset.chapter)) active = button;
    }
    for (const button of chapters) button.setAttribute('aria-pressed', String(button === active));
  }

  function applyPendingSeek() {
    if (!sourceReady || swappingSource || !pendingSeek || video.readyState < 1 || pendingSeek.action !== action) return;
    const requested = pendingSeek.time;
    const maximum = Number.isFinite(video.duration) ? Math.max(0, video.duration - 0.1) : requested;
    try {
      video.currentTime = Math.min(Math.max(0, requested), maximum);
      pendingSeek = null;
      selectChapter(requested);
    } catch {
      // A delayed metadata/duration event retries the latest requested moment.
    }
  }

  function prepareSeekableSource() {
    if (sourceReady) return Promise.resolve();
    if (sourcePreparation) return sourcePreparation;
    const rangeEnd = video.seekable.length ? video.seekable.end(video.seekable.length - 1) : 0;
    if (Number.isFinite(video.duration) && video.duration > 0 && rangeEnd >= video.duration - 0.1) {
      sourceReady = true;
      return Promise.resolve();
    }
    // Some static hosts return the entire MP4 for Range requests. Chromium can
    // play those responses but exposes [0, 0] as the seekable interval. A single
    // in-memory copy gives native controls and chapter buttons a seekable source.
    const knownUnseekable = video.readyState >= 1 && Number.isFinite(video.duration) && video.seekable.length > 0 && rangeEnd <= 0.1;
    sourcePreparation = (async () => {
      const response = await fetch(originalSource, {
        cache: 'force-cache',
        ...(knownUnseekable ? {} : { headers: { Range: 'bytes=0-0' } }),
      });
      if (response.status === 206) {
        await response.body?.cancel();
        sourceReady = true;
        return;
      }
      if (!response.ok) throw new Error(t('runtime.media.loadError'));
      const blob = await response.blob();
      if (!blob.size) throw new Error(t('runtime.media.emptyError'));
      blobUrl = URL.createObjectURL(blob);
      const resumeAt = video.currentTime || 0;
      swappingSource = true;
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => finish(new Error(t('runtime.media.timeoutError'))), 15000);
        function finish(issue) {
          clearTimeout(timeout);
          video.removeEventListener('loadedmetadata', metadata);
          video.removeEventListener('error', failed);
          swappingSource = false;
          if (issue) { reject(issue); return; }
          sourceReady = true;
          if (pendingSeek?.action === action) applyPendingSeek();
          else if (resumeAt > 0) video.currentTime = Math.min(resumeAt, Math.max(0, video.duration - 0.1));
          resolve();
        }
        const metadata = () => finish();
        const failed = () => finish(new Error(t('runtime.media.decodeError')));
        video.addEventListener('loadedmetadata', metadata);
        video.addEventListener('error', failed);
        video.src = blobUrl;
        video.load();
      });
      sourceReady = true;
    })().catch((issue) => {
      sourcePreparation = null;
      throw issue;
    });
    return sourcePreparation;
  }

  function canPlay() {
    if (document.hidden || player.closest('[inert]') || document.querySelector('#contact-dialog[open]')) return false;
    const bounds = stage.getBoundingClientRect();
    return bounds.width > 0 && bounds.height > 0 && bounds.bottom > 0 && bounds.top < window.innerHeight && bounds.right > 0 && bounds.left < window.innerWidth;
  }

  function startPlayback(time) {
    if (!canPlay()) return;
    const currentAction = ++action;
    pauseMessageKey = null;
    if (video.error) video.load();
    if (Number.isFinite(time)) {
      pendingSeek = { time, action: currentAction };
      selectChapter(time);
    } else if (video.ended) {
      pendingSeek = { time: 0, action: currentAction };
    } else {
      pendingSeek = null;
    }
    setState('loading');
    // One preparation is shared by all clicks. The newest action owns both the
    // pending seek and permission to resume after the source becomes ready.
    prepareSeekableSource().then(() => {
      if (currentAction !== action) return;
      if (!canPlay()) {
        pausePlayback('runtime.media.returnPaused');
        return;
      }
      applyPendingSeek();
      return video.play();
    }).then(() => {
      if (currentAction !== action || video.paused) return;
      applyPendingSeek();
      if (!video.seeking) setState('playing');
    }).catch((issue) => {
      if (currentAction !== action) return;
      pendingSeek = null;
      if (issue?.name === 'AbortError' && video.paused) {
        setState(started ? 'paused' : 'ready');
      } else if (issue?.name === 'NotAllowedError') {
        setState('blocked');
      } else {
        setState('error');
      }
    });
  }

  function pausePlayback(nextMessageKey) {
    if (video.paused && state !== 'loading') return;
    ++action;
    pendingSeek = null;
    pauseMessageKey = nextMessageKey || messageKeys.paused;
    video.pause();
    setState('paused', pauseMessageKey);
  }

  function openDemo(trigger) {
    if (player.closest('[inert]') || document.querySelector('#contact-dialog[open]')) return;
    // A direct jump keeps the activated recording visible before playback starts.
    // It also avoids a smooth-scroll race with the offscreen pause observer.
    player.scrollIntoView({ behavior: 'instant', block: 'center' });
    video.focus({ preventScroll: true });
    const requestedTime = trigger.dataset.demoTime;
    const time = requestedTime === undefined ? undefined : Number(requestedTime);
    startPlayback(Number.isFinite(time) ? time : undefined);
  }

  playButton.addEventListener('click', () => {
    video.focus({ preventScroll: true });
    startPlayback();
  });
  for (const button of chapters) {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => startPlayback(Number(button.dataset.chapter)));
  }

  video.addEventListener('loadedmetadata', applyPendingSeek);
  video.addEventListener('durationchange', applyPendingSeek);
  video.addEventListener('play', () => {
    if (video.paused) return;
    if (!canPlay()) { pausePlayback('runtime.media.obscuredPaused'); return; }
    if (!sourceReady) {
      if (!sourcePreparation) startPlayback();
      setState('loading');
      return;
    }
    pauseMessageKey = null;
    setState('loading');
  });
  video.addEventListener('playing', () => {
    if (video.paused) return;
    if (!canPlay()) { pausePlayback('runtime.media.obscuredPaused'); return; }
    if (!sourceReady) { setState('loading'); return; }
    if (document.hidden) { pausePlayback('runtime.media.backgroundPaused'); return; }
    started = true;
    setState('playing');
  });
  video.addEventListener('waiting', () => { if (!video.paused) setState('loading'); });
  video.addEventListener('stalled', () => { if (!video.paused && video.readyState < 3) setState('loading'); });
  video.addEventListener('seeking', () => { if (!video.paused) setState('loading'); });
  video.addEventListener('seeked', () => {
    if (swappingSource || !sourceReady) return;
    if (!video.paused && video.readyState >= 3) setState('playing');
    selectChapter(video.currentTime);
  });
  video.addEventListener('pause', () => {
    if (!video.paused || swappingSource) return;
    ++action;
    pendingSeek = null;
    if (!video.ended && state !== 'error') setState('paused', pauseMessageKey || messageKeys.paused);
  });
  video.addEventListener('ended', () => { pendingSeek = null; setState('ended'); });
  video.addEventListener('timeupdate', () => { if (!pendingSeek) selectChapter(video.currentTime); });
  const reportError = () => { ++action; pendingSeek = null; setState('error'); };
  video.addEventListener('error', reportError);
  video.querySelectorAll('source').forEach((source) => source.addEventListener('error', reportError));
  window.addEventListener('pagehide', (event) => {
    pausePlayback('runtime.media.demonstrationPaused');
    if (!event.persisted && blobUrl) URL.revokeObjectURL(blobUrl);
  });

  function updateAudio() {
    if (!audioButton) return;
    const audible = !video.muted && video.volume > 0;
    audioButton.textContent = t(audible ? 'runtime.media.soundOn' : 'runtime.media.soundOff');
    audioButton.setAttribute('aria-label', t(audible ? 'runtime.media.muteLabel' : 'runtime.media.unmuteLabel'));
    audioButton.setAttribute('aria-pressed', String(audible));
  }
  audioButton?.addEventListener('click', () => {
    const audible = !video.muted && video.volume > 0;
    video.muted = audible;
    if (!audible && video.volume === 0) video.volume = 1;
    updateAudio();
  });
  video.addEventListener('volumechange', updateAudio);
  document.addEventListener('mirror:languagechange', () => {
    renderState();
    updateAudio();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pausePlayback('runtime.media.backgroundPaused');
  });
  const pauseForContact = () => pausePlayback('runtime.media.contactPaused');
  document.addEventListener('mirror:contact-open', pauseForContact);
  window.addEventListener('mirror:contact-open', pauseForContact);

  if (main && 'MutationObserver' in window) {
    const menuObserver = new MutationObserver((records) => {
      // Opening navigation makes the page inert. Invalidate a pending source
      // request as well as active playback; removing inert never resumes it.
      if (main.hasAttribute('inert') || records.some((record) => record.attributeName === 'inert' && record.oldValue === null)) {
        pausePlayback('runtime.media.navigationPaused');
      }
    });
    menuObserver.observe(main, { attributes: true, attributeFilter: ['inert'], attributeOldValue: true });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(() => {
      // Read current geometry: queued entries can predate a Watch demo jump.
      if (!canPlay()) pausePlayback('runtime.media.offscreenPaused');
    }, { threshold: 0 });
    observer.observe(stage);
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target instanceof Element ? event.target.closest('[data-open-demo]') : null;
    if (!trigger) return;
    event.preventDefault();
    openDemo(trigger);
  });

  player.dataset.playerReady = 'true';
  player.classList.add('is-enhanced');
  video.controls = true;
  video.tabIndex = 0;
  updateAudio();
  setState('ready');
  if (video.error) reportError();
})();
