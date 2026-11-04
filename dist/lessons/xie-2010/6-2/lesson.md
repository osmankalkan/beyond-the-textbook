# §6.2 Heaviside Basamak Fonksiyonu ve İkinci Kaydırma Teoremi

Mühendislik sistemlerinde dış kuvvetler ve giriş sinyalleri her zaman düzgün (smooth) ve sürekli değildir. Bir elektrik devresinde anahtarın aniden kapatılması, bir yapıya ani bir rüzgar darbesinin veya patlama yükünün etki etmesi, ya da bir motorun belirli bir zaman aralığında çalışıp durması gibi durumlarda **parçalı sürekli (piecewise continuous)** ve **süreksiz** fonksiyonlar ortaya çıkar.

Klasik diferansiyel denklem yöntemlerinde her süreksizlik noktasında ayrı bir başlangıç değeri problemi çözmek ve çözümleri sınırda teğet bağlamak gerekir. **Heaviside birim basamak fonksiyonu**, bu tür parçalı girdileri tek bir cebirsel formüle sığdırmayı ve Laplace dönüşümünün **İkinci Kaydırma Teoremi (Zaman Gecikmesi)** sayesinde diferansiyel denklemi tek hamlede çözmeyi sağlar.

---

## 1. Heaviside Basamak Fonksiyonunun Tanımı

Birim basamak fonksiyonu \(H(t - a)\), \(a \ge 0\) gecikme anında \(0\)'dan \(1\)'e sıçrayan ideal bir anahtarlama fonksiyonudur:

$$ H(t - a) = 0 \quad (t < a), \qquad H(t - a) = 1 \quad (t > a) $$

\(a = 0\) özel durumunda \(H(t)\) doğrudan \(t = 0\) anında etkinleşen standart birim basamağı temsil eder. \(t = a\) süreksizlik noktasındaki değer genellikle \(1/2\) kabul edilir; ancak integral hesabında sonlu sayıda tekil noktanın değeri integrali etkilemez.

---

## 2. Basamak Fonksiyonunun Laplace Dönüşümü

Tanım integrali işletildiğinde, integrand \(t < a\) aralığında tamamen sıfırdır; dolayısıyla integralin alt sınırı doğrudan \(a\) noktasına kayar:

$$ \mathcal{L}\{H(t - a)\} = \int_0^\infty e^{-st} H(t - a)\,\mathrm{d}t = \int_a^\infty e^{-st}\,\mathrm{d}t = \left[-\frac{1}{s}e^{-st}\right]_a^\infty = \frac{e^{-as}}{s}, \qquad s > 0 $$

\(a = 0\) için standart birim basamağın dönüşümü bilinen sabit fonksiyon sonucunu verir:

$$ \mathcal{L}\{H(t)\} = \frac{1}{s}, \qquad s > 0 $$

Zaman domeninde \(a\) kadar ötelenen her basamak, \(s\)-domeninde bir \(e^{-as}\) üstel sönüm çarpanı kazanır.

---

## 3. İkinci Kaydırma Teoremi (Zaman Gecikmesi)

### 3.1 Teoremin İfadesi ve İspatı

Zaman ekseninde \(a\) birim sağa ötelenmiş ve \(t = a\) anına kadar sıfır tutulmuş bir \(f(t - a)H(t - a)\) sinyalinin Laplace dönüşümü:

$$ \mathcal{L}\{f(t - a) H(t - a)\} = \int_0^\infty e^{-st} f(t - a) H(t - a)\,\mathrm{d}t = \int_a^\infty e^{-st} f(t - a)\,\mathrm{d}t $$

Bu integrale \(\tau = t - a\) zaman ötelemesi dönüşümü uygulanır:

$$ \tau = t - a \quad \Longleftrightarrow \quad t = \tau + a, \qquad \mathrm{d}t = \mathrm{d}\tau $$

İntegrasyon sınırları \(t = a \Longrightarrow \tau = 0\) ve \(t \to \infty \Longrightarrow \tau \to \infty\) olur. Üstel çekirdek parçalanır:

$$ \int_a^\infty e^{-st} f(t - a)\,\mathrm{d}t = \int_0^\infty e^{-s(\tau + a)} f(\tau)\,\mathrm{d}\tau = e^{-as} \int_0^\infty e^{-s\tau} f(\tau)\,\mathrm{d}\tau = e^{-as} F(s) $$

Böylece **İkinci Kaydırma Teoremi** kanıtlanmış olur:

$$ \mathcal{L}\{f(t - a) H(t - a)\} = e^{-as} F(s), \qquad s > s_0 \ge 0 $$

