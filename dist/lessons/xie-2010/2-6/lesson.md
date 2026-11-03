# §2.6 · Basit yüksek mertebe denklemler

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.6, basılı s.68–73 / PDF s.86–91. Örnek 2.40–2.45. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- \(y^{(n)}=f(x)\) biçimindeki bir denklemi \(n\) kez integralleyerek çözmeyi; her integralin bir sabit eklediğini.
- Bağımlı değişkenin yokluğunu fark etmeyi ve \(u=y^{(k)}\) dönüşümüyle mertebeyi \(n-k\)'ye düşürmeyi.
- Bağımsız değişkenin yokluğunda \(y\)'yi yeni bağımsız değişken yapmayı; \(y''=u\,du/dy\) zincirini doğru kurmayı.
- Hangi eksikliğin hangi dönüşüme yol açtığını ayırt etmeyi: \(y\) mi yok, \(x\) mi yok?
- Başlangıç koşullarını doğru anda kullanmayı, dalı ve tanım aralığını yazmayı.
- Çözümü asıl denklemde yerine koyarak doğrulamayı.

## Karar haritası

Bölümün tamamı tek bir soruyla başlar: **denklemde hangi değişken açıkça görünmüyor?** Cevap, kullanacağın dönüşümü belirler.

| Görülen biçim | Eksik olan | Dönüşüm | Yeni denklem |
| --- | --- | --- | --- |
| \(y^{(n)}=f(x)\) | yalnız en yüksek türev var | doğrudan \(n\) kez integral | \(y^{(n-1)}=\int f\,dx+C_1\) |
| \(f(x;y^{(k)},\dots,y^{(n)})=0\) | \(y,y',\dots,y^{(k-1)}\) | \(u=y^{(k)}\) | \(f(x;u,u',\dots,u^{(n-k)})=0\) |
| \(f(y,y',\dots,y^{(n)})=0\) | \(x\) | \(y\) bağımsız, \(u=y'\) | \(g(y;u,du/dy,\dots)=0\) |

> **Ortak fikir.** İki eksiklikte de aynı şey yapılır: eksik değişkeni ortadan kaldıran yeni bir değişken seç ve mertebeyi düşür. \(x\) eksikse \(y\) bağımsız değişken olur; \(y\) eksikse \(x\) bağımsız kalır ve \(u=y^{(k)}\) yeterlidir.

## 1. Hemen integrallenebilen denklemler

En yüksek türev yalnız \(x\)'e bağlıysa denklem doğrudan integrallenir:

$$ \frac{d^n y}{dx^n}=f(x) $$

Her integral bir sabit ekler; \(n\) kez integrallenince \(n\) bağımsız sabit çıkar. Bu, \(n\)-inci mertebe bir denklemin genel çözümünde beklenen sabit sayısıdır:

$$ y=\int\cdots\int f(x)\,dx\cdots dx+C_1\frac{x^{n-1}}{(n-1)!}+\cdots+C_n $$

> **Neden bu kadar sabit?** Çünkü her türev alma işlemi bir bilgiyi siler. \(n\) kez türev alınmış bir fonksiyonu geri kurmak için \(n\) parça bilgi gerekir; sabitler tam olarak bu bilgiyi taşır. Çözümü \(n\) kez türevlendirince bütün sabitler yok olur ve \(f(x)\) geri gelir.

## 2. Örnek 2.40 · Üç kez integral

$$ x^2y'''=120x^3+8x^2e^{2x}+1,\qquad x\neq0 $$

Sağ taraf yalnız \(x\)'e bağlı olduğu için \(y'''\) yalnız bırakılır. \(x=0\) dışlanır; çözüm tek bir aralıkta, \(x>0\) veya \(x<0\), yazılır.

