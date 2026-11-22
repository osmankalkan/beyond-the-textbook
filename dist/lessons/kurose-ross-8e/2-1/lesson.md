# §2.1 Ağ uygulamalarının ilkeleri

> Kurose & Ross, 8. ed., §2.1, pp. 82–95 (PDF 93–106).

Bir dosya paylaşım sistemi ve canlı ses uygulaması aynı ağdan geçiyor. Dosya eksiksiz gelmeli. Sesin geç gelen parçası ise çalma anında yararsız olabilir. **Her uygulama hangi taşıma hizmetine ihtiyaç duyar?**

## Mimari ve süreçler

Uygulama süreçleri uç sistemlerde çalışır. İstemci–sunucu düzeninde istemci isteği başlatır ve sunucu hizmet verir. P2P düzeninde eşler birbirinden hizmet isteyebilir ve birbirine hizmet sunabilir. Bir P2P sisteminde keşif veya oturum açma için merkezi bir bileşen de bulunabilir.

Her süreç ağa bir **soket** üzerinden veri verir. IP adresi ağ uç noktasını, taşıma protokolü ve port ilgili taşıma uç noktasını belirlemeye yardım eder. Bir sunucu aynı yerel portta birden çok TCP bağlantısı tutabilir. TCP her bağlantıyı kaynak ve hedef IP/port çiftleriyle ayırır.

<figure class="lesson-figure">
  <svg viewBox="0 0 410 75" role="img" aria-label="Soket, uygulamanın taşıma hizmetine eriştiği arayüzdür." font-family="system-ui" font-size="12">
    <path d="M65 37H345" stroke="#527165" stroke-width="2"/><rect x="12" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="72" y="42" text-anchor="middle" fill="white">Uygulama</text><rect x="146" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="206" y="42" text-anchor="middle" fill="white">Soket</text><rect x="280" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="340" y="42" text-anchor="middle" fill="white">TCP / UDP</text>
  </svg>
  <figcaption>Soket, uygulamanın taşıma hizmetine eriştiği arayüzdür.</figcaption>
</figure>

## Dört gereksinim

**Güvenilirlik:** Her bayt gerekli mi? **Hız:** Akışın yararlı olabilmesi için bir alt hız gerekiyor mu? **Zamanlama:** Verinin son kullanma anı var mı? **Güvenlik:** İçerik ve tarafların kimliği korunmalı mı?

TCP bağlantı kurar, güvenilir ve sıralı bayt akışı sunar, akış ve tıkanıklık kontrolü uygular. Uygulama mesaj sınırlarını kendi belirler. UDP datagram sınırlarını korur ve bağlantı kurmadan gönderim yapar. Teslim, sıra ve yeniden iletim gerekiyorsa uygulama bunları ayrıca ele alır. İki hizmet de asgari hız veya gecikme garantisi vermez. TLS, güvenilir kimlik doğrulama ile birlikte şifreleme ve bütünlük sağlayabilir.

Labda aynı taşıma protokolünü dosya, canlı ses ve oyun için dene. Örneğin eski bir konum güncellemesinin yeniden iletilmesi, yeni bir konumdan daha az değerli olabilir. Dosya aktarımında aynı eksik parça tüm sonucu geçersiz kılabilir.

## Uygulama protokolü neyi tanımlar?

Mesaj türlerini, biçimini, alanların anlamını ve mesajların ne zaman gönderilip nasıl yanıtlanacağını tanımlar. Örneğin dosya istemi ve hata yanıtı ayrı türlerdir. “Bulunamadı” alanının anlamını uygulama protokolü belirler. TCP, bu yanıtı taşıyan baytların sırasıyla ilgilenir. Kitabın devamında bu ayrımı Web/HTTP, e-posta, DNS, P2P, video ve soket örneklerinde göreceksin.

<figure class="lesson-figure">
  <svg viewBox="0 0 410 75" role="img" aria-label="Bir uygulama protokolü mesajı ve alıcının davranışını birlikte tanımlar." font-family="system-ui" font-size="12">
    <path d="M65 37H345" stroke="#527165" stroke-width="2"/><rect x="12" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="72" y="42" text-anchor="middle" fill="white">Veri türü</text><rect x="146" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="206" y="42" text-anchor="middle" fill="white">Biçim ve anlam</text><rect x="280" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="340" y="42" text-anchor="middle" fill="white">Tepki</text>
  </svg>
  <figcaption>Bir uygulama protokolü mesajı ve alıcının davranışını birlikte tanımlar.</figcaption>
</figure>

## Mimariyi değiştirince ne kazanılır?

§2.5’e hazırlık olarak \(F\) Mbit dosya, \(N\) alıcı, kaynak yüklemesi \(u_s\), eş başına yükleme \(u\) ve en yavaş indirme \(d\) olsun. Hızlar Mbit/sn. İstemci–sunucuda kaynak tüm kopyaları yükler. Her mimaride en yavaş alıcı en az \(F/d\) saniyeye ihtiyaç duyar.

$$ T_c \ge \max(NF/u_s, F/d) $$

P2P’de kaynak en az bir dosya kadar yeni veri sunar. Kaynak ve eşler birlikte bütün alıcılara toplam \(NF\) Mbit gönderir. Bu üç sınırın en büyüğünü al.

$$ T_p \ge \max(F/u_s, F/d, NF/(u_s+Nu)) $$

Örnek olarak \(F=1000\), \(N=10\), \(u_s=20\), \(u=2\), \(d=10\) seç. İstemci–sunucu sınırı 500 sn. P2P için üç aday 50, 100 ve 250 sn. \(u=0\) yapınca iki mimarinin alt sınırı 500 sn olur. Labda en yavaş alıcıyı 1 Mbit/sn’ye indir. Artık iki mimari de en az 1.000 sn ister. Gerçek bitiş zamanı protokol ek yükü ve parça paylaşımına da bağlıdır.
