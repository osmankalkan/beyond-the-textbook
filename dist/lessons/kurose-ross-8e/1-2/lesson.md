# §1.2 Ağ Kenarı: Erişim Ağları ve Fiziksel Ortamlar

> **KAYNAK:** James F. Kurose & Keith W. Ross, *Computer Networking: A Top-Down Approach* (8. Baskı, Pearson, 2021), **§1.2 The Network Edge** (§1.2.1 Access Networks, §1.2.2 Physical Media), **basılı s. 9–22 (PDF s. 20–33)**; **Şekil 1.3–1.9** ve **Tekrar Soruları R4–R9 (basılı s. 66, PDF s. 77)**.

Ağın **kenarında (network edge)** bulunan uç sistemler (istemciler, sunucular ve veri merkezleri) küresel İnternet çekirdeğine **erişim ağları (access networks)** aracılığıyla bağlanır. Bir erişim ağı, bir uç sistemi hedefe giden yoldaki **ilk yönlendiriciye (kenar yönlendirici / edge router)** fiziksel olarak bağlayan ağdır.

Bu derste iki temel mühendislik sorusunu görsel olarak kavrayacağız:
1. **Erişim Ağları (§1.2.1):** Ev, kurum ve mobil cihazlar ilk yönlendiriciye nasıl bağlanır? Hangi teknolojiler **adanmış (dedicated)**, hangileri **paylaşımlı (shared)** hat kullanır?
2. **Fiziksel Ortamlar (§1.2.2):** Bitleri taşıyan elektromanyetik dalgalar veya ışık darbeleri hangi **kılavuzlu (guided)** ve **kılavuzsuz (unguided)** ortamlardan geçer?

---

## 1. Ev Erişimi I: DSL ve Frekans Bölmeli Çoklama (§1.2.1, Şekil 1.5)

**DSL (Digital Subscriber Line)**, evlerdeki mevcut telefon bakır hattını kullanarak doğrudan yerel telefon santralindeki (Central Office, **CO**) **DSLAM** (*Digital Subscriber Line Access Multiplexer*) cihazına bağlanır.

- **Adanmış (Dedicated) Hat:** Her evin telefon santraline giden kendi bakır çifti vardır; komşularınızın indirme yapması sizin DSL erişim hattınızın hızını bölmez.
- **Asimetrik Hız:** İndirme (*downstream*, ör. 24–52 Mbps) yüklemeden (*upstream*, ör. 3,5–16 Mbps) daha hızlıdır; hız santrale olan mesafe arttıkça düşer (tipik sınır 5–10 mil).
- **Tek Kabloda 3 Ayrı Kanal (FDM):** Ses (0–4 kHz), yükleme (4–50 kHz) ve indirme (50 kHz–1 MHz) farklı frekans bantlarına yerleştirildiği için telefon görüşmesiyle internet aynı anda çalışır.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 195" role="img" aria-label="Şekil 1.5 Uyarlaması: DSL internet erişimi, splitter, 3 frekans kanallı bakır telefon hattı ve santraldeki DSLAM">
    <rect x="16" y="18" width="188" height="156" rx="10" fill="#dcfce7" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.5"/>
    <text x="110" y="38" text-anchor="middle" font-size="11.5" font-weight="700" fill="#15803d">Ev (Adanmış Bakır Hat)</text>
    <rect x="30" y="54" width="68" height="30" rx="5" fill="#2563eb"/><text x="64" y="73" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Ev PC</text>
    <rect x="30" y="92" width="68" height="24" rx="4" fill="#3b82f6"/><text x="64" y="108" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">DSL Modem</text>
    <rect x="30" y="128" width="68" height="30" rx="5" fill="#475569"/><text x="64" y="147" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Telefon</text>
    <rect x="122" y="84" width="66" height="44" rx="6" fill="#d97706"/><text x="155" y="110" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Splitter</text>
    <line x1="98" y1="104" x2="122" y2="104" stroke="#334155" stroke-width="1.8"/>
    <line x1="98" y1="143" x2="122" y2="116" stroke="#334155" stroke-width="1.8"/>
    <line x1="188" y1="106" x2="432" y2="106" stroke="#059669" stroke-width="3.2"/>
    <rect x="214" y="28" width="194" height="66" rx="7" fill="var(--surface,#fff)" stroke="#059669" stroke-width="1.4"/>
    <text x="311" y="46" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">Mevcut Telefon Hattı (FDM)</text>
    <text x="311" y="61" text-anchor="middle" font-size="9.5" fill="var(--text,#1e293b)">0–4 kHz: Geleneksel Ses</text>
    <text x="311" y="75" text-anchor="middle" font-size="9.5" fill="#d97706">4–50 kHz: Yükleme (Upstream)</text>
    <text x="311" y="89" text-anchor="middle" font-size="9.5" font-weight="700" fill="#2563eb">50 kHz–1 MHz: İndirme (Downstream)</text>
    <rect x="434" y="22" width="150" height="148" rx="10" fill="#e0f2fe" fill-opacity="0.65" stroke="#0284c7" stroke-width="1.5"/>
    <text x="509" y="42" text-anchor="middle" font-size="11" font-weight="700" fill="#0369a1">Telefon Santrali (CO)</text>
    <rect x="458" y="66" width="102" height="44" rx="6" fill="#0f766e"/><text x="509" y="92" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">DSLAM</text>
    <rect x="458" y="124" width="102" height="30" rx="5" fill="#64748b"/><text x="509" y="143" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Telefon Şebekesi</text>
    <line x1="509" y1="110" x2="509" y2="124" stroke="#334155" stroke-width="1.8"/>
    <line x1="560" y1="88" x2="626" y2="88" stroke="#0f766e" stroke-width="2.6"/>
    <polygon points="630,88 621,83 621,93" fill="#0f766e"/>
    <rect x="632" y="66" width="72" height="44" rx="8" fill="#1e293b"/><text x="668" y="92" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">İnternet</text>
  </svg>
  <figcaption><strong>Şekil 1.5 Uyarlaması (basılı s. 13, PDF s. 24):</strong> DSL erişim mimarisi. Evdeki ayırıcı (splitter) ses ve veri sinyallerini ayırır; her ev santraldeki DSLAM’a kendi adanmış bükümlü bakır telefon hattıyla bağlanır.</figcaption>
