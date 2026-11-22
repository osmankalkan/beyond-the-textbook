import test from 'node:test';
import assert from 'node:assert/strict';
import {distributionBounds} from '../dist/models/application-principles.js';
import {getLesson} from '../dist/content.js';

const example = {file:1000, peers:10, server:20, upload:2, download:10};

test('distribution bounds respond to source, peer and receiver constraints', () => {
  assert.deepEqual(distributionBounds(example),
    {receiver:100, seed:50, copies:500, aggregate:250, clientServer:500, peerToPeer:250});
  const zero = distributionBounds({...example, upload:0});
  assert.equal(zero.clientServer, zero.peerToPeer);
  const slow = distributionBounds({...example, download:1});
  assert.equal(slow.clientServer, 1000);
  assert.equal(slow.peerToPeer, 1000);
  assert.throws(() => distributionBounds({...example, server:0}), RangeError);
});

test('network §2.1 has its own bilingual catalog data and assessments', () => {
  for (const lang of ['tr','en']) {
    const {lesson} = getLesson('kurose-ross-8e:2.1', lang);
    assert.equal(lesson.labFamily, 'application-principles');
    assert.equal(lesson.guidedTools.examClinic.length, 4);
    assert.equal(lesson.questions.length, 12);
    assert.ok(lesson.questions.every(q => q.hints.length === 2 && q.solutionSummary));
  }
});
