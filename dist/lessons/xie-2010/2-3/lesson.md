# §2.3 · Tam diferansiyel denklemler ve integrasyon çarpanları

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.3, basılı s.31–54 / PDF s.49–72. Örnek 2.13–2.29. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- Denklemi \(M\,dx+N\,dy=0\) biçiminde yazıp \(M_y=N_x\) testini yapmayı.
- Tam ise potansiyeli \(u(x,y)\) kurmayı, sabiti diğer değişkenin fonksiyonu olarak taşımayı.
- Tam değilse sırayla \(\mu(x)\), \(\mu(y)\), \(F(y/x)\) ve gruplar kapılarını denemeyi.
- İnceleme yönteminde temel diferansiyelleri tanımayı.
- Çarpanın sıfırlandığı dalları ayrıca yazmayı ve örtük türevle doğrulamayı.

## Karar haritası

Bölümün tamamı tek bir sırayı izler: **önce tamlık testi, sonra çarpan.**

| Durum | Araç | Sonuç |
| --- | --- | --- |
| \(M_y=N_x\) | Potansiyel kur | \(u(x,y)=C\) |
| \((M_y-N_x)/N\) yalnız \(x\)'e bağlı | \(\mu(x)\) | \(\mu M\,dx+\mu N\,dy\) tam |
| \((N_x-M_y)/M\) yalnız \(y\)'ye bağlı | \(\mu(y)\) | \(\mu M\,dx+\mu N\,dy\) tam |
| Oran \(F(y/x)\) biçiminde | \(\mu=e^{\int F(u)du}\) | \(u=y/x\) |
| Paydada \(x^2+y^2\), \(x^2\), \(y^2\) | İnceleme | Bilinen diferansiyellere grupla |
| Hiçbiri olmuyor | Gruplar yöntemi | \(\mu_1g_1(v_1)=\mu_2g_2(v_2)\) |

> **Ortak fikir.** Tam denklemde çözüm bir yükseklik haritasının düzey eğrisidir. Çarpan bulmak, haritanın ölçeğini değiştirmektir: eğriler aynı kalır, yalnız \(u\) farklı bir ölçekte okunur. Bu yüzden çarpan çözümü değiştirmez, görünür kılar.

## 1. Tam diferansiyel ve potansiyel fonksiyon

Birinci mertebe denklemi diferansiyel formda yaz:

$$M(x,y)\,dx+N(x,y)\,dy=0$$

Sol taraf tek bir \(u(x,y)\) fonksiyonunun tam diferansiyeli ise denklem **tam**dır. Zincir kuralı ve \(u_x=M\), \(u_y=N\) eşleşmesi karışık kısmi türevlerin eşitliğini verir; koşul sağlanıyorsa çözüm potansiyelin düzey eğrisidir:

$$du=\frac{\partial u}{\partial x}\,dx+\frac{\partial u}{\partial y}\,dy,\qquad \frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}\quad\Longrightarrow\quad u(x,y)=C$$

Tamlık testi yalnız bir fonksiyonun varlığını söyler; onu bulmak için \(M\)'yi \(x\)'e göre integre et, sonucu \(y\)'ye göre türevleyip \(N\) ile karşılaştır. Alternatif olarak terimleri \(d(xy)\), \(d(y/x)\) gibi bilinen diferansiyellere grupla. İki yöntem de aynı \(u\)'yu verir.

## 2. Örnek 2.13 · Tam denklem, iki yöntem

$$(6xy^2+4x^3y)\,dx+(6x^2y+x^4+e^y)\,dy=0$$

Burada \(M=6xy^2+4x^3y\) ve \(N=6x^2y+x^4+e^y\). Kısmi türevler eşit çıkar:

$$\frac{\partial M}{\partial y}=12xy+4x^3=\frac{\partial N}{\partial x}$$

Denklem tamdır. \(M\)'yi \(x\)'e göre integre ederken \(y\) sabittir; integrasyon sabiti \(g(y)\) olur:

$$u(x,y)=3x^2y^2+x^4y+g(y),\qquad \frac{\partial u}{\partial y}=6x^2y+x^4+g'(y)$$

