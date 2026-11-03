import {escapeHtml as escape} from '../../core/html.js';
import {createActivity as classifier} from './activities/classifier.js';
import {createActivity as families} from './activities/families.js';
import {createActivity as uniqueness} from './activities/uniqueness.js';
import {createActivity as verification} from './activities/verification.js';

const factories={classification:classifier,families,uniqueness,verification};

/** Composition root only. Each activity owns its state, rendering and cleanup. */
export async function mount(root,initialContext){
  const formulas=await initialContext.loadMath();
  if(initialContext.signal.aborted)return {update(){},destroy(){}};
  let context={...initialContext,formulas},selected='classification';
  const subscriptions=new AbortController(),instances=new Map(),areas=new Map();
  root.innerHTML='<header class="cx-header"></header><nav class="cx-activity-nav"></nav><div class="cx-activity-areas"></div><footer class="cx-topic-footer"></footer>';
  function chrome(){
    const t=context.t;
    root.querySelector('.cx-header').innerHTML=`<p class="eyebrow">${escape(t('cxEyebrow'))}</p><h2>${escape(t('cxTitle'))}</h2><p>${escape(t('cxIntro'))}</p>`;
    const navigation=root.querySelector('.cx-activity-nav');navigation.setAttribute('aria-label',t('cxChooseActivity'));
    navigation.innerHTML=context.lesson.activities.map((activity,i)=>`<button type="button" data-activity="${activity.id}" class="${selected===activity.id?'selected':''}" aria-pressed="${selected===activity.id}"><span>0${i+1}</span><strong>${escape(activity.title)}</strong><small>${escape(activity.subtitle)}</small></button>`).join('');
    root.querySelector('.cx-topic-footer').innerHTML=`<p>${escape(t('cxFinish'))}</p><a class="button primary" href="#practice">${escape(t('cxContinuePractice'))}</a>`;
  }
  function select(id){
    if(!Object.hasOwn(factories,id))throw new Error(`Unknown concept activity: ${id}`);
    selected=id;
    if(!areas.has(id)){
      const area=document.createElement('section');area.className='cx-activity';area.dataset.conceptActivity=id;
      root.querySelector('.cx-activity-areas').append(area);areas.set(id,area);
      instances.set(id,factories[id](area,context));
    }
    for(const [key,area]of areas)area.hidden=key!==selected;
    chrome();
  }
  root.addEventListener('click',event=>{const button=event.target.closest('[data-activity]');if(button){select(button.dataset.activity);root.querySelector(`[data-activity="${selected}"]`).focus({preventScroll:true});}},{signal:subscriptions.signal});
  select(selected);
  return {
    update(nextContext){context={...nextContext,formulas};for(const activity of instances.values())activity.update(context);chrome();},
    destroy(){subscriptions.abort();for(const activity of instances.values())activity.destroy();root.replaceChildren();}
  };
}
