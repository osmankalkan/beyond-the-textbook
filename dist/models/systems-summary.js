/**
 * Chapter 7 Summary & Decision Engine Model (§7.5)
 * Catalog of Chapter 7 methods (Operator, Laplace, Matrix),
 * 10 diagnostic challenge cards, and classification evaluation engine.
 */

export const SYSTEMS_METHODS = [
  {
    id: 'operator-elimination',
    badge: '§7.2',
    category: 'operator',
    name: {
      tr: '1. Operatörle Yok Etme ve Karakteristik Derece N',
      en: '1. Operator Elimination & Characteristic Order N'
    },
    formula: 'φ(D) = det[φᵢⱼ(D)],  φ(D)xᵢ = 0  (N = deg φ)'
  },
  {
    id: 'operator-cramer',
    badge: '§7.2',
    category: 'operator',
    name: {
      tr: '2. Operatörlü Cramer Kuralı ve Ters Operatör',
      en: '2. Operator Cramer Rule & Inverse Operator'
    },
    formula: 'xᵢₚ(t) = [1 / φ(D)] Δᵢ(t)'
  },
  {
    id: 'operator-undetermined',
    badge: '§7.2',
    category: 'operator',
    name: {
      tr: '3. Operatörde Üstel Kaydırma ve Rezonans',
      en: '3. Operator Exponential Shifting & Resonance'
    },
    formula: '[1 / P(D)][e^{αt} v] = e^{αt}[1 / P(D+α)][v]'
  },
  {
    id: 'laplace-algebraic',
    badge: '§7.3',
    category: 'laplace',
    name: {
      tr: '4. Laplace ile Doğrudan Cebirsel Sistem',
      en: '4. Direct Algebraic System via Laplace'
    },
    formula: 'Φ(s) X(s) = F(s) + I₀'
  },
  {
    id: 'laplace-piecewise',
    badge: '§7.3',
    category: 'laplace',
    name: {
      tr: '5. Laplace ile Heaviside Basamak ve Darbe Tepkisi',
      en: '5. Laplace for Heaviside Step & Pulse Inputs'
    },
    formula: 'ℒ{f(t − a) H(t − a)} = e^{−as} F(s)'
  },
  {
    id: 'laplace-impulse',
    badge: '§7.3',
    category: 'laplace',
    name: {
      tr: '6. Laplace ile Dirac Delta Şok Tepkisi',
      en: '6. Laplace for Dirac Delta Shock Impulses'
    },
    formula: 'ℒ{δ(t − a)} = e^{−as}'
  },
  {
    id: 'matrix-distinct',
    badge: '§7.4',
    category: 'matrix',
    name: {
      tr: '7. Matris Yöntemi: Farklı Gerçel Özdeğerler',
      en: '7. Matrix Method: Distinct Real Eigenvalues'
    },
    formula: 'x_H(t) = ∑ Cₖ e^{λₖ t} vₖ'
  },
  {
    id: 'matrix-complex',
    badge: '§7.4',
    category: 'matrix',
    name: {
      tr: '8. Matris Yöntemi: Karmaşık Eşlenik ve Odak Faz Portresi',
      en: '8. Matrix Method: Complex Conjugate & Spiral Focus'
    },
    formula: 'λ = α ± iβ ⇒ e^{αt}(a cos βt ± b sin βt)'
  },
  {
    id: 'matrix-defective',
    badge: '§7.4',
    category: 'matrix',
    name: {
      tr: '9. Matris Yöntemi: Katlı Dejenere Kök ve Genelleştirilmiş Zincir',
      en: '9. Matrix Method: Defective Eigenvalue & Generalized Chain'
    },
    formula: '(A − λI)v₂ = v₁ ⇒ e^{λt}(t v₁ + v₂)'
  },
  {
    id: 'matrix-variation',
    badge: '§7.4',
    category: 'matrix',
    name: {
      tr: '10. Matris Yöntemi: Temel Matris ve Parametrelerin Değişimi',
      en: '10. Matrix Method: Fundamental Matrix & Variation of Parameters'
    },
    formula: 'x_P(t) = X(t) ∫ X⁻¹(t) f(t) dt'
  }
];

