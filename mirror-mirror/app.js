(() => {
  window.MirrorI18n.apply();
  const t = (key, params) => window.MirrorI18n.t(key, params);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const easeOut = 'cubic-bezier(.22,1,.36,1)';
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-nav');
  const scrim = document.querySelector('.menu-scrim');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  let menuOpen = false;
  let menuVersion = 0;
  let menuAnimations = [];
  let previousOverflow = '';
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const renderLanguageControls = () => {
    for (const button of languageButtons) {
      const language = button.dataset.language;
      if (!['en', 'es'].includes(language)) continue;
      button.setAttribute('aria-pressed', String(language === window.MirrorI18n.locale));
      button.setAttribute('lang', language);
      button.setAttribute('aria-label', t(`lang.${language}`));
    }
    toggle.setAttribute('aria-label', t(menuOpen ? 'runtime.menu.close' : 'runtime.menu.open'));
  };
  for (const button of languageButtons) {
    button.addEventListener('click', () => window.MirrorI18n.setLocale(button.dataset.language));
  }
  document.addEventListener('mirror:languagechange', renderLanguageControls);
  renderLanguageControls();
  const stopMenuAnimations = () => { menuAnimations.forEach(a => a.cancel()); menuAnimations = []; };
  function setMenu(open, restoreFocus = false) {
    const wasOpen = menuOpen;
    menuOpen = open;
    const version = ++menuVersion;
    stopMenuAnimations();
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'runtime.menu.close' : 'runtime.menu.open'));
    menu.inert = !open;
    main.inert = open;
    footer.inert = open;
    if (open) {
      if (!wasOpen) previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      menu.hidden = false;
      scrim.hidden = false;
      if (!motion.matches) {
        menuAnimations = [menu.animate([{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:easeOut}),scrim.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'})];
      }
    } else {
      document.body.style.overflow = previousOverflow;
      const finish = () => { if (version !== menuVersion || menuOpen) return; menu.hidden = true; scrim.hidden = true; stopMenuAnimations(); };
      if (!motion.matches && !menu.hidden) {
        menuAnimations = [menu.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-6px)'}],{duration:160,easing:'ease-in'}),scrim.animate([{opacity:1},{opacity:0}],{duration:160,easing:'ease-in'})];
        Promise.all(menuAnimations.map(a=>a.finished.catch(()=>{}))).then(finish);
      } else finish();
      if (restoreFocus) toggle.focus({preventScroll:true});
    }
  }
  toggle.addEventListener('click',()=>setMenu(!menuOpen));
  scrim.addEventListener('click',()=>setMenu(false,true));
  menu.addEventListener('click',e=>{if(e.target.closest('a,button')) setMenu(false);});
  document.addEventListener('click',e=>{if(menuOpen && e.target.closest('[data-contact],.site-header .wordmark')) setMenu(false);});
  document.addEventListener('keydown',e=>{
    if(!menuOpen) return;
    if(e.key==='Escape'){e.preventDefault();setMenu(false,true);return;}
    if(e.key==='Tab'){
      const items=[...document.querySelectorAll('.site-header a,.site-header button,#mobile-nav a,#mobile-nav button')].filter(el=>el.getClientRects().length);
      const first=items[0], last=items.at(-1);
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  matchMedia('(min-width: 901px)').addEventListener('change',e=>{if(e.matches && menuOpen)setMenu(false);});
  motion.addEventListener('change',()=>{if(motion.matches){stopMenuAnimations();if(!menuOpen){menu.hidden=true;scrim.hidden=true;}document.getAnimations().filter(a=>!a.effect?.target?.closest('.cinematic-experience') && Number.isFinite(a.effect?.getTiming().iterations)).forEach(a=>a.finish());}});
  let scrollScheduled=false;
  const updateHeader=()=>{header.classList.toggle('is-scrolled',scrollY>12);scrollScheduled=false;};
  addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateHeader);}},{passive:true});
  updateHeader();
  if('IntersectionObserver' in window){
    const navLinks=[...document.querySelectorAll('[data-nav]')];
    const navObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;navLinks.forEach(a=>{if(a.dataset.nav===entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}},{rootMargin:'-15% 0px -45% 0px',threshold:0});
    ['demo','problem','proof','live','photo','setup'].forEach(id=>{const section=document.getElementById(id);if(section)navObserver.observe(section);});
    const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;revealObserver.unobserve(entry.target);if(!motion.matches)entry.target.animate([{opacity:.15,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:easeOut});});},{rootMargin:'0px 0px 70px 0px',threshold:.05});
    document.querySelectorAll('[data-reveal]').forEach(el=>revealObserver.observe(el));
  }
  if(!motion.matches && !location.hash){document.querySelectorAll('.hero-enter').forEach((el,i)=>el.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,delay:i*55,easing:easeOut,fill:'backwards'}));}
  document.querySelectorAll('.faq details').forEach(details=>{
    const summary=details.querySelector('summary');
    let animation;
    let expanded=details.open;
    document.addEventListener('mirror:languagechange', () => {
      // Finish an in-flight disclosure at its chosen state so translated
      // content is not clipped by a height measured in the previous language.
      if(animation){animation.cancel();animation=null;}
      details.open=expanded;
      details.style.height='';
      details.style.overflow='';
    });
    summary.addEventListener('click',e=>{
      e.preventDefault();
      const start=details.getBoundingClientRect().height;
      if(animation){animation.cancel();animation=null;}
      details.style.height='';
      expanded=!expanded;
      details.dataset.expanded=String(expanded);
      summary.setAttribute('aria-expanded',String(expanded));
      if(motion.matches){details.open=expanded;details.style.overflow='';return;}
      details.open=true;
      const end=expanded?details.getBoundingClientRect().height:summary.getBoundingClientRect().height+1;
      details.style.overflow='hidden';
      animation=details.animate({height:[`${start}px`,`${end}px`]},{duration:260,easing:easeOut});
      const current=animation;
      animation.onfinish=()=>{if(animation!==current)return;details.open=expanded;details.style.overflow='';animation=null;};
    });
  });
  document.querySelector('#year').textContent=new Date().getFullYear();
})();
