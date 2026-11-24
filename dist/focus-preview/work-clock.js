// Page-level timer survives course view changes. Wall-clock deltas prevent interval drift.
export function mountClock(host, { expanded = false } = {}) {
 const root=document.createElement('section');
 root.className='work-clock';
 root.innerHTML=`<details open><summary data-label="title"></summary><div class="clock-controls">
 <label><span data-label="mode"></span><select data-mode><option value="work"></option><option value="break"></option><option value="stopwatch"></option><option value="custom"></option></select></label>
 <div class="clock-duration" hidden>
  <label><span data-label="minutes"></span><input type="number" data-minutes min="0" max="999" step="1" value="25"></label>
  <label><span data-label="seconds"></span><input type="number" data-seconds min="0" max="59" step="1" value="0"></label>
 </div>
 <strong class="clock-value" role="timer" aria-live="off">25:00</strong>
 <button type="button" data-start></button><button type="button" data-reset></button>
 <label class="clock-sound"><input type="checkbox" data-sound><span data-label="sound"></span></label>
 </div><p data-status role="status"></p></details>`;
 if (expanded) {
  const controls=root.querySelector('details');
  controls.querySelector('summary').remove();
  root.replaceChildren(...controls.childNodes);
 }
 if (expanded) host.append(root);
 else host.prepend(root);
 const mode=root.querySelector('[data-mode]'),start=root.querySelector('[data-start]');
 const reset=root.querySelector('[data-reset]'),sound=root.querySelector('[data-sound]');
 const status=root.querySelector('[data-status]'),display=root.querySelector('.clock-value');
 const custom=root.querySelector('.clock-duration');
 const minutes=root.querySelector('[data-minutes]'),secondsInput=root.querySelector('[data-seconds]');
 if(expanded){
  mode.querySelector('[value="work"]').remove();
  mode.querySelector('[value="break"]').remove();
  mode.value='custom';
 }
 let elapsed=0,startedAt=null,complete=false,context;
 const customSeconds=()=>{
  const m=minutes.valueAsNumber,s=secondsInput.valueAsNumber;
  return Number.isInteger(m)&&m>=0&&m<=999&&Number.isInteger(s)&&s>=0&&s<=59?60*m+s:0;
 };
 const duration=()=>({work:1500000,break:300000,custom:customSeconds()*1000})[mode.value]??0;
 const en=()=>document.documentElement.lang==='en';
 const text=(tr,english)=>en()?english:tr;
 function tick(){
  custom.hidden=mode.value!=='custom';
  minutes.disabled=secondsInput.disabled=startedAt!==null;
  start.disabled=mode.value==='custom'&&!customSeconds();
  const nowElapsed=elapsed+(startedAt===null?0:Date.now()-startedAt);
  let seconds=mode.value==='stopwatch'?Math.floor(nowElapsed/1000):Math.max(0,Math.ceil((duration()-nowElapsed)/1000));
  if(mode.value!=='stopwatch'&&seconds===0&&startedAt!==null){
   elapsed=duration();startedAt=null;complete=true;
   if(sound.checked&&context){
    const note=context.createOscillator(),gain=context.createGain(),now=context.currentTime;
    note.frequency.value=440;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.03,now+.05);gain.gain.exponentialRampToValueAtTime(.001,now+.65);
    note.connect(gain);gain.connect(context.destination);note.start();note.stop(now+.7);
    note.onended=()=>{note.disconnect();gain.disconnect();};
   }
  }
  display.textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
  start.textContent=startedAt!==null?text('Duraklat','Pause'):complete?text('Yeniden başlat','Restart'):text('Başlat','Start');
  const message=complete?text('Süre tamamlandı. Hazır olduğunda molaya geçebilirsin.','Time complete. Take a break when you are ready.'):'';
  if(status.textContent!==message)status.textContent=message;
 }
 function localize(){
  const labels={title:['Çalışma zamanı','Study time'],mode:['Sayaç','Timer'],sound:['Bitiş sesi','Finish sound'],minutes:['Dakika','Minutes'],seconds:['Saniye','Seconds']};
  root.querySelectorAll('[data-label]').forEach(el=>el.textContent=labels[el.dataset.label][en()?1:0]);
  const modes={work:['25 dk çalışma','25 min study'],break:['5 dk mola','5 min break'],stopwatch:['Kronometre','Stopwatch'],custom:['Geri sayım','Countdown']};
  for(const option of mode.options)option.textContent=modes[option.value][en()?1:0];
  reset.textContent=text('Sıfırla','Reset');tick();
 }
 function clear(){elapsed=0;startedAt=null;complete=false;tick();}
 start.onclick=()=>{
  if(startedAt!==null){elapsed+=Date.now()-startedAt;startedAt=null;}
  else {if(complete){elapsed=0;complete=false;}startedAt=Date.now();
   if(sound.checked){try{context??=new AudioContext();context.resume().catch(()=>{});}catch{}}
  }
  tick();
 };
 reset.onclick=clear;mode.onchange=clear;
 minutes.oninput=secondsInput.oninput=clear;
 const observer=new MutationObserver(localize);
 observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 const timer=setInterval(tick,250);
 document.addEventListener('visibilitychange',tick);
 localize();
 return ()=>{clearInterval(timer);observer.disconnect();document.removeEventListener('visibilitychange',tick);context?.close();root.remove();};
}
