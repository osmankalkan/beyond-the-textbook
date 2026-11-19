/**
 * Pure analytical and discrete-state model for Kurose & Ross (8th Ed., 2021)
 * Section 1.1: What Is the Internet? (§1.1.1–§1.1.3, printed pp. 2–9, PDF pp. 13–20).
 *
 * Covers:
 * - Figure 1.1: Nuts-and-bolts Internet topology (hosts/end systems, access switches,
 *   routers, local/regional/global ISPs, content provider & datacenter networks).
 * - Packet segmentation & header overhead arithmetic (K packets, overhead ratio, efficiency).
 * - Figure 1.2: Human protocol vs. TCP/HTTP network protocol discrete message state machine
 *   (format, order, and actions on send/receive/timeout/error).
 * - §1.1.2 Services description & socket interface mapping (postal service analogy).
 *
 * Zero DOM dependencies. Pure ES module.
 */

export const TOPOLOGY_ROUTES = {
  'home-to-dc': {
    id: 'home-to-dc',
    sourceRegion: 'home',
    destRegion: 'datacenter',
    nodes: [
      { id: 'home-laptop', role: 'end-system', region: 'home', runsApp: true, layer: 'Application + TCP/IP + WiFi' },
      { id: 'home-ap', role: 'base-station', region: 'home', runsApp: false, layer: 'Link Layer (IEEE 802.11 WiFi)' },
      { id: 'home-router', role: 'router', region: 'home', runsApp: false, layer: 'Network + Link (IP / Broadband)' },
      { id: 'regional-r1', role: 'router', region: 'regional-isp', runsApp: false, layer: 'Network Core (IP Forwarding)' },
      { id: 'global-r1', role: 'router', region: 'global-isp', runsApp: false, layer: 'Tier-1 Fiber Backbone (IP)' },
      { id: 'cp-r1', role: 'router', region: 'content-provider', runsApp: false, layer: 'Content Provider Edge (IP)' },
      { id: 'dc-server', role: 'end-system', region: 'datacenter', runsApp: true, layer: 'Application + TCP/IP + Ethernet' }
    ],
    links: [
      { media: 'wifi', rateMbps: 150, distanceKm: 0.02 },
      { media: 'ethernet', rateMbps: 1000, distanceKm: 0.01 },
      { media: 'coax-fiber', rateMbps: 100, distanceKm: 12 },
      { media: 'fiber', rateMbps: 10000, distanceKm: 180 },
      { media: 'fiber', rateMbps: 100000, distanceKm: 950 },
      { media: 'fiber', rateMbps: 40000, distanceKm: 25 }
    ]
  },
  'mobile-to-dc': {
    id: 'mobile-to-dc',
    sourceRegion: 'mobile',
    destRegion: 'datacenter',
    nodes: [
      { id: 'smartphone', role: 'end-system', region: 'mobile', runsApp: true, layer: 'Application + TCP/IP + 5G/LTE' },
      { id: 'cell-tower', role: 'base-station', region: 'mobile', runsApp: false, layer: 'Cellular Radio Base Station' },
      { id: 'mobile-router', role: 'router', region: 'mobile', runsApp: false, layer: 'Mobile Core Gateway (IP)' },
      { id: 'global-r1', role: 'router', region: 'global-isp', runsApp: false, layer: 'Tier-1 Fiber Backbone (IP)' },
      { id: 'cp-r1', role: 'router', region: 'content-provider', runsApp: false, layer: 'Content Provider Edge (IP)' },
      { id: 'dc-server', role: 'end-system', region: 'datacenter', runsApp: true, layer: 'Application + TCP/IP + Ethernet' }
    ],
    links: [
      { media: 'cellular', rateMbps: 80, distanceKm: 1.5 },
      { media: 'fiber', rateMbps: 1000, distanceKm: 15 },
      { media: 'fiber', rateMbps: 10000, distanceKm: 240 },
      { media: 'fiber', rateMbps: 100000, distanceKm: 700 },
      { media: 'fiber', rateMbps: 40000, distanceKm: 20 }
    ]
  },
  'enterprise-to-home': {
    id: 'enterprise-to-home',
    sourceRegion: 'enterprise',
    destRegion: 'home',
    nodes: [
      { id: 'workstation', role: 'end-system', region: 'enterprise', runsApp: true, layer: 'Application + TCP/IP + Ethernet' },
      { id: 'ent-switch', role: 'link-switch', region: 'enterprise', runsApp: false, layer: 'Link-Layer Switch (IEEE 802.3)' },
      { id: 'ent-router', role: 'router', region: 'enterprise', runsApp: false, layer: 'Enterprise Edge Router (IP)' },
      { id: 'regional-r1', role: 'router', region: 'regional-isp', runsApp: false, layer: 'Regional ISP Router (IP)' },
      { id: 'home-router', role: 'router', region: 'home', runsApp: false, layer: 'Home Broadband Router (IP)' },
      { id: 'home-thermostat', role: 'end-system', region: 'home', runsApp: true, layer: 'IoT Application + TCP/IP + WiFi' }
    ],
    links: [
      { media: 'ethernet', rateMbps: 1000, distanceKm: 0.05 },
      { media: 'ethernet', rateMbps: 10000, distanceKm: 0.1 },
      { media: 'fiber', rateMbps: 1000, distanceKm: 8 },
      { media: 'coax-fiber', rateMbps: 100, distanceKm: 14 },
      { media: 'wifi', rateMbps: 54, distanceKm: 0.015 }
    ]
  }
};

