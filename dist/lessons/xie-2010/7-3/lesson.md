# §7.3 Laplace Dönüşümü Yöntemi: Başlangıç Koşullarının Doğrudan Soğurulması, Cramer Kuralı ve Gecikmeli Zorlama

Diferansiyel denklem sistemlerinin çözümünde §7.2’de gördüğümüz diferansiyel operatör yöntemi, genel çözümü keyfi sabitlerle bulup başlangıç koşullarını en son uygulamak için zarif bir cebirsel çerçeve sunar. Ancak operatör yönteminde karşılaşılan en büyük operasyonel zorluk, \(x\) ve \(y\) için ayrı ayrı çözülen skaler denklemlerin \(2N\) adet sabit üretmesi ve bu fazlalık \(N\) sabitin ancak çözümlerin orijinal diferansiyel sisteme yerleştirilerek elenmek zorunda kalmasıdır. Başlangıç değer problemleri (IVP) söz konusu olduğunda, **Laplace dönüşümü yöntemi** bu eleme adımını tamamen ortadan kaldırır. Türevin Laplace dönüşümü \(\mathcal{L}\{\dot{x}\} = sX(s) - x(0)\) kuralı uyarınca, başlangıç koşulları dönüşümün ilk adımında doğrudan cebirsel sağ tarafa soğurulur. Böylece sistem, \(s\)-uzayında rasyonel fonksiyonlardan oluşan cebirsel bir matris denklemine dönüşür ve Cramer kuralı fazladan hiçbir keyfi sabit üretmeksizin doğrudan tekil çözümü verir.

> **ZİHİN MODELİ:** Laplace dönüşümü yöntemi, diferansiyel sistemleri zaman uzayındaki dinamik akışından çıkarıp \(s\)-uzayındaki statik bir cebirsel teraziye taşır. Zaman uzayında türevler birbirine bağlıyken, \(s\)-uzayında başlangıç koşulları \(x(0), y(0)\) adeta harici birer giriş kaynağı (sanal darbe) gibi sağ tarafa eklenir. Sistem çözüldüğünde ortaya çıkan rasyonel fonksiyonlar iki bağımsız dünyaya ayrışır: sistemin başlangıç enerjisinden beslenen **Sıfır Giriş Yanıtı (ZIR)** ve dış zorlamalardan beslenen **Sıfır Durum Yanıtı (ZSR)**.

---

## 7.3.1 Lineer Diferansiyel Sistemlerin s-Uzayına Aktarımı

İki bilinmeyenli sabit katsayılı genel bir birinci mertebe başlangıç değer problemini ele alalım:

$$\begin{cases} a_{11}\dot{x} + b_{11}x + a_{12}\dot{y} + b_{12}y = f_1(t) \\ a_{21}\dot{x} + b_{21}x + a_{22}\dot{y} + b_{22}y = f_2(t) \end{cases}, \quad x(0) = x_0, \; y(0) = y_0$$

Burada her iki denklemin terim terim Laplace dönüşümü alınır. Türevin dönüşüm özellikleri doğrudan devreye girer:

$$\mathcal{L}\{\dot{x}(t)\} = sX(s) - x(0), \quad \mathcal{L}\{\ddot{x}(t)\} = s^2X(s) - sx(0) - \dot{x}(0)$$

Türev kuralı uygulandığında, \(x(0)\) ve \(y(0)\) terimleri katsayılarıyla çarpılarak sağ taraftaki zorlama dönüşümleri \(F_1(s)\) ve \(F_2(s)\) ile toplanır. Sistem \(s\) cinsinden cebirsel matris formuna kavuşur:

$$\begin{bmatrix} a_{11}s + b_{11} & a_{12}s + b_{12} \\ a_{21}s + b_{21} & a_{22}s + b_{22} \end{bmatrix} \begin{bmatrix} X(s) \\ Y(s) \end{bmatrix} = \begin{bmatrix} a_{11}x_0 + a_{12}y_0 + F_1(s) \\ a_{21}x_0 + a_{22}y_0 + F_2(s) \end{bmatrix}$$

Bu matris denkleminde katsayı matrisinin determinantı \(\Delta(s)\), operatör yöntemindeki karakteristik polinomun \(\phi(s)\) tam dengidir. Bilinmeyen \(X(s)\) ve \(Y(s)\) fonksiyonları \(s\)-uzayında Cramer kuralı ile derhal çözülür:

$$X(s) = \frac{\Delta_x(s)}{\Delta(s)}, \quad Y(s) = \frac{\Delta_y(s)}{\Delta(s)}, \quad \Delta(s) = \det[A(s)]$$

Sağ taraf vektörünün lineerliği sayesinde çözümler kendiliğinden iki temel bileşene ayrışır:

$$X(s) = X_{\mathrm{ZIR}}(s) + X_{\mathrm{ZSR}}(s), \quad Y(s) = Y_{\mathrm{ZIR}}(s) + Y_{\mathrm{ZSR}}(s)$$

Burada \(X_{\mathrm{ZIR}}(s)\) yalnızca \(x_0, y_0\) başlangıç koşullarına bağlıdır (dış zorlama \(F(s) = 0\)); \(X_{\mathrm{ZSR}}(s)\) ise sıfır başlangıç koşulları altında (\(x_0 = y_0 = 0\)) yalnızca dış zorlamanın ürettiği yanıttır.

> **PRATİK KONTROL:** Karakteristik determinant \(\Delta(s) = 0\) denkleminin kökleri sistemin kutuplarıdır (poles). Bu kutuplar, operatör yöntemindeki \(\phi(\lambda) = 0\) karakteristik kökleri ile birebir örtüşür. Ters Laplace dönüşümü yapıldığında ZIR bileşeni her zaman bu kutupların ürettiği doğal modları (\(e^{st}\)) içerir; ZSR ise hem sistem kutuplarını (geçici rejim) hem de zorlama kutuplarını (kalıcı rejim) barındırır.

---

## Örnek 7.11: Harmonik Sistem ve Üstel Zorlama

Ders kitabındaki Örnek 7.11 sistemini ele alalım:

$$\begin{cases} \dot{x} - 3x - 6y = 0 \\ 3x + \dot{y} + 3y = 18te^{-3t} \end{cases}, \quad x(0) = 1, \; y(0) = 0$$

Her iki denklemin Laplace dönüşümünü alalım. \(\mathcal{L}\{18te^{-3t}\} = \frac{18}{(s + 3)^2}\) ve \(x(0) = 1, y(0) = 0\) değerleri yerleştirildiğinde:

$$\begin{bmatrix} s - 3 & -6 \\ 3 & s + 3 \end{bmatrix} \begin{bmatrix} X(s) \\ Y(s) \end{bmatrix} = \begin{bmatrix} 1 \\ \frac{18}{(s + 3)^2} \end{bmatrix}$$

Sistemin karakteristik determinantı:

$$\Delta(s) = (s - 3)(s + 3) + 18 = s^2 + 9 = (s + 3i)(s - 3i)$$

Kutuplar \(s = \pm 3i\) saf sanal kökler olup \(\omega = 3\text{ rad/s}\) frekanslı harmonik salınımı gösterir. Cramer kuralı ile pay determinantları hesaplanır:

$$\Delta_x(s) = (s + 3) + \frac{108}{(s + 3)^2}, \quad \Delta_y(s) = -3 + \frac{18(s - 3)}{(s + 3)^2}$$

Buradan \(X(s)\) ve \(Y(s)\) çözümleri ZIR ve ZSR terimlerine ayrılmış olarak doğrudan elde edilir:

$$X(s) = \frac{s + 3}{s^2 + 9} + \frac{108}{(s^2 + 9)(s + 3)^2}, \quad Y(s) = -\frac{3}{s^2 + 9} + \frac{18(s - 3)}{(s^2 + 9)(s + 3)^2}$$

İlk rasyonel terimlerin ters dönüşümü serbest salınımı verir: \(x_{\mathrm{ZIR}}(t) = \cos 3t + \sin 3t\) ve \(y_{\mathrm{ZIR}}(t) = -\sin 3t\). İkinci terimler ise basit kesirlere ayrılarak ters dönüştürülür:

$$\begin{cases} x(t) = -\cos 3t + \sin 3t + 2(1 + 3t)e^{-3t} \\ y(t) = \cos 3t - (1 + 6t)e^{-3t} \end{cases}$$

Burada en can alıcı nokta şudur: tek bir keyfi sabit yazılmamış, hiçbir denklemde fazlalık katsayı aranmamıştır! Başlangıç koşulları doğrudan doğruya çözüme nüfuz etmiştir.

> **İŞARET KURALI:** Türevin Laplace dönüşümündeki eksi işaretine dikkat ediniz: \(\mathcal{L}\{\dot{x}\} = sX(s) - x(0)\). Denklemin sol tarafında \(\dot{x}\) teriminden gelen \(-x(0)\), eşitliğin sağ tarafına geçerken \(+x(0)\) olur. Ancak denklemde \(-\dot{x}\) varsa, bu terim sağ tarafa \(-x(0)\) olarak geçer.

