# §1.4 Transmission Delay, Propagation Delay, and Store-and-Forward Packet Switching

When we send a message from a client to a server over the Internet, it feels as though the data arrives "instantaneously" and "all in one piece." In reality, an application-layer message is segmented into smaller chunks of data called **packets**, and each packet travels across a sequence of **communication links** and **packet switches** (routers and link-layer switches) between the source and destination.

Synthesizing **§1.3.1 (Packet Switching, pp. 23–26)** and **§1.4 (Delay, Loss, and Throughput in Packet-Switched Networks, pp. 35–46)** of Kurose and Ross’s *Computer Networking: A Top-Down Approach* (8th Edition), this lesson answers five fundamental questions:

1. What is the physical difference between **transmission delay (\(d_{\mathrm{trans}} = L/R\))** and **propagation delay (\(d_{\mathrm{prop}} = d/v\))**, and why does upgrading bandwidth (\(R\)) never make a single bit move faster along a cable?
2. What does it mean for a router to operate in **store-and-forward** mode, and how does that rule shape end-to-end latency?
3. When multiple packets are transmitted back-to-back, how do **pipelining** and **message segmentation** dramatically reduce total transfer time?
4. How do we interpret the **Bandwidth-Delay Product (\(\mathrm{BDP} = R \cdot d_{\mathrm{prop}}\))** and the physical length in meters of a single bit on the wire (\(w_{\mathrm{bit}} = v/R\))?
5. When link rates are heterogeneous (**bottleneck link**), how does **queuing delay (\(d_{\mathrm{queue}}\))** build up in a router’s output buffer?

---

## 1. Decision Map: The Four Components of Nodal Delay

As a packet travels from source to destination, it experiences four distinct types of delay at each node (host or router, **Figure 1.16, printed p. 36, PDF p. 47**) along the path:

| Delay Component | Symbol & Formula | Physical Meaning | What It Depends On | Typical Scale |
| :--- | :--- | :--- | :--- | :--- |
| **Processing Delay** | \(d_{\mathrm{proc}}\) | Time required to examine the packet’s header, look up the forwarding table, and check for bit-level errors | Router hardware and forwarding-table lookup architecture | Microseconds (\(\mu\mathrm{s}\)) or less |
| **Queuing Delay** | \(d_{\mathrm{queue}}\) | Time spent waiting in the output buffer while earlier packets are being transmitted onto the link | Traffic intensity \(I = La/R\) and burstiness of arrivals | Zero to milliseconds (\(\mathrm{ms}\)) (highly variable!) |
| **Transmission Delay** | \(d_{\mathrm{trans}} = L/R\) | Time required to push (*serialize*) all \(L\) bits of the packet onto the communication link | Packet length \(L\) (bits) and link transmission rate \(R\) (bits/sec) | Microseconds to milliseconds |
| **Propagation Delay** | \(d_{\mathrm{prop}} = d/v\) | Time for a **single bit** to travel from the beginning of the link to the receiving node at wave speed | Physical link distance \(d\) (m) and wave propagation speed \(v\) (m/s) | \(\mu\mathrm{s}\) on a campus LAN; tens to hundreds of \(\mathrm{ms}\) on transoceanic fiber or satellite |

The **total nodal delay** at a router is the sum of these four components:

$$ d_{\mathrm{nodal}} = d_{\mathrm{proc}} + d_{\mathrm{queue}} + d_{\mathrm{trans}} + d_{\mathrm{prop}} $$

