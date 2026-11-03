# §2.3 · Tam diferansiyel denklemler ve integrasyon çarpanları

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.3, basılı s.31–54 / PDF s.49–72. Örnek 2.13–2.29. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu konudaki çalışma planın

Denklemi önce \(M(x,y)\,dx+N(x,y)\,dy=0\) biçiminde yaz ve iki kısmi türevi karşılaştır: \(M_y=N_x\) ise denklem tamdır ve çözüm tek bir potansiyel \(u(x,y)=C\) düzey eğrisidir. Tam değilse çarpanı tahmin et: bölüm yalnız x’e bağlıysa \(\mu(x)\), yalnız y’ye bağlıysa \(\mu(y)\), iki değişkene birlikte bağlıysa inceleme formülleri veya gruplar yöntemi. Çarpanı bulduktan sonra potansiyeli kur, türevle doğrula ve çarpanın sıfırlandığı dalları asıl denklemde ayrıca sına. Vize bölümünde bu kararlar süreli ve puanlamalı dört örnek üzerinde çalışılır.

## 1. Tam diferansiyel ve potansiyel fonksiyon

Birinci mertebe denklemi diferansiyel formda yaz:

$$M(x,y)\,dx+N(x,y)\,dy=0$$

Sol taraf tek bir \(u(x,y)\) fonksiyonunun tam diferansiyeli ise denklem **tam**tır. Zincir kuralı:

$$du=\frac{\partial u}{\partial x}\,dx+\frac{\partial u}{\partial y}\,dy$$

Demek ki \(u_x=M\) ve \(u_y=N\) olmalıdır. Karışık kısmi türevlerin eşitliği gerekli ve yeterli koşulu verir:

$$\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}$$

Bu koşul sağlanıyorsa çözüm, potansiyelin düzey eğrisidir:

$$u(x,y)=C$$

Tamlık testi yalnız bir fonksiyonun varlığını söyler; onu bulmak için \(M\)’yi x’e göre integre et, sonucu y’ye göre türevleyip \(N\) ile karşılaştır. Alternatif olarak terimleri \(d(xy)\), \(d(y/x)\) gibi bilinen diferansiyellere grupla. İki yöntem de aynı \(u\)’yu verir.

## 2. Örnek 2.13 · Tam denklem, iki yöntem

$$(6xy^2+4x^3y)\,dx+(6x^2y+x^4+e^y)\,dy=0$$

Burada \(M=6xy^2+4x^3y\), \(N=6x^2y+x^4+e^y\). Kısmi türevler:

$$\frac{\partial M}{\partial y}=12xy+4x^3=\frac{\partial N}{\partial x}$$

Denklem tamdır. \(M\)’yi x’e göre integre ederken y sabittir; integrasyon sabiti \(g(y)\) olur:

$$u(x,y)=3x^2y^2+x^4y+g(y),\qquad \frac{\partial u}{\partial y}=6x^2y+x^4+g'(y)$$

