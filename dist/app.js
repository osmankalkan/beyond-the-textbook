import {marked} from './vendor/marked.js';
import {cooling, calibrateK, halfLife, targetTime, eulerCooling, building, buildingSteady, buildingTransient, buildingMetrics} from './models.js';
import {BOOKS, LEGACY_LESSON_ID, getBook, getLesson, findLessonBySection, migrateProgressStore, migrateNotesStore, countLessonProgress} from './content.js';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fmt=(n,d=1)=>Number(n).toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d});
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let storageOK=true;
function readStore(key,fallback){try{return JSON.parse(localStorage.getItem('denklem-v1-'+key))??fallback;}catch{storageOK=false;return fallback;}}
function saveStore(key,value){try{localStorage.setItem('denklem-v1-'+key,JSON.stringify(value));return true;}catch{storageOK=false;return false;}}

let progressByLesson=migrateProgressStore(readStore('progress',null));
let notesByLesson=migrateNotesStore(readStore('notes',null));
saveStore('progress',progressByLesson);
saveStore('notes',notesByLesson);

const savedActiveId=readStore('active-lesson',LEGACY_LESSON_ID);
let {book:currentBook,lesson:currentLesson}=getLesson(savedActiveId);

function currentProgress(){
  if(!progressByLesson[currentLesson.id])progressByLesson[currentLesson.id]={lesson:false,solved:[]};
  return progressByLesson[currentLesson.id];
}

let mode='cooling',view='lab',studyMode='guided',time=20,playing=false,frame=0,lastStamp=0,showEuler=false,showSteady=true,compareEnabled=false;
let cp={ambient:20,initial:100,k:Math.log(2)/20,h:5};
let cpB={ambient:20,initial:100,k:Math.log(2)/10,h:5};
let bp={tau:4,ratio:1,period:24,amplitude:12,setpoint:22};
let bpB={tau:4,ratio:Math.sqrt(16-(Math.PI/3)**2)-1,period:24,amplitude:12,setpoint:22};
let stepIndex=0,showAllSteps=false,predScenarioIndex=0;
let lastCalibratedK=Math.log(2)/20;
let lastRequiredRatio=Math.sqrt(16-(Math.PI/3)**2)-1;

const maxTime=()=>mode==='cooling'?120:72;
const unit=()=>mode==='cooling'?'dk':'sa';
const toast=message=>{clearTimeout(toast.timer);$('#toast').textContent=message;$('#toast').hidden=false;toast.timer=setTimeout(()=>$('#toast').hidden=true,4000);};
const icons={cup:`<svg viewBox="0 0 170 105" aria-hidden="true"><path d="M65 8q-7 8 0 15t0 15M83 2q-7 8 0 15t0 15M101 8q-7 8 0 15t0 15" fill="none" stroke="#c2cbb9" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="83" cy="89" rx="43" ry="5" fill="#e9ede1"/><path d="M112 49h10q15 0 11 14t-21 12" fill="none" stroke="#a8b998" stroke-width="4"/><path d="M49 45h65v25q0 17-21 17H70q-21 0-21-17Z" fill="#e0e9d8" stroke="#a8b998" stroke-width="1.4"/><ellipse cx="81.5" cy="45" rx="32.5" ry="6" fill="#f1e9db" stroke="#a8b998" stroke-width="1.3"/><ellipse cx="82" cy="45" rx="27" ry="3.5" fill="#a99878" opacity=".5"/><text id="physical-value" x="82" y="69" fill="#637e51" text-anchor="middle" font-size="11" font-family="Georgia">60 °C</text></svg>`,house:`<svg viewBox="0 0 170 105" aria-hidden="true"><ellipse cx="85" cy="92" rx="53" ry="4" fill="#e9ede1"/><path d="M40 48L85 13l45 35M50 42v47h70V42" fill="#e8eedf" stroke="#9eaf8c" stroke-width="2" stroke-linejoin="round"/><path d="M106 26V14h9v20" fill="#d4dfc5" stroke="#9eaf8c" stroke-width="1.5"/><rect x="61" y="50" width="17" height="17" rx="2" fill="#f3e4bd" stroke="#b7bd96"/><rect x="94" y="50" width="15" height="17" rx="2" fill="#f3e4bd" stroke="#b7bd96"/><text id="physical-value" x="85" y="83" fill="#637e51" text-anchor="middle" font-size="11" font-family="Georgia">22 °C</text></svg>`};
function control(id,label,min,max,step,value,suffix,digits=0,group='a'){
  const prefix=group==='b'?'bparam-':'param-';
  const outPrefix=group==='b'?'boutput-':'output-';
  const attr=group==='b'?'data-bparam':'data-param';
  return `<div class="control" id="control-${group}-${id}"><label for="${prefix}${id}">${label}<output id="${outPrefix}${id}" for="${prefix}${id}">${fmt(value,digits)} <small>${suffix}</small></output></label><input type="range" id="${prefix}${id}" ${attr}="${id}" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}"><div class="range-ends"><span>${fmt(min,digits)} ${suffix}</span><span>${fmt(max,digits)} ${suffix}</span></div></div>`;
}
const math=(inside)=>`<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>${inside}</mrow></math>`;

function coverMarkup(book){
  const [l1='',l2='',l3='']=book.coverLines||[];
  return `${escape(l1)}<br>${escape(l2)}<br><small>${escape(l3)}</small><span>${escape(book.coverSymbol||'∫')}</span>`;
}

function getPredictionScenarios(){
  const raw=currentLesson.guidedTools?.prediction?.[mode];
  if(!raw)return [];
  return Array.isArray(raw)?raw:[raw];
}

function renderExamClinicSection(){
  const blueprint=currentLesson.guidedTools?.examBlueprint||[];
  const clinic=currentLesson.guidedTools?.examClinic||[];
  const bpHtml=blueprint.map(item=>`<div class="blueprint-card"><strong>${escape(item.step)}</strong><p>${escape(item.detail)}</p></div>`).join('');
  const clinicHtml=clinic.map((c,idx)=>`<article class="clinic-card">
    <span class="clinic-badge">${escape(c.badge)}</span>
    <h4>${escape(c.title)}</h4>
    <p class="clinic-statement">${escape(c.statement)}</p>
    <div class="clinic-trap"><strong>⚠ Sınav Tuzağı:</strong> ${escape(c.trap)}</div>
    <details class="clinic-steps" ${idx===0?'open':''}>
      <summary>Adım adım tam çözümü incele (${c.steps.length} adım)</summary>
      <div class="clinic-step-list">${c.steps.map(st=>`<div class="clinic-step">
        <strong>${escape(st.label)}</strong>
        ${math(st.math)}
        <p>${escape(st.text)}</p>
      </div>`).join('')}</div>
    </details>
  </article>`).join('');
  $('#exam-blueprint').innerHTML=bpHtml;
  $('#exam-clinic-list').innerHTML=clinicHtml;
  $('#practice-clinic-mirror').innerHTML=`<section class="panel exam-clinic-panel">
    <div class="exam-clinic-header"><div><p class="eyebrow">VİZE &amp; FİNAL STRATEJİSİ VE ÇÖZÜMLÜ KİTAP PROBLEMLERİ (s.130)</p><h3>Sorulara geçmeden önce çözüm şablonunu ve kritik tuzakları incele</h3></div></div>
    <div class="exam-blueprint">${bpHtml}</div>
    <div class="exam-clinic-list">${clinicHtml}</div>
  </section>`;
}

