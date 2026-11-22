import {T} from '../../../study/math.js';

const service = T('Hizmet', 'Service');
const stack = T('Katmanlar', 'Layers');
const capsule = T('Kapsülleme', 'Encapsulation');
const route = T('Bağlantılar', 'Links');
const bytes = T('bayt', 'bytes');

function question(tag, title, text, hints, solution, input) {
  return {tag, title, text, hints, feedback: solution, solutionSummary: solution, ...input};
}

const choice = (choices, answer) => ({choices, answer});
const numeric = (unit, answer, tolerance = 0.001) => ({unit, answer, tolerance});

export const protocolLayersQuestions = [
  question(service, T('Hizmet mi, protokol mü?', 'Service or protocol?'),
    T('Uygulama, taşıma katmanından sıralı bir bayt akışı istiyor. Bu, uygulama açısından neyi tanımlar?',
      'An application asks the transport layer for an ordered byte stream. What does this describe from the application’s perspective?'),
    T(['İlişki aynı makinedeki iki katman arasında.', 'Uygulamanın alt katmandan ne aldığına bak.'],
      ['The relationship is between two layers on the same host.', 'Look at what the application gets from the layer below.']),
    T('Sıralı bayt akışı, taşıma katmanının uygulamaya sunduğu hizmettir.', 'The ordered byte stream is a service that transport provides to the application.'),
    choice(T(['Taşıma hizmeti', 'İki TCP eşi arasındaki protokol', 'Fiziksel sinyal'],
      ['Transport service', 'Protocol between TCP peers', 'Physical signal']), 0)),

  question(service, T('Yerel tekrarın sınırı', 'Scope of a local retry'),
    T('Wi‑Fi bağlantısı bir çerçeveyi başarıyla yeniden gönderdi. IP datagramı sonraki bir bağlantıda kaybolursa hangi mekanizma uçtan uca yeniden iletim yapabilir?',
      'A Wi-Fi link successfully retries a frame. If the IP datagram is lost on a later link, which mechanism can retransmit end to end?'),
    T(['İlk kablosuz bağlantının eşleri uzaktaki kaybı gözlemlemez.', 'Uygulama TCP kullanıyorsa uçlardaki taşıma katmanlarını düşün.'],
      ['Peers on the first wireless link do not observe the later loss.', 'If the application uses TCP, consider the transport layers at the endpoints.']),
    T('Uçlardaki TCP teslimi izleyebilir ve eksik veriyi yeniden gönderebilir. Wi‑Fi tekrarı yereldir.',
      'The TCP endpoints can track delivery and retransmit missing data. The Wi-Fi retry is local.'),
    choice(T(['İlk Wi‑Fi bağlantısı', 'Göndericideki TCP', 'Fiziksel katman'],
      ['The first Wi-Fi link', 'TCP at the sender', 'The physical layer']), 1)),

  question(stack, T('OSI’de ayrı iki katman', 'Two separate OSI layers'),
    T('İnternet’in beş katmanı ile OSI’nin yedi katmanı karşılaştırıldığında hangi iki işlev grubu OSI’de kendi katman adlarına sahiptir?',
      'Compared with the five Internet layers, which two sets of functions have distinct layer names in the seven-layer OSI model?'),
    T(['Taşımanın yukarısına bak.', 'Biri etkileşimi düzenler, diğeri veri gösterimiyle ilgilenir.'],
      ['Look above transport.', 'One organizes interactions and the other handles data representation.']),
    T('OSI, oturum ve sunumu ayrı katmanlar olarak adlandırır.', 'OSI names session and presentation as separate layers.'),
    choice(T(['Ağ ve fiziksel', 'Fiziksel ve oturum', 'Oturum ve sunum'],
      ['Network and physical', 'Physical and session', 'Session and presentation']), 2)),

  question(stack, T('Port mu, IP adresi mi?', 'Port or IP address?'),
    T('Alıcı IP yükünün uygulama uçlarından hangisine ait olduğunu ayırt edecek. TCP veya UDP bu iş için hangi alanı kullanır?',
      'The receiver needs to identify the application endpoint for an IP payload. Which field does TCP or UDP use?'),
    T(['IP adresi tek bir uygulamayı seçmez.', 'Taşıma başlığında hedef uç için kullanılan numarayı bul.'],
      ['An IP address does not select a single application.', 'Find the number used for the receiving endpoint in the transport header.']),
    T('Hedef port, taşıma katmanının uygulama uç noktasını belirlemesine yardım eder.', 'The destination port helps transport identify the receiving application endpoint.'),
    choice(T(['Ethernet FCS', 'Hedef port', 'IPv4 TTL'], ['Ethernet FCS', 'Destination port', 'IPv4 TTL']), 1)),

  question(capsule, T('UDP datagramının boyu', 'Size of the UDP datagram'),
    T('300 bayt uygulama verisi 8 baytlık UDP başlığı alıyor. UDP datagramı kaç bayt?',
      'A 300-byte message receives an eight-byte UDP header. How long is the UDP datagram?'),
    T(['Şu an taşıma katmanındasın.', 'Yalnız UDP başlığını ekle.'], ['This step is at the transport layer.', 'Add only the UDP header.']),
    T('300 + 8 = 308 bayt. IP başlığı bir alt katmanda eklenir.', '300 + 8 = 308 bytes. The IP header goes on at the next layer down.'),
    numeric(bytes, 308)),

  question(capsule, T('IPv4 toplam uzunluğu', 'IPv4 total length'),
    T('800 bayt veri, 20 bayt TCP ve 20 bayt IPv4 başlığı var. IP datagramı kaç bayt?',
      'There are 800 data bytes, a 20-byte TCP header, and a 20-byte IPv4 header. How long is the IP datagram?'),
    T(['Taşıma birimini ilk ara sonuç olarak hesapla.', 'IPv4 başlığı da IP toplam uzunluğuna dahildir.'],
      ['First calculate the transport unit.', 'The IPv4 header is part of the IP total length.']),
    T('TCP segmenti 820 bayt, IPv4 datagramı 820 + 20 = 840 bayt.', 'The TCP segment is 820 bytes and the IPv4 datagram is 820 + 20 = 840 bytes.'),
    numeric(bytes, 840)),

  question(capsule, T('Eksik yükü tamamla', 'Pad the short payload'),
    T('9 bayt veri UDP (8 bayt) ve IPv4 (20 bayt) ile kapsülleniyor. Ethernet yükü 46 bayta ulaşmak için kaç dolgu baytı ister?',
      'Nine data bytes are wrapped in UDP (8 bytes) and IPv4 (20 bytes). How many padding bytes does Ethernet need to reach its 46-byte payload minimum?'),
    T(['IP datagramı 37 bayttır.', '46’dan 37’yi çıkar.'], ['The IP datagram is 37 bytes.', 'Subtract 37 from 46.']),
    T('46 − (9 + 8 + 20) = 9 bayt dolgu. Dolgu IP uzunluğunu büyütmez.', '46 − (9 + 8 + 20) = 9 padding bytes. Padding does not increase IP length.'),
    numeric(bytes, 9)),

  question(capsule, T('Dolgusuz ilk UDP mesajı', 'Smallest unpadded UDP message'),
    T('UDP başlığı 8, IPv4 başlığı 20 bayt. En küçük Ethernet yükü 46 baytsa dolgu gerektirmeyen en küçük uygulama mesajı kaç bayt?',
      'UDP and IPv4 headers are eight and 20 bytes. With a 46-byte Ethernet payload minimum, what is the smallest application message that needs no padding?'),
    T(['Sınırda IP datagramı tam 46 bayttır.', '46’dan iki iç başlığı çıkar.'], ['At the boundary the IP datagram is exactly 46 bytes.', 'Subtract both inner headers from 46.']),
    T('46 − 8 − 20 = 18 bayt. 17 baytlık mesaj hâlâ bir bayt dolgu ister.', '46 − 8 − 20 = 18 bytes. A 17-byte message still needs one padding byte.'),
    numeric(bytes, 18)),

  question(capsule, T('FCS dahil çerçeve boyu', 'Full frame length including FCS'),
    T('IP datagramı 80 bayt. Etiketsiz Ethernet başlığı 14, FCS 4 bayt. Çerçeve toplamı kaç bayt?',
      'The IP datagram has 80 bytes. The untagged Ethernet header has 14 bytes and the FCS has four. How long is the frame?'),
    T(['80 bayt alt sınırı geçtiği için dolgu yok.', 'Hem başlığı hem son eki ekle.'],
      ['Eighty bytes already exceeds the payload minimum.', 'Include both header and trailer.']),
    T('14 + 80 + 4 = 98 bayt.', '14 + 80 + 4 = 98 bytes.'),
    numeric(bytes, 98)),

  question(route, T('Anahtarlar sayacı azaltır mı?', 'Do switches decrement the counter?'),
    T('Başlangıç TTL değeri 64. Yol boyunca iki Ethernet anahtarı ve üç IP yönlendiricisi var. Her yönlendirici TTL’yi bir azaltıyor. Alıcıdaki değer kaç?',
      'Initial TTL is 64. The path crosses two Ethernet switches and three IP routers. Each router decrements TTL by one. What value reaches the receiver?'),
    T(['Ethernet anahtarları IP başlığını işlemez.', 'Yalnız yönlendiricileri say.'],
      ['Ethernet switches do not process the IP header.', 'Count just the routers.']),
    T('64 − 3 = 61. İki anahtar TTL’yi değiştirmez.', '64 − 3 = 61. The two switches do not change TTL.'),
    numeric('TTL', 61)),

  question(route, T('İlk Ethernet hedefi', 'First Ethernet destination'),
    T('A, başka ağdaki B’ye R üzerinden IP datagramı gönderiyor. İlk Ethernet çerçevesinin hedef MAC adresi hangi arayüze ait?',
      'A sends an IP datagram via R to B on another network. Which interface owns the destination MAC in the first Ethernet frame?'),
    T(['İlk bağlantıdan doğrudan erişilebilen komşuyu seç.', 'R’nin A’ya bakan tarafını düşün.'],
      ['Choose the neighbor reachable over the first link.', 'Think of the side of R facing A.']),
    T('İlk hedef MAC, R’nin A’ya bakan giriş arayüzüdür. IP hedefi B olarak kalır.',
      'The first destination MAC belongs to the ingress interface of R facing A. B is still the IP destination.'),
    choice(T(['B’nin arayüzü', 'R’nin B’ye bakan çıkışı', 'R’nin A’ya bakan girişi'],
      ['B’s interface', 'The egress of R facing B', 'The ingress of R facing A']), 2)),

  question(capsule, T('Alıcıda tersine hesap', 'Reverse the calculation at the receiver'),
    T('Alıcı 64 baytlık etiketsiz Ethernet çerçevesinden IP toplam uzunluğunu 36 bayt okuyor. IP başlığı 20 ve UDP başlığı 8 bayt. Uygulamaya kaç bayt gider?',
      'The receiver reads an IP total length of 36 bytes inside a 64-byte untagged Ethernet frame. The IP and UDP headers are 20 and eight bytes. How many bytes reach the application?'),
    T(['Hesaba IP toplam uzunluğundan başla. Ethernet dolgusu dışarıda kalır.', 'Önce 20, sonra 8 bayt çıkar.'],
      ['Start with IP total length. Ethernet padding is outside it.', 'Subtract 20 bytes, then eight more.']),
    T('36 − 20 − 8 = 8 bayt. Ethernet yükünün kalan 46 − 36 = 10 baytı dolgudur.',
      '36 − 20 − 8 = 8 bytes. The remaining 46 − 36 = 10 Ethernet payload bytes are padding.'),
    numeric(bytes, 8))
];
