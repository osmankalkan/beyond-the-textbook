# §2.1 · Değişkenlerin ayrılması

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.1, basılı s.16–19 / PDF s.34–37. Örnek 2.1–2.3. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu konudaki çalışma planın

Birinci mertebe ODE’yi çarpanlarına ayır; değişkenleri farklı taraflara taşı; sıfıra bölüp bölmediğini sorgula; integralleri hesapla; başlangıç koşulunu uygula ve sonucu türev alarak denetle. Vize bölümünde bu adımlar süreli, puanlamalı örnekler üzerinde çalışılır.

## 1. Denklem ne zaman ayrılabilir?

Birinci mertebe denklem sağ tarafı x’e ve y’ye bağlı iki çarpana ayrılabiliyorsa bu yönteme uygundur:

$$\frac{dy}{dx}=f(x)\,\phi(y)$$

$$e^{x+y^2}=e^x e^{y^2}$$

Burada sağ taraf gerçekten bir x-çarpanı ile bir y-çarpanının çarpımıdır. Buna karşılık genel olarak <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">ln</mi><mo>(</mo><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>)</mo></mrow></math>, <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">sin</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>y</mi><mo>)</mo></mrow></math> ve <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>x</mi><msup><mi>y</mi><mn>2</mn></msup><mo>+</mo><msup><mi>x</mi><mn>2</mn></msup></mrow></math> bu biçimde çarpanlarına ayrılamaz. Terimleri iki tarafa geçirmek tek başına değişkenleri ayırmak değildir; bir tarafta yalnız y, diğer tarafta yalnız x kalmalıdır.

## 2. Ayır, ama böldüğün şeyi önce kontrol et

<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>φ</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>≠</mo><mn>0</mn></mrow></math> olduğu bölgede y’li çarpanı sola, x’li çarpanı sağa alıp iki tarafı integre ederiz:

$$\frac{1}{\phi(y)}\,dy=f(x)\,dx$$

$$\int\frac{dy}{\phi(y)}=\int f(x)\,dx+C$$

Bu adım çözümü örtük biçimde verebilir; sonucu hemen <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>=</mo><mo>…</mo></mrow></math> diye çözememek yöntemin başarısız olduğu anlamına gelmez. İntegralin tanımlı olduğu aralık ve logaritmalardaki mutlak değerler korunur.

**Kritik sınav kontrolü:** <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>φ</mi><mo>(</mo><mi>y</mi><mo>)</mo></mrow></math>’ye böldüysen, önce <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>φ</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mn>0</mn></mrow></math> köklerini çöz ve sabit çözümleri asıl denkleme koy. Bölme bu dalları silebilir. Bulunan denge çözümleri genel aileye zaten dahilde olabilir; değilse ayrıca yazılmalıdır.

## 3. Örnek 2.1 · Üstel denklem

Kitabın denklemi <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>+</mo><mfrac><mn>1</mn><mi>y</mi></mfrac><msup><mi>e</mi><mrow><msup><mi>y</mi><mn>2</mn></msup><mo>+</mo><mn>3</mn><mi>x</mi></mrow></msup><mo>=</mo><mn>0</mn></mrow></math>, <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>≠</mo><mn>0</mn></mrow></math> koşuludur. Bu nedenle y’ye bölmek değil, verilen denklemi düzenlemek gerekir:

$$-y e^{-y^2}\,dy=e^{3x}\,dx$$

$$\frac12e^{-y^2}=\frac13e^{3x}+C$$

Sol integralde <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>u</mi><mo>=</mo><mo>−</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></math>, sağda <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>v</mi><mo>=</mo><mn>3</mn><mi>x</mi></mrow></math> dönüşümü kullanılır. C sabiti serbesttir. Denklem baştan <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>≠</mo><mn>0</mn></mrow></math> bölgesinde tanımlıdır; çözüm aralığı ve örtük ifadeyi reel y için çözebilme koşulu ayrıca belirtilmelidir.

## 4. Örnek 2.2 · Trigonometrik denklem ve kaybolabilecek çözümler

