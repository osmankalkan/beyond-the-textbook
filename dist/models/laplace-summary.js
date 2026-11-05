/**
 * Chapter 6 Summary & Method Navigator Model (§6.7)
 * Catalog of 10 Laplace methods, 10 diagnostic challenge cards, and classification engine.
 */

export const LAPLACE_METHODS = [
  {
    id: 'laplace-table',
    badge: '§6.1',
    category: 'forward',
    name: {
      tr: '1. Temel Dönüşüm Çiftleri ve Doğrusallık',
      en: '1. Elementary Transform Pairs & Linearity'
    },
    formula: 'ℒ{c₁ f₁ + c₂ f₂} = c₁ F₁ + c₂ F₂'
  },
  {
    id: 'first-shift',
    badge: '§6.1',
    category: 'forward',
    name: {
      tr: '2. Birinci Frekans Kaydırma Teoremi',
      en: '2. First Frequency Shifting Theorem'
    },
    formula: 'ℒ{e^{at} f(t)} = F(s − a)'
  },
  {
    id: 'freq-derivative',
    badge: '§6.1',
    category: 'forward',
    name: {
      tr: '3. Frekans Bölgesinde Türetim Kuralı',
      en: '3. Frequency Differentiation Rule'
    },
    formula: 'ℒ{t^n f(t)} = (−1)^n F^{(n)}(s)'
  },
  {
    id: 'heaviside-second-shift',
    badge: '§6.2',
    category: 'forward',
    name: {
      tr: '4. Heaviside Basamağı ve 2. Kaydırma Teoremi',
      en: '4. Heaviside Step & 2nd Shifting Theorem'
    },
    formula: 'ℒ{f(t − a) H(t − a)} = e^{−as} F(s)'
  },
  {
    id: 'dirac-sifting',
    badge: '§6.3',
    category: 'forward',
    name: {
      tr: '5. Dirac Delta ve Süzme (Sifting) İlkesi',
      en: '5. Dirac Delta & Sifting Property'
    },
    formula: '∫ g(t) δ(t − a) dt = g(a), ℒ{δ(t − a)} = e^{−as}'
  },
  {
    id: 'partial-fractions',
    badge: '§6.4',
    category: 'inverse',
    name: {
      tr: '6. Basit Kesirlere Ayırma ve Kapatma Yöntemi',
      en: '6. Partial Fractions & Heaviside Cover-Up'
    },
    formula: 'N(s)/D(s) = A/(s − r₁) + (Bs + C)/((s − α)² + β²)'
  },
  {
    id: 'convolution-theorem',
    badge: '§6.4',
    category: 'inverse',
    name: {
      tr: '7. Konvolüsyon İntegrali Teoremi',
      en: '7. Convolution Integral Theorem'
    },
    formula: 'ℒ⁻¹{F(s) G(s)} = (f ∗ g)(t) = ∫₀ᵗ f(u) g(t − u) du'
  },
  {
    id: 'ivp-algebraic',
    badge: '§6.5',
    category: 'ode',
    name: {
      tr: '8. Türev Dönüşümleri ile Doğrudan IVP Çözümü',
      en: '8. Direct IVP Solution via Derivative Transforms'
    },
    formula: 'ℒ{y\'\'} = s² Y(s) − s y(0) − y\'(0)'
  },
  {
    id: 'delayed-polynomial',
    badge: '§6.5',
    category: 'ode',
    name: {
      tr: '9. Gecikmeli Polinom ve Taylor Açılımı',
      en: '9. Delayed Polynomial & Taylor Expansion'
    },
    formula: 'P(t) H(t − a) = P((t − a) + a) H(t − a)'
  },
  {
    id: 'periodic-transform',
    badge: '§6.6',
    category: 'application',
    name: {
      tr: '10. Periyodik Sinyaller ve Sistem Uygulamaları',
      en: '10. Periodic Signals & System Applications'
    },
    formula: 'ℒ{f_per(t)} = [1 / (1 − e^{−sT})] ∫₀ᵀ e^{−st} f(t) dt'
  }
];

