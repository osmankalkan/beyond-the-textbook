/**
 * Dirac Delta and Impulse Functions mathematical model (§6.3)
 * Pure functions: approximations, sifting property, Laplace transforms, and beam/momentum idealizations.
 */

export const DIRAC_FAMILIES = [
  'rect-pulse',
  'gaussian-pulse',
  'sifting-test',
  'modulated-impulse',
  'multi-impulse',
  'collision-momentum',
  'beam-point-load'
];

export function diracFamilies() {
  return [...DIRAC_FAMILIES];
}

/**
 * Rectangular impulse pulse: width eps, area I, centered or starting at a.
 * f_eps(t) = (I / eps) * [H(t - a) - H(t - (a + eps))]
 */
export function diracPulseRect(t, a, eps, I = 1) {
  if (eps <= 0) throw new RangeError('Pulse width epsilon must be positive');
  if (t < a) return 0;
  if (t > a + eps) return 0;
  if (t === a || t === a + eps) return (0.5 * I) / eps;
  return I / eps;
}

/**
 * Normalized Gaussian approximation of delta function: area I, standard deviation sigma.
 * g_sigma(t) = (I / (sigma * sqrt(2*pi))) * exp(-(t - a)^2 / (2*sigma^2))
 */
export function diracGaussian(t, a, sigma, I = 1) {
  if (sigma <= 0) throw new RangeError('Gaussian width sigma must be positive');
  const z = (t - a) / sigma;
  return (I / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}

/**
 * Analytical Laplace transform of idealized Dirac delta combinations.
 * L{delta(t - a)} = e^(-as) for a >= 0; 0 for a < 0 (unilateral).
 */
export function diracLaplaceExact(family, s, params = {}) {
  if (!Number.isFinite(s)) throw new RangeError('s must be finite');
  const a = params.a ?? 1;
  const I = params.I ?? 1;

  switch (family) {
    case 'rect-pulse': {
      const eps = params.eps ?? 0.1;
      if (eps <= 0) throw new RangeError('eps must be positive');
      if (Math.abs(s) < 1e-12) return I;
      return (I / (eps * s)) * (Math.exp(-a * s) - Math.exp(-(a + eps) * s));
    }
    case 'gaussian-pulse': {
      // Approximate transform L{g(t)} ~ I * e^(-as) * exp(s^2 sigma^2 / 2) for moderate s
      const sigma = params.sigma ?? 0.05;
      return I * Math.exp(-a * s) * Math.exp(0.5 * s * s * sigma * sigma);
    }
    case 'sifting-test': {
      // Test function g(t) = e^(-k*t) * cos(omega*t) sampled at t = a
      const k = params.k ?? 0.5;
      const omega = params.omega ?? 2.0;
      const g_a = Math.exp(-k * a) * Math.cos(omega * a);
      return a >= 0 ? g_a * Math.exp(-a * s) : 0;
    }
    case 'modulated-impulse': {
      // L{g(t) * delta(t - a)} = g(a) * e^(-as)
      const c = params.c ?? 2.5;
      return a >= 0 ? c * Math.exp(-a * s) : 0;
    }
    case 'multi-impulse': {
      // Example 6.10: c1 * delta(t + 1) + c2 * delta(t - a1) + c3 * delta(t - a2)
      // Note: delta(t + 1) has zero unilateral transform
      const c2 = params.c2 ?? 1.0;
      const a2 = params.a2 ?? 2.0;
      const c3 = params.c3 ?? 14.0 * Math.exp(12);
      const a3 = params.a3 ?? 3.0;
      return c2 * Math.exp(-a2 * s) + c3 * Math.exp(-a3 * s);
    }
    case 'collision-momentum': {
      // Force pulse F(s) = I * e^(-as)
      return I * Math.exp(-a * s);
    }
    case 'beam-point-load': {
      // Distributed load intensity W * delta(x - a) -> W * e^(-as)
      const W = params.W ?? 10.0;
      return W * Math.exp(-a * s);
    }
    default:
      throw new RangeError(`Unknown Dirac family: ${family}`);
  }
}

/**
 * Numerical integration of a test function multiplied by a finite rectangular impulse.
 * As eps -> 0, this approaches g(a).
 */
export function diracNumericalSifting(gFn, a, eps, nSteps = 200) {
  if (eps <= 0) throw new RangeError('eps must be positive');
  const h = eps / nSteps;
  let sum = 0.5 * (gFn(a) + gFn(a + eps));
  for (let i = 1; i < nSteps; i++) {
    sum += gFn(a + i * h);
  }
  return (sum * h) / eps; // Area normalized by eps
}

/**
 * Metric summary for the active Dirac configuration.
 */
export function diracMetrics(family, s, params = {}) {
  const a = params.a ?? 1.0;
  const eps = params.eps ?? 0.1;
  const I = params.I ?? 1.0;

  const exactIdeal = I * (a >= 0 ? Math.exp(-a * s) : 0);
  const finitePulseVal = diracLaplaceExact('rect-pulse', s, { a, eps, I });
  const relativeDiff = exactIdeal !== 0 ? Math.abs(finitePulseVal - exactIdeal) / Math.abs(exactIdeal) : Math.abs(finitePulseVal);

  return {
    a,
    eps,
    impulse: I,
    peakHeight: I / eps,
    exactIdealTransform: exactIdeal,
    finitePulseTransform: finitePulseVal,
    relativeDiff,
    siftingLimitSample: Math.exp(-0.5 * a) * Math.cos(2.0 * a)
  };
}

/**
 * Generate time-domain series for visualization.
 */
export function diracTimeCurves(family, params = {}, tMax = 6.0, numPoints = 200) {
  if (tMax <= 0) throw new RangeError('tMax must be positive');
  const a = params.a ?? 1.5;
  const eps = params.eps ?? 0.3;
  const I = params.I ?? 1.0;
  const sigma = params.sigma ?? 0.15;

  const rectCurve = [];
  const gaussCurve = [];
  const stepCurve = []; // Integral / cumulative impulse (Heaviside transition)

  const dt = tMax / (numPoints - 1);
  let cumRect = 0;

  for (let i = 0; i < numPoints; i++) {
    const t = i * dt;
    const rVal = diracPulseRect(t, a, eps, I);
    const gVal = diracGaussian(t, a, sigma, I);

    if (t < a) {
      cumRect = 0;
    } else if (t >= a + eps) {
      cumRect = I;
    } else {
      cumRect = I * ((t - a) / eps);
    }

    rectCurve.push({ t, value: rVal });
    gaussCurve.push({ t, value: gVal });
    stepCurve.push({ t, value: cumRect });
  }

  return { rectCurve, gaussCurve, stepCurve };
}

/**
 * Generate s-domain frequency spectrum curve.
 */
export function diracSpectrumCurve(family, params = {}, sMin = 0.1, sMax = 5.0, numPoints = 50) {
  if (sMin <= 0 || sMax <= sMin) throw new RangeError('Invalid sMin/sMax range');
  const ds = (sMax - sMin) / (numPoints - 1);
  const idealCurve = [];
  const finiteCurve = [];

  const a = params.a ?? 1.0;
  const eps = params.eps ?? 0.2;
  const I = params.I ?? 1.0;

  for (let i = 0; i < numPoints; i++) {
    const s = sMin + i * ds;
    const ideal = I * Math.exp(-a * s);
    const finite = diracLaplaceExact('rect-pulse', s, { a, eps, I });
    idealCurve.push({ s, value: ideal });
    finiteCurve.push({ s, value: finite });
  }

  return { idealCurve, finiteCurve };
}
