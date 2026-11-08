import {T, step, v, n, o, r, p, f, pow, sub, eq, plus, minus, x, y, t, fn, exp, abs, lines, dot} from '../../../study/math.js';

const zero = n(0), one = n(1), two = n(2), three = n(3), four = n(4), five = n(5), six = n(6), seven = n(7), eight = n(8), nine = n(9), ten = n(10), twelve = n(12), fourteen = n(14), sixteen = n(16), twentyFive = n(25);
const lam = v('λ'), tt = v('t'), I = v('I'), A = v('A'), C = v('C'), X = v('X');
const v1 = sub(v('v'), one), v2 = sub(v('v'), two), v3 = sub(v('v'), three);
const x1 = sub(x, one), x2 = sub(x, two), x3 = sub(x, three);
const C1 = sub(C, one), C2 = sub(C, two), C3 = sub(C, three);
const lam1 = sub(lam, one), lam2 = sub(lam, two), lam3 = sub(lam, three);
const vecX = v('x'), vecF = v('f'), vecV = v('v'), vecC = v('c');
const del = v('Δ'), phi = fn('φ', lam);
const imp = o('⇒'), cdot = o('·'), cos4 = fn('cos', four + tt), sin4 = fn('sin', four + tt);
const cost = fn('cos', tt), sint = fn('sin', tt), sect = fn('sec', tt);
const expNeg3t = exp(minus + three + tt), exp2t = exp(two + tt), expNegT = exp(minus + tt), exp3t = exp(three + tt);

const matrix = rows => o('[') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '</mtable>' + o(']');
const det = rows => o('|') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '|';
const vector = items => matrix(items.map(item => [item]));

const pathEigenRays = [
  step(
    '1. Lineer sistemi standart matris formunda yaz',
    '1. Express the linear system in standard matrix form',
    lines(
      dot(vector([x1, x2])) + eq + matrix([[one, four], [one, minus + two]]) + vector([x1, x2])
    ),
    'Tüm sabit katsayılı birinci mertebe sistemler dx/dt = A x formunda matris-vektör çarpımına dönüştürülür.',
    'Any first-order linear system with constant coefficients is represented in the matrix-vector form dx/dt = A x.'
  ),
  step(
    '2. Karakteristik denklemi kur ve özdeğerleri bul',
    '2. Form the characteristic equation and compute eigenvalues',
    lines(
      fn('det', A + minus + lam + I) + eq + det([[one + minus + lam, four], [one, minus + two + minus + lam]]) + eq + pow(lam, two) + plus + lam + minus + six + eq + zero,
      p(lam + plus + three) + p(lam + minus + two) + eq + zero + imp + lam1 + eq + minus + three + o(',') + lam2 + eq + two
    ),
    'Determinantın sıfırlanması, trivial olmayan sıfırdan farklı çözümler için şarttır. Özdeğerler λ₁ = -3 (kararlı) ve λ₂ = 2 (kararsız) çıkar.',
    'Requiring the determinant to vanish yields non-trivial solutions. The eigenvalues are λ₁ = -3 (stable) and λ₂ = 2 (unstable).'
  ),
  step(
    '3. Her özdeğer için özvektör denklemini çöz',
    '3. Solve the eigenvector algebraic equation for each eigenvalue',
    lines(
      p(A + minus + lam1 + I) + v1 + eq + matrix([[four, four], [one, one]]) + vector([sub(v('v'), n(11)), sub(v('v'), n(21))]) + eq + zero + imp + v1 + eq + vector([one, minus + one]),
      p(A + minus + lam2 + I) + v2 + eq + matrix([[minus + one, four], [one, minus + four]]) + vector([sub(v('v'), n(12)), sub(v('v'), n(22))]) + eq + zero + imp + v2 + eq + vector([four, one])
    ),
    'Her özdeğere karşılık gelen özvektör, matrisin yalnızca skaler ölçekleme yaptığı değişmez doğrultuyu belirler.',
    'Each eigenvector defines an invariant direction along which the matrix acts purely as scalar multiplication.'
  ),
  step(
    '4. Faz uzayında düz çizgi invariant yörüngeleri yorumla',
    '4. Interpret straight-line invariant rays in the phase plane',
    lines(
      sub(vecX, one) + p(tt) + eq + expNeg3t + vector([one, minus + one]) + o(' (orijine yaklaşır)'),
      sub(vecX, two) + p(tt) + eq + exp2t + vector([four, one]) + o(' (orijinden uzaklaşır)')
    ),
    'λ₁ = -3 doğrultusu boyunca hareket eden bir parçacık rotasından hiç sapmadan orijine akar; λ₂ = 2 doğrultusundaki parçacık ise sonsuza kaçar (eyer noktası).',
    'Motion along the λ₁ = -3 ray heads straight toward the origin; along λ₂ = 2 it escapes to infinity, forming a saddle point.'
  ),
  step(
    '5. Genel çözümü özmodların süperpozisyonu olarak yaz',
    '5. State general solution as superposition of eigenmodes',
    lines(
      vecX + p(tt) + eq + C1 + expNeg3t + vector([one, minus + one]) + plus + C2 + exp2t + vector([four, one])
    ),
    'Genel çözüm, bu iki temel düz çizgi modunun doğrusal kombinasyonudur. Başlangıç koşulları C₁ ve C₂ katsayılarını anında belirler.',
    'The complete complementary solution is a linear combination of these two invariant eigen-rays, fixed by initial conditions.'
  )
];

