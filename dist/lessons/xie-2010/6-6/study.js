import {T,step,v,n,o,p,f,pow,sub,prime,eq,plus,minus,x,y,t,C,fn,exp,integral,lines} from '../../../study/math.js';

const r=s=>`<mrow>${s}</mrow>`;
const zero=n(0),one=n(1),two=n(2),three=n(3),four=n(4),five=n(5),six=n(6),seven=n(7),eight=n(8),nine=n(9),ten=n(10);
const s=v('s'),w=v('ω'),a=v('a'),b=v('b'),c=v('c'),k=v('k'),m=v('m'),u=v('u'),F=v('F'),L=v('ℒ'),H=v('H'),X=v('X'),I=v('I'),V=v('V'),R=v('R'),Q=v('Q'),Y=v('Y');
const dt=v('d')+t,du=v('d')+u,ds=v('d')+s,dx=v('d')+x;
const infty=v('∞'),pi=v('π'),zeta=v('ζ'),beta=v('β');
const sin=arg=>fn('sin',arg),cos=arg=>fn('cos',arg),par=arg=>p(arg);
const imp=o('⇒'),cdot=o('·'),gt=o('>'),to=o('→'),neq=o('≠'),ast=o('∗');
const Linv=pow(L,minus+one);

const pathSdofVibe=[
  step(
    '1. Tek serbestlik dereceli hareket denklemini ve parametrelerini kur',
    '1. Formulate the SDOF equation of motion and parameters',
    lines(
      m+pow(x,prime+prime)+plus+c+pow(x,prime)+plus+k+x+eq+fn('f',t)+imp+pow(x,prime+prime)+plus+two+zeta+sub(w,v('n'))+pow(x,prime)+plus+pow(sub(w,v('n')),two)+x+eq+f(fn('f',t),m)
    ),
    'Doğal frekans ω_n = √(k/m) ve sönüm oranı ζ = c / (2√(km)) standart dinamik parametrelerdir.',
    'Natural frequency ω_n = √(k/m) and damping ratio ζ = c / (2√(km)) are the canonical modal parameters.'
  ),
  step(
    '2. Dış darbe veya rampa zorlamasını Heaviside basamakları ile yaz',
    '2. Formulate external pulse or ramp forcing using Heaviside functions',
    lines(
      fn('f',t)+eq+f(sub(F,zero),sub(t,one))+par(t+minus+par(t+minus+sub(t,one))+H+p(t+minus+sub(t,one)))
    ),
    'Parçalı rampa yükü t = t₁ anında basamak farkı ile doyuma ulaştırılır.',
    'A piecewise ramp loading reaches its plateau at t = t₁ via step subtraction.'
  ),
  step(
    '3. Laplace dönüşümünü alarak transfer fonksiyonunu oluştur',
    '3. Apply Laplace transform to construct the transfer function',
    lines(
      X+p(s)+eq+fn('H',s)+F+p(s)+eq+f(one,m+par(pow(s,two)+plus+two+zeta+sub(w,v('n'))+s+plus+pow(sub(w,v('n')),two)))+F+p(s)
    ),
    'Sistemin s-bölgesindeki transfer fonksiyonu giriş kuvvetini doğrudan çıkış deplasmanına bağlar.',
    'The transfer function H(s) maps input force directly to output displacement.'
  ),
  step(
    '4. Birim rampa ve darbe yanıtı çekirdeklerini ters çevir',
    '4. Invert elementary ramp and impulse response kernels',
    lines(
      fn('h',t)+eq+Linv+p(fn('H',s))+eq+f(one,m+sub(w,v('d')))+exp(minus+zeta+sub(w,v('n'))+t)+sin(sub(w,v('d'))+t)
    ),
    'Sönümlü doğal frekans ω_d = ω_n √(1 − ζ²) altında Green impuls yanıtı h(t) elde edilir.',
    'The Green impulse response kernel h(t) oscillates at damped frequency ω_d = ω_n √(1 − ζ²).'
  ),
  step(
    '5. Süperpozisyon ile toplam dinamik deformasyonu hesapla',
    '5. Superpose components to obtain total dynamic response',
    lines(
      x+p(t)+eq+sub(x,v('rampa'))+p(t)+minus+sub(x,v('rampa'))+p(t+minus+sub(t,one))+H+p(t+minus+sub(t,one))
    ),
    't ≥ t₁ için gecikmeli basamak terimi devreye girerek kalıcı salınımı veya sönümü tamamlar.',
    'For t ≥ t₁, delayed terms engage to yield the complete steady or decaying response.'
  )
];

