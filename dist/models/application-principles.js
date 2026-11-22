export function distributionBounds({file, peers, server, upload, download}) {
  if (![file, peers, server, download].every(x => Number.isFinite(x) && x > 0) ||
      !Number.isInteger(peers) || !Number.isFinite(upload) || upload < 0) {
    throw new RangeError('Expected positive file, peer count, server and download; upload may be zero');
  }
  const receiver = file / download;
  const seed = file / server;
  const copies = peers * seed;
  const aggregate = peers * file / (server + peers * upload);
  return {receiver, seed, copies, aggregate,
    clientServer: Math.max(copies, receiver),
    peerToPeer: Math.max(seed, receiver, aggregate)};
}