const pathVariationOfParameters = [
  step(
    '1. Temel matrisi (fundamental matrix) sütun çözümlerle oluştur',
    '1. Construct the fundamental matrix from column solutions',
    lines(
      X + p(tt) + eq + matrix([[two + expNegT, p(two + tt + plus + one) + expNegT], [minus + expNegT, minus + p(tt + plus + one) + expNegT]]),
      fn('det', X + p(tt)) + eq + minus + exp(minus + two + tt) + o('≠') + zero
    ),
    'Temel matris X(t), sütunları lineer bağımsız çözümler olan kare matristir ve determinantı hiçbir t için sıfır olamaz.',
    'The fundamental matrix X(t) collects linearly independent solution columns; its determinant never vanishes.'
  ),
  step(
    '2. Parametrelerin değişimi deneme çözümünü kur',
    '2. Formulate the variation of parameters trial solution',
    lines(
      sub(vecX, v('P')) + p(tt) + eq + X + p(tt) + vecC + p(tt)
    ),
    'Homojen çözümdeki sabitler vektörü C, zamana bağlı c(t) fonksiyonlar vektörüne dönüştürülür.',
    'The constant vector C in the complementary solution is replaced by a time-dependent parameter vector c(t).'
  ),
  step(
    '3. Türev alarak indirgenmiş cebirsel sistemi elde et',
    '3. Differentiate to obtain the reduced algebraic equation',
    lines(
      dot(X) + vecC + plus + X + dot(vecC) + eq + A + X + vecC + plus + vecF + imp + X + p(tt) + dot(vecC) + p(tt) + eq + vecF + p(tt),
      dot(vecC) + p(tt) + eq + pow(X, minus + one) + p(tt) + vecF + p(tt)
    ),
    'Ẋ = A X özdeşliği sayesinde homojen terimler tamamen birbirini götürür; geriye yalnızca X(t) ċ(t) = f(t) kalır.',
    'Because Ẋ = A X, homogeneous terms cancel completely, leaving the elegant relation X(t) ċ(t) = f(t).'
  ),
  step(
    '4. Temel matrisin tersini al',
    '4. Invert the fundamental matrix',
    lines(
      pow(X, minus + one) + p(tt) + eq + exp(tt) + matrix([[tt + plus + one, two + tt + plus + one], [minus + one, minus + two]])
    ),
    '2x2 matris tersi formülü veya Gauss-Jordan elemesiyle X⁻¹(t) açık analitik olarak bulunur.',
    'The inverse X⁻¹(t) is calculated in closed form using the 2x2 matrix inversion formula or Gauss-Jordan elimination.'
  ),
  step(
    '5. c(t) integrali ile homojen olmayan genel çözümü tamamla',
    '5. Integrate to complete the nonhomogeneous general solution',
    lines(
      vecC + p(tt) + eq + vector([C1, C2]) + plus + o('∫') + pow(X, minus + one) + p(tt) + vecF + p(tt) + v('d') + tt,
      vecX + p(tt) + eq + X + p(tt) + vecC + p(tt)
    ),
    'İntegrasyon sonucu bulunan c(t) vektörü X(t) ile soldan çarpılarak tüm keyfi zorlamalar altındaki tam analitik yanıt elde edilir.',
    'Multiplying the integrated parameter vector c(t) by X(t) produces the complete response under arbitrary forcing.'
  )
];