$$ y'''=120x+8e^{2x}+\frac{1}{x^2} $$

Birinci integral:

$$ y''=60x^2+4e^{2x}-\frac1x+C_1 $$

İkinci integral:

$$ y'=20x^3+2e^{2x}-\ln|x|+C_1x+C_2 $$

Üçüncü integralde \(\int\ln x\,dx=x\ln x-x\) kullanılır:

$$ y=5x^4+e^{2x}-x\ln x+x+\frac{C_1}{2}x^2+C_2x+C_3 $$

Son satırda \(x\) terimi \(C_1x\) içine, \(C_1x^2/2\) de yeni \(C_2x^2\) içine emilir; sabitler yeniden adlandırılır. Böylece kitaptaki sade biçim çıkar:

$$ y=C_0+C_1x+C_2x^2+5x^4+e^{2x}-x\ln x $$

> **Sabit sayısı.** Üçüncü mertebe bir denklemde üç bağımsız sabit olmalıdır. Son satırda \(C_0,C_1,C_2\) görünüyorsa da bunların her biri önceki sabitlerin bir bileşimidir; bağımsızlık kaybolmaz, yalnız adlar değişir.

## 3. Örnek 2.41 · Başlangıç koşullu iki kat integral

$$ e^{-x}y''-\sin x=2,\qquad y(0)=y'(0)=1 $$

\(e^{-x}\neq0\) olduğundan bölme güvenlidir:

$$ y''=e^x\sin x+2e^x $$

İki standart integral gerekir. Parçalı integrasyon iki kez uygulanınca aynı integral geri döner:

$$ \int e^x\sin x\,dx=\frac{1}{2}e^x(\sin x-\cos x),\qquad \int e^x\cos x\,dx=\frac{1}{2}e^x(\sin x+\cos x) $$

Birinci integral ve \(y'(0)=1\) koşulu:

$$ y'=\frac{1}{2}e^x(\sin x-\cos x)+2e^x+C_1 $$

$$ 1=\frac{1}{2}(0-1)+2+C_1\quad\Longrightarrow\quad C_1=-\frac{1}{2} $$

İkinci integralde \(e^x\sin x\) ve \(e^x\cos x\) integralleri birleşir:

$$ y=-\frac{1}{2}e^x\cos x+2e^x-\frac x2-\frac{1}{2} $$

Son kontrol: \(y(0)=-\frac{1}{2}+2-\frac{1}{2}=1\) ve \(y'(0)=-\frac{1}{2}+2-\frac{1}{2}=1\). İki koşul da sağlanır; çözüm bütün gerçek \(x\) için geçerlidir.

> **Koşulu erken kullan.** Başlangıç koşulunu ilk integralden hemen sonra kullanmak, ikinci integralde gereksiz bir sabit taşımaktan daha az hata üretir. Her iki sıra da doğrudur; önemli olan koşulun hangi türeve ait olduğunu karıştırmamaktır.

## 4. Bağımlı değişkenin yokluğu

Denklemde \(y\) ve alt türevleri görünmüyorsa, en düşük görünen türev \(y^{(k)}\) olsun:

$$ f\left(x;y^{(k)},y^{(k+1)},\dots,y^{(n)}\right)=0 $$

Burada \(u=y^{(k)}\) seçilir. Zincir kuralı gereği \(u^{(j)}=y^{(k+j)}\) olur ve denklem \(n-k\)-inci mertebeye iner:

$$ u=y^{(k)},\qquad f\left(x;u,u',\dots,u^{(n-k)}\right)=0 $$

> **“Yok” ne demek?** Yalnız \(y\)'nin değil, \(y^{(k)}\)'den düşük bütün türevlerin de yok olması gerekir. \(y''''+y'=g(x)\) denkleminde \(y\) yoktur; \(u=y'\) seçilir ve mertebe 4'ten 3'e iner. \(y''''+y''=g(x)\) denkleminde ise \(y\) ve \(y'\) birlikte yoktur; \(u=y''\) seçilir ve mertebe 4'ten 2'ye iner.

## 5. Örnek 2.42 · y yok: başlangıç koşulu ve dal seçimi

$$ 2y''=(y')^3\sin 2x,\qquad y(0)=y'(0)=1 $$

\(y\) yoktur; \(u=y'\), \(u'=y''\):

$$ 2u'=u^3\sin 2x\quad\Longrightarrow\quad \frac{du}{u^3}=\frac{1}{2}\sin 2x\,dx $$

\(u(0)=1\neq0\) olduğu için \(u=0\) dalı bu başlangıç verisiyle uyumlu değildir. İntegral:

$$ -\frac{1}{2u^2}=-\frac{1}{4}\cos 2x+C_1 $$

\(u(0)=1\) verir:

$$ -\frac{1}{2}=-\frac{1}{4}+C_1\quad\Longrightarrow\quad C_1=-\frac{1}{4} $$

Sağ taraf \(\cos 2x+1=2\cos^2x\) ile sadeleşir:

$$ -\frac{1}{2u^2}=-\frac{1}{2}\cos^2x\quad\Longrightarrow\quad u^2=\sec^2x $$

Başlangıçta \(u(0)=1>0\) olduğundan negatif dal değil, pozitif dal alınır:

$$ u=\sec x $$

Artık denklem yeniden “hemen integrallenebilir” biçimdedir:

$$ y=\ln|\sec x+\tan x|+C_2 $$

\(y(0)=1\):

$$ 1=\ln 1+C_2\quad\Longrightarrow\quad C_2=1 $$

$$ y=\ln|\sec x+\tan x|+1 $$

> **Dal ve aralık.** \(\sec x\) ve \(\tan x\), \(\cos x=0\) noktalarında tanımsızdır. Başlangıç \(x=0\)'da olduğu için çözüm \((-\pi/2,\pi/2)\) aralığında yaşar. Bu aralıkta \(\sec x+\tan x>0\)'dır; mutlak değer kaldırılabilir. Başka bir aralık seçilirse işaret ve mutlak değer yeniden kontrol edilmelidir.

## 6. Örnek 2.43 · y yok: Bernoulli ve daire ailesi

$$ xy''-y'-(y')^3=0 $$

\(y\) yoktur; \(u=y'\), \(u'=y''\):

$$ xu'-u-u^3=0 $$

**Durum 1.** \(u=0\):

$$ u=0\quad\Longrightarrow\quad y=C_3 $$

**Durum 2.** \(u\neq0\). Her terim \(u^3\)'e bölünür ve \(v=1/u^2\) dönüşümü yapılır:

$$ \frac{u'}{u^3}-\frac{1}{xu^2}=\frac1x $$

$$ v=\frac{1}{u^2},\qquad v'+\frac2x v=-\frac2x $$

Bu, \(x^2\) integral çarpanıyla çözülen birinci mertebe doğrusal denklemdir:

$$ \left(x^2v\right)'=-2x\quad\Longrightarrow\quad x^2v=-x^2+C_1 $$

$$ u^2=\frac{x^2}{C_1-x^2} $$

\(C_1>0\) ve \(|x|<\sqrt{C_1}\) gerekir. \(u=y'\) olduğundan:

$$ y=\pm\int\frac{x}{\sqrt{C_1-x^2}}\,dx+C_2=\mp\sqrt{C_1-x^2}+C_2 $$

Kareler alınınca çözüm kapalı bir eğri ailesi olur:

$$ x^2+(y-C_2)^2=C_1 $$

> **İki çözüm türü.** \(y=C_3\) doğruları ve \(x^2+(y-C_2)^2=C_1\) daireleri ayrı ayrı çözümdür. Daire ailesinde \(C_1>0\) olmalıdır; \(C_1=0\) yalnız bir noktaya çöker ve eğri vermez. \(u=0\) dalı dairenin yarıçapının sıfıra gitmesiyle elde edilmez; bu yüzden ayrıca yazılır.

## 7. Bağımsız değişkenin yokluğu

Denklemde \(x\) açıkça görünmüyorsa \(y\)'yi yeni bağımsız değişken, \(u=y'\)'yi yeni bağımlı değişken yap:

$$ f\left(y,y',\dots,y^{(n)}\right)=0 $$

Zincir kuralı türevleri \(y\)'ye çevirir:

$$ y'=u,\qquad y''=u\frac{du}{dy},\qquad y'''=u\left(\frac{du}{dy}\right)^2+u^2\frac{d^2u}{dy^2} $$

Genel olarak mertebe bir azalır:

$$ g\left(y;u,\frac{du}{dy},\dots,\frac{d^{n-1}u}{dy^{n-1}}\right)=0 $$

\(u(y)\) bulunduktan sonra \(dy/dx=u(y)\) ayrılabilir bir denklemdir; çözüm çoğu zaman kapalı kalır.

> **Neden \(y\) bağımsız?** Denklemde \(x\) yoksa, \(x\)'in nasıl değiştiği doğrudan bilinmez; ama \(y\) ile türevleri arasındaki ilişki bilinir. \(y\)'yi bağımsız değişken yapmak, bu ilişkiyi kullanılabilir hale getirir. Sonra \(dy/dx=u(y)\) ile \(x\)'e geri dönülür.

## 8. Örnek 2.44 · x yok: kapalı çözüm ve iki durum

$$ 3yy'y''-(y')^3+1=0 $$

