import {T,step,v,n,o,p,f,pow,sub,prime,eq,plus,minus,x,y,t,C,fn,exp,integral,lines} from '../../../study/math.js';

const r=s=>`<mrow>${s}</mrow>`;
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6),seven=n(7),eight=n(8),nine=n(9),fourteen=n(14);
const s=v('s'),w=v('ω'),a=v('a'),b=v('b'),k=v('k'),F=v('F'),L=v('ℒ'),H=v('H'),delta=v('δ'),eps=v('ε'),I=v('I');
const dt=v('d')+t,dx=v('d')+x;
const infty=v('∞');
const defInt=(low,high,body)=>`<msubsup>${o('∫')}${r(low)}${r(high)}</msubsup>${body}`;
const sin=arg=>fn('sin',arg),cos=arg=>fn('cos',arg),par=arg=>p(arg);
const imp=o('⇒'),cdot=o('·'),gt=o('>'),to=o('→'),neq=o('≠');

const pathPulseLimit=[
  step(
    '1. Sonlu dikdörtgen darbe fonksiyonunu ve alanını yaz',
    '1. Formulate the finite rectangular pulse and its area',
    lines(
      fn('f',t)+eq+f(I,eps)+par(fn('H',t+minus+a)+minus+fn('H',t+minus+par(a+plus+eps))),
      defInt(a,a+plus+eps,f(I,eps)+dt)+eq+f(I,eps)+cdot+eps+eq+I
    ),
    'Genişliği ε ve yüksekliği I/ε olan dikdörtgen darbenin altındaki alan (toplam itki) ε ne olursa olsun daima I\'ya eşittir.',
    'The rectangular pulse of width ε and height I/ε encloses an area (impulse) identically equal to I regardless of ε.'
  ),
  step(
    '2. Sonlu darbenin Laplace dönüşümünü Heaviside ile hesapla',
    '2. Evaluate the Laplace transform via Heaviside properties',
    lines(
      L+p(fn('f',t))+eq+f(I,eps)+L+p(fn('H',t+minus+a)+minus+fn('H',t+minus+par(a+plus+eps))),
      eq+f(I,eps)+cdot+f(exp(minus+a+s)+minus+exp(minus+par(a+plus+eps)+s),s)+eq+f(I,eps+s)+exp(minus+a+s)+par(one+minus+exp(minus+eps+s))
    ),
    'İkinci kaydırma kuralıyla her iki basamağın e^{-as}/s ve e^{-(a+ε)s}/s dönüşümleri fark olarak yazılır.',
    'Using the second shift, the transforms of the two steps yield e^{-as}/s and e^{-(a+ε)s}/s.'
  ),
  step(
    '3. ε sıfıra giderken L\'Hôpital kuralı ile limiti al',
    '3. Evaluate the limit as ε approaches 0 via L\'Hôpital\'s Rule',
    lines(
      o('lim')+sub(eps,to+zero)+f(one+minus+exp(minus+eps+s),eps)+eq+o('lim')+sub(eps,to+zero)+f(s+exp(minus+eps+s),one)+eq+s
    ),
    'ε → 0 iken 0/0 belirsizliği doğar; pay ve paydanın ε türevi alındığında s çarpanı paydaki s ile sadeleşir.',
    'As ε → 0, a 0/0 indeterminacy arises; differentiating with respect to ε yields s, canceling the denominator s.'
  ),
  step(
    '4. İdeal Dirac delta dönüşümünü elde et: ℒ{I δ(t − a)} = I e^{-as}',
    '4. Obtain the idealized Dirac delta transform: ℒ{I δ(t − a)} = I e^{-as}',
    lines(
      L+p(I+fn('δ',t+minus+a))+eq+o('lim')+sub(eps,to+zero)+L+p(fn('f',t))+eq+f(I,s)+exp(minus+a+s)+cdot+s+eq+I+exp(minus+a+s)
    ),
    'Limit fonksiyonu olarak tanımlanan Dirac delta darbesi s-bölgesinde pürüzsüz ve saf bir üstel gecikme e^{-as} çarpanı üretir.',
    'The limiting Dirac delta yields a completely smooth, pure exponential delay factor e^{-as} in the s-domain.'
  ),
  step(
    '5. a = 0 özel durumu: ℒ{δ(t)} = 1 (Birim spektrum)',
    '5. Special case a = 0: ℒ{δ(t)} = 1 (Flat spectrum)',
    lines(
      a+eq+zero+imp+L+p(fn('δ',t))+eq+exp(minus+zero+cdot+s)+eq+one
    ),
    'Başlangıç anındaki ideal birim darbe frekans bölgesinde frekanstan bağımsız birim genlikli düz bir spektrum verir.',
    'An instantaneous unit impulse at t = 0 produces a perfectly flat, frequency-independent unit spectrum.'
  )
];

