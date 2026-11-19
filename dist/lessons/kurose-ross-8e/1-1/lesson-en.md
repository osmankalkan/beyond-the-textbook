# §1.1 What Is the Internet? (Nuts-and-Bolts Anatomy, Services, and Protocols)

> **SOURCE:** James F. Kurose & Keith W. Ross, *Computer Networking: A Top-Down Approach* (8th Edition, Pearson, 2021), **§1.1 What Is the Internet?** (§1.1.1–§1.1.3), **printed pp. 2–9 (PDF pp. 13–20)**; **Figure 1.1 (printed p. 3, PDF p. 14)** and **Figure 1.2 (printed p. 7, PDF p. 18)**.

Trying to define the Internet in a single sentence misses half the picture. Kurose & Ross answer the question from **two complementary perspectives**:

1. **A Nuts-and-Bolts Description (§1.1.1):** What are the basic hardware and software components that make up the Internet? (End systems, communication links, packet switches, ISPs, and TCP/IP protocols.)
2. **A Services Description (§1.1.2):** How does the Internet act as an infrastructure providing communication services and a **socket interface** to distributed applications?
3. **What Is a Protocol? (§1.1.3):** How do remote entities agree on message **format**, **order**, and **actions** so they can interoperate?

---

## 1. A Nuts-and-Bolts Description: Pieces of the Internet (§1.1.1, Figure 1.1)

The Internet is a **network of networks** that interconnects billions of computing devices across the globe. Beyond traditional desktop PCs, Linux workstations, and Web/e-mail servers, billions of smartphones, tablets, TVs, gaming consoles, cars, traffic lights, thermostats, and home appliances are now connected.

> **MENTAL MODEL — "Host" and "End System" Are Synonyms (Review Question R1):**
> In Internet jargon, all devices sitting at the edge of the network are called **hosts** or **end systems**. A laptop, a smart thermostat, and a **Web server** are all end systems because they sit at the edge of the Internet and run application programs.

