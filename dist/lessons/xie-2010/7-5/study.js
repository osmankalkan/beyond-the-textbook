import {T, step, v, n, o, r, p, f, pow, sub, eq, plus, minus, x, y, t, fn, exp, abs, lines, dot} from '../../../study/math.js';

const zero = n(0), one = n(1), two = n(2), three = n(3), four = n(4), five = n(5), six = n(6), seven = n(7), eight = n(8), nine = n(9), ten = n(10), twelve = n(12), forty = n(40);
const s = v('s'), D = v('D'), lam = v('λ'), tt = v('t'), I = v('I'), A = v('A'), C = v('C'), X = v('X'), Y = v('Y'), H = v('H');
const C1 = sub(C, one), C2 = sub(C, two), K1 = sub(v('K'), one), K2 = sub(v('K'), two);
const lam1 = sub(lam, one), lam2 = sub(lam, two);
const v1 = sub(v('v'), one), v2 = sub(v('v'), two);
const x1 = sub(x, one), x2 = sub(x, two);
const vecX = v('x'), vecF = v('f'), vecV = v('v'), vecC = v('c');
const imp = o('⇒'), cdot = o('·'), to = o('→'), pm = o('±');
const par = arg => p(arg);
const cost = fn('cos', tt), sint = fn('sin', tt), cos3t = fn('cos', three + tt), sin3t = fn('sin', three + tt);
const expNegT = exp(minus + tt), exp3t = exp(three + tt);

const matrix = rows => o('[') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '</mtable>' + o(']');
const det = rows => o('|') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '|';
const vector = items => matrix(items.map(item => [item]));

const pathDecisionTriage = [
  step(
    '1. Mertebe, sistem boyutu ve denklem yapısını tara',
    '1. Triage order, system dimension, and formulation structure',
    lines(
      fn('dim', vecX) + eq + v('n') + o(' , ') + D + eq + f(v('d'), v('dt')) + imp + fn('det', sub(fn('φ', D), v('ij'))) + eq + fn('φ', D)
    ),
    '2x2 sistemlerde operatör determinantı ve Laplace çok hızlıyken, n ≥ 3 durum uzayı için matris yöntemi vazgeçilmezdir.',
    'For 2x2 systems, operator and Laplace methods are swift; for n ≥ 3, state-space matrix methods are indispensable.'
  ),
  step(
    '2. Başlangıç koşullarının doğasını ve konumunu belirle',
    '2. Determine nature and placement of initial conditions',
    lines(
      vecX + p(zero) + eq + sub(vecX, zero) + imp + s + X + p(s) + minus + vecX + p(zero) + eq + A + X + p(s) + plus + fn('F', s)
    ),
    't = 0 anında başlangıç değerleri varsa Laplace yöntemi ek sabit eleme adımı gerektirmeden doğrudan sonuca götürür.',
    'When IVP data at t = 0 is provided, Laplace incorporates conditions directly, bypassing post-solution constant elimination.'
  ),
  step(
    '3. Zorlama fonksiyonunun sürekliliğini veya süreksizliğini teşhis et',
    '3. Diagnose continuity or piecewise/shock forcing nature',
    lines(
      fn('f', tt) + eq + H + p(tt + minus + v('a')) + o('  veya  ') + fn('f', tt) + eq + v('δ') + p(tt + minus + v('a'))
    ),
    'Heaviside basamakları ve Dirac delta darbeleri içeren sistemlerde Laplace dönüşümü aralık dikişlerini tamamen ortadan kaldırır.',
    'For Heaviside pulses and Dirac impulses, Laplace eliminates manual piecewise boundary value matching.'
  ),
  step(
    '4. Matris yönteminde özdeğer spektrumunu sınıflandır',
    '4. Classify eigenvalue spectrum in the matrix method',
    lines(
      fn('det', A + minus + lam + I) + eq + zero + imp + lam + eq + v('α') + pm + v('iβ') + o('  veya  ') + pow(par(lam + minus + sub(lam, zero)), v('m')) + eq + zero
    ),
    'Ayrık gerçel kökler eyer veya düğüm, karmaşık kökler dönel sarmal odak, katlı kökler ise genelleştirilmiş Jordan zinciri üretir.',
    'Distinct real roots yield saddles or nodes, complex roots create spiral vortices, and repeated roots generate Jordan chains.'
  ),
  step(
    '5. Bağımsız keyfi sabit sayısını doğrula ve çözümü mühürle',
    '5. Verify independent arbitrary constant count and seal solution',
    lines(
      v('N') + eq + fn('deg', fn('φ', D)) + eq + fn('rank', matrix([[v1, v2]])) + imp + vecX + p(tt) + eq + matrix([[X]]) + vecC
    ),
    'Genel çözümdeki bağımsız keyfi sabit sayısı daima karakteristik determinant derecesine (N) eşit olmalıdır.',
    'The number of independent arbitrary constants must strictly match the characteristic determinant degree (N).'
  )
];