Bunu \(N\) ile karşılaştırınca \(6x^2y+x^4\) terimleri sadeleşir ve yalnız \(g'(y)=e^y\) kalır:

$$g'(y)=e^y,\qquad u(x,y)=3x^2y^2+x^4y+e^y$$

Genel çözüm:

$$3x^2y^2+x^4y+e^y=C$$

**Gruplama ile aynı sonuç.** Terimleri üç gruba ayır:

$$(6xy^2\,dx+6x^2y\,dy)+(4x^3y\,dx+x^4\,dy)+e^y\,dy=0$$

Her grup bir tam diferansiyeldir: \(6xy^2\,dx+6x^2y\,dy=d(3x^2y^2)\), \(4x^3y\,dx+x^4\,dy=d(x^4y)\), \(e^y\,dy=d(e^y)\). Dolayısıyla \(d(3x^2y^2+x^4y+e^y)=0\). Türevle doğrula: \(u_x=M\), \(u_y=N\). Hiçbir yere bölünmediği için kayıp dal yoktur; çözüm tüm düzlemde örtüktür.

## 3. Örnek 2.14 · Trigonometrik tam denklem

$$(-y\sin x+e^x\sin2y)\,dx+(\cos x+2e^x\cos2y)\,dy=0$$

\(M_y=-\sin x+2e^x\cos2y\) ve \(N_x=-\sin x+2e^x\cos2y\) eşittir. Terimleri iki gruba ayır:

$$\left(-y\sin x\,dx+\cos x\,dy\right)+\left(e^x\sin2y\,dx+2e^x\cos2y\,dy\right)=0$$

Birinci grup \(d(-y\cos x)\), ikinci grup \(d(e^x\sin2y)\)’dir. Böylece:

$$-y\cos x+e^x\sin2y=C$$

Doğrulama: örtük türev \(y'=(y\sin x-e^x\sin2y)/(\cos x+2e^x\cos2y)\) verir; bu asıl denklemdir. Bölme yapılmadığı için tekil dal yoktur.

## 4. Örnek 2.15 · Üstel terimli tam denklem

$$2x(3x+y-ye^{-x^2})\,dx+(x^2+3y^2+e^{-x^2})\,dy=0$$

\(M=6x^2+2xy-2xye^{-x^2}\), \(N=x^2+3y^2+e^{-x^2}\). Kısmi türevler:

$$\frac{\partial M}{\partial y}=2x-2xe^{-x^2}=\frac{\partial N}{\partial x}$$

Denklem tamdır. Terimleri üç gruba ayır:

$$(2xy\,dx+x^2\,dy)+(e^{-x^2}\,dy-2xye^{-x^2}\,dx)+(6x^2\,dx+3y^2\,dy)=0$$

Gruplar sırasıyla \(d(x^2y)\), \(d(ye^{-x^2})\) ve \(d(2x^3+y^3)\)’tür. Genel çözüm:

$$x^2y+ye^{-x^2}+2x^3+y^3=C$$

İkinci grupta \(e^{-x^2}\,dy\) terimini önce almak, \(y\)’ye göre integre edip x’e göre türev almayı kolaylaştırır. Türevle doğrula; bölme yoktur.

## 5. Örnek 2.16 · x/y ve y/x içeren tam denklem

$$ \left(\frac1y\sin\frac xy-\frac{y}{x^2}\cos\frac yx+1\right)dx+\left(\frac1x\cos\frac yx-\frac{x}{y^2}\sin\frac xy+\frac1{y^2}\right)dy=0$$

Denklem \(x\neq0\), \(y\neq0\) bölgesinde tanımlıdır. \(M_y=N_x\) sağlanır; terimleri dört gruba ayır:

$$\left(\frac1y\sin\frac xy\,dx-\frac{x}{y^2}\sin\frac xy\,dy\right)+\left(-\frac{y}{x^2}\cos\frac yx\,dx+\frac1x\cos\frac yx\,dy\right)+dx+\frac{dy}{y^2}=0$$

Gruplar \(d(-\cos(x/y))\), \(d(\sin(y/x))\), \(dx\) ve \(d(-1/y)\)’dir. Genel çözüm:

$$-\cos\frac xy+\sin\frac yx+x-\frac1y=C$$

Doğrulamada \(x\) ve \(y\)’nin sıfır olduğu noktaları dışla; logaritma veya payda yoktur ama orijinal katsayılar bu noktalarda tanımsızdır.

## 6. İntegrasyon çarpanı: μ(x) ve μ(y)

Denklem tam değilse, onu tam hale getiren bir \(\mu(x,y)\) çarpanı ararız:

$$\mu(x,y)M(x,y)\,dx+\mu(x,y)N(x,y)\,dy=0$$

Tamlık koşulu \((\mu M)_y=(\mu N)_x\) yazılınca \(\mu\) için kısmi diferansiyel denklem çıkar. İki özel durumda bu denklem ayrılabilir. \(\mu\) yalnız x’e bağlıysa:

$$\frac1\mu\frac{d\mu}{dx}=\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)$$

Sağ taraf yalnız x’e bağlıysa integre edilir:

$$\mu(x)=\exp\left(\int\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)dx\right)$$

Benzer biçimde \(\mu\) yalnız y’ye bağlıysa:

$$\mu(y)=\exp\left(\int\frac1M\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)dy\right)$$

Formüldeki bölüm gerçekten tek değişkene bağlı değilse bu yol tıkanır; inceleme veya gruplar yöntemine geçilir. Çarpanı bulunca denklemin her terimini çarpmayı unutma.

## 7. Örnek 2.17 · μ(y)=e^y

$$3(x^2+y^2)\,dx+x(x^2+3y^2+6y)\,dy=0$$

