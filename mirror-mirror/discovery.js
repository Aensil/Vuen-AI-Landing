(() => {
  const root = document.querySelector('[data-discovery]');
  if (!root || root.dataset.discoveryReady === 'true') return;
  const fields = ['question', 'detail', 'impact', 'change', 'measure'].map(suffix => ({
    suffix,
    element: root.querySelector(`[data-discovery-${suffix}]`),
  }));
  const choices = [...root.querySelectorAll('[data-discovery-choice]')];
  if (!fields[0].element || !fields[1].element || !choices.length) return;

  const allowed = new Set(['bridal', 'luxury', 'events', 'season']);
  let selected = 'bridal';
  // The first audience is an example, not a choice made by the visitor.
  root.dataset.discoveryChosen = 'false';

  const render = () => {
    for (const { element, suffix } of fields) {
      if (!element) continue;
      const messageKey = `gap.discovery.${selected}.${suffix}`;
      // Keep the selected keys on the nodes so the core language pass never
      // briefly substitutes the initial panel before this controller refreshes.
      element.dataset.i18n = messageKey;
      const nextText = window.MirrorI18n.t(messageKey);
      if (element.textContent !== nextText) element.textContent = nextText;
    }
    for (const button of choices) {
      button.setAttribute('aria-pressed', String(button.dataset.discoveryChoice === selected));
    }
    root.dataset.discoverySelection = selected;
  };

  for (const button of choices) {
    button.addEventListener('click', () => {
      const next = button.dataset.discoveryChoice;
      if (!allowed.has(next)) return;
      // Clicking the initial example is still an explicit audience choice.
      if (next === selected && root.dataset.discoveryChosen === 'true') return;
      selected = next;
      root.dataset.discoveryChosen = 'true';
      render();
      document.dispatchEvent(new CustomEvent('mirror:audiencechange', {
        bubbles: true,
        detail: { audience: selected },
      }));
    });
  }
  document.addEventListener('mirror:languagechange', render);
  render();
  root.dataset.discoveryReady = 'true';
})();
