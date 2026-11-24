import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  laplaceOdeFamilies,
  laplaceOdeMetrics,
  laplaceOdeRK4,
  laplaceOdeTimeCurves
} from '../../models/laplace-ode.js';

const FAMILY_NAMES = {
  'second-order-resonance': { tr: 'İkinci mertebede rezonans', en: 'Second-order resonance' },
  'discontinuous-step': { tr: 'Gecikmeli basamak girdisi', en: 'Delayed step input' },
  'third-order-delayed': { tr: 'Gecikmeli üçüncü mertebe sistem', en: 'Delayed third-order system' },
  'impulse-excited-oscillator': { tr: 'Darbe ile uyarılan osilatör', en: 'Impulse-excited oscillator' },
  'first-order-switch': { tr: 'Birinci mertebede anahtarlama', en: 'First-order switching' }
};
const phaseFamilies = new Set(['second-order-resonance', 'discontinuous-step']);
const delayFamilies = new Set(['discontinuous-step', 'impulse-excited-oscillator', 'first-order-switch']);

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  let state = {
    family: 'second-order-resonance',
    a: 1.5,
    y0: 0.0,
    v0: 0.0,
    tMax: 12.0
  };

  const fmt = (val, digits = 2) => (context.format ? context.format(val, digits) : Number(val).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);

  function getParams() {
    return {
      a: state.a,
      y0: state.y0,
      v0: state.v0
    };
  }

  function render() {
    const lang = context.lang || 'tr';
    const phaseAvailable = phaseFamilies.has(state.family);
    const usesInitialPosition = state.family !== 'third-order-delayed';

    root.innerHTML = `
      <section class="sep-lab laplace-ode-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('laplaceOdeEyebrow'))}</p>
          <h2>${esc(t('laplaceOdeTitle'))}</h2>
          <p>${esc(t('laplaceOdeSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="ode-family">${esc(t('laplaceOdeFamilyLabel'))}</label>
              <select id="ode-family">
                ${laplaceOdeFamilies().map(f => `
                  <option value="${esc(f)}" ${f === state.family ? 'selected' : ''}>
                    ${esc(FAMILY_NAMES[f][lang])}
                  </option>
                `).join('')}
              </select>
            </div>
            <span class="op-badge badge-ok">
              ℒ{y″} = s²Y(s) − sy₀ − y′₀
            </span>
          </div>

          <div class="sep-grid">
            <div class="sep-controls">
              <div class="sep-control">
                <label for="ode-tmax">
                  ${esc(t('laplaceOdeTMaxLabel'))} (t_max)
                  <output data-output="tmax">${fmt(state.tMax, 1)}</output>
                </label>
                <input id="ode-tmax" data-input="tmax" type="range" min="4.0" max="25.0" step="1.0" value="${state.tMax}">
              </div>

              ${delayFamilies.has(state.family) ? `<div class="sep-control">
                <label for="ode-delay">
                  ${esc(t('retroModelDelay'))} (a)
                  <output data-output="a">${fmt(state.a, 1)}</output>
                </label>
                <input id="ode-delay" data-input="a" type="range" min="0.5" max="4.0" step="0.1" value="${state.a}">
              </div>` : ''}

              ${usesInitialPosition ? `<div class="sep-control">
                <label for="ode-y0">
                  ${esc(t('laplaceOdeParamY0'))} (y₀)
                  <output data-output="y0">${fmt(state.y0, 2)}</output>
                </label>
                <input id="ode-y0" data-input="y0" type="range" min="-3.0" max="3.0" step="0.25" value="${state.y0}">
              </div>` : ''}

              ${state.family === 'second-order-resonance' ? `<div class="sep-control">
                <label for="ode-v0">
                  ${esc(t('laplaceOdeParamV0'))} (v₀)
                  <output data-output="v0">${fmt(state.v0, 2)}</output>
                </label>
                <input id="ode-v0" data-input="v0" type="range" min="-4.0" max="4.0" step="0.5" value="${state.v0}">
              </div>` : ''}

              <div class="sep-presets">
                <button type="button" class="button secondary" data-preset="resonance">${esc(t('laplaceOdePresetResonance'))}</button>
                <button type="button" class="button secondary" data-preset="piecewise">${esc(t('laplaceOdePresetPiecewise'))}</button>
              </div>

            </div>

            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i style="background:#2d6d4b"></i>${esc(t('laplaceOdeLegendTotal'))}</span>
                <span class="sep-b"><i style="background:#3b82f6;border-top:2px dashed #3b82f6"></i>${esc(t('laplaceOdeLegendFree'))}</span>
                <span><i style="background:#f97316;border-top:2px dashed #f97316"></i>${esc(t('laplaceOdeLegendForced'))}</span>
              </div>
              <svg class="cx-chart" id="ode-time-plot" role="img" viewBox="0 0 740 280" aria-label="${esc(t('laplaceOdeTimePlotAria'))}"></svg>

              ${phaseAvailable ? `<div class="sep-legend" style="margin-top:22px;">
                <span><i style="background:#8b5cf6"></i>${esc(t('laplaceOdeLegendPhase'))}</span>
              </div>
              <svg class="cx-chart" id="ode-phase-plot" role="img" viewBox="0 0 740 240" aria-label="${esc(t('laplaceOdePhasePlotAria'))}"></svg>` : ''}

              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(t('laplaceOdeFormulaHeader'))}</p>
              <p class="model-formula">${esc(laplaceOdeMetrics(state.family).odeString.replace("e^{4t}", "exp(4t)"))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(t('laplaceOdeAlgebraHeader'))}</p>
              <p>${esc(t('laplaceOdeAlgebraDesc'))}</p>
              <p class="small text-muted">${esc(t('laplaceOdeAlgebraTip'))}</p>
            </div>
          </div>
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(t('laplaceOdeFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(t('laplaceOdeGoToClinic'))}</a>
        </footer>
      </section>
    `;

    draw();
  }

  function draw() {
    const lang = context.lang || 'tr';
    const params = getParams();

    // 1. Output values
    const outT = root.querySelector('[data-output="tmax"]');
    if (outT) outT.textContent = fmt(state.tMax, 1);
    const outDelay = root.querySelector('[data-output="a"]');
    if (outDelay) outDelay.textContent = fmt(state.a, 1);
    const outY0 = root.querySelector('[data-output="y0"]');
    if (outY0) outY0.textContent = fmt(state.y0, 2);
    const outV0 = root.querySelector('[data-output="v0"]');
    if (outV0) outV0.textContent = fmt(state.v0, 2);

    // 2. Metrics & Curves
    const m = laplaceOdeMetrics(state.family, params);
    const { totalCurve, freeCurve, forcedCurve } = laplaceOdeTimeCurves(state.family, params, state.tMax, 180);
    const maxVal = Math.max(...totalCurve.map(p => Math.abs(p.value)), 0.1);

    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      metricsBox.innerHTML = `
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceOdeCardEquation'))}</p>
          <strong>${esc(m.odeString.replace("e^{4t}", "exp(4t)"))}</strong>
          <p>${esc(t('laplaceOdeCardEquationSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceOdeCardRoots'))}</p>
          <strong>${esc(m.characteristicRoots.split(" (")[0])}</strong>
          <p>${esc(t('laplaceOdeCardRootsSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceOdeCardMethod'))}</p>
          <strong>${esc(FAMILY_NAMES[state.family][lang])}</strong>
          <p>${esc(t('laplaceOdeCardMethodSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceOdeCardPeak'))}</p>
          <strong>${fmt(maxVal, 3)}</strong>
          <p>${esc(t('laplaceOdeCardPeakSub'))}</p>
        </article>
      `;
    }

    // 3. Time Domain Plot y(t)
    const yMaxTime = Math.max(1.5, maxVal * 1.15);

    const plotTime = cartesianPlot({
      width: 740,
      height: 280,
      xMin: 0,
      xMax: state.tMax,
      yMin: -yMaxTime,
      yMax: yMaxTime,
      format: v => fmt(v, 1),
      xLabel: 't',
      yLabel: 'y(t)',
      id: 'ode-time'
    });

    const ptsTot = totalCurve.map(p => [p.t, p.value]);
    const ptsFree = freeCurve.map(p => [p.t, p.value]);
    const ptsForced = forcedCurve.map(p => [p.t, p.value]);

    const svgTime = root.querySelector('#ode-time-plot');
    if (svgTime) {
      svgTime.innerHTML = `
        ${plotTime.markup}
        <g clip-path="url(#${plotTime.clipId})">
          ${plotTime.line(ptsFree, '#3b82f6', 'stroke-width="1.8" stroke-dasharray="4 4"')}
          ${plotTime.line(ptsForced, '#f97316', 'stroke-width="1.8" stroke-dasharray="4 4"')}
          ${plotTime.line(ptsTot, '#2d6d4b', 'stroke-width="2.6"')}
        </g>
      `;
    }

    // 4. Phase Portrait (y, y')
    if (!phaseFamilies.has(state.family)) return;
    const rk4Traj = laplaceOdeRK4(state.family, params, state.tMax, 220);
    const phasePoints = rk4Traj.map(pt => [pt.y, pt.v]);
    const maxYPhase = Math.max(...rk4Traj.map(p => Math.abs(p.y)), 0.5);
    const maxVPhase = Math.max(...rk4Traj.map(p => Math.abs(p.v)), 0.5);
    const limY = Math.max(1.2, maxYPhase * 1.15);
    const limV = Math.max(1.2, maxVPhase * 1.15);

    const plotPhase = cartesianPlot({
      width: 740,
      height: 240,
      xMin: -limY,
      xMax: limY,
      yMin: -limV,
      yMax: limV,
      format: v => fmt(v, 1),
      xLabel: lang === 'en' ? 'y (Displacement)' : 'y (Deplasman)',
      yLabel: lang === 'en' ? "y' (Velocity)" : "y' (Hız)",
      id: 'ode-phase'
    });

    const svgPhase = root.querySelector('#ode-phase-plot');
    if (svgPhase) {
      svgPhase.innerHTML = `
        ${plotPhase.markup}
        <g clip-path="url(#${plotPhase.clipId})">
          ${plotPhase.line(phasePoints, '#8b5cf6', 'stroke-width="2.2"')}
          ${plotPhase.point(state.y0, state.v0, '#2d6d4b')}
        </g>
      `;
    }
  }

  // Delegated Event Listeners
  root.addEventListener('input', event => {
    const id = event.target.dataset.input;
    if (!id) return;
    const val = parseFloat(event.target.value);
    if (id === 'tmax') state.tMax = val;
    if (id === 'a') state.a = val;
    if (id === 'y0') state.y0 = val;
    if (id === 'v0') state.v0 = val;
    draw();
  }, { signal: events.signal });

  root.addEventListener('change', event => {
    if (event.target.id === 'ode-family') {
      state.family = event.target.value;
      render();
      root.querySelector('#ode-family')?.focus();
    }
  }, { signal: events.signal });

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    if (button.dataset.preset === 'resonance') {
      state.family = 'second-order-resonance';
      state.a = 1.5;
      state.y0 = 0.0;
      state.v0 = 0.0;
      state.tMax = 12.0;
    } else if (button.dataset.preset === 'piecewise') {
      state.family = 'discontinuous-step';
      state.a = 1.5;
      state.y0 = 0.0;
      state.v0 = 0.0;
      state.tMax = 8.0;
    }
    render();
    root.querySelector(`[data-preset="${button.dataset.preset}"]`)?.focus();
  }, { signal: events.signal });

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
