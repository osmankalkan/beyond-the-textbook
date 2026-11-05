import {T, step, v, n, o, r, p, f, pow, sub, eq, plus, minus, x, y, t, fn, lines, dot} from '../../../study/math.js';

const zero = n(0), one = n(1), two = n(2), three = n(3), six = n(6);
const m = v('m'), rr = v('r'), th = v('θ'), om = v('ω'), tt = v('t');
const rdot = dot(rr), rddot = dot(rr, 2), thdot = dot(th), thddot = dot(th, 2);
const x1 = sub(v('x'), n(1)), x2 = sub(v('x'), n(2));
const xr = sub(v('x'), v('r')), xrm = sub(v('x'), v('r') + minus + n(1)), xrp = sub(v('x'), v('r') + plus + n(1));
const m1 = sub(v('m'), n(1)), m2 = sub(v('m'), n(2)), mr = sub(v('m'), v('r'));
const k1 = sub(v('k'), n(1)), k2 = sub(v('k'), n(2)), kr = sub(v('k'), v('r')), krp = sub(v('k'), v('r') + plus + n(1));
const c1 = sub(v('c'), n(1)), c2 = sub(v('c'), n(2)), cr = sub(v('c'), v('r')), crp = sub(v('c'), v('r') + plus + n(1));
const Fr = sub(v('F'), v('r')), Fth = sub(v('F'), v('θ'));
const ar = sub(v('a'), v('r')), ath = sub(v('a'), v('θ'));
const K = v('K'), C = v('C'), M = v('M'), F = v('F'), A = v('A'), B = v('B'), Y = v('y');
const imp = o('⇒'), cdot = o('·');

const matrix = rows => o('[') + '<mtable>' + rows.map(row => '<mtr>' + row.map(cell => '<mtd>' + r(cell) + '</mtd>').join('') + '</mtr>').join('') + '</mtable>' + o(']');
const vector = items => matrix(items.map(item => [item]));

const pathParticle = [
  step(
    '1. Dikdörtgen koordinatlarda Newton yasasını yaz',
    '1. Write Newton’s law in rectangular coordinates',
    lines(
      m + rddot + eq + sub(v('F'), v('x')) + p(x + o(',') + y + o(',') + tt),
      m + dot(y, 2) + eq + sub(v('F'), v('y')) + p(x + o(',') + y + o(',') + tt)
    ),
    'İki bağımlı değişken x(t) ve y(t), iki ikinci mertebe denklem verir. Kuvvetler x ve y’ye bağlıysa denklemler birbirine bağlanır; yalnız t’ye bağlıysa çözülür.',
    'Two dependent variables x(t) and y(t) give two second-order equations. If the forces depend on x and y, the equations couple; if they depend only on t, they decouple.'
  ),
  step(
    '2. Kutupsal koordinatlara geç ve birinci türevleri al',
    '2. Switch to polar coordinates and take first derivatives',
    lines(
      x + eq + rr + fn('cos', th), y + eq + rr + fn('sin', th),
      dot(x) + eq + rdot + fn('cos', th) + minus + rr + thdot + fn('sin', th),
      dot(y) + eq + rdot + fn('sin', th) + plus + rr + thdot + fn('cos', th)
    ),
    'x = r cos θ ve y = r sin θ zincir kuralıyla türevlenir. Burada hem r hem de θ zamanın fonksiyonudur; birini sabit saymak en sık yapılan hatadır.',
    'Differentiate x = r cos θ and y = r sin θ by the chain rule. Both r and θ are functions of time; treating either as constant is the most common mistake.'
  ),
  step(
    '3. İkinci türevleri al ve terimleri grupla',
    '3. Take second derivatives and group the terms',
    lines(
      dot(x, 2) + eq + p(rddot + minus + rr + pow(thdot, two)) + fn('cos', th) + minus + p(two + rdot + thdot + plus + rr + thddot) + fn('sin', th),
      dot(y, 2) + eq + p(rddot + minus + rr + pow(thdot, two)) + fn('sin', th) + plus + p(two + rdot + thdot + plus + rr + thddot) + fn('cos', th)
    ),
    'Çarpım kuralı iki yeni terim üretir: rθ˙² ve 2r˙θ˙. Bunlar polar koordinatların “bedeli”dir; dikdörtgen koordinatlarda görünmezler.',
    'The product rule produces two new terms, rθ̇² and 2ṙθ̇. These are the price of polar coordinates and have no rectangular counterpart.'
  ),
  step(
    '4. Radyal ve açısal ivmeleri tanımla',
    '4. Identify radial and angular accelerations',
    lines(
      ar + eq + rddot + minus + rr + pow(thdot, two),
      ath + eq + two + rdot + thdot + plus + rr + thddot,
      m + ar + eq + Fr + o(','), m + ath + eq + Fth
    ),
    'a_r merkezcil ivmeyi, a_θ ise Coriolis ve açısal ivme katkılarını taşır. Newton yasası böylece iki skaler denkleme ayrılır.',
    'a_r carries the centripetal acceleration, while a_θ carries the Coriolis and angular-acceleration contributions. Newton’s law splits into two scalar equations.'
  ),
  step(
    '5. Lineerliği teşhis et ve sabit ω özel durumunu yaz',
    '5. Diagnose linearity and write the constant-ω special case',
    lines(
      m + rddot + minus + m + pow(om, two) + rr + eq + Fr,
      two + m + om + rdot + eq + Fth
    ),
    'Genel polar sistem rθ˙² ve r˙θ˙ çarpımları yüzünden lineer değildir. θ˙ = ω sabitse radyal denklem r’de lineer ikinci mertebe, açısal denklem r˙’de lineer birinci mertebe olur.',
    'The general polar system is nonlinear because of the products rθ̇² and ṙθ̇. If θ̇ = ω is constant, the radial equation becomes linear second order in r and the angular equation linear first order in ṙ.'
  )
];