export const COMPARISON_MATRIX = [
  {
    dimension: {
      tr: 'Matematiksel Doğası',
      en: 'Mathematical Nature'
    },
    operator: {
      tr: 'Diferansiyel D operatörü ile skaler yüksek mertebeli denklemlere indirgeme.',
      en: 'Differential D-operator reduction to higher-order scalar ODEs.'
    },
    laplace: {
      tr: 's frekans düzleminde doğrudan cebirsel doğrusal denklem sistemi.',
      en: 'Direct algebraic linear system in the complex frequency s-plane.'
    },
    matrix: {
      tr: 'n boyutlu durum uzayında birinci mertebe vektör-matris diferansiyel sistemi.',
      en: 'First-order vector-matrix differential system in n-dimensional state space.'
    }
  },
  {
    dimension: {
      tr: 'Başlangıç Koşulları (IVP)',
      en: 'Initial Conditions (IVP)'
    },
    operator: {
      tr: 'Genel çözümden sonra; denklemde türev alıp fazla sabitleri eleme gerektirir.',
      en: 'Applied after general solution; requires eliminating excess dependent constants.'
    },
    laplace: {
      tr: 'Dönüşümün ilk adımında kendiliğinden sisteme gömülür; ek işlem gerekmez.',
      en: 'Directly embedded in the first transformation step; no extra elimination needed.'
    },
    matrix: {
      tr: 'X(t) temel matris tersi ile tek matris-vektör çarpımı: x(t) = X(t)X⁻¹(t₀)x₀.',
      en: 'Single matrix-vector multiplication with fundamental matrix: x(t) = X(t)X⁻¹(t₀)x₀.'
    }
  },
  {
    dimension: {
      tr: 'Süreksiz ve Darbeli Girişler',
      en: 'Discontinuous & Pulse Inputs'
    },
    operator: {
      tr: 'Uygun değildir; parça parça çözüp aralık sınırlarında dikiş zorunludur.',
      en: 'Inefficient; requires piecewise solution with boundary value stitching.'
    },
    laplace: {
      tr: 'En güçlü olduğu alan; Heaviside H(t−a) ve Dirac δ(t−a) doğrudan çözülür.',
      en: 'Supreme advantage; handles Heaviside H(t−a) and Dirac δ(t−a) in one shot.'
    },
    matrix: {
      tr: 'Parçalı integrasyon veya Laplace-matris hibriti gerektirir.',
      en: 'Requires piecewise integration or matrix-exponential convolution.'
    }
  },
  {
    dimension: {
      tr: 'Çok Boyutlu Sistemler (MDOF)',
      en: 'High-Dimensional Systems (MDOF)'
    },
    operator: {
      tr: 'n ≥ 3 için determinant açılımı ve sabit eleme aşırı hantal hale gelir.',
      en: 'Becomes unwieldy for n ≥ 3 due to high-order determinant expansions.'
    },
    laplace: {
      tr: 'Büyük sistemlerde ters Laplace kısmi kesir açılımları zorlaşır.',
      en: 'Partial fractions become cumbersome for high-order polynomials.'
    },
    matrix: {
      tr: 'Sistematik ve bilgisayara uygundur; modal ayrışma ve özvektörlerle genelleşir.',
      en: 'Systematic and computational; decouples naturally via modal eigenvectors.'
    }
  },
  {
    dimension: {
      tr: 'En Büyük Tehlike / Tuzak',
      en: 'Critical Pitfall / Trap'
    },
    operator: {
      tr: 'Bağımsız sabit sayısını N = deg φ(D) yerine 2N alıp bağımlı sabitleri elemeyi unutmak.',
      en: 'Assuming 2N free constants instead of N = deg φ(D), omitting constant elimination.'
    },
    laplace: {
      tr: 'sX(s) − x(0) dönüşümünde eksi işaretlerini veya Cramer pay determinantını yanlış kurmak.',
      en: 'Losing minus signs in sX(s) − x(0) or misconfiguring Cramer numerator determinants.'
    },
    matrix: {
      tr: 'Katlı özdeğerlerde rank düşüklüğünü fark etmeyip eksik özvektörle çözüm kurmak.',
      en: 'Missing algebraic multiplicity rank deficiency and failing to construct generalized chains.'
    }
  }
];

