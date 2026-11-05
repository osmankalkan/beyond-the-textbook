import {T,step,v,n,o,p,f,pow,sub,prime,eq,plus,minus,x,y,t,C,fn,exp,integral,lines} from '../../../study/math.js';

const r=s=>`<mrow>${s}</mrow>`;
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6),seven=n(7),eight=n(8),nine=n(9),ten=n(10);
const s=v('s'),w=v('ω'),a=v('a'),b=v('b'),c=v('c'),k=v('k'),m=v('m'),u=v('u'),F=v('F'),G=v('G'),L=v('ℒ'),H=v('H'),X=v('X'),I=v('I'),V=v('V'),Y=v('Y'),Q=v('Q');
const dt=v('d')+t,du=v('d')+u,ds=v('d')+s;
const infty=v('∞'),pi=v('π'),zeta=v('ζ');
const sin=arg=>fn('sin',arg),cos=arg=>fn('cos',arg),par=arg=>p(arg);
const imp=o('⇒'),cdot=o('·'),gt=o('>'),to=o('→'),neq=o('≠'),ast=o('∗');
const Linv=pow(L,minus+one);

const pathMethodNav=[
  step(
    '1. Problemin türünü belirle: Düz, Ters veya Diferansiyel Denklem (IVP)',
    '1. Classify problem type: Forward, Inverse, or Differential Equation (IVP)',
    lines(
      fn('f',t)+to+F+p(s)+o(' , ')+F+p(s)+to+fn('f',t)+o(' , ')+p(pow(s,two)+plus+v('a')+s+plus+v('b'))+Y+p(s)+eq+F+p(s)+plus+Q+p(s)
    ),
    'Problemin matematiksel yönü doğru kural havuzunu seçmenin ilk adımıdır.',
    'Classifying the mathematical direction selects the proper operational rule set.'
  ),
  step(
    '2. Düz dönüşümlerde sinyal modülasyonlarını tespit et',
    '2. Detect signal modulations in forward transforms',
    lines(
      exp(a+t)+fn('f',t)+imp+F+p(s+minus+a)+o(' ; ')+fn('f',t+minus+a)+H+p(t+minus+a)+imp+exp(minus+a+s)+F+p(s)
    ),
    'e^{at} çarpanı 1. kaydırma, H(t - a) gecikmesi 2. kaydırma, t^n çarpanı ise frekans türevi gerektirir.',
    'e^{at} demands 1st shift, H(t - a) requires 2nd shift, and t^n invokes frequency differentiation.'
  ),
  step(
    '3. Ters dönüşümlerde paydayı çarpanlarına ayır ve kutupları sınıflandır',
    '3. Factor denominators and classify poles in inverse transforms',
    lines(
      f(v('N'),v('D'))+eq+f(v('A'),s+minus+sub(r,one))+plus+f(v('B'),s+minus+sub(r,two))+plus+f(v('C')+s+plus+v('D'),pow(par(s+minus+v('α')),two)+plus+pow(v('β'),two))
    ),
    'Ayrık reel kutuplarda kapatma (cover-up) yöntemi, karmaşık köklerde tam kareye tamamlama uygulanır.',
    'Distinct real poles use cover-up; complex conjugate poles require completion of the square.'
  ),
  step(
    '4. Katlı kuadratik ve rezonant kutuplarda konvolüsyon teoremine başvur',
    '4. Apply convolution theorem for repeated quadratic resonant poles',
    lines(
      Linv+p(F+p(s)+G+p(s))+eq+integral+fn('f',u)+fn('g',t+minus+u)+du
    ),
    'Paydada (s² + ω²)² gibi katlı terimler varken konvolüsyon veya s-türevi cebirsel kesirlerden çok daha hızlıdır.',
    'For repeated factors like (s² + ω²)², convolution or s-differentiation is vastly faster.'
  ),
  step(
    '5. Başlangıç değer problemlerinde ZIR ve ZSR ayrışımı ile çözüme ulaş',
    '5. Conclude IVP solutions via unified ZIR and ZSR decomposition',
    lines(
      y+p(t)+eq+sub(y,v('ZIR'))+p(t)+plus+sub(y,v('ZSR'))+p(t)
    ),
    'Serbest ve zorlanmış yanıtlar tek hamlede elde edilir; aralık sınırlarında dikiş gerekmez.',
    'Free and forced responses emerge unified in a single pass without boundary stitching.'
  )
];