const pathSifting=[
  step(
    '1. Dirac deltasının süzme (sifting / örnekleme) tanımını yaz',
    '1. Set up the sifting (sampling) property of the Dirac delta',
    lines(
      defInt(a+minus+v('α'),a+plus+v('α'),fn('g',t)+fn('δ',t+minus+a)+dt)+eq+fn('g',a)+o(' , ')+v('α')+gt+zero
    ),
    'Dirac deltası integral altında bir test fonksiyonu ile çarpıldığında, yalnızca t = a anındaki g(a) değerini süzer.',
    'When multiplied by a test function under an integral, the Dirac delta sifts out strictly the sample value g(a).'
  ),
  step(
    '2. Modüle edilmiş darbenin Laplace integralini kur',
    '2. Set up the Laplace integral of a modulated impulse',
    lines(
      L+p(fn('f',t)+fn('δ',t+minus+a))+eq+defInt(zero,infty,exp(minus+s+t)+fn('f',t)+fn('δ',t+minus+a)+dt)
    ),
    'Laplace dönüşümünün tanım integralinde test fonksiyonu g(t) = e^{-st} f(t) olarak belirlenir.',
    'In the Laplace definition integral, the test function is identified as g(t) = e^{-st} f(t).'
  ),
  step(
    '3. Süzme kuralını test fonksiyonuna uygula',
    '3. Apply sifting to the composite test function',
    lines(
      defInt(zero,infty,par(exp(minus+s+t)+fn('f',t))+fn('δ',t+minus+a)+dt)+eq+exp(minus+s+a)+fn('f',a)+eq+exp(minus+a+s)+fn('f',a)
    ),
    't = a noktası [0, ∞) aralığında yer aldığından süzme özelliği doğrudan e^{-as} f(a) değerini verir.',
    'Since t = a lies inside [0, ∞), sifting directly evaluates the kernel and function to e^{-as} f(a).'
  ),
  step(
    '4. a < 0 durumu: Tek taraflı Laplace dönüşümünün sıfır olması',
    '4. Case a < 0: Vanishing of unilateral Laplace transform',
    lines(
      a+o('<')+zero+imp+defInt(zero,infty,exp(minus+s+t)+fn('f',t)+fn('δ',t+minus+a)+dt)+eq+zero
    ),
    'Tek taraflı Laplace dönüşümü t ≥ 0 için tanımlıdır. Darbe t = a < 0 anında meydana gelirse integral aralığının dışında kalır ve sıfır verir.',
    'The unilateral Laplace transform integrates on t ≥ 0. If a < 0, the impulse lies outside [0, ∞) and yields identically zero.'
  ),
  step(
    '5. Heaviside türevi ile genelleştirilmiş türev bağıntısını kur',
    '5. Establish the distributional derivative of the Heaviside step',
    lines(
      f(v('d'),dt)+fn('H',t+minus+a)+eq+fn('δ',t+minus+a)+imp+L+p(f(v('d'),dt)+fn('H',t+minus+a))+eq+s+L+p(fn('H',t+minus+a))+minus+zero+eq+s+f(exp(minus+a+s),s)+eq+exp(minus+a+s)
    ),
    'Türevin Laplace dönüşümü teoreminden L{dH/dt} = s(e^{-as}/s) = e^{-as} elde edilerek Dirac dönüşümüyle tam tutarlılık sağlanır.',
    'From L{dH/dt} = s(e^{-as}/s) = e^{-as}, the derivative of the step aligns completely with the Dirac delta transform.'
  )
];