const pathBuilding = [
  step(
    '1. r. katın serbest cisim diyagramını kur',
    '1. Draw the free-body diagram of floor r',
    lines(
      sub(v('Δ'), v('r')) + eq + xr + minus + xrm,
      sub(v('Δ'), v('r') + plus + n(1)) + eq + xrp + minus + xr
    ),
    'Katlar arası göreli yer değiştirmeler, yay ve sönüm elemanlarının uzama veya kısalma miktarını belirler. Mutlak konum değil, komşu kata göre fark önemlidir.',
    'Relative inter-story displacements determine the extension or compression of each spring and dashpot. The relative difference, not the absolute position, matters.'
  ),
  step(
    '2. Alt ve üst kolon kuvvetlerini işaretleriyle yaz',
    '2. Write lower and upper column forces with signs',
    lines(
      sub(v('F'), v('alt')) + eq + minus + kr + sub(v('Δ'), v('r')) + minus + cr + dot(sub(v('Δ'), v('r'))),
      sub(v('F'), v('üst')) + eq + krp + sub(v('Δ'), v('r') + plus + n(1)) + plus + crp + dot(sub(v('Δ'), v('r') + plus + n(1)))
    ),
    'Alt kolon r. katı sola çeker (−), üst kolon sağa çeker (+). İşaretler fiziksel yönelimden gelir; ezberlenmez.',
    'The lower column pulls floor r to the left (−), while the upper column pulls it to the right (+). The signs follow the physical directions and should not be memorized.'
  ),
  step(
    '3. r. kat denklemini kur ve sınır koşullarını uygula',
    '3. Assemble the floor-r equation and apply boundary conditions',
    lines(
      mr + rddot + plus + p(cr + plus + crp) + dot(xr) + minus + cr + dot(xrm) + minus + crp + dot(xrp),
      plus + p(kr + plus + krp) + xr + minus + kr + xrm + minus + krp + xrp + eq + Fr + p(tt),
      sub(v('x'), n(0)) + eq + n(0) + o(','), sub(v('k'), v('n') + plus + n(1)) + eq + n(0) + o(','), sub(v('c'), v('n') + plus + n(1)) + eq + n(0)
    ),
    'x₀ = 0 zeminin sabit olduğunu; k_{n+1} = c_{n+1} = 0 ise en üst katın ötesinde kolon bulunmadığını ifade eder. Bu iki koşul matrisin tridiagonal kalmasını sağlar.',
    'x₀ = 0 fixes the ground; k_{n+1} = c_{n+1} = 0 state that no column exists above the top floor. These conditions keep the matrices tridiagonal.'
  ),
  step(
    '4. İki katlı binanın M, K, C matrislerini ve statik çözümü yaz',
    '4. Write the two-story M, K, C matrices and the static solution',
    lines(
      M + eq + matrix([[m1, zero], [zero, m2]]),
      K + eq + matrix([[k1 + plus + k2, minus + k2], [minus + k2, k2]]),
      C + eq + matrix([[c1 + plus + c2, minus + c2], [minus + c2, c2]]),
      sub(v('x'), n(1) + v('s')) + eq + f(sub(v('F'), n(1)) + plus + sub(v('F'), n(2)), k1),
      sub(v('x'), n(2) + v('s')) + eq + f(sub(v('F'), n(1)) + plus + sub(v('F'), n(2)), k1) + plus + f(sub(v('F'), n(2)), k2)
    ),
    'K ve C simetrik ve tridiagonaldir; köşegen dışı terimler komşu katlar arasındaki kuplajı taşır. Statik çözüm K x_s = F_s denkleminden gelir.',
    'K and C are symmetric and tridiagonal; off-diagonal terms carry the coupling between adjacent floors. The static solution follows from K x_s = F_s.'
  ),
  step(
    '5. Birinci mertebe durum uzayına dönüştür',
    '5. Convert to first-order state space',
    lines(
      Y + eq + vector([x1, x2, dot(x1), dot(x2)]),
      dot(Y) + eq + matrix([
        [zero, zero, one, zero],
        [zero, zero, zero, one],
        [minus + f(k1 + plus + k2, m1), f(k2, m1), minus + f(c1 + plus + c2, m1), f(c2, m1)],
        [f(k2, m2), minus + f(k2, m2), f(c2, m2), minus + f(c2, m2)]
      ]) + Y + plus + matrix([[zero], [zero], [f(one, m1)], [f(one, m2)]]) + F + p(tt)
    ),
    'n katlı sistemde 2n birinci mertebe denklem vardır. Burada n = 2 için dört durum değişkeni kullanılır: x₁, x₂, ẋ₁, ẋ₂. A matrisinin sol alt bloğu −M⁻¹K, sağ alt bloğu −M⁻¹C’dir.',
    'An n-story system has 2n first-order equations. Here n = 2 gives four states: x₁, x₂, ẋ₁, ẋ₂. The lower-left block of A is −M⁻¹K and the lower-right block is −M⁻¹C.'
  )
];

