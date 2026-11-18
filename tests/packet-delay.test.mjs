import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  transmissionDelay,
  propagationDelay,
  linkWaveMetrics,
  simulatePacketSchedule,
  evaluateNetworkStateAtTime,
  PACKET_DELAY_PRESETS
} from '../dist/models/packet-delay.js';
import {getBook, getLesson, BOOKS} from '../dist/content.js';

test('Transmission delay (L/R) and propagation delay (d/v) are orthogonal physical quantities', () => {
  // L = 1500 Bytes = 12,000 bits, R = 10 Mbps = 1e7 bps -> d_trans = 1.2 ms
  const tx1 = transmissionDelay(12000, 10e6);
  assert.ok(Math.abs(tx1.ms - 1.2) < 1e-9);
  assert.ok(Math.abs(tx1.seconds - 0.0012) < 1e-12);

  // Doubling bandwidth R halves transmission delay
  const tx2 = transmissionDelay(12000, 20e6);
  assert.ok(Math.abs(tx2.ms - 0.6) < 1e-9);

  // d = 1000 km = 1e6 m, v = 2.5e8 m/s -> d_prop = 4.0 ms (independent of L and R)
  const prop1 = propagationDelay(1000e3, 2.5e8);
  assert.ok(Math.abs(prop1.ms - 4.0) < 1e-9);

  // Crossover distance d* = 300 km where d_prop == d_trans == 1.2 ms (Kurose & Ross Problem P6g)
  const propCrossover = propagationDelay(300e3, 2.5e8);
  assert.ok(Math.abs(propCrossover.ms - tx1.ms) < 1e-9);

  // Invalid inputs throw RangeError
  assert.throws(() => transmissionDelay(0, 10e6), RangeError);
  assert.throws(() => transmissionDelay(1000, -5), RangeError);
  assert.throws(() => propagationDelay(-1, 2e8), RangeError);
  assert.throws(() => propagationDelay(100, 0), RangeError);
});

test('Bandwidth-Delay Product (BDP) and spatial bit width reproduce Kurose & Ross Problem P25 & P27', () => {
  // Problem P25: d = 20,000 km = 2e7 m, R = 5 Mbps = 5e6 bps, v = 2.5e8 m/s, L = 800,000 bits
  const m25 = linkWaveMetrics(800000, 5e6, 20000e3, 2.5e8);
  // d_prop = 2e7 / 2.5e8 = 0.08 s = 80 ms
  assert.ok(Math.abs(m25.dPropMs - 80) < 1e-9);
  // BDP = 5e6 * 0.08 = 400,000 bits
  assert.ok(Math.abs(m25.bdpBits - 400000) < 1e-6);
  // Max bits in link at any time = min(800,000, 400,000) = 400,000 bits
  assert.equal(m25.maxBitsInLink, 400000);
  // Width of a bit = v / R = 2.5e8 / 5e6 = 50 meters
  assert.ok(Math.abs(m25.bitWidthMeters - 50) < 1e-9);
  assert.equal(m25.firstBitArrivesBeforeTxEnds, true);

  // Problem P27: same link with R = 500 Mbps = 5e8 bps
  const m27 = linkWaveMetrics(800000, 500e6, 20000e3, 2.5e8);
  // BDP = 5e8 * 0.08 = 40,000,000 bits, but file is only 800,000 bits -> maxBitsInLink = 800,000
  assert.ok(Math.abs(m27.bdpBits - 40e6) < 1e-3);
  assert.equal(m27.maxBitsInLink, 800000);
  // Width of a bit = 2.5e8 / 5e8 = 0.5 meters
  assert.ok(Math.abs(m27.bitWidthMeters - 0.5) < 1e-9);
  assert.equal(m27.firstBitArrivesBeforeTxEnds, false);
});

