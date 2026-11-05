import {T,step,v,n,o,p,f,pow,sub,prime,eq,plus,minus,x,y,t,C,fn,exp,integral,lines} from '../../../study/math.js';

const r=s=>`<mrow>${s}</mrow>`;
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6),seven=n(7),eight=n(8),nine=n(9),ten=n(10),twelve=n(12),fourteen=n(14),eighteen=n(18),twentyfive=n(25),forty=n(40);
const s=v('s'),w=v('ω'),a=v('a'),b=v('b'),c=v('c'),k=v('k'),u=v('u'),F=v('F'),G=v('G'),L=v('ℒ'),H=v('H'),Y=v('Y'),I=v('I'),delta=v('δ');
const dt=v('d')+t,du=v('d')+u,ds=v('d')+s;
const infty=v('∞');
const sin=arg=>fn('sin',arg),cos=arg=>fn('cos',arg),par=arg=>p(arg);
const imp=o('⇒'),cdot=o('·'),gt=o('>'),to=o('→'),neq=o('≠'),ast=o('∗');
const Linv=pow(L,minus+one);

const pathOdeTransform=[
  step(
    '1. Türevlerin Laplace dönüşüm formüllerini yaz',
    '1. State the transform formulas for derivatives',
    lines(
      L+p(pow(y,prime))+eq+s+Y+p(s)+minus+y+p(zero)+o(' , ')+L+p(pow(y,prime+prime))+eq+pow(s,two)+Y+p(s)+minus+s+y+p(zero)+minus+pow(y,prime)+p(zero)
    ),
    'Türevlerin dönüşümü, başlangıç koşullarını doğrudan cebirsel terimler olarak denkleme dahil eder.',
    'Derivative transforms incorporate initial conditions directly as algebraic terms.'
  ),
  step(
    '2. Diferansiyel denklemin her iki tarafının Laplace dönüşümünü al',
    '2. Take the Laplace transform of both sides of the ODE',
    lines(
      p(pow(s,two)+plus+v('a')+s+plus+v('b'))+Y+p(s)+minus+p(s+plus+v('a'))+y+p(zero)+minus+pow(y,prime)+p(zero)+eq+F+p(s)
    ),
    'Doğrusal diferansiyel denklem, s değişkenine bağlı doğrusal bir cebirsel denkleme dönüşür.',
    'The linear differential equation is converted into a linear algebraic equation in s.'
  ),
  step(
    '3. Başlangıç koşullarını topla ve Y(s) ifadesini yalnız bırak',
    '3. Collect initial conditions and isolate Y(s)',
    lines(
      Y+p(s)+eq+f(p(s+plus+v('a'))+y+p(zero)+plus+pow(y,prime)+p(zero),pow(s,two)+plus+v('a')+s+plus+v('b'))+plus+f(F+p(s),pow(s,two)+plus+v('a')+s+plus+v('b'))
    ),
    'Çözüm iki bağımsız parçaya ayrılır: Serbest yanıt (ZIR, sıfır-girdi) ve Zorlanmış yanıt (ZSR, sıfır-durum).',
    'The solution splits into two components: Zero-Input Response (ZIR) and Zero-State Response (ZSR).'
  ),
  step(
    '4. Rasyonel fonksiyonları kısmi kesirlere ve s-kaydırmalarına ayır',
    '4. Decompose rational expressions into partial fractions and shifts',
    lines(
      f(v('Q')+p(s),v('P')+p(s))+eq+v('A')+f(one,s+minus+sub(v('s'),one))+plus+f(v('B')+s+plus+v('C'),pow(par(s+minus+v('α')),two)+plus+pow(v('β'),two))
    ),
    'Karakteristik polinomun köklerine göre basit kesir veya tam kareye tamamlama adımları işletilir.',
    'Partial fractions or completion of the square resolve the expression into canonical table forms.'
  ),
  step(
    '5. Ters Laplace dönüşümünü terim terim uygulayarak y(t) çözümünü bul',
    '5. Apply the inverse Laplace transform term-by-term for y(t)',
    lines(
      y+p(t)+eq+Linv+p(Y+p(s))+eq+sub(y,v('serbest'))+p(t)+plus+sub(y,v('zorlanmış'))+p(t)
    ),
    'Homojen çözüm ile özel çözüm otomatik olarak birleşik ve başlangıç koşullarını sağlayan tek bir formda elde edilir.',
    'Homogeneous and particular solutions are united into the unique IVP trajectory satisfying initial data.'
  )
];

