import {mountChapterOneLab} from '../chapter-one-lab.js';
import {distributionBounds} from '../../models/application-principles.js';


export function mount(root, context) {
  const panel = document.createElement('div');
  const transport = document.createElement('div');
  const distribution = document.createElement('div');
  panel.append(transport, distribution);
  root.replaceChildren(panel);
  const transportLab = mountChapterOneLab(transport, context, {
    title: 'apTransport', intro: 'apTransportIntro',
    controls: [
      {id:'ap-profile', label:'apProfile', options:[['file','apFile'], ['voice','apVoice'], ['game','apGame']]},
      {id:'ap-protocol', label:'apProtocol', options:[['tcp','apTcp'], ['udp','apUdp']]}
    ],
    evaluate(values, {t}) {
      const profile = values['ap-profile'];
      return {
        title: t('apResult_' + profile + '_' + values['ap-protocol']),
        explanation: t('apReason_' + profile + '_' + values['ap-protocol']),
        metrics: [[t('apPriority'), t('apPriority_' + profile)], [t('apGuarantee'), t('apBestEffort')]]
      };
    }
  });
  const distributionLab = mountChapterOneLab(distribution, context, {
    title: 'apDistribution', intro: 'apDistributionIntro',
    controls: [
      {id:'ap-count', label:'apCount', options:[['10','ap10'],['1','ap1'],['100','ap100']]},
      {id:'ap-upload', label:'apUpload', options:[['2','ap2'],['0','ap0'],['8','ap8']]},
      {id:'ap-download', label:'apDownload', options:[['10','ap10'],['1','ap1'],['100','ap100']]}
    ],
    evaluate(values, {t, format}) {
      const result = distributionBounds({
        file: 1000, server: 20, peers: Number(values['ap-count']),
        upload: Number(values['ap-upload']), download: Number(values['ap-download'])
      });
      const time = value => format(value,1) + ' s';
      const bottleneck = items => {
        const maximum = Math.max(...items.map(([key]) => result[key]));
        return items.filter(([key]) => result[key] === maximum).map(([,label]) => t(label)).join(' + ');
      };
      return {title:t('apBounds'), explanation:t('apIdeal'),
        metrics:[
          [t('apCS'), time(result.clientServer)], [t('apP2P'), time(result.peerToPeer)],
          [t('apCSLimit'), bottleneck([['copies','apCopies'],['receiver','apReceiver']])],
          [t('apP2PLimit'), bottleneck([['seed','apSeed'],['receiver','apReceiver'],['aggregate','apAggregate']])],
          [t('apSeed'),time(result.seed)], [t('apReceiver'),time(result.receiver)],
          [t('apAggregate'),time(result.aggregate)]
        ]};
    }
  });
  return {
    update(next) { transportLab.update(next); distributionLab.update(next); },
    destroy() { transportLab.destroy(); distributionLab.destroy(); panel.remove(); }
  };
}