export const CHALLENGE_CARDS = [
  {
    id: 'card-1-modulated-exp',
    title: {
      tr: 'Kart 1: e^{3t} sin 4t Dönüşümü',
      en: 'Card 1: e^{3t} sin 4t Transform'
    },
    latex: '\\mathcal{L}\\{e^{3t} \\sin 4t\\}',
    description: {
      tr: 'Üstel çarpanla modüle edilmiş sinüzoidal dalganın Laplace dönüşümü.',
      en: 'Laplace transform of an exponential-modulated sinusoidal wave.'
    },
    optimalMethodId: 'first-shift',
    justification: {
      tr: 'L{sin 4t} = 4/(s² + 16) temel çiftine 1. kaydırma teoremi s → s − 3 uygulanır; sonuç 4 / [(s − 3)² + 16] olur.',
      en: 'Apply the 1st shifting theorem s → s − 3 to L{sin 4t} = 4/(s² + 16), yielding 4 / [(s − 3)² + 16].'
    }
  },
  {
    id: 'card-2-delayed-quad',
    title: {
      tr: 'Kart 2: (t² − 4) H(t − 2) Basamak Dönüşümü',
      en: 'Card 2: (t² − 4) H(t − 2) Step Transform'
    },
    latex: '\\mathcal{L}\\{(t^2 - 4) H(t - 2)\\}',
    description: {
      tr: 't = 2 anında devreye giren kuadratik polinomun 2. kaydırma ile dönüşümü.',
      en: 'Transforming a quadratic polynomial activated at t = 2 via 2nd shifting.'
    },
    optimalMethodId: 'delayed-polynomial',
    justification: {
      tr: 't² − 4 = [(t − 2) + 2]² − 4 = (t − 2)² + 4(t − 2) Taylor açılımı yapılır; 2. kaydırma ile e^{-2s} [2/s³ + 4/s²] çıkar.',
      en: 'Expand t² − 4 = (t − 2)² + 4(t − 2); the 2nd shifting theorem immediately gives e^{-2s} [2/s³ + 4/s²].'
    }
  },
  {
    id: 'card-3-dirac-sift',
    title: {
      tr: 'Kart 3: Dirac Delta Süzme İntegrali',
      en: 'Card 3: Dirac Delta Sifting Integral'
    },
    latex: '\\int_0^\\infty (3t^2 + 5) \\delta(t - 4) dt',
    description: {
      tr: 'Dirac delta darbesi içeren belirli integralin süzme özelliği ile hesabı.',
      en: 'Evaluating a definite integral with Dirac delta using the sifting property.'
    },
    optimalMethodId: 'dirac-sifting',
    justification: {
      tr: 'Süzme özelliği gereği integral doğrudan g(4) değerini seçer: 3(4)² + 5 = 48 + 5 = 53.',
      en: 'By the sifting property, the integral samples g(4): 3(4)² + 5 = 53 directly.'
    }
  },
  {
    id: 'card-4-repeated-quadratic',
    title: {
      tr: 'Kart 4: s / (s² + 9)² Rezonans Tersi',
      en: 'Card 4: s / (s² + 9)² Resonant Inversion'
    },
    latex: '\\mathcal{L}^{-1}\\left\\{\\frac{s}{(s^2 + 9)^2}\\right\\}',
    description: {
      tr: 'Katlı kuadratik paydaya sahip rezonans kesrinin ters dönüşümü.',
      en: 'Inverse transform of a repeated quadratic denominator signifying resonance.'
    },
    optimalMethodId: 'convolution-theorem',
    justification: {
      tr: 'L^-1{ (1/3) sin 3t * cos 3t } konvolüsyon integrali veya s-türevi ile (1/6) t sin 3t rezonans yanıtı elde edilir.',
      en: 'Convolution (1/3) sin 3t * cos 3t or frequency differentiation produces (1/6) t sin 3t.'
    }
  },
  {
    id: 'card-5-partial-decomp',
    title: {
      tr: 'Kart 5: (2s + 5) / [(s − 1)(s² + 4)] Kesir Ayrışımı',
      en: 'Card 5: (2s + 5) / [(s − 1)(s² + 4)] Inversion'
    },
    latex: '\\mathcal{L}^{-1}\\left\\{\\frac{2s + 5}{(s - 1)(s^2 + 4)}\\right\\}',
    description: {
      tr: 'Reel ve kuadratik karmaşık kutuplar içeren rasyonel transfer fonksiyonu.',
      en: 'Rational transfer function with distinct real and quadratic complex poles.'
    },
    optimalMethodId: 'partial-fractions',
    justification: {
      tr: 'Heaviside kapatma ile A/(s − 1) + (Bs + C)/(s² + 4) ayrışımı yapılır; A = 7/5, B = -7/5, C = 3/5.',
      en: 'Partial fraction decomposition into A/(s − 1) + (Bs + C)/(s² + 4) with A = 7/5 via cover-up.'
    }
  },
  {
    id: 'card-6-damped-ivp',
    title: {
      tr: 'Kart 6: y\'\' + 4y\' + 13y = 0 Başlangıç Değer Problemi',
      en: 'Card 6: y\'\' + 4y\' + 13y = 0 IVP'
    },
    latex: "y'' + 4y' + 13y = 0, \\quad y(0)=2, \\, y'(0)=-4",
    description: {
      tr: 'Sönümlü serbest titreşim IVP probleminin Laplace ile çözümü.',
      en: 'Solving a damped free vibration IVP via Laplace transform.'
    },
    optimalMethodId: 'ivp-algebraic',
    justification: {
      tr: 'Türev kuralları ile (s² + 4s + 13)Y(s) − 2s − 4 = 0 kurulur; Y(s) = 2(s + 2)/[(s + 2)² + 9] → y(t) = 2 e^{-2t} cos 3t.',
      en: 'Derivative transforms yield Y(s) = 2(s + 2)/[(s + 2)² + 9], inverting to 2 e^{-2t} cos 3t.'
    }
  },
  {
    id: 'card-7-step-ivp',
    title: {
      tr: 'Kart 7: y\'\' + 9y = 18 H(t − π) Süreksiz Basamak IVP',
      en: 'Card 7: y\'\' + 9y = 18 H(t − π) Discontinuous Step IVP'
    },
    latex: "y'' + 9y = 18 H(t - \\pi), \\quad y(0)=0, \\, y'(0)=0",
    description: {
      tr: 't = π anında sıçrayan basamak zorlaması altında salınıcı.',
      en: 'Oscillator subjected to a step forcing jump at t = π.'
    },
    optimalMethodId: 'heaviside-second-shift',
    justification: {
      tr: 'Y(s) = 18 e^{-π s} / [s(s² + 9)]; 2. kaydırma ile y(t) = 2[1 − cos(3(t − π))] H(t − π).',
      en: 'Y(s) = 18 e^{-π s} / [s(s² + 9)], which inverts via 2nd shifting to 2[1 − cos(3(t − π))] H(t − π).'
    }
  },
  {
    id: 'card-8-impulse-ivp',
    title: {
      tr: 'Kart 8: y\'\' + 2y\' + y = 6 δ(t − 3) Dirac Darbesi',
      en: 'Card 8: y\'\' + 2y\' + y = 6 δ(t − 3) Dirac Impulse'
    },
    latex: "y'' + 2y' + y = 6 \\delta(t - 3), \\quad y(0)=0, \\, y'(0)=0",
    description: {
      tr: 'Kritik sönümlü sistemin t = 3 anındaki Dirac itkisine tepkisi.',
      en: 'Critically damped system response to a Dirac impulse at t = 3.'
    },
    optimalMethodId: 'dirac-sifting',
    justification: {
      tr: 'Y(s) = 6 e^{-3s} / (s + 1)²; ters dönüşüm doğrudan 6 (t − 3) e^{-(t - 3)} H(t − 3) verir.',
      en: 'Y(s) = 6 e^{-3s} / (s + 1)², which inverts to 6 (t − 3) e^{-(t - 3)} H(t − 3).'
    }
  },
  {
    id: 'card-9-periodic-wave',
    title: {
      tr: 'Kart 9: Periyodik Kare Dalga Laplace Dönüşümü',
      en: 'Card 9: Periodic Square Wave Transform'
    },
    latex: "\\mathcal{L}\\{v_{\\text{square}}(t)\\}, \\quad T = 2",
    description: {
      tr: 'Periyodu T = 2 olan kare dalganın periyodik Laplace formülüyle dönüştürülmesi.',
      en: 'Transforming a square wave of period T = 2 via the periodic Laplace integral.'
    },
    optimalMethodId: 'periodic-transform',
    justification: {
      tr: '[1 / (1 − e^{-2s})] ∫₀¹ V₀ e^{-st} dt = (V₀ / s) / (1 + e^{-s}) periyodik teoremle tek adımda çıkar.',
      en: 'Applying [1 / (1 − e^{-2s})] ∫₀¹ V₀ e^{-st} dt yields (V₀ / s) / (1 + e^{-s}) in a single step.'
    }
  },
  {
    id: 'card-10-sdof-ramp',
    title: {
      tr: 'Kart 10: SDOF Yapı Rampa Yüklemesi',
      en: 'Card 10: SDOF Structure Ramp Loading'
    },
    latex: "m x'' + k x = \\frac{F_0}{t_1}[t - (t - t_1)H(t - t_1)]",
    description: {
      tr: 'Yapı dinamiğinde rampa yükü altındaki tek serbestlik dereceli bina modeli.',
      en: 'SDOF building model under ramp loading in structural dynamics.'
    },
    optimalMethodId: 'periodic-transform',
    justification: {
      tr: 'Mühendislik uygulamalarında rampa çekirdeği t/ω² − sin(ωt)/ω³ basamak farkı ile süperpoze edilir.',
      en: 'In structural engineering, the ramp kernel is superposed with its delayed negative step.'
    }
  }
];

export function laplaceSummaryMethods() {
  return [...LAPLACE_METHODS];
}

export function laplaceChallengeCards() {
  return [...CHALLENGE_CARDS];
}

/**
 * Diagnostic evaluation of a chosen method for a challenge card.
 */
export function evaluateLaplaceDiagnostic(cardId, selectedMethodId) {
  const card = CHALLENGE_CARDS.find(c => c.id === cardId);
  if (!card) throw new RangeError(`Unknown challenge card: ${cardId}`);

  const isOptimal = card.optimalMethodId === selectedMethodId;
  const method = LAPLACE_METHODS.find(m => m.id === selectedMethodId);

  return {
    isOptimal,
    cardId,
    selectedMethodId,
    optimalMethodId: card.optimalMethodId,
    feedback: isOptimal
      ? {
          tr: `Kusursuz eşleşme! ${card.justification.tr}`,
          en: `Perfect match! ${card.justification.en}`
        }
      : {
          tr: `Bu soru için en verimli yol ${card.optimalMethodId} kuralıdır. ${card.justification.tr}`,
          en: `The optimal approach for this problem is ${card.optimalMethodId}. ${card.justification.en}`
        }
  };
}
