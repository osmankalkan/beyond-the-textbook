# Devralan ajan için güncel not

3 Kasım 2026. Önce AGENTS.md ve ARCHITECTURE.md sözleşmelerini oku. README çalıştırma ve ders kapsamını, PROJE-DURUMU güncel durumu açıklar.

Kullanıcı tüm geliştirilmiş konuların §3.1 derinliğinde olmasını istedi. §1.1 / §1.2 / §2.1 revizyonunu olumlu değerlendirdi ve belgelerin güncellenip üç commit halinde GitHub’a gönderilmesini istedi. Yeni konu eklenmesi istenmedi. Ayrıntılı uygulama kaydı QUALITY-REVISION.md içindedir; REVIEW-1-1 ve REVIEW-1-2 tarihsel ilk teslim kayıtlarıdır.

Yeni rehber verileri konu study.js dosyalarında; ortak arayüz core/study-guide.js, MathML yardımcıları study/math.js içindedir. Yeni §2.1 deneyinin saf modeli models/separation.js ve denetleyicisi labs/separation/controller.js içindedir. app.js kabuk ve eski sıcaklık adaptörünü tutar. Bu sınırları koru.

§2.1’in ilk üç soru indeksi eski kullanıcı kayıtlarını korur; sekiz yeni soru sonlarına eklenmiştir. Oturumdaki rehber adımları ve deney parametreleri dil değişiminde korunur, yenilemede sıfırlanabilir. Not ve puan ilerlemesi kalıcı yerel kayıttır. Sınav puanları öz denetim içindir; otomatik notlandırılmış gerçek sınav sistemi yoktur.

30 test geçmektedir. Kritik kutup ve başlangıç verisi durumları ayrıca model testindedir. Dört Markdown çiftinin blok formüllerini build_math.py denetler. Ham MathML eklenmiş notlar değiştiğinde study.js ile eşlik ve açık mrow kökü ayrıca kontrol edilir. §3.1’in eski laboratuvarına yeni rehber yanlışlıkla gösterilmemelidir.

Kaynak ve arşivler Git dışında tutulur. Hosting ayarlarını değiştirme; LLM henüz yoktur. Kullanıcı yeni adım seçene kadar yeni konuya geçme. Genel, sürekli commit/push yetkisi varsayma.
