# §1.1 İnternet Nedir? (Donanım–Yazılım Anatomisi, Hizmetler ve Protokoller)

> **KAYNAK:** James F. Kurose & Keith W. Ross, *Computer Networking: A Top-Down Approach* (8. Baskı, Pearson, 2021), **§1.1 What Is the Internet?** (§1.1.1–§1.1.3), **basılı s. 2–9 (PDF s. 13–20)**; **Şekil 1.1 (basılı s. 3, PDF s. 14)** ve **Şekil 1.2 (basılı s. 7, PDF s. 18)**.

İnternet’i tek bir cümleyle tanımlamaya çalışırsak resmin yarısını kaçırırız. Kurose & Ross bu soruyu birbirini tamamlayan **iki farklı mercekten** yanıtlar:

1. **Somut Bileşenler ("Nuts-and-Bolts") Tanımı (§1.1.1):** İnternet’i oluşturan donanım ve yazılım parçaları nelerdir? (Uç sistemler, bağlantılar, paket anahtarları, ISP’ler ve TCP/IP protokolleri.)
2. **Hizmetler ("Services") Tanımı (§1.1.2):** İnternet, dağıtık uygulamalara (Web, e-posta, akış, oyun) nasıl bir programlama altyapısı ve **soket arayüzü** sunar?
3. **Protokol Nedir? (§1.1.3):** Uzaktaki iki sistemin birbirini anlayabilmesi için mesaj **biçimi (format)**, **sırası (order)** ve **eylemleri (actions)** nasıl tanımlanır?

---

## 1. Somut Bileşenler Tanımı: İnternet’in Parçaları (§1.1.1, Şekil 1.1)

İnternet, dünya genelinde milyarlarca bilişim aygıtını birbirine bağlayan bir **ağlar ağıdır** (*network of networks*). Geleneksel masaüstü bilgisayarlar, Linux iş istasyonları ve web/e-posta sunucularının yanı sıra akıllı telefonlar, tabletler, televizyonlar, oyun konsolları, otomobiller, trafik lambaları, akıllı termostatlar ve buzdolapları da artık ağa bağlıdır.

