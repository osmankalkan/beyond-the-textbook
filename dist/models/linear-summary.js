/** Pure diagnostic catalog and evaluation model for §4.5 linear ODE method selection & Cauchy–Euler reduction synthesis. */

export const LINEAR_METHODS = [
  {
    id: 'char-distinct',
    badge: '§4.2',
    category: 'homogeneous',
    name: {
      tr: 'Ayrık Gerçek / Hiperbolik Kökler',
      en: 'Distinct Real / Hyperbolic Roots'
    },
    formula: 'φ(λ)=0 ⇒ e^{λx}, cosh βx, sinh βx'
  },
  {
    id: 'char-complex',
    badge: '§4.2',
    category: 'homogeneous',
    name: {
      tr: 'Karmaşık Eşlenik ve Kutupsal Kökler',
      en: 'Complex Conjugate & Polar Roots'
    },
    formula: 'λ=α±iβ ⇒ e^{αx}(A cos βx + B sin βx)'
  },
  {
    id: 'char-repeated',
    badge: '§4.2',
    category: 'homogeneous',
    name: {
      tr: 'Katlı (Tekrarlı) Karakteristik Kökler',
      en: 'Repeated Characteristic Roots'
    },
    formula: '(D−a)^p y=0 ⇒ (C₀+⋯+C_{p−1}x^{p−1})e^{ax}'
  },
  {
    id: 'uc-standard',
    badge: '§4.3.1',
    category: 'general-euler',
    name: {
      tr: 'Belirsiz Katsayılar (Tablo 4.1)',
      en: 'Undetermined Coefficients (Table 4.1)'
    },
    formula: 'F(x)=e^{αx}P_k(x){cos,sin}βx'
  },
  {
    id: 'uc-resonance',
    badge: '§4.3.1',
    category: 'general-euler',
    name: {
      tr: 'Belirsiz Katsayılar + x^p Rezonans Çarpanı',
      en: 'Undetermined Coefficients + x^p Resonance'
    },
    formula: 'y_P = x^p · (normal deneme biçimi)'
  },
  {
    id: 'op-exp-thm1',
    badge: '§4.3.2',
    category: 'operator',
    name: {
      tr: 'D-Operatörü Teorem 1 (Üstel Yerine Koyma)',
      en: 'D-Operator Theorem 1 (Exponential Substitution)'
    },
    formula: '[1/φ(D)]e^{ax} = e^{ax}/φ(a), φ(a)≠0'
  },
  {
    id: 'op-shift-thm2',
    badge: '§4.3.2',
    category: 'operator',
    name: {
      tr: 'D-Operatörü Teorem 2 (Üstel Kaydırma ve Seriler)',
      en: 'D-Operator Theorem 2 (Shift & Series Expansion)'
    },
    formula: '[1/φ(D)][e^{ax}f(x)] = e^{ax}[1/φ(D+a)]f(x)'
  },
  {
    id: 'op-sin-thm3',
    badge: '§4.3.2',
    category: 'operator',
    name: {
      tr: 'D-Operatörü Teorem 3 (Sinüzoidal D² → −β²)',
      en: 'D-Operator Theorem 3 (Sinusoidal D² → −β²)'
    },
    formula: '[1/(φ₁(D²)+Dφ₂(D²))]sin βx, D²→−β²'
  },
  {
    id: 'op-res-thm4',
    badge: '§4.3.2',
    category: 'operator',
    name: {
      tr: 'D-Operatörü Teorem 4 (Sıfır Payda / Türev Kuralı)',
      en: 'D-Operator Theorem 4 (Zero Denominator / Derivative)'
    },
    formula: '[1/φ(D)]e^{ax} = x^p e^{ax} / φ^{(p)}(a)'
  },
  {
    id: 'variation-euler',
    badge: '§4.3.3 / §4.4',
    category: 'general-euler',
    name: {
      tr: 'Parametrelerin Değişimi / Cauchy–Euler (x=e^z)',
      en: 'Variation of Parameters / Cauchy–Euler (x=e^z)'
    },
    formula: 'c_i(x) sistemi veya x^k D^k = 𝒟(𝒟−1)⋯'
  }
];

