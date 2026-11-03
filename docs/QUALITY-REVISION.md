# Mevcut derslerin öğrenme derinliği revizyonu

Kullanıcı §1.1, §1.2 ve §2.1’in §3.1 kadar ayrıntılı ve anlamlı bir çalışma akışı sunmasını istedi. Bu kayıt önce bu üç dersin revizyonunu, ardından aynı standartla eklenen §2.2’yi kapsar.

## Bölümler

- §1.1: Tankta ürün kuralı / hacim dengesi ve atışta kuvvet / dirençsiz limit için iki tahmin ve beşer türetim adımı. Tankta 100/5/8 debili özgün model kurma problemi ve zemin hareketinde göreli koordinat problemi için puanlı tam çözümler. Altı model ve mevcut iki deney korunur.
- §1.2: Tekil noktada yokluk / çokluk / yerel teklik ve aday çözümün katsayı özdeşliği için iki tahmin ve beşer açıklama adımı. İki ayrıntılı sınav problemi. Mevcut dört kavram alanı ve 14 soru kullanılır.
- §2.1: Örnek 2.1 ve 2.3’te değişken dönüşümü, parçalı integrasyon, dışlanan dal, doğrulama ve aralık için beşer adım. Notlarda integral ayrıntıları ve Örnek 2.2’nin logaritma / tanım bölgesi kontrolü genişletildi. Önceki yüzeysel sınav kartları dört tam çözümle değiştirildi; 4+5+5+6=20 puanlık açık anahtar eklendi. Mevcut üç soru indeksinin ardına sekiz soru eklenerek toplam 11 oldu.
- §2.1 serbest deney: y′=kxy, y′=ky², y′=ky(1−y), y′=kx(1+y²) aileleri. A/B ilk değerleri, ortak k, seçili x’te değer/eğim, denge çizgileri, bağlı en geniş çözüm aralığı ve geçersiz nokta bildirimi. Bütün aralıklar x₀=0 ve k>0 içindir. Lojistik ve tanjant deneyleri ek pedagojik örneklerdir; kaynak kitap verisi olarak sunulmaz.
- §2.2: Örnek 2.4 homojen IVP’si ve Örnek 2.9 özel dönüşümü için iki tahmin ve beşer türetim adımı. Örnek 2.4’te v=−1 dalı, logaritmik aile, örtük türev ve x<1/e aralığı; Örnek 2.9’da v=x+y, tanjant kutupları ve doğrulama ayrıntılandırıldı. Dört çözümlü vize problemi (Örnek 2.4, 2.6, 2.7, 2.12) 5+5+5+5=20 puanla eklendi; 11 soru hazırlandı. Notlar Örnek 2.4–2.12’yi ara işlemler, kayıp dal kontrolü, doğrulama ve aralıkla kapsar; 36 formül bloğu iki dilde eşlenmiştir.
- §2.2 serbest deney: daire x²+y²=Ax, elips x²−xy+y²=A, toplam y=tan(x+C)−x ve köklü y²=−2Cx−C² aileleri. x₀=1 sabittir; A/B y(1) değerleri, seçili x’te çözüm/eğim, dönüşüm sabiti, bağlı en geniş aralık ve geçersiz başlangıç verisi gösterilir. Dairede y(1)=0, elipste 2y(1)=1, köklü ailede |y(1)|≥1 geçersizdir. Dört aile de kaynak örneklerinden türetilmiş özgün analitik modellerdir.

## Sorumluluklar

`study.js` konu içeriğini tutar; `dist/core/study-guide.js` tahmin, kontrol, adım açma ve dil geçişindeki bellek durumunu yönetir. `dist/study/math.js` sadece güvenilir, yazılmış veriler için kaçışlanmış MathML parçaları üretir. Sayısal modeller DOM’dan bağımsızdır. Yeni arayüz metinleri merkezi TR/EN sözlüğündedir.

Kalıcı kullanıcı ilerlemesi ve notların biçimi değiştirilmedi. Rehberdeki tahminler ve açık adımlar ders/oturum belleğindedir; sayfa yenilenince sıfırlanır. Bu adımlar notlandırılmış otomatik sınav iddiası taşımaz. Puanlar, çözümlü kâğıt çalışması için öz denetim anahtarıdır.

## Doğrulama

33 otomatik test: mevcut modeller ve yaşam döngüsü, §2.2 dönüşüm ailelerinin analitik türevleri, tanım bölgeleri ve geçersiz başlangıç verisi, iki dilde rehber ve klinik bütünlüğü, önceki ilerleme indekslerinin anlamı. `build_math.py` beş dersin LaTeX çiftlerini doğrular; §2.2’nin 36 formül bloğu iki dilde birebir eşleşir. Yeni MathML parçaları XML olarak ve açık mrow kökleriyle kontrol edildi.

Tarayıcıda tahmin seçimi/geri bildirimi, beş adımın açılması, dil değişiminde açık adım ve deney parametreleri, kutup dışındaki geçersiz değer, dört klinik / 11 soru, 390 px mobilde §1.1 ve §1.2 rehberleri, §2.1 notu ve vize çözümleri kontrol edildi. §2.2 için 36 formülün ham `$$` olmadan render edildiği, A/B aile geçişinin ve metriklerin çalıştığı, daire/elips/köklü ailelerde geçersiz başlangıç verisinin yakalandığı, dil değişiminin aile ve parametreleri koruduğu doğrulandı. Yatay sayfa taşması yok. §3.1’in mevcut laboratuvarı ve rehber görünürlük ayrımı kontrol edildi.

İnceleme bağlantıları: `?lesson=xie-2010%3A1.1&lang=tr#lab`, `?lesson=xie-2010%3A1.2&lang=tr#lab`, `?lesson=xie-2010%3A2.1&lang=tr#lab`, `?lesson=xie-2010%3A2.2&lang=tr#lab`. Kullanıcının değerlendirmesini bekle; yeni konu ekleme veya talep edilmeden commit/push yapma.
