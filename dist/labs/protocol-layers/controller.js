import {traceEncapsulation, MESSAGE_LIMITS} from '../../models/protocol-layers.js';
import {escapeHtml} from '../../core/html.js';

export function mount(root, initialContext) {
  let context = initialContext;
  let index = 0;
  let protocol = 'tcp';
  let messageBytes = 1000;
  const events = new AbortController();
  const listenerOptions = {signal: events.signal};

  root.innerHTML = `<section class="panel sep-experiment layers-lab">
    <header class="cx-section-head"><h3 data-copy="layersLabTitle"></h3><p data-copy="layersLabIntro"></p></header>
    <div class="sep-grid">
      <div class="sep-controls">
        <div class="sep-control">
          <label for="layers-protocol" data-copy="layersProtocol"></label>
          <select id="layers-protocol"><option value="tcp">TCP</option><option value="udp">UDP</option></select>
        </div>
        <div class="sep-control">
          <label for="layers-size" data-copy="layersMessageSize"></label>
          <input id="layers-size" type="number" inputmode="numeric" min="${MESSAGE_LIMITS.min}" max="${MESSAGE_LIMITS.max}" value="${messageBytes}" required aria-describedby="layers-size-error">
          <p id="layers-size-error" hidden data-copy="layersSizeError"></p>
        </div>
        <div class="sep-presets">
          <button type="button" class="button secondary" data-size="12" data-copy="layersSmall"></button>
          <button type="button" class="button secondary" data-size="1000" data-copy="layersLarge"></button>
        </div>
      </div>
      <div class="sep-plot-wrap">
        <div class="layers-route">
          <span data-node="sender" data-copy="layersSender"></span>
          <span data-node="switch" data-copy="layersSwitch"></span>
          <span data-node="router" data-copy="layersRouter"></span>
          <span data-node="receiver" data-copy="layersReceiver"></span>
        </div>
        <div class="layers-stage" role="status" aria-atomic="true"></div>
        <div class="layers-actions">
          <button type="button" class="button secondary" data-move="-1" data-copy="layersBack"></button>
          <output class="layers-count"></output>
          <button type="button" class="button primary" data-move="1" data-copy="layersNext"></button>
        </div>
      </div>
    </div>
    <p class="sep-boundary-note" data-copy="layersLimit"></p>
  </section>`;

  const panel = root.firstElementChild;
  const find = selector => panel.querySelector(selector);
  const sizeInput = find('#layers-size');
  const sizeError = find('#layers-size-error');
  const stagePanel = find('.layers-stage');
  const back = find('[data-move="-1"]');
  const next = find('[data-move="1"]');

  function render() {
    const {t, format} = context;
    const count = value => format(value, 0);
    const stages = traceEncapsulation(messageBytes, protocol);
    const stage = stages[index];

    for (const node of panel.querySelectorAll('[data-node]')) {
      if (node.dataset.node === stage.node) node.setAttribute('aria-current', 'step');
      else node.removeAttribute('aria-current');
    }

    const partLabels = {message: 'layersMessage', tcp: 'layersTcp', udp: 'layersUdp',
      ip: 'layersIp', ethernet: 'layersEthernet', padding: 'layersPadding', fcs: 'layersFcs'};
    const parts = stage.parts.map(part =>
      `<li data-part="${part.kind}"><strong>${escapeHtml(t(partLabels[part.kind]))}</strong>
        <span>${escapeHtml(t('layersBytes', count(part.bytes)))}</span></li>`).join('');

    stagePanel.innerHTML = `<h4>${escapeHtml(t('layersStage_' + stage.id, protocol.toUpperCase()))}</h4>
      <p>${escapeHtml(t('layersExplain_' + stage.id))}</p><ul class="layers-parts">${parts}</ul>
      <div class="layers-summary">
        <strong>${escapeHtml(t('layersTotal', count(stage.bytes)))}</strong>
        ${stage.link ? `<span>${escapeHtml(t('layersLink', count(stage.link)))}</span>` : ''}
        ${stage.ttl ? `<span>TTL ${count(stage.ttl)}</span>` : ''}
      </div>
      ${stage.link ? `<p class="layers-mac">${escapeHtml(t(stage.link === 1 ? 'layersMacFirst' : 'layersMacSecond'))}</p>` : ''}`;

    find('.layers-count').textContent = `${count(index + 1)} / ${count(stages.length)}`;
    back.disabled = index === 0;
    next.disabled = index === stages.length - 1;
  }

  function update(nextContext) {
    context = nextContext;
    for (const element of panel.querySelectorAll('[data-copy]')) {
      element.textContent = context.t(element.dataset.copy);
    }
    render();
  }

  function changeSize() {
    const valid = sizeInput.validity.valid;
    sizeError.hidden = valid;
    sizeInput.setAttribute('aria-invalid', String(!valid));
    if (!valid) return;
    messageBytes = sizeInput.valueAsNumber;
    render();
  }

  sizeInput.addEventListener('input', changeSize, listenerOptions);
  find('#layers-protocol').addEventListener('change', event => {
    protocol = event.target.value;
    render();
  }, listenerOptions);
  panel.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.move) {
      index += Number(button.dataset.move);
      render();
      if (button.disabled) (button === back ? next : back).focus();
    }
    if (button.dataset.size) {
      sizeInput.value = button.dataset.size;
      changeSize();
    }
  }, listenerOptions);
  update(context);

  return {
    update,
    destroy() {
      events.abort();
      panel.remove();
    }
  };
}
