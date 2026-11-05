import { diracStudySupport, diracExamClinic } from './study.js';
import { diracExtraQuestions } from './questions.js';

const text = (tr, en) => ({tr, en});

export const diracLesson = {
  id: 'xie-2010:6.3',
  section: '6.3',
  chapterNumber: '06',
  chapterTitle: text('Laplace dönüşümü ve uygulamaları', 'The Laplace Transform and Its Applications'),
  title: text('Dirac delta ve darbe fonksiyonları', 'Impulse functions and the Dirac delta function'),
  englishTitle: 'Impulse Functions and the Dirac Delta Function',
  subtitle: text(
    'Sonlu dikdörtgen darbe limitinden ideal Dirac deltasına, süzme (sifting) özelliğinden kiriş ve titreşim uyarısına tam analitik inceleme.',
    'From finite pulse limits to the ideal Dirac delta, sifting property, beam point loads, and impulse responses.'
  ),
  pages: '254–257',
  pdfPages: '272–275',
  lessonPath: text('lessons/xie-2010/6-3/lesson.md', 'lessons/xie-2010/6-3/lesson-en.md'),
  mathPath: 'lessons/xie-2010/6-3/math.json',
  inlinePath: 'lessons/xie-2010/6-3/inline.json',
  downloadName: text('6-3-dirac-delta.md', '6-3-dirac-delta.md'),
  labFamily: 'dirac',
  highlights: text(
    [
      'Sonlu darbe f_ε(t) ve ε → 0 sınırında Dirac deltası idealizasyonu',
      'Toplam itki I ve birim alan integrali: ∫ δ(t − a) dt = 1',
      'Süzme (sifting / örnekleme) özelliği: ∫ g(t) δ(t − a) dt = g(a)',
      'Laplace dönüşümü: ℒ{δ(t − a)} = e^{-as} ve ℒ{δ(t)} = 1',
      'Modüle darbe kuralı: ℒ{f(t) δ(t − a)} = e^{-as} f(a)',
      'Tek taraflı Laplace tuzağı: t < 0 için ℒ{δ(t − a)} = 0',
      'Heaviside ilişkisi: dH(t − a)/dt = δ(t − a)',
      'Mühendislik uygulamaları: Noktasal kiriş yükleri ve çarpışma itkisi'
    ],
    [
      'Finite pulse f_ε(t) and Dirac delta idealization as ε → 0',
      'Total impulse I and unit area integral: ∫ δ(t − a) dt = 1',
      'Sifting (sampling) property: ∫ g(t) δ(t − a) dt = g(a)',
      'Laplace transform: ℒ{δ(t − a)} = e^{-as} and ℒ{δ(t)} = 1',
      'Modulated impulse rule: ℒ{f(t) δ(t − a)} = e^{-as} f(a)',
      'Unilateral transform trap: ℒ{δ(t − a)} = 0 for t < 0',
      'Heaviside relationship: dH(t − a)/dt = δ(t − a)',
      'Engineering applications: Beam point loads and collision dynamics'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Dirac delta içeren vize sorularında t < 0 terimlerini nasıl ele almalı ve süzme integralini nasıl uygulamalıyım?',
    'E.g., How should I treat t < 0 impulses in exam problems and apply the sifting property rigorously?'
  ),
  presentation: {
    practiceIntro: text(
      'Bu çalışma modülünde Dirac delta fonksiyonunun limit tanımı, süzme (sifting) özelliği, Laplace dönüşümü ve fiziksel modellemeler üzerine 12 soru ve 22 puanlık 4 çözümlü sınav vakası yer almaktadır.',
      'This study module includes 12 practice questions and 4 worked exam cases worth 22 points on Dirac delta limits, sifting, Laplace transforms, and physical modeling.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: diracStudySupport,
  guidedTools: {
    examClinic: diracExamClinic
  },
  questions: [
    {
      title: text('Birim Dirac delta alan integrali', 'Unit Dirac delta area integral'),
      tag: 'TANIM / DEFINITION',
      text: text(
        'Birim Dirac delta fonksiyonunun tüm reel eksendeki integrali ∫_{-∞}^∞ δ(t − a) dt neye eşittir?',
        'What is the total area integral of the unit Dirac delta function ∫_{-∞}^∞ δ(t − a) dt across the real line?'
      ),
      choices: text(
        ['1', '0', 'Sonsuz (∞)'],
        ['1', '0', 'Infinity (∞)']
      ),
      answer: 0,
      feedback: text(
        'Doğru! Dirac delta fonksiyonu t = a noktasında sonsuz tepe değerine sahip olsa da altındaki toplam alan (toplam itki) tam olarak 1\'dir.',
        'Correct! Although the Dirac delta has an infinite spike at t = a, its total enclosed area (impulse) is strictly 1.'
      ),
      hints: text(
        [
          'Genişliği ε ve yüksekliği 1/ε olan sonlu darbenin alan limitini düşününüz.',
          '(1/ε) · ε = 1 alanı limit boyunca korunur.'
        ],
        [
          'Consider the area limit of a rectangular pulse of width ε and height 1/ε.',
          'The area (1/ε) · ε = 1 is preserved across the limit.'
        ]
      )
    },
    {
      title: text('Gecikmeli Dirac deltasının dönüşümü', 'Laplace transform of delayed Dirac delta'),
      tag: 'TEMEL DÖNÜŞÜM / ELEMENTARY TRANSFORM',
      text: text(
        'a ≥ 0 gecikmeli birim Dirac deltasının Laplace dönüşümü ℒ{δ(t − a)} nedir?',
        'What is the Laplace transform ℒ{δ(t − a)} of a delayed unit Dirac delta with a ≥ 0?'
      ),
      choices: text(
        ['e⁻ᵃˢ', 'e⁻ᵃˢ / s', '1 / (s − a)'],
        ['e⁻ᵃˢ', 'e⁻ᵃˢ / s', '1 / (s − a)']
      ),
      answer: 0,
      feedback: text(
        'Harika! Süzme özelliği ∫ e^{-st} δ(t − a) dt = e^{-as} sonucunu verir. Paydada s olan ifade basamak fonksiyonuna aittir.',
        'Spot on! Sifting evaluates ∫ e^{-st} δ(t − a) dt = e^{-as}. Dividing by s corresponds to the Heaviside step.'
      ),
      hints: text(
        [
          'Tanım integrali: ∫₀^∞ e^{-st} δ(t − a) dt.',
          't yerine a yerleştirildiğinde üstel çekirdek doğrudan e⁻ᵃˢ olur.'
        ],
        [
          'Definition integral: ∫₀^∞ e^{-st} δ(t − a) dt.',
          'Evaluating at t = a directly yields e⁻ᵃˢ.'
        ]
      )
    },
    {
      title: text('Başlangıç anı birim darbesi', 'Unit impulse at origin'),
      tag: 'ÖZEL DURUM / SPECIAL CASE',
      text: text(
        'Başlangıç anında etkiyen birim Dirac deltasının Laplace dönüşümü ℒ{δ(t)} nedir?',
        'What is the Laplace transform ℒ{δ(t)} of the unit Dirac delta acting at the origin t = 0?'
      ),
      choices: text(
        ['1', '1 / s', '0'],
        ['1', '1 / s', '0']
      ),
      answer: 0,
      feedback: text(
        'Doğru! e^{-as} genel formülünde a = 0 konulduğunda e^0 = 1 elde edilir. δ(t) frekans bölgesinde düz birim spektrum üretir.',
        'Correct! Setting a = 0 in e^{-as} gives e^0 = 1, generating a flat unit spectrum across all frequencies.'
      ),
      hints: text(
        [
          'e^{-as} formülünde a = 0 yazınız.',
          'e^0 = 1.'
        ],
        [
          'Substitute a = 0 into e^{-as}.',
          'e^0 = 1.'
        ]
      )
    },
    {
      title: text('Süzme (sifting) integrali hesabı', 'Sifting property evaluation'),
      tag: 'SÜZME / SIFTING',
      text: text(
        '∫₀^∞ g(t) · δ(t − 3) dt süzme integralinin değeri nedir?',
        'What is the value of the sifting integral ∫₀^∞ g(t) · δ(t − 3) dt?'
      ),
      choices: text(
        ['g(3)', 'g(0)', '3 · g(3)'],
        ['g(3)', 'g(0)', '3 · g(3)']
      ),
      answer: 0,
      feedback: text(
        'Kesinlikle doğru! Dirac delta fonksiyonu integral altında test fonksiyonunun t = 3 anındaki değerini süzer ve g(3) verir.',
        'Exactly right! Under integration, the Dirac delta samples strictly the test function at t = 3, yielding g(3).'
      ),
      hints: text(
        [
          'Darbe t = 3 noktasında yer alır ve integrasyon aralığı [0, ∞) içindedir.',
          'Süzme özelliği doğrudan g(a) verir.'
        ],
        [
          'The impulse is at t = 3 within [0, ∞).',
          'The sifting property directly yields g(a).'
        ]
      )
    },
    {
      title: text('Tek taraflı Laplace ve negatif zaman darbesi', 'Unilateral Laplace and negative-time impulse'),
      tag: 'TANIM ARALIĞI / DOMAIN',
      text: text(
        'Tek taraflı Laplace dönüşümünde ℒ{δ(t + 2)} neden sıfıra eşittir?',
        'Why is the unilateral Laplace transform ℒ{δ(t + 2)} identically zero?'
      ),
      choices: text(
        [
          't = −2 darbesi [0, ∞) integrasyon aralığının dışında kaldığı için',
          'Dirac fonksiyonu negatif değerlerde tanımsız olduğu için',
          'e^{2s} sonsuza gittiği için'
        ],
        [
          'Because the impulse at t = −2 lies outside the integration interval [0, ∞)',
          'Because the Dirac delta is undefined for negative arguments',
          'Because e^{2s} diverges to infinity'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Tek taraflı Laplace integrali 0\'dan ∞\'a kadar tanımlıdır. t = −2 anındaki darbe bu aralığın tamamen solundadır ve integrale hiçbir katkı yapamaz.',
        'Correct! The unilateral Laplace transform integrates from 0 to ∞. An impulse at t = −2 lies strictly outside this interval, contributing zero.'
      ),
      hints: text(
        [
          'Laplace integralinin alt sınırını kontrol ediniz (t = 0).',
          'δ(t + 2) darbesinin konumu t = −2\'dir.'
        ],
        [
          'Check the lower integration limit of the Laplace transform (t = 0).',
          'δ(t + 2) represents an impulse located at t = −2.'
        ]
      )
    },
    {
      title: text('Polinom ile modüle darbe hesabı', 'Polynomial-modulated impulse evaluation'),
      tag: 'HESAPLAMA / COMPUTATION',
      text: text(
        'ℒ{t² · δ(t − 2)} ifadesinin Laplace dönüşümü nedir?',
        'What is the Laplace transform of ℒ{t² · δ(t − 2)}?'
      ),
      choices: text(
        ['4 · e⁻²ˢ', '(2 / s³) · e⁻²ˢ', '4 / s³'],
        ['4 · e⁻²ˢ', '(2 / s³) · e⁻²ˢ', '4 / s³']
      ),
      answer: 0,
      feedback: text(
        'Harika! ℒ{f(t) · δ(t − a)} = f(a) · e^{-as} kuralından f(2) = 2² = 4 bulunur; gecikme çarpanı e^{-2s} ile çarpılarak 4 e^{-2s} elde edilir.',
        'Spot on! Using ℒ{f(t) · δ(t − a)} = f(a) · e^{-as}, f(2) = 2² = 4, yielding 4 e^{-2s}.'
      ),
      hints: text(
        [
          'Önce t = 2 noktasında t² fonksiyonunun genliğini hesaplayınız.',
          'Darbe gecikmesi a = 2 olduğundan e⁻²ˢ ile çarpınız.'
        ],
        [
          'First evaluate the amplitude of t² at t = 2.',
          'Multiply by the delay factor e⁻²ˢ since a = 2.'
        ]
      )
    },
    {
      title: text('Örnek 6.10 trigonometrik bileşen', 'Example 6.10 trigonometric component'),
      tag: 'ÖRNEK 6.10 / EXAMPLE 6.10',
      text: text(
        'Kitaptaki Örnek 6.10\'da yer alan 2 cos(πt / 6) · δ(t − 2) teriminin Laplace dönüşümü nedir?',
        'What is the Laplace transform of 2 cos(πt / 6) · δ(t − 2) from textbook Example 6.10?'
      ),
      choices: text(
        ['e⁻²ˢ', '2 · e⁻²ˢ', '√3 · e⁻²ˢ'],
        ['e⁻²ˢ', '2 · e⁻²ˢ', '√3 · e⁻²ˢ']
      ),
      answer: 0,
      feedback: text(
        'Doğru! t = 2 konulduğunda 2 cos(2π / 6) = 2 cos(π / 3) = 2 · (1/2) = 1 olur. Gecikme e^{-2s} ile çarpıldığında sonuç tam olarak e^{-2s} çıkar.',
        'Correct! At t = 2, 2 cos(2π / 6) = 2 cos(π / 3) = 2 · (1/2) = 1. Multiplied by e^{-2s}, the result is e^{-2s}.'
      ),
      hints: text(
        [
          'Açı: 2π / 6 = π / 3.',
          'cos(π / 3) = 1/2.'
        ],
        [
          'Angle: 2π / 6 = π / 3.',
          'cos(π / 3) = 1/2.'
        ]
      )
    },
    {
      title: text('Heaviside basamağının genelleştirilmiş türevi', 'Distributional derivative of Heaviside step'),
      tag: 'DAĞILIM / DISTRIBUTION',
      text: text(
        'Birim basamak fonksiyonunun genelleştirilmiş türevi dH(t − a) / dt neye eşittir?',
        'What is the distributional derivative dH(t − a) / dt of the unit step function?'
      ),
      choices: text(
        ['δ(t − a)', '0', 'H(t − a) / t'],
        ['δ(t − a)', '0', 'H(t − a) / t']
      ),
      answer: 0,
      feedback: text(
        'Kesinlikle doğru! Heaviside basamağının sıçrama yaptığı t = a noktasındaki sonsuz eğim dağılımlar anlamında Dirac delta fonksiyonu δ(t − a) olarak tanımlanır.',
        'Exactly right! The infinite jump slope of the Heaviside step at t = a defines the Dirac delta δ(t − a) in the sense of distributions.'
      ),
      hints: text(
        [
          'İki tarafın Laplace dönüşümünü alınız: ℒ{H\'} = s · (e⁻ᵃˢ / s) = e⁻ᵃˢ.',
          'Bu sonuç doğrudan ℒ{δ(t − a)} dönüşümüne eşittir.'
        ],
        [
          'Take the Laplace transform: ℒ{H\'} = s · (e⁻ᵃˢ / s) = e⁻ᵃˢ.',
          'This matches the transform of ℒ{δ(t − a)} exactly.'
        ]
      )
    },
    ...diracExtraQuestions
  ]
};
