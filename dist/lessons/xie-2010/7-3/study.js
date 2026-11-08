import {T, step, v, n, o, r, p, f, pow, sub, eq, plus, minus, x, y, t, fn, exp, lines, dot} from '../../../study/math.js';

const zero = n(0), one = n(1), two = n(2), three = n(3), four = n(4), five = n(5), six = n(6), eight = n(8), nine = n(9), ten = n(10), fourteen = n(14), fifteen = n(15), eighteen = n(18), twenty = n(20), twentyThree = n(23), thirty = n(30), forty = n(40), sixty = n(60);
const s = v('s'), tt = v('t'), tau = v('τ'), H = v('H'), pi = v('π');
const X = v('X'), Y = v('Y'), F = v('F'), L = v('L');
const x0 = sub(x, zero), y0 = sub(y, zero), vx0 = sub(dot(x), zero);
const Xs = fn('X', s), Ys = fn('Y', s);
const xZIR = sub(x, v('ZIR')), yZIR = sub(y, v('ZIR'));
const xZSR = sub(x, v('ZSR')), yZSR = sub(y, v('ZSR'));
const XZIR = sub(X, v('ZIR')), YZIR = sub(Y, v('ZIR'));
const XZSR = sub(X, v('ZSR')), YZSR = sub(Y, v('ZSR'));
const del = v('Δ'), delX = sub(v('Δ'), x), delY = sub(v('Δ'), y);
const imp = o('⇒'), cdot = o('·'), cos3 = fn('cos', three + tt), sin3 = fn('sin', three + tt);
const cos2 = fn('cos', two + tt), sin2 = fn('sin', two + tt);
const cost = fn('cos', tt), sint = fn('sin', tt);
const expNegT = exp(minus + tt), expNeg3T = exp(minus + three + tt), exp3T = exp(three + tt), expT = exp(tt), expNeg2T = exp(minus + two + tt);
const expNegPiS = exp(minus + pi + s), expNegS = exp(minus + s);

const matrix = rows => o('[') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '</mtable>' + o(']');
const det = rows => o('|') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '|';
const vector = items => matrix(items.map(item => [item]));

const pathLaplaceCramer = [
  step(
    '1. Diferansiyel sisteme Laplace dönüşümünü uygula',
    '1. Apply Laplace transform to the differential system',
    lines(
      fn('L', dot(x) + minus + three + x + minus + six + y) + eq + zero,
      fn('L', three + x + plus + dot(y) + plus + three + y) + eq + fn('L', eighteen + tt + expNeg3T)
    ),
    'Türev özelliği L{ẋ} = sX(s) - x(0) doğrudan sisteme yerleştirilir. Başlangıç koşulları denklemin sağ tarafına cebirsel terim olarak geçer.',
    'Apply the derivative rule L{ẋ} = sX(s) - x(0). Initial conditions transition directly into algebraic source terms on the right-hand side.'
  ),
  step(
    '2. Başlangıç koşullarını soğurarak s-uzayı matrisini kur',
    '2. Absorb initial conditions and set up s-domain matrix',
    lines(
      matrix([[s + minus + three, minus + six], [three, s + plus + three]]) + vector([Xs, Ys]) + eq + vector([x0, y0 + plus + f(eighteen, pow(s + plus + three, two))])
    ),
    'Diferansiyel sistem tamamen cebirsel bir lineer denklem sistemine dönüşür. x(0)=1, y(0)=0 değerleri sağ tarafa anında entegre edilir.',
    'The differential system becomes a completely algebraic linear system. The initial values x(0)=1, y(0)=0 are immediately absorbed on the RHS.'
  ),
  step(
    '3. Karakteristik determinantı Δ(s) hesapla',
    '3. Compute the characteristic determinant Δ(s)',
    lines(
      del + p(s) + eq + det([[s + minus + three, minus + six], [three, s + plus + three]]),
      del + p(s) + eq + p(s + minus + three) + p(s + plus + three) + plus + eighteen + eq + pow(s, two) + plus + nine
    ),
    'Determinant Δ(s) = s² + 9 kökleri s = ±3i verir. Sistemin doğal frekansı ω = 3 rad/s olup harmonik salınımlara karşılık gelir.',
    'The determinant Δ(s) = s² + 9 yields poles at s = ±3i, confirming the system’s natural frequency ω = 3 rad/s for harmonic oscillation.'
  ),
  step(
    '4. s-uzayında Cramer kuralını uygula',
    '4. Apply Cramer’s rule in the s-domain',
    lines(
      Xs + eq + f(delX + p(s), del + p(s)) + eq + f(s + plus + three, pow(s, two) + plus + nine) + plus + f(n(108), p(pow(s, two) + plus + nine) + pow(s + plus + three, two)),
      Ys + eq + f(delY + p(s), del + p(s)) + eq + minus + f(three, pow(s, two) + plus + nine) + plus + f(eighteen + p(s + minus + three), p(pow(s, two) + plus + nine) + pow(s + plus + three, two))
    ),
    'Cramer kuralı ile X(s) ve Y(s) doğrudan çözülür; her iki çözüm de kendiliğinden Sıfır Giriş (ZIR) ve Sıfır Durum (ZSR) bileşenlerine ayrışır.',
    'Cramer’s rule directly isolates X(s) and Y(s), which naturally decouple into Zero-Input Response (ZIR) and Zero-State Response (ZSR).'
  ),
  step(
    '5. Ters Laplace dönüşümü ile fazlalık sabitsiz çözümü tamamla',
    '5. Complete solution via inverse Laplace without excess constants',
    lines(
      x + p(tt) + eq + minus + cos3 + plus + sin3 + plus + two + p(one + plus + three + tt) + expNeg3T,
      y + p(tt) + eq + cos3 + minus + p(one + plus + six + tt) + expNeg3T
    ),
    'Operatör yöntemindeki gibi 4 sabit türetip 2 fazlalığı elemek gerekmez; Laplace yöntemi başlangıç koşullarını adım 1’de soğurduğundan tekil ve kesin çözüm üretir.',
    'Unlike the operator method which introduces 4 constants requiring elimination of 2, the Laplace transform incorporates initial conditions at step 1.'
  )
];