export const PROTOCOL_SCENARIOS = {
  'human-normal': {
    id: 'human-normal',
    kind: 'human',
    outcome: 'success',
    steps: [
      {
        index: 1,
        from: 'left',
        to: 'right',
        label: { tr: 'Merhaba', en: 'Hi' },
        format: { tr: 'Açılış selamlama mesajı', en: 'Opening greeting message' },
        order: '1 / 4',
        action: {
          tr: 'İletişimi başlatır; karşı tarafın konuşmaya hazır olduğuna dair yanıt bekler.',
          en: 'Initiates conversation and waits for a cordial acknowledgement.'
        },
        stateLeft: 'GREETING_SENT',
        stateRight: 'GREETING_RECEIVED'
      },
      {
        index: 2,
        from: 'right',
        to: 'left',
        label: { tr: 'Merhaba', en: 'Hi' },
        format: { tr: 'Onaylayıcı karşılık selamı', en: 'Cordial greeting reply' },
        order: '2 / 4',
        action: {
          tr: 'İletişime açık olunduğunu bildirir; sol taraf artık sorusunu sorabilir.',
          en: 'Signals readiness to communicate; initiator may now ask the question.'
        },
        stateLeft: 'CHANNEL_OPEN',
        stateRight: 'READY_FOR_QUERY'
      },
      {
        index: 3,
        from: 'left',
        to: 'right',
        label: { tr: 'Saat kaç?', en: 'Got the time?' },
        format: { tr: 'Bilgi talebi (saat sorusu)', en: 'Information request (time query)' },
        order: '3 / 4',
        action: {
          tr: 'Karşı tarafın saatine bakıp zaman bilgisini döndürmesini tetikler.',
          en: 'Prompts the peer to check the clock and prepare a time reply.'
        },
        stateLeft: 'AWAITING_ANSWER',
        stateRight: 'PROCESSING_QUERY'
      },
      {
        index: 4,
        from: 'right',
        to: 'left',
        label: { tr: '14:00 (2:00)', en: '2:00' },
        format: { tr: 'Zaman yanıtı (SS:DD)', en: 'Time response (H:MM)' },
        order: '4 / 4',
        action: {
          tr: 'İstenen bilgi eksiksiz teslim edildi; protokol başarıyla tamamlandı.',
          en: 'Requested time is delivered; human protocol completes cleanly.'
        },
        stateLeft: 'COMPLETED',
        stateRight: 'COMPLETED'
      }
    ]
  },
  'human-mismatch': {
    id: 'human-mismatch',
    kind: 'human',
    outcome: 'aborted',
    steps: [
      {
        index: 1,
        from: 'left',
        to: 'right',
        label: { tr: 'Merhaba', en: 'Hi' },
        format: { tr: 'Açılış selamlama mesajı', en: 'Opening greeting message' },
        order: '1 / 2',
        action: {
          tr: 'İletişimi başlatır ve uyumlu bir selam yanıtı bekler.',
          en: 'Initiates conversation and expects a compatible greeting.'
        },
        stateLeft: 'GREETING_SENT',
        stateRight: 'GREETING_RECEIVED'
      },
      {
        index: 2,
        from: 'right',
        to: 'left',
        label: { tr: 'İngilizce bilmiyorum / Rahatsız etme!', en: "I don't speak English / Don't bother me!" },
        format: { tr: 'Uyumsuz veya reddedici yanıt', en: 'Incompatible or refusal reply' },
        order: '2 / 2',
        action: {
          tr: 'Protokol kuralı gereği saat sorulmaz; iki taraf aynı protokolü çalıştırmadığı için etkileşim sonlandırılır.',
          en: 'Per protocol rules, the question is not asked; entities do not interoperate so the exchange aborts.'
        },
        stateLeft: 'ABORTED',
        stateRight: 'CLOSED'
      }
    ]
  },
  'web-normal': {
    id: 'web-normal',
    kind: 'network',
    outcome: 'success',
    steps: [
      {
        index: 1,
        from: 'left',
        to: 'right',
        label: { tr: 'TCP bağlantı isteği', en: 'TCP connection request' },
        format: { tr: 'TCP SYN kontrol segmenti', en: 'TCP SYN control segment' },
        order: '1 / 4',
        action: {
          tr: 'İstemci (uç sistem) web sunucusunun soketine bağlantı başlatma isteği gönderir ve yanıt bekler.',
          en: 'Client end system requests a TCP connection to the Web server socket and awaits reply.'
        },
        stateLeft: 'SYN_SENT',
        stateRight: 'SYN_RECEIVED'
      },
      {
        index: 2,
        from: 'right',
        to: 'left',
        label: { tr: 'TCP bağlantı yanıtı', en: 'TCP connection reply' },
        format: { tr: 'TCP SYN-ACK onay segmenti', en: 'TCP SYN-ACK reply segment' },
        order: '2 / 4',
        action: {
          tr: 'Sunucu bağlantı isteğini kabul eder; istemci artık HTTP belge isteği gönderebilir.',
          en: 'Server accepts the connection; client knows it is now safe to request the Web object.'
        },
        stateLeft: 'ESTABLISHED',
        stateRight: 'ESTABLISHED'
      },
      {
        index: 3,
        from: 'left',
        to: 'right',
        label: { tr: 'GET http://www.pearsonhighered.com/cs-resources/', en: 'GET http://www.pearsonhighered.com/cs-resources/' },
        format: { tr: 'HTTP GET istek mesajı (URL biçimi)', en: 'HTTP GET request message (URL format)' },
        order: '3 / 4',
        action: {
          tr: 'İstemci tam URL biçimiyle hedef web sayfasını talep eder; sunucu dosyayı diskten/bellekten okur.',
          en: 'Client requests the named Web page; server locates the object to transmit back.'
        },
        stateLeft: 'AWAITING_FILE',
        stateRight: 'SERVING_OBJECT'
      },
      {
        index: 4,
        from: 'right',
        to: 'left',
        label: { tr: '<dosya> (HTTP 200 OK)', en: '<file> (HTTP 200 OK)' },
        format: { tr: 'HTTP yanıt başlığı + web sayfası verisi', en: 'HTTP response header + Web page payload' },
        order: '4 / 4',
        action: {
          tr: 'Web sunucusu dosyayı istemciye döndürür; tarayıcı sayfayı birleştirip ekranda görüntüler.',
          en: 'Web server returns the requested file; client browser reassembles and renders the page.'
        },
        stateLeft: 'COMPLETED',
        stateRight: 'COMPLETED'
      }
    ]
  },
  'web-timeout': {
    id: 'web-timeout',
    kind: 'network',
    outcome: 'timeout',
    steps: [
      {
        index: 1,
        from: 'left',
        to: 'right',
        label: { tr: 'TCP bağlantı isteği', en: 'TCP connection request' },
        format: { tr: 'TCP SYN kontrol segmenti', en: 'TCP SYN control segment' },
        order: '1 / 2',
        action: {
          tr: 'İstemci bağlantı isteğini gönderir ve bir zaman aşımı (timeout) sayacı başlatır.',
          en: 'Client sends connection request and starts a protocol timeout timer.'
        },
        stateLeft: 'SYN_SENT',
        stateRight: 'UNREACHABLE'
      },
      {
        index: 2,
        from: 'left',
        to: 'left',
        label: { tr: 'Yanıt yok → Zaman aşımı (Timeout)', en: 'No reply → Timeout event' },
        format: { tr: 'Yerel protokol olayı (timer expiry)', en: 'Local protocol event (timer expiry)' },
        order: '2 / 2',
        action: {
          tr: 'GET mesajı gönderilmez! Protokol, mesaj gelmediğinde ("diğer olay") yeniden deneme veya vazgeçme eylemini tanımlar.',
          en: 'GET is never sent! A protocol also specifies actions on "other events" such as timeout (retry or abort).'
        },
        stateLeft: 'TIMEOUT_ABORT',
        stateRight: 'UNREACHABLE'
      }
    ]
  }
};

