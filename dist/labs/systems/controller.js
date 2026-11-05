import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {systemsParticleTrajectory, systemsShearResponse} from '../../models/systems.js';
import {v, n, o, r, p, pow, sub, eq, plus, minus, dot, lines} from '../../study/math.js';

const PARTICLE_KEYS = ['mass', 'radialForce', 'tangentialForce', 'radius', 'angularSpeed'];
const BUILDING_KEYS = ['m1', 'm2', 'k1', 'k2', 'c1', 'c2', 'F1', 'F2', 'x10'];

const PRESETS = {
  circular: {radialForce: -2, tangentialForce: 0, radius: 2, angularSpeed: 1, mass: 1},
  straight: {radialForce: 0, tangentialForce: 0, radius: 2, angularSpeed: 0.65, mass: 1},
  spiral: {radialForce: -1.2, tangentialForce: 0.2, radius: 2, angularSpeed: 0.9, mass: 1},
  exam: {m1: 2, m2: 1, k1: 4, k2: 2, c1: 0.2, c2: 0.1, F1: 4, F2: 2, x10: 0},
  free: {m1: 2, m2: 1, k1: 4, k2: 2, c1: 0.2, c2: 0.1, F1: 0, F2: 0, x10: 1},
  soft: {m1: 2, m2: 1, k1: 1, k2: 8, c1: 0.2, c2: 0.1, F1: 4, F2: 2, x10: 0}
};

