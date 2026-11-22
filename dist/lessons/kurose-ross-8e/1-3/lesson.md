# §1.3 Ağ çekirdeği

> James F. Kurose ve Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8. baskı, §1.3.1–§1.3.3, basılı s. 22–34 (PDF s. 33–45).

Bir kampüs ağında yedi cihaz aynı anda veri göndermeye başladı. Kampüsten çıkan bağlantı bir çerçevede dört paket taşıyabiliyor. **İlk çerçeveden sonra ne olur?** Paket anahtarlamada üç paket sıraya girer. Dört sabit devre varsa üç akış devre alamaz. Bağlantı aynı, paylaşım kuralı farklı.

## Paketin bir sonraki adımı

Uç sistem bir mesajı paketlere böler. Yönlendirici paketin başlığındaki hedefe bakar ve **iletim tablosundan** çıkış bağlantısını seçer. Bu yerel işleme *forwarding* denir. **Yönlendirme** (*routing*) ise ağdaki yolları hesaplar ve iletim tablolarının oluşmasını sağlar. Örneğin bir sonraki yönlendiriciye giden hat kesilirse yönlendirme yeni bir yol hesaplayabilir. Tablo güncellenince sonraki paketler yeni çıkışı izler.

<figure class="lesson-figure">
  <svg viewBox="0 0 436 133" role="img" aria-label="D kaydı 2. çıkışı seçer. Özgün şema, §1.3.1, s. 25–26." font-family="system-ui, sans-serif" font-size="15">
    <path d="M116 45 L167 45" stroke="#526b60" stroke-width="2"/><circle cx="167" cy="45" r="3" fill="#526b60"/><path d="M263 45 L315 45" stroke="#526b60" stroke-width="2"/><circle cx="315" cy="45" r="3" fill="#526b60"/><path d="M240 62 L315 90" stroke="#526b60" stroke-width="2"/><circle cx="315" cy="90" r="3" fill="#526b60"/><rect x="18" y="28" width="98" height="34" rx="6" fill="#315d50"/><text x="67.0" y="50" fill="white" text-anchor="middle">Paket D</text><rect x="171" y="28" width="92" height="34" rx="6" fill="#315d50"/><text x="217.0" y="50" fill="white" text-anchor="middle">Yönlendirici</text><rect x="319" y="28" width="98" height="34" rx="6" fill="#526b60"/><text x="368.0" y="50" fill="white" text-anchor="middle">Çıkış 1</text><rect x="319" y="73" width="98" height="34" rx="6" fill="#a85d35"/><text x="368.0" y="95" fill="white" text-anchor="middle">Çıkış 2</text><text x="183" y="117" fill="#36534a" text-anchor="middle">İletim tablosu   D → 2</text>
  </svg>
  <figcaption>D kaydı 2. çıkışı seçer. Özgün şema, §1.3.1, s. 25–26.</figcaption>
</figure>

Store-and-forward modelinde yönlendirici bir paketi çıkışa vermeden önce son bitini alır. \(L\) bitlik bir paket, \(R\) bit/sn hızındaki bağlantıya \(L/R\) saniyede yazılır. Arka arkaya iki eş hızlı bağlantıda tek paket için, diğer gecikmeler ihmal edildiğinde:

$$ T = \frac{2L}{R} $$

1.000 baytlık paketi 2 Mbit/sn hızla göndermek 4 ms sürer. Ara yönlendirici ikinci hatta 4. milisaniyede başlar ve son bit 8. milisaniyede çıkar. Çok bağlantılı zaman çizelgesini §1.4’te inceleyebilirsin.

## Çıkış hattı ne zaman dolar?

Sıraya giren paket sayısını bulmak için önce eski kuyruğa yeni gelenleri ekle. \(Q_{t-1}\) önceki kuyruk, \(A_t\) yeni paket sayısı, \(K\) çerçevenin kapasitesi olsun. Çıkış, hazır paket ve kapasite değerlerinden küçük olanı taşır:

$$ S_t = \min(K, Q_{t-1} + A_t) $$

$$ Q_t = Q_{t-1} + A_t - S_t $$