const pathPartialFractionsDelay = [
  step(
    '1. Gecikmeli zorlamanın Laplace dönüşümünü al',
    '1. Evaluate Laplace transform of delayed forcing',
    lines(
      fn('L', ten + fn('sin', two + tt) + fn('H', tt + minus + pi)) + eq + fn('L', ten + fn('sin', two + p(tt + minus + pi)) + fn('H', tt + minus + pi)),
      fn('L', ten + fn('sin', two + tt) + fn('H', tt + minus + pi)) + eq + expNegPiS + fn('L', ten + sin2) + eq + f(twenty + expNegPiS, pow(s, two) + plus + four)
    ),
    'sin(2t) = sin(2(t - π) + 2π) = sin(2(t - π)) trigonometrik özdeşliği sayesinde 2. kaydırma teoremi e^(-πs) F(s) çarpanı üretir.',
    'Using sin(2t) = sin(2(t - π)), the second shifting theorem yields an exponential factor e^(-πs) F(s) in the transform.'
  ),
  step(
    '2. Karakteristik determinantı ve sönümlü kutupları bul',
    '2. Find characteristic determinant and damped poles',
    lines(
      del + p(s) + eq + det([[s + plus + two, two + s + plus + five], [s, three + s + plus + one]]) + eq + pow(s, two) + plus + two + s + plus + two,
      del + p(s) + eq + pow(s + plus + one, two) + plus + one + imp + s + eq + minus + one + o('±') + v('i')
    ),
    'Kutup s = -1 ± i olup sistem e^(-t) sönümlü sinüzoidal özmodlara sahiptir.',
    'Poles at s = -1 ± i reveal exponentially decaying harmonic modes e^(-t) with unit frequency.'
  ),
  step(
    '3. ZIR pay ve paydalarını basit kesirlere ayır',
    '3. Expand ZIR into partial fractions',
    lines(
      XZIR + eq + f(two + s + minus + twentyThree, pow(s + plus + one, two) + plus + one) + eq + two + f(s + plus + one, pow(s + plus + one, two) + plus + one) + minus + twentyThree + f(one, pow(s + plus + one, two) + plus + one),
      xZIR + eq + expNegT + p(two + cost + minus + twentyThree + sint)
    ),
    'Payda (s + 1)² + 1 olduğundan pay (s + 1) cinsinden düzenlenir; sönümlü kosinüs ve sinüs terimleri anında okunur.',
    'Completing the square in the denominator produces damped cosine and sine terms directly.'
  ),
  step(
    '4. Gecikmeli ZSR rasyonel kesrini basit kesirlere aç',
    '4. Expand delayed ZSR into partial fractions',
    lines(
      f(twenty + p(two + s + plus + five), p(pow(s, two) + plus + four) + p(pow(s + plus + one, two) + plus + one)) + eq + f(fourteen + s + minus + six, pow(s, two) + plus + four) + minus + f(fourteen + p(s + plus + one) + minus + eight, pow(s + plus + one, two) + plus + one)
    ),
    'Zorlama kutupları s = ±2i ile sistem kutupları s = -1 ± i ayrıştırılarak zorlanmış mod ve geçici mod katsayıları belirlenir.',
    'Separating forcing poles s = ±2i from natural poles s = -1 ± i isolates the forced oscillations and transient components.'
  ),
  step(
    '5. İkinci kaydırma teoremi ile basamaklı çözümü yaz',
    '5. Apply second shifting theorem to assemble step response',
    lines(
      xZSR + eq + p(fourteen + cos2 + minus + three + sin2 + plus + exp(minus + p(tt + minus + pi)) + p(fourteen + cost + plus + eight + sint)) + fn('H', tt + minus + pi)
    ),
    'Tüm ZSR yanıtı t < π için özdeşçe sıfırdır; t = π anında Heaviside basamağı ile sürekli olarak devreye girer.',
    'The entire ZSR remains identically zero for t < π and activates smoothly at t = π governed by the Heaviside step.'
  )
];

