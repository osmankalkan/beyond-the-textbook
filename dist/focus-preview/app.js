import {labels,reasons} from './i18n.js';
import {questions,cards} from './content.js';

const key='btt-focus-preview';
const defaults={theme:'auto',fontSize:18,language:'tr',sound:false,quiet:true,focus:false,read:false,answers:{}};
let saved={};
try {saved=JSON.parse(localStorage.getItem(key)||'{}')||{};} catch {}
const state={...defaults,...saved,answers:saved.answers&&typeof saved.answers==='object'?saved.answers:{}};
if(!['tr','en'].includes(state.language))state.language='tr';
if(!['auto','light','dark'].includes(state.theme))state.theme='auto';
if(![17,18,20,22].includes(state.fontSize))state.fontSize=18;
const main=document.querySelector('main');
const media=matchMedia('(prefers-color-scheme: dark)');
const routes=Object.keys(labels).slice(0,7);
let route='home',questionIndex=0,cardIndex=0,revealed=false;
let timerMode='work',remaining=25*60,deadline=null,finished=false,audioContext;
const t=(tr,en)=>state.language==='tr'?tr:en;
const pair=value=>value[state.language==='tr'?0:1];
const label=name=>pair(labels[name]);
const button=(text,action,primary=false)=>`<button data-action="${action}" class="${primary?'primary':''}">${text}</button>`;
const formula=(tex,fallback)=>`<div class="formula" data-tex="${tex}">${fallback}</div>`;

