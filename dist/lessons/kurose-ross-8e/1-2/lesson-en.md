# §1.2 The Network Edge: Access Networks and Physical Media

> **SOURCE:** James F. Kurose & Keith W. Ross, *Computer Networking: A Top-Down Approach* (8th Edition, Pearson, 2021), **§1.2 The Network Edge** (§1.2.1 Access Networks, §1.2.2 Physical Media), **printed pp. 9–22 (PDF pp. 20–33)**; **Figures 1.3–1.9** and **Review Questions R4–R9 (printed p. 66, PDF p. 77)**.

End systems (clients, servers, and datacenters) sitting at the **network edge** connect to the global Internet core through **access networks**. An access network physically connects an end system to the **first router (the edge router)** on a path from that end system to any other distant end system.

In this lesson we explore two core engineering questions visually:
1. **Access Networks (§1.2.1):** How do home, enterprise, and mobile devices reach the edge router? Which technologies provide a **dedicated** line versus a **shared** medium?
2. **Physical Media (§1.2.2):** Which **guided** and **unguided** physical media carry bits as electromagnetic waves or optical pulses?

---

## 1. Home Access I: DSL and Frequency-Division Multiplexing (§1.2.1, Figure 1.5)

**DSL (Digital Subscriber Line)** uses a residence’s existing twisted-pair telephone line to connect directly to a **DSLAM** (*Digital Subscriber Line Access Multiplexer*) in the local telephone company’s central office (**CO**).

- **Dedicated Line:** Each home has its own twisted-pair wire to the CO; neighbors downloading large files do not divide your DSL access rate.
- **Asymmetric Rates:** Downstream rates (e.g., 24–52 Mbps) exceed upstream rates (e.g., 3.5–16 Mbps); achievable speed drops with distance from the CO (typically limited to 5–10 miles).
- **3 Frequency Channels on One Wire (FDM):** Ordinary voice (0–4 kHz), upstream data (4–50 kHz), and downstream data (50 kHz–1 MHz) occupy distinct frequency bands, allowing phone calls and Internet traffic simultaneously.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 195" role="img" aria-label="Adapted from Figure 1.5: DSL Internet access with home splitter, 3-band FDM telephone line, and central office DSLAM">
    <rect x="16" y="18" width="188" height="156" rx="10" fill="#dcfce7" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.5"/>
    <text x="110" y="38" text-anchor="middle" font-size="11.5" font-weight="700" fill="#15803d">Home (Dedicated Copper)</text>
    <rect x="30" y="54" width="68" height="30" rx="5" fill="#2563eb"/><text x="64" y="73" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Home PC</text>
    <rect x="30" y="92" width="68" height="24" rx="4" fill="#3b82f6"/><text x="64" y="108" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">DSL Modem</text>
    <rect x="30" y="128" width="68" height="30" rx="5" fill="#475569"/><text x="64" y="147" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Phone</text>
    <rect x="122" y="84" width="66" height="44" rx="6" fill="#d97706"/><text x="155" y="110" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Splitter</text>
    <line x1="98" y1="104" x2="122" y2="104" stroke="#334155" stroke-width="1.8"/>
    <line x1="98" y1="143" x2="122" y2="116" stroke="#334155" stroke-width="1.8"/>
    <line x1="188" y1="106" x2="432" y2="106" stroke="#059669" stroke-width="3.2"/>
    <rect x="214" y="28" width="194" height="66" rx="7" fill="var(--surface,#fff)" stroke="#059669" stroke-width="1.4"/>
    <text x="311" y="46" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">Existing Phone Line (FDM)</text>
    <text x="311" y="61" text-anchor="middle" font-size="9.5" fill="var(--text,#1e293b)">0–4 kHz: Voice Telephone</text>
    <text x="311" y="75" text-anchor="middle" font-size="9.5" fill="#d97706">4–50 kHz: Upstream Data</text>
    <text x="311" y="89" text-anchor="middle" font-size="9.5" font-weight="700" fill="#2563eb">50 kHz–1 MHz: Downstream Data</text>
    <rect x="434" y="22" width="150" height="148" rx="10" fill="#e0f2fe" fill-opacity="0.65" stroke="#0284c7" stroke-width="1.5"/>
    <text x="509" y="42" text-anchor="middle" font-size="11" font-weight="700" fill="#0369a1">Central Office (CO)</text>
    <rect x="458" y="66" width="102" height="44" rx="6" fill="#0f766e"/><text x="509" y="92" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">DSLAM</text>
    <rect x="458" y="124" width="102" height="30" rx="5" fill="#64748b"/><text x="509" y="143" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Tel. Network</text>
    <line x1="509" y1="110" x2="509" y2="124" stroke="#334155" stroke-width="1.8"/>
    <line x1="560" y1="88" x2="626" y2="88" stroke="#0f766e" stroke-width="2.6"/>
    <polygon points="630,88 621,83 621,93" fill="#0f766e"/>
    <rect x="632" y="66" width="72" height="44" rx="8" fill="#1e293b"/><text x="668" y="92" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Internet</text>
  </svg>
  <figcaption><strong>Adapted from Figure 1.5 (printed p. 13, PDF p. 24):</strong> DSL access architecture. A home splitter separates voice and data signals; each residence has a dedicated twisted-pair telephone line to the central office DSLAM.</figcaption>
