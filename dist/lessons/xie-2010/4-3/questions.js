export const extraQuestions = [
  {
    title: { tr: 'D-operatörü Teorem 3: sinüzoidal sağ taraf (Örnek 4.22)', en: 'D-operator Theorem 3: sinusoidal forcing (Example 4.22)' },
    tag: 'ÖRNEK 4.22 / EXAMPLE 4.22',
    text: {
      tr: '(D² + 3D − 4)y = 6 sin 3x denkleminde y_P = [1/(D² + 3D − 4)](6 sin 3x) hesabı yapılırken Teorem 3’ün ilk adımı hangisidir?',
      en: 'When evaluating y_P = [1/(D² + 3D − 4)](6 sin 3x) for (D² + 3D − 4)y = 6 sin 3x, what is the first step of Theorem 3?'
    },
    choices: {
      tr: [
        'Yalnız D² yerine −3² = −9 yazarak paydayı 3D − 13 yapmak ve ardından (3D + 13) eşleniğiyle çarpmak',
        'Hem D² yerine −9 hem de D yerine 3 yazarak paydayı doğrudan sayıya çevirmek',
        'D yerine 3i yazıp gerçek kısmı almak'
      ],
      en: [
        'Replace only D² by −3² = −9 to get denominator 3D − 13, then multiply by the conjugate (3D + 13)',
        'Replace both D² by −9 and D by 3 to turn the denominator into a number immediately',
        'Replace D by 3i and take the real part'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'D²(sin 3x) = −9 sin 3x özdeşliği yalnız D²’nin çift kuvvetleri için geçerlidir; D(sin 3x) = 3 cos 3x olduğu için D yerine sabit sayı yazılamaz. Kalan 3D − 13 paydası (3D + 13) ile çarpılarak 9D² − 169 = −250 sayısına dönüştürülür.',
      en: 'The identity D²(sin 3x) = −9 sin 3x holds only for even powers of D; because D(sin 3x) = 3 cos 3x, D cannot be replaced by a scalar. Multiply the remaining 3D − 13 by (3D + 13) to get 9D² − 169 = −250.'
    },
    hints: {
      tr: ['sin 3x fonksiyonunun birinci türevi yine sin 3x midir, yoksa cos 3x mi?', 'a + bD biçimindeki operatör paydasını D²’ye çevirmek için hangi çarpan kullanılır?'],
      en: ['Is the first derivative of sin 3x a multiple of sin 3x, or cos 3x?', 'What factor converts a denominator a + bD into an expression in D²?']
    }
  },
  {
    title: { tr: 'Polinom sağ tarafta ters operatör serisi (Örnek 4.19)', en: 'Inverse operator series on polynomial forcing (Example 4.19)' },
    tag: 'ÖRNEK 4.19 / EXAMPLE 4.19',
    text: {
      tr: '1/(D² + D − 2) ters operatörünü x² polinomuna uygularken neden −(1/2)·[1 − (D/2 + D²/2)]⁻¹ = −(1/2)(1 + D/2 + (3/4)D² + ⋯) açılımını D² teriminde keseriz?',
      en: 'When applying 1/(D² + D − 2) to x², why do we truncate −(1/2)·[1 − (D/2 + D²/2)]⁻¹ = −(1/2)(1 + D/2 + (3/4)D² + ⋯) at the D² term?'
    },
    choices: {
      tr: [
        'Çünkü m = 2 dereceli x² polinomunun üçüncü ve daha yüksek mertebeden tüm türevleri sıfırdır (D³x² = 0)',
        'Çünkü diferansiyel denklemin mertebesi ikidir',
        'Çünkü D³ ve sonrası yakınsamaz'
      ],
      en: [
        'Because for the degree-2 polynomial x², all derivatives of order 3 and higher vanish identically (D³x² = 0)',
        'Because the order of the differential equation is two',
        'Because terms from D³ onward fail to converge'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Serinin nerede kesileceğini operatörün mertebesi değil, sağdaki polinomun derecesi m belirler. Dᵐ⁺¹(xᵐ) = 0 olduğundan D³(x²) = 0 olur ve D² sonrası tüm terimler sıfır verir.',
      en: 'Where to truncate the series is governed by the polynomial degree m, not the order of the ODE. Since Dᵐ⁺¹(xᵐ) = 0, we have D³(x²) = 0 and all terms beyond D² vanish.'
    },
    hints: {
      tr: ['x² fonksiyonunun üçüncü türevi nedir?', 'Sağ taraf x⁴ olsaydı seriyi hangi kuvvette keserdik?'],
      en: ['What is the third derivative of x²?', 'If the right side were x⁴, at which power of D would we truncate?']
    }
  },
  {
    title: { tr: 'Kaydırma ve Rezonans Teoremleri birlikte (Örnek 4.26)', en: 'Shift and Resonance Theorems combined (Example 4.26)' },
    tag: 'ÖRNEK 4.26 / EXAMPLE 4.26',
    text: {
      tr: '(D² + 4D + 13)y = e⁻²ˣ sin 3x denkleminde Teorem 2 ve Teorem 4 uygulandığında özel çözüm y_P ne olur?',
      en: 'When Theorems 2 and 4 are applied to (D² + 4D + 13)y = e⁻²ˣ sin 3x, what is the particular solution y_P?'
    },
    choices: {
      tr: [
        'y_P = −(1/6)x e⁻²ˣ cos 3x',
        'y_P = (1/6)x e⁻²ˣ sin 3x',
        'y_P = (1/9)e⁻²ˣ sin 3x'
      ],
      en: [
        'y_P = −(1/6)x e⁻²ˣ cos 3x',
        'y_P = (1/6)x e⁻²ˣ sin 3x',
        'y_P = (1/9)e⁻²ˣ sin 3x'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'φ(D) = (D + 2)² + 9 olduğundan Teorem 2 ile y_P = e⁻²ˣ [1/(D² + 9)] sin 3x = e⁻²ˣ Im{[1/(D² + 9)] e^{i3x}} yazılır. ψ(D) = D² + 9 için ψ(3i) = 0 ve ψ′(3i) = 6i olduğundan Teorem 4 ile Im{(x/6i) e^{i3x}} = −(x/6) cos 3x bulunur.',
      en: 'Since φ(D) = (D + 2)² + 9, Theorem 2 gives y_P = e⁻²ˣ [1/(D² + 9)] sin 3x = e⁻²ˣ Im{[1/(D² + 9)] e^{i3x}}. With ψ(D) = D² + 9, ψ(3i) = 0 and ψ′(3i) = 6i, Theorem 4 yields Im{(x/6i) e^{i3x}} = −(x/6) cos 3x.'
    },
    hints: {
      tr: ['e⁻²ˣ çarpanını sola kaydırınca (D + 2)² + 9 operatörü neye dönüşür?', 'Im(e^{i3x}/(6i)) ifadesinde 1/i = −i olduğunu kullan.'],
      en: ['What does (D + 2)² + 9 become after shifting e⁻²ˣ to the left?', 'Use 1/i = −i when taking Im(e^{i3x}/(6i)).']
    }
  },
  {
    title: { tr: 'Parametrelerin değişimi: yardımcı koşul ve sistem (§4.3.3)', en: 'Variation of parameters: auxiliary system (§4.3.3)' },
    tag: 'YÖNTEM / METHOD',
    text: {
      tr: 'a₂ y″ + a₁ y′ + a₀ y = F(x) denklemi için y = c₁(x)y₁(x) + c₂(x)y₂(x) parametrelerin değişimi yönteminde c₁′ ve c₂′ hangi sistemi sağlar?',
      en: 'In variation of parameters y = c₁(x)y₁(x) + c₂(x)y₂(x) for a₂ y″ + a₁ y′ + a₀ y = F(x), which system do c₁′ and c₂′ satisfy?'
    },
    choices: {
      tr: [
        'c₁′y₁ + c₂′y₂ = 0  ve  c₁′y₁′ + c₂′y₂′ = F(x)/a₂',
        'c₁′y₁ + c₂′y₂ = F(x)  ve  c₁′y₁′ + c₂′y₂′ = 0',
        'c₁′y₁ + c₂′y₂ = 0  ve  c₁′y₁′ + c₂′y₂′ = F(x) (a₂’ye bölmeden)'
      ],
      en: [
        'c₁′y₁ + c₂′y₂ = 0  and  c₁′y₁′ + c₂′y₂′ = F(x)/a₂',
        'c₁′y₁ + c₂′y₂ = F(x)  and  c₁′y₁′ + c₂′y₂′ = 0',
        'c₁′y₁ + c₂′y₂ = 0  and  c₁′y₁′ + c₂′y₂′ = F(x) (without dividing by a₂)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Birinci türevde c₁″, c₂″ terimlerinin doğmaması için c₁′y₁ + c₂′y₂ = 0 yardımcı koşulu seçilir. İkinci türev denkleme yerleştirilip baş katsayı a₂’ye bölündüğünde c₁′y₁′ + c₂′y₂′ = F(x)/a₂ elde edilir.',
      en: 'To prevent second derivatives c₁″, c₂″ from appearing, we impose the auxiliary condition c₁′y₁ + c₂′y₂ = 0. Substituting y″ into the ODE and dividing by the leading coefficient a₂ yields c₁′y₁′ + c₂′y₂′ = F(x)/a₂.'
    },
    hints: {
      tr: ['y′ içinde c₁′ ve c₂′ içeren toplam neye eşitlenir?', 'Denklemin baş katsayısı a₂ ≠ 1 ise sağ tarafa nasıl girer?'],
      en: ['What is the sum of terms containing c₁′ and c₂′ in y′ set equal to?', 'How does the leading coefficient a₂ ≠ 1 enter the right-hand side?']
    }
  },
  {
    title: { tr: 'Logaritmik sağ taraf ve yöntem seçimi (Örnek 4.28)', en: 'Logarithmic forcing and method selection (Example 4.28)' },
    tag: 'ÖRNEK 4.28 / EXAMPLE 4.28',
    text: {
      tr: 'y″ − 2y′ + y = eˣ ln x (x > 0) denklemi için özel çözüm y_P hangisidir?',
      en: 'What is the particular solution y_P of y″ − 2y′ + y = eˣ ln x (x > 0)?'
    },
    choices: {
      tr: [
        'y_P = x² eˣ ((1/2) ln x − 3/4)',
        'y_P = A x² eˣ ln x',
        'y_P = eˣ (x ln x − x)'
      ],
      en: [
        'y_P = x² eˣ ((1/2) ln x − 3/4)',
        'y_P = A x² eˣ ln x',
        'y_P = eˣ (x ln x − x)'
      ]
    },
    answer: 0,
    feedback: {
      tr: '(D − 1)²y = eˣ ln x denkleminde y = v(x) eˣ (veya parametrelerin değişimiyle y₁ = eˣ, y₂ = x eˣ) kullanıldığında v″(x) = ln x olur. İki kez kısmi integrasyonla v′ = x ln x − x ve v_P = (1/2)x² ln x − (3/4)x² bulunur.',
      en: 'For (D − 1)²y = eˣ ln x, setting y = v(x) eˣ (or using variation of parameters with y₁ = eˣ, y₂ = x eˣ) gives v″(x) = ln x. Integrating by parts twice yields v′ = x ln x − x and v_P = (1/2)x² ln x − (3/4)x².'
    },
    hints: {
      tr: ['(D − 1)²[v(x) eˣ] = eˣ D²v(x) = eˣ ln x eşitliğinden v″(x) nedir?', '∫ ln x dx = x ln x − x ifadesini bir kez daha integre et.'],
      en: ['From (D − 1)²[v(x) eˣ] = eˣ D²v(x) = eˣ ln x, what is v″(x)?', 'Integrate ∫ ln x dx = x ln x − x one more time.']
    }
  }
];