> **ZİHİN MODELİ — "Host" ve "End System" (Uç Sistem) Eş Anlamlıdır (Review Question R1):**
> İnternet terminolojisinde ağın kenarında yer alan tüm bu aygıtlara **konak (host)** veya **uç sistem (end system)** denir. Bir masaüstü bilgisayar da, bir akıllı termostat da, bir **Web sunucusu** da uç sistemdir; çünkü hepsi ağın çekirdeğinde değil **kenarında** oturur ve uygulama yazılımlarını çalıştırır.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 320" role="img" aria-label="Şekil 1.1 Uyarlaması: İnternet'in parçaları — Mobil Ağ, Ev Ağı, Kurumsal Ağ, Yerel/Bölgesel ISP, Küresel ISP ve İçerik Sağlayıcı / Veri Merkezi ağları">
    <rect x="16" y="16" width="218" height="88" rx="16" fill="#e0f2fe" fill-opacity="0.55" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="28" y="34" font-size="11" font-weight="700" fill="#0369a1">Mobil Ağ (Mobile Network)</text>
    <circle cx="52" cy="64" r="10" fill="#2563eb"/><text x="52" y="68" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">T</text>
    <text x="52" y="88" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Telefon</text>
    <circle cx="116" cy="64" r="10" fill="#64748b"/><text x="116" y="68" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">▲</text>
    <text x="116" y="88" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Baz İst.</text>
    <circle cx="188" cy="64" r="11" fill="#0f766e"/><text x="188" y="68" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <text x="188" y="88" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Yönlendirici</text>
    <line x1="62" y1="64" x2="106" y2="64" stroke="#334155" stroke-width="1.8"/>
    <line x1="126" y1="64" x2="177" y2="64" stroke="#334155" stroke-width="1.8"/>
    <rect x="16" y="118" width="218" height="84" rx="16" fill="#dcfce7" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="28" y="136" font-size="11" font-weight="700" fill="#15803d">Ev Ağı (Home Network)</text>
    <circle cx="52" cy="166" r="10" fill="#2563eb"/><text x="52" y="170" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">PC</text>
    <text x="52" y="190" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Dizüstü/IoT</text>
    <circle cx="116" cy="166" r="10" fill="#64748b"/><text x="116" y="170" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">◎</text>
    <text x="116" y="190" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">WiFi AP</text>
    <circle cx="188" cy="166" r="11" fill="#0f766e"/><text x="188" y="170" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <text x="188" y="190" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Ev Modem</text>
    <line x1="62" y1="166" x2="106" y2="166" stroke="#334155" stroke-width="1.8"/>
    <line x1="126" y1="166" x2="177" y2="166" stroke="#334155" stroke-width="1.8"/>
    <rect x="16" y="216" width="270" height="74" rx="16" fill="#ede9fe" fill-opacity="0.55" stroke="#7c3aed" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="28" y="234" font-size="11" font-weight="700" fill="#6d28d9">Kurumsal Ağ (Enterprise Network)</text>
    <circle cx="58" cy="260" r="10" fill="#2563eb"/><text x="58" y="264" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">Uç</text>
    <circle cx="146" cy="260" r="10" fill="#64748b"/><text x="146" y="264" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">⇄</text>
    <text x="146" y="282" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Bağlantı Anahtarı</text>
    <circle cx="242" cy="260" r="11" fill="#0f766e"/><text x="242" y="264" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <line x1="68" y1="260" x2="136" y2="260" stroke="#334155" stroke-width="1.8"/>
    <line x1="156" y1="260" x2="231" y2="260" stroke="#334155" stroke-width="1.8"/>
    <rect x="272" y="114" width="136" height="88" rx="16" fill="#fef3c7" fill-opacity="0.65" stroke="#d97706" stroke-width="1.4"/>
    <text x="340" y="133" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">Yerel / Bölgesel ISP</text>
    <circle cx="312" cy="166" r="11" fill="#0f766e"/><text x="312" y="170" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <circle cx="372" cy="166" r="11" fill="#0f766e"/><text x="372" y="170" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <line x1="323" y1="166" x2="361" y2="166" stroke="#334155" stroke-width="2"/>
    <rect x="356" y="16" width="166" height="82" rx="16" fill="#ffedd5" fill-opacity="0.65" stroke="#ea580c" stroke-width="1.4"/>
    <text x="439" y="34" text-anchor="middle" font-size="10.5" font-weight="700" fill="#c2410c">Ulusal / Küresel ISP (Tier-1)</text>
    <circle cx="404" cy="66" r="11" fill="#0f766e"/><text x="404" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <circle cx="474" cy="66" r="11" fill="#0f766e"/><text x="474" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <line x1="415" y1="66" x2="463" y2="66" stroke="#334155" stroke-width="2.2"/>
    <rect x="498" y="114" width="206" height="114" rx="16" fill="#f1f5f9" fill-opacity="0.8" stroke="#475569" stroke-width="1.4"/>
    <text x="601" y="133" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">İçerik Sağlayıcı &amp; Veri Merkezi</text>
    <circle cx="540" cy="176" r="11" fill="#0f766e"/><text x="540" y="180" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <rect x="616" y="150" width="64" height="52" rx="6" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="648" y="174" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Sunucu</text>
    <text x="648" y="189" text-anchor="middle" font-size="8.5" fill="#dbeafe">(Uç Sistem)</text>
    <line x1="551" y1="176" x2="616" y2="176" stroke="#334155" stroke-width="2.2"/>
    <line x1="199" y1="64" x2="393" y2="66" stroke="#0f766e" stroke-width="1.8"/>
    <line x1="199" y1="166" x2="301" y2="166" stroke="#0f766e" stroke-width="1.8"/>
    <line x1="253" y1="260" x2="312" y2="177" stroke="#0f766e" stroke-width="1.8"/>
    <line x1="340" y1="155" x2="404" y2="77" stroke="#0f766e" stroke-width="2"/>
    <line x1="383" y1="166" x2="529" y2="176" stroke="#0f766e" stroke-width="2"/>
    <line x1="474" y1="77" x2="540" y2="165" stroke="#0f766e" stroke-width="2"/>
    <g transform="translate(18, 304)" font-size="10" fill="var(--text,#334155)">
      <circle cx="8" cy="0" r="6" fill="#2563eb"/><text x="20" y="4">Uç Sistem / Sunucu (Host)</text>
      <circle cx="195" cy="0" r="6" fill="#0f766e"/><text x="207" y="4">Yönlendirici (Ağ Çekirdeği)</text>
      <circle cx="385" cy="0" r="6" fill="#64748b"/><text x="397" y="4">Bağlantı Anahtarı / Baz İstasyonu</text>
    </g>
  </svg>
  <figcaption><strong>Şekil 1.1 Uyarlaması (basılı s. 3, PDF s. 14):</strong> İnternet’in somut parçaları. Ev, mobil ve kurumsal ağlardaki uç sistemler (hosts); iletişim bağlantıları, erişim anahtarları ve ISP yönlendiricileri üzerinden küresel ağ çekirdeğine ve veri merkezlerine bağlanır.</figcaption>
