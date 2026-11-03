# §1.1 · Motive edici örnekler

**Kaynak:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §1.1, basılı s.1–6 / PDF s.19–24. Bu metin, altı örneğin fiziksel mantığını açıklayan özgün Türkçe çalışma uyarlamasıdır; birebir çeviri değildir. Altıncı örneğin koşulları basılı s.6'da, §1.2 başlamadan önce yer alır.

## Bu konuyu bitirince

Bir fiziksel durum için bilinmeyen fonksiyonu seçebilecek, bağımsız değişkeni söyleyebilecek, temel denge yasasını kurabilecek ve modelin hangi varsayımlar altında geçerli olduğunu açıklayabileceksin. Bu aşamada bütün denklemleri çözmek hedefimiz değil.

Her örnekte aynı dört soruyu sor:

1. **Ne değişiyor?** Konum, yoğunluk, şekil veya sehim gibi bilinmeyeni seç.
2. **Neye göre değişiyor?** Zamana, konuma veya ikisine birden mi?
3. **Değişimi ne belirliyor?** Kuvvet dengesi veya madde dengesi gibi fiziksel yasayı yaz.
4. **Nereden başlıyor ve nerede geçerli?** Başlangıç/sınır koşullarını ve varsayımları belirt.

## 1. Hava dirençli atış · s.1–2

Bir cisim v₀ hızıyla, yatayla θ₀ açısı yaparak fırlatılıyor. Konumu x(t), y(t); hız bileşenleri x′, y′; ivme bileşenleri x″, y″. Yukarıyı pozitif y yönü seçiyoruz.

Kitaptaki direnç modeli hızla orantılıdır: direnç vektörü −βv. β'nın birimi kg/s, β/m'nin birimi s⁻¹'dir. Kuvvetin yönü her bileşende hızın tersidir. Newton'un ikinci yasası iki yönde ayrı yazılır:


$$
m\ddot{x}+\beta\dot{x}=0
$$



$$
m\ddot{y}+\beta\dot{y}=-mg
$$

Başlangıç koşulları x(0)=y(0)=0, x′(0)=v₀ cos θ₀ ve y′(0)=v₀ sin θ₀'dır. Yatay yönde yerçekimi yoktur. β=0 olunca x″=0, fakat y″=−g kalır. Dolayısıyla yalnızca yatay hız sabittir.

**Deney:** Laboratuvarda β'yı artırıp dirençli ve dirençsiz yörüngeleri karşılaştır. Aynı β için kütle artınca β/m azalır. Grafikteki parametreler kitaptan alınmış sayısal veriler değil, keşif değerleridir. Analitik eğriler bu modelden türetilen ek görselleştirmelerdir. Cisim zemine geri döndüğünde çizim durur; yer altına devam eden bir uçuş çizilmez. Doğrusal hava direnci her gerçek akış rejimine uymaz.

## 2. Karışım tankı · s.2–3

Tanka Qin debisiyle, cin kirletici oranında sıvı giriyor; Qout debisiyle sıvı çıkıyor. Tam karışım varsayımı nedeniyle çıkıştaki oran, tank içindeki c(t) ile aynıdır. Debiler sabitse hacim:


$$
V(t)=V_0+(Q_{in}-Q_{out})t
$$

Kirletici miktarını M=Vc olarak yaz. Giren kirletici Qin cin, çıkan kirletici Qout c olduğundan M′=Qin cin−Qout c. Hacim de değişiyorsa türev alırken **ürün kuralını** kullanmalısın: M′=Vc′+V′c. V′=Qin−Qout yerine konup sadeleştirilirse:


$$
V(t)\frac{dc}{dt}+Q_{in}c=Q_{in}c_{in}
$$

Bu sadeleşmede c'nin katsayısı Qin olur. Qout etkisizleşmez; V(t) içinde kalır. Qin=Qout olduğunda hacim sabittir ve c′=(Qin/V₀)(cin−c) elde edilir.

Laboratuvar iç hesaplarında yoğunluk 0–1 arası oran, ekranda yüzde olarak gösterilir. Örneğin %10 = 0,10. V₀=100 L, Qin=Qout=5 L/dk, c₀=%10, cin=%2 iken ilk yoğunluk değişimi −0,004 oran/dk, yani **−0,4 yüzde puan/dk** olur. Yüzde değişim ile yüzde puanı karıştırma.

V(0)=V₀ ve c(0)=c₀ başlangıç verileridir. Tank boşalırsa V=0 olur ve model son bulur. Fiziksel bir tankın kapasitesi sonludur; taşma varsa model yeniden kurulmalıdır. Bu deney kapasite sınırı olmayan ideal bir tankı inceler ve boşalmadan önce durur.

## 3. Asma köprü kablosu · s.3–4

Yük, tabliyeden askılar aracılığıyla kabloya aktarılır. Orijin kablonun en alçak noktasında olsun. y(x) kablonun yüksekliği, w(x) yatay uzunluk başına dağıtılmış yük ve H sabit yatay gerilme bileşenidir. Düşey denge:


$$
\frac{d^2y}{dx^2}=\frac{w(x)}{H}
$$

