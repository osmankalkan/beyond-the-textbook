# §1.8 Ünite özeti: Bağlantıyı uçtan uca oku

> Kurose ve Ross, *Computer Networking: A Top-Down Approach*, 8. baskı, §1.8, basılı s. 64–65 (PDF 75–76). Bu kapanış çalışması §1.1–§1.7 konularını bir örnekte birleştirir.

Kampüsteki bir istemci uzak bir sunucuya üç kısa mesaj gönderiyor. **Yönetici neyi iyileştirmeli: erişim hattını mı, omurgayı mı, sunucunun konumunu mu?** Yanıt, ilk mesajın varışını mı, son mesajı mı, yoksa sürekli aktarım hızını mı iyileştirmek istediğine bağlı.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 126" role="img" aria-label="Kampüs örneğinde iki seri bağlantı. Özgün şema, §1.8." font-family="system-ui, sans-serif" font-size="13">
    <path d="M72 67 L349 67" stroke="#526b60" stroke-width="2" fill="none"/><rect x="15" y="50" width="90" height="34" rx="6" fill="#315d50"/><text x="60.0" y="72" text-anchor="middle" fill="#fff">İstemci</text><rect x="159" y="50" width="102" height="34" rx="6" fill="#315d50"/><text x="210.0" y="72" text-anchor="middle" fill="#fff">Yönlendirici</text><rect x="315" y="50" width="90" height="34" rx="6" fill="#855239"/><text x="360.0" y="72" text-anchor="middle" fill="#fff">Sunucu</text><text x="132" y="36" text-anchor="middle" fill="#34584b">10 Mbit/s</text><text x="288" y="36" text-anchor="middle" fill="#34584b">2 Mbit/s</text><text x="132" y="106" text-anchor="middle" fill="#34584b">2 km</text><text x="288" y="106" text-anchor="middle" fill="#34584b">400 km</text>
  </svg>
  <figcaption>Kampüs örneğinde iki seri bağlantı. Özgün şema, §1.8.</figcaption>
</figure>

## Önce yol ve veri birimi

İstemci ve sunucu uygulamanın uç sistemleridir. **Erişim ağı** istemciyi ilk yönlendiriciye bağlar. Yönlendiriciler **ağ çekirdeğinde** paket iletir. Farklı sağlayıcıların bağlantıları ve politikaları uçtan uca yolun oluşmasına yardım eder.

Uygulama verisini taşıma başlığı, IP başlığı ve yerel çerçeve kapsüller. Labda 1.000 bayt uygulama verisi, 20 bayt TCP, 20 bayt IPv4 ve 18 bayt Ethernet ek yüküyle 1.058 baytlık çerçeve olur. İletim hesabı çerçeve bitleriyle yapılır.

$$ L = 8 F $$

## Üç büyüklüğü ayrı hesapla

| İstenen | Bağıntı | Kampüs örneği |
| --- | --- | --- |
| Hatta bitleri yazma süresi | \(L/R\) | 8.464 bit, 2 Mbit/sn hatta 4,232 ms |
| Sinyalin yolu katetme süresi | \(d/v\) | 400 km, 2 × 10⁸ m/sn hızla 2 ms |
| Uzun akışın ideal üst sınırı | \(\min(R_1,R_2)\) | 10 ve 2 Mbit/sn hatlarda 2 Mbit/sn |

İlk çerçeve için kuyruk ve işlemeyi sıfır, yönlendiriciyi store-and-forward kabul et. Hızlar \(R_1,R_2\), toplam yayılma süresi \(T_p\) olsun.

$$ T_1 = \frac{L}{R_1} + \frac{L}{R_2} + T_p $$

İlk hat 2 km, ikinci hat 400 km ve dalga hızı aynıysa toplam yayılma 2,01 ms olur. İlk çerçeve 0,8464 + 4,232 + 2,01 = 7,0884 ms’de varır. Sonraki çerçeveler darboğazdan 4,232 ms aralıklarla çıkar. Üçüncünün varışı 7,0884 + 2 × 4,232 = 15,5524 ms’dir.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 124" role="img" aria-label="Uzaklık ve hat hızı farklı ölçümleri etkiler." font-family="system-ui, sans-serif" font-size="13">
    <rect x="14" y="22" width="165" height="34" rx="6" fill="#315d50"/><text x="96.5" y="44" text-anchor="middle" fill="#fff">Bağlantı uzaklığı</text><path d="M179 39 L239 39" stroke="#526b60" stroke-width="2" fill="none"/><rect x="239" y="22" width="165" height="34" rx="6" fill="#855239"/><text x="321.5" y="44" text-anchor="middle" fill="#fff">Yayılma süresi</text><rect x="14" y="71" width="165" height="34" rx="6" fill="#315d50"/><text x="96.5" y="93" text-anchor="middle" fill="#fff">Bağlantı hızı</text><path d="M179 88 L239 88" stroke="#526b60" stroke-width="2" fill="none"/><rect x="239" y="71" width="165" height="34" rx="6" fill="#855239"/><text x="321.5" y="93" text-anchor="middle" fill="#fff">İletim ve kapasite</text>
  </svg>
  <figcaption>Uzaklık ve hat hızı farklı ölçümleri etkiler.</figcaption>
</figure>

**Lab kontrolü:** Önce erişimi hızlandır. Darboğaz 2 Mbit/sn kalır, fakat ilk çerçeve daha erken gelir. Sonra omurgayı hızlandır ve kuyruğun etkisini karşılaştır. Sunucuyu yakına alma seçeneği yayılma süresine etki eder.

## Sayılar sorunun yalnızca bir bölümünü açıklar

Hedefe ulaşan veri açık metinle taşındıysa gizlilik iyileştirmesi gerekir. Hedefin kimliği doğrulanamıyorsa güven ilişkisinin nasıl kurulduğuna bakılır. Kapasite değişikliği bu iki sorunun ölçümünü doğrudan çözmez.

Tarihsel sıra da aynı tasarımı açıklar. Paket anahtarlama bağlantının paylaşılmasını, ortak TCP/IP bağımsız ağların birlikte çalışmasını, Web ise bu altyapının üzerinde bir uygulamanın yayılmasını sağladı. Sınavda bir açıklama yaparken önce sorunun uygulama, erişim, çekirdek ya da güvenlik hakkında olup olmadığını belirle. Sonra o katmandaki kanıtı ve birimi yaz.