> **Temel Karşılaştırma:**
> - **1. Kaydırma (Frekans Kayması, §6.1):** \(\mathcal{L}\{e^{at}f(t)\} = F(s - a)\). Zaman domeninde üstelle çarpım, \(s\)-eksenini öteler.
> - **2. Kaydırma (Zaman Gecikmesi, §6.2):** \(\mathcal{L}\{f(t - a)H(t - a)\} = e^{-as}F(s)\). Zaman domeninde gecikme, \(s\)-spektrumunu \(e^{-as}\) ile modüle eder.

---

## 4. Parçalı Fonksiyonların Basamaklarla Modellenmesi

### 4.1 Dikdörtgen Darbe (Pencereleme)

Bir sinyalin yalnızca \(a < t < b\) aralığında açık, öncesinde ve sonrasında kapalı olması iki basamağın farkıyla yazılır:

$$ p(t) = H(t - a) - H(t - b) = 1 \quad (a < t < b), \qquad p(t) = 0 \quad (t < a, \, t > b) $$

Bu darbenin Laplace dönüşümü doğrudan doğrusallık ilkesiyle elde edilir:

$$ \mathcal{L}\{H(t - a) - H(t - b)\} = \frac{e^{-as} - e^{-bs}}{s}, \qquad s > 0 $$

### 4.2 Çok Parçalı Fonksiyonlarda Sıçrama Formülü

Farklı zaman aralıklarında \(f_1(t), f_2(t), \dots, f_n(t)\) formülleriyle tanımlanan bir sinyal, geçiş anlarındaki sıçrama basamaklarıyla tek bir satıra toplanır:

$$ f(t) = f_1(t) + [f_2(t) - f_1(t)] H(t - t_1) + [f_3(t) - f_2(t)] H(t - t_2) + \cdots + [f_n(t) - f_{n-1}(t)] H(t - t_{n-1}) $$

### 4.3 Örnek 6.6: Basamaklı Merdiven Fonksiyonu

\(0 < t < 1\) aralığında \(1\), \(1 < t < 2\) aralığında \(2\), \(t > 2\) için \(0\) olan merdiven darbesi:

$$ f(t) = 1\cdot[H(t) - H(t - 1)] + 2\cdot[H(t - 1) - H(t - 2)] = H(t) + H(t - 1) - 2H(t - 2) $$

Laplace dönüşümü tek satırda yazılır:

$$ \mathcal{L}\{f(t)\} = \frac{1 + e^{-s} - 2e^{-2s}}{s}, \qquad s > 0 $$

---

## 5. Kitap Örnekleri ve Argüman Eşleştirme Stratejileri

### 5.1 Örnek 6.7: \(t H(t - 2)\) Dönüşümünün Üç Farklı Yolla Hesabı

Bu fonksiyon doğrudan \(f(t - a)H(t - a)\) formunda değildir; çünkü basamak argümanı \(t - 2\) iken fonksiyon argümanı \(t\)'dir. Üç farklı yöntemle çözülebilir:

**Yöntem 1 (Tanım İntegrali / Kısmi İntegrasyon):**

$$ \mathcal{L}\{t H(t - 2)\} = \int_2^\infty t e^{-st}\,\mathrm{d}t = \left[-\frac{t}{s}e^{-st}\right]_2^\infty + \frac{1}{s}\int_2^\infty e^{-st}\,\mathrm{d}t = e^{-2s}\left(\frac{1}{s^2} + \frac{2}{s}\right) $$

**Yöntem 2 (\(s\)-Bölgesinde Türev Kuralı):**
\(\mathcal{L}\{t g(t)\} = -\frac{\mathrm{d}}{\mathrm{d}s}G(s)\) kuralı \(g(t) = H(t - 2)\) üzerine uygulanır:

$$ \mathcal{L}\{t H(t - 2)\} = -\frac{\mathrm{d}}{\mathrm{d}s}\mathcal{L}\{H(t - 2)\} = -\frac{\mathrm{d}}{\mathrm{d}s}\left(\frac{e^{-2s}}{s}\right) = e^{-2s}\left(\frac{1}{s^2} + \frac{2}{s}\right) $$

**Yöntem 3 (2. Kaydırma için Argüman Eşleştirme):**
\(t\) ifadesi \(t - 2\) cinsinden yazılır:

$$ t = (t - 2) + 2 \quad \Longrightarrow \quad t H(t - 2) = (t - 2)H(t - 2) + 2H(t - 2) $$

Buradan 2. kaydırma teoremi doğrudan işletilir:

$$ \mathcal{L}\{t H(t - 2)\} = e^{-2s}\mathcal{L}\{t\} + 2e^{-2s}\mathcal{L}\{1\} = e^{-2s}\left(\frac{1}{s^2} + \frac{2}{s}\right), \qquad s > 0 $$