<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">tan</mi><mi>y</mi><mspace width="0.16em"/><mi>d</mi><mi>x</mi><mo>−</mo><mi mathvariant="normal">cot</mi><mi>x</mi><mspace width="0.16em"/><mi>d</mi><mi>y</mi><mo>=</mo><mn>0</mn></mrow></math> denkleminde <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">sin</mi><mi>x</mi><mo>≠</mo><mn>0</mn></mrow></math> ve <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">cos</mi><mi>y</mi><mo>≠</mo><mn>0</mn></mrow></math> kabul edilen bölgede ayırıp integre etmek

$$\cos x\,\sin y=C$$

ailesini verir. Ancak ara adımda <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">sin</mi><mi>y</mi></mrow></math>’ye böldüysen <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">sin</mi><mi>y</mi><mo>=</mo><mn>0</mn></mrow></math>, yani <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>=</mo><mi>k</mi><mi>π</mi></mrow></math> çözümlerini ayrıca denetle. Bunlar burada C=0 üyesi olarak aileye zaten dahildir. Kitabın uyarısı genel: “bölerken sıfır olabilir mi?” sorusunu her ayırma adımında sor.

## 5. Örnek 2.3 · Genel aile dışında kalan çözüm

<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>x</mi><msup><mi>y</mi><mn>3</mn></msup><mspace width="0.16em"/><mi>d</mi><mi>x</mi><mo>+</mo><mo>(</mo><mi>y</mi><mo>+</mo><mn>1</mn><mo>)</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup><mspace width="0.16em"/><mi>d</mi><mi>y</mi><mo>=</mo><mn>0</mn></mrow></math> için <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>≠</mo><mn>0</mn></mrow></math> kolunda değişkenler ayrılır. İntegral alma ve parçalı integrasyon sonunda

$$ (x-1)e^x=\frac1y+\frac{1}{2y^2}+C$$

elde edilir. Fakat <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>=</mo><mn>0</mn></mrow></math> da asıl diferansiyel forma çözümdür. Bu değer hiçbir sonlu C için yukarıdaki ailede yer almaz; bu yüzden ayrıca **tekil çözüm** diye belirtilir. Cevabın eksiksizliği, genel aile + bölme sırasında incelenen özel dalları birlikte kapsamaya bağlıdır.

## 6. Başlangıç koşulu ve doğrulama

Bir başlangıç koşulu C’yi seçebilir; ama örtük ailede koşulu doğrudan yerine koymak ve tanım aralığını kontrol etmek gerekir:

$$y(x_0)=y_0$$

Adayı özgün denkleme geri koy. Türevini al, ortak çarpanları sadeleştir, eşitliğin seçilen aralıkta geçerli olduğunu ve böldüğün çarpanların o aralıkta sıfır olmadığını belirt. Bölme yapılan noktayı aralığa dahil edip edemeyeceğine ayrıca bak.

## Ayrıntılı integral ve doğrulama adımları

### Örnek 2.1 · Üstel

**1. Bölgeyi ve çarpanları belirle**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><msup><mrow><mi>y</mi></mrow><mrow><mo>′</mo></mrow></msup><mo>=</mo><mo>−</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mi>x</mi></mrow></msup><mfrac><mrow><msup><mrow><mi>e</mi></mrow><mrow><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></msup></mrow><mrow><mi>y</mi></mrow></mfrac></mrow></math>

Örnek 2.1 baştan y≠0 koşuluyla tanımlı. y=0, denge çözümü değildir; orijinal ifade orada tanımsızdır.

**2. Değişkenleri ayır**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>−</mo><mi>y</mi><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></msup><mi>d</mi><mi>y</mi><mo>=</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mi>x</mi></mrow></msup><mi>d</mi><mi>x</mi></mrow></math>

y’ye bağlı çarpanı sola taşı. Sol tarafta yalnız y, sağ tarafta yalnız x kalır.

