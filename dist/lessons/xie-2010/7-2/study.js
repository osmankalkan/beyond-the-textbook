import {T, step, v, n, o, r, p, f, pow, sub, eq, plus, minus, x, y, t, fn, lines, dot} from '../../../study/math.js';

const zero = n(0), one = n(1), two = n(2), three = n(3), four = n(4), six = n(6), nine = n(9), eighteen = n(18);
const D = v('D'), lam = v('λ'), om = v('ω'), tt = v('t');
const phi = fn('φ', D), philam = fn('φ', lam);
const A1 = sub(v('A'), n(1)), B1 = sub(v('B'), n(1)), A2 = sub(v('A'), n(2)), B2 = sub(v('B'), n(2));
const C1 = sub(v('C'), n(1)), C2 = sub(v('C'), n(2)), C3 = sub(v('C'), n(3));
const D1 = sub(v('D'), n(1)), D2 = sub(v('D'), n(2)), D3 = sub(v('D'), n(3));
const xC = sub(x, v('C')), yC = sub(y, v('C')), xP = sub(x, v('P')), yP = sub(y, v('P'));
const delX = sub(v('Δ'), x), delY = sub(v('Δ'), y);
const imp = o('⇒'), cdot = o('·'), cos3 = fn('cos', three + tt), sin3 = fn('sin', three + tt);
const expNeg3 = pow(v('e'), minus + three + tt), expNeg = pow(v('e'), minus + tt), expNeg2 = pow(v('e'), minus + two + tt), expPos2 = pow(v('e'), two + tt);

const matrix = rows => o('[') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '</mtable>' + o(']');
const det = rows => o('|') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '</mtable>' + o('|');
const vector = items => matrix(items.map(item => [item]));

const pathDeterminant = [
  step(
    '1. Lineer sistemi diferansiyel operatör formunda yaz',
    '1. Write the linear system in differential operator form',
    lines(
      p(D + minus + three) + x + minus + six + y + eq + zero,
      three + x + plus + p(D + plus + three) + y + eq + zero
    ),
    'Türev d/dt yerine D operatörü konur. Denklem katsayıları sabit polinomlar halini alır ve matris cebirine uygun forma kavuşur.',
    'Replace d/dt with the operator D. Equation coefficients become constant polynomials suitable for matrix operations.'
  ),
  step(
    '2. Operatör katsayı matrisinin determinantını al',
    '2. Evaluate the determinant of the operator matrix',
    lines(
      phi + eq + det([[D + minus + three, minus + six], [three, D + plus + three]]),
      phi + eq + p(D + minus + three) + p(D + plus + three) + plus + eighteen + eq + pow(D, two) + plus + nine
    ),
    'Çapraz çarpımlar toplanır: (D - 3)(D + 3) - (-18) = D² - 9 + 18 = D² + 9. Her iki değişken de aynı φ(D)x = 0 ve φ(D)y = 0 skaler denklemini sağlar.',
    'Form the cross products: (D - 3)(D + 3) - (-18) = D² + 9. Both variables satisfy the same scalar equation φ(D)x = 0 and φ(D)y = 0.'
  ),
  step(
    '3. Karakteristik denklemi çöz ve ortak çözüm formunu yaz',
    '3. Solve the characteristic equation and write the general forms',
    lines(
      philam + eq + pow(lam, two) + plus + nine + eq + zero + imp + lam + eq + o('±') + three + v('i'),
      xC + eq + A1 + cos3 + plus + B1 + sin3,
      yC + eq + A2 + cos3 + plus + B2 + sin3
    ),
    'Karakteristik kökler saf sanal ±3i çıktığı için hem x hem de y frekansı 3 rad/s olan harmonik salınımlar yapar.',
    'Because characteristic roots are pure imaginary ±3i, both x and y perform harmonic oscillations with frequency 3 rad/s.'
  ),
  step(
    '4. Sistem mertebesini belirle ve fazlalık sabitleri say',
    '4. Determine system degree and count excess constants',
    lines(
      v('deg') + p(phi) + eq + two + o('⟹') + n(2) + v('bağımsız sabit'),
      v('Yazılan sabit sayısı') + eq + n(4) + p(A1 + o(',') + B1 + o(',') + A2 + o(',') + B2),
      v('Fazlalık sabit') + eq + four + minus + two + eq + two
    ),
    'φ(D) polinomunun mertebesi 2’dir; bu nedenle genel çözümde yalnız 2 bağımsız sabit bulunabilir. 4 sabit yazıldığı için 2 tanesi elenmek zorundadır.',
    'The polynomial φ(D) has degree 2, so the general solution can contain only 2 independent constants. Writing 4 constants requires eliminating 2.'
  ),
  step(
    '5. Orijinal denkleme yerleştirerek sabitleri eşleştir',
    '5. Substitute into original equation and link constants',
    lines(
      p(D + minus + three) + xC + minus + six + yC + eq + zero,
      p(minus + three + A1 + plus + three + B1 + minus + six + A2) + cos3 + plus + p(minus + three + A1 + minus + three + B1 + minus + six + B2) + sin3 + eq + zero,
      A2 + eq + minus + f(one, two) + p(A1 + minus + B1) + o(',') + B2 + eq + minus + f(one, two) + p(A1 + plus + B1)
    ),
    'cos(3t) ve sin(3t) lineer bağımsız olduğundan katsayıları ayrı ayrı sıfır olmalıdır. Buradan A₂ ve B₂ sabitleri doğrudan A₁ ve B₁’e bağlanır.',
    'Because cos(3t) and sin(3t) are linearly independent, their coefficients vanish separately, expressing A₂ and B₂ directly in terms of A₁ and B₁.'
  )
];

