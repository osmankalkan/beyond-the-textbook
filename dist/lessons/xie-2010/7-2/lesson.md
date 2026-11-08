# §7.2 Operatör Yöntemi: Karakteristik Determinant, Sabit Elemesi ve Cramer Kuralı

Diferansiyel denklem sistemlerini çözmenin en güçlü ve zarif yollarından biri, türev işlemini bir cebirsel büyüklük gibi ele alan **diferansiyel operatör** \(D \equiv d/dt\) yaklaşımıdır. Bu yöntemde sabit katsayılı türevler \(D\) cinsinden polinomlara dönüştürülür; böylece diferansiyel sistem bir operatör matrisi formuna kavuşur. Matrisin determinantı alınarak sistem tek bir skaler karakteristik denkleme indirgenir. Ancak bu cebirsel kolaylık kritik bir kuralı beraberinde getirir: diferansiyel operatörler skaler sayılar gibi her zaman değişmeli değildir; özellikle homojen olmayan sistemlerde operatörler fonksiyonlardan önce uygulanmalıdır.

> **ZİHİN MODELİ:** Diferansiyel operatör \(D\), fonksiyonlar uzayında etki eden bir dönüşüm makinesidir. Bir sistemi operatör matrisi formunda yazdığımızda, değişkenleri yok etme süreci klasik lineer denklem sistemlerindeki Gauss elemesine benzer. Matrisin determinantı \(\phi(D)\), sistemin ortak "genetik kodunu" (doğal frekanslarını ve üstel sönüm modlarını) taşır. Her koordinat aynı skaler denklemi sağlar; aralarındaki faz ve genlik kilitlerini ise orijinal diferansiyel denklemler belirler.

---

## 7.2.1 Homojen Sistemler ve Tamamlayıcı Çözümler

İki bilinmeyenli sabit katsayılı homojen bir diferansiyel denklem sistemini ele alalım:

$$\begin{cases} \phi_{11}(D) x_1 + \phi_{12}(D) x_2 = 0 \\ \phi_{21}(D) x_1 + \phi_{22}(D) x_2 = 0 \end{cases}, \quad D \equiv \frac{d}{dt}$$

Burada \(\phi_{ij}(D)\) ifadeleri sabit katsayılı \(D\) polinomlarıdır. Değişkenlerden \(x_2\)’yi yok etmek için, birinci denkleme \(\phi_{22}(D)\) operatörü, ikinci denkleme ise \(\phi_{12}(D)\) operatörü uygulanır:

$$\phi_{22}(D)\phi_{11}(D) x_1 + \phi_{22}(D)\phi_{12}(D) x_2 = 0, \quad \phi_{12}(D)\phi_{21}(D) x_1 + \phi_{12}(D)\phi_{22}(D) x_2 = 0$$

Sabit katsayılı operatörler birbiriyle değişmeli (\(\phi_{22}(D)\phi_{12}(D) = \phi_{12}(D)\phi_{22}(D)\)) olduğundan, ikinci denklem birinci denklemden çıkarıldığında \(x_2\) tamamen elenir ve yalnızca \(x_1\) içeren bağımsız denklem elde edilir:

$$\left(\phi_{11}(D)\phi_{22}(D) - \phi_{12}(D)\phi_{21}(D)\right) x_1 = 0 \implies \phi(D) x_1 = 0$$

Benzer biçimde \(x_1\) elendiğinde, \(x_2\) değişkeninin de tıpatıp aynı operatör denklemini sağladığı görülür. Buradaki \(\phi(D)\), katsayı matrisinin determinantıdır:

$$\phi(D) = \det \begin{bmatrix} \phi_{11}(D) & \phi_{12}(D) \\ \phi_{21}(D) & \phi_{22}(D) \end{bmatrix} = \phi_{11}(D)\phi_{22}(D) - \phi_{12}(D)\phi_{21}(D)$$

Bu ilke, \(n\) bilinmeyenli genel lineer sistemlere doğrudan genelleşir:

$$\phi(D) x_1 = 0, \quad \phi(D) x_2 = 0, \quad \dots, \quad \phi(D) x_n = 0$$

Buradan çıkan temel sonuç şudur: sistemdeki tüm \(x_1, x_2, \dots, x_n\) bilinmeyenleri aynı \(\phi(\lambda) = 0\) karakteristik denklemini paylaşır ve tamamlayıcı çözümleri aynı fonksiyonel formdadır:

$$\phi(\lambda) = \det[\phi_{ij}(\lambda)] = 0, \quad N = \operatorname{deg} \phi(D)$$

