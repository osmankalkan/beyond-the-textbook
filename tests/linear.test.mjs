import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {linearAuxiliary,linearConstant,linearDomain,linearInitial,linearMode,linearPoint,linearSample,linearSlope,linearValid} from '../dist/models/linear.js';
import {getLesson} from '../dist/content.js';

const close=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);

test('Linear and Bernoulli families fix their constant, initial point and auxiliary value',()=>{
  close(linearConstant('linear-tan',1),1);
  assert.deepEqual(linearInitial('linear-tan',1),[0,1]);
  close(linearPoint('linear-tan',0,1)[1],1);
  close(linearSlope('linear-tan',0,1),1);
  close(linearAuxiliary('linear-tan',0,1),1);

  const cLinear=(1+2*Math.E)/(Math.E*Math.E);
  close(linearConstant('linear-y',1),cLinear);
  assert.deepEqual(linearInitial('linear-y',1),[1,1]);
  close(linearPoint('linear-y',1,1)[0],1);
  close(linearSlope('linear-y',1,1),1/Math.E);
  close(linearAuxiliary('linear-y',1,1),Math.exp(-2));

  close(linearConstant('bernoulli-33',1.2),2.44);
  assert.deepEqual(linearInitial('bernoulli-33',1.2),[1,1.2]);
  close(linearPoint('bernoulli-33',1,1.2)[1],1.2);
  close(linearSlope('bernoulli-33',1,1.2),(1.44-2)/2.4);
  close(linearAuxiliary('bernoulli-33',1,1.2),1.44);

  close(linearConstant('bernoulli-34',1.1),(4/1.331-3)/4);
  assert.deepEqual(linearInitial('bernoulli-34',1.1),[1.1,1]);
  close(linearPoint('bernoulli-34',1,1.1)[0],1.1);
  close(linearSlope('bernoulli-34',1.1,1),3/1.1);
  close(linearAuxiliary('bernoulli-34',1.1,1),1.1**-3);

  assert.equal(linearMode('linear-tan'),'y');assert.equal(linearMode('linear-y'),'x');
  assert.equal(linearMode('bernoulli-33'),'y');assert.equal(linearMode('bernoulli-34'),'x');
  assert.throws(()=>linearConstant('unknown',1),RangeError);
});

test('Domains and invalid data respect poles and Bernoulli branches',()=>{
  assert.deepEqual(linearDomain('linear-tan',1),[-Math.PI/2,Math.PI/2]);
  assert.deepEqual(linearDomain('linear-y',1),[0,Infinity]);
  const c=2.44;
  assert.deepEqual(linearDomain('bernoulli-33',1.2),[0,Math.sqrt(c)]);
  assert.deepEqual(linearDomain('bernoulli-34',1.1),[0,Infinity]);

  assert.equal(linearValid('linear-tan',-2),true);
  assert.equal(linearValid('linear-y',-1),true);
  assert.equal(linearValid('bernoulli-33',1),true);
  assert.equal(linearValid('bernoulli-33',0),false);
  assert.equal(linearValid('bernoulli-33',-1),false);
  assert.equal(linearValid('bernoulli-34',0),false);
  assert.throws(()=>linearConstant('bernoulli-33',0),RangeError);
  assert.throws(()=>linearConstant('bernoulli-34',0),RangeError);
  assert.ok(Number.isNaN(linearPoint('linear-tan',Math.PI/2,1)[1]));
  assert.ok(Number.isNaN(linearPoint('bernoulli-33',-0.2,1)[1]));
  assert.throws(()=>linearSample('linear-tan',1,1,1),RangeError);
});

test('Every analytic family satisfies its differential equation on the selected branch',()=>{
  const cases=[['linear-tan',1,0.4],['linear-y',1,1.3],['bernoulli-33',1.2,1.2],['bernoulli-34',1.1,1.4]];
  const h=1e-5;
  for(const [kind,a,t]of cases){
    const point=linearPoint(kind,t,a);
    assert.ok(point.every(Number.isFinite),kind);
    const before=linearPoint(kind,t-h,a),after=linearPoint(kind,t+h,a);
    const numerical=(after[1]-before[1])/(after[0]-before[0]);
    close(numerical,linearSlope(kind,point[0],point[1]),5e-3);
  }
  const samples=linearSample('linear-y',1,0.2,2,40);
  assert.equal(samples.length,41);
  assert.ok(samples.every(point=>point.every(Number.isFinite)));
});

test('Section 2.4 has bilingual formulas, two study paths and four scored clinic cases',()=>{
  const tr=getLesson('xie-2010:2.4','tr').lesson,en=getLesson('xie-2010:2.4','en').lesson;
  const blocks=p=>[...readFileSync('dist/'+p,'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m=>m[1].trim());
  const trBlocks=blocks(tr.lessonPath),enBlocks=blocks(en.lessonPath);
  assert.deepEqual(trBlocks,enBlocks);
  assert.equal(new Set(trBlocks).size,trBlocks.length);
  assert.equal(trBlocks.length,62);
  assert.equal(tr.questions.length,11);assert.equal(en.questions.length,11);
  assert.equal(tr.labFamily,'linear');
  assert.equal(tr.studySupport.paths.length,2);
  for(const path of tr.studySupport.paths)assert.equal(path.steps.length,5);
  assert.equal(tr.studySupport.predictions.length,2);
  assert.equal(tr.guidedTools.examClinic.length,4);
  for(const item of tr.guidedTools.examClinic){assert.ok(item.statement&&item.trap);assert.equal(item.steps.length,5);assert.match(item.badge,/5 PUAN/);}
  const mapping=JSON.parse(readFileSync('dist/'+tr.mathPath,'utf8'));
  assert.deepEqual(Object.keys(mapping),trBlocks);
  for(const math of Object.values(mapping))assert.match(math,/<math[^>]*><mrow>/);
});

test('Section 2.4 renders every inline formula and keeps prose free of raw LaTeX',()=>{
  const tr=getLesson('xie-2010:2.4','tr').lesson,en=getLesson('xie-2010:2.4','en').lesson;
  assert.equal(tr.inlinePath,'lessons/xie-2010/2-4/inline.json');
  const tokens=path=>[...readFileSync('dist/'+path,'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m=>m[1].trim());
  const trTokens=tokens(tr.lessonPath),enTokens=tokens(en.lessonPath);
  assert.deepEqual([...new Set(trTokens)].sort(),[...new Set(enTokens)].sort());
  assert.ok(trTokens.length>70);
  const inline=JSON.parse(readFileSync('dist/'+tr.inlinePath,'utf8'));
  assert.deepEqual(Object.keys(inline).sort(),[...new Set(trTokens)].sort());
  for(const math of Object.values(inline)){
    assert.ok(!math.includes('display="block"'));
    assert.match(math,/<math[^>]*><mrow>/);
    assert.ok(!math.includes('&lt;mi&gt;'));
    assert.ok(!math.includes('\\'));
    assert.ok(!math.includes('|'),'inline MathML must encode pipes as &#124; so tables keep their cells');
  }
});
