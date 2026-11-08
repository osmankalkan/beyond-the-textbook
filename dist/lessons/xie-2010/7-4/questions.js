export const matrixSystemsExtraQuestions = [
  {
    title: { tr: 'Özdeğer spektrumu ve faz portresi kararlılığı', en: 'Eigenvalue spectrum and phase portrait stability' },
    tag: 'ÖZDEĞER SPEKTRUMU / EIGENVALUE SPECTRUM',
    text: {
      tr: 'Sabit katsayılı 2×2 bir sistemde ẋ = A x verildiğinde, matrisin determinantı det(A) < 0 ise faz portresindeki denge noktasının tipi ve kararlılığı nedir?',
      en: 'In a 2×2 system ẋ = A x with constant coefficients, if det(A) < 0, what is the type and stability of the equilibrium point in the phase portrait?'
    },
    choices: {
      tr: [
        'Eyer noktası (saddle point) ve kesinlikle kararsız; bir yönde çekilirken diğer yönde uzaklaşır',
        'Kararlı odak (stable spiral focus); tüm yörüngeler içe doğru sarmal çizerek orijine yaklaşır',
        'Nötr merkez (center); yörüngeler orijin etrafında kapalı periyodik elipsler oluşturur'
      ],
      en: [
        'Saddle point and unconditionally unstable; attracted along one ray while repelled along the other',
        'Stable spiral focus; all trajectories spiral inward toward the origin',
        'Neutral center; trajectories form closed periodic elliptical orbits around the origin'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Karakteristik denklem λ² − iz(A)λ + det(A) = 0 gereğince det(A) = λ₁λ₂ < 0 olduğunda özdeğerler zıt işaretli iki gerçel sayı (biri negatif, biri pozitif) olmak zorundadır. Negatif köke ait özvektör yönünde hareket orijine doğruyken, pozitif köke ait özvektör yönünde orijinden uzaklaşır; bu durum topolojik olarak kararsız bir eyer noktasıdır.',
      en: 'Because det(A) = λ₁λ₂ < 0 in λ² − tr(A)λ + det(A) = 0, the eigenvalues must be real and of opposite sign (one negative, one positive). Motion converges along the negative eigenvalue vector and diverges along the positive one, defining an unstable saddle point.'
    },
    hints: {
      tr: [
        'İki özdeğerin çarpımı matrisin determinantına eşittir (det A = λ₁ · λ₂).',
        'Çarpım negatifse köklerin biri negatif (çekici), diğeri pozitif (itici) olmak zorundadır.'
      ],
      en: [
        'The product of the eigenvalues equals the determinant (det A = λ₁ · λ₂).',
        'A negative product implies one negative eigenvalue (attracting) and one positive (repelling).'
      ]
    }
  },
  {
    title: { tr: 'Özvektör doğruları ve faz düzlemindeki geometrik anlamı', en: 'Eigenvector lines and phase plane geometry' },
    tag: 'ÖZVEKTÖR DOĞRULARI / EIGENVECTOR RAYS',
    text: {
      tr: 'A v = λ v koşulunu sağlayan bir özvektör doğrultusunda başlatılan bir yörünge (x(0) = c v) faz düzleminde nasıl davranır?',
      en: 'How does a trajectory initialized along an eigenvector direction (x(0) = c v satisfying A v = λ v) behave in the phase plane?'
    },
    choices: {
      tr: [
        'Doğrultusundan asla sapmaz; zaman boyunca bu düz doğru üzerinde kalarak e^(λt) ile ölçeklenir',
        'Hemen dairesel bir sarmal çizerek komşu özvektör doğrularına doğru sapar',
        'Önce bir yay çizer, ardından sonsuzda orijin koordinat eksenlerine teğet olur'
      ],
      en: [
        'Never deviates from its ray; remains on this straight line for all time, scaled by e^(λt)',
        'Immediately curves into a spiral toward adjacent eigenvector trajectories',
        'Bends into an arc before becoming tangent to the Cartesian axes at infinity'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Hız vektörü ẋ = A x = A(c v e^(λt)) = λ (c v e^(λt)) = λ x olduğundan, hız vektörü her an konum vektörüne tam paraleldir. Faz düzleminde konum ile hız aynı doğrultudaysa yörünge eğrilemez; doğrusal bir invariant ray (değişmez doğru) boyunca hareket eder.',
      en: 'Because ẋ = A x = A(c v e^(λt)) = λ (c v e^(λt)) = λ x, the velocity is strictly parallel to position at every instant. With colinear velocity and position, the trajectory cannot curve; it moves along an invariant straight line ray.'
    },
    hints: {
      tr: [
        'A matrisi özvektörü döndürmez, sadece λ katsayısıyla uzatır veya kısaltır.',
        'Hız vektörü her an konum vektörünün skalar bir katıysa yön değişimi olamaz.'
      ],
      en: [
        'The matrix A does not rotate the eigenvector; it merely scales it by λ.',
        'When velocity is colinear with position at all times, no turning curvature can occur.'
      ]
    }
  },
  {
    title: { tr: 'Karmaşık eşlenik özdeğerler ve gerçel çözüm tabanı', en: 'Complex conjugate eigenvalues and real solution bases' },
    tag: 'EŞLENİK KÖKLER / COMPLEX EIGENVALUES',
    text: {
      tr: 'Özdeğerler karmaşık eşlenik λ = α ± iβ ve özvektör v = u + i w olduğunda, diferansiyel denklem için sanal sayı içermeyen gerçel temel çözümler nasıl elde edilir?',
      en: 'When eigenvalues are complex conjugates λ = α ± iβ with eigenvector v = u + i w, how are purely real linearly independent solutions constructed?'
    },
    choices: {
      tr: [
        'Tek bir karmaşık çözümün gerçel ve sanal kısımları ayrılarak: x₁(t) = Re[e^(λt) v] ve x₂(t) = Im[e^(λt) v]',
        'Sanal kısım doğrudan sıfırlanıp yerine türevi konularak',
        'Yalnızca genlik değeri e^(αt) |v| alınarak tek bir skaler fonksiyona indirgenerek'
      ],
      en: [
        'By separating the real and imaginary parts of a single complex solution: x₁(t) = Re[e^(λt) v] and x₂(t) = Im[e^(λt) v]',
        'By discarding the imaginary part and substituting its first time derivative',
        'By reducing the system to scalar magnitude e^(αt) |v|'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'L[x] = ẋ − A x doğrusal gerçel bir operatör olduğundan, karmaşık bir çözüm w(t) = e^(λt) v için L[w] = 0 ise, gerçel ve sanal bileşenleri için de ayrı ayrı L[Re(w)] = 0 ve L[Im(w)] = 0 olmak zorundadır. Euler açılımı e^(αt)(cos βt + i sin βt)(u + i w) açılarak iki gerçel bağımsız çözüm üretilir.',
      en: 'Since the system operator L[x] = ẋ − A x is linear and real, satisfying L[w] = 0 for a complex solution implies L[Re(w)] = 0 and L[Im(w)] = 0 independently. Expanding via Euler’s formula e^(αt)(cos βt + i sin βt)(u + i w) yields two linearly independent real solutions.'
    },
    hints: {
      tr: [
        'Gerçel katsayılı diferansiyel denklemler karmaşık çözümlerin gerçel ve sanal kısımlarını ayrı ayrı korur.',
        'Euler bağıntısı e^(iβt) = cos(βt) + i sin(βt) gerçel katsayıları trigonometrik fonksiyonlara ayırır.'
      ],
      en: [
        'Real-coefficient differential operators preserve real and imaginary parts independently.',
        'Euler’s identity e^(iβt) = cos(βt) + i sin(βt) resolves complex phases into trigonometric components.'
      ]
    }
  },
  {
    title: { tr: 'Kusurlu matrisler ve genelleştirilmiş özvektör zinciri', en: 'Defective matrices and generalized eigenvector chains' },
    tag: 'KUSURLU MATRİSLER / DEFECTIVE MATRICES',
    text: {
      tr: 'Katlı özdeğeri olan 2×2 bir sistemde tek bir bağımsız özvektör v₁ varsa (kusurlu matris), ikinci bağımsız çözümde neden t e^(λt) v₁ teriminin yanına v₂ genelleştirilmiş özvektörü eklenmelidir?',
      en: 'For a 2×2 defective system with repeated eigenvalue λ and only one independent eigenvector v₁, why must a generalized eigenvector v₂ be added alongside t e^(λt) v₁?'
    },
    choices: {
      tr: [
        'Çünkü x = t e^(λt) v₁ türetildiğinde e^(λt) v₁ terimi doğar; bunu dengelemek için (A − λ I) v₂ = v₁ zincir vektörü gereklidir',
        'Çünkü matrisin determinantı sıfır olur ve tersi alınamaz',
        'Çünkü tekil matrislerde enerji korunum yasası ihlal edilir'
      ],
      en: [
        'Because differentiating x = t e^(λt) v₁ generates an extra e^(λt) v₁ term; balancing it requires (A − λ I) v₂ = v₁',
        'Because the determinant of the matrix vanishes and cannot be inverted',
        'Because energy conservation laws are violated in singular state spaces'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'x₂(t) = e^(λt)(t v₁ + v₂) denendiğinde: ẋ₂ = λ e^(λt)(t v₁ + v₂) + e^(λt) v₁ elde edilir. Sağ taraf ise A x₂ = e^(λt)(t A v₁ + A v₂) = e^(λt)(t λ v₁ + A v₂) olur. Eşitliğin her iki tarafındaki t e^(λt) terimleri A v₁ = λ v₁ sayesinde sadeleşirken, geriye kalan e^(λt) v₁ teriminin dengelenmesi için A v₂ = λ v₂ + v₁, yani (A − λ I) v₂ = v₁ şartı zorunlu hale gelir.',
      en: 'Substituting x₂(t) = e^(λt)(t v₁ + v₂) into ẋ₂ = A x₂: LHS = λ e^(λt)(t v₁ + v₂) + e^(λt) v₁, while RHS = e^(λt)(t A v₁ + A v₂). The secular terms t e^(λt) cancel via A v₁ = λ v₁, leaving e^(λt) v₁ on the left which requires A v₂ − λ v₂ = v₁, or (A − λ I) v₂ = v₁.'
    },
    hints: {
      tr: [
        'Çarpımın türevini hatırlayın: d/dt [t e^(λt)] = e^(λt) + λ t e^(λt). Fazladan gelen terimi dengeleyecek bir vektör lazımdır.',
        '(A − λ I) matrisini v₂ üzerine uyguladığınızda tam olarak v₁ özvektörünü üretmelidir.'
      ],
      en: [
        'Recall product rule: d/dt [t e^(λt)] = e^(λt) + λ t e^(λt). An auxiliary vector is needed to balance the derivative.',
        'Applying (A − λ I) to v₂ must yield the original eigenvector v₁.'
      ]
    }
  },
  {
    title: { tr: 'Temel matris X(t) ve sağladığı diferansiyel denklem', en: 'The fundamental matrix X(t) and its governing equation' },
    tag: 'TEMEL MATRİS / FUNDAMENTAL MATRIX',
    text: {
      tr: 'n adet doğrusal bağımsız çözüm vektöründen oluşturulan X(t) = [x₁(t), x₂(t), ..., x_n(t)] temel matrisi hangi matris diferansiyel denklemini sağlar?',
      en: 'What matrix differential equation does the fundamental matrix X(t) = [x₁(t), x₂(t), ..., x_n(t)] formed by n linearly independent solutions satisfy?'
    },
    choices: {
      tr: [
        'Ẋ(t) = A X(t) ve det X(t) ≠ 0',
        'Ẋ(t) = X(t) A + I ve det X(t) = 0',
        'Ẋ(t) = −Aᵀ X(t) ve det X(t) = 1'
      ],
      en: [
        'Ẋ(t) = A X(t) and det X(t) ≠ 0',
        'Ẋ(t) = X(t) A + I and det X(t) = 0',
        'Ẋ(t) = −Aᵀ X(t) and det X(t) = 1'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'X(t) matrisinin her bir sütunu ẋ_k = A x_k denklemini sağladığından, sütun bazında türev Ẋ = [ẋ₁, ẋ₂, ..., x_n] = [A x₁, A x₂, ..., A x_n] = A X(t) olur. Çözümler doğrusal bağımsız seçildiğinden Wronskian determinantı det X(t) hiçbir t anında sıfır olamaz.',
      en: 'Because every column satisfies ẋ_k = A x_k, column-wise differentiation gives Ẋ = [ẋ₁, ..., x_n] = [A x₁, ..., A x_n] = A X(t). Independence guarantees det X(t) ≠ 0 for all t.'
    },
    hints: {
      tr: [
        'Matris çarpımında A matrisi X’in her bir sütununa ayrı ayrı etki eder.',
        'Çözümler bağımsız olduğunda determinantın sıfırdan farklı kalması zorunludur.'
      ],
      en: [
        'Matrix multiplication distributes A across each individual column of X.',
        'Linear independence strictly ensures non-vanishing determinant.'
      ]
    }
  },
  {
    title: { tr: 'Parametrelerin değişimi formülündeki sadeleşme mekanizması', en: 'Cancellation mechanism in variation of parameters' },
    tag: 'PARAMETRELERİN DEĞİŞİMİ / VARIATION OF PARAMETERS',
    text: {
      tr: 'ẋ = A x + f(t) sistemi için özel çözüm x_P(t) = X(t) c(t) şeklinde arandığında, denklemde neden ċ(t) = X⁻¹(t) f(t) doğrudan elde edilir?',
      en: 'When seeking a particular solution x_P(t) = X(t) c(t) for ẋ = A x + f(t), why does the equation reduce directly to ċ(t) = X⁻¹(t) f(t)?'
    },
    choices: {
      tr: [
        'Ẋ(t) = A X(t) olduğundan çarpımın türevindeki Ẋ c terimi sağdaki A (X c) terimiyle özdeş olarak birbirini götürür',
        'c(t) sabit kabul edildiği için sol taraftaki türev sıfırlanır',
        'f(t) zorlama vektörü X(t) matrisinin bir özvektörü olmak zorunda olduğundan'
      ],
      en: [
        'Because Ẋ(t) = A X(t), the term Ẋ c in the product rule identically cancels A (X c) on the right side',
        'Because c(t) is assumed constant, causing the derivative on the left to vanish',
        'Because the forcing vector f(t) must be an eigenvector of X(t)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'ẋ_P = Ẋ c + X ċ ifadesi sisteme yazıldığında: Ẋ c + X ċ = A(X c) + f(t) olur. Temel matris tanımı gereği Ẋ = A X olduğundan (A X) c ile A(X c) birbirini tam yok eder. Geriye yalnızca X(t) ċ(t) = f(t) kalır; soldan X⁻¹(t) ile çarpılınca ċ(t) = X⁻¹(t) f(t) çıkar.',
      en: 'Substituting ẋ_P = Ẋ c + X ċ yields Ẋ c + X ċ = A(X c) + f(t). Because Ẋ = A X, the terms (A X) c and A(X c) cancel identically, leaving X(t) ċ(t) = f(t). Multiplying by X⁻¹(t) from the left isolates ċ(t) = X⁻¹(t) f(t).'
    },
    hints: {
      tr: [
        'Çarpım kuralını uygulayın: d/dt [X(t) c(t)] = Ẋ(t) c(t) + X(t) ċ(t).',
        'Homojen çözüm denklemini hatırlayın: Ẋ = A X.'
      ],
      en: [
        'Apply product rule: d/dt [X(t) c(t)] = Ẋ(t) c(t) + X(t) ċ(t).',
        'Recall the governing homogeneous equation: Ẋ = A X.'
      ]
    }
  },
  {
    title: { tr: 'Standart dışı sec t zorlaması ve logaritmik çözüm bileşenleri', en: 'Non-standard secant forcing and logarithmic components' },
    tag: 'SECANT ZORLAMASI / SECANT FORCING',
    text: {
      tr: 'Örnek 7.19’daki gibi f(t) = [sec t, 0]ᵀ zorlaması olan bir sistemde neden belirsiz katsayılar yöntemi uygulanamaz ve çözümde hangi fonksiyon doğar?',
      en: 'In a system with forcing f(t) = [sec t, 0]ᵀ (Example 7.19), why does undetermined coefficients fail, and what function naturally emerges in the solution?'
    },
    choices: {
      tr: [
        'sec t fonksiyonunun ardışık türevleri sonlu bir taban oluşturmaz; integralden ln|cos t| logaritmik terimi doğar',
        'sec t periyodik olmadığı için Laplace dönüşümü tanımsızdır',
        'Sistemin determinantı sıfırlandığı için rezonans sonsuza patlar'
      ],
      en: [
        'Successive derivatives of sec t do not form a finite basis; integration yields ln|cos t| logarithmic terms',
        'Because sec t is not periodic, its Laplace transform is undefined',
        'The system determinant vanishes, causing resonance divergence to infinity'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'sec t fonksiyonunun türevleri (sec t tan t, sec t tan² t + sec³ t, ...) sonlu bir fonksiyon kümesinde kapanmaz; bu yüzden belirsiz katsayılar yöntemi uygulanamaz. Parametrelerin değişimi yönteminde ise X⁻¹ f(t) çarpımından ∫ tan t dt terimleri gelir ve bu integraller doğrudan ln|cos t| fonksiyonunu üretir.',
      en: 'The derivative set of sec t (sec t tan t, sec t tan² t + sec³ t, ...) is infinite, precluding undetermined coefficients. In variation of parameters, X⁻¹ f(t) contains ∫ tan t dt, which evaluates exactly to −ln|cos t| and introduces logarithmic behavior.'
    },
    hints: {
      tr: [
        'Belirsiz katsayılar yöntemi yalnızca türevleri kendi içine kapanan fonksiyonlar (polinom, exp, sin/cos) için geçerlidir.',
        '∫ tan(t) dt integralinin sonucunu düşünün.'
      ],
      en: [
        'Undetermined coefficients is restricted to families whose derivatives close under differentiation (polynomials, exp, sin/cos).',
        'Recall the elementary integral of tan(t).'
      ]
    }
  },
  {
    title: { tr: 'Çok serbestlik dereceli yapılarda modal ayrışma', en: 'Modal decoupling in multi-DOF structural systems' },
    tag: 'MODAL AYRIŞMA / MODAL DECOUPLING',
    text: {
      tr: 'M ẍ + K x = 0 yapısal titreşim sisteminde, mod şekilleri matrisi Φ kullanılarak x = Φ q koordinat dönüşümü yapıldığında sistem neden n adet bağımsız harmonik osilatöre ayrışır?',
      en: 'In structural vibration M ẍ + K x = 0, why does the modal coordinate transformation x = Φ q decouple the system into n independent harmonic oscillators?'
    },
    choices: {
      tr: [
        'Çünkü mod şekilleri özvektörleri kütle matrisi M ve rijitlik matrisi K’ye göre birbirine diktir (ortogonaldir)',
        'Çünkü kütle matrisi daima birim matrise eşittir',
        'Çünkü ikinci türev operatörü birinci türeve dönüştürülmüştür'
      ],
      en: [
        'Because the mode shapes (eigenvectors) are mutually orthogonal with respect to mass matrix M and stiffness matrix K',
        'Because the mass matrix is always an identity matrix',
        'Because the second-order operator is converted to a first-order operator'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Genelleştirilmiş özdeğer probleminde (K − ω² M) φ = 0 simetrik M ve K matrisleri için farklı modlara ait mod şekilleri ortogonaldir: Φᵀ M Φ = M_gen (köşegen) ve Φᵀ K Φ = K_gen (köşegen). Denklem soldan Φᵀ ile çarpıldığında tüm çapraz kuplajlar sıfırlanır ve sistem q̈_i + ω_i² q_i = 0 şeklinde tamamen bağımsız tek serbestlik dereceli osilatörlere dönüşür.',
      en: 'In the generalized eigenvalue problem (K − ω² M) φ = 0 with symmetric M and K, distinct mode shapes are mutually orthogonal: Φᵀ M Φ = M_diag and Φᵀ K Φ = K_diag are purely diagonal. Pre-multiplying by Φᵀ completely eliminates cross-coupling, yielding n independent 1-DOF oscillators q̈_i + ω_i² q_i = 0.'
    },
    hints: {
      tr: [
        'Φ matrisinin sütunları sisteme ait özvektörlerdir.',
        'Özvektörlerin ortogonallik özelliği matrisleri aynı anda köşegenleştirir.'
      ],
      en: [
        'The columns of Φ are the structural mode shapes (eigenvectors).',
        'Orthogonality simultaneously diagonalizes both M and K.'
      ]
    }
  }
];
