# §7.4 Matris Yöntemi: Özdeğerler, Özvektörler, Temel Matris ve Parametrelerin Değişimi

Mühendislik sistemlerinde birbirine bağlı çok değişkenli dinamikler (örneğin çok katlı binaların sismik salınımları, çok gözlü elektrik devreleri veya birbirine bağlı kimyasal reaktörler), tekil yüksek mertebeli diferansiyel denklemler yerine birinci mertebeden diferansiyel denklem sistemleri olarak ifade edilir. Bu sistemleri çözmenin en genel, sistematik ve geometrik sezgisi en güçlü yolu **Matris Yöntemi**dir (The Matrix Method).

Birinci mertebeden \(n\) bilinmeyenli sabit katsayılı doğrusal bir sistem, durum vektörü \(\mathbf{x}(t) = [x_1(t), x_2(t), \dots, x_n(t)]^T\) ve sabit katsayılar matrisi \(\mathbf{A} \in \mathbb{R}^{n \times n}\) cinsinden standart matris formunda yazılır:

$$\mathbf{\dot{x}}(t) = \mathbf{A}\,\mathbf{x}(t) + \mathbf{f}(t), \quad \mathbf{x}(t_0) = \mathbf{x}_0$$

Tek boyuttaki skaler \(\dot{x} = a x\) denkleminin çözümü \(x(t) = C e^{at}\) üstel fonksiyonudur. Çok boyutlu matris sisteminde de benzer şekilde homojen çözüm için \(\mathbf{x}(t) = e^{\lambda t}\mathbf{v}\) üstel ansatzı (tahmini) önerilir. Burada \(\lambda\) aranacak skaler bir sayı (özdeğer), \(\mathbf{v} \neq \mathbf{0}\) ise sabit bir yön vektörüdür (özvektör). Bu ansatz \((\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}\) homojen denklemine yol açar. Sıfırdan farklı aşikar olmayan (\(\mathbf{v} \neq \mathbf{0}\)) bir çözümün bulunabilmesi, katsayılar determinantının sıfırlanmasına bağlıdır:

$$\det(\mathbf{A} - \lambda\,\mathbf{I}) = \lambda^2 - \operatorname{tr}(\mathbf{A})\,\lambda + \det(\mathbf{A}) = 0$$

> **ZİHİN MODELİ (Özvektörlerin Geometrik Sezgisi):** Bir matris genel bir vektöre çarptığında o vektörü hem uzatır/kısaltır hem de döndürür. Ancak matrisin bir **özvektörüne** çarptığında hiçbir dönme gerçekleşmez; matris bir skaler gibi davranarak vektörü sadece \(\lambda\) oranı kadar uzatır veya kısaltır (\(\mathbf{A}\mathbf{v} = \lambda \mathbf{v}\)). Dolayısıyla faz düzleminde bir parçacık bir özvektör doğrusu üzerinde başlatılırsa, hız vektörü \(\mathbf{\dot{x}} = \lambda \mathbf{x}\) her an konum vektörüne tam paralel kalır. Parçacık asla sağa sola sapamaz; sonsuza dek o düz ray üzerinde kalarak orijine doğru büzülür (\(\lambda < 0\)) veya orijinden uzaklaşır (\(\lambda > 0\)). Faz portresindeki tüm eğri yörüngeler, aslında bu değişmez doğrusal rayların doğrusal süperpozisyonudur!

---

## 1. Durum 1: Farklı Gerçel Özdeğerler ve Eyer Noktası Dinamikleri

Eğer karakteristik denklem \(n\) adet birbirinden farklı gerçel kök \(\lambda_1, \lambda_2, \dots, \lambda_n\) veriyorsa, bu köklere karşılık gelen özvektörler \(\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\) lineer bağımsızdır ve \(\mathbb{R}^n\) durum uzayını gerer. Homojen sistemin genel çözümü bu bağımsız modların süperpozisyonudur:

$$\mathbf{x}_H(t) = C_1\,e^{\lambda_1 t}\,\mathbf{v}_1 + C_2\,e^{\lambda_2 t}\,\mathbf{v}_2 = \sum_{k=1}^n C_k\,e^{\lambda_k t}\,\mathbf{v}_k$$

