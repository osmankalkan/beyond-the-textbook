export const systemsSummaryExtraQuestions = [
  {
    title: { tr: 'Mühendislik Titreşimlerinde Modal Ayrışma', en: 'Modal Decoupling in Engineering Vibrations' },
    tag: 'MODAL AYRIŞMA / MODAL DECOUPLING',
    text: {
      tr: 'M ẍ + K x = 0 kuple iki serbestlik dereceli yapı sisteminde mod şekilleri matrisi Φ ile x = Φ q koordinat dönüşümü yapıldığında sistem neden bağımsız osilatörlere ayrışır?',
      en: 'In an undamped 2-DOF structural system M ẍ + K x = 0, why does the coordinate transformation x = Φ q decouple the system into independent oscillators?'
    },
    choices: {
      tr: [
        'Mod şekilleri M ve K matrislerine göre ortogonal olduğundan Φᵀ M Φ ve Φᵀ K Φ matrisleri köşegenleşir',
        'Kütle matrisi daima birim matris I olarak seçilmek zorunda olduğu için',
        'Laplace dönüşümünün s parametresi kütle matrisini doğrudan sıfırladığı için'
      ],
      en: [
        'Because mode shapes are orthogonal with respect to M and K, diagonalizing Φᵀ M Φ and Φᵀ K Φ into diagonal matrices',
        'Because the mass matrix M must always be strictly chosen as the identity matrix I',
        'Because the s-parameter of the Laplace transform directly eliminates the mass matrix'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Mod şekilleri Φ = [v₁, v₂] özvektörlerinden oluşur ve genelleştirilmiş simetrik kütle ve rijitlik matrislerine göre ortogonaldir. Bu sayede kuple denklemler Mᵢ q̈ᵢ + Kᵢ qᵢ = 0 şeklinde tamamen bağımsız tek serbestlik dereceli (SDOF) denklemlere ayrışır.',
      en: 'Mode shapes Φ = [v₁, v₂] are orthogonal with respect to symmetric matrices M and K. Consequently, Φᵀ M Φ and Φᵀ K Φ become diagonal, decomposing the coupled equations into independent SDOF oscillators Mᵢ q̈ᵢ + Kᵢ qᵢ = 0.'
    },
    hints: {
      tr: [
        'Ortogonal vektörlerin kütle matrisi ağırlıklı iç çarpımını düşün.',
        'Köşegen bir matris kuple türevleri tamamen ayırır.'
      ],
      en: [
        'Consider the mass-weighted inner product of orthogonal mode shapes.',
        'A diagonal matrix separates coupled state variables completely.'
      ]
    }
  },
  {
    title: { tr: 'Süreksiz Basamak Zorlamasında Yöntem Tercihi', en: 'Method Preference for Piecewise Forcing' },
    tag: 'SÜREKSİZ ZORLAMA / PIECEWISE FORCING',
    text: {
      tr: 'Sağ tarafında f(t) = 10[H(t − 2) − H(t − 5)] şeklinde zaman gecikmeli dikdörtgen darbe içeren bir sistemde hangi yöntem aralık dikişi (boundary stitching) külfetini tamamen ortadan kaldırır?',
      en: 'For a system driven by a delayed rectangular pulse f(t) = 10[H(t − 2) − H(t − 5)], which method completely eliminates piecewise boundary value stitching?'
    },
    choices: {
      tr: [
        'Laplace dönüşümü yöntemi; ikinci kaydırma teoremi e^{-2s} - e^{-5s} terimleriyle tek analitik ifadede çözümü üretir',
        'Operatör yöntemi; diferansiyel operatör her aralık için ayrı ayrı bağımsız sabitler belirler',
        'Yalnızca sayısal Euler yöntemi çözebilir, analitik çözümü imkansızdır'
      ],
      en: [
        'The Laplace transform method; second shifting theorem produces unified response with e^{-2s} - e^{-5s} terms',
        'The operator method; differential operator establishes independent constants across piecewise intervals',
        'Only forward Euler numerical simulation can solve it; analytic solution is impossible'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Klasik operatör ve matris yöntemlerinde t < 2, 2 ≤ t < 5 ve t ≥ 5 olmak üzere üç ayrı bölgede çözüm yapılıp sınırlarda süreklilik dikişi yapılmalıdır. Oysa Laplace dönüşümü tüm süreksizlikleri frekans bölgesindeki üstel çarpanlarla tek formülde kapsar.',
      en: 'Classical operator and matrix methods require three separate interval solutions stitched together at boundary points. The Laplace transform encapsulates all discontinuities into frequency domain exponentials, yielding a single closed-form solution.'
    },
    hints: {
      tr: [
        'H(t - a) basamak fonksiyonunun Laplace dönüşümünü hatırla.',
        'Farklı zaman aralıklarında sınır koşulları eşlemek zaman kaybıdır.'
      ],
      en: [
        'Recall the Laplace transform of the step function H(t - a).',
        'Matching boundary conditions across distinct intervals is tedious.'
      ]
    }
  },
  {
    title: { tr: 'Katlı Dejenere Özdeğerlerde Jordan Zinciri', en: 'Jordan Chain in Repeated Defective Eigenvalues' },
    tag: 'DEJENERE ÖZDEĞER / DEFECTIVE EIGENVALUES',
    text: {
      tr: 'n=2 boyutlu bir matris sisteminde çift katlı özdeğer λ için tek bir bağımsız özvektör v₁ bulunmuşsa, ikinci bağımsız mod nasıl kurulur?',
      en: 'In a 2D matrix system where repeated eigenvalue λ has only one independent eigenvector v₁, how is the second independent mode formed?'
    },
    choices: {
      tr: [
        '(A − λI)v₂ = v₁ genelleştirilmiş özvektör denklemi çözülerek x₂(t) = e^(λt)(t v₁ + v₂) yazılır',
        'Doğrudan x₂(t) = t e^(λt) v₁ alınarak ikinci vektör ihmal edilir',
        'İkinci çözüm bulunamaz; sistem daima kararsızdır'
      ],
      en: [
        'By solving the generalized eigenvector equation (A − λI)v₂ = v₁ and forming x₂(t) = e^(λt)(t v₁ + v₂)',
        'By simply setting x₂(t) = t e^(λt) v₁, omitting the secondary vector',
        'A second solution cannot exist; the system is unconditionally unstable'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Skaler denklemlerdeki t e^(λt) çözümü matrislerde doğrudan çalışmaz; ẋ = A x denklemi türetildiğinde (A − λI)v₂ = v₁ bağıntısını sağlayan genelleştirilmiş bir v₂ vektörünün eklenmesi zorunludur: x₂(t) = e^(λt)(t v₁ + v₂).',
      en: 'The scalar pattern t e^(λt) does not apply directly to matrix systems; substituting into ẋ = A x mandates a generalized vector v₂ satisfying (A − λI)v₂ = v₁, forming x₂(t) = e^(λt)(t v₁ + v₂).'
    },
    hints: {
      tr: [
        'x₂(t) = e^(λt)(t v₁ + v₂) ifadesini ẋ = A x denklemine yerleştirip türev al.',
        'v₁ terimlerinin ve v₂ terimlerinin katsayılarını eşle.'
      ],
      en: [
        'Differentiate x₂(t) = e^(λt)(t v₁ + v₂) and substitute into ẋ = A x.',
        'Match coefficients of t and constant vectors.'
      ]
    }
  },
  {
    title: { tr: 'Operatör Yönteminde Cramer ve Ters Operatör Sırası', en: 'Operator Cramer Rule and Operator Precedence' },
    tag: 'OPERATÖR SIRASI / OPERATOR PRECEDENCE',
    text: {
      tr: 'Operatörlü sistemlerde Cramer kuralı ile Δ₁(t) pay determinantı hesaplanırken operatörlerin yazım sırası neden hayati önem taşır?',
      en: 'When computing the Cramer numerator determinant Δ₁(t) in operator systems, why is operator precedence vital?'
    },
    choices: {
      tr: [
        'Operatörler türev aldığından fonksiyonların soluna yazılmalıdır; D f(t) ≠ f(t) D olduğundan yer değişimi matematiksel anlamsızlığa veya hatalı türevlere yol açar',
        'Determinantın eksi işaretli çıkmasını engellemek için',
        'Operatörlerin sıralaması sonucu değiştirmez, çarpma tamamen değişmelidir'
      ],
      en: [
        'Operators represent differentiation and must precede functions; because D f(t) ≠ f(t) D, swapping leads to meaningless forms or erroneous derivatives',
        'To prevent the determinant from evaluating to a negative sign',
        'Operator ordering is irrelevant because operator multiplication is commutative'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Operatörler skaler sayılar değil, fonksiyonlar üzerinde etkiyen türev operatörleridir. Örneğin (D + 2) t = 1 + 2t iken t (D + 2) operatör anlamını yitirir. Bu nedenle Cramer determinantında operatör blokları daima zorlama fonksiyonlarının soluna konulmalıdır.',
      en: 'Differential operators act on functions from the left; (D + 2) t = 1 + 2t, whereas placing the operator to the right is non-commutative. Cramer determinant blocks must always place operators on the left of forcing terms.'
    },
    hints: {
      tr: [
        'D f(t) ifadesi f\'(t) türevidir.',
        'Operatör fonksiyonun sağına geçerse türev alınamaz.'
      ],
      en: [
        'D f(t) represents the derivative f\'(t).',
        'If the operator sits to the right of the function, it fails to differentiate.'
      ]
    }
  },
  {
    title: { tr: 'Temel Matris ve Parametrelerin Değişimi İntegrali', en: 'Fundamental Matrix & Variation of Parameters' },
    tag: 'TEMEL MATRİS / FUNDAMENTAL MATRIX',
    text: {
      tr: 'ẋ = A x + f(t) sisteminde X(t) temel matris olmak üzere, başlangıç koşulu x(t₀) = x₀ verildiğinde tek adımlı tam analitik çözüm formülü hangisidir?',
      en: 'For ẋ = A x + f(t) with fundamental matrix X(t) and initial condition x(t₀) = x₀, what is the single-step complete analytical solution formula?'
    },
    choices: {
      tr: [
        'x(t) = X(t) X⁻¹(t₀) x₀ + X(t) ∫_{t₀}^t X⁻¹(τ) f(τ) dτ',
        'x(t) = X(t) x₀ + ∫_{t₀}^t f(τ) dτ',
        'x(t) = e^(At) x₀ + X⁻¹(t) f(t)'
      ],
      en: [
        'x(t) = X(t) X⁻¹(t₀) x₀ + X(t) ∫_{t₀}^t X⁻¹(τ) f(τ) dτ',
        'x(t) = X(t) x₀ + ∫_{t₀}^t f(τ) dτ',
        'x(t) = e^(At) x₀ + X⁻¹(t) f(t)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Temel matris X(t) sütunlarında n adet bağımsız homojen çözüm içerir. X(t₀)⁻¹ x₀ terimi başlangıç koşulunu sağlayan homojen sabit vektörünü C belirler; integral terimi ise parametrelerin değişimiyle elde edilen özel çözümdür.',
      en: 'Columns of fundamental matrix X(t) are n linearly independent homogeneous solutions. X(t₀)⁻¹ x₀ determines the unique constant vector C satisfying initial state x₀; the integral term is the exact particular solution via variation of parameters.'
    },
    hints: {
      tr: [
        't = t₀ koyduğunda integralin sıfırlandığına ve x(t₀) = x₀ kaldığına dikkat et.',
        'X(t) X⁻¹(t) = I birim matristir.'
      ],
      en: [
        'Notice that at t = t₀ the integral vanishes, leaving x(t₀) = x₀.',
        'X(t) X⁻¹(t) equals the identity matrix I.'
      ]
    }
  },
  {
    title: { tr: 'Faz Portresi ve Kararlılık Sınıflandırması', en: 'Phase Portrait and Stability Classification' },
    tag: 'FAZ PORTRESİ / PHASE PORTRAIT',
    text: {
      tr: '2×2 homojen sistemde iz tr(A) < 0 ve determinant det(A) > 0 iken diskriminant Δ = [tr(A)]² − 4 det(A) < 0 ise faz portresindeki denge noktasının tipi ve kararlılığı nedir?',
      en: 'In a 2×2 homogeneous system with tr(A) < 0, det(A) > 0, and discriminant Δ = [tr(A)]² − 4 det(A) < 0, what is the type and stability of the equilibrium point?'
    },
    choices: {
      tr: [
        'Asimptotik kararlı sarmal odak (stable spiral sink); yörüngeler dönerek orijine yakınsar',
        'Kararsız düğüm (unstable node); yörüngeler orijinden dışa doğru yayılır',
        'Eyer noktası (saddle point); bir eksende yaklaşırken diğerinde uzaklaşır'
      ],
      en: [
        'Asymptotically stable spiral sink; trajectories spiral inward toward the origin',
        'Unstable node; trajectories radiate outward from the origin',
        'Saddle point; trajectories converge along one axis and diverge along another'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Δ < 0 olduğundan özdeğerler karmaşık eşleniktir (λ = α ± iβ). tr(A) = 2α < 0 olduğundan gerçel kısım negatiftir (α < 0). Negatif gerçel kısım genliğin e^(αt) ile sönümlenerek orijine çekilmesini, sanal kısım ise dönel salınımı garanti eder; bu bir kararlı sarmal odaktır (spiral sink).',
      en: 'Because Δ < 0, eigenvalues are complex conjugate (λ = α ± iβ). Since tr(A) = 2α < 0, the real part is negative (α < 0). A negative real part damps motion exponentially toward the origin while the imaginary part drives rotation, producing a stable spiral sink.'
    },
    hints: {
      tr: [
        'Diskriminant negatifse kökler gerçel midir yoksa karmaşık mı?',
        'İzin negatif olması köklerin gerçel kısmının işaretini nasıl etkiler?'
      ],
      en: [
        'If discriminant is negative, are eigenvalues real or complex?',
        'How does a negative trace dictate the sign of the real part of eigenvalues?'
      ]
    }
  },
  {
    title: { tr: 'Sayısal Doğrulama ve Kalıntı Vektörü E(t)', en: 'Numerical Residual Vector Verification' },
    tag: 'SAYISAL DOĞRULAMA / NUMERICAL RESIDUAL',
    text: {
      tr: 'Analitik olarak bulunan bir x(t) çözümünün diferansiyel denklem sistemini kusursuz sağladığı bilgisayarda nasıl denetlenir?',
      en: 'How is an analytically derived solution vector x(t) rigorously verified against the system differential equations computationally?'
    },
    choices: {
      tr: [
        'E(t) = ẋ(t) − A x(t) − f(t) kalıntı vektörü hesaplanır ve t aralığında ||E(t)|| normunun makine hassasiyetinde (< 10⁻¹²) kaldığı kontrol edilir',
        'Yalnızca başlangıç koşulu x(0) kontrol edilir, türev denklemine bakılmaz',
        'Denklemin determinantı sıfıra eşitlenerek kontrol edilir'
      ],
      en: [
        'The residual vector E(t) = ẋ(t) − A x(t) − f(t) is evaluated, confirming ||E(t)|| stays within machine precision (< 10⁻¹²)',
        'Only initial datum x(0) is tested, ignoring the differential equation',
        'The determinant is equated to zero to check validity'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Yalnızca başlangıç noktasını doğrulamak denklemin sağlandığını kanıtlamaz. Gerçek bir matematiksel ve mühendislik doğrulaması, analitik türevin matris çarpımı ve zorlama vektörüyle farkının (kalıntı vektörü E(t)) zaman ekseni boyunca sıfıra özdeş olduğunu denetlemeyi gerektirir.',
      en: 'Testing only initial conditions does not prove the ODE is satisfied. Rigorous engineering verification computes the residual vector E(t) = ẋ(t) − A x(t) − f(t) across the entire time horizon, confirming it evaluates to machine zero (< 10⁻¹²).'
    },
    hints: {
      tr: [
        'Kalıntı vektörü diferansiyel denklemin iki tarafının farkıdır.',
        'Sıfır kalıntı tam matematiksel sağlama demektir.'
      ],
      en: [
        'The residual vector is the difference between LHS and RHS of the ODE.',
        'A zero residual guarantees mathematical exactness.'
      ]
    }
  }
];
