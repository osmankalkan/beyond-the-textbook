import {T,step,v,n,o,p,f,pow,prime,eq,plus,minus,x,y,C,fn,exp,lines,r,sub} from '../../../study/math.js';

const zero = n(0), one = n(1), two = n(2), three = n(3), four = n(4), five = n(5), six = n(6), eight = n(8), nine = n(9);
const D = v('D'), lam = v('λ'), i = v('i'), A = v('A'), B = v('B'), u = v('u'), w = v('v');
const C0 = sub(C, zero), C1 = sub(C, one), C2 = sub(C, two), C3 = sub(C, three), C4 = sub(C, four);
const A1 = sub(A, one), A2 = sub(A, two), B1 = sub(B, one), B2 = sub(B, two);
const x2 = pow(x, two), x3 = pow(x, three);
const par = s => p(s);
const sqrt = s => `<msqrt>${r(s)}</msqrt>`;
const ex = exp(x), emx = exp(minus + x), e2x = exp(two + x), em2x = exp(minus + two + x);
const rt2x = sqrt(two) + x;

/** Display metadata for the §4.2 complementary-solution workshop. */
export const complementaryFamilies = {
  'distinct-real': {
    name: '(D² − 3D + 2)y = 0 · λ = 1, 2',
    method: par(pow(D, two) + minus + three + D + plus + two) + y + eq + zero + o('⇒') + y + eq + C1 + ex + plus + C2 + e2x,
    note: T(
      'Farklı gerçek kökler λ₁=1 ve λ₂=2 iki bağımsız üstel mod üretir: e^x ve e^{2x}. Başlangıç koşulları C₁=2y(0)−y′(0) ve C₂=y′(0)−y(0) katsayılarını belirler.',
      'Distinct real roots λ₁=1 and λ₂=2 produce two independent exponential modes: e^x and e^{2x}. Initial data fix C₁=2y(0)−y′(0) and C₂=y′(0)−y(0).'
    ),
    example: T(
      'Koşul B (y(0)=1, y′(0)=2) seçildiğinde C₁=0, C₂=1 olur ve yalnız hızlı mod e^{2x} kalır.',
      'Selecting Condition B (y(0)=1, y′(0)=2) gives C₁=0, C₂=1, isolating the fast mode e^{2x}.'
    )
  },
  'hyperbolic-pair': {
    name: '(D² − 4)y = 0 · λ = ±2',
    method: par(pow(D, two) + minus + four) + y + eq + zero + o('⇒') + y + eq + A + fn('cosh', two + x) + plus + B + fn('sinh', two + x),
    note: T(
      'Simetrik gerçek kök çifti λ=±2 için e^{2x} ve e^{-2x} yerine cosh 2x ve sinh 2x tabanı kullanılır. cosh(0)=1, sinh(0)=0 olduğundan A=y(0) ve B=y′(0)/2 doğrudan okunur.',
      'For the symmetric real pair λ=±2, the basis cosh 2x and sinh 2x replaces e^{2x} and e^{-2x}. Because cosh(0)=1 and sinh(0)=0, A=y(0) and B=y′(0)/2 are read off directly.'
    ),
    example: T(
      'Koşul A çift çözümü cosh 2x’i, Koşul B ise tek çözümü sinh 2x’i tek başına ayırır.',
      'Condition A isolates the even mode cosh 2x, while Condition B isolates the odd mode sinh 2x.'
    )
  },
  'damped-complex': {
    name: '(D² + 2D + 5)y = 0 · λ = −1 ± 2i',
    method: par(pow(D, two) + plus + two + D + plus + five) + y + eq + zero + o('⇒') + y + eq + emx + par(A + fn('cos', two + x) + plus + B + fn('sin', two + x)),
    note: T(
      'Karmaşık eşlenik kökler λ=−1±2i; gerçek kısım −1 üstel sönüm zarfı e^{-x} verir, sanal kısım 2 ise cos 2x ve sin 2x salınımını üretir.',
      'Complex conjugate roots λ=−1±2i; the real part −1 gives the exponential envelope e^{-x}, while the imaginary part 2 sets the oscillation frequency in cos 2x and sin 2x.'
    ),
    example: T(
      'y(0) ve y′(0) yalnız A ve B genlik/faz katsayılarını değiştirir; sıfır geçiş aralığı π/2 sabit kalır.',
      'Varying y(0) and y′(0) changes only the amplitude and phase via A and B; the zero-crossing spacing π/2 stays fixed.'
    )
  },
  'repeated-double': {
    name: '(D² − 4D + 4)y = 0 · λ = 2, 2',
    method: par(pow(D, two) + minus + four + D + plus + four) + y + eq + zero + o('⇒') + y + eq + par(C0 + plus + C1 + x) + e2x,
    note: T(
      'Çift katlı kök λ=2, 2 yalnız tek bir e^{2x} ürettiğinden ikinci bağımsız çözüm y=v(x)e^{2x} indirgemesiyle D²v=0’dan xe^{2x} olarak bulunur.',
      'Because the double root λ=2, 2 yields only one exponential e^{2x}, the second independent solution xe^{2x} comes from D²v=0 via the reduction y=v(x)e^{2x}.'
    ),
    example: T(
      'Koşul B (y(0)=0, y′(0)=2) seçildiğinde C₀=0 olur ve saf rezonans terimi 2xe^{2x} görünür.',
      'Choosing Condition B (y(0)=0, y′(0)=2) sets C₀=0 and displays the pure secular mode 2xe^{2x}.'
    )
  }
};

