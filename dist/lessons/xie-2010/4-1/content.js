import {extraQuestions} from './questions.js';
import {operatorStudy, operatorClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const generalLinearLesson = {
  id: 'xie-2010:4.1',
  section: '4.1',
  chapterNumber: '04',
  chapterTitle: text('Doğrusal diferansiyel denklemler', 'Linear differential equations'),
  title: text('Genel doğrusal adi diferansiyel denklemler', 'General linear ordinary differential equations'),
  englishTitle: 'General Linear Ordinary Differential Equations',
  subtitle: text(
    'Önce y’ye göre doğrusallığı test et; sonra D operatörüne geç. L[u]=F ve L[v]=0 ise L[u+v]=F olur; genel çözüm y_C+y_P’dir ve n sabit y_C’de yaşar.',
    'Test linearity in y first, then move to the D operator. If L[u]=F and L[v]=0 then L[u+v]=F; the general solution is y_C+y_P, with all n constants in y_C.'
  ),
  pages: '140–142',
  pdfPages: '158–160',
  lessonPath: text('lessons/xie-2010/4-1/lesson.md', 'lessons/xie-2010/4-1/lesson-en.md'),
  mathPath: 'lessons/xie-2010/4-1/math.json',
  inlinePath: 'lessons/xie-2010/4-1/inline.json',
  labFamily: 'operator',
  downloadName: text('4-1-genel-dogrusal-denklemler.md', '4-1-general-linear-equations.md'),
  highlights: text(
    [
      'n. mertebe doğrusal denklem ve standart biçim',
      'Kuvvet, çarpım ve fonksiyon testleriyle doğrusallık',
      'D operatörü, lineerliği ve φ(D) yazımı',
      'Temel teorem: L[u]=F, L[v]=0 ⇒ L[u+v]=F',
      'Genel çözüm y_C+y_P ve başlangıç koşulları'
    ],
    [
      'The n-th order linear equation and standard form',
      'Linearity via power, product and function tests',
      'The D operator, its linearity and the φ(D) notation',
      'Fundamental theorem: L[u]=F, L[v]=0 ⇒ L[u+v]=F',
      'The general solution y_C+y_P and initial conditions'
    ]
  ),
  notesPlaceholder: text(
    'Denklem y’ye göre doğrusal mı? D operatörü hangi değişkene göre türev alıyor ve sabitler nerede yaşıyor?',
    'Is the equation linear in y? With respect to which variable does D differentiate, and where do the constants live?'
  ),
  sourceSummary: text(
    '§4.1, s.140–142 temelinde özgün uyarlama. Örnek 4.1 ve operatör/temel teorem uygulamaları için ek çalışma örnekleri sunulmaktadır.',
    'Original adaptation of §4.1, pp.140–142. Example 4.1 and additional study examples for the operator and fundamental theorem are provided.'
  ),
  modelLimits: text(
    'Atölye üç sabit/genel operatör kullanır: L=D²−3D+2, L=D²+1 ve L=xD²+D−1. Test fonksiyonları e^x, e^{2x}, e^{3x}, sin x, cos x, x², 1 ve ln x ile sınırlıdır; ln x yalnız x>0 için tanımlıdır. Grafik L[αu+βv] ile αL[u]+βL[v] eğrilerini karşılaştırır; doğrusallıkta iki eğri çakışır.',
    'The workshop uses three operators: L=D²−3D+2, L=D²+1 and L=xD²+D−1. Test functions are limited to e^x, e^{2x}, e^{3x}, sin x, cos x, x², 1 and ln x; ln x is defined only for x>0. The plot compares L[αu+βv] with αL[u]+βL[v]; for a linear operator the two curves coincide.'
  ),
  presentation: {
    clinicEyebrow: text('§4.1 · VİZE ÇALIŞMASI · ÖZGÜN SORULAR', '§4.1 · MIDTERM STUDY · ORIGINAL PROBLEMS'),
    lab: text('Operatör ve süperpozisyon atölyesi', 'Operator and superposition workshop'),
    practice: text('Vize hazırlığı', 'Midterm preparation'),
    practiceTitle: text('Önce doğrusallık, sonra operatör, en sonda y_C+y_P', 'Linearity first, then the operator, then y_C+y_P'),
    practiceIntro: text(
      '18 dakika · 22 puan. Dört çözümlü vaka üzerinde doğrusallık, operatör ve genel çözüm becerisini çalış; ardından 12 soruyla kendini sına.',
      '18 minutes · 22 points. Work through four cases on linearity, operators and the general solution, then test yourself with 12 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original study questions; these do not predict an actual exam.'
    )
  },
  studySupport: operatorStudy,
  guidedTools: operatorClinic,
  questions: [
    {
      title: text('Genel doğrusal denklem', 'The general linear equation'),
      tag: '4.1',
      text: text(
        'n. mertebe bir doğrusal adi diferansiyel denklemin genel biçimi hangisidir?',
        'Which is the general form of an n-th order linear ordinary differential equation?'
      ),
      choices: text(
        [
          'a_n(x)y^{(n)} + a_{n-1}(x)y^{(n-1)} + ⋯ + a_0(x)y = F(x)',
          'y^{(n)} + y^2 = F(x)',
          'y^{(n)} = y^2'
        ],
        [
          'a_n(x)y^{(n)} + a_{n-1}(x)y^{(n-1)} + ⋯ + a_0(x)y = F(x)',
          'y^{(n)} + y^2 = F(x)',
          'y^{(n)} = y^2'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğrusal denklemde y ve türevleri birinci kuvvette, katsayılar yalnız x’e bağlıdır. Diğer seçeneklerde y^2 terimi doğrusallığı bozar.',
        'In a linear equation, y and its derivatives appear to the first power and the coefficients depend only on x. The other choices contain y^2, which destroys linearity.'
      ),
      hints: text(
        ['y ve türevleri hangi kuvvette görünmeli?', 'Katsayılar hangi değişkene bağlı olabilir?'],
        ['To what power may y and its derivatives appear?', 'On which variable may the coefficients depend?']
      )
    },
    {
      title: text('Doğrusallık testi', 'Linearity test'),
      tag: 'KAVRAM / CONCEPT',
      text: text(
        'Aşağıdaki denklemlerden hangisi doğrusal değildir?',
        'Which of the following equations is nonlinear?'
      ),
      choices: text(
        [
          'y″ + y² = 0',
          'y″ + xy′ + y = 0',
          'x² y″ + y = cos x'
        ],
        [
          'y″ + y² = 0',
          'y″ + xy′ + y = 0',
          'x² y″ + y = cos x'
        ]
      ),
      answer: 0,
      feedback: text(
        'y^2 terimi bilinmeyenin kendisiyle çarpımıdır; doğrusallığı bozar. Diğer iki denklemde y ve türevleri birinci kuvvette, katsayılar yalnız x’e bağlıdır.',
        'The y^2 term multiplies the unknown by itself and destroys linearity. In the other two equations, y and its derivatives are first power and the coefficients depend only on x.'
      ),
      hints: text(
        ['Hangi terim y’nin kendisiyle çarpımıdır?', 'Katsayıların x’e bağlı olması doğrusallığı bozar mı?'],
        ['Which term multiplies y by itself?', 'Do coefficients depending on x destroy linearity?']
      )
    },
    {
      title: text('D operatörü', 'The D operator'),
      tag: 'TANIM / DEFINITION',
      text: text(
        'D = d/dx olduğuna göre D²y neyi ifade eder?',
        'If D = d/dx, what does D²y represent?'
      ),
      choices: text(
        [
          'y’nin x’e göre ikinci türevi, y″',
          'y′ ifadesinin karesi, (y′)²',
          'y ile y′ çarpımı'
        ],
        [
          'The second derivative of y with respect to x, y″',
          'The square of the first derivative, (y′)²',
          'The product of y and y′'
        ]
      ),
      answer: 0,
      feedback: text(
        'D²y = D(Dy) = d/dx(dy/dx) = d²y/dx² = y″. D operatörü türev alma işlemidir; karesi türevin karesi değil, ikinci türevdir.',
        'D²y = D(Dy) = d/dx(dy/dx) = d²y/dx² = y″. The D operator differentiates; its square means the second derivative, not the square of the first derivative.'
      ),
      hints: text(
        ['D², D’nin iki kez uygulanmasıdır.', 'D(Dy) ifadesini aç.'],
        ['D² means applying D twice.', 'Expand D(Dy).']
      )
    },
    {
      title: text('Örnek 4.1: operatör biçimi', 'Example 4.1: operator form'),
      tag: 'ÖRNEK 4.1 / EXAMPLE 4.1',
      text: text(
        '6x²y″ + 2xy′ − 3y = x³ e²ˣ denkleminin D operatörüyle yazımı hangisidir?',
        'Which is the D-operator form of 6x²y″ + 2xy′ − 3y = x³ e²ˣ?'
      ),
      choices: text(
        [
          '(6x²D² + 2xD − 3)y = x³ e²ˣ',
          '(6x²D + 2x − 3)y = x³ e²ˣ',
          '(6D² + 2D − 3)y = x³ e²ˣ'
        ],
        [
          '(6x²D² + 2xD − 3)y = x³ e²ˣ',
          '(6x²D + 2x − 3)y = x³ e²ˣ',
          '(6D² + 2D − 3)y = x³ e²ˣ'
        ]
      ),
      answer: 0,
      feedback: text(
        'y″ yerine D², y′ yerine D yazılır; katsayılar x’e bağlı olduğu için D’nin solunda kalır. Bu, değişken katsayılı doğru operatör yazımıdır.',
        'Replace y″ by D² and y′ by D; because the coefficients depend on x, they stay to the left of D. This is the correct variable-coefficient operator.'
      ),
      hints: text(
        ['y″ ve y′ sırasıyla hangi D kuvvetlerine karşılık gelir?', 'Katsayılar D’nin sağına mı soluna mı yazılır?'],
        ['Which powers of D correspond to y″ and y′?', 'Do the coefficients go to the left or the right of D?']
      )
    },
    {
      title: text('Örnek 4.1: bağımsız değişken', 'Example 4.1: the independent variable'),
      tag: 'ÖRNEK 4.1 / EXAMPLE 4.1',
      text: text(
        '5·d³x/dt³ + 2·d²x/dt² − 7·dx/dt + 3x = sin 8t denkleminde D operatörü hangi değişkene göre tanımlanır?',
        'In 5·d³x/dt³ + 2·d²x/dt² − 7·dx/dt + 3x = sin 8t, with respect to which variable is D defined?'
      ),
      choices: text(
        [
          'D = d/dt, çünkü bağımsız değişken t’dir',
          'D = d/dx, çünkü denklemde x görünüyor',
          'D = d/dy, çünkü sağ taraf sin 8t'
        ],
        [
          'D = d/dt, because the independent variable is t',
          'D = d/dx, because x appears in the equation',
          'D = d/dy, because the right side is sin 8t'
        ]
      ),
      answer: 0,
      feedback: text(
        'Bu denklemde t bağımsız, x bağımlı değişkendir. D her zaman bağımsız değişkene göre türev alır; bu yüzden D=d/dt alınır.',
        'Here t is independent and x is dependent. D always differentiates with respect to the independent variable, so D=d/dt.'
      ),
      hints: text(
        ['Hangi harf türev alıyor, hangisi türevleniyor?', 'Sağ taraftaki sin 8t hangi değişkenin fonksiyonu?'],
        ['Which letter is differentiated and which is the function?', 'Which variable is sin 8t a function of?']
      )
    },
    {
      title: text('Temel teorem', 'Fundamental theorem'),
      tag: 'TEOREM / THEOREM',
      text: text(
        'L[u]=F ve L[v]=0 ise L[u+v] nedir?',
        'If L[u]=F and L[v]=0, what is L[u+v]?'
      ),
      choices: text(
        ['F', '0', '2F'],
        ['F', '0', '2F']
      ),
      answer: 0,
      feedback: text(
        'L doğrusal olduğundan L[u+v]=L[u]+L[v]=F+0=F. Homojen çözüm v, sağ tarafı değiştirmez; yalnız çözüm ailesini zenginleştirir.',
        'Since L is linear, L[u+v]=L[u]+L[v]=F+0=F. The homogeneous solution v does not change the right side; it only enlarges the solution family.'
      ),
      hints: text(
        ['L’nin toplam üzerindeki lineerliğini kullan.', 'L[v]=0 olduğunu yerine koy.'],
        ['Use the linearity of L over sums.', 'Substitute L[v]=0.']
      )
    },
    {
      title: text('Sabitlerin yeri', 'Where the constants live'),
      tag: 'KAVRAM / CONCEPT',
      text: text(
        'n. mertebe bir doğrusal denklemin genel çözümünde n bağımsız sabit nerede bulunur?',
        'In the general solution of an n-th order linear equation, where do the n independent constants live?'
      ),
      choices: text(
        [
          'Tamamlayıcı çözüm y_C içinde',
          'Özel çözüm y_P içinde',
          'y_C ve y_P arasında eşit paylaşılır'
        ],
        [
          'Inside the complementary solution y_C',
          'Inside the particular solution y_P',
          'Shared equally between y_C and y_P'
        ]
      ),
      answer: 0,
      feedback: text(
        'Bütün bağımsız sabitler homojen çözüm y_C’dedir. Özel çözüm y_P sağ tarafı taşır ve keyfi sabit içermez; başlangıç koşulları yalnız y_C’deki sabitleri belirler.',
        'All independent constants are in the homogeneous solution y_C. The particular solution y_P carries the forcing and contains no arbitrary constants; initial conditions determine only the constants in y_C.'
      ),
      hints: text(
        ['Hangi parça homojen denklemi çözer?', 'Özel çözüm sağ tarafı taşırken keyfi sabit taşır mı?'],
        ['Which part solves the homogeneous equation?', 'Does the particular solution carry arbitrary constants while carrying the forcing?']
      )
    },
    {
      title: text('Standart biçim ve tekil nokta', 'Standard form and singular points'),
      tag: 'TANIM / DEFINITION',
      text: text(
        'aₙ(x) y⁽ⁿ⁾ + ⋯ + a₀(x) y = F(x) denklemini standart biçime getirirken hangi noktalar dışlanır?',
        'When putting aₙ(x) y⁽ⁿ⁾ + ⋯ + a₀(x) y = F(x) into standard form, which points are excluded?'
      ),
      choices: text(
        [
          'aₙ(x) = 0 olan noktalar',
          'F(x) = 0 olan noktalar',
          'Yalnız x = 0 noktası'
        ],
        [
          'Points where aₙ(x) = 0',
          'Points where F(x) = 0',
          'Only the point x = 0'
        ]
      ),
      answer: 0,
      feedback: text(
        'Standart biçim baş katsayıya bölünerek elde edilir; aₙ(x) = 0 olan noktalarda bölme tanımsızdır. Bu noktalar denklemin tekil noktalarıdır ve çözüm aralığı dışında kalır.',
        'Standard form is obtained by dividing by the leading coefficient; division is undefined where aₙ(x) = 0. These are the singular points of the equation and lie outside the solution interval.'
      ),
      hints: text(
        ['Standart biçimde baş katsayı kaç olur?', 'Hangi ifadeye bölmek tanımsız olabilir?'],
        ['What is the leading coefficient in standard form?', 'Division by which expression can be undefined?']
      )
    },
    ...extraQuestions
  ]
};
