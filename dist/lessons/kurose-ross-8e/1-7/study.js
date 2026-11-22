import {T, step, v, n, eq, minus, sub} from '../../../study/math.js';
import {explain, score, prediction, path, worked} from '../chapter-one-study.js';

export const yearGap = v('Δt') + eq + sub(v('t'), n(2)) + minus + sub(v('t'), n(1));
export const protocolGap = n(1983) + minus + n(1974) + eq + n(9);

export const study = {
  title: T('Tarihleri tasarım kararlarıyla ilişkilendir', 'Connect dates to design decisions'),
  intro: T('Olayları sırala, sonra her olayın hangi sorunu çözdüğünü açıkla.', 'Put the events in order, then explain the problem each addressed.'),
  predictions: [
    prediction('different-networks', T('Bir ağ içinde paket anahtarlama çalışıyor. Radyo ağıyla da iletişim için bir sonraki adım ne?', 'Packet switching works inside one network. What is needed to communicate with a radio network too?'),
      T(['Her ağda aynı fiziksel ortam', 'Ağlar arası ortak kurallar', 'Yalnız bir tarayıcı'], ['The same physical medium everywhere', 'Common internetworking rules', 'Just a browser']), 1,
      T('Ağlar kendi bağlantı teknolojisini koruyabilir. Ortak kurallar ağ sınırlarını aşmayı sağlar.', 'Networks can keep their own link technology. Shared rules carry communication across their boundaries.')),
    prediction('web-after-ip', T('Web’in geliştirildiği dönemde TCP/IP altyapısı hangi durumdaydı?', 'Where was TCP/IP when the Web was developed?'),
      T(['ARPANET 1983’te geçmişti', 'Henüz önerilmemişti', 'Web ile aynı anda ortaya çıktı'], ['ARPANET had transitioned in 1983', 'It had yet to be proposed', 'It appeared at the same time as the Web']), 0,
      T('TCP/IP geçişi, Web’in 1989–1991’deki gelişiminden önceydi.', 'The TCP/IP transition preceded development of the Web in 1989–1991.'))
  ],
  paths: [
    path(T('Bir ağdan birden çok ağa', 'From one network to several'),
      T('Labda farklı ağları birleştirme ihtiyacını seç.', 'Choose the need to join unlike networks in the lab.'),
      [
        explain('Uçların trafiğini gözle', 'Look at endpoint traffic', 'Patlamalı kaynaklar bir hattı sıradaki paketle paylaşabilir.', 'Bursty sources can share a link packet by packet.'),
        explain('Bir ağı tanı', 'Identify one network', '1969’daki ARPANET birkaç düğüm arasında erken bir paket ağı örneğiydi.', 'ARPANET in 1969 was an early packet network among a few nodes.'),
        explain('Sınırı değiştir', 'Change the boundary', 'Radyo ve kablolu ağların yerel teknolojileri farklı olabilir. Birini büyütmek onları birleştirmez.', 'Radio and wired networks can use different local technologies. Scaling one does not join the two.'),
        explain('Ortak kuralı seç', 'Choose common rules', '1974 yaklaşımı ağların kendi iç tasarımını sürdürmesine, ortak protokolle birleşmesine izin verdi.', 'The 1974 approach let networks keep their internal design and interoperate through common protocols.'),
        step('Öneriyle geçişi ayır', 'Distinguish proposal from adoption', protocolGap, '1983 ARPANET geçişi öneriden dokuz takvim yılı sonra. Labda iki olayı ayrı seç.', 'The 1983 ARPANET transition came nine calendar years later. Select the two events separately in the lab.')
      ], T('Ortak katman korunursa hangi ağ bileşenleri bağımsız değişebilir?', 'Which network components can change independently if the common layer stays the same?')),
    path(T('Web’i altyapı üzerine yerleştir', 'Place the Web on its infrastructure'),
      T('Labda tarayıcıyla bağlantılı belge açma ihtiyacını seç.', 'Choose the need to open linked documents in a browser.'),
      [
        explain('Önce protokol ailesini yerleştir', 'Place the protocol family first', '1983 geçişi ortak TCP/IP kullanımına örnektir.', 'The 1983 transition is an example of coordinated TCP/IP adoption.'),
        explain('Ad çözümlemeyi ayır', 'Separate naming', 'DNS insanın okuyabildiği adları dağıtık biçimde çözer.', 'DNS resolves human-readable names through a distributed system.'),
        explain('Uygulamayı yerleştir', 'Place the application', 'CERN’de Web, HTTP ve HTML ile belge erişimini 1989–1991’de geliştirdi.', 'The Web at CERN developed document access through HTTP and HTML in 1989–1991.'),
        explain('İşletme değişimini ayır', 'Separate the operational transition', '1995’te omurga trafiğini ticari sağlayıcıların taşıması belgelerin biçimini belirlemedi.', 'The shift to commercial backbones in 1995 did not determine the format of Web documents.'),
        explain('Modeli günümüze taşı', 'Apply the distinction to later developments', 'Mobil erişim uçları bağlar. Yakın içerik konumu ise hizmete giden yolu kısaltabilir.', 'Mobile access connects endpoints. Nearby content can shorten the path to a service.')
      ], T('E-posta örneği, İnternet ile Web arasındaki hangi farkı gösterir?', 'What difference between the Internet and Web does email illustrate?'))
  ]
};

