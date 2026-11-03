/** Pure analytic families for §2.4 linear first-order and Bernoulli equations. */
const FAMILIES = new Set(['linear-tan', 'linear-y', 'bernoulli-33', 'bernoulli-34']);
const MODE = {
  'linear-tan': 'y',
  'linear-y': 'x',
  'bernoulli-33': 'y',
  'bernoulli-34': 'x'
};
const EPS = 1e-10;

function check(kind, value) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown linear family: ${kind}`);
  if (!Number.isFinite(value)) throw new RangeError('Initial datum must be finite');
}

export function linearMode(kind) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown linear family: ${kind}`);
  return MODE[kind];
}

/** Constant of the family selected by the initial datum a. */
export function linearConstant(kind, a) {
  check(kind, a);
  switch (kind) {
    case 'linear-tan':
      return a;
    case 'linear-y':
      return (a + 2 * Math.E) / (Math.E * Math.E);
    case 'bernoulli-33':
      if (a <= 0) throw new RangeError('The upper branch needs y(1)>0');
      return a * a + 1;
    case 'bernoulli-34':
      if (a <= 0) throw new RangeError('The positive branch needs x(1)>0');
      return (4 / (a * a * a) - 3) / 4;
  }
}

/** Point (x0,y0) fixed by the family and the datum a. */
export function linearInitial(kind, a) {
  check(kind, a);
  return MODE[kind] === 'y' ? [kind === 'linear-tan' ? 0 : 1, a] : [a, 1];
}

/** Dependent value y(x) or x(y) at the independent coordinate t. */
export function linearValue(kind, t, a) {
  check(kind, a);
  let c;
  try {
    c = linearConstant(kind, a);
  } catch {
    return NaN;
  }
  switch (kind) {
    case 'linear-tan':
      if (Math.abs(Math.cos(t)) < EPS) return NaN;
      return (Math.sin(t) - Math.sin(t) ** 3 / 3 + c) / Math.cos(t) ** 3;
    case 'linear-y':
      if (Math.abs(t) < EPS) return NaN;
      return (c * Math.exp(2 * t) - Math.exp(t) * (t + 1)) / (t * t);
    case 'bernoulli-33': {
      const radicand = t * (c - t * t);
      return radicand < 0 ? NaN : Math.sqrt(radicand);
    }
    case 'bernoulli-34': {
      if (t <= 0) return NaN;
      const denominator = 4 * c + 3 * t * t * (1 - 2 * Math.log(t));
      if (Math.abs(denominator) < EPS) return NaN;
      const radicand = 4 * t / denominator;
      return radicand < 0 ? NaN : Math.cbrt(radicand);
    }
  }
}

/** Cartesian point for a given independent coordinate t. */
export function linearPoint(kind, t, a) {
  const value = linearValue(kind, t, a);
  if (!Number.isFinite(value)) return [NaN, NaN];
  return MODE[kind] === 'y' ? [t, value] : [value, t];
}

/** Slope dy/dx at a point on the solution curve. */
export function linearSlope(kind, x, y) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown linear family: ${kind}`);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  switch (kind) {
    case 'linear-tan':
      return 1 + 3 * y * Math.tan(x);
    case 'linear-y': {
      if (Math.abs(y) < EPS) return NaN;
      const dxdy = Math.exp(y) / y + 2 * x * (1 - 1 / y);
      return Math.abs(dxdy) < EPS ? NaN : 1 / dxdy;
    }
    case 'bernoulli-33':
      if (Math.abs(2 * x * y) < EPS) return NaN;
      return (y * y - 2 * x ** 3) / (2 * x * y);
    case 'bernoulli-34': {
      if (y <= 0) return NaN;
      const dxdy = x / (3 * y) + x ** 4 * Math.log(y);
      return Math.abs(dxdy) < EPS ? NaN : 1 / dxdy;
    }
  }
}

/** Integrating factor μ, or the Bernoulli auxiliary variable u. */
export function linearAuxiliary(kind, x, y) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown linear family: ${kind}`);
  switch (kind) {
    case 'linear-tan':
      return Math.cos(x) ** 3;
    case 'linear-y':
      return Math.abs(y) < EPS ? NaN : y * y * Math.exp(-2 * y);
    case 'bernoulli-33':
      return y * y;
    case 'bernoulli-34':
      return Math.abs(x) < EPS ? NaN : x ** -3;
  }
}

/** Connected interval of the independent variable containing the initial datum. */
export function linearDomain(kind, a) {
  check(kind, a);
  switch (kind) {
    case 'linear-tan':
      return [-Math.PI / 2, Math.PI / 2];
    case 'linear-y':
      return [0, Infinity];
    case 'bernoulli-33': {
      const c = linearConstant(kind, a);
      return [0, Math.sqrt(c)];
    }
    case 'bernoulli-34':
      return [0, Infinity];
  }
}

/** True when the datum selects a real branch of the family. */
export function linearValid(kind, a) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown linear family: ${kind}`);
  if (!Number.isFinite(a)) return false;
  if (kind === 'bernoulli-33' || kind === 'bernoulli-34') return a > 0;
  return true;
}

/** Sample the solution curve; invalid coordinates mark segment breaks. */
export function linearSample(kind, a, from, to, count = 480) {
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) throw new RangeError('Invalid sampling interval');
  const points = [];
  for (let i = 0; i <= count; i += 1) {
    const t = from + (to - from) * i / count;
    points.push(linearPoint(kind, t, a));
  }
  return points;
}
