# §1.2 · Genel kavramlar ve tanımlar

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §1.2, basılı s.6–15 / PDF s.24–33. Bu metin özgün bir Türkçe çalışma uyarlamasıdır. Kitabın tanımları, Örnek 1.1–1.3 ve serbest düşüş anlatımı esas alınmıştır. Ek karşı örnekler ayrıca belirtilmiştir.

## Bu konudaki çalışma planın

Önce bir denklemin ne söylediğini tanı. Sonra çözüm ailesinden koşullarla bir eğri seç. Varlık–teklik sorusunu, çözüm doğrulama sorusundan ayır. Laboratuvar dört çalışma alanı sunar: **Denklemi tanı → Aile ve koşullar → Varlık ve teklik → Çözümü doğrula.** Sınıflandırma ve doğrulama araçları, burada tanımlanan örnekler üzerinde çalışır; serbest yazılan her denklemi anlayan bir cebir sistemi değildir.

## 1. Diferansiyel denklem, değişken ve mertebe · s.6

Bilinmeyen bir fonksiyon ile onun türevlerini ilişkilendiren denkleme diferansiyel denklem denir. y=y(x) ise x bağımsız, y bağımlı değişkendir. Tek bağımsız değişken ve adi türevler içeren genel biçim:


$$
F(x,y,y',\ldots,y^{(n)})=0
$$

Bu bir **adi diferansiyel denklem (ODE)** biçimidir. Bütün argümanların denklemde açıkça görünmesi gerekmez; y′=3 de bir ODE'dir.

**Mertebe**, görünen en yüksek türevin derecesidir. y′′ ikinci mertebedir. (y′)² içinde türev yalnızca bir kez alınmıştır: denklem birinci mertebedir. Üs 2, mertebeyi 2 yapmaz.

## 2. Doğrusallığı neye göre değerlendiririz? · s.6–7

Bağımlı değişken ve türevleri birinci kuvvette, birbirleriyle çarpılmadan yer alıyorsa denklem doğrusaldır. Katsayılar bağımsız değişkenin bilinen fonksiyonları olabilir. Genel doğrusal ODE biçimi:


$$
a_n(x)y^{(n)}+\cdots+a_1(x)y'+a_0(x)y=f(x)
$$

Çalışılan aralıkta en yüksek türevin katsayısının sıfır olmaması, standart n'inci mertebe yaklaşımı için önemlidir. Doğrusallık, y(x) grafiğinin bir doğru olması demek değildir.

ω sabitken şu denklem doğrusaldır:


$$
y''+\omega^2y=\sin x
$$

sin x bilinen bir fonksiyondur ve doğrusallığı bozmaz. Buna karşılık aşağıdaki denklem, y′ kendi kendisiyle çarpıldığı için doğrusal değildir:


$$
(y')^2+4y=\cos x
$$

Şu denklem üçüncü mertebeden ve doğrusaldır; x³ ile 5x bağımsız değişkenin katsayılarıdır. Standart üçüncü mertebe olarak incelerken örneğin x>0 aralığını seçebiliriz:


$$
x^3y'''+5xy'+6y=e^x
$$

**Değişken rolü tuzağı:** Aşağıdaki örnekte bilinmeyen x=x(y), bağımsız değişken y'dir. Bu yüzden √y, bilinmeyenin doğrusal olmayan bir fonksiyonu değil, bilinen bir katsayıdır (y>0 aralığında):


$$
\frac{d^2x}{dy^2}-\sqrt{y}\,x=5
$$

Doğrusallık hakkında karar vermeden önce hangi fonksiyonun bilinmediğini yaz.

### Sabit / değişken katsayılar ve homojenlik

Doğrusal denklemde türevlerin ve bilinmeyenin katsayıları sabitse sabit katsayılı, bağımsız değişkene bağlıysa değişken katsayılı deriz. Sağ taraftaki sin x gibi bir zorlama terimi, katsayı değildir. ν sabit olmak üzere Bessel denklemi değişken katsayılıdır:


$$
x^2y''+xy'+(x^2-\nu^2)y=0
$$

Bu bölümde kitap, sıfır fonksiyonunu çözüm kabul eden denklemi homojen olarak tanımlar. **Doğrusal standart biçimde** bu, f(x)≡0 demektir. Yalnızca tek bir noktada f(x₀)=0 olması yetmez. y′+y−1=0 yazımında sağda 0 olsa da standart biçim y′+y=1'dir ve denklem homojen değildir.

Laboratuvardaki homojenlik ve katsayı etiketleri doğrusal sınıflandırma içindir; doğrusal olmayan örnekte “bu sınıflandırmada uygulanmaz” seçilir. “Homojen” sözcüğünün §2.2'de farklı bir anlamla da kullanıldığını unutma.

## 3. Kısmi türevli denklemler · s.8

u birden fazla bağımsız değişkene bağlıysa ve bu değişkenlere göre kısmi türevler yer alıyorsa **kısmi diferansiyel denklem (PDE)** söz konusudur. α>0 sabit olmak üzere tek uzay boyutundaki ısı denklemi u=u(x,t) içindir:


$$
u_{xx}=\frac{1}{\alpha}u_t
$$

Burada en yüksek türev ikinci mertebedendir. “Bir uzay boyutu” denmesi, zamanın bağımsız değişken olmaktan çıktığı anlamına gelmez. İki uzay değişkenli Poisson denkleminin f(x,y)=1 özel hali:


$$
u_{xx}+u_{yy}=1
$$

Kitapta verilen biharmonik denklem ise dördüncü mertebedir:


$$
u_{xxxx}+2u_{xxyy}+u_{yyyy}=0
$$

uₓₓᵧᵧ teriminde x'e göre iki ve y'ye göre iki türev, toplam dört türev vardır. Biharmonik denklem doğrusal, sabit katsayılı ve homojendir. Kitap ayrıca 2B/3B Laplace ve 3B ısı denklemlerini örnek verir; aynı sınıflandırma ilkeleri geçerlidir.

## 4. Çözüm bir fonksiyondur ve bir aralıkta geçerlidir · s.8–9

Bir aday fonksiyon, gereken sayıda türevlenebilmeli ve denkleme yerine konduğunda **bir aralıktaki her noktada** eşitliği sağlamalıdır. Tek noktada eşitlik veya bir grafiğin benzer görünmesi kanıt değildir.

Kitaptaki en basit aile:


$$
y'=3
$$



$$
y=3x+C
$$

Her C başka bir doğru verir; tüm doğruların eğimi 3'tür. Başlangıç koşulu y(x₀)=y₀ verilirse C=y₀−3x₀ seçilir. “Genel çözüm” aileyi; “özel çözüm” belirli sabitlerle seçilen üyeyi anlatır. Bu özel çözüm anlamını, ileride doğrusal denklemlerdeki “özel integral / particular integral” terimiyle karıştırma.

Üçüncü mertebe örneğini üç kez integre edelim:


$$
y'''=48x
$$



$$
y=2x^4+\frac{C_1}{2}x^2+C_2x+C_3
$$

Ara adımlar y′′=24x²+C₁ ve y′=8x³+C₁x+C₂'dir. Böylece üç bağımsız sabit ortaya çıkar. Düzenli bir n'inci mertebe problemde n koşul sabitleri belirlemek için gerekir; ancak koşulların sayısı tek başına varlık veya teklik garantisi değildir.

**Ek karşı örnek:** y′′+y=0 için y(0)=y(π)=0 koşullarını bütün y=C sin x fonksiyonları sağlar. İkinci koşul y(π)=1 yapılırsa çözüm yoktur. İki koşul verilmesi otomatik olarak tek çözüm üretmez.

## 5. Başlangıç ve sınır değer problemleri · s.9–11

Kitapta düşey hareket için x yönü **aşağı doğru pozitif** seçilir. Ortam direnci yokken:


$$
\frac{d^2x}{dt^2}=g
$$



$$
x(t)=C_0+C_1t+\frac{gt^2}{2}
$$

Koşulların tümü aynı t değerinde veriliyorsa bir **başlangıç değer problemi (IVP)** kurulur. Örneğin:


$$
x(0)=0,\quad x'(0)=v_0
$$

Bu koşullar C₀=0, C₁=v₀ verir. Koşullar farklı t değerlerinde veriliyorsa bir **sınır değer problemi (BVP)** söz konusudur:


$$
x(0)=0,\quad x(T)=L
$$



$$
x(t)=\left(\frac{L}{T}-\frac{gT}{2}\right)t+\frac{gt^2}{2}
$$

t zaman olsa bile iki farklı t'de verilen koşullar bu tanıma göre sınır koşuludur. Bu örnekte T>0 olduğu için C₁=L/T−gT/2 tek olarak bulunur.

Kitaptaki bırakma yorumunda L≥gT²/2 seçilir; böylece ilk hız aşağı yönde veya sıfırdır. Laboratuvarda bu sınırın altında bir L seçersen bulunan ilk hız negatiftir: başlangıç hareketi yukarı yöndedir. Matematiksel BVP geçerlidir, fakat bu artık kitabın aşağı doğru bırakma durumunun dışındadır.

## 6. Varlık ve teklik · s.11–12

Birinci mertebe başlangıç değer problemini düşün:


$$
y'=f(x,y),\quad y(x_0)=y_0
$$

y′ eğrinin eğimidir. Yön alanındaki kısa doğru parçaları f(x,y) eğimini gösterir; çözüm eğrileri bu parçalara teğettir.

Kitabın yeterli koşulları şöyledir: f, başlangıç noktası çevresindeki R: |x−x₀|≤a, |y−y₀|≤b dikdörtgeninde sürekli olsun; ayrıca y'ye göre aynı R içinde bir Lipschitz sınırı bulunsun:


$$
|f(x,y_1)-f(x,y_2)|\leq L|y_1-y_2|
$$



$$
h=\min\left(a,\frac{b}{M}\right),\quad M=\max_R|f(x,y)|
$$

Bu durumda en az |x−x₀|≤h aralığında başlangıç koşulunu sağlayan tek bir çözüm garanti edilir. M=0 ise çözüm sabittir ve h için a alınabilir. Bu h, çözümün olası en büyük yaşam aralığı değildir; güvence verilen yerel aralıktır.

fᵧ'nin R içinde sürekli olması Lipschitz koşulu için daha güçlü ve pratik bir yeterli koşuldur. Bunun sağlanmaması tek başına teklik yok demek değildir. **Ek örnek:** f(y)=|y|, 0'da türevli değildir ama | |y₁|−|y₂| |≤|y₁−y₂| nedeniyle Lipschitz'tir.

Teorem **yeterli**, zorunlu bir koşul değildir. Koşullar sağlanmazsa karar vermek için başka bir inceleme gerekir; “teorem çalışmıyor” ile “çözüm yok” aynı ifade değildir.

### Kitaptaki tekil başlangıç noktası · Örnek 1.1, s.12–14


$$
xy'=2y
$$

x≠0 iken y′=2y/x yazılabilir ve yerel çözüm y=(y₀/x₀²)x²'dir. x₀>0 için x>0, x₀<0 için x<0 bölgesinde teklik vardır. R'yi x=0 üzerinden genişletirsen normal biçimdeki f=2y/x tanımsız olur.

Asıl denklemi x=0'da incelemek önemlidir: 0·y′(0)=2y(0), yani y(0)=0 gerekir.

- x₀=0, y₀≠0 ise bu eşitlik çelişir: çözüm yoktur.
- x₀=0, y₀=0 ise sonsuz sayıda çözüm vardır. Örneğin:


$$
y(x)=\begin{cases}ax^2,&x\geq0,\\bx^2,&x<0.\end{cases}
$$

a ve b farklı olsa bile fonksiyon ve birinci türevi 0'da süreklidir; ilk mertebe denklemin istediği C¹ düzenliliği sağlanır. İkinci türevin 0'da var olması gerekmez. x₀≠0 için bir taraftaki katsayı belirlense bile diğer tarafa x=0 üzerinden devam ettirmenin tek olması gerekmez. Bu durum yerel teoreme ters düşmez.

**Ek karşı örnek: sürekli olmak neden tek başına yetmez?** y′=√|y|, y(0)=0 için sıfır çözümüne ek olarak, τ≥0 ile aşağıdaki aile de çözüm verir:


$$
y_\tau(x)=\begin{cases}0,&x\leq\tau,\\(x-\tau)^2/4,&x>\tau.\end{cases}
$$

Fonksiyon önce bekler, sonra büyür. Aynı başlangıç koşulundan farklı bekleme süreleri mümkündür. Bu aile, teklik olmadığını göstermek için yeterlidir; tüm çözümleri sınıflandırma iddiası taşımaz.

## 7. ODE çözümünü yerine koyarak doğrulama · Örnek 1.2, s.14


$$
y''+3y'-4y=6\sin(3x)
$$

Adayı biraz genelleştirerek yazalım:


$$
y=C_1e^{-4x}+C_2e^x+A\sin(3x)+B\cos(3x)
$$



$$
y'=-4C_1e^{-4x}+C_2e^x+3A\cos(3x)-3B\sin(3x)
$$



$$
y''=16C_1e^{-4x}+C_2e^x-9A\sin(3x)-9B\cos(3x)
$$



$$
A=-\frac{39}{125},\quad B=-\frac{27}{125}
$$

C₁ ve C₂ terimleri, y′′+3y′−4y işleminde yok olur. A ve B ise zorlamayı üretmelidir. y′ ve y′′'yi hesaplayıp sol taraftan sağ tarafı çıkar:


$$
R(x)=(-13A-9B-6)\sin(3x)+(9A-13B)\cos(3x)
$$

Bir aralık boyunca R≡0 için hem sinüs hem kosinüs katsayısı sıfır olmalıdır. Yukarıdaki A ve B değerleri bunu sağlar. Bu, tek bir seçili x noktasında R=0 görmekten daha güçlü bir kontroldür.

Laboratuvarda bir işaret hatası yükleyip kalanı incele. C₁ ve C₂'yi değiştirmek doğruluğu bozmaz; çünkü bunlar homojen çözümün serbest sabitleridir. Denetim, bu tanımlı aday ailesinin analitik türevleri ve katsayı özdeşliği üzerindedir.

## 8. PDE ve koşulları ayrı ayrı doğrulama · Örnek 1.3, s.15

Aday ailesi:


$$
u(x,t)=A\sin\left(\frac{n\pi x}{L}\right)e^{-\lambda t}
$$



$$
u_t=-\lambda u,\quad u_x=A\frac{n\pi}{L}\cos\left(\frac{n\pi x}{L}\right)e^{-\lambda t},\quad u_{xx}=-\left(\frac{n\pi}{L}\right)^2u
$$



$$
u_t=\frac{1}{9}u_{xx}
$$



$$
\lambda=\frac{n^2\pi^2}{9L^2}
$$



$$
R=u_t-\frac{1}{9}u_{xx}=\left(\frac{n^2\pi^2}{9L^2}-\lambda\right)u
$$

Burada n pozitif tam sayıdır. A≠0 için λ'nın gerekli değeri katsayı eşitliğinden bulunur. Tek bir x noktasında sinüsün sıfır olması adayı bütün bölgede doğru yapmaz.

Kitabın verdiği başlangıç ve sınır koşulları:


$$
u(x,0)=2\sin\left(\frac{3\pi x}{L}\right),\quad u(0,t)=u(L,t)=0
$$



$$
u(x,t)=2\sin\left(\frac{3\pi x}{L}\right)e^{-\pi^2t/L^2}
$$

Bu problem için A=2, n=3 ve λ=π²/L² gerekir. n=1 seçip λ'yı kendi doğru değerine ayarlarsan PDE ve sıfır uç koşulları yine sağlanır; fakat verilen başlangıç profili farklıdır. **Denklemin çözümü olmak, verilen başlangıç/sınır değer probleminin çözümü olmakla aynı kontrol değildir.**

Laboratuvar bu nedenle üç ayrı sonuç gösterir: denklem özdeşliği, uç koşulları ve kitaptaki başlangıç profili. Zamanı değiştirirken başlangıç eğrisini de grafikte karşılaştırabilirsin.

## Konuyu bitirmeden önce

Bir denklemi sınıflandırırken bilinmeyeni ve aralığı söyle. Bir çözümü kontrol ederken türevlenebilirliği, bütün aralıktaki özdeşliği ve verilmiş koşulları ayrı ayrı doğrula. Varlık–teklik konusunda “yeterli koşul sağlanmadı” sonucundan kesin bir hüküm çıkarma.

Bu adım yalnızca §1.2'yi tamamlar. Sonraki konu, bu çalışma incelendikten sonra ele alınacaktır.


---

Çalışma desteği: rehberli gerekçeler için konunun atölyesini, çözümlü sorular için sınav hazırlığı ekranını aç. Kendi açıklamanı dersin not defterine kaydet.
