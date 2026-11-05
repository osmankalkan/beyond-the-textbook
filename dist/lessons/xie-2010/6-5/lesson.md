# §6.5 Diferansiyel Denklemlerin Laplace Dönüşümü ile Çözümü

Laplace dönüşümünün mühendislik ve fizikteki en güçlü uygulama alanı, başlangıç değer problemlerini (IVP) doğrudan çözebilme kabiliyetidir. Klasik yöntemlerde önce homojen genel çözüm bulunur, ardından belirsiz katsayılar veya parametrelerin değişimi ile özel integral hesaplanır ve nihayet başlangıç koşulları yerleştirilerek bir doğrusal denklem sistemi çözülür. Laplace dönüşümü ise bu üç adımı tek bir cebirsel işlem havuzunda birleştirir.

Türevlerin Laplace dönüşümü formülleri sayesinde türevli bir diferansiyel denklem, frekans bölgesinde \(s\) cebirsel değişkenine bağlı rasyonel bir denkleme dönüşür.

## 1. Türevlerin Laplace Dönüşümü

Bir \(y(t)\) fonksiyonunun türevlerinin Laplace dönüşümü kısmi integrasyon ile doğrudan türetilir:

1. Birinci türevin Laplace dönüşümü:

$$ \mathcal{L}\{y'(t)\} = s Y(s) - y(0) $$

2. İkinci türevin Laplace dönüşümü:

$$ \mathcal{L}\{y''(t)\} = s^2 Y(s) - s y(0) - y'(0) $$

3. Üçüncü türevin Laplace dönüşümü:

$$ \mathcal{L}\{y'''(t)\} = s^3 Y(s) - s^2 y(0) - s y'(0) - y''(0) $$

4. Genel \(n\)-inci mertebeden türev:

$$ \mathcal{L}\left\{y^{(n)}(t)\right\} = s^n Y(s) - s^{n-1} y(0) - s^{n-2} y'(0) - \dots - y^{(n-1)}(0) $$

Burada görüldüğü gibi, başlangıç koşulları \(y(0), y'(0), \dots, y^{(n-1)}(0)\) dönüşüm işlemi sırasında doğrudan cebirsel polinom olarak denkleme dahil edilir.

## 2. Başlangıç Değer Probleminin Cebirsel Yapısı

Sabit katsayılı \(n\)-inci mertebeden bir diferansiyel denklem ele alalım:

$$ a_n y^{(n)} + a_{n-1} y^{(n-1)} + \dots + a_1 y' + a_0 y = f(t) $$

Her iki tarafın Laplace dönüşümü alındığında:

$$ P(s) Y(s) - Q(s) = F(s) $$

Burada \(P(s) = a_n s^n + \dots + a_1 s + a_0\) karakteristik polinomdur; \(Q(s)\) başlangıç koşullarından gelen polinomdur; \(F(s) = \mathcal{L}\{f(t)\}\) ise dış zorlama girdisinin Laplace dönüşümüdür. Buradan \(Y(s)\) doğrudan çözülür:

$$ Y(s) = \frac{Q(s)}{P(s)} + \frac{F(s)}{P(s)} $$

Bu formül sistem dinamiklerinin temel ayrışımını verir:

$$ y(t) = y_{\text{free}}(t) + y_{\text{forced}}(t) = \mathcal{L}^{-1}\left\{\frac{Q(s)}{P(s)}\right\} + \mathcal{L}^{-1}\left\{\frac{F(s)}{P(s)}\right\} $$

1. **Sıfır-Girdi Yanıtı (Zero-Input Response / ZIR):** Dış girdi sıfır olduğunda (\(F(s) = 0\)) yalnızca başlangıç enerjisinin yarattığı serbest titreşimdir.
2. **Sıfır-Durum Yanıtı (Zero-State Response / ZSR):** Başlangıç koşulları sıfır olduğunda (\(Q(s) = 0\)) yalnızca dış girdinin yarattığı zorlanmış harekettir.

Transfer fonksiyonu \(H(s) = 1 / P(s)\) olarak tanımlandığında, zorlanmış yanıt konvolüsyon integrali ile de yazılabilir:

$$ H(s) = \frac{1}{P(s)} \implies y_{\text{forced}}(t) = \mathcal{L}^{-1}\{H(s) F(s)\} = (h * f)(t) $$

> **ZİHİN MODELİ (ZIR VE ZSR NEDİR?):** Bir gitar telini düşün: Teli parmağınla çekip bırakırsan duyduğun ses telin depolanmış başlangıç enerjisidir (ZIR - Sıfır Girdi Yanıtı). Tel dururken parmağınla sürekli ritmik vurursan duyduğun ses dış zorlamadır (ZSR - Sıfır Durum Yanıtı). Toplam hareket bu ikisinin saf bir toplamıdır!

## 3. Örnek 6.16: Rezonanslı İkinci Mertebe Salınıcı

Aşağıdaki başlangıç değer problemini çözelim:

$$ y'' - 8y' + 25y = e^{4t} \sin 3t, \quad y(0) = 1, \quad y'(0) = 4 $$

Denklemin her iki tarafının Laplace dönüşümü alınır:

$$ (s^2 Y(s) - s - 4) - 8(s Y(s) - 1) + 25 Y(s) = \frac{3}{(s - 4)^2 + 9} $$

Başlangıç koşulu terimleri toplanır:

$$ (s^2 - 8s + 25) Y(s) = (s - 4) + \frac{3}{(s - 4)^2 + 9} $$

Karakteristik polinom \(s^2 - 8s + 25 = (s - 4)^2 + 9\) olduğundan her iki taraf bölünür:

$$ Y(s) = \frac{s - 4}{(s - 4)^2 + 9} + \frac{3}{((s - 4)^2 + 9)^2} $$

İlk terim birinci kaydırma kuralıyla ters çevrilir: \(e^{4t} \cos 3t\). İkinci terim ise Örnek 6.13'teki rezonans formülü ve 1. kaydırma teoremi ile tersine çevrilir:

$$ y(t) = e^{4t} \cos 3t + \frac{1}{18} e^{4t} (\sin 3t - 3t \cos 3t) $$

Burada \(t \cos 3t\) terimi, zorlama frekansı ile doğal frekansın tam çakışmasından kaynaklanan rezonans büyümesini temsil eder.

## 4. Örnek 6.17: Parçalı ve Süreksiz Zorlama Fonksiyonları

Laplace yönteminin klasik diferansiyel denklemlere kıyasla en belirgin üstünlüğü, süreksiz ve basamaklı zorlamalarda aralık sınırlarında dikiş (stitching) yapmaya gerek bırakmamasıdır.

$$ y'' + 4y = f(t), \quad y(0) = 0, \quad y'(0) = 0 $$

Burada \(f(t)\) parçalı fonksiyonu şöyledir: \(0 \le t < 1\) için \(f(t) = 4t\), \(t \ge 1\) için \(f(t) = 4\).

> **PRATİK İPUCU (NEDEN LAPLACE KULLANIYORUZ?):** Klasik kalkülüs ile çözseydik *t* < 1 için ayrı sabitler, *t* ≥ 1 için ayrı sabitler bulup sınırda konum ve hızları eşitlemekle 3 sayfa işlem yapacaktık. Laplace yöntemi Heaviside basamağı sayesinde tüm zamanı tek bir cebirsel hamlede çözer!

Heaviside basamak fonksiyonu ile tek bir satırda yazılır:

$$ f(t) = 4t - 4(t - 1) H(t - 1) $$

İkinci kaydırma teoremi kullanılarak dönüşüm alınır:

$$ F(s) = \frac{4}{s^2} - \frac{4 e^{-s}}{s^2} = \frac{4(1 - e^{-s})}{s^2} $$

Çözüm transfer fonksiyonuna dönüştürülür:

$$ Y(s) = \frac{4(1 - e^{-s})}{s^2(s^2 + 4)} = (1 - e^{-s}) \left[\frac{1}{s^2} - \frac{1}{s^2 + 4}\right] $$

Parantez içindeki çekirdeğin ters Laplace dönüşümü \(g(t) = t - \frac{1}{2}\sin 2t\) dir. İkinci kaydırma kuralı uygulanarak:

$$ y(t) = \left(t - \frac{1}{2} \sin 2t\right) - \left[(t - 1) - \frac{1}{2} \sin 2(t - 1)\right] H(t - 1) $$

Klasik yöntemde \(t < 1\) ve \(t > 1\) aralıkları ayrı ayrı çözülüp \(t = 1\) noktasında konum ve hız sürekliliği eşitlenmeliydi; Laplace bu süreci tek bir formülle kapatır.

## 5. Örnek 6.18: Gecikmeli Polinom Zorlaması ve Taylor Açılımı

Üçüncü mertebeden gecikmeli bir başlangıç değer problemi:

$$ y''' - y'' + 4y' - 4y = 40(t^2 + t + 1) H(t - 2) $$

Başlangıç koşulları: \(y(0) = 5, y'(0) = 0, y''(0) = 10\).

Zorlama teriminde ikinci kaydırma kuralını uygulayabilmek için polinom \(t = (t - 2) + 2\) tabanına açılır:

$$ t^2 + t + 1 = (t - 2)^2 + 5(t - 2) + 7 $$

Laplace dönüşümü gecikme çarpanı \(e^{-2s}\) ile alınır:

$$ F(s) = 40 e^{-2s} \left(\frac{2}{s^3} + \frac{5}{s^2} + \frac{7}{s}\right) $$

Karakteristik denklem \((s - 1)(s^2 + 4)\) çarpanlarına ayrılır ve ters dönüşüm alınarak tam analitik yörünge inşa edilir.

## 6. Örnek 6.19: Dirac Delta Darbesi ve Darbe Yanıtı

Başlangıçta dengede duran bir harmonik osilatöre \(t = a\) anında uygulanan ideal darbe kuvveti:

$$ y'' + 2\zeta \omega_0 y' + \omega_0^2 y = I \delta(t - a), \quad y(0) = 0, \quad y'(0) = 0 $$

Dönüşüm alındığında sağ taraf \(I e^{-as}\) olur ve sönümlü doğal frekans \(\omega_d = \omega_0 \sqrt{1 - \zeta^2}\) olmak üzere:

$$ y(t) = \frac{I}{\omega_d} e^{-\zeta \omega_0 (t - a)} \sin[\omega_d (t - a)] H(t - a) $$

Darbe anı \(t = a\) noktasında konum \(y(a) = 0\) kalarak süreklidir; ancak hız \(y'(a^+) - y'(a^-) = I\) kadar anlık sıçrama yapar. Bu, darbe-momentum teoreminin Laplace dönüşümündeki kusursuz matematiksel tezahürüdür.
