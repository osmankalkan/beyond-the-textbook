import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  linearCombinationSample,
  linearCombinationValue,
  linearFunctionIds,
  linearIsHomogeneous,
  linearOperatorValue,
  linearResidual,
  linearSuperpositionSample,
  linearSuperpositionValue
} from '../../models/linear-operator.js';
import {operatorFamilies, operatorFunctions} from '../../lessons/xie-2010/4-1/study.js';
import {deepLocalize} from '../../i18n.js';

const DEFAULTS = {
  'constant-distinct': {u: 'exp3', v: 'exp', alpha: 1, beta: 1, at: 0.4},
  'constant-osc': {u: 'poly', v: 'sin', alpha: 1, beta: 1, at: 1.2},
  'variable-x': {u: 'exp', v: 'const', alpha: 1, beta: 0, at: 0.7}
};
const WINDOWS = {
  'constant-distinct': [-1.2, 0.9],
  'constant-osc': [-3.5, 3.5],
  'variable-x': [-1.8, 1.8]
};

export function mount(root, initial) {
  let context = initial;
  let kind = 'constant-distinct';
  let u = DEFAULTS[kind].u;
  let v = DEFAULTS[kind].v;
  let alpha = DEFAULTS[kind].alpha;
  let beta = DEFAULTS[kind].beta;
  let at = DEFAULTS[kind].at;
  const events = new AbortController();
  const fmt = (value, digits = 2) => context.format(value, digits);
  const formulas = s => `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function windowFor() {
    const [from, to] = WINDOWS[kind];
    if (u === 'log' || v === 'log') return [Math.max(from, 0.08), to];
    return [from, to];
  }

  function reset(nextKind) {
    kind = nextKind;
    const d = DEFAULTS[kind];
    u = d.u;
    v = d.v;
    alpha = d.alpha;
    beta = d.beta;
    at = d.at;
  }

  function render() {
    const all = deepLocalize(operatorFamilies, context.lang);
    const data = all[kind];
    const [from, to] = windowFor();
    at = clamp(at, from, to);

    root.innerHTML = `
      <section class="sep-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(context.t('opEyebrow'))}</p>
          <h2>${esc(context.t('opTitle'))}</h2>
          <p>${esc(context.t('opSubtitle'))}</p>
        </header>
        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="op-operator">${esc(context.t('opOperator'))}</label>
              <select id="op-operator">
                ${Object.entries(all).map(([id, d]) => `<option value="${id}" ${id === kind ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}
              </select>
            </div>
            <span class="op-badge" id="op-homogeneous"></span>
          </div>
          <div class="sep-grid">
            <div class="sep-controls">
              <div class="op-pair">
                <div class="sep-control">
                  <label for="op-u">${esc(context.t('opFunctionU'))}</label>
                  <select id="op-u">${linearFunctionIds.map(id => `<option value="${id}" ${id === u ? 'selected' : ''}>${esc(operatorFunctions[id])}</option>`).join('')}</select>
                </div>
                <div class="sep-control">
                  <label for="op-v">${esc(context.t('opFunctionV'))}</label>
                  <select id="op-v">${linearFunctionIds.map(id => `<option value="${id}" ${id === v ? 'selected' : ''}>${esc(operatorFunctions[id])}</option>`).join('')}</select>
                </div>
              </div>
              ${slider('alpha', 'α', alpha, -2, 2, 0.1)}
              ${slider('beta', 'β', beta, -2, 2, 0.1)}
              ${slider('at', context.t('opInspection'), at, from, to, 0.05)}
              <div class="sep-presets">
                <button class="button secondary" data-preset="example">${esc(context.t('opPresetExample'))}</button>
                <button class="button secondary" data-preset="complementary">${esc(context.t('opPresetComplementary'))}</button>
              </div>
              <p>${esc(data.note)}</p>
            </div>
            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i></i>${esc(context.t('opLegendCombo'))}</span>
                <span class="sep-b"><i></i>${esc(context.t('opLegendSuperposition'))}</span>
              </div>
              <svg class="cx-chart" id="op-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('opPlotLabel'))}"></svg>
              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>
          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(context.t('opMethod'))}</p>
              ${formulas(data.method)}
              <p>${esc(context.t('opIdentity'))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(context.t('opNote'))}</p>
              <p>${esc(data.example)}</p>
              <p>${esc(context.t('opPlotWindow'))}</p>
            </div>
          </div>
          <p class="sep-boundary-note">${esc(context.t('opInvalidPoint'))}</p>
        </div>
        <footer class="cx-topic-footer">
          <p>${esc(context.t('opFooter'))}</p>
          <a class="button primary" href="#practice">${esc(context.t('opGoToClinic'))}</a>
        </footer>
      </section>
    `;
    draw();
  }

  function slider(id, label, value, min, max, step) {
    return `<div class="sep-control"><label for="op-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="op-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
  }

  function split(points, xMin, xMax, yMin, yMax) {
    const segments = [];
    let current = [];
    for (const point of points) {
      const outside = !point.every(Number.isFinite) || point[0] < xMin - 12 || point[0] > xMax + 12 || point[1] < yMin - 12 || point[1] > yMax + 12;
      if (outside) {
        if (current.length > 1) segments.push(current);
        current = [];
      } else {
        current.push(point);
      }
    }
    if (current.length > 1) segments.push(current);
    return segments;
  }

  function draw() {
    const [from, to] = windowFor();
    const combined = linearCombinationSample(kind, u, v, alpha, beta, from, to, 320);
    const superposed = linearSuperpositionSample(kind, u, v, alpha, beta, from, to, 320);
    const values = [...combined, ...superposed].filter(point => point.every(Number.isFinite)).map(point => point[1]);
    let yMin = -1, yMax = 1;
    if (values.length) {
      yMin = Math.min(...values);
      yMax = Math.max(...values);
      const pad = Math.max(0.5, (yMax - yMin) * 0.18);
      yMin -= pad;
      yMax += pad;
      if (yMax - yMin < 1) {
        const middle = (yMax + yMin) / 2;
        yMin = middle - 0.6;
        yMax = middle + 0.6;
      }
    }
    const plot = cartesianPlot({xMin: from, xMax: to, yMin, yMax, title: context.t('opPlotLabel'), format: fmt, id: 'operator'});
    let overlay = '';
    for (const segment of split(superposed, from, to, yMin, yMax)) {
      overlay += plot.line(segment, '#b47b55', 'stroke-dasharray="7 5" stroke-width="2.4"');
    }
    for (const segment of split(combined, from, to, yMin, yMax)) {
      overlay += plot.line(segment, '#397752', 'stroke-width="1.9"');
    }
    const svg = root.querySelector('#op-plot');
    if (svg) svg.innerHTML = plot.markup + `<g clip-path="url(#${plot.clipId})">${overlay}</g>`;

    const left = linearCombinationValue(kind, u, v, alpha, beta, at);
    const right = linearSuperpositionValue(kind, u, v, alpha, beta, at);
    const residual = linearResidual(kind, u, v, alpha, beta, at);
    const lu = linearOperatorValue(kind, u, at);
    const lv = linearOperatorValue(kind, v, at);
    const metrics = root.querySelector('.sep-metrics');
    if (metrics) {
      metrics.innerHTML = `
        <article>
          <h3>α=${fmt(alpha)}, β=${fmt(beta)} · x=${fmt(at)}</h3>
          <dl>
            <div><dt>${esc(context.t('opValueU'))}</dt><dd>${Number.isFinite(lu) ? fmt(lu, 4) : '—'}</dd></div>
            <div><dt>${esc(context.t('opValueV'))}</dt><dd>${Number.isFinite(lv) ? fmt(lv, 4) : '—'}</dd></div>
            <div><dt>${esc(context.t('opCombo'))}</dt><dd>${Number.isFinite(left) ? fmt(left, 4) : '—'}</dd></div>
            <div><dt>${esc(context.t('opSuperposition'))}</dt><dd>${Number.isFinite(right) ? fmt(right, 4) : '—'}</dd></div>
            <div><dt>${esc(context.t('opResidual'))}</dt><dd>${Number.isFinite(residual) ? fmt(residual, 6) : '—'}</dd></div>
          </dl>
          ${!Number.isFinite(left) || !Number.isFinite(right) ? `<p class="sep-invalid">${esc(context.t('opInvalidPoint'))}</p>` : ''}
        </article>
      `;
    }

    const badge = root.querySelector('#op-homogeneous');
    if (badge) {
      const homogeneous = linearIsHomogeneous(kind, v, from, to);
      badge.textContent = homogeneous ? context.t('opHomogeneousBadge') : '';
      badge.hidden = !homogeneous;
    }

    for (const [id, value] of Object.entries({alpha, beta, at})) {
      const out = root.querySelector(`[data-output="${id}"]`);
      if (out) out.textContent = fmt(value);
    }
  }

  root.addEventListener('input', event => {
    const id = event.target.dataset.input;
    if (!id) return;
    const value = +event.target.value;
    if (id === 'alpha') alpha = value;
    if (id === 'beta') beta = value;
    if (id === 'at') at = value;
    draw();
  }, {signal: events.signal});

  root.addEventListener('change', event => {
    if (event.target.id === 'op-operator') {
      reset(event.target.value);
      render();
      root.querySelector('#op-operator')?.focus();
    }
    if (event.target.id === 'op-u') {
      u = event.target.value;
      if (u === 'log') at = Math.max(at, 0.08);
      render();
      root.querySelector('#op-u')?.focus();
    }
    if (event.target.id === 'op-v') {
      v = event.target.value;
      if (v === 'log') at = Math.max(at, 0.08);
      render();
      root.querySelector('#op-v')?.focus();
    }
  }, {signal: events.signal});

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    if (button.dataset.preset === 'example') {
      reset(kind);
    } else if (kind === 'constant-distinct') {
      u = 'exp3';
      v = 'exp';
      alpha = 1;
      beta = 1;
      at = 0.4;
    } else if (kind === 'constant-osc') {
      u = 'poly';
      v = 'sin';
      alpha = 1;
      beta = 1;
      at = 1.2;
    } else {
      u = 'exp';
      v = 'const';
      alpha = 1;
      beta = 0;
      at = 0.7;
    }
    render();
    root.querySelector(`[data-preset="${button.dataset.preset}"]`)?.focus();
  }, {signal: events.signal});

  render();
  return {
    update(next) {
      context = next;
      render();
    },
    destroy() {
      events.abort();
      root.replaceChildren();
    }
  };
}
