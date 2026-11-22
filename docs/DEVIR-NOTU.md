# Devralan ajan için güncel not

5 Kasım 2026. Önce AGENTS.md ve ARCHITECTURE.md sözleşmelerini oku. README çalıştırma ve ders kapsamını, PROJE-DURUMU güncel durumu açıklar.

Kullanıcı tüm geliştirilmiş konuların §3.1 derinliğinde olmasını ve 6. bölüm ile 7. bölümün tamamının bitirilmesini istedi. Bölüm 6'nın tüm alt başlıkları (§6.1–§6.7) ve Bölüm 7'nin tüm alt başlıkları (§7.1, §7.2, §7.3, §7.4, §7.5) eksiksiz, kaliteli ve derinlikli bir yapıyla tamamlanmıştır.

Yeni rehber verileri konu study.js dosyalarında; ortak arayüz core/study-guide.js, MathML yardımcıları study/math.js içindedir.
| Bölüm Grubu | Kapsam | Saf Matematik Modeli (`dist/models/`) | İnteraktif Laboratuvar (`dist/labs/`) |
| :--- | :--- | :--- | :--- |
| **Bölüm 1 & 3** | §1.1, §1.2, §3.1 | `concepts.js`, `cooling.js` | `concepts/`, `heating` (yerleşik) |
| **Bölüm 2** | §2.1 – §2.7 | `separation.js`, `transformation.js`, `exactness.js`, `linear.js`, `solvable.js`, `reduction.js`, `summary.js` | `separation/`, `transformation/`, `exactness/`, `linear/`, `solvable/`, `reduction/`, `summary/` (10-kart Teşhis) |
| **Bölüm 4** | §4.1 – §4.5 | `linear-operator.js`, `complementary.js`, `particular.js`, `linear-summary.js` | `operator/`, `complementary/`, `particular/`, `linear-summary/` (10-kart Operatör) |
| **Bölüm 6** | §6.1 – §6.7 | `laplace.js`, `heaviside.js`, `dirac.js`, `inverse-laplace.js`, `laplace-ode.js`, `laplace-applications.js`, `laplace-summary.js` | `laplace/`, `heaviside/`, `dirac/`, `inverse-laplace/`, `laplace-ode/`, `laplace-applications/`, `laplace-summary/` (10-kart Laplace) |
| **Bölüm 7** | §7.1 – §7.5 | `systems.js`, `operator-systems.js`, `laplace-systems.js`, `matrix-systems.js`, `systems-summary.js` | `systems/` (parçacık + kesme binası), `operator-systems/` (operatör determinantı, eleme, Cramer ve rezonans), `laplace-systems/` (s-uzayında matris, başlangıç koşulları soğurma, ZIR/ZSR, 2. kaydırma gecikmesi), `matrix-systems/` (durum-uzayı matrisi, özdeğer spektrumu, değişmez özvektör ışınları, eyer noktası, karmaşık sarmal, kusurlu genelleştirilmiş zincir, temel matris evirtimi ve sec(t) zorlaması), `systems-summary/` (üç yöntem karşılaştırma matrisi ve 10 temsilci sınav kartı teşhis simülatörü) |
- Bölüme özel türev/integral hızlı başvuru verisi lessons/math-reference.js içindedir; app.js yalnız seçili bölümün kayıtlarını sağdan açılan yerel `<dialog>` içine basar. Arayüz etiketleri i18n.js, görünüm stilleri styles.css içindedir.

179 test geçmektedir. Bölüm 6 ve Bölüm 7 (§7.1, §7.2, §7.3, §7.4, §7.5) derslerinin display blokları ve satır içi formülleri build_math.py hattında üretilmekte ve MathML açık mrow kökleri tam denetlenmektedir. Markdown metinlerinde hiçbir ham LaTeX komutu, çıplak dolar işareti veya işlenmemiş alert etiketi bırakılmamıştır.
- Bölüm 6 laboratuvar denetleyicileri (§6.2, §6.3, §6.4, §6.5, §6.6, §6.7) standart `.sep-lab` mimarisine, `<svg class="cx-chart">` çizim modeline ve tam çift dilli i18n sistemine kavuşturulmuştur. `[object Object]` grafik hatası ve stillendirilmemiş kontrol paneli sorunu tamamen giderilmiştir.
- `dist/core/study-guide.js` içine `loc()` güvenli unwrap fonksiyonu eklenerek hem ham metin hem yerelleştirilmiş `{tr, en}` nesneleri hem de seçim şıklarındaki yapı farklılıkları (prompt vs question, text vs isCorrect) esnek biçimde karşılanmıştır; `app.js` `activateLab()` fonksiyonunda eski laboratuvar elemanlarının gizlenme sırası ve hata yakalaması sağlamlaştırılmıştır.
- Bölüm 6 ders anlatımlarının tümüne (§6.1–§6.7) ve §7.1'e hem Türkçe hem İngilizce Markdown dosyalarında öğrenmeyi kolaylaştıran, sıkıcılığı kıran ve pratik sınav refleksleri kazandıran `> **ZİHİN MODELİ:**` ve `> **PRATİK İPUCU:**` blokları eklenmiştir. Bu bloklar LaTeX token sayılarını değiştirmemek için temiz Unicode matematik notasyonuyla biçimlendirilmiştir.