const pathTrapProtocol=[
  step(
    '1. Türev dönüşümündeki eksi işaretlerini ve başlangıç terimlerini denetle',
    '1. Verify negative signs and initial boundary terms in derivative transforms',
    lines(
      L+p(pow(y,prime+prime))+eq+pow(s,two)+Y+p(s)+minus+s+y+p(zero)+minus+pow(y,prime)+p(zero)
    ),
    'y(0) ve y\'(0) önündeki eksi işaretlerinin unutulması sınavların en yaygın hatasıdır.',
    'Dropping the minus signs before y(0) and y\'(0) is the most frequent exam mistake.'
  ),
  step(
    '2. İkinci kaydırma teoreminde argüman uyumunu garantiye al',
    '2. Ensure argument alignment in the second shifting theorem',
    lines(
      fn('g',t)+H+p(t+minus+a)+eq+fn('h',t+minus+a)+H+p(t+minus+a)+o(' , ')+t+eq+par(t+minus+a)+plus+a
    ),
    'Polinomlar mutlaka t = (t - a) + a ile kaydırılarak standart forma getirilmelidir.',
    'Polynomials must be rewritten around t = (t - a) + a before taking the transform.'
  ),
  step(
    '3. Dirac delta darbesinin hızda süreksizlik ürettiğini hatırla',
    '3. Remember Dirac delta impulses create velocity discontinuities',
    lines(
      y+p(a+plus)+minus+y+p(a+minus)+eq+zero+o(' , ')+pow(y,prime)+p(a+plus)+minus+pow(y,prime)+p(a+minus)+eq+I
    ),
    'Darbe anında yer değiştirme süreklidir; sıçrama birinci türevde (hızda) gerçekleşir.',
    'Displacement is continuous at impact; the step jump occurs in the first derivative.'
  ),
  step(
    '4. Periyodik fonksiyon dönüşümlerinde geometrik seri paydasını unutma',
    '4. Include geometric series denominator in periodic function transforms',
    lines(
      L+p(sub(fn('f',t),v('per')))+eq+f(one,one+minus+exp(minus+s+v('T')))+integral+exp(minus+s+t)+fn('f',t)+dt
    ),
    'Tek periyot integrali mutlaka 1 / (1 − e^{-sT}) çarpanı ile bölünmelidir.',
    'The single-period integral must be scaled by 1 / (1 − e^{-sT}).'
  ),
  step(
    '5. Başlangıç ve son değer teoremleri ile çözümü sağla',
    '5. Validate solution via initial and final value theorems',
    lines(
      fn('f',zero)+eq+fn('lim',s+to+infty)+s+F+p(s)+o(' , ')+fn('lim',t+to+infty)+fn('f',t)+eq+fn('lim',s+to+zero)+s+F+p(s)
    ),
    'Limit kontrolleri ters dönüşüm katsayılarının doğruluğunu saniyeler içinde kanıtlar.',
    'Limit checks rapidly verify the consistency of inverse Laplace coefficients.'
  )
];

