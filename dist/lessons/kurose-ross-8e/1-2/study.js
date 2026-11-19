import {v, n, o, f, sub, pow} from '../../../study/math.js';

const text = (tr, en) => ({tr, en});

const eqSharedRate = sub(v('R'), v('user')) + o('=') + f(sub(v('R'), v('down')), sub(v('N'), v('active')));
const eqTransferTime = sub(v('T'), v('transfer')) + o('=') + f(n(8) + o('·') + sub(v('F'), v('MB')), sub(v('R'), v('eff')));
const eqOcSpeed = sub(v('R'), v('OC-n')) + o('=') + v('n') + o('·') + n('51.8');
const eqSatProp = sub(v('d'), v('prop,sat')) + o('≈') + f(n(2) + o('·') + v('h'), v('c'));
const eqHfcExample = sub(v('R'), v('user')) + o('=') + f(n(400), n(20)) + o('=') + n(20);
const eqGeoExample = sub(v('d'), v('prop')) + o('=') + f(n(2) + o('·') + n(36000) + o('·') + pow(n(10), n(3)), n(3) + o('·') + pow(n(10), n(8))) + o('=') + n('0.24') + o('≈') + n(240);

export const networkEdgeStudy = {
  eyebrow: text('§1.2 REHBERLİ ÇALIŞMA · ERİŞİM AĞLARI VE FİZİKSEL ORTAMLAR', '§1.2 GUIDED STUDY · ACCESS NETWORKS & PHYSICAL MEDIA'),
  title: text('Paylaşımlı–adanmış erişim farkını ve fiziksel ortam sınırlarını adım adım keşfet.', 'Explore shared vs. dedicated access and physical media limits step by step.'),
  intro: text(
    'Önce tahminini gerekçelendir, ardından DSL, HFC, FTTH PON, Ethernet, WiFi ve uydu kanallarının çalışma ilkelerini adım adım doğrula.',
    'Justify your prediction first, then step through how DSL, HFC, FTTH PON, Ethernet, WiFi, and satellite links behave.'
  ),
  paths: [
    {
      id: 'shared-vs-dedicated',
      badge: text('ROTA 01 · PAYLAŞIMLI vs ADANMIŞ', 'PATH 01 · SHARED vs DEDICATED'),
      title: text('HFC Kablo neden komşular indirme yapınca yavaşlar, DSL neden yavaşlamaz?', 'Why does HFC Cable slow down when neighbors download, while DSL does not?'),
      summary: text(
        'Review Question R5 ve Şekil 1.5–1.6 üzerinden adanmış bakır hat ile paylaşımlı koaksiyel yayın ortamını ve çarpışma kuralını kanıtla.',
        'Prove the difference between a dedicated copper pair and a shared coaxial broadcast channel (and downstream collision behavior) from Figures 1.5–1.6 and Review Question R5.'
      ),
      prediction: {
        question: text(
          'HFC kablo internet hattında 10 ev aynı anda büyük bir video indiriyor. (1) İndirme hızları paylaşılır mı? (2) İndirme (downstream) kanalında paket çarpışması olur mu?',
          'On an HFC cable network, 10 homes download large videos simultaneously. (1) Is the downstream rate shared? (2) Are packet collisions possible on the downstream channel?'
        ),
        options: [
          {
            label: text('Hız paylaşılır ve indirme (downstream) kanalında evler birbirinin paketleriyle çarpışır.', 'Rate is shared, and homes collide with each other on the downstream channel.'),
            correct: false,
            feedback: text('Yarı doğru: HFC indirme hızı gerçekten paylaşılır, ancak indirme kanalında TEK gönderici CMTS olduğundan downstream kanalında çarpışma OLMAZ!', 'Half right: HFC downstream rate is indeed shared, but because the CMTS is the sole sender downstream, NO collisions occur on the downstream channel!')
          },
          {
            label: text('Hız paylaşılır, ancak indirme kanalında tek gönderici CMTS olduğu için downstream çarpışması olmaz (çarpışma yalnız paylaşımlı upstream kanalında mümkündür).', 'Rate is shared, and no downstream collisions occur because the CMTS is the sole sender (collisions can only occur on the shared upstream channel).'),
            correct: true,
            feedback: text('Tam isabet! Review Question R5’in özü budur: HFC paylaşımlı bir yayın ortamıdır; downstream’de tek gönderici CMTS olduğu için çarpışma olmaz, upstream’de ise çoklu erişim protokolü gerekir.', 'Spot on! That is the essence of Review Question R5: HFC is a shared broadcast medium; downstream has a single sender (CMTS) so no collisions occur, whereas upstream needs a multiple access protocol.')
          },
          {
            label: text('HFC her eve santralden ayrı adanmış koaksiyel kablo çektiği için hız hiç paylaşılmaz.', 'HFC runs a dedicated coax cable from the headend to each home, so rate is never shared.'),
            correct: false,
            feedback: text('Hayır — adanmış hat DSL’in özelliğidir! HFC’de 500–5.000 ev aynı mahalle koaksiyel yayın ortamını paylaşır.', 'No — a dedicated per-home line is a property of DSL! In HFC, 500–5,000 homes share the neighborhood coaxial broadcast medium.')
          }
        ]
      },
      steps: [
        {
          title: text('1. DSL: Santrale (CO) adanmış bakır çifti', '1. DSL: Dedicated twisted pair to the Central Office'),
          why: text('Şekil 1.5’teki DSLAM bağlantısının neden paylaşılmadığını görmek için', 'To see why each home’s link to the DSLAM in Figure 1.5 is dedicated'),
          formula: eqTransferTime,
          note: text('Her evin splitter + DSL modemi kendi telefon kablosuyla DSLAM’a gider; ses (0–4 kHz), yükleme (4–50 kHz) ve indirme (50 kHz–1 MHz) FDM ile ayrılır.', 'Each home’s splitter and DSL modem run over a dedicated phone line to the DSLAM, separating voice (0–4 kHz), upstream (4–50 kHz), and downstream (50 kHz–1 MHz) via FDM.')
        },
        {
          title: text('2. HFC: Mahalle düzeyinde paylaşımlı yayın ortamı', '2. HFC: Neighborhood-level shared broadcast medium'),
          why: text('Şekil 1.6’da komşuların aynı koaksiyel kanalı nasıl paylaştığını ölçmek için', 'To quantify how neighbors share the coaxial channel in Figure 1.6'),
          formula: eqSharedRate,
          note: text('CMTS’ten çıkan paketler mahalledeki tüm evlere yayınlanır; N_active ev aynı anda dosya indiriyorsa her birinin etkin hızı R_down / N_active olur.', 'Packets from the CMTS broadcast to every home on the neighborhood node; if N_active homes download simultaneously, each sees roughly R_down / N_active.')
        },
        {
          title: text('3. Downstream vs Upstream çarpışma farkı (R5)', '3. Downstream vs. Upstream collision rule (R5)'),
          why: text('Sınavlarda en çok karıştırılan HFC sorusunu kesinleştirmek için', 'To lock in the most frequently tested HFC exam distinction'),
          formula: eqHfcExample,
          note: text('Downstream kanalında tek gönderici CMTS’tir → çarpışma imkânsızdır. Upstream kanalında yüzlerce ev aynı anda gönderebileceğinden dağıtık çoklu erişim protokolü gerekir.', 'The CMTS is the sole transmitter downstream → collisions are impossible. Upstream is shared by many homes, requiring a distributed multiple access protocol.')
        },
        {
          title: text('4. FTTH PON ve Kurumsal Ethernet LAN', '4. FTTH PON and Enterprise Ethernet LAN'),
          why: text('Şekil 1.7 ve 1.8’deki gigabit erişim seçeneklerini karşılaştırmak için', 'To compare gigabit access options in Figures 1.7 and 1.8'),
          formula: eqOcSpeed,
          note: text('FTTH PON’da optik ayırıcı (<100 ev) fiberi OLT’ye paylaşır; kurumsal Ethernet’te her kullanıcı bükümlü bakır üzerinden Ethernet anahtarına adanmış 100 Mbps–10 Gbps portla bağlanır.', 'In FTTH PON, an optical splitter shares a fiber (<100 homes) to the OLT; in enterprise Ethernet, each user gets a dedicated 100 Mbps–10 Gbps switched port over twisted pair.')
        },
        {
          title: text('5. Asimetrik hızın dosya yükleme süresine etkisi', '5. Effect of asymmetric rates on upload time'),
          why: text('100 MB’lık bir dosyanın indirme ve yükleme sürelerini karşılaştırmak için', 'To compare download vs. upload times for a 100 MB file'),
          formula: eqTransferTime,
          note: text('HFC ve DSL asimetriktir (R_down > R_up). Laboratuvarda "Erişim Ağları" sekmesinde aktif kullanıcı sayısını 1’den 20’ye çıkarıp DSL ile HFC’nin farkını canlı gözlemle.', 'HFC and DSL are asymmetric (R_down > R_up). In the lab’s Access Networks tab, slide active users from 1 to 20 to compare DSL vs. HFC live.')
        }
      ],
      reflect: text(
        'Laboratuvarda HFC (400 Mbps) ile DSL (52 Mbps) arasında geçiş yap: kaç aktif komşudan sonra paylaşımlı HFC hızı adanmış DSL’in altına düşüyor?',
        'Toggle between HFC (400 Mbps) and DSL (52 Mbps) in the lab: above how many simultaneously active neighbors does shared HFC drop below dedicated DSL?'
      )
    },
    {
      id: 'physical-media',
      badge: text('ROTA 02 · KILAVUZLU vs KILAVUZSUZ ORTAM', 'PATH 02 · GUIDED vs UNGUIDED MEDIA'),
      title: text('Fiber optik neden omurgada lider? GEO uydu neden ~280 ms gecikir?', 'Why does fiber dominate the backbone? Why does a GEO satellite incur ~280 ms delay?'),
      summary: text(
        '§1.2.2’deki kılavuzlu (UTP, koaksiyel, fiber OC-n) ve kılavuzsuz (karasal radyo, GEO/LEO uydu) ortamları fiziksel yasalarla karşılaştır.',
        'Compare guided (UTP, coax, OC-n fiber) and unguided (terrestrial radio, GEO/LEO satellite) media in §1.2.2 from first principles.'
      ),
      prediction: {
        question: text(
          'Jeosenkron (GEO) bir iletişim uydusunun yüksekliği 36.000 km’dir. Bu uydunun iletim hızı 500 Mbps’ye çıkarılırsa ~280 ms’lik tek yönlü yayılma gecikmesi ortadan kalkar mı?',
          'A geostationary (GEO) satellite orbits at 36,000 km altitude. If its transmission rate is upgraded to 500 Mbps, does the ~280 ms one-way propagation delay disappear?'
        ),
        options: [
          {
            label: text('Evet; 500 Mbps çok hızlı olduğu için gecikme 1 ms’nin altına iner.', 'Yes; 500 Mbps is so fast that the delay drops below 1 ms.'),
            correct: false,
            feedback: text('Hayır! Bant genişliği (R) ışık hızını (c = 3×10⁸ m/sn) artırmaz; 72.000+ km’lik yol fiziksel olarak en az ~240–280 ms sürer.', 'No! Bandwidth (R) never increases the speed of light (c = 3×10⁸ m/s); crossing 72,000+ km physically requires at least ~240–280 ms.')
          },
          {
            label: text('Hayır; ~280 ms gecikme 36.000 km’lik yörünge mesafesinden ve ışık hızından (d/c) kaynaklanır, yalnız LEO gibi daha alçak yörüngelerle azaltılabilir.', 'No; the ~280 ms delay comes from the 36,000 km orbital distance divided by the speed of light (2h/c), and can only be reduced by lowering orbit altitude (e.g., LEO).'),
            correct: true,
            feedback: text('Doğru! §1.2.2 (basılı s. 21): GEO uydularda 280 ms gecikme mesafeden gelir; LEO uyduları Dünya’ya çok daha yakın yörüngede döndüğü için yayılma gecikmesini dramatik biçimde düşürür.', 'Correct! Per §1.2.2 (printed p. 21), GEO’s ~280 ms delay is dictated by orbital distance; LEO satellites orbit much closer to Earth, drastically lowering propagation delay.')
          },
          {
            label: text('GEO uydular kılavuzlu fiber kablo kullandığı için gecikmeleri yoktur.', 'GEO satellites use guided fiber cables, so they have no delay.'),
            correct: false,
            feedback: text('Uydu kanalları kılavuzsuz (unguided) radyo ortamıdır ve uzayda ışık hızıyla yayılır.', 'Satellite links are unguided radio media propagating through space at the speed of light.')
          }
        ]
      },
      steps: [
        {
          title: text('1. Kılavuzlu vs Kılavuzsuz ortam ayrımı', '1. Guided vs. Unguided media classification'),
          why: text('§1.2.2’deki 5 temel ortamı iki ana sınıfa ayırmak için', 'To classify the 5 media types of §1.2.2 into two families'),
          formula: eqOcSpeed,
          note: text('Kılavuzlu: bükümlü bakır (UTP), koaksiyel, fiber optik. Kılavuzsuz: karasal radyo (Bluetooth, WiFi, 4G/5G) ve uydu radyo kanalları.', 'Guided: twisted-pair copper (UTP), coaxial cable, fiber optics. Unguided: terrestrial radio (Bluetooth, WiFi, 4G/5G) and satellite radio.')
        },
        {
          title: text('2. Bükümlü bakır (Cat 6a) ve kurulum maliyeti gerçeği', '2. Twisted-pair (Cat 6a) and installation labor economics'),
          why: text('Fiber çıkmasına rağmen bakırın LAN’larda neden hâlâ egemen olduğunu anlamak için', 'To understand why copper still dominates LANs despite fiber optics'),
          formula: eqTransferTime,
          note: text('Cat 6a UTP 100 m’de 10 Gbps’ye ulaşır ve çok ucuzdur. Ayrıca kurulum işçiliği kablo maliyetinden çok daha yüksek olduğundan binalara sıklıkla birden fazla ortam birlikte döşenir.', 'Cat 6a UTP achieves 10 Gbps over 100 m at low cost. Because labor dwarfs cable material cost, builders often pull twisted pair, coax, and fiber together.')
        },
        {
          title: text('3. Fiber optik ve OC-n standartları', '3. Fiber optics and OC-n carrier rates'),
          why: text('Uzun mesafe omurgalarda fiberin 3 temel üstünlüğünü ve OC-n hesabını bilmek için', 'To know fiber’s 3 backbone advantages and the OC-n formula'),
          formula: eqOcSpeed,
          note: text('Fiber elektromanyetik parazite bağışıktır, 100 km’ye kadar düşük zayıflamalıdır ve dinlenmesi zordur. OC-n hızı n × 51,8 Mbps’dir (ör. OC-48 ≈ 2,49 Gbps).', 'Fiber is immune to EMI, exhibits low attenuation up to 100 km, and is very hard to tap. OC-n speed equals n × 51.8 Mbps (e.g., OC-48 ≈ 2.49 Gbps).')
        },
        {
          title: text('4. GEO (36.000 km) vs LEO uydu yayılma gecikmesi', '4. GEO (36,000 km) vs. LEO satellite propagation delay'),
          why: text('280 ms gecikmenin fiziksel kaynağını hesaplamak için', 'To derive the physical origin of the ~280 ms delay'),
          formula: eqGeoExample,
          note: text('Yer → GEO uydu → Yer dikey yolu bile 72.000 km / (3×10⁸ m/sn) = 240 ms, eğik yol ise ~280 ms sürer. 550 km’lik LEO uydusunda bu süre ~3,7–4,3 ms’ye iner!', 'Even the vertical path ground → GEO → ground is 72,000 km / (3×10⁸ m/s) = 240 ms, and slant paths reach ~280 ms. At 550 km LEO altitude, this drops to ~3.7–4.3 ms!')
        },
        {
          title: text('5. Karasal radyo kanallarında bozucu etkiler', '5. Impairments in terrestrial radio channels'),
          why: text('Kablosuz hızın neden mesafe ve duvarlarla değiştiğini görmek için', 'To see why wireless performance varies with distance and obstacles'),
          formula: eqSatProp,
          note: text('Yol kaybı (path loss), gölgeleme (shadow fading), çok yollu sönümleme (multipath fading) ve elektromanyetik girişim (interference) radyo kalitesini belirler.', 'Path loss, shadow fading, multipath fading (reflections), and interference govern terrestrial radio link quality.')
        }
      ],
      reflect: text(
        'Laboratuvarda "Fiziksel Ortamlar" sekmesinde uydu yüksekliğini 36.000 km’den 550 km’ye çek ve OC-192 ile OC-768 fiber hızlarını karşılaştır.',
        'In the lab’s Physical Media tab, drag satellite altitude from 36,000 km down to 550 km and compare OC-192 vs. OC-768 fiber speeds.'
      )
    }
  ]
};

