import {packetDelayExtraQuestions} from './questions.js';
import {packetDelayStudy, packetDelayClinic} from './study.js';

const text = (tr, en) => ({tr, en});

export const packetDelayLesson = {
  id: 'kurose-ross-8e:1.4',
  section: '1.4',
  chapterNumber: '01',
  chapterTitle: text('Bilgisayar ağları ve İnternet', 'Computer Networks and the Internet'),
  title: text(
    'İletim gecikmesi, yayılma gecikmesi ve store-and-forward paket anahtarlama',
    'Transmission delay, propagation delay, and store-and-forward packet switching'
  ),
  englishTitle: 'Transmission Delay, Propagation Delay, and Store-and-Forward Packet Switching',
  subtitle: text(
    'Bitlerin bağlantıya itilme süresi (L/R) ile kabloda yayılma süresini (d/v) ayırt et; store-and-forward yönlendiricilerde çok paketli boru hattı (pipelining), Bant Genişliği–Gecikme Çarpımı (BDP) ve darboğaz kuyruklarını adım adım keşfet.',
    'Distinguish the time to push bits onto a link (L/R) from the time a bit propagates across the medium (d/v); explore multi-packet store-and-forward pipelining, Bandwidth-Delay Product (BDP), and bottleneck queuing step by step.'
  ),
  pages: text('23–26, 35–46 (Problemler s.67–75)', '23–26, 35–46 (Problems pp. 67–75)'),
  pdfPages: '34–37, 46–57, 78–86',
  lessonPath: text('lessons/kurose-ross-8e/1-4/lesson.md', 'lessons/kurose-ross-8e/1-4/lesson-en.md'),
  mathPath: 'lessons/kurose-ross-8e/1-4/math.json',
  inlinePath: 'lessons/kurose-ross-8e/1-4/inline.json',
  labFamily: 'packet-delay',
  downloadName: text(
    '1-4-iletim-yayilma-ve-store-and-forward.md',
    '1-4-transmission-propagation-and-store-and-forward.md'
  ),
  highlights: text(
    [
      'Paket anahtarlama ve store-and-forward kuralı (§1.3.1, Şekil 1.11)',
      'Dört düğüm gecikmesi bileşeni: d_proc, d_queue, d_trans, d_prop (§1.4.1, Şekil 1.16)',
      'İletim gecikmesi (L/R) vs yayılma gecikmesi (d/v) ve Karavan Analojisi (Şekil 1.17)',
      'Bant Genişliği–Gecikme Çarpımı (BDP = R·d_prop) ve bir bitin kablodaki metre boyu (v/R)',
      'N bağlantılı yolda P paket için boru hattı (pipelining): (N + P − 1)·(L/R) + N·d_prop',
      'Mesaj bölütleme (segmentation, Şekil 1.27) ve darboğaz (bottleneck) kuyruk birikimi'
    ],
    [
      'Packet switching and the store-and-forward rule (§1.3.1, Figure 1.11)',
      'Four nodal delay components: d_proc, d_queue, d_trans, d_prop (§1.4.1, Figure 1.16)',
      'Transmission delay (L/R) vs propagation delay (d/v) and the Caravan Analogy (Figure 1.17)',
      'Bandwidth-Delay Product (BDP = R·d_prop) and the spatial width of a bit (v/R)',
      'Multi-packet pipelining across N links: (N + P − 1)·(L/R) + N·d_prop',
      'Message segmentation (Figure 1.27) and bottleneck router queue buildup'
    ]
  ),
  notesPlaceholder: text(
    'Örneğin: Bağlantı hızı R iki katına çıktığında L/R, d/v ve kablodaki bir bitin metre cinsinden uzunluğu (v/R) nasıl değişir?',
    'E.g., When link transmission rate R doubles, how do L/R, d/v, and the spatial width of a bit on the wire (v/R) change?'
  ),
  sourceSummary: text(
    'James F. Kurose & Keith W. Ross, Computer Networking: A Top-Down Approach, 8th Edition (Pearson, 2021), §1.3.1 Packet Switching (basılı s.23–26, PDF s.34–37; Şekil 1.11–1.12), §1.4 Delay, Loss, and Throughput in Packet-Switched Networks (basılı s.35–46, PDF s.46–57; Şekil 1.16–1.20) ve Bölüm 1 sonu problemleri (basılı s.67–75, PDF s.78–86; R11, R16–R19, P2, P6, P10–P12, P23, P25–P27, P31 ve Şekil 1.27) temelinde hazırlanmış özgün çift dilli öğrenme ve simülasyon modülüdür. Kaynak PDF şekilleri private/book/ altında yerel referans olarak tutulur; arayüzdeki tüm etkileşimli diyagramlar model durumundan çizilen özgün SVG uyarlamalarıdır.',
    'Original bilingual instructional and simulation module based on James F. Kurose & Keith W. Ross, Computer Networking: A Top-Down Approach, 8th Edition (Pearson, 2021), §1.3.1 Packet Switching (printed pp. 23–26, PDF pp. 34–37; Figures 1.11–1.12), §1.4 Delay, Loss, and Throughput in Packet-Switched Networks (printed pp. 35–46, PDF pp. 46–57; Figures 1.16–1.20), and Chapter 1 Review Questions & Problems (printed pp. 67–75, PDF pp. 78–86; R11, R16–R19, P2, P6, P10–P12, P23, P25–P27, P31, and Figure 1.27). Source PDF figures are retained locally under private/book/ for inspection; all interactive diagrams in the app are original SVG adaptations driven directly by mathematical model state.'
  ),
  modelLimits: text(
    'Paket iletim laboratuvarı deterministik bir ayrık-olay ve sürekli-dalga modeli kullanır. Paket boyutu L, protokol başlığı (header) dahil toplam bit sayısını temsil eder; başlık ek yükü ayrıca ayrıştırılmaz. Düğüm işleme gecikmesi (d_proc ≈ 0), rastgele çapraz trafik, tampon taşması kaynaklı paket kaybı ve bit hataları bu temel laboratuvarda sıfır kabul edilmiştir. Yönlendirici kuyruk gecikmesi (d_queue), yalnızca birinci bağlantının ikinci bağlantıdan daha hızlı olduğu (R₁ > R₂) çok paketli darboğaz senaryolarında deterministik olarak oluşur.',
    'The packet transmission laboratory uses a deterministic discrete-event and continuous-wave model. Packet size L represents the total bit length including headers; header overhead is not modeled separately. Nodal processing delay (d_proc ≈ 0), random cross-traffic, buffer-overflow packet loss, and bit errors are set to zero in this foundational lab. Router queuing delay (d_queue) arises deterministically when a faster upstream link feeds a slower downstream bottleneck link (R₁ > R₂) during multi-packet bursts.'
  ),
  presentation: {
    clinicEyebrow: text(
      '§1.3.1 & §1.4 · BİLGİSAYAR AĞLARI SINAV KLİNİĞİ · ÖZGÜN ÇÖZÜMLÜ PROBLEMLER',
      '§1.3.1 & §1.4 · COMPUTER NETWORKING EXAM CLINIC · WORKED PROBLEMS'
    ),
    lab: text('Paket iletim & gecikme laboratuvarı', 'Packet delay & switching lab'),
    practice: text('Sınav kliniği & alıştırma', 'Exam clinic & practice'),
    practiceTitle: text('Birimleri çevir, L/R ile d/v’yi ayır, boru hattını zamanla.', 'Convert units, separate L/R from d/v, and time the pipeline.'),
    practiceIntro: text(
      '20 dakika · 22 puan. Önce §1.3.1 ve §1.4 problemlerinden uyarlanan dört kapsamlı sınav vakasını adım adım incele; ardından 12 özgün soruyla kavramsal yanılgıları ve sayısal hesapları sına.',
      '20 minutes · 22 points. First study four comprehensive exam cases adapted from §1.3.1 and §1.4 concepts; then test conceptual misconceptions and numerical calculations across 12 original questions.'
    ),
    practiceDisclaimer: text(
      'Alıştırma soruları Kurose & Ross 8. baskı §1.3.1 ve §1.4 kavramları temelinde bu uygulama için özgün olarak yazılmıştır; kitaptan birebir kopyalanmış metinler değildir.',
      'These practice questions are original problems authored for this learning environment based on concepts in Kurose & Ross 8th Ed. §1.3.1 and §1.4; they are not verbatim copies of textbook questions.'
    )
  },
  studySupport: packetDelayStudy,
  guidedTools: packetDelayClinic,
  questions: [
    {
      title: text('Kavram yanılgısı: Bağlantı hızı (R) artarsa yayılma gecikmesi azalır mı?', 'Misconception check: Does higher link rate (R) reduce propagation delay?'),
      tag: text('KAVRAM YANILGISI · §1.4.1', 'MISCONCEPTION CHECK · §1.4.1'),
      difficulty: text('Temel', 'Core'),
      text: text(
        'İki yönlendirici arasındaki 1.000 km’lik fiber optik bağlantının iletim hızı R = 10 Mbps’den R = 10 Gbps’ye yükseltiliyor (kablo ve paket boyutu L aynı kalıyor). Bu değişiklik iletim gecikmesini (d_trans) ve yayılma gecikmesini (d_prop) nasıl etkiler?',
        'A 1,000 km fiber-optic link between two routers is upgraded from transmission rate R = 10 Mbps to R = 10 Gbps (while the physical cable and packet size L remain unchanged). How does this upgrade affect transmission delay (d_trans) and propagation delay (d_prop)?'
      ),
      choices: text(
        [
          'Hem iletim gecikmesi hem de yayılma gecikmesi 1.000 kat azalır.',
          'İletim gecikmesi (L/R) 1.000 kat azalır; yayılma gecikmesi (d/v) hiç değişmez.',
          'Yayılma gecikmesi 1.000 kat azalır; iletim gecikmesi sabit kalır.'
        ],
        [
          'Both transmission delay and propagation delay decrease by a factor of 1,000.',
          'Transmission delay (L/R) decreases by a factor of 1,000, while propagation delay (d/v) does not change at all.',
          'Propagation delay decreases by a factor of 1,000, while transmission delay remains constant.'
        ]
      ),
      answer: 1,
      feedback: text(
        'Doğru! İletim gecikmesi d_trans = L/R olduğu için R 1.000 katına çıktığında L/R 1.000 kat küçülür. Ancak yayılma gecikmesi d_prop = d/v yalnızca mesafeye (1.000 km) ve fiberdeki ışık hızına (v ≈ 2×10⁸ m/sn) bağlıdır; bağlantı hızı R’den tamamen bağımsızdır.',
        'Correct! Because transmission delay is d_trans = L/R, increasing R by 1,000× shrinks L/R by 1,000×. However, propagation delay d_prop = d/v depends only on distance (1,000 km) and the speed of light in fiber (v ≈ 2×10⁸ m/s); it is completely independent of link rate R.'
      ),
      solutionSummary: text(
        'd_trans = L/R ifadesinde R paydadadır; d_prop = d/v ifadesinde ise ne L ne de R yer alır.',
        'R appears in the denominator of d_trans = L/R, whereas neither L nor R appears in d_prop = d/v.'
      ),
      hints: text(
        [
          'İletim gecikmesi L/R ve yayılma gecikmesi d/v formüllerinin hangi değişkenlere bağlı olduğuna bak.',
          'Gişenin araçları otoyola daha hızlı salması (R), otoyoldaki hız sınırını (v) değiştirir mi?'
        ],
        [
          'Look at which variables appear in d_trans = L/R versus d_prop = d/v.',
          'Does a faster tollbooth service rate (R) change the highway speed limit (v)?'
        ]
      )
    },
    {
      title: text('Kavram kontrolü: Paket boyutu (L) yayılma gecikmesini etkiler mi?', 'Concept check: Does packet size (L) affect propagation delay?'),
      tag: text('KAVRAM KONTROLÜ · §1.4.1 (R18 BENZERİ)', 'CONCEPT CHECK · §1.4.1 (R18 STYLE)'),
      difficulty: text('Temel', 'Core'),
      text: text(
        'Tek bir bitin bağlantının başından sonuna kadar kabloda ilerleme süresine yayılma gecikmesi (d_prop) denir. Paket boyutu L = 500 Bayttan L = 1.500 Bayta (3 katına) çıkarılırsa d_prop ve d_trans nasıl değişir?',
        'The time required for a single bit to travel from the beginning of a link to its end is the propagation delay (d_prop). If packet length is tripled from L = 500 Bytes to L = 1,500 Bytes, how do d_prop and d_trans change?'
      ),
      choices: text(
        [
          'd_prop değişmez; d_trans = L/R üç katına çıkar.',
          'Hem d_prop hem de d_trans üç katına çıkar.',
          'd_prop üç katına çıkar; d_trans değişmez.'
        ],
        [
          'd_prop stays unchanged, while d_trans = L/R triples.',
          'Both d_prop and d_trans triple.',
          'd_prop triples, while d_trans stays unchanged.'
        ]
      ),
      answer: 0,
      feedback: text(
        'Doğru! Pakette 3 kat fazla bit olması, tüm bitleri kabloya itme süresini (d_trans = L/R) 3 katına çıkarır; fakat kabloya giren herhangi bir bitin karşı uca varış süresi (d_prop = d/v) paket boyutuna bağlı değildir.',
        'Correct! Having 3× as many bits triples the time required to push all bits onto the link (d_trans = L/R), but the time for any given bit to propagate across the link (d_prop = d/v) does not depend on packet length.'
      ),
      solutionSummary: text(
        'd_prop = d/v paket boyutu L’den bağımsızdır; d_trans = L/R ise L ile doğru orantılıdır.',
        'd_prop = d/v is independent of packet length L, whereas d_trans = L/R is directly proportional to L.'
      ),
      hints: text(
        [
          'Karavan analojisini düşün: Karavanda 10 araba yerine 30 araba olması, tek bir arabanın 100 km’lik otoyolu geçme süresini değiştirir mi?',
          'Yoksa yalnızca gişeden tüm karavanın çıkma süresini (L/R) mi uzatır?'
        ],
        [
          'Think of the caravan analogy: does having 30 cars instead of 10 change the time it takes a single car to drive 100 km on the highway?',
          'Or does it only increase the time needed for the tollbooth to push the entire caravan onto the road (L/R)?'
        ]
      )
    },
    {
      title: text('Store-and-forward kuralı: Yönlendirici ne zaman iletime başlar?', 'Store-and-forward rule: When can a router begin forwarding?'),
      tag: text('TEMEL İLKE · §1.3.1 (ŞEKİL 1.11)', 'CORE PRINCIPLE · §1.3.1 (FIGURE 1.11)'),
      difficulty: text('Temel', 'Core'),
      text: text(
        't = 0 anında gönderici L bitlik bir paketi R₁ hızlı ve d₁/v₁ yayılma gecikmeli birinci bağlantıya vermeye başlıyor. Store-and-forward (depola ve ilet) çalışan bir yönlendirici (işleme ve kuyruk gecikmesi sıfırken) bu paketin İLK bitini ikinci bağlantıya hangi anda iletmeye başlayabilir?',
        'At t = 0 a sender begins transmitting an L-bit packet over Link 1 (rate R₁, propagation delay d₁/v₁). Assuming zero processing and queuing delay, at what time can a store-and-forward router begin transmitting the FIRST bit of this packet onto Link 2?'
      ),
      choices: text(
        [
          'Paketin ilk biti yönlendiriciye ulaştığı anda: t = d₁ / v₁',
          'Gönderici son biti kabloya verdiği anda: t = L / R₁',
          'Paketin SON biti yönlendiriciye ulaşıp paketin tamamı depolandığı anda: t = L / R₁ + d₁ / v₁'
        ],
        [
          'As soon as the first bit reaches the router: t = d₁ / v₁',
          'As soon as the sender finishes pushing the last bit: t = L / R₁',
          'Only after the LAST bit reaches the router and the entire packet is stored: t = L / R₁ + d₁ / v₁'
        ]
      ),
      answer: 2,
      feedback: text(
        'Doğru! Store-and-forward yönlendirici, paketin ilk biti t = d₁/v₁ anında vardığında onu tamponda bekletir (Şekil 1.11); son bit t = L/R₁ + d₁/v₁ anında gelip paketin tamamı teslim alınmadan ikinci bağlantıya tek bir bit bile çıkaramaz.',
        'Correct! When the first bit arrives at t = d₁/v₁, a store-and-forward router buffers it (Figure 1.11); it cannot transmit a single bit onto Link 2 until the last bit arrives at t = L/R₁ + d₁/v₁ and the entire packet is stored.'
      ),
      solutionSummary: text(
        'Son bit göndericiden t = L/R₁ anında çıkar ve d₁/v₁ süre kabloda yayılarak t = L/R₁ + d₁/v₁ anında yönlendiriciye varır.',
        'The last bit leaves the sender at t = L/R₁ and propagates for d₁/v₁, arriving at the router at t = L/R₁ + d₁/v₁.'
      ),
      hints: text(
        [
          'Store-and-forward (depola ve ilet) tanımını hatırla: Yönlendirici paketin tamamını almadan iletime başlayabilir mi?',
          'Paketin son biti göndericiden hangi anda çıkar ve yönlendiriciye varması ne kadar sürer?'
        ],
        [
          'Recall the definition of store-and-forward: can the router start forwarding before receiving the entire packet?',
          'When does the last bit leave the sender, and how long does it take to propagate to the router?'
        ]
      )
    },
    {
      title: text('Sabit gecikmeler vs değişken gecikme', 'Constant versus variable delay components'),
      tag: text('KAVRAM KONTROLÜ · §1.4.1 (R16 BENZERİ)', 'CONCEPT CHECK · §1.4.1 (R16 STYLE)'),
      difficulty: text('Temel', 'Core'),
      text: text(
        'Sabit bir rota üzerinden arka arkaya gönderilen eşit boyuttaki (L) paketler için dört düğüm gecikmesi bileşeninden (d_proc, d_queue, d_trans, d_prop) hangisi ağdaki anlık trafik yoğunluğuna (La/R) bağlı olarak paketten pakete büyük ölçüde değişir?',
        'For equal-length (L) packets sent over a fixed route, which of the four nodal delay components (d_proc, d_queue, d_trans, d_prop) varies significantly from packet to packet depending on instantaneous traffic intensity (La/R)?'
      ),
      choices: text(
        [
          'Yayılma gecikmesi (d_prop = d/v)',
          'Kuyruk gecikmesi (d_queue)',
          'İletim gecikmesi (d_trans = L/R)'
        ],
        [
          'Propagation delay (d_prop = d/v)',
          'Queuing delay (d_queue)',
          'Transmission delay (d_trans = L/R)'
        ]
      ),
      answer: 1,
      feedback: text(
        'Doğru! Sabit rotada d ve v sabit olduğundan d_prop sabittir; L ve R sabit olduğundan d_trans sabittir; d_proc ise mikrosaniye mertebesinde neredeyse sabittir. Ancak kuyruk gecikmesi (d_queue), o anda çıkış tamponunda bekleyen diğer paketlerin sayısına bağlı olarak sıfır ile çok yüksek değerler arasında değişir.',
        'Correct! On a fixed route with fixed packet size L, d_prop = d/v and d_trans = L/R are constant, and d_proc is nearly constant. Queuing delay (d_queue), however, varies from packet to packet depending on how many earlier packets are waiting in the output buffer.'
      ),
      solutionSummary: text(
        'd_queue çıkış tamponundaki anlık doluluğa ve trafik yoğunluğu La/R değerine bağlı olduğu için paketten pakete değişir.',
        'd_queue depends on instantaneous output buffer occupancy and traffic intensity La/R, so it varies from packet to packet.'
      ),
      hints: text(
        [
          'Aynı boyuttaki10 paket boş bir kuyruğa aynı anda gelirse 1. paket ile 10. paketin hangi gecikme bileşeni birbirinden farklı olur?',
          'Şekil 1.18’de trafik yoğunluğu La/R → 1 iken hızla büyüyen gecikmeyi hatırla.'
        ],
        [
          'If 10 equal packets arrive simultaneously at an empty queue, which delay component differs between the 1st and 10th packet?',
          'Recall from Figure 1.18 which delay explodes as traffic intensity La/R → 1.'
        ]
      )
    },
    ...packetDelayExtraQuestions
  ]
};
