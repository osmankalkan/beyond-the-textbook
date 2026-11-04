# §4.5 · Özet: doğrusal denklemlerde yöntem seçimi ve Euler indirgemesi

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §§4.4–4.5, basılı s.178–187 / PDF s.196–205 (Örnek 4.30–4.31 ve Bölüm 4 Özeti). Bu, özgün Türkçe çalışma ve sentez uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- Bölüm 4’ün bütün doğrusal diferansiyel denklem yöntemlerini **katsayı türü → karakteristik kökler → sağ taraf \(F(x)\) yapısı** sırasıyla tek bir karar ağacında birleştirmeyi.
- Tamamlayıcı çözüm \(y_C(x)\) için ayrık gerçek, hiperbolik (\(\cosh,\sinh\)), karmaşık eşlenik ve \(p\)-katlı köklerin taban fonksiyonlarını hatasız kurmayı.
- Özel çözüm \(y_P(x)\) ararken **Belirsiz Katsayılar (§4.3.1)**, **D-Operatörü Kısayolları (§4.3.2, Teorem 1–4)** ve **Parametrelerin Değişimi (§4.3.3)** arasında en kısa yolu 60 saniyede seçmeyi.
- Değişken katsayılı **Cauchy–Euler (eş-boyutlu) denklemleri (§4.4)** \(x=e^z\) (\(z=\ln x\)) dönüşümü ve \(x^k D^k = \mathcal{D}(\mathcal{D}-1)\cdots(\mathcal{D}-k+1)\) operatör özdeşliğiyle sabit katsayılı denkleme indirgemeyi (Örnek 4.30 ve Örnek 4.31).

## Bölüm 4 Bütünsel Karar Haritası

Bir \(n\). mertebe doğrusal diferansiyel denklem gördüğünde kalemi oynatmadan önce şu dört basamaklı karar haritasını uygula:

| Aşama | Teşhis Sorusu | Yapı / Koşul | Seçilecek En Hızlı Yöntem |
| --- | --- | --- | --- |
| **1. Katsayılar** | Katsayılar sabit mi, değişken mi? | Sabit: \(a_k = c_k\)<br>Eş-boyutlu: \(a_k x^k D^k y\) | Sabitse doğrudan \(\varphi(D)y=F(x)\) yaz.<br>Cauchy–Euler ise \(x=e^z, z=\ln x\) ile sabit katsayıya indirge (§4.4). |
| **2. Homojen Kökler** | \(\varphi(\lambda)=0\) kökleri nasıl? | Ayrık: \(\lambda_1\neq\lambda_2\)<br>Simetrik: \(\lambda=\pm\beta\)<br>Karmaşık: \(\alpha\pm\mathrm{i}\beta\)<br>\(p\)-katlı: \((\lambda-a)^p=0\) | \(e^{\lambda_i x}\)<br>\(\cosh\beta x, \sinh\beta x\)<br>\(e^{\alpha x}(A\cos\beta x+B\sin\beta x)\)<br>\((C_0+C_1 x+\cdots+C_{p-1}x^{p-1})e^{ax}\) |
| **3. Sağ Taraf \(F(x)\)** | \(F(x)\) Tablo 4.1 ailesinde mi? | \(e^{\alpha x}P_k(x)\{\cos\beta x,\sin\beta x\}\)<br>veya bunların toplamı | **Evet:** D-Operatörü (Teorem 1–4) veya Belirsiz Katsayılar.<br>**Hayır** (\(\tan x, \sec x, \ln x, \frac{e^{2x}}{(e^x+1)^2}\)): **Parametrelerin Değişimi** zorunlu! |
| **4. En Hızlı \(y_P\)** | Hangi operatör kuralı işi tek satıra indirir? | Saf üstel \(e^{ax}\) (\(\varphi(a)\neq 0\))<br>Saf üstel \(e^{ax}\) (\(\varphi(a)=0\))<br>Sinüzoidal \(\sin\beta x, \cos\beta x\)<br>Çarpım \(e^{ax}f(x)\) | **Teorem 1:** \(e^{ax}/\varphi(a)\)<br>**Teorem 4:** \(x^p e^{ax}/\varphi^{(p)}(a)\)<br>**Teorem 3:** \(D^2\to -\beta^2\)<br>**Teorem 2:** \(e^{ax}\frac{1}{\varphi(D+a)}f(x)\) |

