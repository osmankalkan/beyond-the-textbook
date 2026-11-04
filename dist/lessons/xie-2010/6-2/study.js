import {T,step,v,n,o,p,f,pow,sub,prime,eq,plus,minus,x,y,t,C,fn,exp,integral,lines} from '../../../study/math.js';

const r=s=>`<mrow>${s}</mrow>`;
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6),nine=n(9);
const s=v('s'),w=v('ω'),a=v('a'),b=v('b'),k=v('k'),F=v('F'),L=v('ℒ'),H=v('H'),tau=v('τ');
const dt=v('d')+t,dtau=v('d')+tau,ds=v('d')+s;
const infty=v('∞');
const defInt=(low,high,body)=>`<msubsup>${o('∫')}${r(low)}${r(high)}</msubsup>${body}`;
const sin=arg=>fn('sin',arg),cos=arg=>fn('cos',arg),par=arg=>p(arg);
const imp=o('⇒'),cdot=o('·'),gt=o('>'),to=o('→'),neq=o('≠');

const pathSecondShift=[
  step(
    '1. Gecikmeli sinyalin Laplace integralini yaz',
    '1. Set up the Laplace integral of the delayed signal',
    lines(
      L+p(fn('f',t+minus+a)+H+p(t+minus+a))+eq+defInt(zero,infty,exp(minus+s+t)+fn('f',t+minus+a)+H+p(t+minus+a)+dt)
    ),
    'H(t - a) basamak fonksiyonu t < a için sıfır olduğundan, integralin [0, a) aralığındaki katkısı tamamen sıfırdır.',
    'Because the Heaviside step H(t - a) vanishes for t < a, the integral contribution on [0, a) is identically zero.'
  ),
  step(
    '2. Alt integrasyon sınırını a noktasına kaydır',
    '2. Shift the lower integration limit to a',
    lines(
      defInt(zero,infty,exp(minus+s+t)+fn('f',t+minus+a)+H+p(t+minus+a)+dt)+eq+defInt(a,infty,exp(minus+s+t)+fn('f',t+minus+a)+dt)
    ),
    't ≥ a için H(t - a) = 1 olduğundan basamak fonksiyonu integral içinden düşer ve alt sınır a olur.',
    'For t ≥ a, H(t - a) = 1, so the step drops from the integrand and the lower limit becomes a.'
  ),
  step(
    '3. Zaman ötelemesi değişken dönüşümü uygula (τ = t − a)',
    '3. Apply time-shift substitution (τ = t − a)',
    lines(
      tau+eq+t+minus+a+imp+t+eq+tau+plus+a+o(' , ')+dt+eq+dtau,
      t+eq+a+imp+tau+eq+zero+o(' , ')+t+to+infty+imp+tau+to+infty
    ),
    'τ = t − a değişken değişimi ile integralin alt sınırı tekrar 0\'a getirilir ve f(t - a) terimi f(τ) haline gelir.',
    'Substituting τ = t − a restores the lower limit to 0 and transforms f(t - a) into f(τ).'
  ),
  step(
    '4. Üstel çekirdeği parçala: e^{-as} çarpanını ayır',
    '4. Factor the exponential kernel: isolate e^{-as}',
    lines(
      defInt(zero,infty,exp(minus+s+par(tau+plus+a))+fn('f',tau)+dtau)+eq+defInt(zero,infty,exp(minus+a+s)+exp(minus+s+tau)+fn('f',tau)+dtau)
    ),
    'e^{-s(τ + a)} = e^{-as} · e^{-sτ} özdeşliği uygulanır; e^{-as} çarpanı τ değişkenine bağlı olmadığından integral dışına çıkar.',
    'Applying e^{-s(τ + a)} = e^{-as} · e^{-sτ} allows factoring e^{-as} outside since it does not depend on τ.'
  ),
  step(
    '5. İkinci kaydırma teoremini tamamla',
    '5. Conclude the Second Shifting Theorem',
    lines(
      exp(minus+a+s)+defInt(zero,infty,exp(minus+s+tau)+fn('f',tau)+dtau)+eq+exp(minus+a+s)+F+p(s)+o(' , ')+s+gt+zero
    ),
    'Kalan integral tam olarak f(t)\'nin Laplace dönüşümü F(s)\'dir. Böylece L{f(t-a)H(t-a)} = e^{-as}F(s) bağıntısı ispatlanır.',
    'The remaining integral is exactly the Laplace transform F(s) of f(t), proving L{f(t-a)H(t-a)} = e^{-as}F(s).'
  )
];

