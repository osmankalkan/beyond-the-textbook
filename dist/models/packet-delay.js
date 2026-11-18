/**
 * Pure analytical model for Packet Switching, Store-and-Forward Transmission,
 * Transmission Delay (L/R), Propagation Delay (d/v), and End-to-End Pipelining.
 *
 * Reference: Kurose & Ross, Computer Networking: A Top-Down Approach, 8th Ed.,
 * §1.3.1 (Packet Switching & Store-and-Forward, pp. 23–26) and
 * §1.4.1–§1.4.4 (Overview of Delay, Queuing, End-to-End Delay, Throughput, pp. 35–46).
 *
 * Units used in model API:
 * - L (packetBits): bits (> 0)
 * - R (rateBps or rateMbps): bits/sec (> 0)
 * - d (distanceKm or distanceM): meters (> 0)
 * - v (propSpeedMps): meters/sec (> 0, typical 2e8 to 3e8 m/s)
 * - All internal times can be computed in seconds (s) and milliseconds (ms).
 */

export const PACKET_COLORS = [
  '#2563eb', // Packet 1: Blue
  '#059669', // Packet 2: Emerald
  '#d97706', // Packet 3: Amber
  '#7c3aed', // Packet 4: Purple
  '#dc2626', // Packet 5: Red
  '#0891b2'  // Packet 6: Cyan
];

export const PACKET_DELAY_PRESETS = {
  'kurose-fig-1-11': {
    id: 'kurose-fig-1-11',
    packetBytes: 1500,        // L = 12,000 bits (1.5 KB)
    packetCount: 3,           // P = 3 packets (as in Figure 1.11)
    routerCount: 1,           // 1 router -> N = 2 links
    forwardingMode: 'store-and-forward',
    links: [
      { rateMbps: 2, distanceKm: 1000, speedFactor: 2.0 }, // d_trans = 6 ms, d_prop = 5 ms
      { rateMbps: 2, distanceKm: 1000, speedFactor: 2.0 }
    ]
  },
  'lan-tx-dominant': {
    id: 'lan-tx-dominant',
    packetBytes: 1500,        // L = 12,000 bits
    packetCount: 3,
    routerCount: 1,
    forwardingMode: 'store-and-forward',
    links: [
      { rateMbps: 1, distanceKm: 20, speedFactor: 2.0 },   // d_trans = 12 ms, d_prop = 0.1 ms (d_trans >> d_prop)
      { rateMbps: 1, distanceKm: 20, speedFactor: 2.0 }
    ]
  },
  'wan-prop-dominant': {
    id: 'wan-prop-dominant',
    packetBytes: 500,         // L = 4,000 bits
    packetCount: 3,
    routerCount: 1,
    forwardingMode: 'store-and-forward',
    links: [
      { rateMbps: 10, distanceKm: 3000, speedFactor: 2.0 }, // d_trans = 0.4 ms, d_prop = 15 ms (d_prop >> d_trans)
      { rateMbps: 10, distanceKm: 3000, speedFactor: 2.0 }
    ]
  },
  'bottleneck-queue': {
    id: 'bottleneck-queue',
    packetBytes: 1500,        // L = 12,000 bits
    packetCount: 4,
    routerCount: 1,
    forwardingMode: 'store-and-forward',
    links: [
      { rateMbps: 6, distanceKm: 600, speedFactor: 2.0 },  // Link 1: d_trans = 2 ms, d_prop = 3 ms (fast link)
      { rateMbps: 2, distanceKm: 600, speedFactor: 2.0 }   // Link 2: d_trans = 6 ms, d_prop = 3 ms (slow bottleneck -> router queuing!)
    ]
  },
  'two-router-pipeline': {
    id: 'two-router-pipeline',
    packetBytes: 1250,        // L = 10,000 bits (Problem P31 style)
    packetCount: 4,
    routerCount: 2,           // 2 routers -> N = 3 links (Fig 1.27 style)
    forwardingMode: 'store-and-forward',
    links: [
      { rateMbps: 5, distanceKm: 500, speedFactor: 2.5 },  // d_trans = 2 ms, d_prop = 2 ms
      { rateMbps: 5, distanceKm: 500, speedFactor: 2.5 },
      { rateMbps: 5, distanceKm: 500, speedFactor: 2.5 }
    ]
  }
};

/**
 * Compute transmission delay d_trans = L / R in seconds and milliseconds.
 * @param {number} packetBits - L in bits (> 0)
 * @param {number} rateBps - R in bits/sec (> 0)
 */
