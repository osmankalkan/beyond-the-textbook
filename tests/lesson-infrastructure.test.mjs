import test from 'node:test';
import assert from 'node:assert/strict';
import {createLabHost} from '../dist/core/lab-host.js';
import {createLessonRepository} from '../dist/core/lesson-repository.js';

test('Lab registry reuses an instance on locale change and disposes on family change',async()=>{
  const events=[];
  const loader=name=>async()=>({mount:(_,context)=>{
    events.push(`${name}:mount:${context.lang}`);
    return {update:ctx=>events.push(`${name}:update:${ctx.lang}`),destroy:()=>events.push(`${name}:destroy`)};
  }});
  const host=createLabHost({intro:loader('intro'),heat:loader('heat')}),root={};
  await host.show('intro',root,{lang:'tr'});await host.show('intro',root,{lang:'en'});
  await host.show('heat',root,{lang:'en'});host.destroy();
  assert.deepEqual(events,['intro:mount:tr','intro:update:en','intro:destroy','heat:mount:en','heat:destroy']);
  await assert.rejects(host.show('unknown',root,{}),/Unknown lab family/);
});

test('A late lab import cannot replace the selected lab',async()=>{
  let release;const events=[];
  const slow=new Promise(resolve=>release=resolve);
  const host=createLabHost({
    slow:()=>slow,
    current:async()=>({mount:()=>{events.push('current');return {update(){},destroy(){}};}})
  });
  const stale=host.show('slow',{},{});
  await host.show('current',{},{});
  release({mount:()=>{events.push('stale');return {update(){},destroy(){}};}});
  await stale;assert.deepEqual(events,['current']);host.destroy();
});

test('Asset cache deduplicates math and permits retry after a failed request',async()=>{
  const requests=[];let fail=true;
  const repository=createLessonRepository(async path=>{
    requests.push(path);
    if(path==='math.json'&&fail){fail=false;return {ok:false};}
    return {ok:true,text:async()=>'$$ x=1 $$',json:async()=>({'x=1':'<math><mrow/></math>'})};
  });
  const lesson={lessonPath:'tr.md',mathPath:'math.json'};
  await assert.rejects(repository.load(lesson),/unavailable/);
  await repository.load(lesson);await repository.loadMath('math.json');
  assert.equal(requests.filter(path=>path==='tr.md').length,1);
  assert.equal(requests.filter(path=>path==='math.json').length,2);
});

test('Lesson loading refuses unreviewed formulas',async()=>{
  const repository=createLessonRepository(async()=>({ok:true,text:async()=>'$$ missing $$',json:async()=>({})}));
  await assert.rejects(repository.load({lessonPath:'a.md',mathPath:'m.json'}),/Missing reviewed formula/);
});
