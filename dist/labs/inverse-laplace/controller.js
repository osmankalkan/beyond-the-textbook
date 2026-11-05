import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  forwardTransferFunction,
  inverseFamilies,
  inverseFrequencyCurve,
  inverseLaplaceExact,
  inverseMetrics,
  inverseTimeCurves
} from '../../models/inverse-laplace.js';

const FAMILY_CONFIGS = {
  'bi-harmonic': {
    name: { tr: '1. Çift Frekanslı Ayrışım (Örnek 6.15)', en: '1. Bi-Harmonic Decomposition (Example 6.15)' },
    formula: 'F(s) = \\frac{s + 1}{(s^2 + 1)(s^2 + 9)} = \\frac{1}{8}\\left[\\frac{s+1}{s^2+1} - \\frac{s+1}{s^2+9}\\right]',
    method: '<mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>=</mo><mfrac><mrow><mi>s</mi><mo>+</mo><mn>1</mn></mrow><mrow><mo>(</mo><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><mn>1</mn><mo>)</mo><mo>(</mo><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><mn>9</mn><mo>)</mo></mrow></mfrac><mo>→</mo><mfrac><mn>1</mn><mn>8</mn></mfrac><mrow><mo>(</mo><mi>cos</mi><mi>t</mi><mo>+</mo><mi>sin</mi><mi>t</mi><mo>−</mo><mi>cos</mi><mn>3</mn><mi>t</mi><mo>−</mo><mfrac><mn>1</mn><mn>3</mn></mfrac><mi>sin</mi><mn>3</mn><mi>t</mi><mo>)</mo></mrow>',
    note: {
      tr: 'İki farklı frekansın (ω₁ = 1, ω₂ = 3) süperpozisyonu. Hem basit kesirlere ayırma hem de konvolüsyon integrali ile çözülebilir.',
      en: 'Superposition of two frequencies (ω₁ = 1, ω₂ = 3). Solvable via both partial fractions and convolution integrals.'
    }
  },
  'quadratic-resonance': {
    name: { tr: '2. Katlı Kuadratik Rezonans (Örnek 6.13)', en: '2. Repeated Quadratic Resonance (Example 6.13)' },
    formula: 'F(s) = \\frac{s}{(s^2 + 4)^2} = \\frac{1}{2} \\mathcal{L}\\{\\sin 2t\\} \\cdot \\mathcal{L}\\{\\cos 2t\\}',
    method: '<mi>f</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msup><mi mathvariant="script">L</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mo>{</mo><mfrac><mi>s</mi><msup><mrow><mo>(</mo><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo>)</mo></mrow><mn>2</mn></msup></mfrac><mo>}</mo><mo>=</mo><mfrac><mn>1</mn><mn>4</mn></mfrac><mi>t</mi><mi>sin</mi><mn>2</mn><mi>t</mi>',
    note: {
      tr: 'Katlı sanal kutup s = ±2i. Zaman bölgesinde t çarpanı doğar ve genlik zamanla doğrusal büyüyerek rezonans yaratır.',
      en: 'Repeated imaginary poles at s = ±2i produce secular growth t sin 2t in the time domain, indicating resonance.'
    }
  },
  'damped-quadratic': {
    name: { tr: '3. Sönümlü Kuadratik ve Reel Kutup (Örnek 6.14)', en: '3. Damped Quadratic & Real Pole (Example 6.14)' },
    formula: 'F(s) = \\frac{4}{(s - 1)(s^2 + 2s + 5)} = \\frac{1}{s - 1} - \\frac{s + 3}{(s + 1)^2 + 2^2}',
    method: '<mi>f</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msup><mi>e</mi><mi>t</mi></msup><mo>−</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>t</mi></mrow></msup><mrow><mo>(</mo><mi>sin</mi><mn>2</mn><mi>t</mi><mo>+</mo><mi>cos</mi><mn>2</mn><mi>t</mi><mo>)</mo></mrow>',
    note: {
      tr: 's = 1 kararsız üstel büyüme verirken s = −1 ± 2i karmaşık eşlenik kutupları e^{-t} ile sönümlenen salınım üretir.',
      en: 'The pole s = 1 causes exponential growth, while s = −1 ± 2i yields damped oscillations decaying as e^{-t}.'
    }
  },
  'delayed-power': {
    name: { tr: '4. Gecikmeli Kuvvet ve Basamak (Örnek 6.12)', en: '4. Delayed Power & Step (Example 6.12)' },
    formula: 'F(s) = \\frac{1 + e^{-3s}}{s^4} \\to f(t) = \\frac{1}{6}t^3 + \\frac{1}{6}(t - 3)^3 H(t - 3)',
    method: '<mi>f</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mfrac><msup><mi>t</mi><mn>3</mn></msup><mn>6</mn></mfrac><mo>+</mo><mfrac><msup><mrow><mo>(</mo><mi>t</mi><mo>−</mo><mn>3</mn><mo>)</mo></mrow><mn>3</mn></msup><mn>6</mn></mfrac><mi>H</mi><mo>(</mo><mi>t</mi><mo>−</mo><mn>3</mn><mo>)</mo>',
    note: {
      tr: 'İkinci kaydırma teoremi tersine işletilir: e^{-3s} çarpanı t ≥ 3 anından sonra devreye giren bir basamak kayması ekler.',
      en: 'The second shifting theorem inverted: the e^{-3s} factor introduces a delayed cubic response active for t ≥ 3.'
    }
  },
  'repeated-linear': {
    name: { tr: '5. Yüksek Mertebeden Katlı Kutup (Örnek 6.11)', en: '5. Higher-Order Repeated Pole (Example 6.11)' },
    formula: 'F(s) = \\frac{s}{(s - 2)^5} = \\frac{1}{(s - 2)^4} + \\frac{2}{(s - 2)^5}',
    method: '<mi>f</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mfrac><mn>1</mn><mn>12</mn></mfrac><msup><mi>e</mi><mrow><mn>2</mn><mi>t</mi></mrow></msup><msup><mi>t</mi><mn>3</mn></msup><mrow><mo>(</mo><mn>2</mn><mo>+</mo><mi>t</mi><mo>)</mo></mrow>',
    note: {
      tr: 's = (s - 2) + 2 cebirsel dönüşümü ile pay sadeleştirilir; 1. kaydırma teoremi L^-1{1/s^n} = t^{n-1}/(n-1)! ile birleşir.',
      en: 'Decomposing s = (s - 2) + 2 avoids tedious differentiation; first shifting inverts each power term directly.'
    }
  }
};

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  let state = {
    family: 'bi-harmonic',
    omega: 2.0,
    a: 1.0,
    tMax: 10.0
  };

  const fmt = (val, digits = 2) => (context.format ? context.format(val, digits) : Number(val).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);

  function render() {
    const lang = context.lang || 'tr';
    const cfg = FAMILY_CONFIGS[state.family] || FAMILY_CONFIGS['bi-harmonic'];

    root.innerHTML = `
      <section class="sep-lab inverse-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('invLaplaceEyebrow'))}</p>
          <h2>${esc(t('invLaplaceTitle'))}</h2>
          <p>${esc(t('invLaplaceSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="inv-family">${esc(t('invLaplaceFamilyLabel'))}</label>
              <select id="inv-family">
                ${Object.entries(FAMILY_CONFIGS).map(([k, v]) => `
                  <option value="${esc(k)}" ${k === state.family ? 'selected' : ''}>
                    ${esc(v.name[lang] || v.name.tr)}
                  </option>
                `).join('')}
              </select>
            </div>
            <span class="op-badge badge-ok">
              ℒ⁻¹{F(s)} → f(t)
            </span>
          </div>

          <div class="sep-grid">
            <div class="sep-controls">
              <div class="sep-control">
                <label for="inv-tmax">
                  ${esc(t('invLaplaceTMaxLabel'))} (t_max)
                  <output data-output="tmax">${fmt(state.tMax, 1)}</output>
                </label>
                <input id="inv-tmax" data-input="tmax" type="range" min="4.0" max="20.0" step="1.0" value="${state.tMax}">
              </div>

              <div class="sep-control">
                <label for="inv-omega">
                  ${esc(t('invLaplaceOmegaLabel'))} (ω)
                  <output data-output="omega">${fmt(state.omega, 1)}</output>
                </label>
                <input id="inv-omega" data-input="omega" type="range" min="0.5" max="4.0" step="0.25" value="${state.omega}">
              </div>

              <div class="sep-control">
                <label for="inv-a">
                  ${esc(t('invLaplaceALabel'))} (a)
                  <output data-output="a">${fmt(state.a, 1)}</output>
                </label>
                <input id="inv-a" data-input="a" type="range" min="0.2" max="3.0" step="0.2" value="${state.a}">
              </div>

              <div class="sep-presets">
                <button type="button" class="button secondary" data-preset="biharmonic">${esc(t('invLaplacePresetBiHarmonic'))}</button>
                <button type="button" class="button secondary" data-preset="resonance">${esc(t('invLaplacePresetResonance'))}</button>
              </div>

              <p class="family-note">${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>

            <div class="sep-plot-wrap">
              <div class="sep-legend">
                <span><i style="background:#0891b2"></i>${esc(t('invLaplaceLegendProfile'))}</span>
              </div>
              <svg class="cx-chart" id="inv-profile-plot" role="img" viewBox="0 0 740 240" aria-label="${esc(t('invLaplaceProfilePlotAria'))}"></svg>

              <div class="sep-legend" style="margin-top:22px;">
                <span><i style="background:#16a34a"></i>${esc(t('invLaplaceLegendResponse'))}</span>
              </div>
              <svg class="cx-chart" id="inv-response-plot" role="img" viewBox="0 0 740 280" aria-label="${esc(t('invLaplaceResponsePlotAria'))}"></svg>

              <div class="sep-metrics" aria-live="polite"></div>
            </div>
          </div>

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(t('invLaplaceFormulaHeader'))}</p>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                <mrow>${cfg.method}</mrow>
              </math>
              <p>${esc(cfg.note[lang] || cfg.note.tr)}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(t('invLaplaceTheoryHeader'))}</p>
              <p>${esc(t('invLaplaceTheoryDesc'))}</p>
              <p class="small text-muted">${esc(t('invLaplaceTheoryTip'))}</p>
            </div>
          </div>
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(t('invLaplaceFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(t('invLaplaceGoToClinic'))}</a>
        </footer>
      </section>
    `;

    draw();
  }

  function draw() {
    // 1. Output values
    const outT = root.querySelector('[data-output="tmax"]');
    if (outT) outT.textContent = fmt(state.tMax, 1);
    const outW = root.querySelector('[data-output="omega"]');
    if (outW) outW.textContent = fmt(state.omega, 1);
    const outA = root.querySelector('[data-output="a"]');
    if (outA) outA.textContent = fmt(state.a, 1);

    // 2. Metrics & Curves
    const m = inverseMetrics(state.family, { omega: state.omega, a: state.a }, state.tMax);
    const timeCurve = inverseTimeCurves(state.family, { omega: state.omega, a: state.a }, state.tMax, 160);
    const maxVal = Math.max(...timeCurve.map(p => Math.abs(p.value)), 0.1);

    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      metricsBox.innerHTML = `
        <article class="metric">
          <p class="eyebrow">${esc(t('invLaplaceCardPoles'))}</p>
          <strong>${esc(m.polesSummary)}</strong>
          <p>${esc(t('invLaplaceCardPolesSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('invLaplaceCardBehavior'))}</p>
          <strong>${esc(m.decayOrOscillation)}</strong>
          <p>${esc(t('invLaplaceCardBehaviorSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('invLaplaceCardMethod'))}</p>
          <strong>${esc(m.preferredMethod)}</strong>
          <p>${esc(t('invLaplaceCardMethodSub'))}</p>
        </article>
        <article class="metric">
          <p class="eyebrow">${esc(t('invLaplaceCardPeak'))}</p>
          <strong>${fmt(maxVal, 3)}</strong>
          <p>${esc(t('invLaplaceCardPeakSub'))}</p>
        </article>
      `;
    }

    // 3. F(s) Profile Plot
    const sCurve = inverseFrequencyCurve(state.family, { omega: state.omega, a: state.a }, 0.2, 5.0, 70);
    const validSPts = sCurve.filter(p => Number.isFinite(p.value));
    const maxSVal = validSPts.length ? Math.max(...validSPts.map(p => Math.abs(p.value))) : 1.0;
    const yMaxS = Math.max(1.5, Math.min(6.0, maxSVal * 1.15));

    const plotProfile = cartesianPlot({
      width: 740,
      height: 240,
      xMin: 0,
      xMax: 5.0,
      yMin: -yMaxS,
      yMax: yMaxS,
      format: v => fmt(v, 1),
      xLabel: 's',
      yLabel: 'F(s)',
      id: 'inv-profile'
    });

    const ptsS = validSPts.map(p => [p.s, p.value]);
    const svgProfile = root.querySelector('#inv-profile-plot');
    if (svgProfile) {
      svgProfile.innerHTML = `
        ${plotProfile.markup}
        <g clip-path="url(#${plotProfile.clipId})">
          ${plotProfile.line(ptsS, '#0891b2', 'stroke-width="2.5"')}
        </g>
      `;
    }

    // 4. Time Domain Response Plot
    const yMaxTime = Math.max(1.2, maxVal * 1.15);

    const plotResponse = cartesianPlot({
      width: 740,
      height: 280,
      xMin: 0,
      xMax: state.tMax,
      yMin: -yMaxTime,
      yMax: yMaxTime,
      format: v => fmt(v, 1),
      xLabel: 't',
      yLabel: 'f(t)',
      id: 'inv-response'
    });

    const ptsT = timeCurve.map(p => [p.t, p.value]);
    const svgResponse = root.querySelector('#inv-response-plot');
    if (svgResponse) {
      svgResponse.innerHTML = `
        ${plotResponse.markup}
        <g clip-path="url(#${plotResponse.clipId})">
          ${plotResponse.line(ptsT, '#16a34a', 'stroke-width="2.6"')}
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
    if (id === 'omega') state.omega = val;
    if (id === 'a') state.a = val;
    draw();
  }, { signal: events.signal });

  root.addEventListener('change', event => {
    if (event.target.id === 'inv-family') {
      state.family = event.target.value;
      render();
      root.querySelector('#inv-family')?.focus();
    }
  }, { signal: events.signal });

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    if (button.dataset.preset === 'biharmonic') {
      state.family = 'bi-harmonic';
      state.tMax = 12.0;
    } else if (button.dataset.preset === 'resonance') {
      state.family = 'quadratic-resonance';
      state.omega = 2.0;
      state.tMax = 10.0;
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
