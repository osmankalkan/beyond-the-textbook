# §4.2 · Homojen çözümler ve karakteristik denklem

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §4.2, basılı s.143–152 / PDF s.161–170. Örnek 4.2–4.11. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- Sabit katsayılı homojen doğrusal bir diferansiyel denklemi \(y=e^{\lambda x}\) denemesiyle \(\phi(\lambda)=0\) cebirsel karakteristik denklemine indirgemeyi.
- Farklı gerçek köklerin ürettiği üstel çözümleri kurmayı ve simetrik \(\lambda=\pm\beta\) kök çiftlerini hiperbolik fonksiyonlarla (\(\cosh\beta x,\sinh\beta x\)) yazmayı.
- Karmaşık eşlenik kökleri \(\lambda=\alpha\pm i\beta\) Euler formülüyle tamamen gerçek değerli \(e^{\alpha x}(A\cos\beta x+B\sin\beta x)\) çözümlerine dönüştürmeyi.
- Kutupsal gösterim, De Moivre teoremi ve yarım açı formülleriyle karmaşık sayıların \(n\)-inci köklerini bulmayı.
- \(p\)-katlı gerçek veya karmaşık köklerde \(y=v(x)e^{ax}\) mertebe indirgeme dönüşümüyle neden \(D^p v=0\) çıktığını kanıtlamayı ve \(x,x^2,\dots,x^{p-1}\) çarpanlarını eksiksiz kurmayı.

## Karar haritası

Sabit katsayılı homojen \(\phi(D)y=0\) denklemini çözerken ilk adım \(D\) yerine \(\lambda\) yazarak \(\phi(\lambda)=0\) karakteristik polinomunun \(n\) kökünü bulmaktır. Her kök ailesi genel çözüme kendi bağımsız terimlerini katar:

| Karakteristik kök ailesi | Köklerin biçimi | Genel çözüme katkısı | Sabit sayısı |
| --- | --- | --- | --- |
| Farklı gerçek kökler | \(\lambda_1,\lambda_2,\dots,\lambda_k\) (hepsi farklı) | \(C_1e^{\lambda_1 x}+C_2e^{\lambda_2 x}+\cdots+C_ke^{\lambda_k x}\) | \(k\) |
| Simetrik gerçek kök çifti | \(\lambda=\pm\beta\) (\(\beta>0\)) | \(C_1e^{\beta x}+C_2e^{-\beta x}\) veya \(A\cosh\beta x+B\sinh\beta x\) | \(2\) |
| Basit karmaşık eşlenik çift | \(\lambda=\alpha\pm i\beta\) (\(\beta>0\)) | \(e^{\alpha x}\left(A\cos\beta x+B\sin\beta x\right)\) | \(2\) |
| \(p\)-katlı gerçek kök | \(\lambda=a,a,\dots,a\) (\(p\) kez) | \(\left(C_0+C_1x+C_2x^2+\cdots+C_{p-1}x^{p-1}\right)e^{ax}\) | \(p\) |
| \(p\)-katlı sıfır kök | \(\lambda=0,0,\dots,0\) (\(p\) kez) | \(C_0+C_1x+C_2x^2+\cdots+C_{p-1}x^{p-1}\) | \(p\) |
| \(p\)-katlı karmaşık eşlenik çift | \(\lambda=\alpha\pm i\beta\) (\(p\) kez) | \(e^{\alpha x}\left[\left(A_0+\cdots+A_{p-1}x^{p-1}\right)\cos\beta x+\left(B_0+\cdots+B_{p-1}x^{p-1}\right)\sin\beta x\right]\) | \(2p\) |

> **Temel denetim.** \(n\)-inci mertebe bir homojen denklemin karakteristik polinomu cebirin temel teoremi gereği (katlılıklarıyla birlikte) tam \(n\) köke sahiptir ve tamamlayıcı çözüm \(y_C(x)\) tam \(n\) doğrusal bağımsız fonksiyon ile \(n\) keyfi sabit içermek zorundadır.

## 1. Karakteristik denklemin türetilmesi ve farklı gerçek kökler

Sabit katsayılı \(n\)-inci mertebe homojen doğrusal diferansiyel denklemi ele alalım:

$$ \phi(D)y=\left(a_nD^n+a_{n-1}D^{n-1}+\cdots+a_1D+a_0\right)y=0 $$

