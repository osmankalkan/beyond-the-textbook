/** Pure operator algebra for §4.1: linearity and superposition of L = a2 D² + a1 D + a0. */
const OPERATORS = new Set(['constant-distinct', 'constant-osc', 'variable-x']);
const FUNCTIONS = new Set(['exp', 'exp2', 'exp3', 'sin', 'cos', 'poly', 'const', 'log']);
const EPS = 1e-12;

function checkOperator(kind) {
  if (!OPERATORS.has(kind)) throw new RangeError(`Unknown linear operator: ${kind}`);
}

function checkFunction(id) {
  if (!FUNCTIONS.has(id)) throw new RangeError(`Unknown test function: ${id}`);
}

/** Coefficients [a0, a1, a2] of L = a2 y'' + a1 y' + a0 y at x. */
export function linearOperatorCoefficients(kind, x) {
  checkOperator(kind);
  if (!Number.isFinite(x)) throw new RangeError('The evaluation point must be finite');
  switch (kind) {
    case 'constant-distinct':
      return [2, -3, 1];
    case 'constant-osc':
      return [1, 0, 1];
    case 'variable-x':
      return [-1, 1, x];
  }
}

/** Domain of the test function; null means every real number. */
export function linearFunctionDomain(id) {
  checkFunction(id);
  return id === 'log' ? [0, Infinity] : null;
}

function parts(id, x) {
  checkFunction(id);
  if (!Number.isFinite(x)) return [NaN, NaN, NaN];
  if (id === 'log' && x <= 0) return [NaN, NaN, NaN];
  switch (id) {
    case 'exp': {
      const e = Math.exp(x);
      return [e, e, e];
    }
    case 'exp2': {
      const e = Math.exp(2 * x);
      return [e, 2 * e, 4 * e];
    }
    case 'exp3': {
      const e = Math.exp(3 * x);
      return [e, 3 * e, 9 * e];
    }
    case 'sin':
      return [Math.sin(x), Math.cos(x), -Math.sin(x)];
    case 'cos':
      return [Math.cos(x), -Math.sin(x), -Math.cos(x)];
    case 'poly':
      return [x * x, 2 * x, 2];
    case 'const':
      return [1, 0, 0];
    case 'log':
      return [Math.log(x), 1 / x, -1 / (x * x)];
  }
}

/** Function value f(x). */
export function linearFunctionValue(id, x) {
  return parts(id, x)[0];
}

/** First derivative f'(x). */
export function linearFunctionSlope(id, x) {
  return parts(id, x)[1];
}

/** Second derivative f''(x). */
export function linearFunctionCurvature(id, x) {
  return parts(id, x)[2];
}

/** L[f](x) = a2 f'' + a1 f' + a0 f. */
export function linearOperatorValue(kind, id, x) {
  checkOperator(kind);
  const [value, slope, curvature] = parts(id, x);
  if (!Number.isFinite(value)) return NaN;
  const [a0, a1, a2] = linearOperatorCoefficients(kind, x);
  return a0 * value + a1 * slope + a2 * curvature;
}

/** L[αu + βv](x), evaluated literally from the combined function. */
export function linearCombinationValue(kind, u, v, alpha, beta, x) {
  checkOperator(kind);
  if (!Number.isFinite(alpha) || !Number.isFinite(beta)) throw new RangeError('The coefficients must be finite');
  const [u0, u1, u2] = parts(u, x);
  const [v0, v1, v2] = parts(v, x);
  if (!Number.isFinite(u0) || !Number.isFinite(v0)) return NaN;
  const [a0, a1, a2] = linearOperatorCoefficients(kind, x);
  const value = alpha * u0 + beta * v0;
  const slope = alpha * u1 + beta * v1;
  const curvature = alpha * u2 + beta * v2;
  return a0 * value + a1 * slope + a2 * curvature;
}

/** αL[u] + βL[v], the right-hand side of the linearity identity. */
export function linearSuperpositionValue(kind, u, v, alpha, beta, x) {
  if (!Number.isFinite(alpha) || !Number.isFinite(beta)) throw new RangeError('The coefficients must be finite');
  return alpha * linearOperatorValue(kind, u, x) + beta * linearOperatorValue(kind, v, x);
}

/** Residual L[αu + βv] − (αL[u] + βL[v]); zero for a linear operator. */
export function linearResidual(kind, u, v, alpha, beta, x) {
  const left = linearCombinationValue(kind, u, v, alpha, beta, x);
  const right = linearSuperpositionValue(kind, u, v, alpha, beta, x);
  return Number.isFinite(left) && Number.isFinite(right) ? left - right : NaN;
}

/** True when the function is defined at x. */
export function linearFunctionValid(id, x) {
  checkFunction(id);
  return Number.isFinite(x) && linearFunctionValue(id, x) === linearFunctionValue(id, x);
}

function sample(from, to, count, evaluate) {
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) throw new RangeError('Invalid sampling interval');
  const points = [];
  for (let i = 0; i <= count; i += 1) {
    const x = from + (to - from) * i / count;
    const y = evaluate(x);
    points.push(Number.isFinite(y) ? [x, y] : [NaN, NaN]);
  }
  return points;
}

/** Sample L[f] on [from, to]. */
export function linearFunctionSample(kind, id, from, to, count = 480) {
  checkOperator(kind);
  checkFunction(id);
  return sample(from, to, count, x => linearOperatorValue(kind, id, x));
}

/** Sample L[αu + βv] on [from, to]. */
export function linearCombinationSample(kind, u, v, alpha, beta, from, to, count = 480) {
  return sample(from, to, count, x => linearCombinationValue(kind, u, v, alpha, beta, x));
}

/** Sample αL[u] + βL[v] on [from, to]. */
export function linearSuperpositionSample(kind, u, v, alpha, beta, from, to, count = 480) {
  return sample(from, to, count, x => linearSuperpositionValue(kind, u, v, alpha, beta, x));
}

/** True when L[v] is zero at every sampled point; used by the workshop presets. */
export function linearIsHomogeneous(kind, id, from = -1, to = 1, count = 24) {
  checkOperator(kind);
  checkFunction(id);
  for (let i = 0; i <= count; i += 1) {
    const x = from + (to - from) * i / count;
    const value = linearOperatorValue(kind, id, x);
    if (!Number.isFinite(value) || Math.abs(value) > 1e-9) return false;
  }
  return true;
}

export const linearOperatorIds = Object.freeze([...OPERATORS]);
export const linearFunctionIds = Object.freeze([...FUNCTIONS]);
