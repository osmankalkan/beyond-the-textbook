import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  particularComplementaryValue,
  particularFamilyIds,
  particularForcing,
  particularInitialX,
  particularOnlySample,
  particularOnlyValue,
  particularResidual,
  particularSample,
  particularTotalValue
} from '../../models/particular.js';
import {particularFamilies} from '../../lessons/xie-2010/4-3/study.js';
import {deepLocalize} from '../../i18n.js';

const DEFAULTS = {
  'exp-forcing': {y0: 1, v0: 0, at: 0.6},
  'poly-resonance': {y0: 1, v0: 0, at: 0.8},
  'shift-resonance': {y0: 1, v0: 0, at: 0.7},
  'variation-log': {y0: 0, v0: 0, at: 1.4}
};

const ZERO_HOMOGENEOUS = {
  'exp-forcing': {y0: 3 / 13, v0: 6 / 13},
  'poly-resonance': {y0: 0, v0: 2},
  'shift-resonance': {y0: 0, v0: -1 / 6},
  'variation-log': {y0: -0.75 * Math.E, v0: -1.75 * Math.E}
};

const WINDOWS = {
  'exp-forcing': [-1.4, 1.4],
  'poly-resonance': [-1.2, 1.8],
  'shift-resonance': [-0.6, 2.2],
  'variation-log': [0.15, 2.1]
};

