import {T,step,v,n,o,p,f,pow,sub,prime,eq,plus,minus,x,y,t,C,fn,exp,integral,lines} from '../../../study/math.js';

const r=s=>`<mrow>${s}</mrow>`;
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6);
const s=v('s'),w=v('ω'),a=v('a'),F=v('F'),L=v('ℒ'),i=v('i'),M=v('M'),dt=v('d')+t,ds=v('d')+s;
const infty=v('∞');
const defInt=(low,high,body)=>`<msubsup>${o('∫')}${r(low)}${r(high)}</msubsup>${body}`;
const sin=arg=>fn('sin',arg),cos=arg=>fn('cos',arg),par=arg=>p(arg);
const imp=o('⇒'),cdot=o('·'),gt=o('>'),to=o('→'),neq=o('≠');

const pathEuler=[
  step(
    '1. Euler formülü ile üstel dönüşümü kur',
    '1. Set up the exponential transform via Euler’s formula',
    lines(
      fn('f',t)+eq+exp(i+w+t)+eq+cos(w+t)+plus+i+sin(w+t),
      L+p(exp(i+w+t))+eq+defInt(zero,infty,exp(minus+s+t)+exp(i+w+t)+dt)
    ),
    'Euler özdeşliği e^{iωt} = cos ωt + i sin ωt kullanılarak sinüs ve kosinüsün Laplace dönüşümleri tek bir üstel integral çatısı altında birleştirilir.',
    'By Euler’s identity e^{iωt} = cos ωt + i sin ωt, the Laplace transforms of cosine and sine are unified into a single exponential integral.'
  ),
  step(
    '2. Tabanları birleştir ve yakınsama koşulunu belirle',
    '2. Combine bases and establish convergence condition',
    lines(
      defInt(zero,infty,exp(minus+par(s+minus+i+w)+t)+dt)+o(',')+s+gt+zero
    ),
    'Üsler toplanarak integral e^{-(s - iω)t} biçimine getirilir. Reel kısım s > 0 olduğu sürece integral mutlak yakınsaktır.',
    'Exponents combine into e^{-(s - iω)t}. As long as the real part satisfies s > 0, the integral is absolutely convergent.'
  ),
  step(
    '3. Üstel integrali sınır değerleriyle hesapla',
    '3. Evaluate the exponential integral with boundary limits',
    lines(
      p(minus+f(one,s+minus+i+w)+exp(minus+par(s+minus+i+w)+t))+sub(o('|'),t+eq+zero)+pow(o('|'),t+to+infty)+eq+f(one,s+minus+i+w)
    ),
    't → ∞ sınırında e^{-st} sönüm faktörü sıfıra gider; t = 0 alt sınırında ise -(-1/(s - iω)) teriminden 1/(s - iω) kalır.',
    'At t → ∞ the damping factor e^{-st} decays to zero; at the lower limit t = 0, -(-1/(s - iω)) leaves 1/(s - iω).'
  ),
  step(
    '4. Karmaşık paydayı eşlenikle reel yap',
    '4. Realize the complex denominator via conjugate',
    lines(
      f(one,s+minus+i+w)+eq+f(s+plus+i+w,par(s+minus+i+w)+par(s+plus+i+w))+eq+f(s+plus+i+w,pow(s,two)+plus+pow(w,two))
    ),
    'Pay ve payda (s + iω) eşleniği ile çarpılarak paydada s² + ω² reel çarpanı izole edilir.',
    'Multiplying numerator and denominator by (s + iω) rationalizes the denominator to s² + ω².'
  ),
  step(
    '5. Reel ve sanal kısımları eşitleyerek dönüşümleri tamamla',
    '5. Equate real and imaginary parts to complete transforms',
    lines(
      L+p(cos(w+t))+eq+f(s,pow(s,two)+plus+pow(w,two))+o(' , ')+s+gt+zero,
      L+p(sin(w+t))+eq+f(w,pow(s,two)+plus+pow(w,two))+o(' , ')+s+gt+zero
    ),
    'Reel kısım cos ωt dönüşümü s/(s² + ω²), sanal kısım ise sin ωt dönüşümü ω/(s² + ω²) sonucunu eşzamanlı olarak üretir (Örnek 6.1).',
    'The real part yields L{cos ωt} = s/(s² + ω²) and the imaginary part yields L{sin ωt} = ω/(s² + ω²) simultaneously (Example 6.1).'
  )
];

