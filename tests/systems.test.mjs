import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  systemsParticleDiagnostics,
  systemsParticleTrajectory,
  systemsShearMatrices,
  systemsShearStatic,
  systemsShearFrequencies,
  systemsShearModeShapes,
  systemsShearStateMatrix,
  systemsShearResponse
} from '../dist/models/systems.js';

const close = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} differs from ${b}`);

test('Particle diagnostics reproduce the rectangular and polar kinematics', () => {
  const state = [2, 0, 0, 2];
  const diagnostics = systemsParticleDiagnostics(state, {mass: 1, radialForce: -2, tangentialForce: 0});
  close(diagnostics.radius, 2);
  close(diagnostics.theta, 0);
  close(diagnostics.angularVelocity, 1);
  close(diagnostics.ar, -2);
  close(diagnostics.atheta, 0);
});

test('Circular preset keeps the radius constant and the radial acceleration negative', () => {
  const mass = 1.4, radius = 1.8, angularSpeed = 1.1;
  const radialForce = -mass * radius * angularSpeed * angularSpeed;
  const result = systemsParticleTrajectory({mass, radialForce, tangentialForce: 0, radius, angularSpeed}, {duration: 8, step: 0.004, samples: 200});
  const last = result.points[result.points.length - 1];
  close(last.radius, radius, 1e-6);
  close(last.radialVelocity, 0, 1e-6);
  close(last.angularVelocity, angularSpeed, 1e-6);
  assert.ok(last.ar < 0);
  assert.ok(Math.abs(result.metrics.forceResidualR) < 1e-6);
  assert.ok(Math.abs(result.metrics.forceResidualTheta) < 1e-6);
});

test('Two-story shear matrices are symmetric, tridiagonal and consistent with the floor equations', () => {
  const {M, C, K} = systemsShearMatrices({m1: 2, m2: 1, k1: 4, k2: 2, c1: 0.2, c2: 0.1});
  assert.deepEqual(M, [[2, 0], [0, 1]]);
  assert.deepEqual(K, [[6, -2], [-2, 2]]);
  close(C[0][0], 0.3);
  close(C[0][1], -0.1);
  close(C[1][0], -0.1);
  close(C[1][1], 0.1);
  for (const matrix of [C, K]) {
    close(matrix[0][1], matrix[1][0]);
    assert.ok(matrix[0][0] > 0 && matrix[1][1] > 0);
  }
});

test('Static solution transmits the total load through the ground spring', () => {
  const statics = systemsShearStatic({k1: 4, k2: 2, F1: 4, F2: 2});
  close(statics.x1, 1.5);
  close(statics.x2, 2.5);
  close(systemsShearStatic({k1: 4, k2: 2, F1: 0, F2: 0}).x1, 0);
  assert.throws(() => systemsShearStatic({k1: 0, k2: 2, F1: 1, F2: 1}), RangeError);
});

test('Natural frequencies and mode shapes match the textbook example', () => {
  const frequencies = systemsShearFrequencies({m1: 2, m2: 1, k1: 4, k2: 2});
  close(frequencies.omega1, 1);
  close(frequencies.omega2, 2);
  close(frequencies.lambda1, 1);
  close(frequencies.lambda2, 4);

  const modes = systemsShearModeShapes({m1: 2, m2: 1, k1: 4, k2: 2});
  assert.deepEqual(modes[0].raw, [1, 2]);
  assert.deepEqual(modes[1].raw, [1, -1]);
  assert.ok(Math.abs(modes[0].shape[1]) <= 1 && Math.abs(modes[1].shape[1]) <= 1);
});

test('State matrix reproduces the undamped eigenvalues and the input matrix', () => {
  const A = systemsShearStateMatrix({m1: 2, m2: 1, k1: 4, k2: 2, c1: 0, c2: 0});
  assert.equal(A.length, 4);
  assert.deepEqual(A[0], [0, 0, 1, 0]);
  assert.deepEqual(A[1], [0, 0, 0, 1]);
  A[2].forEach((value, index) => close(value, [-3, 1, 0, 0][index]));
  A[3].forEach((value, index) => close(value, [2, -2, 0, 0][index]));

  // Trace and determinant of the lower block encode the frequency sum/product.
  const lower = [A[2].slice(0, 2), A[3].slice(0, 2)];
  close(-(lower[0][0] + lower[1][1]), 1 + 4);
  close(lower[0][0] * lower[1][1] - lower[0][1] * lower[1][0], 1 * 4);
});

test('Damped response settles at the static equilibrium', () => {
  const parameters = {m1: 2, m2: 1, k1: 4, k2: 2, c1: 1.2, c2: 0.8, F1: 4, F2: 2};
  const result = systemsShearResponse(parameters, {duration: 60, step: 0.01, samples: 1201});
  const last = result.points[result.points.length - 1];
  close(last.x1, result.static.x1, 2e-3);
  close(last.x2, result.static.x2, 2e-3);
  close(last.v1, 0, 2e-3);
  close(last.v2, 0, 2e-3);
});

test('Model validation rejects non-physical parameters', () => {
  assert.throws(() => systemsShearMatrices({m1: 0, m2: 1, k1: 1, k2: 1}), RangeError);
  assert.throws(() => systemsShearFrequencies({m1: 1, m2: 1, k1: -1, k2: 1}), RangeError);
  assert.throws(() => systemsParticleDiagnostics([0, 0, 0, 0], {mass: 1}), RangeError);
  assert.throws(() => systemsParticleTrajectory({mass: 1, radius: 0}, {}), RangeError);
});

test('Particle integration stops safely when the trajectory reaches the origin', () => {
  const radial = systemsParticleTrajectory(
    {mass: 1, radialForce: -4, tangentialForce: 0, radius: 2, angularSpeed: 0},
    {duration: 12, step: 0.008, samples: 241}
  );
  assert.equal(radial.metrics.reachedOrigin, true);
  assert.ok(radial.points.length >= 2);
  assert.ok(radial.points.every(point => Number.isFinite(point.radius) && Number.isFinite(point.ar)));
  assert.ok(radial.metrics.finalRadius < 0.5);
  assert.ok(radial.metrics.finalTime < 12);

  const circular = systemsParticleTrajectory(
    {mass: 1, radialForce: -2, tangentialForce: 0, radius: 2, angularSpeed: 1},
    {duration: 12, step: 0.008, samples: 241}
  );
  assert.equal(circular.metrics.reachedOrigin, false);
  close(circular.metrics.finalRadius, 2, 1e-5);
});

test('Section 7.1 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:7.1', 'tr').lesson;
  const en = getLesson('xie-2010:7.1', 'en').lesson;

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
  assert.equal(tr.labFamily, 'systems');
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
  assert.match(readFileSync('dist/labs/systems/controller.js', 'utf8'), /export function mount/);
});

test('Section 7.1 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:7.1', 'tr').lesson;
  const en = getLesson('xie-2010:7.1', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/7-1/inline.json');
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