</figure>

---

## 2. Home Access II: HFC Cable — A Shared Broadcast Medium (§1.2.1, Figure 1.6)

Cable Internet uses the cable television infrastructure. Fiber optics run from the **cable head end** to neighborhood junctions (**fiber nodes**), and traditional **coaxial cable** fans out to 500–5,000 homes—hence **HFC (Hybrid Fiber Coax)**. At the head end, the **CMTS** (*Cable Modem Termination System*) plays the role analogous to DSL’s DSLAM (DOCSIS 2.0: 40/30 Mbps; DOCSIS 3.0: up to 1.2 Gbps down / 100 Mbps up).

> **EXAM TRAP — HFC IS SHARED! (Review Question R5):**
> HFC is a **shared broadcast medium**. If \(N_{\mathrm{active}}\) neighbors simultaneously download large videos, each user’s effective downstream rate drops roughly as:

$$ R_{\mathrm{user}} = \frac{R_{\mathrm{down}}}{N_{\mathrm{active}}} $$

> - **Are collisions possible on the downstream HFC channel?** **No!** The CMTS is the sole sender on the downstream broadcast channel.
> - **Are collisions possible on the upstream channel?** **Yes!** Because multiple homes share the upstream channel, a distributed multiple access protocol is required to coordinate transmissions.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 190" role="img" aria-label="Adapted from Figure 1.6: Hybrid Fiber-Coaxial (HFC) shared cable access network with fiber node and CMTS">
    <rect x="20" y="22" width="112" height="28" rx="5" fill="#2563eb"/><text x="76" y="40" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Home 1 (Modem)</text>
    <rect x="20" y="60" width="112" height="28" rx="5" fill="#2563eb"/><text x="76" y="78" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Home 2 (Modem)</text>
    <rect x="20" y="98" width="112" height="28" rx="5" fill="#2563eb"/><text x="76" y="116" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Home 3 (Modem)</text>
    <text x="76" y="148" text-anchor="middle" font-size="10" font-weight="700" fill="#b45309">500–5,000 homes (Shared)</text>
    <line x1="132" y1="36" x2="236" y2="78" stroke="#d97706" stroke-width="2.2"/>
    <line x1="132" y1="74" x2="236" y2="78" stroke="#d97706" stroke-width="2.2"/>
    <line x1="132" y1="112" x2="236" y2="78" stroke="#d97706" stroke-width="2.2"/>
    <text x="184" y="132" text-anchor="middle" font-size="9.5" font-weight="700" fill="#d97706">Coaxial Cable</text>
    <rect x="236" y="50" width="112" height="56" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
    <text x="292" y="74" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">Fiber Node</text>
    <text x="292" y="90" text-anchor="middle" font-size="9" fill="#92400e">(Neighborhood)</text>
    <line x1="348" y1="78" x2="452" y2="78" stroke="#0f766e" stroke-width="3.2"/>
    <text x="400" y="66" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f766e">Fiber Optics</text>
    <rect x="452" y="42" width="132" height="72" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
    <text x="518" y="62" text-anchor="middle" font-size="10" font-weight="700" fill="#0369a1">Cable Head End</text>
    <rect x="474" y="70" width="88" height="32" rx="5" fill="#0f766e"/><text x="518" y="90" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">CMTS</text>
    <line x1="584" y1="78" x2="634" y2="78" stroke="#0f766e" stroke-width="2.6"/>
    <rect x="634" y="56" width="68" height="44" rx="8" fill="#1e293b"/><text x="668" y="82" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Internet</text>
    <rect x="20" y="160" width="682" height="22" rx="5" fill="#fef3c7" stroke="#f59e0b"/>
    <text x="361" y="175" text-anchor="middle" font-size="10" font-weight="700" fill="#92400e">Downstream: CMTS is sole sender (no collisions) · Upstream: Shared by homes (distributed multiple access required)</text>
  </svg>
  <figcaption><strong>Adapted from Figure 1.6 (printed p. 14, PDF p. 25):</strong> Hybrid Fiber-Coaxial (HFC) access network. Homes share a common coaxial broadcast channel, so simultaneous downloads divide available downstream capacity.</figcaption>
