# Devralan ajan için güncel not

3 Kasım 2026. Önce AGENTS.md ve ARCHITECTURE.md sözleşmelerini oku. README çalıştırma ve ders kapsamını, PROJE-DURUMU güncel durumu açıklar.

Kullanıcı tüm geliştirilmiş konuların §3.1 derinliğinde olmasını istedi. §1.1 / §1.2 / §2.1 revizyonunu olumlu değerlendirdi ve belgelerin güncellenip üç commit halinde GitHub’a gönderilmesini istedi. §2.2 aynı standartla eklendi ve üç commit halinde gönderildi. §2.3 de aynı standartla eklendi ve gönderildi. §2.4 de aynı standartla eklendi; inceleme ve commit/push kararı bekliyor. Ayrıntılı uygulama kaydı QUALITY-REVISION.md içindedir; REVIEW-1-1 ve REVIEW-1-2 tarihsel ilk teslim kayıtlarıdır.

Yeni rehber verileri konu study.js dosyalarında; ortak arayüz core/study-guide.js, MathML yardımcıları study/math.js içindedir. §2.1 deneyinin saf modeli models/separation.js ve denetleyicisi labs/separation/controller.js içindedir. §2.2 deneyinin saf modeli models/transformation.js ve denetleyicisi labs/transformation/controller.js içindedir. §2.3 deneyinin saf modeli models/exactness.js ve denetleyicisi labs/exactness/controller.js içindedir. §2.4 deneyinin saf modeli models/linear.js ve denetleyicisi labs/linear/controller.js içindedir. app.js kabuk ve eski sıcaklık adaptörünü tutar. Bu sınırları koru.

§2.1’in ilk üç soru indeksi eski kullanıcı kayıtlarını korur; sekiz yeni soru sonlarına eklenmiştir. §2.2, §2.3 ve §2.4 için önceki kullanıcı ilerlemesi yoktur; 11 soru yeni indekslerdir. Oturumdaki rehber adımları ve deney parametreleri dil değişiminde korunur, yenilemede sıfırlanabilir. Not ve puan ilerlemesi kalıcı yerel kayıttır. Sınav puanları öz denetim içindir; otomatik notlandırılmış gerçek sınav sistemi yoktur.

41 test geçmektedir. Kritik kutup, dal ve başlangıç verisi durumları ayrıca model testindedir. Altı Markdown çiftinin blok formüllerini build_math.py denetler; §2.2’nin 36, §2.3’ün 90, §2.4’ün 77 bloğu tekil ve iki dilde eşlenmiştir. Ham MathML eklenmiş notlar değiştiğinde study.js ile eşlik ve açık mrow kökü ayrıca kontrol edilir. §3.1’in eski laboratuvarına yeni rehber yanlışlıkla gösterilmemelidir.

Kaynak ve arşivler Git dışında tutulur. Hosting ayarlarını değiştirme; LLM henüz yoktur. Kullanıcı yeni adım seçene kadar yeni konuya geçme. Genel, sürekli commit/push yetkisi varsayma.
