import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  reductionConstant,
  reductionDerivative,
  reductionDomain,
  reductionPoint,
  reductionResidual,
  reductionSample,
  reductionSecondDerivative,
  reductionValid,
  reductionValue
} from '../dist/models/reduction.js';
import {getLesson} from '../dist/content.js';

const close = (actual, expected, tolerance = 1e-6) =>
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected} (tol ${tolerance})`);

test('Reduction families fix their parameter, derivative, second derivative and residual', () => {
  // 1. Immediate: y'' = 6x, y = x^3 + Cx + 1
  close(reductionConstant('immediate', 2), 2);
  close(reductionValue('immediate', 1, 2), 1 + 2 + 1); // 4
  close(reductionDerivative('immediate', 1, 2), 3 * 1 + 2); // 5
  close(reductionSecondDerivative('immediate', 1, 2), 6 * 1); // 6
  close(reductionResidual('immediate', 1, 2), 0);

  // 2. Missing-y: 2y'' = (y')^3 sin 2x, y = ln|sec x + tan x| + C
  close(reductionValue('missing-y', 0, 1), 1);
  close(reductionDerivative('missing-y', 0, 1), 1); // sec(0) = 1
  close(reductionSecondDerivative('missing-y', 0, 1), 0); // sec(0) tan(0) = 0
  close(reductionResidual('missing-y', 0.5, 1), 0, 1e-5);

  // 3. Missing-x: y'' + (y')^2 = 0, y = ln(Cx + 1)
  close(reductionValue('missing-x', 1, 1), Math.log(2));
  close(reductionDerivative('missing-x', 1, 1), 0.5);
  close(reductionSecondDerivative('missing-x', 1, 1), -0.25);
  close(reductionResidual('missing-x', 1, 1), 0);
});

test('Reduction parameter validity and domains respect branch boundaries', () => {
  assert.equal(reductionValid('immediate', 0), true);
  assert.equal(reductionValid('missing-y', 0), true);
  assert.equal(reductionValid('missing-x', 0), true);
  assert.equal(reductionValid('immediate', Infinity), false);
  assert.throws(() => reductionConstant('unknown', 1), RangeError);
  assert.throws(() => reductionConstant('immediate', NaN), RangeError);

  const [yMin, yMax] = reductionDomain('missing-y', 1);
  assert.ok(yMin > -Math.PI / 2);
  assert.ok(yMax < Math.PI / 2);
  assert.ok(Number.isNaN(reductionValue('missing-y', 2, 1)));

  const [xMin, xMax] = reductionDomain('missing-x', 1);
  assert.ok(xMin > -1);
  assert.ok(Number.isNaN(reductionValue('missing-x', -2, 1)));
});

test('Every analytic reduction family satisfies its ODE on the valid domain', () => {
  const cases = [
    ['immediate', 1.5, 0.4],
    ['missing-y', 0.8, 0.5],
    ['missing-x', 2.0, 0.6]
  ];
  for (const [kind, c, x] of cases) {
    const res = reductionResidual(kind, x, c);
    close(res, 0, 1e-4);

    // Numerical derivative check
    const h = 1e-6;
    const y0 = reductionValue(kind, x - h, c);
    const y1 = reductionValue(kind, x + h, c);
    const numDeriv = (y1 - y0) / (2 * h);
    close(numDeriv, reductionDerivative(kind, x, c), 1e-4);
  }

  const samples = reductionSample('immediate', 1, -2, 2, 50);
  assert.equal(samples.length, 51);
  assert.ok(samples.every(pt => pt.every(Number.isFinite)));
});

test('Section 2.6 has bilingual formulas, two study paths and four scored clinic cases', () => {
  const tr = getLesson('xie-2010:2.6', 'tr').lesson;
  const en = getLesson('xie-2010:2.6', 'en').lesson;

  const blocks = p => [...readFileSync('dist/' + p, 'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
  const trBlocks = blocks(tr.lessonPath);
  const enBlocks = blocks(en.lessonPath);
  assert.deepEqual(trBlocks, enBlocks);
  assert.equal(new Set(trBlocks).size, trBlocks.length);
  assert.equal(trBlocks.length, 57);

  assert.equal(tr.questions.length, 11);
  assert.equal(en.questions.length, 11);
  assert.equal(tr.labFamily, 'reduction');
  assert.equal(tr.studySupport.paths.length, 2);
  for (const path of tr.studySupport.paths) {
    assert.equal(path.steps.length, 5);
  }
  assert.equal(tr.studySupport.predictions.length, 2);
  assert.equal(tr.guidedTools.examClinic.length, 4);
  for (const item of tr.guidedTools.examClinic) {
    assert.ok(item.statement && item.trap);
    assert.equal(item.steps.length, 5);
    assert.match(item.badge, /5 PUAN/);
  }

  const mapping = JSON.parse(readFileSync('dist/' + tr.mathPath, 'utf8'));
  assert.deepEqual(Object.keys(mapping), trBlocks);
  for (const math of Object.values(mapping)) {
    assert.match(math, /<math[^>]*><mrow>/);
  }
});

test('Section 2.6 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:2.6', 'tr').lesson;
  const en = getLesson('xie-2010:2.6', 'en').lesson;
  assert.equal(tr.inlinePath, 'lessons/xie-2010/2-6/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath);
  const enTokens = tokens(en.lessonPath);
  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
});