Burada \(a_0,a_1,\dots,a_n\) gerçek sabitlerdir ve \(a_n\neq0\)'dır. Birinci mertebe \(y'-ay=0\) denkleminin çözümü \(y=Ce^{ax}\) olduğundan, yüksek mertebede de türevi kendisiyle orantılı olan üstel deneme fonksiyonunu seçeriz:

$$ y=e^{\lambda x},\qquad D^k\left(e^{\lambda x}\right)=\lambda^k e^{\lambda x} $$

Bu türevleri denklemde yerine koyduğumuzda her \(D^k\) operatörü \(\lambda^k\) cebirsel kuvvetine dönüşür:

$$ \phi(D)e^{\lambda x}=\left(a_n\lambda^n+a_{n-1}\lambda^{n-1}+\cdots+a_1\lambda+a_0\right)e^{\lambda x}=\phi(\lambda)e^{\lambda x}=0 $$

Üstel fonksiyon \(e^{\lambda x}\) hiçbir gerçek veya karmaşık \(x\) için sıfır olamayacağından (\(e^{\lambda x}\neq0\)), bu eşitliğin sağlanması için parantez içindeki polinom sıfır olmalıdır:

$$ \phi(\lambda)=a_n\lambda^n+a_{n-1}\lambda^{n-1}+\cdots+a_1\lambda+a_0=0 $$

Bu cebirsel denkleme **karakteristik denklem**, \(\phi(\lambda)\) polinomuna ise **karakteristik polinom** denir. Eğer \(\lambda_1,\lambda_2,\dots,\lambda_n\) köklerinin tamamı birbirinden farklıysa, \(e^{\lambda_1 x},e^{\lambda_2 x},\dots,e^{\lambda_n x}\) fonksiyonları doğrusal bağımsızdır ve süperpozisyon ilkesiyle genel çözüm doğrudan kurulur:

$$ y(x)=C_1e^{\lambda_1 x}+C_2e^{\lambda_2 x}+\cdots+C_ne^{\lambda_n x} $$

## 2. Hiperbolik fonksiyonlar ve Örnek 4.2 – 4.3

Mühendislik problemlerinde karakteristik kökler sıklıkla simetrik \(\lambda=\pm\beta\) çiftleri halinde çıkar. Bu durumda \(e^{\beta x}\) ve \(e^{-\beta x}\) üstel fonksiyonlarının simetrik ve antisimetrik doğrusal birleşimleri olan **hiperbolik fonksiyonlar** kullanılır:

$$ \sinh x=\frac{e^x-e^{-x}}{2},\qquad \cosh x=\frac{e^x+e^{-x}}{2},\qquad \tanh x=\frac{\sinh x}{\cosh x}=\frac{e^x-e^{-x}}{e^x+e^{-x}} $$

Tanımlardan doğrudan görüldüğü üzere \(\cosh x\) çift, \(\sinh x\) tek fonksiyondur ve \(x=0\) noktasındaki değerleri başlangıç koşulu hesaplarını büyük ölçüde sadeleştirir:

$$ \cosh 0=1,\qquad \sinh 0=0,\qquad \cosh(-x)=\cosh x,\qquad \sinh(-x)=-\sinh x $$

Trigonometrik fonksiyonlardan farklı olarak hiperbolik kareler farkı \(1\)'e eşittir ve türevlerde eksi işareti oluşmaz:

$$ \cosh^2 x-\sinh^2 x=1,\qquad \frac{d}{dx}\sinh x=\cosh x,\qquad \frac{d}{dx}\cosh x=\sinh x $$

Böylece \(\lambda=\pm\beta\) kök çifti için üstel ve hiperbolik yazılışlar birbirine tamamen eşdeğerdir:

$$ C_1e^{\beta x}+C_2e^{-\beta x}=A\cosh\beta x+B\sinh\beta x,\qquad A=C_1+C_2,\quad B=C_1-C_2 $$

### Örnek 4.2 · Bikuadratik karakteristik denklem ve hiperbolik biçim

\(\left(D^4-13D^2+36\right)y=0\) denkleminin genel çözümünü bulalım. Karakteristik denklem \(\lambda^2\) cinsinden çarpanlara ayrılır:

$$ \lambda^4-13\lambda^2+36=\left(\lambda^2-4\right)\left(\lambda^2-9\right)=0\quad\Longrightarrow\quad \lambda=\pm 2,\ \pm 3 $$

