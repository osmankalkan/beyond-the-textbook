import {T, step, v, n, o, f, sub, eq, plus} from '../../../study/math.js';
import {explain, score, prediction, path, worked} from '../chapter-one-study.js';

const L = v('L'), R1 = sub(v('R'), n(1)), R2 = sub(v('R'), n(2));
export const bits = L + eq + n(8) + o('·') + v('F');
export const first = sub(v('T'),n(1)) + eq + f(L,R1) + plus + f(L,R2) + plus + sub(v('T'), v('p'));

export const study = {
  title: T('Uçtan uca düşün, katman katman doğrula', 'Reason end to end, then verify by layer'),
  intro: T('Gönderilen veri birimini belirle. Ardından gecikme, hız ve güvenliği ölçülebilir sorulara ayır.', 'Identify the data unit, then split delay, rate, and security into measurable questions.'),
  predictions: [
    prediction('access-upgrade', T('Erişim 10’dan 20 Mbit/sn’ye çıkıyor, omurga 2 Mbit/sn kalıyor. İdeal sürekli hız nedir?', 'Access rises from 10 to 20 Mbit/s and the backbone stays at 2 Mbit/s. What is the ideal sustained rate?'),
      T(['20 Mbit/sn', '10 Mbit/sn', '2 Mbit/sn'], ['20 Mbit/s', '10 Mbit/s', '2 Mbit/s']), 2,
      T('Zincir boyunca en yavaş hat sürekli aktarımı sınırlar.', 'The slowest link limits sustained transfer.')),
    prediction('nearby', T('Hızlar ve çerçeve boyu sabitken sunucu yakına taşınıyor. Doğrudan hangi süre azalır?', 'With rates and frame size fixed, the server moves closer. Which time changes directly?'),
      T(['Yayılma', 'Hatta yazma', 'Aynı patlamadaki kuyruk beklemesi'], ['Propagation', 'Transmission', 'Queue wait in the same burst']), 0,
      T('Mesafe azalınca d/v küçülür. L/R ve bu örnekteki geliş aralıkları korunur.', 'Shorter distance lowers d/v. L/R and the arrival spacing in this example stay the same.'))
  ],
  paths: [
    path(T('Mesajdan ilk çerçeve varışına', 'From application message to first frame arrival'),
      T('Labda başlangıç yolunu ve 1.000 bayt veriyi seç.', 'Use the baseline path and 1,000 data bytes in the lab.'), [
        explain('Kapsülü say', 'Count the envelope', '1.000 veri + 20 TCP + 20 IPv4 + 18 Ethernet = 1.058 bayt.', '1,000 data + 20 TCP + 20 IPv4 + 18 Ethernet = 1,058 bytes.'),
        step('Bit sayısını belirle', 'Find the bit count', bits, 'Her bayt sekiz bit, toplam 8.464 bit.', 'Eight bits per byte gives 8,464 bits.'),
        explain('İki iletim süresini bul', 'Find both transmission times', '10 Mbit/sn hatta 0,8464 ms, 2 Mbit/sn hatta 4,232 ms.', 'The 10 Mbit/s link takes 0.8464 ms and the 2 Mbit/s link takes 4.232 ms.'),
        explain('Yayılmayı hesapla', 'Compute propagation', '2 km için 0,01 ms ve 400 km için 2 ms. Toplam 2,01 ms.', 'Two km takes 0.01 ms and 400 km takes 2 ms, for a total of 2.01 ms.'),
        step('Topla ve kontrol et', 'Sum and verify', first, 'İlk varış 7,0884 ms. Lab iki ondalığa yuvarlar.', 'The first arrival is at 7.0884 ms. The lab rounds to two decimals.')
      ], T('Aynı mesaj UDP ile taşınırsa başlık boyları ve gecikme nasıl değişir?', 'If UDP carries the same message, how do the header sizes and delay change?')),
    path(T('Darboğaz iyileştirmesini seç', 'Choose a bottleneck improvement'),
      T('Aynı üç çerçeve için üç lab seçimini karşılaştır.', 'Compare three lab changes for the same three frames.'), [
        explain('Darboğazı bul', 'Identify the bottleneck', 'Başlangıçta 2 Mbit/sn omurga. Ardışık çerçeveler omurgada sıraya girer.', 'The baseline bottleneck is the 2 Mbit/s backbone. Consecutive frames queue there.'),
        explain('Erişimi hızlandır', 'Speed up access', 'İlk çerçeve erken gelir, omurga çıkış aralığı aynı kalır. Omurga beklemesi artabilir.', 'The first frame arrives sooner. Backbone spacing stays the same, while queueing there can increase.'),
        explain('Omurgayı hızlandır', 'Speed up the backbone', 'İki hız 10 Mbit/sn olur. Patlama bu modelde omurgada kuyruk oluşturmaz.', 'Both rates become 10 Mbit/s. The burst no longer queues in the model.'),
        explain('Mesafeyi düşür', 'Reduce the distance', '400 km yerine 40 km, yayılmada 1,8 ms kazandırır. Sürekli hız korunur.', 'Moving from 400 km to 40 km saves 1.8 ms in propagation. The sustained rate stays the same.'),
        explain('Doğru metriği seç', 'Choose the right metric', 'İlk varış ile son varışı ayır. Hız değişimini ayrıca Mbit/sn olarak doğrula.', 'Separate first and final arrival. Check the sustained rate separately in Mbit/s.')
      ], T('Hedef yalnız ilk çerçeveyi erken almaksa, iyileştirmeleri hangi metrikle karşılaştırırsın?', 'If the only goal is an earlier first arrival, which metric should you compare across the upgrades?'))
  ]
};

