# §6.6 Laplace Dönüşümünün Mühendislik Uygulamaları

Laplace dönüşümü; yapı dinamiği, mekanik titreşimler, elektrik devreleri ve sürekli ortamlar mekaniğindeki karmaşık zorlamaları analiz etmek için ideal bir çerçevedir. Parçalı sürekli darbeler, ani şok yükleri, periyodik dalga formları ve tekil noktasal kuvvetler, Laplace uzayında doğrudan rasyonel cebirsel ifadelere dönüşür.

Bu bölümde Wei-Chau Xie'nin kitabındaki üç temel mühendislik problemi derinlemesine incelenmektedir: tek serbestlik dereceli (SDOF) titreşim sistemleri, periyodik sinyallerle sürülen elektrik devreleri ve elastik zemin üzerindeki kirişler.

## 1. Tek Serbestlik Dereceli (SDOF) Sistemlerin Titreşimi

Kütlesi \(m\), viskoz sönüm katsayısı \(c\) ve yay rijitliği \(k\) olan tek serbestlik dereceli mekanik bir sistemin hareket denklemi:

$$ m x''(t) + c x'(t) + k x(t) = f(t) $$

Her iki taraf \(m\) kütlesine bölünerek standart modal parametrelere dönüştürülür:

$$ x''(t) + 2\zeta \omega_n x'(t) + \omega_n^2 x(t) = \frac{1}{m} f(t) $$

Burada modal parametreler şöyle tanımlanır:

$$ \omega_n = \sqrt{\frac{k}{m}}, \quad \zeta = \frac{c}{2\sqrt{km}}, \quad \omega_d = \omega_n \sqrt{1 - \zeta^2} $$

Sıfır başlangıç koşulları altında sistemin transfer fonksiyonu:

$$ H(s) = \frac{1}{m(s^2 + 2\zeta \omega_n s + \omega_n^2)} $$

Bu transfer fonksiyonunun ters Laplace dönüşümü, sistemin temel birim darbe yanıtını (Green fonksiyonu) verir:

$$ h(t) = \mathcal{L}^{-1}\{H(s)\} = \frac{1}{m \omega_d} e^{-\zeta \omega_n t} \sin \omega_d t $$

Herhangi bir \(f(t)\) dış zorlaması altındaki zorlanmış yanıt, konvolüsyon integrali ile doğrudan hesaplanır:

$$ x(t) = (h * f)(t) = \int_0^t h(u) f(t - u) du $$

## 2. Örnek 6.20: Rampa Yüklemesi Altında Yapısal Tepki

Bir binaya uygulanan parçalı doğrusal rampa kuvveti: \(t_1\) süresince doğrusal artarak \(F_0\) değerine ulaşmakta, \(t \ge t_1\) için sabit kalmaktadır:

$$ f(t) = \frac{F_0}{t_1} \left[t - (t - t_1) H(t - t_1)\right] $$

İkinci kaydırma teoremi ile Laplace dönüşümü alınır:

$$ F(s) = \frac{F_0}{t_1 s^2} \left(1 - e^{-t_1 s}\right) $$

Sönümsüz osilatör için (\(\zeta = 0\)) yer değiştirme dönüşümü:

$$ X(s) = \frac{F_0}{m t_1} \frac{1 - e^{-t_1 s}}{s^2(s^2 + \omega_n^2)} $$

Birim rampa çekirdeği basit kesirlere ayrılarak ters çevrilir:

$$ x_{\text{ramp}}(t) = \frac{F_0}{k t_1} \left(t - \frac{1}{\omega_n} \sin \omega_n t\right) $$

Süperpozisyon ilkesi ile nihai çözüm iki parçalı olarak inşa edilir:

$$ x(t) = x_{\text{ramp}}(t) - x_{\text{ramp}}(t - t_1) H(t - t_1) $$

Rampa süresi \(t_1\) doğal periyot \(T_n = 2\pi / \omega_n\) değerinin tam katı olduğunda (\(t_1 = n T_n\)), \(t \ge t_1\) anındaki artık titreşim tamamen sıfırlanır ve sistem kusursuz biçimde statik dengeye oturur.

> **ZİHİN MODELİ (KUSURSUZ ASANSÖR HAREKETİ):** Bir yükü aniden değil de yumuşak bir rampa ile kaldırdığında, rampa süresi yapının doğal periyodunun tam katı olursa (*t*₁ = *n* *Tₙ*) rampa bittiği anda titreşim tamamen sıfırlanır! Modern asansörlerin sarsıntısız kalkış-duruş profilleri tam olarak bu sıfırlanma matematiğiyle tasarlanır.

