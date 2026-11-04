import {extraQuestions} from './questions.js';
import {complementaryStudy, complementaryClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const complementaryLesson = {
  id: 'xie-2010:4.2',
  section: '4.2',
  chapterNumber: '04',
  chapterTitle: text('Doğrusal diferansiyel denklemler', 'Linear differential equations'),
  title: text('Homojen çözümler ve karakteristik denklem', 'Complementary solutions and characteristic equation'),
  englishTitle: 'Complementary Solutions (Homogeneous Equations)',
  subtitle: text(
    'Sabit katsayılı homojen φ(D)y=0 denklemini y=e^{λx} denemesiyle φ(λ)=0 cebirsel denklemine indirge; gerçek, hiperbolik, karmaşık eşlenik ve katlı köklerin ürettiği n bağımsız çözümü kur.',
    'Reduce the constant-coefficient homogeneous equation φ(D)y=0 to the algebraic equation φ(λ)=0 via y=e^{λx}, and build all n independent solutions for real, hyperbolic, complex conjugate, and repeated roots.'
  ),
  pages: '143–152',
  pdfPages: '161–170',
  lessonPath: text('lessons/xie-2010/4-2/lesson.md', 'lessons/xie-2010/4-2/lesson-en.md'),
  mathPath: 'lessons/xie-2010/4-2/math.json',
  inlinePath: 'lessons/xie-2010/4-2/inline.json',
  labFamily: 'complementary',
  downloadName: text('4-2-homojen-cozumler-karakteristik-denklem.md', '4-2-complementary-solutions.md'),
  highlights: text(
    [
      'y = e^{λx} denemesi ve karakteristik denklem φ(λ) = 0',
      'Farklı gerçek kökler ve hiperbolik fonksiyonlar (sinh x, cosh x)',
      'Karmaşık eşlenik kökler λ = α ± iβ ve Euler formülü',
      'Kutupsal biçim, De Moivre ve yarım açı formülleriyle n-inci kökler',
      'p-katlı gerçek ve karmaşık kökler: y = v(x)e^{ax} indirgemesi ve D^p v = 0'
    ],
    [
      'Trial solution y = e^{λx} and the characteristic equation φ(λ) = 0',
      'Distinct real roots and hyperbolic functions (sinh x, cosh x)',
      'Complex conjugate roots λ = α ± iβ and Euler’s formula',
      'Polar form, De Moivre and half-angle formulas for n-th roots',
      'p-fold repeated real and complex roots: reduction y = v(x)e^{ax} and D^p v = 0'
    ]
  ),
  notesPlaceholder: text(
    'Karakteristik polinomun derecesi kaç? Kökler farklı gerçek mi, ±β hiperbolik çift mi, α±iβ karmaşık eşlenik mi, yoksa katlı mı?',
    'What is the degree of the characteristic polynomial? Are the roots distinct real, symmetric ±β pairs, complex conjugates α±iβ, or repeated?'
  ),
  sourceSummary: text(
    '§4.2, s.143–152 (PDF s.161–170) temelinde özgün uyarlama. Örnek 4.2–4.11, hiperbolik özdeşlikler, kutupsal kök bulma ve katlı kök indirgemesi eksiksiz kapsanmaktadır.',
    'Original adaptation of §4.2, pp.143–152 (PDF pp.161–170). Covers Examples 4.2–4.11, hyperbolic identities, polar root extraction, and reduction of order for repeated roots.'
  ),
  modelLimits: text(
    'Atölye dört ikinci mertebe karakteristik kök ailesini karşılaştırır: (D²−3D+2)y=0 (λ=1,2), (D²−4)y=0 (λ=±2 hiperbolik çift), (D²+2D+5)y=0 (λ=−1±2i sönümlü karmaşık çift) ve (D²−4D+4)y=0 (λ=2,2 çift katlı kök). Başlangıç koşulları x=0 noktasında y(0) ve y′(0) olarak uygulanır; analitik artık φ(D)y sayısal yuvarlama hassasiyetinde sıfırdır.',
    'The workshop compares four second-order characteristic root families: (D²−3D+2)y=0 (λ=1,2), (D²−4)y=0 (λ=±2 hyperbolic pair), (D²+2D+5)y=0 (λ=−1±2i damped complex pair), and (D²−4D+4)y=0 (λ=2,2 repeated double root). Initial data y(0) and y′(0) are imposed at x=0; the analytical residual φ(D)y vanishes to floating-point precision.'
  ),
  presentation: {
    clinicEyebrow: text('§4.2 · VİZE ÇALIŞMASI · ÖZGÜN SORULAR', '§4.2 · MIDTERM STUDY · ORIGINAL PROBLEMS'),
    lab: text('Karakteristik kök ve mod atölyesi', 'Characteristic root and mode workshop'),
    practice: text('Vize hazırlığı', 'Midterm preparation'),
    practiceTitle: text('Önce φ(λ)=0 köklerini bul, sonra her kök ailesini gerçek tabana eşle', 'Find the roots of φ(λ)=0 first, then map each root family to its real basis'),
    practiceIntro: text(
      '18 dakika · 22 puan. Dört çözümlü vaka üzerinde çarpanlara ayırma, hiperbolik yazılış, karmaşık köklerin karekökü ve yüksek mertebe katlı kökleri çalış; ardından 11 soruyla kendini sına.',
      '18 minutes · 22 points. Work through four cases on factoring, hyperbolic form, square roots of complex numbers, and high-order repeated roots, then test yourself with 11 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original study questions; these do not predict an actual exam.'
    )
  },
  studySupport: complementaryStudy,
  guidedTools: complementaryClinic,
  questions: [
    {
      title: text('Karakteristik denklemin türetilmesi', 'Deriving the characteristic equation'),
      tag: '4.2',
      text: text(
        'Sabit katsayılı φ(D)y=0 denkleminde y=e^{λx} denemesi neden φ(λ)=0 cebirsel denklemini verir?',
        'In a constant-coefficient equation φ(D)y=0, why does the trial y=e^{λx} yield the algebraic equation φ(λ)=0?'
      ),
      choices: text(
        [
          'D^k(e^{λx}) = λ^k e^{λx}  ⇒  φ(D)e^{λx} = φ(λ)e^{λx} = 0  (e^{λx} ≠ 0)',
          'e^{λx} = 0  ⇒  D^k y = 0',
          'a_k(x)D^k y = a_k(x)λ^k'
        ],
        [
          'Because D^k(e^{λx}) = λ^k e^{λx}, we have φ(D)e^{λx} = φ(λ)e^{λx} = 0  (e^{λx} ≠ 0)',
          'Because e^{λx} = 0  ⇒  D^k y = 0',
          'Because a_k(x)D^k y = a_k(x)λ^k'
        ]
      ),
      answer: 0,
      feedback: text(
        'Üstel fonksiyonun her türevi λ çarpanı getirir: D^k(e^{λx}) = λ^k e^{λx}. Sabit katsayılı polinomda φ(D)e^{λx} = φ(λ)e^{λx} = 0 olur; e^{λx} hiçbir x için sıfır olmadığından φ(λ) = 0 kalır.',
        'Each derivative of the exponential brings a factor of λ: D^k(e^{λx}) = λ^k e^{λx}. For constant coefficients, φ(D)e^{λx} = φ(λ)e^{λx} = 0; since e^{λx} is never zero, φ(λ) = 0 follows.'
      ),
      hints: text(
        ['D^k(e^{λx}) türevini hesapla.', 'e^{λx} çarpanı gerçek veya karmaşık x için sıfır olabilir mi?'],
        ['Compute the derivative D^k(e^{λx}).', 'Can the factor e^{λx} ever be zero?']
      )
    },
    {
      title: text('Hiperbolik fonksiyonlar ve özdeşlikler', 'Hyperbolic functions and identities'),
      tag: 'KAVRAM / CONCEPT',
      text: text(
        'cosh x ve sinh x fonksiyonları için aşağıdaki temel özdeşlik ve türev çiftlerinden hangisi doğrudur?',
        'Which fundamental identity and derivative pair holds for cosh x and sinh x?'
      ),
      choices: text(
        [
          'cosh²x − sinh²x = 1,   (sinh x)′ = cosh x,   (cosh x)′ = sinh x',
          'cosh²x + sinh²x = 1,   (sinh x)′ = cosh x,   (cosh x)′ = −sinh x',
          'sinh²x − cosh²x = 1,   (sinh x)′ = −cosh x,  (cosh x)′ = sinh x'
        ],
        [
          'cosh²x − sinh²x = 1,   (sinh x)′ = cosh x,   (cosh x)′ = sinh x',
          'cosh²x + sinh²x = 1,   (sinh x)′ = cosh x,   (cosh x)′ = −sinh x',
          'sinh²x − cosh²x = 1,   (sinh x)′ = −cosh x,  (cosh x)′ = sinh x'
        ]
      ),
      answer: 0,
      feedback: text(
        'cosh x = (eˣ + e⁻ˣ)/2 ve sinh x = (eˣ − e⁻ˣ)/2 tanımlarından cosh²x − sinh²x = 1 ve her iki türevde de işaretin pozitif kaldığı doğrudan doğrulanır.',
        'From cosh x = (eˣ + e⁻ˣ)/2 and sinh x = (eˣ − e⁻ˣ)/2, one verifies directly that cosh²x − sinh²x = 1 and that neither derivative introduces a minus sign.'
      ),
      hints: text(
        ['Trigonometrik cos²x + sin²x = 1 ile hiperbolik cosh²x − sinh²x = 1 farkına dikkat et.', '(eˣ + e⁻ˣ)/2 ifadesinin türevini al.'],
        ['Compare trigonometric cos²x + sin²x = 1 with hyperbolic cosh²x − sinh²x = 1.', 'Differentiate (eˣ + e⁻ˣ)/2.']
      )
    },
    {
      title: text('Örnek 4.2: simetrik gerçek kökler ve hiperbolik biçim', 'Example 4.2: symmetric real roots and hyperbolic form'),
      tag: 'ÖRNEK 4.2 / EXAMPLE 4.2',
      text: text(
        '(D⁴ − 13D² + 36)y = 0 denkleminin karakteristik kökleri ve hiperbolik genel çözümü hangisidir?',
        'What are the characteristic roots and hyperbolic general solution of (D⁴ − 13D² + 36)y = 0?'
      ),
      choices: text(
        [
          'λ = ±2, ±3  ⇒  y = A₁ cosh 2x + B₁ sinh 2x + A₂ cosh 3x + B₂ sinh 3x',
          'λ = ±2i, ±3i  ⇒  y = A₁ cos 2x + B₁ sin 2x + A₂ cos 3x + B₂ sin 3x',
          'λ = 4, 9  ⇒  y = C₁ e⁴ˣ + C₂ e⁹ˣ'
        ],
        [
          'λ = ±2, ±3  ⇒  y = A₁ cosh 2x + B₁ sinh 2x + A₂ cosh 3x + B₂ sinh 3x',
          'λ = ±2i, ±3i  ⇒  y = A₁ cos 2x + B₁ sin 2x + A₂ cos 3x + B₂ sin 3x',
          'λ = 4, 9  ⇒  y = C₁ e⁴ˣ + C₂ e⁹ˣ'
        ]
      ),
      answer: 0,
      feedback: text(
        'λ⁴ − 13λ² + 36 = (λ² − 4)(λ² − 9) = 0 çarpanlarına ayrılır; kökler λ = ±2 ve λ = ±3’tür. Her simetrik gerçek ±β çifti A cosh βx + B sinh βx (veya C₁ e^{βx} + C₂ e^{-βx}) olarak yazılır.',
        'λ⁴ − 13λ² + 36 = (λ² − 4)(λ² − 9) = 0 gives λ = ±2 and λ = ±3. Each symmetric real pair ±β can be written as A cosh βx + B sinh βx (or C₁ e^{βx} + C₂ e^{-βx}).'
      ),
      hints: text(
        ['λ² = u diyerek u² − 13u + 36 = (u − 4)(u − 9) = 0 denklemini çöz.', 'Gerçek ±β kökleri hiperbolik, sanal ±iβ kökleri trigonometrik fonksiyon verir.'],
        ['Set λ² = u and solve u² − 13u + 36 = (u − 4)(u − 9) = 0.', 'Real ±β roots give hyperbolic functions; imaginary ±iβ roots give trigonometric functions.']
      )
    },
    {
      title: text('Örnek 4.3: üçüncü derece karakteristik polinom', 'Example 4.3: cubic characteristic polynomial'),
      tag: 'ÖRNEK 4.3 / EXAMPLE 4.3',
      text: text(
        '(D³ + 4D² + D − 6)y = 0 denkleminin genel çözümü hangisidir?',
        'What is the general solution of (D³ + 4D² + D − 6)y = 0?'
      ),
      choices: text(
        [
          'y = C₁ eˣ + C₂ e⁻²ˣ + C₃ e⁻³ˣ',
          'y = C₁ e⁻ˣ + C₂ e²ˣ + C₃ e³ˣ',
          'y = C₁ eˣ + e⁻²ˣ(A cos 3x + B sin 3x)'
        ],
        [
          'y = C₁ eˣ + C₂ e⁻²ˣ + C₃ e⁻³ˣ',
          'y = C₁ e⁻ˣ + C₂ e²ˣ + C₃ e³ˣ',
          'y = C₁ eˣ + e⁻²ˣ(A cos 3x + B sin 3x)'
        ]
      ),
      answer: 0,
      feedback: text(
        'λ = 1 kökü 1 + 4 + 1 − 6 = 0 eşitliğini sağlar. Polinom bölmesiyle (λ − 1)(λ² + 5λ + 6) = (λ − 1)(λ + 2)(λ + 3) = 0 bulunur; kökler λ = 1, −2, −3’tür.',
        'Testing λ = 1 gives 1 + 4 + 1 − 6 = 0. Polynomial division yields (λ − 1)(λ² + 5λ + 6) = (λ − 1)(λ + 2)(λ + 3) = 0, with roots λ = 1, −2, −3.'
      ),
      hints: text(
        ['Sabit terim −6’nın bölenlerinden λ = 1 değerini dene.', 'Kalan λ² + 5λ + 6 ikinci derece çarpanını ayır.'],
        ['Test λ = 1 among the divisors of −6.', 'Factor the remaining quadratic λ² + 5λ + 6.']
      )
    },
    {
      title: text('Örnek 4.4: karmaşık eşlenik kökler ve Euler formülü', 'Example 4.4: complex conjugate roots and Euler’s formula'),
      tag: 'ÖRNEK 4.4 / EXAMPLE 4.4',
      text: text(
        '(D² + 2D + 3)y = 0 denkleminin genel çözümü nedir?',
        'What is the general solution of (D² + 2D + 3)y = 0?'
      ),
      choices: text(
        [
          'y = e⁻ˣ(A cos √2 x + B sin √2 x)',
          'y = e^(−√2 x)(A cos x + B sin x)',
          'y = e⁻ˣ(A cosh √2 x + B sinh √2 x)'
        ],
        [
          'y = e⁻ˣ(A cos √2 x + B sin √2 x)',
          'y = e^(−√2 x)(A cos x + B sin x)',
          'y = e⁻ˣ(A cosh √2 x + B sinh √2 x)'
        ]
      ),
      answer: 0,
      feedback: text(
        'λ² + 2λ + 3 = (λ + 1)² + 2 = 0 denkleminden λ = −1 ± i√2 çıkar. Gerçek kısım α = −1 üstel çarpan e⁻ˣ verir; sanal kısım β = √2 ise cos(√2 x) ve sin(√2 x) argümanını belirler.',
        'From λ² + 2λ + 3 = (λ + 1)² + 2 = 0 we get λ = −1 ± i√2. The real part α = −1 gives the exponential factor e⁻ˣ, and the imaginary part β = √2 sets the argument of cos(√2 x) and sin(√2 x).'
      ),
      hints: text(
        ['λ² + 2λ + 3 = 0 denklemini tam kareye tamamla.', 'λ = α ± iβ için e^{αx}(A cos βx + B sin βx) şablonunu uygula.'],
        ['Complete the square in λ² + 2λ + 3 = 0.', 'Apply the template e^{αx}(A cos βx + B sin βx) for λ = α ± iβ.']
      )
    },
    {
      title: text('Örnek 4.5: gerçek ve saf sanal köklerin birleşimi', 'Example 4.5: combining real and purely imaginary roots'),
      tag: 'ÖRNEK 4.5 / EXAMPLE 4.5',
      text: text(
        '(D³ + 2D² + 9D + 18)y = 0 denkleminin genel çözümü hangisidir?',
        'What is the general solution of (D³ + 2D² + 9D + 18)y = 0?'
      ),
      choices: text(
        [
          'y = C₁ e⁻²ˣ + A cos 3x + B sin 3x',
          'y = e⁻²ˣ(A cos 3x + B sin 3x)',
          'y = C₁ e⁻²ˣ + A cosh 3x + B sinh 3x'
        ],
        [
          'y = C₁ e⁻²ˣ + A cos 3x + B sin 3x',
          'y = e⁻²ˣ(A cos 3x + B sin 3x)',
          'y = C₁ e⁻²ˣ + A cosh 3x + B sinh 3x'
        ]
      ),
      answer: 0,
      feedback: text(
        'Gruplandırmayla (λ + 2)(λ² + 9) = 0 elde edilir; kökler λ₁ = −2 ve λ₂,₃ = 0 ± 3i’dir. Gerçek kök C₁ e⁻²ˣ verirken, α = 0 olan ±3i çifti sönümsüz A cos 3x + B sin 3x verir.',
        'Factoring by grouping gives (λ + 2)(λ² + 9) = 0, with roots λ₁ = −2 and λ₂,₃ = 0 ± 3i. The real root contributes C₁ e⁻²ˣ, while ±3i (with α = 0) gives A cos 3x + B sin 3x.'
      ),
      hints: text(
        ['λ²(λ + 2) + 9(λ + 2) = 0 olarak gruplandır.', 'λ = ±3i köklerinin gerçek kısmı α = 0’dır; e⁻²ˣ yalnız λ = −2 köküne aittir.'],
        ['Group as λ²(λ + 2) + 9(λ + 2) = 0.', 'The roots λ = ±3i have real part α = 0; e⁻²ˣ belongs only to λ = −2.']
      )
    },
    {
      title: text('Örnek 4.6: kutupsal biçimde dördüncü kökler', 'Example 4.6: fourth roots in polar form'),
      tag: 'ÖRNEK 4.6 / EXAMPLE 4.6',
      text: text(
        '(D⁴ + 16)y = 0 denkleminde λ⁴ = −16 = 16e^{i(π + 2kπ)} eşitliğinden çıkan dört karakteristik kök nedir?',
        'In (D⁴ + 16)y = 0, what are the four characteristic roots obtained from λ⁴ = −16 = 16e^{i(π + 2kπ)}?'
      ),
      choices: text(
        [
          'λ = ±√2 ± i√2   (yani 2e^{iπ/4}, 2e^{i3π/4}, 2e^{i5π/4}, 2e^{i7π/4})',
          'λ = ±2, ±2i',
          'λ = ±4i'
        ],
        [
          'λ = ±√2 ± i√2   (i.e. 2e^{iπ/4}, 2e^{i3π/4}, 2e^{i5π/4}, 2e^{i7π/4})',
          'λ = ±2, ±2i',
          'λ = ±4i'
        ]
      ),
      answer: 0,
      feedback: text(
        '16^{1/4}=2 ve açılar (π+2kπ)/4 = π/4, 3π/4, 5π/4, 7π/4 olur. cos(π/4)=sin(π/4)=√2/2 olduğundan λ=2(±√2/2 ± i√2/2)=±√2±i√2 bulunur.',
        'Since 16^{1/4}=2 and the angles are (π+2kπ)/4 = π/4, 3π/4, 5π/4, 7π/4, using cos(π/4)=sin(π/4)=√2/2 gives λ=±√2±i√2.'
      ),
      hints: text(
        ['−16 sayısını r=16 ve θ=π ile kutupsal biçimde yaz.', 'k=0,1,2,3 için 2(cos((π+2kπ)/4) + i sin((π+2kπ)/4)) değerlerini hesapla.'],
        ['Write −16 in polar form with r=16 and θ=π.', 'Evaluate 2(cos((π+2kπ)/4) + i sin((π+2kπ)/4)) for k=0,1,2,3.']
      )
    },
    ...extraQuestions
  ]
};