const clinicProblem1 = [
  step(
    '1. Dikdörtgen koordinat denklemlerini yaz (1 puan)',
    '1. Write the rectangular-coordinate equations (1 point)',
    lines(
      m + rddot + eq + sub(v('F'), v('x')) + p(x + o(',') + y + o(',') + tt),
      m + dot(y, 2) + eq + sub(v('F'), v('y')) + p(x + o(',') + y + o(',') + tt)
    ),
    'Newton’un ikinci yasası her yönde ayrı ayrı yazılır. Bu, iki ikinci mertebe adi diferansiyel denklemden oluşan bir sistemdir.',
    'Newton’s second law is written separately in each direction, producing a system of two second-order ODEs.'
  ),
  step(
    '2. Kutupsal koordinat birinci türevlerini al (1 puan)',
    '2. Take first derivatives in polar coordinates (1 point)',
    lines(
      x + eq + rr + fn('cos', th), y + eq + rr + fn('sin', th),
      dot(x) + eq + rdot + fn('cos', th) + minus + rr + thdot + fn('sin', th),
      dot(y) + eq + rdot + fn('sin', th) + plus + rr + thdot + fn('cos', th)
    ),
    'x ve y’nin türevinde r˙ ve θ˙ terimleri birlikte görünür; bu, koordinat dönüşümünün kaçınılmaz sonucudur.',
    'The derivatives of x and y contain both ṙ and θ̇; this is unavoidable in the coordinate transformation.'
  ),
  step(
    '3. İkinci türevleri al ve radyal/teğetsel parçalara ayır (1 puan)',
    '3. Take second derivatives and split radial/tangential parts (1 point)',
    lines(
      dot(x, 2) + eq + p(rddot + minus + rr + pow(thdot, two)) + fn('cos', th) + minus + p(two + rdot + thdot + plus + rr + thddot) + fn('sin', th),
      dot(y, 2) + eq + p(rddot + minus + rr + pow(thdot, two)) + fn('sin', th) + plus + p(two + rdot + thdot + plus + rr + thddot) + fn('cos', th)
    ),
    'İvme vektörü, e_r = (cos θ, sin θ) ve e_θ = (−sin θ, cos θ) doğrultularında iki bileşene ayrılır.',
    'The acceleration vector splits into the e_r = (cos θ, sin θ) and e_θ = (−sin θ, cos θ) directions.'
  ),
  step(
    '4. Radyal ve açısal ivmeleri tanımla (1 puan)',
    '4. Identify the radial and angular accelerations (1 point)',
    lines(
      ar + eq + rddot + minus + rr + pow(thdot, two),
      ath + eq + two + rdot + thdot + plus + rr + thddot,
      m + ar + eq + Fr + o(','), m + ath + eq + Fth
    ),
    'a_r = r¨ − rθ˙² ve a_θ = 2r˙θ˙ + rθ¨ ifadeleri, kutupsal koordinatlardaki hareket denklemlerinin çekirdeğidir.',
    'a_r = r̈ − rθ̇² and a_θ = 2ṙθ̇ + rθ̈ are the core of the polar equations of motion.'
  ),
  step(
    '5. Lineerlik ve sabit ω tartışması (1 puan)',
    '5. Discuss linearity and the constant-ω case (1 point)',
    lines(
      m + rddot + minus + m + pow(om, two) + rr + eq + Fr,
      two + m + om + rdot + eq + Fth
    ),
    'Genel sistem lineer değildir; rθ˙² ve r˙θ˙ çarpımları bilinmeyenlerin çarpımıdır. θ˙ = ω sabit alınırsa sistem r ve r˙ cinsinden lineerleşir. Bu, “lineer sistemler” başlığının polar örnekte neden koşullu olduğunu gösterir.',
    'The general system is nonlinear because rθ̇² and ṙθ̇ multiply unknowns. With θ̇ = ω constant it becomes linear in r and ṙ, showing why “linear systems” is conditional for the polar example.'
  )
];

