import {lineFamily,lineInitialConstant,fallingBody,fallingBoundaryVelocity} from '../../../models.js';
import {cartesianPlot,sampledCurve} from '../../../core/cartesian-plot.js';
import {activityScope,paintPlot,escape} from '../helpers.js';

export function createActivity(root,initialContext){
  const scope=activityScope(root,initialContext),{$,t,fmt,formula,slider}=scope;
  const subscriptions=new AbortController();
  let family='line',problem='ivp';
  const values={constant:0,x0:0,y0:1,velocity:5,finalTime:2,distance:30};
  const learning=()=>scope.context.lesson.learningText;
  function render(){
    root.innerHTML=`<div class="cx-section-head"><h3>${escape(t('cxFamilyTitle'))}</h3><p>${escape(family==='line'?learning().familyIntro:learning().coordinateNote)}</p></div>
      ${scope.buttons(t('cxFamilyTitle'),[['line',t('cxLineFamily')],['fall',t('cxFallFamily')]],family)}
      <section class="panel cx-work-panel"><div class="cx-split"><div class="cx-controls">${family==='line'?[
        slider('family-constant',t('cxConstantC'),-8,8,.25,values.constant,'',2),
        slider('family-x0',t('cxInitialX'),-1,1,.25,values.x0,'',2),
        slider('family-y0',t('cxInitialY'),-4,4,.25,values.y0,'',2),
        `<button class="button primary" type="button" data-fit>${escape(t('cxApplyCondition'))}</button>`
      ].join(''):`${scope.buttons(t('cxFallFamily'),[['ivp',t('cxIvp')],['bvp',t('cxBvp')]],problem)}${problem==='ivp'?slider('family-velocity',t('cxInitialVelocity'),0,20,.5,values.velocity,'m/s'):slider('family-distance',t('cxFinalPosition'),0,120,1,values.distance,'m')}${slider('family-finalTime',t('cxFinalTime'),1,4,.25,values.finalTime,'s',2)}`}</div>
      <div class="cx-chart-box"><div class="legend"><span><i></i>${escape(t('cxSelectedMember'))}</span><span class="ambient"><i></i>${escape(t('cxOtherMembers'))}</span></div><svg class="cx-chart" role="img" aria-label="${escape(t('cxFamilyTitle'))}"></svg></div></div>
      <div class="cx-live" data-family-results aria-live="polite"></div>
      <div class="cx-formula-stack">${family==='line'?formula('lineOde')+formula('lineFamily'):formula('fallFamily')+formula(problem==='ivp'?'ivp':'fallBvp')}</div>
      <p class="cx-explanation">${escape(family==='line'?learning().familyCondition:learning().coordinateNote)}</p><p class="cx-callout" data-negative hidden></p></section>
      <aside class="cx-callout"><strong>${escape(t('cxThinkFirst'))}</strong><p>${escape(learning().conditionWarning)}</p></aside>`;
    paint();
  }
  function paint(){
    let plot,overlay='';
    if(family==='line'){
      const constants=[-3,0,3],active=sampledCurve(x=>lineFamily(x,values.constant),-2,2);
      const all=active.map(point=>point[1]).concat(-9,9,values.y0);
      plot=cartesianPlot({id:'cx-line',width:scope.size(),xMin:-2,xMax:2,yMin:Math.min(...all)-1,yMax:Math.max(...all)+1,format:fmt,title:t('cxLineFamily')});
      for(const c of constants)overlay+=plot.line(sampledCurve(x=>lineFamily(x,c),-2,2),'#b6c6a8','stroke-dasharray="4 4"');
      overlay+=plot.line(active)+plot.point(values.x0,values.y0,'#c28c5f');
      const residual=lineFamily(values.x0,values.constant)-values.y0;
      $('[data-family-results]').innerHTML=`<div class="cx-checks">${scope.status(t('cxEquationCheck'),true)}${scope.status(t('cxConditionCheck'),Math.abs(residual)<1e-9)}</div><p><code>y(${fmt(values.x0)}) = ${fmt(lineFamily(values.x0,values.constant))}, y₀ = ${fmt(values.y0)}, C = ${fmt(values.constant)}</code></p><p><code>C = y₀ − 3x₀ = ${fmt(lineInitialConstant(values.x0,values.y0))}</code></p>`;
    }else{
      const velocity=problem==='ivp'?values.velocity:fallingBoundaryVelocity({time:values.finalTime,distance:values.distance});
      const active=sampledCurve(time=>fallingBody(time,{velocity}).position,0,values.finalTime);
      const references=[velocity-5,velocity+5,velocity+10].map(velocity=>sampledCurve(time=>fallingBody(time,{velocity}).position,0,values.finalTime));
      const yValues=active.concat(references.flat()).map(point=>point[1]),padding=Math.max(2,(Math.max(...yValues)-Math.min(...yValues))*.1);
      plot=cartesianPlot({id:'cx-fall',width:scope.size(),xMin:0,xMax:values.finalTime,yMin:Math.min(...yValues)-padding,yMax:Math.max(...yValues)+padding,format:fmt,xLabel:'t (s)',yLabel:t('cxCoordinateDown'),title:t('cxFallFamily')});
      for(const line of references)overlay+=plot.line(line,'#b6c6a8','stroke-dasharray="4 4"');
      const final=fallingBody(values.finalTime,{velocity}).position;
      overlay+=plot.line(active)+plot.point(0,0)+plot.point(values.finalTime,final,'#c28c5f');
      $('[data-family-results]').innerHTML=`<div class="metrics">${scope.metric(t('cxFittedVelocity'),velocity,'m/s')}${scope.metric(t('cxAtFinalTime'),final,'m')}${scope.metric(t('cxTimeT'),values.finalTime,'s')}</div><p><code>C₀ = 0, C₁ = ${fmt(velocity)}${problem==='bvp'?` = L/T − gT/2`:''}</code></p>`;
      $('[data-negative]').hidden=velocity>=0;$('[data-negative]').textContent=learning().negativeVelocity;
    }
    paintPlot($('.cx-chart'),plot,overlay);
  }
  root.addEventListener('input',event=>{const input=event.target,key=input.dataset.input;if(!key)return;values[key.replace('family-','')]=Number(input.value);scope.output(input);paint();},{signal:subscriptions.signal});
  root.addEventListener('click',event=>{
    const button=event.target.closest('[data-choice]');
    if(button){const key=button.dataset.choice;if(['line','fall'].includes(key))family=key;else problem=key;render();root.querySelector(`[data-choice="${key}"]`).focus({preventScroll:true});return;}
    if(event.target.closest('[data-fit]')){values.constant=lineInitialConstant(values.x0,values.y0);const input=$('#cx-family-constant');input.value=values.constant;scope.output(input);paint();}
  },{signal:subscriptions.signal});
  window.addEventListener('resize',()=>{if(!root.hidden)paint();},{signal:subscriptions.signal});
  render();
  return {update(context){scope.setContext(context);render();},destroy(){subscriptions.abort();root.replaceChildren();}};
}
