const text = (tr, en) => ({tr, en});

export const networkEdgeExtraQuestions = [
  {
    title: text('DSL frekans kanalları ve aynı anda telefon görüşmesi (Şekil 1.5)', 'DSL frequency channels and simultaneous voice calls (Figure 1.5)'),
    tag: text('DSL · §1.2.1', 'DSL · §1.2.1'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'DSL bağlantısı tek bir mevcut bakır telefon hattı üzerinden hem geleneksel sesli telefon görüşmesini hem de yüksek hızlı internet verisini aynı anda nasıl taşıyabilir?',
      'How can a DSL connection carry both an ordinary telephone call and high-speed Internet data simultaneously over a single existing copper telephone line?'
    ),
    choices: text(
      [
        'Ses (0–4 kHz), yükleme (4–50 kHz) ve indirme (50 kHz–1 MHz) sinyallerini farklı frekans bantlarına (FDM) yerleştirerek; evdeki splitter bu sinyalleri ayırır.',
        'Telefon çaldığında internet bağlantısını tamamen kesip hattı yalnızca sese devrederek.',
        'Telefon hattının yanına her ev için ayrı bir uydu anteni takarak.',
        'Tüm ses ve internet trafiğini aynı 0–4 kHz bandına sıkıştırıp çarpıştırarak.'
      ],
      [
        'By encoding voice (0–4 kHz), upstream data (4–50 kHz), and downstream data (50 kHz–1 MHz) in distinct frequency bands (FDM), separated by a home splitter.',
        'By disconnecting the Internet whenever a phone call is active.',
        'By installing a satellite dish next to every telephone handset.',
        'By forcing both voice and broadband data into the same 0–4 kHz band.'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! DSL, tek bakır kabloyu frekans bölmeli çoklama (FDM) ile 3 ayrı kanal gibi kullanır ve evdeki splitter ile santraldeki DSLAM sinyalleri ayırır.',
      'Correct! DSL uses frequency-division multiplexing (FDM) so the single copper wire acts like 3 separate channels, separated by the home splitter and central office DSLAM.'
    ),
    hints: text(
      [
        'Şekil 1.5’teki üç frekans bandına bak: 0–4 kHz, 4–50 kHz, 50 kHz–1 MHz.',
        'Ev tarafında ses ile veriyi ayıran kutunun adı "Splitter"dır.'
      ],
      [
        'Check the three frequency bands in Figure 1.5: 0–4 kHz, 4–50 kHz, and 50 kHz–1 MHz.',
        'On the customer side, a splitter separates voice and data signals.'
      ]
    ),
    solutionSummary: text(
      'DSL, FDM ile 0–4 kHz (ses), 4–50 kHz (yükleme) ve 50 kHz–1 MHz (indirme) kanallarını aynı bakır çiftte paralel taşır (basılı s. 13).',
      'DSL uses FDM to carry 0–4 kHz (voice), 4–50 kHz (upstream), and 50 kHz–1 MHz (downstream) simultaneously over one copper pair (printed p. 13).'
    )
  },
  {
    title: text('FTTH PON bileşenleri: ONT, Optik Ayırıcı ve OLT (Şekil 1.7)', 'FTTH PON components: ONT, Optical Splitter, and OLT (Figure 1.7)'),
    tag: text('FTTH · §1.2.1', 'FTTH · §1.2.1'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'FTTH Pasif Optik Ağ (PON) mimarisinde ev tarafındaki sonlandırıcı ile telefon santralindeki (CO) optik–elektrik dönüştürücü sırasıyla hangileridir?',
      'In an FTTH Passive Optical Network (PON), which devices sit at the home and at the telco central office (CO), respectively?'
    ),
    choices: text(
      [
        'Evde ONT (Optical Network Terminator), santralde OLT (Optical Line Terminator)',
        'Evde OLT, santralde ONT',
        'Evde CMTS, santralde DSLAM',
        'Evde Ethernet anahtarı, santralde WiFi erişim noktası'
      ],
      [
        'ONT (Optical Network Terminator) at the home, OLT (Optical Line Terminator) at the central office',
        'OLT at the home, ONT at the central office',
        'CMTS at the home, DSLAM at the central office',
        'Ethernet switch at the home, WiFi AP at the central office'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Şekil 1.7’de her evde bir ONT bulunur; mahalledeki optik ayırıcı birden fazla ONT’yi santraldeki OLT’ye bağlar.',
      'Correct! In Figure 1.7, each home has an ONT connected via a neighborhood optical splitter to the OLT in the central office.'
    ),
    hints: text(
      [
        'N = Network (ev tarafı: ONT), L = Line (santral hattı: OLT).',
        'Şekil 1.7 akışı: Evde ONT → Optik Ayırıcı → Santralde OLT → İnternet.'
      ],
      [
        'ONT = Optical Network Terminator (home), OLT = Optical Line Terminator (central office).',
        'Figure 1.7 flow: Home ONT → Optical Splitter → CO OLT → Internet.'
      ]
    ),
    solutionSummary: text(
      'FTTH PON zinciri: Evde ONT → Mahallede Optik Ayırıcı (<100 ev) → Santralde OLT.',
      'FTTH PON chain: Home ONT → Neighborhood Optical Splitter (<100 homes) → Central Office OLT.'
    )
  },
  {
    title: text('Kablosuz erişim menzili: WiFi (802.11) vs 4G/5G Hücresel', 'Wireless access range: WiFi (802.11) vs. 4G/5G Cellular'),
    tag: text('KABLOSUZ · §1.2.1 · R4', 'WIRELESS · §1.2.1 · R4'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'WiFi (IEEE 802.11) ile 4G LTE / 5G hücresel erişim arasındaki temel menzil ve sınıf farkı nedir?',
      'What is the key range and category distinction between WiFi (IEEE 802.11) and 4G LTE / 5G cellular access?'
    ),
    choices: text(
      [
        'WiFi yerel alan (WLAN) erişimidir ve erişim noktasından birkaç on metre menzilde çalışır; 4G/5G geniş alan kablosuz erişimidir ve baz istasyonundan onlarca kilometre menzile ulaşır.',
        'WiFi onlarca kilometre menzillidir; 4G/5G ise yalnızca tek bir oda içinde çalışır.',
        'Her ikisi de kılavuzlu (guided) bakır kablo ortamı kullanır.',
        'WiFi yalnızca telefon görüşmeleri için, 4G/5G ise yalnızca kablolu Ethernet için kullanılır.'
      ],
      [
        'WiFi is local-area (WLAN) access spanning a few tens of meters from an access point; 4G/5G is wide-area wireless access spanning tens of kilometers from a base station.',
        'WiFi spans tens of kilometers, whereas 4G/5G works only inside a single room.',
        'Both use guided copper wire media.',
        'WiFi is for voice calls only, while 4G/5G is for wired Ethernet only.'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! WiFi yerel alan (birkaç on metre), 4G/5G ise geniş alan kablosuz erişim (onlarca km) sağlar.',
      'Correct! WiFi provides local-area wireless access (tens of meters), whereas 4G/5G provides wide-area cellular access (tens of kilometers).'
    ),
    hints: text(
      [
        'Bir kafedeki WiFi’den dışarı çıkıp 2 km yürürsen bağlantın ne olur?',
        'Baz istasyonları (cell towers) onlarca kilometre genişliğinde hücrelere hizmet verir.'
      ],
      [
        'What happens if you walk 2 km away from a cafe WiFi access point?',
        'Cellular base stations serve wide-area cells spanning tens of kilometers.'
      ]
    ),
    solutionSummary: text(
      'WiFi (802.11) = yerel alan kablosuz (birkaç on metre); 4G/5G = geniş alan kablosuz (onlarca km).',
      'WiFi (802.11) = wireless LAN (few tens of meters); 4G/5G = wide-area wireless (tens of kilometers).'
    )
  },
  {
    title: text('Sayısal hesap: Paylaşımlı HFC ağında etkin indirme hızı', 'Numerical: Effective download rate on shared HFC'),
    tag: text('SAYISAL · HFC', 'NUMERICAL · HFC'),
    difficulty: text('Orta', 'Intermediate'),
    text: text(
      'Toplam indirme kapasitesi R_down = 600 Mbps olan bir HFC mahalle düğümünde N_active = 15 ev aynı anda büyük bir video indiriyor. Her evin ortalama etkin indirme hızı kaç Mbps olur?',
      'On an HFC neighborhood node with aggregate downstream capacity R_down = 600 Mbps, N_active = 15 homes simultaneously download a large video. What is each home’s average effective download rate in Mbps?'
    ),
    unit: text('Mbps', 'Mbps'),
    answer: 40,
    tolerance: 0.1,
    feedback: text(
      'Doğru! HFC paylaşımlı bir ortam olduğundan R_user = 600 / 15 = 40 Mbps.',
      'Correct! Because HFC is a shared medium, R_user = 600 / 15 = 40 Mbps.'
    ),
    hints: text(
      [
        'HFC indirme kanalı eşzamanlı indirme yapan evler arasında paylaşılır.',
        'R_user = R_down / N_active = 600 / 15.'
      ],
      [
        'The HFC downstream channel is shared among simultaneously downloading homes.',
        'R_user = R_down / N_active = 600 / 15.'
      ]
    ),
    solutionSummary: text(
      'R_user = 600 Mbps / 15 = 40 Mbps.',
      'R_user = 600 Mbps / 15 = 40 Mbps.'
    )
  },
  {
    title: text('Sayısal hesap: Asimetrik DSL ile dosya yükleme süresi', 'Numerical: File upload time on asymmetric DSL'),
    tag: text('SAYISAL · DSL', 'NUMERICAL · DSL'),
    difficulty: text('Orta', 'Intermediate'),
    text: text(
      'Adanmış bir DSL hattının indirme hızı 40 Mbps, yükleme hızı ise 8 Mbps’dir. Bu hattan F = 50 MB (megabayt, 1 MB = 10⁶ bayt) büyüklüğünde bir video buluta yüklenmek isteniyor. Yükleme işlemi kaç saniye sürer?',
      'A dedicated DSL line has 40 Mbps downstream and 8 Mbps upstream. A user uploads an F = 50 MB (1 MB = 10⁶ bytes) video to the cloud. How many seconds does the upload take?'
    ),
    unit: text('sn', 's'),
    answer: 50,
    tolerance: 0.2,
    feedback: text(
      'Doğru! Yükleme için 8 Mbps upstream hızı kullanılır. 50 MB = 400 Mbit → 400 Mbit / 8 Mbps = 50 saniye!',
      'Correct! Uploading uses the 8 Mbps upstream rate. 50 MB = 400 Mbits → 400 Mbits / 8 Mbps = 50 seconds!'
    ),
    hints: text(
      [
        'Dikkat: Dosya indirmiyor, YÜKLÜYORUZ! Hangi hızı (40 Mbps mi, 8 Mbps mi) kullanmalısın?',
        '50 MB’ı bite çevir: 50 × 8 = 400 Mbit. Ardından 8 Mbps’ye böl.'
      ],
      [
        'Careful: We are UPLOADING, not downloading! Use the 8 Mbps upstream rate, not 40 Mbps.',
        'Convert 50 MB to bits: 50 × 8 = 400 Mbits, then divide by 8 Mbps.'
      ]
    ),
    solutionSummary: text(
      'T_upload = (50 × 8 Mbit) / 8 Mbps = 400 / 8 = 50 sn.',
      'T_upload = (50 × 8 Mbits) / 8 Mbps = 400 / 8 = 50 s.'
    )
  },
  {
    title: text('Kılavuzlu vs Kılavuzsuz ortam sınıflandırması (§1.2.2)', 'Guided vs. Unguided media classification (§1.2.2)'),
    tag: text('ORTAMLAR · §1.2.2', 'MEDIA · §1.2.2'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'Aşağıdaki fiziksel ortam gruplarından hangisi YALNIZCA kılavuzlu (guided) ortamlardan oluşur?',
      'Which group of physical media consists EXCLUSIVELY of guided media?'
    ),
    choices: text(
      [
        'Bükümlü bakır tel (UTP), koaksiyel kablo ve fiber optik kablo',
        'Fiber optik kablo, WiFi radyo kanalı ve jeosenkron uydu',
        'Bluetooth, 5G hücresel radyo ve LEO uydu',
        'Koaksiyel kablo, karasal mikrodalga ve 4G LTE'
      ],
      [
        'Twisted-pair copper wire (UTP), coaxial cable, and fiber-optic cable',
        'Fiber-optic cable, WiFi radio channel, and geostationary satellite',
        'Bluetooth, 5G cellular radio, and LEO satellite',
        'Coaxial cable, terrestrial microwave, and 4G LTE'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Kılavuzlu ortamlarda dalgalar katı bir ortam boyunca yönlendirilir: bükümlü bakır, koaksiyel ve fiber optik.',
      'Correct! Guided media guide waves along a solid medium: twisted-pair copper, coaxial cable, and optical fiber.'
    ),
    hints: text(
      [
        'Kılavuzlu (guided) = dalganın içinden aktığı katı bir kablo/tel vardır.',
        'Radyo, WiFi, 4G/5G ve uydu kanalları atmosferde/uzayda yayıldığı için kılavuzsuzdur (unguided).'
      ],
      [
        'Guided = waves travel along a solid physical cable or fiber.',
        'Radio, WiFi, 4G/5G, and satellite channels propagate in open space (unguided).'
      ]
    ),
    solutionSummary: text(
      'Kılavuzlu: UTP bakır, koaksiyel, fiber optik. Kılavuzsuz: karasal radyo ve uydu kanalları.',
      'Guided: UTP copper, coaxial, fiber optics. Unguided: terrestrial radio and satellite channels.'
    )
  },
  {
    title: text('Bükümlü bakır telin (UTP) neden büküldüğü ve Cat 6a hızı', 'Why twisted-pair copper is twisted and Cat 6a speed'),
    tag: text('BAKIR · §1.2.2', 'COPPER · §1.2.2'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'Bükümlü bakır kabloda (twisted-pair) iki yalıtılmış bakır telin sarmal biçimde birbirine dolanmasının temel fiziksel amacı nedir?',
      'What is the primary physical reason the two insulated copper wires in twisted-pair cable are arranged in a regular spiral pattern?'
    ),
    choices: text(
      [
        'Yakındaki benzer tel çiftlerinden gelen elektriksel paraziti (girişimi) azaltmak',
        'Kablo uzunluğunu artırarak yayılma gecikmesini büyütmek',
        'Işık darbelerinin cam yüzeyden yansımasını sağlamak',
        'Uydu sinyallerini doğrudan kablo içine çekmek'
      ],
      [
        'To reduce electrical interference (crosstalk) from similar neighboring wire pairs',
        'To lengthen the cable and intentionally increase propagation delay',
        'To reflect light pulses inside a glass core',
        'To capture satellite radio waves directly into the wire'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Tellerin sarmal bükülmesi komşu çiftlerden gelen elektromanyetik girişimi (crosstalk) sönümler; böylece Cat 6a UTP 100 m’de 10 Gbps’ye ulaşabilir.',
      'Correct! Twisting cancels electrical interference from adjacent pairs, allowing modern Cat 6a UTP to reach 10 Gbps up to 100 m.'
    ),
    hints: text(
      [
        'Bir demet içinde yan yana duran bakır teller birbirinde istenmeyen elektriksel akım indükleyebilir.',
        '§1.2.2 (basılı s. 19): "The wires are twisted together to reduce the electrical interference..."'
      ],
      [
        'Parallel copper pairs bundled together induce unwanted electrical noise in one another.',
        'Per §1.2.2 (printed p. 19), twisting reduces electrical interference from similar pairs close by.'
      ]
    ),
    solutionSummary: text(
      'Sarmal büküm komşu çiftlerden gelen elektriksel paraziti azaltır; Cat 6a 100 m’de 10 Gbps destekler.',
      'Twisting reduces electrical interference from nearby pairs; Cat 6a supports 10 Gbps up to 100 m.'
    )
  },
  {
    title: text('Fiber optiğin uzun mesafe omurgadaki 3 üstünlüğü (§1.2.2)', 'Three advantages of fiber optics for long-haul backbones (§1.2.2)'),
    tag: text('FİBER · §1.2.2', 'FIBER · §1.2.2'),
    difficulty: text('Temel', 'Core'),
    text: text(
      'Fiber optik kabloların okyanus aşırı bağlantılarda ve İnternet omurgasında tercih edilmesinin başlıca teknik nedenleri hangisinde doğru verilmiştir?',
      'Which option accurately states the primary technical reasons fiber optics are preferred for long-haul and overseas Internet backbones?'
    ),
    choices: text(
      [
        'Elektromanyetik parazite bağışıklık, 100 km’ye kadar çok düşük sinyal zayıflaması ve dinlenmesinin çok zor olması',
        'Optik alıcı/vericilerin bakır konektörlerden her zaman çok daha ucuz olması',
        'Sinyalin fiber içinde boşluktaki ışık hızından daha hızlı gitmesi',
        'Elektrik akımıyla çalıştığı için hiç tekrarlayıcı (repeater) gerektirmemesi'
      ],
      [
        'Immunity to electromagnetic interference, very low signal attenuation up to 100 km, and high resistance to tapping',
        'Optical transmitters and switches always being far cheaper than copper connectors',
        'Light pulses traveling faster than the vacuum speed of light inside glass',
        'Using electrical current so no repeaters are ever required'
      ]
    ),
    answer: 0,
    feedback: text(
      'Doğru! Fiber çok yüksek hız (onlarca–yüzlerce Gbps), EMI bağışıklığı, düşük zayıflama ve yüksek fiziksel güvenlik sunar; kısa mesafede ise optik cihaz maliyeti nedeniyle bakır hâlâ yaygındır.',
      'Correct! Fiber offers massive bit rates, EMI immunity, very low attenuation up to 100 km, and tap resistance, while optical transceiver cost keeps copper dominant in short-haul LANs.'
    ),
    hints: text(
      [
        'Fiber ışık darbesi taşır — elektromanyetik gürültü ışığı etkiler mi?',
        '§1.2.2 (basılı s. 20): fiberin üç temel avantajını ve kısa mesafedeki maliyet dezavantajını hatırla.'
      ],
      [
        'Fiber carries light pulses — is light affected by electromagnetic interference?',
        'Recall the three advantages of fiber on printed p. 20 (EMI immunity, low attenuation, hard to tap).'
      ]
    ),
    solutionSummary: text(
      'Fiber optik: EMI bağışıklığı + 100 km’ye kadar düşük zayıflama + dinlemeye direnç + çok yüksek Gbps hızlar.',
      'Fiber optics: EMI immunity + low attenuation up to 100 km + hard to tap + tens to hundreds of Gbps.'
    )
  },
  {
    title: text('Sayısal hesap: OC-12 optik taşıyıcı hızı (§1.2.2)', 'Numerical: OC-12 optical carrier bit rate (§1.2.2)'),
    tag: text('SAYISAL · OC-n', 'NUMERICAL · OC-n'),
    difficulty: text('Orta', 'Intermediate'),
    text: text(
      'Optical Carrier (OC-n) standardında bağlantı hızı R = n × 51,8 Mbps olarak tanımlanır. Bir OC-12 fiber bağlantısının hızı kaç Mbps’dir?',
      'In the Optical Carrier (OC-n) standard, link speed equals n × 51.8 Mbps. What is the bit rate of an OC-12 fiber link in Mbps?'
    ),
    unit: text('Mbps', 'Mbps'),
    answer: 621.6,
    tolerance: 0.5,
    feedback: text(
      'Doğru! OC-12 = 12 × 51,8 Mbps = 621,6 Mbps.',
      'Correct! OC-12 = 12 × 51.8 Mbps = 621.6 Mbps.'
    ),
    hints: text(
      [
        'n = 12 değerini n × 51,8 formülüne yerleştir.',
        '10 × 51,8 = 518 ve 2 × 51,8 = 103,6 → toplam 621,6 Mbps.'
      ],
      [
        'Substitute n = 12 into n × 51.8 Mbps.',
        '10 × 51.8 = 518 and 2 × 51.8 = 103.6 → 621.6 Mbps.'
      ]
    ),
    solutionSummary: text(
      'R(OC-12) = 12 × 51,8 = 621,6 Mbps.',
      'R(OC-12) = 12 × 51.8 = 621.6 Mbps.'
    )
  },
  {
    title: text('Sayısal hesap: Alçak yörünge (LEO) uydu yayılma gecikmesi', 'Numerical: Low-Earth Orbit (LEO) satellite propagation delay'),
    tag: text('SAYISAL · LEO UYDU', 'NUMERICAL · LEO SATELLITE'),
    difficulty: text('Sınav Düzeyi', 'Exam Level'),
    text: text(
      'Yeryüzünden h = 600 km yükseklikte dönen bir alçak yörünge (LEO) uydusu üzerinden dikey gidiş-dönüş (yer → uydu → yer, toplam yol 2h = 1.200 km) yapan radyo sinyalinin tek yönlü yayılma gecikmesi (c = 3×10⁸ m/sn) kaç milisaniyedir?',
      'A radio signal travels vertically from a ground station up to a Low-Earth Orbit (LEO) satellite at altitude h = 600 km and back down to a second ground station (total path 2h = 1,200 km) at c = 3×10⁸ m/s. What is the one-way propagation delay in milliseconds?'
    ),
    unit: text('ms', 'ms'),
    answer: 4,
    tolerance: 0.1,
    feedback: text(
      'Doğru! Toplam mesafe 2h = 1.200 km = 1,2×10⁶ m. d_prop = (1,2×10⁶) / (3×10⁸) = 0,004 sn = 4 ms! GEO uydunun ~280 ms gecikmesine kıyasla ~70 kat daha düşük.',
      'Correct! Total path 2h = 1,200 km = 1.2×10⁶ m. d_prop = (1.2×10⁶) / (3×10⁸) = 0.004 s = 4 ms — roughly 70× lower than GEO’s ~280 ms!'
    ),
    hints: text(
      [
        'Sinyal hem yukarı (600 km) hem aşağı (600 km) gider → toplam mesafe d = 1.200 km = 1,2 × 10⁶ m.',
        'd / c = (1,2 × 10⁶) / (3 × 10⁸) = 0,004 saniye = 4 ms.'
      ],
      [
        'The signal goes both up (600 km) and back down (600 km) → total distance d = 1,200 km = 1.2 × 10⁶ m.',
        'd / c = (1.2 × 10⁶) / (3 × 10⁸) = 0.004 seconds = 4 ms.'
      ]
    ),
    solutionSummary: text(
      'd_prop = 2h / c = (1,2 × 10⁶ m) / (3 × 10⁸ m/sn) = 4 ms.',
      'd_prop = 2h / c = (1.2 × 10⁶ m) / (3 × 10⁸ m/s) = 4 ms.'
    )
  }
];
