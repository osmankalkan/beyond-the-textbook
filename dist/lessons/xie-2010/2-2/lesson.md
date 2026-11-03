# §2.2 · Değişken dönüşümleri

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.2, basılı s.20–30 / PDF s.38–48. Örnek 2.4–2.12. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu konudaki çalışma planın

Birinci mertebe denklemi önce sınıflandır: sağ taraf yalnız y/x’in fonksiyonu mu, pay ve payda doğrusal mı, yoksa x+y, x−y, y³/x, xy, x²−y² gibi tekrar eden özel bir terim mi var? Uygun dönüşümü seç, türev zincirini doğru kur, ayır ve integre et, geri dön, başlangıç verisini uygula, türevle doğrula ve tanım aralığını yaz. Bölme yaptığın her yerde kaybolabilecek sabit dalları asıl denklemde ayrıca sına. Vize bölümünde bu kararlar süreli ve puanlamalı dört örnek üzerinde çalışılır.

## 1. Homojen denklem: v=y/x

Sağ taraf yalnız y/x oranına bağlıysa denklem homojendir. y=vx yazıp çarpım kuralıyla türev alınca x ve v ayrılabilir hale gelir:

$$\frac{dy}{dx}=f\left(\frac{y}{x}\right)$$

$$y=vx,\qquad \frac{dy}{dx}=v+x\frac{dv}{dx}$$

$$ \frac{dv}{f(v)-v}=\frac{dx}{x}$$

Son adımda f(v)−v’ye bölüyorsun. Bu yüzden önce f(v)−v=0 köklerini çöz. Her kök v₀, y=v₀x biçiminde bir doğru çözüm adayı verir; adayı asıl denkleme koyarak doğrula. Bu dallar genel aileye dahil olabilir veya ayrıca yazılması gerekebilir. x=0 ve f(v)−v’nin tanımsız olduğu noktalar çözüm aralığının dışındadır.

## 2. Örnek 2.4 · Homojen başlangıç değer problemi

Denklem x≠0 ve y≠0 bölgesinde tanımlıdır:

$$\frac{dy}{dx}+\frac{x}{y}+2=0,\qquad y(0)=1$$

Sağ tarafı f(v)=−(1/v+2) olarak yaz. y=vx dönüşümünde:

$$v+x\frac{dv}{dx}=-\left(\frac{1}{v}+2\right)$$

$$x\frac{dv}{dx}=-\frac{(v+1)^2}{v}$$

Burada f(v)−v=−(v+1)²/v. Kök v=−1, yani y=−x doğrusu denklemin gerçek bir çözümüdür; ancak y(0)=1 verisini sağlamaz. Şimdi v≠−1 kolunda değişkenleri ayır:

$$\frac{v}{(v+1)^2}\,dv=-\frac{dx}{x}$$

v/(v+1)²=1/(v+1)−1/(v+1)² olduğundan iki tarafın integrali:

$$\ln|v+1|+\frac{1}{v+1}=-\ln|x|+C$$

v=y/x geri konur ve logaritmalar birleştirilirse örtük aile elde edilir:

$$\ln|y+x|+\frac{x}{y+x}=C$$

Başlangıç noktası (0,1) bu aileye konunca ln1+0=C, yani C=0 olur. Dal y+x>0 üzerindedir. Doğrulama için örtük türev al: y′=−(x+2y)/y, bu da y′+x/y+2=0 demektir. Aralığı görmek için u=y+x yaz; C=0 ailesi x=−u ln u, y=u(1+ln u) verir. (0,1) noktası u=1’e karşılık gelir. u>1/e için x<1/e ve y>0’dır; u→1/e⁺ iken x→1/e⁻ ve y→0⁺, u→∞ iken x→−∞ ve y→∞. x=1/e’de y=0 olduğundan orijinal denklem tanımsızdır. En geniş çözüm aralığı x<1/e, y>0’dır.

## 3. Örnek 2.5 · Logaritmik homojen denklem

x>0 ve y>0 bölgesinde:

$$x(\ln x-\ln y)\,dy-y\,dx=0,\qquad x>0,\ y>0$$

Denklemi x’e bölüp v=y/x yazınca, ln x−ln y=−ln v ve y′=−v/ln v olur. Çarpım kuralıyla:

$$x\frac{dv}{dx}=-\frac{v(1+\ln v)}{\ln v}$$

ln v≠0 ve v>0 kolunda değişkenleri ayır:

$$\frac{\ln v}{v(1+\ln v)}\,dv=-\frac{dx}{x}$$

