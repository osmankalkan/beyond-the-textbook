import {escapeHtml as escape} from '../../core/html.js';
export {escape};

export function activityScope(root,initialContext){
  let context=initialContext;
  const $=selector=>root.querySelector(selector);
  const t=(key,...args)=>context.t(key,...args);
  const fmt=(value,digits=2)=>context.format(Math.abs(value)<.5*10**(-digits)?0:value,digits);
  function formula(id){
    const latex=context.lesson.equations[id],markup=context.formulas[latex];
    if(!markup)throw new Error(`Missing named formula ${id}`);
    return `<div class="cx-math">${markup}</div>`;
  }
  const slider=(id,label,min,max,step,value,units='',digits=1)=>`<div class="cx-control"><label for="cx-${id}">${escape(label)}<output data-output="${id}">${fmt(value,digits)} ${escape(units)}</output></label><input id="cx-${id}" data-input="${id}" data-digits="${digits}" data-units="${escape(units)}" aria-label="${escape(label)}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
  function output(input){$(`[data-output="${input.dataset.input}"]`).textContent=fmt(Number(input.value),Number(input.dataset.digits))+' '+input.dataset.units;}
  const buttons=(name,options,current)=>`<div class="cx-options" role="group" aria-label="${escape(name)}">${options.map(([value,label])=>`<button type="button" data-choice="${value}" class="${value===current?'selected':''}" aria-pressed="${value===current}">${escape(label)}</button>`).join('')}</div>`;
  const status=(label,ok)=>`<span class="cx-status ${ok?'pass':'fail'}">${ok?'✓':'✕'} ${escape(label)}</span>`;
  const metric=(label,value,units='')=>`<div class="metric"><p class="eyebrow">${escape(label)}</p><strong>${fmt(value)}<small>${escape(units)}</small></strong></div>`;
  const size=()=>window.matchMedia('(max-width:680px)').matches?420:740;
  return {$,t,fmt,formula,slider,output,buttons,status,metric,size,get context(){return context;},setContext(next){context=next;}};
}

export function paintPlot(svg,plot,overlay){
  svg.setAttribute('viewBox',`0 0 ${plot.width} ${plot.height}`);
  svg.innerHTML=plot.markup+`<g clip-path="url(#${plot.clipId})">${overlay}</g>`;
}
