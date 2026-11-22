# §1.5 Protokol katmanları ve hizmet modelleri

> James F. Kurose ve Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8. baskı, §1.5.1–§1.5.2, basılı s. 47–54 (PDF s. 58–65).

Tarayıcı bir web isteği gönderiyor. Arada bir Ethernet anahtarı ve bir yönlendirici var. **Yönlendirici IP hedefini, Ethernet hedefini ve uygulama verisini aynı şekilde mi işler?** İpucu olarak verinin hangi parçasının uçtan uca, hangisinin yalnız bir bağlantı boyunca işe yaradığını düşün. Lab HTTP akışını bir örnek uygulama mesajına indirger.

## Aynı düzeyde protokol, üst kata hizmet

Bir **protokol**, iki eş katman arasındaki mesajların biçimini, sırasını ve bu mesajlara verilecek tepkileri belirler. Bir **hizmet**, alt katmanın üst kattaki bileşene sunduğu işlevdir. Uygulama TCP’den sıralı ve güvenilir bir bayt akışı ister. İki uçtaki TCP uygulamaları bu hizmeti sıra numaraları, onaylar ve yeniden iletimle sağlar. TCP’nin kendisi de IP’nin datagram teslim hizmetini kullanır.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 147" role="img" aria-label="Dikey çizgi hizmet arayüzünü, kesikli çizgi eşler arasındaki protokolü gösterir. Özgün çizim, §1.5.1." font-family="system-ui, sans-serif" font-size="14">
    <path d="M103 54 L103 95" fill="none" stroke="#527165" stroke-width="2"/><path d="M317 54 L317 95" fill="none" stroke="#527165" stroke-width="2"/><path d="M166 111 L254 111" fill="none" stroke="#527165" stroke-width="2" stroke-dasharray="4 4"/><rect x="40" y="22" width="126" height="32" rx="5" fill="#315d50"/><text x="103.0" y="43" fill="#fff" text-anchor="middle">Uygulama A</text><rect x="40" y="95" width="126" height="32" rx="5" fill="#855239"/><text x="103.0" y="116" fill="#fff" text-anchor="middle">TCP A</text><rect x="254" y="22" width="126" height="32" rx="5" fill="#315d50"/><text x="317.0" y="43" fill="#fff" text-anchor="middle">Uygulama B</text><rect x="254" y="95" width="126" height="32" rx="5" fill="#855239"/><text x="317.0" y="116" fill="#fff" text-anchor="middle">TCP B</text><text x="153" y="76" fill="#29483f" text-anchor="middle">Hizmet</text><text x="210" y="98" fill="#29483f" text-anchor="middle">Protokol</text>
  </svg>
  <figcaption>Dikey çizgi hizmet arayüzünü, kesikli çizgi eşler arasındaki protokolü gösterir. Özgün çizim, §1.5.1.</figcaption>
</figure>

Bu ayrım, Ethernet’ten Wi‑Fi’a geçerken uygulamanın aynı taşıma arayüzünü kullanabilmesini açıklar. Katmanlama bir uygulamayı sadeleştirir. Bedeli, ek başlıklar ve bazen katmanlar arasında yinelenen işlerdir. Örneğin bir kablosuz bağlantı yerel tekrar deneyebilir. TCP ise uçtan uca teslimle ilgilenir.

## İnternet’in beş katmanı

| Katman | Sorumluluk | Veri birimi |
| --- | --- | --- |
| Uygulama | HTTP, DNS gibi uygulama mesajları | Mesaj |
| Taşıma | Uygulama uçları arasında veri aktarımı. TCP sıralı bayt akışı, UDP datagram hizmeti sağlar. | TCP segmenti / UDP datagramı |
| Ağ | IP adresleriyle ağlar arası iletim. IP teslim, sıra ve gecikme garantisi vermez. | IP datagramı |
| Bağlantı | Tek bağlantıda düğümler arasında aktarım. Örnek: Ethernet. | Çerçeve |
| Fiziksel | Bitleri ortamda elektriksel, optik veya radyo sinyalleriyle taşıma. | Bit |

