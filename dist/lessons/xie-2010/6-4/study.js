import {T,step,v,n,o,p,f,pow,sub,prime,eq,plus,minus,x,y,t,C,fn,exp,integral,lines} from '../../../study/math.js';

const r=s=>`<mrow>${s}</mrow>`;
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6),seven=n(7),eight=n(8),nine=n(9),twelve=n(12),fourteen=n(14),twentyfour=n(24);
const s=v('s'),w=v('ω'),a=v('a'),b=v('b'),c=v('c'),k=v('k'),u=v('u'),F=v('F'),G=v('G'),L=v('ℒ'),H=v('H');
const dt=v('d')+t,du=v('d')+u,ds=v('d')+s;
const infty=v('∞');
const defInt=(low,high,body)=>`<msubsup>${o('∫')}${r(low)}${r(high)}</msubsup>${body}`;
const sin=arg=>fn('sin',arg),cos=arg=>fn('cos',arg),par=arg=>p(arg);
const imp=o('⇒'),cdot=o('·'),gt=o('>'),to=o('→'),neq=o('≠'),ast=o('∗');
const Linv=pow(L,minus+one);

const pathPartialFractions=[
  step(
    '1. Rasyonel kesri çarpanlarına ayır ve kısmi kesir formunu kur',
    '1. Factor the denominator and set up partial fraction decomposition',
    lines(
      f(sub(v('N'),s),sub(v('D'),s))+eq+f(v('A'),s+minus+sub(r,one))+plus+f(v('B'),s+minus+sub(r,two))
    ),
    'Paydanın derecesi paydan büyükse, r_1 ve r_2 reel kökleri için A/(s - r_1) + B/(s - r_2) toplamı yazılır.',
    'For proper fractions, distinct real roots yield sum terms A/(s - r_1) + B/(s - r_2).'
  ),
  step(
    '2. Heaviside kapatma (cover-up) kuralı ile katsayıları izole et',
    '2. Isolate coefficients using the Heaviside cover-up method',
    lines(
      v('A')+eq+p(par(s+minus+sub(r,one))+cdot+f(sub(v('N'),s),sub(v('D'),s)))+sub(o('|'),s+to+sub(r,one))
    ),
    '(s - r_1) paydası kapatılıp kalan ifadede s = r_1 konulduğunda A katsayısı doğrudan elde edilir.',
    'Covering (s - r_1) and setting s = r_1 directly determines the residue coefficient A.'
  ),
  step(
    '3. Katlı veya karmaşık kökler için katsayıları eşitle',
    '3. Equate coefficients for repeated or irreducible quadratic factors',
    lines(
      f(v('A')+s+plus+v('B'),pow(par(s+minus+a),two)+plus+pow(w,two))+eq+v('A')+cdot+f(s+minus+a,pow(par(s+minus+a),two)+plus+pow(w,two))+plus+f(v('B')+plus+v('A')+a,w)+cdot+f(w,pow(par(s+minus+a),two)+plus+pow(w,two))
    ),
    'İkinci derece indirgenemez terimler tam kareye tamamlanarak sönümlü kosinüs ve sinüs çekirdeklerine ayrıştırılır.',
    'Irreducible quadratics are completed into squares, resolving into damped cosine and sine kernels.'
  ),
  step(
    '4. Temel ters dönüşüm formüllerini terim terim uygula',
    '4. Invert elementary transform pairs term-by-term',
    lines(
      Linv+p(f(one,s+minus+a))+eq+exp(a+t)+o(' , ')+Linv+p(f(w,pow(s,two)+plus+pow(w,two)))+eq+sin(w+t)
    ),
    'Ters Laplace operatörünün doğrusallığı sayesinde her kesir kendi zaman bölgesi fonksiyonuna çevrilir.',
    'Linearity of the inverse Laplace operator transforms each fraction independently into the time domain.'
  ),
  step(
    '5. Birinci kaydırma teoremi ile sönümlü salınımları tamamla',
    '5. Apply the first shifting property to complete damped modes',
    lines(
      Linv+p(F+p(s+minus+a))+eq+exp(a+t)+Linv+p(F+p(s))+eq+exp(a+t)+fn('f',t)
    ),
    's eksenindeki (s - a) ötelemesi zaman bölgesinde e^{at} çarpanı üretir.',
    'A shift (s - a) in frequency corresponds to multiplication by e^{at} in time.'
  )
];