const pathPiecewiseShift=[
  step(
    '1. Parçalı zorlama fonksiyonunu Heaviside basamakları ile ifade et',
    '1. Express piecewise forcing via Heaviside step functions',
    lines(
      fn('f',t)+eq+sub(fn('f',t),one)+plus+par(sub(fn('f',t),two)+minus+sub(fn('f',t),one))+H+p(t+minus+a)
    ),
    'Aralık değiştirme anlarında fonksiyonlar basamak farkları ile birbirine bağlanır.',
    'Piecewise boundaries are represented compactly as differences scaled by H(t - a).'
  ),
  step(
    '2. Basamak çarpanlarını standart (t − a) kaymasına dönüştür',
    '2. Shift factor arguments into canonical (t − a) form',
    lines(
      fn('g',t)+H+p(t+minus+a)+eq+fn('h',t+minus+a)+H+p(t+minus+a)
    ),
    'İkinci kaydırma teoremine hazırlık olarak polinomlar t = (t - a) + a açılımı ile yeniden yazılır.',
    'Polynomials are expanded around t = (t - a) + a to prepare for the second shifting theorem.'
  ),
  step(
    '3. İkinci kaydırma teoremini s-bölgesinde uygula',
    '3. Apply the second shifting theorem in the s-domain',
    lines(
      L+p(fn('h',t+minus+a)+H+p(t+minus+a))+eq+exp(minus+a+s)+L+p(fn('h',t))
    ),
    'Zaman gecikmesi s-bölgesinde üssel sönümleme çarpanı e^{-as} olarak kendini gösterir.',
    'Time delay translates into an exponential factor e^{-as} in the s-domain.'
  ),
  step(
    '4. Gecikmeli terimleri ayırarak ters Laplace dönüşümünü planla',
    '4. Isolate delayed terms and plan the inverse Laplace transform',
    lines(
      Linv+p(exp(minus+a+s)+F+p(s))+eq+fn('f',t+minus+a)+H+p(t+minus+a)
    ),
    'Önce e^{-as} çarpanı hariç F(s) fonksiyonunun tersi f(t) bulunur.',
    'First find f(t) = L^-1{F(s)} omitting the exponential delay factor.'
  ),
  step(
    '5. Argümanı (t − a) ile kaydırarak basamak anahtarını ekle',
    '5. Shift the argument by (t − a) and engage the step switch',
    lines(
      y+p(t)+eq+fn('w',t)+plus+fn('w',t+minus+a)+H+p(t+minus+a)
    ),
    't < a iken ek terim sıfırdır; t ≥ a olduğunda devreye girerek yumuşak veya sıçramalı geçişi sağlar.',
    'For t < a the term vanishes; for t ≥ a it switches on to govern the shifted response.'
  )
];