<figure class="lesson-figure">
  <svg viewBox="0 0 720 225" role="img" aria-label="The four nodal delay components at Router A: processing, queuing, transmission, and propagation">
    <defs>
      <marker id="fig16-arr-en" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,1 L9,5 L0,9 Z" fill="#2563eb"/>
      </marker>
    </defs>
    <line x1="72" y1="44" x2="180" y2="88" stroke="var(--text,#334155)" stroke-width="2"/>
    <line x1="72" y1="138" x2="180" y2="96" stroke="var(--text,#334155)" stroke-width="2"/>
    <line x1="180" y1="88" x2="232" y2="88" stroke="var(--text,#334155)" stroke-width="2"/>
    <line x1="180" y1="96" x2="232" y2="96" stroke="var(--text,#334155)" stroke-width="2"/>
    <rect x="28" y="24" width="40" height="28" rx="4" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="32" y="28" width="32" height="20" rx="2" fill="#94a3b8"/>
    <path d="M36 52 L60 52 L66 58 L30 58 Z" fill="#64748b"/>
    <rect x="28" y="118" width="40" height="28" rx="4" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="32" y="122" width="32" height="20" rx="2" fill="#94a3b8"/>
    <path d="M36 146 L60 146 L66 152 L30 152 Z" fill="#64748b"/>
    <rect x="108" y="42" width="12" height="22" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1"/>
    <line x1="126" y1="56" x2="156" y2="68" stroke="#2563eb" stroke-width="2.2" marker-end="url(#fig16-arr-en)"/>
    <rect x="108" y="112" width="12" height="22" rx="2" fill="#059669" stroke="#ffffff" stroke-width="1"/>
    <line x1="126" y1="120" x2="156" y2="108" stroke="#059669" stroke-width="2.2" marker-end="url(#fig16-arr-en)"/>
    <text x="275" y="40" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text,#1e293b)">Router A</text>
    <path d="M230 60 L230 114 A45 14 0 0 0 320 114 L320 60 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
    <ellipse cx="275" cy="60" rx="45" ry="14" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
    <line x1="255" y1="55" x2="295" y2="65" stroke="#334155" stroke-width="2.2"/>
    <line x1="255" y1="65" x2="295" y2="55" stroke="#334155" stroke-width="2.2"/>
    <rect x="266" y="78" width="46" height="26" rx="3" fill="#ffffff" fill-opacity="0.85" stroke="#64748b" stroke-width="1.2"/>
    <rect x="272" y="81" width="9" height="20" rx="1.5" fill="#d97706"/>
    <rect x="285" y="81" width="9" height="20" rx="1.5" fill="#059669"/>
    <rect x="298" y="81" width="9" height="20" rx="1.5" fill="#2563eb"/>
    <line x1="320" y1="90" x2="615" y2="90" stroke="var(--text,#334155)" stroke-width="2.4"/>
    <rect x="330" y="77" width="16" height="24" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1"/>
    <line x1="352" y1="90" x2="405" y2="90" stroke="#2563eb" stroke-width="2.6" marker-end="url(#fig16-arr-en)"/>
    <text x="650" y="62" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text,#1e293b)">Router B</text>
    <path d="M615 82 L615 104 A35 11 0 0 0 685 104 L685 82 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
    <ellipse cx="650" cy="82" rx="35" ry="11" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
    <line x1="634" y1="78" x2="666" y2="86" stroke="#334155" stroke-width="2"/>
    <line x1="634" y1="86" x2="666" y2="78" stroke="#334155" stroke-width="2"/>
    <path d="M230 130 L230 142 L264 142 L264 130" fill="none" stroke="#7c3aed" stroke-width="1.8"/>
    <line x1="247" y1="142" x2="145" y2="174" stroke="#7c3aed" stroke-width="1.4"/>
    <text x="145" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">1. Processing (d_proc)</text>
    <text x="145" y="205" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Header &amp; lookup (~μs)</text>
    <path d="M268 130 L268 142 L316 142 L316 130" fill="none" stroke="#d97706" stroke-width="1.8"/>
    <line x1="292" y1="142" x2="290" y2="174" stroke="#d97706" stroke-width="1.4"/>
    <text x="290" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">2. Queuing (d_queue)</text>
    <text x="290" y="205" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Wait in buffer (La/R)</text>
    <path d="M322 130 L322 142 L354 142 L354 130" fill="none" stroke="#2563eb" stroke-width="1.8"/>
    <line x1="338" y1="142" x2="440" y2="174" stroke="#2563eb" stroke-width="1.4"/>
    <text x="440" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">3. Transmission (L/R)</text>
    <text x="440" y="205" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Pushing bits onto link</text>
    <path d="M360 130 L360 142 L612 142 L612 130" fill="none" stroke="#059669" stroke-width="1.8"/>
    <line x1="486" y1="142" x2="595" y2="174" stroke="#059669" stroke-width="1.4"/>
    <text x="595" y="190" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">4. Propagation (d/v)</text>
    <text x="595" y="205" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Wave travel across wire</text>
  </svg>
  <figcaption><strong>Adapted from Figure 1.16 (printed p. 36, PDF p. 47):</strong> The four physical stages of total nodal delay at Router A. Transmission delay (L/R) is the time to serialize all bits out of the interface, whereas propagation delay (d/v) is the time for an emitted bit to travel across the link to Router B.</figcaption>
</figure>

> **MENTAL MODEL:** **Transmission delay (\(L/R\))** is the time it takes for a group of \(L\) people to pass single-file through a turnstile and step onto a walkway; it depends on the turnstile rate (\(R\)) and the group size (\(L\)). **Propagation delay (\(d/v\))** is the time it takes for **one person** who has already passed the turnstile to walk \(d\) kilometers down the corridor to the next gate; it depends only on corridor length (\(d\)) and walking speed (\(v\)).

---

## 2. Transmission Delay (\(L/R\)) vs Propagation Delay (\(d/v\))

The single most common misconception in introductory networking is assuming that increasing a link’s transmission rate (bandwidth, \(R\)) makes bits travel faster along the wire. Let us compare the two formulas side by side:

$$ d_{\mathrm{trans}} = \frac{L}{R}, \qquad d_{\mathrm{prop}} = \frac{d}{v} $$

Keeping units consistent is essential:

- \(L\): Packet length in **bits** (\(1\text{ B} = 8\text{ b}\)).
- \(R\): Link transmission rate in **bits/second** or **bps** (with \(10^3\), \(10^6\), \(10^9\) multipliers).
- \(d\): Physical distance of the communication link in **meters** (\(1\text{ km} = 10^3\text{ m}\)).
- \(v\) (denoted \(s\) in some textbook passages): Wave propagation speed in the physical medium in **meters/second**. In twisted-pair copper and optical fiber, it lies between two-thirds and the full vacuum speed of light:

$$ 2 \times 10^8 \le v \le 3 \times 10^8 $$

### 2.1 The Caravan and Tollbooth Analogy (Figure 1.17, printed p. 38, PDF p. 49)

Kurose and Ross clarify this distinction with a **ten-car caravan** traveling along a highway with **tollbooths**:

- Each **car** is a **bit**, and the entire ten-car **caravan** is a **packet** (\(L = 10\)).
- Each **tollbooth** is a **router**, and the \(d = 100\text{ km}\) **highway segment** between two tollbooths is a **communication link**.
- Cars travel along the highway at a constant speed of \(v = 100\text{ km/h}\) (**propagation speed**).
- Each tollbooth services one car every 12 seconds, pushing cars onto the highway at rate \(R = 5\) cars per minute (**transmission rate**).

The time required for the tollbooth to push the entire 10-car caravan onto the highway (transmission delay, in minutes) and the time for a car to drive the 100 km highway (propagation delay, in minutes) are:

$$ d_{\mathrm{trans}} = \frac{10}{5} = 2, \qquad d_{\mathrm{prop}} = \frac{100}{100} \times 60 = 60, \qquad d_{\mathrm{trans}} + d_{\mathrm{prop}} = 62 $$

When the tollbooth operates in store-and-forward mode (waiting until all 10 cars have arrived and lined up before servicing the first car), moving the entire caravan from the front of the first tollbooth to the front of the second tollbooth takes 62 minutes.

What if cars traveled at \(v = 1000\text{ km/h} \implies d_{\mathrm{prop}} = 6\) while the tollbooth serviced only \(R = 1 \implies d_{\mathrm{trans}} = 10\)? Because \(d_{\mathrm{prop}} < d_{\mathrm{trans}}\) (\(6 < 10\)), **the first few cars in the caravan reach the second tollbooth before the last cars have even left the first tollbooth!**

<figure class="lesson-figure">
  <svg viewBox="0 0 720 185" role="img" aria-label="Figure 1.17 Caravan analogy: Ten-car caravan and two tollbooths separated by 100 km">
    <rect x="20" y="92" width="680" height="14" rx="3" fill="#64748b" fill-opacity="0.25"/>
    <line x1="25" y1="99" x2="695" y2="99" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="8 6"/>
    <g transform="translate(32,68)">
      <path d="M4 18 L12 6 L36 6 L46 18 L56 18 L56 26 L0 26 L0 18 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.3"/>
      <circle cx="13" cy="26" r="5" fill="#1e293b"/><circle cx="43" cy="26" r="5" fill="#1e293b"/>
    </g>
    <circle cx="105" cy="84" r="3" fill="#2563eb"/><circle cx="117" cy="84" r="3" fill="#2563eb"/><circle cx="129" cy="84" r="3" fill="#2563eb"/>
    <g transform="translate(144,68)">
      <path d="M4 18 L12 6 L36 6 L46 18 L56 18 L56 26 L0 26 L0 18 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.3"/>
      <circle cx="13" cy="26" r="5" fill="#1e293b"/><circle cx="43" cy="26" r="5" fill="#1e293b"/>
    </g>
    <g transform="translate(212,68)">
      <path d="M4 18 L12 6 L36 6 L46 18 L56 18 L56 26 L0 26 L0 18 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.3"/>
      <circle cx="13" cy="26" r="5" fill="#1e293b"/><circle cx="43" cy="26" r="5" fill="#1e293b"/>
    </g>
    <path d="M32 114 L32 124 L268 124 L268 114" fill="none" stroke="var(--text,#334155)" stroke-width="1.6"/>
    <line x1="150" y1="124" x2="150" y2="134" stroke="var(--text,#334155)" stroke-width="1.6"/>
    <text x="145" y="150" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Ten-Car Caravan (L = 10 bits)</text>
    <text x="145" y="165" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Each car = 1 bit</text>
    <rect x="304" y="28" width="44" height="8" rx="2" fill="#475569"/>
    <rect x="314" y="36" width="28" height="70" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
    <rect x="319" y="50" width="18" height="24" rx="2" fill="#e0f2fe" stroke="#64748b" stroke-width="1.2"/>
    <text x="328" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="#2563eb">Tollbooth 1 (Router)</text>
    <text x="328" y="151" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">R = 5 cars/min</text>
    <text x="328" y="166" text-anchor="middle" font-size="10.5" font-weight="700" fill="#2563eb">d_trans = L/R = 2 min</text>
    <line x1="352" y1="60" x2="546" y2="60" stroke="#059669" stroke-width="2"/>
    <polygon points="352,60 360,55 360,65" fill="#059669"/>
    <polygon points="546,60 538,55 538,65" fill="#059669"/>
    <text x="449" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">Distance d = 100 km · v = 100 km/hr</text>
    <text x="449" y="51" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">d_prop = d/v = 60 min</text>
    <rect x="548" y="28" width="44" height="8" rx="2" fill="#475569"/>
    <rect x="558" y="36" width="28" height="70" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
    <rect x="563" y="50" width="18" height="24" rx="2" fill="#e0f2fe" stroke="#64748b" stroke-width="1.2"/>
    <text x="572" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Tollbooth 2 (Router)</text>
    <text x="572" y="151" text-anchor="middle" font-size="10" fill="var(--muted-ink,#52634c)">Waits for all 10 cars</text>
    <text x="572" y="166" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Total = 2 + 60 = 62 min</text>
    <line x1="596" y1="60" x2="692" y2="60" stroke="#059669" stroke-width="2" stroke-dasharray="5 4"/>
    <polygon points="596,60 604,55 604,65" fill="#059669"/>
    <text x="646" y="50" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">100 km →</text>
  </svg>
  <figcaption><strong>Adapted from Figure 1.17 (printed p. 38, PDF p. 49):</strong> The caravan analogy. The time required for a tollbooth to push the caravan onto the highway corresponds to transmission delay (L/R = 2 min), whereas the time for a car to drive the 100 km highway segment corresponds to propagation delay (d/v = 60 min).</figcaption>