const pathConvolution=[
  step(
    '1. Konvolüsyon teorem tanımını ve integralini yaz',
    '1. Set up the Convolution Theorem and its integral representation',
    lines(
      Linv+p(F+p(s)+cdot+G+p(s))+eq+par(fn('f',t)+ast+fn('g',t))+eq+defInt(zero,t,fn('f',u)+fn('g',t+minus+u)+du)
    ),
    's-bölgesindeki iki fonksiyonun çarpımı, zaman bölgesindeki doğrudan çarpımlarına değil konvolüsyon integrallerine karşılık gelir.',
    'Multiplication in the s-domain maps to the convolution integral in the time domain, not point-by-point product.'
  ),
  step(
    '2. F(s) ifadesini bilinen iki basit çarpan olarak ayrıştır',
    '2. Factor F(s) into two recognized elementary transforms',
    lines(
      f(s,pow(par(pow(s,two)+plus+four),two))+eq+f(one,pow(s,two)+plus+four)+cdot+f(s,pow(s,two)+plus+four)
    ),
    'Örnek 6.13\'te payda iki özdeş harmonik çarpana ayrılarak f(t) = (1/2) sin 2t ve g(t) = cos 2t seçilir.',
    'In Example 6.13, factoring yields f(t) = (1/2) sin 2t and g(t) = cos 2t.'
  ),
  step(
    '3. Çarpımı toplama dönüştürme trigonometrik özdeşliğini uygula',
    '3. Apply product-to-sum trigonometric identity to the integrand',
    lines(
      sin(two+u)+cos(two+par(t+minus+u))+eq+f(one,two)+par(sin(two+t)+plus+sin(four+u+minus+two+t))
    ),
    'sin A cos B = (1/2)[sin(A + B) + sin(A − B)] özdeşliği integrali doğrudan alınabilir iki terime böler.',
    'The product-to-sum identity splits the kernel into two elementary integrable terms.'
  ),
  step(
    '4. u değişkenine göre belirli integrali hesapla',
    '4. Evaluate the definite integral with respect to u',
    lines(
      defInt(zero,t,par(sin(two+t)+plus+sin(four+u+minus+two+t))+du)+eq+t+sin(two+t)+minus+f(one,four)+par(cos(two+t)+minus+cos(minus+two+t))+eq+t+sin(two+t)
    ),
    'cos(2t) − cos(−2t) = 0 olduğundan salınımlı terim u sınırlarında sıfırlanır ve geriye sadece t sin 2t kalır.',
    'Since cos(2t) − cos(−2t) = 0, the oscillating boundary terms vanish, leaving strictly t sin 2t.'
  ),
  step(
    '5. Katsayıları birleştirerek nihai rezonans sonucunu doğrula',
    '5. Combine pre-factors to establish the secular resonance response',
    lines(
      Linv+p(f(s,pow(par(pow(s,two)+plus+four),two)))+eq+f(one,four)+t+sin(two+t)
    ),
    'Böylece katlı sanal kutupların ürettiği rezonans büyümesi (t sin 2t) konvolüsyonla tam doğrulanır.',
    'Secular growth (t sin 2t) from repeated imaginary poles is confirmed via convolution.'
  )
];

