# §6.4 Ters Laplace Dönüşümü

Laplace dönüşümü ile diferansiyel denklem çözümlerinde en kritik ve en çok emek gerektiren aşama, frekans bölgesinde elde edilen cebirsel \(F(s)\) fonksiyonundan zaman bölgesindeki \(f(t) = \mathcal{L}^{-1}\{F(s)\}\) çözümüne geri dönmektir.

Ters Laplace operatörü \(\mathcal{L}^{-1}\) doğrusal bir operatördür:

$$ \mathcal{L}^{-1}\{c_1 F_1(s) + c_2 F_2(s)\} = c_1 \mathcal{L}^{-1}\{F_1(s)\} + c_2 \mathcal{L}^{-1}\{F_2(s)\} $$

## 1. Temel Ters Dönüşüm Özellikleri

Düz Laplace dönüşümünün özellikleri doğrudan ters dönüşüm kurallarına eşlenir:

1. Birinci frekans kaydırma kuralının tersi:

$$ \mathcal{L}^{-1}\{F(s - a)\} = e^{at} f(t) $$

2. Frekans bölgesinde türevin tersi:

$$ \mathcal{L}^{-1}\left\{F^{(n)}(s)\right\} = (-1)^n t^n f(t) $$

3. İkinci kaydırma teoreminin tersi (Heaviside basamak gecikmesi):

$$ \mathcal{L}^{-1}\{e^{-as} F(s)\} = f(t - a) H(t - a) $$

## 2. Örnek 6.11 ve 6.12 (Kaydırma ve Basamak Uygulamaları)

**Örnek 6.11:** Yüksek mertebeden katlı kutba sahip bir kesir:

$$ F(s) = \frac{s}{(s - 2)^5} = \frac{(s - 2) + 2}{(s - 2)^5} = \frac{1}{(s - 2)^4} + \frac{2}{(s - 2)^5} $$

Birinci kaydırma kuralı ve \(\mathcal{L}^{-1}\{1/s^n\} = t^{n-1}/(n-1)!\) kullanılarak:

$$ f(t) = e^{2t}\mathcal{L}^{-1}\left\{\frac{1}{s^4}\right\} + 2e^{2t}\mathcal{L}^{-1}\left\{\frac{1}{s^5}\right\} = e^{2t}\left[\frac{t^3}{3!} + 2\frac{t^4}{4!}\right] $$

Ortak paranteze alındığında nihai çözüm:

$$ f(t) = \frac{1}{12} e^{2t} t^3 (2 + t) $$

**Örnek 6.12:** Gecikmeli basamak içeren ters dönüşüm:

$$ F(s) = \frac{1 + e^{-3s}}{s^4} = \frac{1}{s^4} + \frac{e^{-3s}}{s^4} $$

İkinci kaydırma kuralı terim terim uygulanır:

$$ f(t) = \frac{1}{6} t^3 + \frac{1}{6} (t - 3)^3 H(t - 3) $$

## 3. Konvolüsyon İntegrali Teoremi

Eğer \(\mathcal{L}^{-1}\{F(s)\} = f(t)\) ve \(\mathcal{L}^{-1}\{G(s)\} = g(t)\) biliniyorsa, bu iki fonksiyonun s-bölgesindeki çarpımı zaman bölgesinde konvolüsyon integrali üretir:

$$ \mathcal{L}^{-1}\{F(s)G(s)\} = (f * g)(t) = \int_0^t f(u) g(t - u) du = \int_0^t g(u) f(t - u) du $$

> **ZİHİN MODELİ (ÇARPMA DEĞİL, GEÇMİŞİ HARMANLAMA):** Frekans bölgesindeki *F*(*s*)*G*(*s*) çarpımı, zaman bölgesinde basit bir *f*(*t*)*g*(*t*) çarpımı DEĞİLDİR! Konvolüsyon, sistemin geçmişteki tüm anlık dürtülerini toplayıp ağırlıklandıran bir hafıza integralidir.

**Örnek 6.13 (Rezonans İncelemesi):** Katlı harmonik payda içeren kesir:

$$ \mathcal{L}^{-1}\left\{\frac{s}{(s^2 + 4)^2}\right\} = \frac{1}{2} \mathcal{L}^{-1}\left\{\frac{2}{s^2 + 2^2} \cdot \frac{s}{s^2 + 2^2}\right\} = \frac{1}{2} (\sin 2t * \cos 2t) $$