const pathPitfallProtocol = [
  step(
    '1. Operatör yönteminde 2N sabit hatasından kaçın',
    '1. Avoid 2N arbitrary constants trap in operator method',
    lines(
      x + eq + C1 + cost + plus + C2 + sint + o(' , ') + y + eq + K1 + cost + plus + K2 + sint + imp + fn('Ele', K1 + o(',') + K2)
    ),
    'x(t) ve y(t) için ayrı ayrı yazılan sabitler bağımsız değildir; orijinal denkleme konularak K sabitleri C cinsinden elenmelidir.',
    'Constants for x(t) and y(t) are not independent; they must be coupled by substituting into an original equation.'
  ),
  step(
    '2. Laplace dönüşümünde başlangıç değeri eksi işaretlerini koru',
    '2. Preserve negative signs for initial conditions in Laplace',
    lines(
      fn('ℒ', dot(x)) + eq + s + X + p(s) + minus + x + p(zero) + o(' , ') + fn('ℒ', pow(x, o("''"))) + eq + pow(s, two) + X + minus + s + x + p(zero) + minus + dot(x) + p(zero)
    ),
    'sX(s) − x(0) teriminde x(0) eksi işaretlidir; negatif bir başlangıç değeri girildiğinde işaret artıya döner.',
    'The term x(0) carries a minus sign; a negative initial datum flips it to a positive contribution.'
  ),
  step(
    '3. Katlı köklerde eksik özvektör yanılgısına düşme',
    '3. Beware of defective eigenspace in repeated eigenvalues',
    lines(
      par(A + minus + lam + I) + v2 + eq + v1 + imp + sub(vecX, two) + p(tt) + eq + exp(lam + tt) + p(tt + v1 + plus + v2)
    ),
    'Cebrail katlılığı m olan bir kök için geometrik katlılık k < m ise eksik modlar genelleştirilmiş zincirle tamamlanır.',
    'When geometric multiplicity k < m, missing modes must be generated via the generalized chain (A − λI)v₂ = v₁.'
  ),
  step(
    '4. Temel matris tersinde determinant işaretini kontrol et',
    '4. Check determinant sign in fundamental matrix inversion',
    lines(
      pow(matrix([[X]]), minus + one) + eq + f(one, fn('det', matrix([[X]]))) + fn('adj', matrix([[X]]))
    ),
    '2x2 temel matrisin tersini alırken det X(t) negatif olabilir; eksi işaretini unutmak tüm özel integralleri bozar.',
    'The determinant det X(t) can be negative; omitting the sign corrupts all particular integral terms.'
  ),
  step(
    '5. Analitik çözümü kalıntı vektörü E(t) ile çapraz sına',
    '5. Cross-validate analytical solutions with residual vector E(t)',
    lines(
      fn('E', tt) + eq + dot(vecX) + minus + A + vecX + minus + vecF + eq + vector([zero, zero]) + o(' , ') + p(abs(fn('E', tt))) + o('<') + pow(ten, minus + twelve)
    ),
    'Doğru bulunan analitik çözüm matris denklemine geri yazıldığında kalıntı vektörü makine sıfırı vermelidir.',
    'Substituting the analytic solution back into the state equation must yield a residual at machine zero.'
  )
];

