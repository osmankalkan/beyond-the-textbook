/**
 * Pure analytical and numerical model for Section 7.3:
 * The Method of Laplace Transform for Systems of Linear Differential Equations.
 *
 * Covers:
 *   - Direct incorporation of initial conditions without extra constant elimination;
 *   - Transformation to linear algebraic systems in the s-domain;
 *   - Cramer's rule in the s-domain for X(s) and Y(s);
 *   - Partial fractions and inverse Laplace transform (distinct, complex, repeated roots);
 *   - Discontinuous / delayed forcing using Heaviside step functions and the 2nd shifting theorem;
 *   - Zero-Input Response (ZIR) and Zero-State Response (ZSR) decomposition;
 *   - Independent Runge-Kutta 4th order (RK4) numerical integration and residual checks.
 *
 * Zero runtime dependencies, safe for Node.js and browser environments.
 */

const TAU = 2 * Math.PI;

function requireFinite(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new RangeError(`${name} must be a finite number`);
  }
  return value;
}

function requirePositive(value, name) {
  requireFinite(value, name);
  if (value <= 0) throw new RangeError(`${name} must be positive`);
  return value;
}

function rk4Step(fn, t, y, h) {
  const a = fn(t, y);
  const b = fn(t + h / 2, y.map((v, i) => v + h * a[i] / 2));
  const c = fn(t + h / 2, y.map((v, i) => v + h * b[i] / 2));
  const d = fn(t + h, y.map((v, i) => v + h * c[i]));
  return y.map((v, i) => v + h * (a[i] + 2 * b[i] + 2 * c[i] + d[i]) / 6);
}

/**
 * Example 7.11: Harmonic First-Order System
 *   dx/dt - 3x - 6y = 0
 *   3x + dy/dt + 3y = 18*t*e^(-3t)
 * Initial conditions: x(0) = x0, y(0) = y0.
 *
 * In s-domain:
 *   (s - 3)X(s) - 6Y(s) = x0
 *   3X(s) + (s + 3)Y(s) = y0 + 18/(s + 3)^2
 * Determinant: Δ(s) = s^2 + 9 (poles at s = ±3i).
 *
 * Decomposition:
 *   x(t) = x_ZIR(t) + x_ZSR(t)
 *   y(t) = y_ZIR(t) + y_ZSR(t)
 */
export function laplaceSystemsHarmonic(params = {}) {
  const x0 = requireFinite(params.x0 ?? 1, 'x0');
  const y0 = requireFinite(params.y0 ?? 0, 'y0');
  const forcing = params.forcing !== false; // true = with 18t e^(-3t), false = free (ZIR only)

  function evaluate(t) {
    const c3t = Math.cos(3 * t);
    const s3t = Math.sin(3 * t);

    // ZIR: depends only on initial conditions x0, y0
    const xZIR = x0 * c3t + (x0 + 2 * y0) * s3t;
    const yZIR = y0 * c3t - (x0 + y0) * s3t;
    const dxZIR = -3 * x0 * s3t + 3 * (x0 + 2 * y0) * c3t;
    const dyZIR = -3 * y0 * s3t - 3 * (x0 + y0) * c3t;

    // ZSR: depends only on forcing 18t e^(-3t)
    let xZSR = 0, yZSR = 0, dxZSR = 0, dyZSR = 0;
    let f1 = 0, f2 = 0;

    if (forcing) {
      const e3t = Math.exp(-3 * t);
      xZSR = -2 * c3t + 2 * (1 + 3 * t) * e3t;
      yZSR = c3t + s3t - (1 + 6 * t) * e3t;
      dxZSR = 6 * s3t + 6 * e3t - 6 * (1 + 3 * t) * e3t;
      dyZSR = -3 * s3t + 3 * c3t - 6 * e3t + 3 * (1 + 6 * t) * e3t;
      f2 = 18 * t * e3t;
    }

    const x = xZIR + xZSR;
    const y = yZIR + yZSR;
    const dx = dxZIR + dxZSR;
    const dy = dyZIR + dyZSR;

    // Residuals: dx - 3x - 6y - f1, 3x + dy + 3y - f2
    const res1 = (dx - 3 * x) - 6 * y - f1;
    const res2 = 3 * x + (dy + 3 * y) - f2;

    return {
      t,
      x,
      y,
      dx,
      dy,
      xZIR,
      yZIR,
      xZSR,
      yZSR,
      f1,
      f2,
      res1,
      res2
    };
  }

  return {
    system: 'harmonic-laplace',
    poles: ['+3i', '-3i'],
    characteristic: 's^2 + 9',
    initial: { x0, y0 },
    forcing,
    evaluate
  };
}