function matrix(rows) {
  return o('[') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '</mtable>' + o(']');
}

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();
  const state = {
    mode: 'particle',
    mass: 1,
    radialForce: -2,
    tangentialForce: 0,
    radius: 2,
    angularSpeed: 1,
    m1: 2,
    m2: 1,
    k1: 4,
    k2: 2,
    c1: 0.2,
    c2: 0.1,
    F1: 4,
    F2: 2,
    x10: 0,
    x20: 0,
    v10: 0,
    v20: 0
  };

  const fmt = (value, digits = 2) => (context.format ? context.format(value, digits) : Number(value).toFixed(digits));
  const t = key => (context.t ? context.t(key) : key);
  const lang = () => context.lang || 'tr';

  function render() {
    const particle = state.mode === 'particle';
    root.innerHTML = `
      <section class="sep-lab systems-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('systemsEyebrow'))}</p>
          <h2>${esc(t('systemsTitle'))}</h2>
          <p>${esc(t('systemsSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-toolbar">
            <div>
              <label for="systems-mode">${esc(t('systemsModeLabel'))}</label>
              <select id="systems-mode">
                <option value="particle" ${particle ? 'selected' : ''}>${esc(t('systemsModeParticle'))}</option>
                <option value="building" ${!particle ? 'selected' : ''}>${esc(t('systemsModeBuilding'))}</option>
              </select>
            </div>
            <span class="op-badge badge-ok">${esc(particle ? t('systemsParticleBadge') : t('systemsBuildingBadge'))}</span>
          </div>

          ${particle ? particlePanel() : buildingPanel()}

          <div class="sep-interpret">
            <div>
              <p class="eyebrow">${esc(particle ? t('systemsParticleFormulaHeader') : t('systemsBuildingFormulaHeader'))}</p>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${particle ? particleFormula() : buildingFormula()}</mrow></math>
              <p>${esc(particle ? t('systemsParticleFormulaNote') : t('systemsBuildingFormulaNote'))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(t('systemsCheckHeader'))}</p>
              <p>${esc(particle ? t('systemsParticleCheck') : t('systemsBuildingCheck'))}</p>
              <p class="small text-muted">${esc(particle ? t('systemsParticleTip') : t('systemsBuildingTip'))}</p>
            </div>
          </div>
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(t('systemsFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(t('systemsGoToClinic'))}</a>
        </footer>
      </section>
    `;
    draw();
  }

  function particlePanel() {
    return `
      <div class="sep-grid">
        <div class="sep-controls">
          ${control('mass', t('systemsMassLabel'), 0.5, 3, 0.1, state.mass, 'kg', 1)}
          ${control('radialForce', t('systemsRadialForceLabel'), -8, 8, 0.2, state.radialForce, 'N', 1)}
          ${control('tangentialForce', t('systemsTangentialForceLabel'), -6, 6, 0.2, state.tangentialForce, 'N', 1)}
          ${control('radius', t('systemsRadiusLabel'), 0.8, 3.5, 0.1, state.radius, 'm', 1)}
          ${control('angularSpeed', t('systemsAngularSpeedLabel'), 0, 2.5, 0.05, state.angularSpeed, 'rad/s', 2)}
          <div class="sep-presets">
            <button type="button" class="button secondary" data-preset="circular">${esc(t('systemsPresetCircular'))}</button>
            <button type="button" class="button secondary" data-preset="straight">${esc(t('systemsPresetStraight'))}</button>
            <button type="button" class="button secondary" data-preset="spiral">${esc(t('systemsPresetSpiral'))}</button>
          </div>
          <p class="family-note">${esc(t('systemsParticleNote'))}</p>
        </div>

        <div class="sep-plot-wrap">
          <div class="sep-legend">
            <span><i style="background:#2d6d4b"></i>${esc(t('systemsLegendTrajectory'))}</span>
            <span class="sep-b"><i style="background:#dc2626"></i>${esc(t('systemsLegendCurrent'))}</span>
          </div>
          <svg class="cx-chart" id="systems-particle-path" role="img" viewBox="0 0 740 420" aria-label="${esc(t('systemsParticlePathAria'))}"></svg>

          <div class="sep-legend" style="margin-top:22px;">
            <span><i style="background:#2563eb"></i>${esc(t('systemsLegendRadius'))}</span>
            <span class="sep-b"><i style="background:#b47b55;border-top:2px dashed #b47b55"></i>${esc(t('systemsLegendInitialRadius'))}</span>
          </div>
          <svg class="cx-chart" id="systems-particle-radius" role="img" viewBox="0 0 740 230" aria-label="${esc(t('systemsParticleRadiusAria'))}"></svg>

          <div class="sep-metrics" aria-live="polite"></div>
        </div>
      </div>
    `;
  }

  function buildingPanel() {
    return `
      <div class="sep-grid">
        <div class="sep-controls">
          ${control('m1', t('systemsM1Label'), 0.5, 4, 0.1, state.m1, 'kg', 1)}
          ${control('m2', t('systemsM2Label'), 0.5, 4, 0.1, state.m2, 'kg', 1)}
          ${control('k1', t('systemsK1Label'), 0.5, 10, 0.2, state.k1, 'N/m', 1)}
          ${control('k2', t('systemsK2Label'), 0.5, 10, 0.2, state.k2, 'N/m', 1)}
          ${control('c1', t('systemsC1Label'), 0, 1.5, 0.02, state.c1, 'N·s/m', 2)}
          ${control('c2', t('systemsC2Label'), 0, 1.5, 0.02, state.c2, 'N·s/m', 2)}
          ${control('F1', t('systemsF1Label'), -6, 6, 0.2, state.F1, 'N', 1)}
          ${control('F2', t('systemsF2Label'), -6, 6, 0.2, state.F2, 'N', 1)}
          ${control('x10', t('systemsX10Label'), -2, 2, 0.1, state.x10, 'm', 1)}
          <div class="sep-presets">
            <button type="button" class="button secondary" data-preset="exam">${esc(t('systemsPresetExam'))}</button>
            <button type="button" class="button secondary" data-preset="free">${esc(t('systemsPresetFree'))}</button>
            <button type="button" class="button secondary" data-preset="soft">${esc(t('systemsPresetSoft'))}</button>
          </div>
          <p class="family-note">${esc(t('systemsBuildingNote'))}</p>
        </div>

        <div class="sep-plot-wrap">
          <div class="sep-legend">
            <span><i style="background:#2d6d4b"></i>${esc(t('systemsLegendFloor1'))}</span>
            <span class="sep-b"><i style="background:#2563eb"></i>${esc(t('systemsLegendFloor2'))}</span>
            <span><i style="background:#b47b55;border-top:2px dashed #b47b55"></i>${esc(t('systemsLegendStatic'))}</span>
          </div>
          <svg class="cx-chart" id="systems-building-time" role="img" viewBox="0 0 740 300" aria-label="${esc(t('systemsBuildingTimeAria'))}"></svg>

          <div class="sep-legend" style="margin-top:22px;">
            <span><i style="background:#2d6d4b"></i>${esc(t('systemsLegendMode1'))}</span>
            <span class="sep-b"><i style="background:#b47b55"></i>${esc(t('systemsLegendMode2'))}</span>
          </div>
          <svg class="cx-chart" id="systems-building-modes" role="img" viewBox="0 0 740 230" aria-label="${esc(t('systemsBuildingModesAria'))}"></svg>

          <div class="sep-metrics" aria-live="polite"></div>
        </div>
      </div>
    `;
  }

  function control(id, label, min, max, step, value, suffix, digits = 1) {
    return `
      <div class="sep-control">
        <label for="systems-${id}">
          ${esc(label)}
          <output data-output="${id}">${fmt(value, digits)} <small>${esc(suffix)}</small></output>
        </label>
        <input id="systems-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
      </div>
    `;
  }

  function particleFormula() {
    const mass = v('m'), rr = v('r'), theta = v('θ');
    return lines(
      mass + p(dot(rr, 2) + minus + rr + pow(dot(theta), n(2))) + eq + sub(v('F'), v('r')),
      mass + p(n(2) + dot(rr) + dot(theta) + plus + rr + dot(theta, 2)) + eq + sub(v('F'), v('θ'))
    );
  }

  function buildingFormula() {
    const M = v('M'), C = v('C'), K = v('K'), F = v('F'), xx = v('x');
    return lines(
      M + dot(xx, 2) + plus + C + dot(xx) + plus + K + xx + eq + F + p(v('t')),
      K + eq + matrix([[v('k₁') + plus + v('k₂'), minus + v('k₂')], [minus + v('k₂'), v('k₂')]]) + o(',') + o(' ') + C + eq + matrix([[v('c₁') + plus + v('c₂'), minus + v('c₂')], [minus + v('c₂'), v('c₂')]])
    );
  }

  function draw() {
    if (state.mode === 'particle') drawParticle();
    else drawBuilding();
  }

  function drawParticle() {
    const result = systemsParticleTrajectory({
      mass: state.mass,
      radialForce: state.radialForce,
      tangentialForce: state.tangentialForce,
      radius: state.radius,
      angularSpeed: state.angularSpeed
    }, {duration: 12, step: 0.008, samples: 241});
    const {points, metrics} = result;

    PARTICLE_KEYS.forEach(key => {
      const output = root.querySelector(`[data-output="${key}"]`);
      if (output) output.innerHTML = `${fmt(state[key], key === 'angularSpeed' ? 2 : 1)} <small>${esc(key === 'mass' ? 'kg' : key === 'radius' ? 'm' : key === 'angularSpeed' ? 'rad/s' : 'N')}</small>`;
    });

    const maxRadius = Math.max(2.5, metrics.maxRadius * 1.18);
    // Keep one metre the same length on both axes so a circular orbit is not
    // drawn as an ellipse.
    const areaWidth = 740 - 49 - 18;
    const areaHeight = 420 - 29 - 44;
    const halfX = maxRadius * areaWidth / areaHeight;
    const pathPlot = cartesianPlot({
      width: 740,
      height: 420,
      xMin: -halfX,
      xMax: halfX,
      yMin: -maxRadius,
      yMax: maxRadius,
      format: value => fmt(value, 1),
      xLabel: 'x (m)',
      yLabel: 'y (m)',
      id: 'systems-particle-path',
      title: t('systemsParticlePathAria'),
      description: t('systemsParticlePathAria')
    });
    const pathPoints = points.map(point => [point.x, point.y]);
    const last = points[points.length - 1];
    const pathSvg = root.querySelector('#systems-particle-path');
    if (pathSvg) {
      pathSvg.innerHTML = `
        ${pathPlot.markup}
        <g clip-path="url(#${pathPlot.clipId})">
          ${pathPlot.line(pathPoints, '#2d6d4b', 'stroke-width="2.4"')}
          ${pathPlot.point(last.x, last.y, '#dc2626')}
        </g>
      `;
    }

    const maxR = Math.max(metrics.initialRadius, metrics.maxRadius) * 1.18;
    const radiusPlot = cartesianPlot({
      width: 740,
      height: 230,
      xMin: 0,
      xMax: 12,
      yMin: 0,
      yMax: maxR,
      format: value => fmt(value, 1),
      xLabel: 't (s)',
      yLabel: 'r (m)',
      id: 'systems-particle-radius',
      title: t('systemsParticleRadiusAria'),
      description: t('systemsParticleRadiusAria')
    });
    const radiusSvg = root.querySelector('#systems-particle-radius');
    if (radiusSvg) {
      radiusSvg.innerHTML = `
        ${radiusPlot.markup}
        <g clip-path="url(#${radiusPlot.clipId})">
          ${radiusPlot.line(points.map(point => [point.t, point.radius]), '#2563eb', 'stroke-width="2.4"')}
          ${radiusPlot.line([[0, metrics.initialRadius], [12, metrics.initialRadius]], '#b47b55', 'stroke-width="1.6" stroke-dasharray="5 4"')}
        </g>
      `;
    }

    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      const residual = Math.max(Math.abs(metrics.forceResidualR), Math.abs(metrics.forceResidualTheta));
      metricsBox.innerHTML = `
        ${metric(t('systemsCardRadius'), fmt(metrics.finalRadius, 2), 'm', t('systemsCardRadiusSub'))}
        ${metric(t('systemsCardTheta'), fmt(metrics.finalTheta, 2), 'rad', t('systemsCardThetaSub'))}
        ${metric(t('systemsCardRadialVelocity'), fmt(last.radialVelocity, 2), 'm/s', t('systemsCardRadialVelocitySub'))}
        ${metric(t('systemsCardAngularVelocity'), fmt(last.angularVelocity, 2), 'rad/s', t('systemsCardAngularVelocitySub'))}
        ${metric(t('systemsCardRadialAccel'), fmt(last.ar, 2), 'm/s²', t('systemsCardRadialAccelSub'))}
        ${metric(t('systemsCardAngularAccel'), fmt(last.atheta, 2), 'm/s²', t('systemsCardAngularAccelSub'))}
        ${metric(t('systemsCardResidual'), residual.toExponential(1), '', t('systemsCardResidualSub'))}
        ${metrics.reachedOrigin ? `<p class="small text-muted">${esc(t('systemsParticleOriginNote'))}</p>` : ''}
      `;
    }
  }

  function drawBuilding() {
    const result = systemsShearResponse({
      m1: state.m1,
      m2: state.m2,
      k1: state.k1,
      k2: state.k2,
      c1: state.c1,
      c2: state.c2,
      F1: state.F1,
      F2: state.F2,
      x10: state.x10,
      x20: 0
    }, {duration: 20, step: 0.01, samples: 401});
    const {points, static: staticSolution, frequencies, modes, metrics} = result;

    BUILDING_KEYS.forEach(key => {
      const output = root.querySelector(`[data-output="${key}"]`);
      if (output) {
        const suffix = key === 'm1' || key === 'm2' ? 'kg' : key === 'k1' || key === 'k2' ? 'N/m' : key === 'c1' || key === 'c2' ? 'N·s/m' : key === 'x10' ? 'm' : 'N';
        const digits = key === 'c1' || key === 'c2' ? 2 : 1;
        output.innerHTML = `${fmt(state[key], digits)} <small>${esc(suffix)}</small>`;
      }
    });

    const peak = Math.max(1, metrics.maxX1, metrics.maxX2, Math.abs(staticSolution.x1), Math.abs(staticSolution.x2)) * 1.18;
    const timePlot = cartesianPlot({
      width: 740,
      height: 300,
      xMin: 0,
      xMax: 20,
      yMin: -peak,
      yMax: peak,
      format: value => fmt(value, 1),
      xLabel: 't (s)',
      yLabel: 'x (m)',
      id: 'systems-building-time',
      title: t('systemsBuildingTimeAria'),
      description: t('systemsBuildingTimeAria')
    });
    const timeSvg = root.querySelector('#systems-building-time');
    if (timeSvg) {
      timeSvg.innerHTML = `
        ${timePlot.markup}
        <g clip-path="url(#${timePlot.clipId})">
          ${timePlot.line([[0, staticSolution.x1], [20, staticSolution.x1]], '#b47b55', 'stroke-width="1.4" stroke-dasharray="5 4"')}
          ${timePlot.line([[0, staticSolution.x2], [20, staticSolution.x2]], '#b47b55', 'stroke-width="1.4" stroke-dasharray="2 4"')}
          ${timePlot.line(points.map(point => [point.t, point.x1]), '#2d6d4b', 'stroke-width="2.4"')}
          ${timePlot.line(points.map(point => [point.t, point.x2]), '#2563eb', 'stroke-width="2.0"')}
        </g>
      `;
    }

    const modePlot = cartesianPlot({
      width: 740,
      height: 230,
      xMin: 0.8,
      xMax: 2.2,
      yMin: -2.6,
      yMax: 2.6,
      format: value => fmt(value, 1),
      xLabel: t('systemsFloorAxis'),
      yLabel: t('systemsModeAxis'),
      id: 'systems-building-modes',
      title: t('systemsBuildingModesAria'),
      description: t('systemsBuildingModesAria')
    });
    const mode1 = modes[0].shape;
    const mode2 = modes[1].shape;
    const modesSvg = root.querySelector('#systems-building-modes');
    if (modesSvg) {
      modesSvg.innerHTML = `
        ${modePlot.markup}
        <g clip-path="url(#${modePlot.clipId})">
          ${modePlot.line([[1, mode1[0]], [2, mode1[1]]], '#2d6d4b', 'stroke-width="2.6"')}
          ${modePlot.line([[1, mode2[0]], [2, mode2[1]]], '#b47b55', 'stroke-width="2.6"')}
          ${modePlot.point(1, mode1[0], '#2d6d4b')}
          ${modePlot.point(2, mode1[1], '#2d6d4b')}
          ${modePlot.point(1, mode2[0], '#b47b55')}
          ${modePlot.point(2, mode2[1], '#b47b55')}
        </g>
      `;
    }

    const metricsBox = root.querySelector('.sep-metrics');
    if (metricsBox) {
      metricsBox.innerHTML = `
        ${metric(t('systemsCardOmega1'), fmt(frequencies.omega1, 3), 'rad/s', t('systemsCardOmega1Sub'))}
        ${metric(t('systemsCardOmega2'), fmt(frequencies.omega2, 3), 'rad/s', t('systemsCardOmega2Sub'))}
        ${metric(t('systemsCardStaticX1'), fmt(staticSolution.x1, 2), 'm', t('systemsCardStaticX1Sub'))}
        ${metric(t('systemsCardStaticX2'), fmt(staticSolution.x2, 2), 'm', t('systemsCardStaticX2Sub'))}
        ${metric(t('systemsCardMaxX1'), fmt(metrics.maxX1, 2), 'm', t('systemsCardMaxX1Sub'))}
        ${metric(t('systemsCardMaxX2'), fmt(metrics.maxX2, 2), 'm', t('systemsCardMaxX2Sub'))}
        ${metric(t('systemsCardDimension'), '2n = 4', '', t('systemsCardDimensionSub'))}
      `;
    }
  }

  function metric(label, value, unit, sub) {
    return `<article class="metric"><p class="eyebrow">${esc(label)}</p><strong>${esc(value)}${unit ? ' ' + esc(unit) : ''}</strong><p>${esc(sub)}</p></article>`;
  }

  root.addEventListener('change', event => {
    if (event.target.id === 'systems-mode') {
      state.mode = event.target.value;
      render();
      root.querySelector('#systems-mode')?.focus();
    }
  }, {signal: events.signal});

  root.addEventListener('input', event => {
    const key = event.target.dataset.input;
    if (!key) return;
    const value = Number.parseFloat(event.target.value);
    if (!Number.isFinite(value)) return;
    state[key] = value;
    if (state.mode === 'particle') drawParticle();
    else drawBuilding();
  }, {signal: events.signal});

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    const preset = PRESETS[button.dataset.preset];
    if (!preset) return;
    Object.assign(state, preset);
    if (button.dataset.preset === 'circular') {
      state.radialForce = -state.mass * state.radius * state.angularSpeed * state.angularSpeed;
    }
    render();
    root.querySelector(`[data-preset="${button.dataset.preset}"]`)?.focus();
  }, {signal: events.signal});

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
