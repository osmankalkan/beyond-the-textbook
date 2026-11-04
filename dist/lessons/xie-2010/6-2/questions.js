export const extraQuestions = [
  {
    title: { tr: 'Dikdörtgen darbe penceresinin Laplace dönüşümü', en: 'Laplace transform of rectangular pulse window' },
    tag: 'DARBE / PULSE',
    text: {
      tr: '0 < a < b olmak üzere p(t) = H(t − a) − H(t − b) birim dikdörtgen darbesinin Laplace dönüşümü nedir?',
      en: 'For 0 < a < b, what is the Laplace transform of the unit rectangular pulse p(t) = H(t − a) − H(t − b)?'
    },
    choices: {
      tr: [
        '(e⁻ᵃˢ − e⁻ᵇˢ) / s  (s > 0)',
        '(e⁻ᵃˢ + e⁻ᵇˢ) / s  (s > 0)',
        'e⁻⁽ᵇ⁻ᵃ⁾ˢ / s  (s > 0)'
      ],
      en: [
        '(e⁻ᵃˢ − e⁻ᵇˢ) / s  (s > 0)',
        '(e⁻ᵃˢ + e⁻ᵇˢ) / s  (s > 0)',
        'e⁻⁽ᵇ⁻ᵃ⁾ˢ / s  (s > 0)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğrusallık gereği ℒ{H(t − a) − H(t − b)} = ℒ{H(t − a)} − ℒ{H(t − b)} = (e⁻ᵃˢ − e⁻ᵇˢ) / s olur.',
      en: 'By linearity, ℒ{H(t − a) − H(t − b)} = ℒ{H(t − a)} − ℒ{H(t − b)} = (e⁻ᵃˢ − e⁻ᵇˢ) / s.'
    },
    hints: {
      tr: [
        'Tek bir H(t − a) basamağının dönüşümü nedir?',
        'Doğrusallık özelliği iki basamağın farkına nasıl uygulanır?'
      ],
      en: [
        'What is the transform of a single step H(t − a)?',
        'How does linearity apply to the difference of two steps?'
      ]
    }
  },
  {
    title: { tr: 'Tam eşleşmiş gecikmeli sinüs dönüşümü', en: 'Matched delayed sine transform' },
    tag: '2. KAYDIRMA / 2ND SHIFT',
    text: {
      tr: 'f(t) = sin(3(t − 4)) H(t − 4) fonksiyonunun Laplace dönüşümü aşağıdakilerden hangisidir?',
      en: 'What is the Laplace transform of f(t) = sin(3(t − 4)) H(t − 4)?'
    },
    choices: {
      tr: [
        '3 e⁻⁴ˢ / (s² + 9)  (s > 0)',
        's e⁻⁴ˢ / (s² + 9)  (s > 0)',
        '3 / (s² + 9)  (s > 0)'
      ],
      en: [
        '3 e⁻⁴ˢ / (s² + 9)  (s > 0)',
        's e⁻⁴ˢ / (s² + 9)  (s > 0)',
        '3 / (s² + 9)  (s > 0)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Argüman (t − 4) ile tam kilitlidir. 2. Kaydırma Teoremi gereğince taban sin 3t dönüşümü 3 / (s² + 9) olup e⁻⁴ˢ çarpanı ile çarpılır.',
      en: 'The argument strictly matches (t − 4). By the 2nd Shift Theorem, base transform 3 / (s² + 9) is multiplied by e⁻⁴ˢ.'
    },
    hints: {
      tr: [
        'sin 3t fonksiyonunun standart Laplace dönüşümü nedir?',
        't − 4 gecikmesi s-bölgesinde hangi üstel çarpanı getirir?'
      ],
      en: [
        'What is the standard Laplace transform of sin 3t?',
        'What exponential factor does the delay t − 4 introduce in the s-domain?'
      ]
    }
  },
  {
    title: { tr: 't² H(t − 1) polinomunun Taylor kaydırması', en: 'Taylor shifting of polynomial t² H(t − 1)' },
    tag: 'POLİNOM KAYDIRMA / POLYNOMIAL SHIFT',
    text: {
      tr: 'f(t) = t² H(t − 1) fonksiyonunu 2. Kaydırma Teoremi ile çözmek için t² ifadesi (t − 1) cinsinden nasıl açılmalıdır?',
      en: 'To evaluate f(t) = t² H(t − 1) via the 2nd Shift Theorem, how must t² be expanded in powers of (t − 1)?'
    },
    choices: {
      tr: [
        '(t − 1)² + 2(t − 1) + 1',
        '(t − 1)² + 1',
        '(t − 1)² − 2(t − 1) + 1'
      ],
      en: [
        '(t − 1)² + 2(t − 1) + 1',
        '(t − 1)² + 1',
        '(t − 1)² − 2(t − 1) + 1'
      ]
    },
    answer: 0,
    feedback: {
      tr: 't = (t − 1) + 1 yazılarak karesi açıldığında t² = [(t − 1) + 1]² = (t − 1)² + 2(t − 1) + 1 bulunur. Dönüşüm e⁻ˢ(2/s³ + 2/s² + 1/s) olur.',
      en: 'Writing t = (t − 1) + 1 and squaring yields t² = [(t − 1) + 1]² = (t − 1)² + 2(t − 1) + 1, resulting in e⁻ˢ(2/s³ + 2/s² + 1/s).'
    },
    hints: {
      tr: [
        't yerine (t − 1) + 1 yazıp tam kareyi aç.',
        'Ortadaki 2(t − 1) çarpım terimini unutma.'
      ],
      en: [
        'Substitute (t − 1) + 1 for t and expand the square.',
        'Do not forget the cross term 2(t − 1).'
      ]
    }
  },
  {
    title: { tr: 'Eşleşmeyen üstel kuralı e^{at}H(t − b)', en: 'Unmatched exponential rule e^{at}H(t − b)' },
    tag: 'EŞLEŞMEYEN ARGÜMAN / UNMATCHED ARGUMENT',
    text: {
      tr: 'b > 0 için f(t) = e^{at} H(t − b) fonksiyonunun Laplace dönüşümü nedir?',
      en: 'For b > 0, what is the Laplace transform of f(t) = e^{at} H(t − b)?'
    },
    choices: {
      tr: [
        'e⁻ᵇ⁽ˢ⁻ᵃ⁾ / (s − a)  (s > a)',
        'e⁻ᵇˢ / (s − a)  (s > a)',
        'e⁻ᵃˢ / (s − b)  (s > b)'
      ],
      en: [
        'e⁻ᵇ⁽ˢ⁻ᵃ⁾ / (s − a)  (s > a)',
        'e⁻ᵇˢ / (s − a)  (s > a)',
        'e⁻ᵃˢ / (s − b)  (s > b)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Tanım integrali ∫_b^∞ e⁻ˢᵗ e^{at} dt = ∫_b^∞ e⁻⁽ˢ⁻ᵃ⁾ᵗ dt doğrudan e⁻ᵇ⁽ˢ⁻ᵃ⁾ / (s − a) sonucunu verir. e^{at} = e^{ab} e^{a(t-b)} açılarak da aynı sonuca ulaşılır.',
      en: 'Evaluating ∫_b^∞ e⁻ˢᵗ e^{at} dt = ∫_b^∞ e⁻⁽ˢ⁻ᵃ⁾ᵗ dt directly yields e⁻ᵇ⁽ˢ⁻ᵃ⁾ / (s − a). Factoring e^{at} = e^{ab} e^{a(t-b)} yields the same result.'
    },
    hints: {
      tr: [
        'İntegral sınırının b olduğunu ve üslerin −(s − a)t olarak toplandığını hatırla.',
        'Alt sınır t = b yerine konulduğunda üs ne olur?'
      ],
      en: [
        'Recall the lower limit is b and exponents combine to −(s − a)t.',
        'What does the exponent become when lower limit t = b is inserted?'
      ]
    }
  }
];
