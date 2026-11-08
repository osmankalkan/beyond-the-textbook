# Bölüm 7 Özeti: Doğrusal Sistemler Karar Motoru ve Yöntemler Sentezi

Mühendislikte kuple mekanik osilatörler, elektrik devre ağları ve yapısal titreşimler, birden fazla bağımlı değişkenin türevleriyle birbirine bağlandığı **doğrusal diferansiyel denklem sistemleri** ile modellenir. Bölüm 7 boyunca bu sistemleri çözmek için üç temel analitik strateji geliştirdik:

1. **Operatör Yöntemi (§7.2):** Diferansiyel \(D = d/dt\) operatörü ve Cramer kuralı ile skaler yüksek mertebeli denklemlere indirgeme.
2. **Laplace Dönüşümü Yöntemi (§7.3):** Zaman bölgesindeki türevleri \(s\) frekans düzleminde doğrudan doğrusal cebirsel denklem sistemlerine dönüştürme.
3. **Matris Yöntemi (§7.4):** Durum uzayında \(\mathbf{\dot{x}} = \mathbf{A}\mathbf{x} + \mathbf{f}(t)\) birinci mertebe vektör-matris formülasyonu, özdeğer spektrumu, genelleştirilmiş özvektör zincirleri ve temel matris evirtimi.

> **ZİHİN MODELİ (60 Saniyelik Yöntem Seçim Pusulası):** Bir sınavda veya mühendislik probleminde yeni bir diferansiyel sistemle karşılaştığınızda ilk 60 saniyede şu üç soruyu sorun:
> 1. **Problem bir Başlangıç Değer Problemi (IVP) midir ve zorlama süreksizlik (basamak, darbe) içeriyor mu?** Evet ise tartışmasız **Laplace Dönüşümü Yöntemi** en hızlı yoldur; başlangıç koşullarını doğrudan soğurur ve aralık dikişlerini yok eder.
> 2. **Sistem 2×2 boyutunda, homojen ve başlangıç koşulsuz genel çözüm mü aranıyor?** Evet ise **Operatör Yöntemi** operatör determinantı \(\phi(D)\) ile saniyeler içinde karakteristik kökleri ve bağımsız modları verir.
> 3. **Sistem \(n \ge 3\) boyutlu yüksek mertebeli bir durum uzayı modeli veya yapı dinamiği (MDOF) osilatörü müdür?** Evet ise tek sistematik ve genelleştirilebilir yol **Matris Yöntemi**dir; modal ayrışma ve özvektörler sistemi bağımsız tek serbestlik dereceli osilatörlere ayırır.

---

## 1. Yöntem 1: Operatör Yöntemi Sentezi ve Sabit Eleme Kuralı

\(n\) adet bağımlı değişkenli \((x_1, x_2, \dots, x_n)\) bir doğrusal diferansiyel sistem diferansiyel \(D = d/dt\) operatörü cinsinden şu genel formda ifade edilir:

$$\sum_{j=1}^n \phi_{ij}(D)x_j(t) = f_i(t), \quad i = 1, 2, \dots, n$$

Katsayılar matrisinin determinantı sistemin karakteristik diferansiyel operatörüdür:

$$\phi(D) = \det[\phi_{ij}(D)], \quad N = \deg \phi(D)$$

### Homojen Çözüm ve Karakteristik Kökler

Karakteristik denklem \(\phi(\lambda) = 0\), derecesi \(N\) olan bir polinomdur ve \(N\) adet \(\lambda_1, \lambda_2, \dots, \lambda_N\) karakteristik sayısı üretir. Her bir \(x_i(t)\) değişkeni bu karakteristik köklerin ürettiği aynı temel fonksiyonların doğrusal kombinasyonudur:

$$x_i(t) = \sum_{k=1}^N C_{ik} e^{\lambda_k t}$$

> **İŞARET KURALI VE SABİT ELEME PROTOKOLÜ:** Her bağımlı değişken için ayrı ayrı \(N\) adet sabit yazıldığında toplam \(n \times N\) adet katsayı ortaya çıkar. Ancak sistemin genel çözümünde bulunması gereken **bağımsız keyfi sabit sayısı kesinlikle \(N = \deg \phi(D)\)**'dir! Fazlalık olan \((n - 1)N\) adet katsayı, genel çözümler orijinal diferansiyel denklemlerden birine konularak ve terim terim katsayı eşitliği yapılarak elenmek zorundadır.