export const CHALLENGE_CARDS = [
  {
    id: 'card-1-harmonic-2dof',
    title: {
      tr: 'Kart 1: Serbest Harmonik Kuple Osilatör',
      en: 'Card 1: Free Harmonic Coupled Oscillator'
    },
    equation: "(D² + 4)x − 2y = 0,   −2x + (D² + 4)y = 0",
    latex: "(D^2 + 4)x - 2y = 0, \\quad -2x + (D^2 + 4)y = 0",
    description: {
      tr: 'Başlangıç koşulu verilmeyen, homojen, ikinci dereceden simetrik kuple sistem.',
      en: 'Unforced symmetric coupled 2nd-order system without initial conditions.'
    },
    optimalMethodId: 'operator-elimination',
    justification: {
      tr: 'Determinant φ(D) = (D² + 4)² − 4 = (D² + 2)(D² + 6) hemen çarpanlara ayrılır; N = 4 serbest sabit doğrudan belirlenir.',
      en: 'The determinant φ(D) = (D² + 4)² − 4 factors immediately into (D² + 2)(D² + 6), giving N = 4 frequencies cleanly.'
    }
  },
  {
    id: 'card-2-cramer-forcing',
    title: {
      tr: 'Kart 2: Polinom ve Üstel Zorlama Altında Operatör Çözümü',
      en: 'Card 2: Operator Solution with Polynomial & Exponential Forcing'
    },
    equation: "(D + 2)x + Dy = t,   (D − 1)x + (D + 1)y = e⁻²ᵗ",
    latex: "(D + 2)x + Dy = t, \\quad (D - 1)x + (D + 1)y = e^{-2t}",
    description: {
      tr: 'Sağ tarafında polinom ve üstel terimler bulunan genel mertebeli diferansiyel sistem.',
      en: 'Linear differential system with mixed polynomial and exponential forcing terms.'
    },
    optimalMethodId: 'operator-cramer',
    justification: {
      tr: 'Operatörlü Cramer kuralında türevler fonksiyonlardan önce işletilerek özel çözümler ters operatörle tek adımda bulunur.',
      en: 'Operator Cramer rule with inverse operator evaluates particular terms cleanly while maintaining operator precedence.'
    }
  },
  {
    id: 'card-3-discontinuous-pulse',
    title: {
      tr: 'Kart 3: Sonlu Dikdörtgen Darbe ile Sürülen Sistem',
      en: 'Card 3: System Driven by a Finite Rectangular Pulse'
    },
    equation: "ẋ + 2x − y = H(t − 1) − H(t − 3),   ẏ + x + 2y = 0   [x(0)=0, y(0)=0]",
    latex: "\\dot{x} + 2x - y = H(t-1) - H(t-3), \\quad \\dot{y} + x + 2y = 0, \\quad x(0)=0, y(0)=0",
    description: {
      tr: 'Zaman ekseninde parçalı basamak (gate) girdisi ve sıfır başlangıç koşulları.',
      en: 'Piecewise gate pulse excitation with zero initial state conditions.'
    },
    optimalMethodId: 'laplace-piecewise',
    justification: {
      tr: 'Heaviside adımları frekans bölgesinde e^{-s} - e^{-3s} cebirsel çarpanına dönüşür; aralık dikişi gerekmeksizin tek formülle çözülür.',
      en: 'Heaviside pulses transform algebraically to e^{-s} - e^{-3s}; avoids boundary stitching across intervals.'
    }
  },
  {
    id: 'card-4-dirac-shock',
    title: {
      tr: 'Kart 4: Ani Çekiç Darbesi (Sonsuz Tepe İtkisi)',
      en: 'Card 4: Instantaneous Hammer Impact (Dirac Delta)'
    },
    equation: "ẍ₁ + 9x₁ − 3x₂ = 5δ(t − 2),   ẍ₂ − 3x₁ + 9x₂ = 0",
    latex: "\\ddot{x}_1 + 9x_1 - 3x_2 = 5\\delta(t - 2), \\quad \\ddot{x}_2 - 3x_1 + 9x_2 = 0",
    description: {
      tr: 't = 2 anında uygulanan ani Dirac delta darbesi altındaki kuple iki kütleli model.',
      en: 'Coupled two-mass model subjected to an impulsive Dirac delta strike at t = 2.'
    },
    optimalMethodId: 'laplace-impulse',
    justification: {
      tr: 'Dirac delta doğrudan 5 e^{-2s} cebirsel terimine dönüşür; hız sıçraması türev teoremiyle doğal olarak elde edilir.',
      en: 'The delta transforms cleanly to 5 e^{-2s}; velocity jump is automatically handled by the s-domain transform.'
    }
  },
  {
    id: 'card-5-ivp-direct',
    title: {
      tr: 'Kart 5: Sıfır Olmayan Başlangıç Koşullu 2×2 Sistem',
      en: 'Card 5: 2×2 Initial Value Problem with Non-Zero State'
    },
    equation: "ẋ = 2x − y,   ẏ = 3x − 2y   [x(0) = 1, y(0) = 2]",
    latex: "\\dot{x} = 2x - y, \\quad \\dot{y} = 3x - 2y, \\quad x(0) = 1, \\; y(0) = 2",
    description: {
      tr: 'Başlangıç değerleri verilmiş homojen birinci mertebe sistem.',
      en: 'Homogeneous first-order system with prescribed initial conditions.'
    },
    optimalMethodId: 'laplace-algebraic',
    justification: {
      tr: 'Laplace dönüşümü başlangıç değerlerini doğrudan sağ tarafa ekler: (s - 2)X + Y = 1; sabit belirleme adımı tamamen ortadan kalkar.',
      en: 'Laplace transform absorbs initial data directly into right-hand algebraic terms, eliminating separate constant determination.'
    }
  },
  {
    id: 'card-6-state-space-distinct',
    title: {
      tr: 'Kart 6: Ayrık Gerçel Özdeğerli Durum Matrisi ve Eyer Noktası',
      en: 'Card 6: State Matrix with Distinct Real Eigenvalues (Saddle Point)'
    },
    equation: "ẋ = [ 1  4;  1 −2 ] x   (λ₁ = −3, λ₂ = 2)",
    latex: "\\mathbf{\\dot{x}} = \\begin{bmatrix} 1 & 4 \\\\ 1 & -2 \\end{bmatrix} \\mathbf{x}",
    description: {
      tr: 'Karakteristik polinomu (λ + 3)(λ − 2) = 0 olan iki boyutlu otonom sistem.',
      en: 'Two-dimensional autonomous system with characteristic polynomial (λ + 3)(λ − 2) = 0.'
    },
    optimalMethodId: 'matrix-distinct',
    justification: {
      tr: 'Özdeğerler λ₁ = -3, λ₂ = 2 ve özvektörler v₁ = [1, -1]ᵀ, v₂ = [4, 1]ᵀ ile faz portresi ve invariant manifoldlar hemen çizilir.',
      en: 'Eigenvalues λ₁ = -3, λ₂ = 2 and eigenvectors yield exact invariant manifolds and saddle topology without scalar elimination.'
    }
  },
  {
    id: 'card-7-complex-spiral',
    title: {
      tr: 'Kart 7: Sönümlü Kararlı Sarmal Odak (Spiral Sink)',
      en: 'Card 7: Damped Stable Spiral Focus (Spiral Sink)'
    },
    equation: "ẋ = [ −1 −2;  2 −1 ] x   (λ = −1 ± 2i)",
    latex: "\\mathbf{\\dot{x}} = \\begin{bmatrix} -1 & -2 \\\\ 2 & -1 \\end{bmatrix} \\mathbf{x}",
    description: {
      tr: 'Özdeğerleri karmaşık eşlenik λ = -1 ± 2i olan kararlı odak yörüngesi.',
      en: 'Stable spiral focus with complex conjugate eigenvalues λ = -1 ± 2i.'
    },
    optimalMethodId: 'matrix-complex',
    justification: {
      tr: 'Özvektörün gerçel ve sanal kısımları e^{-t}(Re(v) cos 2t - Im(v) sin 2t) biçiminde dönme matrisini doğrudan kurar.',
      en: 'Real and imaginary eigenvector components directly construct the rotational matrix trajectory without trigonometry expansions.'
    }
  },
  {
    id: 'card-8-defective-chain',
    title: {
      tr: 'Kart 8: Katlı Kök ve Eksik Özvektör (Jordan Zinciri)',
      en: 'Card 8: Repeated Defective Eigenvalue (Jordan Chain)'
    },
    equation: "ẋ = [ 3  1;  0  3 ] x   (λ = 3, katlı kök)",
    latex: "\\mathbf{\\dot{x}} = \\begin{bmatrix} 3 & 1 \\\\ 0 & 3 \\end{bmatrix} \\mathbf{x}",
    description: {
      tr: 'λ = 3 çift katlı köküne karşılık tek bağımsız özvektörü olan dejenere matris.',
      en: 'Defective matrix with double root λ = 3 having only one independent eigenvector.'
    },
    optimalMethodId: 'matrix-defective',
    justification: {
      tr: '(A − 3I)v₂ = v₁ genelleştirilmiş özvektör zinciri ile ikinci bağımsız çözüm e^{3t}(t v₁ + v₂) formülüyle elde edilir.',
      en: 'The generalized eigenvector chain (A − 3I)v₂ = v₁ produces the second linearly independent mode via e^{3t}(t v₁ + v₂).'
    }
  },
  {
    id: 'card-9-trig-variation',
    title: {
      tr: 'Kart 9: Trigonometrik Forlamalı Sistemin Temel Matrisle Çözümü',
      en: 'Card 9: Fundamental Matrix Variation of Parameters for Trig Forcing'
    },
    equation: "ẋ = [ 0  1; −1  0 ] x + [ 0; sec t ]",
    latex: "\\mathbf{\\dot{x}} = \\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix} \\mathbf{x} + \\begin{bmatrix} 0 \\\\ \\sec t \\end{bmatrix}",
    description: {
      tr: 'Belirsiz katsayılar yönteminin yetersiz kaldığı standart dışı sec(t) zorlaması.',
      en: 'Non-standard sec(t) excitation where undetermined coefficients fails.'
    },
    optimalMethodId: 'matrix-variation',
    justification: {
      tr: 'Temel matris X(t) tersi alınarak X(t) ∫ X⁻¹(t) f(t) dt integrali doğrudan hesaplanır; ln|cos t| çözümü sistematik olarak çıkar.',
      en: 'Inverting fundamental matrix X(t) enables direct evaluation of ∫ X⁻¹(t) f(t) dt, capturing the exact ln|cos t| particular response.'
    }
  },
  {
    id: 'card-10-mdof-vibration',
    title: {
      tr: 'Kart 10: İki Katlı Kesme Binası Modal Ayrışması',
      en: 'Card 10: Two-Story Shear Building Modal Decoupling'
    },
    equation: "M ẍ + K x = 0,   M = diag(m₁, m₂),  K = [k₁+k₂ −k₂; −k₂ k₂]",
    latex: "\\mathbf{M}\\mathbf{\\ddot{x}} + \\mathbf{K}\\mathbf{x} = \\mathbf{0}, \\quad \\mathbf{M}=\\text{diag}(m_1, m_2)",
    description: {
      tr: 'Çok serbestlik dereceli yapı dinamiğinde doğal frekanslar ve mod şekilleri.',
      en: 'Natural frequencies and mode shapes in multiple degree-of-freedom structural dynamics.'
    },
    optimalMethodId: 'matrix-distinct',
    justification: {
      tr: 'K - ω²M genelleştirilmiş özdeğer problemi mod matrisi Φ ile sistemi bağımsız tek serbestlik dereceli osilatörlere ayrıştırır.',
      en: 'Generalized eigenvalue problem K - ω²M decouples the system into independent SDOF oscillators via modal matrix Φ.'
    }
  }
];