const clinicProblem1=[
  step(
    '1. Örnek 6.10: İntegrasyon bölgesi dışındaki t < 0 darbesini ayıkla (1 puan)',
    '1. Example 6.10: Eliminate the t < 0 impulse lying outside [0, ∞) (1 point)',
    lines(
      L+p(cos(v('π')+t)+fn('δ',t+plus+one))+eq+defInt(zero,infty,exp(minus+s+t)+cos(v('π')+t)+fn('δ',t+minus+par(minus+one))+dt)+eq+zero
    ),
    't = −1 noktasındaki darbe tek taraflı Laplace dönüşümünün [0, ∞) integrasyon aralığı dışında kaldığından katkısı 0\'dır.',
    'The impulse at t = −1 lies outside the unilateral domain [0, ∞), contributing identically zero.'
  ),
  step(
    '2. t = 2 noktasındaki trigonometrik darbenin katsayısını hesapla (1 puan)',
    '2. Evaluate the trigonometric impulse coefficient at t = 2 (1 point)',
    lines(
      two+cos(f(v('π')+t,six))+sub(o('|'),t+eq+two)+eq+two+cos(f(two+v('π'),six))+eq+two+cos(f(v('π'),three))+eq+two+par(f(one,two))+eq+one
    ),
    't = 2 anında 2 cos(2π/6) = 2 cos(π/3) = 2 · (1/2) = 1 genliği elde edilir.',
    'At t = 2, the modulated coefficient evaluates to 2 cos(π/3) = 1.'
  ),
  step(
    '3. t = 2 darbesinin Laplace dönüşümünü yaz (1 puan)',
    '3. Compute the Laplace transform of the t = 2 impulse (1 point)',
    lines(
      L+p(two+cos(f(v('π')+t,six))+fn('δ',t+minus+two))+eq+one+cdot+exp(minus+two+s)+eq+exp(minus+two+s)
    ),
    'Süzme özelliği gereği genlik e^{-2s} çarpanı ile ötelenir.',
    'By the sifting property, the amplitude is shifted by e^{-2s}.'
  ),
  step(
    '4. t = 3 noktasındaki üstel-polinom darbesinin katsayısını hesapla (2 puan)',
    '4. Evaluate the exponential-polynomial impulse coefficient at t = 3 (2 points)',
    lines(
      par(pow(t,three)+minus+two+pow(t,two)+plus+five)+exp(four+t)+sub(o('|'),t+eq+three)+eq+par(n(27)+minus+two+cdot+nine+plus+five)+exp(four+cdot+three),
      eq+par(n(27)+minus+n(18)+plus+five)+exp(n(12))+eq+fourteen+exp(n(12))
    ),
    't = 3 değeri konulduğunda parantez içi 14 ve üstel terim e^{12} olur.',
    'Substituting t = 3 yields the bracket value 14 and exponential factor e^{12}.'
  ),
  step(
    '5. Terimleri toplayarak nihai sınav sonucunu yaz (1 puan)',
    '5. Sum all terms for the final exam solution (1 point)',
    lines(
      F+p(s)+eq+zero+plus+exp(minus+two+s)+plus+fourteen+exp(n(12))+exp(minus+three+s)+eq+exp(minus+two+s)+plus+fourteen+exp(n(12))+exp(minus+three+s)
    ),
    'Böylece Örnek 6.10 çözümü e^{-2s} + 14 e^{12} e^{-3s} olarak eksiksiz tamamlanır.',
    'The solution to Example 6.10 is completely verified as e^{-2s} + 14 e^{12} e^{-3s}.'
  )
];

