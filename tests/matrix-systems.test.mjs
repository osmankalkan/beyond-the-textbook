import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  matrixSystemsDistinctReal,
  matrixSystemsComplexSpiral,
  matrixSystemsDefectiveShear,
  matrixSystemsSecantForcing,
  matrixSystemsModalDecoupled,
  matrixSystemsRK4,
  matrixSystemsTrajectory
} from '../dist/models/matrix-systems.js';

const close = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} differs from ${b} by more than ${tol}`);

test('Example 7.14 distinct real roots system satisfies ODE with machine-precision zero residuals', () => {
  const solver = matrixSystemsDistinctReal({ x1_0: 1, x2_0: 2 });
  assert.equal(solver.system, 'distinct-real');
  assert.equal(solver.classification, 'saddle');
  assert.deepEqual(solver.eigenvalues, [-3, 2]);

  for (const t of [0, 0.2, 0.8, 1.5, 2.5]) {
    const pt = solver.evaluate(t);
    const expNeg3 = Math.exp(-3 * t);
    const exp2 = Math.exp(2 * t);

    // Textbook Example 7.14 exact solution
    const exactX1 = (-7 / 5) * expNeg3 + (12 / 5) * exp2;
    const exactX2 = (7 / 5) * expNeg3 + (3 / 5) * exp2;

    close(pt.x1, exactX1);
    close(pt.x2, exactX2);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.15 complex conjugate roots system produces stable spiral with zero residuals', () => {
  const solver = matrixSystemsComplexSpiral({ x1_0: 5, x2_0: -2 });
  assert.equal(solver.system, 'complex-spiral');
  assert.equal(solver.classification, 'stable-focus');
  assert.deepEqual(solver.eigenvalues, ['-3+4i', '-3-4i']);

  for (const t of [0, 0.1, 0.5, 1.0, 2.0]) {
    const pt = solver.evaluate(t);
    const env = Math.exp(-3 * t);
    const c4t = Math.cos(4 * t);
    const s4t = Math.sin(4 * t);

    // Exact damped spiral trajectories
    const exactX1 = env * (5 * c4t);
    const exactX2 = env * (-2 * c4t - 4 * s4t);

    close(pt.x1, exactX1);
    close(pt.x2, exactX2);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.18 defective matrix system with forcing evaluates generalized eigenvector solution', () => {
  const solver = matrixSystemsDefectiveShear({ x10: 2, x20: -1, forcing: true });
  assert.equal(solver.system, 'defective-shear');
  assert.equal(solver.classification, 'degenerate-node');
  assert.deepEqual(solver.eigenvalues, [-1, -1]);

  const pt0 = solver.evaluate(0);
  close(pt0.x1, 2);
  close(pt0.x2, -1);

  for (const t of [0, 0.3, 0.9, 1.8, 3.0]) {
    const pt = solver.evaluate(t);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }

  const solverFree = matrixSystemsDefectiveShear({ x10: 3, x20: 0, forcing: false });
  const ptFree0 = solverFree.evaluate(0);
  close(ptFree0.x1, 3);
  close(ptFree0.x2, 0);
  for (const t of [0, 0.5, 1.5, 2.5]) {
    const pt = solverFree.evaluate(t);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Example 7.19 non-standard secant forcing system integrates into exact log-cosine response', () => {
  const solver = matrixSystemsSecantForcing({ x1_0: 1, x2_0: 1, forcing: true });
  assert.equal(solver.system, 'secant-forcing');
  assert.equal(solver.classification, 'center');
  assert.deepEqual(solver.eigenvalues, ['+i', '-i']);

  for (const t of [0, 0.2, 0.6, 1.1]) {
    const pt = solver.evaluate(t);
    const ct = Math.cos(t);
    const st = Math.sin(t);
    const lnCos = Math.log(Math.abs(ct));

    const exactX1 = (1 + t) * ct + t * st + (ct - st) * lnCos;
    const exactX2 = ct + (1 + 2 * t) * st + 2 * ct * lnCos;

    close(pt.x1, exactX1);
    close(pt.x2, exactX2);
    close(pt.res1, 0, 1e-11);
    close(pt.res2, 0, 1e-11);
  }
});

test('Modal decoupling system resolves coupled 2-DOF structural shear vibrations into independent modes', () => {
  const solver = matrixSystemsModalDecoupled({ x1_0: 1, x2_0: 0, vx1_0: 0, vx2_0: 0 });
  assert.equal(solver.system, 'modal-decoupling');
  assert.equal(solver.classification, 'harmonic-modes');

  for (const t of [0, 0.4, 1.2, 2.5, 4.0]) {
    const pt = solver.evaluate(t);
    close(pt.res1, 0, 1e-12);
    close(pt.res2, 0, 1e-12);
  }
});

test('Independent 4th-order Runge-Kutta numerical simulator agrees with analytical solutions within high precision', () => {
  for (const preset of ['distinct-real', 'complex-spiral', 'defective-shear', 'secant-forcing']) {
    const traj = matrixSystemsTrajectory({ preset, tMax: 2.0, numPoints: 100 });
    assert.ok(traj.points.length >= 100);

    const rk4 = matrixSystemsRK4({
      preset,
      x1_0: traj.points[0].x1,
      x2_0: traj.points[0].x2,
      tMax: 2.0,
      dt: 0.005
    });

    let maxDiff = 0;
    for (let i = 0; i < Math.min(traj.points.length, rk4.length); i++) {
      const diff1 = Math.abs(traj.points[i].x1 - rk4[i].x1);
      const diff2 = Math.abs(traj.points[i].x2 - rk4[i].x2);
      maxDiff = Math.max(maxDiff, diff1, diff2);
    }
    assert.ok(maxDiff < 5e-5, `${preset} RK4 difference ${maxDiff} exceeds 5e-5`);
  }
});

test('Section 7.4 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:7.4', 'tr').lesson;
  const en = getLesson('xie-2010:7.4', 'en').lesson;

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

  assert.equal(tr.labFamily, 'matrix-systems');
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
  assert.match(readFileSync('dist/labs/matrix-systems/controller.js', 'utf8'), /export function mount/);
});

test('Section 7.4 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:7.4', 'tr').lesson;
  const en = getLesson('xie-2010:7.4', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/7-4/inline.json');
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
    assert.doesNotMatch(raw, /\$[^$\n]+\$/);
    assert.doesNotMatch(raw, /\[!(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
  }
});
