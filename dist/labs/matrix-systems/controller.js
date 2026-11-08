import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  matrixSystemsDistinctReal,
  matrixSystemsComplexSpiral,
  matrixSystemsDefectiveShear,
  matrixSystemsSecantForcing,
  matrixSystemsModalDecoupled,
  matrixSystemsRK4,
  matrixSystemsTrajectory
} from '../../models/matrix-systems.js';

const PRESET_KEYS = ['distinct-real', 'complex-spiral', 'defective-shear', 'secant-forcing', 'modal-decoupling'];

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  const state = {
    preset: 'distinct-real',
    x10: 1,
    x20: 2,
    showEigenRays: true,
    duration: 6
  };

  const fmt = (value, digits = 2) => (context.format ? context.format(value, digits) : Number(value).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);
  const lang = () => context.lang || 'tr';

  function syncPresetDefaults() {
    if (state.preset === 'distinct-real') {
      state.x10 = 1;
      state.x20 = 2;
      state.duration = 4;
    } else if (state.preset === 'complex-spiral') {
      state.x10 = 5;
      state.x20 = 2;
      state.duration = 4;
    } else if (state.preset === 'defective-shear') {
      state.x10 = 2;
      state.x20 = -1;
      state.duration = 5;
    } else if (state.preset === 'secant-forcing') {
      state.x10 = 1;
      state.x20 = 1;
      state.duration = 1.4; // sec(t) has singularity at t = pi/2 ≈ 1.57
    } else if (state.preset === 'modal-decoupling') {
      state.x10 = 1;
      state.x20 = 1;
      state.duration = 8;
    }
  }

  function render() {
    const isSecant = state.preset === 'secant-forcing';
    const isDistinct = state.preset === 'distinct-real';
    const isDefective = state.preset === 'defective-shear';

    root.innerHTML = `
      <section class="sep-lab matrix-systems-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('matSystemsEyebrow'))}</p>
          <h2>${esc(t('matSystemsTitle'))}</h2>
          <p>${esc(t('matSystemsSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-controls-grid">
            <label class="control-card full-span">
              <span>${esc(t('matSystemsPresetLabel'))}</span>
              <select id="mat-systems-preset">
                <option value="distinct-real" ${state.preset === 'distinct-real' ? 'selected' : ''}>${esc(t('matSystemsPresetDistinctReal'))}</option>
                <option value="complex-spiral" ${state.preset === 'complex-spiral' ? 'selected' : ''}>${esc(t('matSystemsPresetComplexSpiral'))}</option>
                <option value="defective-shear" ${state.preset === 'defective-shear' ? 'selected' : ''}>${esc(t('matSystemsPresetDefectiveShear'))}</option>
                <option value="secant-forcing" ${state.preset === 'secant-forcing' ? 'selected' : ''}>${esc(t('matSystemsPresetSecantForcing'))}</option>
                <option value="modal-decoupling" ${state.preset === 'modal-decoupling' ? 'selected' : ''}>${esc(t('matSystemsPresetModalDecoupling'))}</option>
              </select>
            </label>

            <label class="control-card">
              <span>${esc(t('matSystemsParamX10'))}: <output id="out-x10">${fmt(state.x10, 2)}</output></span>
              <input type="range" min="-4" max="6" step="0.5" value="${state.x10}" data-input="x10">
            </label>

            <label class="control-card">
              <span>${esc(t('matSystemsParamX20'))}: <output id="out-x20">${fmt(state.x20, 2)}</output></span>
              <input type="range" min="-4" max="4" step="0.5" value="${state.x20}" data-input="x20">
            </label>

            <label class="control-card">
              <span>${esc(t('matSystemsDuration'))}: <output id="out-duration">${fmt(state.duration, 1)} s</output></span>
              <input type="range" min="${isSecant ? '0.5' : '2'}" max="${isSecant ? '1.5' : '12'}" step="${isSecant ? '0.1' : '0.5'}" value="${state.duration}" data-input="duration">
            </label>

            ${(isDistinct || isDefective) ? `
              <label class="control-card checkbox-card">
                <span>
                  <input type="checkbox" id="mat-systems-rays" ${state.showEigenRays ? 'checked' : ''}>
                  ${esc(t('matSystemsShowEigenRays'))}
                </span>
              </label>
            ` : ''}
          </div>

          <div class="sep-visual-stage dual-grid">
            <figure class="plot-card">
              <figcaption class="plot-caption">
                <span class="legend-swatch" style="background:#2d6d4b"></span> ${esc(t('matSystemsLegendX1'))}
                <span class="legend-swatch" style="background:#b47b55; margin-left:1rem"></span> ${esc(t('matSystemsLegendX2'))}
              </figcaption>
              <svg id="mat-systems-time-svg" viewBox="0 0 540 320" aria-label="${esc(t('matSystemsTimeAria'))}"></svg>
            </figure>

            <figure class="plot-card">
              <figcaption class="plot-caption">
                <span class="legend-swatch" style="background:#4062bb"></span> ${esc(t('matSystemsLegendPhase'))}
                ${(isDistinct || isDefective) && state.showEigenRays ? `<span class="legend-swatch" style="background:#888; margin-left:1rem; border-style:dashed;"></span> ${esc(t('matSystemsLegendRay'))}` : ''}
              </figcaption>
              <svg id="mat-systems-phase-svg" viewBox="0 0 540 320" aria-label="${esc(t('matSystemsPhaseAria'))}"></svg>
            </figure>
          </div>

          <section class="sep-metrics" aria-live="polite"></section>

          <footer class="sep-check-footer">
            <div class="sep-pedagogy-card">
              <header>
                <h4>${esc(t('matSystemsFormulaHeader'))}</h4>
                <p>${esc(t('matSystemsFormulaDesc'))}</p>
              </header>
              <div class="sep-check-content">
                <strong>${esc(t('matSystemsCheckHeader'))}</strong>
                <p>${esc(t(getCheckKey(state.preset)))}</p>
                <aside class="sep-callout-inline">${esc(t('matSystemsCheckTip'))}</aside>
              </div>
            </div>
            <p class="sep-clinic-prompt">
              ${esc(t('matSystemsFooterPrompt'))}
              <a href="#study" class="btn btn-secondary">${esc(t('matSystemsGoToClinic'))}</a>
            </p>
          </footer>
        </div>
      </section>
    `;

    updatePlots();
  }

  function getCheckKey(preset) {
    if (preset === 'distinct-real') return 'matSystemsCheckDistinct';
    if (preset === 'complex-spiral') return 'matSystemsCheckSpiral';
    if (preset === 'defective-shear') return 'matSystemsCheckDefective';
    if (preset === 'secant-forcing') return 'matSystemsCheckSecant';
    return 'matSystemsCheckModal';
  }

  function updatePlots() {
    const isDistinct = state.preset === 'distinct-real';
    const isDefective = state.preset === 'defective-shear';

    const params = {
      x10: state.x10,
      x20: state.x20
    };

    const traj = matrixSystemsTrajectory(state.preset, params, { duration: state.duration, samples: 251 });

    let rkMetrics = { maxDiff1: 0, maxDiff2: 0 };
    if (isDistinct) {
      const rk = matrixSystemsRK4(params, { duration: state.duration, samples: 251 });
      rkMetrics = rk.metrics;
    }

    const pts = traj.points;
    const maxX1 = Math.max(1, traj.metrics.maxX1 * 1.15);
    const maxX2 = Math.max(1, traj.metrics.maxX2 * 1.15);
    const maxBound = Math.max(maxX1, maxX2);

    // 1. Time Plot (t vs x1, x2)
    const timePlot = cartesianPlot({
      xDomain: [0, state.duration],
      yDomain: [-maxBound, maxBound],
      width: 540,
      height: 320,
      xLabel: 't (s)',
      yLabel: 'x₁(t), x₂(t)',
      xTicks: 6,
      yTicks: 6
    });

    const x1Coords = pts.map(p => [p.t, p.x1]);
    const x2Coords = pts.map(p => [p.t, p.x2]);

    const timeSvg = root.querySelector('#mat-systems-time-svg');
    if (timeSvg) {
      timeSvg.innerHTML = `
        ${timePlot.markup}
        <g clip-path="url(#${timePlot.clipId})">
          ${timePlot.line(x1Coords, '#2d6d4b', 'stroke-width="2.6"')}
          ${timePlot.line(x2Coords, '#b47b55', 'stroke-width="2.4" stroke-dasharray="6 3"')}
          ${timePlot.point(pts[0].t, pts[0].x1, '#2d6d4b')}
          ${timePlot.point(pts[0].t, pts[0].x2, '#b47b55')}
        </g>
      `;
    }

    // 2. Phase Portrait Plot (x1 vs x2)
    const phasePlot = cartesianPlot({
      xDomain: [-maxBound, maxBound],
      yDomain: [-maxBound, maxBound],
      width: 540,
      height: 320,
      xLabel: 'x₁',
      yLabel: 'x₂',
      xTicks: 6,
      yTicks: 6
    });

    // Eigenvector lines markup if toggled
    let eigenRaysMarkup = '';
    if (state.showEigenRays && (isDistinct || isDefective)) {
      if (isDistinct) {
        // v1 = [1, -1] => slope = -1
        // v2 = [4, 1] => slope = 1/4 = 0.25
        const p1A = phasePlot.project(-maxBound, maxBound);
        const p1B = phasePlot.project(maxBound, -maxBound);
        const p2A = phasePlot.project(-maxBound, -0.25 * maxBound);
        const p2B = phasePlot.project(maxBound, 0.25 * maxBound);

        eigenRaysMarkup = `
          <line x1="${p1A[0]}" y1="${p1A[1]}" x2="${p1B[0]}" y2="${p1B[1]}" stroke="#888" stroke-width="1.6" stroke-dasharray="4 4" />
          <line x1="${p2A[0]}" y1="${p2A[1]}" x2="${p2B[0]}" y2="${p2B[1]}" stroke="#666" stroke-width="1.6" stroke-dasharray="4 4" />
          <text x="${p1B[0] - 50}" y="${p1B[1] - 8}" font-size="10" fill="#777">v₁ [1, -1]</text>
          <text x="${p2B[0] - 50}" y="${p2B[1] - 8}" font-size="10" fill="#555">v₂ [4, 1]</text>
        `;
      } else if (isDefective) {
        // v1 = [2, -1] => slope = -0.5
        const pA = phasePlot.project(-maxBound, 0.5 * maxBound);
        const pB = phasePlot.project(maxBound, -0.5 * maxBound);
        eigenRaysMarkup = `
          <line x1="${pA[0]}" y1="${pA[1]}" x2="${pB[0]}" y2="${pB[1]}" stroke="#777" stroke-width="1.6" stroke-dasharray="4 4" />
          <text x="${pB[0] - 50}" y="${pB[1] - 8}" font-size="10" fill="#666">v₁ [2, -1]</text>
        `;
      }
    }

    const phaseCoords = pts.map(p => [p.x1, p.x2]);
    const phaseSvg = root.querySelector('#mat-systems-phase-svg');
    if (phaseSvg) {
      phaseSvg.innerHTML = `
        ${phasePlot.markup}
        <g clip-path="url(#${phasePlot.clipId})">
          ${eigenRaysMarkup}
          ${phasePlot.line(phaseCoords, '#4062bb', 'stroke-width="2.4"')}
          ${phasePlot.point(pts[0].x1, pts[0].x2, '#1b3b6f')}
          ${phasePlot.point(pts[pts.length - 1].x1, pts[pts.length - 1].x2, '#e63946')}
        </g>
      `;
    }

    // 3. Metrics Cards
    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      const eigs = traj.eigenvalues ? traj.eigenvalues.join(', ') : 'ω₁=1.41, ω₂=3.46';
      metricsBox.innerHTML = `
        ${metric(t('matSystemsCardClassification'), t('matType_' + traj.classification), '', t('matSystemsCardClassSub'))}
        ${metric(t('matSystemsCardEigenvalues'), eigs, '', t('matSystemsCardEigenSub'))}
        ${metric(t('matSystemsCardMaxX1'), fmt(traj.metrics.maxX1, 2), '', t('matSystemsCardMaxX1Sub'))}
        ${metric(t('matSystemsCardMaxX2'), fmt(traj.metrics.maxX2, 2), '', t('matSystemsCardMaxX2Sub'))}
        ${metric(t('matSystemsCardResidual'), traj.metrics.maxResidual < 1e-10 ? '< 1e-12' : fmt(traj.metrics.maxResidual, 4), '', t('matSystemsCardResidualSub'))}
        ${metric(t('matSystemsCardRk4Error'), isDistinct ? (rkMetrics.maxDiff1 < 1e-5 ? '< 1e-6' : fmt(rkMetrics.maxDiff1, 5)) : 'N/A', '', t('matSystemsCardRk4ErrorSub'))}
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
    if (event.target.id === 'mat-systems-preset') {
      state.preset = event.target.value;
      syncPresetDefaults();
      render();
      root.querySelector('#mat-systems-preset')?.focus();
    } else if (event.target.id === 'mat-systems-rays') {
      state.showEigenRays = event.target.checked;
      updatePlots();
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
