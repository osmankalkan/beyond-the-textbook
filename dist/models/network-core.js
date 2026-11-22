// One frame has capacity for K equal-size packets. Each active flow offers one
// packet at the start of each burst frame. Circuit reservations last throughout.
export function compareSwitching(capacity, activeFlows, burstFrames) {
  if (!Number.isInteger(capacity) || capacity < 2 || capacity > 8 ||
      !Number.isInteger(activeFlows) || activeFlows < 1 || activeFlows > 12 ||
      !Number.isInteger(burstFrames) || burstFrames < 1 || burstFrames > 6) {
    throw new RangeError('Expected capacity 2–8, active flows 1–12 and burst frames 1–6');
  }

  const admitted = Math.min(activeFlows, capacity);
  const blockedFlows = activeFlows - admitted;
  const frames = [];
  let queue = 0;
  let peakQueue = 0;
  for (let index = 0; index < burstFrames || queue > 0; index++) {
    const arrivals = index < burstFrames ? activeFlows : 0;
    const packetSent = Math.min(queue + arrivals, capacity);
    queue += arrivals - packetSent;
    peakQueue = Math.max(peakQueue, queue);
    const circuitSent = arrivals > 0 ? admitted : 0;
    frames.push({
      arrivals, packetSent, queue, circuitSent, idleCircuits: capacity - circuitSent
    });
  }

  return {frames, peakQueue, blockedFlows};
}