export function transmissionDelay(packetBits, rateBps) {
  if (!(packetBits > 0) || !(rateBps > 0)) {
    throw new RangeError('packetBits (L) and rateBps (R) must be positive numbers');
  }
  const seconds = packetBits / rateBps;
  return {
    seconds,
    ms: seconds * 1000
  };
}

/**
 * Compute propagation delay d_prop = d / v in seconds and milliseconds.
 * @param {number} distanceMeters - d in meters (>= 0)
 * @param {number} speedMps - v in meters/sec (> 0)
 */
export function propagationDelay(distanceMeters, speedMps) {
  if (!(distanceMeters >= 0) || !(speedMps > 0)) {
    throw new RangeError('distanceMeters (d >= 0) and speedMps (v > 0) are required');
  }
  const seconds = distanceMeters / speedMps;
  return {
    seconds,
    ms: seconds * 1000
  };
}

/**
 * Compute bandwidth-delay product (BDP = R * d_prop) in bits, and spatial bit width (v / R) in meters.
 * Reference: Chapter 1 Problems P25–P27 (printed p. 74).
 */
export function linkWaveMetrics(packetBits, rateBps, distanceMeters, speedMps) {
  const tx = transmissionDelay(packetBits, rateBps);
  const prop = propagationDelay(distanceMeters, speedMps);
  const bdpBits = rateBps * prop.seconds;
  const bitWidthMeters = speedMps / rateBps;
  const packetSpatialLengthMeters = bitWidthMeters * packetBits;
  const fractionOfLinkOccupied = distanceMeters > 0 ? packetSpatialLengthMeters / distanceMeters : Infinity;
  const maxBitsInLink = Math.min(packetBits, bdpBits);

  return {
    dTransSec: tx.seconds,
    dTransMs: tx.ms,
    dPropSec: prop.seconds,
    dPropMs: prop.ms,
    bdpBits,
    bitWidthMeters,
    packetSpatialLengthMeters,
    fractionOfLinkOccupied,
    maxBitsInLink,
    firstBitArrivesBeforeTxEnds: prop.seconds < tx.seconds
  };
}

/**
 * Normalize configuration parameters for an N-link (1 or 2 routers), P-packet scenario.
 */
export function normalizeNetworkConfig(raw = {}) {
  const packetBytes = Math.max(64, Math.min(10000, Number(raw.packetBytes) || 1500));
  const packetBits = raw.packetBits ? Number(raw.packetBits) : packetBytes * 8;
  const packetCount = Math.max(1, Math.min(6, Math.round(Number(raw.packetCount) || 3)));
  const routerCount = raw.routerCount === 2 ? 2 : 1;
  const linkCount = routerCount + 1;
  const forwardingMode = raw.forwardingMode === 'cut-through' ? 'cut-through' : 'store-and-forward';

  const rawLinks = Array.isArray(raw.links) && raw.links.length > 0
    ? raw.links
    : [
        { rateMbps: raw.rateMbps ?? 2, distanceKm: raw.distanceKm ?? 1000, speedFactor: raw.speedFactor ?? 2.0 },
        { rateMbps: raw.rate2Mbps ?? raw.rateMbps ?? 2, distanceKm: raw.distance2Km ?? raw.distanceKm ?? 1000, speedFactor: raw.speedFactor ?? 2.0 },
        { rateMbps: raw.rate3Mbps ?? raw.rateMbps ?? 2, distanceKm: raw.distance3Km ?? raw.distanceKm ?? 1000, speedFactor: raw.speedFactor ?? 2.0 }
      ];

  const links = [];
  for (let i = 0; i < linkCount; i++) {
    const src = rawLinks[Math.min(i, rawLinks.length - 1)] || {};
    const rateMbps = Math.max(0.1, Math.min(1000, Number(src.rateMbps) || 2));
    const distanceKm = Math.max(0, Math.min(40000, Number(src.distanceKm ?? 1000)));
    const speedFactor = Math.max(1.0, Math.min(3.0, Number(src.speedFactor) || 2.0)); // in units of 10^8 m/s
    const rateBps = rateMbps * 1e6;
    const distanceMeters = distanceKm * 1000;
    const speedMps = speedFactor * 1e8;
    const metrics = linkWaveMetrics(packetBits, rateBps, distanceMeters, speedMps);
    links.push({
      index: i,
      rateMbps,
      rateBps,
      distanceKm,
      distanceMeters,
      speedFactor,
      speedMps,
      ...metrics
    });
  }

  return {
    packetBytes,
    packetBits,
    packetCount,
    routerCount,
    linkCount,
    forwardingMode,
    links
  };
}