const clinicProblem1 = [
  step(
    '1. Operatör sistemi determinantını hesapla (1 puan)',
    '1. Evaluate operator system determinant (1 point)',
    lines(
      fn('φ', D) + eq + det([[D + plus + two, D + plus + one], [five, D + plus + three]]) + eq + p(D + plus + two) + p(D + plus + three) + minus + five + p(D + plus + one),
      fn('φ', D) + eq + pow(D, two) + plus + five + D + plus + six + minus + five + D + minus + five + eq + pow(D, two) + plus + one
    ),
    'Operatör determinantı φ(D) = D² + 1 olarak sadeleşir; sistemin mertebesi N = 2\'dir.',
    'The operator determinant simplifies to φ(D) = D² + 1; the characteristic order is N = 2.'
  ),
  step(
    '2. Karakteristik kökleri ve bağımsız sabit sayısını bul (1 puan)',
    '2. Find characteristic roots and independent constant count (1 point)',
    lines(
      pow(lam, two) + plus + one + eq + zero + imp + lam + eq + pm + v('i') + o(' , ') + v('N') + eq + two
    ),
    'Karakteristik kökler saf sanal λ = ±i çıkar; sistem salınımlıdır ve genel çözümde tam 2 bağımsız keyfi sabit olmalıdır.',
    'The roots are purely imaginary λ = ±i; the system oscillates and must contain exactly 2 independent arbitrary constants.'
  ),
  step(
    '3. x(t) ve y(t) için genel biçimleri yaz (1 puan)',
    '3. Formulate general modal shapes for x(t) and y(t) (1 point)',
    lines(
      x + p(tt) + eq + C1 + cost + plus + C2 + sint + o(' , ') + y + p(tt) + eq + K1 + cost + plus + K2 + sint
    ),
    'Her iki bağımlı değişken de aynı frekansta (ω = 1) harmonik hareket yapar, ancak katsayılar henüz bağımsız değildir.',
    'Both state variables oscillate at frequency ω = 1, but their coefficients are currently coupled.'
  ),
  step(
    '4. İkinci diferansiyel denklemi kullanarak K sabitlerini ele (1 puan)',
    '4. Eliminate dependent constants K via the second ODE (1 point)',
    lines(
      five + x + plus + dot(y) + plus + three + y + eq + zero,
      five + p(C1 + cost + plus + C2 + sint) + plus + p(minus + K1 + sint + plus + K2 + cost) + plus + three + p(K1 + cost + plus + K2 + sint) + eq + zero,
      p(five + C1 + plus + three + K1 + plus + K2) + cost + plus + p(five + C2 + minus + K1 + plus + three + K2) + sint + eq + zero
    ),
    'Kosinüs ve sinüs katsayıları ayrı ayrı sıfıra eşitlenerek K₁ ve K₂ katsayıları C₁ ve C₂ cinsinden çözülür.',
    'Equating coefficients of cosine and sine to zero yields K₁ and K₂ explicitly in terms of C₁ and C₂.'
  ),
  step(
    '5. K₁ = −(3/2)C₁ + (1/2)C₂ ve K₂ = −(1/2)C₁ − (3/2)C₂ bağıntısını kurarak çözümü tamamla (1 puan)',
    '5. Solve linear algebraic relations and seal final 2-constant general solution (1 point)',
    lines(
      K1 + eq + minus + f(three, two) + C1 + plus + f(one, two) + C2 + o(' , ') + K2 + eq + minus + f(one, two) + C1 + minus + f(three, two) + C2
    ),
    'Böylece genel çözüm yalnızca 2 keyfi sabite (C₁, C₂) indirgenerek tam matematiksel kesinliğe ulaşır.',
    'The general solution is now rigorously expressed with exactly 2 free constants (C₁, C₂).'
  )
];