const clinicProblem2=[
  step(
    '1. Kiriş yükleme modelini Heaviside ve Dirac ile ifade et (1 puan)',
    '1. Formulate beam loading via Heaviside and Dirac functions (1 point)',
    lines(
      fn('w',x)+eq+sub(v('w'),zero)+par(fn('H',x+minus+sub(b,one))+minus+fn('H',x+minus+sub(b,two)))+plus+sub(v('W'),one)+fn('δ',x+minus+sub(a,one))+plus+sub(v('W'),two)+fn('δ',x+minus+sub(a,two))
    ),
    'Kiriş diferansiyel denklemi EI y^{(4)}(x) = w(x) olup tekil yükler Dirac deltasıyla, yayılı yükler pencere darbesiyle yazılır.',
    'The governing beam ODE is EI y^{(4)}(x) = w(x), modeling point loads as deltas and distributed loads as pulses.'
  ),
  step(
    '2. Yayılı yükün Laplace dönüşümünü yaz (1 puan)',
    '2. Evaluate the Laplace transform of the distributed load (1 point)',
    lines(
      L+p(sub(v('w'),zero)+par(fn('H',x+minus+sub(b,one))+minus+fn('H',x+minus+sub(b,two))))+eq+sub(v('w'),zero)+f(exp(minus+sub(b,one)+s)+minus+exp(minus+sub(b,two)+s),s)
    ),
    'Pencere darbesi iki gecikmeli basamak farkı olarak s paydasıyla dönüşür.',
    'The pulse transforms as the difference of two shifted steps divided by s.'
  ),
  step(
    '3. Tekil nokta yüklerin Laplace dönüşümünü al (1 puan)',
    '3. Transform the concentrated point loads (1 point)',
    lines(
      L+p(sub(v('W'),one)+fn('δ',x+minus+sub(a,one))+plus+sub(v('W'),two)+fn('δ',x+minus+sub(a,two)))+eq+sub(v('W'),one)+exp(minus+sub(a,one)+s)+plus+sub(v('W'),two)+exp(minus+sub(a,two)+s)
    ),
    'Konsantre nokta yükler paydada s olmadan doğrudan üstel gecikmeler e^{-a_i s} üretir.',
    'Concentrated point loads transform directly to exponentials e^{-a_i s} without dividing by s.'
  ),
  step(
    '4. Toplam yük spektrumu W(s)\'i kur (1 puan)',
    '4. Assemble the complete load spectrum W(s) (1 point)',
    lines(
      v('W')+p(s)+eq+f(sub(v('w'),zero),s)+par(exp(minus+sub(b,one)+s)+minus+exp(minus+sub(b,two)+s))+plus+sub(v('W'),one)+exp(minus+sub(a,one)+s)+plus+sub(v('W'),two)+exp(minus+sub(a,two)+s)
    ),
    'Tüm yük bileşenleri cebirsel olarak bir araya getirilerek kiriş çözümüne hazır hale getirilir.',
    'All load components are algebraically assembled for beam deflection solution.'
  ),
  step(
    '5. Kesme kuvveti sıçramasını Dirac integraliyle doğrula (1 puan)',
    '5. Verify the shear force jump via delta integration (1 point)',
    lines(
      o('Δ')+v('V')+eq+defInt(sub(a,one)+minus+eps,sub(a,one)+plus+eps,fn('w',x)+dx)+eq+sub(v('W'),one)+defInt(sub(a,one)+minus+eps,sub(a,one)+plus+eps,fn('δ',x+minus+sub(a,one))+dx)+eq+sub(v('W'),one)
    ),
    'Kiriş kesme kuvvetindeki ani basamak sıçraması noktasal yük W_1\'e eşittir; Dirac delta integrali bu süreksizliği tam açıklar.',
    'The jump discontinuity in beam shear force equals W_1, rigorously explained by the delta integral.'
  )
];