</figure>

---

## 3. FTTH (Fiber to the Home — PON) and Enterprise Ethernet LAN (§1.2.1, Figures 1.7–1.8)

**FTTH (Fiber to the Home)** provides an optical fiber path from the central office directly to homes at gigabits/second rates. The dominant distribution architecture is **PON (Passive Optical Network)**:
- Each home’s **ONT** (*Optical Network Terminator*) connects via dedicated fiber to a neighborhood **optical splitter** (typically <100 homes), which shares a single optical fiber to the **OLT** (*Optical Line Terminator*) in the telco’s central office.

**Enterprise & University Ethernet LAN (Figure 1.8):** Users connect via twisted-pair copper wire (e.g., Cat 6a) at **100 Mbps – 10 Gbps** to a local **Ethernet switch**, which connects through an institutional router to the ISP.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 185" role="img" aria-label="Adapted from Figures 1.7 and 1.8: Side-by-side comparison of FTTH PON optical access and Enterprise Ethernet LAN">
    <rect x="16" y="16" width="336" height="152" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="184" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f766e">FTTH · Passive Optical Network (PON, Fig. 1.7)</text>
    <rect x="28" y="52" width="60" height="24" rx="4" fill="#2563eb"/><text x="58" y="68" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">ONT 1</text>
    <rect x="28" y="88" width="60" height="24" rx="4" fill="#2563eb"/><text x="58" y="104" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">ONT 2</text>
    <rect x="28" y="124" width="60" height="24" rx="4" fill="#2563eb"/><text x="58" y="140" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">ONT n</text>
    <line x1="88" y1="64" x2="146" y2="100" stroke="#059669" stroke-width="2"/>
    <line x1="88" y1="100" x2="146" y2="100" stroke="#059669" stroke-width="2"/>
    <line x1="88" y1="136" x2="146" y2="100" stroke="#059669" stroke-width="2"/>
    <rect x="146" y="76" width="76" height="48" rx="6" fill="#dcfce7" stroke="#059669" stroke-width="1.5"/>
    <text x="184" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#065f46">Optical</text>
    <text x="184" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#065f46">Splitter</text>
    <line x1="222" y1="100" x2="262" y2="100" stroke="#059669" stroke-width="2.8"/>
    <rect x="262" y="76" width="76" height="48" rx="6" fill="#0f766e"/>
    <text x="300" y="98" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">OLT</text>
    <text x="300" y="113" text-anchor="middle" font-size="8.5" fill="#ccfbf1">(Central Office)</text>
    <rect x="368" y="16" width="336" height="152" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="536" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1e3a8a">Enterprise Ethernet LAN (Fig. 1.8)</text>
    <rect x="380" y="52" width="66" height="24" rx="4" fill="#2563eb"/><text x="413" y="68" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">PC (1 Gbps)</text>
    <rect x="380" y="88" width="66" height="24" rx="4" fill="#2563eb"/><text x="413" y="104" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">PC (1 Gbps)</text>
    <rect x="380" y="124" width="66" height="24" rx="4" fill="#1d4ed8"/><text x="413" y="140" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">Server 10G</text>
    <line x1="446" y1="64" x2="500" y2="100" stroke="#2563eb" stroke-width="2"/>
    <line x1="446" y1="100" x2="500" y2="100" stroke="#2563eb" stroke-width="2"/>
    <line x1="446" y1="136" x2="500" y2="100" stroke="#2563eb" stroke-width="2"/>
    <rect x="500" y="76" width="82" height="48" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
    <text x="541" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1e3a8a">Ethernet</text>
    <text x="541" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1e3a8a">Switch</text>
    <line x1="582" y1="100" x2="616" y2="100" stroke="#334155" stroke-width="2.6"/>
    <rect x="616" y="76" width="76" height="48" rx="6" fill="#475569"/>
    <text x="654" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Inst.</text>
    <text x="654" y="112" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Router → ISP</text>
  </svg>
  <figcaption><strong>Adapted from Figures 1.7 &amp; 1.8 (printed pp. 16–17, PDF pp. 27–28):</strong> Left: FTTH Passive Optical Network (ONT → Optical Splitter → OLT). Right: Enterprise Ethernet LAN providing 100 Mbps–10 Gbps switched twisted-pair access.</figcaption>
</figure>

---

## 4. A Typical Home Network & Wireless Access: WiFi (802.11) vs. 4G/5G (§1.2.1, Figure 1.9)