**3. İki değişken dönüşümü yap**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mtable columnalign="left"><mtr><mtd><mrow><mi>u</mi><mo>=</mo><mo>−</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></mtd></mtr><mtr><mtd><mrow><mi>d</mi><mi>u</mi><mo>=</mo><mo>−</mo><mn>2</mn><mi>y</mi><mi>d</mi><mi>y</mi></mrow></mtd></mtr><mtr><mtd><mrow><mi>z</mi><mo>=</mo><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow><mi>d</mi><mi>z</mi><mo>=</mo><mn>3</mn><mi>d</mi><mi>x</mi></mrow></mtd></mtr></mtable></mrow></math>

Sol integralde −y e^(−y²)dy=(1/2)eᵘdu; sağ integralde dx=dz/3. İşaret ve katsayıları koru.

**4. İntegrali al ve örtük aileyi yaz**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn></mrow></mfrac><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></msup><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>3</mn></mrow></mfrac><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mi>x</mi></mrow></msup><mo>+</mo><mi>C</mi></mrow></math>

C sabitini bir kez yazmak yeterlidir. Bu aşamada y’yi açıkça çözmek zorunlu değildir.

**5. Türevle doğrula ve bölgeyi sınırla**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>−</mo><mi>y</mi><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></msup><msup><mrow><mi>y</mi></mrow><mrow><mo>′</mo></mrow></msup><mo>=</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mi>x</mi></mrow></msup></mrow></math>

Örtük türev orijinal denklemi geri verir. Açık dal seçilecekse 0<2e^(3x)/3+2C<1 ve y≠0 gerekir; eşitlikte y=0’a gelinemez.

### Örnek 2.3 · Tekil çözüm