u=ln v dönüşümüyle ∫u/(1+u)du=u−ln|1+u| olur. Böylece ln v−ln|1+ln v|=−ln x+C, üstel alınınca xv/(1+ln v)=C, yani y/(1+ln y−ln x)=C elde edilir. Ayrıca 1+ln v=0 kökü v=1/e verir; bu, genel ailede hiçbir sonlu C için bulunmayan tekil çözümdür:

$$\frac{y}{1+\ln y-\ln x}=C,\qquad y=\frac{x}{e}$$

Türevle doğrula: ailenin örtük türevi asıl denklemi geri verir. y=x/e dalında y′=1/e sabittir ve denklem sağlanır. v=0, yani y=0, orijinal logaritma yüzünden tanımsızdır.

## 4. Örnek 2.6 · Arktanjantlı homojen denklem

$$(y+x)\,dy+(x-y)\,dx=0$$

y=−x bir çözüm değildir; x≠0 bölgesinde pay ve payda x’e bölününce sağ taraf (v−1)/(v+1) olur. v=y/x ile v+xv′=(v−1)/(v+1), dolayısıyla xv′=−(v²+1)/(v+1). Değişkenleri ayırıp (v+1)/(v²+1)=v/(v²+1)+1/(v²+1) ayrışımını kullanınca:

$$\ln(x^2+y^2)+2\arctan\frac{y}{x}=C$$

İntegralde (1/2)ln(v²+1)+arctan v=−ln|x|+C çıkar; ikiyle çarpıp ln|x|’yi birleştirince yukarıdaki aile elde edilir. v²+1>0 olduğundan kayıp sabit dal yoktur. x=0 ve arktanjantın seçilen dalı ayrıca belirtilir; örtük türev asıl diferansiyel formu verir.

## 5. Örnek 2.7 · Kesişen doğrular: önce ekseni kaydır

$$ \frac{dy}{dx}=\frac{2x-y+1}{x-2y+1}$$

2x−y+1=0 ve x−2y+1=0 doğruları (−1/3,1/3) noktasında kesişir. Sabit terimleri yok etmek için eksenleri bu noktaya taşı:

$$x=X-\frac13,\qquad y=Y+\frac13$$

Yeni denklem dY/dX=(2X−Y)/(X−2Y) olur ve homojendir. v=Y/X ile Xv′=2(v²−v+1)/(1−2v). (1−2v)/(v²−v+1) dv=2 dX/X integre edilince −ln(v²−v+1)=2ln|X|+C, yani X²(v²−v+1)=A çıkar. Geri dönüş:

$$x^2-xy+y^2+x-y+\frac13=A$$

A>0 için bu, merkezi kaydırılmış bir elipstir. X=0, yani x=−1/3 paydayı sıfırlar; bu doğru çözüm aralığına katılmaz. A=0 durumu noktaya çöker.

## 6. Örnek 2.8 · Paralel doğrular: v=x−y

$$ \frac{dy}{dx}=\frac{x-y+5}{2x-2y-2}$$

Pay ve payda x−y terimini tekrarlar; doğrular paraleldir, sonlu kesişim yoktur. v=x−y seçilince v′=1−y′ olur ve denklem dv/dx=(v−7)/(2(v−1)) biçimine indirgenir. v≠7 kolunda 2(v−1)/(v−7)dv=dx; (v−1)/(v−7)=1+6/(v−7) ayrışımıyla integral 2v+12ln|v−7|=x+C verir. Düzenlenince genel aile ve v=7’den gelen tekil dal birlikte yazılır:

$$\frac{x}{2}-y+6\ln|x-y-7|=C,\qquad x-y=7$$

x−y=7 doğrusu paydayı sıfırlar gibi görünse de asıl denkleme konunca her iki taraf 1 olur; bu yüzden gerçek bir tekil çözümdür. x−y=1 ise orijinal paydayı sıfırladığından tanım bölgesinin dışındadır.

## 7. Örnek 2.9 · Özel terim: v=x+y

$$ \frac{dy}{dx}=(x+y)^2$$

Denklem ne ayrılabilir ne de y/x’in tek başına fonksiyonudur. Tekrarlanan terim x+y’dir; v=x+y seçilince v′=1+y′=1+v² olur. 1+v² hiç sıfırlanmadığı için bölme sabit bir dal kaybettirmez. arctan v=x+C, yani:

$$y=\tan(x+C)-x$$

Doğrulama: y′=sec²(x+C)−1=tan²(x+C)=(x+y)². Çözüm, kosinüsün sıfırlanmadığı bağlı aralıkta yaşar; kutuplar x+C=π/2+kπ’dir ve aralık açık yazılır.

## 8. Örnek 2.10 · Özel terim: v=y³/x

$$ \frac{dy}{dx}=\frac{y^6-2x^2}{2xy^5+x^2y^2}$$

