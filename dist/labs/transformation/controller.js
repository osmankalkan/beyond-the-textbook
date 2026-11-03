import {cartesianPlot,sampledCurve} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {transformationValue,transformationDomain,transformationSlope,transformationConstant} from '../../models/transformation.js';
import {transformationFamilies} from '../../lessons/xie-2010/2-2/study.js';
import {deepLocalize} from '../../i18n.js';

const DEFAULTS={circle:{a:1,b:.6},ellipse:{a:1.5,b:1.2},sum:{a:.5,b:-.5},radical:{a:.6,b:.3}};

export function mount(root,initial){
 let context=initial,kind='circle',a=1,b=.6,at=1,compare=true;
 const events=new AbortController(),x0=1;
 const fmt=(value,digits=2)=>context.format(value,digits);
 const formula=s=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
 const slider=(id,label,value,min,max,step)=>`<div class="sep-control"><label for="trf-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="trf-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
 const limits=()=>kind==='radical'?[-.9,.9]:[-2,2];
 function safeDomain(y0){try{return transformationDomain(kind,x0,y0);}catch{return [NaN,NaN];}}
 function interval(y0){
  const [lo,hi]=safeDomain(y0);if(Number.isNaN(lo))return '—';
  const show=value=>Number.isFinite(value)?fmt(value):(value>0?'∞':'−∞');
  return `(${show(lo)}, ${show(hi)})`;
 }
 function render(){
  const all=deepLocalize(transformationFamilies,context.lang),data=all[kind];
  const [min,max]=limits();
  a=Math.min(max,Math.max(min,a));b=Math.min(max,Math.max(min,b));
  root.innerHTML=`<section class="sep-lab"><header class="cx-header"><p class="eyebrow">${esc(context.t('trfFreeExperimentAnalyticSolutions'))}</p><h2>${esc(context.t('trfChangeOneConditionWhatChanges'))}</h2><p>${esc(context.t('trfAAndBSolveThe'))}</p></header><div class="panel sep-experiment"><div class="sep-toolbar"><div><label for="trf-family">${esc(context.t('trfEquationFamily'))}</label><select id="trf-family">${Object.entries(all).map(([id,d])=>`<option value="${id}" ${id===kind?'selected':''}>${esc(d.name)}</option>`).join('')}</select></div><label><input type="checkbox" id="trf-compare" ${compare?'checked':''}> ${esc(context.t('trfCompareWithB'))}</label></div><div class="sep-grid"><div class="sep-controls">${slider('a',context.t('trfAYAtX0'),a,min,max,.1)}${compare?slider('b',context.t('trfBYAtX0'),b,min,max,.1):''}${slider('at',context.t('trfInspectionPointX'),at,-3,3,.05)}<p class="trf-fixed">${esc(context.t('trfInitialPointFixed'))}</p><div class="sep-presets"><button class="button secondary" data-preset="example">${esc(context.t('trfExamplePreset'))}</button><button class="button secondary" data-preset="compare">${esc(context.t('trfComparisonPreset'))}</button></div><p>${esc(data.controlsNote)}</p></div><div class="sep-plot-wrap"><div class="sep-legend"><span><i></i>A</span>${compare?'<span class="sep-b"><i></i>B</span>':''}</div><svg class="cx-chart" id="trf-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('trfSolutionCurvesAAndB'))}"></svg><div class="sep-metrics" aria-live="polite"></div></div></div><div class="sep-interpret"><div><p class="eyebrow">${esc(context.t('trfTransformation'))}</p>${formula(data.separated)}<p>${esc(data.excluded)}</p></div><div><p class="eyebrow">${esc(context.t('trfSolutionFamily'))}</p>${formula(data.solution)}<p>${esc(data.interpretation)}</p></div></div><p class="sep-boundary-note">${esc(context.t('trfPlotWindow'))}</p></div><footer class="cx-topic-footer"><p>${esc(context.t('trfNowApplyTheMethodOn'))}</p><a class="button secondary" href="#practice">${esc(context.t('trfGoToTheMidtermClinic'))}</a></footer></section>`;
  draw();
 }
 function windowFor(){
  const domains=[a,...(compare?[b]:[])].map(safeDomain).filter(d=>!Number.isNaN(d[0]));
  if(!domains.length)return [-3,3];
  let lo=Math.min(...domains.map(d=>d[0])),hi=Math.max(...domains.map(d=>d[1]));
  if(!Number.isFinite(lo))lo=Math.min(-3,x0-2);
  if(!Number.isFinite(hi))hi=Math.max(3,x0+2);
  const pad=Math.max(.2,(hi-lo)*.06);
  return [lo-pad,hi+pad];
 }
 function draw(){
  const [xMin,xMax]=windowFor();
  const yMin=kind==='sum'?-8:kind==='radical'?-2.5:-2.5;
  const yMax=kind==='sum'?8:kind==='radical'?2.5:2.5;
  const plot=cartesianPlot({xMin,xMax,yMin,yMax,title:context.t('trfEffectOfInitialConditions'),format:fmt,id:'transformation'});
  let overlay='';
  for(const [y0,color]of [[a,'#397752'],...(compare?[[b,'#b47b55']]:[])]){
   const [lo,hi]=safeDomain(y0);
   if(Number.isNaN(lo))continue;
   const start=Math.max(lo,xMin),end=Math.min(hi,xMax);
   if(end>start)overlay+=plot.line(sampledCurve(x=>transformationValue(kind,x,x0,y0),start,end,600),color);
   const yy=transformationValue(kind,at,x0,y0);
   if(Number.isFinite(yy))overlay+=plot.point(at,yy,color);
   if(y0>=yMin&&y0<=yMax)overlay+=plot.point(x0,y0,color);
  }
  root.querySelector('#trf-plot').innerHTML=plot.markup+`<g clip-path="url(#${plot.clipId})">${overlay}</g>`;
  root.querySelector('.sep-metrics').innerHTML=[[a,'A'],...(compare?[[b,'B']]:[])].map(([y0,label])=>{
   const [lo]=safeDomain(y0),validInitial=!Number.isNaN(lo);
   const yy=validInitial?transformationValue(kind,at,x0,y0):NaN,valid=Number.isFinite(yy);
   let constant='—';
   if(validInitial){try{constant=fmt(transformationConstant(kind,x0,y0));}catch{}}
   return `<article><h3>${label} · y(1)=${fmt(y0)}</h3><dl><div><dt>${esc(context.t('trfSolutionYX'))}</dt><dd>${valid?fmt(yy):'—'}</dd></div><div><dt>${esc(context.t('trfInstantaneousSlopeY'))}</dt><dd>${valid?fmt(transformationSlope(kind,at,yy)):'—'}</dd></div><div><dt>${esc(context.t('trfConstant'))}</dt><dd>${constant}</dd></div><div class="sep-interval"><dt>${esc(context.t('trfMaximalIntervalContaining'))}</dt><dd>${validInitial?interval(y0):'—'}</dd></div></dl>${!validInitial?`<p class="sep-invalid">${esc(context.t('trfInvalidInitialData'))}</p>`:!valid?`<p class="sep-invalid">${esc(context.t('trfTheSelectedXLiesOutside'))}</p>`:''}</article>`;
  }).join('');
  for(const [id,val]of Object.entries({a,b,at})){const out=root.querySelector(`[data-output="${id}"]`);if(out)out.textContent=fmt(val);}
 }
 root.addEventListener('input',e=>{const id=e.target.dataset.input;if(!id)return;const val=+e.target.value;if(id==='a')a=val;if(id==='b')b=val;if(id==='at')at=val;draw();},{signal:events.signal});
 root.addEventListener('change',e=>{if(e.target.id==='trf-family'){kind=e.target.value;const d=DEFAULTS[kind];a=d.a;b=d.b;at=x0;render();root.querySelector('#trf-family').focus();}if(e.target.id==='trf-compare'){compare=e.target.checked;render();root.querySelector('#trf-compare').focus();}},{signal:events.signal});
 root.addEventListener('click',e=>{const p=e.target.closest('[data-preset]');if(!p)return;const d=DEFAULTS[kind];if(p.dataset.preset==='example'){a=d.a;b=d.b;compare=true;}else{compare=true;b=kind==='radical'?-Math.abs(a||d.a)*.5:-a;if(b===0)b=.3;}at=x0;render();root.querySelector(`[data-preset="${p.dataset.preset}"]`).focus();},{signal:events.signal});
 render();
 return{update(next){context=next;render();},destroy(){events.abort();root.replaceChildren();}};
}