const pathPiecewise=[
  step(
    '1. Birim dikdörtgen darbe (pencere) fonksiyonunu kur',
    '1. Form the rectangular pulse (window) function',
    lines(
      sub(p(t),par(a+o(',')+b))+eq+H+p(t+minus+a)+minus+H+p(t+minus+b)+eq+o('1 (a < t < b),  0 (diğer)')
    ),
    'İki Heaviside basamağının farkı, [a, b] aralığında 1 değerini alan, dışında ise tamamen sıfır olan bir darbe (pencere) üretir.',
    'The difference of two Heaviside steps creates a rectangular window equal to 1 on [a, b] and 0 elsewhere.'
  ),
  step(
    '2. Aralıktaki g(t) fonksiyonunu pencere ile izole et',
    '2. Isolate function g(t) using the window',
    lines(
      fn('f',t)+eq+fn('g',t)+par(H+p(t+minus+a)+minus+H+p(t+minus+b))
    ),
    'g(t) fonksiyonu bu pencereyle çarpıldığında yalnızca [a, b] aralığında etkinleşir; a öncesinde ve b sonrasında sıfır kalır.',
    'Multiplying g(t) by this window restricts its activation strictly to [a, b], leaving it zero before a and after b.'
  ),
  step(
    '3. Çok parçalı genel fonksiyonu basamak farklarıyla yaz',
    '3. State general piecewise functions via step differences',
    lines(
      fn('f',t)+eq+sub(fn('f',t),one)+par(H+p(t)+minus+H+p(t+minus+sub(t,one)))+plus+sub(fn('f',t),two)+par(H+p(t+minus+sub(t,one))+minus+H+p(t+minus+sub(t,two)))
    ),
    'Her alt aralık kendi basamak farkıyla çarpılarak fonksiyon parçalı tanımdan tek bir analitik satıra dökülür.',
    'Each interval piece is multiplied by its step difference, condensing piecewise definitions into a single line.'
  ),
  step(
    '4. Terimleri basamak fonksiyonlarına göre yeniden grupla',
    '4. Regroup terms by individual Heaviside steps',
    lines(
      fn('f',t)+eq+sub(fn('f',t),one)+plus+par(sub(fn('f',t),two)+minus+sub(fn('f',t),one))+H+p(t+minus+sub(t,one))+plus+par(sub(fn('f',t),three)+minus+sub(fn('f',t),two))+H+p(t+minus+sub(t,two))
    ),
    'Yeniden düzenleme yapıldığında her H(t - tᵢ) katsayısı, tᵢ süreksizlik noktasındaki sıçrama miktarını (f_{i+1} - fᵢ) temsil eder.',
    'Regrouping reveals that each H(t - tᵢ) is weighted by the jump discontinuity (f_{i+1} - fᵢ) at switching time tᵢ.'
  ),
  step(
    '5. İkinci kaydırmaya uygun argüman formunu hazırla',
    '5. Prepare argument alignment for the second shift',
    lines(
      fn('g',t)+H+p(t+minus+a)+eq+fn('g',par(t+minus+a)+plus+a)+H+p(t+minus+a)+imp+exp(minus+a+s)+L+p(fn('g',t+plus+a))
    ),
    'Basamak katsayısındaki g(t) fonksiyonu (t - a) cinsinden Taylor/öteleme ile yazılarak 2. kaydırma uygulanabilir hale getirilir.',
    'Rewriting g(t) in powers of (t - a) aligns the argument with H(t - a), making it ready for the Second Shifting Theorem.'
  )
];