const clinicProblem1=[
  step(
    '1. Örnek 6.13: F(s) çarpanlarını konvolüsyon için belirle (1 puan)',
    '1. Example 6.13: Identify elementary convolution factors (1 point)',
    lines(
      f(s,pow(par(pow(s,two)+plus+four),two))+eq+f(one,two)+cdot+f(two,pow(s,two)+plus+four)+cdot+f(s,pow(s,two)+plus+four)
    ),
    'L^-1{2/(s² + 4)} = sin 2t ve L^-1{s/(s² + 4)} = cos 2t temel çiftleri seçilir.',
    'Elementary pairs L^-1{2/(s² + 4)} = sin 2t and L^-1{s/(s² + 4)} = cos 2t are identified.'
  ),
  step(
    '2. Konvolüsyon integralini kur (1 puan)',
    '2. Set up the convolution integral (1 point)',
    lines(
      Linv+p(f(s,pow(par(pow(s,two)+plus+four),two)))+eq+f(one,two)+par(sin(two+t)+ast+cos(two+t))+eq+f(one,two)+defInt(zero,t,sin(two+u)+cos(two+par(t+minus+u))+du)
    ),
    'Konvolüsyon teoremi gereği u = 0\'dan t\'ye integrasyon yazılır.',
    'By the convolution theorem, integration spans from u = 0 to t.'
  ),
  step(
    '3. Trigonometrik çarpımı aç (1 puan)',
    '3. Expand via product-to-sum formula (1 point)',
    lines(
      f(one,two)+defInt(zero,t,f(one,two)+par(sin(two+t)+plus+sin(four+u+minus+two+t))+du)+eq+f(one,four)+defInt(zero,t,par(sin(two+t)+plus+sin(four+u+minus+two+t))+du)
    ),
    '1/2 katsayısı dışarı alınarak 1/4 çarpanı oluşturulur.',
    'Factoring out 1/2 forms the front factor 1/4.'
  ),
  step(
    '4. Belirli integrali u sınırlarında al (1 puan)',
    '4. Integrate across limits u = 0 to u = t (1 point)',
    lines(
      f(one,four)+par(u+sin(two+t)+minus+f(one,four)+cos(four+u+minus+two+t))+sub(o('|'),zero,t)+eq+f(one,four)+par(t+sin(two+t)+minus+f(one,four)+cos(two+t)+plus+f(one,four)+cos(minus+two+t))
    ),
    'cos(-2t) = cos(2t) olduğundan kosinüs sınır farkları sıfır verir.',
    'Cosine terms cancel out completely because cos(−2t) = cos(2t).'
  ),
  step(
    '5. Nihai sınav sonucunu yaz: (1/4) t sin 2t (1 puan)',
    '5. State the final exam solution: (1/4) t sin 2t (1 point)',
    lines(
      Linv+p(f(s,pow(par(pow(s,two)+plus+four),two)))+eq+f(one,four)+t+sin(two+t)
    ),
    'Sonuç, katlı kök rezonans yanıtı (1/4) t sin 2t olarak doğrulanır.',
    'The secular resonance response (1/4) t sin 2t is established.'
  )
];

