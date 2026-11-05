export const diracExtraQuestions = [
  {
    title: { tr: 'Kirişte tekil yük gösterimi', en: 'Concentrated beam point load representation' },
    tag: 'KİRİŞ MODELİ / BEAM MODEL',
    text: {
      tr: 'x = a noktasında yoğunlaşmış W büyüklüğündeki tekil bir kiriş yükü matematiksel olarak nasıl ifade edilir?',
      en: 'How is a concentrated point load of magnitude W at position x = a mathematically represented?'
    },
    choices: {
      tr: [
        'w(x) = W · δ(x − a)',
        'w(x) = W · H(x − a)',
        'w(x) = (W / a) · x'
      ],
      en: [
        'w(x) = W · δ(x − a)',
        'w(x) = W · H(x − a)',
        'w(x) = (W / a) · x'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! Noktasal tekil yükler sıfır genişlikte sonsuz yoğunluk barındırıp sonlu toplam kuvvet W ürettiğinden Dirac delta fonksiyonu W · δ(x − a) ile modellenir.',
      en: 'Correct! Point loads concentrate finite resultant force W over zero span, accurately modeled by the Dirac delta W · δ(x − a).'
    },
    hints: {
      tr: [
        'Yayılı yükler Heaviside basamakları ile pencere içine alınır; tekil yükler ise doğrudan Dirac deltası gerektirir.',
        'Toplam kuvvet integralinin ∫ w(x) dx = W sonucunu vermesi gerekir.'
      ],
      en: [
        'Distributed loads use Heaviside steps; concentrated point loads require the Dirac delta.',
        'The resultant force integral must satisfy ∫ w(x) dx = W.'
      ]
    }
  },
  {
    title: { tr: 'İtki altında hız sıçraması', en: 'Velocity jump under impulse' },
    tag: 'İTKİ-MOMENTUM / IMPULSE-MOMENTUM',
    text: {
      tr: 'Durgun bir m kütlesine t = 0 anında I büyüklüğünde bir Dirac darbesi I · δ(t) uygulandığında, kütlenin anlık hız sıçraması Δv ne olur?',
      en: 'When an impulse I · δ(t) strikes a mass m initially at rest at t = 0, what is the instantaneous velocity jump Δv?'
    },
    choices: {
      tr: [
        'Δv = I / m',
        'Δv = I · m',
        'Δv = 0 (Hız anında değişemez)'
      ],
      en: [
        'Δv = I / m',
        'Δv = I · m',
        'Δv = 0 (Velocity cannot jump)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Harika! İtki-Momentum Prensibi gereği m · Δv = I olduğundan, darbe anında hızda Δv = I / m basamak sıçraması oluşur; konum ise süreklidir.',
      en: 'Spot on! By the Impulse-Momentum Principle m · Δv = I, the velocity jumps by Δv = I / m while displacement remains continuous.'
    },
    hints: {
      tr: [
        'Newton yasasının integrali: ∫ m (dv/dt) dt = ∫ I δ(t) dt.',
        'Sol taraf m Δv, sağ taraf toplam itki I verir.'
      ],
      en: [
        'Integrate Newton\'s law: ∫ m (dv/dt) dt = ∫ I δ(t) dt.',
        'The left side yields m Δv, while the right side yields the total impulse I.'
      ]
    }
  },
  {
    title: { tr: 'Üstel modüle edilmiş darbe dönüşümü', en: 'Exponential modulated impulse transform' },
    tag: 'HESAPLAMA / COMPUTATION',
    text: {
      tr: 'ℒ{e^{3t} · δ(t − 1)} ifadesinin Laplace dönüşümü nedir?',
      en: 'What is the Laplace transform of ℒ{e^{3t} · δ(t − 1)}?'
    },
    choices: {
      tr: [
        'e³ · e⁻ˢ',
        'e³ˢ / s',
        '1 / (s − 3)'
      ],
      en: [
        'e³ · e⁻ˢ',
        'e³ˢ / s',
        '1 / (s − 3)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! Süzme özelliği ℒ{f(t) · δ(t − a)} = f(a) · e^{-as} kuralıdır. Burada a = 1 ve f(1) = e³ olduğundan sonuç e³ · e⁻ˢ olur.',
      en: 'Correct! By the sifting property ℒ{f(t) · δ(t − a)} = f(a) · e^{-as}. With a = 1 and f(1) = e³, the result is e³ · e⁻ˢ.'
    },
    hints: {
      tr: [
        't = 1 değerini e^{3t} içine yazarak katsayıyı bulunuz.',
        'Darbe gecikmesi a = 1 olduğundan e⁻ˢ ile çarpınız.'
      ],
      en: [
        'Evaluate e^{3t} at t = 1 to find the scalar coefficient.',
        'Multiply by the delay factor e⁻ˢ since a = 1.'
      ]
    }
  },
  {
    title: { tr: 'Darbe daralma limiti', en: 'Impulse contraction limit' },
    tag: 'LİMİT / LIMIT',
    text: {
      tr: 'Genişliği ε olan dikdörtgen bir darbede ε → 0 sınırına gidilirken tepe yüksekliği ve alan nasıl değişir?',
      en: 'As width ε → 0 for a rectangular impulse, how do the peak height and area evolve?'
    },
    choices: {
      tr: [
        'Tepe yüksekliği sonsuza giderken alan sabit I kalır',
        'Hem alan hem tepe yüksekliği sıfıra gider',
        'Alan sonsuza giderken tepe yüksekliği sabit kalır'
      ],
      en: [
        'Peak height diverges to infinity while the area remains invariant at I',
        'Both area and peak height vanish to zero',
        'Area diverges to infinity while the peak height remains constant'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Kesinlikle doğru! Dirac delta fonksiyonunun matematiksel idealizasyonunun temeli budur: Yükseklik I/ε → ∞ olurken toplam itki (alan) daima I kalır.',
      en: 'Exactly right! This defines the mathematical idealization of the Dirac delta: peak height I/ε → ∞ while total impulse (area) remains invariant at I.'
    },
    hints: {
      tr: [
        'Yükseklik = I / ε ifadesinde paydadaki ε sıfıra yaklaşır.',
        'Alan = (I / ε) · ε daima I sabiti olarak sadeleşir.'
      ],
      en: [
        'Height = I / ε has ε in the denominator approaching zero.',
        'Area = (I / ε) · ε always simplifies to the constant I.'
      ]
    }
  }
];