let loadedLessonId=null;
function applyActiveContext(){
  document.title=`Beyond the Textbook · ${currentLesson.title}`;
  $('#sidebar-cover').innerHTML=coverMarkup(currentBook);
  $('#sidebar-book-name').innerHTML=escape(currentBook.title).replace(' for ','<br>for ');
  $('#sidebar-book-meta').textContent=`${currentBook.author} · ${currentBook.year}`;
  $('#nav-library-count').textContent=String(BOOKS.length);
  $('#nav-lesson-section').textContent=currentLesson.section;
  $('#nav-practice-count').textContent=String(currentLesson.questions.length);
  $('#study-pill-practice-count').textContent=`${currentLesson.questions.length} soru + çözümlü klinik →`;
  $('#nav-map-count').textContent=String(currentBook.chapters.length);
  $('#sidebar-source-line').textContent=`§${currentLesson.section} · Basılı sayfa ${currentLesson.pages}`;
  $('#breadcrumb-book').textContent=currentBook.shortTitle;
  $('#breadcrumb-chapter').textContent=`${currentLesson.chapterNumber} · §${currentLesson.section}`;
  $('#heading-chapter-pill').textContent=`BÖLÜM ${currentLesson.chapterNumber}`;
  $('#heading-chapter-title').textContent=currentLesson.chapterTitle.toLocaleUpperCase('tr-TR');
  $('#heading-lesson-title').innerHTML=`${escape(currentLesson.title)}<span>.</span>`;
  $('#heading-lesson-subtitle').textContent=currentLesson.subtitle;
  $('#heading-download').href=currentLesson.lessonPath;
  $('#heading-download').setAttribute('download',currentLesson.downloadName);
  $('#lesson-highlights').innerHTML=currentLesson.highlights.map(h=>`<p>${escape(h)}</p>`).join('');
  $('#lesson-source-note').innerHTML=`KAYNAK<br><strong>§${escape(currentLesson.section)} · s.${escape(currentLesson.pages)}</strong><br>PDF sayfaları ${escape(currentLesson.pdfPages)}`;
  $('#practice-disclaimer').textContent=`Bu ${currentLesson.questions.length} soru ve çözümlü sınav kliniği kitabın §${currentLesson.section} bölümü ve Bölüm 3 sonu problemleri (s.130) temelinde hazırlanmıştır.`;
  $('#notes-label').textContent=`§${currentLesson.section} · ${currentLesson.title.toLocaleUpperCase('tr-TR')} · ÇALIŞMA NOTLARIN`;
  $('#notes').placeholder=currentLesson.notesPlaceholder;
  $('#notes').value=notesByLesson[currentLesson.id]??'';
  const readySections=currentBook.lessons.map(l=>'§'+l.section).join(', ');
  $('#map-intro').textContent=`${currentBook.chapters.length} ana bölüm. Bu kitapta ${readySections} ders ve deney olarak hazır; diğer bölümler içerik haritasıdır.`;
  $('#source-book-meta').innerHTML=`<strong>${escape(currentBook.author)} · ${escape(currentBook.title)}</strong><br>${escape(currentBook.publisher)}, ${currentBook.year}. Kullanıcının sağladığı PDF: ${currentBook.pdfPages} sayfa.`;
  $('#source-lesson-summary').textContent=currentLesson.sourceSummary;
  $('#source-model-limits').textContent=currentLesson.modelLimits;
  $('#source-download').href=currentLesson.lessonPath;
  $('#source-download').setAttribute('download',currentLesson.downloadName);
  $('#footer-source').textContent=`Kaynak: ${currentBook.author.split(' ').at(-1)} · §${currentLesson.section} ↗`;
  renderExamClinicSection();
  renderExercises();
  updateProgress();
}

function selectLesson(lessonId,targetView=null){
  const found=getLesson(lessonId);
  const changed=found.lesson.id!==currentLesson.id;
  currentBook=found.book;
  currentLesson=found.lesson;
  saveStore('active-lesson',currentLesson.id);
  if(changed)loadedLessonId=null;
  applyActiveContext();
  if(targetView){
    if(location.hash==='#'+targetView)route();
    else location.hash=targetView;
  }
}

function selectBookForMap(bookId){
  const book=getBook(bookId);
  if(book.id!==currentBook.id&&book.lessons.length){
    currentBook=book;
    currentLesson=book.lessons[0];
    saveStore('active-lesson',currentLesson.id);
    loadedLessonId=null;
    applyActiveContext();
  }
  if(location.hash==='#map')route();
  else location.hash='map';
}

function renderLibrary(){
  $('#library-list').innerHTML=BOOKS.map(book=>{
    const lessonsHtml=book.lessons.map(lesson=>{
      const stats=countLessonProgress(progressByLesson[lesson.id],lesson);
      const isCurrent=lesson.id===currentLesson.id;
      return `<div class="library-lesson-card ${isCurrent?'active-lesson':''}">
        <div class="library-lesson-main">
          <div class="library-lesson-meta"><span class="chapter-pill">BÖLÜM ${escape(lesson.chapterNumber)} · §${escape(lesson.section)}</span><span>Basılı s.${escape(lesson.pages)} · PDF s.${escape(lesson.pdfPages)}</span></div>
          <h4>${escape(lesson.title)}</h4>
          <p>${escape(lesson.subtitle)}</p>
        </div>
        <div class="library-lesson-actions">
          <span class="library-progress-pill" title="Tamamlanan adımlar">İlerleme: ${stats.completed} / ${stats.total}</span>
          <button type="button" class="button secondary" data-open-lesson="${escape(lesson.id)}" data-target-view="lesson">Ders notu</button>
          <button type="button" class="button secondary" data-open-lesson="${escape(lesson.id)}" data-target-view="practice">Sınav hazırlık</button>
          <button type="button" class="button primary" data-open-lesson="${escape(lesson.id)}" data-target-view="lab">Deney laboratuvarı →</button>
        </div>
      </div>`;
    }).join('');
    return `<article class="panel library-book">
      <div class="library-book-header">
        <div class="library-cover" aria-hidden="true">${coverMarkup(book)}</div>
        <div class="library-book-info">
          <p class="eyebrow">KİTAP · ${book.chapters.length} ANA BÖLÜM · ${book.lessons.length} HAZIR DERS</p>
          <h3>${escape(book.title)}</h3>
          <p class="library-book-meta">${escape(book.author)} · ${escape(book.publisher)}, ${book.year}</p>
          <p class="library-book-summary">${escape(book.summary)}</p>
        </div>
        <button type="button" class="button secondary" data-open-book-map="${escape(book.id)}">▦ Kitap haritası (${book.chapters.length})</button>
      </div>
      <div class="library-lessons">${lessonsHtml}</div>
    </article>`;
  }).join('');
}

$('#library-list').addEventListener('click',e=>{
  const lessonBtn=e.target.closest('[data-open-lesson]');
  if(lessonBtn){
    selectLesson(lessonBtn.dataset.openLesson,lessonBtn.dataset.targetView||'lab');
    return;
  }
  const mapBtn=e.target.closest('[data-open-book-map]');
  if(mapBtn){
    selectBookForMap(mapBtn.dataset.openBookMap);
  }
});

function setStudyMode(nextMode){
  studyMode=nextMode==='free'?'free':'guided';
  $$('[data-study-mode]').forEach(btn=>{
    const active=btn.dataset.studyMode===studyMode;
    btn.classList.toggle('selected',active);
    btn.setAttribute('aria-pressed',String(active));
  });
  $('#guided-workbench').hidden=studyMode!=='guided';
  if(studyMode==='free'&&!compareEnabled){
    compareEnabled=true;
    $('#compare-scenarios').checked=true;
    setupMode();
  }
}

$$('[data-study-mode]').forEach(btn=>{
  btn.addEventListener('click',()=>setStudyMode(btn.dataset.studyMode));
});

