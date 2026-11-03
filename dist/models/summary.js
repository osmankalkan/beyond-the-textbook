/** Pure diagnostic catalog and evaluation model for §2.7 method selection synthesis. */

export const METHODS = [
  { id: 'separable', name: { tr: 'Değişkenleri Ayırma', en: 'Separation of Variables' }, section: '2.1', badge: '§2.1', formula: "y' = f(x)g(y)" },
  { id: 'homogeneous', name: { tr: 'Homojen Denklem', en: 'Homogeneous Equation' }, section: '2.2', badge: '§2.2', formula: "y' = f(y/x)" },
  { id: 'linear', name: { tr: 'Birinci Mertebe Doğrusal', en: 'First-Order Linear' }, section: '2.4', badge: '§2.4', formula: "y' + P(x)y = Q(x)" },
  { id: 'bernoulli', name: { tr: 'Bernoulli Denklemi', en: 'Bernoulli Equation' }, section: '2.4', badge: '§2.4', formula: "y' + P(x)y = Q(x)yⁿ" },
  { id: 'exact', name: { tr: 'Tam Diferansiyel', en: 'Exact Equation' }, section: '2.3', badge: '§2.3', formula: 'M dx + N dy = 0, M_y = N_x' },
  { id: 'integrating-factor', name: { tr: 'İntegral Çarpanı', en: 'Integrating Factor' }, section: '2.3', badge: '§2.3', formula: 'μ(x) veya μ(y)' },
  { id: 'solvable-x', name: { tr: 'x veya y İçin Çözülebilen', en: 'Solvable for x or y' }, section: '2.5', badge: '§2.5', formula: 'x = g(y, p) veya y = f(x, p)' },
  { id: 'clairaut', name: { tr: 'Clairaut Denklemi', en: 'Clairaut Equation' }, section: '2.5', badge: '§2.5', formula: 'y = xp + f(p)' },
  { id: 'immediate', name: { tr: 'Hemen İntegrallenebilen', en: 'Directly Integrable' }, section: '2.6', badge: '§2.6', formula: 'y^{(n)} = f(x)' },
  { id: 'missing-x', name: { tr: 'Mertebe İndirgeme (x/y yok)', en: 'Order Reduction (missing x/y)' }, section: '2.6', badge: '§2.6', formula: "y'' = u du/dy veya u = y^{(k)}" }
];