const pathDeriv=[
  step(
    '1. Türevin Laplace integralini yaz ve kısmi integrasyon seç',
    '1. Set up the derivative Laplace integral and select integration by parts',
    lines(
      L+p(prime('f')+p(t))+eq+defInt(zero,infty,exp(minus+s+t)+prime('f')+p(t)+dt),
      v('u')+eq+exp(minus+s+t)+o(' , ')+v('d')+v('v')+eq+prime('f')+p(t)+dt+imp+v('v')+eq+fn('f',t)
    ),
    'Türevi yok etmek için u = e^{-st} ve dv = f\'(t) dt seçilir; buradan du = -s e^{-st} dt ve v = f(t) elde edilir.',
    'To eliminate the derivative, choose u = e^{-st} and dv = f\'(t) dt; then du = -s e^{-st} dt and v = f(t).'
  ),
  step(
    '2. Kısmi integrasyon formülünü uygula',
    '2. Apply the integration by parts formula',
    lines(
      defInt(zero,infty,v('u')+v('d')+v('v'))+eq+p(v('u')+v('v'))+sub(o('|'),zero)+pow(o('|'),infty)+minus+defInt(zero,infty,v('v')+v('d')+v('u'))
    ),
    'Standart ∫ u dv = uv - ∫ v du kuralı sınır değerleriyle birlikte tanımlanır.',
    'The standard ∫ u dv = uv - ∫ v du rule is applied across the infinite domain [0, ∞).'
  ),
  step(
    '3. Sınır terimini hesapla: f(0) başlangıç değerini izole et',
    '3. Evaluate the boundary term: isolate initial condition f(0)',
    lines(
      p(exp(minus+s+t)+fn('f',t))+sub(o('|'),t+eq+zero)+pow(o('|'),t+to+infty)+eq+zero+minus+fn('f',zero)+eq+minus+fn('f',zero)
    ),
    'f(t) üstel mertebeden olduğunda s > s₀ için t → ∞ iken e^{-st} f(t) → 0 olur; t = 0 alt sınırından -f(0) gelir.',
    'When f(t) is of exponential order, s > s₀ ensures e^{-st} f(t) → 0 as t → ∞; the lower limit t = 0 yields -f(0).'
  ),
  step(
    '4. Kalan integralden s F(s) çarpanını elde et',
    '4. Extract s F(s) from the remaining integral',
    lines(
      minus+defInt(zero,infty,fn('f',t)+par(minus+s+exp(minus+s+t))+dt)+eq+s+defInt(zero,infty,exp(minus+s+t)+fn('f',t)+dt)+eq+s+F+p(s)
    ),
    'du terimindeki -s çarpanı integralin önüne +s olarak çıkar ve geriye tam olarak f(t)\'nin Laplace dönüşümü F(s) kalır.',
    'The factor -s in du moves outside as +s, leaving exactly the Laplace transform F(s) of f(t).'
  ),
  step(
    '5. Birinci ve yüksek mertebe türev kurallarını bağla',
    '5. Conclude first and higher-order derivative rules',
    lines(
      L+p(prime('f')+p(t))+eq+s+F+p(s)+minus+fn('f',zero),
      L+p(prime('f',two)+p(t))+eq+pow(s,two)+F+p(s)+minus+s+fn('f',zero)+minus+prime('f')+p(zero)
    ),
    'Birinci türev kuralı L{f\'(t)} = s F(s) - f(0) ardışık uygulanarak ikinci türev s²F(s) - s f(0) - f\'(0) ve genel n. türev formülü elde edilir.',
    'Repeated application yields L{f\'(t)} = s F(s) - f(0), L{f\'\'(t)} = s²F(s) - s f(0) - f\'(0), and the general n-th derivative formula.'
  )
];