const pathComplex = [
  step(
    '1. Karakteristik denklemi kur',
    '1. Set up the characteristic equation',
    lines(par(pow(D, two) + plus + two + D + plus + three) + y + eq + zero, pow(lam, two) + plus + two + lam + plus + three + eq + zero),
    'Sabit katsayılı homojen denklemde y=e^{λx} denemesi her D türevini λ çarpanına çevirir. e^{λx}≠0 olduğundan karakteristik polinom sıfıra eşitlenir (Örnek 4.4).',
    'In a constant-coefficient homogeneous equation, trying y=e^{λx} turns each D into a factor of λ. Since e^{λx}≠0, the characteristic polynomial is set to zero (Example 4.4).'
  ),
  step(
    '2. Karmaşık eşlenik kökleri bul',
    '2. Find the complex conjugate roots',
    lines(pow(par(lam + plus + one), two) + plus + two + eq + zero, lam + eq + minus + one + o('±') + i + sqrt(two)),
    'Tam kareye tamamlama veya ikinci derece formülüyle kökler λ=−1±i√2 bulunur. Gerçek katsayılı polinomda karmaşık kökler daima eşlenik çift (α±iβ) olarak gelir; burada α=−1 ve β=√2’dir.',
    'Completing the square or using the quadratic formula gives λ=−1±i√2. For a real-coefficient polynomial, complex roots always come in conjugate pairs α±iβ; here α=−1 and β=√2.'
  ),
  step(
    '3. Üstel çözümü ve Euler formülünü yaz',
    '3. Write the exponential form and Euler’s formula',
    lines(y + eq + emx + par(C1 + exp(i + rt2x) + plus + C2 + exp(minus + i + rt2x)), exp(o('±') + i + rt2x) + eq + fn('cos', rt2x) + o('±') + i + fn('sin', rt2x)),
    'Ortak üstel çarpan e^{-x} parantez dışına alınır. e^{±i√2 x} terimleri Euler özdeşliği e^{iθ}=cos θ+i sin θ ile trigonometrik fonksiyonlara açılır.',
    'Factor out the common real exponential e^{-x}. Expand e^{±i√2 x} into trigonometric functions via Euler’s identity e^{iθ}=cos θ+i sin θ.'
  ),
  step(
    '4. Terimleri cos ve sin altında topla',
    '4. Regroup under cosine and sine',
    lines(y + eq + emx + par(par(C1 + plus + C2) + fn('cos', rt2x) + plus + i + par(C1 + minus + C2) + fn('sin', rt2x)), A + eq + C1 + plus + C2 + o(',') + B + eq + i + par(C1 + minus + C2)),
    'cos(√2 x) ve sin(√2 x) parantezlerinde yeni sabitler A=C₁+C₂ ve B=i(C₁−C₂) tanımlanır. Çözüm gerçek değerli olduğunda C₂=C̄₁ eşlenik koşulu A ve B’nin tamamen gerçek olmasını sağlar.',
    'Collect terms multiplying cos(√2 x) and sin(√2 x) and define A=C₁+C₂ and B=i(C₁−C₂). When the solution is real-valued, the conjugate condition C₂=C̄₁ guarantees that A and B are real.'
  ),
  step(
    '5. Gerçek değerli genel çözümü yaz ve doğrula',
    '5. State and verify the real general solution',
    lines(y + eq + emx + par(A + fn('cos', rt2x) + plus + B + fn('sin', rt2x))),
    'İkinci mertebe denklem için iki bağımsız gerçek çözüm e^{-x}cos(√2 x) ve e^{-x}sin(√2 x) elde edilir. Gerçek kısım α=−1 sönüm zarfını, sanal kısım β=√2 ise açısal frekansı belirler.',
    'We obtain two independent real solutions e^{-x}cos(√2 x) and e^{-x}sin(√2 x) for the second-order equation. The real part α=−1 governs the damping envelope and the imaginary part β=√2 sets the angular frequency.'
  )
];