</figure>

---

## 2. Paketler, Paket Anahtarları ve Otoyol Analojisi

Uç sistemler birbirine **iletişim bağlantıları** (*communication links*: koaksiyel kablo, bakır tel, fiber optik, radyo spektrumu) ve **paket anahtarları** (*packet switches*) ile bağlanır. Bir bağlantının veriyi iletme hızı **bit/saniye (bps)** cinsinden ölçülür.

Bir uç sistem başka bir uç sisteme \(F\) baytlık bir uygulama verisi göndereceğinde:
1. Veriyi her biri en fazla \(P_{\mathrm{data}}\) baytlık parçalara böler (**segmentasyon**).
2. Her parçanın önüne \(H\) baytlık **başlık (header)** bilgisi ekler; ortaya çıkan bilgi paketine **paket (packet)** denir.
3. Paketler hedefe doğru **rota / yol (route / path)** boyunca ilerler ve hedef uç sistemde yeniden birleştirilir.

Bu bölümlemenin temel sayısal bağıntıları şunlardır:

$$ K = \left\lceil \frac{F}{P_{\mathrm{data}}} \right\rceil $$

$$ L = P_{\mathrm{data}} + H $$

$$ \eta = \frac{F}{F + K \cdot H} $$

Burada \(K\) oluşturulan toplam paket sayısını, \(L\) dolu bir paketin toplam bayt boyutunu, \(K \cdot H\) toplam başlık ek yükünü (*header overhead*) ve \(\eta\) **protokol verimliliğini** (gerçek uygulama verisinin kabloya basılan toplam bayta oranını) gösterir.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 185" role="img" aria-label="Paket bölümleme, başlık ekleme ve kargo kamyonu / otoyol kavşağı analojisi">
    <rect x="18" y="34" width="118" height="44" rx="7" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
    <text x="77" y="54" text-anchor="middle" font-size="11" font-weight="700" fill="#1e3a8a">Uygulama Verisi</text>
    <text x="77" y="70" text-anchor="middle" font-size="10" fill="#1d4ed8">F bayt (Kargo)</text>
    <line x1="140" y1="56" x2="178" y2="56" stroke="#475569" stroke-width="2"/>
    <polygon points="182,56 174,51 174,61" fill="#475569"/>
    <g transform="translate(190, 26)">
      <rect x="0" y="0" width="32" height="24" rx="3" fill="#d97706"/><text x="16" y="16" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">H</text>
      <rect x="34" y="0" width="76" height="24" rx="3" fill="#2563eb"/><text x="72" y="16" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Parça 1</text>
      <rect x="0" y="32" width="32" height="24" rx="3" fill="#d97706"/><text x="16" y="48" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">H</text>
      <rect x="34" y="32" width="76" height="24" rx="3" fill="#2563eb"/><text x="72" y="48" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Parça 2</text>
      <rect x="0" y="64" width="32" height="24" rx="3" fill="#d97706"/><text x="16" y="80" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">H</text>
      <rect x="34" y="64" width="76" height="24" rx="3" fill="#2563eb"/><text x="72" y="80" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Parça K</text>
    </g>
    <text x="245" y="130" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Paketler (Kamyon Filosu)</text>
    <line x1="308" y1="56" x2="366" y2="56" stroke="#059669" stroke-width="2.4"/>
    <text x="337" y="46" text-anchor="middle" font-size="9.5" font-weight="700" fill="#059669">Bağlantı</text>
    <text x="337" y="74" text-anchor="middle" font-size="9" fill="var(--muted-ink,#52634c)">(Otoyol)</text>
    <circle cx="404" cy="56" r="24" fill="#e2e8f0" stroke="#0f766e" stroke-width="2"/>
    <text x="404" y="61" text-anchor="middle" font-size="14" font-weight="700" fill="#0f766e">✕</text>
    <text x="404" y="98" text-anchor="middle" font-size="10" font-weight="700" fill="#0f766e">Paket Anahtarı</text>
    <text x="404" y="112" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">(Kavşak)</text>
    <line x1="428" y1="56" x2="530" y2="56" stroke="#059669" stroke-width="2.4"/>
    <polygon points="534,56 525,51 525,61" fill="#059669"/>
    <text x="480" y="46" text-anchor="middle" font-size="9.5" font-weight="700" fill="#059669">Rota / Yol</text>
    <rect x="540" y="34" width="160" height="44" rx="7" fill="#dcfce7" stroke="#059669" stroke-width="1.8"/>
    <text x="620" y="54" text-anchor="middle" font-size="11" font-weight="700" fill="#065f46">Hedef Uç Sistem</text>
    <text x="620" y="70" text-anchor="middle" font-size="10" fill="#047857">Yeniden Birleştirme (Depo)</text>
    <text x="360" y="166" text-anchor="middle" font-size="10.5" fill="var(--muted-ink,#52634c)">Erişim ağlarında genellikle Bağlantı Katmanı Anahtarı (Link-layer switch), ağ çekirdeğinde ise Yönlendirici (Router) görev yapar.</text>
  </svg>
  <figcaption><strong>Paket Anahtarlama ve Ulaşım Analojisi (basılı s. 4, PDF s. 15):</strong> Paketler kargo kamyonlarına, iletişim bağlantıları otoyollara, paket anahtarları kavşaklara ve uç sistemler fabrika/depo binalarına karşılık gelir.</figcaption>
