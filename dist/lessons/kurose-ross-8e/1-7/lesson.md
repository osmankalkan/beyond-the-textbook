# §1.7 Bilgisayar ağlarının ve İnternet’in tarihçesi

> Kurose ve Ross, *Computer Networking: A Top-Down Approach*, 8. baskı, §1.7.1–§1.7.5, basılı s. 58–64 (PDF 69–75).

Bir tarayıcı açtığında en az üç ayrı gelişmenin izini görürsün. Paketler bir ağı paylaşır, ortak kurallar farklı ağları birleştirir ve Web bu altyapıda belgeleri getirir. Her dönüm noktasını çözdüğü problemle eşleştir.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 100" role="img" aria-label="Paket ağı, ağlar arası tasarım, koordineli geçiş ve bir uygulama." font-family="system-ui, sans-serif" font-size="13">
    <path d="M67 60 L353 60" stroke="#526b60" stroke-width="2" fill="none"/><text x="57" y="27" text-anchor="middle" fill="#34584b">1969</text><rect x="13" y="43" width="88" height="34" rx="6" fill="#315d50"/><text x="57.0" y="65" text-anchor="middle" fill="#fff">ARPANET</text><text x="159" y="27" text-anchor="middle" fill="#34584b">1974</text><rect x="115" y="43" width="88" height="34" rx="6" fill="#315d50"/><text x="159.0" y="65" text-anchor="middle" fill="#fff">Ortak tasarım</text><text x="261" y="27" text-anchor="middle" fill="#34584b">1983</text><rect x="217" y="43" width="88" height="34" rx="6" fill="#315d50"/><text x="261.0" y="65" text-anchor="middle" fill="#fff">TCP/IP</text><text x="363" y="27" text-anchor="middle" fill="#34584b">1989–1991</text><rect x="319" y="43" width="88" height="34" rx="6" fill="#855239"/><text x="363.0" y="65" text-anchor="middle" fill="#fff">Web</text>
  </svg>
  <figcaption>Paket ağı, ağlar arası tasarım, koordineli geçiş ve bir uygulama.</figcaption>
</figure>

## 1960’lar ve 1970’ler: Bir ağdan ağların ağına

Bilgisayar trafiği kısa patlamalar üretir. Paket anahtarlama, boş kalan kaynakları sıradaki paketlere kullandırır. **ARPANET** 1969 sonunda dört düğümle bu yaklaşımın erken bir örneğini verdi. ARPANET’in kendi uç iletişim kuralları vardı. **ALOHAnet** ise Hawaii’de radyo üzerinden paket paylaşımını araştırdı. Farklı ortamlar ve tasarımlar, bu ağların birbirleriyle konuşması için ortak bir çerçeve gerektirdi.

Cerf ve Kahn’ın **1974** çalışması, birden çok ağı kendi iç yapılarını koruyarak birleştirmeye yönelikti. Bir ağın kendi hattı ya da yerel protokolü değişebilir. Uçtan uca iletişim için ortak protokol ailesi, bağımsız ağların birlikte çalışmasını sağlar.

## 1980’ler: Ortak protokolleri işletmek

**1983**’te ARPANET, TCP/IP’ye koordineli biçimde geçti. Bu kesit, tasarım ve kullanım arasındaki farkı gösterir. 1974’te bir yaklaşım ortaya kondu. Uçların yeni kurallara göre konuşması için ayrıca dağıtım ve geçiş gerekti. Yıllar arasındaki fark, teklif ile geçişi ayrı olaylar olarak yazınca görülür.

$$ \Delta t = t_2 - t_1 $$

1983 − 1974 = 9 takvim yılı. Bu fark, her ağın aynı anda geçiş yaptığını göstermez. Dönemin diğer gelişmeleri arasında **DNS**’in dağıtık ad çözümleme sistemi ve **NSFNET**’in araştırma erişimini genişleten omurgası vardı.

## 1990’lar: Web ve ticari omurgalar

CERN’de **1989–1991** arasında geliştirilen Web, tarayıcı, HTTP ve HTML ile bağlantılı belgeleri erişilebilir yaptı. İnternet daha önce de e-posta gibi uygulamaları taşıyordu. **1995**’te NSFNET omurgası kapatıldıktan sonra omurga trafiğini ticari sağlayıcılar taşıdı. Belgelerin kullanılabilirliğiyle omurganın işletilmesi iki farklı gelişmedir.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 170" role="img" aria-label="Bir Web isteğinin dayandığı katmanlar ve ağlar. Özgün şema, §1.7." font-family="system-ui, sans-serif" font-size="13">
    <rect x="90" y="15" width="240" height="34" rx="6" fill="#855239"/><text x="210.0" y="37" text-anchor="middle" fill="#fff">Web belgeleri</text><path d="M210 49 L210 67" stroke="#526b60" stroke-width="2" fill="none"/><rect x="90" y="67" width="240" height="34" rx="6" fill="#315d50"/><text x="210.0" y="89" text-anchor="middle" fill="#fff">TCP/IP ile ağlar arası iletişim</text><path d="M210 101 L210 119" stroke="#526b60" stroke-width="2" fill="none"/><rect x="90" y="119" width="240" height="34" rx="6" fill="#315d50"/><text x="210.0" y="141" text-anchor="middle" fill="#fff">Erişim ağları ve omurgalar</text>
  </svg>
  <figcaption>Bir Web isteğinin dayandığı katmanlar ve ağlar. Özgün şema, §1.7.</figcaption>
</figure>

## 2000’ler ve sonrası: Hareketli uçlar, yakın içerik

Genişbant ve kablosuz erişim gündelik kullanımı artırdı. Mobil cihazların bağlanması **erişim**, içeriğin kullanıcıya yakın sunulması **yerleştirme ve ağ bağlantısı** problemidir. İçerik sağlayıcıların dağıtık veri merkezleri ve özel ağları bu ikinci soruna yardımcı oldu.

**Lab kontrolü:** “Bağlantılı belgeleri tarayıcıdan aç” ihtiyacına önce TCP/IP geçişini, sonra CERN’de Web’in gelişimini seç. İkinci seçimin neden doğrudan soruna karşılık geldiğini, ilk seçimin hangi altyapıyı sağladığını açıkla.