const pathRlcAndBeam=[
  step(
    '1. RLC devresi veya elastik zemin kirişinin diferansiyel denklemini yaz',
    '1. Formulate governing ODE for RLC circuit or beam on elastic foundation',
    lines(
      L+pow(v('q'),prime+prime)+plus+R+pow(v('q'),prime)+plus+f(one,C)+v('q')+eq+fn('v',t)+o(' , ')+v('EI')+pow(y,prime+prime+prime+prime)+plus+k+y+eq+fn('w',x)
    ),
    'Elektrik devrelerinde yük q(t), kiriş problemlerinde ise düşey çökme y(x) ana durum değişkenidir.',
    'Charge q(t) governs electric circuits, while vertical deflection y(x) governs foundation beams.'
  ),
  step(
    '2. Periyodik girişler için periyodik Laplace dönüşümü teoremini kur',
    '2. Formulate periodic Laplace transform theorem for cyclic inputs',
    lines(
      L+p(sub(fn('f',t),v('per')))+eq+f(one,one+minus+exp(minus+s+v('T')))+integral+exp(minus+s+t)+fn('f',t)+dt
    ),
    'Bir periyotluk integral 1 / (1 − e^{-sT}) çarpanı ile sonsuz periyodik diziye yükseltilir.',
    'Integration over one period scaled by 1 / (1 − e^{-sT}) represents the infinite periodic train.'
  ),
  step(
    '3. Elastik zeminde karakteristik dalga sayısını hesapla',
    '3. Evaluate characteristic wavenumber on elastic foundation',
    lines(
      beta+eq+pow(f(k,four+v('EI')),f(one,four))+imp+pow(s,four)+plus+four+pow(beta,four)+eq+zero
    ),
    'Karakteristik kökler s = ±β(1 ± i) karmaşık eşlenik dörtlüsünü oluşturur.',
    'Roots form the quadruplet s = ±β(1 ± i), yielding damped spatial sinusoids.'
  ),
  step(
    '4. Dirac delta noktasal yükünü s-bölgesine ekle',
    '4. Insert Dirac delta point load into the transformed equation',
    lines(
      fn('w',x)+eq+sub(v('P'),zero)+fn('δ',x+minus+a)+imp+v('W')+p(s)+eq+sub(v('P'),zero)+exp(minus+a+s)
    ),
    'Tekil yük etkisi s-bölgesinde doğrudan üstel faz çarpanı e^{-as} ile temsil edilir.',
    'A concentrated load is represented compactly in the transformed domain by e^{-as}.'
  ),
  step(
    '5. Ters dönüşüm ile uzaysal sönümlü dalgayı elde et',
    '5. Invert to obtain the spatially damped deflection wave',
    lines(
      y+p(x)+eq+f(sub(v('P'),zero)+beta,two+k)+exp(minus+beta+par(v('|')+x+minus+a+v('|')))+par(cos(beta+par(v('|')+x+minus+a+v('|')))+plus+sin(beta+par(v('|')+x+minus+a+v('|'))))
    ),
    'Çökme yük noktasında tepe yapar ve yükten uzaklaştıkça üstel olarak hızla sıfıra söner.',
    'Deflection peaks directly beneath the load and decays exponentially away from it.'
  )
];