export const matrixSystemsStudy = {
  paths: [
    {
      id: 'matrix-eigen-path',
      title: T('Yol 1: Özdeğerler, özvektörler ve faz uzayında düz çizgi çözümleri', 'Path 1: Eigenvalues, eigenvectors, and straight-line solutions in phase space'),
      steps: pathEigenRays
    },
    {
      id: 'matrix-variation-path',
      title: T('Yol 2: Temel matris X(t), tersi ve parametrelerin değişimi integrali', 'Path 2: Fundamental matrix X(t), its inverse, and variation of parameters'),
      steps: pathVariationOfParameters
    }
  ],
  predictions: [
    {
      id: 'pred-eigen-invariance',
      title: T('Özvektör doğrultusunda başlatılan bir yörünge eğrilir mi?', 'Does a trajectory launched along an eigenvector curve?'),
      scenario: T(
        'dx/dt = A x lineer sisteminde bir parçacık t = 0 anında A matrisinin bir v₁ özvektörü doğrultusunda (x(0) = c v₁) harekete başlatılıyor.',
        'In the linear system dx/dt = A x, a particle is released at t = 0 strictly along an eigenvector v₁ of matrix A (x(0) = c v₁).'
      ),
      question: T(
        'Zaman ilerledikçe bu parçacığın faz uzayındaki yörüngesi eğrilir mi, yoksa aynı doğru üzerinde mi kalır?',
        'As time progresses, does this particle curve in the phase plane, or does it stay on the exact same straight line?'
      ),
      options: [
        T(
          'Asla eğrilmez; hız vektörü A v₁ = λ₁ v₁ konum vektörüne daima paralel olduğundan parçacık e^(λ₁ t) ölçeğinde aynı düz çizgi üzerinde hareket eder.',
          'It never curves; because the velocity vector A v₁ = λ₁ v₁ is always parallel to position, motion remains on the straight eigen-ray scaled by e^(λ₁ t).'
        ),
        T(
          'Hemen dairesel bir yörüngeye bükülerek orijin etrafında dönmeye başlar.',
          'It immediately bends into a circular orbit and rotates around the origin.'
        ),
        T(
          'Yalnızca özdeğer pozitifse eğrilir, negatifse durur.',
          'It curves only if the eigenvalue is positive; if negative, it halts.'
        )
      ],
      answer: 0,
      explanation: T(
        'Özvektörlerin temel geometrik tanımı tam olarak budur: A matrisi özvektör doğrultusunu değiştirmez, sadece λ kadar uzatır veya kısaltır. Dolayısıyla türev dx/dt vektörü konum x(t) vektörüyle daima aynı doğrultudadır ve yörünge saf bir düz çizgi ışınıdır (invariant ray).',
        'This is the fundamental geometric definition of an eigenvector: matrix A preserves its direction, acting purely by scalar scaling by λ. Thus the velocity vector dx/dt stays collinear with x(t), generating an invariant straight-line ray.'
      )
    },
    {
      id: 'pred-defective-multiplicity',
      title: T('Kusurlu matrislerde katlı özdeğere kaç bağımsız özvektör düşer?', 'How many independent eigenvectors exist for a defective matrix?'),
      scenario: T(
        '2x2 bir A matrisinin karakteristik denklemi çift katlı kök veriyor: (λ + 1)² = 0 (cebirsel katlılık m = 2). Ancak (A - λI)v = 0 denklemi yalnızca tek bir bağımsız v₁ özvektörü üretiyor.',
        'A 2x2 matrix A has a repeated characteristic root (λ + 1)² = 0 (algebraic multiplicity m = 2). However, (A - λI)v = 0 yields only a single independent eigenvector v₁.'
      ),
      question: T(
        'Bu kusurlu (defective) sistemde ikinci bağımsız çözüm nasıl inşa edilir?',
        'How is the second linearly independent solution constructed in such a defective system?'
      ),
      options: [
        T(
          '(A − λI)v₂ = v₁ bağıntısını sağlayan genelleştirilmiş bir v₂ özvektörü bulunur ve x₂(t) = e^(λt)(t v₁ + v₂) formülü kullanılır.',
          'Find a generalized eigenvector v₂ satisfying (A − λI)v₂ = v₁, and form x₂(t) = e^(λt)(t v₁ + v₂).'
        ),
        T(
          'İkinci çözüm doğrudan x₂(t) = t e^(λt) v₁ olarak yazılır, ek vektöre ihtiyaç yoktur.',
          'The second solution is simply x₂(t) = t e^(λt) v₁ without requiring any additional vector.'
        ),
        T(
          'Kusurlu matrislerin diferansiyel çözümü yoktur; sistem çözümsüz kalır.',
          'Defective matrices have no differential solutions; the system is unsolvable.'
        )
      ],
      answer: 0,
      explanation: T(
        'Eğer doğrudan x₂ = t e^(λt) v₁ denenseydi, türev dx₂/dt = e^(λt)v₁ + λ t e^(λt)v₁ olurdu; oysa A x₂ = t e^(λt) A v₁ = λ t e^(λt) v₁ verir ve e^(λt)v₁ terimi dengelenemezdi! Bu fazlalık terimi ancak (A - λI)v₂ = v₁ genelleştirilmiş özvektör zinciri karşılar.',
        'Substituting x₂ = t e^(λt) v₁ yields dx₂/dt = e^(λt)v₁ + λ t e^(λt)v₁, whereas A x₂ = λ t e^(λt)v₁, leaving an unbalanced e^(λt)v₁ term. The generalized eigenvector equation (A - λI)v₂ = v₁ balances this derivative exactly.'
      )
    }
  ]
};

