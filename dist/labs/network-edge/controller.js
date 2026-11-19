import {
  ACCESS_TECHNOLOGIES,
  OC_STANDARDS,
  evaluateAccessScenario,
  computeOpticalCarrierMbps,
  computeSatellitePropMs
} from '../../models/network-edge.js';

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

  const state = {
    tab: 'access', // 'access' | 'media'
    techId: 'hfc',
    activeUsers: 10,
    fileMB: 100,
    ocN: 48,
    satAltitudeKm: 36000
  };

  function renderAccessSvg(lang, res) {
    const isEn = lang === 'en';
    const { tech, activeUsers, effectiveDownMbps } = res;
    const sharedColor = tech.shared ? '#d97706' : '#059669';
    const sharedBadge = tech.shared
      ? (isEn ? `SHARED MEDIUM (÷ ${activeUsers} active)` : `PAYLAŞIMLI ORTAM (÷ ${activeUsers} aktif)`)
      : (isEn ? 'DEDICATED ACCESS LINE (No neighbor sharing)' : 'ADANMIŞ ERİŞİM HATTI (Komşuyla bölünmez)');

    if (tech.id === 'dsl') {
      return `<svg viewBox="0 0 720 230" class="cx-chart" role="img" aria-label="${esc(isEn ? 'DSL access architecture schematic' : 'DSL erişim mimarisi şeması')}">
        <rect x="18" y="22" width="176" height="156" rx="10" fill="#dcfce7" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.5"/>
        <text x="106" y="42" text-anchor="middle" font-size="11.5" font-weight="700" fill="#15803d">${isEn ? 'Home (Dedicated Line)' : 'Ev (Adanmış Hat)'}</text>
        <rect x="34" y="56" width="66" height="30" rx="5" fill="#2563eb"/><text x="67" y="75" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">${isEn ? 'Home PC' : 'Ev PC'}</text>
        <rect x="34" y="102" width="66" height="30" rx="5" fill="#475569"/><text x="67" y="121" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">${isEn ? 'Phone' : 'Telefon'}</text>
        <rect x="122" y="76" width="58" height="40" rx="5" fill="#d97706"/><text x="151" y="100" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Splitter</text>
        <line x1="100" y1="71" x2="122" y2="88" stroke="#334155" stroke-width="1.8"/>
        <line x1="100" y1="117" x2="122" y2="104" stroke="#334155" stroke-width="1.8"/>
        <line x1="180" y1="96" x2="438" y2="96" stroke="#059669" stroke-width="3.2"/>
        <rect x="218" y="34" width="188" height="52" rx="6" fill="var(--surface,#fff)" stroke="#059669" stroke-width="1.3"/>
        <text x="312" y="51" text-anchor="middle" font-size="9.5" font-weight="700" fill="#059669">FDM · ${isEn ? '3 Frequency Channels' : '3 Frekans Kanalı'}</text>
        <text x="312" y="65" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">0–4 kHz ${isEn ? 'Voice' : 'Ses'} · 4–50 kHz Up</text>
        <text x="312" y="79" text-anchor="middle" font-size="9" font-weight="700" fill="#2563eb">50 kHz–1 MHz Down (${tech.downstreamMbps} Mbps)</text>
        <rect x="440" y="28" width="144" height="144" rx="10" fill="#e0f2fe" fill-opacity="0.65" stroke="#0284c7" stroke-width="1.5"/>
        <text x="512" y="48" text-anchor="middle" font-size="11" font-weight="700" fill="#0369a1">${isEn ? 'Central Office (CO)' : 'Telefon Santrali (CO)'}</text>
        <rect x="462" y="70" width="100" height="50" rx="6" fill="#0f766e"/><text x="512" y="99" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fff">DSLAM</text>
        <line x1="584" y1="96" x2="640" y2="96" stroke="#0f766e" stroke-width="2.4"/>
        <rect x="640" y="74" width="64" height="44" rx="8" fill="#1e293b"/><text x="672" y="100" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Internet</text>
        <rect x="18" y="192" width="684" height="26" rx="6" fill="${sharedColor}" fill-opacity="0.14" stroke="${sharedColor}"/>
        <text x="360" y="209" text-anchor="middle" font-size="11" font-weight="700" fill="${sharedColor}">${esc(sharedBadge)} → ${effectiveDownMbps.toFixed(1)} Mbps</text>
      </svg>`;
    }

    if (tech.id === 'hfc' || tech.id === 'ftth-pon') {
      const isPon = tech.id === 'ftth-pon';
      const nodeLabel = isPon ? (isEn ? 'Optical Splitter' : 'Optik Ayırıcı') : (isEn ? 'Fiber Node' : 'Fiber Düğüm');
      const headLabel = isPon ? 'OLT (CO)' : 'CMTS (Headend)';
      const homeLabel = isPon ? 'ONT' : (isEn ? 'Cable Modem' : 'Kablo Modem');
      const countShow = Math.min(4, activeUsers);
      const homes = Array.from({ length: countShow }, (_, i) => {
        const y = 26 + i * 38;
        return `<rect x="24" y="${y}" width="112" height="28" rx="5" fill="#2563eb"/><text x="80" y="${y + 18}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">${isEn ? 'Home' : 'Ev'} ${i + 1} (${homeLabel})</text>
          <line x1="136" y1="${y + 14}" x2="256" y2="96" stroke="#d97706" stroke-width="2"/>`;
      }).join('');

      return `<svg viewBox="0 0 720 230" class="cx-chart" role="img" aria-label="${esc(isPon ? 'FTTH PON architecture' : 'HFC cable access architecture')}">
        ${homes}
        <text x="80" y="182" text-anchor="middle" font-size="9.5" font-weight="700" fill="#d97706">+ ${Math.max(0, activeUsers - countShow)} ${isEn ? 'more active homes' : 'aktif komşu daha'}</text>
        <rect x="256" y="68" width="116" height="56" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
        <text x="314" y="94" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">${nodeLabel}</text>
        <text x="314" y="110" text-anchor="middle" font-size="9" fill="#92400e">${isPon ? 'Fiber' : 'Coax → Fiber'}</text>
        <line x1="372" y1="96" x2="466" y2="96" stroke="#0f766e" stroke-width="3"/>
        <rect x="466" y="68" width="122" height="56" rx="8" fill="#0f766e"/>
        <text x="527" y="99" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${headLabel}</text>
        <line x1="588" y1="96" x2="640" y2="96" stroke="#0f766e" stroke-width="2.4"/>
        <rect x="640" y="74" width="64" height="44" rx="8" fill="#1e293b"/><text x="672" y="100" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Internet</text>
        <rect x="18" y="194" width="684" height="26" rx="6" fill="${sharedColor}" fill-opacity="0.14" stroke="${sharedColor}"/>
        <text x="360" y="211" text-anchor="middle" font-size="11" font-weight="700" fill="${sharedColor}">${esc(sharedBadge)} → ${effectiveDownMbps.toFixed(1)} Mbps / ${isEn ? 'user' : 'kullanıcı'}</text>
      </svg>`;
    }

    // Ethernet / WiFi / Cellular
    const midLabel = tech.id === 'ethernet'
      ? (isEn ? 'Ethernet Switch' : 'Ethernet Anahtarı')
      : (tech.id === 'wifi' ? (isEn ? 'WiFi AP (802.11)' : 'WiFi Erişim Noktası') : (isEn ? '4G/5G Base Station' : '4G/5G Baz İstasyonu'));
    const linkStyle = tech.id === 'ethernet' ? '' : 'stroke-dasharray="5 4"';

    return `<svg viewBox="0 0 720 230" class="cx-chart" role="img" aria-label="${esc(midLabel)}">
      <rect x="24" y="42" width="130" height="42" rx="7" fill="#2563eb"/><text x="89" y="67" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">${isEn ? 'User Device 1' : 'Kullanıcı 1'}</text>
      <rect x="24" y="108" width="130" height="42" rx="7" fill="#3b82f6"/><text x="89" y="133" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">${activeUsers} ${isEn ? 'Active Devices' : 'Aktif Cihaz'}</text>
      <line x1="154" y1="63" x2="274" y2="96" stroke="${sharedColor}" stroke-width="2.4" ${linkStyle}/>
      <line x1="154" y1="129" x2="274" y2="96" stroke="${sharedColor}" stroke-width="2.4" ${linkStyle}/>
      <rect x="274" y="66" width="150" height="60" rx="9" fill="#0f766e"/><text x="349" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${midLabel}</text>
      <line x1="424" y1="96" x2="494" y2="96" stroke="#334155" stroke-width="2.6"/>
      <rect x="494" y="70" width="106" height="52" rx="8" fill="#475569"/><text x="547" y="100" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">${isEn ? 'Edge Router' : 'Kenar Yönl.'}</text>
      <line x1="600" y1="96" x2="640" y2="96" stroke="#334155" stroke-width="2.4"/>
      <rect x="640" y="74" width="64" height="44" rx="8" fill="#1e293b"/><text x="672" y="100" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Internet</text>
      <rect x="18" y="192" width="684" height="26" rx="6" fill="${sharedColor}" fill-opacity="0.14" stroke="${sharedColor}"/>
      <text x="360" y="209" text-anchor="middle" font-size="11" font-weight="700" fill="${sharedColor}">${esc(sharedBadge)} → ${effectiveDownMbps.toFixed(1)} Mbps / ${isEn ? 'user' : 'kullanıcı'}</text>
    </svg>`;
  }

  function renderMediaSvg(lang, satInfo, ocMbps) {
    const isEn = lang === 'en';
    const isLeo = satInfo.altitudeKm <= 2000;
    const satY = isLeo ? 116 : 38;
    const orbitLabel = isLeo
      ? (isEn ? `LEO Orbit (${satInfo.altitudeKm} km)` : `Alçak Yörünge LEO (${satInfo.altitudeKm} km)`)
      : (isEn ? `GEO / High Orbit (${satInfo.altitudeKm.toLocaleString('en-US')} km)` : `Jeosenkron / Yüksek Yörünge (${satInfo.altitudeKm.toLocaleString('tr-TR')} km)`);

    return `<svg viewBox="0 0 720 240" class="cx-chart" role="img" aria-label="${esc(isEn ? 'Satellite altitude and propagation delay diagram' : 'Uydu yüksekliği ve yayılma gecikmesi diyagramı')}">
      <rect x="18" y="14" width="684" height="196" rx="12" fill="#0f172a" fill-opacity="0.06" stroke="#cbd5e1"/>
      <path d="M 40 202 Q 360 158 680 202" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
      <rect x="122" y="168" width="84" height="24" rx="5" fill="#2563eb"/><text x="164" y="184" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">${isEn ? 'Station A' : 'Yer İst. A'}</text>
      <rect x="514" y="168" width="84" height="24" rx="5" fill="#059669"/><text x="556" y="184" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">${isEn ? 'Station B' : 'Yer İst. B'}</text>
      <line x1="164" y1="168" x2="360" y2="${satY + 14}" stroke="#d97706" stroke-width="2.4" stroke-dasharray="6 4"/>
      <line x1="360" y1="${satY + 14}" x2="556" y2="168" stroke="#d97706" stroke-width="2.4" stroke-dasharray="6 4"/>
      <rect x="312" y="${satY - 12}" width="96" height="28" rx="6" fill="#d97706"/>
      <text x="360" y="${satY + 6}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">${isEn ? 'Satellite' : 'Uydu'}</text>
      <text x="360" y="${satY - 20}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">${esc(orbitLabel)}</text>
      <text x="360" y="148" text-anchor="middle" font-size="11" font-weight="700" fill="#b45309">${isEn ? 'One-way propagation' : 'Tek yön yayılma'}: ${satInfo.oneWayMs.toFixed(1)} ms · RTT ≈ ${satInfo.rttMs.toFixed(1)} ms</text>
      <text x="360" y="229" text-anchor="middle" font-size="10.5" fill="var(--muted-ink,#52634c)">OC-${state.ocN} ${isEn ? 'Optical Fiber Rate' : 'Optik Fiber Hızı'}: ${state.ocN} × 51.8 Mbps = ${ocMbps.toFixed(1)} Mbps (${(ocMbps / 1000).toFixed(2)} Gbps)</text>
    </svg>`;
  }

  function render() {
    const { lang, t, format } = ctx;
    const isEn = lang === 'en';
    const res = evaluateAccessScenario({
      techId: state.techId,
      activeUsers: state.activeUsers,
      fileMB: state.fileMB
    });
    const ocMbps = computeOpticalCarrierMbps(state.ocN);
    const satInfo = computeSatellitePropMs({ altitudeKm: state.satAltitudeKm, slantFactor: 1.167 });

    const techNames = {
      dsl: isEn ? 'DSL (Dedicated Twisted-Pair · Fig. 1.5)' : 'DSL (Adanmış Bakır Telefon Hattı · Şekil 1.5)',
      hfc: isEn ? 'HFC Cable (Shared Coax + Fiber · Fig. 1.6)' : 'HFC Kablo (Paylaşımlı Koaksiyel + Fiber · Şekil 1.6)',
      'ftth-pon': isEn ? 'FTTH PON (Shared Fiber Splitter · Fig. 1.7)' : 'FTTH PON (Paylaşımlı Fiber Ayırıcı · Şekil 1.7)',
      ethernet: isEn ? 'Enterprise Ethernet LAN (Dedicated · Fig. 1.8)' : 'Kurumsal Ethernet LAN (Adanmış · Şekil 1.8)',
      wifi: isEn ? 'WiFi 802.11 WLAN (Shared Radio · Fig. 1.9)' : 'WiFi 802.11 WLAN (Paylaşımlı Radyo · Şekil 1.9)',
      cellular: isEn ? '4G LTE / 5G Cellular (Wide-Area Shared)' : '4G LTE / 5G Hücresel (Geniş Alan Paylaşımlı)'
    };

    const tabHtml = `<div class="cx-options" role="tablist">
      <button type="button" role="tab" aria-selected="${state.tab === 'access'}" class="${state.tab === 'access' ? 'selected' : ''}" data-edge-tab="access">${esc(t('edgeTabAccess'))}</button>
      <button type="button" role="tab" aria-selected="${state.tab === 'media'}" class="${state.tab === 'media' ? 'selected' : ''}" data-edge-tab="media">${esc(t('edgeTabMedia'))}</button>
    </div>`;

    let bodyHtml = '';
    if (state.tab === 'access') {
      bodyHtml = `
        <div class="cx-split">
          <div class="cx-controls">
            <div class="cx-control">
              <label for="edge-tech-select"><span>${esc(t('edgeTechLabel'))}</span></label>
              <select id="edge-tech-select" data-edge-tech style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid var(--border,#cbd5e1);background:var(--surface,#fff);color:var(--text,#1e293b)">
                ${Object.keys(ACCESS_TECHNOLOGIES).map(id => `<option value="${id}" ${state.techId === id ? 'selected' : ''}>${esc(techNames[id])}</option>`).join('')}
              </select>
            </div>
            <div class="cx-control">
              <label for="edge-users"><span>${esc(t('edgeActiveUsersLabel'))}</span><output>${state.activeUsers}</output></label>
              <input id="edge-users" type="range" min="1" max="40" step="1" value="${state.activeUsers}" data-edge-param="activeUsers">
            </div>
            <div class="cx-control">
              <label for="edge-file-mb"><span>${esc(t('edgeFileSizeLabel'))}</span><output>${state.fileMB} MB</output></label>
              <input id="edge-file-mb" type="range" min="10" max="1000" step="10" value="${state.fileMB}" data-edge-param="fileMB">
            </div>
            <div class="cx-callout" style="margin-top:12px">
              <strong>${esc(pick(res.tech.headendDevice, lang))}</strong>
              <p>${esc(pick(res.tech.rangeDesc, lang))}<br><small>${res.tech.shared ? esc(t('edgeSharedNote')) : esc(t('edgeDedicatedNote'))}</small></p>
            </div>
          </div>

          <div class="cx-chart-box">
            ${renderAccessSvg(lang, res)}
            <div class="cx-live" style="margin-top:12px">
              <div class="metrics">
                <div class="metric">
                  <p class="eyebrow">${esc(t('edgeMetricEffDown'))}</p>
                  <strong>${format(res.effectiveDownMbps, 1)} <small>Mbps</small></strong>
                  <p>${esc(t('edgeRawDownSub', format(res.tech.downstreamMbps, 0)))}</p>
                </div>
                <div class="metric">
                  <p class="eyebrow">${esc(t('edgeMetricDlTime'))}</p>
                  <strong>${format(res.downloadSec, 1)} <small>${isEn ? 's' : 'sn'}</small></strong>
                  <p>${state.fileMB} MB (${state.fileMB * 8} Mbit)</p>
                </div>
                <div class="metric">
                  <p class="eyebrow">${esc(t('edgeMetricUlTime'))}</p>
                  <strong>${format(res.uploadSec, 1)} <small>${isEn ? 's' : 'sn'}</small></strong>
                  <p>${esc(t('edgeEffUpSub', format(res.effectiveUpMbps, 1)))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    } else {
      bodyHtml = `
        <div class="cx-split">
          <div class="cx-controls">
            <div class="cx-control">
              <label for="edge-sat-alt"><span>${esc(t('edgeSatAltLabel'))}</span><output>${format(state.satAltitudeKm, 0)} km</output></label>
              <input id="edge-sat-alt" type="range" min="550" max="36000" step="50" value="${state.satAltitudeKm}" data-edge-param="satAltitudeKm">
            </div>
            <div class="cx-actions">
              <button type="button" class="button secondary" data-edge-sat-preset="550">LEO (550 km)</button>
              <button type="button" class="button secondary" data-edge-sat-preset="36000">GEO (36.000 km)</button>
            </div>
            <div class="cx-control" style="margin-top:14px">
              <label for="edge-oc-select"><span>${esc(t('edgeOcLabel'))}</span></label>
              <select id="edge-oc-select" data-edge-oc style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid var(--border,#cbd5e1);background:var(--surface,#fff);color:var(--text,#1e293b)">
                ${OC_STANDARDS.map(n => `<option value="${n}" ${state.ocN === n ? 'selected' : ''}>OC-${n} (${(n * 51.8).toFixed(1)} Mbps)</option>`).join('')}
              </select>
            </div>
            <div class="cx-callout" style="margin-top:12px">
              <strong>${esc(t('edgeGuidedVsUnguidedTitle'))}</strong>
              <p>${esc(t('edgeGuidedVsUnguidedDesc'))}</p>
            </div>
          </div>

          <div class="cx-chart-box">
            ${renderMediaSvg(lang, satInfo, ocMbps)}
            <div class="cx-live" style="margin-top:12px">
              <div class="metrics">
                <div class="metric">
                  <p class="eyebrow">${esc(t('edgeMetricSatOneWay'))}</p>
                  <strong>${format(satInfo.oneWayMs, 1)} <small>ms</small></strong>
                  <p>${esc(t('edgeSatPathSub', format(satInfo.pathDistanceKm, 0)))}</p>
                </div>
                <div class="metric">
                  <p class="eyebrow">${esc(t('edgeMetricSatRtt'))}</p>
                  <strong>${format(satInfo.rttMs, 1)} <small>ms</small></strong>
                  <p>${isEn ? 'Ground → Sat → Ground × 2' : 'Yer → Uydu → Yer × 2'}</p>
                </div>
                <div class="metric">
                  <p class="eyebrow">OC-${state.ocN}</p>
                  <strong>${format(ocMbps / 1000, 2)} <small>Gbps</small></strong>
                  <p>${format(ocMbps, 1)} Mbps (n × 51.8)</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }

    root.innerHTML = `<section class="sep-lab panel cx-work-panel">
      <div class="cx-header">
        <p class="eyebrow">${esc(t('edgeLabEyebrow'))}</p>
        <h2>${esc(t('edgeLabTitle'))}</h2>
        <p>${esc(t('edgeLabSubtitle'))}</p>
      </div>
      ${tabHtml}
      ${bodyHtml}
      <div class="cx-topic-footer">
        <p>${esc(t('edgeAttributionFooter'))}</p>
        <a class="button secondary" href="#practice">${esc(t('edgeGoToClinic'))}</a>
      </div>
    </section>`;
  }

  function onClick(e) {
    const tabBtn = e.target.closest('[data-edge-tab]');
    if (tabBtn) {
      state.tab = tabBtn.dataset.edgeTab;
      render();
      return;
    }
    const satBtn = e.target.closest('[data-edge-sat-preset]');
    if (satBtn) {
      state.satAltitudeKm = Number(satBtn.dataset.edgeSatPreset);
      render();
    }
  }

  function onChange(e) {
    if (e.target.matches('[data-edge-tech]')) {
      state.techId = e.target.value;
      render();
      return;
    }
    if (e.target.matches('[data-edge-oc]')) {
      state.ocN = Number(e.target.value);
      render();
    }
  }

  function onInput(e) {
    if (e.target.matches('[data-edge-param]')) {
      const key = e.target.dataset.edgeParam;
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
      root.removeEventListener('click', onClick);
      root.removeEventListener('change', onChange);
      root.removeEventListener('input', onInput);
      root.innerHTML = '';
    }
  };
}
