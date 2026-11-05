/**
 * Inverse Laplace Transform mathematical model (§6.4)
 * Pure functions: partial fractions, convolution integrals, shifting theorems, and exact inversions.
 */

export const INVERSE_FAMILIES = [
  'linear-distinct',
  'repeated-linear',
  'delayed-power',
  'quadratic-resonance',
  'damped-quadratic',
  'bi-harmonic',
  'convolution-pair'
];

export function inverseFamilies() {
  return [...INVERSE_FAMILIES];
}

/**
 * Analytical inverse Laplace transform f(t) = L^-1{F(s)} for standard families.
 */
export function inverseLaplaceExact(family, t, params = {}) {
  if (t < 0) return 0;

  switch (family) {
    case 'linear-distinct': {
      // F(s) = c / ((s - a)(s - b)) -> c * (e^(at) - e^(bt)) / (a - b)
      const a = params.a ?? 1.0;
      const b = params.b ?? -2.0;
      const c = params.c ?? 1.0;
      if (Math.abs(a - b) < 1e-12) {
        return c * t * Math.exp(a * t);
      }
      return (c / (a - b)) * (Math.exp(a * t) - Math.exp(b * t));
    }
    case 'repeated-linear': {
      // Example 6.11: F(s) = s / (s - a)^5
      // s/(s-a)^5 = 1/(s-a)^4 + a/(s-a)^5 -> e^(at) * [t^3 / 3! + a * t^4 / 4!]
      const a = params.a ?? 2.0;
      const t3 = t * t * t;
      const t4 = t3 * t;
      return Math.exp(a * t) * (t3 / 6.0 + (a * t4) / 24.0);
    }
    case 'delayed-power': {
      // Example 6.12: F(s) = (1 + e^(-as)) / s^4 -> (1/6) * [t^3 + (t - a)^3 * H(t - a)]
      const a = params.a ?? 3.0;
      const base = (t * t * t) / 6.0;
      const delayed = t >= a ? Math.pow(t - a, 3) / 6.0 : 0;
      return base + delayed;
    }
    case 'quadratic-resonance': {
      // Example 6.13: F(s) = s / (s^2 + omega^2)^2 -> (t / (2*omega)) * sin(omega*t)
      const omega = params.omega ?? 2.0;
      if (Math.abs(omega) < 1e-12) return 0.5 * t * t;
      return (t / (2.0 * omega)) * Math.sin(omega * t);
    }
    case 'damped-quadratic': {
      // Example 6.14: F(s) = 4 / ((s - 1)(s^2 + 2s + 5))
      // = 4 / ((s - 1)((s + 1)^2 + 4))
      // f(t) = e^t - e^(-t) * (sin 2t + cos 2t)
      return Math.exp(t) - Math.exp(-t) * (Math.sin(2.0 * t) + Math.cos(2.0 * t));
    }
    case 'bi-harmonic': {
      // Example 6.15: F(s) = (s + 1) / ((s^2 + 1)(s^2 + 9))
      // f(t) = (1/8) * (cos t + sin t - cos 3t - (1/3) * sin 3t)
      return (1.0 / 8.0) * (Math.cos(t) + Math.sin(t) - Math.cos(3.0 * t) - (1.0 / 3.0) * Math.sin(3.0 * t));
    }
    case 'convolution-pair': {
      // Convolution of f1(t) = sin(t), f2(t) = cos(2t)
      // (f1 * f2)(t) = (1/3) * (cos t - cos 2t)
      return (1.0 / 3.0) * (Math.cos(t) - Math.cos(2.0 * t));
    }
    default:
      throw new RangeError(`Unknown inverse Laplace family: ${family}`);
  }
}

/**
 * Numerical convolution integral (f * g)(t) = \int_0^t f(u) g(t - u) du via Simpson's rule.
 */
export function numericalConvolution(fFn, gFn, t, nSteps = 200) {
  if (t < 0) return 0;
  if (t === 0) return 0;
  const n = nSteps % 2 === 0 ? nSteps : nSteps + 1;
  const h = t / n;

  let sum = fFn(0) * gFn(t) + fFn(t) * gFn(0);
  for (let i = 1; i < n; i++) {
    const u = i * h;
    const factor = i % 2 === 0 ? 2 : 4;
    sum += factor * fFn(u) * gFn(t - u);
  }
  return (sum * h) / 3.0;
}

