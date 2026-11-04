import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {
  complementaryCoefficients,
  complementaryCurvature,
  complementaryFamilyIds,
  complementaryResidual,
  complementarySample,
  complementarySlope,
  complementarySolveIVP,
  complementaryValue
} from '../dist/models/complementary.js';
import {complementaryLesson} from '../dist/lessons/xie-2010/4-2/content.js';
import {deepLocalize} from '../dist/i18n.js';

const close = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

test('Complementary families satisfy initial conditions and their differential equations', () => {
  assert.deepEqual(complementaryFamilyIds, ['distinct-real', 'hyperbolic-pair', 'damped-complex', 'repeated-double']);
  assert.deepEqual(complementaryCoefficients('distinct-real'), [2, -3, 1]);
  assert.deepEqual(complementaryCoefficients('hyperbolic-pair'), [-4, 0, 1]);
  assert.deepEqual(complementaryCoefficients('damped-complex'), [5, 2, 1]);
  assert.deepEqual(complementaryCoefficients('repeated-double'), [4, -4, 1]);

  for (const kind of complementaryFamilyIds) {
    for (const [y0, v0] of [[1, 0], [0, 2], [-1.3, 1.7], [0.8, -2.4]]) {
      close(complementaryValue(kind, y0, v0, 0), y0);
      close(complementarySlope(kind, y0, v0, 0), v0);
      for (const x of [-0.9, -0.3, 0, 0.4, 1.1]) {
        close(complementaryResidual(kind, y0, v0, x), 0, 1e-9);
      }
    }
  }
});

test('Analytical derivatives agree with central finite differences across all families', () => {
  const h = 1e-6;
  for (const kind of complementaryFamilyIds) {
    for (const x of [-0.6, 0.2, 0.7, 1.3]) {
      const y0 = 1.2, v0 = -0.7;
      const numSlope = (complementaryValue(kind, y0, v0, x + h) - complementaryValue(kind, y0, v0, x - h)) / (2 * h);
      close(numSlope, complementarySlope(kind, y0, v0, x), 2e-5);
      const numCurv = (complementarySlope(kind, y0, v0, x + h) - complementarySlope(kind, y0, v0, x - h)) / (2 * h);
      close(numCurv, complementaryCurvature(kind, y0, v0, x), 2e-5);
    }
  }
});

test('Mode-isolating initial data and input validation work as expected', () => {
  assert.deepEqual(complementarySolveIVP('distinct-real', 1, 2), {c1: 0, c2: 1, labels: ['C₁', 'C₂']});
  close(complementaryValue('distinct-real', 1, 2, 0.5), Math.exp(1));
  assert.deepEqual(complementarySolveIVP('hyperbolic-pair', 1, 0), {c1: 1, c2: 0, labels: ['A', 'B']});
  close(complementaryValue('hyperbolic-pair', 1, 0, 0.5), Math.cosh(1));
  assert.deepEqual(complementarySolveIVP('damped-complex', 0, 2), {c1: 0, c2: 1, labels: ['A', 'B']});
  close(complementaryValue('damped-complex', 0, 2, Math.PI / 4), Math.exp(-Math.PI / 4));
  assert.deepEqual(complementarySolveIVP('repeated-double', 0, 1), {c1: 0, c2: 1, labels: ['C₀', 'C₁']});
  close(complementaryValue('repeated-double', 0, 1, 0.5), 0.5 * Math.exp(1));

  const points = complementarySample('damped-complex', 1, 1, 0, 2, 20);
  assert.equal(points.length, 21);
  assert.throws(() => complementaryValue('unknown', 1, 0, 0), RangeError);
  assert.throws(() => complementaryValue('distinct-real', NaN, 0, 0), RangeError);
  assert.throws(() => complementarySample('distinct-real', 1, 0, 2, 1), RangeError);
});

test('Section 4.2 has bilingual formulas, two study paths, four clinic cases and eleven questions', () => {
  const tr = deepLocalize(complementaryLesson, 'tr'), en = deepLocalize(complementaryLesson, 'en');
  const blocks = p => [...readFileSync('dist/' + p, 'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
  const trBlocks = blocks(tr.lessonPath), enBlocks = blocks(en.lessonPath);
  assert.deepEqual(trBlocks, enBlocks);
  assert.equal(new Set(trBlocks).size, trBlocks.length);
  assert.equal(trBlocks.length, 40);
  assert.equal(tr.questions.length, 11);
  assert.equal(en.questions.length, 11);
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
  assert.equal(tr.labFamily, 'complementary');
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
  assert.match(readFileSync('dist/labs/complementary/controller.js', 'utf8'), /export function mount/);
});

test('Section 4.2 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = deepLocalize(complementaryLesson, 'tr'), en = deepLocalize(complementaryLesson, 'en');
  assert.equal(tr.inlinePath, 'lessons/xie-2010/4-2/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath), enTokens = tokens(en.lessonPath);
  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
  assert.equal(new Set(trTokens).size, 159);
  if (existsSync('dist/' + tr.inlinePath)) {
    const inline = JSON.parse(readFileSync('dist/' + tr.inlinePath, 'utf8'));
    assert.deepEqual(Object.keys(inline).sort(), [...new Set(trTokens)].sort());
    for (const math of Object.values(inline)) {
      assert.ok(!math.includes('display="block"'));
      assert.match(math, /<math[^>]*><mrow>/);
      assert.ok(!math.includes('&lt;mi&gt;'));
      assert.ok(!math.includes('|'), 'inline MathML must encode pipes as &#124; so tables keep their cells');
    }
  }
});
