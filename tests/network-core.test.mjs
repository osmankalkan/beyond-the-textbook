import test from 'node:test';
import assert from 'node:assert/strict';
import {compareSwitching} from '../dist/models/network-core.js';
import {getLesson} from '../dist/content.js';
import {getMathReference} from '../dist/lessons/math-reference.js';

test('quiet traffic leaves reserved slots idle without growing the packet queue', () => {
  const {frames, peakQueue, blockedFlows} = compareSwitching(4, 2, 3);
  assert.equal(frames.length, 3);
  assert.ok(frames.every(frame => frame.packetSent === 2 && frame.idleCircuits === 2));
  assert.equal(peakQueue, 0);
  assert.equal(blockedFlows, 0);
});

test('the burst drains in six frames and circuits admit only four of seven flows', () => {
  const {frames, peakQueue, blockedFlows} = compareSwitching(4, 7, 3);
  assert.deepEqual(frames.map(frame => frame.queue), [3, 6, 9, 5, 1, 0]);
  assert.deepEqual(frames.map(frame => frame.packetSent), [4, 4, 4, 4, 4, 1]);
  assert.deepEqual(frames.map(frame => frame.circuitSent), [4, 4, 4, 0, 0, 0]);
  assert.equal(peakQueue, 9);
  assert.equal(blockedFlows, 3);
});

test('packet conservation and service capacity hold throughout the lab parameter range', () => {
  for (let capacity = 2; capacity <= 8; capacity++) {
    for (let flows = 1; flows <= 12; flows++) {
      for (let burst = 1; burst <= 6; burst++) {
        const {frames, blockedFlows} = compareSwitching(capacity, flows, burst);
        assert.equal(frames.length, Math.max(burst, Math.ceil(flows * burst / capacity)));
        let queue = 0;
        for (const frame of frames) {
          queue += frame.arrivals - frame.packetSent;
          assert.equal(queue, frame.queue);
          assert.ok(queue >= 0 && frame.packetSent <= capacity);
          assert.equal(frame.circuitSent + frame.idleCircuits, capacity);
        }
        assert.equal(queue, 0);
        assert.equal(blockedFlows, Math.max(0, flows - capacity));
      }
    }
  }
  assert.throws(() => compareSwitching(0, 7, 3), RangeError);
  assert.throws(() => compareSwitching(4, 1.5, 3), RangeError);
});

test('§1.3 routes to its own bilingual guide, clinic and reference', () => {
  const id = 'kurose-ross-8e:1.3';
  for (const lang of ['tr', 'en']) {
    const {lesson} = getLesson(id, lang);
    assert.equal(lesson.labFamily, 'network-core');
    assert.equal(lesson.questions.length, 12);
    assert.equal(lesson.guidedTools.examClinic.length, 4);
    assert.equal(lesson.studySupport.predictions.length, 2);
    assert.ok(lesson.studySupport.paths.every(path => path.steps.length === 5));
    assert.ok(lesson.questions.every(question =>
      question.hints.length === 2 && question.solutionSummary && Number.isFinite(question.answer)));
    assert.equal(getMathReference('1.3', lang, id).integral.length, 2);
  }
});
