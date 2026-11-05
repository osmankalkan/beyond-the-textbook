import {escapeHtml as esc, formatMathText} from './html.js';
const math=s=> s ? (String(s).trim().startsWith('<math') ? s : `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`) : '';
const loc=(v,l)=>(v&&typeof v==='object'&&!Array.isArray(v)&&('tr' in v||'en' in v))?(v[l]||v.tr||v.en):v;
/** Topic data supplies the reasoning; this component owns only interaction state. */
export function createStudyGuide(root){
 const records=new Map();let context,activeId;
 const events=new AbortController();
 function state(){if(!records.has(activeId))records.set(activeId,{case:0,revealed:1,choices:{},checked:{}});return records.get(activeId);}
 function paint(){
  const data=context.lesson.studySupport;root.hidden=!data;if(!data)return;
  const s=state(),selected=data.paths[s.case]||data.paths[0],prediction=(data.predictions&&data.predictions.length)?data.predictions[s.case%data.predictions.length]:null;
  if(!prediction){root.hidden=true;return;}
  const lang=context.lang||'tr';
  const choice=s.choices[prediction.id],checked=s.checked[prediction.id];
  const rawChoices=loc(prediction.choices||prediction.options||[],lang);
  const choiceArr=Array.isArray(rawChoices)?rawChoices:[];
  const choices=choiceArr.map(c=>{
    const val=(c&&typeof c==='object')?(c.text||loc(c,lang)):c;
    return typeof val==='string'?val:String(val||'');
  });
  const question=loc(prediction.question||prediction.prompt||'',lang);
  const reason=loc(prediction.reason||prediction.feedback||prediction.explanation||'',lang);
  const title=loc(data.title||'',lang);
  const intro=loc(data.intro||'',lang);
  const predContext=loc(prediction.context||'',lang);
  const predTry=loc(prediction.try||'',lang);
  const pathTitle=loc(selected.title||'',lang);
  const pathPrompt=loc(selected.prompt||selected.summary||'',lang);
  const pathReflection=loc(selected.reflection||'',lang);
  root.innerHTML=`<section class="study-guide panel"><div class="study-guide-head"><div><p class="eyebrow">${esc(context.t('studyGuidedStudy'))}</p><h2>${formatMathText(title)}</h2><p>${formatMathText(intro)}</p></div><a class="button secondary" href="#practice">${esc(context.t('studyWorkedExamPractice'))}</a></div><div class="study-paths" role="group" aria-label="${esc(context.t('studyChooseAWalkthrough'))}">${data.paths.map((a,i)=>`<button class="button ${s.case===i?'primary':'secondary'}" data-path="${i}" aria-pressed="${s.case===i}">${formatMathText(loc(a.title,lang))}</button>`).join('')}</div><div class="study-guide-grid"><section class="study-prediction"><p class="eyebrow">${esc(context.t('studyPredictFirst'))}</p><h3>${formatMathText(question)}</h3><p>${formatMathText(predContext)}</p><fieldset><legend class="sr-only">${esc(question)}</legend>${choices.map((c,i)=>`<label><input type="radio" name="study-prediction" value="${i}" ${choice===i?'checked':''}> ${formatMathText(c)}</label>`).join('')}</fieldset><button class="button primary" data-check ${choice===undefined?'disabled':''}>${esc(context.t('studyCheckMyReasoning'))}</button><div role="status">${checked?`<div class="study-verdict"><strong>${esc(choice===prediction.answer?context.t('studyCorrectPrediction'):context.t('studyReconsiderYourPrediction'))}</strong><p>${formatMathText(reason)}</p>${math(prediction.math)}</div>`:''}</div><p class="study-transfer">${formatMathText(predTry)}</p></section><section class="study-derivation"><p class="eyebrow">${esc(context.t('studyReasonStepByStep'))}</p><h3>${formatMathText(pathTitle)}</h3><p>${formatMathText(pathPrompt)}</p><ol>${(selected.steps||[]).slice(0,s.revealed).map(st=>`<li><h4>${formatMathText(loc(st.label,lang))}</h4>${math(st.math)}<p>${formatMathText(loc(st.text,lang))}</p></li>`).join('')}</ol><div class="study-actions"><button class="button primary" data-next ${s.revealed>=(selected.steps||[]).length?'disabled':''}>${esc(context.t('studyRevealTheNextStep'))} · ${s.revealed}/${(selected.steps||[]).length}</button><button class="text-button" data-reset>${esc(context.t('studyStartAgain'))}</button></div><details><summary>${esc(context.t('studyExplainInYourOwnWords'))}</summary><p>${formatMathText(pathReflection)}</p></details></section></div></section>`;
 }
 root.addEventListener('change',e=>{if(e.target.name==='study-prediction'){const s=state(),p=context.lesson.studySupport.predictions[s.case%context.lesson.studySupport.predictions.length];s.choices[p.id]=+e.target.value;delete s.checked[p.id];paint();root.querySelector(`[name="study-prediction"][value="${s.choices[p.id]}"]`)?.focus({preventScroll:true});}},{signal:events.signal});
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const s=state();let focus;
  if(b.dataset.path!==undefined){s.case=+b.dataset.path;s.revealed=1;focus=`[data-path="${s.case}"]`;}
  if(b.hasAttribute('data-check')){const p=context.lesson.studySupport.predictions[s.case%context.lesson.studySupport.predictions.length];s.checked[p.id]=true;focus='[data-check]';}
  if(b.hasAttribute('data-next')){s.revealed++;focus='[data-next]';}
  if(b.hasAttribute('data-reset')){s.revealed=1;focus='[data-reset]';}paint();if(focus)root.querySelector(focus)?.focus({preventScroll:true});
 },{signal:events.signal});
 return{update(next){context=next;activeId=next.lesson.id;paint();},destroy(){events.abort();root.replaceChildren();}};
}