const clinicProblem2 = [
  step(
    '1. Göreli yer değiştirmeleri tanımla (1 puan)',
    '1. Define the relative displacements (1 point)',
    lines(
      sub(v('Δ'), v('r')) + eq + xr + minus + xrm,
      sub(v('Δ'), v('r') + plus + n(1)) + eq + xrp + minus + xr
    ),
    'Alt ve üst komşu katlara göre farklar, kolonların deformasyonunu belirler.',
    'Differences relative to the lower and upper neighbours determine the column deformation.'
  ),
  step(
    '2. Kolon kuvvetlerini işaretleriyle yaz (1 puan)',
    '2. Write the column forces with signs (1 point)',
    lines(
      sub(v('F'), v('alt')) + eq + minus + kr + sub(v('Δ'), v('r')) + minus + cr + dot(sub(v('Δ'), v('r'))),
      sub(v('F'), v('üst')) + eq + krp + sub(v('Δ'), v('r') + plus + n(1)) + plus + crp + dot(sub(v('Δ'), v('r') + plus + n(1)))
    ),
    'r. katın altındaki kolon onu geriye çeker; üstündeki kolon ileri çeker. Sönüm kuvvetleri de aynı yönde etki eder.',
    'The column below floor r pulls it back; the column above pulls it forward. Damping forces act in the same directions.'
  ),
  step(
    '3. r. kat hareket denklemini kur (2 puan)',
    '3. Assemble the floor-r equation of motion (2 points)',
    lines(
      mr + rddot + plus + p(cr + plus + crp) + dot(xr) + minus + cr + dot(xrm) + minus + crp + dot(xrp),
      plus + p(kr + plus + krp) + xr + minus + kr + xrm + minus + krp + xrp + eq + Fr + p(tt)
    ),
    'Kütle çarpı ivme, dış kuvvet artı komşu kolonların itme/çekme kuvvetlerine eşittir. Terimler yeniden düzenlendiğinde katsayılar M, C, K matrislerinin satırlarını verir.',
    'Mass times acceleration equals the external load plus the push/pull of neighbouring columns. Rearranging gives the rows of M, C, and K.'
  ),
  step(
    '4. İki katlı K ve C matrislerini yaz (1 puan)',
    '4. Write the two-story K and C matrices (1 point)',
    lines(
      K + eq + matrix([[k1 + plus + k2, minus + k2], [minus + k2, k2]]),
      C + eq + matrix([[c1 + plus + c2, minus + c2], [minus + c2, c2]])
    ),
    'Köşegen terimler katın kendi yaylarının toplamını, köşegen dışı terimler komşu katla paylaşılan yayı taşır.',
    'Diagonal entries collect the floor’s own springs; off-diagonal entries carry the spring shared with the neighbouring floor.'
  ),
  step(
    '5. Simetri ve bant yapısını yorumla (1 puan)',
    '5. Interpret symmetry and banded structure (1 point)',
    lines(
      K + eq + pow(K, v('T')) + o(','), C + eq + pow(C, v('T'))
    ),
    'M simetrik ve köşegendir; K ile C simetrik ve tridiagonaldir. Bu yapı, enerji korunumu ve modal ayrıştırma için gereklidir. Sınır koşulları x₀ = 0 ve k_{n+1} = c_{n+1} = 0 matrisin bu biçimini korur.',
    'M is symmetric and diagonal; K and C are symmetric and tridiagonal. This structure underpins energy conservation and modal decomposition. The boundary conditions x₀ = 0 and k_{n+1} = c_{n+1} = 0 preserve it.'
  )
];

