import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CHALLENGE_CARDS, evaluateDiagnostic, METHODS} from '../dist/models/summary.js';
import {getLesson} from '../dist/content.js';

test('Summary catalog has 10 methods and 10 representative challenge cards', () => {
  assert.equal(METHODS.length, 10);
  assert.equal(CHALLENGE_CARDS.length, 10);

  for (const m of METHODS) {
    assert.ok(m.id && m.name && m.badge && m.formula);
    assert.ok(m.name.tr && m.name.en);
  }

  for (const card of CHALLENGE_CARDS) {
    assert.ok(card.id && card.equation && card.tag);
    assert.ok(card.firstMove.tr && card.firstMove.en);
    assert.ok(card.reducedForm.tr && card.reducedForm.en);
    assert.ok(card.trap.tr && card.trap.en);
    assert.ok(card.why.tr && card.why.en);
    assert.ok(METHODS.some(m => m.id === card.correctMethod));
  }
});

test('Diagnostic evaluation correctly classifies each challenge equation', () => {
  for (const card of CHALLENGE_CARDS) {
    const res = evaluateDiagnostic(card.id, card.correctMethod);
    assert.equal(res.isCorrect, true);
    assert.equal(res.correctMethod.id, card.correctMethod);
    assert.ok(res.firstMove && res.reducedForm && res.trap && res.why);

    // Wrong selection test
    const wrongMethod = METHODS.find(m => m.id !== card.correctMethod).id;
    const wrongRes = evaluateDiagnostic(card.id, wrongMethod);
    assert.equal(wrongRes.isCorrect, false);
  }
});

test('Section 2.7 has bilingual formulas, two study paths and four scored clinic cases', () => {
  const tr = getLesson('xie-2010:2.7', 'tr').lesson;
  const en = getLesson('xie-2010:2.7', 'en').lesson;

  const blocks = p => [...readFileSync('dist/' + p, 'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
  const trBlocks = blocks(tr.lessonPath);
  const enBlocks = blocks(en.lessonPath);
  assert.deepEqual(trBlocks, enBlocks);
  assert.equal(new Set(trBlocks).size, trBlocks.length);
  assert.equal(trBlocks.length, 8);

  assert.equal(tr.questions.length, 11);
  assert.equal(en.questions.length, 11);
  assert.equal(tr.labFamily, 'summary');
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

test('Section 2.7 renders every inline formula and keeps prose free of raw LaTeX', () => {
  const tr = getLesson('xie-2010:2.7', 'tr').lesson;
  const en = getLesson('xie-2010:2.7', 'en').lesson;
  assert.equal(tr.inlinePath, 'lessons/xie-2010/2-7/inline.json');
  const tokens = path => [...readFileSync('dist/' + path, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(tr.lessonPath);
  const enTokens = tokens(en.lessonPath);
  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());
});
