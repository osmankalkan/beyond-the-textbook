import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  laplaceFamilies,
  laplaceConvergenceAbscissa,
  laplaceTimeFunction,
  laplaceIntegrand,
  laplaceExact,
  laplaceNumericalIntegral,
  laplaceMetrics,
  laplaceTimeCurves,
  laplaceSpectrumCurve
} from '../dist/models/laplace.js';
import { getLesson } from '../dist/content.js';

test('Laplace analytical transforms reproduce textbook formulas', () => {
  // 1. Constant f(t) = 1 -> 1/s
  assert.equal(laplaceExact('constant', 2, { c: 1 }), 0.5);

  // 2. Exponential f(t) = e^(at) -> 1/(s - a)
  assert.equal(laplaceExact('exponential', 3, { a: 1 }), 0.5);
  assert.equal(laplaceExact('exponential', 4, { a: 2 }), 0.5);
  // Divergence check
  assert.ok(Number.isNaN(laplaceExact('exponential', 1, { a: 1 })));
  assert.ok(Number.isNaN(laplaceExact('exponential', 0.5, { a: 1 })));

  // 3. Sine f(t) = sin(wt) -> w / (s^2 + w^2)
  const sinVal = laplaceExact('sine', 3, { omega: 2 });
  assert.ok(Math.abs(sinVal - 2 / 13) < 1e-12);

  // 4. Cosine f(t) = cos(wt) -> s / (s^2 + w^2)
  const cosVal = laplaceExact('cosine', 3, { omega: 2 });
  assert.ok(Math.abs(cosVal - 3 / 13) < 1e-12);

  // 5. Damped sine f(t) = e^(at) sin(wt) -> w / ((s - a)^2 + w^2)
  const dampedVal = laplaceExact('damped-sine', 2, { a: -1, omega: 2 });
  assert.ok(Math.abs(dampedVal - 2 / 13) < 1e-12);

  // 6. t sin(wt) -> 2ws / (s^2 + w^2)^2
  const tSinVal = laplaceExact('t-sine', 2, { omega: 1 });
  assert.ok(Math.abs(tSinVal - 4 / 25) < 1e-12);

  // 7. Polynomial t^n -> n! / s^(n+1)
  const polyVal = laplaceExact('polynomial', 2, { n: 3 });
  assert.ok(Math.abs(polyVal - 6 / 16) < 1e-12);
});

test('Numerical Simpson integral converges to theoretical Laplace transform as horizon T grows', () => {
  const s = 2.5;
  const T = 12.0;

  for (const family of laplaceFamilies()) {
    const exact = laplaceExact(family, s);
    const numerical = laplaceNumericalIntegral(family, s, T, {}, 800);
    assert.ok(Number.isFinite(exact), `${family} exact should be finite`);
    assert.ok(Number.isFinite(numerical), `${family} numerical should be finite`);
    const error = Math.abs(numerical - exact);
    assert.ok(error < 0.005, `${family} numerical integral error ${error} should be < 0.005 at T=${T}`);
  }
});

test('Convergence abscissa and metrics correctly identify convergence boundaries', () => {
  assert.equal(laplaceConvergenceAbscissa('constant'), 0);
  assert.equal(laplaceConvergenceAbscissa('exponential', { a: 1.5 }), 1.5);
  assert.equal(laplaceConvergenceAbscissa('damped-sine', { a: -2.0 }), -2.0);

  const mConvergent = laplaceMetrics('exponential', 2.0, 10.0, { a: 1.0 });
  assert.equal(mConvergent.isConvergent, true);
  assert.ok(Number.isFinite(mConvergent.exactValue));
  assert.ok(mConvergent.relativeError < 0.01);

  const mDivergent = laplaceMetrics('exponential', 0.5, 10.0, { a: 1.0 });
  assert.equal(mDivergent.isConvergent, false);
  assert.ok(Number.isNaN(mDivergent.exactValue));
});

