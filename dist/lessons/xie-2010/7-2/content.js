import {operatorSystemsExtraQuestions} from './questions.js';
import {operatorSystemsStudy, operatorSystemsClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const operatorSystemsLesson = {
  id: 'xie-2010:7.2',
  section: '7.2',
  chapterNumber: '07',
  chapterTitle: text('Doğrusal diferansiyel denklem sistemleri', 'Systems of Linear Differential Equations'),
  title: text('Operatör yöntemi: karakteristik determinant, eleme ve Cramer kuralı', 'The method of operator: characteristic determinants, elimination, and Cramer’s rule'),
  englishTitle: 'The Method of Operator: Characteristic Determinants, Elimination, and Cramer’s Rule',
  subtitle: text(
    'Diferansiyel operatör D = d/dt ile sistemleri matris determinantına bağlama: ortak karakteristik denklem φ(λ) = 0, deg φ(D) kadar bağımsız sabit, denklemde fazlalık sabitleri eleme, operatörlü Cramer kuralı, üstel kaydırma ve rezonans altındaki seküler büyüme.',
    'Formulating differential systems via the operator D = d/dt: common characteristic equation φ(λ) = 0, degree deg φ(D) determining independent constants, eliminating excess constants by substitution, Cramer’s rule for operators, exponential shifts, and secular resonance growth.'
  ),
  pages: '304–318',
  pdfPages: '322–336',
  lessonPath: text('lessons/xie-2010/7-2/lesson.md', 'lessons/xie-2010/7-2/lesson-en.md'),
  mathPath: 'lessons/xie-2010/7-2/math.json',
  inlinePath: 'lessons/xie-2010/7-2/inline.json',
  labFamily: 'operator-systems',
  downloadName: text('7-2-operator-yontemi.md', '7-2-the-method-of-operator.md'),
  highlights: text(
    [
      'Diferansiyel operatör D = d/dt: türevlerin cebirsel polinomlar gibi ifade edilmesi',
      'Operatör matrisi determinantı φ(D) = det[φ_ij(D)] ve ortak skaler denklem φ(D)x_i = 0',
      'Karakteristik kökler φ(λ) = 0: tüm koordinatların aynı frekans/üstel modları paylaşması',
      'Gerçek sabit sayısı N = deg φ(D): fazlalık sabitlerin sisteme konularak elenmesi',
      'Operatörlü Cramer kuralı: operatörlerin mutlaka fonksiyonlardan ÖNCE yazılması kuralı',
      'Ters operatör teknikleri: üstel kaydırma, kuvvet serileri ve 1/φ′(iω) rezonans kuralı',
      'Rezonansta t cos(ωt) ve t sin(ωt) seküler terimleri ve faz kayması',
      'Parametrelerin değişimi yöntemi ve bağımsız diferansiyel denklem kalıntı doğrulaması'
    ],
    [
      'The differential operator D = d/dt: representing derivatives as algebraic polynomials',
      'Operator determinant φ(D) = det[φ_ij(D)] and identical scalar equation φ(D)x_i = 0',
      'Characteristic roots φ(λ) = 0: all coordinates sharing the same frequency/exponential modes',
      'True number of arbitrary constants N = deg φ(D): eliminating excess constants via substitution',
      'Cramer’s rule for operators: the vital requirement that operators precede functions',
      'Inverse operator techniques: exponential shifts, series expansion, and the 1/φ′(iω) resonance theorem',
      'Secular resonance terms t cos(ωt) and t sin(ωt) and associated phase shifts',
      'Variation of parameters for systems and independent ODE residual verification'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Cramer determinantı Δ_x(t) hesaplarken diferansiyel operatörün neden fonksiyondan önce gelmesi gerektiğini ve fazlalık sabitlerin nasıl elendiğini nasıl açıklarım?',
    'E.g., how do I explain why differential operators must precede functions in Cramer’s Δ_x(t) and how excess constants are eliminated?'
  ),
  sourceSummary: text(
    '§7.2 The Method of Operator, s.304–318 (PDF s.322–336, Örnek 7.3 ile 7.10 arası) temelinde hazırlanmış derinlemesine konu anlatımı, iki rehberli türetim yolu ve 22 puanlık sınav kliniği.',
    'In-depth instructional module based on §7.2 The Method of Operator, pp. 304–318 (PDF pp. 322–336, Examples 7.3 through 7.10), with two guided derivation paths and a 22-point exam clinic.'
  ),
  modelLimits: text(
    'Operatör sistemleri laboratuvarı, ders kitabındaki Örnek 7.3, 7.4, 7.5, 7.6 ve 7.7 senaryolarını analitik ve sayısal olarak inceler. Harmonik sistem modunda (D² + 9) operatörü için serbest titreşim, üstel/rampa zorlaması ve tam rezonans çözümleri üretilir; elde edilen analitik yörünge bağımsız bir 4. mertebe Runge-Kutta (RK4) sayısal simülatörüyle eş zamanlı karşılaştırılır. Model, doğrusal sabit katsayılı sistemlerle sınırlıdır; zamanla değişen değişken katsayılar ve doğrusal olmayan sistemler operatör matrisi kapsamı dışındadır.',
    'The operator systems workbench simulates textbook Examples 7.3, 7.4, 7.5, 7.6, and 7.7 analytically and numerically. For the harmonic (D² + 9) system, free vibration, exponential/ramp forcing, and pure resonance solutions are evaluated and cross-checked against an independent Runge-Kutta 4th-order (RK4) numerical integrator. The model is restricted to linear systems with constant coefficients; time-varying or nonlinear systems fall outside the scope of differential operator matrices.'
  ),
  presentation: {
    clinicEyebrow: text('§7.2 · OPERATÖR YÖNTEMİ · USTA KLİNİK', '§7.2 · THE METHOD OF OPERATOR · MASTER CLINIC'),
    lab: text('Operatör ve rezonans laboratuvarı', 'Operator & resonance workbench'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('Operatör determinantını, eleme bağıntısını ve rezonansı 60 saniyede teşhis et', 'Diagnose operator determinants, elimination, and resonance in 60 seconds'),
    practiceIntro: text(
      '22 dakika · 22 puan. Dört kapsamlı sınav sorusunda homojen sistem sabit elemesini, 3. mertebe yok olan modu, Cramer özel çözümünü ve rezonans seküler büyümesini çöz; ardından 12 soruyla ustalığını kanıtla.',
      '22 minutes · 22 points. Work through homogeneous constant elimination, the 3rd-order vanishing mode, Cramer particular solutions, and secular resonance growth in four exam problems, then verify mastery with 12 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: operatorSystemsStudy,
  guidedTools: operatorSystemsClinic,
  questions: [
    {
      title: text('Diferansiyel operatör sisteminin formu', 'Differential operator system form'),
      tag: 'OPERATÖR MATRİSİ / OPERATOR MATRIX',
      text: text(
        'D = d/dt operatörü kullanıldığında, sabit katsayılı bir diferansiyel denklem sistemi hangi standart biçimde temsil edilir?',
        'Using the operator D = d/dt, in which standard form is a linear differential system with constant coefficients represented?'
      ),
      choices: text(
        [
          '[φ_ij(D)] {x_j} = {f_i(t)}, burada φ_ij(D) katsayıları sabit D polinomlarıdır',
          '[φ_ij(t)] {D} = {0}, burada katsayılar zamana bağlı matrislerdir',
          'D {x} + D {y} = const, yalnızca birinci türevleri içeren skaler toplam'
        ],
        [
          '[φ_ij(D)] {x_j} = {f_i(t)}, where φ_ij(D) are polynomials in D with constant coefficients',
          '[φ_ij(t)] {D} = {0}, where coefficients are time-dependent matrices',
          'D {x} + D {y} = const, a scalar sum containing only first derivatives'
        ]
      ),
      answer: 0,
      feedback: text(
        'Sabit katsayılı türevler D, D², … kuvvetleri ile yazılarak her denklem bir polinom operatörün değişkenler üzerine etkisine dönüştürülür: Σ φ_ij(D) x_j = f_i(t).',
        'Derivatives with constant coefficients are expressed as powers D, D², …, converting each equation into a polynomial operator acting on variables: Σ φ_ij(D) x_j = f_i(t).'
      ),
      hints: text(
        [
          'd/dt türevi yerine D koyduğunda katsayılar neye dönüşür?',
          'Sol taraf operatör matrisi, sağ taraf zorlama vektörüdür.'
        ],
        [
          'When substituting D for d/dt, what do the coefficients become?',
          'The left side is an operator matrix, and the right side is a forcing vector.'
        ]
      )
    },
    {
      title: text('Operatör determinantı ve skaler denklem', 'Operator determinant and scalar equation'),
      tag: 'DETERMİNANT / DETERMINANT',
      text: text(
        'n bilinmeyenli bir sistemde katsayı operatör matrisinin determinantı φ(D) = det[φ_ij(D)] ise, x_1, x_2, …, x_n değişkenleri hangi diferansiyel denklemi sağlar?',
        'In an n-variable system with operator determinant φ(D) = det[φ_ij(D)], which differential equation do variables x_1, x_2, …, x_n satisfy?'
      ),
      choices: text(
        [
          'Her değişken ayrı ayrı aynı φ(D) x_i = 0 homojen denklemini sağlar',
          'Her değişkenin karakteristik denklemi tamamen farklı bir polinomdur',
          'Yalnızca birinci değişken x₁ bu denklemi sağlar, diğerleri tanımsızdır'
        ],
        [
          'Every variable individually satisfies the exact same equation φ(D) x_i = 0',
          'Every variable has a completely different characteristic polynomial',
          'Only the first variable x₁ satisfies this equation; the others are undefined'
        ]
      ),
      answer: 0,
      feedback: text(
        'Eleme yöntemi gösterir ki, sistemi oluşturan tüm x₁, x₂, …, x_n bilinmeyenleri aynı φ(D) x_i = 0 skaler denklemini sağlar. Dolayısıyla hepsinin karakteristik kökleri (ve çözüm formları) aynıdır.',
        'Elimination proves that all unknowns x₁, x₂, …, x_n satisfy the exact same scalar equation φ(D) x_i = 0. Consequently, all share the same characteristic roots and solution forms.'
      ),
      hints: text(
        [
          'Örnek 7.3’te hem x hem de y için (D² + 9) çıkmıştı, hatırla.',
          'Sistemin öz frekansları koordinattan bağımsız mıdır?'
        ],
        [
          'Recall that in Example 7.3 both x and y yielded (D² + 9).',
          'Are the natural frequencies of a system coordinate-independent?'
        ]
      )
    },
    {
      title: text('Sistem mertebesi ve bağımsız sabit sayısı', 'System order and number of independent constants'),
      tag: 'SİSTEM MERTEBESİ / SYSTEM ORDER',
      text: text(
        'Bir diferansiyel denklem sisteminin genel çözümünde bulunması gereken bağımsız keyfi sabit sayısı neye eşittir?',
        'What determines the true number of independent arbitrary constants in the general solution of a differential system?'
      ),
      choices: text(
        [
          'φ(D) = det[φ_ij(D)] polinomunun derecesi olan N = deg φ(D) değerine',
          'Sistemdeki denklem sayısı ile en yüksek türevin çarpımına',
          'Her değişken için yazılan sabitlerin koşulsuz toplamına (n · N)'
        ],
        [
          'The degree of the operator determinant polynomial N = deg φ(D)',
          'The product of the number of equations and the highest derivative',
          'The unconstrained sum of constants written for all variables (n · N)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Sistemin gerçek mertebesi, katsayı operatör matrisinin determinantı olan φ(D) polinomunun derecesidir. Çözümde tam olarak N = deg φ(D) adet bağımsız sabit bulunmalıdır.',
        'The true order of the system is the degree of the determinant polynomial φ(D). The general solution must contain exactly N = deg φ(D) independent constants.'
      ),
      hints: text(
        [
          'Örnek 7.3’te iki denklem vardı ve deg φ(D) = 2 çıktı; kaç serbest sabit kaldı?',
          'Fazlalık sabitler orijinal denkleme konarak elenir.'
        ],
        [
          'In Example 7.3 there were two equations and deg φ(D) = 2; how many constants remained?',
          'Excess constants are eliminated via the original equations.'
        ]
      )
    },
    {
      title: text('Fazlalık sabitlerin elenmesi', 'Elimination of excess constants'),
      tag: 'ELEME YÖNTEMİ / ELIMINATION PROCEDURE',
      text: text(
        'x_C ve y_C için karakteristik köklerden toplam 2N adet sabit yazıldığında, aradaki N adet fazlalık sabit nasıl elenir?',
        'When 2N constants are written for x_C and y_C from characteristic roots, how are the N excess constants eliminated?'
      ),
      choices: text(
        [
          'Çözümler orijinal diferansiyel denklemlerden birine konularak katsayı eşitlemesi yapılır',
          'Sabitler rastgele sıfıra veya bire eşitlenir',
          'Denklemler integre edilerek keyfi integral sabitleri silinir'
        ],
        [
          'Solutions are substituted into one of the original differential equations to match coefficients',
          'Constants are arbitrarily set to zero or one',
          'Equations are integrated and constants discarded'
        ]
      ),
      answer: 0,
      feedback: text(
        'Çözümler sistemin en basit denklemine yerleştirilir; bağımsız fonksiyonların (ör. cos ωt, sin ωt veya e^(λt)) katsayıları sıfıra eşitlenerek y’nin sabitleri x’in sabitlerine cebirsel olarak bağlanır.',
        'The complementary solutions are substituted into the simplest equation of the system; equating coefficients of linearly independent functions to zero algebraically links the constants of y to those of x.'
      ),
      hints: text(
        [
          '(D − 3)x − 6y = 0 denklemine koyduğumuz adımı hatırla.',
          'Lineer bağımsız fonksiyonların katsayıları ayrı ayrı sıfır olmalıdır.'
        ],
        [
          'Recall substituting into (D − 3)x − 6y = 0.',
          'Coefficients of linearly independent functions must vanish separately.'
        ]
      )
    },
    ...operatorSystemsExtraQuestions
  ]
};
