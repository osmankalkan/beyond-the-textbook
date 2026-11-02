# Beyond the Textbook — devir notu

Tarih: 2 Kasım 2026. Bu dosya, başka bir agent'ın projeyi ve şimdiye kadar alınan kararları anlayıp çalışmaya devam edebilmesi için hazırlandı.

Bu bir durum kaydıdır; aşağıdaki gelecek fikirleri henüz kullanıcı tarafından verilmiş geliştirme görevleri değildir. Yeni çalışmaya başlamadan önce `ARCHITECTURE.md` sözleşmesini, kullanıcının seçtiği işi ve güncel dosyaları esas al.

## 1. Projenin amacı

Kullanıcı, kitap çalışırken konu anlatımını, deneyleri, alıştırmaları, sınav hazırlık kliniğini ve kendi notlarını aynı yerde **hem Türkçe hem İngilizce (`TR | EN`)** olarak kullanmak istiyor. Zamanla farklı kitaplar da eklenecek.

Genel proje ve arayüz adı **Beyond the Textbook**. Uygulama çoklu kitap ve ders yapısını destekleyen bir katalog (`dist/content.js`) ve `#library` görünümü üzerine kurulu; şu an içinde ilk kitap (Wei-Chau Xie) ve onun tam geliştirilmiş ilk dersi (**§3.1**) yer alıyor.

Öğrenme yaklaşımı: konuyu oku, sonucu tahmin et, parametreleri ve A/B senaryolarını değiştirerek dene, türetim adımlarını ve sınav kliniğini incele, soruları çöz ve kendi cümlelerinle not al. Matematiksel sonuçların kaynağı ve modelin varsayımları açık olmalı.

## 2. Şu anda hangi içerik var?

Kaynak, Wei-Chau Xie'nin *Differential Equations for Engineers* kitabı (Cambridge University Press, 2010). Kullanıcının yerel PDF'si 568 sayfa.

Yalnızca **§3.1 Heating and Cooling / Isınma ve Soğuma** tam ders ve laboratuvar olarak geliştirilmiş durumda. Kaynak aralığı basılı sayfa 87–90 ve Bölüm 3 sonu problemleri s.130 (PDF sayfa 105–108, 148). Hem Türkçe (`dist/lesson.md`) hem İngilizce (`dist/lesson-en.md`) ders notu kaynağa dayanan özgün çalışma uyarlamalarıdır.

Ders ve rehberli laboratuvar şu konuları kapsar:

- Fiziksel enerji dengesinden (Biot sayısı $\mathrm{Bi} \ll 1$) Newton'un soğuma denklemine geçiş.
- Değişkenleri ayırma (§2.1), başlangıç koşulu, denge çözümü, ısıl zaman sabiti ($\tau = 1/k$) ve yarılanma süresi ($t_{1/2} = \ln(2)/k$).
- Kitaptaki soğuma problemi (Örnek 3.1), ara gözlemden $k$ kalibrasyonu ve **toplam süre / gözlem sonrası kalan ek süre** ayrımı.
- Dış sıcaklığı sinüzoidal değişen ve oransal geri beslemeyle ısıtılan bina modeli (Örnek 3.2, §2.4 integral çarpanı).
- **Geçici (transient) ve kalıcı (steady-state) rejim ayrışımı**, kalıcı salınım genliği $A$, faz gecikmesi $\phi/\omega$ ve ilk periyottaki geçici aşım (overshoot).
- Analitik çözümle ileri Euler sayısal yaklaşımının karşılaştırılması (§10.1 bağlantısı).
- **Vize & Final Çözüm Kliniği (s.130):** Problem 3.1 (değişken ortam sıcaklığı $T_m(t) = 20e^{-0.02t}$ altında ölüm saati tayini) ve Problem 3.2 (ısıtıcısız atölyede günlük maksimum/minimum sıcaklıklar).