Trigonometrik çarpımı toplama dönüştürme özdeşliği uygulanır:

$$ \frac{1}{2}\int_0^t \sin 2u \cos(2(t - u)) du = \frac{1}{4} \int_0^t [\sin 2t + \sin(4u - 2t)] du $$

İntegrasyon sonucunda sınır terimleri sadeleşir ve doğrusal büyüyen rezonans terimi kalır:

$$ \mathcal{L}^{-1}\left\{\frac{s}{(s^2 + 4)^2}\right\} = \frac{1}{4} t \sin 2t $$

## 4. Basit Kesirlere Ayırma (Partial Fractions)

Diferansiyel denklemlerin çözümünde rasyonel fonksiyonların payda derecesi pay derecesinden büyüktür (\(m < n\)):

$$ \frac{N(s)}{D(s)} = \frac{a_m s^m + \dots + a_0}{b_n s^n + \dots + b_0}, \quad m < n $$

1. **Ayrık Reel Kökler:** Payda basit doğrusal çarpanlara ayrılıyorsa:

$$ \frac{N(s)}{(s - r_1)(s - r_2)\dots(s - r_n)} = \frac{A_1}{s - r_1} + \frac{A_2}{s - r_2} + \dots + \frac{A_n}{s - r_n} $$

Her bir kalıntı katsayısı Heaviside kapatma (cover-up) kuralı ile anında hesaplanır:

$$ A_k = \lim_{s \to r_k} (s - r_k) \frac{N(s)}{D(s)} $$

> **PRATİK İPUCU (HEAVISIDE PARMAK KURALI):** Basit kutuplarda (*s* − *rₖ*) payda eşitleyip bilinmeyenli denklem çözmekle vakit kaybetme! Parmakla o kutbun çarpanını kapat, kalan ifadede *s* = *rₖ* koy; aradığın katsayı bir saniyede elinde!

2. **Katlı Kökler:** Paydada \((s - r)^m\) katlı kökü varsa azalan kuvvetler toplamı yazılır:

$$ \frac{N(s)}{(s - r)^m} = \frac{A_m}{(s - r)^m} + \frac{A_{m-1}}{(s - r)^{m-1}} + \dots + \frac{A_1}{s - r} $$

3. **İndirgenemez İkinci Derece Terimler:** Tam kareye tamamlama uygulanır:

$$ s^2 + \alpha s + \beta = (s - a)^2 + \omega^2, \quad a = -\frac{\alpha}{2}, \quad \omega = \sqrt{\beta - \frac{\alpha^2}{4}} $$

Paydaki doğrusal ifade sönümlü kosinüs ve sinüs çekirdeklerine bölünür:

$$ \frac{A s + B}{(s - a)^2 + \omega^2} = A \frac{s - a}{(s - a)^2 + \omega^2} + \frac{B + A a}{\omega} \frac{\omega}{(s - a)^2 + \omega^2} $$

## 5. Örnek 6.14 ve 6.15 Çözümleri

**Örnek 6.14:** Reel kutup ile sönümlü karmaşık eşlenik kutup çiftinin birleşimi:

$$ \frac{4}{(s - 1)(s^2 + 2s + 5)} = \frac{A}{s - 1} + \frac{B s + C}{(s + 1)^2 + 4} $$

Kapatma kuralı ve katsayı eşitleme ile katsayılar belirlenir:

$$ A = \frac{1}{2}, \quad B = -\frac{1}{2}, \quad C = -\frac{3}{2} $$

Ters Laplace dönüşümü alınarak zaman yanıtı elde edilir:

$$ f(t) = \frac{1}{2} e^t - \frac{1}{2} e^{-t}(\cos 2t + \sin 2t) $$

**Örnek 6.15:** İki farklı frekanslı kuadratik payda:

$$ \frac{s + 1}{(s^2 + 1)(s^2 + 9)} = \frac{1}{8}\left[\frac{s + 1}{s^2 + 1} - \frac{s + 1}{s^2 + 9}\right] $$

Her iki terimin ters Laplace dönüşümü alınarak çift harmonik salınım bulunur:

$$ f(t) = \frac{1}{8}\left[\cos t + \sin t - \cos 3t - \frac{1}{3}\sin 3t\right] $$
