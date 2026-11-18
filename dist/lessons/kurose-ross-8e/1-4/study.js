import {T, step, v, n, o, r, p, f, pow, sub, eq, plus, minus, fn, lines} from '../../../study/math.js';

const L = v('L'), R = v('R'), d = v('d'), s = v('v');
const R1 = sub(R, n(1)), R2 = sub(R, n(2)), R3 = sub(R, n(3));
const d1 = sub(d, n(1)), d2 = sub(d, n(2)), d3 = sub(d, n(3));
const N = v('N'), P = v('P'), F = v('F'), BDP = v('BDP');
const dTrans = sub(d, v('trans')), dProp = sub(d, v('prop'));
const dProc = sub(d, v('proc')), dQueue = sub(d, v('queue')), dNodal = sub(d, v('nodal'));
const dEnd = sub(d, v('end'));
const imp = o('⇒'), cdot = o('·'), approx = o('≈');

const pathDelayComponents = [
  step(
    '1. İletim gecikmesi (Transmission Delay): Bitleri bağlantıya itme süresi',
    '1. Transmission Delay: Time required to push bits onto the link',
    lines(
      dTrans + eq + f(L, R)
    ),
    'L paket boyutunu (bit), R bağlantının iletim hızını (bit/sn veya bps) gösterir. d_trans yalnızca paket uzunluğuna ve bağlantı kapasitesine bağlıdır; iki düğüm arasındaki fiziksel mesafeyle (d) hiçbir ilgisi yoktur.',
    'L denotes packet length (bits) and R denotes link transmission rate (bits/sec or bps). d_trans depends solely on packet length and link capacity; it has nothing to do with the physical distance (d) between the two nodes.'
  ),
  step(
    '2. Yayılma gecikmesi (Propagation Delay): Tek bir bitin kabloda katettiği süre',
    '2. Propagation Delay: Time for one bit to travel across the physical medium',
    lines(
      dProp + eq + f(d, s) + o(','),
      n(2) + cdot + pow(n(10), n(8)) + o('≤') + s + o('≤') + n(3) + cdot + pow(n(10), n(8))
    ),
    'd bağlantı uzunluğunu (metre), v (kitapta s) elektromanyetik sinyalin fiziksel ortamdaki yayılma hızını (m/sn) gösterir. d_prop yalnızca mesafeye ve fiziksel ortama (fiber, bakır, radyo) bağlıdır; bağlantı hızı R artırıldığında yayılma gecikmesi değişmez.',
    'd is the link length (meters) and v (s in the textbook) is the propagation speed (m/s) in the physical medium. d_prop depends only on distance and medium (fiber, copper, radio); increasing link rate R does not change propagation delay.'
  ),
  step(
    '3. Karavan ve gişe analojisi (Şekil 1.17): Gişe hizmet süresi vs otoyol sürüş süresi',
    '3. Caravan and tollbooth analogy (Figure 1.17): Service time vs highway travel time',
    lines(
      dTrans + eq + f(n(10), n(5)) + eq + n(2) + o(','),
      dProp + eq + f(n(100), n(100)) + eq + n(60) + imp + dTrans + plus + dProp + eq + n(62)
    ),
    '10 araçlık bir karavan (L = 10), dakikada 5 araç geçiren bir gişeden (R = 5 araç/dk) yola tamamen çıkmak için L/R = 2 dakika harcar. Her aracın 100 km yolu 100 km/sa hızla gitmesi d/v = 60 dakika sürer. Son aracın ikinci gişeye varışı 2 + 60 = 62 dakikadır.',
    'A 10-car caravan (L = 10) served at 5 cars/min (R = 5) takes L/R = 2 minutes to be pushed completely onto the highway. Each car takes d/v = 100/100 = 60 minutes to travel 100 km. The last car reaches the second tollbooth at 2 + 60 = 62 minutes.'
  ),
  step(
    '4. Bant Genişliği–Gecikme Çarpımı (BDP) ve bir bitin kablodaki fiziksel uzunluğu',
    '4. Bandwidth-Delay Product (BDP) and the physical width of a bit on the wire',
    lines(
      BDP + eq + R + cdot + dProp + eq + R + cdot + f(d, s) + o(','),
      sub(v('w'), v('bit')) + eq + f(s, R)
    ),
    'BDP = R · d_prop, bir bağlantı üzerinde aynı anda uçuşta (in flight) bulunabilecek maksimum bit sayısıdır. d_prop > d_trans ise (BDP > L), gönderici son biti göndermeyi bitirdiğinde ilk bit henüz alıcıya ulaşmamıştır; paketin tamamı kablo üzerindedir.',
    'BDP = R · d_prop is the maximum number of bits that can be in flight inside the link at any instant. When d_prop > d_trans (BDP > L), the sender finishes transmitting the last bit before the first bit reaches the receiver; the entire packet is in flight on the wire.'
  ),
  step(
    '5. Toplam düğüm gecikmesi (Şekil 1.16): Dört bileşenin birleşimi',
    '5. Total nodal delay (Figure 1.16): Combining the four delay components',
    lines(
      dNodal + eq + dProc + plus + dQueue + plus + dTrans + plus + dProp + o(','),
      v('I') + eq + f(L + cdot + v('a'), R)
    ),
    'Bir yönlendiricide toplam düğüm gecikmesi; başlık işleme (d_proc), çıkış tamponunda sıra bekleme (d_queue), bağlantıya bit bit aktarım (d_trans = L/R) ve kabloda yayılma (d_prop = d/v) toplamıdır. Trafik yoğunluğu I = La/R → 1 oldukça d_queue hızla büyür.',
    'At a router, total nodal delay is the sum of header processing (d_proc), output buffer waiting (d_queue), bit transmission onto the link (d_trans = L/R), and propagation across the wire (d_prop = d/v). As traffic intensity I = La/R → 1, d_queue grows rapidly.'
  )
];

