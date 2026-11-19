import {v, n, o, f, p, sub, pow} from '../../../study/math.js';

const text = (tr, en) => ({tr, en});

// Shared MathML fragments (app.js / study-guide.js wraps each in <math><mrow>...</mrow></math>)
const eqPacketCount =
  v('K') + o('=') + o('⌈') + f(v('F'), sub(v('P'), v('data'))) + o('⌉');
const eqPacketSize =
  v('L') + o('=') + sub(v('P'), v('data')) + o('+') + v('H');
const eqTotalBytes =
  sub(v('B'), v('tot')) + o('=') + v('F') + o('+') + v('K') + o('·') + v('H');
const eqEfficiency =
  v('η') + o('=') + f(v('F'), v('F') + o('+') + v('K') + o('·') + v('H'));
const eqWebExchange =
  sub(v('T'), v('exchange')) + o('=') + n(2) + o('·') + v('RTT') + o('+') + f(sub(v('L'), v('file')), v('R'));
const eqExCase3Count =
  v('K') + o('=') + o('⌈') + f(n(10000), n(1000)) + o('⌉') + o('=') + n(10);
const eqExCase3Eff =
  v('η') + o('=') + f(n(10000), n(10000) + o('+') + n(10) + o('·') + n(40)) + o('=') + f(n(10000), n(10400)) + o('≈') + n('96.15') + o('%');
const eqExCase4Total =
  sub(v('T'), v('exchange')) + o('=') + n(2) + o('·') + n(35) + o('+') + f(n(200000) + o('·') + n(8), n(10) + o('·') + pow(n(10), n(6))) + o('=') + n(70) + o('+') + n(160) + o('=') + n(230);

