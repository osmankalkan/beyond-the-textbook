/** Pure analytic families for §2.5 equations solvable for x or y. */
const FAMILIES = new Set(['clairaut-square', 'clairaut-inverse', 'solvable-x-238', 'solvable-y-236']);
const MODE = {
  'clairaut-square': 'y',
  'clairaut-inverse': 'y',
  'solvable-x-238': 'y',
  'solvable-y-236': 'y'
};
const EPS = 1e-10;

function check(kind, value) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown solvable family: ${kind}`);
  if (!Number.isFinite(value)) throw new RangeError('Parameter C must be finite');
}

/** The family parameter is C itself for §2.5. */
export function solvableConstant(kind, c) {
  check(kind, c);
  return c;
}

/** True when C selects a real branch of the family. */
export function solvableValid(kind, c) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown solvable family: ${kind}`);
  if (!Number.isFinite(c)) return false;
  return kind === 'clairaut-square' || kind === 'solvable-x-238' || Math.abs(c) > EPS;
}

/** Dependent value y(x) on the general family. */
export function solvableValue(kind, x, c) {
  check(kind, c);
  if (!solvableValid(kind, c) || !Number.isFinite(x)) return NaN;
  switch (kind) {
    case 'clairaut-square':
      return c * x + c * c;
    case 'clairaut-inverse':
      return c * x + 1 / c;
    case 'solvable-x-238':
      return Math.cbrt(3 * c * x + c * c);
    case 'solvable-y-236':
      return (c * x * x - 1 / c) / 2;
  }
}

/** Cartesian point on the general family at independent coordinate x. */
export function solvablePoint(kind, x, c) {
  const value = solvableValue(kind, x, c);
  return Number.isFinite(value) ? [x, value] : [NaN, NaN];
}

/** Slope dy/dx = p at a point of the general family. */
export function solvableSlope(kind, x, y, c) {
  check(kind, c);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NaN;
  switch (kind) {
    case 'clairaut-square':
    case 'clairaut-inverse':
      return c;
    case 'solvable-x-238':
      return Math.abs(y) < EPS ? NaN : c / (y * y);
    case 'solvable-y-236':
      return c * x;
  }
}

/** Singular solution (envelope) y(x); NaN where the branch does not exist. */
export function solvableSingular(kind, x, c) {
  check(kind, c);
  switch (kind) {
    case 'clairaut-square':
      return -x * x / 4;
    case 'clairaut-inverse':
      if (x < 0) return NaN;
      return (c >= 0 ? 2 : -2) * Math.sqrt(x);
    case 'solvable-x-238':
      return -Math.cbrt(9 * x * x / 4);
    case 'solvable-y-236':
      return NaN;
  }
}

/** Point where the general curve is tangent to the singular envelope, if any. */
export function solvableTangency(kind, c) {
  check(kind, c);
  if (!solvableValid(kind, c)) return [NaN, NaN];
  switch (kind) {
    case 'clairaut-square':
      return [-2 * c, -c * c];
    case 'clairaut-inverse':
      return [1 / (c * c), 2 / c];
    case 'solvable-x-238':
      return [-2 * c / 3, -Math.cbrt(c * c)];
    case 'solvable-y-236':
      return [NaN, NaN];
  }
}

/** Domain of the independent variable for the general family. */
export function solvableDomain(kind, c) {
  check(kind, c);
  return [-Infinity, Infinity];
}

/** Domain of the singular solution; null when the family has none. */
export function solvableSingularDomain(kind, c) {
  check(kind, c);
  switch (kind) {
    case 'clairaut-square':
      return [-Infinity, Infinity];
    case 'clairaut-inverse':
      return [0, Infinity];
    case 'solvable-x-238':
      return [-Infinity, Infinity];
    case 'solvable-y-236':
      return null;
  }
}

/** Sample the general curve; invalid coordinates mark segment breaks. */
export function solvableSample(kind, c, from, to, count = 480) {
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) throw new RangeError('Invalid sampling interval');
  const points = [];
  for (let i = 0; i <= count; i += 1) {
    const t = from + (to - from) * i / count;
    points.push(solvablePoint(kind, t, c));
  }
  return points;
}

/** Sample the singular curve; returns NaN pairs where it is undefined. */
export function solvableSingularSample(kind, c, from, to, count = 480) {
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) throw new RangeError('Invalid sampling interval');
  const points = [];
  for (let i = 0; i <= count; i += 1) {
    const t = from + (to - from) * i / count;
    const value = solvableSingular(kind, t, c);
    points.push(Number.isFinite(value) ? [t, value] : [NaN, NaN]);
  }
  return points;
}

export function solvableMode(kind) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown solvable family: ${kind}`);
  return MODE[kind];
}
