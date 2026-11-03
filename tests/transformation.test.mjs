import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {transformationConstant,transformationDomain,transformationValue,transformationSlope} from '../dist/models/transformation.js';
import {getLesson} from '../dist/content.js';

const close=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);

test('Transformation families fix their constant, branch and connected interval',()=>{
  close(transformationConstant('circle',1,1),2);
  assert.deepEqual(transformationDomain('circle',1,1),[0,2]);
  close(transformationValue('circle',1,1,1),1);
  close(transformationSlope('circle',1,1),0);
  assert.ok(Number.isNaN(transformationValue('circle',0,1,1)));
  assert.ok(Number.isNaN(transformationValue('circle',2,1,1)));
  assert.throws(()=>transformationConstant('circle',1,0),RangeError);

  close(transformationConstant('ellipse',1,1.5),1.75);
  const ellipseBound=2*Math.sqrt(1.75/3);
  const [ellipseLow,ellipseHigh]=transformationDomain('ellipse',1,1.5);
  close(ellipseLow,-ellipseBound);close(ellipseHigh,ellipseBound);
  close(transformationValue('ellipse',1,1,1.5),1.5);
  close(transformationSlope('ellipse',1,1.5),-.25);
  assert.throws(()=>transformationConstant('ellipse',1,.5),RangeError);

  const sumConstant=Math.atan(1.5)-1;
  close(transformationConstant('sum',1,.5),sumConstant);
  const [sumLow,sumHigh]=transformationDomain('sum',1,.5);
  close(sumLow,-sumConstant-Math.PI/2);close(sumHigh,-sumConstant+Math.PI/2);
  close(transformationValue('sum',1,1,.5),.5);
  close(transformationSlope('sum',1,.5),2.25);
  assert.ok(Number.isNaN(transformationValue('sum',sumHigh,1,.5)));

  const radicalConstant=Math.sqrt(1-.36)-1;
  close(transformationConstant('radical',1,.6),radicalConstant);
  const [radicalLow,radicalHigh]=transformationDomain('radical',1,.6);
  close(radicalLow,-radicalConstant);assert.equal(radicalHigh,Infinity);
  close(transformationValue('radical',1,1,.6),.6);
  close(transformationSlope('radical',1,.6),1/3);
  assert.throws(()=>transformationConstant('radical',1,0),RangeError);
  assert.throws(()=>transformationConstant('radical',1,1),RangeError);
});

test('Every analytic family satisfies its slope field on the selected branch',()=>{
  const data={circle:[1,1],ellipse:[1,1.5],sum:[1,.5],radical:[1,.6]};
  for(const [kind,[x0,y0]] of Object.entries(data)){
    for(const x of [x0-.1,x0+.1]){
      const h=1e-6,y=transformationValue(kind,x,x0,y0);
      assert.ok(Number.isFinite(y),`${kind} value at ${x}`);
      const numeric=(transformationValue(kind,x+h,x0,y0)-transformationValue(kind,x-h,x0,y0))/(2*h);
      close(numeric,transformationSlope(kind,x,y),1e-6);
    }
  }
  assert.ok(Number.isNaN(transformationSlope('circle',1,0)));
  assert.ok(Number.isNaN(transformationSlope('ellipse',1,.5)));
  assert.ok(Number.isNaN(transformationSlope('radical',1,0)));
});

test('Section 2.2 has bilingual formulas, two study paths and four scored clinic cases',()=>{
  const tr=getLesson('xie-2010:2.2','tr').lesson,en=getLesson('xie-2010:2.2','en').lesson;
  const blocks=p=>[...readFileSync('dist/'+p,'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m=>m[1].trim());
  const trBlocks=blocks(tr.lessonPath),enBlocks=blocks(en.lessonPath);
  assert.deepEqual(trBlocks,enBlocks);
  assert.equal(new Set(trBlocks).size,trBlocks.length);
  assert.equal(trBlocks.length,28);
  assert.equal(tr.questions.length,11);assert.equal(en.questions.length,11);
  assert.equal(tr.labFamily,'transformation');
  assert.equal(tr.studySupport.paths.length,2);
  for(const path of tr.studySupport.paths)assert.equal(path.steps.length,5);
  assert.equal(tr.studySupport.predictions.length,2);
  assert.equal(tr.guidedTools.examClinic.length,4);
  for(const item of tr.guidedTools.examClinic){assert.ok(item.statement&&item.trap);assert.equal(item.steps.length,5);assert.match(item.badge,/5 PUAN/);}
  const mapping=JSON.parse(readFileSync('dist/'+tr.mathPath,'utf8'));
  assert.deepEqual(Object.keys(mapping),trBlocks);
  for(const math of Object.values(mapping))assert.match(math,/<math[^>]*><mrow>/);
});

test('Section 2.2 renders every inline formula and keeps prose free of raw LaTeX',()=>{
  const tr=getLesson('xie-2010:2.2','tr').lesson,en=getLesson('xie-2010:2.2','en').lesson;
  assert.equal(tr.inlinePath,'lessons/xie-2010/2-2/inline.json');
  const tokens=path=>[...readFileSync('dist/'+path,'utf8').matchAll(/\\\((.+?)\\\)/g)].map(m=>m[1].trim());
  const trTokens=tokens(tr.lessonPath),enTokens=tokens(en.lessonPath);
  assert.deepEqual([...new Set(trTokens)].sort(),[...new Set(enTokens)].sort());
  assert.ok(trTokens.length>150);
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