const pathStoreAndForward = [
  step(
    '1. Store-and-Forward kuralı (Şekil 1.11): Yönlendirici neden bekler?',
    '1. The Store-and-Forward rule (Figure 1.11): Why must the router wait?',
    lines(
      sub(v('t'), v('arrivo,1')) + eq + f(L, R1) + plus + f(d1, sub(s, n(1)))
    ),
    'Store-and-forward (depola ve ilet) anahtarlamada yönlendirici, gelen paketin son bitini de alıp tamponda birleştirmeden (ve bit/başlık kontrolünü tamamlamadan) paketin ilk bitini çıkış bağlantısına iletemez. İlk bağlantıda son bitin yönlendiriciye varışı L/R₁ + d₁/v₁ anındadır.',
    'In store-and-forward switching, a router cannot transmit the first bit of a packet onto the outbound link until it has received and buffered the entire packet (through the last bit). On the first link, the last bit arrives at the router at time L/R₁ + d₁/v₁.'
  ),
  step(
    '2. İki bağlantılı (1 yönlendiricili) yolda tek paketin uçtan uca gecikmesi',
    '2. Single-packet end-to-end delay across a two-link (1-router) path',
    lines(
      dEnd + eq + p(f(L, R1) + plus + f(L, R2)) + plus + p(f(d1, sub(s, n(1))) + plus + f(d2, sub(s, n(2))))
    ),
    'Yönlendirici t = L/R₁ + d₁/v₁ anında paketin tamamını teslim alır; kuyruk ve işleme gecikmesi ihmal edilirse hemen ikinci bağlantıya L/R₂ sürede bit bit basar ve son bit d₂/v₂ yayılma süresinin ardından hedefe ulaşır. Özdeş bağlantılarda (R₁ = R₂ = R) iletim terimi 2L/R olur.',
    'The router finishes receiving the packet at t = L/R₁ + d₁/v₁; with negligible processing and queuing delay, it immediately pushes the packet onto link 2 over duration L/R₂, and the last bit propagates for d₂/v₂ to the destination. For identical links (R₁ = R₂ = R), the transmission term is 2L/R.'
  ),
  step(
    '3. N özdeş bağlantılı (N − 1 yönlendiricili) yolda tek paket (Denklem 1.1 ve 1.2)',
    '3. Single packet over N identical links with N − 1 routers (Equations 1.1 and 1.2)',
    lines(
      dEnd + eq + N + cdot + f(L, R) + o(','),
      dEnd + eq + N + cdot + p(dProc + plus + f(L, R) + plus + dProp)
    ),
    'Yayılma ve işleme ihmal edildiğinde N bağlantıda tek paket her düğümde yeniden depolanıp iletildiği için N·(L/R) süre harcar (Denklem 1.1). Her düğümde d_proc ve her bağlantıda d_prop eklendiğinde Denklem 1.2 elde edilir: d_end-end = N(d_proc + L/R + d_prop).',
    'Ignoring propagation and processing, a single packet across N links is stored and forwarded N times, taking N·(L/R) (Equation 1.1). Adding d_proc per node and d_prop per link yields Equation 1.2: d_end-end = N(d_proc + L/R + d_prop).'
  ),
  step(
    '4. Çok paketli boru hattı (Pipelining, Şekil 1.11 ve Problem P2): P paket nasıl akar?',
    '4. Multi-packet pipelining (Figure 1.11 and Problem P2): How P packets flow',
    lines(
      sub(dEnd, P) + eq + p(N + plus + P + minus + n(1)) + cdot + f(L, R) + plus + N + cdot + dProp
    ),
    'Yönlendirici 1. paketi ikinci bağlantıya iletirken (t = L/R), kaynak boş durmaz ve 2. paketi birinci bağlantıya iletmeye başlar! İlk paket hedefe N·(L/R) + N·d_prop anında varır; kalan P − 1 paketin her biri boru hattından yalnızca birer L/R aralıkla peş peşe çıkar.',
    'While the router forwards packet 1 onto link 2, the source simultaneously transmits packet 2 onto link 1! Packet 1 reaches the destination in N·(L/R) + N·d_prop, and each of the remaining P − 1 packets emerges from the pipeline just L/R seconds after the previous one.'
  ),
  step(
    '5. Mesaj bölütleme (Segmentation, Şekil 1.27 & P31) ve darboğaz (Bottleneck) etkisi',
    '5. Message segmentation (Figure 1.27 & P31) and bottleneck throughput',
    lines(
      sub(v('T'), v('tek')) + eq + N + cdot + f(F, R) + o(','),
      sub(v('T'), v('bölütlü')) + eq + p(N + plus + P + minus + n(1)) + cdot + f(F, P + cdot + R) + o(','),
      sub(R, v('uçtan-uca')) + eq + fn('min', R1 + o(',') + R2 + o(',') + o('…') + o(',') + sub(R, N))
    ),
    'F bitlik büyük bir mesajı tek parça göndermek N·(F/R) sürerken, P küçük pakete bölmek süreyi ((N + P − 1)/P)·(F/R) değerine indirir. Farklı hızlı bağlantılarda ise uçtan uca verim (throughput) en yavaş bağlantıya (darboğaz: min{R₁,…,R_N}) kilitlenir; hızlı bağlantıdan yavaş bağlantıya geçişte yönlendirici kuyruğu birikir.',
    'Sending a large F-bit message as one slab takes N·(F/R), whereas segmenting it into P packets cuts the time to ((N + P − 1)/P)·(F/R). Across heterogeneous links, end-to-end throughput is dictated by the slowest link (bottleneck: min{R₁,…,R_N}), and queues build up where a fast link feeds a slower link.'
  )
];

