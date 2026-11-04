/** Pure analytical model for §4.3: nonhomogeneous ODE families φ(D)y = F(x) and IVP decomposition y = y_C + y_P. */
const FAMILIES = new Set(['exp-forcing', 'poly-resonance', 'shift-resonance', 'variation-log']);

function checkFamily(kind) {
  if (!FAMILIES.has(kind)) throw new RangeError(`Unknown particular-solution family: ${kind}`);
}

function checkFinite(value, label = 'Value') {
  if (!Number.isFinite(value)) throw new RangeError(`${label} must be finite`);
}

/** Domain of the ODE family; null means every real number. */
export function particularDomain(kind) {
  checkFamily(kind);
  return kind === 'variation-log' ? [0, Infinity] : null;
}

/** Initial point x0 used for the initial-value problem y(x0) = y0, y'(x0) = v0. */
export function particularInitialX(kind) {
  checkFamily(kind);
  return kind === 'variation-log' ? 1 : 0;
}

/** Constant coefficients [a0, a1, a2] of φ(D)y = a2 y'' + a1 y' + a0 y = F(x). */
export function particularCoefficients(kind) {
  checkFamily(kind);
  switch (kind) {
    case 'exp-forcing':
      return [9, 0, 1];
    case 'poly-resonance':
      return [0, 2, 1];
    case 'shift-resonance':
      return [13, 4, 1];
    case 'variation-log':
      return [1, -2, 1];
  }
}

function validPoint(kind, x) {
  if (!Number.isFinite(x)) return false;
  if (kind === 'variation-log' && x <= 0) return false;
  return true;
}

/** Right-hand side forcing F(x) of φ(D)y = F(x). */
export function particularForcing(kind, x) {
  checkFamily(kind);
  if (!validPoint(kind, x)) return NaN;
  switch (kind) {
    case 'exp-forcing':
      return 3 * Math.exp(2 * x);
    case 'poly-resonance':
      return 4 * x * x + 2 * x + 3;
    case 'shift-resonance':
      return Math.exp(-2 * x) * Math.sin(3 * x);
    case 'variation-log':
      return Math.exp(x) * Math.log(x);
  }
}

function particularParts(kind, x) {
  checkFamily(kind);
  if (!validPoint(kind, x)) return [NaN, NaN, NaN];
  switch (kind) {
    case 'exp-forcing': {
      const e = Math.exp(2 * x);
      return [
        (3 / 13) * e,
        (6 / 13) * e,
        (12 / 13) * e
      ];
    }
    case 'poly-resonance':
      return [
        (2 / 3) * x * x * x - 0.5 * x * x + 2 * x,
        2 * x * x - x + 2,
        4 * x - 1
      ];
    case 'shift-resonance': {
      const e = Math.exp(-2 * x);
      const c = Math.cos(3 * x);
      const s = Math.sin(3 * x);
      const yP = -(x / 6) * e * c;
      const dyP = (e / 6) * ((2 * x - 1) * c + 3 * x * s);
      const d2yP = (e / 6) * ((5 * x + 4) * c + (6 - 12 * x) * s);
      return [yP, dyP, d2yP];
    }
    case 'variation-log': {
      const e = Math.exp(x);
      const ln = Math.log(x);
      const u = x * x * (0.5 * ln - 0.75);
      const du = x * (ln - 1);
      const d2u = ln;
      const yP = u * e;
      const dyP = (u + du) * e;
      const d2yP = (u + 2 * du + d2u) * e;
      return [yP, dyP, d2yP];
    }
  }
}

/** Particular solution value y_P(x). */
export function particularOnlyValue(kind, x) {
  return particularParts(kind, x)[0];
}

/** Solve for homogeneous constants { c1, c2 } from y(x0) = y0 and y'(x0) = v0. */
export function particularSolveIVP(kind, y0, v0) {
  checkFamily(kind);
  checkFinite(y0, 'Initial value y0');
  checkFinite(v0, 'Initial slope v0');
  switch (kind) {
    case 'exp-forcing':
      return {
        c1: y0 - 3 / 13,
        c2: (v0 - 6 / 13) / 3
      };
    case 'poly-resonance': {
      const c2 = (2 - v0) / 2;
      const c1 = y0 - c2;
      return {c1, c2};
    }
    case 'shift-resonance':
      return {
        c1: y0,
        c2: (v0 + 2 * y0 + 1 / 6) / 3
      };
    case 'variation-log': {
      const invE = Math.exp(-1);
      return {
        c1: y0 * invE + 0.75,
        c2: (v0 - y0) * invE + 1
      };
    }
  }
}