const pathRepeated = [
  step(
    '1. Çift katlı kökü tespit et',
    '1. Identify the repeated double root',
    lines(par(pow(D, two) + minus + four + D + plus + four) + y + eq + zero, pow(par(lam + minus + two), two) + eq + zero + o('⇒') + lam + eq + two + o(',') + two),
    'Karakteristik denklem (λ−2)²=0 yalnız tek bir kök değeri (λ=2) verir (Örnek 4.8). Bu yüzden e^{2x} tek başına yalnız bir çözüm sağlar; ikinci mertebe için ikinci bir bağımsız çözüm gerekir.',
    'The characteristic equation (λ−2)²=0 yields a single root value λ=2 of multiplicity two (Example 4.8). Hence e^{2x} gives only one solution; a second independent solution is needed for order two.'
  ),
  step(
    '2. y = v(x)e^{2x} dönüşümünü uygula',
    '2. Apply the reduction substitution y = v(x)e^{2x}',
    lines(y + eq + w + e2x, D + y + eq + par(prime(w) + plus + two + w) + e2x, pow(D, two) + y + eq + par(prime(w, 2) + plus + four + prime(w) + plus + four + w) + e2x),
    'Bilinen üstel çarpan e^{2x} yanına bilinmeyen bir v(x) çarpanı koyarak y=v(x)e^{2x} denenir. Çarpım kuralıyla birinci ve ikinci türevler hesaplanır.',
    'Multiply the known exponential e^{2x} by an unknown factor v(x), setting y=v(x)e^{2x}. Compute the first and second derivatives by the product rule.'
  ),
  step(
    '3. Denkleme yerleştir ve sadeleştir',
    '3. Substitute into the equation and cancel',
    lines(par(par(prime(w, 2) + plus + four + prime(w) + plus + four + w) + minus + four + par(prime(w) + plus + two + w) + plus + four + w) + e2x + eq + zero, prime(w, 2) + e2x + eq + zero),
    'Türevler (D²−4D+4)y=0 içinde yerine konduğunda 4v′ ve 4v terimleri birbirini tam olarak götürür; geriye yalnız v″e^{2x}=0 kalır. Genel kaydırma kuralı: (D−a)^p(ve^{ax})=(D^p v)e^{ax}.',
    'Substituting the derivatives into (D²−4D+4)y=0 cancels the 4v′ and 4v terms completely, leaving v″e^{2x}=0. In general, the exponential shift gives (D−a)^p(ve^{ax})=(D^p v)e^{ax}.'
  ),
  step(
    '4. İndirgenmiş denklemi iki kez entegre et',
    '4. Integrate the reduced equation twice',
    lines(pow(D, two) + w + eq + zero + o('⇒') + prime(w) + eq + C1 + o('⇒') + w + eq + C0 + plus + C1 + x),
    'e^{2x}≠0 olduğundan denklem D²v=0 olur. İki ardışık integrasyon v(x)=C₀+C₁x doğrusal polinomunu üretir; p-katlı kökte D^p v=0 denklemi p-1 dereceli polinom verir.',
    'Since e^{2x}≠0, the equation reduces to D²v=0. Integrating twice gives the linear polynomial v(x)=C₀+C₁x; for a p-fold root, D^p v=0 yields a polynomial of degree p−1.'
  ),
  step(
    '5. Genel çözümü birleştir ve doğrula',
    '5. Assemble and verify the general solution',
    lines(y + eq + par(C0 + plus + C1 + x) + e2x),
    'Bulunan v(x) yerine yazılınca y=(C₀+C₁x)e^{2x} elde edilir. İki bağımsız çözüm e^{2x} ve xe^{2x}’tir; C₀+C₁x yerine yanlışlıkla tek sabitli C(1+x)e^{2x} yazmak serbestlik derecesini düşürür.',
    'Substituting v(x) back gives y=(C₀+C₁x)e^{2x}. The two independent solutions are e^{2x} and xe^{2x}; writing a single constant C(1+x)e^{2x} by mistake would lose a degree of freedom.'
  )
];