const clinicProblem1=[
  step(
    '1. Örnek 6.16: Diferansiyel denklemin Laplace dönüşümünü al (1 puan)',
    '1. Example 6.16: Take the Laplace transform of the ODE (1 point)',
    lines(
      par(pow(s,two)+Y+minus+s+y+p(zero)+minus+pow(y,prime)+p(zero))+minus+eight+par(s+Y+minus+y+p(zero))+plus+twentyfive+Y+eq+f(three,pow(par(s+minus+four),two)+plus+nine)
    ),
    'L{y\'\' - 8y\' + 25y} = L{e^{4t} sin 3t} bağıntısı başlangıç koşullarıyla birlikte kurulur.',
    'Apply the derivative transform rules with initial conditions y(0) = 1, y\'(0) = 4.'
  ),
  step(
    '2. Başlangıç koşullarını yerleştir ve payı düzenle (1 puan)',
    '2. Substitute initial conditions and simplify the numerator (1 point)',
    lines(
      par(pow(s,two)+minus+eight+s+plus+twentyfive)+Y+minus+par(s+cdot+one+plus+four+minus+eight+cdot+one)+eq+f(three,pow(par(s+minus+four),two)+plus+nine)
    ),
    '-(s + 4 - 8) = -(s - 4) terimi eşitliğin sağ tarafına +(s - 4) olarak geçer.',
    'The initial condition polynomial -(s - 4) moves to the right-hand side as +(s - 4).'
  ),
  step(
    '3. Karakteristik paydayı tam kareye tamamla (1 puan)',
    '3. Complete the square for the characteristic polynomial (1 point)',
    lines(
      pow(s,two)+minus+eight+s+plus+twentyfive+eq+pow(par(s+minus+four),two)+plus+nine
    ),
    's^2 - 8s + 25 = (s - 4)^2 + 3^2 olup doğal frekans ω = 3 ve sönümleme/büyüme sabiti a = 4\'tür.',
    'Denominator is (s - 4)^2 + 3^2, identifying a = 4 and frequency ω = 3.'
  ),
  step(
    '4. Y(s) ifadesini serbest ve rezonant parçalara ayır (1 puan)',
    '4. Split Y(s) into free and resonant components (1 point)',
    lines(
      Y+p(s)+eq+f(s+minus+four,pow(par(s+minus+four),two)+plus+nine)+plus+f(three,pow(par(pow(par(s+minus+four),two)+plus+nine),two))
    ),
    'İlk terim serbest salınım (ZIR), ikinci terim katlı kuadratik rezonans (ZSR) üretir.',
    'The first term yields the free vibration; the second term gives the resonant forced response.'
  ),
  step(
    '5. Ters dönüşümü 1. kaydırma ile tamamla (2 puan)',
    '5. Apply the first shifting theorem to obtain y(t) (2 points)',
    lines(
      y+p(t)+eq+exp(four+t)+cos(three+t)+plus+f(one,eighteen)+exp(four+t)+par(sin(three+t)+minus+three+t+cos(three+t))
    ),
    'Rezonans teriminde t çarpanı doğar ve nihai çözüm e^{4t} büyüme zarfı altında rezonans gösterir.',
    'The secular growth term t cos 3t reflects resonance, envelope-scaled by e^{4t}.'
  )
];

const clinicProblem2=[
  step(
    '1. Örnek 6.18: Gecikmeli polinomu (t − 2) tabanına aç (1 puan)',
    '1. Example 6.18: Expand the delayed polynomial in terms of (t − 2) (1 point)',
    lines(
      forty+par(pow(t,two)+plus+t+plus+one)+H+p(t+minus+two)+eq+forty+par(pow(par(t+minus+two),two)+plus+five+par(t+minus+two)+plus+seven)+H+p(t+minus+two)
    ),
    't = (t - 2) + 2 konarak t^2 + t + 1 = (t - 2)^2 + 5(t - 2) + 7 olarak Taylor açılımı yapılır.',
    'Substituting t = (t - 2) + 2 yields the canonical polynomial in powers of (t - 2).'
  ),
  step(
    '2. 2. kaydırma teoremi ile sağ tarafın Laplace dönüşümünü al (1 puan)',
    '2. Apply the second shifting theorem to transform the RHS (1 point)',
    lines(
      L+p(forty+par(pow(t,two)+plus+t+plus+one)+H+p(t+minus+two))+eq+forty+exp(minus+two+s)+par(f(two,pow(s,three))+plus+f(five,pow(s,two))+plus+f(seven,s))
    ),
    'Her kuvvet teriminin dönüşümü e^{-2s} çarpanı ile birleşir.',
    'Each power term is transformed and multiplied by e^{-2s}.'
  ),
  step(
    '3. Karakteristik denklemi çarpanlarına ayır (1 puan)',
    '3. Factor the characteristic polynomial (1 point)',
    lines(
      pow(s,three)+minus+pow(s,two)+plus+four+s+minus+four+eq+par(s+minus+one)+par(pow(s,two)+plus+four)
    ),
    'Kökler s = 1 ve s = ±2i olarak belirlenir.',
    'Poles are located at s = 1 and s = ±2i.'
  ),
  step(
    '4. Serbest yanıtı başlangıç koşullarından hesapla (1 puan)',
    '4. Evaluate the free response from initial data (1 point)',
    lines(
      sub(y,v('serbest'))+p(t)+eq+six+exp(t)+minus+cos(two+t)+minus+three+sin(two+t)
    ),
    'y(0) = 5, y\'(0) = 0, y\'\'(0) = 10 başlangıç verileri serbest katsayıları benzersizce belirler.',
    'Initial conditions fix the free solution: 6 e^t - cos 2t - 3 sin 2t.'
  ),
  step(
    '5. Zorlanmış yanıtı birleştirerek tam çözümü kur (2 puan)',
    '5. Combine with the forced response for the complete solution (2 points)',
    lines(
      y+p(t)+eq+sub(y,v('serbest'))+p(t)+plus+par(minus+ten+pow(par(t+minus+two),two)+minus+v('70')+par(t+minus+two)+minus+v('135')+plus+v('112')+exp(t+minus+two)+plus+v('23')+cos(two+par(t+minus+two))+minus+v('21')+sin(two+par(t+minus+two)))+H+p(t+minus+two)
    ),
    't ≥ 2 için devreye giren parça, türev sürekliliğini koruyarak genel çözümü tamamlar.',
    'The forced piece activates at t ≥ 2, completing the continuous IVP trajectory.'
  )
];

