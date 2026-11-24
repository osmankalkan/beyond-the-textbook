import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  laplaceAppFamilies,
  laplaceAppFrequencyResponse,
  laplaceAppMetrics,
  laplaceAppCurves
} from '../../models/laplace-applications.js';

const FAMILY_NAMES = {
  'sdof-vibration-ramp': { tr: 'Rampa yüklü tek serbestlik dereceli sistem', en: 'Single-degree-of-freedom system under a ramp load' },
  'sdof-harmonic-pulse': { tr: 'Sinüs darbesi altındaki osilatör', en: 'Oscillator under a sinusoidal pulse' },
  'rlc-periodic-square': { tr: 'Kare dalga girdili seri RLC', en: 'Series RLC with a square-wave input' },
  'rlc-step-resonance': { tr: 'Basamak girdili seri RLC', en: 'Series RLC with a step input' },
  'beam-elastic-point': { tr: 'Elastik temel üzerinde nokta yüklü kiriş', en: 'Point-loaded beam on an elastic foundation' }
};
const loadPositionFamilies = new Set(['sdof-vibration-ramp', 'sdof-harmonic-pulse', 'beam-elastic-point']);

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  let state = {
    family: 'sdof-harmonic-pulse',
    a: 1.0,
    zeta: 0.05,
    tMax: 10.0
  };

  const fmt = (val, digits = 2) => (context.format ? context.format(val, digits) : Number(val).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);

  function getParams() {
    return {
      a: state.a,
      c: 4 * state.zeta,
      t1: state.a,
      k: 4.0,
      t0: state.a,
      R: 2.0,
      L: 1.0,
      C: 0.25,
      P0: 10.0
    };
  }

  function render() {
    const lang = context.lang || 'tr';
    const showFrequency = state.family === 'sdof-vibration-ramp';

    root.innerHTML = `
      <section class="sep-lab laplace-app-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('laplaceAppEyebrow'))}</p>
          <h2>${esc(t('laplaceAppTitle'))}</h2>
          <p>${esc(t('laplaceAppSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="app-family">${esc(t('laplaceAppFamilyLabel'))}</label>
              <select id="app-family">
                ${laplaceAppFamilies().map(f => `
                  <option value="${esc(f)}" ${f === state.family ? 'selected' : ''}>
                    ${esc(FAMILY_NAMES[f][lang])}
                  </option>
                `).join('')}
              </select>
            </div>
            <span class="op-badge badge-ok">
              H(s) = Y(s) / X(s)
            </span>
          </div>

          <div class="sep-grid">
            <div class="sep-controls">
              <div class="sep-control">
                <label for="app-tmax">
                  ${esc(t('laplaceAppTMaxLabel'))} (t_max / L)
                  <output data-output="tmax">${fmt(state.tMax, 1)}</output>
                </label>
                <input id="app-tmax" data-input="tmax" type="range" min="4.0" max="20.0" step="1.0" value="${state.tMax}">
              </div>

              ${loadPositionFamilies.has(state.family) ? `<div class="sep-control">
                <label for="app-a">
                  ${esc(t(state.family === 'beam-elastic-point' ? 'retroLoadPosition' : 'retroLoadDuration'))}
                  <output data-output="a">${fmt(state.a, 2)}</output>
                </label>
                <input id="app-a" data-input="a" type="range" min="0.2" max="4.0" step="0.2" value="${state.a}">
              </div>` : ''}

              ${showFrequency ? `<div class="sep-control">
                <label for="app-zeta">
                  ${esc(t('laplaceAppParamZeta'))} (ζ)
                  <output data-output="zeta">${fmt(state.zeta, 2)}</output>
                </label>
                <input id="app-zeta" data-input="zeta" type="range" min="0.01" max="0.50" step="0.02" value="${state.zeta}">
              </div>` : ''}

              <div class="sep-presets">
                <button type="button" class="button secondary" data-preset="blast">${esc(t('laplaceAppPresetBlast'))}</button>
                <button type="button" class="button secondary" data-preset="beam">${esc(t('laplaceAppPresetBeam'))}</button>
              </div>

            </div>

            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i style="background:#2d6d4b"></i>${esc(t('laplaceAppLegendResponse'))}</span>
              </div>
              <svg class="cx-chart" id="app-response-plot" role="img" viewBox="0 0 740 280" aria-label="${esc(t('laplaceAppResponsePlotAria'))}"></svg>

              ${showFrequency ? `<div class="sep-legend" style="margin-top:22px;">
                <span><i style="background:#ec4899"></i>${esc(t('laplaceAppLegendDMF'))}</span>
              </div>
              <svg class="cx-chart" id="app-dmf-plot" role="img" viewBox="0 0 740 240" aria-label="${esc(t('laplaceAppDMFPlotAria'))}"></svg>` : ''}

              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(t('laplaceAppFormulaHeader'))}</p>
              <p class="model-formula">${esc(laplaceAppMetrics(state.family).transferFunc.replace("e^{-as}", "exp(−as)"))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(t('laplaceAppDomainHeader'))}</p>
              <p>${esc(t('laplaceAppDomainDesc'))}</p>
              <p class="small text-muted">${esc(t('laplaceAppDomainTip'))}</p>
            </div>
          </div>
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(t('laplaceAppFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(t('laplaceAppGoToClinic'))}</a>
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
    const outA = root.querySelector('[data-output="a"]');
    if (outA) outA.textContent = fmt(state.a, 2);
    const outZ = root.querySelector('[data-output="zeta"]');
    if (outZ) outZ.textContent = fmt(state.zeta, 2);

    // 2. Metrics & Curves
    const m = laplaceAppMetrics(state.family, params);
    const { responseCurve } = laplaceAppCurves(state.family, params, state.tMax, 180);
    const maxVal = Math.max(...responseCurve.map(p => Math.abs(p.value)), 0.1);

    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      metricsBox.innerHTML = `
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceAppCardEq'))}</p>
          <strong>${esc(m.equation)}</strong>
          <p>${esc(t('laplaceAppCardEqSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceAppCardTransfer'))}</p>
          <strong>${esc(m.transferFunc.replace("e^{-as}", "exp(−as)"))}</strong>
          <p>${esc(t('laplaceAppCardTransferSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceAppCardRole'))}</p>
          <strong>${esc(FAMILY_NAMES[state.family][lang])}</strong>
          <p>${esc(t('laplaceAppCardRoleSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceAppCardResonance'))}</p>
          <strong>${esc(lang === 'tr' ? m.resonanceNote : t('laplaceAppDomainTip'))}</strong>
          <p>${esc(t('laplaceAppCardResonanceSub'))}</p>
        </article>
      `;
    }

    // 3. System Response Plot
    const isBeam = state.family === 'beam-elastic-point';
    const yMaxResp = Math.max(1.0, Math.min(25.0, maxVal * 1.15));

    const plotResp = cartesianPlot({
      width: 740,
      height: 280,
      xMin: 0,
      xMax: state.tMax,
      yMin: -yMaxResp,
      yMax: yMaxResp,
      format: v => fmt(v, 1),
      xLabel: isBeam ? (lang === 'en' ? 'x (Beam Position)' : 'x (Kiriş Konumu)') : (lang === 'en' ? 't (Time [s])' : 't (Zaman [s])'),
      yLabel: isBeam ? (lang === 'en' ? 'y(x) (Deflection)' : 'y(x) (Çökme)') : 'x(t) / i(t)',
      id: 'app-response'
    });

    const ptsResp = responseCurve.map(p => [p.t, p.value]);
    const svgResp = root.querySelector('#app-response-plot');
    if (svgResp) {
      svgResp.innerHTML = `
        ${plotResp.markup}
        <g clip-path="url(#${plotResp.clipId})">
          ${plotResp.line(ptsResp, '#2d6d4b', 'stroke-width="2.6"')}
        </g>
      `;
    }

    // 4. DMF Frequency Response Plot
    if (state.family !== 'sdof-vibration-ramp') return;
    const freqPts = laplaceAppFrequencyResponse(state.family, params, 5.0, 100);
    const maxDMF = Math.max(...freqPts.map(p => p.dmf), 1.0);
    const yMaxDMF = Math.max(3.0, Math.min(15.0, maxDMF * 1.1));

    const plotDMF = cartesianPlot({
      width: 740,
      height: 240,
      xMin: 0,
      xMax: 5.0,
      yMin: 0,
      yMax: yMaxDMF,
      format: v => fmt(v, 1),
      xLabel: lang === 'en' ? 'ω (Frequency [rad/s])' : 'ω (Frekans [rad/s])',
      yLabel: 'DMF',
      id: 'app-dmf'
    });

    const ptsDMF = freqPts.map(p => [p.omega, p.dmf]);
    const svgDMF = root.querySelector('#app-dmf-plot');
    if (svgDMF) {
      svgDMF.innerHTML = `
        ${plotDMF.markup}
        <g clip-path="url(#${plotDMF.clipId})">
          ${plotDMF.line(ptsDMF, '#ec4899', 'stroke-width="2.5"')}
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
    if (id === 'zeta') state.zeta = val;
    draw();
  }, { signal: events.signal });

  root.addEventListener('change', event => {
    if (event.target.id === 'app-family') {
      state.family = event.target.value;
      render();
      root.querySelector('#app-family')?.focus();
    }
  }, { signal: events.signal });

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    if (button.dataset.preset === 'blast') {
      state.family = 'sdof-harmonic-pulse';
      state.a = 1.0;
      state.zeta = 0.05;
      state.tMax = 10.0;
    } else if (button.dataset.preset === 'beam') {
      state.family = 'beam-elastic-point';
      state.a = 2.0;
      state.tMax = 6.0;
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
