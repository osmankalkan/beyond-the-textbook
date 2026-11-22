# §1.5 Protocol layers and their service models

> James F. Kurose and Keith W. Ross, *Computer Networking: A Top-Down Approach*, 8th ed., §1.5.1–§1.5.2, printed pp. 47–54 (PDF pp. 58–65).

A browser sends a web request through an Ethernet switch and a router. **Does the router treat the IP destination, Ethernet destination, and application data the same way?** Ask which information is relevant end to end and which is needed for a single link. The lab reduces the exchange to a sample application message.

## Protocol between peers, service to the layer above

A **protocol** defines the format and order of messages exchanged by peers and how they respond. A **service** is what a lower layer provides to the component above it. An application asks TCP for a reliable, ordered byte stream. The TCP peers implement that service with sequence numbers, acknowledgments, and retransmissions. TCP itself uses IP’s datagram delivery service.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 147" role="img" aria-label="Vertical lines are service interfaces. The dashed line is the protocol between peers. Original diagram, §1.5.1." font-family="system-ui, sans-serif" font-size="14">
    <path d="M103 54 L103 95" fill="none" stroke="#527165" stroke-width="2"/><path d="M317 54 L317 95" fill="none" stroke="#527165" stroke-width="2"/><path d="M166 111 L254 111" fill="none" stroke="#527165" stroke-width="2" stroke-dasharray="4 4"/><rect x="40" y="22" width="126" height="32" rx="5" fill="#315d50"/><text x="103.0" y="43" fill="#fff" text-anchor="middle">Application A</text><rect x="40" y="95" width="126" height="32" rx="5" fill="#855239"/><text x="103.0" y="116" fill="#fff" text-anchor="middle">TCP A</text><rect x="254" y="22" width="126" height="32" rx="5" fill="#315d50"/><text x="317.0" y="43" fill="#fff" text-anchor="middle">Application B</text><rect x="254" y="95" width="126" height="32" rx="5" fill="#855239"/><text x="317.0" y="116" fill="#fff" text-anchor="middle">TCP B</text><text x="153" y="76" fill="#29483f" text-anchor="middle">Service</text><text x="210" y="98" fill="#29483f" text-anchor="middle">Protocol</text>
  </svg>
  <figcaption>Vertical lines are service interfaces. The dashed line is the protocol between peers. Original diagram, §1.5.1.</figcaption>
</figure>

This separation lets the application keep the same transport interface when a link changes from Ethernet to Wi‑Fi. Layering simplifies implementations, at the cost of headers and sometimes duplicated work. A wireless link may retry locally. TCP handles end-to-end delivery.

## The five Internet layers

| Layer | Responsibility | Data unit |
| --- | --- | --- |
| Application | Application messages such as HTTP and DNS | Message |
| Transport | Delivery between application endpoints. TCP offers an ordered byte stream and UDP a datagram service. | TCP segment / UDP datagram |
| Network | Delivery across networks using IP addresses. IP offers no delivery, ordering, or delay guarantee. | IP datagram |
| Link | Transfer between nodes on one link. Ethernet is one example. | Frame |
| Physical | Carrying bits as electrical, optical, or radio signals. | Bit |

<figure class="lesson-figure">
  <svg viewBox="0 0 420 210" role="img" aria-label="The Internet stack with an example at each layer. Original diagram, Fig. 1.23." font-family="system-ui, sans-serif" font-size="14">
    <rect x="46" y="12" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="33" fill="#fff" text-anchor="middle">Application</text><text x="275" y="33" fill="#29483f" text-anchor="middle">HTTP / DNS</text><rect x="46" y="50" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="71" fill="#fff" text-anchor="middle">Transport</text><text x="275" y="71" fill="#29483f" text-anchor="middle">TCP / UDP</text><rect x="46" y="88" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="109" fill="#fff" text-anchor="middle">Network</text><text x="275" y="109" fill="#29483f" text-anchor="middle">IP</text><rect x="46" y="126" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="147" fill="#fff" text-anchor="middle">Link</text><text x="275" y="147" fill="#29483f" text-anchor="middle">Ethernet</text><rect x="46" y="164" width="141" height="32" rx="5" fill="#315d50"/><text x="116.5" y="185" fill="#fff" text-anchor="middle">Physical</text><text x="275" y="185" fill="#29483f" text-anchor="middle">Signal</text>
  </svg>
  <figcaption>The Internet stack with an example at each layer. Original diagram, Fig. 1.23.</figcaption>
</figure>

The OSI reference model also has separate **session** and **presentation** layers. Session functions can organize or resume an interaction. Presentation functions can include representation conversion, compression, or encryption. In the five-layer Internet model, software at the upper layers handles these functions as needed.

## A header becomes part of the next layer’s payload

