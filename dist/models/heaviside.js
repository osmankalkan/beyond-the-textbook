/**
 * Pure analytical and numerical model for Section 6.2: The Heaviside Step Function.
 * Zero external dependencies, buildless ES module.
 */

const FAMILIES = [
  'step',          // c * H(t - a)
  'pulse',         // c * [H(t - a) - H(t - b)]
  'delayed-ramp',  // (t - a) * H(t - a)
  'delayed-exp',   // e^(-k(t - a)) * H(t - a)
  'delayed-sin',   // sin(omega*(t - a)) * H(t - a)
  'unmatched-exp', // e^(k*t) * H(t - a)
  'staircase'      // H(t) + H(t - a) + H(t - 2a)
];

function checkFinite(val, name) {
  if (typeof val !== 'number' || !Number.isFinite(val)) {
    throw new RangeError(`${name} must be a finite number`);
  }
}

export function heavisideFamilies() {
  return [...FAMILIES];
}

/**
 * Unit step function: 0 for t < a, 1 for t > a, 0.5 at t = a.
 */
export function heavisideStep(t, a = 0) {
  checkFinite(t, 't');
  checkFinite(a, 'a');
  if (t < a) return 0;
  if (t > a) return 1;
  return 0.5;
}

/**
 * Rectangular pulse window H(t - a) - H(t - b) with a < b.
 */
export function heavisidePulse(t, a, b) {
  checkFinite(t, 't');
  checkFinite(a, 'a');
  checkFinite(b, 'b');
  if (t < a || t > b) return 0;
  if (t === a || t === b) return 0.5;
  return 1;
}

/**
 * Returns the convergence abscissa s0 for a given family and parameter set.
 */
export function heavisideConvergenceAbscissa(family, params = {}) {
  const { k = 1 } = params;
  switch (family) {
    case 'unmatched-exp':
      return k;
    case 'delayed-exp':
      return -k;
    case 'step':
    case 'pulse':
    case 'delayed-ramp':
    case 'delayed-sin':
    case 'staircase':
    default:
      return 0;
  }
}

/**
 * Evaluates the time-domain signal f(t) for the selected family.
 */
export function heavisideTimeFunction(family, t, params = {}) {
  checkFinite(t, 't');
  if (!FAMILIES.includes(family)) {
    throw new RangeError(`Unknown Heaviside family: ${family}`);
  }

  const {
    a = 1.0,
    b = 3.0,
    c = 1.0,
    k = 1.0,
    omega = 2.0
  } = params;

  if (t < 0) return 0;

  switch (family) {
    case 'step':
      return c * (t >= a ? 1 : 0);

    case 'pulse': {
      const right = b > a ? b : a + 1.0;
      return c * (t >= a && t <= right ? 1 : 0);
    }

    case 'delayed-ramp':
      return t >= a ? (t - a) : 0;

    case 'delayed-exp':
      return t >= a ? Math.exp(-k * (t - a)) : 0;

    case 'delayed-sin':
      return t >= a ? Math.sin(omega * (t - a)) : 0;

    case 'unmatched-exp':
      return t >= a ? Math.exp(k * t) : 0;

    case 'staircase': {
      let val = 1; // H(t) for t >= 0
      if (t >= a) val += 1;
      if (t >= 2 * a) val += 1;
      return val;
    }

    default:
      return 0;
  }
}

/**
 * Evaluates the Laplace integrand e^(-st) * f(t).
 */
export function heavisideIntegrand(family, s, t, params = {}) {
  checkFinite(s, 's');
  checkFinite(t, 't');
  return Math.exp(-s * t) * heavisideTimeFunction(family, t, params);
}

/**
 * Evaluates the exact analytical Laplace transform F(s) = L{f(t)}.
 * Returns NaN if s <= s0 (divergent).
 */