Kitabın 12 ana bölümü, alt başlıkları ve sayfaları Türkçe ve İngilizce olarak aranabilir bir haritada listeleniyor. **Haritada görünmesi, o bölümün dersinin hazır olduğu anlamına gelmiyor.**

## 3. Çalışan özellikler

| Alan | Mevcut davranış |
| --- | --- |
| Çift dilli yapı (`TR \| EN`) | Üst çubuktan tek tıkla (veya `?lang=en` / `?lang=tr` ile) tüm arayüz, ders notu, türetimler, sınav kliniği, sorular ve sayı biçimlendirmesi anında Türkçe / İngilizce arasında geçiş yapar |
| Kitaplık (`#library`) | Kitap kartları, hazır derslerin listesi, ders bazlı ilerleme rozeti ve doğrudan Ders / Sınav / Laboratuvar görünümüne geçiş |
| Ders notu (`#lesson`) | `dist/lesson.md` (TR) ve `dist/lesson-en.md` (EN), dokuz LaTeX bloğunun yerel MathML gösterimi, `.md` indirme |
| Deney laboratuvarı (`#lab`) | Rehberli çalışma ve Serbest deney modları, Soğuyan cisim ve Isıtılan bina modelleri, **A/B senaryo karşılaştırması**, saf kalıcı rejim eğrisi, ileri Euler eğrisi, anlık türev/rejim denetçisi |
| Rehberli araçlar | 5 kavramsal tahmin senaryosu (3 soğuma, 2 bina), ara gözlemden $k$ kalibrasyon hesaplayıcısı, bina için $r = K_2/K_1$ geri besleme hesaplayıcısı, 5'er adımlı analitik türetim |
| Vize & Final Kliniği | 4 adımlı sınav çözüm şablonu (blueprint) + Problem 3.1 ve Problem 3.2 için sınav tuzağı uyarıları ve adım adım MathML çözümleri |
| Sınav & Alıştırma (`#practice`) | 8 aşamalı soru (sayısal ve çoktan seçmeli), sırayla açılan ipuçları, çözüm yöntemi özeti |
| İlerleme ve Notlar (`#notes`) | Ders kimliği (`xie-2010:3.1`) bazında saklanan 9 adımlı ilerleme (1 ders + 8 soru) ve kişisel çalışma notları, Markdown indirme |
| Kitap haritası (`#map`) | 12 bölümde hem Türkçe hem İngilizce anahtar kelimelerle konu arama ve hazır olan §3.1 dersine bağlantı |

Hesap, giriş sistemi, bulut eşitlemesi, veritabanı veya çalışan LLM bağlantısı yok.

## 4. Teknik yapı ve dosyalar

Uygulama derleme gerektirmeyen (buildless) HTML, CSS ve JavaScript ES modülleriyle yazılmıştır.