const clinicProblem3=[
  step(
    '1. Darbe uyarılı tek serbestlik dereceli titreşim denklemini kur (1 puan)',
    '1. Formulate the impulse-excited single-DOF oscillator (1 point)',
    lines(
      v('m')+fn('x',t)+sub(o('′′'),t)+plus+k+fn('x',t)+eq+I+fn('δ',t+minus+sub(t,zero))+o(' , ')+fn('x',zero)+eq+zero+o(' , ')+prime('x')+p(zero)+eq+zero
    ),
    'm kütleli ve k yay rijitlikli sisteme t = t_0 anında I büyüklüğünde ani bir çekiç darbesi uygulanır.',
    'An oscillator of mass m and stiffness k is struck by an impulse of magnitude I at t = t_0.'
  ),
  step(
    '2. Denklemin her iki tarafının Laplace dönüşümünü al (1 puan)',
    '2. Take the Laplace transform of both sides (1 point)',
    lines(
      v('m')+pow(s,two)+v('X')+p(s)+plus+k+v('X')+p(s)+eq+I+exp(minus+sub(t,zero)+s)
    ),
    'Başlangıç koşulları sıfır olduğundan türev terimlerinden ilave terim gelmez; sağ taraf I e^{-t_0 s} olur.',
    'Zero initial conditions eliminate derivative terms, leaving I e^{-t_0 s} on the right.'
  ),
  step(
    '3. X(s) transfer fonksiyonu biçiminde çöz (1 puan)',
    '3. Solve for X(s) in transfer function format (1 point)',
    lines(
      v('X')+p(s)+eq+f(I,v('m'))+cdot+f(exp(minus+sub(t,zero)+s),pow(s,two)+plus+pow(w,two))+o(' , ')+w+eq+v('√')+f(k,v('m'))
    ),
    'Doğal frekans ω_0 = √(k/m) cinsinden s² + ω_0² harmonik paydası elde edilir.',
    'The characteristic harmonic denominator s² + ω_0² emerges with natural frequency ω_0 = √(k/m).'
  ),
  step(
    '4. Ters Laplace ile darbe yanıtını (Green fonksiyonu) bul (1 puan)',
    '4. Invert to obtain the impulse response (Green\'s function) (1 point)',
    lines(
      fn('x',t)+eq+f(I,v('m')+w)+sin(w+par(t+minus+sub(t,zero)))+fn('H',t+minus+sub(t,zero))
    ),
    'İkinci kaydırma kuralıyla t < t_0 için sistem hareketsizdir; t ≥ t_0 için sinüzoidal serbest titreşim başlar.',
    'By the second shift, motion is zero before t_0 and purely sinusoidal free vibration thereafter.'
  ),
  step(
    '5. t = t_0 anındaki anlık hız sıçramasını doğrula (1 puan)',
    '5. Verify the instantaneous velocity jump at t = t_0 (1 point)',
    lines(
      prime('x')+p(sub(t,zero)+plus+zero)+eq+f(I,v('m')+w)+cdot+w+cos(zero)+eq+f(I,v('m'))+imp+o('Δ')+v('v')+eq+f(I,v('m'))
    ),
    'Darbe anındaki hız sıçraması Δv = I/m olup İtki-Momentum Prensibi m Δv = I tam sağlanır.',
    'The velocity step Δv = I/m validates the impulse-momentum balance m Δv = I exactly.'
  )
];

