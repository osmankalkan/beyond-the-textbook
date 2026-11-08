import {separationLesson} from './lessons/xie-2010/2-1/content.js';
import {transformationLesson} from './lessons/xie-2010/2-2/content.js';
import {exactnessLesson} from './lessons/xie-2010/2-3/content.js';
import {linearLesson} from './lessons/xie-2010/2-4/content.js';
import {solvableLesson} from './lessons/xie-2010/2-5/content.js';
import {reductionLesson} from './lessons/xie-2010/2-6/content.js';
import {summaryLesson} from './lessons/xie-2010/2-7/content.js';
import {generalLinearLesson} from './lessons/xie-2010/4-1/content.js';
import {complementaryLesson} from './lessons/xie-2010/4-2/content.js';
import {particularLesson} from './lessons/xie-2010/4-3/content.js';
import {linearSummaryLesson} from './lessons/xie-2010/4-5/content.js';
import {laplaceLesson} from './lessons/xie-2010/6-1/content.js';
import {heavisideLesson} from './lessons/xie-2010/6-2/content.js';
import {diracLesson} from './lessons/xie-2010/6-3/content.js';
import {inverseLaplaceLesson} from './lessons/xie-2010/6-4/content.js';
import {laplaceOdeLesson} from './lessons/xie-2010/6-5/content.js';
import {laplaceAppLesson} from './lessons/xie-2010/6-6/content.js';
import {laplaceSummaryLesson} from './lessons/xie-2010/6-7/content.js';
import {systemsLesson} from './lessons/xie-2010/7-1/content.js';
import {operatorSystemsLesson} from './lessons/xie-2010/7-2/content.js';
import {laplaceSystemsLesson} from './lessons/xie-2010/7-3/content.js';
import {matrixSystemsLesson} from './lessons/xie-2010/7-4/content.js';
import {systemsSummaryLesson} from './lessons/xie-2010/7-5/content.js';
import {conceptsLesson} from './lessons/xie-2010/1-2/content.js';
import {introductionLesson} from './lessons/xie-2010/1-1/content.js';
import { deepLocalize, normalizeLang } from './i18n.js';

export const LEGACY_LESSON_ID = 'xie-2010:3.1';