</figure>

> **PRACTICAL CHECK:** When a sender starts transmitting at \(t = 0\), the last bit leaves the sender at \(t = d_{\mathrm{trans}}\), whereas the first bit reaches the receiver at \(t = d_{\mathrm{prop}}\).
> - If \(d_{\mathrm{prop}} > d_{\mathrm{trans}}\): At \(t = d_{\mathrm{trans}}\), the first bit is still propagating along the cable; **all bits of the packet are simultaneously in flight on the wire**.
> - If \(d_{\mathrm{prop}} < d_{\mathrm{trans}}\): At \(t = d_{\mathrm{trans}}\), the first bit has already arrived and is being buffered at the receiver while the sender finishes pushing out the trailing bits.

---

## 3. Bandwidth-Delay Product (BDP) and the Physical Width of a Bit

The maximum number of bits that can be in flight inside a communication link at any given instant is the **Bandwidth-Delay Product** (**BDP**, **Problems P25–P27, printed p. 74**):

$$ \mathrm{BDP} = R \cdot d_{\mathrm{prop}} = R \cdot \frac{d}{v} $$

BDP is the **bit capacity of the communication pipe**:

- The transmitter injects \(R\) bits per second into the link.
- It takes \(d_{\mathrm{prop}}\) seconds for the leading bit to reach the far end.
- Therefore, at most \(R \cdot d_{\mathrm{prop}}\) bits can reside in the wire before bits start exiting at the receiver.

Consequently, the **physical spatial length (width) in meters of a single bit** \(w_{\mathrm{bit}}\) propagating along the link is:

$$ w_{\mathrm{bit}} = \frac{d}{\mathrm{BDP}} = \frac{v}{R} $$

For example, in an optical fiber with \(v = 2 \times 10^8\) m/s:
- At \(R = 2 \times 10^6\) bps (2 Mbps), each bit occupies \(w_{\mathrm{bit}} = 100\) meters along the fiber (the length of a football field!).
- At \(R = 10^9\) bps (1 Gbps), each bit occupies \(w_{\mathrm{bit}} = 0.2\) meters (20 cm).

Increasing bandwidth \(R\) does not make bits propagate faster; **it makes each bit physically shorter in meters so that more bits pack into every meter of cable!**

<figure class="lesson-figure">
  <svg viewBox="0 0 720 190" role="img" aria-label="Bandwidth-delay product (BDP) and physical bit width: increasing R leaves propagation speed v unchanged while shrinking each bit's spatial width v/R">
    <text x="20" y="24" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">(a) Lower Transmission Rate (R = 2 Mbps, v = 2×10⁸ m/s) → Spatial bit width w_bit = v/R = 100 m</text>
    <rect x="20" y="34" width="680" height="36" rx="18" fill="var(--surface,#ffffff)" stroke="var(--line,#cbd5e1)" stroke-width="1.8"/>
    <rect x="28" y="40" width="212" height="24" rx="12" fill="#2563eb" opacity="0.88"/>
    <text x="134" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">Bit 3 (w_bit = 100 m)</text>
    <rect x="248" y="40" width="212" height="24" rx="12" fill="#3b82f6" opacity="0.88"/>
    <text x="354" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">Bit 2 (w_bit = 100 m)</text>
    <rect x="468" y="40" width="212" height="24" rx="12" fill="#60a5fa" opacity="0.88"/>
    <text x="574" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">Bit 1 (w_bit = 100 m) → v</text>
    <text x="20" y="102" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">(b) Higher Transmission Rate (R = 1 Gbps, same v = 2×10⁸ m/s) → Spatial bit width w_bit = v/R = 0.2 m (20 cm)</text>
    <rect x="20" y="112" width="680" height="36" rx="18" fill="var(--surface,#ffffff)" stroke="var(--line,#cbd5e1)" stroke-width="1.8"/>
    <g fill="#059669" opacity="0.88">
      <rect x="28" y="118" width="24" height="24" rx="5"/><rect x="56" y="118" width="24" height="24" rx="5"/><rect x="84" y="118" width="24" height="24" rx="5"/><rect x="112" y="118" width="24" height="24" rx="5"/><rect x="140" y="118" width="24" height="24" rx="5"/><rect x="168" y="118" width="24" height="24" rx="5"/><rect x="196" y="118" width="24" height="24" rx="5"/><rect x="224" y="118" width="24" height="24" rx="5"/><rect x="252" y="118" width="24" height="24" rx="5"/><rect x="280" y="118" width="24" height="24" rx="5"/><rect x="308" y="118" width="24" height="24" rx="5"/><rect x="336" y="118" width="24" height="24" rx="5"/><rect x="364" y="118" width="24" height="24" rx="5"/><rect x="392" y="118" width="24" height="24" rx="5"/><rect x="420" y="118" width="24" height="24" rx="5"/><rect x="448" y="118" width="24" height="24" rx="5"/><rect x="476" y="118" width="24" height="24" rx="5"/><rect x="504" y="118" width="24" height="24" rx="5"/><rect x="532" y="118" width="24" height="24" rx="5"/><rect x="560" y="118" width="24" height="24" rx="5"/><rect x="588" y="118" width="24" height="24" rx="5"/><rect x="616" y="118" width="24" height="24" rx="5"/><rect x="644" y="118" width="24" height="24" rx="5"/>
    </g>
    <text x="360" y="172" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">Same propagation speed v and same d_prop = d/v, but 500× more bits fit in the same wire segment (BDP = R · d_prop)</text>
  </svg>
  <figcaption><strong>Pipe Capacity (BDP) and Physical Bit Width (Problems P25–P27, printed p. 74):</strong> Increasing transmission rate R leaves signal propagation speed v unchanged; because bits are injected closer together in time, each bit occupies a shorter physical distance (w_bit = v/R) and the link holds more in-flight bits (BDP = R · d_prop).</figcaption>