const clinicProblem1=[
  step(
    '1. Sentez Vaka 1: e^{3t} sin 4t ifadesinde 1. kaydırmayı tespit et (1 puan)',
    '1. Synthesis Case 1: Identify 1st shifting in e^{3t} sin 4t (1 point)',
    lines(
      L+p(exp(three+t)+sin(four+t))+eq+sub(L+p(sin(four+t)),s+to+s+minus+three)
    ),
    'e^{3t} çarpanı frekans ekseninde s → s − 3 kayması üretir.',
    'The factor e^{3t} introduces a frequency translation s → s − 3.'
  ),
  step(
    '2. Temel sinüs dönüşümünü yaz (1 puan)',
    '2. State the elementary sine transform (1 point)',
    lines(
      L+p(sin(four+t))+eq+f(four,pow(s,two)+plus+v('16'))
    ),
    'L{sin 4t} = 4 / (s² + 16) temel çifti tablodan seçilir.',
    'Elementary pair L{sin 4t} = 4 / (s² + 16) is retrieved.'
  ),
  step(
    '3. s yerine s − 3 koyarak dönüşümü tamamla (1 puan)',
    '3. Substitute s − 3 for s to complete the transform (1 point)',
    lines(
      F+p(s)+eq+f(four,pow(par(s+minus+three),two)+plus+v('16'))
    ),
    'F(s) = 4 / [(s − 3)² + 16] kapalı analitik formu elde edilir.',
    'Closed-form transform is F(s) = 4 / [(s − 3)² + 16].'
  ),
  step(
    '4. Paydayı açarak rasyonel polinom formunu yaz (1 puan)',
    '4. Expand the denominator into standard polynomial form (1 point)',
    lines(
      pow(par(s+minus+three),two)+plus+v('16')+eq+pow(s,two)+minus+six+s+plus+v('25')
    ),
    'Payda s² − 6s + 25 olup karmaşık eşlenik kutuplar s = 3 ± 4i verir.',
    'Denominator s² − 6s + 25 reflects complex conjugate poles s = 3 ± 4i.'
  ),
  step(
    '5. Başlangıç değer teoremi ile doğrula (2 puan)',
    '5. Validate via initial value theorem (2 points)',
    lines(
      fn('f',zero)+eq+fn('lim',s+to+infty)+s+F+p(s)+eq+f(four+s,pow(s,two)+minus+six+s+plus+v('25'))+eq+zero
    ),
    's → ∞ iken limit sıfır verir; f(0) = e⁰ sin 0 = 0 ile tam uyumludur.',
    'Limit as s → ∞ yields 0, perfectly matching f(0) = e⁰ sin 0 = 0.'
  )
];

const clinicProblem2=[
  step(
    '1. Sentez Vaka 2: s / (s² + 9)² rezonans kesrini çarpanlara ayır (1 puan)',
    '1. Synthesis Case 2: Factor resonant fraction s / (s² + 9)² (1 point)',
    lines(
      f(s,pow(par(pow(s,two)+plus+nine),two))+eq+f(one,three)+par(f(three,pow(s,two)+plus+nine)+cdot+f(s,pow(s,two)+plus+nine))
    ),
    'Kesir (1/3) L{sin 3t} · L{cos 3t} çarpımı olarak ikiye ayrılır.',
    'Factor as (1/3) L{sin 3t} · L{cos 3t} for convolution.'
  ),
  step(
    '2. Konvolüsyon integralini kur (1 puan)',
    '2. Set up the convolution integral (1 point)',
    lines(
      Linv+p(f(s,pow(par(pow(s,two)+plus+nine),two)))+eq+f(one,three)+integral+sin(three+u)+cos(three+par(t+minus+u))+du
    ),
    'Konvolüsyon teoremi gereği u = 0\'dan t\'ye integrasyon yazılır.',
    'By the convolution theorem, integration spans from 0 to t.'
  ),
  step(
    '3. Trigonometrik çarpımı toplama dönüştür (1 puan)',
    '3. Apply product-to-sum trigonometric identity (1 point)',
    lines(
      sin(three+u)+cos(three+t+minus+three+u)+eq+f(one,two)+par(sin(three+t)+plus+sin(six+u+minus+three+t))
    ),
    '1/2 çarpanı öne alınarak 1/6 katsayısı oluşturulur.',
    'Factoring 1/2 yields a front factor of 1/6.'
  ),
  step(
    '4. u değişkenine göre integrali al (1 puan)',
    '4. Integrate with respect to u (1 point)',
    lines(
      f(one,six)+par(u+sin(three+t)+minus+f(one,six)+cos(six+u+minus+three+t))+sub(o('|'),zero,t)
    ),
    'Sınırlar u = 0 ve u = t konulduğunda kosinüs terimleri sıfırlanır.',
    'Enforcing boundary limits cancels out the cosine terms entirely.'
  ),
  step(
    '5. Rezonans sonucunu doğrula (2 puan)',
    '5. Confirm secular resonance solution (2 points)',
    lines(
      Linv+p(f(s,pow(par(pow(s,two)+plus+nine),two)))+eq+f(one,six)+t+sin(three+t)
    ),
    't sin 3t rezonans terimi doğrulanır; genlik zamanla doğrusal büyür.',
    'The secular resonance response (1/6) t sin 3t is established.'
  )
];