### Ders Kitabı Örnek 7.14
\(\dot{x}_1 = x_1 + 4x_2\), \(\dot{x}_2 = x_1 - 2x_2\) sistemini \(x_1(0) = 1, x_2(0) = 2\) başlangıç koşullarıyla ele alalım. Katsayılar matrisi ve karakteristik denklemi:

$$\mathbf{A} = \begin{bmatrix} 1 & 4 \\ 1 & -2 \end{bmatrix}, \quad \det(\mathbf{A} - \lambda\,\mathbf{I}) = \lambda^2 + \lambda - 6 = (\lambda + 3)(\lambda - 2) = 0$$

Karakteristik kökler \(\lambda_1 = -3\) ve \(\lambda_2 = 2\) olarak bulunur. Her bir özdeğer için \((\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}\) denklemi çözüldüğünde doğrusal bağımsız iki özvektör elde edilir:

$$\lambda_1 = -3 \implies \mathbf{v}_1 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}, \quad \lambda_2 = 2 \implies \mathbf{v}_2 = \begin{bmatrix} 4 \\ 1 \end{bmatrix}$$

Genel çözüm \(\mathbf{x}(t) = C_1 e^{-3t} \mathbf{v}_1 + C_2 e^{2t} \mathbf{v}_2\) olup başlangıç koşulları \(C_1 \mathbf{v}_1 + C_2 \mathbf{v}_2 = [1, 2]^T\) eşitliğinden \(C_1 = -7/5\) ve \(C_2 = 3/5\) olarak belirlenir:

$$\mathbf{x}(t) = -\frac{7}{5}\,e^{-3t}\begin{bmatrix} 1 \\ -1 \end{bmatrix} + \frac{3}{5}\,e^{2t}\begin{bmatrix} 4 \\ 1 \end{bmatrix} = \begin{bmatrix} -\frac{7}{5}\,e^{-3t} + \frac{12}{5}\,e^{2t} \\ \frac{7}{5}\,e^{-3t} + \frac{3}{5}\,e^{2t} \end{bmatrix}$$

> **PRATİK KONTROL (Eyer Noktası Topolojisi):** Özdeğerlerden biri negatif (\(\lambda_1 = -3\)), diğeri pozitif (\(\lambda_2 = 2\)) olduğundan orijin bir **Eyer Noktasıdır (Saddle Point)**. Faz düzleminde \(\mathbf{v}_1 = [1, -1]^T\) doğrusu boyunca hareket eden parçacıklar orijine çekilir (kararlı manifold), ancak en ufak bir sapmada \(\lambda_2 = 2\) pozitif kökünün \(e^{2t}\) terimi baskın gelir ve yörüngeler \(\mathbf{v}_2 = [4, 1]^T\) doğrusuna paralel şekilde orijinden sonsuza kaçar (kararsız manifold).

---

## 2. Durum 2: Karmaşık Eşlenik Özdeğerler ve Sönümlü Sarmal Odak (Spiral Sink)

Gerçel katsayılı bir matris için karakteristik kökler karmaşık çıktığında daima eşlenik çiftler halinde gelir: \(\lambda_{1,2} = \alpha \pm i\beta\). Karşılık gelen özvektör de karmaşık bileşenlere ayrılır: \(\mathbf{v} = \mathbf{u} + i\mathbf{w}\). Euler formülü kullanılarak üstel ifade trigonometrik bileşenlerine açılır:

$$\lambda = \alpha \pm i\,\beta, \quad e^{(\alpha + i\beta)t} = e^{\alpha t}\left(\cos\beta t + i\,\sin\beta t\right)$$

Sistemin gerçel ve sanal kısımları diferansiyel denklemi bağımsız olarak sağladığından, iki gerçel doğrusal bağımsız çözüm doğrudan elde edilir:

$$\mathbf{x}_1(t) = e^{\alpha t}\left(\mathbf{u}\cos\beta t - \mathbf{w}\sin\beta t\right), \quad \mathbf{x}_2(t) = e^{\alpha t}\left(\mathbf{u}\sin\beta t + \mathbf{w}\cos\beta t\right)$$

