import {extraQuestions} from './questions.js';
import {summaryStudy, summaryClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const summaryLesson = {
  id: 'xie-2010:2.7',
  section: '2.7',
  chapterNumber: '02',
  chapterTitle: text('Birinci mertebe ve basit yüksek mertebe denklemler', 'First-order and simple higher-order equations'),
  title: text('Özet: yöntem seçme sanatı', 'Summary: art of choosing methods'),
  englishTitle: 'Summary: Art of Choosing Methods',
  subtitle: text(
    'Bütün Chapter 2 yöntemlerini tek bir karar zincirinde birleştir: mertebe, doğrusallık, özel yapılar ve eksik değişkenler. Sınavda 60 saniyede en kısa indirgemeyi seç.',
    'Synthesize all Chapter 2 methods into a single decision chain: order, linearity, special structures, and missing variables. Select the shortest reduction in 60 seconds on exams.'
  ),
  pages: '74–86',
  pdfPages: '92–96',
  lessonPath: text('lessons/xie-2010/2-7/lesson.md', 'lessons/xie-2010/2-7/lesson-en.md'),
  mathPath: 'lessons/xie-2010/2-7/math.json',
  inlinePath: 'lessons/xie-2010/2-7/inline.json',
  labFamily: 'summary',
  downloadName: text('2-7-ozet-yontem-secme-sanati.md', '2-7-summary-art-of-choosing-methods.md'),
  highlights: text(
    [
      'Tüm Chapter 2 yöntemlerinin karşılaştırmalı karar matrisi',
      'Dört soruluk hızlı tarama algoritması (60 saniye kuralı)',
      'İndirgeme zinciri: homojen, Bernoulli, tamlık ve mertebe düşürme',
      'On kritik teşhis meydan okuması',
      'Bölüm sonu vize/final kliniği: dört usta soru'
    ],
    [
      'Comparative decision matrix across all Chapter 2 methods',
      'Four-question rapid triage algorithm (60-second rule)',
      'Reduction chain: homogeneous, Bernoulli, exactness, order reduction',
      'Ten critical diagnostic challenges',
      'Capstone midterm/final clinic: four master problems'
    ]
  ),
  notesPlaceholder: text(
    'Yeni bir denklem gördüğümde ilk 30 saniyede hangi üç soruyu sorup yönteme karar vermeliyim?',
    'When facing a new equation, which three questions must I ask in the first 30 seconds to fix the method?'
  ),
  sourceSummary: text(
    '§2.7, s.74–86 (PDF s.92–96) temelinde özgün sentez uyarlaması. Bölüm 2’nin tüm analitik tekniklerini karar ağacı ve teşhis atölyesiyle pekiştirir.',
    'Original capstone synthesis based on §2.7, pp. 74–86 (PDF pp. 92–96). Reinforces all Chapter 2 analytical techniques via an interactive decision tree and diagnostic workbench.'
  ),
  modelLimits: text(
    'On teşhis denklemi Chapter 2’nin on temel yöntemini temsil eder. Teşhis simülatörü kullanıcının ilk hamlesini, indirgenmiş biçimini ve dikkat edilmesi gereken tuzakları doğrudan denetler; karar matrisi yöntemler arası geçiş yollarını gösterir.',
    'Ten diagnostic ODEs represent the ten foundational methods of Chapter 2. The diagnostic simulator evaluates the user’s first move, canonical reduced form, and critical traps; the decision matrix charts inter-method reduction paths.'
  ),
  presentation: {
    clinicEyebrow: text('§2.7 · VİZE/FİNAL BÖLÜM KAPANIŞI · USTA KLİNİK', '§2.7 · MIDTERM/FINAL CAPSTONE · MASTER CLINIC'),
    lab: text('Yöntem seçme ve teşhis simülatörü', 'Method selection and diagnostic simulator'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('Doğru yöntemi 60 saniyede seç ve en kısa yoldan çöz', 'Pick the right method in 60 seconds and solve via the shortest path'),
    practiceIntro: text(
      '20 dakika · 20 puan. Dört kapsamlı sınav sorusu üzerinde yöntem tarama ve tuzak yakalama becerini geliştir; ardından 11 sentez sorusuyla ustalığını kanıtla.',
      '20 minutes · 20 points. Refine method triage and trap detection across four comprehensive exam problems, then verify your mastery with 11 synthesis questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: summaryStudy,
  guidedTools: summaryClinic,
  questions: [
    {
      title: text('Dört soruluk tarama', 'Four-question triage'),
      tag: '2.7',
      text: text(
        'Bir diferansiyel denklemle karşılaşıldığında ilk sorulması gereken temel soru hangisidir?',
        'When encountering a differential equation, what is the first foundational question to ask?'
      ),
      choices: [
        'Denklemin mertebesi kaçtır ve doğrusal mıdır?',
        'Hangi integral çarpanı denklemi tam yapar?',
        'p = y′ için denklem çözülebilir mi?'
      ],
      answer: 0,
      feedback: text(
        'Her tarama önce mertebe (en yüksek türev) ve doğrusallık kontrolüyle başlar. Bu iki soru olası yöntem havuzunu hemen daraltır.',
        'Every triage begins by checking order (highest derivative) and linearity. These two questions immediately narrow down the candidate methods.'
      ),
      hints: text(
        ['Denklemin temel sınıfını belirleyen ilk özellik nedir?', 'Birinci mertebe ile yüksek mertebe aynı yöntemlerle mi çözülür?'],
        ['What fundamental property defines the broad class of the ODE?', 'Are first-order and higher-order ODEs solved with the same methods?']
      )
    },
    {
      title: text('İndirgeme ilkesi', 'Principle of reduction'),
      tag: 'KAVRAM / CONCEPT',
      text: text(
        'Chapter 2’deki dönüşümlerin (v=y/x, u=y^{1−n}, u=y′, y″=u du/dy) ortak amacı nedir?',
        'What is the common objective of all Chapter 2 substitutions (v=y/x, u=y^{1−n}, u=y′, y″=u du/dy)?'
      ),
      choices: [
        'Çözülemeyen veya zor denklemi, çözümü bilinen daha basit bir biçime (ayrılabilir, doğrusal, tam) indirgemek',
        'Her denklemi tek bir kapalı cebirsel formüle çevirmek',
        'Türev mertebesini her zaman sıfıra indirmek'
      ],
      answer: 0,
      feedback: text(
        'Bütün dönüşümler indirgeme zincirine hizmet eder: homojen ayrılabilire, Bernoulli doğrusala, tam olmayan tama, eksik değişkenli yüksek mertebe birinci mertebeye iner.',
        'All substitutions serve the reduction chain: homogeneous reduces to separable, Bernoulli to linear, non-exact to exact, and higher-order with missing variables to first order.'
      ),
      hints: text(
        ['Her yöntemin çıktısı olan yeni denklem hangi türdendir?', 'Tüm yöntemlerin okları hangi yöne bakar?'],
        ['What type of equation results from each substitution?', 'In which direction do all reduction arrows point?']
      )
    },
    {
      title: text('Homojen vs İntegral çarpanı', 'Homogeneous vs Integrating factor'),
      tag: 'STRATEJİ / STRATEGY',
      text: text(
        '(x² + y²) dx − 2xy dy = 0 denkleminde neden tek değişkenli çarpan aramak homojen v=y/x dönüşümüne tercih edilir?',
        'Why is seeking a single-variable integrating factor preferred over v=y/x in (x² + y²) dx − 2xy dy = 0?'
      ),
      choices: [
        '(M_y − N_x)/N = −2/x yalnız x’e bağlıdır ve μ=1/x² çarpanı çözümü tek adımda potansiyele indirir',
        'Homojen v=y/x dönüşümü bu denklemde çalışmaz',
        'İntegral çarpanı her zaman tekil çözümleri yok eder'
      ],
      answer: 0,
      feedback: text(
        '(M_y − N_x)/N yalnız x’e bağlı olduğunda μ(x) hemen bulunur ve denklem tam olur. Bu, v=y/x dönüşümünün getirdiği uzun kesir integrallerinden çok daha hızlıdır.',
        'When (M_y − N_x)/N depends solely on x, μ(x) is found instantly and the ODE becomes exact. This avoids tedious rational integrations from v=y/x.'
      ),
      hints: text(
        ['M_y ve N_x kısmi türevlerini hesapla.', 'Homojen dönüşümün cebir yükü ile tam denklemin doğrudan integrali arasındaki farkı düşün.'],
        ['Compute partial derivatives M_y and N_x.', 'Compare algebraic overhead of homogeneous substitution against direct integration of an exact form.']
      )
    },
    {
      title: text('Gizli doğrusallık', 'Hidden linearity'),
      tag: 'YÖNTEM / METHOD',
      text: text(
        'y dx − (x + y³) dy = 0 denkleminde dy/dx doğrusal değilken nasıl bir hamle yapılmalıdır?',
        'In y dx − (x + y³) dy = 0, where dy/dx is nonlinear, what strategic move should be made?'
      ),
      choices: [
        'dx/dy ters türevi alınarak x bağımlı değişkenine göre doğrusal denklem x′ − (1/y)x = y² kurulmalıdır',
        'y = vx dönüşümü yapılmalıdır',
        'Denklem çözülemez olarak işaretlenmelidir'
      ],
      answer: 0,
      feedback: text(
        'dy/dx paydasında toplama terimleri varken ters türev dx/dy paydada tek terim y bırakır. Denklem x’e göre standart birinci mertebe doğrusal hale gelir.',
        'When the denominator of dy/dx has sum terms, reciprocating to dx/dy leaves a monomial y in the denominator, yielding a linear ODE for x.'
      ),
      hints: text(
        ['Bağımlı değişken ile bağımsız değişkenin rolleri değişebilir mi?', 'x terimi denklemde kaçıncı dereceden yer alıyor?'],
        ['Can the roles of dependent and independent variables be swapped?', 'To what power does x appear in the equation?']
      )
    },
    {
      title: text('Bernoulli sıfır kökü', 'Bernoulli zero root'),
      tag: 'TUZAK / TRAP',
      text: text(
        'y′ + P(x)y = Q(x)yⁿ (n > 1) denkleminde yⁿ ile bölme yaparken hangi kritik nokta kaçırılmamalıdır?',
        'When dividing by yⁿ in y′ + P(x)y = Q(x)yⁿ (n > 1), what critical point must not be missed?'
      ),
      choices: [
        'y = 0 aşikar çözümü sıfıra bölme nedeniyle kaybolabilir; ayrıca kaydedilmelidir',
        'n kesirli olamaz',
        'İntegral çarpanı daima negatif olur'
      ],
      answer: 0,
      feedback: text(
        'n > 1 için y = 0 denklemin açık bir çözümüdür. yⁿ ile bölündüğünde bu dal kaybolur ve genel çözümden hiçbir C ile elde edilemeyebilir.',
        'For n > 1, y = 0 is a genuine solution. Dividing by yⁿ eliminates this branch, which might not be recovered from the general family for any C.'
      ),
      hints: text(
        ['Bir denklemi bilinmeyenli bir ifadeye bölerken hangi tehlike doğar?', 'y(x) = 0 fonksiyonu asıl denklemi sağlar mı?'],
        ['What danger arises when dividing an equation by an unknown variable?', 'Does y(x) = 0 satisfy the original ODE?']
      )
    },
    {
      title: text('Clairaut tanıma', 'Clairaut recognition'),
      tag: 'CLAIRAUT',
      text: text(
        'Hangisi standart bir Clairaut denklemidir?',
        'Which ODE is in standard Clairaut form?'
      ),
      choices: [
        'y = x y′ + (y′)²',
        'y = (x y′)² + y′',
        'y′ = x y + (y′)³'
      ],
      answer: 0,
      feedback: text(
        'Clairaut denklemi kesin olarak y = x p + f(p) (burada p = y′) yapısındadır. x ile p yalnız birinci dereceden çarpılır.',
        'A Clairaut equation strictly has the form y = x p + f(p) where p = y′. x and p multiply exclusively to first power.'
      ),
      hints: text(
        ['Clairaut formunda x çarpanı hangi türevle çarpılır?', 'y tek başına sol tarafta mıdır?'],
        ['With which derivative is x multiplied in Clairaut form?', 'Is y isolated on the left-hand side?']
      )
    },
    {
      title: text('Yüksek mertebe indirgeme kuralı', 'Higher-order reduction rule'),
      tag: 'YÜKSEK MERTEBE / HIGHER ORDER',
      text: text(
        'İkinci mertebe bir denklemde bağımsız değişken x görünmüyorsa hangi dönüşüm mertebeyi düşürür?',
        'In a second-order ODE where the independent variable x is absent, which substitution reduces the order?'
      ),
      choices: [
        'u = y′ ve y″ = u du/dy',
        'u = y′ ve y″ = du/dx',
        'u = y″ ve y‴ = u du/dx'
      ],
      answer: 0,
      feedback: text(
        'x görünmüyorsa y yeni bağımsız değişken yapılır. Zincir kuralı y″ = (du/dy)(dy/dx) = u du/dy verir ve x denklemden tamamen çıkar.',
        'When x is absent, y becomes the independent variable. The chain rule gives y″ = (du/dy)(dy/dx) = u du/dy, eliminating x completely.'
      ),
      hints: text(
        ['y′ = u tanımını yap.', 'dy/dx terimini zincir kuralında nereye yerleştirirsin?'],
        ['Define y′ = u.', 'Where does dy/dx fit into the chain rule?']
      )
    },
    ...extraQuestions
  ]
};
