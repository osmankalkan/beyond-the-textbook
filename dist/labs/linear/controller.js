import {cartesianPlot} from '../../core/cartesian-plot.js';
import {escapeHtml as esc} from '../../core/html.js';
import {linearAuxiliary,linearConstant,linearDomain,linearInitial,linearMode,linearPoint,linearSample,linearSlope,linearValid} from '../../models/linear.js';
import {linearFamilies} from '../../lessons/xie-2010/2-4/study.js';
import {deepLocalize} from '../../i18n.js';

const DEFAULTS={ 'linear-tan':{a:1,b:.4},'linear-y':{a:1,b:.4},'bernoulli-33':{a:1.2,b:.9},'bernoulli-34':{a:1,b:.6} };
const LIMITS={ 'linear-tan':[-2,2],'linear-y':[-1.5,2.5],'bernoulli-33':[.3,1.8],'bernoulli-34':[.4,1.8] };
const WINDOWS={ 'linear-tan':[-1.45,1.45,-4,4],'linear-y':[-4,4,-2.5,2.5],'bernoulli-33':[-.3,2.6,-2.6,2.6],'bernoulli-34':[-3,3,.1,4] };
const INSPECTION={ 'linear-tan':[-1.2,1.2,.6],'linear-y':[.2,2.4,1.5],'bernoulli-33':[.2,1.2,1],'bernoulli-34':[.2,3.8,1.6] };

