# §6.3 Dirac Delta ve Darbe Fonksiyonları

Mühendislik sistemlerinde çok kısa sürede etkiyen devasa kuvvetler veya kirişler üzerindeki noktasal tekil yükler sıklıkla karşımıza çıkar. Örneğin, rijit bir duvara \(v_0\) hızıyla çarpan \(m\) kütleli elastik bir top çok kısa bir \(\epsilon\) temas süresi boyunca duvardan ters yönde şiddetli bir temas kuvveti \(f(t)\) hisseder. Kuvvet eğrisi altındaki alan toplam itki \(I\) olarak adlandırılır:

$$ I = \int_{t_0}^{t_0+\epsilon} f(t) dt $$

İtki-Momentum Prensibi uyarınca kütlenin momentumundaki değişim toplam itkiye eşittir:

$$ m(v_1 - v_0) = I $$

## 1. Dikdörtgen Darbeden Dirac Deltasına

Matematiksel bir idealizasyon olarak, genişliği \(\epsilon\) ve yüksekliği \(I/\epsilon\) olan sonlu bir dikdörtgen darbe fonksiyonu tanımlayalım:

$$ f_\epsilon(t) = \frac{I}{\epsilon}\left[H(t - t_0) - H(t - (t_0 + \epsilon))\right] $$

Süre \(\epsilon\) küçüldükçe (\(\epsilon \to 0\)), darbenin süresi daralır, tepe genliği \(I/\epsilon \to \infty\) olur fakat altındaki alan daima \(I\) kalır. Birim itki \(I = 1\) için limit fonksiyon Dirac delta fonksiyonu (veya birim darbe fonksiyonu) olarak tanımlanır ve \(\delta(t - t_0)\) ile gösterilir:

$$ \delta(t - t_0) = \lim_{\epsilon \to 0} \frac{H(t - t_0) - H(t - (t_0 + \epsilon))}{\epsilon} $$

## 2. Dirac Delta Fonksiyonunun Özellikleri

Dirac deltası klasik anlamda bir fonksiyon olmayıp genelleştirilmiş bir fonksiyon (dağılım / distribution) olarak incelenir. Temel özellikleri şunlardır:

1. Sıfır dışı noktalarda sıfırdır, \(t = a\) anında sonsuza uzanır:

$$ \delta(t - a) = 0 \quad (t \neq a), \qquad \lim_{t \to a} \delta(t - a) = +\infty $$

2. Toplam alanı (itkisi) daima 1'dir:

$$ \int_{a-\alpha}^{a+\alpha} \delta(t - a) dt = 1 \quad (\alpha > 0) $$

3. Süzme (Sifting / Örnekleme) Özelliği: Sürekli herhangi bir \(g(t)\) fonksiyonu için integrasyon darbe anındaki tek değeri izole eder:

$$ \int_{a-\alpha}^{a+\alpha} g(t)\delta(t - a) dt = g(a) \quad (\alpha > 0) $$

4. Heaviside basamağının genelleştirilmiş türevidir:

$$ \frac{dH(t - a)}{dt} = \delta(t - a) $$

> **ZİHİN MODELİ (SÜZME / FOTOĞRAF ÇEKME ÖZELLİĞİ):** Dirac deltası δ(*t* − *a*) ile integrasyon yapmak, hareketli bir filmin içinden tam *t* = *a* anındaki tek bir fotoğraf karesini dondurup almaya benzer. İntegral işaretini tamamen yok eder ve geriye yalnızca o anki fonksiyon değerini *g*(*a*) bırakır!

## 3. Dirac Deltasının Laplace Dönüşümü

Süzme özelliğinde test fonksiyonu olarak Laplace çekirdeği \(g(t) = e^{-st}\) seçildiğinde:

$$ \mathcal{L}\{\delta(t - a)\} = \int_0^\infty e^{-st} \delta(t - a) dt = e^{-as} \quad (a \ge 0) $$

Özel olarak başlangıç anındaki birim darbe için \(a = 0\) konursa \(\mathcal{L}\{\delta(t)\} = 1\) elde edilir; bu da frekans spektrumunun tamamen düz olduğunu gösterir.

Genel bir \(f(t)\) fonksiyonu ile çarpılmış modüle darbe için:

$$ \mathcal{L}\{f(t)\delta(t - a)\} = \int_0^\infty e^{-st} f(t)\delta(t - a) dt = e^{-as} f(a) \quad (a \ge 0) $$

Tek taraflı Laplace integrali \(t \ge 0\) bölgesinde tanımlandığından, negatif zamanlarda meydana gelen darbelerin katkısı sıfırdır:

$$ a < 0 \implies \mathcal{L}\{\delta(t - a)\} = \int_0^\infty e^{-st}\delta(t - a)dt = 0 $$

> **PRATİK İPUCU (SINAVLARDA EN ÇOK DÜŞÜLEN TUZAK):** Tek taraflı Laplace dönüşümü sadece zamanın pozitif tarafına (*t* ≥ 0) bakar. Sınavda δ(*t* + 2) veya δ(*t* + 1) görürsen hiç hesap yapma, doğrudan 0 yaz! Çünkü *t* = −2 anı deney başlamadan önce olup integrasyon bölgesinin dışındadır.

## 4. Örnek 6.10 (Ders Kitabı Çözümü)

Ders kitabındaki Örnek 6.10'da verilen ifadeyi hesaplayalım:

$$ F(s) = \mathcal{L}\left\{\cos \pi t \, \delta(t + 1) + 2\cos\left(\frac{\pi t}{6}\right)\delta(t - 2) + (t^3 - 2t^2 + 5)e^{4t}\delta(t - 3)\right\} $$

1. İlk terimde \(a = -1 < 0\) olduğundan darbe integrasyon aralığının dışındadır:

$$ \mathcal{L}\{\cos \pi t \, \delta(t + 1)\} = 0 $$

2. İkinci terimde \(a = 2\) noktası için katsayı \(2\cos(2\pi/6) = 2\cos(\pi/3) = 1\) olur:

$$ \mathcal{L}\left\{2\cos\left(\frac{\pi t}{6}\right)\delta(t - 2)\right\} = 2\cos\left(\frac{\pi}{3}\right)e^{-2s} = e^{-2s} $$

3. Üçüncü terimde \(a = 3\) noktası için katsayı \((3^3 - 2\cdot 3^2 + 5)e^{12} = 14 e^{12}\) olur:

$$ \mathcal{L}\left\{(t^3 - 2t^2 + 5)e^{4t}\delta(t - 3)\right\} = (27 - 18 + 5)e^{12}e^{-3s} = 14 e^{12} e^{-3s} $$

Sonuçların toplamı nihai çözümü verir:

$$ F(s) = e^{-2s} + 14 e^{12} e^{-3s} $$

## 5. Mühendislik Uygulamaları: Kiriş ve Titreşim Modelleri

Yayılı bir yükün genişliği \(\epsilon \to 0\) sınırında konsantre bir tekil yüke \(W\) dönüşür:

$$ W = \lim_{\epsilon \to 0} \int_{a - \epsilon/2}^{a + \epsilon/2} w(x) dx = \int_{a - \epsilon/2}^{a + \epsilon/2} W\delta(x - a)dx = W $$

Eğilme rijitliği \(EI\) olan bir kirişin dördüncü mertebeden diferansiyel denklemi:

$$ \frac{d^2}{dx^2}\left(EI(x)\frac{d^2 y}{dx^2}\right) = w(x) $$

Tekil yükler ve yayılı yüklerin birlikte etki ettiği genel yükleme:

$$ w(x) = w_0\left[H(x - b_1) - H(x - b_2)\right] + W_1\delta(x - a_1) + W_2\delta(x - a_2) $$

Laplace dönüşümü alındığında tekil yüklerin paydasında \(s\) bulunmazken yayılı yükler \(s\) paydasına sahiptir:

$$ W(s) = w_0\frac{e^{-b_1 s} - e^{-b_2 s}}{s} + W_1 e^{-a_1 s} + W_2 e^{-a_2 s} $$

Titreşim dinamiğinde ise \(m x'' + k x = I\delta(t - t_0)\) darbe uyarımı:

$$ m x''(t) + k x(t) = I \delta(t - t_0), \quad x(0) = 0, \quad x'(0) = 0 $$

Laplace dönüşümüyle transfer fonksiyonu çözümü:

$$ X(s) = \frac{I}{m}\frac{e^{-t_0 s}}{s^2 + \omega_0^2}, \quad \omega_0 = \sqrt{\frac{k}{m}} $$

Zaman bölgesindeki Green darbe yanıtı:

$$ x(t) = \frac{I}{m\omega_0}\sin(\omega_0(t - t_0))H(t - t_0) $$

Bu çözüm darbe anında konumun sürekli kaldığını, hızın ise tam olarak \(\Delta v = I/m\) sıçradığını gösterir:

$$ \Delta x' = x'(t_0^+) - x'(t_0^-) = \frac{I}{m} $$
