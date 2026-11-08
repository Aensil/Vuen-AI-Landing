(() => {
  const initialize = () => {
    const steps = [...document.querySelectorAll('.discovery-steps > li')];
    if (!steps.length || document.documentElement.dataset.pageMotionReady === 'true') return;
    document.documentElement.dataset.pageMotionReady = 'true';

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const icons = [
      `<rect class="diagram-panel" x="23" y="7" width="39" height="50" rx="3"/>
       <g data-icon-part="garment"><path class="diagram-paper" d="m36 17-7 5 5 8 4-2v19h17V28l4 2 5-8-7-5-4 5h-9z"/>
       <path d="M44 17c0 5 9 5 9 0"/></g>
       <path data-icon-part="check" d="m9 40 4 4 8-10" pathLength="1"/>`,
      `<path class="diagram-panel" data-icon-part="mirror" d="M17 57V24a19 19 0 0 1 38 0v33z" pathLength="1"/>
       <g data-icon-part="person"><circle class="diagram-paper" cx="36" cy="24" r="6"/>
       <path class="diagram-paper" d="M25 48v-9a11 11 0 0 1 22 0v9M29 49V38m14 11V38"/></g>
       <path data-icon-part="reflection" d="m48 13 4 4m-4 3 4-4"/>`,
      `<g data-icon-part="previous"><rect class="diagram-panel" x="10" y="17" width="30" height="39" rx="3"/>
       <path d="m17 28 6-4 4 3 4-3 5 4-3 5-3-1v14H22V32l-2 1z"/></g>
       <g data-icon-part="next"><rect class="diagram-paper" x="31" y="7" width="31" height="42" rx="3"/>
       <path d="m37 20 5-4 4 3 4-3 6 4-3 5-3-1v14h-9V24l-2 1z"/></g>
       <path data-icon-part="next-arrow" d="M44 57h17m-5-5 5 5-5 5"/>`,
    ];
    const records = steps.slice(0, 3).map((step, index) => {
      const marker = step.querySelector('.step-number');
      const heading = document.createElement('div');
      heading.className = 'step-motion-heading';
      const diagram = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      diagram.setAttribute('viewBox', '0 0 72 64');
      diagram.setAttribute('aria-hidden', 'true');
      diagram.setAttribute('focusable', 'false');
      diagram.setAttribute('fill', 'none');
      diagram.setAttribute('stroke', 'currentColor');
      diagram.setAttribute('stroke-width', '1.4');
      diagram.setAttribute('stroke-linejoin', 'round');
      diagram.setAttribute('stroke-linecap', 'round');
      diagram.classList.add('step-motion-diagram');
      diagram.innerHTML = icons[index];
      if (marker) { marker.replaceWith(heading); heading.append(marker, diagram); }
      else { heading.append(diagram); step.prepend(heading); }
      step.classList.add('has-motion-diagram');
      return { step, diagram, index, visible: false, played: false, animations: [] };
    });
    const surfaces = [...document.querySelectorAll('.store-scene, .portrait-frame')].map((element, index) => {
      element.classList.add('page-motion-surface');
      return { element, frame: element.closest('figure') || element.parentElement, visible: false, direction: index % 2 ? -1 : 1 };
    });
    let userPaused = document.documentElement.dataset.motionPaused === 'true';
    let frameRequest = 0;
    const blocked = () => preference.matches || userPaused || document.hidden || Boolean(document.querySelector('dialog[open], main[inert]'));

    function playDiagram(record) {
      if (record.played || !record.visible || blocked() || typeof record.diagram.animate !== 'function') return;
      record.played = true;
      const animatePart = (name, keyframes, duration, delay = 0) => {
        const part = record.diagram.querySelector(`[data-icon-part="${name}"]`);
        if (!part) return;
        const animation = part.animate(keyframes, { duration, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
        record.animations.push(animation);
        animation.onfinish = () => { record.animations = record.animations.filter(item => item !== animation); };
      };
      if (record.index === 0) {
        animatePart('garment', [{ transform: 'translate(-15px, 4px) rotate(-13deg)', opacity: 0 }, { transform: 'translate(0, 0) rotate(0)', opacity: 1 }], 800, 130);
        animatePart('check', [{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, 640);
      } else if (record.index === 1) {
        animatePart('mirror', [{ strokeDasharray: '1', strokeDashoffset: '1', fillOpacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', fillOpacity: 1 }], 850, 80);
        animatePart('person', [{ transform: 'translateY(8px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], 700, 350);
        animatePart('reflection', [{ opacity: 0 }, { opacity: 1 }], 400, 730);
      } else {
        animatePart('previous', [{ transform: 'translate(8px, -5px) rotate(8deg)', opacity: 0.35 }, { transform: 'translate(0, 0) rotate(0)', opacity: 1 }], 850, 80);
        animatePart('next', [{ transform: 'translate(13px, 5px) rotate(12deg)', opacity: 0 }, { transform: 'translate(0, 0) rotate(0)', opacity: 1 }], 850, 230);
        animatePart('next-arrow', [{ transform: 'translateX(-6px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], 550, 630);
      }
    }

    function renderScenes() {
      frameRequest = 0;
      if (blocked()) return;
      const viewportHeight = document.documentElement.clientHeight;
      for (const surface of surfaces) {
        if (!surface.visible) continue;
        const bounds = surface.frame.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (viewportHeight / 2 - bounds.top - bounds.height / 2) / ((viewportHeight + bounds.height) / 2)));
        surface.element.style.setProperty('--page-scene-y', `${(progress * 8).toFixed(2)}px`);
        surface.element.style.setProperty('--page-scene-angle', `${(progress * 0.8 * surface.direction).toFixed(3)}deg`);
      }
    }
    function queueScenes() {
      if (!frameRequest && !blocked() && surfaces.some(surface => surface.visible)) frameRequest = requestAnimationFrame(renderScenes);
    }
    function synchronize() {
      const paused = blocked();
      document.documentElement.dataset.pageMotionState = paused ? 'paused' : 'running';
      if (paused && frameRequest) { cancelAnimationFrame(frameRequest); frameRequest = 0; }
      for (const record of records) {
        if (preference.matches) {
          record.animations.forEach(animation => animation.cancel());
          record.animations = [];
        } else {
          record.animations.forEach(animation => { if (paused || !record.visible) animation.pause(); else animation.play(); });
          playDiagram(record);
        }
      }
      for (const surface of surfaces) {
        surface.element.classList.toggle('page-motion-active', !paused && surface.visible);
        if (preference.matches) {
          surface.element.style.removeProperty('--page-scene-y');
          surface.element.style.removeProperty('--page-scene-angle');
        }
      }
      queueScenes();
    }
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const record = records.find(item => item.step === entry.target);
          if (record) record.visible = entry.isIntersecting;
          for (const surface of surfaces) { if (surface.frame === entry.target) surface.visible = entry.isIntersecting; }
        }
        synchronize();
      }, { threshold: 0.15 });
      records.forEach(record => observer.observe(record.step));
      surfaces.forEach(surface => observer.observe(surface.frame));
    } else {
      // The complete static diagrams and imagery remain useful without observers.
      records.forEach(record => { record.played = true; });
    }
    addEventListener('scroll', queueScenes, { passive: true });
    addEventListener('resize', queueScenes, { passive: true });
    document.addEventListener('visibilitychange', synchronize);
    preference.addEventListener('change', synchronize);
    const setUserPause = event => {
      if (typeof event.detail?.paused !== 'boolean') return;
      userPaused = event.detail.paused;
      synchronize();
    };
    document.addEventListener('mirror:motion-toggle', setUserPause);
    window.addEventListener('mirror:motion-toggle', setUserPause);
    new MutationObserver(synchronize).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open', 'inert'] });
    synchronize();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
