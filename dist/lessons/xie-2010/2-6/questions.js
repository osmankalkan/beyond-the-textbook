export const extraQuestions = [
  {
    title: { tr: 'Örnek 2.40: sabitlerin sayısı', en: 'Example 2.40: number of constants' },
    tag: 'ÖRNEK 2.40 / EXAMPLE 2.40',
    text: {
      tr: 'x² y‴ = 120x³ + 8x² e^{2x} + 1 denkleminin genel çözümünde kaç bağımsız sabit bulunmalıdır?',
      en: 'How many independent constants must the general solution of x² y‴ = 120x³ + 8x² e^{2x} + 1 contain?'
    },
    choices: {
      tr: ['3 bağımsız sabit (C₀, C₁, C₂)', '2 bağımsız sabit', '1 bağımsız sabit'],
      en: ['3 independent constants (C₀, C₁, C₂)', '2 independent constants', '1 independent constant']
    },
    answer: 0,
    feedback: {
      tr: 'Denklem 3. mertebedendir (y‴). Her integral bir serbest sabit eklediğinden genel çözüm tam olarak 3 bağımsız sabit içermelidir.',
      en: 'The equation is of 3rd order (y‴). Because each integration introduces an arbitrary constant, the general solution must have exactly 3 independent constants.'
    },
    hints: {
      tr: ['En yüksek türev kaçıncı mertebeden?', 'Mertebe sayısı ile bağımsız sabit sayısı arasındaki temel teorem ne der?'],
      en: ['What is the order of the highest derivative?', 'What does the fundamental theorem say about the order and the number of arbitrary constants?']
    }
  },
  {
    title: { tr: 'Örnek 2.41: başlangıç verisi sırası', en: 'Example 2.41: order of initial data' },
    tag: 'ÖRNEK 2.41 / EXAMPLE 2.41',
    text: {
      tr: 'e^{−x} y″ − sin x = 2, y(0)=1, y′(0)=1 denkleminde y′(0)=1 koşulu ne zaman uygulanmalıdır?',
      en: 'In e^{−x} y″ − sin x = 2, y(0)=1, y′(0)=1, when should the condition y′(0)=1 be applied?'
    },
    choices: {
      tr: ['Birinci integralden hemen sonra (y′ ifadesinde)', 'İkinci integralden sonra (y ifadesinde)', 'En başta türev alarak'],
      en: ['Immediately after the first integration (in the y′ expression)', 'After the second integration (in the y expression)', 'At the very beginning by differentiating']
    },
    answer: 0,
    feedback: {
      tr: 'y′(0)=1 doğrudan birinci türevin koşuludur. Birinci integralden sonra uygulanması C₁ sabitini hemen belirler ve ikinci integraldeki işlem yükünü azaltır.',
      en: 'y′(0)=1 is the condition on the first derivative. Applying it right after the first integral fixes C₁ immediately and simplifies the subsequent work.'
    },
    hints: {
      tr: ['Koşul y′ türevine mi yoksa y fonksiyonuna mı ait?', 'C₁ sabitini erkenden sayıya çevirmek ikinci integrali kolaylaştırır mı?'],
      en: ['Does the condition belong to y′ or to y?', 'Does evaluating C₁ early simplify the second integration?']
    }
  },
  {
    title: { tr: 'Örnek 2.43: u=0 dalı', en: 'Example 2.43: the u=0 branch' },
    tag: 'ÖRNEK 2.43 / EXAMPLE 2.43',
    text: {
      tr: 'x y″ − y′ − (y′)³ = 0 denkleminde u=0 seçimi hangi çözümü üretir?',
      en: 'In x y″ − y′ − (y′)³ = 0, what solution does the choice u=0 produce?'
    },
    choices: {
      tr: ['y = C yatay doğru ailesi', 'x² + y² = 0 noktası', 'Yalnız y = 0'],
      en: ['y = C horizontal line family', 'The point x² + y² = 0', 'Only y = 0']
    },
    answer: 0,
    feedback: {
      tr: 'u = y′ = 0 ise dy/dx = 0 olur; integre edilince y = C sabit doğru ailesi çıkar. Bu aile daire ailesinin yarıçapı sıfır yapılarak elde edilemez.',
      en: 'If u = y′ = 0 then dy/dx = 0; integrating gives y = C lines. This cannot be obtained from the circle family by setting the radius to zero.'
    },
    hints: {
      tr: ['Türevi sıfır olan fonksiyon nedir?', 'y′ = 0 denkleminin integrali ne verir?'],
      en: ['What function has a zero derivative?', 'What does integrating y′ = 0 yield?']
    }
  },
  {
    title: { tr: 'Örnek 2.45: x yokken türev zinciri', en: 'Example 2.45: chain rule when x is absent' },
    tag: 'ÖRNEK 2.45 / EXAMPLE 2.45',
    text: {
      tr: 'Bağımsız değişken x denklemde yer almıyorsa y″ türevi y ve u=y′ cinsinden nasıl yazılır?',
      en: 'When the independent variable x is absent, how is y″ expressed in terms of y and u=y′?'
    },
    choices: {
      tr: ['y″ = u du/dy', 'y″ = du/dx', 'y″ = u² du/dy'],
      en: ['y″ = u du/dy', 'y″ = du/dx', 'y″ = u² du/dy']
    },
    answer: 0,
    feedback: {
      tr: 'Zincir kuralı gereği: dy′/dx = (du/dy)(dy/dx) = u du/dy. Bu dönüşüm x’i denklemden tamamen çıkarır.',
      en: 'By the chain rule: dy′/dx = (du/dy)(dy/dx) = u du/dy. This eliminates x entirely from the equation.'
    },
    hints: {
      tr: ['Yeni bağımsız değişken y olduğunda zincir kuralı nasıl yazılır?', 'dy/dx = u olduğunu hatırla.'],
      en: ['How is the chain rule written when y is the new independent variable?', 'Recall that dy/dx = u.']
    }
  }
];
