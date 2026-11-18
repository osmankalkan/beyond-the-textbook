const text = (tr, en) => ({ tr, en });

export const packetDelayExtraQuestions = [
  {
    title: text('Store-and-forward: İki farklı hızlı bağlantıda tek paket', 'Store-and-forward: Single packet across two heterogeneous links'),
    tag: text('ÖZGÜN ÇALIŞMA SORUSU · §1.3.1 (R11 BENZERİ)', 'ORIGINAL STUDY QUESTION · §1.3.1 (R11 STYLE)'),
    difficulty: text('Temel / Vize', 'Core / Midterm'),
    text: text(
      'Gönderici ile alıcı arasında tek bir store-and-forward paket anahtarı vardır. Birinci bağlantının hızı R₁ = 4 Mbps, ikinci bağlantının hızı R₂ = 2 Mbps’dir. Yayılma, kuyruk ve işleme gecikmeleri ihmal edildiğine göre L = 8.000 bitlik bir paketin uçtan uca toplam gecikmesi kaç milisaniyedir (ms)?',
      'A single store-and-forward packet switch sits between a sender and a receiver. Link 1 has transmission rate R₁ = 4 Mbps and Link 2 has rate R₂ = 2 Mbps. Ignoring propagation, queuing, and processing delays, what is the total end-to-end delay (in ms) to transfer a packet of length L = 8,000 bits?'
    ),
    unit: 'ms',
    answer: 6,
    tolerance: 0.05,
    feedback: text(
      'Doğru! 1. bağlantıda L/R₁ = 8.000 / 4×10⁶ = 2 ms, 2. bağlantıda L/R₂ = 8.000 / 2×10⁶ = 4 ms sürer. Store-and-forward anahtar paketin tamamını beklediği için toplam süre 2 + 4 = 6 ms olur.',
      'Correct! Link 1 takes L/R₁ = 8,000 / 4×10⁶ = 2 ms, and Link 2 takes L/R₂ = 8,000 / 2×10⁶ = 4 ms. Because the store-and-forward switch waits for the full packet, total delay is 2 + 4 = 6 ms.'
    ),
    solutionSummary: text(
      'd_end-to-end = L/R₁ + L/R₂ = (8.000 / 4×10⁶) + (8.000 / 2×10⁶) = 2 ms + 4 ms = 6 ms.',
      'd_end-to-end = L/R₁ + L/R₂ = (8,000 / 4×10⁶) + (8,000 / 2×10⁶) = 2 ms + 4 ms = 6 ms.'
    ),
    hints: text(
      [
        'Store-and-forward yönlendirici ilk bağlantıda paketin son bitini alana kadar L/R₁ süre bekler.',
        'Ardından ikinci bağlantıya L/R₂ sürede bit bit iletir; iki süreyi milisaniye cinsinden topla.'
      ],
      [
        'A store-and-forward switch waits L/R₁ seconds until the last bit arrives over Link 1.',
        'It then transmits the packet over Link 2 in L/R₂ seconds; sum both times in milliseconds.'
      ]
    )
  },
  {
    title: text('t = d_trans anında ilk bit kabloda nerede?', 'Where is the first bit on the wire at t = d_trans?'),
    tag: text('ÖZGÜN ÇALIŞMA SORUSU · §1.4.1 (P6 BENZERİ)', 'ORIGINAL STUDY QUESTION · §1.4.1 (P6 STYLE)'),
    difficulty: text('Vize', 'Midterm'),
    text: text(
      'İki uç sistem d = 1.000 km uzunluğunda, v = 2 × 10⁸ m/sn yayılma hızına ve R = 5 Mbps iletim hızına sahip tek bir bağlantıyla bağlıdır. Gönderici t = 0’da L = 10.000 bitlik bir paketi iletmeye başlıyor. Gönderici son biti kabloya vermeyi bitirdiği anda (t = d_trans), paketin ilk biti göndericiden kaç kilometre uzaktadır?',
      'Two hosts are connected by a single link of length d = 1,000 km, propagation speed v = 2 × 10⁸ m/s, and transmission rate R = 5 Mbps. At t = 0 the sender starts transmitting a packet of L = 10,000 bits. At the exact instant the sender finishes pushing the last bit (t = d_trans), how many kilometers from the sender is the first bit?'
    ),
    unit: 'km',
    answer: 400,
    tolerance: 0.5,
    feedback: text(
      'Doğru! d_trans = L/R = 10.000 / (5×10⁶) = 2 ms (0,002 sn). Bu 2 ms içinde ilk bit kabloda v · d_trans = (2×10⁸ m/sn) × 0,002 sn = 400.000 m = 400 km ilerlemiştir (< 1.000 km).',
      'Correct! d_trans = L/R = 10,000 / (5×10⁶) = 2 ms (0.002 s). During those 2 ms, the first bit has propagated v · d_trans = (2×10⁸ m/s) × 0.002 s = 400,000 m = 400 km (< 1,000 km).'
    ),
    solutionSummary: text(
      'd_trans = 10.000 / 5×10⁶ = 2 ms ve d_prop = 10⁶ / 2×10⁸ = 5 ms. d_trans < d_prop olduğundan t = 2 ms anında ilk bit henüz yolun 2/5’indedir: 2 ms × 200 km/ms = 400 km.',
      'd_trans = 10,000 / 5×10⁶ = 2 ms and d_prop = 10⁶ / 2×10⁸ = 5 ms. Since d_trans < d_prop, at t = 2 ms the first bit is 2/5 of the way across the link: 2 ms × 200 km/ms = 400 km.'
    ),
    hints: text(
      [
        'Önce göndericinin son biti kabloya verme anını bul: d_trans = L / R.',
        'İlk bit t = 0’da yola çıktığına göre t = d_trans süresince v hızıyla kaç kilometre yol alır?'
      ],
      [
        'First compute the time when the last bit leaves the sender: d_trans = L / R.',
        'Since the first bit left at t = 0, how many kilometers does it travel at speed v during time d_trans?'
      ]
    )
  },
  {
    title: text('d_trans = d_prop eşitlik mesafesi', 'Crossover distance where d_trans = d_prop'),
    tag: text('ÖZGÜN ÇALIŞMA SORUSU · §1.4.1', 'ORIGINAL STUDY QUESTION · §1.4.1'),
    difficulty: text('Vize', 'Midterm'),
    text: text(
      'Yayılma hızı v = 2,5 × 10⁸ m/sn ve iletim hızı R = 10 Mbps olan bir bağlantıda L = 1.000 Bayt (8.000 bit) uzunluğunda bir paket gönderiliyor. Yayılma gecikmesinin iletim gecikmesine tam eşit olması (d_prop = d_trans) için bağlantı uzunluğu d kaç kilometre olmalıdır?',
      'A packet of length L = 1,000 Bytes (8,000 bits) is sent over a link with propagation speed v = 2.5 × 10⁸ m/s and transmission rate R = 10 Mbps. What link distance d (in km) makes the propagation delay exactly equal to the transmission delay (d_prop = d_trans)?'
    ),
    unit: 'km',
    answer: 200,
    tolerance: 0.5,
    feedback: text(
      'Doğru! d_trans = 8.000 / 10⁷ = 0,0008 sn (0,8 ms). d = v · d_trans = (2,5×10⁸ m/sn) × 0,0008 sn = 200.000 m = 200 km.',
      'Correct! d_trans = 8,000 / 10⁷ = 0.0008 s (0.8 ms). Setting d/v = d_trans gives d = (2.5×10⁸ m/s) × 0.0008 s = 200,000 m = 200 km.'
    ),
    solutionSummary: text(
      'L = 1.000 × 8 = 8.000 bit ⇒ d_trans = 8.000 / 10⁷ = 0,8 ms. d / (250 km/ms) = 0,8 ms ⇒ d = 200 km.',
      'L = 1,000 × 8 = 8,000 bits ⇒ d_trans = 8,000 / 10⁷ = 0.8 ms. d / (250 km/ms) = 0.8 ms ⇒ d = 200 km.'
    ),
    hints: text(
      [
        '1.000 Baytı 8 ile çarparak L = 8.000 bit bul ve d_trans = L/R değerini saniye cinsinden hesapla.',
        'd / v = d_trans eşitliğinden d = v · d_trans değerini bulup kilometreye (÷1000) çevir.'
      ],
      [
        'Convert 1,000 Bytes to L = 8,000 bits and compute d_trans = L/R in seconds.',
        'From d / v = d_trans, calculate d = v · d_trans and convert meters to kilometers (÷1000).'
      ]
    )
  },
  {
    title: text('N bağlantıda P paketin boru hattı (pipelining) süresi', 'Pipelining P packets across N identical links'),
    tag: text('ÖZGÜN ÇALIŞMA SORUSU · §1.3.1 (P2 BENZERİ)', 'ORIGINAL STUDY QUESTION · §1.3.1 (P2 STYLE)'),
    difficulty: text('Vize / Final', 'Midterm / Final'),
    text: text(
      'Kaynak ile hedef arasında 2 adet store-and-forward yönlendirici (toplam N = 3 özdeş bağlantı) vardır. Her bağlantıda bir paketin iletim süresi L/R = 4 ms ve yayılma süresi d/v = 2 ms’dir (işleme ve kuyruk gecikmesi sıfırdır). Kaynak t = 0’dan itibaren arka arkaya P = 5 paket gönderirse 5. paketin son biti hedefe kaçıncı milisaniyede ulaşır?',
      'There are 2 store-and-forward routers (N = 3 identical links) between source and destination. Each link has packet transmission time L/R = 4 ms and propagation delay d/v = 2 ms (processing and queuing delays are zero). If the source sends P = 5 packets back-to-back starting at t = 0, at what time (in ms) is the 5th packet completely received at the destination?'
    ),
    unit: 'ms',
    answer: 34,
    tolerance: 0.1,
    feedback: text(
      'Doğru! 1. paket 3 bağlantıyı N·(L/R + d/v) = 3 × (4 + 2) = 18 ms’de tamamlar. Kalan P − 1 = 4 paketin her biri boru hattından 4 ms (L/R) arayla çıkar: 18 + 4 × 4 = 34 ms. Formül: (N + P − 1)·(L/R) + N·(d/v) = (3 + 5 − 1)×4 + 3×2 = 28 + 6 = 34 ms.',
      'Correct! Packet 1 completes all 3 links in N·(L/R + d/v) = 3 × (4 + 2) = 18 ms. Each of the remaining P − 1 = 4 packets emerges from the pipeline every 4 ms (L/R): 18 + 4 × 4 = 34 ms. Formula: (N + P − 1)·(L/R) + N·(d/v) = 7×4 + 3×2 = 34 ms.'
    ),
    solutionSummary: text(
      'd_end = (N + P − 1)·d_trans + N·d_prop = (3 + 5 − 1)×4 ms + 3×2 ms = 28 + 6 = 34 ms.',
      'd_end = (N + P − 1)·d_trans + N·d_prop = (3 + 5 − 1)×4 ms + 3×2 ms = 28 + 6 = 34 ms.'
    ),
    hints: text(
      [
        'Önce yalnızca 1. paketin 3 bağlantıyı geçip hedefe tam varış anını bul: 3 × (4 + 2) = 18 ms.',
        'Özdeş bağlantılarda boru hattı dolduktan sonra kalan P − 1 = 4 paketin her biri bir öncekinden tam L/R = 4 ms sonra hedefe varır.'
      ],
      [
        'First find when Packet 1 finishes arriving at the destination across the 3 links: 3 × (4 + 2) = 18 ms.',
        'Once the pipeline of identical links is full, each of the remaining P − 1 = 4 packets arrives exactly L/R = 4 ms after the preceding packet.'
      ]
    )
  },
  {
    title: text('Bant Genişliği–Gecikme Çarpımı (BDP) ve hattaki bit sayısı', 'Bandwidth-Delay Product (BDP) and bits in flight'),
    tag: text('ÖZGÜN ÇALIŞMA SORUSU · §1.4.1 (P25 BENZERİ)', 'ORIGINAL STUDY QUESTION · §1.4.1 (P25 STYLE)'),
    difficulty: text('Vize / Final', 'Midterm / Final'),
    text: text(
      'Aralarında d = 15.000 km mesafe bulunan iki sistem, yayılma hızı v = 2,5 × 10⁸ m/sn ve iletim hızı R = 4 Mbps olan doğrudan bir bağlantıyla bağlıdır. Bu bağlantının Bant Genişliği–Gecikme Çarpımı (BDP = R · d_prop), yani herhangi bir anda kabloda uçuşta olabilecek maksimum veri miktarı kaç kilobittir (1 kb = 1.000 bit)?',
      'Two hosts separated by d = 15,000 km are connected by a direct link with propagation speed v = 2.5 × 10⁸ m/s and transmission rate R = 4 Mbps. What is the Bandwidth-Delay Product (BDP = R · d_prop)—the maximum number of bits that can be in flight in the link at any instant—expressed in kilobits (1 kb = 1,000 bits)?'
    ),
    unit: 'kb',
    answer: 240,
    tolerance: 0.5,
    feedback: text(
      'Doğru! d_prop = 15.000 km / (250.000 km/sn) = 0,06 sn (60 ms). BDP = R · d_prop = (4 × 10⁶ bit/sn) × 0,06 sn = 240.000 bit = 240 kb.',
      'Correct! d_prop = 15,000 km / (250,000 km/s) = 0.06 s (60 ms). BDP = R · d_prop = (4 × 10⁶ bits/s) × 0.06 s = 240,000 bits = 240 kb.'
    ),
    solutionSummary: text(
      'd_prop = 1,5×10⁷ m / (2,5×10⁸ m/sn) = 0,06 sn. BDP = 4.000 kb/sn × 0,06 sn = 240 kb.',
      'd_prop = 1.5×10⁷ m / (2.5×10⁸ m/s) = 0.06 s. BDP = 4,000 kb/s × 0.06 s = 240 kb.'
    ),
    hints: text(
      [
        'Önce yayılma gecikmesini saniye cinsinden bul: d_prop = 15.000.000 m / (2,5 × 10⁸ m/sn).',
        'Bulduğun saniye değerini R = 4.000 kb/sn ile çarp.'
      ],
      [
        'First compute propagation delay in seconds: d_prop = 15,000,000 m / (2.5 × 10⁸ m/s).',
        'Multiply that time in seconds by R = 4,000 kb/s.'
      ]
    )
  },
  {
    title: text('Bir bitin kablodaki fiziksel uzunluğu', 'Physical spatial width of a single bit on a link'),
    tag: text('ÖZGÜN ÇALIŞMA SORUSU · §1.4.1 (P25d BENZERİ)', 'ORIGINAL STUDY QUESTION · §1.4.1 (P25d STYLE)'),
    difficulty: text('Vize', 'Midterm'),
    text: text(
      'Yayılma hızı v = 2 × 10⁸ m/sn ve iletim hızı R = 5 Mbps olan bir fiber bağlantıda tek bir bitin kablo üzerindeki fiziksel uzunluğu (w_bit = v / R) kaç metredir?',
      'On a fiber link with propagation speed v = 2 × 10⁸ m/s and transmission rate R = 5 Mbps, what is the physical width (in meters) of a single bit propagating along the link (w_bit = v / R)?'
    ),
    unit: 'm',
    answer: 40,
    tolerance: 0.1,
    feedback: text(
      'Doğru! Bir bit bağlantıya 1/R = 0,2 mikrosaniyede verilir; bu sürede bitin ön ucu v / R = (2 × 10⁸ m/sn) / (5 × 10⁶ bit/sn) = 40 metre ilerler.',
      'Correct! One bit takes 1/R = 0.2 microseconds to be pushed onto the link; during that interval its leading edge travels v / R = (2 × 10⁸ m/s) / (5 × 10⁶ bits/s) = 40 meters.'
    ),
    solutionSummary: text(
      'w_bit = v / R = (2 × 10⁸ m/sn) / (5 × 10⁶ bit/sn) = 40 m/bit.',
      'w_bit = v / R = (2 × 10⁸ m/s) / (5 × 10⁶ bits/s) = 40 m/bit.'
    ),
    hints: text(
      [
        'Bir bitin uzunluğu aynı zamanda bağlantı uzunluğunun BDP’ye oranıdır: d / (R · d/v) = v / R.',
        '2 × 10⁸ değerini 5 × 10⁶ değerine böl.'
      ],
      [
        'The spatial width of a bit equals link length divided by BDP: d / (R · d/v) = v / R.',
        'Divide 2 × 10⁸ by 5 × 10⁶.'
      ]
    )
  },
  {
    title: text('Darboğaz yönlendiricisinde kuyruk gecikmesi', 'Queuing delay at a bottleneck router'),
    tag: text('ÖZGÜN ÇALIŞMA SORUSU · §1.4.2 (P12 & P23 BENZERİ)', 'ORIGINAL STUDY QUESTION · §1.4.2 (P12 & P23 STYLE)'),
    difficulty: text('Final', 'Final'),
    text: text(
      'Bir yönlendiricinin çıkış bağlantısının hızı R = 2 Mbps’dir. Her biri L = 1.000 Bayt (8.000 bit) olan paketlerin iletildiği bu çıkışa yeni bir paket ulaştığında, o anda bağlantıda iletilmekte olan paketin tam yarısı (4.000 bit) gönderilmiş durumdadır ve kuyrukta bekleyen 3 tam paket daha vardır. Yeni gelen bu paketin yaşayacağı kuyruk gecikmesi (d_queue) kaç milisaniyedir?',
      'A router’s outbound link has transmission rate R = 2 Mbps. All packets have length L = 1,000 Bytes (8,000 bits). When a new packet arrives at the output queue, one packet is currently halfway through transmission (4,000 bits remaining) and 3 full packets are already waiting in the queue ahead of it. What is the queuing delay d_queue (in ms) for the newly arriving packet?'
    ),
    unit: 'ms',
    answer: 14,
    tolerance: 0.1,
    feedback: text(
      'Doğru! Bir tam paketin iletim süresi L/R = 8.000 / 2×10⁶ = 4 ms’dir. İletilmekte olan paketin kalan yarısı 2 ms, kuyruktaki 3 tam paket ise 3 × 4 = 12 ms sürer; toplam kuyruk bekleme süresi 2 + 12 = 14 ms olur.',
      'Correct! One full packet takes L/R = 8,000 / 2×10⁶ = 4 ms to transmit. The remaining half of the in-service packet takes 2 ms, and the 3 queued packets take 3 × 4 = 12 ms, giving a total queuing delay of 2 + 12 = 14 ms.'
    ),
    solutionSummary: text(
      'Beklenecek toplam bit sayısı = 4.000 + 3 × 8.000 = 28.000 bit. d_queue = 28.000 / (2 × 10⁶ bit/sn) = 14 ms.',
      'Total bits ahead in service and queue = 4,000 + 3 × 8,000 = 28,000 bits. d_queue = 28,000 / (2 × 10⁶ bits/s) = 14 ms.'
    ),
    hints: text(
      [
        'Önce tek bir tam paketin iletim süresini bul: L/R = 8.000 / (2 × 10⁶) = 4 ms.',
        'Yeni gelen paket kendi iletimine başlamadan önce, şu an iletilen paketin kalan yarısını (0,5 × 4 ms) ve önündeki 3 tam paketi (3 × 4 ms) beklemek zorundadır.'
      ],
      [
        'First compute the transmission time of one full packet: L/R = 8,000 / (2 × 10⁶) = 4 ms.',
        'Before the new packet can start transmitting, it must wait for the remaining half of the currently transmitting packet (0.5 × 4 ms) plus the 3 full packets ahead of it (3 × 4 ms).'
      ]
    )
  },
  {
    title: text('Mesaj bölütleme (segmentation) ile kazanılan süre', 'Time saved by message segmentation'),
    tag: text('ÖZGÜN ÇALIŞMA SORUSU · §1.4 (P31 BENZERİ)', 'ORIGINAL STUDY QUESTION · §1.4 (P31 STYLE)'),
    difficulty: text('Final', 'Final'),
    text: text(
      'Kaynak ile hedef arasında 1 store-and-forward yönlendirici (toplam N = 2 özdeş bağlantı, her biri R = 1 Mbps) bulunuyor; yayılma ve işleme gecikmeleri sıfırdır. F = 100.000 bitlik bir mesajı tek parça göndermek yerine her biri L = 10.000 bitlik P = 10 pakete bölerek göndermek uçtan uca tamamlanma süresini kaç milisaniye (ms) kısaltır?',
      'A source and destination are separated by 1 store-and-forward router (N = 2 identical links, each of rate R = 1 Mbps) with zero propagation and processing delays. How many milliseconds (ms) of total transfer time are saved by segmenting an F = 100,000-bit message into P = 10 packets of L = 10,000 bits each, compared to sending it as a single unsegmented message?'
    ),
    unit: 'ms',
    answer: 90,
    tolerance: 0.5,
    feedback: text(
      'Doğru! Tek parça mesaj bir bağlantıda 100 ms, N = 2 bağlantıda 2 × 100 = 200 ms sürer. 10 pakete bölündüğünde her paket bir bağlantıda 10 ms sürer; 2 bağlantıda 10 paket (2 + 10 − 1) × 10 = 110 ms’de tamamlanır. Kazanılan süre 200 − 110 = 90 ms’dir!',
      'Correct! Unsegmented, the message takes 100 ms per link, so 2 × 100 = 200 ms across N = 2 links. Segmented into 10 packets (10 ms per packet), pipelining completes in (2 + 10 − 1) × 10 = 110 ms. The time saved is 200 − 110 = 90 ms!'
    ),
    solutionSummary: text(
      'T_bölütlemesiz = 2 × (100.000 / 10⁶) = 200 ms. T_bölütlü = (2 + 10 − 1) × (10.000 / 10⁶) = 110 ms. Fark = 200 − 110 = 90 ms.',
      'T_unsegmented = 2 × (100,000 / 10⁶) = 200 ms. T_segmented = (2 + 10 − 1) × (10,000 / 10⁶) = 110 ms. Savings = 200 − 110 = 90 ms.'
    ),
    hints: text(
      [
        'Bölütlemesiz durumda yönlendirici 100.000 bitin tamamını (100 ms) bekleyip tekrar 100 ms iletir: toplam 200 ms.',
        '10 pakete bölündüğünde yönlendirici ilk 10.000 biti (10 ms) alır almaz ikinci bağlantıyı çalıştırmaya başlar: toplam süre (N + P − 1) × 10 ms = 110 ms olur. İki sürenin farkını al.'
      ],
      [
        'Without segmentation, the router waits 100 ms to receive all 100,000 bits and takes another 100 ms to forward them: 200 ms total.',
        'Segmented into 10 packets, the router starts forwarding on Link 2 after just 10 ms: total time is (N + P − 1) × 10 ms = 110 ms. Subtract the two times.'
      ]
    )
  }
];
