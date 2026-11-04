# Devralan ajan için güncel not

4 Kasım 2026. Önce AGENTS.md ve ARCHITECTURE.md sözleşmelerini oku. README çalıştırma ve ders kapsamını, PROJE-DURUMU güncel durumu açıklar.

Kullanıcı tüm geliştirilmiş konuların §3.1 derinliğinde olmasını istedi. §1.1, §1.2, §2.1–§2.7, §3.1 ve §4.1 hazır durumdaydı; kullanıcı 4. üniteyi (§4.2, §4.3 ve §4.5) kaliteli bir yapı ile tamamlamayı istedi. Bölüm 4 böylece eksiksiz bitirilmiştir (§4.2 homojen/karakteristik denklem, §4.3 belirsiz katsayılar/D-operatörü/parametrelerin değişimi, §4.5 karar matrisi, Cauchy-Euler ve teşhis simülatörü).

Yeni rehber verileri konu study.js dosyalarında; ortak arayüz core/study-guide.js, MathML yardımcıları study/math.js içindedir.
- §2.1 deneyinin saf modeli models/separation.js ve denetleyicisi labs/separation/controller.js içindedir.
- §2.2 deneyinin saf modeli models/transformation.js ve denetleyicisi labs/transformation/controller.js içindedir.
- §2.3 deneyinin saf modeli models/exactness.js ve denetleyicisi labs/exactness/controller.js içindedir.
- §2.4 deneyinin saf modeli models/linear.js ve denetleyicisi labs/linear/controller.js içindedir.
- §2.5 deneyinin saf modeli models/solvable.js ve denetleyicisi labs/solvable/controller.js içindedir.
- §2.6 deneyinin saf modeli models/reduction.js ve denetleyicisi labs/reduction/controller.js içindedir.
- §2.7 deneyinin saf modeli models/summary.js ve denetleyicisi labs/summary/controller.js içindedir (10 meydan okuma denklemli Teşhis Simülatörü ve 10 yöntemli Karar Ağacı & İndirgeme Matrisi).
- §4.1 deneyinin saf modeli models/linear-operator.js ve denetleyicisi labs/operator/controller.js içindedir (üç operatör, sekiz test fonksiyonu, α/β süperpozisyon karşılaştırması ve homojen rozeti).
- §4.2 deneyinin saf modeli models/complementary.js ve denetleyicisi labs/complementary/controller.js içindedir (dört analitik aile, çift eğrili A/B karşılaştırması, kök parametreleri ve geçersiz veri koruması).
- §4.3 deneyinin saf modeli models/particular.js ve denetleyicisi labs/particular/controller.js içindedir (dört analitik aile, toplam vs özel çözüm ayrıştırması, rezonans ve logaritmik integral koruması).
- §4.5 deneyinin saf modeli models/linear-summary.js ve denetleyicisi labs/linear-summary/controller.js içindedir (10 yöntemli lineer operatör karar matrisi ve 10 kartlı interaktif teşhis simülatörü).
- Bölüme özel türev/integral hızlı başvuru verisi lessons/math-reference.js içindedir; app.js yalnız seçili bölümün kayıtlarını sağdan açılan yerel `<dialog>` içine basar. Arayüz etiketleri i18n.js, görünüm stilleri styles.css içindedir.

82 test geçmektedir. §4.2'nin 40 blok ve 159 satır içi, §4.3'ün 25 blok ve 156 satır içi, §4.5'in 19 blok ve 154 satır içi formülü build_math.py hattında üretilmekte ve MathML açık mrow kökleri tam denetlenmektedir.

Kaynak ve arşivler Git dışında tutulur. Hosting ayarlarını değiştirme; LLM henüz yoktur. Kullanıcı yeni adım seçene kadar yeni konuya geçme. Kullanıcı açıkça istemedikçe commit/push yapma.
