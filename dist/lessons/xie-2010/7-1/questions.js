export const systemsExtraQuestions = [
  {
    title: { tr: 'Sabit açısal hızda radyal denklem', en: 'Radial equation at constant angular speed' },
    tag: 'LİNEERLEŞTİRME / LINEARIZATION',
    text: {
      tr: 'θ˙ = ω sabit olduğunda kutupsal radyal hareket denklemi hangi lineer forma indirgenir?',
      en: 'When θ̇ = ω is constant, to which linear form does the polar radial equation reduce?'
    },
    choices: {
      tr: [
        'm r¨ − mω²r = F_r',
        'm r¨ + mω²r = F_r',
        'm r¨ = F_r'
      ],
      en: [
        'm r̈ − mω²r = F_r',
        'm r̈ + mω²r = F_r',
        'm r̈ = F_r'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'a_r = r¨ − rθ˙² ifadesinde θ˙ = ω yazıldığında m(r¨ − ω²r) = F_r elde edilir. Bu, r cinsinden lineer ikinci mertebe bir denklemdir; −mω²r terimi merkezcil etkidir.',
      en: 'Substituting θ̇ = ω into a_r = r̈ − rθ̇² gives m(r̈ − ω²r) = F_r. This is a linear second-order equation in r; the −mω²r term is the centripetal effect.'
    },
    hints: {
      tr: [
        'a_r tanımındaki rθ˙² teriminde θ˙ yerine ω yaz.',
        'Terimi denklemin diğer tarafına taşırken işaretini koru.'
      ],
      en: [
        'Replace θ̇ by ω in the rθ̇² term of a_r.',
        'Keep the sign when moving the term to the other side.'
      ]
    }
  },
  {
    title: { tr: 'Kesme binasında sınır koşulları', en: 'Boundary conditions for a shear building' },
    tag: 'SINIR KOŞULU / BOUNDARY CONDITION',
    text: {
      tr: 'n katlı kesme binasında zemin ve en üst kat için doğru sınır koşulları hangisidir?',
      en: 'Which boundary conditions are correct at the ground and the top floor of an n-story shear building?'
    },
    choices: {
      tr: [
        'x₀ = 0, c_{n+1} = 0, k_{n+1} = 0',
        'x_{n+1} = 0, c₀ = 0, k₀ = 0',
        'x₀ = 1, x_{n+1} = 1'
      ],
      en: [
        'x₀ = 0, c_{n+1} = 0, k_{n+1} = 0',
        'x_{n+1} = 0, c₀ = 0, k₀ = 0',
        'x₀ = 1, x_{n+1} = 1'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Zemin sabit olduğu için x₀ = 0 alınır. En üst katın üzerinde kolon bulunmadığından k_{n+1} = c_{n+1} = 0 olur. Bu koşullar K ve C matrislerinin tridiagonal kalmasını sağlar.',
      en: 'The ground is fixed, so x₀ = 0. No column exists above the top floor, so k_{n+1} = c_{n+1} = 0. These conditions keep K and C tridiagonal.'
    },
    hints: {
      tr: [
        'Zemin hareket ediyor mu?',
        'n. katın üstünde başka bir kat veya kolon var mı?'
      ],
      en: [
        'Does the ground move?',
        'Is there another floor or column above floor n?'
      ]
    }
  },
  {
    title: { tr: 'İki katlı binanın doğal frekansları', en: 'Natural frequencies of a two-story building' },
    tag: 'ÖZDEĞER / EIGENVALUE',
    text: {
      tr: 'm₁ = 2 kg, m₂ = 1 kg, k₁ = 4 N/m, k₂ = 2 N/m için doğal frekanslar hangileridir?',
      en: 'For m₁ = 2 kg, m₂ = 1 kg, k₁ = 4 N/m, k₂ = 2 N/m, what are the natural frequencies?'
    },
    choices: {
      tr: [
        'ω₁ = 1 rad/s, ω₂ = 2 rad/s',
        'ω₁ = 2 rad/s, ω₂ = 4 rad/s',
        'ω₁ = 1 rad/s, ω₂ = √2 rad/s'
      ],
      en: [
        'ω₁ = 1 rad/s, ω₂ = 2 rad/s',
        'ω₁ = 2 rad/s, ω₂ = 4 rad/s',
        'ω₁ = 1 rad/s, ω₂ = √2 rad/s'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Frekans denklemi m₁m₂ω⁴ − [(k₁+k₂)m₂ + k₂m₁]ω² + k₁k₂ = 0 olur. Değerler yerine konunca 2ω⁴ − 10ω² + 8 = 0, yani (ω² − 1)(ω² − 4) = 0 elde edilir. Pozitif kökler 1 ve 2 rad/s’dir.',
      en: 'The frequency equation is m₁m₂ω⁴ − [(k₁+k₂)m₂ + k₂m₁]ω² + k₁k₂ = 0. Substitution gives 2ω⁴ − 10ω² + 8 = 0, i.e. (ω² − 1)(ω² − 4) = 0. The positive roots are 1 and 2 rad/s.'
    },
    hints: {
      tr: [
        'Önce det(K − ω²M) = 0 denklemini kur.',
        'ω² için ikinci derece denklemi çöz, sonra karekök al.'
      ],
      en: [
        'First set up det(K − ω²M) = 0.',
        'Solve the quadratic in ω², then take square roots.'
      ]
    }
  },
  {
    title: { tr: 'Durum matrisinin sol alt bloğu', en: 'Lower-left block of the state matrix' },
    tag: 'DURUM UZAYI / STATE SPACE',
    text: {
      tr: 'y = [x₁, x₂, ẋ₁, ẋ₂]ᵀ sırasıyla kurulan iki katlı sistemde A durum matrisinin sol alt bloğu nedir?',
      en: 'For the two-story system with state ordering y = [x₁, x₂, ẋ₁, ẋ₂]ᵀ, what is the lower-left block of the state matrix A?'
    },
    choices: {
      tr: [
        '−M⁻¹K',
        'M⁻¹K',
        '−M⁻¹C'
      ],
      en: [
        '−M⁻¹K',
        'M⁻¹K',
        '−M⁻¹C'
      ]
    },
    answer: 0,
    feedback: {
      tr: 'Durum denklemi y˙ = A y + B F yazıldığında ivme satırları −M⁻¹K x − M⁻¹C v + M⁻¹F olur. Konum teriminin katsayısı −M⁻¹K, hız teriminin katsayısı −M⁻¹C’dir. Sorulan sol alt blok −M⁻¹K’dır.',
      en: 'Writing ẏ = A y + B F gives acceleration rows −M⁻¹K x − M⁻¹C v + M⁻¹F. The position coefficient is −M⁻¹K and the velocity coefficient is −M⁻¹C. The lower-left block is −M⁻¹K.'
    },
    hints: {
      tr: [
        'M x¨ + C x˙ + K x = F denklemini x¨ için çöz.',
        'Sol alt blok konum vektörü x ile çarpılan bloktur.'
      ],
      en: [
        'Solve M ẍ + C ẋ + K x = F for ẍ.',
        'The lower-left block multiplies the position vector x.'
      ]
    }
  }
];
