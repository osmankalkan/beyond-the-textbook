import {T,step,v,n,o,p,f,pow,prime,eq,plus,minus,x,y,C,fn,exp,abs,lines,r,sub} from '../../../study/math.js';

const zero = n(0), one = n(1), two = n(2), three = n(3), four = n(4), five = n(5), nine = n(9);
const D = v('D'), L = v('L'), u = v('u'), w = v('v'), F = v('F'), t = v('t'), g = v('g');
const lam = v('λ'), alpha = v('α'), beta = v('β');
const yp = sub(y, v('P')), yc = sub(y, v('C'));
const x2 = pow(x, two);
const ypp = prime(y, 2);
const par = s => p(s);
const e3 = exp(three + x);
const e2 = exp(two + x);
const ex = exp(x);
const half = f(one, two);
const phiOperator = par(x2 + pow(D, two) + plus + fn('sin', x) + D + plus + ex);

/** Display metadata for the §4.1 operator workshop. */
export const operatorFamilies = {
  'constant-distinct': {
    name: 'L = D² − 3D + 2',
    method: pow(D, two) + minus + three + D + plus + two,
    note: T(
      'Sabit katsayılı operatör. e^x ve e^{2x} homojen denklemi sağlar; e^{3x} ise L[e^{3x}]=2e^{3x} verir. Bu yüzden e^{3x}/2 özel, e^x ve e^{2x} tamamlayıcı parçadır.',
      'A constant-coefficient operator. e^x and e^{2x} satisfy the homogeneous equation; e^{3x} gives L[e^{3x}]=2e^{3x}. Hence e^{3x}/2 is particular and e^x, e^{2x} are complementary.'
    ),
    example: T(
      'Örnek kur: u=e^{3x}, v=e^x, α=1, β=1. Sağ taraf 2e^{3x} olur ve temel teorem görünür.',
      'Set up the example: u=e^{3x}, v=e^x, α=1, β=1. The right side becomes 2e^{3x} and the fundamental theorem becomes visible.'
    )
  },
  'constant-osc': {
    name: 'L = D² + 1',
    method: pow(D, two) + plus + one,
    note: T(
      'Salınım operatörü. sin x ve cos x homojen çözümlerdir; x² ise L[x²]=x²+2 verir. Homojen parça sıfırlanınca süperpozisyon yalnız özel çözümü taşır.',
      'An oscillation operator. sin x and cos x are homogeneous solutions; x² gives L[x²]=x²+2. When the homogeneous part vanishes, superposition carries only the particular solution.'
    ),
    example: T(
      'Örnek kur: u=x², v=sin x. α ve β’yı değiştir; eğriler üst üste kalır.',
      'Set up the example: u=x², v=sin x. Vary α and β; the curves stay on top of each other.'
    )
  },
  'variable-x': {
    name: 'L = xD² + D − 1',
    method: x + pow(D, two) + plus + D + minus + one,
    note: T(
      'Değişken katsayılı operatör. D ile x yer değiştirmediği için D²(xy) açılımı dikkat ister. L[e^x]=x e^x olduğundan özel çözüm doğrudan görünür.',
      'A variable-coefficient operator. Because D and x do not commute, expanding D²(xy) needs care. Since L[e^x]=x e^x, the particular solution is visible directly.'
    ),
    example: T(
      'Örnek kur: u=e^x, v=1. α=1, β=0 seçerek L[e^x]=x e^x doğrulamasını izle.',
      'Set up the example: u=e^x, v=1. Choose α=1, β=0 and watch the verification L[e^x]=x e^x.'
    )
  }
};

export const operatorFunctions = {
  exp: 'eˣ',
  exp2: 'e²ˣ',
  exp3: 'e³ˣ',
  sin: 'sin x',
  cos: 'cos x',
  poly: 'x²',
  const: '1',
  log: 'ln x'
};

