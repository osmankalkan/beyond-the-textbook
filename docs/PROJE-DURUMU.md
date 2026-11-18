# Güncel proje durumu

Son güncelleme: 8 Kasım 2026.

Yirmi altı çift dilli ders hazırdır: §1.1, §1.2, §2.1–§2.7, §3.1, §4.1–§4.5, §6.1–§6.7 ve §7.1–§7.5. Bölüm 1, 2, 4, 6 ve 7 eksiksiz tamamlanmıştır:

| Bölüm | Konular | Temel Kapsam ve Atölyeler |
| :--- | :--- | :--- |
| **Bölüm 1** | §1.1, §1.2 | Fiziksel modeller (atış/tank), ODE/PDE sınıflandırma, Picard varlık ve teklik teoremi |
| **Bölüm 2** | §2.1 – §2.7 | Değişken ayırma, homojen/özel dönüşümler, tam denklem & integrasyon çarpanı, lineer & Bernoulli, Clairaut, mertebe indirgeme, 10 yöntemli Karar Ağacı |
| **Bölüm 3** | §3.1 | Newton soğuma yasası, ara gözlem kalibrasyonu ve geçici rejim analizi |
| **Bölüm 4** | §4.1 – §4.5 | D-operatörü, süperpozisyon, karakteristik kökler, belirsiz katsayılar, Wronskian, Cauchy–Euler ve lineer teşhis simülatörü |
| **Bölüm 6** | §6.1 – §6.7 | Laplace çekirdeği, Heaviside basamağı, Dirac süzme, ters dönüşüm & konvolüsyon, IVP (ZIR/ZSR), SDOF/RLC/kiriş uygulamaları, 10 yöntemli Laplace teşhis simülatörü |
| **Bölüm 7** | §7.1 – §7.5 | Düzlemde parçacık (dikdörtgen/kutupsal), n katlı kesme binası M/C/K matrisleri, durum uzayı; diferansiyel operatör determinantı φ(D), serbest sabit elemesi, Cramer operatör kuralı, üstel kaydırma ve rezonans; s-uzayında matris sistemi, başlangıç koşullarının doğrudan soğurulması (elemesiz IVP), s-uzayında Cramer kuralı, ZIR/ZSR ayrışması, 2. kaydırma teoremi ile Heaviside gecikmeli zorlamaları ve kutup sadeleşmesi; durum-uzayı matris yöntemi ẋ = Ax + f(t), özdeğer spektrumu, faz düzleminde değişmez özvektör ışınları, eyer noktası ve sönümlü sarmal odak, kusurlu matrislerde genelleştirilmiş özvektör zinciri (A-λI)v₂ = v₁, temel matris X(t) evirtimi, varyasyon yöntemiyle sec(t) standart dışı zorlaması ve ln\|cos t\| logaritmik çözümleri, çok serbestlik dereceli binalarda modal ayrışma; §7.5 üç yöntem sentezi (Operatör, Laplace, Matris), 60 saniyelik yöntem karar algoritması, 10 temsilci sınav kartı teşhis simülatörü ve 22 puanlık bölüm kapanış sınav kliniği |

Her konu 11-14 soru, 4 çözümlü sınav vakası (20-22 puan), 2 rehberli düşünme yolu, interaktif laboratuvar ve çift dilli formüller içerir. Bölüm 6 ve Bölüm 7 dersleri ayrıca kavramsal "Zihin Modeli", "Pratik Kontrol", "İşaret Kuralı", "Sık Hata" ve "Bağımsız Doğrulama" kutularıyla donatılmıştır.

179 otomatik test geçer. Yirmi altı dersin eşlenmiş LaTeX blokları üretim hattında doğrulanır; ham MathML kökleri açık mrow ile denetlenmiştir. Satır içi MathML pipeline'ı tüm bölümlerde eksiksiz çalışır. Bölüm 6 laboratuvar denetleyicileri, §7.1 parçacık/kesme binası atölyesi, §7.2 operatör sistemleri atölyesi, §7.3 Laplace sistemleri atölyesi, §7.4 matris sistemleri atölyesi ve §7.5 sistemler karar matrisi & teşhis simülatörü standart .sep-lab yapısına ve responsive SVG grafiklerine kavuşturulmuştur. `core/study-guide.js` içindeki esnek yerelleştirme ve nesne açma desteği (`loc()`) sayesinde tüm tahmin ve klinik seçenekleri nesne-dizge uyumsuzluğu olmadan kararlı şekilde görüntülenir.

Her hazır dersin okuma kenar çubuğunda bölüme özel bir “Türev & integral kuralları” düğmesi vardır. Düğme, sağdan açılan bir panelle yalnız o derste kullanılan türev ve integral alma kurallarını iki dilde gösterir; paneldeki formüller MathML olarak dizilir, klavye odağı panele taşınır ve Escape ile kapanır.

