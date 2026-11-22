# §1.3 The network core

> James F. Kurose and Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8th ed., §1.3.1–§1.3.3, printed pp. 22–34 (PDF pp. 33–45).

Seven devices on a campus network start sending data together. The campus uplink can carry four packets per frame. **What happens after the first frame?** With packet switching, three packets join the queue. With four fixed circuits, three flows cannot get a circuit. The link is the same, but the rules for sharing it differ.

## A packet’s next step

An end system splits a message into packets. A router reads the destination in a packet’s header and uses its **forwarding table** to choose an output link. This local decision is *forwarding*. **Routing** computes paths through the network and informs the forwarding tables. If a link to a neighboring router fails, for instance, routing may compute a new path. Once the table updates, subsequent packets use the new output link.

<figure class="lesson-figure">
  <svg viewBox="0 0 436 133" role="img" aria-label="The entry for D selects output 2. Original diagram, §1.3.1, pp. 25–26." font-family="system-ui, sans-serif" font-size="15">
    <path d="M116 45 L167 45" stroke="#526b60" stroke-width="2"/><circle cx="167" cy="45" r="3" fill="#526b60"/><path d="M263 45 L315 45" stroke="#526b60" stroke-width="2"/><circle cx="315" cy="45" r="3" fill="#526b60"/><path d="M240 62 L315 90" stroke="#526b60" stroke-width="2"/><circle cx="315" cy="90" r="3" fill="#526b60"/><rect x="18" y="28" width="98" height="34" rx="6" fill="#315d50"/><text x="67.0" y="50" fill="white" text-anchor="middle">Packet D</text><rect x="171" y="28" width="92" height="34" rx="6" fill="#315d50"/><text x="217.0" y="50" fill="white" text-anchor="middle">Router</text><rect x="319" y="28" width="98" height="34" rx="6" fill="#526b60"/><text x="368.0" y="50" fill="white" text-anchor="middle">Output 1</text><rect x="319" y="73" width="98" height="34" rx="6" fill="#a85d35"/><text x="368.0" y="95" fill="white" text-anchor="middle">Output 2</text><text x="183" y="117" fill="#36534a" text-anchor="middle">Forwarding table   D → 2</text>
  </svg>
  <figcaption>The entry for D selects output 2. Original diagram, §1.3.1, pp. 25–26.</figcaption>
</figure>

In the store-and-forward model, a router receives the last bit of a packet before sending it on the output link. A packet of \(L\) bits takes \(L/R\) seconds to put on a link running at \(R\) bits/s. For one packet crossing two equal-rate links, with other delays ignored:

$$ T = \frac{2L}{R} $$

Sending a 1,000-byte packet at 2 Mbit/s takes 4 ms. The intermediate router starts transmission on the second link at 4 ms and sends the last bit at 8 ms. Explore the multi-link timeline in §1.4.

## When does the output link fill up?

To count waiting packets, add new arrivals to the existing queue. Let \(Q_{t-1}\) be the previous queue, \(A_t\) the new arrivals, and \(K\) the frame capacity. The link serves the smaller of the ready packet count and the frame capacity:

$$ S_t = \min(K, Q_{t-1} + A_t) $$

$$ Q_t = Q_{t-1} + A_t - S_t $$

<figure class="lesson-figure">
  <svg viewBox="0 0 436 108" role="img" aria-label="Accounting for the first burst frame. Original diagram, §1.3.1, Fig. 1.12." font-family="system-ui, sans-serif" font-size="15">
    <path d="M127 54 L147 54 L147 22 L218 22 L218 33" stroke="#526b60" stroke-width="2"/><circle cx="218" cy="33" r="3" fill="#526b60"/><path d="M147 54 L147 89 L364 89 L364 75" stroke="#526b60" stroke-width="2"/><circle cx="364" cy="75" r="3" fill="#526b60"/><rect x="17" y="37" width="110" height="34" rx="6" fill="#315d50"/><text x="72.0" y="59" fill="white" text-anchor="middle">7 arrivals</text><rect x="169" y="37" width="98" height="34" rx="6" fill="#315d50"/><text x="218.0" y="59" fill="white" text-anchor="middle">4 sent</text><rect x="309" y="37" width="110" height="34" rx="6" fill="#a85d35"/><text x="364.0" y="59" fill="white" text-anchor="middle">3 waiting</text>
  </svg>
  <figcaption>Accounting for the first burst frame. Original diagram, §1.3.1, Fig. 1.12.</figcaption>
</figure>

Let seven packets arrive per frame for three frames, with capacity for four per frame. The queue grows **3 → 6 → 9** at successive frame ends. Once arrivals stop, it drains **5 → 1 → 0**. Check: 21 arrived, four left in each of the first five frames, and one left in the sixth. A finite buffer can drop a packet that arrives when the buffer is full. The lab uses an unlimited queue.

## How do circuits reserve capacity?

In a circuit-switched network, setup reserves resources on every link along a path. When \(K\) equal circuits share a single link of rate \(R\), each circuit gets:

$$ R_{\mathrm{c}} = \frac{R}{K} $$

**FDM** assigns each circuit a separate frequency band. **TDM** assigns it a recurring time slot in each frame. With \(b\) bits per slot and \(f\) frames per second, a circuit gets \(bf\) bits/s.

$$ R_{\mathrm{c}} = b f $$

<figure class="lesson-figure">
  <svg viewBox="0 0 436 108" role="img" aria-label="Slot 2 returns to the same circuit in each frame. Original diagram, §1.3.2, Fig. 1.14." font-family="system-ui, sans-serif" font-size="15">
    <text x="120" y="20" fill="#36534a" text-anchor="middle">Frame 1</text><text x="314" y="20" fill="#36534a" text-anchor="middle">Frame 2</text><rect x="42" y="32" width="35" height="34" rx="6" fill="#315d50"/><text x="59.5" y="54" fill="white" text-anchor="middle">1</text><rect x="82" y="32" width="35" height="34" rx="6" fill="#a85d35"/><text x="99.5" y="54" fill="white" text-anchor="middle">2</text><rect x="122" y="32" width="35" height="34" rx="6" fill="#526b60"/><text x="139.5" y="54" fill="white" text-anchor="middle">3</text><rect x="162" y="32" width="35" height="34" rx="6" fill="#526b60"/><text x="179.5" y="54" fill="white" text-anchor="middle">4</text><rect x="236" y="32" width="35" height="34" rx="6" fill="#315d50"/><text x="253.5" y="54" fill="white" text-anchor="middle">1</text><rect x="276" y="32" width="35" height="34" rx="6" fill="#a85d35"/><text x="293.5" y="54" fill="white" text-anchor="middle">2</text><rect x="316" y="32" width="35" height="34" rx="6" fill="#526b60"/><text x="333.5" y="54" fill="white" text-anchor="middle">3</text><rect x="356" y="32" width="35" height="34" rx="6" fill="#526b60"/><text x="373.5" y="54" fill="white" text-anchor="middle">4</text><text x="216" y="91" fill="#36534a" text-anchor="middle">Time →</text>
  </svg>
  <figcaption>Slot 2 returns to the same circuit in each frame. Original diagram, §1.3.2, Fig. 1.14.</figcaption>
</figure>

**Make a lab prediction:** Choose four reserved slots, two active flows, and three frames. Two circuit slots stay idle. Try seven active flows next. Three flows cannot get a circuit. With packet switching, all seven can offer data. The excess packets wait in the queue.

A low average can conceal a short burst. For instance, arrivals of 6, 0, 0 average two packets per frame. If the queue is initially empty and capacity is four, two packets still wait after the first frame. Use that observation to compare on-demand packet sharing with the predictable rate of a circuit reservation.

## How does one provider reach another?

An access provider (ISP) can buy **transit** to reach distant networks. Through **peering**, two networks can directly exchange their own traffic and that of customers covered by their agreement. An **IXP** (Internet exchange point) is shared infrastructure where participating networks can establish these connections. Each pair at an exchange decides whether to exchange traffic.

<figure class="lesson-figure">
  <svg viewBox="0 0 436 147" role="img" aria-label="ISP A can peer with B at the exchange and buy transit for other destinations. Original diagram, §1.3.3, Fig. 1.15." font-family="system-ui, sans-serif" font-size="15">
    <path d="M82 46 L172 46" stroke="#526b60" stroke-width="2"/><circle cx="172" cy="46" r="3" fill="#526b60"/><path d="M260 46 L351 46" stroke="#526b60" stroke-width="2"/><circle cx="351" cy="46" r="3" fill="#526b60"/><path d="M174 114 L79 64" stroke="#526b60" stroke-width="2"/><circle cx="79" cy="64" r="3" fill="#526b60"/><rect x="14" y="28" width="68" height="34" rx="6" fill="#315d50"/><text x="48.0" y="50" fill="white" text-anchor="middle">ISP A</text><rect x="176" y="28" width="84" height="34" rx="6" fill="#315d50"/><text x="218.0" y="50" fill="white" text-anchor="middle">IXP</text><rect x="355" y="28" width="68" height="34" rx="6" fill="#315d50"/><text x="389.0" y="50" fill="white" text-anchor="middle">ISP B</text><rect x="174" y="96" width="100" height="34" rx="6" fill="#315d50"/><text x="224.0" y="118" fill="white" text-anchor="middle">Transit</text><text x="219" y="79" fill="#36534a" text-anchor="middle">Peering at the IXP</text>
  </svg>
  <figcaption>ISP A can peer with B at the exchange and buy transit for other destinations. Original diagram, §1.3.3, Fig. 1.15.</figcaption>
</figure>

A provider’s **PoP** (point of presence) is a group of routers where other networks can connect to it. An ISP can connect to multiple upstream providers for resilience or reach (*multihoming*). Content providers can also build private backbones and connect close to access networks. When tracing a route, ask which traffic each pair of networks has agreed to carry. Physical connections, commercial relationships, and selected packet paths convey different information.
