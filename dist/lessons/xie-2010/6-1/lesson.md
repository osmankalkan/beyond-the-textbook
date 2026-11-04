# §6.1 Laplace Dönüşümü: Tanım, Özellikler ve Temel Dönüşüm Tablosu

Diferansiyel denklemler mühendislikte hareket, elektrik akımı, ısı ve dalga yayılımı gibi dinamik süreçleri zaman bölgesinde (\(t\)) modeller. Ancak sabit katsayılı türev terimleri, süreksiz zorlamalar veya darbe kuvvetleri söz konusu olduğunda klasik integrasyon ve tamamlayıcı-özel çözüm ayrışımı hantal hale gelebilir.

**Laplace dönüşümü**, zaman bölgesindeki türev ve integral işlemlerini karmaşık frekans (\(s\)) bölgesinde **basit cebirsel işlemlere** dönüştüren integral tabanlı doğrusal bir operatördür:

$$ F(s) = \mathcal{L}\{f(t)\} = \int_0^\infty e^{-st} f(t)\,\mathrm{d}t = \lim_{M \to \infty} \int_0^M e^{-st} f(t)\,\mathrm{d}t $$

Bu dönüşüm sayesinde bir diferansiyel denklem doğrudan \(F(s)\) bilinmeyenli bir cebirsel denkleme indirgenir. Başlangıç koşulları \(f(0)\) ve \(f'(0)\) denklemin içine türev kuralıyla otomatik olarak gömülür; böylece genel çözümden sonra sabit arama zahmeti ortadan kalkar.

---

## 1. Tanım, Yakınsama Koşulu ve Üstel Mertebe

Laplace integrali \(t \ge 0\) yarı-doğrusunda tanımlı **has olmayan (improper)** bir integraldir. İntegralin sonlu bir değere yakınsayabilmesi için iki temel koşul aranır:

1. **Parçalı süreklilik:** \(f(t)\) fonksiyonu her sonlu \([0, M]\) aralığında sonlu sayıda sıçrama süreksizliği hariç sürekli olmalıdır.
2. **Üstel mertebeden olma:** Yeterince büyük \(t \ge T\) değerleri için öyle pozitif \(M\) ve gerçel \(s_0\) sabitleri bulunmalıdır ki fonksiyon üstel bir sınırın altında kalsın:

$$ |f(t)| \le M e^{s_0 t}, \qquad t \ge T $$

Buradaki \(s_0\) değerine **üstel mertebe** (veya **yakınsama apsisi**) denir. Laplace çekirdeği \(e^{-st}\), gerçel kısmı \(s > s_0\) olduğu sürece \(f(t)\) fonksiyonunun büyümesini bastırır (sönümler) ve integrali mutlak yakınsak kılar. Örneğin:
- \(f(t) = 1, t^n, \sin\omega t, \cos\omega t\) için \(s_0 = 0\)'dır (\(s > 0\) yakınsar).
- \(f(t) = e^{at}\) ve \(e^{at}\sin\omega t\) için \(s_0 = a\)'dır (\(s > a\) yakınsar).
- Ancak \(f(t) = e^{t^2}\) üstel mertebeden değildir; hiçbir gerçel \(s\) için Laplace dönüşümü var olmaz.

---

## 2. Temel Fonksiyonların Dönüşümleri (Örnek 6.1)

### 2.1 Sabit Fonksiyon: \(f(t) = 1\)

Tanım integrali doğrudan işletildiğinde:

$$ \mathcal{L}\{1\} = \int_0^\infty e^{-st} 1\,\mathrm{d}t = \left[-\frac{1}{s}e^{-st}\right]_0^\infty = \frac{1}{s}, \qquad s > 0 $$

\(s > 0\) olduğundan \(t \to \infty\) iken \(e^{-st} \to 0\) olur ve alt sınırdan \(1/s\) kalır.

### 2.2 Üstel Fonksiyon: \(f(t) = e^{at}\)

Çekirdek ile üstel fonksiyon tabanları birleştirilerek integre edilir:

$$ \mathcal{L}\{e^{at}\} = \int_0^\infty e^{-st} e^{at}\,\mathrm{d}t = \int_0^\infty e^{-(s-a)t}\,\mathrm{d}t = \frac{1}{s-a}, \qquad s > a $$

İntegralin yakınsaması için üssün katsayısının negatif olması, yani \(s - a > 0 \Longrightarrow s > a\) şarttır.

### 2.3 Sinüs ve Kosinüs: Euler Özdeşliği ile Eşzamanlı Çözüm

\(\cos\omega t\) ve \(\sin\omega t\) dönüşümlerini iki ayrı kısmi integrasyonla bulmak yerine, Euler formülü kullanılarak her iki dönüşüm tek bir üstel integralde çözülür:

$$ e^{i\omega t} = \cos\omega t + i\sin\omega t $$

\(e^{i\omega t}\) fonksiyonunun Laplace dönüşümü üstel kuraldan doğrudan yazılır (\(a = i\omega\)):

$$ \mathcal{L}\{e^{i\omega t}\} = \int_0^\infty e^{-(s-i\omega)t}\,\mathrm{d}t = \left[-\frac{1}{s-i\omega}e^{-(s-i\omega)t}\right]_0^\infty = \frac{1}{s-i\omega}, \qquad s > 0 $$

Pay ve payda karmaşık eşlenik \((s + i\omega)\) ile çarpılarak payda reel yapılır:

$$ \frac{1}{s-i\omega} = \frac{s+i\omega}{(s-i\omega)(s+i\omega)} = \frac{s+i\omega}{s^2+\omega^2} $$

Reel ve sanal kısımlar ayrıldığında sinüs ve kosinüsün Laplace dönüşümleri aynı anda elde edilir:

$$ \mathcal{L}\{\cos\omega t\} = \frac{s}{s^2+\omega^2}, \qquad \mathcal{L}\{\sin\omega t\} = \frac{\omega}{s^2+\omega^2}, \qquad s > 0 $$

---

## 3. Laplace Dönüşümünün Temel Özellikleri

### 3.1 Doğrusallık Özelliği

Laplace dönüşümü integral tabanlı olduğundan **doğrusal bir operatördür**. Sabit katsayılar dışarı çıkar ve toplamlar ayrılır:

$$ \mathcal{L}\{c_1 f_1(t) + c_2 f_2(t)\} = c_1 \mathcal{L}\{f_1(t)\} + c_2 \mathcal{L}\{f_2(t)\} $$

### 3.2 Türevin Laplace Dönüşümü (Diferansiyel Denklemleri Cebirselleştiren Kural)

\(f'(t)\) fonksiyonunun dönüşümü kısmi integrasyon (\(u = e^{-st}\), \(\mathrm{d}v = f'(t)\mathrm{d}t\)) ile hesaplanır:

$$ \mathcal{L}\{f'(t)\} = \int_0^\infty e^{-st} f'(t)\,\mathrm{d}t = \left[e^{-st} f(t)\right]_0^\infty - \int_0^\infty f(t)(-s e^{-st})\,\mathrm{d}t = s F(s) - f(0) $$

Bu bağıntı ardışık olarak ikinci ve yüksek mertebe türevlere genişletilir:

$$ \mathcal{L}\{f''(t)\} = s \mathcal{L}\{f'(t)\} - f'(0) = s\bigl(s F(s) - f(0)\bigr) - f'(0) = s^2 F(s) - s f(0) - f'(0) $$

Genel \(n\). mertebe türev için:

$$ \mathcal{L}\{f^{(n)}(t)\} = s^n F(s) - s^{n-1} f(0) - s^{n-2} f'(0) - \cdots - s f^{(n-2)}(0) - f^{(n-1)}(0) $$

> **Kritik Gözlem:** \(n\). mertebe türev \(s^n F(s)\) ana terimine ve başlangıç koşullarını içeren \(s\) polinomlarına dönüşür. Bu özellik, türev operatörünü doğrudan çarpmaya indirger!

### 3.3 Birinci Kaydırma Teoremi (Frekans Kayması)

Zaman bölgesinde bir fonksiyon \(e^{at}\) ile çarpıldığında, karmaşık frekans \(s\) bölgesinde \(s \to s - a\) ötelemesi gerçekleşir:

$$ \mathcal{L}\{e^{at} f(t)\} = \int_0^\infty e^{-st} e^{at} f(t)\,\mathrm{d}t = \int_0^\infty e^{-(s-a)t} f(t)\,\mathrm{d}t = F(s-a) $$

Bu teorem sayesinde sönümlü titreşimler (\(e^{at}\cos\omega t\), \(e^{at}\sin\omega t\)) ve üstel-polinom çarpımları (\(t^n e^{at}\)) hiçbir integrasyon yapmadan doğrudan yazılır.

### 3.4 s Bölgesinde Türev (t ile Çarpma Kuralı)

\(F(s)\) integralinin \(s\) parametresine göre türevi Leibniz kuralıyla integral içine sokulduğunda:

$$ \frac{\mathrm{d}}{\mathrm{d}s} F(s) = \frac{\mathrm{d}}{\mathrm{d}s} \int_0^\infty e^{-st} f(t)\,\mathrm{d}t = \int_0^\infty (-t)e^{-st} f(t)\,\mathrm{d}t = -\mathcal{L}\{t f(t)\} $$

Dolayısıyla zaman bölgesinde \(t\) ile çarpmak, \(s\) bölgesinde türev alıp eksi ile çarpmaya denktir:

$$ \mathcal{L}\{t f(t)\} = -\frac{\mathrm{d}}{\mathrm{d}s} F(s) = -F'(s) $$

Genel olarak \(t^n\) ile çarpım için:

$$ \mathcal{L}\{t^n f(t)\} = (-1)^n \frac{\mathrm{d}^n}{\mathrm{d}s^n} F(s) = (-1)^n F^{(n)}(s), \qquad n = 1, 2, \dots $$

---

## 4. Kitap Örnekleri ve Ayrıntılı Çözümleri

### 4.1 Örnek 6.2: \(f(t) = t^n\) Polinom Dönüşümü (İki Bağımsız Yoldan İspat)

**Çözüm Yolu 1 (Türev Kuralı ile İndirgeme):**
\(f(t) = t^n\) için \(f'(t) = n t^{n-1}\) ve \(f(0) = 0\)'dır. Türevin Laplace dönüşümü:

$$ \mathcal{L}\{n t^{n-1}\} = s \mathcal{L}\{t^n\} - 0 \quad \Longrightarrow \quad \mathcal{L}\{t^n\} = \frac{n}{s}\mathcal{L}\{t^{n-1}\} $$

\(\mathcal{L}\{1\} = 1/s\) başlangıç değeriyle ardışık adımlar işletildiğinde:
- \(n = 1\): \(\mathcal{L}\{t\} = (1/s)(1/s) = 1/s^2\)
- \(n = 2\): \(\mathcal{L}\{t^2\} = (2/s)(1/s^2) = 2!/s^3\)
- \(n = 3\): \(\mathcal{L}\{t^3\} = (3/s)(2/s^3) = 3!/s^4\)

Genel tümevarımla:

$$ \mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}}, \qquad s > 0, \quad n = 0, 1, 2, \dots $$

**Çözüm Yolu 2 (\(s\) Bölgesinde Türev Kuralı):**
\(t^n = t^n \cdot 1\) yazılarak \(f(t) = 1\) ve \(F(s) = 1/s\) üzerinden \(s\)-türevi alınır:

$$ \mathcal{L}\{t^n \cdot 1\} = (-1)^n \frac{\mathrm{d}^n}{\mathrm{d}s^n}\left(\frac{1}{s}\right) = (-1)^n \left[\frac{(-1)^n n!}{s^{n+1}}\right] = \frac{n!}{s^{n+1}} $$

İki farklı yol da tamamen aynı sonucu doğrular.

### 4.2 Örnek 6.3: Sönümlü Osilasyonlar (\(e^{at}\cos\omega t\) ve \(e^{at}\sin\omega t\))

Temel trigonometrik dönüşümler \(\mathcal{L}\{\cos\omega t\} = s/(s^2+\omega^2)\) ve \(\mathcal{L}\{\sin\omega t\} = \omega/(s^2+\omega^2)\)'dir. Birinci kaydırma teoremi \(\mathcal{L}\{e^{at}f(t)\} = F(s-a)\) uygulandığında:

$$ \mathcal{L}\{e^{at} \cos\omega t\} = \frac{s-a}{(s-a)^2+\omega^2}, \qquad \mathcal{L}\{e^{at} \sin\omega t\} = \frac{\omega}{(s-a)^2+\omega^2}, \qquad s > a $$

Paydaki \(s\) teriminin de \((s - a)\) olduğuna dikkat edilmelidir.

### 4.3 Örnek 6.4: Rezonans Terimleri (\(t\sin t\) ve \(t^2\sin t\))

\(f(t) = \sin t\) için \(F(s) = 1/(s^2+1)\)'dir.

**Birinci Mertebe (\(t\sin t\)):**

$$ \mathcal{L}\{t\sin t\} = -\frac{\mathrm{d}}{\mathrm{d}s}\left(\frac{1}{s^2+1}\right) = -\left[-\frac{2s}{(s^2+1)^2}\right] = \frac{2s}{(s^2+1)^2} $$

**İkinci Mertebe (\(t^2\sin t\)):**

$$ \mathcal{L}\{t^2\sin t\} = \frac{\mathrm{d}^2}{\mathrm{d}s^2}\left(\frac{1}{s^2+1}\right) = \frac{\mathrm{d}}{\mathrm{d}s}\left[-\frac{2s}{(s^2+1)^2}\right] = \frac{6s^2-2}{(s^2+1)^3} $$

Bölüm türevi alınırken paydaki \((s^2+1)\) çarpanının sadeleştirilmesi işlem hatasını önler.

### 4.4 Örnek 6.5: Birleşik Kaydırma ve Türev (\(t e^{at}\sin\omega t\))

Bu problemde iki işlem sırası izlenebilir:
1. Önce \(e^{at}\) kaydırması yapılır: \(G(s) = \mathcal{L}\{e^{at}\sin\omega t\} = \frac{\omega}{(s-a)^2+\omega^2}\).
2. Ardından \(t\) çarpanı için \(-d/ds\) türevi uygulanır:

$$ \mathcal{L}\{t e^{at}\sin\omega t\} = -\frac{\mathrm{d}}{\mathrm{d}s}\left[\frac{\omega}{(s-a)^2+\omega^2}\right] = \frac{2\omega(s-a)}{\bigl((s-a)^2+\omega^2\bigr)^2}, \qquad s > a $$

---

## 5. Laplace Dönüşümleri Karar ve Başvuru Matrisi

| Zaman Fonksiyonu \(f(t)\) | Laplace Dönüşümü \(F(s)\) | Yakınsama Apsisi | Temel Özellik / Kural |
|---|---|---|---|
| \(1\) | \(\frac{1}{s}\) | \(s > 0\) | Sabit çekirdek integrali |
| \(t^n\) (\(n = 0, 1, \dots\)) | \(\frac{n!}{s^{n+1}}\) | \(s > 0\) | Türev indirgemesi veya \(s\)-türevi |
| \(e^{at}\) | \(\frac{1}{s-a}\) | \(s > a\) | Üstel çekirdek integrali |
| \(\sin\omega t\) | \(\frac{\omega}{s^2+\omega^2}\) | \(s > 0\) | Euler özdeşliği (sanal kısım) |
| \(\cos\omega t\) | \(\frac{s}{s^2+\omega^2}\) | \(s > 0\) | Euler özdeşliği (reel kısım) |
| \(e^{at}\sin\omega t\) | \(\frac{\omega}{(s-a)^2+\omega^2}\) | \(s > a\) | Birinci frekans kaydırması |
| \(e^{at}\cos\omega t\) | \(\frac{s-a}{(s-a)^2+\omega^2}\) | \(s > a\) | Birinci frekans kaydırması |
| \(t\sin\omega t\) | \(\frac{2\omega s}{(s^2+\omega^2)^2}\) | \(s > 0\) | \(s\) bölgesinde türev (\(-F'\)) |
| \(t\cos\omega t\) | \(\frac{s^2-\omega^2}{(s^2+\omega^2)^2}\) | \(s > 0\) | \(s\) bölgesinde türev (\(-F'\)) |
| \(f'(t)\) | \(s F(s) - f(0)\) | \(s > s_0\) | Kısmi integrasyon |
| \(f''(t)\) | \(s^2 F(s) - s f(0) - f'(0)\) | \(s > s_0\) | İkinci mertebe türev |

---

## 6. Sınav Tuzakları ve Klinik Kontrol Listesi

1. **İşaret Tuzağı (s-Türevi):** \(\mathcal{L}\{t f(t)\} = -F'(s)\) formülündeki eksi işaretini unutma. \((-1)^n\) katsayısı tek dereceli kuvvetlerde negatif, çift dereceli kuvvetlerde pozitiftir.
2. **Kosinüs Kaydırma Tuzağı:** \(\mathcal{L}\{e^{at}\cos\omega t\}\) yazarken yalnızca paydadaki \(s\)'i değil, **paydaki \(s\)'i de \((s-a)\) yapmayı** asla atlama. Pay \(s\) değil \((s-a)\) olmalıdır!
3. **Yakınsama Apsisi:** Sınavda dönüşümün yanına \(s > s_0\) geçerlilik aralığını mutlaka yaz; paydanın sıfır olduğu kutup noktalarının (\(s = a\)) sağında kalındığını vurgula.
4. **Türev Kuralı Başlangıç Koşulları:** \(\mathcal{L}\{f''\} = s^2 F(s) - s f(0) - f'(0)\) açılımında \(s\) kuvvetlerinin azaldığını ve tüm başlangıç değerlerinin önünde **eksi** işareti bulunduğunu kontrol et.