export const CHALLENGE_CARDS = [
  {
    id: 'card-1',
    equation: "y' = x²(1 + y²)",
    order: 1,
    isLinear: false,
    correctMethod: 'separable',
    tag: 'AYRILABİLİR / SEPARABLE',
    firstMove: {
      tr: 'dy / (1 + y²) = x² dx biçiminde değişkenleri ayır.',
      en: 'Separate variables as dy / (1 + y²) = x² dx.'
    },
    reducedForm: {
      tr: 'arctan y = x³/3 + C  ⇒  y = tan(x³/3 + C)',
      en: 'arctan y = x³/3 + C  ⇒  y = tan(x³/3 + C)'
    },
    trap: {
      tr: '1 + y² > 0 olduğundan sıfıra bölme yoktur; ancak tanjantın düşey asimptotları çözümün tanım aralığını sınırlar.',
      en: 'Since 1 + y² > 0 there is no division by zero; however, vertical poles of tangent bound the interval of validity.'
    },
    why: {
      tr: 'Denklem doğrudan f(x) · g(y) çarpımıdır. Hiçbir dönüşüme gerek kalmadan doğrudan integre edilir.',
      en: 'The equation factors directly into f(x) · g(y). It integrates immediately with no substitution needed.'
    }
  },
  {
    id: 'card-2',
    equation: "y' = (x + y) / (x − y)",
    order: 1,
    isLinear: false,
    correctMethod: 'homogeneous',
    tag: 'HOMOJEN / HOMOGENEOUS',
    firstMove: {
      tr: 'Pay ve paydayı x’e bölerek v = y/x değişkenine geç: y′ = (1 + v)/(1 − v).',
      en: 'Divide numerator and denominator by x and set v = y/x: y′ = (1 + v)/(1 − v).'
    },
    reducedForm: {
      tr: 'v + x dv/dx = (1 + v)/(1 − v)  ⇒  (1 − v)/(1 + v²) dv = dx / x',
      en: 'v + x dv/dx = (1 + v)/(1 − v)  ⇒  (1 − v)/(1 + v²) dv = dx / x'
    },
    trap: {
      tr: 'x = 0 noktası tanımsızdır. İntegral arctan(y/x) − ½ ln(x² + y²) = C kapalı eğri ailesini verir.',
      en: 'The point x = 0 is excluded. Integration yields implicit curves arctan(y/x) − ½ ln(x² + y²) = C.'
    },
    why: {
      tr: 'Pay ve paydadaki tüm terimler 1. derecedendir. Denklem y′ = f(y/x) homojen yapısındadır.',
      en: 'All terms in numerator and denominator are of degree 1. The ODE matches the homogeneous form y′ = f(y/x).'
    }
  },
  {
    id: 'card-3',
    equation: "y' + (2/x)y = x³",
    order: 1,
    isLinear: true,
    correctMethod: 'linear',
    tag: 'DOĞRUSAL / LINEAR',
    firstMove: {
      tr: 'P(x) = 2/x için integral çarpanını bul: μ(x) = exp(∫ 2/x dx) = x².',
      en: 'Find integrating factor for P(x) = 2/x: μ(x) = exp(∫ 2/x dx) = x².'
    },
    reducedForm: {
      tr: '(x² y)′ = x⁵  ⇒  x² y = x⁶/6 + C  ⇒  y = x⁴/6 + C/x²',
      en: '(x² y)′ = x⁵  ⇒  x² y = x⁶/6 + C  ⇒  y = x⁴/6 + C/x²'
    },
    trap: {
      tr: 'x = 0 noktasında kutup vardır; çözüm x > 0 veya x < 0 aralıklarından birinde tanımlıdır.',
      en: 'A pole exists at x = 0; the solution is restricted to either x > 0 or x < 0.'
    },
    why: {
      tr: 'y ve türevi y′ birinci kuvvettedir; katsayılar yalnız x’e bağlıdır. Standart doğrusal yapı.',
      en: 'y and its derivative y′ appear to the first power; coefficients depend only on x. Standard linear ODE.'
    }
  },
  {
    id: 'card-4',
    equation: "y' + (1/x)y = y³",
    order: 1,
    isLinear: false,
    correctMethod: 'bernoulli',
    tag: 'BERNOULLI',
    firstMove: {
      tr: 'Her terimi y³’e böl ve u = y^{1−3} = y^{−2} dönüşümü yap.',
      en: 'Divide by y³ and set u = y^{1−3} = y^{−2}.'
    },
    reducedForm: {
      tr: "u' − (2/x)u = −2 (u için birinci mertebe doğrusal denklem)",
      en: "u' − (2/x)u = −2 (first-order linear equation for u)"
    },
    trap: {
      tr: 'y = 0 aşikar çözümdür; y³’e bölerken bu dalı kaybetme.',
      en: 'y = 0 is a genuine solution; do not lose this branch when dividing by y³.'
    },
    why: {
      tr: 'y′ + P(x)y = Q(x)yⁿ yapısındadır (n=3). u = y^{1−n} dönüşümü onu her zaman doğrusala çevirir.',
      en: 'Matches the form y′ + P(x)y = Q(x)yⁿ with n=3. The substitution u = y^{1−n} converts it to linear.'
    }
  },
  {
    id: 'card-5',
    equation: '(2x + y) dx + (x + 2y) dy = 0',
    order: 1,
    isLinear: false,
    correctMethod: 'exact',
    tag: 'TAM / EXACT',
    firstMove: {
      tr: 'Tamlık testi: ∂M/∂y = 1 ve ∂N/∂x = 1 eşitliğini doğrula.',
      en: 'Exactness test: verify that ∂M/∂y = 1 and ∂N/∂x = 1 are identical.'
    },
    reducedForm: {
      tr: 'Potansiyel u(x,y) = x² + xy + y² = C düzey eğrileri.',
      en: 'Potential level curves u(x,y) = x² + xy + y² = C.'
    },
    trap: {
      tr: 'İntegral sabitini unutma; potansiyel fonksiyonunun kendisi değil, u(x,y)=C düzey eğrisi çözümdür.',
      en: 'Do not forget the constant C; the level curve u(x,y)=C is the solution, not the potential itself.'
    },
    why: {
      tr: 'M_y = N_x tam olarak sağlandığı için hiçbir çarpana gerek kalmadan doğrudan potansiyel kurulur.',
      en: 'Because M_y = N_x holds identically, a potential function is integrated directly without any multiplier.'
    }
  },
  {
    id: 'card-6',
    equation: 'y dx − x dy = 0',
    order: 1,
    isLinear: false,
    correctMethod: 'integrating-factor',
    tag: 'İNTEGRAL ÇARPANI / INTEGRATING FACTOR',
    firstMove: {
      tr: 'M_y = 1 ≠ N_x = −1 (tam değil). μ = 1/y² veya 1/x² çarpanı ile çarp.',
      en: 'M_y = 1 ≠ N_x = −1 (not exact). Multiply by μ = 1/y² or 1/x².'
    },
    reducedForm: {
      tr: 'd(x/y) = 0  ⇒  x/y = C  ⇒  x = Cy (veya y = Cx)',
      en: 'd(x/y) = 0  ⇒  x/y = C  ⇒  x = Cy (or y = Cx)'
    },
    trap: {
      tr: 'μ = 1/y² çarpanı y = 0 doğrusunu dışlar; y = 0 dalı ayrıca kontrol edilmeli ve çözüme katılmalıdır.',
      en: 'The factor μ = 1/y² excludes y = 0; the branch y = 0 must be verified and retained.'
    },
    why: {
      tr: 'Denklem tam değildir ama klasik d(x/y) veya d(y/x) oran diferansiyeli çarpanıyla hemen tam hale gelir.',
      en: 'Not exact initially, but quickly exacted via the classic quotient differential multipliers 1/y² or 1/x².'
    }
  },
  {
    id: 'card-7',
    equation: 'x = p + p⁴   (p = y′)',
    order: 1,
    isLinear: false,
    correctMethod: 'solvable-x',
    tag: 'x İÇİN ÇÖZÜLEBİLEN / SOLVABLE FOR x',
    firstMove: {
      tr: 'x = g(p) biçiminde x için çözülmüştür. y’ye göre türet: dx/dy = 1/p = (1 + 4p³) dp/dy.',
      en: 'Already isolated as x = g(p). Differentiate w.r.t. y: dx/dy = 1/p = (1 + 4p³) dp/dy.'
    },
    reducedForm: {
      tr: 'dy = (p + 4p⁴) dp  ⇒  y = p²/2 + 4p⁵/5 + C (parametrik çözüm)',
      en: 'dy = (p + 4p⁴) dp  ⇒  y = p²/2 + 4p⁵/5 + C (parametric solution)'
    },
    trap: {
      tr: 'p parametresini cebirsel olarak yok etmeye çalışma; çözüm x(p) ve y(p) olarak parametrik kalmalıdır.',
      en: 'Do not attempt algebraic elimination of p; the solution remains parametric in x(p) and y(p).'
    },
    why: {
      tr: 'Denklem x için çözülmüş açık formdadır (x = g(p)). dx/dy = 1/p türev zinciri denklemi doğrudan p ile y arasında ayrılabilir yapar.',
      en: 'The equation is explicitly solved for x (x = g(p)). The chain rule dx/dy = 1/p separates p and y directly.'
    }
  },
  {
    id: 'card-8',
    equation: 'y = xp + p²   (p = y′)',
    order: 1,
    isLinear: false,
    correctMethod: 'clairaut',
    tag: 'CLAIRAUT',
    firstMove: {
      tr: "x’e göre türev al: p = p + (x + 2p) p'  ⇒  (x + 2p) dp/dx = 0.",
      en: "Differentiate w.r.t. x: p = p + (x + 2p) p'  ⇒  (x + 2p) dp/dx = 0."
    },
    reducedForm: {
      tr: 'Doğru ailesi y = Cx + C² ve tekil zarf y = −x²/4.',
      en: 'Line family y = Cx + C² and singular envelope y = −x²/4.'
    },
    trap: {
      tr: 'dp/dx = 0 dalındaki doğruları yazıp x + 2p = 0 dalındaki tekil zarfı unutmak en sık hatadır.',
      en: 'Writing only the lines from dp/dx = 0 and omitting the singular envelope from x + 2p = 0 is the primary trap.'
    },
    why: {
      tr: 'y = xp + f(p) Clairaut formundadır. x’e göre türev alındığında p sadeleşir ve çarpanlara ayrılır.',
      en: 'Matches the Clairaut form y = xp + f(p). Differentiating w.r.t. x cancels p and factors immediately.'
    }
  },
  {
    id: 'card-9',
    equation: 'y‴ = eˣ',
    order: 3,
    isLinear: true,
    correctMethod: 'immediate',
    tag: 'HEMEN İNTEGRALLENEN / DIRECTLY INTEGRABLE',
    firstMove: {
      tr: 'Sağ taraf yalnız x’e bağlı olduğundan doğrudan 3 kez ardışık integral al.',
      en: 'Since the RHS depends only on x, integrate directly 3 times consecutively.'
    },
    reducedForm: {
      tr: 'y = eˣ + C₂ x² + C₁ x + C₀',
      en: 'y = eˣ + C₂ x² + C₁ x + C₀'
    },
    trap: {
      tr: 'Üç integralin her birinde bir sabit eklememek; polinom sabitleri C₂x² + C₁x + C₀ eksiksiz olmalıdır.',
      en: 'Failing to add a constant at each stage; the polynomial terms C₂x² + C₁x + C₀ must be complete.'
    },
    why: {
      tr: 'En yüksek türev y‴ yalnız x’e bağlı bir fonksiyona eşittir. Hiçbir ara dönüşüme ihtiyaç yoktur.',
      en: 'The highest derivative y‴ equals a function purely of x. No auxiliary substitution is needed.'
    }
  },
  {
    id: 'card-10',
    equation: "y y'' = (y′)²",
    order: 2,
    isLinear: false,
    correctMethod: 'missing-x',
    tag: 'x EKSİK / MISSING x',
    firstMove: {
      tr: "x açıkça yoktur. y’yi bağımsız değişken yap: u = y′ ve y″ = u du/dy.",
      en: "x is absent. Make y the independent variable: u = y′ and y″ = u du/dy."
    },
    reducedForm: {
      tr: 'y u du/dy = u²  ⇒  u = 0 (y = C) veya du/u = dy/y  ⇒  y = C₂ e^{C₁ x}',
      en: 'y u du/dy = u²  ⇒  u = 0 (y = C) or du/u = dy/y  ⇒  y = C₂ e^{C₁ x}'
    },
    trap: {
      tr: 'u = 0 dalını atlayarak y = C sabit çözümlerini kaçırmak.',
      en: 'Omitting the u = 0 branch and losing the constant solutions y = C.'
    },
    why: {
      tr: 'Bağımsız değişken x açıkça denklemde yer almaz. y″ = u du/dy dönüşümü denklemi birinci mertebeye indirir.',
      en: 'The independent variable x is absent. Setting y″ = u du/dy reduces the ODE to first order.'
    }
  }
];

export function evaluateDiagnostic(cardId, selectedMethodId) {
  const card = CHALLENGE_CARDS.find(c => c.id === cardId);
  if (!card) throw new RangeError(`Unknown card: ${cardId}`);
  const isCorrect = card.correctMethod === selectedMethodId;
  const method = METHODS.find(m => m.id === selectedMethodId);
  const correctMethod = METHODS.find(m => m.id === card.correctMethod);

  return {
    isCorrect,
    selectedMethod: method,
    correctMethod,
    firstMove: card.firstMove,
    reducedForm: card.reducedForm,
    trap: card.trap,
    why: card.why
  };
}
