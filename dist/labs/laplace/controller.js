import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  laplaceConvergenceAbscissa,
  laplaceDefaultParams,
  laplaceExact,
  laplaceFamilies,
  laplaceMetrics,
  laplaceSpectrumCurve,
  laplaceTimeCurves
} from '../../models/laplace.js';

const FAMILY_CONFIGS = {
  constant: {
    name: { tr: '1. Sabit Fonksiyon: f(t) = 1 (Örnek 6.1.1)', en: '1. Constant Function: f(t) = 1 (Example 6.1.1)' },
    paramName: null,
    formula: 'F(s) = \\frac{1}{s}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mn>1</mn><mi>s</mi></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'En temel dönüşüm: f(t)=1 için integrand e^{-st} olur; integral doğrudan 1/s sonucunu verir. s > 0 bölgesi integralin sonlu olmasını sağlar.',
      en: 'The most basic transform: for f(t)=1 the integrand is e^{-st}, integrating directly to 1/s. The region s > 0 ensures convergence.'
    }
  },
  exponential: {
    name: { tr: '2. Üstel Fonksiyon: f(t) = e^{at} (Örnek 6.1.2)', en: '2. Exponential Function: f(t) = e^{at} (Example 6.1.2)' },
    paramName: 'a',
    paramMin: -2.0,
    paramMax: 2.0,
    paramStep: 0.1,
    formula: 'F(s) = \\frac{1}{s - a}, \\quad s > a',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mn>1</mn><mrow><mi>s</mi><mo>−</mo><mi>a</mi></mrow></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mi>a</mi>',
    note: {
      tr: 'Yakınsaklık apsisi s₀ = a olur. s > a olduğunda e^{-(s-a)t} integrandı sıfıra söner; s = a noktasında basit bir kutup (asymptote) oluşur.',
      en: 'The convergence abscissa is s₀ = a. For s > a, e^{-(s-a)t} decays to zero; at s = a, F(s) has a simple pole.'
    }
  },
  sine: {
    name: { tr: '3. Sinüs Salınımı: f(t) = sin(ωt) (Örnek 6.1.3)', en: '3. Sine Oscillation: f(t) = sin(ωt) (Example 6.1.3)' },
    paramName: 'omega',
    paramMin: 0.5,
    paramMax: 4.0,
    paramStep: 0.25,
    formula: 'F(s) = \\frac{\\omega}{s^2 + \\omega^2}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mi>ω</mi><mrow><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup></mrow></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'Euler formülü e^{iωt} = cos(ωt) + i sin(ωt) üzerinden sanal kısım olarak türetilir. Payda s² + ω² biçimindedir; payda ω sabiti yer alır.',
      en: 'Derived as the imaginary part of e^{iωt}. The denominator is s² + ω², and the numerator holds the angular frequency ω.'
    }
  },
  cosine: {
    name: { tr: '4. Kosinüs Salınımı: f(t) = cos(ωt) (Örnek 6.1.3)', en: '4. Cosine Oscillation: f(t) = cos(ωt) (Example 6.1.3)' },
    paramName: 'omega',
    paramMin: 0.5,
    paramMax: 4.0,
    paramStep: 0.25,
    formula: 'F(s) = \\frac{s}{s^2 + \\omega^2}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mi>s</mi><mrow><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup></mrow></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'Euler açılımının gerçel kısmıdır. Sinüsten farkı, pay kısmında frekans ω yerine s değişkeninin bulunmasıdır (çünkü cos(0) = 1).',
      en: 'The real part of the Euler transform. Unlike sine, the numerator contains s because cos(0) = 1.'
    }
  },
  'damped-sine': {
    name: { tr: '5. Sönümlü Salınım: f(t) = e^{at} sin(ωt) (Örnek 6.3)', en: '5. Damped Oscillation: f(t) = e^{at} sin(ωt) (Example 6.3)' },
    paramName: 'a',
    paramMin: -2.0,
    paramMax: 1.0,
    paramStep: 0.2,
    formula: 'F(s) = \\frac{\\omega}{(s - a)^2 + \\omega^2}, \\quad s > a',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mi>ω</mi><mrow><msup><mrow><mo>(</mo><mi>s</mi><mo>−</mo><mi>a</mi><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup></mrow></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mi>a</mi>',
    note: {
      tr: 's-bölgesinde kaydırma (1. Öteleme teoremi): e^{at} çarpanı, sinüsün Laplace dönüşümündeki her s yerine s − a yazar.',
      en: 'The First Shifting Property: multiplying by e^{at} replaces every s in the sine transform with s − a.'
    }
  },
  't-sine': {
    name: { tr: '6. Rezonans / t ile Çarpım: f(t) = t sin(ωt) (Örnek 6.4)', en: '6. Resonance / t-Multiplication: f(t) = t sin(ωt) (Example 6.4)' },
    paramName: 'omega',
    paramMin: 0.5,
    paramMax: 3.0,
    paramStep: 0.25,
    formula: 'F(s) = \\frac{2\\omega s}{(s^2 + \\omega^2)^2}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mn>2</mn><mi>ω</mi><mi>s</mi></mrow><msup><mrow><mo>(</mo><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup><mo>)</mo></mrow><mn>2</mn></msup></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 's-bölgesinde türev teoremi: L{t f(t)} = −dF/ds. Sinüs dönüşümünün s’e göre türevi alınıp eksi ile çarpıldığında paydada kare oluşur.',
      en: 'Differentiation in s-domain: L{t f(t)} = −dF/ds. Differentiating the sine transform produces the squared resonance denominator.'
    }
  },
  polynomial: {
    name: { tr: '7. Polinom Kuvvet: f(t) = tⁿ (Örnek 6.2)', en: '7. Polynomial Power: f(t) = tⁿ (Example 6.2)' },
    paramName: 'n',
    paramMin: 1,
    paramMax: 3,
    paramStep: 1,
    formula: 'F(s) = \\frac{n!}{s^{n+1}}, \\quad s > 0',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mi>n</mi><mo>!</mo></mrow><msup><mi>s</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msup></mfrac><mo>,</mo><mspace width="0.8em"/><mi>s</mi><mo>&gt;</mo><mn>0</mn>',
    note: {
      tr: 'n. mertebe faktöriyel kuralı. t’nin kuvveti arttıkça integrandın tepe noktası sağa kayar ve paydada s’in kuvveti bir artar.',
      en: 'The n-factorial rule. As n increases, the integrand peak shifts to the right and s gains an additional power in the denominator.'
    }
  }
};