const clinicProblem1=[
  step(
    '1. Örnek 6.20: SDOF rampa zorlama fonksiyonunu Heaviside ile kur (1 puan)',
    '1. Example 6.20: Express SDOF ramp forcing using Heaviside functions (1 point)',
    lines(
      fn('f',t)+eq+f(sub(F,zero),sub(t,one))+t+minus+f(sub(F,zero),sub(t,one))+par(t+minus+sub(t,one))+H+p(t+minus+sub(t,one))
    ),
    't < t₁ aralığında doğrusal artış, t ≥ t₁ için sabit F₀ platosu basamak farkı ile kurulur.',
    'Linear ramp for t < t₁ and constant plateau F₀ for t ≥ t₁ are written in a single line.'
  ),
  step(
    '2. Sağ tarafın Laplace dönüşümünü al (1 puan)',
    '2. Take the Laplace transform of the ramp forcing (1 point)',
    lines(
      F+p(s)+eq+f(sub(F,zero),sub(t,one))+f(one,pow(s,two))+par(one+minus+exp(minus+sub(t,one)+s))
    ),
    'İkinci kaydırma kuralı gereği gecikmeli basamak terimi e^{-t₁ s} çarpanı üretir.',
    'The delayed step translates to e^{-t₁ s} in the s-domain.'
  ),
  step(
    '3. Karakteristik osilatör denklemini çöz (1 puan)',
    '3. Solve the characteristic oscillator equation (1 point)',
    lines(
      X+p(s)+eq+f(sub(F,zero),m+sub(t,one))+f(one+minus+exp(minus+sub(t,one)+s),pow(s,two)+par(pow(s,two)+plus+two+zeta+sub(w,v('n'))+s+plus+pow(sub(w,v('n')),two)))
    ),
    'Tüm başlangıç koşulları sıfır olduğundan hareket tamamen zorlanmış yanıt transfer fonksiyonuna eşittir.',
    'Zero initial conditions make the motion purely governed by the forced transfer function.'
  ),
  step(
    '4. Birim rampa çekirdeğinin ters Laplace dönüşümünü al (1 puan)',
    '4. Invert the elementary unit-ramp kernel (1 point)',
    lines(
      Linv+p(f(one,pow(s,two)+par(pow(s,two)+plus+pow(sub(w,v('n')),two))))+eq+f(t,pow(sub(w,v('n')),two))+minus+f(sin(sub(w,v('n'))+t),pow(sub(w,v('n')),three))
    ),
    'Sönümsüz osilatör için basit kesir ayrışımı t/ω_n² − sin(ω_n t)/ω_n³ verir.',
    'Partial fraction expansion yields the ramp kernel t/ω_n² − sin(ω_n t)/ω_n³.'
  ),
  step(
    '5. İki aralık için tam dinamik çözümü birleştir (2 puan)',
    '5. Superpose the two components for the complete dynamic trajectory (2 points)',
    lines(
      x+p(t)+eq+f(sub(F,zero),k+sub(t,one))+par(t+minus+f(sin(sub(w,v('n'))+t),sub(w,v('n'))))+minus+f(sub(F,zero),k+sub(t,one))+par(par(t+minus+sub(t,one))+minus+f(sin(sub(w,v('n'))+par(t+minus+sub(t,one))),sub(w,v('n'))))+H+p(t+minus+sub(t,one))
    ),
    't ≥ t₁ anında statik deformasyon F₀/k etrafında harmonik salınım kalır.',
    'For t ≥ t₁, residual harmonic oscillation persists centered about static deflection F₀/k.'
  )
];

