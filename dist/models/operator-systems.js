/**
 * Pure analytical and numerical model for Section 7.2:
 * The Method of Operator for Systems of Linear Differential Equations.
 *
 * Covers:
 *   - Operator determinant φ(D) = det[φ_ij(D)] and characteristic equation φ(λ) = 0;
 *   - Degree N = deg φ(D) determining the true number of arbitrary constants;
 *   - Elimination of extra constants by substitution into system equations;
 *   - Cramer's Rule for differential operators: operators MUST precede functions;
 *   - Particular solutions with exponential shift, polynomials, and resonance;
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
 * Example 7.3 / 7.5 / 7.6 Base Operator System:
 *   (D - 3)x - 6y = f1(t)
 *   3x + (D + 3)y = f2(t)
 *
 * Operator matrix:
 *   [ D - 3    -6    ]
 *   [   3     D + 3  ]
 * Determinant φ(D) = (D - 3)(D + 3) + 18 = D^2 + 9.
 * Characteristic roots: λ = ±3i (natural frequency ω = 3).
 *
 * Degree N = 2 ⇒ exactly 2 independent arbitrary constants (A1, B1).
 * Extra constants in y_C:
 *   A2 = -0.5 * (A1 - B1)
 *   B2 = -0.5 * (A1 + B1)
 *
 * Forcing options:
 *   - 'free': f1 = 0, f2 = 0 (Example 7.3)
 *   - 'exponential': f1 = 0, f2 = 18*t*exp(-3t) (Example 7.5)
 *       x_P = 2*(3t + 1)*exp(-3t)
 *       y_P = -(6t + 1)*exp(-3t)
 *   - 'resonance': f1 = 2*cos(3t), f2 = 2*sin(3t) (Example 7.6)
 *       x_P = t*(sin(3t) - cos(3t))
 *       y_P = t*cos(3t)
 *       Constant shift: A2 = -0.5*(A1 - B1) - 0.5, B2 = -0.5*(A1 + B1) + 1/6
 */
export function operatorSystemsHarmonicSolution(params = {}) {
  const forcing = params.forcing || 'free';
  const A1 = requireFinite(params.A1 ?? 1, 'A1');
  const B1 = requireFinite(params.B1 ?? 0, 'B1');

  let A2 = -0.5 * (A1 - B1);
  let B2 = -0.5 * (A1 + B1);

  if (forcing === 'resonance') {
    A2 -= 0.5;
    B2 += 1 / 6;
  }

  const omega = 3;

  function evaluate(t) {
    const c3t = Math.cos(omega * t);
    const s3t = Math.sin(omega * t);

    // Complementary part
    const xC = A1 * c3t + B1 * s3t;
    const yC = A2 * c3t + B2 * s3t;
    const dxC = -omega * A1 * s3t + omega * B1 * c3t;
    const dyC = -omega * A2 * s3t + omega * B2 * c3t;

    // Particular part & forcing
    let xP = 0, yP = 0, dxP = 0, dyP = 0;
    let f1 = 0, f2 = 0;

    if (forcing === 'exponential') {
      const e3t = Math.exp(-3 * t);
      xP = 2 * (3 * t + 1) * e3t;
      yP = -(6 * t + 1) * e3t;
      dxP = 6 * e3t - 3 * xP;
      dyP = -6 * e3t - 3 * yP;
      f1 = 0;
      f2 = 18 * t * e3t;
    } else if (forcing === 'resonance') {
      xP = t * (s3t - c3t);
      yP = t * c3t;
      dxP = (s3t - c3t) + t * (3 * c3t + 3 * s3t);
      dyP = c3t - 3 * t * s3t;
      f1 = 2 * c3t;
      f2 = 2 * s3t;
    }

    const x = xC + xP;
    const y = yC + yP;
    const dx = dxC + dxP;
    const dy = dyC + dyP;

    // Operator residuals: (D - 3)x - 6y - f1, 3x + (D + 3)y - f2
    const res1 = (dx - 3 * x) - 6 * y - f1;
    const res2 = 3 * x + (dy + 3 * y) - f2;

    return {
      t,
      x,
      y,
      dx,
      dy,
      xC,
      yC,
      xP,
      yP,
      f1,
      f2,
      res1,
      res2
    };
  }

  return {
    system: 'harmonic',
    degree: 2,
    omega,
    forcing,
    constants: { A1, B1, A2, B2 },
    evaluate
  };
}

/**
 * Example 7.4 Asymmetric System:
 *   (D^2 + 3D + 2)x + (D + 1)y = 0
 *   (D + 2)x + (D - 1)y = 0
 *
 * Operator determinant:
 *   φ(D) = (D + 1)(D + 2)(D - 2) = D^3 + D^2 - 4D - 4.
 * Roots: λ = -1, -2, 2.
 * Degree N = 3 ⇒ exactly 3 arbitrary constants (C1, C2, C3).
 *
 * Complementary solutions:
 *   x_C = C1*e^(-t) + C2*e^(-2t) + C3*e^(2t)
 * Extra constant substitution into (D + 2)x + (D - 1)y = 0 yields:
 *   D1 = 0.5 * C1
 *   D2 = 0
 *   D3 = -4 * C3
 *   y_C = 0.5*C1*e^(-t) - 4*C3*e^(2t)
 */
