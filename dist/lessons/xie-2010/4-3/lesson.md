# §4.3 · Özel çözümler: belirsiz katsayılar, D-operatörü ve parametrelerin değişimi

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §4.3, basılı s.153–177 / PDF s.171–195. Örnek 4.12–4.29. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- Bir fiziksel sistemi zorlayan dış kuvvet \(F(x)\) varken genel çözümün neden \(y(x) = y_C(x) + y_P(x)\) olarak ikiye ayrıldığını.
- **Belirsiz katsayılar yöntemi (§4.3.1):** Sağ taraftaki fonksiyonun türev ailesine bakarak \(y_P\) taslağını tahmin etmeyi, Tablo 4.1 deneme kalıplarını kurmayı ve sistemin doğal frekansıyla çakışma (rezonans) durumunda \(x^p\) düzeltme kuralını uygulamayı (Örnek 4.12–4.18).
- **\(D\)-operatörü yöntemi (§4.3.2):** Çok sayıda türev alıp denklem sistemi çözmek yerine ters operatör \(\frac{1}{\phi(D)}F(x)\) ile cebirsel kısayolları kullanmayı: Teorem 1 (üstel kuralı), Teorem 2 (üstel öteleme ve polinom serisi), Teorem 3 (sinüzoidal \(D^2\to -\beta^2\) kuralı) ve Teorem 4 (rezonans türev kuralı) (Örnek 4.19–4.26).
- **Parametrelerin değişimi yöntemi (§4.3.3):** Sağ tarafta \(\ln x, \tan x, \sec x, \csc x\) gibi türevi sonlu kalmayan vahşi fonksiyonlar olduğunda veya katsayılar değişken olduğunda Temel çözümler \(y_1, y_2\) doğrusal bağımsız olduğundan Wronskian determinantı ile her zaman çalışan genel çözüme ulaşmayı (Örnek 4.27–4.29).

## Karar haritası: 3 yöntemin zihinsel mantığı

Doğrusal bir diferansiyel denklemi bir araba süspansiyonu gibi düşünebilirsin:
- **Eşitliğin sol tarafı (\(\phi(D)y = 0\)):** Sistemin kendi iç yapısıdır (kütle, yay sertliği, amortisör). Bunun çözümü olan **tamamlayıcı çözüm \(y_C(x)\)**, sisteme dışarıdan hiçbir kuvvet uygulanmadığında sistemin kendiliğinden nasıl salınıp söndüğünü anlatır (§4.2).
- **Eşitliğin sağ tarafı (\(F(x)\)):** Sisteme dışarıdan etki eden zorlayıcı kuvvettir (yol tümsekleri, motor titreşimi, rüzgar). Bunun çözümü olan **özel çözüm \(y_P(x)\)**, sistemin bu dış kuvvete boyun eğerek yaptığı zorunlu harekettir.
- **Genel çözüm:** Sistemin tam davranışı bu iki hareketin toplamıdır: \(y(x) = y_C(x) + y_P(x)\).

Sağ taraftaki \(F(x)\) kuvvetine bakarak en hızlı ve güvenli yolu şu mantıkla seçeriz:

| Sağ taraf \(F(x)\) tipi | Önerilen yöntem | Zihinsel mantık ve kural |
| --- | --- | --- |
| Polinom, üstel, \(\cos\beta x, \sin\beta x\) | Belirsiz katsayılar (§4.3.1) veya \(D\)-operatörü (§4.3.2) | Türevleri kendi ailesinde kalır; Tablo 4.1 kalıbını yaz. Rezonans varsa \(x^p\) ile çarp. |
| Saf üstel \(e^{ax}\) veya kaydırılmış polinom \(e^{ax}P_m(x)\) | \(D\)-operatörü (Teorem 1, 2) | \(\phi(a)\neq 0\) ise tek adımda \(\frac{e^{ax}}{\phi(a)}\); polinomda seriyi \(D^m\)'de kes. |
| Sinüzoidal dalgalar \(\sin\beta x, \cos\beta x\) | \(D\)-operatörü (Teorem 3, 4) | \(D^2\to -\beta^2\) koy; paydada kalan \(p+qD\) ifadesini eşlenikle rasyonelleştir. |
| \(\ln x, \tan x, \sec x, \csc x\) veya değişken katsayı | Parametrelerin değişimi (§4.3.3) | Türev ailesi sonsuzdur, tahmin tutmaz! Wronskian ile kesin integrale git. |

