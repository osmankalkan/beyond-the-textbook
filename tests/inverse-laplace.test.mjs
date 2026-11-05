import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  inverseFamilies,
  inverseLaplaceExact,
  numericalConvolution,
  forwardTransferFunction,
  inverseMetrics,
  inverseTimeCurves,
  inverseFrequencyCurve
} from '../dist/models/inverse-laplace.js';

test('Inverse Laplace exact evaluations reproduce textbook examples', () => {
  // 1. Example 6.11: s / (s - 2)^5 at t = 1
  // f(t) = e^(2t) * [t^3 / 6 + 2 * t^4 / 24] = e^2 * [1/6 + 2/24] = e^2 * (1/4)
  const val611 = inverseLaplaceExact('repeated-linear', 1.0, { a: 2.0 });
  const expected611 = 0.25 * Math.exp(2.0);
  assert.ok(Math.abs(val611 - expected611) < 1e-12);

  // 2. Example 6.12: (1 + e^(-3s)) / s^4 at t = 2 (before delay) and t = 4 (after delay)
  const val612Before = inverseLaplaceExact('delayed-power', 2.0, { a: 3.0 });
  assert.ok(Math.abs(val612Before - 8.0 / 6.0) < 1e-12);
  const val612After = inverseLaplaceExact('delayed-power', 4.0, { a: 3.0 });
  assert.ok(Math.abs(val612After - (64.0 / 6.0 + 1.0 / 6.0)) < 1e-12);

  // 3. Example 6.13: s / (s^2 + 4)^2 -> (t / 4) * sin 2t
  const val613 = inverseLaplaceExact('quadratic-resonance', 2.0, { omega: 2.0 });
  assert.ok(Math.abs(val613 - 0.5 * Math.sin(4.0)) < 1e-12);

  // 4. Example 6.14: 4 / ((s - 1)(s^2 + 2s + 5)) -> e^t - e^(-t)*(sin 2t + cos 2t)
  const val614 = inverseLaplaceExact('damped-quadratic', 1.5);
  const exp614 = Math.exp(1.5) - Math.exp(-1.5) * (Math.sin(3.0) + Math.cos(3.0));
  assert.ok(Math.abs(val614 - exp614) < 1e-12);

  // 5. Example 6.15: (s + 1) / ((s^2 + 1)(s^2 + 9)) -> (1/8)*(cos t + sin t - cos 3t - 1/3 sin 3t)
  const val615 = inverseLaplaceExact('bi-harmonic', 1.0);
  const exp615 = (1.0 / 8.0) * (Math.cos(1.0) + Math.sin(1.0) - Math.cos(3.0) - (1.0 / 3.0) * Math.sin(3.0));
  assert.ok(Math.abs(val615 - exp615) < 1e-12);
});

test('Numerical Simpson convolution converges to analytical convolution theorem result', () => {
  const f = u => Math.sin(u);
  const g = v => Math.cos(2.0 * v);
  const t = 2.5;

  const numVal = numericalConvolution(f, g, t, 300);
  const exactVal = inverseLaplaceExact('convolution-pair', t);

  assert.ok(Math.abs(numVal - exactVal) < 1e-4);
});

test('Linear distinct family handles equal roots smoothly as limit t * e^(at)', () => {
  const t = 1.5;
  const valDistinct = inverseLaplaceExact('linear-distinct', t, { a: 1.0001, b: 1.0, c: 1.0 });
  const valEqual = inverseLaplaceExact('linear-distinct', t, { a: 1.0, b: 1.0, c: 1.0 });

  assert.ok(Math.abs(valEqual - t * Math.exp(t)) < 1e-12);
  assert.ok(Math.abs(valDistinct - valEqual) < 1e-3);
});

test('Pole identification and metric summary describe structural resonance and damping', () => {
  const mRes = inverseMetrics('quadratic-resonance', { omega: 3.0 });
  assert.match(mRes.description, /Rezonans/);

  const mDamped = inverseMetrics('damped-quadratic');
  assert.equal(mDamped.poles.length, 2);

  const mBi = inverseMetrics('bi-harmonic');
  assert.equal(mBi.poles.length, 2);
});

test('Input validation rejects negative horizons and invalid families', () => {
  assert.throws(() => inverseLaplaceExact('nonexistent', 1.0), RangeError);
  assert.throws(() => forwardTransferFunction('invalid', 1.0), RangeError);
  assert.throws(() => inverseTimeCurves('bi-harmonic', {}, -1.0), RangeError);
});

test('Time curve and frequency curve series evaluate continuous points', () => {
  const timePts = inverseTimeCurves('bi-harmonic', {}, 6.0, 50);
  assert.equal(timePts.length, 50);
  assert.equal(timePts[0].t, 0);

  const sPts = inverseFrequencyCurve('bi-harmonic', {}, 0.5, 5.0, 30);
  assert.equal(sPts.length, 30);
  assert.ok(Number.isFinite(sPts[0].value));
});

test('Section 6.4 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:6.4', 'tr').lesson;
  const en = getLesson('xie-2010:6.4', 'en').lesson;

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
  assert.equal(tr.labFamily, 'inverse-laplace');
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
  assert.match(readFileSync('dist/labs/inverse-laplace/controller.js', 'utf8'), /export function mount/);
});

test('Section 6.4 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:6.4', 'tr').lesson;
  const en = getLesson('xie-2010:6.4', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/6-4/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath);
  const enTokens = tokens(en.lessonPath);

  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
  assert.equal(new Set(trTokens).size, 8);

  const inline = JSON.parse(readFileSync('dist/' + tr.inlinePath, 'utf8'));
  assert.deepEqual(Object.keys(inline).sort(), [...new Set(trTokens)].sort());
  for (const math of Object.values(inline)) {
    assert.ok(!math.includes('display="block"'));
    assert.match(math, /<math[^>]*><mrow>/);
  }
});
