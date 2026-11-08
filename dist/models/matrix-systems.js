/**
 * Pure analytical and numerical model for Section 7.4:
 * The Matrix Method for Systems of Linear Differential Equations.
 *
 * Covers:
 *   - Transformation of differential systems into dx/dt = A x + f(t);
 *   - Complementary solution via characteristic roots det(A - λI) = 0;
 *   - Case 1: Distinct real eigenvalues and straight-line eigen-rays;
 *   - Case 2: Complex conjugate eigenvalues and Euler's formula spiral trajectories;
 *   - Case 3: Repeated eigenvalues and defective matrices with generalized eigenvectors;
 *   - Case 4: Non-standard forcing via fundamental matrix inverse and variation of parameters;
 *   - Case 5: Multi-DOF modal decoupling (M d2x/dt2 + K x = 0);
 *   - Exact ODE residual verification: E(t) = dx/dt - A x - f(t) === 0;
 *   - Independent 4th-order Runge-Kutta (RK4) numerical integration.
 *
 * Zero runtime dependencies, safe for Node.js and browser environments.
 */

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
 * Case 1 / Example 7.14: Distinct Real Eigenvalues (Saddle Point)
 *   dx1/dt =  x1 + 4x2
 *   dx2/dt =  x1 - 2x2
 * Matrix: A = [[1, 4], [1, -2]]
 * Characteristic: det(A - λI) = λ^2 + λ - 6 = (λ + 3)(λ - 2) = 0
 * Eigenvalues: λ1 = -3 (stable ray), λ2 = +2 (unstable ray)
 * Eigenvectors: v1 = [1, -1]^T, v2 = [4, 1]^T
 */
export function matrixSystemsDistinctReal(params = {}) {
  const x10 = requireFinite(params.x10 ?? params.x1_0 ?? 1, 'x10');
  const x20 = requireFinite(params.x20 ?? params.x2_0 ?? 2, 'x20');

  // Determine C1 and C2 from x(0) = C1*v1 + C2*v2:
  // x10 = C1 + 4*C2
  // x20 = -C1 + C2
  // Adding: x10 + x20 = 5*C2 => C2 = (x10 + x20) / 5
  // C1 = x10 - 4*C2 = (x10 - 4*x20) / 5
  const C2 = (x10 + x20) / 5;
  const C1 = (x10 - 4 * x20) / 5;

  function evaluate(t) {
    const eNeg3t = Math.exp(-3 * t);
    const ePos2t = Math.exp(2 * t);

    const x1 = C1 * eNeg3t + 4 * C2 * ePos2t;
    const x2 = -C1 * eNeg3t + C2 * ePos2t;

    const dx1 = -3 * C1 * eNeg3t + 8 * C2 * ePos2t;
    const dx2 = 3 * C1 * eNeg3t + 2 * C2 * ePos2t;

    // Residual: dx - A*x
    // dx1 - (x1 + 4x2)
    // dx2 - (x1 - 2x2)
    const res1 = dx1 - (x1 + 4 * x2);
    const res2 = dx2 - (x1 - 2 * x2);

    return {
      t,
      x1,
      x2,
      dx1,
      dx2,
      f1: 0,
      f2: 0,
      res1,
      res2
    };
  }

  return {
    system: 'distinct-real',
    classification: 'saddle',
    matrix: [[1, 4], [1, -2]],
    eigenvalues: [-3, 2],
    eigenvectors: [[1, -1], [4, 1]],
    constants: { C1, C2 },
    evaluate
  };
}

/**
 * Case 2 / Example 7.15: Complex Conjugate Eigenvalues (Stable Spiral / Focus)
 *   dx1/dt = -x1 + 5x2
 *   dx2/dt = -4x1 - 5x2
 * Matrix: A = [[-1, 5], [-4, -5]]
 * Characteristic: λ^2 + 6λ + 25 = 0 => λ = -3 ± 4i
 * Real/Imag parts: α = -3, β = 4
 * Eigenvector for λ = -3 + 4i: v = [5, -2 + 4i]^T = [5, -2]^T + i[0, 4]^T
 */
