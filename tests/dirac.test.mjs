import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  diracFamilies,
  diracPulseRect,
  diracGaussian,
  diracLaplaceExact,
  diracNumericalSifting,
  diracMetrics,
  diracTimeCurves,
  diracSpectrumCurve
} from '../dist/models/dirac.js';

test('Dirac rectangular pulse maintains constant impulse area as epsilon vanishes', () => {
  const I = 2.5;
  const a = 1.0;

  for (const eps of [1.0, 0.5, 0.1, 0.01]) {
    assert.equal(diracPulseRect(0.5, a, eps, I), 0);
    assert.equal(diracPulseRect(a + 0.5 * eps, a, eps, I), I / eps);
    assert.equal(diracPulseRect(a + 2.0 * eps, a, eps, I), 0);
  }
});

test('Gaussian pulse evaluates symmetric peak centered at delay a', () => {
  const a = 2.0;
  const sigma = 0.2;
  const peak = diracGaussian(a, a, sigma, 1.0);
  const left = diracGaussian(a - sigma, a, sigma, 1.0);
  const right = diracGaussian(a + sigma, a, sigma, 1.0);

  assert.ok(peak > left);
  assert.ok(Math.abs(left - right) < 1e-12);
  assert.ok(Math.abs(left - peak * Math.exp(-0.5)) < 1e-12);
});

test('Finite pulse Laplace transform converges to theoretical delta transform e^(-as) as epsilon -> 0', () => {
  const s = 1.5;
  const a = 2.0;
  const I = 1.0;
  const ideal = Math.exp(-a * s);

  let prevError = Infinity;
  for (const eps of [0.5, 0.1, 0.02, 0.005]) {
    const val = diracLaplaceExact('rect-pulse', s, { a, eps, I });
    const error = Math.abs(val - ideal);
    assert.ok(error < prevError, `Error should decrease as eps decreases: ${error} < ${prevError}`);
    prevError = error;
  }
  assert.ok(prevError < 0.01);
});

test('Numerical sifting integral converges to g(a)', () => {
  const a = 1.5;
  const g = t => Math.exp(-0.5 * t) * Math.sin(3.0 * t);
  const expected = g(a);

  for (const eps of [0.1, 0.01, 0.001]) {
    const approx = diracNumericalSifting(g, a, eps, 300);
    assert.ok(Math.abs(approx - expected) < 0.02);
  }
});

test('Example 6.10 multi-impulse reproduces unilateral transform omitting t < 0 impulses', () => {
  const s = 2.0;
  // F(s) = e^(-2s) + 14 * e^12 * e^(-3s)
  const exact = diracLaplaceExact('multi-impulse', s, { c2: 1.0, a2: 2.0, c3: 14.0 * Math.exp(12), a3: 3.0 });
  const expected = Math.exp(-4.0) + 14.0 * Math.exp(12) * Math.exp(-6.0);
  assert.ok(Math.abs(exact - expected) < 1e-6);
});

test('Dirac metrics and input validation reject non-positive parameters', () => {
  assert.throws(() => diracPulseRect(1.0, 1.0, -0.1), RangeError);
  assert.throws(() => diracGaussian(1.0, 1.0, 0), RangeError);
  assert.throws(() => diracLaplaceExact('unknown', 1.0), RangeError);
  assert.throws(() => diracLaplaceExact('rect-pulse', 1.0, { eps: -0.2 }), RangeError);

  const m = diracMetrics('rect-pulse', 1.0, { a: 1.0, eps: 0.1, I: 2.0 });
  assert.equal(m.peakHeight, 20.0);
  assert.ok(m.relativeDiff < 0.1);
});

test('Time curves and spectrum curves generate valid series of data points', () => {
  const { rectCurve, gaussCurve, stepCurve } = diracTimeCurves('rect-pulse', { a: 1.0, eps: 0.2 }, 5.0, 100);
  assert.equal(rectCurve.length, 100);
  assert.equal(gaussCurve.length, 100);
  assert.equal(stepCurve.length, 100);

  // Before delay a = 1.0, cumulative step should be 0, after a + eps it should be 1.0
  assert.equal(stepCurve[0].value, 0);
  assert.equal(stepCurve[99].value, 1.0);

  const { idealCurve, finiteCurve } = diracSpectrumCurve('rect-pulse', { a: 1.0, eps: 0.2 }, 0.5, 4.0, 40);
  assert.equal(idealCurve.length, 40);
  assert.equal(finiteCurve.length, 40);
  assert.ok(idealCurve[0].value > 0);
  assert.ok(finiteCurve[0].value > 0);
});

test('Section 6.3 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:6.3', 'tr').lesson;
  const en = getLesson('xie-2010:6.3', 'en').lesson;

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
  assert.equal(tr.labFamily, 'dirac');
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
  assert.match(readFileSync('dist/labs/dirac/controller.js', 'utf8'), /export function mount/);
});

test('Section 6.3 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:6.3', 'tr').lesson;
  const en = getLesson('xie-2010:6.3', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/6-3/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath);
  const enTokens = tokens(en.lessonPath);

  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
  assert.equal(new Set(trTokens).size, 26);

  const inline = JSON.parse(readFileSync('dist/' + tr.inlinePath, 'utf8'));
  assert.deepEqual(Object.keys(inline).sort(), [...new Set(trTokens)].sort());
  for (const math of Object.values(inline)) {
    assert.ok(!math.includes('display="block"'));
    assert.match(math, /<math[^>]*><mrow>/);
  }
});