const pathCramer = [
  step(
    '1. Zorlanmış operatör sistemini matris denklemine dönüştür',
    '1. Convert the forced operator system to matrix form',
    lines(
      matrix([[D + minus + three, minus + six], [three, D + plus + three]]) + vector([x, y]) + eq + vector([zero, eighteen + tt + expNeg3])
    ),
    'Sağ tarafta homojen olmayan f₁(t) = 0 ve f₂(t) = 18t e⁻³ᵗ zorlama fonksiyonları yer alır.',
    'The right-hand side contains the non-homogeneous forcing terms f₁(t) = 0 and f₂(t) = 18t e⁻³ᵗ.'
  ),
  step(
    '2. Cramer determinantlarını kur: operatörler fonksiyonlardan önce gelir',
    '2. Set up Cramer determinants: operators must precede functions',
    lines(
      delX + eq + det([[zero, minus + six], [eighteen + tt + expNeg3, D + plus + three]]) + eq + six + cdot + p(eighteen + tt + expNeg3) + eq + n(108) + tt + expNeg3,
      delY + eq + det([[D + minus + three, zero], [three, eighteen + tt + expNeg3]]) + eq + p(D + minus + three) + p(eighteen + tt + expNeg3)
    ),
    'Hayati kural: Determinant açılırken operatör sütunu fonksiyondan önce yazılmalıdır: (D - 3)[18t e⁻³ᵗ], asla çarpım gibi ters sırada değil.',
    'Vital rule: When expanding the determinant, differential operators MUST act on functions: (D - 3)[18t e⁻³ᵗ], never in reverse order.'
  ),
  step(
    '3. Δ_y(t) türevini ve ters operatör ifadelerini hesapla',
    '3. Evaluate the derivative in Δ_y(t) and inverse operator forms',
    lines(
      delY + eq + eighteen + expNeg3 + minus + n(54) + tt + expNeg3 + minus + n(54) + tt + expNeg3 + eq + eighteen + expNeg3 + minus + n(108) + tt + expNeg3,
      xP + eq + f(one, pow(D, two) + plus + nine) + p(n(108) + tt + expNeg3),
      yP + eq + f(one, pow(D, two) + plus + nine) + p(eighteen + expNeg3 + minus + n(108) + tt + expNeg3)
    ),
    'Çarpım kuralı türevi: D[t e⁻³ᵗ] = e⁻³ᵗ - 3t e⁻³ᵗ. Böylece Δ_y sadeleşerek ters operatör uygulanacak net fonksiyonu verir.',
    'Product rule differentiation: D[t e⁻³ᵗ] = e⁻³ᵗ - 3t e⁻³ᵗ, producing the simplified target function for the inverse operator.'
  ),
  step(
    '4. Üstel kaydırma ve seri açılımı ile x_P ve y_P çözümlerini bul',
    '4. Apply exponential shift and series expansion for x_P and y_P',
    lines(
      xP + eq + n(108) + expNeg3 + f(one, pow(D + minus + three, two) + plus + nine) + p(tt) + eq + six + expNeg3 + p(one + plus + f(one, three) + D) + p(tt),
      xP + eq + two + expNeg3 + p(three + tt + plus + one),
      yP + eq + minus + expNeg3 + p(six + tt + plus + one)
    ),
    '1/P(D)[e^(at) g] = e^(at) 1/P(D+a)[g] üstel kaydırması uygulanır. Kalan polinom operatörü seriye açılarak D mertebesinde kesilir.',
    'Apply the exponential shift 1/P(D)[e^(at) g] = e^(at) 1/P(D+a)[g]. Expanding the remaining operator in series and truncating at D gives the exact polynomial.'
  ),
  step(
    '5. Genel çözümü yaz ve diferansiyel denklemlerle doğrula',
    '5. Write the general solution and verify against differential equations',
    lines(
      x + eq + xC + plus + two + p(three + tt + plus + one) + expNeg3,
      y + eq + yC + minus + p(six + tt + plus + one) + expNeg3,
      p(D + minus + three) + xP + minus + six + yP + eq + zero + o('✓')
    ),
    'x_P ve y_P orijinal sisteme konduğunda (D - 3)x_P - 6y_P = 0 ve 3x_P + (D + 3)y_P = 18t e⁻³ᵗ eşitlikleri kalıntısız doğrulanır.',
    'Substituting x_P and y_P into the system verifies (D - 3)x_P - 6y_P = 0 and 3x_P + (D + 3)y_P = 18t e⁻³ᵗ with zero residual.'
  )
];