function renderPredictionScenario(){
  const scenarios=getPredictionScenarios();
  if(!scenarios.length)return;
  predScenarioIndex=Math.max(0,Math.min(predScenarioIndex,scenarios.length-1));
  const current=scenarios[predScenarioIndex];
  $('#prediction-tabs').innerHTML=scenarios.map((sc,idx)=>`<button type="button" class="mini-tab ${idx===predScenarioIndex?'active':''}" data-pred-idx="${idx}">${escape(sc.badge||`Senaryo ${idx+1}`)}</button>`).join('');
  $('#discovery-question').textContent=current.question;
  $('#discovery-intro').textContent=current.prompt;
  $('#prediction-unit').textContent=current.unit||'°C';
  $('#prediction-input').value='';
  $('#prediction-feedback').hidden=true;
}

$('#prediction-tabs').addEventListener('click',e=>{
  const btn=e.target.closest('[data-pred-idx]');
  if(!btn)return;
  predScenarioIndex=Number(btn.dataset.predIdx);
  renderPredictionScenario();
});

function renderStepper(){
  const steps=currentLesson.guidedTools?.stepByStep?.[mode]||[];
  if(!steps.length)return;
  stepIndex=Math.max(0,Math.min(stepIndex,steps.length-1));
  const visibleSteps=showAllSteps?steps:steps.slice(0,stepIndex+1);
  $('#step-counter').textContent=`${visibleSteps.length} / ${steps.length}`;
  $('#step-prev').disabled=showAllSteps||stepIndex===0;
  $('#step-next').disabled=showAllSteps||stepIndex>=steps.length-1;
  $('#step-show-all').textContent=showAllSteps?'Adım adım daralt':'Tümünü aç';
  $('#stepper-list').innerHTML=visibleSteps.map((st,idx)=>`<div class="step-item ${idx===visibleSteps.length-1&&!showAllSteps?'current':''}">
    <h4>${escape(st.title)}</h4>
    ${st.why?`<div class="step-why">↳ ${escape(st.why)}</div>`:''}
    ${math(st.formula)}
    <p>${escape(st.note)}</p>
  </div>`).join('');
}

$('#step-prev').addEventListener('click',()=>{if(stepIndex>0){stepIndex--;renderStepper();}});
$('#step-next').addEventListener('click',()=>{
  const steps=currentLesson.guidedTools?.stepByStep?.[mode]||[];
  if(stepIndex<steps.length-1){stepIndex++;renderStepper();}
});
$('#step-show-all').addEventListener('click',()=>{showAllSteps=!showAllSteps;renderStepper();});

function updateCalibrationCalculator(){
  const initial=Number($('#cal-initial').value);
  const ambient=Number($('#cal-ambient').value);
  const t1=Number($('#cal-time').value);
  const observed=Number($('#cal-observed').value);
  const target=Number($('#cal-target').value);
  const box=$('#cal-result');
  try{
    const k=calibrateK(initial,ambient,observed,t1);
    lastCalibratedK=k;
    const hl=halfLife(k);
    const tau=1/k;
    const total=targetTime(target,{initial,ambient,k});
    box.classList.remove('error');
    const ratio=(observed-ambient)/(initial-ambient);
    const timeText=total===null
      ?`Hedef <strong>${fmt(target,1)} °C</strong> sıcaklığına bu başlangıç ve ortam değerleriyle sonlu sürede ulaşılamaz.`
      :`Hedef <strong>${fmt(target,1)} °C</strong> (fark ${fmt(target-ambient,1)} °C) için başlangıçtan <strong>toplam süre: ${fmt(total,2)} dk</strong> · Gözlem anından (${fmt(t1,1)} dk) sonra <strong>kalan ek süre: ${fmt(total-t1,2)} dk</strong>.`;
    box.innerHTML=`Fark oranı: <strong>(T₁ − Tₘ)/(Tᵢ − Tₘ) = ${fmt(observed-ambient,1)} / ${fmt(initial-ambient,1)} = ${fmt(ratio,4)}</strong><br>Tepki katsayısı: <strong>k = −ln(${fmt(ratio,3)}) / ${fmt(t1,1)} = ${fmt(k,5)} dk⁻¹</strong> · Zaman sabiti: <strong>τ = 1/k = ${fmt(tau,1)} dk</strong> · Yarılanma süresi: <strong>t½ = ${fmt(hl,1)} dk</strong>.<br>${timeText}`;
    $('#cal-apply').disabled=false;
  }catch{
    box.classList.add('error');
    box.textContent='Gözlenen sıcaklık T(t₁), başlangıç sıcaklığı Tᵢ ile ortam sıcaklığı Tₘ arasında olmalı ve gözlem zamanı t₁ > 0 seçilmelidir.';
    $('#cal-apply').disabled=true;
  }
}

['cal-initial','cal-ambient','cal-time','cal-observed','cal-target'].forEach(id=>{
  $('#'+id).addEventListener('input',updateCalibrationCalculator);
});

$('#cal-apply').addEventListener('click',()=>{
  const initial=Number($('#cal-initial').value);
  const ambient=Number($('#cal-ambient').value);
  const t1=Number($('#cal-time').value);
  cp={...cp,initial:Math.min(120,Math.max(10,initial)),ambient:Math.min(40,Math.max(0,ambient)),k:Math.min(0.12,Math.max(0.005,lastCalibratedK))};
  time=Math.min(maxTime(),Math.max(0,t1));
  if(mode!=='cooling')mode='cooling';
  setupMode();
  toast(`Kalibre edilen k = ${fmt(lastCalibratedK,4)} dk⁻¹ deneye uygulandı.`);
});

$('#cal-reset').addEventListener('click',()=>{
  $('#cal-initial').value='100';
  $('#cal-ambient').value='20';
  $('#cal-time').value='20';
  $('#cal-observed').value='60';
  $('#cal-target').value='30';
  updateCalibrationCalculator();
});

function updateBuildingCalculator(){
  const T1=Number($('#bcal-amp').value);
  const tau=Number($('#bcal-tau').value);
  const period=Number($('#bcal-period').value);
  const targetA=Number($('#bcal-target').value);
  const box=$('#bcal-result');
  if(!(T1>0&&tau>0&&period>0&&targetA>0)){
    box.classList.add('error');
    box.textContent='Tüm tasarım parametreleri pozitif olmalıdır.';
    $('#bcal-apply').disabled=true;
    return;
  }
  const omega=2*Math.PI/period;
  const minPossibleForZeroR=T1/Math.hypot(1,tau*omega);
  const ratioSq=(T1/targetA)**2-(tau*omega)**2;
  box.classList.remove('error');
  if(targetA>=minPossibleForZeroR){
    lastRequiredRatio=0;
    box.innerHTML=`Isıl atalet (τω = ${fmt(tau*omega,3)}) tek başına yeterli: <strong>r = 0</strong> iken bile kalıcı genlik <strong>${fmt(minPossibleForZeroR,2)} °C ≤ ${fmt(targetA,2)} °C</strong> kalır.`;
    $('#bcal-apply').disabled=false;
    return;
  }
  const reqR=Math.sqrt(Math.max(0,ratioSq))-1;
  lastRequiredRatio=Math.max(0,reqR);
  const m=buildingMetrics({tau,ratio:lastRequiredRatio,period,amplitude:T1});
  box.innerHTML=`Boyutsuz frekans: <strong>τω = ${fmt(tau*omega,3)} rad</strong> · Eşitsizlik: <strong>(1+r)² ≥ (${fmt(T1,1)}/${fmt(targetA,2)})² − (${fmt(tau*omega,3)})² = ${fmt(ratioSq,3)}</strong><br>Gereken en küçük oran: <strong>r = K₂/K₁ ≥ ${fmt(lastRequiredRatio,4)}</strong> · Bu sınırda kalıcı faz gecikmesi: <strong>φ/ω = ${fmt(m.lag,2)} saat</strong>.`;
  $('#bcal-apply').disabled=false;
}

