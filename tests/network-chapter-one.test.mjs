import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateDefense} from '../dist/models/network-defense.js';
import {compareCampusPath} from '../dist/models/network-review.js';
import {getBook} from '../dist/content.js';
import {milestones} from '../dist/lessons/kurose-ross-8e/1-7/timeline.js';

const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9);

test('defense matches the synthetic evidence and protects legitimate service within the same budget', () => {
  assert.deepEqual(evaluateDefense('confidentiality', 'encrypt'), {matches: true});
  assert.deepEqual(evaluateDefense('recovery', 'encrypt'), {matches: false});
  assert.deepEqual(evaluateDefense('availability', 'encrypt'), {matches: false, requested: 80, served: 40});
  assert.deepEqual(evaluateDefense('availability', 'reserve'), {matches: true, requested: 80, served: 80});
});

test('campus review distinguishes faster access, faster backbone, and shorter propagation', () => {
  const {frameBytes, baseline, current: access} = compareCampusPath(1000, 'access');
  const {current: core} = compareCampusPath(1000, 'core');
  const {current: nearby} = compareCampusPath(1000, 'nearby');
  assert.equal(frameBytes, 1058);
  assert.equal(compareCampusPath(12, 'baseline').frameBytes, 70);
  near(baseline.firstPacketTotalMs, 7.0884);
  near(baseline.allPacketsTotalMs, 15.5524);
  assert.equal(access.bottleneckRateMbps, baseline.bottleneckRateMbps);
  assert.ok(access.maxQueueDelayMs > baseline.maxQueueDelayMs);
  assert.equal(core.bottleneckRateMbps, 10);
  near(core.maxQueueDelayMs, 0);
  near(baseline.firstPacketTotalMs - nearby.firstPacketTotalMs, 1.8);
  near(baseline.allPacketsTotalMs - nearby.allPacketsTotalMs, 1.8);
  near(nearby.maxQueueDelayMs, baseline.maxQueueDelayMs);
});

test('the history timeline separates proposal, coordinated transition, and development of the Web', () => {
  assert.deepEqual(milestones.slice(1, 4), [
    {id: 'internetworking', date: '1974'},
    {id: 'tcpip', date: '1983'},
    {id: 'web', date: '1989–1991'}
  ]);
  const startYears = milestones.map(milestone => Number(milestone.date.slice(0,4)));
  assert.deepEqual(startYears.toSorted((a,b) => a-b), startYears);
});

test('all eight network chapter lessons expose their guides, clinics and questions in Turkish and English', () => {
  for (const lang of ['tr','en']) {
    const lessons = getBook('kurose-ross-8e', lang).lessons.filter(lesson => lesson.section.startsWith('1.'));
    assert.deepEqual(lessons.map(lesson => lesson.section), ['1.1','1.2','1.3','1.4','1.5','1.6','1.7','1.8']);
    for (const lesson of lessons) {
      assert.equal(lesson.questions.length, 12, lesson.id);
      assert.equal(lesson.guidedTools.examClinic.length, 4, lesson.id);
      assert.equal(lesson.studySupport.predictions.length, 2, lesson.id);
      assert.ok(lesson.studySupport.paths.every(path => path.steps.length === 5), lesson.id);
      assert.ok(lesson.guidedTools.examClinic.every(c => c.steps.length >= 3), lesson.id);
      assert.ok(lesson.questions.every(q => q.title && q.hints.length && Number.isFinite(q.answer)), lesson.id);
    }
  }
});