const clinicProblem1=[
  step(
    '1. f(t) = t^n için türev kuralını tanımla (1 puan)',
    '1. Define the derivative rule for f(t) = t^n (1 point)',
    lines(
      fn('f',t)+eq+pow(t,v('n'))+imp+prime('f')+p(t)+eq+v('n')+pow(t,v('n')+minus+one)+o(' , ')+fn('f',zero)+eq+zero,
      L+p(prime('f')+p(t))+eq+s+L+p(fn('f',t))+minus+fn('f',zero)
    ),
    'f(t) = t^n için türev n t^{n-1} ve f(0) = 0\'dır. Türevin Laplace dönüşümü L{f\'(t)} = s L{f(t)} - 0 olur.',
    'For f(t) = t^n, the derivative is n t^{n-1} and f(0) = 0. The derivative transform gives L{f\'(t)} = s L{f(t)} - 0.'
  ),
  step(
    '2. İndirgeme bağıntısını kur (1 puan)',
    '2. Establish the recurrence relation (1 point)',
    lines(
      v('n')+L+p(pow(t,v('n')+minus+one))+eq+s+L+p(pow(t,v('n')))+imp+L+p(pow(t,v('n')))+eq+f(v('n'),s)+L+p(pow(t,v('n')+minus+one))
    ),
    'Buradan t^n dönüşümü bir alt kuvvetin dönüşümüne n/s çarpanıyla bağlanır: L{t^n} = (n/s) L{t^{n-1}}.',
    'This connects L{t^n} to the previous power by n/s: L{t^n} = (n/s) L{t^{n-1}}.'
  ),
  step(
    '3. n = 1, 2, 3 için ardışık adımları işlet (1 puan)',
    '3. Execute consecutive steps for n = 1, 2, 3 (1 point)',
    lines(
      v('n')+eq+one+o(': ')+L+p(t)+eq+f(one,s)+cdot+f(one,s)+eq+f(one,pow(s,two)),
      v('n')+eq+two+o(': ')+L+p(pow(t,two))+eq+f(two,s)+cdot+f(one,pow(s,two))+eq+f(two,pow(s,three))
    ),
    'L{1} = 1/s bilindiğinden n = 1 için 1/s², n = 2 için 2!/s³, n = 3 için 3!/s⁴ adımları düzenli ilerler.',
    'Starting from L{1} = 1/s, n = 1 gives 1/s², n = 2 gives 2!/s³, and n = 3 gives 3!/s⁴.'
  ),
  step(
    '4. Alternatif: s bölgesinde n kez türev kuralıyla doğrula (1 puan)',
    '4. Alternative: verify via n-th derivative in s (1 point)',
    lines(
      L+p(pow(t,v('n'))+cdot+one)+eq+pow(par(minus+one),v('n'))+f(pow(v('d'),v('n')),pow(ds,v('n')))+par(f(one,s))+eq+f(v('n')+o('!'),pow(s,v('n')+plus+one))
    ),
    '1/s fonksiyonunun n. türevi (-1)^n n! / s^{n+1} olduğundan (-1)^n ile çarpım doğrudan n! / s^{n+1} verir.',
    'Since the n-th derivative of 1/s is (-1)^n n! / s^{n+1}, multiplying by (-1)^n yields n! / s^{n+1}.'
  ),
  step(
    '5. Genel formülü ve yakınsama bölgesini yaz (Örnek 6.2) (1 puan)',
    '5. Conclude the general formula and abscissa (Example 6.2) (1 point)',
    lines(
      L+p(pow(t,v('n')))+eq+f(v('n')+o('!'),pow(s,v('n')+plus+one))+o(' , ')+s+gt+zero+o(' , ')+v('n')+eq+zero+o(',')+one+o(',')+two+o('⋯')
    ),
    'Böylece n = 0, 1, 2, ... için genel formül L{t^n} = n! / s^{n+1} (s > 0) iki bağımsız yoldan kesinleştirilir.',
    'Thus the general formula L{t^n} = n! / s^{n+1} (s > 0) is rigorously proved by two independent paths.'
  )
];

