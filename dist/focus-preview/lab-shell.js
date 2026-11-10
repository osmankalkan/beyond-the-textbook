import {mountClock} from './work-clock.js';
// Presentation controls only. All lessons, experiments and progress use the course app.
if(document.documentElement.dataset.ui==='focus'){
 const destroyClock=mountClock(document.querySelector('#main'));
 window.addEventListener('pagehide',event=>{if(!event.persisted)destroyClock();});
 const actions=document.querySelector('.topbar-actions');
 const focus=document.createElement('button');
 const theme=document.createElement('button');
 focus.className=theme.className='focus-shell-control';
 focus.type=theme.type='button';
 focus.setAttribute('aria-pressed','false');
 const size=document.createElement('select');
 size.className='focus-shell-control';
 for(const value of [17,18,20,22]){const option=document.createElement('option');option.value=value;option.textContent=value+' px';size.append(option);}
 try{const saved=JSON.parse(localStorage.getItem('btt-focus-preview')||'{}');size.value=[17,18,20,22].includes(saved.fontSize)?saved.fontSize:18;}catch{size.value=18;}
 document.documentElement.style.setProperty('--font-size',size.value+'px');
 size.onchange=()=>{document.documentElement.style.setProperty('--font-size',size.value+'px');try{const saved=JSON.parse(localStorage.getItem('btt-focus-preview')||'{}');saved.fontSize=Number(size.value);localStorage.setItem('btt-focus-preview',JSON.stringify(saved));}catch{}};
 actions.prepend(focus,theme,size);
 const copy={
  'plot-title':['Sıcaklık ve zaman','Temperature over time'],
  'study-pill-1-title':['Rehberli çalışma','Guided study'],
  'study-pill-2-title':['Serbest deney · A/B','Free experiment · A/B'],
  'study-pill-3-title':['Sınav çalışması','Exam practice'],
  'params-panel-kicker':['PARAMETRELER','PARAMETERS'],
  'stepper-title':['Adım adım çözüm','Step-by-step solution'],
  'eq-eyebrow':['MODEL DENKLEMİ','MODEL EQUATION'],
  'discovery-eyebrow':['TAHMİN ET','PREDICT'],
  'stepper-eyebrow':['TÜRETİM','DERIVATION'],
  'cal-eyebrow':['ÖLÇÜMDEN MODELE','FROM MEASUREMENT TO MODEL'],
  'exam-clinic-eyebrow':['ÇÖZÜMLÜ PROBLEMLER','WORKED PROBLEMS']
 };
 function localize(){
  const en=document.documentElement.lang==='en';
  size.setAttribute('aria-label',en?'Reading font size':'Okuma yazı boyutu');
  focus.textContent=document.body.classList.contains('lab-focus')?(en?'Exit focus':'Odaktan çık'):(en?'Focus':'Odaklan');
  theme.textContent=document.documentElement.dataset.theme==='dark'?(en?'Light theme':'Açık tema'):(en?'Dark theme':'Koyu tema');
  for(const [id,values] of Object.entries(copy)){
   const el=document.getElementById(id);
   if(el&&el.textContent!==values[en?1:0])el.textContent=values[en?1:0];
  }
 }
 focus.onclick=()=>{
  const active=document.body.classList.toggle('lab-focus');
  focus.setAttribute('aria-pressed',String(active));localize();
 };
 theme.onclick=()=>{
  const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=next;
  try{const saved=JSON.parse(localStorage.getItem('btt-focus-preview')||'{}');saved.theme=next;localStorage.setItem('btt-focus-preview',JSON.stringify(saved));}catch{}
  localize();
 };
 // Course localization replaces labels on language/lesson changes.
 const observer=new MutationObserver(localize);
 observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 for(const id of Object.keys(copy)){const el=document.getElementById(id);if(el)observer.observe(el,{childList:true});}
 const mathObserver=new MutationObserver(wrapMath);
 function wrapMath(){
  document.querySelectorAll('main math').forEach(math=>{
   if(math.parentElement.classList.contains('lab-math-scroll'))return;
   const wrapper=document.createElement('span');
   wrapper.className='lab-math-scroll';
   if(math.getAttribute('display')==='block'||getComputedStyle(math).display==='block')wrapper.classList.add('block');
   math.before(wrapper);wrapper.append(math);
  });
 }
 mathObserver.observe(document.querySelector('main'),{childList:true,subtree:true});
 wrapMath();
 localize();
 window.addEventListener('pagehide',event=>{if(!event.persisted)mathObserver.disconnect();});
 window.addEventListener('pagehide',event=>{if(!event.persisted)observer.disconnect();});
}