const clinicProblem3=[
  step(
    '1. Basamak zorlamalı denklemin Laplace dönüşümünü yaz (1 puan)',
    '1. Transform the step-forced differential equation (1 point)',
    lines(
      par(pow(s,two)+plus+four)+Y+p(s)+minus+s+sub(y,zero)+eq+f(eight+exp(minus+a+s),s)
    ),
    'y\'\' + 4y = 8 H(t - a) denkleminin dönüşümünde sağ taraf 8 e^{-as}/s olur.',
    'The step forcing converts into 8 e^{-as}/s on the right-hand side.'
  ),
  step(
    '2. Y(s) ifadesini ZIR ve ZSR olarak düzenle (1 puan)',
    '2. Express Y(s) in ZIR and ZSR components (1 point)',
    lines(
      Y+p(s)+eq+sub(y,zero)+f(s,pow(s,two)+plus+four)+plus+exp(minus+a+s)+f(eight,s+par(pow(s,two)+plus+four))
    ),
    'Başlangıç konumu serbest kosinüs salınımı üretirken basamak zorlaması gecikmeli transfer fonksiyonuna gider.',
    'Zero-input generates cosine oscillation; zero-state carries the delayed step response.'
  ),
  step(
    '3. Basamak transfer fonksiyonunu basit kesirlere ayır (1 puan)',
    '3. Decompose the step transfer function into partial fractions (1 point)',
    lines(
      f(eight,s+par(pow(s,two)+plus+four))+eq+f(two,s)+minus+f(two+s,pow(s,two)+plus+four)
    ),
    'Kapatma yöntemiyle s = 0 için katsayı 8/4 = 2, kuadratik pay ise -2s bulunur.',
    'Residues evaluate to 2/s and -2s/(s^2 + 4).'
  ),
  step(
    '4. Gecikmesiz çekirdeğin ters dönüşümünü al (1 puan)',
    '4. Invert the undelayed transform kernel (1 point)',
    lines(
      Linv+p(f(two,s)+minus+f(two+s,pow(s,two)+plus+four))+eq+two+par(one+minus+cos(two+t))
    ),
    'Gecikmesiz basamak yanıtı 2(1 - cos 2t) olarak elde edilir.',
    'The basic step response is 2(1 - cos 2t).'
  ),
  step(
    '5. 2. kaydırma teoremi ile tam çözümü yaz (1 puan)',
    '5. State the complete solution using the 2nd shifting theorem (1 point)',
    lines(
      y+p(t)+eq+sub(y,zero)+cos(two+t)+plus+two+par(one+minus+cos(two+par(t+minus+a)))+H+p(t+minus+a)
    ),
    't < a iken sadece serbest titreşim, t ≥ a iken ise basamak zorlamalı salınım eklenir.',
    'For t < a only free oscillation exists; at t ≥ a the forced step motion begins seamlessly.'
  )
];

