import {milestones} from '../../lessons/kurose-ross-8e/1-7/timeline.js';
import {mountChapterOneLab} from '../chapter-one-lab.js';

export function mount(root, context) {
  return mountChapterOneLab(root, context, {
    title: 'historyLabTitle',
    intro: 'historyLabIntro',
    controls: [
      {id: 'history-need', label: 'historyNeed', options: milestones.map(({id}) => [id, 'historyNeed_' + id])},
      {id: 'history-event', label: 'historyEvent', options: milestones.map(({id}) => [id, 'historyEvent_' + id])}
    ],
    evaluate(values, {t}) {
      const need = values['history-need'];
      const event = values['history-event'];
      return {
        title: t(event === need ? 'historyMatch' : 'historyMismatch'),
        explanation: t('historyReason_' + event),
        metrics: [[t('historyNeed'), t('historyNeed_' + need)]],
        rows: milestones.map(({date,id}) => [`${date} · ${t('historyEvent_' + id)}`, id === event])
      };
    }
  });
}