const clinicProblem1=[
  step(
    '1. Yöntem 1: Doğrudan tanım integralini kur (1 puan)',
    '1. Method 1: Set up the defining integral directly (1 point)',
    lines(
      L+p(t+H+p(t+minus+two))+eq+defInt(zero,infty,exp(minus+s+t)+t+H+p(t+minus+two)+dt)+eq+defInt(two,infty,t+exp(minus+s+t)+dt)
    ),
    't < 2 için H(t - 2) = 0 olduğundan integral [2, ∞) aralığında integre edilir.',
    'Since H(t - 2) = 0 for t < 2, the integration limits reduce to [2, ∞).'
  ),
  step(
    '2. Kısmi integrasyonla sınır değerlerini hesapla (1 puan)',
    '2. Evaluate boundary limits via integration by parts (1 point)',
    lines(
      p(minus+f(t,s)+exp(minus+s+t))+sub(o('|'),two)+pow(o('|'),infty)+plus+f(one,s)+defInt(two,infty,exp(minus+s+t)+dt)+eq+f(two,s)+exp(minus+two+s)+plus+f(one,pow(s,two))+exp(minus+two+s)
    ),
    'u = t, dv = e^{-st}dt seçilerek t = 2 alt sınırından 2e^{-2s}/s + e^{-2s}/s² elde edilir.',
    'Choosing u = t and dv = e^{-st}dt yields 2e^{-2s}/s + e^{-2s}/s² from the lower limit t = 2.'
  ),
  step(
    '3. Yöntem 2: s-bölgesinde türev kuralını uygula (1 puan)',
    '3. Method 2: Apply s-domain differentiation (1 point)',
    lines(
      L+p(t+H+p(t+minus+two))+eq+minus+f(v('d'),ds)+L+p(H+p(t+minus+two))+eq+minus+f(v('d'),ds)+par(f(exp(minus+two+s),s))
    ),
    'L{t f(t)} = -F\'(s) kuralı L{H(t-2)} = e^{-2s}/s dönüşümüne uygulanır.',
    'Applying L{t f(t)} = -F\'(s) to the base transform L{H(t-2)} = e^{-2s}/s.'
  ),
  step(
    '4. Bölüm türevi ile sonucu doğrula (1 puan)',
    '4. Verify the result via quotient rule (1 point)',
    lines(
      minus+f(par(minus+two+exp(minus+two+s))+s+minus+exp(minus+two+s)+cdot+one,pow(s,two))+eq+exp(minus+two+s)+par(f(one,pow(s,two))+plus+f(two,s))
    ),
    'Türev alındığında eksi işaretleri sadeleşir ve tam olarak e^{-2s}(1/s² + 2/s) bulunur.',
    'Differentiating cancels the minus signs and reproduces e^{-2s}(1/s² + 2/s) identically.'
  ),
  step(
    '5. Yöntem 3: 2. Kaydırma ile t = (t−2) + 2 ayrıştır (Örnek 6.7) (1 puan)',
    '5. Method 3: 2nd Shift via t = (t−2) + 2 split (Example 6.7) (1 point)',
    lines(
      L+p(par(t+minus+two+plus+two)+H+p(t+minus+two))+eq+exp(minus+two+s)+L+p(t)+plus+two+exp(minus+two+s)+L+p(one)+eq+exp(minus+two+s)+par(f(one,pow(s,two))+plus+f(two,s))
    ),
    't terimi (t - 2) + 2 yazılarak 2. kaydırma doğrudan işletilir; üç yöntem de aynı sonucu verir.',
    'Writing t = (t - 2) + 2 enables direct application of the 2nd shift; all three methods agree.'
  )
];

