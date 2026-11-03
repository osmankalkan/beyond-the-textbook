/** Pure analytic families for §2.2 transformation of variables. x0>0 is fixed. */
const FAMILIES = new Set(['circle', 'ellipse', 'sum', 'radical']);

function finite(...values) {
  if (values.some(value => !Number.isFinite(value))) throw new RangeError('Finite data required');
}

function assertFamily(kind) {
  if (!FAMILIES.has(kind)) throw new Error('Unknown transformation family');
}

export function transformationConstant(kind, x0, y0) {
  assertFamily(kind);
  finite(x0, y0);
  if (x0 <= 0) throw new RangeError('x0>0 required');
  if (kind === 'circle') {
    if (y0 === 0) throw new RangeError('circle family requires y0≠0');
    return (x0 * x0 + y0 * y0) / x0;
  }
  if (kind === 'ellipse') {
    if (2 * y0 === x0) throw new RangeError('ellipse family requires 2y0≠x0');
    return x0 * x0 - x0 * y0 + y0 * y0;
  }
  if (kind === 'sum') return Math.atan(x0 + y0) - x0;
  if (y0 === 0 || Math.abs(y0) >= x0) throw new RangeError('radical family requires 0<|y0|<x0');
  return Math.sqrt(x0 * x0 - y0 * y0) - x0;
}

export function transformationDomain(kind, x0, y0) {
  assertFamily(kind);
  finite(x0, y0);
  if (x0 <= 0) throw new RangeError('x0>0 required');
  if (kind === 'circle') {
    const A = transformationConstant(kind, x0, y0);
    return [0, A];
  }
  if (kind === 'ellipse') {
    const A = transformationConstant(kind, x0, y0);
    const bound = 2 * Math.sqrt(A / 3);
    if (!(x0 < bound)) throw new RangeError('x0 lies outside the ellipse branch');
    return [-bound, bound];
  }
  if (kind === 'sum') {
    const C = transformationConstant(kind, x0, y0);
    return [-C - Math.PI / 2, -C + Math.PI / 2];
  }
  const C = transformationConstant(kind, x0, y0);
  return [-C, Infinity];
}

export function transformationValue(kind, x, x0, y0) {
  const [lo, hi] = transformationDomain(kind, x0, y0);
  if (!Number.isFinite(x) || x <= lo || x >= hi) return NaN;
  if (kind === 'circle') {
    const A = transformationConstant(kind, x0, y0);
    return Math.sign(y0) * Math.sqrt(Math.max(0, A * x - x * x));
  }
  if (kind === 'ellipse') {
    const A = transformationConstant(kind, x0, y0);
    const root = Math.sqrt(Math.max(0, 4 * A - 3 * x * x));
    return (x + Math.sign(2 * y0 - x0) * root) / 2;
  }
  if (kind === 'sum') {
    const C = transformationConstant(kind, x0, y0);
    const angle = x + C;
    if (Math.abs(Math.cos(angle)) < 1e-14) return NaN;
    return Math.tan(angle) - x;
  }
  const C = transformationConstant(kind, x0, y0);
  return Math.sign(y0) * Math.sqrt(Math.max(0, -2 * C * x - C * C));
}

export function transformationSlope(kind, x, y) {
  assertFamily(kind);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  if (kind === 'circle') {
    if (x === 0 || y === 0) return NaN;
    return (y * y - x * x) / (2 * x * y);
  }
  if (kind === 'ellipse') {
    if (x - 2 * y === 0) return NaN;
    return (2 * x - y) / (x - 2 * y);
  }
  if (kind === 'sum') return (x + y) ** 2;
  if (y === 0 || x * x - y * y < 0) return NaN;
  return (x - Math.sqrt(x * x - y * y)) / y;
}
