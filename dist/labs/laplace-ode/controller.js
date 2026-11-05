import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  laplaceOdeExact,
  laplaceOdeFamilies,
  laplaceOdeMetrics,
  laplaceOdeRK4,
  laplaceOdeTimeCurves
} from '../../models/laplace-ode.js';

const FAMILY_CONFIGS = {
  'undamped-resonance': {
    name: { tr: '1. Sönümsüz Rezonans: y″ + 4y = 2 cos 2t (Örnek 6.18)', en: '1. Undamped Resonance: y″ + 4y = 2 cos 2t (Example 6.18)' },
    formula: 'Y(s) = \\frac{sy_0 + y\'_0}{s^2 + 4} + \\frac{2s}{(s^2 + 4)^2} \\to y(t) = \\frac{1}{2}t\\sin 2t',
    method: '<mi>Y</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mi>s</mi><msub><mi>y</mi><mn>0</mn></msub><mo>+</mo><mi>y</mi><msub><mo>′</mo><mn>0</mn></msub></mrow><mrow><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn></mrow></mfrac><mo>+</mo><mfrac><mrow><mn>2</mn><mi>s</mi></mrow><msup><mrow><mo>(</mo><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo>)</mo></mrow><mn>2</mn></msup></mfrac>',
    note: {
      tr: 'Doğal frekans ω = 2 ile zorlama frekansı tam eşleşir. Paydadaki (s² + 4)² terimi zaman bölgesinde t sin 2t seküler büyümesini üretir.',
      en: 'The natural frequency ω = 2 matches the forcing frequency. The (s² + 4)² denominator produces secular growth t sin 2t.'
    }
  },
  'damped-harmonic': {
    name: { tr: '2. Sönümlü Harmonik Salınım: y″ + 2y′ + 5y = e⁻ᵗ', en: '2. Damped Harmonic Motion: y″ + 2y′ + 5y = e⁻ᵗ' },
    formula: 'Y(s) = \\frac{(s+2)y_0 + y\'_0}{(s+1)^2 + 4} + \\frac{1}{(s+1)[(s+1)^2 + 4]}',
    method: '<mi>Y</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mo>(</mo><mi>s</mi><mo>+</mo><mn>2</mn><mo>)</mo><msub><mi>y</mi><mn>0</mn></msub><mo>+</mo><mi>y</mi><msub><mo>′</mo><mn>0</mn></msub></mrow><mrow><msup><mrow><mo>(</mo><mi>s</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><mn>4</mn></mrow></mfrac><mo>+</mo><mfrac><mn>1</mn><mrow><mo>(</mo><mi>s</mi><mo>+</mo><mn>1</mn><mo>)</mo><mo>[</mo><msup><mrow><mo>(</mo><mi>s</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo>]</mo></mrow></mfrac>',
    note: {
      tr: 'Karmaşık eşlenik kökler s = −1 ± 2i nedeniyle serbest yanıt e⁻ᵗ sönümüyle ölür; sistem zorlama frekansının kararlı rejimine oturur.',
      en: 'Poles at s = −1 ± 2i cause the transient response to decay as e⁻ᵗ, settling smoothly into steady-state motion.'
    }
  },
  'step-pulse-ivp': {
    name: { tr: '3. Parçalı Basamak Zorlaması: y″ + 4y = H(t − 1) − H(t − 3)', en: '3. Piecewise Step Forcing: y″ + 4y = H(t − 1) − H(t − 3)' },
    formula: 'Y(s) = \\frac{e^{-s} - e^{-3s}}{s(s^2 + 4)}',
    method: '<mi>Y</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><msup><mi>e</mi><mrow><mo>−</mo><mi>s</mi></mrow></msup><mo>−</mo><msup><mi>e</mi><mrow><mo>−</mo><mn>3</mn><mi>s</mi></mrow></msup></mrow><mrow><mi>s</mi><mo>(</mo><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo>)</mo></mrow></mfrac>',
    note: {
      tr: '2. Kaydırma teoremiyle ters dönüşüm: t = 1 anında darbe başlar ve t = 3 anında darbe kesildikten sonra artık serbest salınım kalır.',
      en: 'Inverted via the 2nd Shifting Theorem: excitation turns on at t = 1 and shuts off at t = 3, leaving residual oscillations.'
    }
  },
  'periodic-staircase': {
    name: { tr: '4. Darbe Katarı ile Zorlanan BDP: y″ + y = δ(t − 2) + δ(t − 4)', en: '4. Impulse-Forced IVP: y″ + y = δ(t − 2) + δ(t − 4)' },
    formula: 'Y(s) = \\frac{e^{-2s} + e^{-4s}}{s^2 + 1} \\to y(t) = \\sin(t-2)H(t-2) + \\sin(t-4)H(t-4)',
    method: '<mi>y</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mi>sin</mi><mo>(</mo><mi>t</mi><mo>−</mo><mn>2</mn><mo>)</mo><mi>H</mi><mo>(</mo><mi>t</mi><mo>−</mo><mn>2</mn><mo>)</mo><mo>+</mo><mi>sin</mi><mo>(</mo><mi>t</mi><mo>−</mo><mn>4</mn><mo>)</mo><mi>H</mi><mo>(</mo><mi>t</mi><mo>−</mo><mn>4</mn><mo>)</mo>',
    note: {
      tr: 'Anlık çekiç darbeleri t = 2 ve t = 4 anlarında sisteme momentum enjekte eder. Hız sıçrama yapar; deplasman süreklidir.',
      en: 'Instantaneous hammer strikes inject momentum at t = 2 and t = 4. Velocity jumps discontinuously while displacement stays continuous.'
    }
  },
  'higher-order-ivp': {
    name: { tr: '5. 3. Mertebeden BDP: y‴ − 3y″ + 3y′ − y = eᵗ', en: '5. 3rd-Order IVP: y‴ − 3y″ + 3y′ − y = eᵗ' },
    formula: '(s - 1)^3 Y(s) = \\frac{1}{s - 1} + P_{IC}(s) \\to y(t) = \\frac{1}{6}t^3 e^t + \\text{homojen terimler}',
    method: '<mi>Y</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mn>1</mn><msup><mrow><mo>(</mo><mi>s</mi><mo>−</mo><mn>1</mn><mo>)</mo></mrow><mn>4</mn></msup></mfrac><mo>+</mo><mfrac><mrow><msub><mi>P</mi><mrow><mi>I</mi><mi>C</mi></mrow></msub><mo>(</mo><mi>s</mi><mo>)</mo></mrow><msup><mrow><mo>(</mo><mi>s</mi><mo>−</mo><mn>1</mn><mo>)</mo></mrow><mn>3</mn></msup></mfrac>',
    note: {
      tr: 'Üç katlı karakteristik kök (s − 1)³ ve sağ taraftaki eᵗ nedeniyle dördüncü mertebe katlı kutup oluşur; t³eᵗ terimi doğar.',
      en: 'Triple root at s = 1 plus eᵗ forcing yields a 4th-order repeated pole, producing the characteristic t³eᵗ particular mode.'
    }
  }
};

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  let state = {
    family: 'undamped-resonance',
    k: 4.0,
    y0: 0.0,
    v0: 0.0,
    tMax: 12.0
  };

  const fmt = (val, digits = 2) => (context.format ? context.format(val, digits) : Number(val).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);

  function getParams() {
    return {
      k: state.k,
      y0: state.y0,
      v0: state.v0
    };
  }

  function render() {
    const lang = context.lang || 'tr';
    const cfg = FAMILY_CONFIGS[state.family] || FAMILY_CONFIGS['undamped-resonance'];

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
                    ${esc(FAMILY_CONFIGS[f].name[lang] || FAMILY_CONFIGS[f].name.tr)}
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

              <div class="sep-control">
                <label for="ode-k">
                  ${esc(t('laplaceOdeParamK'))} (k)
                  <output data-output="k">${fmt(state.k, 1)}</output>
                </label>
                <input id="ode-k" data-input="k" type="range" min="1.0" max="9.0" step="0.5" value="${state.k}">
              </div>

              <div class="sep-control">
                <label for="ode-y0">
                  ${esc(t('laplaceOdeParamY0'))} (y₀)
                  <output data-output="y0">${fmt(state.y0, 2)}</output>
                </label>
                <input id="ode-y0" data-input="y0" type="range" min="-3.0" max="3.0" step="0.25" value="${state.y0}">
              </div>

              <div class="sep-control">
                <label for="ode-v0">
                  ${esc(t('laplaceOdeParamV0'))} (v₀)
                  <output data-output="v0">${fmt(state.v0, 2)}</output>
                </label>
                <input id="ode-v0" data-input="v0" type="range" min="-4.0" max="4.0" step="0.5" value="${state.v0}">
              </div>

              <div class="sep-presets">
                <button type="button" class="button secondary" data-preset="resonance">${esc(t('laplaceOdePresetResonance'))}</button>
                <button type="button" class="button secondary" data-preset="piecewise">${esc(t('laplaceOdePresetPiecewise'))}</button>
              </div>

              <p class="family-note">${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>

            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i style="background:#2d6d4b"></i>${esc(t('laplaceOdeLegendTotal'))}</span>
                <span class="sep-b"><i style="background:#3b82f6;border-top:2px dashed #3b82f6"></i>${esc(t('laplaceOdeLegendFree'))}</span>
                <span><i style="background:#f97316;border-top:2px dashed #f97316"></i>${esc(t('laplaceOdeLegendForced'))}</span>
              </div>
              <svg class="cx-chart" id="ode-time-plot" role="img" viewBox="0 0 740 280" aria-label="${esc(t('laplaceOdeTimePlotAria'))}"></svg>

              <div class="sep-legend" style="margin-top:22px;">
                <span><i style="background:#8b5cf6"></i>${esc(t('laplaceOdeLegendPhase'))}</span>
              </div>
              <svg class="cx-chart" id="ode-phase-plot" role="img" viewBox="0 0 740 240" aria-label="${esc(t('laplaceOdePhasePlotAria'))}"></svg>

              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(t('laplaceOdeFormulaHeader'))}</p>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                <mrow>${cfg.method}</mrow>
              </math>
              <p>${esc(cfg.note[lang] || cfg.note.tr)}</p>
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
    const params = getParams();

    // 1. Output values
    const outT = root.querySelector('[data-output="tmax"]');
    if (outT) outT.textContent = fmt(state.tMax, 1);
    const outK = root.querySelector('[data-output="k"]');
    if (outK) outK.textContent = fmt(state.k, 1);
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
          <strong>${esc(m.odeString)}</strong>
          <p>${esc(t('laplaceOdeCardEquationSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceOdeCardRoots'))}</p>
          <strong>${esc(m.characteristicRoots)}</strong>
          <p>${esc(t('laplaceOdeCardRootsSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceOdeCardMethod'))}</p>
          <strong>${esc(m.structureSummary)}</strong>
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
    const yMaxTime = Math.max(1.5, Math.min(15.0, maxVal * 1.15));

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
    const rk4Traj = laplaceOdeRK4(state.family, params, state.tMax, 220);
    const phasePoints = rk4Traj.map(pt => [pt.y, pt.v]);
    const maxYPhase = Math.max(...rk4Traj.map(p => Math.abs(p.y)), 0.5);
    const maxVPhase = Math.max(...rk4Traj.map(p => Math.abs(p.v)), 0.5);
    const limY = Math.max(1.2, Math.min(12.0, maxYPhase * 1.15));
    const limV = Math.max(1.2, Math.min(15.0, maxVPhase * 1.15));

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
    if (id === 'k') state.k = val;
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
      state.family = 'undamped-resonance';
      state.k = 4.0;
      state.y0 = 0.0;
      state.v0 = 0.0;
      state.tMax = 12.0;
    } else if (button.dataset.preset === 'piecewise') {
      state.family = 'step-pulse-ivp';
      state.k = 4.0;
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