\(M=3(x^2+y^2)\), \(N=x^3+3xy^2+6xy\). \(M_y=6y\), \(N_x=3x^2+3y^2+6y\); denklem tam değildir. \(y\)-bölümünü hesapla:

$$\frac1M\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=\frac{(3x^2+3y^2+6y)-6y}{3(x^2+y^2)}=1,\qquad \mu(y)=e^y$$

\(e^y\) ile çarpınca denklem tam olur ve potansiyel \(e^yx(x^2+3y^2)\) çıkar:

$$e^yx(x^2+3y^2)=C$$

Türevle doğrula: \(u_x=e^y(3x^2+3y^2)\), \(u_y=e^y(x^3+3xy^2+6xy)\). \(e^y>0\) olduğu için çarpan hiçbir dalı kaybettirmez.

## 8. Örnek 2.18 · μ(x)=e^x

$$y(2x-y+2)\,dx+2(x-y)\,dy=0$$

\(M=2xy-y^2+2y\), \(N=2x-2y\). \(M_y=2x-2y+2\), \(N_x=2\); tam değildir. \(x\)-bölümü:

$$\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)=\frac{(2x-2y+2)-2}{2(x-y)}=1,\qquad \mu(x)=e^x$$

\(e^x\) ile çarpınca potansiyel \(e^xy(2x-y)\) olur:

$$e^xy(2x-y)=C$$

Ayrıca \(y=0\) ve \(y=2x\) asıl denklemin çözümleridir. \(e^x>0\) olduğundan bunlar kaybolmaz; yine de başlangıç verisi bu doğrular üzerinde seçilemez:

$$y=0,\qquad y=2x$$

Doğrulama için \(u=e^xy(2x-y)\) fonksiyonunun örtük türevini al; \(u_x=e^xy(2x-y+2)\), \(u_y=2e^x(x-y)\).

## 9. Örnek 2.19 · μ(x)=sec²x

$$y(\cos^3x+y\sin x)\,dx+\cos x(\sin x\cos x+2y)\,dy=0$$

\(M=y\cos^3x+y^2\sin x\), \(N=\sin x\cos^2x+2y\cos x\). \(M_y=\cos^3x+2y\sin x\), \(N_x=\cos^3x-2\sin^2x\cos x-2y\sin x\); tam değildir. \(x\)-bölümü sadeleşir:

$$\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)=\frac{2\sin x}{\cos x},\qquad \mu(x)=\sec^2x$$

\(\sec^2x\) ile çarpınca potansiyel \(y\sin x+y^2/\cos x\) olur:

$$y\sin x+\frac{y^2}{\cos x}=C$$

\(\cos x=0\) noktaları başlangıçta ve çarpanda tanımsızdır; çözüm aralığı bu kutupları dışlar. Türevle doğrula.

## 10. Örnek 2.20 · μ=e^{y/x}

Önce bir teorem: eğer

$$\frac{x^2}{xM+yN}\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=F\left(\frac yx\right)$$

ise, \(u=y/x\) olmak üzere bir integrasyon çarpanı vardır:

$$\mu(x,y)=\exp\left(\int F(u)\,du\right),\qquad u=\frac yx$$

Şimdi teoremi şu denkleme uygula:

$$(2x+2xy-y-y^2)\,dx+(x^2+x+xy)\,dy=0$$

Burada \(M=2x+2xy-y-y^2\), \(N=x^2+x+xy\). \(N_x-M_y=(2x+1+y)-(2x+1-2y)=3y\). Ayrıca \(xM+yN=2x^2+3x^2y=x^2(2+3y)\). Dolayısıyla:

$$\frac{x^2}{xM+yN}\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=1,\qquad \mu=e^{y/x}$$

\(e^{y/x}\) ile çarpınca potansiyel \(x^2(1+y)e^{y/x}\) olur:

$$x^2(1+y)e^{y/x}=C$$

\(x=0\) orijinal denklemde ve çarpanda tanımsızdır. Türevle doğrula; \(e^{y/x}>0\) olduğundan ek dal kaybı yoktur.

## 11. İnceleme yöntemi: beş temel diferansiyel

Bazı denklemlerde çarpan, terimleri bilinen diferansiyellere ayırınca kendiliğinden görünür. Ezberlenecek beş formül:

$$d(xy)=y\,dx+x\,dy$$