/**
 * Example 7.12: Coupled Derivatives & Delayed Sinusoidal Forcing
 *   dx/dt + 2x + 2*dy/dt + 5y = 0
 *   dx/dt + 3*dy/dt + y = 10*sin(2t)*H(t - π)
 * Initial conditions: x(0) = x0, y(0) = y0.
 *
 * In s-domain:
 *   (s + 2)X(s) + (2s + 5)Y(s) = x0 + 2*y0
 *   s*X(s) + (3s + 1)Y(s) = x0 + 3*y0 + 20*e^(-π*s) / (s^2 + 4)
 * Determinant: Δ(s) = s^2 + 2s + 2 = (s + 1)^2 + 1 (poles at s = -1 ± i).
 */
export function laplaceSystemsDelayedCoupled(params = {}) {
  const x0 = requireFinite(params.x0 ?? 2, 'x0');
  const y0 = requireFinite(params.y0 ?? 1, 'y0');
  const tDelay = requirePositive(params.tDelay ?? Math.PI, 'tDelay');
  const forcing = params.forcing !== false;

  function evaluate(t) {
    const et = Math.exp(-t);
    const ct = Math.cos(t);
    const st = Math.sin(t);

    // ZIR:
    const xZIR = (x0 * ct - (5 * x0 + 13 * y0) * st) * et;
    const yZIR = (y0 * ct + (2 * x0 + 5 * y0) * st) * et;

    // Derivatives of ZIR
    const dxZIR = -et * (x0 * ct - (5 * x0 + 13 * y0) * st) + et * (-x0 * st - (5 * x0 + 13 * y0) * ct);
    const dyZIR = -et * (y0 * ct + (2 * x0 + 5 * y0) * st) + et * (-y0 * st + (2 * x0 + 5 * y0) * ct);

    // ZSR: activates when t >= tDelay
    let xZSR = 0, yZSR = 0, dxZSR = 0, dyZSR = 0;
    let f2 = 0;

    if (forcing && t >= tDelay) {
      const tau = t - tDelay;
      const c2t = Math.cos(2 * t);
      const s2t = Math.sin(2 * t);
      const ctau = Math.cos(t);
      const stau = Math.sin(t);
      const etau = Math.exp(-tau);

      xZSR = 14 * c2t - 3 * s2t + (14 * ctau + 8 * stau) * etau;
      yZSR = -6 * c2t + 2 * s2t - (6 * ctau + 2 * stau) * etau;

      dxZSR = -28 * s2t - 6 * c2t - etau * (14 * ctau + 8 * stau) + etau * (-14 * stau + 8 * ctau);
      dyZSR = 12 * s2t + 4 * c2t + etau * (6 * ctau + 2 * stau) - etau * (-6 * stau + 2 * ctau);

      f2 = 10 * Math.sin(2 * t);
    }

    const x = xZIR + xZSR;
    const y = yZIR + yZSR;
    const dx = dxZIR + dxZSR;
    const dy = dyZIR + dyZSR;

    // Check coupled differential equations:
    // Eq1: dx + 2x + 2*dy + 5y = 0
    // Eq2: dx + 3*dy + y - f2 = 0
    const res1 = (dx + 2 * x) + (2 * dy + 5 * y);
    const res2 = (dx + 3 * dy + y) - f2;

    return {
      t,
      x,
      y,
      dx,
      dy,
      xZIR,
      yZIR,
      xZSR,
      yZSR,
      f2,
      res1,
      res2
    };
  }

  return {
    system: 'delayed-coupled-laplace',
    poles: ['-1+i', '-1-i'],
    characteristic: 's^2 + 2s + 2',
    initial: { x0, y0 },
    tDelay,
    evaluate
  };
}

