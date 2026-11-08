export const laplaceSystemsExtraQuestions = [
  {
    title: { tr: 's-uzayında Cramer kuralı formülasyonu', en: 'Cramer’s rule formulation in the s-domain' },
    tag: 'CRAMER KURALI / CRAMER’S RULE',
    text: {
      tr: 'Sabit katsayılı lineer bir diferansiyel sistem s-uzayında A(s) X(s) = B(s) formuna dönüştürüldüğünde, X_i(s) bileşeni Cramer kuralıyla nasıl bulunur?',
      en: 'When a linear differential system with constant coefficients is transformed to A(s) X(s) = B(s) in the s-domain, how is the component X_i(s) found via Cramer’s rule?'
    },
    choices: {
      tr: [
        'X_i(s) = Δ_i(s) / Δ(s), burada Δ(s) = det A(s) ve Δ_i(s) ilgili sütunun B(s) ile değiştirilmiş halidir',
        'X_i(s) = det A(s) · det B_i(s), iki determinantın cebirsel çarpımıdır',
        'X_i(s) = s · Δ_i(s) − x_i(0), türev kuralıyla ek bir çıkarma yapılır'
      ],
      en: [
        'X_i(s) = Δ_i(s) / Δ(s), where Δ(s) = det A(s) and Δ_i(s) has the i-th column replaced by B(s)',
        'X_i(s) = det A(s) · det B_i(s), the algebraic product of two determinants',
        'X_i(s) = s · Δ_i(s) − x_i(0), an additional subtraction is performed via the derivative rule'
      ]
    },
    answer: 0,
    feedback: {
      tr: 's-uzayında sistem cebirsel hale geldiğinden, klasik matris Cramer kuralı harfiyen geçerlidir: X_i(s) = Δ_i(s)/Δ(s). Başlangıç koşulları ve zorlama terimleri zaten B(s) sütun vektörünün içinde yer aldığından ek bir işlem gerekmez.',
      en: 'Because the system becomes purely algebraic in the s-domain, classical Cramer’s rule applies directly: X_i(s) = Δ_i(s)/Δ(s). Initial conditions and forcing terms are already contained inside the vector B(s).'
    },
    hints: {
      tr: [
        's-uzayında türevler artık birer cebirsel s çarpanıdır; sistem diferansiyel değil lineer cebirseldir.',
        'Lineer denklem sistemlerinde bilinmeyen değişken katsayı determinantlarının oranına eşittir.'
      ],
      en: [
        'Derivatives in the s-domain are algebraic multipliers s; the system is linear algebraic rather than differential.',
        'In linear algebraic systems, unknown variables equal ratios of component determinants to the system determinant.'
      ]
    }
  },
  {
    title: { tr: 'Başlangıç koşullarının entegrasyonu', en: 'Incorporation of initial conditions' },
    tag: 'BAŞLANGIÇ KOŞULLARI / INITIAL CONDITIONS',
    text: {
      tr: 'Operatör yöntemi ile Laplace dönüşümü yöntemi başlangıç koşullarını ele alma biçimi açısından nasıl karşılaştırılır?',
      en: 'How do the operator method and the Laplace transform method compare in their handling of initial conditions?'
    },
    choices: {
      tr: [
        'Laplace yöntemi L{ẋ} = sX(s) − x(0) kuralıyla koşulları doğrudan sağ tarafa gömer; operatör yöntemi ise önce 2N sabit üretip N fazlalığı sisteme koyarak eler',
        'Operatör yöntemi başlangıç koşullarını doğrudan gömer; Laplace yöntemi ise ters dönüşümden sonra keyfi sabitler üretir',
        'Her iki yöntem de başlangıç koşullarını aynı anda entegre eder ve tam olarak aynı sayıda keyfi sabit türetir'
      ],
      en: [
        'Laplace embeds conditions directly on the RHS via L{ẋ} = sX(s) − x(0); the operator method first produces 2N constants and eliminates N redundant ones by back-substitution',
        'The operator method embeds initial conditions directly; the Laplace transform produces arbitrary constants after inversion',
        'Both methods integrate initial conditions simultaneously and produce exactly the same number of arbitrary constants'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Laplace dönüşümünün en büyük pratik üstünlüğü, başlangıç koşullarını türev alma aşamasında doğrudan cebirsel sisteme dahil etmesidir. Böylece genel çözümde fazlalık sabitler oluşmaz ve eleme adımı gerekmez.',
      en: 'The foremost advantage of the Laplace transform is incorporating initial conditions into the algebraic system during differentiation. This prevents excess constants and avoids elimination steps.'
    },
    hints: {
      tr: [
        'Operatör yönteminde x ve y için ayrı skaler denklemler çözüldüğünde kaç sabit ortaya çıkıyordu?',
        'Laplace yönteminde ters dönüşüm yapıldığında geriye keyfi sabit kalır mı?'
      ],
      en: [
        'How many constants arose when solving separate scalar ODEs in the operator method?',
        'Does any arbitrary constant remain after taking the inverse Laplace transform?'
      ]
    }
  },
  {
    title: { tr: 'İkinci kaydırma teoremi ve gecikmeli zorlama', en: 'Second shifting theorem and delayed forcing' },
    tag: 'KAYDIRMA TEOREMİ / SHIFTING THEOREM',
    text: {
      tr: 'f(t − a) H(t − a) biçimindeki gecikmeli bir basamak fonksiyonunun Laplace dönüşümü nedir?',
      en: 'What is the Laplace transform of a delayed step function in the form f(t − a) H(t − a)?'
    },
    choices: {
      tr: [
        'e^(−as) F(s), burada F(s) = L{f(t)} ifadesidir',
        'e^(as) F(s), pozitif üstel çarpan oluşur',
        'F(s − a), frekans kayması gerçekleşir'
      ],
      en: [
        'e^(−as) F(s), where F(s) = L{f(t)}',
        'e^(as) F(s), a positive exponential multiplier is created',
        'F(s − a), a frequency shift takes place'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'İkinci kaydırma teoremine göre zaman ekseninde a kadar geciktirilmiş ve Heaviside fonksiyonuyla çarpılmış f(t - a)H(t - a) fonksiyonunun dönüşümü e^(-as)F(s) olur.',
      en: 'According to the second shifting theorem, delaying a function by a in time multiplied by Heaviside step H(t - a) transforms to e^(-as)F(s).'
    },
    hints: {
      tr: [
        'Zaman gecikmesi s-uzayında eksi işaretli üstel bir sönümleyici çarpan e^(-as) doğurur.',
        'F(s - a) birinci kaydırma teoremidir (zaman uzayında e^(at) ile çarpma).'
      ],
      en: [
        'Time delay produces a negative exponential factor e^(-as) in the s-domain.',
        'F(s - a) corresponds to the first shifting theorem (multiplying by e^(at) in time).'
      ]
    }
  },
  {
    title: { tr: 'Örnek 7.13 rampa fonksiyonu öteleme kuralı', en: 'Ramp function shift rule in Example 7.13' },
    tag: 'RAMPA ÖTELEME / RAMP SHIFT',
    text: {
      tr: '60t H(t − 1) zorlama fonksiyonunun doğru Laplace dönüşümünü almak için t değişkeni nasıl düzenlenmelidir?',
      en: 'How must the variable t be partitioned to evaluate the correct Laplace transform of 60t H(t − 1)?'
    },
    choices: {
      tr: [
        't = (t − 1) + 1 olarak yazılır; 60e^(−s) L{t + 1} = 60e^(−s)(1/s² + 1/s) elde edilir',
        't doğrudan t olarak bırakılır ve 60e^(−s) / s² yazılır',
        't = (t + 1) − 1 olarak yazılır ve 60e^(s)(1/s² − 1/s) bulunur'
      ],
      en: [
        'Write t = (t − 1) + 1; yielding 60e^(−s) L{t + 1} = 60e^(−s)(1/s² + 1/s)',
        'Leave t untouched and write 60e^(−s) / s²',
        'Write t = (t + 1) − 1 to obtain 60e^(s)(1/s² − 1/s)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'İkinci kaydırma teoremi L{g(t - a)H(t - a)} = e^(-as)G(s) formunu şart koşar. Fonksiyon t olduğundan f(t) = t - 1 + 1 yazılır, böylece g(t - 1) = (t - 1) + 1 tanımlanır ve g(t) = t + 1 fonksiyonunun dönüşümü alınır.',
      en: 'The second shifting theorem requires the form L{g(t - a)H(t - a)} = e^(-as)G(s). Writing t = (t - 1) + 1 defines g(t) = t + 1, whose transform is 1/s² + 1/s.'
    },
    hints: {
      tr: [
        'Heaviside basamağının argümanı (t - 1) olduğuna göre parantez içi de (t - 1) cinsinden olmalıdır.',
        't = (t - 1) + 1 özdeşliğini kullanın.'
      ],
      en: [
        'Because the Heaviside step argument is (t - 1), the accompanying function must be grouped in powers of (t - 1).',
        'Use the identity t = (t - 1) + 1.'
      ]
    }
  },
  {
    title: { tr: 'ZIR ve ZSR kavramsal ayrışması', en: 'Conceptual separation of ZIR and ZSR' },
    tag: 'ZIR VE ZSR / RESPONSE DECOMPOSITION',
    text: {
      tr: 'Bir lineer sistemin yanıtında Sıfır Giriş Yanıtı (ZIR) ile Sıfır Durum Yanıtı (ZSR) arasındaki temel fark nedir?',
      en: 'What is the fundamental distinction between the Zero-Input Response (ZIR) and Zero-State Response (ZSR)?'
    },
    choices: {
      tr: [
        'ZIR yalnızca başlangıç koşullarının (x₀, y₀) eseridir; ZSR ise başlangıç koşulları sıfır kabul edilerek yalnızca zorlama terimlerinin (f(t)) ürettiği yanıttır',
        'ZIR sistemin kalıcı durum yanıtıdır; ZSR ise sistemin geçici modudur',
        'ZIR yalnızca lineer olmayan sistemlerde tanımlıdır; ZSR ise doğrusal sistemlere özgüdür'
      ],
      en: [
        'ZIR arises purely from initial conditions (x₀, y₀); ZSR is produced strictly by external forcing (f(t)) under zero initial conditions',
        'ZIR represents steady-state response; ZSR represents transient modes',
        'ZIR is defined only for nonlinear systems; ZSR is exclusive to linear systems'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Süperpozisyon ilkesi uyarınca doğrusal sistemlerde x(t) = x_ZIR(t) + x_ZSR(t) ayrışımı geçerlidir. ZIR sistemin başlangıç enerjisiyle yaptığı serbest hareketi, ZSR ise sıfır başlangıç enerjisi altındaki zorlanmış hareketi temsil eder.',
      en: 'By superposition in linear systems, x(t) = x_ZIR(t) + x_ZSR(t). ZIR represents free motion driven by initial stored energy; ZSR represents forced response driven purely by external inputs with zero initial state.'
    },
    hints: {
      tr: [
        'ZIR: Zero-Input (giriş f(t) = 0 iken yanıt).',
        'ZSR: Zero-State (başlangıç durumu x(0) = 0 iken yanıt).'
      ],
      en: [
        'ZIR: Zero-Input (response when input f(t) = 0).',
        'ZSR: Zero-State (response when state x(0) = 0).'
      ]
    }
  },
  {
    title: { tr: 'Kutup sadeleşmesi ve uyarılmayan modlar', en: 'Pole cancellation and unexcited modes' },
    tag: 'KUTUP SADELEŞMESİ / POLE CANCELLATION',
    text: {
      tr: 'Örnek 7.13 ZIR hesabında Δ(s) = (s − 3)(s − 1)(s + 2) olmasına rağmen x_ZIR(t) neden yalnızca e^(3t) terimini içerir?',
      en: 'In Example 7.13 ZIR, although Δ(s) = (s − 3)(s − 1)(s + 2), why does x_ZIR(t) contain only the single e^(3t) term?'
    },
    choices: {
      tr: [
        'Paydaki Δ_x(s) determinantında 5(s − 1)(s + 2) çarpanı oluşarak paydadaki (s − 1)(s + 2) kutuplarını tam olarak sadeleştirir',
        's = 1 ve s = −2 kutupları gerçel olduğundan ters Laplace dönüşümü sırasında kaybolur',
        'Sistem ikinci mertebeden olduğu için 3. kök fiziksel olarak geçersizdir'
      ],
      en: [
        'The numerator Δ_x(s) contains 5(s − 1)(s + 2), canceling the denominator poles (s − 1)(s + 2) completely',
        'Because poles s = 1 and s = −2 are real, they vanish during inverse Laplace transformation',
        'Because the system is 2nd order in x, the 3rd root is physically inadmissible'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Belirli başlangıç koşulları altında (x(0)=5, ẋ(0)=15, y(0)=0) pay determinantı tam olarak (s - 1)(s + 2) çarpanını üretir. Bu cebirsel sıfır, sistem kutuplarını yok eder; böylece s = 1 ve s = -2 modları başlangıç koşulları tarafından uyarılmamış (unobservable/uncontrollable) kalır.',
      en: 'Under the specific initial conditions (x(0)=5, ẋ(0)=15, y(0)=0), the numerator determinant produces (s - 1)(s + 2). This algebraic cancellation leaves the modes s = 1 and s = -2 completely unexcited in the ZIR.'
    },
    hints: {
      tr: [
        'Δ_x(s) determinantını açtığınızda 5(s² + s - 2) çarpanını görürsünüz.',
        'Pay ve paydadaki ortak çarpanlar sadeleştiğinde yalnızca 5/(s - 3) kalır.'
      ],
      en: [
        'Expanding Δ_x(s) reveals 5(s² + s - 2) = 5(s - 1)(s + 2).',
        'Common factors in the numerator and denominator leave only 5/(s - 3).'
      ]
    }
  },
  {
    title: { tr: 'Bağlı türevlerde başlangıç koşulları', en: 'Initial conditions in coupled derivatives' },
    tag: 'BAĞLI TÜREVLER / COUPLED DERIVATIVES',
    text: {
      tr: 'a ẋ + b ẏ teriminin Laplace dönüşümü alındığında başlangıç koşulları cebirsel denkleme nasıl dahil edilir?',
      en: 'When taking the Laplace transform of a ẋ + b ẏ, how do initial conditions enter the algebraic equation?'
    },
    choices: {
      tr: [
        'a[sX(s) − x(0)] + b[sY(s) − y(0)] = (as)X + (bs)Y − [a x(0) + b y(0)]',
        's[aX(s) + bY(s)] − [x(0) + y(0)], katsayılar başlangıç değerlerine çarpılmaz',
        'a s X(s) + b s Y(s), başlangıç koşulları bağlı türevlerde ihmal edilir'
      ],
      en: [
        'a[sX(s) − x(0)] + b[sY(s) − y(0)] = (as)X + (bs)Y − [a x(0) + b y(0)]',
        's[aX(s) + bY(s)] − [x(0) + y(0)], coefficients do not scale initial values',
        'a s X(s) + b s Y(s), initial conditions are neglected in coupled derivatives'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Türevin Laplace dönüşümü doğrusaldır: L{ẋ} = sX(s) - x(0) ve L{ẏ} = sY(s) - y(0). Katsayılar doğrudan bu ifadelere dağıtıldığından sağ tarafa geçen başlangıç sabiti a x(0) + b y(0) olur.',
      en: 'The Laplace transform of derivatives is linear: L{ẋ} = sX(s) - x(0) and L{ẏ} = sY(s) - y(0). Distributing coefficients transfers [a x(0) + b y(0)] to the right-hand side.'
    },
    hints: {
      tr: [
        'Türev özelliğini her değişkene ayrı ayrı uygulayıp katsayılarla çarpın.',
        'x(0) terimi a ile, y(0) terimi b ile ölçeklenir.'
      ],
      en: [
        'Apply the derivative property to each variable individually, scaling by its coefficient.',
        'x(0) is scaled by a, and y(0) is scaled by b.'
      ]
    }
  },
  {
    title: { tr: 'Matris durum-uzayı rezolventi', en: 'State-space matrix resolvent' },
    tag: 'REZOLVENT MATRİSİ / RESOLVENT MATRIX',
    text: {
      tr: 'ẋ = A x + B f(t) durum-uzayı sisteminde Φ(s) = (sI − A)⁻¹ rezolvent matrisinin ters Laplace dönüşümü neyi verir?',
      en: 'In the state-space system ẋ = A x + B f(t), what does the inverse Laplace transform of the resolvent Φ(s) = (sI − A)⁻¹ yield?'
    },
    choices: {
      tr: [
        'Durum geçiş matrisi e^(At)',
        'Sistemin transfer fonksiyonu matrisi B⁻¹ A',
        'Karakteristik polinom det(sI − A)'
      ],
      en: [
        'The state transition matrix e^(At)',
        'The transfer function matrix B⁻¹ A',
        'The characteristic polynomial det(sI − A)'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Skaler sistemlerdeki 1/(s - a) dönüşümünün tersinin e^(at) olması gibi, matris sistemlerinde (sI - A)⁻¹ rezolventinin ters Laplace dönüşümü durum geçiş matrisi e^(At) üstel matrisine eşittir.',
      en: 'Just as L⁻¹{1/(s - a)} = e^(at) in scalar systems, the inverse Laplace transform of the matrix resolvent (sI - A)⁻¹ equals the matrix exponential e^(At), known as the state transition matrix.'
    },
    hints: {
      tr: [
        'Skaler 1/(s - a) teriminin ters Laplace dönüşümünü hatırlayın.',
        'Matris uzayında skaler üstel fonksiyonun dengi nedir?'
      ],
      en: [
        'Recall the inverse Laplace transform of the scalar 1/(s - a).',
        'What is the matrix analogue of the scalar exponential function?'
      ]
    }
  }
];
