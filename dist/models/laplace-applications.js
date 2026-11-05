/**
 * Applications of the Laplace Transform mathematical model (§6.6)
 * SDOF mechanical vibration, RLC circuits with periodic inputs, and beams on elastic foundation.
 */

export const LAPLACE_APP_FAMILIES = [
  'sdof-vibration-ramp',
  'sdof-harmonic-pulse',
  'rlc-periodic-square',
  'rlc-step-resonance',
  'beam-elastic-point'
];

export function laplaceAppFamilies() {
  return [...LAPLACE_APP_FAMILIES];
}

/**
 * Exact analytical evaluations for engineering applications.
 */
export function laplaceAppExact(family, t, params = {}) {
  if (t < 0) return { total: 0, primary: 0, secondary: 0 };

  switch (family) {
    case 'sdof-vibration-ramp': {
      // m x'' + c x' + k x = f(t), where f(t) ramps to F0 at t1 then stays constant or drops
      // For m=1, omega_n = sqrt(k), underdamped zeta < 1
      const m = params.m ?? 1.0;
      const k = params.k ?? 4.0;
      const c = params.c ?? 0.8;
      const F0 = params.F0 ?? 10.0;
      const t1 = params.t1 ?? 2.0;

      const omegaN = Math.sqrt(k / m);
      const zeta = c / (2.0 * Math.sqrt(m * k));
      const omegaD = omegaN * Math.sqrt(1.0 - zeta * zeta);

      // Unit ramp response R(t) = L^-1{ 1 / [s^2 (s^2 + 2 zeta omegaN s + omegaN^2)] }
      const rampResp = tau => {
        if (tau <= 0) return 0;
        const decay = Math.exp(-zeta * omegaN * tau);
        const phi = Math.atan2(2.0 * zeta * Math.sqrt(1.0 - zeta * zeta), 2.0 * zeta * zeta - 1.0);
        const stPart = tau / (omegaN * omegaN) - (2.0 * zeta) / (omegaN * omegaN * omegaN);
        const oscPart = (decay / (omegaN * omegaN * omegaD)) * Math.sin(omegaD * tau + phi);
        return (stPart + oscPart) / m;
      };

      // f(t) = (F0 / t1) [ t - (t - t1) H(t - t1) ]
      const slope = F0 / t1;
      let total = slope * rampResp(t);
      let secondary = 0;
      if (t >= t1) {
        secondary = -slope * rampResp(t - t1);
        total += secondary;
      }
      return { total, primary: slope * rampResp(t), secondary };
    }

    case 'sdof-harmonic-pulse': {
      // Half-sine pulse blast: f(t) = F0 sin(pi t / t0) [H(t) - H(t - t0)]
      const m = params.m ?? 1.0;
      const k = params.k ?? 9.0;
      const omegaN = Math.sqrt(k / m); // e.g. 3.0 rad/s
      const F0 = params.F0 ?? 5.0;
      const t0 = params.t0 ?? 1.0;
      const omegaP = Math.PI / t0; // pulse frequency

      // Response for undamped oscillator: L^-1{ omegaP / [(s^2 + omegaP^2)(s^2 + omegaN^2)] }
      // = [1 / (omegaN^2 - omegaP^2)] [ (omegaP / omegaN) sin(omegaN t) - sin(omegaP t) ]
      const g = tau => {
        if (tau <= 0) return 0;
        const denom = m * (omegaN * omegaN - omegaP * omegaP);
        return (F0 / denom) * ((omegaP / omegaN) * Math.sin(omegaN * tau) - Math.sin(omegaP * tau));
      };

      const primary = g(t);
      let secondary = 0;
      if (t >= t0) {
        // Delayed second half of sine: sin(pi (t - t0) / t0 + pi) = -sin(pi (t - t0) / t0)
        secondary = g(t - t0);
      }
      const total = t < t0 ? primary : primary + secondary;
      return { total, primary, secondary };
    }

    case 'rlc-periodic-square': {
      // Series RLC circuit excited by square wave v(t) of period T0 and amplitude V0
      // L q'' + R q' + (1/C) q = v(t), current i(t) = q'(t)
      const R = params.R ?? 2.0;
      const L = params.L ?? 1.0;
      const C = params.C ?? 0.2; // 1/C = 5.0
      const V0 = params.V0 ?? 12.0;
      const T0 = params.T0 ?? 4.0;
      const halfT = 0.5 * T0;

      // Characteristic equation: s^2 + (R/L)s + 1/(LC) = 0
      const alpha = R / (2.0 * L); // 1.0
      const omega0Sq = 1.0 / (L * C); // 5.0
      const omegaD = Math.sqrt(Math.max(0.01, omega0Sq - alpha * alpha)); // sqrt(4) = 2.0

      // Step response of charge q_step(t): L^-1{ 1 / [s (L s^2 + R s + 1/C)] }
      // = C [ 1 - e^(-alpha t) (cos(omegaD t) + (alpha/omegaD) sin(omegaD t)) ]
      const qStep = tau => {
        if (tau <= 0) return 0;
        const bracket = 1.0 - Math.exp(-alpha * tau) * (Math.cos(omegaD * tau) + (alpha / omegaD) * Math.sin(omegaD * tau));
        return V0 * C * bracket;
      };

      // Current step response: i_step(t) = dq/dt = (V0 / (L omegaD)) e^(-alpha t) sin(omegaD t)
      const iStep = tau => {
        if (tau <= 0) return 0;
        return (V0 / (L * omegaD)) * Math.exp(-alpha * tau) * Math.sin(omegaD * tau);
      };

      // Sum periodic square pulses over first 3 periods
      let totalI = 0;
      for (let k = 0; k < 6; k++) {
        const switchTime = k * halfT;
        if (t >= switchTime) {
          const sign = (k % 2 === 0) ? 1.0 : -1.0;
          totalI += sign * 2.0 * iStep(t - switchTime);
          if (k === 0) totalI -= iStep(t); // initial step
        }
      }

      const qTotal = qStep(t);
      return { total: totalI, primary: qTotal, secondary: iStep(t) };
    }

    case 'rlc-step-resonance': {
      // Underdamped step response with high Q ringing
      const R = params.R ?? 0.5;
      const L = params.L ?? 1.0;
      const C = params.C ?? 0.1;
      const V0 = params.V0 ?? 10.0;

      const alpha = R / (2.0 * L);
      const omega0 = Math.sqrt(1.0 / (L * C));
      const omegaD = Math.sqrt(omega0 * omega0 - alpha * alpha);

      const vCap = V0 * (1.0 - Math.exp(-alpha * t) * (Math.cos(omegaD * t) + (alpha / omegaD) * Math.sin(omegaD * t)));
      const iCirc = (V0 / (L * omegaD)) * Math.exp(-alpha * t) * Math.sin(omegaD * t);

      return { total: vCap, primary: vCap, secondary: iCirc };
    }

    case 'beam-elastic-point': {
      // Beam on elastic foundation under point load: EI y''''(x) + k y(x) = P0 delta(x - a)
      // beta = (k / 4EI)^(1/4)
      const x = t; // spatial coordinate x
      const a = params.a ?? 2.0;
      const beta = params.beta ?? 1.0;
      const P0 = params.P0 ?? 10.0;
      const k = params.k ?? 4.0; // foundation stiffness

      // Semi-infinite / infinite beam deflection:
      // y(x) = (P0 beta / 2k) e^(-beta |x - a|) [ cos(beta |x - a|) + sin(beta |x - a|) ]
      const xi = Math.abs(x - a);
      const decay = Math.exp(-beta * xi);
      const total = (P0 * beta / (2.0 * k)) * decay * (Math.cos(beta * xi) + Math.sin(beta * xi));
      const primary = total;
      const secondary = decay;

      return { total, primary, secondary };
    }

    default:
      throw new RangeError(`Unknown application family: ${family}`);
  }
}