export const complementaryStudy = {
  title: T(
    'Karakteristik polinomu kur, kökleri sınıflandır ve her köke doğru çözüm ailesini eşle.',
    'Build the characteristic polynomial, classify its roots, and match each root to its solution family.'
  ),
  intro: T(
    'Sabit katsayılı homojen φ(D)y=0 denklemlerinde bütün bilgi φ(λ)=0 cebirsel denklemindedir. Farklı gerçek kökler üstel, simetrik ±β çiftleri hiperbolik, karmaşık eşlenikler sönümlü/salınımlı trigonometrik, katlı kökler ise x kuvvetiyle çarpılmış çözümler üretir.',
    'For constant-coefficient homogeneous equations φ(D)y=0, all information sits in the algebraic equation φ(λ)=0. Distinct real roots yield exponentials, symmetric ±β pairs yield hyperbolic functions, complex conjugates yield damped/oscillatory sinusoids, and repeated roots multiply by powers of x.'
  ),
  paths: [
    {
      title: T('Karmaşık eşlenik kökler ve Euler formülü (Örnek 4.4)', 'Complex conjugate roots and Euler’s formula (Example 4.4)'),
      prompt: T(
        '(D²+2D+3)y=0 denkleminde karmaşık kökler λ=−1±i√2 nasıl tamamen gerçek y=e^{-x}(A cos √2 x + B sin √2 x) çözümüne dönüşür?',
        'In (D²+2D+3)y=0, how do the complex roots λ=−1±i√2 turn into the purely real solution y=e^{-x}(A cos √2 x + B sin √2 x)?'
      ),
      steps: pathComplex,
      reflection: T(
        'Gerçek kısım α ile sanal kısım β çözüm grafiğinde hangi iki ayrı fiziksel özelliği kontrol eder?',
        'Which two distinct physical features of the solution graph are controlled by the real part α and the imaginary part β?'
      )
    },
    {
      title: T('Katlı kökler ve mertebe indirgeme (Örnek 4.8)', 'Repeated roots and reduction of order (Example 4.8)'),
      prompt: T(
        '(D²−4D+4)y=0 denkleminde çift katlı λ=2, 2 kökü neden y=v(x)e^{2x} dönüşümüyle ikinci çözüm olarak xe^{2x} üretir?',
        'In (D²−4D+4)y=0, why does the double root λ=2, 2 produce xe^{2x} as the second solution via the substitution y=v(x)e^{2x}?'
      ),
      steps: pathRepeated,
      reflection: T(
        'Üç katlı bir kök λ=a, a, a olsaydı indirgenmiş denklem D³v=0 hangi polinom çarpanını üretirdi?',
        'If a root λ=a, a, a had multiplicity three, what polynomial factor would the reduced equation D³v=0 produce?'
      )
    }
  ],
  predictions: [
    {
      id: 'damping-envelope',
      question: T('(D²+2D+5)y=0 denkleminde x arttıkça çözüm genliği nasıl davranır?', 'In (D²+2D+5)y=0, how does the solution amplitude behave as x increases?'),
      context: T('Karakteristik kökleri λ=−1±2i olarak bul ve gerçek kısmın işaretine bak.', 'Find the characteristic roots λ=−1±2i and check the sign of the real part.'),
      choices: T(
        ['e^{-x} zarfıyla sıfıra sönümlenirken 2 frekansıyla salınır', 'Sabit genlikle cos 2x ve sin 2x olarak salınır', 'e^{2x} çarpanıyla sınırsız büyür'],
        ['Decays to zero inside the envelope e^{-x} while oscillating at frequency 2', 'Oscillates with constant amplitude as cos 2x and sin 2x', 'Grows without bound with factor e^{2x}']
      ),
      answer: 0,
      reason: T(
        'λ²+2λ+5=(λ+1)²+4=0 kökleri λ=−1±2i’dir. Gerçek kısım α=−1 negatif olduğu için e^{-x} çarpanı genliği sıfıra bastırır; β=2 ise salınım frekansını belirler.',
        'The roots of λ²+2λ+5=(λ+1)²+4=0 are λ=−1±2i. Because the real part α=−1 is negative, the factor e^{-x} damps the amplitude to zero while β=2 sets the oscillation frequency.'
      ),
      math: y + eq + emx + par(A + fn('cos', two + x) + plus + B + fn('sin', two + x)),
      try: T(
        'Atölyede (D²+2D+5)y=0 ailesini seç ve Koşul A ile Koşul B eğrilerinin x büyüdükçe nasıl sıfıra yaklaştığını izle.',
        'Select the family (D²+2D+5)y=0 in the workshop and watch both Condition A and Condition B decay toward zero as x grows.'
      )
    },
    {
      id: 'repeated-count',
      question: T('(D−2)³y=0 denkleminin genel çözümü hangi bağımsız terimleri içerir?', 'Which independent terms form the general solution of (D−2)³y=0?'),
      context: T('p=3 katlı gerçek kök için D³v=0 indirgemesini hatırla.', 'Recall the reduction D³v=0 for a repeated real root of multiplicity p=3.'),
      choices: T(
        ['(C₀ + C₁x + C₂x²)e^{2x}', 'C₁e^{2x} + C₂e^{2x} + C₃e^{2x}', '(C₀ + C₁x³)e^{2x}'],
        ['(C₀ + C₁x + C₂x²)e^{2x}', 'C₁e^{2x} + C₂e^{2x} + C₃e^{2x}', '(C₀ + C₁x³)e^{2x}']
      ),
      answer: 0,
      reason: T(
        'λ=2 kökü 3 katlıdır; y=v(x)e^{2x} dönüşümü D³v=0 verir. Üç kez integrasyon v(x)=C₀+C₁x+C₂x² üretir; üç bağımsız çözüm e^{2x}, xe^{2x}, x²e^{2x} olur.',
        'The root λ=2 has multiplicity 3; substituting y=v(x)e^{2x} gives D³v=0. Integrating three times yields v(x)=C₀+C₁x+C₂x², so the three independent solutions are e^{2x}, xe^{2x}, x²e^{2x}.'
      ),
      math: y + eq + par(C0 + plus + C1 + x + plus + C2 + x2) + e2x,
      try: T(
        'Atölyede (D²−4D+4)y=0 ailesinde Koşul B’yi seçerek xe^{2x} teriminin eğriyi nasıl büktüğünü incele.',
        'In the workshop, choose Condition B on (D²−4D+4)y=0 to see how the xe^{2x} term bends the curve.'
      )
    }
  ]
};

