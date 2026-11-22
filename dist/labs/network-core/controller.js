import {compareSwitching} from '../../models/network-core.js';

const controls = [
  ['capacity', 'coreCapacity', 2, 8],
  ['activeFlows', 'coreFlows', 1, 12],
  ['burstFrames', 'coreBurst', 1, 6]
];

const presets = {
  quiet: {capacity: 4, activeFlows: 2, burstFrames: 3},
  burst: {capacity: 4, activeFlows: 7, burstFrames: 3}
};

export function mount(root, initialContext) {
  let context = initialContext;
  const state = {...presets.quiet};
  let frameIndex = 0;

  root.innerHTML = `<section class="panel sep-experiment network-core-lab">
    <header class="cx-section-head"><h3 data-copy="coreLabTitle"></h3><p data-copy="coreLabIntro"></p></header>
    <div class="sep-grid">
      <div class="sep-controls">
        ${controls.map(([key, label, min, max]) => `
          <div class="sep-control">
            <label for="core-${key}"><span data-copy="${label}"></span><output data-value="${key}" for="core-${key}"></output></label>
            <input id="core-${key}" data-control="${key}" type="range" min="${min}" max="${max}">
          </div>`).join('')}
        <div class="sep-presets">
          <button type="button" class="button" data-preset="quiet" data-copy="coreQuiet"></button>
          <button type="button" class="button" data-preset="burst" data-copy="coreOverload"></button>
        </div>
      </div>
      <div class="sep-plot-wrap">
        <div class="sep-control">
          <label for="core-frame"><span data-copy="coreFrame"></span><output data-frame-value for="core-frame"></output></label>
          <input id="core-frame" data-frame type="range" min="1">
        </div>
        <div class="core-frame">
          <div data-row="packet"><strong data-copy="corePacket"></strong><div class="core-slots" aria-hidden="true"></div><p data-detail></p></div>
          <div data-row="circuit"><strong data-copy="coreCircuit"></strong><div class="core-slots" aria-hidden="true"></div><p data-detail></p></div>
        </div>
        <p class="core-result" role="status"></p>
      </div>
    </div>
    <p class="sep-boundary-note" data-copy="coreLabLimit"></p>
  </section>`;

  const panel = root.firstElementChild;
  const find = selector => panel.querySelector(selector);
  const frameInput = find('[data-frame]');

  function render() {
    const {t, format} = context;
    const num = value => format(value, 0);
    const {capacity, activeFlows, burstFrames} = state;
    const {frames, peakQueue, blockedFlows} = compareSwitching(capacity, activeFlows, burstFrames);
    frameIndex = Math.min(frameIndex, frames.length - 1);
    const frame = frames[frameIndex];

    for (const [key] of controls) {
      find(`[data-control="${key}"]`).value = state[key];
      find(`[data-value="${key}"]`).textContent = num(state[key]);
    }
    frameInput.max = frames.length;
    frameInput.value = frameIndex + 1;
    find('[data-frame-value]').textContent = `${num(frameIndex + 1)} / ${num(frames.length)}`;
    frameInput.setAttribute('aria-valuetext', t('coreFrameValue', num(frameIndex + 1), num(frames.length)));

    for (const [kind, sent, detail] of [
      ['packet', frame.packetSent, t('corePacketDetail', num(frame.arrivals), num(frame.packetSent), num(frame.queue))],
      ['circuit', frame.circuitSent, t('coreCircuitDetail', num(frame.circuitSent), num(frame.idleCircuits))]
    ]) {
      const row = find(`[data-row="${kind}"]`);
      row.querySelector('.core-slots').innerHTML = Array.from({length: capacity}, (_, index) =>
        `<span class="${index < sent ? 'filled' : 'empty'}"></span>`).join('');
      row.querySelector('[data-detail]').textContent = detail;
    }
    find('.core-result').textContent = t('coreResult', num(peakQueue), num(blockedFlows));
  }

  function update(nextContext) {
    context = nextContext;
    for (const node of panel.querySelectorAll('[data-copy]')) node.textContent = context.t(node.dataset.copy);
    render();
  }

  function onInput(event) {
    const {control, frame} = event.target.dataset;
    if (control) state[control] = event.target.valueAsNumber;
    else if (frame !== undefined) frameIndex = event.target.valueAsNumber - 1;
    else return;
    render();
  }

  function onClick(event) {
    const button = event.target.closest('[data-preset]');
    if (!button) return;
    Object.assign(state, presets[button.dataset.preset]);
    frameIndex = 0;
    render();
  }

  panel.addEventListener('input', onInput);
  panel.addEventListener('click', onClick);
  update(context);

  return {
    update,
    destroy() {
      panel.removeEventListener('input', onInput);
      panel.removeEventListener('click', onClick);
      panel.remove();
    }
  };
}
