# Güncel proje durumu

Son güncelleme: 5 Kasım 2026.

Yirmi üç çift dilli ders hazırdır: §1.1, §1.2, §2.1–§2.7, §3.1, §4.1–§4.5, §6.1–§6.7, §7.1 ve §7.2. Bölüm 1, 2, 4 ve 6 eksiksiz tamamlanmış; Bölüm 7’ye §7.1 ve §7.2 ile devam edilmiştir:

| Bölüm | Konular | Temel Kapsam ve Atölyeler |
| :--- | :--- | :--- |
| **Bölüm 1** | §1.1, §1.2 | Fiziksel modeller (atış/tank), ODE/PDE sınıflandırma, Picard varlık ve teklik teoremi |
| **Bölüm 2** | §2.1 – §2.7 | Değişken ayırma, homojen/özel dönüşümler, tam denklem & integrasyon çarpanı, lineer & Bernoulli, Clairaut, mertebe indirgeme, 10 yöntemli Karar Ağacı |
| **Bölüm 3** | §3.1 | Newton soğuma yasası, ara gözlem kalibrasyonu ve geçici rejim analizi |
| **Bölüm 4** | §4.1 – §4.5 | D-operatörü, süperpozisyon, karakteristik kökler, belirsiz katsayılar, Wronskian, Cauchy–Euler ve lineer teşhis simülatörü |
| **Bölüm 6** | §6.1 – §6.7 | Laplace çekirdeği, Heaviside basamağı, Dirac süzme, ters dönüşüm & konvolüsyon, IVP (ZIR/ZSR), SDOF/RLC/kiriş uygulamaları, 10 yöntemli Laplace teşhis simülatörü |
| **Bölüm 7** | §7.1, §7.2 | Düzlemde parçacık (dikdörtgen/kutupsal), n katlı kesme binası M/C/K matrisleri, durum uzayı; diferansiyel operatör determinantı φ(D), serbest sabit elemesi, Cramer operatör kuralı, üstel kaydırma ve rezonans |

Her konu 11-14 soru, 4 çözümlü sınav vakası (20-22 puan), 2 rehberli düşünme yolu, interaktif laboratuvar ve çift dilli formüller içerir. Bölüm 6, §7.1 ve §7.2 dersleri ayrıca kavramsal "Zihin Modeli", "Pratik Kontrol", "İşaret Kuralı", "Sık Hata" ve "Bağımsız Doğrulama" kutularıyla donatılmıştır.

158 otomatik test geçer. Yirmi üç dersin eşlenmiş LaTeX blokları üretim hattında doğrulanır; ham MathML kökleri açık mrow ile denetlenmiştir. Satır içi MathML pipeline'ı tüm bölümlerde eksiksiz çalışır. Bölüm 6 laboratuvar denetleyicileri, §7.1 parçacık/kesme binası atölyesi ve §7.2 operatör sistemleri atölyesi standart .sep-lab yapısına ve responsive SVG grafiklerine kavuşturulmuştur. `core/study-guide.js` içindeki esnek yerelleştirme ve nesne açma desteği (`loc()`) sayesinde tüm tahmin ve klinik seçenekleri nesne-dizge uyumsuzluğu olmadan kararlı şekilde görüntülenir.

Her hazır dersin okuma kenar çubuğunda bölüme özel bir “Türev & integral kuralları” düğmesi vardır. Düğme, sağdan açılan bir panelle yalnız o derste kullanılan türev ve integral alma kurallarını iki dilde gösterir; paneldeki formüller MathML olarak dizilir, klavye odağı panele taşınır ve Escape ile kapanır.

Hesap veya LLM entegrasyonu yoktur. Notlar/ilerleme yerel tarayıcıda ders kimliğine göre tutulur. Kaynak PDF dağıtım ve Git dışıdır. npm start yerel adresi bildirir; port 4317 doluysa sonraki port kullanılır.

GitHub: https://github.com/osmankalkan/beyond-the-textbook . Yapılan son geliştirmeler yereldedir; kullanıcı açıkça istemedikçe commit/push yapılmaz ve kullanıcı incelemesi beklenir.
