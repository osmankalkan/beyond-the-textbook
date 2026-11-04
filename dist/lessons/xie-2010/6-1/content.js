import {extraQuestions} from './questions.js';
import {laplaceStudy, laplaceClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const laplaceLesson = {
  id: 'xie-2010:6.1',
  section: '6.1',
  chapterNumber: '06',
  chapterTitle: text('Laplace dönüşümü ve uygulamaları', 'The Laplace Transform and Its Applications'),
  title: text('Laplace dönüşümü: tanım, çekirdek integrali ve temel özellikler', 'The Laplace transform: definition, kernel integral, and basic properties'),
  englishTitle: 'The Laplace Transform: Definition, Kernel Integral, and Basic Properties',
  subtitle: text(
    'Zaman bölgesinden karmaşık frekans s-bölgesine geçiş: has olmayan çekirdek integrali ∫₀^∞ e^{-st} f(t) dt, yakınsama apsisi s > s₀, Euler özdeşliği ile sinüs/kosinüs, türevin cebirsel dönüşümü L{f\'(t)} = s F(s) − f(0), birinci frekans kaydırması ve s-türevi kuralları.',
    'Transition from time domain to complex frequency s-domain: improper kernel integral ∫₀^∞ e^{-st} f(t) dt, convergence abscissa s > s₀, simultaneous sine/cosine via Euler’s identity, algebraic derivative transform L{f\'(t)} = s F(s) − f(0), first frequency shifting, and s-differentiation.'
  ),
  pages: '244–249',
  pdfPages: '263–267',
  lessonPath: text('lessons/xie-2010/6-1/lesson.md', 'lessons/xie-2010/6-1/lesson-en.md'),
  mathPath: 'lessons/xie-2010/6-1/math.json',
  inlinePath: 'lessons/xie-2010/6-1/inline.json',
  labFamily: 'laplace',
  downloadName: text('6-1-laplace-donusumu.md', '6-1-the-laplace-transform.md'),
  highlights: text(
    [
      'Laplace dönüşümünün tanımı: e^{-st} sönüm çekirdeği ile has olmayan integral',
      'Üstel mertebe ve yakınsama apsisi (s > s₀ koşulu)',
      'Euler formülü e^{iωt} ile cos ωt ve sin ωt dönüşümlerinin eşzamanlı hesabı',
      'Türevin Laplace dönüşümü L{f\'} = s F(s) − f(0) ile diferansiyel denklemin cebirselleştirilmesi',
      'Birinci kaydırma L{e^{at}f(t)} = F(s − a) ve s bölgesinde türev L{t^n f(t)} = (−1)^n d^nF/ds^n kuralları'
    ],
    [
      'Laplace transform definition: improper integral weighted by damping kernel e^{-st}',
      'Functions of exponential order and abscissa of convergence (s > s₀ boundary)',
      'Simultaneous derivation of cos ωt and sin ωt via Euler’s identity e^{iωt}',
      'Transform of derivatives L{f\'} = s F(s) − f(0) turning differential equations into algebra',
      'First shifting theorem L{e^{at}f(t)} = F(s − a) and s-domain differentiation L{t^n f(t)} = (−1)^n d^nF/ds^n'
    ]
  ),
  notesPlaceholder: text(
    'Laplace integralini hesaplarken s > s₀ sınırını ve türev kuralındaki eksi işaretlerini nasıl kontrol etmeliyim?',
    'How should I check the convergence abscissa s > s₀ and minus signs when applying derivative and shifting properties?'
  ),
  sourceSummary: text(
    '§6.1 The Laplace Transform, s.244–249 (PDF s.263–267, Örnek 6.1–6.5 ve Tablo A.4) temelinde hazırlanmış derinlemesine konu anlatımı ve sınav kliniği.',
    'In-depth instructional module and exam clinic based on §6.1 The Laplace Transform, pp. 244–249 (PDF pp. 263–267, Examples 6.1–6.5, and Table A.4).'
  ),
  modelLimits: text(
    'Laplace laboratuvarı 7 temel fonksiyon ailesini (sabit, üstel, sinüs, kosinüs, sönümlü sinüs, t·sinüs ve polinom) hem analitik hem de Simpson sayısal integrasyonuyla simüle eder. Has olmayan integral sonlu bir T ufkunda kesilir; s parametresi yakınsama apsisi s₀ sınırının altına indiğinde integral ıraksar.',
    'The Laplace workbench simulates 7 elementary families (constant, exponential, sine, cosine, damped sine, t·sine, and polynomial) both analytically and via composite Simpson quadrature. The improper integral is truncated at a finite horizon T; when s falls below the abscissa s₀, the integral diverges.'
  ),
  presentation: {
    clinicEyebrow: text('§6.1 · LAPLACE DÖNÜŞÜMÜ · USTA KLİNİK', '§6.1 · THE LAPLACE TRANSFORM · MASTER CLINIC'),
    lab: text('Laplace çekirdek sönümü ve s-spektrum laboratuvarı', 'Laplace kernel damping & s-spectrum workbench'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('Çekirdeği, kaydırmayı ve türev kurallarını 60 saniyede teşhis et', 'Diagnose kernel damping, shift, and derivative properties in 60 seconds'),
    practiceIntro: text(
      '22 dakika · 22 puan. Dört kapsamlı sınav sorusu üzerinde iki farklı yoldan polinom dönüşümü, sönümlü osilasyon, s-türevi ve birleşik kaydırmayı çöz; ardından 12 soruyla ustalığını kanıtla.',
      '22 minutes · 22 points. Master polynomial transforms via two distinct routes, damped oscillations, s-differentiation, and composite shifting across four exam problems, then verify your mastery with 12 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: laplaceStudy,
  guidedTools: laplaceClinic,
  questions: [
    {
      title: text('Laplace integrali tanımı ve çekirdek', 'Laplace integral definition and kernel'),
      tag: 'TANIM / DEFINITION',
      text: text(
        'f(t) fonksiyonunun Laplace dönüşümü F(s) = ℒ{f(t)} hangi has olmayan integral ile tanımlanır?',
        'By which improper integral is the Laplace transform F(s) = ℒ{f(t)} defined for a function f(t)?'
      ),
      choices: text(
        [
          '∫₀^∞ e^{-st} f(t) dt  (s > s₀)',
          '∫_{-∞}^∞ e^{-st} f(t) dt',
          '∫₀^∞ e^{st} f(t) dt'
        ],
        [
          '∫₀^∞ e^{-st} f(t) dt  (s > s₀)',
          '∫_{-∞}^∞ e^{-st} f(t) dt',
          '∫₀^∞ e^{st} f(t) dt'
        ]
      ),
      answer: 0,
      feedback: text(
        'Laplace dönüşümü tek taraflı (t ≥ 0) has olmayan integraldir ve e^{-st} sönüm çekirdeği ile ağırlıklandırılır. s > s₀ yakınsama apsisidir.',
        'The Laplace transform is a one-sided (t ≥ 0) improper integral weighted by the damping kernel e^{-st}, convergent for s > s₀.'
      ),
      hints: text(
        [
          'İntegral sınırları nereden nereyedir: 0’dan sonsuza mı, eksi sonsuzdan artı sonsuza mı?',
          'Çekirdeğin üssü negatif (−st) midir yoksa pozitif (+st) mi?'
        ],
        [
          'Are the integration limits from 0 to ∞ or from −∞ to +∞?',
          'Is the kernel exponent negative (−st) or positive (+st)?'
        ]
      )
    },
    {
      title: text('Sabit fonksiyonun Laplace dönüşümü', 'Laplace transform of a constant function'),
      tag: 'TEMEL DÖNÜŞÜM / ELEMENTARY TRANSFORM',
      text: text(
        'f(t) = c (c sabit bir sayı) fonksiyonunun Laplace dönüşümü ℒ{c} nedir ve hangi aralıkta geçerlidir?',
        'What is the Laplace transform ℒ{c} of a constant function f(t) = c, and in what region is it valid?'
      ),
      choices: text(
        [
          'c / s  (s > 0)',
          'c · s  (s > 0)',
          'c / s²  (s > 0)'
        ],
        [
          'c / s  (s > 0)',
          'c · s  (s > 0)',
          'c / s²  (s > 0)'
        ]
      ),
      answer: 0,
      feedback: text(
        '∫₀^∞ e^{-st} c dt = c [−(1/s) e^{-st}]₀^∞ = c(0 − (−1/s)) = c/s (s > 0).',
        'Integrating ∫₀^∞ e^{-st} c dt = c [−(1/s) e^{-st}]₀^∞ yields c/s for s > 0.'
      ),
      hints: text(
        [
          '∫ e^{-st} dt integralinin sonucu nedir?',
          't = 0 alt sınırında e^{0} = 1 değeri ne verir?'
        ],
        [
          'What is the antiderivative of e^{-st} dt?',
          'What does e^{0} = 1 evaluate to at the lower limit t = 0?'
        ]
      )
    },
    {
      title: text('Doğrusallık özelliği', 'Linearity property'),
      tag: 'ÖZELLİK / PROPERTY',
      text: text(
        'c₁ ve c₂ sabitleri için ℒ{c₁ f₁(t) + c₂ f₂(t)} ifadesi aşağıdakilerden hangisine eşittir?',
        'For constants c₁ and c₂, what does ℒ{c₁ f₁(t) + c₂ f₂(t)} equal?'
      ),
      choices: text(
        [
          'c₁ ℒ{f₁(t)} + c₂ ℒ{f₂(t)}',
          'c₁ c₂ ℒ{f₁(t)} ℒ{f₂(t)}',
          'ℒ{f₁(t)} + ℒ{f₂(t)} / (c₁ + c₂)'
        ],
        [
          'c₁ ℒ{f₁(t)} + c₂ ℒ{f₂(t)}',
          'c₁ c₂ ℒ{f₁(t)} ℒ{f₂(t)}',
          'ℒ{f₁(t)} + ℒ{f₂(t)} / (c₁ + c₂)'
        ]
      ),
      answer: 0,
      feedback: text(
        'İntegral doğrusal bir işlem olduğu için Laplace operatörü ℒ de doğrusaldır; sabitler dışarı çıkar ve toplam ayrılır.',
        'Because integration is a linear operation, the Laplace operator ℒ is linear: constants factor out and sums split.'
      ),
      hints: text(
        [
          'İntegral toplam ve sabit katsayıları nasıl davranır?',
          'Doğrusal operatörlerin temel tanımını hatırla.'
        ],
        [
          'How does an integral treat sums and scalar constants?',
          'Recall the defining property of a linear operator.'
        ]
      )
    },
    {
      title: text('Birinci türevin Laplace dönüşümü', 'Laplace transform of first derivative'),
      tag: 'TÜREV KURALI / DERIVATIVE RULE',
      text: text(
        'f(t) fonksiyonunun birinci türevinin Laplace dönüşümü ℒ{f\'(t)} neye eşittir?',
        'What does the Laplace transform of the first derivative ℒ{f\'(t)} equal?'
      ),
      choices: text(
        [
          's F(s) − f(0)',
          's F(s) + f(0)',
          'F(s) / s − f(0)'
        ],
        [
          's F(s) − f(0)',
          's F(s) + f(0)',
          'F(s) / s − f(0)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Kısmi integrasyonla ∫₀^∞ e^{-st} f\'(t) dt = [e^{-st} f(t)]₀^∞ + s ∫₀^∞ e^{-st} f(t) dt = 0 − f(0) + s F(s) = s F(s) − f(0) elde edilir.',
        'Integration by parts gives [e^{-st} f(t)]₀^∞ + s ∫₀^∞ e^{-st} f(t) dt = −f(0) + s F(s) = s F(s) − f(0).'
      ),
      hints: text(
        [
          't = 0 alt sınırından f(0) hangi işaretle gelir?',
          'Kısmi integrasyonda du = −s e^{-st} dt terimindeki eksi işareti formülün eksisiyle neye dönüşür?'
        ],
        [
          'What sign does f(0) carry from the lower limit t = 0?',
          'How does the minus sign in du = −s e^{-st} dt combine with the integration-by-parts minus?'
        ]
      )
    },
    {
      title: text('Üstel mertebe ve yakınsama apsisi', 'Exponential order and abscissa of convergence'),
      tag: 'YAKINSAMA / CONVERGENCE',
      text: text(
        'f(t) = e^{5t} fonksiyonunun Laplace dönüşümü ℒ{e^{5t}} = 1 / (s − 5) hangi s değerleri için geçerlidir?',
        'For which values of s is the Laplace transform ℒ{e^{5t}} = 1 / (s − 5) valid?'
      ),
      choices: text(
        [
          's > 5',
          's > 0',
          'Tüm gerçel s değerleri'
        ],
        [
          's > 5',
          's > 0',
          'All real values of s'
        ]
      ),
      answer: 0,
      feedback: text(
        '∫₀^∞ e^{-(s-5)t} dt integralinin t → ∞ sınırında sıfıra gidebilmesi için üssün katsayısı negatif, yani s − 5 > 0 ⇒ s > 5 olmalıdır.',
        'For e^{-(s-5)t} to vanish as t → ∞, the coefficient must be negative, requiring s − 5 > 0, hence s > 5.'
      ),
      hints: text(
        [
          'e^{-(s-a)t} integralinde t sonsuza giderken terimin patlamaması için s ve a arasındaki ilişki ne olmalıdır?',
          'Paydanın sıfır olduğu s = 5 noktasının sağı mı solu mu geçerlidir?'
        ],
        [
          'In e^{-(s-a)t}, what relationship between s and a prevents the integrand from blowing up at infinity?',
          'Does convergence occur to the right or left of the pole s = 5?'
        ]
      )
    },
    {
      title: text('Sinüs fonksiyonunun Laplace dönüşümü', 'Laplace transform of sine'),
      tag: 'TRİGONOMETRİK / TRIGONOMETRIC',
      text: text(
        'f(t) = sin 4t fonksiyonunun Laplace dönüşümü ℒ{sin 4t} nedir?',
        'What is the Laplace transform ℒ{sin 4t} of f(t) = sin 4t?'
      ),
      choices: text(
        [
          '4 / (s² + 16)',
          's / (s² + 16)',
          '4 / (s² − 16)'
        ],
        [
          '4 / (s² + 16)',
          's / (s² + 16)',
          '4 / (s² − 16)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Genel formül ℒ{sin ωt} = ω / (s² + ω²) gereğince ω = 4 için pay 4, payda s² + 16 olur (s > 0).',
        'By the standard formula ℒ{sin ωt} = ω / (s² + ω²), ω = 4 gives 4 / (s² + 16) for s > 0.'
      ),
      hints: text(
        [
          'Sinüs dönüşümünün payında frekans ω mı yoksa karmaşık değişken s mi bulunur?',
          'Paydada eksi işareti mi artı işareti mi vardır?'
        ],
        [
          'Does the numerator of the sine transform have frequency ω or variable s?',
          'Is the denominator separated by a plus or minus sign?'
        ]
      )
    },
    {
      title: text('Birinci kaydırma teoremi (frekans kayması)', 'First shifting theorem (frequency shift)'),
      tag: 'BİRİNCİ KAYDIRMA / FIRST SHIFTING',
      text: text(
        'f(t) fonksiyonu e^{at} ile çarpıldığında Laplace dönüşümü ℒ{e^{at} f(t)} nasıl değişir?',
        'When f(t) is multiplied by e^{at}, how does its Laplace transform ℒ{e^{at} f(t)} change?'
      ),
      choices: text(
        [
          'F(s − a)  (s parametresi a kadar sağa kayar)',
          'F(s + a)',
          'e^{-as} F(s)'
        ],
        [
          'F(s − a)  (the parameter s shifts right by a)',
          'F(s + a)',
          'e^{-as} F(s)'
        ]
      ),
      answer: 0,
      feedback: text(
        '∫₀^∞ e^{-st} e^{at} f(t) dt = ∫₀^∞ e^{-(s-a)t} f(t) dt olduğundan s parametresinin yerini (s − a) alır: ℒ{e^{at} f(t)} = F(s − a).',
        'Since e^{-st} e^{at} = e^{-(s-a)t}, the parameter s is replaced by (s − a): ℒ{e^{at} f(t)} = F(s − a).'
      ),
      hints: text(
        [
          'Üsler toplandığında −st + at = −(s − a)t olduğuna dikkat et.',
          'e^{-as} F(s) ikinci kaydırma (zaman gecikmesi / Heaviside) kuralıdır; birinci kaydırma ile karıştırma.'
        ],
        [
          'Note that combining exponents gives −st + at = −(s − a)t.',
          'e^{-as} F(s) is the second shifting theorem (time delay); do not confuse it with frequency shifting.'
        ]
      )
    },
    {
      title: text('s bölgesinde türev ve t çarpanı', 's-domain differentiation and factor of t'),
      tag: 's-TÜREVİ / s-DERIVATIVE',
      text: text(
        'f(t) fonksiyonunun t ile çarpımı ℒ{t f(t)} s-bölgesinde hangi işleme karşılık gelir?',
        'What operation in the s-domain corresponds to multiplying f(t) by t in ℒ{t f(t)}?'
      ),
      choices: text(
        [
          '−dF(s) / ds',
          '+dF(s) / ds',
          '−s F(s)'
        ],
        [
          '−dF(s) / ds',
          '+dF(s) / ds',
          '−s F(s)'
        ]
      ),
      answer: 0,
      feedback: text(
        'F(s) = ∫₀^∞ e^{-st} f(t) dt integralinin s’e göre türevi dF/ds = ∫₀^∞ (−t) e^{-st} f(t) dt = −ℒ{t f(t)} verir; bu nedenle ℒ{t f(t)} = −dF(s)/ds olur.',
        'Differentiating F(s) with respect to s brings down −t: dF/ds = −ℒ{t f(t)}, hence ℒ{t f(t)} = −dF(s)/ds.'
      ),
      hints: text(
        [
          'e^{-st} ifadesinin s parametresine göre türevi nedir?',
          'Önündeki eksi işaretini unutma: d/ds e^{-st} = −t e^{-st}.'
        ],
        [
          'What is the derivative of e^{-st} with respect to s?',
          'Remember the minus sign: d/ds e^{-st} = −t e^{-st}.'
        ]
      )
    },
    ...extraQuestions
  ]
};