### Özel Çözüm ve Operatörlü Cramer Kuralı

Zorlama fonksiyonları \(f_i(t)\) üstel, polinom veya sinüzoidal formda olduğunda özel çözümler operatör determinantı ile doğrudan hesaplanır:

$$x_{iP}(t) = \frac{1}{\phi(D)}\Delta_i(t)$$

Burada \(\Delta_i(t)\), katsayı matrisinin \(i\). sütunu yerine sağ taraf zorlama vektörü \(\mathbf{f}(t)\) yerleştirilerek elde edilen operatör determinantıdır.

> **SIK YAPILAN HATA (Operatör ve Fonksiyon Sıralaması):** Diferansiyel operatörler skaler sayı değildir; fonksiyonlar üzerinde türev alırlar. Cramer determinantı açılırken operatör blokları mutlaka zorlama fonksiyonlarının **soluna** yazılmalıdır (\(\phi_{ij}(D)f_k(t)\)). Sıralamanın ters çevrilmesi türevlerin kaybolmasına ve ölümcül işaret hatalarına yol açar!

---

## 2. Yöntem 2: Laplace Dönüşümü Yöntemi Sentezi

Laplace dönüşümü yöntemi, başlangıç değer problemlerini (IVP) çözmek için en dolaysız ve mekanik tekniktir. Türev teoremi:

$$\mathcal{L}\{\dot{x}(t)\} = s X(s) - x(0), \quad \mathcal{L}\{\ddot{x}(t)\} = s^2 X(s) - s x(0) - \dot{x}(0)$$

sayesinde zaman bölgesindeki diferansiyel sistem doğrudan \(s\) frekans bölgesinde cebirsel bir doğrusal denklem sistemine dönüşür:

$$\mathbf{\Phi}(s)\mathbf{X}(s) = \mathbf{F}(s) + \mathbf{I}_0$$

Burada \(\mathbf{I}_0\) başlangıç koşullarından gelen bilinen vektördür.

### Laplace Yönteminin Benzersiz Üstünlükleri

1. **Başlangıç Koşullarının Doğrudan Soğurulması:** Başlangıç değerleri \(x(0), y(0)\) dönüşümün en başında sağ tarafa eklenir. Dolayısıyla genel çözüm bulduktan sonra bağımlı sabitleri eleme külfeti tamamen ortadan kalkar!
2. **Süreksiz Zorlamalar ve Şok Darbeleri:** Sağ tarafta Heaviside basamakları \(H(t - a)\) veya Dirac delta \(\delta(t - a)\) darbeleri yer aldığında:

$$\mathcal{L}\{f(t - a)H(t - a)\} = e^{-as}F(s), \quad \mathcal{L}\{\delta(t - a)\} = e^{-as}$$

formülleri ile tüm süreksizlikler tek bir analitik yapıda çözülür. Klasik yöntemlerde zorunlu olan parça parça aralık çözümü ve sınır süreklilik dikişleri (stitching) tamamen gereksiz hale gelir.

> **PRATİK KONTROL (Cramer Pay Determinantı):** \(s\) bölgesindeki cebirsel denklem sistemini çözerken:
>
> $$X(s) = \frac{\det \mathbf{\Phi}_1(s)}{\det \mathbf{\Phi}(s)}, \quad Y(s) = \frac{\det \mathbf{\Phi}_2(s)}{\det \mathbf{\Phi}(s)}$$
>
> Pay ve payda polinomlarının köklerini sadeleştirmeden önce ters dönüşüm yapmayın; ortak çarpanlar rezonans yanılgısını önler.

---

## 3. Yöntem 3: Matris Yöntemi ve Durum Uzayı Sentezi

Matris yöntemi, keyfi mertebeden diferansiyel sistemleri birinci mertebe vektör diferansiyel denklem formuna dönüştüren en genel ve sistematik yaklaşımdır:

$$\mathbf{\dot{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{f}(t), \quad \mathbf{x}(t) \in \mathbb{R}^n, \quad \mathbf{A} \in \mathbb{R}^{n \times n}$$

Homojen sistemin \(\mathbf{\dot{x}} = \mathbf{A}\mathbf{x}\) çözümü, matrisin \(\det(\mathbf{A} - \lambda\mathbf{I}) = 0\) karakteristik polinomunun özdeğerleri (\(\lambda\)) ve özvektörleri (\(\mathbf{v}\)) üzerinden kurulur:

$$(\mathbf{A} - \lambda\mathbf{I})\mathbf{v} = \mathbf{0}$$

### Üç Temel Özdeğer Spektrumu ve Faz Portresi Topolojisi

1. **Farklı Gerçel Özdeğerler (\(\lambda_1 \neq \lambda_2\)):**
   Lineer bağımsız özvektörler \(\mathbf{v}_1, \mathbf{v}_2\) durum uzayını gerer:
   $$\mathbf{x}_H(t) = C_1 e^{\lambda_1 t}\mathbf{v}_1 + C_2 e^{\lambda_2 t}\mathbf{v}_2$$
   Köklerin işaretleri zıtsa (\(\lambda_1 < 0 < \lambda_2\)), orijin bir **Eyer Noktasıdır (Saddle Point)**. \(\mathbf{v}_1\) doğrusu kararlı manifold, \(\mathbf{v}_2\) doğrusu kararsız manifolddur.
2. **Karmaşık Eşlenik Özdeğerler (\(\lambda = \alpha \pm i\beta\)):**
   Euler açılımı ile gerçel ve sanal bileşenler dönel modları kurar:
   $$\mathbf{x}_H(t) = e^{\alpha t}\left[ C_1 (\mathbf{a}\cos\beta t - \mathbf{b}\sin\beta t) + C_2 (\mathbf{a}\sin\beta t + \mathbf{b}\cos\beta t) \right]$$
   \(\alpha < 0\) ise faz portresi orijine yakınsayan **Kararlı Sarmal Odaktır (Spiral Sink)**.
3. **Katlı Dejenere Özdeğerler (Defective Eigenvalues):**
   Geometrik katlılık cebirsel katlılıktan küçük olduğunda (\(k < m\)), eksik özvektörler genelleştirilmiş zincir denklemiyle üretilir:
   $$(\mathbf{A} - \lambda\mathbf{I})\mathbf{v}_2 = \mathbf{v}_1 \implies \mathbf{x}_2(t) = e^{\lambda t}(t\mathbf{v}_1 + \mathbf{v}_2)$$

### Temel Matris ve Parametrelerin Değişimi

\(n\) adet lineer bağımsız çözüm sütunlarından oluşan \(\mathbf{X}(t) = [\mathbf{x}_1(t), \dots, \mathbf{x}_n(t)]\) temel matrisi daima tersi alınabilirdir (\(\det \mathbf{X}(t) \neq 0\)). Genel çözüm ve başlangıç değer problemi tek matris integraliyle kapanır:

$$\mathbf{x}(t) = \mathbf{X}(t)\mathbf{X}^{-1}(t_0)\mathbf{x}_0 + \mathbf{X}(t)\int_{t_0}^t \mathbf{X}^{-1}(\tau)\mathbf{f}(\tau)\,d\tau$$

---

## 4. Karşılaştırmalı Yöntemler Matrisi

Aşağıdaki sentez tablosu, bir mühendislik probleminde hangi yöntemin ne zaman tercih edilmesi gerektiğini özetler:

| Değerlendirme Kriteri | §7.2 Operatör Yöntemi | §7.3 Laplace Dönüşümü | §7.4 Matris Yöntemi |
| :--- | :--- | :--- | :--- |
| **Temel Matematiksel Araç** | Türev operatörü \(D = d/dt\) ve Cramer kuralı | Karmaşık frekans dönüşümü \(\mathcal{L}\) | Özdeğerler, özvektörler ve durum uzayı |
| **En Güçlü Olduğu Alan** | Küçük (2×2), başlangıç koşulsuz genel çözümler | Başlangıç değer problemleri (IVP) ve süreksiz zorlamalar | Çok serbestlik dereceli (MDOF) sistemler, modal analiz |
| **Başlangıç Koşulları** | Çözümden sonra; türev alıp sabit eleme zorunlu | İlk adımda doğrudan cebirsel sisteme gömülür | Temel matris tersiyle doğrudan: \(\mathbf{X}(t)\mathbf{X}^{-1}(t_0)\mathbf{x}_0\) |
| **Süreksiz Zorlamalar** | Uygun değil; her aralıkta sınır dikişi gerekir | **Kusursuz;** Heaviside ve Dirac darbelerini tek adımda çözer | Parçalı integrasyon veya Laplace-matris hibriti gerektirir |
| **Yüksek Boyut (\(n \ge 3\))** | Determinant derecesi büyüdükçe cebirsel olarak hantallaşır | Kısmi kesir açılımları yüksek derecelerde zorlaşır | **Standart mühendislik formatı;** bilgisayara tam uygundur |
| **En Kritik Tuzak** | \(N = \deg \phi(D)\) kuralını unutup \(2N\) bağımsız sabit bırakmak | Eksi işaretlerini veya Cramer pay determinantını yanlış kurmak | Katlı özdeğerlerde eksik özvektör zincirini kurmamak |

---

## 5. Mühendislik Uygulaması: İki Serbestlik Dereceli Yapısal Titreşimler ve Modal Ayrışma

Çok katlı binalar veya kuple yay-kütle sistemleri kütle matrisi \(\mathbf{M}\) ve rijitlik matrisi \(\mathbf{K}\) içeren ikinci mertebe kuple diferansiyel sistemlerle modellenir:

$$\mathbf{M}\mathbf{\ddot{x}} + \mathbf{K}\mathbf{x} = \mathbf{0}$$

Burada \(\mathbf{x}(t) = [x_1(t), x_2(t)]^T\) kat yer değiştirmeleridir.

### Genelleştirilmiş Özdeğer Problemi ve Ortogonallik

Harmonik çözüm \(\mathbf{x}(t) = \mathbf{\phi} e^{i\omega t}\) önerildiğinde sistem genelleştirilmiş özdeğer problemine dönüşür:

$$(\mathbf{K} - \omega^2\mathbf{M})\mathbf{\phi} = \mathbf{0} \implies \det(\mathbf{K} - \omega^2\mathbf{M}) = 0$$

Karakteristik denklem sistemin doğal frekanslarını \(\omega_1, \omega_2\) ve karşılık gelen mod şekillerini \(\mathbf{\phi}_1, \mathbf{\phi}_2\) verir. Mod şekilleri matrisi \(\mathbf{\Phi} = [\mathbf{\phi}_1, \mathbf{\phi}_2]\) kullanılarak modal koordinatlara geçildiğinde:

$$\mathbf{x}(t) = \mathbf{\Phi}\mathbf{q}(t) \implies \mathbf{\Phi}^T\mathbf{M}\mathbf{\Phi}\mathbf{\ddot{q}} + \mathbf{\Phi}^T\mathbf{K}\mathbf{\Phi}\mathbf{q} = \mathbf{0}$$

Mod şekillerinin ortogonalliği sayesinde kuple matrisler köşegenleşir ve sistem bağımsız tek serbestlik dereceli osilatörlere ayrışır:

$$\ddot{q}_1(t) + \omega_1^2 q_1(t) = 0, \quad \ddot{q}_2(t) + \omega_2^2 q_2(t) = 0$$

---

## 6. Sayısal ve Analitik Doğrulama

Laboratuvarda ve sınavlarda elde edilen analitik çözümler, diferansiyel sistem denklemine geri yerleştirilerek anlık kalıntı vektörü \(\mathbf{E}(t)\) ile denetlenir:

$$\mathbf{E}(t) = \mathbf{\dot{x}}(t) - \mathbf{A}\mathbf{x}(t) - \mathbf{f}(t) \equiv \begin{bmatrix} 0 \\ 0 \end{bmatrix}, \quad |\mathbf{E}(t)| < 10^{-14}$$

> **BAĞIMSIZ DOĞRULAMA (RK4 Çapraz Sağlaması):** Analitik çözümlerden tamamen bağımsız çalışan 4. mertebe Runge-Kutta (RK4) sayısal integratörü ile analitik yörünge karşılaştırılır. Aradaki farkın makine hassasiyetinde kalması (\(< 10^{-6}\)), modelin matematiksel ve fiziksel tutarlılığını kesin olarak kanıtlar.
