export const laplaceSummaryExtraQuestions = [
  {
    title: { tr: 'Başlangıç değer teoremi', en: 'Initial value theorem' },
    tag: 'LİMİT TEOREMLERİ / INITIAL VALUE THM',
    text: {
      tr: 'Bir f(t) fonksiyonunun t → 0⁺ anındaki anlık değeri s-bölgesindeki F(s) cinsinden nasıl bulunur?',
      en: 'How is the instantaneous value of f(t) as t → 0⁺ obtained from its s-domain transform F(s)?'
    },
    choices: {
      tr: [
        'f(0⁺) = lim_{s → ∞} [s · F(s)]',
        'f(0⁺) = lim_{s → 0} [s · F(s)]',
        'f(0⁺) = lim_{s → ∞} [F(s) / s]'
      ],
      en: [
        'f(0⁺) = lim_{s → ∞} [s · F(s)]',
        'f(0⁺) = lim_{s → 0} [s · F(s)]',
        'f(0⁺) = lim_{s → ∞} [F(s) / s]'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! Başlangıç Değer Teoremi gereği zamanın sıfıra gittiği sınır, frekansın sonsuza gittiği limite karşılık gelir: f(0⁺) = lim_{s → ∞} s F(s).',
      en: 'Correct! By the Initial Value Theorem, the limit as time approaches zero corresponds to frequency approaching infinity: f(0⁺) = lim_{s → ∞} s F(s).'
    },
    hints: {
      tr: [
        'Zaman ile frekans limitleri birbirine terstir (t → 0 iken s → ∞).',
        'ℒ{f\'(t)} = s F(s) − f(0) integral sınırını düşünün.'
      ],
      en: [
        'Time and frequency limits are inverse to one another (t → 0 corresponds to s → ∞).',
        'Consider ℒ{f\'(t)} = s F(s) − f(0) under integration limits.'
      ]
    }
  },
  {
    title: { tr: 'Son değer teoremi', en: 'Final value theorem' },
    tag: 'LİMİT TEOREMLERİ / FINAL VALUE THM',
    text: {
      tr: 'Kararlı bir sistemin t → ∞ kararlı hal kalıcı değeri s-bölgesinde nasıl hesaplanır?',
      en: 'How is the steady-state final value of a stable system as t → ∞ evaluated in the s-domain?'
    },
    choices: {
      tr: [
        'lim_{t → ∞} f(t) = lim_{s → 0} [s · F(s)]',
        'lim_{t → ∞} f(t) = lim_{s → ∞} [s · F(s)]',
        'lim_{t → ∞} f(t) = lim_{s → 0} [F(s)]'
      ],
      en: [
        'lim_{t → ∞} f(t) = lim_{s → 0} [s · F(s)]',
        'lim_{t → ∞} f(t) = lim_{s → ∞} [s · F(s)]',
        'lim_{t → ∞} f(t) = lim_{s → 0} [F(s)]'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Harika! Sistem kutupları sol yarı düzlemde olmak koşuluyla, t → ∞ limiti s → 0 iken s F(s) çarpımının limitine eşittir.',
      en: 'Spot on! Provided all system poles lie in the open left half-plane, the limit as t → ∞ equals lim_{s → 0} s F(s).'
    },
    hints: {
      tr: [
        't sonsuza giderken frekans sıfıra (DC bileşene) yaklaşır.',
        's · F(s) çarpımı alınmalıdır.'
      ],
      en: [
        'As time tends to infinity, frequency approaches zero (the DC component).',
        'Evaluate the product s · F(s).'
      ]
    }
  },
  {
    title: { tr: 'Konvolüsyon teoreminin tersi', en: 'Convolution theorem inversion' },
    tag: 'KONVOLÜSYON / CONVOLUTION THEOREM',
    text: {
      tr: 'ℒ⁻¹{F(s) · G(s)} ifadesinin eşiti nedir?',
      en: 'What is the equivalent of ℒ⁻¹{F(s) · G(s)}?'
    },
    choices: {
      tr: [
        '∫₀ᵗ f(u) · g(t − u) du  (konvolüsyon integrali)',
        'f(t) · g(t)  (zaman bölgesinde doğrudan çarpım)',
        'f(t) + g(t)'
      ],
      en: [
        '∫₀ᵗ f(u) · g(t − u) du  (convolution integral)',
        'f(t) · g(t)  (direct pointwise product in time)',
        'f(t) + g(t)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Kutlarız! Frekans bölgesindeki cebirsel çarpım, zaman bölgesinde konvolüsyon integrali işlemine karşılık gelir.',
      en: 'Congratulations! Multiplication in the frequency domain corresponds strictly to the convolution integral in the time domain.'
    },
    hints: {
      tr: [
        'Frekans bölgesindeki çarpım zamanda doğrudan çarpım değildir.',
        'Sistem transfer fonksiyonu ile giriş sinyali konvolüsyon ile birleşir.'
      ],
      en: [
        'Multiplication in frequency is not simple point-by-point product in time.',
        'Transfer function and input signal combine via convolution.'
      ]
    }
  },
  {
    title: { tr: 'Frekans bölgesinde türev kuralı', en: 'Frequency differentiation rule' },
    tag: 'FREKANS TÜREVİ / FREQ DIFFERENTIATION',
    text: {
      tr: 'ℒ{t · f(t)} dönüşümünün s-bölgesindeki eşiti nedir?',
      en: 'What is ℒ{t · f(t)} in the s-domain?'
    },
    choices: {
      tr: [
        '−dF(s) / ds',
        '+dF(s) / ds',
        'F(s) / s'
      ],
      en: [
        '−dF(s) / ds',
        '+dF(s) / ds',
        'F(s) / s'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! Laplace çekirdeği e⁻ˢᵗ nin s\'e göre türevi −t e⁻ˢᵗ verdiğinden, zaman bölgesinde t ile çarpım s-bölgesinde −d/ds türevi üretir.',
      en: 'Correct! Because d/ds [e⁻ˢᵗ] = −t e⁻ˢᵗ, multiplication by t in time produces −d/ds in the s-domain.'
    },
    hints: {
      tr: [
        'İntegral altında s\'e göre türetim yapıldığında eksi işareti gelir.',
        'Genel kural: ℒ{tⁿ f(t)} = (−1)ⁿ F⁽ⁿ⁾(s) dir.'
      ],
      en: [
        'Differentiating the kernel with respect to s produces a negative sign.',
        'General rule: ℒ{tⁿ f(t)} = (−1)ⁿ F⁽ⁿ⁾(s).'
      ]
    }
  }
];
