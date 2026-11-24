# Çalışma masası arayüz standardı

Çalışma masası iki kitabın ve yeni derslerin varsayılan arayüzüdür. Ana sayfa kitap rafını açar. Kitap tıklanınca önce kitap künyesi ve özeti açılır. Dersleri göster düğmesi bölümlere ayrılmış ders listesini açar. Ders seçimi özet ve Derse başla düğmesini gösterir. Odak sayacında dakika ve saniye doğrudan düzenlenir. Kronometre geçen süreyi ölçer. Ders notu, deney ve rehber, alıştırma, kişisel not, kitap haritası ve kaynak aynı uygulama kabuğunu paylaşır.

## Görsel dil

- Krem kâğıt, koyu mürekkep ve adaçayı yeşili temel renklerdir. Sarı yüzey tahmin, hızlı not ve konu özeti gibi yardımcı alanlarda kullanılır. Hata ve aktif adım ayrımı gerektiğinde sıcak vurgu kullanılır.
- Pencereler kare köşeli, ince koyu çerçeveli ve kısa, keskin gölgelidir. Çizgili başlık şeridi pencereyi tanımlar. Gölgeyi her seçeneğe ve iç karta ekleme.
- Başlıklarda serif, kontrol etiketlerinde ve durum bilgilerinde monospace kullan. Gövde metni, matematik ve eksen etiketleri okunabilir boyutta ve yeterli kontrastta kalır.
- Tahmin ve alıştırma seçeneklerini tek çerçeve içinde ayırıcılarla sırala. Seçili, pasif ve klavye odağındaki kontroller ayırt edilir. Düğmenin metni yaptığı işi söyler.
- Art arda gelen blok denklemler tek çerçeve görünümü verir. MathML, LaTeX kaynağı ve satır içi matematik korunur. Geniş tablolar ve şemalar kendi içinde kayar. Şekil açıklaması ve lejant, veriyi yorumlamak için gereken ayrımları taşır.
- Laboratuvarda parametreler, grafik, aktif adım ve sonuçlar ayrı görsel roller üstlenir. Konuya özgü renkler rota, veri serisi veya durum gibi gerçek anlam taşıdığında kullanılır. Navigasyon, grafik ve ölçümler rakip renk panolarına dönüşmez.

## Uygulama

Kabuk `dist/index.html`, ortak stiller ve piksel görseller `dist/retro/` altındadır. Kitap ve ders listesi `dist/content.js` kataloğundan gelir. Yeni bir ders mevcut not, rehber, lab, alıştırma ve harita bileşenlerini kullanır. Dersin deney mantığı kendi denetleyicisinde kalır. Türkçe ve İngilizce ortak metinleri `dist/i18n.js` içinde eşle.

Teslimden önce masaüstünde ve yaklaşık 390 px mobilde ders geçişini, klavye odağını, dil değişimini ve deneyin temel kontrolünü doğrula. Uzun başlıkları, formül ve diyagram taşmalarını, açık ipuçlarını ve seçili durumları kontrol et.