export const operatorSystemsStudy = {
  paths: [
    {
      id: 'operator-determinant',
      name: T('Operatör determinantı ve sabit elemesi', 'Operator determinant and constant elimination'),
      badge: T('Rehberli türetim 1', 'Guided path 1'),
      steps: pathDeterminant
    },
    {
      id: 'cramer-particular',
      name: T('Operatörlü Cramer kuralı ve rezonans', 'Operator Cramer’s rule and resonance'),
      badge: T('Rehberli türetim 2', 'Guided path 2'),
      steps: pathCramer
    }
  ],
  predictions: [
    {
      id: 'pred-system-order',
      title: T('Sistem mertebesi ve bağımsız sabit sayısı', 'System order and number of independent constants'),
      question: T(
        'İki birinci mertebe denklemden oluşan bir sistemde det[φ(D)] = D² + 9 bulunursa, genel çözümde toplam kaç bağımsız serbest sabit kalmalıdır?',
        'If a system of two first-order differential equations has det[φ(D)] = D² + 9, how many independent arbitrary constants must the general solution contain?'
      ),
      options: [
        T('2 (mertebe deg φ(D) = 2 olduğu için)', '2 (because degree deg φ(D) = 2)'),
        T('4 (iki değişkenin her biri için ikişer sabit)', '4 (two constants for each of the two variables)'),
        T('1 (denklemler birbirini tamamen kısıtladığı için)', '1 (because the equations constrain each other to a single constant)')
      ],
      correctIndex: 0,
      explanation: T(
        'Doğru! Bir sistemin genel çözümündeki bağımsız keyfi sabit sayısı, operatör determinantı φ(D) polinomunun derecesine (N = deg φ(D)) eşittir. Her ne kadar her iki değişkene ikişer sabit yazılsa da (toplam 4), orijinal sistem iki sabiti diğer ikisine bağlar.',
        'Correct! The true number of independent arbitrary constants in a differential system equals the degree of the operator determinant polynomial N = deg φ(D). Even though four constants are initially written, the original equations link two of them to the other two.'
      )
    },
    {
      id: 'pred-cramer-order',
      title: T('Operatörlü Cramer kuralında işlem sırası', 'Order of operations in Cramer’s operator rule'),
      question: T(
        'Operatör determinantı açılırken (D + 3) operatörü ile f(t) = 2 cos(3t) fonksiyonunun sırası neden değiştirilemez?',
        'Why can the order between operator (D + 3) and function f(t) = 2 cos(3t) not be swapped when expanding the determinant?'
      ),
      options: [
        T('(D + 3)[f(t)] türev işlemidir, f(t)(D + 3) ise bir operatör bırakır', '(D + 3)[f(t)] evaluates derivatives, whereas f(t)(D + 3) leaves an unevaluated operator'),
        T('İki ifade tamamen aynı sonucu verir, sıra önemsizdir', 'Both expressions yield the exact same result; order does not matter'),
        T('D operatörü yalnızca t = 0 anında çarpma kuralına uyar', 'The D operator behaves as scalar multiplication only at t = 0')
      ],
      correctIndex: 0,
      explanation: T(
        'Doğru! Diferansiyel operatörler fonksiyonlarla komütatif (değişmeli) değildir: (D + 3)[2 cos 3t] = -6 sin 3t + 6 cos 3t bir fonksiyondur; oysa 2 cos 3t · (D + 3) bir operatördür. Bu yüzden operatörler mutlaka fonksiyonların ÖNÜNE yazılmalıdır.',
        'Correct! Differential operators do not commute with functions: (D + 3)[2 cos 3t] = -6 sin 3t + 6 cos 3t is a function, whereas 2 cos 3t · (D + 3) is a differential operator. Hence, operators must precede functions.'
      )
    }
  ]
};

