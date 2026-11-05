/**
 * Pure analytical and numerical model for Section 7.1:
 * Introduction to systems of linear differential equations.
 *
 * Two motivating systems are covered:
 *   - a particle moving in a plane, in rectangular and polar coordinates;
 *   - an n-story shear building, reduced to its two-story matrix form.
 *
 * The module has no runtime dependencies and is safe to import from tests.
 */

const TAU = 2 * Math.PI;

/**
 * Polar coordinates are singular at the origin, so integration stops once
 * the particle gets closer than this radius. A particle that reaches the
 * origin has no well-defined radial direction.
 */
const ORIGIN_GUARD = 1e-4;

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

function requireNonNegative(value, name) {
  requireFinite(value, name);
  if (value < 0) throw new RangeError(`${name} must be non-negative`);
  return value;
}

function neg(value) {
  return value === 0 ? 0 : -value;
}

function rk4Step(fn, t, y, h) {
  const a = fn(t, y);
  const b = fn(t + h / 2, y.map((value, index) => value + h * a[index] / 2));
  const c = fn(t + h / 2, y.map((value, index) => value + h * b[index] / 2));
  const d = fn(t + h, y.map((value, index) => value + h * c[index]));
  return y.map((value, index) => value + h * (a[index] + 2 * b[index] + 2 * c[index] + d[index]) / 6);
}

function sampleCount(duration, step, samples) {
  const steps = Math.max(1, Math.round(duration / step));
  return {steps, every: Math.max(1, Math.round(steps / Math.max(1, samples - 1)))};
}

/**
 * True when the straight segment between two states passes within the origin
 * guard. Sampling only endpoints is not enough: a fast particle can cross the
 * polar singularity between two accepted steps.
 */
function segmentClearsOrigin(from, to) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return Math.hypot(from[0], from[1]) < ORIGIN_GUARD;
  const position = -(from[0] * dx + from[1] * dy) / lengthSquared;
  if (position <= 0 || position >= 1) return false;
  return Math.hypot(from[0] + position * dx, from[1] + position * dy) < ORIGIN_GUARD;
}

/* ------------------------------------------------------------------ */
/* Particle moving in a plane                                          */
/* ------------------------------------------------------------------ */

/**
 * Cartesian acceleration of a particle under a force written in the
 * instantaneous radial/tangential frame:
 *   F = F_r e_r + F_theta e_theta.
 *
 * The radial direction is undefined exactly at the origin. The integrator
 * treats that single singular state as force-free and stops nearby; callers
 * that need polar diagnostics use `systemsParticleDiagnostics`, which rejects
 * the origin explicitly.
 */
export function systemsParticleDerivative(state, params) {
  const [x, y, vx, vy] = state;
  const mass = requirePositive(params.mass, 'mass');
  const radialForce = requireFinite(params.radialForce ?? 0, 'radialForce');
  const tangentialForce = requireFinite(params.tangentialForce ?? 0, 'tangentialForce');
  const radius = Math.hypot(x, y);
  if (radius < 1e-12) return [vx, vy, 0, 0];
  const cos = x / radius;
  const sin = y / radius;
  const ax = (radialForce * cos - tangentialForce * sin) / mass;
  const ay = (radialForce * sin + tangentialForce * cos) / mass;
  return [vx, vy, ax, ay];
}

/**
 * Kinematic diagnostics in polar coordinates. The values a_r and a_theta
 * are reconstructed from the Cartesian state, so they can be compared with
 * the applied force components as a consistency check.
 */