/**
 * Metric summary describing application engineering parameters.
 */
export function laplaceAppMetrics(family, params = {}) {
  let equation = '';
  let transferFunc = '';
  let physicalRole = '';
  let resonanceNote = '';

  switch (family) {
    case 'sdof-vibration-ramp':
      equation = 'm x\'\' + c x\' + k x = f_ramp(t)';
      transferFunc = 'H(s) = 1 / [m s² + c s + k]';
      physicalRole = 'Deprem veya rampa yüklemesi altındaki tek serbestlik dereceli bina modeli.';
      resonanceNote = 'Yükleme süresi t₁ doğal periyoda yaklaştığında dinamik büyütme katsayısı maksimuma ulaşır.';
      break;
    case 'sdof-harmonic-pulse':
      equation = 'm x\'\' + k x = F₀ sin(π t / t₀) [H(t) − H(t − t₀)]';
      transferFunc = 'H(s) = 1 / [m (s² + ω_n²)]';
      physicalRole = 'Patlama veya şok dalgası (blast wave) altındaki sönümsüz koruma yapısı.';
      resonanceNote = 'Darbe süresi t₀ / T_n oranına bağlı olarak pik yer değiştirme statik yükün 2 katına çıkabilir.';
      break;
    case 'rlc-periodic-square':
      equation = 'L q\'\' + R q\' + (1/C) q = v_square(t)';
      transferFunc = 'I(s) = s V(s) / [L s² + R s + 1/C]';
      physicalRole = 'Anahtarlamalı güç kaynakları ve periyodik darbe üreten elektronik devreler.';
      resonanceNote = 'Kare dalganın Fourier harmonikleri RLC doğal frekansıyla çakıştığında rezonant çınlama (ringing) oluşur.';
      break;
    case 'rlc-step-resonance':
      equation = 'L i\'\' + R i\' + (1/C) i = 0, v_c(0) = 0';
      transferFunc = 'V_c(s) = V₀ / [s (L C s² + R C s + 1)]';
      physicalRole = 'Kapasitör şarj rejiminde gerilim aşımı (overshoot) ve rezonans osilasyonu.';
      resonanceNote = 'Düşük R değeri kalite faktörü Q\'yu yükseltir ve gerilimin 2 V₀ seviyesine fırlamasına neden olur.';
      break;
    case 'beam-elastic-point':
      equation = 'EI y⁽⁴⁾(x) + k y(x) = P₀ δ(x − a)';
      transferFunc = 'Y(s) = P₀ e^{-as} / [EI s⁴ + k]';
      physicalRole = 'Demiryolu rayı, otoyol kaplaması veya zemin üstündeki sürekli temel kirişi.';
      resonanceNote = 'Karakteristik sönüm dalgaboyu λ = π/β olup noktasal yük etkisi hızla sönümlenir.';
      break;
  }

  return { equation, transferFunc, physicalRole, resonanceNote };
}