## 3. Örnek 6.21: Patlama ve Şok Sinüs Darbesi

Patlama veya darbe dalgalarını modelleyen \(t_0\) süreli yarım sinüs darbesi:

$$ f(t) = F_0 \sin\left(\frac{\pi t}{t_0}\right) \left[H(t) - H(t - t_0)\right] $$

Darbe frekansı \(\omega_p = \pi / t_0\) tanımlanarak trigonometrik faz kaydırması ile dönüşüm alınır:

$$ F(s) = F_0 \frac{\omega_p}{s^2 + \omega_p^2} \left(1 + e^{-t_0 s}\right), \quad \omega_p = \frac{\pi}{t_0} $$

Zaman bölgesindeki çözüm basamak gecikmesi ile ifade edilir:

$$ x(t) = g(t) + g(t - t_0) H(t - t_0) $$

Burada temel darbe yanıt çekirdeği şöyledir:

$$ g(t) = \frac{F_0}{m(\omega_n^2 - \omega_p^2)} \left[\frac{\omega_p}{\omega_n} \sin \omega_n t - \sin \omega_p t\right] $$

Darbe süresi \(t_0 \to 0\) sınırında bu çözüm, toplam itkisi \(I = 2 F_0 t_0 / \pi\) olan bir Dirac delta darbe yanıtına kusursuz biçimde yakınsar.

## 4. Örnek 6.22: Periyodik Kare Dalgalı Elektrik Devreleri

Seri bir RLC devresinde yük \(q(t)\) ve akım \(i(t) = q'(t)\) için diferansiyel denklem:

$$ L q''(t) + R q'(t) + \frac{1}{C} q(t) = v(t), \quad i(t) = q'(t) $$

Periyodu \(T\) olan herhangi bir \(f_{\text{per}}(t)\) periyodik sinyalinin Laplace dönüşümü şu teoremle hesaplanır:

$$ \mathcal{L}\{f_{\text{per}}(t)\} = \frac{1}{1 - e^{-sT}} \int_0^T e^{-st} f(t) dt $$

> **PRATİK İPUCU (PERİYODİK DÖNÜŞÜMÜN SIRRI):** Sonsuza kadar tekrarlayan dalgalarla karşılaştığında sonsuz integral alma! Yalnızca ilk periyodun ([0, *T*]) integralini hesapla ve başına 1 / (1 − *e*⁻ˢᵀ) çarpanı ekle. Bu çarpan, sonsuz dalga katarının geometrik seri toplamından başka bir şey değildir!

Genişliği \(T/2\) ve genliği \(V_0\) olan simetrik kare dalga için gerilim dönüşümü:

$$ V(s) = \frac{V_0}{s(1 + e^{-sT/2})} $$

Akımın Laplace dönüşümü \(I(s) = s Q(s)\) bağıntısıyla bulunur:

$$ I(s) = \frac{s V(s)}{L s^2 + R s + 1/C} = \frac{V_0}{1 + e^{-sT/2}} \frac{1}{L s^2 + R s + 1/C} $$

Anahtarlama anlarında devre kutupları uyarılır ve her yarım periyotta sönümlenen yüksek frekanslı bir çınlama (ringing) gözlemlenir.

## 5. Bölüm 6.6.3: Elastik Zemin Üzerindeki Kirişler

Sürekli elastik bir zemin (Winkler temeli) üzerine oturan bir kirişin çökme denklemi 4. mertebedendir:

$$ EI y^{(4)}(x) + k y(x) = w(x) $$

Burada \(EI\) kirişin eğilme rijitliği, \(k\) zemin yatak katsayısıdır. Karakteristik denklem:

$$ s^4 + 4\beta^4 = 0 \implies \beta = \left(\frac{k}{4EI}\right)^{1/4} $$

Karakteristik kökler karmaşık eşlenik dörde ayrılır:

$$ s = \pm \beta (1 \pm i) $$

\(x = a\) noktasında yoğunlaşmış tekil bir \(P_0\) yükü Dirac deltası ile modellenir:

$$ w(x) = P_0 \delta(x - a) \implies W(s) = P_0 e^{-as} $$

Sonsuz kirişte \(x \to \pm \infty\) için sınırlılık koşulları uygulandığında çökme eğrisi elde edilir:

$$ y(x) = \frac{P_0 \beta}{2k} e^{-\beta |x - a|} \left[\cos(\beta |x - a|) + \sin(\beta |x - a|)\right] $$

Maksimum çökme doğrudan yükün altında meydana gelir ve yükten uzaklaştıkça üstel olarak hızla sönümlenir.