export function systemsSummaryMethods() {
  return [...SYSTEMS_METHODS];
}

export function systemsChallengeCards() {
  return [...CHALLENGE_CARDS];
}

export function systemsComparisonMatrix() {
  return [...COMPARISON_MATRIX];
}

/**
 * Evaluates the user's method selection for a challenge card.
 */
export function evaluateSystemsDiagnostic(cardId, selectedMethodId) {
  const card = CHALLENGE_CARDS.find(c => c.id === cardId);
  if (!card) throw new RangeError(`Unknown challenge card: ${cardId}`);

  const isOptimal = card.optimalMethodId === selectedMethodId;
  const method = SYSTEMS_METHODS.find(m => m.id === selectedMethodId);

  return {
    isOptimal,
    cardId,
    selectedMethodId,
    optimalMethodId: card.optimalMethodId,
    feedback: isOptimal
      ? {
          tr: `Tebrikler! Doğru ve en verimli yöntem seçildi. ${card.justification.tr}`,
          en: `Bravo! The optimal method was chosen. ${card.justification.en}`
        }
      : {
          tr: `Bu problem için en ideal yöntem "${card.optimalMethodId}" yaklaşımıdır. Gerekçe: ${card.justification.tr}`,
          en: `The optimal approach for this problem is "${card.optimalMethodId}". Rationale: ${card.justification.en}`
        }
  };
}