export function mount(root, initial) {
  let context = initial;
  let kind = 'exponential';
  let sVal = 2.0;
  let tHorizon = 10.0;
  let params = { ...laplaceDefaultParams(kind) };
  const events = new AbortController();

  const fmt = (value, digits = 2) => context.format(value, digits);
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function currentConfig() {
    return FAMILY_CONFIGS[kind];
  }

  function setFamily(nextKind) {
    kind = nextKind;
    params = { ...laplaceDefaultParams(kind) };
    const s0 = laplaceConvergenceAbscissa(kind, params);
    sVal = Math.max(sVal, s0 + 0.5);
  }

  function render() {
    const cfg = currentConfig();
    const lang = context.lang || 'tr';
    const s0 = laplaceConvergenceAbscissa(kind, params);
    const pName = cfg.paramName;
    const pVal = pName ? params[pName] : null;

    root.innerHTML = `
      <section class="sep-lab laplace-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(context.t('laplaceEyebrow'))}</p>
          <h2>${esc(context.t('laplaceTitle'))}</h2>
          <p>${esc(context.t('laplaceSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="laplace-family">${esc(context.t('laplaceFamily'))}</label>
              <select id="laplace-family">
                ${laplaceFamilies().map(id => `<option value="${id}" ${id === kind ? 'selected' : ''}>${esc(FAMILY_CONFIGS[id].name[lang] || FAMILY_CONFIGS[id].name.tr)}</option>`).join('')}
              </select>
            </div>
            <span class="op-badge ${sVal > s0 ? 'badge-ok' : 'badge-warn'}">
              s₀ = ${fmt(s0, 1)} (${sVal > s0 ? context.t('laplaceConvergent') : context.t('laplaceDivergent')})
            </span>
          </div>

          <div class="sep-grid">
            <div class="sep-controls">
              <div class="sep-control">
                <label for="laplace-s">
                  ${esc(context.t('laplaceParamS'))} (s)
                  <output data-output="s">${fmt(sVal, 2)}</output>
                </label>
                <input id="laplace-s" data-input="s" type="range" min="0.1" max="5.0" step="0.05" value="${sVal}">
              </div>

              <div class="sep-control">
                <label for="laplace-T">
                  ${esc(context.t('laplaceHorizonT'))} (T)
                  <output data-output="T">${fmt(tHorizon, 1)}</output>
                </label>
                <input id="laplace-T" data-input="T" type="range" min="2.0" max="16.0" step="0.5" value="${tHorizon}">
              </div>

              ${pName ? `
                <div class="sep-control">
                  <label for="laplace-param">
                    ${esc(context.t('laplaceModelParam'))} (${pName})
                    <output data-output="param">${fmt(pVal, 2)}</output>
                  </label>
                  <input id="laplace-param" data-input="param" type="range" min="${cfg.paramMin}" max="${cfg.paramMax}" step="${cfg.paramStep}" value="${pVal}">
                </div>
              ` : ''}

              <div class="sep-presets">
                <button class="button secondary" data-preset="standard">${esc(context.t('laplacePresetStandard'))}</button>
                <button class="button secondary" data-preset="boundary">${esc(context.t('laplacePresetBoundary'))}</button>
              </div>

              <p class="laplace-family-note">${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>

            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i style="background:#5a8a68"></i>${esc(context.t('laplaceLegendIntegrand'))} (e⁻ˢᵗ f(t))</span>
                <span class="sep-b"><i style="background:#a5b49b;border-top:2px dashed #7a946b"></i>${esc(context.t('laplaceLegendEnvelope'))} (e⁻ˢᵗ)</span>
              </div>
              <svg class="cx-chart" id="laplace-time-plot" role="img" viewBox="0 0 740 310" aria-label="${esc(context.t('laplaceTimePlotAria'))}"></svg>

              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(context.t('laplaceFormulaHeader'))}</p>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${cfg.method}</mrow></math>
              <p>${esc(context.t('laplaceDefinitionNote'))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(context.t('laplaceKernelDecayHeader'))}</p>
              <p>${esc(context.t('laplaceKernelDecayDesc'))}</p>
              <p class="small text-muted">${esc(context.t('laplaceKernelHorizonTip'))}</p>
            </div>
          </div>
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(context.t('laplaceFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(context.t('laplaceGoToClinic'))}</a>
        </footer>
      </section>
    `;

    draw();
  }

  function draw() {
    const s0 = laplaceConvergenceAbscissa(kind, params);
    const m = laplaceMetrics(kind, sVal, tHorizon, params);
    const { fCurve, kernelCurve, integrandCurve } = laplaceTimeCurves(kind, sVal, tHorizon, params, 120);

    // Compute y limits for time plot
    let yMax = 1.2;
    let yMin = -0.2;
    for (const pt of integrandCurve) {
      if (pt.value > yMax) yMax = pt.value;
      if (pt.value < yMin) yMin = pt.value;
    }
    for (const pt of kernelCurve) {
      if (pt.value > yMax) yMax = pt.value;
    }
    yMax = Math.min(10, Math.max(1.0, yMax * 1.15));
    yMin = Math.max(-10, Math.min(-0.2, yMin * 1.15));

    const plot = cartesianPlot({
      width: 740,
      height: 310,
      xMin: 0,
      xMax: tHorizon,
      yMin,
      yMax,
      format: v => fmt(v, 1),
      xLabel: 't',
      yLabel: 'Integrand',
      id: 'laplace-time'
    });

    const ptsIntegrand = integrandCurve.map(pt => [pt.t, pt.value]);
    const ptsKernel = kernelCurve.map(pt => [pt.t, pt.value]);

    const svg = root.querySelector('#laplace-time-plot');
    if (svg) {
      svg.innerHTML = `
        ${plot.markup}
        <g clip-path="url(#${plot.clipId})">
          ${plot.line(ptsKernel, '#8d9c82', 'stroke-width="1.8" stroke-dasharray="4 4"')}
          ${plot.line(ptsIntegrand, '#2d6d4b', 'stroke-width="2.8"')}
        </g>
      `;
    }

    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      const isConv = m.isConvergent;
      metricsBox.innerHTML = `
        <article class="metric">
          <p class="eyebrow">${esc(context.t('laplaceExactLabel'))}</p>
          <strong>${isConv && Number.isFinite(m.exactValue) ? fmt(m.exactValue, 4) : '—'}</strong>
          <p>${esc(context.t('laplaceExactSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(context.t('laplaceNumericalLabel'))}</p>
          <strong>${fmt(m.numericalValue, 4)}</strong>
          <p>${esc(context.t('laplaceNumericalSub', fmt(tHorizon, 0)))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(context.t('laplaceErrorLabel'))}</p>
          <strong>${isConv && Number.isFinite(m.relativeError) ? `${fmt(m.relativeError * 100, 2)}%` : '—'}</strong>
          <p>${esc(context.t('laplaceErrorSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(context.t('laplaceDecayLabel'))}</p>
          <strong>${fmt(m.kernelDecayFactor, 4)}</strong>
          <p>${esc(context.t('laplaceDecaySub'))}</p>
        </article>
      `;
    }

    // Update outputs
    const outS = root.querySelector('[data-output="s"]');
    if (outS) outS.textContent = fmt(sVal, 2);
    const outT = root.querySelector('[data-output="T"]');
    if (outT) outT.textContent = fmt(tHorizon, 1);
    const outP = root.querySelector('[data-output="param"]');
    if (outP && cfgParamName()) outP.textContent = fmt(params[cfgParamName()], 2);
  }

  function cfgParamName() {
    return currentConfig().paramName;
  }

  root.addEventListener('input', event => {
    const id = event.target.dataset.input;
    if (!id) return;
    const value = +event.target.value;
    if (id === 's') sVal = value;
    if (id === 'T') tHorizon = value;
    if (id === 'param' && cfgParamName()) {
      params[cfgParamName()] = value;
    }
    draw();
  }, { signal: events.signal });

  root.addEventListener('change', event => {
    if (event.target.id === 'laplace-family') {
      setFamily(event.target.value);
      render();
      root.querySelector('#laplace-family')?.focus();
    }
  }, { signal: events.signal });

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    const s0 = laplaceConvergenceAbscissa(kind, params);
    if (button.dataset.preset === 'standard') {
      sVal = Math.max(2.0, s0 + 1.0);
      tHorizon = 10.0;
    } else if (button.dataset.preset === 'boundary') {
      sVal = s0 + 0.3;
      tHorizon = 14.0;
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
