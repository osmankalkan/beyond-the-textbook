import {T, step, v, n, o, fn, sub, f, eq, plus, minus} from '../../../study/math.js';

export const layerFormulas = {
  datagram: v('D') + eq + v('M') + plus + sub(v('H'), v('T')) + plus + sub(v('H'), v('I')),
  padding: v('P') + eq + fn('max', n(0) + o(',') + n(46) + minus + v('D')),
  frame: v('F') + eq + n(14) + plus + v('D') + plus + v('P') + plus + n(4),
  fraction: v('η') + eq + f(v('M'), v('F'))
};

const {datagram, padding, frame, fraction} = layerFormulas;
const ttl = n(64) + minus + n(1) + eq + n(63);

export const protocolLayersStudy = {
  title: T('Hangi bilgi hangi katmana ait?', 'Which information belongs to each layer?'),
  intro: T('Önce sonucu tahmin et. Ardından labda alanları say veya başlığın değiştiği adımı bul.', 'Predict an outcome, then count the fields or locate the step where a header changes.'),
  predictions: [
    {
      id: 'short-frame',
      question: T('Uygulama 12 bayt gönderiyor. UDP kullanılırsa Ethernet çerçevesi kaç bayt olur?', 'The application sends 12 bytes via UDP. How long is the Ethernet frame?'),
      context: T('UDP 8, IPv4 20, Ethernet başlığı 14, FCS 4 bayt. En küçük Ethernet yükü 46 bayt.', 'UDP 8, IPv4 20, Ethernet header 14, FCS 4 bytes. Minimum Ethernet payload is 46 bytes.'),
      choices: T(['40 bayt', '58 bayt', '64 bayt'], ['40 bytes', '58 bytes', '64 bytes']),
      answer: 2,
      reason: T('Datagram 40 bayt. Ethernet bunu 6 baytla doldurur. Başlık ve FCS ile toplam 64 olur.', 'The datagram is 40 bytes. Ethernet adds six bytes of padding. Its header and FCS bring the total to 64.'),
      math: n(14) + plus + n(40) + plus + n(6) + plus + n(4) + eq + n(64)
    },
    {
      id: 'hop-addresses',
      question: T('Yönlendirici paketi ikinci Ethernet bağlantısına çıkarıyor. Hangi değerler değişir?', 'The router sends the packet onto a second Ethernet link. Which values change?'),
      context: T('Gönderici ile alıcı farklı ağlarda. Normal IPv4 iletimi yapılıyor.', 'Sender and receiver are in different networks. This is ordinary IPv4 forwarding.'),
      choices: T(['MAC adresleri ve TTL', 'IP uç adresleri ve taşıma portları', 'Yalnız uygulama mesajı'],
        ['MAC addresses and TTL', 'Endpoint IP addresses and transport ports', 'Only the application message']),
      answer: 0,
      reason: T('Yeni bağlantının MAC adresleri kullanılır. Yönlendirici TTL’yi azaltır. IP uç adresleri ve portlar korunur.', 'The new link needs its own MAC addresses. The router decrements TTL. Endpoint IP addresses and transport ports stay the same.'),
      math: ttl
    }
  ],
  paths: [
    {
      title: T('Kısa mesaj neden 64 bayta ulaşır?', 'Why does a short message become 64 bytes?'),
      prompt: T('Labda Kısa mesaj ve UDP’yi seç.', 'Select Short message and UDP in the lab.'),
      steps: [
        step('Taşıma birimini kur', 'Build the transport unit', n(12) + plus + n(8) + eq + n(20), 'UDP başlığı ve veri toplam 20 bayt.', 'The UDP header and data total 20 bytes.'),
        step('IP datagramını hesapla', 'Compute the IP datagram length', datagram, '12 + 8 + 20 = 40 bayt. Ethernet’in yüküne tamamı girer.', '12 + 8 + 20 = 40 bytes. All of it goes into the Ethernet payload.'),
        step('Dolgu gerekip gerekmediğini kontrol et', 'Check whether padding is needed', padding, '40, gereken 46’dan küçüktür. 6 bayt Ethernet dolgusu gerekir.', 'Forty is below the required 46. Ethernet needs six padding bytes.'),
        step('Çerçeveyi tamamla', 'Finish the frame', frame, '14 + 40 + 6 + 4 = 64 bayt. FCS sonda yer alır.', '14 + 40 + 6 + 4 = 64 bytes. The FCS is at the end.'),
        step('TCP’ye geçip farkı doğrula', 'Switch to TCP and verify the difference', n(14) + plus + n(52) + plus + n(4) + eq + n(70), 'TCP ile IP datagramı 52 bayt ve dolgu sıfırdır. Labda iki çerçeveyi aynı adımda karşılaştır.', 'With TCP the IP datagram is 52 bytes and needs no padding. Compare the frames at the same lab step.')
      ],
      reflection: T('Uygulama verisi büyüyünce TCP ile UDP çerçeveleri arasındaki fark neden 12 bayta çıkar?', 'Why does the difference between the TCP and UDP frames rise to 12 bytes as the message grows?')
    },
    {
      title: T('Yönlendiricide değişen alanları ayır', 'Identify what changes at the router'),
      prompt: T('İlk Ethernet çerçevesinden alıcı uygulamasına kadar ilerle.', 'Step through from the first Ethernet frame to the receiving application.'),
      steps: [
        step('İlk hedef MAC’i bul', 'Find the first destination MAC', '', 'IP hedefi alıcıdır. Ethernet hedefi ise ilk bağlantıda erişilebilen yönlendirici girişidir.', 'The IP destination is the receiver. The Ethernet destination is the router ingress reachable on the first link.'),
        step('Anahtarın kararını izle', 'Trace the switch decision', '', 'Anahtar hedef MAC ile çıkış portunu seçer. TTL 64 kalır.', 'The switch chooses its output port using the destination MAC. TTL stays at 64.'),
        step('Yönlendiricide kapsülü aç', 'Remove the envelope at the router', ttl, 'Yönlendirici IP hedefine bakar, TTL’yi azaltır ve IPv4 başlık sağlama toplamını günceller.', 'The router looks at the IP destination, decrements TTL, and updates the IPv4 header checksum.'),
        step('Çıkış bağlantısını hazırla', 'Prepare the outgoing link', '', 'Kaynak MAC yönlendiricinin çıkışına, hedef MAC alıcıya aittir. IP hedefi hâlâ alıcıdır.', 'The source MAC is the router egress and the destination MAC is the receiver. The receiver is still the IP destination.'),
        step('Alıcıda veriyi doğrula', 'Verify the data at the receiver', fraction, 'Çerçevedeki M/F oranından bağımsız olarak alıcı uygulaması başlangıçtaki M baytı alır. Labın ilk ve son adımını karşılaştır.', 'The receiving application gets the original M bytes regardless of the frame’s M/F fraction. Compare the first and last lab steps.')
      ],
      reflection: T('Araya ikinci bir Ethernet anahtarı ya da ikinci bir IP yönlendiricisi eklense TTL nasıl değişirdi?', 'How would TTL change if the path gained another Ethernet switch or another IP router?')
    }
  ]
};

