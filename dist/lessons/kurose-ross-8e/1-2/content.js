import {networkEdgeExtraQuestions} from './questions.js';
import {networkEdgeStudy, networkEdgeClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const networkEdgeLesson = {
  id: 'kurose-ross-8e:1.2',
  section: '1.2',
  chapterNumber: '01',
  chapterTitle: text('Bilgisayar ağları ve İnternet', 'Computer Networks and the Internet'),
  title: text(
    'Ağ kenarı: Erişim ağları ve fiziksel ortamlar',
    'The network edge: Access networks and physical media'
  ),
  englishTitle: 'The Network Edge',
  subtitle: text(
    'DSL, HFC Kablo, FTTH (PON), Ethernet, WiFi ve 4G/5G erişim ağlarını paylaşımlı/adanmış hız açısından karşılaştır; bakır, koaksiyel, OC-n fiber ve GEO/LEO uydu ortamlarını incele.',
    'Compare DSL, HFC Cable, FTTH (PON), Ethernet, WiFi, and 4G/5G access networks by shared vs. dedicated capacity; explore copper, coax, OC-n fiber, and GEO/LEO satellite physical media.'
  ),
  pages: text('9–22 (Tekrar Soruları R4–R9, s. 66)', '9–22 (Review Questions R4–R9, p. 66)'),
  pdfPages: '20–33 (R4–R9: 77)',
  lessonPath: text('lessons/kurose-ross-8e/1-2/lesson.md', 'lessons/kurose-ross-8e/1-2/lesson-en.md'),
  mathPath: 'lessons/kurose-ross-8e/1-2/math.json',
  inlinePath: 'lessons/kurose-ross-8e/1-2/inline.json',
  labFamily: 'network-edge',
  downloadName: text('1-2-ag-kenari-erisim-aglari-ve-fiziksel-ortamlar.md', '1-2-the-network-edge.md'),
  highlights: text(
    [
      'Ev erişimi: DSL (adanmış, FDM 3 kanal, DSLAM, Şekil 1.5) vs HFC Kablo (paylaşımlı, CMTS, Şekil 1.6)',
      'FTTH Pasif Optik Ağ (ONT → Optik Ayırıcı → OLT, Şekil 1.7) ve 5G Sabit Kablosuz',
      'Kurumsal Ethernet LAN (100 Mbps–10 Gbps, Şekil 1.8) ve Tipik Ev Ağı / WiFi 802.11 (Şekil 1.9)',
      'Geniş alan kablosuz: 4G LTE ve 5G hücresel baz istasyonları (onlarca km menzil)',
      'Kılavuzlu (UTP Cat 6a, koaksiyel, fiber OC-n) vs Kılavuzsuz (radyo, GEO ~280 ms & LEO uydu)'
    ],
    [
      'Home access: DSL (dedicated, 3-band FDM, DSLAM, Fig. 1.5) vs. HFC Cable (shared, CMTS, Fig. 1.6)',
      'FTTH Passive Optical Network (ONT → Optical Splitter → OLT, Fig. 1.7) and 5G Fixed Wireless',
      'Enterprise Ethernet LAN (100 Mbps–10 Gbps, Fig. 1.8) and Typical Home Network / WiFi 802.11 (Fig. 1.9)',
      'Wide-area wireless: 4G LTE and 5G cellular base stations (tens of km range)',
      'Guided (UTP Cat 6a, coax, OC-n fiber) vs. Unguided (terrestrial radio, GEO ~280 ms & LEO satellite)'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: HFC neden paylaşımlıdır ve downstream kanalında neden çarpışma olmaz? GEO uydu neden ~280 ms gecikir?',
    'E.g., Why is HFC shared and why are there no downstream collisions? Why does a GEO satellite incur ~280 ms delay?'
  ),
  sourceSummary: text(
    'James F. Kurose & Keith W. Ross, Computer Networking: A Top-Down Approach, 8th Edition (Pearson, 2021), §1.2 The Network Edge (§1.2.1 Access Networks ve §1.2.2 Physical Media, basılı s. 9–22, PDF s. 20–33; Şekil 1.3–1.9 ve Tekrar Soruları R4–R9, basılı s. 66 / PDF s. 77) temelinde hazırlanmış özgün çift dilli öğrenme modülüdür. Kaynak PDF şekilleri private/book/ altında yerel referans olarak tutulur; ders notu ve laboratuvardaki tüm diyagramlar özgün SVG uyarlamalarıdır.',
    'Original bilingual learning module based on James F. Kurose & Keith W. Ross, Computer Networking: A Top-Down Approach, 8th Edition (Pearson, 2021), §1.2 The Network Edge (§1.2.1 Access Networks and §1.2.2 Physical Media, printed pp. 9–22, PDF pp. 20–33; Figures 1.3–1.9 and Review Questions R4–R9, printed p. 66 / PDF p. 77). Source PDF figures are retained locally under private/book/ for reference; all lesson and lab visuals are original SVG adaptations.'
  ),
  modelLimits: text(
    'Erişim ağları laboratuvarı paylaşımlı ortamlarda (HFC, PON, WiFi, 4G/5G) eşzamanlı etkin indirme hızını ideal eşit paylaşım (R_down / N_active) ile hesaplar; gerçek ağlarda protokol başlıkları, radyo sönümlemesi ve tarife kısıtları etkin hızı daha da düşürebilir. Uydu gecikme hesabı boşluk ışık hızını (c = 3×10⁸ m/sn) ve eğik görüş çarpanını (1,167) kullanarak 36.000 km GEO yörüngesinde kitabın verdiği ~280 ms değerini üretir.',
    'The access network lab models shared media (HFC, PON, WiFi, 4G/5G) via idealized equal sharing (R_down / N_active); real networks experience additional header overhead, radio fading, and ISP rate tiers. Satellite delay calculations use vacuum light speed (c = 3×10⁸ m/s) with a 1.167 slant-range factor to match the textbook’s ~280 ms GEO figure at 36,000 km altitude.'
  ),
  presentation: {
    clinicEyebrow: text(
      '§1.2 · BİLGİSAYAR AĞLARI SINAV KLİNİĞİ · R4–R9 VE ÖZGÜN ÇÖZÜMLÜ VAKALAR',
      '§1.2 · COMPUTER NETWORKING EXAM CLINIC · R4–R9 & WORKED CASES'
    ),
    lab: text('Erişim ağları & fiziksel ortam labı', 'Access networks & physical media lab'),
    practice: text('Sınav kliniği & alıştırma', 'Exam clinic & practice'),
    practiceTitle: text('Paylaşımlı–adanmış erişimi ayır, OC-n ve uydu gecikmesini hesapla.', 'Separate shared vs. dedicated access, and compute OC-n & satellite delays.'),
    practiceIntro: text(
      '15 dakika · 12 özgün soru. Önce dört temel sınav vakasını incele; ardından DSL, HFC, FTTH PON, Ethernet, WiFi, fiber optik ve uydu kanalları üzerine 12 soruyu çöz.',
      '15 minutes · 12 original questions. Study four worked exam cases first, then solve 12 questions covering DSL, HFC, FTTH PON, Ethernet, WiFi, fiber optics, and satellite links.'
    ),
    practiceDisclaimer: text(
      'Alıştırma soruları Kurose & Ross 8. baskı §1.2 kavramları temelinde bu uygulama için özgün olarak yazılmıştır; kitaptan birebir kopyalanmış metinler değildir.',
      'These practice questions are original problems authored for this workspace based on Kurose & Ross 8th Ed. §1.2 concepts; they are not verbatim copies of textbook text.'
    )
  },
  studySupport: networkEdgeStudy,
  guidedTools: networkEdgeClinic,
  questions: [
    {
      title: text('HFC kablo: Paylaşımlı hız ve downstream çarpışma kontrolü (R5)', 'HFC cable: Shared rate and downstream collision check (R5)'),
      tag: text('HFC · §1.2.1 · R5', 'HFC · §1.2.1 · R5'),
      difficulty: text('Temel', 'Core'),
      text: text(
        'HFC (Hybrid Fiber Coax) kablo internet erişim hızı kullanıcılar arasında adanmış mıdır yoksa paylaşımlı mıdır? İndirme (downstream) HFC kanalında paket çarpışması mümkün müdür?',
        'Is HFC (Hybrid Fiber Coax) transmission rate dedicated or shared among users? Are packet collisions possible on a downstream HFC channel?'
      ),
      choices: text(
        [
          'Paylaşımlıdır; ancak indirme (downstream) kanalında tek gönderici CMTS olduğundan çarpışma MÜMKÜN DEĞİLDİR.',
          'Adanmıştır; her evin kablo merkezine (CMTS) kendi özel koaksiyel kablosu vardır.',
          'Paylaşımlıdır ve indirme (downstream) kanalında evler sürekli paket çarpışması yaşar.',
          'Yalnızca yükleme (upstream) kanalı adanmıştır; indirme kanalı çarpışmalıdır.'
        ],
        [
          'It is shared; however, collisions are NOT possible on the downstream channel because the CMTS is the sole sender.',
          'It is dedicated; every home has its own private coax cable all the way to the CMTS.',
          'It is shared, and homes constantly suffer packet collisions on the downstream channel.',
          'Only the upstream channel is dedicated, while the downstream channel experiences collisions.'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! HFC paylaşımlı bir yayın ortamıdır; downstream kanalında yalnızca CMTS gönderim yaptığı için çarpışma olmaz, upstream kanalında ise çoklu erişim protokolü gerekir.',
        'Correct! HFC is a shared broadcast medium; no collisions occur downstream because only the CMTS transmits, whereas the shared upstream channel requires a multiple access protocol.'
      ),
      hints: text(
        [
          'Şekil 1.6’da 500–5.000 ev aynı mahalle koaksiyel kablosunu paylaşıyor.',
          'İndirme yönünde (CMTS → evler) kaç tane gönderici vardır? Tek bir gönderici kendi kendine çarpışabilir mi?'
        ],
        [
          'In Figure 1.6, 500–5,000 homes share the neighborhood coaxial cable.',
          'In the downstream direction (CMTS → homes), how many senders exist? Can a single sender collide with itself?'
        ]
      ),
      solutionSummary: text(
        'HFC paylaşımlıdır. Downstream’de tek gönderici CMTS’tir → çarpışma olmaz. Upstream paylaşımlıdır → dağıtık çoklu erişim protokolü gerekir (R5).',
        'HFC is shared. Downstream has a single sender (CMTS) → no collisions. Upstream is shared → requires distributed multiple access (R5).'
      )
    },
    {
      title: text('DSL vs HFC: Komşular video indirirken hangisi yavaşlamaz?', 'DSL vs. HFC: Which one stays unaffected when neighbors download videos?'),
      tag: text('KARŞILAŞTIRMA · §1.2.1 · R9', 'COMPARISON · §1.2.1 · R9'),
      difficulty: text('Temel', 'Core'),
      text: text(
        'Akşam yoğun saatte aynı mahalledeki 30 komşu aynı anda 4K film indiriyor. Evden santrale (CO) kadar olan erişim bağlantısı açısından hangi teknoloji komşuların indirmesinden etkilenmez?',
        'During evening peak hours, 30 neighbors in the same block simultaneously download 4K movies. Across the home-to-central-office access link, which technology is unaffected by neighbors’ downloads?'
      ),
      choices: text(
        [
          'DSL (çünkü her evin telefon santralindeki DSLAM’a kendi adanmış bükümlü bakır telefon hattı vardır)',
          'HFC Kablo (çünkü mahalledeki tüm evler aynı koaksiyel yayın hattını paylaşır)',
          'FTTH PON (çünkü optik ayırıcı ile OLT arasındaki fiber <100 ev arasında paylaşılır)',
          'Açık kafe WiFi ağı (çünkü radyo kanalı tüm kullanıcılar arasında paylaşılır)'
        ],
        [
          'DSL (because each home has its own dedicated twisted-pair telephone wire to the central office DSLAM)',
          'HFC Cable (because all homes on the node share the same coaxial broadcast medium)',
          'FTTH PON (because the fiber from the optical splitter to the OLT is shared by <100 homes)',
          'Public cafe WiFi (because the radio channel is shared among all users)'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! DSL erişim hattı evden santraldeki DSLAM’a kadar adanmıştır (dedicated); HFC, PON ve WiFi erişim kanalları ise paylaşımlıdır.',
        'Correct! A DSL access line is dedicated from the home to the central office DSLAM, whereas HFC, PON, and WiFi share their access channels.'
      ),
      hints: text(
        [
          'Hangi teknolojide her evin santrale kendi özel bakır tel çifti vardır?',
          'DSL = adanmış; HFC, FTTH PON ve WiFi = paylaşımlı.'
        ],
        [
          'Which technology gives each home its own dedicated twisted-pair copper wire to the central office?',
          'DSL = dedicated; HFC, FTTH PON, and WiFi = shared.'
        ]
      ),
      solutionSummary: text(
        'DSL hattı santraldeki DSLAM’a kadar adanmıştır; komşuların yerel erişim trafiği bu hattı bölmez.',
        'The DSL line is dedicated all the way to the CO DSLAM, so neighbors’ local downloads do not divide its rate.'
      )
    },
    ...networkEdgeExtraQuestions
  ]
};