const clinicProblem2=[
  step(
    '1. Genel e^{at}H(t - b) yapısını incele ve argüman farkını gör (1 puan)',
    '1. Inspect the general structure e^{at}H(t - b) and note the argument mismatch (1 point)',
    lines(
      fn('f',t)+eq+exp(a+t)+H+p(t+minus+b)+o(' , ')+b+gt+zero
    ),
    'Üstelin üssü t, basamağın argümanı t - b\'dir; doğrudan L{e^{at}} = 1/(s-a) yazıp e^{-bs} ile çarpmak BÜYÜK bir sınav hatasıdır!',
    'The exponent is t while the step argument is t - b; directly multiplying 1/(s-a) by e^{-bs} is a FATAL exam error!'
  ),
  step(
    '2. Yöntem 1: Tanım integrali ile çöz (1 puan)',
    '2. Method 1: Solve via defining integral (1 point)',
    lines(
      defInt(b,infty,exp(minus+s+t)+exp(a+t)+dt)+eq+defInt(b,infty,exp(minus+par(s+minus+a)+t)+dt)+eq+f(exp(minus+b+par(s+minus+a)),s+minus+a)+o(' , ')+s+gt+a
    ),
    'Tabanlar birleştirilip t = b alt sınırı konulduğunda e^{-b(s-a)} / (s - a) elde edilir.',
    'Combining bases and evaluating at t = b yields e^{-b(s-a)} / (s - a) for s > a.'
  ),
  step(
    '3. Yöntem 2: Birinci kaydırma ile H(t - b) dönüşümünü ötele (1 puan)',
    '3. Method 2: First shift applied to L{H(t - b)} (1 point)',
    lines(
      L+p(exp(a+t)+H+p(t+minus+b))+eq+p(L+p(H+p(t+minus+b)))+sub(o('|'),s+to+s+minus+a)+eq+p(f(exp(minus+b+s),s))+sub(o('|'),s+to+s+minus+a)+eq+f(exp(minus+b+par(s+minus+a)),s+minus+a)
    ),
    'L{e^{at}g(t)} = G(s - a) kuralıyla e^{-bs}/s ifadesindeki her s yerine (s - a) yazılır.',
    'Using L{e^{at}g(t)} = G(s - a), replace every s in e^{-bs}/s with (s - a).'
  ),
  step(
    '4. Yöntem 3: İkinci kaydırma için e^{at} = e^{ab} e^{a(t-b)} yaz (1 puan)',
    '4. Method 3: Second shift by factoring e^{at} = e^{ab} e^{a(t-b)} (1 point)',
    lines(
      exp(a+b)+L+p(exp(a+par(t+minus+b))+H+p(t+minus+b))+eq+exp(a+b)+exp(minus+b+s)+f(one,s+minus+a)+eq+f(exp(minus+b+par(s+minus+a)),s+minus+a)
    ),
    'e^{ab} sabiti dışarı çıkarılır; kalan kısım tam eşleşmiş formda e^{-bs}/(s-a) verir.',
    'The factor e^{ab} moves outside; the matched remainder transforms to e^{-bs}/(s-a).'
  ),
  step(
    '5. Örnek 6.8 vize sorusunu süperpozisyonla tamamla (1 puan)',
    '5. Complete the Example 6.8 exam problem via superposition (1 point)',
    lines(
      L+p(exp(two+t)+H+p(t)+minus+exp(minus+three+t)+H+p(t+minus+four))+eq+f(one,s+minus+two)+minus+f(exp(minus+four+par(s+plus+three)),s+plus+three)
    ),
    'Birinci terimde b = 0, a = 2 için 1/(s - 2); ikinci terimde b = 4, a = -3 için e^{-4(s+3)}/(s+3) bulunur.',
    'The first term has b = 0, a = 2 giving 1/(s - 2); the second has b = 4, a = -3 giving e^{-4(s+3)}/(s+3).'
  )
];

const clinicProblem3=[
  step(
    '1. Trigonometrik açıyı gecikme anına göre ötele (1 puan)',
    '1. Shift the trigonometric angle by the delay onset (1 point)',
    lines(
      cos(two+t)+H+p(t+minus+f(v('π'),n(8)))+o(' : ')+two+t+eq+two+par(t+minus+f(v('π'),n(8)))+plus+f(v('π'),four)
    ),
    't yerine (t - π/8) oluşturmak için açı 2(t - π/8) + π/4 olarak yeniden ifade edilir.',
    'To create (t - π/8), the angle is rewritten as 2(t - π/8) + π/4.'
  ),
  step(
    '2. Kosinüs toplam formülünü aç (1 puan)',
    '2. Expand the cosine sum formula (1 point)',
    lines(
      cos(two+par(t+minus+f(v('π'),n(8)))+plus+f(v('π'),four))+eq+cos(two+par(t+minus+f(v('π'),n(8))))+cos(f(v('π'),four))+minus+sin(two+par(t+minus+f(v('π'),n(8))))+sin(f(v('π'),four))
    ),
    'cos(A + B) = cos A cos B − sin A sin B özdeşliği uygulanır.',
    'Applying the trigonometric identity cos(A + B) = cos A cos B − sin A sin B.'
  ),
  step(
    '3. cos(π/4) = sin(π/4) = 1/√2 katsayısını dışarı al (1 puan)',
    '3. Factor out cos(π/4) = sin(π/4) = 1/√2 (1 point)',
    lines(
      f(one,v('√2'))+par(cos(two+par(t+minus+f(v('π'),n(8))))+minus+sin(two+par(t+minus+f(v('π'),n(8)))))+H+p(t+minus+f(v('π'),n(8)))
    ),
    'Açı değerleri yerine konarak her iki terim de (t - π/8) ile tam kilitlenmiş hale getirilir.',
    'Substituting values aligns both cosine and sine strictly with the shift (t - π/8).'
  ),
  step(
    '4. İkinci kaydırma teoremi ile Laplace dönüşümünü al (2 puan)',
    '4. Apply the Second Shifting Theorem (2 points)',
    lines(
      f(one,v('√2'))+exp(minus+f(v('π'),n(8))+s)+par(L+p(cos(two+t))+minus+L+p(sin(two+t)))+eq+f(one,v('√2'))+exp(minus+f(v('π'),n(8))+s)+par(f(s,pow(s,two)+plus+four)+minus+f(two,pow(s,two)+plus+four))
    ),
    '2. kaydırma gereği e^{-(π/8)s} çarpanı gelir; parantez içinde standart cos 2t ve sin 2t dönüşümleri kalır.',
    'By the 2nd shift, e^{-(π/8)s} factors out, leaving standard cos 2t and sin 2t transforms.'
  ),
  step(
    '5. Payları birleştirerek nihai çözümü yaz (Örnek 6.9-A) (1 puan)',
    '5. Combine numerators for the final result (Example 6.9-A) (1 point)',
    lines(
      L+p(cos(two+t)+H+p(t+minus+f(v('π'),n(8))))+eq+f(exp(minus+f(v('π'),n(8))+s)+par(s+minus+two),v('√2')+par(pow(s,two)+plus+four))+o(' , ')+s+gt+zero
    ),
    'Ortak paydada birleştirilerek e^{-(π/8)s}(s - 2) / [√2(s² + 4)] kompakt biçimi elde edilir.',
    'Combining under the common denominator yields e^{-(π/8)s}(s - 2) / [√2(s² + 4)].'
  )
];