Modern home networks combine residential broadband (Cable/DSL/FTTH modem) with a **WiFi (IEEE 802.11)** wireless access point and wired Ethernet:
- **Wireless LAN (WiFi — 802.11):** Operates within a **few tens of meters** of the access point at shared speeds exceeding 100 Mbps.
- **Wide-Area Wireless (4G LTE / 5G Cellular):** Connects mobile devices within **tens of kilometers** of a cellular base station (4G real-world downloads up to ~60 Mbps, 5G substantially higher).

<figure class="lesson-figure">
  <svg viewBox="0 0 720 175" role="img" aria-label="Adapted from Figure 1.9: Typical home network combining Cable/DSL modem, router, WiFi AP, wired and wireless devices versus wide-area 4G/5G cellular">
    <rect x="18" y="18" width="444" height="142" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
    <text x="34" y="38" font-size="11.5" font-weight="700" fill="#15803d">Typical Home Network (Fig. 1.9 · WiFi Range: Tens of Meters)</text>
    <rect x="34" y="54" width="84" height="32" rx="5" fill="#2563eb"/><text x="76" y="74" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Laptop / IoT</text>
    <rect x="34" y="106" width="84" height="32" rx="5" fill="#475569"/><text x="76" y="126" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Wired PC</text>
    <line x1="118" y1="70" x2="178" y2="70" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 3"/>
    <text x="148" y="62" text-anchor="middle" font-size="8.5" font-weight="700" fill="#0284c7">WiFi 802.11</text>
    <rect x="178" y="52" width="76" height="36" rx="6" fill="#0284c7"/><text x="216" y="74" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">WiFi AP</text>
    <line x1="254" y1="70" x2="294" y2="96" stroke="#334155" stroke-width="2"/>
    <line x1="118" y1="122" x2="294" y2="104" stroke="#334155" stroke-width="2"/>
    <rect x="294" y="74" width="68" height="46" rx="6" fill="#0f766e"/><text x="328" y="101" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Router</text>
    <line x1="362" y1="97" x2="386" y2="97" stroke="#334155" stroke-width="2"/>
    <rect x="386" y="74" width="64" height="46" rx="6" fill="#d97706"/><text x="418" y="101" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Modem</text>
    <line x1="462" y1="97" x2="504" y2="97" stroke="#0f766e" stroke-width="2.6"/>
    <rect x="504" y="20" width="198" height="140" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
    <text x="603" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="#1e3a8a">Wide-Area (4G / 5G)</text>
    <text x="603" y="56" text-anchor="middle" font-size="9.5" fill="#1d4ed8">Range: Tens of Kilometers</text>
    <rect x="526" y="76" width="62" height="36" rx="5" fill="#2563eb"/><text x="557" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Phone</text>
    <line x1="588" y1="94" x2="622" y2="94" stroke="#2563eb" stroke-width="2" stroke-dasharray="4 3"/>
    <rect x="622" y="72" width="66" height="44" rx="6" fill="#0f766e"/><text x="655" y="98" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Base Stn</text>
    <text x="603" y="142" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">4G: ~60 Mbps · 5G: much higher</text>
  </svg>
  <figcaption><strong>Adapted from Figure 1.9 (printed p. 18, PDF p. 29):</strong> A typical home network combines a broadband modem, router, and WiFi access point; outdoors, smartphones use wide-area 4G/5G cellular base stations spanning tens of kilometers.</figcaption>
</figure>

---

## 5. Physical Media: Guided vs. Unguided Media (§1.2.2)

As a bit travels from source to destination, it passes through a sequence of transmitter–receiver pairs, propagating as electromagnetic waves or optical pulses across a physical medium. Physical media fall into two categories:

1. **Guided Media:** Waves are guided along a solid medium:
   - **Twisted-Pair Copper Wire (UTP):** Least expensive and most widely used LAN medium; twisting reduces electrical interference from neighboring pairs. Modern **Cat 6a** achieves **10 Gbps** up to 100 m.
   - **Coaxial Cable:** Two concentric copper conductors; widely used as a guided shared broadcast medium in HFC cable systems.
   - **Fiber Optics:** Thin flexible glass conducting pulses of light; immune to electromagnetic interference, very low attenuation up to 100 km, and very hard to tap. Optical Carrier (**OC-n**) link rates obey:

$$ R_{\mathrm{OC}-n} = n \cdot 51.8 $$

   *(in Mbps; e.g., OC-1 = 51.8 Mbps, OC-48 ≈ 2.49 Gbps, OC-192 ≈ 9.95 Gbps, OC-768 ≈ 39.8 Gbps.)*