</figure>

---

## 2. Ev Erişimi II: HFC Kablo Ağı — Paylaşımlı Yayın Ortamı (§1.2.1, Şekil 1.6)

Kablo internet erişimi, kablo TV altyapısını kullanır. Kablo merkezinden (*cable head end*) mahalle düğümlerine (*fiber node*) kadar **fiber optik**, mahalle düğümünden 500–5.000 eve kadar ise **koaksiyel kablo** uzandığı için **HFC (Hybrid Fiber Coax)** adını alır. Kablo merkezindeki **CMTS** (*Cable Modem Termination System*), DSL’deki DSLAM ile benzer dönüşümü yapar (DOCSIS 2.0: 40/30 Mbps; DOCSIS 3.0: 1,2 Gbps / 100 Mbps’ye kadar).

> **SINAV TUZAĞI — HFC PAYLAŞIMLIDIR! (Review Question R5):**
> HFC bir **paylaşımlı yayın ortamıdır (shared broadcast medium)**. \(N_{\mathrm{active}}\) komşu aynı anda büyük bir video indiriyorsa her birinin etkin indirme hızı kabaca paylaşılır:

$$ R_{\mathrm{user}} = \frac{R_{\mathrm{down}}}{N_{\mathrm{active}}} $$

> - **İndirme (Downstream) kanalında çarpışma olur mu?** **Hayır!** Çünkü indirme kanalında tek gönderici CMTS’tir; gönderdiği her paket tüm evlere yayınlanır.
> - **Yükleme (Upstream) kanalında çarpışma olur mu?** **Evet!** Birçok ev aynı paylaşımlı yükleme kanalını kullandığı için çarpışmaları önlemek üzere dağıtık bir çoklu erişim protokolü gerekir.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 190" role="img" aria-label="Şekil 1.6 Uyarlaması: Hibrit Fiber-Koaksiyel (HFC) paylaşımlı kablo erişim ağı, fiber düğüm ve CMTS">
    <rect x="20" y="22" width="112" height="28" rx="5" fill="#2563eb"/><text x="76" y="40" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Ev 1 (Kablo Modem)</text>
    <rect x="20" y="60" width="112" height="28" rx="5" fill="#2563eb"/><text x="76" y="78" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Ev 2 (Kablo Modem)</text>
    <rect x="20" y="98" width="112" height="28" rx="5" fill="#2563eb"/><text x="76" y="116" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Ev 3 (Kablo Modem)</text>
    <text x="76" y="148" text-anchor="middle" font-size="10" font-weight="700" fill="#b45309">500–5.000 ev (Paylaşımlı)</text>
    <line x1="132" y1="36" x2="236" y2="78" stroke="#d97706" stroke-width="2.2"/>
    <line x1="132" y1="74" x2="236" y2="78" stroke="#d97706" stroke-width="2.2"/>
    <line x1="132" y1="112" x2="236" y2="78" stroke="#d97706" stroke-width="2.2"/>
    <text x="184" y="132" text-anchor="middle" font-size="9.5" font-weight="700" fill="#d97706">Koaksiyel Kablo</text>
    <rect x="236" y="50" width="112" height="56" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
    <text x="292" y="74" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">Fiber Düğüm</text>
    <text x="292" y="90" text-anchor="middle" font-size="9" fill="#92400e">(Mahalle Kavşağı)</text>
    <line x1="348" y1="78" x2="452" y2="78" stroke="#0f766e" stroke-width="3.2"/>
    <text x="400" y="66" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f766e">Fiber Optik</text>
    <rect x="452" y="42" width="132" height="72" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
    <text x="518" y="62" text-anchor="middle" font-size="10" font-weight="700" fill="#0369a1">Kablo Merkezi</text>
    <rect x="474" y="70" width="88" height="32" rx="5" fill="#0f766e"/><text x="518" y="90" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">CMTS</text>
    <line x1="584" y1="78" x2="634" y2="78" stroke="#0f766e" stroke-width="2.6"/>
    <rect x="634" y="56" width="68" height="44" rx="8" fill="#1e293b"/><text x="668" y="82" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">İnternet</text>
    <rect x="20" y="160" width="682" height="22" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
    <text x="361" y="175" text-anchor="middle" font-size="10" font-weight="700" fill="#92400e">Downstream: CMTS tek göndericidir (çarpışma yok) · Upstream: Evler ortak kanalı paylaşır (çoklu erişim protokolü şart)</text>
  </svg>
  <figcaption><strong>Şekil 1.6 Uyarlaması (basılı s. 14, PDF s. 25):</strong> Hibrit Fiber-Koaksiyel (HFC) erişim ağı. Evler aynı koaksiyel yayın ortamını paylaştığı için eşzamanlı indirmelerde hız kullanıcılar arasında bölünür.</figcaption>