Dört farklı gerçek kök \(\lambda_1=2,\lambda_2=-2,\lambda_3=3,\lambda_4=-3\) olduğundan üstel genel çözüm:

$$ y(x)=C_1e^{2x}+C_2e^{-2x}+C_3e^{3x}+C_4e^{-3x} $$

Her simetrik \(\pm\beta\) çiftini hiperbolik tabanda birleştirirsek eşdeğer genel çözümü elde ederiz:

$$ y(x)=A_1\cosh 2x+B_1\sinh 2x+A_2\cosh 3x+B_2\sinh 3x $$

### Örnek 4.3 · Üçüncü derece karakteristik polinomun çarpanlara ayrılması

\(\left(D^3+4D^2+D-6\right)y=0\) denklemini çözelim. Karakteristik denklem:

$$ \lambda^3+4\lambda^2+\lambda-6=0 $$

Sabit terim \(-6\)'nın tam sayı bölenleri \(\pm 1,\pm 2,\pm 3,\pm 6\) arasından \(\lambda=1\) denendiğinde \(1+4+1-6=0\) sağlanır. Polinomu \((\lambda-1)\)'e böldüğümüzde:

$$ \left(\lambda-1\right)\left(\lambda^2+5\lambda+6\right)=\left(\lambda-1\right)\left(\lambda+2\right)\left(\lambda+3\right)=0\quad\Longrightarrow\quad \lambda=1,-2,-3 $$

Üç farklı gerçek kökten genel çözüm yazılır:

$$ y(x)=C_1e^x+C_2e^{-2x}+C_3e^{-3x} $$

## 3. Karmaşık eşlenik kökler ve Örnek 4.4 – 4.5

Gerçek katsayılı \(\phi(\lambda)=0\) denkleminde karmaşık kökler her zaman eşlenik çiftler olarak ortaya çıkar: \(\lambda_1=\alpha+i\beta\) ve \(\lambda_2=\alpha-i\beta\) (\(\beta>0\)). Bu iki köke karşılık gelen çözüm parçası:

$$ y(x)=C_1e^{(\alpha+i\beta)x}+C_2e^{(\alpha-i\beta)x}=e^{\alpha x}\left(C_1e^{i\beta x}+C_2e^{-i\beta x}\right) $$

Euler formülü \(e^{\pm i\beta x}=\cos\beta x\pm i\sin\beta x\) yerine konup terimler \(\cos\beta x\) ve \(\sin\beta x\) parantezinde toplandığında:

$$ y(x)=e^{\alpha x}\left[\left(C_1+C_2\right)\cos\beta x+i\left(C_1-C_2\right)\sin\beta x\right]=e^{\alpha x}\left(A\cos\beta x+B\sin\beta x\right) $$

Burada \(A=C_1+C_2\) ve \(B=i(C_1-C_2)\) yeni keyfi sabitlerdir. Fiziksel çözüm \(y(x)\)'in gerçek değerli olması için \(C_2=C_1^*\) (karmaşık eşlenik) seçilir; gerçekten \(C_1=c_R+ic_I\) ve \(C_2=c_R-ic_I\) yazılırsa \(A=2c_R\) ve \(B=-2c_I\) tamamen gerçek sayılar olur. Ayrıca iki terim faz-genlik biçiminde tek bir kosinüs dalgası olarak da birleştirilebilir:

$$ y(x)=Ce^{\alpha x}\cos\left(\beta x-\theta_0\right),\qquad C=\sqrt{A^2+B^2},\qquad \tan\theta_0=\frac{B}{A} $$

> **Fiziksel okuma.** Gerçek kısım \(\alpha\), üstel zarf \(e^{\alpha x}\)'i kontrol eder: \(\alpha<0\) ise salınım sıfıra sönümlenir, \(\alpha=0\) ise sabit genlikli harmonik hareket oluşur, \(\alpha>0\) ise salınım genliği üstel olarak büyür. Sanal kısım \(\beta\) ise açısal frekansı ve sıfır geçiş aralığını (\(\pi/\beta\)) belirler.

### Örnek 4.4 · Sönümlü salınım ve Euler indirgemesi

\(\left(D^2+2D+3\right)y=0\) denklemini çözelim. Karakteristik denklemi tam kareye tamamlayalım:

$$ \lambda^2+2\lambda+3=\left(\lambda+1\right)^2+2=0\quad\Longrightarrow\quad \lambda=-1\pm i\sqrt{2} $$

Burada \(\alpha=-1\) ve \(\beta=\sqrt{2}\) olduğundan genel çözüm doğrudan yazılır:

$$ y(x)=e^{-x}\left(A\cos\sqrt{2}\,x+B\sin\sqrt{2}\,x\right) $$

### Örnek 4.5 · Gerçek kök ile saf sanal eşlenik çiftin birleşimi

\(\left(D^3+2D^2+9D+18\right)y=0\) denklemini çözelim. Karakteristik polinomu gruplandırarak çarpanlara ayıralım:

$$ \lambda^3+2\lambda^2+9\lambda+18=\lambda^2(\lambda+2)+9(\lambda+2)=(\lambda+2)\left(\lambda^2+9\right)=0 $$

Kökler \(\lambda_1=-2\) ve \(\lambda_{2,3}=\pm 3i\) (\(\alpha=0,\beta=3\)) olur. \(e^{0x}=1\) olduğundan genel çözüm:

$$ y(x)=C_1e^{-2x}+A\cos 3x+B\sin 3x $$

## 4. Karmaşık sayıların n-inci kökleri ve Örnek 4.6 – 4.7

Yüksek mertebeli karakteristik denklemlerde \(\lambda^n=z_0\) veya \(\lambda^2=a+ib\) gibi ara denklemler çıkar. Sıfırdan farklı bir \(z=x+iy\) karmaşık sayısını modül \(r=\sqrt{x^2+y^2}\) ve argüman \(\theta\) ile kutupsal biçimde yazarız. \(2\pi\) periyodikliği eklendiğinde De Moivre formülü \(n\) farklı kökü verir:

$$ z=r\,e^{i(\theta+2k\pi)}\quad\Longrightarrow\quad z^{1/n}=r^{1/n}\left[\cos\left(\frac{\theta+2k\pi}{n}\right)+i\sin\left(\frac{\theta+2k\pi}{n}\right)\right],\qquad k=0,1,\dots,n-1 $$

Özel olarak bir karmaşık sayının karekökünü (\(n=2\)) alırken \(\cos\theta\) ve \(\sin\theta\) değerlerinden **yarım açı formülleriyle** \(\cos(\theta/2)\) ve \(\sin(\theta/2)\) tam olarak hesaplanır:

$$ \cos\frac{\theta}{2}=\pm\sqrt{\frac{1+\cos\theta}{2}},\qquad \sin\frac{\theta}{2}=\pm\sqrt{\frac{1-\cos\theta}{2}} $$

### Örnek 4.6 · Kutupsal biçimde dördüncü kökler

\(\left(D^4+16\right)y=0\) denklemini çözelim. Karakteristik denklem \(\lambda^4=-16\)'dır. \(-16\) sayısının modülü \(r=16\), esas argümanı \(\theta=\pi\) olduğundan:

$$ \lambda^4=16\,e^{i(\pi+2k\pi)}\quad\Longrightarrow\quad \lambda_k=2\left[\cos\left(\frac{\pi+2k\pi}{4}\right)+i\sin\left(\frac{\pi+2k\pi}{4}\right)\right],\qquad k=0,1,2,3 $$

\(k=0,1,2,3\) için açılar \(\pi/4,3\pi/4,5\pi/4,7\pi/4\) olur ve dört kök iki eşlenik çift oluşturur:

$$ \lambda=\pm\sqrt{2}\pm i\sqrt{2} $$

\(\lambda=\sqrt{2}\pm i\sqrt{2}\) ve \(\lambda=-\sqrt{2}\pm i\sqrt{2}\) çiftlerinden genel çözüm:

$$ y(x)=e^{\sqrt{2}\,x}\left(A_1\cos\sqrt{2}\,x+B_1\sin\sqrt{2}\,x\right)+e^{-\sqrt{2}\,x}\left(A_2\cos\sqrt{2}\,x+B_2\sin\sqrt{2}\,x\right) $$

### Örnek 4.7 · Yarım açı formülleriyle karmaşık karekök

\(\left(D^4-16D^2+100\right)y=0\) denklemini çözelim. Önce \(\lambda^2\) için tam kareye tamamlayalım:

$$ \left(\lambda^2-8\right)^2+36=0\quad\Longrightarrow\quad \lambda^2=8\pm 6i $$

