import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLesson } from '../dist/content.js';
import {
  laplaceSummaryMethods,
  laplaceChallengeCards,
  evaluateLaplaceDiagnostic
} from '../dist/models/laplace-summary.js';

test('Summary catalog has 10 methods and 10 representative challenge cards', () => {
  const methods = laplaceSummaryMethods();
  const cards = laplaceChallengeCards();

  assert.equal(methods.length, 10);
  assert.equal(cards.length, 10);

  const methodIds = new Set(methods.map(m => m.id));
  assert.equal(methodIds.size, 10);

  for (const card of cards) {
    assert.ok(card.id && card.latex);
    assert.ok(methodIds.has(card.optimalMethodId), `card ${card.id} references unknown optimal method`);
  }
});

test('Diagnostic evaluation correctly classifies each challenge equation', () => {
  const cards = laplaceChallengeCards();

  for (const card of cards) {
    const optimalResult = evaluateLaplaceDiagnostic(card.id, card.optimalMethodId);
    assert.equal(optimalResult.isOptimal, true);
    assert.match(optimalResult.feedback.tr, /Kusursuz|Doğru/i);

    const nonOptimalId = laplaceSummaryMethods().find(m => m.id !== card.optimalMethodId).id;
    const subResult = evaluateLaplaceDiagnostic(card.id, nonOptimalId);
    assert.equal(subResult.isOptimal, false);
  }
});

test('Diagnostic evaluation rejects unknown cards', () => {
  assert.throws(() => evaluateLaplaceDiagnostic('unknown-card', 'first-shift'), RangeError);
});

test('Section 6.7 has bilingual formulas, two study paths, four clinic cases and twelve questions', () => {
  const tr = getLesson('xie-2010:6.7', 'tr').lesson;
  const en = getLesson('xie-2010:6.7', 'en').lesson;

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
  assert.equal(tr.labFamily, 'laplace-summary');
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
  assert.match(readFileSync('dist/labs/laplace-summary/controller.js', 'utf8'), /export function mount/);
});

test('Section 6.7 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:6.7', 'tr').lesson;
  const en = getLesson('xie-2010:6.7', 'en').lesson;

  assert.equal(tr.inlinePath, 'lessons/xie-2010/6-7/inline.json');
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
