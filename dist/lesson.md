# Isınma ve soğuma

Bu Türkçe çalışma notu, Wei-Chau Xie, *Differential Equations for Engineers* (Cambridge University Press, 2010), **§3.1, basılı sayfa 87–90 / PDF sayfa 105–108** temelinde hazırlanmıştır. Birebir çeviri veya tüm kitabın doğrulanmış aktarımı değildir. Aşağıdaki iki model kitaptaki Örnek 3.1 ve 3.2'yi izler; deney arayüzü, keşif soruları ve alıştırmalar bu uygulama için hazırlanmıştır.

## 1. Fizikten denkleme

Bir cismin sıcaklığı ile ortamın sıcaklığı arasındaki fark, ısı alışverişini belirler. Cismin her noktasının yaklaşık aynı sıcaklıkta olduğu ve ortamın sıcaklığının sabit kaldığı bir model kullanalım. Newton'un soğuma yasası:

$$
\frac{dT}{dt}=-k(T-T_m)
$$

- **T(t):** Cismin sıcaklığı (°C).
- **Tₘ:** Sabit ortam sıcaklığı (°C).
- **k > 0:** Isıl tepki katsayısı. Zaman dakika ise birimi dk⁻¹ olur.

T, Tₘ'den büyükse türev negatiftir ve cisim soğur. T, Tₘ'den küçükse türev pozitiftir ve cisim ısınır. T = Tₘ ise sıcaklık değişmez. Aynı denklem bu üç durumu da kapsar.

## 2. Denklemden çözüme

Önce denge çözümü T(t) = Tₘ'yi ayrı tutarız. T ≠ Tₘ için değişkenleri ayırıp integralleriz:

$$
\ln|T-T_m|=-kt+C
$$

Başlangıç koşulu T(0) = Tᵢ uygulandığında:

$$
T(t)=T_m+(T_i-T_m)e^{-kt}
$$

Bu sonuçta üstel azalan büyüklük **sıcaklığın kendisi değil, ortamla arasındaki farktır**. Zaman sabiti τ = 1/k sürede bu fark başlangıç değerinin yaklaşık %36,8'ine iner. Farkın yarılanma süresi:

$$
t_{1/2}=\frac{\ln 2}{k}
$$

Model, ortam sıcaklığına sonlu zamanda tam olarak ulaşmaz; sıcaklık farkı sıfıra yaklaşır. Fiziksel ölçümler ise sonlu hassasiyete sahiptir.

## 3. Kitaptaki soğuma problemi · Örnek 3.1

Kitaptaki veriler: ortam 20 °C, başlangıç 100 °C; 20 dakika sonra cisim 60 °C'dir. Önce k'yı gözlemden buluruz:

$$
k=-\frac{1}{20}\ln\left(\frac{60-20}{100-20}\right)=\frac{\ln 2}{20}
$$

Dolayısıyla k ≈ 0,034657 dk⁻¹. Ortamla sıcaklık farkı 20 dakikada yarıya iner. Sırasıyla 80 → 40 → 20 → 10 °C farkları, cismin 100 → 60 → 40 → 30 °C sıcaklıklarına karşılık gelir.

**Sonuç:** 30 °C'ye başlangıçtan itibaren 60 dakikada ulaşır. Gözlemin yapıldığı 20. dakikadan sonra **40 dakika daha** gerekir. Toplam süre ile kalan süreyi ayırmak bu sorunun önemli noktasıdır.

Deneyde **Kitaptaki örneği yükle** düğmesi bu verileri getirir. Zamanı 20, 40 ve 60 dakikaya taşıyarak çözümü kontrol et.

## 4. Isıtılan bina · Örnek 3.2

İkinci örnekte dış sıcaklık zamanla değişir ve ısıtıcı sıcaklığa bağlı tepki verir. Isı girişinden kaybı çıkararak enerji dengesini kurarız:

$$
c\frac{dT_B}{dt}=Q+K_2(T_S-T_B)-K_1(T_B-T_A)
$$

Burada c ısıl kapasite, K₁ dış ortamla ısı alışverişi katsayısı, K₂ ısıtıcının geri besleme katsayısı, Tₛ hedef sıcaklık, Q sabit ısı girdisidir. Dış sıcaklığın ortalaması T₀ iken bina Tₛ'de dengede kalacaksa **Q = K₁(Tₛ − T₀)** seçilir.

Dış sıcaklığı Tₐ(t) = T₀ + T₁ sin(ωt), sıcaklık sapmasını θ = Tʙ − Tₛ, zaman sabitini τ = c/K₁ ve geri besleme oranını r = K₂/K₁ alırsak:

$$
\tau\frac{d\theta}{dt}+(1+r)\theta=T_1\sin(\omega t)
$$

Sönümlenen geçici terimden sonra binanın sıcaklığı da sinüzoidal değişir. Bu kalıcı rejimdeki sıcaklık salınımının genliği:

$$
A=\frac{T_1}{\sqrt{(1+r)^2+(\tau\omega)^2}}
$$

Faz gecikmesi φ = arctan[τω/(1+r)] olur. Saat cinsinden gecikme φ/ω'dır. r arttıkça genlik azalır; τ büyüdükçe bina hızlı dış değişimlere daha yavaş tepki verir. Genlik formülü, başlangıçtaki geçici davranışın bütün tepe değerlerini kapsayan bir sınır değildir.

Kitapta T₁ = 12 °C, τ = 4 saat ve periyot 24 saattir. Kalıcı genliğin en fazla 3 °C olması için:

$$
r\geq\sqrt{16-(\pi/3)^2}-1\approx 2.86049
$$

Bina deneyinde **Kitaptaki sınır koşulu** düğmesi bu durumu yükler. Çizimde görünen iç sıcaklık, Tʙ(0) = Tₛ başlangıç koşulunu da içeren tam çözümdür. Görselleştirmede T₀ = 10 °C ve Tₛ = 22 °C seçilmiştir; bunlar kitabın genlik hesabına eklenen uygulama değerleridir. Sabit katsayılı doğrusal modelde kalıcı genlik bu iki ortalamadan bağımsızdır. Isıtıcı doygunluğu gibi etkiler bu modelde yoktur.

## 5. Deneyi nasıl kullanmalı?

1. Bir parametreyi değiştirmeden önce sonucu tahmin et.
2. Parametreyi değiştir ve grafiği incele.
3. Gözlemini denklemdeki terimlerle açıkla.
4. Alıştırmaları çöz ve gerekçeni not defterine yaz.

Soğuma deneyindeki kesikli turuncu çizgi, ileri Euler yaklaşımıdır. Her adımda sıcaklığı Tₙ₊₁ = Tₙ − hk(Tₙ − Tₘ) ile günceller. Adım büyüklüğünü azaltınca analitik çözüme yaklaşmasını inceleyebilirsin. Bu sayısal karşılaştırma uygulamaya eklenmiştir; kitabın sayısal yöntemleri ele aldığı §10.1'e bağ kurar.

## 6. Ön bilgiler ve kapsam

Gerekli ön bilgiler: türev, üstel fonksiyon, belirli olmayan integral ve başlangıç koşulu. Çözüm yönteminin kitap içindeki ön koşulu **§2.1 Değişkenlerin ayrılması, basılı s.16**; bina modeli için ayrıca **§2.4 Birinci mertebe doğrusal denklemler, basılı s.55**.

Bu prototipte §3.1 çalışma içeriği, iki deney, dört alıştırma ve yerel not defteri bulunur. Kitap haritası tüm ana bölümleri listeler; diğer bölümler henüz derslere dönüştürülmemiştir. LLM API henüz bağlı değildir. İpuçları ve alıştırma geri bildirimleri önceden hazırlanmıştır.
