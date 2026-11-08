(() => {
  const root = document.querySelector('.tryon-experience');
  if (!root || root.dataset.experienceReady === 'true') return;
  const stage = root.querySelector('.experience-stage');
  const toggle = root.querySelector('[data-motion-toggle]');
  const replay = root.querySelector('[data-motion-replay]');
  const steps = [...root.querySelectorAll('[data-motion-step]')];
  const looks = [...root.querySelectorAll('[data-look]')];
  const caption = root.querySelector('.scene-caption');
  const status = root.querySelector('.experience-status');
  const progress = root.querySelector('.experience-progress');
  if (!stage || !toggle || !replay) return;

  const DURATION = 15000;
  const FINAL_FRAME = 8000;
  const STEP_TIMES = [1900, 4200, FINAL_FRAME];
  const LOOK_TIMES = { ivory: 4200, dress: FINAL_FRAME, suit: 12400 };
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const lifetime = new AbortController();
  const listen = (target, event, callback) => target?.addEventListener(event, callback, { signal: lifetime.signal });
  let reduced = media.matches;
  let userPaused = document.documentElement.dataset.motionPaused === 'true';
  let elapsed = reduced || userPaused ? FINAL_FRAME : 0;
  let visible = false;
  let pageHidden = false;
  let running = false;
  let disposed = false;
  let animations = [];
  let frame;
  let resizeFrame;
  let lastPhase = -1;
  let lastLook = '';
  let observer;
  let resizeObserver;
  let dialogObserver;
  let dimensions = [0, 0];

  const at = (seconds, properties) => ({ offset: seconds / 15, ...properties });
  const motion = (x, y, scale = 1) => `translate(${x}px, ${y}px) scale(${scale})`;
  const hasDialog = () => Boolean(document.querySelector('dialog[open]'));
  const timeInLoop = () => ((elapsed % DURATION) + DURATION) % DURATION;

  function track(selector, frames) {
    const target = root.querySelector(selector);
    if (!target) return;
    const animation = target.animate(frames, { duration: DURATION, iterations: Infinity, fill: 'both', easing: 'linear' });
    animation.id = `mirror-experience-${selector.replace(/[^a-z0-9-]/gi, '')}`;
    animation.pause();
    animation.currentTime = elapsed;
    animations.push(animation);
  }

  function pointerTarget(card, pointer, tip = 0.2) {
    if (!card || !pointer) return { x: 0, y: 0 };
    return {
      x: card.offsetLeft + card.offsetWidth * 0.52 - pointer.offsetLeft - pointer.offsetWidth * tip,
      y: card.offsetTop + card.offsetHeight * 0.43 - pointer.offsetTop - pointer.offsetHeight * tip,
    };
  }

  function buildTracks() {
    animations.forEach((animation) => animation.cancel());
    animations = [];
    const dress = root.querySelector('.scene-card--dress');
    const suit = root.querySelector('.scene-card--suit');
    const cursor = root.querySelector('.scene-cursor');
    const tap = root.querySelector('.scene-tap');
    const first = pointerTarget(dress, cursor);
    const second = pointerTarget(suit, cursor);
    const firstTap = pointerTarget(dress, tap, 0.5);
    const secondTap = pointerTarget(suit, tap, 0.5);
    const approach = stage.clientHeight * 0.23;
    track('.scene-mirror', [
      at(0, { opacity: 0, transform: 'translateY(8%) scale(.85)' }),
      at(1.3, { opacity: 1, transform: 'translateY(0%) scale(1)', easing: 'ease-in-out' }),
      at(5, { opacity: 1, transform: 'translateY(-.6%) scale(1)' }),
      at(9, { opacity: 1, transform: 'translateY(0%) scale(1)' }),
      at(12, { opacity: 1, transform: 'translateY(-.5%) scale(1)' }),
      at(14, { opacity: 1, transform: 'translateY(0%) scale(1)', easing: 'ease-in' }),
      at(15, { opacity: 0, transform: 'translateY(8%) scale(.85)' }),
    ]);
    track('.scene-shopper', [
      at(0, { opacity: 0, transform: 'translate(-95%, 0%)' }),
      at(.35, { opacity: 0, transform: 'translate(-95%, 0%)', easing: 'cubic-bezier(.2,.7,.2,1)' }),
      at(2, { opacity: 1, transform: 'translate(0%, 0%)', easing: 'ease-in-out' }),
      at(4, { opacity: 1, transform: 'translate(0%, -.8%)' }),
      at(7, { opacity: 1, transform: 'translate(0%, 0%)' }),
      at(10, { opacity: 1, transform: 'translate(0%, -.6%)' }),
      at(13.7, { opacity: 1, transform: 'translate(0%, 0%)', easing: 'ease-in' }),
      at(15, { opacity: 0, transform: 'translate(-95%, 0%)' }),
    ]);
    track('.scene-shadow', [at(0, { opacity: 0, transform: 'scaleX(.6)' }), at(2, { opacity: .9, transform: 'scaleX(1)' }), at(7, { opacity: .75, transform: 'scaleX(.95)' }), at(11, { opacity: .9, transform: 'scaleX(1)' }), at(14, { opacity: .85, transform: 'scaleX(1)' }), at(15, { opacity: 0, transform: 'scaleX(.6)' })]);
    track('.scene-reflection-original', [at(0, { opacity: 1 }), at(5.6, { opacity: 1 }), at(6.6, { opacity: 0 }), at(14.3, { opacity: 0 }), at(15, { opacity: 1 })]);
    track('.scene-reflection-dress', [at(0, { opacity: 0, transform: 'translateY(2%)' }), at(5.7, { opacity: 0, transform: 'translateY(2%)' }), at(6.7, { opacity: 1, transform: 'translateY(0%)' }), at(10.2, { opacity: 1, transform: 'translateY(0%)' }), at(11.3, { opacity: 0, transform: 'translateY(-1%)' }), at(15, { opacity: 0, transform: 'translateY(2%)' })]);
    track('.scene-reflection-suit', [at(0, { opacity: 0, transform: 'translateY(2%)' }), at(10.4, { opacity: 0, transform: 'translateY(2%)' }), at(11.5, { opacity: 1, transform: 'translateY(0%)' }), at(14, { opacity: 1, transform: 'translateY(0%)' }), at(15, { opacity: 0, transform: 'translateY(2%)' })]);
    const cards = [
      ['.scene-card--ivory', 1.9, 2.8, -1],
      ['.scene-card--dress', 2.15, 3.15, 1],
      ['.scene-card--suit', 2.5, 3.55, 1],
    ];
    for (const [selector, enter, settle, direction] of cards) {
      const activeAt = selector.endsWith('dress') ? 4.9 : selector.endsWith('suit') ? 10.05 : 3.9;
      track(selector, [
        at(0, { opacity: 0, transform: `translate(${direction * 38}%, 25%) rotate(${direction * 12}deg) scale(.85)` }),
        at(enter, { opacity: 0, transform: `translate(${direction * 38}%, 25%) rotate(${direction * 12}deg) scale(.85)`, easing: 'cubic-bezier(.2,.7,.2,1)' }),
        at(settle, { opacity: 1, transform: 'translate(0%, 0%) rotate(0deg) scale(1)' }),
        at(activeAt, { opacity: 1, transform: 'translate(0%, -3%) rotate(0deg) scale(1.05)' }),
        at(activeAt + .35, { opacity: 1, transform: 'translate(0%, 0%) rotate(0deg) scale(1)' }),
        at(12.8, { opacity: 1, transform: 'translate(0%, -2%) rotate(0deg) scale(1)' }),
        at(14, { opacity: 1, transform: 'translate(0%, 0%) rotate(0deg) scale(1)' }),
        at(15, { opacity: 0, transform: `translate(${direction * 38}%, 25%) rotate(${direction * 12}deg) scale(.85)` }),
      ]);
    }
    track('.scene-cursor', [
      at(0, { opacity: 0, transform: motion(first.x + 20, first.y + approach) }),
      at(3.5, { opacity: 0, transform: motion(first.x + 20, first.y + approach), easing: 'cubic-bezier(.2,.7,.2,1)' }),
      at(4.55, { opacity: 1, transform: motion(first.x, first.y) }),
      at(4.9, { opacity: 1, transform: motion(first.x, first.y, .86) }),
      at(5.15, { opacity: 1, transform: motion(first.x, first.y) }),
      at(6.5, { opacity: 0, transform: motion(first.x, first.y - 6) }),
      at(8.8, { opacity: 0, transform: motion(first.x, first.y), easing: 'ease-in-out' }),
      at(9.75, { opacity: 1, transform: motion(second.x, second.y) }),
      at(10.05, { opacity: 1, transform: motion(second.x, second.y, .86) }),
      at(10.3, { opacity: 1, transform: motion(second.x, second.y) }),
      at(11.5, { opacity: 0, transform: motion(second.x, second.y - 6) }),
      at(15, { opacity: 0, transform: motion(first.x + 20, first.y + approach) }),
    ]);
    track('.scene-tap', [
      at(0, { opacity: 0, transform: motion(firstTap.x, firstTap.y, .35) }),
      at(4.8, { opacity: 0, transform: motion(firstTap.x, firstTap.y, .35) }),
      at(5.08, { opacity: .9, transform: motion(firstTap.x, firstTap.y, 1) }),
      at(5.65, { opacity: 0, transform: motion(firstTap.x, firstTap.y, 1.8) }),
      at(9.9, { opacity: 0, transform: motion(secondTap.x, secondTap.y, .35) }),
      at(10.2, { opacity: .9, transform: motion(secondTap.x, secondTap.y, 1) }),
      at(10.8, { opacity: 0, transform: motion(secondTap.x, secondTap.y, 1.8) }),
      at(15, { opacity: 0, transform: motion(firstTap.x, firstTap.y, .35) }),
    ]);
    track('.scene-scan', [at(0, { opacity: 0, top: '8%' }), at(4.9, { opacity: 0, top: '8%' }), at(5.1, { opacity: 1, top: '12%' }), at(6.25, { opacity: .9, top: '88%' }), at(6.5, { opacity: 0, top: '90%' }), at(9.95, { opacity: 0, top: '8%' }), at(10.15, { opacity: 1, top: '12%' }), at(11.3, { opacity: .9, top: '88%' }), at(11.5, { opacity: 0, top: '90%' }), at(15, { opacity: 0, top: '8%' })]);
    track('.scene-link', [at(0, { opacity: 0, strokeDashoffset: '0px' }), at(2, { opacity: .7, strokeDashoffset: '-15px' }), at(6, { opacity: .5, strokeDashoffset: '-45px' }), at(9, { opacity: .7, strokeDashoffset: '-67px' }), at(13.8, { opacity: .6, strokeDashoffset: '-103px' }), at(15, { opacity: 0, strokeDashoffset: '-112px' })]);
    track('.scene-success', [at(0, { opacity: 0, transform: 'translateY(8px)' }), at(6.5, { opacity: 0, transform: 'translateY(8px)' }), at(6.95, { opacity: 1, transform: 'translateY(0px)' }), at(9.8, { opacity: 1, transform: 'translateY(0px)' }), at(10.2, { opacity: 0, transform: 'translateY(8px)' }), at(11.45, { opacity: 0, transform: 'translateY(8px)' }), at(11.9, { opacity: 1, transform: 'translateY(0px)' }), at(14, { opacity: 1, transform: 'translateY(0px)' }), at(15, { opacity: 0, transform: 'translateY(8px)' })]);
    track('.scene-caption', [at(0, { opacity: 0 }), at(.9, { opacity: 1 }), at(2.3, { opacity: 1 }), at(2.5, { opacity: .12 }), at(2.8, { opacity: 1 }), at(6.1, { opacity: 1 }), at(6.3, { opacity: .12 }), at(6.6, { opacity: 1 }), at(9.1, { opacity: 1 }), at(9.3, { opacity: .12 }), at(9.6, { opacity: 1 }), at(14, { opacity: 1 }), at(14.5, { opacity: 0 }), at(15, { opacity: 0 })]);
    dimensions = [stage.clientWidth, stage.clientHeight];
  }

  function render() {
    const time = timeInLoop();
    const phase = time < 2500 || time >= 14500 ? 0 : time < 6300 ? 1 : time < 9300 ? 2 : 3;
    if (phase !== lastPhase) {
      lastPhase = phase;
      const captions = ['Step in front of the camera.', 'Choose a look from your collection.', 'See a new look on yourself.', 'Explore another style.'];
      const labels = ['01 · Step in', '02 · Choose a look', '03 · See yourself', '03 · Explore another style'];
      if (caption) caption.textContent = captions[phase];
      if (status) status.textContent = reduced ? 'A preview of the experience' : labels[phase];
      for (const button of steps) {
        if (Number(button.dataset.motionStep) === Math.min(phase, 2)) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      }
      root.dataset.motionStep = String(Math.min(phase, 2));
    }
    const look = time < 4800 || time >= 14500 ? 'ivory' : time < 9950 ? 'dress' : 'suit';
    if (look !== lastLook) {
      lastLook = look;
      for (const button of looks) button.setAttribute('aria-pressed', String(button.dataset.look === look));
      root.dataset.look = look;
    }
    if (progress) progress.style.transform = `scaleX(${reduced ? 1 : time / DURATION})`;
  }

  function pauseClock() {
    if (running) elapsed = Number(animations[0]?.currentTime ?? elapsed);
    running = false;
    cancelAnimationFrame(frame);
    frame = undefined;
    animations.forEach((animation) => { animation.pause(); animation.currentTime = elapsed; });
  }

  function tick() {
    if (!running || disposed) return;
    elapsed = Number(animations[0]?.currentTime ?? elapsed);
    render();
    frame = requestAnimationFrame(tick);
  }

  function reconcile() {
    if (disposed) return;
    const eligible = !reduced && !userPaused && visible && !document.hidden && !pageHidden && !hasDialog();
    if (!eligible) pauseClock();
    else if (!running && animations.length) {
      const start = Number(document.timeline.currentTime ?? performance.now()) - elapsed;
      animations.forEach((animation) => { animation.currentTime = elapsed; animation.play(); animation.startTime = start; });
      running = true;
      frame = requestAnimationFrame(tick);
    }
    root.dataset.motionState = reduced ? 'reduced' : running ? 'playing' : userPaused ? 'paused' : 'suspended';
    toggle.disabled = reduced;
    toggle.setAttribute('aria-pressed', String(userPaused || reduced));
    toggle.setAttribute('aria-label', reduced ? 'Animation paused for reduced motion' : userPaused ? 'Play animation' : 'Pause animation');
    toggle.title = reduced ? 'Reduced motion is enabled. Choose a step or a look to inspect it.' : userPaused ? 'Play animation' : 'Pause animation';
    replay.setAttribute('aria-label', reduced ? 'Show the final preview' : 'Replay animation');
    render();
  }

  function setPaused(paused, announce = false) {
    userPaused = paused;
    document.documentElement.dataset.motionPaused = String(paused);
    reconcile();
    if (announce) document.dispatchEvent(new CustomEvent('mirror:motion-toggle', { bubbles: true, detail: { paused } }));
  }

  function seek(time) {
    pauseClock();
    elapsed = time;
    animations.forEach((animation) => { animation.currentTime = elapsed; });
    lastPhase = -1;
    lastLook = '';
    reconcile();
  }

  function dispose() {
    disposed = true;
    cancelAnimationFrame(frame);
    cancelAnimationFrame(resizeFrame);
    animations.forEach((animation) => animation.cancel());
    observer?.disconnect();
    resizeObserver?.disconnect();
    dialogObserver?.disconnect();
    lifetime.abort();
  }

  if (typeof stage.animate !== 'function') {
    root.querySelector('.scene-reflection-original')?.style.setProperty('opacity', '0');
    root.querySelector('.scene-reflection-dress')?.style.setProperty('opacity', '1');
    root.querySelector('.scene-success')?.style.setProperty('opacity', '1');
    toggle.disabled = true;
    replay.disabled = true;
    root.dataset.motionState = 'static';
    if (status) status.textContent = 'A preview of the experience';
    return;
  }

  if (status) status.setAttribute('aria-live', 'off');
  if (caption) caption.setAttribute('aria-live', 'off');
  buildTracks();
  root.dataset.experienceReady = 'true';
  listen(toggle, 'click', () => { if (!reduced) setPaused(!userPaused, true); });
  listen(replay, 'click', () => {
    seek(reduced ? FINAL_FRAME : 0);
    if (!reduced) setPaused(false, true);
  });
  steps.forEach((button) => listen(button, 'click', () => seek(STEP_TIMES[Number(button.dataset.motionStep)] ?? FINAL_FRAME)));
  looks.forEach((button) => listen(button, 'click', () => seek(LOOK_TIMES[button.dataset.look] ?? FINAL_FRAME)));
  listen(document, 'mirror:motion-toggle', (event) => {
    if (typeof event.detail?.paused === 'boolean') setPaused(event.detail.paused);
  });
  listen(document, 'visibilitychange', reconcile);
  listen(document, 'mirror:contact-open', reconcile);
  listen(document, 'mirror:demo-open', reconcile);
  listen(media, 'change', () => {
    pauseClock();
    reduced = media.matches;
    if (reduced) elapsed = FINAL_FRAME;
    animations.forEach((animation) => { animation.currentTime = elapsed; });
    lastPhase = -1;
    reconcile();
  });
  listen(window, 'pagehide', (event) => {
    if (!event.persisted) dispose();
    else { pageHidden = true; reconcile(); }
  });
  listen(window, 'pageshow', () => { pageHidden = false; reconcile(); });

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; reconcile(); }, { threshold: 0 });
    observer.observe(stage);
  } else {
    const checkViewport = () => {
      const rect = stage.getBoundingClientRect();
      visible = rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
      reconcile();
    };
    listen(window, 'scroll', checkViewport);
    listen(window, 'resize', checkViewport);
    checkViewport();
  }
  dialogObserver = new MutationObserver(reconcile);
  dialogObserver.observe(document.body, { attributes: true, attributeFilter: ['open'], subtree: true });
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => {
      if (Math.abs(stage.clientWidth - dimensions[0]) < 1 && Math.abs(stage.clientHeight - dimensions[1]) < 1) return;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => { pauseClock(); buildTracks(); reconcile(); });
    });
    resizeObserver.observe(stage);
  }
  reconcile();
})();
