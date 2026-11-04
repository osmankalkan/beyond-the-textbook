export const extraQuestions = [
  {
    title: {tr: 'Örnek 4.7: karmaşık köklerin karekökü', en: 'Example 4.7: square roots of complex roots'},
    tag: 'ÖRNEK 4.7 / EXAMPLE 4.7',
    text: {
      tr: '(D⁴ − 16D² + 100)y = 0 denkleminde λ² = 8 ± 6i bulunduktan sonra dört karakteristik kök λ nedir?',
      en: 'In (D⁴ − 16D² + 100)y = 0, after finding λ² = 8 ± 6i, what are the four characteristic roots λ?'
    },
    choices: {
      tr: ['λ = ±3 ± i', 'λ = ±4 ± 3i', 'λ = ±8 ± 6i'],
      en: ['λ = ±3 ± i', 'λ = ±4 ± 3i', 'λ = ±8 ± 6i']
    },
    answer: 0,
    feedback: {
      tr: '(3 + i)² = 9 + 6i + i² = 8 + 6i ve (−3 − i)² = 8 + 6i olduğundan √(8 ± 6i) = ±3 ± i olur. Kutupsal yöntemle r = √(64 + 36) = 10, cos(θ/2) = 3/√10 ve sin(θ/2) = 1/√10 kullanılarak aynı sonuç çıkar.',
      en: 'Since (3 + i)² = 9 + 6i + i² = 8 + 6i, the square roots of 8 ± 6i are λ = ±3 ± i. Using polar form, r = √(64 + 36) = 10, cos(θ/2) = 3/√10 and sin(θ/2) = 1/√10 give the same four roots.'
    },
    hints: {
      tr: ['(3 + i)² ifadesini açarak gerçek ve sanal kısımları kontrol et.', '8 + 6i sayısının modülü r = 10’dur; karekökün modülü √10 olur.'],
      en: ['Expand (3 + i)² and check its real and imaginary parts.', 'The modulus of 8 + 6i is r = 10, so the modulus of its square root is √10.']
    }
  },
  {
    title: {tr: 'Örnek 4.8: çift katlı kök ve mertebe indirgeme', en: 'Example 4.8: double root and reduction of order'},
    tag: 'ÖRNEK 4.8 / EXAMPLE 4.8',
    text: {
      tr: '(D² − 4D + 4)y = 0 denkleminde y = v(x) e²ˣ dönüşümü yapıldığında v(x) hangi indirgenmiş denklemi sağlar?',
      en: 'When substituting y = v(x) e²ˣ into (D² − 4D + 4)y = 0, which reduced equation does v(x) satisfy?'
    },
    choices: {
      tr: ['D²v = 0  ⇒  v(x) = C₀ + C₁x', 'Dv = 0  ⇒  v(x) = C₀', '(D² − 4)v = 0  ⇒  v(x) = C₁ e²ˣ + C₂ e⁻²ˣ'],
      en: ['D²v = 0  ⇒  v(x) = C₀ + C₁x', 'Dv = 0  ⇒  v(x) = C₀', '(D² − 4)v = 0  ⇒  v(x) = C₁ e²ˣ + C₂ e⁻²ˣ']
    },
    answer: 0,
    feedback: {
      tr: '(D − 2)²[v(x) e²ˣ] = e²ˣ D²v = 0 olur. e²ˣ ≠ 0 olduğundan D²v = 0 kalır ve iki integrasyonla v(x) = C₀ + C₁x bulunur; böylece y = (C₀ + C₁x) e²ˣ elde edilir.',
      en: '(D − 2)²[v(x) e²ˣ] = e²ˣ D²v = 0. Since e²ˣ ≠ 0, we get D²v = 0, which integrates twice to v(x) = C₀ + C₁x and gives y = (C₀ + C₁x) e²ˣ.'
    },
    hints: {
      tr: ['Üstel kaydırma özdeşliğini hatırla: (D − a)^p(v e^{ax}) = e^{ax} D^p v.', 'D²v = 0 denklemini iki kez x’e göre entegre et.'],
      en: ['Recall the exponential shift identity: (D − a)^p(v e^{ax}) = e^{ax} D^p v.', 'Integrate D²v = 0 twice with respect to x.']
    }
  },
  {
    title: {tr: 'Örnek 4.10: katlı sıfır ve katlı karmaşık kökler', en: 'Example 4.10: repeated zero and repeated complex roots'},
    tag: 'ÖRNEK 4.10 / EXAMPLE 4.10',
    text: {
      tr: '(D⁸ + 18D⁶ + 81D⁴)y = 0 denkleminin genel çözümü hangisidir?',
      en: 'What is the general solution of (D⁸ + 18D⁶ + 81D⁴)y = 0?'
    },
    choices: {
      tr: [
        'C₀ + C₁x + C₂x² + C₃x³ + (A₀ + A₁x) cos 3x + (B₀ + B₁x) sin 3x',
        'C₀ + A₀ cos 3x + B₀ sin 3x',
        '(C₀ + C₁x + C₂x² + C₃x³) e³ˣ + A cos 3x + B sin 3x'
      ],
      en: [
        'C₀ + C₁x + C₂x² + C₃x³ + (A₀ + A₁x) cos 3x + (B₀ + B₁x) sin 3x',
        'C₀ + A₀ cos 3x + B₀ sin 3x',
        '(C₀ + C₁x + C₂x² + C₃x³) e³ˣ + A cos 3x + B sin 3x'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Karakteristik denklem λ⁴(λ² + 9)² = 0’dır. λ = 0 kökü 4 katlı olduğundan C₀ + C₁x + C₂x² + C₃x³ verir; λ = ±3i çifti 2 katlı olduğundan (A₀ + A₁x) cos 3x + (B₀ + B₁x) sin 3x verir.',
      en: 'The characteristic equation is λ⁴(λ² + 9)² = 0. The 4-fold root λ = 0 gives C₀ + C₁x + C₂x² + C₃x³, and the double pair λ = ±3i gives (A₀ + A₁x) cos 3x + (B₀ + B₁x) sin 3x.'
    },
    hints: {
      tr: ['λ⁴(λ⁴ + 18λ² + 81) = λ⁴(λ² + 9)² çarpanlarına ayır.', '8. mertebe denklemde toplam 8 bağımsız sabit bulunmalıdır.'],
      en: ['Factor as λ⁴(λ⁴ + 18λ² + 81) = λ⁴(λ² + 9)².', 'An 8th-order equation must have 8 independent constants in total.']
    }
  },
  {
    title: {tr: 'Örnek 4.11: yüksek mertebe çarpanlara ayırma', en: 'Example 4.11: high-order factoring'},
    tag: 'ÖRNEK 4.11 / EXAMPLE 4.11',
    text: {
      tr: '(D⁵ − D⁴ − 2D³ + 2D² + D − 1)y = 0 denkleminin karakteristik polinomu nasıl çarpanlara ayrılır ve genel çözümü nedir?',
      en: 'How does the characteristic polynomial of (D⁵ − D⁴ − 2D³ + 2D² + D − 1)y = 0 factor, and what is its general solution?'
    },
    choices: {
      tr: [
        '(λ − 1)³(λ + 1)² = 0  ⇒  y = (C₀ + C₁x + C₂x²) eˣ + (D₀ + D₁x) e⁻ˣ',
        '(λ − 1)²(λ + 1)³ = 0  ⇒  y = (C₀ + C₁x) eˣ + (D₀ + D₁x + D₂x²) e⁻ˣ',
        '(λ − 1)⁴(λ + 1) = 0  ⇒  y = (C₀ + C₁x + C₂x² + C₃x³) eˣ + D₀ e⁻ˣ'
      ],
      en: [
        '(λ − 1)³(λ + 1)² = 0  ⇒  y = (C₀ + C₁x + C₂x²) eˣ + (D₀ + D₁x) e⁻ˣ',
        '(λ − 1)²(λ + 1)³ = 0  ⇒  y = (C₀ + C₁x) eˣ + (D₀ + D₁x + D₂x²) e⁻ˣ',
        '(λ − 1)⁴(λ + 1) = 0  ⇒  y = (C₀ + C₁x + C₂x² + C₃x³) eˣ + D₀ e⁻ˣ'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Gruplandırmayla λ⁴(λ − 1) − 2λ²(λ − 1) + (λ − 1) = (λ − 1)(λ⁴ − 2λ² + 1) = (λ − 1)(λ² − 1)² = (λ − 1)³(λ + 1)² = 0 bulunur. λ = 1 (3 katlı) ve λ = −1 (2 katlı) köklerinden 5 sabitli çözüm yazılır.',
      en: 'Grouping gives λ⁴(λ − 1) − 2λ²(λ − 1) + (λ − 1) = (λ − 1)(λ⁴ − 2λ² + 1) = (λ − 1)(λ² − 1)² = (λ − 1)³(λ + 1)² = 0. The triple root λ = 1 and double root λ = −1 yield the 5-constant solution.'
    },
    hints: {
      tr: ['İkili gruplar halinde (λ − 1) ortak çarpanını çıkar.', 'λ⁴ − 2λ² + 1 = (λ² − 1)² = (λ − 1)²(λ + 1)² özdeşliğini kullan.'],
      en: ['Factor out (λ − 1) by grouping pairs of terms.', 'Use λ⁴ − 2λ² + 1 = (λ² − 1)² = (λ − 1)²(λ + 1)².']
    }
  }
];