export const BOOKS = [
  {
    id: 'xie-2010',
    title: 'Differential Equations for Engineers',
    shortTitle: {
      tr: 'Diferansiyel Denklemler',
      en: 'Differential Equations'
    },
    author: 'Wei-Chau Xie',
    year: 2010,
    publisher: 'Cambridge University Press',
    pdfPages: 568,
    pdfPageOffset: 18,
    coverLines: ['DIFFERENTIAL', 'EQUATIONS', 'FOR ENGINEERS'],
    coverSymbol: '∫',
    summary: {
      tr: 'Mühendislik problemlerinden doğan adi ve kısmi diferansiyel denklemler, analitik çözüm yöntemleri, Laplace dönüşümü ve fiziksel sistem modellemesi.',
      en: 'Ordinary and partial differential equations arising from engineering problems, analytical solution methods, Laplace transforms, and physical system modeling.'
    },
    lessons: [
      introductionLesson,
      conceptsLesson,
      separationLesson,
      transformationLesson,
      exactnessLesson,
      linearLesson,
      solvableLesson,
      reductionLesson,
      summaryLesson,
      {
        id: 'xie-2010:3.1',
        section: '3.1',
        chapterNumber: '03',
        chapterTitle: {
          tr: 'Birinci mertebe denklemlerin uygulamaları',
          en: 'Applications of First-Order Equations'
        },
        title: {
          tr: 'Isınma ve soğuma',
          en: 'Heating and cooling'
        },
        englishTitle: 'Heating and Cooling',
        subtitle: {
          tr: 'Fiziksel enerji dengesinden diferansiyel denkleme, kalibrasyondan kalıcı/geçici rejim analizine ve vize/final düzeyinde problemlere.',
          en: 'From physical energy balance to differential equations, experimental calibration, transient vs steady-state analysis, and exam-level problems.'
        },
        pages: {
          tr: '87–90 (Problemler s.130)',
          en: '87–90 (Problems p. 130)'
        },
        pdfPages: '105–108, 148',
        lessonPath: {
          tr: 'lesson.md',
          en: 'lesson-en.md'
        },
        mathPath: 'math.json',
        downloadName: {
          tr: 'isinma-ve-soguma.md',
          en: 'heating-and-cooling.md'
        },
        labFamily: 'heating-cooling',
        highlights: {
          tr: [
            "Newton'un soğuma yasası",
            'Değişkenleri ayırma ve kalibrasyon',
            'Geçici + kalıcı rejim ayrışımı',
            'İntegral çarpanı ve faz gecikmesi',
            'Vize & Final çözüm kliniği'
          ],
          en: [
            "Newton's Law of Cooling",
            'Separation of variables & calibration',
            'Transient + steady-state split',
            'Integrating factor & phase lag',
            'Midterm & Final exam clinic'
          ]
        },
        notesPlaceholder: {
          tr: 'Örneğin: Sınavda t = 0 referansını seçerken veya kalıcı genliği hesaplarken hangi adımlara dikkat etmeliyim?',
          en: 'E.g., What key steps should I watch out for when choosing the t = 0 reference or computing steady-state amplitude on an exam?'
        },
        sourceSummary: {
          tr: 'Bu sürüm, §3.1 Heating and Cooling, basılı s.87–90 (PDF s.105–108) ve Bölüm 3 sonu problemleri (basılı s.130, Problem 3.1–3.2) temelinde hazırlanmış kapsamlı bir çalışma ve sınav hazırlık modülüdür. §2.1 (değişkenleri ayırma) ve §2.4 (birinci mertebe doğrusal denklemler / integral çarpanı) yöntemlerini birleştirir.',
          en: 'This module is a comprehensive interactive study and exam-prep adaptation based on §3.1 Heating and Cooling, printed pp. 87–90 (PDF pp. 105–108), and Chapter 3 end-of-chapter problems (printed p. 130, Problems 3.1–3.2). It connects §2.1 (separation of variables) and §2.4 (linear first-order equations / integrating factors).'
        },
        modelLimits: {
          tr: 'Soğuma deneyi, sabit ortam ve sabit k varsayımıyla tek sıcaklıklı (Biot sayısı Bi ≪ 1) bir cisim modeli kullanır. Bina modelinde sabit katsayılar ve sınırsız doğrusal ısıtıcı tepkisi varsayılır. Gösterilen genlik ve faz kartları kalıcı rejime aittir; grafikte başlangıç geçişini içeren tam çözüm (geçici + kalıcı) çizilir.',
          en: 'The cooling experiment assumes a constant ambient temperature, constant k, and uniform internal temperature (Biot number Bi ≪ 1). The building model assumes constant coefficients and unsaturated linear heater feedback. The amplitude and phase cards report steady-state metrics, while the chart plots the complete (transient + steady-state) temperature response.'
        },
        guidedTools: {
          prediction: {
            cooling: [
              {
                id: 'double-k',
                badge: {
                  tr: 'SENARYO 1 · YARILANMA MANTIĞI',
                  en: 'SCENARIO 1 · HALF-LIFE LOGIC'
                },
                question: {
                  tr: 'Tepki katsayısı k iki katına çıkarsa 20. dakikada sıcaklık ne olur?',
                  en: 'If the response constant k is doubled, what is the temperature at 20 minutes?'
                },
                prompt: {
                  tr: 'Başlangıç 100 °C, ortam 20 °C iken Örnek 3.1’de 20. dakikada cisim 60 °C’ye iniyor (fark 80 °C → 40 °C). Tepki katsayısı k iki katına çıkarılırsa 20. dakikada cismin sıcaklığı kaç °C olur? (Yaygın tuzak: "60’ın yarısı 30 °C olur" demek!)',
                  en: 'With initial 100 °C and ambient 20 °C in Example 3.1, the body reaches 60 °C at 20 minutes (difference drops 80 °C → 40 °C). If the response constant k is doubled, what is the body temperature at 20 minutes? (Common trap: saying "half of 60 is 30 °C"!)'
                },
                unit: '°C',
                expected: 40,
                tolerance: 0.5,
                applyPreset: { ambient: 20, initial: 100, k: Math.log(2) / 10, h: 5, time: 20 },
                explanation: {
                  tr: 'Üstel azalan şey sıcaklığın kendisi değil, ortamla farktır (θ = T − 20). k iki katına çıkınca yarılanma süresi 20 dakikadan 10 dakikaya iner. 20 dakikada iki yarılanma gerçekleşir: fark 80 → 40 → 20 °C olur, cisim T = 20 + 20 = 40 °C sıcaklığa iner.',
                  en: 'The exponentially decaying quantity is not temperature itself, but the difference relative to ambient (θ = T − 20). Doubling k halves the half-life from 20 min to 10 min. In 20 minutes two halvings occur: the difference drops 80 → 40 → 20 °C, so T = 20 + 20 = 40 °C.'
                }
              },
              {
                id: 'remaining-time',
                badge: {
                  tr: 'SENARYO 2 · TOPLAM vs KALAN SÜRE',
                  en: 'SCENARIO 2 · TOTAL vs REMAINING TIME'
                },
                question: {
                  tr: '60 °C’den 25 °C’ye inmek için kaç dakika DAHA gerekir?',
                  en: 'How many MORE minutes are needed to cool from 60 °C down to 25 °C?'
                },
                prompt: {
                  tr: 'Ortam 20 °C, başlangıç 100 °C ve 20. dakikada sıcaklık 60 °C (yarılanma süresi 20 dk). Cismin 60 °C gözleminden sonra 25 °C’ye inmesi için kaç dakika DAHA geçmelidir?',
                  en: 'Ambient is 20 °C, initial is 100 °C, and at 20 minutes the temperature is 60 °C (half-life is 20 min). How many MORE minutes must pass after the 60 °C reading for the body to reach 25 °C?'
                },
                unit: {
                  tr: 'dk',
                  en: 'min'
                },
                expected: 60,
                tolerance: 0.5,
                applyPreset: { ambient: 20, initial: 100, k: Math.log(2) / 20, h: 5, time: 80 },
                explanation: {
                  tr: '25 °C’de ortamla fark 25 − 20 = 5 °C’dir. Başlangıç farkı 80 °C olduğundan 80 → 40 → 20 → 10 → 5 °C için toplam 4 yarılanma (80 dk) gerekir. Gözlem 20. dakikada (40 °C farkta) yapıldığı için 80 − 20 = 60 dakika daha gerekir.',
                  en: 'At 25 °C the difference from ambient is 25 − 20 = 5 °C. Starting from an 80 °C difference, 80 → 40 → 20 → 10 → 5 °C takes 4 halvings (80 min total). Since the observation occurred at 20 min, 80 − 20 = 60 more minutes are required.'
                }
              },
              {
                id: 'euler-overshoot',
                badge: {
                  tr: 'SENARYO 3 · SAYISAL YÖNTEM HATASI',
                  en: 'SCENARIO 3 · NUMERICAL METHOD ERROR'
                },
                question: {
                  tr: 'Euler adımını h = 10 dk seçersek ilk adımda (t = 10 dk) hata hangi yönde olur?',
                  en: 'With an Euler step of h = 10 min, what value does the first step (t = 10 min) predict?'
                },
                prompt: {
                  tr: 'Örnek 3.1’de (Tᵢ = 100 °C, Tₘ = 20 °C, k = ln(2)/20 ≈ 0,03466 dk⁻¹) ileri Euler yöntemiyle tek bir h = 10 dk adım atarsak T₁ = T₀ − h·k·(T₀ − Tₘ) değeri yaklaşık kaç °C verir? (Analitik değer: 76,6 °C)',
                  en: 'In Example 3.1 (Tᵢ = 100 °C, Tₘ = 20 °C, k = ln(2)/20 ≈ 0.03466 min⁻¹), taking a single forward Euler step of h = 10 min gives T₁ = T₀ − h·k·(T₀ − Tₘ). What temperature (°C) does it predict? (Exact value: 76.6 °C)'
                },
                unit: '°C',
                expected: 100 - 10 * (Math.log(2) / 20) * 80,
                tolerance: 0.6,
                applyPreset: { ambient: 20, initial: 100, k: Math.log(2) / 20, h: 10, time: 10, showEuler: true },
                explanation: {
                  tr: 'İleri Euler başlangıçtaki en dik eğimi (−k·80) 10 dakika boyunca sabit kabul eder ve T(10) ≈ 72,3 °C bulur. Gerçekte cisim soğudukça soğuma hızı yavaşladığı için Euler eğrisi konveks analitik eğrinin (76,6 °C) altında kalır.',
                  en: 'Forward Euler holds the steepest initial slope (−k·80) constant across the entire 10-minute step, yielding T(10) ≈ 72.3 °C. Because the true cooling rate slows down as the body cools, the Euler polygon undershoots the convex analytical curve (76.6 °C).'
                }
              }
            ],
            building: [
              {
                id: 'open-loop',
                badge: {
                  tr: 'SENARYO 1 · AÇIK ÇEVRİM (r = 0)',
                  en: 'SCENARIO 1 · OPEN LOOP (r = 0)'
                },
                question: {
                  tr: 'Termostat geri beslemesini kapatırsan (r = 0) kalıcı salınım genliği A ne olur?',
                  en: 'If thermostat feedback is turned off (r = 0), what is the steady-state amplitude A?'
                },
                prompt: {
                  tr: 'Dış sıcaklık genliği T₁ = 12 °C, ısıl zaman τ = 4 saat ve periyot 24 saat (τω = π/3) iken ısıtıcı geri beslemesi kapatılırsa (r = 0) binanın kalıcı salınım genliği A yaklaşık kaç °C olur?',
                  en: 'When outdoor amplitude is T₁ = 12 °C, thermal time constant is τ = 4 hr, and period is 24 hr (τω = π/3), turning off heater feedback (r = 0) gives what steady-state indoor amplitude A (°C)?'
                },
                unit: '°C',
                expected: 12 / Math.hypot(1, Math.PI / 3),
                tolerance: 0.25,
                applyPreset: { tau: 4, ratio: 0, period: 24, amplitude: 12, setpoint: 22, time: 24 },
                explanation: {
                  tr: 'r = 0 iken dahi binanın ısıl kapasitesi (τ = 4 sa) dış salınımı bir miktar sönümler: A = 12 / √(1 + (π/3)²) ≈ 8,28 °C. Ancak 3 °C tasarım sınırını sağlamak için geri besleme (r ≥ 2,86) şarttır.',
                  en: 'Even with r = 0, the building’s thermal inertia (τ = 4 hr) damps outdoor swings to A = 12 / √(1 + (π/3)²) ≈ 8.28 °C. However, active proportional feedback (r ≥ 2.86) is required to stay within the 3 °C design bound.'
                }
              },
              {
                id: 'double-tau',
                badge: {
                  tr: 'SENARYO 2 · ISIL ATALET VE FAZ',
                  en: 'SCENARIO 2 · THERMAL INERTIA & PHASE'
                },
                question: {
                  tr: 'r = 0 iken ısıl zaman sabiti τ = 4 saatten 12 saate çıkarsa kalıcı genlik A kaç °C olur?',
                  en: 'With r = 0, if thermal time constant τ increases from 4 hr to 12 hr, what is steady-state amplitude A?'
                },
                prompt: {
                  tr: 'Yalıtımı ve ısıl kütleyi artırarak τ = c/K₁ değerini 12 saate çıkardığımızı (τω = 12·π/12 = π) ve r = 0 olduğunu düşünelim. T₁ = 12 °C dış genlik altında kalıcı iç genlik A kaç °C’ye düşer?',
                  en: 'Suppose better insulation and thermal mass raise τ = c/K₁ to 12 hours (τω = 12·π/12 = π) with r = 0. Under a T₁ = 12 °C outdoor swing, what does the steady-state indoor amplitude A (°C) drop to?'
                },
                unit: '°C',
                expected: 12 / Math.hypot(1, Math.PI),
                tolerance: 0.25,
                applyPreset: { tau: 12, ratio: 0, period: 24, amplitude: 12, setpoint: 22, time: 24 },
                explanation: {
                  tr: 'τω = π olduğunda A = 12 / √(1 + π²) ≈ 3,64 °C olur. Büyük ısıl kütle (τ) alçak geçiren filtre gibi davranarak yüksek frekanslı/günlük dış salınımları bastırır ve faz gecikmesini artırır.',
                  en: 'When τω = π, A = 12 / √(1 + π²) ≈ 3.64 °C. A large thermal time constant τ acts as a low-pass filter, strongly attenuating daily outdoor fluctuations while increasing phase delay.'
                }
              }
            ]
          },
          stepByStep: {
            cooling: [
              {
                title: {
                  tr: '1. Fiziksel Enerji Dengesinden Diferansiyel Denkleme',
                  en: '1. From Physical Energy Balance to the Differential Equation'
                },
                why: {
                  tr: 'Neden türev sıcaklık farkıyla orantılıdır?',
                  en: 'Why is the time derivative proportional to the temperature difference?'
                },
                formula: '<mi>m</mi><mi>c</mi><mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mi>h</mi><mi>A</mi><mo>(</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo><mspace width="0.6em"/><mo>⇒</mo><mspace width="0.6em"/><mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mi>k</mi><mo>(</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo><mo>,</mo><mspace width="0.5em"/><mi>k</mi><mo>=</mo><mfrac><mrow><mi>h</mi><mi>A</mi></mrow><mrow><mi>m</mi><mi>c</mi></mrow></mfrac><mo>&gt;</mo><mn>0</mn>',
                note: {
                  tr: 'Cismin iç ısıl direnci yüzey taşınım direncine göre çok küçükse (Biot sayısı Bi ≪ 1), cisim tek bir T(t) sıcaklığıyla modellenir. Isı kaybı hızı yüzey alanı A ve taşınım katsayısı h ile doğru, ısıl kapasite mc ile ters orantılıdır.',
                  en: 'When internal conductive resistance is much smaller than surface convective resistance (Biot number Bi ≪ 1), the body has a uniform temperature T(t). Heat loss rate is proportional to surface area A and convection coefficient h, and inversely proportional to heat capacity mc.'
                }
              },
              {
                title: {
                  tr: '2. Denge Çözümü ve Değişkenlerin Ayrılması (§2.1)',
                  en: '2. Equilibrium Solution and Separation of Variables (§2.1)'
                },
                why: {
                  tr: 'Neden T − Tₘ’ye bölmeden önce T = Tₘ durumunu kontrol etmeliyiz?',
                  en: 'Why check the T = Tₘ equilibrium before dividing by T − Tₘ?'
                },
                formula: '<mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow></mfrac><mo>=</mo><mo>−</mo><mi>k</mi><mspace width="0.15em"/><mi>d</mi><mi>t</mi><mspace width="0.6em"/><mo>⇒</mo><mspace width="0.6em"/><mi mathvariant="normal">ln</mi><mo>|</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>|</mo><mo>=</mo><mo>−</mo><mi>k</mi><mi>t</mi><mo>+</mo><msub><mi>C</mi><mn>0</mn></msub><mspace width="0.6em"/><mo>⇒</mo><mspace width="0.6em"/><mi>T</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msub><mi>T</mi><mi>m</mi></msub><mo>+</mo><mi>C</mi><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup>',
                note: {
                  tr: 'T(t) ≡ Tₘ sabit (denge) çözümdür. T ≠ Tₘ için değişkenler ayrılır. Mutlak değer kaldırılırken ±e^(C₀) sabiti tek bir C ∈ ℝ sabiti olarak yazılır; C = 0 seçimi denge çözümünü de geri verir.',
                  en: 'T(t) ≡ Tₘ is the constant equilibrium solution. For T ≠ Tₘ, we separate variables and integrate. Absorbing ±e^(C₀) into a single real constant C ∈ ℝ also recovers the equilibrium solution when C = 0.'
                }
              },
              {
                title: {
                  tr: '3. Başlangıç Koşulu (BDP) ve Sıcaklık Farkı Dönüşümü',
                  en: '3. Initial Value Problem (IVP) and Temperature Difference Variable'
                },
                why: {
                  tr: 'Üstel azalan terim neden sıcaklığın kendisi değil de farktır?',
                  en: 'Why does the temperature difference decay exponentially rather than temperature itself?'
                },
                formula: '<mi>T</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><msub><mi>T</mi><mi>i</mi></msub><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mi>C</mi><mo>=</mo><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mspace width="0.6em"/><mo>⇒</mo><mspace width="0.6em"/><mi>θ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mi>T</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>=</mo><mo>(</mo><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup>',
                note: {
                  tr: 'Sınavlarda en sık yapılan hata T(t) = Tᵢ·e^(−kt) yazmaktır! Oysa t → ∞ iken T(t) → 0 değil, T(t) → Tₘ olmalıdır. Doğru dönüşüm θ(t) = T(t) − Tₘ fark değişkenidir.',
                  en: 'The most common exam error is writing T(t) = Tᵢ·e^(−kt)! As t → ∞, temperature approaches Tₘ, not 0. The exponentially decaying quantity is always the excess temperature θ(t) = T(t) − Tₘ.'
                }
              },
              {
                title: {
                  tr: '4. Ara Gözlemden Kalibrasyon: k ve Yarılanma Süresi',
                  en: '4. Calibration from an Intermediate Observation: k and Half-Life'
                },
                why: {
                  tr: 'Deneyde k doğrudan verilmezse tek bir ara ölçümden nasıl bulunur?',
                  en: 'How do we determine k from a single intermediate temperature measurement?'
                },
                formula: '<mi>k</mi><mo>=</mo><mo>−</mo><mfrac><mn>1</mn><msub><mi>t</mi><mn>1</mn></msub></mfrac><mi mathvariant="normal">ln</mi><mrow><mo>(</mo><mfrac><mrow><mi>T</mi><mo>(</mo><msub><mi>t</mi><mn>1</mn></msub><mo>)</mo><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow><mrow><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow></mfrac><mo>)</mo></mrow><mo>,</mo><mspace width="0.6em"/><msub><mi>t</mi><mrow><mn>1</mn><mo>/</mo><mn>2</mn></mrow></msub><mo>=</mo><mfrac><mrow><mi mathvariant="normal">ln</mi><mo>(</mo><mn>2</mn><mo>)</mo></mrow><mi>k</mi></mfrac><mo>,</mo><mspace width="0.6em"/><mi>τ</mi><mo>=</mo><mfrac><mn>1</mn><mi>k</mi></mfrac>',
                note: {
                  tr: 'Örnek 3.1’de Tᵢ = 100 °C, Tₘ = 20 °C ve t₁ = 20 dk’da T(20) = 60 °C verilir. Fark oranı (60−20)/(100−20) = 40/80 = 1/2 olduğundan k = ln(2)/20 ≈ 0,03466 dk⁻¹ ve yarılanma süresi tam 20 dakikadır.',
                  en: 'In Example 3.1, Tᵢ = 100 °C, Tₘ = 20 °C, and T(20) = 60 °C. Because the difference ratio is (60−20)/(100−20) = 40/80 = 1/2, we immediately get k = ln(2)/20 ≈ 0.03466 min⁻¹ and a half-life of exactly 20 minutes.'
                }
              },
              {
                title: {
                  tr: '5. Hedef Sıcaklık İçin Toplam Süre ve Gözlem Sonrası Ek Süre',
                  en: '5. Total Time vs Additional Time After Observation'
                },
                why: {
                  tr: 'Soru kökündeki "kaç dakika daha" (how much more time) ifadesi sonucu nasıl değiştirir?',
                  en: 'How does the phrasing "how much more time" change the final answer?'
                },
                formula: {
                  tr: '<msub><mi>t</mi><mtext>toplam</mtext></msub><mo>=</mo><mo>−</mo><mfrac><mn>1</mn><mi>k</mi></mfrac><mi mathvariant="normal">ln</mi><mrow><mo>(</mo><mfrac><mrow><msub><mi>T</mi><mtext>hedef</mtext></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow><mrow><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow></mfrac><mo>)</mo></mrow><mo>=</mo><mn>60</mn><mtext> dk</mtext><mo>,</mo><mspace width="0.6em"/><mi>Δ</mi><mi>t</mi><mo>=</mo><msub><mi>t</mi><mtext>toplam</mtext></msub><mo>−</mo><msub><mi>t</mi><mn>1</mn></msub><mo>=</mo><mn>60</mn><mo>−</mo><mn>20</mn><mo>=</mo><mn>40</mn><mtext> dk</mtext>',
                  en: '<msub><mi>t</mi><mtext>total</mtext></msub><mo>=</mo><mo>−</mo><mfrac><mn>1</mn><mi>k</mi></mfrac><mi mathvariant="normal">ln</mi><mrow><mo>(</mo><mfrac><mrow><msub><mi>T</mi><mtext>target</mtext></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow><mrow><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow></mfrac><mo>)</mo></mrow><mo>=</mo><mn>60</mn><mtext> min</mtext><mo>,</mo><mspace width="0.6em"/><mi>Δ</mi><mi>t</mi><mo>=</mo><msub><mi>t</mi><mtext>total</mtext></msub><mo>−</mo><msub><mi>t</mi><mn>1</mn></msub><mo>=</mo><mn>60</mn><mo>−</mo><mn>20</mn><mo>=</mo><mn>40</mn><mtext> min</mtext>'
                },
                note: {
                  tr: '30 °C hedefinde ortamla fark 10 °C’dir (80 → 40 → 20 → 10 °C, yani 3 yarılanma = 60 dk). Gözlem 20. dakikada yapıldığı için kalan süre 40 dakikadır.',
                  en: 'At the 30 °C target, the difference from ambient is 10 °C (80 → 40 → 20 → 10 °C, i.e., 3 halvings = 60 min from start). Since the reading was taken at 20 min, the remaining additional time is 40 minutes.'
                }
              }
            ],
            building: [
              {
                title: {
                  tr: '1. Isıl Enerji Dengesi ve Termostat Geri Beslemesi',
                  en: '1. Thermal Energy Balance and Thermostat Feedback'
                },
                why: {
                  tr: 'Bina denklemindeki her fiziksel terim neyi temsil eder?',
                  en: 'What does each physical term in the building ODE represent?'
                },
                formula: {
                  tr: '<mi>c</mi><mfrac><mrow><mi>d</mi><msub><mi>T</mi><mi>B</mi></msub></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><munder><mrow><mi>Q</mi><mo>+</mo><msub><mi>K</mi><mn>2</mn></msub><mo>(</mo><msub><mi>T</mi><mi>S</mi></msub><mo>−</mo><msub><mi>T</mi><mi>B</mi></msub><mo>)</mo></mrow><mtext>ısıtıcı girdisi</mtext></munder><mo>−</mo><munder><mrow><msub><mi>K</mi><mn>1</mn></msub><mo>(</mo><msub><mi>T</mi><mi>B</mi></msub><mo>−</mo><msub><mi>T</mi><mi>A</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>)</mo></mrow><mtext>dış ortama kayıp</mtext></munder>',
                  en: '<mi>c</mi><mfrac><mrow><mi>d</mi><msub><mi>T</mi><mi>B</mi></msub></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><munder><mrow><mi>Q</mi><mo>+</mo><msub><mi>K</mi><mn>2</mn></msub><mo>(</mo><msub><mi>T</mi><mi>S</mi></msub><mo>−</mo><msub><mi>T</mi><mi>B</mi></msub><mo>)</mo></mrow><mtext>heater input</mtext></munder><mo>−</mo><munder><mrow><msub><mi>K</mi><mn>1</mn></msub><mo>(</mo><msub><mi>T</mi><mi>B</mi></msub><mo>−</mo><msub><mi>T</mi><mi>A</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>)</mo></mrow><mtext>heat loss outside</mtext></munder>'
                },
                note: {
                  tr: 'c binanın ısıl kapasitesi, K₁ yalıtım/dış kayıp katsayısı, K₂ ise sıcaklığı T_S hedefine çeken oransal (P) termostat kazancıdır. Dış ortam T₀ sabit sıcaklığındayken T_B = T_S dengesi için baz ısıtma Q = K₁(T_S − T₀) seçilir.',
                  en: 'c is building thermal capacity, K₁ is envelope heat-loss conductance, and K₂ is proportional (P) thermostat gain pulling temperature toward setpoint T_S. Baseline heating Q = K₁(T_S − T₀) maintains T_B = T_S when outdoor temperature equals mean T₀.'
                }
              },
              {
                title: {
                  tr: '2. Sapma Değişkeni θ = T_B − T_S ve Standart Doğrusal Form (§2.4)',
                  en: '2. Deviation Variable θ = T_B − T_S and Standard Linear Form (§2.4)'
                },
                why: {
                  tr: 'Denklemi neden θ = T_B − T_S, τ = c/K₁ ve r = K₂/K₁ ile yeniden yazarız?',
                  en: 'Why rewrite the ODE in terms of θ = T_B − T_S, τ = c/K₁, and r = K₂/K₁?'
                },
                formula: '<mi>τ</mi><mfrac><mrow><mi>d</mi><mi>θ</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo><mi>θ</mi><mo>=</mo><msub><mi>T</mi><mn>1</mn></msub><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo><mspace width="0.6em"/><mo>⇔</mo><mspace width="0.6em"/><mfrac><mrow><mi>d</mi><mi>θ</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mi>p</mi><mi>θ</mi><mo>=</mo><mfrac><msub><mi>T</mi><mn>1</mn></msub><mi>τ</mi></mfrac><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo><mo>,</mo><mspace width="0.5em"/><mi>p</mi><mo>=</mo><mfrac><mrow><mn>1</mn><mo>+</mo><mi>r</mi></mrow><mi>τ</mi></mfrac>',
                note: {
                  tr: 'Q = K₁(T_S − T₀) sadeleşmesiyle sabit sıcaklıklar T₀ ve T_S denklemden düşer! Böylece kalıcı salınım genliği T₀ ve T_S seçiminden bağımsız hale gelir.',
                  en: 'Because Q = K₁(T_S − T₀) cancels the constant offset, both T₀ and T_S drop out of the differential equation! Consequently, steady-state oscillation amplitude is independent of T₀ and T_S.'
                }
              },
              {
                title: {
                  tr: '3. İntegral Çarpanı μ(t) = e^(pt) ve Trigonometrik İntegral',
                  en: '3. Integrating Factor μ(t) = e^(pt) and Trigonometric Integral'
                },
                why: {
                  tr: 'Sağ tarafta sin(ωt) varken integral çarpanı nasıl uygulanır?',
                  en: 'How do we integrate when the forcing term on the right-hand side is sin(ωt)?'
                },
                formula: '<mfrac><mi>d</mi><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mrow><mo>[</mo><msup><mi>e</mi><mrow><mi>p</mi><mi>t</mi></mrow></msup><mi>θ</mi><mo>]</mo></mrow><mo>=</mo><mfrac><msub><mi>T</mi><mn>1</mn></msub><mi>τ</mi></mfrac><msup><mi>e</mi><mrow><mi>p</mi><mi>t</mi></mrow></msup><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mo>∫</mo><msup><mi>e</mi><mrow><mi>p</mi><mi>t</mi></mrow></msup><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo><mi>d</mi><mi>t</mi><mo>=</mo><mfrac><msup><mi>e</mi><mrow><mi>p</mi><mi>t</mi></mrow></msup><mrow><msup><mi>p</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup></mrow></mfrac><mrow><mo>(</mo><mi>p</mi><mi mathvariant="normal">sin</mi><mi>ω</mi><mi>t</mi><mo>−</mo><mi>ω</mi><mi mathvariant="normal">cos</mi><mi>ω</mi><mi>t</mi><mo>)</mo></mrow>',
                note: {
                  tr: 'İki kez kısmi integrasyon veya belirsiz katsayılar yöntemiyle p·sin(ωt) − ω·cos(ωt) = √(p² + ω²)·sin(ωt − φ) tek bir faz kaymalı sinüse dönüştürülür.',
                  en: 'Using integration by parts twice (or undetermined coefficients), the combination p·sin(ωt) − ω·cos(ωt) is written as a single phase-shifted sine wave √(p² + ω²)·sin(ωt − φ).'
                }
              },
              {
                title: {
                  tr: '4. Tam Çözüm: Geçici (Transient) + Kalıcı (Steady-State) Rejim',
                  en: '4. Complete Solution: Transient + Steady-State Regimes'
                },
                why: {
                  tr: 'Grafikteki ilk saatler neden kalıcı rejim formülünden farklı davranır?',
                  en: 'Why do the first few hours on the chart differ from the pure steady-state wave?'
                },
                formula: {
                  tr: '<mi>θ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><munder><mrow><mi>A</mi><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>−</mo><mi>φ</mi><mo>)</mo></mrow><mtext>kalıcı rejim</mtext></munder><mo>+</mo><munder><mrow><mi>A</mi><mi mathvariant="normal">sin</mi><mo>(</mo><mi>φ</mi><mo>)</mo><msup><mi>e</mi><mrow><mo>−</mo><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo><mi>t</mi><mo>/</mo><mi>τ</mi></mrow></msup></mrow><mtext>geçici rejim</mtext></munder><mo>,</mo><mspace width="0.6em"/><mi>A</mi><mo>=</mo><mfrac><msub><mi>T</mi><mn>1</mn></msub><msqrt><mrow><msup><mrow><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mi>τ</mi><mi>ω</mi><mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mfrac>',
                  en: '<mi>θ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><munder><mrow><mi>A</mi><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>−</mo><mi>φ</mi><mo>)</mo></mrow><mtext>steady-state</mtext></munder><mo>+</mo><munder><mrow><mi>A</mi><mi mathvariant="normal">sin</mi><mo>(</mo><mi>φ</mi><mo>)</mo><msup><mi>e</mi><mrow><mo>−</mo><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo><mi>t</mi><mo>/</mo><mi>τ</mi></mrow></msup></mrow><mtext>transient</mtext></munder><mo>,</mo><mspace width="0.6em"/><mi>A</mi><mo>=</mo><mfrac><msub><mi>T</mi><mn>1</mn></msub><msqrt><mrow><msup><mrow><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mi>τ</mi><mi>ω</mi><mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mfrac>'
                },
                note: {
                  tr: 'θ(0) = 0 koşulu C = A·sin(φ) sabitini üretir. Bu pozitif üstel terim sönümlenene kadar ilk tepedeki sıcaklık T_S + A değerini biraz aşabilir!',
                  en: 'Enforcing θ(0) = 0 produces the integration constant C = A·sin(φ). Until this positive exponential transient decays, the first indoor peak can slightly exceed T_S + A!'
                }
              },
              {
                title: {
                  tr: '5. Mühendislik Tasarım Eşitsizliği (Örnek 3.2)',
                  en: '5. Engineering Design Inequality (Example 3.2)'
                },
                why: {
                  tr: 'Kalıcı iç salınımı A ≤ 3 °C tutmak için K₂/K₁ oranı nasıl seçilir?',
                  en: 'How do we choose the gain ratio K₂/K₁ to keep steady-state swings within A ≤ 3 °C?'
                },
                formula: {
                  tr: '<mfrac><mn>12</mn><msqrt><mrow><msup><mrow><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mi>π</mi><mo>/</mo><mn>3</mn><mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mfrac><mo>≤</mo><mn>3</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mi>r</mi><mo>≥</mo><msqrt><mrow><mn>16</mn><mo>−</mo><mfrac><msup><mi>π</mi><mn>2</mn></msup><mn>9</mn></mfrac></mrow></msqrt><mo>−</mo><mn>1</mn><mo>≈</mo><mn>2,86049</mn>',
                  en: '<mfrac><mn>12</mn><msqrt><mrow><msup><mrow><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mi>π</mi><mo>/</mo><mn>3</mn><mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mfrac><mo>≤</mo><mn>3</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mi>r</mi><mo>≥</mo><msqrt><mrow><mn>16</mn><mo>−</mo><mfrac><msup><mi>π</mi><mn>2</mn></msup><mn>9</mn></mfrac></mrow></msqrt><mo>−</mo><mn>1</mn><mo>≈</mo><mn>2.86049</mn>'
                },
                note: {
                  tr: 'τ = 4 sa ve periyot 24 sa (ω = π/12) için τω = π/3 olur. Eşitsizlik çözüldüğünde r ≥ 2,86049 bulunur.',
                  en: 'With τ = 4 hr and a 24 hr period (ω = π/12), we have τω = π/3. Solving the inequality gives r ≥ 2.86049.'
                }
              }
            ]
          },
          examBlueprint: [
            {
              step: {
                tr: '01 · Denklem Tipini Tanı',
                en: '01 · Identify the ODE Type'
              },
              detail: {
                tr: 'Ortam sıcaklığı Tₘ sabit mi, yoksa T_A(t) zamana bağlı mı? Sabitse değişkenleri ayır (§2.1); zamana bağlıysa standart doğrusal forma dT/dt + p(t)T = q(t) getirip integral çarpanı μ(t) = e^(∫p dt) kullan (§2.4).',
                en: 'Is the ambient temperature Tₘ constant, or does T_A(t) vary with time? If constant, separate variables (§2.1); if time-varying, put into standard linear form dT/dt + p(t)T = q(t) and use the integrating factor μ(t) = e^(∫p dt) (§2.4).'
              }
            },
            {
              step: {
                tr: '02 · Zaman Referansını (t = 0) Sabitle',
                en: '02 · Fix the Time Origin (t = 0)'
              },
              detail: {
                tr: 'Soru saat veriyorsa (ör. 18:00, 19:00 veya 08:00), bir başlangıç anını t = 0 seç. "Toplam geçen süre" ile "gözlemden sonraki ek süre" veya "ölüm saati (t < 0)" farkını mutlaka yaz.',
                en: 'When clock times are given (e.g., 6:00 p.m., 7:00 p.m., or 8:00 a.m.), explicitly anchor t = 0. Always distinguish between total elapsed time, additional remaining time after a reading, or backward time (t < 0).'
              }
            },
            {
              step: {
                tr: '03 · Sıcaklığı Değil, Farkı (θ) İzle',
                en: '03 · Track the Difference (θ), Not Raw T'
              },
              detail: {
                tr: 'Sabit ortamda yarılanan büyüklük T(t) değil, θ(t) = T(t) − Tₘ farkıdır. T(t) = Tᵢ·e^(−kt) yazmak sınavdaki en büyük tuzaktır.',
                en: 'In a constant medium, the quantity that halves is θ(t) = T(t) − Tₘ, not T(t). Writing T(t) = Tᵢ·e^(−kt) is the single most common exam mistake.'
              }
            },
            {
              step: {
                tr: '04 · Geçici ve Kalıcı Rejimi Ayır',
                en: '04 · Separate Transient & Steady-State'
              },
              detail: {
                tr: 'Sinüzoidal dış etkide e^(−pt) terimi t → ∞ iken sıfırlanır (geçici rejim). Maksimum/minimum kalıcı sıcaklık sorulduğunda R·sin(ωt − φ) ifadesinin ±R sınırlarını ortalama sıcaklığa ekle.',
                en: 'Under sinusoidal forcing, the e^(−pt) term vanishes as t → ∞ (transient). When asked for long-term maximum/minimum temperatures, add ±R of the steady-state wave R·sin(ωt − φ) to the mean temperature.'
              }
            }
          ],
          examClinic: [
            {
              id: 'problem-3-1',
              badge: {
                tr: 'PROBLEM 3.1 · s.130 (ADLİ TIP & DEĞİŞKEN ORTAM)',
                en: 'PROBLEM 3.1 · p. 130 (FORENSICS & VARIABLE MEDIUM)'
              },
              title: {
                tr: 'Zamanla Değişen Ortamda Ölüm Saati Tayini',
                en: 'Estimating Time of Death in a Cooling Environment'
              },
              statement: {
                tr: 'Bir olay yerinde saat 18:00’de (t = 0) cesedin sıcaklığı 33 °C ölçülüyor. 1 saat sonra (19:00, t = 1) sıcaklık 31,5 °C’ye düşüyor. Olay yerindeki ortam sıcaklığı sabit olmayıp t = 0 (18:00) referansıyla ±3 saatlik pencerede Tₘ(t) = 20·e^(−0,02t) °C olarak modelleniyor. Canlı insan vücut sıcaklığı 37 °C olduğuna göre ölüm saat kaçta gerçekleşmiştir?',
                en: 'At a crime scene at 6:00 p.m. (t = 0), a body’s temperature is measured as 33 °C. One hour later (7:00 p.m., t = 1), it drops to 31.5 °C. The surrounding temperature is not constant, but decays according to Tₘ(t) = 20·e^(−0.02t) °C within ±3 hours of t = 0. Assuming a normal body temperature of 37 °C, when did death occur?'
              },
              trap: {
                tr: 'Kritik sınav tuzağı: Ortam sıcaklığı Tₘ(t) = 20e^(−0,02t) zamana bağlı olduğu için bu denklem değişkenlerine AYRILAMAZ! Doğrudan T = Tₘ + C·e^(−kt) yazarsan tüm puan gider; birinci mertebe doğrusal denklem (integral çarpanı) kurulmalıdır.',
                en: 'Critical exam trap: Because ambient temperature Tₘ(t) = 20e^(−0.02t) depends on t, this ODE is NOT separable! Writing T = Tₘ + C·e^(−kt) loses full credit; you must set up a first-order linear ODE and use an integrating factor.'
              },
              steps: [
                {
                  label: {
                    tr: '1. Doğrusal diferansiyel denklemi ve integral çarpanını kur',
                    en: '1. Set up the linear ODE and integrating factor'
                  },
                  math: {
                    tr: '<mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mi>k</mi><mi>T</mi><mo>=</mo><mn>20</mn><mi>k</mi><msup><mi>e</mi><mrow><mo>−</mo><mn>0,02</mn><mi>t</mi></mrow></msup><mo>,</mo><mspace width="0.6em"/><mi>μ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msup><mi>e</mi><mrow><mi>k</mi><mi>t</mi></mrow></msup>',
                    en: '<mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mi>k</mi><mi>T</mi><mo>=</mo><mn>20</mn><mi>k</mi><msup><mi>e</mi><mrow><mo>−</mo><mn>0.02</mn><mi>t</mi></mrow></msup><mo>,</mo><mspace width="0.6em"/><mi>μ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msup><mi>e</mi><mrow><mi>k</mi><mi>t</mi></mrow></msup>'
                  },
                  text: {
                    tr: 'Newton yasası dT/dt = −k(T − 20e^(−0,02t)) standart doğrusal forma taşınır ve her iki taraf e^(kt) ile çarpılır.',
                    en: 'Newton’s law dT/dt = −k(T − 20e^(−0.02t)) is rearranged into standard linear form and multiplied by e^(kt).'
                  }
                },
                {
                  label: {
                    tr: '2. İntegrali al ve t = 0 (18:00) başlangıç koşulunu uygula',
                    en: '2. Integrate and apply the initial condition at t = 0 (6:00 p.m.)'
                  },
                  math: {
                    tr: '<mi>T</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mi>C</mi><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup><mo>+</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0,02</mn></mrow></mfrac><msup><mi>e</mi><mrow><mo>−</mo><mn>0,02</mn><mi>t</mi></mrow></msup><mo>,</mo><mspace width="0.6em"/><mi>T</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><mn>33</mn><mo>⇒</mo><mi>C</mi><mo>=</mo><mn>33</mn><mo>−</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0,02</mn></mrow></mfrac>',
                    en: '<mi>T</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mi>C</mi><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup><mo>+</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0.02</mn></mrow></mfrac><msup><mi>e</mi><mrow><mo>−</mo><mn>0.02</mn><mi>t</mi></mrow></msup><mo>,</mo><mspace width="0.6em"/><mi>T</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><mn>33</mn><mo>⇒</mo><mi>C</mi><mo>=</mo><mn>33</mn><mo>−</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0.02</mn></mrow></mfrac>'
                  },
                  text: {
                    tr: 't = 0 anında T(0) = 33 °C kullanılarak C sabiti k cinsinden ifade edilir.',
                    en: 'Using T(0) = 33 °C at t = 0 expresses the integration constant C in terms of k.'
                  }
                },
                {
                  label: {
                    tr: '3. t = 1 (19:00) gözlemiyle k katsayısını sayısal olarak çöz',
                    en: '3. Solve numerically for k using the t = 1 (7:00 p.m.) observation'
                  },
                  math: {
                    tr: '<mi>T</mi><mo>(</mo><mn>1</mn><mo>)</mo><mo>=</mo><mrow><mo>(</mo><mn>33</mn><mo>−</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0,02</mn></mrow></mfrac><mo>)</mo></mrow><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi></mrow></msup><mo>+</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0,02</mn></mrow></mfrac><msup><mi>e</mi><mrow><mo>−</mo><mn>0,02</mn></mrow></msup><mo>=</mo><mn>31,5</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mi>k</mi><mo>≈</mo><mn>0,1228</mn><msup><mtext> sa</mtext><mrow><mo>−</mo><mn>1</mn></mrow></msup>',
                    en: '<mi>T</mi><mo>(</mo><mn>1</mn><mo>)</mo><mo>=</mo><mrow><mo>(</mo><mn>33</mn><mo>−</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0.02</mn></mrow></mfrac><mo>)</mo></mrow><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi></mrow></msup><mo>+</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0.02</mn></mrow></mfrac><msup><mi>e</mi><mrow><mo>−</mo><mn>0.02</mn></mrow></msup><mo>=</mo><mn>31.5</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mi>k</mi><mo>≈</mo><mn>0.1228</mn><msup><mtext> hr</mtext><mrow><mo>−</mo><mn>1</mn></mrow></msup>'
                  },
                  text: {
                    tr: 'Bu denklemde k ≈ 0,1228 sa⁻¹ ve C ≈ 33 − 23,891 = 9,109 bulunur.',
                    en: 'Solving this transcendental equation gives k ≈ 0.1228 hr⁻¹ and C ≈ 33 − 23.891 = 9.109.'
                  }
                },
                {
                  label: {
                    tr: '4. T(t*) = 37 °C koşulundan ölüm anı t* ve saati bul',
                    en: '4. Find time of death t* from T(t*) = 37 °C'
                  },
                  math: {
                    tr: '<mn>9,109</mn><msup><mi>e</mi><mrow><mo>−</mo><mn>0,1228</mn><msup><mi>t</mi><mo>*</mo></msup></mrow></msup><mo>+</mo><mn>23,891</mn><msup><mi>e</mi><mrow><mo>−</mo><mn>0,02</mn><msup><mi>t</mi><mo>*</mo></msup></mrow></msup><mo>=</mo><mn>37</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><msup><mi>t</mi><mo>*</mo></msup><mo>≈</mo><mo>−</mo><mn>2,30</mn><mtext> sa</mtext><mo>=</mo><mo>−</mo><mn>2</mn><mtext> sa </mtext><mn>18</mn><mtext> dk</mtext>',
                    en: '<mn>9.109</mn><msup><mi>e</mi><mrow><mo>−</mo><mn>0.1228</mn><msup><mi>t</mi><mo>*</mo></msup></mrow></msup><mo>+</mo><mn>23.891</mn><msup><mi>e</mi><mrow><mo>−</mo><mn>0.02</mn><msup><mi>t</mi><mo>*</mo></msup></mrow></msup><mo>=</mo><mn>37</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><msup><mi>t</mi><mo>*</mo></msup><mo>≈</mo><mo>−</mo><mn>2.30</mn><mtext> hr</mtext><mo>=</mo><mo>−</mo><mn>2</mn><mtext> hr </mtext><mn>18</mn><mtext> min</mtext>'
                  },
                  text: {
                    tr: '18:00’den 2 saat 18 dakika geriye gidildiğinde ölüm saati 15:42 (3:42 p.m.) olarak bulunur.',
                    en: 'Counting back 2 hours 18 minutes from 6:00 p.m. places the time of death at 3:42 p.m. (15:42).'
                  }
                }
              ]
            },
            {
              id: 'problem-3-2',
              badge: {
                tr: 'PROBLEM 3.2 · s.130 (ATÖLYE HAVALANDIRMASI)',
                en: 'PROBLEM 3.2 · p. 130 (WORKSHOP VENTILATION)'
              },
              title: {
                tr: 'Isıtıcısız Atölyede Günlük Sıcaklık Ekstremumları',
                en: 'Daily Temperature Extrema in an Unheated Workshop'
              },
              statement: {
                tr: 'Büyük bir atölyenin havalandırma sistemi nedeniyle soğuma/ısınma sabiti k (sa⁻¹) olarak veriliyor. Dış atmosfer sıcaklığı 24 saatlik periyotla sinüzoidal değişiyor; gece 02:00’de minimum 15 °C, öğleden sonra 14:00’te maksimum 35 °C oluyor. Saat 08:00’i t = 0 başlangıcı alarak: (1) T(t) diferansiyel denklemini kurun, (2) Kalıcı rejim çözümünü bulun, (3) k = 0,2 sa⁻¹ için atölyenin ulaşacağı maksimum ve minimum sıcaklıkları hesaplayın.',
                en: 'A large unheated workshop has ventilation response constant k (hr⁻¹). Outdoor temperature varies sinusoidally with a 24-hour period, reaching a minimum of 15 °C at 2:00 a.m. and a maximum of 35 °C at 2:00 p.m. Taking 8:00 a.m. as t = 0: (1) Formulate the ODE for T(t), (2) Find the steady-state response, and (3) Compute the maximum and minimum workshop temperatures for k = 0.2 hr⁻¹.'
              },
              trap: {
                tr: 'Kritik sınav tuzağı: Dış sıcaklığın 02:00’de minimum (15 °C), 14:00’te maksimum (35 °C) olması ve t = 0’ın saat 08:00 seçilmesi! 08:00 tam orta noktadır (25 °C) ve sıcaklık yükselmektedir; bu yüzden T_A(t) = 25 + 10·sin(πt/12) olur.',
                en: 'Critical exam trap: Minimum (15 °C) is at 2:00 a.m., maximum (35 °C) is at 2:00 p.m., and t = 0 is chosen at 8:00 a.m.! Because 8:00 a.m. is the exact midpoint (25 °C) while temperature is rising, the outdoor function is T_A(t) = 25 + 10·sin(πt/12) with zero initial phase shift.'
              },
              steps: [
                {
                  label: {
                    tr: '1. Dış ortam fonksiyonunu ve diferansiyel denklemi kur',
                    en: '1. Construct the outdoor temperature function and ODE'
                  },
                  math: '<msub><mi>T</mi><mi>A</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mn>25</mn><mo>+</mo><mn>10</mn><mi mathvariant="normal">sin</mi><mrow><mo>(</mo><mfrac><mrow><mi>π</mi><mi>t</mi></mrow><mn>12</mn></mfrac><mo>)</mo></mrow><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mi>k</mi><mi>T</mi><mo>=</mo><mi>k</mi><mrow><mo>[</mo><mn>25</mn><mo>+</mo><mn>10</mn><mi mathvariant="normal">sin</mi><mrow><mo>(</mo><mfrac><mrow><mi>π</mi><mi>t</mi></mrow><mn>12</mn></mfrac><mo>)</mo></mrow><mo>]</mo></mrow>',
                  text: {
                    tr: 'Ortalama (15+35)/2 = 25 °C, genlik (35−15)/2 = 10 °C ve ω = 2π/24 = π/12 sa⁻¹.',
                    en: 'Mean temperature is (15+35)/2 = 25 °C, amplitude is (35−15)/2 = 10 °C, and ω = 2π/24 = π/12 hr⁻¹.'
                  }
                },
                {
                  label: {
                    tr: '2. Kalıcı rejim (steady-state) çözümünü yaz',
                    en: '2. Write the steady-state oscillation solution'
                  },
                  math: {
                    tr: '<msub><mi>T</mi><mtext>kalıcı</mtext></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mn>25</mn><mo>+</mo><mfrac><mrow><mn>120</mn><mi>k</mi></mrow><msqrt><mrow><mn>144</mn><msup><mi>k</mi><mn>2</mn></msup><mo>+</mo><msup><mi>π</mi><mn>2</mn></msup></mrow></msqrt></mfrac><mi mathvariant="normal">sin</mi><mrow><mo>(</mo><mfrac><mrow><mi>π</mi><mi>t</mi></mrow><mn>12</mn></mfrac><mo>−</mo><mi>φ</mi><mo>)</mo></mrow><mo>,</mo><mspace width="0.5em"/><mi>φ</mi><mo>=</mo><mi mathvariant="normal">arctan</mi><mrow><mo>(</mo><mfrac><mi>π</mi><mrow><mn>12</mn><mi>k</mi></mrow></mfrac><mo>)</mo></mrow>',
                    en: '<msub><mi>T</mi><mtext>steady</mtext></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mn>25</mn><mo>+</mo><mfrac><mrow><mn>120</mn><mi>k</mi></mrow><msqrt><mrow><mn>144</mn><msup><mi>k</mi><mn>2</mn></msup><mo>+</mo><msup><mi>π</mi><mn>2</mn></msup></mrow></msqrt></mfrac><mi mathvariant="normal">sin</mi><mrow><mo>(</mo><mfrac><mrow><mi>π</mi><mi>t</mi></mrow><mn>12</mn></mfrac><mo>−</mo><mi>φ</mi><mo>)</mo></mrow><mo>,</mo><mspace width="0.5em"/><mi>φ</mi><mo>=</mo><mi mathvariant="normal">arctan</mi><mrow><mo>(</mo><mfrac><mi>π</mi><mrow><mn>12</mn><mi>k</mi></mrow></mfrac><mo>)</mo></mrow>'
                  },
                  text: {
                    tr: 'Pay ve payda 12 ile genişletildiğinde genlik A = 10k / √(k² + (π/12)²) = 120k / √(144k² + π²) biçimini alır.',
                    en: 'Multiplying numerator and denominator by 12 expresses the amplitude as A = 10k / √(k² + (π/12)²) = 120k / √(144k² + π²).'
                  }
                },
                {
                  label: {
                    tr: '3. k = 0,2 sa⁻¹ için genliği ve ekstremum sıcaklıkları hesapla',
                    en: '3. Compute amplitude and extreme temperatures for k = 0.2 hr⁻¹'
                  },
                  math: {
                    tr: '<mi>A</mi><mo>=</mo><mfrac><mrow><mn>120</mn><mo>(</mo><mn>0,2</mn><mo>)</mo></mrow><msqrt><mrow><mn>144</mn><mo>(</mo><mn>0,04</mn><mo>)</mo><mo>+</mo><msup><mi>π</mi><mn>2</mn></msup></mrow></msqrt></mfrac><mo>=</mo><mfrac><mn>24</mn><msqrt><mrow><mn>5,76</mn><mo>+</mo><mn>9,8696</mn></mrow></msqrt></mfrac><mo>≈</mo><mn>6,07</mn><mtext> °C</mtext>',
                    en: '<mi>A</mi><mo>=</mo><mfrac><mrow><mn>120</mn><mo>(</mo><mn>0.2</mn><mo>)</mo></mrow><msqrt><mrow><mn>144</mn><mo>(</mo><mn>0.04</mn><mo>)</mo><mo>+</mo><msup><mi>π</mi><mn>2</mn></msup></mrow></msqrt></mfrac><mo>=</mo><mfrac><mn>24</mn><msqrt><mrow><mn>5.76</mn><mo>+</mo><mn>9.8696</mn></mrow></msqrt></mfrac><mo>≈</mo><mn>6.07</mn><mtext> °C</mtext>'
                  },
                  text: {
                    tr: 'Buradan T_max = 25 + 6,07 ≈ 31,1 °C ve T_min = 25 − 6,07 ≈ 18,9 °C bulunur (Kitap cevabı: 18,9 °C ve 31,1 °C).',
                    en: 'Thus T_max = 25 + 6.07 ≈ 31.1 °C and T_min = 25 − 6.07 ≈ 18.9 °C (Textbook answer: 18.9 °C and 31.1 °C).'
                  }
                }
              ]
            }
          ]
        },
        questions: [
          {
            title: {
              tr: 'Toplam süre mi, kalan süre mi?',
              en: 'Total time or remaining time?'
            },
            tag: {
              tr: 'ÖRNEK 3.1 · KALİBRASYON',
              en: 'EXAMPLE 3.1 · CALIBRATION'
            },
            difficulty: {
              tr: 'Temel / Vize',
              en: 'Core / Midterm'
            },
            text: {
              tr: 'Ortam 20 °C. Cisim 100 °C’den 20 dakikada 60 °C’ye soğuyor. Bu gözlemden sonra 30 °C’ye inmesi için kaç dakika daha gerekir?',
              en: 'Ambient temperature is 20 °C. A body cools from 100 °C to 60 °C in 20 minutes. How many more minutes after this observation are required for it to reach 30 °C?'
            },
            unit: {
              tr: 'dakika',
              en: 'minutes'
            },
            answer: 40,
            tolerance: 0.1,
            feedback: {
              tr: 'Doğru. Sıcaklık farkı her 20 dakikada yarılanır: 80 → 40 → 20 → 10. Toplam 60, gözlemden sonra 40 dakika.',
              en: 'Correct. The temperature difference halves every 20 minutes: 80 → 40 → 20 → 10. That takes 60 minutes total, or 40 more minutes after the observation.'
            },
            solutionSummary: {
              tr: 'θ(t) = T(t) − 20 farkı t = 0’da 80 °C, t = 20 dk’da 40 °C’dir. Yarılanma süresi 20 dk olduğundan 30 °C (θ = 10 °C) için toplam 3 yarılanma (60 dk), gözlemden sonra 60 − 20 = 40 dk gerekir.',
              en: 'The difference θ(t) = T(t) − 20 is 80 °C at t = 0 and 40 °C at t = 20 min. With a 20-minute half-life, reaching 30 °C (θ = 10 °C) takes 3 halvings (60 min total), so 60 − 20 = 40 additional minutes.'
            },
            hints: {
              tr: [
                'Sıcaklığın kendisini değil, 20 °C ortamla arasındaki farkı izle.',
                'Fark ilk 20 dakikada 80’den 40’a düşüyor. 30 °C için farkın 10 olması gerekiyor.',
                '40 → 20 → 10 için iki yarılanma daha gerekir. Her biri 20 dakikadır.'
              ],
              en: [
                'Track the difference relative to the 20 °C ambient medium, not the raw temperature.',
                'In the first 20 minutes the difference drops from 80 to 40. At 30 °C the difference is 10.',
                'Going from 40 → 20 → 10 takes two additional halvings of 20 minutes each.'
              ]
            }
          },
          {
            title: {
              tr: 'Aynı denge, farklı hız',
              en: 'Same equilibrium, different rate'
            },
            tag: {
              tr: 'KAVRAM KONTROLÜ',
              en: 'CONCEPT CHECK'
            },
            difficulty: {
              tr: 'Temel',
              en: 'Core'
            },
            text: {
              tr: 'Başlangıç ve ortam sıcaklıkları sabitken k iki katına çıkarılıyor. Sıcaklık farkının yarılanma süresi nasıl değişir?',
              en: 'While holding initial and ambient temperatures fixed, the proportionality constant k is doubled. How does the half-life of the temperature difference change?'
            },
            choices: {
              tr: ['İki katına çıkar.', 'Yarıya iner.', 'Değişmez.'],
              en: ['It doubles.', 'It is halved.', 'It stays the same.']
            },
            answer: 1,
            feedback: {
              tr: 'Doğru. t½ = ln(2)/k olduğundan k iki katına çıkınca yarılanma süresi yarıya iner.',
              en: 'Correct. Because t½ = ln(2)/k, doubling k cuts the half-life in half.'
            },
            solutionSummary: {
              tr: 'e^(−kt½) = 1/2 eşitliğinden t½ = ln(2)/k bulunur; yarılanma süresi başlangıç sıcaklığından bağımsız, k ile ters orantılıdır.',
              en: 'From e^(−kt½) = 1/2 we find t½ = ln(2)/k; the half-life is independent of initial temperature and inversely proportional to k.'
            },
            hints: {
              tr: [
                'Yarılanma süresinin formülünde k’nın nerede durduğuna bak.',
                'Süre k ile ters orantılıdır.'
              ],
              en: [
                'Look at where k appears in the half-life formula.',
                'Half-life is inversely proportional to k.'
              ]
            }
          },
          {
            title: {
              tr: 'Dengeye ne zaman ulaşılır?',
              en: 'When is exact equilibrium reached?'
            },
            tag: {
              tr: 'MODELİ YORUMLA',
              en: 'MODEL INTERPRETATION'
            },
            difficulty: {
              tr: 'Temel',
              en: 'Core'
            },
            text: {
              tr: '100 °C’den başlayan cisim 20 °C ortamda Newton yasasına göre soğuyor. Matematiksel modelde sıcaklığı tam 20 °C hangi sonlu anda olur?',
              en: 'A body starting at 100 °C cools in a 20 °C room according to Newton’s law. At what finite time t does the mathematical model reach exactly 20 °C?'
            },
            choices: {
              tr: [
                'Bir zaman sabiti sonra.',
                'Yeterince büyük herhangi bir sonlu zamanda.',
                'Hiçbir sonlu zamanda; asimptotik yaklaşır.'
              ],
              en: [
                'After one thermal time constant.',
                'At any sufficiently large finite time.',
                'At no finite time; it approaches asymptotically.'
              ]
            },
            answer: 2,
            feedback: {
              tr: 'Doğru. 80e⁻ᵏᵗ, sonlu t için pozitiftir. Cisim 20 °C’ye yaklaşır; modelde tam eşitlik sonlu zamanda oluşmaz.',
              en: 'Correct. Since 80e⁻ᵏᵗ > 0 for every finite t, the temperature approaches 20 °C asymptotically without reaching exact equality in finite time.'
            },
            solutionSummary: {
              tr: 'Her sonlu t ∈ ℝ için e^(−kt) > 0 olduğundan T(t) − 20 = 80e^(−kt) > 0 kalır; dengeye ancak t → ∞ limitinde yaklaşılır.',
              en: 'Because e^(−kt) > 0 for all finite t ∈ ℝ, T(t) − 20 = 80e^(−kt) remains strictly positive; equilibrium is approached in the limit t → ∞.'
            },
            hints: {
              tr: [
                'T(t) − 20 ifadesini yaz.',
                'e⁻ᵏᵗ, sonlu bir t için tam sıfır olabilir mi?'
              ],
              en: [
                'Write out the expression for T(t) − 20.',
                'Can e⁻ᵏᵗ ever equal zero for a finite value of t?'
              ]
            }
          },
          {
            title: {
              tr: 'Binanın sıcaklığını sınırla',
              en: 'Bound the building temperature swing'
            },
            tag: {
              tr: 'ÖRNEK 3.2 · TASARIM',
              en: 'EXAMPLE 3.2 · DESIGN'
            },
            difficulty: {
              tr: 'Vize / Final',
              en: 'Midterm / Final'
            },
            text: {
              tr: 'Dış sıcaklık genliği 12 °C, c/K₁ = 4 saat ve periyot 24 saat. Kalıcı iç sıcaklık genliği en fazla 3 °C olacaksa en küçük K₂/K₁ oranı yaklaşık kaçtır?',
              en: 'Outdoor temperature amplitude is 12 °C, c/K₁ = 4 hours, and the period is 24 hours. To keep the steady-state indoor amplitude within 3 °C, what is the minimum required ratio K₂/K₁?'
            },
            unit: {
              tr: 'oran · 2 ondalık yeterli',
              en: 'ratio · 2 decimals'
            },
            answer: Math.sqrt(16 - (Math.PI / 3) ** 2) - 1,
            tolerance: 0.015,
            feedback: {
              tr: 'Doğru. 12/√[(1+r)²+(π/3)²] ≤ 3 koşulu r ≥ 2,86049 verir. Bu sınır kalıcı rejim içindir.',
              en: 'Correct. Requiring 12/√[(1+r)²+(π/3)²] ≤ 3 yields r ≥ 2.86049. This bound applies to the steady-state regime.'
            },
            solutionSummary: {
              tr: 'ω = π/12 sa⁻¹ ve τω = π/3 için A = 12 / √((1+r)² + (π/3)²) ≤ 3 eşitsizliğinden (1+r)² ≥ 16 − π²/9 ve r ≥ 2,8605 elde edilir.',
              en: 'With ω = π/12 hr⁻¹ and τω = π/3, solving A = 12 / √((1+r)² + (π/3)²) ≤ 3 gives (1+r)² ≥ 16 − π²/9, hence r ≥ 2.8605.'
            },
            hints: {
              tr: [
                'ω = 2π/24 = π/12. Dolayısıyla τω = π/3.',
                'Genlik formülünde A ≤ 3 yaz: 12/√[(1+r)²+(π/3)²] ≤ 3.',
                'Payda en az 4 olmalı. (1+r)² ≥ 16 − (π/3)² eşitsizliğini çöz.'
              ],
              en: [
                'ω = 2π/24 = π/12, so τω = π/3.',
                'Set A ≤ 3 in the amplitude formula: 12/√[(1+r)²+(π/3)²] ≤ 3.',
                'The denominator must be at least 4. Solve (1+r)² ≥ 16 − (π/3)².'
              ]
            }
          },
          {
            title: {
              tr: 'Adli tıp: Sabit ortamda ölüm saati tayini',
              en: 'Forensics: Time of death in a constant room'
            },
            tag: {
              tr: 'VİZE KLASİĞİ · GERİYE GİDİŞ',
              en: 'MIDTERM CLASSIC · BACKWARD TIME'
            },
            difficulty: {
              tr: 'Vize',
              en: 'Midterm'
            },
            text: {
              tr: 'Sabit 20 °C sıcaklıktaki bir odada saat 18:00’de (t = 0) cesedin sıcaklığı 33 °C, 1 saat sonra (19:00, t = 1 sa) 31,5 °C ölçülüyor. Canlı vücut sıcaklığı 37 °C kabul edilirse ölüm saat 18:00’den kaç saat önce gerçekleşmiştir?',
              en: 'In a room kept at a constant 20 °C, a body is found at 6:00 p.m. (t = 0) at 33 °C, and cools to 31.5 °C one hour later (7:00 p.m., t = 1 hr). Assuming a normal body temperature of 37 °C, how many hours before 6:00 p.m. did death occur?'
            },
            unit: {
              tr: 'saat · 2 ondalık',
              en: 'hours · 2 decimals'
            },
            answer: Math.log(17 / 13) / Math.log(13 / 11.5),
            tolerance: 0.05,
            feedback: {
              tr: 'Doğru! k = ln(13 / 11,5) ≈ 0,1226 sa⁻¹ ve t* = −ln(17/13) / k ≈ −2,19 saat (yaklaşık 2 saat 11 dakika önce, yani 15:49).',
              en: 'Correct! k = ln(13 / 11.5) ≈ 0.1226 hr⁻¹ and t* = −ln(17/13) / k ≈ −2.19 hours (about 2 hours 11 minutes before 6:00 p.m., i.e., 3:49 p.m.).'
            },
            solutionSummary: {
              tr: 't = 0’da θ(0) = 33 − 20 = 13 °C, t = 1’de θ(1) = 31,5 − 20 = 11,5 °C ⇒ e^(−k) = 11,5/13 ⇒ k = ln(13/11,5) ≈ 0,1226 sa⁻¹. Ölüm anında θ(t*) = 37 − 20 = 17 °C olduğundan 13·e^(−kt*) = 17 ⇒ |t*| = ln(17/13) / ln(13/11,5) ≈ 2,19 saat.',
              en: 'At t = 0, θ(0) = 33 − 20 = 13 °C; at t = 1, θ(1) = 31.5 − 20 = 11.5 °C ⇒ e^(−k) = 11.5/13 ⇒ k = ln(13/11.5) ≈ 0.1226 hr⁻¹. At death, θ(t*) = 37 − 20 = 17 °C, so 13·e^(−kt*) = 17 ⇒ |t*| = ln(17/13) / ln(13/11.5) ≈ 2.19 hours.'
            },
            hints: {
              tr: [
                'Ortamla farkları yaz: t = 0’da θ₀ = 33 − 20 = 13 °C, t = 1’de θ₁ = 31,5 − 20 = 11,5 °C, ölüm anında θ* = 37 − 20 = 17 °C.',
                'Bir saatlik azalma oranından k = ln(13 / 11,5) ≈ 0,1226 sa⁻¹ bulunur.',
                '13·e^(k·Δt) = 17 eşitliğinden Δt = ln(17/13) / k değerini hesapla.'
              ],
              en: [
                'Write differences from room temperature: θ₀ = 33 − 20 = 13 °C at t = 0, θ₁ = 31.5 − 20 = 11.5 °C at t = 1, and θ* = 37 − 20 = 17 °C at death.',
                'From the 1-hour ratio, k = ln(13 / 11.5) ≈ 0.1226 hr⁻¹.',
                'Solve 13·e^(k·Δt) = 17 to find Δt = ln(17/13) / k.'
              ]
            }
          },
          {
            title: {
              tr: 'Problem 3.2: Atölyenin maksimum sıcaklığı',
              en: 'Problem 3.2: Maximum workshop temperature'
            },
            tag: {
              tr: 'KİTAP PROBLEM 3.2 · s.130',
              en: 'TEXTBOOK PROBLEM 3.2 · p. 130'
            },
            difficulty: {
              tr: 'Final',
              en: 'Final'
            },
            text: {
              tr: 'Havalandırma sabiti k = 0,2 sa⁻¹ olan ısıtıcısız bir atölyede dış sıcaklık T_A(t) = 25 + 10·sin(πt/12) °C olarak değişiyor (dTh/dt + k·T = k·T_A). Kalıcı rejimde atölyenin ulaşacağı maksimum sıcaklık kaç °C’dir?',
              en: 'In an unheated workshop with ventilation constant k = 0.2 hr⁻¹, outdoor temperature varies as T_A(t) = 25 + 10·sin(πt/12) °C (dT/dt + k·T = k·T_A). What is the maximum indoor temperature (°C) in steady state?'
            },
            unit: {
              tr: '°C · 1 ondalık',
              en: '°C · 1 decimal'
            },
            answer: 25 + 10 * 0.2 / Math.hypot(0.2, Math.PI / 12),
            tolerance: 0.15,
            feedback: {
              tr: 'Doğru! Kalıcı salınım genliği A = 10·k / √(k² + (π/12)²) ≈ 6,07 °C ve maksimum sıcaklık 25 + 6,07 ≈ 31,1 °C olur (Kitap s.130 cevabı: 31,1 °C).',
              en: 'Correct! The steady-state amplitude is A = 10·k / √(k² + (π/12)²) ≈ 6.07 °C, giving a maximum temperature of 25 + 6.07 ≈ 31.1 °C (Textbook p. 130 answer: 31.1 °C).'
            },
            solutionSummary: {
              tr: 'Isıtıcısız atölyede r = 0 ve τ = 1/k = 5 saattir (τω = 5π/12). Kalıcı genlik A = 10 / √(1 + (5π/12)²) = 24 / √(5,76 + π²) ≈ 6,07 °C; buradan T_max = 25 + 6,07 = 31,07 °C ≈ 31,1 °C bulunur.',
              en: 'For an unheated workshop, r = 0 and τ = 1/k = 5 hr (τω = 5π/12). The steady-state amplitude is A = 10 / √(1 + (5π/12)²) = 24 / √(5.76 + π²) ≈ 6.07 °C, so T_max = 25 + 6.07 = 31.07 °C ≈ 31.1 °C.'
            },
            hints: {
              tr: [
                'Denklem τ·dθ/dt + θ = 10·sin(ωt) biçimindedir; burada τ = 1/k = 5 saat ve ω = π/12 sa⁻¹.',
                'Kalıcı salınım genliği A = 10 / √(1 + (τω)²) veya eşdeğer olarak A = 10k / √(k² + ω²) formülüyle bulunur.',
                'Bulduğun A ≈ 6,07 °C genliğini dış ortamın ortalama sıcaklığı olan 25 °C’ye ekle.'
              ],
              en: [
                'The equation has the form τ·dθ/dt + θ = 10·sin(ωt) with τ = 1/k = 5 hr and ω = π/12 hr⁻¹.',
                'Compute the steady-state amplitude via A = 10 / √(1 + (τω)²) or equivalently A = 10k / √(k² + ω²).',
                'Add the amplitude A ≈ 6.07 °C to the 25 °C mean outdoor temperature.'
              ]
            }
          },
          {
            title: {
              tr: 'Geçici rejim mi, kalıcı rejim mi?',
              en: 'Transient vs steady-state overshoot'
            },
            tag: {
              tr: 'KAVRAMSAL DERİNLİK · SINAV TUZAĞI',
              en: 'CONCEPTUAL DEPTH · EXAM TRAP'
            },
            difficulty: {
              tr: 'Vize / Final',
              en: 'Midterm / Final'
            },
            text: {
              tr: 'Bina modelinde (Örnek 3.2) başlangıç koşulu T_B(0) = T_S = 22 °C alındığında tam çözüm θ(t) = A·sin(ωt − φ) + A·sin(φ)·e^(−(1+r)t/τ) olarak bulunuyor. Bu çözümle ilgili aşağıdaki ifadelerden hangisi doğrudur?',
              en: 'In the building model (Example 3.2) with initial condition T_B(0) = T_S = 22 °C, the complete solution is θ(t) = A·sin(ωt − φ) + A·sin(φ)·e^(−(1+r)t/τ). Which statement is true?'
            },
            choices: {
              tr: [
                'Bina sıcaklığı t ≥ 0 boyunca hiçbir zaman T_S + A değerini aşamaz.',
                'A·sin(φ)·e^(−(1+r)t/τ) terimi pozitif olduğundan, ilk periyottaki tepe sıcaklığı kalıcı rejim sınırı olan T_S + A değerini geçici olarak biraz aşabilir.',
                'Kalıcı rejim genliği A, başlangıç sıcaklığı T_B(0) değerine bağlıdır.'
              ],
              en: [
                'Indoor temperature can never exceed T_S + A for any t ≥ 0.',
                'Because the transient term A·sin(φ)·e^(−(1+r)t/τ) is positive, the first-cycle peak can temporarily exceed the steady-state bound T_S + A.',
                'The steady-state amplitude A depends on the initial indoor temperature T_B(0).'
              ]
            },
            answer: 1,
            feedback: {
              tr: 'Doğru! Başlangıçta θ(0) = 0 koşulunu dengelemek için gelen pozitif üstel terim A·sin(φ)·e^(−pt) ilk saatlerde sinüs tepesine eklenir ve geçici bir aşım (overshoot) yaratır.',
              en: 'Correct! The positive exponential transient A·sin(φ)·e^(−pt) required to satisfy θ(0) = 0 adds to the first sine peak, creating a slight transient overshoot above T_S + A.'
            },
            solutionSummary: {
              tr: 'Kalıcı genlik A başlangıç koşulundan bağımsızdır; ancak t = 0’daki geçiş terimi A·sin(φ)·e^(−pt) > 0 olduğundan tam çözümün ilk tepe değeri T_S + A sınırının biraz üzerine çıkar.',
              en: 'Steady-state amplitude A is independent of initial conditions, but because A·sin(φ)·e^(−pt) > 0 for finite t, the first peak of the complete response slightly exceeds T_S + A.'
            },
            hints: {
              tr: [
                'sin(φ) değerinin işaretini düşün (0 < φ < π/2 için pozitiftir).',
                'İlk tepe anında sin(ωt − φ) = 1 olduğunda üstel terim henüz tam sıfırlanmış mıdır?'
              ],
              en: [
                'Consider the sign of sin(φ) (positive since 0 < φ < π/2).',
                'At the first peak where sin(ωt − φ) = 1, has the exponential term decayed all the way to zero?'
              ]
            }
          },
          {
            title: {
              tr: 'Problem 3.1: Değişken ortamda hangi yöntem geçerlidir?',
              en: 'Problem 3.1: Which method applies when ambient temperature varies?'
            },
            tag: {
              tr: 'YÖNTEM SEÇİMİ · s.130',
              en: 'METHOD SELECTION · p. 130'
            },
            difficulty: {
              tr: 'Vize / Final',
              en: 'Midterm / Final'
            },
            text: {
              tr: 'Ortam sıcaklığı sabit olmayıp Tₘ(t) = 20·e^(−0,02t) şeklinde zamanla değişiyorsa, dT/dt = −k(T − Tₘ(t)) denklemini çözmek için hangi yol matematiksel olarak doğrudur?',
              en: 'When ambient temperature varies with time as Tₘ(t) = 20·e^(−0.02t), which mathematical method correctly solves dT/dt = −k(T − Tₘ(t))?'
            },
            choices: {
              tr: [
                'Değişkenleri dT/(T − Tₘ(t)) = −k dt biçiminde ayırıp iki tarafın integralini almak.',
                'Doğrudan T(t) = 20e^(−0,02t) + (Tᵢ − 20)e^(−kt) yazmak.',
                'Denklemi dT/dt + k·T = k·Tₘ(t) standart birinci mertebe doğrusal formuna getirip μ(t) = e^(kt) integral çarpanıyla çözmek.'
              ],
              en: [
                'Separate variables as dT/(T − Tₘ(t)) = −k dt and integrate both sides.',
                'Directly substitute Tₘ(t) into the constant-medium formula: T(t) = 20e^(−0.02t) + (Tᵢ − 20)e^(−kt).',
                'Rewrite as dT/dt + k·T = k·Tₘ(t) in standard first-order linear form and solve using the integrating factor μ(t) = e^(kt).'
              ]
            },
            answer: 2,
            feedback: {
              tr: 'Doğru! Tₘ(t) zamana bağlı olduğunda T − Tₘ(t) ifadesi yalnızca T’nin fonksiyonu değildir; değişkenler ayrılamaz, §2.4’teki integral çarpanı yöntemi zorunludur.',
              en: 'Correct! Because Tₘ(t) depends on t, T − Tₘ(t) is not a function of T alone; the equation is not separable and requires the integrating factor method (§2.4).'
            },
            solutionSummary: {
              tr: 'dT/dt + kT = 20k·e^(−0,02t) denklemi birinci mertebe doğrusal ve sabit olmayan sağ taraflı bir denklemdir; μ(t) = e^(kt) ile çarpılarak d/dt[T·e^(kt)] = 20k·e^((k−0,02)t) üzerinden çözülür.',
              en: 'dT/dt + kT = 20k·e^(−0.02t) is a nonhomogeneous linear first-order ODE; multiplying by μ(t) = e^(kt) gives d/dt[T·e^(kt)] = 20k·e^((k−0.02)t).'
            },
            hints: {
              tr: [
                'Tₘ(t) içinde t değişkeni varken dT/(T − Tₘ(t)) ifadesi yalnız T’ye bağlı bir diferansiyel midir?',
                'Denklemi dT/dt + P(t)T = Q(t) biçiminde düşün.'
              ],
              en: [
                'When Tₘ(t) contains t, is dT/(T − Tₘ(t)) a differential involving T alone?',
                'Put the equation into the standard linear form dT/dt + P(t)T = Q(t).'
              ]
            }
          }
        ]
      },
      generalLinearLesson,
      complementaryLesson,
      particularLesson,
      linearSummaryLesson,
      laplaceLesson,
      heavisideLesson,
      diracLesson,
      inverseLaplaceLesson,
      laplaceOdeLesson,
      laplaceAppLesson,
      laplaceSummaryLesson,
      systemsLesson,
      operatorSystemsLesson,
      laplaceSystemsLesson,
      matrixSystemsLesson,
      systemsSummaryLesson
    ],
    chapters: [
      [
        'Giriş',
        'Introduction',
        1,
        '1.1 Motive edici örnekler · s.1|1.2 Genel kavramlar ve tanımlar · s.6',
        '1.1 Motivating Examples · p. 1|1.2 General Concepts and Definitions · p. 6'
      ],
      [
        'Birinci mertebe ve basit yüksek mertebe denklemler',
        'First-Order and Simple Higher-Order Differential Equations',
        16,
        '2.1 Değişkenlerin ayrılması · s.16|2.2 Değişken dönüşümleri · s.20|2.3 Tam denklemler ve integral çarpanları · s.31|2.4 Birinci mertebe doğrusal / Bernoulli denklemleri · s.55|2.5 Bağımlı veya bağımsız değişken için çözülebilen denklemler · s.61|2.6 Basit yüksek mertebe denklemler · s.68|2.7 Özet · s.74',
        '2.1 Method of Separation of Variables · p. 16|2.2 Transformation of Variables · p. 20|2.3 Exact Equations and Integrating Factors · p. 31|2.4 Linear First-Order and Bernoulli Equations · p. 55|2.5 Equations Solvable for Dependent or Independent Variable · p. 61|2.6 Simple Higher-Order Differential Equations · p. 68|2.7 Summary · p. 74'
      ],
      [
        'Birinci mertebe denklemlerin uygulamaları',
        'Applications of First-Order and Simple Higher-Order Equations',
        87,
        '3.1 Isınma ve soğuma · s.87|3.2 Dirençli ortamda parçacık hareketi · s.91|3.3 Asılı kablolar · s.97|3.4 Elektrik devreleri · s.108|3.5 Akarsuda doğal arınma · s.114|3.6 Çeşitli uygulama problemleri · s.120',
        '3.1 Heating and Cooling · p. 87|3.2 Motion of a Particle in a Resisting Medium · p. 91|3.3 Hanging Cables · p. 97|3.4 Electric Circuits · p. 108|3.5 Natural Purification of Running Water · p. 114|3.6 Miscellaneous Application Problems · p. 120'
      ],
      [
        'Doğrusal diferansiyel denklemler',
        'Linear Differential Equations',
        140,
        '4.1 Genel doğrusal adi denklemler · s.140|4.2 Homojen çözümler ve karakteristik denklem · s.143|4.3 Özel çözümler · s.153|4.4 Euler denklemleri · s.178|4.5 Özet · s.180',
        '4.1 General Linear ODEs · p. 140|4.2 Homogeneous Solutions and Characteristic Equation · p. 143|4.3 Particular Solutions · p. 153|4.4 Cauchy–Euler Equations · p. 178|4.5 Summary · p. 180'
      ],
      [
        'Doğrusal denklemlerin uygulamaları',
        'Applications of Linear Differential Equations',
        188,
        '5.1 Tek serbestlik dereceli sistemin titreşimi · s.188|5.2 Elektrik devreleri · s.209|5.3 Hız tümseğinden geçen araç · s.213|5.4 Kiriş-kolonlar · s.218|5.5 Çeşitli uygulama problemleri · s.223',
        '5.1 Vibration of a Single-Degree-of-Freedom System · p. 188|5.2 Electric Circuits · p. 209|5.3 Vehicle Passing Over a Speed Bump · p. 213|5.4 Beam-Columns · p. 218|5.5 Miscellaneous Application Problems · p. 223'
      ],
      [
        'Laplace dönüşümü ve uygulamaları',
        'The Laplace Transform and Its Applications',
        244,
        '6.1 Laplace dönüşümü · s.244|6.2 Heaviside basamak fonksiyonu · s.249|6.3 Dirac delta ve darbe fonksiyonları · s.254|6.4 Ters Laplace dönüşümü · s.257|6.5 Laplace ile denklem çözümü · s.263|6.6 Uygulamalar · s.268|6.7 Özet · s.289',
        '6.1 The Laplace Transform · p. 244|6.2 Heaviside Unit Step Function · p. 249|6.3 Dirac Delta and Impulse Functions · p. 254|6.4 Inverse Laplace Transform · p. 257|6.5 Solving Differential Equations by Laplace Transform · p. 263|6.6 Applications · p. 268|6.7 Summary · p. 289'
      ],
      [
        'Doğrusal diferansiyel denklem sistemleri',
        'Systems of Linear Differential Equations',
        300,
        '7.1 Giriş · s.300|7.2 Operatör yöntemi · s.304|7.3 Laplace dönüşümü yöntemi · s.318|7.4 Matris yöntemi · s.325|7.5 Özet · s.347',
        '7.1 Introduction · p. 300|7.2 Operator Method · p. 304|7.3 Method of Laplace Transform · p. 318|7.4 Matrix Method · p. 325|7.5 Summary · p. 347'
      ],
      [
        'Doğrusal sistemlerin uygulamaları',
        'Applications of Systems of Linear Differential Equations',
        357,
        '8.1 Mekanik titreşimlerin modellenmesi · s.357|8.2 Ayarlı kütle sönümleyiciler · s.366|8.3 Elektrik devresi · s.372|8.4 İki katlı kesme binası · s.377',
        '8.1 Modeling of Mechanical Vibrations · p. 357|8.2 Tuned Mass Dampers · p. 366|8.3 Electric Circuits · p. 372|8.4 Two-Story Shear Building · p. 377'
      ],
      [
        'Diferansiyel denklemlerin seri çözümleri',
        'Series Solutions of Differential Equations',
        390,
        '9.1 Kuvvet serilerinin tekrarı · s.391|9.2 Adi nokta çevresinde seri çözümü · s.394|9.3 Düzenli tekil nokta ve Bessel denklemi · s.403|9.4 Özet · s.424',
        '9.1 Review of Power Series · p. 391|9.2 Series Solutions About an Ordinary Point · p. 394|9.3 Regular Singular Points and Bessel’s Equation · p. 403|9.4 Summary · p. 424'
      ],
      [
        'Sayısal çözümler',
        'Numerical Solutions of Differential Equations',
        431,
        '10.1 Birinci mertebe başlangıç değer problemleri: Euler ve Runge–Kutta · s.431|10.2 Denklem sistemlerinin sayısal çözümleri · s.445|10.3 Katı (stiff) denklemler · s.449|10.4 Özet · s.452',
        '10.1 First-Order Initial Value Problems: Euler and Runge–Kutta · p. 431|10.2 Numerical Solutions of Systems · p. 445|10.3 Stiff Differential Equations · p. 449|10.4 Summary · p. 452'
      ],
      [
        'Kısmi diferansiyel denklemler',
        'Partial Differential Equations',
        457,
        '11.1 Basit kısmi denklemler · s.457|11.2 Değişkenlerin ayrılması · s.458|11.3 Kirişlerin eğilme titreşimi · s.465|11.4 Isı iletimi · s.473|11.5 Özet · s.492',
        '11.1 Simple Partial Differential Equations · p. 457|11.2 Method of Separation of Variables · p. 458|11.3 Flexural Vibration of Beams · p. 465|11.4 Heat Conduction · p. 473|11.5 Summary · p. 492'
      ],
      [
        'Maple ile adi diferansiyel denklem çözümü',
        'Solving Ordinary Differential Equations Using Maple',
        498,
        '12.1 Kapalı biçimde çözümler · s.499|12.2 Seri çözümleri · s.512|12.3 Sayısal çözümler · s.517',
        '12.1 Closed-Form Solutions · p. 499|12.2 Series Solutions · p. 512|12.3 Numerical Solutions · p. 517'
      ]
    ]
  }
];