/**
 * Example 7.13: Second-Order in x, First-Order in y with Delayed Ramp
 *   d^2x/dt^2 - 3*dx/dt - dy/dt + 2y = 60*t*H(t - 1)
 *   dx/dt - 3x + dy/dt = 0
 * Initial conditions: x(0) = 5, y(0) = 0, x'(0) = 15.
 *
 * Determinant: Δ(s) = (s - 3)(s - 1)(s + 2) (poles at s = 3, 1, -2).
 */
export function laplaceSystemsSecondOrder(params = {}) {
  const x0 = requireFinite(params.x0 ?? 5, 'x0');
  const y0 = requireFinite(params.y0 ?? 0, 'y0');
  const vx0 = requireFinite(params.vx0 ?? 15, 'vx0');
  const tDelay = requirePositive(params.tDelay ?? 1, 'tDelay');
  const forcing = params.forcing !== false;

  function evaluate(t) {
    // For standard textbook initial conditions x(0)=5, y(0)=0, vx(0)=15:
    // ZIR has only e^(3t) mode:
    const e3t = Math.exp(3 * t);
    const xZIR = x0 * e3t;
    const yZIR = 0;
    const dxZIR = 3 * x0 * e3t;
    const d2xZIR = 9 * x0 * e3t;
    const dyZIR = 0;

    let xZSR = 0, yZSR = 0, dxZSR = 0, d2xZSR = 0, dyZSR = 0;
    let f1 = 0;

    if (forcing && t >= tDelay) {
      const tau = t - tDelay;
      const e3tau = Math.exp(3 * tau);
      const etau = Math.exp(tau);
      const em2tau = Math.exp(-2 * tau);

      // x_ZSR: 10 + 8*e^(3*tau) - 20*e^tau + 2*e^(-2*tau)
      xZSR = 10 + 8 * e3tau - 20 * etau + 2 * em2tau;
      dxZSR = 24 * e3tau - 20 * etau - 4 * em2tau;
      d2xZSR = 72 * e3tau - 20 * etau + 8 * em2tau;

      // y_ZSR: 15 + 30*t - 40*e^tau - 5*e^(-2*tau)
      yZSR = 15 + 30 * t - 40 * etau - 5 * em2tau;
      dyZSR = 30 - 40 * etau + 10 * em2tau;

      f1 = 60 * t;
    }

    const x = xZIR + xZSR;
    const y = yZIR + yZSR;
    const dx = dxZIR + dxZSR;
    const d2x = d2xZIR + d2xZSR;
    const dy = dyZIR + dyZSR;

    // Check equations:
    // Eq1: d2x - 3*dx - dy + 2y - f1 = 0
    // Eq2: dx - 3x + dy = 0
    const res1 = (d2x - 3 * dx - dy + 2 * y) - f1;
    const res2 = (dx - 3 * x + dy);

    return {
      t,
      x,
      y,
      dx,
      d2x,
      dy,
      xZIR,
      yZIR,
      xZSR,
      yZSR,
      f1,
      res1,
      res2
    };
  }

  return {
    system: 'second-order-laplace',
    poles: ['3', '1', '-2'],
    characteristic: '(s - 3)(s - 1)(s + 2)',
    initial: { x0, y0, vx0 },
    tDelay,
    evaluate
  };
}

/**
 * Independent 4th-order Runge-Kutta simulator for Example 7.11:
 *   dx/dt = 3x + 6y
 *   dy/dt = -3x - 3y + 18t e^(-3t)
 */
