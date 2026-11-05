import {createStudyGuide} from './core/study-guide.js';
import {escapeHtml as escape, formatMathText} from './core/html.js';
import {getMathReference} from './lessons/math-reference.js';
import {createLabHost} from './core/lab-host.js';
import {createLessonRepository} from './core/lesson-repository.js';
import {marked} from './vendor/marked.js';
import {cooling, calibrateK, halfLife, targetTime, eulerCooling, building, buildingSteady, buildingTransient, buildingMetrics} from './models.js';
import {BOOKS, LEGACY_LESSON_ID, getBook, getLesson, localizeBook, findLessonBySection, migrateProgressStore, migrateNotesStore, countLessonProgress} from './content.js';
import {normalizeLang, ui} from './i18n.js';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let storageOK=true;
function readStore(key,fallback){try{return JSON.parse(localStorage.getItem('denklem-v1-'+key))??fallback;}catch{storageOK=false;return fallback;}}
function saveStore(key,value){try{localStorage.setItem('denklem-v1-'+key,JSON.stringify(value));return true;}catch{storageOK=false;return false;}}

const urlLang=new URLSearchParams(location.search).get('lang');
let lang=normalizeLang(urlLang||readStore('lang','tr'));
if(urlLang)saveStore('lang',lang);

const t=(key,...args)=>ui(lang,key,...args);
const localeCode=()=>lang==='en'?'en-US':'tr-TR';
const fmt=(n,d=1)=>Number(n).toLocaleString(localeCode(),{minimumFractionDigits:d,maximumFractionDigits:d});
const fmtPct=(n,d=1)=>lang==='en'?`${fmt(n,d)}%`:`%${fmt(n,d)}`;

let progressByLesson=migrateProgressStore(readStore('progress',null));
let notesByLesson=migrateNotesStore(readStore('notes',null));
saveStore('progress',progressByLesson);
saveStore('notes',notesByLesson);