const clinicProblem2=[
  step(
    '1. Örnek 6.21: Yarım sinüs patlama darbesini Heaviside basamakları ile kur (1 puan)',
    '1. Example 6.21: Express half-sine blast pulse via Heaviside steps (1 point)',
    lines(
      fn('f',t)+eq+sub(F,zero)+sin(f(pi+t,sub(t,zero)))+par(H+p(t)+minus+H+p(t+minus+sub(t,zero)))
    ),
    '0 ≤ t ≤ t₀ aralığında sinüs şok dalgası, t > t₀ için kuvvet sıfırdır.',
    'A half-sine blast pulse active for 0 ≤ t ≤ t₀ and zero thereafter.'
  ),
  step(
    '2. 2. kaydırma teoremi için trigonometrik özdeşliği uygula (1 puan)',
    '2. Apply trigonometric identity for the 2nd shifting theorem (1 point)',
    lines(
      sin(f(pi+par(t+minus+sub(t,zero)+plus+sub(t,zero)),sub(t,zero)))+eq+minus+sin(f(pi+par(t+minus+sub(t,zero)),sub(t,zero)))
    ),
    'sin(u + π) = −sin u özdeşliği gecikmeli terimin işaretini artıya çevirir.',
    'The identity sin(u + π) = −sin u changes the sign of the delayed term.'
  ),
  step(
    '3. Şok dalgasının Laplace dönüşümünü al (1 puan)',
    '3. Take the Laplace transform of the shock pulse (1 point)',
    lines(
      F+p(s)+eq+sub(F,zero)+f(sub(w,v('p')),pow(s,two)+plus+pow(sub(w,v('p')),two))+par(one+plus+exp(minus+sub(t,zero)+s))
    ),
    'Burada darbe frekansı ω_p = π / t₀ olup parantez içi 1 + e^{-t₀ s} olur.',
    'Pulse frequency is ω_p = π / t₀, yielding the factor 1 + e^{-t₀ s}.'
  ),
  step(
    '4. Çözüm çekirdeğini basit kesirlerle tersine çevir (1 puan)',
    '4. Invert the solution kernel via partial fractions (1 point)',
    lines(
      fn('g',t)+eq+f(sub(F,zero),m+par(pow(sub(w,v('n')),two)+minus+pow(sub(w,v('p')),two)))+par(f(sub(w,v('p')),sub(w,v('n')))+sin(sub(w,v('n'))+t)+minus+sin(sub(w,v('p'))+t))
    ),
    'Rezonans dışı durumda (ω_p ≠ ω_n) iki farklı harmonik frekans süperpoze olur.',
    'Away from resonance (ω_p ≠ ω_n), two harmonic frequencies superpose.'
  ),
  step(
    '5. Darbe sonrası serbest salınım genliğini yaz (2 puan)',
    '5. Formulate post-pulse free vibration response (2 points)',
    lines(
      x+p(t)+eq+fn('g',t)+plus+fn('g',t+minus+sub(t,zero))+H+p(t+minus+sub(t,zero))
    ),
    't > t₀ anında darbe biter ve yapı serbest harmonik titreşimine devam eder.',
    'For t > t₀ the shock ends and the structure oscillates in pure free vibration.'
  )
];

const clinicProblem3=[
  step(
    '1. Örnek 6.22: RLC diferansiyel denklemini kur (1 puan)',
    '1. Example 6.22: Set up governing RLC circuit ODE (1 point)',
    lines(
      L+pow(v('q'),prime+prime)+plus+R+pow(v('q'),prime)+plus+f(one,C)+v('q')+eq+fn('v',t)
    ),
    'Seri RLC devresinde Kirchhoff voltaj kuralı yük q(t) cinsinden 2. mertebe ODE verir.',
    'Kirchhoff voltage law for series RLC produces a second-order ODE in charge q(t).'
  ),
  step(
    '2. Periyodik kare dalganın bir periyotluk Laplace dönüşümünü al (1 puan)',
    '2. Transform one period of the periodic square wave (1 point)',
    lines(
      sub(V,one)+p(s)+eq+integral+exp(minus+s+t)+sub(V,zero)+dt+eq+sub(V,zero)+f(one+minus+exp(minus+f(s+v('T'),two)),s)
    ),
    '0 ile T/2 arasında V₀, T/2 ile T arasında sıfır olan kare dalga dönüştürülür.',
    'Integrating over the active pulse window [0, T/2] yields the one-period transform.'
  ),
  step(
    '3. Periyodik formülle tam gerilim dönüşümünü yaz (1 puan)',
    '3. Apply periodic formula for the infinite pulse train (1 point)',
    lines(
      V+p(s)+eq+f(sub(V,one)+p(s),one+minus+exp(minus+s+v('T')))+eq+f(sub(V,zero),s+par(one+plus+exp(minus+f(s+v('T'),two))))
    ),
    '1 − e^{-sT} = (1 − e^{-sT/2})(1 + e^{-sT/2}) özdeşliği ile sadeleştirme yapılır.',
    'Factoring 1 − e^{-sT} simplifies the expression into 1 / (1 + e^{-sT/2}).'
  ),
  step(
    '4. Transfer fonksiyonu ile akım dönüşümünü kur (1 puan)',
    '4. Combine with circuit transfer function for current I(s) (1 point)',
    lines(
      I+p(s)+eq+s+Q+p(s)+eq+f(s+V+p(s),L+pow(s,two)+plus+R+s+plus+f(one,C))
    ),
    'Akım i(t) = dq/dt olduğundan s çarpanı devreye girer ve paydaki 1/s sadeleşir.',
    'Because current is i(t) = dq/dt, multiplication by s cancels the 1/s pole.'
  ),
  step(
    '5. Basamak süperpozisyonu ile periyodik akım yanıtını ifade et (1 puan)',
    '5. Formulate periodic current response via step superposition (1 point)',
    lines(
      fn('i',t)+eq+sub(fn('i',t),v('basamak'))+plus+two+par(minus+one)+sub(fn('i',t+minus+f(v('T'),two)),v('basamak'))+H+p(t+minus+f(v('T'),two))
    ),
    'Anahtarlama anlarında ters işaretli basamak akımları eklenerek periyodik çınlama elde edilir.',
    'Alternating step currents superimposed at each switching half-period yield the steady periodic ringing.'
  )
];