/**
 * Compute exact event schedule and hop timings for P packets across N links.
 * Supports both 'store-and-forward' (standard router behavior, Eq 1.1 & 1.2)
 * and 'cut-through' (hypothetical bit-by-bit immediate forwarding mentioned on p. 24 & Problem P11
 * when downstream links are at least as fast as upstream links).
 *
 * Returns per-packet, per-link exact timestamps in milliseconds (ms):
 * - txStartMs: when sender/router begins pushing the first bit onto link i
 * - txEndMs: when sender/router finishes pushing the last bit onto link i (txStartMs + dTransMs)
 * - firstBitArrivesMs: when the first bit reaches the end of link i (txStartMs + dPropMs)
 * - lastBitArrivesMs: when the last bit reaches the end of link i (txEndMs + dPropMs)
 * - queueArrivalMs: when the packet is ready to enter link i's output queue
 * - queueDelayMs: time spent waiting in link i's output buffer before txStartMs
 */
export function simulatePacketSchedule(rawConfig = {}) {
  const config = normalizeNetworkConfig(rawConfig);
  const { packetBits, packetCount, linkCount, forwardingMode, links } = config;

  // packetHops[p][i] stores timing for packet p (0..P-1) on link i (0..N-1)
  const packetHops = Array.from({ length: packetCount }, () => []);

  for (let i = 0; i < linkCount; i++) {
    const link = links[i];
    let prevTxEndMs = 0;

    for (let p = 0; p < packetCount; p++) {
      let readyMs = 0;
      if (i === 0) {
        // All P packets are ready in the source buffer at t = 0, sent back-to-back
        readyMs = p === 0 ? 0 : packetHops[p - 1][0].txEndMs;
      } else {
        const prevHop = packetHops[p][i - 1];
        const prevLink = links[i - 1];
        if (forwardingMode === 'cut-through') {
          // In cut-through, if link i is slower than link i-1, starting when first bit arrives
          // would cause buffer underflow if link i is faster!
          // Specifically: last bit cannot leave node i before it arrives from link i-1.
          // Earliest start so that txEndMs >= prevHop.lastBitArrivesMs and txStartMs >= prevHop.firstBitArrivesMs:
          const minStartForUnderflow = prevHop.lastBitArrivesMs - link.dTransMs;
          readyMs = Math.max(prevHop.firstBitArrivesMs, minStartForUnderflow);
        } else {
          // Store-and-forward: router must receive the ENTIRE packet (last bit) before forwarding
          readyMs = prevHop.lastBitArrivesMs;
        }
      }

      const txStartMs = Math.max(readyMs, prevTxEndMs);
      const queueDelayMs = Math.max(0, txStartMs - readyMs);
      const txEndMs = txStartMs + link.dTransMs;
      const firstBitArrivesMs = txStartMs + link.dPropMs;
      const lastBitArrivesMs = txEndMs + link.dPropMs;

      prevTxEndMs = txEndMs;

      packetHops[p][i] = {
        packetIndex: p,
        packetNumber: p + 1,
        linkIndex: i,
        linkNumber: i + 1,
        color: PACKET_COLORS[p % PACKET_COLORS.length],
        readyMs,
        queueDelayMs,
        txStartMs,
        txEndMs,
        firstBitArrivesMs,
        lastBitArrivesMs,
        dTransMs: link.dTransMs,
        dPropMs: link.dPropMs
      };
    }
  }

  // Build chronological discrete events list
  const rawEvents = [];
  const eps = 1e-7;

  for (let p = 0; p < packetCount; p++) {
    for (let i = 0; i < linkCount; i++) {
      const hop = packetHops[p][i];
      rawEvents.push({
        timeMs: hop.txStartMs,
        type: 'tx-start',
        packetNumber: p + 1,
        linkNumber: i + 1,
        nodeIndex: i,
        queueDelayMs: hop.queueDelayMs
      });
      rawEvents.push({
        timeMs: hop.firstBitArrivesMs,
        type: 'first-bit-arrives',
        packetNumber: p + 1,
        linkNumber: i + 1,
        nodeIndex: i + 1
      });
      rawEvents.push({
        timeMs: hop.txEndMs,
        type: 'tx-end',
        packetNumber: p + 1,
        linkNumber: i + 1,
        nodeIndex: i
      });
      rawEvents.push({
        timeMs: hop.lastBitArrivesMs,
        type: i === linkCount - 1 ? 'packet-delivered' : 'router-stored',
        packetNumber: p + 1,
        linkNumber: i + 1,
        nodeIndex: i + 1
      });
    }
  }

  const typeOrder = {
    'tx-start': 1,
    'first-bit-arrives': 2,
    'tx-end': 3,
    'router-stored': 4,
    'packet-delivered': 5
  };

  rawEvents.sort((a, b) => {
    if (Math.abs(a.timeMs - b.timeMs) > eps) return a.timeMs - b.timeMs;
    if (a.packetNumber !== b.packetNumber) return a.packetNumber - b.packetNumber;
    return (typeOrder[a.type] || 9) - (typeOrder[b.type] || 9);
  });

  // Group distinct event timestamps for single-step advancing
  const eventTimestampsMs = [0];
  for (const ev of rawEvents) {
    const last = eventTimestampsMs[eventTimestampsMs.length - 1];
    if (Math.abs(ev.timeMs - last) > 1e-4) {
      eventTimestampsMs.push(Number(ev.timeMs.toFixed(6)));
    }
  }

  const firstPacketTotalMs = packetHops[0][linkCount - 1].lastBitArrivesMs;
  const allPacketsTotalMs = packetHops[packetCount - 1][linkCount - 1].lastBitArrivesMs;

  // Also compute what the total delay would be WITHOUT store-and-forward (cut-through) or WITHOUT segmentation
  const sumTransMs = links.reduce((acc, l) => acc + l.dTransMs, 0);
  const sumPropMs = links.reduce((acc, l) => acc + l.dPropMs, 0);
  const bottleneckRateMbps = Math.min(...links.map(l => l.rateMbps));
  const bottleneckRateBps = Math.min(...links.map(l => l.rateBps));
  const maxQueueDelayMs = Math.max(0, ...packetHops.flat().map(h => h.queueDelayMs));

  // Unsegmented message of size P * L bits across the same store-and-forward path
  const unsegmentedTotalMs = packetCount * sumTransMs + sumPropMs;
  const effectiveThroughputMbps = allPacketsTotalMs > 0
    ? ((packetCount * packetBits) / (allPacketsTotalMs / 1000)) / 1e6
    : 0;

  return {
    config,
    packetHops,
    events: rawEvents,
    eventTimestampsMs,
    summary: {
      firstPacketTotalMs,
      allPacketsTotalMs,
      sumTransMs,
      sumPropMs,
      bottleneckRateMbps,
      bottleneckRateBps,
      maxQueueDelayMs,
      unsegmentedTotalMs,
      pipelineSavingsMs: Math.max(0, unsegmentedTotalMs - allPacketsTotalMs),
      effectiveThroughputMbps
    }
  };
}

