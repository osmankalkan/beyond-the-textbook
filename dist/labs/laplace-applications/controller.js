import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  laplaceAppDMF,
  laplaceAppFamilies,
  laplaceAppFrequencyResponse,
  laplaceAppMetrics,
  laplaceAppResponseCurves
} from '../../models/laplace-applications.js';

const FAMILY_CONFIGS = {
  'sdof-ramp-blast': {
    name: { tr: '1. Darbe ve Patlama Yükü Altında SDOF Titreşimi (Örnek 6.19)', en: '1. SDOF Vibration under Blast Pulse (Example 6.19)' },
    formula: 'F(t) = F_0 \\left(1 - \\frac{t}{t_0}\\right)\\left[H(t) - H(t - t_0)\\right]',
    method: '<mi>x</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mfrac><msub><mi>F</mi><mn>0</mn></msub><mi>k</mi></mfrac><mrow><mo>[</mo><mn>1</mn><mo>−</mo><mi>cos</mi><mo>(</mo><msub><mi>ω</mi><mi>n</mi></msub><mi>t</mi><mo>)</mo><mo>−</mo><mfrac><mrow><mi>t</mi><mo>−</mo><mfrac><mrow><mi>sin</mi><mo>(</mo><msub><mi>ω</mi><mi>n</mi></msub><mi>t</mi><mo>)</mo></mrow><msub><mi>ω</mi><mi>n</mi></msub></mfrac></mrow><msub><mi>t</mi><mn>0</mn></msub></mfrac><mo>]</mo></mrow>',
    note: {
      tr: 't₀ darbe süresi boyunca zorlanmış hareket gerçekleşir; t > t₀ için uyarım kesilir ve sistem son durumundan serbest salınıma devam eder.',
      en: 'Forced motion acts during pulse duration t₀; for t > t₀ excitation vanishes and the structure vibrates freely from its state at t₀.'
    }
  },
  'sdof-harmonic-resonance': {
    name: { tr: '2. Harmonik Uyarım ve Dinamik Büyütme (DMF)', en: '2. Harmonic Excitation & Dynamic Magnification (DMF)' },
    formula: 'DMF = \\frac{1}{\\sqrt{(1 - r^2)^2 + (2\\zeta r)^2}}, \\quad r = \\frac{\\omega}{\\omega_n}',
    method: '<mi>D</mi><mi>M</mi><mi>F</mi><mo>=</mo><mfrac><mn>1</mn><msqrt><mrow><msup><mrow><mo>(</mo><mn>1</mn><mo>−</mo><msup><mi>r</mi><mn>2</mn></msup><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mn>2</mn><mi>ζ</mi><mi>r</mi><mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mfrac>',
    note: {
      tr: 'Frekans oranı r → 1 olduğunda rezonans tepe noktasına ulaşır. Sönüm oranı ζ büyüdükçe rezonans piki sönümlenir ve tepe sola kayar.',
      en: 'As frequency ratio r → 1, resonance peaks. Larger damping ζ bounds the peak amplitude and shifts the resonant frequency slightly lower.'
    }
  },
  'rlc-periodic-square': {
    name: { tr: '3. Seri RLC Devresinde Periyodik Kare Dalga (Örnek 6.20)', en: '3. Series RLC Circuit with Periodic Square Wave (Example 6.20)' },
    formula: 'L\\frac{di}{dt} + Ri + \\frac{1}{C}\\int i\\,dt = v(t), \\quad I(s) = \\frac{s V(s)}{Ls^2 + Rs + 1/C}',
    method: '<mi>I</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mi>s</mi><mi>V</mi><mo>(</mo><mi>s</mi><mo>)</mo></mrow><mrow><mi>L</mi><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><mi>R</mi><mi>s</mi><mo>+</mo><mfrac><mn>1</mn><mi>C</mi></mfrac></mrow></mfrac>',
    note: {
      tr: 'Periyodik sinyallerin Laplace dönüşümü L{f} = [∫₀ᵀ e⁻ˢᵗ f(t) dt] / (1 − e⁻ˢᵀ) formülüyle elde edilir; RLC empedansıyla doğrudan çözülür.',
      en: 'Periodic waveforms convert via L{f} = [∫₀ᵀ e⁻ˢᵗ f(t) dt] / (1 − e⁻ˢᵀ); the current solves directly across the RLC impedance.'
    }
  },
  'rlc-resonant-filter': {
    name: { tr: '4. RLC Band Geçiren Filtre ve Q-Faktörü', en: '4. RLC Bandpass Filter & Quality Factor (Q)', },
    formula: 'H(s) = \\frac{(R/L)s}{s^2 + (R/L)s + 1/(LC)}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}',
    method: '<mi>H</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mfrac><mi>R</mi><mi>L</mi></mfrac><mi>s</mi></mrow><mrow><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><mfrac><mi>R</mi><mi>L</mi></mfrac><mi>s</mi><mo>+</mo><mfrac><mn>1</mn><mrow><mi>L</mi><mi>C</mi></mrow></mfrac></mrow></mfrac>',
    note: {
      tr: 'Yüksek kalite faktörü Q dar bir geçirme bandı ve keskin bir rezonans tepesi sağlar; istenmeyen parazit frekanslar bastırılır.',
      en: 'A high quality factor Q creates a narrow passband with a sharp resonance peak, effectively filtering out noise frequencies.'
    }
  },
  'beam-elastic-point': {
    name: { tr: '5. Elastik Kiriş Eğilmesi: EI y⁽⁴⁾(x) = P δ(x − a)', en: '5. Elastic Beam Deflection: EI y⁽⁴⁾(x) = P δ(x − a)' },
    formula: 'EI\\, y^{(4)}(x) = P\\delta(x - a) \\to y(x) = y(0) + y\'(0)x + \\frac{y\'\'(0)}{2}x^2 + \\frac{y\'\'\'(0)}{6}x^3 + \\frac{P}{6EI}(x-a)^3 H(x-a)',
    method: '<mi>y</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>P</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mfrac><mi>P</mi><mrow><mn>6</mn><mi>E</mi><mi>I</mi></mrow></mfrac><msup><mrow><mo>(</mo><mi>x</mi><mo>−</mo><mi>a</mi><mo>)</mo></mrow><mn>3</mn></msup><mi>H</mi><mo>(</mo><mi>x</mi><mo>−</mo><mi>a</mi><mo>)</mo>',
    note: {
      tr: 'Uzaysal Laplace dönüşümü: Tekil nokta yükü Pδ(x-a) basamak fonksiyonu (x-a)³H(x-a) çökmesine dönüşür; sınır koşulları tek adımda sağlanır.',
      en: 'Spatial Laplace transform: point load Pδ(x-a) yields a cubic step deflection (x-a)³H(x-a); boundary conditions resolve in one step.'
    }
  }
};

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  let state = {
    family: 'sdof-ramp-blast',
    a: 1.0,
    zeta: 0.05,
    omega: 1.0,
    tMax: 10.0
  };

  const fmt = (val, digits = 2) => (context.format ? context.format(val, digits) : Number(val).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);

  function getParams() {
    return {
      a: state.a,
      zeta: state.zeta,
      omega: state.omega,
      k: 4.0,
      t0: state.a,
      f0: 1.0,
      R: 2.0,
      L: 1.0,
      C: 0.25,
      P: 10.0,
      EI: 1.0,
      span: state.tMax
    };
  }

  function render() {
    const lang = context.lang || 'tr';
    const cfg = FAMILY_CONFIGS[state.family] || FAMILY_CONFIGS['sdof-ramp-blast'];

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
                    ${esc(FAMILY_CONFIGS[f].name[lang] || FAMILY_CONFIGS[f].name.tr)}
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

              <div class="sep-control">
                <label for="app-a">
                  ${esc(t('laplaceAppParamA'))} (a / t₀)
                  <output data-output="a">${fmt(state.a, 2)}</output>
                </label>
                <input id="app-a" data-input="a" type="range" min="0.2" max="4.0" step="0.2" value="${state.a}">
              </div>

              <div class="sep-control">
                <label for="app-zeta">
                  ${esc(t('laplaceAppParamZeta'))} (ζ)
                  <output data-output="zeta">${fmt(state.zeta, 2)}</output>
                </label>
                <input id="app-zeta" data-input="zeta" type="range" min="0.01" max="0.50" step="0.02" value="${state.zeta}">
              </div>

              <div class="sep-control">
                <label for="app-omega">
                  ${esc(t('laplaceAppParamOmega'))} (ω)
                  <output data-output="omega">${fmt(state.omega, 2)}</output>
                </label>
                <input id="app-omega" data-input="omega" type="range" min="0.2" max="3.5" step="0.1" value="${state.omega}">
              </div>

              <div class="sep-presets">
                <button type="button" class="button secondary" data-preset="blast">${esc(t('laplaceAppPresetBlast'))}</button>
                <button type="button" class="button secondary" data-preset="beam">${esc(t('laplaceAppPresetBeam'))}</button>
              </div>

              <p class="family-note">${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>

            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i style="background:#2d6d4b"></i>${esc(t('laplaceAppLegendResponse'))}</span>
              </div>
              <svg class="cx-chart" id="app-response-plot" role="img" viewBox="0 0 740 280" aria-label="${esc(t('laplaceAppResponsePlotAria'))}"></svg>

              <div class="sep-legend" style="margin-top:22px;">
                <span><i style="background:#ec4899"></i>${esc(t('laplaceAppLegendDMF'))}</span>
              </div>
              <svg class="cx-chart" id="app-dmf-plot" role="img" viewBox="0 0 740 240" aria-label="${esc(t('laplaceAppDMFPlotAria'))}"></svg>

              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(t('laplaceAppFormulaHeader'))}</p>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                <mrow>${cfg.method}</mrow>
              </math>
              <p>${esc(cfg.note[lang] || cfg.note.tr)}</p>
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
    const params = getParams();

    // 1. Output values
    const outT = root.querySelector('[data-output="tmax"]');
    if (outT) outT.textContent = fmt(state.tMax, 1);
    const outA = root.querySelector('[data-output="a"]');
    if (outA) outA.textContent = fmt(state.a, 2);
    const outZ = root.querySelector('[data-output="zeta"]');
    if (outZ) outZ.textContent = fmt(state.zeta, 2);
    const outW = root.querySelector('[data-output="omega"]');
    if (outW) outW.textContent = fmt(state.omega, 2);

    // 2. Metrics & Curves
    const m = laplaceAppMetrics(state.family, params);
    const { primaryCurve } = laplaceAppResponseCurves(state.family, params, state.tMax, 180);
    const maxVal = Math.max(...primaryCurve.map(p => Math.abs(p.value)), 0.1);

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
          <strong>${esc(m.transferFunc)}</strong>
          <p>${esc(t('laplaceAppCardTransferSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceAppCardRole'))}</p>
          <strong>${esc(m.physicalRole)}</strong>
          <p>${esc(t('laplaceAppCardRoleSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('laplaceAppCardResonance'))}</p>
          <strong>${esc(m.resonanceNote)}</strong>
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

    const ptsResp = primaryCurve.map(p => [p.t, p.value]);
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
    if (id === 'omega') state.omega = val;
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
      state.family = 'sdof-ramp-blast';
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
