/** Pure analytic families for §2.3 exact equations and integrating factors. x0=1 is fixed. */
const FAMILIES = new Set(['exact', 'factor-x', 'factor-y', 'inspection']);

const DATA = {
  exact: {
    potential: (x, y) => x * x + x * y + y * y,
    M: (x, y) => 2 * x + y,
    N: (x, y) => x + 2 * y,
    multiplier: () => 1,
    residual: () => 0
  },
  'factor-x': {
    potential: (x, y) => Math.exp(x) * y * (2 * x - y),
    M: (x, y) => y * (2 * x - y + 2),
    N: (x, y) => 2 * (x - y),
    multiplier: x => Math.exp(x),
    residual: (x, y) => 2 * x - 2 * y
  },
  'factor-y': {
    potential: (x, y) => x * y + y * y / 2 - Math.log(y),
    M: (x, y) => y * y,
    N: (x, y) => x * y + y * y - 1,
    multiplier: (x, y) => 1 / y,
    residual: (x, y) => y
  },
  inspection: {
    potential: (x, y) => Math.log(x * x + y * y) + 2 * Math.sqrt(x),
    M: (x, y) => 2 * x * Math.sqrt(x) + x * x + y * y,
    N: (x, y) => 2 * y * Math.sqrt(x),
    multiplier: (x, y) => 1 / (Math.sqrt(x) * (x * x + y * y)),
    residual: (x, y) => 2 * y - y / Math.sqrt(x)
  }
};

function finite(...values) {
  if (values.some(value => !Number.isFinite(value))) throw new RangeError('Finite data required');
}

function assertFamily(kind) {
  if (!FAMILIES.has(kind)) throw new Error('Unknown exactness family');
}

function family(kind) {
  assertFamily(kind);
  return DATA[kind];
}

export function exactnessConstant(kind, x0, y0) {
  const item = family(kind);
  finite(x0, y0);
  if (kind === 'exact') {
    if (x0 === 0 && y0 === 0) throw new RangeError('exact family requires a nonzero initial point');
    if (2 * y0 + x0 === 0) throw new RangeError('exact family excludes the vertical-tangent boundary');
  }
  if (kind === 'factor-x') {
    if (y0 === 0) throw new RangeError('factor-x family excludes y=0');
    if (y0 === 2 * x0) throw new RangeError('factor-x family excludes y=2x');
  }
  if (kind === 'factor-y' && y0 <= 0) throw new RangeError('factor-y family requires y0>0');
  if (kind === 'inspection') {
    if (x0 <= 0) throw new RangeError('inspection family requires x0>0');
    if (y0 === 0) throw new RangeError('inspection family excludes y=0');
  }
  const value = item.potential(x0, y0);
  if (!Number.isFinite(value)) throw new RangeError('Initial point is outside the family domain');
  return value;
}

export function exactnessPotential(kind, x, y) {
  const item = family(kind);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  return item.potential(x, y);
}

export function exactnessResidual(kind, x, y) {
  const item = family(kind);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  return item.residual(x, y);
}

export function exactnessMultiplier(kind, x, y) {
  const item = family(kind);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  return item.multiplier(x, y);
}

export function exactnessSlope(kind, x, y) {
  const item = family(kind);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  const numerator = item.M(x, y);
  const denominator = item.N(x, y);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return NaN;
  return -numerator / denominator;
}

export function exactnessLevel(kind, x, y, x0, y0) {
  const constant = exactnessConstant(kind, x0, y0);
  const value = exactnessPotential(kind, x, y);
  return Number.isFinite(value) ? value - constant : NaN;
}

/** Marching-squares segments of the level curve u(x,y)=level. */
export function exactnessContour(kind, level, xMin, xMax, yMin, yMax, nx = 96, ny = 96) {
  family(kind);
  finite(level, xMin, xMax, yMin, yMax);
  if (!(xMax > xMin) || !(yMax > yMin)) throw new RangeError('Invalid plot window');
  if (!(nx >= 2) || !(ny >= 2)) throw new RangeError('Grid too small');
  const at = (x, y) => {
    const value = exactnessPotential(kind, x, y);
    return Number.isFinite(value) ? value - level : NaN;
  };
  const xs = Array.from({length: nx + 1}, (_, i) => xMin + (xMax - xMin) * i / nx);
  const ys = Array.from({length: ny + 1}, (_, j) => yMin + (yMax - yMin) * j / ny);
  const values = ys.map(y => xs.map(x => at(x, y)));
  const segments = [];
  const crossing = (a, b) => (a < 0 && b >= 0) || (a >= 0 && b < 0);
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const v00 = values[j][i], v10 = values[j][i + 1], v11 = values[j + 1][i + 1], v01 = values[j + 1][i];
      if (![v00, v10, v11, v01].every(Number.isFinite)) continue;
      const points = [];
      const add = (a, b, x1, y1, x2, y2) => {
        if (!crossing(a, b)) return;
        const t = a / (a - b);
        points.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]);
      };
      add(v00, v10, xs[i], ys[j], xs[i + 1], ys[j]);
      add(v10, v11, xs[i + 1], ys[j], xs[i + 1], ys[j + 1]);
      add(v11, v01, xs[i + 1], ys[j + 1], xs[i], ys[j + 1]);
      add(v01, v00, xs[i], ys[j + 1], xs[i], ys[j]);
      if (points.length === 2) segments.push(points);
      else if (points.length === 4) {
        segments.push([points[0], points[1]]);
        segments.push([points[2], points[3]]);
      }
    }
  }
  return segments;
}