const savedActiveId=new URLSearchParams(location.search).get('lesson')||readStore('active-lesson',BOOKS[0].lessons[0].id);
let {book:currentBook,lesson:currentLesson}=getLesson(savedActiveId,lang);

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
const unit=()=>mode==='cooling'?t('unitMin'):t('unitHour');
const unitLong=()=>mode==='cooling'?t('unitMinLong'):t('unitHourLong');
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
    <h4>${formatMathText(c.title)}</h4>
    <p class="clinic-statement">${formatMathText(c.statement)}</p>
    <div class="clinic-trap"><strong>${escape(t('examTrapPrefix'))}</strong> ${formatMathText(c.trap)}</div>
    <details class="clinic-steps" ${!currentLesson.studySupport&&idx===0?'open':''}>
      <summary>${escape(t('examStepsSummary',c.steps.length))}</summary>
      <div class="clinic-step-list">${c.steps.map(st=>`<div class="clinic-step">
        <strong>${formatMathText(st.label)}</strong>
        ${math(st.math)}
        <p>${formatMathText(st.text)}</p>
      </div>`).join('')}</div>
    </details>
  </article>`).join('');
  $('#exam-blueprint').innerHTML=bpHtml;
  $('#exam-clinic-list').innerHTML=clinicHtml;
  $('#practice-clinic-mirror').hidden=clinic.length===0;
  $('#practice-clinic-mirror').innerHTML=`<section class="panel exam-clinic-panel">
    <div class="exam-clinic-header"><div><p class="eyebrow">${escape(currentLesson.presentation?.clinicEyebrow||t('practiceMirrorEyebrow'))}</p><h3>${escape(t('practiceMirrorTitle'))}</h3></div></div>
    <div class="exam-blueprint">${bpHtml}</div>
    <div class="exam-clinic-list">${clinicHtml}</div>
  </section>`;
}

function applyStaticTranslations(){
  document.documentElement.lang=lang;
  $('#meta-description').setAttribute('content',t('metaDescription'));
  $$('[data-lang]').forEach(btn=>{
    const active=btn.dataset.lang===lang;
    btn.classList.toggle('selected',active);
    btn.setAttribute('aria-pressed',String(active));
  });
  $('#lang-switch').setAttribute('aria-label',t('langSwitchAria'));
  $('#sidebar-book-link').setAttribute('title',t('goToLibraryTitle'));
  $('#sidebar-studying-label').textContent=t('studyingBook');
  $('#sidebar-workspace-label').textContent=t('workspaceLabel');
  $('#sidebar-nav').setAttribute('aria-label',t('navMenuAria'));
  $('#nav-label-library').textContent=t('navLibrary');
  $('#nav-label-lesson').textContent=t('navLesson');
  $('#nav-label-lab').textContent=t('navLab');
  $('#nav-label-practice').textContent=t('navPractice');
  $('#nav-label-notes').textContent=t('navNotes');
  $('#nav-label-map').textContent=t('navMap');
  $('#progress-header-text').textContent=t('progressHeader');
  $('#sidebar-personal-label').textContent=t('personalWorkspace');
  $('#sidebar-source-link').textContent=t('sourceAndAppInfo');
  const menuOpen=$('#sidebar').classList.contains('open');
  $('#menu').setAttribute('aria-label',menuOpen?t('closeMenuAria'):t('openMenuAria'));
  $('#topbar-search-text').textContent=t('searchInBook');
  $('#heading-download-text').textContent=t('downloadLesson');

  $('#view-library').setAttribute('aria-label',t('navLibrary'));
  $('#library-eyebrow').textContent=t('libraryEyebrow');
  $('#library-title').textContent=t('libraryTitle');
  $('#library-desc').textContent=t('libraryDesc');

  $('#view-lab').setAttribute('aria-label',t('navLab'));
  $('#study-path-bar').setAttribute('aria-label',t('studyPathAria'));
  $('#study-path-pills').setAttribute('aria-label',t('studyModeGroupAria'));
  $('#study-pill-1-title').textContent=t('studyPill1Title');
  $('#study-pill-1-sub').textContent=t('studyPill1Sub');
  $('#study-pill-2-title').textContent=t('studyPill2Title');
  $('#study-pill-2-sub').textContent=t('studyPill2Sub');
  $('#study-pill-3-title').textContent=t('studyPill3Title');
  $('#experiment-segmented').setAttribute('aria-label',t('selectExperimentAria'));
  $('#mode-cooling-label').textContent=t('modeCoolingBtn');
  $('#mode-building-label').textContent=t('modeBuildingBtn');
  $('#compare-toggle-text').textContent=t('compareToggleLabel');
  $('#controls-panel').setAttribute('aria-label',t('controlsAria'));
  $('#params-panel-kicker').textContent=t('paramsPanelKicker');
  $('#plot-panel').setAttribute('aria-label',t('plotAria'));
  $('#export-svg').setAttribute('title',t('exportSvgTitle'));
  $('#export-svg').setAttribute('aria-label',t('exportSvgTitle'));
  $('#play').setAttribute('aria-label',playing?t('pauseAria'):t('playAria'));
  $('#timeline-label').textContent=t('timelineLabel');
  $('#euler-option-text').textContent=t('eulerToggle');
  $('#steady-option-text').textContent=t('steadyToggle');
  $('#export-csv').textContent=t('exportCsvBtn');

  $('#discovery-eyebrow').textContent=t('discoveryEyebrow');
  $('#prediction-tabs').setAttribute('aria-label',t('predictionScenarioAria'));
  $('#prediction-input-label').textContent=t('yourPredictionLabel');
  $('#prediction-input').setAttribute('placeholder',t('predictionInputPlaceholder'));
  $('#prediction-submit-btn').textContent=t('predictionSubmitBtn');
  $('#discovery-hint-summary').textContent=t('hintSummary');

  $('#cal-eyebrow').textContent=t('calEyebrow');
  $('#cal-title').textContent=t('calTitle');
  $('#cal-desc').textContent=t('calDesc');
  $('#cal-initial-label').textContent=t('calInitialLabel');
  $('#cal-ambient-label').textContent=t('calAmbientLabel');
  $('#cal-time-label').textContent=t('calTimeLabel');
  $('#cal-observed-label').textContent=t('calObservedLabel');
  $('#cal-target-label').textContent=t('calTargetLabel');
  $('#cal-apply').textContent=t('calApplyBtn');
  $('#cal-reset').textContent=t('calResetBtn');

  $('#bcal-eyebrow').textContent=t('bcalEyebrow');
  $('#bcal-title').textContent=t('bcalTitle');
  $('#bcal-desc').textContent=t('bcalDesc');
  $('#bcal-amp-label').textContent=t('bcalAmpLabel');
  $('#bcal-tau-label').textContent=t('bcalTauLabel');
  $('#bcal-period-label').textContent=t('bcalPeriodLabel');
  $('#bcal-target-label').textContent=t('bcalTargetLabel');
  $('#bcal-apply').textContent=t('bcalApplyBtn');

  $('#eq-eyebrow').textContent=t('eqEyebrow');
  $('#read-full-lesson-text').textContent=t('readFullLessonLink');

  $('#stepper-panel').setAttribute('aria-label',t('stepperAria'));
  $('#stepper-eyebrow').textContent=t('stepperEyebrow');
  $('#stepper-title').textContent=t('stepperTitle');
  $('#step-prev').textContent=t('stepPrevBtn');
  $('#step-next').textContent=t('stepNextBtn');

  $('#exam-clinic-panel').setAttribute('aria-label',t('examClinicAria'));
  $('#exam-clinic-eyebrow').textContent=t('examClinicEyebrow');
  $('#exam-clinic-title').textContent=t('examClinicTitle');

  $('#in-this-lesson-label').textContent=t('inThisLesson');
  $('#math-reference-open-title').textContent=t('mathReferenceOpen');
  $('#math-reference-open-hint').textContent=t('mathReferenceOpenHint');
  $('#math-reference-open').setAttribute('aria-label',t('mathReferenceOpen'));
  $('#math-reference-title').textContent=t('mathReferenceTitle');
  $('#math-reference-close').setAttribute('aria-label',t('mathReferenceClose'));
  $('#math-reference-derivative-title').textContent=t('mathReferenceDerivative');
  $('#math-reference-integral-title').textContent=t('mathReferenceIntegral');
  $('#lesson-complete-text').textContent=t('lessonCompletedCheck');
  $('#go-to-practice-btn').textContent=t('goToPracticeBtn');

  $('#practice-eyebrow').textContent=t('practiceEyebrow');
  $('#practice-title').textContent=t('practiceTitle');
  $('#practice-intro').textContent=t('practiceIntro');

  $('#notes-eyebrow').textContent=t('notesEyebrow');
  $('#notes-title').textContent=t('notesTitle');
  $('#notes-intro').textContent=t('notesIntro');
  $('#export-notes').textContent=t('exportNotesBtn');
  $('#save-status').textContent=storageOK?t('autoSaveStatus'):t('storageUnavailableStatus');

  $('#map-eyebrow').textContent=t('mapEyebrow');
  $('#map-title').textContent=t('mapTitle');
  $('#chapter-search').setAttribute('placeholder',t('mapSearchPlaceholder'));
  $('#chapter-search').setAttribute('aria-label',t('mapSearchAria'));
  $('#no-chapters').textContent=t('mapNoChapters');

  $('#source-eyebrow').textContent=t('sourceEyebrow');
  $('#source-title').textContent=t('sourceTitle');
  $('#source-what-works-title').textContent=t('sourceWhatWorksTitle');
  $('#source-what-works-body').textContent=t('sourceWhatWorksBody');
  $('#source-llm-title').textContent=t('sourceLlmTitle');
  $('#source-llm-body').textContent=t('sourceLlmBody');
  $('#source-data-title').textContent=t('sourceDataTitle');
  $('#source-data-body').textContent=t('sourceDataBody');
  $('#source-limits-title').textContent=t('sourceLimitsTitle');
  $('#source-download').textContent=t('sourceDownloadBtn');

  $('#footer-motto').textContent=t('footerMotto');
}

function renderMathReference(){
  const reference=getMathReference(currentLesson.section,lang);
  const itemHtml=item=>`<li><span>${escape(item.label)}</span>${math(item.math)}</li>`;
  const empty=`<li class="math-reference-empty">${escape(t('mathReferenceEmpty'))}</li>`;
  $('#math-reference-eyebrow').textContent=t('mathReferenceEyebrow',currentLesson.section);
  $('#math-reference-intro').textContent=t('mathReferenceIntro',currentLesson.section);
  $('#math-reference-derivative').innerHTML=reference?reference.derivative.map(itemHtml).join(''):empty;
  $('#math-reference-integral').innerHTML=reference?reference.integral.map(itemHtml).join(''):empty;
}

let loadedLessonKey=null;
function applyActiveContext(){
  document.title=`Beyond the Textbook · ${currentLesson.title}`;
  $('#sidebar-cover').innerHTML=coverMarkup(currentBook);
  $('#sidebar-book-name').innerHTML=escape(currentBook.title).replace(' for ','<br>for ');
  $('#sidebar-book-meta').textContent=`${currentBook.author} · ${currentBook.year}`;
  $('#nav-library-count').textContent=String(BOOKS.length);
  $('#nav-lesson-section').textContent=currentLesson.section;
  $('#nav-practice-count').textContent=String(currentLesson.questions.length);
  $('#study-pill-practice-count').textContent=t('studyPill3Sub',currentLesson.questions.length);
  $('#exam-clinic-all-btn').textContent=t('goToAllQuestionsBtn',currentLesson.questions.length);
  $('#nav-map-count').textContent=String(currentBook.chapters.length);
  $('#sidebar-source-line').textContent=`§${currentLesson.section} · ${t('printedPagesPrefix')} ${currentLesson.pages}`;
  $('#breadcrumb-book').textContent=currentBook.shortTitle;
  $('#breadcrumb-chapter').textContent=`${currentLesson.chapterNumber} · §${currentLesson.section}`;
  $('#heading-chapter-pill').textContent=t('chapterBadge',currentLesson.chapterNumber);
  $('#heading-chapter-title').textContent=currentLesson.chapterTitle.toLocaleUpperCase(localeCode());
  $('#heading-lesson-title').innerHTML=`${escape(currentLesson.title)}<span>.</span>`;
  $('#heading-lesson-subtitle').textContent=currentLesson.subtitle;
  $('#heading-download').href=currentLesson.lessonPath;
  $('#heading-download').setAttribute('download',currentLesson.downloadName);
  $('#lesson-highlights').innerHTML=currentLesson.highlights.map(h=>`<p>${escape(h)}</p>`).join('');
  $('#lesson-source-note').innerHTML=`${escape(t('sourceBoxTitle'))}<br><strong>§${escape(currentLesson.section)} · ${escape(currentLesson.pages)}</strong><br>${escape(t('pdfPagesLabel',currentLesson.pdfPages))}`;
  renderMathReference();
  $('#practice-disclaimer').textContent=t('practiceDisclaimer',currentLesson.questions.length,currentLesson.section);
  $('#notes-label').textContent=`§${currentLesson.section} · ${currentLesson.title.toLocaleUpperCase(localeCode())} · ${t('notesLabelSuffix')}`;
  $('#notes').placeholder=currentLesson.notesPlaceholder;
  $('#notes').value=notesByLesson[currentLesson.id]??'';
  const readySections=currentBook.lessons.map(l=>'§'+l.section).join(', ');
  $('#map-intro').textContent=t('mapIntro',currentBook.chapters.length,readySections);
  $('#source-book-meta').innerHTML=`<strong>${escape(currentBook.author)} · ${escape(currentBook.title)}</strong><br>${escape(currentBook.publisher)}, ${currentBook.year}. ${escape(t('sourceBookPages',currentBook.pdfPages))}`;
  $('#source-lesson-summary').textContent=currentLesson.sourceSummary;
  $('#source-model-limits').textContent=currentLesson.modelLimits;
  $('#source-download').href=currentLesson.lessonPath;
  $('#source-download').setAttribute('download',currentLesson.downloadName);
  $('#footer-source').textContent=`${t('footerSourcePrefix')} ${currentBook.author.split(' ').at(-1)} · §${currentLesson.section} ↗`;
  const presentation=currentLesson.presentation||{};
  $('#meta-description').setAttribute('content',currentLesson.subtitle);
  $('#nav-label-lab').textContent=presentation.lab||t('navLab');
  $('#nav-label-practice').textContent=presentation.practice||t('navPractice');
  $('#go-to-practice-btn').textContent=presentation.practice||t('goToPracticeBtn');
  for(const [id,key] of [['practice-eyebrow','practiceEyebrow'],['practice-title','practiceTitle'],['practice-intro','practiceIntro'],['practice-disclaimer','practiceDisclaimer']]){
    if(presentation[key])$('#'+id).textContent=presentation[key];
    else if(key!=='practiceDisclaimer')$('#'+id).textContent=t(key);
  }
  $('#source-what-works-body').textContent=presentation.featureSummary||t('sourceWhatWorksBody');
  renderExamClinicSection();
  renderExercises();
  updateProgress();
}

function setLang(nextLang){
  const normalized=normalizeLang(nextLang);
  if(normalized===lang)return;
  lang=normalized;
  saveStore('lang',lang);
  ({book:currentBook,lesson:currentLesson}=getLesson(currentLesson.id,lang));
  loadedLessonKey=null;
  applyStaticTranslations();
  applyActiveContext();
  syncContextUrl();
  if(view==='lab')activateLab();
  if(view==='library')renderLibrary();
  if(view==='lesson')loadLesson();
  if(view==='map')renderMap();
}

$('#lang-switch').addEventListener('click',e=>{
  const btn=e.target.closest('[data-lang]');
  if(btn)setLang(btn.dataset.lang);
});

const mathReferenceDialog=$('#math-reference-dialog');
const mathReferenceTrigger=$('#math-reference-open');
function closeMathReference(){
  if(mathReferenceDialog.open)mathReferenceDialog.close();
  else{
    mathReferenceDialog.removeAttribute('open');
    document.body.classList.remove('math-reference-open');
    mathReferenceTrigger.setAttribute('aria-expanded','false');
    mathReferenceTrigger.focus();
  }
}
function openMathReference(){
  if(mathReferenceDialog.open)return;
  document.body.classList.add('math-reference-open');
  mathReferenceTrigger.setAttribute('aria-expanded','true');
  if(typeof mathReferenceDialog.showModal==='function')mathReferenceDialog.showModal();
  else mathReferenceDialog.setAttribute('open','');
  $('#math-reference-close').focus();
}
mathReferenceTrigger.setAttribute('aria-expanded','false');
mathReferenceTrigger.addEventListener('click',openMathReference);
$('#math-reference-close').addEventListener('click',closeMathReference);
mathReferenceDialog.addEventListener('click',event=>{if(event.target===mathReferenceDialog)closeMathReference();});
mathReferenceDialog.addEventListener('close',()=>{
  document.body.classList.remove('math-reference-open');
  mathReferenceTrigger.setAttribute('aria-expanded','false');
  mathReferenceTrigger.focus();
});

function selectLesson(lessonId,targetView=null){
  const found=getLesson(lessonId,lang);
  const changed=found.lesson.id!==currentLesson.id;
  currentBook=found.book;
  currentLesson=found.lesson;
  saveStore('active-lesson',currentLesson.id);
  if(changed){loadedLessonKey=null;++lessonRequest;}
  applyStaticTranslations();
  applyActiveContext();
  syncContextUrl();
  if(targetView){
    if(location.hash==='#'+targetView)route();
    else location.hash=targetView;
  }
}

function selectBookForMap(bookId){
  const book=getBook(bookId,lang);
  if(book.id!==currentBook.id&&book.lessons.length){
    currentBook=book;
    currentLesson=book.lessons[0];
    saveStore('active-lesson',currentLesson.id);
    loadedLessonKey=null;
    applyActiveContext();
  }
  if(location.hash==='#map')route();
  else location.hash='map';
}

function renderLibrary(){
  $('#library-list').innerHTML=BOOKS.map(rawBook=>{
    const book=localizeBook(rawBook,lang);
    const lessonsHtml=book.lessons.map(lesson=>{
      const stats=countLessonProgress(progressByLesson[lesson.id],lesson);
      const isCurrent=lesson.id===currentLesson.id;
      return `<div class="library-lesson-card ${isCurrent?'active-lesson':''}">
        <div class="library-lesson-main">
          <div class="library-lesson-meta"><span class="chapter-pill">${escape(t('chapterBadge',lesson.chapterNumber))} · §${escape(lesson.section)}</span><span>${escape(t('printedAndPdfPages',lesson.pages,lesson.pdfPages))}</span></div>
          <h4>${escape(lesson.title)}</h4>
          <p>${escape(lesson.subtitle)}</p>
        </div>
        <div class="library-lesson-actions">
          <span class="library-progress-pill" title="${escape(t('progressPillTitle'))}">${escape(t('progressPill',stats.completed,stats.total))}</span>
          <button type="button" class="button secondary" data-open-lesson="${escape(lesson.id)}" data-target-view="lesson">${escape(t('lessonBtn'))}</button>
          <button type="button" class="button secondary" data-open-lesson="${escape(lesson.id)}" data-target-view="practice">${escape(lesson.presentation?.practice||t('examPrepBtn'))}</button>
          <button type="button" class="button primary" data-open-lesson="${escape(lesson.id)}" data-target-view="lab">${escape(lesson.presentation?.lab||t('labBtn'))}</button>
        </div>
      </div>`;
    }).join('');
    return `<article class="panel library-book">
      <div class="library-book-header">
        <div class="library-cover" aria-hidden="true">${coverMarkup(book)}</div>
        <div class="library-book-info">
          <p class="eyebrow">${escape(t('bookCardEyebrow',book.chapters.length,book.lessons.length))}</p>
          <h3>${escape(book.title)}</h3>
          <p class="library-book-meta">${escape(book.author)} · ${escape(book.publisher)}, ${book.year}</p>
          <p class="library-book-summary">${escape(book.summary)}</p>
        </div>
        <button type="button" class="button secondary" data-open-book-map="${escape(book.id)}">${escape(t('bookMapBtn',book.chapters.length))}</button>
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
  $('#prediction-tabs').innerHTML=scenarios.map((sc,idx)=>`<button type="button" class="mini-tab ${idx===predScenarioIndex?'active':''}" data-pred-idx="${idx}">${escape(sc.badge||`#${idx+1}`)}</button>`).join('');
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
  $('#step-show-all').textContent=showAllSteps?t('stepCollapseBtn'):t('stepShowAllBtn');
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
    box.innerHTML=t('calResultHtml',{
      obsDiff:fmt(observed-ambient,1),
      initDiff:fmt(initial-ambient,1),
      ratio:fmt(ratio,4),
      t1:fmt(t1,1),
      k:fmt(k,5),
      tau:fmt(tau,1),
      hl:fmt(hl,1),
      target:fmt(target,1),
      targetDiff:fmt(target-ambient,1),
      total:total===null?null:fmt(total,2),
      rem:total===null?null:fmt(total-t1,2)
    });
    $('#cal-apply').disabled=false;
  }catch{
    box.classList.add('error');
    box.textContent=t('calError');
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
  toast(t('toastCalApplied',fmt(lastCalibratedK,4)));
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
    box.textContent=t('bcalError');
    $('#bcal-apply').disabled=true;
    return;
  }
  const omega=2*Math.PI/period;
  const minPossibleForZeroR=T1/Math.hypot(1,tau*omega);
  const ratioSq=(T1/targetA)**2-(tau*omega)**2;
  box.classList.remove('error');
  if(targetA>=minPossibleForZeroR){
    lastRequiredRatio=0;
    box.innerHTML=t('bcalPassiveEnough',fmt(tau*omega,3),fmt(minPossibleForZeroR,2),fmt(targetA,2));
    $('#bcal-apply').disabled=false;
    return;
  }
  const reqR=Math.sqrt(Math.max(0,ratioSq))-1;
  lastRequiredRatio=Math.max(0,reqR);
  const m=buildingMetrics({tau,ratio:lastRequiredRatio,period,amplitude:T1});
  box.innerHTML=t('bcalResultHtml',{
    tw:fmt(tau*omega,3),
    T1:fmt(T1,1),
    targetA:fmt(targetA,2),
    ratioSq:fmt(ratioSq,3),
    reqR:fmt(lastRequiredRatio,4),
    lag:fmt(m.lag,2)
  });
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
  toast(t('toastBcalApplied',fmt(bp.ratio,2)));
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
    fb.textContent=t('predictionInvalid');
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
  const prefix=closeEnough
    ?t('predictionCorrectPrefix',fmt(val,1),predConfig.unit)
    :t('predictionClosePrefix',fmt(val,1),predConfig.unit,fmt(predConfig.expected,2));
  const savedFeedbackText=prefix+predConfig.explanation+t('predictionChartSuffix');
  setupMode();
  fb.hidden=false;
  fb.classList.toggle('wrong',!closeEnough);
  fb.textContent=savedFeedbackText;
});