export const laplaceSystemsStudy = {
  paths: [
    {
      id: 'laplace-cramer-path',
      title: T('Yol 1: s-uzayında matris formülasyonu ve Cramer kuralı', 'Path 1: s-domain matrix formulation and Cramer’s rule'),
      steps: pathLaplaceCramer
    },
    {
      id: 'laplace-partial-delay-path',
      title: T('Yol 2: Basit kesirler, 2. kaydırma teoremi ve gecikmeli zorlama', 'Path 2: Partial fractions, second shifting theorem, and delayed forcing'),
      steps: pathPartialFractionsDelay
    }
  ],
  predictions: [
    {
      id: 'pred-initial-conditions',
      title: T('Başlangıç koşullarının soğurulması: Operatör yöntemi mi, Laplace yöntemi mi?', 'Incorporation of initial conditions: Operator method vs. Laplace transform'),
      scenario: T(
        '2 bilinmeyenli 1. mertebe bir diferansiyel sistem çözerken başlangıç koşullarını uygulama sürecinde iki yöntem nasıl farklılaşır?',
        'When solving a 2-variable 1st-order differential system, how do the two methods differ in applying initial conditions?'
      ),
      question: T(
        'Laplace dönüşümü yöntemi neden operatör yöntemindeki "sabit eleme" (elimination) adımına ihtiyaç duymaz?',
        'Why does the Laplace transform method eliminate the need for the "constant elimination" step used in the operator method?'
      ),
      options: [
        T(
          'L{ẋ} = sX(s) - x(0) kuralı başlangıç değerlerini en baştan cebirsel sağ tarafa gömer; Cramer kuralı doğrudan tekil çözümü üretir.',
          'The rule L{ẋ} = sX(s) - x(0) embeds initial values directly into the algebraic RHS from step 1; Cramer’s rule yields the unique solution immediately.'
        ),
        T(
          'Laplace dönüşümü yalnızca homojen sistemlerde çalışır, zorlama fonksiyonu varsa sabitler elenemez.',
          'The Laplace transform only works for homogeneous systems; constants cannot be eliminated when forcing is present.'
        ),
        T(
          'Operatör yöntemi başlangıç koşullarını kullanamaz, yalnızca sınır değer problemlerini çözebilir.',
          'The operator method cannot use initial conditions; it can only solve boundary value problems.'
        )
      ],
      answer: 0,
      explanation: T(
        'Operatör yönteminde skaler denklemler ayrı ayrı çözülürken toplam 2N keyfi sabit doğar; fazlalık N sabit ancak çözümler orijinal sisteme konularak elenir. Laplace dönüşümünde ise x(0) ve y(0) türev kuralıyla ilk adımda cebirsel sisteme gömülür ve fazladan hiçbir keyfi sabit üretilmez.',
        'In the operator method, solving separate scalar ODEs introduces 2N arbitrary constants, requiring N to be eliminated by substituting into the system. The Laplace transform embeds x(0) and y(0) into the algebraic equations at the outset, generating zero excess constants.'
      )
    },
    {
      id: 'pred-delay-activation',
      title: T('Heaviside 2. kaydırma teoremi ve gecikmeli aktivasyon', 'Heaviside 2nd shifting theorem and delayed activation'),
      scenario: T(
        '10 sin(2t) H(t - π) zorlaması altındaki bir sistemde t < π zaman aralığındaki Sıfır Durum Yanıtı (ZSR) nedir?',
        'In a system driven by 10 sin(2t) H(t - π), what is the Zero-State Response (ZSR) for time t < π?'
      ),
      question: T(
        'Zorlama terimi t = π anına kadar sıfır kaldığında, sistemin t < π için yanıtı nasıl davranır?',
        'When the forcing term remains zero until t = π, how does the system response behave for t < π?'
      ),
      options: [
        T(
          'ZSR özdeşçe sıfırdır; t < π süresince sistem yalnızca başlangıç koşullarının ürettiği ZIR ile hareket eder.',
          'The ZSR is identically zero; for t < π the system evolves purely under the ZIR produced by initial conditions.'
        ),
        T(
          'Zorlama terimi t = 0 anından itibaren etkisini ters işaretle hissettirmeye başlar.',
          'The forcing term exerts an inverted influence beginning immediately at t = 0.'
        ),
        T(
          'Sistem gecikmeli zorlama karşısında kararsızlaşır ve t < π anında sonsuza ıraksar.',
          'The system becomes unstable under delayed forcing and diverges to infinity before t < π.'
        )
      ],
      answer: 0,
      explanation: T(
        'Heaviside basamağı H(t - π), t < π için 0 olduğundan zorlama bu aralıkta sisteme sıfır enerji aktarır. Dolayısıyla ZSR = 0 kalır ve toplam yanıt tamamen ZIR’den ibarettir. t = π anında ise ZSR sürekli biçimde salınım ve sönümlü modlarıyla uyanır.',
        'Because H(t - π) = 0 for t < π, zero forcing energy enters the system before t = π. Hence ZSR = 0 and the response is entirely ZIR. At t = π, the forced oscillations and transient modes activate continuously.'
      )
    }
  ]
};

