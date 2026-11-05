import { laplaceSummaryStudySupport, laplaceSummaryExamClinic } from './study.js';
import { laplaceSummaryExtraQuestions } from './questions.js';

const text = (tr, en) => ({ tr, en });

export const laplaceSummaryLesson = {
  id: 'xie-2010:6.7',
  section: '6.7',
  chapterNumber: '06',
  chapterTitle: text('Laplace dönüşümü ve uygulamaları', 'The Laplace Transform and Its Applications'),
  title: text('Bölüm özeti ve yöntem rehberi', 'Chapter summary and method navigator'),
  englishTitle: 'Chapter Summary and Method Navigator',
  subtitle: text(
    'Bölüm 6 teorem ve özellikler matrisi (Tablo 6.3 & 6.4); 10 temel yöntem sınıflandırması, teşhis algoritması ve 10 temsilci sınav kartı ile tam sentez.',
    'Chapter 6 theorem and property matrix (Tables 6.3 & 6.4); 10 core methods classification, diagnostic decision engine, and complete synthesis across 10 exam cards.'
  ),
  pages: '289–299',
  pdfPages: '307–318',
  lessonPath: text('lessons/xie-2010/6-7/lesson.md', 'lessons/xie-2010/6-7/lesson-en.md'),
  mathPath: 'lessons/xie-2010/6-7/math.json',
  inlinePath: 'lessons/xie-2010/6-7/inline.json',
  downloadName: text('6-7-bolum-ozeti-ve-yontem-rehberi.md', '6-7-chapter-summary-and-methods.md'),
  labFamily: 'laplace-summary',
  highlights: text(
    [
      'Laplace dönüşümünün tüm özellikleri matrisi (Tablo 6.3): Doğrusallık, 1. ve 2. kaydırma, ölçekleme, türevler ve integraller',
      'Temel dönüşüm çiftleri ansiklopedisi (Tablo 6.4): Polinomlar, üstel, trigonometrik ve hiperbolik çekirdekler',
      'Heaviside birim basamak H(t − a) ve Dirac delta δ(t − a) fonksiyonlarının analitik sentezi',
      'Ters Laplace yöntem taksonomisi: Kısmi kesirler, Heaviside kapatma, tam kareye tamamlama ve konvolüsyon',
      'Katlı kuadratik rezonans kutuplarında zaman bölgesinde t çarpanı büyümesi',
      'Diferansiyel denklemlerde ZIR (serbest yanıt) ve ZSR (zorlanmış yanıt) ayrışımı',
      'Aralık sınırlarında dikiş (stitching) gerektirmeyen tek formüllü süreksiz çözüm mimarisi',
      'Mühendislik uygulamaları: SDOF titreşim, şok darbeleri, periyodik RLC devreleri ve elastik zemin kirişleri'
    ],
    [
      'Master property matrix (Table 6.3): Linearity, 1st & 2nd shifting, scaling, transforms of derivatives and integrals',
      'Transform pair catalog (Table 6.4): Polynomial, exponential, trigonometric, and hyperbolic kernels',
      'Unified treatment of Heaviside step H(t − a) and Dirac delta δ(t − a) impulse functions',
      'Inverse Laplace taxonomy: Partial fractions, Heaviside cover-up, completing the square, and convolution',
      'Secular resonance growth from repeated quadratic poles in the complex frequency plane',
      'Systematic decomposition into Zero-Input Response (ZIR) and Zero-State Response (ZSR)',
      'Elimination of piecewise boundary stitching for discontinuous and pulse inputs',
      'Engineering synthesis: SDOF vibrations, shock pulses, periodic RLC circuits, and elastic foundation beams'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Hangi durumlarda kısmi kesirler yerine konvolüsyon integrali teoremini tercih etmeliyiz?',
    'E.g., In which scenarios is the convolution theorem strictly preferred over partial fractions?'
  ),
  presentation: {
    practiceIntro: text(
      'Bu çalışma modülünde Bölüm 6\'nın tüm yöntemlerini kapsayan 12 sentez sorusu ve 22 puanlık 4 çözümlü sınav kliniği vakası yer almaktadır.',
      'This study module includes 12 synthesis questions and 4 worked exam cases worth 22 points covering all methods of Chapter 6.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: laplaceSummaryStudySupport,
  guidedTools: {
    examClinic: laplaceSummaryExamClinic
  },
  questions: [
    {
      title: text('1. ve 2. kaydırma teoremleri ayrımı', 'Distinction between 1st and 2nd shifting theorems'),
      tag: 'KAYDIRMA TEOREMLERİ / SHIFTING THEOREMS',
      text: text(
        '1. kaydırma teoremi ile 2. kaydırma teoremi arasındaki temel fark nedir?',
        'What is the fundamental difference between the 1st and 2nd shifting theorems?'
      ),
      choices: text(
        [
          '1. kaydırma frekansta öteleme yapar: ℒ{e^{at} f(t)} = F(s − a); 2. kaydırma zamanda gecikme yapar: ℒ{f(t − a) H(t − a)} = e^{-as} F(s)',
          '1. kaydırma sadece türevler için geçerlidir; 2. kaydırma sadece integraller için geçerlidir',
          'İki teorem de tamamen aynı bağıntıyı farklı sembollerle ifade eder'
        ],
        [
          '1st shifting translates frequency: ℒ{e^{at} f(t)} = F(s − a); 2nd shifting delays time: ℒ{f(t − a) H(t − a)} = e^{-as} F(s)',
          '1st shifting applies only to derivatives; 2nd shifting applies only to integrals',
          'Both theorems represent identical identities written in different notations'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! 1. kaydırma zaman bölgesinde e^{at} ile çarpımı frekansta (s − a) ötelemesine çevirir; 2. kaydırma ise zamanda a kadar gecikmeyi frekansta e^{-as} faz çarpanına çevirir.',
        'Correct! The 1st shift maps time multiplication by e^{at} to a frequency translation (s − a); the 2nd shift maps a time delay of a to an exponential phase factor e^{-as}.'
      ),
      hints: text(
        [
          '1. kaydırma frekansta kaydırmadır (s-shift).',
          '2. kaydırma zamanda kaydırmadır (t-shift).'
        ],
        [
          '1st shifting operates in frequency (s-shift).',
          '2nd shifting operates in time (t-shift).'
        ]
      )
    },
    {
      title: text('Dirac delta ve Heaviside ilişkisi', 'Relation between Dirac delta and Heaviside step'),
      tag: 'DAĞILIM TEORİSİ / DELTA & HEAVISIDE',
      text: text(
        'Dirac delta fonksiyonu δ(t − a) ile Heaviside basamak fonksiyonu H(t − a) arasındaki diferansiyel ilişki nedir?',
        'What is the differential relationship between the Dirac delta δ(t − a) and Heaviside step H(t − a)?'
      ),
      choices: text(
        [
          'δ(t − a) = d/dt [H(t − a)]  (dağılımsal türev)',
          'H(t − a) = d/dt [δ(t − a)]',
          'δ(t − a) = H(t − a) / t'
        ],
        [
          'δ(t − a) = d/dt [H(t − a)]  (distributional derivative)',
          'H(t − a) = d/dt [δ(t − a)]',
          'δ(t − a) = H(t − a) / t'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! Heaviside fonksiyonu t = a anında sıçrama yapar; basamağın dağılımsal türevi bu sıçrama anında sonsuz tepe yüksekliğine ve 1 birim alana sahip Dirac delta darbesini doğurur.',
        'Spot on! The Heaviside step jumps at t = a; its generalized derivative produces an ideal Dirac delta with unit area centered at t = a.'
      ),
      hints: text(
        [
          'Basamağın eğimi sıçrama anında sonsuzdur.',
          'İntegral ters yönde çalışır: ∫ δ(u) du = H(t).'
        ],
        [
          'The slope of the unit step is infinite at the jump.',
          'Integration acts inversely: ∫ δ(u) du = H(t).'
        ]
      )
    },
    {
      title: text('Konvolüsyon teoreminin avantajı', 'Advantage of the convolution theorem'),
      tag: 'KONVOLÜSYON / ADVANTAGE',
      text: text(
        'F(s) · G(s) çarpımının ters Laplace dönüşümünde konvolüsyon integrali en çok hangi durumda hayat kurtarır?',
        'In evaluating ℒ⁻¹{F(s) · G(s)}, in which scenario is the convolution integral most advantageous?'
      ),
      choices: text(
        [
          'Katlı kuadratik kutuplarda veya transfer fonksiyonunun analitik olarak çarpanlarına ayrılamadığı keyfi zorlama durumlarında',
          'Yalnızca birinci dereceden basit reel köklerde',
          'Fonksiyon sabit bir sayıya eşit olduğunda'
        ],
        [
          'For repeated quadratic poles or arbitrary forcing inputs where analytical factorization is impractical',
          'Only for first-order simple real poles',
          'When the function equals a constant scalar'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! (s² + ω²)² gibi katlı paydalar veya keyfi bir f(t) girdisiyle sürülen sistemlerde konvolüsyon teoremi (h ∗ f)(t), kısmi kesirlerin zorluklarını tamamen aşar.',
        'Correct! For repeated denominators like (s² + ω²)² or systems driven by arbitrary excitation f(t), convolution (h ∗ f)(t) sidesteps complex partial fraction algebra.'
      ),
      hints: text(
        [
          'Örnek 6.13 rezonans çözümünü hatırlayın.',
          'Green impuls yanıtı ile giriş konvolüsyonla bağlanır.'
        ],
        [
          'Recall Example 6.13 for repeated resonant poles.',
          'Green impulse response convolves with inputs.'
        ]
      )
    },
    {
      title: text('ZIR ve ZSR yanıtlarının ayrışımı', 'Decomposition into ZIR and ZSR'),
      tag: 'SİSTEM DİNAMİĞİ / ZIR & ZSR',
      text: text(
        'Sabit katsayılı bir IVP probleminde Y(s) = Q(s)/P(s) + F(s)/P(s) ayrışımında Q(s)/P(s) terimi neyi temsil eder?',
        'In a linear constant-coefficient IVP where Y(s) = Q(s)/P(s) + F(s)/P(s), what does Q(s)/P(s) represent?'
      ),
      choices: text(
        [
          'Sıfır-girdi yanıtını (ZIR / Serbest titreşim): Yalnızca başlangıç koşullarının yarattığı yanıt',
          'Sıfır-durum yanıtını (ZSR / Zorlanmış titreşim)',
          'Sadece kalıcı rezonans halini'
        ],
        [
          'Zero-Input Response (ZIR / Free vibration): Response driven solely by initial conditions',
          'Zero-State Response (ZSR / Forced vibration)',
          'Pure steady-state resonant motion'
        ]
      ),
      answer: 0,
      feedback: text(
        'Kutlarız! Q(s) başlangıç verilerinden y(0), y\'(0) kaynaklanan polinomdur; dış zorlama sıfır iken (F(s) = 0) sistemin serbest hareketini (ZIR) üretir.',
        'Congratulations! Q(s) arises from initial data y(0), y\'(0), governing unforced free motion (ZIR) when external input is zero.'
      ),
      hints: text(
        [
          'F(s) dış girdi zorlamasıdır.',
          'Q(s) teriminde f(t) girdisi yer almaz.'
        ],
        [
          'F(s) represents external forcing input.',
          'Q(s) contains no input forcing terms.'
        ]
      )
    },
    {
      title: text('Rezonansın s-bölgesindeki imzası', 'Resonance signature in the s-domain'),
      tag: 'REZONANS / RESONANCE SIGNATURE',
      text: text(
        'Fiziksel bir sistemde sönümsüz rezonans meydana geldiğinde s-bölgesindeki transfer fonksiyonu paydasında ne görülür?',
        'When undamped physical resonance occurs, what algebraic structure appears in the denominator in the s-domain?'
      ),
      choices: text(
        [
          'Doğal frekansta katlı sanal kutuplar: (s² + ω₀²)²',
          'Yalnızca tekil bir reel kutup: s = 0',
          'Sonsuz sayıda negatif kutup'
        ],
        [
          'Repeated imaginary poles at the natural frequency: (s² + ω₀²)²',
          'A single isolated real pole: s = 0',
          'An infinite chain of negative poles'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Giriş frekansı doğal frekansla çakıştığında (s² + ω₀²) faktörü karesiyle katlanır; bu katlı kutup zaman bölgesinde t sin ω₀t şeklinde doğrusal büyüyen rezonans terimi doğurur.',
        'Correct! When forcing frequency matches natural frequency, the factor (s² + ω₀²) is repeated, inverting to t sin ω₀t secular linear growth.'
      ),
      hints: text(
        [
          'Frekans eşleşmesi kutupların üst üste binmesine yol açar.',
          'Zaman bölgesinde genlik t ile çarpılır.'
        ],
        [
          'Frequency matching superimposes poles.',
          'Amplitude is multiplied by t in time.'
        ]
      )
    },
    {
      title: text('Gecikmeli polinomlarda Taylor açılımı', 'Taylor expansion of delayed polynomials'),
      tag: 'TAYLOR KAYDIRMASI / TAYLOR SHIFT',
      text: text(
        'P(t) · H(t − a) ifadesinin Laplace dönüşümünü almak için önerilen standart mühendislik adımı nedir?',
        'What is the recommended engineering technique to transform P(t) · H(t − a)?'
      ),
      choices: text(
        [
          't = (t − a) + a yazılarak polinomu (t − a) kuvvetlerine göre Taylor açılımına getirmek',
          'H(t − a) terimini ihmal edip doğrudan P(t) dönüşümünü almak',
          'Polinomun integralini alıp 1/s ile çarpmak'
        ],
        [
          'Rewrite t = (t − a) + a to expand the polynomial in powers of (t − a)',
          'Neglect H(t − a) and transform P(t) directly',
          'Integrate the polynomial and multiply by 1/s'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! İkinci kaydırma teoremi ℒ{h(t − a) H(t − a)} = e^{-as} ℒ{h(t)} kuralını şart koşar; t = (t − a) + a açılımı polinomu bu standart forma kusursuz biçimde uydurur.',
        'Spot on! The 2nd shifting theorem requires the canonical form h(t − a) H(t − a); expanding around t = (t − a) + a enables immediate term-by-term transformation.'
      ),
      hints: text(
        [
          'Örnek 6.18\'deki t² + t + 1 açılımını hatırlayın.',
          'Argümanlar basamak gecikmesi ile birebir eşleşmelidir.'
        ],
        [
          'Recall Example 6.18 with t² + t + 1.',
          'Arguments must match the step delay identically.'
        ]
      )
    },
    {
      title: text('Periyodik fonksiyonlarda integral kuralı', 'Periodic function integral rule'),
      tag: 'PERİYODİK DÖNÜŞÜM / PERIODIC INTEGRAL',
      text: text(
        'Periyodu T olan bir sinyalin Laplace dönüşümünde paydada hangi geometrik seri çarpanı yer alır?',
        'What geometric series factor appears in the denominator of the Laplace transform of a signal with period T?'
      ),
      choices: text(
        [
          '1 − e^{-sT}',
          '1 + e^{-sT}',
          'e^{-sT}'
        ],
        [
          '1 − e^{-sT}',
          '1 + e^{-sT}',
          'e^{-sT}'
        ]
      ),
      answer: 0,
      feedback: text(
        'Kutlarız! Sonsuz periyodik dalga dizisi zaman gecikmeleri toplamıdır: 1 + e^{-sT} + e^{-2sT} + ... = 1 / (1 − e^{-sT}).',
        'Congratulations! The infinite periodic sequence sums as 1 + e^{-sT} + e^{-2sT} + ... = 1 / (1 − e^{-sT}).'
      ),
      hints: text(
        [
          'Geometrik seri formülü: 1 / (1 − r).',
          'Ortak çarpan r = e^{-sT} dir.'
        ],
        [
          'Geometric series sum: 1 / (1 − r).',
          'Common ratio is r = e^{-sT}.'
        ]
      )
    },
    {
      title: text('Elastik zeminde kiriş çökme zarfı', 'Beam deflection decay on elastic foundation'),
      tag: 'KİRİŞ ÇÖKMESİ / BEAM FOUNDATION',
      text: text(
        'Elastik zemin üzerindeki kirişte noktasal bir yükün yarattığı deformasyon uzayda nasıl sönümlenir?',
        'How does beam deflection from a concentrated point load decay across space on an elastic foundation?'
      ),
      choices: text(
        [
          'e^{-β |x − a|} zarfı altında dalgalı biçimde hızla sıfıra söner',
          'Doğrusal olarak kiriş uçlarına kadar azalır',
          'Hiç sönümlenmeden sabit kalır'
        ],
        [
          'Decays rapidly to zero enveloped by e^{-β |x − a|} in an oscillatory wave',
          'Decreases linearly to the beam boundaries',
          'Remains constant without any spatial attenuation'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Karakteristik kökler s = ±β(1 ± i) karmaşık eşlenik olduğundan çözüm e^{-β |x-a|} [cos(β|x-a|) + sin(β|x-a|)] formundadır ve yükten birkaç dalgaboyu uzaklıkta deformasyon tamamen biter.',
        'Correct! Complex roots s = ±β(1 ± i) produce spatially damped waves e^{-β |x-a|} [cos(β|x-a|) + sin(β|x-a|)], localizing the deflection effect.'
      ),
      hints: text(
        [
          'Karakteristik köklerin gerçel kısmı −β dır.',
          'Uzaysal sönümleme e^{-β |x-a|} fonksiyonudur.'
        ],
        [
          'The real part of characteristic roots is −β.',
          'Spatial attenuation follows e^{-β |x-a|}.'
        ]
      )
    },
    ...laplaceSummaryExtraQuestions
  ]
};