export function matrixSystemsComplexSpiral(params = {}) {
  const x10 = requireFinite(params.x10 ?? params.x1_0 ?? 5, 'x10');
  const x20 = requireFinite(params.x20 ?? params.x2_0 ?? 2, 'x20');

  // Solution form:
  // x1(t) = 5 * e^(-3t) * (A*cos 4t + B*sin 4t)
  // x2(t) = e^(-3t) * [ (-2A + 4B)*cos 4t + (-4A - 2B)*sin 4t ]
  // At t = 0:
  // x10 = 5*A => A = x10 / 5
  // x20 = -2*A + 4*B => 4*B = x20 + 2*A => B = (x20 + 2*x10/5) / 4
  const A = x10 / 5;
  const B = (x20 + 2 * A) / 4;

  function evaluate(t) {
    const eNeg3t = Math.exp(-3 * t);
    const c4t = Math.cos(4 * t);
    const s4t = Math.sin(4 * t);

    const x1 = 5 * eNeg3t * (A * c4t + B * s4t);
    const x2 = eNeg3t * ((-2 * A + 4 * B) * c4t + (-4 * A - 2 * B) * s4t);

    // Analytical derivatives
    const dx1 = -3 * x1 + 5 * eNeg3t * (-4 * A * s4t + 4 * B * c4t);
    const dx2 = -3 * x2 + eNeg3t * (-4 * (-2 * A + 4 * B) * s4t + 4 * (-4 * A - 2 * B) * c4t);

    const res1 = dx1 - (-x1 + 5 * x2);
    const res2 = dx2 - (-4 * x1 - 5 * x2);

    return {
      t,
      x1,
      x2,
      dx1,
      dx2,
      f1: 0,
      f2: 0,
      res1,
      res2
    };
  }

  return {
    system: 'complex-spiral',
    classification: 'stable-focus',
    matrix: [[-1, 5], [-4, -5]],
    eigenvalues: ['-3+4i', '-3-4i'],
    alpha: -3,
    beta: 4,
    constants: { A, B },
    evaluate
  };
}

/**
 * Case 3 / Example 7.18: Repeated Eigenvalue with Defective Matrix & Forcing
 *   dx1/dt = -3x1 - 4x2 + 2*e^(-t)
 *   dx2/dt =   x1 +   x2
 * Matrix: A = [[-3, -4], [1, 1]]
 * Characteristic: λ^2 + 2λ + 1 = (λ + 1)^2 = 0 => λ = -1 (mult 2)
 * Eigenvector v1 = [2, -1]^T
 * Generalized eigenvector v2 = [1, -1]^T satisfying (A - λI)v2 = v1
 * Forcing f(t) = [2*e^(-t), 0]^T
 * General solution via variation of parameters:
 *   x1(t) = e^(-t) * [ -2t^2 + 2(C2 + 1)t + (2C1 + C2) ]
 *   x2(t) = e^(-t) * [  t^2 - C2*t - (C1 + C2) ]
 */
export function matrixSystemsDefectiveShear(params = {}) {
  const x10 = requireFinite(params.x10 ?? params.x1_0 ?? 2, 'x10');
  const x20 = requireFinite(params.x20 ?? params.x2_0 ?? -1, 'x20');
  const forcing = params.forcing !== false;

  // At t = 0:
  // x10 = 2*C1 + C2
  // x20 = -C1 - C2
  // Adding: C1 = x10 + x20
  // C2 = -x20 - C1 = -x10 - 2*x20
  const C1 = x10 + x20;
  const C2 = -x10 - 2 * x20;

  function evaluate(t) {
    const et = Math.exp(-t);
    const f1 = forcing ? 2 * et : 0;
    const f2 = 0;

    let x1, x2, dx1, dx2;

    if (forcing) {
      // Full forced solution
      x1 = et * (-2 * t * t + 2 * (C2 + 1) * t + (2 * C1 + C2));
      x2 = et * (t * t - C2 * t - (C1 + C2));

      dx1 = -x1 + et * (-4 * t + 2 * (C2 + 1));
      dx2 = -x2 + et * (2 * t - C2);
    } else {
      // Homogeneous ZIR only
      x1 = et * (2 * C2 * t + (2 * C1 + C2));
      x2 = et * (-C2 * t - (C1 + C2));

      dx1 = -x1 + et * (2 * C2);
      dx2 = -x2 + et * (-C2);
    }

    const res1 = dx1 - (-3 * x1 - 4 * x2 + f1);
    const res2 = dx2 - (x1 + x2 + f2);

    return {
      t,
      x1,
      x2,
      dx1,
      dx2,
      f1,
      f2,
      res1,
      res2
    };
  }

  return {
    system: 'defective-shear',
    classification: 'degenerate-node',
    matrix: [[-3, -4], [1, 1]],
    eigenvalues: [-1, -1],
    eigenvector: [2, -1],
    generalizedEigenvector: [1, -1],
    constants: { C1, C2 },
    evaluate
  };
}