| Dosya / klasör | Görevi |
| --- | --- |
| `README.md` | Kısa İngilizce proje açıklaması ve çalıştırma komutları |
| `AGENTS.md` | Repo içinde çalışırken izlenecek hızlı kurallar |
| `ARCHITECTURE.md` | Projenin bağlayıcı mimari şartnamesi, kırmızı çizgileri ve ajan sözleşmesi |
| `docs/PROJE-DURUMU.md` | Güncel proje özeti ve doğrulama durumu |
| `docs/DEVIR-NOTU.md` | Bu ayrıntılı devir belgesi |
| `dist/index.html` | Sayfa iskeleti, üst çubuk dil seçici (`TR \| EN`), menüler ve görünümler |
| `dist/styles.css` | Masaüstü ve mobil (~390px) duyarlı tasarım |
| `dist/app.js` | Etkileşimler, canlı dil geçişi, SVG grafik çizimi, kalibrasyon, alıştırmalar ve `localStorage` yönetimi |
| `dist/i18n.js` | `UI_STRINGS.tr` ve `UI_STRINGS.en` (260'ar anahtar), `normalizeLang`, `pickLang`, `deepLocalize`, `ui` |
| `dist/content.js` | Çoklu kitap kataloğu (`BOOKS`), çift dilli (`{ tr, en }`) ders, tahmin, türetim, sınav kliniği ve 8 soru verisi + depolama migrasyonu |
| `dist/models.js` | Soğuma (`cooling`, `calibrateK`, `targetTime`, `halfLife`, `eulerCooling`) ve bina (`building`, `buildingSteady`, `buildingTransient`, `buildingMetrics`, `rk4Step`) saf model fonksiyonları |
| `dist/lesson.md` | Türkçe ders metni (9 LaTeX formül bloğu ile) |
| `dist/lesson-en.md` | İngilizce ders metni (aynı 9 LaTeX formül bloğu ile) |
| `build_math.py` | `lesson.md` ve `lesson-en.md` içindeki LaTeX bloklarının birebir eşleştiğini doğrulayıp `dist/math.json` dosyasını üreten Python betiği |
| `dist/math.json` | Ders görünümünün kullandığı LaTeX → MathML eşlemesi |
| `dist/vendor/` | Yerel Markdown görüntüleyicisi Marked ve MIT lisansı |
| `server.mjs` | `dist/` sunan yerel HTTP sunucusu (`Cache-Control: no-cache` ve port doluysa otomatik sonraki porta geçiş destekli) |
| `tests/models.test.mjs` | Node.js ile çalışan 7 kapsamlı model, katalog ve çift dilli senkronizasyon testi |
| `.openai/hosting.json` | Mevcut Sites yayınıyla bağlantı bilgisi; koru |

## 5. Yerelde çalıştırma ve doğrulama

```sh
npm start
```

Varsayılan adres: `http://127.0.0.1:4317` (eğer `4317` doluysa otomatik olarak `4318` vb. açılır ve terminalde yazdırılır).

Testleri çalıştırmak için:

```sh
npm test
```

Formül eşlemesini yeniden üretmek ve `lesson.md` ile `lesson-en.md` arasındaki LaTeX blok eşliğini doğrulamak için:

```sh
python3 build_math.py
```

## 6. Matematikte ve çift dilli yapıda korunacak noktalar

- **Soğuma:** `T(t) = Tm + (Ti − Tm) exp(−kt)`. Üstel azalan şey ortamla sıcaklık farkıdır ($\theta = T - T_m$). Toplam soğuma süresi ($t_{\text{toplam}} = 60\text{ dk}$) ile gözlemden sonraki kalan ek süre ($\Delta t = 40\text{ dk}$) ayrımı korunmalıdır.
- **Bina:** `τ θ' + (1+r) θ = T1 sin(ωt)`. Genlik ve faz kartları **kalıcı rejime (steady-state)** aittir; grafikte **geçici + kalıcı tam çözüm** çizilir ve ilk periyottaki geçici aşım (overshoot) açıkça gösterilir.
- **Çift Dilli Simetri:** `dist/i18n.js` altındaki `UI_STRINGS.tr` ve `UI_STRINGS.en` anahtarları birebir aynı kalmalı; `dist/content.js` altındaki her yeni içerik `{ tr, en }` şemasıyla eklenmeli; `dist/lesson.md` ve `dist/lesson-en.md` içindeki `$$...$$` blokları birebir aynı sırada olmalıdır.

## 7. Devralan agent için ilk adımlar

1. Önce `ARCHITECTURE.md`, `AGENTS.md`, `README.md`, `docs/PROJE-DURUMU.md` ve bu dosyayı oku.
2. `git status` ile mevcut çalışma ağacını kontrol et.
3. `npm test` ve `python3 build_math.py` komutlarının temiz geçtiğini doğrula.
4. Kullanıcının seçtiği geliştirmeyi `ARCHITECTURE.md` içindeki kırmızı çizgilere (buildless yapı, sıfır bağımlılık, bilimsel doğruluk, TR/EN simetrisi) uyarak uygula.
5. Kullanıcı açıkça istemedikçe `git commit`, `git push` veya yayın komutu çalıştırma; değişiklikleri yerelde bırak.
