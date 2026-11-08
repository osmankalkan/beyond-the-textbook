import {laplaceSystemsExtraQuestions} from './questions.js';
import {laplaceSystemsStudy, laplaceSystemsClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const laplaceSystemsLesson = {
  id: 'xie-2010:7.3',
  section: '7.3',
  chapterNumber: '07',
  chapterTitle: text('Doğrusal diferansiyel denklem sistemleri', 'Systems of Linear Differential Equations'),
  title: text('Laplace dönüşümü yöntemi: başlangıç koşullarının doğrudan soğurulması, Cramer kuralı ve gecikmeli zorlama', 'The method of Laplace transform: direct incorporation of initial conditions, Cramer’s rule, and delayed forcing'),
  englishTitle: 'The Method of Laplace Transform: Direct Incorporation of Initial Conditions, Cramer’s Rule, and Delayed Forcing',
  subtitle: text(
    'Diferansiyel sistemleri s-uzayında cebirsel matris denklemine dönüştürme: başlangıç koşullarının ilk adımda soğurulması, fazlalık sabit elemesinin gereksizliği, s-uzayında Cramer kuralı, ZIR ve ZSR ayrışması, 2. kaydırma teoremi ile Heaviside gecikmeli zorlamaları ve kutup sadeleşmesi.',
    'Transforming differential systems into algebraic matrix equations in the s-domain: direct incorporation of initial conditions, absence of redundant constant elimination, Cramer’s rule in s, ZIR and ZSR decomposition, Heaviside delayed forcing via the second shifting theorem, and pole cancellations.'
  ),
  pages: '318–325',
  pdfPages: '336–343',
  lessonPath: text('lessons/xie-2010/7-3/lesson.md', 'lessons/xie-2010/7-3/lesson-en.md'),
  mathPath: 'lessons/xie-2010/7-3/math.json',
  inlinePath: 'lessons/xie-2010/7-3/inline.json',
  labFamily: 'laplace-systems',
  downloadName: text('7-3-laplace-donusumu-yontemi.md', '7-3-the-method-of-laplace-transform.md'),
  highlights: text(
    [
      'Türev kuralı L{ẋ} = sX(s) − x(0) ile diferansiyel sistemlerin lineer cebirsel matris formuna aktarılması',
      'Başlangıç koşullarının ilk adımda cebirsel sağ tarafa soğurulması ve fazlalık sabit eleme adımının elenmesi',
      's-uzayında Cramer kuralı: karakteristik determinant Δ(s) ve pay determinantları Δ_x(s), Δ_y(s)',
      'Sıfır Giriş Yanıtı (ZIR) ile Sıfır Durum Yanıtı (ZSR) doğal ayrışması',
      '2. kaydırma teoremi L{f(t − a)H(t − a)} = e^(−as)F(s) ile basamaklı ve gecikmeli zorlamaların çözümü',
      'Bağlı türevli sistemlerde başlangıç koşulu çarpanlarının hatasız toplanması: a x(0) + b y(0)',
      'Karakteristik polinomdaki kutupların pay determinantındaki sıfırlarla sadeleşmesi ve uyarılmayan modlar',
      'Analitik çözümlerin diferansiyel sistem kalıntıları (E₁(t), E₂(t) ≡ 0) ve RK4 integratörü ile bağımsız doğrulanması'
    ],
    [
      'Transforming differential systems into algebraic matrix equations via the derivative rule L{ẋ} = sX(s) − x(0)',
      'Immediate incorporation of initial conditions into the algebraic RHS, eliminating redundant constant elimination',
      'Cramer’s rule in the s-domain: characteristic determinant Δ(s) and numerator determinants Δ_x(s), Δ_y(s)',
      'Natural decomposition into Zero-Input Response (ZIR) and Zero-State Response (ZSR)',
      'Solving delayed step forcing via the 2nd shifting theorem L{f(t − a)H(t − a)} = e^(−as)F(s)',
      'Accurate collection of initial value multipliers in coupled derivative terms: a x(0) + b y(0)',
      'Pole-zero cancellations between numerator determinants and characteristic polynomials explaining unexcited modes',
      'Independent verification of analytical solutions via system ODE residuals (E₁(t), E₂(t) ≡ 0) and RK4 simulation'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Laplace yöntemi neden operatör yöntemindeki gibi 2N sabit türetip N tanesini elemek zorunda kalmaz ve gecikmeli zorlamada 2. kaydırma teoremi nasıl uygulanır?',
    'E.g., why does the Laplace transform avoid generating 2N constants requiring N eliminations, and how is the 2nd shifting theorem applied to delayed forcing?'
  ),
  sourceSummary: text(
    '§7.3 The Method of Laplace Transform for Systems of Linear Differential Equations, s.318–325 (PDF s.336–343, Örnek 7.11, 7.12 ve 7.13) temelinde hazırlanmış derinlemesine konu anlatımı, iki rehberli türetim yolu ve 22 puanlık sınav kliniği.',
    'In-depth instructional module based on §7.3 The Method of Laplace Transform for Systems of Linear Differential Equations, pp. 318–325 (PDF pp. 336–343, Examples 7.11, 7.12, and 7.13), with two guided derivation paths and a 22-point exam clinic.'
  ),
  modelLimits: text(
    'Laplace sistemleri laboratuvarı, ders kitabındaki Örnek 7.11 (harmonik sistem ve üstel zorlama), Örnek 7.12 (bağlı türevler ve gecikmeli sinüs zorlaması) ve Örnek 7.13 (2. mertebe bağlı sistem ve gecikmeli rampa) senaryolarını analitik ve sayısal olarak inceler. Model, Total Response, ZIR ve ZSR modları arasında anlık geçiş imkanı tanır; gecikmeli aktivasyon anı (t = t_delay) dikey göstergeyle vurgulanır. Elde edilen yörüngeler bağımsız bir 4. mertebe Runge-Kutta (RK4) sayısal integratörüyle eş zamanlı karşılaştırılır. Model, doğrusal sabit katsayılı sistemlerle sınırlıdır.',
    'The Laplace systems workbench evaluates textbook Examples 7.11 (harmonic system with exponential forcing), 7.12 (coupled derivatives with delayed sinusoidal forcing), and 7.13 (second-order coupled system with delayed ramp) analytically and numerically. The interactive engine supports seamless toggling between Total Response, ZIR, and ZSR views, highlighting the activation threshold t = t_delay with a dedicated marker line. Analytical trajectories are cross-verified against an independent Runge-Kutta 4th-order (RK4) numerical integrator. The framework is restricted to linear systems with constant coefficients.'
  ),
  presentation: {
    clinicEyebrow: text('§7.3 · LAPLACE YÖNTEMİ · USTA KLİNİK', '§7.3 · THE METHOD OF LAPLACE TRANSFORM · MASTER CLINIC'),
    lab: text('Laplace sistemleri ve gecikmeli zorlama laboratuvarı', 'Laplace systems & delayed forcing workbench'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('s-uzayı matrisini, Cramer oranını ve gecikmeli basamak yanıtını 60 saniyede kur', 'Formulate s-domain matrices, Cramer ratios, and delayed step responses in 60 seconds'),
    practiceIntro: text(
      '22 dakika · 22 puan. Dört kapsamlı sınav sorusunda harmonik sistem IVP çözümünü, bağlı türevli gecikmeli sinüs zorlamasını, 3. mertebe kutup sadeleşmesini ve matris durum-uzayı rezolventini çöz; ardından 12 soruyla ustalığını kanıtla.',
      '22 minutes · 22 points. Master harmonic system IVP solving, coupled derivatives with delayed sinusoidal forcing, 3rd-order pole cancellation, and state-space resolvent matrices across four exam clinic cases, then test your knowledge with 12 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: laplaceSystemsStudy,
  guidedTools: laplaceSystemsClinic,
  questions: [
    {
      title: text('s-uzayı cebirsel matris formülasyonu', 's-domain algebraic matrix formulation'),
      tag: 'MATRİS SİSTEMİ / MATRIX SYSTEM',
      text: text(
        'Sabit katsayılı bir diferansiyel denklem sistemine Laplace dönüşümü uygulandığında sistem hangi yapıya kavuşur?',
        'When the Laplace transform is applied to a linear differential system with constant coefficients, what structure does it assume?'
      ),
      choices: text(
        [
          'A(s) X(s) = B(s) formunda, elemanları s polinomları olan cebirsel bir lineer denklem sistemi',
          'Zamana bağlı katsayılar içeren doğrusal olmayan bir diferansiyel sistem',
          'Yalnızca türev mertebesi bir olan skaler adi diferansiyel denklem'
        ],
        [
          'An algebraic linear system in the form A(s) X(s) = B(s), where entries are polynomials in s',
          'A nonlinear differential system with time-dependent coefficients',
          'A single first-order scalar ordinary differential equation'
        ]
      ),
      answer: 0,
      feedback: text(
        'Laplace dönüşümü zaman türevlerini s cebirsel çarpanına çevirir; böylece diferansiyel operatörler s polinomlarına, tüm sistem ise klasik lineer cebirsel matris denklemine dönüşür.',
        'The Laplace transform replaces time derivatives with algebraic multipliers s, converting differential operators into s-polynomials and the whole system into a linear algebraic matrix equation.'
      ),
      hints: text(
        [
          'Türev L{ẋ} = sX(s) - x(0) işleminde s bir diferansiyel operatör müdür, yoksa karmaşık bir cebirsel değişken midir?',
          'Cebirsel sistemler matris tersi veya Cramer kuralıyla çözülebilir.'
        ],
        [
          'In L{ẋ} = sX(s) - x(0), is s a differential operator or a complex algebraic variable?',
          'Algebraic systems can be solved directly via matrix inversion or Cramer’s rule.'
        ]
      )
    },
    {
      title: text('Başlangıç koşullarının doğrudan soğurulması', 'Direct incorporation of initial conditions'),
      tag: 'BAŞLANGIÇ KOŞULLARI / INITIAL CONDITIONS',
      text: text(
        'Laplace dönüşümü yöntemi kullanılırken başlangıç koşulları genel çözüm sürecine ne zaman ve nasıl dahil edilir?',
        'When using the Laplace transform method, when and how are initial conditions incorporated into the solution process?'
      ),
      choices: text(
        [
          'Dönüşümün en başında türev kuralı L{ẋ} = sX(s) − x(0) ile doğrudan cebirsel sağ tarafa yazılır; ek keyfi sabit üretilmez',
          'Önce tamamlayıcı çözüm 2N sabit ile bulunur, sonra başlangıç koşulları ile katsayılar elenir',
          'Yalnızca ters Laplace dönüşümü tamamlandıktan sonra keyfi integrasyon sabiti olarak eklenir'
        ],
        [
          'Directly at step 1 via the derivative property L{ẋ} = sX(s) − x(0) on the algebraic RHS; no arbitrary constants are created',
          'First the complementary solution is found with 2N constants, which are then eliminated using initial conditions',
          'Appended only after inverse Laplace transformation as arbitrary integration constants'
        ]
      ),
      answer: 0,
      feedback: text(
        'Laplace dönüşümünün temel kolaylığı, başlangıç koşullarını doğrudan diferansiyel denklemlerin içine gömmesidir. Böylece operatör yöntemindeki gibi fazlalık sabitleri eleme zahmeti ortadan kalkar.',
        'The primary efficiency of the Laplace transform lies in absorbing initial conditions directly into the algebraic system, completely avoiding the need to eliminate excess constants.'
      ),
      hints: text(
        [
          'L{ẋ} formülünün sağ tarafında x(0) terimi var mıdır?',
          'X(s) ve Y(s) çözüldüğünde keyfi sabit kalır mı?'
        ],
        [
          'Does the formula for L{ẋ} explicitly include x(0)?',
          'Do any arbitrary constants remain once X(s) and Y(s) are solved algebraically?'
        ]
      )
    },
    {
      title: text('2. kaydırma teoremi ve basamak fonksiyonu', 'Second shifting theorem and step function'),
      tag: '2. KAYDIRMA TEOREMİ / 2ND SHIFTING THEOREM',
      text: text(
        'Zaman gecikmeli zorlama terimi f(t − c) H(t − c) içeren bir sistemde ters Laplace dönüşümü uygulanırken hangi teorem kullanılır?',
        'Which theorem is employed when taking the inverse Laplace transform of terms involving time-delayed forcing f(t − c) H(t − c)?'
      ),
      choices: text(
        [
          'İkinci kaydırma teoremi: L⁻¹{e^(−cs) F(s)} = f(t − c) H(t − c)',
          'Birinci kaydırma teoremi: L⁻¹{F(s − a)} = e^(at) f(t)',
          'Konvolüsyon teoremi: L⁻¹{F(s) G(s)} = f(t) · g(t)'
        ],
        [
          'Second shifting theorem: L⁻¹{e^(−cs) F(s)} = f(t − c) H(t − c)',
          'First shifting theorem: L⁻¹{F(s − a)} = e^(at) f(t)',
          'Convolution theorem: L⁻¹{F(s) G(s)} = f(t) · g(t)'
        ]
      ),
      answer: 0,
      feedback: text(
        's-uzayında görülen e^(-cs) üstel çarpanı, zaman uzayında tam olarak c kadar gecikmeye ve H(t - c) Heaviside basamak aktivasyonuna karşılık gelir.',
        'An exponential factor e^(-cs) in the s-domain corresponds directly to a time delay by c activated by the Heaviside step H(t - c).'
      ),
      hints: text(
        [
          'e^(-cs) çarpanı frekansta mı ötelenmiştir yoksa s-uzayında üstel bir katsayı mıdır?',
          't < c için sonucun sıfır kalmasını sağlayan fonksiyon nedir?'
        ],
        [
          'Is e^(-cs) an exponential multiplier or a frequency translation?',
          'What function ensures the result remains zero for t < c?'
        ]
      )
    },
    {
      title: text('ZIR ve ZSR süperpozisyon ilkesi', 'ZIR and ZSR superposition principle'),
      tag: 'ZIR VE ZSR / RESPONSE SEPARATION',
      text: text(
        'Doğrusal bir diferansiyel sistemin tam yanıtı x(t) = x_ZIR(t) + x_ZSR(t) şeklinde ayrıştırıldığında bu iki bileşenin fiziksel anlamı nedir?',
        'When the total response of a linear system is decomposed as x(t) = x_ZIR(t) + x_ZSR(t), what is the physical meaning of these two parts?'
      ),
      choices: text(
        [
          'x_ZIR dış zorlama olmadan yalnızca başlangıç enerjisinin serbest yanıtıdır; x_ZSR ise başlangıç koşulları sıfırken yalnızca dış zorlamanın ürettiği yanıttır',
          'x_ZIR sonsuzdaki kararlı durumdur; x_ZSR ise ilk birkaç saniyedeki geçici titreşimdir',
          'x_ZIR sistemin homojen olmayan özel çözümüdür; x_ZSR ise homojen sistemin genel çözümüdür'
        ],
        [
          'x_ZIR is the free response driven purely by initial energy without forcing; x_ZSR is the forced response driven purely by inputs under zero initial conditions',
          'x_ZIR is the infinite-time steady state; x_ZSR is the initial transient vibration',
          'x_ZIR is the particular solution; x_ZSR is the homogeneous complementary solution'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğrusal sistemlerde süperpozisyon gereği sistemin başlangıç durumuna (State) verdiği yanıt ile dış girişine (Input) verdiği yanıt birbirinden bağımsızdır ve toplanabilir.',
        'Due to superposition in linear systems, the response driven by stored initial state energy and the response driven by external inputs decouple cleanly and add algebraically.'
      ),
      hints: text(
        [
          'Zero-Input: Giriş sıfır (f(t) = 0).',
          'Zero-State: Başlangıç durumu sıfır (x(0) = 0).'
        ],
        [
          'Zero-Input: Zero external input (f(t) = 0).',
          'Zero-State: Zero initial state (x(0) = 0).'
        ]
      )
    },
    ...laplaceSystemsExtraQuestions
  ]
};
