export const extraQuestions = [
  {
    title: { tr: 'L[e³ˣ] hesabı', en: 'Computing L[e³ˣ]' },
    tag: 'HESAP / COMPUTATION',
    text: {
      tr: 'L = D² − 3D + 2 için L[e³ˣ] nedir?',
      en: 'For L = D² − 3D + 2, what is L[e³ˣ]?'
    },
    choices: {
      tr: ['2e³ˣ', '0', '6e³ˣ'],
      en: ['2e³ˣ', '0', '6e³ˣ']
    },
    answer: 0,
    feedback: {
      tr: 'e³ˣ için y′ = 3e³ˣ ve y″ = 9e³ˣ. Katsayılarla: 9 − 9 + 2 = 2, yani L[e³ˣ] = 2e³ˣ. Bu yüzden ½ e³ˣ özel çözümdür.',
      en: 'For e³ˣ, y′ = 3e³ˣ and y″ = 9e³ˣ. With the coefficients: 9 − 9 + 2 = 2, so L[e³ˣ] = 2e³ˣ. Hence ½ e³ˣ is a particular solution.'
    },
    hints: {
      tr: ['e³ˣ türev alındıkça 3 çarpanı kazanır.', 'Katsayı toplamı 1 − 3 + 2 değil; türevlerden gelen 9 ve 3 var.'],
      en: ['Each derivative of e³ˣ gains a factor of 3.', 'The coefficient sum is not 1 − 3 + 2; the derivatives contribute 9 and 3.']
    }
  },
  {
    title: { tr: 'Genel çözümün yapısı', en: 'Structure of the general solution' },
    tag: 'KAVRAM / CONCEPT',
    text: {
      tr: 'L[y] = e³ˣ, y_P = ½ e³ˣ ve y_C = C₁ eˣ + C₂ e²ˣ ise genel çözüm hangisidir?',
      en: 'If L[y] = e³ˣ, y_P = ½ e³ˣ and y_C = C₁ eˣ + C₂ e²ˣ, what is the general solution?'
    },
    choices: {
      tr: ['y = ½ e³ˣ + C₁ eˣ + C₂ e²ˣ', 'y = C₁ eˣ + C₂ e²ˣ', 'y = ½ e³ˣ + C'],
      en: ['y = ½ e³ˣ + C₁ eˣ + C₂ e²ˣ', 'y = C₁ eˣ + C₂ e²ˣ', 'y = ½ e³ˣ + C']
    },
    answer: 0,
    feedback: {
      tr: 'Temel teorem y = y_C + y_P der. İkinci mertebe olduğu için iki bağımsız sabit gerekir; ikisi de y_C’dedir, y_P’ye sabit eklenmez.',
      en: 'The fundamental theorem gives y = y_C + y_P. Since the order is two, two independent constants are needed; both live in y_C, and no constant is added to y_P.'
    },
    hints: {
      tr: ['Özel ve tamamlayıcı parçayı topla.', 'Kaç bağımsız sabit bekleniyor?'],
      en: ['Add the particular and complementary parts.', 'How many independent constants are expected?']
    }
  },
  {
    title: { tr: 'Sağ taraf ve doğrusallık', en: 'The right side and linearity' },
    tag: 'KAVRAM / CONCEPT',
    text: {
      tr: 'y″ + xy′ + y = cos x denklemi neden doğrusaldır?',
      en: 'Why is y″ + xy′ + y = cos x linear?'
    },
    choices: {
      tr: ['Sağ taraf yalnız x’e bağlıdır; doğrusallık y’ye göre tanımlanır', 'cos x doğrusal bir fonksiyon olduğu için', 'x katsayısı sabit olduğu için'],
      en: ['The right side depends only on x; linearity is defined with respect to y', 'Because cos x is a linear function', 'Because the coefficient x is constant']
    },
    answer: 0,
    feedback: {
      tr: 'Doğrusallık, bilinmeyen y ve türevlerinin denklemde birinci kuvvette görünmesiyle ilgilidir. cos x yalnız x’e bağlı olduğundan y’ye göre doğrusaldır; x katsayısının değişken olması da sorun değildir.',
      en: 'Linearity concerns the unknown y and its derivatives appearing to the first power. Since cos x depends only on x, the equation is linear in y; a variable coefficient x is also allowed.'
    },
    hints: {
      tr: ['Doğrusallık hangi değişkene göre tanımlanır?', 'cos x içinde y var mı?'],
      en: ['With respect to which variable is linearity defined?', 'Does cos x contain y?']
    }
  },
  {
    title: { tr: 'Değişken katsayıda D sırası', en: 'Order of D with variable coefficients' },
    tag: 'TUZAK / TRAP',
    text: {
      tr: 'D = d/dx için D(xy) aşağıdakilerden hangisine eşittir?',
      en: 'For D = d/dx, which expression equals D(xy)?'
    },
    choices: {
      tr: ['xy′ + y', 'xy′', 'x′y′'],
      en: ['xy′ + y', 'xy′', 'x′y′']
    },
    answer: 0,
    feedback: {
      tr: 'Çarpım kuralı: D(xy) = x′y + xy′ = y + xy′. xDy ise yalnız xy′ olur; bu yüzden Dx ≠ xD. Değişken katsayılı operatörü açarken bu fark kritiktir.',
      en: 'Product rule: D(xy) = x′y + xy′ = y + xy′. But xDy is just xy′, so Dx ≠ xD. This distinction is critical when expanding a variable-coefficient operator.'
    },
    hints: {
      tr: ['Çarpım kuralını uygula.', 'D hem x’e hem y’ye etki eder mi?'],
      en: ['Apply the product rule.', 'Does D act on both x and y?']
    }
  }
];
