# §7.1 Giriş: Düzlemde Parçacık Hareketi ve Çok Katlı Kesme Binası

Şimdiye kadar çoğu problemi tek bir bağımsız değişken \(t\) ve tek bir bağımlı değişken \(x(t)\) veya \(y(t)\) ile yazdık. Gerçek mühendislik sistemlerinde ise aynı anda birden çok büyüklük değişir: düzlemde hareket eden bir parçacığın yatay ve düşey konumu, çok katlı bir binanın her katının yer değiştirmesi, bir elektrik devresindeki birden çok akım. Bu durumda bilinmeyenler tek bir fonksiyon değil, bir fonksiyon ailesidir.

§7.1'in amacı bu geçişi iki motive edici örnekle göstermektir:

1. **Düzlemde parçacık:** Aynı hareket, dikdörtgen koordinatlarda iki basit denklem, kutupsal koordinatlarda ise birbirine bağlı ve lineer olmayan iki denklem üretir.
2. **n katlı kesme binası:** Her katın serbest cisim diyagramı ayrı ayrı yazılır; sonra bu denklemler tek bir matris denkleminde birleştirilir.

Her iki örnekte de ortak hedef şudur: **ikinci mertebe denklemleri, birinci mertebe denklemlerden oluşan bir durum uzayına dönüştürmek.** Bu dönüşüm, ilerideki operatör, Laplace ve matris yöntemlerinin ortak dilidir.

---

## 1. Diferansiyel denklem sistemi nedir?

Bir sistem, tek bir bağımsız değişken ve birden çok bağımlı değişken içerir. Bağımlı değişkenleri bir vektörde toplarsak, en genel birinci mertebe lineer sistem şu biçimi alır:

$$ \dot{\mathbf{x}} = \mathbf{A}(t)\mathbf{x} + \mathbf{f}(t) $$

Burada \(\mathbf{x}\) bilinmeyen vektör, \(\mathbf{A}(t)\) katsayı matrisi, \(\mathbf{f}(t)\) ise dış zorlama vektörüdür. Katsayıların \(t\)'ye bağlı olması tek başına lineerliği bozmaz; lineerliği bozan şey, bilinmeyenlerin çarpımı veya doğrusal olmayan fonksiyonudur.

Mekanik sistemlerde denklemler genellikle ikinci mertebedir. Kütle, sönüm ve rijitlik matrisleriyle tipik biçim şudur:

$$ \mathbf{M}\ddot{\mathbf{x}} + \mathbf{C}\dot{\mathbf{x}} + \mathbf{K}\mathbf{x} = \mathbf{F}(t) $$

Bu denklem, tek serbestlik dereceli \(m\ddot{x}+c\dot{x}+kx=F(t)\) denkleminin çok serbestlik dereceli hâlidir. \(n\) katlı bir sistemde \(\mathbf{x}\) vektörü \(n\) bileşenlidir. Her ikinci mertebe denklem iki birinci mertebe denkleme açıldığı için durum uzayının boyutu \(2n\) olur.

> **ZİHİN MODELİ:** Tek denklemden sisteme geçiş, tek bir cismi izlemekten bir binanın bütün katlarını aynı anda izlemeye benzer. Her katın kendi konumu vardır; ancak komşu katlar birbirini yay ve sönüm elemanlarıyla çeker. Matrisler bu komşuluk ilişkisini düzenli biçimde saklar.

---

## 2. Düzlemde parçacık: dikdörtgen koordinatlar

Kütlesi \(m\) olan bir parçacık \(x\)-\(y\) düzleminde hareket etsin. Konumu \((x(t),y(t))\), dış kuvvetleri ise \(F_x(x,y,t)\) ve \(F_y(x,y,t)\) olsun. Newton'un ikinci yasası her yönde ayrı yazılır:

$$ m\ddot{x} = F_x(x,y,t), \qquad m\ddot{y} = F_y(x,y,t) $$

