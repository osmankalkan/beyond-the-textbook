# §2.7 · Özet: yöntem seçme sanatı

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.7, basılı s.74 / PDF s.92–96. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- Bir denklemi çözmeden önce türünü, mertebesini ve eksik değişkenini belirlemeyi.
- Ayrılabilir, homojen, doğrusal, Bernoulli, tam ve yüksek mertebe indirgemeleri arasında **ilk hamleyi** seçmeyi.
- Her yöntemin neden çalıştığını ve hangi biçime indirgediğini tek bir karar zincirinde görmeyi.
- Çözümü doğrulamayı, sabit sayısını denetlemeyi ve kaybolan dalları yakalamayı.
- Yöntemi ezberlemek yerine, yeni bir denklemde sırayla sorulacak soruları içselleştirmeyi.

## 1. Bölümün tek fikri

Bu bölümdeki bütün yöntemler aynı işi yapar: **çözemediğin denklemi, çözebildiğin bir biçime indirger.** Ayrılabilir denklem doğrudan integrallenir; homojen denklem \(v=y/x\) ile ayrılabilir olur; Bernoulli denklemi \(u=y^{1-n}\) ile doğrusal olur; tam olmayan denklem bir çarpanla tam olur; Clairaut denklemi \(p\)'ye göre ayrılabilir; eksik değişkenli yüksek mertebe denklem daha düşük mertebeye iner.

