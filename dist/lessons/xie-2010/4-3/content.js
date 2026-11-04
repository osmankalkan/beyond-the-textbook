import {extraQuestions} from './questions.js';
import {particularStudy, particularClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const particularLesson = {
  id: 'xie-2010:4.3',
  section: '4.3',
  chapterNumber: '04',
  chapterTitle: text('Doğrusal diferansiyel denklemler', 'Linear differential equations'),
  title: text(
    'Özel çözümler: belirsiz katsayılar, D-operatörü ve parametrelerin değişimi',
    'Particular solutions: undetermined coefficients, D-operator and variation of parameters'
  ),
  englishTitle: 'Particular Solutions: Method of Undetermined Coefficients, Method of D-Operators, and Method of Variation of Parameters',
  subtitle: text(
    'Sabit katsayılı φ(D)y=F(x) denkleminde önce homojen kökleri bul ve F(x)’i sınıflandır. UC ailelerinde Tablo 4.1 + x^p rezonans kuralı veya D-operatörü Teorem 1–4 en hızlı yolu verir; ln x, csc x gibi UC dışı sağ taraflarda parametrelerin değişimi genel çözümü tamamlar.',
    'For a constant-coefficient ODE φ(D)y=F(x), find the homogeneous roots first and classify F(x). On UC families, Table 4.1 with the x^p resonance rule or D-operator Theorems 1–4 give the fastest route; for non-UC forcing like ln x or csc x, variation of parameters completes the general solution.'
  ),
  pages: '153–177',
  pdfPages: '171–195',
  lessonPath: text('lessons/xie-2010/4-3/lesson.md', 'lessons/xie-2010/4-3/lesson-en.md'),
  mathPath: 'lessons/xie-2010/4-3/math.json',
  inlinePath: 'lessons/xie-2010/4-3/inline.json',
  labFamily: 'particular',
  downloadName: text('4-3-ozel-cozum-yontemleri.md', '4-3-particular-solutions.md'),
  highlights: text(
    [
      'Belirsiz katsayılar yöntemi (§4.3.1): Tablo 4.1 denemeleri ve x^p rezonans kuralı',
      'Trigonometrik kuvvet indirgeme ve cos βx / sin βx çiftinin zorunluluğu',
      'D-operatörü (§4.3.2): üstel kural (Teorem 1), kaydırma (Teorem 2) ve polinom serisi',
      'Sinüzoidal kural D² → −β² (Teorem 3) ve rezonans türev kuralı 1/φ^{(p)}(a) (Teorem 4)',
      'Parametrelerin değişimi (§4.3.3): Wronskian sistemi ve UC dışı sağ taraflar (csc³x, ln x)'
    ],
    [
      'Method of undetermined coefficients (§4.3.1): Table 4.1 trials and the x^p resonance rule',
      'Trigonometric power reduction and why the full cos βx / sin βx pair is mandatory',
      'Method of D-operators (§4.3.2): exponential rule (Theorem 1), shift (Theorem 2), and polynomial series',
      'Sinusoidal rule D² → −β² (Theorem 3) and resonance derivative rule 1/φ^{(p)}(a) (Theorem 4)',
      'Variation of parameters (§4.3.3): Wronskian system and non-UC forcing (csc³x, ln x)'
    ]
  ),
  notesPlaceholder: text(
    'Sağ taraf F(x) bir UC fonksiyonu mu? Karakteristik köklerle çakışma (rezonans) katlılığı p kaç ve hangi yöntem daha az işlem gerektiriyor?',
    'Is the forcing F(x) a UC function? What is the resonance multiplicity p with the characteristic roots, and which method requires less algebra?'
  ),
  sourceSummary: text(
    '§4.3, s.153–177 (PDF s.171–195) temelinde özgün uyarlama. Örnek 4.12–4.29 arasındaki tüm yöntemler (belirsiz katsayılar, D-operatörü Teorem 1–4 ve parametrelerin değişimi) eksiksiz kapsanmaktadır.',
    'Original adaptation of §4.3, pp.153–177 (PDF pp.171–195). Covers all methods and Examples 4.12–4.29 across undetermined coefficients, D-operator Theorems 1–4, and variation of parameters.'
  ),
  modelLimits: text(
    'Atölye dört temsili aile kullanır: (D²+9)y=3e^{2x} (Örnek 4.12), (D²+2D)y=4x²+2x+3 (Örnek 4.16), (D²+4D+13)y=e^{-2x}sin 3x (Örnek 4.26) ve x>0 üzerinde (D²−2D+1)y=e^x ln x (Örnek 4.28 uyarlaması). Logaritmik aile yalnız x>0 bölgesinde tanımlıdır ve başlangıç noktası x₀=1’dir.',
    'The workshop models four representative families: (D²+9)y=3e^{2x} (Example 4.12), (D²+2D)y=4x²+2x+3 (Example 4.16), (D²+4D+13)y=e^{-2x}sin 3x (Example 4.26), and (D²−2D+1)y=e^x ln x on x>0 (adapted from Example 4.28). The logarithmic family is defined only for x>0 with initial point x₀=1.'
  ),
  presentation: {
    clinicEyebrow: text('§4.3 · VİZE ÇALIŞMASI · ÖZGÜN SORULAR', '§4.3 · MIDTERM STUDY · ORIGINAL PROBLEMS'),
    lab: text('Özel çözüm ve rezonans atölyesi', 'Particular solution and resonance workshop'),
    practice: text('Vize hazırlığı', 'Midterm preparation'),
    practiceTitle: text('Önce sağ tarafı sınıflandır, sonra rezonansı denetle, en kısa operatör yolunu uygula', 'Classify the forcing first, check resonance next, then apply the shortest operator path'),
    practiceIntro: text(
      '18 dakika · 22 puan. Dört çözümlü vaka üzerinde belirsiz katsayılar rezonansı, D-operatörü Teorem 2–4 ve parametrelerin değişimi yöntemlerini çalış; ardından 12 soruyla kendini sına.',
      '18 minutes · 22 points. Work through four cases on undetermined-coefficient resonance, D-operator Theorems 2–4, and variation of parameters, then test yourself with 12 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original study questions; these do not predict an actual exam.'
    )
  },
  studySupport: particularStudy,
  guidedTools: particularClinic,
  questions: [
    {
      title: text('Üstel sağ tarafta belirsiz katsayılar (Örnek 4.12)', 'Undetermined coefficients with exponential forcing (Example 4.12)'),
      tag: 'ÖRNEK 4.12 / EXAMPLE 4.12',
      text: text(
        '(D² + 9)y = 3e^{2x} diferansiyel denkleminin özel çözümü y_P hangisidir?',
        'What is the particular solution y_P of the differential equation (D² + 9)y = 3e^{2x}?'
      ),
      choices: text(
        [
          'y_P = (3/13) e²ˣ',
          'y_P = (1/3) e²ˣ',
          'y_P = (3/13)x e²ˣ'
        ],
        [
          'y_P = (3/13) e²ˣ',
          'y_P = (1/3) e²ˣ',
          'y_P = (3/13)x e²ˣ'
        ]
      ),
      answer: 0,
      feedback: text(
        'y_P = A e²ˣ denendiğinde (2² + 9)A e²ˣ = 13A e²ˣ = 3e²ˣ olur ve A = 3/13 bulunur. a = 2 karakteristik denklemin (λ² + 9 = 0 ⇒ λ = ±3i) kökü olmadığı için x çarpanı gerekmez.',
        'Trying y_P = A e²ˣ gives (2² + 9)A e²ˣ = 13A e²ˣ = 3e²ˣ, so A = 3/13. Since a = 2 is not a root of λ² + 9 = 0 (λ = ±3i), no factor of x is needed.'
      ),
      hints: text(
        ['D²(e²ˣ) ifadesi kaç e²ˣ eder?', 'a = 2 değeri λ² + 9 = 0 denklemini sağlar mı?'],
        ['What is D²(e²ˣ)?', 'Is a = 2 a root of λ² + 9 = 0?']
      )
    },
    {
      title: text('Sinüzoidal sağ tarafta neden hem cos hem sin gerekir? (Örnek 4.14)', 'Why both cos and sin are needed for sinusoidal forcing (Example 4.14)'),
      tag: 'ÖRNEK 4.14 / EXAMPLE 4.14',
      text: text(
        '(D² + 2D + 4)y = 111 e⁻ˣ cos 3x denkleminde sağ tarafta yalnız cos 3x varken neden y_P = e⁻ˣ(A cos 3x + B sin 3x) denemesi kullanılır?',
        'In (D² + 2D + 4)y = 111 e⁻ˣ cos 3x, why must the trial solution be y_P = e⁻ˣ(A cos 3x + B sin 3x) even though only cos 3x appears on the right?'
      ),
      choices: text(
        [
          'Birinci türev terimi 2Dy, e⁻ˣ cos 3x ifadesinden e⁻ˣ sin 3x terimleri de ürettiği için her iki katsayıyı dengelemek gerekir',
          'Karakteristik kökler −1 ± √3 i ile çakışma olduğu için',
          'B katsayısı her zaman sıfır çıkacağı için yalnız kontrol amaçlı yazılır'
        ],
        [
          'Because the first-derivative term 2Dy generates e⁻ˣ sin 3x terms from e⁻ˣ cos 3x, both functions are needed to balance the equation',
          'Because there is resonance with the characteristic roots −1 ± √3 i',
          'Because B always turns out to be zero and is included only as a check'
        ]
      ),
      answer: 0,
      feedback: text(
        'Türev alındığında cos 3x hem cos 3x hem sin 3x üretir. Örnek 4.14’te −5A + 6B = 0 ve −6A − 5B = 111 sistemi A = −6, B = −5 verir; yani B sıfır değildir!',
        'Differentiating cos 3x produces both cos 3x and sin 3x. In Example 4.14, the system −5A + 6B = 0 and −6A − 5B = 111 yields A = −6 and B = −5; B is non-zero!'
      ),
      hints: text(
        ['d/dx(cos 3x) nedir?', 'Denklemde tek mertebeli türev D var mı?'],
        ['What is d/dx(cos 3x)?', 'Does the ODE contain an odd-order derivative D?']
      )
    },
    {
      title: text('Trigonometrik kuvvet indirgeme (Örnek 4.15)', 'Trigonometric power reduction (Example 4.15)'),
      tag: 'ÖRNEK 4.15 / EXAMPLE 4.15',
      text: text(
        '(D² + 4)y = 4 cos³ 2x denklemini çözmeden önce 4 cos³ 2x = cos 6x + 3 cos 2x özdeşliği kullanıldığında doğru y_P denemesi hangisidir?',
        'Using the identity 4 cos³ 2x = cos 6x + 3 cos 2x for (D² + 4)y = 4 cos³ 2x, what is the correct trial solution y_P?'
      ),
      choices: text(
        [
          'y_P = A cos 6x + B sin 6x + x(C cos 2x + E sin 2x)',
          'y_P = A cos 6x + B sin 6x + C cos 2x + E sin 2x',
          'y_P = x(A cos 6x + B sin 6x + C cos 2x + E sin 2x)'
        ],
        [
          'y_P = A cos 6x + B sin 6x + x(C cos 2x + E sin 2x)',
          'y_P = A cos 6x + B sin 6x + C cos 2x + E sin 2x',
          'y_P = x(A cos 6x + B sin 6x + C cos 2x + E sin 2x)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Karakteristik kökler λ = ±2i’dir (y_C = C₁ cos 2x + C₂ sin 2x). Sağdaki cos 6x terimi rezonanssızdır, ancak 3 cos 2x terimi y_C ile p = 1 katlı rezonanstadır; bu yüzden yalnız 2x frekanslı parça x ile çarpılır.',
        'The characteristic roots are λ = ±2i (y_C = C₁ cos 2x + C₂ sin 2x). The cos 6x term is non-resonant, whereas 3 cos 2x resonates with y_C (p = 1); hence only the 2x-frequency part is multiplied by x.'
      ),
      hints: text(
        ['D² + 4 = 0 denkleminin kökleri hangi frekansla çakışır: 2x mi, 6x mi?', 'Rezonans çarpanı x tüm sağ tarafa mı yoksa yalnız çakışan aileye mi uygulanır?'],
        ['Which frequency matches the roots of D² + 4 = 0: 2x or 6x?', 'Is the factor x applied to the whole right side or only to the resonant family?']
      )
    },
    {
      title: text('Polinom sağ tarafta λ = 0 rezonansı (Örnek 4.16)', 'λ = 0 resonance with polynomial forcing (Example 4.16)'),
      tag: 'ÖRNEK 4.16 / EXAMPLE 4.16',
      text: text(
        '(D² + 2D)y = 4x² + 2x + 3 denklemi için özel çözüm y_P hangisidir?',
        'What is the particular solution y_P of (D² + 2D)y = 4x² + 2x + 3?'
      ),
      choices: text(
        [
          'y_P = (2/3)x³ − (1/2)x² + 2x',
          'y_P = 2x² − x + 3/2',
          'y_P = (2/3)x³ + (1/2)x² + 3x'
        ],
        [
          'y_P = (2/3)x³ − (1/2)x² + 2x',
          'y_P = 2x² − x + 3/2',
          'y_P = (2/3)x³ + (1/2)x² + 3x'
        ]
      ),
      answer: 0,
      feedback: text(
        'λ = 0 basit kök olduğu için y_P = Ax³ + Bx² + Cx denenir. (D² + 2D)y_P = 6Ax² + (6A + 4B)x + (2B + 2C) = 4x² + 2x + 3 eşitliğinden A = 2/3, B = −1/2, C = 2 bulunur.',
        'Because λ = 0 is a simple root, try y_P = Ax³ + Bx² + Cx. From (D² + 2D)y_P = 6Ax² + (6A + 4B)x + (2B + 2C) = 4x² + 2x + 3 we obtain A = 2/3, B = −1/2, C = 2.'
      ),
      hints: text(
        ['En yüksek dereceli terim 2D(Ax³) = 6Ax² sağdaki 4x²’ye eşitlenirse A kaç olur?', '6A + 4B = 2 ve 2B + 2C = 3 denklemlerini sırayla çöz.'],
        ['Equating the highest-degree term 2D(Ax³) = 6Ax² to 4x² gives what value of A?', 'Solve 6A + 4B = 2 and 2B + 2C = 3 in turn.']
      )
    },
    {
      title: text('Üç katlı kökte x^p kuralı (Örnek 4.17)', 'The x^p rule at a triple root (Example 4.17)'),
      tag: 'ÖRNEK 4.17 / EXAMPLE 4.17',
      text: text(
        '(D³ − 6D² + 12D − 8)y = x e²ˣ + x² denkleminde sağ tarafın iki parçası için doğru y_P denemesi hangisidir?',
        'For (D³ − 6D² + 12D − 8)y = x e²ˣ + x², what is the correct trial form y_P for the two parts of the right-hand side?'
      ),
      choices: text(
        [
          'y_P = x³(Ax + B)e²ˣ + Cx² + Ex + F',
          'y_P = (Ax + B)e²ˣ + Cx² + Ex + F',
          'y_P = x³(Ax + B)e²ˣ + x³(Cx² + Ex + F)'
        ],
        [
          'y_P = x³(Ax + B)e²ˣ + Cx² + Ex + F',
          'y_P = (Ax + B)e²ˣ + Cx² + Ex + F',
          'y_P = x³(Ax + B)e²ˣ + x³(Cx² + Ex + F)'
        ]
      ),
      answer: 0,
      feedback: text(
        'φ(D) = (D − 2)³ olduğundan λ = 2 üç katlı köktür (p = 3), fakat λ = 0 kök değildir (p = 0). Bu yüzden x e²ˣ denemesi (Ax + B)e²ˣ çarpan olarak x³ alırken, x² polinom denemesi Cx² + Ex + F olduğu gibi kalır.',
        'Since φ(D) = (D − 2)³, λ = 2 is a triple root (p = 3) while λ = 0 is not a root (p = 0). Hence the trial (Ax + B)e²ˣ for x e²ˣ is multiplied by x³, whereas the trial Cx² + Ex + F for x² needs no x factor.'
      ),
      hints: text(
        ['D³ − 6D² + 12D − 8 polinomunu çarpanlarına ayır: (D − 2)³.', 'λ = 2 kökünün katlılığı kaçtır; λ = 0 kök müdür?'],
        ['Factor D³ − 6D² + 12D − 8 as (D − 2)³.', 'What is the multiplicity of λ = 2, and is λ = 0 a root?']
      )
    },
    {
      title: text('Hiperbolik ve polinom sağ tarafta çifte rezonans (Örnek 4.18)', 'Double resonance with hyperbolic and polynomial forcing (Example 4.18)'),
      tag: 'ÖRNEK 4.18 / EXAMPLE 4.18',
      text: text(
        '(D⁴ − 4D²)y = sinh 2x + 2x² denklemi için doğru özel çözüm denemesi hangisidir?',
        'What is the correct trial particular solution for (D⁴ − 4D²)y = sinh 2x + 2x²?'
      ),
      choices: text(
        [
          'y_P = x(A sinh 2x + B cosh 2x) + x²(Ex² + Fx + G)',
          'y_P = A sinh 2x + B cosh 2x + x²(Ex² + Fx + G)',
          'y_P = x²(A sinh 2x + B cosh 2x) + x(Ex² + Fx + G)'
        ],
        [
          'y_P = x(A sinh 2x + B cosh 2x) + x²(Ex² + Fx + G)',
          'y_P = A sinh 2x + B cosh 2x + x²(Ex² + Fx + G)',
          'y_P = x²(A sinh 2x + B cosh 2x) + x(Ex² + Fx + G)'
        ]
      ),
      answer: 0,
      feedback: text(
        'λ⁴ − 4λ² = λ²(λ − 2)(λ + 2) = 0 kökleri λ = 0, 0, 2, −2’dir. sinh 2x terimi λ = ±2 basit kökleriyle (p = 1) çakıştığı için x ile, 2x² polinomu ise λ = 0 çift köküyle (p = 2) çakıştığı için x² ile çarpılır.',
        'The roots of λ⁴ − 4λ² = λ²(λ − 2)(λ + 2) = 0 are λ = 0, 0, 2, −2. Because sinh 2x duplicates the simple roots λ = ±2 (p = 1), multiply its trial by x; because 2x² duplicates the double root λ = 0 (p = 2), multiply its trial by x².'
      ),
      hints: text(
        ['sinh 2x = (e²ˣ − e⁻²ˣ)/2 hangi karakteristik köklerle çakışır ve bu köklerin katlılığı kaçtır?', '2x² polinomu hangi karakteristik kökle çakışır ve katlılığı kaçtır?'],
        ['Which characteristic roots match sinh 2x = (e²ˣ − e⁻²ˣ)/2, and what is their multiplicity?', 'Which characteristic root matches the polynomial 2x², and what is its multiplicity?']
      )
    },
    {
      title: text('D-operatörü Teorem 2: üstel kaydırma kuralı (§4.3.2)', 'D-operator Theorem 2: exponential shift rule (§4.3.2)'),
      tag: 'TEOREM 2 / THEOREM 2',
      text: text(
        'Ters operatörde üstel kaydırma teoremi [1/φ(D)][e^{ax} f(x)] aşağıdakilerden hangisine eşittir?',
        'By the exponential shift theorem (Theorem 2), what does [1/φ(D)][e^{ax} f(x)] equal?'
      ),
      choices: text(
        [
          'e^{ax} · [1/φ(D + a)] f(x)',
          'e^{ax} · [1/φ(D − a)] f(x)',
          '[1/φ(a)] · e^{ax} f(x)'
        ],
        [
          'e^{ax} · [1/φ(D + a)] f(x)',
          'e^{ax} · [1/φ(D − a)] f(x)',
          '[1/φ(a)] · e^{ax} f(x)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Çarpım kuralıyla D[e^{ax}g(x)] = e^{ax}(D + a)g(x) ve genel olarak φ(D)[e^{ax}g(x)] = e^{ax}φ(D + a)g(x) olur. Ters operatörde de e^{ax} sola geçerken D yerine D + a yazılır.',
        'By the product rule, D[e^{ax}g(x)] = e^{ax}(D + a)g(x) and generally φ(D)[e^{ax}g(x)] = e^{ax}φ(D + a)g(x). Inverting this relation pulls e^{ax} to the left while replacing D with D + a.'
      ),
      hints: text(
        ['D(e^{ax} g(x)) çarpım türevini al ve e^{ax} parantezine çek.', 'e^{ax} sola çıktığında D operatörü nasıl kayar?'],
        ['Differentiate D(e^{ax} g(x)) by the product rule and factor out e^{ax}.', 'How is D shifted when e^{ax} moves to the left of the operator?']
      )
    },
    ...extraQuestions
  ]
};