const clinicProblem4=[
  step(
    '1. t = 1 darbesi için modülasyon süzmesini yap (2 puan)',
    '1. Evaluate sifting for the t = 1 polynomial term (2 points)',
    lines(
      par(pow(t,two)+minus+four+t+plus+seven)+fn('δ',t+minus+one)+imp+par(one+minus+four+plus+seven)+exp(minus+s)+eq+four+exp(minus+s)
    ),
    't = 1 konulduğunda 1 − 4 + 7 = 4 olur; dönüşüm 4 e^{-s} terimini verir.',
    'Substituting t = 1 yields 1 − 4 + 7 = 4, giving the transform 4 e^{-s}.'
  ),
  step(
    '2. t = 4 üstel darbesi için süzme uygula (1 puan)',
    '2. Evaluate sifting for the t = 4 exponential term (1 point)',
    lines(
      three+exp(minus+two+t)+fn('δ',t+minus+four)+imp+three+exp(minus+eight)+exp(minus+four+s)
    ),
    't = 4 noktasında üstel çarpan 3 e^{-8} sabitini üretir ve e^{-4s} ile ötelenir.',
    'At t = 4, the factor evaluates to 3 e^{-8}, shifted by e^{-4s}.'
  ),
  step(
    '3. t = 1/2 trigonometrik darbesi için süzme uygula (1 puan)',
    '3. Evaluate sifting for the t = 1/2 trigonometric term (1 point)',
    lines(
      t+sin(v('π')+t)+fn('δ',t+minus+f(one,two))+imp+f(one,two)+sin(f(v('π'),two))+exp(minus+f(one,two)+s)+eq+f(one,two)+exp(minus+f(s,two))
    ),
    'sin(π/2) = 1 olduğundan katsayı 1/2 ve gecikme e^{-s/2} olur.',
    'Since sin(π/2) = 1, the coefficient is 1/2 and delay is e^{-s/2}.'
  ),
  step(
    '4. Terimleri süperpozisyonla birleştir (1 puan)',
    '4. Combine terms via linearity (1 point)',
    lines(
      F+p(s)+eq+four+exp(minus+s)+plus+three+exp(minus+eight)+exp(minus+four+s)+plus+f(one,two)+exp(minus+f(s,two))
    ),
    'Üç darbe bileşeni toplanarak toplam Laplace dönüşümü elde edilir.',
    'The three impulse components are summed for the complete transform.'
  ),
  step(
    '5. s → ∞ limit davranışını ve yakınsama apsisini doğrula (1 puan)',
    '5. Verify s → ∞ limit behavior and convergence abscissa (1 point)',
    lines(
      o('lim')+sub(s,to+infty)+F+p(s)+eq+zero+o(' , ')+sub(s,zero)+eq+zero
    ),
    'Tüm gecikmeler a_i > 0 olduğundan s > 0 için spektrum sınırlıdır ve s → ∞ iken sıfıra gider.',
    'Because all delays a_i > 0, the spectrum is bounded for s > 0 and vanishes as s → ∞.'
  )
];