Birinci bölgedeki \(8+6i\) sayısı için \(r=\sqrt{8^2+6^2}=10\), \(\cos\theta=8/10=4/5\) ve \(\sin\theta=6/10=3/5\)'tir. Yarım açı formülleriyle:

$$ \cos\frac{\theta}{2}=\sqrt{\frac{1+4/5}{2}}=\frac{3}{\sqrt{10}},\qquad \sin\frac{\theta}{2}=\sqrt{\frac{1-4/5}{2}}=\frac{1}{\sqrt{10}} $$

Buradan \(\sqrt{8+6i}=\pm\sqrt{10}\,(3/\sqrt{10}+i/\sqrt{10})=\pm(3+i)\) ve eşleniğinden dört kökün tamamı çıkar:

$$ \lambda=\pm 3\pm i $$

\(\lambda=3\pm i\) ve \(\lambda=-3\pm i\) eşlenik çiftlerinden dördüncü mertebe genel çözüm:

$$ y(x)=e^{3x}\left(A_1\cos x+B_1\sin x\right)+e^{-3x}\left(A_2\cos x+B_2\sin x\right) $$

## 5. Katlı kökler (Repeated roots) ve Örnek 4.8 – 4.11

Karakteristik denklem \(\phi(\lambda)=0\) içinde \(\lambda=a\) kökü \(p\) kez tekrarlanıyorsa (\((\lambda-a)^p\) çarpanı varsa), \(e^{ax}\) tek başına yalnız bir çözüm üretir; oysa \(p\) katlı çarpan için \(p\) doğrusal bağımsız çözüme ihtiyaç vardır. Eksik çözümleri bulmak için **mertebe indirgeme** dönüşümü \(y(x)=v(x)e^{ax}\) uygulanır.

### Örnek 4.8 · Çift katlı kök için mertebe indirgeme

\(\left(D^2-4D+4\right)y=(D-2)^2y=0\) denkleminde \(\lambda=2,2\) çift katlı köktür. \(y=v(x)e^{2x}\) dönüşümüyle birinci ve ikinci türevleri alalım:

$$ Dy=\left(v'+2v\right)e^{2x},\qquad D^2y=\left(v''+4v'+4v\right)e^{2x} $$

