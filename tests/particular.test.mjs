import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {
  particularCoefficients,
  particularComplementaryValue,
  particularDomain,
  particularFamilyIds,
  particularForcing,
  particularInitialX,
  particularOnlySample,
  particularOnlyValue,
  particularResidual,
  particularSample,
  particularSolveIVP,
  particularTotalCurvature,
  particularTotalSlope,
  particularTotalValue
} from '../dist/models/particular.js';
import {particularLesson} from '../dist/lessons/xie-2010/4-3/content.js';
import {deepLocalize} from '../dist/i18n.js';

const close = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

test('Particular families satisfy initial conditions, particular decomposition and differential equations', () => {
  assert.deepEqual(particularFamilyIds, ['exp-forcing', 'poly-resonance', 'shift-resonance', 'variation-log']);
  assert.deepEqual(particularCoefficients('exp-forcing'), [9, 0, 1]);
  assert.deepEqual(particularCoefficients('poly-resonance'), [0, 2, 1]);
  assert.deepEqual(particularCoefficients('shift-resonance'), [13, 4, 1]);
  assert.deepEqual(particularCoefficients('variation-log'), [1, -2, 1]);

  for (const kind of particularFamilyIds) {
    const x0 = particularInitialX(kind);
    const testPoints = kind === 'variation-log' ? [0.4, 0.8, 1.0, 1.4, 2.0] : [-0.8, -0.3, 0.0, 0.5, 1.1];
    for (const [y0, v0] of [[1, 0], [0, 2], [-1.2, 0.8], [0.5, -1.5]]) {
      close(particularTotalValue(kind, y0, v0, x0), y0);
      close(particularTotalSlope(kind, y0, v0, x0), v0);

      for (const x of testPoints) {
        close(particularResidual(kind, y0, v0, x), 0, 1e-8);
        const yTotal = particularTotalValue(kind, y0, v0, x);
        const yC = particularComplementaryValue(kind, y0, v0, x);
        const yP = particularOnlyValue(kind, x);
        close(yTotal, yC + yP, 1e-12);
      }
    }
  }
});

test('Analytical derivatives agree with central finite differences across all families', () => {
  const h = 1e-6;
  for (const kind of particularFamilyIds) {
    const xPoints = kind === 'variation-log' ? [0.5, 1.0, 1.6] : [-0.5, 0.2, 0.9];
    const y0 = 1.1, v0 = -0.6;
    for (const x of xPoints) {
      const numSlope = (particularTotalValue(kind, y0, v0, x + h) - particularTotalValue(kind, y0, v0, x - h)) / (2 * h);
      close(numSlope, particularTotalSlope(kind, y0, v0, x), 2e-5);
      const numCurv = (particularTotalSlope(kind, y0, v0, x + h) - particularTotalSlope(kind, y0, v0, x - h)) / (2 * h);
      close(numCurv, particularTotalCurvature(kind, y0, v0, x), 2e-5);
    }
  }
});

test('Variation of parameters domain validity and input validation', () => {
  assert.deepEqual(particularDomain('variation-log'), [0, Infinity]);
  assert.equal(particularDomain('exp-forcing'), null);
  assert.ok(Number.isNaN(particularForcing('variation-log', -0.5)));
  assert.ok(Number.isNaN(particularOnlyValue('variation-log', 0)));
  assert.ok(Number.isNaN(particularTotalValue('variation-log', 1, 0, -1)));

  const points = particularSample('variation-log', 0, 0, 0.2, 2.0, 20);
  assert.equal(points.length, 21);
  const pOnlyPoints = particularOnlySample('exp-forcing', -1, 1, 30);
  assert.equal(pOnlyPoints.length, 31);

  assert.throws(() => particularTotalValue('unknown', 1, 0, 0), RangeError);
  assert.throws(() => particularTotalValue('exp-forcing', NaN, 0, 0), RangeError);
  assert.throws(() => particularSample('exp-forcing', 1, 0, 2, 1), RangeError);
});

test('Section 4.3 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = deepLocalize(particularLesson, 'tr'), en = deepLocalize(particularLesson, 'en');
  const blocks = p => [...readFileSync('dist/' + p, 'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
  const trBlocks = blocks(tr.lessonPath), enBlocks = blocks(en.lessonPath);
  assert.deepEqual(trBlocks, enBlocks);
  assert.equal(new Set(trBlocks).size, trBlocks.length);
  assert.equal(trBlocks.length, 25);
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
  assert.equal(tr.labFamily, 'particular');
  assert.equal(tr.studySupport.paths.length, 2);
  for (const path of tr.studySupport.paths) assert.equal(path.steps.length, 5);
  assert.equal(tr.studySupport.predictions.length, 2);
  assert.equal(tr.guidedTools.examClinic.length, 4);
  for (const item of tr.guidedTools.examClinic) {
    assert.ok(item.statement && item.trap);
    assert.equal(item.steps.length, 5);
    assert.match(item.badge, /PUAN/);
  }
  if (existsSync('dist/' + tr.mathPath)) {
    const mapping = JSON.parse(readFileSync('dist/' + tr.mathPath, 'utf8'));
    assert.deepEqual(Object.keys(mapping), trBlocks);
    for (const math of Object.values(mapping)) assert.match(math, /<math[^>]*><mrow>/);
  }
  assert.match(readFileSync('dist/labs/particular/controller.js', 'utf8'), /export function mount/);
});

test('Section 4.3 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = deepLocalize(particularLesson, 'tr'), en = deepLocalize(particularLesson, 'en');
  assert.equal(tr.inlinePath, 'lessons/xie-2010/4-3/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath), enTokens = tokens(en.lessonPath);
  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
  assert.equal(new Set(trTokens).size, 156);
});
