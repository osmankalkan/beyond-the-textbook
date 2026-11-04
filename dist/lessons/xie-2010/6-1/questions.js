export const extraQuestions = [
  {
    title: { tr: 'İkinci türevin Laplace dönüşümü', en: 'Laplace transform of second derivative' },
    tag: 'TÜREV KURALI / DERIVATIVE RULE',
    text: {
      tr: 'İkinci mertebe türevin Laplace dönüşümü ℒ{f\'\'(t)} formülünde başlangıç değerleri nasıl yer alır?',
      en: 'How do initial conditions enter the formula for the Laplace transform of the second derivative ℒ{f\'\'(t)}?'
    },
    choices: {
      tr: [
        's² F(s) − s f(0) − f\'(0)',
        's² F(s) − f(0) − s f\'(0)',
        's² F(s) + s f(0) + f\'(0)'
      ],
      en: [
        's² F(s) − s f(0) − f\'(0)',
        's² F(s) − f(0) − s f\'(0)',
        's² F(s) + s f(0) + f\'(0)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'ℒ{f\'(t)} = s F(s) − f(0) kuralı f\'(t) fonksiyonuna tekrar uygulandığında s[s F(s) − f(0)] − f\'(0) = s² F(s) − s f(0) − f\'(0) elde edilir. s’in kuvveti her adımda bir azalır.',
      en: 'Applying ℒ{f\'(t)} = s F(s) − f(0) to f\'(t) yields s[s F(s) − f(0)] − f\'(0) = s² F(s) − s f(0) − f\'(0). The power of s decrements with each derivative.'
    },
    hints: {
      tr: [
        'Birinci türevde f(0) çarpanının önünde s var mıdır?',
        'İkinci türevde s ile çarpılan başlangıç değeri f(0) mıdır yoksa f\'(0) mı?'
      ],
      en: [
        'Is there a factor of s in front of f(0) in the first derivative?',
        'In the second derivative, is f(0) multiplied by s, or is f\'(0)?'
      ]
    }
  },
  {
    title: { tr: 'Üstel kaydırmalı polinom dönüşümü', en: 'Shifted polynomial transform' },
    tag: 'BİRİNCİ KAYDIRMA / FIRST SHIFTING',
    text: {
      tr: 'f(t) = t³ e²ᵗ fonksiyonunun Laplace dönüşümü ℒ{t³ e²ᵗ} aşağıdakilerden hangisidir?',
      en: 'What is the Laplace transform of f(t) = t³ e²ᵗ?'
    },
    choices: {
      tr: [
        '6 / (s − 2)⁴  (s > 2)',
        '6 / (s + 2)⁴  (s > −2)',
        '3 / (s − 2)³  (s > 2)'
      ],
      en: [
        '6 / (s − 2)⁴  (s > 2)',
        '6 / (s + 2)⁴  (s > −2)',
        '3 / (s − 2)³  (s > 2)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'ℒ{t³} = 3! / s⁴ = 6 / s⁴ formülünde e²ᵗ çarpanı nedeniyle s yerine (s − 2) kaydırılır. Sonuç 6 / (s − 2)⁴ ve yakınsama bölgesi s > 2 olur.',
      en: 'Since ℒ{t³} = 3! / s⁴ = 6 / s⁴, the factor e²ᵗ shifts s to (s − 2), giving 6 / (s − 2)⁴ for s > 2.'
    },
    hints: {
      tr: [
        't³ için faktöriyel 3! kaçtır?',
        'e^{at} ile çarpımda s nereye kayar: (s − a) mı yoksa (s + a) mı?'
      ],
      en: [
        'What is 3! for t³?',
        'When multiplying by e^{at}, does s shift to (s − a) or (s + a)?'
      ]
    }
  },
  {
    title: { tr: 't ile çarpılan kosinüsün s-türevi', en: 's-derivative of t-multiplied cosine' },
    tag: 's-TÜREVİ / s-DERIVATIVE',
    text: {
      tr: 'ℒ{cos ωt} = s / (s² + ω²) olduğuna göre ℒ{t cos ωt} dönüşümü nedir?',
      en: 'Given ℒ{cos ωt} = s / (s² + ω²), what is ℒ{t cos ωt}?'
    },
    choices: {
      tr: [
        '(s² − ω²) / (s² + ω²)²',
        '2s² / (s² + ω²)²',
        '(ω² − s²) / (s² + ω²)²'
      ],
      en: [
        '(s² − ω²) / (s² + ω²)²',
        '2s² / (s² + ω²)²',
        '(ω² − s²) / (s² + ω²)²'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'ℒ{t cos ωt} = −d/ds [s / (s² + ω²)] uygulanır. Bölüm türevi: [(1)(s² + ω²) − s(2s)] / (s² + ω²)² = (ω² − s²) / (s² + ω²)². Önündeki eksi işaretiyle sonuç (s² − ω²) / (s² + ω²)² olur.',
      en: 'Using ℒ{t cos ωt} = −d/ds [s / (s² + ω²)], quotient rule yields [(s² + ω²) − 2s²] / (s² + ω²)² = (ω² − s²) / (s² + ω²)². The leading minus sign negates this to (s² − ω²) / (s² + ω²)².'
    },
    hints: {
      tr: [
        'L{t f(t)} kuralında türevin önündeki eksi işaretini unutma.',
        'd/ds [s / (s² + ω²)] türevinin payı ω² − s² çıkar; eksi ile çarpılınca ne olur?'
      ],
      en: [
        'Do not forget the minus sign in L{t f(t)} = −dF/ds.',
        'The derivative numerator is ω² − s²; what happens after multiplying by −1?'
      ]
    }
  },
  {
    title: { tr: 'Sönümlü sinüs dönüşümü ve yakınsama apsisi', en: 'Damped sine transform and convergence abscissa' },
    tag: 'BİRİNCİ KAYDIRMA / FIRST SHIFTING',
    text: {
      tr: 'f(t) = e⁻²ᵗ sin 3t fonksiyonunun Laplace dönüşümü ve yakınsama apsisi nedir?',
      en: 'What is the Laplace transform and abscissa of convergence of f(t) = e⁻²ᵗ sin 3t?'
    },
    choices: {
      tr: [
        '3 / ((s + 2)² + 9)  (s > −2)',
        '3 / ((s − 2)² + 9)  (s > 2)',
        '(s + 2) / ((s + 2)² + 9)  (s > −2)'
      ],
      en: [
        '3 / ((s + 2)² + 9)  (s > −2)',
        '3 / ((s − 2)² + 9)  (s > 2)',
        '(s + 2) / ((s + 2)² + 9)  (s > −2)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'ω = 3 için ℒ{sin 3t} = 3 / (s² + 9)\'dur. a = −2 olduğundan s yerine s − (−2) = s + 2 kaydırılır. e⁻²ᵗ çarpanı üstel büyümediğinden integral s > −2 için yakınsar.',
      en: 'For ω = 3, ℒ{sin 3t} = 3 / (s² + 9). With a = −2, s shifts to s − (−2) = s + 2. The integral converges for s > −2.'
    },
    hints: {
      tr: [
        'Sinüs dönüşümünün payında s mi yoksa ω sabiti mi yer alır?',
        'a = −2 iken s − a ifadesi ne olur?'
      ],
      en: [
        'Does the sine transform numerator contain s or the constant ω?',
        'When a = −2, what does s − a evaluate to?'
      ]
    }
  }
];
