# §1.7 History of computer networking and the Internet

> Kurose and Ross, *Computer Networking: A Top-Down Approach*, 8th ed., §1.7.1–§1.7.5, printed pp. 58–64 (PDF 69–75).

Opening a browser brings together at least three developments. Packets share a network, common rules connect different networks, and the Web retrieves documents over that infrastructure. Match each milestone to the problem it addressed.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 100" role="img" aria-label="Packet networking, internetworking design, coordinated transition, and an application." font-family="system-ui, sans-serif" font-size="13">
    <path d="M67 60 L353 60" stroke="#526b60" stroke-width="2" fill="none"/><text x="57" y="27" text-anchor="middle" fill="#34584b">1969</text><rect x="13" y="43" width="88" height="34" rx="6" fill="#315d50"/><text x="57.0" y="65" text-anchor="middle" fill="#fff">ARPANET</text><text x="159" y="27" text-anchor="middle" fill="#34584b">1974</text><rect x="115" y="43" width="88" height="34" rx="6" fill="#315d50"/><text x="159.0" y="65" text-anchor="middle" fill="#fff">Shared design</text><text x="261" y="27" text-anchor="middle" fill="#34584b">1983</text><rect x="217" y="43" width="88" height="34" rx="6" fill="#315d50"/><text x="261.0" y="65" text-anchor="middle" fill="#fff">TCP/IP</text><text x="363" y="27" text-anchor="middle" fill="#34584b">1989–1991</text><rect x="319" y="43" width="88" height="34" rx="6" fill="#855239"/><text x="363.0" y="65" text-anchor="middle" fill="#fff">Web</text>
  </svg>
  <figcaption>Packet networking, internetworking design, coordinated transition, and an application.</figcaption>
</figure>

## 1960s and 1970s: From a network to a network of networks

Computer traffic comes in bursts. Packet switching lets the next packet use available resources. With four nodes by the end of 1969, **ARPANET** was an early example. ARPANET had its own host communication rules. **ALOHAnet** explored shared radio packet communication in Hawaii. Different media and designs created a need for rules that could connect different networks.

Cerf and Kahn’s **1974** work addressed how to join networks while keeping their internal designs. A network can change its links or local protocol. A shared protocol family allows independent networks to interoperate end to end.

## 1980s: Putting common protocols into operation

In **1983**, ARPANET made a coordinated transition to TCP/IP. That distinction matters: an approach was proposed in 1974, and deployment and coordination were needed before hosts could use the new rules. Treat the proposal and the transition as separate points on the timeline.

$$ \Delta t = t_2 - t_1 $$

1983 − 1974 is nine calendar years. It does not establish that every network transitioned at once. Other developments included the distributed **DNS** naming system and **NSFNET**, a backbone that expanded research access.

## 1990s: The Web and commercial backbones

Developed at CERN in **1989–1991**, the Web used browsers, HTTP, and HTML to make linked documents accessible. The Internet already carried applications such as email. The **1995** retirement of the NSFNET backbone shifted backbone traffic to commercial providers. Document access and operation of the backbone are different milestones.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 170" role="img" aria-label="Layers and networks a Web request relies on. Original diagram, §1.7." font-family="system-ui, sans-serif" font-size="13">
    <rect x="90" y="15" width="240" height="34" rx="6" fill="#855239"/><text x="210.0" y="37" text-anchor="middle" fill="#fff">Web documents</text><path d="M210 49 L210 67" stroke="#526b60" stroke-width="2" fill="none"/><rect x="90" y="67" width="240" height="34" rx="6" fill="#315d50"/><text x="210.0" y="89" text-anchor="middle" fill="#fff">Internetworking over TCP/IP</text><path d="M210 101 L210 119" stroke="#526b60" stroke-width="2" fill="none"/><rect x="90" y="119" width="240" height="34" rx="6" fill="#315d50"/><text x="210.0" y="141" text-anchor="middle" fill="#fff">Access networks and backbones</text>
  </svg>
  <figcaption>Layers and networks a Web request relies on. Original diagram, §1.7.</figcaption>
</figure>

## 2000s onward: Mobile endpoints and nearby content

Broadband and wireless access made day-to-day use more common. Connecting mobile devices is an **access** problem. Serving nearby content is a **placement and interconnection** problem. Distributed data centers and private content-provider networks helped with the second one.

**Lab check:** For “Open linked documents in a browser,” select the TCP/IP transition first, then development of the Web at CERN. Explain why the second selection addresses the need directly and which infrastructure the first helped provide.
