# Proje durumu ve devam notları

Son düzenleme: 2 Kasım 2026.

## Amaç

Beyond the Textbook projesiyle farklı kitapları, Markdown temelli dersler, etkileşimli modeller, alıştırmalar ve ileride kaynak gösteren LLM desteğiyle çift dilli (Türkçe ve İngilizce) kişisel bir öğrenme uygulamasına dönüştürmek. İlk örnek olan Wei-Chau Xie'nin *Differential Equations for Engineers* kitabının §3.1 bölümüyle başladı; proje küçük ve doğrulanmış adımlarla başka bölümlere ve kitaplara genişletilecek.

## Mevcut sürüm

- **Kaynak kitap:** Wei-Chau Xie, *Differential Equations for Engineers*, Cambridge University Press, 2010. Kullanıcının PDF'si 568 sayfa.
- **İşlenen bölüm:** §3.1 Heating and Cooling / Isınma ve Soğuma, basılı s.87–90 (Bölüm 3 sonu problemleri s.130); PDF s.105–108, 148.
- **Çift dilli çalışma alanı (`TR | EN`):**
  - Türkçe (`dist/lesson.md`) ve İngilizce (`dist/lesson-en.md`) ders notları, kaynağa dayanan etkileşimli çalışma uyarlamalarıdır. Dokuz LaTeX formülünün MathML gösterimi her iki dilde de `build_math.py` ve `dist/math.json` ile birebir senkronizedir.
  - Arayüz metinleri (`dist/i18n.js`) ve ders/alıştırma kataloğu (`dist/content.js`) üst çubuktaki `TR | EN` seçiciyle sayfa yenilenmeden ve simülasyon durumu kaybolmadan anında dil değiştirir.
- **İki deney ve rehberli laboratuvar:**
  - Newton soğuma modeli (Örnek 3.1) ve geri beslemeli bina ısıtması (Örnek 3.2).
  - İki senaryoyu aynı grafikte karşılaştırma (**A/B karşılaştırma**), saf kalıcı rejim eğrisini geçici + kalıcı tam çözümden ayrı çizme, ileri Euler karşılaştırması, zaman imleci / oynatma, anlık türev/rejim denetçisi, CSV ve SVG indirme.
  - **Rehberli çalışma tezgahı:** Kavramsal tahmin senaryoları, ara gözlemden deneysel $k$ ve süre kalibrasyon hesaplayıcısı, bina için $r = K_2/K_1$ geri besleme tasarım hesaplayıcısı ve 5 adımlı analitik türetim.
- **Vize & Final Çözüm Kliniği ve 8 Alıştırma:**
  - Kitabın 130. sayfasındaki **Problem 3.1** (zamanla değişen ortamda adli tıp ölüm saati tayini — integral çarpanı) ve **Problem 3.2** (ısıtıcısız atölyede günlük sıcaklık ekstremumları) için 4 adımlı çözüm şablonu, sınav tuzakları ve adım adım tam çözümler.
  - Sekiz aşamalı sınav/alıştırma sorusu, çoktan seçmeli ve sayısal cevap kontrolü, sırayla açılan ipuçları ve çözüm yöntemi özetleri.
- **Kitaplık ve yerel depolama:**
  - `#library` görünümüyle kitap ve hazır ders seçimi.
  - Notlar (`denklem-v1-notes`), ilerleme (`denklem-v1-progress`), aktif ders (`denklem-v1-active-lesson`) ve dil tercihi (`denklem-v1-lang`) aynı tarayıcının yerel depolamasında tutulur; eski tekil kayıtlar otomatik olarak ders kimliği (`xie-2010:3.1`) altına taşınır.
- **Kitap haritası:** 12 ana bölümü ve alt başlıkları Türkçe ve İngilizce olarak içerir; her iki dilde arama yapılabilir. §3.1 dışındaki bölümler henüz derslere dönüştürülmemiştir.
- **Mimari sözleşme:** `ARCHITECTURE.md` dosyası projenin derlemesiz (buildless) yapısını, kırmızı çizgilerini ve ajan çalışma protokolünü tanımlar.
- LLM API bağlı değildir; sahte sohbet arayüzü gösterilmez.

## Çalıştırma ve giriş

`npm start` ardından http://127.0.0.1:4317 adresini açın (`4317` portu doluysa sunucu otomatik olarak `4318` gibi bir sonraki boş porta geçer). Çalışan uygulamada ChatGPT hesabı veya başka bir giriş gerekmez. Node.js kurulu olmalıdır; `npm install` gerekmiyor.