['bcal-amp','bcal-tau','bcal-period','bcal-target'].forEach(id=>{
  $('#'+id).addEventListener('input',updateBuildingCalculator);
});

$('#bcal-apply').addEventListener('click',()=>{
  const T1=Number($('#bcal-amp').value);
  const tau=Number($('#bcal-tau').value);
  const period=Number($('#bcal-period').value);
  bp={...bp,amplitude:Math.min(20,Math.max(1,T1)),tau:Math.min(12,Math.max(1,tau)),period:Math.min(48,Math.max(6,period)),ratio:Math.min(5,Math.max(0,lastRequiredRatio))};
  if(mode!=='building')mode='building';
  setupMode();
  toast(`Hesaplanan geri besleme oranı r = ${fmt(bp.ratio,2)} deneye uygulandı.`);
});

$('#prediction-form').addEventListener('submit',e=>{
  e.preventDefault();
  const scenarios=getPredictionScenarios();
  const predConfig=scenarios[predScenarioIndex];
  if(!predConfig)return;
  const raw=$('#prediction-input').value.trim().replace(',','.');
  const val=Number(raw);
  const fb=$('#prediction-feedback');
  if(!Number.isFinite(val)){
    fb.hidden=false;fb.classList.add('wrong');
    fb.textContent='Lütfen geçerli bir sayısal tahmin gir.';
    return;
  }
  const diff=Math.abs(val-predConfig.expected);
  const closeEnough=diff<=predConfig.tolerance;
  if(mode==='cooling'){
    cpB={...cp};
    cp={...cp,...predConfig.applyPreset};
    if(predConfig.applyPreset.showEuler!==undefined){
      showEuler=!!predConfig.applyPreset.showEuler;
      $('#show-euler').checked=showEuler;
    }
    time=predConfig.applyPreset.time??time;
  }else{
    bpB={...bp};
    bp={...bp,...predConfig.applyPreset};
    time=predConfig.applyPreset.time??time;
  }
  compareEnabled=true;
  $('#compare-scenarios').checked=true;
  const savedFeedbackText=(closeEnough?`✓ Tahminin (${fmt(val,1)} ${predConfig.unit}) doğru! `:`Tahminin: ${fmt(val,1)} ${predConfig.unit} · Model sonucu: ${fmt(predConfig.expected,2)} ${predConfig.unit}. `)+predConfig.explanation+' (Grafikte önceki durum Senaryo B, yeni durum Senaryo A olarak açıldı.)';
  setupMode();
  fb.hidden=false;
  fb.classList.toggle('wrong',!closeEnough);
  fb.textContent=savedFeedbackText;
});

function setupMode(){
  stop();$('#physical-illustration').innerHTML=icons[mode==='cooling'?'cup':'house'];
  $$('[data-mode]').forEach(b=>{b.classList.toggle('selected',b.dataset.mode===mode);b.setAttribute('aria-pressed',b.dataset.mode===mode);});
  $('#time').max=maxTime();$('#time').step=0.5;time=Math.min(time,maxTime());
  $('#lab-source').textContent=mode==='cooling'?'Örnek 3.1 · s.87–88':'Örnek 3.2 · s.88–90';
  $('#controls').innerHTML=mode==='cooling'?[
    control('initial','Başlangıç sıcaklığı (A)',10,120,1,cp.initial,'°C'),control('ambient','Ortam sıcaklığı (A)',0,40,1,cp.ambient,'°C'),
    control('k','Tepki katsayısı · k (A)',0.005,0.12,0.0001,cp.k,'dk⁻¹',4),control('h','Euler adımı · h',0.5,10,0.5,cp.h,'dk',1)
  ].join(''):[control('ratio','Geri besleme · K₂/K₁ (A)',0,5,0.01,bp.ratio,'',2),control('tau','Isıl zaman · c/K₁ (A)',1,12,0.5,bp.tau,'sa',1),control('amplitude','Dış sıcaklık genliği (A)',1,20,0.5,bp.amplitude,'°C',1),control('period','Dış sıcaklık periyodu (A)',6,48,1,bp.period,'sa')].join('');
  $('#compare-controls').hidden=!compareEnabled;
  $('#compare-controls').innerHTML=mode==='cooling'
    ?`<div class="compare-controls-header"><span>SENARYO B · KARŞILAŞTIRMA</span></div>`+[
      control('initial','Başlangıç sıcaklığı (B)',10,120,1,cpB.initial,'°C',0,'b'),
      control('ambient','Ortam sıcaklığı (B)',0,40,1,cpB.ambient,'°C',0,'b'),
      control('k','Tepki katsayısı · k (B)',0.005,0.12,0.0001,cpB.k,'dk⁻¹',4,'b')
    ].join('')
    :`<div class="compare-controls-header"><span>SENARYO B · KARŞILAŞTIRMA</span></div>`+[
      control('ratio','Geri besleme · K₂/K₁ (B)',0,5,0.01,bpB.ratio,'',2,'b'),
      control('tau','Isıl zaman · c/K₁ (B)',1,12,0.5,bpB.tau,'sa',1,'b'),
      control('amplitude','Dış sıcaklık genliği (B)',1,20,0.5,bpB.amplitude,'°C',1,'b')
    ].join('');
  if(mode==='cooling')$('#control-a-h').hidden=!showEuler;
  $('#euler-option').hidden=mode!=='cooling';
  $('#steady-option').hidden=mode!=='building';
  $('#preset').textContent=mode==='cooling'?'↺ Kitaptaki örneği yükle (Örnek 3.1)':'↺ Kitaptaki sınır koşulunu yükle (Örnek 3.2)';
  $('#plot-kicker').textContent=mode==='cooling'?"NEWTON'UN SOĞUMA YASASI":'ENERJİ DENGESİ, GEÇİCİ VE KALICI REJİM';
  $('#plot-title').textContent=mode==='cooling'?'Sıcaklığın zamana yolculuğu':'Bir binanın ısıl tepkisi (Tam çözüm vs Kalıcı rejim)';
  const compareLegend=compareEnabled?'<span class="compare-b"><i></i> Senaryo B</span>':'';
  const steadyLegend=mode==='building'&&showSteady?'<span class="steady-curve"><i></i> Saf kalıcı rejim (steady-state)</span>':'';
  $('#legend').innerHTML=mode==='cooling'
    ?`<span><i></i> Senaryo A (Tam çözüm)</span>${compareLegend}<span class="ambient"><i></i> Ortam Tₘ</span><span class="euler" id="euler-legend"><i></i> Euler yaklaşımı</span>`
    :`<span><i></i> Senaryo A (Geçici + Kalıcı)</span>${steadyLegend}${compareLegend}<span class="euler"><i></i> Dış sıcaklık T_A(t)</span><span class="ambient"><i></i> Hedef T_S: 22 °C</span>`;
  if(mode==='cooling')$('#euler-legend').hidden=!showEuler;
  $('#equation').innerHTML=mode==='cooling'?math('<mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mi>k</mi><mo>(</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo>'):math('<mi>τ</mi><mfrac><mrow><mi>d</mi><mi>θ</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo><mi>θ</mi><mo>=</mo><msub><mi>T</mi><mn>1</mn></msub><mi>sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo>');
  $('#equation-explanation').textContent=mode==='cooling'?'Değişim hızı, cisim ile ortam arasındaki anlık sıcaklık farkıyla (θ = T − Tₘ) doğru orantılıdır.':'θ = T_B − T_S hedeften sapma; r = K₂/K₁ boyutsuz geri besleme kazancı, τ = c/K₁ doğal ısıl zaman sabiti.';
  $('#term-anatomy').innerHTML=mode==='cooling'
    ?`<div class="term-row"><code>θ(t) = T(t) − Tₘ</code><span>Ortamla anlık sıcaklık farkı (üstel azalan asıl büyüklük)</span></div>
      <div class="term-row"><code>τ = 1 / k</code><span>Isıl zaman sabiti (${fmt(1/cp.k,1)} dk): farkın %36,8’e (1/e) indiği süre</span></div>
      <div class="term-row"><code>t½ = ln(2) / k</code><span>Yarılanma süresi (${fmt(halfLife(cp.k),1)} dk): farkın tam yarıya indiği süre</span></div>`
    :`<div class="term-row"><code>τ_eff = τ / (1 + r)</code><span>Etkin sönüm zaman sabiti (${fmt(bp.tau/(1+bp.ratio),2)} sa): geçici rejimin sönümlenme hızı</span></div>
      <div class="term-row"><code>G(ω) = 1 / √((1+r)² + (τω)²)</code><span>Boyutsuz genlik çarpanı (${fmt(1/Math.hypot(1+bp.ratio,bp.tau*2*Math.PI/bp.period),3)}): dış salınımı bastırma oranı</span></div>
      <div class="term-row"><code>Δt_faz = φ / ω</code><span>Faz gecikmesi (${fmt(buildingMetrics(bp).lag,2)} sa): iç sıcaklık tepesinin dış tepeyi izleme gecikmesi</span></div>`;
  renderPredictionScenario();
  $('#discovery-hint').textContent=mode==='cooling'?'Sıcaklık farkı e⁻ᵏᵗ ile değişiyor. k iki katına çıkınca aynı azalma yarı zamanda olur. Denge sıcaklığı Tₘ değişmez.':'Kalıcı genliğin paydasında (1+r)² + (τω)² var. Geri besleme r veya ısıl zaman τ arttıkça iç sıcaklığın salınımı küçülür.';
  $('#discovery-details').open=false;
  $('#calibration-panel').hidden=mode!=='cooling';
  $('#building-design-panel').hidden=mode!=='building';
  $('#lab-footnote').textContent=mode==='cooling'?'Model: sabit ortam, sabit k ve cisim içinde tek sıcaklık (Bi ≪ 1). Hedef süre, başlangıçtan itibaren 30 °C’ye ilk erişimdir; ortam sıcaklığına tam erişim sonlu sürede gerçekleşmez.':'Model: sabit katsayılar ve doğrusal ısıtıcı tepkisi. Dış sıcaklık ortalaması 10 °C, hedef 22 °C; başlangıçta bina hedef sıcaklıktadır. Genlik ve gecikme kartları kalıcı rejimi gösterir; mor noktalı eğri saf kalıcı rejimi, yeşil eğri ise geçici + kalıcı tam çözümü gösterir.';
  updateCalibrationCalculator();
  updateBuildingCalculator();
  renderStepper();
  renderLab();
}