test('Store-and-forward single-packet and 3-packet pipelining reproduce §1.3.1 Figure 1.11 and Eq 1.1', () => {
  // 1 router (N = 2 links), L = 12,000 bits (1500 B), R = 2 Mbps -> L/R = 6 ms per link.
  // With d = 0 (ignoring propagation delay, as in §1.3.1 p. 23-24):
  // 1st packet arrives at 2 * L/R = 12 ms; 3rd packet arrives at (N + P - 1)*(L/R) = 4 * 6 = 24 ms.
  const schedZeroProp = simulatePacketSchedule({
    packetBytes: 1500,
    packetCount: 3,
    routerCount: 1,
    forwardingMode: 'store-and-forward',
    links: [
      { rateMbps: 2, distanceKm: 0, speedFactor: 2.0 },
      { rateMbps: 2, distanceKm: 0, speedFactor: 2.0 }
    ]
  });

  assert.ok(Math.abs(schedZeroProp.summary.firstPacketTotalMs - 12) < 1e-9);
  assert.ok(Math.abs(schedZeroProp.summary.allPacketsTotalMs - 24) < 1e-9);
  assert.equal(schedZeroProp.summary.maxQueueDelayMs, 0);

  // Router cannot start forwarding Packet 1 onto Link 2 until t = L/R = 6 ms
  assert.ok(Math.abs(schedZeroProp.packetHops[0][1].txStartMs - 6) < 1e-9);
  // While router forwards Packet 1 on Link 2 (t = 6..12), Source transmits Packet 2 on Link 1 (t = 6..12)
  assert.ok(Math.abs(schedZeroProp.packetHops[1][0].txStartMs - 6) < 1e-9);
  assert.ok(Math.abs(schedZeroProp.packetHops[1][0].txEndMs - 12) < 1e-9);
});

test('Message segmentation reproduces Problem P31 and Figure 1.27 speedup', () => {
  // Problem P31: N = 3 links (2 routers), each R = 5 Mbps, packet L = 10,000 bits (1250 B) -> L/R = 2 ms
  const sched = simulatePacketSchedule({
    packetBytes: 1250,
    packetCount: 4,
    routerCount: 2,
    forwardingMode: 'store-and-forward',
    links: [
      { rateMbps: 5, distanceKm: 0, speedFactor: 2.5 },
      { rateMbps: 5, distanceKm: 0, speedFactor: 2.5 },
      { rateMbps: 5, distanceKm: 0, speedFactor: 2.5 }
    ]
  });
  // Packet 1 across 3 links: 3 * 2 = 6 ms
  assert.ok(Math.abs(sched.summary.firstPacketTotalMs - 6) < 1e-9);
  // Packet 2 fully received at switch 1 at t = 4 ms (Problem P31b)
  assert.ok(Math.abs(sched.packetHops[1][0].lastBitArrivesMs - 4) < 1e-9);
  // All 4 packets delivered at (3 + 4 - 1) * 2 = 12 ms (whereas unsegmented 40,000 bits takes 3 * 8 = 24 ms)
  assert.ok(Math.abs(sched.summary.allPacketsTotalMs - 12) < 1e-9);
  assert.ok(Math.abs(sched.summary.unsegmentedTotalMs - 24) < 1e-9);
});