const clinicProblem4=[
  step(
    '1. Polinomu t = 2 civarında Taylor/öteleme formuna getir (2 puan)',
    '1. Express the polynomial in powers of (t - 2) via Taylor expansion (2 points)',
    lines(
      nine+pow(t,two)+plus+two+t+minus+one+eq+nine+pow(par(t+minus+two+plus+two),two)+plus+two+par(t+minus+two+plus+two)+minus+one,
      eq+nine+pow(par(t+minus+two),two)+plus+par(n(36)+plus+two)+par(t+minus+two)+plus+par(n(36)+plus+four+minus+one)+eq+nine+pow(par(t+minus+two),two)+plus+n(38)+par(t+minus+two)+plus+n(39)
    ),
    't yerine (t - 2) + 2 konup kare açıldığında katsayılar 9(t - 2)² + 38(t - 2) + 39 olarak belirlenir.',
    'Substituting t = (t - 2) + 2 and expanding yields 9(t - 2)² + 38(t - 2) + 39.'
  ),
  step(
    '2. İkinci kaydırma teoremini terim terim uygula (1 puan)',
    '2. Apply the Second Shifting Theorem term-by-term (1 point)',
    lines(
      L+p(par(nine+pow(par(t+minus+two),two)+plus+n(38)+par(t+minus+two)+plus+n(39))+H+p(t+minus+two))+eq+exp(minus+two+s)+L+p(nine+pow(t,two)+plus+n(38)+t+plus+n(39))
    ),
    'H(t - 2) ile tam eşleşen (t - 2) tabanı e^{-2s} çarpanı olarak dışarı çıkar ve geriye t polinomu kalır.',
    'The matching (t - 2) powers pull out as e^{-2s}, leaving an ordinary polynomial in t.'
  ),
  step(
    '3. Polinom terimlerinin Laplace dönüşümlerini yaz (1 puan)',
    '3. Evaluate Laplace transforms of polynomial terms (1 point)',
    lines(
      L+p(nine+pow(t,two))+eq+nine+cdot+f(two,pow(s,three))+eq+f(n(18),pow(s,three))+o(' , ')+L+p(n(38)+t)+eq+f(n(38),pow(s,two))+o(' , ')+L+p(n(39))+eq+f(n(39),s)
    ),
    'n!/s^{n+1} formülüyle 9 · (2/s³) = 18/s³, 38 · (1/s²) = 38/s² ve 39/s hesaplanır.',
    'Using n!/s^{n+1} yields 18/s³, 38/s², and 39/s.'
  ),
  step(
    '4. Ortak paydada birleştir (1 puan)',
    '4. Combine over a common denominator (1 point)',
    lines(
      exp(minus+two+s)+par(f(n(18),pow(s,three))+plus+f(n(38),pow(s,two))+plus+f(n(39),s))+eq+exp(minus+two+s)+f(n(39)+pow(s,two)+plus+n(38)+s+plus+n(18),pow(s,three))
    ),
    's³ ortak paydasında pay 39s² + 38s + 18 olarak toplanır.',
    'Combining under s³ gives the numerator 39s² + 38s + 18.'
  ),
  step(
    '5. Örnek 6.9-B sonucunu doğrula ve yakınsama bölgesini yaz (1 puan)',
    '5. Verify Example 6.9-B and state convergence region (1 point)',
    lines(
      L+p(par(nine+pow(t,two)+plus+two+t+minus+one)+H+p(t+minus+two))+eq+f(exp(minus+two+s)+par(n(39)+pow(s,two)+plus+n(38)+s+plus+n(18)),pow(s,three))+o(' , ')+s+gt+zero
    ),
    'Polinom gecikmeli basamak dönüşümü tam olarak e^{-2s}(39s² + 38s + 18)/s³ (s > 0) olarak tamamlanır.',
    'The delayed polynomial transform concludes rigorously as e^{-2s}(39s² + 38s + 18)/s³ for s > 0.'
  )
];