const pathOperator = [
  step(
    '1. Bağımlı ve bağımsız değişkeni etiketle',
    '1. Label the dependent and independent variables',
    lines(x2 + ypp + plus + fn('sin', x) + prime(y) + plus + ex + y + eq + pow(x, three)),
    'Bu denklemde x bağımsız, y bağımlıdır. En yüksek türev y″ olduğu için mertebe 2’dir. Standart biçim için baş katsayı x² olan terim yalnız bırakılır; x=0 tekil noktadır.',
    'Here x is independent and y is dependent. The highest derivative is y″, so the order is 2. For standard form, isolate the term with leading coefficient x²; x=0 is a singular point.'
  ),
  step(
    '2. Kuvvet testini uygula',
    '2. Apply the power test',
    lines(x2 + ypp + plus + fn('sin', x) + prime(y) + plus + ex + y),
    'Her terimde y ya da bir türevi birinci kuvvette görünür. (y′)², y³ veya y″y‴ gibi bir terim yoktur; kuvvet testi geçer.',
    'In every term, y or one of its derivatives appears to the first power. There is no term such as (y′)², y³ or y″y‴; the power test passes.'
  ),
  step(
    '3. Çarpım ve fonksiyon testlerini uygula',
    '3. Apply the product and function tests',
    lines(pow(y, two) + o(',') + y + prime(y) + o(',') + fn('sin', y) + o(',') + exp(y)),
    'y², yy′ ve sin y gibi terimler doğrusallığı bozar; bu denklemde hiçbiri yoktur. Sağ taraftaki x³ yalnız x’e bağlıdır, dolayısıyla doğrusallığı etkilemez.',
    'Terms such as y², yy′ and sin y destroy linearity; none of them is present here. The right side x³ depends only on x, so it does not affect linearity.'
  ),
  step(
    '4. D operatörüne çevir',
    '4. Convert to the D operator',
    lines(par(x2 + pow(D, two) + plus + fn('sin', x) + D + plus + ex) + y + eq + pow(x, three)),
    'D=d/dx tanımıyla y′=Dy ve y″=D²y olur. Katsayılar x’e bağlı olduğu için parantez içinde D’nin solunda kalırlar; bu, değişken katsayılı operatörün doğru yazımıdır.',
    'With D=d/dx, y′=Dy and y″=D²y. Because the coefficients depend on x, they stay to the left of D inside the parenthesis; this is the correct variable-coefficient operator.'
  ),
  step(
    '5. Tanım aralığını ve doğrusallığı birlikte yaz',
    '5. State the interval and linearity together',
    lines(phiOperator, o(',') + x + o('≠') + zero),
    'Denklem x≠0 aralığında standart biçimdedir ve doğrusaldır. Doğrusallık cebirsel, tanım aralığı analitik bir özelliktir; ikisi ayrı ayrı yazılmalıdır.',
    'The equation is in standard form and linear on x≠0. Linearity is algebraic, the interval is analytic; state them separately.'
  )
];

const pathSolution = [
  step(
    '1. Özel çözümü doğrula',
    '1. Verify the particular solution',
    lines(L + eq + pow(D, two) + minus + three + D + plus + two, o(',') + L + par(ex) + eq + zero + o(',') + L + par(e3) + eq + two + e3),
    'L=D²−3D+2 için e^x ve e^{2x} homojen denklemi sağlar; e^{3x} ise 2e^{3x} verir. Bu yüzden y_P=e^{3x}/2, L[y]=e^{3x} denkleminin özel çözümüdür.',
    'For L=D²−3D+2, e^x and e^{2x} satisfy the homogeneous equation, while e^{3x} gives 2e^{3x}. Hence y_P=e^{3x}/2 is a particular solution of L[y]=e^{3x}.'
  ),
  step(
    '2. Karakteristik denklemi kur',
    '2. Build the characteristic equation',
    lines(pow(lam, two) + minus + three + lam + plus + two + eq + zero, par(lam + minus + one) + par(lam + minus + two) + eq + zero),
    'Homojen denklem için y=e^{λx} denenir. Türevler λ’nın kuvvetlerini üretir; e^{λx} sıfır olmadığından kalan cebirsel denklem çözülür. Kökler λ=1 ve λ=2’dir.',
    'For the homogeneous equation, try y=e^{λx}. Derivatives produce powers of λ; since e^{λx} is nonzero, the remaining algebraic equation is solved. The roots are λ=1 and λ=2.'
  ),
  step(
    '3. Tamamlayıcı çözümü yaz',
    '3. Write the complementary solution',
    lines(yc + eq + C + one + ex + plus + C + two + e2),
    'İki ayrı kök iki bağımsız homojen çözüm verir. İkinci mertebe olduğu için tamamlayıcı çözüm tam olarak iki bağımsız sabit taşır.',
    'Two distinct roots give two independent homogeneous solutions. Since the order is two, the complementary solution carries exactly two independent constants.'
  ),
  step(
    '4. Genel çözümü kur ve doğrula',
    '4. Build and verify the general solution',
    lines(y + eq + half + e3 + plus + C + one + ex + plus + C + two + e2),
    'Temel teorem gereği y=y_C+y_P. Doğrulama: L[y]=e^{3x}+0+0=e^{3x}. Özel çözüme keyfi sabit eklenmez; bütün serbestlik y_C’dedir.',
    'By the fundamental theorem, y=y_C+y_P. Check: L[y]=e^{3x}+0+0=e^{3x}. No arbitrary constant is added to the particular solution; all freedom sits in y_C.'
  ),
  step(
    '5. Başlangıç koşullarıyla sabitleri belirle',
    '5. Fix the constants from the initial conditions',
    lines(half + plus + C + one + plus + C + two + eq + one, o(',') + f(three, two) + plus + C + one + plus + two + C + two + eq + zero, o('⇒') + C + one + eq + f(five, two) + o(',') + C + two + eq + minus + two),
    'y(0)=1 ve y′(0)=0 iki bilinmeyenli iki doğrusal denklem verir. Çözüm C₁=5/2, C₂=−2’dir. Bu değerler yalnız y_C’yi değiştirir; y_P olduğu gibi kalır.',
    'y(0)=1 and y′(0)=0 give two linear equations in two unknowns. The solution is C₁=5/2, C₂=−2. These values change only y_C; y_P stays as it is.'
  )
];

