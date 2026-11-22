# §1.8 Chapter review: Follow the full path

> Kurose and Ross, *Computer Networking: A Top-Down Approach*, 8th ed., §1.8, printed pp. 64–65 (PDF 75–76). This review combines topics from §1.1–§1.7 in one example.

A campus client sends three short messages to a remote server. **Should an operator improve the access link, the backbone, or the server’s location?** The answer depends on whether the goal is earlier first arrival, earlier completion, or a higher sustained transfer rate.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 126" role="img" aria-label="Two serial links in the campus example. Original diagram, §1.8." font-family="system-ui, sans-serif" font-size="13">
    <path d="M72 67 L349 67" stroke="#526b60" stroke-width="2" fill="none"/><rect x="15" y="50" width="90" height="34" rx="6" fill="#315d50"/><text x="60.0" y="72" text-anchor="middle" fill="#fff">Client</text><rect x="159" y="50" width="102" height="34" rx="6" fill="#315d50"/><text x="210.0" y="72" text-anchor="middle" fill="#fff">Router</text><rect x="315" y="50" width="90" height="34" rx="6" fill="#855239"/><text x="360.0" y="72" text-anchor="middle" fill="#fff">Server</text><text x="132" y="36" text-anchor="middle" fill="#34584b">10 Mbit/s</text><text x="288" y="36" text-anchor="middle" fill="#34584b">2 Mbit/s</text><text x="132" y="106" text-anchor="middle" fill="#34584b">2 km</text><text x="288" y="106" text-anchor="middle" fill="#34584b">400 km</text>
  </svg>
  <figcaption>Two serial links in the campus example. Original diagram, §1.8.</figcaption>
</figure>

## Start with the path and the data unit

Client and server are the application’s endpoints. The **access network** connects the client to the first router. Routers forward packets across the **network core**. Links and policies between providers help form the end-to-end path.

Transport, IP, and local link headers wrap the application data. In the lab, 1,000 application bytes plus 20 TCP, 20 IPv4, and 18 Ethernet overhead bytes form a 1,058-byte frame. Transmission time uses the frame size in bits.

$$ L = 8 F $$

## Calculate three different quantities

| Goal | Relation | Campus example |
| --- | --- | --- |
| Time to put bits onto a link | \(L/R\) | 8,464 bits take 4.232 ms at 2 Mbit/s |
| Time for the signal to travel | \(d/v\) | 400 km takes 2 ms at 2 × 10⁸ m/s |
| Ideal sustained rate limit | \(\min(R_1,R_2)\) | 10 and 2 Mbit/s links give 2 Mbit/s |

For the first frame, assume no queue or processing delay and a store-and-forward router. Let \(R_1,R_2\) be the link rates and \(T_p\) the total propagation time.

$$ T_1 = \frac{L}{R_1} + \frac{L}{R_2} + T_p $$

With paths of 2 km and 400 km at the same signal speed, total propagation is 2.01 ms. The first frame arrives in 0.8464 + 4.232 + 2.01 = 7.0884 ms. The following frames leave the bottleneck 4.232 ms apart. The third arrives in 7.0884 + 2 × 4.232 = 15.5524 ms.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 124" role="img" aria-label="Distance and link rate affect different measurements." font-family="system-ui, sans-serif" font-size="13">
    <rect x="14" y="22" width="165" height="34" rx="6" fill="#315d50"/><text x="96.5" y="44" text-anchor="middle" fill="#fff">Link distance</text><path d="M179 39 L239 39" stroke="#526b60" stroke-width="2" fill="none"/><rect x="239" y="22" width="165" height="34" rx="6" fill="#855239"/><text x="321.5" y="44" text-anchor="middle" fill="#fff">Propagation time</text><rect x="14" y="71" width="165" height="34" rx="6" fill="#315d50"/><text x="96.5" y="93" text-anchor="middle" fill="#fff">Link rate</text><path d="M179 88 L239 88" stroke="#526b60" stroke-width="2" fill="none"/><rect x="239" y="71" width="165" height="34" rx="6" fill="#855239"/><text x="321.5" y="93" text-anchor="middle" fill="#fff">Transmission and capacity</text>
  </svg>
  <figcaption>Distance and link rate affect different measurements.</figcaption>
</figure>

**Lab check:** Speed up access first. The bottleneck stays at 2 Mbit/s, although the first frame arrives earlier. Speed up the backbone next and compare queueing. Moving the server closer changes propagation time.

## The numbers explain only part of the problem

If data gets through in readable plaintext, confidentiality needs attention. If the destination’s identity cannot be verified, examine how trust is established. A capacity upgrade does not resolve those two observations directly.

The historical sequence explains the same design. Packet switching enabled sharing, common TCP/IP rules let independent networks interoperate, and the Web became a widely used application over that infrastructure. In a problem, identify whether the question concerns the application, access, core, or security. Then write down the evidence and units relevant to that part.