test('Input validation rejects unknown families and non-finite arguments', () => {
  assert.throws(() => laplaceExact('nonexistent', 2), RangeError);
  assert.throws(() => laplaceExact('sine', Infinity), RangeError);
  assert.throws(() => laplaceMetrics('sine', NaN, 5), RangeError);
  assert.throws(() => laplaceTimeCurves('sine', 1, -1), RangeError);
});

test('Time curves and spectrum curves generate valid series of data points', () => {
  const { fCurve, kernelCurve, integrandCurve } = laplaceTimeCurves('sine', 2.0, 10.0, { omega: 1.5 }, 50);
  assert.equal(fCurve.length, 50);
  assert.equal(kernelCurve.length, 50);
  assert.equal(integrandCurve.length, 50);
  assert.equal(fCurve[0].t, 0);
  assert.equal(fCurve[0].value, 0); // sin(0) = 0
  assert.equal(kernelCurve[0].value, 1); // e^(-2*0) = 1

  const { s0, curve } = laplaceSpectrumCurve('exponential', 0, 5, { a: 0.5 }, 30);
  assert.equal(s0, 0.5);
  assert.equal(curve.length, 30);
  assert.ok(curve[0].s > 0.5);
  assert.ok(Number.isFinite(curve[0].value));
});

test('Section 6.1 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:6.1', 'tr').lesson;
  const en = getLesson('xie-2010:6.1', 'en').lesson;

  const blocks = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
  const trBlocks = blocks(tr.lessonPath);
  const enBlocks = blocks(en.lessonPath);

  assert.deepEqual(trBlocks, enBlocks);
  assert.equal(new Set(trBlocks).size, trBlocks.length);
  assert.equal(trBlocks.length, 23);

  assert.equal(tr.questions.length, 12);
  assert.equal(en.questions.length, 12);
  for (const lesson of [tr, en]) {
    for (const question of lesson.questions) {
      assert.equal(question.choices.length, 3);
      assert.ok(Number.isInteger(question.answer));
      assert.ok(question.feedback && question.hints.length >= 2);
    }
  }

  const clinicPoints = tr.guidedTools.examClinic.reduce((total, item) => total + Number(item.badge.match(/\d+/)[0]), 0);
  assert.equal(clinicPoints, 22);
  assert.match(tr.presentation.practiceIntro, /22 puan/);
  assert.equal(tr.labFamily, 'laplace');
  assert.equal(tr.studySupport.paths.length, 2);
  for (const path of tr.studySupport.paths) assert.equal(path.steps.length, 5);
  assert.equal(tr.studySupport.predictions.length, 2);

  assert.equal(tr.guidedTools.examClinic.length, 4);
  for (const item of tr.guidedTools.examClinic) {
    assert.ok(item.statement && item.trap);
    assert.equal(item.steps.length, 5);
    assert.match(item.badge, /PUAN/);
  }

  const mapping = JSON.parse(readFileSync('dist/' + tr.mathPath, 'utf8'));
  assert.deepEqual(Object.keys(mapping), trBlocks);
  for (const math of Object.values(mapping)) assert.match(math, /<math[^>]*><mrow>/);
  assert.match(readFileSync('dist/labs/laplace/controller.js', 'utf8'), /export function mount/);
});

test('Section 6.1 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:6.1', 'tr').lesson;
  const en = getLesson('xie-2010:6.1', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/6-1/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath);
  const enTokens = tokens(en.lessonPath);

  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
  assert.equal(new Set(trTokens).size, 88);

  const inline = JSON.parse(readFileSync('dist/' + tr.inlinePath, 'utf8'));
  assert.deepEqual(Object.keys(inline).sort(), [...new Set(trTokens)].sort());
  for (const math of Object.values(inline)) {
    assert.ok(!math.includes('display="block"'));
    assert.match(math, /<math[^>]*><mrow>/);
    assert.ok(!math.includes('&lt;mi&gt;'));
    assert.ok(!math.includes('|'), 'inline MathML must encode pipes as &#124; so tables keep their cells');
  }
});
