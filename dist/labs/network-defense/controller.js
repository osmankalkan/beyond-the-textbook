import {defenseCases, evaluateDefense} from '../../models/network-defense.js';
import {mountChapterOneLab} from '../chapter-one-lab.js';

const options = keys => keys.map(key => [key, 'defense_' + key]);

export function mount(root, context) {
  return mountChapterOneLab(root, context, {
    title: 'defenseLabTitle',
    intro: 'defenseLabIntro',
    controls: [
      {id: 'defense-case', label: 'defenseObservation', options: options(Object.keys(defenseCases))},
      {id: 'defense-action', label: 'defenseAction', options: options(Object.values(defenseCases))}
    ],
    evaluate(values, {t, format}) {
      const incident = values['defense-case'];
      const {matches, requested, served} = evaluateDefense(incident, values['defense-action']);
      const metrics = [[t('defenseObservation'), t('defenseEvidence_' + incident)]];
      if (requested) {
        metrics.push([t('defenseRequests'), `${format(served, 0)} / ${format(requested, 0)}`]);
      }
      return {title: t(matches ? 'defenseMatch' : 'defenseMismatch'),
        explanation: t('defenseReason_' + incident), metrics};
    }
  });
}
