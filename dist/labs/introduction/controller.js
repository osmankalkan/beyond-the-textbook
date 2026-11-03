import {escapeHtml as escape} from '../../core/html.js';
import {projectileState, projectileFlightTime, mixingTankState} from '../../models.js';

/** Owns only the §1.1 lab. All numerical work stays in pure model functions. */
export async function mount(root, initialContext) {
  const formulaMap = await initialContext.loadMath();
  if (initialContext.signal.aborted) return {update(){},destroy(){}};
  const formulas = Object.values(formulaMap);
  const subscriptions = new AbortController();
  let context = initialContext, selected = 0;
  const projectile = {speed:30,angle:45,mass:2,drag:.4};
  const tank = {volume:100,initial:.1,inlet:.02,inflow:5,outflow:5};
  let observedTime=20;
  const $=selector=>root.querySelector(selector);
  const t=(key,...args)=>context.t(key,...args);
  const fmt=(value,digits=1)=>context.format(value,digits);
  const examples=()=>context.lesson.modelingExamples;
  const horizon=()=>tank.outflow>tank.inflow?Math.min(40,.95*tank.volume/(tank.outflow-tank.inflow)):40;

  function slider(key,label,min,max,step,value,units,digits=0){
    return `<div class="intro-control"><label for="intro-${key}">${escape(label)}<output data-output="${key}">${fmt(value,digits)} ${escape(units)}</output></label><input id="intro-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${escape(label)}" data-input="${key}" data-units="${escape(units)}" data-digits="${digits}"></div>`;
  }
  function metric(label,value,units){return `<div class="metric"><p class="eyebrow">${escape(t(label))}</p><strong>${fmt(value,2)}<small>${escape(units)}</small></strong></div>`;}

  function render(){
    const example=examples()[selected];
    root.innerHTML=`<div class="section-intro intro-heading"><p class="eyebrow">${escape(t('introEyebrow'))}</p><h2>${escape(t('introTitle'))}</h2><p>${escape(t('introDescription'))}</p></div>
      <div class="intro-case-grid" role="group" aria-label="${escape(t('introExamplesLabel'))}">${examples().map((item,i)=>`<button type="button" class="intro-case ${i===selected?'selected':''}" data-case="${i}" aria-pressed="${i===selected}"><span aria-hidden="true">${item.icon}</span><small>0${i+1}</small><strong>${escape(item.title)}</strong></button>`).join('')}</div>
      <article class="panel intro-model"><div class="intro-model-header"><div><p class="eyebrow">${escape(t('introSource'))} ${escape(example.pages)}</p><h3>${escape(example.title)}</h3><p>${escape(example.summary)}</p></div><span class="intro-model-symbol" aria-hidden="true">${example.icon}</span></div>
      <div class="intro-model-steps">${[['introUnknown','unknown'],['introIndependent','independent'],['introBalance','balance'],['introConditions','conditions']].map(([label,key])=>`<div><p class="eyebrow">${escape(t(label))}</p><p>${escape(example[key])}</p></div>`).join('')}</div>
      <div class="intro-equations"><p class="eyebrow">${escape(t('introEquation'))}</p>${example.formulaIndices.map(index=>`<div class="intro-math">${formulas[index]}</div>`).join('')}</div>
      <div class="intro-assumptions"><strong>${escape(t('introAssumptions'))}</strong><p>${escape(example.assumptions)}</p></div></article>
      ${example.experiment?`<section class="panel intro-experiment"><div class="plot-heading"><div><p class="eyebrow">${escape(t('introExperiment'))}</p><h3>${escape(t(example.experiment==='projectile'?'introProjectileTitle':'introTankTitle'))}</h3></div></div><div class="intro-experiment-grid"><div class="intro-controls">${experimentControls(example.experiment)}</div><div class="intro-chart-area"><div class="legend">${example.experiment==='projectile'?`<span><i></i>${escape(t('introDragCurve'))}</span><span class="euler"><i></i>${escape(t('introNoDrag'))}</span>`:`<span><i></i>${escape(t('introConcentration'))}</span><span class="euler"><i></i>${escape(t('introInletLine'))}</span>`}</div><svg class="intro-chart" role="img" aria-labelledby="intro-chart-title intro-chart-desc"></svg></div></div><div class="metrics intro-metrics"></div><p class="intro-experiment-note">${escape(t(example.experiment==='projectile'?'introProjectileNote':'introTankNote'))}</p></section>`:`<p class="intro-walkthrough-note">${escape(t('introWalkthroughNote'))}</p>`}
      <section class="discovery-panel intro-discovery"><span class="discovery-icon" aria-hidden="true">✧</span><div><p class="eyebrow">${escape(t('introThink'))}</p><h3>${escape(example.prompt)}</h3><details><summary>${escape(t('introHint'))}</summary><p>${escape(example.hint)}</p></details></div></section>
      <div class="intro-review"><p>${escape(t('introReviewGate'))}</p><a class="button primary" href="#practice">${escape(t('introPracticeLink'))}</a></div>`;
    renderExperiment();
  }

  function experimentControls(experiment){
    if(experiment==='projectile')return [
      slider('speed',t('introSpeed'),10,60,1,projectile.speed,'m/s'),
      slider('angle',t('introAngle'),15,75,1,projectile.angle,'°'),
      slider('mass',t('introMass'),.5,10,.5,projectile.mass,'kg',1),
      slider('drag',t('introDrag'),0,3,.05,projectile.drag,'kg/s',2)
    ].join('');
    observedTime=Math.min(observedTime,horizon());
    return [
      slider('initial',t('introInitial'),0,30,1,tank.initial*100,'%'),
      slider('inlet',t('introInlet'),0,20,1,tank.inlet*100,'%'),
      slider('inflow',t('introInflow'),0,10,.5,tank.inflow,'L/min',1),
      slider('outflow',t('introOutflow'),0,10,.5,tank.outflow,'L/min',1),
      slider('observed',t('introTime'),0,horizon(),.1,observedTime,context.lang==='tr'?'dk':'min',1)
    ].join('');
  }

  function drawChart({lines,xMax,yMax,xLabel,yLabel,title,description,point}){
    const compact=window.matchMedia('(max-width:680px)').matches;
    const width=compact?420:740,height=340,left=52,right=20,top=28,bottom=47;
    const x=value=>left+value/xMax*(width-left-right),y=value=>height-bottom-value/yMax*(height-top-bottom);
    const path=points=>points.map(([a,b],i)=>`${i?'L':'M'}${x(a).toFixed(2)},${y(b).toFixed(2)}`).join(' ');
    let markup=`<title id="intro-chart-title">${escape(title)}</title><desc id="intro-chart-desc">${escape(description)}</desc>`;
    for(let i=0;i<=4;i++){
      const xx=left+i*(width-left-right)/4,yy=top+i*(height-top-bottom)/4;
      markup+=`<path d="M${left} ${yy}H${width-right}M${xx} ${top}V${height-bottom}" fill="none" stroke="#e7ede1" stroke-dasharray="3 5"/><text x="${left-10}" y="${yy+4}" text-anchor="end">${fmt(yMax*(4-i)/4,0)}</text><text x="${xx}" y="${height-bottom+22}" text-anchor="middle">${fmt(xMax*i/4,0)}</text>`;
    }
    markup+=`<text x="${left}" y="14">${escape(yLabel)}</text><text x="${width-right}" y="${height-5}" text-anchor="end">${escape(xLabel)}</text>`;
    for(const [i,line]of lines.entries())markup+=`<path d="${path(line)}" fill="none" stroke="${i?'#c58e60':'#377954'}" stroke-width="${i?2:3}" ${i?'stroke-dasharray="6 4"':''}/>`;
    if(point)markup+=`<circle cx="${x(point[0])}" cy="${y(point[1])}" r="5" fill="#377954" stroke="white" stroke-width="2"/>`;
    const svg=$('.intro-chart');svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.innerHTML=markup;
  }

  function renderExperiment(){
    const experiment=examples()[selected].experiment;
    if(!experiment)return;
    if(experiment==='projectile'){
      const flight=projectileFlightTime(projectile),vacuum={...projectile,drag:0},vacuumTime=projectileFlightTime(vacuum);
      const endpoint=projectileState(flight,projectile);
      const samples=(parameters,end)=>Array.from({length:161},(_,i)=>{const p=projectileState(i*end/160,parameters);return [p.x,Math.max(0,p.y)];});
      const lines=[samples(projectile,flight),samples(vacuum,vacuumTime)];
      const xMax=Math.max(...lines.flat().map(p=>p[0]),1)*1.04,yMax=Math.max(...lines.flat().map(p=>p[1]),1)*1.16;
      drawChart({lines,xMax,yMax,xLabel:'x (m)',yLabel:'y (m)',title:t('introProjectileTitle'),description:`${t('introFlightTime')}: ${fmt(flight,2)} s. ${t('introRange')}: ${fmt(endpoint.x,2)} m.`,point:[endpoint.x,0]});
      $('.intro-metrics').innerHTML=metric('introFlightTime',flight,'s')+metric('introRange',endpoint.x,'m')+metric('introDragRate',projectile.drag/projectile.mass,'s⁻¹');
    }else{
      observedTime=Math.min(observedTime,horizon());
      const end=horizon(),state=mixingTankState(observedTime,tank),start=mixingTankState(0,tank);
      const line=Array.from({length:161},(_,i)=>{const time=i*end/160;return [time,100*mixingTankState(time,tank).concentration];});
      drawChart({lines:[line,[[0,tank.inlet*100],[end,tank.inlet*100]]],xMax:end,yMax:Math.max(tank.initial*100,tank.inlet*100,1)*1.15,xLabel:t('introTimeAxis'),yLabel:t('introTankAxis'),title:t('introTankTitle'),description:`${t('introVolume')}: ${fmt(state.volume,2)} L. ${t('introTankConcentration')}: ${fmt(state.concentration*100,2)}%.`,point:[observedTime,state.concentration*100]});
      $('.intro-metrics').innerHTML=metric('introVolume',state.volume,'L')+metric('introTankConcentration',100*state.concentration,'%')+metric('introInitialRate',100*start.rate,context.lang==='tr'?'yüzde puan/dk':'pp/min');
      const input=$('[data-input="observed"]');input.max=end;input.value=observedTime;
      $('[data-output="observed"]').textContent=fmt(observedTime,1)+' '+(context.lang==='tr'?'dk':'min');
    }
  }

  root.addEventListener('click',event=>{
    const button=event.target.closest('[data-case]');
    if(!button)return;
    selected=Number(button.dataset.case);render();
    root.querySelector(`[data-case="${selected}"]`).focus({preventScroll:true});
  },{signal:subscriptions.signal});
  root.addEventListener('input',event=>{
    const input=event.target,key=input.dataset.input;
    if(!key)return;
    const value=Number(input.value);
    if(examples()[selected].experiment==='projectile')projectile[key]=value;
    else if(key==='observed')observedTime=value;
    else tank[key]=['initial','inlet'].includes(key)?value/100:value;
    $(`[data-output="${key}"]`).textContent=fmt(value,Number(input.dataset.digits))+' '+input.dataset.units;
    renderExperiment();
  },{signal:subscriptions.signal});
  window.addEventListener('resize',()=>{if(!root.hidden)renderExperiment();},{signal:subscriptions.signal});
  render();
  return {
    update(nextContext){context=nextContext;render();},
    destroy(){subscriptions.abort();root.replaceChildren();}
  };
}