export const networkEdgeClinic = {
  blueprint: [
    {
      title: text('1. Erişim Ağı Tanımı', '1. Access Network Role'),
      body: text('Uç sistemi ilk yönlendiriciye (kenar yönlendirici / edge router) fiziksel olarak bağlayan ağdır.', 'The physical network connecting an end system to the first router (edge router) on its path.')
    },
    {
      title: text('2. Adanmış vs Paylaşımlı', '2. Dedicated vs. Shared'),
      body: text('DSL ve anahtarlı Ethernet adanmıştır; HFC Kablo, FTTH PON, WiFi ve 4G/5G paylaşımlıdır.', 'DSL and switched Ethernet are dedicated; HFC Cable, FTTH PON, WiFi, and 4G/5G are shared.')
    },
    {
      title: text('3. HFC Çarpışma Kuralı (R5)', '3. HFC Collision Rule (R5)'),
      body: text('Downstream’de tek gönderici CMTS’tir (çarpışma YOK). Upstream paylaşımlıdır (çoklu erişim protokolü gerekir).', 'Downstream has a single sender, CMTS (NO collisions). Upstream is shared (needs multiple access protocol).')
    },
    {
      title: text('4. Kılavuzlu vs Kılavuzsuz', '4. Guided vs. Unguided'),
      body: text('Kılavuzlu: UTP (Cat 6a 10G), Coax, Fiber (OC-n = n×51,8 Mbps). Kılavuzsuz: Radyo, GEO (~280 ms) & LEO uydu.', 'Guided: UTP (Cat 6a 10G), Coax, Fiber (OC-n = n×51.8 Mbps). Unguided: Radio, GEO (~280 ms) & LEO satellite.')
    }
  ],
  examCases: [
    {
      badge: text('VAKA 01 · REVIEW QUESTION R4 & R9', 'CASE 01 · REVIEW QUESTION R4 & R9'),
      title: text('DSL, HFC ve FTTH karşılaştırması: Hız, ortam ve paylaşım', 'Comparing DSL, HFC, and FTTH: Rates, media, and sharing'),
      statement: text(
        'Ev genişbant teknolojilerinden DSL, HFC (Kablo) ve FTTH (PON) erişim ağlarını fiziksel ortam, tipik hız aralığı ve adanmış/paylaşımlı olma açısından karşılaştırınız.',
        'Compare residential broadband technologies—DSL, HFC (Cable), and FTTH (PON)—by physical medium, typical rate range, and dedicated vs. shared nature.'
      ),
      trap: text(
        'FTTH PON’un her eve santralden ayrı doğrudan fiber çektiğini sanmak yaygın bir hatadır! Doğrudan fiber (direct fiber) adanmıştır ama yaygın PON mimarisinde mahalledeki optik ayırıcı (<100 ev) tek fiberi OLT’ye paylaşır.',
        'Assuming FTTH PON runs a dedicated fiber all the way from the CO to every home is a common slip! Direct fiber is dedicated, but mainstream PON shares one fiber from the optical splitter (<100 homes) to the OLT.'
      ),
      steps: [
        {
          title: text('Adım 1: DSL (Şekil 1.5)', 'Step 1: DSL (Figure 1.5)'),
          formula: eqTransferTime,
          note: text('Ortam: Bükümlü bakır telefon hattı. Hız: 24–52 Mbps indirme / 3,5–16 Mbps yükleme (asimetrik). Paylaşım: Santrale (DSLAM) kadar ADANMIŞ.', 'Medium: Twisted-pair phone line. Rates: 24–52 Mbps down / 3.5–16 Mbps up (asymmetric). Sharing: DEDICATED to the CO DSLAM.')
        },
        {
          title: text('Adım 2: HFC Kablo (Şekil 1.6)', 'Step 2: HFC Cable (Figure 1.6)'),
          formula: eqSharedRate,
          note: text('Ortam: Fiber + koaksiyel kablo. Hız: 40 Mbps–1,2 Gbps indirme / 30–100 Mbps yükleme (asimetrik). Paylaşım: 500–5.000 evle PAYLAŞIMLI yayın ortamı.', 'Medium: Fiber + coaxial cable. Rates: 40 Mbps–1.2 Gbps down / 30–100 Mbps up (asymmetric). Sharing: SHARED broadcast medium across 500–5,000 homes.')
        },
        {
          title: text('Adım 3: FTTH PON (Şekil 1.7)', 'Step 3: FTTH PON (Figure 1.7)'),
          formula: eqOcSpeed,
          note: text('Ortam: Optik fiber (ONT → Optik Ayırıcı → OLT). Hız: Gbps düzeyi. Paylaşım: Optik ayırıcıdan OLT’ye kadar (<100 ev) PAYLAŞIMLI.', 'Medium: Optical fiber (ONT → Optical Splitter → OLT). Rates: Gbps class. Sharing: SHARED from neighborhood splitter to OLT (<100 homes).')
        }
      ]
    },
    {
      badge: text('VAKA 02 · REVIEW QUESTION R5', 'CASE 02 · REVIEW QUESTION R5'),
      title: text('HFC ağında 20 ev aynı anda 100 MB indirirse ne kadar sürer? Çarpışma olur mu?', 'On HFC, how long if 20 homes download 100 MB simultaneously? Any collisions?'),
      statement: text(
        '400 Mbps indirme hızına sahip bir HFC mahalle düğümünde 20 ev aynı anda 100 MB (800 Mbit) büyüklüğünde bir video dosyası indiriyor. Her evin etkin indirme hızını, indirme süresini ve downstream kanalında çarpışma olup olmayacağını belirleyiniz.',
        'On a 400 Mbps downstream HFC neighborhood node, 20 homes simultaneously download a 100 MB (800 Mbit) video file. Find each home’s effective download rate, download duration, and whether downstream collisions occur.'
      ),
      trap: text(
        '100 MB’ı bite çevirirken 8 ile çarpmayı (800 Mbit) ve paylaşımlı 400 Mbps’yi 20’ye bölmeyi unutmayın. Ayrıca "paylaşımlı = downstream çarpışması var" genellemesi YANLIŞTIR.',
        'Remember to multiply 100 MB by 8 (800 Mbits) and divide shared 400 Mbps by 20. Also, do NOT assume "shared medium = downstream collisions"!'
      ),
      steps: [
        {
          title: text('Adım 1: Paylaşımlı etkin hız (R_user)', 'Step 1: Shared effective rate (R_user)'),
          formula: eqHfcExample,
          note: text('R_user = 400 Mbps / 20 = 20 Mbps.', 'R_user = 400 Mbps / 20 = 20 Mbps.')
        },
        {
          title: text('Adım 2: 100 MB dosyanın indirme süresi', 'Step 2: Download time for 100 MB'),
          formula: eqTransferTime,
          note: text('T = (8 × 100 Mbit) / 20 Mbps = 800 / 20 = 40 saniye. (Tek kullanıcı olsaydı yalnız 2 saniye sürecekti!)', 'T = (8 × 100 Mbits) / 20 Mbps = 800 / 20 = 40 seconds. (With 1 active user, it would take only 2 seconds!)')
        },
        {
          title: text('Adım 3: Downstream çarpışma kontrolü', 'Step 3: Downstream collision check'),
          formula: eqSharedRate,
          note: text('Downstream kanalında tek gönderici CMTS olduğundan çarpışma OLMAZ. Paketler sırayla yayınlanır.', 'No downstream collisions occur because the CMTS is the sole sender on the downstream channel.')
        }
      ]
    },
    {
      badge: text('VAKA 03 · REVIEW QUESTION R7 & R8', 'CASE 03 · REVIEW QUESTION R7 & R8'),
      title: text('Ethernet LAN hızları ve fiziksel ortamları', 'Ethernet LAN transmission rates and physical media'),
      statement: text(
        'Kurumsal ve üniversite ağlarındaki Ethernet LAN bağlantılarının tipik iletim hızları nelerdir ve Ethernet hangi fiziksel ortamlar üzerinde çalışabilir?',
        'What are the typical transmission rates of Ethernet LANs, and over which physical media can Ethernet operate?'
      ),
      trap: text(
        'Ethernet’in yalnızca eski 10 Mbps veya 100 Mbps bakır kabloda çalıştığını düşünmek güncel değildir; Cat 6a bükümlü bakır 100 m’de 10 Gbps, fiber optik ise daha da yüksek hızlar sunar.',
        'Thinking Ethernet is limited to 10/100 Mbps copper is outdated; Cat 6a twisted-pair supports 10 Gbps up to 100 m, and fiber optics support even higher speeds.'
      ),
      steps: [
        {
          title: text('Adım 1: Tipik Ethernet hızları', 'Step 1: Typical Ethernet rates'),
          formula: eqOcSpeed,
          note: text('Kullanıcı uç sistemleri tipik olarak 100 Mbps – 10 Gbps (ör. 1 Gbps masaüstü, 1–10 Gbps sunucu) hızla Ethernet anahtarına bağlanır.', 'User hosts typically connect at 100 Mbps – 10 Gbps (e.g., 1 Gbps desktops, 1–10 Gbps servers) to an Ethernet switch.')
        },
        {
          title: text('Adım 2: Fiziksel ortamlar', 'Step 2: Supported physical media'),
          formula: eqTransferTime,
          note: text('Ethernet en yaygın olarak bükümlü bakır tel (UTP) ve fiber optik kablo (tarihsel olarak koaksiyel kablo da dahil) üzerinde çalışır.', 'Ethernet runs predominantly over twisted-pair copper wire (UTP) and optical fiber (historically also coaxial cable).')
        }
      ]
    },
    {
      badge: text('VAKA 04 · §1.2.2 · OC-n FİBER VE GEO UYDU GECİKMESİ', 'CASE 04 · §1.2.2 · OC-n FIBER & GEO SATELLITE DELAY'),
      title: text('OC-48 fiber hızı ve 36.000 km GEO uydu yayılma gecikmesi hesabı', 'Computing OC-48 fiber rate and 36,000 km GEO satellite propagation delay'),
      statement: text(
        '(a) OC-48 optik taşıyıcı bağlantısının hızını Mbps cinsinden bulunuz. (b) Yeryüzünden h = 36.000 km yükseklikteki jeosenkron (GEO) bir uyduya gidip dönen dikey radyo sinyalinin minimum tek yönlü yayılma gecikmesini (c = 3×10⁸ m/sn) hesaplayınız.',
        '(a) Find the bit rate of an OC-48 optical carrier link in Mbps. (b) Compute the minimum one-way ground-to-satellite-to-ground propagation delay for a geostationary (GEO) satellite at altitude h = 36,000 km (c = 3×10⁸ m/s).'
      ),
      trap: text(
        'Uydu bağlantısında sinyal hem YERDEN UYDUYA hem de UYDUDAN YERE (toplam 2h = 72.000 km) gider! Sadece h = 36.000 km almak gecikmeyi yarıya indirerek 2 kat hata yaratır.',
        'A satellite link travels BOTH up to the satellite AND back down to Earth (total 2h = 72,000 km)! Using only h = 36,000 km underestimates the delay by a factor of 2.'
      ),
      steps: [
        {
          title: text('Adım 1: OC-48 optik taşıyıcı hızı', 'Step 1: OC-48 optical carrier speed'),
          formula: eqOcSpeed,
          note: text('R = 48 × 51,8 Mbps = 2.486,4 Mbps ≈ 2,49 Gbps.', 'R = 48 × 51.8 Mbps = 2,486.4 Mbps ≈ 2.49 Gbps.')
        },
        {
          title: text('Adım 2: GEO uydu minimum tek yönlü yayılma gecikmesi', 'Step 2: GEO satellite minimum one-way propagation delay'),
          formula: eqGeoExample,
          note: text('Toplam yol 2h = 72.000 km = 7,2×10⁷ m. d_prop = 7,2×10⁷ / (3×10⁸) = 0,24 sn = 240 ms. Eğik görüş açılarında (kitapta belirtildiği gibi) ~280 ms’ye çıkar.', 'Total path 2h = 72,000 km = 7.2×10⁷ m. d_prop = 7.2×10⁷ / (3×10⁸) = 0.24 s = 240 ms. For realistic slant paths (as cited in the book), it reaches ~280 ms.')
        }
      ]
    }
  ]
};
