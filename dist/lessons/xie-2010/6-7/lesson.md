# §6.7 Bölüm Özeti ve Yöntem Rehberi

Laplace dönüşümü; adi diferansiyel denklemler, başlangıç değer problemleri (IVP), süreksiz basamak ve şok zorlamaları, periyodik sinyaller ve sınır değer problemleri için mühendislikteki en bütünleşik analitik yöntemdir.

Wei-Chau Xie'nin kitabının 6. Bölümünde sunulan tüm teorik özellikler, dönüşüm çiftleri ve pratik çözüm algoritmaları bu özet modülünde tek bir çatı altında birleştirilmiştir.

## 1. Laplace Dönüşümünün Temel Özellikleri (Tablo 6.3)

Laplace dönüşümünün temel operasyonel kuralları şunlardır:

1. Doğrusallık (Linearity):

$$ \mathcal{L}\{c_1 f_1(t) + c_2 f_2(t)\} = c_1 F_1(s) + c_2 F_2(s) $$

2. Birinci Kaydırma Teoremi (Frekans ötelemesi):

$$ \mathcal{L}\{e^{at} f(t)\} = F(s - a) $$

3. İkinci Kaydırma Teoremi (Zaman gecikmesi):

$$ \mathcal{L}\{f(t - a) H(t - a)\} = e^{-as} F(s) $$

4. Ölçekleme Kuralı (Scaling):

$$ \mathcal{L}\{f(at)\} = \frac{1}{a} F\left(\frac{s}{a}\right) $$

5. Frekans Bölgesinde Türev (\(t^n\) ile çarpım):

$$ \mathcal{L}\{t^n f(t)\} = (-1)^n \frac{d^n}{ds^n} F(s) $$

6. Frekans Bölgesinde İntegral (\(t\) ile bölme):

$$ \mathcal{L}\left\{\frac{f(t)}{t}\right\} = \int_s^\infty F(\sigma) d\sigma $$

7. Birinci türevin dönüşümü:

$$ \mathcal{L}\{f'(t)\} = s F(s) - f(0) $$

8. İkinci türevin dönüşümü:

$$ \mathcal{L}\{f''(t)\} = s^2 F(s) - s f(0) - f'(0) $$

9. Genel \(n\)-inci türevin dönüşümü:

$$ \mathcal{L}\left\{f^{(n)}(t)\right\} = s^n F(s) - s^{n-1} f(0) - \dots - f^{(n-1)}(0) $$

10. İntegralin Laplace dönüşümü:

$$ \mathcal{L}\left\{\int_0^t f(u) du\right\} = \frac{F(s)}{s} $$

11. Periyodik fonksiyon dönüşümü (\(f(t + T) = f(t)\)):

$$ \mathcal{L}\{f_{\text{per}}(t)\} = \frac{1}{1 - e^{-sT}} \int_0^T e^{-st} f(t) dt $$

12. Dirac delta darbesi dönüşümü:

$$ \mathcal{L}\{\delta(t - a)\} = e^{-as}, \quad \mathcal{L}\{\delta(t)\} = 1 $$

13. Dirac delta süzme (sifting) integrali:

$$ \int_{-\infty}^\infty g(t) \delta(t - a) dt = g(a) $$

14. Konvolüsyon İntegrali Teoremi:

$$ \mathcal{L}^{-1}\{F(s) G(s)\} = (f * g)(t) = \int_0^t f(u) g(t - u) du $$

## 2. Diferansiyel Denklem Çözüm Mimarisi

Sabit katsayılı doğrusal bir başlangıç değer probleminde diferansiyel denklem \(s\)-bölgesine taşındığında:

$$ P(s) Y(s) = Q(s) + F(s) $$

Buradan çözüm tek bir rasyonel cebirsel denklem ile iki temel fiziksel bileşene ayrılır:

$$ y(t) = \mathcal{L}^{-1}\left\{\frac{Q(s)}{P(s)}\right\} + \mathcal{L}^{-1}\left\{\frac{F(s)}{P(s)}\right\} = y_{\text{free}}(t) + y_{\text{forced}}(t) $$

1. **Sıfır-Girdi Yanıtı (ZIR / Serbest Titreşim):** Yalnızca başlangıç koşulları \(y(0), y'(0)\) tarafından üretilen doğal salınım.
2. **Sıfır-Durum Yanıtı (ZSR / Zorlanmış Titreşim):** Başlangıç enerjisi sıfır iken yalnızca dış zorlama \(f(t)\) tarafından üretilen zorlanmış hareket.

Sistemin transfer fonksiyonu \(H(s) = 1 / P(s)\) tanımlandığında zorlanmış yanıt konvolüsyonla doğrudan eşlenir:

$$ H(s) = \frac{1}{P(s)} \implies y_{\text{forced}}(t) = (h * f)(t) $$

> **ZİHİN MODELİ (BÜTÜN BÖLÜMÜN KUŞBAKIŞI ÖZETİ):** Laplace yöntemi aslında 3 adımlı bir köprüdür: Diferansiyel denklemi zaman dünyasından frekans dünyasına uçur (ℒ), cebirsel olarak *Y*(*s*) kesrini çöz, ardından basit kesirler veya konvolüsyonla zaman dünyasına geri dön (ℒ⁻¹). Sınavda kaybolursan bu üç adımlı köprüyü hatırla!

## 3. Ters Laplace Dönüşümü ve Rezonans

Ters Laplace dönüşümünde kutup yapılarına göre şu stratejiler izlenir:

1. **Ayrık Gerçel Kutuplar:** Heaviside kapatma (cover-up) yöntemi ile kalıntılar doğrudan izole edilir.
2. **Katlı Kuadratik ve Rezonant Kutuplar:** Zorlama frekansı doğal frekansla çakıştığında paydada \((s^2 + \omega^2)^2\) doğar; konvolüsyon teoremi rezonans yanıtını verir:

$$ \mathcal{L}^{-1}\left\{\frac{s}{(s^2 + \omega^2)^2}\right\} = \frac{1}{2\omega} t \sin \omega t $$

3. **İndirgenemez Karmaşık Eşlenik Kutuplar:** Payda tam kareye tamamlanarak sönümlü sinüs ve kosinüs modlarına ayrıştırılır:

$$ \frac{Bs + C}{(s - \alpha)^2 + \beta^2} = B \frac{s - \alpha}{(s - \alpha)^2 + \beta^2} + \frac{C + B\alpha}{\beta} \frac{\beta}{(s - \alpha)^2 + \beta^2} $$

4. **Gecikmeli Polinomlar ve Süreksiz Zorlamalar:** \(P(t) H(t - a)\) biçimindeki terimler Taylor açılımı ile dönüştürülür:

$$ P(t) H(t - a) = P((t - a) + a) H(t - a) $$

## 4. Limit ve Doğrulama Teoremleri

Çözümlerin sınır davranışları başlangıç ve son değer teoremleri ile denetlenir:

1. Başlangıç Değer Teoremi:

$$ \lim_{t \to 0^+} f(t) = \lim_{s \to \infty} [s F(s)] $$

2. Son Değer Teoremi (tüm kutuplar sol yarı düzlemdeyken):

$$ \lim_{t \to \infty} f(t) = \lim_{s \to 0} [s F(s)] $$

> **PRATİK İPUCU (10 SANİYELİK SINAV SAĞLAMASI):** Ters dönüşümünü bulduktan sonra sınavda doğru çözüp çözmediğini anlamak için 10 saniyelik bir kontrol yap: *t* → 0 limitinin soruda verilen *y*(0) başlangıç değerine uyup uymadığını Başlangıç Değer Teoremi ile derhal sına!

## 5. Mühendislik Uygulamaları Sentezi

Bölüm 6'nın mühendislik uygulamalarında elde edilen temel analitik çekirdekler şunlardır:

1. Tek serbestlik dereceli (SDOF) sönümlü osilatörün Green darbe yanıtı:

$$ h(t) = \frac{1}{m \omega_d} e^{-\zeta \omega_n t} \sin \omega_d t $$

2. Winkler elastik zemini üzerindeki sonsuz kirişin tekil noktasal yük altındaki çökme eğrisi:

$$ y(x) = \frac{P_0 \beta}{2k} e^{-\beta |x - a|} \left[\cos(\beta |x - a|) + \sin(\beta |x - a|)\right] $$