export const matrixSystemsClinic = {
  examClinic: [
    {
      id: 'clinic-case-1',
      badge: T('6 PUAN / VİZE SORUSU', '6 POINTS / MIDTERM PROBLEM'),
      statement: T(
        'Örnek 7.14 sistemini matris yöntemiyle çöz: ẋ₁ = x₁ + 4x₂,  ẋ₂ = x₁ − 2x₂, başlangıç koşulları x₁(0) = 1, x₂(0) = 2. Özdeğerleri, özvektörleri bul, faz portresini sınıflandır ve analitik çözümü yaz.',
        'Solve Example 7.14 via the matrix method: ẋ₁ = x₁ + 4x₂,  ẋ₂ = x₁ − 2x₂ with x₁(0) = 1, x₂(0) = 2. Determine eigenvalues, eigenvectors, classify the phase portrait, and state the solution.'
      ),
      trap: T(
        'Tuzak: (A - λI)v = 0 çözerken satırların birbirinin katı olduğunu fark etmeyip v = 0 trivial çözümüne takılmak.',
        'Trap: Failing to recognize that rows of (A - λI) are linearly dependent, mistakenly concluding v = 0.'
      ),
      steps: [
        step(
          '1. Matris A’yı yaz ve karakteristik denklemi çöz',
          '1. State matrix A and solve characteristic equation',
          lines(
            A + eq + matrix([[one, four], [one, minus + two]]),
            fn('det', A + minus + lam + I) + eq + pow(lam, two) + plus + lam + minus + six + eq + zero + imp + lam1 + eq + minus + three + o(',') + lam2 + eq + two
          ),
          'İki gerçel ve zıt işaretli özdeğer (λ₁ = -3, λ₂ = 2) sistemin bir eyer noktası (saddle point) olduğunu gösterir.',
          'Two real eigenvalues of opposite sign (λ₁ = -3, λ₂ = 2) identify a saddle point equilibrium.'
        ),
        step(
          '2. λ₁ = -3 için özvektör v₁ hesapla',
          '2. Compute eigenvector v₁ for λ₁ = -3',
          lines(
            p(A + plus + three + I) + v1 + eq + matrix([[four, four], [one, one]]) + vector([sub(v('v'), n(11)), sub(v('v'), n(21))]) + eq + zero,
            sub(v('v'), n(11)) + plus + sub(v('v'), n(21)) + eq + zero + imp + v1 + eq + vector([one, minus + one])
          ),
          'λ₁ = -3 kararlı eksendir; bu doğrultuda başlayan hareket hızla orijine yaklaşır.',
          'λ₁ = -3 is the stable manifold; trajectories along this axis decay into the origin.'
        ),
        step(
          '3. λ₂ = 2 için özvektör v₂ hesapla',
          '3. Compute eigenvector v₂ for λ₂ = 2',
          lines(
            p(A + minus + two + I) + v2 + eq + matrix([[minus + one, four], [one, minus + four]]) + vector([sub(v('v'), n(12)), sub(v('v'), n(22))]) + eq + zero,
            minus + sub(v('v'), n(12)) + plus + four + sub(v('v'), n(22)) + eq + zero + imp + v2 + eq + vector([four, one])
          ),
          'λ₂ = 2 kararsız eksendir; bu doğrultudaki hareket zamanla orijinden uzaklaşır.',
          'λ₂ = 2 is the unstable manifold; trajectories along this axis diverge toward infinity.'
        ),
        step(
          '4. Başlangıç koşullarından C₁ ve C₂ katsayılarını çöz',
          '4. Solve for constants C₁ and C₂ using initial conditions',
          lines(
            C1 + vector([one, minus + one]) + plus + C2 + vector([four, one]) + eq + vector([one, two]),
            C1 + plus + four + C2 + eq + one + o(',') + minus + C1 + plus + C2 + eq + two + imp + C2 + eq + f(three, five) + o(',') + C1 + eq + minus + f(seven, five)
          ),
          'İki bilinmeyenli cebirsel denklem sistemi C₁ = -7/5 ve C₂ = 3/5 verir.',
          'Solving the 2x2 algebraic system determines C₁ = -7/5 and C₂ = 3/5 uniquely.'
        ),
        step(
          '5. Analitik çözümü yaz ve diferansiyel denklemi doğrula',
          '5. State analytical solution and verify ODE residuals',
          lines(
            x1 + p(tt) + eq + minus + f(seven, five) + expNeg3t + plus + f(twelve, five) + exp2t,
            x2 + p(tt) + eq + f(seven, five) + expNeg3t + plus + f(three, five) + exp2t
          ),
          'ẋ₁ - (x₁ + 4x₂) = 0 ve ẋ₂ - (x₁ - 2x₂) = 0 kalıntıları özdeşçe sıfırdır.',
          'System residuals ẋ₁ - (x₁ + 4x₂) and ẋ₂ - (x₁ - 2x₂) evaluate to machine zero.'
        )
      ]
    },
    {
      id: 'clinic-case-2',
      badge: T('5 PUAN / VİZE SORUSU', '5 POINTS / MIDTERM PROBLEM'),
      statement: T(
        'Örnek 7.15 sistemini çöz: ẋ₁ = −x₁ + 5x₂,  ẋ₂ = −4x₁ − 5x₂, x₁(0) = 5, x₂(0) = 2. Kompleks eşlenik özdeğerleri ve özvektörü bul, Euler formülüyle gerçel çözümlere ayrıştır.',
        'Solve Example 7.15: ẋ₁ = −x₁ + 5x₂,  ẋ₂ = −4x₁ − 5x₂ with x₁(0) = 5, x₂(0) = 2. Determine complex eigenvalues, find eigenvector, and decouple into real solutions via Euler’s formula.'
      ),
      trap: T(
        'Tuzak: Kompleks özvektör v = [5, -2 + 4i]^T terimini Euler formülüyle çarparken e^(-3t) üstel sönümünü unutmak veya i² = -1 işaret hatası yapmak.',
        'Trap: Overlooking the e^(-3t) decay multiplier or making sign errors in i² = -1 during Euler expansion.'
      ),
      steps: [
        step(
          '1. Matris A ve karakteristik kökleri bul',
          '1. Set up matrix A and solve for complex roots',
          lines(
            A + eq + matrix([[minus + one, five], [minus + four, minus + five]]),
            fn('det', A + minus + lam + I) + eq + pow(lam, two) + plus + six + lam + plus + twentyFive + eq + zero + imp + lam + eq + minus + three + o('±') + four + v('i')
          ),
          'Gerçel kısım α = -3 negatif olduğundan sistem kararlı bir odak (stable spiral sink) oluşturur.',
          'Because the real part α = -3 is negative, trajectories form a stable spiral focusing into the origin.'
        ),
        step(
          '2. λ = -3 + 4i için kompleks özvektörü belirle',
          '2. Determine complex eigenvector for λ = -3 + 4i',
          lines(
            matrix([[two + minus + four + v('i'), five], [minus + four, minus + two + minus + four + v('i')]]) + vector([sub(v('v'), one), sub(v('v'), two)]) + eq + zero,
            p(two + minus + four + v('i')) + sub(v('v'), one) + plus + five + sub(v('v'), two) + eq + zero + imp + vecV + eq + vector([five, minus + two]) + plus + v('i') + vector([zero, four])
          ),
          'Gerçel kısım v_R = [5, -2]^T ve sanal kısım v_I = [0, 4]^T olarak ayrıştırılır.',
          'Partitioning gives real part v_R = [5, -2]^T and imaginary part v_I = [0, 4]^T.'
        ),
        step(
          '3. Euler formülüyle gerçel ve sanal çözümleri türet',
          '3. Expand via Euler’s formula into real and imaginary solutions',
          lines(
            exp(p(minus + three + plus + four + v('i')) + tt) + vecV + eq + expNeg3t + p(cos4 + plus + v('i') + sin4) + p(sub(vecV, v('R')) + plus + v('i') + sub(vecV, v('I'))),
            sub(vecX, one) + eq + expNeg3t + p(sub(vecV, v('R')) + cos4 + minus + sub(vecV, v('I')) + sin4) + o(',') + sub(vecX, two) + eq + expNeg3t + p(sub(vecV, v('R')) + sin4 + plus + sub(vecV, v('I')) + cos4)
          ),
          'Gerçel ve sanal kısımlar ayrı ayrı iki lineer bağımsız gerçel çözüm oluşturur.',
          'Real and imaginary parts each form valid, linearly independent real-valued solutions.'
        ),
        step(
          '4. Başlangıç koşullarından katsayıları hesapla',
          '4. Evaluate coefficients from initial conditions',
          lines(
            x1 + p(zero) + eq + five + v('A') + eq + five + imp + v('A') + eq + one,
            x2 + p(zero) + eq + minus + two + v('A') + plus + four + v('B') + eq + two + imp + v('B') + eq + one
          ),
          'x₁(0) = 5 ve x₂(0) = 2 değerleri A = 1 ve B = 1 katsayılarını verir.',
          'The initial conditions determine constants A = 1 and B = 1.'
        ),
        step(
          '5. Genel çözümü yaz ve sönümlü sarmalı doğrula',
          '5. State solution and verify damped spiral trajectory',
          lines(
            x1 + p(tt) + eq + five + expNeg3t + p(cos4 + plus + sin4),
            x2 + p(tt) + eq + two + expNeg3t + p(cos4 + minus + three + sin4)
          ),
          'Yörünge orijin etrafında saat yönünün tersine dönerek e^(-3t) üstel sönümüyle merkeze kilitlenir.',
          'The phase trajectory spirals inward counter-clockwise, asymptotically decaying to zero.'
        )
      ]
    },
    {
      id: 'clinic-case-3',
      badge: T('5 PUAN / FİNAL SORUSU', '5 POINTS / FINAL PROBLEM'),
      statement: T(
        'Örnek 7.18 kusurlu sistemini çöz: ẋ₁ = −3x₁ − 4x₂ + 2e⁻ᵗ,  ẋ₂ = x₁ + x₂, x₁(0) = 2, x₂(0) = −1. Katlı özdeğeri (λ = −1), genelleştirilmiş özvektör zincirini ve parametre değişimiyle özel çözümü bul.',
        'Solve defective system Example 7.18: ẋ₁ = −3x₁ − 4x₂ + 2e⁻ᵗ,  ẋ₂ = x₁ + x₂ with x₁(0) = 2, x₂(0) = −1. Find repeated root, generalized eigenvector chain, and particular solution.'
      ),
      trap: T(
        'Tuzak: Matris kusurlu olduğunda (A - λI)v₂ = v₁ denklemini çözmeyip ikinci çözüme t e^(-t) v₁ yazmak.',
        'Trap: Neglecting the generalized eigenvector relation (A - λI)v₂ = v₁, incorrectly using t e^(-t) v₁.'
      ),
      steps: [
        step(
          '1. Matris A ve katlı özdeğeri belirle',
          '1. Identify matrix A and repeated eigenvalue',
          lines(
            A + eq + matrix([[minus + three, minus + four], [one, one]]),
            fn('det', A + minus + lam + I) + eq + pow(lam + plus + one, two) + eq + zero + imp + lam + eq + minus + one + o(' (katlılık m = 2)')
          ),
          'Karakteristik kök çift katlı λ = -1 çıkar.',
          'The characteristic root is repeated with algebraic multiplicity m = 2 at λ = -1.'
        ),
        step(
          '2. Özvektör v₁ ve genelleştirilmiş özvektör v₂ bul',
          '2. Find eigenvector v₁ and generalized eigenvector v₂',
          lines(
            p(A + plus + I) + v1 + eq + matrix([[minus + two, minus + four], [one, two]]) + v1 + eq + zero + imp + v1 + eq + vector([two, minus + one]),
            p(A + plus + I) + v2 + eq + v1 + imp + matrix([[minus + two, minus + four], [one, two]]) + v2 + eq + vector([two, minus + one]) + imp + v2 + eq + vector([one, minus + one])
          ),
          '(A - λI)v₂ = v₁ zinciri ikinci bağımsız vektörü v₂ = [1, -1]^T olarak üretir.',
          'The chain (A - λI)v₂ = v₁ provides the generalized eigenvector v₂ = [1, -1]^T.'
        ),
        step(
          '3. Temel matris X(t) ve tersini oluştur',
          '3. Construct fundamental matrix X(t) and its inverse',
          lines(
            X + p(tt) + eq + matrix([[two + expNegT, p(two + tt + plus + one) + expNegT], [minus + expNegT, minus + p(tt + plus + one) + expNegT]]),
            pow(X, minus + one) + p(tt) + eq + exp(tt) + matrix([[tt + plus + one, two + tt + plus + one], [minus + one, minus + two]])
          ),
          'Temel matris sütunları x₁ = e^(-t)v₁ ve x₂ = e^(-t)(t v₁ + v₂) bağımsız çözümleridir.',
          'Columns of X(t) are the independent solutions x₁ = e^(-t)v₁ and x₂ = e^(-t)(t v₁ + v₂).'
        ),
        step(
          '4. Parametrelerin değişimi integralini al',
          '4. Evaluate variation of parameters integral',
          lines(
            o('∫') + pow(X, minus + one) + p(tt) + vector([two + expNegT, zero]) + v('d') + tt + eq + o('∫') + vector([two + p(tt + plus + one), minus + two]) + v('d') + tt + eq + vector([pow(tt, two) + plus + two + tt, minus + two + tt])
          ),
          'X⁻¹(t) f(t) çarpımı e^t · e^(-t) sadeleşmesiyle polinom integrallerine dönüşür.',
          'The product X⁻¹(t) f(t) cancels exponentials, reducing to basic polynomial integrals.'
        ),
        step(
          '5. Genel çözümü kur ve başlangıç koşullarını uygula',
          '5. Form general solution and apply initial conditions',
          lines(
            x1 + p(tt) + eq + expNegT + p(minus + two + pow(tt, two) + plus + two + tt + plus + two),
            x2 + p(tt) + eq + expNegT + p(pow(tt, two) + minus + one)
          ),
          'x₁(0) = 2 ve x₂(0) = -1 tam sağlanır; sistem kalıntıları sıfırdır.',
          'Matches initial conditions x₁(0) = 2, x₂(0) = -1 exactly with zero residual.'
        )
      ]
    },
    {
      id: 'clinic-case-4',
      badge: T('6 PUAN / FİNAL SORUSU', '6 POINTS / FINAL PROBLEM'),
      statement: T(
        'Örnek 7.19 sistemini çöz: ẋ₁ = x₁ − x₂ + sec t,  ẋ₂ = 2x₁ − x₂, x₁(0) = 1, x₂(0) = 1. Belirsiz katsayılarla çözülemeyen sec t zorlamasını temel matris X(t) ve parametrelerin değişimiyle entegre et.',
        'Solve Example 7.19: ẋ₁ = x₁ − x₂ + sec t,  ẋ₂ = 2x₁ − x₂ with x₁(0) = 1, x₂(0) = 1. Integrate non-standard sec t forcing using fundamental matrix X(t) and variation of parameters.'
      ),
      trap: T(
        'Tuzak: sec t zorlaması için belirsiz katsayılar yöntemi denemek; tan t ve ln|cos t| integrallerinde işaret hatası yapmak.',
        'Trap: Attempting undetermined coefficients for sec t; sign errors in integrating tan t to -ln|cos t|.'
      ),
      steps: [
        step(
          '1. Homojen sistemi çöz ve temel matrisi kur',
          '1. Solve homogeneous system and form fundamental matrix',
          lines(
            A + eq + matrix([[one, minus + one], [two, minus + one]]) + imp + fn('det', A + minus + lam + I) + eq + pow(lam, two) + plus + one + eq + zero + imp + lam + eq + o('±') + v('i'),
            X + p(tt) + eq + matrix([[cost, sint], [cost + plus + sint, sint + minus + cost]])
          ),
          'Özdeğerler saf sanal ±i olup sistem bir merkez (center) oluşturur.',
          'Eigenvalues are pure imaginary ±i, forming an undamped harmonic center.'
        ),
        step(
          '2. Temel matrisin tersini al',
          '2. Invert the fundamental matrix',
          lines(
            fn('det', X) + eq + minus + one + imp + pow(X, minus + one) + p(tt) + eq + matrix([[cost + minus + sint, sint], [cost + plus + sint, minus + cost]])
          ),
          'det X(t) = -1 sabit determinant verir; ters matris trigonometrik toplamlarla yazılır.',
          'det X(t) = -1 is constant; the inverse is formed by simple trigonometric entries.'
        ),
        step(
          '3. Zorlama vektörüyle çarp ve sec t sadeleşmesini yap',
          '3. Multiply with forcing vector and simplify sec t',
          lines(
            pow(X, minus + one) + p(tt) + vector([sect, zero]) + eq + vector([p(cost + minus + sint) + sect, p(cost + plus + sint) + sect]) + eq + vector([one + minus + fn('tan', tt), one + plus + fn('tan', tt)])
          ),
          'cos t · sec t = 1 ve sin t · sec t = tan t sadeleşmesi elde edilir.',
          'Simplifies neatly via cos t · sec t = 1 and sin t · sec t = tan t.'
        ),
        step(
          '4. c(t) parametre integrallerini hesapla',
          '4. Compute parameter integrals for c(t)',
          lines(
            sub(vecC, one) + eq + C1 + plus + o('∫') + p(one + minus + fn('tan', tt)) + v('d') + tt + eq + C1 + plus + tt + plus + fn('ln', abs(cost)),
            sub(vecC, two) + eq + C2 + plus + o('∫') + p(one + plus + fn('tan', tt)) + v('d') + tt + eq + C2 + plus + tt + minus + fn('ln', abs(cost))
          ),
          '∫ tan t dt = -ln|cos t| integrali devreye girer.',
          'The standard integral ∫ tan t dt = -ln|cos t| provides the log-cosine terms.'
        ),
        step(
          '5. Genel çözümü topla ve başlangıç değerlerini sağla',
          '5. Combine general solution and satisfy initial conditions',
          lines(
            x1 + p(tt) + eq + p(one + plus + tt) + cost + plus + tt + sint + plus + p(cost + minus + sint) + fn('ln', abs(cost)),
            x2 + p(tt) + eq + cost + plus + p(one + plus + two + tt) + sint + plus + two + cost + fn('ln', abs(cost))
          ),
          'x₁(0) = 1, x₂(0) = 1 başlangıç değerleri tam sağlanır; denklem kalıntıları sıfırdır.',
          'Recovers initial values x₁(0) = 1, x₂(0) = 1 with machine-precision zero residuals.'
        )
      ]
    }
  ]
};
