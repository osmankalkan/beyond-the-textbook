import {cartesianPlot,sampledCurve} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {separableValue,separableDomain,separableSlope} from '../../models/separation.js';
import {families} from '../../lessons/xie-2010/2-1/study.js';
import {deepLocalize} from '../../i18n.js';
export function mount(root,initial){
 let context=initial,kind='linear',a=1,b=.5,k=1,at=.5,compare=true;const events=new AbortController();
 const fmt=(v,d=2)=>context.format(v,d);
 const formula=s=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
 const slider=(id,label,value,min,max,step)=>`<div class="sep-control"><label for="sep-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="sep-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
 function render(){
 const all=deepLocalize(families,context.lang),data=all[kind];
 root.innerHTML=`<section class="sep-lab"><header class="cx-header"><p class="eyebrow">${esc(context.t('sepFreeExperimentAnalyticSolutions'))}</p><h2>${esc(context.t('sepChangeOneConditionWhatChanges'))}</h2><p>${esc(context.t('sepAAndBSolveThe'))}</p></header><div class="panel sep-experiment"><div class="sep-toolbar"><div><label for="sep-family">${esc(context.t('sepEquationFamily'))}</label><select id="sep-family">${Object.entries(all).map(([id,d])=>`<option value="${id}" ${id===kind?'selected':''}>${esc(d.name)}</option>`).join('')}</select></div><label><input type="checkbox" id="sep-compare" ${compare?'checked':''}> ${esc(context.t('sepCompareWithB'))}</label></div><div class="sep-grid"><div class="sep-controls">${slider('a',context.t('sepAY'),a,-2,2,.1)}${compare?slider('b',context.t('sepBY'),b,-2,2,.1):''}${slider('k','k',k,.2,2,.1)}${slider('at',context.t('sepInspectionPointX'),at,-2,2,.05)}<div class="sep-presets"><button class="button secondary" data-preset="zero">${esc(context.t('sepAZeroSolution'))}</button><button class="button secondary" data-preset="contrast">${esc(context.t('sepSetUpAComparison'))}</button></div><p>${esc(data.controlsNote)}</p></div><div class="sep-plot-wrap"><div class="sep-legend"><span><i></i>A</span>${compare?'<span class="sep-b"><i></i>B</span>':''}<span class="sep-equilibrium"><i></i>${esc(context.t('sepEquilibria'))}</span></div><svg class="cx-chart" id="sep-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('sepSolutionCurvesAAndB'))}"></svg><div class="sep-metrics" aria-live="polite"></div></div></div><div class="sep-interpret"><div><p class="eyebrow">${esc(context.t('sepSeparation'))}</p>${formula(data.separated)}<p>${esc(data.excluded)}</p></div><div><p class="eyebrow">${esc(context.t('sepIvpSolution'))}</p>${formula(data.solution)}<p>${esc(data.interpretation)}</p></div></div><p class="sep-boundary-note">${esc(context.t('sepPlotWindowXYA'))}</p></div><footer class="cx-topic-footer"><p>${esc(context.t('sepNowApplyTheMethodOn'))}</p><a class="button primary" href="#practice">${esc(context.t('sepGoToTheMidtermClinic'))}</a></footer></section>`;
 draw();
 }
 function interval(y0){return separableDomain(kind,y0,k).map((v,i)=>!Number.isFinite(v)?(i===0?'−∞':'∞'):fmt(v)).join(', ');}
 function draw(){
 const plot=cartesianPlot({xMin:-2,xMax:2,yMin:-4,yMax:4,title:context.t('sepEffectOfInitialConditions'),format:fmt,id:'separation'});
 const eqs=kind==='logistic'?[0,1]:kind==='tangent'?[]:[0];
 let overlay=eqs.map(y=>plot.line(sampledCurve(()=>y,-2,2),'#bca57c','stroke-dasharray="5 5"')).join('');
 for(const [y0,color]of [[a,'#397752'],...(compare?[[b,'#b47b55']]:[])]){
  overlay+=plot.line(sampledCurve(x=>separableValue(kind,x,y0,k),-2,2,600),color)+plot.point(0,y0,color);
  const yy=separableValue(kind,at,y0,k);if(Number.isFinite(yy))overlay+=plot.point(at,yy,color);
 }
 root.querySelector('#sep-plot').innerHTML=plot.markup+`<g clip-path="url(#${plot.clipId})">${overlay}</g>`;
 root.querySelector('.sep-metrics').innerHTML=[[a,'A'],...(compare?[[b,'B']]:[])].map(([y0,label])=>{
 const yy=separableValue(kind,at,y0,k),valid=Number.isFinite(yy);
 return `<article><h3>${label} · y(0)=${fmt(y0)}</h3><dl><div><dt>${esc(context.t('sepSolutionYX'))}</dt><dd>${valid?fmt(yy):'—'}</dd></div><div><dt>${esc(context.t('sepInstantaneousSlopeY'))}</dt><dd>${valid?fmt(separableSlope(kind,at,yy,k)):'—'}</dd></div><div class="sep-interval"><dt>${esc(context.t('sepMaximalIntervalContaining'))}</dt><dd>(${interval(y0)})</dd></div></dl>${!valid?`<p class="sep-invalid">${esc(context.t('sepTheSelectedXLiesOutside'))}</p>`:''}</article>`;
 }).join('');
 for(const [id,val]of Object.entries({a,b,k,at})){const out=root.querySelector(`[data-output="${id}"]`);if(out)out.textContent=fmt(val);}
 }
 root.addEventListener('input',e=>{const id=e.target.dataset.input;if(!id)return;const val=+e.target.value;if(id==='a')a=val;if(id==='b')b=val;if(id==='k')k=val;if(id==='at')at=val;draw();},{signal:events.signal});
 root.addEventListener('change',e=>{if(e.target.id==='sep-family'){kind=e.target.value;render();root.querySelector('#sep-family').focus();}if(e.target.id==='sep-compare'){compare=e.target.checked;render();root.querySelector('#sep-compare').focus();}},{signal:events.signal});
 root.addEventListener('click',e=>{const p=e.target.closest('[data-preset]');if(!p)return;if(p.dataset.preset==='zero')a=0;else{compare=true;a=kind==='logistic'?.2:1;b=kind==='logistic'?.8:-.5;}render();root.querySelector(`[data-preset="${p.dataset.preset}"]`).focus();},{signal:events.signal});
 render();return{update(next){context=next;render();},destroy(){events.abort();root.replaceChildren();}};
}