const clinicProblem1 = [
  step(
    '1. Verilenleri SI birimlerine çevir (1 puan)',
    '1. Convert given quantities to SI units (1 point)',
    lines(
      L + eq + n(1500) + cdot + n(8) + eq + n(12000) + o(','),
      R + eq + n(10) + cdot + pow(n(10), n(6)) + o(','),
      s + eq + n(2.5) + cdot + pow(n(10), n(8))
    ),
    'Paket boyutu Bayt (Byte) verildiğinde mutlaka 8 ile çarparak bit’e çevir: L = 1500 × 8 = 12.000 bit. Ağ hızlarında 1 Mbps = 10⁶ bit/sn kuvveti kullanılır.',
    'When packet size is given in Bytes, always multiply by 8 to convert to bits: L = 1500 × 8 = 12,000 bits. In networking rates, 1 Mbps = 10⁶ bits/sec.'
  ),
  step(
    '2. İletim gecikmesini (d_trans) hesapla (1 puan)',
    '2. Compute the transmission delay d_trans (1 point)',
    lines(
      dTrans + eq + f(L, R) + eq + f(n(12000), n(10) + cdot + pow(n(10), n(6))) + eq + n(0.0012) + eq + n(1.2)
    ),
    'd_trans = 12.000 / 10⁷ = 0,0012 sn = 1,2 ms. t = d_trans = 1,2 ms anında paketin son biti gönderici (Host A) ağ kartından kabloya yeni çıkmıştır.',
    'd_trans = 12,000 / 10⁷ = 0.0012 s = 1.2 ms. At t = d_trans = 1.2 ms, the last bit of the packet has just left the sender (Host A) interface onto the wire.'
  ),
  step(
    '3. d = 100 km için yayılma gecikmesini ve ilk bitin konumunu bul (1 puan)',
    '3. Find propagation delay and first-bit location for d = 100 km (1 point)',
    lines(
      dProp + eq + f(d, s) + eq + f(n(100) + cdot + pow(n(10), n(3)), n(2.5) + cdot + pow(n(10), n(8))) + eq + n(0.0004) + eq + n(0.4)
    ),
    'd_prop = 0,4 ms < d_trans = 1,2 ms olduğu için, t = 1,2 ms anında ilk bit çoktan alıcıya (Host B) ulaşmış (t = 0,4 ms’de vardı), hatta paketin ilk 0,8 ms’lik kısmı (8.000 bit) alıcı tarafından teslim alınmıştır!',
    'Since d_prop = 0.4 ms < d_trans = 1.2 ms, at t = 1.2 ms the first bit has already reached Host B (it arrived at t = 0.4 ms), and the first 8,000 bits have already been received!'
  ),
  step(
    '4. d = 1000 km için yayılma gecikmesini ve uçtan uca süreyi bul (1 puan)',
    '4. Find propagation delay and end-to-end delay for d = 1000 km (1 point)',
    lines(
      dProp + eq + f(n(1000) + cdot + pow(n(10), n(3)), n(2.5) + cdot + pow(n(10), n(8))) + eq + n(4.0) + o(','),
      dEnd + eq + dTrans + plus + dProp + eq + n(1.2) + plus + n(4.0) + eq + n(5.2)
    ),
    'd = 1000 km iken d_prop = 4,0 ms > d_trans = 1,2 ms olur. Bu durumda t = 1,2 ms anında ilk bit henüz kabloda 1,2 / 4,0 × 1000 = 300. kilometrededir; paketin 12.000 bitinin tamamı kablo üzerinde uçuş hâlindedir. Son bit t = 5,2 ms’de varır.',
    'When d = 1000 km, d_prop = 4.0 ms > d_trans = 1.2 ms. At t = 1.2 ms the first bit is still propagating inside the link at the 300 km mark; all 12,000 bits of the packet are in flight on the wire. The last bit arrives at t = 5.2 ms.'
  ),
  step(
    '5. d_trans = d_prop eşitlik mesafesini (d*) doğrula (1 puan)',
    '5. Verify the crossover distance d* where d_trans = d_prop (1 point)',
    lines(
      f(sub(d, o('*')), s) + eq + f(L, R) + imp + sub(d, o('*')) + eq + s + cdot + f(L, R) + eq + n(300)
    ),
    'd* = (2,5 × 10⁸ m/sn) × (0,0012 sn) = 3 × 10⁵ m = 300 km. Bu mesafede paketin kablodaki uzaysal boyu tam olarak kablo uzunluğuna eşittir (BDP = L = 12.000 bit).',
    'd* = (2.5 × 10⁸ m/s) × (0.0012 s) = 3 × 10⁵ m = 300 km. At this distance the spatial length of the packet on the wire equals the exact length of the link (BDP = L = 12,000 bits).'
  )
];

const clinicProblem2 = [
  step(
    '1. Üç bağlantının iletim gecikmelerini ayrı ayrı hesapla (1 puan)',
    '1. Calculate transmission delays of the three links separately (1 point)',
    lines(
      L + eq + n(1500) + cdot + n(8) + eq + n(12000) + o(','),
      sub(dTrans, n(1)) + eq + sub(dTrans, n(2)) + eq + sub(dTrans, n(3)) + eq + f(n(12000), n(2.5) + cdot + pow(n(10), n(6))) + eq + n(4.8)
    ),
    'Her bağlantıda hız R = 2,5 Mbps = 2,5 × 10⁶ bps ve L = 12.000 bit olduğundan her bir bağlantının iletim gecikmesi d_trans = 12.000 / (2,5 × 10⁶) = 0,0048 sn = 4,8 ms’dir. Üç bağlantının toplam iletim gecikmesi 3 × 4,8 = 14,4 ms olur.',
    'With R = 2.5 Mbps = 2.5 × 10⁶ bps and L = 12,000 bits on each link, each link has d_trans = 12,000 / (2.5 × 10⁶) = 0.0048 s = 4.8 ms. Across three links, total transmission delay is 3 × 4.8 = 14.4 ms.'
  ),
  step(
    '2. Üç bağlantının yayılma gecikmelerini hesapla (1 puan)',
    '2. Calculate propagation delays across the three links (1 point)',
    lines(
      sub(dProp, n(1)) + eq + f(n(5000), n(250)) + eq + n(20) + o(','),
      sub(dProp, n(2)) + eq + f(n(4000), n(250)) + eq + n(16) + o(','),
      sub(dProp, n(3)) + eq + f(n(1000), n(250)) + eq + n(4)
    ),
    'v = 2,5 × 10⁸ m/sn = 250 km/ms olduğundan: 1. bağlantı 5000 / 250 = 20 ms, 2. bağlantı 4000 / 250 = 16 ms, 3. bağlantı 1000 / 250 = 4 ms yayılma gecikmesi üretir. Toplam yayılma süresi 20 + 16 + 4 = 40 ms’dir.',
    'Since v = 2.5 × 10⁸ m/s = 250 km/ms: Link 1 takes 5000 / 250 = 20 ms, Link 2 takes 4000 / 250 = 16 ms, and Link 3 takes 1000 / 250 = 4 ms. Total propagation delay is 20 + 16 + 4 = 40 ms.'
  ),
  step(
    '3. Yönlendirici işleme gecikmelerini (d_proc) say ve ekle (1 puan)',
    '3. Count and add router processing delays d_proc (1 point)',
    lines(
      sub(dProc, v('toplam')) + eq + n(2) + cdot + n(3.0) + eq + n(6.0)
    ),
    '3 bağlantıyı birbirine bağlayan N − 1 = 2 adet paket anahtarı (yönlendirici) vardır. Her yönlendirici 3 ms işleme gecikmesi eklediği için toplam işleme gecikmesi 2 × 3 = 6 ms’dir (3 × 3 = 9 ms yazma tuzağına düşme!).',
    'Three links are interconnected by N − 1 = 2 packet switches (routers). Since each switch adds 3 ms of processing delay, total processing delay is 2 × 3 = 6 ms (do not fall into the trap of multiplying by 3 links!).'
  ),
  step(
    '4. Store-and-Forward uçtan uca toplam gecikmeyi bul (Problem P10) (1 puan)',
    '4. Find total Store-and-Forward end-to-end delay (Problem P10) (1 point)',
    lines(
      dEnd + eq + n(14.4) + plus + n(40.0) + plus + n(6.0) + eq + n(60.4)
    ),
    'Store-and-forward modunda her yönlendirici paketin tamamını beklediği için üç bağlantının iletim süreleri toplanır: 14,4 ms (iletim) + 40,0 ms (yayılma) + 6,0 ms (işleme) = 60,4 ms.',
    'In store-and-forward mode each switch waits for the entire packet, so the three transmission delays add up: 14.4 ms (transmission) + 40.0 ms (propagation) + 6.0 ms (processing) = 60.4 ms.'
  ),
  step(
    '5. Cut-Through (anında bit aktarımı, Problem P11) durumuyla karşılaştır (1 puan)',
    '5. Compare with Cut-Through immediate bit forwarding (Problem P11) (1 point)',
    lines(
      sub(dEnd, v('cut')) + eq + f(L, R) + plus + p(sub(dProp, n(1)) + plus + sub(dProp, n(2)) + plus + sub(dProp, n(3))) + eq + n(4.8) + plus + n(40.0) + eq + n(44.8)
    ),
    'd_proc = 0 ve anahtarlar paketin tamamını beklemeden gelen her biti anında iletirse (cut-through), iletim gecikmesi 3 kez değil yalnızca 1 kez (kaynaktan son bitin çıkışı: L/R = 4,8 ms) yaşanır; ardından son bit üç bağlantıyı 40 ms’de kateder ve toplam süre 44,8 ms olur.',
    'If d_proc = 0 and switches forward each bit immediately without waiting for the full packet (cut-through), transmission delay is incurred only once (L/R = 4.8 ms for the last bit to leave the source) plus 40 ms total propagation, giving 44.8 ms.'
  )
];