## 1. Genel çözümün mimarisi ve tamamlayıcı çözüm (\(y_C\)) atlası

Sabit katsayılı \(n\). mertebe doğrusal diferansiyel denklem \(D=\frac{\mathrm{d}}{\mathrm{d}x}\) operatörüyle şu standart biçimde yazılır:

$$ \varphi(D)y = (a_n D^n + a_{n-1}D^{n-1} + \cdots + a_1 D + a_0)y = F(x) $$

Doğrusallık ve süperpozisyon ilkesi (§4.1) gereği genel çözüm her zaman iki parçanın toplamıdır:

$$ y(x) = y_C(x) + y_P(x) $$

Burada **tamamlayıcı çözüm** \(y_C(x)\), homojen \(\varphi(D)y_C = 0\) denklemini çözer ve denklemin mertebesi olan **\(n\) tane keyfi sabitin tamamını** (\(C_1,\dots,C_n\)) içinde barındırır. **Özel çözüm** \(y_P(x)\) ise \(\varphi(D)y_P = F(x)\) eşitliğini sağlayan ve **hiçbir keyfi sabit içermeyen** herhangi bir çözümdür.

### Karakteristik kök atlası (§4.2)

Homojen denklemde \(y=e^{\lambda x}\) denemesi \(\varphi(\lambda)=0\) karakteristik denklemini verir. Köklerin yapısına göre \(y_C(x)\) tabanı dört kuralda toplanır:

1. **Ayrık gerçek kökler (\(\lambda_1 \neq \lambda_2 \neq \cdots\)):** Her basit gerçek kök \(C_i e^{\lambda_i x}\) terimi üretir. Eğer \(\lambda = \pm\beta\) gibi simetrik bir kök çifti varsa, üstel taban yerine \(A\cosh\beta x + B\sinh\beta x\) hiperbolik tabanı sınır değer problemlerinde çok daha temizdir.
2. **Basit karmaşık eşlenik kökler (\(\lambda = \alpha \pm \mathrm{i}\beta\)):** Üstel zarf ve trigonometrik salınım (veya kutupsal genlik-faz) biçiminde yazılır:
   - Kartezyen biçim: \(e^{\alpha x}(A\cos\beta x + B\sin\beta x)\)
   - Kutupsal biçim: \(C e^{\alpha x}\cos(\beta x - \Phi)\)
3. **\(p\)-katlı gerçek kök (\((\lambda - a)^p = 0\)):** Üstel kaydırma \((D-a)^p y = e^{ax}D^p(e^{-ax}y) = 0\) özdeşliği gereği \(p\) tane doğrusal bağımsız çözüm üretir:

$$ y_C(x) = (C_0 + C_1 x + C_2 x^2 + \cdots + C_{p-1} x^{p-1})e^{ax} $$

4. **\(p\)-katlı karmaşık eşlenik kök (\(\lambda = \alpha \pm \mathrm{i}\beta\), katlılık \(p\)):** Hem \(\cos\beta x\) hem \(\sin\beta x\) bileşeni \(p-1\) dereceden polinomlarla çarpılır: \(e^{\alpha x}\sum_{k=0}^{p-1} x^k (A_k\cos\beta x + B_k\sin\beta x)\).