</figure>

---

## 3. FTTH (Eve Kadar Fiber — PON) ve Kurumsal Ethernet LAN (§1.2.1, Şekil 1.7–1.8)

**FTTH (Fiber to the Home)** santralden eve kadar optik fiber uzatarak gigabit/sn düzeyinde erişim sağlar. En yaygın dağıtım mimarisi **PON (Passive Optical Network)**’dir:
- Her evdeki **ONT** (*Optical Network Terminator*) mahalledeki **optik ayırıcıya** (*optical splitter*, tipik olarak 100’den az ev) bağlanır; oradan tek paylaşımlı fiberle santraldeki **OLT** (*Optical Line Terminator*) cihazına ulaşır.

**Kurumsal ve Üniversite Ağlarında Ethernet (Şekil 1.8):** Kullanıcılar bükümlü bakır tel (*twisted-pair*, ör. Cat 6a) üzerinden **100 Mbps – 10 Gbps** hızla yerel **Ethernet anahtarına** (*Ethernet switch*), o da kurumsal yönlendirici üzerinden ISP’ye bağlanır.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 185" role="img" aria-label="Şekil 1.7 ve 1.8 Uyarlaması: FTTH PON fiber erişimi ile kurumsal Ethernet LAN mimarisinin yan yana karşılaştırması">
    <rect x="16" y="16" width="336" height="152" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="184" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f766e">FTTH · Pasif Optik Ağ (PON, Şekil 1.7)</text>
    <rect x="28" y="52" width="60" height="24" rx="4" fill="#2563eb"/><text x="58" y="68" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">ONT 1</text>
    <rect x="28" y="88" width="60" height="24" rx="4" fill="#2563eb"/><text x="58" y="104" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">ONT 2</text>
    <rect x="28" y="124" width="60" height="24" rx="4" fill="#2563eb"/><text x="58" y="140" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">ONT n</text>
    <line x1="88" y1="64" x2="146" y2="100" stroke="#059669" stroke-width="2"/>
    <line x1="88" y1="100" x2="146" y2="100" stroke="#059669" stroke-width="2"/>
    <line x1="88" y1="136" x2="146" y2="100" stroke="#059669" stroke-width="2"/>
    <rect x="146" y="76" width="76" height="48" rx="6" fill="#dcfce7" stroke="#059669" stroke-width="1.5"/>
    <text x="184" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#065f46">Optik</text>
    <text x="184" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#065f46">Ayırıcı</text>
    <line x1="222" y1="100" x2="262" y2="100" stroke="#059669" stroke-width="2.8"/>
    <rect x="262" y="76" width="76" height="48" rx="6" fill="#0f766e"/>
    <text x="300" y="98" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">OLT</text>
    <text x="300" y="113" text-anchor="middle" font-size="8.5" fill="#ccfbf1">(Santral CO)</text>
    <rect x="368" y="16" width="336" height="152" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="536" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1e3a8a">Kurumsal Ethernet LAN (Şekil 1.8)</text>
    <rect x="380" y="52" width="66" height="24" rx="4" fill="#2563eb"/><text x="413" y="68" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">PC (1 Gbps)</text>
    <rect x="380" y="88" width="66" height="24" rx="4" fill="#2563eb"/><text x="413" y="104" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">PC (1 Gbps)</text>
    <rect x="380" y="124" width="66" height="24" rx="4" fill="#1d4ed8"/><text x="413" y="140" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">Sunucu 10G</text>
    <line x1="446" y1="64" x2="500" y2="100" stroke="#2563eb" stroke-width="2"/>
    <line x1="446" y1="100" x2="500" y2="100" stroke="#2563eb" stroke-width="2"/>
    <line x1="446" y1="136" x2="500" y2="100" stroke="#2563eb" stroke-width="2"/>
    <rect x="500" y="76" width="82" height="48" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
    <text x="541" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1e3a8a">Ethernet</text>
    <text x="541" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1e3a8a">Anahtarı</text>
    <line x1="582" y1="100" x2="616" y2="100" stroke="#334155" stroke-width="2.6"/>
    <rect x="616" y="76" width="76" height="48" rx="6" fill="#475569"/>
    <text x="654" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Kurumsal</text>
    <text x="654" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Yönl. → ISP</text>
  </svg>
  <figcaption><strong>Şekil 1.7 &amp; 1.8 Uyarlaması (basılı s. 16–17, PDF s. 27–28):</strong> Solda FTTH Pasif Optik Ağ (ONT → Optik Ayırıcı → OLT), sağda kurumsal Ethernet LAN (bükümlü bakır tel ile 100 Mbps–10 Gbps anahtarlamalı erişim).</figcaption>