Bu, iki ikinci mertebe adi diferansiyel denklemden oluşan bir sistemdir. Kuvvetler yalnızca \(t\)'ye bağlıysa iki denklem birbirinden bağımsız çözülür. Kuvvetler \(x\) ve \(y\)'ye de bağlıysa denklemler birbirine bağlanır; yine de bilinmeyenlerin yalnızca birinci kuvvetleri göründüğü sürece sistem lineerdir.

Dikdörtgen koordinatlarda ivme bileşenleri doğrudan \(\ddot{x}\) ve \(\ddot{y}\)'dir. Kutupsal koordinatlarda ise aynı ivme, yön vektörlerinin kendisi de değiştiği için çok daha zengin bir ifadeye dönüşür.

---

## 3. Kutupsal koordinatlar: türetim

Parçacığın kutupsal koordinatları \((r,\theta)\) olsun. Dikdörtgen koordinatlarla ilişki şudur:

$$ x = r\cos\theta, \qquad y = r\sin\theta $$

Burada hem \(r\) hem de \(\theta\) zamanın fonksiyonudur. Birini sabit saymak, kutupsal türetimde en sık yapılan hatadır.

Konum vektörünün yönünü iki birim vektörle tanımlarız:

$$ \mathbf{e}_r = \cos\theta\,\mathbf{i} + \sin\theta\,\mathbf{j}, \qquad \mathbf{e}_\theta = -\sin\theta\,\mathbf{i} + \cos\theta\,\mathbf{j} $$

\(\mathbf{e}_r\) merkezden dışarı, \(\mathbf{e}_\theta\) ise açının artma yönünde teğetseldir. Bu iki vektör de \(\theta\) ile birlikte döner; ivmenin ek terimleri tam olarak bu dönmeden doğar.

Zincir kuralıyla birinci türevler alınır:

$$ \dot{x} = \dot{r}\cos\theta - r\dot{\theta}\sin\theta, \qquad \dot{y} = \dot{r}\sin\theta + r\dot{\theta}\cos\theta $$

Bir kez daha türev alırken çarpım kuralı devreye girer. \(r\dot{\theta}\) çarpımının türevi iki terim üretir; \(\cos\theta\) ve \(\sin\theta\)'nin türevleri de açısal hızla çarpılır:

$$ \ddot{x} = (\ddot{r} - r\dot{\theta}^2)\cos\theta - (2\dot{r}\dot{\theta} + r\ddot{\theta})\sin\theta $$

$$ \ddot{y} = (\ddot{r} - r\dot{\theta}^2)\sin\theta + (2\dot{r}\dot{\theta} + r\ddot{\theta})\cos\theta $$

İvme vektörünü \(\mathbf{e}_r\) ve \(\mathbf{e}_\theta\) doğrultularında grupladığımızda radyal ve açısal ivmeler ortaya çıkar:

$$ a_r = \ddot{r} - r\dot{\theta}^2, \qquad a_\theta = 2\dot{r}\dot{\theta} + r\ddot{\theta} $$

Buradaki \(r\dot{\theta}^2\) terimi **merkezcil ivme**dir; sabit yarıçapta bile sıfırdan farklıdır ve içeri doğru etki eder. \(2\dot{r}\dot{\theta}\) terimi ise yarıçap değişirken açısal hareketin ürettiği Coriolis benzeri katkıdır.

Newton'un ikinci yasası \(m a_r=F_r\) ve \(m a_\theta=F_\theta\) olarak yazıldığında kutupsal hareket denklemleri elde edilir:

$$ m(\ddot{r} - r\dot{\theta}^2) = F_r(r,\theta,t), \qquad m(2\dot{r}\dot{\theta} + r\ddot{\theta}) = F_\theta(r,\theta,t) $$

### 3.1 Lineerlik tuzağı

