import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  computePacketization,
  inspectRoute,
  evaluateProtocolStep,
  estimateWebExchangeMs
} from '../dist/models/internet-anatomy.js';
import { getBook, getLesson } from '../dist/content.js';
import { getMathReference } from '../dist/lessons/math-reference.js';

test('Packetization computes ceiling packet count, header overhead, and protocol efficiency', () => {
  // Exact division: F = 10,000 B, P_data = 1,000 B, H = 40 B
  const exact = computePacketization({ messageBytes: 10000, payloadBytes: 1000, headerBytes: 40 });
  assert.equal(exact.packetCount, 10);
  assert.equal(exact.fullPacketBytes, 1040);
  assert.equal(exact.lastPayloadBytes, 1000);
  assert.equal(exact.totalHeaderBytes, 400);
  assert.equal(exact.totalTransmittedBytes, 10400);
  assert.ok(Math.abs(exact.efficiencyPercent - (10000 / 10400) * 100) < 1e-9);

  // Non-exact division: F = 7,500 B, P_data = 1,460 B, H = 40 B -> 5 full + 1 partial (200 B)
  const partial = computePacketization({ messageBytes: 7500, payloadBytes: 1460, headerBytes: 40 });
  assert.equal(partial.packetCount, 6);
  assert.equal(partial.lastPayloadBytes, 200);
  assert.equal(partial.lastPacketBytes, 240);
  assert.equal(partial.totalHeaderBytes, 240);
  assert.equal(partial.totalTransmittedBytes, 7740);

  assert.throws(() => computePacketization({ messageBytes: 0, payloadBytes: 1000, headerBytes: 40 }), RangeError);
  assert.throws(() => computePacketization({ messageBytes: 1000, payloadBytes: -10, headerBytes: 40 }), RangeError);
});

test('Figure 1.1 topology routes run distributed applications strictly on end systems', () => {
  for (const routeId of ['home-to-dc', 'mobile-to-dc', 'enterprise-to-home']) {
    const info = inspectRoute(routeId, 0);
    assert.equal(info.endSystemCount, 2, `${routeId} must have exactly 2 end systems`);
    assert.equal(info.nodes[0].runsApp, true, `${routeId} source must run app`);
    assert.equal(info.nodes.at(-1).runsApp, true, `${routeId} destination must run app`);
    for (let i = 1; i < info.nodes.length - 1; i++) {
      assert.equal(info.nodes[i].runsApp, false, `${routeId} intermediate node ${info.nodes[i].id} must NOT run user app`);
    }
    const clampedHigh = inspectRoute(routeId, 99);
    assert.equal(clampedHigh.hopIndex, info.maxHop);
  }
});

test('Figure 1.2 protocol state machine handles normal, mismatch, and timeout scenarios', () => {
  const webDone = evaluateProtocolStep('web-normal', 4);
  assert.equal(webDone.outcome, 'success');
  assert.equal(webDone.stateLeft, 'COMPLETED');
  assert.equal(webDone.stateRight, 'COMPLETED');
  assert.equal(webDone.visibleSteps.length, 4);

  const webTimeout = evaluateProtocolStep('web-timeout', 2);
  assert.equal(webTimeout.outcome, 'timeout');
  assert.equal(webTimeout.stateLeft, 'TIMEOUT_ABORT');

  const humanMismatch = evaluateProtocolStep('human-mismatch', 2);
  assert.equal(humanMismatch.outcome, 'aborted');
  assert.equal(humanMismatch.stateLeft, 'ABORTED');
});

test('Two-RTT Web exchange timing converts bytes to bits accurately', () => {
  // RTT = 35 ms, file = 200,000 bytes, R = 10 Mbps -> 70 ms + 160 ms = 230 ms
  const res = estimateWebExchangeMs({ rttMs: 35, fileBytes: 200000, rateMbps: 10 });
  assert.equal(res.handshakeMs, 35);
  assert.equal(res.requestPropagationMs, 35);
  assert.ok(Math.abs(res.fileTransmissionMs - 160) < 1e-9);
  assert.ok(Math.abs(res.totalMs - 230) < 1e-9);
});

test('Kurose & Ross §1.1 has bilingual notes with 5 embedded SVG figures, study paths, clinic, 12 questions, and isolated reference', () => {
  const bookTr = getBook('kurose-ross-8e', 'tr');
  assert.ok(bookTr.lessons.some(l => l.id === 'kurose-ross-8e:1.1'));

  const { lesson: lessonTr } = getLesson('kurose-ross-8e:1.1', 'tr');
  const { lesson: lessonEn } = getLesson('kurose-ross-8e:1.1', 'en');
  assert.equal(lessonTr.labFamily, 'internet-anatomy');
  assert.equal(lessonTr.questions.length, 12);
  assert.equal(lessonEn.questions.length, 12);
  assert.equal(lessonTr.studySupport.paths.length, 2);
  assert.equal(lessonTr.guidedTools.examCases.length, 4);

  const mdTr = fs.readFileSync(new URL('../dist/lessons/kurose-ross-8e/1-1/lesson.md', import.meta.url), 'utf8');
  const mdEn = fs.readFileSync(new URL('../dist/lessons/kurose-ross-8e/1-1/lesson-en.md', import.meta.url), 'utf8');
  assert.equal((mdTr.match(/<figure class="lesson-figure">/g) || []).length, 5);
  assert.equal((mdEn.match(/<figure class="lesson-figure">/g) || []).length, 5);

  const mathJson = JSON.parse(fs.readFileSync(new URL('../dist/lessons/kurose-ross-8e/1-1/math.json', import.meta.url), 'utf8'));
  const inlineJson = JSON.parse(fs.readFileSync(new URL('../dist/lessons/kurose-ross-8e/1-1/inline.json', import.meta.url), 'utf8'));
  assert.ok(Object.keys(mathJson).length >= 4);
  assert.ok(Object.keys(inlineJson).length >= 6);

  // Ensure Kurose §1.1 reference does not collide with Xie §1.1 calculus reference
  const krRef = getMathReference('1.1', 'en', 'kurose-ross-8e:1.1');
  const xieRef = getMathReference('1.1', 'en', 'xie-2010:1.1');
  assert.ok(krRef && krRef.derivative.some(r => r.label.includes('Packet count')));
  assert.ok(xieRef && !xieRef.derivative.some(r => r.label.includes('Packet count')));
});
