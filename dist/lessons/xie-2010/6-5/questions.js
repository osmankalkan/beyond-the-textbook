export const laplaceOdeExtraQuestions = [
  {
    title: { tr: 'Sıfır-durum yanıtı (ZSR) kavramı', en: 'Zero-State Response (ZSR) concept' },
    tag: 'ZSR / ZIR KAVRAMI',
    text: {
      tr: 'Tüm başlangıç koşulları sıfır iken (y(0) = 0, y\'(0) = 0) yalnızca dış zorlama f(t) tarafından üretilen yanıta ne ad verilir?',
      en: 'What is the response termed when all initial conditions are zero (y(0) = 0, y\'(0) = 0) and excitation comes solely from f(t)?'
    },
    choices: {
      tr: [
        'Sıfır-durum yanıtı (Zero-State Response / ZSR)',
        'Sıfır-girdi yanıtı (Zero-Input Response / ZIR)',
        'Kararlı hal rezonans çözümü'
      ],
      en: [
        'Zero-State Response (ZSR)',
        'Zero-Input Response (ZIR)',
        'Steady-state resonant solution'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! ZSR, başlangıç enerjisi sıfır kabul edildiğinde sisteme uygulanan dış girdinin oluşturduğu zorlanmış tepkidir.',
      en: 'Correct! The Zero-State Response is the forced trajectory resulting strictly from external inputs when initial energy is zero.'
    },
    hints: {
      tr: [
        'Sistem başlangıçta durgun "durumda" (state = 0) bulunur.',
        'Sıfır-girdi (ZIR) ise girdinin sıfır olup sadece başlangıç enerjisiyle salınan serbest yanıttır.'
      ],
      en: [
        'The system begins at rest in zero state.',
        'Zero-input (ZIR) assumes input is zero with motion sustained solely by initial energy.'
      ]
    }
  },
  {
    title: { tr: 'Dirac darbesinde hız sıçraması', en: 'Velocity jump under Dirac impulse' },
    tag: 'DARBE YANITI / IMPULSE JUMP',
    text: {
      tr: 'y\'\' + ω₀² y = I δ(t − a) denkleminde t = a darbe anında yer değiştirme ve hızın sürekliliği nasıldır?',
      en: 'In the equation y\'\' + ω₀² y = I δ(t − a), what describes continuity of displacement and velocity at t = a?'
    },
    choices: {
      tr: [
        'Yer değiştirme süreklidir; hız ise I büyüklüğünde ani sıçrama yapar: y\'(a⁺) − y\'(a⁻) = I',
        'Hem yer değiştirme hem de hız I kadar süreksiz sıçrama yapar',
        'Hız süreklidir; yer değiştirme sonsuza fırlar'
      ],
      en: [
        'Displacement is continuous; velocity undergoes an instantaneous step jump of I: y\'(a⁺) − y\'(a⁻) = I',
        'Both displacement and velocity experience discontinuous jumps of size I',
        'Velocity is continuous while displacement diverges to infinity'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Harika! Dirac delta fonksiyonunun integrali sonlu bir itki (momentum aktarımı) ürettiğinden hızda ani sıçrama doğar, fakat yer değiştirme zaman içinde sıçrayamaz (süreklidir).',
      en: 'Spot on! Integrating the Dirac delta transfers a finite momentum impulse, jumping the velocity instantaneously while position remains continuous.'
    },
    hints: {
      tr: [
        'Fiziksel Newton kanunu: F dt = m dv momentum korunumudur.',
        'İtki hızı doğrudan değiştirir.'
      ],
      en: [
        'Newtonian mechanics: impulse F dt = m dv dictates momentum change.',
        'Impulse directly changes momentum and velocity.'
      ]
    }
  },
  {
    title: { tr: 'Gecikmeli polinomun Taylor kaydırması', en: 'Taylor shifting of delayed polynomial' },
    tag: 'TAYLOR KAYDIRMASI / POLYNOMIAL SHIFT',
    text: {
      tr: 't² · H(t − 2) ifadesine ikinci kaydırma teoremini doğrudan uygulayabilmek için t² nasıl yazılmalıdır?',
      en: 'How must t² be rewritten to directly apply the 2nd shifting theorem to t² · H(t − 2)?'
    },
    choices: {
      tr: [
        '[(t − 2) + 2]² = (t − 2)² + 4(t − 2) + 4',
        '(t − 2)² − 4',
        '(t − 2)² + 2(t − 2)'
      ],
      en: [
        '[(t − 2) + 2]² = (t − 2)² + 4(t − 2) + 4',
        '(t − 2)² − 4',
        '(t − 2)² + 2(t − 2)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğru! t = (t − 2) + 2 özdeşliği kullanılarak açılım yapıldığında tüm polinom terimleri (t − 2) tabanına oturur ve ℒ{h(t − 2)H(t − 2)} = e⁻²ˢ ℒ{h(t)} kuralı doğrudan çalışır.',
      en: 'Correct! Expanding t = (t − 2) + 2 casts the polynomial into powers of (t − 2), enabling direct application of the 2nd shifting theorem.'
    },
    hints: {
      tr: [
        'Argümanların H(t − a) basamağı ile aynı (t − a) kaymasına sahip olması gerekir.',
        'Binom karesi: (u + 2)² = u² + 4u + 4 formülünü hatırlayın.'
      ],
      en: [
        'Arguments must match the (t − a) delay of H(t − a).',
        'Recall the binomial expansion: (u + 2)² = u² + 4u + 4.'
      ]
    }
  },
  {
    title: { tr: 'Doğal frekans ile eşleşen zorlama (Rezonans)', en: 'Forcing matched to natural frequency (Resonance)' },
    tag: 'REZONANS / RESONANCE',
    text: {
      tr: 'y\'\' + ω² y = F₀ cos ωt denkleminin Laplace çözümü zaman bölgesinde hangi karakteristik çarpanı üretir?',
      en: 'What characteristic factor is generated in time by the Laplace solution of y\'\' + ω² y = F₀ cos ωt?'
    },
    choices: {
      tr: [
        't · sin ωt (zamanla sınırsız büyüyen genlik)',
        'e⁻ʷᵗ · cos ωt (sönümlü salınım)',
        'Sabit genlikli saf kosinüs'
      ],
      en: [
        't · sin ωt (linearly growing amplitude)',
        'e⁻ʷᵗ · cos ωt (damped oscillation)',
        'Constant-amplitude pure cosine'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Kutlarız! S-bölgesindeki katlı kutup 1 / (s² + ω²)² zaman bölgesinde (t / 2ω) sin ωt rezonans terimi doğurur.',
      en: 'Congratulations! The repeated pole 1 / (s² + ω²)² in the s-domain inverts to (t / 2ω) sin ωt, signifying secular resonance growth.'
    },
    hints: {
      tr: [
        'Örnek 6.13 ve Örnek 6.16 rezonans mekanizmasını göstermektedir.',
        'Sistemin sönümsüz olması durumunda genlik sınırsız büyür.'
      ],
      en: [
        'Examples 6.13 and 6.16 highlight this resonance mechanism.',
        'In the absence of damping, amplitude grows without bound.'
      ]
    }
  }
];