export function systemsParticleDiagnostics(state, params) {
  const [x, y, vx, vy] = state;
  const radius = Math.hypot(x, y);
  if (radius < 1e-12) throw new RangeError('particle position must not coincide with the origin');
  const theta = Math.atan2(y, x);
  const radialVelocity = (x * vx + y * vy) / radius;
  const angularVelocity = (x * vy - y * vx) / (radius * radius);
  const [, , ax, ay] = systemsParticleDerivative(state, params);
  const radialAcceleration =
    (vx * vx + vy * vy + x * ax + y * ay - radialVelocity * radialVelocity) / radius;
  const angularMomentum = x * vy - y * vx;
  const angularAcceleration =
    (x * ay - y * ax) / (radius * radius) -
    (2 * radialVelocity * angularMomentum) / (radius * radius * radius);
  const ar = radialAcceleration - radius * angularVelocity * angularVelocity;
  const atheta = 2 * radialVelocity * angularVelocity + radius * angularAcceleration;
  return {
    x, y, radius, theta,
    radialVelocity, angularVelocity,
    radialAcceleration, angularAcceleration,
    ar, atheta
  };
}

/**
 * Integrates the Cartesian equations of motion and samples the polar
 * diagnostics along the trajectory.
 */
export function systemsParticleTrajectory(params, options = {}) {
  const mass = requirePositive(params.mass, 'mass');
  const radialForce = requireFinite(params.radialForce ?? 0, 'radialForce');
  const tangentialForce = requireFinite(params.tangentialForce ?? 0, 'tangentialForce');
  const radius = requirePositive(params.radius, 'radius');
  if (radius < 1e-9) throw new RangeError('radius must clear the polar singularity at the origin');
  const angularSpeed = requireFinite(params.angularSpeed ?? 0, 'angularSpeed');
  const duration = requirePositive(options.duration ?? 12, 'duration');
  const step = requirePositive(options.step ?? 0.01, 'step');
  const samples = Math.max(2, Math.round(options.samples ?? 241));
  const {steps, every} = sampleCount(duration, step, samples);
  const config = {mass, radialForce, tangentialForce};
  let state = [radius, 0, 0, radius * angularSpeed];
  let previousRawTheta = 0;
  let unwrappedTheta = 0;
  let reachedOrigin = false;
  const points = [];

  for (let index = 0; index <= steps; index += 1) {
    const t = index * step;
    const currentRadius = Math.hypot(state[0], state[1]);
    const nearOrigin = index > 0 && currentRadius < ORIGIN_GUARD;
    if (nearOrigin) reachedOrigin = true;
    if (nearOrigin && currentRadius < 1e-9) break;
    if (nearOrigin || index % every === 0 || index === steps) {
      const diagnostics = systemsParticleDiagnostics(state, config);
      let delta = diagnostics.theta - previousRawTheta;
      if (delta > Math.PI) delta -= TAU;
      if (delta < -Math.PI) delta += TAU;
      unwrappedTheta += delta;
      previousRawTheta = diagnostics.theta;
      points.push({
        t,
        x: state[0],
        y: state[1],
        vx: state[2],
        vy: state[3],
        radius: diagnostics.radius,
        theta: unwrappedTheta,
        radialVelocity: diagnostics.radialVelocity,
        angularVelocity: diagnostics.angularVelocity,
        radialAcceleration: diagnostics.radialAcceleration,
        angularAcceleration: diagnostics.angularAcceleration,
        ar: diagnostics.ar,
        atheta: diagnostics.atheta,
        speed: Math.hypot(state[2], state[3])
      });
    }
    if (nearOrigin || index === steps) break;
    const next = rk4Step((time, value) => systemsParticleDerivative(value, config), t, state, step);
    if (segmentClearsOrigin(state, next)) {
      reachedOrigin = true;
      break;
    }
    state = next;
  }

  const first = points[0];
  const last = points[points.length - 1];
  const radii = points.map(point => point.radius);
  return {
    points,
    metrics: {
      mass,
      radialForce,
      tangentialForce,
      initialRadius: radius,
      initialAngularSpeed: angularSpeed,
      finalRadius: last.radius,
      finalTheta: last.theta,
      finalTime: last.t,
      reachedOrigin,
      finalSpeed: last.speed,
      maxRadius: Math.max(...radii),
      minRadius: Math.min(...radii),
      maxSpeed: Math.max(...points.map(point => point.speed)),
      circularRadialForce: -mass * radius * angularSpeed * angularSpeed,
      forceResidualR: last.ar - radialForce / mass,
      forceResidualTheta: last.atheta - tangentialForce / mass,
      first
    }
  };
}

