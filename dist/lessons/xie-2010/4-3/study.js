import {T,step,v,n,o,p,f,pow,prime,eq,plus,minus,x,y,C,fn,exp,integral,dx,lines,sub} from '../../../study/math.js';

const zero = n(0), one = n(1), two = n(2), three = n(3), four = n(4), five = n(5), six = n(6), seven = n(7);
const eight = n(8), nine = n(9), twelve = n(12), thirteen = n(13), fourteen = n(14), fifteen = n(15);
const sixteen = n(16), twentyfive = n(25), fifty = n(50);
const D = v('D'), A = v('A'), B = v('B'), E = v('E'), F = v('F'), G = v('G'), H = v('H');
const lam = v('λ'), c1 = sub(v('c'), one), c2 = sub(v('c'), two), C0 = sub(C, zero), C1 = sub(C, one), C2 = sub(C, two);
const yp = sub(y, v('P')), yp1 = sub(y, v('P1')), yp2 = sub(y, v('P2')), yc = sub(y, v('C'));
const x2 = pow(x, two), x3 = pow(x, three), x4 = pow(x, four);
const D2 = pow(D, two), D3 = pow(D, three), D4 = pow(D, four);
const ypp = prime(y, 2);
const par = s => p(s);
const e2x = exp(two + x), em2x = exp(minus + two + x), ex = exp(x);
const sinx = fn('sin', x), cosx = fn('cos', x);
const sin3x = fn('sin', three + x), cos3x = fn('cos', three + x);
const sinh2x = fn('sinh', two + x), cosh2x = fn('cosh', two + x);
const cscx = fn('csc', x), cotx = fn('cot', x);
const lnx = fn('ln', x);

/** Display metadata for the §4.3 particular-solutions workshop. */
export const particularFamilies = {
  'exp-forcing': {
    name: '(D² + 9)y = 3e²ˣ · Örnek / Ex. 4.12',
    method: par(D2 + plus + nine) + y + eq + three + e2x + o('⇒') + yp + eq + f(three, thirteen) + e2x,
    note: T(
      'Rezonanssız üstel sağ taraf (a=2 kök değil; karakteristik kökler ±3i). Teorem 1 ile φ(2)=2²+9=13 doğrudan yerine konur; y_P=(3/13)e^{2x} sabit kalırken başlangıç koşulları yalnız A cos 3x + B sin 3x salınımını ayarlar.',
      'Non-resonant exponential forcing (a=2 is not a root; characteristic roots are ±3i). By Theorem 1, φ(2)=2²+9=13 is substituted directly; y_P=(3/13)e^{2x} stays fixed while initial data adjust only the A cos 3x + B sin 3x oscillation.'
    ),
    example: T(
      'Sıfır homojen düğmesine basarak y(0)=3/13, y′(0)=6/13 seçtiğinde salınım kaybolur ve toplam çözüm saf y_P=(3/13)e^{2x} eğrisiyle çakışır.',
      'Click the zero-homogeneous preset y(0)=3/13, y′(0)=6/13 to eliminate the oscillation so the total solution coincides with the pure y_P=(3/13)e^{2x} curve.'
    )
  },
  'poly-resonance': {
    name: '(D² + 2D)y = 4x² + 2x + 3 · Örnek / Ex. 4.16',
    method: D + par(D + plus + two) + y + eq + four + x2 + plus + two + x + plus + three + o('⇒') + yp + eq + f(two, three) + x3 + minus + f(one, two) + x2 + plus + two + x,
    note: T(
      'λ=0 karakteristik denklemin basit kökü olduğu için (sabit terim yok, Dy en düşük türev) standart ikinci derece polinom denemesi başarısız olur; deneme x ile çarpılarak y_P=x(Ax²+Bx+C) seçilir.',
      'Because λ=0 is a simple root of the characteristic equation (no y term, Dy is the lowest derivative), the standard quadratic trial fails; multiply the trial by x to use y_P=x(Ax²+Bx+C).'
    ),
    example: T(
      'Özel çözüm y_P(0)=0 ve y_P′(0)=2 değerlerini taşır. y′(0)=2 seçildiğinde C₁e^{-2x} terimi düşer ve yalnız sabit kayma C₀ kalır.',
      'The particular solution carries y_P(0)=0 and y_P′(0)=2. Choosing y′(0)=2 drops the C₁e^{-2x} transient and leaves only the constant shift C₀.'
    )
  },
  'shift-resonance': {
    name: '(D² + 4D + 13)y = e⁻²ˣ sin 3x · Örnek / Ex. 4.26',
    method: par(pow(par(D + plus + two), two) + plus + nine) + y + eq + em2x + sin3x + o('⇒') + yp + eq + minus + f(one, six) + x + em2x + cos3x,
    note: T(
      'Karakteristik kökler λ=−2±3i sağ taraftaki e^{-2x}sin 3x ile tam rezonanstadır. D-operatörü kaydırma teoremi (Teorem 2) e^{-2x} çarpanını sola taşır ve 1/(D²+9)[sin 3x] üzerinde Teorem 4 rezonans kuralı −(x/6)e^{-2x}cos 3x üretir.',
      'The characteristic roots λ=−2±3i are in exact resonance with e^{-2x}sin 3x. The D-operator shift theorem (Theorem 2) pulls e^{-2x} to the left, and Theorem 4 on 1/(D²+9)[sin 3x] yields −(x/6)e^{-2x}cos 3x.'
    ),
    example: T(
      'x çarpanı sönümlü zarfı başlangıçta büyütür, ardından e^{-2x} üstel sönümü baskın çıkar. Başlangıç koşulları y_C=e^{-2x}(A cos 3x + B sin 3x) terimini belirler.',
      'The factor x initially grows the amplitude before the exponential decay e^{-2x} dominates. Initial conditions fix y_C=e^{-2x}(A cos 3x + B sin 3x).'
    )
  },
  'variation-log': {
    name: '(D² − 2D + 1)y = eˣ ln x (x > 0) · Örnek / Ex. 4.28',
    method: pow(par(D + minus + one), two) + y + eq + ex + lnx + o('⇒') + yp + eq + x2 + ex + par(f(one, two) + lnx + minus + f(three, four)),
    note: T(
      'ln x UC kümesinde değildir; belirsiz katsayılar uygulanamaz. λ=1 çift katlı kök olduğundan parametrelerin değişimi (veya kaydırma D→D+1 ile v″=ln x integrasyonu) x>0 bölgesinde kesin çözümü verir.',
      'Because ln x is not a UC function, undetermined coefficients cannot apply. Since λ=1 is a double root, variation of parameters (or shifting D→D+1 to integrate v″=ln x) gives the exact solution on x>0.'
    ),
    example: T(
      'Tanım aralığı x>0 olduğu için başlangıç noktası x₀=1 seçilmiştir. x→0⁺ sınırında ln x tekilliği nedeniyle sadece pozitif yarı eksende çözüm tanımlıdır.',
      'Because the domain is x>0, the initial point is fixed at x₀=1. Due to the ln x singularity as x→0⁺, the solution is defined only on the positive half-axis.'
    )
  }
};