function paramSuffix(id){
  return {
    initial:'°C',
    ambient:'°C',
    k:t('rateUnitMin'),
    h:t('unitMin'),
    tau:t('unitHour'),
    period:t('unitHour'),
    amplitude:'°C',
    ratio:''
  }[id];
}

function setupMode(){
  stop();$('#physical-illustration').innerHTML=icons[mode==='cooling'?'cup':'house'];
  $$('[data-mode]').forEach(b=>{b.classList.toggle('selected',b.dataset.mode===mode);b.setAttribute('aria-pressed',b.dataset.mode===mode);});
  $('#time').max=maxTime();$('#time').step=0.5;time=Math.min(time,maxTime());
  $('#lab-source').textContent=mode==='cooling'?t('labSourceCooling'):t('labSourceBuilding');
  $('#controls').innerHTML=mode==='cooling'?[
    control('initial',t('paramInitial','A'),10,120,1,cp.initial,'°C'),
    control('ambient',t('paramAmbient','A'),0,40,1,cp.ambient,'°C'),
    control('k',t('paramK','A'),0.005,0.12,0.0001,cp.k,t('rateUnitMin'),4),
    control('h',t('paramH'),0.5,10,0.5,cp.h,t('unitMin'),1)
  ].join(''):[
    control('ratio',t('paramRatio','A'),0,5,0.01,bp.ratio,'',2),
    control('tau',t('paramTau','A'),1,12,0.5,bp.tau,t('unitHour'),1),
    control('amplitude',t('paramAmplitude','A'),1,20,0.5,bp.amplitude,'°C',1),
    control('period',t('paramPeriod','A'),6,48,1,bp.period,t('unitHour'))
  ].join('');
  $('#compare-controls').hidden=!compareEnabled;
  $('#compare-controls').innerHTML=mode==='cooling'
    ?`<div class="compare-controls-header"><span>${escape(t('compareHeaderB'))}</span></div>`+[
      control('initial',t('paramInitial','B'),10,120,1,cpB.initial,'°C',0,'b'),
      control('ambient',t('paramAmbient','B'),0,40,1,cpB.ambient,'°C',0,'b'),
      control('k',t('paramK','B'),0.005,0.12,0.0001,cpB.k,t('rateUnitMin'),4,'b')
    ].join('')
    :`<div class="compare-controls-header"><span>${escape(t('compareHeaderB'))}</span></div>`+[
      control('ratio',t('paramRatio','B'),0,5,0.01,bpB.ratio,'',2,'b'),
      control('tau',t('paramTau','B'),1,12,0.5,bpB.tau,t('unitHour'),1,'b'),
      control('amplitude',t('paramAmplitude','B'),1,20,0.5,bpB.amplitude,'°C',1,'b')
    ].join('');
  if(mode==='cooling')$('#control-a-h').hidden=!showEuler;
  $('#euler-option').hidden=mode!=='cooling';
  $('#steady-option').hidden=mode!=='building';
  $('#preset').textContent=mode==='cooling'?t('presetCooling'):t('presetBuilding');
  $('#plot-kicker').textContent=mode==='cooling'?t('plotKickerCooling'):t('plotKickerBuilding');
  $('#plot-title').textContent=mode==='cooling'?t('plotTitleCooling'):t('plotTitleBuilding');
  const compareLegend=compareEnabled?`<span class="compare-b"><i></i> ${escape(t('legendScenarioB'))}</span>`:'';
  const steadyLegend=mode==='building'&&showSteady?`<span class="steady-curve"><i></i> ${escape(t('legendSteady'))}</span>`:'';
  $('#legend').innerHTML=mode==='cooling'
    ?`<span><i></i> ${escape(t('legendScenarioAFull'))}</span>${compareLegend}<span class="ambient"><i></i> ${escape(t('legendAmbient'))}</span><span class="euler" id="euler-legend"><i></i> ${escape(t('legendEuler'))}</span>`
    :`<span><i></i> ${escape(t('legendScenarioABuilding'))}</span>${steadyLegend}${compareLegend}<span class="euler"><i></i> ${escape(t('legendOutside'))}</span><span class="ambient"><i></i> ${escape(t('legendTarget'))}</span>`;
  if(mode==='cooling')$('#euler-legend').hidden=!showEuler;
  $('#equation').innerHTML=mode==='cooling'?math('<mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mi>k</mi><mo>(</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo>'):math('<mi>τ</mi><mfrac><mrow><mi>d</mi><mi>θ</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo><mi>θ</mi><mo>=</mo><msub><mi>T</mi><mn>1</mn></msub><mi>sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo>');
  $('#equation-explanation').textContent=mode==='cooling'?t('eqExplanationCooling'):t('eqExplanationBuilding');
  $('#term-anatomy').innerHTML=mode==='cooling'
    ?`<div class="term-row"><code>θ(t) = T(t) − Tₘ</code><span>${escape(t('termCooling1'))}</span></div>
      <div class="term-row"><code>τ = 1 / k</code><span>${escape(t('termCooling2',fmt(1/cp.k,1)))}</span></div>
      <div class="term-row"><code>t½ = ln(2) / k</code><span>${escape(t('termCooling3',fmt(halfLife(cp.k),1)))}</span></div>`
    :`<div class="term-row"><code>τ_eff = τ / (1 + r)</code><span>${escape(t('termBuilding1',fmt(bp.tau/(1+bp.ratio),2)))}</span></div>
      <div class="term-row"><code>G(ω) = 1 / √((1+r)² + (τω)²)</code><span>${escape(t('termBuilding2',fmt(1/Math.hypot(1+bp.ratio,bp.tau*2*Math.PI/bp.period),3)))}</span></div>
      <div class="term-row"><code>Δt_phase = φ / ω</code><span>${escape(t('termBuilding3',fmt(buildingMetrics(bp).lag,2)))}</span></div>`;
  renderPredictionScenario();
  $('#discovery-hint').textContent=mode==='cooling'?t('hintCooling'):t('hintBuilding');
  $('#discovery-details').open=false;
  $('#calibration-panel').hidden=mode!=='cooling';
  $('#building-design-panel').hidden=mode!=='building';
  $('#lab-footnote').textContent=mode==='cooling'?t('labFootnoteCooling'):t('labFootnoteBuilding');
  updateCalibrationCalculator();
  updateBuildingCalculator();
  renderStepper();
  renderLab();
}