Denklemde yerine koyduğumuzda \(v\) ve \(v'\) terimleri birbirini sıfırlar:

$$ \left(D^2-4D+4\right)\left(ve^{2x}\right)=\left[\left(v''+4v'+4v\right)-4\left(v'+2v\right)+4v\right]e^{2x}=v''e^{2x}=0 $$

\(e^{2x}\neq0\) olduğundan denklem \(D^2v=v''=0\) biçimine indirgenir. İki kez entegre edildiğinde \(v(x)=C_0+C_1x\) bulunur ve genel çözüm:

$$ y(x)=\left(C_0+C_1x\right)e^{2x} $$

### Genel p-katlı kök kuralı

Aynı çarpım kuralı tümevarımla uygulandığında her \(p\ge 1\) tam sayısı için **üstel kaydırma özdeşliği** elde edilir:

$$ (D-a)^p\left[v(x)e^{ax}\right]=e^{ax}D^pv(x)=0\quad\Longrightarrow\quad D^pv(x)=0 $$

\(D^pv=0\) denklemi \(p\) kez entegre edildiğinde \(p-1\) dereceli genel polinom çıkar; böylece \(p\)-katlı gerçek \(\lambda=a\) kökü şu çözümü üretir:

$$ y(x)=\left(C_0+C_1x+C_2x^2+\cdots+C_{p-1}x^{p-1}\right)e^{ax} $$

Eğer karmaşık eşlenik çift \(\lambda=\alpha\pm i\beta\) \(p\) katlıysa, aynı kural her iki eşlenik köke uygulanıp Euler formülüyle birleştirildiğinde hem \(\cos\beta x\) hem \(\sin\beta x\) önünde \(p-1\) dereceli polinomlar oluşur:

$$ y(x)=e^{\alpha x}\left[\left(A_0+A_1x+\cdots+A_{p-1}x^{p-1}\right)\cos\beta x+\left(B_0+B_1x+\cdots+B_{p-1}x^{p-1}\right)\sin\beta x\right] $$

### Örnek 4.9 – 4.11 · Çok katlı kök örnekleri

- **Örnek 4.9:** \(\left(D^4-5D^2-36\right)y=0\) denkleminde \(\left(\lambda^2-9\right)\left(\lambda^2+4\right)=0\) çarpanlarından \(\lambda=\pm 3\) ve \(\lambda=\pm 2i\) basit kökleri çıkar:

$$ y(x)=C_1e^{3x}+C_2e^{-3x}+A\cos 2x+B\sin 2x $$

- **Örnek 4.10:** \(\left(D^8+18D^6+81D^4\right)y=0\) denkleminde karakteristik denklem \(\lambda^4\left(\lambda^2+9\right)^2=0\) olur. \(\lambda=0\) kökü \(4\) katlı, \(\lambda=\pm 3i\) çifti ise \(2\) katlıdır:

$$ y(x)=C_0+C_1x+C_2x^2+C_3x^3+\left(A_0+A_1x\right)\cos 3x+\left(B_0+B_1x\right)\sin 3x $$

- **Örnek 4.11:** \(\left(D^5-D^4-2D^3+2D^2+D-1\right)y=0\) denkleminde karakteristik polinom gruplandırılırsa \(\left(\lambda-1\right)^3\left(\lambda+1\right)^2=0\) bulunur (\(\lambda=1\) üç katlı, \(\lambda=-1\) iki katlı):

$$ y(x)=\left(C_0+C_1x+C_2x^2\right)e^x+\left(D_0+D_1x\right)e^{-x} $$

## 6. Deney: karakteristik kök ve mod atölyesi

Atölyede dört karakteristik kök ailesinin başlangıç değer problemi (\(y(0)=y_0,\ y'(0)=v_0\)) çözümlerini canlı olarak karşılaştırabilirsin:

| Atölye ailesi | Karakteristik kökler | Çözüm tabanı ve davranış |
| --- | --- | --- |
| \((D^2-3D+2)y=0\) | \(\lambda=1,2\) | \(C_1e^x+C_2e^{2x}\) — iki farklı üstel büyüme modu |
| \((D^2-4)y=0\) | \(\lambda=\pm 2\) | \(A\cosh 2x+B\sinh 2x\) — çift (\(\cosh\)) ve tek (\(\sinh\)) hiperbolik modlar |
| \((D^2+2D+5)y=0\) | \(\lambda=-1\pm 2i\) | \(e^{-x}(A\cos 2x+B\sin 2x)\) — üstel sönüm zarfı içinde salınım |
| \((D^2-4D+4)y=0\) | \(\lambda=2,2\) | \((C_0+C_1x)e^{2x}\) — katlı kökten gelen \(xe^{2x}\) seküler bükülme modu |

> **Atölyede neyi denemelisin?** Her ailede **Koşul A** ve **Koşul B** düğmelerine basarak başlangıç koşullarının modları nasıl ayırdığını gözlemle; inceleme noktası \(x\) kaydırıcısını hareket ettirdiğinde analitik artık \(a_2y''+a_1y'+a_0y\) değerinin her noktada tam sıfır kaldığını doğrula.

## Vizeye hazırlan ve kontrol listesi

- Denklem gerçekten **sabit katsayılı** ve **homojen** mi? Değişken katsayılı denklemlerde \(y=e^{\lambda x}\) karakteristik denklem vermez.
- Karakteristik polinomun derecesi \(n\) ile bulduğun toplam kök ve bağımsız sabit sayısı \(n\) bire bir eşleşiyor mu?
- Simetrik gerçek kökleri \(\lambda=\pm\beta\) (\(\cosh\beta x,\sinh\beta x\)) ile saf sanal kökleri \(\lambda=\pm i\beta\) (\(\cos\beta x,\sin\beta x\)) birbirinden doğru ayırdın mı?
- Karmaşık kök \(\lambda=\alpha\pm i\beta\) yalnızca kendisine ait olan terimleri \(e^{\alpha x}\) ile çarptı mı; başka köklerin üstel çarpanıyla karışmasını önledin mi?
- \(p\)-katlı \(\lambda=0\) kökünde \(C_0+C_1x+\cdots+C_{p-1}x^{p-1}\) polinomunun bütün terimlerini yazdın mı?
- Katlı karmaşık eşlenik kökte hem \(\cos\beta x\) hem de \(\sin\beta x\) çarpanlarının önüne ayrı ayrı \(p-1\) dereceli polinomlar koydun mu?