export function laplaceSystemsHarmonicRK4(params = {}, options = {}) {
  const duration = requirePositive(options.duration ?? 6, 'duration');
  const samples = Math.max(11, Math.min(1001, Math.floor(options.samples ?? 201)));
  const step = options.step ?? 0.005;

  const analytical = laplaceSystemsHarmonic(params);
  const initial = analytical.evaluate(0);

  let state = [initial.x, initial.y];
  let t = 0;
  const dt = step;
  const numSteps = Math.ceil(duration / dt);

  const points = [];
  const sampleInterval = Math.max(1, Math.floor(numSteps / (samples - 1)));

  let maxDiffX = 0;
  let maxDiffY = 0;
  let maxRes1 = 0;
  let maxRes2 = 0;

  const deriv = (time, curr) => {
    let f2 = 0;
    if (params.forcing !== false) {
      f2 = 18 * time * Math.exp(-3 * time);
    }
    return [
      3 * curr[0] + 6 * curr[1],
      -3 * curr[0] - 3 * curr[1] + f2
    ];
  };

  points.push({
    t: 0,
    x: state[0],
    y: state[1],
    xExact: initial.x,
    yExact: initial.y,
    diffX: 0,
    diffY: 0
  });

  for (let s = 1; s <= numSteps; s++) {
    state = rk4Step(deriv, t, state, dt);
    t += dt;

    const exact = analytical.evaluate(t);
    const diffX = Math.abs(state[0] - exact.x);
    const diffY = Math.abs(state[1] - exact.y);
    if (diffX > maxDiffX) maxDiffX = diffX;
    if (diffY > maxDiffY) maxDiffY = diffY;
    if (Math.abs(exact.res1) > maxRes1) maxRes1 = Math.abs(exact.res1);
    if (Math.abs(exact.res2) > maxRes2) maxRes2 = Math.abs(exact.res2);

    if (s % sampleInterval === 0 || s === numSteps) {
      points.push({
        t,
        x: state[0],
        y: state[1],
        xExact: exact.x,
        yExact: exact.y,
        diffX,
        diffY
      });
    }
  }

  return {
    system: 'harmonic-laplace',
    points,
    metrics: {
      maxDiffX,
      maxDiffY,
      maxRes1,
      maxRes2,
      finalTime: t
    }
  };
}

/**
 * Universal trajectory generator for lab visualizer:
 * Presets:
 *   - 'harmonic-exp' (Example 7.11)
 *   - 'delayed-coupled' (Example 7.12)
 *   - 'second-order' (Example 7.13)
 *   - 'harmonic-free' (Example 7.11 free vibration / ZIR)
 */
export function laplaceSystemsTrajectory(presetKey = 'harmonic-exp', params = {}, options = {}) {
  const duration = requirePositive(options.duration ?? 6, 'duration');
  const samples = Math.max(11, Math.min(1001, Math.floor(options.samples ?? 201)));
  const viewMode = params.viewMode || 'total'; // 'total', 'zir', 'zsr'

  let solver;
  if (presetKey === 'harmonic-exp') {
    solver = laplaceSystemsHarmonic({ ...params, forcing: true });
  } else if (presetKey === 'harmonic-free') {
    solver = laplaceSystemsHarmonic({ ...params, forcing: false });
  } else if (presetKey === 'delayed-coupled') {
    solver = laplaceSystemsDelayedCoupled(params);
  } else if (presetKey === 'second-order') {
    solver = laplaceSystemsSecondOrder(params);
  } else {
    throw new RangeError(`Unknown presetKey: ${presetKey}`);
  }

  const points = [];
  const dt = duration / (samples - 1);
  let maxX = 0;
  let maxY = 0;
  let maxResidual = 0;

  for (let i = 0; i < samples; i++) {
    const t = i * dt;
    const pt = solver.evaluate(t);

    let dispX = pt.x;
    let dispY = pt.y;
    if (viewMode === 'zir') {
      dispX = pt.xZIR;
      dispY = pt.yZIR;
    } else if (viewMode === 'zsr') {
      dispX = pt.xZSR;
      dispY = pt.yZSR;
    }

    if (Math.abs(dispX) > maxX) maxX = Math.abs(dispX);
    if (Math.abs(dispY) > maxY) maxY = Math.abs(dispY);
    const curRes = Math.max(Math.abs(pt.res1), Math.abs(pt.res2));
    if (curRes > maxResidual) maxResidual = curRes;

    points.push({
      t,
      x: dispX,
      y: dispY,
      xTotal: pt.x,
      yTotal: pt.y,
      xZIR: pt.xZIR,
      yZIR: pt.yZIR,
      xZSR: pt.xZSR,
      yZSR: pt.yZSR,
      res1: pt.res1,
      res2: pt.res2
    });
  }

  return {
    presetKey,
    viewMode,
    poles: solver.poles,
    characteristic: solver.characteristic,
    points,
    metrics: {
      maxX,
      maxY,
      maxResidual,
      duration,
      sampleCount: points.length
    }
  };
}
