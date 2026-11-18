import {escapeHtml as esc} from '../../core/html.js';
import {
  PACKET_DELAY_PRESETS,
  simulatePacketSchedule,
  evaluateNetworkStateAtTime
} from '../../models/packet-delay.js';
import {v, n, o, p, f, sub, eq, plus, minus, fn, lines} from '../../study/math.js';

export function mount(root, initial = {}) {
  let context = initial;
  const events = new AbortController();

  // Reduced motion preference check
  const prefersReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const state = {
    presetId: 'kurose-fig-1-11',
    packetBytes: 1500,
    packetCount: 3,
    routerCount: 1,
    forwardingMode: 'store-and-forward',
    rate1Mbps: 2,
    distance1Km: 1000,
    speed1Factor: 2.0,
    rate2Mbps: 2,
    distance2Km: 1000,
    speed2Factor: 2.0,
    rate3Mbps: 2,
    distance3Km: 1000,
    speed3Factor: 2.0,
    timeMs: 3.5, // Initial snapshot showing Packet 1 partially arrived at Router 1 (just like Figure 1.11!)
    playing: false,
    playSpeed: 0.5, // ms of simulation per real second * base factor
    reducedMotion: prefersReducedMotion,
    selectedPacket: 1
  };

  let rafId = 0;
  let lastStamp = 0;

  const fmt = (value, digits = 2) => (context.format ? context.format(value, digits) : Number(value).toFixed(digits));
  const t = (key, ...args) => (context.t ? context.t(key, ...args) : key);

  function buildSchedule() {
    const links = [
      { rateMbps: state.rate1Mbps, distanceKm: state.distance1Km, speedFactor: state.speed1Factor },
      { rateMbps: state.rate2Mbps, distanceKm: state.distance2Km, speedFactor: state.speed2Factor }
    ];
    if (state.routerCount === 2) {
      links.push({ rateMbps: state.rate3Mbps, distanceKm: state.distance3Km, speedFactor: state.speed3Factor });
    }
    return simulatePacketSchedule({
      packetBytes: state.packetBytes,
      packetCount: state.packetCount,
      routerCount: state.routerCount,
      forwardingMode: state.forwardingMode,
      links
    });
  }

  function stopPlayback() {
    state.playing = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    lastStamp = 0;
    const playBtn = root.querySelector('#pkt-play-btn');
    if (playBtn) {
      playBtn.textContent = `▶ ${t('pktBtnPlay')}`;
      playBtn.setAttribute('aria-pressed', 'false');
    }
  }

  function startPlayback() {
    if (state.reducedMotion) {
      stepNextEvent();
      return;
    }
    const schedule = buildSchedule();
    if (state.timeMs >= schedule.summary.allPacketsTotalMs - 1e-4) {
      state.timeMs = 0;
    }
    state.playing = true;
    lastStamp = 0;
    const playBtn = root.querySelector('#pkt-play-btn');
    if (playBtn) {
      playBtn.textContent = `⏸ ${t('pktBtnPause')}`;
      playBtn.setAttribute('aria-pressed', 'true');
    }
    rafId = requestAnimationFrame(tick);
  }

  function tick(stamp) {
    if (!state.playing) return;
    const schedule = buildSchedule();
    const maxT = Math.max(0.1, schedule.summary.allPacketsTotalMs);
    if (lastStamp) {
      const dtSec = (stamp - lastStamp) / 1000;
      // Full traversal takes roughly 8 seconds at 1x speed
      const simRate = (maxT / 8) * state.playSpeed;
      state.timeMs = Math.min(maxT, state.timeMs + dtSec * simRate);
    }
    lastStamp = stamp;
    draw(schedule);
    if (state.timeMs >= maxT - 1e-5) {
      stopPlayback();
    } else {
      rafId = requestAnimationFrame(tick);
    }
  }

  function stepNextEvent() {
    stopPlayback();
    const schedule = buildSchedule();
    const next = schedule.eventTimestampsMs.find(ts => ts > state.timeMs + 1e-3);
    state.timeMs = next !== undefined ? next : schedule.summary.allPacketsTotalMs;
    draw(schedule);
  }

  function stepPrevEvent() {
    stopPlayback();
    const schedule = buildSchedule();
    const prevList = schedule.eventTimestampsMs.filter(ts => ts < state.timeMs - 1e-3);
    state.timeMs = prevList.length > 0 ? prevList[prevList.length - 1] : 0;
    draw(schedule);
  }

  function resetSimulation() {
    stopPlayback();
    state.timeMs = 0;
    draw();
  }

  function applyPreset(presetId) {
    stopPlayback();
    const p = PACKET_DELAY_PRESETS[presetId];
    if (!p) return;
    state.presetId = presetId;
    state.packetBytes = p.packetBytes;
    state.packetCount = p.packetCount;
    state.routerCount = p.routerCount;
    state.forwardingMode = p.forwardingMode;
    state.rate1Mbps = p.links[0].rateMbps;
    state.distance1Km = p.links[0].distanceKm;
    state.speed1Factor = p.links[0].speedFactor;
    state.rate2Mbps = p.links[1].rateMbps;
    state.distance2Km = p.links[1].distanceKm;
    state.speed2Factor = p.links[1].speedFactor;
    if (p.links[2]) {
      state.rate3Mbps = p.links[2].rateMbps;
      state.distance3Km = p.links[2].distanceKm;
      state.speed3Factor = p.links[2].speedFactor;
    } else {
      state.rate3Mbps = state.rate2Mbps;
      state.distance3Km = state.distance2Km;
      state.speed3Factor = state.speed2Factor;
    }
    // Set an instructive default inspection time snapshot for Figure 1.11 preset
    state.timeMs = presetId === 'kurose-fig-1-11' ? 6.0 : 0;
    state.selectedPacket = 1;
    render();
  }

  function formulaMarkup() {
    const L = v('L'), R = v('R'), d = v('d'), s = v('v'), N = v('N'), P = v('P');
    return lines(
      sub(d, v('trans')) + eq + f(L, R) + o(',') + o(' ') + sub(d, v('prop')) + eq + f(d, s) + o(',') + o(' ') + v('BDP') + eq + R + o('·') + f(d, s),
      sub(d, v('end')) + p(P + o(',') + N) + eq + p(N + plus + P + minus + n(1)) + f(L, R) + plus + N + f(d, s)
    );
  }

  function controlSlider(id, label, min, max, step, value, unitStr, digits = 0) {
    return `
      <div class="sep-control">
        <label for="pkt-${id}">
          ${esc(label)}
          <output data-output="${id}">${fmt(value, digits)} <small>${esc(unitStr)}</small></output>
        </label>
        <input id="pkt-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
      </div>
    `;
  }

  function render() {
    const schedule = buildSchedule();
    const maxT = Math.max(0.1, schedule.summary.allPacketsTotalMs);
    state.timeMs = Math.max(0, Math.min(state.timeMs, maxT));

    root.innerHTML = `
      <section class="sep-lab packet-delay-lab">
        <header class="cx-header">
          <p class="eyebrow">${esc(t('pktEyebrow'))}</p>
          <h2>${esc(t('pktTitle'))}</h2>
          <p>${esc(t('pktSubtitle'))}</p>
        </header>

        <div class="panel sep-experiment">
          <div class="sep-toolbar" style="flex-wrap:wrap;gap:12px;">
            <div>
              <label for="pkt-preset">${esc(t('pktPresetLabel'))}</label>
              <select id="pkt-preset">
                <option value="kurose-fig-1-11" ${state.presetId === 'kurose-fig-1-11' ? 'selected' : ''}>${esc(t('pktPresetFig111'))}</option>
                <option value="lan-tx-dominant" ${state.presetId === 'lan-tx-dominant' ? 'selected' : ''}>${esc(t('pktPresetLan'))}</option>
                <option value="wan-prop-dominant" ${state.presetId === 'wan-prop-dominant' ? 'selected' : ''}>${esc(t('pktPresetWan'))}</option>
                <option value="bottleneck-queue" ${state.presetId === 'bottleneck-queue' ? 'selected' : ''}>${esc(t('pktPresetBottleneck'))}</option>
                <option value="two-router-pipeline" ${state.presetId === 'two-router-pipeline' ? 'selected' : ''}>${esc(t('pktPresetTwoRouter'))}</option>
              </select>
            </div>

            <div>
              <label for="pkt-mode">${esc(t('pktModeLabel'))}</label>
              <select id="pkt-mode">
                <option value="store-and-forward" ${state.forwardingMode === 'store-and-forward' ? 'selected' : ''}>${esc(t('pktModeStoreForward'))}</option>
                <option value="cut-through" ${state.forwardingMode === 'cut-through' ? 'selected' : ''}>${esc(t('pktModeCutThrough'))}</option>
              </select>
            </div>

            <div>
              <label for="pkt-routers">${esc(t('pktRoutersLabel'))}</label>
              <select id="pkt-routers">
                <option value="1" ${state.routerCount === 1 ? 'selected' : ''}>${esc(t('pktRoutersOne'))}</option>
                <option value="2" ${state.routerCount === 2 ? 'selected' : ''}>${esc(t('pktRoutersTwo'))}</option>
              </select>
            </div>

            <label style="display:inline-flex;align-items:center;gap:6px;font-size:0.88rem;">
              <input type="checkbox" id="pkt-reduced-motion" ${state.reducedMotion ? 'checked' : ''}>
              ${esc(t('pktReducedMotionLabel'))}
            </label>
          </div>

          <div class="sep-grid">
            <div class="sep-controls">
              ${controlSlider('packetBytes', t('pktParamBytesL'), 125, 2500, 125, state.packetBytes, 'Bayt / B (' + (state.packetBytes * 8) + ' bit)', 0)}
              ${controlSlider('packetCount', t('pktParamCountP'), 1, 5, 1, state.packetCount, t('pktUnitPackets'), 0)}
              <hr style="border:0;border-top:1px solid var(--line,#d8dfd0);margin:8px 0;">
              ${controlSlider('rate1Mbps', t('pktParamRate1'), 0.5, 20, 0.5, state.rate1Mbps, 'Mbps', 1)}
              ${controlSlider('distance1Km', t('pktParamDist1'), 10, 4000, 10, state.distance1Km, 'km', 0)}
              ${controlSlider('speed1Factor', t('pktParamSpeed'), 1.5, 3.0, 0.1, state.speed1Factor, '×10⁸ m/s', 1)}
              <hr style="border:0;border-top:1px solid var(--line,#d8dfd0);margin:8px 0;">
              ${controlSlider('rate2Mbps', t('pktParamRate2'), 0.5, 20, 0.5, state.rate2Mbps, 'Mbps', 1)}
              ${controlSlider('distance2Km', t('pktParamDist2'), 10, 4000, 10, state.distance2Km, 'km', 0)}
              ${state.routerCount === 2 ? `
                <hr style="border:0;border-top:1px solid var(--line,#d8dfd0);margin:8px 0;">
                ${controlSlider('rate3Mbps', t('pktParamRate3'), 0.5, 20, 0.5, state.rate3Mbps, 'Mbps', 1)}
                ${controlSlider('distance3Km', t('pktParamDist3'), 10, 4000, 10, state.distance3Km, 'km', 0)}
              ` : ''}

              <div class="sep-presets" style="margin-top:10px;">
                <button type="button" class="button secondary" data-sync-links>${esc(t('pktSyncLinksBtn'))}</button>
                <button type="button" class="button secondary" data-preset-btn="kurose-fig-1-11">${esc(t('pktResetFig111Btn'))}</button>
              </div>
              <p class="family-note" style="font-size:0.84rem;margin-top:8px;">${esc(t('pktAssumptionsNote'))}</p>
            </div>

            <div class="sep-plot-wrap">
              <!-- Transport & Event Stepping Controls -->
              <div class="pkt-transport-bar" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;background:var(--surface-2,rgba(0,0,0,0.03));margin-bottom:10px;">
                <button type="button" class="button primary" id="pkt-play-btn" aria-pressed="${state.playing}">
                  ${state.playing ? `⏸ ${esc(t('pktBtnPause'))}` : `▶ ${esc(t('pktBtnPlay'))}`}
                </button>
                <button type="button" class="button secondary" id="pkt-prev-event" title="${esc(t('pktBtnPrevEvent'))}">⏮ ${esc(t('pktBtnPrevEvent'))}</button>
                <button type="button" class="button secondary" id="pkt-next-event" title="${esc(t('pktBtnNextEvent'))}">⏭ ${esc(t('pktBtnNextEvent'))}</button>
                <button type="button" class="button secondary" id="pkt-reset-btn">↺ ${esc(t('pktBtnReset'))}</button>
                <label for="pkt-speed" style="margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;">
                  ${esc(t('pktSpeedLabel'))}
                  <select id="pkt-speed">
                    <option value="0.25" ${state.playSpeed === 0.25 ? 'selected' : ''}>0.25×</option>
                    <option value="0.5" ${state.playSpeed === 0.5 ? 'selected' : ''}>0.5×</option>
                    <option value="1" ${state.playSpeed === 1 ? 'selected' : ''}>1×</option>
                    <option value="2" ${state.playSpeed === 2 ? 'selected' : ''}>2×</option>
                  </select>
                </label>
              </div>

              <!-- Time Scrubber -->
              <div class="sep-control" style="margin-bottom:12px;">
                <label for="pkt-time-slider" style="display:flex;justify-content:space-between;align-items:center;">
                  <span>${esc(t('pktTimelineLabel'))}</span>
                  <output id="pkt-time-output" style="font-weight:700;">t = ${fmt(state.timeMs, 2)} ms / ${fmt(maxT, 2)} ms</output>
                </label>
                <input id="pkt-time-slider" type="range" min="0" max="${maxT}" step="${Math.max(0.01, Number((maxT / 500).toFixed(3)))}" value="${state.timeMs}">
              </div>

              <!-- Legend / Visual Key -->
              <div class="sep-legend" id="pkt-legend" style="flex-wrap:wrap;gap:12px;margin-bottom:8px;"></div>

              <!-- SVG 1: Interactive Topology & Bit Wave View (Adapted from Kurose & Ross Fig 1.11, 1.12, 1.16, 1.27) -->
              <svg class="cx-chart" id="pkt-topology-svg" role="img" viewBox="0 0 760 285" aria-label="${esc(t('pktTopologyAria'))}"></svg>

              <!-- SVG 2: Space-Time (Trellis) Diagram & Delay Breakdown -->
              <div class="sep-legend" style="margin-top:16px;flex-wrap:wrap;gap:12px;">
                <span><i style="background:#2563eb;opacity:0.35"></i>${esc(t('pktLegendTxStripe'))}</span>
                <span><i style="background:#059669;border-top:2px dashed #059669"></i>${esc(t('pktLegendPropSlope'))}</span>
                <span><i style="background:#dc2626"></i>${esc(t('pktLegendCurrentTimeLine'))}</span>
              </div>
              <svg class="cx-chart" id="pkt-spacetime-svg" role="img" viewBox="0 0 760 265" aria-label="${esc(t('pktSpaceTimeAria'))}"></svg>

              <!-- Analytical Metrics Cards -->
              <div class="sep-metrics" id="pkt-metrics" aria-live="polite" style="margin-top:14px;"></div>

              <!-- Interactive Event Log (Click any event row to jump to that timestamp) -->
              <div class="panel" style="margin-top:14px;padding:12px 14px;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
                  <p class="eyebrow" style="margin:0;">${esc(t('pktEventLogTitle'))}</p>
                  <small>${esc(t('pktEventLogHint'))}</small>
                </div>
                <div id="pkt-event-log" style="max-height:210px;overflow-y:auto;display:grid;gap:6px;font-size:0.86rem;"></div>
              </div>
            </div>
          </div>

          <div class="sep-interpret" style="margin-top:16px;">
            <div>
              <p class="eyebrow">${esc(t('pktFormulaHeader'))}</p>
              <math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${formulaMarkup()}</mrow></math>
              <p>${esc(t('pktFormulaDesc'))}</p>
            </div>
            <div>
              <p class="eyebrow">${esc(t('pktAttributionHeader'))}</p>
              <p>${esc(t('pktAttributionDesc'))}</p>
              <p class="small text-muted">${esc(t('pktSimplificationsDesc'))}</p>
            </div>
          </div>
        </div>

        <footer class="cx-topic-footer">
          <p>${esc(t('pktFooterPrompt'))}</p>
          <a class="button primary" href="#practice">${esc(t('pktGoToClinic'))}</a>
        </footer>
      </section>
    `;

    draw(schedule);
  }

  function draw(precomputedSchedule) {
    const schedule = precomputedSchedule || buildSchedule();
    const { config, summary, packetHops, events: simEvents } = schedule;
    const maxT = Math.max(0.1, summary.allPacketsTotalMs);
    state.timeMs = Math.max(0, Math.min(state.timeMs, maxT));
    const netState = evaluateNetworkStateAtTime(schedule, state.timeMs);

    // Update slider & output labels
    const timeSlider = root.querySelector('#pkt-time-slider');
    if (timeSlider) {
      timeSlider.max = String(maxT);
      timeSlider.value = String(state.timeMs);
    }
    const timeOut = root.querySelector('#pkt-time-output');
    if (timeOut) {
      timeOut.textContent = `t = ${fmt(state.timeMs, 2)} ms / ${fmt(maxT, 2)} ms`;
    }

    const sliderOutputs = {
      packetBytes: `${fmt(state.packetBytes, 0)} <small>B (${fmt(state.packetBytes * 8, 0)} bit)</small>`,
      packetCount: `${fmt(state.packetCount, 0)} <small>${esc(t('pktUnitPackets'))}</small>`,
      rate1Mbps: `${fmt(state.rate1Mbps, 1)} <small>Mbps</small>`,
      distance1Km: `${fmt(state.distance1Km, 0)} <small>km</small>`,
      speed1Factor: `${fmt(state.speed1Factor, 1)} <small>×10⁸ m/s</small>`,
      rate2Mbps: `${fmt(state.rate2Mbps, 1)} <small>Mbps</small>`,
      distance2Km: `${fmt(state.distance2Km, 0)} <small>km</small>`,
      rate3Mbps: `${fmt(state.rate3Mbps, 1)} <small>Mbps</small>`,
      distance3Km: `${fmt(state.distance3Km, 0)} <small>km</small>`
    };
    for (const [k, html] of Object.entries(sliderOutputs)) {
      const el = root.querySelector(`[data-output="${k}"]`);
      if (el) el.innerHTML = html;
    }

    // Legend
    const legendEl = root.querySelector('#pkt-legend');
    if (legendEl) {
      const pktPills = netState.packetStates.map(ps => {
        const phaseLabel = t(`pktPhase_${ps.phase}`);
        return `<span><i style="background:${ps.color}"></i><strong>P${ps.packetNumber}:</strong> ${esc(phaseLabel)}</span>`;
      }).join('');
      legendEl.innerHTML = pktPills;
    }

    drawTopologySvg(schedule, netState);
    drawSpaceTimeSvg(schedule, netState);
    drawMetrics(schedule, netState);
    drawEventLog(schedule, simEvents);
  }

  function drawTopologySvg(schedule, netState) {
    const svg = root.querySelector('#pkt-topology-svg');
    if (!svg) return;
    const { config } = schedule;
    const { linkCount, links, forwardingMode } = config;

    // Node horizontal coordinates in 760x285 viewBox
    const nodeX = linkCount === 2 ? [95, 380, 665] : [80, 280, 480, 680];
    const wireY = 128;
    const isTwoRouter = linkCount === 3;

    let out = `
      <defs>
        <pattern id="pkt-hatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" stroke-width="2" stroke-opacity="0.45"/>
        </pattern>
      </defs>
      <rect x="4" y="4" width="752" height="277" rx="12" fill="var(--surface,#f8faf6)" stroke="var(--line,#d8dfd0)" stroke-width="1"/>
      <text x="18" y="25" font-size="11" font-weight="700" fill="var(--muted-ink,#4d5e47)">${esc(t('pktSvgBannerTitle'))} · t = ${fmt(netState.timeMs, 2)} ms</text>
    `;

    // Draw each communication link (pipe) and active bit waves inside the pipe
    for (let i = 0; i < linkCount; i++) {
      const xStart = nodeX[i] + 34;
      const xEnd = nodeX[i + 1] - 34;
      const pipeW = xEnd - xStart;
      const pipeH = 26;
      const pipeTop = wireY - pipeH / 2;
      const link = links[i];
      const lState = netState.linkStates[i];

      // Pipe background
      out += `
        <rect x="${xStart}" y="${pipeTop}" width="${pipeW}" height="${pipeH}" rx="4" fill="var(--surface-alt,#e9efe4)" stroke="#8fa683" stroke-width="1.4"/>
      `;

      // Distance tick marks along pipe (25%, 50%, 75%)
      for (const frac of [0.25, 0.5, 0.75]) {
        const tx = xStart + pipeW * frac;
        out += `<line x1="${tx}" y1="${pipeTop}" x2="${tx}" y2="${pipeTop + 5}" stroke="#8fa683" stroke-width="1"/>`;
        out += `<line x1="${tx}" y1="${pipeTop + pipeH - 5}" x2="${tx}" y2="${pipeTop + pipeH}" stroke="#8fa683" stroke-width="1"/>`;
      }

      // Active packet bit waves propagating along link i
      for (const wave of lState.activeWaves) {
        const wx0 = xStart + wave.tailProgress * pipeW;
        const wx1 = xStart + wave.frontProgress * pipeW;
        const ww = Math.max(4, wx1 - wx0);
        out += `
          <g>
            <rect x="${wx0}" y="${pipeTop + 2}" width="${ww}" height="${pipeH - 4}" rx="3" fill="${wave.color}" fill-opacity="0.9" stroke="#ffffff" stroke-width="1.2"/>
            <rect x="${wx0}" y="${pipeTop + 2}" width="${ww}" height="${pipeH - 4}" rx="3" fill="url(#pkt-hatch)"/>
            <text x="${wx0 + ww / 2}" y="${wireY + 4}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#ffffff">P${wave.packetNumber}</text>
          </g>
        `;
      }

      // Link metadata labels above the pipe (well clear of node icons!)
      const midX = (xStart + xEnd) / 2;
      const fontMain = isTwoRouter ? '10' : '11';
      const fontSub = isTwoRouter ? '9.2' : '10';
      out += `
        <text x="${midX}" y="${pipeTop - 32}" text-anchor="middle" font-size="${fontMain}" font-weight="700" fill="var(--text,#243321)">
          ${esc(t('pktLinkLabel', i + 1))}: R${i + 1}=${fmt(link.rateMbps, 1)} Mbps, d${i + 1}=${fmt(link.distanceKm, 0)} km
        </text>
        <text x="${midX}" y="${pipeTop - 18}" text-anchor="middle" font-size="${fontSub}" fill="var(--muted-ink,#506249)">
          L/R=${fmt(link.dTransMs, 2)} ms · d/v=${fmt(link.dPropMs, 2)} ms · BDP=${fmt(link.bdpBits / 1000, 1)} kb
        </text>
      `;
    }

    // Draw Source Host (left)
    out += drawHostNode(nodeX[0], wireY, t('pktNodeSource'), netState.sourceQueue, true);

    // Draw Intermediate Router(s)
    for (let r = 0; r < linkCount - 1; r++) {
      const rx = nodeX[r + 1];
      const rState = netState.routerStates[r];
      out += drawRouterNode(rx, wireY, `${t('pktNodeRouter')} ${r + 1}`, rState, forwardingMode);
    }

    // Draw Destination Host (right)
    out += drawHostNode(nodeX[linkCount], wireY, t('pktNodeDest'), netState.deliveredPackets, false);

    svg.innerHTML = out;
  }

  function drawHostNode(cx, cy, label, items, isSource) {
    // Monitor + keyboard silhouette inspired by Kurose & Ross host icon
    let slabs = '';
    items.forEach((pkt, idx) => {
      const sx = cx - 26 + idx * 11;
      const sy = cy + 48;
      const frac = isSource ? pkt.fractionRemaining : pkt.fractionReceived;
      const h = Math.max(3, Math.round(20 * frac));
      slabs += `
        <rect x="${sx}" y="${sy + (20 - h)}" width="9" height="${h}" rx="1.5" fill="${pkt.color}" stroke="#ffffff" stroke-width="0.8"/>
        <text x="${sx + 4.5}" y="${sy + 31}" text-anchor="middle" font-size="9.5" font-weight="700" fill="${pkt.color}">${pkt.packetNumber}</text>
      `;
    });

    const subText = isSource
      ? t('pktSourceBufferSub', items.length)
      : t('pktDestBufferSub', items.filter(x => x.complete).length);

    return `
      <g>
        <rect x="${cx - 26}" y="${cy - 28}" width="52" height="36" rx="5" fill="#334155" stroke="#1e293b" stroke-width="1.8"/>
        <rect x="${cx - 21}" y="${cy - 23}" width="42" height="26" rx="2" fill="#94a3b8"/>
        <path d="M${cx - 10} ${cy + 8} L${cx + 10} ${cy + 8} L${cx + 16} ${cy + 16} L${cx - 16} ${cy + 16} Z" fill="#64748b"/>
        <text x="${cx}" y="${cy + 32}" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">${esc(label)}</text>
        <text x="${cx}" y="${cy + 44}" text-anchor="middle" font-size="9.8" fill="var(--muted-ink,#52634c)">${esc(subText)}</text>
        ${slabs}
      </g>
    `;
  }

  function drawRouterNode(cx, cy, label, rState, forwardingMode) {
    // Cylinder with X arrows on top inspired by Kurose & Ross router icon (Fig 1.11 / 1.16)
    let bufferMarkup = '';
    let statusNote = t('pktRouterIdle');

    if (rState.receivingPackets.length > 0) {
      const rec = rState.receivingPackets[0];
      const pct = Math.round(rec.fractionArrived * 100);
      statusNote = t('pktRouterStoring', rec.packetNumber, pct);
      const w = Math.max(3, Math.round(28 * rec.fractionArrived));
      bufferMarkup += `
        <rect x="${cx - 14}" y="${cy - 8}" width="28" height="18" rx="2" fill="none" stroke="${rec.color}" stroke-width="1.4" stroke-dasharray="2 2"/>
        <rect x="${cx - 14}" y="${cy - 8}" width="${w}" height="18" rx="2" fill="${rec.color}" fill-opacity="0.75"/>
      `;
    }

    if (rState.queuedPackets.length > 0) {
      statusNote = t('pktRouterQueued', rState.queuedPackets.map(p => 'P' + p.packetNumber).join(', '));
      rState.queuedPackets.forEach((qp, idx) => {
        const qx = cx - 22 + idx * 11;
        bufferMarkup += `<rect x="${qx}" y="${cy + 50}" width="9" height="18" rx="1.5" fill="${qp.color}" stroke="#ffffff" stroke-width="0.8"/>`;
      });
    }

    if (rState.transmittingPacket) {
      const tp = rState.transmittingPacket;
      if (rState.receivingPackets.length === 0 && rState.queuedPackets.length === 0) {
        statusNote = t('pktRouterForwarding', tp.packetNumber);
      }
    }

    return `
      <g>
        <path d="M${cx - 30} ${cy - 18} L${cx - 30} ${cy + 16} A30 10 0 0 0 ${cx + 30} ${cy + 16} L${cx + 30} ${cy - 18} Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
        <ellipse cx="${cx}" cy="${cy - 18}" rx="30" ry="10" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
        <line x1="${cx - 14}" y1="${cy - 22}" x2="${cx + 14}" y2="${cy - 14}" stroke="#334155" stroke-width="2.2" stroke-linecap="round"/>
        <line x1="${cx - 14}" y1="${cy - 14}" x2="${cx + 14}" y2="${cy - 22}" stroke="#334155" stroke-width="2.2" stroke-linecap="round"/>
        ${bufferMarkup}
        <text x="${cx}" y="${cy + 35}" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">${esc(label)}</text>
        <text x="${cx}" y="${cy + 47}" text-anchor="middle" font-size="9.8" font-weight="600" fill="var(--primary-ink,#1d4ed8)">${esc(statusNote)}</text>
      </g>
    `;
  }

  function drawSpaceTimeSvg(schedule, netState) {
    const svg = root.querySelector('#pkt-spacetime-svg');
    if (!svg) return;
    const { config, packetHops, summary } = schedule;
    const { linkCount, packetCount } = config;
    const maxT = Math.max(0.1, summary.allPacketsTotalMs);

    const W = 760, H = 265;
    const padL = 74, padR = 58, padT = 34, padB = 34;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const nodeX = Array.from({ length: linkCount + 1 }, (_, idx) => padL + (idx / linkCount) * plotW);
    const timeY = ms => padT + (ms / maxT) * plotH;

    let out = `
      <rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="12" fill="var(--surface,#ffffff)" stroke="var(--line,#d8dfd0)" stroke-width="1"/>
      <text x="18" y="21" font-size="10.8" font-weight="700" fill="var(--muted-ink,#4d5e47)">${esc(t('pktSpaceTimeTitle'))}</text>
    `;

    // Horizontal time grid lines
    const steps = 5;
    for (let s = 0; s <= steps; s++) {
      const tVal = (s / steps) * maxT;
      const y = timeY(tVal);
      out += `
        <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--line,#e5ebe0)" stroke-width="1"/>
        <text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="10.5" fill="var(--muted-ink,#5c6c56)">${fmt(tVal, 1)} ms</text>
      `;
    }

    // Vertical node axes
    const nodeNames = [
      t('pktNodeSource'),
      ...Array.from({ length: linkCount - 1 }, (_, r) => `${t('pktNodeRouter')} ${r + 1}`),
      t('pktNodeDest')
    ];
    nodeX.forEach((nx, idx) => {
      out += `
        <line x1="${nx}" y1="${padT}" x2="${nx}" y2="${H - padB}" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="${nx}" y="${H - 12}" text-anchor="middle" font-size="10.8" font-weight="700" fill="var(--text,#334155)">${esc(nodeNames[idx])}</text>
      `;
    });

    // Draw each packet's parallelogram (txStart -> firstBitArrives -> lastBitArrives -> txEnd) across each link
    for (let p = 0; p < packetCount; p++) {
      for (let i = 0; i < linkCount; i++) {
        const hop = packetHops[p][i];
        const x0 = nodeX[i];
        const x1 = nodeX[i + 1];
        const yTxStart = timeY(hop.txStartMs);
        const yTxEnd = timeY(hop.txEndMs);
        const yFirstArr = timeY(hop.firstBitArrivesMs);
        const yLastArr = timeY(hop.lastBitArrivesMs);

        const poly = `${x0},${yTxStart} ${x1},${yFirstArr} ${x1},${yLastArr} ${x0},${yTxEnd}`;
        out += `
          <polygon points="${poly}" fill="${hop.color}" fill-opacity="0.24" stroke="${hop.color}" stroke-width="1.5"/>
          <line x1="${x0}" y1="${yTxStart}" x2="${x1}" y2="${yFirstArr}" stroke="${hop.color}" stroke-width="1.3" stroke-dasharray="4 3"/>
          <text x="${(x0 + x1) / 2}" y="${(yTxStart + yLastArr) / 2 + 4}" text-anchor="middle" font-size="10.5" font-weight="700" fill="${hop.color}">P${hop.packetNumber}</text>
        `;

        // If the packet experienced queuing delay at router i, highlight the vertical wait bar on nodeX[i]
        if (hop.queueDelayMs > 1e-4) {
          const yReady = timeY(hop.readyMs);
          out += `
            <line x1="${x0}" y1="${yReady}" x2="${x0}" y2="${yTxStart}" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
          `;
        }
      }
    }

    // Current time horizontal cursor line
    const curY = timeY(netState.timeMs);
    out += `
      <line x1="${padL}" y1="${curY}" x2="${W - padR}" y2="${curY}" stroke="#dc2626" stroke-width="2"/>
      <circle cx="${padL}" cy="${curY}" r="4" fill="#dc2626"/>
    `;

    svg.innerHTML = out;
  }

  function drawMetrics(schedule, netState) {
    const box = root.querySelector('#pkt-metrics');
    if (!box) return;
    const { config, summary } = schedule;
    const l1 = config.links[0];

    const card = (label, val, unit, sub) => `
      <article class="metric">
        <p class="eyebrow">${esc(label)}</p>
        <strong>${esc(val)}${unit ? ' <small>' + esc(unit) + '</small>' : ''}</strong>
        <p>${esc(sub)}</p>
      </article>
    `;

    box.innerHTML = [
      card(
        t('pktCardTx1'),
        fmt(l1.dTransMs, 2),
        'ms',
        t('pktCardTx1Sub', fmt(config.packetBits, 0), fmt(l1.rateMbps, 1))
      ),
      card(
        t('pktCardProp1'),
        fmt(l1.dPropMs, 2),
        'ms',
        t('pktCardProp1Sub', fmt(l1.distanceKm, 0), fmt(l1.speedFactor, 1))
      ),
      card(
        t('pktCardBdp1'),
        fmt(l1.bdpBits / 1000, 2),
        'kb',
        t('pktCardBdp1Sub', fmt(l1.bitWidthMeters, 1))
      ),
      card(
        t('pktCardFirstPkt'),
        fmt(summary.firstPacketTotalMs, 2),
        'ms',
        t('pktCardFirstPktSub', config.linkCount)
      ),
      card(
        t('pktCardAllPkts'),
        fmt(summary.allPacketsTotalMs, 2),
        'ms',
        t('pktCardAllPktsSub', config.packetCount, fmt(summary.unsegmentedTotalMs, 2))
      ),
      card(
        t('pktCardQueueMax'),
        fmt(summary.maxQueueDelayMs, 2),
        'ms',
        t('pktCardQueueMaxSub', fmt(summary.bottleneckRateMbps, 1))
      )
    ].join('');
  }

  function drawEventLog(schedule, simEvents) {
    const logEl = root.querySelector('#pkt-event-log');
    if (!logEl) return;
    const curT = state.timeMs;

    logEl.innerHTML = simEvents.map((ev, idx) => {
      const reached = curT >= ev.timeMs - 1e-4;
      const isCurrent = Math.abs(curT - ev.timeMs) < 0.05;
      let desc = '';
      if (ev.type === 'tx-start') {
        desc = t('pktEvTxStart', ev.packetNumber, ev.linkNumber, ev.queueDelayMs > 1e-3 ? fmt(ev.queueDelayMs, 2) : null);
      } else if (ev.type === 'first-bit-arrives') {
        desc = t('pktEvFirstBit', ev.packetNumber, ev.linkNumber);
      } else if (ev.type === 'tx-end') {
        desc = t('pktEvTxEnd', ev.packetNumber, ev.linkNumber);
      } else if (ev.type === 'router-stored') {
        desc = t('pktEvRouterStored', ev.packetNumber, ev.nodeIndex);
      } else {
        desc = t('pktEvDelivered', ev.packetNumber);
      }

      const bg = isCurrent
        ? 'background:rgba(37,99,235,0.14);border-left:3px solid #2563eb;'
        : reached
          ? 'background:rgba(16,185,129,0.08);border-left:3px solid #059669;'
          : 'opacity:0.65;border-left:3px solid transparent;';

      return `
        <button type="button" data-jump-time="${ev.timeMs}" style="text-align:left;padding:6px 10px;border:1px solid var(--line,#e2e8dc);border-radius:6px;cursor:pointer;display:flex;gap:10px;align-items:baseline;${bg}">
          <strong style="min-width:68px;font-variant-numeric:tabular-nums;">t = ${fmt(ev.timeMs, 2)} ms</strong>
          <span>${esc(desc)}</span>
        </button>
      `;
    }).join('');
  }

  // Event listeners with AbortController cleanup
  root.addEventListener('change', event => {
    const target = event.target;
    if (target.id === 'pkt-preset') {
      applyPreset(target.value);
      root.querySelector('#pkt-preset')?.focus();
    } else if (target.id === 'pkt-mode') {
      stopPlayback();
      state.forwardingMode = target.value;
      draw();
    } else if (target.id === 'pkt-routers') {
      stopPlayback();
      state.routerCount = Number(target.value) === 2 ? 2 : 1;
      render();
      root.querySelector('#pkt-routers')?.focus();
    } else if (target.id === 'pkt-reduced-motion') {
      state.reducedMotion = target.checked;
      if (state.reducedMotion) stopPlayback();
    } else if (target.id === 'pkt-speed') {
      state.playSpeed = Number(target.value) || 0.5;
    }
  }, { signal: events.signal });

  root.addEventListener('input', event => {
    const target = event.target;
    if (target.id === 'pkt-time-slider') {
      stopPlayback();
      state.timeMs = Number(target.value) || 0;
      draw();
      return;
    }
    const key = target.dataset.input;
    if (!key) return;
    stopPlayback();
    const val = Number(target.value);
    if (!Number.isFinite(val)) return;
    state[key] = val;
    if (key === 'speed1Factor') {
      state.speed2Factor = val;
      state.speed3Factor = val;
    }
    draw();
  }, { signal: events.signal });

  root.addEventListener('click', event => {
    const btn = event.target.closest('button');
    if (!btn) return;
    if (btn.id === 'pkt-play-btn') {
      if (state.playing) stopPlayback();
      else startPlayback();
    } else if (btn.id === 'pkt-next-event') {
      stepNextEvent();
    } else if (btn.id === 'pkt-prev-event') {
      stepPrevEvent();
    } else if (btn.id === 'pkt-reset-btn') {
      resetSimulation();
    } else if (btn.hasAttribute('data-sync-links')) {
      stopPlayback();
      state.rate2Mbps = state.rate1Mbps;
      state.distance2Km = state.distance1Km;
      state.rate3Mbps = state.rate1Mbps;
      state.distance3Km = state.distance1Km;
      render();
    } else if (btn.dataset.presetBtn) {
      applyPreset(btn.dataset.presetBtn);
    } else if (btn.dataset.jumpTime !== undefined) {
      stopPlayback();
      state.timeMs = Number(btn.dataset.jumpTime) || 0;
      draw();
    }
  }, { signal: events.signal });

  render();

  return {
    update(next) {
      context = next;
      const wasPlaying = state.playing;
      stopPlayback();
      render();
      if (wasPlaying && !state.reducedMotion) startPlayback();
    },
    destroy() {
      stopPlayback();
      events.abort();
      root.replaceChildren();
    }
  };
}
