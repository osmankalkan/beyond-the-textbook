import { inverseStudySupport, inverseExamClinic } from './study.js';
import { inverseExtraQuestions } from './questions.js';

const text = (tr, en) => ({tr, en});

export const inverseLaplaceLesson = {
  id: 'xie-2010:6.4',
  section: '6.4',
  chapterNumber: '06',
  chapterTitle: text('Laplace dönüşümü ve uygulamaları', 'The Laplace Transform and Its Applications'),
  title: text('Ters Laplace dönüşümü', 'The inverse Laplace transform'),
  englishTitle: 'The Inverse Laplace Transform',
  subtitle: text(
    'Frekans s-bölgesinden zaman t-bölgesine geri dönüş: basit kesirlere ayırma teknikleri, Heaviside kapatma yöntemi, 1. ve 2. kaydırma teoremleri ve konvolüsyon integrali.',
    'Returning from frequency s-domain to time t-domain: partial fractions, Heaviside cover-up, shifting theorems, and convolution integrals.'
  ),
  pages: '257–263',
  pdfPages: '275–281',
  lessonPath: text('lessons/xie-2010/6-4/lesson.md', 'lessons/xie-2010/6-4/lesson-en.md'),
  mathPath: 'lessons/xie-2010/6-4/math.json',
  inlinePath: 'lessons/xie-2010/6-4/inline.json',
  downloadName: text('6-4-ters-laplace.md', '6-4-inverse-laplace.md'),
  labFamily: 'inverse-laplace',
  highlights: text(
    [
      'Ters Laplace operatörünün doğrusallığı: ℒ⁻¹{c₁F₁ + c₂F₂} = c₁f₁ + c₂f₂',
      'Birinci kaydırma tersi: ℒ⁻¹{F(s − a)} = e^{at} f(t)',
      'İkinci kaydırma tersi: ℒ⁻¹{e^{-as} F(s)} = f(t − a) H(t − a)',
      'Konvolüsyon İntegrali Teoremi: ℒ⁻¹{F(s)G(s)} = (f ∗ g)(t) = ∫₀ᵗ f(u) g(t − u) du',
      'Basit kesirlere ayırma (Partial Fractions): Ayrık, katlı ve kuadratik kutuplar',
      'Heaviside kapatma (cover-up) yöntemi ile kalıntı (residue) hesabı',
      'Tam kareye tamamlama ile sönümlü sinüs ve kosinüs modlarının eldesi',
      'Örnek 6.11–6.15 tam vize ve final çözümleri'
    ],
    [
      'Linearity of the inverse Laplace operator: ℒ⁻¹{c₁F₁ + c₂F₂} = c₁f₁ + c₂f₂',
      'First shifting inverse: ℒ⁻¹{F(s − a)} = e^{at} f(t)',
      'Second shifting inverse: ℒ⁻¹{e^{-as} F(s)} = f(t − a) H(t − a)',
      'Convolution Integral Theorem: ℒ⁻¹{F(s)G(s)} = (f ∗ g)(t) = ∫₀ᵗ f(u) g(t − u) du',
      'Partial fraction decomposition: Distinct, repeated, and quadratic poles',
      'Heaviside cover-up method for direct residue evaluation',
      'Completing the square for damped sinusoidal oscillatory modes',
      'Full midterm/final solutions to Examples 6.11–6.15'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Katlı kuadratik kutuplarda konvolüsyon integrali mi yoksa s-türevi kuralı mı daha hızlı sonuç verir?',
    'E.g., For repeated quadratic factors, is the convolution integral or s-differentiation faster on an exam?'
  ),
  presentation: {
    practiceIntro: text(
      'Bu çalışma modülünde ters Laplace dönüşümü, kısmi kesirler, konvolüsyon teoremi ve kutup analizleri üzerine 12 soru ve 22 puanlık 4 çözümlü sınav vakası yer almaktadır.',
      'This study module includes 12 practice questions and 4 worked exam cases worth 22 points on inverse Laplace transforms, partial fractions, convolution, and pole analysis.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: inverseStudySupport,
  guidedTools: {
    examClinic: inverseExamClinic
  },
  questions: [
    {
      title: text('Ters Laplace doğrusallığı', 'Linearity of inverse Laplace'),
      tag: 'DOĞRUSALLIK / LINEARITY',
      text: text(
        'c₁ ve c₂ sabitler olmak üzere ℒ⁻¹{c₁ F₁(s) + c₂ F₂(s)} ifadesinin eşiti nedir?',
        'What is the evaluation of ℒ⁻¹{c₁ F₁(s) + c₂ F₂(s)} for constants c₁ and c₂?'
      ),
      choices: text(
        [
          'c₁ · f₁(t) + c₂ · f₂(t)',
          'c₁ · c₂ · f₁(t) · f₂(t)',
          '[c₁ f₁(t) + c₂ f₂(t)] / t'
        ],
        [
          'c₁ · f₁(t) + c₂ · f₂(t)',
          'c₁ · c₂ · f₁(t) · f₂(t)',
          '[c₁ f₁(t) + c₂ f₂(t)] / t'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Ters Laplace dönüşümü doğrusal bir operatördür; toplamların ve sabit katsayıların ters dönüşümleri ayrı ayrı alınıp toplanır.',
        'Correct! The inverse Laplace transform is a linear operator, distributing over sums and scalar multiples.'
      ),
      hints: text(
        [
          'Düz Laplace dönüşümü doğrusal olduğu için tersi de doğrusallığı korur.',
          'Terim terim ters dönüşüm alınabilir.'
        ],
        [
          'Because the forward Laplace transform is linear, its inverse preserves linearity.',
          'Inversion distributes across individual terms.'
        ]
      )
    },
    {
      title: text('Frekans kaydırma tersi', 'Frequency shifting inverse'),
      tag: '1. KAYDIRMA / 1ST SHIFT',
      text: text(
        'ℒ⁻¹{F(s − a)} ters dönüşümünün zaman bölgesindeki karşılığı nedir?',
        'What is the time-domain equivalent of ℒ⁻¹{F(s − a)}?'
      ),
      choices: text(
        [
          'eᵃᵗ · f(t)',
          'e⁻ᵃᵗ · f(t)',
          'f(t − a)'
        ],
        [
          'eᵃᵗ · f(t)',
          'e⁻ᵃᵗ · f(t)',
          'f(t − a)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! s ekseninde a kadar sağa kaydırma (s − a), zaman bölgesinde eᵃᵗ üstel çarpanı ile modülasyona karşılık gelir.',
        'Spot on! A rightward shift (s − a) in the frequency domain corresponds to multiplying by eᵃᵗ in the time domain.'
      ),
      hints: text(
        [
          'ℒ{eᵃᵗ f(t)} = F(s − a) kuralını hatırlayınız.',
          'İki tarafın ters Laplace dönüşümünü alınız.'
        ],
        [
          'Recall the forward rule ℒ{eᵃᵗ f(t)} = F(s − a).',
          'Invert both sides directly.'
        ]
      )
    },
    {
      title: text('Kuvvet paydasının tersi', 'Inverse of power denominator'),
      tag: 'TEMEL FORMÜL / BASIC FORMULA',
      text: text(
        'n pozitif bir tam sayı olmak üzere ℒ⁻¹{1 / sⁿ} nedir?',
        'For a positive integer n, what is ℒ⁻¹{1 / sⁿ}?'
      ),
      choices: text(
        [
          'tⁿ⁻¹ / (n − 1)!',
          'tⁿ / n!',
          'n! · tⁿ⁻¹'
        ],
        [
          'tⁿ⁻¹ / (n − 1)!',
          'tⁿ / n!',
          'n! · tⁿ⁻¹'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! ℒ{tᵏ} = k! / s^{k+1} olduğundan k = n − 1 alınarak ℒ⁻¹{1 / sⁿ} = tⁿ⁻¹ / (n − 1)! elde edilir.',
        'Correct! Because ℒ{tᵏ} = k! / s^{k+1}, setting k = n − 1 gives ℒ⁻¹{1 / sⁿ} = tⁿ⁻¹ / (n − 1)!.'
      ),
      hints: text(
        [
          's² için t, s³ için t² / 2 olur.',
          'Kuvvet daima bir eksilir ve paydada faktöriyel yer alır.'
        ],
        [
          '1/s² inverts to t, 1/s³ inverts to t² / 2.',
          'The power is decremented by 1 with a factorial in the denominator.'
        ]
      )
    },
    {
      title: text('Harmonik sinüs ters dönüşümü', 'Harmonic sine inverse transform'),
      tag: 'SALINIM / OSCILLATION',
      text: text(
        'ℒ⁻¹{ω / (s² + ω²)} ifadesinin ters dönüşümü nedir?',
        'What is the inverse Laplace transform of ℒ⁻¹{ω / (s² + ω²)}?'
      ),
      choices: text(
        [
          'sin(ωt)',
          'cos(ωt)',
          'e^{ωt}'
        ],
        [
          'sin(ωt)',
          'cos(ωt)',
          'e^{ωt}'
        ]
      ),
      answer: 0,
      feedback: text(
        'Kesinlikle doğru! Payında frekans ω olan harmonik kesir sin(ωt) üretir; payında s olsaydı cos(ωt) olurdu.',
        'Exactly right! A numerator with frequency constant ω yields sin(ωt); a numerator with s yields cos(ωt).'
      ),
      hints: text(
        [
          'Payda s² + ω² saf harmonik salınımı gösterir.',
          'Payda s değişkeni yoksa sonuç sinüstür.'
        ],
        [
          'The denominator s² + ω² signals pure harmonic oscillation.',
          'Without s in the numerator, the result is sine.'
        ]
      )
    },
    {
      title: text('Sönümlü kosinüs tersi', 'Damped cosine inverse transform'),
      tag: '1. KAYDIRMA / 1ST SHIFT',
      text: text(
        'ℒ⁻¹{(s − a) / [(s − a)² + ω²]} ters dönüşümü aşağıdakilerden hangisidir?',
        'What is the inverse transform of ℒ⁻¹{(s − a) / [(s − a)² + ω²]}?'
      ),
      choices: text(
        [
          'eᵃᵗ · cos(ωt)',
          'e⁻ᵃᵗ · cos(ωt)',
          'eᵃᵗ · sin(ωt)'
        ],
        [
          'eᵃᵗ · cos(ωt)',
          'e⁻ᵃᵗ · cos(ωt)',
          'eᵃᵗ · sin(ωt)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! s / (s² + ω²) kosinüs çekirdeğidir; her s yerine (s − a) konulduğunda 1. kaydırma teoremi gereği eᵃᵗ ile çarpılır.',
        'Correct! s / (s² + ω²) is the cosine kernel; replacing s with (s − a) multiplies the result by eᵃᵗ.'
      ),
      hints: text(
        [
          'Temel fonksiyon cos(ωt)\'dir.',
          's → s − a ötelemesi zaman bölgesinde eᵃᵗ çarpanı üretir.'
        ],
        [
          'The base function is cos(ωt).',
          'The shift s → s − a produces a factor of eᵃᵗ.'
        ]
      )
    },
    {
      title: text('Heaviside kapatma (cover-up) kuralı', 'Heaviside cover-up method'),
      tag: 'KISMİ KESİRLER / PARTIAL FRACTIONS',
      text: text(
        'F(s) = P(s) / [(s − r) · Q(s)] ifadesinde s = r basit kutbuna ait kalıntı A katsayısı nasıl bulunur?',
        'How is the residue A for a simple pole s = r evaluated from F(s) = P(s) / [(s − r) · Q(s)]?'
      ),
      choices: text(
        [
          'A = P(r) / Q(r)  ((s − r) kapatılıp s = r yazılır)',
          'A = P′(r) / Q′(r)',
          'A = P(0) / Q(0)'
        ],
        [
          'A = P(r) / Q(r)  (mask (s − r) and substitute s = r)',
          'A = P′(r) / Q′(r)',
          'A = P(0) / Q(0)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! Heaviside kapatma (cover-up) kuralında ilgili basit kutup parantezi kapatılır ve geriye kalan rasyonel ifadede s = r konur.',
        'Spot on! In the cover-up method, cover the linear pole factor and evaluate the remainder at s = r.'
      ),
      hints: text(
        [
          'Her iki tarafı (s − r) ile çarpıp s → r limitine gidiniz.',
          'Paydadaki (s − r) sadeleşir ve geriye P(r) / Q(r) kalır.'
        ],
        [
          'Multiply both sides by (s − r) and take the limit s → r.',
          '(s − r) cancels out, leaving P(r) / Q(r).'
        ]
      )
    },
    {
      title: text('Örnek 6.13 rezonans ters dönüşümü', 'Example 6.13 resonance inverse transform'),
      tag: 'ÖRNEK 6.13 / EXAMPLE 6.13',
      text: text(
        'Kitaptaki Örnek 6.13\'te yer alan ℒ⁻¹{s / (s² + 4)²} ifadesinin çözümü nedir?',
        'What is the inverse transform of ℒ⁻¹{s / (s² + 4)²} from textbook Example 6.13?'
      ),
      choices: text(
        [
          '(1/4) · t · sin(2t)',
          '(1/2) · t · cos(2t)',
          '(1/4) · sin(2t)'
        ],
        [
          '(1/4) · t · sin(2t)',
          '(1/2) · t · cos(2t)',
          '(1/4) · sin(2t)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Konvolüsyon (1/2) sin 2t ∗ cos 2t integrali hesaplandığında sınır farkları sadeleşir ve (1/4) t sin 2t rezonans terimi kalır.',
        'Correct! Evaluating the convolution (1/2) sin 2t ∗ cos 2t simplifies directly to the resonance term (1/4) t sin 2t.'
      ),
      hints: text(
        [
          'Katlı sanal kutuplar zaman bölgesinde t ile doğrusal büyüme yaratır.',
          'Katsayı: 1 / (2 · 2) = 1/4.'
        ],
        [
          'Repeated imaginary poles create secular growth proportional to t.',
          'Coefficient: 1 / (2 · 2) = 1/4.'
        ]
      )
    },
    {
      title: text('Örnek 6.15 çift harmonik çözüm', 'Example 6.15 bi-harmonic inverse solution'),
      tag: 'ÖRNEK 6.15 / EXAMPLE 6.15',
      text: text(
        'ℒ⁻¹{(s + 1) / [(s² + 1)(s² + 9)]} ifadesinin kısmi kesir katsayıları ortak çarpanı nedir?',
        'What is the overall scale factor in the partial fraction decomposition of (s + 1) / [(s² + 1)(s² + 9)]?'
      ),
      choices: text(
        [
          '1 / 8',
          '1 / 10',
          '1 / 4'
        ],
        [
          '1 / 8',
          '1 / 10',
          '1 / 4'
        ]
      ),
      answer: 0,
      feedback: text(
        'Kesinlikle doğru! Paydalar (s² + 1) ve (s² + 9) olup kare farkı 9 − 1 = 8 olduğundan ortak katsayı 1/8 olarak dışarı çıkar.',
        'Exactly right! The difference of denominators 9 − 1 = 8 factors out the common 1/8 scale factor.'
      ),
      hints: text(
        [
          '9A + C = 1 ve A + C = 0 denklemlerini taraf tarafa çıkarınız.',
          '8A = 1 bulunur; bu da A = 1/8 demektir.'
        ],
        [
          'Subtract equations: (9A + C) − (A + C) = 1 − 0.',
          '8A = 1 yields A = 1/8.'
        ]
      )
    },
    ...inverseExtraQuestions
  ]
};