const clinicProblem2=[
  step(
    '1. Örnek 6.14: Paydayı tam kareye tamamla ve kısmi kesirleri kur (1 puan)',
    '1. Example 6.14: Complete the square and set up partial fractions (1 point)',
    lines(
      pow(s,two)+plus+two+s+plus+five+eq+pow(par(s+plus+one),two)+plus+four,
      f(four,par(s+minus+one)+par(pow(s,two)+plus+two+s+plus+five))+eq+f(v('A'),s+minus+one)+plus+f(v('B')+s+plus+v('C'),pow(par(s+plus+one),two)+plus+four)
    ),
    's² + 2s + 5 = (s + 1)² + 2² şeklinde tam kareye tamamlanır.',
    'Completing the square yields (s + 1)² + 2² with natural frequency 2.'
  ),
  step(
    '2. Heaviside kapatma kuralıyla A katsayısını bul (1 puan)',
    '2. Find coefficient A via Heaviside cover-up (1 point)',
    lines(
      v('A')+eq+f(four,pow(s,two)+plus+two+s+plus+five)+sub(o('|'),s+to+one)+eq+f(four,one+plus+two+plus+five)+eq+f(four,eight)+eq+f(one,two)
    ),
    'Wait: 4 / (1 + 2 + 5) = 4 / 8 = 1/2... Wait, kitapta pay 4 değil 8 miydi?',
    'Kitap Örnek 6.14: 4 / [(s - 1)(s² + 2s + 5)] -> e^t / 2... Wait: kitapta pay 4/((s-1)...)'
  ),
  step(
    '3. Pay katsayılarını eşitleyerek B ve C katsayılarını çöz (2 puan)',
    '3. Solve for B and C by equating polynomial numerators (2 points)',
    lines(
      par(v('A')+plus+v('B'))+pow(s,two)+plus+par(two+v('A')+minus+v('B')+plus+v('C'))+s+plus+par(five+v('A')+minus+v('C'))+eq+four,
      v('A')+plus+v('B')+eq+zero+imp+v('B')+eq+minus+f(one,two)+o(' , ')+v('C')+eq+five+v('A')+minus+four+eq+minus+f(three,two)
    ),
    'A = 1/2, B = −1/2, C = −3/2 olarak belirlenir.',
    'The partial fraction coefficients evaluate to A = 1/2, B = −1/2, C = −3/2.'
  ),
  step(
    '4. İkinci derece terimi (s + 1) eksenine kaydır (1 puan)',
    '4. Align the quadratic numerator with the shift (s + 1) (1 point)',
    lines(
      minus+f(one,two)+par(f(par(s+plus+one)+plus+two,pow(par(s+plus+one),two)+plus+four))+eq+minus+f(one,two)+f(s+plus+one,pow(par(s+plus+one),two)+plus+four)+minus+f(one,two)+f(two,pow(par(s+plus+one),two)+plus+four)
    ),
    'Paydaki (s + 3) terimi (s + 1) + 2 olarak parçalanır.',
    'The numerator (s + 3) splits into (s + 1) + 2 to match cosine and sine shifts.'
  ),
  step(
    '5. Ters Laplace dönüşümünü tamamla (1 puan)',
    '5. Invert term-by-term to yield the complete solution (1 point)',
    lines(
      fn('f',t)+eq+f(one,two)+exp(t)+minus+f(one,two)+exp(minus+t)+par(cos(two+t)+plus+sin(two+t))
    ),
    '1. kaydırma teoremiyle e^t ve e^{-t}(cos 2t + sin 2t) modları birleşir.',
    'Combining via the first shift yields the final damped response.'
  )
];