export const internetAnatomyStudy = {
  eyebrow: text('§1.1 REHBERLİ ÇALIŞMA · İNTERNET’İN ANATOMİSİ VE PROTOKOLLER', '§1.1 GUIDED STUDY · ANATOMY OF THE INTERNET & PROTOCOLS'),
  title: text('Donanım–yazılım parçalarını, soket sınırını ve protokol mantığını adım adım kur.', 'Build the nuts-and-bolts view, socket boundary, and protocol logic step by step.'),
  intro: text(
    'Önce tahminini gerekçelendir, ardından her adımı açarak uç sistemler ile çekirdek yönlendiriciler arasındaki kesin rol ayrımını, paket başlık verimliliğini ve protokolün üç sütununu doğrula.',
    'Justify your prediction first, then reveal each step to verify the sharp boundary between edge end systems and core routers, packet header efficiency, and the three pillars of a protocol.'
  ),
  paths: [
    {
      id: 'edge-vs-core',
      badge: text('ROTA 01 · KENAR vs ÇEKİRDEK', 'PATH 01 · EDGE vs CORE'),
      title: text('Dağıtık uygulamalar nerede çalışır? (Uç sistem, soket ve yönlendirici ayrımı)', 'Where do distributed applications run? (End system, socket, and router roles)'),
      summary: text(
        'Bir Web sunucusunun veya akıllı termostatın neden "uç sistem" sayıldığını ve yönlendiricilerin neden uygulama kodu çalıştırmadığını §1.1.1–§1.1.2 üzerinden kanıtla.',
        'Prove from §1.1.1–§1.1.2 why a Web server or smart thermostat is an end system and why core routers never execute user applications.'
      ),
      prediction: {
        question: text(
          'Bir akıllı telefondan veri merkezindeki bir Web sunucusuna video isteği giderken aradaki 4 yönlendirici, videonun çözünürlüğünü veya HTTP mesajının içeriğini anlamak için video uygulamasını çalıştırır mı?',
          'When a smartphone requests a video from a datacenter Web server across 4 routers, do those core routers run the video application to interpret the video resolution or HTTP content?'
        ),
        options: [
          {
            label: text('Evet; her yönlendirici veriyi doğru sıraya sokmak için uygulamayı kendi içinde çalıştırır.', 'Yes; every router runs the application internally to keep video data in order.'),
            correct: false,
            feedback: text('Hayır — bu klasik bir kavram yanılgısıdır. Yönlendiriciler yalnızca paket başlıklarını inceleyip paketleri çıkış bağlantısına iletir; uygulama kodu yalnız uç sistemlerde çalışır.', 'No — that is a classic misconception. Routers only inspect packet headers and forward packets; application programs run strictly on end systems.')
          },
          {
            label: text('Hayır; dağıtık uygulama yalnızca telefon ve Web sunucusunda (uç sistemlerde) çalışır, çekirdek yönlendiriciler yalnız paket iletir.', 'No; the distributed application runs only on the phone and Web server (end systems), while core routers strictly forward packets.'),
            correct: true,
            feedback: text('Doğru! §1.1.2’nin temel ilkesi budur: İnternet uygulamaları yalnız uç sistemlerde çalışır; çekirdek yönlendiriciler verinin hangi uygulamaya ait olduğuyla ilgilenmez.', 'Correct! That is the core principle of §1.1.2: Internet applications run solely on end systems; core routers are unconcerned with which application generated the payload.')
          },
          {
            label: text('Yalnızca Web sunucusu ağ çekirdeğindedir; telefon ise uç sistemdir.', 'Only the Web server sits in the network core, while the phone is an end system.'),
            correct: false,
            feedback: text('Dikkat! Review Question R1’in temel noktası şudur: Web sunucusu da ağın çekirdeğinde değil, kenarında oturan bir uç sistemdir (host).', 'Careful! As highlighted in Review Question R1, a Web server is also an end system (host) sitting at the edge of the Internet, not a core packet switch.')
          }
        ]
      },
      steps: [
        {
          title: text('1. Uç sistem (Host = End System) tanımı', '1. Defining an End System (Host)'),
          why: text('§1.1.1 ve Review Question R1’deki terminolojiyi netleştirmek için', 'To establish the exact terminology of §1.1.1 and Review Question R1'),
          formula: eqPacketCount,
          note: text('Masaüstü bilgisayarlar, telefonlar, IoT termostatlar ve veri merkezindeki Web sunucularının tamamı "uç sistem (host)" olarak adlandırılır; gönderici uç sistem F baytlık uygulama verisini K pakete böler.', 'Desktops, smartphones, IoT thermostats, and datacenter Web servers are all "end systems (hosts)"; the sending host segments its F-byte application data into K packets.')
        },
        {
          title: text('2. Soket arayüzü sınırı (Posta analojisi)', '2. The Socket Interface Boundary (Postal Analogy)'),
          why: text('Uygulama programı ile İnternet altyapısı arasındaki sözleşmeyi görmek için', 'To see the contract between an application program and the Internet infrastructure'),
          formula: eqPacketSize,
          note: text('Tıpkı Alice’in mektubu zarfa koyup adres/pul ekleyerek posta kutusuna atması gibi, uç sistemdeki program veriyi soket arayüzü üzerinden teslim eder ve her parçaya H baytlık başlık eklenerek L baytlık paketler oluşur.', 'Just as Alice places a letter in an addressed, stamped envelope and drops it into a mailbox, the end-system program hands data across the socket interface where headers of H bytes form L-byte packets.')
        },
        {
          title: text('3. Erişim anahtarı vs Çekirdek yönlendirici', '3. Access Switch vs. Core Router'),
          why: text('Şekil 1.1’deki iki paket anahtarı türünü ayırmak için', 'To distinguish the two packet-switch types shown in Figure 1.1'),
          formula: eqTotalBytes,
          note: text('Bağlantı katmanı anahtarları (link-layer switches) genellikle kurumsal/yerel erişim ağlarında, yönlendiriciler (routers) ise yüksek hızlı ISP çekirdeğinde paketleri hedefe doğru iletir.', 'Link-layer switches typically operate in local/enterprise access networks, while routers operate in the high-speed ISP core to forward packets toward their destination.')
        },
        {
          title: text('4. Başlık ek yükü ve protokol verimliliği', '4. Header Overhead and Protocol Efficiency'),
          why: text('Her pakete başlık eklemenin toplam bayt maliyetini ölçmek için', 'To quantify the byte cost of prepending a header to every packet'),
          formula: eqEfficiency,
          note: text('Veri çok küçük parçalara bölünürse paket sayısı K artar, toplam başlık yükü K·H büyür ve protokol verimliliği η = F / (F + K·H) düşer.', 'If data is split into very small chunks, packet count K grows, total header overhead K·H increases, and protocol efficiency η = F / (F + K·H) drops.')
        },
        {
          title: text('5. Hedef uç sistemde yeniden birleştirme', '5. Reassembly at the Destination End System'),
          why: text('Uygulamanın neden yalnızca kenarda çalıştığını tamamlamak için', 'To complete the proof of why applications run only at the edge'),
          formula: eqWebExchange,
          note: text('Çekirdek yönlendiriciler uygulamadan habersiz biçimde paketleri taşır; paketler yalnızca hedef uç sistemin soketine ulaştığında yeniden birleştirilip alıcı uygulamaya (ör. Web tarayıcısı) teslim edilir.', 'Core routers forward packets without awareness of the application; packets are reassembled and delivered to the receiving application (e.g., Web browser) only at the destination end system.')
        }
      ],
      reflect: text(
        'Laboratuvarda "İnternet Anatomisi" sekmesini açıp bir paketi Ev Dizüstü bilgisayarından Veri Merkezi sunucusuna adım adım ilerlet; hangi düğümlerde "Uygulama Çalışır" ve hangilerinde "Yalnız Paket İletir" yazdığını kontrol et.',
        'Open the "Internet Anatomy" tab in the lab and step a packet from the Home Laptop to the Datacenter Server; verify which hops report "Runs Application" versus "Forwards Packets Only".'
      )
    },
    {
      id: 'protocol-pillars',
      badge: text('ROTA 02 · PROTOKOLÜN 3 SÜTUNU', 'PATH 02 · 3 PILLARS OF A PROTOCOL'),
      title: text('Bir protokolü tam yapan 3 öğe ve standartların (IETF / IEEE) zorunluluğu', 'The 3 defining elements of a protocol and why standards (IETF / IEEE) matter'),
      summary: text(
        'Şekil 1.2’deki insan protokolü ile TCP/HTTP protokolünü karşılaştırarak biçim, sıra, eylem ve zaman aşımı kavramlarını doğrula.',
        'Compare the human protocol and TCP/HTTP protocol in Figure 1.2 to verify format, order, actions, and timeout handling.'
      ),
      prediction: {
        question: text(
          'İstemci bilgisayar Web sunucusuna "TCP bağlantı isteği" gönderdikten sonra sunucudan hiçbir yanıt gelmezse (zaman aşımı), istemci yine de HTTP GET isteğini göndermeli midir?',
          'After a client sends a "TCP connection request" to a Web server, if no reply arrives (timeout), should the client still proceed to send the HTTP GET message?'
        ),
        options: [
          {
            label: text('Evet; GET mesajını gönderirse sunucu uyanıp dosyayı yollayabilir.', 'Yes; sending GET might wake the server up and return the file.'),
            correct: false,
            feedback: text('Hayır! Protokolün "sıra" ve "eylem" kuralları gereği bağlantı onayı (reply) alınmadan GET gönderilmez.', 'No! Protocol "order" and "action" rules dictate that GET must not be sent before a connection reply confirms readiness.')
          },
          {
            label: text('Hayır; protokol yalnızca gelen mesajlara değil, "yanıt gelmemesi / zaman aşımı" gibi olaylara karşı da eylem (yeniden deneme veya vazgeçme) tanımlar.', 'No; a protocol defines actions not only on received messages, but also on other events such as a timeout (retry or abort).'),
            correct: true,
            feedback: text('Tam isabet! Kurose & Ross’un §1.1.3 tanımındaki "veya başka bir olay (or other event)" ifadesi tam olarak zaman aşımı gibi durumlarda GET göndermeyip vazgeçme/yeniden deneme eylemini kapsar.', 'Spot on! The phrase "or other event" in Kurose & Ross’s §1.1.3 definition specifically covers timeout events where the client retries or aborts rather than sending GET.')
          },
          {
            label: text('Protokoller yalnızca mesaj biçimini belirler; zaman aşımı işletim sisteminin keyfine bağlıdır.', 'Protocols only define message format; timeouts are arbitrary OS choices.'),
            correct: false,
            feedback: text('Eksik tanım: Protokol, mesaj biçimi (format) + sıra (order) + iletim/alım/olay eylemlerinin (actions) tamamını birlikte tanımlar.', 'Incomplete definition: A protocol specifies all three together — message format, order, and actions taken on transmission, receipt, or other events.')
          }
        ]
      },
      steps: [
        {
          title: text('1. Mesaj Biçimi (Format)', '1. Message Format'),
          why: text('İki tarafın aynı söz dizimini ayrıştırabilmesi için', 'So both entities can parse the exact same syntax'),
          formula: eqPacketSize,
          note: text('İnsan protokolünde "Merhaba" / "Saat kaç?"; ağ protokolünde ise TCP başlık alanları ve "GET http://.../cs-resources/" biçimi önceden standartlaştırılmıştır.', 'In the human protocol, "Hi" / "Got the time?"; in the network protocol, TCP header fields and "GET http://.../cs-resources/" syntax are strictly specified.')
        },
        {
          title: text('2. Mesaj Sırası (Order)', '2. Message Order'),
          why: text('Hazır olmayan bir tarafa veri talebi göndermemek için', 'To avoid sending data requests to an unready peer'),
          formula: eqWebExchange,
          note: text('Şekil 1.2’de önce 1. gidiş-dönüşte bağlantı el sıkışması (TCP request → reply), ancak bundan sonra 2. gidiş-dönüşte GET ve <dosya> teslimi gerçekleşir.', 'In Figure 1.2, the 1st round-trip performs the handshake (TCP request → reply), and only afterward does the 2nd round-trip carry GET and <file>.')
        },
        {
          title: text('3. Gönderme, Alma ve Diğer Olaylardaki Eylemler (Actions)', '3. Actions on Send, Receive, or Other Events'),
          why: text('Hata, uyumsuzluk ve yanıt gelmeme durumlarını yönetmek için', 'To handle errors, mismatches, and missing replies deterministically'),
          formula: eqExCase4Total,
          note: text('Karşı taraf farklı bir protokol konuşuyorsa veya zaman aşımı oluşursa protokol akışı güvenli biçimde kesilir ya da yeniden denenir.', 'If the peer speaks an incompatible protocol or a timeout expires, the protocol cleanly aborts or triggers retransmission.')
        },
        {
          title: text('4. Birlikte Çalışabilirlik ve Standart Kuruluşları (R3)', '4. Interoperability and Standards Bodies (R3)'),
          why: text('Farklı üreticilerin cihazlarının neden küresel ölçekte anlaşabildiğini açıklamak için', 'To explain how devices from different vendors interoperate globally'),
          formula: eqPacketCount,
          note: text('IETF yaklaşık 9000 RFC belgesiyle TCP, IP, HTTP ve SMTP’yi; IEEE 802 ise Ethernet (802.3) ve WiFi (802.11) bağlantı standartlarını belirler.', 'The IETF specifies TCP, IP, HTTP, and SMTP via nearly 9,000 RFCs; IEEE 802 specifies link standards such as Ethernet (802.3) and WiFi (802.11).')
        },
        {
          title: text('5. İki Gidiş-Dönüşlü Protokol Süresinin Tahmini', '5. Estimating Two-RTT Protocol Latency'),
          why: text('Şekil 1.2’deki 4 mesajlık etkileşimi §1.4’teki gecikme modeline bağlamak için', 'To connect Figure 1.2’s 4-message exchange to §1.4’s delay model'),
          formula: eqEfficiency,
          note: text('1 RTT bağlantı el sıkışması + 1 RTT istek/yanıt yayılımı + dosya iletim süresi (L_file / R), tarayıcının sayfayı eksiksiz alana kadar geçen temel süreyi verir.', '1 RTT for the handshake + 1 RTT for request/reply propagation + file transmission time (L_file / R) yields the baseline Web fetch time.')
        }
      ],
      reflect: text(
        'Laboratuvarda "Protokol Akışı" sekmesine geçip önce "TCP + HTTP GET", ardından "Zaman Aşımı / Yanıt Yok" senaryosunu tek adım ilerleterek incele.',
        'Switch to the "Protocol Flow" tab in the lab and step through "TCP + HTTP GET" followed by "No Reply / Timeout" one message at a time.'
      )
    }
  ]
};

