/** Pure analytic families for §2.6 simple higher-order equations. */
const FAMILIES = new Set(['immediate', 'missing-y', 'missing-x']);
const EPS = 1e-6;

function assertFamily(kind) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown reduction family: ${kind}`);
}

export function reductionConstant(kind, c) {
  assertFamily(kind);
  if (!Number.isFinite(c)) throw new RangeError(`Invalid constant: ${c}`);
  return c;
}

export function reductionValid(kind, c) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown reduction family: ${kind}`);
  return Number.isFinite(c);
}

export function reductionDomain(kind, c) {
  assertFamily(kind);
  if (!reductionValid(kind, c)) return [-Infinity, -Infinity];
  switch (kind) {
    case 'immediate':
      return [-Infinity, Infinity];
    case 'missing-y':
      return [-Math.PI / 2 + 1e-3, Math.PI / 2 - 1e-3];
    case 'missing-x':
      if (Math.abs(c) < EPS) return [-Infinity, Infinity];
      if (c > 0) return [-1 / c + 1e-3, Infinity];
      return [-Infinity, -1 / c - 1e-3];
    default:
      return [-Infinity, Infinity];
  }
}

export function reductionValue(kind, x, c) {
  assertFamily(kind);
  if (!reductionValid(kind, c) || !Number.isFinite(x)) return NaN;
  switch (kind) {
    case 'immediate':
      return x * x * x + c * x + 1;
    case 'missing-y': {
      if (x <= -Math.PI / 2 + EPS || x >= Math.PI / 2 - EPS) return NaN;
      const cos = Math.cos(x);
      if (Math.abs(cos) < EPS) return NaN;
      const sec = 1 / cos;
      const tan = Math.tan(x);
      const arg = sec + tan;
      if (arg <= 0) return NaN;
      return Math.log(arg) + c;
    }
    case 'missing-x': {
      const arg = c * x + 1;
      if (arg <= EPS) return NaN;
      return Math.log(arg);
    }
    default:
      return NaN;
  }
}

export function reductionDerivative(kind, x, c) {
  assertFamily(kind);
  if (!reductionValid(kind, c) || !Number.isFinite(x)) return NaN;
  switch (kind) {
    case 'immediate':
      return 3 * x * x + c;
    case 'missing-y': {
      if (x <= -Math.PI / 2 + EPS || x >= Math.PI / 2 - EPS) return NaN;
      const cos = Math.cos(x);
      if (Math.abs(cos) < EPS) return NaN;
      return 1 / cos;
    }
    case 'missing-x': {
      const arg = c * x + 1;
      if (arg <= EPS) return NaN;
      return c / arg;
    }
    default:
      return NaN;
  }
}

export function reductionSecondDerivative(kind, x, c) {
  assertFamily(kind);
  if (!reductionValid(kind, c) || !Number.isFinite(x)) return NaN;
  switch (kind) {
    case 'immediate':
      return 6 * x;
    case 'missing-y': {
      if (x <= -Math.PI / 2 + EPS || x >= Math.PI / 2 - EPS) return NaN;
      const cos = Math.cos(x);
      if (Math.abs(cos) < EPS) return NaN;
      return Math.tan(x) / cos;
    }
    case 'missing-x': {
      const arg = c * x + 1;
      if (arg <= EPS) return NaN;
      return -(c * c) / (arg * arg);
    }
    default:
      return NaN;
  }
}

export function reductionResidual(kind, x, c) {
  assertFamily(kind);
  if (!reductionValid(kind, c) || !Number.isFinite(x)) return NaN;
  const yp = reductionDerivative(kind, x, c);
  const ypp = reductionSecondDerivative(kind, x, c);
  if (!Number.isFinite(yp) || !Number.isFinite(ypp)) return NaN;
  switch (kind) {
    case 'immediate':
      return Math.abs(ypp - 6 * x);
    case 'missing-y':
      return Math.abs(2 * ypp - Math.pow(yp, 3) * Math.sin(2 * x));
    case 'missing-x':
      return Math.abs(ypp + yp * yp);
    default:
      return NaN;
  }
}

export function reductionPoint(kind, x, c) {
  return [x, reductionValue(kind, x, c)];
}

export function reductionSample(kind, c, from, to, count = 480) {
  assertFamily(kind);
  if (!Number.isFinite(from) || !Number.isFinite(to) || from >= to) {
    throw new RangeError(`Invalid sample range: [${from}, ${to}]`);
  }
  const [dMin, dMax] = reductionDomain(kind, c);
  const start = Math.max(from, dMin);
  const end = Math.min(to, dMax);
  if (start >= end) return [];
  const step = (end - start) / count;
  const points = [];
  for (let i = 0; i <= count; i++) {
    const x = start + i * step;
    points.push([x, reductionValue(kind, x, c)]);
  }
  return points;
}