**1. Kayıp dalı önce kontrol et**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mtable columnalign="left"><mtr><mtd><mrow><mi>x</mi><msup><mrow><mi>y</mi></mrow><mrow><mn>3</mn></mrow></msup><mi>d</mi><mi>x</mi><mo>+</mo><mrow><mo>(</mo><mi>y</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><mi>x</mi></mrow></msup><mi>d</mi><mi>y</mi><mo>=</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>y</mi><mo>=</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>

Örnek 2.3’te y=0 ve dy=0 asıl diferansiyel formu sağlar. y³’e bölersen bu dalı kaybedersin.

**2. y≠0 kolunu ayır**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup><mi>d</mi><mi>x</mi><mo>=</mo><mo>−</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow><mrow><msup><mrow><mi>y</mi></mrow><mrow><mn>3</mn></mrow></msup></mrow></mfrac><mi>d</mi><mi>y</mi></mrow></math>

Her iki tarafı eˣ/y³ ile çarp; yalnız y=0 dışlanır. Bu adımda y+1’e bölmek gerekmez.

**3. Sol integral: parçalı integrasyon**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>∫</mo><mi>x</mi><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup><mi>d</mi><mi>x</mi><mo>=</mo><mi>x</mi><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup><mo>−</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup></mrow></math>

u=x ve dv=eˣdx seç; du=dx ve v=eˣ. ∫u dv=uv−∫v du.

**4. Sağ integral: kuvvet kuralı**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>−</mo><mo>∫</mo><mrow><mo>(</mo><msup><mrow><mi>y</mi></mrow><mrow><mo>−</mo><mn>2</mn></mrow></msup><mo>+</mo><msup><mrow><mi>y</mi></mrow><mrow><mo>−</mo><mn>3</mn></mrow></msup><mo>)</mo></mrow><mi>d</mi><mi>y</mi><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></mfrac></mrow></math>

−∫y⁻²dy=1/y ve −∫y⁻³dy=1/(2y²). İki eksi işareti artıya dönüşür.

**5. Aile ve tekil çözümü birlikte yaz**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mtable columnalign="left"><mtr><mtd><mrow><mrow><mo>(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo>)</mo></mrow><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></mfrac><mo>+</mo><mi>C</mi></mrow></mtd></mtr><mtr><mtd><mrow><mi>y</mi><mo>=</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>

Örtük ailede hiçbir sonlu C, y=0 üretmez. Ailenin türevi x eˣ=−(y+1)y′/y³ verir; bu işaret kontrolü önemlidir.

### Örnek 2.2 · Logaritmalardan örtük aileye

Ayrılan denklem sin x/cos x dx = cos y/sin y dy olur. Sol integral −ln|cos x|, sağ integral ln|sin y| verir. Böylece ln|cos x sin y| sabittir. Üstel alınırken işaret yeni sabite katılır: cos x sin y=C. Ara adımda cos x ve sin y’ye bölündüğü bölgelerde işlem geçerlidir; son ailedeki C=0 dalları asıl denklemin sin x≠0, cos y≠0 tanım koşullarıyla ayrıca denetlenir. Örneğin y=kπ gerçekten çözümdür.

Türevle kontrol: −sin x sin y + cos x cos y y′=0. cos x≠0 kolunda y′=tan x tan y olur; bu, özgün diferansiyel formun normal biçimiyle aynıdır. Sadece çarpım ifadesine bakarak tanımsız noktaları çözüm aralığına katma.

## Vizeye hazırlan

Süre önerisi 18 dakika, toplam 20 puan. Önce soruları çöz; ardından her sorunun çözüm adımlarını aç. Puanlama, yalnızca sonuç için değil yöntemi eksiksiz kurmak içindir.

### Soru 1 · Yöntemi seç (4 puan, 3 dakika)

<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>=</mo><mi>x</mi><mo>(</mo><mn>1</mn><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup><mo>)</mo></mrow></math> denklemini ayır ve genel çözümü yaz. İntegrasyon sabitini farklı ama eşdeğer biçimde yazmanın sonucu değiştirip değiştirmediğini açıkla.

### Soru 2 · Sıfıra bölme tuzağı (5 puan, 4 dakika)

<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>=</mo><mi>y</mi><mo>(</mo><mn>1</mn><mo>−</mo><mi>y</mi><mo>)</mo></mrow></math> denklemini çöz. <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>(</mo><mn>1</mn><mo>−</mo><mi>y</mi><mo>)</mo></mrow></math>’ye bölmeden önce hangi çözümleri ayrı sınamalısın? Genel aile bu sabit çözümleri kapsıyor mu?

### Soru 3 · Başlangıç koşulu (5 puan, 5 dakika)

<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>=</mo><mi>x</mi><mi>y</mi></mrow></math>, <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><mn>2</mn></mrow></math>. Genel aileyi bul, C’yi seç ve türev alarak sonucu denklemde doğrula. Çözümün tüm reel x’lerde tanımlı olup olmadığını belirt.

### Soru 4 · Aile dışındaki çözüm (6 puan, 6 dakika)

<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>=</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></math>, <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><mn>0</mn></mrow></math>. Ayırma adımında olası kaybı bul. Bu başlangıç koşulunu sağlayan çözümü yaz ve teklik iddiası için hangi ek teoremin koşullarına bakılacağını söyle.

**Puanlama:** Soru 1: ayırma 1, integral 1, aralık 1, türev denetimi 1 puan. Soru 2: denge dalları 1, kısmi kesir 1, integral 1, açık aile 1, eksiksiz cevap/aralık 1 puan. Soru 3: sıfır dalı 1, integral 1, sabit 1, doğrulama 1, aralık 1 puan. Soru 4: kayıp dal 2, sıfır olmayan aile 1, başlangıç verisi 1, teklik 1, son cevap/aralık 1 puan. Çözümler Vize hazırlığı ekranında açılır.

## Kontrol listesi

- Sağ taraf gerçekten <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>φ</mi><mo>(</mo><mi>y</mi><mo>)</mo></mrow></math> çarpımı mı?
- Böldüğüm ifade hangi değerlerde sıfır? Bu kökler çözüm veriyor mu?
- İntegralleri ve mutlak değerleri doğru yazdım mı?
- C’yi başlangıç koşuluna uyguladım mı?
- Sonucu asıl denkleme geri koyup aralığı belirttim mi?

İlerleme adımı yalnızca §2.1’i tamamlar. Sonraki konu incelemeden sonra ele alınacaktır.


---

Çalışma desteği: rehberli gerekçeler için konunun atölyesini, çözümlü sorular için sınav hazırlığı ekranını aç. Kendi açıklamanı dersin not defterine kaydet.