const clinicProblem3 = [
  step(
    '1. Tek bağlantı ve toplam yol parametrelerini belirle (1 puan)',
    '1. Identify single-link and path parameters (1 point)',
    lines(
      F + eq + pow(n(10), n(6)) + o(','),
      R + eq + n(5) + cdot + pow(n(10), n(6)) + o(','),
      N + eq + n(3)
    ),
    'Mesaj boyutu F = 10⁶ bit, her bağlantının hızı R = 5 Mbps = 5 × 10⁶ bps. Şekil 1.27’de kaynak ile hedef arasında 2 paket anahtarı, yani N = 3 bağlantı vardır.',
    'Message size is F = 10⁶ bits and each link rate is R = 5 Mbps = 5 × 10⁶ bps. In Figure 1.27 there are 2 packet switches between source and destination, which means N = 3 links.'
  ),
  step(
    '2. Bölütlemesiz (a şıkkı) tek parça mesaj aktarım süresini hesapla (2 puan)',
    '2. Compute transfer time without message segmentation (part a) (2 points)',
    lines(
      sub(dTrans, v('mesaj')) + eq + f(F, R) + eq + f(pow(n(10), n(6)), n(5) + cdot + pow(n(10), n(6))) + eq + n(0.2) + eq + n(200) + o(','),
      sub(v('T'), v('a')) + eq + N + cdot + sub(dTrans, v('mesaj')) + eq + n(3) + cdot + n(200) + eq + n(600)
    ),
    'Mesaj bölünmezse tek bir bağlantıda iletim süresi 10⁶ / (5 × 10⁶) = 0,2 sn = 200 ms’dir. Store-and-forward yüzünden her anahtar 200 ms bekler; 3 bağlantıda toplam süre 3 × 200 ms = 600 ms (0,6 sn) olur.',
    'Without segmentation, transmitting the message over a single link takes 10⁶ / (5 × 10⁶) = 0.2 s = 200 ms. Because of store-and-forward, each switch waits 200 ms; across 3 links the total time is 3 × 200 ms = 600 ms (0.6 s).'
  ),
  step(
    '3. P = 100 pakete bölündüğünde (b şıkkı) tek paketin iletim süresini bul (1 puan)',
    '3. Find single-packet transmission time when segmented into P = 100 packets (part b) (1 point)',
    lines(
      L + eq + f(F, P) + eq + pow(n(10), n(4)) + o(','),
      dTrans + eq + f(L, R) + eq + f(pow(n(10), n(4)), n(5) + cdot + pow(n(10), n(6))) + eq + n(0.002) + eq + n(2)
    ),
    'Her paket L = 10.000 bit olduğundan tek bir bağlantıda bir paketin iletim süresi d_trans = 10.000 / (5 × 10⁶) = 0,002 sn = 2 ms’dir. 1. paket 1. anahtara t = 2 ms’de, 2. paket ise 1. anahtara t = 2 × 2 = 4 ms’de tam varır.',
    'Each packet has L = 10,000 bits, so transmitting one packet over one link takes d_trans = 10,000 / (5 × 10⁶) = 0.002 s = 2 ms. Packet 1 is fully received at switch 1 at t = 2 ms, and Packet 2 is fully received at switch 1 at t = 4 ms.'
  ),
  step(
    '4. Bölütlü boru hattı (c şıkkı) ile 100 paketin toplam varış süresini hesapla (1 puan)',
    '4. Compute total pipelined delivery time for all 100 packets (part c) (1 point)',
    lines(
      sub(v('T'), v('b')) + eq + p(N + plus + P + minus + n(1)) + cdot + dTrans + eq + p(n(3) + plus + n(100) + minus + n(1)) + cdot + n(2) + eq + n(204)
    ),
    '1. paket hedefe N · d_trans = 3 × 2 = 6 ms’de ulaşır. Kalan 99 paketin her biri 2 ms arayla hedefe varır: 6 + 99 × 2 = 204 ms (0,204 sn).',
    'Packet 1 reaches the destination at N · d_trans = 3 × 2 = 6 ms. The remaining 99 packets arrive one every 2 ms: 6 + 99 × 2 = 204 ms (0.204 s).'
  ),
  step(
    '5. Boru hattı kazancını (Pipelining Speedup) yorumla (1 puan)',
    '5. Interpret the pipelining speedup and trade-offs (1 point)',
    lines(
      f(sub(v('T'), v('a')), sub(v('T'), v('b'))) + eq + f(n(600), n(204)) + approx + n(2.94)
    ),
    'Mesajı 100 pakete bölmek toplam süreyi 600 ms’den 204 ms’ye (yaklaşık 3 kat hızlanma, N = 3 bağlantının teorik sınırına çok yakın) indirir; çünkü tüm bağlantılar aynı anda paralel çalışır. Ancak gerçek ağlarda her pakete eklenen başlık (header) baytları aşırı küçük paketlerde ek yük yaratır.',
    'Segmenting the message into 100 packets reduces total time from 600 ms to 204 ms (nearly a 3× speedup, close to the N = 3 theoretical limit) because all links work in parallel. In real networks, however, per-packet header bytes introduce overhead if packets are made too small.'
  )
];