---

## 7.3.2 Gecikmeli Zorlamalar ve İkinci Kaydırma Teoremi

Mühendislik sistemlerinde kuvvetler ve gerilimler aniden devreye giren basamaklar veya zaman gecikmeli darbeler halinde uygulanır. Bu tür süreksiz veya ötelenmiş fonksiyonlar Heaviside basamak fonksiyonu \(H(t - c)\) ile modellenir. İkinci kaydırma teoremine göre:

$$\mathcal{L}\{f(t - c)H(t - c)\} = e^{-cs}F(s), \quad \mathcal{L}^{-1}\{e^{-cs}F(s)\} = f(t - c)H(t - c)$$

Burada \(e^{-cs}\) çarpanı, frekans uzayında faz gecikmesini, zaman uzayında ise yanıtın \(t = c\) anına kadar sıfır kalarak bu andan itibaren devreye girmesini temsil eder.

---

## Örnek 7.12: Bağlı Türevler ve Gecikmeli Sinüs Zorlaması

Ders kitabındaki Örnek 7.12 sisteminde hem türevler birbirine bağlıdır hem de zorlama \(t = \pi\) anında devreye giren bir sinüzoidal dalgadır:

$$\begin{cases} \dot{x} + 2x + 2\dot{y} + 5y = 0 \\ \dot{x} + 3\dot{y} + y = 10\sin(2t)H(t - \pi) \end{cases}, \quad x(0) = 2, \; y(0) = 1$$

Gecikmeli zorlamanın Laplace dönüşümünü almak için \(\sin(2t)\) fonksiyonunu \(t - \pi\) cinsinden ifade edelim: \(\sin(2t) = \sin(2(t - \pi) + 2\pi) = \sin(2(t - \pi))\). Dolayısıyla ikinci kaydırma teoremi doğrudan uygulanabilir:

$$\mathcal{L}\{10\sin(2t)H(t - \pi)\} = \mathcal{L}\{10\sin(2(t - \pi))H(t - \pi)\} = \frac{20e^{-\pi s}}{s^2 + 4}$$

Bağlı türevlerin Laplace dönüşümünde başlangıç değerleri toplanır: birinci denklemde \(x(0) + 2y(0) = 2 + 2(1) = 4\), ikinci denklemde \(x(0) + 3y(0) = 2 + 3(1) = 5\). Matris sistemi kurulur:

$$\begin{bmatrix} s + 2 & 2s + 5 \\ s & 3s + 1 \end{bmatrix} \begin{bmatrix} X(s) \\ Y(s) \end{bmatrix} = \begin{bmatrix} 4 \\ 5 + \frac{20e^{-\pi s}}{s^2 + 4} \end{bmatrix}$$

Karakteristik determinant sönümlü kökler üretir:

$$\Delta(s) = (s + 2)(3s + 1) - s(2s + 5) = s^2 + 2s + 2 = (s + 1)^2 + 1$$

Kutuplar \(s = -1 \pm i\) olup doğal yanıt frekansı 1 rad/s olan ve \(e^{-t}\) üstel çarpanıyla sönen salınımlardır. Cramer kuralından serbest yanıt (ZIR):

$$x_{\mathrm{ZIR}}(t) = e^{-t}(2\cos t - 23\sin t), \quad y_{\mathrm{ZIR}}(t) = e^{-t}(\cos t + 9\sin t)$$

Zorlanmış yanıt (ZSR) ise \(e^{-\pi s}\) gecikme çarpanı taşır ve basit kesirlere ayrıldıktan sonra ters dönüştürülür:

$$\begin{cases} x_{\mathrm{ZSR}}(t) = \left[ 14\cos 2t - 3\sin 2t + e^{-(t - \pi)}(14\cos t + 8\sin t) \right] H(t - \pi) \\ y_{\mathrm{ZSR}}(t) = \left[ -6\cos 2t + 2\sin 2t - e^{-(t - \pi)}(6\cos t + 2\sin t) \right] H(t - \pi) \end{cases}$$

Burada \(\cos(t - \pi) = -\cos t\) ve \(\sin(t - \pi) = -\sin t\) trigonometrik indirgemesi kullanılmıştır. Dikkat edilirse \(t < \pi\) için sistem yalnızca serbest sönümlü ZIR hareketini yapar; \(t = \pi\) anında zorlanmış modlar süreklilik bozulmaksızın devreye girer.