</figure>

---

## 4. Store-and-Forward Packet Switching and Pipelining

Most packet switches use **store-and-forward transmission** at the inputs to the links (**§1.3.1, Figure 1.11, printed pp. 23–24, PDF pp. 34–35**).

### 4.1 What Is the Store-and-Forward Rule?

A store-and-forward packet switch **must receive and buffer the entire packet** (all \(L\) bits, from the first bit through the last bit) before it can begin transmitting the first bit of that packet onto the outbound link. Two fundamental engineering constraints require this:
1. The router must verify the frame check sequence (CRC) at the trailer of the packet before forwarding corrupted data.
2. If the incoming link is slower than the outgoing link (\(R_1 < R_2\)), starting to transmit on the faster outgoing link before the entire packet has arrived would cause the router to run out of bits mid-packet (*buffer underflow*).

<figure class="lesson-figure">
  <svg viewBox="0 0 720 190" role="img" aria-label="Figure 1.11 Store-and-forward packet switching: front of packet 1 stored in router while awaiting remaining bits">
    <defs>
      <marker id="fig11-arr-en" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,1 L9,5 L0,9 Z" fill="#0284c7"/>
      </marker>
    </defs>
    <line x1="125" y1="88" x2="315" y2="88" stroke="var(--text,#334155)" stroke-width="2.4"/>
    <line x1="395" y1="88" x2="585" y2="88" stroke="var(--text,#334155)" stroke-width="2.4"/>
    <rect x="65" y="48" width="54" height="36" rx="5" fill="#334155" stroke="#1e293b" stroke-width="1.8"/>
    <rect x="70" y="53" width="44" height="26" rx="2" fill="#94a3b8"/>
    <path d="M78 84 L106 84 L114 94 L70 94 Z" fill="#64748b"/>
    <text x="92" y="114" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text,#1e293b)">Source</text>
    <text x="143" y="46" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">3</text>
    <rect x="137" y="54" width="12" height="30" rx="2" fill="#d97706" stroke="#ffffff" stroke-width="1"/>
    <text x="161" y="46" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">2</text>
    <rect x="155" y="54" width="12" height="30" rx="2" fill="#059669" stroke="#ffffff" stroke-width="1"/>
    <text x="180" y="46" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">1</text>
    <rect x="174" y="54" width="14" height="30" rx="2" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2 2"/>
    <rect x="174" y="68" width="14" height="16" rx="1.5" fill="#0284c7"/>
    <line x1="190" y1="76" x2="338" y2="76" stroke="#0284c7" stroke-width="4" marker-end="url(#fig11-arr-en)"/>
    <text x="235" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">R bps</text>
    <path d="M315 56 L315 98 A40 12 0 0 0 395 98 L395 56 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
    <ellipse cx="355" cy="56" rx="40" ry="12" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
    <line x1="337" y1="51" x2="373" y2="61" stroke="#334155" stroke-width="2.2"/>
    <line x1="337" y1="61" x2="373" y2="51" stroke="#334155" stroke-width="2.2"/>
    <rect x="348" y="64" width="16" height="28" rx="2" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2 2"/>
    <rect x="348" y="78" width="16" height="14" rx="1.5" fill="#0284c7"/>
    <text x="355" y="124" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0284c7">Front of packet 1 stored in router,</text>
    <text x="355" y="140" text-anchor="middle" font-size="11" fill="var(--muted-ink,#52634c)">awaiting remaining bits before forwarding</text>
    <text x="355" y="155" text-anchor="middle" font-size="11" fill="var(--muted-ink,#52634c)">onto outbound link (Store-and-Forward)</text>
    <text x="490" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text,#1e293b)">R bps (idle until full)</text>
    <rect x="585" y="48" width="54" height="36" rx="5" fill="#334155" stroke="#1e293b" stroke-width="1.8"/>
    <rect x="590" y="53" width="44" height="26" rx="2" fill="#94a3b8"/>
    <path d="M598 84 L626 84 L634 94 L590 94 Z" fill="#64748b"/>
    <text x="612" y="114" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text,#1e293b)">Destination</text>
  </svg>
  <figcaption><strong>Adapted from Figure 1.11 (printed p. 24, PDF p. 35):</strong> Store-and-forward packet switching. The source has transmitted part of Packet 1 and its leading bits have reached the router; however, the router must buffer those bits and wait for the last bit of Packet 1 before it can begin transmitting onto the outbound link.</figcaption>
</figure>

### 4.2 Single-Packet End-to-End Delay Across \(N\) Links