<figure class="lesson-figure">
  <svg viewBox="0 0 720 320" role="img" aria-label="Adapted from Figure 1.1: Pieces of the Internet — Mobile Network, Home Network, Enterprise Network, Local/Regional ISP, Global ISP, and Content Provider / Datacenter networks">
    <rect x="16" y="16" width="218" height="88" rx="16" fill="#e0f2fe" fill-opacity="0.55" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="28" y="34" font-size="11" font-weight="700" fill="#0369a1">Mobile Network</text>
    <circle cx="52" cy="64" r="10" fill="#2563eb"/><text x="52" y="68" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">M</text>
    <text x="52" y="88" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Phone</text>
    <circle cx="116" cy="64" r="10" fill="#64748b"/><text x="116" y="68" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">▲</text>
    <text x="116" y="88" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Cell Tower</text>
    <circle cx="188" cy="64" r="11" fill="#0f766e"/><text x="188" y="68" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <text x="188" y="88" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Router</text>
    <line x1="62" y1="64" x2="106" y2="64" stroke="#334155" stroke-width="1.8"/>
    <line x1="126" y1="64" x2="177" y2="64" stroke="#334155" stroke-width="1.8"/>
    <rect x="16" y="118" width="218" height="84" rx="16" fill="#dcfce7" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="28" y="136" font-size="11" font-weight="700" fill="#15803d">Home Network</text>
    <circle cx="52" cy="166" r="10" fill="#2563eb"/><text x="52" y="170" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">PC</text>
    <text x="52" y="190" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Laptop / IoT</text>
    <circle cx="116" cy="166" r="10" fill="#64748b"/><text x="116" y="170" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">◎</text>
    <text x="116" y="190" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">WiFi AP</text>
    <circle cx="188" cy="166" r="11" fill="#0f766e"/><text x="188" y="170" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <text x="188" y="190" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Home Router</text>
    <line x1="62" y1="166" x2="106" y2="166" stroke="#334155" stroke-width="1.8"/>
    <line x1="126" y1="166" x2="177" y2="166" stroke="#334155" stroke-width="1.8"/>
    <rect x="16" y="216" width="270" height="74" rx="16" fill="#ede9fe" fill-opacity="0.55" stroke="#7c3aed" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="28" y="234" font-size="11" font-weight="700" fill="#6d28d9">Enterprise Network</text>
    <circle cx="58" cy="260" r="10" fill="#2563eb"/><text x="58" y="264" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">H</text>
    <circle cx="146" cy="260" r="10" fill="#64748b"/><text x="146" y="264" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">⇄</text>
    <text x="146" y="282" text-anchor="middle" font-size="9" fill="var(--text,#1e293b)">Link-Layer Switch</text>
    <circle cx="242" cy="260" r="11" fill="#0f766e"/><text x="242" y="264" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <line x1="68" y1="260" x2="136" y2="260" stroke="#334155" stroke-width="1.8"/>
    <line x1="156" y1="260" x2="231" y2="260" stroke="#334155" stroke-width="1.8"/>
    <rect x="272" y="114" width="136" height="88" rx="16" fill="#fef3c7" fill-opacity="0.65" stroke="#d97706" stroke-width="1.4"/>
    <text x="340" y="133" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">Local / Regional ISP</text>
    <circle cx="312" cy="166" r="11" fill="#0f766e"/><text x="312" y="170" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <circle cx="372" cy="166" r="11" fill="#0f766e"/><text x="372" y="170" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <line x1="323" y1="166" x2="361" y2="166" stroke="#334155" stroke-width="2"/>
    <rect x="356" y="16" width="166" height="82" rx="16" fill="#ffedd5" fill-opacity="0.65" stroke="#ea580c" stroke-width="1.4"/>
    <text x="439" y="34" text-anchor="middle" font-size="10.5" font-weight="700" fill="#c2410c">National / Global ISP (Tier-1)</text>
    <circle cx="404" cy="66" r="11" fill="#0f766e"/><text x="404" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <circle cx="474" cy="66" r="11" fill="#0f766e"/><text x="474" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <line x1="415" y1="66" x2="463" y2="66" stroke="#334155" stroke-width="2.2"/>
    <rect x="498" y="114" width="206" height="114" rx="16" fill="#f1f5f9" fill-opacity="0.8" stroke="#475569" stroke-width="1.4"/>
    <text x="601" y="133" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">Content Provider &amp; Datacenter</text>
    <circle cx="540" cy="176" r="11" fill="#0f766e"/><text x="540" y="180" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">✕</text>
    <rect x="616" y="150" width="64" height="52" rx="6" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="648" y="174" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Server</text>
    <text x="648" y="189" text-anchor="middle" font-size="8.5" fill="#dbeafe">(End System)</text>
    <line x1="551" y1="176" x2="616" y2="176" stroke="#334155" stroke-width="2.2"/>
    <line x1="199" y1="64" x2="393" y2="66" stroke="#0f766e" stroke-width="1.8"/>
    <line x1="199" y1="166" x2="301" y2="166" stroke="#0f766e" stroke-width="1.8"/>
    <line x1="253" y1="260" x2="312" y2="177" stroke="#0f766e" stroke-width="1.8"/>
    <line x1="340" y1="155" x2="404" y2="77" stroke="#0f766e" stroke-width="2"/>
    <line x1="383" y1="166" x2="529" y2="176" stroke="#0f766e" stroke-width="2"/>
    <line x1="474" y1="77" x2="540" y2="165" stroke="#0f766e" stroke-width="2"/>
    <g transform="translate(18, 304)" font-size="10" fill="var(--text,#334155)">
      <circle cx="8" cy="0" r="6" fill="#2563eb"/><text x="20" y="4">Host / Server (End System)</text>
      <circle cx="195" cy="0" r="6" fill="#0f766e"/><text x="207" y="4">Router (Network Core)</text>
      <circle cx="385" cy="0" r="6" fill="#64748b"/><text x="397" y="4">Link-Layer Switch / Base Station</text>
    </g>
  </svg>
  <figcaption><strong>Adapted from Figure 1.1 (printed p. 3, PDF p. 14):</strong> Some pieces of the Internet. End systems in home, mobile, and enterprise networks connect via communication links, access switches, and ISP routers to global backbones and datacenter servers.</figcaption>
</figure>

---

## 2. Packets, Packet Switches, and the Highway Analogy

End systems are connected by a network of **communication links** (coaxial cable, copper wire, optical fiber, and radio spectrum) and **packet switches**. Each link’s transmission rate is measured in **bits/second (bps)**.

When a sending end system transmits an application message of \(F\) bytes to a destination end system:
1. It splits the data into segments of at most \(P_{\mathrm{data}}\) bytes (**segmentation**).
2. It prepends \(H\) bytes of **header** to each segment, forming a **packet**.
3. Each packet travels independently along a **route / path** of links and switches and is reassembled into the original data at the destination end system.