</figure>

Günümüz İnternet’inde en yaygın iki **paket anahtarı** türü vardır:
- **Bağlantı katmanı anahtarları (Link-layer switches):** Genellikle kurumsal/yerel **erişim ağlarında** kullanılır.
- **Yönlendiriciler (Routers):** Genellikle yüksek hızlı **ağ çekirdeğinde** kullanılır.

---

## 3. ISP Hiyerarşisi, TCP/IP ve İnternet Standartları (IETF / RFC vs IEEE 802)

Uç sistemler İnternet’e **İnternet Servis Sağlayıcıları (ISP)** üzerinden erişir (ev genişbant ISP’leri, üniversite/kurum ağları, havalimanı WiFi ve hücresel mobil ISP’ler). Her ISP kendi başına paket anahtarları ve bağlantılardan oluşan bir ağdır. Tüm uç sistemlerin birbirine ulaşabilmesi için alt katman erişim ISP’leri **bölgesel ISP’lere**, onlar da yüksek hızlı fiber optik omurgalara sahip **ulusal ve küresel (üst katman / Tier-1) ISP’lere** bağlanır.

Farklı üreticilerin donanım ve yazılımlarının birbiriyle sorunsuz konuşabilmesi (*interoperability*) için **standartlar** şarttır (**Review Question R3**):
- **IETF (Internet Engineering Task Force):** TCP, IP, HTTP, SMTP gibi İnternet protokollerini **RFC (Request for Comments)** belgeleriyle standartlaştırır (yaklaşık 9000’e yakın RFC vardır).
- **IEEE 802 LAN Standartları Komitesi:** Ethernet (802.3) ve kablosuz WiFi (802.11) gibi bağlantı katmanı standartlarını belirler.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 175" role="img" aria-label="ISP hiyerarşisi ve İnternet standart kuruluşları haritası: IETF RFC ve IEEE 802">
    <rect x="20" y="18" width="330" height="140" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="185" y="38" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">ISP Bağlantı Hiyerarşisi (Ağlar Ağı)</text>
    <rect x="75" y="48" width="220" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.3"/>
    <text x="185" y="65" text-anchor="middle" font-size="10.5" font-weight="700" fill="#c2410c">Üst Katman: Ulusal / Küresel ISP (Fiber)</text>
    <rect x="55" y="84" width="260" height="26" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.3"/>
    <text x="185" y="101" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">Orta Katman: Yerel / Bölgesel ISP</text>
    <rect x="35" y="120" width="300" height="26" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.3"/>
    <text x="185" y="137" text-anchor="middle" font-size="10.5" font-weight="700" fill="#15803d">Alt Katman: Erişim ISP’leri (Ev, Mobil, Kurum)</text>
    <rect x="370" y="18" width="330" height="140" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="535" y="38" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">Standart Kuruluşları (Birlikte Çalışabilirlik)</text>
    <rect x="388" y="50" width="294" height="44" rx="7" fill="#dbeafe" stroke="#2563eb" stroke-width="1.3"/>
    <text x="535" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="#1e3a8a">IETF · RFC Belgeleri (~9000 RFC)</text>
    <text x="535" y="84" text-anchor="middle" font-size="10" fill="#1d4ed8">TCP, IP, HTTP (Web), SMTP (E-posta)</text>
    <rect x="388" y="104" width="294" height="42" rx="7" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.3"/>
    <text x="535" y="122" text-anchor="middle" font-size="11" font-weight="700" fill="#5b21b6">IEEE 802 LAN Standartları Komitesi</text>
    <text x="535" y="138" text-anchor="middle" font-size="10" fill="#6d28d9">Ethernet (802.3) ve Kablosuz WiFi (802.11)</text>
  </svg>
  <figcaption><strong>ISP Hiyerarşisi ve Standartlar (basılı s. 5, PDF s. 16):</strong> Her ISP bağımsız yönetilir ama ortak IP protokolünü ve RFC/IEEE standartlarını uyguladığı için farklı üreticilerin cihazları küresel ölçekte birlikte çalışır.</figcaption>