$$d\left(\frac yx\right)=\frac{x\,dy-y\,dx}{x^2},\qquad d\left(\frac xy\right)=\frac{y\,dx-x\,dy}{y^2}$$

$$d\left(\arctan\frac yx\right)=\frac{x\,dy-y\,dx}{x^2+y^2}$$

$$d\left(\frac12\ln(x^2+y^2)\right)=\frac{x\,dx+y\,dy}{x^2+y^2}$$

$$d\left(\sqrt{x^2\pm y^2}\right)=\frac{x\,dx\pm y\,dy}{\sqrt{x^2\pm y^2}}$$

Kural: payda \(x^2+y^2\), \(x^2\), \(y^2\) veya \(\sqrt{x^2\pm y^2}\) görüyorsan önce bu formüllerle eşleştir. Çarpan çoğu zaman bölmeden sonra ortaya çıkar; böldüğün ifadenin köklerini ayrıca sına.

## 12. Örnek 2.21 · İnceleme ile tam denklem

$$(3x^4+y)\,dx+(2x^2y-x)\,dy=0$$

Terimleri \(x^2\) parantezine al:

$$x^2(3x^2\,dx+2y\,dy)+(y\,dx-x\,dy)=0$$

\(x^2\)’ye bölünce ikinci parça \(-(x\,dy-y\,dx)/x^2=-d(y/x)\) olur:

$$3x^2\,dx+2y\,dy-\frac{x\,dy-y\,dx}{x^2}=0$$

Yani \(d(x^3)+d(y^2)-d(y/x)=0\). Genel çözüm:

$$x^3+y^2-\frac yx=C$$

Burada \(\mu=1/x^2\) kullanılmıştır. \(x=0\) başlangıçta tanımsızdır; çözüm aralığı \(x\neq0\) bölgesindedir. Türevle doğrula.

## 13. Örnek 2.22 · μ=1/(x²+y²)

$$(x+x^2y+y^3)\,dx+(y+x^3+xy^2-x^2y^2-y^4)\,dy=0$$

Terimleri \(x^2+y^2\)’ye göre düzenle:

$$\left[x+y(x^2+y^2)\right]dx+\left[y+x(x^2+y^2)-y^2(x^2+y^2)\right]dy=0$$

\(x^2+y^2\)’ye bölünce üç tam diferansiyel kalır:

$$\frac{x\,dx+y\,dy}{x^2+y^2}+(y\,dx+x\,dy)-y^2\,dy=0$$

Yani \(d(\tfrac12\ln(x^2+y^2))+d(xy)-\tfrac13d(y^3)=0\). Genel çözüm:

$$\frac12\ln(x^2+y^2)+xy-\frac13y^3=C$$

Burada \(\mu=1/(x^2+y^2)\)’dir. \(x^2+y^2=0\) yani orijin dışlanır; başlangıç verisi orijinde seçilemez.

## 14. Örnek 2.23 · μ=1/[√x(x²+y²)]

$$(2x\sqrt{x}+x^2+y^2)\,dx+2y\sqrt{x}\,dy=0$$

Terimleri \(\sqrt{x}\) ve \(x^2+y^2\)’ye göre düzenle:

$$2\sqrt{x}(x\,dx+y\,dy)+(x^2+y^2)\,dx=0$$

\(\sqrt{x}(x^2+y^2)\)’ye bölünce:

$$2\frac{x\,dx+y\,dy}{x^2+y^2}+\frac{dx}{\sqrt{x}}=0$$

Yani \(2d(\tfrac12\ln(x^2+y^2))+d(2\sqrt{x})=0\). Genel çözüm:

$$\ln(x^2+y^2)+2\sqrt{x}=C$$

Burada \(\mu=1/[\sqrt{x}(x^2+y^2)]\)’dir. \(x>0\) ve \(x^2+y^2>0\) gerekir; \(x=0\) ve orijin dışlanır.

## 15. Örnek 2.24 · μ=1/y ve kayıp dal

$$y^2\,dx+(xy+y^2-1)\,dy=0$$

Terimleri \(y\) parantezine al:

$$y(y\,dx+x\,dy)+(y^2-1)\,dy=0$$

\(y=0\) denklemi sağlar; bu ayrı bir çözümdür:

$$y=0$$

\(y\neq0\) dalında \(y\)’ye bölünce \(d(xy)+\tfrac12d(y^2)-d(\ln|y|)=0\) olur. Genel çözüm ve ayrı dal birlikte:

$$xy+\frac12y^2-\ln|y|=C,\qquad y=0$$

Burada \(\mu=1/y\)’dir ve \(y=0\) dalını dışladığı için o dal ayrıca yazılır. \(y<0\) için de logaritma mutlak değerle tanımlıdır.

## 16. Örnek 2.25 · Arktanjant ve logaritma

$$xy\,dx-(x^2+x^2y+y^3)\,dy=0$$

Terimleri \(x(y\,dx-x\,dy)\) ve \(y(x^2+y^2)\,dy\) olarak ayır:

$$x(y\,dx-x\,dy)-y(x^2+y^2)\,dy=0$$

\(x^2+y^2\)’ye bölünce arktanjantın diferansiyeli görünür:

$$x\,d\left(\arctan\frac xy\right)-y\,dy=0$$

\(y\neq0\) için \(y\)’ye böl, \(u=x/y\) yaz ve \(u\,d(\arctan u)=\tfrac12d\ln(1+u^2)\) özdeşliğini kullan:

$$\ln\left(1+\frac{x^2}{y^2}\right)-2y=C,\qquad y=0$$

\(y=0\) asıl denklemin çözümüdür ve ayrıca yazılır. \(y\neq0\) dalında çözüm yukarıdaki örtük ailedir.

## 17. Gruplarla integrasyon çarpanı

Denklemi iki gruba ayır: \((M_1\,dx+N_1\,dy)+(M_2\,dx+N_2\,dy)=0\). Her grubun kendi çarpanı ve potansiyeli varsa:

$$\mu_1M_1\,dx+\mu_1N_1\,dy=dv_1,\qquad \mu_2M_2\,dx+\mu_2N_2\,dy=dv_2$$

Teorem, \(\mu_1g_1(v_1)\) ve \(\mu_2g_2(v_2)\)’nin de grup çarpanı olduğunu söyler. Ortak çarpan için uygun \(g_1,g_2\) seç:

$$\mu_1g_1(v_1)=\mu_2g_2(v_2)=\mu(x,y)$$

Pratikte \(g_1(v)=v^\alpha\), \(g_2(v)=v^\beta\) alıp üsleri eşitlemek çoğu zaman yeterlidir.

## 18. Örnek 2.26 · Ortak çarpan x²y

$$(4xy+3y^4)\,dx+(2x^2+5xy^3)\,dy=0$$

İki grup kur ve birinci grubun tam olduğunu gör:

$$(4xy\,dx+2x^2\,dy)+(3y^4\,dx+5xy^3\,dy)=0,\qquad 2d(x^2y)=4xy\,dx+2x^2\,dy$$

Birinci grupta \(\mu_1=1\), \(v_1=x^2y\). İkinci grupta \((M_y-N_x)/N=7/(5x)\) olduğundan \(\mu_2=x^{7/5}\) ve grup \(x^{12/5}y^4\)’ün diferansiyeli olur:

$$\mu_2(x)=x^{7/5},\qquad v_2=x^{12/5}y^4$$

\((x^2y)^\alpha=x^{12\beta/5+7/5}y^{4\beta}\) eşitliğinden \(\alpha=1\), \(\beta=1/4\) çıkar. Ortak çarpan:

$$\mu=x^2y$$

Çarpınca iki tam diferansiyel kalır: \(d(x^4y^2)+d(x^3y^5)=0\). Genel çözüm:

$$x^4y^2+x^3y^5=C$$

\(\mu\)’nün sıfır olduğu \(x=0\) ve \(y=0\) dalları ayrıca incelenir; başlangıç verisi bu doğrular üzerinde seçilemez.

## 19. Örnek 2.27 · Ortak çarpan √(xy)

$$(5xy-3y^3)\,dx+(3x^2-7xy^2)\,dy=0$$

İki grup:

$$(5xy\,dx+3x^2\,dy)+(-3y^3\,dx-7xy^2\,dy)=0$$

Birinci grupta \((M_y-N_x)/N=-1/(3x)\), ikinci grupta \(2/(7x)\) çıkar. Grup çarpanları ve potansiyelleri:

$$\mu_1=x^{-1/3},\quad v_1=x^{5/3}y,\qquad \mu_2=x^{2/7},\quad v_2=x^{9/7}y^3$$

