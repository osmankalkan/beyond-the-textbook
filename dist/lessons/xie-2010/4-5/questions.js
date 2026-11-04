export const extraQuestions = [
  {
    title: { tr: 'Üstel kaydırma ve çift integrasyon', en: 'Exponential shift and double integration' },
    tag: 'D-OPERATÖRÜ / D-OPERATOR',
    text: {
      tr: '(D − 2)²y = 12x²e²ˣ denkleminde e²ˣ çarpanı Teorem 2 ile ters operatörün soluna çekildiğinde denklem neye indirgenir?',
      en: 'In (D − 2)²y = 12x²e²ˣ, when e²ˣ is pulled to the left of the inverse operator via Theorem 2, what does the equation reduce to?'
    },
    choices: {
      tr: ['y_P = e²ˣ (1/D²)(12x²) = x⁴e²ˣ', 'y_P = e²ˣ (1/(D − 2)²)(12x²)', 'y_P = 3x²e²ˣ'],
      en: ['y_P = e²ˣ (1/D²)(12x²) = x⁴e²ˣ', 'y_P = e²ˣ (1/(D − 2)²)(12x²)', 'y_P = 3x²e²ˣ']
    },
    answer: 0,
    feedback: {
      tr: 'D yerine D + 2 konulduğunda (D + 2 − 2)² = D² kalır. 12x² ifadesinin iki kez ardışık integrali 4x³ ve ardından x⁴ verir; böylece y_P = x⁴e²ˣ bulunur.',
      en: 'Replacing D with D + 2 reduces (D + 2 − 2)² to D². Integrating 12x² twice yields 4x³ and then x⁴, giving y_P = x⁴e²ˣ immediately.'
    },
    hints: {
      tr: ['Teorem 2’de e^{ax} sola geçerken D yerine ne yazılır?', '1/D² operatörü kaç kez integral almak demektir?'],
      en: ['What replaces D when e^{ax} moves to the left in Theorem 2?', 'How many integrations does 1/D² represent?']
    }
  },
  {
    title: { tr: 'Sinüzoidal D² → −β² kuralında kalan D terimi', en: 'Remaining D term in sinusoidal D² → −β² rule' },
    tag: 'TEOREM 3 / THEOREM 3',
    text: {
      tr: '[1 / (D² + D + 1)] sin 2x ifadesinde D² → −4 konulduktan sonra kalan 1 / (D − 3) operatörü nasıl rasyonelleştirilir?',
      en: 'In [1 / (D² + D + 1)] sin 2x, after substituting D² → −4, how is the remaining operator 1 / (D − 3) rationalized?'
    },
    choices: {
      tr: ['Pay ve payda (D + 3) eşleniği ile çarpılarak (D + 3)/(D² − 9) elde edilir ve tekrar D² → −4 konur', 'D yerine doğrudan −2 yazılır', 'Payda sıfır kabul edilip x ile çarpılır'],
      en: ['Multiply numerator and denominator by the conjugate (D + 3) to get (D + 3)/(D² − 9) and substitute D² → −4 again', 'Substitute −2 directly for D', 'Treat the denominator as zero and multiply by x']
    },
    answer: 0,
    feedback: {
      tr: 'Teorem 3 yalnızca çift kuvvet olan D² → −β² için geçerlidir. Paydadaki birinci derece D’yi yok etmek için (D + 3) eşleniğiyle çarpılır; payda D² − 9 → −4 − 9 = −13 sabitine dönüşür.',
      en: 'Theorem 3 applies only to even powers D² → −β². Multiplying by the conjugate (D + 3) turns the denominator into D² − 9 → −4 − 9 = −13.'
    },
    hints: {
      tr: ['D² oluşturmak için (D − 3) hangi çarpanla genişletilmelidir?', '(D − 3)(D + 3) çarpımı nedir?'],
      en: ['By what factor must (D − 3) be multiplied to create D²?', 'What is the product (D − 3)(D + 3)?']
    }
  },
  {
    title: { tr: 'Cauchy–Euler üçüncü türev özdeşliği', en: 'Cauchy–Euler third-derivative identity' },
    tag: 'CAUCHY–EULER / §4.4',
    text: {
      tr: 'x = e^z (z = ln x) ve 𝒟 = d/dz dönüşümü altında x³D³ operatörü aşağıdakilerden hangisine eşittir?',
      en: 'Under the substitution x = e^z (z = ln x) and 𝒟 = d/dz, what is the operator x³D³ equal to?'
    },
    choices: {
      tr: ['𝒟(𝒟 − 1)(𝒟 − 2) = 𝒟³ − 3𝒟² + 2𝒟', '𝒟³', '𝒟(𝒟 + 1)(𝒟 + 2)'],
      en: ['𝒟(𝒟 − 1)(𝒟 − 2) = 𝒟³ − 3𝒟² + 2𝒟', '𝒟³', '𝒟(𝒟 + 1)(𝒟 + 2)']
    },
    answer: 0,
    feedback: {
      tr: 'Genel kural x^k D^k = 𝒟(𝒟 − 1)⋯(𝒟 − k + 1) gereği k = 3 için x³D³ = 𝒟(𝒟 − 1)(𝒟 − 2) = 𝒟³ − 3𝒟² + 2𝒟 olur.',
      en: 'By the general identity x^k D^k = 𝒟(𝒟 − 1)⋯(𝒟 − k + 1), for k = 3 we have x³D³ = 𝒟(𝒟 − 1)(𝒟 − 2) = 𝒟³ − 3𝒟² + 2𝒟.'
    },
    hints: {
      tr: ['Genel düşen faktöriyel kuralında kaç çarpan vardır?', 'k = 3 için son çarpan (𝒟 − k + 1) ne olur?'],
      en: ['How many factors appear in the falling factorial identity?', 'For k = 3, what is the last factor (𝒟 − k + 1)?']
    }
  },
  {
    title: { tr: 'Cauchy–Euler katlı kök tabanı', en: 'Cauchy–Euler repeated-root basis' },
    tag: 'CAUCHY–EULER / §4.4',
    text: {
      tr: 'Bir Cauchy–Euler denkleminin z = ln x dönüşümü sonrası karakteristik denklemi (λ − 1)³ = 0 ise x > 0 için tamamlayıcı çözüm y_C(x) nedir?',
      en: 'If a Cauchy–Euler equation has characteristic equation (λ − 1)³ = 0 after setting z = ln x, what is the complementary solution y_C(x) for x > 0?'
    },
    choices: {
      tr: ['(C₀ + C₁ ln x + C₂ (ln x)²) x', '(C₀ + C₁ x + C₂ x²) x', 'C₀ x + C₁ x² + C₂ x³'],
      en: ['(C₀ + C₁ ln x + C₂ (ln x)²) x', '(C₀ + C₁ x + C₂ x²) x', 'C₀ x + C₁ x² + C₂ x³']
    },
    answer: 0,
    feedback: {
      tr: 'z değişkeninde çözüm (C₀ + C₁z + C₂z²)e^z biçimindedir. z = ln x ve e^z = x geri konulduğunda (C₀ + C₁ ln x + C₂(ln x)²)x elde edilir.',
      en: 'In z, the solution is (C₀ + C₁z + C₂z²)e^z. Substituting back z = ln x and e^z = x yields (C₀ + C₁ ln x + C₂(ln x)²)x.'
    },
    hints: {
      tr: ['Önce z değişkeninde p = 3 katlı kök çözümünü yaz.', 'Sonra z yerine ln x ve e^z yerine x koy.'],
      en: ['Write the p = 3 repeated-root solution in z first.', 'Then replace z with ln x and e^z with x.']
    }
  },
  {
    title: { tr: 'Başlangıç koşullarının uygulanma zamanı', en: 'Timing of initial conditions' },
    tag: 'STRATEJİ / STRATEGY',
    text: {
      tr: 'Homojen olmayan bir doğrusal diferansiyel denklemde y(x₀) = y₀, y′(x₀) = y₁ başlangıç koşulları hangi aşamada uygulanmalıdır?',
      en: 'At what stage should the initial conditions y(x₀) = y₀, y′(x₀) = y₁ be applied in a nonhomogeneous linear ODE?'
    },
    choices: {
      tr: ['Tamamlayıcı çözüm y_C ve özel çözüm y_P toplanıp y = y_C + y_P genel çözümü kurulduktan sonra', 'Yalnızca y_C bulunur bulunmaz, y_P hesaplanmadan önce', 'Yalnızca özel çözüm y_P üzerinde'],
      en: ['Only after combining y_C and y_P into the complete general solution y = y_C + y_P', 'Immediately on y_C alone, before computing y_P', 'On the particular solution y_P alone']
    },
    answer: 0,
    feedback: {
      tr: 'Başlangıç koşulları denklemin tam çözümü olan y(x) = y_C(x) + y_P(x) fonksiyonuna aittir. y_P(x₀) ve y_P′(x₀) değerleri genellikle sıfırdan farklı olduğu için koşulları yalnız y_C’ye uygulamak Cᵢ sabitlerini yanlış verir.',
      en: 'Initial conditions govern the total solution y(x) = y_C(x) + y_P(x). Because y_P(x₀) and y_P′(x₀) are generally nonzero, applying conditions to y_C alone produces wrong constants Cᵢ.'
    },
    hints: {
      tr: ['Denklemi sağlayan asıl fonksiyon yalnız y_C midir yoksa y_C + y_P mi?', 'y_P(x₀) sıfırdan farklıysa sabit denklemlerini etkiler mi?'],
      en: ['Does y_C alone satisfy the nonhomogeneous ODE, or does y_C + y_P?', 'If y_P(x₀) ≠ 0, does it shift the equations for the constants?']
    }
  }
];