</figure>

---

## 4. Hizmetler Tanımı ve Soket Arayüzü (§1.1.2)

İnternet’i ikinci bir bakış açısıyla **dağıtık uygulamalara hizmet sağlayan bir altyapı** olarak tanımlayabiliriz. Web, e-posta, anlık mesajlaşma, canlı trafik haritaları, video akışı ve çok oyunculu oyunlar birden fazla uç sistem arasında veri alışverişi yaptığı için **dağıtık uygulama (distributed application)** adını alır.

> **KRİTİK MİMARİ İLKE:** İnternet uygulamaları **yalnızca uç sistemlerde** çalışır; ağ çekirdeğindeki paket anahtarlarında (yönlendiricilerde) **çalışmaz**. Yönlendiriciler verinin bir video karesi mi yoksa e-posta mı olduğuyla ilgilenmez; yalnızca paketleri hedefe doğru iletir.

Peki bir uç sistemde çalışan program (Java, C, Python vb.), başka bir uç sistemdeki programa veri göndermesi için İnternet altyapısına nasıl talimat verir? Bunun cevabı **soket arayüzüdür (socket interface)**. Kurose & Ross bunu **posta hizmeti analojisi** ile açıklar:
- Alice mektubu pencereden dışarı atamaz; mektubu zarfa koymalı, üzerine Bob’un adını/adresini/posta kodunu yazmalı, zarfı kapatıp pul yapıştırmalı ve resmi posta kutusuna bırakmalıdır.
- Benzer biçimde, gönderici uygulama verisini **soket arayüzünün** kurallarına uygun biçimde İnternet altyapısına teslim eder; İnternet de tıpkı ekspres teslimat, alındı onayı veya normal posta gibi farklı taşıma hizmetleri sunar.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 175" role="img" aria-label="Hizmetler tanımı ve soket arayüzü: posta hizmeti analojisi ve uygulamaların yalnız uç sistemlerde çalışması">
    <rect x="20" y="20" width="166" height="126" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
    <text x="103" y="42" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1e3a8a">Gönderici Uç Sistem</text>
    <rect x="34" y="54" width="138" height="34" rx="6" fill="#2563eb"/>
    <text x="103" y="70" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Uygulama (Alice)</text>
    <text x="103" y="83" text-anchor="middle" font-size="8.5" fill="#dbeafe">Mektup = Veri</text>
    <rect x="34" y="98" width="138" height="34" rx="6" fill="#d97706"/>
    <text x="103" y="114" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Soket Arayüzü</text>
    <text x="103" y="127" text-anchor="middle" font-size="8.5" fill="#fef3c7">Zarf + Adres + Posta Kutusu</text>
    <line x1="186" y1="115" x2="250" y2="115" stroke="#0f766e" stroke-width="2.6"/>
    <polygon points="254,115 245,110 245,120" fill="#0f766e"/>
    <rect x="256" y="42" width="208" height="104" rx="14" fill="#f1f5f9" stroke="#64748b" stroke-width="1.6" stroke-dasharray="5 3"/>
    <text x="360" y="64" text-anchor="middle" font-size="11.5" font-weight="700" fill="#334155">İnternet Altyapısı (Çekirdek)</text>
    <text x="360" y="82" text-anchor="middle" font-size="10" fill="#64748b">Posta Taşıma Ağı (Yönlendiriciler)</text>
    <rect x="282" y="96" width="156" height="34" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="1.3"/>
    <text x="360" y="112" text-anchor="middle" font-size="10" font-weight="700" fill="#b91c1c">Uygulama Burada Çalışmaz!</text>
    <text x="360" y="125" text-anchor="middle" font-size="8.5" fill="#991b1b">Yalnız paket başlığı iletilir</text>
    <line x1="464" y1="115" x2="528" y2="115" stroke="#0f766e" stroke-width="2.6"/>
    <polygon points="532,115 523,110 523,120" fill="#0f766e"/>
    <rect x="534" y="20" width="166" height="126" rx="10" fill="#dcfce7" stroke="#059669" stroke-width="1.6"/>
    <text x="617" y="42" text-anchor="middle" font-size="11.5" font-weight="700" fill="#065f46">Alıcı Uç Sistem</text>
    <rect x="548" y="54" width="138" height="34" rx="6" fill="#059669"/>
    <text x="617" y="70" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Uygulama (Bob)</text>
    <text x="617" y="83" text-anchor="middle" font-size="8.5" fill="#dcfce7">Veriyi Teslim Alır</text>
    <rect x="548" y="98" width="138" height="34" rx="6" fill="#d97706"/>
    <text x="617" y="114" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Soket Arayüzü</text>
    <text x="617" y="127" text-anchor="middle" font-size="8.5" fill="#fef3c7">Teslimat Kapısı</text>
  </svg>
  <figcaption><strong>Hizmetler Tanımı ve Soket Arayüzü (basılı s. 5–6, PDF s. 16–17):</strong> Dağıtık uygulamalar yalnızca uç sistemlerde çalışır ve İnternet altyapısına posta kurallarına benzeyen soket arayüzü üzerinden veri teslim eder.</figcaption>