const clinicProblem4=[
  step(
    '1. Dirac darbeli osilatörün Laplace dönüşümünü kur (1 puan)',
    '1. Transform the impulse-excited oscillator (1 point)',
    lines(
      par(pow(s,two)+plus+pow(w,two))+Y+p(s)+eq+I+exp(minus+a+s)
    ),
    'Durgun halden başlayan osilatöre uygulanan I δ(t - a) darbesi sağ tarafta I e^{-as} üretir.',
    'Zero initial data and the impulse I δ(t - a) yield I e^{-as} in the s-domain.'
  ),
  step(
    '2. Çıkış transfer fonksiyonunu yalnız bırak (1 puan)',
    '2. Isolate the output transfer function (1 point)',
    lines(
      Y+p(s)+eq+f(I,w)+exp(minus+a+s)+f(w,pow(s,two)+plus+pow(w,two))
    ),
    'Payda doğrudan harmonik osilatör transfer fonksiyonudur.',
    'The rational fraction matches the standard harmonic sine transform.'
  ),
  step(
    '3. Gecikmesiz darbe tepkisini (Green fonksiyonunu) belirle (1 puan)',
    '3. Identify the impulse response (Green function) (1 point)',
    lines(
      fn('h',t)+eq+Linv+p(f(w,pow(s,two)+plus+pow(w,two)))+eq+sin(w+t)
    ),
    'Sistemin birim darbe yanıtı (1/ω) sin ωt olarak bulunur.',
    'The fundamental impulse response kernel is (1/ω) sin ωt.'
  ),
  step(
    '4. İkinci kaydırma teoremi ile zaman yanıtını yaz (1 puan)',
    '4. Apply the second shifting theorem to obtain the time response (1 point)',
    lines(
      y+p(t)+eq+f(I,w)+sin(w+par(t+minus+a))+H+p(t+minus+a)
    ),
    'Darbe anı t = a\'ya kadar konum ve hız tamamen sıfırdır.',
    'Displacement and velocity remain strictly zero until impact time t = a.'
  ),
  step(
    '5. Darbe anındaki hız süreksizliğini (sıçramayı) doğrula (1 puan)',
    '5. Verify the jump discontinuity in velocity at t = a (1 point)',
    lines(
      pow(y,prime)+par(a+plus)+minus+pow(y,prime)+par(a+minus)+eq+I+cdot+cos(zero)+minus+zero+eq+I
    ),
    'İtki-momentum ilkesi gereği hız aniden I kadar sıçrar; konum ise sürekliliğini korur.',
    'By the impulse-momentum principle, velocity jumps by I while displacement remains C^0 continuous.'
  )
];