At the sender, the transport header goes on the message, and the IPv4 header goes on the transport unit. Ethernet then adds a header and an error-checking trailer called the FCS. Let \(M\) be the application bytes, \(H_T\) the transport header, and \(H_I\) the IP header.

$$ D = M + H_T + H_I $$

An untagged Ethernet frame has a 14-byte header and a 4-byte FCS. Its payload must be at least 46 bytes. Let \(P\) be padding and \(F\) the frame length. This model excludes the preamble and interframe gap.

$$ P = \max(0, 46 - D) $$

$$ F = 14 + D + P + 4 $$

<figure class="lesson-figure">
  <svg viewBox="0 0 420 107" role="img" aria-label="Padding and the FCS belong to Ethernet. Boxes show field order. Original diagram, Fig. 1.24." font-family="system-ui, sans-serif" font-size="14">
    <rect x="14" y="22" width="58" height="32" rx="5" fill="#855239"/><text x="43.0" y="43" fill="#fff" text-anchor="middle">MAC</text><rect x="76" y="22" width="60" height="32" rx="5" fill="#315d50"/><text x="106.0" y="43" fill="#fff" text-anchor="middle">IPv4</text><rect x="140" y="22" width="58" height="32" rx="5" fill="#315d50"/><text x="169.0" y="43" fill="#fff" text-anchor="middle">UDP</text><rect x="202" y="22" width="74" height="32" rx="5" fill="#315d50"/><text x="239.0" y="43" fill="#fff" text-anchor="middle">Data</text><rect x="280" y="22" width="62" height="32" rx="5" fill="#855239"/><text x="311.0" y="43" fill="#fff" text-anchor="middle">Pad</text><rect x="346" y="22" width="57" height="32" rx="5" fill="#855239"/><text x="374.5" y="43" fill="#fff" text-anchor="middle">FCS</text><path d="M76 59 v8 H276 v-8" fill="none" stroke="#527165" stroke-width="2"/><text x="176" y="86" fill="#29483f" text-anchor="middle">IP datagram</text>
  </svg>
  <figcaption>Padding and the FCS belong to Ethernet. Boxes show field order. Original diagram, Fig. 1.24.</figcaption>
</figure>

**Make a prediction:** Twelve bytes of data, an eight-byte UDP header, and a 20-byte IPv4 header produce a 40-byte datagram. Ethernet adds six padding bytes to reach its minimum, giving a 64-byte frame. With a 20-byte TCP header, the datagram is 52 bytes and the frame is 70. The transport headers differ by 12 bytes, but the two frames differ by six. Select each protocol in the lab and use the padding readout to explain the difference.

## The switch, router, and receiver do different jobs

<figure class="lesson-figure">
  <svg viewBox="0 0 420 120" role="img" aria-label="The router creates a new Ethernet frame for the second link. Original diagram, Fig. 1.24." font-family="system-ui, sans-serif" font-size="14">
    <path d="M55 58 L365 58" fill="none" stroke="#527165" stroke-width="2"/><rect x="10" y="42" width="94" height="32" rx="5" fill="#315d50"/><text x="57.0" y="63" fill="#fff" text-anchor="middle">Sender</text><rect x="112" y="42" width="94" height="32" rx="5" fill="#315d50"/><text x="159.0" y="63" fill="#fff" text-anchor="middle">Switch</text><rect x="214" y="42" width="94" height="32" rx="5" fill="#855239"/><text x="261.0" y="63" fill="#fff" text-anchor="middle">Router</text><rect x="316" y="42" width="94" height="32" rx="5" fill="#315d50"/><text x="363.0" y="63" fill="#fff" text-anchor="middle">Receiver</text><text x="113" y="26" fill="#29483f" text-anchor="middle">Link 1</text><text x="336" y="26" fill="#29483f" text-anchor="middle">Link 2</text><text x="113" y="99" fill="#29483f" text-anchor="middle">TTL 64</text><text x="336" y="99" fill="#29483f" text-anchor="middle">TTL 63</text>
  </svg>
  <figcaption>The router creates a new Ethernet frame for the second link. Original diagram, Fig. 1.24.</figcaption>
</figure>

1. The **Ethernet switch** chooses an output port from the destination MAC address. In this example, it leaves the IP header alone and TTL stays the same.
2. The **IP router** removes the incoming Ethernet envelope, chooses an output using the destination IP address, decrements the IPv4 TTL, updates the IP header checksum, and builds an Ethernet frame for the next link.
3. The **receiver** removes the Ethernet envelope and any padding. It passes the IP payload to the transport protocol indicated by the IP header. Transport delivers the application bytes to the appropriate endpoint.

The lab uses Ethernet on both links, so both frames can have the same size. **Equal length can hide a change in contents.** The MAC addresses change from one link to the next. The source and destination IP addresses stay the same in this model, while TTL drops from 64 to 63. The physical layer carries the frame’s bits over each link.
