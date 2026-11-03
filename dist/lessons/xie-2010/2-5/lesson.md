# §2.5 · Bağımlı veya bağımsız değişken için çözülebilen denklemler

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.5, basılı s.61–67 / PDF s.79–85. Örnek 2.35–2.39. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- Birinci mertebe bir denklemi \(p=y'\) parametresiyle \(F(x,y,p)=0\) biçiminde okumayı.
- Denklemi \(y\) veya \(x\) için çözüp \(p\)'ye göre **ayrılabilir** bir denkleme geçmeyi.
- \(p\) elenemediğinde çözümü **parametrik** bırakmayı ve bunun eksik bir cevap olmadığını görmeyi.
- Clairaut denkleminde doğru ailesini, ona teğet **tekil çözümden** ayırmayı.
- Tekil çözümün dalını ve tanım aralığını yazıp sonucu türevle doğrulamayı.

## Karar haritası

Bölümün tamamı tek bir alışkanlığa dayanır: denklemi türev \(p\) cinsinden yaz, sonra **çözebildiğin değişkeni** seç.

$$F(x,y,p)=0,\qquad p=y'$$

| Denklemin elverişli biçimi | Türev değişkeni | Elde edilen denklem |
| --- | --- | --- |
| \(y=f(x,p)\) | \(x\) | \(p=f_x+f_p\,dp/dx\) |
| \(x=g(y,p)\) | \(y\) | \(1/p=g_y+g_p\,dp/dy\) |
| \(y=xp+f(p)\) | \(x\) | \((x+f'(p))\,dp/dx=0\) |

> **Ortak fikir.** Üç satır da aynı şeyi söyler: eğriyi \(p\)'nin fonksiyonu olarak yaz, sonra \(p\)'ye göre ayrılabilir bir denklem çöz. Clairaut satırında denklem zaten bu biçimdedir; geriye yalnız çarpanları ayırmak kalır.

## 1. p parametresi ve tekil çözüm

Genel çözüm, serbest bir \(C\) parametresi taşıyan bir eğri ailesidir:

$$y=\phi(x,C)$$

Bazı denklemlerin, bu aileden hiçbir \(C\) ile çıkmayan ek bir çözümü vardır. Bu çözüme **tekil çözüm** denir ve ailenin zarfı olur:

$$y=\psi(x),\qquad \psi(x)\neq\phi(x,C)\quad\forall C$$

> **Sezgi.** Tekil çözüm "daha iyi" bir çözüm değildir; ailenin sınırını çizen eğridir. Her \(C\) eğrisi zarfı tek bir noktada öper, o noktada iki eğrinin hem değeri hem eğimi aynıdır. Bu yüzden tekil çözüm genel aileden ayrı yazılır.

## 2. y için çözülebilen denklemler

Denklem \(y\) için açıkça çözülebiliyorsa

$$y=f(x,p)$$

yazılır. \(x\)'e göre türev, \(p=y'\) tanımı sayesinde \(p\)'yi kendi denklemine çevirir:

$$p=\frac{\partial f}{\partial x}+\frac{\partial f}{\partial p}\frac{dp}{dx}$$

Aynı satır diferansiyel biçimde yazılırsa \(dx\)'e bölmek yukarıdaki denklemi geri verir:

$$dy=\frac{\partial f}{\partial x}\,dx+\frac{\partial f}{\partial p}\,dp$$

Bu, \(x\) ile \(p\) arasında birinci mertebe bir denklemdir; çözümü \(\varphi(x,p,C)=0\) biçiminde bir parametre taşır. Buradan iki çıkış yolu vardır.

- \(p\) kolayca yalıtılabiliyorsa elenir ve kapalı çözüm yazılır: \(y=f(x,p(x,C))\).
- Yalıtılamıyorsa \(x\) ve \(y\) parametre olarak bırakılır.

$$x=x(p),\qquad y=f\bigl(x(p),p\bigr)$$

> **Yanlış okuma.** Parametrik gösterim yarım kalmış bir çözüm değildir. \(p\) serbest parametredir; her \(p\) değeri eğri üzerinde tek bir nokta verir ve o noktadaki eğim tam olarak \(p\)'dir.

## 3. x için çözülebilen denklemler

Denklem \(x\) için çözülebiliyorsa

$$x=g(y,p)$$

yazılır ve bu kez türev \(y\)'ye göre alınır. \(dx/dy=1/p\) olduğundan zincir kuralı şu biçimi alır:

$$\frac1p=\frac{\partial g}{\partial y}+\frac{\partial g}{\partial p}\frac{dp}{dy}$$

Diferansiyel biçimde:

$$dx=\frac{\partial g}{\partial y}\,dy+\frac{\partial g}{\partial p}\,dp$$

Çözüm \(\psi(y,p,C)=0\) olur ve \(p\) elenemiyorsa parametrik gösterime geçilir:

$$y=y(p),\qquad x=g\bigl(y(p),p\bigr)$$

Seçim kuralı cebirseldir: **hangi değişken denklemden daha az işlemle çıkıyorsa o çözülür.** Amaç \(p\)'nin türevine göre ayrılabilir bir denklem elde etmektir; yolu denklemin görünüşü belirler.

## 4. Örnek 2.35 · x için çözülebilen denklem

$$x=p+p^4,\qquad p=y'$$

Denklem \(x\) için zaten çözülmüştür, bu yüzden \(y\)'ye göre türev alınır. Gereken iki yardımcı türev:

$$\frac{dx}{dp}=1+4p^3,\qquad \frac{dy}{dp}=p+4p^4$$

İkincisi \(dx/dy=1/p\) zincirinden gelir. Zinciri yazınca değişkenler ayrılır ve integral doğrudan alınır:

$$\frac1p=\left(1+4p^3\right)\frac{dp}{dy}\quad\Longrightarrow\quad dy=\left(p+4p^4\right)dp$$

$$y=\frac12p^2+\frac45p^5+C$$

\(p\) cebirsel olarak elenemediği için genel çözüm parametrik kalır:

$$x=p+p^4,\qquad y=\frac12p^2+\frac45p^5+C$$

Türev oranı, \(p=y'\) tanımıyla birebir tutarlıdır:

$$\frac{dy}{dx}=\frac{dy/dp}{dx/dp}=\frac{p+4p^4}{1+4p^3}=p$$

> **Sonuç.** Bu ailede tekil çözüm yoktur; her \(p\) değeri bir \(C\) eğrisi üzerinde bir nokta verir, zarf oluşmaz. Parametrik cevap bu denklemin doğal ve tam cevabıdır.

## 5. Örnek 2.36 · y için çözülebilen denklem

$$xp^2-2yp-x=0$$

> **İlk kontrol**
>
> \(p=0\) konunca \(-x=0\) kalır. Bu yalnız \(x=0\) noktasında sağlanır ve bir çözüm eğrisi vermez; bu yüzden \(p\neq0\) alınır.

Denklemi \(y\) için çöz:

$$y=\frac{x\left(p^2-1\right)}{2p}=\frac{x}{2}\left(p-\frac1p\right)$$

\(x\)'e göre türev alıp terimleri düzenleyince iki taraf da \((p^2+1)\) çarpanını taşır:

$$p=\frac12\left(p-\frac1p\right)+\frac{x}{2}\left(1+\frac1{p^2}\right)\frac{dp}{dx}$$

$$p^2+1\neq0\quad\Longrightarrow\quad \frac{p^2+1}{p}=\frac{x\left(p^2+1\right)}{p^2}\frac{dp}{dx}\quad\Longrightarrow\quad \frac{dp}{p}=\frac{dx}{x}$$

İntegral, logaritmaları tek satırda toplar:

$$\ln|p|=\ln|x|+\ln|C|\quad\Longrightarrow\quad p=Cx$$

$$2y=Cx^2-\frac1C$$

İkinci yol olarak \(x\)'i \(y\)'nin fonksiyonu yazmak aynı aileyi \(C\mapsto1/C\) dönüşümüyle verir; tek bir genel çözüm yazmak yeterlidir. \(p=\pm1\) özel değerleri \(y=0\) verir, fakat \(y=0\) asıl denklemi sağlamaz ve dışlanır.

## 6. Örnek 2.37 · Clairaut tipi ve tekil çember

$$y=xp+\sqrt{1+p^2}$$

\(x\)'e göre türev alıp \(p\)'yi sadeleştirince iki çarpan kalır:

$$p=p+\left(x+\frac{p}{\sqrt{1+p^2}}\right)\frac{dp}{dx}\quad\Longrightarrow\quad \left(x+\frac{p}{\sqrt{1+p^2}}\right)\frac{dp}{dx}=0$$

Birinci dal \(dp/dx=0\), yani \(p=C\); bu, eğimi \(C\) ve \(y\)-keseni \(\sqrt{1+C^2}\) olan doğru ailesidir:

$$y=Cx+\sqrt{1+C^2}$$

İkinci dalda \(x=-p/\sqrt{1+p^2}\) olur. Bunu \(y\) ifadesine koyunca \(y=1/\sqrt{1+p^2}\) çıkar ve iki denklemin kareleri toplamı sabitlenir:

$$x^2+y^2=1,\qquad y>0$$

> **Dal uyarısı.** Yalnız üst yarım çember geçerlidir: karekök pozitif daldan alındığı için \(y<0\) denklemi sağlamaz. Her \(C\) doğrusu çembere bir noktada teğettir ve o nokta \(x_0^2+y_0^2=1\), \(y_0>0\) koşulunu sağlar. Türev kontrolü \(y'=-x/y\) verir.

## 7. Clairaut denklemi

$$y=xp+f(p)$$

biçimindeki denkleme **Clairaut denklemi** denir. \(x\)'e göre türev, \(p\)'yi iki çarpanın çarpımı olarak bırakır:

$$p=p+\left(x+f'(p)\right)\frac{dp}{dx}\quad\Longrightarrow\quad \left(x+f'(p)\right)\frac{dp}{dx}=0$$

Birinci dal \(dp/dx=0\), yani \(p=C\): genel çözüm bir **doğru ailesidir**.

$$y=Cx+f(C)$$

İkinci dal \(x=-f'(p)\) ise tekil çözümü parametrik verir:

$$x=-f'(p),\qquad y=f(p)-p f'(p)$$

> **Zarfın sınırı.** Bu eğri doğru ailesinin zarfıdır; her \(C\) doğrusu zarfa teğettir. Tanım aralığı \(f\)'nin türevlenebildiği ve \(p\)'nin gerçek kaldığı aralıktır; aralık genel aileden bağımsız yazılır.

## 8. Örnek 2.38 · p=0 dalı ve tekil çözüm

$$y^2p^2+3xp-y=0$$

> **İlk kontrol**
>
> \(-y=0\) kalır, yani \(y=0\) gerçekten bir çözümdür. Bu dal genel aileden ayrıca yazılmalıdır.

\(p\neq0\) için denklemi \(x\) için çözüp \(y\)'ye göre türev al:

$$x=\frac{y-y^2p^2}{3p}=\frac13\left(\frac{y}{p}-y^2p\right)$$

$$\frac1p=\frac13\left(\frac1p-2yp\right)-\frac13\left(\frac{y}{p^2}+y^2\right)\frac{dp}{dy}$$

Düzenleme, denklemi iki bağımsız çarpana ayırır:

$$\left(yp^2+1\right)\left(\frac{y}{p}\frac{dp}{dy}+2\right)=0$$

İkinci çarpan genel aileyi üretir:

$$\frac{dp}{p}=-\frac{2\,dy}{y}\quad\Longrightarrow\quad p=\frac{C}{y^2}\quad\Longrightarrow\quad y^3-3Cx-C^2=0$$

Birinci çarpan \(yp^2+1=0\) tekil çözüme gider. Buradan \(p^2=-1/y\) yalnız \(y<0\) için gerçektir; \(x\) ifadesinin karesinde \(y^2p^2=-y\) kullanılınca eğri kapalı biçimde çıkar:

$$x^2=-\frac{4y^3}{9}\quad\Longrightarrow\quad 9x^2+4y^3=0$$

> **Kaçırılan dal.** Tekil eğri \(y\le0\) dalındadır ve hiçbir \(C\) ile genel aileden çıkmaz. \(y=0\) çözümü bu eğriye \(x=0\)'da değer; onu ayrı bir dal olarak yazmayı unutma.

## 9. Örnek 2.39 · Clairaut denklemi ve tekil parabol

$$y=xp+\frac{a^2}{p},\qquad p\neq0$$

\(x\)'e göre türev:

$$p=p+\left(x-\frac{a^2}{p^2}\right)\frac{dp}{dx}\quad\Longrightarrow\quad \left(x-\frac{a^2}{p^2}\right)\frac{dp}{dx}=0$$

Birinci dal \(p=C\): eğimi \(C\) olan doğru ailesi.

$$y=Cx+\frac{a^2}{C}$$

İkinci dalda \(p^2=a^2/x\), yani \(x=a^2/p^2\) ve \(y=2a^2/p\). \(p\) elenince tekil çözüm bir parabol olur:

$$y^2=4a^2x$$

> **Dal ve doğrulama.** Parabol yalnız \(x>0\) üzerinde gerçektir. \(a>0\) için pozitif \(C\) doğruları üst dala \(y=2a\sqrt x\), negatif \(C\) doğruları alt dala \(y=-2a\sqrt x\) teğettir. Türev kontrolü \(2yy'=4a^2\), yani \(y'=2a^2/y\).

## 10. Karar özeti

| Denklemin biçimi | İzlenecek yol | Genel çözüm | Tekil çözüm |
| --- | --- | --- | --- |
| \(y=f(x,p)\) | \(x\)'e göre türev | \(y=f(x,p(x,C))\) veya \(x=x(p)\), \(y=f(x(p),p)\) | genellikle yok; ayrıca ara |
| \(x=g(y,p)\) | \(y\)'ye göre türev | \(y=y(p)\), \(x=g(y(p),p)\) | sıfır çarpanından doğabilir |
| \(y=xp+f(p)\) | Clairaut: çarpanları ayır | \(y=Cx+f(C)\) | \(x=-f'(p)\), \(y=f(p)-pf'(p)\) |

Her durumda son adım aynıdır: genel çözümü ve varsa tekil çözümü asıl denklemde yerine koyup doğrula.

$$F\bigl(x,y(x),y'(x)\bigr)=0,\qquad p=y'$$

## 11. Deney: dört aileyi karşılaştır

Atölyedeki dört aile, bölümün dört ayrı kararını temsil eder.

| Aile | Denklem | Genel çözüm | Tekil çözüm |
| --- | --- | --- | --- |
| Clairaut karesi | \(y=xp+p^2\) | \(y=Cx+C^2\) | \(y=-x^2/4\) |
| Clairaut tersi | \(y=xp+1/p\) | \(y=Cx+1/C\) | \(y^2=4x\) |
| \(x\) için çözülebilen | \(y^2p^2+3xp-y=0\) | \(y^3=3Cx+C^2\) | \(9x^2+4y^3=0\) |
| \(y\) için çözülebilen | \(xp^2-2yp-x=0\) | \(2y=Cx^2-1/C\) | yok |

A ve B aynı ailenin farklı \(C\) parametreleridir. Seçili inceleme noktasında eğrinin değeri, eğimi \(p\), zarfın değeri ve teğet noktası birlikte okunur. Kesikli altın çizgi tekil çözümdür ve genel eğri ona teğettir. Eğri pencereden çıktığında çözümün bittiği sonucuna varma; gerçek sınır ailenin tanım aralığıdır.

## Vizeye hazırlan

Dört çözümlü vaka sırasıyla parametrik denklemi, iki yoldan çözülebilen denklemi, \(p=0\) dalı ile tekil çözümü ve Clairaut denklemini kapsar. Her vakada aynı sırayı izle: hangi değişkenin çözüleceğine karar ver, türev zincirini kur, ayrılabilir denklemi çöz, \(p\)'yi ele veya parametrik bırak, tekil çözümü ayrıca yaz ve türevle doğrula. Ardından 11 soruluk kontrol bölümüyle kendini sına.

## Kontrol listesi

- Denklem \(y\) için mi, \(x\) için mi daha az işlemle çözülüyor?
- \(p=y'\) zinciri doğru mu; \(\partial f/\partial p\) ve \(\partial g/\partial p\) terimleri yerinde mi?
- \(dx/dy=1/p\) kullanıldı mı; \(p=0\) ayrıca denendi mi?
- \(p\) elenebiliyor mu, yoksa parametrik gösterim mi gerekiyordu?
- Clairaut denkleminde \(dp/dx=0\) ve \(x=-f'(p)\) dalları ayrıldı mı?
- Tekil çözüm genel aileden bağımsız mı; dalı, tanım aralığı ve zarf özelliği yazıldı mı?
- Sonuç asıl denklemde ve türevle doğrulandı mı?