const clinicProblem3 = [
  step(
    '1. Statik denklemleri yaz (1 puan)',
    '1. Write the static equilibrium equations (1 point)',
    lines(
      p(k1 + plus + k2) + x1 + minus + k2 + x2 + eq + sub(v('F'), n(1)),
      minus + k2 + x1 + plus + k2 + x2 + eq + sub(v('F'), n(2))
    ),
    'Statik durumda x¨ = x˙ = 0 olduğundan yalnız K x_s = F_s kalır. Sönüm terimleri statik çözüme girmez.',
    'In statics ẍ = ẋ = 0, leaving only K x_s = F_s. Damping does not enter the static solution.'
  ),
  step(
    '2. Statik çözümü hesapla (1 puan)',
    '2. Compute the static solution (1 point)',
    lines(
      sub(v('x'), n(1) + v('s')) + eq + f(n(4) + plus + n(2), n(4)) + eq + f(n(6), n(4)) + eq + n(1) + o('.') + n(5),
      sub(v('x'), n(2) + v('s')) + eq + n(1) + o('.') + n(5) + plus + f(n(2), n(2)) + eq + n(2) + o('.') + n(5)
    ),
    'x₁s = (F₁ + F₂)/k₁ = 6/4 = 1.5 m; x₂s = 1.5 + F₂/k₂ = 1.5 + 1 = 2.5 m. Üst kat, alt katın yer değiştirmesine kendi yayının deformasyonunu ekler.',
    'x₁s = (F₁ + F₂)/k₁ = 6/4 = 1.5 m; x₂s = 1.5 + F₂/k₂ = 1.5 + 1 = 2.5 m. The top floor adds its own spring deformation to the lower-floor displacement.'
  ),
  step(
    '3. Frekans denklemini kur (1 puan)',
    '3. Set up the frequency equation (1 point)',
    lines(
      fn('det', K + minus + pow(om, two) + M) + eq + zero,
      m1 + m2 + pow(om, n(4)) + minus + p(p(k1 + plus + k2) + m2 + plus + k2 + m1) + pow(om, two) + plus + k1 + k2 + eq + zero
    ),
    'Sönümsüz serbest titreşimde x = φ e^{iωt} varsayımı det(K − ω²M) = 0 koşulunu verir. Bu, özdeğer problemidir; statik denklemle karıştırılmamalıdır.',
    'For undamped free vibration, x = φ e^{iωt} gives det(K − ω²M) = 0. This is an eigenvalue problem, not the static equation.'
  ),
  step(
    '4. Doğal frekansları bul (1 puan)',
    '4. Find the natural frequencies (1 point)',
    lines(
      two + pow(om, n(4)) + minus + n(10) + pow(om, two) + plus + n(8) + eq + zero,
      pow(om, two) + eq + n(1) + o(',') + pow(om, two) + eq + n(4) + imp + om + eq + n(1) + o(',') + om + eq + n(2)
    ),
    'Denklem (ω² − 1)(ω² − 4) = 0 biçiminde çarpanlara ayrılır. Pozitif kökler ω₁ = 1 rad/s ve ω₂ = 2 rad/s’dir.',
    'The equation factors as (ω² − 1)(ω² − 4) = 0. The positive roots are ω₁ = 1 rad/s and ω₂ = 2 rad/s.'
  ),
  step(
    '5. Mod şekillerini yaz (1 puan)',
    '5. Write the mode shapes (1 point)',
    lines(
      sub(v('φ'), n(1)) + eq + vector([one, two]) + o(','), sub(v('φ'), n(2)) + eq + vector([one, minus + one])
    ),
    'ω² = 1 için K − M matrisi x₂ = 2x₁ verir; ω² = 4 için x₂ = −x₁ elde edilir. Birinci mod aynı yönde, ikinci mod zıt yönde salınır.',
    'For ω² = 1, K − M gives x₂ = 2x₁; for ω² = 4, it gives x₂ = −x₁. The first mode moves in phase and the second out of phase.'
  )
];

