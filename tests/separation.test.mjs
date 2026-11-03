import test from 'node:test';
import assert from 'node:assert/strict';
import {separableValue} from '../dist/models/separation.js';
import {getLesson} from '../dist/content.js';
import {readFileSync} from 'node:fs';
test('Separable IVPs retain zero equilibrium and stop at their connected pole boundary',()=>{
 for(const k of ['linear','square'])assert.equal(separableValue(k,1,0),0);
 assert.equal(separableValue('linear',0,2),2);
 assert.equal(separableValue('square',0,-2),-2);
 assert.ok(Number.isNaN(separableValue('square',1,1)));
 assert.ok(Number.isNaN(separableValue('square',-1,-1)));
 for(const kind of ['linear','square'])for(const x of [-.2,.2]){
  const h=1e-5,y=separableValue(kind,x,.5),dy=(separableValue(kind,x+h,.5)-separableValue(kind,x-h,.5))/(2*h);
  assert.ok(Math.abs(dy-(kind==='linear'?x*y:y*y))<1e-7);
 }
});
test('Section 2.1 has matching bilingual formulas and four worked midterm problems',()=>{
 const lesson=getLesson('xie-2010:2.1','tr').lesson;
 const blocks=p=>[...readFileSync('dist/'+p,'utf8').matchAll(/\$\$([\s\S]*?)\$\$/g)].map(m=>m[1].trim());
 assert.deepEqual(blocks(lesson.lessonPath),blocks(getLesson(lesson.id,'en').lesson.lessonPath));
 assert.equal(lesson.guidedTools.examClinic.length,4);
});

test('Logistic and tangent IVPs respect equilibria, derivatives and maximal intervals',async()=>{
 const {separableDomain,separableSlope}=await import('../dist/models/separation.js');
 assert.deepEqual(separableDomain('logistic',0),[-Infinity,Infinity]);
 assert.equal(separableValue('logistic',1,1),1);
 assert.ok(Math.abs(separableValue('logistic',0,.25)-.25)<1e-12);
 for(const y0 of [-1,.2,1.5])for(const x of [-.1,.1]){
  const h=1e-6,y=separableValue('logistic',x,y0,1.3);
  const slope=(separableValue('logistic',x+h,y0,1.3)-separableValue('logistic',x-h,y0,1.3))/(2*h);
  assert.ok(Math.abs(slope-separableSlope('logistic',x,y,1.3))<1e-7);
 }
 const pole=Math.log(2);
 assert.ok(Number.isNaN(separableValue('logistic',pole,-1)));
 const [lo,hi]=separableDomain('tangent',0,1);
 assert.ok(Math.abs(hi-Math.sqrt(Math.PI))<1e-12);assert.equal(lo,-hi);
 assert.ok(Number.isNaN(separableValue('tangent',hi,0)));
 const h=1e-6,x=.2,y=separableValue('tangent',x,.5,1.3);
 assert.ok(Math.abs((separableValue('tangent',x+h,.5,1.3)-separableValue('tangent',x-h,.5,1.3))/(2*h)-separableSlope('tangent',x,y,1.3))<1e-7);
});