<figure class="lesson-figure">
  <svg viewBox="0 0 420 210" role="img" aria-label="İnternet yığını ve her katta bir örnek. Özgün çizim, Şekil 1.23." font-family="system-ui, sans-serif" font-size="14">
    <rect x="46" y="12" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="33" fill="#fff" text-anchor="middle">Uygulama</text><text x="275" y="33" fill="#29483f" text-anchor="middle">HTTP / DNS</text><rect x="46" y="50" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="71" fill="#fff" text-anchor="middle">Taşıma</text><text x="275" y="71" fill="#29483f" text-anchor="middle">TCP / UDP</text><rect x="46" y="88" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="109" fill="#fff" text-anchor="middle">Ağ</text><text x="275" y="109" fill="#29483f" text-anchor="middle">IP</text><rect x="46" y="126" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="147" fill="#fff" text-anchor="middle">Bağlantı</text><text x="275" y="147" fill="#29483f" text-anchor="middle">Ethernet</text><rect x="46" y="164" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="185" fill="#fff" text-anchor="middle">Fiziksel</text><text x="275" y="185" fill="#29483f" text-anchor="middle">Sinyal</text>
  </svg>
  <figcaption>İnternet yığını ve her katta bir örnek. Özgün çizim, Şekil 1.23.</figcaption>
</figure>

OSI referans modelinde **oturum** ve **sunum** da ayrı katmanlardır. Oturum işlevleri bir etkileşimin düzenlenmesini veya kaldığı yerden sürmesini, sunum işlevleri ise temsil dönüşümü, sıkıştırma veya şifrelemeyi kapsayabilir. İnternet’in beş katmanlı modelinde bu işleri ihtiyaç duyan yazılımlar üst katmanlarda üstlenir.

## Bir başlık, alt katmana inince yükün parçası olur

Göndericide taşıma başlığı mesaja, IPv4 başlığı taşıma birimine eklenir. Sonra Ethernet bir başlık ve FCS hata denetimi için bir son ek kullanır. \(M\) uygulama baytları, \(H_T\) taşıma başlığı ve \(H_I\) IP başlığı olsun.

$$ D = M + H_T + H_I $$

Etiketsiz Ethernet çerçevesinde 14 bayt başlık ve 4 bayt FCS vardır. Çerçeve yükü en az 46 bayttır. \(P\) dolgu, \(F\) çerçeve boyutu olsun. Bu modele Ethernet önsözü ve çerçeveler arası boşluk dahil değildir.

$$ P = \max(0, 46 - D) $$

$$ F = 14 + D + P + 4 $$

<figure class="lesson-figure">
  <svg viewBox="0 0 420 107" role="img" aria-label="Dolgu ve FCS Ethernet katmanına aittir. Kutular alan sırasını gösterir. Özgün çizim, Şekil 1.24." font-family="system-ui, sans-serif" font-size="14">
    <rect x="14" y="22" width="58" height="32" rx="5" fill="#855239"/><text x="43.0" y="43" fill="#fff" text-anchor="middle">MAC</text><rect x="76" y="22" width="60" height="32" rx="5" fill="#315d50"/><text x="106.0" y="43" fill="#fff" text-anchor="middle">IPv4</text><rect x="140" y="22" width="58" height="32" rx="5" fill="#315d50"/><text x="169.0" y="43" fill="#fff" text-anchor="middle">UDP</text><rect x="202" y="22" width="74" height="32" rx="5" fill="#315d50"/><text x="239.0" y="43" fill="#fff" text-anchor="middle">Veri</text><rect x="280" y="22" width="62" height="32" rx="5" fill="#855239"/><text x="311.0" y="43" fill="#fff" text-anchor="middle">Dolgu</text><rect x="346" y="22" width="57" height="32" rx="5" fill="#855239"/><text x="374.5" y="43" fill="#fff" text-anchor="middle">FCS</text><path d="M76 59 v8 H276 v-8" fill="none" stroke="#527165" stroke-width="2"/><text x="176" y="86" fill="#29483f" text-anchor="middle">IP datagramı</text>
  </svg>
  <figcaption>Dolgu ve FCS Ethernet katmanına aittir. Kutular alan sırasını gösterir. Özgün çizim, Şekil 1.24.</figcaption>