const pathUndetermined = [
  step(
    '1. Karakteristik denklemi çöz ve rezonansı denetle',
    '1. Solve the characteristic equation and check for resonance',
    lines(
      par(D2 + plus + two + D) + y + eq + four + x2 + plus + two + x + plus + three,
      pow(lam, two) + plus + two + lam + eq + lam + par(lam + plus + two) + eq + zero + o('⇒') + lam + eq + zero + o(',') + minus + two
    ),
    'Sağ taraf F(x)=4x²+2x+3=P₂(x)e^{0x} biçimindedir (a=0). Karakteristik denklem λ²+2λ=0 için λ=0 basit köktür (p=1 katlı) ve tamamlayıcı çözüm y_C=C₀+C₁e^{-2x} olur.',
    'The right side has the form F(x)=4x²+2x+3=P₂(x)e^{0x} with a=0. For the characteristic equation λ²+2λ=0, λ=0 is a simple root (multiplicity p=1) and the complementary solution is y_C=C₀+C₁e^{-2x}.'
  ),
  step(
    '2. Deneme çözümünü x^p çarpanıyla düzelt',
    '2. Modify the trial solution by the factor x^p',
    lines(
      yp + eq + x + par(A + x2 + plus + B + x + plus + C) + eq + A + x3 + plus + B + x2 + plus + C + x
    ),
    'Standart deneme Ax²+Bx+C içindeki sabit C terimi y_C=C₀+C₁e^{-2x} tarafından yutulur (DC=0, D²C=0). λ=0 basit kök (p=1) olduğundan deneme x¹ ile çarpılır (veya denklemde en düşük türev Dy olduğu için y′_P ikinci derece polinom seçilir).',
    'The constant term C in a standard trial Ax²+Bx+C is annihilated by D²+2D because it duplicates C₀ in y_C. Since λ=0 has multiplicity p=1, multiply the trial by x¹ (equivalently, since Dy is the lowest derivative present, make y′_P a quadratic).'
  ),
  step(
    '3. Birinci ve ikinci türevleri hesapla',
    '3. Compute the first and second derivatives',
    lines(
      prime(yp) + eq + three + A + x2 + plus + two + B + x + plus + C,
      prime(yp, 2) + eq + six + A + x + plus + two + B
    ),
    'Polinom türevleri terim terim alınır. Artık y_P içinde sabit terim yoktur; her katsayı A, B, C türevlerde görünür.',
    'Differentiate term by term. Notice there is no constant term in y_P, so every coefficient A, B, C survives in the derivatives.'
  ),
  step(
    '4. Denkleme yerleştir ve aynı kuvvetlerin katsayılarını eşitle',
    '4. Substitute into the ODE and equate coefficients of like powers',
    lines(
      par(six + A + x + plus + two + B) + plus + two + par(three + A + x2 + plus + two + B + x + plus + C) + eq + four + x2 + plus + two + x + plus + three,
      six + A + x2 + plus + par(six + A + plus + four + B) + x + plus + par(two + B + plus + two + C) + eq + four + x2 + plus + two + x + plus + three
    ),
    'x², x¹ ve x⁰ katsayılarını eşitleyince üçgensel bir doğrusal sistem çıkar: 6A=4, 6A+4B=2 ve 2B+2C=3.',
    'Equating coefficients of x², x¹, and x⁰ yields a triangular linear system: 6A=4, 6A+4B=2, and 2B+2C=3.'
  ),
  step(
    '5. Katsayıları çöz ve genel çözümü y_C + y_P olarak yaz',
    '5. Solve for the coefficients and write y = y_C + y_P',
    lines(
      A + eq + f(two, three) + o(',') + B + eq + minus + f(one, two) + o(',') + C + eq + two,
      y + eq + C0 + plus + C1 + em2x + plus + f(two, three) + x3 + minus + f(one, two) + x2 + plus + two + x
    ),
    '6A=4 ⇒ A=2/3; 4+4B=2 ⇒ B=−1/2; −1+2C=3 ⇒ C=2 bulunur. Özel çözüm y_P=(2/3)x³−(1/2)x²+2x ile y_C=C₀+C₁e^{-2x} toplanarak genel çözüm tamamlanır.',
    'Solving gives A=2/3, then 4+4B=2 ⇒ B=−1/2, and −1+2C=3 ⇒ C=2. Combining y_P=(2/3)x³−(1/2)x²+2x with y_C=C₀+C₁e^{-2x} completes the general solution.'
  )
];