const clinicProblem4 = [
  step(
    '1. İki bağlantının iletim ve yayılma gecikmelerini ayrı ayrı bul (1 puan)',
    '1. Find transmission and propagation delays of both links (1 point)',
    lines(
      sub(dTrans, n(1)) + eq + f(L, R1) + eq + f(n(12000), n(6) + cdot + pow(n(10), n(6))) + eq + n(2.0) + o(','),
      sub(dTrans, n(2)) + eq + f(L, R2) + eq + f(n(12000), n(2) + cdot + pow(n(10), n(6))) + eq + n(6.0) + o(','),
      sub(dProp, n(1)) + eq + sub(dProp, n(2)) + eq + n(3.0)
    ),
    'L = 1500 Bayt = 12.000 bit. 1. bağlantı hızlıdır (R₁ = 6 Mbps ⇒ d_trans,1 = 2 ms); 2. bağlantı darboğazdır (R₂ = 2 Mbps ⇒ d_trans,2 = 6 ms). Her iki bağlantıda yayılma gecikmesi d_prop = 3 ms’dir.',
    'L = 1500 Bytes = 12,000 bits. Link 1 is fast (R₁ = 6 Mbps ⇒ d_trans,1 = 2 ms); Link 2 is the bottleneck (R₂ = 2 Mbps ⇒ d_trans,2 = 6 ms). Both links have propagation delay d_prop = 3 ms.'
  ),
  step(
    '2. Paketlerin yönlendiriciye tam varış (depolanma) anlarını listele (1 puan)',
    '2. List the exact router arrival (full storage) timestamps for the packets (1 point)',
    lines(
      sub(v('t'), v('yön,1')) + eq + n(2) + plus + n(3) + eq + n(5) + o(','),
      sub(v('t'), v('yön,2')) + eq + n(4) + plus + n(3) + eq + n(7) + o(','),
      sub(v('t'), v('yön,3')) + eq + n(6) + plus + n(3) + eq + n(9)
    ),
    'Kaynak paketleri t = 0, 2, 4 ms’de göndermeye başlar ve t = 2, 4, 6 ms’de bitirir. 3 ms yayılma süresi eklendiğinde paketlerin son bitleri yönlendiriciye sırasıyla t = 5 ms, 7 ms ve 9 ms’de ulaşır.',
    'The source starts sending packets at t = 0, 2, 4 ms and finishes at t = 2, 4, 6 ms. Adding 3 ms propagation delay, the last bits arrive at the router at t = 5 ms, 7 ms, and 9 ms respectively.'
  ),
  step(
    '3. Darboğaz bağlantısında (R₂) kuyruk bekleme sürelerini (d_queue) hesapla (2 puan)',
    '3. Calculate queuing delays d_queue at the bottleneck link R₂ (2 points)',
    lines(
      sub(dQueue, n(1)) + eq + n(0) + o(','),
      sub(dQueue, n(2)) + eq + n(11) + minus + n(7) + eq + n(4) + o(','),
      sub(dQueue, n(3)) + eq + n(17) + minus + n(9) + eq + n(8)
    ),
    '1. paket t = 5 ms’de boş kuyruğa gelir, t = 5..11 ms arasında iletilir (d_queue,1 = 0). 2. paket t = 7 ms’de geldiğinde bağlantı meşguldür; t = 11 ms’ye kadar 4 ms kuyrukta bekler ve t = 11..17 ms’de iletilir. 3. paket t = 9 ms’de gelir, t = 17 ms’ye kadar 8 ms kuyrukta bekler ve t = 17..23 ms’de iletilir!',
    'Packet 1 arrives at an empty queue at t = 5 ms and transmits during t = 5..11 ms (d_queue,1 = 0). Packet 2 arrives at t = 7 ms while Link 2 is busy, waits 4 ms in the queue until t = 11 ms, and transmits during t = 11..17 ms. Packet 3 arrives at t = 9 ms, waits 8 ms until t = 17 ms, and transmits during t = 17..23 ms!'
  ),
  step(
    '4. Hedefte paketler arası varış farkını (inter-arrival) ve son varış anını bul (1 puan)',
    '4. Find packet inter-arrival time at the destination and final delivery time (1 point)',
    lines(
      sub(v('t'), v('hedef,1')) + eq + n(11) + plus + n(3) + eq + n(14) + o(','),
      sub(v('t'), v('hedef,2')) + eq + n(17) + plus + n(3) + eq + n(20) + o(','),
      sub(v('t'), v('hedef,3')) + eq + n(23) + plus + n(3) + eq + n(26)
    ),
    'Paketler hedefe t = 14 ms, 20 ms ve 26 ms’de ulaşır. Kaynakta 2 ms arayla çıkan paketler, darboğaz bağlantısından geçtikten sonra hedefte L/R₂ = 6 ms arayla teslim alınır.',
    'Packets reach the destination at t = 14 ms, 20 ms, and 26 ms. Although injected 2 ms apart at the source, after passing through the bottleneck link they arrive spaced by L/R₂ = 6 ms.'
  ),
  step(
    '5. Kuyruk oluşmaması için kaynakta gerekli bekleme süresini (T) doğrula (1 puan)',
    '5. Verify minimum source spacing T to prevent router queuing (1 point)',
    lines(
      v('T') + o('≥') + f(L, R2) + eq + n(6.0)
    ),
    'Problem P23(b) kuralı: İkinci paket yönlendiricide hiç sıra beklemesin isteniyorsa, kaynak ardışık paketlerin başlangıçlarını en az darboğaz iletim süresi kadar (T ≥ L/R₂ = 6 ms) aralıklı göndermelidir.',
    'Problem P23(b) rule: To ensure zero queuing at the router, the source must space consecutive packet transmissions by at least the bottleneck transmission time (T ≥ L/R₂ = 6 ms).'
  )
];

