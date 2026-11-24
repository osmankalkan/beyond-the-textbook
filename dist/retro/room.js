import { ui } from '../i18n.js';
import { mountClock } from '../focus-preview/work-clock.js';

const page = document.documentElement;
const memo = document.querySelector('#quick-memo');
const count = document.querySelector('#memo-count');
const reading = document.querySelector('#lesson-content');
const clock = document.querySelector('#retro-clock');
const memoKey = 'btt-study-desktop-preview-note';
const destroyClock = mountClock(clock, { expanded: true });

function translate() {
  for (const element of document.querySelectorAll('[data-retro-label]')) {
    element.textContent = ui(page.lang, element.dataset.retroLabel);
  }
  for (const element of document.querySelectorAll('[data-retro-aria]')) {
    element.setAttribute('aria-label', ui(page.lang, element.dataset.retroAria));
  }
  memo.placeholder = ui(page.lang, 'retroMemoHint');
}

function prepareFigures() {
  for (const svg of reading.querySelectorAll('.lesson-figure > svg')) {
    const scroll = document.createElement('div');
    scroll.className = 'figure-scroll';
    svg.before(scroll);
    scroll.append(svg);
  }
}

function updateCount() {
  count.value = memo.value.length + ' / ' + memo.maxLength;
}

try { memo.value = (localStorage.getItem(memoKey) || '').slice(0, memo.maxLength); } catch {}
updateCount();
memo.addEventListener('input', () => {
  updateCount();
  try { localStorage.setItem(memoKey, memo.value); } catch {}
});

for (const button of document.querySelectorAll('[data-panel]')) {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.panel);
    const control = panel.querySelector('button, textarea, [tabindex]');
    control?.focus();
    panel.scrollIntoView({ block: 'nearest' });
  });
}

function prepareMath(scope) {
  const selector = 'math[display="block"], .clinic-step math, .step-item math, .exercise .solution-details math';
  const formulas = scope.matches(selector) ? [scope] : scope.querySelectorAll(selector);
  for (const formula of formulas) {
    if (formula.closest('.math-scroll, .formula, .table-wrap')) continue;
    const scroll = document.createElement('span');
    scroll.className = 'math-scroll';
    formula.before(scroll);
    scroll.append(formula);
  }
}

const languageObserver = new MutationObserver(translate);
languageObserver.observe(page, { attributes: true, attributeFilter: ['lang'] });
const figureObserver = new MutationObserver(prepareFigures);
figureObserver.observe(reading, { childList: true });
const main = document.querySelector('#main');
const mathObserver = new MutationObserver(records => {
  for (const record of records) {
    for (const node of record.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE && node.isConnected) prepareMath(node);
    }
  }
});
mathObserver.observe(main, { childList: true, subtree: true });
translate();
prepareFigures();
prepareMath(main);

window.addEventListener('pagehide', event => {
  if (event.persisted) return;
  languageObserver.disconnect();
  figureObserver.disconnect();
  mathObserver.disconnect();
  destroyClock();
});
