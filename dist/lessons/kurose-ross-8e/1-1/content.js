import {internetAnatomyExtraQuestions} from './questions.js';
import {internetAnatomyStudy, internetAnatomyClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const internetAnatomyLesson = {
  id: 'kurose-ross-8e:1.1',
  section: '1.1',
  chapterNumber: '01',
  chapterTitle: text('Bilgisayar ağları ve İnternet', 'Computer Networks and the Internet'),
  title: text(
    'İnternet nedir? (Donanım–yazılım anatomisi, hizmetler ve protokoller)',
    'What is the Internet? (Nuts-and-bolts anatomy, services, and protocols)'
  ),
  englishTitle: 'What Is the Internet?',
  subtitle: text(
    'İnternet’i hem somut parçalarıyla (uç sistemler, bağlantılar, paket anahtarları, ISP’ler ve IETF/IEEE standartları) hem de soket arayüzlü dağıtık uygulama altyapısı ve protokol kurallarıyla keşfet.',
    'Explore the Internet both through its nuts-and-bolts pieces (end systems, links, packet switches, ISPs, and IETF/IEEE standards) and as a services infrastructure with socket interfaces and network protocols.'
  ),
  pages: text('2–9 (Tekrar Soruları R1–R3, s. 66)', '2–9 (Review Questions R1–R3, p. 66)'),
  pdfPages: '13–20 (R1–R3: 77)',
  lessonPath: text('lessons/kurose-ross-8e/1-1/lesson.md', 'lessons/kurose-ross-8e/1-1/lesson-en.md'),
  mathPath: 'lessons/kurose-ross-8e/1-1/math.json',
  inlinePath: 'lessons/kurose-ross-8e/1-1/inline.json',
  labFamily: 'internet-anatomy',
  downloadName: text('1-1-internet-nedir.md', '1-1-what-is-the-internet.md'),
  highlights: text(
    [
      'Somut bileşenler tanımı: uç sistemler (hosts), bağlantılar, paket anahtarları (Şekil 1.1)',
      'Paket bölümleme, başlık ek yükü (K·H) ve protokol verimliliği (η)',
      'ISP hiyerarşisi (erişim → bölgesel → küresel) ve standartlar (IETF RFC vs IEEE 802)',
      'Hizmetler tanımı: dağıtık uygulamalar yalnız uç sistemlerde çalışır, soket arayüzü',
      'Protokolün üç sütunu: biçim (format), sıra (order) ve olay/eylemler (Şekil 1.2)'
    ],
    [
      'Nuts-and-bolts description: end systems (hosts), links, packet switches (Figure 1.1)',
      'Packet segmentation, header overhead (K·H), and protocol efficiency (η)',
      'ISP hierarchy (access → regional → global) and standards (IETF RFCs vs. IEEE 802)',
      'Services description: distributed applications run only on end systems, socket interface',
      'Three pillars of a protocol: format, order, and actions on events (Figure 1.2)'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Bir Web sunucusu neden "uç sistem" sayılır? Yönlendiriciler neden uygulama kodu çalıştırmaz? IETF ile IEEE 802 farkı nedir?',
    'E.g., Why is a Web server classified as an end system? Why don’t core routers run user applications? How do IETF and IEEE 802 differ?'
  ),
  sourceSummary: text(
    'James F. Kurose & Keith W. Ross, Computer Networking: A Top-Down Approach, 8th Edition (Pearson, 2021), §1.1 What Is the Internet? (§1.1.1–§1.1.3, basılı s. 2–9, PDF s. 13–20; Şekil 1.1 s. 3 / PDF s. 14 ve Şekil 1.2 s. 7 / PDF s. 18; Bölüm 1 Tekrar Soruları R1–R3, basılı s. 66 / PDF s. 77) temelinde hazırlanmış özgün çift dilli öğrenme modülüdür. Kaynak PDF şekilleri private/book/ altında yerel referans olarak tutulur; ders notu ve laboratuvardaki tüm diyagramlar özgün SVG uyarlamalarıdır.',
    'Original bilingual learning module based on James F. Kurose & Keith W. Ross, Computer Networking: A Top-Down Approach, 8th Edition (Pearson, 2021), §1.1 What Is the Internet? (§1.1.1–§1.1.3, printed pp. 2–9, PDF pp. 13–20; Figure 1.1 p. 3 / PDF p. 14 and Figure 1.2 p. 7 / PDF p. 18; Chapter 1 Review Questions R1–R3, printed p. 66 / PDF p. 77). Source PDF figures are retained locally under private/book/ for reference; all lesson and lab visuals are original SVG adaptations.'
  ),
  modelLimits: text(
    '§1.1 laboratuvarındaki topoloji görünümü, Şekil 1.1’deki 6 ağ bölgesini (ev, mobil, kurumsal, bölgesel ISP, küresel ISP, içerik sağlayıcı/veri merkezi) temsili atlamalarla modeller. Paketleme hesabı sabit başlık boyutu H varsayar; gerçek ağlarda farklı katmanlar (Ethernet, IP, TCP/UDP) ayrı başlıklar ekler. Protokol akış simülatörü, Şekil 1.2’deki 4 mesajlık temel el sıkışma/istek akışını ve zaman aşımı davranışını ayrık adımlarla gösterir; TCP 3-yollu el sıkışmanın tam bayrak ayrıntıları Bölüm 3’te ele alınır.',
    'The §1.1 topology lab models the 6 network regions from Figure 1.1 (home, mobile, enterprise, regional ISP, global ISP, content provider/datacenter) using representative hops. Packetization arithmetic assumes a fixed per-packet header size H; real protocol stacks prepend separate link, network, and transport headers. The protocol simulator models Figure 1.2’s 4-message exchange and timeout events in discrete steps; full TCP 3-way handshake flags are covered in Chapter 3.'
  ),
  presentation: {
    clinicEyebrow: text(
      '§1.1 · BİLGİSAYAR AĞLARI SINAV KLİNİĞİ · R1–R3 VE ÖZGÜN ÇÖZÜMLÜ VAKALAR',
      '§1.1 · COMPUTER NETWORKING EXAM CLINIC · R1–R3 & WORKED CASES'
    ),
    lab: text('İnternet anatomisi & protokol labı', 'Internet anatomy & protocol lab'),
    practice: text('Sınav kliniği & alıştırma', 'Exam clinic & practice'),
    practiceTitle: text('Kenar–çekirdek sınırını ayır, paket başlık yükünü hesapla, protokolü doğrula.', 'Separate edge from core, compute header overhead, and verify protocol rules.'),
    practiceIntro: text(
      '15 dakika · 12 özgün soru. Önce dört temel sınav vakasını incele; ardından uç sistemler, soket arayüzü, standartlar, paketleme verimliliği ve protokol kuralları üzerine 12 soruyu çöz.',
      '15 minutes · 12 original questions. Study four worked exam cases first, then test yourself across 12 questions covering end systems, socket interfaces, standards, packetization efficiency, and protocol rules.'
    ),
    practiceDisclaimer: text(
      'Alıştırma soruları Kurose & Ross 8. baskı §1.1 kavramları temelinde bu uygulama için özgün olarak yazılmıştır; kitaptan birebir kopyalanmış metinler değildir.',
      'These practice questions are original problems authored for this workspace based on Kurose & Ross 8th Ed. §1.1 concepts; they are not verbatim copies of textbook text.'
    )
  },
  studySupport: internetAnatomyStudy,
  guidedTools: internetAnatomyClinic,
  questions: [
    {
      title: text('Kavram kontrolü: Host, End System ve Web sunucusu (R1)', 'Concept check: Host, End System, and Web server (R1)'),
      tag: text('KAVRAM · §1.1.1 · R1', 'CONCEPT · §1.1.1 · R1'),
      difficulty: text('Temel', 'Core'),
      text: text(
        'Kurose & Ross §1.1.1’e göre "host" (konak), "end system" (uç sistem) ve bir veri merkezindeki "Web sunucusu" arasındaki ilişki hakkında hangisi DOĞRUDUR?',
        'According to Kurose & Ross §1.1.1, which statement accurately describes the relationship among a "host", an "end system", and a datacenter "Web server"?'
      ),
      choices: text(
        [
          'Host ve end system eş anlamlıdır; bir Web sunucusu da ağın kenarında uygulama çalıştırdığı için bir uç sistemdir (host).',
          'Host yalnızca kişisel bilgisayarlar içindir; Web sunucuları ise ağ çekirdeğinin paket anahtarlarıdır.',
          'End system yalnızca akıllı telefon ve IoT aygıtları için kullanılır; masaüstü bilgisayarlar end system değildir.',
          'Web sunucusu soket arayüzü kullanmadığı için ne host ne de end system sayılır.'
        ],
        [
          'Host and end system are synonyms; a Web server is also an end system (host) because it sits at the edge and runs applications.',
          'Host refers only to personal computers, whereas Web servers are core packet switches.',
          'End system applies only to smartphones and IoT devices, not desktop computers.',
          'A Web server does not use a socket interface, so it is neither a host nor an end system.'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Host ve end system birebir eş anlamlıdır; dizüstü bilgisayarlar, telefonlar, IoT cihazları ve Web sunucularının tamamı uç sistemdir.',
        'Correct! Host and end system are exact synonyms; laptops, smartphones, IoT devices, and Web servers are all end systems.'
      ),
      hints: text(
        [
          'Şekil 1.1’in altındaki gösterge anahtarına (Key) bak: "Host (= end system)".',
          'Web sunucusu HTTP uygulamasını çalıştırır; uygulamalar yalnızca uç sistemlerde çalışır.'
        ],
        [
          'Look at the Key in Figure 1.1: "Host (= end system)".',
          'A Web server runs the HTTP application, and applications run exclusively on end systems.'
        ]
      ),
      solutionSummary: text(
        'Host = End system. Masaüstü PC, telefon, akıllı termostat ve Web sunucusu uç sistemdir; yönlendirici ve bağlantı anahtarı paket anahtarıdır.',
        'Host = End system. Desktops, phones, smart thermostats, and Web servers are end systems; routers and link-layer switches are packet switches.'
      )
    },
    {
      title: text('Kavram yanılgısı: Dağıtık uygulamalar çekirdek yönlendiricilerde çalışır mı?', 'Misconception check: Do distributed applications run in core routers?'),
      tag: text('KAVRAM YANILGISI · §1.1.2', 'MISCONCEPTION · §1.1.2'),
      difficulty: text('Temel', 'Core'),
      text: text(
        'İki farklı kıtadaki oyuncu çevrim içi bir çok oyunculu oyun oynarken paketler 12 yönlendiriciden geçiyor. Oyun uygulaması bu sistemlerin hangilerinde çalışır?',
        'Two players on different continents play an online multiplayer game whose packets traverse 12 routers. On which devices does the game application execute?'
      ),
      choices: text(
        [
          'Yalnızca uç sistemlerde (oyuncuların cihazları ve varsa oyun sunucusu); aradaki 12 yönlendirici oyun uygulamasını çalıştırmaz.',
          'Hem uç sistemlerde hem de aradaki 12 yönlendiricinin tamamında çalışır.',
          'Yalnızca küresel Tier-1 ISP yönlendiricilerinde çalışır.',
          'Yönlendiriciler oyun uygulamasını çalıştırır, oyuncuların bilgisayarları yalnız ekran görevi görür.'
        ],
        [
          'Only on the end systems (players’ devices and any game server); none of the 12 core routers run the game application.',
          'On both the end systems and all 12 intermediate routers.',
          'Only inside the Tier-1 global ISP routers.',
          'Routers run the game application while players’ computers act solely as displays.'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! §1.1.2 (basılı s. 5): İnternet uygulamaları uç sistemlerde çalışır; ağ çekirdeğindeki paket anahtarları verinin hangi uygulamaya ait olduğuyla ilgilenmez.',
        'Correct! Per §1.1.2 (printed p. 5), Internet applications run on end systems—never in packet switches in the network core.'
      ),
      hints: text(
        [
          'Posta analojisini düşün: Posta dağıtım merkezi mektubun içindeki romanı okuyup devamını yazar mı, yoksa yalnız zarfın adresine bakıp iletir mi?',
          'Ağ çekirdeği yalnızca paket iletimine odaklanır.'
        ],
        [
          'Think of the postal analogy: Does a mail sorting center read your letter, or just forward the envelope using its address?',
          'The network core focuses strictly on forwarding packets.'
        ]
      ),
      solutionSummary: text(
        'Dağıtık uygulamalar yalnızca uç sistemlerde çalışır; yönlendiriciler yalnız paket iletir.',
        'Distributed applications run strictly on end systems; routers only forward packets.'
      )
    },
    ...internetAnatomyExtraQuestions
  ]
};