const pathDOperator = [
  step(
    '1. Sağ tarafı süperpozisyonla iki parçaya ayır (Örnek 4.19)',
    '1. Split the right-hand side by superposition (Example 4.19)',
    lines(
      par(D2 + plus + five + D + plus + four) + y + eq + e2x + plus + x2 + em2x,
      yp + eq + yp1 + plus + yp2 + eq + f(one, D2 + plus + five + D + plus + four) + e2x + plus + f(one, D2 + plus + five + D + plus + four) + par(x2 + em2x)
    ),
    'φ(D)=D²+5D+4=(D+1)(D+4) için kökler λ=−1, −4’tür. Sağ taraftaki a=2 ve a=−2 değerlerinin hiçbiri kök değildir; ters operatör iki terime ayrı ayrı uygulanır.',
    'For φ(D)=D²+5D+4=(D+1)(D+4), the roots are λ=−1, −4. Neither a=2 nor a=−2 on the right side is a root; apply the inverse operator separately to the two terms.'
  ),
  step(
    '2. Birinci parçaya Teorem 1 (üstel kural) uygula',
    '2. Apply Theorem 1 (exponential rule) to the first term',
    lines(
      yp1 + eq + f(one, D2 + plus + five + D + plus + four) + e2x + eq + f(one, pow(two, two) + plus + five + o('⋅') + two + plus + four) + e2x + eq + f(one, n(18)) + e2x
    ),
    'Saf üstel e^{2x} üzerinde D yerine doğrudan a=2 konur: φ(2)=4+10+4=18≠0 olduğundan y_{P1}=e^{2x}/18 tek satırda bulunur.',
    'On the pure exponential e^{2x}, replace D directly by a=2: since φ(2)=4+10+4=18≠0, we get y_{P1}=e^{2x}/18 in one line.'
  ),
  step(
    '3. İkinci parçada Teorem 2 (kaydırma kuralı) ile e^{-2x} çarpanını sola taşı',
    '3. Pull e^{-2x} to the left using Theorem 2 (exponential shift)',
    lines(
      yp2 + eq + f(one, D2 + plus + five + D + plus + four) + par(em2x + x2) + eq + em2x + f(one, pow(par(D + minus + two), two) + plus + five + par(D + minus + two) + plus + four) + x2,
      yp2 + eq + em2x + f(one, D2 + plus + D + minus + two) + x2 + eq + minus + f(em2x, two) + f(one, one + minus + par(f(D, two) + plus + f(D2, two))) + x2
    ),
    'D yerine D−2 yazılınca φ(D−2)=(D²−4D+4)+(5D−10)+4=D²+D−2 olur. Sabit terim −2 paranteze alınarak [1−(D/2+D²/2)]^{-1} biçimine getirilir.',
    'Replacing D by D−2 gives φ(D−2)=(D²−4D+4)+(5D−10)+4=D²+D−2. Factor out the constant term −2 to form [1−(D/2+D²/2)]^{-1}.'
  ),
  step(
    '4. Ters operatörü D² mertebesine kadar seriye aç',
    '4. Expand the inverse operator in a series up to D²',
    lines(
      f(one, one + minus + par(f(D, two) + plus + f(D2, two))) + eq + one + plus + par(f(D, two) + plus + f(D2, two)) + plus + pow(par(f(D, two) + plus + f(D2, two)), two) + plus + o('⋯'),
      eq + one + plus + f(one, two) + D + plus + f(three, four) + D2 + plus + o('⋯')
    ),
    'x² polinomunun üçüncü ve daha yüksek türevleri sıfırdır (D³x²=0). Bu yüzden 1/(1−u)=1+u+u²+⋯ açılımında yalnız D²’ye kadar olan terimler tutulur: (D/2)+(D²/2)+(D²/4)=(1/2)D+(3/4)D².',
    'Third and higher derivatives of x² vanish (D³x²=0). Thus in 1/(1−u)=1+u+u²+⋯ we keep terms only up to D²: (D/2)+(D²/2)+(D²/4)=(1/2)D+(3/4)D².'
  ),
  step(
    '5. Türevleri x² üzerine uygula ve parçaları birleştir',
    '5. Apply the derivatives to x² and combine the pieces',
    lines(
      yp2 + eq + minus + f(em2x, two) + par(x2 + plus + f(one, two) + par(two + x) + plus + f(three, four) + par(two)) + eq + minus + f(one, four) + par(two + x2 + plus + two + x + plus + three) + em2x,
      yp + eq + f(one, n(18)) + e2x + minus + f(one, four) + par(two + x2 + plus + two + x + plus + three) + em2x
    ),
    'Dx²=2x ve D²x²=2 değerleri yerine konunca y_{P2}=−(1/4)(2x²+2x+3)e^{-2x} çıkar. Hiçbir doğrusal denklem sistemi çözmeden y_P=y_{P1}+y_{P2} elde edilir.',
    'Substituting Dx²=2x and D²x²=2 gives y_{P2}=−(1/4)(2x²+2x+3)e^{-2x}. Without solving any simultaneous algebraic equations, we obtain y_P=y_{P1}+y_{P2}.'
  )
];