2. **Unguided Media:** Waves propagate in the atmosphere and outer space (terrestrial radio channels: short-range Bluetooth 1–2 m, local WiFi 10–100 m, wide-area cellular 10+ km; and **satellite radio channels**).
   - **Geostationary Satellites (GEO):** Orbit permanently at \(h = 36{,}000\text{ km}\) above Earth, introducing a substantial one-way ground-to-ground propagation delay of roughly **280 ms**:

$$ d_{\mathrm{prop,sat}} \approx \frac{2 h}{c} $$

   - **Low-Earth Orbiting Satellites (LEO):** Placed much closer to Earth (e.g., \(h \approx 550\text{ km}\)), requiring constellations for continuous coverage while slashing propagation delay to a few milliseconds.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 195" role="img" aria-label="Physical media summary: Guided (Twisted-Pair, Coaxial, Fiber Optics) vs Unguided (Terrestrial Radio, LEO and 36,000 km Geostationary Satellite)">
    <rect x="16" y="16" width="338" height="162" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="185" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1e3a8a">Guided Media</text>
    <rect x="30" y="48" width="310" height="34" rx="6" fill="#dbeafe" stroke="#2563eb"/>
    <text x="42" y="69" font-size="10.5" font-weight="700" fill="#1e3a8a">Twisted-Pair (UTP Cat 6a): 10 Gbps @ 100 m · Lowest cost</text>
    <rect x="30" y="90" width="310" height="34" rx="6" fill="#fef3c7" stroke="#d97706"/>
    <text x="42" y="111" font-size="10.5" font-weight="700" fill="#92400e">Coaxial Cable: Concentric conductors · HFC shared medium</text>
    <rect x="30" y="132" width="310" height="34" rx="6" fill="#dcfce7" stroke="#059669"/>
    <text x="42" y="153" font-size="10.5" font-weight="700" fill="#065f46">Fiber Optics: Light pulses · EMI-immune · OC-n (10–100+ Gbps)</text>
    <rect x="366" y="16" width="338" height="162" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="535" y="36" text-anchor="middle" font-size="11.5" font-weight="700" fill="#b45309">Unguided Media</text>
    <rect x="380" y="48" width="310" height="34" rx="6" fill="#ede9fe" stroke="#7c3aed"/>
    <text x="392" y="69" font-size="10.5" font-weight="700" fill="#5b21b6">Terrestrial Radio: Short (BT), Local (WiFi), Wide (4G/5G)</text>
    <rect x="380" y="90" width="310" height="34" rx="6" fill="#ffedd5" stroke="#ea580c"/>
    <text x="392" y="111" font-size="10.5" font-weight="700" fill="#c2410c">GEO Satellite: h = 36,000 km · Stationary · ~280 ms delay</text>
    <rect x="380" y="132" width="310" height="34" rx="6" fill="#e0f2fe" stroke="#0284c7"/>
    <text x="392" y="153" font-size="10.5" font-weight="700" fill="#0369a1">LEO Satellite: Low orbit (~550 km) · Low propagation delay</text>
  </svg>
  <figcaption><strong>Physical Media Comparison (§1.2.2, printed pp. 18–21, PDF pp. 29–32):</strong> Because installation labor often outweighs cable material cost, builders frequently pull twisted pair, coax, and fiber together.</figcaption>
</figure>

$$ T_{\mathrm{transfer}} = \frac{8 \cdot F_{\mathrm{MB}}}{R_{\mathrm{eff}}} $$

| Access Technology | Medium | Shared or Dedicated? | Typical Downstream | Typical Upstream |
| :--- | :--- | :--- | :--- | :--- |
| **DSL (Fig. 1.5)** | Twisted-pair copper | **Dedicated** | 24–52 Mbps | 3.5–16 Mbps |
| **HFC Cable (Fig. 1.6)** | Fiber + Coax | **Shared** | 40 Mbps – 1.2 Gbps | 30–100 Mbps |
| **FTTH PON (Fig. 1.7)** | Optical fiber | **Shared (<100 homes)** | ~1 Gbps+ | ~100 Mbps–1 Gbps |
| **Ethernet LAN (Fig. 1.8)** | Twisted-pair / Fiber | **Dedicated (switched)** | 100 Mbps – 10 Gbps | 100 Mbps – 10 Gbps |
| **WiFi 802.11 (Fig. 1.9)** | Terrestrial radio | **Shared** | 100+ Mbps | 100+ Mbps |
| **4G LTE / 5G** | Cellular radio | **Shared** | ~60 Mbps (4G) / 5G+ | ~20 Mbps+ |
