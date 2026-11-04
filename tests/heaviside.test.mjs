import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  heavisideFamilies,
  heavisideStep,
  heavisidePulse,
  heavisideConvergenceAbscissa,
  heavisideTimeFunction,
  heavisideIntegrand,
  heavisideExact,
  heavisideNumericalIntegral,
  heavisideMetrics,
  heavisideTimeCurves,
  heavisideSpectrumCurve
} from '../dist/models/heaviside.js';

test('Heaviside step and pulse functions evaluate correct piecewise values', () => {
  assert.equal(heavisideStep(0.5, 1.0), 0);
  assert.equal(heavisideStep(1.0, 1.0), 0.5);
  assert.equal(heavisideStep(1.5, 1.0), 1);

  assert.equal(heavisidePulse(0.5, 1.0, 3.0), 0);
  assert.equal(heavisidePulse(1.0, 1.0, 3.0), 0.5);
  assert.equal(heavisidePulse(2.0, 1.0, 3.0), 1);
  assert.equal(heavisidePulse(3.0, 1.0, 3.0), 0.5);
  assert.equal(heavisidePulse(3.5, 1.0, 3.0), 0);
});

test('Heaviside analytical transforms reproduce textbook formulas', () => {
  const s = 2.0;

  // 1. Step: c * H(t - a) -> c * e^(-as) / s
  const stepVal = heavisideExact('step', s, { a: 1.5, c: 2.0 });
  assert.ok(Math.abs(stepVal - (2.0 * Math.exp(-3.0)) / 2.0) < 1e-12);

  // 2. Pulse: c * [H(t - a) - H(t - b)] -> c * [e^(-as) - e^(-bs)] / s
  const pulseVal = heavisideExact('pulse', s, { a: 1.0, b: 2.0, c: 1.0 });
  const expectedPulse = (Math.exp(-2.0) - Math.exp(-4.0)) / 2.0;
  assert.ok(Math.abs(pulseVal - expectedPulse) < 1e-12);

  // 3. Delayed ramp: (t - a) * H(t - a) -> e^(-as) / s^2
  const rampVal = heavisideExact('delayed-ramp', s, { a: 2.0 });
  assert.ok(Math.abs(rampVal - Math.exp(-4.0) / 4.0) < 1e-12);

  // 4. Delayed exp: e^(-k(t - a)) * H(t - a) -> e^(-as) / (s + k)
  const expVal = heavisideExact('delayed-exp', s, { a: 1.0, k: 3.0 });
  assert.ok(Math.abs(expVal - Math.exp(-2.0) / 5.0) < 1e-12);

  // 5. Delayed sin: sin(omega(t - a)) * H(t - a) -> omega * e^(-as) / (s^2 + omega^2)
  const sinVal = heavisideExact('delayed-sin', s, { a: 1.0, omega: 2.0 });
  assert.ok(Math.abs(sinVal - (2.0 * Math.exp(-2.0)) / 8.0) < 1e-12);

  // 6. Unmatched exp (Example 6.8): e^(kt) * H(t - a) -> e^(-a(s - k)) / (s - k)
  const unmatchedVal = heavisideExact('unmatched-exp', 3.0, { a: 2.0, k: 1.0 });
  assert.ok(Math.abs(unmatchedVal - Math.exp(-2.0 * (3.0 - 1.0)) / (3.0 - 1.0)) < 1e-12);

  // 7. Staircase: H(t) + H(t - a) + H(t - 2a) -> (1 + e^(-as) + e^(-2as)) / s
  const stairVal = heavisideExact('staircase', s, { a: 1.0 });
  const expectedStair = (1 + Math.exp(-2.0) + Math.exp(-4.0)) / 2.0;
  assert.ok(Math.abs(stairVal - expectedStair) < 1e-12);
});

