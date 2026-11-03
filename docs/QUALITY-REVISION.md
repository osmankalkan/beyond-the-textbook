# Mevcut derslerin öğrenme derinliği revizyonu

Kullanıcı §1.1, §1.2 ve §2.1’in §3.1 kadar ayrıntılı ve anlamlı bir çalışma akışı sunmasını istedi. Bu revizyon yeni bir konu eklemez.

## Bölümler

- §1.1: Tankta ürün kuralı / hacim dengesi ve atışta kuvvet / dirençsiz limit için iki tahmin ve beşer türetim adımı. Tankta 100/5/8 debili özgün model kurma problemi ve zemin hareketinde göreli koordinat problemi için puanlı tam çözümler. Altı model ve mevcut iki deney korunur.
- §1.2: Tekil noktada yokluk / çokluk / yerel teklik ve aday çözümün katsayı özdeşliği için iki tahmin ve beşer açıklama adımı. İki ayrıntılı sınav problemi. Mevcut dört kavram alanı ve 14 soru kullanılır.
- §2.1: Örnek 2.1 ve 2.3’te değişken dönüşümü, parçalı integrasyon, dışlanan dal, doğrulama ve aralık için beşer adım. Notlarda integral ayrıntıları ve Örnek 2.2’nin logaritma / tanım bölgesi kontrolü genişletildi. Önceki yüzeysel sınav kartları dört tam çözümle değiştirildi; 4+5+5+6=20 puanlık açık anahtar eklendi. Mevcut üç soru indeksinin ardına sekiz soru eklenerek toplam 11 oldu.
- §2.1 serbest deney: y′=kxy, y′=ky², y′=ky(1−y), y′=kx(1+y²) aileleri. A/B ilk değerleri, ortak k, seçili x’te değer/eğim, denge çizgileri, bağlı en geniş çözüm aralığı ve geçersiz nokta bildirimi. Bütün aralıklar x₀=0 ve k>0 içindir. Lojistik ve tanjant deneyleri ek pedagojik örneklerdir; kaynak kitap verisi olarak sunulmaz.

## Sorumluluklar

`study.js` konu içeriğini tutar; `dist/core/study-guide.js` tahmin, kontrol, adım açma ve dil geçişindeki bellek durumunu yönetir. `dist/study/math.js` sadece güvenilir, yazılmış veriler için kaçışlanmış MathML parçaları üretir. Sayısal modeller DOM’dan bağımsızdır. Yeni arayüz metinleri merkezi TR/EN sözlüğündedir.

Kalıcı kullanıcı ilerlemesi ve notların biçimi değiştirilmedi. Rehberdeki tahminler ve açık adımlar ders/oturum belleğindedir; sayfa yenilenince sıfırlanır. Bu adımlar notlandırılmış otomatik sınav iddiası taşımaz. Puanlar, çözümlü kâğıt çalışması için öz denetim anahtarıdır.

## Doğrulama

30 otomatik test: mevcut modeller ve yaşam döngüsü, dört ailenin analitik türevleri ve kutup sınırları, iki dilde rehber ve klinik bütünlüğü, önceki ilerleme indekslerinin anlamı. `build_math.py` dört dersin LaTeX çiftlerini doğrular. Yeni MathML parçaları XML olarak ve açık mrow kökleriyle kontrol edildi.

Tarayıcıda tahmin seçimi/geri bildirimi, beş adımın açılması, dil değişiminde açık adım ve deney parametreleri, kutup dışındaki geçersiz değer, dört klinik / 11 soru, 390 px mobilde §1.1 ve §1.2 rehberleri, §2.1 notu ve vize çözümleri kontrol edildi. Yatay sayfa taşması yok. §3.1’in mevcut laboratuvarı ve rehber görünürlük ayrımı kontrol edildi.

İnceleme bağlantıları: `?lesson=xie-2010%3A1.1&lang=tr#lab`, `?lesson=xie-2010%3A1.2&lang=tr#lab`, `?lesson=xie-2010%3A2.1&lang=tr#lab`. Kullanıcının değerlendirmesini bekle; yeni konu ekleme veya talep edilmeden commit/push yapma.