export const operatorSystemsClinic = {
  examClinic: [
    {
      id: 'clinic-case-1',
      badge: T('6 PUAN / KLASİK VİZE', '6 POINTS / CLASSIC MIDTERM'),
      statement: T(
        'Homojen sistemi çöz: (D − 3)x − 6y = 0,  3x + (D + 3)y = 0. Karakteristik denklemi, sistem mertebesini ve sabitler arasındaki bağıntıyı bularak genel çözümü yaz.',
        'Solve the homogeneous system: (D − 3)x − 6y = 0,  3x + (D + 3)y = 0. Find the characteristic equation, system degree, and constant relations to state the general solution.'
      ),
      trap: T(
        'Tuzak: x ve y için dörder bağımsız sabit bırakmak veya y’yi ayrı karakteristik denklemle çözüp A₂ ve B₂ faz ilişkisini kurmamak.',
        'Trap: Leaving four independent constants or solving y independently without establishing the phase-coupling relations for A₂ and B₂.'
      ),
      steps: [
        step(
          '1. Operatör determinantı φ(D) oluştur',
          '1. Form the operator determinant φ(D)',
          lines(
            phi + eq + det([[D + minus + three, minus + six], [three, D + plus + three]]) + eq + pow(D, two) + plus + nine
          ),
          'Determinant açılır: (D - 3)(D + 3) + 18 = D² + 9.',
          'Expand the determinant: (D - 3)(D + 3) + 18 = D² + 9.'
        ),
        step(
          '2. Karakteristik kökleri ve bağımsız sabit sayısını bul',
          '2. Find characteristic roots and true constant count',
          lines(
            pow(lam, two) + plus + nine + eq + zero + imp + lam + eq + o('±') + three + v('i'),
            v('deg') + p(phi) + eq + two + imp + n(2) + v('bağımsız keyfi sabit')
          ),
          'İkinci derece operatör tam olarak 2 bağımsız keyfi sabit gerektirir.',
          'A second-degree operator requires exactly two independent arbitrary constants.'
        ),
        step(
          '3. Ortak çözüm formunu yaz',
          '3. Write the general complementary forms',
          lines(
            xC + eq + A1 + cos3 + plus + B1 + sin3,
            yC + eq + A2 + cos3 + plus + B2 + sin3
          ),
          'Henüz 4 sabit vardır (A₁, B₁, A₂, B₂). İkisi orijinal sisteme konarak elenecektir.',
          'Currently four constants appear (A₁, B₁, A₂, B₂). Two must be eliminated via the original system.'
        ),
        step(
          '4. (D - 3)x - 6y = 0 denklemine koy ve katsayıları eşitle',
          '4. Substitute into (D - 3)x - 6y = 0 and match coefficients',
          lines(
            p(minus + three + A1 + plus + three + B1 + minus + six + A2) + cos3 + plus + p(minus + three + A1 + minus + three + B1 + minus + six + B2) + sin3 + eq + zero,
            A2 + eq + minus + f(one, two) + p(A1 + minus + B1) + o(',') + B2 + eq + minus + f(one, two) + p(A1 + plus + B1)
          ),
          'cos(3t) ve sin(3t) terimlerinin katsayıları sıfırlanarak A₂ ve B₂ çözülür.',
          'Setting coefficients of cos(3t) and sin(3t) to zero uniquely determines A₂ and B₂.'
        ),
        step(
          '5. Nihai genel çözümü tek serbest sabit çiftiyle yaz',
          '5. Write the final general solution with one constant pair',
          lines(
            x + eq + A1 + cos3 + plus + B1 + sin3,
            y + eq + minus + f(one, two) + p(A1 + minus + B1) + cos3 + minus + f(one, two) + p(A1 + plus + B1) + sin3
          ),
          'Genel çözüm tam olarak 2 bağımsız sabite (A₁, B₁) indirgenmiştir.',
          'The general solution is reduced to exactly two independent constants (A₁, B₁).'
        )
      ]
    },
    {
      id: 'clinic-case-2',
      badge: T('5 PUAN / VİZE TUZAĞI', '5 POINTS / MIDTERM TRAP'),
      statement: T(
        '3. mertebe asimetrik sistemi çöz: (D² + 3D + 2)x + (D + 1)y = 0,  (D + 2)x + (D − 1)y = 0. Ortak kökleri bul ve y’deki yok olan katsayıyı göster.',
        'Solve the 3rd-order asymmetric system: (D² + 3D + 2)x + (D + 1)y = 0,  (D + 2)x + (D − 1)y = 0. Find roots and prove the vanishing coefficient in y.'
      ),
      trap: T(
        'Tuzak: 3. mertebe sistemde her üstel modun y değişkeninde de sıfırdan farklı serbest katsayı taşıdığını varsaymak; oysa λ = -2 modu için D₂ = 0 çıkar.',
        'Trap: Assuming every exponential mode has a non-zero coefficient in y; in fact, for the mode λ = -2, the coefficient D₂ vanishes identically.'
      ),
      steps: [
        step(
          '1. Determinantı çarpanlarına ayır',
          '1. Factor the operator determinant',
          lines(
            phi + eq + det([[p(D + one) + p(D + two), D + one], [D + two, D + minus + one]]),
            phi + eq + p(D + one) + p(D + two) + p(D + minus + two)
          ),
          'Ortak (D + 1) ve (D + 2) çarpanları paranteze alınarak determinant (D+1)(D+2)(D-2) bulunur.',
          'Factoring (D + 1) and (D + 2) yields φ(D) = (D + 1)(D + 2)(D - 2).'
        ),
        step(
          '2. Karakteristik kökleri ve genel formları belirle',
          '2. Identify roots and complementary forms',
          lines(
            lam + eq + minus + one + o(',') + minus + two + o(',') + two + imp + v('N') + eq + three,
            x + eq + C1 + expNeg + plus + C2 + expNeg2 + plus + C3 + expPos2,
            y + eq + D1 + expNeg + plus + D2 + expNeg2 + plus + D3 + expPos2
          ),
          'N = 3 olduğundan 3 serbest sabit olmalıdır. 6 katsayıdan 3 tanesi elenecektir.',
          'N = 3 requires three free constants; three of the six written constants will be eliminated.'
        ),
        step(
          '3. Basit ikinci denklem (D + 2)x + (D - 1)y = 0 içine koy',
          '3. Substitute into simpler equation (D + 2)x + (D - 1)y = 0',
          lines(
            p(D + two) + x + eq + C1 + expNeg + plus + zero + cdot + expNeg2 + plus + four + C3 + expPos2,
            p(D + minus + one) + y + eq + minus + two + D1 + expNeg + minus + three + D2 + expNeg2 + plus + D3 + expPos2
          ),
          'λ = -2 modunda (D + 2)[C₂ e⁻²ᵗ] = 0 olur; bu yüzden x’ten hiç e⁻²ᵗ katkısı gelmez!',
          'For the λ = -2 mode, (D + 2)[C₂ e⁻²ᵗ] = 0, contributing zero to the equation!'
        ),
        step(
          '4. Üstel katsayıları sıfıra eşitle',
          '4. Equate coefficients of distinct exponentials to zero',
          lines(
            C1 + minus + two + D1 + eq + zero + imp + D1 + eq + f(one, two) + C1,
            minus + three + D2 + eq + zero + imp + D2 + eq + zero,
            four + C3 + plus + D3 + eq + zero + imp + D3 + eq + minus + four + C3
          ),
          'D₂ = 0 bulunur! λ = -2 modu y çözümünde tamamen kaybolur.',
          'D₂ = 0! The λ = -2 mode vanishes completely from the y solution.'
        ),
        step(
          '5. Genel çözümü yaz',
          '5. State the general solution',
          lines(
            x + eq + C1 + expNeg + plus + C2 + expNeg2 + plus + C3 + expPos2,
            y + eq + f(one, two) + C1 + expNeg + minus + four + C3 + expPos2
          ),
          'x üç üstel terim içerirken y yalnızca iki üstel terim taşır.',
          'x contains all three exponential modes, while y carries only two.'
        )
      ]
    },
    {
      id: 'clinic-case-3',
      badge: T('5 PUAN / FİNAL SORUSU', '5 POINTS / FINAL PROBLEM'),
      statement: T(
        'Zorlanmış sistemi çöz: (D − 3)x − 6y = 0,  3x + (D + 3)y = 18t e⁻³ᵗ. Operatörlü Cramer kuralı ile x_P ve y_P özel çözümlerini türet.',
        'Solve the forced system: (D − 3)x − 6y = 0,  3x + (D + 3)y = 18t e⁻³ᵗ. Derive particular solutions x_P and y_P via Cramer’s rule for operators.'
      ),
      trap: T(
        'Tuzak: Δ_y(t) hesabında (D - 3) operatörünü 18t e⁻³ᵗ fonksiyonu ile skaler çarpım gibi düşünüp çarpımın türevi kuralını atlamak.',
        'Trap: Treating (D - 3) in Δ_y(t) as scalar multiplication instead of an operator acting via the product rule.'
      ),
      steps: [
        step(
          '1. Cramer determinantı Δ_x(t) hesapla',
          '1. Calculate Cramer determinant Δ_x(t)',
          lines(
            delX + eq + det([[zero, minus + six], [eighteen + tt + expNeg3, D + plus + three]]) + eq + n(108) + tt + expNeg3
          ),
          '0 - (-6)[18t e⁻³ᵗ] = 108t e⁻³ᵗ elde edilir.',
          '0 - (-6)[18t e⁻³ᵗ] = 108t e⁻³ᵗ.'
        ),
        step(
          '2. Cramer determinantı Δ_y(t) operatör türevini al',
          '2. Evaluate the operator derivative for Δ_y(t)',
          lines(
            delY + eq + p(D + minus + three) + p(eighteen + tt + expNeg3) + eq + eighteen + expNeg3 + minus + n(108) + tt + expNeg3
          ),
          'D[18t e⁻³ᵗ] = 18e⁻³ᵗ - 54t e⁻³ᵗ. Çıkarılan 3(18t e⁻³ᵗ) ile birleşince 18e⁻³ᵗ - 108t e⁻³ᵗ kalır.',
          'D[18t e⁻³ᵗ] = 18e⁻³ᵗ - 54t e⁻³ᵗ. Subtracting 54t e⁻³ᵗ gives 18e⁻³ᵗ - 108t e⁻³ᵗ.'
        ),
        step(
          '3. x_P için üstel kaydırma ve seri uygula',
          '3. Apply exponential shift and series expansion for x_P',
          lines(
            xP + eq + f(n(108), pow(D, two) + plus + nine) + p(tt + expNeg3) + eq + n(108) + expNeg3 + f(one, pow(D + minus + three, two) + plus + nine) + p(tt),
            xP + eq + six + expNeg3 + p(one + plus + f(one, three) + D) + p(tt) + eq + two + expNeg3 + p(three + tt + plus + one)
          ),
          'Üstel kaydırma sonrasında payda D² - 6D + 18 olur; 18 parantezinde 1 + D/3 serisi 3t + 1 verir.',
          'After shift the denominator becomes D² - 6D + 18; series expansion yields 2e⁻³ᵗ(3t + 1).'
        ),
        step(
          '4. y_P özel çözümünü hesapla',
          '4. Evaluate y_P particular solution',
          lines(
            yP + eq + f(eighteen, pow(D, two) + plus + nine) + p(expNeg3) + minus + xP,
            yP + eq + f(eighteen, eighteen) + expNeg3 + minus + two + expNeg3 + p(three + tt + plus + one) + eq + minus + expNeg3 + p(six + tt + plus + one)
          ),
          'Birinci terim 18/((-3)²+9) = 1; x_P sonucu çıkarıldığında y_P = -(6t + 1)e⁻³ᵗ bulunur.',
          'The first term gives 18/((-3)²+9) = 1; subtracting x_P gives y_P = -(6t + 1)e⁻³ᵗ.'
        ),
        step(
          '5. Genel çözümü yaz',
          '5. State the complete general solution',
          lines(
            x + eq + A1 + cos3 + plus + B1 + sin3 + plus + two + p(three + tt + plus + one) + expNeg3,
            y + eq + minus + f(one, two) + p(A1 + minus + B1) + cos3 + minus + f(one, two) + p(A1 + plus + B1) + sin3 + minus + p(six + tt + plus + one) + expNeg3
          ),
          'Özel çözümler x_P ve y_P homojen parçaya eklenerek sistem tam çözülür.',
          'Adding x_P and y_P to the complementary parts completes the exact solution.'
        )
      ]
    },
    {
      id: 'clinic-case-4',
      badge: T('6 PUAN / İLERİ REZONANS', '6 POINTS / ADVANCED RESONANCE'),
      statement: T(
        'Sistemde rezonansı incele: (D − 3)x − 6y = 2 cos 3t,  3x + (D + 3)y = 2 sin 3t. Cramer determinantlarını, seküler rezonans terimlerini ve sabit kaymasını hesapla.',
        'Investigate resonance: (D − 3)x − 6y = 2 cos 3t,  3x + (D + 3)y = 2 sin 3t. Compute Cramer determinants, secular resonance terms, and constant shifts.'
      ),
      trap: T(
        'Tuzak: Payda φ(3i) = (3i)² + 9 = 0 olduğunda ters operatör teoremini terk etmek; türev kuralı 1/φ′(3i) uygulanmalı ve t·cos(3t) seküler büyümesi bulunmalıdır.',
        'Trap: Giving up when the denominator φ(3i) = 0 vanishes; one must apply the derivative rule 1/φ′(3i) to capture secular t cos(3t) growth.'
      ),
      steps: [
        step(
          '1. Cramer determinantlarını hesapla',
          '1. Compute Cramer determinants',
          lines(
            delX + eq + det([[two + cos3, minus + six], [two + sin3, D + plus + three]]) + eq + six + cos3 + plus + six + sin3,
            delY + eq + det([[D + minus + three, two + cos3], [three, two + sin3]]) + eq + minus + six + sin3
          ),
          'İki koordinat için de determinantlar ω = 3 frekansında harmonik zorlama üretir.',
          'Determinants for both coordinates produce forcing harmonics at frequency ω = 3.'
        ),
        step(
          '2. Rezonans teşhisi koy ve φ′(D) türev kuralını uygula',
          '2. Diagnose resonance and apply the φ′(D) rule',
          lines(
            phi + eq + pow(D, two) + plus + nine + o('⟹') + fn('φ', three + v('i')) + eq + zero,
            fn('φ′', D) + eq + two + D + o('⟹') + fn('φ′', three + v('i')) + eq + six + v('i')
          ),
          'Zorlama frekansı doğal frekansla eşleştiği için rezonans vardır; payda sıfırlandığından φ′(3i) kullanılır.',
          'Forcing frequency matches natural frequency, causing resonance; using φ′(3i) resolves the zero denominator.'
        ),
        step(
          '3. Karmaşık rezonans terimini aç',
          '3. Expand the complex resonance term',
          lines(
            f(one, pow(D, two) + plus + nine) + p(pow(v('e'), three + v('i') + tt)) + eq + f(tt + pow(v('e'), three + v('i') + tt), six + v('i')) + eq + f(tt, six) + sin3 + minus + v('i') + f(tt, six) + cos3
          ),
          'Gerçel ve sanal kısımlar ayrılarak cos(3t) ve sin(3t) yanıtları elde edilir.',
          'Splitting real and imaginary parts extracts the individual cosine and sine responses.'
        ),
        step(
          '4. Seküler rezonans terimlerini belirle',
          '4. Determine secular resonance terms',
          lines(
            xP + eq + tt + p(sin3 + minus + cos3),
            yP + eq + tt + cos3
          ),
          'Zamanla doğrusal büyüyen t sin(3t) ve t cos(3t) terimleri genliğin sınırsız artmasına neden olur.',
          'Secular terms t sin(3t) and t cos(3t) grow linearly with time, driving vibration amplitudes without bound.'
        ),
        step(
          '5. Orijinal denkleme koyarak sabit kaymasını bul',
          '5. Substitute into original system to find constant shifts',
          lines(
            p(D + minus + three) + x + minus + six + y + eq + two + cos3,
            A2 + eq + minus + f(one, two) + p(A1 + minus + B1) + minus + f(one, two),
            B2 + eq + minus + f(one, two) + p(A1 + plus + B1) + plus + f(one, six)
          ),
          'Özel çözümün türevinden gelen sabit olmayan artıklar, A₂ ve B₂ sabitlerinde -1/2 ve +1/6 kayması oluşturur.',
          'Non-secular remainders from differentiating x_P shift the complementary constants by -1/2 and +1/6.'
        )
      ]
    }
  ]
};