export const packetDelayStudy = {
  title: T(
    'Bitin yolculuğu: İletim gecikmesi (L/R), yayılma gecikmesi (d/v) ve store-and-forward boru hattı.',
    'Journey of a bit: Transmission delay (L/R), propagation delay (d/v), and store-and-forward pipelining.'
  ),
  intro: T(
    'Bilgisayar ağlarına yeni başlayanların en sık karıştırdığı iki kavram iletim gecikmesi (L/R) ile yayılma gecikmesidir (d/v). §1.3.1 ve §1.4.1–§1.4.4 bölümlerini birleştiren bu rehberde, önce iki gecikmenin fiziksel farkını ve Bant Genişliği–Gecikme Çarpımını (BDP), ardından store-and-forward yönlendiricilerde çok paketli boru hattı (pipelining) ve darboğaz kuyruklarını adım adım türeteceğiz.',
    'The two concepts most frequently confused by newcomers to computer networking are transmission delay (L/R) and propagation delay (d/v). Combining §1.3.1 and §1.4.1–§1.4.4, this guide derives the physical distinction between the two delays and the Bandwidth-Delay Product (BDP), followed by multi-packet store-and-forward pipelining and bottleneck queuing.'
  ),
  paths: [
    {
      title: T('Yol 1 · İletim (L/R) vs Yayılma (d/v) ve BDP (§1.4.1)', 'Path 1 · Transmission (L/R) vs Propagation (d/v) and BDP (§1.4.1)'),
      prompt: T('Bağlantı hızını (R) 10 katına çıkarmak, kablodaki bir bitin karşı uca varış süresini hızlandırır mı?', 'Does increasing link transmission rate (R) tenfold make a single bit travel faster across the wire?'),
      steps: pathDelayComponents,
      reflection: T('Bir bağlantıda d_prop > d_trans olması ile d_prop < d_trans olması arasında, gönderici son biti gönderdiği anda kablodaki görünüm açısından nasıl bir fark vardır?', 'When the sender finishes pushing the last bit, how does the physical snapshot of the wire differ between d_prop > d_trans and d_prop < d_trans?')
    },
    {
      title: T('Yol 2 · Store-and-Forward, Boru Hattı ve Darboğaz (§1.3.1 & §1.4.3)', 'Path 2 · Store-and-Forward, Pipelining, and Bottlenecks (§1.3.1 & §1.4.3)'),
      prompt: T('Yönlendirici paketin tamamını almadan iletime başlamıyorsa, büyük bir dosyayı küçük paketlere bölmek toplam süreyi neden kısaltır?', 'If a router waits for the entire packet before forwarding, why does breaking a large file into smaller packets reduce total transfer time?'),
      steps: pathStoreAndForward,
      reflection: T('Birinci bağlantı 100 Mbps, ikinci bağlantı 10 Mbps ise arka arkaya gönderilen paketlere yönlendiricide ne olur? Uçtan uca hızı hangi bağlantı belirler?', 'If Link 1 is 100 Mbps and Link 2 is 10 Mbps, what happens at the router when packets are sent back-to-back, and which link determines end-to-end throughput?')
    }
  ],
  predictions: [
    {
      id: 'pred-bandwidth-vs-propagation',
      question: T(
        'Bir fiber bağlantının iletim hızı R = 10 Mbps’den 1 Gbps’ye (100 katına) çıkarılırsa, yayılma gecikmesi (d_prop) ve iletim gecikmesi (d_trans) nasıl değişir?',
        'If a fiber link’s transmission rate R is upgraded from 10 Mbps to 1 Gbps (100× faster), how do propagation delay (d_prop) and transmission delay (d_trans) change?'
      ),
      context: T(
        'Paket boyutu L = 10.000 bit, kablo uzunluğu d = 2.000 km ve fiberde ışık hızı v = 2 × 10⁸ m/sn sabittir.',
        'Packet length L = 10,000 bits, cable length d = 2,000 km, and propagation speed in fiber v = 2 × 10⁸ m/s remain fixed.'
      ),
      choices: T(
        [
          'Her iki gecikme de 100 kat azalır.',
          'İletim gecikmesi (L/R) 100 kat azalır (1 ms → 0,01 ms); yayılma gecikmesi (d/v = 10 ms) hiç değişmez.',
          'Yayılma gecikmesi 100 kat azalır; iletim gecikmesi sabit kalır.'
        ],
        [
          'Both delays decrease by a factor of 100.',
          'Transmission delay (L/R) drops 100× (1 ms → 0.01 ms), while propagation delay (d/v = 10 ms) stays unchanged.',
          'Propagation delay drops 100×, while transmission delay stays constant.'
        ]
      ),
      answer: 1,
      reason: T(
        'En yaygın kavram yanılgısı bant genişliği (R) artınca bitlerin kabloda daha hızlı koştuğunu sanmaktır! R yalnızca bitlerin kabloya hangi sıklıkla itildiğini belirler (d_trans = L/R, 1 ms’den 0,01 ms’ye düşer). Tek bir bitin 2.000 km fiberi geçme süresi d_prop = d/v = 10 ms ise yalnızca fiziksel ortamdaki ışık hızına bağlıdır ve R’den bağımsızdır.',
        'The most common misconception is believing that higher bandwidth (R) makes bits travel faster along the cable! R only determines how quickly bits are pushed onto the wire (d_trans = L/R drops from 1 ms to 0.01 ms). The time for a bit to cross 2,000 km of fiber is d_prop = d/v = 10 ms, which depends strictly on the speed of light in glass and is independent of R.'
      ),
      math: dTrans + eq + f(L, R) + o('↓,') + o(' ') + dProp + eq + f(d, s) + eq + n(10) + o(' ') + v('ms'),
      try: T(
        'Laboratuvarda bağlantı hızı R kaydırıcısını 1 Mbps’den 10 Mbps’ye çek: d_trans çubuğunun kısaldığını ama d_prop değerinin sabit kaldığını gözle.',
        'In the lab, drag the link rate R slider from 1 Mbps to 10 Mbps: observe that d_trans shrinks while d_prop remains completely unchanged.'
      )
    },
    {
      id: 'pred-store-and-forward-pipelining',
      question: T(
        'Yayılma gecikmesinin ihmal edildiği (d_prop ≈ 0) 1 yönlendiricili (2 özdeş bağlantılı) bir yolda tek bir paketin iletim süresi L/R = 5 ms’dir. Kaynak arka arkaya P = 3 paket gönderirse 3. paketin son biti hedefe kaçıncı milisaniyede ulaşır?',
        'Over a 1-router (2-identical-link) path with negligible propagation delay (d_prop ≈ 0), a single packet has L/R = 5 ms. If the source sends P = 3 packets back-to-back, at what time does the last bit of packet 3 reach the destination?'
      ),
      context: T(
        'Yaygın tuzak: "1 paket 2 bağlantıyı 10 ms’de geçiyorsa, 3 paket 3 × 10 = 30 ms sürer" demek! Oysa yönlendirici 1. paketi iletirken kaynak 2. paketi göndermektedir (Şekil 1.11).',
        'Common trap: saying "if 1 packet takes 10 ms across 2 links, then 3 packets take 3 × 10 = 30 ms"! Remember that while the router forwards packet 1, the source simultaneously transmits packet 2 (Figure 1.11).'
      ),
      choices: T(
        [
          '15 ms (3 × 5 ms)',
          '20 ms ((2 + 3 − 1) × 5 ms)',
          '30 ms (3 × 10 ms)'
        ],
        [
          '15 ms (3 × 5 ms)',
          '20 ms ((2 + 3 − 1) × 5 ms)',
          '30 ms (3 × 10 ms)'
        ]
      ),
      answer: 1,
      reason: T(
        't = 5 ms’de 1. paket yönlendiriciye tam varır. t = 5..10 ms arasında yönlendirici 1. paketi hedefe iletirken kaynak aynı anda 2. paketi yönlendiriciye iletir (boru hattı / pipelining). Böylece 1. paket t = 10 ms’de, 2. paket t = 15 ms’de, 3. paket ise t = 20 ms’de ((N + P − 1)·L/R = 4 × 5 = 20 ms) hedefe varır.',
        'At t = 5 ms packet 1 is stored at the router. During t = 5..10 ms, the router forwards packet 1 to the destination while the source simultaneously transmits packet 2 to the router (pipelining). Thus packet 1 arrives at t = 10 ms, packet 2 at t = 15 ms, and packet 3 at t = 20 ms ((N + P − 1)·L/R = 4 × 5 = 20 ms).'
      ),
      math: sub(dEnd, n(3)) + eq + p(n(2) + plus + n(3) + minus + n(1)) + cdot + f(L, R) + eq + n(4) + cdot + n(5) + eq + n(20),
      try: T(
        'Laboratuvarda "Şekil 1.11 · 3 Paket Boru Hattı" hazır ayarını seç ve tek olay ilerleterek 1. ile 2. bağlantının aynı anda nasıl çalıştığını izle.',
        'Select the "Figure 1.11 · 3-Packet Pipeline" preset in the lab and step event-by-event to watch Link 1 and Link 2 operate simultaneously.'
      )
    }
  ]
};