\(x\) yoktur; \(u=y'\), \(y''=u\,du/dy\):

$$ 3yu^2\frac{du}{dy}-u^3+1=0 $$

**Durum 1.** \(u^3=1\), yani \(u=1\):

$$ u^3=1\quad\Longrightarrow\quad u=1\quad\Longrightarrow\quad y=x+C $$

Bu doğru ailesi denklemi sağlar; \(y'=1\), \(y''=0\) yerine konunca \(0-1+1=0\) çıkar.

**Durum 2.** \(u^3\neq1\). Değişkenler ayrılır:

$$ \frac{3u^2}{u^3-1}\,du=\frac{dy}{y} $$

İntegral:

$$ \ln|u^3-1|=\ln|y|+\ln|C_1|\quad\Longrightarrow\quad u^3-1=C_1y $$

$$ u=\left(1+C_1y\right)^{1/3},\qquad u\neq0 $$

\(dx=dy/u\) yazılır:

$$ \frac{dx}{dy}=\frac{1}{\left(1+C_1y\right)^{1/3}} $$

\(1+C_1y\)'nin türevi \(C_1\) olduğundan integral doğrudan alınır:

$$ x+C_2=\frac{3}{2C_1}\left(1+C_1y\right)^{2/3} $$

$$ 3\left(1+C_1y\right)^{2/3}=2C_1x+C_2 $$

> **İki dal neden ayrı?** \(C_1=0\) seçilirse ikinci formül \(3=C_2\) gibi \(x\)'i içermeyen bir bağıntıya çöker; \(u=1\) doğrusunu geri vermez. Bu yüzden \(u=1\) dalı ayrıca yazılır. İkinci formülde \(x\), \(y\)'nin bir fonksiyonu olarak kapalı biçimde durur; \(y\)'yi \(x\)'in tek değerli fonksiyonu yapmak her zaman gerekmez.

## 9. Örnek 2.45 · x yok: Bernoulli ve logaritmik aile

$$ yy''=(y')^2\left(1-y'\sin y-yy'\cos y\right) $$

\(x\) yoktur; \(u=y'\), \(y''=u\,du/dy\):

$$ yu\frac{du}{dy}=u^2\left(1-u\sin y-yu\cos y\right) $$

**Durum 1.** \(u=0\):

$$ u=0\quad\Longrightarrow\quad y=C $$

**Durum 2.** \(u\neq0\). \(yu\) ile bölünür ve terimler düzenlenir:

$$ \frac{du}{dy}-\frac1y u=-\frac{\sin y+y\cos y}{y}u^2 $$

Bu, \(n=2\)'li bir Bernoulli denklemidir. \(v=1/u\) dönüşümü onu doğrusal yapar:

$$ v=\frac1u,\qquad \frac{dv}{dy}+\frac1y v=\frac{\sin y+y\cos y}{y} $$

İntegral çarpanı \(y\)'dir:

$$ \frac{d}{dy}\left(yv\right)=\sin y+y\cos y\quad\Longrightarrow\quad yv=y\sin y+C_1 $$

$$ v=\sin y+\frac{C_1}{y} $$

\(v=1/u=dx/dy\) olduğundan:

$$ \frac{dx}{dy}=\sin y+\frac{C_1}{y} $$

$$ x=-\cos y+C_1\ln|y|+C_2 $$

> **Tanım aralığı.** Logaritma nedeniyle ikinci ailede \(y\neq0\) olmalıdır. \(y=0\) ise \(u=0\) dalına aittir ve ayrı bir çözüm olarak yazılır. İki çözüm birlikte şöyle özetlenir:

$$ y=C,\qquad x=-\cos y+C_1\ln|y|+C_2 $$

## 10. Karar özeti

| Denklemde eksik olan | Yeni değişken | Dönüşüm | Mertebe | Son adım |
| --- | --- | --- | --- | --- |
| yalnız \(y^{(n)}\) var | — | doğrudan integral | \(n\to0\) | \(n\) kez integre et |
| \(y,y',\dots,y^{(k-1)}\) | \(u=y^{(k)}\) | \(u^{(j)}=y^{(k+j)}\) | \(n\to n-k\) | \(u\)'yu \(k\) kez integre et |
| \(x\) | \(y\) bağımsız, \(u=y'\) | \(y''=u\,du/dy\) | \(n\to n-1\) | \(dy/dx=u(y)\) ayır |

Her durumda son adım aynıdır: çözümü asıl denklemde yerine koy, türevleri tutarlı mı diye bak ve varsa başlangıç koşulunu sağla.

$$ F\left(x,y,y',\dots,y^{(n)}\right)=0 $$

> **En pahalı hata.** \(x\)'in yokluğu ile \(y\)'nin yokluğunu karıştırmak. \(x\) yoksa \(y\) bağımsız olur ve \(u=y'\) kullanılır; \(y\) yoksa \(x\) bağımsız kalır ve \(u=y^{(k)}\) kullanılır. Dönüşümü denklemin görünüşüne göre değil, **hangi harfin gerçekten yok olduğuna** göre seç.

## 11. Deney: üç aileyi karşılaştır

Atölyedeki üç aile, bölümün üç ayrı kararını temsil eder.

| Aile | Denklem | Dönüşüm | Genel çözüm | Not |
| --- | --- | --- | --- | --- |
| Hemen integrallenebilen | \(y''=6x\) | iki kez integral | \(y=x^3+Cx+1\) | \(C=y'(0)\), \(y(0)=1\) |
| Bağımlı değişken yok | \(2y''=(y')^3\sin 2x\) | \(u=y'\) | \(y=\ln|\sec x+\tan x|+C\) | \((-\pi/2,\pi/2)\), \(C=y(0)\) |
| Bağımsız değişken yok | \(y''+(y')^2=0\) | \(u=y'\), \(y''=u\,du/dy\) | \(y=\ln(Cx+1)\) | \(Cx+1>0\), \(C=y'(0)\) |

A ve B aynı ailenin farklı \(C\) parametreleridir. Seçili inceleme noktasında \(y\), \(y'\), \(y''\) ve denklemin artığı birlikte okunur. Artık sıfırdan farklıysa ya dal seçimi ya da tanım aralığı yanlıştır. Eğri pencereden çıktığında çözümün bittiği sonucuna varma; gerçek sınır ailenin tanım aralığıdır.

## Vizeye hazırlan

Dört çözümlü vaka sırasıyla hemen integrallenebilen bir denklemi, bağımlı değişkenin yokluğunu, Bernoulli'ye dönüşen bir indirgemeyi ve bağımsız değişkenin yokluğunu kapsar. Her vakada aynı sırayı izle: eksik değişkeni belirle, dönüşümü kur, mertebeyi düşür, çöz, başlangıç koşulunu uygula, dalı ve aralığı yaz, sonucu türevle doğrula. Ardından 12 soruluk kontrol bölümüyle kendini sına.

## Kontrol listesi

- Denklemde \(x\) mi yok, \(y\) mi yok; yoksa yalnız \(y^{(n)}\) mü var?
- “Yok” derken daha düşük bütün türevlerin de gerçekten yok olduğunu kontrol ettin mi?
- \(u=y^{(k)}\) seçtiysen \(k\) kaç; mertebe kaç azalmalı?
- \(x\) yoksa \(y''=u\,du/dy\) zincirini doğru kurdun mu?
- Her integralde bir sabit ekledin mi; toplam sabit sayısı mertebeyle uyumlu mu?
- Başlangıç koşulunu doğru türeve uyguladın mı; dal işaretini kontrol ettin mi?
- Böldüğün ifade sıfır olabilir mi; ayrıca \(u=0\), \(C_1=0\) gibi özel dalları yazdın mı?
- Tanım aralığını (logaritma, karekök, kutup) ve çözümü asıl denklemde doğrulamayı tamamladın mı?