> **Altın kural.** Belirsiz katsayılar ve \(D\)-operatörü kısayolları yalnız **sabit katsayılı** denklemlerde ve türevleri kendi ailesi içinde dönüp duran **uysal fonksiyonlarda** çalışır. Parametrelerin değişimi ise homojen çözümler bilindiği sürece **istisnasız her doğrusal denklemde** çalışır; ancak integralleri zahmetli olabileceği için uysal sağ taraflarda operatör yöntemleri çok daha hızlıdır.

---

## 1. Belirsiz katsayılar yöntemi (§4.3.1) · "Tahmin et ve eşitle"

Sabit katsayılı doğrusal diferansiyel denklemi operatör biçiminde yazalım:

$$ \phi(D)y = (a_n D^n + a_{n-1}D^{n-1} + \cdots + a_1 D + a_0)y = F(x) $$

Türevleri alındığında yine kendisiyle aynı tipten terimler üreten fonksiyonlara **UC fonksiyonları** denir: \(x^m\), \(e^{ax}\), \(\cos\beta x\), \(\sin\beta x\), \(\cosh\beta x\), \(\sinh\beta x\) ve bunların çarpımları. Mantık çok basittir: *Girdi neyse, çıktı da aynı aileden olmalıdır.*

### Tablo 4.1 · Rezonans yokken temel deneme kalıpları

Sağ taraf \(F(x)\) içindeki hiçbir terim tamamlayıcı çözüm \(y_C(x)\) içinde yer almıyorsa (\(p=0\)), aşağıdaki kalıplar doğrudan kullanılır:

| Sağ taraf \(F(x)\) | Temel deneme \(y_P(x)\) | Mantığı ve püf noktası |
| --- | --- | --- |
| Polinom \(P_m(x)=b_0 x^m+\cdots+b_m\) | \(A_0 x^m + A_1 x^{m-1} + \cdots + A_m\) | Türevler tüm alt dereceleri doğurur; eksik kuvvet olsa bile sabite kadar tüm terimler yazılır. |
| Üstel \(c\,e^{ax}\) | \(A\,e^{ax}\) | Üstelin türevi hep kendisidir; katsayıyı bulmak yeterlidir. |
| Sinüs/Kosinüs \(c\cos\beta x + d\sin\beta x\) | \(A\cos\beta x + B\sin\beta x\) | Sağda yalnız \(\cos\) veya yalnız \(\sin\) olsa bile \(y'\) türevi diğerini doğuracağı için ikisi birlikte yazılır. |
| Hiperbolik \(c\cosh\beta x + d\sinh\beta x\) | \(A\cosh\beta x + B\sinh\beta x\) | Veya üstel tanım \(e^{\beta x}, e^{-\beta x}\) üzerinden iki ayrı üstel olarak çözülür. |
| Polinom \(\times\) Üstel \(P_m(x)e^{ax}\) | \((A_0 x^m + \cdots + A_m)e^{ax}\) | Polinomun tüm dereceleri üstel zarf ile çarpılır. |
| Üstel \(\times\) Sinüzoidal \(e^{ax}(c\cos\beta x + d\sin\beta x)\) | \(e^{ax}(A\cos\beta x + B\sin\beta x)\) | Sönümlü dalga kalıbı; tam trigonometrik çift korunur. |
| Polinom \(\times\) Üstel \(\times\) Sinüzoid | \(e^{ax}\bigl[(A_0 x^m+\cdots)\cos\beta x + (B_0 x^m+\cdots)\sin\beta x\bigr]\) | İki ayrı \(m\)-inci derece polinom gerekir (\(2m+2\) belirsiz katsayı). |

### Örnek 4.12 ve 4.13 · Temel deneme nasıl uygulanır?

**Örnek 4.12 (Saf üstel girdi).** \((D^2+9)y=3e^{2x}\) denklemini çözelim. Karakteristik denklem \(\lambda^2+9=0\Longrightarrow \lambda=\pm 3i\) olduğundan sistemin doğal frekansı \(3\)'tür. Dış kuvvetin üstü \(a=2\) kök değildir. Bu yüzden doğrudan \(y_P=Ae^{2x}\) deneriz:

$$ (D^2+9)(Ae^{2x}) = (2^2+9)Ae^{2x} = 13Ae^{2x} = 3e^{2x} \quad\Longrightarrow\quad A=\frac{3}{13},\qquad y_P(x)=\frac{3}{13}e^{2x} $$

**Örnek 4.13 (Polinom-üstel çarpımı).** \((D^2+2D+4)y = 8x^2 e^{3x}\) denkleminde \(\lambda^2+2\lambda+4=0\) kökleri \(\lambda=-1\pm\sqrt{3}i\)'dir (\(a=3\) kök değildir). Sağda yalnız \(x^2 e^{3x}\) görünse bile, çarpım türevleri \(x e^{3x}\) ve \(e^{3x}\) terimlerini zorunlu olarak doğurur. Bu yüzden tam ikinci derece polinom taslağı kurmak şarttır:

$$ y_P = (Ax^2 + Bx + C)e^{3x} \quad\Longrightarrow\quad 19Ax^2 + (16A+19B)x + (2A+8B+19C) = 8x^2 $$

Katsayılar eşitlendiğinde \(A=\frac{8}{19}\), \(B=-\frac{128}{361}\), \(C=\frac{736}{6859}\) bulunur.

### Örnek 4.14 ve 4.15 · Neden hem kosinüs hem sinüs zorunludur?

**Örnek 4.14 (Trigonometrik eşleşme zorunluluğu).** \((D^2+2D+4)y = 111e^{-x}\cos 3x\) denkleminde sağ tarafta yalnız \(\cos 3x\) vardır. Neden yalnız \(A\cos 3x\) deneyemeyiz? Çünkü sol tarafta \(2Dy = 2y'\) birinci türevi vardır ve kosinüsün birinci türevi sinüs üretir! O sinüsü yok edecek bir karşı terim bulunmazsa eşitlik asla sağlanamaz. Bu yüzden deneme her iki terimi birden içermelidir:

$$ y_P(x) = e^{-x}(A\cos 3x + B\sin 3x) $$

Türevler yerine konulduğunda \(\cos 3x\) ve \(\sin 3x\) terimlerinden \(A\) ve \(B\) katsayıları \(2\times 2\) bir sistem verir ve her iki katsayı da sıfırdan farklı çıkar.

**Örnek 4.15 (Trigonometrik kuvveti toplama çevirme).** \((D^2+4)y = 4\cos^3 2x\) denkleminde \(\cos^3 2x\) doğrudan Tablo 4.1'de yoktur. Trigonometrik üç kat açı özdeşliği \(4\cos^3 2x = \cos 6x + 3\cos 2x\) ile ifadeyi birinci dereceden toplam biçimine açarız:

$$ (D^2+4)y = \cos 6x + 3\cos 2x $$

Homojen çözüm \(\lambda=\pm 2i\) köklerinden \(y_C = C_1\cos 2x + C_2\sin 2x\)'tir. Sağdaki \(\cos 6x\) terimi rezonanssızdır; ancak \(3\cos 2x\) terimi sistemin doğal frekansı ile çakışır (rezonans!). Dolayısıyla rezonanslı terim \(x\) çarpanı alır:

$$ y_P(x) = -\frac{1}{32}\cos 6x + \frac{3}{4}x\sin 2x $$

### Rezonans (\(x^p\) düzeltme kuralı) · Örnek 4.16, 4.17 ve 4.18

Bir salıncağı kendi doğal sallanma ritminde iterseniz genlik zamanla (\(x\)) büyür; köprülerin yıkılmasına neden olan fiziksel olay tam olarak budur.

Matematiksel olarak: Eğer tahmin ettiğin \(y_P\) terimi zaten homojen çözüm \(y_C\) içinde varsa, denklemde \(\phi(D)\) operatörünü uyguladığın an \(\phi(D)y_P = 0\) çıkar! Sıfır çıktığı için sağ taraftaki \(F(x)\)'i asla elde edemezsin. Bu kilitlenmeyi çözmek için denemeyi \(x\) ile, kök \(p\) katlı ise \(x^p\) ile çarparak bağımsızlaştırırız:

1. **Örnek 4.16 (\(\lambda=0\) kök olduğunda polinom girdi):** \((D^2+2D)y = 4x^2+2x+3\). Karakteristik denklem \(\lambda(\lambda+2)=0\) olduğu için \(\lambda=0\) basit köktür (\(p=1\), çünkü denklemde \(y\) terimi yoktur ve sabit sayının türevi sıfırdır). Standart polinom denemesi \(x^1\) ile çarpılır:

$$ y_P(x) = x(Ax^2 + Bx + C) = Ax^3 + Bx^2 + Cx \quad\Longrightarrow\quad y_P(x) = \frac{2}{3}x^3 - \frac{1}{2}x^2 + 2x $$

2. **Örnek 4.17 (Üç katlı kök rezonansı, \(p=3\)):** \((D^3-6D^2+12D-8)y = xe^{2x} + x^2\). Operatör \((D-2)^3\) olduğundan \(\lambda=2\) üç katlı köktür (\(p=3\)), ancak \(\lambda=0\) kök değildir (\(p=0\)). Bu yüzden yalnız \(e^{2x}\) terimi \(x^3\) ile çarpılır, \(x^2\) polinomuna dokunulmaz:

$$ y_P(x) = x^3(Ax+B)e^{2x} + (Cx^2+Ex+F) = (Ax^4+Bx^3)e^{2x} + Cx^2+Ex+F $$

3. **Örnek 4.18 (İki ayrı ailede rezonans):** \((D^4-4D^2)y = \sinh 2x + 2x^2\). Karakteristik kökler \(\lambda=0,0,2,-2\)'dir:

$$ y_C(x) = C_0 + C_1 x + C_2\cosh 2x + C_3\sinh 2x $$

Burada \(\sinh 2x\) terimi \(\lambda=\pm 2\) basit kökleriyle (\(p=1\)), \(2x^2\) polinomu ise \(\lambda=0\) çift köküyle (\(p=2\)) rezonanstadır:

$$ y_P(x) = x(A\sinh 2x + B\cosh 2x) + x^2(Ex^2 + Fx + G) = \frac{1}{32}x\cosh 2x - \frac{1}{24}x^4 - \frac{1}{8}x^2 $$

---

## 2. D-operatörü yöntemi (§4.3.2) · "Cebirsel hız sanatı"

Belirsiz katsayılar yönteminde uzun türevler alıp büyük denklem sistemleri çözmek zahmetlidir. \(D\)-operatörü yöntemi ise diferansiyel denklemi sanki basit bir kesirmiş gibi tersine çevirerek çözer:

$$ y_P(x) = \frac{1}{\phi(D)}F(x) \qquad\Longleftrightarrow\qquad \phi(D)y_P(x) = F(x) $$

Ters operatör doğrusaldır; sağ taraf toplam ise her terime ayrı uygulanır. Dört sihirli kural işlemi saniyeler içinde bitirir:

### Teorem 1 · Üstel kuralı: D yerine a yaz geç!

\(D(e^{ax}) = a e^{ax}\) olduğundan türev almak sadece \(a\) ile çarpmaktır. Bu yüzden paydada \(\phi(a)\neq 0\) olduğu sürece \(D\) yerine doğrudan \(a\) yazılır:

$$ \frac{1}{\phi(D)}e^{ax} = \frac{1}{\phi(a)}e^{ax},\qquad \phi(a)\neq 0 $$

Örneğin \(\frac{1}{D^2+9}e^{2x} = \frac{1}{2^2+9}e^{2x} = \frac{1}{13}e^{2x}\). Tek satırda biter!

### Teorem 2 · Üstel öteleme ve polinom serisi

Sağ tarafta \(e^{ax}\) bir başka fonksiyonla çarpım durumundaysa, üsteli operatörün soluna alıp dışarı çıkarabiliriz. Tek şart, içeride \(D\) gördüğümüz yere \(D+a\) yazmaktır:

$$ \frac{1}{\phi(D)}\bigl[e^{ax}f(x)\bigr] = e^{ax}\frac{1}{\phi(D+a)}f(x) $$

Eğer içeride kalan \(f(x)\) bir polinomsa, \(\frac{1}{\phi(D+a)}\) ifadesini geometrik seri olarak açarız:

$$ \frac{1}{1+u} = 1 - u + u^2 - u^3 + \cdots,\qquad \frac{1}{1-u} = 1 + u + u^2 + u^3 + \cdots $$

Polinomun derecesinden yüksek türevler zaten sıfır olacağı için seri sonlu bir adımda kendiliğinden kesilir!

**Örnek 4.19, 4.20 ve 4.21.** \((D^2+5D+4)y = e^{2x} + x^2 e^{-2x}\) denkleminde (Örnek 4.19) birinci terim Teorem 1 ile \(\frac{1}{18}e^{2x}\) verir. İkinci terimde \(e^{-2x}\) sola çekilir ve kalan operatör seriye açılır:

$$ y_{P2} = e^{-2x}\frac{1}{D^2+D-2}x^2 = -\frac{e^{-2x}}{2}\frac{1}{1 - \left(\frac{1}{2}D + \frac{1}{2}D^2\right)}x^2 = -\frac{e^{-2x}}{2}\left(1 + \frac{1}{2}D + \frac{3}{4}D^2 + \cdots\right)x^2 = -\frac{1}{4}(2x^2+2x+3)e^{-2x} $$

### Teorem 3 · Sinüs ve kosinüs kuralı (\(D^2 \to -\beta^2\))

Sinüs ve kosinüsün iki kez türevi \(-\beta^2\) çarpanı getirdiği için, paydadaki her \(D^2\) yerine \(-\beta^2\) yazarız:

$$ \frac{1}{\phi_1(D^2) + D\phi_2(D^2)}\sin\beta x = \frac{1}{\phi_1(-\beta^2) + \phi_2(-\beta^2)D}\sin\beta x,\qquad \frac{1}{\phi_1(D^2) + D\phi_2(D^2)}\cos\beta x = \frac{1}{\phi_1(-\beta^2) + \phi_2(-\beta^2)D}\cos\beta x $$

Paydada birinci dereceden bir \(p + qD\) operatörü kalırsa, payı ve paydayı eşlenik \(p - qD\) ile çarparak paydayı tamamen sayıya dönüştürürüz!

**Örnek 4.22, 4.23 ve 4.24.** \((D^2+3D-4)y = 6\sin 3x\) denkleminde \(D^2 \to -3^2 = -9\) koyalım:

$$ y_P = \frac{1}{-9 + 3D - 4}(6\sin 3x) = \frac{1}{3D - 13}(6\sin 3x) = \frac{3D + 13}{9D^2 - 169}(6\sin 3x) = \frac{3D+13}{9(-9)-169}(6\sin 3x) = -\frac{3}{125}(9\cos 3x + 13\sin 3x) $$

### Teorem 4 · Rezonans türev kuralı

Eğer \(D=a\) koyduğunuzda payda sıfır oluyorsa (\(\phi(a)=0\)), bu rezonans demektir. Kural basittir: Paya \(x^p\) çarpanı gelir, paydadaki \(\phi\) operatörünün ise \(p\)-inci türevi alınır:

$$ \frac{1}{\phi(D)}e^{ax} = \frac{1}{(D-a)^p\psi(D)}e^{ax} = \frac{x^p}{p!\,\psi(a)}e^{ax} = \frac{x^p}{\phi^{(p)}(a)}e^{ax},\qquad \phi^{(p)}(a)\neq 0 $$

**Örnek 4.25 ve 4.26.** \((D^2+4D+13)y = e^{-2x}\sin 3x\) denkleminde önce Teorem 2 ile \(e^{-2x}\) sola kaydırılır, ardından Euler formülü \(e^{i3x}\) üzerinden Teorem 4 uygulanır:

$$ \frac{1}{D^2+9}e^{i3x} = \frac{x}{6i}e^{i3x} = -\frac{ix}{6}(\cos 3x + i\sin 3x) = \frac{x}{6}\sin 3x - i\frac{x}{6}\cos 3x \quad\Longrightarrow\quad y_P(x) = -\frac{1}{6}x e^{-2x}\cos 3x $$

---

## 3. Parametrelerin değişimi yöntemi (§4.3.3) · "Her kapıyı açan çilingir"

Sağ tarafta \(\ln x, \tan x, \sec x, \csc x\) gibi fonksiyonlar olduğunda ne türevler sonlu kalır ne de operatör kısayolları çalışır. Bu durumda evrensel yöntem **parametrelerin değişimi** devreye girer.

### Sezgisel türetim mantığı

İkinci mertebe denklemi standart biçimde yazalım (baş katsayıya bölelim):

$$ a_2(x)y'' + a_1(x)y' + a_0(x)y = F(x) \qquad\Longrightarrow\qquad y'' + p_1(x)y' + p_0(x)y = \frac{F(x)}{a_2(x)} $$

Homojen çözüm \(y_C(x) = C_1 y_1(x) + C_2 y_2(x)\) biliniyor olsun. Mantık şudur: *Sabit sayıları (\(C_1, C_2\)) birer fonksiyona (\(c_1(x), c_2(x)\)) dönüştürürsek denklemi sağlar mıyız?*

$$ y(x) = c_1(x)y_1(x) + c_2(x)y_2(x) $$

Türev aldığımızda \(y' = (c_1'y_1 + c_2'y_2) + (c_1 y_1' + c_2 y_2')\) çıkar. İkinci türevde \(c_1'', c_2''\) karmaşasını önlemek için birinci parantezi sıfıra eşitleriz. Denkleme yerleştirince \(c_1', c_2'\) türevleri için \(2\times 2\) cebirsel sistem doğar:

$$ c_1'(x)y_1(x) + c_2'(x)y_2(x) = 0,\qquad c_1'(x)y_1'(x) + c_2'(x)y_2'(x) = \frac{F(x)}{a_2(x)} $$

Temel çözümler \(y_1, y_2\) doğrusal bağımsız olduğundan Wronskian determinantı \(W(y_1,y_2) = y_1 y_2' - y_2 y_1' \neq 0\) olduğundan bu sistem doğrudan çözülür ve integre edilir.

### Örnek 4.27, 4.28 ve 4.29 · Çözümlü örnekler

1. **Örnek 4.27 (\(y''+y=\csc^3 x\)):** Homojen çözüm \(y_1=\cos x, y_2=\sin x\)'tir (\(W=1\)). Sistem:

$$ c_1'\cos x + c_2'\sin x = 0,\qquad -c_1'\sin x + c_2'\cos x = \csc^3 x \quad\Longrightarrow\quad c_1' = -\csc^2 x,\qquad c_2' = \cos x\csc^3 x $$

İntegrasyonla \(c_1(x) = \cot x\) ve \(c_2(x) = -\frac{1}{2}\csc^2 x\) bulunur; birleştirilince \(y_P(x) = -\frac{1}{2}\csc x\) elde edilir.

2. **Örnek 4.28 (\(y''-2y'+y = e^x\ln x,\ x>0\)):** Çift kök \(\lambda=1,1\) için \(y_1=e^x, y_2=xe^x\)'tir. Sistem çözüldüğünde \(c_2' = \ln x\) ve \(c_1' = -x\ln x\) çıkar. Kısmi integrasyonla:

$$ c_1(x) = -\frac{1}{2}x^2\ln x + \frac{1}{4}x^2 + C_1,\qquad c_2(x) = x\ln x - x + C_2 \quad\Longrightarrow\quad y_P(x) = x^2 e^x\left(\frac{1}{2}\ln x - \frac{3}{4}\right) $$

3. **Örnek 4.29 (3. mertebe denklem):** \((D^3-D)y = \frac{e^x}{1+e^x}\) için \(y_1=1, y_2=e^x, y_3=e^{-x}\)'tir. \(3\times 3\) sistem:

$$ c_1' + c_2'e^x + c_3'e^{-x} = 0,\qquad c_2'e^x - c_3'e^{-x} = 0,\qquad c_2'e^x + c_3'e^{-x} = \frac{e^x}{1+e^x} $$

Buradan \(c_1', c_2', c_3'\) çözülüp integre edilerek tam genel çözüm elde edilir.

---

## 4. Deney: Özel çözüm ve rezonans atölyesi

Laboratuvarda dört farklı denklem ailesi üzerinde toplam çözüm \(y(x) = y_C(x) + y_P(x)\) (düz yeşil eğri) ile saf özel çözüm \(y_P(x)\) (kesikli bakır eğri) karşılaştırılır:

| Aile | Model denklemi | Temel mekanizma |
| --- | --- | --- |
| Üstel zorlama (Örnek 4.12) | \((D^2+9)y=3e^{2x}\) | Rezonans yok; \(y_P=\frac{3}{13}e^{2x}\) omurgayı çizer, \(y_C\) etrafında salınır. |
| Polinom rezonansı (Örnek 4.16) | \((D^2+2D)y=4x^2+2x+3\) | \(\lambda=0\) kök olduğu için \(x\) çarpanı dereceyi bir basamak yükseltir (\(x^3\)). |
| Kaydırma + rezonans (Örnek 4.26) | \((D^2+4D+13)y=e^{-2x}\sin 3x\) | Teorem 2 ve 4 ile genlik \(-\frac{1}{6}xe^{-2x}\cos 3x\) şeklinde \(x\) ile büyür. |
| Parametrelerin değişimi (Örnek 4.28) | \((D^2-2D+1)y=e^x\ln x\) | Logaritma zorlaması; çözüm yalnız \(x>0\) bölgesinde geçerlidir. |

> **Atölyede neyi denemelisin?** “Sıfır homojen (\(y=y_P\))” düğmesine bastığında başlangıç koşulları tam olarak \(y_0=y_P(x_0)\) ve \(v_0=y_P'(x_0)\) değerlerine kilitlenir; böylece \(y_C(x)\equiv 0\) olur ve iki eğri üst üste biner. \(y_0\) ve \(v_0\) sürgülerini oynattığında kesikli \(y_P(x)\) eğrisinin **hiç kımıldamadığını**, çünkü başlangıç koşullarının yalnızca serbest sistem (\(y_C\)) tarafından taşındığını gözlemle!

## Kontrol listesi

- \(y_P\) taslağını kurmadan önce karakteristik denklemi çözüp \(y_C\) köklerini ve katlılıklarını (\(p\)) belirledim mi?
- Sağ taraftaki trigonometrik kuvvetleri (\(\cos^3 2x, \sin^2 x\)) açılar toplamı özdeşlikleriyle birinci kuvvete indirgedim mi?
- Sağda tek başına \(\cos\beta x\) varken bile denemeye **hem \(\cos\) hem \(\sin\)** terimini ekledim mi?
- Rezonans durumunda denemeyi \(x^p\) ile çarparak homojen çözümden bağımsız kıldım mı?
- \(D\)-operatörü Teorem 3'te sadece \(D^2\) yerine \(-\beta^2\) yazıp tek dereceli \(D\)'yi korudum mu?
- Parametrelerin değişiminde denklemi baş katsayıya bölerek sağ tarafı standart forma getirdim mi?