const clinicProblem3=[
  step(
    '1. Sentez Vaka 3: y\'\' + 9y = 18 H(t − π) denkleminin Laplace dönüşümünü al (1 puan)',
    '1. Synthesis Case 3: Transform y\'\' + 9y = 18 H(t − π) (1 point)',
    lines(
      par(pow(s,two)+plus+nine)+Y+p(s)+eq+f(v('18')+exp(minus+pi+s),s)
    ),
    'Sıfır başlangıç koşulları altında sağ taraf 18 e^{-π s} / s olur.',
    'Under zero initial conditions, RHS transforms to 18 e^{-π s} / s.'
  ),
  step(
    '2. Transfer fonksiyonunu basit kesirlere ayır (1 puan)',
    '2. Decompose transfer function into partial fractions (1 point)',
    lines(
      f(v('18'),s+par(pow(s,two)+plus+nine))+eq+f(two,s)+minus+f(two+s,pow(s,two)+plus+nine)
    ),
    'Kapatma yöntemiyle kalıntılar 2/s ve −2s/(s² + 9) olarak bulunur.',
    'Residues evaluate to 2/s and −2s/(s² + 9).'
  ),
  step(
    '3. Gecikmesiz çekirdeğin ters dönüşümünü hesapla (1 puan)',
    '3. Invert undelayed kernel (1 point)',
    lines(
      Linv+p(f(two,s)+minus+f(two+s,pow(s,two)+plus+nine))+eq+two+par(one+minus+cos(three+t))
    ),
    'Temel basamak yanıtı 2(1 − cos 3t) dir.',
    'The basic step response is 2(1 − cos 3t).'
  ),
  step(
    '4. İkinci kaydırma teoremi ile t = π gecikmesini uygula (1 puan)',
    '4. Apply second shifting theorem with delay t = π (1 point)',
    lines(
      y+p(t)+eq+two+par(one+minus+cos(three+par(t+minus+pi)))+H+p(t+minus+pi)
    ),
    'e^{-π s} çarpanı zamanı π kadar öteler.',
    'e^{-π s} translates time by π.'
  ),
  step(
    '5. Faz açısını sadeleştir ve nihai çözümü yaz (1 puan)',
    '5. Simplify phase angle and state final solution (1 point)',
    lines(
      cos(three+t+minus+three+pi)+eq+minus+cos(three+t)+imp+y+p(t)+eq+two+par(one+plus+cos(three+t))+H+p(t+minus+pi)
    ),
    'cos(3t − 3π) = −cos 3t özdeşliği ile çözüm 2(1 + cos 3t) H(t − π) olur.',
    'Using cos(3t − 3π) = −cos 3t yields 2(1 + cos 3t) H(t − π).'
  )
];