Denklemlerdeki bilinmeyenler \(r\) ve \(\theta\)'dır. \(r\dot{\theta}^2\) ve \(\dot{r}\dot{\theta}\) terimleri bu bilinmeyenlerin (ve türevlerinin) çarpımını içerir. Bu nedenle **genel kutupsal sistem lineer değildir.** Zamanla değişen katsayılar tek başına lineerliği bozmaz; çarpımlar bozar.

Sistemi birinci mertebe durum uzayına açmak istersek dört durum değişkeni kullanırız:

$$ \mathbf{y} = \begin{bmatrix} r \\ \theta \\ \dot{r} \\ \dot{\theta} \end{bmatrix}, \qquad \dot{\mathbf{y}} = \begin{bmatrix} \dot{r} \\ \dot{\theta} \\ r\dot{\theta}^2 + F_r/m \\ (F_\theta/m - 2\dot{r}\dot{\theta})/r \end{bmatrix} $$

Son satırdaki \(r\) paydada olduğu için bu gösterim yalnızca \(r\neq 0\) için geçerlidir. Başlangıç noktasındaki tekil durum ayrıca incelenmelidir.

Özel bir durum olarak açısal hız sabit, yani \(\dot{\theta}=\omega\) alınırsa \(\ddot{\theta}=0\) olur ve denklemler \(r\) ile \(\dot{r}\) cinsinden lineerleşir:

$$ \ddot{r} - \omega^2 r = \frac{F_r}{m}, \qquad 2\omega\dot{r} = \frac{F_\theta}{m} $$

Bu, "lineer sistemler" başlığının kutupsal örnekte neden koşullu olduğunu açıkça gösterir. Sabit açısal hız varsayımı olmadan sistem lineer değildir.

> **PRATİK KONTROL:** Kutupsal denklemde işaret ararken iki soru sor: (1) Merkeze doğru ivme bekleniyor mu? O hâlde \(r\dot{\theta}^2\) terimi eksi işaretli olmalı. (2) Açısal ivme, \(\dot{\theta}\)'nın değişmesinden mi yoksa \(r\dot{\theta}\) çarpımının türevinden mi geliyor? İkisi birlikte \(2\dot{r}\dot{\theta}+r\ddot{\theta}\) terimini verir.

---

## 4. n katlı kesme binası

Kesme binası modelinde her kat rijit kabul edilir; kolonlar yalnızca yatay kesme kuvveti taşır. \(r\). katın kütlesi \(m_r\), yatay yer değiştirmesi \(x_r(t)\), dış yükü \(F_r(t)\)'dir. \((r-1)\). kat ile \(r\). kat arasındaki toplam kolon rijitliği \(k_r\), sönüm katsayısı \(c_r\)'dir.

Önce komşu katlar arasındaki göreli yer değiştirmeleri tanımlarız:

$$ \Delta_r = x_r - x_{r-1}, \qquad \Delta_{r+1} = x_{r+1} - x_r $$

Alt kolon, \(r\). katı sola çeker; üst kolon ise sağa çeker. Bu yön seçimi işaretlerin kaynağıdır. \(r\). katın serbest cisim diyagramından hareket denklemi şöyle yazılır:

$$ m_r\ddot{x}_r + (c_r+c_{r+1})\dot{x}_r - c_r\dot{x}_{r-1} - c_{r+1}\dot{x}_{r+1} + (k_r+k_{r+1})x_r - k_r x_{r-1} - k_{r+1}x_{r+1} = F_r(t) $$

Sınır koşulları modelin uçlarını belirler:

$$ x_0 = 0, \qquad c_{n+1} = 0, \qquad k_{n+1} = 0 $$

\(x_0=0\) zeminin hareket etmediğini söyler. \(c_{n+1}=k_{n+1}=0\) ise en üst katın üzerinde kolon bulunmadığını ifade eder. Bu iki koşul, matrislerin tridiagonal kalmasını sağlar.

Bütün kat denklemleri tek bir matris denkleminde toplanır:

$$ \mathbf{M}\ddot{\mathbf{x}} + \mathbf{C}\dot{\mathbf{x}} + \mathbf{K}\mathbf{x} = \mathbf{F}(t), \qquad \mathbf{x} = \begin{bmatrix} x_1 \\ \vdots \\ x_n \end{bmatrix}, \quad \mathbf{F} = \begin{bmatrix} F_1 \\ \vdots \\ F_n \end{bmatrix} $$

Kütle matrisi köşegendir; her katın kütlesi yalnızca kendi satırında görünür:

$$ \mathbf{M} = \diag(m_1, m_2, \ldots, m_n) $$

Sönüm matrisi, komşu katlar arasındaki sönüm elemanlarını taşır:

$$ \mathbf{C} = \begin{bmatrix} c_1+c_2 & -c_2 & & \\ -c_2 & c_2+c_3 & -c_3 & \\ & \ddots & \ddots & \ddots \\ & & -c_n & c_n \end{bmatrix} $$

Rijitlik matrisi de aynı bant yapısındadır:

$$ \mathbf{K} = \begin{bmatrix} k_1+k_2 & -k_2 & & \\ -k_2 & k_2+k_3 & -k_3 & \\ & \ddots & \ddots & \ddots \\ & & -k_n & k_n \end{bmatrix} $$

Köşegen terimler, o katın alt ve üst komşularına bağlı toplam yay veya sönüm değerini taşır. Köşegen dışı terimler ise iki komşu katın paylaştığı elemanı temsil eder. \(\mathbf{M}\) simetrik ve köşegendir; \(\mathbf{C}\) ile \(\mathbf{K}\) simetrik ve tridiagonaldir. Bu yapı, enerji korunumu ve modal ayrıştırma için gereklidir.

> **İŞARET KURALI:** \(r\). katın denkleminde alt komşudan gelen terimler eksi, üst komşudan gelen terimler artı işaretle başlar. Ortak paranteze alındığında katın kendi köşegen terimi \((k_r+k_{r+1})\) ve \((c_r+c_{r+1})\) olur. İşaretleri ezberlemek yerine serbest cisim diyagramını çiz.

---

## 5. İki katlı bina: statik denge, frekanslar ve mod şekilleri

İki katlı özel durumda matrisler elle yazılabilir:

$$ \mathbf{K} = \begin{bmatrix} k_1+k_2 & -k_2 \\ -k_2 & k_2 \end{bmatrix}, \qquad \mathbf{C} = \begin{bmatrix} c_1+c_2 & -c_2 \\ -c_2 & c_2 \end{bmatrix} $$

Statik durumda \(\ddot{\mathbf{x}}=\dot{\mathbf{x}}=0\) olur; yalnızca \(\mathbf{K}\mathbf{x}_s=\mathbf{F}\) kalır. Buradan iki katın statik yer değiştirmeleri sırasıyla şöyledir:

$$ x_{1s} = \frac{F_1+F_2}{k_1}, \qquad x_{2s} = \frac{F_1+F_2}{k_1} + \frac{F_2}{k_2} $$

Birinci katın zemin yayı \(k_1\), tüm dış yüklerin toplamını taşır. İkinci kat ise birinci katın yer değiştirmesine kendi yayının \(F_2/k_2\) kadar deformasyonunu ekler.

### 5.1 Sayısal örnek

\(m_1=2\), \(m_2=1\), \(k_1=4\), \(k_2=2\), \(F_1=4\), \(F_2=2\) alalım. Statik çözüm \(x_{1s}=(4+2)/4=1.5\) ve \(x_{2s}=1.5+2/2=2.5\) olur.

Sönümsüz serbest titreşimde \(\mathbf{x}=\mathbf{\phi}e^{i\omega t}\) varsayımı \(\det(\mathbf{K}-\omega^2\mathbf{M})=0\) koşulunu verir:

$$ \det(\mathbf{K} - \omega^2\mathbf{M}) = 0 \quad\Longrightarrow\quad 2\omega^4 - 10\omega^2 + 8 = 0 $$