</figure>

---

## 4. Tipik Ev Ağı ve Kablosuz Erişim: WiFi (802.11) vs 4G/5G (§1.2.1, Şekil 1.9)

Modern ev ağları genişbant erişimi (Kablo/DSL/FTTH modem) ile yerel **WiFi (IEEE 802.11)** erişim noktasını ve kablolu Ethernet’i tek çatı altında birleştirir:
- **Kablosuz LAN (WiFi — 802.11):** Erişim noktasından **birkaç on metre** menzil içinde 100 Mbps’nin üzerinde paylaşımlı hız sunar.
- **Geniş Alan Kablosuz (4G LTE / 5G Hücresel):** Hücresel baz istasyonundan **onlarca kilometre** menzil içinde mobil erişim sağlar (4G gerçek dünya indirme hızı ~60 Mbps’ye kadar, 5G çok daha yüksek).

<figure class="lesson-figure">
  <svg viewBox="0 0 720 175" role="img" aria-label="Şekil 1.9 Uyarlaması: Tipik ev ağı (Kablo/DSL modem, yönlendirici, WiFi erişim noktası, kablolu ve kablosuz cihazlar) ve 4G/5G geniş alan karşılaştırması">
    <rect x="18" y="18" width="444" height="142" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
    <text x="34" y="38" font-size="11.5" font-weight="700" fill="#15803d">Tipik Ev Ağı (Şekil 1.9 · WiFi Menzili: Birkaç On Metre)</text>
    <rect x="34" y="54" width="84" height="32" rx="5" fill="#2563eb"/><text x="76" y="74" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Dizüstü / IoT</text>
    <rect x="34" y="106" width="84" height="32" rx="5" fill="#475569"/><text x="76" y="126" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Kablolu PC</text>
    <line x1="118" y1="70" x2="178" y2="70" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 3"/>
    <text x="148" y="62" text-anchor="middle" font-size="8.5" font-weight="700" fill="#0284c7">WiFi 802.11</text>
    <rect x="178" y="52" width="76" height="36" rx="6" fill="#0284c7"/><text x="216" y="74" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">WiFi AP</text>
    <line x1="254" y1="70" x2="294" y2="96" stroke="#334155" stroke-width="2"/>
    <line x1="118" y1="122" x2="294" y2="104" stroke="#334155" stroke-width="2"/>
    <rect x="294" y="74" width="68" height="46" rx="6" fill="#0f766e"/><text x="328" y="101" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Ev Yönl.</text>
    <line x1="362" y1="97" x2="386" y2="97" stroke="#334155" stroke-width="2"/>
    <rect x="386" y="74" width="64" height="46" rx="6" fill="#d97706"/><text x="418" y="101" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Modem</text>
    <line x1="462" y1="97" x2="504" y2="97" stroke="#0f766e" stroke-width="2.6"/>
    <rect x="504" y="20" width="198" height="140" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
    <text x="603" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="#1e3a8a">Geniş Alan (4G / 5G)</text>
    <text x="603" y="56" text-anchor="middle" font-size="9.5" fill="#1d4ed8">Menzil: Onlarca Kilometre</text>
    <rect x="526" y="76" width="62" height="36" rx="5" fill="#2563eb"/><text x="557" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Telefon</text>
    <line x1="588" y1="94" x2="622" y2="94" stroke="#2563eb" stroke-width="2" stroke-dasharray="4 3"/>
    <rect x="622" y="72" width="66" height="44" rx="6" fill="#0f766e"/><text x="655" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Baz İst.</text>
    <text x="603" y="142" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">4G: ~60 Mbps · 5G: çok daha yüksek</text>
  </svg>
  <figcaption><strong>Şekil 1.9 Uyarlaması (basılı s. 18, PDF s. 29):</strong> Tipik ev ağı kablo/DSL modemi, yönlendirici ve WiFi erişim noktasını birleştirir; mobil cihazlar ise dışarıda onlarca km menzilli 4G/5G hücresel baz istasyonlarına bağlanır.</figcaption>