const clinicProblem4=[
  step(
    '1. Elastik zeminde 4. mertebeden kiriş denklemini yaz (1 puan)',
    '1. State 4th-order beam equation on elastic foundation (1 point)',
    lines(
      v('EI')+pow(y,prime+prime+prime+prime)+plus+k+y+eq+sub(v('P'),zero)+fn('δ',x+minus+a)
    ),
    'Demiryolu rayı veya yol kaplaması üzerinde x = a noktasında yoğunlaşmış P₀ yükü.',
    'A concentrated load P₀ at x = a on a rail or pavement beam.'
  ),
  step(
    '2. Karakteristik kökleri ve dalga boyunu belirle (1 puan)',
    '2. Identify characteristic roots and attenuation wavelength (1 point)',
    lines(
      pow(s,four)+plus+four+pow(beta,four)+eq+zero+imp+s+eq+beta+par(v('±')+one+v('±')+v('i'))
    ),
    'β = (k / 4EI)^{1/4} kirişin zemin elastik parametresidir.',
    'β = (k / 4EI)^{1/4} is the foundation stiffness parameter.'
  ),
  step(
    '3. Dirac deltası dönüşümü ile cebirsel denklemi kur (1 puan)',
    '3. Form algebraic equation using Dirac delta transform (1 point)',
    lines(
      v('EI')+par(pow(s,four)+plus+four+pow(beta,four))+Y+p(s)+eq+sub(v('P'),zero)+exp(minus+a+s)
    ),
    'Uzaysal Dirac deltası dönüşümde doğrudan e^{-as} çarpanı verir.',
    'The spatial Dirac delta maps directly to the exponential factor e^{-as}.'
  ),
  step(
    '4. Sonsuz kiriş sınır koşullarını (|x| → ∞ için y → 0) uygula (1 puan)',
    '4. Apply infinite beam boundary conditions (y → 0 as |x| → ∞) (1 point)',
    lines(
      sub(y,v('sol'))+eq+C+exp(beta+x)+par(cos(beta+x)+plus+sin(beta+x))+o(' , ')+sub(y,v('sağ'))+eq+C+exp(minus+beta+x)+par(cos(beta+x)+plus+sin(beta+x))
    ),
    'Sonsuzda sınırlılık gereği pozitif üstel artış terimleri elenir.',
    'Boundedness at infinity eliminates growing exponential modes.'
  ),
  step(
    '5. Tepe çökme ve nihai çökme eğrisini yaz (1 puan)',
    '5. State peak deflection and complete deflection curve (1 point)',
    lines(
      y+p(x)+eq+f(sub(v('P'),zero)+beta,two+k)+exp(minus+beta+par(v('|')+x+minus+a+v('|')))+par(cos(beta+par(v('|')+x+minus+a+v('|')))+plus+sin(beta+par(v('|')+x+minus+a+v('|'))))
    ),
    'Yük altında maksimum çökme y(a) = P₀ β / (2k) olup iki tarafa doğru hızla sönümlenir.',
    'Peak deflection y(a) = P₀ β / (2k) decays exponentially symmetrically away from the load.'
  )
];