/**
 * Evaluates F(s) in the complex/real frequency domain for visualization.
 */
export function forwardTransferFunction(family, s, params = {}) {
  switch (family) {
    case 'linear-distinct': {
      const a = params.a ?? 1.0;
      const b = params.b ?? -2.0;
      const c = params.c ?? 1.0;
      return c / ((s - a) * (s - b));
    }
    case 'repeated-linear': {
      const a = params.a ?? 2.0;
      return s / Math.pow(s - a, 5);
    }
    case 'delayed-power': {
      const a = params.a ?? 3.0;
      return (1.0 + Math.exp(-a * s)) / Math.pow(s, 4);
    }
    case 'quadratic-resonance': {
      const omega = params.omega ?? 2.0;
      return s / Math.pow(s * s + omega * omega, 2);
    }
    case 'damped-quadratic': {
      return 4.0 / ((s - 1.0) * (s * s + 2.0 * s + 5.0));
    }
    case 'bi-harmonic': {
      return (s + 1.0) / ((s * s + 1.0) * (s * s + 9.0));
    }
    case 'convolution-pair': {
      // L{sin t} * L{cos 2t} = (1 / (s^2 + 1)) * (s / (s^2 + 4))
      return s / ((s * s + 1.0) * (s * s + 4.0));
    }
    default:
      throw new RangeError(`Unknown inverse Laplace family: ${family}`);
  }
}

/**
 * Metrics and pole classification.
 */
export function inverseMetrics(family, params = {}) {
  let poles = [];
  let description = '';

  switch (family) {
    case 'linear-distinct': {
      const a = params.a ?? 1.0;
      const b = params.b ?? -2.0;
      poles = [a, b];
      description = `İki ayrık basit kutup: s = ${a}, s = ${b}`;
      break;
    }
    case 'repeated-linear': {
      const a = params.a ?? 2.0;
      poles = [a];
      description = `5. mertebeden katlı kutup: s = ${a}`;
      break;
    }
    case 'delayed-power': {
      poles = [0];
      description = 'Orijinde 4. mertebeden kutup ve e^{-3s} gecikme çarpanı';
      break;
    }
    case 'quadratic-resonance': {
      const omega = params.omega ?? 2.0;
      poles = [`±${omega}i (katlı)`];
      description = `Rezonans üreten katlı sanal kutup çifti: s = ±${omega}i`;
      break;
    }
    case 'damped-quadratic': {
      poles = [1, '-1 ± 2i'];
      description = '1 basit reel kutup (s=1) ve sönümlü karmaşık kutup çifti (s = -1 ± 2i)';
      break;
    }
    case 'bi-harmonic': {
      poles = ['±1i', '±3i'];
      description = 'İki çift saf sanal kutup (ω₁ = 1 rad/s, ω₂ = 3 rad/s)';
      break;
    }
    case 'convolution-pair': {
      poles = ['±1i', '±2i'];
      description = 'Konvolüsyon kutupları: s = ±i ve s = ±2i';
      break;
    }
  }

  return { poles, description };
}

/**
 * Generate time-domain series.
 */
export function inverseTimeCurves(family, params = {}, tMax = 8.0, numPoints = 150) {
  if (tMax <= 0) throw new RangeError('tMax must be positive');
  const dt = tMax / (numPoints - 1);
  const timeCurve = [];

  for (let i = 0; i < numPoints; i++) {
    const t = i * dt;
    const val = inverseLaplaceExact(family, t, params);
    timeCurve.push({ t, value: val });
  }

  return timeCurve;
}

/**
 * Generate s-domain frequency curve along the positive real axis.
 */
export function inverseFrequencyCurve(family, params = {}, sMin = 0.2, sMax = 6.0, numPoints = 60) {
  const ds = (sMax - sMin) / (numPoints - 1);
  const sCurve = [];

  for (let i = 0; i < numPoints; i++) {
    const s = sMin + i * ds;
    const val = forwardTransferFunction(family, s, params);
    sCurve.push({ s, value: Number.isFinite(val) ? Math.min(10.0, Math.max(-10.0, val)) : NaN });
  }

  return sCurve;
}