</figure>

---

## 5. Protokol Nedir? (§1.1.3, Şekil 1.2)

İnternet’te iki veya daha fazla uzak bileşenin katıldığı her etkileşimi bir **protokol** yönetir. Kurose & Ross’un kanonik tanımı üç temel sütun üzerine kuruludur (**basılı s. 9, PDF s. 20**):

> **PROTOKOL TANIMI:** Bir protokol, iletişim kuran iki veya daha fazla varlık arasında alınıp verilen mesajların **biçimini (format)** ve **sırasını (order)**, ayrıca bir mesajın iletilmesi, alınması veya **başka bir olay (ör. zaman aşımı)** gerçekleştiğinde alınacak **eylemleri (actions)** tanımlar.

İnsan protokolünde birine saati sormadan önce `"Merhaba"` deyip karşılık `"Merhaba"` bekleriz; eğer karşı taraf `"İngilizce bilmiyorum"` derse veya hiç yanıt vermezse saat sorusunu sormayız. Bilgisayar ağı protokolünde de tarayıcınız bir web sayfası istemeden önce sunucuya **TCP bağlantı isteği** gönderir, **TCP bağlantı yanıtı** geldiğinde `GET` mesajıyla belgeyi talep eder ve sunucu `<dosya>` yanıtını döndürür:

<figure class="lesson-figure">
  <svg viewBox="0 0 720 270" role="img" aria-label="Şekil 1.2 Uyarlaması: İnsan protokolü ile bilgisayar ağı protokolünün (TCP + HTTP GET) yan yana karşılaştırması">
    <text x="175" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#1e3a8a">İnsan Protokolü (Saat Sorma)</text>
    <rect x="44" y="34" width="76" height="28" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.4"/>
    <text x="82" y="52" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1e3a8a">Kişi A</text>
    <rect x="230" y="34" width="76" height="28" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.4"/>
    <text x="268" y="52" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1e3a8a">Kişi B</text>
    <line x1="82" y1="66" x2="82" y2="240" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 4"/>
    <line x1="268" y1="66" x2="268" y2="240" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 4"/>
    <line x1="86" y1="84" x2="260" y2="108" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="264,109 255,103 254,113" fill="#0284c7"/>
    <text x="175" y="88" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Merhaba (Hi)</text>
    <line x1="264" y1="122" x2="90" y2="146" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="86,147 96,141 97,151" fill="#0284c7"/>
    <text x="175" y="128" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Merhaba (Hi)</text>
    <line x1="86" y1="162" x2="260" y2="186" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="264,187 255,181 254,191" fill="#0284c7"/>
    <text x="175" y="168" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Saat kaç?</text>
    <line x1="264" y1="202" x2="90" y2="226" stroke="#059669" stroke-width="2.2"/>
    <polygon points="86,227 96,221 97,231" fill="#059669"/>
    <text x="175" y="208" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">2:00</text>
    <text x="82" y="256" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">Zaman ↓</text>
    <text x="268" y="256" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">Zaman ↓</text>
    <line x1="358" y1="18" x2="358" y2="255" stroke="var(--line,#cbd5e1)" stroke-width="1.2" stroke-dasharray="4 4"/>
    <text x="538" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#065f46">Bilgisayar Ağı Protokolü (TCP + HTTP)</text>
    <rect x="394" y="34" width="90" height="28" rx="6" fill="#dcfce7" stroke="#059669" stroke-width="1.4"/>
    <text x="439" y="52" text-anchor="middle" font-size="10.5" font-weight="700" fill="#065f46">İstemci PC</text>
    <rect x="596" y="34" width="96" height="28" rx="6" fill="#dcfce7" stroke="#059669" stroke-width="1.4"/>
    <text x="644" y="52" text-anchor="middle" font-size="10.5" font-weight="700" fill="#065f46">Web Sunucu</text>
    <line x1="439" y1="66" x2="439" y2="240" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 4"/>
    <line x1="644" y1="66" x2="644" y2="240" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 4"/>
    <line x1="443" y1="84" x2="636" y2="108" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="640,109 631,103 630,113" fill="#0284c7"/>
    <text x="541" y="88" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">TCP bağlantı isteği</text>
    <line x1="640" y1="122" x2="447" y2="146" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="443,147 453,141 454,151" fill="#0284c7"/>
    <text x="541" y="128" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">TCP bağlantı yanıtı</text>
    <line x1="443" y1="162" x2="636" y2="186" stroke="#d97706" stroke-width="2.2"/>
    <polygon points="640,187 631,181 630,191" fill="#d97706"/>
    <text x="541" y="168" text-anchor="middle" font-size="10" font-weight="700" fill="#b45309">GET http://.../cs-resources/</text>
    <line x1="640" y1="202" x2="447" y2="226" stroke="#059669" stroke-width="2.2"/>
    <polygon points="443,227 453,221 454,231" fill="#059669"/>
    <text x="541" y="208" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">&lt;dosya&gt; (Web Sayfası)</text>
    <text x="439" y="256" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">Zaman ↓</text>
    <text x="644" y="256" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">Zaman ↓</text>
  </svg>
  <figcaption><strong>Şekil 1.2 Uyarlaması (basılı s. 7, PDF s. 18):</strong> Bir insan protokolü ile TCP/HTTP bilgisayar ağı protokolünün birebir paralelliği. Her iki etkileşimde de önce bağlantı/selamlaşma (1. gidiş-dönüş), ardından istek ve veri teslimi (2. gidiş-dönüş) sırayla gerçekleşir.</figcaption>
</figure>

Bu iki gidiş-dönüşlü (*round-trip*) protokol etkileşiminin toplam gecikmesini (gidiş-dönüş süresi \(\mathrm{RTT}\), dosya boyutu \(L_{\mathrm{file}}\) ve bağlantı hızı \(R\) cinsinden) ilk yaklaşımla şöyle yazabiliriz:

$$ T_{\mathrm{exchange}} = 2\,\mathrm{RTT} + \frac{L_{\mathrm{file}}}{R} $$

| Protokol Sütunu | İnsan Protokolü (Şekil 1.2 sol) | Ağ Protokolü (Şekil 1.2 sağ) |
| :--- | :--- | :--- |
| **Biçim (Format)** | Selamlaşma cümlesi, saat sorusu, `SS:DD` yanıtı | TCP SYN / SYN-ACK segmentleri, `HTTP GET <URL>`, `<dosya>` |
| **Sıra (Order)** | Önce `"Merhaba"` / `"Merhaba"`, sonra `"Saat kaç?"` | Önce TCP bağlantı el sıkışması, sonra `HTTP GET` |
| **Eylemler (Actions)** | Reddedilirse veya yanıt gelmezse sormaktan vazgeç | Zaman aşımında yeniden dene veya bağlantıyı sonlandır |