export function mount(root,initial){
 let context=initial,kind='linear-tan',a=1,b=.4,at=.6,compare=true;
 const events=new AbortController();
 const fmt=(value,digits=2)=>context.format(value,digits);
 const formulas=s=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
 const slider=(id,label,value,min,max,step)=>`<div class="sep-control"><label for="lin-${id}">${esc(label)}<output data-output="${id}">${fmt(value)}</output></label><input id="lin-${id}" data-input="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
 const datumName=temp=>temp==='y'?(kind==='linear-tan'?'y(0)':'y(1)'):'x(1)';
 const variantWorks=datum=>linearValid(kind,datum)&&linearPoint(kind,at,datum).every(Number.isFinite);
 function render(){
  const all=deepLocalize(linearFamilies,context.lang),data=all[kind],temp=linearMode(kind);
  const [min,max]=LIMITS[kind],[lo,hi,step]=INSPECTION[kind];
  a=Math.min(max,Math.max(min,a));b=Math.min(max,Math.max(min,b));at=Math.min(hi,Math.max(lo,at));
  root.innerHTML=`<section class="sep-lab"><header class="cx-header"><p class="eyebrow">${esc(context.t('linFreeExperimentAnalyticSolutions'))}</p><h2>${esc(context.t('linChangeInitialDataWhatChanges'))}</h2><p>${esc(context.t('linAAndBSelectDifferentSolutionCurves'))}</p></header><div class="panel sep-experiment"><div class="sep-toolbar"><div><label for="lin-family">${esc(context.t('linEquationFamily'))}</label><select id="lin-family">${Object.entries(all).map(([id,d])=>`<option value="${id}" ${id===kind?'selected':''}>${esc(d.name)}</option>`).join('')}</select></div><label><input type="checkbox" id="lin-compare" ${compare?'checked':''}> ${esc(context.t('linCompareWithB'))}</label></div><div class="sep-grid"><div class="sep-controls">${slider('a',`A · ${datumName(temp)}`,a,min,max,.1)}${compare?slider('b',`B · ${datumName(temp)}`,b,min,max,.1):''}${slider('at',context.t('linInspectionPoint'),at,lo,hi,.05)}<p class="trf-fixed">${esc(context.t('linInitialPointFixed'))}</p><div class="sep-presets"><button class="button secondary" data-preset="example">${esc(context.t('linExamplePreset'))}</button><button class="button secondary" data-preset="compare">${esc(context.t('linComparisonPreset'))}</button></div><p>${esc(data.note)}</p></div><div class="sep-plot-wrap"><div class="sep-legend"><span><i></i>A</span>${compare?'<span class="sep-b"><i></i>B</span>':''}<span class="sep-equilibrium"><i></i>${esc(context.t('linExcludedBranches'))}</span></div><svg class="cx-chart" id="lin-plot" role="img" viewBox="0 0 740 330" aria-label="${esc(context.t('linSolutionCurvesAAndB'))}"></svg><div class="sep-metrics" aria-live="polite"></div></div></div><div class="sep-interpret"><div><p class="eyebrow">${esc(context.t('linMethod'))}</p>${formulas(data.method)}<p>${esc(context.t('linMethodNote'))}</p></div><div><p class="eyebrow">${esc(context.t('linSolutionFamily'))}</p>${formulas(data.solution)}<p>${esc(data.excluded)}</p></div></div><p class="sep-boundary-note">${esc(context.t('linPlotWindow'))}</p></div><footer class="cx-topic-footer"><p>${esc(context.t('linNowApplyTheMethodOn'))}</p><a class="button primary" href="#practice">${esc(context.t('linGoToTheMidtermClinic'))}</a></footer></section>`;
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
  const [xMin,xMax,yMin,yMax]=WINDOWS[kind],temp=linearMode(kind);
  const plot=cartesianPlot({xMin,xMax,yMin,yMax,title:context.t('linEffectOfInitialConditions'),format:fmt,id:'linear'});
  let overlay='';
  if(kind==='linear-tan'){
   for(const pole of [-Math.PI/2,Math.PI/2])if(pole>xMin&&pole<xMax)overlay+=plot.line([[pole,yMin+.01],[pole,yMax-.01]],'#bca57c','stroke-dasharray="5 5" stroke-width="1.4"');
  }else if(kind==='linear-y'||kind==='bernoulli-34'){
   overlay+=plot.line([[xMin,0],[xMax,0]],'#bca57c','stroke-dasharray="5 5" stroke-width="1.4"');
  }
  for(const [datum,color]of [[a,'#397752'],...(compare?[[b,'#b47b55']]:[])]){
   if(!linearValid(kind,datum))continue;
   const [lo,hi]=linearDomain(kind,datum);
   let from=temp==='y'?Math.max(lo+1e-6,xMin):Math.max(lo,yMin);
   let to=temp==='y'?Math.min(hi-1e-6,xMax):Math.min(hi,yMax);
   if(temp==='x')from=Math.max(from,.02);
   if(to>from)for(const segment of split(linearSample(kind,datum,from,to,620),xMin,xMax,yMin,yMax))overlay+=plot.line(segment,color,'stroke-width="1.9"');
   const [ix,iy]=linearInitial(kind,datum);
   if(ix>=xMin&&ix<=xMax&&iy>=yMin&&iy<=yMax)overlay+=plot.point(ix,iy,color);
   const [px,py]=linearPoint(kind,at,datum);
   if(px>=xMin&&px<=xMax&&py>=yMin&&py<=yMax)overlay+=plot.point(px,py,color);
  }
  root.querySelector('#lin-plot').innerHTML=plot.markup+`<g clip-path="url(#${plot.clipId})">${overlay}</g>`;
  root.querySelector('.sep-metrics').innerHTML=[[a,'A'],...(compare?[[b,'B']]:[])].map(([datum,label])=>{
   if(!linearValid(kind,datum))return `<article><h3>${label} · ${datumName(temp)}=${fmt(datum)}</h3><p class="sep-invalid">${esc(context.t('linInvalidInitialData'))}</p></article>`;
   const [ix,iy]=linearInitial(kind,datum);
   const c=linearConstant(kind,datum),aux=linearAuxiliary(kind,ix,iy);
   const [px,py]=linearPoint(kind,at,datum),slope=linearSlope(kind,px,py);
   const auxName=kind.startsWith('bernoulli')?'u':'μ';
   const valueName=temp==='y'?`y(${fmt(at)})`:`x(${fmt(at)})`;
   return `<article><h3>${label} · ${datumName(temp)}=${fmt(datum)}</h3><dl><div><dt>${esc(context.t('linConstantC'))}</dt><dd>${fmt(c)}</dd></div><div><dt>${auxName}</dt><dd>${fmt(aux)}</dd></div><div><dt>${esc(valueName)}</dt><dd>${Number.isFinite(px)&&Number.isFinite(py)?fmt(temp==='y'?py:px):'—'}</dd></div><div><dt>${esc(context.t('linSlopeAtInspection'))}</dt><dd>${Number.isFinite(slope)?fmt(slope):'—'}</dd></div></dl>${!Number.isFinite(px)||!Number.isFinite(py)?`<p class="sep-invalid">${esc(context.t('linOutsideDomain'))}</p>`:''}</article>`;
  }).join('');
  for(const [id,value]of Object.entries({a,b,at})){const out=root.querySelector(`[data-output="${id}"]`);if(out)out.textContent=fmt(value);}
 }
 root.addEventListener('input',event=>{const id=event.target.dataset.input;if(!id)return;const value=+event.target.value;if(id==='a')a=value;if(id==='b')b=value;if(id==='at')at=value;draw();},{signal:events.signal});
 root.addEventListener('change',event=>{if(event.target.id==='lin-family'){kind=event.target.value;const d=DEFAULTS[kind];a=d.a;b=d.b;at=INSPECTION[kind][2];render();root.querySelector('#lin-family').focus();}if(event.target.id==='lin-compare'){compare=event.target.checked;render();root.querySelector('#lin-compare').focus();}},{signal:events.signal});
 root.addEventListener('click',event=>{const button=event.target.closest('[data-preset]');if(!button)return;const d=DEFAULTS[kind];if(button.dataset.preset==='example'){a=d.a;b=d.b;}else{compare=true;const [min,max]=LIMITS[kind];const clamp=value=>Math.min(max,Math.max(min,value));let candidate=clamp(a+.5);if(!variantWorks(candidate))candidate=clamp(a-.5);b=candidate;}at=INSPECTION[kind][2];render();root.querySelector(`[data-preset="${button.dataset.preset}"]`).focus();},{signal:events.signal});
 render();
 return{update(next){context=next;render();},destroy(){events.abort();root.replaceChildren();}};
}
