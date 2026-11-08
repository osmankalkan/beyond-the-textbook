export const operatorSystemsExtraQuestions = [
  {
    title: { tr: 'Cramer kuralında operatör sırası', en: 'Operator precedence in Cramer’s rule' },
    tag: 'İŞLEM SIRASI / OPERATOR PRECEDENCE',
    text: {
      tr: 'Operatör determinantı Δ_i(t) hesaplanırken diferansiyel operatör ile sağ taraf fonksiyonu arasındaki doğru sıra nedir?',
      en: 'What is the correct order between the differential operator and the right-hand side function when evaluating Δ_i(t)?'
    },
    choices: {
      tr: [
        'Operatör mutlaka fonksiyondan önce gelmelidir: L[f(t)]',
        'Fonksiyon mutlaka operatörden önce gelmelidir: f(t)·L',
        'Çarpma işlemi değişmeli olduğu için sıra fark etmez'
      ],
      en: [
        'The operator must precede the function: L[f(t)]',
        'The function must precede the operator: f(t)·L',
        'Because multiplication is commutative, the order does not matter'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Diferansiyel operatörler fonksiyonlarla değişmeli (komütatif) değildir. L[f(t)] ifadesi f(t) fonksiyonunun türevlerini alırken, f(t)L ifadesi henüz uygulanmamış bir operatör bırakır. Bu yüzden operatör daima fonksiyonun önüne yazılır.',
      en: 'Differential operators do not commute with functions. L[f(t)] evaluates derivatives of f(t), whereas f(t)L leaves an unapplied differential operator. Therefore, operators must always precede functions.'
    },
    hints: {
      tr: [
        'D[sin t] ile sin t · D ifadeleri aynı şey midir?',
        'Sonucun bir diferansiyel operatör değil, bilinen bir t fonksiyonu olması gerekir.'
      ],
      en: [
        'Are D[sin t] and sin t · D equivalent?',
        'The resulting determinant must evaluate to a known function of t, not a differential operator.'
      ]
    }
  },
  {
    title: { tr: 'Örnek 7.3 harmonik sistemde sabit bağıntısı', en: 'Constant relations in Example 7.3 harmonic system' },
    tag: 'SABİT ELEME / CONSTANT ELIMINATION',
    text: {
      tr: '(D − 3)x − 6y = 0 ve 3x + (D + 3)y = 0 sisteminde x = A₁ cos 3t + B₁ sin 3t iken y çözümünün A₂ katsayısı A₁ ve B₁ cinsinden nedir?',
      en: 'In the system (D − 3)x − 6y = 0 and 3x + (D + 3)y = 0 with x = A₁ cos 3t + B₁ sin 3t, what is the coefficient A₂ in y in terms of A₁ and B₁?'
    },
    choices: {
      tr: [
        'A₂ = −½(A₁ − B₁)',
        'A₂ = A₁ + B₁',
        'A₂ = −2A₁'
      ],
      en: [
        'A₂ = −½(A₁ − B₁)',
        'A₂ = A₁ + B₁',
        'A₂ = −2A₁'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'x(t) çözümü birinci denklem (D − 3)x = 6y içine konduğunda, türevden −3A₁ sin 3t + 3B₁ cos 3t gelir. cos 3t katsayıları eşitlendiğinde 3B₁ − 3A₁ − 6A₂ = 0 ⇒ A₂ = −½(A₁ − B₁) elde edilir.',
      en: 'Substituting x(t) into the first equation (D − 3)x = 6y gives derivatives −3A₁ sin 3t + 3B₁ cos 3t. Matching cos 3t terms yields 3B₁ − 3A₁ − 6A₂ = 0 ⇒ A₂ = −½(A₁ − B₁).'
    },
    hints: {
      tr: [
        '(D − 3)x türevini al ve cos(3t) katsayısını 6A₂’ye eşitle.',
        'İşaretlere dikkat et: 3B₁ − 3A₁ = 6A₂.'
      ],
      en: [
        'Differentiate (D − 3)x and equate the cos(3t) coefficient to 6A₂.',
        'Watch the signs: 3B₁ − 3A₁ = 6A₂.'
      ]
    }
  },
  {
    title: { tr: 'Örnek 7.4 asimetrik sistemde kaybolan katsayı', en: 'Vanishing coefficient in Example 7.4 asymmetric system' },
    tag: 'KATSAYI TUZAĞI / COEFFICIENT TRAP',
    text: {
      tr: 'Karakteristik kökleri λ = −1, −2, 2 olan (D² + 3D + 2)x + (D + 1)y = 0 ve (D + 2)x + (D − 1)y = 0 sisteminde, y çözümündeki hangi katsayı sıfırlanır?',
      en: 'In the system (D² + 3D + 2)x + (D + 1)y = 0 and (D + 2)x + (D − 1)y = 0 with roots λ = −1, −2, 2, which coefficient in y vanishes identically?'
    },
    choices: {
      tr: [
        'e⁻²ᵗ modunun katsayısı D₂ = 0',
        'e⁻ᵗ modunun katsayısı D₁ = 0',
        'e²ᵗ modunun katsayısı D₃ = 0'
      ],
      en: [
        'The coefficient of the e⁻²ᵗ mode: D₂ = 0',
        'The coefficient of the e⁻ᵗ mode: D₁ = 0',
        'The coefficient of the e²ᵗ mode: D₃ = 0'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'İkinci denklem (D + 2)x + (D − 1)y = 0 içine konduğunda, (D + 2)[C₂ e⁻²ᵗ] = 0 olur. Geriye kalan (D − 1)[D₂ e⁻²ᵗ] = −3D₂ e⁻²ᵗ = 0 eşitliğinden zorunlu olarak D₂ = 0 çıkar. Dolayısıyla e⁻²ᵗ modu y’de bulunmaz.',
      en: 'When substituting into (D + 2)x + (D − 1)y = 0, (D + 2)[C₂ e⁻²ᵗ] = 0. The remaining term (D − 1)[D₂ e⁻²ᵗ] = −3D₂ e⁻²ᵗ = 0 forces D₂ = 0. Thus the e⁻²ᵗ mode is absent from y.'
    },
    hints: {
      tr: [
        '(D + 2) operatörü e⁻²ᵗ üzerine uygulandığında ne olur?',
        'λ = −2 kökü (D + 2) çarpanını sıfırlar.'
      ],
      en: [
        'What happens when (D + 2) acts on e⁻²ᵗ?',
        'The root λ = −2 annihilates the factor (D + 2).'
      ]
    }
  },
  {
    title: { tr: 'Üstel kaydırma teoremi', en: 'Exponential shift theorem' },
    tag: 'TERS OPERATÖR / INVERSE OPERATOR',
    text: {
      tr: '1/P(D) ters operatörü [eᵃᵗ g(t)] çarpımına uygulandığında hangi kaydırma kuralı geçerlidir?',
      en: 'When the inverse operator 1/P(D) is applied to [eᵃᵗ g(t)], which shift theorem holds?'
    },
    choices: {
      tr: [
        '1/P(D) [eᵃᵗ g(t)] = eᵃᵗ · 1/P(D + a) [g(t)]',
        '1/P(D) [eᵃᵗ g(t)] = eᵃᵗ · 1/P(D − a) [g(t)]',
        '1/P(D) [eᵃᵗ g(t)] = 1/P(a) · eᵃᵗ g(t)'
      ],
      en: [
        '1/P(D) [eᵃᵗ g(t)] = eᵃᵗ · 1/P(D + a) [g(t)]',
        '1/P(D) [eᵃᵗ g(t)] = eᵃᵗ · 1/P(D − a) [g(t)]',
        '1/P(D) [eᵃᵗ g(t)] = 1/P(a) · eᵃᵗ g(t)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Üstel fonksiyon eᵃᵗ operatörün dışına çıkarılırken D operatörü (D + a) ile yer değiştirir. Kalan 1/P(D+a) ters operatörü yalnızca g(t) fonksiyonu üzerine etki eder.',
      en: 'Pulling the exponential eᵃᵗ through the inverse operator shifts D to (D + a). The remaining operator 1/P(D+a) then acts purely on g(t).'
    },
    hints: {
      tr: [
        'D[eᵃᵗ u] = eᵃᵗ (D + a)u çarpım kuralını hatırla.',
        'Ters operatörde de aynı işaret kuralı (D + a) geçerlidir.'
      ],
      en: [
        'Recall the product rule D[eᵃᵗ u] = eᵃᵗ (D + a)u.',
        'The same shift (D + a) applies to the inverse operator.'
      ]
    }
  },
  {
    title: { tr: 'Sistemlerde rezonans ve seküler terimler', en: 'Resonance and secular terms in systems' },
    tag: 'REZONANS / RESONANCE',
    text: {
      tr: 'φ(D) = D² + 9 olan bir sistem f₁(t) = 2 cos(3t) ile zorlandığında özel çözümde hangi karakteristik davranış gözlenir?',
      en: 'When a system with φ(D) = D² + 9 is forced by f₁(t) = 2 cos(3t), what characteristic behavior appears in the particular solution?'
    },
    choices: {
      tr: [
        't cos(3t) ve t sin(3t) gibi zamanla doğrusal büyüyen seküler rezonans terimleri oluşur',
        'Yalnızca sabit genlikli saf cos(3t) salınımı oluşur',
        'Çözüm üstel olarak söner ve sıfıra gider'
      ],
      en: [
        'Secular resonance terms like t cos(3t) and t sin(3t) grow linearly with time',
        'Only pure cos(3t) oscillations with constant amplitude occur',
        'The solution decays exponentially to zero'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Doğal frekans ω = 3 ile zorlama frekansı eşleştiğinde φ(3i) = (3i)² + 9 = 0 olur. Payda sıfırlandığı için ters operatör türev kuralı (1/φ′(3i)) uygulanır ve genliği zamanla doğrusal artan seküler terimler (t cos 3t, t sin 3t) doğar.',
      en: 'When the natural frequency matches the forcing frequency ω = 3, φ(3i) = (3i)² + 9 = 0. The zero denominator requires the derivative rule 1/φ′(3i), generating secular terms (t cos 3t, t sin 3t) whose amplitudes grow linearly with time.'
    },
    hints: {
      tr: [
        'φ(iω) sıfır mıdır?',
        'Sönümsüz sistemlerde rezonans genliği sonsuza fırlar mı?'
      ],
      en: [
        'Does φ(iω) equal zero?',
        'Does undamped resonance drive response amplitudes without bound?'
      ]
    }
  },
  {
    title: { tr: 'Örnek 7.7 polinom zorlama altında özel çözüm', en: 'Particular solution under polynomial forcing in Example 7.7' },
    tag: 'POLİNOM ZORLAMA / POLYNOMIAL FORCING',
    text: {
      tr: '(D² − 3D)x − (D − 2)y = 14t + 7 ve (D − 3)x + Dy = 1 sisteminde Δ_x(t) = 12 sabit bulunuyorsa, x_P özel çözümü nedir? (φ(D) = D³ − 2D² − 5D + 6)',
      en: 'In the system (D² − 3D)x − (D − 2)y = 14t + 7 and (D − 3)x + Dy = 1 with Δ_x(t) = 12, what is the particular solution x_P? (φ(D) = D³ − 2D² − 5D + 6)'
    },
    choices: {
      tr: [
        'x_P = 2',
        'x_P = 12t',
        'x_P = 7t + 7'
      ],
      en: [
        'x_P = 2',
        'x_P = 12t',
        'x_P = 7t + 7'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Sabit fonksiyon için D, D² ve D³ türevleri sıfırdır. Bu nedenle 1/φ(D) [12] = 12 / φ(0) = 12 / 6 = 2 elde edilir.',
      en: 'For a constant function, all derivatives D, D², and D³ vanish. Thus 1/φ(D) [12] = 12 / φ(0) = 12 / 6 = 2.'
    },
    hints: {
      tr: [
        'Sabit sayının türevi nedir?',
        'φ(0) = 6 katsayısına böl.'
      ],
      en: [
        'What is the derivative of a constant?',
        'Divide 12 by the constant term φ(0) = 6.'
      ]
    }
  },
  {
    title: { tr: 'Parametrelerin değişimi yöntemi', en: 'Variation of parameters method' },
    tag: 'DEĞİŞİM YÖNTEMİ / VARIATION OF PARAMETERS',
    text: {
      tr: 'Sağ taraf fonksiyonları standart olmayan (ör. tan t veya 1/(e²ᵗ+1)) sistemlerde parametrelerin değişimi uygulanırken keyfi sabitler neye dönüştürülür?',
      en: 'When applying variation of parameters to systems with non-standard forcing (e.g. tan t or 1/(e²ᵗ+1)), what do the arbitrary constants become?'
    },
    choices: {
      tr: [
        'Zamanın fonksiyonu olan c_i(t) parametrelerine dönüştürülür',
        'Frekans uzayındaki s Laplace değişkenine dönüştürülür',
        'Sıfıra eşitlenip tamamen atılır'
      ],
      en: [
        'They are replaced by functions of time c_i(t)',
        'They are converted to the Laplace frequency variable s',
        'They are set to zero and discarded'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Parametrelerin değişiminde homojen çözümdeki C_i sabitleri zamanın fonksiyonu olan c_i(t) ile değiştirilir. Sisteme yerleştirildiğinde c_i′(t) türevleri için lineer cebirsel denklem sistemi elde edilir ve Cramer kuralı ile çözülür.',
      en: 'In variation of parameters, the constants C_i of the complementary solution are replaced by functions of time c_i(t). Substituting into the system produces a linear algebraic system for derivatives c_i′(t), solved by Cramer’s rule.'
    },
    hints: {
      tr: [
        'Tek denklemlerdeki Lagrange parametre değişimi yöntemini hatırla.',
        'Sabitler artık sabit kalmaz, t ile değişir.'
      ],
      en: [
        'Recall Lagrange’s method of variation of parameters for single equations.',
        'The constants do not remain constant; they vary with t.'
      ]
    }
  },
  {
    title: { tr: 'Bağımsız doğrulama ve kalıntı testi', en: 'Independent verification and residual testing' },
    tag: 'DOĞRULAMA / VERIFICATION',
    text: {
      tr: 'Bir lineer operatör sisteminin analitik çözümünün doğruluğu en güvenilir biçimde nasıl kanıtlanır?',
      en: 'How is the correctness of an analytical solution to a linear operator system most reliably proved?'
    },
    choices: {
      tr: [
        'x(t) ve y(t) türevlerini alıp orijinal diferansiyel denklemlere koyarak kalıntıların özdeşçe sıfır olduğunu göstererek',
        'Yalnızca t = 0 anındaki başlangıç değerlerini kontrol ederek',
        'Karakteristik denklemin derecesini sayarak'
      ],
      en: [
        'By taking derivatives of x(t) and y(t) and substituting into original differential equations to prove residuals are identically zero',
        'By checking initial values at t = 0 only',
        'By counting the degree of the characteristic polynomial'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Tek bir noktada (örneğin t = 0) denklem sağlanması yetersizdir. Çözümün türevleri alınıp sistemin tüm denklemlerine konduğunda sol tarafın sağ tarafı her t için özdeşçe vermesi (kalıntı E(t) ≡ 0) bağımsız ve kesin doğrulamadır.',
      en: 'Satisfying equations at a single point (such as t = 0) is insufficient. Taking analytical derivatives and substituting into every system equation to show the residual E(t) ≡ 0 holds identically for all t provides definitive verification.'
    },
    hints: {
      tr: [
        'Diferansiyel denklem bir aralık kimliğidir.',
        'Hem homojen parçayı hem de sağ taraf zorlamasını test et.'
      ],
      en: [
        'A differential equation is an identity over an entire interval.',
        'Test both the homogeneous part and the forcing terms.'
      ]
    }
  }
];