/* ------------------------------------------------------------------ */
/* Two-story shear building                                            */
/* ------------------------------------------------------------------ */

export function systemsShearMatrices(params) {
  const m1 = requirePositive(params.m1, 'm1');
  const m2 = requirePositive(params.m2, 'm2');
  const k1 = requirePositive(params.k1, 'k1');
  const k2 = requirePositive(params.k2, 'k2');
  const c1 = requireNonNegative(params.c1 ?? 0, 'c1');
  const c2 = requireNonNegative(params.c2 ?? 0, 'c2');
  return {
    M: [[m1, 0], [0, m2]],
    C: [[c1 + c2, neg(c2)], [neg(c2), c2]],
    K: [[k1 + k2, neg(k2)], [neg(k2), k2]]
  };
}

/** Static equilibrium K x_s = F_s for a two-story shear building. */
export function systemsShearStatic(params) {
  const k1 = requirePositive(params.k1, 'k1');
  const k2 = requirePositive(params.k2, 'k2');
  const F1 = requireFinite(params.F1 ?? 0, 'F1');
  const F2 = requireFinite(params.F2 ?? 0, 'F2');
  const total = F1 + F2;
  return {
    x1: total / k1,
    x2: total / k1 + F2 / k2
  };
}

/** Natural frequencies of the undamped two-story shear building. */
export function systemsShearFrequencies(params) {
  const m1 = requirePositive(params.m1, 'm1');
  const m2 = requirePositive(params.m2, 'm2');
  const k1 = requirePositive(params.k1, 'k1');
  const k2 = requirePositive(params.k2, 'k2');
  const a = m1 * m2;
  const b = -((k1 + k2) * m2 + k2 * m1);
  const c = k1 * k2;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) throw new RangeError('the stiffness matrix must be positive semidefinite');
  const root = Math.sqrt(Math.max(0, discriminant));
  const lambda1 = (-b - root) / (2 * a);
  const lambda2 = (-b + root) / (2 * a);
  const low = Math.max(0, Math.min(lambda1, lambda2));
  const high = Math.max(0, Math.max(lambda1, lambda2));
  return {
    lambda1: low,
    lambda2: high,
    omega1: Math.sqrt(low),
    omega2: Math.sqrt(high)
  };
}

/**
 * Mode shapes from (K - lambda M) phi = 0. The returned shape is scaled so
 * that its largest absolute component is one; `ratio` keeps the unnormalized
 * second-to-first floor ratio.
 */
export function systemsShearModeShapes(params) {
  const m1 = requirePositive(params.m1, 'm1');
  const k1 = requirePositive(params.k1, 'k1');
  const k2 = requirePositive(params.k2, 'k2');
  const frequencies = systemsShearFrequencies(params);
  const build = (lambda, omega) => {
    const ratio = (k1 + k2 - lambda * m1) / k2;
    const scale = Math.max(1, Math.abs(ratio));
    return {
      omega,
      lambda,
      ratio,
      raw: [1, ratio],
      shape: [1 / scale, ratio / scale]
    };
  };
  return [
    build(frequencies.lambda1, frequencies.omega1),
    build(frequencies.lambda2, frequencies.omega2)
  ];
}

/** First-order state matrix A for y = [x1, x2, v1, v2]. */
export function systemsShearStateMatrix(params) {
  const m1 = requirePositive(params.m1, 'm1');
  const m2 = requirePositive(params.m2, 'm2');
  const k1 = requirePositive(params.k1, 'k1');
  const k2 = requirePositive(params.k2, 'k2');
  const c1 = requireNonNegative(params.c1 ?? 0, 'c1');
  const c2 = requireNonNegative(params.c2 ?? 0, 'c2');
  return [
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [-(k1 + k2) / m1, k2 / m1, -(c1 + c2) / m1, c2 / m1],
    [k2 / m2, neg(k2 / m2), c2 / m2, neg(c2 / m2)]
  ];
}

