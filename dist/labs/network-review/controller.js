import {compareCampusPath} from '../../models/network-review.js';
import {mountChapterOneLab} from '../chapter-one-lab.js';

export function mount(root, context) {
  return mountChapterOneLab(root, context, {
    title: 'reviewLabTitle',
    intro: 'reviewLabIntro',
    controls: [
      {id: 'review-change', label: 'reviewChange', options: ['baseline', 'access', 'core', 'nearby'].map(id => [id, 'review_' + id])},
      {id: 'review-size', label: 'reviewSize', options: [['1000', 'reviewLarge'], ['12', 'reviewShort']]}
    ],
    evaluate(values, {t, format}) {
      const change = values['review-change'];
      const {frameBytes, baseline, current} = compareCampusPath(Number(values['review-size']), change);
      const compare = (key, unit, digits = 2) =>
        `${format(baseline[key], digits)} → ${format(current[key], digits)} ${unit}`;
      return {
        title: t('review_' + change), explanation: t('reviewReason_' + change),
        metrics: [
          [t('reviewFrame'), `${format(frameBytes, 0)} ${t('reviewBytes')}`],
          [t('reviewFirst'), compare('firstPacketTotalMs', 'ms')],
          [t('reviewLast'), compare('allPacketsTotalMs', 'ms')],
          [t('reviewQueue'), compare('maxQueueDelayMs', 'ms')],
          [t('reviewRate'), compare('bottleneckRateMbps', 'Mbit/s', 0)]
        ]
      };
    }
  });
}