</figure>

**Tahmin et:** 12 bayt veri, 8 bayt UDP başlığı ve 20 bayt IPv4 başlığı 40 baytlık datagram yapar. Ethernet alt sınırına ulaşmak için 6 bayt dolgu ekler ve çerçeve 64 bayt olur. TCP başlığı 20 baytsa datagram 52, çerçeve 70 bayt olur. Başlık farkı 12 bayt olmasına rağmen bu örnekte iki çerçeve arasında 6 bayt fark var. Labda iki protokolü sırayla seç ve nedenini dolgu satırından doğrula.

## Anahtar, yönlendirici ve alıcı farklı iş yapar

<figure class="lesson-figure">
  <svg viewBox="0 0 420 120" role="img" aria-label="Yönlendirici iki bağlantı arasında yeni bir Ethernet çerçevesi kurar. Özgün çizim, Şekil 1.24." font-family="system-ui, sans-serif" font-size="14">
    <path d="M55 58 L365 58" fill="none" stroke="#527165" stroke-width="2"/><rect x="10" y="42" width="94" height="32" rx="5" fill="#315d50"/><text x="57.0" y="63" fill="#fff" text-anchor="middle">Gönderici</text><rect x="112" y="42" width="94" height="32" rx="5" fill="#315d50"/><text x="159.0" y="63" fill="#fff" text-anchor="middle">Anahtar</text><rect x="214" y="42" width="94" height="32" rx="5" fill="#855239"/><text x="261.0" y="63" fill="#fff" text-anchor="middle">Yönlendirici</text><rect x="316" y="42" width="94" height="32" rx="5" fill="#315d50"/><text x="363.0" y="63" fill="#fff" text-anchor="middle">Alıcı</text><text x="113" y="26" fill="#29483f" text-anchor="middle">Bağlantı 1</text><text x="336" y="26" fill="#29483f" text-anchor="middle">Bağlantı 2</text><text x="113" y="99" fill="#29483f" text-anchor="middle">TTL 64</text><text x="336" y="99" fill="#29483f" text-anchor="middle">TTL 63</text>
  </svg>
  <figcaption>Yönlendirici iki bağlantı arasında yeni bir Ethernet çerçevesi kurar. Özgün çizim, Şekil 1.24.</figcaption>
</figure>

1. **Ethernet anahtarı** hedef MAC adresine göre çıkış portunu seçer. Bu örnekte IP başlığını işlemez ve TTL aynı kalır.
2. **IP yönlendiricisi** gelen Ethernet kapsülünü çıkarır. IP hedefine göre çıkışı seçer, IPv4 TTL değerini azaltır, IP başlık sağlama toplamını günceller ve yeni bağlantı için bir Ethernet çerçevesi kurar.
3. **Alıcı** Ethernet kapsülünü ve varsa dolguyu ayırır. IP başlığının gösterdiği taşıma protokolüne yükü verir. Taşıma katmanı da uygulama verisini ilgili uç noktaya teslim eder.

Labdaki iki bağlantıda da Ethernet kullanıldığı için iki çerçeve aynı boyda olabilir. **Aynı boy, aynı çerçeve demek değildir.** MAC adresleri bağlantıya göre değişir. Bu modelde IP kaynak ve hedef adresleri uçtan uca korunur; TTL ise 64’ten 63’e iner. Fiziksel katman her bağlantıda çerçevenin bitlerini taşır.