export const laplaceOdeStudySupport={
  paths:[
    {
      id:'ode-transform',
      title:T('Türevlerin Laplace Dönüşümü ve Başlangıç Koşulları','Transform of Derivatives and Initial Conditions'),
      prompt:T(
        'Türev özelliklerini kullanarak diferansiyel denklemi s-bölgesinde cebirsel denkleme çevirme ve ZIR/ZSR ayrışımı.',
        'Converting differential equations to algebraic form in s via derivative rules, separating into ZIR and ZSR.'
      ),
      summary:T(
        'Türev özelliklerini kullanarak diferansiyel denklemi s-bölgesinde cebirsel denkleme çevirme ve ZIR/ZSR ayrışımı.',
        'Converting differential equations to algebraic form in s via derivative rules, separating into ZIR and ZSR.'
      ),
      reflection:T(
        'Başlangıç koşullarının ürettiği ZIR ile dış zorlamanın ürettiği ZSR arasındaki bağımsız süperpozisyonu kendi cümlelerinle nasıl açıklarsın?',
        'How would you describe the independent superposition of ZIR (from initial conditions) and ZSR (from external forcing) in your own words?'
      ),
      steps:pathOdeTransform
    },
    {
      id:'piecewise-shift',
      title:T('Süreksiz ve Gecikmeli Zorlamaların Çözüm Yolu','Solving Discontinuous and Delayed Forcing'),
      prompt:T(
        'Parçalı ve basamaklı zorlamaların Taylor/binom ötelemesi ile 2. kaydırma teoremine uyarlanması ve ters dönüşümü.',
        'Adapting piecewise forcing to the 2nd shifting theorem via Taylor shifting and inverse transformation.'
      ),
      summary:T(
        'Parçalı ve basamaklı zorlamaların Taylor/binom ötelemesi ile 2. kaydırma teoremine uyarlanması ve ters dönüşümü.',
        'Adapting piecewise forcing to the 2nd shifting theorem via Taylor shifting and inverse transformation.'
      ),
      reflection:T(
        'Gecikmeli polinom zorlamalarını (t - a) tabanına kaydırmanın 2. kaydırma teoremindeki hayati rolü nedir?',
        'What is the vital role of shifting delayed polynomials into the (t - a) basis for the 2nd shifting theorem?'
      ),
      steps:pathPiecewiseShift
    }
  ],
  predictions:[
    {
      id:'zir-zsr-split',
      question:T(
        'Gecikmeli basamak zorlaması H(t − a) içeren bir başlangıç değer probleminde, t < a aralığındaki hareketi kim belirler?',
        'In an IVP with delayed step forcing H(t − a), who governs the motion in the interval t < a?'
      ),
      context:T(
        'Heaviside basamağı t < a için sıfırdır; sağ taraf zorlaması t = a anına kadar sisteme enerji aktarmaz.',
        'The unit step H(t-a) is zero for t < a; forcing injects zero energy until t = a.'
      ),
      choices:T(
        [
          'Tamamen y(0) ve y\'(0) başlangıç koşullarının ürettiği serbest yanıt (ZIR)',
          'Sistem t < a boyunca zorlamayı bekler ve tamamen hareketsiz kalır',
          'Zorlama fonksiyonu t = 0 anında ani bir yer değiştirme sıçraması üretir'
        ],
        [
          'Entirely the zero-input response (ZIR) from initial data y(0) and y\'(0)',
          'The system waits for forcing and stays completely at rest for t < a',
          'The forcing instantaneously creates a displacement jump at t = 0'
        ]
      ),
      answer:0,
      reason:T(
        'Doğru! Heaviside fonksiyonu H(t - a) zaman t < a iken sıfırdır. Bu nedenle sistem t = a anına kadar yalnızca başlangıç enerjisinin yarattığı serbest titreşimi (ZIR) yaşar.',
        'Correct! Because H(t - a) = 0 for t < a, the oscillator executes pure free vibration (ZIR) dictated solely by initial conditions until t = a.'
      ),
      math:'<mi>y</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msub><mi>y</mi><mi>h</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>+</mo><msub><mi>y</mi><mi>p</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo><mi>H</mi><mo>(</mo><mi>t</mi><mo>−</mo><mi>a</mi><mo>)</mo>',
      try:T(
        'Aşağıdaki laboratuvarda Parçalı Basamak önayarını seçerek t < a aralığında serbest salınımı incele.',
        'In the lab below, select the Piecewise Step preset and observe the free oscillation for t < a.'
      )
    },
    {
      id:'resonance-poles',
      question:T(
        'Dış zorlama frekansı sistemin doğal frekansıyla tam çakıştığında (rezonans) s-bölgesi kutupları nasıl bir özellik gösterir?',
        'When the external forcing frequency matches the system natural frequency (resonance), what happens to the poles in the s-domain?'
      ),
      context:T(
        'Doğal frekans ω ile zorlama frekansı eşitlendiğinde paydada s² + ω² çarpanının kuvvetine dikkat et.',
        'When the natural frequency matches the forcing frequency, inspect the power of s² + ω² in the denominator.'
      ),
      choices:T(
        [
          'Y(s) paydasında katlı karmaşık kutuplar (s² + ω₀²)² oluşur ve ters dönüşümde t sin ω₀t şeklinde doğrusal büyüyen rezonans genliği doğar',
          'Kutuplar reel eksene kayarak üstel sönüme dönüşür',
          'Sistemin transfer fonksiyonu sıfırlanır ve hareket tamamen söner'
        ],
        [
          'Repeated imaginary poles (s² + ω₀²)² appear in Y(s), producing secular linear growth t sin ω₀t in the time domain',
          'Poles shift to the real axis, converting oscillation into pure exponential decay',
          'The transfer function drops to zero and motion ceases'
        ]
      ),
      answer:0,
      reason:T(
        'Doğru! Örnek 6.16 ve 6.18\'de görüldüğü gibi paydadaki katlı kutup (s^2 + ω^2)^2 zaman bölgesinde t ile çarpılan terimler doğurur; bu da fiziksel rezonansın s-bölgesindeki matematiksel karşılığıdır.',
        'Correct! As seen in Examples 6.16 & 6.18, repeated poles (s^2 + ω^2)^2 yield terms multiplied by t, which is the exact mathematical signature of physical resonance.'
      ),
      math:'<msup><mi mathvariant="script">L</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mo>{</mo><mfrac><mi>s</mi><msup><mrow><mo>(</mo><msup><mi>s</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup><mo>)</mo></mrow><mn>2</mn></msup></mfrac><mo>}</mo><mo>=</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>ω</mi></mrow></mfrac><mi>t</mi><mi>sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo>',
      try:T(
        'Aşağıdaki laboratuvarda Saf Rezonans önayarını seçerek genliğin t ile doğrusal büyümesini gözlemle.',
        'In the lab below, select the Pure Resonance preset and watch the amplitude grow linearly with t.'
      )
    }
  ]
};

