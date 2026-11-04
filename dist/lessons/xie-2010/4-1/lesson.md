# §4.1 · Genel doğrusal adi diferansiyel denklemler

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §4.1, basılı s.140–142 / PDF s.158–160. Örnek 4.1. Bu, özgün Türkçe çalışma uyarlamasıdır.

## Bu bölümde ne öğreneceksin

- \(n\)-inci mertebe bir doğrusal denklemi standart biçimde yazmayı ve katsayıların hangi değişkene bağlı olduğunu okumayı.
- Bir denklemin doğrusal olup olmadığını üç testle hızlıca ayırt etmeyi: kuvvet, çarpım ve doğrusal olmayan fonksiyon.
- \(D=d/dx\) operatörünü, lineerliğini ve \(\phi(D)\) polinom operatörünü kurmayı.
- Temel teoremi kanıtlamayı: \(L[u]=F\) ve \(L[v]=0\) ise \(L[u+v]=F\).
- Genel çözümün neden \(y=y_C+y_P\) olduğunu ve \(n\) sabitin nerede yaşadığını.
- Değişken katsayılı operatörlerde \(D\) ile \(x\)'in yer değiştirmediğini görüp bu tuzağa düşmemeyi.

## Karar haritası

Bölümün tamamı tek bir soruyla başlar: **denklem \(y\)'ye göre doğrusal mı?** Cevap evetse operatör diline geçilir; hayırsa bu bölümün araçları doğrudan uygulanmaz.

| Gördüğün biçim | Sorulacak soru | Sonuç |
| --- | --- | --- |
| \(a_n(x)y^{(n)}+\cdots+a_0(x)y=F(x)\) | \(a_n(x)\neq0\) mı? | standart biçim ve geçerli aralık |
| \(y,y',\dots,y^{(n)}\) yalnız birinci kuvvette | katsayılar yalnız \(x\)'e mi bağlı? | doğrusal |
| \(y^2,\ yy',\ (y')^2,\ \sin y,\ e^y\) | böyle bir terim var mı? | doğrusal değil |
| \(\phi(D)y=F(x)\) | \(u\) ve \(v\) çözümleri biliniyor mu? | \(L[u+v]\) süperpozisyonu |
| \(y_C\) ve \(y_P\) hazır | ikisi de aynı \(L\)'ye mi ait? | \(y=y_C+y_P\) |

> **Ortak fikir.** Doğrusallık, türevlerin kendisiyle değil, denklemin \(y\)'ye göre yapısıyla ilgilidir. Katsayıların \(x\)'e bağlı olması doğrusallığı bozmaz; \(y\)'nin kendisiyle çarpılması bozar.

## 1. Doğrusal denklemin tanımı

\(n\)-inci mertebe genel doğrusal denklem şudur:

$$ a_n(x)\frac{d^n y}{dx^n}+a_{n-1}(x)\frac{d^{n-1}y}{dx^{n-1}}+\cdots+a_1(x)\frac{dy}{dx}+a_0(x)y=F(x) $$

Burada \(y\) ve bütün türevleri **birinci kuvvette** görünür. \(a_0(x),a_1(x),\dots,a_n(x)\) katsayıları ve \(F(x)\) sağ tarafı yalnız bağımsız değişkene bağlıdır.

Denklemi standart biçime getirmek için baş katsayıya bölünür:

$$ y^{(n)}+p_{n-1}(x)y^{(n-1)}+\cdots+p_1(x)y'+p_0(x)y=g(x),\qquad a_n(x)\neq0 $$

Baş katsayının sıfır olduğu noktalar denklemin **tekil noktalarıdır**; çözüm aralığı bu noktaları içermez. Katsayılar sabitse denklem **sabit katsayılı**, en az biri \(x\)'e bağlıysa **değişken katsayılı** doğrusal denklemdir.

> **Doğrusallığın anlamı.** \(L[y]\) yazımı, \(y\)'yi bir fonksiyondan başka bir fonksiyona götüren bir işlemdir. Denklem doğrusalsa bu işlem iki kurala uyar: toplamı toplama, sabit çarpanı sabit çarpana götürür. Bu iki kural, bölümün geri kalanındaki bütün süperpozisyon fikrinin kaynağıdır.

## 2. Doğrusallık testi

Bir denklemi operatöre çevirmeden önce üç test uygula:

1. **Kuvvet testi.** \(y\) ve türevleri yalnız birinci kuvvette mi? \((y')^2\), \(y^3\), \(y''y'''\) gibi terimler doğrusallığı bozar.
2. **Çarpım testi.** \(y\) ile kendi türevi veya başka bir \(y\) çarpılıyor mu? \(yy'\), \(y^2\), \(y\,y''\) doğrusal değildir.
3. **Fonksiyon testi.** \(y\)'nin doğrusal olmayan bir fonksiyonu var mı? \(\sin y\), \(e^y\), \(\sqrt{y}\), \(\ln y\) doğrusallığı bozar.

| Denklem | Doğrusal mı? | Gerekçe |
| --- | --- | --- |
| \(x^2y''+(\sin x)y'+e^xy=x^3\) | Evet | Katsayılar \(x\)'e bağlı; \(y\) ve türevleri birinci kuvvette |
| \(y''+xy'+y=\cos x\) | Evet | Sağ taraf doğrusal değil gibi görünse de yalnız \(x\)'e bağlı |
| \(y''+3y'+2y=e^x\) | Evet | Sabit katsayılı, homojen olmayan doğrusal denklem |
| \(y''+y^2=0\) | Hayır | \(y^2\) terimi var |
| \(y'+\sin y=x\) | Hayır | \(y\)'nin doğrusal olmayan fonksiyonu var |
| \(yy'=x\) | Hayır | \(y\) ile \(y'\) çarpılıyor |
| \((y')^2+y=x\) | Hayır | Türev ikinci kuvvette |

> **Sık karıştırılan nokta.** \(F(x)=\cos x\) veya \(F(x)=e^x\) olması denklemi doğrusal olmaktan çıkarmaz. Doğrusallık, **bilinmeyen \(y\)'nin** denklemde nasıl göründüğüyle ilgilidir; sağ tarafın \(x\)'e göre ne kadar karmaşık olduğuyla değil.

## 3. D-operatörü

\(D\) operatörü türev alma işlemini tek bir sembolle yazmayı sağlar:

$$ D=\frac{d}{dx},\qquad Dy=y',\qquad D^2y=y'',\qquad D^ky=y^{(k)} $$

\(D\) bir sayı değil, bir **işlemdir**. Aşağıdaki üç özellik onun lineer olduğunu söyler:

$$ D(u+v)=Du+Dv,\qquad D(cu)=c\,Du,\qquad D(c_1u+c_2v)=c_1Du+c_2Dv $$

Bu özellikler sayesinde bir polinom gibi davranan operatör kurulabilir:

$$ \phi(D)=a_n(x)D^n+a_{n-1}(x)D^{n-1}+\cdots+a_1(x)D+a_0(x) $$

$$ \phi(D)y=F(x) $$

> **Değişken katsayı uyarısı.** \(D(xy)=xy'+y\), ancak \(xDy=xy'\) olur. Yani \(Dx\neq xD\)'dir. Sabit katsayılı denklemlerde bu ayrım görünmez; değişken katsayılı bir denklemde \(\phi(D)\)'yi açarken \(D^k\)'nın **sağındaki her şeye** uygulandığını unutma.

## 4. Örnek 4.1 · Operatör biçimine getir

**(1)** Denklem:

$$ 6x^2\frac{d^2y}{dx^2}+2x\frac{dy}{dx}-3y=x^3e^{2x} $$

Burada bağımsız değişken \(x\), bağımlı değişken \(y\)'dir. \(D=d/dx\) ile:

$$ \left(6x^2D^2+2xD-3\right)y=x^3e^{2x} $$

**(2)** Denklem:

$$ 5\frac{d^3x}{dt^3}+2\frac{d^2x}{dt^2}-7\frac{dx}{dt}+3x=\sin 8t $$

Burada roller değişir: bağımsız değişken \(t\), bağımlı değişken \(x\)'tir. Bu yüzden \(D=d/dt\) alınır:

$$ \left(5D^3+2D^2-7D+3\right)x=\sin 8t,\qquad D=\frac{d}{dt} $$

> **Harfin adı önemli değil.** Operatör her zaman **bağımsız değişkene** göre türevi alır. Birinci denklemde \(x\) bağımsız, ikinci denklemde \(x\) bağımlıdır; aynı harf farklı rol oynar. Önce bağımlı ve bağımsız değişkeni etiketle, sonra \(D\)'yi tanımla.

## 5. Temel teorem

\(\phi(D)\) lineer bir operatör olsun. \(u(x)\), \(\phi(D)y=F(x)\) denkleminin bir çözümü; \(v(x)\) ise homojen denklemin \(\phi(D)y=0\) bir çözümü olsun. O zaman \(u+v\) de asıl denklemin çözümüdür:

$$ \phi(D)(u+v)=\phi(D)u+\phi(D)v=F+0=F $$

Kanıt tek satırdır, çünkü \(\phi(D)\) toplamı toplama dağıtır. Bu sonuç **süperpozisyon ilkesi** olarak da bilinir.

Teoremin ikinci yarısı daha az konuşulur ama daha önemlidir. \(y\) asıl denklemin herhangi bir çözümü ve \(u\) bilinen bir özel çözüm ise:

$$ \phi(D)(y-u)=\phi(D)y-\phi(D)u=F-F=0 $$

Yani \(y-u\) homojen denklemin bir çözümüdür. Dolayısıyla **her** çözüm, bir özel çözüm ile bir homojen çözümün toplamıdır. Süperpozisyon yalnız yeni çözüm üretmez; çözümlerin tamamını da tarif eder.

> **İki yönlü düşün.** “\(u+v\) çözümdür” kısmı kolaydır. “Her çözüm \(u+v\) biçimindedir” kısmı, genel çözümün neden \(y_C+y_P\) yazıldığını açıklar. İkinci kısmı atlarsan, bulduğun ailenin eksik olup olmadığını denetleyemezsin.

## 6. Genel çözüm: \(y_C+y_P\)

Temel teorem, çözümü iki parçaya ayırmayı meşrulaştırır:

$$ y(x)=y_C(x)+y_P(x) $$

- \(y_P\): \(\phi(D)y=F(x)\) denkleminin **herhangi bir** özel çözümü. İçinde keyfi sabit yoktur; sağ tarafı taşır.
- \(y_C\): \(\phi(D)y=0\) homojen denkleminin **genel** çözümü. \(n\)-inci mertebede \(n\) bağımsız sabit buradadır.
- Başlangıç koşulları yalnız \(y_C\)'deki sabitleri belirler; \(y_P\) değişmez.

**Çalışma örneği.** \(L=D^2-3D+2\) ve \(L[y]=e^{3x}\) olsun. Önce \(y_P\)'yi dene:

$$ L\left[e^{3x}\right]=\left(9-9+2\right)e^{3x}=2e^{3x}\quad\Longrightarrow\quad y_P=\frac{1}{2}e^{3x} $$

Homojen denklem için \(y=e^{\lambda x}\) denenir:

$$ \lambda^2-3\lambda+2=(\lambda-1)(\lambda-2)=0\quad\Longrightarrow\quad y_C=C_1e^x+C_2e^{2x} $$

Genel çözüm:

$$ y=\frac{1}{2}e^{3x}+C_1e^x+C_2e^{2x} $$

Doğrulama: \(L[y]=e^{3x}+0+0=e^{3x}\). Şimdi \(y(0)=1\), \(y'(0)=0\) koşullarını uygula:

$$ \frac{1}{2}+C_1+C_2=1,\qquad \frac{3}{2}+C_1+2C_2=0 $$

Bu iki denklem \(C_1=5/2\), \(C_2=-2\) verir:

$$ y=\frac{1}{2}e^{3x}+\frac{5}{2}e^x-2e^{2x} $$

> **Sabitleri nereye koymalı?** \(y_P\)'ye keyfi sabit eklemek gereksizdir; o sabitler zaten \(y_C\)'de sayılmıştır. Özel çözümü sade tut, bütün serbestliği homojen kısımda topla. Böylece hem sabit sayısı denetlenir hem de başlangıç koşulları tek yerde çözülür.

## 7. Doğrusallığın sınırları

Doğrusal denklemlerin gücü süperpozisyondan gelir; bu güç doğrusal olmayan denklemlerde **çalışmaz**. \(y_1\) ve \(y_2\), \(L[y]=0\) denkleminin çözümleri olsa bile \(L[y_1+y_2]=0\) ancak \(L\) doğrusalsa garanti edilir.

| Durum | Doğrusal denklemde | Doğrusal olmayan denklemde |
| --- | --- | --- |
| \(L[u]=F\), \(L[v]=0\) | \(L[u+v]=F\) | Genellikle yanlış |
| İki homojen çözümün toplamı | Yine homojen çözüm | Genellikle çözüm değil |
| Sabitle çarpma | Çözüm kalır | Genellikle çözüm kalmaz |
| Başlangıç koşullarının çözümü | \(n\) sabit, \(n\) koşul | Doğrusal cebir yok |

Örneğin \(y'=y^2\) denkleminde \(y_1=1/(1-x)\) ve \(y_2=1/(2-x)\) birer çözümdür; ama \(y_1+y_2\) çözüm değildir. Sağ taraf \(y\)'ye göre karesel olduğu için süperpozisyon ilkesi yoktur.

> **Aralık da doğrusallığın parçasıdır.** Katsayılar süreksizse veya baş katsayı sıfırdan geçiyorsa, aynı formül farklı aralıklarda farklı çözümler tanımlar. Doğrusallık cebirsel bir özelliktir; geçerlilik aralığı analitik bir özelliktir. İkisini birlikte yaz.

## 8. Deney: operatör ve süperpozisyon

Atölyede bir \(L\) operatörü, iki \(u,v\) fonksiyonu ve iki \(\alpha,\beta\) katsayısı seçilir. Grafikte \(L[\alpha u+\beta v]\) ile \(\alpha L[u]+\beta L[v]\) birlikte çizilir; doğrusalsa iki eğri üst üste oturur ve artık sıfırdır. \(v\) homojen çözüm seçildiğinde \(L[v]=0\) olur ve ekranda temel teorem çalışır: \(L[\alpha u+\beta v]=\alpha F\).

| Operatör | Katsayılar | Ayırt edici özellik |
| --- | --- | --- |
| \(L=D^2-3D+2\) | sabit | \(e^x\) ve \(e^{2x}\) homojen çözümler |
| \(L=D^2+1\) | sabit | \(\sin x\) ve \(\cos x\) homojen çözümler |
| \(L=xD^2+D-1\) | değişken | \(D\) ile \(x\) yer değiştirmez |

> **Ekranda ne arayacaksın?** Artık sıfırdan farklıysa ya seçilen fonksiyon operatörün tanım bölgesinde değildir ya da doğrusallık testi yanlış uygulanmıştır. Artığın tam sıfır çıkması, iki tarafın aynı cebirsel işlemden geçtiğini gösterir; bu bir grafik hilesi değil, doğrusallığın sayısal kanıtıdır.

## Vizeye hazırlan

Dört çözümlü vaka sırasıyla doğrusallık sınıflandırmasını, operatör biçimine çevirmeyi, \(y_C+y_P\) ile başlangıç koşulu çözmeyi ve değişken katsayıda \(D\) sırasını kapsar. Her vakada aynı sırayı izle: bağımlı/bağımsız değişkeni etiketle, doğrusallık testini uygula, operatörü kur, özel ve homojen parçayı ayrı doğrula, sabitleri koşullarla belirle, aralığı yaz. Ardından 12 soruluk kontrol bölümüyle kendini sına.

## Kontrol listesi

- Bağımlı ve bağımsız değişkeni doğru etiketledim mi; \(D\) hangi değişkene göre türev alıyor?
- \(y\) ve bütün türevleri birinci kuvvette mi; \(yy'\), \(y^2\), \((y')^2\) gibi terim var mı?
- \(\sin y\), \(e^y\), \(\sqrt{y}\) gibi doğrusal olmayan \(y\) fonksiyonları var mı?
- Katsayılar yalnız \(x\)'e mi bağlı; baş katsayı hangi aralıkta sıfırdan farklı?
- \(\phi(D)\)'yi kurarken \(D^k\)'nın sağındaki bütün ifadeye uygulandığını hesaba kattım mı?
- Değişken katsayıda \(D(xy)\neq xDy\) ayrımını korudum mu?
- \(y_P\) gerçekten \(F\)'yi sağlıyor mu; \(y_C\) gerçekten homojen denklemi sağlıyor mu?
- Genel çözümdeki bağımsız sabit sayısı mertebeye eşit mi; koşullar yalnız \(y_C\)'yi mi belirliyor?
- Sonucu asıl denklemde ve tanım aralığında doğruladım mı?
