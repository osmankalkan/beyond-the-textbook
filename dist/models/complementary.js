/** Pure analytical model for §4.2: complementary solutions of φ(D)y = 0 across four root families. */
const FAMILIES = new Set(['distinct-real', 'hyperbolic-pair', 'damped-complex', 'repeated-double']);

function checkFamily(kind) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown complementary family: ${kind}`);
}

function checkFinite(...values) {
  for (const value of values) {
    if (!Number.isFinite(value)) throw new RangeError('Model arguments must be finite numbers');
  }
}

/** Coefficients [a0, a1, a2] of a2 y'' + a1 y' + a0 y = 0. */
export function complementaryCoefficients(kind) {
  checkFamily(kind);
  switch (kind) {
    case 'distinct-real':
      return [2, -3, 1];
    case 'hyperbolic-pair':
      return [-4, 0, 1];
    case 'damped-complex':
      return [5, 2, 1];
    case 'repeated-double':
      return [4, -4, 1];
  }
}

/** Solve initial-value constants for y(0) = y0 and y'(0) = v0. */
export function complementarySolveIVP(kind, y0, v0) {
  checkFamily(kind);
  checkFinite(y0, v0);
  switch (kind) {
    case 'distinct-real':
      return {c1: 2 * y0 - v0, c2: v0 - y0, labels: ['C₁', 'C₂']};
    case 'hyperbolic-pair':
      return {c1: y0, c2: v0 / 2, labels: ['A', 'B']};
    case 'damped-complex':
      return {c1: y0, c2: (v0 + y0) / 2, labels: ['A', 'B']};
    case 'repeated-double':
      return {c1: y0, c2: v0 - 2 * y0, labels: ['C₀', 'C₁']};
  }
}

function evaluateAll(kind, y0, v0, x) {
  const {c1, c2} = complementarySolveIVP(kind, y0, v0);
  checkFinite(x);
  switch (kind) {
    case 'distinct-real': {
      const e1 = Math.exp(x);
      const e2 = Math.exp(2 * x);
      const y = c1 * e1 + c2 * e2;
      const dy = c1 * e1 + 2 * c2 * e2;
      const d2y = c1 * e1 + 4 * c2 * e2;
      return [y, dy, d2y];
    }
    case 'hyperbolic-pair': {
      const ch = Math.cosh(2 * x);
      const sh = Math.sinh(2 * x);
      const y = c1 * ch + c2 * sh;
      const dy = 2 * c1 * sh + 2 * c2 * ch;
      const d2y = 4 * c1 * ch + 4 * c2 * sh;
      return [y, dy, d2y];
    }
    case 'damped-complex': {
      const env = Math.exp(-x);
      const c = Math.cos(2 * x);
      const s = Math.sin(2 * x);
      const u = c1 * c + c2 * s;
      const du = -2 * c1 * s + 2 * c2 * c;
      const d2u = -4 * u;
      const y = env * u;
      const dy = env * (du - u);
      const d2y = env * (d2u - 2 * du + u);
      return [y, dy, d2y];
    }
    case 'repeated-double': {
      const e2 = Math.exp(2 * x);
      const lin = c1 + c2 * x;
      const y = lin * e2;
      const dy = (2 * lin + c2) * e2;
      const d2y = (4 * lin + 4 * c2) * e2;
      return [y, dy, d2y];
    }
  }
}

/** Exact complementary solution y(x) for y(0)=y0, y'(0)=v0. */
export function complementaryValue(kind, y0, v0, x) {
  return evaluateAll(kind, y0, v0, x)[0];
}

/** Exact first derivative y'(x). */
export function complementarySlope(kind, y0, v0, x) {
  return evaluateAll(kind, y0, v0, x)[1];
}

/** Exact second derivative y''(x). */
export function complementaryCurvature(kind, y0, v0, x) {
  return evaluateAll(kind, y0, v0, x)[2];
}

/** Differential operator residual a2 y''(x) + a1 y'(x) + a0 y(x); identically zero. */
export function complementaryResidual(kind, y0, v0, x) {
  const [y, dy, d2y] = evaluateAll(kind, y0, v0, x);
  const [a0, a1, a2] = complementaryCoefficients(kind);
  return a2 * d2y + a1 * dy + a0 * y;
}

/** Sample [x, y(x)] on [from, to]. */
export function complementarySample(kind, y0, v0, from, to, count = 360) {
  checkFamily(kind);
  checkFinite(y0, v0, from, to);
  if (to <= from) throw new RangeError('Invalid sampling interval');
  const points = [];
  for (let i = 0; i <= count; i += 1) {
    const x = from + (to - from) * i / count;
    const y = complementaryValue(kind, y0, v0, x);
    points.push(Number.isFinite(y) ? [x, y] : [NaN, NaN]);
  }
  return points;
}

export const complementaryFamilyIds = Object.freeze([...FAMILIES]);
