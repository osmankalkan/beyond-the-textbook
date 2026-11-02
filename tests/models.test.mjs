import test from 'node:test';
import assert from 'node:assert/strict';
import {cooling,calibrateK,targetTime,halfLife,eulerCooling,building,buildingSteady,buildingTransient,buildingMetrics,rk4Step} from '../dist/models.js';
import {BOOKS,LEGACY_LESSON_ID,getBook,getLesson,findLessonBySection,migrateProgressStore,migrateNotesStore,countLessonProgress} from '../dist/content.js';
import {UI_STRINGS,normalizeLang,pickLang} from '../dist/i18n.js';
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const p={ambient:20,initial:100,k:Math.log(2)/20};
test('Book example 3.1: calibration, intermediate observation, total and remaining time',()=>{
  close(calibrateK(100,20,60,20),p.k);close(cooling(20,p),60);close(targetTime(30,p),60);close(targetTime(30,p)-20,40);close(halfLife(p.k),20);
});
test('Equilibrium, heating, and unreachable targets',()=>{
  close(cooling(100,{ambient:20,initial:20,k:0.1}),20);
  const warm={ambient:30,initial:10,k:0.1};close(cooling(targetTime(20,warm),warm),20);
  assert.equal(targetTime(20,p),null);assert.equal(targetTime(10,p),null);assert.equal(targetTime(100,p),0);
});
test('Euler converges as step decreases',()=>{
  const exact=cooling(40,p);assert.ok(Math.abs(eulerCooling(40,p,0.5)-exact)<Math.abs(eulerCooling(40,p,5)-exact));
});
test('Building initial condition and independently integrated forced ODE',()=>{
  const p={tau:4,ratio:1,period:24,amplitude:12,setpoint:22};close(building(0,p),22);
  let y=22,t=0,h=0.01;
  const f=(t,y)=> (-(1+p.ratio)*(y-p.setpoint)+p.amplitude*Math.sin(2*Math.PI*t/p.period))/p.tau;
  for(let i=0;i<4800;i++){y=rk4Step(f,t,y,h);t+=h;}
  close(building(48,p),y,1e-7);
});
test('Book example 3.2: required thermostat gain gives 3-degree amplitude',()=>{
  const ratio=Math.sqrt(16-(Math.PI/3)**2)-1;
  close(buildingMetrics({tau:4,ratio,period:24,amplitude:12}).amplitude,3);
});
test('Content catalog and legacy notes/progress migration',()=>{
  const {book,lesson}=getLesson(LEGACY_LESSON_ID);
  assert.equal(book.id,'xie-2010');
  assert.equal(lesson.section,'3.1');
  assert.equal(findLessonBySection(book,'3.1')?.id,LEGACY_LESSON_ID);
  assert.equal(findLessonBySection(book,'3.2'),null);

  const migratedProg=migrateProgressStore({lesson:true,solved:[0,2,99,-1,2]});
  assert.deepEqual(migratedProg[LEGACY_LESSON_ID],{lesson:true,solved:[0,2]});
  assert.deepEqual(countLessonProgress(migratedProg[LEGACY_LESSON_ID],lesson),{completed:3,total:9,percent:33});

  const alreadyKeyedProg=migrateProgressStore({[LEGACY_LESSON_ID]:{lesson:false,solved:[1,3,5,7]}});
  assert.deepEqual(alreadyKeyedProg[LEGACY_LESSON_ID],{lesson:false,solved:[1,3,5,7]});

  const migratedNotes=migrateNotesStore('Eski §3.1 notum');
  assert.equal(migratedNotes[LEGACY_LESSON_ID],'Eski §3.1 notum');

  const alreadyKeyedNotes=migrateNotesStore({[LEGACY_LESSON_ID]:'Yeni anahtarlı not'});
  assert.equal(alreadyKeyedNotes[LEGACY_LESSON_ID],'Yeni anahtarlı not');

  assert.equal(lesson.guidedTools.stepByStep.cooling.length,5);
  assert.equal(lesson.guidedTools.stepByStep.building.length,5);
  assert.equal(lesson.guidedTools.examClinic.length,2);
  assert.equal(lesson.questions.length,8);
  close(lesson.guidedTools.prediction.cooling[0].expected,cooling(20,{ambient:20,initial:100,k:Math.log(2)/10}));
  close(lesson.guidedTools.prediction.building[0].expected,buildingMetrics({tau:4,ratio:0,period:24,amplitude:12}).amplitude);

  const bp={tau:4,ratio:1,period:24,amplitude:12,setpoint:22};
  close(building(15,bp),buildingSteady(15,bp)+buildingTransient(15,bp));

  assert.equal(normalizeLang('en'),'en');
  assert.equal(normalizeLang('tr'),'tr');
  assert.equal(normalizeLang('other'),'tr');
  assert.equal(pickLang(lesson.title,'tr'),'Isınma ve soğuma');
  assert.equal(pickLang(lesson.title,'en'),'Heating and cooling');
  assert.equal(pickLang(lesson.lessonPath,'tr'),'lesson.md');
  assert.equal(pickLang(lesson.lessonPath,'en'),'lesson-en.md');
  assert.deepEqual(Object.keys(UI_STRINGS.tr).sort(),Object.keys(UI_STRINGS.en).sort());
  for(const q of lesson.questions){
    assert.ok(pickLang(q.title,'tr')&&pickLang(q.title,'en'));
    assert.ok(pickLang(q.text,'tr')&&pickLang(q.text,'en'));
    assert.ok(pickLang(q.feedback,'tr')&&pickLang(q.feedback,'en'));
    assert.equal(pickLang(q.hints,'tr').length,pickLang(q.hints,'en').length);
  }
});