export const heavisideStudy={
  title:T(
    'Heaviside basamağı ile süreksiz sinyalleri modelle; 2. Kaydırma Teoremi ile e^{-as} frekans ötelemesini uygula.',
    'Model discontinuous signals via Heaviside steps; apply frequency attenuation e^{-as} via the 2nd Shift Theorem.'
  ),
  intro:T(
    'Bölüm 6.2 Heaviside basamak fonksiyonu H(t - a) üç temel taşıyıcı sütun üzerine kuruludur: (1) Has olmayan integral tanımı ve L{H(t - a)} = e^{-as}/s dönüşümü, (2) Zaman gecikmesi ile frekans sönümünü bağlayan 2. Kaydırma Teoremi L{f(t-a)H(t-a)} = e^{-as}F(s), (3) Parçalı tanımlı, darbeli veya süreksiz mühendislik sinyallerinin basamak farklarıyla tek satırda ifade edilmesi.',
    'Section 6.2 on the Heaviside step function H(t - a) rests on three pillars: (1) The improper integral transform L{H(t - a)} = e^{-as}/s, (2) The Second Shifting Theorem L{f(t-a)H(t-a)} = e^{-as}F(s) connecting time delays to spectral modulation, (3) Modeling piecewise, pulsed, and discontinuous engineering inputs in a single line.'
  ),
  paths:[
    {
      title:T('İkinci Kaydırma Teoremi: Zaman Gecikmesi ve e^{-as} Çarpanı','Second Shifting Theorem: Time Delay and e^{-as} Factor'),
      prompt:T('Zaman ekseninde a kadar sağa ötelenen bir sinyal karmaşık s-bölgesinde neden e^{-as} ile çarpılır?','Why does a signal delayed by a in time get multiplied by e^{-as} in the complex s-domain?'),
      steps:pathSecondShift,
      reflection:T('τ = t − a değişken değişimi alt sınırı 0’a taşırken e^{-st} çekirdeğinden e^{-as} sabitini nasıl dışarı çıkarır?','How does the substitution τ = t − a restore the lower limit to 0 while pulling e^{-as} out of the kernel e^{-st}?')
    },
    {
      title:T('Parçalı Fonksiyonları Basamaklarla İfade Etme ve Pencereme Tekniği','Expressing Piecewise Functions via Steps and Windowing'),
      prompt:T('Birden çok aralıkta farklı formüllere sahip bir fonksiyonu if-else blokları yerine tek bir analitik satırda nasıl yazarsın?','How do you express a function defined across multiple intervals in a single analytic line instead of if-else blocks?'),
      steps:pathPiecewise,
      reflection:T('H(t - a) − H(t - b) dikdörtgen darbesi çarpıldığı fonksiyonu [a, b] aralığı dışından nasıl tamamen yalıtır?','How does the rectangular pulse H(t - a) − H(t - b) isolate the function strictly within [a, b]?')
    }
  ],
  predictions:[
    {
      id:'pred-heaviside-shift-vs-freq',
      question:T(
        '1. Kaydırma Teoremi (Frekans Kayması) ile 2. Kaydırma Teoremi (Zaman Gecikmesi) arasındaki temel fark nedir?',
        'What is the fundamental difference between the 1st Shift (Frequency Shift) and 2nd Shift (Time Delay)?'
      ),
      context:T(
        '1. Kaydırma: L{e^{at}f(t)} = F(s - a). 2. Kaydırma: L{f(t - a)H(t - a)} = e^{-as}F(s).',
        '1st Shift: L{e^{at}f(t)} = F(s - a). 2nd Shift: L{f(t - a)H(t - a)} = e^{-as}F(s).'
      ),
      choices:T(
        [
          '1. Kaydırma zaman bölgesinde e^{at} çarpımı ile s parametresini kaydırır; 2. Kaydırma zaman gecikmesi ile s bölgesinde e^{-as} çarpanı üretir',
          'Her iki teorem de tamamen aynı işlemi yapar',
          '2. Kaydırma yalnızca integral alırken geçerlidir'
        ],
        [
          '1st shift multiplies by e^{at} in time and shifts s; 2nd shift delays in time and multiplies by e^{-as} in s',
          'Both theorems perform identical operations',
          'The 2nd shift applies only during integration'
        ]
      ),
      answer:0,
      reason:T(
        '1. Kaydırmada zaman bölgesindeki üstel fonksiyon frekans eksenini öteler (s → s - a). 2. Kaydırmada ise zamandaki gecikme (t → t - a) frekans bölgesini e^{-as} ile modüle eder.',
        'In the 1st shift, exponential time weighting translates frequency (s → s - a). In the 2nd shift, time delay (t → t - a) modulates the s-spectrum by e^{-as}.'
      ),
      math:L+p(fn('f',t+minus+a)+H+p(t+minus+a))+eq+exp(minus+a+s)+F+p(s),
      try:T('Aşağıdaki laboratuvarda Gecikmeli Rampa ve Gecikmeli Üstel ailelerinde a gecikmesini artırarak e^{-as} modülasyonunu gözlemle.','In the lab below, increase delay a for Delayed Ramp and Delayed Exp to observe e^{-as} modulation.')
    },
    {
      id:'pred-heaviside-unmatched-trap',
      question:T(
        't H(t - 2) ifadesinin Laplace dönüşümü neden e^{-2s} / s² DEĞİLDİR?',
        'Why is the Laplace transform of t H(t - 2) NOT equal to e^{-2s} / s²?'
      ),
      context:T(
        '2. Kaydırma Teoremi yalnızca f(t - a) ile H(t - a) argümanları tam eşleştiğinde e^{-as}F(s) verir.',
        'The 2nd Shift Theorem gives e^{-as}F(s) only when arguments of f(t - a) and H(t - a) match.'
      ),
      choices:T(
        [
          'Çünkü t fonksiyonunun argümanı (t - 2) değildir; t = (t - 2) + 2 yazılarak fazladan 2e^{-2s}/s terimi gelmelidir',
          'Çünkü H(t - 2) türevi sıfırdır',
          'Çünkü t fonksiyonunun Laplace dönüşümü yoktur'
        ],
        [
          'Because the argument of t is not (t - 2); writing t = (t - 2) + 2 adds an extra 2e^{-2s}/s term',
          'Because the derivative of H(t - 2) is zero',
          'Because t has no Laplace transform'
        ]
      ),
      answer:0,
      reason:T(
        '2. Kaydırma formülü f(t - a)H(t - a) gerektirir. t = (t - 2) + 2 yazıldığında L{(t - 2)H(t - 2) + 2H(t - 2)} = e^{-2s}/s² + 2e^{-2s}/s olur. f(t) argümanını ötelemeden doğrudan uygulamak en yaygın sınav tuzağıdır!',
        'The theorem requires f(t - a)H(t - a). Writing t = (t - 2) + 2 yields e^{-2s}/s² + 2e^{-2s}/s. Forgetting to shift the base argument is the most frequent exam mistake!'
      ),
      math:L+p(t+H+p(t+minus+two))+eq+exp(minus+two+s)+par(f(one,pow(s,two))+plus+f(two,s)),
      try:T('Klinik Vaka 1 ve Vaka 2’deki argüman eşleştirme adımlarını dikkatle incele.','Carefully inspect argument alignment in Clinic Cases 1 and 2.')
    }
  ]
};