Kaynak ve arşivler Git dışında tutulur. Hosting ayarlarını değiştirme; LLM henüz yoktur. Kullanıcı yeni adım seçene kadar yeni konuya geçme. Kullanıcı açıkça istemedikçe commit/push yapma.

10 Kasım 2026: Kullanıcı birleşik arayüzü proje için onayladı. index.html artık varsayılan olarak focus/notebook görünümünü açar. Paylaşılan tokenlar ve görünüm denetleyicisi dist/focus-preview/ içindedir; klasör adı geçmiş önizleme aşamasından kalmıştır. Yayın/commit için ayrıca kullanıcı talimatı gerekir.

18 Kasım 2026: İkinci kitap olarak Kurose & Ross *Computer Networking: A Top-Down Approach* (8. Baskı, Pearson, 2021) eklendi; Xie kitabının geliştirmesine ara verildi ve tüm mevcut dersleri/testleri korundu. İlk geliştirilen ağ konusu `kurose-ross-8e:1.4` (§1.3.1 store-and-forward ve §1.4 iletim/yayılma gecikmeleri, BDP, boru hattı ve darboğaz kuyruğu) olup modeli `dist/models/packet-delay.js`, laboratuvarı `dist/labs/packet-delay/controller.js`, ders verisi `dist/lessons/kurose-ross-8e/1-4/` altındadır. Ders notlarının (`lesson.md` ve `lesson-en.md`) her ana bölümüne kitaptaki şekillere (Şekil 1.11, 1.12, 1.16, 1.17, 1.19, 1.27 ve Problem P25–P27) tam atıflı 6 özgün SVG diyagram kartı (`<figure class="lesson-figure">`) gömülmüş ve kullanıcı bu görsel ders notu şablonunu sonraki konular için standart şablon olarak onaylamıştır.

19 Kasım 2026: Kurose & Ross **§1.1 (İnternet nedir? — `kurose-ross-8e:1.1`)** ve **§1.2 (Ağ kenarı: erişim ağları ve fiziksel ortamlar — `kurose-ross-8e:1.2`)** aynı 5'er özgün SVG diyagramlı görsel şablonda tamamlandı (`dist/models/internet-anatomy.js`, `dist/labs/internet-anatomy/`, `dist/models/network-edge.js`, `dist/labs/network-edge/`, `dist/lessons/kurose-ross-8e/1-1/` ve `1-2/`). `getMathReference` fonksiyonu çoklu kitapta bölüm numarası çakışmasını önleyecek şekilde önce `lessonId` ile arama yapacak biçimde güncellendi. Toplam **193 test** geçmektedir. Diğer dersleri kullanıcı yeni konu seçene kadar kendiliğinden geliştirme.

22 Kasım 2026: Kitap sırasındaki boşluk olan **§1.3 Ağ Çekirdeği (`kurose-ross-8e:1.3`)** tamamlandı. Ders verisi `dist/lessons/kurose-ross-8e/1-3/`, paket/devre karşılaştırması `dist/models/network-core.js`, çerçeve deneyi `dist/labs/network-core/controller.js` altında. §1.4 iletim/yayılma gecikmelerini ayrıntılı işler. §1.3 incelemesi sonrası sıradaki katalog başlığı §1.5 Protokol Katmanları ve Hizmet Modelleri.

Yerel tarayıcı incelemesinde §1.1 ve §1.2'nin rehber ve klinik verileri bulunduğu halde ilgili panellerin görünmediği doğrulandı. Bu dersler `paths[].prediction` ve `guidedTools.examCases` alanlarını kullanıyor. Ortak arayüz, tahminleri `studySupport.predictions`, vakaları `guidedTools.examClinic` alanından okuyor. §1.3 arayüzün kullandığı veri biçiminde çalışıyor.

22 Kasım 2026: **§1.5 Protokol Katmanları ve Hizmet Modelleri** (`kurose-ross-8e:1.5`) tamamlandı. Ders `dist/lessons/kurose-ross-8e/1-5/`, saf iz modeli `dist/models/protocol-layers.js`, lab `dist/labs/protocol-layers/controller.js` altında. Kullanıcı incelemesi bekleniyor.

22 Kasım 2026: Kullanıcının isteğiyle **Kurose & Ross 1. ünite (§1.1–§1.8)** tamamlandı. §1.6–§1.8 için savunma, tarih çizelgesi ve kapanış labları eklendi. §1.1–§1.2’de yukarıda kaydedilen rehber ve klinik görünürlüğü sorunu düzeltildi. §1.4’te sonlu tampon ve Traceroute yorumu işlendi. Sıradaki başlık 2. ünite §2.1 Ağ Uygulamalarının İlkeleri.

22 Kasım 2026: Kurose & Ross §2.1 tamamlandı. Ders `dist/lessons/kurose-ross-8e/2-1/`, iki deney `dist/labs/application-principles/controller.js` altında. Kullanıcı incelemesi sonrası sıradaki başlık §2.2 Web ve HTTP.