const clinicProblem4 = [
  step(
    '1. Durum vektörünü tanımla (1 puan)',
    '1. Define the state vector (1 point)',
    lines(
      Y + eq + vector([x1, x2, dot(x1), dot(x2)])
    ),
    'Konum ve hızları tek bir vektörde toplamak, ikinci mertebe sistemi birinci mertebeye indirir. Durum sırası keyfîdir; ancak seçildikten sonra tutarlı olmalıdır.',
    'Collecting positions and velocities into one vector reduces the second-order system to first order. The ordering is a choice, but it must stay consistent.'
  ),
  step(
    '2. x˙₁ = v₁ ve x˙₂ = v₂ denklemlerini yaz (1 puan)',
    '2. Write ẋ₁ = v₁ and ẋ₂ = v₂ (1 point)',
    lines(
      dot(x1) + eq + sub(v('v'), n(1)) + o(','), dot(x2) + eq + sub(v('v'), n(2))
    ),
    'Durum vektörünün ilk iki bileşeni konum, son iki bileşeni hızdır. İlk iki satır bu nedenle birim matris bloklarıdır.',
    'The first two state components are positions and the last two are velocities, so the first two rows are identity blocks.'
  ),
  step(
    '3. İvme denklemlerini matris formuna getir (1 puan)',
    '3. Put the acceleration equations in matrix form (1 point)',
    lines(
      M + dot(v('v')) + eq + minus + K + vector([x1, x2]) + minus + C + vector([sub(v('v'), n(1)), sub(v('v'), n(2))]) + plus + F + p(tt)
    ),
    'M x¨ + C x˙ + K x = F denkleminde x¨ = v˙ yazılır ve M ile bölünür. Buradan durum matrisinin alt blokları elde edilir.',
    'Write ẍ = v̇ in M ẍ + C ẋ + K x = F and divide by M. This produces the lower blocks of the state matrix.'
  ),
  step(
    '4. A ve B bloklarını yaz (2 puan)',
    '4. Write the A and B blocks (2 points)',
    lines(
      A + eq + matrix([[zero, zero, one, zero], [zero, zero, zero, one], [minus + f(k1 + plus + k2, m1), f(k2, m1), minus + f(c1 + plus + c2, m1), f(c2, m1)], [f(k2, m2), minus + f(k2, m2), f(c2, m2), minus + f(c2, m2)]]),
      B + eq + matrix([[zero], [zero], [f(one, m1)], [f(one, m2)]])
    ),
    'A’nın sol üst bloğu 0, sağ üst bloğu I; sol alt bloğu −M⁻¹K, sağ alt bloğu −M⁻¹C’dir. B ise 0 ve M⁻¹ bloklarından oluşur.',
    'The upper-left block of A is 0 and the upper-right is I; the lower-left is −M⁻¹K and the lower-right is −M⁻¹C. B consists of 0 and M⁻¹ blocks.'
  ),
  step(
    '5. Boyut ve özdeğer kontrolü yap (1 puan)',
    '5. Check dimension and eigenvalues (1 point)',
    lines(
      fn('dim', Y) + eq + two + v('n') + eq + n(4) + o(','), fn('det', A + minus + v('λ') + v('I')) + eq + zero
    ),
    'n = 2 için dört durum vardır. Sönümsüz durumda A’nın özdeğerleri ±iω₁ ve ±iω₂ olur; bu, frekans hesabıyla bağımsız bir doğrulamadır.',
    'For n = 2 there are four states. In the undamped case the eigenvalues of A are ±iω₁ and ±iω₂, an independent check on the frequency calculation.'
  )
];