Üs eşleştirmesi \(\alpha=3\beta\) ve \(-1/3+5\alpha/3=2/7+9\beta/7\) verir. Çözüm \(\alpha=1/2\), \(\beta=1/6\), dolayısıyla:

$$\alpha=\frac12,\quad\beta=\frac16,\quad\mu=x^{1/2}y^{1/2}$$

Çarpınca potansiyel \(x^{3/2}y^{3/2}(x-y^2)\) olur:

$$x^{3/2}y^{3/2}(x-y^2)=C$$

\(x=0\) ve \(y=0\) dalları çarpanın sıfırlarıdır; ayrıca incelenir. Türevle doğrula.

## 20. Örnek 2.28 · İnceleme ve gruplar birlikte

$$(y\,dx-x\,dy)+\sqrt{xy}\,dy=0,\qquad x>0,\ y>0$$

\(x^2\)’ye bölünce birinci grup \(d(y/x)\) olur:

$$-d\left(\frac yx\right)+x^{-3/2}y^{1/2}\,dy=0$$

Birinci grupta \(\mu_1=1\), \(v_1=y/x\); ikinci grupta \(\mu_2=x^{3/2}y^{-1/2}\), \(v_2=y\). Üs eşleştirmesi \(\mu=x^{3/2}y^{-3/2}\) verir. Çarpınca:

$$x^{-1/2}y^{-1/2}\,dx+\left(-x^{1/2}y^{-3/2}+\frac1y\right)dy=0$$

Genel çözüm:

$$2\sqrt{\frac xy}+\ln y=C$$

\(x>0\), \(y>0\) bölgesinde logaritma ve kök tanımlıdır; sınırda \(y=0\) dışlanır.

## 21. Örnek 2.29 · Logaritmik grup

$$\left(xye^{x/y}+y^4\right)dx-x^2e^{x/y}\,dy=0,\qquad y\neq0$$

Terimleri \(xe^{x/y}(y\,dx-x\,dy)\) ve \(y^4\,dx\) olarak ayır, sonra \(xy^2\)’ye böl:

$$e^{x/y}\,d\left(\frac xy\right)+\frac{y^2}{x}\,dx=0$$

Birinci grupta \(\mu_1=1\), \(v_1=e^{x/y}\); ikinci grupta \(\mu_2=1/y^2\), \(v_2=x\). \(g_1(v)=\ln v\) ve \(g_2(v)=v^2\) seçimi ortak çarpanı verir. \(x^2/y^2\) ile çarp:

$$\frac{x^2}{y^2}e^{x/y}\,d\left(\frac xy\right)+x\,dx=0$$

\(z=x/y\) yazınca kalan integral kısmi integrasyonla hesaplanır:

$$\int z^2e^z\,dz=e^z(z^2-2z+2)$$

Genel çözüm:

$$e^{x/y}\left(\frac{x^2}{y^2}-\frac{2x}{y}+2\right)+\frac{x^2}{2}=C$$

\(y=0\) orijinal denklemde tanımsızdır; \(y\neq0\) dalında çözüm geçerlidir. Türevle doğrula.

## 22. Karar özeti

Önce tamlık testini yap. Tam değilse sırayla şu üç kapıyı dene:

$$\mu(x)=\exp\left(\int\frac{M_y-N_x}{N}\,dx\right),\qquad \mu(y)=\exp\left(\int\frac{N_x-M_y}{M}\,dy\right)$$

Bölümler tek değişkene bağlı değilse inceleme formüllerine bak: \(d(xy)\), \(d(y/x)\), \(d(\arctan(y/x))\), \(d(\tfrac12\ln(x^2+y^2))\). Son çare gruplar yöntemidir; her grubun çarpanını bulup \(\mu_1g_1(v_1)=\mu_2g_2(v_2)\) ile ortak çarpanı eşleştir. Her durumda çarpanın sıfırlandığı dalları asıl denklemde ayrıca sına ve örtük türevle doğrula.

## 23. Deney: dört aileyi karşılaştır

Atölyede \(x_0=1\) sabittir; A ve B kaydırıcıları \(y(1)\) başlangıç değerini değiştirir. Önce tahmin et: tam ailede düzey eğrileri neden elips? \(\mu(x)=e^x\) ailesinde çarpan düzey eğrisini nasıl değiştirir? \(\mu(y)=1/y\) ailesinde neden \(y>0\) gerekir? İnceleme ailesinde neden \(x>0\) ve \(y\neq0\) gerekir? Sonra dört aileyi sırayla aç ve gözlemini kaydet.