x>0, y≠0 ve 2y³+x≠0 bölgesinde pay ve payda x²’ye bölününce özel terim y³/x belirir. v=y³/x, yani y³=vx seçilir; 3y²y′=v+xv′ olur. İndirgenmiş denklem (1/3)(v+xv′)=(v²−2)/(2v+1), dolayısıyla xv′=(v²−v−6)/(2v+1)’dir. v²−v−6=(v−3)(v+2) kökleri v=3 ve v=−2 verir; bunlar y³=3x ve y³=−2x dallarıdır. v≠3,−2 kolunda (2v+1)/(v²−v−6)dv=dx/x integre edilir; kısmi kesirlerle:

$$(y^3-3x)^7(y^3+2x)^3=Cx^{15}$$

Kısmi kesir ayrışımı (2v+1)/[(v−3)(v+2)]=7/[5(v−3)]+3/[5(v+2)] verir. Üstel alınınca (v−3)⁷(v+2)³=Cx⁵, v=y³/x geri konunca yukarıdaki aile çıkar. v=3 ve v=−2 dalları C=0 üyeleri olarak genel aileye dahildir; ayrıca yazmak gerekmez. 2y³+x=0 paydası ise çözüm aralığını sınırlar.

## 9. Örnek 2.11 · Özel terim: v=xy

$$ \frac{x}{y}\frac{dy}{dx}=f(xy),\qquad y\neq0$$

v=xy seçilince dv/dx=y+xy′=y[1+f(v)] olur; y=v/x olduğundan x dv/dx=v(1+f(v)). f(v)+1=0 kökleri varsa bunlar xy=v₀ doğru çözümleridir. Aksi halde değişkenler ayrılır:

$$\frac{dv}{v(1+f(v))}=\frac{dx}{x}$$

Kitabın özel örneğinde f(v)=(2+v²)/(2−v²) olduğundan x dv/dx=4v/(2−v²) ve (1/(2v)−v/4)dv=dx/x çıkar. İntegral (1/2)ln|v|−v²/8=ln|x|+C, ikiyle çarpılınca:

$$\ln\left|\frac{y}{x}\right|-\frac{x^2y^2}{4}=C$$

f(v)+1=4/(2−v²) hiç sıfırlanmaz; kayıp sabit dal yoktur. v=0 yani y=0 dışlanır; v=±√2 ise orijinal denklemin kutuplarıdır, çözüm değildir. x>0 seçilen dalda logaritma ve aralık korunur.

## 10. Örnek 2.12 · Köklü ifade: v²=x²−y²

$$ \frac{dy}{dx}=\frac{\sqrt{x+y}-\sqrt{x-y}}{\sqrt{x+y}+\sqrt{x-y}},\qquad x>0,\ |y|<x$$

Pay ve payda eşlenikle çarpılınca pay x²−y², payda y olur; denklem y′=(x−√(x²−y²))/y biçimine gelir. Kökten kurtulmak için v²=x²−y² seçilir. Türev alınca 2x−2yy′=2vv′, yani y′=(x−vv′)/y olur. Bunu indirgenmiş denklemde kullanınca vv′=v çıkar. v≠0 kolunda v′=1, dolayısıyla v=x+C’dir. Geri dönüş:

$$y^2=-2Cx-C^2$$

Bu, x²−y²=(x+C)² biçimindeki parabol ailesidir. v>0 dalında x>−C ve |y|<x korunur. v=0 sınırındaki y=±x doğruları tekil çözümlerdir; y=0 ise C=0 üyesidir. Türev v′=1’i geri verir; x=−C noktasında v=0 olduğundan aralık açıktır.

## 11. Dönüşüm seçme özeti

Homojen denklemde tek karar v=y/x’tir:

$$\frac{dy}{dx}=f\left(\frac{y}{x}\right)\quad\Longrightarrow\quad v=\frac{y}{x}$$

Pay ve payda doğrusal olduğunda önce doğruların kesişip kesişmediğine bak:

$$\frac{dy}{dx}=\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$$

Doğrular kesişiyorsa ekseni kesişim noktasına kaydır, sonra v=Y/X kullan. Paralelse v=a₁x+b₁y (veya a₂x+b₂y) seç. Özel terim varsa onu tek bir v ile temsil et: x+y, x−y, y³/x, xy veya v²=x²−y². xy dönüşümünün genel sonucu:

$$x\frac{dv}{dx}=v(1+f(v))$$

Her durumda böldüğün çarpanın köklerini asıl denklemde sına; tekil dalları genel aileden ayrı yaz. Başlangıç verisi varsa önce hangi bağlı dalda olduğunu belirle, sonra aralığı kutuplara kadar açık yaz.

## 12. Deney: dört aileyi karşılaştır