export const clinic = {
  examBlueprint: [
    {step:T('Birimleri yaz', 'Write the units'), detail:T('Uygulama baytı, çerçeve biti, Mbit/sn ve ms değerlerini ayır.', 'Keep application bytes, frame bits, Mbit/s, and ms separate.')},
    {step:T('Sonucu yorumla', 'Interpret the outcome'), detail:T('İlk çerçeve, kuyruk, sürekli hız ve güvenlik için ayrı kanıt kullan.', 'Use separate evidence for first arrival, queueing, sustained rate, and security.')}
  ],
  examClinic: [
    worked(6, T('İlk çerçevenin süresi', 'Time for the first frame'),
      T('442 bayt veri, toplam 58 bayt başlık/son ek, 4 ve 2 Mbit/sn iki hat. Yayılma toplam 3 ms, işleme ve bekleme yok. İlk çerçevenin varışını bul.', 'A 442-byte message has 58 bytes of overhead. Two links run at 4 and 2 Mbit/s. Total propagation is 3 ms with no processing or queueing. Find first arrival.'),
      T('İletim hesabına başlıklar da girer.', 'Include overhead in the transmitted bit count.'), [
        step('Boyutu hazırla', 'Compute the size', bits, '442 + 58 = 500 bayt. Toplam 4.000 bit.', '442 + 58 = 500 bytes, or 4,000 bits.'),
        step('İki iletimi hesapla', 'Compute both transmissions', first, '4.000 bit ilk hatta 1 ms, ikinci hatta 2 ms sürer.', '4,000 bits take 1 ms on the first link and 2 ms on the second.'),
        explain('Topla ve sağla', 'Sum and check', '1 + 2 + 3 = 6 ms. Yayılma ihmal edilirse sonuç 3 ms olur.', '1 + 2 + 3 = 6 ms. With propagation ignored it would be 3 ms.'),
        score('Boyut 2, iletimler 2, toplam ve sağlama 2.', 'Size 2, transmissions 2, total and check 2.')
      ]),
    worked(6, T('Patlamanın sonu ne zaman?', 'When does the burst finish?'),
      T('Dört eş çerçeve ardışık gönderiliyor. İlki 6 ms’de varıyor. Darboğaz her çerçeveyi 2 ms’de çıkarıyor ve kuyruk boşalmıyor. Son varışı bul.', 'Four equal frames are sent back to back. The first arrives at 6 ms. The bottleneck serves one every 2 ms and stays busy. Find the final arrival.'),
      T('İlk varışa dört değil üç aralık eklenir.', 'There are three gaps after the first arrival.'), [
        explain('Başlangıcı sabitle', 'Anchor the first arrival', 'Birinci çerçeve 6 ms’de alıcıda.', 'The first frame is at the receiver at 6 ms.'),
        explain('Aralıkları say', 'Count the gaps', 'İkinci 8, üçüncü 10 ve dördüncü 12 ms’de varır.', 'The second, third, and fourth arrive at 8, 10, and 12 ms.'),
        explain('Hızı kontrol et', 'Check the rate', 'Çerçeve 4.000 bit olsaydı 4.000 / 0,002 = 2 Mbit/sn omurga çıkış hızı olurdu.', 'For a 4,000-bit frame, 4,000 / 0.002 = 2 Mbit/s at the bottleneck.'),
        score('Başlangıç 1, üç aralık ve sonuç 3, hız kontrolü 2.', 'Initial arrival 1, gaps and result 3, rate check 2.')
      ]),
    worked(5, T('Hız tek başına hangi bulguyu çözmez?', 'Which finding calls for something other than speed?'),
      T('İlk ölçümde omurga doygun. İkinci denetimde uygulama mesajı okunabiliyor. Her bulguya bir iyileştirme ve kontrol yaz.', 'The first measurement shows a saturated backbone. A separate audit shows readable application content. Give an improvement and check for each finding.'),
      T('Gizliliği gecikme ölçerek doğrulama.', 'Delay does not measure confidentiality.'), [
        explain('Performansı ele al', 'Address performance', 'Omurga kapasitesi veya talep yönetimi değerlendirilebilir. En uzun kuyruk ve tamamlanan işleri ölç.', 'Consider backbone capacity or demand management. Measure the longest queue and completed work.'),
        explain('Gizliliği ele al', 'Address confidentiality', 'Doğrulanmış şifreli kanal kullan. Yetkili denetimde ağ yolundaki içerik okunamaz olmalı.', 'Use an authenticated encrypted channel. An authorized audit should find content unreadable in transit.'),
        explain('Ölçümleri karşılaştır', 'Separate the measurements', 'Hız ve okunabilirlik farklı değişkenler. İkisini de ayrı doğrula.', 'Rate and readability are different variables. Verify them separately.'),
        score('Performans 2, gizlilik 2, ölçüm farkı 1.', 'Performance 2, confidentiality 2, measurement distinction 1.')
      ]),
    worked(5, T('Uygulamadan omurgaya katmanları tanı', 'Identify layers from application to backbone'),
      T('Bir öğrenci Web belgesi açıyor. İstek farklı sağlayıcıların ağlarından geçiyor. HTTP, IP ve peering’in görevini açıkla ve bir tarihsel dayanak ekle.', 'A student opens a Web document. The request crosses providers. Explain HTTP, IP, and peering, and add one historical anchor.'),
      T('Peering uygulama protokolü değildir.', 'Peering describes a relationship between networks.'), [
        explain('Uygulamayı yaz', 'Identify the application', 'HTTP belge isteği ve yanıtın kurallarını tanımlar.', 'HTTP defines rules for the document request and response.'),
        explain('Ağ ve ilişkiyi yaz', 'Identify the network and relationship', 'IP datagramı ağlar arasında ilerletir. Peering, anlaşma kapsamındaki trafiğin doğrudan değişimini sağlar.', 'IP carries datagrams across networks. Peering permits direct exchange of traffic covered by an agreement.'),
        explain('Tarihle doğrula', 'Check against history', 'ARPANET 1983’te TCP/IP’ye geçti. Web daha sonra, 1989–1991’de CERN’de geliştirildi.', 'ARPANET transitioned to TCP/IP in 1983. The Web was developed later at CERN in 1989–1991.'),
        score('HTTP 1, IP 1, peering 1, tarih ve yorum 2.', 'HTTP 1, IP 1, peering 1, dates and interpretation 2.')
      ])
  ]
};
