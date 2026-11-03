import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {solvablePoint,solvableSample,solvableSingular,solvableSingularDomain,solvableSingularSample,solvableSlope,solvableTangency,solvableValid} from '../../models/solvable.js';
import {solvableFamilies} from '../../lessons/xie-2010/2-5/study.js';
import {deepLocalize} from '../../i18n.js';

const DEFAULTS={'clairaut-square':{a:1,b:2},'clairaut-inverse':{a:1,b:-1},'solvable-x-238':{a:1,b:-1},'solvable-y-236':{a:1,b:.5}};
const LIMITS={'clairaut-square':[-3,3],'clairaut-inverse':[-3,3],'solvable-x-238':[-3,3],'solvable-y-236':[-3,3]};
const WINDOWS={'clairaut-square':[-4,4,-5,3],'clairaut-inverse':[-.5,5,-4,6],'solvable-x-238':[-4,4,-4,4],'solvable-y-236':[-3,3,-5,3]};
const INSPECTION={'clairaut-square':[.2,3.4,1.5],'clairaut-inverse':[.2,4.6,2],'solvable-x-238':[.2,3.6,1],'solvable-y-236':[.2,2.8,1.5]};

export function mount(root,initial){
 let context=initial,kind='clairaut-square',a=1,b=2,at=1.5,compare=true;
 const events=new AbortController();
 const fmt=(value,digits=2)=>context.format(value,digits);
 const formulas=s=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
 const slider=(id,label,value,min,max,step)=>`<div class="sep-control"><label for="sol-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="sol-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
 const variantWorks=datum=>solvableValid(kind,datum)&&solvablePoint(kind,at,datum).every(Number.isFinite);
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 function render(){
  const all=deepLocalize(solvableFamilies,context.lang),data=all[kind];
  const [min,max]=LIMITS[kind],[lo,hi,step]=INSPECTION[kind];
  a=clamp(a,min,max);b=clamp(b,min,max);at=clamp(at,lo,hi);
  root.innerHTML=`<section class="sep-lab"><header class="cx-header"><p class="eyebrow">${esc(context.t('solFreeExperimentAnalyticSolutions'))}</p><h2>${esc(context.t('solChangeParameterWhatChanges'))}</h2><p>${esc(context.t('solAAndBSelectDifferentParameters'))}</p></header><div class="panel sep-experiment"><div class="sep-toolbar"><div><label for="sol-family">${esc(context.t('solEquationFamily'))}</label><select id="sol-family">${Object.entries(all).map(([id,d])=>`<option value="${id}" ${id===kind?'selected':''}>${esc(d.name)}</option>`).join('')}</select></div><label><input type="checkbox" id="sol-compare" ${compare?'checked':''}> ${esc(context.t('solCompareWithB'))}</label></div><div class="sep-grid"><div class="sep-controls">${slider('a',`A · C`,a,min,max,.1)}${compare?slider('b',`B · C`,b,min,max,.1):''}${slider('at',context.t('solInspectionPoint'),at,lo,hi,.05)}<p class="trf-fixed">${esc(context.t('solParameterFixed'))}</p><div class="sep-presets"><button class="button secondary" data-preset="example">${esc(context.t('solExamplePreset'))}</button><button class="button secondary" data-preset="compare">${esc(context.t('solComparisonPreset'))}</button></div><p>${esc(data.note)}</p></div><div class="sep-plot-wrap"><div class="sep-legend"><span><i></i>A</span>${compare?'<span class="sep-b"><i></i>B</span>':''}<span class="sep-equilibrium"><i></i>${esc(context.t('solSingularSolution'))}</span></div><svg class="cx-chart" id="sol-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('solSolutionCurvesAAndB'))}"></svg><div class="sep-metrics" aria-live="polite"></div></div></div><div class="sep-interpret"><div><p class="eyebrow">${esc(context.t('solMethod'))}</p>${formulas(data.method)}<p>${esc(context.t('solMethodNote'))}</p></div><div><p class="eyebrow">${esc(context.t('solGeneralSolution'))}</p>${formulas(data.solution)}${data.singular?`<p class="eyebrow">${esc(context.t('solSingularLabel'))}</p>${formulas(data.singular)}`:''}<p>${esc(data.excluded)}</p></div></div><p class="sep-boundary-note">${esc(context.t('solPlotWindow'))}</p></div><footer class="cx-topic-footer"><p>${esc(context.t('solNowApplyTheMethodOn'))}</p><a class="button primary" href="#practice">${esc(context.t('solGoToTheMidtermClinic'))}</a></footer></section>`;
  draw();
 }
 function split(points,xMin,xMax,yMin,yMax){
  const segments=[];let current=[];
  for(const point of points){
   const outside=!point.every(Number.isFinite)||point[0]<xMin-12||point[0]>xMax+12||point[1]<yMin-12||point[1]>yMax+12;
   if(outside){if(current.length>1)segments.push(current);current=[];}else current.push(point);
  }
  if(current.length>1)segments.push(current);
  return segments;
 }
 function draw(){
  const [xMin,xMax,yMin,yMax]=WINDOWS[kind];
  const plot=cartesianPlot({xMin,xMax,yMin,yMax,title:context.t('solEffectOfParameter'),format:fmt,id:'solvable'});
  let overlay='';
  const singularDomain=solvableSingularDomain(kind,a);
  if(singularDomain){
   const from=Math.max(singularDomain[0],xMin),to=Math.min(singularDomain[1],xMax);
   if(to>from)for(const segment of split(solvableSingularSample(kind,a,from,to,620),xMin,xMax,yMin,yMax))overlay+=plot.line(segment,'#bca57c','stroke-dasharray="6 5" stroke-width="1.8"');
  }
  for(const [datum,color]of [[a,'#397752'],...(compare?[[b,'#b47b55']]:[])]){
   if(!solvableValid(kind,datum))continue;
   for(const segment of split(solvableSample(kind,datum,xMin,xMax,720),xMin,xMax,yMin,yMax))overlay+=plot.line(segment,color,'stroke-width="1.9"');
   const [px,py]=solvablePoint(kind,at,datum);
   if(px>=xMin&&px<=xMax&&py>=yMin&&py<=yMax)overlay+=plot.point(px,py,color);
   const [tx,ty]=solvableTangency(kind,datum);
   if(Number.isFinite(tx)&&Number.isFinite(ty)&&tx>=xMin&&tx<=xMax&&ty>=yMin&&ty<=yMax)overlay+=plot.point(tx,ty,'#bca57c');
  }
  root.querySelector('#sol-plot').innerHTML=plot.markup+`<g clip-path="url(#${plot.clipId})">${overlay}</g>`;
  root.querySelector('.sep-metrics').innerHTML=[[a,'A'],...(compare?[[b,'B']]:[])].map(([datum,label])=>{
   if(!solvableValid(kind,datum))return `<article><h3>${label} · C=${fmt(datum)}</h3><p class="sep-invalid">${esc(context.t('solInvalidParameter'))}</p></article>`;
   const [px,py]=solvablePoint(kind,at,datum),slope=solvableSlope(kind,px,py,datum);
   const singular=solvableSingular(kind,at,datum);
   const [tx,ty]=solvableTangency(kind,datum);
   const tangency=Number.isFinite(tx)&&Number.isFinite(ty)?`(${fmt(tx)}, ${fmt(ty)})`:'—';
   return `<article><h3>${label} · C=${fmt(datum)}</h3><dl><div><dt>${esc(context.t('solValueAtInspection'))}</dt><dd>${Number.isFinite(py)?fmt(py):'—'}</dd></div><div><dt>${esc(context.t('solSlopeAtInspection'))}</dt><dd>${Number.isFinite(slope)?fmt(slope):'—'}</dd></div><div><dt>${esc(context.t('solSingularAtInspection'))}</dt><dd>${Number.isFinite(singular)?fmt(singular):'—'}</dd></div><div><dt>${esc(context.t('solTangencyPoint'))}</dt><dd>${tangency}</dd></div></dl>${!Number.isFinite(py)?`<p class="sep-invalid">${esc(context.t('solOutsideDomain'))}</p>`:''}</article>`;
  }).join('');
  for(const [id,value]of Object.entries({a,b,at})){const out=root.querySelector(`[data-output="${id}"]`);if(out)out.textContent=fmt(value);}
 }
 root.addEventListener('input',event=>{const id=event.target.dataset.input;if(!id)return;const value=+event.target.value;if(id==='a')a=value;if(id==='b')b=value;if(id==='at')at=value;draw();},{signal:events.signal});
 root.addEventListener('change',event=>{if(event.target.id==='sol-family'){kind=event.target.value;const d=DEFAULTS[kind];a=d.a;b=d.b;at=INSPECTION[kind][2];render();root.querySelector('#sol-family').focus();}if(event.target.id==='sol-compare'){compare=event.target.checked;render();root.querySelector('#sol-compare').focus();}},{signal:events.signal});
 root.addEventListener('click',event=>{const button=event.target.closest('[data-preset]');if(!button)return;const d=DEFAULTS[kind];const [min,max]=LIMITS[kind];if(button.dataset.preset==='example'){a=d.a;b=d.b;}else{compare=true;let candidate=-a;if(Math.abs(candidate)<.2)candidate=a>=0?.8:-.8;candidate=clamp(candidate,min,max);if(!variantWorks(candidate))candidate=clamp(a>=0?a-1:a+1,min,max);b=candidate;}at=INSPECTION[kind][2];render();root.querySelector(`[data-preset="${button.dataset.preset}"]`).focus();},{signal:events.signal});
 render();
 return{update(next){context=next;render();},destroy(){events.abort();root.replaceChildren();}};
}