function metric(label,value,suffix,description,symbol){return `<div class="metric"><p class="eyebrow">${label}</p><span class="metric-symbol">${symbol}</span><strong>${value}<small>${suffix}</small></strong><p>${description}</p></div>`;}
function renderLab(){
  $('#time').value=time;$('#time-output').textContent=fmt(time,1)+' '+unit();
  const value=mode==='cooling'?cooling(time,cp):building(time,bp);
  $('#physical-value').textContent=fmt(value,1)+' °C';
  if(mode==='cooling'){
    const target=targetTime(30,cp);
    const diff=value-cp.ambient;
    const rate=-cp.k*diff;
    const remainingFromNow=target===null?null:target-time;
    $('#metrics').innerHTML=metric('ŞU ANKİ SICAKLIK',fmt(value,1),'°C',`t = ${fmt(time,1)} dk · Ortamla fark θ = ${fmt(diff,1)} °C`,'T')+metric('FARKIN YARILANMA SÜRESİ',fmt(halfLife(cp.k),1),'dk',`Zaman sabiti τ = 1/k = ${fmt(1/cp.k,1)} dk`,'½')+metric('30 °C HEDEFİNE TOPLAM SÜRE',target===null?'—':fmt(target,1),target===null?'':'dk',target===null?'Bu başlangıçtan sonlu sürede erişilmez.':(remainingFromNow>0?`Şu andan (${fmt(time,1)} dk) sonra ${fmt(remainingFromNow,1)} dk daha`:`Hedefe t = ${fmt(target,1)} dk anında ulaşıldı`),'↘');
    $('#instant-inspector').innerHTML=`<div class="inspector-cell"><span>SEÇİLİ AN (t = ${fmt(time,1)} dk)</span><strong>T(t) = ${fmt(value,2)} °C</strong><small>Ortamla fark θ(t) = ${fmt(diff,2)} °C</small></div>
      <div class="inspector-cell"><span>ANLIK DEĞİŞİM HIZI (TÜREV)</span><strong>dT/dt = ${fmt(rate,3)} °C/dk</strong><small>Formül: −k·(T − Tₘ)</small></div>
      <div class="inspector-cell"><span>BAŞLANGIÇ FARKININ KALAN ORANI</span><strong>%${fmt(cp.initial===cp.ambient?0:Math.exp(-cp.k*time)*100,1)}</strong><small>e^(−kt) = ${fmt(Math.exp(-cp.k*time),4)}</small></div>
      <div class="inspector-cell"><span>EULER YAKLAŞIMI (h = ${fmt(cp.h,1)} dk)</span><strong>${fmt(eulerCooling(time,cp,cp.h),2)} °C</strong><small>Mutlak hata: ${fmt(Math.abs(eulerCooling(time,cp,cp.h)-value),2)} °C</small></div>`;
    $('#chart-note').textContent=showEuler?`Euler hatası (t = ${fmt(time,1)} dk): ${fmt(Math.abs(eulerCooling(time,cp,cp.h)-value),2)} °C`:'Kesin çözüm · sabit ortam';
    if(compareEnabled){
      const valB=cooling(time,cpB),hlB=halfLife(cpB.k),targetB=targetTime(30,cpB);
      $('#compare-summary').hidden=false;
      $('#compare-summary').innerHTML=`<div class="compare-item"><span>t = ${fmt(time,1)} dk sıcaklığı (A vs B)</span><strong>${fmt(value,1)} °C · ${fmt(valB,1)} °C (Δ = ${fmt(Math.abs(value-valB),1)} °C)</strong></div>
        <div class="compare-item"><span>Yarılanma süresi t½ (A vs B)</span><strong>${fmt(halfLife(cp.k),1)} dk · ${fmt(hlB,1)} dk</strong></div>
        <div class="compare-item"><span>30 °C toplam süre (A vs B)</span><strong>${target===null?'—':fmt(target,1)+' dk'} · ${targetB===null?'—':fmt(targetB,1)+' dk'}</strong></div>`;
    }else $('#compare-summary').hidden=true;
  }else{
    const m=buildingMetrics(bp);
    const steadyVal=buildingSteady(time,bp);
    const transVal=buildingTransient(time,bp);
    const outVal=10+bp.amplitude*Math.sin(2*Math.PI*time/bp.period);
    const rate=(-(1+bp.ratio)*(value-bp.setpoint)+bp.amplitude*Math.sin(2*Math.PI*time/bp.period))/bp.tau;
    $('#metrics').innerHTML=metric('ŞU ANKİ İÇ SICAKLIK (TAM)',fmt(value,2),'°C',`Kalıcı: ${fmt(steadyVal,2)} °C · Geçici: +${fmt(transVal,2)} °C`,'T')+metric('KALICI SALINIM GENLİĞİ',fmt(m.amplitude,2),'°C',`Dış genlik: ${fmt(bp.amplitude,1)} °C · Sınır: 22 ± ${fmt(m.amplitude,2)} °C`,'A')+metric('KALICI REJİMDE GECİKME',fmt(m.lag,2),'sa',`Faz açısı φ = ${fmt(m.phase*180/Math.PI,1)}° · τ_eff = ${fmt(1/m.decay,2)} sa`,'φ');
    $('#instant-inspector').innerHTML=`<div class="inspector-cell"><span>TAM ÇÖZÜM T_B(t = ${fmt(time,1)} sa)</span><strong>${fmt(value,2)} °C</strong><small>Hedeften sapma θ = ${fmt(value-bp.setpoint,2)} °C</small></div>
      <div class="inspector-cell"><span>REJİM AYRIŞIMI (STEADY + TRANSIENT)</span><strong>${fmt(steadyVal,2)} °C + (${fmt(transVal,2)} °C)</strong><small>Geçici terim: A·sin(φ)·e^(−t/τ_eff)</small></div>
      <div class="inspector-cell"><span>DIŞ ORTAM SICAKLIĞI T_A(t)</span><strong>${fmt(outVal,2)} °C</strong><small>Ortalama 10 °C ± ${fmt(bp.amplitude,1)} °C</small></div>
      <div class="inspector-cell"><span>ANLIK ISIL DEĞİŞİM HIZI</span><strong>dT_B/dt = ${fmt(rate,3)} °C/sa</strong><small>Etkin sönüm τ/(1+r) = ${fmt(1/m.decay,2)} sa</small></div>`;
    $('#chart-note').textContent='Yeşil: Geçici + kalıcı tam çözüm · Mor noktalı: Saf kalıcı rejim';
    if(compareEnabled){
      const valB=building(time,bpB),mB=buildingMetrics(bpB);
      $('#compare-summary').hidden=false;
      $('#compare-summary').innerHTML=`<div class="compare-item"><span>t = ${fmt(time,1)} sa iç sıcaklık (A vs B)</span><strong>${fmt(value,1)} °C · ${fmt(valB,1)} °C</strong></div>
        <div class="compare-item"><span>Kalıcı salınım genliği (A vs B)</span><strong>${fmt(m.amplitude,2)} °C · ${fmt(mB.amplitude,2)} °C</strong></div>
        <div class="compare-item"><span>Kalıcı faz gecikmesi (A vs B)</span><strong>${fmt(m.lag,2)} sa · ${fmt(mB.lag,2)} sa</strong></div>`;
    }else $('#compare-summary').hidden=true;
  }
  renderChart();
}
function renderChart(){
  const compact=window.matchMedia('(max-width:680px)').matches;
  const W=compact?420:780,H=320,L=compact?42:53,R=compact?16:22,T=24,B=40,xMax=maxTime(),N=240;
  $('#chart').setAttribute('viewBox',`0 0 ${W} ${H}`);
  const series=Array.from({length:N+1},(_,i)=>{const t=i*xMax/N;return [t,mode==='cooling'?cooling(t,cp):building(t,bp)];});
  const steadySeries=mode==='building'&&showSteady?Array.from({length:N+1},(_,i)=>{const t=i*xMax/N;return [t,buildingSteady(t,bp)];}):[];
  const seriesB=compareEnabled?Array.from({length:N+1},(_,i)=>{const t=i*xMax/N;return [t,mode==='cooling'?cooling(t,cpB):building(t,bpB)];}):[];
  const outside=mode==='building'?series.map(([t])=>[t,10+bp.amplitude*Math.sin(2*Math.PI*t/bp.period)]):[];
  const eulerPoints=[];
  if(mode==='cooling'&&showEuler){for(let t=0;t<xMax+1e-7;t+=cp.h)eulerPoints.push([t,eulerCooling(t,cp,cp.h)]);if(eulerPoints.at(-1)[0]<xMax)eulerPoints.push([xMax,eulerCooling(xMax,cp,cp.h)]);}
  const vals=series.map(v=>v[1]).concat(steadySeries.map(v=>v[1]),seriesB.map(v=>v[1]),outside.map(v=>v[1]),eulerPoints.map(v=>v[1]),mode==='cooling'?[cp.ambient]:[bp.setpoint]);
  const min=Math.min(...vals),max=Math.max(...vals),span=Math.max(10,max-min);
  const low=Math.floor((min-span*.09)/5)*5,high=Math.ceil((max+span*.09)/5)*5;
  const X=t=>L+t/xMax*(W-L-R),Y=v=>T+(high-v)/(high-low)*(H-T-B);
  const path=points=>points.map(([t,v],i)=>(i?'L':'M')+X(t).toFixed(2)+','+Y(v).toFixed(2)).join(' ');
  const mainPath=path(series),baseline=mode==='cooling'?cp.ambient:bp.setpoint;
  let out=`<title id="chart-title">${mode==='cooling'?'Cismin sıcaklığı':'Bina ve dış ortam sıcaklığı'} zamana göre</title><desc id="chart-description">${fmt(time,1)} ${unit()} sonra sıcaklık ${fmt(series[0][1],1)} başlangıç değerinden ${fmt(mode==='cooling'?cooling(time,cp):building(time,bp),1)} santigrat dereceye gelir. Yatay eksen zaman, düşey eksen sıcaklıktır.</desc><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c9b61" stop-opacity=".13"/><stop offset="1" stop-color="#7c9b61" stop-opacity=".01"/></linearGradient><clipPath id="plotclip"><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}"/></clipPath></defs>`;
  out+=`<text x="${L}" y="11" font-size="10" fill="#9fa893" font-family="sans-serif">Sıcaklık (°C)</text>`;
  for(let i=0;i<=4;i++){
    const val=low+(high-low)*i/4,y=Y(val);
    out+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="#edf0e7" stroke-dasharray="3 5"/><text x="${L-13}" y="${y+4}" text-anchor="end" font-size="10" fill="#a6ae9c" font-family="sans-serif">${fmt(val,0)}</text>`;
  }
  for(let i=0;i<=6;i++){
    const t=xMax*i/6,x=X(t);
    out+=`<line x1="${x}" y1="${T}" x2="${x}" y2="${H-B}" stroke="#f2f4ed"/><text x="${x}" y="${H-B+23}" text-anchor="middle" font-size="10" fill="#a6ae9c" font-family="sans-serif">${fmt(t,0)}</text>`;
  }
  out+=`<text x="${W-R}" y="${H-2}" text-anchor="end" font-size="10" fill="#a0aa91" font-family="sans-serif">Zaman (${mode==='cooling'?'dakika':'saat'})</text><g clip-path="url(#plotclip)">`;
  if(mode==='cooling')out+=`<path d="${mainPath} L${X(xMax)},${Y(baseline)} L${X(0)},${Y(baseline)} Z" fill="url(#fill)"/>`;
  out+=`<line x1="${L}" y1="${Y(baseline)}" x2="${W-R}" y2="${Y(baseline)}" stroke="#bdc5ad" stroke-width="1.3" stroke-dasharray="5 5"/>`;
  if(mode==='building')out+=`<path d="${path(outside)}" fill="none" stroke="#d9a17b" stroke-width="1.8" opacity=".85"/>`;
  if(mode==='building'&&steadySeries.length){
    out+=`<path d="${path(steadySeries)}" fill="none" stroke="#8c6bb1" stroke-width="1.8" stroke-dasharray="3 4"/>`;
  }
  if(mode==='cooling'&&showEuler){
    out+=`<path d="${path(eulerPoints)}" fill="none" stroke="#d99064" stroke-width="1.8" stroke-dasharray="5 4"/>`;
  }
  if(compareEnabled&&seriesB.length){
    out+=`<path d="${path(seriesB)}" fill="none" stroke="#4b6cb7" stroke-width="2.2" stroke-dasharray="6 4"/>`;
  }
  out+=`<path d="${mainPath}" fill="none" stroke="#477d55" stroke-width="2.8" stroke-linecap="round"/>`;
  const current=mode==='cooling'?cooling(time,cp):building(time,bp),cx=X(time),cy=Y(current);
  out+=`<line x1="${cx}" y1="${T}" x2="${cx}" y2="${H-B}" stroke="#9bb68a" stroke-width="1" stroke-dasharray="3 4"/><circle cx="${cx}" cy="${cy}" r="9" fill="#4b7d52" opacity=".12"/><circle cx="${cx}" cy="${cy}" r="4.5" fill="#477d55" stroke="white" stroke-width="2"/>`;
  if(compareEnabled){
    const currentB=mode==='cooling'?cooling(time,cpB):building(time,bpB),cyB=Y(currentB);
    out+=`<circle cx="${cx}" cy="${cyB}" r="4" fill="#4b6cb7" stroke="white" stroke-width="1.5"/>`;
  }
  out+=`</g>`;
  const bx=Math.max(L+3,Math.min(cx-37,W-R-79)),by=Math.max(T+2,cy-40);
  out+=`<rect x="${bx}" y="${by}" width="76" height="27" rx="5" fill="#edf3e8" stroke="#dfe9d5"/><text x="${bx+38}" y="${by+18}" text-anchor="middle" font-size="12" fill="#547b46" font-family="sans-serif">${fmt(current,1)} °C</text>`;
  if(mode==='cooling')out+=`<text x="${W-R-5}" y="${Y(baseline)-7}" text-anchor="end" font-size="10" fill="#a1ab91" font-family="sans-serif">Tₘ = ${fmt(baseline,0)} °C</text>`;
  $('#chart').innerHTML=out;
}
function stop(){playing=false;cancelAnimationFrame(frame);$('#play').textContent='▶';$('#play').setAttribute('aria-label','Zamanı oynat');}
function animate(stamp){if(!playing)return;if(lastStamp)time=Math.min(maxTime(),time+(stamp-lastStamp)/1000*(mode==='cooling'?6:3));lastStamp=stamp;renderLab();if(time>=maxTime())stop();else frame=requestAnimationFrame(animate);}
$('#play').addEventListener('click',()=>{if(playing){stop();return;}if(time>=maxTime())time=0;playing=true;lastStamp=0;$('#play').textContent='Ⅱ';$('#play').setAttribute('aria-label','Zamanı durdur');frame=requestAnimationFrame(animate);});
$('#time').addEventListener('input',e=>{stop();time=Number(e.target.value);renderLab();});
$('#controls').addEventListener('input',e=>{
  const id=e.target.dataset.param;if(!id)return;
  (mode==='cooling'?cp:bp)[id]=Number(e.target.value);
  const digits=id==='k'?4: ['tau','amplitude','h'].includes(id)?1:id==='ratio'?2:0;
  const suffix={initial:'°C',ambient:'°C',k:'dk⁻¹',h:'dk',tau:'sa',period:'sa',amplitude:'°C',ratio:''}[id];
  $('#output-'+id).innerHTML=fmt(Number(e.target.value),digits)+` <small>${suffix}</small>`;
  renderLab();
});
$('#compare-controls').addEventListener('input',e=>{
  const id=e.target.dataset.bparam;if(!id)return;
  (mode==='cooling'?cpB:bpB)[id]=Number(e.target.value);
  const digits=id==='k'?4:['tau','amplitude'].includes(id)?1:id==='ratio'?2:0;
  const suffix={initial:'°C',ambient:'°C',k:'dk⁻¹',tau:'sa',period:'sa',amplitude:'°C',ratio:''}[id];
  $('#boutput-'+id).innerHTML=fmt(Number(e.target.value),digits)+` <small>${suffix}</small>`;renderLab();
});
$('#compare-scenarios').addEventListener('change',e=>{
  compareEnabled=e.target.checked;
  setupMode();
});
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;time=mode==='cooling'?20:24;stepIndex=0;predScenarioIndex=0;$('#prediction-feedback').hidden=true;setupMode();}));
$('#show-euler').addEventListener('change',e=>{showEuler=e.target.checked;$('#control-a-h').hidden=!showEuler;$('#euler-legend').hidden=!showEuler;renderLab();});
$('#show-steady').addEventListener('change',e=>{showSteady=e.target.checked;setupMode();});
$('#preset').addEventListener('click',()=>{if(mode==='cooling'){cp={ambient:20,initial:100,k:Math.log(2)/20,h:5};time=20;}else{bp={tau:4,ratio:Math.sqrt(16-(Math.PI/3)**2)-1,period:24,amplitude:12,setpoint:22};time=24;}setupMode();toast(mode==='cooling'?'Örnek 3.1: 20. dakikada 60 °C.':'Örnek 3.2: kalıcı salınım genliği 3 °C.');});
let dragging=false;
function seek(e){const rect=$('#chart').getBoundingClientRect(),W=$('#chart').viewBox.baseVal.width,L=W===420?42:53,R=W===420?16:22;time=Math.max(0,Math.min(maxTime(),((e.clientX-rect.left)/rect.width*W-L)/(W-L-R)*maxTime()));time=Math.round(time*2)/2;stop();renderLab();}
$('#chart').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;dragging=true;$('#chart').setPointerCapture(e.pointerId);seek(e);});
$('#chart').addEventListener('pointermove',e=>{if(dragging)seek(e);});
$('#chart').addEventListener('pointerup',()=>dragging=false);
$('#chart').addEventListener('pointercancel',()=>dragging=false);
function download(name,text,type='text/plain;charset=utf-8'){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#export-svg').addEventListener('click',()=>{const svg=$('#chart').cloneNode(true);svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width','1170');svg.setAttribute('height','480');download(mode+'-grafik.svg',new XMLSerializer().serializeToString(svg),'image/svg+xml');toast('Grafik SVG olarak indiriliyor.');});
$('#export-csv').addEventListener('click',()=>{
  const lines=[mode==='cooling'?'zaman_dakika,analitik_sicaklik_C,euler_sicaklik_C,ortam_sicaklik_C':'zaman_saat,bina_tam_sicaklik_C,bina_kalici_sicaklik_C,dis_sicaklik_C'];
  for(let t=0;t<=maxTime();t+=0.5)lines.push(mode==='cooling'?[t,cooling(t,cp),eulerCooling(t,cp,cp.h),cp.ambient].map(n=>n.toFixed(6)).join(','):[t,building(t,bp),buildingSteady(t,bp),10+bp.amplitude*Math.sin(2*Math.PI*t/bp.period)].map(n=>n.toFixed(6)).join(','));
  download(mode+'-veriler.csv',lines.join('\n'),'text/csv;charset=utf-8');toast('Deney verileri CSV olarak indiriliyor.');
});

function updateProgress(){
  const prog=currentProgress();
  const stats=countLessonProgress(prog,currentLesson);
  $('#progress-label').textContent=`${stats.completed} / ${stats.total}`;
  $('#progress-bar').style.width=stats.percent+'%';
  $('#progress-subtitle').textContent=`Ders notu + ${currentLesson.questions.length} alıştırma`;
  $('#lesson-complete').checked=!!prog.lesson;
  if(view==='library')renderLibrary();
}
$('#lesson-complete').addEventListener('change',e=>{
  const prog=currentProgress();
  prog.lesson=e.target.checked;
  saveStore('progress',progressByLesson);
  updateProgress();
});

function renderExercises(){
  const prog=currentProgress();
  const questions=currentLesson.questions;
  $('#exercises').innerHTML=questions.map((q,i)=>`<form class="panel exercise" data-question="${i}"><div class="exercise-top"><span>0${i+1} / ${escape(q.tag)}${q.difficulty?`<span class="difficulty-badge">${escape(q.difficulty)}</span>`:''}</span><span class="exercise-status ${prog.solved.includes(i)?'solved':''}">${prog.solved.includes(i)?'✓ Tamamlandı':'Henüz çözülmedi'}</span></div><h3>${escape(q.title)}</h3><p>${escape(q.text)}</p>${q.choices?`<div role="radiogroup" aria-label="${escape(q.title)}">${q.choices.map((c,j)=>`<label class="choice"><input type="radio" name="answer-${i}" value="${j}" required>${escape(c)}</label>`).join('')}</div><button class="button primary" type="submit">Cevabımı kontrol et</button>`:`<label for="answer-${i}">Cevabın (${escape(q.unit)})</label><div class="answer-line"><input id="answer-${i}" name="numeric" inputmode="decimal" placeholder="Sonucu yaz…" autocomplete="off" required aria-label="${escape(q.title)} için sayısal cevap"><button class="button primary" type="submit">Kontrol et</button></div>`}<p class="feedback" role="status" hidden></p><button class="text-button hint-button" type="button">＋ Bir ipucu aç</button><ol class="hint-list"></ol>${q.solutionSummary?`<details class="solution-details"><summary>Çözüm yöntemini ve formülü gör</summary><p>${escape(q.solutionSummary)}</p></details>`:''}</form>`).join('');
}
$('#exercises').addEventListener('submit',e=>{
  e.preventDefault();const form=e.target,i=Number(form.dataset.question),q=currentLesson.questions[i];let answer;
  if(q.choices)answer=Number(form.querySelector('input[type=radio]:checked')?.value);
  else answer=Number(form.querySelector('input[name=numeric]').value.trim().replace(',','.'));
  const correct=Number.isFinite(answer)&&(q.choices?answer===q.answer:Math.abs(answer-q.answer)<=q.tolerance),feedback=form.querySelector('.feedback');
  feedback.hidden=false;feedback.classList.toggle('wrong',!correct);feedback.textContent=correct?q.feedback:'Henüz doğru değil. Birimlere, ortamla farka ve başlangıç koşullarına tekrar bak; bir sonraki ipucu yardımcı olabilir.';
  if(correct){
    const prog=currentProgress();
    if(!prog.solved.includes(i))prog.solved.push(i);
    saveStore('progress',progressByLesson);
    form.querySelector('.exercise-status').textContent='✓ Tamamlandı';
    form.querySelector('.exercise-status').classList.add('solved');
    updateProgress();
  }
});
$('#exercises').addEventListener('click',e=>{if(!e.target.matches('.hint-button'))return;const form=e.target.closest('form'),q=currentLesson.questions[Number(form.dataset.question)],list=form.querySelector('.hint-list'),n=list.children.length;if(n<q.hints.length){const li=document.createElement('li');li.textContent=q.hints[n];list.append(li);}if(list.children.length===q.hints.length){e.target.textContent='Tüm ipuçları açık';e.target.disabled=true;}else e.target.textContent='＋ Sonraki ipucu';});

$('#notes').addEventListener('input',()=>{
  notesByLesson[currentLesson.id]=$('#notes').value;
  $('#save-status').textContent=saveStore('notes',notesByLesson)?'✓ Bu ders için tarayıcıya kaydedildi.':'Tarayıcıya kaydedilemiyor. Notlarını indirerek yedekle.';
});
$('#export-notes').addEventListener('click',()=>{
  const fileSlug=`calisma-notlarim-${currentLesson.section.replace('.','-')}.md`;
  download(fileSlug,`# §${currentLesson.section} · ${currentLesson.title}\n\nKaynak: ${currentBook.author}, basılı s.${currentLesson.pages}.\n\n`+$('#notes').value);
  toast('Notların Markdown olarak indiriliyor.');
});