const clinicProblem2 = [
  step(
    '1. IVP sisteminin Laplace dönüşümünü kur (1 puan)',
    '1. Transform the IVP system into the s-domain (1 point)',
    lines(
      s + X + minus + Y + eq + f(exp(minus + s), s) + o(' , ') + X + plus + s + Y + eq + zero
    ),
    'Sıfır başlangıç koşulları x(0)=0, y(0)=0 doğrudan uygulanır; H(t - 1) basamağı e^{-s}/s terimine dönüşür.',
    'Zero initial data x(0)=0, y(0)=0 are set directly; the step H(t - 1) transforms to e^{-s}/s.'
  ),
  step(
    '2. Katsayılar determinantını değerlendir (1 puan)',
    '2. Evaluate the coefficient determinant (1 point)',
    lines(
      fn('Δ', s) + eq + det([[s, minus + one], [one, s]]) + eq + pow(s, two) + plus + one
    ),
    'Determinant Δ(s) = s² + 1 hiçbir sıfır kökü içermez ve kararlı harmonik salınım modunu gösterir.',
    'The characteristic determinant Δ(s) = s² + 1 indicates undamped harmonic natural oscillation.'
  ),
  step(
    '3. Cramer kuralı ile X(s) ve Y(s) ifadelerini çöz (1 puan)',
    '3. Solve for X(s) and Y(s) via Cramer rule (1 point)',
    lines(
      X + p(s) + eq + f(det([[f(exp(minus + s), s), minus + one], [zero, s]]), pow(s, two) + plus + one) + eq + f(exp(minus + s), pow(s, two) + plus + one),
      Y + p(s) + eq + f(det([[s, f(exp(minus + s), s)], [one, zero]]), pow(s, two) + plus + one) + eq + minus + f(exp(minus + s), s + p(pow(s, two) + plus + one))
    ),
    'Pay determinantları hesaplandığında X(s) = e^{-s}/(s² + 1) ve Y(s) = -e^{-s}/[s(s² + 1)] elde edilir.',
    'Evaluating numerator determinants yields X(s) = e^{-s}/(s² + 1) and Y(s) = -e^{-s}/[s(s² + 1)].'
  ),
  step(
    '4. Y(s) için kısmi kesir açılımını yap (1 puan)',
    '4. Decompose Y(s) into partial fractions (1 point)',
    lines(
      f(one, s + p(pow(s, two) + plus + one)) + eq + f(one, s) + minus + f(s, pow(s, two) + plus + one)
    ),
    'Birim basamak ve kosinüs çekirdekleri ayrışır; paydaki e^{-s} ikinci kaydırma teoremine ayrılır.',
    'Decomposing separates unit step and cosine kernels; e^{-s} is set aside for the second shift theorem.'
  ),
  step(
    '5. İkinci kaydırma teoremi ile zaman bölgesi çözümünü yaz (1 puan)',
    '5. Apply second shift theorem to obtain time response (1 point)',
    lines(
      x + p(tt) + eq + fn('sin', tt + minus + one) + H + p(tt + minus + one),
      y + p(tt) + eq + p(fn('cos', tt + minus + one) + minus + one) + H + p(tt + minus + one)
    ),
    't < 1 için sistem tamamen hareketsizdir; t ≥ 1 anından itibaren düzgün başlayan harmonik salınım üretilir.',
    'For t < 1 the system remains at rest; for t ≥ 1 it exhibits smooth causal harmonic oscillations.'
  )
];