Burada türevler **zamana değil yatay konuma** göredir. Diferansiyel denklem, hareketsiz bir yapının şeklini de anlatabilir. Orijin en alçak noktadaysa y(0)=0 ve y′(0)=0 alınır.

Sabit w için profilin ikinci türevi y″ sabittir ve iki integralle y=wx²/(2H) bulunur. Bunu kablonun kendi ağırlığı altındaki modelle karıştırma: yükün yatay uzunluk başına sabit olması ayrı bir varsayımdır. H büyüdüğünde aynı yük için profilin ikinci türevi y″ azalır. y″ ile geometrik eğrilik aynı büyüklük değildir.

## 4. Deprem etkisindeki tek katlı bina · s.4

x(t) katın mutlak hareketi, x₀(t) zeminin hareketidir. Yay ve sönümün etkisini basitçe yazmak için göreli koordinatı y=x−x₀ seç. Böylece x″=y″+x₀″ olur. Newton yasası:


$$
m\ddot{y}+c\dot{y}+ky=-m\ddot{x}_0
$$

Soldaki üç terim sırasıyla göreli ivmeyle ilişkili atalet, sönüm ve yay kuvvetidir. Sağdaki −m x₀″ terimi, zemin hareketinin bu koordinattaki zorlayıcı etkisidir. Tüm bina hareketini x₀ ile veya yalnızca y ile özdeşleştirmek yanlış olur.

Başlangıçta y ve y′ bilinmelidir. Zemin sabit hızla hareket ediyorsa x₀″=0 olur; sürekli zorlayıcı terim yoktur, fakat başlangıç koşullarından serbest titreşim oluşabilir. Model tek serbestlik dereceli, doğrusal ve küçük hareket varsayımlıdır.

## 5. Ek kütleli titreşim sönümleyici · s.4–5

Bir ekipmanın hareketi x(t), eklenen kütleninki xₐ(t) olsun. İki kütleyi bağlayan yay ve sönüm, göreli yer değiştirme ve göreli hıza tepki verir. Her kütle için ayrı kuvvet dengesi kur:


$$
m\ddot{x}+(c+c_a)\dot{x}+(k+k_a)x-c_a\dot{x}_a-k_ax_a=F_0\sin(\Omega t)
$$



$$
m_a\ddot{x}_a+c_a\dot{x}_a+k_ax_a-c_a\dot{x}-k_ax=0
$$

Bağlantı kuvvetleri iki kütleye eşit ve zıt yönlerde etkir. Denklemleri toplayınca cₐ ve kₐ bağlantılarının iç kuvvetleri birbirini götürmelidir. Bu, işaretler için fiziksel bir kontroldür.

İki hareket birbirine bağlıdır; her birini diğerinden bağımsız çözemezsin. Başlangıçta iki konum ve iki hız gerekir. Ek kütlenin titreşimi ne kadar azalttığı frekans ve parametrelere bağlıdır; her durumda iyileşme vaat edilmez. Bu derste bağlı sistemin formülasyonu incelenir; titreşim çözümü simülasyonu sunulmaz.

## 6. Hareketli yük altındaki köprü · s.5–6

Köprünün sehimi hem nerede ölçtüğüne hem ne zaman ölçtüğüne bağlıdır: v(x,t). Basit mesnetli kirişin uzunluğu L, eğilme rijitliği EI, birim uzunluk başına kütlesi ρA olsun. P ağırlıklı araç sabit U hızıyla geçsin:


$$
\rho A\frac{\partial^2v}{\partial t^2}+EI\frac{\partial^4v}{\partial x^4}=P\delta(x-Ut)
$$

vtt zamana göre ikinci, vxxxx konuma göre dördüncü türevdir. Pδ(x−Ut), x=Ut noktasındaki tekil yükü dağılım biçiminde gösterir. Dirac deltası sıradan bir fonksiyonun sonlu yüksekliği gibi yorumlanmaz. Yük, 0≤t≤L/U aralığında köprü üzerindedir.

Başlangıçta köprü duruyorsa:


$$
v(x,0)=\frac{\partial v}{\partial t}(x,0)=0
$$

Basit mesnetlerde hem sehim hem eğilme momenti sıfırdır. Sabit EI için bu koşullar:


$$
v(0,t)=v(L,t)=\frac{\partial^2v}{\partial x^2}(0,t)=\frac{\partial^2v}{\partial x^2}(L,t)=0
$$

Hareketi belirlemek için yalnızca başlangıç bilgisi yetmez; köprünün uçlarında ne olduğuna da ihtiyaç vardır. Model küçük sehimli, sönümsüz Euler–Bernoulli kirişi varsayar. Bu derste modelin anlamı ve koşulları açıklanır; hareketli kiriş çözümü simüle edilmez.

## Konuyu tamamlamadan önce

Her örnek için bilinmeyeni, bağımsız değişkeni, fiziksel dengeyi ve bir varsayımı kendi cümlenle yaz. Laboratuvardaki iki grafikte bir parametreyi değiştirmeden önce sonuç tahmini yap. Ardından altı kavrama sorusunu çöz.

Bu sürüm yalnızca §1.1'i ekler. §1.2 “Genel Kavramlar ve Tanımlar”, bu konu incelendikten sonra ele alınacaktır.
