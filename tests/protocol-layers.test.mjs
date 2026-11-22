import test from 'node:test';
import assert from 'node:assert/strict';
import {traceEncapsulation, MESSAGE_LIMITS} from '../dist/models/protocol-layers.js';
import {getLesson} from '../dist/content.js';

const at = (stages, id) => stages.find(stage => stage.id === id);

test('short UDP and TCP messages get the correct Ethernet padding', () => {
  for (const [size, protocol, ipBytes, padding, frameBytes] of [
    [4, 'tcp', 44, 2, 64], [4, 'udp', 32, 14, 64],
    [12, 'tcp', 52, 0, 70], [12, 'udp', 40, 6, 64],
    [18, 'udp', 46, 0, 64], [19, 'udp', 47, 0, 65]
  ]) {
    const stages = traceEncapsulation(size, protocol);
    const frame = at(stages, 'firstFrame');
    assert.equal(at(stages, 'ip').bytes, ipBytes);
    assert.equal(frame.bytes, frameBytes);
    assert.equal(frame.parts.find(part => part.kind === 'padding')?.bytes ?? 0, padding);
    assert.equal(frame.parts.at(-1).kind, 'fcs');
  }
});

test('the switch keeps TTL and link, while the router renews the Ethernet envelope', () => {
  const stages = traceEncapsulation(1000, 'tcp');
  assert.deepEqual(stages.map(stage => stage.bytes), [1000, 1020, 1040, 1058, 1058, 1040, 1058, 1040, 1020, 1000]);
  assert.deepEqual(stages.filter(stage => stage.link).map(stage => [stage.link, stage.ttl]),
    [[1, 64], [1, 64], [2, 63]]);
  assert.deepEqual(at(stages, 'routerIp').parts.map(part => part.kind), ['ip', 'tcp', 'message']);
  assert.deepEqual(at(stages, 'deliver').parts, at(stages, 'message').parts);
});

test('all supported inputs stay within the Ethernet payload range and deliver the whole message', () => {
  for (const transport of ['tcp', 'udp']) {
    for (let size = MESSAGE_LIMITS.min; size <= MESSAGE_LIMITS.max; size++) {
      const stages = traceEncapsulation(size, transport);
      assert.ok(at(stages, 'ip').bytes <= 1500);
      assert.ok(at(stages, 'firstFrame').bytes >= 64);
      assert.equal(at(stages, 'deliver').bytes, size);
      assert.equal(at(stages, 'receiveTransport').parts.some(part => part.kind === 'padding'), false);
    }
  }
  for (const [size, transport] of [[0, 'tcp'], [1401, 'udp'], [9.5, 'tcp'], [12, 'other']]) {
    assert.throws(() => traceEncapsulation(size, transport), RangeError);
  }
});

test('§1.5 exposes both guided predictions, worked cases, and questions in both languages', () => {
  for (const lang of ['tr', 'en']) {
    const {lesson} = getLesson('kurose-ross-8e:1.5', lang);
    assert.equal(lesson.labFamily, 'protocol-layers');
    assert.equal(lesson.studySupport.predictions.length, 2);
    assert.ok(lesson.studySupport.paths.every(path => path.steps.length === 5));
    assert.equal(lesson.guidedTools.examClinic.length, 4);
    assert.equal(lesson.questions.length, 12);
    assert.ok(lesson.questions.every(question =>
      question.hints.length === 2 && question.solutionSummary && Number.isFinite(question.answer)));
  }
});
