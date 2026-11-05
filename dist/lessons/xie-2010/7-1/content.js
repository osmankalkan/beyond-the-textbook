import {systemsExtraQuestions} from './questions.js';
import {systemsStudy, systemsClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const systemsLesson = {
  id: 'xie-2010:7.1',
  section: '7.1',
  chapterNumber: '07',
  chapterTitle: text('Doğrusal diferansiyel denklem sistemleri', 'Systems of Linear Differential Equations'),
  title: text('Giriş: düzlemde parçacık hareketi ve çok katlı kesme binası', 'Introduction: particle motion in a plane and multi-story shear buildings'),
  englishTitle: 'Introduction: Particle Motion in a Plane and Multi-Story Shear Buildings',
  subtitle: text(
    'Tek bir diferansiyel denklemden çok serbestlik dereceli sistemlere geçiş: dikdörtgen ve kutupsal koordinatlarda parçacık hareketi, n katlı kesme binasının M, C, K matrisleri, statik denge, doğal frekanslar ve 2n boyutlu birinci mertebe durum uzayı.',
    'From a single differential equation to multi-degree-of-freedom systems: particle motion in rectangular and polar coordinates, the M, C, K matrices of an n-story shear building, static equilibrium, natural frequencies, and the 2n-dimensional first-order state space.'
  ),
  pages: '300–304',
  pdfPages: '318–322',
  lessonPath: text('lessons/xie-2010/7-1/lesson.md', 'lessons/xie-2010/7-1/lesson-en.md'),
  mathPath: 'lessons/xie-2010/7-1/math.json',
  inlinePath: 'lessons/xie-2010/7-1/inline.json',
  labFamily: 'systems',
  downloadName: text('7-1-diferansiyel-denklem-sistemleri.md', '7-1-systems-of-differential-equations.md'),
  highlights: text(
    [
      'Çok değişkenli sistemlerin doğal formu: x˙ = A(t)x + f(t)',
      'Düzlemde parçacık: dikdörtgen koordinatlarda m x¨ = F_x, m y¨ = F_y',
      'Kutupsal koordinatlarda radyal ivme a_r = r¨ − rθ˙² ve açısal ivme a_θ = 2r˙θ˙ + rθ¨',
      'Polar sistemin lineer olmama tuzağı: rθ˙² ve r˙θ˙ çarpımları',
      'n katlı kesme binası: M x¨ + C x˙ + K x = F(t) ve tridiagonal K, C matrisleri',
      'İki katlı bina için statik çözüm, doğal frekanslar ve mod şekilleri',
      'İkinci mertebe sistemleri 2n boyutlu birinci mertebe durum uzayına dönüştürme',
      'Sınav kontrolü: işaret, sınır koşulu, boyut ve özdeğer doğrulaması'
    ],
    [
      'Natural form of multi-variable systems: ẋ = A(t)x + f(t)',
      'Particle in a plane: m ẍ = F_x and m ÿ = F_y in rectangular coordinates',
      'Polar radial acceleration a_r = r̈ − rθ̇² and angular acceleration a_θ = 2ṙθ̇ + rθ̈',
      'The polar nonlinearity trap: products rθ̇² and ṙθ̇',
      'n-story shear building: M ẍ + C ẋ + K x = F(t) with tridiagonal K and C',
      'Two-story static solution, natural frequencies, and mode shapes',
      'Converting second-order systems into a 2n-dimensional first-order state space',
      'Exam checks: signs, boundary conditions, dimension, and eigenvalues'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Kutupsal denklemlerde merkezcil terimin işaretini ve kesme binasında alt/üst kolon kuvvetlerinin yönünü nasıl hızlıca kontrol edebilirim?',
    'E.g., how can I quickly check the sign of the centripetal term in polar equations and the directions of lower/upper column forces in a shear building?'
  ),
  sourceSummary: text(
    '§7.1 Introduction, s.300–304 (PDF s.318–322, Örnek 7.1 ve 7.2) temelinde hazırlanmış derinlemesine konu anlatımı, iki rehberli türetim yolu ve 22 puanlık sınav kliniği.',
    'In-depth instructional module based on §7.1 Introduction, pp. 300–304 (PDF pp. 318–322, Examples 7.1 and 7.2), with two guided derivation paths and a 22-point exam clinic.'
  ),
  modelLimits: text(
    'Sistem laboratuvarı iki bağımsız model sunar. Parçacık modunda kuvvet, anlık radyal/teğetsel çerçevede uygulanır ve Kartezyen durum RK4 ile integre edilir; kutupsal büyüklükler hareketten yeniden hesaplanır. Parçacık orijine yaklaşırsa, kutupsal yön tanımsız olduğu için integrasyon ilk güvenli yarıçapta durdurulur. Bina modunda iki katlı, doğrusal viskoz sönümlü kesme binası 4 durumlu RK4 ile çözülür; statik çözüm ve doğal frekanslar aynı parametrelerden analitik olarak elde edilir. Model, büyük yer değiştirmeleri, plastik davranışı ve kat burulmasını kapsamaz.',
    'The systems workbench offers two independent models. In particle mode the force is applied in the instantaneous radial/tangential frame and the Cartesian state is integrated with RK4; polar quantities are reconstructed from the motion. If the particle approaches the origin, integration stops at the first safe radius because the polar direction is undefined there. In building mode a two-story linear viscously damped shear building is solved with a four-state RK4 integrator; static response and natural frequencies are computed analytically from the same parameters. The model excludes large displacements, plastic behaviour, and floor torsion.'
  ),
  presentation: {
    clinicEyebrow: text('§7.1 · DİFERANSİYEL DENKLEM SİSTEMLERİ · USTA KLİNİK', '§7.1 · SYSTEMS OF DIFFERENTIAL EQUATIONS · MASTER CLINIC'),
    lab: text('Parçacık ve kesme binası laboratuvarı', 'Particle & shear-building workbench'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('Koordinat, matris ve durum uzayını 60 saniyede teşhis et', 'Diagnose coordinates, matrices, and state space in 60 seconds'),
    practiceIntro: text(
      '22 dakika · 22 puan. Dört kapsamlı sınav sorusunda kutupsal türetimi, kesme binası matrislerini, statik/frekans hesabını ve durum uzayı dönüşümünü çöz; ardından 12 soruyla ustalığını kanıtla.',
      '22 minutes · 22 points. Work through polar derivation, shear-building matrices, static/frequency analysis, and state-space conversion in four exam problems, then verify mastery with 12 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: systemsStudy,
  guidedTools: systemsClinic,
  questions: [
    {
      title: text('Lineer diferansiyel denklem sistemi tanımı', 'Definition of a linear system of differential equations'),
      tag: 'TANIM / DEFINITION',
      text: text(
        'Aşağıdakilerden hangisi iki bilinmeyenli bir lineer diferansiyel denklem sistemidir?',
        'Which of the following is a linear system of differential equations in two unknowns?'
      ),
      choices: text(
        [
          'x₁′ = 2x₁ − 3x₂ + t,  x₂′ = x₁ + 4x₂',
          'x₁′ = x₁x₂,  x₂′ = x₁²',
          'x₁′ = sin(x₁),  x₂′ = x₂'
        ],
        [
          'x₁′ = 2x₁ − 3x₂ + t,  x₂′ = x₁ + 4x₂',
          'x₁′ = x₁x₂,  x₂′ = x₁²',
          'x₁′ = sin(x₁),  x₂′ = x₂'
        ]
      ),
      answer: 0,
      feedback: text(
        'Lineerlik, bilinmeyenlerin yalnızca birinci kuvvetinin ve birbirleriyle çarpımsız toplamlarının bulunmasıdır. Katsayılar t’ye bağlı olabilir; ancak x₁x₂ veya sin(x₁) gibi terimler sistemi lineer olmaktan çıkarır.',
        'Linearity requires unknowns to appear only to the first power and without products. Coefficients may depend on t, but terms such as x₁x₂ or sin(x₁) make the system nonlinear.'
      ),
      hints: text(
        [
          'Bilinmeyenlerin çarpımı var mı?',
          'Bilinmeyenin doğrusal olmayan bir fonksiyonu (sinüs, kare) var mı?'
        ],
        [
          'Is there a product of unknowns?',
          'Is there a nonlinear function of an unknown, such as a sine or a square?'
        ]
      )
    },
    {
      title: text('Dikdörtgen koordinatlarda parçacık denklemleri', 'Particle equations in rectangular coordinates'),
      tag: 'MODEL / MODELING',
      text: text(
        'm kütleli bir parçacığın düzlemdeki dikdörtgen koordinat hareket denklemleri hangisidir?',
        'What are the rectangular-coordinate equations of motion for a particle of mass m in a plane?'
      ),
      choices: text(
        [
          'm x¨ = F_x(x,y,t),  m y¨ = F_y(x,y,t)',
          'm x˙ = F_x(x,y,t),  m y˙ = F_y(x,y,t)',
          'm(x¨ − xθ˙²) = F_x,  m(y¨ − yθ˙²) = F_y'
        ],
        [
          'm ẍ = F_x(x,y,t),  m ÿ = F_y(x,y,t)',
          'm ẋ = F_x(x,y,t),  m ẏ = F_y(x,y,t)',
          'm(ẍ − xθ̇²) = F_x,  m(ÿ − yθ̇²) = F_y'
        ]
      ),
      answer: 0,
      feedback: text(
        'Newton’un ikinci yasası ivme ile kuvveti bağlar: m a = F. Dikdörtgen koordinatlarda ivme bileşenleri x¨ ve y¨ olduğundan denklemler m x¨ = F_x ve m y¨ = F_y olur.',
        'Newton’s second law links acceleration to force: m a = F. In rectangular coordinates the acceleration components are ẍ and ÿ, so the equations are m ẍ = F_x and m ÿ = F_y.'
      ),
      hints: text(
        [
          'Newton yasasında hız mı yoksa ivme mi kuvvetle çarpılır?',
          'Dikdörtgen koordinatlarda ivmenin bileşenleri nelerdir?'
        ],
        [
          'Does Newton’s law relate force to velocity or to acceleration?',
          'What are the components of acceleration in rectangular coordinates?'
        ]
      )
    },
    {
      title: text('Kutupsal radyal ivme', 'Polar radial acceleration'),
      tag: 'KİNEMATİK / KINEMATICS',
      text: text(
        'Kutupsal koordinatlarda radyal ivme a_r aşağıdakilerden hangisidir?',
        'In polar coordinates, which expression gives the radial acceleration a_r?'
      ),
      choices: text(
        ['r¨ − rθ˙²', 'r¨ + rθ˙²', '2r˙θ˙ + rθ¨'],
        ['r̈ − rθ̇²', 'r̈ + rθ̇²', '2ṙθ̇ + rθ̈']
      ),
      answer: 0,
      feedback: text(
        'x = r cos θ ve y = r sin θ türevlerinden a_r = r¨ − rθ˙² elde edilir. −rθ˙² terimi merkezcil ivmedir; sabit yarıçapta bile sıfırdan farklıdır.',
        'Differentiating x = r cos θ and y = r sin θ gives a_r = r̈ − rθ̇². The −rθ̇² term is the centripetal acceleration and is nonzero even at constant radius.'
      ),
      hints: text(
        [
          'İkinci türevde θ˙’nün karesi hangi işaretle gelir?',
          'Dairesel hareket için merkeze doğru ivme beklenir; işaret bununla uyumlu mu?'
        ],
        [
          'With what sign does θ̇² appear in the second derivative?',
          'Circular motion should accelerate inward; is the sign consistent with that?'
        ]
      )
    },
    {
      title: text('Kutupsal açısal ivme', 'Polar angular acceleration'),
      tag: 'KİNEMATİK / KINEMATICS',
      text: text(
        'Kutupsal koordinatlarda açısal ivme a_θ aşağıdakilerden hangisidir?',
        'In polar coordinates, which expression gives the angular acceleration a_θ?'
      ),
      choices: text(
        ['2r˙θ˙ + rθ¨', 'r¨ − rθ˙²', 'rθ˙²'],
        ['2ṙθ̇ + rθ̈', 'r̈ − rθ̇²', 'rθ̇²']
      ),
      answer: 0,
      feedback: text(
        'a_θ = 2r˙θ˙ + rθ¨ ifadesi, teğetsel yöndeki ivmenin iki kaynağını gösterir: yarıçapın değişmesiyle oluşan Coriolis benzeri terim ve açısal hızın değişmesiyle oluşan rθ¨ terimi.',
        'a_θ = 2ṙθ̇ + rθ̈ shows two sources of tangential acceleration: a Coriolis-like term from changing radius and the rθ̈ term from changing angular velocity.'
      ),
      hints: text(
        [
          'Açısal ivme, θ˙’nün zaman türeviyle mi ilgilidir?',
          'r˙ ile θ˙’nün çarpımı hangi terimi üretir?'
        ],
        [
          'Is angular acceleration related to the time derivative of θ̇?',
          'Which term comes from the product of ṙ and θ̇?'
        ]
      )
    },
    {
      title: text('Polar sistemin lineerliği', 'Linearity of the polar system'),
      tag: 'LİNEERLİK / LINEARITY',
      text: text(
        'Kutupsal koordinatlardaki hareket denklemleri neden genellikle lineer değildir?',
        'Why are the polar equations of motion generally nonlinear?'
      ),
      choices: text(
        [
          'rθ˙² ve r˙θ˙ terimleri bilinmeyenlerin çarpımını içerir.',
          'Kütle sabit olduğu için.',
          'F_r ve F_θ zamanın fonksiyonu olduğu için.'
        ],
        [
          'The terms rθ̇² and ṙθ̇ contain products of unknowns.',
          'Because the mass is constant.',
          'Because F_r and F_θ are functions of time.'
        ]
      ),
      answer: 0,
      feedback: text(
        'Bilinmeyenler r ve θ’dır. rθ˙² ve r˙θ˙ terimleri bu bilinmeyenlerin (ve türevlerinin) çarpımını içerdiğinden sistem lineer değildir. Zamanla değişen katsayılar tek başına lineerliği bozmaz.',
        'The unknowns are r and θ. The terms rθ̇² and ṙθ̇ multiply these unknowns (or their derivatives), so the system is nonlinear. Time-varying coefficients alone do not destroy linearity.'
      ),
      hints: text(
        [
          'Lineerlikte bilinmeyenlerin kuvvetleri ve çarpımları nasıl olmalıdır?',
          'r ile θ˙ aynı terimde çarpılıyor mu?'
        ],
        [
          'What powers and products of unknowns are allowed in a linear equation?',
          'Are r and θ̇ multiplied together in the same term?'
        ]
      )
    },
    {
      title: text('İki katlı kesme binasının rijitlik matrisi', 'Stiffness matrix of a two-story shear building'),
      tag: 'MATRİS / MATRIX',
      text: text(
        'İki katlı bir kesme binasında K rijitlik matrisi hangisidir?',
        'What is the stiffness matrix K of a two-story shear building?'
      ),
      choices: text(
        [
          'K = [[k₁+k₂, −k₂], [−k₂, k₂]]',
          'K = [[k₁, −k₂], [−k₂, k₂]]',
          'K = [[k₁+k₂, k₂], [k₂, k₂]]'
        ],
        [
          'K = [[k₁+k₂, −k₂], [−k₂, k₂]]',
          'K = [[k₁, −k₂], [−k₂, k₂]]',
          'K = [[k₁+k₂, k₂], [k₂, k₂]]'
        ]
      ),
      answer: 0,
      feedback: text(
        'Birinci katın köşegen terimi kendisini zemine bağlayan k₁ ile ikinci kata bağlayan k₂’nin toplamıdır: k₁+k₂. İkinci katın köşegen terimi yalnızca k₂’dir. Komşu katlar arasındaki kuplaj −k₂’dir.',
        'The first floor diagonal is the sum of k₁ (to ground) and k₂ (to the second floor): k₁+k₂. The second floor diagonal is only k₂. The coupling between adjacent floors is −k₂.'
      ),
      hints: text(
        [
          'Birinci katın üzerindeki toplam yay rijitliği kaçtır?',
          'Köşegen dışı terimlerin işareti neden negatiftir?'
        ],
        [
          'What is the total spring stiffness attached to the first floor?',
          'Why are the off-diagonal entries negative?'
        ]
      )
    },
    {
      title: text('İki katlı binada statik yer değiştirme', 'Static displacement in a two-story building'),
      tag: 'STATİK / STATICS',
      text: text(
        'F₁ ve F₂ sabit yükleri altında iki katlı binanın birinci kat statik yer değiştirmesi x₁s nedir?',
        'Under constant loads F₁ and F₂, what is the first-floor static displacement x₁s of a two-story building?'
      ),
      choices: text(
        ['(F₁ + F₂) / k₁', 'F₁ / k₁', '(F₁ − F₂) / k₂'],
        ['(F₁ + F₂) / k₁', 'F₁ / k₁', '(F₁ − F₂) / k₂']
      ),
      answer: 0,
      feedback: text(
        'Statik dengede tüm dış yükler birinci katın zemin yayı k₁ üzerinden taşınır. Bu nedenle x₁s = (F₁ + F₂)/k₁ olur. İkinci katın yer değiştirmesi buna kendi yayının deformasyonunu ekler.',
        'In static equilibrium all external loads are transmitted through the first-story spring k₁. Hence x₁s = (F₁ + F₂)/k₁. The second-floor displacement adds the deformation of its own spring.'
      ),
      hints: text(
        [
          'Statik durumda ivme ve hız terimleri ne olur?',
          'Birinci katın zemin yayı hangi yükleri taşır?'
        ],
        [
          'What happens to acceleration and velocity terms in statics?',
          'Which loads are carried by the first-story spring?'
        ]
      )
    },
    {
      title: text('Durum uzayı boyutu', 'State-space dimension'),
      tag: 'DURUM UZAYI / STATE SPACE',
      text: text(
        'n katlı bir kesme binasının birinci mertebe durum uzayı kaç denklem içerir?',
        'How many equations does the first-order state space of an n-story shear building contain?'
      ),
      choices: text(
        ['n', '2n', 'n²'],
        ['n', '2n', 'n²']
      ),
      answer: 1,
      feedback: text(
        'Her kat için bir konum ve bir hız olmak üzere iki durum değişkeni gerekir. n kat için toplam 2n birinci mertebe denklem yazılır. Örneğin iki katlı bina 4 durumlu, üç katlı bina 6 durumludur.',
        'Each floor needs two state variables, one displacement and one velocity. For n floors this gives 2n first-order equations. A two-story building has four states and a three-story building has six.'
      ),
      hints: text(
        [
          'Her ikinci mertebe denklem kaç birinci mertebe denkleme açılır?',
          'Konum ve hız ayrı ayrı durum değişkeni midir?'
        ],
        [
          'How many first-order equations does each second-order equation become?',
          'Are displacement and velocity separate state variables?'
        ]
      )
    },
    ...systemsExtraQuestions
  ]
};
