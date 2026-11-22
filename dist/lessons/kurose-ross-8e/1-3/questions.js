import {T} from '../../../study/math.js';

function question(tag, title, text, hints, solution, input) {
  return {tag, title, text, hints, feedback: solution, solutionSummary: solution, ...input};
}

const choice = (choices, answer) => ({choices, answer});
const number = (unit, answer, tolerance = 0.001) => ({unit, answer, tolerance});
const packet = T('Paket', 'Packets');
const circuit = T('Devre', 'Circuits');
const networks = T('Ağların ağı', 'Network of networks');
const packetUnit = T('paket', 'packets');

export const networkCoreQuestions = [
  question(packet, T('Hedef D hangi çıkışı kullanır?', 'Which output does destination D use?'),
    T('Yönlendiricinin tablosunda C → 1, D → 3 var. D hedefli bir paket 2. arayüzden geliyor. Hangi çıkış kullanılır?',
      'The forwarding table contains C → 1 and D → 3. A packet for D arrives on interface 2. Which output is used?'),
    T(['Paketin hedefini bul.', 'D satırını oku.'], ['Find the destination.', 'Read the row for D.']),
    T('Çıkış 3. Giriş arayüzü 2 olsa da iletim kararı D kaydına dayanır.', 'Output 3. The decision comes from the entry for D even though the packet arrived on interface 2.'),
    choice(T(['3. çıkış', '2. çıkış', '1. çıkış'], ['Output 3', 'Output 2', 'Output 1']), 0)),

  question(packet, T('Yol değişince hangi işlem yapılır?', 'What happens when a path changes?'),
    T('Bir bağlantı kesiliyor. Ağ önce yeni yolu hesaplıyor, ardından bir yönlendirici güncellenen tablodan tek paket için çıkış seçiyor. İşlemleri sırala.',
      'A link fails. The network computes a new path. A router then uses the updated table to choose an output for one packet. Name the operations in order.'),
    T(['Yolu hesaplayan işlemi ayır.', 'Tabloya bakmak yerel bir karardır.'], ['Identify the path computation.', 'A table lookup is a local decision.']),
    T('Önce yönlendirme yeni yolu bulur, ardından iletim tek paketin çıkışını seçer.', 'Routing determines the new path first, then forwarding chooses the output for one packet.'),
    choice(T(['İletim, iletim', 'Yönlendirme, iletim', 'İletim, yönlendirme'], ['Forwarding, forwarding', 'Routing, forwarding', 'Forwarding, routing']), 1)),

  question(packet, T('Son bitin varış anı', 'Arrival time of the last bit'),
    T('1.200 baytlık paket, store-and-forward ile iki adet 4,8 Mbit/sn bağlantıdan geçiyor. Diğer gecikmeler sıfır. Son bit kaç ms’de varır?',
      'A 1,200-byte packet crosses two 4.8 Mbit/s links using store and forward. Ignore other delays. When does the final bit arrive, in ms?'),
    T(['Baytları sekizle çarp.', 'Her bağlantının iletim süresini topla.'], ['Multiply bytes by eight.', 'Add the transmission times of both links.']),
    T('9.600 bit / 4.800.000 bit/sn = 2 ms. İkinci hat 2 ms’de başlar, son bit 4 ms’de varır.', '9,600 bits / 4,800,000 bits/s = 2 ms. The second link starts at 2 ms and the last bit arrives at 4 ms.'),
    number(T('ms', 'ms'), 4)),

  question(packet, T('İkinci çerçevedeki kuyruk', 'Queue in frame two'),
    T('Kapasite çerçeve başına 3 paket. Başlangıç kuyruğu boş. İlk çerçevede 5, ikinci çerçevede 4 paket geliyor. İkinci çerçeve sonunda kuyruk kaç paket?',
      'Capacity is 3 packets per frame. Start with an empty queue. Five packets arrive in frame one and four in frame two. How many are queued after frame two?'),
    T(['İlk çerçevenin sonunda 2 paket kalır.', 'İkinci çerçevede hazır paketlerden 3 çıkar.'], ['Two packets remain after frame one.', 'Subtract three from the packets ready in frame two.']),
    T('İlk çerçeve 5 − 3 = 2 bırakır. İkincide 2 + 4 − 3 = 3 paket kuyruktadır.', 'Frame one leaves 5 − 3 = 2. Frame two leaves 2 + 4 − 3 = 3 queued packets.'),
    number(packetUnit, 3)),

  question(packet, T('İlk kayıp', 'First drop'),
    T('Kuyrukta 4 paket var, 6 paket daha geliyor. En çok 3 paket iletime seçiliyor ve kalanlar için 5 paketlik tampon var. Kaç paket düşer?',
      'Four packets are queued and six arrive. Up to three are selected for transmission, and the buffer holds five of the remainder. How many are dropped?'),
    T(['İletime aday toplam paket sayısı 10.', 'Önce hizmeti, sonra bekleme kapasitesini çıkar.'], ['Ten packets are eligible for service.', 'Subtract service first, then the waiting capacity.']),
    T('10 − 3 = 7 paket hizmet sonrasında kalır. Beşi bekler, ikisi düşer.', 'After selecting three to send, seven remain. Five wait and two are dropped.'),
    number(packetUnit, 2)),

  question(packet, T('Ortalama düşük, kuyruk var', 'Low average, positive queue'),
    T('Altı çerçevedeki gelişler 0, 0, 12, 0, 0, 0 paket. Hat çerçeve başına 4 paket taşıyor. Boş başlayan kuyruğun en yüksek değeri kaç pakettir?',
      'Arrivals in six frames are 0, 0, 12, 0, 0, 0. The link serves four packets per frame. Starting empty, what is the peak queue?'),
    T(['Ortalama yerine her çerçeveyi ayrı incele.', 'En büyük geliş üçüncü çerçevede.'], ['Inspect each frame separately.', 'The largest arrival count is in frame three.']),
    T('Üçüncü çerçevede 12 − 4 = 8 paket kalır. Sonraki çerçevelerde kuyruk boşalır. Ortalama 12/6 = 2 paket/çerçevedir.', 'Frame three leaves 12 − 4 = 8 packets. The queue drains in subsequent frames. The average is 12/6 = 2 packets per frame.'),
    number(packetUnit, 8)),

  question(circuit, T('TDM devresinin hızı', 'Rate of a TDM circuit'),
    T('Saniyede 2.500 çerçeve, devre başına her çerçevede bir adet 40 bitlik yuva var. Devre hızı kaç kbit/sn?',
      'There are 2,500 frames per second and one 40-bit slot per frame per circuit. What is the circuit rate in kbit/s?'),
    T(['Devre başına her çerçevede 40 bit gider.', 'Bit/sn sonucunu 1.000’e böl.'], ['Each circuit sends 40 bits per frame.', 'Divide the bits/s result by 1,000.']),
    T('2.500 × 40 = 100.000 bit/sn, yani 100 kbit/sn.', '2,500 × 40 = 100,000 bits/s, or 100 kbit/s.'),
    number(T('kbit/sn', 'kbit/s'), 100)),

  question(circuit, T('Yolda kaç devre açılabilir?', 'How many circuits can the path admit?'),
    T('Bir yolun iki bağlantısında sırasıyla 4 ve 2 boş devre var. Her yeni bağlantı uçtan uca birer devre ayırıyor. En çok kaç yeni bağlantı açılır?',
      'Two links on a path have four and two unreserved circuits, respectively. Each new connection reserves one circuit on every link. How many new connections can be set up?'),
    T(['Her yol halkasında ayrı kaynak ayır.', 'Boş kapasitesi küçük olan hattı bul.'], ['Reserve one resource on each link.', 'Find the link with less spare capacity.']),
    T('İki uçtan uca bağlantı. İkinciden sonra dar bağlantıdaki iki devre de kullanımdadır.', 'Two end-to-end connections. Both available circuits on the tighter link are then in use.'),
    number(T('bağlantı', 'connections'), 2)),

  question(circuit, T('FDM ve TDM’yi ayırt et', 'Distinguish FDM and TDM'),
    T('Dört devrenin her birinin her çerçevede aynı sıra numaralı yuvayı aldığı sistem hangi yöntemi kullanır?',
      'In a four-circuit system, each circuit gets the same slot number in every frame. Which method does it use?'),
    T(['Paylaşımın boyutuna bak.', 'Yuvalar zaman içinde sırayla geliyor.'], ['Look at the dimension being shared.', 'The slots occur in sequence over time.']),
    T('TDM. Zaman yuvaları sırayla tekrar eder. FDM ise ayrı frekans bantları ayırır.', 'TDM. The time slots recur in sequence. FDM allocates separate frequency bands.'),
    choice(T(['FDM', 'Talebe göre paket paylaşımı', 'TDM'], ['FDM', 'On-demand packet sharing', 'TDM']), 2)),

  question(networks, T('IXP’de bir rota görünüyor mu?', 'Is a route available at the exchange?'),
    T('İki ISP aynı IXP’de. Aralarında peering oturumu ya da ortak rota sunucusu üzerinden rota paylaşımı kurulmamış. IXP üyeliğinden hangi sonuç çıkar?',
      'Two ISPs are at the same exchange. They have no peering session or route sharing via a route server. What follows from IXP membership alone?'),
    T(['IXP ortak altyapıdır.', 'Bir rota öğrenmek için ağ politikası uyarınca rota değişimi gerekir.'], ['An exchange is shared infrastructure.', 'Learning a route requires a route exchange under the networks’ policies.']),
    T('Ağın ortak altyapıda olması, bu çiftin birbirinin rotasını öğrendiğini göstermez.', 'Sharing exchange infrastructure does not establish that this pair has learned each other’s routes.'),
    choice(T(['İkisi birbirinin bütün rotalarını bilir.', 'İkisi için doğrudan rota garantisi yoktur.', 'IXP her iki ISP’ye de küresel transit verir.'],
      ['They learn all of each other’s routes.', 'A direct route between the pair is not guaranteed.', 'The exchange gives both ISPs global transit.']), 1)),

  question(networks, T('Uzak bir hedef için çıkış', 'Exit for a distant destination'),
    T('A, B ile yalnız B adresleri için peering yapıyor. B dışında kalan bir hedefe C üzerinden transit rotası var. A’nın o hedef için çıkışı hangisi?',
      'A peers with B for B’s addresses only. A has a transit route via C for a destination outside B. Which exit should A use?'),
    T(['Önce adresin B’ye ait olup olmadığını kontrol et.', 'A’nın bu hedef için öğrendiği rotayı seç.'], ['First check whether the address belongs to B.', 'Choose the route A learned for this destination.']),
    T('C üzerinden transit. Verilen peering kapsamı hedef adresi içermiyor.', 'Transit via C. The peering scope does not include the destination address.'),
    choice(T(['C üzerinden transit', 'B ile peering', 'Her iki çıkış kesinlikle eşdeğer'], ['Transit via C', 'Peering with B', 'Both exits are necessarily equivalent']), 0)),

  question(networks, T('Yedek bağlantı ne zaman işe yarar?', 'When does backup connectivity help?'),
    T('A iki transit sağlayıcıya bağlı. Birincil bağlantı kesiliyor. İkinci bağlantının aynı hedef için kullanılabilmesi hangi koşula bağlı?',
      'A connects to two transit providers. The primary link fails. What condition lets A use the other link for the same destination?'),
    T(['İkinci hattın çalışır durumda olduğunu varsay.', 'O hedef için hâlâ kullanılabilir bir rota ara.'], ['Assume the second link is up.', 'Look for a route to the same destination.']),
    T('İkinci sağlayıcı üzerinden hedefe geçerli ve kabul edilen bir rota olmalı. Yedek kablo tek başına yeterli bilgi vermez.', 'A valid, accepted route via the second provider must exist for that destination. A backup link alone gives no information about the route.'),
    choice(T(['İkinci sağlayıcı aynı IXP’de olmalı.', 'İki hat aynı hızda olmalı.', 'İkinci sağlayıcı üzerinden geçerli bir rota olmalı.'],
      ['The second provider must be at the same exchange.', 'Both links must run at the same rate.', 'There must be a valid route through the second provider.']), 2))
];
