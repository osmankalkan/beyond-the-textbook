import {regularInitialSolution,regularExistenceBound,singularInitialCase,singularBranch,delayedBranch} from '../../../models.js';
import {cartesianPlot,sampledCurve} from '../../../core/cartesian-plot.js';
import {activityScope,paintPlot,escape} from '../helpers.js';

export function createActivity(root,initialContext){
  const scope=activityScope(root,initialContext),{$,t,fmt,formula,slider}=scope;
  const subscriptions=new AbortController();
  let mode='regular';const values={x0:0,y0:0,left:.5,right:1,wait:.75};
  const learning=()=>scope.context.lesson.learningText;
  function render(){
    root.innerHTML=`<div class="cx-section-head"><h3>${escape(t('cxUniqueTitle'))}</h3><p>${escape(learning().uniquenessIntro)}</p></div>
      ${scope.buttons(t('cxUniqueTitle'),[['regular',t('cxRegular')],['singular',t('cxSingular')],['delayed',t('cxDelayed')]],mode)}
      <section class="panel cx-work-panel"><div class="cx-split"><div class="cx-controls">
      ${mode==='delayed'?slider('unique-wait',t('cxWaiting'),0,1.5,.05,values.wait,'',2):slider('unique-x0',t('cxInitialX'),-1,1,.5,values.x0,'',1)+slider('unique-y0',t('cxInitialY'),-1.5,1.5,.5,values.y0,'',1)}
      ${mode==='singular'?`<div class="cx-presets"><button type="button" data-preset="away">${escape(t('cxAway'))}</button><button type="button" data-preset="zero">${escape(t('cxAtOrigin'))}</button><button type="button" data-preset="none">${escape(t('cxInconsistent'))}</button></div><div data-branch-left>${slider('unique-left',t('cxLeftBranch'),-2,2,.25,values.left,'',2)}</div><div data-branch-right>${slider('unique-right',t('cxRightBranch'),-2,2,.25,values.right,'',2)}</div>`:''}
      </div><div class="cx-chart-box"><div class="legend"><span><i></i>${escape(t('cxSelectedMember'))}</span>${mode!=='regular'?`<span class="euler"><i></i>${escape(t('cxAlternate'))}</span>`:''}</div><svg class="cx-chart" role="img" aria-label="${escape(t('cxDirectionField'))}"></svg></div></div>
      <div class="cx-live" data-unique-results aria-live="polite"></div><div class="cx-formula-stack">${mode==='regular'?formula('standardIvp')+formula('lipschitz')+formula('existenceBound'):mode==='singular'?formula('singularOde')+formula('singularBranches'):formula('delayedBranches')}</div></section>
      <aside class="cx-callout"><strong>${escape(t('cxThinkFirst'))}</strong><p>${escape(learning().sufficientWarning)}</p></aside>`;
    paint();
  }
  function field(plot){
    let result='';
    const scaleX=plot.x(1)-plot.x(0),scaleY=plot.y(1)-plot.y(0);
    for(let i=0;i<=16;i++)for(let j=0;j<=16;j++){
      const x=-2+i*.25,y=-3+j*.375;
      if(mode==='singular'&&Math.abs(x)<1e-10)continue;
      const slope=mode==='regular'?y-x:mode==='singular'?2*y/x:Math.sqrt(Math.abs(y));
      const ratio=slope*scaleY/scaleX,dx=7/Math.hypot(1,ratio),dy=ratio*dx;
      result+=`<path d="M${plot.x(x)-dx} ${plot.y(y)-dy}l${2*dx} ${2*dy}" stroke="#a5b899" stroke-width="1.1" opacity=".7"/>`;
    }
    return result;
  }
  function paint(){
    const plot=cartesianPlot({id:'cx-direction',width:scope.size(),height:370,xMin:-2,xMax:2,yMin:-3,yMax:3,format:fmt,title:t('cxDirectionField')});
    let overlay='',report='';
    if(mode==='regular'){
      const {h,maximum}=regularExistenceBound(values);
      overlay+=`<rect x="${plot.x(values.x0-1)}" y="${plot.y(values.y0+1)}" width="${plot.x(values.x0+1)-plot.x(values.x0-1)}" height="${plot.y(values.y0-1)-plot.y(values.y0+1)}" fill="#f2f6eb" stroke="#90a67c" stroke-dasharray="4 4"/><rect x="${plot.x(values.x0-h)}" y="${plot.top}" width="${plot.x(values.x0+h)-plot.x(values.x0-h)}" height="${plot.height-plot.top-plot.bottom}" fill="#c7d6b5" opacity=".18"/>`;
      overlay+=field(plot)+plot.line(sampledCurve(x=>regularInitialSolution(x,values).value,-2,2))+plot.point(values.x0,values.y0);
      report=`<h4 class="cx-verdict pass">${escape(t('cxUnique'))}</h4><p>${escape(learning().regularGuarantee)}</p><div class="metrics">${scope.metric(t('cxGuaranteed'),h)}${scope.metric(t('cxMaximum'),maximum)}</div><p><code>|x − ${fmt(values.x0)}| ≤ ${fmt(h,3)}</code></p>`;
    }else if(mode==='singular'){
      const result=singularInitialCase(values);
      $('[data-branch-left]').hidden=result.kind==='no-solution'||(result.kind==='locally-unique'&&result.side<0);
      $('[data-branch-right]').hidden=result.kind==='no-solution'||(result.kind==='locally-unique'&&result.side>0);
      overlay+=field(plot)+`<path d="M${plot.x(0)} ${plot.top}V${plot.height-plot.bottom}" stroke="#c2936f" stroke-width="2" stroke-dasharray="6 4"/>`;
      if(result.kind!=='no-solution'){
        const selected={left:result.side<0?result.constant:values.left,right:result.side>0?result.constant:values.right};
        const alternate=result.side<0?{...selected,right:selected.right+1}:{...selected,left:selected.left+1};
        overlay+=plot.line(sampledCurve(x=>singularBranch(x,alternate).value,-2,2),'#c58e60','stroke-dasharray="5 4"')+plot.line(sampledCurve(x=>singularBranch(x,selected).value,-2,2));
        report=`<h4 class="cx-verdict ${result.kind==='locally-unique'?'pass':'neutral'}">${escape(t(result.kind==='locally-unique'?'cxUnique':'cxMany'))}</h4><p>${escape(result.kind==='locally-unique'?learning().singularLocal:learning().singularMany)}</p><p><code>a = ${fmt(selected.right)}, b = ${fmt(selected.left)}</code></p>`;
      }else{
        report=`<h4 class="cx-verdict fail">${escape(t('cxNone'))}</h4><p>${escape(learning().singularNone)}</p><p><code>0 = 2 × ${fmt(values.y0)} ≠ 0</code></p>`;
      }
      overlay+=plot.point(values.x0,values.y0,result.kind==='no-solution'?'#b46b51':'#397752');
      report+=`<p class="cx-domain-note">${escape(t('cxUndefinedLine'))}</p>`;
      if(values.x0===0)report+=`<p class="cx-domain-note">${escape(t('cxNotGuaranteed'))}</p>`;
    }else{
      overlay+=field(plot)+plot.line(sampledCurve(()=>0,-2,2),'#92a5be','stroke-dasharray="3 4"')+plot.line(sampledCurve(x=>delayedBranch(x,0).value,-2,2),'#c58e60','stroke-dasharray="6 4"')+plot.line(sampledCurve(x=>delayedBranch(x,values.wait).value,-2,2))+plot.point(0,0);
      report=`<h4 class="cx-verdict neutral">${escape(t('cxMany'))}</h4><p>${escape(learning().delayedExplanation)}</p><p><code>y(0) = 0, τ = ${fmt(values.wait)}</code></p><p class="cx-domain-note">${escape(t('cxNotGuaranteed'))}</p>`;
    }
    $('[data-unique-results]').innerHTML=report;paintPlot($('.cx-chart'),plot,overlay);
  }
  root.addEventListener('input',event=>{const input=event.target;if(!input.dataset.input)return;values[input.dataset.input.replace('unique-','')]=Number(input.value);scope.output(input);paint();},{signal:subscriptions.signal});
  root.addEventListener('click',event=>{
    const choice=event.target.closest('[data-choice]');if(choice){mode=choice.dataset.choice;render();root.querySelector(`[data-choice="${mode}"]`).focus({preventScroll:true});return;}
    const preset=event.target.closest('[data-preset]');
    if(preset){values.x0=preset.dataset.preset==='away'?1:0;values.y0=preset.dataset.preset==='zero'?0:1;for(const key of ['x0','y0']){const input=$(`#cx-unique-${key}`);input.value=values[key];scope.output(input);}paint();}
  },{signal:subscriptions.signal});
  window.addEventListener('resize',()=>{if(!root.hidden)paint();},{signal:subscriptions.signal});
  render();
  return {update(context){scope.setContext(context);render();},destroy(){subscriptions.abort();root.replaceChildren();}};
}
