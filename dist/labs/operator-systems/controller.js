import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  operatorSystemsHarmonicSolution,
  operatorSystemsAsymmetricSolution,
  operatorSystemsPolynomialSolution,
  operatorSystemsHarmonicRK4,
  operatorSystemsTrajectory
} from '../../models/operator-systems.js';

const PRESET_KEYS = ['harmonic-free', 'harmonic-exp', 'harmonic-res', 'asymmetric', 'polynomial'];

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  const state = {
    preset: 'harmonic-free',
    A1: 1,
    B1: 0,
    C1: 1,
    C2: 1,
    C3: 0.2,
    duration: 8
  };

  const fmt = (value, digits = 2) => (context.format ? context.format(value, digits) : Number(value).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);
  const lang = () => context.lang || 'tr';

  function render() {
    const isHarmonic = state.preset.startsWith('harmonic');
    const isAsym = state.preset === 'asymmetric';
    const isPoly = state.preset === 'polynomial';

    root.innerHTML = `
      <section class="sep-lab operator-systems-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('opSystemsEyebrow'))}</p>
          <h2>${esc(t('opSystemsTitle'))}</h2>
          <p>${esc(t('opSystemsSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-controls-grid">
            <label class="control-card full-span">
              <span>${esc(t('opSystemsPresetLabel'))}</span>
              <select id="op-systems-preset">
                <option value="harmonic-free" ${state.preset === 'harmonic-free' ? 'selected' : ''}>${esc(t('opSystemsPresetHarmonicFree'))}</option>
                <option value="harmonic-exp" ${state.preset === 'harmonic-exp' ? 'selected' : ''}>${esc(t('opSystemsPresetHarmonicExp'))}</option>
                <option value="harmonic-res" ${state.preset === 'harmonic-res' ? 'selected' : ''}>${esc(t('opSystemsPresetHarmonicRes'))}</option>
                <option value="asymmetric" ${state.preset === 'asymmetric' ? 'selected' : ''}>${esc(t('opSystemsPresetAsymmetric'))}</option>
                <option value="polynomial" ${state.preset === 'polynomial' ? 'selected' : ''}>${esc(t('opSystemsPresetPolynomial'))}</option>
              </select>
            </label>

            ${isHarmonic ? `
              <label class="control-card">
                <span>${esc(t('opSystemsParamA1'))}: <output id="out-A1">${fmt(state.A1, 2)}</output></span>
                <input type="range" min="-3" max="3" step="0.2" value="${state.A1}" data-input="A1">
              </label>

              <label class="control-card">
                <span>${esc(t('opSystemsParamB1'))}: <output id="out-B1">${fmt(state.B1, 2)}</output></span>
                <input type="range" min="-3" max="3" step="0.2" value="${state.B1}" data-input="B1">
              </label>
            ` : `
              <label class="control-card">
                <span>${esc(t('opSystemsParamC1'))}: <output id="out-C1">${fmt(state.C1, 2)}</output></span>
                <input type="range" min="-2" max="2" step="0.2" value="${state.C1}" data-input="C1">
              </label>

              <label class="control-card">
                <span>${esc(t('opSystemsParamC2'))}: <output id="out-C2">${fmt(state.C2, 2)}</output></span>
                <input type="range" min="-2" max="2" step="0.2" value="${state.C2}" data-input="C2">
              </label>

              <label class="control-card">
                <span>${esc(t('opSystemsParamC3'))}: <output id="out-C3">${fmt(state.C3, 2)}</output></span>
                <input type="range" min="-1" max="1" step="0.1" value="${state.C3}" data-input="C3">
              </label>
            `}

            <label class="control-card">
              <span>${esc(t('opSystemsDuration'))}: <output id="out-duration">${fmt(state.duration, 1)} s</output></span>
              <input type="range" min="3" max="14" step="1" value="${state.duration}" data-input="duration">
            </label>
          </div>

          <div class="sep-visual-stage dual-grid">
            <figure class="plot-card">
              <figcaption class="plot-caption">
                <span class="legend-swatch" style="background:#2d6d4b"></span> ${esc(t('opSystemsLegendX'))}
                <span class="legend-swatch" style="background:#b47b55; margin-left:1rem"></span> ${esc(t('opSystemsLegendY'))}
              </figcaption>
              <svg id="op-systems-time-svg" viewBox="0 0 540 320" aria-label="${esc(t('opSystemsTimeAria'))}"></svg>
            </figure>

            <figure class="plot-card">
              <figcaption class="plot-caption">
                <span class="legend-swatch" style="background:#4062bb"></span> ${esc(t('opSystemsLegendPhase'))}
              </figcaption>
              <svg id="op-systems-phase-svg" viewBox="0 0 540 320" aria-label="${esc(t('opSystemsPhaseAria'))}"></svg>
            </figure>
          </div>

          <section class="sep-metrics" aria-live="polite"></section>

          <footer class="sep-check-footer">
            <div class="sep-pedagogy-card">
              <header>
                <h4>${esc(t('opSystemsFormulaHeader'))}</h4>
                <p>${esc(t('opSystemsFormulaDesc'))}</p>
              </header>
              <div class="sep-check-content">
                <strong>${esc(t('opSystemsCheckHeader'))}</strong>
                <p>${esc(state.preset === 'harmonic-res' ? t('opSystemsCheckResonance') : t('opSystemsCheckHarmonic'))}</p>
                <aside class="sep-callout-inline">${esc(t('opSystemsCheckTip'))}</aside>
              </div>
            </div>
            <p class="sep-clinic-prompt">
              ${esc(t('opSystemsFooterPrompt'))}
              <a href="#study" class="btn btn-secondary">${esc(t('opSystemsGoToClinic'))}</a>
            </p>
          </footer>
        </div>
      </section>
    `;

    updatePlots();
  }

  function updatePlots() {
    const isHarmonic = state.preset.startsWith('harmonic');
    let traj;
    let rkMetrics = { maxDiffX: 0, maxDiffY: 0 };

    if (isHarmonic) {
      traj = operatorSystemsTrajectory(state.preset, { A1: state.A1, B1: state.B1 }, { duration: state.duration, samples: 251 });
      const rk = operatorSystemsHarmonicRK4(
        { A1: state.A1, B1: state.B1, forcing: state.preset.replace('harmonic-', '') },
        { duration: state.duration, samples: 251 }
      );
      rkMetrics = rk.metrics;
    } else if (state.preset === 'asymmetric') {
      traj = operatorSystemsTrajectory(state.preset, { C1: state.C1, C2: state.C2, C3: state.C3 }, { duration: state.duration, samples: 251 });
    } else {
      traj = operatorSystemsTrajectory(state.preset, { C1: state.C1, C2: state.C2, C3: state.C3 }, { duration: state.duration, samples: 251 });
    }

    const pts = traj.points;
    const maxX = Math.max(1, traj.metrics.maxX * 1.15);
    const maxY = Math.max(1, traj.metrics.maxY * 1.15);
    const maxBound = Math.max(maxX, maxY);

    // 1. Time Plot (t vs x, y)
    const timePlot = cartesianPlot({
      xDomain: [0, state.duration],
      yDomain: [-maxBound, maxBound],
      width: 540,
      height: 320,
      xLabel: 't (s)',
      yLabel: 'x(t), y(t)',
      xTicks: 6,
      yTicks: 6
    });

    const xCoords = pts.map(p => [p.t, p.x]);
    const yCoords = pts.map(p => [p.t, p.y]);

    const timeSvg = root.querySelector('#op-systems-time-svg');
    if (timeSvg) {
      timeSvg.innerHTML = `
        ${timePlot.markup}
        <g clip-path="url(#${timePlot.clipId})">
          ${timePlot.line(xCoords, '#2d6d4b', 'stroke-width="2.6"')}
          ${timePlot.line(yCoords, '#b47b55', 'stroke-width="2.4" stroke-dasharray="6 3"')}
          ${timePlot.point(pts[0].t, pts[0].x, '#2d6d4b')}
          ${timePlot.point(pts[0].t, pts[0].y, '#b47b55')}
        </g>
      `;
    }

    // 2. Phase Portrait Plot (x vs y)
    const phasePlot = cartesianPlot({
      xDomain: [-maxX, maxX],
      yDomain: [-maxY, maxY],
      width: 540,
      height: 320,
      xLabel: 'x',
      yLabel: 'y',
      xTicks: 6,
      yTicks: 6
    });

    const phaseCoords = pts.map(p => [p.x, p.y]);
    const phaseSvg = root.querySelector('#op-systems-phase-svg');
    if (phaseSvg) {
      phaseSvg.innerHTML = `
        ${phasePlot.markup}
        <g clip-path="url(#${phasePlot.clipId})">
          ${phasePlot.line(phaseCoords, '#4062bb', 'stroke-width="2.4"')}
          ${phasePlot.point(pts[0].x, pts[0].y, '#1b3b6f')}
          ${phasePlot.point(pts[pts.length - 1].x, pts[pts.length - 1].y, '#e63946')}
        </g>
      `;
    }

    // 3. Metrics Cards
    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      const c = traj.constants;
      const cA2Text = c.A2 !== undefined ? fmt(c.A2, 3) : fmt(c.D1, 3);
      const cB2Text = c.B2 !== undefined ? fmt(c.B2, 3) : fmt(c.D3, 3);
      const cA2Sub = c.A2 !== undefined ? t('opSystemsCardA2Sub') : 'D₁ = C₁/2 veya -2.5·C₁';
      const cB2Sub = c.B2 !== undefined ? t('opSystemsCardB2Sub') : 'D₃ katsayısı';

      metricsBox.innerHTML = `
        ${metric(t('opSystemsCardDegree'), `N = ${traj.degree}`, '', t('opSystemsCardDegreeSub'))}
        ${metric(t('opSystemsCardA2'), cA2Text, '', cA2Sub)}
        ${metric(t('opSystemsCardB2'), cB2Text, '', cB2Sub)}
        ${metric(t('opSystemsCardMaxX'), fmt(traj.metrics.maxX, 2), '', t('opSystemsCardMaxXSub'))}
        ${metric(t('opSystemsCardMaxY'), fmt(traj.metrics.maxY, 2), '', t('opSystemsCardMaxYSub'))}
        ${metric(t('opSystemsCardResidual'), traj.metrics.maxResidual < 1e-10 ? '< 1e-12' : fmt(traj.metrics.maxResidual, 4), '', t('opSystemsCardResidualSub'))}
        ${metric(t('opSystemsCardRk4Error'), isHarmonic ? (rkMetrics.maxDiffX < 1e-6 ? '< 1e-7' : fmt(rkMetrics.maxDiffX, 5)) : 'N/A', '', t('opSystemsCardRk4ErrorSub'))}
      `;
    }
  }

  function metric(label, value, unit, sub) {
    return `
      <article class="metric">
        <p class="eyebrow">${esc(label)}</p>
        <strong>${esc(value)}${unit ? ' ' + esc(unit) : ''}</strong>
        <p>${esc(sub)}</p>
      </article>
    `;
  }

  root.addEventListener('change', event => {
    if (event.target.id === 'op-systems-preset') {
      state.preset = event.target.value;
      render();
      root.querySelector('#op-systems-preset')?.focus();
    }
  }, { signal: events.signal });

  root.addEventListener('input', event => {
    const key = event.target.dataset.input;
    if (!key) return;
    const value = Number.parseFloat(event.target.value);
    if (!Number.isFinite(value)) return;
    state[key] = value;
    const out = root.querySelector(`#out-${key}`);
    if (out) out.textContent = key === 'duration' ? `${fmt(value, 1)} s` : fmt(value, 2);
    updatePlots();
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