Denklem \(2(\omega^2-1)(\omega^2-4)=0\) biçiminde çarpanlara ayrılır. Pozitif kökler ve bunlara karşılık gelen mod şekilleri şunlardır:

$$ \omega_1 = 1, \quad \omega_2 = 2; \qquad \mathbf{\phi}_1 = \begin{bmatrix} 1 \\ 2 \end{bmatrix}, \quad \mathbf{\phi}_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix} $$

Birinci modda iki kat aynı yönde hareket eder; ikinci modda zıt yönde hareket eder. Mod şeklinin genliği keyfîdir; önemli olan bileşenlerin oranıdır. Burada \(\mathbf{\phi}_1\) için \(x_2=2x_1\), \(\mathbf{\phi}_2\) için \(x_2=-x_1\) oranı korunmuştur.

> **SIK HATA:** Statik denklem \(\mathbf{K}\mathbf{x}=\mathbf{F}\) ile özdeğer denklemi \(\det(\mathbf{K}-\omega^2\mathbf{M})=0\) birbirine karıştırılmamalıdır. Birincisi yük altındaki dengeyi, ikincisi yüksüz serbest titreşimin frekanslarını verir. Sönüm \(\mathbf{C}\) statik çözüme girmez; serbest titreşimde ise sönümsüz kabulde matristen çıkarılır.

---

## 6. Birinci mertebe durum uzayı

İki katlı sistemi \(n=2\) için birinci mertebeye indirelim. Durum vektörünü konumlar ve hızlar olarak seçelim:

$$ \mathbf{y} = \begin{bmatrix} x_1 \\ x_2 \\ \dot{x}_1 \\ \dot{x}_2 \end{bmatrix}, \qquad \dot{\mathbf{y}} = \begin{bmatrix} 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \\ -\frac{k_1+k_2}{m_1} & \frac{k_2}{m_1} & -\frac{c_1+c_2}{m_1} & \frac{c_2}{m_1} \\ \frac{k_2}{m_2} & -\frac{k_2}{m_2} & \frac{c_2}{m_2} & -\frac{c_2}{m_2} \end{bmatrix}\mathbf{y} + \begin{bmatrix} 0 \\ 0 \\ \frac{1}{m_1} \\ \frac{1}{m_2} \end{bmatrix}\mathbf{F}(t) $$

Buradaki durum matrisi \(\mathbf{A}\)'nın yapısı genel \(n\) için de aynıdır:

- Sol üst blok \(0\), sağ üst blok birim matris \(\mathbf{I}\)'dır.
- Sol alt blok \(-\mathbf{M}^{-1}\mathbf{K}\), sağ alt blok \(-\mathbf{M}^{-1}\mathbf{C}\)'dir.
- Giriş matrisi \(\mathbf{B}\)'nin alt bloğu \(\mathbf{M}^{-1}\), üst bloğu \(0\)'dır.

\(n\) katlı sistemde \(2n\) durum değişkeni vardır: \(n\) konum, \(n\) hız. İki katlı bina için bu sayı \(2n=4\), üç katlı bina için \(6\)'dır.

> **BAĞIMSIZ DOĞRULAMA:** Sönümsüz durumda \(\mathbf{A}\)'nın özdeğerleri \(\pm i\omega_1,\pm i\omega_2\) olmalıdır. Hesapladığın frekansları bu özdeğerlerle karşılaştırarak hem matris kurulumunu hem de frekans denklemini aynı anda kontrol edebilirsin. Sönüm varsa gerçek kısımlar negatif olmalı; pozitif çıkıyorsa işaret hatası vardır.

---

## 7. Sınav ve uygulama kontrol listesi