Bunu \(N\) ile karşılaştırınca \(6x^2y+x^4\) terimleri sadeleşir ve yalnız \(g'(y)=e^y\) kalır:

$$g'(y)=e^y\quad\Longrightarrow\quad 3x^2y^2+x^4y+e^y=C$$

**Gruplama ile aynı sonuç.** Terimleri üç gruba ayır:

$$(6xy^2\,dx+6x^2y\,dy)+(4x^3y\,dx+x^4\,dy)+e^y\,dy=0$$

Her grup bir tam diferansiyeldir: \(6xy^2\,dx+6x^2y\,dy=d(3x^2y^2)\), \(4x^3y\,dx+x^4\,dy=d(x^4y)\) ve \(e^y\,dy=d(e^y)\). Türevle doğrula: \(u_x=M\), \(u_y=N\).

> **Kayıp dal var mı?** Hiçbir yere bölünmediği için yoktur; çözüm tüm düzlemde örtüktür. Bir çarpan kullanıldığında ise çarpanın sıfırları her zaman ayrıca sınanır.

## 3. Örnek 2.14 · Trigonometrik tam denklem

$$(-y\sin x+e^x\sin2y)\,dx+(\cos x+2e^x\cos2y)\,dy=0$$

\(M_y=-\sin x+2e^x\cos2y\) ve \(N_x=-\sin x+2e^x\cos2y\) eşittir. Terimleri iki gruba ayır; birinci grup \(d(-y\cos x)\), ikinci grup \(d(e^x\sin2y)\) olur:

$$\left(-y\sin x\,dx+\cos x\,dy\right)+\left(e^x\sin2y\,dx+2e^x\cos2y\,dy\right)=0\quad\Longrightarrow\quad -y\cos x+e^x\sin2y=C$$

> **Doğrulama.** Örtük türev \(y'=(y\sin x-e^x\sin2y)/(\cos x+2e^x\cos2y)\) verir; bu asıl denklemdir. Bölme yapılmadığı için tekil dal yoktur.

## 4. Örnek 2.15 · Üstel terimli tam denklem

$$2x(3x+y-ye^{-x^2})\,dx+(x^2+3y^2+e^{-x^2})\,dy=0$$

Burada \(M=6x^2+2xy-2xye^{-x^2}\) ve \(N=x^2+3y^2+e^{-x^2}\). Kısmi türevler eşittir:

$$\frac{\partial M}{\partial y}=2x-2xe^{-x^2}=\frac{\partial N}{\partial x}$$

Terimleri üç gruba ayır:

$$(2xy\,dx+x^2\,dy)+(e^{-x^2}\,dy-2xye^{-x^2}\,dx)+(6x^2\,dx+3y^2\,dy)=0$$

Gruplar sırasıyla \(d(x^2y)\), \(d(ye^{-x^2})\) ve \(d(2x^3+y^3)\)'tür:

$$x^2y+ye^{-x^2}+2x^3+y^3=C$$

> **Sıralama ipucu.** İkinci grupta \(e^{-x^2}\,dy\) terimini önce almak, \(y\)'ye göre integre edip \(x\)'e göre türev almayı kolaylaştırır. Grupları her zaman en kolay integral alınacak terimle başlat.

## 5. Örnek 2.16 · x/y ve y/x içeren tam denklem

$$\left(\frac1y\sin\frac xy-\frac{y}{x^2}\cos\frac yx+1\right)dx+\left(\frac1x\cos\frac yx-\frac{x}{y^2}\sin\frac xy+\frac1{y^2}\right)dy=0$$

Denklem \(x\neq0\), \(y\neq0\) bölgesinde tanımlıdır ve \(M_y=N_x\) sağlanır. Terimleri dört gruba ayır:

$$\left(\frac1y\sin\frac xy\,dx-\frac{x}{y^2}\sin\frac xy\,dy\right)+\left(-\frac{y}{x^2}\cos\frac yx\,dx+\frac1x\cos\frac yx\,dy\right)+dx+\frac{dy}{y^2}=0$$

Gruplar \(d(-\cos(x/y))\), \(d(\sin(y/x))\), \(dx\) ve \(d(-1/y)\)'dir:

$$-\cos\frac xy+\sin\frac yx+x-\frac1y=C$$

> **Tanım bölgesi.** Doğrulamada \(x\) ve \(y\)'nin sıfır olduğu noktaları dışla. Logaritma yoktur ama orijinal katsayılar bu noktalarda tanımsızdır.

## 6. İntegrasyon çarpanı: μ(x) ve μ(y)

Denklem tam değilse, onu tam hâle getiren bir \(\mu(x,y)\) çarpanı ararız:

$$\mu(x,y)M(x,y)\,dx+\mu(x,y)N(x,y)\,dy=0$$

Tamlık koşulu \((\mu M)_y=(\mu N)_x\) yazılınca \(\mu\) için kısmi diferansiyel denklem çıkar. \(\mu\) yalnız \(x\)'e bağlıysa bu denklem ayrılır ve iki özel durum doğrudan integral verir:

$$\frac1\mu\frac{d\mu}{dx}=\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)$$

$$\mu(x)=\exp\left(\int\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)dx\right),\qquad \mu(y)=\exp\left(\int\frac1M\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)dy\right)$$

