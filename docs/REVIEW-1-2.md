# §1.2 inceleme notları

Kaynak: Xie (2010), §1.2, basılı s.6–15 / PDF s.24–33. Özgün TR/EN çalışma uyarlaması; PDF ve ham kitap metni dağıtıma dahil değildir.

## Çalışma akışı

1. **Denklemi tanı:** sekiz örnekte tür, mertebe, doğrusallık, katsayılar ve homojenlik. İpucu, cevap denetimi ve gerekçe.
2. **Aile ve koşullar:** y′=3 ailesinden başlangıç koşuluyla bir üye seç; serbest düşüşte IVP/BVP karşılaştır. Negatif ilk hızın fiziksel yorumunu incele.
3. **Varlık ve teklik:** düzenli yön alanı ve garanti edilen yerel aralık; Örnek 1.1’de tekil başlangıç noktasının üç durumu ve farklı C¹ devamlar. Ayrıca açıkça ek örnek olarak etiketlenmiş bekleme ailesi.
4. **Çözümü doğrula:** Örnek 1.2’de analitik türev ve katsayı özdeşliği; Örnek 1.3’te PDE, uç ve başlangıç koşullarının ayrı denetimi. İki örnekte de dört aşamalı açıklama.

38 formüllü çift dilli not, 14 kavram/sayısal soru ve ders bazlı mevcut not defteri kullanılır. Bekleme ve BVP karşı örnekleri kitaba aitmiş gibi sunulmaz. Araçlar yalnızca tanımlı denklemler/aday aileleri içindir.

## Mimari

Konu verisi, saf model, SVG geometri ve dört etkinliğin denetleyicileri ayrıdır. Yeni laboratuvar mevcut mount/update/destroy sözleşmesini kullanır; uygulama kabuğuna kayıt üzerinden eklenir. Çalışma zamanına bağımlılık eklenmedi. Parametreler etkinlik ve dil geçişinde korunur; gezinme ve kalıcı kullanıcı kayıtları uygulama kabuğunda kalır.

## Doğrulama

- `npm test`: 26 test; aile/koşullar, yerel garanti, tekil ve beklemeli çözümler, analitik ODE/PDE kontrolleri, iki dil/formül eşliği, mevcut model ve yaşam döngüsü kontrolleri.
- `python3 build_math.py`: 9 + 11 + 38 formül; tüm köklerde açık mrow.
- Tarayıcı: sınıflandırmada 4/5 → 5/5; dil değişiminde durum; aileden koşula uydurma ve BVP’de negatif hız; varlık/teklik üç durumu; hatalı ODE ve dört açıklama adımı; PDE ile başlangıç/sınır koşullarının ayrılması ve tek noktada yanıltıcı sıfır kalan; Türkçe virgüllü sayısal cevap ve çoktan seçmeli kontrol.
- 390 px mobil laboratuvar ve iki dilde 38 formüllü not kontrolü. Uzun notların grid genişliğini taşırması düzeltildi.

§1.2 kullanıcı incelemesini bekler. Sonraki konu, commit, push veya yayın bu adımın kapsamında değildir.