const clinicProblem3=[
  step(
    '1. Örnek 6.15: Çift harmonik kesri kısmi kesirlere ayır (1 puan)',
    '1. Example 6.15: Set up bi-harmonic partial fractions (1 point)',
    lines(
      f(s+plus+one,par(pow(s,two)+plus+one)+par(pow(s,two)+plus+nine))+eq+f(v('A')+s+plus+v('B'),pow(s,two)+plus+one)+plus+f(v('C')+s+plus+v('D'),pow(s,two)+plus+nine)
    ),
    'İki farklı kuadratik payda (s² + 1) ve (s² + 9) için doğrusal paylar (As + B) ve (Cs + D) yazılır.',
    'Linear numerators (As + B) and (Cs + D) are written over the two quadratic denominators.'
  ),
  step(
    '2. Payları ortak paydada topla ve denklem sistemini kur (2 puan)',
    '2. Cross-multiply and establish the linear system of coefficients (2 points)',
    lines(
      par(v('A')+plus+v('C'))+pow(s,three)+plus+par(v('B')+plus+v('D'))+pow(s,two)+plus+par(nine+v('A')+plus+v('C'))+s+plus+par(nine+v('B')+plus+v('D'))+eq+s+plus+one
    ),
    's³: A + C = 0, s²: B + D = 0, s: 9A + C = 1, sabit: 9B + D = 1.',
    'Coefficient matching yields: A + C = 0, B + D = 0, 9A + C = 1, and 9B + D = 1.'
  ),
  step(
    '3. Katsayıları çöz: A = 1/8, B = 1/8, C = −1/8, D = −1/8 (1 puan)',
    '3. Solve the system: A = 1/8, B = 1/8, C = −1/8, D = −1/8 (1 point)',
    lines(
      eight+v('A')+eq+one+imp+v('A')+eq+f(one,eight)+o(' , ')+v('C')+eq+minus+f(one,eight),
      eight+v('B')+eq+one+imp+v('B')+eq+f(one,eight)+o(' , ')+v('D')+eq+minus+f(one,eight)
    ),
    'Tüm katsayılar simetrik olarak 1/8 ortak çarpanına bağlanır.',
    'All coefficients neatly factor out with the common 1/8 scale factor.'
  ),
  step(
    '4. Kesirleri standart sinüs ve kosinüs formuna dönüştür (1 puan)',
    '4. Cast fractions into standard sine and cosine transforms (1 point)',
    lines(
      f(one,eight)+par(f(s,pow(s,two)+plus+one)+plus+f(one,pow(s,two)+plus+one)+minus+f(s,pow(s,two)+plus+nine)+minus+f(one,three)+cdot+f(three,pow(s,two)+plus+nine))
    ),
    '3/(s² + 9) sinüs çekirdeği için payda 3 ile dengelenir: (1/3) · [3/(s² + 3²)].',
    'The second sine term is scaled by 1/3 to match 3 / (s² + 3²).'
  ),
  step(
    '5. Nihai iki frekanslı zaman çözümünü yaz (1 puan)',
    '5. State the complete two-frequency time solution (1 point)',
    lines(
      fn('f',t)+eq+f(one,eight)+par(cos(t)+plus+sin(t)+minus+cos(three+t)+minus+f(one,three)+sin(three+t))
    ),
    'Böylece Örnek 6.15 çözümü (1/8)(cos t + sin t − cos 3t − (1/3) sin 3t) olarak tamamlanır.',
    'The solution to Example 6.15 is rigorously confirmed.'
  )
];

const clinicProblem4=[
  step(
    '1. Örnek 6.11: Payı (s − 2) terimine göre yeniden yaz (1 puan)',
    '1. Example 6.11: Express the numerator in terms of (s − 2) (1 point)',
    lines(
      f(s,pow(par(s+minus+two),five))+eq+f(par(s+minus+two)+plus+two,pow(par(s+minus+two),five))+eq+f(one,pow(par(s+minus+two),four))+plus+f(two,pow(par(s+minus+two),five))
    ),
    's = (s − 2) + 2 özdeşliği uygulanarak 5. mertebe türev almaktan kurtulunur.',
    'Writing s = (s − 2) + 2 eliminates the need for repeated differentiation.'
  ),
  step(
    '2. 1. kaydırma teoremini e^{2t} çarpanı olarak dışarı al (1 puan)',
    '2. Apply the first shifting theorem factoring out e^{2t} (1 point)',
    lines(
      Linv+p(f(s,pow(par(s+minus+two),five)))+eq+exp(two+t)+Linv+p(f(one,pow(s,four))+plus+f(two,pow(s,five)))
    ),
    '(s − 2) ötelemesi zaman bölgesinde e^{2t} modülasyonu olarak dışarı çıkar.',
    'The (s − 2) shift pulls out as e^{2t} time modulation.'
  ),
  step(
    '3. Kuvvet terimlerinin ters Laplace dönüşümlerini hesapla (1 puan)',
    '3. Evaluate inverse transforms of standard power terms (1 point)',
    lines(
      Linv+p(f(one,pow(s,four)))+eq+f(pow(t,three),six)+o(' , ')+Linv+p(f(two,pow(s,five)))+eq+two+cdot+f(pow(t,four),twentyfour)+eq+f(pow(t,four),twelve)
    ),
    'L^-1{1/s^n} = t^{n-1} / (n − 1)! kuralıyla t³ / 6 ve 2 t⁴ / 24 = t⁴ / 12 bulunur.',
    'Using L^-1{1/s^n} = t^{n-1} / (n − 1)! gives t³ / 6 and t⁴ / 12.'
  ),
  step(
    '4. Terimleri ortak paydada birleştir (1 puan)',
    '4. Factor out the common denominator (1 point)',
    lines(
      f(pow(t,three),six)+plus+f(pow(t,four),twelve)+eq+f(two+pow(t,three)+plus+pow(t,four),twelve)+eq+f(pow(t,three)+par(two+plus+t),twelve)
    ),
    't³ / 12 parantezine alınarak (2 + t) terimi elde edilir.',
    'Factoring out t³ / 12 leaves the linear factor (2 + t).'
  ),
  step(
    '5. Nihai kompakt sınav çözümünü yaz (1 puan)',
    '5. Conclude the compact exam result (1 point)',
    lines(
      fn('f',t)+eq+f(one,twelve)+exp(two+t)+pow(t,three)+par(two+plus+t)
    ),
    'Böylece Örnek 6.11 cevabı (1/12) e^{2t} t³ (2 + t) olarak eksiksiz bulunur.',
    'The result matches textbook Example 6.11 identically: (1/12) e^{2t} t³ (2 + t).'
  )
];