export const laplaceSystemsClinic = {
  examClinic: [
    {
      id: 'clinic-case-1',
      badge: T('6 PUAN / VİZE SORUSU', '6 POINTS / MIDTERM PROBLEM'),
      statement: T(
        'Örnek 7.11 sistemini çöz: ẋ − 3x − 6y = 0,  3x + ẏ + 3y = 18t e⁻³ᵗ, başlangıç koşulları x(0) = 1, y(0) = 0. Laplace yöntemi ile X(s) ve Y(s) çözümlerini kur, ZIR ve ZSR bileşenlerini ayrıştır.',
        'Solve the Example 7.11 system: ẋ − 3x − 6y = 0,  3x + ẏ + 3y = 18t e⁻³ᵗ with x(0) = 1, y(0) = 0. Set up X(s) and Y(s) via the Laplace method and isolate ZIR and ZSR components.'
      ),
      trap: T(
        'Tuzak: 18t e⁻³ᵗ teriminin Laplace dönüşümünü 18/(s+3) sanmak; t çarpanından ötürü türev kuralı ile 18/(s+3)² olduğunu atlamak.',
        'Trap: Misidentifying L{18t e⁻³ᵗ} as 18/(s+3) instead of 18/(s+3)² produced by multiplication by t.'
      ),
      steps: [
        step(
          '1. Denklem sistemini s-uzayına aktar',
          '1. Transform system into the s-domain',
          lines(
            p(s + minus + three) + Xs + minus + six + Ys + eq + one,
            three + Xs + plus + p(s + plus + three) + Ys + eq + f(eighteen, pow(s + plus + three, two))
          ),
          'x(0) = 1 birinci denklemin sağ tarafına geçer; y(0) = 0 olduğundan ikinci denklemde sadece zorlama terimi kalır.',
          'x(0) = 1 passes to the RHS of equation 1; y(0) = 0 leaves only the forcing transform in equation 2.'
        ),
        step(
          '2. Karakteristik determinantı ve Cramer formüllerini yaz',
          '2. Form characteristic determinant and Cramer expressions',
          lines(
            del + p(s) + eq + pow(s, two) + plus + nine,
            delX + eq + p(s + plus + three) + plus + f(n(108), pow(s + plus + three, two)),
            delY + eq + minus + three + plus + f(eighteen + p(s + minus + three), pow(s + plus + three, two))
          ),
          'Karakteristik polinom s² + 9 olup kutuplar s = ±3i saf sanal frekanslardır.',
          'The characteristic polynomial s² + 9 establishes pure imaginary poles at s = ±3i.'
        ),
        step(
          '3. ZIR bileşenini ters dönüştür',
          '3. Invert the Zero-Input Response (ZIR)',
          lines(
            XZIR + eq + f(s + plus + three, pow(s, two) + plus + nine) + imp + xZIR + eq + cos3 + plus + sin3,
            YZIR + eq + minus + f(three, pow(s, two) + plus + nine) + imp + yZIR + eq + minus + sin3
          ),
          'ZIR bileşenleri başlangıç koşullarından doğan serbest harmonik salınımları verir.',
          'ZIR components describe undamped harmonic free vibration excited by initial data.'
        ),
        step(
          '4. ZSR bileşenini basit kesirlere ayır',
          '4. Expand Zero-State Response (ZSR) in partial fractions',
          lines(
            XZSR + eq + f(n(108), p(pow(s, two) + plus + nine) + pow(s + plus + three, two)) + eq + minus + f(two + s, pow(s, two) + plus + nine) + plus + f(two, s + plus + three) + plus + f(six, pow(s + plus + three, two)),
            xZSR + eq + minus + two + cos3 + plus + two + p(one + plus + three + tt) + expNeg3T
          ),
          'Tekrarlı kutup (s + 3)² sönümlü polinom terimi (1 + 3t)e^(-3t) üretir.',
          'The repeated pole (s + 3)² contributes the polynomial-damped term (1 + 3t)e^(-3t).'
        ),
        step(
          '5. Toplam çözümleri topla ve kalıntı kontrolü yap',
          '5. Combine responses and verify ODE residuals',
          lines(
            x + p(tt) + eq + minus + cos3 + plus + sin3 + plus + two + p(one + plus + three + tt) + expNeg3T,
            y + p(tt) + eq + cos3 + minus + p(one + plus + six + tt) + expNeg3T
          ),
          'x(0) = -1 + 0 + 2 = 1 ve y(0) = 1 - 1 = 0 başlangıç koşullarını tam sağlar; diferansiyel denklem kalıntıları özdeşçe sıfırdır.',
          'Matches initial conditions x(0)=1, y(0)=0 exactly, and evaluates to machine-zero residual in the original ODEs.'
        )
      ]
    },
    {
      id: 'clinic-case-2',
      badge: T('5 PUAN / VİZE SORUSU', '5 POINTS / MIDTERM PROBLEM'),
      statement: T(
        'Örnek 7.12 bağlı türev sistemini çöz: ẋ + 2x + 2ẏ + 5y = 0,  ẋ + 3ẏ + y = 10 sin(2t) H(t − π), x(0) = 2, y(0) = 1. Gecikmeli zorlamanın Laplace dönüşümünü ve 2. kaydırma teoremini uygula.',
        'Solve Example 7.12 coupled system: ẋ + 2x + 2ẏ + 5y = 0,  ẋ + 3ẏ + y = 10 sin(2t) H(t − π), x(0) = 2, y(0) = 1. Formulate the delayed transform and apply the second shifting theorem.'
      ),
      trap: T(
        'Tuzak: Bağlı türevlerde L{2ẏ} alırken başlangıç koşulunu 2[sY - y(0)] = 2sY - 2 olarak sağ tarafa eklemeyi unutmak.',
        'Trap: Overlooking the initial condition multiplier in coupled derivatives: L{2ẏ} = 2sY - 2y(0).'
      ),
      steps: [
        step(
          '1. Bağlı türevleri dönüştür ve başlangıç değerlerini sağ tarafa topla',
          '1. Transform coupled derivatives and collect initial terms on RHS',
          lines(
            p(s + plus + two) + Xs + plus + p(two + s + plus + five) + Ys + eq + x0 + plus + two + y0 + eq + four,
            s + Xs + plus + p(three + s + plus + one) + Ys + eq + x0 + plus + three + y0 + plus + f(twenty + expNegPiS, pow(s, two) + plus + four) + eq + five + plus + f(twenty + expNegPiS, pow(s, two) + plus + four)
          ),
          'x(0) + 2y(0) = 2 + 2(1) = 4 ve x(0) + 3y(0) = 2 + 3(1) = 5 terimleri sağ tarafı oluşturur.',
          'Initial constants collect to 4 and 5 on the right-hand side.'
        ),
        step(
          '2. Karakteristik determinantı çöz',
          '2. Evaluate the characteristic determinant',
          lines(
            del + p(s) + eq + p(s + plus + two) + p(three + s + plus + one) + minus + s + p(two + s + plus + five) + eq + pow(s, two) + plus + two + s + plus + two,
            del + p(s) + eq + pow(s + plus + one, two) + plus + one
          ),
          'Karakteristik kökler s = -1 ± i olup e^(-t)(cos t, sin t) sönümlü modlarını belirler.',
          'Poles s = -1 ± i establish exponentially damped harmonic modes e^(-t)(cos t, sin t).'
        ),
        step(
          '3. ZIR çözümlerini ters dönüştür',
          '3. Invert the Zero-Input Response',
          lines(
            XZIR + eq + f(two + s + minus + twentyThree, pow(s + plus + one, two) + plus + one) + imp + xZIR + eq + expNegT + p(two + cost + minus + twentyThree + sint),
            YZIR + eq + f(s + plus + ten, pow(s + plus + one, two) + plus + one) + imp + yZIR + eq + expNegT + p(cost + plus + nine + sint)
          ),
          't = 0 için x(0) = 2 ve y(0) = 1 başlangıç değerleri doğrulanır.',
          'At t = 0, initial conditions x(0)=2 and y(0)=1 are recovered exactly.'
        ),
        step(
          '4. Gecikmeli ZSR basit kesirlerini aç',
          '4. Partial fraction expansion for delayed ZSR',
          lines(
            xZSR + eq + p(fourteen + cos2 + minus + three + sin2 + plus + exp(minus + p(tt + minus + pi)) + p(fourteen + cost + plus + eight + sint)) + fn('H', tt + minus + pi)
          ),
          'Kutup s = -1 ± i sönümlü geçici modu, s = ±2i ise zorlanmış sinüzoidal modu verir.',
          'Poles s = -1 ± i supply transient decay, while s = ±2i dictate steady-state oscillations.'
        ),
        step(
          '5. y_ZSR bileşenini yaz ve sürekliliği incele',
          '5. State y_ZSR component and examine continuity',
          lines(
            yZSR + eq + p(minus + six + cos2 + plus + two + sin2 + minus + exp(minus + p(tt + minus + pi)) + p(six + cost + plus + two + sint)) + fn('H', tt + minus + pi)
          ),
          't = π anında parantez içi 14(-1) - 0 + 1(14(-1) + 0) = 0 ve -6(-1) + 0 - 1(6(-1) + 0) = 0 verdiğinden yanıt sıçramasız ve süreklidir!',
          'At t = π, the bracketed terms evaluate to zero, ensuring response continuity across the step transition.'
        )
      ]
    },
    {
      id: 'clinic-case-3',
      badge: T('5 PUAN / FİNAL SORUSU', '5 POINTS / FINAL PROBLEM'),
      statement: T(
        'Örnek 7.13 yüksek mertebeli sistemi çöz: ẍ − 3ẋ − ẏ + 2y = 60t H(t − 1),  ẋ − 3x + ẏ = 0, başlangıç koşulları x(0) = 5, ẋ(0) = 15, y(0) = 0. Ramp zorlamasının gecikmeli dönüşümünü ve kutup sadeleşmesini göster.',
        'Solve Example 7.13 higher-order system: ẍ − 3ẋ − ẏ + 2y = 60t H(t − 1),  ẋ − 3x + ẏ = 0 with x(0) = 5, ẋ(0) = 15, y(0) = 0. Show delayed ramp transform and pole cancellation.'
      ),
      trap: T(
        'Tuzak: 60t H(t - 1) ifadesini doğrudan 60e^(-s)/s² olarak dönüştürmek; t fonksiyonunu t - 1 + 1 olarak açıp 60e^(-s)(s + 1)/s² türetmeyi unutmak.',
        'Trap: Transforming 60t H(t - 1) incorrectly as 60e^(-s)/s² instead of shifting t = (t - 1) + 1 to obtain 60e^(-s)(s + 1)/s².'
      ),
      steps: [
        step(
          '1. İkinci türevli sistemi s-uzayına aktar',
          '1. Transform higher-order system into the s-domain',
          lines(
            p(pow(s, two) + minus + three + s) + Xs + minus + p(s + minus + two) + Ys + eq + five + s,
            p(s + minus + three) + Xs + plus + s + Ys + eq + five
          ),
          'L{ẍ} = s²X - 5s - 15 ve L{ẋ} = sX - 5 terimleri birleşerek sağ tarafta 5s ve 5 bırakır.',
          'L{ẍ} = s²X - 5s - 15 and L{ẋ} = sX - 5 combine, leaving 5s and 5 on the right-hand side.'
        ),
        step(
          '2. 3. mertebe karakteristik polinomu çarpanlarına ayır',
          '2. Factor the 3rd-degree characteristic polynomial',
          lines(
            del + p(s) + eq + s + p(pow(s, two) + minus + three + s) + plus + p(s + minus + three) + p(s + minus + two),
            del + p(s) + eq + p(s + minus + three) + p(pow(s, two) + plus + s + minus + two) + eq + p(s + minus + three) + p(s + minus + one) + p(s + plus + two)
          ),
          'Karakteristik kökler s = 3, 1, -2 olup sistem derecesi N = 3’tür.',
          'Poles at s = 3, 1, -2 establish a system degree of N = 3.'
        ),
        step(
          '3. ZIR Cramer determinantında kutup sadeleşmesini keşfet',
          '3. Discover pole cancellation in ZIR Cramer determinant',
          lines(
            delX + p(s) + eq + five + p(pow(s, two) + plus + s + minus + two) + eq + five + p(s + minus + one) + p(s + plus + two),
            XZIR + eq + f(five + p(s + minus + one) + p(s + plus + two), p(s + minus + three) + p(s + minus + one) + p(s + plus + two)) + eq + f(five, s + minus + three) + imp + xZIR + eq + five + exp3T
          ),
          '(s - 1)(s + 2) çarpanı hem payda hem paydada sadeleşir! ZIR’de s = 1 ve s = -2 modları tamamen uyarılmamış kalır.',
          'The factor (s - 1)(s + 2) cancels out completely! Modes s = 1 and s = -2 remain unexcited in the ZIR.'
        ),
        step(
          '4. Gecikmeli ramp zorlamasını s-uzayına dönüştür',
          '4. Transform delayed ramp forcing to s-domain',
          lines(
            fn('L', sixty + tt + fn('H', tt + minus + one)) + eq + sixty + expNegS + fn('L', tt + plus + one) + eq + f(sixty + p(s + plus + one) + expNegS, pow(s, two))
          ),
          't = (t - 1) + 1 ayrışımı ile 1/s² + 1/s = (s + 1)/s² terimi ve e^(-s) gecikme çarpanı elde edilir.',
          'Splitting t = (t - 1) + 1 yields 1/s² + 1/s = (s + 1)/s² paired with the delay factor e^(-s).'
        ),
        step(
          '5. ZSR çözümünü basit kesirlerle türet',
          '5. Derive ZSR via partial fraction expansion',
          lines(
            xZSR + eq + p(ten + plus + eight + exp(three + p(tt + minus + one)) + minus + twenty + exp(tt + minus + one) + plus + two + exp(minus + two + p(tt + minus + one))) + fn('H', tt + minus + one),
            yZSR + eq + p(fifteen + plus + thirty + tt + minus + forty + exp(tt + minus + one) + minus + five + exp(minus + two + p(tt + minus + one))) + fn('H', tt + minus + one)
          ),
          'ẋ - 3x + ẏ = 0 ilişkisi tüm t için özdeşçe sağlanır.',
          'The differential relation ẋ - 3x + ẏ = 0 holds identically for all t.'
        )
      ]
    },
    {
      id: 'clinic-case-4',
      badge: T('6 PUAN / FİNAL SORUSU', '6 POINTS / FINAL PROBLEM'),
      statement: T(
        'Genel durum-uzayı sistemini matris Laplace ile analiz et: ẋ = A x + B f(t), x(0) = x₀. Rezolvent matrisi Φ(s) = (sI − A)⁻¹, ZIR ve ZSR transfer fonksiyonlarını türet ve sistem kararlılığını kutuplarla ilişkilendir.',
        'Analyze the general state-space system via matrix Laplace: ẋ = A x + B f(t), x(0) = x₀. Derive resolvent Φ(s) = (sI − A)⁻¹, ZIR/ZSR transfer functions, and link stability to poles.'
      ),
      trap: T(
        'Tuzak: Matris çarpımında (sI - A)⁻¹ terimini sağdan ve soldan çarpmayı karıştırmak; X(s) = (sI - A)⁻¹ [x₀ + B F(s)] sırasında yazım sırasına dikkat etmemek.',
        'Trap: Matrix non-commutativity: placing (sI - A)⁻¹ on the incorrect side of the initial vector and input transform.'
      ),
      steps: [
        step(
          '1. Durum-uzayı denkleminin matris Laplace dönüşümünü al',
          '1. Take matrix Laplace transform of state-space system',
          lines(
            s + Xs + minus + x0 + eq + v('A') + Xs + plus + v('B') + fn('F', s),
            p(s + v('I') + minus + v('A')) + Xs + eq + x0 + plus + v('B') + fn('F', s)
          ),
          'Türev kuralı çok boyutlu vektör sistemine genellenir: L{ẋ} = sX(s) - x₀.',
          'The derivative property extends directly to vectors: L{ẋ} = sX(s) - x₀.'
        ),
        step(
          '2. Rezolvent (geçiş) matrisini tanımla ve tersini al',
          '2. Invert characteristic matrix to find resolvent matrix',
          lines(
            fn('Φ', s) + eq + pow(s + v('I') + minus + v('A'), minus + one) + eq + f(fn('adj', s + v('I') + minus + v('A')), fn('det', s + v('I') + minus + v('A'))),
            Xs + eq + fn('Φ', s) + x0 + plus + fn('Φ', s) + v('B') + fn('F', s)
          ),
          'Φ(s) matrisinin paydası det(sI - A) = 0 karakteristik polinomudur; kökleri A matrisinin özdeğerleridir.',
          'The scalar denominator of Φ(s) is det(sI - A) = 0, whose roots are the eigenvalues of matrix A.'
        ),
        step(
          '3. ZIR durum geçiş matrisini ters Laplace ile üret',
          '3. State transition matrix from inverse Laplace of resolvent',
          lines(
            fn('e', v('A') + tt) + eq + pow(L, minus + one) + p(fn('Φ', s)) + eq + pow(L, minus + one) + p(pow(s + v('I') + minus + v('A'), minus + one)),
            xZIR + p(tt) + eq + fn('e', v('A') + tt) + x0
          ),
          'Rezolventin ters Laplace dönüşümü, zaman uzayında durum geçiş matrisi e^(At) üstel matrisine eşittir.',
          'The inverse Laplace transform of the resolvent Φ(s) equals the matrix exponential e^(At).'
        ),
        step(
          '4. ZSR konvolüsyon integrali ile giriş yanıtını bağla',
          '4. Relate ZSR to convolution integral and transfer matrix',
          lines(
            xZSR + p(tt) + eq + pow(L, minus + one) + p(fn('Φ', s) + v('B') + fn('F', s)) + eq + o('∫') + fn('e', v('A') + p(tt + minus + tau)) + v('B') + fn('f', tau) + v('d') + tau
          ),
          'Frekans uzayındaki matris çarpımı zaman uzayında matrisel Duhamel konvolüsyonuna dönüşür.',
          'Matrix multiplication in s-space maps directly to Duhamel matrix convolution in time.'
        ),
        step(
          '5. Kutupların gerçel kısmı ile asimptotik kararlılığı bağla',
          '5. Link real parts of poles to asymptotic stability',
          lines(
            fn('Re', sub(v('s'), v('i'))) + o('<') + zero + imp + fn('lim', tt + o('→') + o('∞')) + xZIR + p(tt) + eq + zero,
            fn('det', s + v('I') + minus + v('A')) + eq + zero + imp + v('Sistem kutupları (özdeğerler)')
          ),
          'Tüm kutupların gerçel kısmı negatifse sistem asimptotik kararlıdır; serbest yanıt ZIR zamanla sıfıra söner.',
          'If all poles have negative real parts, the system is asymptotically stable and ZIR decays to zero.'
        )
      ]
    }
  ]
};