<figure class="lesson-figure">
  <svg viewBox="0 0 436 108" role="img" aria-label="Patlamanın ilk çerçevesinde paket hesabı. Özgün şema, §1.3.1, Şekil 1.12." font-family="system-ui, sans-serif" font-size="15">
    <path d="M127 54 L147 54 L147 22 L218 22 L218 33" stroke="#526b60" stroke-width="2"/><circle cx="218" cy="33" r="3" fill="#526b60"/><path d="M147 54 L147 89 L364 89 L364 75" stroke="#526b60" stroke-width="2"/><circle cx="364" cy="75" r="3" fill="#526b60"/><rect x="17" y="37" width="110" height="34" rx="6" fill="#315d50"/><text x="72.0" y="59" fill="white" text-anchor="middle">7 gelen</text><rect x="169" y="37" width="98" height="34" rx="6" fill="#315d50"/><text x="218.0" y="59" fill="white" text-anchor="middle">4 giden</text><rect x="309" y="37" width="110" height="34" rx="6" fill="#a85d35"/><text x="364.0" y="59" fill="white" text-anchor="middle">3 bekleyen</text>
  </svg>
  <figcaption>Patlamanın ilk çerçevesinde paket hesabı. Özgün şema, §1.3.1, Şekil 1.12.</figcaption>
</figure>

Kapasite çerçeve başına dört paketken üç çerçeve boyunca yedişer paket gelsin. Çerçeve sonlarında kuyruk **3 → 6 → 9** olur. Yeni paketler kesilince sıra **5 → 1 → 0** diye boşalır. Sağlama: 21 paket geldi, ilk beş çerçevenin her birinde dörder ve altıncıda bir paket gönderildi. Tampon sonluysa ve doluyken paket gelirse paket kaybı oluşabilir. Labdaki kuyruk sınırsızdır.

## Devre kapasitesi nasıl ayrılır?

Devre anahtarlamada bağlantı kurulurken yolun her halkasında kaynak ayrılır. \(K\) eş devre, hızı \(R\) olan tek bir hattı bölüşüyorsa devre başına hız:

$$ R_{\mathrm{c}} = \frac{R}{K} $$

**FDM** her devreye ayrı bir frekans bandı ayırır. **TDM** her devreye yinelenen çerçevede belirli bir zaman yuvası verir. Yuva \(b\) bit ve saniyede \(f\) çerçeve varsa devrenin hızı \(bf\) bit/sn’dir.

$$ R_{\mathrm{c}} = b f $$

<figure class="lesson-figure">
  <svg viewBox="0 0 436 108" role="img" aria-label="Her çerçevede 2. yuva aynı devreye ayrılır. Özgün şema, §1.3.2, Şekil 1.14." font-family="system-ui, sans-serif" font-size="15">
    <text x="120" y="20" fill="#36534a" text-anchor="middle">Çerçeve 1</text><text x="314" y="20" fill="#36534a" text-anchor="middle">Çerçeve 2</text><rect x="42" y="32" width="35" height="34" rx="6" fill="#315d50"/><text x="59.5" y="54" fill="white" text-anchor="middle">1</text><rect x="82" y="32" width="35" height="34" rx="6" fill="#a85d35"/><text x="99.5" y="54" fill="white" text-anchor="middle">2</text><rect x="122" y="32" width="35" height="34" rx="6" fill="#526b60"/><text x="139.5" y="54" fill="white" text-anchor="middle">3</text><rect x="162" y="32" width="35" height="34" rx="6" fill="#526b60"/><text x="179.5" y="54" fill="white" text-anchor="middle">4</text><rect x="236" y="32" width="35" height="34" rx="6" fill="#315d50"/><text x="253.5" y="54" fill="white" text-anchor="middle">1</text><rect x="276" y="32" width="35" height="34" rx="6" fill="#a85d35"/><text x="293.5" y="54" fill="white" text-anchor="middle">2</text><rect x="316" y="32" width="35" height="34" rx="6" fill="#526b60"/><text x="333.5" y="54" fill="white" text-anchor="middle">3</text><rect x="356" y="32" width="35" height="34" rx="6" fill="#526b60"/><text x="373.5" y="54" fill="white" text-anchor="middle">4</text><text x="216" y="91" fill="#36534a" text-anchor="middle">Zaman →</text>
  </svg>
  <figcaption>Her çerçevede 2. yuva aynı devreye ayrılır. Özgün şema, §1.3.2, Şekil 1.14.</figcaption>