/**
 * Case 4 / Example 7.19: Harmonic Center with Secant Forcing (Variation of Parameters)
 *   dx1/dt =  x1 - x2 + sec(t)
 *   dx2/dt = 2x1 - x2
 * Matrix: A = [[1, -1], [2, -1]]
 * Characteristic: λ^2 + 1 = 0 => λ = ±i
 * Fundamental Matrix: X(t) = [[cos t, sin t], [cos t + sin t, sin t - cos t]]
 * Solution:
 *   x1(t) = (C1 + t)*cos t + (C2 + t)*sin t + (cos t - sin t)*ln|cos t|
 *   x2(t) = (C1 - C2)*cos t + (C1 + C2 + 2t)*sin t + 2*cos t * ln|cos t|
 */
export function matrixSystemsSecantForcing(params = {}) {
  const x10 = requireFinite(params.x10 ?? params.x1_0 ?? 1, 'x10');
  const x20 = requireFinite(params.x20 ?? params.x2_0 ?? 1, 'x20');

  // At t = 0: cos(0)=1, sin(0)=0, ln|cos 0|=0
  // x1(0) = C1 => C1 = x10
  // x2(0) = C1 - C2 => C2 = C1 - x20 = x10 - x20
  const C1 = x10;
  const C2 = x10 - x20;

  function evaluate(t) {
    const ct = Math.cos(t);
    const st = Math.sin(t);
    const secT = 1 / (Math.abs(ct) > 1e-12 ? ct : 1e-12);
    const lnCos = Math.log(Math.abs(ct) > 1e-12 ? Math.abs(ct) : 1e-12);
    const tanT = st * secT;

    const x1 = (C1 + t) * ct + (C2 + t) * st + (ct - st) * lnCos;
    const x2 = (C1 - C2) * ct + (C1 + C2 + 2 * t) * st + 2 * ct * lnCos;

    // Derivatives using product and chain rules:
    // d/dt[(C1+t)cos t] = cos t - (C1+t)sin t
    // d/dt[(C2+t)sin t] = sin t + (C2+t)cos t
    // d/dt[(cos t - sin t)ln|cos t|] = (-sin t - cos t)ln|cos t| + (cos t - sin t)*(-tan t)
    // (-sin t - cos t)ln|cos t| - sin t + sin^2 t / cos t
    const dx1 = ct - (C1 + t) * st + st + (C2 + t) * ct + (-st - ct) * lnCos + (ct - st) * (-tanT);
    const dx2 = -(C1 - C2) * st + 2 * st + (C1 + C2 + 2 * t) * ct - 2 * st * lnCos + 2 * ct * (-tanT);

    const f1 = secT;
    const f2 = 0;

    const res1 = dx1 - (x1 - x2 + f1);
    const res2 = dx2 - (2 * x1 - x2);

    return {
      t,
      x1,
      x2,
      dx1,
      dx2,
      f1,
      f2,
      res1,
      res2
    };
  }

  return {
    system: 'secant-forcing',
    classification: 'center',
    matrix: [[1, -1], [2, -1]],
    eigenvalues: ['+i', '-i'],
    constants: { C1, C2 },
    evaluate
  };
}

