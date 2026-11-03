# §2.4 · Birinci mertebe doğrusal denklemler ve Bernoulli denklemleri

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.4, basılı s.55–60 / PDF s.73–78. Örnek 2.30–2.34. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- Denklemi \(y'+P(x)y=Q(x)\) standart biçimine getirip \(P\) ve \(Q\)'yu okumayı.
- İntegrasyon çarpanını \(\mu=e^{\int P\,dx}\) ile kurup \((\mu y)'=\mu Q\) satırını yazmayı.
- \(x\)'i bağımlı değişken yapmanın ne zaman işi kısalttığını.
- \(y^n\) terimini görünce \(n\)'yi okuyup \(u=y^{1-n}\) dönüşümünü kurmayı.
- \(y=0\) dalını, kutupları ve bağlı tanım aralığını ayrıca yazmayı.

## Karar haritası

Bölümün tamamı iki soruya indirgenir: **denklem doğrusal mı, değilse hangi dönüşüm onu doğrusallaştırır?**

| Denklemin görünüşü | Yol | Sonuç |
| --- | --- | --- |
| \(y'+P(x)y=Q(x)\) | \(\mu=e^{\int P\,dx}\) | \(\mu y=\int\mu Q\,dx+C\) |
| \(x'+P(y)x=Q(y)\) | Aynı çarpan, değişkenler yer değiştirir | \(x=e^{-\int P\,dy}\left(\int Qe^{\int P\,dy}dy+C\right)\) |
| \(y^n\) var, \(n=0\) | Zaten doğrusal | \(\mu\) yolu |
| \(y^n\) var, \(n=1\) | Ayrılabilir | \(y'=(Q-P)y\) |
| \(y^n\) var, \(n\neq0,1\) | \(u=y^{1-n}\) | \(u'+(1-n)Pu=(1-n)Q\) |
| \(n>0\) | \(y=0\) ayrı çözüm | Bölmeden önce yaz |

> **Ortak fikir.** Doğrusal denklemin çözümü tek bir çarpanla biter; Bernoulli'de ise çarpanı bulmadan önce denklemi doğrusal hâle getiren dönüşümü bulursun. İki durumda da asıl iş integralde ve böldüğün ifadenin kökünde saklıdır.

## 1. Doğrusal birinci mertebe denklem

Standart biçim, \(y\) ve \(y'\) birinci kuvvette ve katsayılar yalnız \(x\)'e bağlı olacak biçimde yazılır:

$$y'+P(x)y=Q(x)$$

Denklemi diferansiyel forma çevirip tamlık testine sokarsan genellikle tam olmadığını görürsün; ama bölüm tek değişkene bağlı çıkar:

$$M(x,y)=P(x)y-Q(x),\qquad N(x,y)=1,\qquad \frac{M_y-N_x}{N}=P(x)$$

Bu yüzden yalnız \(x\)'e bağlı bir integrasyon çarpanı vardır ve bu çarpan her zaman aynı biçimde yazılır:

$$\mu(x)=e^{\int P(x)\,dx}$$

Denklemi \(\mu\) ile çarpınca sol taraf bir çarpımın türevi olur; bu, yöntemin tek hilesidir:

$$(\mu y)'=\mu Q$$

İki tarafı integre etmek genel çözümü verir:

$$\mu y=\int \mu Q\,dx+C$$

$$y=e^{-\int P\,dx}\left(\int Q e^{\int P\,dx}\,dx+C\right)$$

> **Neden \(\mu\) bu biçimde?** \((\mu y)'=\mu y'+\mu' y\) ile \(\mu(y'+Py)=\mu y'+\mu P y\) yan yana konunca \(\mu'=\mu P\) şartı kalır; bu ayrılabilir denklemin çözümü \(\mu=e^{\int P\,dx}\)'tir. Yani çarpan ezber değil, tek satırlık bir türetimin sonucudur.

Bazen \(x\)'i \(y\)'nin fonksiyonu olarak çözmek integrali kısaltır. Kural aynıdır, yalnız değişkenler yer değiştirir:

$$\frac{dx}{dy}+P(y)x=Q(y)$$

$$x=e^{-\int P(y)\,dy}\left(\int Q(y)e^{\int P(y)\,dy}\,dy+C\right)$$

Çözüm aralığı, \(P\) ve \(Q\)'nun tanımlı olduğu ve başlangıç verisini içeren bağlı aralıktır. Mutlak değerli logaritmanın işareti seçilen aralıkta sabit kalır; kutuplar aralığa katılmaz.

## 2. Örnek 2.30 · tan x katsayılı doğrusal denklem

$$y'=1+3y\tan x$$

Denklemi standart biçime getir ve \(P\) ile \(Q\)'yu oku:

$$y'-3\tan x\,y=1,\qquad P(x)=-3\tan x,\quad Q(x)=1$$

Çarpan için gereken integral, \(\tan x\)'in logaritmasıdır:

$$\int P\,dx=\int-3\tan x\,dx=3\ln|\cos x|$$

Üstel ile logaritma sadeleşince çarpan cebirsel bir kuvvete döner:

$$\mu=e^{3\ln|\cos x|}=\cos^3x$$

Denklemi \(\cos^3x\) ile çarpınca sol taraf tek bir diferansiyel olur:

$$d(y\cos^3x)=\cos^3x\,dx$$

Sağ tarafı integre etmek için \(\cos^3x=(1-\sin^2x)\cos x\) yaz ve \(u=\sin x\) al. İki satır tek adımda birleşir:

$$\int\cos^3x\,dx=\int(1-\sin^2x)\,d(\sin x)\quad\Longrightarrow\quad \int\cos^3x\,dx=\sin x-\frac{\sin^3x}{3}$$

Böylece örtük çözüm ve genel çözüm sırayla çıkar:

$$y\cos^3x=\sin x-\frac{\sin^3x}{3}+C\quad\Longrightarrow\quad y=\sec^3x\left(\sin x-\frac{\sin^3x}{3}+C\right)$$

> **Aralık ve doğrulama.** \(x=\pm\pi/2\) kutupları arasındaki bağlı aralıkta \(\cos x\neq0\)'tır ve \(\mu\) tanımlıdır. Türev alınca \(y'=1+3y\tan x\) geri gelir; her iki taraf da aynı aralıkta geçerlidir.

## 3. Örnek 2.31 · x'i y'nin fonksiyonu olarak çözme

$$y\,dx-(e^y+2xy-2x)\,dy=0$$

Önce \(y=0\) dalını ayır; bu dal asıl denklemi sağlar ve bölmeden önce yazılmalıdır:

$$y=0$$

\(y\neq0\) için denklemi \(y\)'ye bölüp \(x\)'i bağımlı değişken yap. Katsayı \(x\)'in katsayısı olarak toplanır:

$$\frac{dx}{dy}+\frac{2(1-y)}{y}x=\frac{e^y}{y}$$

Buradan \(P\) ve \(Q\) doğrudan okunur:

$$P(y)=\frac{2(1-y)}{y},\qquad Q(y)=\frac{e^y}{y}$$

İntegral iki basit parçaya ayrılır:

$$\int P\,dy=\int\left(\frac2y-2\right)dy=2\ln|y|-2y$$

Çarpan ve çarpımdan doğan sağ taraf birlikte sadeleşir:

$$\mu=e^{2\ln|y|-2y}=y^2e^{-2y},\qquad \mu Q=ye^{-y}$$

Denklem artık tek diferansiyel hâlindedir:

$$d(xy^2e^{-2y})=ye^{-y}\,dy$$

Kısmi integrasyon bir kez yeterlidir:

$$\int ye^{-y}\,dy=-(y+1)e^{-y}$$

Örtük çözüm yazılıp \(e^{2y}\) ile çarpılınca aile sadeleşir:

$$xy^2e^{-2y}=C-(y+1)e^{-y}\quad\Longrightarrow\quad xy^2=Ce^{2y}-e^y(y+1)$$

\(y=0\) dalı genel aileye tek bir sabit seçimiyle girer:

$$C=1\quad\Longrightarrow\quad y=0$$

> **Neden bu dal ayrı yazılır?** \(y\)'ye böldüğün için \(y=0\) kaybolur. Ailede \(C=1\) seçilince geri gelir; yine de başlangıç verisi \(y>0\) dalını seçerse çözüm \(y=0\)'dan geçemez ve aralık \(y>0\) içinde kalır.

## 4. Örnek 2.32 · cos y katsayılı denklemde rol değişimi

$$y'=\frac{1}{x\cos y+\sin2y},\qquad \cos y\neq0$$

Ters çevirip \(x\)'i \(y\)'nin fonksiyonu olarak yaz; katsayı işareti değişir:

$$\frac{dx}{dy}-\cos y\,x=\sin2y$$

$$P(y)=-\cos y,\qquad Q(y)=\sin2y$$

İntegral ve çarpan tek satırda çıkar:

$$\int P\,dy=-\sin y,\qquad \mu=e^{-\sin y}$$

Sol taraf yine bir çarpımın türevi olur:

$$d(xe^{-\sin y})=\sin2y\,e^{-\sin y}\,dy$$

Sağ tarafı integre etmek için \(\sin2y=2\sin y\cos y\) ve \(u=\sin y\) kullan:

$$\int\sin2y\,e^{-\sin y}\,dy=\int2u e^{-u}\,du$$

Kısmi integrasyon:

$$\int2u e^{-u}\,du=-2e^{-u}(u+1)$$

Geri dönüş ve \(e^{\sin y}\) ile çarpma genel çözümü verir:

$$xe^{-\sin y}=C-2e^{-\sin y}(\sin y+1)\quad\Longrightarrow\quad x=Ce^{\sin y}-2(\sin y+1)$$

> **Tanım sınırı.** \(\cos y=0\) noktalarında \(dx/dy\) tanımsızdır; başlangıç verisi bu noktalardan seçilemez. Türev, ters çevrilmiş asıl denklemi birebir geri verir.

## 5. Bernoulli denklemleri

Bernoulli denklemi, doğrusal terime bir \(y^n\) çarpanı eklenmiş hâlidir:

$$y'+P(x)y=Q(x)y^n$$

\(n=0\) ve \(n=1\) özel durumları ayrı ele alınır, çünkü ikisi de dönüşüm gerektirmez:

$$n=0:\quad y'+P(x)y=Q(x),\qquad n=1:\quad y'=(Q(x)-P(x))y$$

| \(n\) | Denklemin türü | Yapılacak |
| --- | --- | --- |
| \(0\) | Doğrusal | \(\mu=e^{\int P\,dx}\) |
| \(1\) | Ayrılabilir | Değişkenleri ayır |
| \(n\neq0,1\) | Doğrusal değil | \(u=y^{1-n}\) |

\(n>0\) olduğunda \(y=0\) bir çözümdür; bunu \(y^n\)'ye bölmeden önce ayrıca yaz:

$$y=0\quad(n>0)$$

\(y\neq0\) için dönüşüm \(u=y^{1-n}\)'dir:

$$u=y^{1-n}$$

Türev zinciri, üssün \(1-n\) olmasından gelir:

$$y^{1-n}=u,\qquad y^{-n}\frac{dy}{dx}=\frac{1}{1-n}\frac{du}{dx}$$

Denklem \(y^{-n}\) ile çarpılınca doğrusal biçime gelir:

$$\frac{du}{dx}+(1-n)P(x)u=(1-n)Q(x)$$

> **Sıra önemli.** Önce \(y=0\) dalını yaz, sonra \(u=y^{1-n}\)'yi kur. Dönüşümü kurduktan sonra \(u\) için birinci mertebe doğrusal denklem çözülür; en sonda \(u=y^{1-n}\) geri konur ve \(y\)'nin hangi dalının seçildiği başlangıç verisiyle belirlenir.

## 6. Örnek 2.33 · Bernoulli başlangıç değer problemi

$$2xyy'=y^2-2x^3,\qquad y(1)=2$$

Denklemi \(2xy\)'ye bölünce \(n=-1\) okunur:

$$y'-\frac{1}{2x}y=-x^2y^{-1},\qquad n=-1$$

\(n=-1\) olduğu için \(u=y^{1-n}=y^2\) seçilir. Önce denklemi \(y\) ile çarp; böylece \(yy'\) ve \(y^2\) görünür:

$$yy'-\frac{1}{2x}y^2=-x^2$$

Dönüşüm ve türevi:

$$u=y^2,\qquad u'=2yy'$$

Yerine koyunca doğrusal denklem çıkar:

$$u'-\frac1xu=-2x^2$$

Burada \(P=-1/x\); çarpan ve çarpımdan doğan satır birlikte yazılır:

$$\mu=\frac1x,\qquad \left(\frac{u}{x}\right)'=-2x$$

İntegral, geri dönüş ve \(y^2\)'ye geçiş tek zincirde ilerler:

$$\frac{u}{x}=-x^2+C\quad\Longrightarrow\quad u=x(C-x^2)\quad\Longrightarrow\quad y^2=x(C-x^2)$$

Başlangıç verisi \(y(1)=2\) sabiti belirler:

$$4=1(C-1)\quad\Longrightarrow\quad C=5$$

Böylece üst dal seçilir:

$$y^2=x(5-x^2),\qquad y=\sqrt{x(5-x^2)}$$

Bağlı çözüm aralığı, kökün ve paydanın tanımlı olduğu yerdir:

$$1<x<\sqrt5$$

> **Açık sınır.** \(x=\sqrt5\) noktasında \(y=0\) çıkar ama bu nokta asıl denklemi sağlamaz; bu yüzden aralık açık yazılır. \(x=0\) da başlangıç noktasını dışlar.

## 7. Örnek 2.34 · n=4 Bernoulli ve kısmi integrasyon

$$3y\,dx-(x+3x^4y\ln y)\,dy=0,\qquad y>0$$

\(3y\)'ye bölüp \(x\)'i bağımlı değişken yapınca \(n=4\) görünür:

$$\frac{dx}{dy}-\frac{1}{3y}x=x^4\ln y,\qquad n=4$$

\(x^4\)'e bölünce sol taraf dönüşüme hazırlanır:

$$x^{-4}\frac{dx}{dy}-\frac{1}{3y}x^{-3}=\ln y$$

\(u=x^{-3}\) dönüşümü ve türevi, denklemi doğrusal biçime taşır:

$$u=x^{-3},\qquad u'=-3x^{-4}x'\quad\Longrightarrow\quad u'+\frac1yu=-3\ln y$$

Çarpan tek satırda çıkar:

$$\mu=e^{\int\frac1y\,dy}=y$$

Sol taraf yine bir çarpımın türevidir:

$$d(yu)=-3y\ln y\,dy$$

Kısmi integrasyon iki satırda toparlanır:

$$\int-3y\ln y\,dy=-3\left(\frac{y^2}{2}\ln y-\frac{y^2}{4}\right)\quad\Longrightarrow\quad \int-3y\ln y\,dy=\frac34y^2(1-2\ln y)$$

Örtük çözüm ve \(u\) için açık biçim:

$$yu=\frac34y^2(1-2\ln y)+C\quad\Longrightarrow\quad u=\frac1y\left[C-\frac34y^2(2\ln y-1)\right]$$

\(u=x^{-3}\) geri konunca genel çözüm şu biçimi alır:

$$x^3=\frac{4y}{4C-3y^2(2\ln y-1)}$$

> **Tanım bölgesi.** \(y>0\) gerekir; \(\ln y\) ve \(y\)'ye bölme bunu zorunlu kılar. Türev, asıl denklemi geri verir.

## 8. Karar özeti

Önce denklemi standart biçime getir. \(y'\) ve \(y\) birinci kuvvetteyse doğrusal yol:

$$y'+P(x)y=Q(x)\quad\Longrightarrow\quad\mu=e^{\int P\,dx}$$

\(y^n\) varsa ve \(n\neq0,1\) ise Bernoulli yolu:

$$y'+P(x)y=Q(x)y^n,\;n\neq0,1\quad\Longrightarrow\quad u=y^{1-n}$$

\(x\)'i \(y\)'nin fonksiyonu yapmak daha kolaysa aynı çarpan kuralı, yalnız değişkenler yer değiştirmiş olarak işler:

$$\frac{dx}{dy}+P(y)x=Q(y)\quad\Longrightarrow\quad\mu=e^{\int P\,dy}$$

| Kapı | Ne zaman | Ne yapar |
| --- | --- | --- |
| Standart biçim | Her zaman ilk adım | \(P\) ve \(Q\)'yu görünür kılar |
| \(\mu=e^{\int P}\) | Denklem doğrusal | Sol tarafı \((\mu y)'\) yapar |
| Rol değişimi | \(x\)'e göre integral zor | \(x\)'i bağımlı değişken yapar |
| \(u=y^{1-n}\) | \(y^n\), \(n\neq0,1\) | Bernoulli'yi doğrusallaştırır |

Her durumda kayıp dalları ve tanım sınırlarını ayrıca yaz:

$$y=0\quad(n>0),\qquad \cos x\neq0,\qquad y\neq0$$

## 9. Deney: dört aileyi karşılaştır

Atölyede dört analitik aile vardır ve A ile B aynı ailenin farklı başlangıç verilerini seçer:

- **tan ailesi:** \(y'=1+3y\tan x\), çözüm \(y=\sec^3x(\sin x-\sin^3x/3+C)\). \(x=\pm\pi/2\) kutupları dışlanır.
- **x(y) ailesi:** \(y\,dx-(e^y+2xy-2x)dy=0\), çözüm \(xy^2=Ce^{2y}-e^y(y+1)\). \(y=0\) ayrı dallıdır.
- **Bernoulli n=−1:** \(2xyy'=y^2-2x^3\), çözüm \(y^2=x(C-x^2)\). Pozitif dal ve \(0<x<\sqrt5\) aralığı gösterilir.
- **Bernoulli n=4:** \(3y\,dx-(x+3x^4y\ln y)dy=0\), çözüm \(x^3=4y/[4C-3y^2(2\ln y-1)]\). \(y>0\) gerekir.

Önce tahmin et: hangi ailede \(C\) büyüdükçe çözüm eğrisi iki uçtan da genişler, hangisinde yalnız bir uç hareket eder? Seçili başlangıçta \(C\), çarpan veya \(u\) değeri, inceleme noktasındaki çözüm ve eğim birlikte okunur.

> **Tahmin.** tan ailesinde aralık iki kutup arasında sıkıştığı için \(C\) yalnız eğriyi kaydırır; Bernoulli \(n=-1\) ailesinde ise aralık \(\sqrt5\)'e kadar uzar ve \(C\) büyüdükçe sağ uç büyür. Eğri pencereden çıktığında çözümün bittiği sonucuna varma; gerçek sınırlar yukarıdaki tanım aralıklarıdır.

## Vizeye hazırlan

Dört çözümlü vaka sırasıyla doğrusal tan denklemini, \(x\)'in bağımlı olduğu denklemi, \(n=-1\) Bernoulli başlangıç değer problemmini ve \(n=4\) Bernoulli denklemini kapsar. Her vakada aynı sırayı izle: tipi belirle, standart biçime getir, çarpanı veya dönüşümü kur, integrali ara işlemleriyle al, başlangıç verisini uygula, kayıp dalı yaz ve türevle doğrula. Ardından 11 soruluk kontrol bölümüyle kendini sına.

## Kontrol listesi

- Denklem gerçekten \(y'+P(x)y=Q(x)\) biçiminde mi; \(P\) ve \(Q\)'yu doğru okudum mu?
- \(y^n\) varsa \(n\) kaç; \(n=0\) veya \(n=1\) özel durumunu ayırdım mı?
- \(\mu\) doğru işaretle mi kuruldu; mutlak değer ve aralık tutarlı mı?
- \(u=y^{1-n}\) dönüşümünde türev zincirini doğru kurdum mu?
- \(y=0\), \(\cos x=0\), \(\cos y=0\), \(y>0\) gibi kayıp dal ve tanım sınırlarını yazdım mı?
- Başlangıç verisi hangi dalı seçiyor; bağlı aralık nedir?


---

Çalışma desteği: rehberli gerekçeler için konunun atölyesini, çözümlü sorular için sınav hazırlığı ekranını aç. Kendi açıklamanı dersin not defterine kaydet.