const clinicProblem3 = [
  step(
    '1. Matris karakteristik polinomunu kur (1 puan)',
    '1. Formulate matrix characteristic polynomial (1 point)',
    lines(
      fn('det', A + minus + lam + I) + eq + det([[minus + two + minus + lam, minus + five], [two, minus + lam]]) + eq + lam + p(lam + plus + two) + plus + ten + eq + pow(lam, two) + plus + two + lam + plus + ten + eq + zero
    ),
    'Karakteristik polinom λ² + 2λ + 10 = 0 olarak belirlenir.',
    'The characteristic polynomial is established as λ² + 2λ + 10 = 0.'
  ),
  step(
    '2. Özdeğerleri ve faz portresi topolojisini belirle (1 puan)',
    '2. Determine eigenvalues and phase portrait topology (1 point)',
    lines(
      lam + eq + f(minus + two + pm + fn('sqrt', four + minus + forty), two) + eq + minus + one + pm + three + v('i')
    ),
    'Gerçel kısım Re(λ) = -1 < 0 ve sanal kısım Im(λ) = 3 olduğundan orijin kararlı sarmal odaktır (spiral sink).',
    'With Re(λ) = -1 < 0 and Im(λ) = 3, the equilibrium at the origin is a stable spiral sink.'
  ),
  step(
    '3. λ₁ = -1 + 3i için karmaşık özvektörü çöz (1 puan)',
    '3. Solve complex eigenvector for λ₁ = -1 + 3i (1 point)',
    lines(
      matrix([[minus + one + minus + three + v('i'), minus + five], [two, one + minus + three + v('i')]]) + vector([sub(v('v'), one), sub(v('v'), two)]) + eq + zero,
      two + sub(v('v'), one) + plus + p(one + minus + three + v('i')) + sub(v('v'), two) + eq + zero + imp + v1 + eq + vector([minus + one + plus + three + v('i'), two])
    ),
    'Özvektör v₁ = [-1 + 3i, 2]ᵀ = [-1, 2]ᵀ + i [3, 0]ᵀ olarak gerçel ve sanal bileşenlerine ayrılır.',
    'The eigenvector is split into real and imaginary vectors: v₁ = [-1, 2]ᵀ + i [3, 0]ᵀ.'
  ),
  step(
    '4. İki lineer bağımsız gerçel mod çözümünü oluştur (1 puan)',
    '4. Construct two linearly independent real solution modes (1 point)',
    lines(
      sub(vecX, one) + p(tt) + eq + expNegT + p(vector([minus + one, two]) + cos3t + minus + vector([three, zero]) + sin3t) + eq + expNegT + vector([minus + cos3t + minus + three + sin3t, two + cos3t]),
      sub(vecX, two) + p(tt) + eq + expNegT + p(vector([minus + one, two]) + sin3t + plus + vector([three, zero]) + cos3t) + eq + expNegT + vector([three + cos3t + minus + sin3t, two + sin3t])
    ),
    'Euler formülü e^{(-1+3i)t} açılımı ile iki bağımsız gerçel vektör çözümü elde edilir.',
    'Euler expansion of e^{(-1+3i)t} produces two linearly independent real vector trajectories.'
  ),
  step(
    '5. Başlangıç koşulunu x(0) = [1, 0]ᵀ uygulayarak katsayıları çöz (1 puan)',
    '5. Apply initial condition x(0) = [1, 0]ᵀ and solve coefficients (1 point)',
    lines(
      C1 + vector([minus + one, two]) + plus + C2 + vector([three, zero]) + eq + vector([one, zero]),
      two + C1 + eq + zero + imp + C1 + eq + zero + o(' , ') + three + C2 + eq + one + imp + C2 + eq + f(one, three)
    ),
    'Başlangıç verisi anında C₁ = 0 ve C₂ = 1/3 değerlerini verir.',
    'Initial conditions directly yield C₁ = 0 and C₂ = 1/3.'
  ),
  step(
    '6. Nihai sönümlü sarmal yörüngeyi yaz (1 puan)',
    '6. State the final damped spiral trajectory (1 point)',
    lines(
      vecX + p(tt) + eq + expNegT + vector([cos3t + minus + f(one, three) + sin3t, f(two, three) + sin3t])
    ),
    'Yörünge t → ∞ iken saat yönünde sarmallar çizerek orijine büzülür.',
    'The trajectory spirals clockwise toward the origin as t → ∞.'
  )
];