/**
 * Generate time-domain series for workbench visualization.
 */
export function laplaceAppCurves(family, params = {}, tMax = 8.0, numPoints = 150) {
  if (tMax <= 0) throw new RangeError('tMax must be positive');
  const dt = tMax / (numPoints - 1);
  const responseCurve = [];
  const primaryCurve = [];
  const secondaryCurve = [];

  for (let i = 0; i < numPoints; i++) {
    const t = i * dt;
    const { total, primary, secondary } = laplaceAppExact(family, t, params);
    responseCurve.push({ t, value: total });
    primaryCurve.push({ t, value: primary });
    secondaryCurve.push({ t, value: secondary });
  }

  return { responseCurve, primaryCurve, secondaryCurve };
}

/**
 * Dynamic Magnification Factor (DMF) or Frequency response curve |H(i omega)|.
 */
export function laplaceAppFrequencyResponse(family, params = {}, omegaMax = 6.0, numPoints = 100) {
  const dOmega = omegaMax / (numPoints - 1);
  const freqPoints = [];

  const m = params.m ?? 1.0;
  const k = params.k ?? 4.0;
  const c = params.c ?? 0.8;
  const omegaN = Math.sqrt(k / m);
  const zeta = c / (2.0 * Math.sqrt(m * k));

  for (let i = 0; i < numPoints; i++) {
    const omega = i * dOmega;
    const r = omega / omegaN; // frequency ratio
    // DMF = 1 / sqrt( (1 - r^2)^2 + (2 zeta r)^2 )
    const denom = Math.sqrt(Math.pow(1.0 - r * r, 2) + Math.pow(2.0 * zeta * r, 2));
    const dmf = 1.0 / Math.max(1e-4, denom);
    freqPoints.push({ omega, dmf, ratio: r });
  }

  return freqPoints;
}