/** State derivative for y = [x1, x2, v1, v2]. */
export function systemsShearDerivative(state, params) {
  const [x1, x2, v1, v2] = state;
  const m1 = requirePositive(params.m1, 'm1');
  const m2 = requirePositive(params.m2, 'm2');
  const k1 = requirePositive(params.k1, 'k1');
  const k2 = requirePositive(params.k2, 'k2');
  const c1 = requireNonNegative(params.c1 ?? 0, 'c1');
  const c2 = requireNonNegative(params.c2 ?? 0, 'c2');
  const F1 = requireFinite(params.F1 ?? 0, 'F1');
  const F2 = requireFinite(params.F2 ?? 0, 'F2');
  const force1 = F1 - ((c1 + c2) * v1 - c2 * v2) - ((k1 + k2) * x1 - k2 * x2);
  const force2 = F2 - (-c2 * v1 + c2 * v2) - (-k2 * x1 + k2 * x2);
  return [v1, v2, force1 / m1, force2 / m2];
}

/**
 * Integrates the four-state shear-building model with RK4 and returns the
 * floor displacement history, static equilibrium and modal data.
 */
export function systemsShearResponse(params, options = {}) {
  const m1 = requirePositive(params.m1, 'm1');
  const m2 = requirePositive(params.m2, 'm2');
  const k1 = requirePositive(params.k1, 'k1');
  const k2 = requirePositive(params.k2, 'k2');
  const c1 = requireNonNegative(params.c1 ?? 0, 'c1');
  const c2 = requireNonNegative(params.c2 ?? 0, 'c2');
  const F1 = requireFinite(params.F1 ?? 0, 'F1');
  const F2 = requireFinite(params.F2 ?? 0, 'F2');
  const x10 = requireFinite(params.x10 ?? 0, 'x10');
  const x20 = requireFinite(params.x20 ?? 0, 'x20');
  const v10 = requireFinite(params.v10 ?? 0, 'v10');
  const v20 = requireFinite(params.v20 ?? 0, 'v20');
  const duration = requirePositive(options.duration ?? 20, 'duration');
  const step = requirePositive(options.step ?? 0.01, 'step');
  const samples = Math.max(2, Math.round(options.samples ?? 401));
  const {steps, every} = sampleCount(duration, step, samples);
  const config = {m1, m2, k1, k2, c1, c2, F1, F2};
  let state = [x10, x20, v10, v20];
  const points = [];

  for (let index = 0; index <= steps; index += 1) {
    const t = index * step;
    if (index % every === 0 || index === steps) {
      points.push({t, x1: state[0], x2: state[1], v1: state[2], v2: state[3]});
    }
    if (index < steps) state = rk4Step((time, value) => systemsShearDerivative(value, config), t, state, step);
  }

  const staticSolution = systemsShearStatic({k1, k2, F1, F2});
  const frequencies = systemsShearFrequencies({m1, m2, k1, k2});
  const modes = systemsShearModeShapes({m1, m2, k1, k2});
  const maxX1 = Math.max(...points.map(point => Math.abs(point.x1)));
  const maxX2 = Math.max(...points.map(point => Math.abs(point.x2)));
  return {
    points,
    static: staticSolution,
    frequencies,
    modes,
    metrics: {
      maxX1,
      maxX2,
      staticX1: staticSolution.x1,
      staticX2: staticSolution.x2,
      omega1: frequencies.omega1,
      omega2: frequencies.omega2,
      stateDimension: 4,
      stateMatrix: systemsShearStateMatrix({m1, m2, k1, k2, c1, c2})
    }
  };
}
