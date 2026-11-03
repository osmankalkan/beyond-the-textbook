import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {projectileState,projectileFlightTime,mixingTankState,rk4Step} from '../dist/models.js';
import {BOOKS,getLesson,findLessonBySection,migrateNotesStore,migrateProgressStore} from '../dist/content.js';
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} differs from ${b}`);

test('Projectile vacuum limit, initial data and landing event',()=>{
  const p={speed:30,angle:45,mass:2,drag:0};
  const start=projectileState(0,p);close(start.x,0);close(start.y,0);
  close(start.vx,30/Math.sqrt(2));close(start.vy,30/Math.sqrt(2));
  const flight=projectileFlightTime(p);close(flight,2*start.vy/9.81);
  close(projectileState(flight,p).y,0);close(projectileState(flight,p).x,900/9.81);
  const smallDrag={...p,drag:1e-12};
  close(projectileState(2,smallDrag).y,projectileState(2,p).y,1e-8);
  close(projectileState(2,smallDrag).vy,projectileState(2,p).vy,1e-8);
  assert.equal(projectileFlightTime({...p,angle:0}),0);
});

test('Linear-drag projectile matches independent RK4 force integration',()=>{
  const p={speed:30,angle:45,mass:2,drag:.4};
  const h=.001,end=3,initial=projectileState(0,p);
  let vx=initial.vx,vy=initial.vy,x=0,y=0;
  // Integrate velocity independently; trapezoidal position is second-order.
  for(let i=0;i<end/h;i++){
    const nvx=rk4Step((_,v)=>-p.drag*v/p.mass,i*h,vx,h);
    const nvy=rk4Step((_,v)=>-9.81-p.drag*v/p.mass,i*h,vy,h);
    x+=(vx+nvx)*h/2;y+=(vy+nvy)*h/2;vx=nvx;vy=nvy;
  }
  const exact=projectileState(end,p);
  close(vx,exact.vx);close(vy,exact.vy);close(x,exact.x,1e-6);close(y,exact.y,2e-6);
  const flight=projectileFlightTime(p);
  close(projectileState(flight,p).y,0,1e-8);
  assert.ok(projectileState(flight-.01,p).y>0);
  assert.ok(projectileState(flight+.01,p).y<0);
  close(projectileState(end,{...p,mass:4,drag:.8}).x,exact.x);
});

test('Tank concentration respects amount balance for changing volume',()=>{
  const p={volume:100,initial:.1,inlet:.02,inflow:5,outflow:7};
  const time=10,eps=1e-4,state=mixingTankState(time,p);
  const finiteDifference=(mixingTankState(time+eps,p).pollutant-mixingTankState(time-eps,p).pollutant)/(2*eps);
  close(finiteDifference,p.inflow*p.inlet-p.outflow*state.concentration,1e-8);
  close(state.volume,80);
  close(mixingTankState(0,p).rate*100,-.4);
  const equal={...p,outflow:5};
  close(mixingTankState(20,equal).concentration,.02+.08*Math.exp(-1));
  close(mixingTankState(20,{...equal,outflow:5+1e-11}).concentration,mixingTankState(20,equal).concentration);
});

test('Tank validity: equilibrium, no inflow, dilution and emptying boundary',()=>{
  const p={volume:100,initial:.1,inlet:.02,inflow:0,outflow:5};
  close(mixingTankState(10,p).concentration,.1);
  close(mixingTankState(10,p).pollutant,5);
  assert.throws(()=>mixingTankState(20,p),RangeError);
  close(mixingTankState(10,{...p,initial:.02,inflow:5}).concentration,.02);
  const fill={...p,inflow:5,outflow:0,inlet:0};
  close(mixingTankState(20,fill).pollutant,10);
  close(mixingTankState(20,fill).concentration,.05);
  assert.throws(()=>mixingTankState(1,{...p,volume:0}),RangeError);
  assert.throws(()=>projectileState(1,{speed:20,angle:45,mass:0,drag:1}),RangeError);
});

test('First topic is bilingual, source-linked and isolated from legacy progress',async()=>{
  const tr=getLesson('xie-2010:1.1','tr'),en=getLesson('xie-2010:1.1','en');
  assert.equal(tr.lesson.section,'1.1');assert.equal(tr.lesson.modelingExamples.length,6);
  assert.equal(en.lesson.questions.length,6);assert.equal(tr.lesson.labFamily,'introduction-modeling');
  assert.equal(findLessonBySection(tr.book,'1.2')?.id,'xie-2010:1.2');
  assert.equal(findLessonBySection(tr.book,'2.1').id,'xie-2010:2.1');
  assert.equal(findLessonBySection(tr.book,'2.2').id,'xie-2010:2.2');
  assert.equal(findLessonBySection(tr.book,'2.3').id,'xie-2010:2.3');
  assert.equal(findLessonBySection(tr.book,'2.4').id,'xie-2010:2.4');
  assert.equal(findLessonBySection(tr.book,'3.1').id,'xie-2010:3.1');
  const notes=migrateNotesStore({'xie-2010:3.1':'Existing note'});
  assert.equal(notes['xie-2010:3.1'],'Existing note');assert.equal(notes['xie-2010:1.1'],'');
  const progress=migrateProgressStore({lesson:true,solved:[1,3]});
  assert.equal(progress['xie-2010:1.1'].lesson,false);
  assert.deepEqual(progress['xie-2010:1.1'].solved,[]);
  assert.deepEqual(progress['xie-2010:3.1'].solved,[1,3]);

  function checkPairs(value,path='catalog'){
    if(!value||typeof value!=='object')return;
    if('tr'in value||'en'in value){
      assert.deepEqual(Object.keys(value).sort(),['en','tr'],`Missing language: ${path}`);
      if(Array.isArray(value.tr))assert.equal(value.tr.length,value.en.length,path);
      assert.ok(value.tr&&value.en,path);
    }
    for(const [key,child]of Object.entries(value))checkPairs(child,`${path}.${key}`);
  }
  checkPairs(BOOKS);
  for(const book of BOOKS)for(const raw of book.lessons){
    const a=getLesson(raw.id,'tr').lesson,b=getLesson(raw.id,'en').lesson;
    const load=path=>fs.readFile(new URL('../dist/'+path,import.meta.url),'utf8');
    const [mdTr,mdEn,json]=await Promise.all([load(a.lessonPath),load(b.lessonPath),load(a.mathPath)]);
    const blocks=md=>[...md.matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m=>m[1].trim());
    assert.deepEqual(blocks(mdTr),blocks(mdEn));const mapping=JSON.parse(json);
    assert.deepEqual(Object.keys(mapping),blocks(mdTr));
    for(const math of Object.values(mapping))assert.match(math,/<math[^>]*><mrow>/);
    for(const question of a.questions){
      assert.ok(question.title&&question.text&&question.feedback&&question.hints.length);
      assert.ok(question.choices?question.answer>=0&&question.answer<question.choices.length:Number.isFinite(question.answer)&&question.tolerance>0);
    }
  }
});