test('Numerical Simpson integral converges to theoretical Laplace transform as horizon T grows', () => {
  const s = 2.5;
  const T = 14.0;

  for (const family of heavisideFamilies()) {
    const exact = heavisideExact(family, s, { a: 1.0, b: 3.0, k: 0.5 });
    const numerical = heavisideNumericalIntegral(family, s, T, { a: 1.0, b: 3.0, k: 0.5 }, 800);
    assert.ok(Number.isFinite(exact), `${family} exact should be finite`);
    assert.ok(Number.isFinite(numerical), `${family} numerical should be finite`);
    const error = Math.abs(numerical - exact);
    assert.ok(error < 0.01, `${family} numerical error ${error} should be < 0.01 at T=${T}`);
  }
});

test('Convergence abscissa and metrics correctly identify boundaries', () => {
  assert.equal(heavisideConvergenceAbscissa('step'), 0);
  assert.equal(heavisideConvergenceAbscissa('unmatched-exp', { k: 2.5 }), 2.5);

  const mConvergent = heavisideMetrics('unmatched-exp', 3.0, 12.0, { a: 1.0, k: 2.0 });
  assert.equal(mConvergent.isConvergent, true);
  assert.ok(Number.isFinite(mConvergent.exactValue));
  assert.ok(mConvergent.relativeError < 0.02);

  const mDivergent = heavisideMetrics('unmatched-exp', 1.5, 12.0, { a: 1.0, k: 2.0 });
  assert.equal(mDivergent.isConvergent, false);
  assert.ok(Number.isNaN(mDivergent.exactValue));
});

test('Input validation rejects unknown families and non-finite arguments', () => {
  assert.throws(() => heavisideExact('nonexistent', 2), RangeError);
  assert.throws(() => heavisideExact('step', Infinity), RangeError);
  assert.throws(() => heavisideMetrics('step', NaN, 5), RangeError);
  assert.throws(() => heavisideTimeCurves('step', 1, -1), RangeError);
  assert.throws(() => heavisideNumericalIntegral('step', 1, 0), RangeError);
});

test('Time curves and spectrum curves generate valid series of data points', () => {
  const { fCurve, kernelCurve, integrandCurve } = heavisideTimeCurves('step', 2.0, 10.0, { a: 2.0 }, 50);
  assert.equal(fCurve.length, 50);
  assert.equal(kernelCurve.length, 50);
  assert.equal(integrandCurve.length, 50);

  // Before delay a = 2.0, f(t) should be 0
  assert.equal(fCurve[0].t, 0);
  assert.equal(fCurve[0].value, 0);
  assert.equal(integrandCurve[0].value, 0);

  const { s0, curve } = heavisideSpectrumCurve('step', 0, 5, { a: 1.0 }, 30);
  assert.equal(s0, 0);
  assert.equal(curve.length, 30);
  assert.ok(curve[0].s > 0);
  assert.ok(Number.isFinite(curve[0].value));
});

test('Section 6.2 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:6.2', 'tr').lesson;
  const en = getLesson('xie-2010:6.2', 'en').lesson;

  const blocks = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
  const trBlocks = blocks(tr.lessonPath);
  const enBlocks = blocks(en.lessonPath);

  assert.deepEqual(trBlocks, enBlocks);
  assert.equal(new Set(trBlocks).size, trBlocks.length);
  assert.equal(trBlocks.length, 24);

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
  assert.equal(tr.labFamily, 'heaviside');
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
  assert.match(readFileSync('dist/labs/heaviside/controller.js', 'utf8'), /export function mount/);
});

test('Section 6.2 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:6.2', 'tr').lesson;
  const en = getLesson('xie-2010:6.2', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/6-2/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath);
  const enTokens = tokens(en.lessonPath);

  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
  assert.equal(new Set(trTokens).size, 47);

  const inline = JSON.parse(readFileSync('dist/' + tr.inlinePath, 'utf8'));
  assert.deepEqual(Object.keys(inline).sort(), [...new Set(trTokens)].sort());
  for (const math of Object.values(inline)) {
    assert.ok(!math.includes('display="block"'));
    assert.match(math, /<math[^>]*><mrow>/);
  }
});
