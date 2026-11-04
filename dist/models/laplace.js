/** Pure analytical and numerical model for §6.1: The Laplace Transform. */
const FAMILIES = new Set(['constant', 'exponential', 'sine', 'cosine', 'damped-sine', 't-sine', 'polynomial']);

function checkFamily(kind) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown Laplace family: ${kind}`);
}

function checkFinite(value, label = 'Value') {
  if (!Number.isFinite(value)) throw new RangeError(`${label} must be finite`);
}

export function laplaceFamilies() {
  return Array.from(FAMILIES);
}

/** Default parameters for each Laplace family. */
export function laplaceDefaultParams(kind) {
  checkFamily(kind);
  switch (kind) {
    case 'constant':
      return { c: 1 };
    case 'exponential':
      return { a: 1.0 };
    case 'sine':
      return { omega: 2.0 };
    case 'cosine':
      return { omega: 2.0 };
    case 'damped-sine':
      return { a: -0.5, omega: 2.0 };
    case 't-sine':
      return { omega: 1.0 };
    case 'polynomial':
      return { n: 2 };
  }
}

/** Convergence abscissa s0; the integral converges for s > s0. */
export function laplaceConvergenceAbscissa(kind, params = {}) {
  checkFamily(kind);
  const p = { ...laplaceDefaultParams(kind), ...params };
  switch (kind) {
    case 'constant':
    case 'sine':
    case 'cosine':
    case 't-sine':
    case 'polynomial':
      return 0;
    case 'exponential':
    case 'damped-sine':
      return p.a;
  }
}

/** Time-domain function f(t) for t >= 0. */
export function laplaceTimeFunction(kind, t, params = {}) {
  checkFamily(kind);
  if (!Number.isFinite(t) || t < 0) return 0;
  const p = { ...laplaceDefaultParams(kind), ...params };
  switch (kind) {
    case 'constant':
      return p.c ?? 1;
    case 'exponential':
      return Math.exp(p.a * t);
    case 'sine':
      return Math.sin(p.omega * t);
    case 'cosine':
      return Math.cos(p.omega * t);
    case 'damped-sine':
      return Math.exp(p.a * t) * Math.sin(p.omega * t);
    case 't-sine':
      return t * Math.sin(p.omega * t);
    case 'polynomial': {
      const n = Math.max(0, Math.floor(p.n ?? 1));
      return Math.pow(t, n);
    }
  }
}

/** The integrand e^(-st) * f(t). */
export function laplaceIntegrand(kind, t, s, params = {}) {
  checkFamily(kind);
  if (t < 0) return 0;
  return Math.exp(-s * t) * laplaceTimeFunction(kind, t, params);
}

function factorial(n) {
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

/** Exact analytical Laplace transform F(s) = L{f(t)}. */
export function laplaceExact(kind, s, params = {}) {
  checkFamily(kind);
  checkFinite(s, 's');
  const p = { ...laplaceDefaultParams(kind), ...params };
  const s0 = laplaceConvergenceAbscissa(kind, p);
  if (s <= s0) return NaN;

  switch (kind) {
    case 'constant':
      return (p.c ?? 1) / s;
    case 'exponential':
      return 1 / (s - p.a);
    case 'sine':
      return p.omega / (s * s + p.omega * p.omega);
    case 'cosine':
      return s / (s * s + p.omega * p.omega);
    case 'damped-sine': {
      const denom = (s - p.a) * (s - p.a) + p.omega * p.omega;
      return p.omega / denom;
    }
    case 't-sine': {
      const denom = (s * s + p.omega * p.omega) * (s * s + p.omega * p.omega);
      return (2 * p.omega * s) / denom;
    }
    case 'polynomial': {
      const n = Math.max(0, Math.floor(p.n ?? 1));
      return factorial(n) / Math.pow(s, n + 1);
    }
  }
}

/** Numerical approximation of \int_0^T e^(-st) f(t) dt using composite Simpson's rule. */
export function laplaceNumericalIntegral(kind, s, T, params = {}, steps = 600) {
  checkFamily(kind);
  checkFinite(s, 's');
  checkFinite(T, 'T');
  if (T <= 0) throw new RangeError('T must be positive');

  const n = Math.max(10, steps % 2 === 0 ? steps : steps + 1);
  const h = T / n;
  let sum = laplaceIntegrand(kind, 0, s, params) + laplaceIntegrand(kind, T, s, params);

  for (let i = 1; i < n; i++) {
    const t = i * h;
    const factor = i % 2 === 0 ? 2 : 4;
    sum += factor * laplaceIntegrand(kind, t, s, params);
  }

  return (h / 3) * sum;
}

/** Live metrics comparing finite-horizon integration with asymptotic F(s). */
export function laplaceMetrics(kind, s, T, params = {}) {
  checkFamily(kind);
  checkFinite(s, 's');
  checkFinite(T, 'T');
  if (T <= 0) throw new RangeError('T must be positive');
  const p = { ...laplaceDefaultParams(kind), ...params };
  const s0 = laplaceConvergenceAbscissa(kind, p);
  const isConvergent = s > s0;
  const exact = isConvergent ? laplaceExact(kind, s, p) : NaN;
  const numerical = laplaceNumericalIntegral(kind, s, T, p);
  const absError = Number.isFinite(exact) ? Math.abs(numerical - exact) : NaN;
  const relError = Number.isFinite(exact) && Math.abs(exact) > 1e-12 ? absError / Math.abs(exact) : NaN;
  const kernelDecay = Math.exp(-s * T);

  // Sample peak integrand on [0, T]
  let peak = 0;
  const testSteps = 50;
  for (let i = 0; i <= testSteps; i++) {
    const val = Math.abs(laplaceIntegrand(kind, (i / testSteps) * T, s, p));
    if (val > peak) peak = val;
  }

  return {
    s,
    T,
    s0,
    isConvergent,
    exactValue: exact,
    numericalValue: numerical,
    absoluteError: absError,
    relativeError: relError,
    kernelDecayFactor: kernelDecay,
    peakIntegrand: peak
  };
}

/** Time curves for t in [0, T]: f(t), kernel e^(-st), and integrand e^(-st)f(t). */
export function laplaceTimeCurves(kind, s, T, params = {}, points = 120) {
  checkFamily(kind);
  checkFinite(s, 's');
  checkFinite(T, 'T');
  if (T <= 0) throw new RangeError('T must be positive');
  const p = { ...laplaceDefaultParams(kind), ...params };
  const dt = T / Math.max(2, points - 1);
  const fCurve = [];
  const kernelCurve = [];
  const integrandCurve = [];

  for (let i = 0; i < points; i++) {
    const t = i * dt;
    const fVal = laplaceTimeFunction(kind, t, p);
    const kVal = Math.exp(-s * t);
    const intVal = kVal * fVal;
    fCurve.push({ t, value: fVal });
    kernelCurve.push({ t, value: kVal });
    integrandCurve.push({ t, value: intVal });
  }

  return { fCurve, kernelCurve, integrandCurve };
}

/** Frequency curve for s in [sMin, sMax]: F(s). */
export function laplaceSpectrumCurve(kind, sMin, sMax, params = {}, points = 100) {
  checkFamily(kind);
  checkFinite(sMin, 'sMin');
  checkFinite(sMax, 'sMax');
  const p = { ...laplaceDefaultParams(kind), ...params };
  const s0 = laplaceConvergenceAbscissa(kind, p);
  const safeMin = Math.max(sMin, s0 + 0.05);
  const ds = (sMax - safeMin) / Math.max(2, points - 1);
  const curve = [];

  for (let i = 0; i < points; i++) {
    const sVal = safeMin + i * ds;
    const fVal = laplaceExact(kind, sVal, p);
    curve.push({ s: sVal, value: fVal });
  }

  return { s0, curve };
}
