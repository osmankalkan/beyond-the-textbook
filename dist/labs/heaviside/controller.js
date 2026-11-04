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

export function mount(container, options = {}) {
  let lang = options.lang === 'en' ? 'en' : 'tr';
  let t = options.t || (k => k);

  let currentFamily = 'step';
  let sVal = 1.5;
  let tHorizon = 12.0;
  let delayA = 2.0;
  let extraParam = 1.0; // b for pulse, k for exp, omega for sin

  let abortController = new AbortController();

  function renderSkeleton() {
    container.innerHTML = `
      <div class="lab-shell heaviside-workbench" style="display:flex; flex-direction:column; gap:1.25rem;">
        <header class="workbench-header" style="border-bottom:1px solid var(--border-color, #e2e8f0); padding-bottom:0.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <span class="badge" style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:var(--primary, #0284c7);">
                ${t('heavisideEyebrow')}
              </span>
              <h3 style="margin:0.25rem 0 0; font-size:1.25rem; font-weight:700;">
                ${t('heavisideTitle')}
              </h3>
              <p style="margin:0.25rem 0 0; font-size:0.875rem; color:var(--text-muted, #64748b);">
                ${t('heavisideSubtitle')}
              </p>
            </div>
            <div class="preset-buttons" style="display:flex; gap:0.5rem;">
              <button type="button" class="btn btn-sm btn-outline" id="preset-standard">
                ${t('heavisidePresetStandard')}
              </button>
              <button type="button" class="btn btn-sm btn-outline" id="preset-unmatched">
                ${t('heavisidePresetUnmatched')}
              </button>
            </div>
          </div>
        </header>

        <!-- Controls Bar -->
        <div class="workbench-controls" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; background:var(--bg-subtle, #f8fafc); padding:1rem; border-radius:0.5rem; border:1px solid var(--border-color, #e2e8f0);">
          <div>
            <label for="heaviside-family-select" style="display:block; font-size:0.8125rem; font-weight:600; margin-bottom:0.25rem;">
              ${t('heavisideFamily')}
            </label>
            <select id="heaviside-family-select" class="form-select" style="width:100%; padding:0.375rem 0.5rem; font-size:0.875rem; border-radius:0.375rem; border:1px solid var(--border-color, #cbd5e1);">
              ${heavisideFamilies().map(f => `
                <option value="${f}" ${f === currentFamily ? 'selected' : ''}>
                  ${esc(FAMILY_CONFIGS[f].name[lang])}
                </option>
              `).join('')}
            </select>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.8125rem; font-weight:600; margin-bottom:0.25rem;">
              <label for="heaviside-delay-slider">${t('heavisideDelayA')}</label>
              <span id="heaviside-delay-val" style="font-family:monospace; color:var(--primary, #0284c7);">a = ${delayA.toFixed(1)}</span>
            </div>
            <input type="range" id="heaviside-delay-slider" min="0.5" max="5.0" step="0.25" value="${delayA}" style="width:100%;">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.8125rem; font-weight:600; margin-bottom:0.25rem;">
              <label for="heaviside-s-slider">${t('heavisideParamS')}</label>
              <span id="heaviside-s-val" style="font-family:monospace; color:var(--primary, #0284c7);">s = ${sVal.toFixed(2)}</span>
            </div>
            <input type="range" id="heaviside-s-slider" min="0.1" max="4.0" step="0.05" value="${sVal}" style="width:100%;">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.8125rem; font-weight:600; margin-bottom:0.25rem;">
              <label for="heaviside-horizon-slider">${t('heavisideHorizonT')}</label>
              <span id="heaviside-horizon-val" style="font-family:monospace; color:var(--text-muted, #64748b);">T = ${tHorizon.toFixed(0)}</span>
            </div>
            <input type="range" id="heaviside-horizon-slider" min="4" max="25" step="1" value="${tHorizon}" style="width:100%;">
          </div>

          <div id="heaviside-extra-wrapper" style="display:none;">
            <div style="display:flex; justify-content:space-between; font-size:0.8125rem; font-weight:600; margin-bottom:0.25rem;">
              <label for="heaviside-extra-slider" id="heaviside-extra-label">${t('heavisideModelParam')}</label>
              <span id="heaviside-extra-val" style="font-family:monospace; color:var(--primary, #0284c7);"></span>
            </div>
            <input type="range" id="heaviside-extra-slider" style="width:100%;">
          </div>
        </div>

        <!-- Formula and Analytical Insight Card -->
        <div class="workbench-formula-card" style="display:flex; align-items:center; justify-content:space-between; background:var(--card-bg, #ffffff); border:1px solid var(--border-color, #e2e8f0); border-left:4px solid var(--primary, #0284c7); padding:0.75rem 1rem; border-radius:0.375rem; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--text-muted, #64748b); text-transform:uppercase;">
              ${t('heavisideFormulaHeader')}:
            </span>
            <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline" style="font-size:1.1rem; color:var(--text, #0f172a);">
              <mrow id="heaviside-math-target"></mrow>
            </math>
          </div>
          <div id="heaviside-convergence-badge" class="badge" style="font-size:0.75rem; font-weight:700; padding:0.25rem 0.5rem; border-radius:0.25rem;"></div>
        </div>

        <!-- Dual Plots Grid -->
        <div class="workbench-plots-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
          <!-- Left: Time Domain Kernel & Switching Plot -->
          <div class="plot-box" style="background:var(--card-bg, #ffffff); border:1px solid var(--border-color, #e2e8f0); border-radius:0.5rem; padding:0.75rem; display:flex; flex-direction:column; gap:0.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4 style="margin:0; font-size:0.9375rem; font-weight:600;">
                ${t('heavisideTimePlotAria')}
              </h4>
              <div style="display:flex; gap:0.75rem; font-size:0.75rem;">
                <span style="display:flex; align-items:center; gap:0.25rem; color:#0284c7;">
                  <span style="width:10px; height:2px; background:#0284c7; display:inline-block;"></span> f(t)
                </span>
                <span style="display:flex; align-items:center; gap:0.25rem; color:#94a3b8;">
                  <span style="width:10px; height:2px; background:#94a3b8; display:inline-block;"></span> e⁻ˢᵗ
                </span>
                <span style="display:flex; align-items:center; gap:0.25rem; color:#10b981;">
                  <span style="width:10px; height:2px; background:#10b981; display:inline-block;"></span> e⁻ˢᵗ f(t)
                </span>
              </div>
            </div>
            <div id="heaviside-time-plot" style="width:100%; height:260px;"></div>
            <p id="heaviside-note-text" style="margin:0; font-size:0.8125rem; color:var(--text-muted, #64748b); line-height:1.4;"></p>
          </div>

          <!-- Right: s-Domain Laplace Spectrum Plot -->
          <div class="plot-box" style="background:var(--card-bg, #ffffff); border:1px solid var(--border-color, #e2e8f0); border-radius:0.5rem; padding:0.75rem; display:flex; flex-direction:column; gap:0.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4 style="margin:0; font-size:0.9375rem; font-weight:600;">
                ${t('heavisideSpectrumPlotAria')}
              </h4>
              <span id="heaviside-asymptote-label" style="font-size:0.75rem; font-weight:600; color:#ef4444;"></span>
            </div>
            <div id="heaviside-spectrum-plot" style="width:100%; height:260px;"></div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted, #64748b);">
              <span>${t('heavisideDelayAttenuation')}: <strong id="heaviside-delay-factor" style="color:var(--text, #0f172a); font-family:monospace;"></strong></span>
              <span>${t('heavisideKernelDecayHeader')}: <strong id="heaviside-horizon-factor" style="color:var(--text, #0f172a); font-family:monospace;"></strong></span>
            </div>
          </div>
        </div>

        <!-- Metrics Readout Row -->
        <div class="workbench-metrics" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem;">
          <div class="metric-card" style="background:var(--card-bg, #ffffff); border:1px solid var(--border-color, #e2e8f0); border-radius:0.375rem; padding:0.75rem; text-align:center;">
            <span style="display:block; font-size:0.75rem; color:var(--text-muted, #64748b); font-weight:600;">
              ${t('heavisideExactLabel')}
            </span>
            <span id="metric-exact" style="font-size:1.25rem; font-weight:700; color:var(--primary, #0284c7); font-family:monospace;">--</span>
            <span style="display:block; font-size:0.6875rem; color:var(--text-muted, #94a3b8); margin-top:0.25rem;">
              ${t('heavisideExactSub')}
            </span>
          </div>

          <div class="metric-card" style="background:var(--card-bg, #ffffff); border:1px solid var(--border-color, #e2e8f0); border-radius:0.375rem; padding:0.75rem; text-align:center;">
            <span style="display:block; font-size:0.75rem; color:var(--text-muted, #64748b); font-weight:600;">
              ${t('heavisideNumericalLabel')}
            </span>
            <span id="metric-num" style="font-size:1.25rem; font-weight:700; color:#10b981; font-family:monospace;">--</span>
            <span style="display:block; font-size:0.6875rem; color:var(--text-muted, #94a3b8); margin-top:0.25rem;">
              ${t('heavisideNumericalSub')}
            </span>
          </div>

          <div class="metric-card" style="background:var(--card-bg, #ffffff); border:1px solid var(--border-color, #e2e8f0); border-radius:0.375rem; padding:0.75rem; text-align:center;">
            <span style="display:block; font-size:0.75rem; color:var(--text-muted, #64748b); font-weight:600;">
              ${t('heavisideErrorLabel')}
            </span>
            <span id="metric-error" style="font-size:1.25rem; font-weight:700; color:#8b5cf6; font-family:monospace;">--</span>
            <span style="display:block; font-size:0.6875rem; color:var(--text-muted, #94a3b8); margin-top:0.25rem;">
              ${t('heavisideErrorSub')}
            </span>
          </div>

          <div class="metric-card" style="background:var(--card-bg, #ffffff); border:1px solid var(--border-color, #e2e8f0); border-radius:0.375rem; padding:0.75rem; text-align:center;">
            <span style="display:block; font-size:0.75rem; color:var(--text-muted, #64748b); font-weight:600;">
              ${t('heavisideDecayLabel')}
            </span>
            <span id="metric-decay" style="font-size:1.25rem; font-weight:700; color:#64748b; font-family:monospace;">--</span>
            <span style="display:block; font-size:0.6875rem; color:var(--text-muted, #94a3b8); margin-top:0.25rem;">
              ${t('heavisideDecaySub')}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  renderSkeleton();

  const familySelect = container.querySelector('#heaviside-family-select');
  const delaySlider = container.querySelector('#heaviside-delay-slider');
  const delayValText = container.querySelector('#heaviside-delay-val');
  const sSlider = container.querySelector('#heaviside-s-slider');
  const sValText = container.querySelector('#heaviside-s-val');
  const horizonSlider = container.querySelector('#heaviside-horizon-slider');
  const horizonValText = container.querySelector('#heaviside-horizon-val');

  const extraWrapper = container.querySelector('#heaviside-extra-wrapper');
  const extraLabel = container.querySelector('#heaviside-extra-label');
  const extraSlider = container.querySelector('#heaviside-extra-slider');
  const extraValText = container.querySelector('#heaviside-extra-val');

  const mathTarget = container.querySelector('#heaviside-math-target');
  const convBadge = container.querySelector('#heaviside-convergence-badge');
  const noteText = container.querySelector('#heaviside-note-text');
  const asymptoteLabel = container.querySelector('#heaviside-asymptote-label');
  const delayFactorText = container.querySelector('#heaviside-delay-factor');
  const horizonFactorText = container.querySelector('#heaviside-horizon-factor');

  const metricExact = container.querySelector('#metric-exact');
  const metricNum = container.querySelector('#metric-num');
  const metricError = container.querySelector('#metric-error');
  const metricDecay = container.querySelector('#metric-decay');

  const timePlotEl = container.querySelector('#heaviside-time-plot');
  const spectrumPlotEl = container.querySelector('#heaviside-spectrum-plot');

  function getParams() {
    const config = FAMILY_CONFIGS[currentFamily];
    const params = { a: delayA };
    if (config.paramName) {
      params[config.paramName] = extraParam;
    }
    return params;
  }

  function syncExtraSlider() {
    const config = FAMILY_CONFIGS[currentFamily];
    if (config.paramName) {
      extraWrapper.style.display = 'block';
      extraLabel.textContent = `${config.paramName} (${t('heavisideModelParam')}):`;
      extraSlider.min = config.paramMin;
      extraSlider.max = config.paramMax;
      extraSlider.step = config.paramStep;
      if (extraParam < config.paramMin || extraParam > config.paramMax) {
        extraParam = config.paramMin + (config.paramMax - config.paramMin) / 2;
      }
      extraSlider.value = extraParam;
      extraValText.textContent = `${config.paramName} = ${extraParam.toFixed(2)}`;
    } else {
      extraWrapper.style.display = 'none';
    }
  }

  function refreshPlots() {
    const cfg = FAMILY_CONFIGS[currentFamily];
    const params = getParams();

    // 1. Math Formula and Notes
    mathTarget.innerHTML = cfg.method;
    noteText.textContent = cfg.note[lang];

    // 2. Metrics
    const m = heavisideMetrics(currentFamily, sVal, tHorizon, params);

    if (m.isConvergent) {
      convBadge.textContent = t('heavisideConvergent');
      convBadge.style.background = '#dcfce7';
      convBadge.style.color = '#15803d';
      metricExact.textContent = Number.isFinite(m.exactValue) ? m.exactValue.toFixed(4) : '--';
      metricError.textContent = Number.isFinite(m.relativeError)
        ? (m.relativeError < 0.0001 ? '< 0.01%' : `${(m.relativeError * 100).toFixed(2)}%`)
        : '--';
    } else {
      convBadge.textContent = `${t('heavisideDivergent')} (s ≤ ${m.s0.toFixed(1)})`;
      convBadge.style.background = '#fee2e2';
      convBadge.style.color = '#b91c1c';
      metricExact.textContent = 'NaN';
      metricError.textContent = '∞';
    }

    metricNum.textContent = Number.isFinite(m.numericalValue) ? m.numericalValue.toFixed(4) : '--';
    metricDecay.textContent = m.horizonDamping < 1e-4 ? '< 0.0001' : m.horizonDamping.toFixed(4);

    delayFactorText.textContent = m.delayFactor.toFixed(4);
    horizonFactorText.textContent = m.horizonDamping < 1e-4 ? '< 10⁻⁴' : m.horizonDamping.toFixed(4);
    asymptoteLabel.textContent = m.s0 > 0 ? `Asimptot: s₀ = ${m.s0.toFixed(1)}` : `s₀ = 0`;

    // 3. Time Domain Curves Plot
    const { fCurve, kernelCurve, integrandCurve } = heavisideTimeCurves(currentFamily, sVal, tHorizon, params, 140);

    const fSeries = fCurve.map(pt => [pt.t, pt.value]);
    const kSeries = kernelCurve.map(pt => [pt.t, pt.value]);
    const iSeries = integrandCurve.map(pt => [pt.t, pt.value]);

    let maxF = 1.5;
    for (const pt of fCurve) {
      if (Math.abs(pt.value) > maxF && Math.abs(pt.value) < 15) {
        maxF = Math.abs(pt.value);
      }
    }

    cartesianPlot(timePlotEl, {
      xDomain: [0, tHorizon],
      yDomain: [-0.2, Math.min(maxF * 1.25, 8.0)],
      series: [
        { points: fSeries, stroke: '#0284c7', strokeWidth: 2.2, label: 'f(t)' },
        { points: kSeries, stroke: '#94a3b8', strokeWidth: 1.5, strokeDasharray: '4 4', label: 'e⁻ˢᵗ' },
        { points: iSeries, stroke: '#10b981', strokeWidth: 2.0, label: 'e⁻ˢᵗ f(t)' }
      ],
      annotations: [
        { type: 'line', x: delayA, stroke: '#f59e0b', strokeDasharray: '2 2', label: `t = a (${delayA.toFixed(1)})` }
      ],
      xAxisLabel: 't',
      yAxisLabel: 'f(t), e⁻ˢᵗ'
    });

    // 4. s-Domain Spectrum Plot
    const sMaxLimit = 4.0;
    const { curve } = heavisideSpectrumCurve(currentFamily, 0.0, sMaxLimit, params, 60);
    const specSeries = curve.map(pt => [pt.s, pt.value]);

    let maxY = 3.0;
    for (const pt of curve) {
      if (pt.value > maxY && pt.value < 20) maxY = pt.value;
    }

    const annotations = [];
    if (m.s0 > 0) {
      annotations.push({ type: 'line', x: m.s0, stroke: '#ef4444', strokeDasharray: '3 3', label: `s₀=${m.s0}` });
    }
    if (m.isConvergent && Number.isFinite(m.exactValue)) {
      annotations.push({ type: 'point', x: sVal, y: m.exactValue, fill: '#0284c7', radius: 5, label: `F(${sVal.toFixed(2)})` });
    }

    cartesianPlot(spectrumPlotEl, {
      xDomain: [0, sMaxLimit],
      yDomain: [-0.1, Math.min(maxY * 1.15, 12)],
      series: [
        { points: specSeries, stroke: '#6366f1', strokeWidth: 2.2, label: 'F(s)' }
      ],
      annotations,
      xAxisLabel: 's',
      yAxisLabel: 'F(s)'
    });
  }

  syncExtraSlider();
  refreshPlots();

  // Event Listeners
  familySelect.addEventListener('change', () => {
    currentFamily = familySelect.value;
    syncExtraSlider();
    refreshPlots();
  }, { signal: abortController.signal });

  delaySlider.addEventListener('input', () => {
    delayA = Number.parseFloat(delaySlider.value);
    delayValText.textContent = `a = ${delayA.toFixed(2)}`;
    refreshPlots();
  }, { signal: abortController.signal });

  sSlider.addEventListener('input', () => {
    sVal = Number.parseFloat(sSlider.value);
    sValText.textContent = `s = ${sVal.toFixed(2)}`;
    refreshPlots();
  }, { signal: abortController.signal });

  horizonSlider.addEventListener('input', () => {
    tHorizon = Number.parseFloat(horizonSlider.value);
    horizonValText.textContent = `T = ${tHorizon.toFixed(0)}`;
    refreshPlots();
  }, { signal: abortController.signal });

  extraSlider.addEventListener('input', () => {
    extraParam = Number.parseFloat(extraSlider.value);
    const cfg = FAMILY_CONFIGS[currentFamily];
    extraValText.textContent = `${cfg.paramName} = ${extraParam.toFixed(2)}`;
    refreshPlots();
  }, { signal: abortController.signal });

  const presetStandard = container.querySelector('#preset-standard');
  const presetUnmatched = container.querySelector('#preset-unmatched');

  presetStandard.addEventListener('click', () => {
    currentFamily = 'step';
    familySelect.value = currentFamily;
    delayA = 2.0;
    delaySlider.value = delayA;
    delayValText.textContent = `a = ${delayA.toFixed(2)}`;
    sVal = 1.5;
    sSlider.value = sVal;
    sValText.textContent = `s = ${sVal.toFixed(2)}`;
    tHorizon = 12.0;
    horizonSlider.value = tHorizon;
    horizonValText.textContent = `T = ${tHorizon.toFixed(0)}`;
    syncExtraSlider();
    refreshPlots();
  }, { signal: abortController.signal });

  presetUnmatched.addEventListener('click', () => {
    currentFamily = 'unmatched-exp';
    familySelect.value = currentFamily;
    delayA = 1.5;
    delaySlider.value = delayA;
    delayValText.textContent = `a = ${delayA.toFixed(2)}`;
    extraParam = 0.5; // k = 0.5
    sVal = 2.0;
    sSlider.value = sVal;
    sValText.textContent = `s = ${sVal.toFixed(2)}`;
    tHorizon = 14.0;
    horizonSlider.value = tHorizon;
    horizonValText.textContent = `T = ${tHorizon.toFixed(0)}`;
    syncExtraSlider();
    refreshPlots();
  }, { signal: abortController.signal });

  return {
    update(newOptions = {}) {
      if (newOptions.lang && newOptions.lang !== lang) {
        lang = newOptions.lang;
        t = newOptions.t || (k => k);
        renderSkeleton();
        // re-bind elements if needed or simple refresh
      }
      refreshPlots();
    },
    destroy() {
      abortController.abort();
      container.innerHTML = '';
    }
  };
}