const scoring = (tr, en) => step('Puanlama', 'Scoring', '', tr, en);

export const protocolLayersClinic = {
  examBlueprint: [
    {step: T('İlişkiyi belirle', 'Identify the relationship'), detail: T('Eşler arasındaki protokolü ve dikey hizmeti ayır.', 'Separate peer protocol from service between layers.')},
    {step: T('Veri birimini adlandır', 'Name the data unit'), detail: T('Her adımda hangi alanların hâlâ kapsülde olduğunu yaz.', 'List the fields still present at each stage.')},
    {step: T('Sonucu sağla', 'Check the result'), detail: T('Çerçeve boyunu ve en sonda teslim edilen mesajı ayrı kontrol et.', 'Check frame size and the final application message separately.')}
  ],
  examClinic: [
    {
      badge: T('Hizmet ve protokol · 5 puan', 'Service and protocol · 5 points'),
      title: T('Yerel yeniden iletim varken TCP ne sağlar?', 'What does TCP provide when a link retries locally?'),
      statement: T('İstemci ile sunucu arasında ilk bağlantı Wi‑Fi. Wi‑Fi bağlantısı bazı kayıpları yerel tekrarlarla gideriyor. Bir parça ise daha sonraki bağlantıda kayboluyor. İki tekrarın kapsamını ve TCP’nin uygulamaya sunduğu hizmeti açıkla.',
        'The first link between a client and server is Wi-Fi. Local retries recover some losses on that link. A segment is then lost on a later link. Explain the scope of both retries and what service TCP offers the application.'),
      trap: T('Yerel başarıyı uçtan uca teslimle karıştırma.', 'Keep success on a single link distinct from end-to-end delivery.'),
      steps: [
        step('Yerel eşleri belirle', 'Identify the local peers', '', 'Wi‑Fi protokolüne o bağlantıdaki eşler katılır. Daha sonraki bağlantıda oluşan kaybı bu eşler gideremez.', 'The Wi-Fi peers are on the local link. Their retry cannot recover a loss on a later link.'),
        step('Uçtan uca eşleri belirle', 'Identify the end-to-end peers', '', 'İki uçtaki TCP, sıra numaraları ve onaylar üzerinden ilerlemeyi izler. Teslim edilmeyen veri için gönderici TCP yeniden iletebilir.', 'TCP peers at the endpoints use sequence numbers and acknowledgments to track progress. The sending TCP can retransmit missing data.'),
        step('Arayüzü doğrula', 'Verify the interface', '', 'Uygulama sıralı, güvenilir bir bayt akışı görür veya bağlantı hatası alır. TCP’nin altında farklı bağlantı teknolojileri kullanılabilir.', 'The application receives a reliable, ordered byte stream or a connection failure. Different links can be used below TCP.'),
        scoring('Yerel kapsam 2, TCP eşleri ve kurtarma 2, uygulama hizmeti 1.', 'Local scope 2, TCP peers and recovery 2, application service 1.')
      ]
    },
    {
      badge: T('Kapsülleme · 6 puan', 'Encapsulation · 6 points'),
      title: T('İki başlık boyu, aynı çerçeve', 'Different headers, same frame size'),
      statement: T('4 bayt veri için TCP başlığı 20, UDP başlığı 8, IPv4 başlığı 20 bayt. Etiketsiz Ethernet ek yükü 18 bayt ve en küçük yükü 46 bayt. İki datagramı ve iki çerçeveyi hesapla.',
        'For four bytes of data, TCP uses a 20-byte header, UDP eight bytes, and IPv4 20 bytes. Untagged Ethernet adds 18 bytes and requires a 46-byte minimum payload. Find both datagram and frame lengths.'),
      trap: T('Ethernet dolgusu IP datagramının uzunluğuna eklenmez.', 'Ethernet padding leaves the IP datagram length unchanged.'),
      steps: [
        step('IP datagramlarını hesapla', 'Compute the IP datagrams', datagram, 'TCP için 4 + 20 + 20 = 44, UDP için 4 + 8 + 20 = 32 bayt.', 'TCP gives 4 + 20 + 20 = 44 bytes. UDP gives 4 + 8 + 20 = 32.'),
        step('Dolgu farkını bul', 'Find the padding difference', padding, 'TCP’de 2, UDP’de 14 dolgu baytı gerekir.', 'TCP needs two padding bytes and UDP needs fourteen.'),
        step('Toplamı doğrula', 'Verify the totals', frame, '14 + 44 + 2 + 4 = 14 + 32 + 14 + 4 = 64 bayt. Aynı sonucu 46 + 18 ile sağla.', '14 + 44 + 2 + 4 = 14 + 32 + 14 + 4 = 64 bytes. Check using 46 + 18.'),
        scoring('İki datagram 2, iki dolgu 2, çerçeve ve sağlama 2.', 'Both datagrams 2, both padding counts 2, frame lengths and check 2.')
      ]
    },
    {
      badge: T('Aygıtlar ve adresler · 6 puan', 'Devices and addresses · 6 points'),
      title: T('Aynı IP datagramı iki çerçevede', 'The IP datagram across two frames'),
      statement: T('A → anahtar → R → B yolunda R’nin giriş MAC’i R₁, çıkış MAC’i R₂. Başlangıç TTL değeri 40. İki Ethernet çerçevesinin MAC kaynak/hedef çiftini, IP uçlarını ve TTL değerini yaz.',
        'On A → switch → R → B, router R has ingress MAC R₁ and egress MAC R₂. Initial TTL is 40. Give source and destination MACs, IP endpoints, and TTL for both frames.'),
      trap: T('İlk yerel hedef, uzak alıcının MAC adresi değildir.', 'The first local destination is the router’s ingress MAC.'),
      steps: [
        step('İlk çerçeveyi izle', 'Trace the first frame', '', 'MAC çifti A → R₁. Anahtar çıkış portunu R₁ için seçer. IP çifti A → B, TTL 40.', 'MAC addresses are A → R₁. The switch selects the outgoing port for R₁. IP endpoints are A → B, TTL 40.'),
        step('Yönlendiriciyi işle', 'Process the router hop', n(40) + minus + n(1) + eq + n(39), 'R eski çerçeveyi açar, rota seçer ve IPv4 TTL değerini 39 yapar.', 'R removes the old frame, selects its route, and sets IPv4 TTL to 39.'),
        step('İkinci çifti doğrula', 'Verify the second pair', '', 'İkinci MAC çifti R₂ → B, IP uçları hâlâ A → B. B’nin alacağı TTL 39. Labda anahtar ve yönlendirici adımlarındaki TTL farkını kontrol et.', 'The second MAC pair is R₂ → B. The IP endpoints remain A → B and B receives TTL 39. Check the TTL difference between the switch and router steps in the lab.'),
        scoring('İki MAC çifti 2, IP uçları 1, iki TTL 2, anahtarın rolü 1.', 'Both MAC pairs 2, IP endpoints 1, both TTL values 2, switch role 1.')
      ]
    },
    {
      badge: T('Alıcıda bayt hesabı · 5 puan', 'Receiver byte count · 5 points'),
      title: T('Alıcı uygulamaya kaç bayt verir?', 'How many bytes reach the application?'),
      statement: T('Etiketsiz Ethernet çerçevesi FCS dahil 518 bayt. IP toplam uzunluğu 500 bayt. IPv4 ve TCP başlığının her biri 20 bayt. Uygulama verisini ve çerçeve içindeki payını bul.',
        'An untagged Ethernet frame is 518 bytes including its FCS. The IP total length is 500 bytes. The IPv4 and TCP headers are each 20 bytes. Find the application data and its fraction of the frame.'),
      trap: T('IP toplam uzunluğu IP başlığını içerir.', 'The IP total length includes the IP header.'),
      steps: [
        step('Çerçeve yükünü bul', 'Find the frame payload', n(518) + minus + n(14) + minus + n(4) + eq + n(500), 'Bu örnekte Ethernet yükü IP uzunluğuna eşit. Dolgu yok.', 'The Ethernet payload equals the IP length here, so there is no padding.'),
        step('İç başlıkları çıkar', 'Remove the inner headers', n(500) + minus + n(20) + minus + n(20) + eq + n(460), 'TCP birimi 480 bayt, uygulama verisi 460 bayt.', 'The TCP unit has 480 bytes, leaving 460 bytes for the application.'),
        step('Payı ve toplamı sağla', 'Check the fraction and total', fraction, '460 / 518 ≈ %88,8. 460 + 20 + 20 + 14 + 4 = 518 bayt.', '460 / 518 ≈ 88.8%. Adding 460 + 20 + 20 + 14 + 4 returns 518 bytes.'),
        scoring('Ethernet yükü ve dolgu 1, iç başlıklar ve veri 2, oran ve sağlama 2.', 'Ethernet payload and padding 1, inner headers and data 2, fraction and check 2.')
      ]
    }
  ]
};