> **SIK HATA:** Gecikmeli zorlama \(\mathcal{L}\{f(t)H(t - c)\}\) hesabında en yaygın hata, \(f(t)\) fonksiyonunu \(t - c\) cinsinden yazmadan doğrudan \(e^{-cs}F(s)\) almaktır! Örneğin \(t H(t - 1)\) ifadesinin dönüşümü \(\frac{e^{-s}}{s^2}\) DEĞİLDİR; fonksiyon \(t = (t - 1) + 1\) şeklinde ötelenmeli ve \(\mathcal{L}\{(t - 1 + 1)H(t - 1)\} = e^{-s}\left(\frac{1}{s^2} + \frac{1}{s}\right)\) olarak hesaplanmalıdır!

---

## Örnek 7.13: İkinci Mertebe Bağlı Sistem ve Kutup Sadeleşmesi

Örnek 7.13, \(x\) değişkeninde ikinci türev, \(y\) değişkeninde birinci türev içeren asimetrik bir sistemdir:

$$\begin{cases} \ddot{x} - 3\dot{x} - \dot{y} + 2y = 60t H(t - 1) \\ \dot{x} - 3x + \dot{y} = 0 \end{cases}, \quad x(0) = 5, \; \dot{x}(0) = 15, \; y(0) = 0$$

Gecikmeli rampa zorlaması \(60t H(t - 1) = 60(t - 1 + 1)H(t - 1)\) dönüşümü:

$$\mathcal{L}\{60t H(t - 1)\} = 60e^{-s}\mathcal{L}\{t + 1\} = 60e^{-s}\left(\frac{1}{s^2} + \frac{1}{s}\right) = \frac{60(s + 1)e^{-s}}{s^2}$$

Laplace dönüşümü uygulanıp başlangıç değerleri \(\ddot{x} \to s^2X - 5s - 15\) ve \(\dot{x} \to sX - 5\) yerleştirildiğinde sistem:

$$\Delta(s) = \det \begin{bmatrix} s^2 - 3s & -(s - 2) \\ s - 3 & s \end{bmatrix} = (s - 3)(s - 1)(s + 2)$$

Karakteristik polinom 3. derecedendir ve kökler \(s = 3, 1, -2\)’dir. ZIR hesaplanırken olağanüstü bir sadeleşme gerçekleşir:

$$X_{\mathrm{ZIR}}(s) = \frac{5(s - 1)(s + 2)}{(s - 3)(s - 1)(s + 2)} = \frac{5}{s - 3} \implies x_{\mathrm{ZIR}}(t) = 5e^{3t}, \quad y_{\mathrm{ZIR}}(t) = 0$$

Pay determinantındaki \((s - 1)(s + 2)\) sıfırları, paydadaki kutuplarla tam olarak sadeleşir! Bu başlangıç koşulları altında \(s = 1\) ve \(s = -2\) modları hiç uyarılmaz; serbest yanıt tamamen saf \(e^{3t}\) modunda kalırken \(y_{\mathrm{ZIR}}(t)\) özdeşçe sıfır çıkar.

ZSR bileşeni ise basit kesirlere ayrılarak tüm modların \(t \ge 1\) için uyarıldığını gösterir:

$$\begin{cases} x(t) = 5e^{3t} + \left( 10 + 8e^{3(t-1)} - 20e^{t-1} + 2e^{-2(t-1)} \right) H(t - 1) \\ y(t) = \left( 15 + 30t - 40e^{t-1} - 5e^{-2(t-1)} \right) H(t - 1) \end{cases}$$

---

## 7.3.3 Bağımsız Doğrulama ve Diferansiyel Denklem Kalıntı Testi

> **BAĞIMSIZ DOĞRULAMA:** Analitik olarak bulunan çözümlerin doğruluğu, çözümlerin türevleri hesaplanıp orijinal diferansiyel denklemlere konularak test edilir. Sistem kalıntıları herhangi bir \(t\) anında makine hassasiyetinde sıfır vermelidir:

$$E_1(t) \equiv L_1[x, y] - f_1(t) \equiv 0, \quad E_2(t) \equiv L_2[x, y] - f_2(t) \equiv 0$$

Ayrıca bağımsız bir 4. mertebe Runge-Kutta (RK4) integratörü, analitik yörünge ile sayısal simülasyon arasındaki farkın \(10^{-7}\) mertebesinin altında kaldığını teyit eder.