### Ders Kitabı Örnek 7.15
\(\dot{x}_1 = -3x_1 - 2x_2\), \(\dot{x}_2 = 8x_1 - 3x_2\) sisteminin katsayılar matrisi ve karakteristik denklemi:

$$\mathbf{A} = \begin{bmatrix} -3 & -2 \\ 8 & -3 \end{bmatrix}, \quad \det(\mathbf{A} - \lambda\,\mathbf{I}) = (\lambda + 3)^2 + 16 = 0 \implies \lambda_{1,2} = -3 \pm 4i$$

\(\lambda = -3 + 4i\) için \((\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}\) çözüldüğünde karmaşık özvektör gerçel ve sanal kısımlarına ayrılır:

$$(\mathbf{A} - (-3+4i)\mathbf{I})\,\mathbf{v} = \mathbf{0} \implies \mathbf{v} = \begin{bmatrix} 5 \\ -2 \end{bmatrix} + i\begin{bmatrix} 0 \\ 4 \end{bmatrix}$$

Buradan gerçel çözümler üretilip toplandığında sistemin sönümlü sarmal odak genel çözümü ortaya çıkar:

$$\mathbf{x}(t) = e^{-3t}\left( C_1\begin{bmatrix} 5\cos 4t \\ -2\cos 4t - 4\sin 4t \end{bmatrix} + C_2\begin{bmatrix} 5\sin 4t \\ -2\sin 4t + 4\cos 4t \end{bmatrix} \right)$$

Gerçel kısım \(\alpha = -3 < 0\) olduğundan yörüngeler orijine doğru çekilir; sanal kısım \(\beta = 4\) ise faz düzleminde sürekli bir dönme üretir. İkisinin birleşimi faz düzleminde bir **Kararlı Sarmal Odak (Stable Spiral Sink)** oluşturur.

---

## 3. Durum 3: Katlı Kökler, Kusurlu Matrisler ve Genelleştirilmiş Özvektörler

Bir matris katlı bir özdeğere sahip olduğunda cebirsel katlılık \(m=2\) iken yalnızca tek bir bağımsız özvektör \(\mathbf{v}_1\) bulunabilirse bu matris **Kusurlu (Defective)** olarak adlandırılır:

$$k = \operatorname{dim}\,\operatorname{ker}(\mathbf{A} - \lambda\,\mathbf{I}) = 1 < m = 2$$

Tek bir özvektör varsa birinci bağımsız çözüm \(\mathbf{x}_1(t) = e^{\lambda t}\mathbf{v}_1\) olur. İkinci bağımsız çözümde türev kuralından doğan fazlalık \(e^{\lambda t}\mathbf{v}_1\) terimini ve \(t e^{\lambda t}\mathbf{v}_1\) türevini dengelemek için çözüme bir **genelleştirilmiş özvektör** \(\mathbf{v}_2\) eklenir: \(\mathbf{x}_2(t) = e^{\lambda t}(t\mathbf{v}_1 + \mathbf{v}_2)\). Bu formül meşhur **Jordan zincir denklemini** üretir:

$$(\mathbf{A} - \lambda\,\mathbf{I})\,\mathbf{v}_1 = \mathbf{0}, \quad (\mathbf{A} - \lambda\,\mathbf{I})\,\mathbf{v}_2 = \mathbf{v}_1$$

### Ders Kitabı Örnek 7.18
$$\mathbf{A} = \begin{bmatrix} 1 & -4 \\ 1 & -3 \end{bmatrix}, \quad \det(\mathbf{A} - \lambda\,\mathbf{I}) = (\lambda + 1)^2 = 0 \implies \lambda = -1$$

\(\lambda = -1\) çift katlı kökü için \((\mathbf{A} + \mathbf{I})\mathbf{v}_1 = \mathbf{0}\) çözüldüğünde tek bir özvektör bulunur; ardından zincir denklemiyle genelleştirilmiş özvektör \(\mathbf{v}_2\) tespit edilir:

$$\mathbf{v}_1 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}, \quad (\mathbf{A} + \mathbf{I})\,\mathbf{v}_2 = \mathbf{v}_1 \implies \mathbf{v}_2 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