> **Ne zaman tıkanır?** Formüldeki bölüm gerçekten tek değişkene bağlı değilse bu yol tıkanır; \(F(y/x)\) incelemesine veya gruplar yöntemine geçilir. Çarpanı bulunca denklemin bütün terimlerini çarpmayı unutma.

## 7. Örnek 2.17 · μ(y)=e^y

$$3(x^2+y^2)\,dx+x(x^2+3y^2+6y)\,dy=0$$

\(M=3(x^2+y^2)\), \(N=x^3+3xy^2+6xy\). \(M_y=6y\) ve \(N_x=3x^2+3y^2+6y\) olduğundan denklem tam değildir. \(y\)-bölümü sabit çıkar:

$$\frac1M\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=\frac{(3x^2+3y^2+6y)-6y}{3(x^2+y^2)}=1\quad\Longrightarrow\quad \mu(y)=e^y,\qquad e^yx(x^2+3y^2)=C$$

> **Doğrulama.** \(u_x=e^y(3x^2+3y^2)\) ve \(u_y=e^y(x^3+3xy^2+6xy)\). \(e^y>0\) olduğu için çarpan hiçbir dalı kaybettirmez.

## 8. Örnek 2.18 · μ(x)=e^x

$$y(2x-y+2)\,dx+2(x-y)\,dy=0$$

\(M=2xy-y^2+2y\), \(N=2x-2y\); \(M_y=2x-2y+2\) ve \(N_x=2\) olduğundan tam değildir. \(x\)-bölümü yine sabit çıkar:

$$\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)=\frac{(2x-2y+2)-2}{2(x-y)}=1\quad\Longrightarrow\quad \mu(x)=e^x,\qquad e^xy(2x-y)=C$$

Ayrıca \(y=0\) ve \(y=2x\) asıl denklemin çözümleridir. \(e^x>0\) olduğundan bunlar kaybolmaz:

$$y=0,\qquad y=2x$$

> **Başlangıç verisi.** Bu iki doğru üzerinde başlangıç verisi seçilemez; çünkü o noktalarda \(u\)'nun gradyanı sıfırlanır ve çözüm tek bir eğri belirlemez. Doğrulama: \(u_x=e^xy(2x-y+2)\), \(u_y=2e^x(x-y)\).

## 9. Örnek 2.19 · μ(x)=sec²x

$$y(\cos^3x+y\sin x)\,dx+\cos x(\sin x\cos x+2y)\,dy=0$$

\(M=y\cos^3x+y^2\sin x\) ve \(N=\sin x\cos^2x+2y\cos x\) ile \(M_y=\cos^3x+2y\sin x\), \(N_x=\cos^3x-2\sin^2x\cos x-2y\sin x\) olur; denklem tam değildir. \(x\)-bölümü sadeleşir:

$$\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)=\frac{2\sin x}{\cos x}\quad\Longrightarrow\quad \mu(x)=\sec^2x,\qquad y\sin x+\frac{y^2}{\cos x}=C$$

> **Kutuplar.** \(\cos x=0\) noktaları hem başlangıçta hem çarpanda tanımsızdır; çözüm aralığı bu kutupları dışlar. Türevle doğrula.

## 10. Örnek 2.20 · μ=e^{y/x}

Önce bir teorem: eğer aşağıdaki oran \(y/x\)'in bir fonksiyonuysa, çarpan da o fonksiyonun integralidir:

$$\frac{x^2}{xM+yN}\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=F\left(\frac yx\right)\quad\Longrightarrow\quad \mu(x,y)=\exp\left(\int F(u)\,du\right),\qquad u=\frac yx$$

Şimdi teoremi şu denkleme uygula:

$$(2x+2xy-y-y^2)\,dx+(x^2+x+xy)\,dy=0$$

\(M=2x+2xy-y-y^2\) ve \(N=x^2+x+xy\) için \(N_x-M_y=(2x+1+y)-(2x+1-2y)=3y\), ayrıca \(xM+yN=x^2(2+3y)\)'dir:

$$\frac{x^2}{xM+yN}\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=1\quad\Longrightarrow\quad \mu=e^{y/x},\qquad x^2(1+y)e^{y/x}=C$$

> **Tanım bölgesi.** \(x=0\) hem orijinal denklemde hem çarpanda tanımsızdır. \(e^{y/x}>0\) olduğundan ek dal kaybı yoktur; türevle doğrula.

## 11. İnceleme yöntemi: temel diferansiyeller

Bazı denklemlerde çarpan, terimleri bilinen diferansiyellere ayırınca kendiliğinden görünür. Ezberlenecek temel formüller:

| Diferansiyel | Nerede karşına çıkar |
| --- | --- |
| \(d(xy)=y\,dx+x\,dy\) | \(y\,dx+x\,dy\) ikilisi |
| \(d(y/x)=(x\,dy-y\,dx)/x^2\) | Paydada \(x^2\) |
| \(d(x/y)=(y\,dx-x\,dy)/y^2\) | Paydada \(y^2\) |
| \(d(\arctan(y/x))=(x\,dy-y\,dx)/(x^2+y^2)\) | Paydada \(x^2+y^2\) |
| \(d(\frac12\ln(x^2+y^2))=(x\,dx+y\,dy)/(x^2+y^2)\) | Üstte \(x\,dx+y\,dy\) |
| \(d(\sqrt{x^2\pm y^2})=(x\,dx\pm y\,dy)/\sqrt{x^2\pm y^2}\) | Kökün içinde kareler |

> **Kural.** Paydada \(x^2+y^2\), \(x^2\), \(y^2\) veya \(\sqrt{x^2\pm y^2}\) görüyorsan önce bu tabloyla eşleştir. Çarpan çoğu zaman bölmeden sonra ortaya çıkar; böldüğün ifadenin köklerini ayrıca sına.

## 12. Örnek 2.21 · İnceleme ile tam denklem

$$(3x^4+y)\,dx+(2x^2y-x)\,dy=0$$

Terimleri \(x^2\) parantezine al:

$$x^2(3x^2\,dx+2y\,dy)+(y\,dx-x\,dy)=0\quad\Longrightarrow\quad 3x^2\,dx+2y\,dy-\frac{x\,dy-y\,dx}{x^2}=0$$

Yani \(d(x^3)+d(y^2)-d(y/x)=0\). Genel çözüm:

$$x^3+y^2-\frac yx=C$$

> **Çarpan ve aralık.** Burada \(\mu=1/x^2\) kullanılmıştır. \(x=0\) başlangıçta tanımsızdır; çözüm aralığı \(x\neq0\) bölgesindedir. Türevle doğrula.

## 13. Örnek 2.22 · μ=1/(x²+y²)

$$(x+x^2y+y^3)\,dx+(y+x^3+xy^2-x^2y^2-y^4)\,dy=0$$

Terimleri \(x^2+y^2\)'ye göre düzenle:

$$\left[x+y(x^2+y^2)\right]dx+\left[y+x(x^2+y^2)-y^2(x^2+y^2)\right]dy=0$$

\(x^2+y^2\)'ye bölünce üç tam diferansiyel kalır:

$$\frac{x\,dx+y\,dy}{x^2+y^2}+(y\,dx+x\,dy)-y^2\,dy=0\quad\Longrightarrow\quad \frac12\ln(x^2+y^2)+xy-\frac13y^3=C$$

> **Orijin.** Burada \(\mu=1/(x^2+y^2)\)'dir ve \(x^2+y^2=0\) yani orijin dışlanır; başlangıç verisi orijinde seçilemez.

## 14. Örnek 2.23 · μ=1/[√x(x²+y²)]

$$(2x\sqrt{x}+x^2+y^2)\,dx+2y\sqrt{x}\,dy=0$$

Terimleri \(\sqrt{x}\) ve \(x^2+y^2\)'ye göre düzenle:

$$2\sqrt{x}(x\,dx+y\,dy)+(x^2+y^2)\,dx=0\quad\Longrightarrow\quad 2\frac{x\,dx+y\,dy}{x^2+y^2}+\frac{dx}{\sqrt{x}}=0$$

Yani \(2d(\frac12\ln(x^2+y^2))+d(2\sqrt{x})=0\). Genel çözüm:

$$\ln(x^2+y^2)+2\sqrt{x}=C$$

> **Tanım bölgesi.** Burada \(\mu=1/[\sqrt{x}(x^2+y^2)]\)'dir; \(x>0\) ve \(x^2+y^2>0\) gerekir. \(x=0\) ve orijin dışlanır.

## 15. Örnek 2.24 · μ=1/y ve kayıp dal

$$y^2\,dx+(xy+y^2-1)\,dy=0$$

Terimleri \(y\) parantezine al:

$$y(y\,dx+x\,dy)+(y^2-1)\,dy=0$$

\(y=0\) denklemi sağlar ve ayrı bir çözümdür. \(y\neq0\) dalında \(y\)'ye bölünce \(d(xy)+\frac12d(y^2)-d(\ln|y|)=0\) olur. Genel çözüm ile ayrı dal birlikte yazılır:

$$xy+\frac12y^2-\ln|y|=C,\qquad y=0$$

> **Çarpanın sıfırı.** Burada \(\mu=1/y\)'dir; \(y=0\) dalını dışladığı için o dal ayrıca yazılır. \(y<0\) için de logaritma mutlak değerle tanımlıdır.

## 16. Örnek 2.25 · Arktanjant ve logaritma

$$xy\,dx-(x^2+x^2y+y^3)\,dy=0$$

Terimleri \(x(y\,dx-x\,dy)\) ve \(y(x^2+y^2)\,dy\) olarak ayır, sonra \(x^2+y^2\)'ye böl:

$$x(y\,dx-x\,dy)-y(x^2+y^2)\,dy=0\quad\Longrightarrow\quad x\,d\left(\arctan\frac xy\right)-y\,dy=0$$

\(y\neq0\) için \(y\)'ye böl, \(u=x/y\) yaz ve \(u\,d(\arctan u)=\frac12d\ln(1+u^2)\) özdeşliğini kullan:

$$\ln\left(1+\frac{x^2}{y^2}\right)-2y=C,\qquad y=0$$

> **İki dal.** \(y=0\) asıl denklemin çözümüdür ve ayrıca yazılır; \(y\neq0\) dalında çözüm yukarıdaki örtük ailedir. Arktanjantın seçilen dalı da aralığı belirler.

## 17. Gruplarla integrasyon çarpanı

Denklemi iki gruba ayır: \((M_1\,dx+N_1\,dy)+(M_2\,dx+N_2\,dy)=0\). Her grubun kendi çarpanı ve potansiyeli varsa:

$$\mu_1M_1\,dx+\mu_1N_1\,dy=dv_1,\qquad \mu_2M_2\,dx+\mu_2N_2\,dy=dv_2$$

Teorem, \(\mu_1g_1(v_1)\) ve \(\mu_2g_2(v_2)\)'nin de grup çarpanı olduğunu söyler. Ortak çarpan için uygun \(g_1,g_2\) seç:

$$\mu_1g_1(v_1)=\mu_2g_2(v_2)=\mu(x,y)$$

> **Pratik kural.** \(g_1(v)=v^\alpha\), \(g_2(v)=v^\beta\) alıp üsleri eşitlemek çoğu zaman yeterlidir. Tek bilinmeyenli bir denklem çıkar; \(\alpha\) ve \(\beta\)'yı bulunca çarpan hazırdır.

## 18. Örnek 2.26 · Ortak çarpan x²y

$$(4xy+3y^4)\,dx+(2x^2+5xy^3)\,dy=0$$

İki grup kur ve birinci grubun tam olduğunu gör:

$$(4xy\,dx+2x^2\,dy)+(3y^4\,dx+5xy^3\,dy)=0,\qquad 2d(x^2y)=4xy\,dx+2x^2\,dy$$

Birinci grupta \(\mu_1=1\), \(v_1=x^2y\). İkinci grupta \((M_y-N_x)/N=7/(5x)\) olduğundan grup çarpanı ve potansiyeli şöyle çıkar:

$$\mu_2(x)=x^{7/5},\qquad v_2=x^{12/5}y^4$$

