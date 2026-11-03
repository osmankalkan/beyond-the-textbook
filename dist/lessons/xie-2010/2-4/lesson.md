# §2.4 · Birinci mertebe doğrusal denklemler ve Bernoulli denklemleri

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.4, basılı s.55–60 / PDF s.73–78. Örnek 2.30–2.34. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu konudaki çalışma planın

Önce denklemi \(y'+P(x)y=Q(x)\) standart biçimine getir. \(y\) ve \(y'\) yalnız birinci kuvvetteyse denklem doğrusaldır ve tek bir integrasyon çarpanı yeterlidir. \(y^n\) terimi varsa \(n\)'yi belirle: \(n=0\) doğrusal, \(n=1\) ayrılabilir hâle gelir; diğer durumlarda \(u=y^{1-n}\) dönüşümü denklemi doğrusallaştırır. Çarpanı veya dönüşümü kurduktan sonra integrali al, başlangıç verisini uygula, kayıp \(y=0\) dalını ve tanım aralığını ayrıca yaz. Vize bölümünde bu kararlar süreli ve puanlamalı dört örnek üzerinde çalışılır.

## 1. Doğrusal birinci mertebe denklem

Standart biçim:

$$y'+P(x)y=Q(x)$$

Burada \(y\) ve \(y'\) birinci kuvvette, katsayılar yalnız \(x\)'e bağlıdır. Denklemi diferansiyel formda yazarsak

$$M(x,y)=P(x)y-Q(x),\qquad N(x,y)=1$$

olur. \(M_y=P(x)\) ve \(N_x=0\) olduğundan denklem genellikle tam değildir. Ancak bölüm yalnız \(x\)'e bağlıdır:

$$\frac{M_y-N_x}{N}=P(x)$$

Bu yüzden yalnız \(x\)'e bağlı bir integrasyon çarpanı vardır:

$$\mu(x)=e^{\int P(x)\,dx}$$

Denklemi \(\mu\) ile çarpınca sol taraf bir çarpımın türevine dönüşür:

$$(\mu y)'=\mu Q$$

Her iki tarafı integre edince

$$\mu y=\int \mu Q\,dx+C$$

ve genel çözüm çıkar:

$$y=e^{-\int P\,dx}\left(\int Q e^{\int P\,dx}\,dx+C\right)$$

Bazen \(x\)'i \(y\)'nin fonksiyonu olarak çözmek daha kolaydır. Aynı yöntem şu biçimde işler:

$$\frac{dx}{dy}+P(y)x=Q(y)$$

$$x=e^{-\int P(y)\,dy}\left(\int Q(y)e^{\int P(y)\,dy}\,dy+C\right)$$

Çözüm aralığı, \(P\) ve \(Q\)'nun tanımlı olduğu ve başlangıç verisini içeren bağlı aralıktır. Mutlak değerli logaritmalarda işaret, seçilen aralıkta sabit kalır; kutuplar aralığa dahil edilmez.

## 2. Örnek 2.30 · tan x katsayılı doğrusal denklem

$$y'=1+3y\tan x$$

Denklemi standart biçime getir:

$$y'-3\tan x\,y=1,\qquad P(x)=-3\tan x,\quad Q(x)=1$$

İntegrasyon çarpanı için gereken integral:

$$\int P\,dx=\int-3\tan x\,dx=3\ln|\cos x|$$

Dolayısıyla

$$\mu=e^{3\ln|\cos x|}=\cos^3x$$

Denklemi \(\cos^3x\) ile çarpınca sol taraf tam bir diferansiyel olur:

$$d(y\cos^3x)=\cos^3x\,dx$$

Sağ tarafı integre etmek için \(\cos^3x=(1-\sin^2x)\cos x\) yaz ve \(u=\sin x\) al:

$$\int\cos^3x\,dx=\int(1-\sin^2x)\,d(\sin x)$$

$$\int\cos^3x\,dx=\sin x-\frac{\sin^3x}{3}$$

Böylece

$$y\cos^3x=\sin x-\frac{\sin^3x}{3}+C$$

ve genel çözüm

$$y=\sec^3x\left(\sin x-\frac{\sin^3x}{3}+C\right)$$

olur. Çözüm aralığı \(x=\pm\pi/2\) kutupları arasındaki bağlı aralıktır. Türev alıp asıl denklemi sağladığını kontrol et:

$$y'=1+3y\tan x,\qquad \cos x\neq0$$

## 3. Örnek 2.31 · x'i y'nin fonksiyonu olarak çözme

$$y\,dx-(e^y+2xy-2x)\,dy=0$$

Önce \(y=0\) dalını ayır:

$$y=0$$

Bu dal asıl denklemi sağlar. \(y\neq0\) için denklemi \(y\)'ye bölüp \(x\)'i bağımlı değişken yap:

$$\frac{dx}{dy}+\frac{2(1-y)}{y}x=\frac{e^y}{y}$$

Burada

$$P(y)=\frac{2(1-y)}{y},\qquad Q(y)=\frac{e^y}{y}$$

olur. İntegral:

$$\int P\,dy=\int\left(\frac2y-2\right)dy=2\ln|y|-2y$$

Dolayısıyla çarpan

$$\mu=e^{2\ln|y|-2y}=y^2e^{-2y}$$

olur. Sağ taraf:

$$\mu Q=y^2e^{-2y}\cdot\frac{e^y}{y}=ye^{-y}$$

Denklem artık

$$d(xy^2e^{-2y})=ye^{-y}\,dy$$

biçimindedir. Kısmi integrasyonla

$$\int ye^{-y}\,dy=-(y+1)e^{-y}$$

bulunur. Böylece

$$xy^2e^{-2y}=C-(y+1)e^{-y}$$

ve \(e^{2y}\) ile çarpınca

$$xy^2=Ce^{2y}-e^y(y+1)$$

genel çözümü çıkar. \(y=0\) dalı genel çözüme şu seçimle dahil olur:

$$C=1\quad\Longrightarrow\quad y=0$$

Başlangıç verisi \(y>0\) dalını seçerse çözüm \(y=0\)'dan geçemez. Örtük türev asıl denklemi verir:

$$\frac{dx}{dy}=\frac{e^y}{y}+2x\left(1-\frac1y\right),\qquad y\neq0$$

## 4. Örnek 2.32 · cos y katsayılı denklemde rol değişimi

$$\frac{dy}{dx}=\frac{1}{x\cos y+\sin2y},\qquad \cos y\neq0$$

Ters çevirip \(x\)'i \(y\)'nin fonksiyonu olarak yaz:

$$\frac{dx}{dy}-\cos y\,x=\sin2y$$

Burada

$$P(y)=-\cos y,\qquad Q(y)=\sin2y$$

İntegral ve çarpan:

$$\int P\,dy=-\sin y,\qquad \mu=e^{-\sin y}$$

Denklemin sol tarafı \(d(xe^{-\sin y})\) olur:

$$d(xe^{-\sin y})=\sin2y\,e^{-\sin y}\,dy$$

Sağ tarafı integre etmek için \(\sin2y=2\sin y\cos y\) ve \(u=\sin y\) kullan:

$$\int\sin2y\,e^{-\sin y}\,dy=\int2u e^{-u}\,du$$

Kısmi integrasyon:

$$\int2u e^{-u}\,du=-2e^{-u}(u+1)$$

\(u=\sin y\) geri konunca

$$xe^{-\sin y}=C-2e^{-\sin y}(\sin y+1)$$

ve

$$x=Ce^{\sin y}-2(\sin y+1)$$

genel çözümü elde edilir. \(\cos y=0\) noktalarında \(dx/dy\) tanımsızdır; başlangıç verisi bu noktalardan seçilemez. Türev, ters çevrilmiş asıl denklemi verir.

## 5. Bernoulli denklemleri

Bernoulli denklemi

$$y'+P(x)y=Q(x)y^n$$

biçimindedir; \(n\) sabittir. \(n=0\) ve \(n=1\) özel durumları ayrı ele alınır:

$$n=0:\quad y'+P(x)y=Q(x)$$

$$n=1:\quad y'=(Q(x)-P(x))y$$

Birinci durum doğrusal, ikinci durum ayrılabilirdir. \(n\neq0,1\) için denklem doğrusal değildir. \(n>0\) olduğunda \(y=0\) bir çözümdür:

$$y=0\quad(n>0)$$

Bu dalı \(y^n\)'ye bölmeden önce ayrıca yaz. \(y\neq0\) için \(u=y^{1-n}\) dönüşümünü kur:

$$u=y^{1-n}$$

Türev zinciri

$$y^{1-n}=u,\qquad y^{-n}\frac{dy}{dx}=\frac{1}{1-n}\frac{du}{dx}$$

olduğundan denklem doğrusal biçime gelir:

$$\frac{du}{dx}+(1-n)P(x)u=(1-n)Q(x)$$

Artık \(u\) için birinci mertebe doğrusal denklem çözülür; sonra \(u=y^{1-n}\) geri konur.

## 6. Örnek 2.33 · Bernoulli başlangıç değer problemi

$$2xyy'=y^2-2x^3,\qquad y(1)=2$$

Denklemi \(2xy\)'ye böl:

$$y'-\frac{1}{2x}y=-x^2y^{-1},\qquad n=-1$$

\(n=-1\) olduğu için \(u=y^{1-n}=y^2\) seçilir. Önce denklemi \(y\) ile çarp:

$$yy'-\frac{1}{2x}y^2=-x^2$$

Dönüşüm:

$$u=y^2,\qquad u'=2yy'$$

Yerine koyunca doğrusal denklem çıkar:

$$u'-\frac1xu=-2x^2$$

Burada \(P=-1/x\) olduğundan

$$\mu=\frac1x$$

ve

$$\left(\frac{u}{x}\right)'=-2x$$

olur. İntegre edince

$$\frac{u}{x}=-x^2+C$$

ve

$$u=x(C-x^2)$$

bulunur. \(u=y^2\) geri konur:

$$y^2=x(C-x^2)$$

Başlangıç verisi \(y(1)=2\):

$$4=1(C-1)\quad\Longrightarrow\quad C=5$$

Böylece

$$y^2=x(5-x^2),\qquad y=\sqrt{x(5-x^2)}$$

olur. Üst dal seçilir; bağlı çözüm aralığı

$$1<x<\sqrt5$$

dir. \(x=\sqrt5\) noktasında \(y=0\) çıkar ama bu nokta asıl denklemi sağlamaz; bu yüzden sınır açıktır. Türevle doğrula.

## 7. Örnek 2.34 · n=4 Bernoulli ve kısmi integrasyon

$$3y\,dx-(x+3x^4y\ln y)\,dy=0,\qquad y>0$$

\(3y\)'ye bölüp \(x\)'i bağımlı değişken yap:

$$\frac{dx}{dy}-\frac{1}{3y}x=x^4\ln y,\qquad n=4$$

\(x^4\)'e böl:

$$x^{-4}\frac{dx}{dy}-\frac{1}{3y}x^{-3}=\ln y$$

Dönüşüm ve türevi:

$$u=x^{-3},\qquad u'=-3x^{-4}x'$$

Yerine koyunca

$$u'+\frac1yu=-3\ln y$$

doğrusal denklemi çıkar. Çarpan:

$$\mu=e^{\int\frac1y\,dy}=y$$

Denklemin sol tarafı \(d(yu)\) olur:

$$d(yu)=-3y\ln y\,dy$$

Kısmi integrasyon:

$$\int-3y\ln y\,dy=-3\left(\frac{y^2}{2}\ln y-\frac{y^2}{4}\right)$$

$$\int-3y\ln y\,dy=\frac34y^2(1-2\ln y)$$

Böylece

$$yu=\frac34y^2(1-2\ln y)+C$$

ve

$$u=\frac1y\left[C-\frac34y^2(2\ln y-1)\right]$$

olur. \(u=x^{-3}\) geri konunca genel çözüm

$$x^3=\frac{4y}{4C-3y^2(2\ln y-1)}$$

biçimini alır. \(y>0\) gerekir; türev asıl denklemi verir.

## 8. Karar özeti

Denklemi önce standart biçime getir. \(y'\) ve \(y\) birinci kuvvetteyse doğrusal yol:

$$y'+P(x)y=Q(x)\quad\Longrightarrow\quad\mu=e^{\int P\,dx}$$

\(y^n\) varsa ve \(n\neq0,1\) ise Bernoulli yolu:

$$y'+P(x)y=Q(x)y^n,\;n\neq0,1\quad\Longrightarrow\quad u=y^{1-n}$$

\(x\)'i \(y\)'nin fonksiyonu yapmak daha kolaysa aynı çarpan kuralı:

$$\frac{dx}{dy}+P(y)x=Q(y)\quad\Longrightarrow\quad\mu=e^{\int P\,dy}$$

Her durumda kayıp dalları ve tanım sınırlarını ayrıca yaz:

$$y=0\quad(n>0),\qquad \cos x\neq0,\qquad y\neq0$$

## 9. Deney: dört aileyi karşılaştır

Aşağıdaki atölyede dört analitik aile vardır:

- **tan ailesi:** \(y'=1+3y\tan x\), çözüm \(y=\sec^3x(\sin x-\sin^3x/3+C)\). \(x=\pm\pi/2\) kutupları dışlanır.
- **x(y) ailesi:** \(y\,dx-(e^y+2xy-2x)dy=0\), çözüm \(xy^2=Ce^{2y}-e^y(y+1)\). \(y=0\) ayrı dallıdır.
- **Bernoulli n=−1:** \(2xyy'=y^2-2x^3\), çözüm \(y^2=x(C-x^2)\). Pozitif dal ve \(0<x<\sqrt C\) aralığı gösterilir.
- **Bernoulli n=4:** \(3y\,dx-(x+3x^4y\ln y)dy=0\), çözüm \(x^3=4y/[4C-3y^2(2\ln y-1)]\). \(y>0\) gerekir.

A ve B aynı ailenin farklı başlangıç verileridir. Seçili başlangıçta \(C\), çarpan veya \(u\) değeri, inceleme noktasındaki çözüm ve eğim birlikte okunur. Eğri pencereden çıktığında çözümün bittiği sonucuna varma; gerçek sınırlar yukarıdaki tanım aralıklarıdır.

## Vizeye hazırlan

Dört çözümlü vaka sırayla doğrusal tan denklemini, \(x\)'in bağımlı olduğu denklemi, \(n=-1\) Bernoulli başlangıç değer problemini ve \(n=4\) Bernoulli denklemini kapsar. Her vakada önce tipi belirle, çarpanı veya dönüşümü kur, integrali ara işlemleriyle al, başlangıç verisini uygula ve kayıp dalı yaz. Ardından 11 soruluk kontrol bölümüyle kendini sına.

## Kontrol listesi

- Denklem gerçekten \(y'+P(x)y=Q(x)\) biçiminde mi?
- \(y^n\) varsa \(n\) kaç; \(n=0\) veya \(n=1\) özel durumu ayrıldı mı?
- \(\mu\) doğru işaretle mi kuruldu; mutlak değer ve aralık tutarlı mı?
- \(u=y^{1-n}\) dönüşümünde türev zinciri doğru mu?
- \(y=0\), \(\cos x=0\), \(\cos y=0\), \(y>0\) gibi kayıp dal ve tanım sınırları yazıldı mı?
- Başlangıç verisi hangi dalı seçiyor; bağlı aralık nedir?
- Çözüm türevle doğrulandı mı?
