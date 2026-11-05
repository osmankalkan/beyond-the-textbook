import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  diracFamilies,
  diracGaussian,
  diracLaplaceExact,
  diracMetrics,
  diracPulseRect,
  diracSpectrumCurve,
  diracTimeCurves
} from '../../models/dirac.js';

const FAMILY_CONFIGS = {
  'rect-pulse': {
    name: { tr: '1. Dikdörtgen Darbe Yaklaşımı: f_ε(t) (Tanım ve Limit)', en: '1. Rectangular Pulse Approximation: f_ε(t) (Definition & Limit)' },
    formula: 'f_\\epsilon(t) = \\frac{I}{\\epsilon}\\left[H(t - a) - H(t - (a + \\epsilon))\\right], \\quad \\lim_{\\epsilon \\to 0} f_\\epsilon(t) = I\\delta(t - a)',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mi>I</mi><mrow><mi>ε</mi><mi>s</mi></mrow></mfrac><mrow><mo>(</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup><mo>−</mo><msup><mi>e</mi><mrow><mo>−</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>ε</mi><mo>)</mo><mi>s</mi></mrow></msup><mo>)</mo></mrow><mo>→</mo><mi>I</mi><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup>',
    note: {
      tr: 'Genişlik ε sıfıra yaklaşırken tepe yüksekliği I/ε sonsuza fırlar, fakat altındaki toplam alan (itki) daima sabit I kalır.',
      en: 'As width ε vanishes, peak height I/ε diverges to infinity while the total area (impulse) remains invariant at I.'
    }
  },
  'gaussian-pulse': {
    name: { tr: '2. Düzgün Gauss Çanı Yaklaşımı (Fiziksel Kontak Modeli)', en: '2. Smooth Gaussian Bell Approximation (Physical Contact Model)' },
    formula: 'g_\\sigma(t) = \\frac{I}{\\sigma \\sqrt{2\\pi}} \\exp\\left(-\\frac{(t - a)^2}{2\\sigma^2}\\right)',
    method: '<mi>g</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mfrac><mi>I</mi><mrow><mi>σ</mi><msqrt><mrow><mn>2</mn><mi>π</mi></mrow></msqrt></mrow></mfrac><msup><mi>e</mi><mrow><mo>−</mo><mfrac><msup><mrow><mo>(</mo><mi>t</mi><mo>−</mo><mi>a</mi><mo>)</mo></mrow><mn>2</mn></msup><mrow><mn>2</mn><msup><mi>σ</mi><mn>2</mn></msup></mrow></mfrac></mrow></msup>',
    note: {
      tr: 'Elastik topun duvara çarpışındaki yumuşak kuvvet profili. Varyans σ azaldıkça ideal Dirac delta darbesine yakınsar.',
      en: 'Smooth contact force during elastic impact. As variance σ decreases, it converges to an idealized Dirac impulse.'
    }
  },
  'sifting-test': {
    name: { tr: '3. Süzme (Örnekleme / Sifting) Özelliği: ∫ g(t) δ(t − a) dt = g(a)', en: '3. Sifting (Sampling) Property: ∫ g(t) δ(t − a) dt = g(a)' },
    formula: '\\int_{a-\\alpha}^{a+\\alpha} g(t)\\delta(t - a)dt = g(a), \\quad g(t) = e^{-0.5t}\\cos(2t)',
    method: '<msubsup><mo>∫</mo><mrow><mi>a</mi><mo>−</mo><mi>α</mi></mrow><mrow><mi>a</mi><mo>+</mo><mi>α</mi></mrow></msubsup><mi>g</mi><mo>(</mo><mi>t</mi><mo>)</mo><mi>δ</mi><mo>(</mo><mi>t</mi><mo>−</mo><mi>a</mi><mo>)</mo><mi>d</mi><mi>t</mi><mo>=</mo><mi>g</mi><mo>(</mo><mi>a</mi><mo>)</mo>',
    note: {
      tr: 'Dirac deltası bir test fonksiyonu ile çarpılıp integrallendiğinde fonksiyonun yalnız t = a anındaki anlık değerini seçip dışarı çıkarır.',
      en: 'When multiplied by a test function and integrated, the Dirac delta extracts strictly the instantaneous sample value g(a).'
    }
  },
  'modulated-impulse': {
    name: { tr: '4. Modüle Edilmiş Darbe: ℒ{f(t) δ(t − a)} = e^{−as} f(a)', en: '4. Modulated Impulse: ℒ{f(t) δ(t − a)} = e^{−as} f(a)' },
    formula: '\\mathcal{L}\\{f(t)\\delta(t - a)\\} = \\int_0^\\infty e^{-st} f(t)\\delta(t - a)dt = e^{-as}f(a)',
    method: '<mi mathvariant="script">L</mi><mo>{</mo><mi>f</mi><mo>(</mo><mi>t</mi><mo>)</mo><mi>δ</mi><mo>(</mo><mi>t</mi><mo>−</mo><mi>a</mi><mo>)</mo><mo>}</mo><mo>=</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>a</mi><mi>s</mi></mrow></msup><mi>f</mi><mo>(</mo><mi>a</mi><mo>)</mo>',
    note: {
      tr: 's-çekirdeği e^{-st} ile süzme özelliği birleştiğinde anlık genlik f(a) dışarı çıkar ve geriye sadece e^{-as} gecikme çarpanı kalır.',
      en: 'Combining the kernel e^{-st} with sifting factors out the amplitude f(a) with the delay factor e^{-as}.'
    }
  },
  'multi-impulse': {
    name: { tr: '5. Çoklu Darbe Katarı (Örnek 6.10 Sınav Çözümü)', en: '5. Multi-Impulse Train (Example 6.10 Exam Solution)' },
    formula: 'F(s) = e^{-2s} + 14 e^{12} e^{-3s}, \\quad (t < 0 \\text{ terimi sıfırdır})',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><msup><mi>e</mi><mrow><mo>−</mo><mn>2</mn><mi>s</mi></mrow></msup><mo>+</mo><mn>14</mn><msup><mi>e</mi><mn>12</mn></msup><msup><mi>e</mi><mrow><mo>−</mo><mn>3</mn><mi>s</mi></mrow></msup>',
    note: {
      tr: 'Tek taraflı Laplace dönüşümü [0, ∞) aralığında tanımlıdır; t = −1 noktasındaki δ(t + 1) darbesi integrasyon bölgesinin dışındadır ve katkısı sıfırdır!',
      en: 'The unilateral Laplace transform integrates on [0, ∞); the impulse δ(t + 1) lies strictly outside the domain and contributes zero!'
    }
  }
};

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  let state = {
    family: 'rect-pulse',
    a: 1.5,
    eps: 0.25,
    I: 1.0,
    s: 1.5
  };

  const fmt = (val, digits = 2) => (context.format ? context.format(val, digits) : Number(val).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);

  function render() {
    const lang = context.lang || 'tr';
    const cfg = FAMILY_CONFIGS[state.family] || FAMILY_CONFIGS['rect-pulse'];

    root.innerHTML = `
      <section class="sep-lab dirac-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('diracEyebrow'))}</p>
          <h2>${esc(t('diracTitle'))}</h2>
          <p>${esc(t('diracSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="dirac-family">${esc(t('diracFamilyLabel'))}</label>
              <select id="dirac-family">
                ${Object.entries(FAMILY_CONFIGS).map(([k, v]) => `
                  <option value="${esc(k)}" ${k === state.family ? 'selected' : ''}>
                    ${esc(v.name[lang] || v.name.tr)}
                  </option>
                `).join('')}
              </select>
            </div>
            <span class="op-badge badge-ok">
              ∫ δ(t − a) dt = ${fmt(state.I, 1)}
            </span>
          </div>

          <div class="sep-grid">
            <div class="sep-controls">
              <div class="sep-control">
                <label for="dirac-eps">
                  ${esc(t('diracEpsLabel'))} (ε)
                  <output data-output="eps">${fmt(state.eps, 2)}</output>
                </label>
                <input id="dirac-eps" data-input="eps" type="range" min="0.05" max="1.50" step="0.05" value="${state.eps}">
              </div>

              <div class="sep-control">
                <label for="dirac-a">
                  ${esc(t('diracALabel'))} (a)
                  <output data-output="a">${fmt(state.a, 2)}</output>
                </label>
                <input id="dirac-a" data-input="a" type="range" min="0.20" max="3.50" step="0.10" value="${state.a}">
              </div>

              <div class="sep-control">
                <label for="dirac-i">
                  ${esc(t('diracILabel'))} (I)
                  <output data-output="i">${fmt(state.I, 2)}</output>
                </label>
                <input id="dirac-i" data-input="i" type="range" min="0.20" max="4.00" step="0.20" value="${state.I}">
              </div>

              <div class="sep-control">
                <label for="dirac-s">
                  ${esc(t('diracSLabel'))} (s)
                  <output data-output="s">${fmt(state.s, 2)}</output>
                </label>
                <input id="dirac-s" data-input="s" type="range" min="0.20" max="4.00" step="0.10" value="${state.s}">
              </div>

              <div class="sep-presets">
                <button type="button" class="button secondary" data-preset="sharp">${esc(t('diracPresetSharp'))}</button>
                <button type="button" class="button secondary" data-preset="wide">${esc(t('diracPresetWide'))}</button>
              </div>

              <p class="family-note">${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>

            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i style="background:#2d6d4b"></i>${esc(t('diracLegendPulse'))}</span>
                <span class="sep-b"><i style="background:#b47b55;border-top:2px dashed #b47b55"></i>${esc(t('diracLegendGauss'))}</span>
                <span><i style="background:#2563eb"></i>${esc(t('diracLegendStep'))}</span>
              </div>
              <svg class="cx-chart" id="dirac-time-plot" role="img" viewBox="0 0 740 280" aria-label="${esc(t('diracTimePlotAria'))}"></svg>

              <div class="sep-legend" style="margin-top:22px;">
                <span><i style="background:#dc2626"></i>${esc(t('diracLegendIdeal'))}</span>
                <span class="sep-b"><i style="background:#0891b2;border-top:2px dashed #0891b2"></i>${esc(t('diracLegendFinite'))}</span>
              </div>
              <svg class="cx-chart" id="dirac-spectrum-plot" role="img" viewBox="0 0 740 240" aria-label="${esc(t('diracSpectrumPlotAria'))}"></svg>

              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(t('diracFormulaHeader'))}</p>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                <mrow>${cfg.method}</mrow>
              </math>
              <p>${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(t('diracConvergenceHeader'))}</p>
              <p>${esc(t('diracConvergenceDesc'))}</p>
              <p class="small text-muted">${esc(t('diracSiftingTip'))}</p>
            </div>
          </div>
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(t('diracFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(t('diracGoToClinic'))}</a>
        </footer>
      </section>
    `;

    draw();
  }

  function draw() {
    // 1. Outputs
    const outEps = root.querySelector('[data-output="eps"]');
    if (outEps) outEps.textContent = fmt(state.eps, 2);
    const outA = root.querySelector('[data-output="a"]');
    if (outA) outA.textContent = fmt(state.a, 2);
    const outI = root.querySelector('[data-output="i"]');
    if (outI) outI.textContent = fmt(state.I, 2);
    const outS = root.querySelector('[data-output="s"]');
    if (outS) outS.textContent = fmt(state.s, 2);

    // 2. Metrics
    const m = diracMetrics(state.family, state.s, { a: state.a, eps: state.eps, I: state.I });
    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      metricsBox.innerHTML = `
        <article class="metric">
          <p class="eyebrow">${esc(t('diracCardArea'))}</p>
          <strong>${fmt(m.impulse, 2)}</strong>
          <p>${esc(t('diracCardAreaSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('diracCardPeak'))}</p>
          <strong>${fmt(m.peakHeight, 2)}</strong>
          <p>${esc(t('diracCardPeakSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('diracCardExact'))}</p>
          <strong>${fmt(m.exactIdealTransform, 4)}</strong>
          <p>${esc(t('diracCardExactSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('diracCardFinite'))}</p>
          <strong>${fmt(m.finitePulseTransform, 4)}</strong>
          <p>${esc(t('diracCardFiniteSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('diracCardDiff'))}</p>
          <strong>${(m.relativeDiff * 100).toFixed(1)}%</strong>
          <p>${esc(t('diracCardDiffSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('diracCardSifting'))}</p>
          <strong>${fmt(m.siftingLimitSample, 4)}</strong>
          <p>${esc(t('diracCardSiftingSub'))}</p>
        </article>
      `;
    }

    // 3. Time Domain Plot
    const { rectCurve, gaussCurve, stepCurve } = diracTimeCurves(state.family, {
      a: state.a,
      eps: state.eps,
      I: state.I,
      sigma: Math.max(0.04, state.eps * 0.5)
    }, 5.0, 160);

    const maxRect = Math.max(...rectCurve.map(p => p.value));
    const yMaxLeft = Math.max(2.5, Math.min(18.0, maxRect * 1.15));

    const plotLeft = cartesianPlot({
      width: 740,
      height: 280,
      xMin: 0,
      xMax: 5.0,
      yMin: -0.2,
      yMax: yMaxLeft,
      format: v => fmt(v, 1),
      xLabel: 't',
      yLabel: 'f_ε(t) & ∫f dt',
      id: 'dirac-time'
    });

    const ptsRect = rectCurve.map(p => [p.t, p.value]);
    const ptsGauss = gaussCurve.map(p => [p.t, p.value]);
    const ptsStep = stepCurve.map(p => [p.t, p.value]);

    const svgLeft = root.querySelector('#dirac-time-plot');
    if (svgLeft) {
      svgLeft.innerHTML = `
        ${plotLeft.markup}
        <g clip-path="url(#${plotLeft.clipId})">
          ${plotLeft.line(ptsGauss, '#b47b55', 'stroke-width="1.8" stroke-dasharray="4 4"')}
          ${plotLeft.line(ptsStep, '#2563eb', 'stroke-width="2.0"')}
          ${plotLeft.line(ptsRect, '#2d6d4b', 'stroke-width="2.6"')}
        </g>
      `;
    }

    // 4. Spectrum Plot
    const { idealCurve, finiteCurve } = diracSpectrumCurve(state.family, {
      a: state.a,
      eps: state.eps,
      I: state.I
    }, 0.2, 5.0, 70);

    const yMaxRight = Math.max(1.2, state.I * 1.15);

    const plotRight = cartesianPlot({
      width: 740,
      height: 240,
      xMin: 0,
      xMax: 5.0,
      yMin: 0,
      yMax: yMaxRight,
      format: v => fmt(v, 1),
      xLabel: 's',
      yLabel: 'F(s)',
      id: 'dirac-spectrum'
    });

    const ptsIdeal = idealCurve.map(p => [p.s, p.value]);
    const ptsFinite = finiteCurve.map(p => [p.s, p.value]);

    const svgRight = root.querySelector('#dirac-spectrum-plot');
    if (svgRight) {
      svgRight.innerHTML = `
        ${plotRight.markup}
        <g clip-path="url(#${plotRight.clipId})">
          ${plotRight.line(ptsIdeal, '#dc2626', 'stroke-width="2.5"')}
          ${plotRight.line(ptsFinite, '#0891b2', 'stroke-width="2.0" stroke-dasharray="5 3"')}
        </g>
      `;
    }
  }

  // Delegated Event Listeners
  root.addEventListener('input', event => {
    const id = event.target.dataset.input;
    if (!id) return;
    const val = parseFloat(event.target.value);
    if (id === 'eps') state.eps = val;
    if (id === 'a') state.a = val;
    if (id === 'i') state.I = val;
    if (id === 's') state.s = val;
    draw();
  }, { signal: events.signal });

  root.addEventListener('change', event => {
    if (event.target.id === 'dirac-family') {
      state.family = event.target.value;
      render();
      root.querySelector('#dirac-family')?.focus();
    }
  }, { signal: events.signal });

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    if (button.dataset.preset === 'sharp') {
      state.eps = 0.10;
      state.I = 1.0;
      state.a = 1.5;
    } else if (button.dataset.preset === 'wide') {
      state.eps = 1.00;
      state.I = 1.0;
      state.a = 1.5;
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