export function mount(root, initial) {
  let context = initial;
  let kind = 'exp-forcing';
  let y0 = DEFAULTS[kind].y0;
  let v0 = DEFAULTS[kind].v0;
  let at = DEFAULTS[kind].at;
  const events = new AbortController();
  const fmt = (value, digits = 2) => context.format(value, digits);
  const formulas = s => `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function windowFor() {
    return WINDOWS[kind];
  }

  function reset(nextKind) {
    kind = nextKind;
    const d = DEFAULTS[kind];
    y0 = d.y0;
    v0 = d.v0;
    at = d.at;
  }

  function setZeroHomogeneous() {
    const z = ZERO_HOMOGENEOUS[kind];
    y0 = Number(z.y0.toFixed(2));
    v0 = Number(z.v0.toFixed(2));
  }

  function render() {
    const all = deepLocalize(particularFamilies, context.lang);
    const data = all[kind];
    const [from, to] = windowFor();
    const x0 = particularInitialX(kind);
    at = clamp(at, from, to);

    root.innerHTML = `
      <section class="sep-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(context.t('partEyebrow'))}</p>
          <h2>${esc(context.t('partTitle'))}</h2>
          <p>${esc(context.t('partSubtitle'))}</p>
        </header>
        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="part-family">${esc(context.t('partFamily'))}</label>
              <select id="part-family">
                ${particularFamilyIds.map(id => `<option value="${id}" ${id === kind ? 'selected' : ''}>${esc(all[id].name)}</option>`).join('')}
              </select>
            </div>
            <span class="op-badge">x₀ = ${fmt(x0, 0)}</span>
          </div>
          <div class="sep-grid">
            <div class="sep-controls">
              ${slider('y0', `${context.t('partY0')} (x₀=${fmt(x0, 0)})`, y0, -3, 3, 0.05)}
              ${slider('v0', `${context.t('partV0')} (x₀=${fmt(x0, 0)})`, v0, -5, 5, 0.05)}
              ${slider('at', context.t('partInspection'), at, from, to, 0.05)}
              <div class="sep-presets">
                <button class="button secondary" data-preset="work">${esc(context.t('partPresetWork'))}</button>
                <button class="button secondary" data-preset="zero">${esc(context.t('partPresetZero'))}</button>
              </div>
              <p>${esc(data.note)}</p>
            </div>
            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i></i>${esc(context.t('partLegendTotal'))}</span>
                <span class="sep-b"><i></i>${esc(context.t('partLegendParticular'))}</span>
              </div>
              <svg class="cx-chart" id="part-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('partPlotLabel'))}"></svg>
              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>
          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(context.t('partMethod'))}</p>
              ${formulas(data.method)}
              <p>${esc(context.t('partIdentity'))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(context.t('partNote'))}</p>
              <p>${esc(data.example)}</p>
              <p>${esc(context.t('partPlotWindow'))}</p>
            </div>
          </div>
          <p class="sep-boundary-note">${esc(context.t('partInvalidPoint'))}</p>
        </div>
        <footer class="cx-topic-footer">
          <p>${esc(context.t('partFooter'))}</p>
          <a class="button primary" href="#practice">${esc(context.t('partGoToClinic'))}</a>
        </footer>
      </section>
    `;
    draw();
  }

  function slider(id, label, value, min, max, step) {
    return `<div class="sep-control"><label for="part-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="part-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
  }

  function split(points, xMin, xMax, yMin, yMax) {
    const segments = [];
    let current = [];
    for (const point of points) {
      const outside = !point.every(Number.isFinite) || point[0] < xMin - 20 || point[0] > xMax + 20 || point[1] < yMin - 20 || point[1] > yMax + 20;
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
    const totalPts = particularSample(kind, y0, v0, from, to, 320);
    const partPts = particularOnlySample(kind, from, to, 320);
    const values = [...totalPts, ...partPts].filter(point => point.every(Number.isFinite)).map(point => point[1]);
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
    const plot = cartesianPlot({xMin: from, xMax: to, yMin, yMax, title: context.t('partPlotLabel'), format: fmt, id: 'particular'});
    let overlay = '';
    for (const segment of split(partPts, from, to, yMin, yMax)) {
      overlay += plot.line(segment, '#b47b55', 'stroke-dasharray="7 5" stroke-width="2.4"');
    }
    for (const segment of split(totalPts, from, to, yMin, yMax)) {
      overlay += plot.line(segment, '#397752', 'stroke-width="1.9"');
    }
    const svg = root.querySelector('#part-plot');
    if (svg) svg.innerHTML = plot.markup + `<g clip-path="url(#${plot.clipId})">${overlay}</g>`;

    const yP = particularOnlyValue(kind, at);
    const yC = particularComplementaryValue(kind, y0, v0, at);
    const yTot = particularTotalValue(kind, y0, v0, at);
    const rhs = particularForcing(kind, at);
    const residual = particularResidual(kind, y0, v0, at);
    const x0 = particularInitialX(kind);
    const metrics = root.querySelector('.sep-metrics');
    if (metrics) {
      metrics.innerHTML = `
        <article>
          <h3>y(${fmt(x0, 0)})=${fmt(y0)}, y′(${fmt(x0, 0)})=${fmt(v0)} · x=${fmt(at)}</h3>
          <dl>
            <div><dt>${esc(context.t('partValueYp'))}</dt><dd>${Number.isFinite(yP) ? fmt(yP, 4) : '—'}</dd></div>
            <div><dt>${esc(context.t('partValueYc'))}</dt><dd>${Number.isFinite(yC) ? fmt(yC, 4) : '—'}</dd></div>
            <div><dt>${esc(context.t('partValueTotal'))}</dt><dd>${Number.isFinite(yTot) ? fmt(yTot, 4) : '—'}</dd></div>
            <div><dt>${esc(context.t('partForcing'))}</dt><dd>${Number.isFinite(rhs) ? fmt(rhs, 4) : '—'}</dd></div>
            <div><dt>${esc(context.t('partResidual'))}</dt><dd>${Number.isFinite(residual) ? fmt(residual, 6) : '—'}</dd></div>
          </dl>
          ${!Number.isFinite(yTot) || !Number.isFinite(rhs) ? `<p class="sep-invalid">${esc(context.t('partInvalidPoint'))}</p>` : ''}
        </article>
      `;
    }

    for (const [id, value] of Object.entries({y0, v0, at})) {
      const out = root.querySelector(`[data-output="${id}"]`);
      if (out) out.textContent = fmt(value);
    }
  }

  root.addEventListener('input', event => {
    const id = event.target.dataset.input;
    if (!id) return;
    const value = +event.target.value;
    if (id === 'y0') y0 = value;
    if (id === 'v0') v0 = value;
    if (id === 'at') at = value;
    draw();
  }, {signal: events.signal});

  root.addEventListener('change', event => {
    if (event.target.id === 'part-family') {
      reset(event.target.value);
      render();
      root.querySelector('#part-family')?.focus();
    }
  }, {signal: events.signal});

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    if (button.dataset.preset === 'work') {
      reset(kind);
    } else if (button.dataset.preset === 'zero') {
      setZeroHomogeneous();
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