The fundamental packetization relationships are:

$$ K = \left\lceil \frac{F}{P_{\mathrm{data}}} \right\rceil $$

$$ L = P_{\mathrm{data}} + H $$

$$ \eta = \frac{F}{F + K \cdot H} $$

Here \(K\) is the total number of packets, \(L\) is the total byte length of a full packet, \(K \cdot H\) is the total header overhead, and \(\eta\) is the **protocol efficiency** (the ratio of useful application payload to total bytes transmitted on the wire).

<figure class="lesson-figure">
  <svg viewBox="0 0 720 185" role="img" aria-label="Packet segmentation, header prepending, and the cargo-truck / highway-intersection analogy">
    <rect x="18" y="34" width="118" height="44" rx="7" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
    <text x="77" y="54" text-anchor="middle" font-size="11" font-weight="700" fill="#1e3a8a">Application Data</text>
    <text x="77" y="70" text-anchor="middle" font-size="10" fill="#1d4ed8">F bytes (Cargo)</text>
    <line x1="140" y1="56" x2="178" y2="56" stroke="#475569" stroke-width="2"/>
    <polygon points="182,56 174,51 174,61" fill="#475569"/>
    <g transform="translate(190, 26)">
      <rect x="0" y="0" width="32" height="24" rx="3" fill="#d97706"/><text x="16" y="16" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">H</text>
      <rect x="34" y="0" width="76" height="24" rx="3" fill="#2563eb"/><text x="72" y="16" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Chunk 1</text>
      <rect x="0" y="32" width="32" height="24" rx="3" fill="#d97706"/><text x="16" y="48" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">H</text>
      <rect x="34" y="32" width="76" height="24" rx="3" fill="#2563eb"/><text x="72" y="48" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Chunk 2</text>
      <rect x="0" y="64" width="32" height="24" rx="3" fill="#d97706"/><text x="16" y="80" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">H</text>
      <rect x="34" y="64" width="76" height="24" rx="3" fill="#2563eb"/><text x="72" y="80" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">Chunk K</text>
    </g>
    <text x="245" y="130" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Packets (Fleet of Trucks)</text>
    <line x1="308" y1="56" x2="366" y2="56" stroke="#059669" stroke-width="2.4"/>
    <text x="337" y="46" text-anchor="middle" font-size="9.5" font-weight="700" fill="#059669">Comm. Link</text>
    <text x="337" y="74" text-anchor="middle" font-size="9" fill="var(--muted-ink,#52634c)">(Highway)</text>
    <circle cx="404" cy="56" r="24" fill="#e2e8f0" stroke="#0f766e" stroke-width="2"/>
    <text x="404" y="61" text-anchor="middle" font-size="14" font-weight="700" fill="#0f766e">✕</text>
    <text x="404" y="98" text-anchor="middle" font-size="10" font-weight="700" fill="#0f766e">Packet Switch</text>
    <text x="404" y="112" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">(Intersection)</text>
    <line x1="428" y1="56" x2="530" y2="56" stroke="#059669" stroke-width="2.4"/>
    <polygon points="534,56 525,51 525,61" fill="#059669"/>
    <text x="480" y="46" text-anchor="middle" font-size="9.5" font-weight="700" fill="#059669">Route / Path</text>
    <rect x="540" y="34" width="160" height="44" rx="7" fill="#dcfce7" stroke="#059669" stroke-width="1.8"/>
    <text x="620" y="54" text-anchor="middle" font-size="11" font-weight="700" fill="#065f46">Destination Host</text>
    <text x="620" y="70" text-anchor="middle" font-size="10" fill="#047857">Reassembly (Warehouse)</text>
    <text x="360" y="166" text-anchor="middle" font-size="10.5" fill="var(--muted-ink,#52634c)">Link-layer switches are typically used in access networks, while routers are typically used in the network core.</text>
  </svg>
  <figcaption><strong>Packet Switching &amp; Transportation Analogy (printed p. 4, PDF p. 15):</strong> Packets correspond to cargo trucks, communication links to highways, packet switches to intersections, and end systems to factories/warehouses.</figcaption>
</figure>

The two most prominent types of **packet switches** in today’s Internet are:
- **Link-layer switches:** Typically used in local and enterprise **access networks**.
- **Routers:** Typically used in the high-speed **network core**.