export const systemsStudy = {
  title: T(
    'Düzlemde parçacık ve çok katlı bina: fiziksel modelden matrise, matristen durum uzayına.',
    'Particle in a plane and a multi-story building: from physical model to matrix, from matrix to state space.'
  ),
  intro: T(
    '§7.1 iki motive edici örnekle başlar: düzlemde hareket eden parçacık ve n katlı kesme binası. Birinci örnek koordinat seçiminin denklemleri nasıl değiştirdiğini, ikincisi ise çok serbestlik dereceli sistemlerin neden matris formunda yazıldığını gösterir. Her iki örnekte de ortak hedef, ikinci mertebe denklemleri birinci mertebe durum uzayına dönüştürmektir.',
    'Section 7.1 opens with two motivating examples: a particle moving in a plane and an n-story shear building. The first shows how the choice of coordinates changes the equations; the second shows why multi-degree-of-freedom systems are written in matrix form. In both, the common goal is to convert second-order equations into first-order state space.'
  ),
  paths: [
    {
      title: T('Parçacık: Dikdörtgen Koordinatlardan Kutupsal Koordinatlara', 'Particle: From Rectangular to Polar Coordinates'),
      prompt: T('Aynı hareketi iki farklı koordinat sistemiyle yazmak neden birbirinden bu kadar farklı görünür?', 'Why does writing the same motion in two coordinate systems look so different?'),
      steps: pathParticle,
      reflection: T('Kutupsal denklemlerdeki rθ˙² ve 2r˙θ˙ terimleri nereden gelir? Bu terimler hangi koşulda lineerleşir?', 'Where do the rθ̇² and 2ṙθ̇ terms come from, and under what condition does the system become linear?')
    },
    {
      title: T('Kesme Binası: Serbest Cisimden Matrise ve Durum Uzayına', 'Shear Building: From Free Body to Matrix and State Space'),
      prompt: T('Tek bir katın denklemi, tüm binanın matris denklemine nasıl dönüşür?', 'How does a single floor equation become the matrix equation of the whole building?'),
      steps: pathBuilding,
      reflection: T('K ve C matrislerinin simetrik ve tridiagonal olması fiziksel olarak ne anlama gelir? Sınır koşulları bu yapıyı nasıl korur?', 'What does the symmetric, tridiagonal structure of K and C mean physically, and how do the boundary conditions preserve it?')
    }
  ],
  predictions: [
    {
      id: 'pred-systems-circular',
      question: T(
        'r = R sabit ve θ˙ = ω sabit iken radyal ivme a_r nedir?',
        'If r = R is constant and θ̇ = ω is constant, what is the radial acceleration a_r?'
      ),
      context: T(
        'a_r = r¨ − rθ˙² tanımını kullan. r sabit olduğu için r¨ = 0 olur.',
        'Use a_r = r̈ − rθ̇². Since r is constant, r̈ = 0.'
      ),
      choices: T(
        ['−Rω²', '0', '+Rω²'],
        ['−Rω²', '0', '+Rω²']
      ),
      answer: 0,
      reason: T(
        'r¨ = 0 olduğundan a_r = −Rω² olur. Sabit süratle dairesel hareket eden cisim bile merkeze doğru ivmelenir; bu ivme olmasaydı cisim teğet boyunca düz giderdi.',
        'With r̈ = 0, a_r = −Rω². Even a body moving uniformly on a circle accelerates toward the center; without this acceleration it would travel straight along the tangent.'
      ),
      math: ar + eq + minus + v('R') + pow(om, two),
      try: T('Laboratuvarda “Dairesel” hazır ayarını seç; r sabit kalırken a_r’nin negatif olduğunu gözle.', 'Select the “Circular” preset in the lab and observe that a_r stays negative while r remains constant.')
    },
    {
      id: 'pred-systems-dimension',
      question: T(
        '3 katlı bir kesme binası birinci mertebe durum uzayında kaç denklemle temsil edilir?',
        'How many first-order state equations represent a three-story shear building?'
      ),
      context: T(
        'Her kat için bir konum ve bir hız olmak üzere iki durum değişkeni gerekir.',
        'Each floor needs two state variables: one displacement and one velocity.'
      ),
      choices: T(
        ['3', '6', '9'],
        ['3', '6', '9']
      ),
      answer: 1,
      reason: T(
        'n katlı sistemde durum boyutu 2n’dir. n = 3 için 2·3 = 6 denklem yazılır. Bu, üç ikinci mertebe denklemin altı birinci mertebe denkleme açılmasıdır.',
        'An n-story system has state dimension 2n. For n = 3, 2·3 = 6 equations are written. Three second-order equations expand into six first-order equations.'
      ),
      math: two + cdot + three + eq + six,
      try: T('Laboratuvarda bina moduna geç; durum boyutu kartının 2n = 4 gösterdiğini doğrula.', 'Switch to the building mode in the lab and verify that the state-dimension card shows 2n = 4.')
    }
  ]
};