function save(){
 try {localStorage.setItem(key,JSON.stringify(state));}
 catch {document.querySelector('#storage-status').textContent=t('Tercihler bu oturumda kullanılacak. Tarayıcıya kayıt yapılamadı.','Preferences apply to this session. Browser storage is unavailable.');}
}
function appearance(){
 document.documentElement.dataset.theme=state.theme==='auto'?(media.matches?'dark':'light'):state.theme;
 document.documentElement.style.setProperty('--font-size',state.fontSize+'px');
 document.documentElement.lang=state.language;
 document.body.classList.toggle('focus',state.focus);
 document.querySelector('#exit-focus').hidden=!state.focus;
 document.querySelector('#focus-toggle').setAttribute('aria-pressed',String(state.focus));
}
function progressRow(name,value,total,mastery=false){
 return `<div class="progress-row ${mastery?'mastery':''}"><div class="row-label"><span>${name}</span><span>${value} / ${total}</span></div><progress aria-label="${name}" max="${total}" value="${value}"></progress></div>`;
}
function rationale(){
 return `<details class="rationale"><summary>${label('reason')}</summary><p>${pair(reasons[route])}</p></details>`;
}
function home(){
 const attempted=questions.filter(q=>Object.hasOwn(state.answers,q.id)).length;
 return `<p class="eyebrow">${t('KİŞİSEL ÇALIŞMA ALANI','PERSONAL STUDY SPACE')}</p><h1>${t('Bir kavrama odaklan.','Focus on one concept.')}</h1>
 <section class="panel"><h2>${t('Günün hedefi','Today’s goal')}</h2><p>${t('Newton soğuma yasasında sıcaklık farkının nasıl değiştiğini açıkla.','Explain how the temperature difference changes in Newton’s cooling law.')}</p>
 ${button(t('Çalışmaya devam et','Continue studying'),'continue',true)}</section>
 ${progressRow(t('Ders okuması','Lesson reading'),state.read?1:0,1)}
 ${progressRow(t('Kavram kontrolü','Concept checks'),attempted,questions.length)}`;
}
function lesson(){
 return `<p class="eyebrow">§3.1 · ${t('DERS NOTU','LESSON')}</p><h1>${t('Isınma ve soğuma','Heating and cooling')}</h1>
 <p class="lead">${t('Bir cismin ortamla sıcaklık farkı, ısı alışverişinin hızını belirler.','A body’s temperature difference from its surroundings determines its rate of heat exchange.')}</p>
 <p>${t('Cismin sıcaklığının her noktada aynı, ortam sıcaklığının sabit ve k katsayısının pozitif olduğunu varsayalım.','Assume a uniform body temperature, constant ambient temperature, and a positive coefficient k.')}</p>
 ${formula('\\frac{dT}{dt}=-k(T-T_m)','dT/dt = −k(T − Tₘ)')}
 <p>${t('T cismin, Tₘ ortamın sıcaklığıdır. k birimi dakika⁻¹ olan ısıl tepki katsayısıdır.','T is body temperature and Tₘ is ambient temperature. The thermal response coefficient k has units of min⁻¹.')}</p>
 <h2>${t('Çözümü adım adım kur','Build the solution step by step')}</h2>
 <details><summary>1 · ${t('Dengeyi ayır','Separate equilibrium')}</summary><p>${t('T = Tₘ ise türev sıfırdır. Bu sabit çözümü, sıcaklık farkına bölmeden önce ayrı tut.','When T = Tₘ, the derivative is zero. Keep this constant solution before dividing by the temperature difference.')}</p></details>
 <details><summary>2 · ${t('Değişkenleri ayır ve integralle','Separate variables and integrate')}</summary><p>${t('T ≠ Tₘ için sıcaklık farkına böl. İki tarafın integralini al.','For T ≠ Tₘ divide by the temperature difference and integrate both sides.')}</p>${formula('\\int\\frac{dT}{T-T_m}=-\\int k\\,dt','∫ dT/(T − Tₘ) = −∫ k dt')}${formula('\\ln|T-T_m|=-kt+C','ln|T − Tₘ| = −kt + C')}</details>
 <details><summary>3 · ${t('Başlangıç koşulunu kullan','Apply the initial condition')}</summary><p>${t('Üstel alıp sabitin işaretini başlangıç farkıyla belirle. T(0) = Tᵢ koşulu şu sonucu verir.','Exponentiate and determine the sign of the constant using the initial difference. The condition T(0) = Tᵢ gives the following.')}</p>${formula('T(t)=T_m+(T_i-T_m)e^{-kt}','T(t) = Tₘ + (Tᵢ − Tₘ)e⁻ᵏᵗ')}</details>
 <details><summary>4 · ${t('Ölçümle kalibre et ve doğrula','Calibrate and verify')}</summary><p>${t('Tₘ = 20, Tᵢ = 100 ve T(20) = 60 için fark 80’den 40’a iner. Böylece k = ln(2)/20. Çözüm t = 0 için 100, t = 20 için 60 ve t = 40 için 40 °C verir. Türevi −k(T − 20) olduğundan denklem de sağlanır.','With Tₘ = 20, Tᵢ = 100 and T(20) = 60, the difference drops from 80 to 40. Thus k = ln(2)/20. The solution gives 100, 60 and 40 °C at t = 0, 20 and 40. Its derivative is −k(T − 20), verifying the equation.')}</p></details>
 <p class="muted" style="margin-top:24px">Wei-Chau Xie · §3.1 · ${t('s. 87–90','pp. 87–90')}</p>
 ${button(state.read?t('Okundu · Sorulara geç','Read · Go to quiz'):t('Okumayı tamamla','Finish reading'),'read',true)}`;
}
function quiz(){
 const q=questions[questionIndex];
 return `<p class="eyebrow">${t('KAVRAM KONTROLÜ','CONCEPT CHECK')} · ${questionIndex+1} / ${questions.length}</p><h1>${pair(q.topic)}</h1><p>${pair(q.prompt)}</p>
 <div class="options" role="group" aria-label="${t('Yanıt seçenekleri','Answer choices')}">${q.choices.map((c,i)=>`<button data-choice="${i}" aria-pressed="false">${c}</button>`).join('')}</div>
 <div id="feedback" role="status"></div><div class="actions">${button(t('İpucu','Hint'),'hint')}${button(t('Sonraki soru','Next question'),'next-question')}</div>
 <p id="hint" class="feedback" hidden>${pair(q.hint)}</p>`;
}
function timer(){
 return `<p class="eyebrow">25 / 5</p><h1>${label('timer')}</h1><p class="timer-label" id="timer-mode"></p>
 <div class="clock" id="clock" role="timer" aria-live="off"></div><progress id="timer-progress" max="1" value="0" aria-label="${t('Geçen süre','Elapsed time')}"></progress>
 <div class="actions timer-actions">${button('', 'timer-toggle',true)}${button(t('Sıfırla','Reset'),'timer-reset')}</div>
 <p id="timer-status" role="status"></p><p class="muted">${t('25 dakika çalışma, ardından 5 dakika mola. Mola hazır olduğunda başlar.','25 minutes of study followed by a 5-minute break. Start the break when you are ready.')}</p>`;
}
function progress(){
 const answered=questions.filter(q=>Object.hasOwn(state.answers,q.id));
 return `<p class="eyebrow">${t('KENDİ TEMPOSUNDA','AT YOUR OWN PACE')}</p><h1>${t('Tekrar haritan','Your review map')}</h1><p>${answered.length?t('Her çubuk bu prototipteki son yanıtını gösterir. Tek soru, konu hâkimiyetini ölçmek için yeterli değildir.','Each bar shows your latest answer in this prototype. One question is not enough to measure mastery.'):t('Soruları çözdükçe tekrar haritan burada oluşacak.','Your review map will appear as you answer questions.')}</p>
 ${questions.map(q=>{const known=Object.hasOwn(state.answers,q.id);return `<section>${progressRow(pair(q.topic),state.answers[q.id]===true?1:0,1,true)}<p class="muted">${!known?t('Henüz yanıtlanmadı','Not answered yet'):state.answers[q.id]?t('Son yanıt doğru','Latest answer correct'):t('Tekrar önerilir','Review suggested')}</p></section>`;}).join('')}
 ${button(t('Sorularla çalış','Practice questions'),'quiz',true)}`;
}
function flashcards(){
 const card=cards[cardIndex];
 return `<p class="eyebrow">${t('HATIRLAMA','RECALL')} · ${cardIndex+1} / ${cards.length}</p><h1>${label('cards')}</h1>
 <button class="flash" data-action="flip" aria-pressed="${revealed}" aria-label="${t('Kart yanıtını aç veya gizle','Show or hide card answer')}"><small>${revealed?t('YANIT','ANSWER'):t('SORU','QUESTION')}</small><strong>${pair(revealed?card.a:card.q)}</strong></button>
 <div class="actions">${button(revealed?t('Soruyu göster','Show question'):t('Yanıtı göster','Show answer'),'flip')}${button(t('Sonraki kart','Next card'),'next-card')}</div>`;
}
function settings(){
 return `<h1>${label('settings')}</h1>
 <label class="field">${t('Görünüm','Appearance')}<select data-setting="theme">${[['auto',t('Otomatik','Automatic')],['light',t('Açık','Light')],['dark',t('Koyu','Dark')]].map(([v,l])=>`<option value="${v}" ${state.theme===v?'selected':''}>${l}</option>`).join('')}</select></label>
 <label class="field">${t('Yazı boyutu','Font size')}<select data-setting="fontSize">${[17,18,20,22].map(v=>`<option value="${v}" ${state.fontSize===v?'selected':''}>${v} px</option>`).join('')}</select></label>
 ${[['focus',label('focus')],['sound',t('Zamanlayıcı bitiş sesi','Timer completion sound')],['quiet',t('Bildirimleri azalt','Reduce notifications')]].map(([k,l])=>`<label class="check"><input type="checkbox" data-setting="${k}" ${state[k]?'checked':''}>${l}</label>`).join('')}
 <p class="muted">${t('Bildirim azaltma açıkken zamanlayıcı yalnız kendi ekranında haber verir. Kapalıyken sekme başlığı da süre bittiğinde güncellenir.','With reduced notifications, the timer reports completion only on its own screen. When disabled, the tab title also updates on completion.')}</p>`;
}
const screens={home,lesson,quiz,timer,progress,cards:flashcards,settings};
function typeset(){
 if(!window.katex)return;
 main.querySelectorAll('[data-tex]').forEach(el=>{
  try {window.katex.render(el.dataset.tex,el,{displayMode:true,throwOnError:true,trust:false});}
  catch {/* Readable Unicode fallback stays visible. */}
 });
}
function render(){
 route=routes.includes(location.hash.slice(1))?location.hash.slice(1):'home';
 document.title=t('Isınma ve soğuma','Heating and cooling')+' · '+label(route);
 main.innerHTML=screens[route]()+rationale();
 main.classList.remove('enter');requestAnimationFrame(()=>main.classList.add('enter'));
 document.querySelector('#modules').innerHTML=`<nav aria-label="${label('modules')}">${routes.map(r=>`<a href="#${r}" ${r===route?'aria-current="page"':''}>${label(r)}</a>`).join('')}</nav>`;
 document.querySelector('#modules-toggle').textContent=label('modules');
 document.querySelector('#focus-toggle').textContent=label('focus');
 document.querySelector('#exit-focus').textContent=label('exit');
 document.querySelector('#language').textContent=state.language==='tr'?'EN':'TR';
 typeset();updateTimer();readingProgress();
}
function navigate(target){if(location.hash==='#'+target)render();else location.hash=target;}
function readingProgress(){
 const span=document.querySelector('#reading-progress');
 const rect=main.getBoundingClientRect();
 const travel=Math.max(1,main.offsetHeight-innerHeight);
 span.style.width=route==='lesson'?Math.min(100,Math.max(0,-rect.top/travel*100))+'%':'0%';
}
function updateTimer(){
 if(deadline!==null){
  remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));
  if(remaining===0){deadline=null;finished=true;if(!state.quiet)document.title=t('Süre tamamlandı','Time complete');if(state.sound)chime();}
 }
 if(route!=='timer')return;
 document.querySelector('#clock').textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');
 document.querySelector('#timer-mode').textContent=timerMode==='work'?t('Çalışma','Study'):t('Mola','Break');
 document.querySelector('[data-action="timer-toggle"]').textContent=finished?(timerMode==='work'?t('5 dakikalık molayı başlat','Start 5-minute break'):t('25 dakika çalışmaya başla','Start 25-minute study')):deadline!==null?t('Duraklat','Pause'):t('Başlat','Start');
 document.querySelector('#timer-progress').value=1-remaining/(timerMode==='work'?1500:300);
 const status=document.querySelector('#timer-status');
 const message=finished?t('Süre tamamlandı. Hazır olduğunda devam et.','Time complete. Continue when you are ready.'):'';
 if(status.textContent!==message)status.textContent=message;
}
function prepareAudio(){
 if(!state.sound)return;
 try {audioContext??=new (window.AudioContext||window.webkitAudioContext)();audioContext.resume().catch(()=>{});}catch {}
}
function chime(){
 if(!audioContext)return;
 const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(),now=audioContext.currentTime;
 oscillator.frequency.value=440;gain.gain.setValueAtTime(0,now);
 gain.gain.linearRampToValueAtTime(.035,now+.04);gain.gain.exponentialRampToValueAtTime(.001,now+.7);
 oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start();oscillator.stop(now+.75);
 oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
}
main.addEventListener('click',event=>{
 const choice=event.target.closest('[data-choice]');
 if(choice){
  const q=questions[questionIndex];const selection=Number(choice.dataset.choice);
  state.answers[q.id]=selection===q.answer;save();
  main.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===choice)));
  const feedback=document.querySelector('#feedback');
  feedback.className='feedback '+(state.answers[q.id]?'correct':'wrong');
  feedback.textContent=(state.answers[q.id]?t('Doğru. ','Correct. '):t('Tekrar düşün. ','Think again. '))+pair(q.why);return;
 }
 const action=event.target.closest('[data-action]')?.dataset.action;
 switch(action){
  case 'continue':navigate(state.read?'quiz':'lesson');break;
  case 'read':state.read=true;save();navigate('quiz');break;
  case 'quiz':navigate('quiz');break;
  case 'hint':document.querySelector('#hint').hidden=false;break;
  case 'next-question':questionIndex=(questionIndex+1)%questions.length;render();main.focus();break;
  case 'next-card':cardIndex=(cardIndex+1)%cards.length;revealed=false;render();main.focus();break;
  case 'flip':revealed=!revealed;render();main.querySelector('.flash').classList.add('changed');main.querySelector('.flash').focus();break;
  case 'timer-reset':deadline=null;remaining=timerMode==='work'?1500:300;finished=false;updateTimer();break;
  case 'timer-toggle':
   prepareAudio();
   if(finished){timerMode=timerMode==='work'?'break':'work';remaining=timerMode==='work'?1500:300;finished=false;}
   if(deadline!==null){updateTimer();deadline=null;}else deadline=Date.now()+remaining*1000;
   updateTimer();break;
 }
});
main.addEventListener('change',event=>{
 const setting=event.target.dataset.setting;if(!setting)return;
 state[setting]=event.target.type==='checkbox'?event.target.checked:setting==='fontSize'?Number(event.target.value):event.target.value;
 if(setting==='sound')prepareAudio();
 save();appearance();
 if(setting==="focus"&&state.focus)document.querySelector("#exit-focus").focus();
});
function toggleFocus(){state.focus=!state.focus;appearance();save();if(state.focus)document.querySelector('#exit-focus').focus();else document.querySelector('#focus-toggle').focus();}
document.querySelector('#focus-toggle').onclick=toggleFocus;
document.querySelector('#exit-focus').onclick=toggleFocus;
document.querySelector('#modules-toggle').onclick=()=>{
 const modules=document.querySelector('#modules');modules.hidden=!modules.hidden;
 document.querySelector('#modules-toggle').setAttribute('aria-expanded',String(!modules.hidden));
};
document.querySelector('#language').onclick=()=>{state.language=state.language==='tr'?'en':'tr';save();appearance();render();};
window.addEventListener('hashchange',()=>{render();main.focus();window.scrollTo(0,0);});
window.addEventListener('scroll',readingProgress,{passive:true});
window.addEventListener('resize',readingProgress);
window.addEventListener('load',typeset);
document.addEventListener('visibilitychange',updateTimer);
media.addEventListener('change',appearance);
const ticker=setInterval(updateTimer,250);
window.addEventListener('pagehide',()=>{clearInterval(ticker);audioContext?.close();});
window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
appearance();render();