test('Bilingual TR/EN localization and formula synchronization',async()=>{
  const fs=await import('node:fs/promises');
  const trBundle=getLesson(LEGACY_LESSON_ID,'tr');
  const enBundle=getLesson(LEGACY_LESSON_ID,'en');
  assert.equal(trBundle.lesson.title,'Isınma ve soğuma');
  assert.equal(enBundle.lesson.title,'Heating and cooling');
  assert.equal(trBundle.lesson.lessonPath,'lesson.md');
  assert.equal(enBundle.lesson.lessonPath,'lesson-en.md');
  assert.equal(trBundle.lesson.downloadName,'isinma-ve-soguma.md');
  assert.equal(enBundle.lesson.downloadName,'heating-and-cooling.md');
  assert.equal(trBundle.lesson.highlights.length,enBundle.lesson.highlights.length);
  assert.equal(trBundle.lesson.questions.length,enBundle.lesson.questions.length);

  for(const chap of trBundle.book.chapters){
    assert.equal(chap.length,5);
    assert.equal(chap[3].split('|').length,chap[4].split('|').length);
  }

  const [mdTr,mdEn,mathJson]=await Promise.all([
    fs.readFile(new URL('../dist/lesson.md',import.meta.url),'utf8'),
    fs.readFile(new URL('../dist/lesson-en.md',import.meta.url),'utf8'),
    fs.readFile(new URL('../dist/math.json',import.meta.url),'utf8')
  ]);
  const extractBlocks=md=>[...md.matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m=>m[1].trim());
  const trBlocks=extractBlocks(mdTr);
  const enBlocks=extractBlocks(mdEn);
  const mathMap=JSON.parse(mathJson);
  assert.equal(trBlocks.length,9);
  assert.deepEqual(trBlocks,enBlocks);
  for(const latex of trBlocks){
    assert.ok(mathMap[latex],`Missing MathML for: ${latex}`);
    assert.ok(mathMap[latex].includes('<mrow>'),`Missing explicit <mrow> in MathML for: ${latex}`);
  }
});
