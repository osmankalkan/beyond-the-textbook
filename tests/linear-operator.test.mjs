import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  linearCombinationValue,
  linearFunctionCurvature,
  linearFunctionDomain,
  linearFunctionIds,
  linearFunctionSlope,
  linearFunctionValid,
  linearFunctionValue,
  linearIsHomogeneous,
  linearOperatorIds,
  linearOperatorValue,
  linearResidual,
  linearSuperpositionValue
} from '../dist/models/linear-operator.js';
import {getLesson} from '../dist/content.js';

const close = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

test('Operator families reproduce their defining values', () => {
  close(linearOperatorValue('constant-distinct', 'exp3', 0), 2);
  close(linearOperatorValue('constant-distinct', 'exp', 0.7), 0);
  close(linearOperatorValue('constant-distinct', 'exp2', -0.4), 0);
  close(linearOperatorValue('constant-distinct', 'poly', 1.5), 2 - 9 + 4.5);
  close(linearOperatorValue('constant-osc', 'sin', 2.3), 0);
  close(linearOperatorValue('constant-osc', 'cos', -1.1), 0);
  close(linearOperatorValue('constant-osc', 'poly', 0.8), 0.64 + 2);
  close(linearOperatorValue('variable-x', 'exp', 1.3), 1.3 * Math.exp(1.3));
  close(linearOperatorValue('variable-x', 'const', 2.2), -1);
  close(linearOperatorValue('variable-x', 'log', 1), 0);
});

test('Analytic derivatives agree with finite differences', () => {
  const h = 1e-6;
  for (const id of ['exp', 'exp2', 'exp3', 'sin', 'cos', 'poly', 'const', 'log']) {
    for (const x of [0.3, 0.9, 1.7, 2.4]) {
      const numerical = (linearFunctionValue(id, x + h) - linearFunctionValue(id, x - h)) / (2 * h);
      close(numerical, linearFunctionSlope(id, x), 2e-5);
      const slopeNumerical = (linearFunctionSlope(id, x + h) - linearFunctionSlope(id, x - h)) / (2 * h);
      close(slopeNumerical, linearFunctionCurvature(id, x), 2e-5);
    }
  }
});

test('Linearity holds for every operator and function pair on the domain', () => {
  for (const kind of linearOperatorIds) {
    for (const u of linearFunctionIds) {
      for (const v of linearFunctionIds) {
        for (const x of [-0.7, 0.4, 1.6]) {
          if (!linearFunctionValid(u, x) || !linearFunctionValid(v, x)) continue;
          const left = linearCombinationValue(kind, u, v, 1.7, -0.6, x);
          const right = linearSuperpositionValue(kind, u, v, 1.7, -0.6, x);
          close(left, right, 1e-9);
          close(linearResidual(kind, u, v, 1.7, -0.6, x), 0, 1e-9);
        }
      }
    }
  }
});

test('Homogeneous test functions are detected and logarithms respect their domain', () => {
  assert.equal(linearIsHomogeneous('constant-distinct', 'exp'), true);
  assert.equal(linearIsHomogeneous('constant-distinct', 'exp2'), true);
  assert.equal(linearIsHomogeneous('constant-distinct', 'exp3'), false);
  assert.equal(linearIsHomogeneous('constant-osc', 'sin'), true);
  assert.equal(linearIsHomogeneous('constant-osc', 'cos'), true);
  assert.equal(linearIsHomogeneous('variable-x', 'exp'), false);
  assert.deepEqual(linearFunctionDomain('log'), [0, Infinity]);
  assert.equal(linearFunctionDomain('exp'), null);
  assert.equal(linearFunctionValid('log', 0), false);
  assert.ok(Number.isNaN(linearOperatorValue('constant-distinct', 'log', 0)));
  assert.throws(() => linearOperatorValue('missing', 'exp', 0), RangeError);
  assert.throws(() => linearOperatorValue('constant-distinct', 'missing', 0), RangeError);
  assert.throws(() => linearSuperpositionValue('constant-distinct', 'exp', 'exp', NaN, 1, 0), RangeError);
});

test('Section 4.1 has bilingual formulas, two study paths and four scored clinic cases', () => {
  const tr = getLesson('xie-2010:4.1', 'tr').lesson, en = getLesson('xie-2010:4.1', 'en').lesson;
  const blocks = p => [...readFileSync('dist/' + p, 'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
  const trBlocks = blocks(tr.lessonPath), enBlocks = blocks(en.lessonPath);
  assert.deepEqual(trBlocks, enBlocks);
  assert.equal(new Set(trBlocks).size, trBlocks.length);
  assert.equal(trBlocks.length, 18);
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
  assert.equal(tr.labFamily, 'operator');
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
  assert.match(readFileSync('dist/labs/operator/controller.js', 'utf8'), /export function mount/);
});

test('Section 4.1 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:4.1', 'tr').lesson, en = getLesson('xie-2010:4.1', 'en').lesson;
  assert.equal(tr.inlinePath, 'lessons/xie-2010/4-1/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath), enTokens = tokens(en.lessonPath);
  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
  assert.equal(new Set(trTokens).size, 85);
  const inline = JSON.parse(readFileSync('dist/' + tr.inlinePath, 'utf8'));
  assert.deepEqual(Object.keys(inline).sort(), [...new Set(trTokens)].sort());
  for (const math of Object.values(inline)) {
    assert.ok(!math.includes('display="block"'));
    assert.match(math, /<math[^>]*><mrow>/);
    assert.ok(!math.includes('&lt;mi&gt;'));
    assert.ok(!math.includes('|'), 'inline MathML must encode pipes as &#124; so tables keep their cells');
  }
});