/**
 * Compute packet segmentation, header overhead, and protocol efficiency.
 *
 * @param {object} params
 * @param {number} params.messageBytes   Application message size F (bytes, > 0)
 * @param {number} params.payloadBytes   Max payload per packet P_data (bytes, > 0)
 * @param {number} params.headerBytes    Header bytes added to each packet H (bytes, >= 0)
 */
export function computePacketization({ messageBytes = 10000, payloadBytes = 1460, headerBytes = 40 } = {}) {
  if (!(messageBytes > 0) || !(payloadBytes > 0) || !(headerBytes >= 0)) {
    throw new RangeError('messageBytes and payloadBytes must be > 0, headerBytes must be >= 0');
  }
  const F = Number(messageBytes);
  const Pdata = Number(payloadBytes);
  const H = Number(headerBytes);

  const packetCount = Math.ceil(F / Pdata);
  const fullPacketBytes = Pdata + H;
  const lastPayloadBytes = F - (packetCount - 1) * Pdata;
  const lastPacketBytes = lastPayloadBytes + H;
  const totalHeaderBytes = packetCount * H;
  const totalTransmittedBytes = F + totalHeaderBytes;
  const totalTransmittedBits = totalTransmittedBytes * 8;
  const efficiency = F / totalTransmittedBytes;
  const overheadFraction = totalHeaderBytes / totalTransmittedBytes;

  return {
    messageBytes: F,
    payloadBytes: Pdata,
    headerBytes: H,
    packetCount,
    fullPacketBytes,
    lastPayloadBytes,
    lastPacketBytes,
    totalHeaderBytes,
    totalTransmittedBytes,
    totalTransmittedBits,
    efficiency,
    efficiencyPercent: efficiency * 100,
    overheadFraction,
    overheadPercent: overheadFraction * 100
  };
}