/**
 * Evaluate the exact physical state of every packet, link wave, and node buffer at time `timeMs`.
 * Crucially, animation positions are derived from the mathematical model state—never the reverse.
 */
export function evaluateNetworkStateAtTime(schedule, timeMs) {
  const { config, packetHops, summary } = schedule;
  const { packetCount, linkCount, links, forwardingMode } = config;
  const t = Math.max(0, Math.min(timeMs, summary.allPacketsTotalMs));
  const eps = 1e-7;

  // For each link, find active waves (bits currently in flight on the wire)
  const linkStates = links.map((link, i) => {
    const activeWaves = [];
    let transmittingPacket = null;

    for (let p = 0; p < packetCount; p++) {
      const hop = packetHops[p][i];
      if (t >= hop.txStartMs - eps && t <= hop.txEndMs + eps) {
        transmittingPacket = p + 1;
      }
      // Bits of packet p are on link i when t is between txStartMs and lastBitArrivesMs
      if (t > hop.txStartMs + eps && t < hop.lastBitArrivesMs - eps) {
        // Front of packet (first bit): entered at txStartMs, travels at speed v -> normalized position (t - txStartMs) / dPropMs
        const frontProgress = link.dPropMs > 0
          ? Math.min(1, Math.max(0, (t - hop.txStartMs) / link.dPropMs))
          : 1;
        // Tail of packet (last bit): enters at txEndMs -> normalized position (t - txEndMs) / dPropMs
        const tailProgress = link.dPropMs > 0
          ? Math.min(1, Math.max(0, (t - hop.txEndMs) / link.dPropMs))
          : 0;

        if (frontProgress > tailProgress + 1e-6) {
          const bitsOnWireFraction = frontProgress - tailProgress;
          activeWaves.push({
            packetIndex: p,
            packetNumber: p + 1,
            color: hop.color,
            tailProgress,   // x0 in [0, 1] along the link
            frontProgress,  // x1 in [0, 1] along the link
            widthFraction: bitsOnWireFraction,
            isStillTransmitting: t < hop.txEndMs - eps,
            isBeingReceived: t > hop.firstBitArrivesMs + eps
          });
        }
      }
    }

    return {
      linkIndex: i,
      linkNumber: i + 1,
      transmittingPacket,
      activeWaves
    };
  });

  // Evaluate each packet's overall state and node buffer occupancy
  const sourceQueue = [];
  const deliveredPackets = [];
  const routerStates = Array.from({ length: linkCount - 1 }, (_, rIdx) => ({
    routerIndex: rIdx,
    routerNumber: rIdx + 1,
    receivingPackets: [], // partially arrived (store-and-forward buffering in progress)
    queuedPackets: [],    // completely arrived, waiting in output queue for link rIdx + 1
    transmittingPacket: null
  }));

  const packetStates = [];

  for (let p = 0; p < packetCount; p++) {
    const hops = packetHops[p];
    const firstHop = hops[0];
    const lastHop = hops[linkCount - 1];

    // Source buffer status
    if (t < firstHop.txStartMs - eps) {
      sourceQueue.push({ packetNumber: p + 1, color: firstHop.color, fractionRemaining: 1 });
    } else if (t < firstHop.txEndMs - eps) {
      const frac = Math.max(0, (firstHop.txEndMs - t) / firstHop.dTransMs);
      sourceQueue.push({ packetNumber: p + 1, color: firstHop.color, fractionRemaining: frac, isTransmitting: true });
    }

    // Destination status
    if (t >= lastHop.lastBitArrivesMs - eps) {
      deliveredPackets.push({ packetNumber: p + 1, color: lastHop.color, fractionReceived: 1, complete: true });
    } else if (t > lastHop.firstBitArrivesMs + eps) {
      const frac = Math.min(1, (t - lastHop.firstBitArrivesMs) / lastHop.dTransMs);
      deliveredPackets.push({ packetNumber: p + 1, color: lastHop.color, fractionReceived: frac, complete: false });
    }

    // Router buffer statuses
    for (let r = 0; r < linkCount - 1; r++) {
      const inHop = hops[r];
      const outHop = hops[r + 1];
      const rState = routerStates[r];

      // Is router r currently receiving bits of packet p (store-and-forward accumulation)?
      if (forwardingMode === 'store-and-forward') {
        if (t > inHop.firstBitArrivesMs + eps && t < inHop.lastBitArrivesMs - eps) {
          const fracArrived = Math.min(1, Math.max(0, (t - inHop.firstBitArrivesMs) / inHop.dTransMs));
          rState.receivingPackets.push({
            packetNumber: p + 1,
            color: inHop.color,
            fractionArrived: fracArrived
          });
        }
        // Has the full packet arrived at router r, and is it waiting in the output queue?
        if (t >= inHop.lastBitArrivesMs - eps && t < outHop.txStartMs - eps) {
          rState.queuedPackets.push({
            packetNumber: p + 1,
            color: inHop.color
          });
        }
      }
      // Is router r currently transmitting packet p onto link r+1?
      if (t >= outHop.txStartMs - eps && t < outHop.txEndMs - eps) {
        const fracRemaining = Math.max(0, (outHop.txEndMs - t) / outHop.dTransMs);
        rState.transmittingPacket = {
          packetNumber: p + 1,
          color: outHop.color,
          fractionRemaining: fracRemaining
        };
      }
    }

    // High-level packet status badge
    let phase = 'waiting-source';
    let activeLink = null;
    let activeRouter = null;

    if (t >= lastHop.lastBitArrivesMs - eps) {
      phase = 'delivered';
    } else {
      for (let i = 0; i < linkCount; i++) {
        const h = hops[i];
        if (t >= h.txStartMs - eps && t < h.lastBitArrivesMs - eps) {
          phase = t < h.txEndMs - eps ? 'transmitting-and-propagating' : 'propagating';
          activeLink = i + 1;
          break;
        }
        if (i < linkCount - 1) {
          const nextH = hops[i + 1];
          if (t >= h.lastBitArrivesMs - eps && t < nextH.txStartMs - eps) {
            phase = 'queued-at-router';
            activeRouter = i + 1;
            break;
          }
        }
      }
    }

    packetStates.push({
      packetNumber: p + 1,
      color: firstHop.color,
      phase,
      activeLink,
      activeRouter
    });
  }

  return {
    timeMs: t,
    sourceQueue,
    routerStates,
    deliveredPackets,
    linkStates,
    packetStates
  };
}
