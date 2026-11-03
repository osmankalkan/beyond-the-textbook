# §2.2 · Değişken dönüşümleri

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.2, basılı s.20–30 / PDF s.38–48. Örnek 2.4–2.12. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- Birinci mertebe denklemin **tekrar eden yapısını** görüp dönüşümü ona göre seçmeyi.
- \(v=y/x\), \(v=x+y\), \(v=y^3/x\), \(v=xy\) ve \(v^2=x^2-y^2\) zincirlerini kurmayı.
- Böldüğün çarpanın kökünü ayrı bir çözüm adayı olarak sınamayı.
- Geri dönüşü, başlangıç verisini ve en geniş tanım aralığını yazmayı.
- Sonucu örtük türevle doğrulamayı.

## Karar haritası

Bölümün tamamı tek bir soruya indirgenir: **denklemde tekrar eden ifade hangisi?**

| Denklemin görünüşü | Dönüşüm | İndirgenmiş denklem |
| --- | --- | --- |
| \(y'=f(y/x)\) | \(v=y/x\) | \(dv/[f(v)-v]=dx/x\) |
| Pay ve payda doğrusal, doğrular kesişiyor | Ekseni kesişime kaydır, \(v=Y/X\) | Homojen biçim |
| Pay ve payda doğrusal, doğrular paralel | \(v=a_1x+b_1y\) | Ayrılabilir |
| \(x+y\) tekrarı | \(v=x+y\) | \(v'=1+y'\) |
| \(y^3/x\) tekrarı | \(v=y^3/x\) | \(3y^2y'=v+xv'\) |
| \((x/y)\,y'=f(xy)\) | \(v=xy\) | \(xv'=v(1+f(v))\) |
| \(\sqrt{x^2-y^2}\) | \(v^2=x^2-y^2\) | \(2x-2yy'=2vv'\) |

> **Ortak fikir.** Her satır aynı hamleyi yapar: tekrar eden ifadeye tek bir ad ver, türev zincirini yaz, kalan denklemi ayır. Zorluk dönüşümü uygulamak değil, hangi dönüşümü neden seçtiğini söyleyebilmektir.

## 1. Homojen denklem: v=y/x

Sağ taraf yalnız \(y/x\) oranına bağlıysa denklem homojendir. \(y=vx\) yazıp çarpım kuralıyla türev alınca \(x\) ve \(v\) ayrılabilir hâle gelir:

$$\frac{dy}{dx}=f\left(\frac{y}{x}\right),\qquad y=vx\quad\Longrightarrow\quad \frac{dy}{dx}=v+x\frac{dv}{dx}$$

> **Neden bu dönüşüm?** \(y=vx\) yazmak, iki değişkenli denklemi tek bir orana indirir. \(x\) ölçeği dışarıda kalır; geriye \(v\) ile \(x\) arasında ayrılabilir bir bağ kalır.

$$\frac{dv}{f(v)-v}=\frac{dx}{x}$$

Son adım \(f(v)-v\)'ye bölüyor. Bu yüzden önce \(f(v)-v=0\) köklerini çöz. Her kök \(v_0\), \(y=v_0x\) biçiminde bir doğru adayı verir; adayı asıl denklemde sınarsın. Bu dal genel aileye dahil olabilir ya da ayrıca yazılması gerekebilir. \(x=0\) ve \(f(v)-v\)'nin tanımsız olduğu noktalar çözüm aralığının dışındadır.

## 2. Örnek 2.4 · Homojen başlangıç değer problemi

Denklem \(x\neq0\) ve \(y\neq0\) bölgesinde tanımlıdır:

$$\frac{dy}{dx}+\frac{x}{y}+2=0,\qquad y(0)=1$$

Sağ tarafı \(f(v)=-(1/v+2)\) olarak yaz; \(y=vx\) altında:

$$v+x\frac{dv}{dx}=-\left(\frac1v+2\right)\quad\Longrightarrow\quad x\frac{dv}{dx}=-\frac{(v+1)^2}{v}$$

Burada \(f(v)-v=-(v+1)^2/v\). Kök \(v=-1\), yani \(y=-x\) doğrusu denklemin gerçek bir çözümüdür; ancak \(y(0)=1\) verisini sağlamaz, bu yüzden atılır. \(v\neq-1\) kolunda değişkenleri ayır:

$$\frac{v}{(v+1)^2}\,dv=-\frac{dx}{x}\quad\Longrightarrow\quad \ln|v+1|+\frac{1}{v+1}=-\ln|x|+C$$

\(v/(v+1)^2=1/(v+1)-1/(v+1)^2\) ayrışımı integrali iki parçaya böler. \(v=y/x\) geri konup logaritmalar birleştirilince örtük aile çıkar:

$$\ln|y+x|+\frac{x}{y+x}=C$$

Başlangıç noktası \((0,1)\) bu aileye konunca \(\ln 1+0=C\), yani \(C=0\) olur; dal \(y+x>0\) üzerindedir. Doğrulama için örtük türev al: \(y'=-(x+2y)/y\), bu da asıl denklemi geri verir.

> **Aralık nasıl bulunur?** \(u=y+x\) yaz. \(C=0\) ailesi \(x=-u\ln u\), \(y=u(1+\ln u)\) olur ve \((0,1)\) noktası \(u=1\)'e karşılık gelir. \(u>1/e\) için \(x<1/e\) ve \(y>0\); \(u\to 1/e^+\) iken \(x\to 1/e^-\) ve \(y\to 0^+\). \(x=1/e\) noktasında \(y=0\) olduğundan orijinal denklem tanımsızdır. En geniş aralık: \(x<1/e\), \(y>0\).

## 3. Örnek 2.5 · Logaritmik homojen denklem

$$x(\ln x-\ln y)\,dy-y\,dx=0,\qquad x>0,\ y>0$$

Denklemi \(x\)'e bölüp \(v=y/x\) yazınca \(\ln x-\ln y=-\ln v\) ve \(y'=-v/\ln v\) olur. Çarpım kuralıyla:

$$x\frac{dv}{dx}=-\frac{v(1+\ln v)}{\ln v}\quad\Longrightarrow\quad \frac{\ln v}{v(1+\ln v)}\,dv=-\frac{dx}{x}$$

\(\ln v\neq0\) ve \(v>0\) kolunda değişkenleri ayırdık. \(u=\ln v\) dönüşümüyle \(\int u/(1+u)\,du=u-\ln|1+u|\) olur; üstel alınınca \(xv/(1+\ln v)=C\), yani \(y/(1+\ln y-\ln x)=C\) elde edilir. Ayrıca \(1+\ln v=0\) kökü \(v=1/e\) verir; bu, hiçbir sonlu \(C\) ile genel aileden çıkmayan **tekil çözümdür**:

$$\frac{y}{1+\ln y-\ln x}=C,\qquad y=\frac{x}{e}$$

> **Doğrulama.** Ailenin örtük türevi asıl denklemi geri verir. \(y=x/e\) dalında \(y'=1/e\) sabittir ve denklem sağlanır. \(v=0\), yani \(y=0\), orijinal logaritma yüzünden tanımsızdır.

## 4. Örnek 2.6 · Arktanjantlı homojen denklem

$$(y+x)\,dy+(x-y)\,dx=0$$

\(y=-x\) bir çözüm değildir. \(x\neq0\) bölgesinde pay ve payda \(x\)'e bölününce sağ taraf \((v-1)/(v+1)\) olur; \(v=y/x\) ile \(v+xv'=(v-1)/(v+1)\), dolayısıyla \(xv'=-(v^2+1)/(v+1)\). \((v+1)/(v^2+1)=v/(v^2+1)+1/(v^2+1)\) ayrışımıyla integral alınır:

$$\ln(x^2+y^2)+2\arctan\frac{y}{x}=C$$

İntegralde \((1/2)\ln(v^2+1)+\arctan v=-\ln|x|+C\) çıkar; ikiyle çarpıp \(\ln|x|\) birleştirilince aile yukarıdaki biçime gelir. \(v^2+1>0\) olduğu için kayıp sabit dal yoktur.

> **Sınırlar.** \(x=0\) ve arktanjantın seçilen dalı aralığın dışında kalır. Örtük türev, asıl diferansiyel formu birebir geri verir.

## 5. Örnek 2.7 · Kesişen doğrular: önce ekseni kaydır

$$\frac{dy}{dx}=\frac{2x-y+1}{x-2y+1}$$

\(2x-y+1=0\) ve \(x-2y+1=0\) doğruları \((-1/3,1/3)\) noktasında kesişir. Sabit terimleri yok etmek için eksenleri bu noktaya taşı: \(x=X-1/3\) ve \(y=Y+1/3\). Yeni denklem \(dY/dX=(2X-Y)/(X-2Y)\) olur ve homojendir. \(v=Y/X\) ile \(Xv'=2(v^2-v+1)/(1-2v)\); \((1-2v)/(v^2-v+1)\,dv=2\,dX/X\) integre edilince \(-\ln(v^2-v+1)=2\ln|X|+C\), yani \(X^2(v^2-v+1)=A\) çıkar. Geri dönüş:

$$x^2-xy+y^2+x-y+\frac13=A$$

\(A>0\) için bu, merkezi kaydırılmış bir elipstir.

> **Kaybolan doğru.** \(X=0\), yani \(x=-1/3\), paydayı sıfırlar ve çözüm aralığına katılmaz. \(A=0\) durumu tek noktaya çöker.

## 6. Örnek 2.8 · Paralel doğrular: v=x−y

$$\frac{dy}{dx}=\frac{x-y+5}{2x-2y-2}$$

Pay ve payda \(x-y\) terimini tekrarlar; doğrular paraleldir, sonlu kesişim yoktur. \(v=x-y\) seçilince \(v'=1-y'\) olur ve denklem \(dv/dx=(v-7)/(2(v-1))\) biçimine iner. \(v\neq7\) kolunda \(2(v-1)/(v-7)\,dv=dx\); \((v-1)/(v-7)=1+6/(v-7)\) ayrışımıyla \(2v+12\ln|v-7|=x+C\) çıkar:

$$\frac{x}{2}-y+6\ln|x-y-7|=C,\qquad x-y=7$$

> **Tehlikeli ama geçerli dal.** \(x-y=7\) paydayı sıfırlar gibi görünür; oysa asıl denkleme konunca iki taraf da \(1\) olur, yani gerçek bir tekil çözümdür. \(x-y=1\) ise orijinal paydayı sıfırladığı için tanım bölgesinin dışındadır.

## 7. Örnek 2.9 · Özel terim: v=x+y

$$\frac{dy}{dx}=(x+y)^2$$

Denklem ne ayrılabilir ne de yalnız \(y/x\)'in fonksiyonudur. Tekrar eden terim \(x+y\)'dir; \(v=x+y\) seçilince \(v'=1+y'=1+v^2\) olur. \(1+v^2\) hiç sıfırlanmadığı için bölme sabit bir dal kaybettirmez. \(\arctan v=x+C\), yani:

$$y=\tan(x+C)-x$$

Doğrulama: \(y'=\sec^2(x+C)-1=\tan^2(x+C)=(x+y)^2\).

> **Aralık.** Çözüm, kosinüsün sıfırlanmadığı bağlı aralıkta yaşar. Kutuplar \(x+C=\pi/2+k\pi\)'dir ve aralık açık yazılır.

## 8. Örnek 2.10 · Özel terim: v=y³/x

$$\frac{dy}{dx}=\frac{y^6-2x^2}{2xy^5+x^2y^2}$$

\(x>0\), \(y\neq0\) ve \(2y^3+x\neq0\) bölgesinde pay ve payda \(x^2\)'ye bölününce özel terim \(y^3/x\) belirir. \(v=y^3/x\), yani \(y^3=vx\) seçilir; \(3y^2y'=v+xv'\) olur. İndirgenmiş denklem \((1/3)(v+xv')=(v^2-2)/(2v+1)\), dolayısıyla \(xv'=(v^2-v-6)/(2v+1)\)'dir. \(v^2-v-6=(v-3)(v+2)\) kökleri \(v=3\) ve \(v=-2\) verir; bunlar \(y^3=3x\) ve \(y^3=-2x\) dallarıdır. \(v\neq3,-2\) kolunda \((2v+1)/(v^2-v-6)\,dv=dx/x\) integre edilir:

$$(y^3-3x)^7(y^3+2x)^3=Cx^{15}$$

Kısmi kesir ayrışımı \((2v+1)/[(v-3)(v+2)]=7/[5(v-3)]+3/[5(v+2)]\) verir; üstel alınınca \((v-3)^7(v+2)^3=Cx^5\), geri koyunca yukarıdaki aile çıkar.

> **Dallar nerede?** \(v=3\) ve \(v=-2\) dalları \(C=0\) üyeleridir, yani genel aileye dahildir; ayrıca yazmak gerekmez. \(2y^3+x=0\) paydası ise çözüm aralığını sınırlar.

## 9. Örnek 2.11 · Özel terim: v=xy

$$\frac{x}{y}\frac{dy}{dx}=f(xy),\qquad v=xy\quad\Longrightarrow\quad x\frac{dv}{dx}=v\bigl(1+f(v)\bigr)$$

\(v=xy\) seçilince \(dv/dx=y+xy'=y[1+f(v)]\) olur; \(y=v/x\) olduğundan \(xv'=v(1+f(v))\). \(f(v)+1=0\) kökleri varsa bunlar \(xy=v_0\) doğru çözümleridir; aksi hâlde değişkenler ayrılır. Kitabın özel örneğinde \(f(v)=(2+v^2)/(2-v^2)\) olduğundan \(xv'=4v/(2-v^2)\) ve \((1/(2v)-v/4)\,dv=dx/x\) çıkar. İntegral \((1/2)\ln|v|-v^2/8=\ln|x|+C\), ikiyle çarpılınca:

$$\ln\left|\frac{y}{x}\right|-\frac{x^2y^2}{4}=C$$

> **Kayıp dal kontrolü.** \(f(v)+1=4/(2-v^2)\) hiç sıfırlanmaz, kayıp sabit dal yoktur. \(v=0\), yani \(y=0\), dışlanır; \(v=\pm\sqrt2\) orijinal denklemin kutuplarıdır, çözüm değildir.

## 10. Örnek 2.12 · Köklü ifade: v²=x²−y²

$$\frac{dy}{dx}=\frac{\sqrt{x+y}-\sqrt{x-y}}{\sqrt{x+y}+\sqrt{x-y}},\qquad x>0,\ |y|<x$$

Pay ve payda eşlenikle çarpılınca pay \(x^2-y^2\), payda \(y\) olur; denklem \(y'=(x-\sqrt{x^2-y^2})/y\) biçimine gelir. Kökten kurtulmak için \(v^2=x^2-y^2\) seçilir. Türev alınca \(2x-2yy'=2vv'\), yani \(y'=(x-vv')/y\) olur. Bunu indirgenmiş denklemde kullanınca \(vv'=v\) çıkar. \(v\neq0\) kolunda \(v'=1\), dolayısıyla \(v=x+C\)'dir. Geri dönüş:

$$y^2=-2Cx-C^2$$

Bu, \(x^2-y^2=(x+C)^2\) biçimindeki parabol ailesidir.

> **Zarf ve sınır.** \(v>0\) dalında \(x>-C\) ve \(|y|<x\) korunur. \(v=0\) sınırındaki \(y=\pm x\) doğruları tekil çözümlerdir; \(y=0\) ise \(C=0\) üyesidir. \(x=-C\) noktasında \(v=0\) olduğundan aralık açıktır.

## 11. Karar özeti

| Durum | Yol | Sonuç |
| --- | --- | --- |
| Homojen | \(v=y/x\), sonra ayır | \(\ln|x|+C=\int dv/[f(v)-v]\) |
| Kesişen doğrular | Ekseni kaydır, sonra \(v=Y/X\) | Homojen aile; geri dönüşte elips |
| Paralel doğrular | \(v=a_1x+b_1y\) | Ayrılabilir; \(v\) kökü tekil dal adayı |
| Özel terim | Terimi tek \(v\) yap | \(v'\), \(y'\) cinsinden yazılır |

Pay ve payda doğrusal olduğunda hangi dönüşümün gerektiğini katsayılar söyler:

$$\frac{dy}{dx}=\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$$

\(a_1b_2-a_2b_1\neq0\) ise doğrular kesişir: ekseni kaydır, sonra homojenleştir. Sıfırsa doğrular paraleldir: \(v=a_1x+b_1y\) al. Her durumda böldüğün çarpanın kökünü asıl denklemde sına ve tekil dalları genel aileden ayrı yaz.

## 12. Deney: dört aileyi karşılaştır

Atölyede \(x_0=1\) sabittir; A ve B kaydırıcıları \(y(1)\) başlangıç değerini değiştirir. Önce tahmin et: başlangıç değerini büyütünce hangi ailede tanım aralığı iki uçtan da genişler, hangisinde yalnız bir uç değişir?

> **Tahmin.** Dairede aralık \((0,A)\) olduğu için büyüyen \(A\) her iki ucu da iter. Köklü ailede sol uç \(-C\)'ye bağlıdır, sağ uç sonsuza gider; bu yüzden yalnız sol uç hareket eder.

Daire ailesi \(x^2+y^2=Ax\) biçimindedir; merkez \((A/2,0)\), yarıçap \(A/2\)'dir:

$$x^2+y^2=Ax,\qquad A=\frac{x_0^2+y_0^2}{x_0}$$

Elips ailesinde \(A\) büyüdükçe elips büyür ve bağlı aralık iki kutup arasında kalır:

$$x^2-xy+y^2=A$$

Toplam ailesinde her dal iki dikey kutup arasında yaşar; grafikteki dikey sınırlar gerçek kutuplardır:

$$y+x=\tan(x+C)$$

Köklü ailede \(C\) negatiftir; bağlı aralık \((-C,\infty)\) olur ve \(x=-C\) sınırında \(v=0\)'a yaklaşılır:

$$x^2-y^2=(x+C)^2$$

Gözlem soruları: \(A\) büyürken dairede aralık neden \((0,A)\) olur? Elipste neden iki uç birden değişir? Toplam ailesinde aralık neden kutuplarla sınırlıdır? Köklü ailede neden yalnız sol uç değişir? Yanıtlarını dersin not defterine yaz; ardından aynı başlangıç değerini dört ailede karşılaştır.

## Vizeye hazırlan

Dört çözümlü vaka sırasıyla homojen başlangıç değer problemini, arktanjantlı homojen denklemi, kesişen doğruları ve köklü dönüşümü kapsar. Her vakada aynı sırayı izle: denklemi sınıflandır, dönüşümü seç, türev zincirini kur, ayır ve integre et, geri dön, başlangıç verisini uygula, kaybolan dalı sına, örtük türevle doğrula ve aralığı yaz. Ardından 11 soruluk kontrol bölümüyle kendini sına.

## Kontrol listesi

- Sağ taraf yalnız \(y/x\)'in fonksiyonu mu, yoksa özel bir terim mi var?
- Dönüşümden sonra türev zincirini doğru kurdum mu?
- Böldüğüm ifade hangi değerlerde sıfır; bu kökler çözüm veriyor mu?
- Geri dönüşü ve başlangıç verisini doğru uyguladım mı?
- Örtük türevle doğruladım mı ve kutupları dışlayan aralığı yazdım mı?


---

Çalışma desteği: rehberli gerekçeler için konunun atölyesini, çözümlü sorular için sınav hazırlığı ekranını aç. Kendi açıklamanı dersin not defterine kaydet.