const clinicProblem4=[
  step(
    '1. Sentez Vaka 4: Kritik sönümlü darbe denklemini kur (1 puan)',
    '1. Synthesis Case 4: Formulate critically damped impulse equation (1 point)',
    lines(
      par(pow(s,two)+plus+two+s+plus+one)+Y+p(s)+eq+six+exp(minus+three+s)
    ),
    'y\'\' + 2y\' + y = 6 δ(t − 3) denkleminin Laplace dönüşümü alınır.',
    'Take the Laplace transform of y\'\' + 2y\' + y = 6 δ(t − 3).'
  ),
  step(
    '2. Karakteristik paydayı tam kareye tamamla (1 puan)',
    '2. Complete the square for the characteristic denominator (1 point)',
    lines(
      pow(s,two)+plus+two+s+plus+one+eq+pow(par(s+plus+one),two)
    ),
    'Karakteristik kök s = −1 katlı reel köküdür (kritik sönüm).',
    'Repeated real root at s = −1 signifies critical damping.'
  ),
  step(
    '3. Gecikmesiz çekirdeğin ters dönüşümünü al (1 puan)',
    '3. Invert undelayed kernel (1 point)',
    lines(
      Linv+p(f(six,pow(par(s+plus+one),two)))+eq+six+t+exp(minus+t)
    ),
    '1. kaydırma teoremi ve L^-1{1/s²} = t kuralı ile 6t e^{-t} bulunur.',
    'First shifting and L^-1{1/s²} = t yield 6t e^{-t}.'
  ),
  step(
    '4. İkinci kaydırma kuralı ile t = 3 gecikmesini uygula (1 puan)',
    '4. Apply second shifting theorem for delay t = 3 (1 point)',
    lines(
      y+p(t)+eq+six+par(t+minus+three)+exp(minus+par(t+minus+three))+H+p(t+minus+three)
    ),
    't < 3 için sistem durgundur; t ≥ 3 anında darbe tepkisi başlar.',
    'Quiescent for t < 3; impulse response initiates at t = 3.'
  ),
  step(
    '5. Darbe anındaki hız sıçramasını doğrula (1 puan)',
    '5. Verify velocity jump at impact (1 point)',
    lines(
      pow(y,prime)+par(three+plus)+minus+pow(y,prime)+par(three+minus)+eq+six+cdot+one+minus+zero+eq+six
    ),
    'Hız sıçraması tam olarak uygulanan darbe büyüklüğü 6\'ya eşittir.',
    'The velocity step jump exactly equals the applied impulse intensity 6.'
  )
];

