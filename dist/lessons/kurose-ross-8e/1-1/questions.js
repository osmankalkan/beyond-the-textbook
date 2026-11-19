const text = (tr, en) => ({tr, en});

export const internetAnatomyExtraQuestions = [
  {
    title: text('Paket anahtarları: Erişim ağı vs Ağ çekirdeği', 'Packet switches: Access network vs. Network core'),
    tag: text('KAVRAM · §1.1.1', 'CONCEPT · §1.1.1'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'Günümüz İnternet’inde en yaygın iki paket anahtarı (packet switch) türü ve tipik kullanım yerleri hangi seçenekte doğru eşleştirilmiştir?',
      'Which option correctly pairs the two most prominent types of packet switches in today’s Internet with where they are typically deployed?'
    ),
    choices: text(
      [
        'Bağlantı katmanı anahtarları (link-layer switches) tipik olarak erişim ağlarında; yönlendiriciler (routers) ise ağ çekirdeğinde kullanılır.',
        'Yönlendiriciler yalnız ev WiFi ağlarında; bağlantı katmanı anahtarları ise kıtalararası fiber omurgalarda kullanılır.',
        'Web sunucuları erişim ağlarında; akıllı telefonlar ise ağ çekirdeğinde paket anahtarı olarak çalışır.',
        'Modemler ağ çekirdeğinde; e-posta sunucuları ise erişim ağlarında paket anahtarlama yapar.'
      ],
      [
        'Link-layer switches are typically used in access networks, while routers are typically used in the network core.',
        'Routers are used only in home WiFi networks, while link-layer switches operate on transcontinental fiber backbones.',
        'Web servers act as access switches, while smartphones act as core packet switches.',
        'Modems operate in the network core, while e-mail servers perform packet switching in access networks.'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Kurose & Ross §1.1.1 (basılı s. 4): Bağlantı katmanı anahtarları tipik olarak erişim ağlarında, yönlendiriciler ise ağ çekirdeğinde kullanılır.',
      'Correct! Per Kurose & Ross §1.1.1 (printed p. 4), link-layer switches are typically used in access networks, whereas routers are typically used in the network core.'
    ),
    hints: text(
      [
        'Şekil 1.1’deki kurumsal ağda (Enterprise Network) bilgisayarları birbirine bağlayan kare kutulara ve ISP çekirdeğindeki çarpılı silindirlere bak.',
        'Erişim ağlarında yerel anahtarlama (link-layer switch), ISP omurgalarında yönlendirme (router) yapılır.'
      ],
      [
        'Check the square switches connecting workstations inside the Enterprise Network versus the circular routers inside the ISPs in Figure 1.1.',
        'Local access networks typically use link-layer switches, while ISP cores use routers.'
      ]
    ),
    solutionSummary: text(
      'İki temel paket anahtarı türü: erişim ağlarında bağlantı katmanı anahtarı (link-layer switch), ağ çekirdeğinde yönlendirici (router).',
      'The two main packet-switch types are link-layer switches (access networks) and routers (network core).'
    )
  },
  {
    title: text('Ulaşım analojisi eşleştirmesi (§1.1.1)', 'Transportation analogy mapping (§1.1.1)'),
    tag: text('ANALOJİ · §1.1.1', 'ANALOGY · §1.1.1'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'Kurose & Ross’un §1.1.1’deki kargo taşımacılığı analojisinde: (1) paketler, (2) iletişim bağlantıları, (3) paket anahtarları ve (4) uç sistemler sırasıyla hangilerine karşılık gelir?',
      'In Kurose & Ross’s §1.1.1 cargo transportation analogy, what do (1) packets, (2) communication links, (3) packet switches, and (4) end systems correspond to, respectively?'
    ),
    choices: text(
      [
        'Kamyonlar — Otoyollar ve yollar — Kavşaklar — Fabrika ve depo binaları',
        'Otoyollar — Kamyonlar — Binalar — Kavşaklar',
        'Trafik ışıkları — Binalar — Kamyonlar — Otoyollar',
        'Kavşaklar — Binalar — Otoyollar — Kamyonlar'
      ],
      [
        'Trucks — Highways and roads — Intersections — Factory and warehouse buildings',
        'Highways — Trucks — Buildings — Intersections',
        'Traffic lights — Buildings — Trucks — Highways',
        'Intersections — Buildings — Highways — Trucks'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Kargo parçalara bölünüp kamyonlara (paketler) yüklenir; kamyonlar otoyollardan (bağlantılar) ve kavşaklardan (paket anahtarları) geçerek fabrikadan depoya (uç sistemler) ulaşır.',
      'Correct! Cargo is split into trucks (packets) traveling along highways (communication links) through intersections (packet switches) from factory to warehouse (end systems).'
    ),
    hints: text(
      [
        'Veriyi taşıyan hareketli birimler kamyonlardır.',
        'Yön değiştirmeyi sağlayan düğümler kavşaklardır; başlangıç ve varış binaları uç sistemlerdir.'
      ],
      [
        'The moving units carrying segmented data are the trucks.',
        'Intersections steer traffic onto outgoing roads (links), while buildings are the endpoints.'
      ]
    ),
    solutionSummary: text(
      'Paketler ↔ kamyonlar, bağlantılar ↔ otoyollar, paket anahtarları ↔ kavşaklar, uç sistemler ↔ binalar (basılı s. 4).',
      'Packets ↔ trucks, links ↔ highways, packet switches ↔ intersections, end systems ↔ buildings (printed p. 4).'
    )
  },
  {
    title: text('Standart kuruluşları: IETF RFC vs IEEE 802', 'Standards bodies: IETF RFC vs. IEEE 802'),
    tag: text('STANDARTLAR · §1.1.1 · R3', 'STANDARDS · §1.1.1 · R3'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'Aşağıdaki standart ve kuruluş eşleştirmelerinden hangisi DOĞRUDUR?',
      'Which pairing of networking standards and standards organizations is CORRECT?'
    ),
    choices: text(
      [
        'TCP, IP, HTTP ve SMTP → IETF (RFC belgeleri); Ethernet ve WiFi → IEEE 802 LAN Standartları Komitesi',
        'Ethernet ve WiFi → IETF (RFC belgeleri); TCP ve HTTP → IEEE 802 LAN Standartları Komitesi',
        'Tüm İnternet protokolleri ve fiziksel kablolar tek başına HTTP komitesi tarafından yazılır.',
        'RFC belgeleri yalnızca özel şirket içi gizli belgelerdir ve standartlaştırma amacıyla kullanılmaz.'
      ],
      [
        'TCP, IP, HTTP, and SMTP → IETF (RFC documents); Ethernet and WiFi → IEEE 802 LAN Standards Committee',
        'Ethernet and WiFi → IETF (RFC documents); TCP and HTTP → IEEE 802 LAN Standards Committee',
        'All Internet protocols and physical cables are authored solely by the HTTP committee.',
        'RFCs are private corporate memos not used for Internet standardization.'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! IETF yaklaşık 9000 RFC belgesiyle TCP, IP, HTTP ve SMTP gibi protokolleri; IEEE 802 komitesi ise Ethernet (802.3) ve WiFi (802.11) bağlantı standartlarını belirler.',
      'Correct! The IETF publishes RFCs defining TCP, IP, HTTP, and SMTP, while the IEEE 802 committee specifies Ethernet (802.3) and WiFi (802.11).'
    ),
    hints: text(
      [
        'RFC (Request for Comments) belgelerini hangi kuruluş yayımlar?',
        'IEEE 802 adı üzerinde "LAN (Yerel Alan Ağı)" standartlarına odaklanır: Ethernet ve WiFi.'
      ],
      [
        'Which organization publishes Requests for Comments (RFCs)?',
        'IEEE 802 specifically standardizes LAN technologies: Ethernet and WiFi.'
      ]
    ),
    solutionSummary: text(
      'IETF → RFC (TCP, IP, HTTP, SMTP); IEEE 802 → LAN bağlantıları (Ethernet, WiFi).',
      'IETF → RFCs (TCP, IP, HTTP, SMTP); IEEE 802 → LAN links (Ethernet, WiFi).'
    )
  },
  {
    title: text('Soket arayüzü ve posta hizmeti analojisi (§1.1.2)', 'Socket interface and the postal service analogy (§1.1.2)'),
    tag: text('HİZMETLER · §1.1.2', 'SERVICES · §1.1.2'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'Bir uç sistemde çalışan Python veya Java programının, başka bir uç sistemdeki programa veri göndermesi için İnternet altyapısına uyması gereken kurallar bütününe ne ad verilir?',
      'What is the set of rules that a program (e.g., in Python or Java) running on one end system must follow to instruct the Internet infrastructure to deliver data to a program on another end system?'
    ),
    choices: text(
      [
        'Soket arayüzü (Socket interface)',
        'Fiziksel fiber optik arayüzü',
        'Yönlendirici çekirdek derleyicisi',
        'Bağlantı katmanı anahtarlama tablosu'
      ],
      [
        'Socket interface',
        'Physical fiber-optic interface',
        'Core router compiler',
        'Link-layer switching table'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Tıpkı posta hizmetinin zarf, adres, pul ve posta kutusu kuralları (posta arayüzü) olması gibi, İnternet de dağıtık uygulamalara soket arayüzünü sunar.',
      'Correct! Just as the postal service requires an envelope, address, stamp, and mailbox, the Internet exposes a socket interface to distributed applications.'
    ),
    hints: text(
      [
        'Alice’in mektubu pencereden atmak yerine posta kurallarına uyarak posta kutusuna bırakması neye benzetiliyor?',
        'İki harfli veya tek kelimelik "kapı" kavramını hatırla: socket (soket).'
      ],
      [
        'In the postal analogy, what corresponds to the postal service interface (envelope + address + mailbox)?',
        'Remember the doorway between an application program and the Internet transport infrastructure: the socket interface.'
      ]
    ),
    solutionSummary: text(
      'Soket arayüzü, bir uç sistemdeki uygulamanın İnternet altyapısından veri teslimi talep etme kurallarını tanımlar (basılı s. 6).',
      'The socket interface defines how an application program asks the Internet infrastructure to deliver data to a destination program (printed p. 6).'
    )
  },
  {
    title: text('Sayısal hesap: Tavan fonksiyonu ile paket sayısı (K)', 'Numerical: Packet count (K) with ceiling rounding'),
    tag: text('SAYISAL · PAKETLEME', 'NUMERICAL · PACKETIZATION'),
    difficulty: text('Orta', 'Intermediate'),
    text: text(
      'Bir uç sistem F = 7.500 baytlık bir belgeyi her birinde en fazla P_data = 1.460 bayt uygulama verisi bulunan paketlere bölüyor. Toplam kaç paket (K) oluşturulur?',
      'An end system segments an F = 7,500-byte document into packets carrying at most P_data = 1,460 bytes of application payload each. How many packets (K) are created in total?'
    ),
    unit: text('paket', 'packets'),
    answer: 6,
    tolerance: 0.01,
    feedback: text(
      'Doğru! 7.500 / 1.460 ≈ 5,137 olduğundan 5 tam paket (7.300 bayt) + kalan 200 bayt için 1 ek paket gerekir: K = ⌈5,137⌉ = 6 paket.',
      'Correct! Since 7,500 / 1,460 ≈ 5.137, you need 5 full packets (7,300 bytes) plus 1 final packet for the remaining 200 bytes: K = ⌈5.137⌉ = 6 packets.'
    ),
    hints: text(
      [
        '7.500’ü 1.460’a böl: 5 × 1.460 = 7.300 bayt eder.',
        'Kalan 200 bayt da ayrı bir paket gerektirdiği için sonucu her zaman yukarı yuvarla (⌈F / P_data⌉).'
      ],
      [
        'Divide 7,500 by 1,460: 5 × 1,460 = 7,300 bytes.',
        'The leftover 200 bytes still require their own packet, so always round up using ⌈F / P_data⌉.'
      ]
    ),
    solutionSummary: text(
      'K = ⌈7500 / 1460⌉ = ⌈5.137⌉ = 6 paket (ilk 5 pakette 1460 B, 6. pakette 200 B veri bulunur).',
      'K = ⌈7500 / 1460⌉ = ⌈5.137⌉ = 6 packets (five 1460-byte payloads plus one 200-byte payload).'
    )
  },
  {
    title: text('Sayısal hesap: Toplam başlık ek yükü (K · H)', 'Numerical: Total header overhead (K · H)'),
    tag: text('SAYISAL · BAŞLIK YÜKÜ', 'NUMERICAL · OVERHEAD'),
    difficulty: text('Orta', 'Intermediate'),
    text: text(
      'Bir önceki sorudaki gibi F = 7.500 baytlık veri K = 6 pakete bölünüyor ve her pakete H = 40 baytlık TCP/IP başlığı ekleniyor. Kabloya gönderilen TOPLAM bayt sayısı (F + K·H) kaçtır?',
      'As in the previous problem, F = 7,500 bytes of data is split into K = 6 packets and an H = 40-byte TCP/IP header is prepended to each packet. What is the TOTAL number of bytes transmitted (F + K·H)?'
    ),
    unit: text('bayt', 'bytes'),
    answer: 7740,
    tolerance: 0.5,
    feedback: text(
      'Doğru! 6 paketin her birine 40 bayt eklendiği için toplam başlık yükü 6 × 40 = 240 bayt; toplam iletilen veri 7.500 + 240 = 7.740 bayttır.',
      'Correct! Six packets × 40 bytes = 240 bytes of headers, so total transmitted bytes = 7,500 + 240 = 7,740 bytes.'
    ),
    hints: text(
      [
        'Son paket tam dolu olmasa bile kendi 40 baytlık başlığını taşır.',
        'Toplam = F + K · H = 7.500 + 6 × 40.'
      ],
      [
        'Even the partially filled 6th packet carries a full 40-byte header.',
        'Total = F + K · H = 7,500 + 6 × 40.'
      ]
    ),
    solutionSummary: text(
      'B_tot = 7.500 + (6 × 40) = 7.500 + 240 = 7.740 bayt.',
      'B_tot = 7,500 + (6 × 40) = 7,500 + 240 = 7,740 bytes.'
    )
  },
  {
    title: text('Sayısal hesap: Protokol verimliliği yüzdesi (η)', 'Numerical: Protocol efficiency percentage (η)'),
    tag: text('SAYISAL · VERİMLİLİK', 'NUMERICAL · EFFICIENCY'),
    difficulty: text('Orta', 'Intermediate'),
    text: text(
      'F = 4.000 baytlık bir mesaj P_data = 400 baytlık 10 pakete bölünüyor ve her pakete H = 100 baytlık başlık ekleniyor. Protokol verimliliği η = F / (F + K·H) yüzde (%) kaçtır?',
      'An F = 4,000-byte message is divided into 10 packets of P_data = 400 bytes each, with H = 100 bytes of header added per packet. What is the protocol efficiency η = F / (F + K·H) in percent (%)?'
    ),
    unit: text('%', '%'),
    answer: 80,
    tolerance: 0.1,
    feedback: text(
      'Doğru! Toplam başlık 10 × 100 = 1.000 bayt, toplam gönderilen veri 4.000 + 1.000 = 5.000 bayttır. η = 4.000 / 5.000 = 0,80 = %80.',
      'Correct! Total headers = 10 × 100 = 1,000 bytes, total bytes sent = 4,000 + 1,000 = 5,000 bytes. η = 4,000 / 5,000 = 0.80 = 80%.'
    ),
    hints: text(
      [
        'Önce toplam başlık yükünü (K · H = 10 × 100) ve toplam iletilen baytı (F + K·H) hesapla.',
        'η = 4.000 / 5.000 oranını 100 ile çarp.'
      ],
      [
        'First compute total headers (K · H = 10 × 100) and total bytes transmitted (F + K·H).',
        'Multiply η = 4,000 / 5,000 by 100 to express as a percentage.'
      ]
    ),
    solutionSummary: text(
      'η = 4000 / (4000 + 10×100) = 4000 / 5000 = %80. (Ayrıca her tekil pakette 400 / 500 = %80 olduğu görülür.)',
      'η = 4000 / (4000 + 10×100) = 4000 / 5000 = 80%. (Every individual packet also carries 400 / 500 = 80% payload.)'
    )
  },
  {
    title: text('Protokol tanımı: Eksik unsur hangisidir? (§1.1.3)', 'Protocol definition: Which element is missing? (§1.1.3)'),
    tag: text('PROTOKOL · §1.1.3', 'PROTOCOL · §1.1.3'),
    difficulty: text('Orta', 'Intermediate'),
    text: text(
      'Bir mühendis yeni bir ağ protokolü tasarlarken yalnızca mesajların (1) biçimini (format) ve (2) gönderim sırasını (order) yazıyor; ancak bir mesaj alındığında veya yanıt gelmediğinde ne yapılacağını belirtmiyor. Kurose & Ross’un tanımına göre hangi kritik öğe eksiktir?',
      'While designing a new network protocol, an engineer specifies only (1) message format and (2) message order, omitting what should happen when a message arrives or no reply is received. Per Kurose & Ross’s definition, which critical element is missing?'
    ),
    choices: text(
      [
        'Bir mesajın iletilmesi, alınması veya başka bir olay (ör. zaman aşımı) gerçekleştiğinde alınacak eylemler (actions)',
        'Kablonun bakır mı yoksa fiber mi olduğunun rengi',
        'Kullanıcının bilgisayar markası ve ekran çözünürlüğü',
        'ISP şirketinin aylık abonelik ücreti'
      ],
      [
        'The actions taken on the transmission and/or receipt of a message or other event (such as a timeout)',
        'The physical color of the copper or fiber cable',
        'The brand and screen resolution of the user’s computer',
        'The monthly subscription fee of the ISP'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Bir protokol eksiksiz olması için biçim (format) + sıra (order) + iletim/alım/diğer olaylardaki eylemlerin (actions) tamamını tanımlamalıdır.',
      'Correct! A complete protocol must specify all three: format, order, and actions taken upon transmission, receipt, or other events.'
    ),
    hints: text(
      [
        '§1.1.3 kutu içindeki tanımı hatırla: Biçim, sıra ve ...',
        'Zaman aşımı (yanıt gelmemesi) durumunda vazgeçme veya yeniden gönderme bir "eylem"dir.'
      ],
      [
        'Recall the boxed definition in §1.1.3: format, order, and ...',
        'Aborting or retransmitting on a timeout is an "action" triggered by an event.'
      ]
    ),
    solutionSummary: text(
      'Protokol = Mesajların biçimi (format) + sırası (order) + gönderim/alım/diğer olaylarda alınacak eylemler (actions).',
      'Protocol = Format + Order + Actions taken on transmission, receipt, or other events.'
    )
  },
  {
    title: text('Sayısal hesap: Şekil 1.2 Web isteğinin 2-RTT toplam süresi', 'Numerical: 2-RTT total time for the Figure 1.2 Web exchange'),
    tag: text('SAYISAL · ŞEKİL 1.2', 'NUMERICAL · FIGURE 1.2'),
    difficulty: text('Sınav Düzeyi', 'Exam Level'),
    text: text(
      'Şekil 1.2’deki TCP el sıkışması + HTTP GET + dosya teslimi senaryosunda gidiş-dönüş süresi RTT = 50 ms, dosya boyutu L_file = 125.000 bayt ve bağlantı hızı R = 20 Mbps’dir. Kontrol mesajlarının iletim süresi ihmal edildiğinde toplam süre (2·RTT + L_file/R) kaç ms olur?',
      'In the Figure 1.2 TCP handshake + HTTP GET + file transfer sequence, RTT = 50 ms, file size L_file = 125,000 bytes, and link rate R = 20 Mbps. Neglecting control-message transmission times, what is the total time (2·RTT + L_file/R) in milliseconds?'
    ),
    unit: text('ms', 'ms'),
    answer: 150,
    tolerance: 0.5,
    feedback: text(
      'Doğru! 2·RTT = 2 × 50 = 100 ms. Dosya bit sayısı = 125.000 × 8 = 1.000.000 bit = 1 Mbit. İletim süresi = 1 Mbit / 20 Mbps = 0,05 sn = 50 ms. Toplam = 100 + 50 = 150 ms.',
      'Correct! 2·RTT = 2 × 50 = 100 ms. File size in bits = 125,000 × 8 = 1,000,000 bits = 1 Mbit. Transmission time = 1 Mbit / 20 Mbps = 0.05 s = 50 ms. Total = 100 + 50 = 150 ms.'
    ),
    hints: text(
      [
        'Önce 2·RTT = 2 × 50 ms = 100 ms değerini ayır.',
        '125.000 baytı 8 ile çarpıp 1.000.000 bit bul, ardından 20 × 10⁶ bps’ye böl (0,05 sn = 50 ms).'
      ],
      [
        'First compute 2·RTT = 2 × 50 ms = 100 ms.',
        'Multiply 125,000 bytes by 8 to get 1,000,000 bits, then divide by 20 × 10⁶ bps (0.05 s = 50 ms).'
      ]
    ),
    solutionSummary: text(
      'T_exchange = 2(50 ms) + (125.000 × 8 bit) / (20 × 10⁶ bps) = 100 ms + 50 ms = 150 ms.',
      'T_exchange = 2(50 ms) + (125,000 × 8 bits) / (20 × 10⁶ bps) = 100 ms + 50 ms = 150 ms.'
    )
  },
  {
    title: text('Sınıf içi soru-cevap protokolü ve birlikte çalışabilirlik', 'Classroom Q&A protocol and interoperability'),
    tag: text('SENTEZ · §1.1.3', 'SYNTHESIS · §1.1.3'),
    difficulty: text('Orta', 'Intermediate'),
    text: text(
      'Kurose & Ross §1.1.3’te verilen ikinci insan protokolü örneğinde (derste parmak kaldırıp soru sorma), öğrencinin elini kaldırması ve öğretmenin gülümseyerek "Evet..." demesi sırasıyla neyi temsil eder?',
      'In Kurose & Ross’s second human protocol analogy in §1.1.3 (raising a hand in a college lecture), what do the student raising a hand and the teacher smiling and saying "Yes..." represent?'
    ),
    choices: text(
      [
        'Öğretmene gönderilen örtük bir istek mesajı ve soruyu sormayı tetikleyen bir onay/izin mesajı',
        'Sadece fiziksel donanım kablosunun değiştirilmesi',
        'İki tarafın farklı protokoller çalıştırmasına rağmen iletişimin kendiliğinden çalışması',
        'Ağ çekirdeğindeki bir yönlendiricinin uygulama kodunu derlemesi'
      ],
      [
        'An implicit request message transmitted to the teacher and an acknowledgement reply prompting the student to ask the question',
        'Only replacing a physical hardware cable',
        'Communication succeeding automatically even when two entities run incompatible protocols',
        'A core router compiling application code'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Parmak kaldırmak örtük bir mesajdır; öğretmenin "Evet..." yanıtı da öğrencinin sorusunu iletme eylemini tetikleyen geleneksel protokol yanıtıdır.',
      'Correct! Raising a hand is an implicit transmitted message, and the teacher’s "Yes..." is the reply message that triggers the student’s next action (asking the question).'
    ),
    hints: text(
      [
        'Her iki hareket de bir mesajın gönderilmesi/alınması ve buna bağlı eylemin tetiklenmesidir.',
        'Biri mesaj göndermeden diğeri aynı protokolü paylaşmazsa düzenli soru-cevap gerçekleşmez.'
      ],
      [
        'Both gestures represent transmitted/received messages and conventional actions taken upon receipt.',
        'Two entities must run the same protocol to accomplish a task.'
      ]
    ),
    solutionSummary: text(
      'Soru-cevap protokolü, örtük/açık mesaj alışverişi ve bu mesajlara bağlı eylemlerle işler (basılı s. 8).',
      'The classroom Q&A protocol operates through implicit/explicit message exchanges and conventional actions (printed p. 8).'
    )
  }
];