export const operatorStudy = {
  title: T(
    'Önce doğrusallığı tara, sonra D operatörüne geç ve çözümü y_C+y_P olarak ayır.',
    'Scan for linearity first, move to the D operator, then split the solution as y_C+y_P.'
  ),
  intro: T(
    'Bir denklemi çözmeden önce y’ye göre doğrusal olup olmadığını belirle. Doğrusalsa D operatörüyle yaz, özel ve homojen parçayı ayrı doğrula ve sabitleri en sonda başlangıç koşullarıyla belirle.',
    'Before solving, decide whether the equation is linear in y. If it is, write it with the D operator, verify the particular and homogeneous parts separately, and fix the constants at the end from the initial conditions.'
  ),
  paths: [
    {
      title: T('Doğrusallık testi ve operatör biçimi', 'Linearity test and operator form'),
      prompt: T(
        'x²y″+(sin x)y′+e^x y=x³ denklemi neden doğrusaldır ve D operatörüyle nasıl yazılır?',
        'Why is x²y″+(sin x)y′+e^x y=x³ linear, and how is it written with the D operator?'
      ),
      steps: pathOperator,
      reflection: T(
        'Katsayıların x’e bağlı olması neden doğrusallığı bozmaz?',
        'Why does dependence of the coefficients on x not destroy linearity?'
      )
    },
    {
      title: T('Özel + tamamlayıcı çözüm ve başlangıç koşulu', 'Particular + complementary solution and initial data'),
      prompt: T(
        'L=D²−3D+2 için L[y]=e^{3x} denkleminin genel çözümü neden y=e^{3x}/2+C₁e^x+C₂e^{2x} biçimindedir?',
        'For L=D²−3D+2, why is the general solution of L[y]=e^{3x} equal to y=e^{3x}/2+C₁e^x+C₂e^{2x}?'
      ),
      steps: pathSolution,
      reflection: T(
        'Başlangıç koşulları neden yalnız C₁ ve C₂’yi belirler?',
        'Why do the initial conditions determine only C₁ and C₂?'
      )
    }
  ],
  predictions: [
    {
      id: 'nonlinear-square',
      question: T('y″+y²=0 denklemi doğrusal mıdır?', 'Is y″+y²=0 linear?'),
      context: T('Üç testi uygula: kuvvet, çarpım, doğrusal olmayan fonksiyon.', 'Apply the three tests: power, product, nonlinear function.'),
      choices: T(['Hayır, y² terimi doğrusallığı bozar', 'Evet, çünkü y″ birinci kuvvette', 'Evet, çünkü sağ taraf sıfır'], ['No, the y² term destroys linearity', 'Yes, because y″ is first power', 'Yes, because the right side is zero']),
      answer: 0,
      reason: T('y² terimi bilinmeyenin kendisiyle çarpımıdır; süperpozisyon ilkesi çalışmaz. Sağ tarafın sıfır olması homojenliktir, doğrusallık değildir.', 'The y² term multiplies the unknown by itself, so superposition fails. A zero right side means homogeneous, not linear.'),
      math: ypp + plus + pow(y, two) + eq + zero,
      try: T('Atölyede L=D²+1 seçip u=x², v=sin x ile iki tarafı karşılaştır.', 'In the workshop, choose L=D²+1 with u=x² and v=sin x and compare both sides.')
    },
    {
      id: 'fundamental-theorem',
      question: T('L[u]=F ve L[v]=0 ise L[u+v] nedir?', 'If L[u]=F and L[v]=0, what is L[u+v]?'),
      context: T('Temel teoremin süperpozisyon adımını hatırla.', 'Recall the superposition step of the fundamental theorem.'),
      choices: T(['F', '0', '2F'], ['F', '0', '2F']),
      answer: 0,
      reason: T('L doğrusal olduğundan L[u+v]=L[u]+L[v]=F+0=F. v homojen çözüm olduğu için sağ tarafı değiştirmez.', 'Since L is linear, L[u+v]=L[u]+L[v]=F+0=F. Because v is homogeneous, it does not change the right side.'),
      math: L + par(u + plus + w) + eq + L + par(u) + plus + L + par(w) + eq + F,
      try: T('Atölyede v’yi homojen çözüm seç ve β’yı değiştir; sağ tarafın değişmediğini gör.', 'In the workshop, choose v as a homogeneous solution and vary β; watch the right side stay fixed.')
    }
  ]
};