function renderMap(){
  const search=$('#chapter-search').value.toLocaleLowerCase('tr-TR').trim();
  const chapters=currentBook.chapters;
  let matches=0;
  $('#chapter-list').innerHTML=chapters.map((c,i)=>{
    if(!c.join(' ').toLocaleLowerCase('tr-TR').includes(search))return '';
    matches++;
    const sections=c[3].split('|');
    const readyInChapter=sections.map(s=>findLessonBySection(currentBook,s.split(' ')[0])).filter(Boolean);
    const hasReady=readyInChapter.length>0;
    const badgeHtml=hasReady?readyInChapter.map(l=>`<span class="ready">${escape(l.section)} HAZIR</span>`).join(' '):'· İçerik haritası';
    return `<details class="chapter-card" ${search||hasReady?'open':''}><summary><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><div><h3>${escape(c[0])}</h3><small>Basılı s.${c[2]} · PDF s.${c[2]+currentBook.pdfPageOffset} ${badgeHtml}</small></div><span class="chapter-arrow">＋</span></summary><ul>${sections.map(s=>{
      const secCode=s.split(' ')[0];
      const readyLesson=findLessonBySection(currentBook,secCode);
      return `<li>${readyLesson?`<a href="#lesson" data-map-lesson="${escape(readyLesson.id)}">${escape(s)} → Derse git</a>`:escape(s)}</li>`;
    }).join('')}</ul></details>`;
  }).join('');
  $('#no-chapters').hidden=matches>0;
}
$('#chapter-search').addEventListener('input',renderMap);
$('#chapter-list').addEventListener('click',e=>{
  const link=e.target.closest('[data-map-lesson]');
  if(link){
    e.preventDefault();
    selectLesson(link.dataset.mapLesson,'lesson');
  }
});