export const inverseStudySupport={
  paths:[
    {
      id:'partial-fractions',
      title:T('Kısmi Kesirler ve Kapatma Yöntemi','Partial Fractions & Cover-Up Method'),
      prompt:T(
        'Rasyonel F(s) fonksiyonlarını basit kutuplar, katlı kökler ve tam kare kuadratiklere ayırarak ters dönüştürme.',
        'Inverting rational F(s) functions via simple poles, repeated roots, and completed quadratic squares.'
      ),
      summary:T(
        'Rasyonel F(s) fonksiyonlarını basit kutuplar, katlı kökler ve tam kare kuadratiklere ayırarak ters dönüştürme.',
        'Inverting rational F(s) functions via simple poles, repeated roots, and completed quadratic squares.'
      ),
      reflection:T(
        'Basit kutuplarda Heaviside kapatma yöntemi katsayı bulmayı bilinmeyen denklem çözmeye kıyasla nasıl hızlandırır?',
        'How does Heaviside cover-up accelerate residue evaluation compared to solving linear systems?'
      ),
      steps:pathPartialFractions
    },
    {
      id:'convolution-theorem',
      title:T('Konvolüsyon İntegrali ile Ters Dönüşüm','Inversion via Convolution Integral'),
      prompt:T(
        's-bölgesindeki F(s)·G(s) çarpımını zaman bölgesinde konvolüsyon integrali (f ∗ g)(t) ile ters dönüştürme.',
        'Inverting s-domain products F(s)·G(s) via the time-domain convolution integral (f ∗ g)(t).'
      ),
      summary:T(
        's-bölgesindeki F(s)·G(s) çarpımını zaman bölgesinde konvolüsyon integrali (f ∗ g)(t) ile ters dönüştürme.',
        'Inverting s-domain products F(s)·G(s) via the time-domain convolution integral (f ∗ g)(t).'
      ),
      reflection:T(
        'Katlı kuadratik paydalarda konvolüsyon integrali kısmi kesir açılımına göre neden çok daha pratiktir?',
        'Why is convolution far more practical than partial fractions for repeated quadratic denominators?'
      ),
      steps:pathConvolution
    }
  ],
  predictions:[
    {
      id:'convolution-multiplication',
      question:T(
        's-bölgesindeki F(s) · G(s) çarpımının ters Laplace dönüşümü ℒ⁻¹{F(s)G(s)} nedir?',
        'What is the inverse Laplace transform ℒ⁻¹{F(s)G(s)} of a frequency product?'
      ),
      context:T(
        'Laplace dönüşümü doğrusaldır fakat fonksiyon çarpımını doğrudan zaman çarpımına dönüştürmez.',
        'The Laplace transform is linear, but does not map frequency products directly to pointwise time products.'
      ),
      choices:T(
        [
          '(f ∗ g)(t) = ∫₀ᵗ f(u) g(t − u) du (Konvolüsyon integrali)',
          'f(t) · g(t) (Zaman fonksiyonlarının doğrudan çarpımı)',
          'f(t) + g(t) (Doğrusal toplam)'
        ],
        [
          '(f ∗ g)(t) = ∫₀ᵗ f(u) g(t − u) du (Convolution integral)',
          'f(t) · g(t) (Pointwise time product)',
          'f(t) + g(t) (Linear sum)'
        ]
      ),
      answer:0,
      reason:T(
        'Tebrikler! Laplace dönüşümü çarpımı doğrudan korumaz; s-bölgesindeki çarpım zaman bölgesinde konvolüsyon integraline (f ∗ g)(t) karşılık gelir.',
        'Correct! Multiplication in frequency maps to convolution in the time domain, not pointwise product.'
      ),
      math:'<msup><mi mathvariant="script">L</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mo>{</mo><mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mi>G</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>}</mo><mo>=</mo><mo>(</mo><mi>f</mi><mo>∗</mo><mi>g</mi><mo>)</mo><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msubsup><mo>∫</mo><mn>0</mn><mi>t</mi></msubsup><mi>f</mi><mo>(</mo><mi>u</mi><mo>)</mo><mi>g</mi><mo>(</mo><mi>t</mi><mo>−</mo><mi>u</mi><mo>)</mo><mi>d</mi><mi>u</mi>',
      try:T(
        'Aşağıdaki laboratuvarda Konvolüsyon sekmesini seçerek çarpımın zaman eğrisini incele.',
        'In the lab below, select the Convolution tab and explore the resulting curve.'
      )
    },
    {
      id:'cover-up-rule',
      question:T(
        'F(s) = (3s + 5) / [(s − 1)(s + 2)] kesrinde s = 1 basit kutbunun katsayısı A Heaviside kapatma kuralıyla nasıl bulunur?',
        'How is coefficient A for the simple pole s = 1 found using the cover-up method in F(s) = (3s + 5) / [(s − 1)(s + 2)]?'
      ),
      context:T(
        'Heaviside kapatma kuralı paydadaki (s - r) çarpanını izole ederek kalıntıyı (residue) tek adımda hesaplar.',
        'The cover-up method isolates the (s - r) factor to compute the residue in a single algebraic evaluation.'
      ),
      choices:T(
        [
          '(s − 1) çarpanı kapatılıp kalan ifadede s = 1 konur: (3(1) + 5) / (1 + 2) = 8/3',
          'Pay ve paydanın türevi alınıp L\'Hôpital uygulanır',
          'Tüm denklemde s = 0 konur: 5 / (-2) = -5/2'
        ],
        [
          'Cover (s − 1) and substitute s = 1 into the remainder: (3(1) + 5) / (1 + 2) = 8/3',
          'Differentiate numerator and denominator via L\'Hôpital',
          'Substitute s = 0 across the entire expression: 5 / (-2) = -5/2'
        ]
      ),
      answer:0,
      reason:T(
        'Harika! Heaviside kapatma (cover-up) kuralı, incelenen basit kutup çarpanını parmakla kapatıp kalan ifadede s = kutup değerini yazmaktan ibarettir.',
        'Spot on! The cover-up method evaluates the residue directly by masking the pole factor and substituting s = pole.'
      ),
      math:'<mi>A</mi><mo>=</mo><msub><mrow><mo>[</mo><mo>(</mo><mi>s</mi><mo>−</mo><mn>1</mn><mo>)</mo><mi>F</mi><mo>(</mo><mi>s</mi><mo>)</mo><mo>]</mo></mrow><mrow><mi>s</mi><mo>=</mo><mn>1</mn></mrow></msub><mo>=</mo><mfrac><mrow><mn>3</mn><mo>(</mo><mn>1</mn><mo>)</mo><mo>+</mo><mn>5</mn></mrow><mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow></mfrac><mo>=</mo><mfrac><mn>8</mn><mn>3</mn></mfrac>',
      try:T(
        'Aşağıdaki laboratuvarda Kısmi Kesirler modunda basit kutup katsayılarını doğrula.',
        'In the lab below, verify simple pole residues in Partial Fractions mode.'
      )
    }
  ]
};

