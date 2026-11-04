import {extraQuestions} from './questions.js';
import {linearSummaryStudy, linearSummaryClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const linearSummaryLesson = {
  id: 'xie-2010:4.5',
  section: '4.5',
  chapterNumber: '04',
  chapterTitle: text('Doğrusal diferansiyel denklemler', 'Linear differential equations'),
  title: text('Özet: doğrusal denklemlerde yöntem seçimi ve Euler indirgemesi', 'Summary: method selection in linear ODEs and Cauchy–Euler reduction'),
  englishTitle: 'Summary: Method Selection in Linear ODEs and Cauchy–Euler Reduction',
  subtitle: text(
    'Bölüm 4’ün bütün araçlarını tek bir karar matrisinde birleştir: karakteristik kök atlası, Belirsiz Katsayılar, 4 temel D-operatörü teoremi, Parametrelerin Değişimi ve x=e^z ile Cauchy–Euler indirgemesi.',
    'Synthesize all Chapter 4 tools into a single decision matrix: characteristic root atlas, Undetermined Coefficients, the 4 core D-operator theorems, Variation of Parameters, and Cauchy–Euler reduction via x=e^z.'
  ),
  pages: '178–187',
  pdfPages: '196–205',
  lessonPath: text('lessons/xie-2010/4-5/lesson.md', 'lessons/xie-2010/4-5/lesson-en.md'),
  mathPath: 'lessons/xie-2010/4-5/math.json',
  inlinePath: 'lessons/xie-2010/4-5/inline.json',
  labFamily: 'linear-summary',
  downloadName: text('4-5-ozet-dogrusal-yontem-secimi-ve-euler.md', '4-5-summary-linear-method-selection-and-euler.md'),
  highlights: text(
    [
      'Tamamlayıcı çözüm y_C atlası: ayrık, hiperbolik, karmaşık ve p-katlı kökler',
      'Özel çözüm y_P üçgeni: Belirsiz Katsayılar vs D-Operatörü vs Parametrelerin Değişimi',
      'Beş araçlı D-Operatörü oyun kitabı (Seri açılımı ve Teorem 1–4)',
      'Cauchy–Euler denklemleri (§4.4): x=e^z dönüşümü ve x^k D^k = 𝒟(𝒟−1)⋯ özdeşliği',
      'On teşhis kartı ve dört usta vize/final kliniği (Örnek 4.30–4.31, Problem 4.36–4.64)'
    ],
    [
      'Complementary solution y_C atlas: distinct, hyperbolic, complex, and p-fold roots',
      'Particular solution y_P triad: Undetermined Coefficients vs D-Operator vs Variation of Parameters',
      'Five-tool D-Operator playbook (Series expansion and Theorems 1–4)',
      'Cauchy–Euler equations (§4.4): x=e^z transformation and x^k D^k = 𝒟(𝒟−1)⋯ identity',
      'Ten diagnostic challenge cards and four master exam clinic problems (Examples 4.30–4.31, Problems 4.36–4.64)'
    ]
  ),
  notesPlaceholder: text(
    'Sağ taraf F(x) toplamına baktığımda hangi terim için Teorem 1, Teorem 2, Teorem 3, Teorem 4 veya Parametrelerin Değişimini seçmeliyim?',
    'When scanning the forcing F(x), which term calls for Theorem 1, Theorem 2, Theorem 3, Theorem 4, or Variation of Parameters?'
  ),
  sourceSummary: text(
    '§§4.4–4.5, s.178–187 (PDF s.196–205, Örnek 4.30–4.31 ve Bölüm 4 Özeti) temelinde kapsamlı bölüm kapanış sentezi.',
    'Comprehensive chapter-capstone synthesis based on §§4.4–4.5, pp. 178–187 (PDF pp. 196–205, Examples 4.30–4.31 and Chapter 4 Summary).'
  ),
  modelLimits: text(
    'Teşhis simülatörü Bölüm 4’ün 10 temel yöntemini (3 homojen kök yapısı, 2 belirsiz katsayı kuralı, 4 D-operatörü teoremi ve Cauchy–Euler / Parametrelerin Değişimi) etkileşimli olarak denetler. Cauchy–Euler dönüşümü z = ln x, x > 0 yarı-doğrusu üzerinde tanımlıdır.',
    'The diagnostic simulator interactively evaluates the 10 core methods of Chapter 4 (3 homogeneous root structures, 2 undetermined-coefficient rules, 4 D-operator theorems, and Cauchy–Euler / Variation of Parameters). The Cauchy–Euler substitution z = ln x is defined on the half-line x > 0.'
  ),
  presentation: {
    clinicEyebrow: text('§4.5 · BÖLÜM 4 KAPANIŞ SENTEZİ · USTA KLİNİK', '§4.5 · CHAPTER 4 CAPSTONE SYNTHESIS · MASTER CLINIC'),
    lab: text('Doğrusal yöntem seçimi ve Euler teşhis simülatörü', 'Linear method selection & Cauchy–Euler diagnostic simulator'),
    practice: text('Vize & Final hazırlığı', 'Midterm & Final preparation'),
    practiceTitle: text('Katsayıları, kökleri ve zorlama terimini 60 saniyede teşhis et', 'Diagnose coefficients, roots, and forcing terms in 60 seconds'),
    practiceIntro: text(
      '20 dakika · 20 puan. Dört kapsamlı sınav sorusu üzerinde D-operatörü taraması, Parametrelerin Değişimi ve Cauchy–Euler indirgemesini uygula; ardından 12 sentez sorusuyla ustalığını kanıtla.',
      '20 minutes · 20 points. Apply D-operator triage, Variation of Parameters, and Cauchy–Euler reduction across four master exam problems, then verify your mastery with 12 synthesis questions.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: linearSummaryStudy,
  guidedTools: linearSummaryClinic,
  questions: [
    {
      title: text('Üç adımlı doğrusal tarama', 'Three-step linear triage'),
      tag: '4.5',
      text: text(
        'Yüksek mertebe bir doğrusal diferansiyel denklemle karşılaşıldığında yöntem seçimi hangi sırayla yapılmalıdır?',
        'When facing a higher-order linear differential equation, in what order should method selection proceed?'
      ),
      choices: text(
        [
          'Önce katsayı türü (sabit mi, Cauchy–Euler mi), sonra homojen kökler (y_C), en son F(x) yapısına göre özel çözüm (y_P) yöntemi',
          'Önce başlangıç koşulları, sonra özel çözüm y_P, en son karakteristik kökler',
          'Her denklemde doğrudan Wronski determinantı ve Parametrelerin Değişimi'
        ],
        [
          'First coefficient type (constant vs Cauchy–Euler), then homogeneous roots (y_C), and finally the particular solution (y_P) method based on F(x)',
          'First initial conditions, then particular solution y_P, and finally characteristic roots',
          'Direct Wronskian determinant and Variation of Parameters on every equation'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru karar zinciri önce denklemin sabit katsayılı olup olmadığını (veya x=e^z ile indirgenip indirgenemeyeceğini) belirler; ardından rezonans kontrolü için y_C köklerini bulur ve son olarak F(x) için en hızlı y_P aracını seçer.',
        'The proper decision chain first checks whether coefficients are constant (or Cauchy–Euler reducible via x=e^z), next finds y_C roots to detect resonance, and finally picks the fastest y_P tool for F(x).'
      ),
      hints: text(
        ['Homojen kökleri bilmeden y_P’de rezonans olup olmadığını anlayabilir misin?', 'Değişken katsayılı bir denklemde doğrudan φ(λ)=0 yazılabilir mi?'],
        ['Can you detect resonance in y_P without knowing the homogeneous roots first?', 'Can you write φ(λ)=0 directly for a variable-coefficient ODE?']
      )
    },
    {
      title: text('Belirsiz Katsayılar sınır 조건ı', 'Scope of Undetermined Coefficients'),
      tag: 'YÖNTEM SEÇİMİ / METHOD SELECTION',
      text: text(
        'Aşağıdaki sağ taraf F(x) fonksiyonlarından hangisi için Belirsiz Katsayılar ve D-operatörü kısayolları ÇALIŞMAZ ve Parametrelerin Değişimi zorunludur?',
        'For which of the following forcing functions F(x) do Undetermined Coefficients and D-operator shortcuts FAIL, making Variation of Parameters mandatory?'
      ),
      choices: text(
        [
          'F(x) = e²ˣ / (eˣ + 1)²  veya  F(x) = tan x',
          'F(x) = 4x² e⁻ˣ cos 3x',
          'F(x) = 5 cosh 2x + 3x⁴'
        ],
        [
          'F(x) = e²ˣ / (eˣ + 1)²  or  F(x) = tan x',
          'F(x) = 4x² e⁻ˣ cos 3x',
          'F(x) = 5 cosh 2x + 3x⁴'
        ]
      ),
      answer: 0,
      feedback: text(
        'Belirsiz katsayılar yalnızca sonlu türev ailesine sahip F(x) = e^{αx}P_k(x){cos βx, sin βx} terimlerinde (ve cosh/sinh karşılıklarında) çalışır. Rasyonel kesirler, tan x, sec x veya ln x için Parametrelerin Değişimi zorunludur.',
        'Undetermined coefficients work only for functions with a finite derivative family: F(x) = e^{αx}P_k(x){cos βx, sin βx} (including cosh/sinh). Rational quotients, tan x, sec x, or ln x require Variation of Parameters.'
      ),
      hints: text(
        ['Hangi fonksiyonun ardışık türevleri sonsuz sayıda yeni bağımsız terim üretir?', 'Tablo 4.1’de bölüm durumunda (eˣ + 1)² paydası var mıdır?'],
        ['Which function generates infinitely many new independent terms upon repeated differentiation?', 'Does Table 4.1 include denominators like (eˣ + 1)²?']
      )
    },
    {
      title: text('Rezonans çarpanı x^p', 'Resonance multiplier x^p'),
      tag: 'REZONANS / RESONANCE',
      text: text(
        'φ(D)y = e^{αx} P_k(x) denkleminde α sayısı karakteristik denklemin p katlı kökü ise Belirsiz Katsayılar deneme çözümü nasıl kurulur?',
        'In φ(D)y = e^{αx} P_k(x), if α is a characteristic root of multiplicity p, how is the Undetermined Coefficients trial constructed?'
      ),
      choices: text(
        [
          'y_P = x^p (A_k x^k + ⋯ + A₁ x + A₀) e^{αx}',
          'y_P = (A_k x^k + ⋯ + A₁ x + A₀) e^{αx}',
          'y_P = A_k x^{k+p} e^{αx}'
        ],
        [
          'y_P = x^p (A_k x^k + ⋯ + A₁ x + A₀) e^{αx}',
          'y_P = (A_k x^k + ⋯ + A₁ x + A₀) e^{αx}',
          'y_P = A_k x^{k+p} e^{αx}'
        ]
      ),
      answer: 0,
      feedback: text(
        'α sayısı p katlı kök olduğunda, tam k. derece polinomun tamamı x^p ile çarpılmalıdır. Yalnızca en yüksek kuvveti yazmak veya x^p çarpanını unutmak katsayı sistemini çözümsüz bırakır.',
        'When α is a root of multiplicity p, the complete degree-k polynomial must be multiplied by x^p. Writing only the leading power or omitting x^p makes the algebraic system inconsistent.'
      ),
      hints: text(
        ['Polinomun alt dereceli terimleri atlanabilir mi?', 'Homojen çözümle çakışmayı hangi çarpan önler?'],
        ['Can lower-degree terms of the polynomial be omitted?', 'Which factor prevents overlap with the homogeneous solution?']
      )
    },
    {
      title: text('Sıfır payda ve Teorem 4', 'Zero denominator and Theorem 4'),
      tag: 'TEOREM 4 / THEOREM 4',
      text: text(
        'φ(D)y = e^{ax} denkleminde φ(a) = φ′(a) = ⋯ = φ^{(p−1)}(a) = 0 ve φ^{(p)}(a) ≠ 0 ise D-operatörü Teorem 4 hangi özel çözümü verir?',
        'In φ(D)y = e^{ax}, if φ(a) = φ′(a) = ⋯ = φ^{(p−1)}(a) = 0 and φ^{(p)}(a) ≠ 0, what particular solution does D-operator Theorem 4 give?'
      ),
      choices: text(
        [
          'y_P = x^p e^{ax} / φ^{(p)}(a)',
          'y_P = e^{ax} / φ(a)',
          'y_P = p! x^p e^{ax}'
        ],
        [
          'y_P = x^p e^{ax} / φ^{(p)}(a)',
          'y_P = e^{ax} / φ(a)',
          'y_P = p! x^p e^{ax}'
        ]
      ),
      answer: 0,
      feedback: text(
        'Teorem 4 (sıfır payda türev kuralı), φ(D) = (D − a)^p ψ(D) çarpanlamasında φ^{(p)}(a) = p! ψ(a) özdeşliğini kullanarak y_P = x^p e^{ax} / φ^{(p)}(a) sonucunu tek adımda verir.',
        'Theorem 4 (zero-denominator derivative rule) uses φ^{(p)}(a) = p! ψ(a) for φ(D) = (D − a)^p ψ(D) to yield y_P = x^p e^{ax} / φ^{(p)}(a) in a single step.'
      ),
      hints: text(
        ['Payda sıfır olduğunda φ polinomunun kaçıncı türevine bölünür?', 'Pay kısmına hangi x kuvveti gelir?'],
        ['When the denominator vanishes, by which derivative of φ do we divide?', 'What power of x appears in the numerator?']
      )
    },
    {
      title: text('Cauchy–Euler tanımı (§4.4)', 'Cauchy–Euler definition (§4.4)'),
      tag: 'CAUCHY–EULER / §4.4',
      text: text(
        'Bir diferansiyel denklemin Cauchy–Euler (eş-boyutlu) denklem olmasının temel yapısal şartı nedir?',
        'What is the defining structural condition for an ODE to be a Cauchy–Euler (equidimensional) equation?'
      ),
      choices: text(
        [
          'Her terimde x’in kuvveti ile türev mertebesi birbirine eşittir: a_k x^k D^k y',
          'Bütün katsayılar x’ten bağımsız sabit sayılardır',
          'Sağ taraf F(x) daima sıfırdır'
        ],
        [
          'In every term, the power of x matches the order of differentiation: a_k x^k D^k y',
          'All coefficients are constants independent of x',
          'The right-hand side F(x) is always zero'
        ]
      ),
      answer: 0,
      feedback: text(
        'Cauchy–Euler denklemi (a_n x^n D^n + a_{n−1} x^{n−1} D^{n−1} + ⋯ + a₁ x D + a₀)y = f(x) biçimindedir. Her türev kendi mertebesi kadar x kuvvetiyle çarpıldığı için x = e^z dönüşümü onu sabit katsayılı yapar.',
        'A Cauchy–Euler equation has the form (a_n x^n D^n + a_{n−1} x^{n−1} D^{n−1} + ⋯ + a₁ x D + a₀)y = f(x). Because each derivative is multiplied by the matching power of x, setting x = e^z reduces it to constant coefficients.'
      ),
      hints: text(
        ['D^k türevinin katsayısında x’in üssü kaçtır?', 'Neden bu denklemlere eş-boyutlu (equidimensional) denir?'],
        ['What is the exponent of x multiplying D^k?', 'Why are these equations called equidimensional?']
      )
    },
    {
      title: text('Cauchy–Euler ikinci türev dönüşümü', 'Cauchy–Euler second-derivative identity'),
      tag: 'CAUCHY–EULER / §4.4',
      text: text(
        'x = e^z (z = ln x) ve 𝒟 = d/dz dönüşümü altında x² d²y/dx² (yani x²D²y) ifadesi neye eşittir?',
        'Under the substitution x = e^z (z = ln x) and 𝒟 = d/dz, what does x² d²y/dx² (i.e., x²D²y) equal?'
      ),
      choices: text(
        [
          '𝒟(𝒟 − 1)y = (d²y/dz² − dy/dz)',
          '𝒟²y = d²y/dz²',
          '𝒟(𝒟 + 1)y = (d²y/dz² + dy/dz)'
        ],
        [
          '𝒟(𝒟 − 1)y = (d²y/dz² − dy/dz)',
          '𝒟²y = d²y/dz²',
          '𝒟(𝒟 + 1)y = (d²y/dz² + dy/dz)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Zincir kuralıyla dy/dx = e^{−z} 𝒟y ve d²y/dx² = e^{−2z}(𝒟² − 𝒟)y bulunur. Her iki taraf x² = e^{2z} ile çarpılınca x²D²y = 𝒟(𝒟 − 1)y özdeşliği elde edilir.',
        'By the chain rule, dy/dx = e^{−z} 𝒟y and d²y/dx² = e^{−2z}(𝒟² − 𝒟)y. Multiplying by x² = e^{2z} gives the fundamental identity x²D²y = 𝒟(𝒟 − 1)y.'
      ),
      hints: text(
        ['d/dx(e^{−z} dy/dz) çarpım türevinden hangi ek terim gelir?', 'x^k D^k = 𝒟(𝒟 − 1)⋯(𝒟 − k + 1) formülünde k = 2 koy.'],
        ['What extra term arises from the product rule in d/dx(e^{−z} dy/dz)?', 'Set k = 2 in x^k D^k = 𝒟(𝒟 − 1)⋯(𝒟 − k + 1).']
      )
    },
    {
      title: text('Parametrelerin Değişimi sistem yapısı', 'Variation of Parameters system structure'),
      tag: 'PARAMETRELERİN DEĞİŞİMİ / §4.3.3',
      text: text(
        'n. mertebe standart y⁽ⁿ⁾ + ⋯ + a₀(x)y = F(x) denkleminde Parametrelerin Değişimi uygulanırken c₁′(x), …, cₙ′(x) için kurulan doğrusal sistemin sağ taraf sütunu nasıldır?',
        'When applying Variation of Parameters to the standard n-th order ODE y⁽ⁿ⁾ + ⋯ + a₀(x)y = F(x), what is the right-hand side column of the linear system for c₁′(x), …, cₙ′(x)?'
      ),
      choices: text(
        [
          'İlk n − 1 satır 0, yalnızca son (n. satır) F(x) / aₙ(x) (standart formda F(x))',
          'Bütün satırlar F(x)',
          'İlk satır F(x), diğer n − 1 satır 0'
        ],
        [
          'The first n − 1 rows are 0, and only the last (n-th) row is F(x) / aₙ(x) (or F(x) in standard form)',
          'All rows equal F(x)',
          'The first row is F(x) and the remaining n − 1 rows are 0'
        ]
      ),
      answer: 0,
      feedback: text(
        'İlk n − 1 türevde cᵢ′ terimlerini sıfırlayan yardımcı koşullar seçilir; böylece n. türev denkleme konulduğunda yalnız son satırda F(x)/aₙ(x) kalır. Baş katsayı aₙ(x) ≠ 1 ise bölmeyi unutmamak kritiktir.',
        'The first n − 1 auxiliary conditions set the sums of cᵢ′ terms to zero, leaving F(x)/aₙ(x) exclusively in the n-th equation. Never forget to divide by the leading coefficient aₙ(x)!'
      ),
      hints: text(
        ['Yardımcı koşullar yüksek türevlerin (cᵢ″ vb.) doğmasını nasıl engeller?', 'Denklem yalnızca en yüksek türev adımında sağ taraf F(x)’e eşitlenir.'],
        ['How do the auxiliary conditions prevent higher derivatives (like cᵢ″) from appearing?', 'The ODE itself is matched only at the n-th derivative step.']
      )
    },
    ...extraQuestions
  ]
};