const clinicProblem4 = [
  step(
    '1. Matris karakteristik polinomunu değerlendir (1 puan)',
    '1. Formulate matrix characteristic polynomial (1 point)',
    lines(
      fn('det', A + minus + lam + I) + eq + det([[two + minus + lam, one], [minus + one, four + minus + lam]]) + eq + p(two + minus + lam) + p(four + minus + lam) + plus + one,
      fn('det', A + minus + lam + I) + eq + pow(lam, two) + minus + six + lam + plus + nine + eq + pow(par(lam + minus + three), two) + eq + zero
    ),
    'Karakteristik polinom (λ − 3)² = 0 verir; λ = 3 iki katlı (m = 2) özdeğerdir.',
    'Characteristic polynomial is (λ − 3)² = 0; λ = 3 has algebraic multiplicity m = 2.'
  ),
  step(
    '2. (A − 3I) matrisinin rankını ve özvektör eksikliğini belirle (1 puan)',
    '2. Check rank of (A − 3I) and identify defectiveness (1 point)',
    lines(
      A + minus + three + I + eq + matrix([[minus + one, one], [minus + one, one]]) + imp + fn('rank', A + minus + three + I) + eq + one
    ),
    'Geometrik katlılık k = 2 − rank(A − 3I) = 1 < 2 olduğundan matris dejeneredir (defective); tek özvektör vardır.',
    'Geometric multiplicity is k = 2 − rank = 1 < 2; the matrix is defective and lacks a second eigenvector.'
  ),
  step(
    '3. Birinci özvektör v₁\'i çöz (1 puan)',
    '3. Solve primary eigenvector v₁ (1 point)',
    lines(
      matrix([[minus + one, one], [minus + one, one]]) + vector([sub(v('v'), one), sub(v('v'), two)]) + eq + zero + imp + minus + sub(v('v'), one) + plus + sub(v('v'), two) + eq + zero + imp + v1 + eq + vector([one, one])
    ),
    'Birinci bağımsız çözüm x₁(t) = e^{3t} [1, 1]ᵀ olarak elde edilir.',
    'The first independent solution is x₁(t) = e^{3t} [1, 1]ᵀ.'
  ),
  step(
    '4. Genelleştirilmiş özvektör zincirini (A − 3I)v₂ = v₁ çöz (1 puan)',
    '4. Solve generalized chain (A − 3I)v₂ = v₁ (1 point)',
    lines(
      matrix([[minus + one, one], [minus + one, one]]) + vector([sub(v('v'), n(21)), sub(v('v'), n(22))]) + eq + vector([one, one]),
      minus + sub(v('v'), n(21)) + plus + sub(v('v'), n(22)) + eq + one + imp + v2 + eq + vector([zero, one])
    ),
    'Genelleştirilmiş özvektör v₂ = [0, 1]ᵀ olarak seçilir.',
    'The generalized eigenvector is resolved as v₂ = [0, 1]ᵀ.'
  ),
  step(
    '5. İkinci bağımsız mod x₂(t) = e^{3t}(t v₁ + v₂) formülünü kur (1 puan)',
    '5. Construct the second independent mode x₂(t) = e^{3t}(t v₁ + v₂) (1 point)',
    lines(
      sub(vecX, two) + p(tt) + eq + exp3t + p(tt + vector([one, one]) + plus + vector([zero, one])) + eq + exp3t + vector([tt, tt + plus + one])
    ),
    'Katlı kökün ikinci modu hem t hem de sabit genelleştirilmiş vektör bileşenlerini içerir.',
    'The second defective mode contains both secular growth t and generalized vector components.'
  ),
  step(
    '6. Başlangıç koşulunu x(0) = [1, 2]ᵀ sağlayarak tam çözümü mühürle (1 puan)',
    '6. Satisfy initial conditions x(0) = [1, 2]ᵀ and seal exact solution (1 point)',
    lines(
      C1 + vector([one, one]) + plus + C2 + vector([zero, one]) + eq + vector([one, two]) + imp + C1 + eq + one + o(' , ') + C2 + eq + one,
      vecX + p(tt) + eq + exp3t + p(vector([one, one]) + plus + vector([tt, tt + plus + one])) + eq + exp3t + vector([one + plus + tt, two + plus + tt])
    ),
    'Katsayılar C₁ = 1 ve C₂ = 1 olup x₁(t) = (1 + t)e^{3t} ve x₂(t) = (2 + t)e^{3t} olarak sistem çözülür.',
    'With C₁ = 1 and C₂ = 1, the trajectory is sealed as x₁(t) = (1 + t)e^{3t} and x₂(t) = (2 + t)e^{3t}.'
  )
];

