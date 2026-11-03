import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {reductionDerivative, reductionDomain, reductionPoint, reductionResidual, reductionSample, reductionSecondDerivative, reductionValid, reductionValue} from '../../models/reduction.js';
import {reductionFamilies} from '../../lessons/xie-2010/2-6/study.js';
import {deepLocalize} from '../../i18n.js';

const DEFAULTS = {
  'immediate': {a: 0, b: 2},
  'missing-y': {a: 1, b: 0},
  'missing-x': {a: 1, b: -0.5}
};
const LIMITS = {
  'immediate': [-4, 4],
  'missing-y': [-3, 3],
  'missing-x': [-3, 3]
};
const WINDOWS = {
  'immediate': [-3, 3, -8, 8],
  'missing-y': [-1.5, 1.5, -2, 5],
  'missing-x': [-2.5, 4, -4, 4]
};
const INSPECTION = {
  'immediate': [-2.5, 2.5, 1],
  'missing-y': [-1.3, 1.3, 0.5],
  'missing-x': [-1.5, 3, 1]
};

export function mount(root, initial) {
  let context = initial, kind = 'immediate', a = 0, b = 2, at = 1, compare = true;
  const events = new AbortController();
  const fmt = (value, digits = 2) => context.format(value, digits);
  const formulas = s => `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
  const slider = (id, label, value, min, max, step) =>
    `<div class="sep-control"><label for="red-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="red-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function render() {
    const all = deepLocalize(reductionFamilies, context.lang);
    const data = all[kind];
    const [min, max] = LIMITS[kind];
    const [lo, hi] = INSPECTION[kind];
    a = clamp(a, min, max);
    b = clamp(b, min, max);
    at = clamp(at, lo, hi);

    root.innerHTML = `
      <section class="sep-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(context.t('redFreeExperimentAnalyticSolutions'))}</p>
          <h2>${esc(context.t('redChangeParameterWhatChanges'))}</h2>
          <p>${esc(context.t('redAAndBSelectDifferentParameters'))}</p>
        </header>
        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="red-family">${esc(context.t('redEquationFamily'))}</label>
              <select id="red-family">
                ${Object.entries(all).map(([id, d]) => `<option value="${id}" ${id === kind ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}
              </select>
            </div>
            <label><input type="checkbox" id="red-compare" ${compare ? 'checked' : ''}> ${esc(context.t('redCompareWithB'))}</label>
          </div>
          <div class="sep-grid">
            <div class="sep-controls">
              ${slider('a', 'A · C', a, min, max, 0.1)}
              ${compare ? slider('b', 'B · C', b, min, max, 0.1) : ''}
              ${slider('at', context.t('redInspectionPoint'), at, lo, hi, 0.05)}
              <p class="trf-fixed">${esc(context.t('redParameterFixed'))}</p>
              <div class="sep-presets">
                <button class="button secondary" data-preset="example">${esc(context.t('redExamplePreset'))}</button>
                <button class="button secondary" data-preset="compare">${esc(context.t('redComparisonPreset'))}</button>
              </div>
              <p>${esc(data.note)}</p>
            </div>
            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i></i>A</span>
                ${compare ? '<span class="sep-b"><i></i>B</span>' : ''}
              </div>
              <svg class="cx-chart" id="red-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('redSolutionCurvesAAndB'))}"></svg>
              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>
          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(context.t('redMethod'))}</p>
              ${formulas(data.method)}
              <p>${esc(context.t('redMethodNote'))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(context.t('redGeneralSolution'))}</p>
              ${formulas(data.solution)}
              <p>${esc(data.excluded)}</p>
            </div>
          </div>
          <p class="sep-boundary-note">${esc(context.t('redPlotWindow'))}</p>
        </div>
        <footer class="cx-topic-footer">
          <p>${esc(context.t('redNowApplyTheMethodOn'))}</p>
          <a class="button primary" href="#practice">${esc(context.t('redGoToTheMidtermClinic'))}</a>
        </footer>
      </section>
    `;
    draw();
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
    const [xMin, xMax, yMin, yMax] = WINDOWS[kind];
    const plot = cartesianPlot({xMin, xMax, yMin, yMax, title: context.t('redEffectOfParameter'), format: fmt, id: 'reduction'});
    let overlay = '';

    for (const [datum, color] of [[a, '#397752'], ...(compare ? [[b, '#b47b55']] : [])]) {
      if (!reductionValid(kind, datum)) continue;
      for (const segment of split(reductionSample(kind, datum, xMin, xMax, 720), xMin, xMax, yMin, yMax)) {
        overlay += plot.line(segment, color, 'stroke-width="1.9"');
      }
      const [px, py] = reductionPoint(kind, at, datum);
      if (px >= xMin && px <= xMax && py >= yMin && py <= yMax) {
        overlay += plot.point(px, py, color);
      }
    }

    const svg = root.querySelector('#red-plot');
    if (svg) svg.innerHTML = plot.markup + `<g clip-path="url(#${plot.clipId})">${overlay}</g>`;

    const metricsEl = root.querySelector('.sep-metrics');
    if (metricsEl) {
      metricsEl.innerHTML = [[a, 'A'], ...(compare ? [[b, 'B']] : [])].map(([datum, label]) => {
        if (!reductionValid(kind, datum)) {
          return `<article><h3>${label} · C=${fmt(datum)}</h3><p class="sep-invalid">${esc(context.t('redInvalidParameter'))}</p></article>`;
        }
        const py = reductionValue(kind, at, datum);
        const yp = reductionDerivative(kind, at, datum);
        const ypp = reductionSecondDerivative(kind, at, datum);
        const res = reductionResidual(kind, at, datum);

        return `
          <article>
            <h3>${label} · C=${fmt(datum)}</h3>
            <dl>
              <div><dt>${esc(context.t('redValueAtInspection'))}</dt><dd>${Number.isFinite(py) ? fmt(py) : '—'}</dd></div>
              <div><dt>${esc(context.t('redFirstDerivative'))}</dt><dd>${Number.isFinite(yp) ? fmt(yp) : '—'}</dd></div>
              <div><dt>${esc(context.t('redSecondDerivative'))}</dt><dd>${Number.isFinite(ypp) ? fmt(ypp) : '—'}</dd></div>
              <div><dt>${esc(context.t('redResidualAtInspection'))}</dt><dd>${Number.isFinite(res) ? fmt(res, 4) : '—'}</dd></div>
            </dl>
            ${!Number.isFinite(py) ? `<p class="sep-invalid">${esc(context.t('redOutsideDomain'))}</p>` : ''}
          </article>
        `;
      }).join('');
    }

    for (const [id, value] of Object.entries({a, b, at})) {
      const out = root.querySelector(`[data-output="${id}"]`);
      if (out) out.textContent = fmt(value);
    }
  }

  root.addEventListener('input', event => {
    const id = event.target.dataset.input;
    if (!id) return;
    const value = +event.target.value;
    if (id === 'a') a = value;
    if (id === 'b') b = value;
    if (id === 'at') at = value;
    draw();
  }, {signal: events.signal});

  root.addEventListener('change', event => {
    if (event.target.id === 'red-family') {
      kind = event.target.value;
      const d = DEFAULTS[kind];
      a = d.a;
      b = d.b;
      at = INSPECTION[kind][2];
      render();
      const sel = root.querySelector('#red-family');
      if (sel) sel.focus();
    }
    if (event.target.id === 'red-compare') {
      compare = event.target.checked;
      render();
      const chk = root.querySelector('#red-compare');
      if (chk) chk.focus();
    }
  }, {signal: events.signal});

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    const d = DEFAULTS[kind];
    const [min, max] = LIMITS[kind];
    if (button.dataset.preset === 'example') {
      a = d.a;
      b = d.b;
    } else {
      compare = true;
      let candidate = -a;
      if (Math.abs(candidate) < 0.2) candidate = a >= 0 ? 1 : -1;
      b = clamp(candidate, min, max);
    }
    at = INSPECTION[kind][2];
    render();
    const btn = root.querySelector(`[data-preset="${button.dataset.preset}"]`);
    if (btn) btn.focus();
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