async function loadLesson(){
  if(loadedLessonId===currentLesson.id)return;
  try{
    const [mdResponse,mathResponse]=await Promise.all([fetch(currentLesson.lessonPath),fetch(currentLesson.mathPath)]);
    if(!mdResponse.ok||!mathResponse.ok)throw Error('Ders dosyaları yüklenemedi.');
    const [md,formulaMap]=await Promise.all([mdResponse.text(),mathResponse.json()]);
    const prepared=md.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g,(_,latex)=>{const m=formulaMap[latex.trim()];if(!m)throw Error('Formül eşlemesi bulunamadı.');return `<div class="formula">${m}<details><summary>LaTeX kaynağı</summary><code>${escape(latex.trim())}</code></details></div>`;});
    $('#lesson-content').innerHTML=marked.parse(prepared);
    loadedLessonId=currentLesson.id;
  }catch(e){
    $('#lesson-content').innerHTML=`<h2>Ders notu yüklenemedi.</h2><p>Uygulamayı bir HTTP sunucusundan açmalısın. <a href="${escape(currentLesson.lessonPath)}">Markdown dosyasını doğrudan açabilirsin.</a></p>`;
    console.error(e);
  }
}

function route(){
  const requested=location.hash.slice(1)||'lab';
  view=['library','lab','lesson','practice','notes','map','source'].includes(requested)?requested:'lab';
  $('#lesson-heading').hidden=view==='library';
  $$('.view').forEach(el=>el.hidden=el.id!=='view-'+view);
  $$('[data-view]').forEach(a=>{a.classList.toggle('active',a.dataset.view===view);if(a.dataset.view===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('#sidebar').classList.remove('open');
  $('#menu').setAttribute('aria-expanded','false');
  if(view!=='lab')stop();
  if(view==='library')renderLibrary();
  if(view==='lesson')loadLesson();
  if(view==='map')renderMap();
}
window.addEventListener('hashchange',()=>{route();window.scrollTo(0,0);});
$('#menu').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));$('#menu').setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#sidebar').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();location.hash='map';setTimeout(()=>$('#chapter-search').focus(),20);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
window.addEventListener('resize',()=>{if(view==='lab')renderChart();});

applyActiveContext();
setupMode();
route();
if(!storageOK)$('#save-status').textContent='Tarayıcı depolaması kullanılamıyor. Notlarını indirerek yedekle.';