---

## 3. ISP Hierarchy, TCP/IP, and Internet Standards (IETF / RFC vs. IEEE 802)

End systems access the Internet through **Internet Service Providers (ISPs)** (residential broadband ISPs, corporate/university networks, public WiFi hotspots, and cellular data ISPs). Each ISP is itself a network of packet switches and links. Lower-tier access ISPs interconnect through **regional ISPs** and high-speed fiber **national/global upper-tier ISPs**.

So that hardware and software built by different vendors can **interoperate**, Internet protocols rely on open **standards** (**Review Question R3**):
- **IETF (Internet Engineering Task Force):** Develops Internet protocol standards—such as TCP, IP, HTTP, and SMTP—published as **RFCs (Requests for Comments)** (nearly 9,000 RFCs to date).
- **IEEE 802 LAN Standards Committee:** Specifies link-layer standards including Ethernet (802.3) and wireless WiFi (802.11).

<figure class="lesson-figure">
  <svg viewBox="0 0 720 175" role="img" aria-label="ISP hierarchy and Internet standards organizations map: IETF RFCs and IEEE 802">
    <rect x="20" y="18" width="330" height="140" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="185" y="38" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">ISP Interconnection Hierarchy</text>
    <rect x="75" y="48" width="220" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.3"/>
    <text x="185" y="65" text-anchor="middle" font-size="10.5" font-weight="700" fill="#c2410c">Upper-Tier: National / Global ISP (Fiber)</text>
    <rect x="55" y="84" width="260" height="26" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.3"/>
    <text x="185" y="101" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">Mid-Tier: Local / Regional ISP</text>
    <rect x="35" y="120" width="300" height="26" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.3"/>
    <text x="185" y="137" text-anchor="middle" font-size="10.5" font-weight="700" fill="#15803d">Lower-Tier: Access ISPs (Home, Mobile, Corp)</text>
    <rect x="370" y="18" width="330" height="140" rx="10" fill="var(--surface,#fff)" stroke="#cbd5e1" stroke-width="1.4"/>
    <text x="535" y="38" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">Standards Bodies (Interoperability)</text>
    <rect x="388" y="50" width="294" height="44" rx="7" fill="#dbeafe" stroke="#2563eb" stroke-width="1.3"/>
    <text x="535" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="#1e3a8a">IETF · RFC Documents (~9,000 RFCs)</text>
    <text x="535" y="84" text-anchor="middle" font-size="10" fill="#1d4ed8">TCP, IP, HTTP (Web), SMTP (E-mail)</text>
    <rect x="388" y="104" width="294" height="42" rx="7" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.3"/>
    <text x="535" y="122" text-anchor="middle" font-size="11" font-weight="700" fill="#5b21b6">IEEE 802 LAN Standards Committee</text>
    <text x="535" y="138" text-anchor="middle" font-size="10" fill="#6d28d9">Ethernet (802.3) and Wireless WiFi (802.11)</text>
  </svg>
  <figcaption><strong>ISP Hierarchy &amp; Standards (printed p. 5, PDF p. 16):</strong> Each ISP is managed independently, yet because all networks conform to IP and open IETF/IEEE standards, devices worldwide interoperate seamlessly.</figcaption>
</figure>

---

## 4. A Services Description and the Socket Interface (§1.1.2)

From a second viewpoint, the Internet is an **infrastructure that provides services to distributed applications**. Because Web browsing, e-mail, video streaming, mapping, and multiplayer games involve multiple end systems exchanging data, they are called **distributed applications**.

> **CRITICAL ARCHITECTURAL PRINCIPLE:** Internet applications run **only on end systems**—they **do not run in the packet switches** in the network core. Core routers forward packets without caring whether the payload belongs to a video call or an e-mail.

How does a program (written in Python, Java, or C) running on one end system instruct the Internet to deliver data to a destination program on another end system? Through the **socket interface**. Kurose & Ross illustrate this with the **postal service analogy**:
- Alice cannot simply drop a letter out her window; she must place it in an envelope, write Bob’s full address and zip code, seal it, attach a stamp, and drop it into an official mailbox.
- Likewise, a sending program follows the rules of the **socket interface** to hand data to the Internet, choosing among the transport services the Internet provides (analogous to express delivery, reception confirmation, or standard mail).