> **İŞARET KURALI VE ZİNCİR SIRASI:** Genelleştirilmiş özvektör hesabında \((\mathbf{A} - \lambda \mathbf{I})\mathbf{v}_2 = \mathbf{v}_1\) yazılırken sağ tarafa mutlaka \(\mathbf{v}_1\) konmalıdır; \(\mathbf{0}\) konursa standart özvektörle karışır. Ayrıca \(\mathbf{v}_2\)'ye \(\mathbf{v}_1\)'in herhangi bir skaler katı eklense de çözüm uzayı değişmez, bu durum sadece \(C_1\) sabitinin yeniden tanımlanmasına karşılık gelir.

---

## 4. Temel Matris \(\mathbf{X}(t)\) ve Parametrelerin Değişimi Yöntemi

Homojen bir diferansiyel sistemin \(n\) adet doğrusal bağımsız çözüm vektörü sütunlar halinde yan yana dizildiğinde oluşan \(n \times n\) kare matrise **Temel Matris (Fundamental Matrix)** denir:

$$\mathbf{X}(t) = \begin{bmatrix} \mathbf{x}_1(t) & \mathbf{x}_2(t) & \cdots & \mathbf{x}_n(t) \end{bmatrix}, \quad \mathbf{\dot{X}}(t) = \mathbf{A}\,\mathbf{X}(t), \quad \det\mathbf{X}(t) \neq 0$$

Homojen çözüm \(\mathbf{x}_H(t) = \mathbf{X}(t)\mathbf{C}\) biçimindedir. Homojen olmayan \(\mathbf{\dot{x}} = \mathbf{A}\mathbf{x} + \mathbf{f}(t)\) sistemini çözmek için sabit \(\mathbf{C}\) vektörü zamana bağlı bir fonksiyon vektörü \(\mathbf{c}(t)\) ile değiştirilir (**Parametrelerin Değişimi / Variation of Parameters**):

$$\mathbf{x}_P(t) = \mathbf{X}(t)\,\mathbf{c}(t) = \sum_{k=1}^n c_k(t)\,\mathbf{x}_k(t)$$

Bu ifade diferansiyel denklem sistemine yerleştirildiğinde çarpım kuralı uygulanır:

$$\mathbf{\dot{x}}_P = \mathbf{\dot{X}}\,\mathbf{c} + \mathbf{X}\,\mathbf{\dot{c}} = \mathbf{A}\,\mathbf{X}\,\mathbf{c} + \mathbf{X}\,\mathbf{\dot{c}} = \mathbf{A}\,\mathbf{x}_P + \mathbf{f}(t) \implies \mathbf{X}(t)\,\mathbf{\dot{c}}(t) = \mathbf{f}(t)$$

\(\mathbf{\dot{X}} = \mathbf{A}\mathbf{X}\) temel özelliği sayesinde \(\mathbf{A}\mathbf{X}\mathbf{c}\) terimleri özdeş olarak birbirini sıfırlar! Geriye kalan birinci mertebe denklem sol taraftan ters temel matris \(\mathbf{X}^{-1}(t)\) ile çarpılır:

$$\mathbf{\dot{c}}(t) = \mathbf{X}^{-1}(t)\,\mathbf{f}(t) \implies \mathbf{c}(t) = \mathbf{C} + \int_{t_0}^t \mathbf{X}^{-1}(\tau)\,\mathbf{f}(\tau)\,d\tau$$

### Ders Kitabı Örnek 7.18 Nonhomojen Çözümü
Örnek 7.18 sistemine \(\mathbf{f}(t) = [2, 0]^T e^{-t}\) zorlaması uygulandığında ters temel matris ile integrasyon özel çözümü verir:

$$\mathbf{x}_P(t) = \begin{bmatrix} 2 & 2t+1 \\ 1 & t \end{bmatrix} e^{-t}\begin{bmatrix} \int 2t\,dt \\ \int -2\,dt \end{bmatrix} = \begin{bmatrix} 2(t^2 - 2t - 1) \\ t^2 - 2t \end{bmatrix} e^{-t}$$