export const laplaceSummaryStudySupport={
  paths:[
    {
      id:'method-nav',
      title:T('Doğru Laplace Yöntemini Seçme Algoritması','Optimal Laplace Method Selection Algorithm'),
      prompt:T(
        'Frekans dönüşümü, ters dönüşüm ve diferansiyel denklemlerde en hızlı çözüm yolunu seçme adımları.',
        'Selecting the most efficient solution route across forward, inverse, and IVP Laplace problems.'
      ),
      summary:T(
        'Frekans dönüşümü, ters dönüşüm ve diferansiyel denklemlerde en hızlı çözüm yolunu seçme adımları.',
        'Selecting the most efficient solution route across forward, inverse, and IVP Laplace problems.'
      ),
      reflection:T(
        'Katlı kökler, basamak zorlamaları ve darbe fonksiyonları karşısında hangi teorem kombinasyonunu ne zaman devreye sokarsın?',
        'When dealing with repeated poles, step forcing, and impulse functions, how do you determine which combination of theorems to deploy?'
      ),
      steps:pathMethodNav
    },
    {
      id:'trap-protocol',
      title:T('Sınav Tuzakları ve Doğrulama Protokolü','Exam Traps and Verification Protocol'),
      prompt:T(
        'Başlangıç koşulu işaretleri, 2. kaydırma argüman uyumu ve periyodik teorem denetimleri.',
        'Initial condition sign verification, 2nd shifting argument alignment, and periodic theorem checks.'
      ),
      summary:T(
        'Başlangıç koşulu işaretleri, 2. kaydırma argüman uyumu ve periyodik teorem denetimleri.',
        'Initial condition sign verification, 2nd shifting argument alignment, and periodic theorem checks.'
      ),
      reflection:T(
        'Başlangıç ve son değer teoremlerini sınavda bir ters dönüşümün doğruluğunu test etmek için nasıl kullanırsın?',
        'How do you utilize the initial and final value theorems to quickly verify an inverse Laplace result in exams?'
      ),
      steps:pathTrapProtocol
    }
  ],
  predictions:[
    {
      id:'repeated-pole-speed',
      question:T(
        'Ters Laplace dönüşümünde s / (s² + ω²)² şeklinde katlı kuadratik bir payda görüldüğünde en hızlı analitik çözüm yolu nedir?',
        'When facing a repeated quadratic denominator s / (s² + ω²)² in inverse Laplace, what is the fastest analytical solution path?'
      ),
      context:T(
        'Paydada tam kare kuadratik terim bulunduğunda klasik kesirlere ayırma 4 bilinmeyenli denklem sistemi gerektirir.',
        'When the denominator contains repeated quadratic terms, partial fractions require a 4-variable linear system.'
      ),
      choices:T(
        [
          'Konvolüsyon integrali veya frekans türevi kuralı; cebirsel kesir açılımına gerek bırakmadan t sin ωt rezonans formülünü verir',
          'Dört bilinmeyenli karmaşık cebirsel katsayı eşitlemesi yapmak',
          'İfadeyi sonsuz seriye açıp terim terim integrallemek'
        ],
        [
          'Convolution integral or frequency differentiation rule; yields the t sin ωt resonance formula directly without partial fraction expansions',
          'Equating 4 unknown complex algebraic coefficients',
          'Expanding into an infinite power series and integrating term by term'
        ]
      ),
      answer:0,
      reason:T(
        'Doğru! (1/ω) sin ωt ile cos ωt konvolüsyonu veya L{t sin ωt} s-türevi bağıntısı, paydadaki katlı kuadratik terimi saniyeler içinde çözüme kavuşturur.',
        'Correct! Convolving (1/ω) sin ωt with cos ωt or differentiating L{t sin ωt} resolves repeated quadratic poles in seconds.'
      ),
      math:'<mi mathvariant="script">L</mi><mo>{</mo><mi>t</mi><mi>sin</mi><mi>ω</mi><mi>t</mi><mo>}</mo><mo>=</mo><mo>−</mo><mfrac><mi>d</mi><mrow><mi>d</mi><mi>s</mi></mrow></mfrac><mrow><mo>[</mo><mfrac><mi>ω</mi><mrow><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup></mrow></mfrac><mo>]</mo></mrow><mo>=</mo><mfrac><mrow><mn>2</mn><mi>ω</mi><mi>s</mi></mrow><msup><mrow><mo>(</mo><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup><mo>)</mo></mrow><mn>2</mn></msup></mfrac>',
      try:T(
        'Aşağıdaki Karar Matrisinde Kart 5 ve Konvolüsyon bölümünü incele.',
        'Inspect Card 5 and the Convolution section in the Decision Matrix below.'
      )
    },
    {
      id:'laplace-stitching-elimination',
      question:T(
        'Parçalı sürekli ve basamaklı zorlamalar içeren bir başlangıç değer probleminde, Laplace yönteminin klasik kalkülüse kıyasla en büyük pedagojik ve teknik üstünlüğü nedir?',
        'In an IVP with piecewise continuous step forcing, what is the core advantage of the Laplace transform over classical calculus?'
      ),
      context:T(
        'Klasik kalkülüs her zaman aralığında ayrı keyfi sabitler (c₁, c₂) üretir ve süreklilik dikişi gerektirir.',
        'Classical calculus produces separate arbitrary constants (c₁, c₂) in each interval, requiring continuity stitching.'
      ),
      choices:T(
        [
          'Zaman aralıklarını (t < a ve t ≥ a) ayrı ayrı çözüp geçiş noktasında süreklilik dikişi (stitching) yapma zorunluluğunu ortadan kaldırması',
          'Diferansiyel denklemin derecesini yarıya indirmesi',
          'Tüm çözümleri daima trigonometrik fonksiyonlara dönüştürmesi'
        ],
        [
          'Eliminating the need to solve separate time domains (t < a and t ≥ a) and perform boundary continuity stitching',
          'Halving the differential order of the equation',
          'Permanently converting all solutions into trigonometric functions'
        ]
      ),
      answer:0,
      reason:T(
        'Doğru! Klasik yöntemde her parçalı bölge için yeni keyfi sabitler bulunup konum ve hız sürekliliği eşitlenirken, Laplace yöntemi Heaviside basamağı H(t - a) ile tüm zamanı tek bir cebirsel formülde çözer.',
        'Correct! Classical methods require solving separate piecewise intervals and matching position and velocity at boundaries; Laplace unifies the entire timeline into a single closed form via H(t - a).'
      ),
      math:'<mi>y</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msub><mi>y</mi><mrow><mi>Z</mi><mi>I</mi><mi>R</mi></mrow></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>+</mo><msub><mi>y</mi><mi>p</mi></msub><mo>(</mo><mi>t</mi><mo>−</mo><mi>a</mi><mo>)</mo><mi>H</mi><mo>(</mo><mi>t</mi><mo>−</mo><mi>a</mi><mo>)</mo>',
      try:T(
        'Aşağıdaki Karar Matrisinde Kart 4 (Parçalı Fonksiyonlar) kartını aç.',
        'Open Card 4 (Piecewise Forcing) in the Decision Matrix below.'
      )
    }
  ]
};