export const laplaceAppStudySupport={
  paths:[
    {
      id:'sdof-vibe',
      title:T('SDOF Mekanik Titreşim ve Darbe Yükleri Çözüm Yolu','SDOF Vibration and Pulse Loading Solution Path'),
      prompt:T(
        'Tek serbestlik dereceli yapıların rampa ve şok darbeleri altındaki dinamik yanıtının Laplace ve Green integrali ile eldesi.',
        'Obtaining dynamic response of SDOF structures under ramp and blast pulses via Laplace and Green impulse methods.'
      ),
      summary:T(
        'Tek serbestlik dereceli yapıların rampa ve şok darbeleri altındaki dinamik yanıtının Laplace ve Green integrali ile eldesi.',
        'Obtaining dynamic response of SDOF structures under ramp and blast pulses via Laplace and Green impulse methods.'
      ),
      reflection:T(
        'Patlama süresi t₀ ile doğal periyot T_n arasındaki oran dinamik büyütme katsayısını (DMF) nasıl etkiler?',
        'How does the ratio between blast duration t₀ and natural period T_n govern the dynamic magnification factor (DMF)?'
      ),
      steps:pathSdofVibe
    },
    {
      id:'rlc-beam',
      title:T('Periyodik Sinyalli RLC Devreleri ve Elastik Kirişler','Periodic RLC Circuits and Elastic Foundation Beams'),
      prompt:T(
        'Periyodik kare dalga ile beslenen devrelerin ve zemin üstündeki kirişlerin Dirac darbesi ile çözümü.',
        'Solving periodic square-wave driven circuits and foundation beams under Dirac point loads.'
      ),
      summary:T(
        'Periyodik kare dalga ile beslenen devrelerin ve zemin üstündeki kirişlerin Dirac darbesi ile çözümü.',
        'Solving periodic square-wave driven circuits and foundation beams under Dirac point loads.'
      ),
      reflection:T(
        'Uzaysal Laplace dönüşümü 4. mertebe elastik kiriş sınır değer problemlerini nasıl tek bir cebirsel adıma indirger?',
        'How does spatial Laplace transformation collapse 4th-order beam boundary value problems into a single algebraic step?'
      ),
      steps:pathRlcAndBeam
    }
  ],
  predictions:[
    {
      id:'short-pulse-limit',
      question:T(
        'Tek serbestlik dereceli bir osilatöre uygulanan t₀ süreli bir patlama darbesinde, darbe süresi sistemin doğal periyodundan çok kısa olduğunda (t₀ ≪ T_n) sistem davranışı neye yakınsar?',
        'In a blast pulse of duration t₀ applied to an SDOF oscillator, what does the system response converge to when pulse duration is much shorter than natural period (t₀ ≪ T_n)?'
      ),
      context:T(
        'Darbe süresi sıfıra giderken net alan sabit kalırsa uyarım bir impuls gibi davranır.',
        'If pulse duration vanishes while the net area remains invariant, the forcing behaves as an impulse.'
      ),
      choices:T(
        [
          'Darbe ideal Dirac delta darbesi I δ(t) gibi davranır; tepe genlik yalnızca toplam alana (itkiye) bağlı olur',
          'Darbe o kadar hızlı geçer ki osilatör hiç hareket edemez',
          'Darbe genliği zamanla doğrusal büyüyerek anında rezonans yaratır'
        ],
        [
          'The pulse acts as an ideal Dirac impulse I δ(t); peak response depends solely on total impulse area',
          'The pulse passes so quickly that the oscillator fails to respond entirely',
          'The pulse amplitude grows linearly, instantly creating resonance'
        ]
      ),
      answer:0,
      reason:T(
        'Doğru! Darbe süresi doğal periyottan çok kısa olduğunda darbenin dalga şekli önemsizleşir; sistem yalnızca net itki I = ∫ f(t) dt kadar bir başlangıç hızı kazanmış gibi hareket eder.',
        'Correct! When pulse duration is far shorter than the natural period, pulse shape becomes irrelevant; the oscillator behaves as if given an initial velocity jump from net impulse I = ∫ f(t) dt.'
      ),
      math:'<mi>I</mi><mo>=</mo><msubsup><mo>∫</mo><mn>0</mn><msub><mi>t</mi><mn>0</mn></msub></msubsup><mi>F</mi><mo>(</mo><mi>t</mi><mo>)</mo><mi>d</mi><mi>t</mi><mo>,</mo><mspace width="0.8em"/><mi>x</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>→</mo><mfrac><mi>I</mi><mrow><mi>m</mi><msub><mi>ω</mi><mi>n</mi></msub></mrow></mfrac><mi>sin</mi><mo>(</mo><msub><mi>ω</mi><mi>n</mi></msub><mi>t</mi><mo>)</mo>',
      try:T(
        'Aşağıdaki laboratuvarda Şok Darbesi önayarını seçerek uyarım süresini t₀ küçülttüğünde darbe yanıtını izle.',
        'In the lab below, select the Shock Pulse preset and decrease duration t₀ to observe impulse response.'
      )
    },
    {
      id:'beam-elastic-decay',
      question:T(
        'Elastik zemin üzerindeki sonsuz bir kirişe tekil bir P₀ noktasal yükü uygulandığında, yükten uzaklaştıkça çökme y(x) nasıl davranır?',
        'When a concentrated point load P₀ is applied to an infinite beam on elastic foundation, how does deflection y(x) behave away from the load?'
      ),
      context:T(
        '4. mertebe kiriş karakteristik denklemi s⁴ + 4β⁴ = 0 karmaşık eşlenik köklere sahiptir.',
        'The 4th-order beam characteristic equation s⁴ + 4β⁴ = 0 yields complex conjugate roots.'
      ),
      choices:T(
        [
          'e^{-β|x - a|} çarpanı nedeniyle dalgalı bir formda ve üstel hızla sıfıra söner; deformasyon yerel kalır',
          'Tüm kiriş boyunca sabit bir çökme olarak sonsuza kadar devam eder',
          'Kiriş uçlarına doğru genliği sürekli artarak kararsızlığa gider'
        ],
        [
          'It decays exponentially fast in an oscillatory shape via e^{-β|x - a|}; deformation remains strictly localized',
          'It persists as a constant deflection indefinitely across the entire beam',
          'Its amplitude increases toward the beam ends, inducing instability'
        ]
      ),
      answer:0,
      reason:T(
        'Doğru! Elastik zemin kirişinin karakteristik kökleri karmaşık eşlenik ±β(1 ± i) olduğundan, e^{-β|x|} sönüm zarfı içinde harmonik dalgalanma oluşur ve yük etkisi birkaç dalgaboyu içinde tamamen sönümlenir.',
        'Correct! Characteristic roots ±β(1 ± i) yield harmonic oscillations enveloped by e^{-β|x|}, localizing the deflection within a few characteristic wavelengths.'
      ),
      math:'<mi>y</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mfrac><msub><mi>P</mi><mn>0</mn></msub><mrow><mn>8</mn><mi>E</mi><mi>I</mi><msup><mi>β</mi><mn>3</mn></msup></mrow></mfrac><msup><mi>e</mi><mrow><mo>−</mo><mi>β</mi><mo>|</mo><mi>x</mi><mo>−</mo><mi>a</mi><mo>|</mo></mrow></msup><mrow><mo>(</mo><mi>cos</mi><mi>β</mi><mo>|</mo><mi>x</mi><mo>−</mo><mi>a</mi><mo>|</mo><mo>+</mo><mi>sin</mi><mi>β</mi><mo>|</mo><mi>x</mi><mo>−</mo><mi>a</mi><mo>|</mo><mo>)</mo></mrow>',
      try:T(
        'Aşağıdaki laboratuvarda Elastik Kiriş önayarını seçerek tekil yük noktasından uzaklaştıkça çökmenin nasıl sıfırlandığını gör.',
        'In the lab below, select the Elastic Beam preset and watch the deflection vanish away from the load.'
      )
    }
  ]
};

