import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {solvableConstant,solvableDomain,solvablePoint,solvableSample,solvableSingular,solvableSingularDomain,solvableSingularSample,solvableSlope,solvableTangency,solvableValid} from '../dist/models/solvable.js';
import {getLesson} from '../dist/content.js';

const close=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);

test('Solvable families fix their parameter, point, slope and tangency',()=>{
  close(solvableConstant('clairaut-square',1.4),1.4);
  close(solvablePoint('clairaut-square',0,1)[1],1);
  close(solvableSlope('clairaut-square',0,1,1),1);
  close(solvableSingular('clairaut-square',2,1),-1);
  assert.deepEqual(solvableTangency('clairaut-square',1),[-2,-1]);

  close(solvablePoint('clairaut-inverse',1,1)[1],2);
  close(solvableSlope('clairaut-inverse',1,2,1),1);
  close(solvableSingular('clairaut-inverse',4,1),4);
  close(solvableSingular('clairaut-inverse',4,-1),-4);
  assert.deepEqual(solvableTangency('clairaut-inverse',1),[1,2]);

  close(solvablePoint('solvable-x-238',2,1)[1],Math.cbrt(7));
  close(solvableSlope('solvable-x-238',2,Math.cbrt(7),1),1/Math.cbrt(49));
  close(solvableSingular('solvable-x-238',3,1),-Math.cbrt(81/4));
  assert.deepEqual(solvableTangency('solvable-x-238',1),[-2/3,-1]);

  close(solvablePoint('solvable-y-236',2,1)[1],1.5);
  close(solvableSlope('solvable-y-236',2,1.5,1),2);
  assert.ok(Number.isNaN(solvableSingular('solvable-y-236',2,1)));
  assert.ok(solvableTangency('solvable-y-236',1).every(Number.isNaN));
});

test('Parameter validity and domains respect excluded branches',()=>{
  assert.equal(solvableValid('clairaut-square',0),true);
  assert.equal(solvableValid('clairaut-inverse',0),false);
  assert.equal(solvableValid('solvable-x-238',0),true);
  assert.equal(solvableValid('solvable-y-236',0),false);
  assert.equal(solvableValid('clairaut-square',Infinity),false);
  assert.throws(()=>solvableConstant('unknown',1),RangeError);
  assert.throws(()=>solvableConstant('clairaut-square',NaN),RangeError);
  assert.deepEqual(solvableDomain('clairaut-inverse',1),[-Infinity,Infinity]);
  assert.deepEqual(solvableSingularDomain('clairaut-inverse',1),[0,Infinity]);
  assert.equal(solvableSingularDomain('solvable-y-236',1),null);
  assert.ok(Number.isNaN(solvablePoint('clairaut-inverse',1,0)[1]));
  assert.ok(Number.isNaN(solvableSingular('clairaut-inverse',-1,1)));
  assert.throws(()=>solvableSample('clairaut-square',1,1,1),RangeError);
  assert.throws(()=>solvableSingularSample('clairaut-square',1,2,1),RangeError);
});

test('Every general and singular curve satisfies its differential equation',()=>{
  const cases=[['clairaut-square',1,0.6],['clairaut-inverse',-2,1.4],['solvable-x-238',1,1],['solvable-y-236',1,0.8]];
  const h=1e-6;
  for(const [kind,c,t]of cases){
    const point=solvablePoint(kind,t,c);
    assert.ok(point.every(Number.isFinite),kind);
    const before=solvablePoint(kind,t-h,c),after=solvablePoint(kind,t+h,c);
    const numerical=(after[1]-before[1])/(after[0]-before[0]);
    close(numerical,solvableSlope(kind,point[0],point[1],c),5e-4);
  }

  const squareX=1.3,squareY=-squareX*squareX/4,squareP=-squareX/2;
  close(squareY,squareX*squareP+squareP*squareP);

  const inverseX=2.5,inverseY=2*Math.sqrt(inverseX),inverseP=1/Math.sqrt(inverseX);
  close(inverseY,inverseX*inverseP+1/inverseP);

  const singularX=-2,singularY=-Math.cbrt(9*singularX*singularX/4);
  const singularP=-3*singularX/(2*singularY*singularY);
  close(singularY*singularY*singularP*singularP+3*singularX*singularP-singularY,0,1e-9);

  const samples=solvableSample('solvable-x-238',1,-2,2,40);
  assert.equal(samples.length,41);
  assert.ok(samples.every(point=>point.every(Number.isFinite)));
});

test('Section 2.5 has bilingual formulas, two study paths and four scored clinic cases',()=>{
  const tr=getLesson('xie-2010:2.5','tr').lesson,en=getLesson('xie-2010:2.5','en').lesson;
  const blocks=p=>[...readFileSync('dist/'+p,'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m=>m[1].trim());
  const trBlocks=blocks(tr.lessonPath),enBlocks=blocks(en.lessonPath);
  assert.deepEqual(trBlocks,enBlocks);
  assert.equal(new Set(trBlocks).size,trBlocks.length);
  assert.equal(trBlocks.length,42);
  assert.equal(tr.questions.length,11);assert.equal(en.questions.length,11);
  assert.equal(tr.labFamily,'solvable');
  assert.equal(tr.studySupport.paths.length,2);
  for(const path of tr.studySupport.paths)assert.equal(path.steps.length,5);
  assert.equal(tr.studySupport.predictions.length,2);
  assert.equal(tr.guidedTools.examClinic.length,4);
  for(const item of tr.guidedTools.examClinic){assert.ok(item.statement&&item.trap);assert.equal(item.steps.length,5);assert.match(item.badge,/5 PUAN/);}
  const mapping=JSON.parse(readFileSync('dist/'+tr.mathPath,'utf8'));
  assert.deepEqual(Object.keys(mapping),trBlocks);
  for(const math of Object.values(mapping))assert.match(math,/<math[^>]*><mrow>/);
});

test('Section 2.5 renders every inline formula and keeps prose free of raw LaTeX',()=>{
  const tr=getLesson('xie-2010:2.5','tr').lesson,en=getLesson('xie-2010:2.5','en').lesson;
  assert.equal(tr.inlinePath,'lessons/xie-2010/2-5/inline.json');
  const tokens=path=>[...readFileSync('dist/'+path,'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m=>m[1].trim());
  const trTokens=tokens(tr.lessonPath),enTokens=tokens(en.lessonPath);
  assert.deepEqual([...new Set(trTokens)].sort(),[...new Set(enTokens)].sort());
  assert.ok(trTokens.length>120);
  const inline=JSON.parse(readFileSync('dist/'+tr.inlinePath,'utf8'));
  assert.deepEqual(Object.keys(inline).sort(),[...new Set(trTokens)].sort());
  for(const math of Object.values(inline)){
    assert.ok(!math.includes('display="block"'));
    assert.match(math,/<math[^>]*><mrow>/);
    assert.ok(!math.includes('&lt;mi&gt;'));
    assert.ok(!math.includes('|'),'inline MathML must encode pipes as &#124; so tables keep their cells');
  }
});
