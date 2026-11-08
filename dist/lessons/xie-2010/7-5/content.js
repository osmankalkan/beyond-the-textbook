import {systemsSummaryStudy, systemsSummaryClinic} from './study.js';
import {systemsSummaryExtraQuestions} from './questions.js';

const text = (tr, en) => ({tr, en});

export const systemsSummaryLesson = {
  id: 'xie-2010:7.5',
  section: '7.5',
  chapterNumber: '07',
  chapterTitle: text('Doğrusal diferansiyel denklem sistemleri', 'Systems of Linear Differential Equations'),
  title: text('Özet: üç yöntemin sentezi ve karar motoru', 'Summary: synthesis of three methods & decision engine'),
  englishTitle: 'Summary: Synthesis of Three Methods & Decision Engine',
  subtitle: text(
    'Operatör, Laplace dönüşümü ve matris yöntemlerinin karşılaştırmalı analizi; 60 saniyelik yöntem seçim algoritması, 10 teşhis kartı ve bölüm sonu sınav kliniği.',
    'Comparative analysis of Operator, Laplace transform, and Matrix methods; 60-second triage algorithm, 10 diagnostic challenge cards, and capstone exam clinic.'
  ),
  pages: '347–356',
  pdfPages: '365–374',
  lessonPath: text('lessons/xie-2010/7-5/lesson.md', 'lessons/xie-2010/7-5/lesson-en.md'),
  mathPath: 'lessons/xie-2010/7-5/math.json',
  inlinePath: 'lessons/xie-2010/7-5/inline.json',
  labFamily: 'systems-summary',
  downloadName: text('7-5-dogrusal-sistemler-ozet.md', '7-5-linear-systems-summary.md'),
  highlights: text(
    [
      'Üç temel yöntemin kapsamlı karşılaştırma matrisi: Operatör, Laplace ve Matris yöntemleri',
      '60 saniyelik hızlı tarama ve yöntem seçim algoritması',
      'Operatör yönteminde karakteristik derece N ve fazla sabitleri yok etme protokolü',
      'Laplace dönüşümü ile başlangıç koşullarının doğrudan soğurulması ve süreksiz darbe çözümleri',
      'Matris yöntemi ile özdeğer spektrumu, genelleştirilmiş Jordan zincirleri ve temel matris evirtimi',
      'Çok serbestlik dereceli (MDOF) sistemlerde modal ayrışma ve fiziksel osilatörlerin bağımsızlaşması',
      'On temsilci teşhis kartı ile anlık dönütlü interaktif karar laboratuvarı',
      'Bölüm sonu vize/final kliniği: 22 puanlık dört kapsamlı sınav çözümü'
    ],
    [
      'Comprehensive comparative matrix across Operator, Laplace, and Matrix methods',
      '60-second rapid triage and method selection algorithm',
      'Characteristic order N and excess constant elimination protocol in the operator method',
      'Direct initial condition absorption and discontinuous pulse response via Laplace transform',
      'State-space matrix method: eigenvalue spectrum, generalized Jordan chains, and fundamental matrix inversion',
      'Modal decoupling in multiple degree-of-freedom (MDOF) structural dynamics',
      'Interactive diagnostic workbench with instant feedback across 10 representative challenge cards',
      'Capstone midterm/final clinic: four comprehensive worked exam cases worth 22 points'
    ]
  ),
  notesPlaceholder: text(
    'Yeni bir diferansiyel sistem gördüğümde ilk 30 saniyede Operatör, Laplace ve Matris yöntemleri arasından en kısa yolu nasıl seçerim?',
    'When facing a new differential system, how do I select the shortest path among Operator, Laplace, and Matrix methods within the first 30 seconds?'
  ),
  sourceSummary: text(
    '§7.5, s.347–356 (PDF s.365–374) temelinde kapsamlı bölüm sentezi. Operatör, Laplace ve matris yöntemlerini karar motoru ve teşhis atölyesiyle tek çatı altında birleştirir.',
    'Comprehensive chapter synthesis based on §7.5, pp. 347–356 (PDF pp. 365–374). Unifies Operator, Laplace, and Matrix methods under an interactive decision engine and diagnostic workbench.'
  ),
  modelLimits: text(
    'On temsilci teşhis problemi Chapter 7\'nin tüm tipik sistem yapılarını (harmonik salınım, süreksiz Heaviside basamakları, Dirac delta darbeleri, eyer noktaları, kararlı sarmal odaklar, dejenere katlı kökler, parametrelerin değişimi ve modal ayrışma) kapsar.',
    'Ten representative diagnostic problems cover all canonical system structures of Chapter 7 (harmonic oscillation, discontinuous Heaviside steps, Dirac delta impulses, saddle points, spiral sinks, defective repeated roots, variation of parameters, and modal decoupling).'
  ),
  presentation: {
    clinicEyebrow: text('§7.5 · VİZE / FİNAL BÖLÜM KAPANIŞI · USTA KLİNİK', '§7.5 · MIDTERM / FINAL CAPSTONE · MASTER CLINIC'),
    lab: text('Doğrusal sistemler karar ve teşhis simülatörü', 'Linear systems decision and diagnostic simulator'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('Doğru yöntemi 60 saniyede seç ve en kısa yoldan çöz', 'Pick the right method in 60 seconds and solve via the shortest path'),
    practiceIntro: text(
      '22 dakika · 22 puan. Dört kapsamlı sınav sorusu üzerinde yöntem tarama ve tuzak yakalama becerini geliştir; ardından 12 sentez sorusuyla ustalığını kanıtla.',
      '22 minutes · 22 points. Refine method triage and trap detection across four comprehensive exam problems, then verify your mastery with 12 synthesis questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: systemsSummaryStudy,
  guidedTools: systemsSummaryClinic,
  questions: [
    {
      title: text('Diferansiyel sistemlerde yöntem seçimi', 'Method selection in differential systems'),
      tag: 'YÖNTEM SEÇİMİ / METHOD SELECTION',
      text: text(
        'Başlangıç koşulu verilmeyen, homojen, küçük boyutlu (2×2) ve sabit katsayılı bir sistemde en hızlı analitik çözüm hangi yöntemle elde edilir?',
        'In a small (2×2), homogeneous system with constant coefficients and no initial conditions, which method offers the fastest analytical path?'
      ),
      choices: [
        'Operatör yöntemi (D-operatör determinantı ve karakteristik kökler)',
        'Laplace dönüşümü yöntemi (ters dönüşüm gerektirir)',
        'Sayısal Runge-Kutta 4. mertebe integrasyonu'
      ],
      answer: 0,
      feedback: text(
        'Başlangıç koşulu olmadığında Laplace dönüşümü bilinmeyen x(0) ve y(0) sembollerini taşımak zorunda kalır. Oysa operatör determinantı φ(D) = det[φ_ij(D)] doğrudan karakteristik kökleri ve homojen genel çözümü saniyeler içinde verir.',
        'Without initial conditions, the Laplace transform must carry unknown symbols x(0) and y(0). The operator determinant φ(D) = det[φ_ij(D)] yields the characteristic roots and homogeneous modes directly in seconds.'
      ),
      hints: text(
        ['Başlangıç koşullarının yokluğu hangi yöntemde cebirsel yük yaratır?', 'Determinant açılımı 2×2 için kaç saniye sürer?'],
        ['The absence of initial data creates symbolic overhead in which method?', 'How fast is a 2×2 determinant expansion?']
      )
    },
    {
      title: text('IVP başlangıç değer problemlerinde en verimli yöntem', 'Optimal method for initial value problems (IVP)'),
      tag: 'BAŞLANGIÇ DEĞER PROBLEMİ / INITIAL VALUE PROBLEM',
      text: text(
        't = 0 anında başlangıç değerleri x(0) = x₀ ve y(0) = y₀ açıkça verildiğinde ve zorlama fonksiyonu süreksiz bir basamak (Heaviside) içerdiğinde hangi yöntem tartışmasız en üstündür?',
        'When initial data x(0) = x₀ and y(0) = y₀ at t = 0 are explicitly given and the forcing includes a discontinuous step (Heaviside), which method is undisputedly superior?'
      ),
      choices: [
        'Laplace dönüşümü yöntemi; başlangıç koşullarını doğrudan soğurur ve aralık dikişi gerektirmez',
        'Operatör yöntemi; bağımlı sabitleri denklemlere koyarak tek tek eler',
        'Parametrelerin değişimi yöntemi; temel matris integraliyle çözer'
      ],
      answer: 0,
      feedback: text(
        'Laplace dönüşümü türev teoremleri gereğince başlangıç koşullarını daha ilk adımda cebirsel denkleme gömer. Ayrıca Heaviside terimleri e^{-as} frekans kaydırmasıyla tek formülde çözülür; sabit eleme ve aralık süreklilik dikişleri tamamen ortadan kalkar.',
        'The Laplace transform embeds initial data directly into algebraic equations in its opening step. Furthermore, Heaviside terms transform via e^{-as} into a unified formula, eliminating constant elimination and boundary value matching.'
      ),
      hints: text(
        ['Türevlerin Laplace dönüşümünde x(0) terimi nereye girer?', 'Parçalı zaman aralıklarında sınır eşlemekten nasıl kaçınırız?'],
        ['Where does the initial value x(0) appear in derivative transforms?', 'How do we avoid matching boundary conditions across distinct intervals?']
      )
    },
    {
      title: text('Yüksek boyutlu sistemler ve durum uzayı', 'High-dimensional systems and state space'),
      tag: 'DURUM UZAYI / STATE SPACE',
      text: text(
        'Boyutu n ≥ 3 olan veya bilgisayar yazılımlarıyla (MATLAB, Python) çözülecek genel diferansiyel sistemlerde hangi yöntem standart mühendislik yaklaşımıdır?',
        'For general differential systems of dimension n ≥ 3 or those solved computationally, which method is the standard engineering approach?'
      ),
      choices: [
        'Matris yöntemi: ẋ = A x + f durum uzayı formülasyonu ve özdeğer/özvektör analizi',
        'Operatör yöntemi: n×n sembolik türev determinantı açılımı',
        'Değişken ayırma yöntemi'
      ],
      answer: 0,
      feedback: text(
        'Yüksek boyutlu sistemlerde skaler operatör determinantı açmak derece büyüdükçe imkansızlaşır. Durum uzayı matris yöntemi (ẋ = A x + f) ise standart matris cebri, özdeğer algoritmaları ve modal analiz teknikleriyle boyuttan bağımsız olarak genelleşir.',
        'Expanding scalar operator determinants for high dimensions rapidly becomes intractable. The state-space matrix formulation (ẋ = A x + f) generalizes seamlessly via standard linear algebra, eigenvalue algorithms, and modal analysis.'
      ),
      hints: text(
        ['Büyük sistemlerde bilgisayarlar hangi veri yapısını kullanır?', 'n×n bir matrisin özdeğerleri nasıl bulunur?'],
        ['Which data structure do computers utilize for large dynamical systems?', 'How are eigenvalues computed for an n×n matrix?']
      )
    },
    {
      title: text('Operatör yönteminde bağımsız sabit sayısı N', 'Independent constant count N in operator method'),
      tag: 'SABİT SAYISI KURALI / CONSTANT COUNT RULE',
      text: text(
        'İki bağımlı değişkenli (x, y) bir sistemde operatör determinantı φ(D) = det[φ_ij(D)] üçüncü dereceden bir polinom ise (deg φ(D) = 3), genel çözümde kaç bağımsız keyfi sabit bulunmalıdır?',
        'In a system of two dependent variables (x, y), if the operator determinant φ(D) = det[φ_ij(D)] is a polynomial of degree 3 (deg φ(D) = 3), how many independent arbitrary constants must exist in the general solution?'
      ),
      choices: [
        'Kesinlikle 3 bağımsız sabit',
        '6 bağımsız sabit (x için 3, y için 3)',
        '2 bağımsız sabit'
      ],
      answer: 0,
      feedback: text(
        'Temel kural: Bir diferansiyel denklem sisteminin genel çözümündeki bağımsız keyfi sabit sayısı, katsayı operatör matrisinin determinantının derecesine eşittir: N = deg φ(D) = 3. x ve y için yazılan 3+3=6 sabitten 3 tanesi denklemlere konularak elenmek zorundadır.',
        'Fundamental theorem: The number of independent arbitrary constants in the general solution of a linear system strictly equals the degree of the operator determinant: N = deg φ(D) = 3. Out of 3+3=6 written constants for x and y, 3 must be eliminated.'
      ),
      hints: text(
        ['Karakteristik polinomun kaç kökü vardır?', 'x ve y birbirinden bağımsız mıdır yoksa kuple midir?'],
        ['How many roots does the characteristic polynomial possess?', 'Are x and y independent or coupled?']
      )
    },
    {
      title: text('Matris yönteminde genel çözüm ve temel matris', 'General solution and fundamental matrix'),
      tag: 'TEMEL MATRİS / FUNDAMENTAL MATRIX',
      text: text(
        'n adet lineer bağımsız vektör çözüm x₁(t), x₂(t), ..., x_n(t) bir araya getirilerek kurulan X(t) = [x₁, x₂, ..., x_n] matrisi için hangisi daima doğrudur?',
        'For the fundamental matrix X(t) = [x₁, x₂, ..., x_n] constructed from n linearly independent vector solutions, which statement is always true?'
      ),
      choices: [
        'Tüm t değerleri için det X(t) ≠ 0 olup temel matris daima tersi alınabilirdir (non-singular)',
        'det X(t) = 0 olup matris tersi bulunamaz',
        'Yalnızca t = 0 anında tersi vardır, t > 0 için singülerleşir'
      ],
      answer: 0,
      feedback: text(
        'Çözümler lineer bağımsız olduğundan Wronskian determinantı W(t) = det X(t) Abel-Liouville teoremi gereğince ya hiçbir zaman sıfır olmaz ya da her yerde sıfırdır. Bağımsız çözümler için det X(t) hiçbir t anında sıfırlanmaz; dolayısıyla X⁻¹(t) her zaman mevcuttur.',
        'Because the solutions are linearly independent, the Wronskian det X(t) never vanishes for any t by the Abel-Liouville theorem. Consequently, the fundamental matrix X(t) is strictly non-singular everywhere and X⁻¹(t) always exists.'
      ),
      hints: text(
        ['Lineer bağımsız vektörlerin determinantı sıfır olabilir mi?', 'Abel-Liouville Wronskian teoremine başvur.'],
        ['Can linearly independent vector solutions produce a vanishing determinant?', 'Refer to the Abel-Liouville Wronskian theorem.']
      )
    },
    ...systemsSummaryExtraQuestions
  ]
};
