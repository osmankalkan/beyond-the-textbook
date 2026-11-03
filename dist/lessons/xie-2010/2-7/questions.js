export const extraQuestions = [
  {
    title: { tr: 'Ters türev ve doğrusallık', en: 'Reciprocal derivative and linearity' },
    tag: 'STRATEJİ / STRATEGY',
    text: {
      tr: 'y dx + (x² y − x) dy = 0 denkleminde dy/dx doğrusal değilken dx/dy neden tercih edilir?',
      en: 'In y dx + (x² y − x) dy = 0, why is dx/dy preferred when dy/dx is nonlinear?'
    },
    choices: {
      tr: ['dx/dy = (x − x² y)/y ile denklem x’e göre Bernoulli denklemine dönüşür', 'Denklem doğrudan tam hale gelir', 'Değişkenler kendiliğinden ayrılır'],
      en: ['dx/dy = (x − x² y)/y turns the ODE into Bernoulli in x', 'The equation becomes directly exact', 'Variables automatically separate']
    },
    answer: 0,
    feedback: {
      tr: 'dx/dy = (1/y)x − x² yazıldığında dx/dy − (1/y)x = −x² elde edilir; bu x’e göre n=2 Bernoulli denklemidir. Değişkenlerin rolünü ters çevirmek çözülemeyen yapıları açar.',
      en: 'Writing dx/dy = (1/y)x − x² gives dx/dy − (1/y)x = −x², which is Bernoulli in x with n=2. Inverting variable roles unlocks difficult equations.'
    },
    hints: {
      tr: ['dy/dx paydasında toplama işlemi varken tersini almayı dene.', 'x terimlerinin kuvvetlerine bak.'],
      en: ['Try reciprocating when the denominator of dy/dx contains a sum.', 'Look at the powers of x.']
    }
  },
  {
    title: { tr: 'Mertebe ve kuvvet ayrımı', en: 'Order versus power distinction' },
    tag: 'KAVRAM / CONCEPT',
    text: {
      tr: '(y″)² + 5 (y′)⁴ = x³ denkleminin mertebesi ve derecesi sırasıyla kaçtır?',
      en: 'What are the order and degree of (y″)² + 5 (y′)⁴ = x³ respectively?'
    },
    choices: {
      tr: ['Mertebe 2, derece 2', 'Mertebe 4, derece 2', 'Mertebe 2, derece 4'],
      en: ['Order 2, degree 2', 'Order 4, degree 2', 'Order 2, degree 4']
    },
    answer: 0,
    feedback: {
      tr: 'En yüksek türev y″ olduğundan mertebe 2’dir. En yüksek türevin üssü 2 olduğundan derece 2’dir. (y′)⁴ terimindeki 4 kuvveti mertebeyi değil, yalnız doğrusallığı etkiler.',
      en: 'The highest derivative is y″, so the order is 2. Its exponent is 2, so the degree is 2. The 4th power on (y′) affects nonlinearity, not order.'
    },
    hints: {
      tr: ['En yüksek türev kaç çizgilidir?', 'Bu en yüksek türevin üssü kaçtır?'],
      en: ['How many primes does the highest derivative have?', 'What is the exponent of this highest derivative?']
    }
  },
  {
    title: { tr: 'Tek değişkenli çarpan şartı', en: 'Single-variable multiplier condition' },
    tag: 'İNTEGRAL ÇARPANI / INTEGRATING FACTOR',
    text: {
      tr: 'M dx + N dy = 0 denkleminde (M_y − N_x) / N ifadesi yalnız x’e bağlıysa integral çarpanı nedir?',
      en: 'In M dx + N dy = 0, if (M_y − N_x) / N depends solely on x, what is the integrating factor?'
    },
    choices: {
      tr: ['μ(x) = exp(∫ [(M_y − N_x)/N] dx)', 'μ(y) = exp(∫ [(N_x − M_y)/M] dy)', 'μ(x) = (M_y − N_x)/N'],
      en: ['μ(x) = exp(∫ [(M_y − N_x)/N] dx)', 'μ(y) = exp(∫ [(N_x − M_y)/M] dy)', 'μ(x) = (M_y − N_x)/N']
    },
    answer: 0,
    feedback: {
      tr: 'Standart teorem gereği (M_y − N_x)/N = f(x) ise μ(x) = exp(∫ f(x) dx) bir integral çarpanıdır ve denklemi tek adımda tam yapar.',
      en: 'By standard theorem, if (M_y − N_x)/N = f(x), then μ(x) = exp(∫ f(x) dx) is an integrating factor that renders the ODE exact.'
    },
    hints: {
      tr: ['Paydada N varsa çarpan hangi değişkene bağlıdır?', 'Üstel integral formülünü hatırla.'],
      en: ['If N is in the denominator, which variable does the factor depend on?', 'Recall the exponential integral formula.']
    }
  },
  {
    title: { tr: 'Clairaut zarfının niteliği', en: 'Nature of the Clairaut envelope' },
    tag: 'CLAIRAUT',
    text: {
      tr: 'y = xp + f(p) Clairaut denkleminin tekil zarf çözümü hakkında hangisi doğrudur?',
      en: 'Which statement is correct regarding the singular envelope of the Clairaut equation y = xp + f(p)?'
    },
    choices: {
      tr: ['Genel doğru ailesine her noktada teğettir ve hiçbir C değeriyle elde edilemez', 'C = 0 konularak genel aileden elde edilir', 'Yalnızca bir başlangıç noktası tanımlar, eğri değildir'],
      en: ['It is tangent to the line family at every point and cannot be obtained for any C', 'It is obtained from the general family by setting C = 0', 'It defines only a single point, not a curve']
    },
    answer: 0,
    feedback: {
      tr: 'Tekil çözüm (zarf), doğru ailesinin her üyesine teğet olan geometrik sınırdır. Hiçbir C sabiti bu zarfı veremez; bu nedenle genel çözümden ayrı bir dal olarak sunulur.',
      en: 'The singular solution (envelope) is the geometric boundary tangent to every member of the line family. No constant C yields it, so it must be stated separately.'
    },
    hints: {
      tr: ['Zarf ile doğru ailesi arasındaki geometrik ilişki nedir?', 'Genel ailedeki C parametresi zarfı kapsayabilir mi?'],
      en: ['What is the geometric relationship between the envelope and the lines?', 'Can any C parameter in the line family reproduce the envelope?']
    }
  }
];