</figure>

**Labda tahmin et:** Dört ayrılmış yuva, iki etkin akış ve üç çerçeve seç. Devrelerin iki yuvası boş kalır. Sonra yedi etkin akış dene. Üç akış devre alamaz. Paket anahtarlamada yedisi de paket gönderebilir. Aynı anda gelen fazla paketler kuyruğa kalır.

Düşük ortalama, kısa bir patlamayı gizleyebilir. Örneğin çerçeve başına ortalama iki paket, boş bir kuyrukta gelişlerin 6, 0, 0 olmasıyla da sağlanır. Kapasite dörtse ilk çerçevede iki paket bekler. Paket anahtarlamanın talep üzerine paylaşımı ile devre rezervasyonunun öngörülebilir hızını bu fark üzerinden karşılaştır.

## Bir servis sağlayıcı diğerine nasıl ulaşır?

Bir erişim sağlayıcısı (ISP), uzak ağlara erişebilmek için bir **transit** sağlayıcıyla anlaşabilir. İki ağ **peering** yoluyla kendi ve anlaşma kapsamındaki müşterilerinin trafiğini doğrudan değiş tokuş edebilir. **IXP** (İnternet değişim noktası), katılan ağların bu tür bağlantıları kurabildiği ortak altyapıdır. Orada bulunan her ağ çifti otomatik olarak trafik alışverişi yapmaz.

<figure class="lesson-figure">
  <svg viewBox="0 0 436 147" role="img" aria-label="A, değişim noktasında B ile peering yapıp diğer hedefler için transit alabilir. Özgün şema, §1.3.3, Şekil 1.15." font-family="system-ui, sans-serif" font-size="15">
    <path d="M82 46 L172 46" stroke="#526b60" stroke-width="2"/><circle cx="172" cy="46" r="3" fill="#526b60"/><path d="M260 46 L351 46" stroke="#526b60" stroke-width="2"/><circle cx="351" cy="46" r="3" fill="#526b60"/><path d="M174 114 L79 64" stroke="#526b60" stroke-width="2"/><circle cx="79" cy="64" r="3" fill="#526b60"/><rect x="14" y="28" width="68" height="34" rx="6" fill="#315d50"/><text x="48.0" y="50" fill="white" text-anchor="middle">ISP A</text><rect x="176" y="28" width="84" height="34" rx="6" fill="#315d50"/><text x="218.0" y="50" fill="white" text-anchor="middle">IXP</text><rect x="355" y="28" width="68" height="34" rx="6" fill="#315d50"/><text x="389.0" y="50" fill="white" text-anchor="middle">ISP B</text><rect x="174" y="96" width="100" height="34" rx="6" fill="#315d50"/><text x="224.0" y="118" fill="white" text-anchor="middle">Transit</text><text x="219" y="79" fill="#36534a" text-anchor="middle">IXP üzerinden peering</text>
  </svg>
  <figcaption>A, değişim noktasında B ile peering yapıp diğer hedefler için transit alabilir. Özgün şema, §1.3.3, Şekil 1.15.</figcaption>
</figure>

Bir sağlayıcının **PoP**’u (erişim noktası), başka ağların o sağlayıcıya bağlandığı yönlendirici grubudur. Bir ISP, dayanıklılık veya erişim için birden çok üst sağlayıcıya bağlanabilir (*multihoming*). İçerik sağlayıcıları da kendi omurgalarını kurup erişim ağlarına yakın noktalarda bağlantı kurabilir. Bir yol çizerken her bağlantıya “bu iki ağ hangi trafiği taşımayı kabul etmiş?” diye sor. Fiziksel bağlantı, ticari ilişki ve seçilen paket yolu ayrı bilgiler verir.