Suppose a path from source to destination consists of \(N - 1\) routers, and therefore **\(N\) communication links** in series. First, ignore propagation, processing, and queuing delays (\(d_{\mathrm{prop}} = d_{\mathrm{proc}} = d_{\mathrm{queue}} = 0\)) and assume all \(N\) links have identical rate \(R\):

- \(t = 0\): The source begins pushing the first bit onto Link 1.
- \(t = L/R\): The last bit arrives at Router 1. Router 1 has now stored the entire packet and immediately begins forwarding it onto Link 2.
- \(t = 2L/R\): The entire packet arrives at Router 2 (or at the destination if \(N = 2\)).

Across \(N\) identical links, the store-and-forward end-to-end transmission delay for one packet is (**Equation 1.1, printed p. 24**):

$$ d_{\mathrm{end}} = N \frac{L}{R} $$

Restoring per-node processing delay (\(d_{\mathrm{proc}}\)) and per-link propagation delay (\(d_{\mathrm{prop}} = d/v\)) gives (**Equation 1.2, printed p. 41**):

$$ d_{\mathrm{end}} = N \left( d_{\mathrm{proc}} + \frac{L}{R} + \frac{d}{v} \right) $$

When links have heterogeneous rates (\(R_i\)), distances (\(d_i\)), propagation speeds (\(v_i\)), and queuing delays (\(d_{\mathrm{queue},i}\)) (**Problems P10 & P17**), the single-packet end-to-end delay sums across all hops:

$$ d_{\mathrm{end}} = \sum_{i=1}^{N} \left( \frac{L}{R_i} + \frac{d_i}{v_i} + d_{\mathrm{queue},i} \right) + (N - 1) d_{\mathrm{proc}} $$

> **COMMON MISTAKE:** A path of \(N\) links contains **\(N - 1\) intermediate routers**! When a problem states that "each packet switch delays a packet by \(d_{\mathrm{proc}} = 3\text{ ms}\)" across \(N = 3\) links (**Problem P10**), the total router processing delay is \((3 - 1) \times 3 = 6\text{ ms}\), not \(3 \times 3 = 9\text{ ms}\).

### 4.3 Multi-Packet Pipelining (Figure 1.11 & Problem P2)

What happens when the source sends **\(P\) packets** (each of length \(L\) bits) back-to-back? Let us trace the timeline of **Figure 1.11** (\(N = 2\) links, \(P = 3\) packets, with \(d_{\mathrm{prop}} = 0\)):

- At \(t = L/R\), Router 1 finishes receiving **Packet 1** and begins forwarding it onto Link 2.
- **At the exact same instant \(t = L/R\)**, the source begins transmitting **Packet 2** onto Link 1!
- At \(t = 2L/R\), Packet 1 arrives completely at the destination while Packet 2 arrives completely at Router 1; Router 1 immediately forwards Packet 2 onto Link 2 while the source transmits Packet 3 onto Link 1.
- At \(t = 3L/R\), Packet 2 reaches the destination and Packet 3 reaches Router 1.
- At \(t = 4L/R\), Packet 3 reaches the destination and the transfer is complete!

In general, for **\(P\) back-to-back packets** traversing \(N\) identical links (**Problem P2** generalized with propagation delay):

$$ d_{\mathrm{end}}(P, N) = (N + P - 1)\frac{L}{R} + N\frac{d}{v} $$

The physical interpretation of this formula is crystal clear:
1. **Packet 1** fills the pipeline and reaches the destination in \(N(L/R) + N(d/v)\).
2. **Each of the remaining \(P - 1\) packets** emerges from the pipeline just one transmission time (\(L/R\)) after its predecessor: \((P - 1)(L/R)\).

---

## 5. Message Segmentation (Figure 1.27 & Problem P31)

Why do packet-switched networks segment a large application message (\(F\) bits) into \(P\) smaller packets of \(L = F/P\) bits rather than sending one giant message? Let us compare using **Figure 1.27 (printed p. 75, PDF p. 86)** and **Problem P31** (\(F = 10^6\), \(N = 3\), \(R = 5 \times 10^6\), \(d_{\mathrm{prop}} = 0\)):

1. **Without segmentation (Figure 1.27a):** Transmitting the entire message across one link takes \(F/R = 200\text{ ms}\). Switch 1 waits 200 ms for the full message, Switch 2 waits another 200 ms, and the destination receives the message at \(N \cdot (F/R) = 600\text{ ms}\). Only one link is active at any time while the other two sit idle.
2. **Segmented into \(P = 100\) packets (Figure 1.27b):** Each packet has \(L = 10^4\) bits and takes \(L/R = 2\text{ ms}\) per link. Switch 1 starts utilizing Link 2 after just 2 ms! All 100 packets arrive at the destination in \((N + P - 1)(L/R) = 102 \times 2 = 204\text{ ms}\):

$$ \frac{T_{\mathrm{seg}}}{T_{\mathrm{single}}} = \frac{N + P - 1}{N \cdot P} = \frac{102}{300} = 0.34 $$

