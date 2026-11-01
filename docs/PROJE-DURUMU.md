# Proje durumu ve devam notları

Son düzenleme: 1 Kasım 2026.

## Amaç

Beyond the Textbook projesiyle farklı kitapları, Markdown temelli dersler, etkileşimli modeller, alıştırmalar ve ileride kaynak gösteren LLM desteğiyle kişisel bir öğrenme uygulamasına dönüştürmek. İlk örnek olan Denklem Atölyesi, bir matematik kitabının bir bölümüyle başlıyor. Proje küçük adımlarla başka bölümlere ve kitaplara genişletilecek; çok kitaplı kitaplık henüz uygulanmadı.

## Mevcut sürüm

- Kaynak kitap: Wei-Chau Xie, *Differential Equations for Engineers*, Cambridge University Press, 2010. Kullanıcının PDF'si 568 sayfa.
- İşlenen bölüm: §3.1 Heating and Cooling, basılı s.87–90; PDF s.105–108.
- Türkçe ders notu, kaynağa dayanan bir uyarlamadır; birebir çeviri değildir. Dokuz LaTeX formülünün MathML gösterimi hazırlanmış ve incelenmiştir.
- İki deney: Newton soğuma modeli ve geri beslemeli bina ısıtması.
- Analitik çözüm, Euler karşılaştırması, parametre sürgüleri, zaman imleci / oynatma, CSV ve SVG indirme.
- Uygulama için hazırlanmış dört alıştırma, aşamalı sabit ipuçları, cevap kontrolü.
- Notlar ve ilerleme aynı tarayıcının yerel depolamasında tutulur; hesap veya bulut eşitlemesi yoktur.
- Kitap haritası 12 ana bölümü içerir. §3.1 dışındaki bölümler henüz derslere dönüştürülmemiştir.
- LLM API bağlı değildir; sohbet varmış gibi gösterilmez.

## Çalıştırma ve giriş

`npm start` ardından http://127.0.0.1:4317 adresini açın. Çalışan uygulamada ChatGPT hesabı veya başka bir giriş gerekmez. Node.js kurulu olmalıdır; `npm install` gerekmiyor. Alternatif olarak `dist/` klasörünü statik HTTP sunucusuyla sunun.

Mevcut özel yayın: https://denklem-atolyesi-xie-20261101.readyrice1025.chatgpt.site

Bu adresin ChatGPT giriş ekranı, Sites üzerindeki owner-private erişim ayarından kaynaklanır. Uygulamanın kaynak kodunda giriş zorunluluğu yoktur. İnternette girişsiz bir sürüm için giriş zorunluluğu olmayan bir statik yayın hedefi veya mevcut yayın servisinde uygun erişim ayarı gerekir. Mevcut özel yayının erişimi değiştirilmedi. Kaynak kodunun GitHub'a aktarılması yeni bir uygulama yayını başlatmaz.

## Doğrulananlar

- Beş model testi geçti: kitap örnekleri 3.1 ve 3.2, hedef / denge durumları, Euler yakınsaması, bina çözümünün bağımsız RK4 integrasyonuyla uyumu.
- Dokuz MathML ifadesinin XML yapısı ve Markdown eşleşmeleri kontrol edildi.
- 568 PDF sayfasının ham metin çıkarımında bulunduğu kontrol edildi. Tam kitaptaki matematiksel doğruluk denetlenmedi; şekiller aktarılmadı.
- Masaüstü ve 390 px genişlikte mobil görünüm incelendi.
- Alıştırmalarda doğru / yanlış kontrolü, ipuçları, ilerleme, notların yenilemeden sonra korunması ve konu araması tarayıcıda kontrol edildi.
- Laboratuvar denklem kartındaki MathML yerleşimi düzeltilip yayımlandı.

## Dosyalar

```text
denklem-atolyesi/
├── README.md                  Başlangıç ve çalıştırma
├── AGENTS.md                  Sonraki geliştirme oturumları için bağlam
├── package.json
├── server.mjs                 Yerel statik HTTP sunucusu
├── build_math.py              Denetlenmiş LaTeX → MathML eşlemesi
├── dist/                      Yayımlanacak uygulama
│   ├── index.html, styles.css, app.js
│   ├── models.js
│   ├── lesson.md, math.json
│   └── vendor/                Yerel Markdown görüntüleyicisi + lisansı
├── tests/models.test.mjs
├── docs/
│   ├── PROJE-DURUMU.md
│   └── onizleme.jpg           Yerel QA ekran görüntüsü
├── private/book/              Yerel kaynak kitap + ham çıkarım; Git dışında
├── artifacts/                 İlk prototip kaynak ZIP'i; Git dışında
└── .openai/hosting.json        Mevcut özel yayın kimliği
```

## Sonraki küçük adımlar

Bunlar önerilen çalışma dilimleridir; henüz yapılmış veya kullanıcı tarafından sıraya konmuş değildir.

1. İlk sürümü kullanarak içerik, okunabilirlik ve deney akışına ilişkin geri bildirim toplamak.
2. Gerekirse ders, alıştırma ve kitap haritası verilerini birbirinden ayrılmış içerik dosyalarına taşımak; mevcut prototip görünümünü korumak.
3. İkinci bir bölümü seçmek, Markdown'ını ve matematik doğrulamasını tamamlamak, ardından uygun deneyi eklemek.
4. LLM için sunucu bağlantısı, kaynak gösterme ve aşamalı ipucu davranışını tasarlamak; gerçek API erişimi sağlandığında bağlamak.
5. İstenirse giriş gerektirmeyen internet yayını hazırlamak.

## GitHub yaklaşımı

Depo: https://github.com/osmankalkan/beyond-the-textbook

Kullanıcı proje başlangıcının üç ayrı anlamlı commit ile bu depoya aktarılmasını istedi. Başlangıç commit'leri özel dosyaların Git dışında tutulmasını, prototip ve geliştirme belgelerini, ardından projenin hedefini ve çalıştırma bilgisini kapsar. Yerel Git geçmişindeki iki prototip yayın kaydı korunur.

Sonraki geliştirmelerde varsayılan yaklaşım, değişiklikleri yerelde bırakmak ve kullanıcının her adımı kendisinin aktarmasıdır; açıkça istenirse commit ve push yapılabilir. PDF, ham kitap çıkarımı, ZIP arşivleri ve `.env` dosyaları `.gitignore` kapsamındadır.
