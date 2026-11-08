# Devralan ajan için güncel not

5 Kasım 2026. Önce AGENTS.md ve ARCHITECTURE.md sözleşmelerini oku. README çalıştırma ve ders kapsamını, PROJE-DURUMU güncel durumu açıklar.

Kullanıcı tüm geliştirilmiş konuların §3.1 derinliğinde olmasını ve 6. bölümün tamamının bitirilmesini istedi ("6. bölümün hepsini detaylı bitir kaliteli bir şey cıkar ortaya"). Bölüm 6'nın tüm alt başlıkları (§6.1, §6.2, §6.3, §6.4, §6.5, §6.6, §6.7) eksiksiz, kaliteli ve derinlikli bir yapıyla tamamlanmıştır. Ardından kullanıcının "7.1 yapar mısın" talebiyle Bölüm 7'nin giriş konusu (§7.1) aynı standartta hazırlanmıştır.

Yeni rehber verileri konu study.js dosyalarında; ortak arayüz core/study-guide.js, MathML yardımcıları study/math.js içindedir.
| Bölüm Grubu | Kapsam | Saf Matematik Modeli (`dist/models/`) | İnteraktif Laboratuvar (`dist/labs/`) |
| :--- | :--- | :--- | :--- |
| **Bölüm 1 & 3** | §1.1, §1.2, §3.1 | `concepts.js`, `cooling.js` | `concepts/`, `heating` (yerleşik) |
| **Bölüm 2** | §2.1 – §2.7 | `separation.js`, `transformation.js`, `exactness.js`, `linear.js`, `solvable.js`, `reduction.js`, `summary.js` | `separation/`, `transformation/`, `exactness/`, `linear/`, `solvable/`, `reduction/`, `summary/` (10-kart Teşhis) |
| **Bölüm 4** | §4.1 – §4.5 | `linear-operator.js`, `complementary.js`, `particular.js`, `linear-summary.js` | `operator/`, `complementary/`, `particular/`, `linear-summary/` (10-kart Operatör) |
| **Bölüm 6** | §6.1 – §6.7 | `laplace.js`, `heaviside.js`, `dirac.js`, `inverse-laplace.js`, `laplace-ode.js`, `laplace-applications.js`, `laplace-summary.js` | `laplace/`, `heaviside/`, `dirac/`, `inverse-laplace/`, `laplace-ode/`, `laplace-applications/`, `laplace-summary/` (10-kart Laplace) |
| **Bölüm 7** | §7.1 – §7.4 | `systems.js`, `operator-systems.js`, `laplace-systems.js`, `matrix-systems.js` | `systems/` (parçacık + kesme binası), `operator-systems/` (operatör determinantı, eleme, Cramer ve rezonans), `laplace-systems/` (s-uzayında matris, başlangıç koşulları soğurma, ZIR/ZSR, 2. kaydırma gecikmesi), `matrix-systems/` (durum-uzayı matrisi, özdeğer spektrumu, değişmez özvektör ışınları, eyer noktası, karmaşık sarmal, kusurlu genelleştirilmiş zincir, temel matris evirtimi ve sec(t) zorlaması) |
- Bölüme özel türev/integral hızlı başvuru verisi lessons/math-reference.js içindedir; app.js yalnız seçili bölümün kayıtlarını sağdan açılan yerel `<dialog>` içine basar. Arayüz etiketleri i18n.js, görünüm stilleri styles.css içindedir.

174 test geçmektedir. Bölüm 6 ve Bölüm 7 (§7.1, §7.2, §7.3, §7.4) derslerinin 24'er display bloğu ve satır içi formülleri build_math.py hattında üretilmekte ve MathML açık mrow kökleri tam denetlenmektedir. §7.4 kullanıcının "daha anlaşılabilir hazırla" direktifine uygun olarak özvektörlerin geometrik sezgisini (faz düzleminde hızın konuma paralel olduğu değişmez raylar), kusurlu matrislerde genelleştirilmiş özvektör zincirinin türev dengesini, temel matris evirtimini ve standart dışı sec(t) zorlamasını 5 kavramsal kutu (`ZİHİN MODELİ`, `PRATİK KONTROL`, `İŞARET KURALI`, `SIK HATA`, `BAĞIMSIZ DOĞRULAMA`) ile derinleştirmiştir.
- Bölüm 6 laboratuvar denetleyicileri (§6.2, §6.3, §6.4, §6.5, §6.6, §6.7) standart `.sep-lab` mimarisine, `<svg class="cx-chart">` çizim modeline ve tam çift dilli i18n sistemine kavuşturulmuştur. `[object Object]` grafik hatası ve stillendirilmemiş kontrol paneli sorunu tamamen giderilmiştir.
- `dist/core/study-guide.js` içine `loc()` güvenli unwrap fonksiyonu eklenerek hem ham metin hem yerelleştirilmiş `{tr, en}` nesneleri hem de seçim şıklarındaki yapı farklılıkları (prompt vs question, text vs isCorrect) esnek biçimde karşılanmıştır; `app.js` `activateLab()` fonksiyonunda eski laboratuvar elemanlarının gizlenme sırası ve hata yakalaması sağlamlaştırılmıştır.
- Bölüm 6 ders anlatımlarının tümüne (§6.1–§6.7) ve §7.1'e hem Türkçe hem İngilizce Markdown dosyalarında öğrenmeyi kolaylaştıran, sıkıcılığı kıran ve pratik sınav refleksleri kazandıran `> **ZİHİN MODELİ:**` ve `> **PRATİK İPUCU:**` blokları eklenmiştir. Bu bloklar LaTeX token sayılarını değiştirmemek için temiz Unicode matematik notasyonuyla biçimlendirilmiştir.

Kaynak ve arşivler Git dışında tutulur. Hosting ayarlarını değiştirme; LLM henüz yoktur. Kullanıcı yeni adım seçene kadar yeni konuya geçme. Kullanıcı açıkça istemedikçe commit/push yapma.
