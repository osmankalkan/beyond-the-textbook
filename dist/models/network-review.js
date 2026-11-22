import {traceEncapsulation} from './protocol-layers.js';
import {simulatePacketSchedule} from './packet-delay.js';

export function compareCampusPath(messageBytes, change) {
  const frame = traceEncapsulation(messageBytes, 'tcp').find(stage => stage.id === 'firstFrame');
  const choices = {
    baseline: [10, 2, 400],
    access: [20, 2, 400],
    core: [10, 10, 400],
    nearby: [10, 2, 40]
  };
  if (!Object.hasOwn(choices, change)) throw new RangeError('Choose an available path');

  const schedule = ([accessRate, coreRate, coreDistance]) => simulatePacketSchedule({
    packetBytes: frame.bytes, packetCount: 3, routerCount: 1,
    links: [
      {rateMbps: accessRate, distanceKm: 2, speedFactor: 2},
      {rateMbps: coreRate, distanceKm: coreDistance, speedFactor: 2}
    ]
  }).summary;

  return {frameBytes: frame.bytes, baseline: schedule(choices.baseline), current: schedule(choices[change])};
}