function complementaryParts(kind, y0, v0, x) {
  const {c1, c2} = particularSolveIVP(kind, y0, v0);
  if (!validPoint(kind, x)) return [NaN, NaN, NaN];
  switch (kind) {
    case 'exp-forcing': {
      const c = Math.cos(3 * x);
      const s = Math.sin(3 * x);
      const yC = c1 * c + c2 * s;
      const dyC = -3 * c1 * s + 3 * c2 * c;
      const d2yC = -9 * yC;
      return [yC, dyC, d2yC];
    }
    case 'poly-resonance': {
      const e = Math.exp(-2 * x);
      const yC = c1 + c2 * e;
      const dyC = -2 * c2 * e;
      const d2yC = 4 * c2 * e;
      return [yC, dyC, d2yC];
    }
    case 'shift-resonance': {
      const e = Math.exp(-2 * x);
      const c = Math.cos(3 * x);
      const s = Math.sin(3 * x);
      const u = c1 * c + c2 * s;
      const du = -3 * c1 * s + 3 * c2 * c;
      const d2u = -9 * u;
      const yC = e * u;
      const dyC = e * (-2 * u + du);
      const d2yC = e * (4 * u - 4 * du + d2u);
      return [yC, dyC, d2yC];
    }
    case 'variation-log': {
      const e = Math.exp(x);
      const w = c1 + c2 * (x - 1);
      const yC = w * e;
      const dyC = (w + c2) * e;
      const d2yC = (w + 2 * c2) * e;
      return [yC, dyC, d2yC];
    }
  }
}

/** Complementary solution value y_C(x) determined by y(x0) = y0, y'(x0) = v0. */
export function particularComplementaryValue(kind, y0, v0, x) {
  return complementaryParts(kind, y0, v0, x)[0];
}

/** Complete IVP solution y(x) = y_C(x) + y_P(x). */
export function particularTotalValue(kind, y0, v0, x) {
  const yC = particularComplementaryValue(kind, y0, v0, x);
  const yP = particularOnlyValue(kind, x);
  return Number.isFinite(yC) && Number.isFinite(yP) ? yC + yP : NaN;
}

/** First derivative y'(x) = y_C'(x) + y_P'(x). */
export function particularTotalSlope(kind, y0, v0, x) {
  const dyC = complementaryParts(kind, y0, v0, x)[1];
  const dyP = particularParts(kind, x)[1];
  return Number.isFinite(dyC) && Number.isFinite(dyP) ? dyC + dyP : NaN;
}

/** Second derivative y''(x) = y_C''(x) + y_P''(x). */
export function particularTotalCurvature(kind, y0, v0, x) {
  const d2yC = complementaryParts(kind, y0, v0, x)[2];
  const d2yP = particularParts(kind, x)[2];
  return Number.isFinite(d2yC) && Number.isFinite(d2yP) ? d2yC + d2yP : NaN;
}

/** ODE residual a2 y''(x) + a1 y'(x) + a0 y(x) − F(x); identically zero on the domain. */
export function particularResidual(kind, y0, v0, x) {
  const [yC, dyC, d2yC] = complementaryParts(kind, y0, v0, x);
  const [yP, dyP, d2yP] = particularParts(kind, x);
  const rhs = particularForcing(kind, x);
  if (!Number.isFinite(yC) || !Number.isFinite(yP) || !Number.isFinite(rhs)) return NaN;
  const [a0, a1, a2] = particularCoefficients(kind);
  const lhs = a2 * (d2yC + d2yP) + a1 * (dyC + dyP) + a0 * (yC + yP);
  return lhs - rhs;
}

function sample(from, to, count, evaluate) {
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) {
    throw new RangeError('Invalid sampling interval');
  }
  const points = [];
  for (let i = 0; i <= count; i += 1) {
    const x = from + (to - from) * i / count;
    const y = evaluate(x);
    points.push(Number.isFinite(y) ? [x, y] : [NaN, NaN]);
  }
  return points;
}

/** Sample the complete IVP solution y(x) = y_C(x) + y_P(x) on [from, to]. */
export function particularSample(kind, y0, v0, from, to, count = 360) {
  checkFamily(kind);
  checkFinite(y0, 'Initial value y0');
  checkFinite(v0, 'Initial slope v0');
  return sample(from, to, count, x => particularTotalValue(kind, y0, v0, x));
}

/** Sample the pure particular solution y_P(x) on [from, to]. */
export function particularOnlySample(kind, from, to, count = 360) {
  checkFamily(kind);
  return sample(from, to, count, x => particularOnlyValue(kind, x));
}

export const particularFamilyIds = Object.freeze([...FAMILIES]);
