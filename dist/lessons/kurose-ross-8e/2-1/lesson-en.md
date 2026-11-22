# §2.1 Principles of network applications

> Kurose & Ross, 8. ed., §2.1, pp. 82–95 (PDF 93–106).

A file-sharing system and a live audio application use the same network. The file must arrive intact. A late audio chunk may be useless at playback time. **Which transport service does each application need?**

## Architecture and processes

Application processes run on end systems. In client–server architecture, the client initiates a request and the server provides a service. In P2P, peers can request and provide service. A P2P system can still use a central component for discovery or sign-in.

A process hands data to the network through a **socket**. An IP address identifies a network endpoint. Transport protocol and port help identify the transport endpoint. A server can hold multiple TCP connections on one local port. TCP distinguishes them by source and destination IP/port pairs.

<figure class="lesson-figure">
  <svg viewBox="0 0 410 75" role="img" aria-label="The socket is the interface through which the application uses transport." font-family="system-ui" font-size="12">
    <path d="M65 37H345" stroke="#527165" stroke-width="2"/><rect x="12" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="72" y="42" text-anchor="middle" fill="white">Application</text><rect x="146" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="206" y="42" text-anchor="middle" fill="white">Socket</text><rect x="280" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="340" y="42" text-anchor="middle" fill="white">TCP / UDP</text>
  </svg>
  <figcaption>The socket is the interface through which the application uses transport.</figcaption>
</figure>

## Four requirements

**Reliability:** Is every byte needed? **Throughput:** Is there a minimum useful rate? **Timing:** Does the data expire? **Security:** Must content and endpoint identity be protected?

TCP establishes a connection, supplies an ordered reliable byte stream, and handles flow and congestion control. The application defines its own message boundaries. UDP preserves datagram boundaries and sends without setting up a connection. If delivery, ordering, or retransmission is needed, the application must address it separately. Neither service guarantees minimum throughput or latency. TLS can provide encryption and integrity alongside trusted authentication.

In the lab, try the same transport for a file, live audio, and a game. Retransmitting an old position can be less useful than receiving a new one. In a file transfer, the same missing piece may invalidate the whole result.

## What does the application protocol define?

It defines message types, syntax, field meanings, and rules for sending and replying. A file request and an error response are different types. The application protocol defines what “not found” means. TCP handles the ordering of the bytes carrying that response. Later sections apply the distinction to Web/HTTP, email, DNS, P2P, video, and sockets.

<figure class="lesson-figure">
  <svg viewBox="0 0 410 75" role="img" aria-label="An application protocol defines the message and receiver behavior." font-family="system-ui" font-size="12">
    <path d="M65 37H345" stroke="#527165" stroke-width="2"/><rect x="12" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="72" y="42" text-anchor="middle" fill="white">Message type</text><rect x="146" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="206" y="42" text-anchor="middle" fill="white">Syntax and meaning</text><rect x="280" y="20" width="120" height="35" rx="5" fill="#315d50"/><text x="340" y="42" text-anchor="middle" fill="white">Response</text>
  </svg>
  <figcaption>An application protocol defines the message and receiver behavior.</figcaption>
</figure>

## What changes with the architecture?

As a preview of §2.5, let \(F\) be the file size in Mbit, \(N\) the recipient count, \(u_s\) source upload, \(u\) upload per peer, and \(d\) the slowest download. Rates are in Mbit/s. In client–server, the source uploads every copy. In either design the slowest receiver needs at least \(F/d\) seconds.

$$ T_c \ge \max(NF/u_s, F/d) $$

In P2P the source must contribute at least one file’s worth of original data. The source and peers together must send a total of \(NF\) Mbit to all recipients. Take the largest of these three bounds.

$$ T_p \ge \max(F/u_s, F/d, NF/(u_s+Nu)) $$

Try \(F=1000\), \(N=10\), \(u_s=20\), \(u=2\), and \(d=10\). The client–server bound is 500 s. P2P candidates are 50, 100, and 250 s. At \(u=0\) both bounds become 500 s. In the lab lower the slowest receiver to 1 Mbit/s. Both designs now need at least 1,000 s. Actual completion also depends on overhead and how pieces become available.