</figure>

---

## 5. Fiziksel Ortamlar: Kılavuzlu vs Kılavuzsuz Ortamlar (§1.2.2)

Bir bit kaynaktan hedefe giderken bir dizi verici–alıcı çiftinden geçer ve her adımda fiziksel bir ortam üzerinde elektromanyetik dalga veya ışık darbesi olarak yayılır. Fiziksel ortamlar iki ana sınıfa ayrılır:

1. **Kılavuzlu Ortamlar (Guided Media):** Dalgalar katı bir fiziksel ortam boyunca yönlendirilir:
   - **Bükümlü Bakır Tel (Twisted-Pair Copper, UTP):** En ucuz ve en yaygın LAN ortamıdır; tellerin sarmal bükülmesi komşu çiftlerden gelen elektriksel paraziti azaltır. Modern **Cat 6a** kablo 100 m’ye kadar **10 Gbps** hıza ulaşır.
   - **Koaksiyel Kablo (Coaxial Cable):** Eş merkezli iki bakır iletkenden oluşur; kablo TV / HFC ağlarında paylaşımlı yayın ortamı olarak kullanılır.
   - **Fiber Optik (Optical Fiber):** Işık darbeleri taşır; elektromanyetik parazite bağışıktır, 100 km’ye kadar çok düşük zayıflamaya sahiptir ve dinlenmesi çok zordur. Optik Taşıyıcı (**OC-n**) hızları:

$$ R_{\mathrm{OC}-n} = n \cdot 51.8 $$

   *(Mbps cinsinden; ör. OC-1 = 51,8 Mbps, OC-48 ≈ 2,49 Gbps, OC-192 ≈ 9,95 Gbps, OC-768 ≈ 39,8 Gbps.)*

2. **Kılavuzsuz Ortamlar (Unguided Media):** Dalgalar atmosferde ve uzayda yayılır (karasal radyo kanalları: Bluetooth 1–2 m, WiFi 10–100 m, hücresel 10+ km; ve **uydu radyo kanalları**).
   - **Jeosenkron Uydular (Geostationary, GEO):** Yeryüzünden \(h = 36{,}000\text{ km}\) yükseklikte sabit kalır; yer istasyonu → uydu → yer istasyonu mesafesi çok büyük olduğundan yaklaşık **280 ms** tek yönlü yayılma gecikmesi yaratır:

$$ d_{\mathrm{prop,sat}} \approx \frac{2 h}{c} $$

   - **Alçak Yörünge Uyduları (LEO):** Dünya’ya çok daha yakındır (ör. \(h \approx 550\text{ km}\)), sürekli kapsama için uydu takımyıldızı gerektirir ama yayılma gecikmesi birkaç milisaniyeye düşer.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 195" role="img" aria-label="Fiziksel ortamlar özeti: Kılavuzlu (Bükümlü bakır, Koaksiyel, Fiber optik) vs Kılavuzsuz (Karasal radyo, LEO ve 36000 km Jeosenkron Uydu)">
    <rect x="16" y="16" width="338" height="162" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="185" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1e3a8a">Kılavuzlu Ortamlar (Guided Media)</text>
    <rect x="30" y="48" width="310" height="34" rx="6" fill="#dbeafe" stroke="#2563eb"/>
    <text x="42" y="69" font-size="10.5" font-weight="700" fill="#1e3a8a">Bükümlü Bakır (UTP Cat 6a): 100 m’de 10 Gbps · En ucuz LAN</text>
    <rect x="30" y="90" width="310" height="34" rx="6" fill="#fef3c7" stroke="#d97706"/>
    <text x="42" y="111" font-size="10.5" font-weight="700" fill="#92400e">Koaksiyel Kablo: Eş merkezli · HFC paylaşımlı ortam</text>
    <rect x="30" y="132" width="310" height="34" rx="6" fill="#dcfce7" stroke="#059669"/>
    <text x="42" y="153" font-size="10.5" font-weight="700" fill="#065f46">Fiber Optik: Işık darbesi · Parazitsiz · OC-n (10–100+ Gbps)</text>
    <rect x="366" y="16" width="338" height="162" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="535" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#b45309">Kılavuzsuz Ortamlar (Unguided Media)</text>
    <rect x="380" y="48" width="310" height="34" rx="6" fill="#ede9fe" stroke="#7c3aed"/>
    <text x="392" y="69" font-size="10.5" font-weight="700" fill="#5b21b6">Karasal Radyo: Kısa (BT), Yerel (WiFi), Geniş (4G/5G)</text>
    <rect x="380" y="90" width="310" height="34" rx="6" fill="#ffedd5" stroke="#ea580c"/>
    <text x="392" y="111" font-size="10.5" font-weight="700" fill="#c2410c">GEO Uydu: h = 36.000 km · Sabit · ~280 ms gecikme</text>
    <rect x="380" y="132" width="310" height="34" rx="6" fill="#e0f2fe" stroke="#0284c7"/>
    <text x="392" y="153" font-size="10.5" font-weight="700" fill="#0369a1">LEO Uydu: Alçak yörünge (~550 km) · Çok düşük gecikme</text>
  </svg>
  <figcaption><strong>Fiziksel Ortamlar Karşılaştırması (§1.2.2, basılı s. 18–21, PDF s. 29–32):</strong> Kablo maliyeti çoğu zaman kurulum işçiliğinin yanında küçüktür; bu yüzden binalara sıklıkla bakır, koaksiyel ve fiber birlikte döşenir.</figcaption>
</figure>

$$ T_{\mathrm{transfer}} = \frac{8 \cdot F_{\mathrm{MB}}}{R_{\mathrm{eff}}} $$

| Erişim Teknolojisi | Ortam | Paylaşımlı mı? | Tipik İndirme Hızı | Tipik Yükleme Hızı |
| :--- | :--- | :--- | :--- | :--- |
| **DSL (Şekil 1.5)** | Bükümlü bakır | **Adanmış** | 24–52 Mbps | 3,5–16 Mbps |
| **HFC Kablo (Şekil 1.6)** | Fiber + Koaksiyel | **Paylaşımlı** | 40 Mbps – 1,2 Gbps | 30–100 Mbps |
| **FTTH PON (Şekil 1.7)** | Optik fiber | **Paylaşımlı (<100 ev)** | ~1 Gbps+ | ~100 Mbps–1 Gbps |
| **Ethernet LAN (Şekil 1.8)** | Bükümlü bakır / Fiber | **Adanmış (anahtarlı)** | 100 Mbps – 10 Gbps | 100 Mbps – 10 Gbps |
| **WiFi 802.11 (Şekil 1.9)** | Karasal radyo | **Paylaşımlı** | 100+ Mbps | 100+ Mbps |
| **4G LTE / 5G** | Hücresel radyo | **Paylaşımlı** | ~60 Mbps (4G) / 5G+ | ~20 Mbps+ |