export function operatorSystemsAsymmetricSolution(params = {}) {
  const C1 = requireFinite(params.C1 ?? 1, 'C1');
  const C2 = requireFinite(params.C2 ?? 1, 'C2');
  const C3 = requireFinite(params.C3 ?? 0.5, 'C3');

  const D1 = 0.5 * C1;
  const D2 = 0;
  const D3 = -4 * C3;

  function evaluate(t) {
    const e1 = Math.exp(-t);
    const e2 = Math.exp(-2 * t);
    const ep2 = Math.exp(2 * t);

    const x = C1 * e1 + C2 * e2 + C3 * ep2;
    const y = D1 * e1 + D2 * e2 + D3 * ep2;

    const dx = -C1 * e1 - 2 * C2 * e2 + 2 * C3 * ep2;
    const d2x = C1 * e1 + 4 * C2 * e2 + 4 * C3 * ep2;
    const dy = -D1 * e1 - 2 * D2 * e2 + 2 * D3 * ep2;

    // Residual 1: (D^2 + 3D + 2)x + (D + 1)y
    const res1 = (d2x + 3 * dx + 2 * x) + (dy + y);
    // Residual 2: (D + 2)x + (D - 1)y
    const res2 = (dx + 2 * x) + (dy - y);

    return {
      t,
      x,
      y,
      dx,
      dy,
      d2x,
      res1,
      res2
    };
  }

  return {
    system: 'asymmetric',
    degree: 3,
    roots: [-1, -2, 2],
    constants: { C1, C2, C3, D1, D2, D3 },
    evaluate
  };
}

/**
 * Example 7.7 Polynomial & Exponential Forcing System:
 *   (D^2 - 3D)x - (D - 2)y = 14t + 7
 *   (D - 3)x + Dy = 1
 *
 * Operator determinant:
 *   φ(D) = (D - 3)(D + 2)(D - 1) = D^3 - 2D^2 - 5D + 6.
 * Roots: λ = -2, 1, 3. Degree N = 3.
 * Particular solutions:
 *   x_P = 2
 *   y_P = 7t + 7
 * Constant relations from (D - 3)x + Dy = 1:
 *   D1 = -2.5 * C1
 *   D2 = 2 * C2
 *   D3 = 0
 */
export function operatorSystemsPolynomialSolution(params = {}) {
  const C1 = requireFinite(params.C1 ?? 1, 'C1');
  const C2 = requireFinite(params.C2 ?? 1, 'C2');
  const C3 = requireFinite(params.C3 ?? 0.2, 'C3');

  const D1 = -2.5 * C1;
  const D2 = 2 * C2;
  const D3 = 0;

  function evaluate(t) {
    const eNeg2 = Math.exp(-2 * t);
    const ePos1 = Math.exp(t);
    const ePos3 = Math.exp(3 * t);

    const xC = C1 * eNeg2 + C2 * ePos1 + C3 * ePos3;
    const yC = D1 * eNeg2 + D2 * ePos1 + D3 * ePos3;
    const xP = 2;
    const yP = 7 * t + 7;

    const x = xC + xP;
    const y = yC + yP;

    const dx = -2 * C1 * eNeg2 + C2 * ePos1 + 3 * C3 * ePos3;
    const d2x = 4 * C1 * eNeg2 + C2 * ePos1 + 9 * C3 * ePos3;
    const dy = -2 * D1 * eNeg2 + D2 * ePos1 + 3 * D3 * ePos3 + 7;

    const f1 = 14 * t + 7;
    const f2 = 1;

    // Residual 1: (D^2 - 3D)x - (D - 2)y - f1
    const res1 = (d2x - 3 * dx) - (dy - 2 * y) - f1;
    // Residual 2: (D - 3)x + Dy - f2
    const res2 = (dx - 3 * x) + dy - f2;

    return {
      t,
      x,
      y,
      dx,
      dy,
      d2x,
      xC,
      yC,
      xP,
      yP,
      f1,
      f2,
      res1,
      res2
    };
  }

  return {
    system: 'polynomial',
    degree: 3,
    roots: [-2, 1, 3],
    constants: { C1, C2, C3, D1, D2, D3 },
    evaluate
  };
}

/**
 * Cramer's Rule for Differential Operators:
 * Evaluates Δ_x(t) and Δ_y(t) for 2x2 operator system:
 *   [ φ11(D)  φ12(D) ] [ x ]   [ f1(t) ]
 *   [ φ21(D)  φ22(D) ] [ y ] = [ f2(t) ]
 *
 * IMPORTANT: Operators must precede functions!
 *   Δ_x(t) = φ22(D)[f1(t)] - φ12(D)[f2(t)]
 *   Δ_y(t) = φ11(D)[f2(t)] - φ21(D)[f1(t)]
 */
