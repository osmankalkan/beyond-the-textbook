import { laplaceAppStudySupport, laplaceAppExamClinic } from './study.js';
import { laplaceAppExtraQuestions } from './questions.js';

const text = (tr, en) => ({ tr, en });

export const laplaceAppLesson = {
  id: 'xie-2010:6.6',
  section: '6.6',
  chapterNumber: '06',
  chapterTitle: text('Laplace dönüşümü ve uygulamaları', 'The Laplace Transform and Its Applications'),
  title: text('Laplace dönüşümünün mühendislik uygulamaları', 'Applications of the Laplace transform'),
  englishTitle: 'Applications of the Laplace Transform',
  subtitle: text(
    'Mekanik titreşimler (SDOF rampa ve şok patlama darbeleri), periyodik sinyallerle sürülen RLC elektrik devreleri ve elastik zemin üzerinde noktasal yüklü kiriş problemleri.',
    'Mechanical vibrations (SDOF ramp and blast pulses), RLC electric circuits driven by periodic waveforms, and beams on elastic foundations under point loads.'
  ),
  pages: '268–288',
  pdfPages: '286–306',
  lessonPath: text('lessons/xie-2010/6-6/lesson.md', 'lessons/xie-2010/6-6/lesson-en.md'),
  mathPath: 'lessons/xie-2010/6-6/math.json',
  inlinePath: 'lessons/xie-2010/6-6/inline.json',
  downloadName: text('6-6-laplace-uygulamalari.md', '6-6-laplace-applications.md'),
  labFamily: 'laplace-applications',
  highlights: text(
    [
      'Tek serbestlik dereceli (SDOF) sönümlü mekanik sistemlerin hareket denklemi: m x\'\' + c x\' + k x = f(t)',
      'Darbe ve şok yanıtı: Green fonksiyonu h(t) = (1 / m ω_d) e^{-ζ ω_n t} sin(ω_d t)',
      'Parçalı rampa ve deprem yüklemelerinde t₁ süresinin dinamik büyütmeye (DMF) etkisi',
      'Yarım sinüs patlama darbesi (blast pulse) ve şok spektrumu analizi',
      'Periyodik fonksiyonların Laplace dönüşümü: ℒ{f_per(t)} = [1 / (1 − e^{-sT})] ∫₀ᵀ e^{-st} f(t) dt',
      'Seri RLC devrelerinde periyodik kare dalga anahtarlaması ve rezonant çınlama (ringing)',
      'Elastik zeminde 4. mertebe kiriş denklemi: EI y⁽⁴⁾(x) + k y(x) = w(x)',
      'Örnek 6.20–6.22 tam çözümleri ve kiriş tekil yük çökme zarfı'
    ],
    [
      'Equation of motion for single-degree-of-freedom (SDOF) systems: m x\'\' + c x\' + k x = f(t)',
      'Impulse and shock response: Green function h(t) = (1 / m ω_d) e^{-ζ ω_n t} sin(ω_d t)',
      'Effect of ramp duration t₁ on dynamic magnification factor (DMF) under seismic loads',
      'Half-sine blast pulse response and shock spectrum analysis',
      'Laplace transform of periodic waveforms: ℒ{f_per(t)} = [1 / (1 − e^{-sT})] ∫₀ᵀ e^{-st} f(t) dt',
      'Periodic square-wave switching and resonant ringing in series RLC circuits',
      '4th-order beam on elastic foundation: EI y⁽⁴⁾(x) + k y(x) = w(x)',
      'Complete solutions for textbook Examples 6.20 through 6.22 and point load deflection envelopes'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Kiriş zemin parametresi β = (k / 4EI)^(1/4) birimi nedir ve fiziksel olarak neyi ifade eder?',
    'E.g., What are the units of beam foundation parameter β = (k / 4EI)^(1/4) and what does it represent physically?'
  ),
  presentation: {
    practiceIntro: text(
      'Bu çalışma modülünde SDOF mekanik titreşimleri, şok darbeleri, periyodik RLC devreleri ve elastik zemin kirişleri üzerine 12 soru ve 22 puanlık 4 çözümlü sınav vakası yer almaktadır.',
      'This study module includes 12 practice questions and 4 worked exam cases worth 22 points on SDOF mechanical vibrations, shock pulses, periodic RLC circuits, and beams on elastic foundation.'
    ),
    practiceDisclaimer: text(
      'Sorular özgün sentez ve çalışma sorularıdır; gerçek sınav tahmini değildir.',
      'Original synthesis and study questions; these do not predict an actual exam.'
    )
  },
  studySupport: laplaceAppStudySupport,
  guidedTools: {
    examClinic: laplaceAppExamClinic
  },
  questions: [
    {
      title: text('SDOF doğal frekans ve sönüm oranı', 'SDOF natural frequency and damping ratio'),
      tag: 'TİTREŞİM / SDOF PARAMETERS',
      text: text(
        'm x\'\' + c x\' + k x = 0 hareket denkleminde açısal doğal frekans ω_n ve sönüm oranı ζ nasıl tanımlanır?',
        'In the equation of motion m x\'\' + c x\' + k x = 0, how are natural frequency ω_n and damping ratio ζ defined?'
      ),
      choices: text(
        [
          'ω_n = √(k / m),   ζ = c / [2 √(k · m)]',
          'ω_n = k / m,   ζ = c / m',
          'ω_n = √(m / k),   ζ = 2 c √(k · m)'
        ],
        [
          'ω_n = √(k / m),   ζ = c / [2 √(k · m)]',
          'ω_n = k / m,   ζ = c / m',
          'ω_n = √(m / k),   ζ = 2 c √(k · m)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Denklem m\'e bölündüğünde x\'\' + 2ζ ω_n x\' + ω_n² x = 0 standart kanonik formuna ulaşılır.',
        'Correct! Dividing by m yields the canonical equation x\'\' + 2ζ ω_n x\' + ω_n² x = 0.'
      ),
      hints: text(
        [
          'x teriminin katsayısı ω_n² dir.',
          'x\' teriminin katsayısı 2ζ ω_n dir.'
        ],
        [
          'Coefficient of x is ω_n².',
          'Coefficient of x\' is 2ζ ω_n.'
        ]
      )
    },
    {
      title: text('Sönümlü doğal frekans', 'Damped natural frequency'),
      tag: 'MODAL ANALİZ / DAMPED FREQUENCY',
      text: text(
        'Eksik sönümlü bir sistemde (ζ < 1) salınım frekansı ω_d nedir?',
        'What is the oscillation frequency ω_d in an underdamped system (ζ < 1)?'
      ),
      choices: text(
        [
          'ω_d = ω_n · √(1 − ζ²)',
          'ω_d = ω_n · √(1 + ζ²)',
          'ω_d = ω_n / ζ'
        ],
        [
          'ω_d = ω_n · √(1 − ζ²)',
          'ω_d = ω_n · √(1 + ζ²)',
          'ω_d = ω_n / ζ'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! Sönüm osilatörün frekansını hafifçe düşürür ve karakteristik köklerin sanal kısmını ω_d yapar.',
        'Spot on! Viscous damping slightly lowers the frequency, defining the imaginary part of characteristic roots.'
      ),
      hints: text(
        [
          'Karakteristik kökler: s = −ζ ω_n ± i ω_d dir.',
          'ζ sıfırken ω_d = ω_n olur.'
        ],
        [
          'Characteristic roots are s = −ζ ω_n ± i ω_d.',
          'For ζ = 0, ω_d recovers ω_n.'
        ]
      )
    },
    {
      title: text('SDOF Green impuls yanıtı', 'SDOF Green impulse response'),
      tag: 'GREEN FONKSİYONU / IMPULSE RESPONSE',
      text: text(
        'Durgun haldeki sönümlü bir osilatörün birim darbe yanıtı h(t) nedir?',
        'What is the unit impulse response h(t) of an initially quiescent damped oscillator?'
      ),
      choices: text(
        [
          'h(t) = [1 / (m ω_d)] · e^{-ζ ω_n t} · sin(ω_d t)',
          'h(t) = (1 / m) · e^{-ζ ω_n t} · cos(ω_d t)',
          'h(t) = [1 / (m ω_n)] · cos(ω_n t)'
        ],
        [
          'h(t) = [1 / (m ω_d)] · e^{-ζ ω_n t} · sin(ω_d t)',
          'h(t) = (1 / m) · e^{-ζ ω_n t} · cos(ω_d t)',
          'h(t) = [1 / (m ω_n)] · cos(ω_n t)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! H(s) = 1 / [m ((s + ζ ω_n)² + ω_d²)] transfer fonksiyonunun ters dönüşümü doğrudan bu sönümlü sinüs formülünü verir.',
        'Correct! Inverting H(s) = 1 / [m ((s + ζ ω_n)² + ω_d²)] produces this damped sinusoidal impulse kernel.'
      ),
      hints: text(
        [
          'Paydaki ω_d çarpanını dengelemek için öne 1/ω_d gelir.',
          'Darbe tepkisi t = 0 anında sıfır konumundan başlar ve hız sıçrar.'
        ],
        [
          'Balancing the numerator requires 1/ω_d.',
          'Impulse response begins at zero position with an instantaneous velocity jump.'
        ]
      )
    },
    {
      title: text('Rampa yüklemesinde dinamik büyütme', 'Dynamic amplification under ramp loading'),
      tag: 'RAMPA YÜKÜ / RAMP LOADING',
      text: text(
        'Rampa süresi t₁, yapının doğal periyodu T_n\'e göre çok uzun olduğunda (t₁ ≫ T_n) tepe genlik neye eşit olur?',
        'When ramp rise time t₁ is far longer than natural period T_n (t₁ ≫ T_n), what does peak deflection equal?'
      ),
      choices: text(
        [
          'Statik çökmeye: x_max ≈ F₀ / k (dinamik etki neredeyse sıfırdır)',
          'Statik çökmenin iki katına: x_max ≈ 2 F₀ / k',
          'Sıfıra'
        ],
        [
          'Static deflection: x_max ≈ F₀ / k (negligible dynamic amplification)',
          'Twice static deflection: x_max ≈ 2 F₀ / k',
          'Zero'
        ]
      ),
      answer: 0,
      feedback: text(
        'Kutlarız! Yük çok yavaş uygulandığında (yarı-statik rejim) sistem titreşmeden statik denge noktasını takip eder.',
        'Congratulations! For very slow quasi-static ramp application, dynamic inertial effects vanish and response matches static equilibrium.'
      ),
      hints: text(
        [
          't₁ ≫ T_n demek yükün son derece yavaş uygulanması demektir.',
          'Dinamik büyütme t₁ sıfıra yaklaşırken (ani basamak) 2 katına çıkar.'
        ],
        [
          't₁ ≫ T_n corresponds to very slow gradual loading.',
          'Dynamic amplification approaches 2 only as t₁ drops toward zero (sudden step).'
        ]
      )
    },
    {
      title: text('Ani basamak yüklemesinde maksimum deformasyon', 'Maximum deflection under sudden step'),
      tag: 'BASAMAK ŞOKU / SUDDEN STEP',
      text: text(
        'Sönümsüz bir yay-kütle sistemine t = 0 anında aniden F₀ sabit kuvveti uygulanırsa ulaşılan maksimum deplasman nedir?',
        'If a constant force F₀ is suddenly applied at t = 0 to an undamped spring-mass system, what is the maximum displacement reached?'
      ),
      choices: text(
        [
          'x_max = 2 · (F₀ / k)',
          'x_max = F₀ / k',
          'x_max = 1.5 · (F₀ / k)'
        ],
        [
          'x_max = 2 · (F₀ / k)',
          'x_max = F₀ / k',
          'x_max = 1.5 · (F₀ / k)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! x(t) = (F₀ / k)(1 − cos ω_n t) olduğundan kosinüs −1 değerini aldığında genlik statik çökmenin tam iki katına fırlar.',
        'Correct! Since x(t) = (F₀ / k)(1 − cos ω_n t), when cosine reaches −1 displacement reaches exactly 2x static deflection.'
      ),
      hints: text(
        [
          '1 − cos(ω_n t) fonksiyonunun alabileceği maksimum değeri düşünün.',
          '1 − (−1) = 2 eder.'
        ],
        [
          'Consider the maximum value of 1 − cos(ω_n t).',
          '1 − (−1) = 2.'
        ]
      )
    },
    {
      title: text('Kare dalgada tek periyot integrali', 'Single-period integral of square wave'),
      tag: 'KARE DALGA / SQUARE WAVE',
      text: text(
        '[0, T/2] aralığında V₀, [T/2, T] aralığında sıfır olan bir kare dalganın bir periyotluk Laplace integrali nedir?',
        'What is the single-period Laplace integral of a square wave equal to V₀ on [0, T/2] and zero on [T/2, T]?'
      ),
      choices: text(
        [
          '(V₀ / s) · (1 − e^{-s T / 2})',
          '(V₀ / s) · (1 − e^{-s T})',
          'V₀ · e^{-s T / 2}'
        ],
        [
          '(V₀ / s) · (1 − e^{-s T / 2})',
          '(V₀ / s) · (1 − e^{-s T})',
          'V₀ · e^{-s T / 2}'
        ]
      ),
      answer: 0,
      feedback: text(
        'Harika! İntegral ∫₀^{T/2} V₀ e⁻ˢᵗ dt = (V₀ / s)(1 − e^{-s T / 2}) olarak doğrudan hesaplanır.',
        'Spot on! The integral ∫₀^{T/2} V₀ e⁻ˢᵗ dt evaluates directly to (V₀ / s)(1 − e^{-s T / 2}).'
      ),
      hints: text(
        [
          'T/2 ile T arasında fonksiyon sıfır olduğundan integrale katkı vermez.',
          'e⁻ˢᵗ integralinin tersi −e⁻ˢᵗ / s dir.'
        ],
        [
          'The function vanishes on [T/2, T], contributing nothing to the integral.',
          'The integral of e⁻ˢᵗ is −e⁻ˢᵗ / s.'
        ]
      )
    },
    {
      title: text('Elastik zemin kirişinde diferansiyel mertebe', 'Differential order of beam on elastic foundation'),
      tag: 'KİRİŞ MODELİ / BEAM FOUNDATION',
      text: text(
        'Euler-Bernoulli elastik zemin kirişinin çökmeyi y(x) tanımlayan diferansiyel denklemi kaçıncı mertebedendir?',
        'What is the order of the Euler-Bernoulli differential equation governing deflection y(x) on an elastic foundation?'
      ),
      choices: text(
        [
          '4. mertebeden: EI y⁽⁴⁾(x) + k y(x) = w(x)',
          '2. mertebeden: EI y\'\'(x) + k y(x) = w(x)',
          '1. mertebeden: y\'(x) + k y(x) = w(x)'
        ],
        [
          '4th order: EI y⁽⁴⁾(x) + k y(x) = w(x)',
          '2nd order: EI y\'\'(x) + k y(x) = w(x)',
          '1st order: y\'(x) + k y(x) = w(x)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Kutlarız! Eğilme momenti d²y/dx², kesme kuvveti d³y/dx³ ve yayılı yük d⁴y/dx⁴ türevleriyle bağlantılı olduğundan denklem 4. mertebedendir.',
        'Congratulations! Bending moment involves d²y/dx², shear force involves d³y/dx³, and equilibrium with distributed load yields a 4th-order ODE.'
      ),
      hints: text(
        [
          'Kiriş eğilme teorisinde moment-eğrilik ilişkisi iki türev içerir.',
          'Denge denklemi iki ek türev getirir.'
        ],
        [
          'Beam bending theory links curvature to moment via two derivatives.',
          'Equilibrium introduces two additional derivatives.'
        ]
      )
    },
    {
      title: text('Noktasal yük altında kiriş tepe çökmesi', 'Peak beam deflection under point load'),
      tag: 'TEPE ÇÖKME / PEAK DEFLECTION',
      text: text(
        'EI y⁽⁴⁾ + k y = P₀ δ(x − a) sonsuz kirişinde yükün tam altında (x = a) oluşan çökme nedir?',
        'For an infinite beam EI y⁽⁴⁾ + k y = P₀ δ(x − a), what is the deflection directly beneath the load (x = a)?'
      ),
      choices: text(
        [
          'y(a) = (P₀ · β) / (2k)',
          'y(a) = P₀ / k',
          'y(a) = (P₀ · β²) / k'
        ],
        [
          'y(a) = (P₀ · β) / (2k)',
          'y(a) = P₀ / k',
          'y(a) = (P₀ · β²) / k'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! x = a anında |x − a| = 0 olur; e⁰(cos 0 + sin 0) = 1 olduğundan maksimum çökme y(a) = P₀ β / (2k) dır.',
        'Correct! At x = a we have |x − a| = 0, where e⁰(cos 0 + sin 0) = 1, leaving y(a) = P₀ β / (2k).'
      ),
      hints: text(
        [
          'y(x) = [P₀ β / (2k)] e^{-β|x-a|} [cos(β|x-a|) + sin(β|x-a|)] formülünde x = a koyun.',
          'cos 0 = 1, sin 0 = 0 dır.'
        ],
        [
          'Evaluate y(x) = [P₀ β / (2k)] e^{-β|x-a|} [cos(β|x-a|) + sin(β|x-a|)] at x = a.',
          'cos 0 = 1 and sin 0 = 0.'
        ]
      )
    },
    ...laplaceAppExtraQuestions
  ]
};