export function localizeBook(book, lang = 'tr') {
  return deepLocalize(book, normalizeLang(lang));
}

export function localizeLesson(lesson, lang = 'tr') {
  return deepLocalize(lesson, normalizeLang(lang));
}

export function getBook(bookId, lang) {
  const raw = BOOKS.find(b => b.id === bookId) || BOOKS[0];
  return lang ? localizeBook(raw, lang) : raw;
}

export function getLesson(lessonId, lang) {
  for (const rawBook of BOOKS) {
    const rawLesson = rawBook.lessons.find(l => l.id === lessonId);
    if (rawLesson) {
      return lang
        ? { book: localizeBook(rawBook, lang), lesson: localizeLesson(rawLesson, lang) }
        : { book: rawBook, lesson: rawLesson };
    }
  }
  const rawBook = BOOKS[0];
  return lang
    ? { book: localizeBook(rawBook, lang), lesson: localizeLesson(rawBook.lessons[0], lang) }
    : { book: rawBook, lesson: rawBook.lessons[0] };
}

export function findLessonBySection(book, sectionCode) {
  return book.lessons.find(l => l.section === sectionCode) || null;
}

export function normalizeProgressEntry(entry, questionCount = 4) {
  if (!entry || typeof entry !== 'object' || !Array.isArray(entry.solved)) {
    return { lesson: false, solved: [] };
  }
  const solved = [...new Set(entry.solved.filter(n => Number.isInteger(n) && n >= 0 && n < questionCount))];
  return { lesson: !!entry.lesson, solved };
}