\((x^2y)^\alpha=x^{12\beta/5+7/5}y^{4\beta}\) eşitliğinden \(\alpha=1\), \(\beta=1/4\) çıkar:

$$\mu=x^2y\quad\Longrightarrow\quad x^4y^2+x^3y^5=C$$

> **Sıfır dalları.** \(\mu\)'nün sıfır olduğu \(x=0\) ve \(y=0\) dalları ayrıca incelenir; başlangıç verisi bu doğrular üzerinde seçilemez.

## 19. Örnek 2.27 · Ortak çarpan √(xy)

$$(5xy-3y^3)\,dx+(3x^2-7xy^2)\,dy=0$$

İki grup:

$$(5xy\,dx+3x^2\,dy)+(-3y^3\,dx-7xy^2\,dy)=0$$

Birinci grupta \((M_y-N_x)/N=-1/(3x)\), ikinci grupta \(2/(7x)\) çıkar. Grup çarpanları ve potansiyelleri:

$$\mu_1=x^{-1/3},\quad v_1=x^{5/3}y,\qquad \mu_2=x^{2/7},\quad v_2=x^{9/7}y^3$$

Üs eşleştirmesi \(\alpha=3\beta\) ve \(-1/3+5\alpha/3=2/7+9\beta/7\) verir; çözüm \(\alpha=1/2\), \(\beta=1/6\)'dır:

$$\alpha=\frac12,\quad\beta=\frac16,\quad\mu=x^{1/2}y^{1/2}\quad\Longrightarrow\quad x^{3/2}y^{3/2}(x-y^2)=C$$

> **Sıfır dalları ve doğrulama.** \(x=0\) ve \(y=0\) dalları çarpanın sıfırlarıdır; ayrıca incelenir. Sonucu türevle doğrula.

## 20. Örnek 2.28 · İnceleme ve gruplar birlikte

$$(y\,dx-x\,dy)+\sqrt{xy}\,dy=0,\qquad x>0,\ y>0$$

\(x^2\)'ye bölünce birinci grup \(d(y/x)\) olur:

$$-d\left(\frac yx\right)+x^{-3/2}y^{1/2}\,dy=0$$

Birinci grupta \(\mu_1=1\), \(v_1=y/x\); ikinci grupta \(\mu_2=x^{3/2}y^{-1/2}\), \(v_2=y\)'dir. Üs eşleştirmesi \(\mu=x^{3/2}y^{-3/2}\) verir. Çarpınca potansiyel hazır olur:

$$x^{-1/2}y^{-1/2}\,dx+\left(-x^{1/2}y^{-3/2}+\frac1y\right)dy=0\quad\Longrightarrow\quad 2\sqrt{\frac xy}+\ln y=C$$

> **Tanım bölgesi.** \(x>0\), \(y>0\) bölgesinde logaritma ve kök tanımlıdır; sınırda \(y=0\) dışlanır.

## 21. Örnek 2.29 · Logaritmik grup

$$\left(xye^{x/y}+y^4\right)dx-x^2e^{x/y}\,dy=0,\qquad y\neq0$$

Terimleri \(xe^{x/y}(y\,dx-x\,dy)\) ve \(y^4\,dx\) olarak ayır, sonra \(xy^2\)'ye böl:

$$e^{x/y}\,d\left(\frac xy\right)+\frac{y^2}{x}\,dx=0$$

Birinci grupta \(\mu_1=1\), \(v_1=e^{x/y}\); ikinci grupta \(\mu_2=1/y^2\), \(v_2=x\). \(g_1(v)=\ln v\) ve \(g_2(v)=v^2\) seçimi ortak çarpanı verir; \(x^2/y^2\) ile çarp:

$$\frac{x^2}{y^2}e^{x/y}\,d\left(\frac xy\right)+x\,dx=0$$

\(z=x/y\) yazınca kalan integral kısmi integrasyonla hesaplanır:

$$\int z^2e^z\,dz=e^z(z^2-2z+2)\quad\Longrightarrow\quad e^{x/y}\left(\frac{x^2}{y^2}-\frac{2x}{y}+2\right)+\frac{x^2}{2}=C$$

> **Dal.** \(y=0\) orijinal denklemde tanımsızdır; \(y\neq0\) dalında çözüm geçerlidir. Türevle doğrula.

## 22. Karar özeti

Önce tamlık testini yap. Tam değilse sırayla şu kapıları dene:

$$\mu(x)=\exp\left(\int\frac{M_y-N_x}{N}\,dx\right),\qquad \mu(y)=\exp\left(\int\frac{N_x-M_y}{M}\,dy\right)$$

| Kapı | Ne zaman açılır | Ne yapar |
| --- | --- | --- |
| \(\mu(x)\) | Bölüm yalnız \(x\)'e bağlı | Tek değişkenli integral |
| \(\mu(y)\) | Bölüm yalnız \(y\)'ye bağlı | Tek değişkenli integral |
| İnceleme | Paydada \(x^2+y^2\), \(x^2\), \(y^2\), kök | Bilinen diferansiyele gruplar |
| Gruplar | Hiçbiri olmuyor | \(\mu_1g_1(v_1)=\mu_2g_2(v_2)\) |

Bölümler tek değişkene bağlı değilse inceleme formüllerine bak; son çare gruplar yöntemidir. Her durumda çarpanın sıfırlandığı dalları asıl denklemde ayrıca sına ve örtük türevle doğrula.

## 23. Deney: dört aileyi karşılaştır

Atölyede \(x_0=1\) sabittir; A ve B kaydırıcıları \(y(1)\) başlangıç değerini değiştirir. Önce tahmin et: tam ailede düzey eğrileri neden elips? \(\mu(x)=e^x\) ailesinde çarpan düzey eğrisini nasıl değiştirir?

> **Tahmin.** Çarpan potansiyelin ölçeğini değiştirir, düzey eğrilerinin şeklini değil. Bu yüzden aynı \(u\)'nun farklı \(C\) değerleri aynı ailenin iç içe eğrilerini verir.

Tam aile \(u=x^2+xy+y^2\) potansiyeline sahiptir; düzey eğrileri \(C>0\) için elipstir:

$$u(x,y)=x^2+xy+y^2$$

\(\mu(x)=e^x\) ailesinde potansiyel \(e^xy(2x-y)\)'dir; \(y=0\) ve \(y=2x\) başlangıçları geçersizdir:

$$u(x,y)=e^xy(2x-y)$$

\(\mu(y)=1/y\) ailesinde potansiyel \(xy+\frac12y^2-\ln y\)'dir; \(y>0\) gerekir:

$$u(x,y)=xy+\frac12y^2-\ln y$$

İnceleme ailesinde potansiyel \(\ln(x^2+y^2)+2\sqrt{x}\)'tir; \(x>0\), \(y\neq0\) gerekir:

$$u(x,y)=\ln(x^2+y^2)+2\sqrt{x}$$

Gözlem soruları: A ve B farklı \(C\) değerleri seçtiğinde aynı potansiyelin hangi düzey eğrileri görünür? Çarpan, potansiyelin ölçeğini değiştirir mi yoksa düzey eğrilerini mi? Yanıtlarını dersin not defterine yaz.

## Vizeye hazırlan

Dört çözümlü vaka sırasıyla tam bir denklemi, \(\mu(x)\) çarpanını, inceleme yöntemini ve gruplar yöntemini kapsar. Her vakada aynı sırayı izle: denklemi \(M\,dx+N\,dy=0\) yaz, \(M_y=N_x\) testini yap, tam değilse çarpan kapılarını sırayla dene, potansiyeli kur, çarpanın sıfırlarını ve payda kutuplarını ayrıca sına, örtük türevle doğrula. Ardından 11 soruluk kontrol bölümüyle kendini sına.

## Kontrol listesi

- Denklemi \(M\,dx+N\,dy=0\) biçiminde yazdım mı ve \(M_y=N_x\) testini yaptım mı?
- Tam değilse \(\mu(x)\), \(\mu(y)\), inceleme ve gruplar kapılarını sırayla denedim mi?
- Çarpanı bulunca denklemin **her** terimini çarptım mı?
- Potansiyeli kurarken integrasyon sabitini diğer değişkenin fonksiyonu olarak tuttum mu?
- Çarpanın veya paydanın sıfırlandığı dalları asıl denklemde ayrıca sınadım mı?
- Örtük türevle doğruladım mı ve tanım aralığını yazdım mı?


---

Çalışma desteği: rehberli gerekçeler için konunun atölyesini, çözümlü sorular için sınav hazırlığı ekranını aç. Kendi açıklamanı dersin not defterine kaydet.