Mevcut özel yayın: https://denklem-atolyesi-xie-20261101.readyrice1025.chatgpt.site

Bu adresin ChatGPT giriş ekranı, Sites üzerindeki owner-private erişim ayarından kaynaklanır. Uygulamanın kaynak kodunda giriş zorunluluğu yoktur.

## Doğrulananlar

- **Yedi otomatik test (`npm test`) geçti:**
  1. Kitap Örnek 3.1: kalibrasyon, ara gözlem, toplam ve kalan ek süre, yarılanma süresi.
  2. Denge, ısınma ve sonlu sürede erişilemeyen hedef durumları.
  3. Adım küçüldükçe ileri Euler yönteminin analitik çözüme yakınsaması.
  4. Bina başlangıç koşulu ve analitik çözümün bağımsız RK4 integrasyonuyla uyumu.
  5. Kitap Örnek 3.2: 3 °C kalıcı genlik sınırı için gereken geri besleme oranı.
  6. Katalog yapısı (`dist/content.js`), eski not/ilerleme verilerinin ders kimliğine migrasyonu ve geçici + kalıcı rejim toplamı.
  7. Çift dilli (`TR` / `EN`) arayüz sözlüğü (`UI_STRINGS`), ders/soru/ipucu eşliği ve `lesson.md` $\leftrightarrow$ `lesson-en.md` $\leftrightarrow$ `math.json` formül senkronizasyonu.
- `dist/app.js` içindeki tüm `t(...)` anahtarlarının ve `#id` seçicilerinin `dist/i18n.js` ve `dist/index.html` ile sıfır eksik ve sıfır fazlalıkla eşleştiği denetlendi.

## Dosyalar

```text
beyond-the-textbook/
├── README.md                  Kısa tanıtım ve çalıştırma komutları
├── AGENTS.md                  Geliştirme oturumları için hızlı bağlam ve kurallar
├── ARCHITECTURE.md            Mimari şartname ve bağlayıcı ajan sözleşmesi
├── package.json
├── server.mjs                 Yerel statik HTTP sunucusu (otomatik port + no-cache)
├── build_math.py              Denetlenmiş LaTeX → MathML eşlemesi (TR & EN senkron)
├── dist/                      Yayımlanacak derlemesiz istemci uygulaması
│   ├── index.html, styles.css, app.js
│   ├── i18n.js                TR / EN arayüz sözlüğü ve yerelleştirme yardımcıları
│   ├── content.js             Çift dilli kitap/ders kataloğu, laboratuvar ve soru verisi
│   ├── models.js              Saf analitik ve sayısal model fonksiyonları
│   ├── lesson.md, lesson-en.md, math.json
│   └── vendor/                Yerel Markdown görüntüleyicisi + lisansı
├── tests/models.test.mjs      Model, katalog ve çift dilli senkronizasyon testleri
├── docs/
│   ├── PROJE-DURUMU.md        Bu durum belgesi
│   ├── DEVIR-NOTU.md          Ayrıntılı devir ve mimari geçmiş notu
│   └── onizleme.jpg           İlk prototip QA ekran görüntüsü
├── private/book/              Yerel kaynak kitap + ham çıkarım; Git dışında
├── artifacts/                 İlk prototip kaynak ZIP'i; Git dışında
└── .openai/hosting.json       Mevcut özel yayın kimliği
```

## Sonraki küçük adımlar

Bunlar önerilen çalışma dilimleridir; henüz kullanıcı tarafından sıraya konmuş değildir:

1. Çift dilli §3.1 çalışma alanını kullanarak içerik, okunabilirlik ve deney akışı üzerinde geri bildirim toplamak.
2. İkinci bir bölümü (ör. §2.1, §2.4 veya §3.2) seçmek, kaynak PDF'den doğrulamasını yapmak, Türkçe/İngilizce Markdown ve etkileşimli modelini eklemek.
3. LLM için sunucu uç noktası, kaynak gösterme (sayfa/bölüm atfı) ve aşamalı ipucu davranışını tasarlamak; gerçek API erişimi sağlandığında bağlamak.
4. İstenirse giriş gerektirmeyen genel bir statik internet yayını hazırlamak.

## GitHub yaklaşımı

Depo: https://github.com/osmankalkan/beyond-the-textbook

Varsayılan yaklaşım, değişiklikleri yerelde bırakmak ve kullanıcının istediği adımları commit/push etmektir; açıkça istenirse commit ve push yapılabilir. PDF, ham kitap çıkarımı, ZIP arşivleri ve `.env` dosyaları `.gitignore` kapsamındadır.