<figure class="lesson-figure">
  <svg viewBox="0 0 720 175" role="img" aria-label="Services description and socket interface: postal service analogy and applications running only on end systems">
    <rect x="20" y="20" width="166" height="126" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>
    <text x="103" y="42" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1e3a8a">Sending End System</text>
    <rect x="34" y="54" width="138" height="34" rx="6" fill="#2563eb"/>
    <text x="103" y="70" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Application (Alice)</text>
    <text x="103" y="83" text-anchor="middle" font-size="8.5" fill="#dbeafe">Letter = Data</text>
    <rect x="34" y="98" width="138" height="34" rx="6" fill="#d97706"/>
    <text x="103" y="114" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Socket Interface</text>
    <text x="103" y="127" text-anchor="middle" font-size="8.5" fill="#fef3c7">Envelope + Address + Mailbox</text>
    <line x1="186" y1="115" x2="250" y2="115" stroke="#0f766e" stroke-width="2.6"/>
    <polygon points="254,115 245,110 245,120" fill="#0f766e"/>
    <rect x="256" y="42" width="208" height="104" rx="14" fill="#f1f5f9" stroke="#64748b" stroke-width="1.6" stroke-dasharray="5 3"/>
    <text x="360" y="64" text-anchor="middle" font-size="11.5" font-weight="700" fill="#334155">Internet Infrastructure (Core)</text>
    <text x="360" y="82" text-anchor="middle" font-size="10" fill="#64748b">Postal Delivery Network (Routers)</text>
    <rect x="282" y="96" width="156" height="34" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="1.3"/>
    <text x="360" y="112" text-anchor="middle" font-size="10" font-weight="700" fill="#b91c1c">No User Apps Run Here!</text>
    <text x="360" y="125" text-anchor="middle" font-size="8.5" fill="#991b1b">Forwards packets by header only</text>
    <line x1="464" y1="115" x2="528" y2="115" stroke="#0f766e" stroke-width="2.6"/>
    <polygon points="532,115 523,110 523,120" fill="#0f766e"/>
    <rect x="534" y="20" width="166" height="126" rx="10" fill="#dcfce7" stroke="#059669" stroke-width="1.6"/>
    <text x="617" y="42" text-anchor="middle" font-size="11.5" font-weight="700" fill="#065f46">Receiving End System</text>
    <rect x="548" y="54" width="138" height="34" rx="6" fill="#059669"/>
    <text x="617" y="70" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Application (Bob)</text>
    <text x="617" y="83" text-anchor="middle" font-size="8.5" fill="#dcfce7">Receives Delivered Data</text>
    <rect x="548" y="98" width="138" height="34" rx="6" fill="#d97706"/>
    <text x="617" y="114" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">Socket Interface</text>
    <text x="617" y="127" text-anchor="middle" font-size="8.5" fill="#fef3c7">Delivery Doorway</text>
  </svg>
  <figcaption><strong>Services Description &amp; Socket Interface (printed pp. 5–6, PDF pp. 16–17):</strong> Distributed applications run strictly on end systems and hand data to the Internet infrastructure across the socket interface, just like posting an addressed letter.</figcaption>
</figure>

---

## 5. What Is a Protocol? (§1.1.3, Figure 1.2)

Every activity in the Internet involving two or more communicating remote entities is governed by a **protocol**. Kurose & Ross’s canonical definition rests on three pillars (**printed p. 9, PDF p. 20**):

> **PROTOCOL DEFINITION:** A protocol defines the **format** and the **order** of messages exchanged between two or more communicating entities, as well as the **actions** taken on the transmission and/or receipt of a message or **other event** (such as a timeout).

In a human protocol, we say `"Hi"` and wait for a cordial `"Hi"` before asking `"Got the time?"`; if the peer replies `"I don't speak English"` or gives no answer, we abort. In a computer network protocol, your browser first sends a **TCP connection request**, waits for the **TCP connection reply**, then sends an HTTP `GET` message, and receives `<file>` in return:

<figure class="lesson-figure">
  <svg viewBox="0 0 720 270" role="img" aria-label="Adapted from Figure 1.2: Side-by-side comparison of a human protocol and a computer network protocol (TCP + HTTP GET)">
    <text x="175" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#1e3a8a">Human Protocol (Asking the Time)</text>
    <rect x="44" y="34" width="76" height="28" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.4"/>
    <text x="82" y="52" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1e3a8a">Person A</text>
    <rect x="230" y="34" width="76" height="28" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.4"/>
    <text x="268" y="52" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1e3a8a">Person B</text>
    <line x1="82" y1="66" x2="82" y2="240" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 4"/>
    <line x1="268" y1="66" x2="268" y2="240" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 4"/>
    <line x1="86" y1="84" x2="260" y2="108" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="264,109 255,103 254,113" fill="#0284c7"/>
    <text x="175" y="88" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Hi</text>
    <line x1="264" y1="122" x2="90" y2="146" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="86,147 96,141 97,151" fill="#0284c7"/>
    <text x="175" y="128" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Hi</text>
    <line x1="86" y1="162" x2="260" y2="186" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="264,187 255,181 254,191" fill="#0284c7"/>
    <text x="175" y="168" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Got the time?</text>
    <line x1="264" y1="202" x2="90" y2="226" stroke="#059669" stroke-width="2.2"/>
    <polygon points="86,227 96,221 97,231" fill="#059669"/>
    <text x="175" y="208" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">2:00</text>
    <text x="82" y="256" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">Time ↓</text>
    <text x="268" y="256" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">Time ↓</text>
    <line x1="358" y1="18" x2="358" y2="255" stroke="var(--line,#cbd5e1)" stroke-width="1.2" stroke-dasharray="4 4"/>
    <text x="538" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#065f46">Computer Network Protocol (TCP + HTTP)</text>
    <rect x="394" y="34" width="90" height="28" rx="6" fill="#dcfce7" stroke="#059669" stroke-width="1.4"/>
    <text x="439" y="52" text-anchor="middle" font-size="10.5" font-weight="700" fill="#065f46">Client PC</text>
    <rect x="596" y="34" width="96" height="28" rx="6" fill="#dcfce7" stroke="#059669" stroke-width="1.4"/>
    <text x="644" y="52" text-anchor="middle" font-size="10.5" font-weight="700" fill="#065f46">Web Server</text>
    <line x1="439" y1="66" x2="439" y2="240" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 4"/>
    <line x1="644" y1="66" x2="644" y2="240" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 4"/>
    <line x1="443" y1="84" x2="636" y2="108" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="640,109 631,103 630,113" fill="#0284c7"/>
    <text x="541" y="88" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">TCP connection request</text>
    <line x1="640" y1="122" x2="447" y2="146" stroke="#0284c7" stroke-width="2.2"/>
    <polygon points="443,147 453,141 454,151" fill="#0284c7"/>
    <text x="541" y="128" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">TCP connection reply</text>
    <line x1="443" y1="162" x2="636" y2="186" stroke="#d97706" stroke-width="2.2"/>
    <polygon points="640,187 631,181 630,191" fill="#d97706"/>
    <text x="541" y="168" text-anchor="middle" font-size="10" font-weight="700" fill="#b45309">GET http://.../cs-resources/</text>
    <line x1="640" y1="202" x2="447" y2="226" stroke="#059669" stroke-width="2.2"/>
    <polygon points="443,227 453,221 454,231" fill="#059669"/>
    <text x="541" y="208" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">&lt;file&gt; (Web Page)</text>
    <text x="439" y="256" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">Time ↓</text>
    <text x="644" y="256" text-anchor="middle" font-size="9.5" fill="var(--muted-ink,#52634c)">Time ↓</text>
  </svg>
  <figcaption><strong>Adapted from Figure 1.2 (printed p. 7, PDF p. 18):</strong> Direct parallel between a human protocol and a TCP/HTTP computer network protocol. Both require an opening handshake (1st round-trip) before the request and delivery (2nd round-trip).</figcaption>
</figure>

To first approximation, the total duration of this two-round-trip exchange (with round-trip time \(\mathrm{RTT}\), file size \(L_{\mathrm{file}}\), and transmission rate \(R\)) is:

$$ T_{\mathrm{exchange}} = 2\,\mathrm{RTT} + \frac{L_{\mathrm{file}}}{R} $$

| Protocol Pillar | Human Protocol (Figure 1.2 left) | Network Protocol (Figure 1.2 right) |
| :--- | :--- | :--- |
| **Format** | Greeting phrase, time query, `H:MM` reply | TCP SYN / SYN-ACK segments, `HTTP GET <URL>`, `<file>` |
| **Order** | `"Hi"` / `"Hi"` must precede `"Got the time?"` | TCP handshake must complete before `HTTP GET` |
| **Actions** | Abort if refused or if no reply arrives | Retransmit or close connection upon timeout |
