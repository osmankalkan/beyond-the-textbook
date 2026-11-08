import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  operatorSystemsHarmonicSolution,
  operatorSystemsAsymmetricSolution,
  operatorSystemsPolynomialSolution,
  operatorSystemsCramerDeterminants,
  operatorSystemsHarmonicRK4,
  operatorSystemsTrajectory
} from '../dist/models/operator-systems.js';

const close = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} differs from ${b} by more than ${tol}`);

test('Harmonic system solution satisfies differential equations with near-zero residuals', () => {
  const solver = operatorSystemsHarmonicSolution({ A1: 2, B1: -1, forcing: 'free' });
  assert.equal(solver.degree, 2);
  assert.equal(solver.omega, 3);
  close(solver.constants.A2, -0.5 * (2 - (-1))); // -1.5
  close(solver.constants.B2, -0.5 * (2 + (-1))); // -0.5

  for (const t of [0, 0.5, 1.2, 3.0, 5.5]) {
    const pt = solver.evaluate(t);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.3 constant elimination relations reduce 4 constants to 2 independent ones', () => {
  const A1 = 3, B1 = 5;
  const solver = operatorSystemsHarmonicSolution({ A1, B1, forcing: 'free' });
  const pt0 = solver.evaluate(0);

  close(pt0.x, A1);
  close(pt0.y, solver.constants.A2);
  close(solver.constants.A2, -0.5 * (A1 - B1));
  close(solver.constants.B2, -0.5 * (A1 + B1));

  // Verify (D - 3)x - 6y = 0 at t = 0
  close(pt0.dx - 3 * pt0.x - 6 * pt0.y, 0, 1e-12);
});

test('Example 7.4 asymmetric 3rd-order system exhibits vanishing mode in y', () => {
  const solver = operatorSystemsAsymmetricSolution({ C1: 2, C2: 3, C3: 0.5 });
  assert.equal(solver.degree, 3);
  assert.deepEqual(solver.roots, [-1, -2, 2]);

  // Mode e^(-2t) has coefficient D2 = 0 in y
  assert.equal(solver.constants.D2, 0);
  close(solver.constants.D1, 1);     // C1 / 2 = 1
  close(solver.constants.D3, -2);    // -4 * C3 = -2

  for (const t of [0, 0.2, 1.0, 2.5]) {
    const pt = solver.evaluate(t);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.5 exponential and polynomial forcing reproduces exact textbook particular solutions', () => {
  const solver = operatorSystemsHarmonicSolution({ A1: 0, B1: 0, forcing: 'exponential' });

  for (const t of [0, 0.5, 1.5, 3.0]) {
    const pt = solver.evaluate(t);
    const expTerm = Math.exp(-3 * t);

    close(pt.xP, 2 * (3 * t + 1) * expTerm);
    close(pt.yP, -(6 * t + 1) * expTerm);
    close(pt.f1, 0);
    close(pt.f2, 18 * t * expTerm);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.6 resonance with sinusoidal forcing exhibits secular growth and constant shift', () => {
  const solver = operatorSystemsHarmonicSolution({ A1: 1, B1: 1, forcing: 'resonance' });

  // Check constant shift
  close(solver.constants.A2, -0.5 * (1 - 1) - 0.5); // -0.5
  close(solver.constants.B2, -0.5 * (1 + 1) + 1 / 6); // -1 + 1/6 = -5/6

  for (const t of [0, 0.4, 1.0, 2.8, 6.0]) {
    const pt = solver.evaluate(t);
    const c3t = Math.cos(3 * t);
    const s3t = Math.sin(3 * t);

    close(pt.xP, t * (s3t - c3t));
    close(pt.yP, t * c3t);
    close(pt.f1, 2 * c3t);
    close(pt.f2, 2 * s3t);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.7 polynomial forcing system satisfies 3rd-order operator equations', () => {
  const solver = operatorSystemsPolynomialSolution({ C1: 1, C2: 1, C3: 0.1 });
  assert.equal(solver.degree, 3);
  assert.deepEqual(solver.roots, [-2, 1, 3]);
  close(solver.constants.D1, -2.5);
  close(solver.constants.D2, 2);
  close(solver.constants.D3, 0);

  for (const t of [0, 0.3, 1.0, 2.0]) {
    const pt = solver.evaluate(t);
    close(pt.xP, 2);
    close(pt.yP, 7 * t + 7);
    close(pt.res1, 0, 1e-11);
    close(pt.res2, 0, 1e-11);
  }
});

test('Cramer operator determinants evaluate correct forcing functions', () => {
  const expD = operatorSystemsCramerDeterminants('exponential', 0.5);
  const eVal = Math.exp(-1.5);
  close(expD.deltaX, 108 * 0.5 * eVal);
  close(expD.deltaY, (18 - 108 * 0.5) * eVal);

  const resD = operatorSystemsCramerDeterminants('resonance', 0.2);
  close(resD.deltaX, 6 * Math.cos(0.6) + 6 * Math.sin(0.6));
  close(resD.deltaY, -6 * Math.sin(0.6));
});

test('Independent 4th-order Runge-Kutta simulator agrees with analytical solutions within high precision', () => {
  const rkFree = operatorSystemsHarmonicRK4({ A1: 1.5, B1: -0.5, forcing: 'free' }, { duration: 6, step: 0.005 });
  assert.ok(rkFree.metrics.maxDiffX < 1e-7);
  assert.ok(rkFree.metrics.maxDiffY < 1e-7);
  assert.equal(rkFree.points.length > 50, true);

  const rkExp = operatorSystemsHarmonicRK4({ A1: 1, B1: 0, forcing: 'exponential' }, { duration: 6, step: 0.005 });
  assert.ok(rkExp.metrics.maxDiffX < 1e-7);
  assert.ok(rkExp.metrics.maxDiffY < 1e-7);

  const rkRes = operatorSystemsHarmonicRK4({ A1: 0.5, B1: 0.5, forcing: 'resonance' }, { duration: 6, step: 0.005 });
  assert.ok(rkRes.metrics.maxDiffX < 1e-6);
  assert.ok(rkRes.metrics.maxDiffY < 1e-6);

  assert.throws(() => operatorSystemsHarmonicSolution({ A1: Infinity }), RangeError);
  assert.throws(() => operatorSystemsHarmonicRK4({}, { duration: -1 }), RangeError);
  assert.throws(() => operatorSystemsTrajectory('non-existent', {}), RangeError);
});

test('Universal trajectory generator supports all textbook presets', () => {
  for (const preset of ['harmonic-free', 'harmonic-exp', 'harmonic-res', 'asymmetric', 'polynomial']) {
    const traj = operatorSystemsTrajectory(preset, {}, { duration: 5, samples: 101 });
    assert.equal(traj.presetKey, preset);
    assert.equal(traj.points.length, 101);
    assert.ok(traj.metrics.maxX >= 0);
    assert.ok(traj.metrics.maxY >= 0);
    assert.ok(traj.metrics.maxResidual < 1e-8);
  }
});

test('Section 7.2 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:7.2', 'tr').lesson;
  const en = getLesson('xie-2010:7.2', 'en').lesson;

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

  assert.equal(tr.labFamily, 'operator-systems');
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
  assert.match(readFileSync('dist/labs/operator-systems/controller.js', 'utf8'), /export function mount/);
});

test('Section 7.2 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:7.2', 'tr').lesson;
  const en = getLesson('xie-2010:7.2', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/7-2/inline.json');
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