export const heavisideClinic={
  examBlueprint:[
    {
      step:T('1 · Argüman Eşleşme Kontrolü (t vs t − a)','1 · Argument Match Check (t vs t − a)'),
      detail:T('f(t)H(t - a) çarpımında fonksiyonun argümanı (t - a) ile kilitli mi? Eşleşmiyorsa t = (t - a) + a yazarak veya Taylor açılımı yaparak (t - a) kuvvetlerine dönüştür.','In f(t)H(t - a), is the argument aligned with (t - a)? If not, rewrite t = (t - a) + a or expand in powers of (t - a).')
    },
    {
      step:T('2 · İkinci Kaydırma ve e^{-as} Çarpanı','2 · Second Shift & Factor of e^{-as}'),
      detail:T('Tam eşleşmiş f(t - a)H(t - a) ifadesinde e^{-as} çarpanını dışarı çek; kalan f(t) taban fonksiyonunun bilinen standart Laplace dönüşümünü F(s) hesapla.','Pull e^{-as} outside from matched f(t - a)H(t - a); compute the standard Laplace transform F(s) of the remaining base function f(t).')
    },
    {
      step:T('3 · Parçalı Fonksiyonlarda Basamak Ayrışımı','3 · Step Decomposition for Piecewise Signals'),
      detail:T('Aralıklı tanımları f(t) = f₁ + (f₂ - f₁)H(t - t₁) + ⋯ basamak sıçrama formuna dök; her sıçrama terimini bağımsız olarak dönüştür.','Express piecewise signals via jump steps f(t) = f₁ + (f₂ - f₁)H(t - t₁) + ⋯; transform each jump term independently.')
    }
  ],
  examClinic:[
    {
      badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),
      title:T('t H(t − 2) Dönüşümünün Üç Farklı Yöntemle Hesabı (Örnek 6.7)','Evaluating L{t H(t − 2)} via Three Different Methods (Example 6.7)'),
      statement:T('f(t) = t H(t − 2) fonksiyonunun Laplace dönüşümünü (1) Tanım integrali, (2) s-bölgesinde türev, (3) İkinci kaydırma teoremi ile bulunuz.','Evaluate the Laplace transform of f(t) = t H(t − 2) by (1) Definition integral, (2) s-domain differentiation, and (3) Second shifting theorem.'),
      trap:T('İkinci kaydırmada t yerine doğrudan 1/s² yazıp e^{-2s}/s² demek; doğrusu t = (t - 2) + 2 açılımından 2e^{-2s}/s ek terimini bulmaktır.','Writing e^{-2s}/s² directly from 1/s²; the correct expansion t = (t - 2) + 2 produces the essential additional term 2e^{-2s}/s.'),
      steps:clinicProblem1
    },
    {
      badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),
      title:T('Eşleşmeyen Üstel e^{at}H(t − b) ve Vize Problemi (Örnek 6.8)','Unmatched Exponential e^{at}H(t − b) and Midterm Problem (Example 6.8)'),
      statement:T('L{e^{2t}H(t) − e^{-3t}H(t − 4)} Laplace dönüşümünü hesaplayınız ve e^{at}H(t − b) için genel kuralı gösteriniz.','Evaluate L{e^{2t}H(t) − e^{-3t}H(t − 4)} and establish the general formula for L{e^{at}H(t − b)}.'),
      trap:T('e^{-3t}H(t - 4) teriminde e^{-3(t-4)} zannedip e^{12} fazlalık çarpanını unutmak; e^{-3t} = e^{-12} e^{-3(t-4)} yazılmalıdır!','Assuming e^{-3t} matches e^{-3(t-4)} without compensating for e^{-12}; one must factor e^{-3t} = e^{-12} e^{-3(t-4)}!'),
      steps:clinicProblem2
    },
    {
      badge:T('6 PUAN · 6 DAKİKA','6 POINTS · 6 MINUTES'),
      title:T('Trigonometrik Gecikme: cos 2t H(t − π/8) (Örnek 6.9-A)','Trigonometric Time Shift: cos 2t H(t − π/8) (Example 6.9-A)'),
      statement:T('f(t) = cos 2t H(t − π/8) fonksiyonunun Laplace dönüşümünü bulunuz.','Find the Laplace transform of f(t) = cos 2t H(t − π/8).'),
      trap:T('Açıdaki 2 çarpanını parantez dışına almadan 2t = 2(t - π/8) + π/4 açılımı yerine 2t = (2t - π/8) + π/8 sanmak trigonometrik fazı bozar.','Failing to factor 2 properly: 2t = 2(t - π/8) + π/4 is required; confusing it with 2t - π/8 ruins the phase shift.'),
      steps:clinicProblem3
    },
    {
      badge:T('6 PUAN · 6 DAKİKA','6 POINTS · 6 MINUTES'),
      title:T('Polinomun Taylor Açılımıyla Kaydırılması (Örnek 6.9-B)','Delayed Polynomial via Taylor Expansion (Example 6.9-B)'),
      statement:T('f(t) = (9t² + 2t − 1)H(t − 2) fonksiyonunun Laplace dönüşümünü bulunuz.','Evaluate the Laplace transform of f(t) = (9t² + 2t − 1)H(t − 2).'),
      trap:T('9t² + 2t - 1 polinomunu (t - 2) kuvvetlerine açmadan terim terim dönüştürmeye çalışmak integrali içinden çıkılmaz hale getirir.','Attempting to transform the raw polynomial without expanding in powers of (t - 2) creates massive algebraic complications.'),
      steps:clinicProblem4
    }
  ]
};