export const systemsSummaryStudy = {
  paths: [
    {
      id: 'path-decision-triage',
      title: T('Yol 1: 60 Saniyede Yöntem Seçme Protokolü', 'Path 1: 60-Second Method Selection Protocol'),
      steps: pathDecisionTriage
    },
    {
      id: 'path-pitfall-protocol',
      title: T('Yol 2: Sistem Çözümlerinde Güvenlik ve Hata Protokolü', 'Path 2: Safety & Error Protocol in System Solutions'),
      steps: pathPitfallProtocol
    }
  ],
  predictions: [
    {
      id: 'pred-ivp-advantage',
      question: T(
        'Başlangıç koşulu x(0) = x₀ ve y(0) = y₀ içeren kuple bir sistemde neden Laplace dönüşümü operatör yönteminden çok daha hızlıdır?',
        'In a coupled system with initial data x(0) = x₀ and y(0) = y₀, why is the Laplace transform significantly faster than the operator method?'
      ),
      context: T(
        'Operatör yöntemi önce genel çözümü bulur, ardından bağımlı sabitleri elemek için türev alıp sisteme yerleştirmeyi gerektirir.',
        'The operator method must first obtain the general solution, then differentiate and substitute into original equations to eliminate dependent constants.'
      ),
      choices: T(
        [
          'Laplace dönüşümü başlangıç değerlerini ilk cebirsel adımda sağ tarafa gömer; türev alma ve sabit eleme külfetini tamamen ortadan kaldırır',
          'Laplace dönüşümü sistemin determinant derecesini yarıya düşürür',
          'Operatör yönteminde başlangıç değer problemi çözmek imkansızdır'
        ],
        [
          'Laplace embeds initial conditions directly into right-hand algebraic terms at step zero, bypassing derivative constant elimination',
          'Laplace halves the degree of the characteristic determinant',
          'Solving initial value problems is impossible via the operator method'
        ]
      ),
      answer: 0,
      reason: T(
        'Doğru! Laplace türev kuralı L{ẋ} = sX(s) − x(0) başlangıç koşullarını doğrudan cebirsel sisteme dahil eder; ek sabit eleme adımı gerekmez.',
        'Correct! The Laplace derivative theorem L{ẋ} = sX(s) − x(0) incorporates initial conditions directly into algebraic equations without post-elimination.'
      ),
      math: '<mi mathvariant="script">L</mi><mo>{</mo><mover accent="true"><mi>x</mi><mo>˙</mo></mover><mo>}</mo><mo>=</mo><mi>s</mi><mi>X</mi><mo stretchy="false">(</mo><mi>s</mi><mo stretchy="false">)</mo><mo>−</mo><mi>x</mi><mo stretchy="false">(</mo><mn>0</mn><mo stretchy="false">)</mo>',
      try: T('Karar matrisinde Kart 5\'i inceleyin.', 'Review Card 5 in the decision matrix.')
    },
    {
      id: 'pred-matrix-scalability',
      question: T(
        'Boyutu n ≥ 3 olan yüksek boyutlu bir sistemde neden skaler operatör determinantı yerine matris durum uzayı yöntemi tercih edilir?',
        'For high-dimensional systems of order n ≥ 3, why is the state-space matrix method preferred over scalar operator determinants?'
      ),
      context: T(
        'Büyük sistemlerde sembolik diferansiyel operatör determinantları açıldığında cebirsel karmaşıklık faktöriyel olarak büyür.',
        'Symbolic expansions of differential operator determinants grow factorially in algebraic complexity for large systems.'
      ),
      choices: T(
        [
          'Matris yöntemi standart özdeğer/özvektör algoritmaları ve modal ayrışma ile bilgisayarda boyut sınırlaması olmaksızın çözülür',
          'Matris yöntemi karakteristik denklemi tamamen yok eder',
          'n ≥ 3 sistemlerde Laplace dönüşümü hiçbir zaman çalışmaz'
        ],
        [
          'The matrix method solves systems computationally via standard eigenvalue/eigenvector routines and modal decoupling without dimensional bottleneck',
          'The matrix method eliminates the characteristic equation altogether',
          'The Laplace transform never applies to systems with n ≥ 3'
        ]
      ),
      answer: 0,
      reason: T(
        'Doğru! Durum uzayı ẋ = A x + f(t) ve modal analiz x = Φ q, n serbestlik dereceli dev sistemleri dahi bağımsız tekil osilatörlere ayrıştırır.',
        'Correct! State space ẋ = A x + f(t) and modal analysis x = Φ q decouple high-dimensional systems into independent uncoupled oscillators.'
      ),
      math: '<mstyle mathvariant="bold"><mi>x</mi></mstyle><mo stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo><mo>=</mo><mstyle mathvariant="bold"><mi>Φ</mi></mstyle><mspace width="0.1667em"/><mstyle mathvariant="bold"><mi>q</mi></mstyle><mo stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo>',
      try: T('Karar matrisinde Kart 10 ve modal ayrışmayı inceleyin.', 'Review Card 10 and modal decoupling in the decision matrix.')
    }
  ]
};

