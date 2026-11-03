import {activityScope,escape} from '../helpers.js';

const fields={
  type:{label:'cxType',options:{ode:'cxOde',pde:'cxPde'}},
  order:{label:'cxOrder',options:{1:'1',2:'2',3:'3',4:'4'}},
  linearity:{label:'cxLinearity',options:{linear:'cxLinear',nonlinear:'cxNonlinear'}},
  coefficients:{label:'cxCoefficients',options:{constant:'cxConstant',variable:'cxVariable',na:'cxNotApplicable'}},
  homogeneity:{label:'cxHomogeneity',options:{homogeneous:'cxHomogeneous',nonhomogeneous:'cxNonhomogeneous',na:'cxNotApplicable'}}
};
export function createActivity(root,initialContext){
  const scope=activityScope(root,initialContext),{$,t,formula}=scope;
  const subscriptions=new AbortController();
  let selected=0;const attempts=new Map();
  const current=()=>scope.context.lesson.classificationCases[selected];
  function state(){const id=current().id;if(!attempts.has(id))attempts.set(id,{answers:{},checked:false,hint:false,reason:false});return attempts.get(id);}
  function render(){
    const cases=scope.context.lesson.classificationCases,item=current(),attempt=state();
    root.innerHTML=`<div class="cx-section-head"><h3>${escape(t('cxClassTitle'))}</h3><p>${escape(t('cxClassIntro'))}</p></div>
      <div class="cx-class-cases" role="group" aria-label="${escape(t('cxChooseEquation'))}">${cases.map((entry,i)=>`<button type="button" data-equation="${i}" class="${i===selected?'selected':''}" aria-pressed="${i===selected}"><small>0${i+1}</small>${escape(entry.title)}</button>`).join('')}</div>
      <article class="panel cx-work-panel"><p class="eyebrow">${escape(t('cxSourcePage'))} ${escape(item.pages)}</p><h4>${escape(item.title)}</h4>${formula(item.formula)}<p class="cx-role">${escape(item.role)}</p>
      <form data-classify><div class="cx-answer-grid">${Object.entries(fields).map(([key,field])=>`<div><label for="cx-class-${key}">${escape(t(field.label))}</label><select id="cx-class-${key}" name="${key}" required><option value="">${escape(t('cxChoose'))}</option>${Object.entries(field.options).map(([value,label])=>`<option value="${value}" ${attempt.answers[key]===value?'selected':''}>${escape(key==='order'?label:t(label))}</option>`).join('')}</select></div>`).join('')}</div><div class="cx-actions"><button class="button primary" type="submit">${escape(t('cxCheckClassification'))}</button><button class="text-button" type="button" data-hint>${escape(t('cxHint'))}</button></div></form>
      <div class="cx-feedback" data-result role="status"></div><p class="cx-callout" data-hint-text ${attempt.hint?'':'hidden'}>${escape(item.hint)}</p>
      <button class="text-button cx-reason-toggle" type="button" data-reason aria-expanded="${attempt.reason}">${escape(t('cxWorkedReason'))} ${attempt.reason?'−':'＋'}</button><div class="cx-reason" data-reason-text ${attempt.reason?'':'hidden'}><p>${escape(item.reason)}</p></div></article>`;
    paintResult();
  }
  function paintResult(){
    const attempt=state(),result=$('[data-result]');
    result.hidden=!attempt.checked;if(!attempt.checked)return;
    const answers=current().answers;
    const correct=Object.keys(fields).filter(key=>attempt.answers[key]===answers[key]);
    result.classList.toggle('complete',correct.length===5);
    result.innerHTML=`<strong>${escape(t('cxClassificationResult'))}: ${correct.length} / 5</strong><div class="cx-checks">${Object.entries(fields).map(([key,field])=>scope.status(t(field.label),attempt.answers[key]===answers[key])).join('')}</div>`;
  }
  root.addEventListener('change',event=>{if(event.target.matches('select')){state().answers[event.target.name]=event.target.value;state().checked=false;paintResult();}},{signal:subscriptions.signal});
  root.addEventListener('submit',event=>{event.preventDefault();state().checked=true;paintResult();},{signal:subscriptions.signal});
  root.addEventListener('click',event=>{
    const caseButton=event.target.closest('[data-equation]');
    if(caseButton){selected=Number(caseButton.dataset.equation);render();root.querySelector(`[data-equation="${selected}"]`).focus({preventScroll:true});return;}
    if(event.target.closest('[data-hint]')){state().hint=true;$('[data-hint-text]').hidden=false;}
    if(event.target.closest('[data-reason]')){state().reason=!state().reason;$('[data-reason-text]').hidden=!state().reason;$('[data-reason]').setAttribute('aria-expanded',String(state().reason));$('[data-reason]').textContent=t('cxWorkedReason')+' '+(state().reason?'−':'＋');}
  },{signal:subscriptions.signal});
  render();
  return {update(context){scope.setContext(context);render();},destroy(){subscriptions.abort();root.replaceChildren();}};
}
