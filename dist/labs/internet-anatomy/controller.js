import {
  TOPOLOGY_ROUTES,
  PROTOCOL_SCENARIOS,
  computePacketization,
  inspectRoute,
  evaluateProtocolStep
} from '../../models/internet-anatomy.js';

const NODE_META = {
  'home-laptop':     { x: 92,  y: 175, kind: 'host',   tr: 'Ev Dizüstü (Uç Sistem)',       en: 'Home Laptop (End System)' },
  'home-ap':         { x: 158, y: 196, kind: 'ap',     tr: 'WiFi Baz İstasyonu',           en: 'WiFi Base Station' },
  'home-router':     { x: 222, y: 196, kind: 'router', tr: 'Ev Yönlendiricisi',            en: 'Home Router' },
  'home-thermostat': { x: 92,  y: 224, kind: 'iot',    tr: 'Akıllı Termostat (IoT)',       en: 'Smart Thermostat (IoT)' },
  'smartphone':      { x: 92,  y: 72,  kind: 'mobile', tr: 'Akıllı Telefon (Uç Sistem)',   en: 'Smartphone (End System)' },
  'cell-tower':      { x: 162, y: 66,  kind: 'tower',  tr: 'Baz İstasyonu (Hücresel)',     en: 'Cell Phone Tower' },
  'mobile-router':   { x: 236, y: 88,  kind: 'router', tr: 'Mobil Ağ Yönlendiricisi',      en: 'Mobile Core Router' },
  'workstation':     { x: 112, y: 318, kind: 'host',   tr: 'Kurumsal İş İstasyonu',        en: 'Enterprise Workstation' },
  'ent-switch':      { x: 196, y: 312, kind: 'switch', tr: 'Bağlantı Katmanı Anahtarı',    en: 'Link-Layer Switch' },
  'ent-router':      { x: 282, y: 292, kind: 'router', tr: 'Kurumsal Yönlendirici',        en: 'Enterprise Router' },
  'regional-r1':     { x: 344, y: 205, kind: 'router', tr: 'Bölgesel ISP Yönlendiricisi',  en: 'Regional ISP Router' },
  'global-r1':       { x: 454, y: 92,  kind: 'router', tr: 'Küresel (Tier-1) ISP Omurga',  en: 'Global ISP Backbone Router' },
  'cp-r1':           { x: 546, y: 188, kind: 'router', tr: 'İçerik Sağlayıcı Yönlendirici',en: 'Content Provider Router' },
  'dc-server':       { x: 646, y: 170, kind: 'server', tr: 'Veri Merkezi Sunucusu (Uç)',   en: 'Datacenter Server (End System)' }
};