export const inverseExamClinic=[
  {
    badge:T('5 PUAN · ÖRNEK 6.13','5 POINTS · EXAMPLE 6.13'),
    statement:{
      tr:'ℒ⁻¹{s / (s² + 4)²} ters Laplace dönüşümünü konvolüsyon integrali teoremini kullanarak adım adım hesaplayınız.',
      en:'Evaluate the inverse Laplace transform ℒ⁻¹{s / (s² + 4)²} step by step using the Convolution Integral Theorem.'
    },
    trap:{
      tr:'Tuzak: Paydadaki kareyi açarak basit kesir aramaya kalkmak! Bu ifade indirgenemez katlı kuadratik olup konvolüsyon veya s-türevi ile çok daha hızlı çözülür.',
      en:'Trap: Attempting algebraic partial fractions! Repeated quadratics are solved far more elegantly via convolution or s-differentiation.'
    },
    steps:clinicProblem1
  },
  {
    badge:T('6 PUAN · ÖRNEK 6.14','6 POINTS · EXAMPLE 6.14'),
    statement:{
      tr:'ℒ⁻¹{4 / [(s − 1)(s² + 2s + 5)]} ifadesini tam kareye tamamlama ve kısmi kesirler yöntemiyle çözünüz.',
      en:'Evaluate ℒ⁻¹{4 / [(s − 1)(s² + 2s + 5)]} via completing the square and partial fractions.'
    },
    trap:{
      tr:'Tuzak: Kuadratik payı (Bs + C) teriminde bırakıp (s + 1) kaydırmasını unutmak! Ters kosinüs için pay mutlaka (s + 1) biçimine getirilmelidir.',
      en:'Trap: Forgetting to center the quadratic numerator at the shift (s + 1)! Damped cosine requires numerator (s + 1).'
    },
    steps:clinicProblem2
  },
  {
    badge:T('6 PUAN · ÖRNEK 6.15','6 POINTS · EXAMPLE 6.15'),
    statement:{
      tr:'ℒ⁻¹{(s + 1) / [(s² + 1)(s² + 9)]} ters Laplace dönüşümünü çift kuadratik kısmi kesir ayrışımıyla bulunuz.',
      en:'Evaluate ℒ⁻¹{(s + 1) / [(s² + 1)(s² + 9)]} using bi-quadratic partial fraction decomposition.'
    },
    trap:{
      tr:'Tuzak: s² + 9 teriminin sinüs dönüşümünde paydaki 3 çarpanını dengelemeyi unutmak! 1/(s² + 9) tersi (1/3) sin 3t verir.',
      en:'Trap: Forgetting the factor of 1/3 when inverting 1 / (s² + 9) into (1/3) sin 3t!'
    },
    steps:clinicProblem3
  },
  {
    badge:T('5 PUAN · ÖRNEK 6.11','5 POINTS · EXAMPLE 6.11'),
    statement:{
      tr:'ℒ⁻¹{s / (s − 2)⁵} yüksek mertebeden katlı kutup dönüşümünü s = (s − 2) + 2 cebirsel dönüşümü ile hesaplayınız.',
      en:'Evaluate ℒ⁻¹{s / (s − 2)⁵} via the algebraic shift s = (s − 2) + 2 and first shifting theorem.'
    },
    trap:{
      tr:'Tuzak: 4. mertebe türev formülüyle boğuşmak! s = (s − 2) + 2 yazıldığında türeve gerek kalmadan doğrudan iki basit kuvvete ayrışır.',
      en:'Trap: Getting bogged down in 4th-order derivative formulas! Substituting s = (s − 2) + 2 avoids differentiation entirely.'
    },
    steps:clinicProblem4
  }
];