export const laplaceOdeExamClinic=[
  {
    badge:T('6 PUAN · ÖRNEK 6.16','6 POINTS · EXAMPLE 6.16'),
    statement:{
      tr:'y\'\' − 8y\' + 25y = e^{4t} sin 3t diferansiyel denklemini y(0) = 1, y\'(0) = 4 başlangıç koşulları altında Laplace dönüşümü ile çözünüz.',
      en:'Solve the IVP y\'\' − 8y\' + 25y = e^{4t} sin 3t with y(0) = 1, y\'(0) = 4 using the Laplace transform.'
    },
    trap:{
      tr:'Tuzak: Paydadaki s² − 8s + 25 polinomunun köklerini reel sanıp yanlış kesirlere ayırmak! (s − 4)² + 9 tam karedir ve rezonans üretir.',
      en:'Trap: Mistaking s² − 8s + 25 for real factors! It completes to (s − 4)² + 9, perfectly resonant with the RHS forcing.'
    },
    steps:clinicProblem1
  },
  {
    badge:T('6 PUAN · ÖRNEK 6.18','6 POINTS · EXAMPLE 6.18'),
    statement:{
      tr:'y\'\'\' − y\'\' + 4y\' − 4y = 40(t² + t + 1)H(t − 2) üçüncü mertebeden IVP problemini y(0)=5, y\'(0)=0, y\'\'(0)=10 için çözünüz.',
      en:'Solve the 3rd-order IVP y\'\'\' − y\'\' + 4y\' − 4y = 40(t² + t + 1)H(t − 2) with y(0)=5, y\'(0)=0, y\'\'(0)=10.'
    },
    trap:{
      tr:'Tuzak: t² + t + 1 polinomunu (t − 2) tabanına kaydırmadan doğrudan Laplace almaya kalkmak! 2. kaydırma teoremi f(t − 2)H(t − 2) biçimi zorunlu kılar.',
      en:'Trap: Attempting to transform the polynomial without expanding in powers of (t − 2)! The 2nd shifting theorem requires f(t − 2)H(t − 2).'
    },
    steps:clinicProblem2
  },
  {
    badge:T('5 PUAN · BASAMAK ZORLAMASI','5 POINTS · STEP FORCING'),
    statement:{
      tr:'y\'\' + 4y = 8 H(t − a) diferansiyel denklemini y(0) = y₀, y\'(0) = 0 için Laplace dönüşümü ve kısmi kesirlerle çözünüz.',
      en:'Solve y\'\' + 4y = 8 H(t − a) with y(0) = y₀, y\'(0) = 0 via Laplace transform and partial fractions.'
    },
    trap:{
      tr:'Tuzak: e^{-as} çarpanını kısmi kesirlerin içine katıp karmaşıklaştırmak! e^{-as} dışarıda bekletilmeli, sadece 8 / [s(s² + 4)] kesirlere ayrılmalıdır.',
      en:'Trap: Trying to incorporate e^{-as} into partial fraction coefficients! Keep e^{-as} isolated and invert 8 / [s(s² + 4)] first.'
    },
    steps:clinicProblem3
  },
  {
    badge:T('5 PUAN · DİRAC DARBESİ','5 POINTS · DIRAC IMPULSE'),
    statement:{
      tr:'y\'\' + ω² y = I δ(t − a) başlangıçta durgun (y(0)=0, y\'(0)=0) osilatörün darbe tepkisini ve hız sıçramasını bulunuz.',
      en:'Find the impulse response and velocity jump for an initially quiescent oscillator y\'\' + ω² y = I δ(t − a).'
    },
    trap:{
      tr:'Tuzak: Dirac darbesinin yer değiştirmede sıçrama yaptığını sanmak! Yer değiştirme süreklidir; sıçrama birinci türevde (hızda) gerçekleşir.',
      en:'Trap: Believing displacement jumps discontinuously! Displacement is continuous; the jump of size I occurs in the first derivative (velocity).'
    },
    steps:clinicProblem4
  }
];