export const laplaceAppExamClinic=[
  {
    badge:T('6 PUAN · ÖRNEK 6.20','6 POINTS · EXAMPLE 6.20'),
    statement:{
      tr:'m x\'\' + c x\' + k x = f(t) SDOF osilatörünün rampa yüklemesi f(t) = (F₀/t₁) [t − (t − t₁)H(t − t₁)] altındaki dinamik yanıtını Laplace dönüşümü ile bulunuz.',
      en:'Find the dynamic response of an SDOF oscillator under ramp loading f(t) = (F₀/t₁) [t − (t − t₁)H(t − t₁)] using the Laplace transform.'
    },
    trap:{
      tr:'Tuzak: t ≥ t₁ için kuvvetin sıfır olduğunu sanmak! t ≥ t₁ anında kuvvet sıfır değil, sabit F₀ platosuna oturur.',
      en:'Trap: Assuming force drops to zero for t ≥ t₁! At t ≥ t₁ forcing does not vanish; it sustains a constant plateau F₀.'
    },
    steps:clinicProblem1
  },
  {
    badge:T('6 PUAN · ÖRNEK 6.21','6 POINTS · EXAMPLE 6.21'),
    statement:{
      tr:'m x\'\' + k x = F₀ sin(π t / t₀) [H(t) − H(t − t₀)] yarım sinüs patlama darbesine maruz kalan sönümsüz osilatörün t > t₀ serbest salınım yanıtını bulunuz.',
      en:'Find post-blast free vibration response (t > t₀) of an undamped oscillator subjected to a half-sine blast pulse.'
    },
    trap:{
      tr:'Tuzak: sin(π t / t₀) H(t − t₀) terimini doğrudan geciktirmeye çalışmak! sin(π(u + t₀)/t₀) = −sin(π u / t₀) eksi işaretini hesaba katmak şarttır.',
      en:'Trap: Forgetting the phase shift when translating the sine! sin(π(u + t₀)/t₀) = −sin(π u / t₀) produces a sign flip.'
    },
    steps:clinicProblem2
  },
  {
    badge:T('5 PUAN · ÖRNEK 6.22','5 POINTS · EXAMPLE 6.22'),
    statement:{
      tr:'Periyodik kare dalga gerilimle beslenen bir RLC devresinde akım I(s) ifadesini periyodik Laplace dönüşümü kuralı ile kurunuz.',
      en:'Formulate current I(s) in an RLC circuit driven by a periodic square-wave voltage using the periodic Laplace transform.'
    },
    trap:{
      tr:'Tuzak: Periyodik integral paydasındaki 1 − e^{-sT} çarpanını unutmak! Periyodik sinyallerde tek periyot integrali 1 / (1 − e^{-sT}) ile bölünür.',
      en:'Trap: Omitting the 1 − e^{-sT} denominator! Periodic transforms require scaling the one-period integral by 1 / (1 − e^{-sT}).'
    },
    steps:clinicProblem3
  },
  {
    badge:T('5 PUAN · ELASTİK ZEMİN KİRİŞİ','5 POINTS · ELASTIC FOUNDATION BEAM'),
    statement:{
      tr:'EI y⁽⁴⁾(x) + k y(x) = P₀ δ(x − a) elastik zemine oturan sonsuz kirişin noktasal yük altındaki maksimum çökmesini ve sönümlü dalga formunu bulunuz.',
      en:'Find peak deflection and spatially damped wave shape for an infinite beam on elastic foundation under concentrated load P₀ δ(x − a).'
    },
    trap:{
      tr:'Tuzak: 4. mertebeden diferansiyel denklemin 4 serbest katsayısını tekil sınır koşulu olmadan çözmeye çalışmak! x → ±∞ için sınırlılık koşulu iki katsayıyı doğrudan sıfırlar.',
      en:'Trap: Attempting to determine 4 arbitrary constants without boundedness! Boundedness as |x| → ∞ eliminates positive exponential terms immediately.'
    },
    steps:clinicProblem4
  }
];
