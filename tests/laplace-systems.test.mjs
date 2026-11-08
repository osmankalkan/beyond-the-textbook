import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  laplaceSystemsHarmonic,
  laplaceSystemsDelayedCoupled,
  laplaceSystemsSecondOrder,
  laplaceSystemsHarmonicRK4,
  laplaceSystemsTrajectory
} from '../dist/models/laplace-systems.js';

const close = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} differs from ${b} by more than ${tol}`);

test('Harmonic system (Example 7.11) satisfies differential equations with near-zero residuals', () => {
  const solver = laplaceSystemsHarmonic({ x0: 1, y0: 0, forcing: true });
  assert.equal(solver.system, 'harmonic-laplace');
  assert.deepEqual(solver.poles, ['+3i', '-3i']);
  assert.equal(solver.characteristic, 's^2 + 9');

  for (const t of [0, 0.5, 1.2, 3.0, 5.5]) {
    const pt = solver.evaluate(t);
    const expTerm = Math.exp(-3 * t);
    const c3t = Math.cos(3 * t);
    const s3t = Math.sin(3 * t);

    // Textbook exact analytical solutions
    const exactX = -c3t + s3t + 2 * (1 + 3 * t) * expTerm;
    const exactY = c3t - (1 + 6 * t) * expTerm;

    close(pt.x, exactX);
    close(pt.y, exactY);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.11 ZIR/ZSR decomposition verifies initial conditions and zero forcing', () => {
  const solverFree = laplaceSystemsHarmonic({ x0: 2, y0: -1, forcing: false });
  const pt0 = solverFree.evaluate(0);

  close(pt0.x, 2);
  close(pt0.y, -1);
  close(pt0.xZSR, 0);
  close(pt0.yZSR, 0);

  // ZIR only satisfies homogeneous system: dx - 3x - 6y = 0, 3x + dy + 3y = 0
  for (const t of [0, 0.4, 1.5, 4.0]) {
    const pt = solverFree.evaluate(t);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.12 coupled derivatives system satisfies ODEs with delayed sinusoidal forcing', () => {
  const solver = laplaceSystemsDelayedCoupled({ x0: 2, y0: 1, tDelay: Math.PI });
  assert.equal(solver.system, 'delayed-coupled-laplace');
  assert.deepEqual(solver.poles, ['-1+i', '-1-i']);

  // Before delay (t < π): ZSR must be identically zero
  for (const t of [0, 0.5, 1.5, 3.0]) {
    const pt = solver.evaluate(t);
    close(pt.xZSR, 0);
    close(pt.yZSR, 0);
    close(pt.f2, 0);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }

  // Continuity check at t = π: ZSR must evaluate to zero smoothly
  const ptPi = solver.evaluate(Math.PI);
  close(ptPi.xZSR, 0, 1e-12);
  close(ptPi.yZSR, 0, 1e-12);

  // After delay (t > π): forced oscillations activate and satisfy ODEs
  for (const t of [3.5, 4.2, 5.0, 7.0]) {
    const pt = solver.evaluate(t);
    close(pt.f2, 10 * Math.sin(2 * t));
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.13 higher-order system exhibits ZIR pole cancellation and delayed ramp activation', () => {
  const solver = laplaceSystemsSecondOrder({ x0: 5, y0: 0, vx0: 15, tDelay: 1 });
  assert.equal(solver.system, 'second-order-laplace');
  assert.deepEqual(solver.poles, ['3', '1', '-2']);

  // ZIR cancellation check: x_ZIR = 5*e^(3t) and y_ZIR = 0
  for (const t of [0, 0.3, 0.8, 1.5, 2.5]) {
    const pt = solver.evaluate(t);
    close(pt.xZIR, 5 * Math.exp(3 * t));
    close(pt.yZIR, 0);
  }

  // Before delay (t < 1): ZSR is zero
  const pt0 = solver.evaluate(0.5);
  close(pt0.xZSR, 0);
  close(pt0.yZSR, 0);
  close(pt0.res1, 0, 1e-11);
  close(pt0.res2, 0, 1e-11);

  // After delay (t >= 1): ramp forcing 60t satisfies equations
  for (const t of [1.2, 2.0, 3.0]) {
    const pt = solver.evaluate(t);
    close(pt.f1, 60 * t);
    close(pt.res1, 0, 1e-10);
    close(pt.res2, 0, 1e-10);
  }
});

test('Independent 4th-order Runge-Kutta simulator agrees with analytical solutions within high precision', () => {
  const rkForced = laplaceSystemsHarmonicRK4({ x0: 1, y0: 0, forcing: true }, { duration: 6, step: 0.005 });
  assert.ok(rkForced.metrics.maxDiffX < 1e-7);
  assert.ok(rkForced.metrics.maxDiffY < 1e-7);
  assert.equal(rkForced.points.length > 50, true);

  const rkFree = laplaceSystemsHarmonicRK4({ x0: 2, y0: -1, forcing: false }, { duration: 6, step: 0.005 });
  assert.ok(rkFree.metrics.maxDiffX < 1e-7);
  assert.ok(rkFree.metrics.maxDiffY < 1e-7);

  assert.throws(() => laplaceSystemsHarmonic({ x0: Infinity }), RangeError);
  assert.throws(() => laplaceSystemsHarmonicRK4({}, { duration: -1 }), RangeError);
  assert.throws(() => laplaceSystemsTrajectory('non-existent', {}), RangeError);
});

test('Universal trajectory generator supports all presets and view modes', () => {
  for (const preset of ['harmonic-exp', 'delayed-coupled', 'second-order', 'harmonic-free']) {
    for (const viewMode of ['total', 'zir', 'zsr']) {
      const traj = laplaceSystemsTrajectory(preset, { viewMode }, { duration: 4, samples: 101 });
      assert.equal(traj.presetKey, preset);
      assert.equal(traj.viewMode, viewMode);
      assert.equal(traj.points.length, 101);
      assert.ok(traj.metrics.maxX >= 0);
      assert.ok(traj.metrics.maxY >= 0);
      assert.ok(traj.metrics.maxResidual < 1e-8);
    }
  }
});

test('Section 7.3 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:7.3', 'tr').lesson;
  const en = getLesson('xie-2010:7.3', 'en').lesson;

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
  assert.match(en.presentation.practiceIntro, /22 points/);

  assert.equal(tr.labFamily, 'laplace-systems');
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
  assert.match(readFileSync('dist/labs/laplace-systems/controller.js', 'utf8'), /export function mount/);
});

test('Section 7.3 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:7.3', 'tr').lesson;
  const en = getLesson('xie-2010:7.3', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/7-3/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath);
  const enTokens = tokens(en.lessonPath);
  assert.deepEqual(new Set(trTokens), new Set(enTokens));

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