Tam aile \(u=x^2+xy+y^2\) potansiyeline sahiptir; düzey eğrileri \(C>0\) için elipstir:

$$u(x,y)=x^2+xy+y^2$$

\(\mu(x)=e^x\) ailesinde potansiyel \(e^xy(2x-y)\)’dir; \(y=0\) ve \(y=2x\) başlangıçları geçersizdir:

$$u(x,y)=e^xy(2x-y)$$

\(\mu(y)=1/y\) ailesinde potansiyel \(xy+\tfrac12y^2-\ln y\)’dir; \(y>0\) gerekir:

$$u(x,y)=xy+\frac12y^2-\ln y$$

İnceleme ailesinde potansiyel \(\ln(x^2+y^2)+2\sqrt{x}\)’tir; \(x>0\), \(y\neq0\) gerekir:

$$u(x,y)=\ln(x^2+y^2)+2\sqrt{x}$$

Gözlem soruları: A ve B farklı \(C\) değerleri seçtiğinde aynı potansiyelin hangi düzey eğrileri görünür? Çarpan, potansiyelin ölçeğini değiştirir mi yoksa düzey eğrilerini mi? Yanıtlarını dersin not defterine yaz.

## Vizeye hazırlan

Süre önerisi 18 dakika, toplam 20 puan. Önce soruları çöz; ardından her sorunun çözüm adımlarını aç. Puanlama yalnız sonuç için değil, tamlık testi, çarpan seçimi, kayıp dal kontrolü, doğrulama ve aralık için verilir.

### Soru 1 · Tam denklem (5 puan, 4 dakika)

\((6xy^2+4x^3y)\,dx+(6x^2y+x^4+e^y)\,dy=0\) denklemini çöz. \(M_y=N_x\) testini yap, \(M\)’yi integre et, \(g'(y)\)’yi bul ve türevle doğrula.

### Soru 2 · μ(x)=e^x (5 puan, 4 dakika)

\(y(2x-y+2)\,dx+2(x-y)\,dy=0\) denklemini \(\mu(x)\) bularak çöz. \((M_y-N_x)/N\) bölümünü hesapla, \(y=0\) ve \(y=2x\) dallarını belirt.

### Soru 3 · İnceleme (5 puan, 5 dakika)

\((3x^4+y)\,dx+(2x^2y-x)\,dy=0\) denklemini inceleme yöntemiyle çöz. Terimleri \(x^2\) parantezine al, \((y\,dx-x\,dy)/x^2=-d(y/x)\) olduğunu göster ve \(x\neq0\) aralığını yaz.

### Soru 4 · Gruplar (5 puan, 5 dakika)

\((4xy+3y^4)\,dx+(2x^2+5xy^3)\,dy=0\) denklemini gruplar yöntemiyle çöz. İki grubun çarpanlarını ayrı bul, üsleri eşitle ve \(\mu=x^2y\) sonucunu doğrula.

**Puanlama:** Her soru 5 puan: tamlık/çarpan seçimi 1, ara denklem 1, integrasyon 1, potansiyel ve çözüm 1, doğrulama ve dallar 1. Çözümler Vize hazırlığı ekranında açılır.

## Kontrol listesi

- Denklemi \(M\,dx+N\,dy=0\) biçiminde yazdım mı ve \(M_y=N_x\) testini yaptım mı?
- Tam değilse \(\mu(x)\), \(\mu(y)\), inceleme ve gruplar kapılarını sırayla denedim mi?
- Çarpanı bulunca denklemin **her** terimini çarptım mı?
- Potansiyeli kurarken integrasyon sabitini diğer değişkenin fonksiyonu olarak tuttum mu?
- Çarpanın sıfırlandığı veya paydanın sıfırlandığı dalları asıl denklemde ayrıca sınadım mı?
- Örtük türevle doğruladım mı ve tanım aralığını yazdım mı?

İlerleme adımı yalnızca §2.3’ü tamamlar. Sonraki konu incelemeden sonra ele alınacaktır.

---

Çalışma desteği: rehberli gerekçeler için konunun atölyesini, çözümlü sorular için sınav hazırlığı ekranını aç. Kendi açıklamanı dersin not defterine kaydet.