export const LINEAR_CHALLENGE_CARDS = [
  {
    id: 'lcard-1',
    equation: "y''' − y'' − 4y' + 4y = 0",
    order: 3,
    rhsType: {
      tr: 'Homojen (F(x) = 0)',
      en: 'Homogeneous (F(x) = 0)'
    },
    correctMethod: 'char-distinct',
    tag: 'AYRIK KÖKLER / DISTINCT ROOTS',
    firstMove: {
      tr: 'Karakteristik polinomu gruplayarak çarpanlara ayır: λ²(λ−1) − 4(λ−1) = (λ−1)(λ−2)(λ+2) = 0.',
      en: 'Factor the characteristic polynomial by grouping: λ²(λ−1) − 4(λ−1) = (λ−1)(λ−2)(λ+2) = 0.'
    },
    reducedForm: {
      tr: 'y = C₁eˣ + C₂e²ˣ + C₃e⁻²ˣ  (veya C₁eˣ + A cosh 2x + B sinh 2x)',
      en: 'y = C₁eˣ + C₂e²ˣ + C₃e⁻²ˣ  (or C₁eˣ + A cosh 2x + B sinh 2x)'
    },
    trap: {
      tr: 'Simetrik λ = ±2 kök çiftini kaçırıp eksik sabit yazma; sonlu aralıklarda sınır koşulları için cosh 2x ve sinh 2x tabanı çok daha pratiktir.',
      en: 'Do not miss the symmetric root pair λ = ±2; on finite intervals, the cosh 2x and sinh 2x basis is much cleaner for boundary conditions.'
    },
    why: {
      tr: 'Sabit katsayılı homojen denklemde karakteristik polinom birbirinden farklı 3 gerçek kök (λ = 1, 2, −2) üretir.',
      en: 'In this constant-coefficient homogeneous ODE, the characteristic polynomial yields 3 distinct real roots (λ = 1, 2, −2).'
    }
  },
  {
    id: 'lcard-2',
    equation: "(D² + 2D + 5)y = 0",
    order: 2,
    rhsType: {
      tr: 'Homojen · Sönümlü Salınım',
      en: 'Homogeneous · Damped Oscillation'
    },
    correctMethod: 'char-complex',
    tag: 'KARMAŞIK EŞLENİK / COMPLEX ROOTS',
    firstMove: {
      tr: 'Tam kareye tamamla: (λ + 1)² + 4 = 0 ⇒ λ = −1 ± 2i (α = −1, β = 2).',
      en: 'Complete the square: (λ + 1)² + 4 = 0 ⇒ λ = −1 ± 2i (α = −1, β = 2).'
    },
    reducedForm: {
      tr: 'y = e⁻ˣ(A cos 2x + B sin 2x) = C e⁻ˣ cos(2x − Φ)',
      en: 'y = e⁻ˣ(A cos 2x + B sin 2x) = C e⁻ˣ cos(2x − Φ)'
    },
    trap: {
      tr: 'Gerçek kısım α = −1 üstel zarfa (e⁻ˣ), sanal kısım β = 2 ise trigonometrik argümana (cos 2x, sin 2x) gider; ikisini asla yer değiştirme.',
      en: 'The real part α = −1 goes into the exponential envelope (e⁻ˣ) and β = 2 into the trig argument (cos 2x, sin 2x); never swap them.'
    },
    why: {
      tr: 'Diskriminant Δ = 4 − 20 = −16 < 0 olduğundan kökler karmaşık eşleniktir ve Euler formülüyle gerçel salınım tabanına çevrilir.',
      en: 'Because the discriminant Δ = 4 − 20 = −16 < 0, the roots are complex conjugates and combine via Euler’s formula into real damped oscillations.'
    }
  },
  {
    id: 'lcard-3',
    equation: "(D³ − 3D² + 3D − 1)y = 0",
    order: 3,
    rhsType: {
      tr: 'Homojen · Tam Küp Operatör',
      en: 'Homogeneous · Perfect Cube Operator'
    },
    correctMethod: 'char-repeated',
    tag: 'KATLI KÖKLER / REPEATED ROOTS',
    firstMove: {
      tr: 'Operatörü (D − 1)³y = 0 olarak tanı; λ = 1 kökü p = 3 katlıdır.',
      en: 'Recognize the operator as (D − 1)³y = 0; the root λ = 1 has multiplicity p = 3.'
    },
    reducedForm: {
      tr: 'y = (C₀ + C₁x + C₂x²)eˣ',
      en: 'y = (C₀ + C₁x + C₂x²)eˣ'
    },
    trap: {
      tr: '3. mertebe denklemde yalnızca C₀eˣ veya (C₀ + C₁x)eˣ yazıp x²eˣ terimini unutmak doğrusal bağımsız çözüm sayısını düşürür.',
      en: 'Writing only C₀eˣ or (C₀ + C₁x)eˣ in a 3rd-order ODE omits the x²eˣ term and loses a linearly independent solution.'
    },
    why: {
      tr: 'Karakteristik kök p = 3 kez tekrarlandığından üstel kaydırma D³(e⁻ˣy) = 0 denklemi p−1 = 2. dereceden bir polinom çarpanı üretir.',
      en: 'Because the characteristic root repeats p = 3 times, the exponential shift D³(e⁻ˣy) = 0 produces a polynomial factor of degree p−1 = 2.'
    }
  },
  {
    id: 'lcard-4',
    equation: "y'' + 3y' + 2y = 4x²",
    order: 2,
    rhsType: {
      tr: 'Polinom Zorlama P₂(x)',
      en: 'Polynomial Forcing P₂(x)'
    },
    correctMethod: 'uc-standard',
    tag: 'BELİRSİZ KATSAYILAR / UNDETERMINED COEFF.',
    firstMove: {
      tr: 'λ = 0 karakteristik kök değildir (a₀ = 2 ≠ 0). y_P = Ax² + Bx + C tam ikinci derece polinomunu dene.',
      en: 'λ = 0 is not a characteristic root (a₀ = 2 ≠ 0). Propose the full quadratic trial y_P = Ax² + Bx + C.'
    },
    reducedForm: {
      tr: '2Ax² + (6A+2B)x + (2A+3B+2C) = 4x² ⇒ y_P = 2x² − 6x + 7',
      en: '2Ax² + (6A+2B)x + (2A+3B+2C) = 4x² ⇒ y_P = 2x² − 6x + 7'
    },
    trap: {
      tr: 'Sağ tarafta x ve sabit terim görünmüyor diye deneme çözümünde Bx + C terimlerini atlamak katsayı eşitliğini imkansız kılar.',
      en: 'Omitting Bx + C from the trial just because x and the constant are absent on the RHS makes matching derivatives impossible.'
    },
    why: {
      tr: 'Sağ taraf basit bir polinomdur ve λ = 0 kök değildir; Tablo 4.1’deki standart polinom denemesi doğrudan çalışır.',
      en: 'The RHS is a simple polynomial and λ = 0 is not a root; the standard polynomial trial from Table 4.1 works directly.'
    }
  },
  {
    id: 'lcard-5',
    equation: "y'' − 4y' + 4y = 6e²ˣ",
    order: 2,
    rhsType: {
      tr: 'Çift Katlı Kök Rezonansı',
      en: 'Double-Root Resonance'
    },
    correctMethod: 'uc-resonance',
    tag: 'x^p REZONANS / x^p RESONANCE',
    firstMove: {
      tr: 'φ(λ) = (λ − 2)² = 0 olduğundan α = 2 çift katlı köktür (p = 2). Normal Ae²ˣ denemesini x² ile çarp: y_P = Ax²e²ˣ.',
      en: 'Since φ(λ) = (λ − 2)² = 0, α = 2 is a double root (p = 2). Multiply the normal Ae²ˣ trial by x²: y_P = Ax²e²ˣ.'
    },
    reducedForm: {
      tr: 'y_C = (C₀ + C₁x)e²ˣ,   y_P = 3x²e²ˣ',
      en: 'y_C = (C₀ + C₁x)e²ˣ,   y_P = 3x²e²ˣ'
    },
    trap: {
      tr: 'Önce y_C’yi bulmadan y_P = Ae²ˣ veya Axe²ˣ denemek sol tarafı sıfır yapar (0 = 6e²ˣ çelişkisi).',
      en: 'Trying y_P = Ae²ˣ or Axe²ˣ without checking y_C first annihilates the LHS (yielding the contradiction 0 = 6e²ˣ).'
    },
    why: {
      tr: 'Sağ taraftaki e²ˣ terimi homojen çözüm kümesinde p = 2 katlı olarak yer alır; çakışmayı kırmak için x² çarpanı zorunludur.',
      en: 'The forcing e²ˣ appears in the homogeneous solution with multiplicity p = 2; the factor x² is required to clear the resonance.'
    }
  },
  {
    id: 'lcard-6',
    equation: "(D³ + 2D² − D − 2)y = 12e³ˣ",
    order: 3,
    rhsType: {
      tr: 'Rezonanssız Saf Üstel e^{ax}',
      en: 'Non-Resonant Pure Exponential e^{ax}'
    },
    correctMethod: 'op-exp-thm1',
    tag: 'D-OPERATÖRÜ TEOREM 1 / THEOREM 1',
    firstMove: {
      tr: 'D yerine doğrudan a = 3 koy: φ(3) = 3³ + 2(3²) − 3 − 2 = 27 + 18 − 5 = 40 ≠ 0.',
      en: 'Substitute D → a = 3 directly: φ(3) = 3³ + 2(3²) − 3 − 2 = 27 + 18 − 5 = 40 ≠ 0.'
    },
    reducedForm: {
      tr: 'y_P = [1 / φ(3)] 12e³ˣ = (12 / 40)e³ˣ = (3 / 10)e³ˣ',
      en: 'y_P = [1 / φ(3)] 12e³ˣ = (12 / 40)e³ˣ = (3 / 10)e³ˣ'
    },
    trap: {
      tr: 'Payda φ(a) ≠ 0 kontrolünü yapmadan bölmek; eğer φ(a) = 0 çıkarsa Teorem 1 durur ve Teorem 4’e geçilir.',
      en: 'Dividing without checking φ(a) ≠ 0; if φ(a) = 0, Theorem 1 fails and you must switch to Theorem 4.'
    },
    why: {
      tr: 'Sağ taraf saf e^{ax} üstelidir ve φ(3) = 40 ≠ 0’dır. Teorem 1 özel çözümü türev almadan 5 saniyede verir.',
      en: 'The RHS is a pure exponential e^{ax} with φ(3) = 40 ≠ 0. Theorem 1 delivers y_P in 5 seconds without taking derivatives.'
    }
  },
  {
    id: 'lcard-7',
    equation: "(D − 2)²y = 12x²e²ˣ",
    order: 2,
    rhsType: {
      tr: 'Üstel × Polinom Çarpımı e^{ax}P_k(x)',
      en: 'Exponential × Polynomial Product e^{ax}P_k(x)'
    },
    correctMethod: 'op-shift-thm2',
    tag: 'D-OPERATÖRÜ TEOREM 2 / SHIFT THEOREM 2',
    firstMove: {
      tr: 'e²ˣ çarpanını ters operatörün soluna çek ve D → D + 2 kaydırması yap: y_P = e²ˣ [1 / D²](12x²).',
      en: 'Pull e²ˣ to the left of the inverse operator and shift D → D + 2: y_P = e²ˣ [1 / D²](12x²).'
    },
    reducedForm: {
      tr: 'y_P = e²ˣ ∫∫ 12x² dx dx = e²ˣ (x⁴) = x⁴e²ˣ',
      en: 'y_P = e²ˣ ∫∫ 12x² dx dx = e²ˣ (x⁴) = x⁴e²ˣ'
    },
    trap: {
      tr: 'Belirsiz katsayılarda x²(Ax² + Bx + C)e²ˣ açılımının ikinci türevini almak çok uzundur; üstel kaydırma işlemi iki ardışık integrale indirger.',
      en: 'Differentiating x²(Ax² + Bx + C)e²ˣ twice in undetermined coefficients is tedious; exponential shift reduces it to two simple integrations.'
    },
    why: {
      tr: 'Sağ taraf e^{ax}f(x) çarpımıdır ve D → D + 2 kaydırması (D − 2)² operatörünü saf D² integratörüne dönüştürür.',
      en: 'The RHS is a product e^{ax}f(x) and shifting D → D + 2 turns (D − 2)² into a pure double integrator D².'
    }
  },
  {
    id: 'lcard-8',
    equation: "(D² + D + 1)y = 10 sin 2x",
    order: 2,
    rhsType: {
      tr: 'Sinüzoidal Zorlama sin βx',
      en: 'Sinusoidal Forcing sin βx'
    },
    correctMethod: 'op-sin-thm3',
    tag: 'D-OPERATÖRÜ TEOREM 3 / SINUSOIDAL D² → −β²',
    firstMove: {
      tr: 'Yalnızca çift kuvvetlerde D² → −2² = −4 koy: y_P = [1 / (D − 3)] 10 sin 2x. Ardından (D + 3) eşleniğiyle çarp.',
      en: 'Replace only even powers D² → −2² = −4: y_P = [1 / (D − 3)] 10 sin 2x. Then multiply by the conjugate (D + 3).'
    },
    reducedForm: {
      tr: 'y_P = [(D + 3) / (D² − 9)] 10 sin 2x = [1 / (−4 − 9)](20 cos 2x + 30 sin 2x) = −(20/13)cos 2x − (30/13)sin 2x',
      en: 'y_P = [(D + 3) / (D² − 9)] 10 sin 2x = [1 / (−4 − 9)](20 cos 2x + 30 sin 2x) = −(20/13)cos 2x − (30/13)sin 2x'
    },
    trap: {
      tr: 'Birinci türev operatörü D’nin yerine de −β koymaya çalışmak! Kural yalnızca D² → −β² içindir; kalan D eşlenikle (D² − 9) yapılarak yok edilir.',
      en: 'Never substitute −β for the first-order D! The rule applies strictly to D² → −β²; eliminate remaining D by multiplying by the conjugate.'
    },
    why: {
      tr: 'Sinüzoidal zorlamada D²(sin βx) = −β² sin βx özdeşliği 2x2 denklem sistemi çözmeden doğrudan trigonometrik yanıtı verir.',
      en: 'For sinusoidal forcing, D²(sin βx) = −β² sin βx yields the trigonometric response directly without solving a 2×2 algebraic system.'
    }
  },
  {
    id: 'lcard-9',
    equation: "(D² − 4D + 4)y = 2e²ˣ",
    order: 2,
    rhsType: {
      tr: 'Sıfır Payda φ(a) = 0 Durumu',
      en: 'Zero Denominator φ(a) = 0 Case'
    },
    correctMethod: 'op-res-thm4',
    tag: 'D-OPERATÖRÜ TEOREM 4 / ZERO DENOMINATOR',
    firstMove: {
      tr: 'φ(D) = (D − 2)² için φ(2) = 0 ve φ′(2) = 0, fakat φ″(2) = 2 ≠ 0 (p = 2). Teorem 4 türev formülünü uygula.',
      en: 'For φ(D) = (D − 2)², φ(2) = 0 and φ′(2) = 0, while φ″(2) = 2 ≠ 0 (p = 2). Apply the Theorem 4 derivative formula.'
    },
    reducedForm: {
      tr: 'y_P = 2 · [x² e²ˣ / φ″(2)] = 2 · (x² e²ˣ / 2) = x²e²ˣ',
      en: 'y_P = 2 · [x² e²ˣ / φ″(2)] = 2 · (x² e²ˣ / 2) = x²e²ˣ'
    },
    trap: {
      tr: 'Paydadaki φ^{(p)}(a) = p! faktöriyel çarpanını unutarak y_P = 2x²e²ˣ yazmak.',
      en: 'Forgetting the denominator factor φ^{(p)}(a) = p! and erroneously writing y_P = 2x²e²ˣ.'
    },
    why: {
      tr: 'Saf üstel zorlamada φ(a) = 0 olduğunda Teorem 4 (polinomun p. türevi) hiçbir belirsiz katsayı denklemi kurmadan cevabı tek satırda verir.',
      en: 'When φ(a) = 0 for a pure exponential RHS, Theorem 4 (p-th derivative of φ) gives the exact coefficient in one line with zero algebra.'
    }
  },
  {
    id: 'lcard-10',
    equation: "(x²D² − 2xD + 2)y = x(ln x)³   (x > 0)",
    order: 2,
    rhsType: {
      tr: 'Değişken Katsayılı Cauchy–Euler',
      en: 'Variable-Coefficient Cauchy–Euler'
    },
    correctMethod: 'variation-euler',
    tag: 'CAUCHY–EULER (x = e^z) / §4.4',
    firstMove: {
      tr: 'Katsayılar x^k D^k eş-boyutlu yapısındadır! x = e^z (z = ln x) ve 𝒟 = d/dz dönüşümüyle x²D² = 𝒟(𝒟 − 1) koy.',
      en: 'Coefficients match the equidimensional x^k D^k form! Substitute x = e^z (z = ln x) and x²D² = 𝒟(𝒟 − 1) where 𝒟 = d/dz.'
    },
    reducedForm: {
      tr: '(𝒟² − 3𝒟 + 2)y = z³e^z ⇒ y = C₁x + C₂x² − x[(ln x)⁴/4 + (ln x)³ + 3(ln x)² + 6 ln x]',
      en: '(𝒟² − 3𝒟 + 2)y = z³e^z ⇒ y = C₁x + C₂x² − x[(ln x)⁴/4 + (ln x)³ + 3(ln x)² + 6 ln x]'
    },
    trap: {
      tr: 'Değişken katsayılı denkleme doğrudan φ(λ) = x²λ² − 2xλ + 2 karakteristik polinomu yazmaya kalkmak ölümcül hatadır; önce z = ln x ile sabit katsayıya inilmelidir.',
      en: 'Attempting to write φ(λ) = x²λ² − 2xλ + 2 directly for a variable-coefficient ODE is a fatal error; you must first reduce to constant coefficients in z = ln x.'
    },
    why: {
      tr: 'Her terimde x’in kuvveti türev mertebesine eşittir (Cauchy–Euler). x = e^z dönüşümü denklemi z değişkeninde sabit katsayılı hale getirir.',
      en: 'The power of x matches the derivative order in every term (Cauchy–Euler). Setting x = e^z converts the ODE to constant coefficients in z.'
    }
  }
];

export function evaluateLinearDiagnostic(cardId, selectedMethodId) {
  const card = LINEAR_CHALLENGE_CARDS.find(c => c.id === cardId);
  if (!card) throw new RangeError(`Unknown linear challenge card: ${cardId}`);
  const isCorrect = card.correctMethod === selectedMethodId;
  const selectedMethod = LINEAR_METHODS.find(m => m.id === selectedMethodId);
  const correctMethod = LINEAR_METHODS.find(m => m.id === card.correctMethod);

  return {
    isCorrect,
    selectedMethod,
    correctMethod,
    firstMove: card.firstMove,
    reducedForm: card.reducedForm,
    trap: card.trap,
    why: card.why
  };
}