export const diracStudySupport={
  paths:[
    {
      id:'pulse-limit',
      title:T('Darbe Limiti ile Dirac Dönüşümü Türetimi','Dirac Transform Derivation via Pulse Limit'),
      prompt:T(
        'Genişliği ε sıfıra giderken sonlu dikdörtgen darbeden ideal Dirac deltasına ve L{δ(t-a)} = e^{-as} kuralına geçiş.',
        'Transitioning from finite rectangular pulses to the ideal Dirac delta and L{δ(t-a)} = e^{-as} as ε → 0.'
      ),
      summary:T(
        'Genişliği ε sıfıra giderken sonlu dikdörtgen darbeden ideal Dirac deltasına ve L{δ(t-a)} = e^{-as} kuralına geçiş.',
        'Transitioning from finite rectangular pulses to the ideal Dirac delta and L{δ(t-a)} = e^{-as} as ε → 0.'
      ),
      reflection:T(
        'Tepe yüksekliği sonsuza giderken altındaki alanın sabit kalmasını fiziksel bir çarpışma (itki) ile nasıl ilişkilendirirsin?',
        'How do you connect an infinite force spike with constant enclosed area to physical impact impulse?'
      ),
      steps:pathPulseLimit
    },
    {
      id:'sifting-property',
      title:T('Süzme Teoremi ve Modüle Darbe Dönüşümü','Sifting Property & Modulated Impulses'),
      prompt:T(
        'Dirac deltasının test fonksiyonlarıyla integrallenmesi, süzme (sifting) kuralı ve modüle darbeler.',
        'Integrating Dirac deltas against test functions, sifting property, and modulated impulses.'
      ),
      summary:T(
        'Dirac deltasının test fonksiyonlarıyla integrallenmesi, süzme (sifting) kuralı ve modüle darbeler.',
        'Integrating Dirac deltas against test functions, sifting property, and modulated impulses.'
      ),
      reflection:T(
        'Süzme özelliğinin integrali yok edip anlık değere dönüştürmesi Laplace dönüşümünü nasıl pratikleştirir?',
        'How does sifting eliminate integration and collapse transforms into instantaneous evaluation?'
      ),
      steps:pathSifting
    }
  ],
  predictions:[
    {
      id:'delta-origin',
      question:T(
        'a = 0 anındaki ideal birim Dirac darbesi δ(t) için Laplace dönüşümü ℒ{δ(t)} neye eşittir?',
        'What is the Laplace transform ℒ{δ(t)} of the unit Dirac delta centered at the origin a = 0?'
      ),
      context:T(
        'Gecikmeli darbe dönüşümü ℒ{δ(t − a)} = e^{-as} formülünde a = 0 özel durumunu düşün.',
        'Consider the special case a = 0 in the delayed impulse transform ℒ{δ(t − a)} = e^{-as}.'
      ),
      choices:T(
        [
          '1 (Frekans bölgesinde tüm spektrum boyunca sabit)',
          '1 / s (Birim basamak fonksiyonunun dönüşümü)',
          '0 (Darbe anında integral sıfırlanır)'
        ],
        [
          '1 (Constant flat spectrum across all frequencies)',
          '1 / s (Transform of the unit step function)',
          '0 (The integral vanishes instantaneously)'
        ]
      ),
      answer:0,
      reason:T(
        'Harika! e^{-as} formülünde a = 0 konulduğunda e^0 = 1 elde edilir. δ(t) birim alana sahip sonsuz dar bir pik olduğundan tüm frekansları eşit oranda uyarır.',
        'Correct! Setting a = 0 in e^{-as} gives e^0 = 1. An instantaneous impulse excites all frequencies uniformly with infinite bandwidth.'
      ),
      math:'<mi mathvariant="script">L</mi><mo>{</mo><mi>δ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>}</mo><mo>=</mo><msup><mi>e</mi><mrow><mo>−</mo><mn>0</mn><mo>·</mo><mi>s</mi></mrow></msup><mo>=</mo><mn>1</mn>',
      try:T(
        'Aşağıdaki laboratuvarda a sürgüsünü 0\'a getirerek spektrum çizgisini incele.',
        'In the lab below, set the delay slider a to 0 and observe the flat spectrum.'
      )
    },
    {
      id:'unilateral-boundary',
      question:T(
        't = −2 anında etkiyen bir darbenin tek taraflı Laplace dönüşümü ℒ{δ(t + 2)} nedir?',
        'What is the unilateral Laplace transform ℒ{δ(t + 2)} of an impulse acting at t = −2?'
      ),
      context:T(
        'Tek taraflı Laplace dönüşümü t ekseninde yalnızca [0, ∞) aralığını tarar.',
        'The unilateral Laplace transform integrates strictly over [0, ∞).'
      ),
      choices:T(
        [
          '0 (İntegrasyon aralığı [0, ∞) dışında kaldığı için sıfırdır)',
          'e^{2s} (Negatif gecikme kuralı)',
          'e^{-2s} (Pozitif gecikme ile aynı)'
        ],
        [
          '0 (Zero because the impulse lies strictly outside the [0, ∞) domain)',
          'e^{2s} (Negative delay rule)',
          'e^{-2s} (Identical to positive delay)'
        ]
      ),
      answer:0,
      reason:T(
        'Kesinlikle doğru! Tek taraflı Laplace dönüşümünün integrasyon sınırları [0, ∞) aralığındadır. t = −2 darbesi bu aralığın dışındadır, bu nedenle dönüşüme hiçbir katkısı yoktur (Örnek 6.10).',
        'Spot on! The unilateral Laplace transform integrates on [0, ∞). Since t = −2 is outside this domain, its contribution is zero (Example 6.10).'
      ),
      math:'<mi mathvariant="script">L</mi><mo>{</mo><mi>δ</mi><mo>(</mo><mi>t</mi><mo>+</mo><mn>2</mn><mo>)</mo><mo>}</mo><mo>=</mo><msubsup><mo>∫</mo><mn>0</mn><mi>∞</mi></msubsup><msup><mi>e</mi><mrow><mo>−</mo><mi>s</mi><mi>t</mi></mrow></msup><mi>δ</mi><mo>(</mo><mi>t</mi><mo>+</mo><mn>2</mn><mo>)</mo><mi>d</mi><mi>t</mi><mo>=</mo><mn>0</mn>',
      try:T(
        'Aşağıdaki laboratuvarda Örnek 6.10 Çoklu Darbe Katarı önayarını incele.',
        'In the lab below, select the Example 6.10 Multi-Impulse preset.'
      )
    }
  ]
};

