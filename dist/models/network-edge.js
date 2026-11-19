/**
 * Pure analytical model for Kurose & Ross (8th Ed., 2021)
 * Section 1.2: The Network Edge (§1.2.1 Access Networks & §1.2.2 Physical Media,
 * printed pp. 9–22, PDF pp. 20–33; Figures 1.3–1.9; Review Questions R4–R9).
 *
 * Zero DOM dependencies. Pure ES module.
 */

export const ACCESS_TECHNOLOGIES = {
  dsl: {
    id: 'dsl',
    category: 'home',
    shared: false,
    asymmetric: true,
    downstreamMbps: 52,
    upstreamMbps: 16,
    medium: 'twisted-pair',
    rangeDesc: { tr: 'Santrale (CO) 5–10 mil içi', en: 'Within 5–10 miles of CO' },
    headendDevice: { tr: 'DSLAM (Telefon Santrali)', en: 'DSLAM (Central Office)' },
    collisionDownstream: false
  },
  hfc: {
    id: 'hfc',
    category: 'home',
    shared: true,
    asymmetric: true,
    downstreamMbps: 400,
    upstreamMbps: 40,
    medium: 'fiber-coax',
    rangeDesc: { tr: '500–5.000 evlik paylaşımlı mahalle düğümü', en: 'Shared neighborhood node (500–5,000 homes)' },
    headendDevice: { tr: 'CMTS (Kablo Merkezi)', en: 'CMTS (Cable Head End)' },
    collisionDownstream: false
  },
  'ftth-pon': {
    id: 'ftth-pon',
    category: 'home',
    shared: true,
    asymmetric: false,
    downstreamMbps: 1000,
    upstreamMbps: 1000,
    medium: 'optical-fiber',
    rangeDesc: { tr: 'Optik ayırıcı başına <100 ev (PON)', en: '<100 homes per optical splitter (PON)' },
    headendDevice: { tr: 'OLT (Merkez Ofis) ↔ Evde ONT', en: 'OLT (Central Office) ↔ Home ONT' },
    collisionDownstream: false
  },
  ethernet: {
    id: 'ethernet',
    category: 'enterprise',
    shared: false,
    asymmetric: false,
    downstreamMbps: 1000,
    upstreamMbps: 1000,
    medium: 'twisted-pair',
    rangeDesc: { tr: 'Cat 6a bakır ile 100 m’ye kadar 10 Gbps', en: 'Up to 10 Gbps over 100 m (Cat 6a)' },
    headendDevice: { tr: 'Ethernet Anahtarı → Kurumsal Yönlendirici', en: 'Ethernet Switch → Institutional Router' },
    collisionDownstream: false
  },
  wifi: {
    id: 'wifi',
    category: 'enterprise-home',
    shared: true,
    asymmetric: false,
    downstreamMbps: 150,
    upstreamMbps: 150,
    medium: 'terrestrial-radio',
    rangeDesc: { tr: 'Erişim noktasından birkaç on metre (802.11)', en: 'Few tens of meters from Access Point (802.11)' },
    headendDevice: { tr: 'Kablosuz Erişim Noktası (AP)', en: 'Wireless Access Point (AP)' },
    collisionDownstream: true
  },
  cellular: {
    id: 'cellular',
    category: 'wide-area-wireless',
    shared: true,
    asymmetric: true,
    downstreamMbps: 60,
    upstreamMbps: 20,
    medium: 'terrestrial-radio',
    rangeDesc: { tr: 'Baz istasyonundan onlarca kilometre (4G/5G)', en: 'Tens of kilometers from Base Station (4G/5G)' },
    headendDevice: { tr: 'Hücresel Baz İstasyonu (4G LTE / 5G)', en: 'Cellular Base Station (4G LTE / 5G)' },
    collisionDownstream: false
  }
};

export const OC_STANDARDS = [1, 3, 12, 24, 48, 96, 192, 768];
export const OC_BASE_MBPS = 51.8;
export const SPEED_OF_LIGHT_M_S = 3e8;

/**
 * Evaluate effective per-user downstream & upstream rates and transfer times
 * for a chosen access technology and count of simultaneously active users.
 */
export function evaluateAccessScenario({ techId = 'hfc', activeUsers = 10, fileMB = 100 } = {}) {
  const tech = ACCESS_TECHNOLOGIES[techId] || ACCESS_TECHNOLOGIES.hfc;
  const users = Math.max(1, Math.round(Number(activeUsers) || 1));
  const sizeMB = Number(fileMB);
  if (!(sizeMB > 0)) {
    throw new RangeError('fileMB must be > 0');
  }

  const effectiveDownMbps = tech.shared ? tech.downstreamMbps / users : tech.downstreamMbps;
  const effectiveUpMbps = tech.shared ? tech.upstreamMbps / users : tech.upstreamMbps;
  const fileBits = sizeMB * 8 * 1e6; // decimal megabytes (1 MB = 10^6 bytes = 8 Mbits)
  const downloadSec = fileBits / (effectiveDownMbps * 1e6);
  const uploadSec = fileBits / (effectiveUpMbps * 1e6);

  return {
    tech,
    activeUsers: users,
    fileMB: sizeMB,
    effectiveDownMbps,
    effectiveUpMbps,
    downloadSec,
    uploadSec,
    asymmetryRatio: tech.downstreamMbps / tech.upstreamMbps
  };
}

/**
 * Optical Carrier (OC-n) link speed from Kurose & Ross §1.2.2 (printed p. 20):
 * R = n * 51.8 Mbps.
 */
export function computeOpticalCarrierMbps(n = 48) {
  if (!(n > 0)) throw new RangeError('OC multiplier n must be > 0');
  return n * OC_BASE_MBPS;
}

/**
 * One-way satellite signal propagation delay (ground station -> satellite -> ground station).
 * Straight vertical path is 2 * altitudeKm; slantFactor (default 1.0, or ~1.167 for slant GEO)
 * adjusts for ground-station elevation angle.
 */
export function computeSatellitePropMs({ altitudeKm = 36000, slantFactor = 1.0 } = {}) {
  if (!(altitudeKm > 0) || !(slantFactor >= 1.0)) {
    throw new RangeError('altitudeKm > 0 and slantFactor >= 1.0 required');
  }
  const roundTripDistanceMeters = 2 * altitudeKm * 1000 * slantFactor;
  const oneWayGroundToGroundMs = (roundTripDistanceMeters / SPEED_OF_LIGHT_M_S) * 1000;
  return {
    altitudeKm,
    pathDistanceKm: roundTripDistanceMeters / 1000,
    oneWayMs: oneWayGroundToGroundMs,
    rttMs: oneWayGroundToGroundMs * 2
  };
}
