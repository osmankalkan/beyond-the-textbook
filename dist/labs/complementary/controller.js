import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  complementaryCurvature,
  complementaryResidual,
  complementarySample,
  complementarySlope,
  complementarySolveIVP,
  complementaryValue
} from '../../models/complementary.js';
import {complementaryFamilies} from '../../lessons/xie-2010/4-2/study.js';
import {deepLocalize} from '../../i18n.js';

const DEFAULTS = {
  'distinct-real': {y0: 1, v0: 0, at: 0.4, bY0: 1, bV0: 2},
  'hyperbolic-pair': {y0: 1, v0: 0, at: 0.5, bY0: 0, bV0: 2},
  'damped-complex': {y0: 1, v0: 1, at: 0.8, bY0: 0, bV0: 2},
  'repeated-double': {y0: 1, v0: 1, at: 0.4, bY0: 0, bV0: 2}
};

const WINDOWS = {
  'distinct-real': [-1.2, 1.0],
  'hyperbolic-pair': [-1.0, 1.0],
  'damped-complex': [-0.4, 3.6],
  'repeated-double': [-1.2, 0.9]
};

export function mount(root, initial) {
  let context = initial;
  let kind = 'damped-complex';
  let y0 = DEFAULTS[kind].y0;
  let v0 = DEFAULTS[kind].v0;
  let at = DEFAULTS[kind].at;
  const events = new AbortController();
  const fmt = (value, digits = 2) => context.format(value, digits);
  const formulas = s => `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function reset(nextKind, preset = 'a') {
    kind = nextKind;
    const d = DEFAULTS[kind];
    if (preset === 'b') {
      y0 = d.bY0;
      v0 = d.bV0;
    } else {
      y0 = d.y0;
      v0 = d.v0;
    }
    at = d.at;
  }

  function render() {
    const all = deepLocalize(complementaryFamilies, context.lang);
    const data = all[kind];
    const [from, to] = WINDOWS[kind];
    at = clamp(at, from, to);

    root.innerHTML = `
      <section class="sep-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(context.t('compEyebrow'))}</p>
          <h2>${esc(context.t('compTitle'))}</h2>
          <p>${esc(context.t('compSubtitle'))}</p>
        </header>
        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="comp-family">${esc(context.t('compFamily'))}</label>
              <select id="comp-family">
                ${Object.entries(all).map(([id, d]) => `<option value="${id}" ${id === kind ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="sep-grid">
            <div class="sep-controls">
              ${slider('y0', context.t('compY0'), y0, -2, 2, 0.1)}
              ${slider('v0', context.t('compV0'), v0, -4, 4, 0.1)}
              ${slider('at', context.t('compInspection'), at, from, to, 0.05)}
              <div class="sep-presets">
                <button class="button secondary" data-preset="a">${esc(context.t('compPresetA'))}</button>
                <button class="button secondary" data-preset="b">${esc(context.t('compPresetB'))}</button>
              </div>
              <p>${esc(data.note)}</p>
            </div>
            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i></i>${esc(context.t('compLegendPrimary'))}</span>
                <span class="sep-b"><i></i>${esc(context.t('compLegendSecondary'))}</span>
              </div>
              <svg class="cx-chart" id="comp-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('compPlotLabel'))}"></svg>
              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>
          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(context.t('compMethod'))}</p>
              ${formulas(data.method)}
              <p>${esc(context.t('compIdentity'))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(context.t('compNote'))}</p>
              <p>${esc(data.example)}</p>
              <p>${esc(context.t('compPlotWindow'))}</p>
            </div>
          </div>
        </div>
        <footer class="cx-topic-footer">
          <p>${esc(context.t('compFooter'))}</p>
          <a class="button primary" href="#practice">${esc(context.t('compGoToClinic'))}</a>
        </footer>
      </section>
    `;
    draw();
  }

  function slider(id, label, value, min, max, step) {
    return `<div class="sep-control"><label for="comp-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="comp-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
  }

  function draw() {
    const [from, to] = WINDOWS[kind];
    const d = DEFAULTS[kind];
    const primary = complementarySample(kind, y0, v0, from, to, 320);
    const secondary = complementarySample(kind, d.bY0, d.bV0, from, to, 320);
    const values = [...primary, ...secondary].filter(point => point.every(Number.isFinite)).map(point => point[1]);
    let yMin = -1, yMax = 1;
    if (values.length) {
      yMin = Math.min(...values);
      yMax = Math.max(...values);
      const pad = Math.max(0.4, (yMax - yMin) * 0.16);
      yMin -= pad;
      yMax += pad;
      if (yMax - yMin < 1) {
        const middle = (yMax + yMin) / 2;
        yMin = middle - 0.6;
        yMax = middle + 0.6;
      }
    }
    const plot = cartesianPlot({xMin: from, xMax: to, yMin, yMax, title: context.t('compPlotLabel'), format: fmt, id: 'complementary'});
    const val = complementaryValue(kind, y0, v0, at);
    let overlay = '';
    overlay += plot.line(secondary, '#b47b55', 'stroke-dasharray="7 5" stroke-width="2.1"');
    overlay += plot.line(primary, '#397752', 'stroke-width="2.3"');
    if (Number.isFinite(val)) {
      overlay += plot.dot(at, val, '#397752', 4.5);
    }
    const svg = root.querySelector('#comp-plot');
    if (svg) svg.innerHTML = plot.markup + `<g clip-path="url(#${plot.clipId})">${overlay}</g>`;

    const ivp = complementarySolveIVP(kind, y0, v0);
    const dy = complementarySlope(kind, y0, v0, at);
    const d2y = complementaryCurvature(kind, y0, v0, at);
    const res = complementaryResidual(kind, y0, v0, at);
    const metrics = root.querySelector('.sep-metrics');
    if (metrics) {
      metrics.innerHTML = `
        <article>
          <h3>y(0)=${fmt(y0)}, y′(0)=${fmt(v0)} · x=${fmt(at)}</h3>
          <dl>
            <div><dt>${esc(context.t('compConstants'))}</dt><dd>${esc(ivp.labels[0])}=${fmt(ivp.c1, 2)}, ${esc(ivp.labels[1])}=${fmt(ivp.c2, 2)}</dd></div>
            <div><dt>${esc(context.t('compValue'))}</dt><dd>${fmt(val, 4)}</dd></div>
            <div><dt>${esc(context.t('compSlope'))}</dt><dd>${fmt(dy, 4)}</dd></div>
            <div><dt>${esc(context.t('compCurvature'))}</dt><dd>${fmt(d2y, 4)}</dd></div>
            <div><dt>${esc(context.t('compResidual'))}</dt><dd>${fmt(res, 6)}</dd></div>
          </dl>
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
    if (event.target.id === 'comp-family') {
      reset(event.target.value, 'a');
      render();
      root.querySelector('#comp-family')?.focus();
    }
  }, {signal: events.signal});

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    reset(kind, button.dataset.preset);
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