> **PRATİK KONTROL:** Sistemin genel çözümündeki bağımsız keyfi sabit sayısı, her zaman determinant polinomunun derecesi olan \(N = \operatorname{deg} \phi(D)\) değerine eşittir. Eğer \(x_1\) ve \(x_2\) için karakteristik köklerden bağımsız dörder sabit yazarsanız, iki sabit orijinal denklem yardımıyla elenmelidir. Asla \(N\) değerinden fazla bağımsız sabit bırakılamaz!

---

## Örnek 7.3: Harmonik Salınım Sistemi ve Sabit Elemesi

Kitaptaki Örnek 7.3 sistemini inceleyelim:

$$\begin{cases} (D - 3)x - 6y = 0 \\ 3x + (D + 3)y = 0 \end{cases}$$

Operatör katsayı matrisinin determinantı:

$$\phi(D) = \det \begin{bmatrix} D - 3 & -6 \\ 3 & D + 3 \end{bmatrix} = (D - 3)(D + 3) + 18 = D^2 + 9$$

Karakteristik denklem saf sanal kökler verir:

$$\phi(\lambda) = \lambda^2 + 9 = 0 \implies \lambda = \pm 3i$$

Hem \(x\) hem de \(y\) aynı harmonik formda yazılır:

$$x_C(t) = A_1 \cos 3t + B_1 \sin 3t, \quad y_C(t) = A_2 \cos 3t + B_2 \sin 3t$$

Burada görünürde 4 sabit vardır. Ancak \(\operatorname{deg} \phi(D) = 2\) olduğundan yalnızca 2 bağımsız sabit bulunabilir. Çözümleri birinci denklem \((D - 3)x - 6y = 0\) içine koyarak fazla sabitleri yok edelim:

$$(D - 3)x_C - 6y_C = (-3A_1 + 3B_1 - 6A_2)\cos 3t + (-3A_1 - 3B_1 - 6B_2)\sin 3t = 0$$

\(\cos 3t\) ve \(\sin 3t\) fonksiyonları lineer bağımsız olduğundan, katsayıları ayrı ayrı sıfır olmalıdır. Buradan \(A_2\) ve \(B_2\) sabitleri doğrudan \(A_1\) ve \(B_1\) serbest sabitlerine bağlanır:

$$A_2 = -\frac{1}{2}(A_1 - B_1), \quad B_2 = -\frac{1}{2}(A_1 + B_1)$$

---

## Örnek 7.4: 3. Mertebe Asimetrik Sistem ve Kaybolan Katsayı

Bazı sistemlerde köklerden biri, koordinatlardan birinde tamamen sıfır katsayıya sahip olabilir. Örnek 7.4:

$$\phi(D) = \det \begin{bmatrix} D^2 + 3D + 2 & D + 1 \\ D + 2 & D - 1 \end{bmatrix} = (D + 1)(D + 2)(D - 2)$$

Kökler \(\lambda = -1, -2, 2\) olup sistem derecesi \(N = 3\)’tür. Çözümler \((D + 2)x + (D - 1)y = 0\) denklemine yerleştirildiğinde, \(\lambda = -2\) modunda \((D + 2)[e^{-2t}] = 0\) çarpanı \(x\) içindeki \(e^{-2t}\) terimini sıfırlar ve \(D_2 = 0\) çıkar:

$$x_C(t) = C_1 e^{-t} + C_2 e^{-2t} + C_3 e^{2t}, \quad y_C(t) = \frac{1}{2}C_1 e^{-t} - 4C_3 e^{2t}$$

> **İŞARET KURALI:** Sabitleri orijinal denkleme yerleştirirken türev işaretlerine çok dikkat edilmelidir: \(D[A \cos \omega t] = -\omega A \sin \omega t\). Eksi işaretinin dağıtılmasında yapılan tek bir hata, \(A_2\) ve \(B_2\) arasındaki faz eşleşmesini tersine çevirir ve korunumlu sistemleri yapay biçimde kararsızlaştırır.

---

## 7.2.2 Homojen Olmayan Sistemler ve Operatörlü Cramer Kuralı

Sağ taraflarında \(f_i(t)\) zorlama fonksiyonları bulunan lineer sistemlerde, cebirsel sistemlerdeki Cramer kuralı diferansiyel operatörlere uyarlanır:

$$x_{iP}(t) = \frac{\Delta_i(t)}{\phi(D)}, \quad i = 1, 2, \dots, n$$

Burada \(\Delta_i(t)\), katsayı matrisinin \(i\). sütununun sağ taraf zorlama vektörü ile değiştirilmesiyle elde edilen determinanttır:

$$\Delta_i(t) = \det \begin{bmatrix} \phi_{11}(D) & \dots & f_1(t) & \dots & \phi_{1n}(D) \\ \phi_{21}(D) & \dots & f_2(t) & \dots & \phi_{2n}(D) \\ \vdots & & \vdots & & \vdots \\ \phi_{n1}(D) & \dots & f_n(t) & \dots & \phi_{nn}(D) \end{bmatrix}$$

> **SIK HATA:** Determinant açılırken operatör ile fonksiyonun yerini değiştirmek en tehlikeli sınav tuzağıdır! Determinantın elemanları operatör ve fonksiyon içerdiğinden, **operatörler daima fonksiyonlardan önce yazılmalıdır**: \(\phi_{ij}(D)[f_k(t)]\). Eğer ters sırada yazılırsa (\(f_k(t)\phi_{ij}(D)\)), ortaya bir fonksiyon değil, tamamlanmamış bir diferansiyel operatör çıkar!

---

## Örnek 7.5: Üstel ve Polinom Zorlaması

Örnek 7.3 sistemine \(f_1(t) = 0\) ve \(f_2(t) = 18t e^{-3t}\) zorlaması eklendiğinde Cramer determinantları:

$$\Delta_x(t) = \det \begin{bmatrix} 0 & -6 \\ 18t e^{-3t} & D + 3 \end{bmatrix} = 108t e^{-3t}$$

$$\Delta_y(t) = \det \begin{bmatrix} D - 3 & 0 \\ 3 & 18t e^{-3t} \end{bmatrix} = (D - 3)[18t e^{-3t}] = 18e^{-3t} - 108t e^{-3t}$$

Burada \(\Delta_y(t)\) için çarpım türevi uygulanmıştır: \(D[t e^{-3t}] = e^{-3t} - 3t e^{-3t}\). Şimdi Bölüm 4’teki üstel kaydırma teoremi ile \(x_P\) hesaplanır:

$$x_P(t) = \frac{108}{D^2 + 9}[t e^{-3t}] = 108e^{-3t}\frac{1}{(D - 3)^2 + 9}[t] = 2(3t + 1)e^{-3t}$$

Benzer biçimde \(y_P(t)\) elde edilir:

$$y_P(t) = \frac{1}{D^2 + 9}[18e^{-3t} - 108t e^{-3t}] = -(6t + 1)e^{-3t}$$

---

## Örnek 7.6: Sistemlerde Rezonans ve Seküler Büyüme

Eğer zorlama fonksiyonunun frekansı sistemin doğal frekansı \(\omega = 3\) ile çakışırsa (örneğin \(f_1(t) = 2\cos 3t, f_2(t) = 2\sin 3t\)):

$$\Delta_x(t) = \det \begin{bmatrix} 2\cos 3t & -6 \\ 2\sin 3t & D + 3 \end{bmatrix} = 6\cos 3t + 6\sin 3t, \quad \Delta_y(t) = -6\sin 3t$$

Payda \(\phi(3i) = (3i)^2 + 9 = 0\) olduğundan standart ters operatör kuralı tanımsızlaşır. Türev teoremi (\(1/\phi'(3i)\)) devreye girer:

$$\frac{1}{D^2 + 9} e^{3it} = \frac{t e^{3it}}{\phi'(3i)} = \frac{t(\cos 3t + i\sin 3t)}{6i} = \frac{t}{6}\sin 3t - i\frac{t}{6}\cos 3t$$

Böylece her iki koordinatta genliği zamanla doğrusal büyüyen seküler rezonans terimleri ortaya çıkar:

$$x_P(t) = t(\sin 3t - \cos 3t), \quad y_P(t) = t\cos 3t$$

Bu özel çözüm sisteme konduğunda, türevlerden gelen faz artıkları tamamlayıcı sabitlerde \(A_2 = -\frac{1}{2}(A_1 - B_1) - \frac{1}{2}\) ve \(B_2 = -\frac{1}{2}(A_1 + B_1) + \frac{1}{6}\) kayması üretir.

---

## Bağımsız Doğrulama ve Diferansiyel Denklem Kalıntı Testi

> **BAĞIMSIZ DOĞRULAMA:** Analitik yolla bulunan çözüm ailesinin doğruluğu, çözümlerin türevleri hesaplanıp orijinal diferansiyel denklemlere yerleştirilerek test edilir. Herhangi bir \(t\) anı için sistem kalıntıları özdeşçe sıfır vermelidir:

$$E_1(t) \equiv (D - 3)x - 6y - f_1(t) = 0, \quad E_2(t) \equiv 3x + (D + 3)y - f_2(t) = 0$$

Ayrıca bağımsız bir 4. mertebe Runge-Kutta (RK4) sayısal integratörü, analitik yörünge ile sayısal simülasyon arasındaki farkın \(10^{-7}\) mertebesinin altında kaldığını teyit eder.