const clinicProblem2=[
  step(
    '1. Temel sinüs ve kosinüs dönüşümlerini hatırla (1 puan)',
    '1. Recall basic sine and cosine transforms (1 point)',
    lines(
      L+p(cos(w+t))+eq+f(s,pow(s,two)+plus+pow(w,two))+o(' , ')+L+p(sin(w+t))+eq+f(w,pow(s,two)+plus+pow(w,two))
    ),
    'Sönümsüz kosinüs ve sinüs dönüşümleri payda s² + ω² ve yakınsama bölgesi s > 0 ile belirlidir.',
    'Undamped cosine and sine transforms have denominator s² + ω² and convergence region s > 0.'
  ),
  step(
    '2. Birinci kaydırma teoremini tanımla (1 puan)',
    '2. State the first shifting theorem (1 point)',
    lines(
      L+p(exp(a+t)+fn('f',t))+eq+F+p(s+minus+a)+eq+p(L+p(fn('f',t)))+sub(o('|'),s+to+s+minus+a)
    ),
    't bölgesinde e^{at} ile çarpım, s bölgesinde s parametresinin (s - a) ile yer değiştirmesine (frekans kayması) eşdeğerdir.',
    'Multiplying by e^{at} in time corresponds to shifting the complex frequency s → s - a.'
  ),
  step(
    '3. e^{at} cos ωt dönüşümünde s yerine s − a yaz (1 puan)',
    '3. Substitute s → s − a into e^{at} cos ωt (1 point)',
    lines(
      L+p(exp(a+t)+cos(w+t))+eq+p(f(s,pow(s,two)+plus+pow(w,two)))+sub(o('|'),s+to+s+minus+a)+eq+f(s+minus+a,pow(par(s+minus+a),two)+plus+pow(w,two))
    ),
    'Hem paydaki hem paydadaki s terimi (s - a) ile kaydırılarak (s - a) / [(s - a)² + ω²] elde edilir.',
    'Both numerator and denominator s terms shift to (s - a), yielding (s - a) / [(s - a)² + ω²].'
  ),
  step(
    '4. e^{at} sin ωt dönüşümünü kaydır (1 puan)',
    '4. Shift e^{at} sin ωt (1 point)',
    lines(
      L+p(exp(a+t)+sin(w+t))+eq+p(f(w,pow(s,two)+plus+pow(w,two)))+sub(o('|'),s+to+s+minus+a)+eq+f(w,pow(par(s+minus+a),two)+plus+pow(w,two))
    ),
    'Paydaki ω sabiti değişmez; yalnızca paydadaki s terimi (s - a) olur.',
    'The numerator ω remains constant; only the denominator s shifts to (s - a).'
  ),
  step(
    '5. Yakınsama apsisini ve kutup konumunu belirle (Örnek 6.3) (1 puan)',
    '5. Identify convergence abscissa and pole locations (Example 6.3) (1 point)',
    lines(
      s+gt+a+o(' , ')+sub(s,v('kutuplar'))+eq+a+o('±')+i+w
    ),
    'Üstelin büyümesi nedeniyle integral ancak s > a için yakınsar. Kutuplar karmaşık düzlemde s = a ± iω noktalarındadır.',
    'Due to exponential growth, the integral converges only for s > a. The poles lie at s = a ± iω.'
  )
];