export function operatorSystemsCramerDeterminants(preset, t) {
  if (preset === 'exponential') {
    // φ11 = D - 3, φ12 = -6, φ21 = 3, φ22 = D + 3
    // f1 = 0, f2 = 18*t*e^(-3t)
    // Δ_x(t) = (D + 3)[0] - (-6)[18*t*e^(-3t)] = 108*t*e^(-3t)
    // Δ_y(t) = (D - 3)[18*t*e^(-3t)] - 3[0] = 18*e^(-3t) - 54*t*e^(-3t) - 54*t*e^(-3t) = 18*e^(-3t) - 108*t*e^(-3t)
    const e = Math.exp(-3 * t);
    const deltaX = 108 * t * e;
    const deltaY = (18 - 108 * t) * e;
    return { deltaX, deltaY };
  }
  if (preset === 'resonance') {
    // f1 = 2*cos(3t), f2 = 2*sin(3t)
    // Δ_x(t) = (D + 3)[2*cos(3t)] - (-6)[2*sin(3t)]
    //        = -6*sin(3t) + 6*cos(3t) + 12*sin(3t) = 6*cos(3t) + 6*sin(3t)
    // Δ_y(t) = (D - 3)[2*sin(3t)] - 3[2*cos(3t)]
    //        = 6*cos(3t) - 6*sin(3t) - 6*cos(3t) = -6*sin(3t)
    const c = Math.cos(3 * t);
    const s = Math.sin(3 * t);
    const deltaX = 6 * c + 6 * s;
    const deltaY = -6 * s;
    return { deltaX, deltaY };
  }
  return { deltaX: 0, deltaY: 0 };
}

/**
 * Independent 4th-Order Runge-Kutta numerical simulator for the 2D harmonic operator system:
 *   dx/dt = 3x + 6y + f1(t)
 *   dy/dt = -3x - 3y + f2(t)
 */
export function operatorSystemsHarmonicRK4(params = {}, options = {}) {
  const duration = requirePositive(options.duration ?? 6, 'duration');
  const samples = Math.max(11, Math.min(1001, Math.floor(options.samples ?? 201)));
  const step = options.step ?? 0.005;

  const analytical = operatorSystemsHarmonicSolution(params);
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

  // Deriv function:
  // dx/dt = 3x + 6y + f1(t)
  // dy/dt = -3x - 3y + f2(t)
  const deriv = (time, curr) => {
    let f1 = 0, f2 = 0;
    if (params.forcing === 'exponential') {
      f2 = 18 * time * Math.exp(-3 * time);
    } else if (params.forcing === 'resonance') {
      f1 = 2 * Math.cos(3 * time);
      f2 = 2 * Math.sin(3 * time);
    }
    return [
      3 * curr[0] + 6 * curr[1] + f1,
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
    system: 'harmonic',
    forcing: params.forcing || 'free',
    points,
    metrics: {
      maxDiffX,
      maxDiffY,
      maxRes1,
      maxRes2,
      finalTime: t,
      degree: 2,
      omega: analytical.omega
    }
  };
}

/**
 * Universal trajectory generator for lab visualizer:
 * Supports presets:
 *   - 'harmonic-free' (Example 7.3)
 *   - 'harmonic-exp'  (Example 7.5)
 *   - 'harmonic-res'  (Example 7.6)
 *   - 'asymmetric'    (Example 7.4)
 *   - 'polynomial'    (Example 7.7)
 */
export function operatorSystemsTrajectory(presetKey = 'harmonic-free', params = {}, options = {}) {
  const duration = requirePositive(options.duration ?? 6, 'duration');
  const samples = Math.max(11, Math.min(1001, Math.floor(options.samples ?? 201)));

  let solver;
  if (presetKey === 'harmonic-free') {
    solver = operatorSystemsHarmonicSolution({ ...params, forcing: 'free' });
  } else if (presetKey === 'harmonic-exp') {
    solver = operatorSystemsHarmonicSolution({ ...params, forcing: 'exponential' });
  } else if (presetKey === 'harmonic-res') {
    solver = operatorSystemsHarmonicSolution({ ...params, forcing: 'resonance' });
  } else if (presetKey === 'asymmetric') {
    solver = operatorSystemsAsymmetricSolution(params);
  } else if (presetKey === 'polynomial') {
    solver = operatorSystemsPolynomialSolution(params);
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
    if (Math.abs(pt.x) > maxX) maxX = Math.abs(pt.x);
    if (Math.abs(pt.y) > maxY) maxY = Math.abs(pt.y);
    const curRes = Math.max(Math.abs(pt.res1), Math.abs(pt.res2));
    if (curRes > maxResidual) maxResidual = curRes;
    points.push(pt);
  }

  return {
    presetKey,
    degree: solver.degree,
    constants: solver.constants,
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