export function migrateProgressStore(rawProgress, books = BOOKS) {
  const result = {};
  const questionCountFor = id => {
    for (const b of books) {
      const l = b.lessons.find(item => item.id === id);
      if (l) return l.questions.length;
    }
    return 4;
  };
  if (rawProgress && typeof rawProgress === 'object' && !Array.isArray(rawProgress)) {
    if ('lesson' in rawProgress || Array.isArray(rawProgress.solved)) {
      result[LEGACY_LESSON_ID] = normalizeProgressEntry(rawProgress, questionCountFor(LEGACY_LESSON_ID));
    } else {
      for (const [id, val] of Object.entries(rawProgress)) {
        result[id] = normalizeProgressEntry(val, questionCountFor(id));
      }
    }
  }
  for (const b of books) {
    for (const l of b.lessons) {
      if (!result[l.id]) result[l.id] = { lesson: false, solved: [] };
    }
  }
  return result;
}

export function migrateNotesStore(rawNotes, books = BOOKS) {
  const result = {};
  if (typeof rawNotes === 'string') {
    result[LEGACY_LESSON_ID] = rawNotes;
  } else if (rawNotes && typeof rawNotes === 'object' && !Array.isArray(rawNotes)) {
    for (const [id, val] of Object.entries(rawNotes)) {
      if (typeof val === 'string') result[id] = val;
    }
  }
  for (const b of books) {
    for (const l of b.lessons) {
      if (typeof result[l.id] !== 'string') result[l.id] = '';
    }
  }
  return result;
}

export function countLessonProgress(progressEntry, lesson) {
  const normalized = normalizeProgressEntry(progressEntry, lesson.questions.length);
  const total = 1 + lesson.questions.length;
  const completed = Number(normalized.lesson) + normalized.solved.length;
  return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
}