const clinicProblem3=[
  step(
    '1. Temel fonksiyonun dönüşümünü yaz (1 puan)',
    '1. State the transform of the base function (1 point)',
    lines(
      fn('f',t)+eq+sin(t)+imp+F+p(s)+eq+f(one,pow(s,two)+plus+one)+o(' , ')+s+gt+zero
    ),
    'ω = 1 için sin t dönüşümü F(s) = 1/(s² + 1) olarak belirlenir.',
    'For ω = 1, the transform of sin t is F(s) = 1/(s² + 1).'
  ),
  step(
    '2. s bölgesinde birinci türevi hesapla (1 puan)',
    '2. Compute the first derivative in s (1 point)',
    lines(
      prime(F)+p(s)+eq+f(v('d'),ds)+par(pow(par(pow(s,two)+plus+one),minus+one))+eq+minus+f(two+s,pow(par(pow(s,two)+plus+one),two))
    ),
    'Zincir kuralıyla 1/(s² + 1) fonksiyonunun s\'e göre türevi -2s/(s² + 1)² olarak bulunur.',
    'By the chain rule, the s-derivative of 1/(s² + 1) is -2s/(s² + 1)².'
  ),
  step(
    '3. L{t sin t} = −F\'(s) kuralıyla birinci dönüşümü tamamla (1 puan)',
    '3. Complete L{t sin t} = −F\'(s) (1 point)',
    lines(
      L+p(t+sin(t))+eq+minus+prime(F)+p(s)+eq+f(two+s,pow(par(pow(s,two)+plus+one),two))
    ),
    'Önündeki eksi işareti ile türevin eksisi birbirini götürür: L{t sin t} = 2s / (s² + 1)² elde edilir.',
    'The minus sign cancels with the derivative minus: L{t sin t} = 2s / (s² + 1)².'
  ),
  step(
    '4. İkinci türevi bölüm kuralıyla hesapla (2 puan)',
    '4. Compute the second derivative via quotient rule (2 points)',
    lines(
      f(pow(v('d'),two),pow(ds,two))+par(f(one,pow(s,two)+plus+one))+eq+f(v('d'),ds)+par(minus+f(two+s,pow(par(pow(s,two)+plus+one),two))),
      eq+minus+f(two+pow(par(pow(s,two)+plus+one),two)+minus+two+s+cdot+two+par(pow(s,two)+plus+one)+cdot+two+s,pow(par(pow(s,two)+plus+one),four))+eq+f(six+pow(s,two)+minus+two,pow(par(pow(s,two)+plus+one),three))
    ),
    'Paydaki (s² + 1) sadeleştirmesiyle 2(s² + 1) - 8s² = 2 - 6s²; önündeki eksi ile (6s² - 2)/(s² + 1)³ kalır.',
    'Factoring out (s² + 1) gives 2(s² + 1) - 8s² = 2 - 6s²; with the leading minus it becomes (6s² - 2)/(s² + 1)³.'
  ),
  step(
    '5. L{t² sin t} = (+1) F\'\'(s) sonucunu bağla (Örnek 6.4) (1 puan)',
    '5. Conclude L{t² sin t} = (+1) F\'\'(s) (Example 6.4) (1 point)',
    lines(
      L+p(pow(t,two)+sin(t))+eq+pow(par(minus+one),two)+prime(F,two)+p(s)+eq+f(six+pow(s,two)+minus+two,pow(par(pow(s,two)+plus+one),three))
    ),
    '(-1)² = +1 olduğundan işaret değişmez: L{t² sin t} = (6s² - 2)/(s² + 1)³ kesinleşir.',
    'Since (-1)² = +1, the sign is positive: L{t² sin t} = (6s² - 2)/(s² + 1)³ is finalized.'
  )
];

const clinicProblem4=[
  step(
    '1. Birleşik yapıyı analiz et ve işlem sırasını seç (1 puan)',
    '1. Analyze composite structure and choose operational order (1 point)',
    lines(
      fn('f',t)+eq+t+exp(a+t)+sin(w+t)+o(' : ')+o('Önce ')+exp(a+t)+o(' kaydırması, sonra ')+t+o(' türevi')
    ),
    'Önce frekans kaydırmasıyla G(s) = L{e^{at} sin ωt} bulunur; ardından t çarpanı için -d/ds türevi alınır.',
    'First find G(s) = L{e^{at} sin ωt} via frequency shift; then apply -d/ds for the factor t.'
  ),
  step(
    '2. Sönümlü sinüs dönüşümünü yaz (1 puan)',
    '2. State the damped sine transform (1 point)',
    lines(
      v('G')+p(s)+eq+L+p(exp(a+t)+sin(w+t))+eq+f(w,pow(par(s+minus+a),two)+plus+pow(w,two))
    ),
    'L{sin ωt} = ω/(s² + ω²) formülünde s → s - a kaydırılarak ara fonksiyon G(s) elde edilir.',
    'Shifting s → s - a in L{sin ωt} = ω/(s² + ω²) gives the intermediate function G(s).'
  ),
  step(
    '3. G(s) fonksiyonunun s\'e göre türevini al (2 puan)',
    '3. Take the s-derivative of G(s) (2 points)',
    lines(
      f(v('d'),ds)+par(w+pow(par(pow(par(s+minus+a),two)+plus+pow(w,two)),minus+one))+eq+minus+f(two+w+par(s+minus+a),pow(par(pow(par(s+minus+a),two)+plus+pow(w,two)),two))
    ),
    'Payda türevinden 2(s - a) çarpanı ve negatif kuvvetten gelen eksi işaretiyle türev hesaplanır.',
    'The power rule and chain rule produce 2(s - a) with a minus sign from the reciprocal.'
  ),
  step(
    '4. L{t g(t)} = −G\'(s) formülünü uygula (1 puan)',
    '4. Apply L{t g(t)} = −G\'(s) (1 point)',
    lines(
      L+p(t+exp(a+t)+sin(w+t))+eq+minus+f(v('d'),ds)+v('G')+p(s)+eq+f(two+w+par(s+minus+a),pow(par(pow(par(s+minus+a),two)+plus+pow(w,two)),two))
    ),
    'Türevin önündeki eksi ile L{t g(t)} kuralındaki eksi çarpılarak payda pozitif 2ω(s - a) kalır.',
    'The minus sign of the derivative cancels the -d/ds rule, leaving positive 2ω(s - a).'
  ),
  step(
    '5. Sonucu doğrula ve yakınsama apsisini belirt (Örnek 6.5) (1 puan)',
    '5. Verify result and state abscissa of convergence (Example 6.5) (1 point)',
    lines(
      L+p(t+exp(a+t)+sin(w+t))+eq+f(two+w+par(s+minus+a),pow(par(pow(par(s+minus+a),two)+plus+pow(w,two)),two))+o(' , ')+s+gt+a
    ),
    'İşlem sırası tersine çevrilip önce t sin ωt bulunup sonra s → s - a kaydırılsa da tam olarak aynı 2ω(s - a) / [(s - a)² + ω²]² sonucuna ulaşılır (s > a).',
    'Reversing the order (finding L{t sin ωt} first then shifting s → s - a) yields the identical result 2ω(s - a) / [(s - a)² + ω²]² for s > a.'
  )
];