Hesap veya LLM entegrasyonu yoktur. Notlar/ilerleme yerel tarayıcıda ders kimliğine göre tutulur. Kaynak PDF dağıtım ve Git dışıdır. npm start yerel adresi bildirir; port 4317 doluysa sonraki port kullanılır.

GitHub: https://github.com/osmankalkan/beyond-the-textbook . Yapılan son geliştirmeler yereldedir; kullanıcı açıkça istemedikçe commit/push yapılmaz ve kullanıcı incelemesi beklenir.

## 10 Kasım 2026 — varsayılan çalışma arayüzü
Onaylanan Ders Defteri/laboratuvar birleşimi artık parametresiz açılışta varsayılandır. Renk tokenları, görünüm katmanları ve ortak çalışma araçları dist/focus-preview/ altındadır. Kronometre, 25/5 sayaç, isteğe bağlı bitiş sesi, açık/koyu tema, yazı boyutu ve odak modu gerçek ders uygulamasına bağlanmıştır. Sayaç aynı sayfadaki ders/görünüm geçişlerinde çalışır; tam yenilemede sıfırlanır. Önceki arayüz ?ui=classic ile açılabilir. Ders verileri ve mevcut ilerleme kayıtları aynı uygulama tarafından yönetilir.

## 10 Kasım 2026 — türev ve integral başvuru kapsamı
§7.5 için operatör, Laplace ve matris yöntemlerini kapsayan çift dilli başvuru listesi eklendi. §4.4 Euler kuralları ayrı veri kaydı olarak tanımlandı ve konunun işlendiği §4.5 paneline de eklendi; §4.4 katalogda bağımsız bir hazır ders değildir. Euler dönüşümünde x > 0 koşulu, birinci/ikinci/üçüncü türev ve logaritmik integral değişkeni belirtilir. Kapsam testi artık hazır dersleri doğrudan katalogdan alır; 179 test geçer. §7.5 İngilizce masaüstü ve §4.5 Türkçe 390px panel açılışı kontrol edildi.

## 18 Kasım 2026 — ikinci kitap (Kurose & Ross, 8. Baskı) ve §1.4 paket iletim laboratuvarı
İkinci kitap olarak James F. Kurose & Keith W. Ross’un *Computer Networking: A Top-Down Approach* (8th Edition, Pearson, 2021; 775 PDF sayfası, `pdfPageOffset: 11`) kitabı mevcut Xie (2010) diferansiyel denklemler kitabı korunarak `kurose-ross-8e` kimliğiyle kataloga eklendi. 8 ana bölümün tamamı (`1.1`–`8.10`) Türkçe ve İngilizce içindekiler haritası olarak tanımlandı.

İlk hazır ders olarak **§1.4 (§1.3.1 ile bütünleşik): İletim gecikmesi, yayılma gecikmesi ve store-and-forward paket anahtarlama** (`kurose-ross-8e:1.4`, basılı s.23–26 ve 35–46, PDF s.34–37 ve 46–57; Problemler s.67–75, PDF s.78–86) tamamlandı:
- **Kaynak şekil çıkarımı ve telif ayrımı:** Kaynak PDF’deki Şekil 1.11 (s.24, PDF s.35), Şekil 1.12 (s.25, PDF s.36), Şekil 1.16 (s.36, PDF s.47), Şekil 1.17 (s.38, PDF s.49) ve Şekil 1.27 (s.75, PDF s.86) yüksek çözünürlüklü olarak `private/book/kurose-ross-8e-figures/` ve `artifacts/kurose-ross-8e/` altına manifestosuyla çıkarıldı (Git ve dağıtım dışı). Uygulama içinde ise telif sorunu taşımayan ve doğrudan matematiksel model durumundan (`dist/models/packet-delay.js`) çizilen özgün SVG/DOM uyarlaması (`dist/labs/packet-delay/controller.js`) kuruldu.
- **Etkileşimli laboratuvar:** Gönderici, 1 veya 2 yönlendirici ve alıcı topolojisi; paket boyutu \(L\), paket sayısı \(P\), bağlantı hızları \(R_1, R_2, R_3\), mesafeler \(d_1, d_2, d_3\) ve yayılma hızı \(v\) kontrolleri; store-and-forward ve karşılaştırmalı cut-through modu; başlat, duraklat, önceki olay, tek olay ilerlet, sıfırla, hız seçimi ve hareketi azalt (`prefers-reduced-motion`) desteği; canlı bit-dalgası boru görünümü, uzay–zaman (trellis) diyagramı ve tıklanabilir ayrık olay kaydı.
- **Rehberli çalışma, sınav kliniği ve doğrulama:** 2 kavramsal tahmin, ikişer 5 adımlı türetim yolu, 22 puanlık 4 tam çözümlü sınav kliniği vakası, 12 özgün soru, 13 blok ve 92 satır içi eşlenmiş MathML formülü ve §1.4 hızlı başvuru çekmecesi eklendi. Toplam 185 otomatik test (`npm test`), `python3 build_math.py` ve `git diff --check` hatasız geçmektedir.