export const particularStudy = {
  title: T(
    'Sağ tarafı sınıflandır, rezonansı kontrol et ve en kısa operatör yolunu seç.',
    'Classify the forcing, check for resonance, and choose the shortest operator path.'
  ),
  intro: T(
    'Sabit katsayılı φ(D)y=F(x) denkleminde önce homojen kökleri bul. F(x) bir UC fonksiyonuysa belirsiz katsayılar veya D-operatörü kurallarını (Teorem 1–4) kullan; ln x, tan x, csc x gibi UC dışı terimlerde ise parametrelerin değişimi yöntemine geç.',
    'For a constant-coefficient ODE φ(D)y=F(x), first find the homogeneous roots. If F(x) is a UC function, use undetermined coefficients or D-operator shortcuts (Theorems 1–4); for non-UC terms such as ln x, tan x, or csc x, switch to variation of parameters.'
  ),
  paths: [
    {
      title: T('Belirsiz katsayılar ve x^p rezonans kuralı (Örnek 4.16)', 'Undetermined coefficients and the x^p resonance rule (Example 4.16)'),
      prompt: T(
        '(D²+2D)y = 4x²+2x+3 denkleminde neden standart Ax²+Bx+C denemesi yetmez ve x çarpanı nereden gelir?',
        'In (D²+2D)y = 4x²+2x+3, why does a standard trial Ax²+Bx+C fail and where does the factor x come from?'
      ),
      steps: pathUndetermined,
      reflection: T(
        'Denklem (D³+2D²)y = 4x²+2x+3 olsaydı deneme polinomunu x’in hangi kuvvetiyle çarpardın?',
        'If the equation were (D³+2D²)y = 4x²+2x+3, by what power of x would you multiply the trial polynomial?'
      )
    },
    {
      title: T('D-operatörü: üstel kaydırma ve seri açılımı (Örnek 4.19)', 'D-operator: exponential shift and series expansion (Example 4.19)'),
      prompt: T(
        '(D²+5D+4)y = e^{2x} + x²e^{-2x} denkleminin özel çözümü katsayı eşitlemeden D-operatörüyle nasıl bulunur?',
        'How do we find a particular solution of (D²+5D+4)y = e^{2x} + x²e^{-2x} via the D-operator without equating undetermined coefficients?'
      ),
      steps: pathDOperator,
      reflection: T(
        '1/(1−u) geometrik serisini neden D² teriminden sonra kesebiliyoruz?',
        'Why can we truncate the geometric series 1/(1−u) right after the D² term?'
      )
    }
  ],
  predictions: [
    {
      id: 'resonance-power-rule',
      question: T(
        '(D−2)³y = x e^{2x} denklemi için belirsiz katsayılar yönteminde doğru y_P denemesi hangisidir?',
        'What is the correct trial solution y_P in undetermined coefficients for (D−2)³y = x e^{2x}?'
      ),
      context: T(
        'Tablo 4.1 temel denemesini yaz, ardından λ=2 kökünün katlılığını (p) kontrol et (Örnek 4.17 fikri).',
        'Write the Table 4.1 base trial, then check the multiplicity p of the characteristic root λ=2 (cf. Example 4.17).'
      ),
      choices: T(
        ['x³(Ax + B)e^{2x}', '(Ax + B)e^{2x}', 'x(Ax + B)e^{2x}'],
        ['x³(Ax + B)e^{2x}', '(Ax + B)e^{2x}', 'x(Ax + B)e^{2x}']
      ),
      answer: 0,
      reason: T(
        'x e^{2x} için temel deneme (Ax+B)e^{2x}’tir. Ancak λ=2 karakteristik denklemin p=3 katlı köküdür (y_C=(C₀+C₁x+C₂x²)e^{2x}). Çakışmayı tamamen kaldırmak için tüm deneme x³ ile çarpılır: x³(Ax+B)e^{2x}.',
        'The base trial for x e^{2x} is (Ax+B)e^{2x}. However, λ=2 is a root of multiplicity p=3 (y_C=(C₀+C₁x+C₂x²)e^{2x}). To remove all duplication with y_C, multiply the entire trial by x³: x³(Ax+B)e^{2x}.'
      ),
      math: par(pow(par(D + minus + two), three)) + y + eq + x + e2x + o('⇒') + yp + eq + x3 + par(A + x + plus + B) + e2x,
      try: T(
        'Atölyede üstel kaydırma ve rezonans ailesini seçerek x çarpanının genliği nasıl değiştirdiğini incele.',
        'In the workshop, select the exponential shift and resonance family and observe how the factor x modifies the amplitude.'
      )
    },
    {
      id: 'method-selection-non-uc',
      question: T(
        '(D² − 2D + 1)y = e^x ln x (x > 0) denkleminin özel çözümü için hangi yöntem geçerlidir?',
        'Which method is valid for finding a particular solution of (D² − 2D + 1)y = e^x ln x (x > 0)?'
      ),
      context: T(
        'Belirsiz katsayıların yalnızca sonlu türev ailesine sahip UC fonksiyonlarında çalıştığını hatırla (Örnek 4.28).',
        'Recall that undetermined coefficients works only when F(x) has a finite derivative family (Example 4.28).'
      ),
      choices: T(
        [
          'Parametrelerin değişimi (veya D→D+1 kaydırmasıyla v″=ln x integrasyonu); çünkü ln x sonlu türev kümesi üretmez',
          'y_P = A e^x ln x belirsiz katsayı denemesi',
          'Teorem 3 ile D² yerine −1 yazma kuralı'
        ],
        [
          'Variation of parameters (or shifting D→D+1 to integrate v″=ln x), because ln x has no finite derivative family',
          'Undetermined coefficients with trial y_P = A e^x ln x',
          'Theorem 3 by replacing D² with −1'
        ]
      ),
      answer: 0,
      reason: T(
        'ln x’in türevleri 1/x, −1/x², 2/x³, … şeklinde sonsuz yeni fonksiyon üretir; yani UC fonksiyonu değildir. Parametrelerin değişimi (veya y=v(x)e^x ile v″=ln x integrasyonu) y_P = x²e^x((1/2)ln x − 3/4) çözümünü verir.',
        'Derivatives of ln x generate an infinite sequence 1/x, −1/x², 2/x³, …, so it is not a UC function. Variation of parameters (or setting y=v(x)e^x so v″=ln x) yields y_P = x²e^x((1/2)ln x − 3/4).'
      ),
      math: pow(par(D + minus + one), two) + par(v('v') + ex) + eq + ex + prime(v('v'), 2) + eq + ex + lnx,
      try: T(
        'Atölyede (D²−2D+1)y = e^x ln x ailesini seç ve sıfır homojen düğmesiyle y_P eğrisini incele.',
        'In the workshop, select the (D²−2D+1)y = e^x ln x family and inspect the y_P curve using the zero-homogeneous preset.'
      )
    }
  ]
};

