export const inverseExtraQuestions = [
  {
    title: { tr: 'Konvolüsyon integralinin tanımı', en: 'Definition of convolution integral' },
    tag: 'KONVOLÜSYON / CONVOLUTION',
    text: {
      tr: 'İki f(t) ve g(t) fonksiyonunun (f ∗ g)(t) konvolüsyon integrali aşağıdakilerden hangisidir?',
      en: 'Which of the following defines the convolution integral (f ∗ g)(t) of two functions f(t) and g(t)?'
    },
    choices: {
      tr: [
        '∫₀ᵗ f(u) · g(t − u) du',
        '∫₀ᵗ f(u) · g(u) du',
        '∫₀^∞ f(u) · g(t + u) du'
      ],
      en: [
        '∫₀ᵗ f(u) · g(t − u) du',
        '∫₀ᵗ f(u) · g(u) du',
        '∫₀^∞ f(u) · g(t + u) du'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! Konvolüsyon integrali bir fonksiyonun zamanda ileri kaydırılmış hali ile diğerinin ters çevrilmiş halinin u = 0\'dan t\'ye integrali olarak tanımlanır.',
      en: 'Correct! The convolution integral integrates f(u) against the reflected and shifted g(t − u) from u = 0 to t.'
    },
    hints: {
      tr: [
        'İntegrasyon sınırları [0, t] sonlu aralığıdır.',
        'İçerideki argümanların toplamı u + (t − u) = t olmalıdır.'
      ],
      en: [
        'Integration limits span the finite interval [0, t].',
        'The sum of the arguments inside must satisfy u + (t − u) = t.'
      ]
    }
  },
  {
    title: { tr: 'Gecikmeli basamak ters dönüşümü', en: 'Delayed step inverse transform' },
    tag: '2. KAYDIRMA / 2ND SHIFT',
    text: {
      tr: 'a > 0 için ℒ⁻¹{e⁻ᵃˢ · F(s)} ters Laplace dönüşümü nedir?',
      en: 'For a > 0, what is the inverse Laplace transform ℒ⁻¹{e⁻ᵃˢ · F(s)}?'
    },
    choices: {
      tr: [
        'f(t − a) · H(t − a)',
        'f(t + a) · H(t + a)',
        'eᵃᵗ · f(t)'
      ],
      en: [
        'f(t − a) · H(t − a)',
        'f(t + a) · H(t + a)',
        'eᵃᵗ · f(t)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Harika! İkinci kaydırma teoreminin tersine göre e⁻ᵃˢ üstel çarpanı zaman bölgesinde a kadar gecikmeli f(t − a) ve Heaviside adımı H(t − a) üretir.',
      en: 'Spot on! By the inverse second shifting theorem, e⁻ᵃˢ produces the delayed response f(t − a) activated by H(t − a).'
    },
    hints: {
      tr: [
        'e⁻ᵃˢ faktörü frekansta değil zamanda gecikmeyi temsil eder.',
        'Sinyal t < a için kapalı kalmalıdır (Heaviside basamağı).'
      ],
      en: [
        'The e⁻ᵃˢ factor represents time delay.',
        'The signal must remain zero for t < a (Heaviside step).'
      ]
    }
  },
  {
    title: { tr: 's bölgesinde türevin tersi', en: 'Inverse of frequency differentiation' },
    tag: 'TÜREV ÖZELLİĞİ / DIFFERENTIATION',
    text: {
      tr: 'ℒ⁻¹{F′(s)} ters Laplace dönüşümü aşağıdakilerden hangisidir?',
      en: 'What is the inverse Laplace transform ℒ⁻¹{F′(s)}?'
    },
    choices: {
      tr: [
        '−t · f(t)',
        't · f(t)',
        'f′(t)'
      ],
      en: [
        '−t · f(t)',
        't · f(t)',
        'f′(t)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! ℒ{t · f(t)} = −F′(s) kuralının tersi ℒ⁻¹{F′(s)} = −t · f(t) biçimindedir. Eksi işaretine dikkat edilmelidir!',
      en: 'Correct! From ℒ{t · f(t)} = −F′(s), inverting gives ℒ⁻¹{F′(s)} = −t · f(t). Watch the negative sign!'
    },
    hints: {
      tr: [
        's\'e göre türev integranttaki e^{-st} teriminden (−t) çarpanı düşürür.',
        'Bu nedenle ters dönüşümde (−t) katsayısı oluşur.'
      ],
      en: [
        'Differentiating with respect to s brings down a (−t) factor from e^{-st}.',
        'Hence the inverse carries a factor of (−t).'
      ]
    }
  },
  {
    title: { tr: 'Örnek 6.12 gecikmeli kuvvet tersi', en: 'Example 6.12 delayed power inverse' },
    tag: 'ÖRNEK 6.12 / EXAMPLE 6.12',
    text: {
      tr: 'ℒ⁻¹{(1 + e⁻³ˢ) / s⁴} ters dönüşümünün t ≥ 3 için tam ifadesi nedir?',
      en: 'What is the complete expression of ℒ⁻¹{(1 + e⁻³ˢ) / s⁴} for t ≥ 3?'
    },
    choices: {
      tr: [
        '(1/6) · [t³ + (t − 3)³]',
        '(1/24) · [t⁴ + (t − 3)⁴]',
        '(1/6) · t³ + e³ᵗ'
      ],
      en: [
        '(1/6) · [t³ + (t − 3)³]',
        '(1/24) · [t⁴ + (t − 3)⁴]',
        '(1/6) · t³ + e³ᵗ'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Kesinlikle doğru! 1/s⁴ tersi t³ / 3! = t³ / 6 verir; e⁻³ˢ / s⁴ terimi ise 3 birim gecikerek (t − 3)³ / 6 · H(t − 3) katkısı ekler.',
      en: 'Exactly right! 1/s⁴ inverts to t³ / 6, and e⁻³ˢ / s⁴ adds the delayed term (t − 3)³ / 6 for t ≥ 3.'
    },
    hints: {
      tr: [
        '1/s⁴ teriminin ters dönüşümü t^{4-1} / (4-1)! = t³ / 6\'dır.',
        'e⁻³ˢ çarpanı aynı ifadeyi (t − 3) olarak öteler.'
      ],
      en: [
        '1/s⁴ inverts to t^{4-1} / (4-1)! = t³ / 6.',
        'The e⁻³ˢ factor shifts the same expression to (t − 3).'
      ]
    }
  }
];
