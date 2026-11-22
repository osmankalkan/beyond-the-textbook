import {escapeHtml as escape} from '../core/html.js';

export function mountChapterOneLab(root, initialContext, spec) {
  let context = initialContext;
  const values = Object.fromEntries(spec.controls.map(control => [control.id, control.options[0][0]]));
  const events = new AbortController();

  root.innerHTML = `<section class="panel sep-experiment chapter-one-lab">
    <header class="cx-section-head"><h3 data-copy="${spec.title}"></h3><p data-copy="${spec.intro}"></p></header>
    <div class="sep-grid">
      <div class="sep-controls">${spec.controls.map(({id,label,options}) => `<div class="sep-control">
        <label for="${id}" data-copy="${label}"></label>
        <select id="${id}" data-control="${id}">${options.map(([value,key]) =>
          `<option value="${value}" data-copy="${key}"></option>`).join('')}</select>
      </div>`).join('')}</div>
      <div class="sep-plot-wrap"><div class="chapter-one-result" role="status" aria-atomic="true"></div></div>
    </div>
  </section>`;

  const panel = root.firstElementChild;
  const output = panel.querySelector('.chapter-one-result');

  function render() {
    const {title, explanation, metrics = [], rows = []} = spec.evaluate(values, context);
    output.innerHTML = `<h4>${escape(title)}</h4>
      <p>${escape(explanation)}</p>
      ${metrics.length ? `<dl>${metrics.map(([label,value]) =>
        `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>` : ''}
      ${rows.length ? `<ol>${rows.map(([label,selected]) =>
        `<li${selected ? ' aria-current="step"' : ''}>${escape(label)}</li>`).join('')}</ol>` : ''}`;
  }

  function update(nextContext) {
    context = nextContext;
    for (const node of panel.querySelectorAll('[data-copy]')) {
      node.textContent = context.t(node.dataset.copy);
    }
    render();
  }

  panel.addEventListener('change', event => {
    const key = event.target.dataset.control;
    if (!key) return;
    values[key] = event.target.value;
    render();
  }, {signal: events.signal});

  update(context);
  return {
    update,
    destroy() {
      events.abort();
      panel.remove();
    }
  };
}
