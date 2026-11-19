import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  evaluateAccessScenario,
  computeOpticalCarrierMbps,
  computeSatellitePropMs
} from '../dist/models/network-edge.js';
import { getBook, getLesson } from '../dist/content.js';
import { getMathReference } from '../dist/lessons/math-reference.js';

test('Dedicated DSL and Ethernet preserve per-user speed while shared HFC divides rate by N_active', () => {
  const dsl1 = evaluateAccessScenario({ techId: 'dsl', activeUsers: 1, fileMB: 50 });
  const dsl20 = evaluateAccessScenario({ techId: 'dsl', activeUsers: 20, fileMB: 50 });
  assert.equal(dsl1.effectiveDownMbps, dsl20.effectiveDownMbps);
  assert.equal(dsl1.downloadSec, dsl20.downloadSec);

  const hfc1 = evaluateAccessScenario({ techId: 'hfc', activeUsers: 1, fileMB: 100 });
  const hfc20 = evaluateAccessScenario({ techId: 'hfc', activeUsers: 20, fileMB: 100 });
  assert.equal(hfc1.effectiveDownMbps, 400);
  assert.equal(hfc20.effectiveDownMbps, 20);
  assert.ok(Math.abs(hfc20.downloadSec - 40) < 1e-9);
  assert.equal(hfc1.tech.collisionDownstream, false);
});

test('OC-n optical carrier speeds and GEO vs LEO satellite propagation delays match Kurose & Ross §1.2.2', () => {
  assert.ok(Math.abs(computeOpticalCarrierMbps(1) - 51.8) < 1e-9);
  assert.ok(Math.abs(computeOpticalCarrierMbps(12) - 621.6) < 1e-9);
  assert.ok(Math.abs(computeOpticalCarrierMbps(48) - 2486.4) < 1e-9);

  // Vertical GEO (36,000 km -> 72,000 km / 3e8 m/s = 240 ms; slant 1.167 -> ~280 ms)
  const geoVert = computeSatellitePropMs({ altitudeKm: 36000, slantFactor: 1.0 });
  assert.ok(Math.abs(geoVert.oneWayMs - 240) < 1e-9);
  const geoSlant = computeSatellitePropMs({ altitudeKm: 36000, slantFactor: 1.167 });
  assert.ok(Math.abs(geoSlant.oneWayMs - 280.08) < 0.2);

  // LEO (600 km -> 1,200 km / 3e8 m/s = 4 ms)
  const leo = computeSatellitePropMs({ altitudeKm: 600, slantFactor: 1.0 });
  assert.ok(Math.abs(leo.oneWayMs - 4) < 1e-9);
});

test('Kurose & Ross §1.2 has bilingual notes with 5 embedded SVG figures, study paths, clinic, 12 questions, and isolated reference', () => {
  const bookTr = getBook('kurose-ross-8e', 'tr');
  assert.ok(bookTr.lessons.some(l => l.id === 'kurose-ross-8e:1.2'));

  const { lesson: lessonTr } = getLesson('kurose-ross-8e:1.2', 'tr');
  const { lesson: lessonEn } = getLesson('kurose-ross-8e:1.2', 'en');
  assert.equal(lessonTr.labFamily, 'network-edge');
  assert.equal(lessonTr.questions.length, 12);
  assert.equal(lessonEn.questions.length, 12);
  assert.equal(lessonTr.studySupport.paths.length, 2);
  assert.equal(lessonTr.guidedTools.examCases.length, 4);

  const mdTr = fs.readFileSync(new URL('../dist/lessons/kurose-ross-8e/1-2/lesson.md', import.meta.url), 'utf8');
  const mdEn = fs.readFileSync(new URL('../dist/lessons/kurose-ross-8e/1-2/lesson-en.md', import.meta.url), 'utf8');
  assert.equal((mdTr.match(/<figure class="lesson-figure">/g) || []).length, 5);
  assert.equal((mdEn.match(/<figure class="lesson-figure">/g) || []).length, 5);

  const mathJson = JSON.parse(fs.readFileSync(new URL('../dist/lessons/kurose-ross-8e/1-2/math.json', import.meta.url), 'utf8'));
  const inlineJson = JSON.parse(fs.readFileSync(new URL('../dist/lessons/kurose-ross-8e/1-2/inline.json', import.meta.url), 'utf8'));
  assert.ok(Object.keys(mathJson).length >= 4);
  assert.ok(Object.keys(inlineJson).length >= 3);

  const krRef = getMathReference('1.2', 'en', 'kurose-ross-8e:1.2');
  const xieRef = getMathReference('1.2', 'en', 'xie-2010:1.2');
  assert.ok(krRef && krRef.derivative.some(r => r.label.includes('Shared access')));
  assert.ok(xieRef && !xieRef.derivative.some(r => r.label.includes('Shared access')));
});
