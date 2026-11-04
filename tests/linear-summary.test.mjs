import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {LINEAR_CHALLENGE_CARDS, evaluateLinearDiagnostic, LINEAR_METHODS} from '../dist/models/linear-summary.js';
import {linearSummaryLesson} from '../dist/lessons/xie-2010/4-5/content.js';

test('Linear summary catalog has 10 methods and 10 representative challenge cards', () => {
  assert.equal(LINEAR_METHODS.length, 10);
  assert.equal(LINEAR_CHALLENGE_CARDS.length, 10);

  for (const m of LINEAR_METHODS) {
    assert.ok(m.id && m.name && m.badge && m.formula && m.category);
    assert.ok(m.name.tr && m.name.en);
    assert.ok(['homogeneous', 'operator', 'general-euler'].includes(m.category));
  }

  for (const card of LINEAR_CHALLENGE_CARDS) {
    assert.ok(card.id && card.equation && card.tag && card.order >= 1);
    assert.ok(card.rhsType.tr && card.rhsType.en);
    assert.ok(card.firstMove.tr && card.firstMove.en);
    assert.ok(card.reducedForm.tr && card.reducedForm.en);
    assert.ok(card.trap.tr && card.trap.en);
    assert.ok(card.why.tr && card.why.en);
    assert.ok(LINEAR_METHODS.some(m => m.id === card.correctMethod));
  }
});

test('Linear diagnostic evaluation accurately classifies all 10 challenge cards', () => {
  for (const card of LINEAR_CHALLENGE_CARDS) {
    const res = evaluateLinearDiagnostic(card.id, card.correctMethod);
    assert.equal(res.isCorrect, true);
    assert.equal(res.correctMethod.id, card.correctMethod);
    assert.ok(res.firstMove && res.reducedForm && res.trap && res.why);

    const wrongMethod = LINEAR_METHODS.find(m => m.id !== card.correctMethod).id;
    const wrongRes = evaluateLinearDiagnostic(card.id, wrongMethod);
    assert.equal(wrongRes.isCorrect, false);
  }
});

test('Section 4.5 has synchronized bilingual display/inline math, 2 study paths, 4 clinic cases, and 12 questions', () => {
  const trPath = linearSummaryLesson.lessonPath.tr;
  const enPath = linearSummaryLesson.lessonPath.en;

  const blocks = p => [...readFileSync('dist/' + p, 'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
  const trBlocks = blocks(trPath);
  const enBlocks = blocks(enPath);
  assert.deepEqual(trBlocks, enBlocks);
  assert.equal(new Set(trBlocks).size, trBlocks.length);
  assert.ok(trBlocks.length >= 15);

  const tokens = p => [...readFileSync('dist/' + p, 'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
  const trTokens = tokens(trPath);
  const enTokens = tokens(enPath);
  assert.deepEqual([...new Set(trTokens)].sort(), [...new Set(enTokens)].sort());

  assert.equal(linearSummaryLesson.questions.length, 12);
  assert.equal(linearSummaryLesson.labFamily, 'linear-summary');
  assert.equal(linearSummaryLesson.studySupport.paths.length, 2);
  for (const path of linearSummaryLesson.studySupport.paths) {
    assert.equal(path.steps.length, 5);
    for (const st of path.steps) {
      assert.ok(st.label.tr && st.label.en && st.math && st.text.tr && st.text.en);
      assert.ok(!st.math.includes('<mtext>'));
      assert.ok(!st.math.includes('&lt;mi&gt;'));
    }
  }
  assert.equal(linearSummaryLesson.studySupport.predictions.length, 2);
  assert.equal(linearSummaryLesson.guidedTools.examClinic.length, 4);
  for (const item of linearSummaryLesson.guidedTools.examClinic) {
    assert.ok(item.statement.tr && item.statement.en && item.trap.tr && item.trap.en);
    assert.equal(item.steps.length, 5);
    assert.match(item.badge.tr, /5 PUAN/);
  }
});