Atölyede x₀=1 sabittir; A ve B kaydırıcıları y(1) başlangıç değerini değiştirir. Önce tahmin et: başlangıç değerini büyütünce hangi ailede tanım aralığı iki uçtan da genişler, hangisinde yalnız bir uç değişir? Sonra dört aileyi sırayla aç ve gözlemini kaydet.

Daire ailesi x²+y²=Ax biçimindedir; A=(x₀²+y₀²)/x₀ başlangıç verisini belirler. Merkez (A/2,0), yarıçap A/2’dir ve bağlı aralık (0,A)’dır. y(1)=0 seçimi geçersizdir; x=0 ve y=0 orijinal denklemde tanımsızdır.

$$x^2+y^2=Ax,\qquad A=\frac{x_0^2+y_0^2}{x_0}$$

Elips ailesi x²−xy+y²=A biçimindedir; A büyüdükçe elips büyür. Bağlı aralık iki kutup arasındadır ve 2y(1)=1 seçimi başlangıç noktasını paydaya düşürdüğü için geçersizdir.

$$x^2-xy+y^2=A$$

Toplam ailesi y+x=tan(x+C) biçimindedir; C başlangıç noktasını kaydırır. Her dal iki dikey kutup arasında yaşar; kutuplar x+C=π/2+kπ’dir ve grafikteki dikey sınırlar gerçek kutuplardır.

$$y+x=\tan(x+C)$$

Köklü aile x²−y²=(x+C)², yani y²=−2Cx−C² parabol ailesidir. C negatiftir; bağlı aralık (−C,∞) olur ve x=−C sınırında v=0’a yaklaşılır. |y(1)|<1 gerekir; y(1)=0 dönüşümü çöktürdüğü için geçersizdir.

$$x^2-y^2=(x+C)^2$$

Gözlem soruları: A sabitini büyütünce dairede aralık neden (0,A) olur? Elipste neden iki uç birden değişir? Toplam ailesinde neden aralık kutuplarla sınırlıdır? Köklü ailede neden yalnız sol uç değişir? Yanıtlarını dersin not defterine yaz; ardından aynı başlangıç değerini dört ailede karşılaştır.

## Vizeye hazırlan

Süre önerisi 18 dakika, toplam 20 puan. Önce soruları çöz; ardından her sorunun çözüm adımlarını aç. Puanlama yalnız sonuç için değil, dönüşüm seçimi, kayıp dal kontrolü, doğrulama ve aralık için verilir.

### Soru 1 · Homojen IVP (5 puan, 4 dakika)

y′+x/y+2=0, y(0)=1 problemini çöz. C’yi bul, türevle doğrula ve en geniş çözüm aralığını yaz. v=−1 dalının neden bu başlangıç verisini sağlamadığını açıkla.

### Soru 2 · Homojen genel çözüm (5 puan, 4 dakika)

(y+x)dy+(x−y)dx=0 denkleminin genel çözümünü bul. (v+1)/(v²+1) integralini iki parçaya ayır ve örtük türevle doğrula.

### Soru 3 · Kesişen doğrular (5 puan, 5 dakika)

y′=(2x−y+1)/(x−2y+1) denkleminin genel çözümünü bul. Kesişim noktasını hesapla, ekseni kaydır, homojen dönüşümü uygula ve sonucu x,y cinsine döndür.

### Soru 4 · Köklü dönüşüm (5 puan, 5 dakika)

y′=(√(x+y)−√(x−y))/(√(x+y)+√(x−y)) denklemini x>0, |y|<x bölgesinde çöz. Eşlenikle sadeleştir, v²=x²−y² dönüşümünü kur, tekil dalları belirt ve aralığı yaz.

**Puanlama:** Her soru 5 puan: dönüşüm/sınıflandırma 1, ara denklem 1, integrasyon 1, geri dönüş/başlangıç verisi 1, doğrulama ve aralık 1. Çözümler Vize hazırlığı ekranında açılır.

## Kontrol listesi

- Sağ taraf yalnız y/x’in fonksiyonu mu, yoksa özel bir terim mi var?
- Dönüşümden sonra türev zincirini doğru kurdum mu?
- Böldüğüm ifade hangi değerlerde sıfır? Bu kökler çözüm veriyor mu?
- Geri dönüşü ve başlangıç verisini doğru uyguladım mı?
- Örtük türevle doğruladım mı ve kutupları dışlayan aralığı yazdım mı?

İlerleme adımı yalnızca §2.2’yi tamamlar. Sonraki konu incelemeden sonra ele alınacaktır.


---

Çalışma desteği: rehberli gerekçeler için konunun atölyesini, çözümlü sorular için sınav hazırlığı ekranını aç. Kendi açıklamanı dersin not defterine kaydet.
