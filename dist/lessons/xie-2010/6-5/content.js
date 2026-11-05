import { laplaceOdeStudySupport, laplaceOdeExamClinic } from './study.js';
import { laplaceOdeExtraQuestions } from './questions.js';

const text = (tr, en) => ({ tr, en });

export const laplaceOdeLesson = {
  id: 'xie-2010:6.5',
  section: '6.5',
  chapterNumber: '06',
  chapterTitle: text('Laplace dönüşümü ve uygulamaları', 'The Laplace Transform and Its Applications'),
  title: text('Diferansiyel denklemlerin Laplace dönüşümü ile çözümü', 'Solving differential equations using the Laplace transform'),
  englishTitle: 'Solving Differential Equations Using the Laplace Transform',
  subtitle: text(
    'Başlangıç değer problemlerinin s-bölgesinde cebirsel denklemlere dönüştürülmesi; homojen ve özel çözümlerin ZIR ve ZSR olarak tek hamlede eldesi, süreksiz basamak ve impuls yanıtları.',
    'Converting initial value problems into algebraic equations in s; unifying homogeneous and particular solutions into ZIR and ZSR in a single pass, with step and impulse excitation.'
  ),
  pages: '263–272',
  pdfPages: '281–290',
  lessonPath: text('lessons/xie-2010/6-5/lesson.md', 'lessons/xie-2010/6-5/lesson-en.md'),
  mathPath: 'lessons/xie-2010/6-5/math.json',
  inlinePath: 'lessons/xie-2010/6-5/inline.json',
  downloadName: text('6-5-diferansiyel-denklemler-laplace.md', '6-5-solving-odes-laplace.md'),
  labFamily: 'laplace-ode',
  highlights: text(
    [
      'Türevlerin Laplace dönüşümü formülleri: ℒ{y\'} = sY(s) − y(0) ve ℒ{y\'\'} = s²Y(s) − sy(0) − y\'(0)',
      'Başlangıç koşullarının homojen ve özel çözümü ayırmadan doğrudan cebirsel sürece katılması',
      'Sıfır-girdi yanıtı (ZIR / serbest titreşim) ile Sıfır-durum yanıtı (ZSR / zorlanmış titreşim) ayrışımı',
      'Karakteristik polinom P(s) ile transfer fonksiyonu H(s) = 1 / P(s) bağlantısı',
      'Parçalı ve Heaviside basamak zorlamalarında aralık dikişi (stitching) ihtiyacının ortadan kalkması',
      'Dirac delta darbelerinde hız süreksizliği ve Green impuls yanıtının elde edilişi',
      'Gecikmeli polinomlarda Taylor açılımı yöntemi: t² H(t − a) → [(t − a) + a]² H(t − a)',
      'Örnek 6.16–6.19 tam vize ve final adımları'
    ],
    [
      'Transform of derivatives: ℒ{y\'} = sY(s) − y(0) and ℒ{y\'\'} = s²Y(s) − sy(0) − y\'(0)',
      'Direct integration of initial conditions without separating homogeneous and particular parts',
      'Decomposition into Zero-Input Response (ZIR) and Zero-State Response (ZSR)',
      'Connection between characteristic polynomial P(s) and transfer function H(s) = 1 / P(s)',
      'Elimination of piecewise interval stitching for Heaviside step inputs',
      'Impulse response and velocity jump discontinuity under Dirac delta forcing',
      'Taylor expansion technique for delayed polynomials: t² H(t − a) → [(t − a) + a]² H(t − a)',
      'Complete solutions for textbook Examples 6.16 through 6.19'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Başlangıç koşullarını s-bölgesine aktarırken eksi işaretleri nasıl güvenceye alınır?',
    'E.g., How to ensure negative signs are not dropped when transferring initial conditions into the s-domain?'
  ),
  presentation: {
    practiceIntro: text(
      'Bu çalışma modülünde diferansiyel denklemlerin Laplace ile çözümü, türev kuralları, ZIR/ZSR ayrışımı ve süreksiz zorlamalar üzerine 12 soru ve 22 puanlık 4 çözümlü sınav vakası yer almaktadır.',
      'This study module includes 12 practice questions and 4 worked exam cases worth 22 points on solving ODEs with Laplace transforms, derivative properties, ZIR/ZSR splitting, and discontinuous forcing.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: laplaceOdeStudySupport,
  guidedTools: {
    examClinic: laplaceOdeExamClinic
  },
  questions: [
    {
      title: text('Birinci türevin Laplace dönüşümü', 'Laplace transform of first derivative'),
      tag: 'TÜREV KURALI / 1ST DERIVATIVE',
      text: text(
        'y(t) sürekli bir fonksiyon olmak üzere ℒ{y\'(t)} ifadesinin s-bölgesindeki eşiti nedir?',
        'For a continuous function y(t), what is ℒ{y\'(t)} in the s-domain?'
      ),
      choices: text(
        [
          's · Y(s) − y(0)',
          's · Y(s) + y(0)',
          'Y(s) / s − y(0)'
        ],
        [
          's · Y(s) − y(0)',
          's · Y(s) + y(0)',
          'Y(s) / s − y(0)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Kısmi integrasyon uygulandığında [e⁻ˢᵗ y(t)]₀^∞ sınırı −y(0) üretir ve kalan integral s Y(s) verir.',
        'Correct! Integration by parts yields [e⁻ˢᵗ y(t)]₀^∞ = −y(0) and the remaining integral evaluates to s Y(s).'
      ),
      hints: text(
        [
          'Kısmi integrasyon: ∫ u dv = u v − ∫ v du kuralını hatırlayın.',
          't = 0 alt sınırından −y(0) gelir.'
        ],
        [
          'Recall integration by parts: ∫ u dv = u v − ∫ v du.',
          'The lower boundary at t = 0 produces −y(0).'
        ]
      )
    },
    {
      title: text('İkinci türevin Laplace dönüşümü', 'Laplace transform of second derivative'),
      tag: 'TÜREV KURALI / 2ND DERIVATIVE',
      text: text(
        'ℒ{y\'\'(t)} ifadesinin s-bölgesindeki eşiti aşağıdakilerden hangisidir?',
        'What is ℒ{y\'\'(t)} in the s-domain?'
      ),
      choices: text(
        [
          's² · Y(s) − s · y(0) − y\'(0)',
          's² · Y(s) + s · y(0) + y\'(0)',
          's² · Y(s) − y(0) − y\'(0)'
        ],
        [
          's² · Y(s) − s · y(0) − y\'(0)',
          's² · Y(s) + s · y(0) + y\'(0)',
          's² · Y(s) − y(0) − y\'(0)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! Birinci türev kuralı ardışık iki kez uygulandığında s² katsayısının yanında sırasıyla s · y(0) ve y\'(0) başlangıç verileri çıkar.',
        'Spot on! Applying the first derivative property twice recursively yields s² Y(s) − s y(0) − y\'(0).'
      ),
      hints: text(
        [
          'Her türev mertebesinde s çarpanının derecesi birer azalır.',
          'Başlangıç koşulu terimlerinin hepsi eksi işaretlidir.'
        ],
        [
          'Powers of s diminish by 1 with each successive derivative order.',
          'All initial boundary terms carry negative signs.'
        ]
      )
    },
    {
      title: text('n-inci mertebe türev kuralı', 'n-th order derivative rule'),
      tag: 'GENEL TÜREV / N-TH DERIVATIVE',
      text: text(
        'ℒ{y⁽ⁿ⁾(t)} formülünde y(0) teriminin önündeki s katsayısının kuvveti kaçtır?',
        'What is the power of s multiplying y(0) in the transform formula ℒ{y⁽ⁿ⁾(t)}?'
      ),
      choices: text(
        [
          's^{n − 1}',
          'sⁿ',
          's^{n − 2}'
        ],
        [
          's^{n − 1}',
          'sⁿ',
          's^{n − 2}'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! ℒ{y⁽ⁿ⁾} = sⁿ Y(s) − s^{n−1} y(0) − s^{n−2} y\'(0) − ... − y⁽ⁿ⁻¹⁾(0) dizilişi geçerlidir.',
        'Correct! The sequence is sⁿ Y(s) − s^{n−1} y(0) − s^{n−2} y\'(0) − ... − y⁽ⁿ⁻¹⁾(0).'
      ),
      hints: text(
        [
          'n = 2 için s^{2-1} = s olduğunu kontrol edin.',
          'Katsayılar sⁿ teriminden başlayıp adım adım birer derece düşer.'
        ],
        [
          'For n = 2 check that s^{2-1} = s.',
          'Powers decrease sequentially by 1 from sⁿ.'
        ]
      )
    },
    {
      title: text('Sıfır-girdi yanıtı (ZIR)', 'Zero-Input Response (ZIR)'),
      tag: 'ZIR TANIMI / ZERO-INPUT',
      text: text(
        'Dış zorlama kuvveti f(t) = 0 iken sistemin sadece başlangıç koşulları y(0), y\'(0) nedeniyle yaptığı harekete ne ad verilir?',
        'What is the motion called when external forcing f(t) = 0 and response is sustained solely by initial data y(0), y\'(0)?'
      ),
      choices: text(
        [
          'Sıfır-girdi yanıtı (ZIR / Serbest titreşim)',
          'Sıfır-durum yanıtı (ZSR / Zorlanmış titreşim)',
          'Darbe tepki fonksiyonu'
        ],
        [
          'Zero-Input Response (ZIR / Free vibration)',
          'Zero-State Response (ZSR / Forced vibration)',
          'Impulse response function'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! ZIR, sisteme dışarıdan hiçbir sinyal verilmediğinde (input = 0) başlangıç enerjisinin yarattığı doğal davranıştır.',
        'Correct! The Zero-Input Response represents the unforced free evolution from initial stored energy.'
      ),
      hints: text(
        [
          'Girdi (input) sıfırdır.',
          'Fizikte serbest salınım (free vibration) olarak bilinir.'
        ],
        [
          'Input is strictly zero.',
          'Known in mechanics as unforced free vibration.'
        ]
      )
    },
    {
      title: text('Karakteristik polinom ve transfer fonksiyonu', 'Characteristic polynomial and transfer function'),
      tag: 'TRANSFER FONKSİYONU / TRANSFER FN',
      text: text(
        'a y\'\' + b y\' + c y = f(t) denkleminde P(s) = a s² + b s + c karakteristik polinom ise sistemin transfer fonksiyonu H(s) nedir?',
        'In a y\'\' + b y\' + c y = f(t) where P(s) = a s² + b s + c, what is the system transfer function H(s)?'
      ),
      choices: text(
        [
          'H(s) = 1 / P(s) = 1 / (a s² + b s + c)',
          'H(s) = P(s)',
          'H(s) = s · P(s)'
        ],
        [
          'H(s) = 1 / P(s) = 1 / (a s² + b s + c)',
          'H(s) = P(s)',
          'H(s) = s · P(s)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! Transfer fonksiyonu sıfır başlangıç koşullarında çıkışın girişe oranıdır: H(s) = Y(s) / F(s) = 1 / P(s).',
        'Spot on! The transfer function is the ratio of output to input under zero initial conditions: H(s) = Y(s) / F(s) = 1 / P(s).'
      ),
      hints: text(
        [
          'P(s) Y(s) = F(s) eşitliğini Y(s) / F(s) biçiminde yazın.',
          'Transfer fonksiyonunun paydasındaki kökler sistemin kutuplarıdır.'
        ],
        [
          'Rearrange P(s) Y(s) = F(s) into Y(s) / F(s).',
          'Poles of the transfer function are the roots of the characteristic polynomial.'
        ]
      )
    },
    {
      title: text('Heaviside basamağında aralık dikişi', 'Elimination of stitching in step forcing'),
      tag: 'AVANTAJ / LAPLACE ADVANTAGE',
      text: text(
        'y\'\' + y = H(t − 2) gibi basamak zorlamalı denklemlerde Laplace yönteminin klasik yönteme en büyük üstünlüğü nedir?',
        'What is the greatest advantage of the Laplace transform over classical ODE methods for step-forced equations like y\'\' + y = H(t − 2)?'
      ),
      choices: text(
        [
          't < 2 ve t > 2 aralıklarını ayrı ayrı çözüp sınırda dikiş (stitching) yapma zorunluluğunu ortadan kaldırması',
          'Tüm kökleri daima gerçel sayılara dönüştürmesi',
          'Sadece birinci mertebe denklemlere uygulanabilmesi'
        ],
        [
          'Eliminating the need to solve separate intervals for t < 2 and t > 2 and stitch boundary values',
          'Converting all roots permanently into real numbers',
          'Being restricted to first-order equations only'
        ]
      ),
      answer: 0,
      feedback: text(
        'Kutlarız! Klasik yöntemde t < 2 ve t ≥ 2 için iki ayrı çözüm bulunur ve t = 2 noktasında konum ve hız sürekliliği eşitlenerek katsayılar aranır. Laplace dönüşümü ise tek bir cebirsel denklemle tüm zamanı aynı anda çözer!',
        'Congratulations! Classical calculus demands piecewise boundary stitching at t = 2, whereas Laplace solves the entire domain in a single unified algebraic step.'
      ),
      hints: text(
        [
          'Klasik yöntemde her aralık için yeni bir homojen katsayı seti bulunur.',
          'Laplace dönüşümünde H(t − 2) doğrudan tek bir çözüm formülü içine gömülür.'
        ],
        [
          'Classical methods require determining new arbitrary constants across piecewise domains.',
          'Laplace incorporates H(t − 2) directly into a single closed-form solution.'
        ]
      )
    },
    {
      title: text('Katlı rezonans köklerinin zaman davranışı', 'Time behavior of repeated resonant poles'),
      tag: 'REZONANS / RESONANT POLES',
      text: text(
        'Y(s) ifadesinde 1 / (s² + 9)² terimi varsa, zaman bölgesindeki karşılığı nasıl bir davranış gösterir?',
        'If Y(s) contains a term 1 / (s² + 9)², how does its time-domain counterpart behave?'
      ),
      choices: text(
        [
          't · cos 3t veya t · sin 3t terimleri içerir; rezonans nedeniyle genliği zamanla doğrusal büyür',
          'Üstel olarak hızla sıfıra söner',
          'Sabit genlikli saf harmonik dalgadır'
        ],
        [
          'Contains t · cos 3t or t · sin 3t; amplitude grows linearly with time due to resonance',
          'Decays exponentially to zero',
          'Produces a pure harmonic wave with constant amplitude'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Paydadaki katlı kuadratik kutup, zaman bölgesinde t ile çarpılan harmonik terimler doğurur ve sistem sönümsüz rezonans yaşar.',
        'Correct! Repeated imaginary poles yield secular terms multiplied by t, generating physical resonance growth.'
      ),
      hints: text(
        [
          'Örnek 6.13 ve Örnek 6.16 bu katlı kuadratik ters dönüşümünü içerir.',
          'Frekans eşleşmesi sistemde sürekli enerji birikimine yol açar.'
        ],
        [
          'Refer to Examples 6.13 and 6.16 for this repeated quadratic inversion.',
          'Frequency matching pumps continuous energy into the oscillator.'
        ]
      )
    },
    {
      title: text('Gecikmeli basamak terimlerinin ters dönüşümü', 'Inversion of delayed step terms'),
      tag: '2. KAYDIRMA / 2ND SHIFT INVERSION',
      text: text(
        'ℒ⁻¹{e⁻²ˢ / (s + 3)} ters dönüşümünün eşiti nedir?',
        'What is ℒ⁻¹{e⁻²ˢ / (s + 3)}?'
      ),
      choices: text(
        [
          'e⁻³⁽ᵗ⁻²⁾ · H(t − 2)',
          'e⁻³ᵗ · H(t − 2)',
          'e⁻²⁽ᵗ⁻³⁾ · H(t − 3)'
        ],
        [
          'e⁻³⁽ᵗ⁻²⁾ · H(t − 2)',
          'e⁻³ᵗ · H(t − 2)',
          'e⁻²⁽ᵗ⁻³⁾ · H(t − 3)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! ℒ⁻¹{1 / (s + 3)} = e⁻³ᵗ dir. e⁻²ˢ çarpanı zamanı 2 birim geciktirerek e⁻³⁽ᵗ⁻²⁾ H(t − 2) verir.',
        'Spot on! Since ℒ⁻¹{1 / (s + 3)} = e⁻³ᵗ, the e⁻²ˢ factor shifts time by 2 to yield e⁻³⁽ᵗ⁻²⁾ H(t − 2).'
      ),
      hints: text(
        [
          'Önce e⁻²ˢ çarpanı olmadan ters dönüşümü bulun.',
          'Bulduğunuz f(t) fonksiyonunda her t yerine (t − 2) yazıp yanına H(t − 2) ekleyin.'
        ],
        [
          'First invert without the exponential factor.',
          'Substitute (t − 2) for t and multiply by H(t − 2).'
        ]
      )
    },
    ...laplaceOdeExtraQuestions
  ]
};