### 5.2 Örnek 6.8: Eşleşmeyen Üstel \(e^{at}H(t - b)\)

Genel \(e^{at}H(t - b)\) dönüşümü üç yöntemle de incelenebilir:
1. **Tanım integrali:**

$$ \mathcal{L}\{e^{at} H(t - b)\} = \int_b^\infty e^{-st} e^{at}\,\mathrm{d}t = \int_b^\infty e^{-(s-a)t}\,\mathrm{d}t = \frac{e^{-b(s-a)}}{s - a}, \qquad s > a $$

2. **1. Kaydırma (s yerine s − a yazma):**

$$ \mathcal{L}\{e^{at} H(t - b)\} = \left.\mathcal{L}\{H(t - b)\}\right|_{s \to s - a} = \left.\frac{e^{-bs}}{s}\right|_{s \to s - a} = \frac{e^{-b(s-a)}}{s - a} $$

3. **2. Kaydırma için çarpanlara ayırma:**

$$ e^{at} H(t - b) = e^{ab} e^{a(t - b)} H(t - b) \quad \Longrightarrow \quad e^{ab}\left[e^{-bs}\frac{1}{s - a}\right] = \frac{e^{-b(s-a)}}{s - a} $$

Vize problemi \(e^{2t}H(t) - e^{-3t}H(t - 4)\) bu kural ile tek adımda çözülür:

$$ \mathcal{L}\{e^{2t} H(t) - e^{-3t} H(t - 4)\} = \frac{1}{s - 2} - \frac{e^{-4(s + 3)}}{s + 3}, \qquad s > 2 $$

### 5.3 Örnek 6.9-A: Trigonometrik Açı Kaydırması (\(\cos 2t H(t - \frac{\pi}{8})\))

Açı \(2(t - \frac{\pi}{8})\) tabanına göre yeniden yazılır:

$$ 2t = 2\left(t - \frac{\pi}{8}\right) + \frac{\pi}{4} \quad \Longrightarrow \quad \cos 2t = \frac{1}{\sqrt{2}}\left[\cos 2\left(t - \frac{\pi}{8}\right) - \sin 2\left(t - \frac{\pi}{8}\right)\right] $$

İkinci kaydırma teoremi işletildiğinde:

$$ \mathcal{L}\left\{\cos 2t H\left(t - \frac{\pi}{8}\right)\right\} = \frac{e^{-\frac{\pi}{8}s}}{\sqrt{2}}\left[\frac{s}{s^2 + 4} - \frac{2}{s^2 + 4}\right] = \frac{e^{-\frac{\pi}{8}s}(s - 2)}{\sqrt{2}(s^2 + 4)}, \qquad s > 0 $$

### 5.4 Örnek 6.9-B: Polinomun Taylor Açılımıyla Kaydırılması (\((9t^2 + 2t - 1)H(t - 2)\))

\((t - 2)\) kuvvetlerine göre Taylor açılımı yapılır:

$$ 9t^2 + 2t - 1 = 9(t - 2)^2 + 38(t - 2) + 39 $$

İkinci kaydırma ile \(e^{-2s}\) dışarı alınır ve kalan polinom dönüştürülür:

$$ \mathcal{L}\{(9t^2 + 2t - 1)H(t - 2)\} = e^{-2s}\mathcal{L}\{9t^2 + 38t + 39\} = e^{-2s}\left(\frac{18}{s^3} + \frac{38}{s^2} + \frac{39}{s}\right) = e^{-2s}\frac{39s^2 + 38s + 18}{s^3} $$

---

## 6. Sınav Tuzakları ve Klinik Kontrol Listesi

1. **Argüman Eşleşmeme Tuzağı:** \(\mathcal{L}\{f(t)H(t - a)\} \neq e^{-as}\mathcal{L}\{f(t)\}\)! Mutlaka \(f(t)\) fonksiyonunu \(f(t - a + a)\) olarak açıp \((t - a)\) argümanına kilitle.
2. **Eşleşmeyen Üstel Hatası:** \(e^{at}H(t - b)\) ifadesinde doğrudan \(e^{-bs}/(s-a)\) yazmak yanlıştır; doğrusu \(e^{-b(s-a)}/(s-a)\)'dır (paydaki üstel \(s\) değil \(s - a\) içerir).
3. **Pencere Çıkarma Sırası:** \(a < t < b\) darbesinde basamaklar \(H(t - a) - H(t - b)\) sırasıyla çıkarılır; ters yazmak sinyalin işaretini eksi yapar.
4. **Trigonometrik Katsayı Faktörü:** \(\cos[\omega(t - a) + \phi]\) açılımında \(\omega\) çarpanını parantez dışına almayı unutma.