export const laplaceStudy={
  title:T(
    'Laplace integralini çekirdek sönümüyle görselleştir; frekans kaydırma ve s-türevini birleştir.',
    'Visualize Laplace integration via kernel damping; unite frequency shifting and s-differentiation.'
  ),
  intro:T(
    'Bölüm 6.1’deki bütün Laplace dönüşümleri üç ana eksende incelenir: (1) Tanım integrali ∫₀^∞ e^{-st} f(t) dt ve yakınsama apsisi s > s₀, (2) Kısmi integrasyonla türevin cebirsel dönüşümü L{f\'(t)} = s F(s) - f(0), (3) Birinci kaydırma L{e^{at}f(t)} = F(s - a) ve s-bölgesinde türev L{t^n f(t)} = (-1)^n d^nF/ds^n işlemleri.',
    'All Laplace transforms in Section 6.1 pivot around three core axes: (1) The definition integral ∫₀^∞ e^{-st} f(t) dt and convergence abscissa s > s₀, (2) Transform of derivatives via integration by parts L{f\'(t)} = s F(s) - f(0), (3) First shifting L{e^{at}f(t)} = F(s - a) and s-differentiation L{t^n f(t)} = (-1)^n d^nF/ds^n.'
  ),
  paths:[
    {
      title:T('Euler Özdeşliği ile Sinüs ve Kosinüsün Eşzamanlı Dönüşümü','Simultaneous Sine & Cosine Transform via Euler’s Identity'),
      prompt:T('cos ωt ve sin ωt için iki ayrı kısmi integrasyon yapmak yerine Euler formülü e^{iωt} neden 3 kat daha hızlıdır?','Why is Euler’s formula e^{iωt} 3 times faster than doing two separate integration-by-parts calculations for cos ωt and sin ωt?'),
      steps:pathEuler,
      reflection:T('Karmaşık eşlenik (s + iω) ile çarpım reel ve sanal kısımları nasıl tek hamlede ayrıştırır?','How does multiplying by the complex conjugate (s + iω) separate real and imaginary parts in a single move?')
    },
    {
      title:T('Kısmi İntegrasyon ile Türevin Dönüşümü ve f(0) Başlangıç Değeri','Derivative Transform & Initial Value f(0) via Integration by Parts'),
      prompt:T('Diferansiyel denklemleri cebirsel denklemlere dönüştüren L{f\'(t)} = s F(s) − f(0) kuralındaki −f(0) terimi nereden gelir?','Where does the −f(0) term come from in L{f\'(t)} = s F(s) − f(0), the rule that converts ODEs into algebraic equations?'),
      steps:pathDeriv,
      reflection:T('f(t) üstel mertebeden olmasaydı t → ∞ sınırında e^{-st} f(t) sıfıra gitmeyebilir miydi? s > s₀ koşulunun rolü nedir?','If f(t) were not of exponential order, could e^{-st} f(t) fail to vanish as t → ∞? What is the role of the s > s₀ condition?')
    }
  ],
  predictions:[
    {
      id:'pred-laplace-kernel',
      question:T(
        'f(t) = e^{3t} fonksiyonunun Laplace integrali ∫₀^∞ e^{-st} e^{3t} dt hangi s değerleri için sonlu bir değere yakınsar?',
        'For which values of s does the Laplace integral ∫₀^∞ e^{-st} e^{3t} dt of f(t) = e^{3t} converge to a finite value?'
      ),
      context:T(
        'İntegrand e^{-(s-3)t} biçimindedir; integralin sonlu çıkması için üssün katsayısının negatif olması gerekir.',
        'The integrand is e^{-(s-3)t}; for the integral to converge, the exponent coefficient must be strictly negative.'
      ),
      choices:T(
        ['Yalnızca s > 3 için yakınsar', 'Bütün s > 0 değerleri için yakınsar', 'Yalnızca s < 3 için yakınsar'],
        ['Only for s > 3', 'For all s > 0', 'Only for s < 3']
      ),
      answer:0,
      reason:T(
        'e^{-(s-3)t} integrali ancak s - 3 > 0, yani s > 3 olduğunda t → ∞ iken sıfıra söner ve 1/(s - 3) değerini verir. s ≤ 3 için integral sonsuza ıraksar.',
        'The integral e^{-(s-3)t} decays to zero as t → ∞ only when s - 3 > 0 (s > 3), evaluating to 1/(s - 3). For s ≤ 3, it diverges to infinity.'
      ),
      math:defInt(zero,infty,exp(minus+par(s+minus+three)+t)+dt)+eq+f(one,s+minus+three)+o(' , ')+s+gt+three,
      try:T('Aşağıdaki laboratuvarda Üstel ailesini ve s parametresini s₀ = 3 sınırının altına çekerek ıraksamayı gözlemle.','In the lab below, select Exponential and drag s below s₀ = 3 to observe divergence.')
    },
    {
      id:'pred-laplace-t-derivative',
      question:T(
        'F(s) = L{f(t)} verildiğinde t² f(t) fonksiyonunun Laplace dönüşümü aşağıdakilerden hangisidir?',
        'Given F(s) = L{f(t)}, what is the Laplace transform of t² f(t)?'
      ),
      context:T(
        'Genel kural L{t^n f(t)} = (-1)^n d^nF(s)/ds^n biçimindedir.',
        'The general property is L{t^n f(t)} = (-1)^n d^nF(s)/ds^n.'
      ),
      choices:T(
        ['+d²F(s)/ds²', '−d²F(s)/ds²', '2s F(s)'],
        ['+d²F(s)/ds²', '−d²F(s)/ds²', '2s F(s)']
      ),
      answer:0,
      reason:T(
        'n = 2 için (-1)² = +1 olduğundan işaret pozitiftir: L{t² f(t)} = +d²F(s)/ds².',
        'For n = 2, (-1)² = +1, so the sign is positive: L{t² f(t)} = +d²F(s)/ds².'
      ),
      math:L+p(pow(t,two)+fn('f',t))+eq+pow(par(minus+one),two)+f(pow(v('d'),two),pow(ds,two))+F+p(s)+eq+f(pow(v('d'),two),pow(ds,two))+F+p(s),
      try:T('Klinik Vaka 3’teki t² sin t türev basamaklarını incele.','Inspect the t² sin t derivative steps in Clinic Case 3.')
    }
  ]
};

