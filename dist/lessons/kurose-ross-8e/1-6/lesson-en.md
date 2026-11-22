# §1.6 Networks under attack

> Kurose and Ross, *Computer Networking: A Top-Down Approach*, 8th ed., §1.6, printed pp. 54–58 (PDF 65–69).

The campus portal is up, but users cannot retrieve files. That same day, an audit exposes a readable message. **Would one control address both symptoms?** Start by looking at availability in the first case and confidentiality in the second.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 107" role="img" aria-label="A symptom suggests the first security question to ask." font-family="system-ui, sans-serif" font-size="13">
    <text x="73" y="26" text-anchor="middle" fill="#34584b">Readable</text><path d="M73 34 L73 54" stroke="#526b60" stroke-width="2" fill="none"/><rect x="12" y="54" width="122" height="34" rx="6" fill="#315d50"/><text x="73.0" y="76" text-anchor="middle" fill="#fff">Confidentiality</text><text x="210" y="26" text-anchor="middle" fill="#34584b">Modified</text><path d="M210 34 L210 54" stroke="#526b60" stroke-width="2" fill="none"/><rect x="149" y="54" width="122" height="34" rx="6" fill="#315d50"/><text x="210.0" y="76" text-anchor="middle" fill="#fff">Integrity</text><text x="347" y="26" text-anchor="middle" fill="#34584b">Delayed</text><path d="M347 34 L347 54" stroke="#526b60" stroke-width="2" fill="none"/><rect x="286" y="54" width="122" height="34" rx="6" fill="#855239"/><text x="347.0" y="76" text-anchor="middle" fill="#fff">Availability</text>
  </svg>
  <figcaption>A symptom suggests the first security question to ask.</figcaption>
</figure>

## Four symptoms and first checks

| Symptom | Risk | First check |
| --- | --- | --- |
| Content can be read along the path. | Loss of confidentiality | Use an authenticated encrypted channel. |
| Sender identity or data cannot be verified. | Impersonation or loss of integrity | Verify identity and message integrity. |
| A device behaves unexpectedly. | Possible malware | Isolate it, examine the evidence, and recover from a trusted state. |
| Legitimate requests miss their deadlines. | Loss of availability | Find the saturated resource and measure completed requests. |

**Passive eavesdropping** lets someone copy and read traffic, so confidentiality can fail even when data stays unchanged. With **source spoofing**, a packet’s source field can misrepresent its sender. A trustworthy identity requires verification beyond the address field.

**Malware** performs unwanted work on a device. A worm can spread on its own. A virus attaches to a host file or program to reproduce. A remotely controlled group of compromised devices is a *botnet*. Patching and limited privileges reduce the chance of compromise. A separate, verified backup supports recovery.

## Test availability by measuring capacity

Denial of service (*DoS*) disrupts legitimate service by exhausting resources. If the activity comes from distributed sources, it is *DDoS*. Start with the number of legitimate jobs that completed and compare it with legitimate demand.

$$ A = \frac{S}{N} $$

Here \(S\) is completed legitimate work and \(N\) is legitimate demand. Suppose the shared pool has 100 work units, 60 are already busy, and new legitimate demand is 80. The current window can complete at most 40 of those jobs. An 80-unit reservation in the model raises the completed share from 50% to 100%. This synthetic example changes allocation within the same budget. In a real system, which work should receive priority and which resource is saturated are separate questions.

<figure class="lesson-figure">
  <svg viewBox="0 0 420 115" role="img" aria-label="Available capacity in the shared pool. An original synthetic example for §1.6." font-family="system-ui, sans-serif" font-size="13">
    <text x="215" y="24" text-anchor="middle" fill="#34584b">100 work units</text><rect x="35" y="39" width="216" height="34" rx="6" fill="#855239"/><text x="143.0" y="61" text-anchor="middle" fill="#fff">60 busy</text><rect x="251" y="39" width="144" height="34" rx="6" fill="#315d50"/><text x="323.0" y="61" text-anchor="middle" fill="#fff">40 available</text><text x="215" y="97" text-anchor="middle" fill="#34584b">40 of 80 new units complete</text>
  </svg>
  <figcaption>Available capacity in the shared pool. An original synthetic example for §1.6.</figcaption>
</figure>

**Lab check:** With the capacity incident selected, choose encryption and read 40/80. Then reserve capacity and compare it with 80/80. Return to the readable-content incident and explain which security objective has changed.
