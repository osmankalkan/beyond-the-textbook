import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {exactnessContour,exactnessConstant,exactnessMultiplier,exactnessResidual,exactnessSlope} from '../../models/exactness.js';
import {exactnessFamilies} from '../../lessons/xie-2010/2-3/study.js';
import {deepLocalize} from '../../i18n.js';

const DEFAULTS={exact:{a:1,b:.6},'factor-x':{a:1.4,b:.7},'factor-y':{a:1.2,b:.6},inspection:{a:1,b:.6}};
const LIMITS={exact:[-3,3],'factor-x':[-3,3],'factor-y':[.2,4],inspection:[-3,3]};
const WINDOWS={exact:[-2.5,3.5,-3,3],'factor-x':[-1.5,3.5,-3,3],'factor-y':[-1.5,3.5,.05,4],inspection:[.02,3.5,-3,3]};

export function mount(root,initial){
 let context=initial,kind='exact',a=1,b=.6,compare=true;
 const events=new AbortController(),x0=1;
 const fmt=(value,digits=2)=>context.format(value,digits);
 const formula=s=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
 const slider=(id,label,value,min,max,step)=>`<div class="sep-control"><label for="exa-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="exa-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
 function constant(y0){try{return exactnessConstant(kind,x0,y0);}catch{return NaN;}}
 function render(){
  const all=deepLocalize(exactnessFamilies,context.lang),data=all[kind];
  const [min,max]=LIMITS[kind];
  a=Math.min(max,Math.max(min,a));b=Math.min(max,Math.max(min,b));
  root.innerHTML=`<section class="sep-lab"><header class="cx-header"><p class="eyebrow">${esc(context.t('exaFreeExperimentAnalyticSolutions'))}</p><h2>${esc(context.t('exaChangeInitialDataWhatChanges'))}</h2><p>${esc(context.t('exaAAndBSelectDifferentC'))}</p></header><div class="panel sep-experiment"><div class="sep-toolbar"><div><label for="exa-family">${esc(context.t('exaEquationFamily'))}</label><select id="exa-family">${Object.entries(all).map(([id,d])=>`<option value="${id}" ${id===kind?'selected':''}>${esc(d.name)}</option>`).join('')}</select></div><label><input type="checkbox" id="exa-compare" ${compare?'checked':''}> ${esc(context.t('exaCompareWithB'))}</label></div><div class="sep-grid"><div class="sep-controls">${slider('a',context.t('exaAYAtX0'),a,min,max,.1)}${compare?slider('b',context.t('exaBYAtX0'),b,min,max,.1):''}<p class="trf-fixed">${esc(context.t('exaInitialPointFixed'))}</p><div class="sep-presets"><button class="button secondary" data-preset="example">${esc(context.t('exaExamplePreset'))}</button><button class="button secondary" data-preset="compare">${esc(context.t('exaComparisonPreset'))}</button></div><p>${esc(data.note)}</p></div><div class="sep-plot-wrap"><div class="sep-legend"><span><i></i>A</span>${compare?'<span class="sep-b"><i></i>B</span>':''}${kind==='factor-x'?`<span class="sep-equilibrium"><i></i>${esc(context.t('exaExcludedBranches'))}</span>`:''}</div><svg class="cx-chart" id="exa-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('exaLevelCurvesAAndB'))}"></svg><div class="sep-metrics" aria-live="polite"></div></div></div><div class="sep-interpret"><div><p class="eyebrow">${esc(context.t('exaPotential'))}</p>${formula(data.potential)}<p>${esc(data.note)}</p></div><div><p class="eyebrow">${esc(context.t('exaMultiplier'))}</p>${formula(data.multiplier)}<p>${esc(context.t('exaLevelCurveNote'))}</p></div></div><p class="sep-boundary-note">${esc(context.t('exaPlotWindow'))}</p></div><footer class="cx-topic-footer"><p>${esc(context.t('exaNowApplyTheMethodOn'))}</p><a class="button primary" href="#practice">${esc(context.t('exaGoToTheMidtermClinic'))}</a></footer></section>`;
  draw();
 }
 function draw(){
  const [xMin,xMax,yMin,yMax]=WINDOWS[kind];
  const plot=cartesianPlot({xMin,xMax,yMin,yMax,title:context.t('exaEffectOfInitialConditions'),format:fmt,id:'exactness'});
  let overlay='';
  if(kind==='factor-x')overlay+=plot.line([[xMin,2*xMin],[xMax,2*xMax]],'#bca57c','stroke-dasharray="5 5" stroke-width="1.4"');
  for(const [y0,color]of [[a,'#397752'],...(compare?[[b,'#b47b55']]:[])]){
   const c=constant(y0);
   if(!Number.isFinite(c))continue;
   for(const segment of exactnessContour(kind,c,xMin,xMax,yMin,yMax,110,110))overlay+=plot.line(segment,color,'stroke-width="1.9"');
   if(y0>=yMin&&y0<=yMax)overlay+=plot.point(x0,y0,color);
  }
  root.querySelector('#exa-plot').innerHTML=plot.markup+`<g clip-path="url(#${plot.clipId})">${overlay}</g>`;
  root.querySelector('.sep-metrics').innerHTML=[[a,'A'],...(compare?[[b,'B']]:[])].map(([y0,label])=>{
   const c=constant(y0),valid=Number.isFinite(c);
   if(!valid)return `<article><h3>${label} · y(1)=${fmt(y0)}</h3><p class="sep-invalid">${esc(context.t('exaInvalidInitialData'))}</p></article>`;
   const mu=exactnessMultiplier(kind,x0,y0),residual=exactnessResidual(kind,x0,y0),slope=exactnessSlope(kind,x0,y0);
   return `<article><h3>${label} · y(1)=${fmt(y0)}</h3><dl><div><dt>${esc(context.t('exaConstantC'))}</dt><dd>${fmt(c)}</dd></div><div><dt>${esc(context.t('exaMultiplierAtInitial'))}</dt><dd>${fmt(mu)}</dd></div><div><dt>${esc(context.t('exaExactnessResidual'))}</dt><dd>${fmt(residual)}</dd></div><div><dt>${esc(context.t('exaSlopeAtInitial'))}</dt><dd>${Number.isFinite(slope)?fmt(slope):'—'}</dd></div></dl></article>`;
  }).join('');
  for(const [id,val]of Object.entries({a,b})){const out=root.querySelector(`[data-output="${id}"]`);if(out)out.textContent=fmt(val);}
 }
 root.addEventListener('input',e=>{const id=e.target.dataset.input;if(!id)return;const val=+e.target.value;if(id==='a')a=val;if(id==='b')b=val;draw();},{signal:events.signal});
 root.addEventListener('change',e=>{if(e.target.id==='exa-family'){kind=e.target.value;const d=DEFAULTS[kind];a=d.a;b=d.b;render();root.querySelector('#exa-family').focus();}if(e.target.id==='exa-compare'){compare=e.target.checked;render();root.querySelector('#exa-compare').focus();}},{signal:events.signal});
 root.addEventListener('click',e=>{const p=e.target.closest('[data-preset]');if(!p)return;const d=DEFAULTS[kind];if(p.dataset.preset==='example'){a=d.a;b=d.b;compare=true;}else{compare=true;const [min,max]=LIMITS[kind];b=a+.6>max?a-.6:a+.6;b=Math.min(max,Math.max(min,b));}render();root.querySelector(`[data-preset="${p.dataset.preset}"]`).focus();},{signal:events.signal});
 render();
 return{update(next){context=next;render();},destroy(){events.abort();root.replaceChildren();}};
}
