import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  laplaceOdeFamilies,
  laplaceOdeExact,
  laplaceOdeRK4,
  laplaceOdeMetrics,
  laplaceOdeTimeCurves
} from '../dist/models/laplace-ode.js';

test('Initial conditions are strictly satisfied across ODE families', () => {
  // 1. Second-order resonance: y(0) = y0 = 2.5
  const res0 = laplaceOdeExact('second-order-resonance', 0, { y0: 2.5, v0: 3.0 });
  assert.equal(res0.total, 2.5);
  assert.equal(res0.free, 2.5);
  assert.equal(res0.forced, 0);

  // 2. Discontinuous step: y(0) = 1.0
  const step0 = laplaceOdeExact('discontinuous-step', 0, { y0: 1.0, a: 2.0 });
  assert.equal(step0.total, 1.0);
  assert.equal(step0.free, 1.0);
  assert.equal(step0.forced, 0);

  // 3. Third-order delayed: y(0) = 5.0
  const third0 = laplaceOdeExact('third-order-delayed', 0);
  assert.equal(third0.total, 5.0); // 6 * 1 - 1 - 0 = 5.0
  assert.equal(third0.free, 5.0);
  assert.equal(third0.forced, 0);
});

test('Analytical solution agrees with independent RK4 numerical integration', () => {
  // Discontinuous step: y'' + 4y = 8 H(t - 1.5), y(0) = 1
  const a = 1.5;
  const traj = laplaceOdeRK4('discontinuous-step', { y0: 1.0, a }, 5.0, 500);

  for (const pt of [traj[100], traj[250], traj[400]]) {
    const exact = laplaceOdeExact('discontinuous-step', pt.t, { y0: 1.0, a });
    const diff = Math.abs(pt.y - exact.total);
    assert.ok(diff < 0.05, `RK4 discrepancy ${diff} at t=${pt.t} should be < 0.05`);
  }
});

test('Discontinuous forcing stays zero prior to trigger time a', () => {
  const a = 2.0;
  const before1 = laplaceOdeExact('discontinuous-step', 1.0, { a });
  assert.equal(before1.forced, 0);

  const after1 = laplaceOdeExact('discontinuous-step', 3.0, { a });
  assert.ok(Math.abs(after1.forced) > 0);
});

test('Metrics summarize ODE characteristics and distinct roots', () => {
  const m = laplaceOdeMetrics('second-order-resonance');
  assert.match(m.odeString, /25y/);
  assert.match(m.characteristicRoots, /Rezonans/);

  const mStep = laplaceOdeMetrics('discontinuous-step');
  assert.match(mStep.advantage, /stitching/);
});

test('Input validation rejects negative horizons and unknown families', () => {
  assert.throws(() => laplaceOdeExact('unknown', 1.0), RangeError);
  assert.throws(() => laplaceOdeTimeCurves('second-order-resonance', {}, -2.0), RangeError);
});

test('Time curves generate continuous series for total, free and forced parts', () => {
  const { totalCurve, freeCurve, forcedCurve } = laplaceOdeTimeCurves('discontinuous-step', { a: 1.5 }, 6.0, 60);
  assert.equal(totalCurve.length, 60);
  assert.equal(freeCurve.length, 60);
  assert.equal(forcedCurve.length, 60);

  assert.equal(totalCurve[0].t, 0);
  assert.equal(forcedCurve[0].value, 0);
});

test('Section 6.5 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:6.5', 'tr').lesson;
  const en = getLesson('xie-2010:6.5', 'en').lesson;

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
  assert.equal(tr.labFamily, 'laplace-ode');
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
  assert.match(readFileSync('dist/labs/laplace-ode/controller.js', 'utf8'), /export function mount/);
});

test('Section 6.5 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:6.5', 'tr').lesson;
  const en = getLesson('xie-2010:6.5', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/6-5/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath);
  const enTokens = tokens(en.lessonPath);

  const inlineMap = JSON.parse(readFileSync('dist/' + tr.inlinePath, 'utf8'));
  for (const token of [...trTokens, ...enTokens]) {
    assert.ok(inlineMap[token], `missing inline math for: ${token}`);
    assert.match(inlineMap[token], /<math[^>]*><mrow>/);
  }

  for (const path of [tr.lessonPath, en.lessonPath]) {
    const raw = readFileSync('dist/' + path, 'utf8').replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\\\(.+?\\\)/g, '');
    assert.doesNotMatch(raw, /\\frac|\\mathcal|\\int|\\sum|\\cdot|\\to\b/);
  }
});