export const internetAnatomyClinic = {
  blueprint: [
    {
      title: text('1. Kenar vs Çekirdek Ayrımı', '1. Edge vs. Core Distinction'),
      body: text('Host = End System (telefon, laptop, IoT, Web sunucusu). Uygulamalar yalnız uç sistemlerde çalışır; çekirdek yönlendiriciler yalnız paket iletir.', 'Host = End System (phone, laptop, IoT, Web server). Applications run only on end systems; core routers strictly forward packets.')
    },
    {
      title: text('2. Paketleme ve Verimlilik', '2. Packetization & Efficiency'),
      body: text('K = ⌈F / P_data⌉ paket, toplam başlık K·H bayt ve verimlilik η = F / (F + K·H). Küçük paketler başlık yüzdesini büyütür.', 'K = ⌈F / P_data⌉ packets, total header K·H bytes, efficiency η = F / (F + K·H). Smaller packets increase header overhead percentage.')
    },
    {
      title: text('3. Protokolün 3 Sütunu', '3. Three Pillars of a Protocol'),
      body: text('Her protokol: (i) mesaj biçimi (format), (ii) mesaj sırası (order) ve (iii) gönderim/alım/zaman aşımı eylemlerini (actions) belirler.', 'Every protocol defines: (i) message format, (ii) message order, and (iii) actions on send, receive, or other events like timeout.')
    },
    {
      title: text('4. Standart Kuruluşları', '4. Standards Bodies'),
      body: text('IETF → RFC belgeleri (TCP, IP, HTTP, SMTP). IEEE 802 → LAN/bağlantı standartları (Ethernet 802.3, WiFi 802.11).', 'IETF → RFC documents (TCP, IP, HTTP, SMTP). IEEE 802 → LAN/link standards (Ethernet 802.3, WiFi 802.11).')
    }
  ],
  examCases: [
    {
      badge: text('VAKA 01 · REVIEW QUESTION R1', 'CASE 01 · REVIEW QUESTION R1'),
      title: text('Host ile End System arasındaki fark nedir? Bir Web sunucusu uç sistem midir?', 'What is the difference between a host and an end system? Is a Web server an end system?'),
      statement: text(
        'Bir sınav sorusu: "Host (konak) ile end system (uç sistem) arasındaki farkı açıklayınız; dört farklı uç sistem örneği veriniz ve bir Web sunucusunun uç sistem olup olmadığını gerekçelendiriniz."',
        'Exam prompt: "Explain the difference between a host and an end system; list four distinct types of end systems and justify whether a Web server qualifies as an end system."'
      ),
      trap: text(
        'En sık yapılan hata, güçlü bir veri merkezi Web sunucusunun "ağ çekirdeğinin parçası" olduğunu sanmaktır. Oysa çekirdek yalnızca yönlendiriciler ve fiber bağlantılardan oluşur; sunucular uygulamanın uç noktasıdır.',
        'The most common mistake is assuming a powerful datacenter Web server is part of the "network core." In reality, the core consists of routers and links; servers are application endpoints at the edge.'
      ),
      steps: [
        {
          title: text('Adım 1: Terminoloji eşdeğerliği', 'Step 1: Terminology equivalence'),
          formula: eqPacketCount,
          note: text('Host (konak) ile end system (uç sistem) arasında hiçbir fark yoktur; iki terim İnternet literatüründe birebir eş anlamlıdır.', 'There is no difference between a host and an end system; the two terms are exact synonyms in Internet terminology.')
        },
        {
          title: text('Adım 2: Çeşitli uç sistem örnekleri', 'Step 2: Diverse end system examples'),
          formula: eqPacketSize,
          note: text('Masaüstü PC / Linux iş istasyonu, akıllı telefon / tablet, akıllı termostat / otomobil / trafik lambası (IoT) ve e-posta / Web sunucuları uç sistemlerdir.', 'Desktop PCs / Linux workstations, smartphones / tablets, smart thermostats / connected cars / traffic lights (IoT), and e-mail / Web servers are all end systems.')
        },
        {
          title: text('Adım 3: Web sunucusu neden uç sistemdir?', 'Step 3: Why a Web server is an end system'),
          formula: eqWebExchange,
          note: text('Evet, Web sunucusu bir uç sistemdir; çünkü HTTP gibi dağıtık uygulamaları çalıştırır, soket arayüzünü kullanır ve ağın çekirdeğinde değil kenarında yer alır.', 'Yes, a Web server is an end system because it runs distributed applications such as HTTP, uses the socket interface, and sits at the edge of the network.')
        }
      ]
    },
    {
      badge: text('VAKA 02 · REVIEW QUESTION R3 & STANDARTLAR', 'CASE 02 · REVIEW QUESTION R3 & STANDARDS'),
      title: text('Protokoller için standartlar neden zorunludur? IETF ile IEEE 802 ayrımı', 'Why are standards essential for protocols? IETF vs. IEEE 802 distinction'),
      statement: text(
        'Farklı üreticilerin (ör. Apple telefonu, Cisco yönlendiricisi, Linux sunucusu) ürettiği donanım ve yazılımlar dünya genelinde nasıl sorunsuz haberleşir? Hangi kuruluş hangi katmanları standartlaştırır?',
        'How do hardware and software built by different vendors (e.g., an Apple phone, a Cisco router, and a Linux server) communicate reliably worldwide? Which body standardizes which components?'
      ),
      trap: text(
        'Ethernet ve WiFi standartlarını IETF RFC’lerine yazmak sık yapılan bir karıştırmadır. Ethernet (802.3) ve WiFi (802.11) IEEE 802 komitesinin alanıdır; TCP/IP/HTTP/SMTP ise IETF RFC’lerindedir.',
        'Attributing Ethernet and WiFi to IETF RFCs is a frequent slip. Ethernet (802.3) and WiFi (802.11) belong to the IEEE 802 committee, whereas TCP, IP, HTTP, and SMTP are standardized in IETF RFCs.'
      ),
      steps: [
        {
          title: text('Adım 1: Birlikte çalışabilirlik (Interoperability) gereksinimi', 'Step 1: The interoperability requirement'),
          formula: eqPacketSize,
          note: text('İki sistem farklı protokol kuralları kullanırsa (tıpkı farklı dil konuşan iki kişi gibi) verimli iletişim kuramaz. Açık standartlar herkesin aynı mesaj biçimi, sırası ve eylemleri üzerinde uzlaşmasını sağlar.', 'If two systems implement incompatible protocol rules (like two people speaking different languages), no useful work can be done. Open standards guarantee agreement on format, order, and actions.')
        },
        {
          title: text('Adım 2: IETF ve RFC belgeleri', 'Step 2: IETF and RFC documents'),
          formula: eqWebExchange,
          note: text('Internet Engineering Task Force (IETF), TCP, IP, HTTP ve SMTP gibi çekirdek ve uygulama protokollerini RFC (Request for Comments) belgeleriyle yayımlar.', 'The Internet Engineering Task Force (IETF) publishes technical specifications for TCP, IP, HTTP, and SMTP as Requests for Comments (RFCs).')
        },
        {
          title: text('Adım 3: IEEE 802 bağlantı standartları', 'Step 3: IEEE 802 link standards'),
          formula: eqTotalBytes,
          note: text('IEEE 802 LAN Standartları Komitesi, uç sistemleri yerel erişim ağlarına bağlayan Ethernet ve kablosuz WiFi standartlarını tanımlar.', 'The IEEE 802 LAN Standards Committee defines the Ethernet and wireless WiFi standards that connect end systems to local access networks.')
        }
      ]
    },
    {
      badge: text('VAKA 03 · SAYISAL HESAP · PAKET BAŞLIK VERİMLİLİĞİ', 'CASE 03 · NUMERICAL · PACKET HEADER EFFICIENCY'),
      title: text('10.000 baytlık mesajın paketlenmesi: Paket sayısı, başlık yükü ve verimlilik', 'Segmenting a 10,000-byte message: Packet count, header overhead, and efficiency'),
      statement: text(
        'Bir uç sistem F = 10.000 baytlık bir veriyi en fazla P_data = 1.000 baytlık parçalara bölüyor ve her paketin önüne H = 40 baytlık TCP/IP başlığı ekliyor. Toplam paket sayısını K, toplam başlık yükünü ve protokol verimliliğini η bulunuz.',
        'An end system segments an F = 10,000-byte message into payloads of at most P_data = 1,000 bytes and prepends an H = 40-byte TCP/IP header to each packet. Find the packet count K, total header overhead, and protocol efficiency η.'
      ),
      trap: text(
        'Verimlilik paydasına yalnız uygulama verisi F’yi değil, kabloya basılan TOPLAM baytı (F + K·H) yazmalısınız. Ayrıca F, P_data’ya tam bölünmüyorsa yukarı yuvarlama (tavan fonksiyonu ⌈·⌉) unutulmamalıdır.',
        'The denominator of efficiency must be the TOTAL bytes transmitted (F + K·H), not just F. Also, whenever F is not an exact multiple of P_data, remember to apply the ceiling function ⌈·⌉.'
      ),
      steps: [
        {
          title: text('Adım 1: Paket sayısını (K) hesapla', 'Step 1: Compute packet count (K)'),
          formula: eqExCase3Count,
          note: text('10.000 bayt, 1.000 baytlık parçalara tam bölündüğü için K = 10 paket oluşur.', 'Because 10,000 bytes divides evenly by 1,000 bytes, exactly K = 10 packets are created.')
        },
        {
          title: text('Adım 2: Toplam başlık yükü ve toplam iletilen bayt', 'Step 2: Total header overhead and total transmitted bytes'),
          formula: eqTotalBytes,
          note: text('Her pakete 40 bayt başlık eklendiğinden toplam başlık yükü 10 × 40 = 400 bayt; kabloya basılan toplam veri B_tot = 10.000 + 400 = 10.400 bayttır.', 'With 40 bytes of header per packet, total header overhead is 10 × 40 = 400 bytes, so total bytes sent on the wire are B_tot = 10,000 + 400 = 10,400 bytes.')
        },
        {
          title: text('Adım 3: Protokol verimliliği (η) ve kontrol', 'Step 3: Protocol efficiency (η) and sanity check'),
          formula: eqExCase3Eff,
          note: text('η = 10.000 / 10.400 ≈ %96,15. Kontrol: Başlık yüzdesi 400 / 10.400 ≈ %3,85 olup %96,15 + %3,85 = %100 eder.', 'η = 10,000 / 10,400 ≈ 96.15%. Check: Header overhead is 400 / 10,400 ≈ 3.85%, and 96.15% + 3.85% = 100%.')
        }
      ]
    },
    {
      badge: text('VAKA 04 · ŞEKİL 1.2 · PROTOKOL ETKİLEŞİM SÜRESİ', 'CASE 04 · FIGURE 1.2 · PROTOCOL EXCHANGE TIMING'),
      title: text('Şekil 1.2’deki 2 gidiş-dönüşlü Web isteği toplam kaç ms sürer?', 'How many milliseconds does the 2-RTT Web exchange in Figure 1.2 take?'),
      statement: text(
        'Bir tarayıcı ile Web sunucusu arasındaki gidiş-dönüş süresi RTT = 35 ms, bağlantı hızı R = 10 Mbps ve istenen web dosyası L_file = 200.000 bayttır. Şekil 1.2’deki TCP bağlantı el sıkışması + HTTP GET + dosya tesliminin toplam süresini hesaplayınız (kontrol mesajlarının iletim süresi ihmal).',
        'Between a browser and a Web server, the round-trip time is RTT = 35 ms, link rate is R = 10 Mbps, and the requested Web file is L_file = 200,000 bytes. Compute the total duration of the TCP handshake + HTTP GET + file transfer shown in Figure 1.2 (neglecting control-message transmission times).'
      ),
      trap: text(
        'Baytı bite çevirmeden (× 8 yapmadan) Mbps’ye bölmek 8 katlık hata doğurur! Ayrıca Şekil 1.2’de 1 değil, 2 tam gidiş-dönüş (1. RTT: TCP el sıkışma, 2. RTT: GET ve yanıt başlangıcı) vardır.',
        'Dividing bytes directly by Mbps without multiplying by 8 causes an 8× error! Also, Figure 1.2 involves 2 round-trips (1st RTT: TCP handshake; 2nd RTT: GET request and first bit of file), not 1.'
      ),
      steps: [
        {
          title: text('Adım 1: İki gidiş-dönüş (2 · RTT) süresini ayır', 'Step 1: Account for two round-trips (2 · RTT)'),
          formula: eqWebExchange,
          note: text('1. RTT = 35 ms (TCP connection request + reply), 2. RTT = 35 ms (HTTP GET + dosyanın ilk bitinin gelişi) → Toplam 2 · RTT = 70 ms.', '1st RTT = 35 ms (TCP connection request + reply), 2nd RTT = 35 ms (HTTP GET + arrival of first bit) → 2 · RTT = 70 ms.')
        },
        {
          title: text('Adım 2: Dosya boyutunu bite çevir ve iletim süresini bul', 'Step 2: Convert file bytes to bits and find transmission time'),
          formula: eqExCase4Total,
          note: text('L_file = 200.000 × 8 = 1.600.000 bit. İletim süresi = 1.600.000 / 10.000.000 = 0,16 sn = 160 ms. Toplam süre = 70 + 160 = 230 ms.', 'L_file = 200,000 × 8 = 1,600,000 bits. Transmission time = 1,600,000 / 10,000,000 = 0.16 s = 160 ms. Total time = 70 + 160 = 230 ms.')
        }
      ]
    }
  ]
};