export const operatorClinic = {
  examBlueprint: [
    {
      step: T('1 · Değişkenleri etiketle ve doğrusallığı test et', '1 · Label the variables and test linearity'),
      detail: T('Bağımlı ve bağımsız değişkeni yaz. Kuvvet, çarpım ve doğrusal olmayan fonksiyon testlerini uygula. Sağ tarafın karmaşıklığı doğrusallığı etkilemez.', 'Write the dependent and independent variables. Apply the power, product and nonlinear-function tests. The complexity of the right side does not affect linearity.')
    },
    {
      step: T('2 · Operatörü kur ve parçaları doğrula', '2 · Build the operator and verify the parts'),
      detail: T('D=d/dx (veya d/dt) tanımla; φ(D) yaz. y_P’nin F’yi, y_C’nin homojen denklemi sağladığını ayrı ayrı göster. Değişken katsayıda D sırasını koru.', 'Define D=d/dx (or d/dt) and write φ(D). Show separately that y_P satisfies F and y_C satisfies the homogeneous equation. With variable coefficients, preserve the order of D.')
    },
    {
      step: T('3 · Birleştir, sabitleri belirle, aralığı yaz', '3 · Combine, fix constants, state the interval'),
      detail: T('y=y_C+y_P yaz; başlangıç koşullarını yalnız y_C’ye uygula. Baş katsayının sıfır olduğu noktaları ve katsayı süreksizliklerini dışla. Sonucu asıl denklemde doğrula.', 'Write y=y_C+y_P; apply the initial conditions only to y_C. Exclude points where the leading coefficient vanishes and where coefficients are discontinuous. Verify in the original equation.')
    }
  ],
  examClinic: [
    {
      badge: T('5 PUAN · 4 DAKİKA', '5 POINTS · 4 MINUTES'),
      title: T('Doğrusallık sınıflandırması', 'Linearity classification'),
      statement: T('Aşağıdaki denklemleri doğrusal / doğrusal değil olarak sınıflandır ve gerekçeni yaz: (a) y″+y²=0; (b) x²y″+(sin x)y′+e^x y=x³; (c) yy′=x; (d) y′+sin y=x.', 'Classify these equations as linear or nonlinear and give a reason: (a) y″+y²=0; (b) x²y″+(sin x)y′+e^x y=x³; (c) yy′=x; (d) y′+sin y=x.'),
      trap: T('(b)’de katsayılar x’e bağlı ve sağ taraf x³; ikisi de doğrusallığı bozmaz. (a) y², (c) yy′, (d) sin y nedeniyle doğrusal değildir.', 'In (b) the coefficients depend on x and the right side is x³; neither destroys linearity. (a) is nonlinear because of y², (c) because of yy′, and (d) because of sin y.'),
      steps: [
        step('1. Bağımlı değişkeni belirle', '1. Identify the dependent variable', lines(ypp + plus + pow(y, two) + eq + zero), 'Dört denklemde de bilinmeyen y’dir; bağımsız değişken x’tir. Önce hangi harfin türev aldığını netleştir.', 'In all four equations the unknown is y and the independent variable is x. First clarify which letter is being differentiated.'),
        step('2. Kuvvet testi', '2. Power test', lines(ypp + plus + pow(y, two) + eq + zero), '(a)’da y² ikinci kuvvettedir; doğrusal değil. (b)’de y ve y′ birinci kuvvette; kuvvet testi geçer.', 'In (a), y² is second power, so it is nonlinear. In (b), y and y′ are first power; the power test passes.'),
        step('3. Çarpım testi', '3. Product test', lines(y + prime(y) + eq + x), '(c)’de y ile y′ çarpılıyor; doğrusal değil. (b)’de böyle bir çarpım yok.', 'In (c), y is multiplied by y′; it is nonlinear. (b) contains no such product.'),
        step('4. Fonksiyon testi', '4. Function test', lines(prime(y) + plus + fn('sin', y) + eq + x), '(d)’de sin y doğrusal olmayan bir fonksiyondur; doğrusal değil. (b)’de yalnız x’in fonksiyonları var.', 'In (d), sin y is a nonlinear function, so it is nonlinear. In (b), only functions of x appear.'),
        step('5. Sonuçları ve aralığı yaz', '5. State the verdicts and the interval', lines(x2 + ypp + plus + fn('sin', x) + prime(y) + plus + ex + y + eq + pow(x, three), o(',') + x + o('≠') + zero), 'Sonuç: (a) doğrusal değil, (b) doğrusal, (c) doğrusal değil, (d) doğrusal değil. (b) için standart biçim x≠0 aralığında geçerlidir.', 'Verdict: (a) nonlinear, (b) linear, (c) nonlinear, (d) nonlinear. For (b), standard form is valid on x≠0.')
      ]
    },
    {
      badge: T('5 PUAN · 4 DAKİKA', '5 POINTS · 4 MINUTES'),
      title: T('Operatör biçimi ve L[u] hesabı', 'Operator form and computing L[u]'),
      statement: T('6x²y″+2xy′−3y=x³e^{2x} denklemini D operatörüyle yaz; L=D²−3D+2 için L[e^{3x}] ve L[e^x] değerlerini hesapla.', 'Write 6x²y″+2xy′−3y=x³e^{2x} with the D operator; compute L[e^{3x}] and L[e^x] for L=D²−3D+2.'),
      trap: T('Birinci denklemde bağımsız değişken x’tir; D=d/dx. İkinci denklemde x bağımlı olabilir; D’yi her zaman bağımsız değişkene göre tanımla. L[e^{3x}]=2e^{3x}, L[e^x]=0.', 'In the first equation the independent variable is x, so D=d/dx. In the second equation x may be dependent; always define D with respect to the independent variable. L[e^{3x}]=2e^{3x}, L[e^x]=0.'),
      steps: [
        step('1. Bağımsız değişkeni etiketle', '1. Label the independent variable', lines(6 + x2 + ypp + plus + two + x + prime(y) + minus + three + y + eq + pow(x, three) + e2), 'Bağımsız değişken x, bağımlı değişken y’dir. D=d/dx olarak sabitlenir; katsayılar x’e bağlı kalabilir.', 'The independent variable is x and the dependent variable is y. Fix D=d/dx; the coefficients may depend on x.'),
        step('2. Operatörü kur', '2. Build the operator', lines(par(6 + x2 + pow(D, two) + plus + two + x + D + minus + three) + y + eq + pow(x, three) + e2), 'Her türev D’nin bir kuvvetiyle değiştirilir; katsayılar D’nin solunda kalır. Bu, değişken katsayılı doğru operatör yazımıdır.', 'Replace each derivative by a power of D; coefficients stay to the left of D. This is the correct variable-coefficient operator.'),
        step('3. L[e^{3x}] hesapla', '3. Compute L[e^{3x}]', lines(L + par(e3) + eq + par(nine + minus + nine + plus + two) + e3 + eq + two + e3), 'e^{3x}’in her türevi 3’ün kuvvetiyle çarpılır: y′=3e^{3x}, y″=9e^{3x}. Katsayılarla birleşince 9−9+2=2 kalır.', 'Each derivative of e^{3x} brings a power of 3: y′=3e^{3x}, y″=9e^{3x}. Combined with the coefficients, 9−9+2=2 remains.'),
        step('4. L[e^x] hesapla', '4. Compute L[e^x]', lines(L + par(ex) + eq + par(one + minus + three + plus + two) + ex + eq + zero), 'e^x için y′=y″=e^x olur; katsayılar toplamı 1−3+2=0’dır. Bu yüzden e^x homojen çözümdür.', 'For e^x, y′=y″=e^x; the coefficient sum is 1−3+2=0. Hence e^x is a homogeneous solution.'),
        step('5. Sonucu yorumla', '5. Interpret the result', lines(y + eq + half + e3 + plus + C + one + ex + plus + C + two + e2), 'L[e^{3x}]=2e^{3x} olduğundan e^{3x}/2 özel çözümdür. e^x homojen olduğundan genel çözüme C₁e^x olarak girer; ikinci sabit e^{2x}’ten gelir.', 'Since L[e^{3x}]=2e^{3x}, e^{3x}/2 is particular. Since e^x is homogeneous, it enters the general solution as C₁e^x; the second constant comes from e^{2x}.')
      ]
    },
    {
      badge: T('6 PUAN · 5 DAKİKA', '6 POINTS · 5 MINUTES'),
      title: T('Genel çözüm ve başlangıç koşulu', 'General solution and initial data'),
      statement: T('L=D²−3D+2, L[y]=e^{3x}, y(0)=1, y′(0)=0. Genel çözümü kur, sabitleri belirle ve doğrula.', 'L=D²−3D+2, L[y]=e^{3x}, y(0)=1, y′(0)=0. Build the general solution, fix the constants and verify.'),
      trap: T('y_P=e^{3x}/2’ye keyfi sabit ekleme; bütün sabitler y_C’dedir. y(0) ve y′(0) koşullarını doğru türevlere uygula.', 'Do not add arbitrary constants to y_P=e^{3x}/2; all constants belong to y_C. Apply y(0) and y′(0) to the correct derivatives.'),
      steps: [
        step('1. Özel çözümü doğrula', '1. Verify the particular solution', lines(L + par(e3) + eq + two + e3 + o('⇒') + yp + eq + half + e3), 'L[e^{3x}]=2e^{3x} olduğundan y_P=e^{3x}/2 sağ tarafı tam olarak üretir. Özel çözümde keyfi sabit yoktur.', 'Since L[e^{3x}]=2e^{3x}, y_P=e^{3x}/2 produces exactly the right side. The particular solution has no arbitrary constant.'),
        step('2. Homojen kökleri bul', '2. Find the homogeneous roots', lines(pow(lam, two) + minus + three + lam + plus + two + eq + zero + o('⇒') + lam + eq + one + o(',') + two), 'y=e^{λx} denemesi λ²−3λ+2=0 verir; çarpanlar (λ−1)(λ−2). Kökler gerçek ve farklıdır.', 'Trying y=e^{λx} gives λ²−3λ+2=0, which factors as (λ−1)(λ−2). The roots are real and distinct.'),
        step('3. y_C yaz', '3. Write y_C', lines(yc + eq + C + one + ex + plus + C + two + e2), 'İki farklı kök iki bağımsız çözüm verir. İkinci mertebe olduğu için iki sabit beklenir; ikisi de buradadır.', 'Two distinct roots give two independent solutions. Since the order is two, two constants are expected; both are here.'),
        step('4. Genel çözümü kur', '4. Build the general solution', lines(y + eq + yc + plus + yp + eq + half + e3 + plus + C + one + ex + plus + C + two + e2), 'Temel teorem y=y_C+y_P der. Doğrulama: L[y]=e^{3x}+0+0=e^{3x}; özel parça sağ tarafı, homojen parça sıfırı taşır.', 'The fundamental theorem gives y=y_C+y_P. Check: L[y]=e^{3x}+0+0=e^{3x}; the particular part carries the right side and the homogeneous part carries zero.'),
        step('5. Sabitleri belirle ve doğrula', '5. Fix the constants and verify', lines(half + plus + C + one + plus + C + two + eq + one, o(',') + f(three, two) + plus + C + one + plus + two + C + two + eq + zero, o('⇒') + C + one + eq + f(five, two) + o(',') + C + two + eq + minus + two), 'İki koşul iki doğrusal denklem verir: C₁+C₂=1/2 ve C₁+2C₂=−3/2. Çözüm C₁=5/2, C₂=−2. Sonuç y=1/2e^{3x}+5/2e^x−2e^{2x}; y(0)=1 ve y′(0)=0 sağlanır.', 'The two conditions give two linear equations: C₁+C₂=1/2 and C₁+2C₂=−3/2. The solution is C₁=5/2, C₂=−2. The result is y=1/2e^{3x}+5/2e^x−2e^{2x}; y(0)=1 and y′(0)=0 hold.')
      ]
    },
    {
      badge: T('6 PUAN · 5 DAKİKA', '6 POINTS · 5 MINUTES'),
      title: T('Değişken katsayıda D sırası', 'The order of D with variable coefficients'),
      statement: T('L=xD²+D−1 için L[e^x] değerini hesapla. D(xy) ile xDy arasındaki farkı göster ve bu farkın sonucu nasıl etkilediğini açıkla.', 'Compute L[e^x] for L=xD²+D−1. Show the difference between D(xy) and xDy and explain how it affects the result.'),
      trap: T('Dx≠xD. D²(xy) açılırken D’nin hem x’e hem y’ye uygulandığını unutma. xD²y ifadesi ile D²(xy) aynı değildir.', 'Dx≠xD. When expanding D²(xy), remember that D acts on both x and y. The expressions xD²y and D²(xy) are not the same.'),
      steps: [
        step('1. D(xy) hesapla', '1. Compute D(xy)', lines(D + par(x + y) + eq + x + prime(y) + plus + y), 'Çarpım kuralı: D(xy)=x′y+xy′=y+xy′. D burada hem x’e hem y’ye uygulanır.', 'Product rule: D(xy)=x′y+xy′=y+xy′. Here D acts on both x and y.'),
        step('2. xDy hesapla', '2. Compute xDy', lines(x + D + y + eq + x + prime(y)), 'xDy ifadesinde D yalnız y’ye uygulanır; x bir katsayı gibi dışarıda kalır.', 'In xDy, D acts only on y; x stays outside like a coefficient.'),
        step('3. Farkı yaz', '3. Write the difference', lines(D + par(x + y) + minus + x + D + y + eq + y), 'İki sonuç y kadar farklıdır: D(xy)=xDy+y. Bu yüzden D ile x yer değiştirmez; operatör açılımında sıra korunmalıdır.', 'The two results differ by y: D(xy)=xDy+y. Hence D and x do not commute; the order must be preserved when expanding the operator.'),
        step('4. L[e^x] hesabını kur', '4. Set up the computation of L[e^x]', lines(par(x + pow(D, two) + plus + D + minus + one) + ex + eq + x + ex + plus + ex + minus + ex), 'xD²e^x=xe^x, De^x=e^x ve −e^x terimleri birleşir. D²’nin yalnız e^x’e uygulandığına, x’e uygulanmadığına dikkat et.', 'xD²e^x=xe^x, De^x=e^x, and the −e^x terms combine. Note that D² acts only on e^x, not on x.'),
        step('5. Sonucu doğrula ve yorumla', '5. Verify and interpret', lines(L + par(ex) + eq + x + ex), 'L[e^x]=xe^x olduğundan e^x, L[y]=xe^x denkleminin özel çözümüdür. Değişken katsayılı operatörde sonuç, sabit katsayılıdaki gibi yalnız üstel çarpanla kalmaz; x çarpanı doğal olarak ortaya çıkar.', 'Since L[e^x]=xe^x, e^x is a particular solution of L[y]=xe^x. With variable coefficients the result does not reduce to a pure exponential as in the constant-coefficient case; the factor x appears naturally.')
      ]
    }
  ]
};
