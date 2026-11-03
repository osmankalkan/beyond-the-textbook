> Tarihsel ilk teslim kaydıdır. Güncel kapsam PROJE-DURUMU.md ve QUALITY-REVISION.md içindedir; eski bekleyen konu/test sayısı ifadeleri güncel durum sayılmaz.

# §1.1 inceleme noktası — 3 Kasım 2026

Bu adım yalnızca **Motive Edici Örnekler / Motivating Examples** konusunu ekler. §1.2 kullanıcı incelemesi sonrasına bırakılmıştır.

## Nereden açılır?

Proje klasöründe `npm start` çalıştırın. Terminalin verdiği yerel adreste kitaplıktan **1.1** dersini seçin. Varsayılan portta doğrudan bağlantı:

http://127.0.0.1:4317/?lesson=xie-2010%3A1.1&lang=tr#lab

## İçerik kapsamı

| Kaynak örneği | Basılı sayfa / PDF sayfası | Bu adımda sunulan |
| --- | --- | --- |
| Hava dirençli atış | 1–2 / 19–20 | İki kuvvet dengesi, başlangıç koşulları, dirençli / dirençsiz yörünge karşılaştırması |
| Karışım tankı | 2–3 / 20–21 | Hacim ve madde dengesi, ürün kuralı, yoğunluk grafiği, boşalma sınırı |
| Asma köprü kablosu | 3–4 / 21–22 | Yatay konuma göre denge denklemi, koşullar ve yük varsayımı |
| Deprem etkisindeki bina | 4 / 22 | Mutlak / göreli koordinat ve zemin ivmesiyle zorlama |
| Titreşim sönümleyici | 4–5 / 22–23 | İki bağlı kuvvet dengesi ve iç kuvvetlerin iptali |
| Hareketli yük altındaki köprü | 5–6 / 23–24 | Uzay + zaman modeli, Dirac yükü, başlangıç ve basit mesnet sınır koşulları |

Metinler özgün çalışma uyarlamalarıdır. Parametreler keşif değerleridir; grafikler bu uygulama için eklenmiştir. Dört model incelemesinin çalışmayan simülasyonmuş gibi sunulmasından kaçınılır. On bir formül iki dilde aynı LaTeX kaynakları ve MathML çıktısıyla sunulur. Altı kavrama sorusu kitaptaki bir sınavın kopyası değildir.

## İnceleme akışı

1. Kitaplıkta §1.1’i aç; altı örneğin kartlarını incele.
2. Atışta β’yı sıfıra indir. Dirençli ve dirençsiz eğrilerin çakıştığını gözle; kütle / β oranının etkisini dene.
3. Tankta giriş ve çıkış debilerini değiştir. Çıkış girişten büyükse gözlem aralığının boşalmadan önce sonlandığını kontrol et.
4. TR / EN değiştir; seçili örneğin ve parametrelerin korunduğunu gözle.
5. Ders notunu ve altı kavrama sorusunu incele. §1.1 notları ve ilerlemesinin §3.1 kayıtlarından ayrı olduğunu kontrol et.
6. Kitap haritasında §1.1 ve §3.1’in hazır, §1.2’nin yalnızca başlık olarak göründüğünü kontrol et.

## Teknik değişiklikler

- Yeni dersin içeriği kendi modülünde; mevcut katalog kaydı korunur.
- Yeni laboratuvar kendi DOM kökünde çalışır; olay aboneliklerini kapatabilir. Dil güncellemesi ile laboratuvar değiştirme ayrı yaşam döngüleridir.
- Ortak laboratuvar host’u kayıtlı modülleri yükler. Geç biten eski yüklemeler seçili laboratuvarı değiştiremez.
- Markdown / MathML erişimi arayüzden ayrıldı; ortak istekler birleştirilir ve hata sonrası tekrar denenebilir. Ders görünümündeki eski istekler de konu / dil değişiminden sonra sayfanın üstüne yazamaz.
- Formül üretimi konu başına ayrıldı; giriş komutu ve sıfır bağımlılık kuralı korunur.
- Mevcut sıcaklık laboratuvarı adaptörle çalışmaya devam eder; bütün eski uygulamanın yeniden yazıldığı iddia edilmez.

## Doğrulama

`npm test`: **16 test**. Yeni sayısal modeller bağımsız RK4 / madde dengesi ile karşılaştırılır; sıfır direnç ve boşalma sınırları test edilir. Katalog, iki dil, formül eşliği, eski not/ilerleme kayıtları ve yükleme yaşam döngüsü de kapsamdadır.

`python3 build_math.py`: mevcut §3.1 için 9, yeni §1.1 için 11 formül üretir. Her kaynak çiftini çıktı yazmadan önce doğrular.

Tarayıcı kontrolü: masaüstünde iki dil, altı örnek, tank boşalma aralığı, yeni dersin Markdown / formülleri ve §3.1’e geri geçiş doğrulandı. Mobil 390 px görünümde grafik ve uzun denklemler incelendi; sayfa genişliğinde taşma görülmedi.

## Sıradaki adım

**İnceleme bekleniyor.** Kullanıcı devam demeden §1.2’ye veya başka yeni bir konuya başlanmaz. Commit / push / yayın bu çalışmanın kapsamında değildir.
