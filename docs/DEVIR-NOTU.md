# Devralan ajan için güncel not

4 Kasım 2026. Önce AGENTS.md ve ARCHITECTURE.md sözleşmelerini oku. README çalıştırma ve ders kapsamını, PROJE-DURUMU güncel durumu açıklar.

Kullanıcı tüm geliştirilmiş konuların §3.1 derinliğinde olmasını istedi. §1.1, §1.2, §2.1, §2.2, §2.3, §2.4, §2.5 hazır durumdaydı; kullanıcı §2.6 (Basit yüksek mertebe denklemler) ve §2.7 (Özet: yöntem seçme sanatı) bölümlerini bitirmeyi ve özellikle §2.7 özet kısmını daha güzel, interaktif ve pekiştirici kılmayı istedi. Her iki bölüm §3.1 derinlik standardı ve buildless mimariyle tamamlandı. Bölüm 2 böylece tam olarak tamamlanmıştır.

Yeni rehber verileri konu study.js dosyalarında; ortak arayüz core/study-guide.js, MathML yardımcıları study/math.js içindedir.
- §2.1 deneyinin saf modeli models/separation.js ve denetleyicisi labs/separation/controller.js içindedir.
- §2.2 deneyinin saf modeli models/transformation.js ve denetleyicisi labs/transformation/controller.js içindedir.
- §2.3 deneyinin saf modeli models/exactness.js ve denetleyicisi labs/exactness/controller.js içindedir.
- §2.4 deneyinin saf modeli models/linear.js ve denetleyicisi labs/linear/controller.js içindedir.
- §2.5 deneyinin saf modeli models/solvable.js ve denetleyicisi labs/solvable/controller.js içindedir.
- §2.6 deneyinin saf modeli models/reduction.js ve denetleyicisi labs/reduction/controller.js içindedir.
- §2.7 deneyinin saf modeli models/summary.js ve denetleyicisi labs/summary/controller.js içindedir (10 meydan okuma denklemli Teşhis Simülatörü ve 10 yöntemli Karar Ağacı & İndirgeme Matrisi).

58 test geçmektedir. §2.6'nın 57 formül bloğu ve 92 satır içi formülü; §2.7'nin 8 formül bloğu ve 67 satır içi formülü build_math.py hattında üretilmekte ve MathML açık mrow kökleri tam denetlenmektedir.

Kaynak ve arşivler Git dışında tutulur. Hosting ayarlarını değiştirme; LLM henüz yoktur. Kullanıcı yeni adım seçene kadar yeni konuya geçme. Kullanıcı açıkça istemedikçe commit/push yapma.