export function heavisideExact(family, s, params = {}) {
  checkFinite(s, 's');
  if (!FAMILIES.includes(family)) {
    throw new RangeError(`Unknown Heaviside family: ${family}`);
  }

  const s0 = heavisideConvergenceAbscissa(family, params);
  if (s <= s0) return Number.NaN;

  const {
    a = 1.0,
    b = 3.0,
    c = 1.0,
    k = 1.0,
    omega = 2.0
  } = params;

  switch (family) {
    case 'step':
      // L{c * H(t - a)} = c * e^(-a*s) / s
      return (c * Math.exp(-a * s)) / s;

    case 'pulse': {
      // L{c * [H(t - a) - H(t - b)]} = c * [e^(-a*s) - e^(-b*s)] / s
      const right = b > a ? b : a + 1.0;
      return (c * (Math.exp(-a * s) - Math.exp(-right * s))) / s;
    }

    case 'delayed-ramp':
      // L{(t - a) * H(t - a)} = e^(-a*s) / s^2
      return Math.exp(-a * s) / (s * s);

    case 'delayed-exp':
      // L{e^(-k*(t - a)) * H(t - a)} = e^(-a*s) / (s + k)
      return Math.exp(-a * s) / (s + k);

    case 'delayed-sin':
      // L{sin(omega*(t - a)) * H(t - a)} = omega * e^(-a*s) / (s^2 + omega^2)
      return (omega * Math.exp(-a * s)) / (s * s + omega * omega);

    case 'unmatched-exp':
      // L{e^(k*t) * H(t - a)} = e^(-a*(s - k)) / (s - k)
      return Math.exp(-a * (s - k)) / (s - k);

    case 'staircase':
      // L{H(t) + H(t - a) + H(t - 2a)} = (1 + e^(-as) + e^(-2as)) / s
      return (1 + Math.exp(-a * s) + Math.exp(-2 * a * s)) / s;

    default:
      return Number.NaN;
  }
}

/**
 * Numerical integration of the Laplace integral using composite Simpson's 1/3 rule.
 */
export function heavisideNumericalIntegral(family, s, T, params = {}, intervals = 600) {
  checkFinite(s, 's');
  checkFinite(T, 'T');
  if (T <= 0) throw new RangeError('Horizon T must be positive');

  const nSteps = intervals % 2 === 0 ? intervals : intervals + 1;
  const h = T / nSteps;

  let sum = heavisideIntegrand(family, s, 0, params) + heavisideIntegrand(family, s, T, params);

  for (let i = 1; i < nSteps; i++) {
    const t = i * h;
    const factor = i % 2 === 0 ? 2 : 4;
    sum += factor * heavisideIntegrand(family, s, t, params);
  }

  return (sum * h) / 3;
}

/**
 * Computes live metrics for the workbench display.
 */
export function heavisideMetrics(family, s, T, params = {}) {
  checkFinite(s, 's');
  checkFinite(T, 'T');
  if (T <= 0) throw new RangeError('Horizon T must be positive');

  const s0 = heavisideConvergenceAbscissa(family, params);
  const isConvergent = s > s0;

  const exactValue = heavisideExact(family, s, params);
  const numericalValue = heavisideNumericalIntegral(family, s, T, params);

  let relativeError = Number.NaN;
  if (isConvergent && Number.isFinite(exactValue) && Math.abs(exactValue) > 1e-12) {
    relativeError = Math.abs(numericalValue - exactValue) / Math.abs(exactValue);
  }

  const { a = 1.0 } = params;
  const delayFactor = Math.exp(-a * s);
  const horizonDamping = Math.exp(-s * T);

  return {
    s0,
    isConvergent,
    exactValue,
    numericalValue,
    relativeError,
    delayFactor,
    horizonDamping
  };
}

/**
 * Generates discrete points for plotting time domain curves.
 */
export function heavisideTimeCurves(family, s, T, params = {}, samples = 120) {
  checkFinite(s, 's');
  checkFinite(T, 'T');
  if (T <= 0) throw new RangeError('Horizon T must be positive');

  const dt = T / (samples - 1);
  const fCurve = [];
  const kernelCurve = [];
  const integrandCurve = [];

  for (let i = 0; i < samples; i++) {
    const t = i * dt;
    const fVal = heavisideTimeFunction(family, t, params);
    const kVal = Math.exp(-s * t);
    const iVal = kVal * fVal;

    fCurve.push({ t, value: fVal });
    kernelCurve.push({ t, value: kVal });
    integrandCurve.push({ t, value: iVal });
  }

  return { fCurve, kernelCurve, integrandCurve };
}

/**
 * Generates discrete points for the s-domain frequency spectrum curve.
 */
export function heavisideSpectrumCurve(family, sMin, sMax, params = {}, samples = 60) {
  checkFinite(sMin, 'sMin');
  checkFinite(sMax, 'sMax');
  if (sMin >= sMax) throw new RangeError('sMin must be less than sMax');

  const s0 = heavisideConvergenceAbscissa(family, params);
  const effectiveMin = Math.max(sMin, s0 + 0.05);

  const ds = (sMax - effectiveMin) / (samples - 1);
  const curve = [];

  for (let i = 0; i < samples; i++) {
    const sVal = effectiveMin + i * ds;
    const value = heavisideExact(family, sVal, params);
    if (Number.isFinite(value)) {
      curve.push({ s: sVal, value });
    }
  }

  return { s0, curve };
}