<figure class="lesson-figure">
  <svg viewBox="0 0 720 230" role="img" aria-label="Figure 1.27 End-to-end message transport: without message segmentation versus with message segmentation">
    <text x="18" y="24" font-size="11.5" font-weight="700" fill="#dc2626">a. Without Message Segmentation: Only 1 link is active at any time (Total = 3 × 200 = 600 ms)</text>
    <line x1="95" y1="66" x2="235" y2="66" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="295" y1="66" x2="435" y2="66" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="495" y1="66" x2="625" y2="66" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <rect x="48" y="42" width="44" height="30" rx="4" fill="#334155"/><rect x="52" y="46" width="36" height="22" rx="2" fill="#94a3b8"/>
    <text x="70" y="92" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Source</text>
    <path d="M230 44 L230 76 A35 9 0 0 0 300 76 L300 44 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="265" cy="44" rx="35" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <rect x="236" y="52" width="58" height="19" rx="3" fill="#0284c7" stroke="#ffffff" stroke-width="1"/>
    <text x="265" y="65" text-anchor="middle" font-size="9.5" font-weight="700" fill="#ffffff">Message (F)</text>
    <text x="265" y="92" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Packet switch 1 (200 ms)</text>
    <path d="M435 44 L435 76 A30 9 0 0 0 495 76 L495 44 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="465" cy="44" rx="30" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <text x="465" y="92" text-anchor="middle" font-size="10.5" fill="var(--muted-ink,#52634c)">Packet switch 2 (idle)</text>
    <rect x="625" y="42" width="44" height="30" rx="4" fill="#334155"/><rect x="629" y="46" width="36" height="22" rx="2" fill="#94a3b8"/>
    <text x="647" y="92" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Destination</text>
    <line x1="18" y1="112" x2="702" y2="112" stroke="var(--line,#cbd5e1)" stroke-width="1" stroke-dasharray="4 4"/>
    <text x="18" y="134" font-size="11.5" font-weight="700" fill="#059669">b. With Message Segmentation (P = 100 Packet Pipeline): All 3 links work in parallel (Total = 204 ms · ~3× Speedup!)</text>
    <line x1="95" y1="176" x2="235" y2="176" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="295" y1="176" x2="435" y2="176" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="495" y1="176" x2="625" y2="176" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <rect x="48" y="152" width="44" height="30" rx="4" fill="#334155"/><rect x="52" y="156" width="36" height="22" rx="2" fill="#94a3b8"/>
    <text x="70" y="204" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Source</text>
    <rect x="155" y="156" width="12" height="20" rx="2" fill="#d97706" stroke="#ffffff" stroke-width="1"/>
    <text x="161" y="151" text-anchor="middle" font-size="9.5" font-weight="700" fill="#d97706">P3</text>
    <path d="M235 154 L235 186 A30 9 0 0 0 295 186 L295 154 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="265" cy="154" rx="30" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <rect x="259" y="162" width="12" height="20" rx="2" fill="#059669" stroke="#ffffff" stroke-width="1"/>
    <text x="265" y="204" text-anchor="middle" font-size="10.5" font-weight="700" fill="#059669">Switch 1 (forwarding P2)</text>
    <rect x="355" y="156" width="12" height="20" rx="2" fill="#059669" stroke="#ffffff" stroke-width="1"/>
    <text x="361" y="151" text-anchor="middle" font-size="9.5" font-weight="700" fill="#059669">P2</text>
    <path d="M435 154 L435 186 A30 9 0 0 0 495 186 L495 154 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="465" cy="154" rx="30" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <rect x="459" y="162" width="12" height="20" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1"/>
    <text x="465" y="204" text-anchor="middle" font-size="10.5" font-weight="700" fill="#2563eb">Switch 2 (forwarding P1)</text>
    <rect x="555" y="156" width="12" height="20" rx="2" fill="#2563eb" stroke="#ffffff" stroke-width="1"/>
    <text x="561" y="151" text-anchor="middle" font-size="9.5" font-weight="700" fill="#2563eb">P1</text>
    <rect x="625" y="152" width="44" height="30" rx="4" fill="#334155"/><rect x="629" y="156" width="36" height="22" rx="2" fill="#94a3b8"/>
    <text x="647" y="204" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text,#1e293b)">Destination</text>
  </svg>
  <figcaption><strong>Adapted from Figure 1.27 (printed p. 75, PDF p. 86, Problem P31):</strong> (a) Without segmentation, each switch waits for the entire message before forwarding. (b) Segmenting the message into packets enables pipelining: Switch 2 forwards P1 to the destination while Switch 1 forwards P2 to Switch 2 and the source sends P3 to Switch 1.</figcaption>
</figure>

---

## 6. Bottleneck Link, Throughput, and Queue Buildup

In real networks, links along a path rarely have identical rates (**§1.4.4, Figures 1.19–1.20, printed pp. 44–46**). Across \(N\) links with rates \(R_1, R_2, \ldots, R_N\) and no competing cross-traffic, end-to-end **throughput** equals the transmission rate of the slowest link (**the bottleneck link**):

$$ R_{\mathrm{throughput}} = \min\{R_1, R_2, \ldots, R_N\} $$

When a source sends packets back-to-back across a two-link path (\(R_1\) and \(R_2\)), two distinct regimes emerge (**Problem P23, printed p. 73**):

1. **First link is the bottleneck (\(R_1 \le R_2\)):** Packets arrive at the router spaced by \(L/R_1\), and the router drains each packet onto Link 2 in time \(L/R_2 \le L/R_1\). **No queue ever forms at the router (\(d_{\mathrm{queue}} = 0\))**, and packets arrive at the destination spaced by \(L/R_1\).
2. **Second link is the bottleneck (\(R_1 > R_2\)):** The source pumps packets into the router every \(L/R_1\) seconds, but the router requires \(L/R_2 > L/R_1\) seconds to push each packet onto Link 2 (**Figure 1.12, printed p. 25**).
   - Packet 1 arrives at an empty queue: \(d_{\mathrm{queue},1} = 0\).
   - Packet 2 arrives at the router while Packet 1 is still being transmitted! It waits in the output buffer for \(d_{\mathrm{queue},2} = L/R_2 - L/R_1\).
   - Packet \(p\) waits in the output buffer for the following duration:

$$ d_{\mathrm{queue},p} = (p - 1)\left(\frac{L}{R_2} - \frac{L}{R_1}\right), \qquad R_1 > R_2 $$

<figure class="lesson-figure">
  <svg viewBox="0 0 720 190" role="img" aria-label="Figures 1.12 and 1.19 Bottleneck link and router output queue buildup">
    <rect x="34" y="24" width="42" height="28" rx="4" fill="#334155"/><rect x="38" y="28" width="34" height="20" rx="2" fill="#94a3b8"/>
    <text x="55" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Host A</text>
    <rect x="34" y="114" width="42" height="28" rx="4" fill="#334155"/><rect x="38" y="118" width="34" height="20" rx="2" fill="#94a3b8"/>
    <text x="55" y="158" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Host B</text>
    <line x1="78" y1="40" x2="210" y2="82" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <line x1="78" y1="128" x2="210" y2="90" stroke="var(--text,#334155)" stroke-width="2.2"/>
    <text x="142" y="28" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">Fast Access: R₁ = 100 Mbps</text>
    <rect x="122" y="46" width="11" height="20" rx="2" fill="#2563eb"/>
    <rect x="122" y="102" width="11" height="20" rx="2" fill="#0891b2"/>
    <path d="M210 56 L210 108 A46 13 0 0 0 302 108 L302 56 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
    <ellipse cx="256" cy="56" rx="46" ry="13" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
    <line x1="236" y1="51" x2="276" y2="61" stroke="#334155" stroke-width="2"/>
    <line x1="236" y1="61" x2="276" y2="51" stroke="#334155" stroke-width="2"/>
    <rect x="232" y="73" width="62" height="26" rx="3" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
    <rect x="237" y="76" width="9" height="20" rx="1.5" fill="#d97706"/>
    <rect x="249" y="76" width="9" height="20" rx="1.5" fill="#0891b2"/>
    <rect x="261" y="76" width="9" height="20" rx="1.5" fill="#059669"/>
    <rect x="273" y="76" width="9" height="20" rx="1.5" fill="#2563eb"/>
    <path d="M232 122 L232 132 L294 132 L294 122" fill="none" stroke="#dc2626" stroke-width="1.6"/>
    <text x="263" y="148" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">Queue of packets waiting</text>
    <text x="263" y="163" text-anchor="middle" font-size="10.5" fill="var(--muted-ink,#52634c)">for output link (R_in &gt; R_out)</text>
    <line x1="302" y1="86" x2="555" y2="86" stroke="#dc2626" stroke-width="2.6"/>
    <rect x="335" y="64" width="12" height="20" rx="2" fill="#2563eb"/>
    <rect x="360" y="64" width="12" height="20" rx="2" fill="#0891b2"/>
    <rect x="385" y="64" width="12" height="20" rx="2" fill="#059669"/>
    <rect x="425" y="64" width="12" height="20" rx="2" fill="#2563eb"/>
    <rect x="465" y="64" width="12" height="20" rx="2" fill="#0891b2"/>
    <text x="428" y="48" text-anchor="middle" font-size="11.5" font-weight="700" fill="#dc2626">Bottleneck Link: R₂ = 15 Mbps</text>
    <text x="428" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">End-to-End Throughput = min{R₁, R₂} = 15 Mbps</text>
    <path d="M555 72 L555 96 A28 9 0 0 0 611 96 L611 72 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.6"/>
    <ellipse cx="583" cy="72" rx="28" ry="9" fill="#cbd5e1" stroke="#475569" stroke-width="1.6"/>
    <line x1="611" y1="86" x2="646" y2="86" stroke="var(--text,#334155)" stroke-width="2"/>
    <rect x="646" y="70" width="42" height="28" rx="4" fill="#334155"/><rect x="650" y="74" width="34" height="20" rx="2" fill="#94a3b8"/>
    <text x="667" y="114" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text,#1e293b)">Host E</text>
  </svg>
  <figcaption><strong>Adapted from Figures 1.12 &amp; 1.19 (printed pp. 25 and 44, PDF pp. 36 and 55):</strong> When packets arrive from high-speed links (100 Mbps) faster than the bottleneck output link (15 Mbps) can drain them, a queue builds up in the router’s output buffer. End-to-end throughput cannot exceed min{R₁, R₂}.</figcaption>
</figure>

> **INDEPENDENT VERIFICATION:** When you select the **"Bottleneck & Queue (R₁ > R₂)"** preset in the laboratory (\(R_1 = 6 \times 10^6 \implies d_{\mathrm{trans},1} = 2\text{ ms}\), \(R_2 = 2 \times 10^6 \implies d_{\mathrm{trans},2} = 6\text{ ms}\)), you can directly observe in both the space-time diagram and the discrete event log that Packets 1, 2, 3, and 4 experience queuing delays of \(0\text{ ms}\), \(4\text{ ms}\), \(8\text{ ms}\), and \(12\text{ ms}\) at Router 1.