1. **Değişkenleri say:** Kaç bağımlı değişken var? Kaçıncı mertebe? Durum boyutu \(2n\) mi?
2. **Lineerliği teşhis et:** Bilinmeyenlerin çarpımı veya doğrusal olmayan fonksiyonu var mı? \(r\dot{\theta}^2\) ve \(\dot{r}\dot{\theta}\) gibi terimler sistemi lineer olmaktan çıkarır.
3. **Serbest cisim diyagramını çiz:** Alt komşu eksi, üst komşu artı yönde etki eder. Köşegen terimler \((k_r+k_{r+1})\) ve \((c_r+c_{r+1})\) olmalıdır.
4. **Sınır koşullarını uygula:** \(x_0=0\), \(k_{n+1}=c_{n+1}=0\). Bu koşullar olmadan matrisin son satırı yanlış kurulur.
5. **Statik ve dinamik hesabı ayır:** Statikte \(\mathbf{K}\mathbf{x}_s=\mathbf{F}\); serbest titreşimde \(\det(\mathbf{K}-\omega^2\mathbf{M})=0\).
6. **Durum uzayını kur:** \(\mathbf{y}=[\mathbf{x};\dot{\mathbf{x}}]\), sol alt blok \(-\mathbf{M}^{-1}\mathbf{K}\), sağ alt blok \(-\mathbf{M}^{-1}\mathbf{C}\).
7. **Sonucu doğrula:** Boyut, işaret, simetri ve özdeğer kontrolü yap. Enerji veya statik denge ile bağımsız bir sağlama üret.

---

## 8. Pekiştirme

Aşağıdaki kısa kontroller, konunun üç kritik geçişini hemen sınamak için tasarlandı. Yanıtları önce kendin üret, sonra laboratuvar ve klinik adımlarıyla karşılaştır.

1. **Kutupsal işaret:** \(r=R\) sabit ve \(\dot{\theta}=\omega\) sabit iken \(a_r\) nedir? Cevap \(-R\omega^2\)'dir; \(\ddot{r}=0\) olsa bile merkezcil terim kalır.
2. **Lineerlik:** Genel kutupsal sistem neden lineer değildir? Çünkü \(r\dot{\theta}^2\) ve \(\dot{r}\dot{\theta}\) çarpımları bilinmeyenlerin çarpımıdır.
3. **Kesme binası matrisi:** İki katlı binada \(\mathbf{K}\)'nın köşegeni neden \(k_1+k_2\) ve \(k_2\)'dir? Birinci kat hem zemine hem ikinci kata, ikinci kat yalnızca birinci kata bağlıdır.
4. **Statik çözüm:** \(F_1=4\), \(F_2=2\), \(k_1=4\), \(k_2=2\) için \(x_{1s}=1.5\), \(x_{2s}=2.5\) bulunur. Toplam yük \(k_1\) üzerinden taşınır; ikinci kat kendi yay deformasyonunu ekler.
5. **Durum boyutu:** Üç katlı bina için \(2n=6\) birinci mertebe denklem vardır. Her kat bir konum ve bir hız üretir.
6. **Özdeğer kontrolü:** Aynı örnekte \(\omega_1=1\), \(\omega_2=2\) ve modlar \([1,2]\), \([1,-1]\)'dir. Sönümsüz \(\mathbf{A}\)'nın özdeğerleri \(\pm i\) ve \(\pm 2i\) olmalıdır.

**Laboratuvar görevi:** Parçacık modunda "Dairesel" hazır ayarını seç; \(r\) sabitken \(a_r\)'nin negatif kaldığını gözle. Ardından bina moduna geç, "Sınav" hazır ayarını yükle ve statik çizgilerin \(1.5\) ile \(2.5\)'e oturduğunu, frekans kartlarının \(1\) ve \(2\)'yi verdiğini doğrula.

**Klinik görevi:** Dört vakada sırasıyla kutupsal türetimi, kat denklemini, statik/frekans hesabını ve durum uzayı dönüşümünü tam çöz. Her adımda birimi, işareti ve boyutu yaz; yalnızca sonucu değil, sonucun neden doğru olduğunu da göster.
