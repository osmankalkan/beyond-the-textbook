import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  laplaceAppFamilies,
  laplaceAppExact,
  laplaceAppMetrics,
  laplaceAppCurves,
  laplaceAppFrequencyResponse
} from '../dist/models/laplace-applications.js';

test('Application families are properly enumerated', () => {
  const families = laplaceAppFamilies();
  assert.equal(families.length, 5);
  assert.ok(families.includes('sdof-vibration-ramp'));
  assert.ok(families.includes('beam-elastic-point'));
});

test('SDOF ramp response starts at zero and is smooth at ramp boundary', () => {
  const r0 = laplaceAppExact('sdof-vibration-ramp', 0);
  assert.equal(r0.total, 0);

  const t1 = 2.0;
  const before = laplaceAppExact('sdof-vibration-ramp', t1 - 0.01, { t1 });
  const after = laplaceAppExact('sdof-vibration-ramp', t1 + 0.01, { t1 });
  assert.ok(Math.abs(before.total - after.total) < 0.1);
});

test('Harmonic blast pulse transitions into free vibration for t > t0', () => {
  const t0 = 1.0;
  const pulseResponse = laplaceAppExact('sdof-harmonic-pulse', 0.5, { t0 });
  assert.ok(Number.isFinite(pulseResponse.total));

  const freeVibe = laplaceAppExact('sdof-harmonic-pulse', 1.5, { t0 });
  assert.ok(Number.isFinite(freeVibe.total));
});

test('RLC periodic square wave evaluates finite current series', () => {
  const rlc0 = laplaceAppExact('rlc-periodic-square', 0);
  assert.equal(rlc0.total, 0);

  const rlcMid = laplaceAppExact('rlc-periodic-square', 2.0);
  assert.ok(Number.isFinite(rlcMid.total));
});

test('Beam on elastic foundation achieves maximum deflection at point load location x = a', () => {
  const a = 2.0;
  const peak = laplaceAppExact('beam-elastic-point', a, { a });
  const left = laplaceAppExact('beam-elastic-point', a - 0.5, { a });
  const right = laplaceAppExact('beam-elastic-point', a + 0.5, { a });

  assert.ok(peak.total > left.total);
  assert.ok(peak.total > right.total);
  assert.ok(Math.abs(left.total - right.total) < 1e-10); // symmetry about a
});

test('Frequency response peaks near resonance ratio r = 1', () => {
  const freqPts = laplaceAppFrequencyResponse('sdof-vibration-ramp', { k: 4.0, m: 1.0, c: 0.4 }, 4.0, 41);
  const nearRes = freqPts.find(pt => Math.abs(pt.ratio - 1.0) < 0.1);
  const farRes = freqPts.find(pt => pt.ratio > 1.8);

  assert.ok(nearRes.dmf > farRes.dmf);
});

test('Input validation rejects negative horizons and invalid families', () => {
  assert.throws(() => laplaceAppExact('unknown', 1.0), RangeError);
  assert.throws(() => laplaceAppCurves('sdof-vibration-ramp', {}, -1.0), RangeError);
});

test('Section 6.6 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:6.6', 'tr').lesson;
  const en = getLesson('xie-2010:6.6', 'en').lesson;

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
  assert.equal(tr.labFamily, 'laplace-applications');
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
  assert.match(readFileSync('dist/labs/laplace-applications/controller.js', 'utf8'), /export function mount/);
});

test('Section 6.6 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:6.6', 'tr').lesson;
  const en = getLesson('xie-2010:6.6', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/6-6/inline.json');
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
