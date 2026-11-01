export const LEGACY_LESSON_ID = 'xie-2010:3.1';

export const BOOKS = [
  {
    id: 'xie-2010',
    title: 'Differential Equations for Engineers',
    shortTitle: 'Diferansiyel Denklemler',
    author: 'Wei-Chau Xie',
    year: 2010,
    publisher: 'Cambridge University Press',
    pdfPages: 568,
    pdfPageOffset: 18,
    coverLines: ['DIFFERENTIAL', 'EQUATIONS', 'FOR ENGINEERS'],
    coverSymbol: '∫',
    summary: 'Mühendislik problemlerinden doğan adi ve kısmi diferansiyel denklemler, analitik çözüm yöntemleri, Laplace dönüşümü ve fiziksel sistem modellemesi.',
    lessons: [
      {
        id: 'xie-2010:3.1',
        section: '3.1',
        chapterNumber: '03',
        chapterTitle: 'Birinci mertebe denklemlerin uygulamaları',
        title: 'Isınma ve soğuma',
        englishTitle: 'Heating and Cooling',
        subtitle: 'Fiziksel enerji dengesinden diferansiyel denkleme, kalibrasyondan kalıcı/geçici rejim analizine ve vize/final düzeyinde problemlere.',
        pages: '87–90 (Problemler s.130)',
        pdfPages: '105–108, 148',
        lessonPath: 'lesson.md',
        mathPath: 'math.json',
        downloadName: 'isinma-ve-soguma.md',
        labFamily: 'heating-cooling',
        highlights: [
          "Newton'un soğuma yasası",
          'Değişkenleri ayırma ve kalibrasyon',
          'Geçici + kalıcı rejim ayrışımı',
          'İntegral çarpanı ve faz gecikmesi',
          'Vize & Final çözüm kliniği'
        ],
        notesPlaceholder: 'Örneğin: Sınavda t = 0 referansını seçerken veya kalıcı genliği hesaplarken hangi adımlara dikkat etmeliyim?',
        sourceSummary: 'Bu sürüm, §3.1 Heating and Cooling, basılı s.87–90 (PDF s.105–108) ve Bölüm 3 sonu problemleri (basılı s.130, Problem 3.1–3.2) temelinde hazırlanmış kapsamlı bir çalışma ve sınav hazırlık modülüdür. §2.1 (değişkenleri ayırma) ve §2.4 (birinci mertebe doğrusal denklemler / integral çarpanı) yöntemlerini birleştirir.',
        modelLimits: 'Soğuma deneyi, sabit ortam ve sabit k varsayımıyla tek sıcaklıklı (Biot sayısı Bi ≪ 1) bir cisim modeli kullanır. Bina modelinde sabit katsayılar ve sınırsız doğrusal ısıtıcı tepkisi varsayılır. Gösterilen genlik ve faz kartları kalıcı rejime aittir; grafikte başlangıç geçişini içeren tam çözüm (geçici + kalıcı) çizilir.',
        guidedTools: {
          prediction: {
            cooling: [
              {
                id: 'double-k',
                badge: 'SENARYO 1 · YARILANMA MANTIĞI',
                question: 'Tepki katsayısı k iki katına çıkarsa 20. dakikada sıcaklık ne olur?',
                prompt: 'Başlangıç 100 °C, ortam 20 °C iken Örnek 3.1’de 20. dakikada cisim 60 °C’ye iniyor (fark 80 °C → 40 °C). Tepki katsayısı k iki katına çıkarılırsa 20. dakikada cismin sıcaklığı kaç °C olur? (Yaygın tuzak: "60’ın yarısı 30 °C olur" demek!)',
                unit: '°C',
                expected: 40,
                tolerance: 0.5,
                applyPreset: { ambient: 20, initial: 100, k: Math.log(2) / 10, h: 5, time: 20 },
                explanation: 'Üstel azalan şey sıcaklığın kendisi değil, ortamla farktır (θ = T − 20). k iki katına çıkınca yarılanma süresi 20 dakikadan 10 dakikaya iner. 20 dakikada iki yarılanma gerçekleşir: fark 80 → 40 → 20 °C olur, cisim T = 20 + 20 = 40 °C sıcaklığa iner.'
              },
              {
                id: 'remaining-time',
                badge: 'SENARYO 2 · TOPLAM vs KALAN SÜRE',
                question: '60 °C’den 25 °C’ye inmek için kaç dakika DAHA gerekir?',
                prompt: 'Ortam 20 °C, başlangıç 100 °C ve 20. dakikada sıcaklık 60 °C (yarılanma süresi 20 dk). Cismin 60 °C gözleminden sonra 25 °C’ye inmesi için kaç dakika DAHA geçmelidir?',
                unit: 'dk',
                expected: 60,
                tolerance: 0.5,
                applyPreset: { ambient: 20, initial: 100, k: Math.log(2) / 20, h: 5, time: 80 },
                explanation: '25 °C’de ortamla fark 25 − 20 = 5 °C’dir. Başlangıç farkı 80 °C olduğundan 80 → 40 → 20 → 10 → 5 °C için toplam 4 yarılanma (80 dk) gerekir. Gözlem 20. dakikada (40 °C farkta) yapıldığı için 80 − 20 = 60 dakika daha gerekir.'
              },
              {
                id: 'euler-overshoot',
                badge: 'SENARYO 3 · SAYISAL YÖNTEM HATASI',
                question: 'Euler adımını h = 10 dk seçersek ilk adımda (t = 10 dk) hata hangi yönde olur?',
                prompt: 'Örnek 3.1’de (Tᵢ = 100 °C, Tₘ = 20 °C, k = ln(2)/20 ≈ 0,03466 dk⁻¹) ileri Euler yöntemiyle tek bir h = 10 dk adım atarsak T₁ = T₀ − h·k·(T₀ − Tₘ) değeri yaklaşık kaç °C verir? (Analitik değer: 76,6 °C)',
                unit: '°C',
                expected: 100 - 10 * (Math.log(2) / 20) * 80,
                tolerance: 0.6,
                applyPreset: { ambient: 20, initial: 100, k: Math.log(2) / 20, h: 10, time: 10, showEuler: true },
                explanation: 'İleri Euler başlangıçtaki en dik eğimi (−k·80) 10 dakika boyunca sabit kabul eder ve T(10) ≈ 72,3 °C bulur. Gerçekte cisim soğudukça soğuma hızı yavaşladığı için Euler eğrisi konveks analitik eğrinin (76,6 °C) altında kalır.'
              }
            ],
            building: [
              {
                id: 'open-loop',
                badge: 'SENARYO 1 · AÇIK ÇEVRİM (r = 0)',
                question: 'Termostat geri beslemesini kapatırsan (r = 0) kalıcı salınım genliği A ne olur?',
                prompt: 'Dış sıcaklık genliği T₁ = 12 °C, ısıl zaman τ = 4 saat ve periyot 24 saat (τω = π/3) iken ısıtıcı geri beslemesi kapatılırsa (r = 0) binanın kalıcı salınım genliği A yaklaşık kaç °C olur?',
                unit: '°C',
                expected: 12 / Math.hypot(1, Math.PI / 3),
                tolerance: 0.25,
                applyPreset: { tau: 4, ratio: 0, period: 24, amplitude: 12, setpoint: 22, time: 24 },
                explanation: 'r = 0 iken dahi binanın ısıl kapasitesi (τ = 4 sa) dış salınımı bir miktar sönümler: A = 12 / √(1 + (π/3)²) ≈ 8,28 °C. Ancak 3 °C tasarım sınırını sağlamak için geri besleme (r ≥ 2,86) şarttır.'
              },
              {
                id: 'double-tau',
                badge: 'SENARYO 2 · ISIL ATALET VE FAZ',
                question: 'r = 0 iken ısıl zaman sabiti τ = 4 saatten 12 saate çıkarsa kalıcı genlik A kaç °C olur?',
                prompt: 'Yalıtımı ve ısıl kütleyi artırarak τ = c/K₁ değerini 12 saate çıkardığımızı (τω = 12·π/12 = π) ve r = 0 olduğunu düşünelim. T₁ = 12 °C dış genlik altında kalıcı iç genlik A kaç °C’ye düşer?',
                unit: '°C',
                expected: 12 / Math.hypot(1, Math.PI),
                tolerance: 0.25,
                applyPreset: { tau: 12, ratio: 0, period: 24, amplitude: 12, setpoint: 22, time: 24 },
                explanation: 'τω = π olduğunda A = 12 / √(1 + π²) ≈ 3,64 °C olur. Büyük ısıl kütle (τ) alçak geçiren filtre gibi davranarak yüksek frekanslı/günlük dış salınımları bastırır ve faz gecikmesini artırır.'
              }
            ]
          },
          stepByStep: {
            cooling: [
              {
                title: '1. Fiziksel Enerji Dengesinden Diferansiyel Denkleme',
                why: 'Neden türev sıcaklık farkıyla orantılıdır?',
                formula: '<mi>m</mi><mi>c</mi><mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mi>h</mi><mi>A</mi><mo>(</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo><mspace width="0.6em"/><mo>⇒</mo><mspace width="0.6em"/><mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mi>k</mi><mo>(</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo><mo>,</mo><mspace width="0.5em"/><mi>k</mi><mo>=</mo><mfrac><mrow><mi>h</mi><mi>A</mi></mrow><mrow><mi>m</mi><mi>c</mi></mrow></mfrac><mo>&gt;</mo><mn>0</mn>',
                note: 'Cismin iç ısıl direnci yüzey taşınım direncine göre çok küçükse (Biot sayısı Bi ≪ 1), cisim tek bir T(t) sıcaklığıyla modellenir. Isı kaybı hızı yüzey alanı A ve taşınım katsayısı h ile doğru, ısıl kapasite mc ile ters orantılıdır.'
              },
              {
                title: '2. Denge Çözümü ve Değişkenlerin Ayrılması (§2.1)',
                why: 'Neden T − Tₘ’ye bölmeden önce T = Tₘ durumunu kontrol etmeliyiz?',
                formula: '<mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow></mfrac><mo>=</mo><mo>−</mo><mi>k</mi><mspace width="0.15em"/><mi>d</mi><mi>t</mi><mspace width="0.6em"/><mo>⇒</mo><mspace width="0.6em"/><mi mathvariant="normal">ln</mi><mo>|</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>|</mo><mo>=</mo><mo>−</mo><mi>k</mi><mi>t</mi><mo>+</mo><msub><mi>C</mi><mn>0</mn></msub><mspace width="0.6em"/><mo>⇒</mo><mspace width="0.6em"/><mi>T</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msub><mi>T</mi><mi>m</mi></msub><mo>+</mo><mi>C</mi><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup>',
                note: 'T(t) ≡ Tₘ sabit (denge) çözümdür. T ≠ Tₘ için değişkenler ayrılır. Mutlak değer kaldırılırken ±e^(C₀) sabiti tek bir C ∈ ℝ sabiti olarak yazılır; C = 0 seçimi denge çözümünü de geri verir.'
              },
              {
                title: '3. Başlangıç Koşulu (BDP) ve Sıcaklık Farkı Dönüşümü',
                why: 'Üstel azalan terim neden sıcaklığın kendisi değil de farktır?',
                formula: '<mi>T</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><msub><mi>T</mi><mi>i</mi></msub><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mi>C</mi><mo>=</mo><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mspace width="0.6em"/><mo>⇒</mo><mspace width="0.6em"/><mi>θ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mi>T</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>=</mo><mo>(</mo><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup>',
                note: 'Sınavlarda en sık yapılan hata T(t) = Tᵢ·e^(−kt) yazmaktır! Oysa t → ∞ iken T(t) → 0 değil, T(t) → Tₘ olmalıdır. Doğru dönüşüm θ(t) = T(t) − Tₘ fark değişkenidir.'
              },
              {
                title: '4. Ara Gözlemden Kalibrasyon: k ve Yarılanma Süresi',
                why: 'Deneyde k doğrudan verilmezse tek bir ara ölçümden nasıl bulunur?',
                formula: '<mi>k</mi><mo>=</mo><mo>−</mo><mfrac><mn>1</mn><msub><mi>t</mi><mn>1</mn></msub></mfrac><mi mathvariant="normal">ln</mi><mrow><mo>(</mo><mfrac><mrow><mi>T</mi><mo>(</mo><msub><mi>t</mi><mn>1</mn></msub><mo>)</mo><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow><mrow><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow></mfrac><mo>)</mo></mrow><mo>,</mo><mspace width="0.6em"/><msub><mi>t</mi><mrow><mn>1</mn><mo>/</mo><mn>2</mn></mrow></msub><mo>=</mo><mfrac><mrow><mi mathvariant="normal">ln</mi><mo>(</mo><mn>2</mn><mo>)</mo></mrow><mi>k</mi></mfrac><mo>,</mo><mspace width="0.6em"/><mi>τ</mi><mo>=</mo><mfrac><mn>1</mn><mi>k</mi></mfrac>',
                note: 'Örnek 3.1’de Tᵢ = 100 °C, Tₘ = 20 °C ve t₁ = 20 dk’da T(20) = 60 °C verilir. Fark oranı (60−20)/(100−20) = 40/80 = 1/2 olduğundan k = ln(2)/20 ≈ 0,03466 dk⁻¹ ve yarılanma süresi tam 20 dakikadır.'
              },
              {
                title: '5. Hedef Sıcaklık İçin Toplam Süre ve Gözlem Sonrası Ek Süre',
                why: 'Soru kökündeki "kaç dakika daha" (how much more time) ifadesi sonucu nasıl değiştirir?',
                formula: '<msub><mi>t</mi><mtext>toplam</mtext></msub><mo>=</mo><mo>−</mo><mfrac><mn>1</mn><mi>k</mi></mfrac><mi mathvariant="normal">ln</mi><mrow><mo>(</mo><mfrac><mrow><msub><mi>T</mi><mtext>hedef</mtext></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow><mrow><msub><mi>T</mi><mi>i</mi></msub><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub></mrow></mfrac><mo>)</mo></mrow><mo>=</mo><mn>60</mn><mtext> dk</mtext><mo>,</mo><mspace width="0.6em"/><mi>Δ</mi><mi>t</mi><mo>=</mo><msub><mi>t</mi><mtext>toplam</mtext></msub><mo>−</mo><msub><mi>t</mi><mn>1</mn></msub><mo>=</mo><mn>60</mn><mo>−</mo><mn>20</mn><mo>=</mo><mn>40</mn><mtext> dk</mtext>',
                note: '30 °C hedefinde ortamla fark 10 °C’dir (80 → 40 → 20 → 10 °C, yani 3 yarılanma = 60 dk). Gözlem 20. dakikada yapıldığı için kalan süre 40 dakikadır.'
              }
            ],
            building: [
              {
                title: '1. Isıl Enerji Dengesi ve Termostat Geri Beslemesi',
                why: 'Bina denklemindeki her fiziksel terim neyi temsil eder?',
                formula: '<mi>c</mi><mfrac><mrow><mi>d</mi><msub><mi>T</mi><mi>B</mi></msub></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><munder><mrow><mi>Q</mi><mo>+</mo><msub><mi>K</mi><mn>2</mn></msub><mo>(</mo><msub><mi>T</mi><mi>S</mi></msub><mo>−</mo><msub><mi>T</mi><mi>B</mi></msub><mo>)</mo></mrow><mtext>ısıtıcı girdisi</mtext></munder><mo>−</mo><munder><mrow><msub><mi>K</mi><mn>1</mn></msub><mo>(</mo><msub><mi>T</mi><mi>B</mi></msub><mo>−</mo><msub><mi>T</mi><mi>A</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>)</mo></mrow><mtext>dış ortama kayıp</mtext></munder>',
                note: 'c binanın ısıl kapasitesi, K₁ yalıtım/dış kayıp katsayısı, K₂ ise sıcaklığı T_S hedefine çeken oransal (P) termostat kazancıdır. Dış ortam T₀ sabit sıcaklığındayken T_B = T_S dengesi için baz ısıtma Q = K₁(T_S − T₀) seçilir.'
              },
              {
                title: '2. Sapma Değişkeni θ = T_B − T_S ve Standart Doğrusal Form (§2.4)',
                why: 'Denklemi neden θ = T_B − T_S, τ = c/K₁ ve r = K₂/K₁ ile yeniden yazarız?',
                formula: '<mi>τ</mi><mfrac><mrow><mi>d</mi><mi>θ</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo><mi>θ</mi><mo>=</mo><msub><mi>T</mi><mn>1</mn></msub><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo><mspace width="0.6em"/><mo>⇔</mo><mspace width="0.6em"/><mfrac><mrow><mi>d</mi><mi>θ</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mi>p</mi><mi>θ</mi><mo>=</mo><mfrac><msub><mi>T</mi><mn>1</mn></msub><mi>τ</mi></mfrac><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo><mo>,</mo><mspace width="0.5em"/><mi>p</mi><mo>=</mo><mfrac><mrow><mn>1</mn><mo>+</mo><mi>r</mi></mrow><mi>τ</mi></mfrac>',
                note: 'Q = K₁(T_S − T₀) sadeleşmesiyle sabit sıcaklıklar T₀ ve T_S denklemden düşer! Böylece kalıcı salınım genliği T₀ ve T_S seçiminden bağımsız hale gelir.'
              },
              {
                title: '3. İntegral Çarpanı μ(t) = e^(pt) ve Trigonometrik İntegral',
                why: 'Sağ tarafta sin(ωt) varken integral çarpanı nasıl uygulanır?',
                formula: '<mfrac><mi>d</mi><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mrow><mo>[</mo><msup><mi>e</mi><mrow><mi>p</mi><mi>t</mi></mrow></msup><mi>θ</mi><mo>]</mo></mrow><mo>=</mo><mfrac><msub><mi>T</mi><mn>1</mn></msub><mi>τ</mi></mfrac><msup><mi>e</mi><mrow><mi>p</mi><mi>t</mi></mrow></msup><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mo>∫</mo><msup><mi>e</mi><mrow><mi>p</mi><mi>t</mi></mrow></msup><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo><mi>d</mi><mi>t</mi><mo>=</mo><mfrac><msup><mi>e</mi><mrow><mi>p</mi><mi>t</mi></mrow></msup><mrow><msup><mi>p</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ω</mi><mn>2</mn></msup></mrow></mfrac><mrow><mo>(</mo><mi>p</mi><mi mathvariant="normal">sin</mi><mi>ω</mi><mi>t</mi><mo>−</mo><mi>ω</mi><mi mathvariant="normal">cos</mi><mi>ω</mi><mi>t</mi><mo>)</mo></mrow>',
                note: 'İki kez kısmi integrasyon veya belirsiz katsayılar yöntemiyle p·sin(ωt) − ω·cos(ωt) = √(p² + ω²)·sin(ωt − φ) tek bir faz kaymalı sinüse dönüştürülür.'
              },
              {
                title: '4. Tam Çözüm: Geçici (Transient) + Kalıcı (Steady-State) Rejim',
                why: 'Grafikteki ilk saatler neden kalıcı rejim formülünden farklı davranır?',
                formula: '<mi>θ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><munder><mrow><mi>A</mi><mi mathvariant="normal">sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>−</mo><mi>φ</mi><mo>)</mo></mrow><mtext>kalıcı rejim</mtext></munder><mo>+</mo><munder><mrow><mi>A</mi><mi mathvariant="normal">sin</mi><mo>(</mo><mi>φ</mi><mo>)</mo><msup><mi>e</mi><mrow><mo>−</mo><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo><mi>t</mi><mo>/</mo><mi>τ</mi></mrow></msup></mrow><mtext>geçici rejim</mtext></munder><mo>,</mo><mspace width="0.6em"/><mi>A</mi><mo>=</mo><mfrac><msub><mi>T</mi><mn>1</mn></msub><msqrt><mrow><msup><mrow><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mi>τ</mi><mi>ω</mi><mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mfrac>',
                note: 'θ(0) = 0 koşulu C = A·sin(φ) sabitini üretir. Bu pozitif üstel terim sönümlenene kadar ilk tepedeki sıcaklık T_S + A değerini biraz aşabilir!'
              },
              {
                title: '5. Mühendislik Tasarım Eşitsizliği (Örnek 3.2)',
                why: 'Kalıcı iç salınımı A ≤ 3 °C tutmak için K₂/K₁ oranı nasıl seçilir?',
                formula: '<mfrac><mn>12</mn><msqrt><mrow><msup><mrow><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mi>π</mi><mo>/</mo><mn>3</mn><mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mfrac><mo>≤</mo><mn>3</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mi>r</mi><mo>≥</mo><msqrt><mrow><mn>16</mn><mo>−</mo><mfrac><msup><mi>π</mi><mn>2</mn></msup><mn>9</mn></mfrac></mrow></msqrt><mo>−</mo><mn>1</mn><mo>≈</mo><mn>2,86049</mn>',
                note: 'τ = 4 sa ve periyot 24 sa (ω = π/12) için τω = π/3 olur. Eşitsizlik çözüldüğünde r ≥ 2,86049 bulunur.'
              }
            ]
          },
          examBlueprint: [
            {
              step: '01 · Denklem Tipini Tanı',
              detail: 'Ortam sıcaklığı Tₘ sabit mi, yoksa T_A(t) zamana bağlı mı? Sabitse değişkenleri ayır (§2.1); zamana bağlıysa standart doğrusal forma dT/dt + p(t)T = q(t) getirip integral çarpanı μ(t) = e^(∫p dt) kullan (§2.4).'
            },
            {
              step: '02 · Zaman Referansını (t = 0) Sabitle',
              detail: 'Soru saat veriyorsa (ör. 18:00, 19:00 veya 08:00), bir başlangıç anını t = 0 seç. "Toplam geçen süre" ile "gözlemden sonraki ek süre" veya "ölüm saati (t < 0)" farkını mutlaka yaz.'
            },
            {
              step: '03 · Sıcaklığı Değil, Farkı (θ) İzle',
              detail: 'Sabit ortamda yarılanan büyüklük T(t) değil, θ(t) = T(t) − Tₘ farkıdır. T(t) = Tᵢ·e^(−kt) yazmak sınavdaki en büyük tuzaktır.'
            },
            {
              step: '04 · Geçici ve Kalıcı Rejimi Ayır',
              detail: 'Sinüzoidal dış etkide e^(−pt) terimi t → ∞ iken sıfırlanır (geçici rejim). Maksimum/minimum kalıcı sıcaklık sorulduğunda R·sin(ωt − φ) ifadesinin ±R sınırlarını ortalama sıcaklığa ekle.'
            }
          ],
          examClinic: [
            {
              id: 'problem-3-1',
              badge: 'PROBLEM 3.1 · s.130 (ADLİ TIP & DEĞİŞKEN ORTAM)',
              title: 'Zamanla Değişen Ortamda Ölüm Saati Tayini',
              statement: 'Bir olay yerinde saat 18:00’de (t = 0) cesedin sıcaklığı 33 °C ölçülüyor. 1 saat sonra (19:00, t = 1) sıcaklık 31,5 °C’ye düşüyor. Olay yerindeki ortam sıcaklığı sabit olmayıp t = 0 (18:00) referansıyla ±3 saatlik pencerede Tₘ(t) = 20·e^(−0,02t) °C olarak modelleniyor. Canlı insan vücut sıcaklığı 37 °C olduğuna göre ölüm saat kaçta gerçekleşmiştir?',
              trap: 'Kritik sınav tuzağı: Ortam sıcaklığı Tₘ(t) = 20e^(−0,02t) zamana bağlı olduğu için bu denklem değişkenlerine AYRILAMAZ! Doğrudan T = Tₘ + C·e^(−kt) yazarsan tüm puan gider; birinci mertebe doğrusal denklem (integral çarpanı) kurulmalıdır.',
              steps: [
                {
                  label: '1. Doğrusal diferansiyel denklemi ve integral çarpanını kur',
                  math: '<mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mi>k</mi><mi>T</mi><mo>=</mo><mn>20</mn><mi>k</mi><msup><mi>e</mi><mrow><mo>−</mo><mn>0,02</mn><mi>t</mi></mrow></msup><mo>,</mo><mspace width="0.6em"/><mi>μ</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><msup><mi>e</mi><mrow><mi>k</mi><mi>t</mi></mrow></msup>',
                  text: 'Newton yasası dT/dt = −k(T − 20e^(−0,02t)) standart doğrusal forma taşınır ve her iki taraf e^(kt) ile çarpılır.'
                },
                {
                  label: '2. İntegrali al ve t = 0 (18:00) başlangıç koşulunu uygula',
                  math: '<mi>T</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mi>C</mi><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup><mo>+</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0,02</mn></mrow></mfrac><msup><mi>e</mi><mrow><mo>−</mo><mn>0,02</mn><mi>t</mi></mrow></msup><mo>,</mo><mspace width="0.6em"/><mi>T</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><mn>33</mn><mo>⇒</mo><mi>C</mi><mo>=</mo><mn>33</mn><mo>−</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0,02</mn></mrow></mfrac>',
                  text: 't = 0 anında T(0) = 33 °C kullanılarak C sabiti k cinsinden ifade edilir.'
                },
                {
                  label: '3. t = 1 (19:00) gözlemiyle k katsayısını sayısal olarak çöz',
                  math: '<mi>T</mi><mo>(</mo><mn>1</mn><mo>)</mo><mo>=</mo><mrow><mo>(</mo><mn>33</mn><mo>−</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0,02</mn></mrow></mfrac><mo>)</mo></mrow><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi></mrow></msup><mo>+</mo><mfrac><mrow><mn>20</mn><mi>k</mi></mrow><mrow><mi>k</mi><mo>−</mo><mn>0,02</mn></mrow></mfrac><msup><mi>e</mi><mrow><mo>−</mo><mn>0,02</mn></mrow></msup><mo>=</mo><mn>31,5</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mi>k</mi><mo>≈</mo><mn>0,1228</mn><msup><mtext> sa</mtext><mrow><mo>−</mo><mn>1</mn></mrow></msup>',
                  text: 'Bu denklemde k ≈ 0,1228 sa⁻¹ ve C ≈ 33 − 23,891 = 9,109 bulunur.'
                },
                {
                  label: '4. T(t*) = 37 °C koşulundan ölüm anı t* ve saati bul',
                  math: '<mn>9,109</mn><msup><mi>e</mi><mrow><mo>−</mo><mn>0,1228</mn><msup><mi>t</mi><mo>*</mo></msup></mrow></msup><mo>+</mo><mn>23,891</mn><msup><mi>e</mi><mrow><mo>−</mo><mn>0,02</mn><msup><mi>t</mi><mo>*</mo></msup></mrow></msup><mo>=</mo><mn>37</mn><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><msup><mi>t</mi><mo>*</mo></msup><mo>≈</mo><mo>−</mo><mn>2,30</mn><mtext> sa</mtext><mo>=</mo><mo>−</mo><mn>2</mn><mtext> sa </mtext><mn>18</mn><mtext> dk</mtext>',
                  text: '18:00’den 2 saat 18 dakika geriye gidildiğinde ölüm saati 15:42 (3:42 p.m.) olarak bulunur.'
                }
              ]
            },
            {
              id: 'problem-3-2',
              badge: 'PROBLEM 3.2 · s.130 (ATÖLYE HAVALANDIRMASI)',
              title: 'Isıtıcısız Atölyede Günlük Sıcaklık Ekstremumları',
              statement: 'Büyük bir atölyenin havalandırma sistemi nedeniyle soğuma/ısınma sabiti k (sa⁻¹) olarak veriliyor. Dış atmosfer sıcaklığı 24 saatlik periyotla sinüzoidal değişiyor; gece 02:00’de minimum 15 °C, öğleden sonra 14:00’te maksimum 35 °C oluyor. Saat 08:00’i t = 0 başlangıcı alarak: (1) T(t) diferansiyel denklemini kurun, (2) Kalıcı rejim çözümünü bulun, (3) k = 0,2 sa⁻¹ için atölyenin ulaşacağı maksimum ve minimum sıcaklıkları hesaplayın.',
              trap: 'Kritik sınav tuzağı: Dış sıcaklığın 02:00’de minimum (15 °C), 14:00’te maksimum (35 °C) olması ve t = 0’ın saat 08:00 seçilmesi! 08:00 tam orta noktadır (25 °C) ve sıcaklık yükselmektedir; bu yüzden T_A(t) = 25 + 10·sin(πt/12) olur.',
              steps: [
                {
                  label: '1. Dış ortam fonksiyonunu ve diferansiyel denklemi kur',
                  math: '<msub><mi>T</mi><mi>A</mi></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mn>25</mn><mo>+</mo><mn>10</mn><mi mathvariant="normal">sin</mi><mrow><mo>(</mo><mfrac><mrow><mi>π</mi><mi>t</mi></mrow><mn>12</mn></mfrac><mo>)</mo></mrow><mspace width="0.5em"/><mo>⇒</mo><mspace width="0.5em"/><mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mi>k</mi><mi>T</mi><mo>=</mo><mi>k</mi><mrow><mo>[</mo><mn>25</mn><mo>+</mo><mn>10</mn><mi mathvariant="normal">sin</mi><mrow><mo>(</mo><mfrac><mrow><mi>π</mi><mi>t</mi></mrow><mn>12</mn></mfrac><mo>)</mo></mrow><mo>]</mo></mrow>',
                  text: 'Ortalama (15+35)/2 = 25 °C, genlik (35−15)/2 = 10 °C ve ω = 2π/24 = π/12 sa⁻¹.'
                },
                {
                  label: '2. Kalıcı rejim (steady-state) çözümünü yaz',
                  math: '<msub><mi>T</mi><mtext>kalıcı</mtext></msub><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo><mn>25</mn><mo>+</mo><mfrac><mrow><mn>120</mn><mi>k</mi></mrow><msqrt><mrow><mn>144</mn><msup><mi>k</mi><mn>2</mn></msup><mo>+</mo><msup><mi>π</mi><mn>2</mn></msup></mrow></msqrt></mfrac><mi mathvariant="normal">sin</mi><mrow><mo>(</mo><mfrac><mrow><mi>π</mi><mi>t</mi></mrow><mn>12</mn></mfrac><mo>−</mo><mi>φ</mi><mo>)</mo></mrow><mo>,</mo><mspace width="0.5em"/><mi>φ</mi><mo>=</mo><mi mathvariant="normal">arctan</mi><mrow><mo>(</mo><mfrac><mi>π</mi><mrow><mn>12</mn><mi>k</mi></mrow></mfrac><mo>)</mo></mrow>',
                  text: 'Pay ve payda 12 ile genişletildiğinde genlik A = 10k / √(k² + (π/12)²) = 120k / √(144k² + π²) biçimini alır.'
                },
                {
                  label: '3. k = 0,2 sa⁻¹ için genliği ve ekstremum sıcaklıkları hesapla',
                  math: '<mi>A</mi><mo>=</mo><mfrac><mrow><mn>120</mn><mo>(</mo><mn>0,2</mn><mo>)</mo></mrow><msqrt><mrow><mn>144</mn><mo>(</mo><mn>0,04</mn><mo>)</mo><mo>+</mo><msup><mi>π</mi><mn>2</mn></msup></mrow></msqrt></mfrac><mo>=</mo><mfrac><mn>24</mn><msqrt><mrow><mn>5,76</mn><mo>+</mo><mn>9,8696</mn></mrow></msqrt></mfrac><mo>≈</mo><mn>6,07</mn><mtext> °C</mtext>',
                  text: 'Buradan T_max = 25 + 6,07 ≈ 31,1 °C ve T_min = 25 − 6,07 ≈ 18,9 °C bulunur (Kitap cevabı: 18,9 °C ve 31,1 °C).'
                }
              ]
            }
          ]
        },
        questions: [
          {
            title: 'Toplam süre mi, kalan süre mi?',
            tag: 'ÖRNEK 3.1 · KALİBRASYON',
            difficulty: 'Temel / Vize',
            text: 'Ortam 20 °C. Cisim 100 °C’den 20 dakikada 60 °C’ye soğuyor. Bu gözlemden sonra 30 °C’ye inmesi için kaç dakika daha gerekir?',
            unit: 'dakika',
            answer: 40,
            tolerance: 0.1,
            feedback: 'Doğru. Sıcaklık farkı her 20 dakikada yarılanır: 80 → 40 → 20 → 10. Toplam 60, gözlemden sonra 40 dakika.',
            solutionSummary: 'θ(t) = T(t) − 20 farkı t = 0’da 80 °C, t = 20 dk’da 40 °C’dir. Yarılanma süresi 20 dk olduğundan 30 °C (θ = 10 °C) için toplam 3 yarılanma (60 dk), gözlemden sonra 60 − 20 = 40 dk gerekir.',
            hints: [
              'Sıcaklığın kendisini değil, 20 °C ortamla arasındaki farkı izle.',
              'Fark ilk 20 dakikada 80’den 40’a düşüyor. 30 °C için farkın 10 olması gerekiyor.',
              '40 → 20 → 10 için iki yarılanma daha gerekir. Her biri 20 dakikadır.'
            ]
          },
          {
            title: 'Aynı denge, farklı hız',
            tag: 'KAVRAM KONTROLÜ',
            difficulty: 'Temel',
            text: 'Başlangıç ve ortam sıcaklıkları sabitken k iki katına çıkarılıyor. Sıcaklık farkının yarılanma süresi nasıl değişir?',
            choices: ['İki katına çıkar.', 'Yarıya iner.', 'Değişmez.'],
            answer: 1,
            feedback: 'Doğru. t½ = ln(2)/k olduğundan k iki katına çıkınca yarılanma süresi yarıya iner.',
            solutionSummary: 'e^(−kt½) = 1/2 eşitliğinden t½ = ln(2)/k bulunur; yarılanma süresi başlangıç sıcaklığından bağımsız, k ile ters orantılıdır.',
            hints: [
              'Yarılanma süresinin formülünde k’nın nerede durduğuna bak.',
              'Süre k ile ters orantılıdır.'
            ]
          },
          {
            title: 'Dengeye ne zaman ulaşılır?',
            tag: 'MODELİ YORUMLA',
            difficulty: 'Temel',
            text: '100 °C’den başlayan cisim 20 °C ortamda Newton yasasına göre soğuyor. Matematiksel modelde sıcaklığı tam 20 °C hangi sonlu anda olur?',
            choices: [
              'Bir zaman sabiti sonra.',
              'Yeterince büyük herhangi bir sonlu zamanda.',
              'Hiçbir sonlu zamanda; asimptotik yaklaşır.'
            ],
            answer: 2,
            feedback: 'Doğru. 80e⁻ᵏᵗ, sonlu t için pozitiftir. Cisim 20 °C’ye yaklaşır; modelde tam eşitlik sonlu zamanda oluşmaz.',
            solutionSummary: 'Her sonlu t ∈ ℝ için e^(−kt) > 0 olduğundan T(t) − 20 = 80e^(−kt) > 0 kalır; dengeye ancak t → ∞ limitinde yaklaşılır.',
            hints: [
              'T(t) − 20 ifadesini yaz.',
              'e⁻ᵏᵗ, sonlu bir t için tam sıfır olabilir mi?'
            ]
          },
          {
            title: 'Binanın sıcaklığını sınırla',
            tag: 'ÖRNEK 3.2 · TASARIM',
            difficulty: 'Vize / Final',
            text: 'Dış sıcaklık genliği 12 °C, c/K₁ = 4 saat ve periyot 24 saat. Kalıcı iç sıcaklık genliği en fazla 3 °C olacaksa en küçük K₂/K₁ oranı yaklaşık kaçtır?',
            unit: 'oran · 2 ondalık yeterli',
            answer: Math.sqrt(16 - (Math.PI / 3) ** 2) - 1,
            tolerance: 0.015,
            feedback: 'Doğru. 12/√[(1+r)²+(π/3)²] ≤ 3 koşulu r ≥ 2,86049 verir. Bu sınır kalıcı rejim içindir.',
            solutionSummary: 'ω = π/12 sa⁻¹ ve τω = π/3 için A = 12 / √((1+r)² + (π/3)²) ≤ 3 eşitsizliğinden (1+r)² ≥ 16 − π²/9 ve r ≥ 2,8605 elde edilir.',
            hints: [
              'ω = 2π/24 = π/12. Dolayısıyla τω = π/3.',
              'Genlik formülünde A ≤ 3 yaz: 12/√[(1+r)²+(π/3)²] ≤ 3.',
              'Payda en az 4 olmalı. (1+r)² ≥ 16 − (π/3)² eşitsizliğini çöz.'
            ]
          },
          {
            title: 'Adli tıp: Sabit ortamda ölüm saati tayini',
            tag: 'VİZE KLASİĞİ · GERİYE GİDİŞ',
            difficulty: 'Vize',
            text: 'Sabit 20 °C sıcaklıktaki bir odada saat 18:00’de (t = 0) cesedin sıcaklığı 33 °C, 1 saat sonra (19:00, t = 1 sa) 31,5 °C ölçülüyor. Canlı vücut sıcaklığı 37 °C kabul edilirse ölüm saat 18:00’den kaç saat önce gerçekleşmiştir?',
            unit: 'saat · 2 ondalık',
            answer: Math.log(17 / 13) / Math.log(13 / 11.5),
            tolerance: 0.05,
            feedback: 'Doğru! k = ln(13 / 11,5) ≈ 0,1226 sa⁻¹ ve t* = −ln(17/13) / k ≈ −2,19 saat (yaklaşık 2 saat 11 dakika önce, yani 15:49).',
            solutionSummary: 't = 0’da θ(0) = 33 − 20 = 13 °C, t = 1’de θ(1) = 31,5 − 20 = 11,5 °C ⇒ e^(−k) = 11,5/13 ⇒ k = ln(13/11,5) ≈ 0,1226 sa⁻¹. Ölüm anında θ(t*) = 37 − 20 = 17 °C olduğundan 13·e^(−kt*) = 17 ⇒ |t*| = ln(17/13) / ln(13/11,5) ≈ 2,19 saat.',
            hints: [
              'Ortamla farkları yaz: t = 0’da θ₀ = 33 − 20 = 13 °C, t = 1’de θ₁ = 31,5 − 20 = 11,5 °C, ölüm anında θ* = 37 − 20 = 17 °C.',
              'Bir saatlik azalma oranından k = ln(13 / 11,5) ≈ 0,1226 sa⁻¹ bulunur.',
              '13·e^(k·Δt) = 17 eşitliğinden Δt = ln(17/13) / k değerini hesapla.'
            ]
          },
          {
            title: 'Problem 3.2: Atölyenin maksimum sıcaklığı',
            tag: 'KİTAP PROBLEM 3.2 · s.130',
            difficulty: 'Final',
            text: 'Havalandırma sabiti k = 0,2 sa⁻¹ olan ısıtıcısız bir atölyede dış sıcaklık T_A(t) = 25 + 10·sin(πt/12) °C olarak değişiyor (dTh/dt + k·T = k·T_A). Kalıcı rejimde atölyenin ulaşacağı maksimum sıcaklık kaç °C’dir?',
            unit: '°C · 1 ondalık',
            answer: 25 + 10 * 0.2 / Math.hypot(0.2, Math.PI / 12),
            tolerance: 0.15,
            feedback: 'Doğru! Kalıcı salınım genliği A = 10·k / √(k² + (π/12)²) ≈ 6,07 °C ve maksimum sıcaklık 25 + 6,07 ≈ 31,1 °C olur (Kitap s.130 cevabı: 31,1 °C).',
            solutionSummary: 'Isıtıcısız atölyede r = 0 ve τ = 1/k = 5 saattir (τω = 5π/12). Kalıcı genlik A = 10 / √(1 + (5π/12)²) = 24 / √(5,76 + π²) ≈ 6,07 °C; buradan T_max = 25 + 6,07 = 31,07 °C ≈ 31,1 °C bulunur.',
            hints: [
              'Denklem τ·dθ/dt + θ = 10·sin(ωt) biçimindedir; burada τ = 1/k = 5 saat ve ω = π/12 sa⁻¹.',
              'Kalıcı salınım genliği A = 10 / √(1 + (τω)²) veya eşdeğer olarak A = 10k / √(k² + ω²) formülüyle bulunur.',
              'Bulduğun A ≈ 6,07 °C genliğini dış ortamın ortalama sıcaklığı olan 25 °C’ye ekle.'
            ]
          },
          {
            title: 'Geçici rejim mi, kalıcı rejim mi?',
            tag: 'KAVRAMSAL DERİNLİK · SINAV TUZAĞI',
            difficulty: 'Vize / Final',
            text: 'Bina modelinde (Örnek 3.2) başlangıç koşulu T_B(0) = T_S = 22 °C alındığında tam çözüm θ(t) = A·sin(ωt − φ) + A·sin(φ)·e^(−(1+r)t/τ) olarak bulunuyor. Bu çözümle ilgili aşağıdaki ifadelerden hangisi doğrudur?',
            choices: [
              'Bina sıcaklığı t ≥ 0 boyunca hiçbir zaman T_S + A değerini aşamaz.',
              'A·sin(φ)·e^(−(1+r)t/τ) terimi pozitif olduğundan, ilk periyottaki tepe sıcaklığı kalıcı rejim sınırı olan T_S + A değerini geçici olarak biraz aşabilir.',
              'Kalıcı rejim genliği A, başlangıç sıcaklığı T_B(0) değerine bağlıdır.'
            ],
            answer: 1,
            feedback: 'Doğru! Başlangıçta θ(0) = 0 koşulunu dengelemek için gelen pozitif üstel terim A·sin(φ)·e^(−pt) ilk saatlerde sinüs tepesine eklenir ve geçici bir aşım (overshoot) yaratır.',
            solutionSummary: 'Kalıcı genlik A başlangıç koşulundan bağımsızdır; ancak t = 0’daki geçiş terimi A·sin(φ)·e^(−pt) > 0 olduğundan tam çözümün ilk tepe değeri T_S + A sınırının biraz üzerine çıkar.',
            hints: [
              'sin(φ) değerinin işaretini düşün (0 < φ < π/2 için pozitiftir).',
              'İlk tepe anında sin(ωt − φ) = 1 olduğunda üstel terim henüz tam sıfırlanmış mıdır?'
            ]
          },
          {
            title: 'Problem 3.1: Değişken ortamda hangi yöntem geçerlidir?',
            tag: 'YÖNTEM SEÇİMİ · s.130',
            difficulty: 'Vize / Final',
            text: 'Ortam sıcaklığı sabit olmayıp Tₘ(t) = 20·e^(−0,02t) şeklinde zamanla değişiyorsa, dT/dt = −k(T − Tₘ(t)) denklemini çözmek için hangi yol matematiksel olarak doğrudur?',
            choices: [
              'Değişkenleri dT/(T − Tₘ(t)) = −k dt biçiminde ayırıp iki tarafın integralini almak.',
              'Doğrudan T(t) = 20e^(−0,02t) + (Tᵢ − 20)e^(−kt) yazmak.',
              'Denklemi dT/dt + k·T = k·Tₘ(t) standart birinci mertebe doğrusal formuna getirip μ(t) = e^(kt) integral çarpanıyla çözmek.'
            ],
            answer: 2,
            feedback: 'Doğru! Tₘ(t) zamana bağlı olduğunda T − Tₘ(t) ifadesi yalnızca T’nin fonksiyonu değildir; değişkenler ayrılamaz, §2.4’teki integral çarpanı yöntemi zorunludur.',
            solutionSummary: 'dT/dt + kT = 20k·e^(−0,02t) denklemi birinci mertebe doğrusal ve sabit olmayan sağ taraflı bir denklemdir; μ(t) = e^(kt) ile çarpılarak d/dt[T·e^(kt)] = 20k·e^((k−0,02)t) üzerinden çözülür.',
            hints: [
              'Tₘ(t) içinde t değişkeni varken dT/(T − Tₘ(t)) ifadesi yalnız T’ye bağlı bir diferansiyel midir?',
              'Denklemi dT/dt + P(t)T = Q(t) biçiminde düşün.'
            ]
          }
        ]
      }
    ],
    chapters: [
      ['Giriş', 'Introduction', 1, '1.1 Motive edici örnekler · s.1|1.2 Genel kavramlar ve tanımlar · s.6'],
      ['Birinci mertebe ve basit yüksek mertebe denklemler', 'First-Order and Simple Higher-Order Differential Equations', 16, '2.1 Değişkenlerin ayrılması · s.16|2.2 Değişken dönüşümleri · s.20|2.3 Tam denklemler ve integral çarpanları · s.31|2.4 Birinci mertebe doğrusal / Bernoulli denklemleri · s.55|2.5 Bağımlı veya bağımsız değişken için çözülebilen denklemler · s.61|2.6 Basit yüksek mertebe denklemler · s.68|2.7 Özet · s.74'],
      ['Birinci mertebe denklemlerin uygulamaları', 'Applications of First-Order and Simple Higher-Order Equations', 87, '3.1 Isınma ve soğuma · s.87|3.2 Dirençli ortamda parçacık hareketi · s.91|3.3 Asılı kablolar · s.97|3.4 Elektrik devreleri · s.108|3.5 Akarsuda doğal arınma · s.114|3.6 Çeşitli uygulama problemleri · s.120'],
      ['Doğrusal diferansiyel denklemler', 'Linear Differential Equations', 140, '4.1 Genel doğrusal adi denklemler · s.140|4.2 Homojen çözümler ve karakteristik denklem · s.143|4.3 Özel çözümler · s.153|4.4 Euler denklemleri · s.178|4.5 Özet · s.180'],
      ['Doğrusal denklemlerin uygulamaları', 'Applications of Linear Differential Equations', 188, '5.1 Tek serbestlik dereceli sistemin titreşimi · s.188|5.2 Elektrik devreleri · s.209|5.3 Hız tümseğinden geçen araç · s.213|5.4 Kiriş-kolonlar · s.218|5.5 Çeşitli uygulama problemleri · s.223'],
      ['Laplace dönüşümü ve uygulamaları', 'The Laplace Transform and Its Applications', 244, '6.1 Laplace dönüşümü · s.244|6.2 Heaviside basamak fonksiyonu · s.249|6.3 Dirac delta ve darbe fonksiyonları · s.254|6.4 Ters Laplace dönüşümü · s.257|6.5 Laplace ile denklem çözümü · s.263|6.6 Uygulamalar · s.268|6.7 Özet · s.289'],
      ['Doğrusal diferansiyel denklem sistemleri', 'Systems of Linear Differential Equations', 300, '7.1 Giriş · s.300|7.2 Operatör yöntemi · s.304|7.3 Laplace dönüşümü yöntemi · s.318|7.4 Matris yöntemi · s.325|7.5 Özet · s.347'],
      ['Doğrusal sistemlerin uygulamaları', 'Applications of Systems of Linear Differential Equations', 357, '8.1 Mekanik titreşimlerin modellenmesi · s.357|8.2 Ayarlı kütle sönümleyiciler · s.366|8.3 Elektrik devresi · s.372|8.4 İki katlı kesme binası · s.377'],
      ['Diferansiyel denklemlerin seri çözümleri', 'Series Solutions of Differential Equations', 390, '9.1 Kuvvet serilerinin tekrarı · s.391|9.2 Adi nokta çevresinde seri çözümü · s.394|9.3 Düzenli tekil nokta ve Bessel denklemi · s.403|9.4 Özet · s.424'],
      ['Sayısal çözümler', 'Numerical Solutions of Differential Equations', 431, '10.1 Birinci mertebe başlangıç değer problemleri: Euler ve Runge–Kutta · s.431|10.2 Denklem sistemlerinin sayısal çözümleri · s.445|10.3 Katı (stiff) denklemler · s.449|10.4 Özet · s.452'],
      ['Kısmi diferansiyel denklemler', 'Partial Differential Equations', 457, '11.1 Basit kısmi denklemler · s.457|11.2 Değişkenlerin ayrılması · s.458|11.3 Kirişlerin eğilme titreşimi · s.465|11.4 Isı iletimi · s.473|11.5 Özet · s.492'],
      ['Maple ile adi diferansiyel denklem çözümü', 'Solving Ordinary Differential Equations Using Maple', 498, '12.1 Kapalı biçimde çözümler · s.499|12.2 Seri çözümleri · s.512|12.3 Sayısal çözümler · s.517']
    ]
  }
];

export function getBook(bookId) {
  return BOOKS.find(b => b.id === bookId) || BOOKS[0];
}

export function getLesson(lessonId) {
  for (const book of BOOKS) {
    const lesson = book.lessons.find(l => l.id === lessonId);
    if (lesson) return { book, lesson };
  }
  const book = BOOKS[0];
  return { book, lesson: book.lessons[0] };
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