/**
 * Case 5 / Structural Dynamics: Undamped 2-Story Shear Building Modal Decoupling
 *   M d2x/dt2 + K x = 0
 * Let m1 = 1, m2 = 1, k1 = 6, k2 = 4
 * Mass: M = [[1, 0], [0, 1]]
 * Stiffness: K = [[k1+k2, -k2], [-k2, k2]] = [[10, -4], [-4, 4]]
 * Frequency equation: det(K - ω^2 M) = (10 - ω^2)(4 - ω^2) - 16 = ω^4 - 14ω^2 + 24 = 0
 *   (ω^2 - 2)(ω^2 - 12) = 0
 * Natural frequencies:
 *   ω1 = sqrt(2) ≈ 1.414 rad/s (in-phase fundamental mode)
 *   ω2 = sqrt(12) ≈ 3.464 rad/s (out-of-phase higher mode)
 * Mode shapes:
 *   Mode 1: (10 - 2)x1 - 4x2 = 0 => 8x1 = 4x2 => v1 = [1, 2]^T (normalized: [1/sqrt(5), 2/sqrt(5)])
 *   Mode 2: (10 - 12)x1 - 4x2 = 0 => -2x1 = 4x2 => v2 = [2, -1]^T (normalized: [2/sqrt(5), -1/sqrt(5)])
 */
export function matrixSystemsModalDecoupled(params = {}) {
  const x10 = requireFinite(params.x10 ?? params.x1_0 ?? 1, 'x10');
  const x20 = requireFinite(params.x20 ?? params.x2_0 ?? 1, 'x20');

  const w1 = Math.sqrt(2);
  const w2 = Math.sqrt(12);

  // Orthonormal modal transformation: x = Phi * q
  // Phi = [[1/sqrt(5), 2/sqrt(5)], [2/sqrt(5), -1/sqrt(5)]]
  // Since Phi^T * M * Phi = I, q(0) = Phi^T * M * x(0) = Phi^T * x(0)
  const invSqrt5 = 1 / Math.sqrt(5);
  const q10 = invSqrt5 * (x10 + 2 * x20);
  const q20 = invSqrt5 * (2 * x10 - x20);

  function evaluate(t) {
    const q1 = q10 * Math.cos(w1 * t);
    const q2 = q20 * Math.cos(w2 * t);

    const dq1 = -w1 * q10 * Math.sin(w1 * t);
    const dq2 = -w2 * q20 * Math.sin(w2 * t);

    const d2q1 = -w1 * w1 * q1;
    const d2q2 = -w2 * w2 * q2;

    const x1 = invSqrt5 * (q1 + 2 * q2);
    const x2 = invSqrt5 * (2 * q1 - q2);

    const dx1 = invSqrt5 * (dq1 + 2 * dq2);
    const dx2 = invSqrt5 * (2 * dq1 - dq2);

    const d2x1 = invSqrt5 * (d2q1 + 2 * d2q2);
    const d2x2 = invSqrt5 * (2 * d2q1 - d2q2);

    // M*d2x + K*x = 0
    // Eq1: 1*d2x1 + 10*x1 - 4*x2 = 0
    // Eq2: 1*d2x2 - 4*x1 + 4*x2 = 0
    const res1 = d2x1 + 10 * x1 - 4 * x2;
    const res2 = d2x2 - 4 * x1 + 4 * x2;

    return {
      t,
      x1,
      x2,
      dx1,
      dx2,
      d2x1,
      d2x2,
      q1,
      q2,
      res1,
      res2
    };
  }

  return {
    system: 'modal-decoupling',
    classification: 'harmonic-modes',
    w1,
    w2,
    modeShapes: [[1, 2], [2, -1]],
    initialModal: { q10, q20 },
    evaluate
  };
}

/**
 * Independent 4th-order Runge-Kutta simulator for Example 7.14:
 *   dx1/dt =  x1 + 4x2
 *   dx2/dt =  x1 - 2x2
 */