export const packetDelayClinic = {
  examBlueprint: [
    {
      step: T('01 · Birimleri Standartlaştır (Bit vs Bayt, 10⁶ vs 10³)', '01 · Standardize Units (Bits vs Bytes, 10⁶ vs 10³)'),
      detail: T('Paket boyutu Bayt (B veya KB) verilmişse mutlaka 8 ile çarparak bit’e çevir. Ağ hızlarında (bps, kbps, Mbps, Gbps) 10’un kuvvetleri (10³, 10⁶, 10⁹) kullanılır. Mesafe km verilmişse 10³ ile metreye çevirip v (m/sn) değerine böl.', 'If packet size is given in Bytes (B or KB), always multiply by 8 to get bits. Networking rates (bps, kbps, Mbps, Gbps) use powers of 10 (10³, 10⁶, 10⁹). Convert distance from km to meters (×10³) before dividing by propagation speed v (m/s).')
    },
    {
      step: T('02 · L/R ile d/v’yi ve Düğüm Sayısını Ayır', '02 · Separate L/R from d/v and Count Nodes Correctly'),
      detail: T('d_trans = L/R paketin son bitinin ağ kartından çıkma süresidir; d_prop = d/v ise bir bitin kabloyu boydan boya geçme süresidir. N bağlantılı bir yolda N adet d_trans ve N adet d_prop vardır, ancak yalnızca N − 1 adet yönlendirici (dolayısıyla N − 1 adet d_proc) bulunur!', 'd_trans = L/R is the time to push the packet’s bits out of the interface; d_prop = d/v is the time for one bit to traverse the wire. A path of N links has N transmission delays and N propagation delays, but only N − 1 intermediate routers (and thus N − 1 router processing delays)!')
    },
    {
      step: T('03 · Boru Hattı (Pipelining) ve Darboğaz Kuyruğunu İzle', '03 · Track Pipelining and Bottleneck Queuing'),
      detail: T('Özdeş N bağlantıda P paketin toplam süresi P·N·(L/R) DEĞİL, (N + P − 1)·(L/R) + Σd_prop’tur. Bağlantı hızları farklıysa (R₁ > R₂), yönlendiricide her yeni paket bir öncekinden (L/R₂ − L/R₁) kadar daha fazla kuyrukta bekler.', 'Across N identical links, P back-to-back packets take (N + P − 1)·(L/R) + Σd_prop, NOT P·N·(L/R). When link rates differ (R₁ > R₂), each subsequent packet accumulates an extra (L/R₂ − L/R₁) of queuing delay at the bottleneck router.')
    }
  ],
  examClinic: [
    {
      badge: T('5 PUAN · PROBLEM P6 & P25 UYARLAMASI (s.70, 74)', '5 POINTS · ADAPTED FROM PROBLEMS P6 & P25 (pp. 70, 74)'),
      title: T('İletim vs Yayılma Gecikmesi, BDP ve İlk Bitin Kablodaki Konumu', 'Transmission vs Propagation Delay, BDP, and First-Bit Position on the Wire'),
      statement: T('A ve B uç sistemleri R = 10 Mbps hızında ve v = 2,5 × 10⁸ m/sn yayılma hızına sahip tek bir bağlantıyla bağlıdır. A sistemi t = 0 anında L = 1.500 Bayt (Byte) büyüklüğünde bir paket göndermeye başlıyor. (a) İletim gecikmesi d_trans nedir ve t = d_trans anında paketin son biti nerededir? (b) Mesafe d = 100 km ise t = d_trans anında paketin ilk biti nerededir? (c) Mesafe d = 1.000 km ise t = d_trans anında ilk bit nerededir ve uçtan uca gecikme kaç ms’dir? (d) d_trans = d_prop olmasını sağlayan kritik mesafe d* ve bu mesafedeki BDP kaç bittir?', 'Hosts A and B are connected by a single link of rate R = 10 Mbps and propagation speed v = 2.5 × 10⁸ m/s. At t = 0, Host A begins transmitting a packet of length L = 1,500 Bytes. (a) What is the transmission delay d_trans, and where is the last bit at t = d_trans? (b) If distance d = 100 km, where is the first bit at t = d_trans? (c) If d = 1,000 km, where is the first bit at t = d_trans and what is the end-to-end delay? (d) Find the crossover distance d* where d_trans = d_prop and the corresponding BDP in bits.'),
      trap: T('Kritik sınav tuzağı: 1.500 Baytı 8 ile çarpmadan doğrudan 1.500 / 10⁷ yazmak ve t = d_trans anında ilk bitin her zaman alıcıya vardığını sanmak! d_prop > d_trans olduğunda son bit göndericiden çıktığı anda ilk bit henüz kablodadır.', 'Critical exam trap: dividing 1,500 Bytes by 10⁷ without multiplying by 8 bits/Byte, and assuming the first bit has already reached the receiver at t = d_trans! When d_prop > d_trans, the first bit is still traveling on the wire when the last bit leaves the sender.'),
      steps: clinicProblem1
    },
    {
      badge: T('5 PUAN · PROBLEM P10 & P11 UYARLAMASI (s.71)', '5 POINTS · ADAPTED FROM PROBLEMS P10 & P11 (p. 71)'),
      title: T('Çok Yönlendiricili Yolda Store-and-Forward vs Cut-Through Gecikmesi', 'Multi-Router Store-and-Forward vs Cut-Through End-to-End Delay'),
      statement: T('Kaynak A’dan hedef B’ye giden L = 1.500 Baytlık bir paket, iki paket anahtarı (yönlendirici) ile birbirine bağlanan N = 3 bağlantı üzerinden geçmektedir. Her üç bağlantıda yayılma hızı v = 2,5 × 10⁸ m/sn ve iletim hızı R = 2,5 Mbps’dir. Bağlantı uzunlukları sırasıyla d₁ = 5.000 km, d₂ = 4.000 km ve d₃ = 1.000 km’dir. Her bir paket anahtarının işleme gecikmesi d_proc = 3 ms olup kuyruk gecikmesi yoktur. (a) Anahtarlar store-and-forward kullandığında uçtan uca toplam gecikme kaç ms’dir? (b) d_proc = 0 alınıp anahtarlar paketin tamamını beklemeden her biti anında iletirse (cut-through) uçtan uca gecikme kaç ms olur?', 'A packet of length L = 1,500 Bytes travels from Host A to Host B across N = 3 links interconnected by two packet switches. All three links have propagation speed v = 2.5 × 10⁸ m/s and transmission rate R = 2.5 Mbps. The link lengths are d₁ = 5,000 km, d₂ = 4,000 km, and d₃ = 1,000 km. Each packet switch has processing delay d_proc = 3 ms and zero queuing delay. (a) What is the total end-to-end delay under store-and-forward switching? (b) If d_proc = 0 and switches forward each bit immediately without waiting for the full packet (cut-through), what is the end-to-end delay?'),
      trap: T('Kritik sınav tuzağı: 3 bağlantı var diye işleme gecikmesini 3 × 3 = 9 ms almak! 3 bağlantının arasında yalnızca N − 1 = 2 yönlendirici vardır (2 × 3 = 6 ms). Ayrıca store-and-forward’da iletim gecikmesi 3 kez, cut-through’da ise yalnızca 1 kez eklenir.', 'Critical exam trap: multiplying the router processing delay by 3 links (3 × 3 = 9 ms)! Three links are joined by only N − 1 = 2 intermediate switches (2 × 3 = 6 ms). Also, transmission delay is paid 3 times in store-and-forward, but only once in cut-through.'),
      steps: clinicProblem2
    },
    {
      badge: T('6 PUAN · PROBLEM P31 & ŞEKİL 1.27 UYARLAMASI (s.75)', '6 POINTS · ADAPTED FROM PROBLEM P31 & FIGURE 1.27 (p. 75)'),
      title: T('Mesaj Bölütleme (Segmentation) ve Boru Hattı (Pipelining) Kazancı', 'Message Segmentation and Store-and-Forward Pipelining Speedup'),
      statement: T('Şekil 1.27’deki gibi kaynak ile hedef arasında 2 store-and-forward paket anahtarı (toplam N = 3 bağlantı) bulunuyor. Her bağlantının hızı R = 5 Mbps olup yayılma, kuyruk ve işleme gecikmeleri ihmal edilmektedir. Boyutu F = 10⁶ bit olan bir mesaj gönderilecektir. (a) Mesaj hiç bölünmeden tek parça gönderilirse hedefe tam varışı kaç ms sürer? (b) Mesaj her biri L = 10.000 bitlik P = 100 pakete bölünürse 1. paketin ilk anahtara varışı ve 2. paketin ilk anahtara tam varışı hangi anlarda gerçekleşir? (c) 100 paketin tamamının hedefe ulaşması toplam kaç ms sürer ve bölütleme neden bu kadar büyük bir hızlanma sağlar?', 'As in Figure 1.27, a source and destination are connected through 2 store-and-forward packet switches (N = 3 links total). Each link has rate R = 5 Mbps, and propagation, queuing, and processing delays are negligible. A message of size F = 10⁶ bits is to be transferred. (a) Without message segmentation, how long (in ms) does it take to move the entire message to the destination? (b) With the message segmented into P = 100 packets of L = 10,000 bits each, when does packet 1 arrive at switch 1, and when is packet 2 fully received at switch 1? (c) How long does it take for all 100 packets to reach the destination, and why does segmentation yield this speedup?'),
      trap: T('Kritik sınav tuzağı: 100 paketin 3 bağlantıyı geçme süresini 100 × 3 × 2 ms = 600 ms hesaplamak! Boru hattı sayesinde 1. paket 3 × 2 = 6 ms’de hedefe varır; kalan 99 paket ise yalnızca 1’er iletim süresi (99 × 2 = 198 ms) arayla peş peşe çıkar.', 'Critical exam trap: computing the time for 100 packets across 3 links as 100 × 3 × 2 ms = 600 ms! Because of pipelining, packet 1 arrives in 3 × 2 = 6 ms, and the remaining 99 packets emerge back-to-back every 2 ms (99 × 2 = 198 ms).'),
      steps: clinicProblem3
    },
    {
      badge: T('6 PUAN · PROBLEM P23 & DARBOĞAZ KUYRUĞU SENTEZİ (s.73)', '6 POINTS · PROBLEM P23 & BOTTLENECK QUEUING SYNTHESIS (p. 73)'),
      title: T('Farklı Hızlı Bağlantılarda Darboğaz Kuyruğu ve Paketler Arası Varış Süresi', 'Bottleneck Queuing and Packet Inter-Arrival Time Across Heterogeneous Links'),
      statement: T('Bir sunucu, tek bir store-and-forward yönlendirici üzerinden istemciye her biri L = 1.500 Bayt (12.000 bit) olan P = 3 paketi t = 0’dan itibaren arka arkaya gönderiyor. 1. bağlantının hızı R₁ = 6 Mbps, 2. bağlantının hızı R₂ = 2 Mbps’dir. Her iki bağlantının yayılma gecikmesi d_prop = 3 ms olup işleme gecikmesi sıfırdır. (a) Her paketin yönlendiriciye tam varış anını bulunuz. (b) Her paketin yönlendirici çıkış kuyruğunda beklediği süreyi (d_queue) hesaplayınız. (c) Paketlerin istemciye varış anlarını ve istemcide paketler arası varış farkını (inter-arrival time) bulunuz. (d) Yönlendiricide hiç kuyruk oluşmaması için sunucu ardışık paketlerin gönderim başlangıçları arasında en az kaç ms (T) beklemelidir?', 'A server sends P = 3 packets of length L = 1,500 Bytes (12,000 bits) back-to-back starting at t = 0 through a single store-and-forward router to a client. Link 1 has rate R₁ = 6 Mbps and Link 2 has rate R₂ = 2 Mbps. Both links have propagation delay d_prop = 3 ms and zero processing delay. (a) Find the exact time each packet is fully received at the router. (b) Compute the queuing delay d_queue experienced by each packet at the router. (c) Find the arrival times at the client and the inter-arrival spacing. (d) How large must the sending interval T between packet starts at the server be to guarantee zero queuing at the router?'),
      trap: T('Kritik sınav tuzağı: 2. bağlantıda yayılma gecikmesinin de (3 ms) bağlantıyı meşgul ettiğini sanmak! Bağlantı arayüzü yalnızca iletim süresi (L/R₂ = 6 ms) boyunca meşguldür; bitler kabloda yayılırken arayüz sıradaki paketi iletmeye başlayabilir.', 'Critical exam trap: thinking that Link 2’s propagation delay (3 ms) also keeps the router interface busy! The outbound interface is busy only during transmission (L/R₂ = 6 ms); once the last bit of packet 1 is pushed onto Link 2, the router immediately begins transmitting packet 2 while packet 1 propagates.'),
      steps: clinicProblem4
    }
  ]
};
