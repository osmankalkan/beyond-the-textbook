import {extraQuestions} from './questions.js';
import {reductionStudy, reductionClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const reductionLesson = {
  id: 'xie-2010:2.6',
  section: '2.6',
  chapterNumber: '02',
  chapterTitle: text('Birinci mertebe ve basit yüksek mertebe denklemler', 'First-order and simple higher-order equations'),
  title: text('Basit yüksek mertebe denklemler', 'Simple higher-order equations'),
  englishTitle: 'Simple Higher-Order Equations',
  subtitle: text(
    'Eksik değişkeni tanı: y yoksa u=y^{(k)} seç ve x’i bağımsız tut; x yoksa y’yi bağımsız değişken yapıp y″=u du/dy zincirini kur. Sabit sayısını mertebeye göre denetle.',
    'Identify the missing variable: if y is absent, set u=y^{(k)} and keep x independent; if x is absent, make y independent with y″=u du/dy. Match the number of constants to the order.'
  ),
  pages: '68–73',
  pdfPages: '86–91',
  lessonPath: text('lessons/xie-2010/2-6/lesson.md', 'lessons/xie-2010/2-6/lesson-en.md'),
  mathPath: 'lessons/xie-2010/2-6/math.json',
  inlinePath: 'lessons/xie-2010/2-6/inline.json',
  labFamily: 'reduction',
  downloadName: text('2-6-basit-yuksek-mertebe-denklemler.md', '2-6-simple-higher-order-equations.md'),
  highlights: text(
    [
      'Doğrudan integrallenen y^{(n)}=f(x) denklemleri',
      'Bağımlı değişken yokluğu: u=y^{(k)} ile mertebe indirgeme',
      'Bağımsız değişken yokluğu: y″=u du/dy zinciri',
      'Örnek 2.40–2.45',
      'Vize hazırlığı: dört çözümlü vaka'
    ],
    [
      'Directly integrable y^{(n)}=f(x) equations',
      'Missing dependent variable: order reduction via u=y^{(k)}',
      'Missing independent variable: the y″=u du/dy chain',
      'Examples 2.40–2.45',
      'Midterm preparation: four worked cases'
    ]
  ),
  notesPlaceholder: text(
    'Denklemde hangi değişken eksik: x mi yoksa y mi? Mertebe kaç azaldı ve kaç sabit bekliyorum?',
    'Which variable is missing: x or y? By how much did the order drop, and how many constants do I expect?'
  ),
  sourceSummary: text(
    '§2.6, s.68–73 temelinde özgün uyarlama. Örnek 2.40–2.45 ve vize sınav hazırlık problemleri sunulmaktadır.',
    'Original adaptation of §2.6, pp. 68–73. Examples 2.40–2.45 and midterm exam-prep problems are provided.'
  ),
  modelLimits: text(
    'Üç analitik aile çizilir: y″=6x için doğrudan iki kat integrasyon y=x³+Cx+1; 2y″=(y′)³ sin 2x için y yokluğu ve (−π/2, π/2) aralığında y=ln|sec x+tan x|+C; y″+(y′)²=0 için x yokluğu ve y=ln(Cx+1). C=0 dalı y=0 yatay doğrusunu verir.',
    'Three analytic families are rendered: direct double integration y=x³+Cx+1 for y″=6x; missing y with y=ln|sec x+tan x|+C on (−π/2, π/2) for 2y″=(y′)³ sin 2x; and missing x with y=ln(Cx+1) for y″+(y′)²=0. The C=0 branch gives the line y=0.'
  ),
  presentation: {
    clinicEyebrow: text('§2.6 · VİZE ÇALIŞMASI · ÖZGÜN SORULAR', '§2.6 · MIDTERM STUDY · ORIGINAL PROBLEMS'),
    lab: text('Yüksek mertebe indirgeme atölyesi', 'Higher-order reduction workshop'),
    practice: text('Vize hazırlığı', 'Midterm preparation'),
    practiceTitle: text('Eksik değişkeni yakala: x mi yok, y mi yok?', 'Catch the missing variable: is x absent or y absent?'),
    practiceIntro: text(
      '20 dakika · 20 puan. Dört çözümlü vaka üzerinde eksik değişken analizini çalış; ardından 11 aşamalı soruyla kavrayışını sına.',
      '20 minutes · 20 points. Study missing-variable analysis across four worked cases, then test yourself with 11 scaffolded questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original study questions; these do not predict an actual exam.'
    )
  },
  studySupport: reductionStudy,
  guidedTools: reductionClinic,
  questions: [
    {
      title: text('y^{(n)}=f(x) yapısı', 'y^{(n)}=f(x) structure'),
      tag: '2.6',
      text: text(
        'y^{(n)} = f(x) denklemini çözmek için en doğrudan yöntem hangisidir?',
        'What is the most direct method to solve y^{(n)} = f(x)?'
      ),
      choices: [
        'Doğrudan n kez ardışık integral almak',
        'u = y^{(n-1)} seçip Bernoulli denklemine geçmek',
        'y’yi bağımsız değişken yapmak'
      ],
      answer: 0,
      feedback: text(
        'En yüksek türev yalnız x’e bağlı olduğundan doğrudan n kez integrallenir; her integral bir bağımsız sabit ekler.',
        'Because the highest derivative depends solely on x, integrating directly n times yields the solution with n arbitrary constants.'
      ),
      hints: text(
        ['Türevi tersine çeviren temel işlem nedir?', 'Sağ taraf y’ye bağlı mı?'],
        ['What is the fundamental operation reversing differentiation?', 'Does the right side depend on y?']
      )
    },
    {
      title: text('Bağımlı değişkenin yokluğu', 'Absence of dependent variable'),
      tag: 'YÖNTEM / METHOD',
      text: text(
        'f(x; y^{(k)}, y^{(k+1)}, ..., y^{(n)}) = 0 denkleminde hangi dönüşüm mertebeyi n−k’ye düşürür?',
        'In f(x; y^{(k)}, y^{(k+1)}, ..., y^{(n)}) = 0, which substitution reduces the order to n−k?'
      ),
      choices: [
        'u = y^{(k)}',
        'u = y′',
        'y = u du/dx'
      ],
      answer: 0,
      feedback: text(
        'Denklemde görünen en düşük türev y^{(k)} olduğundan u = y^{(k)} dönüşümü yapılır; türevler u′, u″, ..., u^{(n-k)} olur.',
        'Since the lowest appearing derivative is y^{(k)}, setting u = y^{(k)} transforms derivatives into u′, u″, ..., u^{(n-k)}.'
      ),
      hints: text(
        ['Denklemdeki en düşük türev hangisidir?', 'Tüm türevlerin mertebesi kaç azalır?'],
        ['What is the lowest derivative present in the equation?', 'By how much does every derivative order decrease?']
      )
    },
    {
      title: text('Bağımsız değişkenin yokluğu', 'Absence of independent variable'),
      tag: 'YÖNTEM / METHOD',
      text: text(
        'f(y, y′, y″) = 0 denkleminde x açıkça yoksa y″ türevi nasıl yazılır?',
        'In f(y, y′, y″) = 0 with x absent, how is y″ rewritten?'
      ),
      choices: [
        'y″ = u du/dy (burada u = y′)',
        'y″ = du/dx',
        'y″ = u²'
      ],
      answer: 0,
      feedback: text(
        'Zincir kuralı: y″ = d(y′)/dx = (du/dy)(dy/dx) = u du/dy. y yeni bağımsız değişken olur ve mertebe bir azalır.',
        'By the chain rule: y″ = d(y′)/dx = (du/dy)(dy/dx) = u du/dy. y becomes the independent variable, reducing order by 1.'
      ),
      hints: text(
        ['y′ = u tanımını hatırlayın.', 'x denklemden nasıl elenir?'],
        ['Recall the definition y′ = u.', 'How can x be completely eliminated?']
      )
    },
    {
      title: text('Örnek 2.42: dal seçimi', 'Example 2.42: branch selection'),
      tag: 'ÖRNEK 2.42 / EXAMPLE 2.42',
      text: text(
        '2y″ = (y′)³ sin 2x, y(0)=1, y′(0)=1 denkleminde u² = sec²x sonucunda neden u = sec x seçilir?',
        'In 2y″ = (y′)³ sin 2x, y(0)=1, y′(0)=1, why is u = sec x chosen from u² = sec²x?'
      ),
      choices: [
        'u(0) = y′(0) = 1 > 0 başlangıç koşulu pozitif dalı zorunlu kılar',
        'Karekök daima pozitif olmak zorundadır',
        'Negatif dal trigonometrik olarak tanımsızdır'
      ],
      answer: 0,
      feedback: text(
        'u(0)=1 pozitif bir değerdir. x=0 civarında süreklilik nedeniyle pozitif dal u = sec x seçilir; negatif dal başlangıç koşulunu sağlamaz.',
        'u(0)=1 is positive. By continuity near x=0, the positive branch u = sec x must be chosen to satisfy initial data.'
      ),
      hints: text(
        ['x=0 noktasında y′(0) değeri kaçtır?', 'u = −sec x koyarsak u(0) ne olurdu?'],
        ['What is the value of y′(0) at x=0?', 'What would u(0) evaluate to if u = −sec x were chosen?']
      )
    },
    {
      title: text('Örnek 2.42: tanım aralığı', 'Example 2.42: interval of validity'),
      tag: 'ÖRNEK 2.42 / EXAMPLE 2.42',
      text: text(
        'y = ln|sec x + tan x| + 1 çözümünün x=0’ı içeren maximal tanım aralığı hangisidir?',
        'What is the maximal interval of validity containing x=0 for y = ln|sec x + tan x| + 1?'
      ),
      choices: [
        '(−π/2, π/2)',
        '(0, π)',
        '(−∞, ∞)'
      ],
      answer: 0,
      feedback: text(
        'sec x ve tan x fonksiyonları x = ±π/2 noktalarında düşey asimptotlara sahiptir. x=0’ı içeren en geniş sürekli aralık (−π/2, π/2)’dir.',
        'sec x and tan x have vertical asymptotes at x = ±π/2. The maximal continuous interval containing x=0 is (−π/2, π/2).'
      ),
      hints: text(
        ['cos x hangi noktalarda sıfır olur?', '0 noktası bu köklerin hangilerinin arasındadır?'],
        ['At which points does cos x vanish?', 'Between which of these roots does 0 lie?']
      )
    },
    {
      title: text('Örnek 2.44: u³=1 dalı', 'Example 2.44: u³=1 branch'),
      tag: 'ÖRNEK 2.44 / EXAMPLE 2.44',
      text: text(
        '3yy′y″ − (y′)³ + 1 = 0 denkleminde u³−1=0 dalı hangi çözümü verir?',
        'In 3yy′y″ − (y′)³ + 1 = 0, what solution does the branch u³−1=0 give?'
      ),
      choices: [
        'y = x + C doğru ailesi',
        'y = 0 yatay doğrusu',
        'Tekil bir çember'
      ],
      answer: 0,
      feedback: text(
        'u³=1 reel kökü u=1 verir. u=y′=1 olduğundan dy/dx=1 ve buradan y = x + C doğru ailesi elde edilir.',
        'The real root of u³=1 is u=1. Since u=y′=1, dy/dx=1 yields the line family y = x + C.'
      ),
      hints: text(
        ['u³ = 1 denkleminin gerçel kökü nedir?', 'y′ = 1 integre edildiğinde ne çıkar?'],
        ['What is the real root of u³ = 1?', 'What does integrating y′ = 1 produce?']
      )
    },
    {
      title: text('Mertebe ve sabit sayısı', 'Order and constant count'),
      tag: 'KAVRAM / CONCEPT',
      text: text(
        'n-inci mertebeden bir diferansiyel denklemin genel çözümü kaç bağımsız keyfi sabit içerir?',
        'How many arbitrary independent constants does the general solution of an n-th order ODE contain?'
      ),
      choices: [
        'Tam olarak n bağımsız sabit',
        'En fazla n−1 sabit',
        'Sabit sayısı denklemin doğrusallığına bağlıdır'
      ],
      answer: 0,
      feedback: text(
        'Temel teorem gereği n-inci mertebeden bir denklemin genel çözümü tam n bağımsız parametre (sabit) taşır.',
        'By the fundamental existence theorem, the general solution of an n-th order ODE contains exactly n independent constants.'
      ),
      hints: text(
        ['Her integral adımı kaç serbest sabit üretir?', 'n kez türev alınmış bir fonksiyonu geri kurmak kaç bilgi gerektirir?'],
        ['How many arbitrary constants does each integration introduce?', 'How many pieces of data are required to reconstruct a function differentiated n times?']
      )
    },
    ...extraQuestions
  ]
};
