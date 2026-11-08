(() => {
  const t = (key, params) => window.MirrorI18n.t(key, params);
  const initializeContact = () => {
    if (document.getElementById('contact-dialog')) return;

    const email = 'enoc.silva@vuen.ai';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dialog = document.createElement('dialog');
    dialog.id = 'contact-dialog';
    dialog.className = 'contact-dialog';
    dialog.setAttribute('aria-labelledby', 'contact-title');
    dialog.setAttribute('aria-describedby', 'contact-intro');
    dialog.innerHTML = `
      <button class="contact-close" type="button" aria-label="${t('runtime.contact.close')}" data-i18n-aria-label="runtime.contact.close">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
      </button>
      <p class="contact-eyebrow" data-i18n="runtime.contact.eyebrow">${t('runtime.contact.eyebrow')}</p>
      <h2 id="contact-title" class="contact-title" data-i18n="runtime.contact.title">${t('runtime.contact.title')}</h2>
      <p id="contact-intro" class="contact-intro" data-i18n="runtime.contact.intro">${t('runtime.contact.intro')}</p>
      <div class="contact-direct">
        <a class="contact-email-link" href="mailto:${email}" aria-label="${t('runtime.contact.emailLabel', { email })}">${email}</a>
        <button class="contact-copy" type="button" aria-label="${t('runtime.contact.copyLabel')}" data-i18n-aria-label="runtime.contact.copyLabel">
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 5V4H4v11h1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          <span>${t('runtime.contact.copy')}</span>
        </button>
      </div>
      <div class="contact-form">
        <label class="contact-field" for="contact-audience"><span data-i18n="runtime.contact.audienceLabel">${t('runtime.contact.audienceLabel')}</span>
          <select id="contact-audience" name="audience">
            <option value="help" data-i18n="runtime.contact.audience.help">${t('runtime.contact.audience.help')}</option>
            <option value="bridal" data-i18n="runtime.contact.audience.bridal">${t('runtime.contact.audience.bridal')}</option>
            <option value="luxury" data-i18n="runtime.contact.audience.luxury">${t('runtime.contact.audience.luxury')}</option>
            <option value="events" data-i18n="runtime.contact.audience.events">${t('runtime.contact.audience.events')}</option>
            <option value="season" data-i18n="runtime.contact.audience.season">${t('runtime.contact.audience.season')}</option>
          </select>
        </label>
        <label class="contact-field" for="contact-interest"><span data-i18n="runtime.contact.versionLabel">${t('runtime.contact.versionLabel')}</span>
          <select id="contact-interest" name="interest" aria-describedby="contact-version-note">
            <option value="" data-i18n="runtime.contact.version.help">${t('runtime.contact.version.help')}</option>
            <option value="live" data-i18n="runtime.contact.version.live">${t('runtime.contact.version.live')}</option>
            <option value="photo" data-i18n="runtime.contact.version.photo">${t('runtime.contact.version.photo')}</option>
            <option value="both" data-i18n="runtime.contact.version.both">${t('runtime.contact.version.both')}</option>
          </select>
        </label>
        <p id="contact-version-note" class="contact-version-note"></p>
        <a class="contact-submit" href="mailto:${email}"><span data-i18n="runtime.contact.openDraft">${t('runtime.contact.openDraft')}</span>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </a>
        <p class="contact-note" data-i18n="runtime.contact.draftNote">${t('runtime.contact.draftNote')}</p>
      </div>
      <p class="contact-status" role="status" aria-live="polite"></p>
    `;
    document.body.appendChild(dialog);

    const audience = dialog.querySelector('#contact-audience');
    const interest = dialog.querySelector('#contact-interest');
    const versionNote = dialog.querySelector('#contact-version-note');
    const draftLink = dialog.querySelector('.contact-submit');
    const status = dialog.querySelector('.contact-status');
    const copyButton = dialog.querySelector('.contact-copy');
    const copyLabel = copyButton.querySelector('span');
    let opener;
    let previousOverflow = '';
    let previousPaddingRight = '';
    let scrollLocked = false;
    let state = 'closed';
    let transitionToken = 0;
    let activeAnimation = null;
    let copyToken = 0;
    let copyLabelKey = 'runtime.contact.copy';
    let statusMessage = null;
    const audienceValues = new Set(['bridal', 'luxury', 'events', 'season']);

    const chosenAudience = () => {
      const discovery = document.querySelector('[data-discovery]');
      const value = discovery?.dataset.discoverySelection;
      return discovery?.dataset.discoveryChosen === 'true' && audienceValues.has(value) ? value : 'help';
    };

    const renderStatus = () => {
      copyLabel.textContent = t(copyLabelKey);
      status.textContent = statusMessage ? t(statusMessage.key, statusMessage.params) : '';
    };
    const setStatus = (key, params) => {
      statusMessage = key ? { key, params } : null;
      renderStatus();
    };

    const updateEmailDraft = () => {
      const version = ['live', 'photo', 'both'].includes(interest.value) ? interest.value : 'help';
      const selectedAudience = audienceValues.has(audience.value) ? audience.value : 'help';
      const promptKey = suffix => selectedAudience === 'help'
        ? `runtime.contact.email.${suffix}`
        : `runtime.contact.email.${selectedAudience}.${suffix}`;
      versionNote.textContent = t(`runtime.contact.description.${version}`);
      const body = [
        t('runtime.contact.email.greeting'), '',
        t(`runtime.contact.email.${version}`),
        '', `${t('runtime.contact.email.audience')} ${t(`runtime.contact.audience.${selectedAudience}`)}`,
        '', t('runtime.contact.email.brand'), t('runtime.contact.email.collection'),
        t('runtime.contact.email.location'),
        '', t(promptKey('current')),
        '', t(promptKey('cause')),
        '', t(promptKey('frequencyImpact')),
        '', t(promptKey('change')),
        '', t('runtime.contact.email.thanks'),
      ].join('\n');
      draftLink.href = `mailto:${email}?subject=${encodeURIComponent(t('runtime.contact.email.subject'))}&body=${encodeURIComponent(body)}`;
    };
    audience.value = 'help';
    updateEmailDraft();
    document.addEventListener('mirror:languagechange', () => {
      // Keep the existing select, selected option, focus, dialog and handlers.
      // Static leaf labels are translated by the core before this event.
      dialog.querySelector('.contact-email-link').setAttribute('aria-label', t('runtime.contact.emailLabel', { email }));
      updateEmailDraft();
      renderStatus();
    });
    document.addEventListener('mirror:audiencechange', (event) => {
      if (dialog.open || !audienceValues.has(event.detail?.audience)) return;
      audience.value = event.detail.audience;
      updateEmailDraft();
    });

    const cancelAnimation = () => {
      activeAnimation?.cancel();
      activeAnimation = null;
    };

    const isVisible = (element) => {
      if (!element?.isConnected || !element.getClientRects().length || element.closest('[hidden], [inert]')) return false;
      const style = getComputedStyle(element);
      return style.visibility !== 'hidden' && style.display !== 'none';
    };

    const restoreClosedState = () => {
      if (dialog.open || state === 'closed') return;
      const token = ++transitionToken;
      ++copyToken;
      cancelAnimation();
      state = 'closed';
      delete dialog.dataset.motion;
      if (scrollLocked) {
        document.body.style.overflow = previousOverflow;
        document.body.style.paddingRight = previousPaddingRight;
        scrollLocked = false;
      }
      requestAnimationFrame(() => {
        if (token !== transitionToken || dialog.open) return;
        const focusTarget = [opener, document.querySelector('.menu-toggle'), ...document.querySelectorAll('.nav-contact')].find(isVisible);
        focusTarget?.focus({ preventScroll: true });
      });
    };

    const finishClose = (token) => {
      if (token !== transitionToken || state !== 'closing') return;
      dialog.close();
      restoreClosedState();
    };

    const requestClose = () => {
      if (!dialog.open || state === 'closing') return;
      const from = getComputedStyle(dialog);
      const frames = [{ opacity: from.opacity, transform: from.transform }, { opacity: 0, transform: 'translateY(8px)' }];
      const backdropOpacity = getComputedStyle(dialog, '::backdrop').opacity;
      const token = ++transitionToken;
      cancelAnimation();
      state = 'closing';
      if (reducedMotion.matches || typeof dialog.animate !== 'function') {
        finishClose(token);
        return;
      }
      dialog.style.setProperty('--contact-backdrop-from', backdropOpacity);
      dialog.dataset.motion = 'exit';
      activeAnimation = dialog.animate(frames, { duration: 160, easing: 'cubic-bezier(.4, 0, 1, 1)', fill: 'both' });
      activeAnimation.finished.then(() => finishClose(token)).catch(() => {
        // Cancellation is expected when a newer transition or motion preference wins.
        if (token === transitionToken && state === 'closing') finishClose(token);
      });
    };

    const openContact = (trigger) => {
      if (dialog.open && state !== 'closing') return;
      const reopening = dialog.open;
      const from = reopening ? getComputedStyle(dialog) : null;
      const entryFrame = { opacity: from ? from.opacity : 0, transform: from ? from.transform : 'translateY(8px)' };
      const backdropOpacity = reopening ? getComputedStyle(dialog, '::backdrop').opacity : 0;
      const token = ++transitionToken;
      ++copyToken;
      cancelAnimation();
      opener = trigger;
      audience.value = chosenAudience();
      interest.value = ['live', 'photo', 'both'].includes(trigger.dataset.interest) ? trigger.dataset.interest : '';
      updateEmailDraft();
      copyLabelKey = 'runtime.contact.copy';
      setStatus(null);
      if (!scrollLocked) {
        previousOverflow = document.body.style.overflow;
        previousPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
        }
        document.body.style.overflow = 'hidden';
        scrollLocked = true;
      }
      state = 'opening';
      if (!dialog.open) dialog.showModal();
      document.dispatchEvent(new CustomEvent('mirror:contact-open', { bubbles: true, detail: { interest: interest.value } }));
      audience.focus({ preventScroll: true });
      if (reducedMotion.matches || typeof dialog.animate !== 'function') {
        delete dialog.dataset.motion;
        state = 'open';
        return;
      }
      dialog.style.setProperty('--contact-backdrop-from', String(backdropOpacity));
      dialog.dataset.motion = 'enter';
      activeAnimation = dialog.animate([entryFrame, { opacity: 1, transform: 'translateY(0)' }], {
        duration: 240, easing: 'cubic-bezier(.2, .65, .3, 1)', fill: 'both',
      });
      activeAnimation.finished.then(() => {
        if (token !== transitionToken || !dialog.open || state !== 'opening') return;
        cancelAnimation();
        delete dialog.dataset.motion;
        state = 'open';
      }).catch(() => {});
    };

    document.addEventListener('click', (event) => {
      const trigger = event.target instanceof Element ? event.target.closest('[data-contact]') : null;
      if (!trigger) return;
      event.preventDefault();
      openContact(trigger);
    });
    dialog.querySelector('.contact-close').addEventListener('click', requestClose);
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      requestClose();
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) requestClose();
    });
    dialog.addEventListener('close', restoreClosedState);

    reducedMotion.addEventListener('change', () => {
      if (!reducedMotion.matches) return;
      if (state === 'closing') {
        const token = ++transitionToken;
        cancelAnimation();
        finishClose(token);
      } else if (state === 'opening') {
        ++transitionToken;
        cancelAnimation();
        delete dialog.dataset.motion;
        state = 'open';
      }
    });

    audience.addEventListener('change', updateEmailDraft);
    interest.addEventListener('change', updateEmailDraft);
    draftLink.addEventListener('click', () => {
      setStatus('runtime.contact.draftOpened');
    });

    copyButton.addEventListener('click', async () => {
      const token = ++copyToken;
      try {
        await navigator.clipboard.writeText(email);
        if (token !== copyToken || !dialog.open) return;
        copyLabelKey = 'runtime.contact.copied';
        setStatus('runtime.contact.copySuccess');
      } catch {
        if (token !== copyToken || !dialog.open) return;
        setStatus('runtime.contact.copyFailure', { email });
      }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeContact, { once: true });
  else initializeContact();
})();
