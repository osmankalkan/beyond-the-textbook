export const MESSAGE_LIMITS = {min: 1, max: 1400};
const transportSizes = {tcp: 20, udp: 8};
const ipHeaderBytes = 20;
const frameHeaderBytes = 14;
const fcsBytes = 4;
const minimumEthernetPayload = 46;

// A synthetic IPv4 message over two untagged Ethernet links, with a switch
// on the first link and a router between links. All selected sizes fit one MTU.
export function traceEncapsulation(messageBytes, transport) {
  if (!Number.isInteger(messageBytes) || messageBytes < MESSAGE_LIMITS.min || messageBytes > MESSAGE_LIMITS.max) {
    throw new RangeError('Message must contain 1–1400 bytes');
  }
  if (!Object.hasOwn(transportSizes, transport)) throw new RangeError('Expected TCP or UDP');

  const message = [{kind: 'message', bytes: messageBytes}];
  const transportUnit = [{kind: transport, bytes: transportSizes[transport]}, ...message];
  const ip = [{kind: 'ip', bytes: ipHeaderBytes}, ...transportUnit];
  const ipBytes = ip.reduce((sum, part) => sum + part.bytes, 0);
  const padding = Math.max(0, minimumEthernetPayload - ipBytes);
  const frame = [
    {kind: 'ethernet', bytes: frameHeaderBytes}, ...ip,
    ...(padding ? [{kind: 'padding', bytes: padding}] : []),
    {kind: 'fcs', bytes: fcsBytes}
  ];

  return [
    {id: 'message', node: 'sender', parts: message},
    {id: 'transport', node: 'sender', parts: transportUnit},
    {id: 'ip', node: 'sender', parts: ip, ttl: 64},
    {id: 'firstFrame', node: 'sender', parts: frame, link: 1, ttl: 64},
    {id: 'switch', node: 'switch', parts: frame, link: 1, ttl: 64},
    {id: 'routerIp', node: 'router', parts: ip, ttl: 63},
    {id: 'secondFrame', node: 'router', parts: frame, link: 2, ttl: 63},
    {id: 'receiveIp', node: 'receiver', parts: ip, ttl: 63},
    {id: 'receiveTransport', node: 'receiver', parts: transportUnit},
    {id: 'deliver', node: 'receiver', parts: message}
  ].map(stage => ({...stage, bytes: stage.parts.reduce((sum, part) => sum + part.bytes, 0)}));
}