function metric(label,value,suffix,description,symbol){return `<div class="metric"><p class="eyebrow">${escape(label)}</p><span class="metric-symbol">${symbol}</span><strong>${value}<small>${escape(suffix)}</small></strong><p>${escape(description)}</p></div>`;}
function renderLab(){
  $('#time').value=time;$('#time-output').textContent=fmt(time,1)+' '+unit();
  const value=mode==='cooling'?cooling(time,cp):building(time,bp);
  $('#physical-value').textContent=fmt(value,1)+' °C';
  if(mode==='cooling'){
    const target=targetTime(30,cp);
    const diff=value-cp.ambient;
    const rate=-cp.k*diff;
    const remainingFromNow=target===null?null:target-time;
    const uMin=t('unitMin');
    $('#metrics').innerHTML=
      metric(t('metricCurrentTemp'),fmt(value,1),'°C',t('metricCurrentTempDesc',fmt(time,1),fmt(diff,1)),'T')+
      metric(t('metricHalfLife'),fmt(halfLife(cp.k),1),uMin,t('metricHalfLifeDesc',fmt(1/cp.k,1)),'½')+
      metric(t('metricTarget30'),target===null?'—':fmt(target,1),target===null?'':uMin,target===null?t('metricUnreachable'):(remainingFromNow>0?t('metricRemainingAfterNow',fmt(time,1),fmt(remainingFromNow,1)):t('metricReachedAt',fmt(target,1))),'↘');
    $('#instant-inspector').innerHTML=`<div class="inspector-cell"><span>${escape(t('inspectorTimeCooling',fmt(time,1)))}</span><strong>T(t) = ${fmt(value,2)} °C</strong><small>${escape(t('inspectorDiffSub',fmt(diff,2)))}</small></div>
      <div class="inspector-cell"><span>${escape(t('inspectorRate'))}</span><strong>dT/dt = ${fmt(rate,3)} °C/${escape(uMin)}</strong><small>${escape(t('inspectorRateSubCooling'))}</small></div>
      <div class="inspector-cell"><span>${escape(t('inspectorRemainingFraction'))}</span><strong>${fmtPct(cp.initial===cp.ambient?0:Math.exp(-cp.k*time)*100,1)}</strong><small>e^(−kt) = ${fmt(Math.exp(-cp.k*time),4)}</small></div>
      <div class="inspector-cell"><span>${escape(t('inspectorEulerCell',fmt(cp.h,1)))}</span><strong>${fmt(eulerCooling(time,cp,cp.h),2)} °C</strong><small>${escape(t('inspectorEulerErr',fmt(Math.abs(eulerCooling(time,cp,cp.h)-value),2)))}</small></div>`;
    $('#chart-note').textContent=showEuler?t('chartNoteEuler',fmt(time,1),fmt(Math.abs(eulerCooling(time,cp,cp.h)-value),2)):t('chartNoteExactCooling');
    if(compareEnabled){
      const valB=cooling(time,cpB),hlB=halfLife(cpB.k),targetB=targetTime(30,cpB);
      $('#compare-summary').hidden=false;
      $('#compare-summary').innerHTML=`<div class="compare-item"><span>${escape(t('compareTempCooling',fmt(time,1)))}</span><strong>${fmt(value,1)} °C · ${fmt(valB,1)} °C (Δ = ${fmt(Math.abs(value-valB),1)} °C)</strong></div>
        <div class="compare-item"><span>${escape(t('compareHalfLife'))}</span><strong>${fmt(halfLife(cp.k),1)} ${escape(uMin)} · ${fmt(hlB,1)} ${escape(uMin)}</strong></div>
        <div class="compare-item"><span>${escape(t('compareTarget30'))}</span><strong>${target===null?'—':fmt(target,1)+' '+escape(uMin)} · ${targetB===null?'—':fmt(targetB,1)+' '+escape(uMin)}</strong></div>`;
    }else $('#compare-summary').hidden=true;
  }else{
    const m=buildingMetrics(bp);
    const steadyVal=buildingSteady(time,bp);
    const transVal=buildingTransient(time,bp);
    const outVal=10+bp.amplitude*Math.sin(2*Math.PI*time/bp.period);
    const rate=(-(1+bp.ratio)*(value-bp.setpoint)+bp.amplitude*Math.sin(2*Math.PI*time/bp.period))/bp.tau;
    const uHr=t('unitHour');
    $('#metrics').innerHTML=
      metric(t('metricIndoorTemp'),fmt(value,2),'°C',t('metricIndoorTempDesc',fmt(steadyVal,2),fmt(transVal,2)),'T')+
      metric(t('metricSteadyAmp'),fmt(m.amplitude,2),'°C',t('metricSteadyAmpDesc',fmt(bp.amplitude,1),fmt(m.amplitude,2)),'A')+
      metric(t('metricSteadyLag'),fmt(m.lag,2),uHr,t('metricSteadyLagDesc',fmt(m.phase*180/Math.PI,1),fmt(1/m.decay,2)),'φ');
    $('#instant-inspector').innerHTML=`<div class="inspector-cell"><span>${escape(t('inspectorTimeBuilding',fmt(time,1)))}</span><strong>${fmt(value,2)} °C</strong><small>${escape(t('inspectorDevSub',fmt(value-bp.setpoint,2)))}</small></div>
      <div class="inspector-cell"><span>${escape(t('inspectorRegimeSplit'))}</span><strong>${fmt(steadyVal,2)} °C + (${fmt(transVal,2)} °C)</strong><small>${escape(t('inspectorRegimeSub'))}</small></div>
      <div class="inspector-cell"><span>${escape(t('inspectorOutsideTemp'))}</span><strong>${fmt(outVal,2)} °C</strong><small>${escape(t('inspectorOutsideSub',fmt(bp.amplitude,1)))}</small></div>
      <div class="inspector-cell"><span>${escape(t('inspectorBuildingRate'))}</span><strong>dT_B/dt = ${fmt(rate,3)} °C/${escape(uHr)}</strong><small>${escape(t('inspectorBuildingRateSub',fmt(1/m.decay,2)))}</small></div>`;
    $('#chart-note').textContent=t('chartNoteBuilding');
    if(compareEnabled){
      const valB=building(time,bpB),mB=buildingMetrics(bpB);
      $('#compare-summary').hidden=false;
      $('#compare-summary').innerHTML=`<div class="compare-item"><span>${escape(t('compareTempBuilding',fmt(time,1)))}</span><strong>${fmt(value,1)} °C · ${fmt(valB,1)} °C</strong></div>
        <div class="compare-item"><span>${escape(t('compareAmpBuilding'))}</span><strong>${fmt(m.amplitude,2)} °C · ${fmt(mB.amplitude,2)} °C</strong></div>
        <div class="compare-item"><span>${escape(t('compareLagBuilding'))}</span><strong>${fmt(m.lag,2)} ${escape(uHr)} · ${fmt(mB.lag,2)} ${escape(uHr)}</strong></div>`;
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
  const current=mode==='cooling'?cooling(time,cp):building(time,bp);
  let out=`<title id="chart-title">${escape(mode==='cooling'?t('chartTitleCooling'):t('chartTitleBuilding'))}</title><desc id="chart-description">${escape(t('chartDesc',fmt(time,1),unit(),fmt(series[0][1],1),fmt(current,1)))}</desc><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c9b61" stop-opacity=".13"/><stop offset="1" stop-color="#7c9b61" stop-opacity=".01"/></linearGradient><clipPath id="plotclip"><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}"/></clipPath></defs>`;
  out+=`<text x="${L}" y="11" font-size="10" fill="#9fa893" font-family="sans-serif">${escape(t('chartAxisTemp'))}</text>`;
  for(let i=0;i<=4;i++){
    const val=low+(high-low)*i/4,y=Y(val);
    out+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="#edf0e7" stroke-dasharray="3 5"/><text x="${L-13}" y="${y+4}" text-anchor="end" font-size="10" fill="#a6ae9c" font-family="sans-serif">${fmt(val,0)}</text>`;
  }
  for(let i=0;i<=6;i++){
    const tVal=xMax*i/6,x=X(tVal);
    out+=`<line x1="${x}" y1="${T}" x2="${x}" y2="${H-B}" stroke="#f2f4ed"/><text x="${x}" y="${H-B+23}" text-anchor="middle" font-size="10" fill="#a6ae9c" font-family="sans-serif">${fmt(tVal,0)}</text>`;
  }
  out+=`<text x="${W-R}" y="${H-2}" text-anchor="end" font-size="10" fill="#a0aa91" font-family="sans-serif">${escape(t('chartAxisTime',unitLong()))}</text><g clip-path="url(#plotclip)">`;
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
  const cx=X(time),cy=Y(current);
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
function stop(){playing=false;cancelAnimationFrame(frame);$('#play').textContent='▶';$('#play').setAttribute('aria-label',t('playAria'));}
function animate(stamp){if(!playing)return;if(lastStamp)time=Math.min(maxTime(),time+(stamp-lastStamp)/1000*(mode==='cooling'?6:3));lastStamp=stamp;renderLab();if(time>=maxTime())stop();else frame=requestAnimationFrame(animate);}
$('#play').addEventListener('click',()=>{if(playing){stop();return;}if(time>=maxTime())time=0;playing=true;lastStamp=0;$('#play').textContent='Ⅱ';$('#play').setAttribute('aria-label',t('pauseAria'));frame=requestAnimationFrame(animate);});
$('#time').addEventListener('input',e=>{stop();time=Number(e.target.value);renderLab();});
$('#controls').addEventListener('input',e=>{
  const id=e.target.dataset.param;if(!id)return;
  (mode==='cooling'?cp:bp)[id]=Number(e.target.value);
  const digits=id==='k'?4:['tau','amplitude','h'].includes(id)?1:id==='ratio'?2:0;
  const suffix=paramSuffix(id);
  $('#output-'+id).innerHTML=fmt(Number(e.target.value),digits)+` <small>${suffix}</small>`;
  renderLab();
});
$('#compare-controls').addEventListener('input',e=>{
  const id=e.target.dataset.bparam;if(!id)return;
  (mode==='cooling'?cpB:bpB)[id]=Number(e.target.value);
  const digits=id==='k'?4:['tau','amplitude'].includes(id)?1:id==='ratio'?2:0;
  const suffix=paramSuffix(id);
  $('#boutput-'+id).innerHTML=fmt(Number(e.target.value),digits)+` <small>${suffix}</small>`;renderLab();
});
$('#compare-scenarios').addEventListener('change',e=>{
  compareEnabled=e.target.checked;
  setupMode();
});
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;time=mode==='cooling'?20:24;stepIndex=0;predScenarioIndex=0;$('#prediction-feedback').hidden=true;setupMode();}));
$('#show-euler').addEventListener('change',e=>{showEuler=e.target.checked;$('#control-a-h').hidden=!showEuler;$('#euler-legend').hidden=!showEuler;renderLab();});
$('#show-steady').addEventListener('change',e=>{showSteady=e.target.checked;setupMode();});
$('#preset').addEventListener('click',()=>{if(mode==='cooling'){cp={ambient:20,initial:100,k:Math.log(2)/20,h:5};time=20;}else{bp={tau:4,ratio:Math.sqrt(16-(Math.PI/3)**2)-1,period:24,amplitude:12,setpoint:22};time=24;}setupMode();toast(mode==='cooling'?t('toastPresetCooling'):t('toastPresetBuilding'));});
let dragging=false;
function seek(e){const rect=$('#chart').getBoundingClientRect(),W=$('#chart').viewBox.baseVal.width,L=W===420?42:53,R=W===420?16:22;time=Math.max(0,Math.min(maxTime(),((e.clientX-rect.left)/rect.width*W-L)/(W-L-R)*maxTime()));time=Math.round(time*2)/2;stop();renderLab();}
$('#chart').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;dragging=true;$('#chart').setPointerCapture(e.pointerId);seek(e);});
$('#chart').addEventListener('pointermove',e=>{if(dragging)seek(e);});
$('#chart').addEventListener('pointerup',()=>dragging=false);
$('#chart').addEventListener('pointercancel',()=>dragging=false);
function download(name,text,type='text/plain;charset=utf-8'){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#export-svg').addEventListener('click',()=>{const svg=$('#chart').cloneNode(true);svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width','1170');svg.setAttribute('height','480');download(`${mode}-${t('svgFileSuffix')}`,new XMLSerializer().serializeToString(svg),'image/svg+xml');toast(t('toastExportSvg'));});
$('#export-csv').addEventListener('click',()=>{
  const lines=[mode==='cooling'?t('csvHeaderCooling'):t('csvHeaderBuilding')];
  for(let tVal=0;tVal<=maxTime();tVal+=0.5)lines.push(mode==='cooling'?[tVal,cooling(tVal,cp),eulerCooling(tVal,cp,cp.h),cp.ambient].map(n=>n.toFixed(6)).join(','):[tVal,building(tVal,bp),buildingSteady(tVal,bp),10+bp.amplitude*Math.sin(2*Math.PI*tVal/bp.period)].map(n=>n.toFixed(6)).join(','));
  download(`${mode}-${t('csvFileSuffix')}`,lines.join('\n'),'text/csv;charset=utf-8');toast(t('toastExportCsv'));
});

function updateProgress(){
  const prog=currentProgress();
  const stats=countLessonProgress(prog,currentLesson);
  $('#progress-label').textContent=`${stats.completed} / ${stats.total}`;
  $('#progress-bar').style.width=stats.percent+'%';
  $('#progress-subtitle').textContent=t('progressSub',currentLesson.questions.length);
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
  $('#exercises').innerHTML=questions.map((q,i)=>`<form class="panel exercise" data-question="${i}"><div class="exercise-top"><span>${String(i+1).padStart(2,'0')} / ${escape(q.tag)}${q.difficulty?`<span class="difficulty-badge">${escape(q.difficulty)}</span>`:''}</span><span class="exercise-status ${prog.solved.includes(i)?'solved':''}">${escape(prog.solved.includes(i)?t('statusSolved'):t('statusUnsolved'))}</span></div><h3>${formatMathText(q.title)}</h3><p>${formatMathText(q.text)}</p>${q.choices?`<div role="radiogroup" aria-label="${escape(q.title)}">${q.choices.map((c,j)=>`<label class="choice"><input type="radio" name="answer-${i}" value="${j}" required>${formatMathText(c)}</label>`).join('')}</div><button class="button primary" type="submit">${escape(t('checkChoiceBtn'))}</button>`:`<label for="answer-${i}">${escape(t('yourAnswerLabel',q.unit))}</label><div class="answer-line"><input id="answer-${i}" name="numeric" inputmode="decimal" placeholder="${escape(t('numericPlaceholder'))}" autocomplete="off" required aria-label="${escape(t('numericAria',q.title))}"><button class="button primary" type="submit">${escape(t('checkNumericBtn'))}</button></div>`}<p class="feedback" role="status" hidden></p><button class="text-button hint-button" type="button">${escape(t('openFirstHint'))}</button><ol class="hint-list"></ol>${q.solutionSummary?`<details class="solution-details"><summary>${escape(t('solutionSummaryLabel'))}</summary><p>${formatMathText(q.solutionSummary)}</p></details>`:''}</form>`).join('');
}
$('#exercises').addEventListener('submit',e=>{
  e.preventDefault();const form=e.target,i=Number(form.dataset.question),q=currentLesson.questions[i];let answer;
  if(q.choices)answer=Number(form.querySelector('input[type=radio]:checked')?.value);
  else answer=Number(form.querySelector('input[name=numeric]').value.trim().replace(',','.'));
  const correct=Number.isFinite(answer)&&(q.choices?answer===q.answer:Math.abs(answer-q.answer)<=q.tolerance),feedback=form.querySelector('.feedback');
  feedback.hidden=false;feedback.classList.toggle('wrong',!correct);feedback.innerHTML=formatMathText(correct?q.feedback:(currentLesson.presentation?.wrongFeedback||t('wrongFeedback')));
  if(correct){
    const prog=currentProgress();
    if(!prog.solved.includes(i))prog.solved.push(i);
    saveStore('progress',progressByLesson);
    form.querySelector('.exercise-status').textContent=t('statusSolved');
    form.querySelector('.exercise-status').classList.add('solved');
    updateProgress();
  }
});
$('#exercises').addEventListener('click',e=>{
  if(!e.target.matches('.hint-button'))return;
  const form=e.target.closest('form'),q=currentLesson.questions[Number(form.dataset.question)],list=form.querySelector('.hint-list'),n=list.children.length;
  if(n<q.hints.length){const li=document.createElement('li');li.innerHTML=formatMathText(q.hints[n]);list.append(li);}
  if(list.children.length===q.hints.length){e.target.textContent=t('allHintsOpen');e.target.disabled=true;}
  else e.target.textContent=t('openNextHint');
});

$('#notes').addEventListener('input',()=>{
  notesByLesson[currentLesson.id]=$('#notes').value;
  $('#save-status').textContent=saveStore('notes',notesByLesson)?t('savedForLessonStatus'):t('storageUnavailableStatus');
});
$('#export-notes').addEventListener('click',()=>{
  const fileSlug=`${t('notesFilePrefix')}-${currentLesson.section.replace('.','-')}.md`;
  download(fileSlug,`# §${currentLesson.section} · ${currentLesson.title}\n\n${t('notesExportSourceLine',currentBook.author,currentLesson.pages)}\n\n`+$('#notes').value);
  toast(t('toastExportNotes'));
});

function renderMap(){
  const rawSearch=$('#chapter-search').value.trim();
  const searchTr=rawSearch.toLocaleLowerCase('tr-TR');
  const searchEn=rawSearch.toLocaleLowerCase('en-US');
  const chapters=currentBook.chapters;
  let matches=0;
  $('#chapter-list').innerHTML=chapters.map((c,i)=>{
    const haystack=c.join(' ');
    const matched=!rawSearch||haystack.toLocaleLowerCase('tr-TR').includes(searchTr)||haystack.toLocaleLowerCase('en-US').includes(searchEn);
    if(!matched)return '';
    matches++;
    const title=lang==='en'?c[1]:c[0];
    const sections=(lang==='en'&&c[4]?c[4]:c[3]).split('|');
    const readyInChapter=sections.map(s=>findLessonBySection(currentBook,s.split(' ')[0])).filter(Boolean);
    const hasReady=readyInChapter.length>0;
    const badgeHtml=hasReady?readyInChapter.map(l=>`<span class="ready">${escape(t('mapReadyBadge',l.section))}</span>`).join(' '):escape(t('mapContentsOnly'));
    return `<details class="chapter-card" ${rawSearch||hasReady?'open':''}><summary><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><div><h3>${escape(title)}</h3><small>${escape(t('printedAndPdfShort',c[2],c[2]+currentBook.pdfPageOffset))} ${badgeHtml}</small></div><span class="chapter-arrow">＋</span></summary><ul>${sections.map(s=>{
      const secCode=s.split(' ')[0];
      const readyLesson=findLessonBySection(currentBook,secCode);
      return `<li>${readyLesson?`<a href="#lesson" data-map-lesson="${escape(readyLesson.id)}">${escape(s)} ${escape(t('mapGoToLesson'))}</a>`:escape(s)}</li>`;
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

let lessonRequest=0;
const lessonRepository=createLessonRepository();
async function loadLesson(){
  const lesson=currentLesson, selectedLanguage=lang, targetKey=`${lesson.id}:${selectedLanguage}`;
  if(loadedLessonKey===targetKey)return;
  const request=++lessonRequest;
  $('#lesson-content').innerHTML=`<p>${escape(t('lessonLoading'))}</p>`;
  try{
    const [{markdown,formulas},inline]=await Promise.all([
      lessonRepository.load(lesson),
      lesson.inlinePath?lessonRepository.loadMath(lesson.inlinePath).catch(()=>null):null
    ]);
    if(request!==lessonRequest||currentLesson.id!==lesson.id||lang!==selectedLanguage)return;
    const prepared=markdown.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g,(_,latex)=>`<div class="formula">${formulas[latex.trim()]}<details><summary>${escape(t('latexSourceLabel'))}</summary><code>${escape(latex.trim())}</code></details></div>`);
    const typeset=prepared.replace(/\\\((.+?)\\\)/g,(whole,latex)=>inline&&inline[latex.trim()]?`<span class="imath">${inline[latex.trim()]}</span>`:whole);
    const html=marked.parse(typeset);
    $('#lesson-content').innerHTML=html.replace(/<table>([\s\S]*?)<\/table>/g,'<div class="table-wrap"><table>$1</table></div>');
    loadedLessonKey=targetKey;
  }catch(error){
    if(request!==lessonRequest||currentLesson.id!==lesson.id||lang!==selectedLanguage)return;
    $('#lesson-content').innerHTML=`<h2>${escape(t('lessonLoadErrorTitle'))}</h2><p>${escape(t('lessonLoadErrorBody'))} <a href="${escape(lesson.lessonPath)}">${escape(t('lessonLoadDirectLink'))}</a></p>`;
    console.error(error);
  }
}

function syncContextUrl(){
  const url=new URL(location.href);
  url.searchParams.set('lesson',currentLesson.id);
  url.searchParams.set('lang',lang);
  history.replaceState(null,'',url);
}

const labHost=createLabHost({
  'heating-cooling':async()=>({mount:()=>{setupMode();return {update:()=>setupMode(),destroy:stop};}}),
  'introduction-modeling':()=>import('./labs/introduction/controller.js'),
  'separation':()=>import('./labs/separation/controller.js'),
  'transformation':()=>import('./labs/transformation/controller.js'),
  'exactness':()=>import('./labs/exactness/controller.js'),
  'linear':()=>import('./labs/linear/controller.js'),
  'solvable':()=>import('./labs/solvable/controller.js'),
  'reduction':()=>import('./labs/reduction/controller.js'),
  'operator':()=>import('./labs/operator/controller.js'),
  'complementary':()=>import('./labs/complementary/controller.js'),
  'particular':()=>import('./labs/particular/controller.js'),
  'linear-summary':()=>import('./labs/linear-summary/controller.js'),
  'laplace':()=>import('./labs/laplace/controller.js'),
  'heaviside':()=>import('./labs/heaviside/controller.js'),
  'dirac':()=>import('./labs/dirac/controller.js'),
  'inverse-laplace':()=>import('./labs/inverse-laplace/controller.js'),
  'laplace-ode':()=>import('./labs/laplace-ode/controller.js'),
  'laplace-applications':()=>import('./labs/laplace-applications/controller.js'),
  'laplace-summary':()=>import('./labs/laplace-summary/controller.js'),
  'summary':()=>import('./labs/summary/controller.js'),
  'concepts-foundations':()=>import('./labs/concepts/controller.js')
});
const studyGuide=createStudyGuide(document.querySelector('#lesson-guide'));
async function activateLab(){
  const lesson=currentLesson,selectedLanguage=lang,isHeating=lesson.labFamily==='heating-cooling';
  $('#heating-lab').hidden=!isHeating;
  $('#lesson-lab').hidden=isHeating;
  if(!isHeating)stop();
  try{
    studyGuide.update({lesson,lang:selectedLanguage,t:(key,...args)=>ui(selectedLanguage,key,...args)});
  }catch(e){
    console.error('Study guide update error:',e);
  }
  const root=isHeating?$('#heating-lab'):$('#lesson-lab');
  if(!isHeating&&!root.childElementCount)root.innerHTML=`<p role="status">${escape(t('labLoading'))}</p>`;
  try{
    await labHost.show(lesson.labFamily,root,{
      lesson,lang:selectedLanguage,
      t:(key,...args)=>ui(selectedLanguage,key,...args),
      format:(value,digits=1)=>Number(value).toLocaleString(selectedLanguage==='en'?'en-US':'tr-TR',{minimumFractionDigits:digits,maximumFractionDigits:digits}),
      loadMath:()=>lessonRepository.loadMath(lesson.mathPath)
    });
  }catch(error){
    if(currentLesson.id!==lesson.id||lang!==selectedLanguage)return;
    root.innerHTML=`<p role="alert">${escape(t('labLoadError'))}</p>`;
    console.error(error);
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
  $('#menu').setAttribute('aria-label',t('openMenuAria'));
  if(view!=='lab')stop();
  if(view==='library')renderLibrary();
  if(view==='lab')activateLab();
  if(view==='lesson')loadLesson();
  if(view==='map')renderMap();
}
window.addEventListener('hashchange',()=>{route();window.scrollTo(0,0);});
$('#menu').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));$('#menu').setAttribute('aria-label',open?t('closeMenuAria'):t('openMenuAria'));});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#sidebar').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');$('#menu').setAttribute('aria-label',t('openMenuAria'));}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();location.hash='map';setTimeout(()=>$('#chapter-search').focus(),20);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
window.addEventListener('resize',()=>{if(view==='lab'&&currentLesson.labFamily==='heating-cooling')renderChart();});

applyStaticTranslations();
applyActiveContext();
route();
if(!storageOK)$('#save-status').textContent=t('storageUnavailableStatus');