export const particularClinic = {
  examBlueprint: [
    {
      step: T('1 · Önce homojen kökleri bul ve F(x)’i sınıflandır', '1 · Find the homogeneous roots first and classify F(x)'),
      detail: T(
        'φ(λ)=0 köklerini ve katlılıklarını yazmadan y_P denemesi kurma. F(x) polinom, üstel, sin/cos, sinh/cosh toplam/çarpımıysa UC veya D-operatörü seç; ln x, tan x, sec x, csc x veya değişken katsayı varsa parametrelerin değişimine geç.',
        'Never write a trial for y_P before finding the roots of φ(λ)=0 and their multiplicities. If F(x) is a sum/product of polynomials, exponentials, sin/cos, or sinh/cosh, choose UC or D-operators; if ln x, tan x, sec x, csc x, or variable coefficients appear, use variation of parameters.'
      )
    },
    {
      step: T('2 · Rezonansı ve trigonometrik çiftleri denetle', '2 · Check for resonance and complete trigonometric pairs'),
      detail: T(
        'Sağ tarafta yalnız sin βx veya yalnız cos βx olsa bile UC denemesine A cos βx + B sin βx çiftini tam yaz. Kuvvet varsa (cos³2x gibi) önce toplam-fark özdeşliğiyle indirge. Her bağımsız sağ taraf ailesini kendi rezonans katlılığı p kadar x^p ile çarp.',
        'Even if only sin βx or cos βx appears on the right, include both A cos βx + B sin βx in a UC trial. Reduce powers (like cos³2x) with multiple-angle identities first. Multiply each independent forcing family by x^p according to its own root multiplicity p.'
      )
    },
    {
      step: T('3 · D-operatörü ve parametrelerin değişiminde işlem sırasını koru', '3 · Preserve operator order in D-methods and variation of parameters'),
      detail: T(
        'Teorem 3’te yalnız D² yerine −β² yaz (D yerine değil!); kalan a+bD paydasını eşleniği a−bD ile rasyonelleştir. Parametrelerin değişiminde önce denklemi baş katsayıya bölerek standart biçime getir, sonra Wronskian sistemini çöz.',
        'In Theorem 3 replace only D² by −β² (never D itself!), then rationalize a remaining a+bD denominator with its conjugate a−bD. In variation of parameters, divide by the leading coefficient a_n first so the equation is in standard form before solving the Wronskian system.'
      )
    }
  ],
  examClinic: [
    {
      badge: T('6 PUAN · 5 DAKİKA', '6 POINTS · 5 MINUTES'),
      title: T('Hiperbolik ve polinom sağ tarafta çifte rezonans (Örnek 4.18)', 'Double resonance with hyperbolic and polynomial forcing (Example 4.18)'),
      statement: T(
        '(D⁴ − 4D²)y = sinh 2x + 2x² diferansiyel denkleminin genel çözümünü belirsiz katsayılar yöntemiyle bulunuz.',
        'Find the general solution of (D⁴ − 4D²)y = sinh 2x + 2x² by the method of undetermined coefficients.'
      ),
      trap: T(
        'Karakteristik kökler λ=0, 0, 2, −2’dir. sinh 2x = (e^{2x}−e^{-2x})/2 hem λ=2 hem λ=−2 ile p=1 katlı rezonanstadır; 2x² ise λ=0 çift kökü nedeniyle p=2 katlı rezonanstadır. Her iki aile farklı x^p çarpanı alır!',
        'The characteristic roots are λ=0, 0, 2, −2. Since sinh 2x = (e^{2x}−e^{-2x})/2, it resonates with λ=±2 of multiplicity p=1, while 2x² resonates with the double root λ=0 of multiplicity p=2. The two families take different powers x^p!'
      ),
      steps: [
        step(
          '1. Karakteristik kökleri ve tamamlayıcı çözümü yaz',
          '1. Find the characteristic roots and complementary solution',
          lines(
            pow(lam, four) + minus + four + pow(lam, two) + eq + pow(lam, two) + par(pow(lam, two) + minus + four) + eq + zero + o('⇒') + lam + eq + zero + o(',') + zero + o(',') + two + o(',') + minus + two,
            yc + eq + C0 + plus + C1 + x + plus + C2 + cosh2x + plus + sub(C, three) + sinh2x
          ),
          'λ=±2 köklerinin ürettiği e^{2x} ve e^{-2x} kombinasyonu eşdeğer olarak cosh 2x ve sinh 2x biçiminde yazılabilir; λ=0 çift kökü C₀+C₁x verir.',
          'The combination of e^{2x} and e^{-2x} from λ=±2 can be written equivalently in terms of cosh 2x and sinh 2x; the double root λ=0 gives C₀+C₁x.'
        ),
        step(
          '2. Her iki sağ taraf ailesi için rezonans düzeltmeli y_P denemesini kur',
          '2. Set up the resonance-modified trial solution y_P for both families',
          lines(
            yp + eq + x + par(A + sinh2x + plus + B + cosh2x) + plus + x2 + par(E + x2 + plus + F + x + plus + G)
          ),
          'sinh 2x ailesi λ=±2 basit kökleriyle (p=1) çakıştığı için x ile çarpılır. 2x² polinom ailesi ise λ=0 çift köküyle (p=2) çakıştığı için x² ile çarpılarak Ex⁴+Fx³+Gx² olur.',
          'The sinh 2x family duplicates the simple roots λ=±2 (p=1), so multiply by x. The polynomial family 2x² duplicates the double root λ=0 (p=2), so multiply by x² to get Ex⁴+Fx³+Gx².'
        ),
        step(
          '3. Türevleri hesapla ve D⁴ − 4D² operatörünü uygula',
          '3. Compute the derivatives and apply the operator D⁴ − 4D²',
          lines(
            par(D4 + minus + four + D2) + par(x + par(A + sinh2x + plus + B + cosh2x)) + eq + n(32) + A + cosh2x + plus + n(32) + B + sinh2x,
            par(D4 + minus + four + D2) + par(E + x4 + plus + F + x3 + plus + G + x2) + eq + minus + n(48) + E + x2 + minus + n(24) + F + x + plus + par(n(24) + E + minus + eight + G)
          ),
          'x sinh 2x ve x cosh 2x üzerinde D²−4 operatörü sabit katsayılı cosh/sinh bırakır; tekrar D² uygulayınca 32A cosh 2x + 32B sinh 2x kalır. Polinom kısmında D⁴(Ex⁴)=24E ve −4D²(Ex⁴+Fx³+Gx²)=−48Ex²−24Fx−8G gelir.',
          'On x sinh 2x and x cosh 2x, applying D⁴−4D² leaves 32A cosh 2x + 32B sinh 2x. On the polynomial part, D⁴(Ex⁴)=24E and −4D²(Ex⁴+Fx³+Gx²)=−48Ex²−24Fx−8G.'
        ),
        step(
          '4. Katsayıları sağ taraftaki sinh 2x + 2x² ile eşitle',
          '4. Equate coefficients with sinh 2x + 2x² on the right-hand side',
          lines(
            n(32) + A + eq + zero + o(',') + n(32) + B + eq + one + o('⇒') + A + eq + zero + o(',') + B + eq + f(one, n(32)),
            minus + n(48) + E + eq + two + o(',') + minus + n(24) + F + eq + zero + o(',') + n(24) + E + minus + eight + G + eq + zero + o('⇒') + E + eq + minus + f(one, n(24)) + o(',') + F + eq + zero + o(',') + G + eq + minus + f(one, eight)
          ),
          'cosh 2x katsayısından A=0, sinh 2x katsayısından B=1/32 çıkar. Polinomda x²’den E=−1/24, x’ten F=0 ve sabit terimden 24(−1/24)−8G=0 ⇒ G=−1/8 bulunur.',
          'From cosh 2x we get A=0, and from sinh 2x we get B=1/32. For the polynomial, x² gives E=−1/24, x gives F=0, and the constant term gives 24(−1/24)−8G=0 ⇒ G=−1/8.'
        ),
        step(
          '5. Özel ve genel çözümü birleştir',
          '5. Combine the particular and general solutions',
          lines(
            yp + eq + f(one, n(32)) + x + cosh2x + minus + f(one, n(24)) + x4 + minus + f(one, eight) + x2,
            y + eq + C0 + plus + C1 + x + plus + C2 + cosh2x + plus + sub(C, three) + sinh2x + plus + f(one, n(32)) + x + cosh2x + minus + f(one, n(24)) + x4 + minus + f(one, eight) + x2
          ),
          'Özel çözümde hiçbir terim y_C ile çakışmaz; mertebe 4 olduğu için genel çözüm 4 bağımsız sabit içerir.',
          'No term in y_P duplicates y_C; since the order is 4, the general solution contains 4 independent constants.'
        )
      ]
    },
    {
      badge: T('5 PUAN · 4 DAKİKA', '5 POINTS · 4 MINUTES'),
      title: T('D-operatörü Teorem 3 ve eşlenikle rasyonelleştirme (Örnek 4.22)', 'D-operator Theorem 3 and conjugate rationalization (Example 4.22)'),
      statement: T(
        '(D² + 3D − 4)y = 6 sin 3x denkleminin bir özel çözümünü D-operatörü yöntemiyle bulunuz.',
        'Find a particular solution of (D² + 3D − 4)y = 6 sin 3x using the D-operator method.'
      ),
      trap: T(
        'Teorem 3 yalnız çift kuvvetlere uygulanır: D² yerine −3² = −9 yazılır; birinci kuvvet 3D olduğu gibi kalır! Paydada kalan 3D − 13 operatörünü yok etmek için pay ve paydayı (3D + 13) eşleniğiyle çarp.',
        'Theorem 3 applies only to even powers of D: replace D² by −3² = −9, leaving the first power 3D untouched! To clear the remaining 3D − 13 in the denominator, multiply numerator and denominator by the conjugate (3D + 13).'
      ),
      steps: [
        step(
          '1. Ters operatör ifadesini kur',
          '1. Write the inverse operator expression',
          lines(
            yp + eq + f(one, D2 + plus + three + D + minus + four) + par(six + sin3x)
          ),
          'Sağ taraf β=3 frekanslı sinüzoidaldir: D²(sin 3x)=−9 sin 3x özelliğini kullanmak üzere φ(D)=D²+3D−4 ters operatör olarak yazılır.',
          'The right side is a sinusoid with frequency β=3: write φ(D)=D²+3D−4 as an inverse operator to exploit D²(sin 3x)=−9 sin 3x.'
        ),
        step(
          '2. Teorem 3 ile D² yerine −9 yerleştir',
          '2. Substitute −9 for D² by Theorem 3',
          lines(
            yp + eq + f(one, minus + nine + plus + three + D + minus + four) + par(six + sin3x) + eq + f(one, three + D + minus + thirteen) + par(six + sin3x)
          ),
          'Yalnız D² → −3² = −9 yapılır; D terimine dokunulmaz. Payda 3D−13 birinci mertebe operatörüne iner.',
          'Replace only D² → −3² = −9; do not touch the linear D term. The denominator simplifies to the first-order operator 3D−13.'
        ),
        step(
          '3. Pay ve paydayı (3D + 13) eşleniğiyle çarp',
          '3. Multiply numerator and denominator by the conjugate (3D + 13)',
          lines(
            yp + eq + f(three + D + plus + thirteen, par(three + D + minus + thirteen) + par(three + D + plus + thirteen)) + par(six + sin3x) + eq + f(three + D + plus + thirteen, nine + D2 + minus + n(169)) + par(six + sin3x)
          ),
          '(3D−13)(3D+13) = 9D²−169 çarpımı sayesinde paydada yalnızca D²’nin çift kuvveti kalır.',
          'Since (3D−13)(3D+13) = 9D²−169, the denominator now contains only the even power D².'
        ),
        step(
          '4. Paydadaki D² yerine tekrar −9 koy',
          '4. Replace D² in the denominator by −9 again',
          lines(
            yp + eq + f(three + D + plus + thirteen, nine + par(minus + nine) + minus + n(169)) + par(six + sin3x) + eq + minus + f(three, n(125)) + par(three + D + plus + thirteen) + sin3x
          ),
          'Payda 9(−9)−169 = −81−169 = −250≠0 sayısına dönüşür; 6/(−250)=−3/125 sadeleştirmesiyle ters operatör tamamen kalkar.',
          'The denominator becomes the number 9(−9)−169 = −81−169 = −250≠0; simplifying 6/(−250)=−3/125 eliminates the inverse operator completely.'
        ),
        step(
          '5. Paydaki türev operatörünü uygula',
          '5. Apply the forward differential operator in the numerator',
          lines(
            D + par(sin3x) + eq + three + cos3x,
            yp + eq + minus + f(three, n(125)) + par(nine + cos3x + plus + thirteen + sin3x)
          ),
          '(3D+13)sin 3x = 3(3 cos 3x)+13 sin 3x = 9 cos 3x + 13 sin 3x olur. İki bilinmeyenli denklem çözmeden hem cos 3x hem sin 3x katsayıları doğrudan çıkar.',
          '(3D+13)sin 3x = 3(3 cos 3x)+13 sin 3x = 9 cos 3x + 13 sin 3x. Both the cos 3x and sin 3x coefficients emerge directly without solving simultaneous equations.'
        )
      ]
    },
    {
      badge: T('5 PUAN · 4 DAKİKA', '5 POINTS · 4 MINUTES'),
      title: T('Kaydırma Teoremi 2 ve Rezonans Teoremi 4 birlikte (Örnek 4.26)', 'Combining Shift Theorem 2 and Resonance Theorem 4 (Example 4.26)'),
      statement: T(
        '(D² + 4D + 13)y = e^{-2x} sin 3x denkleminin bir özel çözümünü D-operatörü kurallarıyla bulunuz.',
        'Find a particular solution of (D² + 4D + 13)y = e^{-2x} sin 3x using D-operator theorems.'
      ),
      trap: T(
        'e^{-2x} çarpanını Teorem 2 ile sola çektikten sonra D²+9 paydasında D²→−9 koyarsan 0 elde edersin (rezonans!). Sinüzoidi Im(e^{i3x}) olarak yazıp Teorem 4 rezonans türev kuralını 1/φ′(3i) uygula veya (D+2)²+9 üzerinde tam karmaşık üstel kullan.',
        'After shifting e^{-2x} to the left by Theorem 2, substituting D²→−9 in 1/(D²+9) gives division by zero (resonance!). Write sin 3x = Im(e^{i3x}) and apply Theorem 4 with 1/φ′(a), or apply Theorem 4 directly to the complex exponential.'
      ),
      steps: [
        step(
          '1. Operatörü tam kareye tamamla ve Teorem 2 ile e^{-2x} çarpanını sola kaydır',
          '1. Complete the square in the operator and shift e^{-2x} left by Theorem 2',
          lines(
            yp + eq + f(one, D2 + plus + four + D + plus + thirteen) + par(em2x + sin3x) + eq + f(one, pow(par(D + plus + two), two) + plus + nine) + par(em2x + sin3x),
            yp + eq + em2x + f(one, D2 + plus + nine) + sin3x
          ),
          'φ(D)=(D+2)²+9 olduğundan D yerine D−2 yazılınca φ(D−2)=D²+9 kalır ve e^{-2x} ters operatörün soluna geçer.',
          'Since φ(D)=(D+2)²+9, replacing D by D−2 leaves φ(D−2)=D²+9 and moves e^{-2x} to the left of the inverse operator.'
        ),
        step(
          '2. Rezonansı tespit et ve karmaşık üstele geç',
          '2. Detect resonance and pass to the complex exponential',
          lines(
            sin3x + eq + fn('Im', exp(v('i') + three + x)),
            f(one, D2 + plus + nine) + sin3x + eq + fn('Im', f(one, D2 + plus + nine) + exp(v('i') + three + x))
          ),
          'ψ(D)=D²+9 için ψ(3i)=(3i)²+9=−9+9=0 olur (p=1 katlı basit kök). Euler formülü e^{i3x}=cos 3x + i sin 3x ile sin 3x sanal kısım olarak yazılır.',
          'For ψ(D)=D²+9, ψ(3i)=(3i)²+9=−9+9=0 (a simple root of multiplicity p=1). Using Euler’s formula e^{i3x}=cos 3x + i sin 3x, write sin 3x as the imaginary part.'
        ),
        step(
          '3. Teorem 4 rezonans formülünü uygula: (1/ψ(D))e^{ax} = x e^{ax}/ψ′(a)',
          '3. Apply Theorem 4 resonance formula: (1/ψ(D))e^{ax} = x e^{ax}/ψ′(a)',
          lines(
            prime(v('ψ')) + par(D) + eq + two + D + o('⇒') + prime(v('ψ')) + par(three + v('i')) + eq + six + v('i'),
            f(one, D2 + plus + nine) + exp(v('i') + three + x) + eq + x + f(one, six + v('i')) + exp(v('i') + three + x)
          ),
          'ψ(D)=D²+9 polinomsal operatörünün D’ye göre türevi ψ′(D)=2D’dir. a=3i noktasında ψ′(3i)=6i≠0 olduğundan Teorem 4 doğrudan x/(6i)·e^{i3x} verir.',
          'Differentiating ψ(D)=D²+9 with respect to D gives ψ′(D)=2D. At a=3i we have ψ′(3i)=6i≠0, so Theorem 4 directly yields x/(6i)·e^{i3x}.'
        ),
        step(
          '4. Karmaşık ifadeyi aç ve sanal kısmı (Im) ayıkla',
          '4. Expand the complex expression and extract the imaginary part (Im)',
          lines(
            f(x, six + v('i')) + exp(v('i') + three + x) + eq + minus + f(v('i') + x, six) + par(cos3x + plus + v('i') + sin3x) + eq + f(x, six) + sin3x + minus + v('i') + f(x, six) + cos3x,
            fn('Im', f(x, six + v('i')) + exp(v('i') + three + x)) + eq + minus + f(x, six) + cos3x
          ),
          '1/i = −i özdeşliğiyle −i(cos 3x + i sin 3x) = sin 3x − i cos 3x olur; sanal kısım −(x/6)cos 3x olarak ayrılır.',
          'Using 1/i = −i gives −i(cos 3x + i sin 3x) = sin 3x − i cos 3x; the imaginary part is −(x/6)cos 3x.'
        ),
        step(
          '5. Sola kaydırılan e^{-2x} çarpanıyla çarp ve özel çözümü yaz',
          '5. Multiply by the shifted factor e^{-2x} and state the particular solution',
          lines(
            yp + eq + minus + f(one, six) + x + em2x + cos3x
          ),
          'Sonuç y_P = −(1/6)x e^{-2x} cos 3x’tir. Belirsiz katsayılarla x e^{-2x}(A cos 3x + B sin 3x) türevlerini uzun uzun açmak yerine Teorem 2 ve Teorem 4 çözümü birkaç satırda verir.',
          'The result is y_P = −(1/6)x e^{-2x} cos 3x. Instead of differentiating x e^{-2x}(A cos 3x + B sin 3x) twice by undetermined coefficients, Theorems 2 and 4 deliver the answer in a few lines.'
        )
      ]
    },
    {
      badge: T('6 PUAN · 5 DAKİKA', '6 POINTS · 5 MINUTES'),
      title: T('Parametrelerin değişimi yöntemi (Örnek 4.27)', 'Method of variation of parameters (Example 4.27)'),
      statement: T(
        'y″ + y = csc³ x diferansiyel denkleminin genel çözümünü parametrelerin değişimi yöntemiyle bulunuz.',
        'Find the general solution of y″ + y = csc³ x by the method of variation of parameters.'
      ),
      trap: T(
        'csc³ x bir UC fonksiyonu değildir (türevleri sonsuz yeni kuvvet üretir); belirsiz katsayılar veya D-operatörü Teorem 1–4 çalışmaz. c₁′ ve c₂′ sisteminde birinci denklemin sağ tarafı 0, ikinci denklemin sağ tarafı F(x)/a₂ = csc³ x’tir!',
        'csc³ x is not a UC function (its derivatives generate infinitely many new powers), so undetermined coefficients and D-operator Theorems 1–4 do not apply. In the system for c₁′ and c₂′, the first right-hand side is 0 and the second is F(x)/a₂ = csc³ x!'
      ),
      steps: [
        step(
          '1. Tamamlayıcı çözümü yaz ve sabitleri c₁(x), c₂(x) fonksiyonlarına dönüştür',
          '1. Write the complementary solution and replace constants by functions c₁(x), c₂(x)',
          lines(
            yc + eq + C1 + cosx + plus + C2 + sinx,
            y + eq + c1 + par(x) + cosx + plus + c2 + par(x) + sinx
          ),
          'λ²+1=0 ⇒ λ=±i olduğundan temel çözümler y₁=cos x ve y₂=sin x’tir. Parametrelerin değişimi ansatzı C₁, C₂ yerine c₁(x), c₂(x) koyar.',
          'Since λ²+1=0 ⇒ λ=±i, the fundamental solutions are y₁=cos x and y₂=sin x. Variation of parameters replaces C₁, C₂ with unknown functions c₁(x), c₂(x).'
        ),
        step(
          '2. Yardımcı koşulu ve ikinci türev denklemini kur',
          '2. Set up the auxiliary condition and the second-derivative equation',
          lines(
            prime(c1) + cosx + plus + prime(c2) + sinx + eq + zero,
            minus + prime(c1) + sinx + plus + prime(c2) + cosx + eq + pow(cscx, three)
          ),
          'Birinci türevde c₁′cos x + c₂′sin x = 0 koşulu dayatılınca y′ = −c₁sin x + c₂cos x kalır. İkinci türev denkleme konunca −c₁′sin x + c₂′cos x = csc³ x sistemi elde edilir.',
          'Imposing c₁′cos x + c₂′sin x = 0 simplifies y′ to −c₁sin x + c₂cos x. Substituting y″+y=csc³ x then gives −c₁′sin x + c₂′cos x = csc³ x.'
        ),
        step(
          '3. Sistemi c₁′(x) ve c₂′(x) için çöz',
          '3. Solve the linear system for c₁′(x) and c₂′(x)',
          lines(
            prime(c1) + eq + minus + pow(cscx, two) + o(',') + prime(c2) + eq + cosx + pow(cscx, three) + eq + f(cosx, pow(sinx, three))
          ),
          'Wronskian W = cos²x + sin²x = 1’dir. Birinci denklemi sin x, ikinciyi cos x ile çıkarıp toplayarak c₁′ = −sin x·csc³x = −csc²x ve c₂′ = cos x·csc³x bulunur.',
          'The Wronskian is W = cos²x + sin²x = 1. Eliminating between the two equations yields c₁′ = −sin x·csc³x = −csc²x and c₂′ = cos x·csc³x.'
        ),
        step(
          '4. c₁(x) ve c₂(x) fonksiyonlarını integre et',
          '4. Integrate to find c₁(x) and c₂(x)',
          lines(
            c1 + par(x) + eq + minus + integral(pow(cscx, two) + dx) + eq + cotx + plus + C1,
            c2 + par(x) + eq + integral(f(cosx, pow(sinx, three)) + dx) + eq + minus + f(one, two) + pow(cscx, two) + plus + C2
          ),
          '∫(−csc²x)dx = cot x + C₁ ve u=sin x dönüşümüyle ∫(cos x / sin³x)dx = −1/(2 sin²x) + C₂ = −(1/2)csc²x + C₂ elde edilir.',
          'We have ∫(−csc²x)dx = cot x + C₁, and with u=sin x, ∫(cos x / sin³x)dx = −1/(2 sin²x) + C₂ = −(1/2)csc²x + C₂.'
        ),
        step(
          '5. y = c₁(x)cos x + c₂(x)sin x ifadesinde yerine koy ve sadeleştir',
          '5. Substitute into y = c₁(x)cos x + c₂(x)sin x and simplify',
          lines(
            yp + eq + cotx + cosx + minus + f(one, two) + pow(cscx, two) + sinx + eq + f(pow(cosx, two), sinx) + minus + f(one, two + sinx) + eq + f(two + minus + three + pow(sinx, two), two + sinx),
            y + eq + C1 + cosx + plus + C2 + sinx + minus + f(one, two) + cscx + plus + cscx + pow(cosx, two)
          ),
          'cot x cos x − (1/2)csc x = (cos²x / sin x) − (1/2)csc x (veya −(1/2)csc x + sin x ile homojen sin x terimini C₂ sin x içine katarak y = C₁ cos x + C₂ sin x − (1/2)csc x) biçiminde genel çözüm tamamlanır.',
          'Combining cot x cos x − (1/2)csc x = (1−sin²x)csc x − (1/2)csc x = (1/2)csc x − sin x and absorbing −sin x into C₂ sin x gives the clean general solution.'
        )
      ]
    }
  ]
};