/**
 * Inspect a route from Figure 1.1 at a given hop index (0 .. nodes.length - 1).
 */
export function inspectRoute(routeId = 'home-to-dc', hopIndex = 0) {
  const route = TOPOLOGY_ROUTES[routeId] || TOPOLOGY_ROUTES['home-to-dc'];
  const maxHop = route.nodes.length - 1;
  const clampedHop = Math.max(0, Math.min(maxHop, Math.round(hopIndex)));
  const currentNode = route.nodes[clampedHop];
  const endSystemCount = route.nodes.filter(n => n.role === 'end-system').length;
  const switchCount = route.nodes.length - endSystemCount;
  const bottleneckMbps = Math.min(...route.links.map(l => l.rateMbps));
  const totalDistanceKm = route.links.reduce((sum, l) => sum + l.distanceKm, 0);

  return {
    routeId: route.id,
    nodes: route.nodes,
    links: route.links,
    hopIndex: clampedHop,
    maxHop,
    currentNode,
    endSystemCount,
    switchCount,
    bottleneckMbps,
    totalDistanceKm
  };
}

/**
 * Evaluate a protocol exchange scenario at discrete step (0 .. steps.length).
 */
export function evaluateProtocolStep(scenarioId = 'web-normal', step = 0) {
  const scenario = PROTOCOL_SCENARIOS[scenarioId] || PROTOCOL_SCENARIOS['web-normal'];
  const maxStep = scenario.steps.length;
  const clamped = Math.max(0, Math.min(maxStep, Math.round(step)));
  const activeStep = clamped > 0 ? scenario.steps[clamped - 1] : null;

  return {
    scenarioId: scenario.id,
    kind: scenario.kind,
    outcome: scenario.outcome,
    step: clamped,
    maxStep,
    visibleSteps: scenario.steps.slice(0, clamped),
    allSteps: scenario.steps,
    activeStep,
    stateLeft: activeStep ? activeStep.stateLeft : 'IDLE',
    stateRight: activeStep ? activeStep.stateRight : 'LISTENING'
  };
}

/**
 * Estimate simple two-RTT Web fetch duration for Figure 1.2 (1 RTT for TCP handshake
 * + 1 RTT for GET request & response propagation + file transmission time).
 */
export function estimateWebExchangeMs({ rttMs = 40, fileBytes = 100000, rateMbps = 10 } = {}) {
  if (!(rttMs >= 0) || !(fileBytes >= 0) || !(rateMbps > 0)) {
    throw new RangeError('rttMs >= 0, fileBytes >= 0, and rateMbps > 0 required');
  }
  const handshakeMs = rttMs;
  const requestPropagationMs = rttMs;
  const fileTransmissionMs = ((fileBytes * 8) / (rateMbps * 1e6)) * 1000;
  const totalMs = handshakeMs + requestPropagationMs + fileTransmissionMs;
  return {
    rttMs,
    handshakeMs,
    requestPropagationMs,
    fileTransmissionMs,
    totalMs
  };
}