export const systemsSummaryClinic = {
  examClinic: [
    {
      id: 'clinic-case-1',
      badge: T('5 PUAN · 5 DAKİKA', '5 POINTS · 5 MINUTES'),
      statement: T(
        '(D + 2)x + (D + 1)y = 0 ve 5x + (D + 3)y = 0 sistemini operatör yöntemiyle çözün ve bağımlı sabitleri eleyin.',
        'Solve (D + 2)x + (D + 1)y = 0 and 5x + (D + 3)y = 0 using the operator method and eliminate dependent constants.'
      ),
      trap: T(
        'x ve y için ayrı ayrı dörder sabit yazıp toplam 4 sabit bırakmayın; N = deg φ(D) = 2 olduğundan tam 2 bağımsız sabit kalmalıdır.',
        'Do not retain 4 independent constants; since N = deg φ(D) = 2, exactly 2 free constants must remain.'
      ),
      steps: clinicProblem1
    },
    {
      id: 'clinic-case-2',
      badge: T('5 PUAN · 5 DAKİKA', '5 POINTS · 5 MINUTES'),
      statement: T(
        'ẋ − y = H(t − 1), x + ẏ = 0, x(0) = 0, y(0) = 0 başlangıç değer problemini Laplace dönüşümüyle çözün.',
        'Solve ẋ − y = H(t − 1), x + ẏ = 0 with x(0) = 0, y(0) = 0 via Laplace transform.'
      ),
      trap: T(
        't < 1 aralığında sistemin sıfır olduğunu unutmayın; ters dönüşümde H(t − 1) çarpanını mutlaka koruyun.',
        'Do not omit H(t − 1) in the inverse transform; the system is strictly zero for t < 1.'
      ),
      steps: clinicProblem2
    },
    {
      id: 'clinic-case-3',
      badge: T('6 PUAN · 6 DAKİKA', '6 POINTS · 6 MINUTES'),
      statement: T(
        'ẋ = [−2, −5; 2, 0] x, x(0) = [1, 0]ᵀ sistemini matris özdeğer yöntemiyle çözün ve sarmal faz portresini belirleyin.',
        'Solve ẋ = [−2, −5; 2, 0] x with x(0) = [1, 0]ᵀ using the matrix eigenvalue method and identify the spiral phase portrait.'
      ),
      trap: T(
        'Özvektör karmaşık çıktığında Euler açılımında reel ve sanal kısımların işaretlerini ters çarpmayın.',
        'Ensure proper signs when expanding the complex eigenvector mode into real and imaginary components via Euler formula.'
      ),
      steps: clinicProblem3
    },
    {
      id: 'clinic-case-4',
      badge: T('6 PUAN · 6 DAKİKA', '6 POINTS · 6 MINUTES'),
      statement: T(
        'ẋ = [2, 1; −1, 4] x, x(0) = [1, 2]ᵀ sistemini genelleştirilmiş özvektör zinciri ile çözün.',
        'Solve ẋ = [2, 1; −1, 4] x with x(0) = [1, 2]ᵀ using the generalized eigenvector chain.'
      ),
      trap: T(
        'İkinci çözüme doğrudan t e^{3t} v₁ yazıp v₂ vektörünü eklemeyi unutmayın; genel çözüm (A − 3I)v₂ = v₁ zincirini gerektirir.',
        'Do not assume x₂(t) = t e^{3t} v₁; the generalized vector v₂ satisfying (A − 3I)v₂ = v₁ is strictly necessary.'
      ),
      steps: clinicProblem4
    }
  ]
};