export const diracExamClinic=[
  {
    badge:'ÖRNEK 6.10 · 6 PUAN',
    badgeEn:'EXAMPLE 6.10 · 6 POINTS',
    statement:{
      tr:'ℒ{cos(πt) δ(t + 1) + 2 cos(πt / 6) δ(t − 2) + (t³ − 2t² + 5)e^{4t} δ(t − 3)} ifadesini süzme özelliğiyle adım adım hesaplayınız.',
      en:'Evaluate ℒ{cos(πt) δ(t + 1) + 2 cos(πt / 6) δ(t − 2) + (t³ − 2t² + 5)e^{4t} δ(t − 3)} step by step via sifting.'
    },
    trap:{
      tr:'Tuzak: δ(t + 1) terimini dikkatsizce e^s olarak yazmak! Tek taraflı Laplace dönüşümünde t < 0 darbeleri tamamen elenir.',
      en:'Trap: Blindly evaluating δ(t + 1) as e^s! Unilateral Laplace transforms strictly ignore impulses at t < 0.'
    },
    steps:clinicProblem1
  },
  {
    badge:'KİRİŞ YÜKLEMESİ · 5 PUAN',
    badgeEn:'BEAM LOADING · 5 POINTS',
    statement:{
      tr:'Tekil yükler W₁ δ(x − a₁), W₂ δ(x − a₂) ve yayılı yük w₀[H(x − b₁) − H(x − b₂)] altındaki kirişin Laplace yük spektrumunu W(s) ve kesme sıçramasını belirleyiniz.',
      en:'Determine the Laplace load spectrum W(s) and shear force jump for a beam under concentrated and distributed loads.'
    },
    trap:{
      tr:'Tuzak: Dirac delta nokta yüklerini yayılı yük gibi s paydasına bölmek! Tekil yükün dönüşümünde s paydası yoktur.',
      en:'Trap: Dividing point load deltas by s like distributed loads! Dirac deltas transform to pure exponentials without an s divisor.'
    },
    steps:clinicProblem2
  },
  {
    badge:'İTKİ VE MOMENTUM · 5 PUAN',
    badgeEn:'IMPULSE-MOMENTUM · 5 POINTS',
    statement:{
      tr:'m x″ + k x = I δ(t − t₀) osilatörünün sıfır başlangıç koşulları altında Green darbe yanıtını bulunuz ve anlık hız sıçramasını doğrulayınız.',
      en:'Find the impulse response (Green function) of m x″ + k x = I δ(t − t₀) from rest and verify the velocity jump.'
    },
    trap:{
      tr:'Tuzak: Darbe anında konumun x(t) sıçradığını sanmak! Darbe sadece hızda anlık Δv = I/m sıçraması yaratır; konum süreklidir.',
      en:'Trap: Assuming displacement jumps at impact! An impulse produces a step jump in velocity Δv = I/m; position remains continuous.'
    },
    steps:clinicProblem3
  },
  {
    badge:'MODÜLE KATAR · 6 PUAN',
    badgeEn:'MODULATED TRAIN · 6 POINTS',
    statement:{
      tr:'f(t) = (t² − 4t + 7)δ(t − 1) + 3e^{−2t}δ(t − 4) + t sin(πt)δ(t − 1/2) çoklu darbe sinyalinin Laplace dönüşümünü bulunuz.',
      en:'Evaluate the Laplace transform of the multi-impulse signal f(t) = (t² − 4t + 7)δ(t − 1) + 3e^{−2t}δ(t − 4) + t sin(πt)δ(t − 1/2).'
    },
    trap:{
      tr:'Tuzak: Değişkenleri t olarak bırakmak! Süzme kuralı uygulandıktan sonra geriye t kalmaz; her katsayı sayısal bir sabite dönüşür.',
      en:'Trap: Leaving variables in terms of t! Sifting eliminates t entirely, reducing each coefficient to a numerical constant.'
    },
    steps:clinicProblem4
  }
];
