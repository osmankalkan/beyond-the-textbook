# §1.6 Saldırı altındaki ağlar

> Kurose ve Ross, *Computer Networking: A Top-Down Approach*, 8. baskı, §1.6, basılı s. 54–58 (PDF 65–69).

Kampüs portalı açık, fakat kullanıcılar dosya alamıyor. Aynı gün bir günlük kaydında açık metin mesaj görülüyor. **Bu iki belirtiyi tek bir önlem çözer mi?** İlk olayda hizmetin ulaşılabilirliğini, ikincide içeriğin gizliliğini incele.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 107" role="img" aria-label="Bir belirti, sorulacak ilk güvenlik sorusunu belirler." font-family="system-ui, sans-serif" font-size="13">
    <text x="73" y="26" text-anchor="middle" fill="#34584b">Okunabilir</text><path d="M73 34 L73 54" stroke="#526b60" stroke-width="2" fill="none"/><rect x="12" y="54" width="122" height="34" rx="6" fill="#315d50"/><text x="73.0" y="76" text-anchor="middle" fill="#fff">Gizlilik</text><text x="210" y="26" text-anchor="middle" fill="#34584b">Değişmiş</text><path d="M210 34 L210 54" stroke="#526b60" stroke-width="2" fill="none"/><rect x="149" y="54" width="122" height="34" rx="6" fill="#315d50"/><text x="210.0" y="76" text-anchor="middle" fill="#fff">Bütünlük</text><text x="347" y="26" text-anchor="middle" fill="#34584b">Gecikmiş</text><path d="M347 34 L347 54" stroke="#526b60" stroke-width="2" fill="none"/><rect x="286" y="54" width="122" height="34" rx="6" fill="#855239"/><text x="347.0" y="76" text-anchor="middle" fill="#fff">Kullanılabilirlik</text>
  </svg>
  <figcaption>Bir belirti, sorulacak ilk güvenlik sorusunu belirler.</figcaption>
</figure>

## Dört belirti, dört ilk kontrol

| Belirti | Risk | İlk kontrol |
| --- | --- | --- |
| Ağ yolunda içerik okunabiliyor. | Gizlilik kaybı | Kimliği doğrulanmış şifreli kanal kullan. |
| Gönderen kimliği veya veri doğrulanamıyor. | Kimliğe bürünme ya da bütünlük kaybı | Kimliği ve mesajın bütünlüğünü doğrula. |
| Cihaz beklenmedik davranış gösteriyor. | Zararlı yazılım olasılığı | Cihazı ayır, kanıtı incele ve güvenilir durumdan kurtar. |
| Meşru istekler zamanında tamamlanmıyor. | Kullanılabilirlik kaybı | Hangi kaynağın dolduğunu ve kaç isteğin tamamlandığını ölç. |

**Pasif dinleme** trafiği kopyalayıp okuyabildiği için veri değişmese de gizlilik bozulabilir. **Kaynak sahteciliğinde** bir paketin kaynak alanı gerçek göndereni yansıtmayabilir. Kimliğin güvenilirliği, adres alanının ötesinde doğrulama gerektirir.

**Zararlı yazılım** bir cihazda istenmeyen iş yapar. Solucan kendi kendine yayılabilir. Virüs çoğalmak için bir taşıyıcı dosyaya ya da programa bağlanır. Uzaktan yönetilen ele geçirilmiş cihaz grubu *botnet* olarak adlandırılır. Yama ve dar yetki ele geçirme olasılığını azaltır. Ayrı, doğrulanmış bir yedek kurtarmaya yardımcı olur.

## Kapasiteyi ölçerek kullanılabilirliği test et

Hizmet engelleme (*DoS*) kaynakları tüketip meşru kullanıcılara verilen hizmeti aksatır. Olay dağıtık kaynaklara sahipse *DDoS* denir. Kullanılabilirliği ölçerken yalnızca toplam trafiğe bakma. Tamamlanan meşru iş sayısını başlangıç talebiyle karşılaştır.

$$ A = \frac{S}{N} $$

Burada \(S\) tamamlanan, \(N\) talep edilen meşru iş birimidir. Örneğin ortak kapasite 100, halihazırda meşgul bölüm 60 ve yeni meşru talep 80 birimse mevcut pencere en fazla 40 işi tamamlar. Modelde 80 birimlik bir rezervasyonla pay %50’den %100’e çıkar. Bu sentetik örnekte rezervasyon ortak bütçenin paylaşımını değiştirir. Gerçekte kimlerin öncelik alacağı ve hangi kaynağın dolduğu ayrıca belirlenir.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 115" role="img" aria-label="Ortak havuzdaki kullanılabilir kapasite. §1.6 için özgün sentetik örnek." font-family="system-ui, sans-serif" font-size="13">
    <text x="215" y="24" text-anchor="middle" fill="#34584b">100 iş birimi</text><rect x="35" y="39" width="216" height="34" rx="6" fill="#855239"/><text x="143.0" y="61" text-anchor="middle" fill="#fff">60 meşgul</text><rect x="251" y="39" width="144" height="34" rx="6" fill="#315d50"/><text x="323.0" y="61" text-anchor="middle" fill="#fff">40 boş</text><text x="215" y="97" text-anchor="middle" fill="#34584b">80 yeni birimden 40’ı tamamlanır</text>
  </svg>
  <figcaption>Ortak havuzdaki kullanılabilir kapasite. §1.6 için özgün sentetik örnek.</figcaption>
</figure>

**Lab kontrolü:** Kapasite olayında şifreli kanal seçip 40/80 sayısını oku. Sonra meşru iş için kapasite ayır ve 80/80 ile karşılaştır. İçerik gözlemine dönüp hangi güvenlik hedefinin değiştiğini açıkla.
