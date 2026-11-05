import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  heavisideConvergenceAbscissa,
  heavisideExact,
  heavisideFamilies,
  heavisideMetrics,
  heavisideSpectrumCurve,
  heavisideTimeCurves
} from '../../models/heaviside.js';

const FAMILY_CONFIGS = {
  step: {
    name: { tr: '1. Gecikmeli Birim Basamak: H(t − a) (Tanım ve Örnek 6.6)', en: '1. Delayed Unit Step: H(t − a) (Definition & Example 6.6)' },
    paramName: null,
    formula: 'F(s) = \\frac{e^{-as}}{s}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup><mi>s</mi></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'a anında 0\'dan 1\'e sıçrayan standart Heaviside fonksiyonu. t < a için sıfır olduğundan integral a\'dan başlar; e^{-as}/s dönüşümünü üretir.',
      en: 'The standard Heaviside step jumping from 0 to 1 at t = a. Since it vanishes for t < a, the integral starts at a, yielding e^{-as}/s.'
    }
  },
  pulse: {
    name: { tr: '2. Dikdörtgen Darbe / Pencere: H(t − a) − H(t − b) (Örnek 6.6)', en: '2. Rectangular Pulse Window: H(t − a) − H(t − b) (Example 6.6)' },
    paramName: 'b',
    paramMin: 2.0,
    paramMax: 6.0,
    paramStep: 0.5,
    formula: 'F(s) = \\frac{e^{-as} - e^{-bs}}{s}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup><mo>−</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>b</mi><mi>s</mi></mrow></msup></mrow><mi>s</mi></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: '[a, b] penceresinde 1, diğer her yerde 0 olan sonlu darbe. İki Heaviside basamağının farkı olarak yazılır.',
      en: 'A finite pulse equal to 1 on [a, b] and 0 elsewhere, formulated as the difference of two Heaviside steps.'
    }
  },
  'delayed-ramp': {
    name: { tr: '3. Gecikmeli Rampa: (t − a)H(t − a) (2. Kaydırma Teoremi)', en: '3. Delayed Ramp: (t − a)H(t − a) (2nd Shifting Theorem)' },
    paramName: null,
    formula: 'F(s) = \\frac{e^{-as}}{s^2}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup><msup><mi>s</mi><mn>2</mn></msup></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'İkinci kaydırma teoremi: L{f(t-a)H(t-a)} = e^{-as}F(s). f(t)=t rampasının 1/s² dönüşümü e^{-as} ile ötelenir.',
      en: 'Second Shifting Theorem: L{f(t-a)H(t-a)} = e^{-as}F(s). The 1/s² ramp transform is attenuated by e^{-as}.'
    }
  },
  'delayed-exp': {
    name: { tr: '4. Gecikmeli Üstel: e^{-k(t − a)}H(t − a) (Örnek 6.8)', en: '4. Delayed Exponential: e^{-k(t − a)}H(t − a) (Example 6.8)' },
    paramName: 'k',
    paramMin: 0.5,
    paramMax: 3.0,
    paramStep: 0.25,
    formula: 'F(s) = \\frac{e^{-as}}{s + k}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup><mrow><mi>s</mi><mo>+</mo><mi>k</mi></mrow></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'Argümanı (t-a) ile tam eşleşen üstel sinyal. s-bölgesinde doğrudan e^{-as}/(s+k) formunu alır.',
      en: 'Exponential with argument matching (t-a). Evaluates directly to e^{-as}/(s+k) in the s-domain.'
    }
  },
  'delayed-sin': {
    name: { tr: '5. Gecikmeli Sinüs: sin(ω(t − a))H(t − a) (Örnek 6.9)', en: '5. Delayed Sine: sin(ω(t − a))H(t − a) (Example 6.9)' },
    paramName: 'omega',
    paramMin: 0.5,
    paramMax: 4.0,
    paramStep: 0.25,
    formula: 'F(s) = \\frac{\\omega e^{-as}}{s^2 + \\omega^2}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mi>ω</mi><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup></mrow><mrow><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup></mrow></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'a anında sıfır fazıyla başlayan osilasyon. 2. kaydırma teoremi gereği ω/(s²+ω²) frekans spektrumu e^{-as} çarpanı kazanır.',
      en: 'Oscillation starting at zero phase at t = a. The base spectrum ω/(s²+ω²) is modulated by e^{-as}.'
    }
  },
  'unmatched-exp': {
    name: { tr: '6. Eşleşmeyen Üstel: e^{kt}H(t − a) (Örnek 6.8 Sınav Tuzağı)', en: '6. Unmatched Exponential: e^{kt}H(t − a) (Example 6.8 Exam Trap)' },
    paramName: 'k',
    paramMin: -1.5,
    paramMax: 2.0,
    paramStep: 0.25,
    formula: 'F(s) = \\frac{e^{-a(s - k)}}{s - k}, \\quad s > k',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mo>(</mo><mi>s</mi><mo>−</mo><mi>k</mi><mo>)</mo></mrow></msup><mrow><mi>s</mi><mo>−</mo><mi>k</mi></mrow></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mi>k</mi>',
    note: {
      tr: 'Yaygın sınav tuzağı: Üstelin argümanı t, basamağın argümanı t-a\'dır! e^{kt} = e^{ka} e^{k(t-a)} yazılarak çözülür. Yakınsama sınırı s > k olur.',
      en: 'Classic exam trap: unmatched argument. Must factor e^{kt} = e^{ka} e^{k(t-a)} before shifting. Converges for s > k.'
    }
  },
  staircase: {
    name: { tr: '7. Merdiven Sinyali: H(t) + H(t − a) + H(t − 2a)', en: '7. Staircase Signal: H(t) + H(t − a) + H(t − 2a)' },
    paramName: null,
    formula: 'F(s) = \\frac{1 + e^{-as} + e^{-2as}}{s}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mn>2</mn><mi>a</mi><mi>s</mi></mrow></msup></mrow><mi>s</mi></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'Ardışık eşit aralıklı basamakların süperpozisyonu. Periyodik darbe dizilerinin ve dijital basamaklı sinyallerin temel yapı taşıdır.',
      en: 'Superposition of successive equidistant steps. The building block of pulsed and digital staircase signals.'
    }
  }
};

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  let state = {
    family: 'step',
    a: 2.0,
    s: 1.5,
    T: 12.0,
    extra: 1.0
  };

  const fmt = (val, digits = 2) => (context.format ? context.format(val, digits) : Number(val).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);

  function getParams() {
    const cfg = FAMILY_CONFIGS[state.family];
    const params = { a: state.a };
    if (cfg.paramName) {
      params[cfg.paramName] = state.extra;
    }
    return params;
  }

  function render() {
    const lang = context.lang || 'tr';
    const cfg = FAMILY_CONFIGS[state.family] || FAMILY_CONFIGS.step;
    const params = getParams();
    const s0 = heavisideConvergenceAbscissa(state.family, params);
    const isConv = state.s > s0;

    root.innerHTML = `
      <section class="sep-lab heaviside-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('heavisideEyebrow'))}</p>
          <h2>${esc(t('heavisideTitle'))}</h2>
          <p>${esc(t('heavisideSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="heaviside-family">${esc(t('heavisideFamily'))}</label>
              <select id="heaviside-family">
                ${heavisideFamilies().map(f => `
                  <option value="${esc(f)}" ${f === state.family ? 'selected' : ''}>
                    ${esc(FAMILY_CONFIGS[f].name[lang] || FAMILY_CONFIGS[f].name.tr)}
                  </option>
                `).join('')}
              </select>
            </div>
            <span class="op-badge ${isConv ? 'badge-ok' : 'badge-warn'}">
              s₀ = ${fmt(s0, 1)} (${isConv ? t('heavisideConvergent') : t('heavisideDivergent')})
            </span>
          </div>

          <div class="sep-grid">
            <div class="sep-controls">
              <div class="sep-control">
                <label for="heaviside-a">
                  ${esc(t('heavisideDelayA'))} (a)
                  <output data-output="a">${fmt(state.a, 2)}</output>
                </label>
                <input id="heaviside-a" data-input="a" type="range" min="0.5" max="5.0" step="0.25" value="${state.a}">
              </div>

              <div class="sep-control">
                <label for="heaviside-s">
                  ${esc(t('heavisideParamS'))} (s)
                  <output data-output="s">${fmt(state.s, 2)}</output>
                </label>
                <input id="heaviside-s" data-input="s" type="range" min="0.1" max="4.0" step="0.05" value="${state.s}">
              </div>

              <div class="sep-control">
                <label for="heaviside-T">
                  ${esc(t('heavisideHorizonT'))} (T)
                  <output data-output="T">${fmt(state.T, 0)}</output>
                </label>
                <input id="heaviside-T" data-input="T" type="range" min="4" max="25" step="1" value="${state.T}">
              </div>

              ${cfg.paramName ? `
                <div class="sep-control">
                  <label for="heaviside-extra">
                    ${esc(t('heavisideModelParam'))} (${cfg.paramName})
                    <output data-output="extra">${fmt(state.extra, 2)}</output>
                  </label>
                  <input id="heaviside-extra" data-input="extra" type="range" min="${cfg.paramMin}" max="${cfg.paramMax}" step="${cfg.paramStep}" value="${state.extra}">
                </div>
              ` : ''}

              <div class="sep-presets">
                <button type="button" class="button secondary" data-preset="standard">${esc(t('heavisidePresetStandard'))}</button>
                <button type="button" class="button secondary" data-preset="unmatched">${esc(t('heavisidePresetUnmatched'))}</button>
              </div>

              <p class="family-note">${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>

            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i style="background:#0284c7"></i>f(t)</span>
                <span class="sep-b"><i style="background:#94a3b8;border-top:2px dashed #94a3b8"></i>e⁻ˢᵗ</span>
                <span><i style="background:#10b981"></i>e⁻ˢᵗ f(t)</span>
              </div>
              <svg class="cx-chart" id="heaviside-time-plot" role="img" viewBox="0 0 740 280" aria-label="${esc(t('heavisideTimePlotAria'))}"></svg>

              <div class="sep-legend" style="margin-top:22px;">
                <span><i style="background:#6366f1"></i>F(s)</span>
                <span class="sep-b"><i style="background:#ef4444;border-top:2px dashed #ef4444"></i>s₀ ${esc(t('heavisideConvergent'))}</span>
              </div>
              <svg class="cx-chart" id="heaviside-spectrum-plot" role="img" viewBox="0 0 740 240" aria-label="${esc(t('heavisideSpectrumPlotAria'))}"></svg>

              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(t('heavisideFormulaHeader'))}</p>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                <mrow>${cfg.method}</mrow>
              </math>
              <p>${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(t('heavisideKernelDecayHeader'))}</p>
              <p>${esc(t('laplaceKernelDecayDesc'))}</p>
              <p class="small text-muted">${esc(t('heavisideDelayAttenuation'))}: e⁻ᵃˢ = ${Math.exp(-state.a * state.s).toFixed(4)}</p>
            </div>
          </div>
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(t('laplaceFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(t('laplaceGoToClinic'))}</a>
        </footer>
      </section>
    `;

    draw();
  }

  function draw() {
    const params = getParams();
    const cfg = FAMILY_CONFIGS[state.family];

    // 1. Output values
    const outA = root.querySelector('[data-output="a"]');
    if (outA) outA.textContent = fmt(state.a, 2);
    const outS = root.querySelector('[data-output="s"]');
    if (outS) outS.textContent = fmt(state.s, 2);
    const outT = root.querySelector('[data-output="T"]');
    if (outT) outT.textContent = fmt(state.T, 0);
    const outExtra = root.querySelector('[data-output="extra"]');
    if (outExtra && cfg.paramName) outExtra.textContent = fmt(state.extra, 2);

    // 2. Metrics
    const m = heavisideMetrics(state.family, state.s, state.T, params);
    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      metricsBox.innerHTML = `
        <article class="metric">
          <p class="eyebrow">${esc(t('heavisideExactLabel'))}</p>
          <strong>${m.isConvergent && Number.isFinite(m.exactValue) ? fmt(m.exactValue, 4) : '—'}</strong>
          <p>${esc(t('heavisideExactSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('heavisideNumericalLabel'))}</p>
          <strong>${fmt(m.numericalValue, 4)}</strong>
          <p>${esc(t('heavisideNumericalSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('heavisideErrorLabel'))}</p>
          <strong>${m.isConvergent && Number.isFinite(m.relativeError) ? `${(m.relativeError * 100).toFixed(2)}%` : '—'}</strong>
          <p>${esc(t('heavisideErrorSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('heavisideDecayLabel'))}</p>
          <strong>${m.horizonDamping < 1e-4 ? '< 0.0001' : fmt(m.horizonDamping, 4)}</strong>
          <p>${esc(t('heavisideDecaySub'))}</p>
        </article>
      `;
    }

    // 3. Time Domain Plot
    const { fCurve, kernelCurve, integrandCurve } = heavisideTimeCurves(state.family, state.s, state.T, params, 150);
    let maxF = 1.5;
    for (const pt of fCurve) {
      if (Math.abs(pt.value) > maxF && Math.abs(pt.value) < 15) maxF = Math.abs(pt.value);
    }
    const yMaxLeft = Math.min(maxF * 1.25, 8.0);

    const plotLeft = cartesianPlot({
      width: 740,
      height: 280,
      xMin: 0,
      xMax: state.T,
      yMin: -0.2,
      yMax: yMaxLeft,
      format: v => fmt(v, 1),
      xLabel: 't',
      yLabel: 'f(t), e⁻ˢᵗ',
      id: 'heaviside-time'
    });

    const ptsF = fCurve.map(pt => [pt.t, pt.value]);
    const ptsK = kernelCurve.map(pt => [pt.t, pt.value]);
    const ptsI = integrandCurve.map(pt => [pt.t, pt.value]);

    const svgLeft = root.querySelector('#heaviside-time-plot');
    if (svgLeft) {
      svgLeft.innerHTML = `
        ${plotLeft.markup}
        <g clip-path="url(#${plotLeft.clipId})">
          ${plotLeft.line(ptsK, '#94a3b8', 'stroke-width="1.8" stroke-dasharray="4 4"')}
          ${plotLeft.line(ptsI, '#10b981', 'stroke-width="2.2"')}
          ${plotLeft.line(ptsF, '#0284c7', 'stroke-width="2.6"')}
          <line x1="${plotLeft.x(state.a)}" y1="${plotLeft.top}" x2="${plotLeft.x(state.a)}" y2="${plotLeft.height - plotLeft.bottom}" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 3"/>
        </g>
      `;
    }

    // 4. Spectrum Plot
    const sMaxLimit = 4.0;
    const { curve } = heavisideSpectrumCurve(state.family, 0.05, sMaxLimit, params, 70);
    let maxY = 3.0;
    for (const pt of curve) {
      if (pt.value > maxY && pt.value < 20) maxY = pt.value;
    }

    const plotRight = cartesianPlot({
      width: 740,
      height: 240,
      xMin: 0,
      xMax: sMaxLimit,
      yMin: -0.1,
      yMax: Math.min(maxY * 1.15, 12),
      format: v => fmt(v, 1),
      xLabel: 's',
      yLabel: 'F(s)',
      id: 'heaviside-spectrum'
    });

    const ptsSpec = curve.filter(pt => Number.isFinite(pt.value)).map(pt => [pt.s, pt.value]);

    const svgRight = root.querySelector('#heaviside-spectrum-plot');
    if (svgRight) {
      let extraMarkup = '';
      if (m.s0 > 0 && m.s0 < sMaxLimit) {
        extraMarkup += `<line x1="${plotRight.x(m.s0)}" y1="${plotRight.top}" x2="${plotRight.x(m.s0)}" y2="${plotRight.height - plotRight.bottom}" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 4"/>`;
      }
      if (m.isConvergent && Number.isFinite(m.exactValue) && state.s <= sMaxLimit && m.exactValue <= maxY * 1.15) {
        extraMarkup += plotRight.point(state.s, m.exactValue, '#6366f1');
      }

      svgRight.innerHTML = `
        ${plotRight.markup}
        <g clip-path="url(#${plotRight.clipId})">
          ${plotRight.line(ptsSpec, '#6366f1', 'stroke-width="2.5"')}
          ${extraMarkup}
        </g>
      `;
    }
  }

  // Delegated Event Listeners
  root.addEventListener('input', event => {
    const id = event.target.dataset.input;
    if (!id) return;
    const val = parseFloat(event.target.value);
    if (id === 'a') state.a = val;
    if (id === 's') state.s = val;
    if (id === 'T') state.T = val;
    if (id === 'extra') state.extra = val;
    draw();
  }, { signal: events.signal });

  root.addEventListener('change', event => {
    if (event.target.id === 'heaviside-family') {
      state.family = event.target.value;
      const cfg = FAMILY_CONFIGS[state.family];
      if (cfg.paramName) {
        state.extra = (cfg.paramMin + cfg.paramMax) / 2;
      }
      render();
      root.querySelector('#heaviside-family')?.focus();
    }
  }, { signal: events.signal });

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    if (button.dataset.preset === 'standard') {
      state.family = 'step';
      state.a = 2.0;
      state.s = 1.5;
      state.T = 12.0;
    } else if (button.dataset.preset === 'unmatched') {
      state.family = 'unmatched-exp';
      state.a = 1.5;
      state.extra = 0.5;
      state.s = 2.0;
      state.T = 14.0;
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
