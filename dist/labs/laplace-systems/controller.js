import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {
  laplaceSystemsHarmonic,
  laplaceSystemsDelayedCoupled,
  laplaceSystemsSecondOrder,
  laplaceSystemsHarmonicRK4,
  laplaceSystemsTrajectory
} from '../../models/laplace-systems.js';

const PRESET_KEYS = ['harmonic-exp', 'delayed-coupled', 'second-order', 'harmonic-free'];

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  const state = {
    preset: 'harmonic-exp',
    viewMode: 'total', // 'total', 'zir', 'zsr'
    x0: 1,
    y0: 0,
    vx0: 15,
    tDelay: Math.PI,
    duration: 8
  };

  const fmt = (value, digits = 2) => (context.format ? context.format(value, digits) : Number(value).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);
  const lang = () => context.lang || 'tr';

  function syncPresetDefaults() {
    if (state.preset === 'harmonic-exp' || state.preset === 'harmonic-free') {
      state.x0 = 1;
      state.y0 = 0;
      state.duration = 8;
    } else if (state.preset === 'delayed-coupled') {
      state.x0 = 2;
      state.y0 = 1;
      state.tDelay = Math.PI;
      state.duration = 8;
    } else if (state.preset === 'second-order') {
      state.x0 = 5;
      state.y0 = 0;
      state.vx0 = 15;
      state.tDelay = 1.0;
      state.duration = 4;
    }
  }

  function render() {
    const isHarmonic = state.preset === 'harmonic-exp' || state.preset === 'harmonic-free';
    const isDelayed = state.preset === 'delayed-coupled';
    const isSecondOrder = state.preset === 'second-order';

    root.innerHTML = `
      <section class="sep-lab laplace-systems-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('lapSystemsEyebrow'))}</p>
          <h2>${esc(t('lapSystemsTitle'))}</h2>
          <p>${esc(t('lapSystemsSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-controls-grid">
            <label class="control-card">
              <span>${esc(t('lapSystemsPresetLabel'))}</span>
              <select id="lap-systems-preset">
                <option value="harmonic-exp" ${state.preset === 'harmonic-exp' ? 'selected' : ''}>${esc(t('lapSystemsPresetHarmonicExp'))}</option>
                <option value="delayed-coupled" ${state.preset === 'delayed-coupled' ? 'selected' : ''}>${esc(t('lapSystemsPresetDelayedCoupled'))}</option>
                <option value="second-order" ${state.preset === 'second-order' ? 'selected' : ''}>${esc(t('lapSystemsPresetSecondOrder'))}</option>
                <option value="harmonic-free" ${state.preset === 'harmonic-free' ? 'selected' : ''}>${esc(t('lapSystemsPresetHarmonicFree'))}</option>
              </select>
            </label>

            <label class="control-card">
              <span>${esc(t('lapSystemsViewModeLabel'))}</span>
              <select id="lap-systems-viewmode">
                <option value="total" ${state.viewMode === 'total' ? 'selected' : ''}>${esc(t('lapSystemsViewTotal'))}</option>
                <option value="zir" ${state.viewMode === 'zir' ? 'selected' : ''}>${esc(t('lapSystemsViewZIR'))}</option>
                <option value="zsr" ${state.viewMode === 'zsr' ? 'selected' : ''}>${esc(t('lapSystemsViewZSR'))}</option>
              </select>
            </label>

            <label class="control-card">
              <span>${esc(t('lapSystemsParamX0'))}: <output id="out-x0">${fmt(state.x0, 2)}</output></span>
              <input type="range" min="${isSecondOrder ? '0' : '-3'}" max="${isSecondOrder ? '10' : '3'}" step="${isSecondOrder ? '0.5' : '0.2'}" value="${state.x0}" data-input="x0">
            </label>

            ${!isSecondOrder ? `
              <label class="control-card">
                <span>${esc(t('lapSystemsParamY0'))}: <output id="out-y0">${fmt(state.y0, 2)}</output></span>
                <input type="range" min="-3" max="3" step="0.2" value="${state.y0}" data-input="y0">
              </label>
            ` : `
              <label class="control-card">
                <span>${esc(t('lapSystemsParamVx0'))}: <output id="out-vx0">${fmt(state.vx0, 1)}</output></span>
                <input type="range" min="0" max="25" step="1" value="${state.vx0}" data-input="vx0">
              </label>
            `}

            ${isDelayed || isSecondOrder ? `
              <label class="control-card">
                <span>${esc(t('lapSystemsParamDelay'))}: <output id="out-tDelay">${fmt(state.tDelay, 2)} s</output></span>
                <input type="range" min="0.5" max="5.0" step="0.1" value="${state.tDelay}" data-input="tDelay">
              </label>
            ` : ''}

            <label class="control-card">
              <span>${esc(t('lapSystemsDuration'))}: <output id="out-duration">${fmt(state.duration, 1)} s</output></span>
              <input type="range" min="2" max="14" step="1" value="${state.duration}" data-input="duration">
            </label>
          </div>

          <div class="sep-visual-stage dual-grid">
            <figure class="plot-card">
              <figcaption class="plot-caption">
                <span class="legend-swatch" style="background:#2d6d4b"></span> ${esc(t('lapSystemsLegendX'))}
                <span class="legend-swatch" style="background:#b47b55; margin-left:1rem"></span> ${esc(t('lapSystemsLegendY'))}
                ${(isDelayed || isSecondOrder) ? `<span class="legend-swatch" style="background:#999; margin-left:1rem; border-style:dashed;"></span> ${esc(t('lapSystemsLegendDelay'))}` : ''}
              </figcaption>
              <svg id="lap-systems-time-svg" viewBox="0 0 540 320" aria-label="${esc(t('lapSystemsTimeAria'))}"></svg>
            </figure>

            <figure class="plot-card">
              <figcaption class="plot-caption">
                <span class="legend-swatch" style="background:#4062bb"></span> ${esc(t('lapSystemsLegendPhase'))}
              </figcaption>
              <svg id="lap-systems-phase-svg" viewBox="0 0 540 320" aria-label="${esc(t('lapSystemsPhaseAria'))}"></svg>
            </figure>
          </div>

          <section class="sep-metrics" aria-live="polite"></section>

          <footer class="sep-check-footer">
            <div class="sep-pedagogy-card">
              <header>
                <h4>${esc(t('lapSystemsFormulaHeader'))}</h4>
                <p>${esc(t('lapSystemsFormulaDesc'))}</p>
              </header>
              <div class="sep-check-content">
                <strong>${esc(t('lapSystemsCheckHeader'))}</strong>
                <p>${esc(state.viewMode === 'zsr' ? t('lapSystemsCheckZSR') : (state.viewMode === 'zir' ? t('lapSystemsCheckZIR') : t('lapSystemsCheckTotal')))}</p>
                <aside class="sep-callout-inline">${esc(t('lapSystemsCheckTip'))}</aside>
              </div>
            </div>
            <p class="sep-clinic-prompt">
              ${esc(t('lapSystemsFooterPrompt'))}
              <a href="#study" class="btn btn-secondary">${esc(t('lapSystemsGoToClinic'))}</a>
            </p>
          </footer>
        </div>
      </section>
    `;

    updatePlots();
  }

  function updatePlots() {
    const isHarmonic = state.preset === 'harmonic-exp' || state.preset === 'harmonic-free';
    const isDelayed = state.preset === 'delayed-coupled';
    const isSecondOrder = state.preset === 'second-order';

    const params = {
      x0: state.x0,
      y0: state.y0,
      vx0: state.vx0,
      tDelay: state.tDelay,
      viewMode: state.viewMode
    };

    const traj = laplaceSystemsTrajectory(state.preset, params, { duration: state.duration, samples: 251 });

    let rkMetrics = { maxDiffX: 0, maxDiffY: 0 };
    if (isHarmonic) {
      const rk = laplaceSystemsHarmonicRK4(
        { x0: state.x0, y0: state.y0, forcing: state.preset === 'harmonic-exp' },
        { duration: state.duration, samples: 251 }
      );
      rkMetrics = rk.metrics;
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

    // Delay indicator line markup if applicable
    let delayLineMarkup = '';
    if ((isDelayed || isSecondOrder) && state.tDelay <= state.duration) {
      const xPix = timePlot.project(state.tDelay, 0)[0];
      delayLineMarkup = `
        <line x1="${xPix}" y1="20" x2="${xPix}" y2="280" stroke="#888" stroke-width="1.8" stroke-dasharray="4 4" />
        <text x="${xPix + 4}" y="36" font-size="11" fill="#666">t = ${fmt(state.tDelay, 2)}s</text>
      `;
    }

    const timeSvg = root.querySelector('#lap-systems-time-svg');
    if (timeSvg) {
      timeSvg.innerHTML = `
        ${timePlot.markup}
        <g clip-path="url(#${timePlot.clipId})">
          ${timePlot.line(xCoords, '#2d6d4b', 'stroke-width="2.6"')}
          ${timePlot.line(yCoords, '#b47b55', 'stroke-width="2.4" stroke-dasharray="6 3"')}
          ${delayLineMarkup}
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
    const phaseSvg = root.querySelector('#lap-systems-phase-svg');
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
      metricsBox.innerHTML = `
        ${metric(t('lapSystemsCardChar'), traj.characteristic, '', t('lapSystemsCardCharSub'))}
        ${metric(t('lapSystemsCardPoles'), traj.poles.join(', '), '', t('lapSystemsCardPolesSub'))}
        ${metric(t('lapSystemsCardMaxX'), fmt(traj.metrics.maxX, 2), '', t('lapSystemsCardMaxXSub'))}
        ${metric(t('lapSystemsCardMaxY'), fmt(traj.metrics.maxY, 2), '', t('lapSystemsCardMaxYSub'))}
        ${metric(t('lapSystemsCardResidual'), traj.metrics.maxResidual < 1e-10 ? '< 1e-12' : fmt(traj.metrics.maxResidual, 4), '', t('lapSystemsCardResidualSub'))}
        ${metric(t('lapSystemsCardRk4Error'), isHarmonic ? (rkMetrics.maxDiffX < 1e-6 ? '< 1e-7' : fmt(rkMetrics.maxDiffX, 5)) : 'N/A', '', t('lapSystemsCardRk4ErrorSub'))}
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
    if (event.target.id === 'lap-systems-preset') {
      state.preset = event.target.value;
      syncPresetDefaults();
      render();
      root.querySelector('#lap-systems-preset')?.focus();
    } else if (event.target.id === 'lap-systems-viewmode') {
      state.viewMode = event.target.value;
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
    if (out) {
      if (key === 'duration' || key === 'tDelay') {
        out.textContent = `${fmt(value, key === 'tDelay' ? 2 : 1)} s`;
      } else {
        out.textContent = fmt(value, key === 'vx0' ? 1 : 2);
      }
    }
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