export const clinic = {
  examBlueprint: [
    {step:T('Sınırı belirle', 'Identify the boundary'), detail:T('Tek ağ, ağlar arası iletişim ve uygulama katmanını ayır.', 'Distinguish a single network, internetworking, and the application layer.')},
    {step:T('Tarih veya dönemle sına', 'Check the date or period'), detail:T('Tasarım, koordineli geçiş ve yaygınlaşma ayrı olaylar olabilir.', 'Design, coordinated adoption, and broad uptake may be separate events.')}
  ],
  examClinic: [
    worked(5, T('ARPANET ile ALOHAnet neyi gösterir?', 'What do ARPANET and ALOHAnet illustrate?'),
      T('Erken bir kablolu paket ağı ile radyo paket ağını karşılaştır. Ortak internetworking ihtiyacını çıkar.', 'Compare an early wired packet network and a packet radio network. Explain why internetworking was needed.'),
      T('Aynı paylaşım ilkesi, aynı fiziksel ortamı gerektirmez.', 'Shared use of packets does not require the same medium.'), [
        explain('Benzerlik', 'Shared principle', 'İkisi de veri aktarımında paket kullanır.', 'Both use packets for data communication.'),
        explain('Fark', 'Difference', 'ARPANET paket anahtarlama, ALOHAnet radyo ortamını paylaşma örneği sunar.', 'ARPANET illustrates packet switching and ALOHAnet illustrates sharing a radio medium.'),
        explain('Sonuç', 'Consequence', 'Farklı yerel tasarımlar, ağ sınırları için ortak kural gerektirir. Bu kural yerel ortamı seçmek zorunda değildir.', 'Different local designs need a common rule at network boundaries. It need not dictate the local medium.'),
        score('Benzerlik 1, iki örnek 2, ortak kural 2.', 'Shared principle 1, two examples 2, common rule 2.')
      ]),
    worked(6, T('Öneri ve geçişi ayır', 'Separate proposal and transition'),
      T('1974 ve 1983 tarihlerini olaylarla eşleştir. Aradaki takvim yılı farkını ve farkın anlamını yaz.', 'Match 1974 and 1983 to their events. Find the calendar-year gap and explain it.'),
      T('Öneri yılı ağın geçiş yılı değildir.', 'A proposal and a transition are different events.'), [
        explain('1974’ü yerleştir', 'Place 1974', 'Cerf ve Kahn ağlar arası iletişim yaklaşımını sundu.', 'Cerf and Kahn presented an internetworking approach.'),
        explain('1983’ü yerleştir', 'Place 1983', 'ARPANET TCP/IP’ye koordineli biçimde geçti.', 'ARPANET coordinated its transition to TCP/IP.'),
        step('Farkı doğrula', 'Check the gap', protocolGap, 'Dokuz takvim yılı. Bu, tasarım ile işletim değişikliğini ayırır.', 'Nine calendar years, separating design from an operational change.'),
        score('İki olay 2, fark 2, yorum 2.', 'Two events 2, gap 2, interpretation 2.')
      ]),
    worked(6, T('İnternet, Web ve omurga', 'Internet, Web, and backbone'),
      T('TCP/IP geçişi, Web ve NSFNET omurgasının kapanışı olaylarını sırala. Bir tarayıcı isteğinde rolleri ayır.', 'Order the TCP/IP transition, development of the Web, and retirement of the NSFNET backbone. Separate the roles in a browser request.'),
      T('Bir uygulamanın tarihi altyapının başlangıcı değildir.', 'The date of an application does not date the underlying infrastructure.'), [
        explain('Sırala', 'Order the events', '1983 TCP/IP, 1989–1991 Web, 1995 NSFNET omurgasının kapanışı.', '1983 TCP/IP, 1989–1991 Web, 1995 NSFNET backbone retirement.'),
        explain('Rolleri ayır', 'Separate roles', 'HTTP belge isteğini taşır. TCP/IP iletişimi mümkün kılar. Omurga ağlar arasında trafik taşır.', 'HTTP handles the document request. TCP/IP enables communication. A backbone carries traffic between networks.'),
        explain('Önceki uygulamayla doğrula', 'Check against an earlier application', 'E-posta Web’den önce çalışıyordu. Aynı altyapı farklı uygulamaları taşıyabilir.', 'Email predates the Web. The same infrastructure can serve multiple applications.'),
        score('Sıra 2, roller 3, doğrulama 1.', 'Ordering 2, roles 3, verification 1.')
      ]),
    worked(5, T('Mobil erişim ve yakın içerik', 'Mobile access and nearby content'),
      T('Bir mobil kullanıcının daha hızlı şebekeye ve daha yakın sunucuya geçtiğini varsay. İki değişikliğin hangi sorunu hedeflediğini açıkla.', 'A mobile user moves to faster access and a closer server. Explain the distinct problem addressed by each change.'),
      T('Erişim hızı ile yol mesafesi ayrıdır.', 'Access rate and path length are separate quantities.'), [
        explain('İlk bağlantıyı tanımla', 'Identify the first link', 'Mobil şebeke ucu erişim ağına bağlar. Daha yüksek hız ilk hattaki iletim süresini azaltabilir.', 'Mobile access connects the endpoint. A faster link can lower first-link transmission time.'),
        explain('Sunucu konumunu tanımla', 'Identify the server placement', 'Yakın bir veri merkezi yolu kısaltarak yayılma süresini azaltabilir.', 'A nearby data center can shorten the path and lower propagation delay.'),
        explain('Ölçüm seç', 'Choose measurements', 'Hız ile gidiş-dönüş süresini ayrı gözle. Sonucun başka darboğazlara da bağlı olabileceğini belirt.', 'Measure rate and round-trip time separately. Other bottlenecks may still affect the outcome.'),
        score('İlk bağlantı 2, konum 2, doğrulama 1.', 'First link 2, placement 2, verification 1.')
      ])
  ]
};