function esc(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function pick(obj, lang) {
  if (!obj || typeof obj !== 'object') return String(obj ?? '');
  return obj[lang] ?? obj.tr ?? obj.en ?? '';
}

export function mount(root, initialCtx) {
  let ctx = initialCtx;
  let timer = null;
  let playing = false;

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    tab: 'topology', // 'topology' | 'protocol'
    routeId: 'home-to-dc',
    hopIndex: 0,
    messageBytes: 12000,
    payloadBytes: 1460,
    headerBytes: 40,
    scenarioId: 'web-normal',
    protoStep: 1,
    speedMs: 1100,
    reducedMotion: prefersReduced
  };

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    playing = false;
  }

  function startTimer() {
    if (state.reducedMotion) {
      stepForward();
      return;
    }
    stopTimer();
    playing = true;
    timer = setInterval(() => {
      if (state.tab === 'topology') {
        const info = inspectRoute(state.routeId, state.hopIndex);
        if (state.hopIndex >= info.maxHop) {
          stopTimer();
          render();
          return;
        }
        state.hopIndex += 1;
      } else {
        const info = evaluateProtocolStep(state.scenarioId, state.protoStep);
        if (state.protoStep >= info.maxStep) {
          stopTimer();
          render();
          return;
        }
        state.protoStep += 1;
      }
      render();
    }, state.speedMs);
    render();
  }

  function stepForward() {
    stopTimer();
    if (state.tab === 'topology') {
      const info = inspectRoute(state.routeId, state.hopIndex);
      state.hopIndex = state.hopIndex >= info.maxHop ? 0 : state.hopIndex + 1;
    } else {
      const info = evaluateProtocolStep(state.scenarioId, state.protoStep);
      state.protoStep = state.protoStep >= info.maxStep ? 0 : state.protoStep + 1;
    }
    render();
  }

  function resetCurrent() {
    stopTimer();
    if (state.tab === 'topology') state.hopIndex = 0;
    else state.protoStep = 0;
    render();
  }

  function renderTopologySvg(lang, routeInfo) {
    const activeIds = new Set(routeInfo.nodes.map(n => n.id));
    const currentId = routeInfo.currentNode.id;

    // Background links connecting all clouds (reference mesh from Fig 1.1)
    const meshPairs = [
      ['home-laptop', 'home-ap'], ['home-thermostat', 'home-ap'], ['home-ap', 'home-router'],
      ['home-router', 'regional-r1'],
      ['smartphone', 'cell-tower'], ['cell-tower', 'mobile-router'],
      ['mobile-router', 'global-r1'], ['mobile-router', 'regional-r1'],
      ['workstation', 'ent-switch'], ['ent-switch', 'ent-router'], ['ent-router', 'regional-r1'],
      ['regional-r1', 'global-r1'], ['regional-r1', 'cp-r1'],
      ['global-r1', 'cp-r1'], ['cp-r1', 'dc-server']
    ];

    const activeEdges = new Set();
    for (let i = 0; i < routeInfo.nodes.length - 1; i++) {
      const a = routeInfo.nodes[i].id;
      const b = routeInfo.nodes[i + 1].id;
      activeEdges.add(`${a}|${b}`);
      activeEdges.add(`${b}|${a}`);
    }

    const meshLines = meshPairs.map(([a, b]) => {
      const na = NODE_META[a], nb = NODE_META[b];
      const isOnRoute = activeEdges.has(`${a}|${b}`);
      return `<line x1="${na.x}" y1="${na.y}" x2="${nb.x}" y2="${nb.y}" stroke="${isOnRoute ? '#2563eb' : '#94a3b8'}" stroke-width="${isOnRoute ? 3.2 : 1.5}" stroke-dasharray="${isOnRoute ? '' : '4 3'}" opacity="${isOnRoute ? 0.95 : 0.5}"/>`;
    }).join('');

    // Traversed segment highlight up to current hop
    let traversedLines = '';
    for (let i = 0; i < routeInfo.hopIndex; i++) {
      const na = NODE_META[routeInfo.nodes[i].id];
      const nb = NODE_META[routeInfo.nodes[i + 1].id];
      traversedLines += `<line x1="${na.x}" y1="${na.y}" x2="${nb.x}" y2="${nb.y}" stroke="#059669" stroke-width="4.2" stroke-linecap="round"/>`;
    }

    const nodeIcons = Object.entries(NODE_META).map(([id, m]) => {
      const isCurrent = id === currentId;
      const isOnRoute = activeIds.has(id);
      const isEnd = m.kind === 'host' || m.kind === 'mobile' || m.kind === 'server' || m.kind === 'iot';
      const fill = isCurrent ? '#d97706' : (isEnd ? '#2563eb' : (m.kind === 'router' ? '#0f766e' : '#64748b'));
      const stroke = isCurrent ? '#92400e' : '#ffffff';
      const radius = isCurrent ? 14 : (isEnd ? 11 : 10);
      const glyph = m.kind === 'router' ? '✕' : (m.kind === 'switch' ? '⇄' : (m.kind === 'server' ? '▤' : (m.kind === 'tower' ? '▲' : (m.kind === 'ap' ? '◎' : '●'))));
      return `<g class="inet-node" data-hop-node="${id}" style="cursor:${isOnRoute ? 'pointer' : 'default'}">
        ${isCurrent ? `<circle cx="${m.x}" cy="${m.y}" r="20" fill="#f59e0b" opacity="0.24"/>` : ''}
        <circle cx="${m.x}" cy="${m.y}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity="${isOnRoute ? 1 : 0.52}"/>
        <text x="${m.x}" y="${m.y + 4}" text-anchor="middle" font-size="10" font-weight="700" fill="#ffffff">${glyph}</text>
      </g>`;
    }).join('');

    const cur = NODE_META[currentId];
    const packetBadge = `<g transform="translate(${cur.x + 14}, ${cur.y - 22})">
      <rect width="32" height="17" rx="4" fill="#d97706" stroke="#ffffff" stroke-width="1.3"/>
      <text x="16" y="12" text-anchor="middle" font-size="9" font-weight="700" fill="#ffffff">PKT</text>
    </g>`;

    const L = lang === 'en' ? {
      mobile: 'Mobile Network',
      home: 'Home Network',
      ent: 'Enterprise Network',
      reg: 'Local / Regional ISP',
      glob: 'National / Global ISP',
      cp: 'Content Provider & Datacenter',
      keyEnd: 'End System (Runs Apps)',
      keyRouter: 'Router (Core Forwarding)',
      keySwitch: 'Link Switch / Base Station',
      keyPkt: 'Active Packet Hop'
    } : {
      mobile: 'Mobil Ağ',
      home: 'Ev Ağı',
      ent: 'Kurumsal Ağ',
      reg: 'Yerel / Bölgesel ISP',
      glob: 'Ulusal / Küresel ISP',
      cp: 'İçerik Sağlayıcı ve Veri Merkezi',
      keyEnd: 'Uç Sistem (Uygulama Çalışır)',
      keyRouter: 'Yönlendirici (Çekirdek İletim)',
      keySwitch: 'Bağlantı Anahtarı / Baz',
      keyPkt: 'Aktif Paket Konumu'
    };

    return `<svg viewBox="0 0 720 390" class="cx-chart inet-topology" role="img" aria-label="${esc(lang === 'en' ? 'Interactive Figure 1.1 Internet pieces topology' : 'Etkileşimli Şekil 1.1 İnternet parçaları topolojisi')}">
      <!-- Network region clouds (Figure 1.1 adaptation) -->
      <rect x="22" y="20" width="248" height="102" rx="22" fill="#e0f2fe" fill-opacity="0.45" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 3"/>
      <text x="36" y="39" font-size="11" font-weight="700" fill="#0369a1">${L.mobile}</text>

      <rect x="22" y="138" width="234" height="114" rx="20" fill="#dcfce7" fill-opacity="0.45" stroke="#4ade80" stroke-width="1.2" stroke-dasharray="4 3"/>
      <text x="36" y="157" font-size="11" font-weight="700" fill="#15803d">${L.home}</text>

      <rect x="22" y="266" width="292" height="84" rx="20" fill="#ede9fe" fill-opacity="0.45" stroke="#a78bfa" stroke-width="1.2" stroke-dasharray="4 3"/>
      <text x="36" y="285" font-size="11" font-weight="700" fill="#6d28d9">${L.ent}</text>

      <rect x="292" y="152" width="112" height="100" rx="20" fill="#fef3c7" fill-opacity="0.52" stroke="#f59e0b" stroke-width="1.2"/>
      <text x="348" y="172" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">${L.reg}</text>

      <rect x="382" y="28" width="152" height="96" rx="22" fill="#ffedd5" fill-opacity="0.55" stroke="#fb923c" stroke-width="1.2"/>
      <text x="458" y="48" text-anchor="middle" font-size="10.5" font-weight="700" fill="#c2410c">${L.glob}</text>

      <rect x="502" y="128" width="196" height="118" rx="20" fill="#f1f5f9" fill-opacity="0.7" stroke="#64748b" stroke-width="1.2"/>
      <text x="600" y="146" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">${L.cp}</text>

      ${meshLines}
      ${traversedLines}
      ${nodeIcons}
      ${packetBadge}

      <!-- Bottom Legend -->
      <g transform="translate(24, 366)" font-size="10" fill="var(--text,#334155)">
        <circle cx="8" cy="4" r="6" fill="#2563eb"/><text x="20" y="8">${L.keyEnd}</text>
        <circle cx="192" cy="4" r="6" fill="#0f766e"/><text x="204" y="8">${L.keyRouter}</text>
        <circle cx="386" cy="4" r="6" fill="#64748b"/><text x="398" y="8">${L.keySwitch}</text>
        <rect x="556" y="-3" width="22" height="14" rx="3" fill="#d97706"/><text x="584" y="8" font-weight="700">${L.keyPkt}</text>
      </g>
    </svg>`;
  }

  function renderProtocolSvg(lang, protoInfo) {
    const isHuman = protoInfo.kind === 'human';
    const leftTitle = isHuman
      ? (lang === 'en' ? 'Person A (Initiator)' : 'Kişi A (Başlatan)')
      : (lang === 'en' ? 'Client Browser (End System)' : 'İstemci Tarayıcı (Uç Sistem)');
    const rightTitle = isHuman
      ? (lang === 'en' ? 'Person B (Responder)' : 'Kişi B (Yanıtlayan)')
      : (lang === 'en' ? 'Web Server (End System)' : 'Web Sunucusu (Uç Sistem)');
    const timeLabel = lang === 'en' ? 'Time' : 'Zaman';

    const leftX = 160;
    const rightX = 560;
    const startY = 82;
    const rowH = 62;

    const arrows = protoInfo.allSteps.map((st, idx) => {
      const y1 = startY + idx * rowH;
      const y2 = y1 + 36;
      const visible = idx < protoInfo.step;
      const isActive = idx === protoInfo.step - 1;
      const opacity = visible ? 1 : 0.22;
      const color = !visible ? '#94a3b8' : (st.to === st.from ? '#dc2626' : (isActive ? '#d97706' : '#0284c7'));
      const label = pick(st.label, lang);

      if (st.to === st.from) {
        // Local timeout event loop on left timeline
        return `<g opacity="${opacity}">
          <path d="M ${leftX} ${y1} C ${leftX - 75} ${y1}, ${leftX - 75} ${y2}, ${leftX - 6} ${y2}" fill="none" stroke="${color}" stroke-width="${isActive ? 3 : 2}" stroke-dasharray="5 3"/>
          <polygon points="${leftX - 2},${y2} ${leftX - 11},${y2 - 5} ${leftX - 11},${y2 + 5}" fill="${color}"/>
          <rect x="${leftX + 14}" y="${y1 + 4}" width="320" height="24" rx="5" fill="#fef2f2" stroke="#fca5a5"/>
          <text x="${leftX + 24}" y="${y1 + 20}" font-size="11" font-weight="700" fill="#b91c1c">${esc(label)}</text>
        </g>`;
      }

      const x1 = st.from === 'left' ? leftX + 6 : rightX - 6;
      const x2 = st.to === 'right' ? rightX - 10 : leftX + 10;
      const dir = x2 > x1 ? 1 : -1;
      const midX = (x1 + x2) / 2;
      const labelY = y1 - 7;

      return `<g opacity="${opacity}">
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${isActive ? 3.2 : 2.2}"/>
        <polygon points="${x2 + dir * 6},${y2} ${x2 - dir * 5},${y2 - 5} ${x2 - dir * 5},${y2 + 5}" fill="${color}"/>
        <text x="${midX}" y="${labelY}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${isActive ? '#b45309' : 'var(--text,#1e293b)'}">${esc(label)}</text>
      </g>`;
    }).join('');

    return `<svg viewBox="0 0 720 360" class="cx-chart inet-sequence" role="img" aria-label="${esc(lang === 'en' ? 'Interactive Figure 1.2 Protocol message exchange sequence' : 'Etkileşimli Şekil 1.2 Protokol mesaj alışverişi diyagramı')}">
      <!-- Entity Headers -->
      <rect x="${leftX - 115}" y="14" width="230" height="44" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
      <text x="${leftX}" y="34" text-anchor="middle" font-size="12" font-weight="700" fill="#1e3a8a">${esc(leftTitle)}</text>
      <text x="${leftX}" y="50" text-anchor="middle" font-size="10" font-weight="600" fill="#1d4ed8">${esc(protoInfo.stateLeft)}</text>

      <rect x="${rightX - 115}" y="14" width="230" height="44" rx="8" fill="#dcfce7" stroke="#059669" stroke-width="1.6"/>
      <text x="${rightX}" y="34" text-anchor="middle" font-size="12" font-weight="700" fill="#064e3b">${esc(rightTitle)}</text>
      <text x="${rightX}" y="50" text-anchor="middle" font-size="10" font-weight="600" fill="#047857">${esc(protoInfo.stateRight)}</text>

      <!-- Vertical Timelines -->
      <line x1="${leftX}" y1="64" x2="${leftX}" y2="332" stroke="#64748b" stroke-width="2" stroke-dasharray="4 5"/>
      <line x1="${rightX}" y1="64" x2="${rightX}" y2="332" stroke="#64748b" stroke-width="2" stroke-dasharray="4 5"/>
      <text x="${leftX}" y="350" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted-ink,#52634c)">${timeLabel} ↓</text>
      <text x="${rightX}" y="350" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted-ink,#52634c)">${timeLabel} ↓</text>

      ${arrows}
    </svg>`;
  }

  function render() {
    const { lang, t, format } = ctx;
    const isEn = lang === 'en';
    const routeInfo = inspectRoute(state.routeId, state.hopIndex);
    const pktStats = computePacketization({
      messageBytes: state.messageBytes,
      payloadBytes: state.payloadBytes,
      headerBytes: state.headerBytes
    });
    const protoInfo = evaluateProtocolStep(state.scenarioId, state.protoStep);
    const curNodeMeta = NODE_META[routeInfo.currentNode.id];

    const routeLabels = {
      'home-to-dc': isEn ? 'Home Laptop → Datacenter Server (6 hops)' : 'Ev Dizüstü → Veri Merkezi Sunucusu (6 atlama)',
      'mobile-to-dc': isEn ? 'Smartphone → Content Provider (5 hops)' : 'Akıllı Telefon → İçerik Sağlayıcı (5 atlama)',
      'enterprise-to-home': isEn ? 'Enterprise Workstation → Smart Thermostat (5 hops)' : 'Kurumsal İş İstasyonu → Akıllı Termostat (5 atlama)'
    };

    const scenarioLabels = {
      'web-normal': isEn ? 'Network Protocol: TCP + HTTP GET (Fig. 1.2 right)' : 'Ağ Protokolü: TCP + HTTP GET (Şekil 1.2 sağ)',
      'human-normal': isEn ? 'Human Protocol: Greeting & Time (Fig. 1.2 left)' : 'İnsan Protokolü: Selamlaşma ve Saat (Şekil 1.2 sol)',
      'human-mismatch': isEn ? 'Human Protocol Mismatch: Different Language / Refusal' : 'İnsan Protokolü Uyumsuzluğu: Farklı Dil / Ret',
      'web-timeout': isEn ? 'Network Protocol Fault: No Reply / Timeout Event' : 'Ağ Protokolü Hatası: Yanıt Yok / Zaman Aşımı Olayı'
    };

    const tabHtml = `<div class="cx-options" role="tablist" aria-label="${esc(t('inetTabGroupAria'))}">
      <button type="button" role="tab" aria-selected="${state.tab === 'topology'}" class="${state.tab === 'topology' ? 'selected' : ''}" data-inet-tab="topology">${esc(t('inetTabTopology'))}</button>
      <button type="button" role="tab" aria-selected="${state.tab === 'protocol'}" class="${state.tab === 'protocol' ? 'selected' : ''}" data-inet-tab="protocol">${esc(t('inetTabProtocol'))}</button>
    </div>`;

    let bodyHtml = '';
    if (state.tab === 'topology') {
      const nodeRoleText = routeInfo.currentNode.runsApp
        ? (isEn ? 'End System (Host) — Runs Distributed Application & Socket' : 'Uç Sistem (Host) — Dağıtık Uygulama ve Soket Çalışır')
        : (isEn ? 'Packet Switch / Access Node — Forwards Packets Only (No User App!)' : 'Paket Anahtarı / Erişim Düğümü — Yalnız Paket İletir (Uygulama Çalışmaz!)');

      bodyHtml = `
        <div class="cx-split">
          <div class="cx-controls">
            <div class="cx-control">
              <label for="inet-route-select"><span>${esc(t('inetRouteLabel'))}</span></label>
              <select id="inet-route-select" data-inet-route style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid var(--border,#cbd5e1);background:var(--surface,#fff);color:var(--text,#1e293b)">
                ${Object.keys(TOPOLOGY_ROUTES).map(id => `<option value="${id}" ${state.routeId === id ? 'selected' : ''}>${esc(routeLabels[id])}</option>`).join('')}
              </select>
            </div>
            <div class="cx-control">
              <label for="inet-msg-bytes"><span>${esc(t('inetMsgSizeLabel'))}</span><output>${format(state.messageBytes, 0)} B</output></label>
              <input id="inet-msg-bytes" type="range" min="1000" max="50000" step="1000" value="${state.messageBytes}" data-inet-param="messageBytes">
            </div>
            <div class="cx-control">
              <label for="inet-payload-bytes"><span>${esc(t('inetPayloadSizeLabel'))}</span><output>${format(state.payloadBytes, 0)} B</output></label>
              <input id="inet-payload-bytes" type="range" min="200" max="1500" step="20" value="${state.payloadBytes}" data-inet-param="payloadBytes">
            </div>
            <div class="cx-control">
              <label for="inet-header-bytes"><span>${esc(t('inetHeaderSizeLabel'))}</span><output>${format(state.headerBytes, 0)} B</output></label>
              <input id="inet-header-bytes" type="range" min="20" max="120" step="10" value="${state.headerBytes}" data-inet-param="headerBytes">
            </div>
            <div class="cx-actions">
              <button type="button" class="button primary" data-inet-action="toggle-play">${esc(playing ? t('pktBtnPause') : t('pktBtnPlay'))}</button>
              <button type="button" class="button secondary" data-inet-action="step">${esc(t('inetBtnStepHop'))}</button>
              <button type="button" class="button secondary" data-inet-action="reset">${esc(t('inetBtnReset'))}</button>
            </div>
            <label style="display:flex;align-items:center;gap:8px;font-size:12px;margin-top:8px;cursor:pointer">
              <input type="checkbox" data-inet-reduced ${state.reducedMotion ? 'checked' : ''}>
              <span>${esc(t('pktReducedMotionLabel'))}</span>
            </label>
          </div>

          <div class="cx-chart-box">
            <div class="inet-topology-scroll">${renderTopologySvg(lang, routeInfo)}</div>
            <div class="cx-callout" style="margin-top:12px">
              <strong>${esc(t('inetCurrentHopEyebrow', routeInfo.hopIndex, routeInfo.maxHop))} · ${esc(pick(curNodeMeta, lang))}</strong>
              <p>${esc(nodeRoleText)}<br><small>${esc(t('inetLayerStackLabel'))}: ${esc(routeInfo.currentNode.layer)}</small></p>
            </div>
          </div>
        </div>

        <div class="cx-live">
          <div class="metrics">
            <div class="metric">
              <p class="eyebrow">${esc(t('inetMetricPackets'))}</p>
              <strong>${pktStats.packetCount} <small>${esc(t('pktUnitPackets'))}</small></strong>
              <p>⌈${format(state.messageBytes, 0)} / ${format(state.payloadBytes, 0)}⌉ · ${esc(t('inetLastPayloadSub', format(pktStats.lastPayloadBytes, 0)))}</p>
            </div>
            <div class="metric">
              <p class="eyebrow">${esc(t('inetMetricOverhead'))}</p>
              <strong>${format(pktStats.totalHeaderBytes, 0)} <small>B (${format(pktStats.overheadPercent, 1)}%)</small></strong>
              <p>${pktStats.packetCount} × ${state.headerBytes} B ${esc(t('inetHeaderPerPktSub'))}</p>
            </div>
            <div class="metric">
              <p class="eyebrow">${esc(t('inetMetricEfficiency'))}</p>
              <strong>${format(pktStats.efficiencyPercent, 1)}<small>%</small></strong>
              <p>${esc(t('inetTotalSentSub', format(pktStats.totalTransmittedBytes, 0)))}</p>
            </div>
          </div>
        </div>`;
    } else {
      const active = protoInfo.activeStep;
      const stepRows = protoInfo.allSteps.map((st, idx) => {
        const isCurrent = idx === protoInfo.step - 1;
        return `<li><button type="button" class="inet-log-entry" data-inet-proto-step="${idx + 1}"${isCurrent ? ' aria-current="step"' : ''}>
          <strong>${st.order} · ${esc(pick(st.label, lang))}</strong>
          <span>${esc(pick(st.format, lang))} — ${esc(pick(st.action, lang))}</span>
        </button></li>`;
      }).join('');

      bodyHtml = `
        <div class="cx-split">
          <div class="cx-controls">
            <div class="cx-control">
              <label for="inet-proto-select"><span>${esc(t('inetProtoScenarioLabel'))}</span></label>
              <select id="inet-proto-select" data-inet-scenario style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid var(--border,#cbd5e1);background:var(--surface,#fff);color:var(--text,#1e293b)">
                ${Object.keys(PROTOCOL_SCENARIOS).map(id => `<option value="${id}" ${state.scenarioId === id ? 'selected' : ''}>${esc(scenarioLabels[id])}</option>`).join('')}
              </select>
            </div>
            <div class="cx-actions">
              <button type="button" class="button primary" data-inet-action="toggle-play">${esc(playing ? t('pktBtnPause') : t('pktBtnPlay'))}</button>
              <button type="button" class="button secondary" data-inet-action="step">${esc(t('inetBtnStepMsg'))}</button>
              <button type="button" class="button secondary" data-inet-action="reset">${esc(t('inetBtnReset'))}</button>
            </div>
            <label style="display:flex;align-items:center;gap:8px;font-size:12px;margin-top:8px;cursor:pointer">
              <input type="checkbox" data-inet-reduced ${state.reducedMotion ? 'checked' : ''}>
              <span>${esc(t('pktReducedMotionLabel'))}</span>
            </label>
            <div class="cx-callout" style="margin-top:14px">
              <strong>${esc(t('inetProtoRuleTitle'))}</strong>
              <p>${active
                ? `<strong>${esc(t('inetFormatTag'))}:</strong> ${esc(pick(active.format, lang))}<br><strong>${esc(t('inetOrderTag'))}:</strong> ${esc(active.order)}<br><strong>${esc(t('inetActionTag'))}:</strong> ${esc(pick(active.action, lang))}`
                : esc(t('inetProtoIdlePrompt'))
              }</p>
            </div>
          </div>

          <div class="cx-chart-box">
            <div class="inet-sequence-scroll">${renderProtocolSvg(lang, protoInfo)}</div>
            <div style="margin-top:12px">
              <p class="eyebrow" style="margin-bottom:8px">${esc(t('inetProtoLogTitle'))}</p>
              <ul class="inet-log">${stepRows}</ul>
            </div>
          </div>
        </div>`;
    }

    root.innerHTML = `<section class="sep-lab panel cx-work-panel inet-work" data-inet-view="${state.tab}">
      <div class="cx-header">
        <p class="eyebrow">${esc(t('inetLabEyebrow'))}</p>
        <h2>${esc(t('inetLabTitle'))}</h2>
        <p>${esc(t('inetLabSubtitle'))}</p>
      </div>
      ${tabHtml}
      ${bodyHtml}
      <div class="cx-topic-footer">
        <p>${esc(t('inetAttributionFooter'))}</p>
        <a class="button secondary" href="#practice">${esc(t('inetGoToClinic'))}</a>
      </div>
    </section>`;
  }

  function onClick(e) {
    const tabBtn = e.target.closest('[data-inet-tab]');
    if (tabBtn) {
      stopTimer();
      state.tab = tabBtn.dataset.inetTab;
      render();
      return;
    }
    const actionBtn = e.target.closest('[data-inet-action]');
    if (actionBtn) {
      const act = actionBtn.dataset.inetAction;
      if (act === 'toggle-play') {
        if (playing) { stopTimer(); render(); }
        else startTimer();
      } else if (act === 'step') {
        stepForward();
      } else if (act === 'reset') {
        resetCurrent();
      }
      return;
    }
    const stepRow = e.target.closest('[data-inet-proto-step]');
    if (stepRow) {
      stopTimer();
      state.protoStep = Number(stepRow.dataset.inetProtoStep);
      render();
      root.querySelector(`[data-inet-proto-step="${state.protoStep}"]`)?.focus({ preventScroll: true });
      return;
    }
    const nodeEl = e.target.closest('[data-hop-node]');
    if (nodeEl) {
      const routeInfo = inspectRoute(state.routeId, state.hopIndex);
      const idx = routeInfo.nodes.findIndex(n => n.id === nodeEl.dataset.hopNode);
      if (idx >= 0) {
        stopTimer();
        state.hopIndex = idx;
        render();
      }
    }
  }

  function onChange(e) {
    if (e.target.matches('[data-inet-route]')) {
      stopTimer();
      state.routeId = e.target.value;
      state.hopIndex = 0;
      render();
      return;
    }
    if (e.target.matches('[data-inet-scenario]')) {
      stopTimer();
      state.scenarioId = e.target.value;
      state.protoStep = 1;
      render();
      return;
    }
    if (e.target.matches('[data-inet-reduced]')) {
      state.reducedMotion = e.target.checked;
      if (state.reducedMotion) stopTimer();
      render();
    }
  }

  function onInput(e) {
    if (e.target.matches('[data-inet-param]')) {
      const key = e.target.dataset.inetParam;
      state[key] = Number(e.target.value);
      render();
    }
  }

  root.addEventListener('click', onClick);
  root.addEventListener('change', onChange);
  root.addEventListener('input', onInput);
  render();

  return {
    update(nextCtx) {
      ctx = nextCtx;
      render();
    },
    destroy() {
      stopTimer();
      root.removeEventListener('click', onClick);
      root.removeEventListener('change', onChange);
      root.removeEventListener('input', onInput);
      root.innerHTML = '';
    }
  };
}