export const systemsClinic = {
  examBlueprint: [
    {
      step: T('1 · Değişkenleri, Mertebeyi ve Lineerliği Teşhis Et', '1 · Identify Variables, Order, and Linearity'),
      detail: T('Bağımsız değişkeni ve bağımlı değişkenleri listele. En yüksek türev mertebesini bul. Bilinmeyenlerin çarpımı veya doğrusal olmayan fonksiyonu var mı? Varsa sistem lineer değildir.', 'List the independent and dependent variables. Find the highest derivative order. Are there products or nonlinear functions of the unknowns? If so, the system is nonlinear.')
    },
    {
      step: T('2 · Fiziksel Dengeyi Matrise Çevir', '2 · Convert Physical Balance to a Matrix'),
      detail: T('Serbest cisim diyagramında komşu elemanların kuvvetlerini işaretleriyle yaz. Kütle, sönüm ve rijitlik matrislerini simetrik ve tridiagonal olacak şekilde düzenle. Sınır koşullarını unutma.', 'Write the forces from neighbouring elements with signs. Arrange mass, damping, and stiffness matrices symmetrically and tridiagonally. Do not forget the boundary conditions.')
    },
    {
      step: T('3 · Durum Uzayına Aç ve Kontrol Et', '3 · Expand to State Space and Verify'),
      detail: T('Her ikinci mertebe denklem için konum ve hız olmak üzere iki durum tanımla. A ve B bloklarını yaz. Boyutu 2n ile, sönümsüz özdeğerleri ±iω ile kontrol et.', 'Define two states, displacement and velocity, for each second-order equation. Write the A and B blocks. Check the dimension 2n and the undamped eigenvalues ±iω.')
    }
  ],
  examClinic: [
    {
      badge: T('5 PUAN · 5 DAKİKA', '5 POINTS · 5 MINUTES'),
      title: T('Parçacık hareketinde dikdörtgen → kutupsal dönüşüm (Örnek 7.1)', 'Particle motion: rectangular → polar transformation (Example 7.1)'),
      statement: T('m kütleli parçacığın düzlemdeki hareket denklemlerini dikdörtgen ve kutupsal koordinatlarda türetiniz; kutupsal sistemin lineer olup olmadığını tartışınız.', 'Derive the equations of motion of a particle of mass m in rectangular and polar coordinates, and discuss whether the polar system is linear.'),
      trap: T('Merkezcil terimin işaretini ve rθ˙², r˙θ˙ çarpımlarının lineerliği bozduğunu atlamayın.', 'Do not miss the sign of the centripetal term or the fact that rθ̇² and ṙθ̇ destroy linearity.'),
      steps: clinicProblem1
    },
    {
      badge: T('6 PUAN · 6 DAKİKA', '6 POINTS · 6 MINUTES'),
      title: T('n katlı kesme binasında r. kat denklemi ve matrisler (Örnek 7.2)', 'n-story shear building: floor-r equation and matrices (Example 7.2)'),
      statement: T('r. katın serbest cisim diyagramından hareket denklemini türetiniz; iki katlı bina için M, C, K matrislerini yazınız.', 'Derive the equation of motion from the free-body diagram of floor r, and write M, C, and K for a two-story building.'),
      trap: T('Alt kolonun −, üst kolonun + işaretini ve x₀ = 0, k_{n+1} = c_{n+1} = 0 sınır koşullarını karıştırmayın.', 'Do not mix up the lower-column − and upper-column + signs, or the boundary conditions x₀ = 0 and k_{n+1} = c_{n+1} = 0.'),
      steps: clinicProblem2
    },
    {
      badge: T('5 PUAN · 5 DAKİKA', '5 POINTS · 5 MINUTES'),
      title: T('İki katlı binada statik denge ve doğal frekanslar', 'Static equilibrium and natural frequencies of a two-story building'),
      statement: T('m₁ = 2 kg, m₂ = 1 kg, k₁ = 4 N/m, k₂ = 2 N/m, F₁ = 4 N, F₂ = 2 N için statik yer değiştirmeleri, doğal frekansları ve mod şekillerini bulunuz.', 'For m₁ = 2 kg, m₂ = 1 kg, k₁ = 4 N/m, k₂ = 2 N/m, F₁ = 4 N, F₂ = 2 N, find the static displacements, natural frequencies, and mode shapes.'),
      trap: T('Statik çözümde K x = F, doğal frekansta det(K − ω²M) = 0 kullanılır. Mod şeklinin oranını koruyup normalize etmeyi unutmayın.', 'Statics uses K x = F; natural frequencies use det(K − ω²M) = 0. Preserve the mode-shape ratio when normalizing.'),
      steps: clinicProblem3
    },
    {
      badge: T('6 PUAN · 6 DAKİKA', '6 POINTS · 6 MINUTES'),
      title: T('İki katlı sistemi birinci mertebe durum uzayına dönüştürme', 'Convert the two-story system to first-order state space'),
      statement: T('Aynı bina için y = [x₁, x₂, ẋ₁, ẋ₂]ᵀ tanımlayınız; durum matrisi A ve giriş matrisi B’yi yazınız; boyutu ve A’nın sol alt bloğunu belirtiniz.', 'For the same building, define y = [x₁, x₂, ẋ₁, ẋ₂]ᵀ; write the state matrix A and input matrix B; state the dimension and the lower-left block of A.'),
      trap: T('A’nın sol alt bloğu −M⁻¹K, sağ alt bloğu −M⁻¹C’dir. İşaretleri ve durum sırasını koruyun.', 'The lower-left block of A is −M⁻¹K and the lower-right is −M⁻¹C. Preserve the signs and the state ordering.'),
      steps: clinicProblem4
    }
  ]
};