export const laplaceSummaryExamClinic=[
  {
    badge:T('6 PUAN · SENTEZ VAKA 1','6 POINTS · SYNTHESIS CASE 1'),
    statement:{
      tr:'ℒ{e^{3t} sin 4t} Laplace dönüşümünü 1. kaydırma teoremi ile bulunuz ve başlangıç değer teoremi ile doğrulayınız.',
      en:'Evaluate ℒ{e^{3t} sin 4t} via the 1st shifting theorem and validate using the initial value theorem.'
    },
    trap:{
      tr:'Tuzak: e^{3t} çarpanını dönüştürürken kaydırma işaretini s + 3 sanmak! e^{at} çarpanı frekansta s − a üretir.',
      en:'Trap: Confusing the shift sign as s + 3! The factor e^{at} yields a frequency shift s − a.'
    },
    steps:clinicProblem1
  },
  {
    badge:T('6 PUAN · SENTEZ VAKA 2','6 POINTS · SYNTHESIS CASE 2'),
    statement:{
      tr:'ℒ⁻¹{s / (s² + 9)²} katlı kuadratik kesrinin ters dönüşümünü konvolüsyon integrali teoremini kullanarak çözünüz.',
      en:'Invert ℒ⁻¹{s / (s² + 9)²} step by step using the Convolution Integral Theorem.'
    },
    trap:{
      tr:'Tuzak: Trigonometrik çarpımı toplama dönüştürürken 1/2 çarpanını ve integral sınırlarını kaçırmak!',
      en:'Trap: Forgetting the factor of 1/2 when applying the product-to-sum identity!'
    },
    steps:clinicProblem2
  },
  {
    badge:T('5 PUAN · SENTEZ VAKA 3','5 POINTS · SYNTHESIS CASE 3'),
    statement:{
      tr:'y\'\' + 9y = 18 H(t − π) başlangıç değer problemini y(0) = 0, y\'(0) = 0 için 2. kaydırma teoremi ile çözünüz.',
      en:'Solve the IVP y\'\' + 9y = 18 H(t − π) with y(0) = 0, y\'(0) = 0 using the 2nd shifting theorem.'
    },
    trap:{
      tr:'Tuzak: cos(3(t − π)) teriminde faz açısını yanlış açmak! cos(3t − 3π) = −cos 3t dir.',
      en:'Trap: Mishandling the phase angle! cos(3t − 3π) = −cos 3t flips the sign.'
    },
    steps:clinicProblem3
  },
  {
    badge:T('5 PUAN · SENTEZ VAKA 4','5 POINTS · SYNTHESIS CASE 4'),
    statement:{
      tr:'y\'\' + 2y\' + y = 6 δ(t − 3) başlangıçta durgun sistemin Dirac darbe tepkisini ve hız sıçramasını bulunuz.',
      en:'Find the Dirac impulse response and velocity jump for an initially quiescent system y\'\' + 2y\' + y = 6 δ(t − 3).'
    },
    trap:{
      tr:'Tuzak: Kritik sönümde katlı kökü (s + 1)² yerine basit kök sanmak! Ters dönüşüm t e^{-t} biçimindedir.',
      en:'Trap: Treating (s + 1)² as distinct roots! Critical damping yields the secular kernel t e^{-t}.'
    },
    steps:clinicProblem4
  }
];
