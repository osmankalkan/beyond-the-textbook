export const laplaceAppExtraQuestions = [
  {
    title: { tr: 'Periyodik fonksiyonların Laplace dönüşümü', en: 'Laplace transform of periodic functions' },
    tag: 'PERİYODİK DÖNÜŞÜM / PERIODIC TRANSFORM',
    text: {
      tr: 'T periyotlu bir f(t) fonksiyonunun (f(t + T) = f(t)) Laplace dönüşümü formülü nedir?',
      en: 'What is the Laplace transform formula for a periodic function f(t) with period T (f(t + T) = f(t))?'
    },
    choices: {
      tr: [
        '[1 / (1 − e⁻ˢᵀ)] · ∫₀ᵀ e⁻ˢᵗ f(t) dt',
        '[1 / (1 + e⁻ˢᵀ)] · ∫₀ᵀ e⁻ˢᵗ f(t) dt',
        'e⁻ˢᵀ · ∫₀ᵀ f(t) dt'
      ],
      en: [
        '[1 / (1 − e⁻ˢᵀ)] · ∫₀ᵀ e⁻ˢᵗ f(t) dt',
        '[1 / (1 + e⁻ˢᵀ)] · ∫₀ᵀ e⁻ˢᵗ f(t) dt',
        'e⁻ˢᵀ · ∫₀ᵀ f(t) dt'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! Geometrik serinin toplamı [1 + e⁻ˢᵀ + e⁻²ˢᵀ + ...] = 1 / (1 − e⁻ˢᵀ) çarpanını üretir; bu çarpan ilk periyodun integrali ile çarpılır.',
      en: 'Correct! The sum of the geometric series [1 + e⁻ˢᵀ + e⁻²ˢᵀ + ...] yields 1 / (1 − e⁻ˢᵀ), scaling the single-period integral.'
    },
    hints: {
      tr: [
        'Sonsuz aralıktaki integrali [0, T], [T, 2T], [2T, 3T] ... dilimlerine ayırın.',
        'Geometrik seri toplamı: ∑ rⁿ = 1 / (1 − r) bağıntısını kullanın.'
      ],
      en: [
        'Partition the infinite integral into intervals [0, T], [T, 2T], [2T, 3T] ...',
        'Apply the geometric series sum formula: ∑ rⁿ = 1 / (1 − r).'
      ]
    }
  },
  {
    title: { tr: 'Elastik zeminde karakteristik dalga sayısı', en: 'Characteristic wavenumber on elastic foundation' },
    tag: 'ELASTİK ZEMİN / ELASTIC FOUNDATION',
    text: {
      tr: 'EI y⁽⁴⁾ + k y = 0 kiriş denkleminde karakteristik kökler hangi parametreye bağlıdır?',
      en: 'In the beam equation EI y⁽⁴⁾ + k y = 0, on what parameter do the characteristic roots depend?'
    },
    choices: {
      tr: [
        'β = [k / (4 EI)]^(1/4)',
        'β = [4 k / EI]^(1/2)',
        'β = k · EI'
      ],
      en: [
        'β = [k / (4 EI)]^(1/4)',
        'β = [4 k / EI]^(1/2)',
        'β = k · EI'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Harika! s⁴ + 4β⁴ = 0 denkleminin kökleri s = ±β(1 ± i) dir ve kirişin sönümlü elastik deformasyon dalgaboyunu belirler.',
      en: 'Spot on! Roots of s⁴ + 4β⁴ = 0 are s = ±β(1 ± i), defining the spatial attenuation wavelength of the beam.'
    },
    hints: {
      tr: [
        '4. mertebe türevden dördüncü dereceden kök gelir.',
        'Kökler karmaşık düzlemde 45 derecelik açılarda simetrik yerleşir.'
      ],
      en: [
        'The fourth derivative introduces a fourth root.',
        'Roots are placed symmetrically at 45-degree angles in the complex plane.'
      ]
    }
  },
  {
    title: { tr: 'RLC devresinde rezonans frekansı', en: 'Resonant frequency in RLC circuits' },
    tag: 'DEVRE TEORİSİ / RLC RESONANCE',
    text: {
      tr: 'Seri bir RLC devresinde sönümsüz doğal frekans ω₀ aşağıdakilerden hangisidir?',
      en: 'What is the undamped natural frequency ω₀ of a series RLC circuit?'
    },
    choices: {
      tr: [
        'ω₀ = 1 / √(L · C)',
        'ω₀ = √(L / C)',
        'ω₀ = R / (2L)'
      ],
      en: [
        'ω₀ = 1 / √(L · C)',
        'ω₀ = √(L / C)',
        'ω₀ = R / (2L)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Kutlarız! LC salınımının doğal frekansı mekanik yay-kütle sistemindeki ω_n = √(k/m) ifadesine tam analojiktir.',
      en: 'Congratulations! The LC natural frequency is completely analogous to the mechanical spring-mass frequency ω_n = √(k/m).'
    },
    hints: {
      tr: [
        'İndüktans L kütle m\'e, 1/C ise yay sabiti k\'ya karşılık gelir.',
        'Birim kontrolü: [rad/s] frekansı aranmaktadır.'
      ],
      en: [
        'Inductance L corresponds to mass m, and 1/C corresponds to spring constant k.',
        'Unit check: seeking frequency in [rad/s].'
      ]
    }
  },
  {
    title: { tr: 'Dinamik büyütme faktörü (DMF)', en: 'Dynamic Magnification Factor (DMF)' },
    tag: 'TİTREŞİM / DYNAMIC MAGNIFICATION',
    text: {
      tr: 'Tek serbestlik dereceli sönümsüz bir yapıda zorlama frekansı doğal frekansa yaklaştıkça (ω → ω_n) Dinamik Büyütme Faktörü neye yaklaşır?',
      en: 'In an undamped SDOF structure, what does the Dynamic Magnification Factor approach as forcing frequency nears natural frequency (ω → ω_n)?'
    },
    choices: {
      tr: [
        'Sonsuza yaklaşır (teorik rezonans tekilliği)',
        'Sıfıra yaklaşır',
        '1.0 değerine sabitlenir'
      ],
      en: [
        'Approaches infinity (theoretical resonance singularity)',
        'Approaches zero',
        'Fixes at 1.0'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! Sönümsüz sistemde payda (1 − r²) sıfır olduğundan teorik genlik sınırsız büyür; gerçek yapılarda sönüm bu tepeyi sonlu tutar.',
      en: 'Correct! In an undamped system the denominator (1 − r²) vanishes, sending theoretical amplitude to infinity; real structures rely on damping to bound the peak.'
    },
    hints: {
      tr: [
        'DMF = 1 / |1 − (ω / ω_n)²| formülünü hatırlayın.',
        'Rezonans durumunda sistemde sürekli enerji birikir.'
      ],
      en: [
        'Recall DMF = 1 / |1 − (ω / ω_n)²|.',
        'At resonance, continuous energy is pumped into the oscillator.'
      ]
    }
  }
];
