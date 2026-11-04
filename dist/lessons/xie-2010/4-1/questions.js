export const extraQuestions = [
  {
    title: { tr: 'L[e^{3x}] hesabı', en: 'Computing L[e^{3x}]' },
    tag: 'HESAP / COMPUTATION',
    text: {
      tr: 'L=D²−3D+2 için L[e^{3x}] nedir?',
      en: 'For L=D²−3D+2, what is L[e^{3x}]?'
    },
    choices: {
      tr: ['2e^{3x}', '0', '6e^{3x}'],
      en: ['2e^{3x}', '0', '6e^{3x}']
    },
    answer: 0,
    feedback: {
      tr: 'e^{3x} için y′=3e^{3x} ve y″=9e^{3x}. Katsayılarla: 9−9+2=2, yani L[e^{3x}]=2e^{3x}. Bu yüzden e^{3x}/2 özel çözümdür.',
      en: 'For e^{3x}, y′=3e^{3x} and y″=9e^{3x}. With the coefficients: 9−9+2=2, so L[e^{3x}]=2e^{3x}. Hence e^{3x}/2 is a particular solution.'
    },
    hints: {
      tr: ['e^{3x} türev alındıkça 3 çarpanı kazanır.', 'Katsayı toplamı 1−3+2 değil; türevlerden gelen 9 ve 3 var.'],
      en: ['Each derivative of e^{3x} gains a factor of 3.', 'The coefficient sum is not 1−3+2; the derivatives contribute 9 and 3.']
    }
  },
  {
    title: { tr: 'Genel çözümün yapısı', en: 'Structure of the general solution' },
    tag: 'KAVRAM / CONCEPT',
    text: {
      tr: 'L[y]=e^{3x}, y_P=e^{3x}/2 ve y_C=C₁e^x+C₂e^{2x} ise genel çözüm hangisidir?',
      en: 'If L[y]=e^{3x}, y_P=e^{3x}/2 and y_C=C₁e^x+C₂e^{2x}, what is the general solution?'
    },
    choices: {
      tr: ['y=e^{3x}/2+C₁e^x+C₂e^{2x}', 'y=C₁e^x+C₂e^{2x}', 'y=e^{3x}/2+C'],
      en: ['y=e^{3x}/2+C₁e^x+C₂e^{2x}', 'y=C₁e^x+C₂e^{2x}', 'y=e^{3x}/2+C']
    },
    answer: 0,
    feedback: {
      tr: 'Temel teorem y=y_C+y_P der. İkinci mertebe olduğu için iki bağımsız sabit gerekir; ikisi de y_C’dedir, y_P’ye sabit eklenmez.',
      en: 'The fundamental theorem gives y=y_C+y_P. Since the order is two, two independent constants are needed; both live in y_C, and no constant is added to y_P.'
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
      tr: 'y″+xy′+y=cos x denklemi neden doğrusaldır?',
      en: 'Why is y″+xy′+y=cos x linear?'
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
      tr: 'D=d/dx için D(xy) aşağıdakilerden hangisine eşittir?',
      en: 'For D=d/dx, which expression equals D(xy)?'
    },
    choices: {
      tr: ['xy′+y', 'xy′', 'x′y′'],
      en: ['xy′+y', 'xy′', 'x′y′']
    },
    answer: 0,
    feedback: {
      tr: 'Çarpım kuralı: D(xy)=x′y+xy′=y+xy′. xDy ise yalnız xy′ olur; bu yüzden Dx≠xD. Değişken katsayılı operatörü açarken bu fark kritiktir.',
      en: 'Product rule: D(xy)=x′y+xy′=y+xy′. But xDy is just xy′, so Dx≠xD. This distinction is critical when expanding a variable-coefficient operator.'
    },
    hints: {
      tr: ['Çarpım kuralını uygula.', 'D hem x’e hem y’ye etki eder mi?'],
      en: ['Apply the product rule.', 'Does D act on both x and y?']
    }
  }
];