> **Sınav kuralı:** Başlangıç koşulları \(y(x_0)=y_0, y'(x_0)=y_1,\dots\) **asla** tek başına \(y_C(x)\) üzerinde uygulanmaz! Önce \(y_P(x)\) bulunmalı ve koşullar toplam \(y(x) = y_C(x) + y_P(x)\) çözümüne uygulanmalıdır.

## 2. Özel çözüm (\(y_P\)) yöntem seçimi: üç büyük aracın karşılaştırması

Sağ taraf \(F(x) = F_1(x) + F_2(x) + \cdots + F_m(x)\) bir toplam olduğunda, süperpozisyon ilkesiyle her \(F_i(x)\) parçası için **farklı ve en uygun** yöntem seçilebilir.

| Yöntem | Ne zaman uygulanabilir? | En güçlü olduğu durum | En zayıf / tehlikeli olduğu durum |
| --- | --- | --- | --- |
| **Belirsiz Katsayılar (§4.3.1)** | Sabit katsayı + \(F(x)=e^{\alpha x}P_k(x)\{\cos\beta x,\sin\beta x\}\) | Düşük dereceli polinomlar (\(k\le 1\)) ve rezonanssız basit toplamlar | \(x^p\) rezonans çarpanı geldiğinde yüksek türevlerin çarpım kuralı açılımı çok uzar |
| **D-Operatörü Kısayolları (§4.3.2)** | Sabit katsayı + üstel, polinom, sinüzoidal ve bunların çarpımları | Saf üstel (Teorem 1 & 4), saf sinüzoidal (Teorem 3) ve \(e^{ax}P_k(x)\) çarpımları (Teorem 2) | Paydada kalan \((D-a)\) çarpanlarını rasyonelleştirirken işaret hatası yapmak |
| **Parametrelerin Değişimi (§4.3.3)** | **Her zaman!** (Değişken katsayılar ve Tablo 4.1 dışı tüm \(F(x)\) fonksiyonları dahil) | \(F(x) = \tan x, \sec x, \ln x, e^{2x}/(e^x+1)^2\) gibi sonlu türev ailesi olmayan zorlamalar | \(n\ge 3\) mertebede Wronski determinantları ve kısmi integraller yüksek işlem yükü getirir |

### Belirsiz katsayılar ve \(x^p\) rezonans kuralı (Tablo 4.1)

Eğer \(F(x) = e^{\alpha x}[P_k(x)\cos\beta x + Q_k(x)\sin\beta x]\) biçimindeyse, üretici karmaşık sayı \(\sigma = \alpha + \mathrm{i}\beta\) (gerçek durumda \(\beta=0 \implies \sigma=\alpha\)) kontrol edilir:
- \(\sigma\) karakteristik denklemin kökü **değilse** (\(p=0\)), standart deneme biçimi yazılır.
- \(\sigma\) karakteristik denklemin **\(p\) katlı kökü ise**, standart deneme çözümünün tamamı **\(x^p\)** ile çarpılır:

$$ y_P(x) = x^p e^{\alpha x}\bigl[(A_k x^k + \cdots + A_0)\cos\beta x + (B_k x^k + \cdots + B_0)\sin\beta x\bigr] $$

## 3. Beş araçlı D-operatörü oyun kitabı (§4.3.2)

Ters operatör \(y_P = \frac{1}{\varphi(D)}F(x)\) gösterimi, doğrusal denklemleri cebirsel kesirler gibi çözmemizi sağlar. Beş temel kural şunlardır:

1. **Polinomlar için 1/φ(D) seri açılımı:** \(F(x) = P_k(x)\) polinom ise \(\varphi(D)\) en düşük dereceli teriminden başlayarak \((1 + u)^{-1} = 1 - u + u^2 - u^3 + \cdots\) veya \((1 - u)^{-1} = 1 + u + u^2 + u^3 + \cdots\) geometrik serisine açılır. \(D^{k+1}(P_k(x)) = 0\) olduğu için seri \(D^k\) teriminde kesin olarak biter!
2. **Teorem 1 (Saf üstel zorlama — rezonanssız):** Eğer \(\varphi(a) \neq 0\) ise \(D\) yerine doğrudan \(a\) sayısı konur:

$$ \frac{1}{\varphi(D)}e^{ax} = \frac{e^{ax}}{\varphi(a)}, \qquad \varphi(a) \neq 0 $$

3. **Teorem 2 (Üstel kaydırma teoremi):** Sağ taraf \(e^{ax}f(x)\) çarpımı olduğunda, \(e^{ax}\) üsteli ters operatörün soluna çekilir ve içerideki her \(D\) yerine \(D+a\) yazılır:

$$ \frac{1}{\varphi(D)}\bigl[e^{ax}f(x)\bigr] = e^{ax}\frac{1}{\varphi(D+a)}f(x) $$

4. **Teorem 3 (Sinüzoidal zorlama \(D^2 \to -\beta^2\)):** \(D^2(\sin\beta x) = -\beta^2\sin\beta x\) ve \(D^2(\cos\beta x) = -\beta^2\cos\beta x\) olduğundan, operatör \(\varphi(D) = \varphi_1(D^2) + D\varphi_2(D^2)\) olarak çift ve tek kuvvetlere ayrılır ve **yalnızca \(D^2\) yerine \(-\beta^2\)** konur:

$$ \frac{1}{\varphi_1(D^2) + D\varphi_2(D^2)}\sin\beta x = \frac{1}{\varphi_1(-\beta^2) + D\varphi_2(-\beta^2)}\sin\beta x $$

Paydada kalan \(a + bD\) ifadesi \((a - bD)\) eşleniğiyle çarpılarak \(a^2 - b^2 D^2 \to a^2 + b^2\beta^2\) sabitine dönüştürülür.

5. **Teorem 4 (Sıfır payda / rezonans türev kuralı):** Saf üstel \(e^{ax}\) zorlamasında \(a\) sayısı \(\varphi(\lambda)=0\) polinomunun \(p\)-katlı kökü ise (\(\varphi(a)=\varphi'(a)=\cdots=\varphi^{(p-1)}(a)=0\) ve \(\varphi^{(p)}(a)\neq 0\)), paydadaki \(\varphi(D)\) polinomunun \(p\). türevi alınır:

$$ \frac{1}{\varphi(D)}e^{ax} = \frac{x^p e^{ax}}{\varphi^{(p)}(a)}, \qquad \varphi(a)=\cdots=\varphi^{(p-1)}(a)=0,\ \varphi^{(p)}(a)\neq 0 $$

## 4. Parametrelerin değişimi (§4.3.3) özet şablonu

Sağ taraf \(F(x)\) Tablo 4.1 dışında olduğunda (örneğin \(\frac{e^{2x}}{(e^x+1)^2}\), \(\sec x\), \(\ln x\)) veya katsayılar değişken olduğunda, bilinen homojen taban \(y_C(x) = C_1 y_1(x) + \cdots + C_n y_n(x)\) içindeki sabitler \(c_i(x)\) fonksiyonlarına dönüştürülür: \(y_P(x) = c_1(x)y_1(x) + \cdots + c_n(x)y_n(x)\).

İkinci mertebe standart \(a_2(x)y'' + a_1(x)y' + a_0(x)y = F(x)\) denklemi için \(c_1'(x)\) ve \(c_2'(x)\) türevlerini veren 2×2 Wronski sistemi:

$$ c_1'(x)y_1(x) + c_2'(x)y_2(x) = 0,\qquad c_1'(x)y_1'(x) + c_2'(x)y_2'(x) = \frac{F(x)}{a_2(x)} $$

> **Kritik uyarı:** Denklemin baş katsayısı \(a_2(x) \neq 1\) ise sağ taraftaki \(F(x)\) terimini \(a_2(x)\) baş katsayısına bölmeyi asla unutma!

## 5. Cauchy–Euler (eş-boyutlu) doğrusal denklemler (§4.4)

Değişken katsayılı doğrusal diferansiyel denklemler genel olarak kapalı formda çözülemez. Ancak mühendislikte (küresel/silindirik simetrili elastisite, ısı iletimi ve potansiyel teorisinde) çok sık karşılaşılan **Cauchy–Euler denklemi** (veya **eş-boyutlu denklem**), tek bir değişken dönüşümüyle sabit katsayılı denkleme indirgenebilir:

$$ (a_n x^n D^n + a_{n-1}x^{n-1}D^{n-1} + \cdots + a_1 x D + a_0)y = f(x) $$

Burada \(a_n, a_{n-1}, \dots, a_0\) sabit sayılardır ve her terimde **\(x\)’in kuvveti ile \(D^k = \frac{\mathrm{d}^k}{\mathrm{d}x^k}\) türevinin mertebesi birbirine eşittir**.

### \(x = e^z\) (\(z = \ln x\)) dönüşümü ve operatör özdeşliği

\(x > 0\) bölgesi için bağımsız değişken dönüşümü olarak

$$ x = e^z \quad \Longleftrightarrow \quad z = \ln x, \qquad \mathcal{D} = \frac{\mathrm{d}}{\mathrm{d}z} $$

tanımlanır. Zincir kuralı ile her \(x^k D^k\) türev terimi \(\mathcal{D}\) cinsinden bir polinoma çevrilir:
- Birinci türev:

$$ Dy = \frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y}{\mathrm{d}z}\frac{\mathrm{d}z}{\mathrm{d}x} = \frac{1}{x}\mathcal{D}y \quad \Longrightarrow \quad xDy = \mathcal{D}y $$

- İkinci türev:

$$ D^2 y = \frac{\mathrm{d}}{\mathrm{d}x}\left(e^{-z}\mathcal{D}y\right) = \frac{\mathrm{d}}{\mathrm{d}z}\left(e^{-z}\mathcal{D}y\right)\frac{\mathrm{d}z}{\mathrm{d}x} = e^{-2z}(\mathcal{D}^2 - \mathcal{D})y \quad \Longrightarrow \quad x^2 D^2 y = \mathcal{D}(\mathcal{D}-1)y $$

- Tümevarımla herhangi bir \(k\). mertebe için **temel Cauchy–Euler operatör özdeşliği**:

$$ x^k D^k = \mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2)\cdots(\mathcal{D}-k+1) $$

Bu özdeşlik denkleme yerleştirildiğinde sol taraf tamamen **\(z\) değişkenine göre sabit katsayılı** bir \(\tilde{\varphi}(\mathcal{D})y = f(e^z)\) denklemine dönüşür!

| Cauchy–Euler Terimi (\(x\) uzayı) | Dönüştürülmüş Operatör (\(z = \ln x\) uzayı) | Açık Polinom Biçimi |
| --- | --- | --- |
| \(xDy = x y'\) | \(\mathcal{D}y\) | \(\mathcal{D}y\) |
| \(x^2 D^2 y = x^2 y''\) | \(\mathcal{D}(\mathcal{D}-1)y\) | \((\mathcal{D}^2 - \mathcal{D})y\) |
| \(x^3 D^3 y = x^3 y'''\) | \(\mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2)y\) | \((\mathcal{D}^3 - 3\mathcal{D}^2 + 2\mathcal{D})y\) |
| \(x^4 D^4 y = x^4 y^{(4)}\) | \(\mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2)(\mathcal{D}-3)y\) | \((\mathcal{D}^4 - 6\mathcal{D}^3 + 11\mathcal{D}^2 - 6\mathcal{D})y\) |

### Çözümlü Örnek 4.30 (İkinci mertebe Cauchy–Euler ve üstel kaydırma)

**Problem:** \((x^2 D^2 - 2xD + 2)y = x(\ln x)^3\) diferansiyel denkleminin genel çözümünü bulunuz.

**Çözüm:**
1. **Sabit katsayıya indirgeme:** \(x = e^z\) (\(z = \ln x\)) ve \(\mathcal{D} = \frac{\mathrm{d}}{\mathrm{d}z}\) dönüşümüyle \(x^2 D^2 = \mathcal{D}(\mathcal{D}-1)\) ve \(xD = \mathcal{D}\) yazılır. Sağ taraf \(x(\ln x)^3 = z^3 e^z\) olur:

$$ \bigl[\mathcal{D}(\mathcal{D}-1) - 2\mathcal{D} + 2\bigr]y = (\mathcal{D}^2 - 3\mathcal{D} + 2)y = z^3 e^z $$

2. **Tamamlayıcı çözüm \(y_C\):** Karakteristik denklem \(\lambda^2 - 3\lambda + 2 = (\lambda-1)(\lambda-2) = 0\) olduğundan kökler \(\lambda_1=1, \lambda_2=2\)’dir:
   \(y_C(z) = C_1 e^z + C_2 e^{2z}\).
3. **Özel çözüm \(y_P\) (Teorem 2 ve seri açılımı):** Sağ taraftaki \(e^z\) üsteli \(\lambda_1=1\) köküyle rezonanstadır. Teorem 2 ile \(e^z\) sola çekilir ve \(\mathcal{D} \to \mathcal{D}+1\) kaydırılır:

$$ y_P(z) = \frac{1}{(\mathcal{D}-1)(\mathcal{D}-2)}(z^3 e^z) = e^z \frac{1}{\mathcal{D}(\mathcal{D}-1)}z^3 = -e^z \frac{1}{\mathcal{D}}\bigl(1 + \mathcal{D} + \mathcal{D}^2 + \mathcal{D}^3 + \cdots\bigr)z^3 $$

   \(z^3\) üzerindeki türevler alınıp \(\frac{1}{\mathcal{D}}\) ile bir kez integre edildiğinde:
   \((1+\mathcal{D}+\mathcal{D}^2+\mathcal{D}^3)z^3 = z^3 + 3z^2 + 6z + 6 \implies y_P(z) = -e^z\left(\frac{1}{4}z^4 + z^3 + 3z^2 + 6z\right)\) (sabit terim \(C_1 e^z\) içine katılır).
4. **\(x\) değişkenine geri dönüş:** \(e^z = x\) ve \(z = \ln x\) yerine konur:

$$ y(x) = C_1 x + C_2 x^2 - x\left[\frac{1}{4}(\ln x)^4 + (\ln x)^3 + 3(\ln x)^2 + 6\ln x\right] $$

### Çözümlü Örnek 4.31 (Üçüncü mertebe Cauchy–Euler ve katlı kök)

**Problem:** \((x^3 D^3 + xD - 1)y = 4x^5\) diferansiyel denkleminin genel çözümünü bulunuz.

**Çözüm:**
1. **Sabit katsayıya indirgeme:** \(x = e^z\) (\(z = \ln x\)) ile \(x^3 D^3 = \mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2) = \mathcal{D}^3 - 3\mathcal{D}^2 + 2\mathcal{D}\) ve \(xD = \mathcal{D}\) konur; sağ taraf \(4x^5 = 4e^{5z}\) olur:

$$ (\mathcal{D}^3 - 3\mathcal{D}^2 + 2\mathcal{D} + \mathcal{D} - 1)y = (\mathcal{D}^3 - 3\mathcal{D}^2 + 3\mathcal{D} - 1)y = (\mathcal{D}-1)^3 y = 4e^{5z} $$

2. **Tamamlayıcı çözüm \(y_C\):** Karakteristik denklem \((\lambda-1)^3 = 0\) olduğundan \(\lambda=1\) üç katlı köktür (\(p=3\)):
   \(y_C(z) = (C_0 + C_1 z + C_2 z^2)e^z\).
3. **Özel çözüm \(y_P\) (Teorem 1):** \(a=5\) için \(\varphi(5) = (5-1)^3 = 64 \neq 0\) olduğundan Teorem 1 doğrudan uygulanır:
   \(y_P(z) = \frac{1}{(\mathcal{D}-1)^3}4e^{5z} = \frac{4}{(5-1)^3}e^{5z} = \frac{1}{16}e^{5z}\).
4. **\(x\) değişkenine geri dönüş:** \(e^z = x\), \(e^{5z} = x^5\) ve \(z = \ln x\) yerine konur:

$$ y(x) = \bigl[C_0 + C_1\ln x + C_2(\ln x)^2\bigr]x + \frac{1}{16}x^5 $$

## 6. Etkileşimli teşhis simülatörü rehberi

Aşağıdaki atölyede Bölüm 4’ün 10 temel yöntemini temsil eden 10 teşhis kartı yer alır:
- **Teşhis Meydan Okuması sekmesi:** Her karttaki denklemin mertebesini, katsayı yapısını ve sağ tarafını inceleyip 10 yöntem arasından **en hızlı ve doğru** olanı seç. Simülatör ilk hamleni, indirgenmiş biçimi ve sınav tuzağını anında gösterir.
- **Karar Matrisi sekmesi:** Yöntemleri *Homojen Kökler (§4.2)*, *D-Operatörü Kısayolları (§4.3.2)* ve *Genel / Cauchy–Euler (§4.3.1, §4.3.3, §4.4)* kategorilerine göre filtreleyerek kanonik formüllerini karşılaştır.

## Sınav kontrol listesi

- Denklem sabit katsayılı mı, yoksa \(a_k x^k D^k y\) Cauchy–Euler yapısında mı? (Cauchy–Euler ise önce \(x=e^z\) ile sabit katsayıya indim mi?)
- \(x^2 D^2 = \mathcal{D}(\mathcal{D}-1)\) ve \(x^3 D^3 = \mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2)\) dönüşümlerinde düşen faktöriyel terimlerini eksiksiz açtım mı?
- Karakteristik köklerin katlılığını (\(p\)) doğru saydım mı; \(y_C(x)\) içindeki sabit sayısı mertebe \(n\)’ye eşit mi?
- Sağ taraf \(F(x)\) ile homojen çözüm \(y_C(x)\) arasında rezonans (çakışma) olup olmadığını kontrol ettim mi?
- Sinüzoidal Teorem 3’te yalnızca \(D^2 \to -\beta^2\) koyup birinci derece \(D\)’yi eşlenikle çarparak yok ettim mi?
- Parametrelerin Değişiminde denklemi baş katsayı \(a_n(x)\)’e bölerek standart biçime getirdim mi?
- Başlangıç koşullarını yalnız \(y_C\)’ye değil, \(y = y_C + y_P\) toplam çözümüne uyguladım mı?