export const complementaryClinic = {
  examBlueprint: [
    {
      step: T('1 · Karakteristik polinomu kur ve mertebeyi kaydet', '1 · Build the characteristic polynomial and record the order'),
      detail: T(
        'Denklemi φ(D)y=0 biçimine getir, D yerine λ yazarak φ(λ)=0 karakteristik denklemini kur. Mertebe n ise sonunda tam n bağımsız sabit ve n doğrusal bağımsız terim bulman gerektiğini baştan not et.',
        'Write the equation as φ(D)y=0 and replace D by λ to form the characteristic equation φ(λ)=0. Note the order n upfront so you verify exactly n independent constants at the end.'
      )
    },
    {
      step: T('2 · Kökleri çarpanlara ayır veya kutupsal biçimde çöz', '2 · Factor the roots or solve in polar form'),
      detail: T(
        'Rasyonel kökleri (±1, ±2, ...) veya bikuadratik dönüşümü (λ²=u) dene. Karmaşık bir sayının karekökü veya n-inci kökü gerekiyorsa r·e^{i(θ+2kπ)} kutupsal biçimini ya da yarım açı formüllerini kullan.',
        'Test rational roots (±1, ±2, ...) or biquadratic substitution (λ²=u). When square roots or n-th roots of complex numbers appear, use the polar form r·e^{i(θ+2kπ)} or half-angle identities.'
      )
    },
    {
      step: T('3 · Her kök ailesini standart gerçek çözüme eşle', '3 · Map each root family to its standard real form'),
      detail: T(
        'Basit gerçek λ → Ce^{λx}; simetrik ±β → A cosh βx + B sinh βx; karmaşık α±iβ → e^{αx}(A cos βx + B sin βx); p-katlı kök → (C₀+C₁x+...+C_{p-1}x^{p-1}) çarpanı. Sabit sayısının n olduğunu kontrol et.',
        'Simple real λ → Ce^{λx}; symmetric ±β → A cosh βx + B sinh βx; complex α±iβ → e^{αx}(A cos βx + B sin βx); p-fold root → factor (C₀+C₁x+...+C_{p-1}x^{p-1}). Audit that the constant count equals n.'
      )
    }
  ],
  examClinic: [
    {
      badge: T('5 PUAN · 4 DAKİKA', '5 POINTS · 4 MINUTES'),
      title: T('Farklı gerçek kökler, çarpanlara ayırma ve hiperbolik yazılış (Örnek 4.2 & 4.3)', 'Distinct real roots, factoring and hyperbolic form (Examples 4.2 & 4.3)'),
      statement: T(
        '(a) (D⁴−13D²+36)y=0 denkleminin genel çözümünü hem üstel hem hiperbolik biçimde yaz. (b) (D³+4D²+D−6)y=0 denklemini çarpanlara ayırarak çöz.',
        '(a) Write the general solution of (D⁴−13D²+36)y=0 in both exponential and hyperbolic forms. (b) Solve (D³+4D²+D−6)y=0 by factoring.'
      ),
      trap: T(
        '±β simetrik gerçek kökleri ±iβ karmaşık köklerle karıştırma: λ=±2 ve λ=±3 gerçek kökleri cos/sin değil, cosh/sinh (veya e^{±2x}, e^{±3x}) üretir.',
        'Do not confuse symmetric real roots ±β with imaginary roots ±iβ: the real roots λ=±2 and λ=±3 produce cosh/sinh (or e^{±2x}, e^{±3x}), not cos/sin.'
      ),
      steps: [
        step(
          '1. Bikuadratik karakteristik denklemi çarpanlara ayır (Örnek 4.2)',
          '1. Factor the biquadratic characteristic equation (Example 4.2)',
          lines(pow(lam, four) + minus + n(13) + pow(lam, two) + plus + n(36) + eq + par(pow(lam, two) + minus + four) + par(pow(lam, two) + minus + nine) + eq + zero, lam + eq + o('±') + two + o(',') + o('±') + three),
          'λ² değişkenine göre ikinci dereceden olan polinom (λ²−4)(λ²−9)=0 olarak ayrılır. Dört farklı gerçek kök λ=2, −2, 3, −3 bulunur.',
          'Treating the polynomial as quadratic in λ² factors it into (λ²−4)(λ²−9)=0, giving four distinct real roots λ=2, −2, 3, −3.'
        ),
        step(
          '2. Üstel ve hiperbolik genel çözümleri yaz',
          '2. Write the exponential and hyperbolic general solutions',
          lines(y + eq + C1 + e2x + plus + C2 + em2x + plus + C3 + exp(three + x) + plus + C4 + exp(minus + three + x), y + eq + A1 + fn('cosh', two + x) + plus + B1 + fn('sinh', two + x) + plus + A2 + fn('cosh', three + x) + plus + B2 + fn('sinh', three + x)),
          'Her ±β çifti C₁e^{βx}+C₂e^{-βx} veya eşdeğer olarak A cosh βx + B sinh βx biçiminde yazılabilir; sınır koşulu x=0’da verildiğinde hiperbolik taban çok daha rahattır.',
          'Each ±β pair can be written as C₁e^{βx}+C₂e^{-βx} or equivalently A cosh βx + B sinh βx; the hyperbolic basis is much cleaner when initial data are given at x=0.'
        ),
        step(
          '3. Üçüncü derece polinomda rasyonel kök dene (Örnek 4.3)',
          '3. Test a rational root in the cubic polynomial (Example 4.3)',
          lines(pow(lam, three) + plus + four + pow(lam, two) + plus + lam + minus + six + eq + zero, one + plus + four + plus + one + minus + six + eq + zero + o('⇒') + lam + eq + one),
          '(D³+4D²+D−6)y=0 için sabit terim −6’nın bölenleri denenir. λ=1 koyunca 1+4+1−6=0 sağlandığından (λ−1) bir çarpandır.',
          'For (D³+4D²+D−6)y=0, test divisors of −6. Substituting λ=1 gives 1+4+1−6=0, so (λ−1) is a factor.'
        ),
        step(
          '4. Polinom bölmesiyle kalan ikinci derece çarpanı ayır',
          '4. Factor the remaining quadratic by polynomial division',
          lines(par(lam + minus + one) + par(pow(lam, two) + plus + five + lam + plus + six) + eq + par(lam + minus + one) + par(lam + plus + two) + par(lam + plus + three) + eq + zero),
          '(λ−1) ayrıldıktan sonra kalan λ²+5λ+6=(λ+2)(λ+3) çarpanlarına ayrılır. Üç farklı gerçek kök λ=1, −2, −3 elde edilir.',
          'Dividing out (λ−1) leaves λ²+5λ+6=(λ+2)(λ+3). The three distinct real roots are λ=1, −2, −3.'
        ),
        step(
          '5. Üçüncü mertebe genel çözümü yaz',
          '5. Write the third-order general solution',
          lines(y + eq + C1 + ex + plus + C2 + em2x + plus + C3 + exp(minus + three + x)),
          'Üç farklı gerçek kök üç doğrusal bağımsız üstel terim ve üç keyfi sabit verir; mertebe 3 ile sabit sayısı tam uyumludur.',
          'Three distinct real roots yield three linearly independent exponential terms and three arbitrary constants, matching order 3.'
        )
      ]
    },
    {
      badge: T('5 PUAN · 4 DAKİKA', '5 POINTS · 4 MINUTES'),
      title: T('Gerçek ve karmaşık eşlenik köklerin birleşimi (Örnek 4.5)', 'Combining a real root with a complex conjugate pair (Example 4.5)'),
      statement: T(
        '(D³+2D²+9D+18)y=0 denkleminin genel çözümünü gruplandırma yoluyla çarpanlara ayırarak bul.',
        'Find the general solution of (D³+2D²+9D+18)y=0 by factoring by grouping.'
      ),
      trap: T(
        'λ=±3i köklerinde gerçek kısım α=0’dır (e^{0x}=1); λ=−2 kökünün ürettiği e^{-2x} çarpanını yanlışlıkla cos 3x ve sin 3x terimlerinin önüne dağıtma.',
        'For the roots λ=±3i the real part is α=0 (e^{0x}=1); do not mistakenly attach the factor e^{-2x} from the root λ=−2 to the cos 3x and sin 3x terms.'
      ),
      steps: [
        step(
          '1. Karakteristik denklemi gruplandırarak çarpanlara ayır',
          '1. Factor the characteristic equation by grouping',
          lines(pow(lam, three) + plus + two + pow(lam, two) + plus + nine + lam + plus + n(18) + eq + zero, pow(lam, two) + par(lam + plus + two) + plus + nine + par(lam + plus + two) + eq + par(lam + plus + two) + par(pow(lam, two) + plus + nine) + eq + zero),
          'İlk iki terim λ² parantezine, son iki terim 9 parantezine alındığında ortak (λ+2) çarpanı doğrudan görünür.',
          'Factoring λ² from the first two terms and 9 from the last two reveals the common factor (λ+2).'
        ),
        step(
          '2. Gerçek ve sanal kökleri ayır',
          '2. Separate the real and imaginary roots',
          lines(lam + plus + two + eq + zero + o('⇒') + lam + eq + minus + two, pow(lam, two) + plus + nine + eq + zero + o('⇒') + lam + eq + o('±') + three + i),
          'Birinci çarpandan gerçek kök λ₁=−2, ikinci çarpandan saf sanal eşlenik çift λ₂,₃=0±3i gelir.',
          'The first factor gives the real root λ₁=−2, and the second gives the purely imaginary conjugate pair λ₂,₃=0±3i.'
        ),
        step(
          '3. Gerçek kökün katkısını yaz',
          '3. Write the contribution of the real root',
          lines(sub(y, one) + eq + C1 + em2x),
          'Basit gerçek kök λ=−2, genel çözüme C₁e^{-2x} üstel sönüm terimini katar.',
          'The simple real root λ=−2 contributes the exponential decay term C₁e^{-2x}.'
        ),
        step(
          '4. Saf sanal eşlenik çiftin katkısını yaz',
          '4. Write the contribution of the imaginary conjugate pair',
          lines(sub(y, two) + eq + exp(zero + x) + par(A + fn('cos', three + x) + plus + B + fn('sin', three + x)) + eq + A + fn('cos', three + x) + plus + B + fn('sin', three + x)),
          'λ=0±3i için α=0 ve β=3’tür. Zarf çarpanı e^{0x}=1 olduğundan sönümsüz harmonik salınım A cos 3x + B sin 3x elde edilir.',
          'For λ=0±3i we have α=0 and β=3. Since e^{0x}=1, this pair yields the undamped harmonic oscillation A cos 3x + B sin 3x.'
        ),
        step(
          '5. Tamamlayıcı çözümü topla ve sabitleri say',
          '5. Combine the complementary solution and check the constants',
          lines(y + eq + C1 + em2x + plus + A + fn('cos', three + x) + plus + B + fn('sin', three + x)),
          'Süperpozisyon ilkesiyle iki parça toplanır. Üçüncü mertebe denklem için üç bağımsız sabit (C₁, A, B) eksiksizdir.',
          'By superposition, add both parts. All three independent constants (C₁, A, B) required for a third-order equation are present.'
        )
      ]
    },
    {
      badge: T('6 PUAN · 5 DAKİKA', '6 POINTS · 5 MINUTES'),
      title: T('Karmaşık sayıların karekökü ve yarım açı yöntemi (Örnek 4.7)', 'Square roots of complex numbers and half-angle formulas (Example 4.7)'),
      statement: T(
        '(D⁴−16D²+100)y=0 denkleminin dört karmaşık kökünü kutupsal ve yarım açı yöntemiyle bul; genel çözümü yaz.',
        'Find the four complex roots of (D⁴−16D²+100)y=0 using polar form and half-angle formulas, and write the general solution.'
      ),
      trap: T(
        'λ²=8±6i bulduktan sonra durma; λ’nın kendisini bulmak için r=10 modülünü ve cos(θ/2), sin(θ/2) yarım açı formüllerini uygulamalısın.',
        'Do not stop at λ²=8±6i; to find λ itself you must compute the modulus r=10 and apply the half-angle identities for cos(θ/2) and sin(θ/2).'
      ),
      steps: [
        step(
          '1. Önce λ² için ikinci derece denklemi çöz',
          '1. Solve the quadratic equation for λ² first',
          lines(pow(lam, four) + minus + n(16) + pow(lam, two) + plus + n(100) + eq + zero, pow(par(pow(lam, two) + minus + eight), two) + plus + n(36) + eq + zero + o('⇒') + pow(lam, two) + eq + eight + o('±') + six + i),
          'Tam kareye tamamlayınca (λ²−8)²=−36 ve buradan λ²=8±6i bulunur.',
          'Completing the square in λ² gives (λ²−8)²=−36, hence λ²=8±6i.'
        ),
        step(
          '2. 8 + 6i sayısını kutupsal biçime çevir',
          '2. Convert 8 + 6i to polar form',
          lines(v('r') + eq + sqrt(pow(eight, two) + plus + pow(six, two)) + eq + n(10), fn('cos', v('θ')) + eq + f(eight, n(10)) + eq + f(four, five) + o(',') + fn('sin', v('θ')) + eq + f(six, n(10)) + eq + f(three, five)),
          'Birinci bölgedeki 8+6i karmaşık sayısının modülü r=√(64+36)=10’dur; argümanı θ için cos θ=4/5 ve sin θ=3/5 olur.',
          'The modulus of 8+6i in the first quadrant is r=√(64+36)=10, and its argument θ satisfies cos θ=4/5 and sin θ=3/5.'
        ),
        step(
          '3. Yarım açı formülleriyle cos(θ/2) ve sin(θ/2) değerlerini hesapla',
          '3. Compute cos(θ/2) and sin(θ/2) via half-angle identities',
          lines(fn('cos', f(v('θ'), two)) + eq + sqrt(f(one + plus + f(four, five), two)) + eq + f(three, sqrt(n(10))), fn('sin', f(v('θ'), two)) + eq + sqrt(f(one + minus + f(four, five), two)) + eq + f(one, sqrt(n(10)))),
          'θ/2 birinci bölgede olduğundan karekökler pozitiftir: cos(θ/2)=3/√10 ve sin(θ/2)=1/√10.',
          'Since θ/2 lies in the first quadrant, both square roots are positive: cos(θ/2)=3/√10 and sin(θ/2)=1/√10.'
        ),
        step(
          '4. Dört karekökü λ = ±3 ± i olarak çıkar',
          '4. Extract all four roots λ = ±3 ± i',
          lines(lam + eq + o('±') + sqrt(n(10)) + par(fn('cos', f(v('θ'), two)) + o('±') + i + fn('sin', f(v('θ'), two))) + eq + o('±') + three + o('±') + i),
          '√r = √10 çarpanı paranteze dağılınca √10·(3/√10)=3 ve √10·(1/√10)=1 kalır; dört kök λ=3±i ve λ=−3±i olur.',
          'Multiplying by √r = √10 cancels the denominators and yields the four roots λ=3±i and λ=−3±i.'
        ),
        step(
          '5. İki eşlenik çiftten genel çözümü kur',
          '5. Build the general solution from the two conjugate pairs',
          lines(y + eq + exp(three + x) + par(A1 + fn('cos', x) + plus + B1 + fn('sin', x)) + plus + exp(minus + three + x) + par(A2 + fn('cos', x) + plus + B2 + fn('sin', x))),
          'λ=3±i çifti e^{3x}(A₁cos x+B₁sin x), λ=−3±i çifti ise e^{-3x}(A₂cos x+B₂sin x) verir (veya hiperbolik toplamla cos x(C₁cosh 3x+C₂sinh 3x)+sin x(C₃cosh 3x+C₄sinh 3x)).',
          'The pair λ=3±i gives e^{3x}(A₁cos x+B₁sin x) and λ=−3±i gives e^{-3x}(A₂cos x+B₂sin x) (or equivalently in hyperbolic-trigonometric product form).'
        )
      ]
    },
    {
      badge: T('6 PUAN · 5 DAKİKA', '6 POINTS · 5 MINUTES'),
      title: T('Yüksek mertebeden katlı sıfır ve katlı karmaşık kökler (Örnek 4.10)', 'High-order repeated zero and repeated complex roots (Example 4.10)'),
      statement: T(
        '(D⁸+18D⁶+81D⁴)y=0 denkleminin bütün köklerini katlılıklarıyla bul ve 8 sabitli genel çözümü yaz.',
        'Find all roots of (D⁸+18D⁶+81D⁴)y=0 with their multiplicities and write the 8-constant general solution.'
      ),
      trap: T(
        'λ⁴=0 çarpanı tek bir sabit değil, D⁴y=0’dan gelen 4 terimli C₀+C₁x+C₂x²+C₃x³ polinomunu üretir; çift katlı ±3i kökleri de (A₀+A₁x)cos 3x + (B₀+B₁x)sin 3x gerektirir.',
        'The factor λ⁴=0 produces the 4-term polynomial C₀+C₁x+C₂x²+C₃x³ (from D⁴y=0), not a single constant; and the double pair ±3i requires (A₀+A₁x)cos 3x + (B₀+B₁x)sin 3x.'
      ),
      steps: [
        step(
          '1. Ortak kuvveti ve tam kareyi çarpanlara ayır',
          '1. Factor out the common power and the perfect square',
          lines(pow(lam, eight) + plus + n(18) + pow(lam, six) + plus + n(81) + pow(lam, four) + eq + pow(lam, four) + par(pow(lam, four) + plus + n(18) + pow(lam, two) + plus + n(81)) + eq + zero, pow(lam, four) + pow(par(pow(lam, two) + plus + nine), two) + eq + zero),
          'Önce λ⁴ ortak çarpanı alınır; kalan λ⁴+18λ²+81 ifadesi (λ²+9)² tam karesidir.',
          'Factor out λ⁴ first; the remaining polynomial λ⁴+18λ²+81 is the perfect square (λ²+9)².'
        ),
        step(
          '2. Kökleri ve katlılıklarını listele',
          '2. List the roots and their multiplicities',
          lines(lam + eq + zero + o(',') + zero + o(',') + zero + o(',') + zero, lam + eq + three + i + o(',') + three + i + o(',') + minus + three + i + o(',') + minus + three + i),
          'λ=0 kökü p=4 katlıdır; λ=3i ve λ=−3i karmaşık eşlenik köklerinin her biri p=2 katlıdır (toplam 4+2+2=8 kök).',
          'The root λ=0 has multiplicity p=4, and each of the conjugate roots λ=3i and λ=−3i has multiplicity p=2 (total 4+2+2=8 roots).'
        ),
        step(
          '3. Dört katlı λ = 0 kökünün çözümünü yaz',
          '3. Write the part for the fourfold root λ = 0',
          lines(sub(y, one) + eq + par(C0 + plus + C1 + x + plus + C2 + x2 + plus + C3 + x3) + exp(zero + x) + eq + C0 + plus + C1 + x + plus + C2 + x2 + plus + C3 + x3),
          'p=4 katlı λ=0 kökü (yani D⁴y=0), e^{0x}=1 olduğundan 3. dereceden genel polinomu verir.',
          'The fourfold root λ=0 (corresponding to D⁴y=0) with e^{0x}=1 gives a general cubic polynomial.'
        ),
        step(
          '4. Çift katlı λ = ±3i karmaşık köklerinin çözümünü yaz',
          '4. Write the part for the double complex pair λ = ±3i',
          lines(sub(y, two) + eq + par(sub(A, zero) + plus + A1 + x) + fn('cos', three + x) + plus + par(sub(B, zero) + plus + B1 + x) + fn('sin', three + x)),
          'p=2 katlı α±iβ=0±3i çifti için hem cos 3x hem sin 3x katsayısı birinci dereceden (A₀+A₁x) ve (B₀+B₁x) polinomlarıyla çarpılır.',
          'For the double pair α±iβ=0±3i (p=2), both cos 3x and sin 3x are multiplied by linear polynomials (A₀+A₁x) and (B₀+B₁x).'
        ),
        step(
          '5. Sekiz sabitli genel çözümü birleştir',
          '5. Combine the 8-constant general solution',
          lines(y + eq + C0 + plus + C1 + x + plus + C2 + x2 + plus + C3 + x3 + plus + par(sub(A, zero) + plus + A1 + x) + fn('cos', three + x) + plus + par(sub(B, zero) + plus + B1 + x) + fn('sin', three + x)),
          'Toplam 4 + 2 + 2 = 8 bağımsız sabit elde edilir; sekizinci mertebe homojen denklemin genel çözümü tamamlanmıştır.',
          'We have 4 + 2 + 2 = 8 independent constants in total, completing the general solution of the eighth-order homogeneous equation.'
        )
      ]
    }
  ]
};
