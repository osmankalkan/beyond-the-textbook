import {matrixSystemsExtraQuestions} from './questions.js';
import {matrixSystemsStudy, matrixSystemsClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const matrixSystemsLesson = {
  id: 'xie-2010:7.4',
  section: '7.4',
  chapterNumber: '07',
  chapterTitle: text('Doğrusal diferansiyel denklem sistemleri', 'Systems of Linear Differential Equations'),
  title: text('Matris yöntemi: özdeğerler, özvektörler, temel matris ve parametrelerin değişimi', 'The matrix method: eigenvalues, eigenvectors, fundamental matrix, and variation of parameters'),
  englishTitle: 'The Matrix Method: Eigenvalues, Eigenvectors, Fundamental Matrix, and Variation of Parameters',
  subtitle: text(
    'Diferansiyel sistemleri matris-vektör uzayında geometrik ve cebirsel olarak çözme: özdeğer spektrumu, değişmez özvektör doğruları, karmaşık eşlenik sarmal odakları, kusurlu matrislerde genelleştirilmiş özvektör zincirleri, temel matris X(t) evirtimi, sec t standart dışı zorlamaları ve çok serbestlik dereceli modal ayrışma.',
    'Solving differential systems geometrically and algebraically in matrix-vector space: eigenvalue spectra, invariant straight-line eigenvector rays, complex conjugate spiral foci, generalized eigenvector chains for defective matrices, fundamental matrix X(t) inversion, non-standard secant forcing, and multi-DOF modal decoupling.'
  ),
  pages: '325–347',
  pdfPages: '343–365',
  lessonPath: text('lessons/xie-2010/7-4/lesson.md', 'lessons/xie-2010/7-4/lesson-en.md'),
  mathPath: 'lessons/xie-2010/7-4/math.json',
  inlinePath: 'lessons/xie-2010/7-4/inline.json',
  labFamily: 'matrix-systems',
  downloadName: text('7-4-matris-yontemi.md', '7-4-the-matrix-method.md'),
  highlights: text(
    [
      'Birinci mertebe diferansiyel sistemlerin standart ẋ = A x + f(t) durum-uzayı matris formuna aktarılması',
      'Karakteristik denklen det(A − λ I) = 0 ve özvektör (A − λ I) v = 0 cebirsel temel yapısı',
      'Farklı gerçel köklerde faz düzlemindeki değişmez doğrusal özvektör ışınları ve eyer noktası kararsızlığı (Örnek 7.14)',
      'Karmaşık eşlenik özdeğerlerde Euler bağıntısı ile sinüs-kosinüs ayrışması ve sarmal odak (spiral sink) dinamikleri (Örnek 7.15)',
      'Kusurlu matrislerde (geometrik katlılık < cebirsel katlılık) (A − λ I) v₂ = v₁ genelleştirilmiş özvektör zinciri (Örnek 7.18)',
      'Temel matris X(t) = [x₁(t), x₂(t)] tanımı ve sağladığı matris diferansiyel denklemi Ẋ(t) = A X(t)',
      'Temel matris evirtimi ve parametrelerin değişimi formülü x_P(t) = X(t) ∫ X⁻¹(t) f(t) dt',
      'Belirsiz katsayıların çözemediği sec t zorlamasının varyasyon yöntemiyle entegrasyonu ve ln|cos t| çözümleri (Örnek 7.19)',
      'Çok serbestlik dereceli yapılarda (M ẍ + K x = 0) modal dönüşüm x = Φ q ile denklemlerin bağımsız tekil osilatörlere ayrışması',
      'Tüm analitik matris çözümlerinin diferansiyel denklem kalıntıları (E₁(t), E₂(t) ≡ 0) ve RK4 integratörüyle doğrulanması'
    ],
    [
      'Transforming first-order differential systems into standard state-space matrix form ẋ = A x + f(t)',
      'Algebraic foundations of the characteristic equation det(A − λ I) = 0 and eigenvector condition (A − λ I) v = 0',
      'Distinct real eigenvalues yielding invariant straight-line eigenvector rays and saddle point instability (Example 7.14)',
      'Complex conjugate eigenvalues resolving into sinusoidal damped spiral sinks via Euler’s identity (Example 7.15)',
      'Defective matrices (geometric < algebraic multiplicity) resolved via generalized eigenvector chains (A − λ I) v₂ = v₁ (Example 7.18)',
      'Definition of the fundamental matrix X(t) = [x₁(t), x₂(t)] and its governing matrix equation Ẋ(t) = A X(t)',
      'Fundamental matrix inversion and variation of parameters formula x_P(t) = X(t) ∫ X⁻¹(t) f(t) dt',
      'Integration of non-standard secant forcing unmanageable by undetermined coefficients into exact ln|cos t| solutions (Example 7.19)',
      'Modal coordinate transformation x = Φ q decoupling multi-DOF structural systems (M ẍ + K x = 0) into independent 1-DOF oscillators',
      'Machine-precision verification of matrix solutions via ODE residuals (E₁(t), E₂(t) ≡ 0) and RK4 numerical simulation'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Matris yönteminde özvektörler neden faz düzleminde asla sapmayan düz raylar oluşturur ve kusurlu matrislerde t e^(λt) teriminin yanına neden genelleştirilmiş özvektör eklenmelidir?',
    'E.g., why do eigenvectors form invariant straight lines in the phase plane, and why must defective matrices incorporate generalized eigenvectors alongside t e^(λt)?'
  ),
  sourceSummary: text(
    '§7.4 The Matrix Method for Systems of Linear Differential Equations, s.325–347 (PDF s.343–365, Örnek 7.14, 7.15, 7.18 ve 7.19) temelinde hazırlanmış derinlemesine konu anlatımı, iki rehberli türetim yolu ve 22 puanlık sınav kliniği.',
    'In-depth instructional module based on §7.4 The Matrix Method for Systems of Linear Differential Equations, pp. 325–347 (PDF pp. 343–365, Examples 7.14, 7.15, 7.18, and 7.19), with two guided derivation paths and a 22-point exam clinic.'
  ),
  modelLimits: text(
    'Matris sistemleri laboratuvarı, ders kitabındaki Örnek 7.14 (farklı gerçel kökler ve eyer noktası), Örnek 7.15 (karmaşık eşlenik kökler ve sönümlü sarmal odak), Örnek 7.18 (kusurlu katlı kök ve genelleştirilmiş özvektör zinciri), Örnek 7.19 (sec t standart dışı zorlaması ve temel matris evirtimi) ve 2 serbestlik dereceli kesme çerçevesi modal ayrışma senaryolarını analitik ve sayısal olarak inceler. Faz düzleminde özvektör doğruları şeffaf ışınlar olarak çizdirilir; başlangıç noktasından türeyen yörünge anlık türev teğetiyle takip edilir. Bağımsız 4. mertebe Runge-Kutta (RK4) integratörü analitik yörüngeyle yan yana karşılaştırılır.',
    'The matrix systems workbench analytically and numerically evaluates textbook Examples 7.14 (distinct real roots & saddle point), 7.15 (complex conjugate roots & damped spiral sink), 7.18 (defective repeated roots & generalized eigenvector chain), 7.19 (non-standard secant forcing via fundamental matrix inversion), and 2-DOF shear building modal decoupling. Eigenvector directions are displayed as transparent rays in the phase portrait; state trajectories follow tangent velocity vectors. An independent Runge-Kutta 4th-order (RK4) numerical integrator runs concurrently to verify analytical precision.'
  ),
  presentation: {
    clinicEyebrow: text('§7.4 · MATRİS YÖNTEMİ · USTA KLİNİK', '§7.4 · THE MATRIX METHOD · MASTER CLINIC'),
    lab: text('Matris sistemleri, özdeğerler ve faz portresi laboratuvarı', 'Matrix systems, eigenvalues & phase portrait workbench'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('Özdeğer spektrumunu, temel matris evirtimini ve faz portresini 60 saniyede kur', 'Formulate eigenvalue spectra, fundamental matrix inversion, and phase portraits in 60 seconds'),
    practiceIntro: text(
      '22 dakika · 22 puan. Dört kapsamlı sınav kliniğinde eyer noktası analizi, sönümlü sarmal odak, kusurlu matris ve genelleştirilmiş özvektör zinciri ile standart dışı sec t zorlamasını ve temel matris evirtimini adım adım çöz; ardından 12 soruyla ustalığını kanıtla.',
      '22 minutes · 22 points. Master saddle point analysis, damped spiral sinks, defective matrix generalized eigenvector chains, and non-standard secant forcing via fundamental matrix inversion across four exam clinic cases, then test your knowledge with 12 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: matrixSystemsStudy,
  guidedTools: matrixSystemsClinic,
  questions: [
    {
      title: text('Matris formu ve karakteristik denklem', 'Matrix formulation and characteristic equation'),
      tag: 'KARAKTERİSTİK DENKLEM / CHARACTERISTIC EQUATION',
      text: text(
        'ẋ = A x homojen diferansiyel denklem sistemi için x(t) = e^(λt) v çözümü önerildiğinde, sıfırdan farklı aşikar olmayan v vektörlerinin varlığı hangi koşula bağlıdır?',
        'When the trial solution x(t) = e^(λt) v is substituted into ẋ = A x, what condition ensures the existence of non-trivial eigenvector solutions v ≠ 0?'
      ),
      choices: text(
        [
          'det(A − λ I) = 0 karakteristik determinantının sıfırlanması; aksi halde ters matris var olup v = 0 tekil aşikar çözümüne zorlar',
          'A matrisinin simetrik olması; aksi halde tersi alınamaz',
          'λ özdeğerinin sıfırdan kesinlikle büyük olması; aksi halde üstel fonksiyon tanımsız kalır'
        ],
        [
          'Vanishing of the characteristic determinant det(A − λ I) = 0; otherwise the matrix is invertible, forcing the trivial solution v = 0',
          'Symmetry of matrix A; otherwise it cannot be inverted',
          'Positivity of eigenvalue λ > 0; otherwise the exponential is undefined'
        ]
      ),
      answer: 0,
      feedback: text(
        'Türev alındığında ẋ = λ e^(λt) v ve A x = e^(λt) A v olur. Buradan e^(λt) sadeleştiğinde (A − λ I) v = 0 homojen cebirsel sistemi kalır. Bu sistemin sıfırdan farklı bir v çözümü olabilmesi için katsayılar matrisinin tekil olması, yani determinantının sıfıra eşit olması şarttır.',
        'Differentiating gives ẋ = λ e^(λt) v and A x = e^(λt) A v. Dividing by e^(λt) leaves (A − λ I) v = 0. Non-trivial solutions v ≠ 0 exist if and only if the coefficient matrix is singular, requiring det(A − λ I) = 0.'
      ),
      hints: text(
        [
          '(A − λ I) v = 0 bir homojen doğrusal denklem sistemidir.',
          'Homojen bir lineer sistemin sıfırdan farklı çözümü ancak matrisin tersi olmadığında (det = 0) mümkündür.'
        ],
        [
          '(A − λ I) v = 0 is a homogeneous linear algebraic system.',
          'A homogeneous system has non-trivial solutions if and only if the matrix is singular (det = 0).'
        ]
      )
    },
    {
      title: text('Farklı gerçel özdeğerler ve modal süperpozisyon', 'Distinct real eigenvalues and modal superposition'),
      tag: 'GERÇEL ÖZDEĞERLER / REAL EIGENVALUES',
      text: text(
        '2×2 bir sistemde iki farklı gerçel özdeğer λ₁ ≠ λ₂ ve bunlara karşılık gelen bağımsız özvektörler v₁, v₂ bulunduğunda genel çözüm nasıl yazılır?',
        'In a 2×2 system with distinct real eigenvalues λ₁ ≠ λ₂ and corresponding eigenvectors v₁, v₂, how is the general solution constructed?'
      ),
      choices: text(
        [
          'x(t) = C₁ e^(λ₁t) v₁ + C₂ e^(λ₂t) v₂; her bir terim bağımsız bir doğrusal modu temsil eder',
          'x(t) = (C₁ + C₂ t) e^(λ₁t) v₁; ikinci terim rezonanstan dolayı t çarpanı alır',
          'x(t) = C₁ cos(λ₁t) v₁ + C₂ sin(λ₂t) v₂; harmonik salınım oluşturur'
        ],
        [
          'x(t) = C₁ e^(λ₁t) v₁ + C₂ e^(λ₂t) v₂; each term represents an independent linear modal ray',
          'x(t) = (C₁ + C₂ t) e^(λ₁t) v₁; the second term gains a factor of t due to resonance',
          'x(t) = C₁ cos(λ₁t) v₁ + C₂ sin(λ₂t) v₂; producing pure harmonic oscillations'
        ]
      ),
      answer: 0,
      feedback: text(
        'Farklı özdeğerlere karşılık gelen özvektörler lineer bağımsızdır. x₁(t) = e^(λ₁t) v₁ ve x₂(t) = e^(λ₂t) v₂ iki bağımsız çözüm oluşturduğundan, lineerlik ilkesi gereğince genel çözüm bunların skaler keyfi katsayılarla lineer kombinasyonudur.',
        'Eigenvectors corresponding to distinct eigenvalues are linearly independent. Since x₁(t) = e^(λ₁t) v₁ and x₂(t) = e^(λ₂t) v₂ are independent solutions, the general solution is their linear superposition x(t) = C₁ x₁ + C₂ x₂.'
      ),
      hints: text(
        [
          'Sistem doğrusal olduğundan bağımsız çözümlerin her lineer kombinasyonu da bir çözümdür.',
          'Farklı gerçel köklerde rezonans ya da trigonometrik salınım doğmaz; saf üstel sönüm/büyüme oluşur.'
        ],
        [
          'Linearity ensures that any linear combination of independent solutions remains a solution.',
          'Distinct real roots produce pure exponential decay/growth without secular t terms or sinusoids.'
        ]
      )
    },
    {
      title: text('Temel matris ve parametrelerin değişimi formülü', 'Fundamental matrix and variation of parameters'),
      tag: 'TEMEL MATRİS / FUNDAMENTAL MATRIX',
      text: text(
        'ẋ = A x + f(t) nonhomojen sisteminin temel matrisi X(t) bilindiğinde, parametrelerin değişimiyle elde edilen genel çözüm formülü hangisidir?',
        'Given the fundamental matrix X(t) of the nonhomogeneous system ẋ = A x + f(t), which formula gives the general solution via variation of parameters?'
      ),
      choices: text(
        [
          'x(t) = X(t) C + X(t) ∫ X⁻¹(t) f(t) dt',
          'x(t) = X(t) C + ∫ X(t) f(t) dt',
          'x(t) = X⁻¹(t) C + X(t) f(t)'
        ],
        [
          'x(t) = X(t) C + X(t) ∫ X⁻¹(t) f(t) dt',
          'x(t) = X(t) C + ∫ X(t) f(t) dt',
          'x(t) = X⁻¹(t) C + X(t) f(t)'
        ]
      ),
      answer: 0,
      feedback: text(
        'x_P(t) = X(t) c(t) kabul edildiğinde diferansiyel denklem X(t) ċ(t) = f(t) şekline sadeleşir. Soldan X⁻¹(t) ile çarpıldığında ċ(t) = X⁻¹(t) f(t) ve integral alındığında c(t) = C + ∫ X⁻¹(t) f(t) dt bulunur. X(t) ile çarpıldığında tam genel çözüm formülü elde edilir.',
        'Assuming x_P(t) = X(t) c(t) collapses the system to X(t) ċ(t) = f(t). Pre-multiplying by X⁻¹(t) yields ċ(t) = X⁻¹(t) f(t). Integrating and multiplying by X(t) produces the complete general solution.'
      ),
      hints: text(
        [
          'Homojen çözüm kısmı X(t) C’dir.',
          'Özel çözüm integralinde f(t) vektörü içeride ters temel matris X⁻¹(t) ile çarpılır.'
        ],
        [
          'The complementary solution is X(t) C.',
          'Inside the integral, the forcing f(t) is multiplied on the left by the inverse fundamental matrix X⁻¹(t).'
        ]
      )
    },
    {
      title: text('Faz portresi topolojisi ve değişmez özvektör ışınları', 'Phase portrait topology and invariant eigenvector rays'),
      tag: 'FAZ DÜZLEMİ TOPOLOJİSİ / PHASE PLANE TOPOLOGY',
      text: text(
        'Faz düzleminde başlangıç noktası tam bir özvektör doğrusu üzerinde olmayan genel bir yörünge, zaman t → ∞ giderken neden baskın özvektör doğrusuna paralel hale gelir?',
        'Why does a general trajectory not starting on an eigenvector ray bend to become asymptotic/parallel to the dominant eigenvector line as t → ∞?'
      ),
      choices: text(
        [
          'Daha büyük gerçel kısma sahip özdeğere ait üstel terim (e^(λ_baskın t)) diğer terimlere üstel olarak baskın gelir ve yön vektörünü domine eder',
          'Çünkü faz düzleminde enerji minimumu daima koordinat eksenlerindedir',
          'Çünkü Coriolis kuvveti yörüngeyi kendi eksenine çeker'
        ],
        [
          'The exponential term corresponding to the eigenvalue with the larger real part (e^(λ_dominant t)) exponentially outgrows the other term, dictating the asymptotic direction',
          'Because the energy minimum in the phase plane always resides on the Cartesian axes',
          'Because Coriolis acceleration pulls the trajectory onto the main axis'
        ]
      ),
      answer: 0,
      feedback: text(
        'x(t) = C₁ e^(λ₁t) v₁ + C₂ e^(λ₂t) v₂ ifadesinde örneğin λ₂ > λ₁ ise, e^(λ₂t) parantezine alındığında x(t) = e^(λ₂t) [C₁ e^((λ₁ − λ₂)t) v₁ + C₂ v₂] olur. λ₁ − λ₂ < 0 olduğundan t → ∞ iken ilk terim sıfıra gider ve geriye sadece C₂ v₂ doğrultusu kalır. Bu nedenle yörünge baskın özvektöre asimptotik olur.',
        'In x(t) = C₁ e^(λ₁t) v₁ + C₂ e^(λ₂t) v₂ with λ₂ > λ₁, factoring gives x(t) = e^(λ₂t) [C₁ e^((λ₁ − λ₂)t) v₁ + C₂ v₂]. As t → ∞, the relative term decays because λ₁ − λ₂ < 0, leaving motion dominated exclusively by the v₂ ray.'
      ),
      hints: text(
        [
          'İki üstel fonksiyondan büyüme hızı yüksek olan zaman ilerledikçe toplamı domine eder.',
          'Küçük olan mod sönümlenirken geriye sadece baskın modun geometrik yönü kalır.'
        ],
        [
          'The exponential with the larger rate eventually dominates any linear combination.',
          'The faster-decaying mode vanishes, leaving only the dominant mode’s geometric orientation.'
        ]
      )
    },
    ...matrixSystemsExtraQuestions
  ]
};
