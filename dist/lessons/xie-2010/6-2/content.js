import {extraQuestions} from './questions.js';
import {heavisideStudy, heavisideClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const heavisideLesson = {
  id: 'xie-2010:6.2',
  section: '6.2',
  chapterNumber: '06',
  chapterTitle: text('Laplace dönüşümü ve uygulamaları', 'The Laplace Transform and Its Applications'),
  title: text('Heaviside basamak fonksiyonu: parçalı sinyaller ve 2. kaydırma teoremi', 'The Heaviside step function: piecewise signals and the 2nd shifting theorem'),
  englishTitle: 'The Heaviside Step Function: Piecewise Signals and the Second Shifting Theorem',
  subtitle: text(
    'Mühendislikte ani anahtarlama, darbe kuvvetleri ve parçalı girdiler: birim basamak H(t − a), dikdörtgen pencereleme H(t − a) − H(t − b), zaman gecikmesini s-bölgesinde e^{-as} ile modüle eden 2. Kaydırma Teoremi L{f(t-a)H(t-a)} = e^{-as}F(s) ve argüman eşleştirme stratejileri.',
    'Sudden switching, pulse loads, and piecewise inputs in engineering: unit step H(t − a), rectangular windowing H(t − a) − H(t − b), the 2nd Shifting Theorem L{f(t-a)H(t-a)} = e^{-as}F(s) modulating time delays by e^{-as}, and argument alignment strategies.'
  ),
  pages: '249–254',
  pdfPages: '268–272',
  lessonPath: text('lessons/xie-2010/6-2/lesson.md', 'lessons/xie-2010/6-2/lesson-en.md'),
  mathPath: 'lessons/xie-2010/6-2/math.json',
  inlinePath: 'lessons/xie-2010/6-2/inline.json',
  labFamily: 'heaviside',
  downloadName: text('6-2-heaviside-basamak-fonksiyonu.md', '6-2-the-heaviside-step-function.md'),
  highlights: text(
    [
      'Heaviside basamak fonksiyonunun tanımı: t < a için 0, t > a için 1',
      'Basamağın Laplace dönüşümü: L{H(t − a)} = e^{-as} / s (s > 0)',
      'İkinci Kaydırma Teoremi (Zaman Gecikmesi): L{f(t − a)H(t − a)} = e^{-as} F(s)',
      'Parçalı ve darbeli fonksiyonların pencereme tekniği ile tek satırda yazılması',
      'Argüman eşleşmeme tuzakları ve Taylor açılımı ile öteleme (Örnek 6.7–6.9)'
    ],
    [
      'Heaviside unit step definition: 0 for t < a, 1 for t > a',
      'Laplace transform of the step: L{H(t − a)} = e^{-as} / s (s > 0)',
      'Second Shifting Theorem (Time Delay): L{f(t − a)H(t − a)} = e^{-as} F(s)',
      'Expressing piecewise and pulsed inputs in a single line via windowing',
      'Argument mismatch traps and Taylor shifting strategies (Examples 6.7–6.9)'
    ]
  ),
  notesPlaceholder: text(
    'f(t)H(t - a) çarpımında f(t) fonksiyonunu (t - a) cinsinden nasıl eşleştirmeliyim ve e^{-as} çarpanını nasıl izole etmeliyim?',
    'How should I align the argument of f(t) into powers of (t - a) in f(t)H(t - a) to isolate the e^{-as} factor?'
  ),
  sourceSummary: text(
    '§6.2 The Heaviside Step Function, s.249–254 (PDF s.268–272, Örnek 6.6–6.9) temelinde hazırlanmış kapsamlı konu anlatımı ve sınav kliniği.',
    'Comprehensive instructional module and exam clinic based on §6.2 The Heaviside Step Function, pp. 249–254 (PDF pp. 268–272, Examples 6.6–6.9).'
  ),
  modelLimits: text(
    'Heaviside laboratuvarı 7 temel basamaklı fonksiyon ailesini (gecikmeli basamak, pencere darbesi, gecikmeli rampa, gecikmeli üstel, gecikmeli sinüs, eşleşmeyen üstel ve merdiven) simüle eder. Zaman bölgesi grafiği anahtarlama anını ve sönüm çekirdeğini, frekans spektrumu ise e^{-as} sönümlü F(s) eğrisini gösterir.',
    'The Heaviside workbench simulates 7 elementary switched families (delayed step, pulse window, delayed ramp, delayed exp, delayed sine, unmatched exp, and staircase). The time-domain plot illustrates the switching onset and kernel, while the s-spectrum displays the e^{-as}-modulated F(s) curve.'
  ),
  presentation: {
    clinicEyebrow: text('§6.2 · HEAVISIDE BASAMAK FONKSİYONU · USTA KLİNİK', '§6.2 · HEAVISIDE STEP FUNCTION · MASTER CLINIC'),
    lab: text('Heaviside zaman gecikmesi ve darbe simülatörü', 'Heaviside time delay & pulse simulator'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('Gecikmeyi, penceremeyi ve Taylor kaydırmasını 60 saniyede teşhis et', 'Diagnose delay onset, windowing, and Taylor shift in 60 seconds'),
    practiceIntro: text(
      '22 dakika · 22 puan. Dört kapsamlı sınav sorusu üzerinde tH(t-2) üç yoldan hesabı, eşleşmeyen üstel tuzağı, trigonometrik faz ötelemesi ve polinom Taylor kaydırmasını çöz; ardından 12 soruyla ustalığını kanıtla.',
      '22 minutes · 22 points. Solve tH(t-2) via three routes, unmatched exponential traps, trigonometric phase shifts, and polynomial Taylor expansions across four master exam problems, then verify your mastery with 12 questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: heavisideStudy,
  guidedTools: heavisideClinic,
  questions: [
    {
      title: text('Heaviside basamak fonksiyonunun tanımı', 'Definition of Heaviside step function'),
      tag: 'TANIM / DEFINITION',
      text: text(
        'H(t − a) birim basamak fonksiyonu t < a ve t > a aralıklarında sırasıyla hangi değerleri alır?',
        'What values does the unit step function H(t − a) take on t < a and t > a, respectively?'
      ),
      choices: text(
        [
          't < a için 0, t > a için 1',
          't < a için 1, t > a için 0',
          't < a için −1, t > a için +1'
        ],
        [
          '0 for t < a, 1 for t > a',
          '1 for t < a, 0 for t > a',
          '−1 for t < a, +1 for t > a'
        ]
      ),
      answer: 0,
      feedback: text(
        'Heaviside basamağı t < a için tamamen sıfırdır; t = a anında aniden 1 seviyesine sıçrar ve t > a boyunca 1 olarak kalır.',
        'The Heaviside step is identically zero for t < a, jumps abruptly to 1 at t = a, and remains 1 for all t > a.'
      ),
      hints: text(
        [
          'a gecikme anından önce sinyal açık mıdır kapalı mıdır?',
          'Birim basamak ifadesi değerin 1 olduğunu belirtir.'
        ],
        [
          'Is the signal on or off prior to delay time a?',
          'The phrase unit step indicates a magnitude of 1.'
        ]
      )
    },
    {
      title: text('Gecikmeli basamağın Laplace dönüşümü', 'Laplace transform of delayed step'),
      tag: 'TEMEL DÖNÜŞÜM / ELEMENTARY TRANSFORM',
      text: text(
        'a ≥ 0 olmak üzere H(t − a) fonksiyonunun Laplace dönüşümü ℒ{H(t − a)} nedir?',
        'For a ≥ 0, what is the Laplace transform ℒ{H(t − a)} of the step H(t − a)?'
      ),
      choices: text(
        [
          'e⁻ᵃˢ / s  (s > 0)',
          'eᵃˢ / s  (s > 0)',
          '1 / (s − a)  (s > a)'
        ],
        [
          'e⁻ᵃˢ / s  (s > 0)',
          'eᵃˢ / s  (s > 0)',
          '1 / (s − a)  (s > a)'
        ]
      ),
      answer: 0,
      feedback: text(
        '∫₀^∞ e⁻ˢᵗ H(t − a) dt = ∫_a^∞ e⁻ˢᵗ dt = [−(1/s) e⁻ˢᵗ]_a^∞ = e⁻ᵃˢ / s (s > 0).',
        'Integrating ∫₀^∞ e⁻ˢᵗ H(t − a) dt = ∫_a^∞ e⁻ˢᵗ dt = [−(1/s) e⁻ˢᵗ]_a^∞ yields e⁻ᵃˢ / s for s > 0.'
      ),
      hints: text(
        [
          'İntegralin alt sınırı t < a için sıfır olduğundan nereye kayar?',
          't = a alt sınırı konulduğunda e⁻ˢᵗ neye dönüşür?'
        ],
        [
          'Where does the lower limit move since the integrand is zero for t < a?',
          'What does e⁻ˢᵗ evaluate to at the lower limit t = a?'
        ]
      )
    },
    {
      title: text('İkinci kaydırma teoremi (zaman gecikmesi)', 'Second shifting theorem (time delay)'),
      tag: '2. KAYDIRMA / 2ND SHIFT',
      text: text(
        'F(s) = ℒ{f(t)} ve a ≥ 0 olduğuna göre ℒ{f(t − a) H(t − a)} dönüşümü neye eşittir?',
        'Given F(s) = ℒ{f(t)} and a ≥ 0, what does ℒ{f(t − a) H(t − a)} equal?'
      ),
      choices: text(
        [
          'e⁻ᵃˢ F(s)',
          'eᵃˢ F(s)',
          'F(s − a)'
        ],
        [
          'e⁻ᵃˢ F(s)',
          'eᵃˢ F(s)',
          'F(s − a)'
        ]
      ),
      answer: 0,
      feedback: text(
        '2. Kaydırma Teoremi (Zaman Gecikmesi) gereğince zaman domeninde a kadar geciken f(t − a)H(t − a) sinyali s-bölgesinde e⁻ᵃˢ F(s) ile çarpılır. F(s − a) ise 1. Kaydırma (frekans ötelemesi) teoremidir.',
        'By the 2nd Shifting Theorem (Time Delay), delaying a signal by a in time multiplies its transform by e⁻ᵃˢ: ℒ{f(t − a)H(t − a)} = e⁻ᵃˢ F(s).'
      ),
      hints: text(
        [
          'F(s − a) zaman bölgesinde e^{at} ile çarpımda ortaya çıkan 1. kaydırmadır.',
          'Zaman gecikmesi s-bölgesinde üstel bir e⁻ᵃˢ çarpanı getirir.'
        ],
        [
          'F(s − a) belongs to the 1st shift (multiplying by e^{at} in time).',
          'Time delay introduces an exponential factor e⁻ᵃˢ in the s-domain.'
        ]
      )
    },
    {
      title: text('Dikdörtgen darbe penceresi', 'Rectangular pulse window'),
      tag: 'PENCEREME / WINDOWING',
      text: text(
        'Bir g(t) sinyali yalnızca 2 < t < 5 zaman aralığında etkin, bu aralık dışında ise sıfır ise Heaviside basamaklarıyla nasıl ifade edilir?',
        'If a signal g(t) is active only for 2 < t < 5 and zero elsewhere, how is it expressed using Heaviside steps?'
      ),
      choices: text(
        [
          'g(t) [H(t − 2) − H(t − 5)]',
          'g(t) [H(t − 2) + H(t − 5)]',
          'g(t) H(t − 3)'
        ],
        [
          'g(t) [H(t − 2) − H(t − 5)]',
          'g(t) [H(t − 2) + H(t − 5)]',
          'g(t) H(t − 3)'
        ]
      ),
      answer: 0,
      feedback: text(
        'H(t − 2) basamağı t = 2 anında sinyali açar, H(t − 5) basamağı ise t = 5 anında sinyali kapatır; farkları [2, 5] dikdörtgen penceresini oluşturur.',
        'H(t − 2) turns the signal on at t = 2, and H(t − 5) cancels it at t = 5; their difference forms the rectangular window on [2, 5].'
      ),
      hints: text(
        [
          't > 5 için sinyalin sıfır olması için basamaklar toplanır mı çıkarılır mı?',
          't = 2’de açılan anahtar t = 5’te nasıl kapanır?'
        ],
        [
          'To ensure zero value for t > 5, do steps add or subtract?',
          'How does a switch turned on at t = 2 turn off at t = 5?'
        ]
      )
    },
    {
      title: text('Parçalı fonksiyonda sıçrama açılımı', 'Jump decomposition of piecewise function'),
      tag: 'PARÇALI SİNYAL / PIECEWISE SIGNAL',
      text: text(
        't < 3 için f(t) = 4 ve t > 3 için f(t) = 7 olan parçalı fonksiyon Heaviside basamağıyla nasıl yazılır?',
        'How is the piecewise function f(t) = 4 for t < 3 and f(t) = 7 for t > 3 written using a Heaviside step?'
      ),
      choices: text(
        [
          '4 + 3 H(t − 3)',
          '4 + 7 H(t − 3)',
          '7 − 4 H(t − 3)'
        ],
        [
          '4 + 3 H(t − 3)',
          '4 + 7 H(t − 3)',
          '7 − 4 H(t − 3)'
        ]
      ),
      answer: 0,
      feedback: text(
        't = 3 noktasındaki sıçrama miktarı 7 − 4 = 3 birimdir. Genel kural f(t) = f₁ + (f₂ − f₁)H(t − 3) = 4 + 3H(t − 3) olur.',
        'The jump at t = 3 is 7 − 4 = 3 units. The formula f(t) = f₁ + (f₂ − f₁)H(t − 3) gives 4 + 3H(t − 3).'
      ),
      hints: text(
        [
          't < 3 iken H(t − 3) = 0 olduğunda fonksiyon 4 değerini vermelidir.',
          't > 3 iken H(t − 3) = 1 olduğunda 4 + 3 = 7 değerine ulaşmalıdır.'
        ],
        [
          'When t < 3, H(t − 3) = 0 must leave the base value 4.',
          'When t > 3, H(t − 3) = 1 must sum to 4 + 3 = 7.'
        ]
      )
    },
    {
      title: text('Gecikmeli rampa dönüşümü', 'Delayed ramp transform'),
      tag: '2. KAYDIRMA / 2ND SHIFT',
      text: text(
        'f(t) = (t − 3) H(t − 3) gecikmeli rampa fonksiyonunun Laplace dönüşümü nedir?',
        'What is the Laplace transform of the delayed ramp f(t) = (t − 3) H(t − 3)?'
      ),
      choices: text(
        [
          'e⁻³ˢ / s²  (s > 0)',
          'e⁻³ˢ / s  (s > 0)',
          '1 / (s − 3)²  (s > 3)'
        ],
        [
          'e⁻³ˢ / s²  (s > 0)',
          'e⁻³ˢ / s  (s > 0)',
          '1 / (s − 3)²  (s > 3)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Taban fonksiyon f(t) = t olup ℒ{t} = 1/s² dönüşümüne sahiptir. Argüman (t − 3) ile kilitli olduğundan 2. kaydırma ile e⁻³ˢ / s² elde edilir.',
        'The base function is f(t) = t with ℒ{t} = 1/s². Matching argument (t − 3) produces e⁻³ˢ / s² via the 2nd shift.'
      ),
      hints: text(
        [
          't fonksiyonunun Laplace dönüşümü nedir?',
          't − 3 gecikmesi s-bölgesine hangi üstel çarpanı getirir?'
        ],
        [
          'What is the Laplace transform of t?',
          'What exponential factor does the delay t − 3 introduce?'
        ]
      )
    },
    {
      title: text('t H(t − 2) argüman eşleştirme stratejisi', 'Argument alignment strategy for t H(t − 2)'),
      tag: 'ARGÜMAN EŞLEŞTİRME / ARGUMENT ALIGNMENT',
      text: text(
        'f(t) = t H(t − 2) fonksiyonuna 2. Kaydırma Teoremini uygulayabilmek için t ifadesi nasıl parçalanmalıdır?',
        'How must t be decomposed to apply the 2nd Shift Theorem to f(t) = t H(t − 2)?'
      ),
      choices: text(
        [
          '(t − 2) + 2',
          '(t + 2) − 2',
          '2 · (t − 1)'
        ],
        [
          '(t − 2) + 2',
          '(t + 2) − 2',
          '2 · (t − 1)'
        ]
      ),
      answer: 0,
      feedback: text(
        't = (t − 2) + 2 yazıldığında t H(t − 2) = (t − 2)H(t − 2) + 2H(t − 2) olur. Buradan ℒ = e⁻²ˢ(1/s² + 2/s) doğrudan bulunur.',
        'Writing t = (t − 2) + 2 splits the expression into (t − 2)H(t − 2) + 2H(t − 2), giving e⁻²ˢ(1/s² + 2/s) directly.'
      ),
      hints: text(
        [
          'Heaviside basamağının argümanı (t − 2)\'dir.',
          't ifadesine 2 ekleyip 2 çıkarmayı düşün.'
        ],
        [
          'The Heaviside step argument is (t − 2).',
          'Consider adding and subtracting 2 from t.'
        ]
      )
    },
    {
      title: text('Eşleşmeyen üstel tuzağı e^{3t}H(t − 1)', 'Unmatched exponential trap e^{3t}H(t − 1)'),
      tag: 'EŞLEŞMEYEN ARGÜMAN / UNMATCHED ARGUMENT',
      text: text(
        'e^{3t} H(t − 1) fonksiyonunda üs (t − 1) ile kilitlenmek istendiğinde e^{3t} nasıl çarpanlara ayrılır?',
        'How is e^{3t} factored to align with (t − 1) in e^{3t} H(t − 1)?'
      ),
      choices: text(
        [
          'e³ · e^{3(t − 1)}',
          'e⁻³ · e^{3(t − 1)}',
          'e^{3t − 1}'
        ],
        [
          'e³ · e^{3(t − 1)}',
          'e⁻³ · e^{3(t − 1)}',
          'e^{3t − 1}'
        ]
      ),
      answer: 0,
      feedback: text(
        '3t = 3(t − 1) + 3 olduğundan e^{3t} = e³ · e^{3(t − 1)} yazılır. Buradan e³ e⁻ˢ / (s − 3) = e⁻⁽ˢ⁻³⁾ / (s − 3) dönüşümü elde edilir.',
        'Since 3t = 3(t − 1) + 3, e^{3t} = e³ · e^{3(t − 1)}. This yields e³ e⁻ˢ / (s − 3) = e⁻⁽ˢ⁻³⁾ / (s − 3).'
      ),
      hints: text(
        [
          '3(t − 1) açıldığında 3t − 3 verir.',
          '3t elde etmek için 3 eklenmelidir: e^{3(t − 1) + 3} = e³ e^{3(t − 1)}.'
        ],
        [
          'Expanding 3(t − 1) gives 3t − 3.',
          'To recover 3t, add 3: e^{3(t − 1) + 3} = e³ e^{3(t − 1)}.'
        ]
      )
    },
    ...extraQuestions
  ]
};