export const laplaceClinic={
  examBlueprint:[
    {
      step:T('1 · Fonksiyon Ailesi ve Temel Dönüşüm Tespiti','1 · Family & Base Transform Identification'),
      detail:T('Fonksiyon sabit, polinom, üstel veya sinüs/kosinüs tabanında mı? Temel tablo dönüşümünü ve yakınsama apsisi s > s₀ değerini belirle.','Is the function a constant, polynomial, exponential, or sinusoid? State the standard table transform and convergence abscissa s > s₀.')
    },
    {
      step:T('2 · Frekans Kaydırma ve s-Türevi Operasyonları','2 · Frequency Shift & s-Differentiation Operations'),
      detail:T('Fonksiyon e^{at} ile çarpılmışsa s → s − a birinci kaydırmasını uygula. t^n ile çarpılmışsa (-1)^n d^n/ds^n türevini işlet.','If multiplied by e^{at}, apply the first shift s → s − a. If multiplied by t^n, compute (-1)^n d^n/ds^n.')
    },
    {
      step:T('3 · İşaret Kontrolü ve Yakınsama Sınırı','3 · Sign Verification & Domain Boundary'),
      detail:T('Türevden gelen eksi işaretlerinin birbirini götürüp götürmediğini denetle. s parametresinin geçerli olduğu s > s₀ aralığını mutlaka belirt.','Verify whether minus signs cancel out. Always state the valid convergence interval s > s₀.')
    }
  ],
  examClinic:[
    {
      badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),
      title:T('t^n Polinom dönüşümünün türev ve s-türevi ile iki farklı ispatı (Örnek 6.2)','Two proofs of polynomial t^n transform via derivative and s-derivative (Example 6.2)'),
      statement:T('f(t) = t^n (n = 0, 1, 2, ...) fonksiyonunun Laplace dönüşümünün L{t^n} = n! / s^{n+1} (s > 0) olduğunu iki farklı yöntemle gösteriniz.','Prove by two different methods that the Laplace transform of f(t) = t^n (n = 0, 1, 2, ...) is L{t^n} = n! / s^{n+1} (s > 0).'),
      trap:T('Türev yönteminde f(0) = 0 terimini yazmayı ve n = 0 için 0! = 1 özel durumunu belirtmeyi unutma.','In the derivative method, remember f(0) = 0 and note the n = 0 base case 0! = 1.'),
      steps:clinicProblem1
    },
    {
      badge:T('5 PUAN · 5 DAKİKA','5 POINTS · 5 MINUTES'),
      title:T('Sönümlü osilasyonlar ve birinci kaydırma teoremi (Örnek 6.3)','Damped oscillations and the first shifting theorem (Example 6.3)'),
      statement:T('L{e^{at} cos ωt} ve L{e^{at} sin ωt} Laplace dönüşümlerini birinci kaydırma teoremini kullanarak belirleyiniz.','Determine the Laplace transforms L{e^{at} cos ωt} and L{e^{at} sin ωt} using the first shifting theorem.'),
      trap:T('Paydaki s terimini kaydırırken parantez içine almayı unutma: e^{at} cos ωt payı s değil (s - a) olmalıdır!','When shifting the numerator s in e^{at} cos ωt, ensure it becomes (s - a), not just s!'),
      steps:clinicProblem2
    },
    {
      badge:T('6 PUAN · 6 DAKİKA','6 POINTS · 6 MINUTES'),
      title:T('t sin t ve t² sin t dönüşümlerinde s-türevi ve işaret analizi (Örnek 6.4)','s-differentiation and sign analysis for t sin t and t² sin t (Example 6.4)'),
      statement:T('L{t sin t} ve L{t² sin t} Laplace dönüşümlerini s bölgesinde türev kuralıyla hesaplayınız.','Evaluate the Laplace transforms L{t sin t} and L{t² sin t} using the s-domain differentiation property.'),
      trap:T('İkinci türevde (-1)² = +1 olur; türev alırken paydadaki (s² + 1) çarpanını sadeleştirmeden dağıtmak büyük katsayı hatalarına yol açar.','In the second derivative (-1)² = +1; factor out (s² + 1) before expanding the quotient to prevent coefficient errors.'),
      steps:clinicProblem3
    },
    {
      badge:T('6 PUAN · 6 DAKİKA','6 POINTS · 6 MINUTES'),
      title:T('Birleşik kaydırma ve s-türevi: t e^{at} sin ωt hesabı (Örnek 6.5)','Composite shifting and s-derivative: t e^{at} sin ωt (Example 6.5)'),
      statement:T('f(t) = t e^{at} sin ωt fonksiyonunun Laplace dönüşümünü bulunuz ve geçerli olduğu s aralığını belirtiniz.','Find the Laplace transform of f(t) = t e^{at} sin ωt and state its valid range of s.'),
      trap:T('Önce e^{at} kaydırması yapıldıktan sonra s\'e göre türev alınırken zincir kuralındaki 2(s - a) çarpanını ve işaretleri karıştırma.','After shifting by e^{at}, be careful with the chain rule factor 2(s - a) and the minus signs when taking -d/ds.'),
      steps:clinicProblem4
    }
  ]
};