---

## 5. Standart Dışı Zorlamalar: \(\sec t\) ve Logaritmik Dinamikler

Belirsiz katsayılar yöntemi yalnızca türevleri kendi içine kapanan fonksiyon ailelerinde çalışır. Oysa \(\sec t, \tan t, 1/t\) gibi zorlamalarda türev kümesi sonsuza uzar; bu durumlarda Parametrelerin Değişimi yegane analitik yoldur.

### Ders Kitabı Örnek 7.19
$$\mathbf{\dot{x}} = \begin{bmatrix} 1 & -1 \\ 2 & -1 \end{bmatrix}\mathbf{x} + \begin{bmatrix} \sec t \\ 0 \end{bmatrix}, \quad \lambda_{1,2} = \pm i, \quad \det\mathbf{A} = 1$$

Homojen sistem bir nötr merkezdir. Ters temel matris ile zorlama çarpıldığında entegre edilecek parametre türevleri ortaya çıkar ve ∫ tan t dt = −ln|cos t| integrali çözüme dahil olur:

$$\mathbf{X}^{-1}(t)\,\mathbf{f}(t) = \begin{bmatrix} 1 - \tan t \\ 1 + \tan t \end{bmatrix} \implies \mathbf{x}(t) = \begin{bmatrix} (1+t)\cos t + t\sin t + (\cos t - \sin t)\ln|\cos t| \\ \cos t + (1+2t)\sin t + 2\cos t\ln|\cos t| \end{bmatrix}$$

> **SIK HATA (Trigonometrik Matris Evirtimi):** 2×2 temel matrisin tersini alırken katsayı determinantı \(\det\mathbf{X}(t)\)'nin işaretine dikkat edilmelidir. Örnek 7.19'da \(\det\mathbf{X}(t) = -1\)'dir. Bu eksi işaretini unutmak tüm \(\tan t\) katsayılarının işaretini tersine çevirir ve \(\ln|\cos t|\) terimlerinde ölümcül fiziksel hatalara yol açar.

---

## 6. Mühendislik Uygulaması: Çok Serbestlik Dereceli Yapılarda Modal Ayrışma

Çok katlı binalar veya çok kütleli mekanik yapılar, kütle matrisi \(\mathbf{M}\) ve rijitlik matrisi \(\mathbf{K}\) içeren ikinci mertebe kuple diferansiyel sistemlerle modellenir:

$$\mathbf{M}\,\mathbf{\ddot{x}} + \mathbf{K}\,\mathbf{x} = \mathbf{0}, \quad \mathbf{x}(t) = \mathbf{\Phi}\,\mathbf{q}(t) \implies \mathbf{\ddot{q}} + \mathbf{\Omega}^2\,\mathbf{q} = \mathbf{0}$$

Mod şekillerinin \(\mathbf{M}\) ve \(\mathbf{K}\)'ye göre ortogonal olması sayesinde kuple sistem tamamen bağımsız tek serbestlik dereceli osilatörlere ayrışır!

---

## 7. Sayısal ve Analitik Doğrulama

Laboratuvarda hesaplanan tüm analitik eğriler, diferansiyel sistem denklemine anlık olarak sokularak kalıntı vektörü \(\mathbf{E}(t)\) ile denetlenir:

$$\mathbf{E}(t) = \mathbf{\dot{x}}(t) - \mathbf{A}\,\mathbf{x}(t) - \mathbf{f}(t) \equiv \begin{bmatrix} 0 \\ 0 \end{bmatrix}, \quad |\mathbf{E}(t)| < 10^{-14}$$

> **BAĞIMSIZ DOĞRULAMA (RK4 Çapraz Sağlaması):** Matris formülasyonunun ve temel matris integrallerinin doğruluğu, analitik çözümden tamamen bağımsız çalışan 4. mertebe Runge-Kutta (RK4) sayısal integratörü ile test edilir. İnteraktif laboratuvarda her an analitik yörünge ile RK4 yörüngesi üst üste bindirilir; aradaki fark makine hassasiyetinde (\(< 10^{-6}\)) kalarak teorik modelin kusursuzluğunu kanıtlar.