$$ F\left(x,y,y',\dots,y^{(n)}\right)=0 $$

> **Ortak amaç.** Her satırda aynı soru vardır: “Bu denklemi hangi dönüşüm, bildiğim bir çözüme indirger?” Yöntemler birbirinden bağımsız tarifler değil, aynı indirgeme fikrinin farklı kapılarıdır.

## 2. Karar haritası

| Denklemin biçimi | İlk hamle | Neden çalışır | Son kontrol |
| --- | --- | --- | --- |
| \(y'=f(x)g(y)\) | değişkenleri ayır | iki taraf yalnız kendi değişkenine bağlı kalır | \(g(y)=0\) dalları |
| \(y'=f(y/x)\) | \(v=y/x\) | homojenlik \(x\)'i tek değişkende toplar | \(x=0\), \(v\) aralığı |
| \(y'+P(x)y=Q(x)\) | \(\mu=e^{\int P\,dx}\) | sol taraf \((\mu y)'\) olur | \(\mu>0\), tanım aralığı |
| \(y'+P(x)y=Q(x)y^n\) | \(u=y^{1-n}\) | Bernoulli doğrusala döner | \(y=0\), \(n=0,1\) |
| \(M\,dx+N\,dy=0\), \(M_y=N_x\) | potansiyel kur | \(du=M\,dx+N\,dy\) | tamlık, tanım bölgesi |
| \(M\,dx+N\,dy=0\), tam değil | \(\mu\) bul | \(\mu M\,dx+\mu N\,dy\) tam olur | \(\mu=0\), çarpanın tanımı |
| \(F(x,y,p)=0\) | \(p=y'\); \(x\) veya \(y\) için çöz | \(p\)'ye göre ayrılabilir denklem | \(p\) eleme, parametrik |
| \(y=xp+f(p)\) | \(x\)'e göre türev | \((x+f'(p))p'=0\) | doğru ailesi + zarf |
| \(y^{(n)}=f(x)\) | \(n\) kez integral | her integral bir sabit ekler | sabit sayısı |
| \(y\) yok | \(u=y^{(k)}\) | mertebe \(n-k\)'ye iner | \(u=0\) dalı |
| \(x\) yok | \(u=y'\), \(y''=u\,du/dy\) | mertebe bir azalır | \(dy/dx=u(y)\) |

> **Tabloyu nasıl kullanacaksın?** Ezberlemek için değil, iki soruyla taramak için: (1) Denklem birinci mertebe mi, yüksek mertebe mi? (2) Hangi değişken eksik ya da hangi terim bir dönüşümle tek harfe iniyor? Cevap, satırı seçer; satır da ilk hamleyi verir.

## 3. Dört soruluk tarama

Her denkleme aynı sırayla yaklaş. Bu tarama, yöntem seçimini sezgiden denetlenebilir bir karara çevirir.

1. **Mertebe kaç?** En yüksek türev \(y''\) mü, yoksa \((y')^2\) gibi bir kuvvet mi? Kuvvet mertebeyi artırmaz; yalnız doğrusallığı bozar.
2. **Doğrusal mı?** \(y\) ve türevleri yalnız birinci kuvvette mi, katsayılar yalnız \(x\)'e mi bağlı? Doğrusalsa \(P(x)\), \(Q(x)\) biçimine getir.
3. **Birinci mertebede hangi özel yapı var?** Ayrılabilir mi, homojen mi, tam mı, yoksa bir çarpan mı gerekiyor?
4. **Yüksek mertebede hangi değişken eksik?** \(y\) mi yok, \(x\) mi yok, yoksa yalnız \(y^{(n)}\) mü var?

| Soru | Evet ise | Hayır ise |
| --- | --- | --- |
| En yüksek türev yalnız \(x\)'e bağlı mı? | \(n\) kez integral | sonraki soruya geç |
| \(y\) ve alt türevleri yok mu? | \(u=y^{(k)}\) | sonraki soruya geç |
| \(x\) açıkça yok mu? | \(y\) bağımsız, \(u=y'\) | tam/doğrusal yolları dene |
| Denklem \(y'=f(y/x)\) biçiminde mi? | \(v=y/x\) | ayrılabilirlik ve tamlık testleri |
| \(M_y=N_x\) mi? | potansiyel kur | çarpan ara |

> **Küçük ama pahalı ayrım.** \((y')^2\) birinci türevin karesidir; mertebe hâlâ 1'dir. \(y''\) ise ikinci türevdir; mertebe 2'dir. Sınavda en sık kaybedilen puan, bu iki gösterimi karıştırmaktır.

## 4. İndirgeme zinciri

Bölümün yöntemleri birbirine şu zincirle bağlanır. Okların hepsi aynı yöne bakar: daha zor bir denklemden daha kolay bir denkleme.

| Başlangıç | Dönüşüm | İndirgenen biçim |
| --- | --- | --- |
| Homojen | \(v=y/x\) | ayrılabilir |
| Bernoulli | \(u=y^{1-n}\) | doğrusal |
| Tam olmayan | \(\mu(x)\) veya \(\mu(y)\) | tam |
| Clairaut | \(p=y'\) | \(p\)'ye göre ayrılabilir |
| \(y\) yok | \(u=y^{(k)}\) | daha düşük mertebe |
| \(x\) yok | \(u=y'\) | birinci mertebe |

Bu zinciri tersine çevirmeye çalışma: ayrılabilir bir denklemi yapay olarak Bernoulli'ye çevirmek işi uzatır. **En kısa indirgemeyi seç.**

## 5. Ortak iskelet: beş adım

Yöntem ne olursa olsun, çözüm üretmenin iskeleti aynıdır.

1. **Standart biçim ve aralık.** Denklemi \(y'=\cdots\), \(M\,dx+N\,dy=0\) veya \(y^{(n)}=\cdots\) biçimine getir; bölen ifadelerin sıfır olmadığı aralığı yaz.
2. **Sınıflandır ve yöntemi seç.** Dört soruluk taramayı uygula; ilk hamleyi belirle.
3. **Dönüşümü veya integrali uygula.** Diferansiyelleri de dönüştür; her integralde bir sabit ekle.
4. **Çöz ve dalları yaz.** \(y\)'yi açık ya da kapalı çöz; \(u=0\), \(y=0\), \(C=0\) gibi özel dalları ayrıca belirt.
5. **Doğrula.** Sonucu asıl denklemde yerine koy; başlangıç koşulunu ve tanım aralığını denetle.

> **Neden beş adım?** Çünkü hataların çoğu çözümün ortasında değil, başında ve sonunda oluşur: yanlış yöntem seçimi ve doğrulanmamış cevap. İskelet, bu iki ucu görünür tutar.

## 6. Altı tuzak

| Tuzak | Nerede görünür | Nasıl önlenir |
| --- | --- | --- |
| Sıfıra bölme | \(y=0\), \(u=0\), \(x=0\), \(\cos x=0\) | bölmeden önce özel değeri ayrıca dene |
| Dal kaybı | \(p=0\), \(u=0\), \(C=0\) | her çarpanı sıfır yapan dalı yaz |
| Mertebe karışıklığı | \((y')^2\) ile \(y''\) | en yüksek türevi, kuvvetten ayır |
| Sabit sayısı | \(n\)-inci mertebede eksik sabit | her integralde bir sabit ekle |
| Yanlış koşul | \(y(0)\) ile \(y'(0)\) | koşulu doğru türeve uygula |
| Tekil çözümü kaçırmak | Clairaut zarfı | \(dp/dx=0\) ve \(x=-f'(p)\) dallarını ayır |

> **En sık hata cebirde değil, kararda.** Doğru yöntemi seçip yanlış dalı yazmak, yanlış yöntemi seçmekten daha sık görülür. Her çözümün sonunda “hangi değerleri dışladım?” sorusunu sor.

## 7. Hızlı başvuru

Sık kullanılan integraller ve dönüşümler:

$$ \int\frac{dx}{x}=\ln|x|,\qquad \int\sec x\,dx=\ln|\sec x+\tan x| $$

$$ \int\ln x\,dx=x\ln x-x $$

Doğrusal denklemin integral çarpanı ve Bernoulli dönüşümü:

$$ \mu(x)=e^{\int P(x)\,dx} $$

$$ u=y^{1-n}\quad\Longrightarrow\quad u'+(1-n)P(x)u=(1-n)Q(x) $$

Tam denklemin potansiyeli:

$$ \frac{\partial u}{\partial x}=M,\qquad \frac{\partial u}{\partial y}=N,\qquad u(x,y)=C $$

Clairaut denkleminin iki dalı:

$$ y=Cx+f(C),\qquad x=-f'(p),\qquad y=f(p)-pf'(p) $$

Bağımsız değişken yokken türev zinciri:

$$ u=y',\qquad y''=u\frac{du}{dy} $$

## 8. Deney: yöntem seçimi

Atölyedeki on kart, bölümün on ayrı kararını temsil eder. Her kartta önce denklemin türünü, sonra ilk hamleyi seç; geri bildirim, seçtiğin hamlenin neden işe yaradığını veya neden yanlış olduğunu açıklar.

| Denklem | Aile | İlk hamle |
| --- | --- | --- |
| \(y'=x^2(1+y^2)\) | ayrılabilir | değişkenleri ayır |
| \(y'=(x+y)/(x-y)\) | homojen | \(v=y/x\) |
| \(y'+2y/x=x^3\) | doğrusal | \(\mu=x^2\) |
| \(y'+y/x=y^3\) | Bernoulli | \(u=y^{-2}\) |
| \((2x+y)\,dx+(x+2y)\,dy=0\) | tam | potansiyel kur |
| \(y\,dx-x\,dy=0\) | tam değil | \(\mu=1/y^2\) veya \(1/x^2\) |
| \(x=p+p^4\) | \(x\) için çözülebilir | \(y\)'ye göre türev al |
| \(y=xp+p^2\) | Clairaut | \(x\)'e göre türev al |
| \(y'''=e^x\) | hemen integrallenebilir | üç kez integral al |
| \(yy''=(y')^2\) | \(x\) yok | \(u=y'\), \(y''=u\,du/dy\) |

Kartları sırayla çözmek zorunda değilsin; rastgele seç. Amaç hesabı bitirmek değil, **ilk hamleyi hızlı ve gerekçeli seçmek**. Her karttan sonra aynı soruyu sor: “Bu hamleyi seçmeseydim hangi yol daha uzun olurdu?”

## 9. Sınavda 60 saniyelik tarama

Bir denklemle karşılaştığında, yazmaya başlamadan önce şu sırayı uygula:

- Mertebe kaç; en yüksek türev hangisi?
- Doğrusal mı; \(P(x)\) ve \(Q(x)\) hemen yazılabiliyor mu?
- Ayrılabilir mi; \(f(x)g(y)\) biçimine ayrılıyor mu?
- Homojen mi; \(y/x\) tek değişkende toplanıyor mu?
- Tam mı; \(M_y=N_x\) sağlanıyor mu?
- Bir dönüşüm terimi tek harfe indiriyor mu?
- Yüksek mertebede hangi değişken eksik?
- Kaç sabit bekliyorum; hangi değerleri dışlıyorum?
- Sonucu nasıl doğrulayacağım?

> **60 saniye kuralı.** Bu tarama bir dakikadan uzun sürüyorsa muhtemelen yanlış soruyu soruyorsun. Çoğu denklemde iki ya da üç soru yeterlidir; geri kalanı yöntemin ayrıntısıdır.

## 10. Kapanış: yöntem değil, karar

Bu bölümün asıl çıktısı formüller değil, bir **karar alışkanlığıdır**. Yeni bir denklem gördüğünde önce türünü sor, sonra ilk hamleyi seç, sonra sonucu doğrula. Formülleri unutabilirsin; bu sırayı unutma.

| Aşama | Soru | Çıktı |
| --- | --- | --- |
| Tanı | Bu denklem hangi aile? | yöntem |
| Hamle | İlk dönüşüm ne? | indirgenmiş denklem |
| Çözüm | Sabitler ve dallar? | genel çözüm |
| Doğrulama | Sağlıyor mu? | güvenilir cevap |

> **Transfer.** Aynı alışkanlık, bu kitabın sonraki bölümlerinde de işe yarar: yeni bir denklem türü gördüğünde önce “bu hangi bildiğim biçime indirgeniyor?” diye sor. Yöntem değişir; indirgeme fikri değişmez.

## Kontrol listesi

- Denklemin mertebesini ve doğrusallığını yazdım mı?
- İlk hamleyi seçmeden önce ayrılabilirlik, homojenlik ve tamlık testlerini uyguladım mı?
- Dönüşümü seçtiysem diferansiyelleri de dönüştürdüm mü?
- Her integralde bir sabit ekledim mi; toplam sabit sayısı mertebeyle uyumlu mu?
- \(y=0\), \(u=0\), \(C=0\), \(\cos x=0\) gibi özel dalları ayrıca yazdım mı?
- Clairaut denkleminde doğru ailesini ve zarfı ayırdım mı?
- Başlangıç koşulunu doğru türeve uyguladım mı?
- Sonucu asıl denklemde ve tanım aralığında doğruladım mı?
