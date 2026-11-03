import {odeCandidate,heatCandidate} from '../../../models.js';
import {cartesianPlot,sampledCurve} from '../../../core/cartesian-plot.js';
import {activityScope,paintPlot,escape} from '../helpers.js';

export function createActivity(root,initialContext){
  const scope=activityScope(root,initialContext),{$,t,fmt,formula,slider}=scope;
  const subscriptions=new AbortController();
  let mode='ode';const shown={ode:1,heat:1};
  const values={c1:1,c2:1,sine:-39/125,cosine:-27/125,x:.5,length:3,amplitude:2,n:3,factor:1,time:.5,fraction:.5};
  const learning=()=>scope.context.lesson.learningText;
  const heatParameters=()=>({length:values.length,amplitude:values.amplitude,mode:values.n,decayFactor:values.factor});

  function render(){
    root.innerHTML=`<div class="cx-section-head"><h3>${escape(t('cxVerifyTitle'))}</h3><p>${escape(learning().verifyIntro)}</p></div>
      ${scope.buttons(t('cxVerifyTitle'),[['ode',t('cxVerifyOde')],['heat',t('cxVerifyPde')]],mode)}
      <section class="panel cx-work-panel"><div class="cx-split"><div class="cx-controls">${mode==='ode'?[
        slider('verify-c1','C₁',-2,2,.25,values.c1,'',2),slider('verify-c2','C₂',-2,2,.25,values.c2,'',2),
        slider('verify-sine',t('cxSineA'),-.6,.6,.001,values.sine,'',3),slider('verify-cosine',t('cxCosineB'),-.6,.6,.001,values.cosine,'',3),
        slider('verify-x',t('cxObserveX'),0,2,.05,values.x,'',2)
      ].join(''):[
        slider('verify-amplitude',t('cxAmplitude'),.5,3,.5,values.amplitude,'',1),
        slider('verify-n',t('cxModeN'),1,5,1,values.n,'',0),
        slider('verify-length',t('cxLength'),1,6,.5,values.length,'',1),
        slider('verify-factor',t('cxDecayFactor'),.5,1.5,.1,values.factor,'',1),
        slider('verify-time',t('cxObserveTime'),0,3,.1,values.time,'',1),
        slider('verify-fraction',t('cxObserveX')+' / L',0,1,.05,values.fraction,'',2)
      ].join('')}</div><div class="cx-chart-box"><div class="legend">${mode==='ode'?`<span><i></i>${escape(t('cxLeftHand'))}</span><span class="euler"><i></i>${escape(t('cxRightHand'))}</span><span class="cx-purple"><i></i>${escape(t('cxResidual'))}</span>`:`<span><i></i>${escape(t('cxCandidateProfile'))}</span><span class="euler"><i></i>${escape(t('cxInitialProfile'))}</span>`}</div><svg class="cx-chart" role="img" aria-label="${escape(t('cxVerifyTitle'))}"></svg></div></div>
      <div class="cx-actions"><button class="button primary" type="button" data-book>${escape(t('cxBookCandidate'))}</button><button class="button secondary" type="button" data-error>${escape(t(mode==='ode'?'cxSignError':'cxDecayError'))}</button></div>
      <div class="cx-live" data-verification-results aria-live="polite"></div><div class="cx-formula-stack">${mode==='ode'?formula('verifyOde')+formula('odeCandidate')+formula('odeResidual'):formula('heatCandidate')+formula('verifyHeat')+formula('heatResidual')}</div>
      <p class="cx-explanation">${escape(mode==='ode'?learning().odeIdentity:learning().heatIdentity)}</p>${mode==='heat'?`<p class="cx-explanation">${escape(learning().heatScale)}</p>`:''}</section>
      <aside class="cx-callout"><strong>${escape(t('cxThinkFirst'))}</strong><p>${escape(learning().residualWarning)}</p></aside>
      <section class="panel cx-proof"><div class="cx-proof-header"><h4>${escape(t('cxProofTitle'))}</h4><span data-proof-count></span></div><ol class="cx-proof-list"></ol><div class="cx-actions"><button type="button" class="button primary" data-next>${escape(t('cxNextStep'))}</button><button type="button" class="text-button" data-collapse>${escape(t('cxResetSteps'))}</button></div></section>`;
    paint();paintProof();
  }
  function paint(){
    let plot,overlay='';
    if(mode==='ode'){
      const points=Array.from({length:201},(_,i)=>{const x=i/100;return {x,...odeCandidate(x,values)};});
      const all=points.flatMap(point=>[point.lhs,point.rhs,point.residual]),pad=Math.max(1,(Math.max(...all)-Math.min(...all))*.1);
      plot=cartesianPlot({id:'cx-verify-ode',width:scope.size(),xMin:0,xMax:2,yMin:Math.min(...all)-pad,yMax:Math.max(...all)+pad,format:fmt,title:t('cxVerifyOde')});
      overlay+=plot.line(points.map(p=>[p.x,p.lhs]))+plot.line(points.map(p=>[p.x,p.rhs]),'#c58e60','stroke-dasharray="6 4"')+plot.line(points.map(p=>[p.x,p.residual]),'#8b79a9','stroke-dasharray="3 3"');
      const point=odeCandidate(values.x,values);overlay+=plot.point(values.x,point.lhs);
      $('[data-verification-results]').innerHTML=`<div class="cx-checks">${scope.status(t('cxIdentity'),point.identitySatisfied)}</div><p><code>sin(3x): ${fmt(point.sinCoefficient,4)} · cos(3x): ${fmt(point.cosCoefficient,4)}</code></p><div class="metrics">${scope.metric(t('cxCandidateValue'),point.value)}${scope.metric(t('cxLeftHand'),point.lhs)}${scope.metric(t('cxRightHand'),point.rhs)}${scope.metric(t('cxPointResidual'),point.residual)}</div>`;
    }else{
      const parameters=heatParameters(),x=values.length*values.fraction;
      const active=sampledCurve(x=>heatCandidate(x,values.time,parameters).value,0,values.length);
      const target=sampledCurve(x=>2*Math.sin(3*Math.PI*x/values.length),0,values.length);
      const bound=Math.max(2,values.amplitude)*1.16;
      plot=cartesianPlot({id:'cx-verify-heat',width:scope.size(),xMin:0,xMax:values.length,yMin:-bound,yMax:bound,format:fmt,xLabel:'x',yLabel:'u(x,t)',title:t('cxVerifyPde')});
      const point=heatCandidate(x,values.time,parameters);
      overlay+=plot.line(target,'#c58e60','stroke-dasharray="6 4"')+plot.line(active)+plot.point(x,point.value);
      $('[data-verification-results]').innerHTML=`<div class="cx-checks">${scope.status(t('cxIdentity'),point.equationSatisfied)}${scope.status(t('cxBoundaryCheck'),point.boundarySatisfied)}${scope.status(t('cxInitialProfileCheck'),point.initialSatisfied)}</div><div class="metrics">${scope.metric(t('cxDecay'),point.decay)}${scope.metric(t('cxRequiredDecay'),point.expectedDecay)}${scope.metric(t('cxPointResidual'),point.residual)}</div><p><code>x = ${fmt(x)}, t = ${fmt(values.time)}, u = ${fmt(point.value,4)}</code></p>`;
    }
    paintPlot($('.cx-chart'),plot,overlay);
  }
  function paintProof(){
    const steps=scope.context.lesson.proofs[mode];
    $('.cx-proof-list').innerHTML=steps.slice(0,shown[mode]).map(step=>`<li><h5>${escape(step.title)}</h5>${step.formulas.map(formula).join('')}<p>${escape(step.body)}</p></li>`).join('');
    $('[data-proof-count]').textContent=shown[mode]+' / '+steps.length;
    $('[data-next]').disabled=shown[mode]===steps.length;
    $('[data-next]').textContent=t(shown[mode]===steps.length?'cxAllSteps':'cxNextStep');
    $('[data-collapse]').hidden=shown[mode]===1;
  }
  function syncInputs(){for(const input of root.querySelectorAll('[data-input]')){input.value=values[input.dataset.input.replace('verify-','')];scope.output(input);}}
  root.addEventListener('input',event=>{const input=event.target;if(!input.dataset.input)return;values[input.dataset.input.replace('verify-','')]=Number(input.value);scope.output(input);paint();},{signal:subscriptions.signal});
  root.addEventListener('click',event=>{
    const choice=event.target.closest('[data-choice]');if(choice){mode=choice.dataset.choice;render();root.querySelector(`[data-choice="${mode}"]`).focus({preventScroll:true});return;}
    if(event.target.closest('[data-book]')){if(mode==='ode'){values.sine=-39/125;values.cosine=-27/125;}else{values.amplitude=2;values.n=3;values.factor=1;}syncInputs();paint();}
    if(event.target.closest('[data-error]')){if(mode==='ode'){values.sine=-39/125;values.cosine=27/125;}else values.factor=1.5;syncInputs();paint();}
    if(event.target.closest('[data-next]')){shown[mode]=Math.min(4,shown[mode]+1);paintProof();}
    if(event.target.closest('[data-collapse]')){shown[mode]=1;paintProof();}
  },{signal:subscriptions.signal});
  window.addEventListener('resize',()=>{if(!root.hidden)paint();},{signal:subscriptions.signal});
  render();
  return {update(context){scope.setContext(context);render();},destroy(){subscriptions.abort();root.replaceChildren();}};
}