export function matrixSystemsRK4(params = {}, options = {}) {
  const duration = requirePositive(options.duration ?? 6, 'duration');
  const samples = Math.max(11, Math.min(1001, Math.floor(options.samples ?? 201)));
  const step = options.step ?? 0.005;

  const analytical = matrixSystemsDistinctReal(params);
  const initial = analytical.evaluate(0);

  let state = [initial.x1, initial.x2];
  let t = 0;
  const dt = step;
  const numSteps = Math.ceil(duration / dt);

  const points = [];
  const sampleInterval = Math.max(1, Math.floor(numSteps / (samples - 1)));

  let maxDiff1 = 0;
  let maxDiff2 = 0;
  let maxRes1 = 0;
  let maxRes2 = 0;

  const deriv = (time, curr) => [
    curr[0] + 4 * curr[1],
    curr[0] - 2 * curr[1]
  ];

  points.push({
    t: 0,
    x1: state[0],
    x2: state[1],
    diff1: 0,
    diff2: 0
  });

  for (let s = 1; s <= numSteps; s++) {
    state = rk4Step(deriv, t, state, dt);
    t += dt;

    const exact = analytical.evaluate(t);
    const diff1 = Math.abs(state[0] - exact.x1);
    const diff2 = Math.abs(state[1] - exact.x2);
    if (diff1 > maxDiff1) maxDiff1 = diff1;
    if (diff2 > maxDiff2) maxDiff2 = diff2;
    if (Math.abs(exact.res1) > maxRes1) maxRes1 = Math.abs(exact.res1);
    if (Math.abs(exact.res2) > maxRes2) maxRes2 = Math.abs(exact.res2);

    if (s % sampleInterval === 0 || s === numSteps) {
      points.push({
        t,
        x1: state[0],
        x2: state[1],
        exactX1: exact.x1,
        exactX2: exact.x2,
        diff1,
        diff2
      });
    }
  }

  return {
    system: 'distinct-real-rk4',
    points,
    metrics: {
      maxDiff1,
      maxDiff2,
      maxRes1,
      maxRes2,
      finalTime: t
    }
  };
}

/**
 * Universal trajectory generator for matrix systems lab visualizer:
 * Presets:
 *   - 'distinct-real' (Example 7.14)
 *   - 'complex-spiral' (Example 7.15)
 *   - 'defective-shear' (Example 7.18)
 *   - 'secant-forcing' (Example 7.19)
 *   - 'modal-decoupling' (2-DOF Building)
 */
export function matrixSystemsTrajectory(presetKeyOrConfig = 'distinct-real', params = {}, options = {}) {
  let presetKey = presetKeyOrConfig;
  if (typeof presetKeyOrConfig === 'object' && presetKeyOrConfig !== null) {
    presetKey = presetKeyOrConfig.preset ?? presetKeyOrConfig.presetKey ?? 'distinct-real';
    params = presetKeyOrConfig.params ?? presetKeyOrConfig;
    options = presetKeyOrConfig.options ?? presetKeyOrConfig;
  }
  const duration = requirePositive(options.duration ?? options.tMax ?? 6, 'duration');
  const samples = Math.max(11, Math.min(1001, Math.floor(options.samples ?? options.numPoints ?? 201)));

  let solver;
  if (presetKey === 'distinct-real') {
    solver = matrixSystemsDistinctReal(params);
  } else if (presetKey === 'complex-spiral') {
    solver = matrixSystemsComplexSpiral(params);
  } else if (presetKey === 'defective-shear') {
    solver = matrixSystemsDefectiveShear(params);
  } else if (presetKey === 'secant-forcing') {
    solver = matrixSystemsSecantForcing(params);
  } else if (presetKey === 'modal-decoupling') {
    solver = matrixSystemsModalDecoupled(params);
  } else {
    throw new RangeError(`Unknown presetKey: ${presetKey}`);
  }

  const points = [];
  const dt = duration / (samples - 1);
  let maxX1 = 0;
  let maxX2 = 0;
  let maxResidual = 0;

  for (let i = 0; i < samples; i++) {
    const t = i * dt;
    const pt = solver.evaluate(t);

    if (Math.abs(pt.x1) > maxX1) maxX1 = Math.abs(pt.x1);
    if (Math.abs(pt.x2) > maxX2) maxX2 = Math.abs(pt.x2);
    const curRes = Math.max(Math.abs(pt.res1), Math.abs(pt.res2));
    if (curRes > maxResidual) maxResidual = curRes;

    points.push({
      t,
      x1: pt.x1,
      x2: pt.x2,
      dx1: pt.dx1,
      dx2: pt.dx2,
      res1: pt.res1,
      res2: pt.res2
    });
  }

  return {
    presetKey,
    classification: solver.classification,
    matrix: solver.matrix,
    eigenvalues: solver.eigenvalues,
    points,
    metrics: {
      maxX1,
      maxX2,
      maxResidual,
      duration,
      sampleCount: points.length
    }
  };
}