test('Heterogeneous bottleneck link (R1 > R2) accumulates deterministic router queuing delay (Problem P23)', () => {
  // Preset: R1 = 6 Mbps (d_trans,1 = 2 ms), R2 = 2 Mbps (d_trans,2 = 6 ms), d_prop = 3 ms on each link
  const sched = simulatePacketSchedule(PACKET_DELAY_PRESETS['bottleneck-queue']);
  const hops = sched.packetHops;

  // Packet 1 arrives at router at 2 + 3 = 5 ms, no queue (0 ms), transmits 5..11 ms, arrives dest at 14 ms
  assert.ok(Math.abs(hops[0][0].lastBitArrivesMs - 5) < 1e-9);
  assert.ok(Math.abs(hops[0][1].queueDelayMs - 0) < 1e-9);
  assert.ok(Math.abs(hops[0][1].lastBitArrivesMs - 14) < 1e-9);

  // Packet 2 arrives at router at 4 + 3 = 7 ms, waits until 11 ms (queue = 4 ms), arrives dest at 20 ms
  assert.ok(Math.abs(hops[1][0].lastBitArrivesMs - 7) < 1e-9);
  assert.ok(Math.abs(hops[1][1].queueDelayMs - 4) < 1e-9);
  assert.ok(Math.abs(hops[1][1].lastBitArrivesMs - 20) < 1e-9);

  // Packet 3 arrives at router at 6 + 3 = 9 ms, waits until 17 ms (queue = 8 ms), arrives dest at 26 ms
  assert.ok(Math.abs(hops[2][0].lastBitArrivesMs - 9) < 1e-9);
  assert.ok(Math.abs(hops[2][1].queueDelayMs - 8) < 1e-9);
  assert.ok(Math.abs(hops[2][1].lastBitArrivesMs - 26) < 1e-9);

  // Inter-arrival time at destination is L / R2 = 6 ms
  assert.ok(Math.abs((hops[1][1].lastBitArrivesMs - hops[0][1].lastBitArrivesMs) - 6) < 1e-9);
  assert.ok(Math.abs((hops[2][1].lastBitArrivesMs - hops[1][1].lastBitArrivesMs) - 6) < 1e-9);

  // Evaluate state at t = 8 ms: Packet 1 is transmitting on Link 2, Packet 2 is queued at Router 1, Packet 3 is propagating on Link 1
  const stateAt8 = evaluateNetworkStateAtTime(sched, 8);
  assert.equal(stateAt8.routerStates[0].transmittingPacket.packetNumber, 1);
  assert.deepEqual(stateAt8.routerStates[0].queuedPackets.map(p => p.packetNumber), [2]);
  assert.equal(stateAt8.routerStates[0].receivingPackets[0].packetNumber, 3);
});

test('Kurose & Ross book and §1.4 lesson have complete bilingual metadata, TOC map, formulas, study paths, clinic and questions', () => {
  assert.equal(BOOKS.length, 2);
  const krTr = getBook('kurose-ross-8e', 'tr');
  const krEn = getBook('kurose-ross-8e', 'en');
  assert.equal(krTr.chapters.length, 8);
  assert.equal(krEn.chapters.length, 8);
  assert.equal(krTr.pdfPages, 775);
  assert.equal(krTr.pdfPageOffset, 11);

  for (const lang of ['tr', 'en']) {
    const { book, lesson } = getLesson('kurose-ross-8e:1.4', lang);
    assert.equal(book.id, 'kurose-ross-8e');
    assert.equal(lesson.section, '1.4');
    assert.equal(lesson.labFamily, 'packet-delay');
    assert.equal(lesson.studySupport.paths.length, 2);
    for (const path of lesson.studySupport.paths) {
      assert.equal(path.steps.length, 5);
      for (const st of path.steps) {
        assert.ok(st.label && st.math && st.text);
      }
    }
    assert.equal(lesson.studySupport.predictions.length, 2);
    assert.equal(lesson.guidedTools.examClinic.length, 4);
    for (const c of lesson.guidedTools.examClinic) {
      assert.ok(c.title && c.statement && c.trap);
      assert.equal(c.steps.length, 5);
    }
    assert.equal(lesson.questions.length, 12);
  }

  // Verify bilingual formula parity and absence of raw LaTeX in prose
  const mathMap = JSON.parse(readFileSync('dist/lessons/kurose-ross-8e/1-4/math.json', 'utf8'));
  const inlineMap = JSON.parse(readFileSync('dist/lessons/kurose-ross-8e/1-4/inline.json', 'utf8'));
  assert.equal(Object.keys(mathMap).length, 13);
  assert.ok(Object.keys(inlineMap).length >= 90);

  for (const mdPath of ['dist/lessons/kurose-ross-8e/1-4/lesson.md', 'dist/lessons/kurose-ross-8e/1-4/lesson-en.md']) {
    const raw = readFileSync(mdPath, 'utf8');
    const blocks = [...raw.matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m => m[1].trim());
    assert.equal(blocks.length, 13);
    for (const b of blocks) {
      assert.ok(mathMap[b], `missing display MathML for ${b} in ${mdPath}`);
    }
    const inlines = [...raw.matchAll(/\\\((.+?)\\\)/g)].map(m => m[1].trim());
    for (const tok of inlines) {
      assert.ok(inlineMap[tok], `missing inline MathML for ${tok} in ${mdPath}`);
    }
  }
});
