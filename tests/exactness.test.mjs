import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {exactnessConstant,exactnessPotential,exactnessResidual,exactnessMultiplier,exactnessSlope,exactnessLevel,exactnessContour} from '../dist/models/exactness.js';
import {cartesianPlot} from '../dist/core/cartesian-plot.js';
import {getLesson} from '../dist/content.js';

const close=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);

test('Exactness families fix their constant, multiplier, residual and slope',()=>{
  close(exactnessConstant('exact',1,1),3);
  close(exactnessPotential('exact',1,1),3);
  close(exactnessMultiplier('exact',1,1),1);
  close(exactnessResidual('exact',1,1),0);
  close(exactnessSlope('exact',1,1),-1);
  close(exactnessLevel('exact',2,0,1,1),1);
  assert.throws(()=>exactnessConstant('exact',0,0),RangeError);
  assert.throws(()=>exactnessConstant('exact',1,-.5),RangeError);

  const factorX=Math.E*1.4*.6;
  close(exactnessConstant('factor-x',1,1.4),factorX);
  close(exactnessMultiplier('factor-x',1,1.4),Math.E);
  close(exactnessResidual('factor-x',1,1.4),-.8);
  close(exactnessSlope('factor-x',1,1.4),-(1.4*(2-1.4+2))/(2*(1-1.4)));
  assert.throws(()=>exactnessConstant('factor-x',1,0),RangeError);
  assert.throws(()=>exactnessConstant('factor-x',1,2),RangeError);

  close(exactnessConstant('factor-y',1,1.2),1.2+.72-Math.log(1.2));
  close(exactnessMultiplier('factor-y',1,1.2),1/1.2);
  close(exactnessResidual('factor-y',1,1.2),1.2);
  close(exactnessSlope('factor-y',1,1.2),-1.44/(1.2+1.44-1));
  assert.throws(()=>exactnessConstant('factor-y',1,0),RangeError);

  close(exactnessConstant('inspection',1,1),Math.log(2)+2);
  close(exactnessMultiplier('inspection',1,1),1/2);
  close(exactnessResidual('inspection',1,1),1);
  close(exactnessSlope('inspection',1,1),-2);
  assert.throws(()=>exactnessConstant('inspection',0,1),RangeError);
  assert.throws(()=>exactnessConstant('inspection',1,0),RangeError);
  assert.throws(()=>exactnessConstant('unknown',1,1));
});

test('Contour segments stay on the level curve and respect family domains',()=>{
  const level=exactnessConstant('exact',1,1);
  const segments=exactnessContour('exact',level,-2.5,3.5,-3,3,80,80);
  assert.ok(segments.length>20);
  for(const [[ax,ay],[bx,by]]of segments){
    close(exactnessPotential('exact',ax,ay),level,1e-2);
    close(exactnessPotential('exact',bx,by),level,1e-2);
  }
  const factorY=exactnessConstant('factor-y',1,1.2);
  const positive=exactnessContour('factor-y',factorY,-1.5,3.5,.05,4,80,80);
  assert.ok(positive.length>5);
  for(const segment of positive)for(const[,y]of segment)assert.ok(y>0);
  assert.throws(()=>exactnessContour('exact',level,1,1,0,1),RangeError);
  assert.throws(()=>exactnessContour('exact',level,-1,1,0,1,1,10),RangeError);
});

test('Plot lines keep a single explicit stroke width',()=>{
  const plot=cartesianPlot({xMin:-1,xMax:1,yMin:-1,yMax:1});
  const custom=plot.line([[0,0],[1,1]],'#397752','stroke-width="1.9"');
  assert.equal((custom.match(/stroke-width=/g)||[]).length,1);
  assert.match(custom,/stroke-width="1.9"/);
  const dashed=plot.line([[0,0],[1,1]],'#397752','stroke-dasharray="4 4"');
  assert.equal((dashed.match(/stroke-width=/g)||[]).length,1);
  assert.match(dashed,/stroke-width="2.5"/);
});

test('Section 2.3 has bilingual formulas, two study paths and four scored clinic cases',()=>{
  const tr=getLesson('xie-2010:2.3','tr').lesson,en=getLesson('xie-2010:2.3','en').lesson;
  const blocks=p=>[...readFileSync('dist/'+p,'utf8').matchAll(/\$\$\s*([\s\S]*?)\s*\$\$/g)].map(m=>m[1].trim());
  const trBlocks=blocks(tr.lessonPath),enBlocks=blocks(en.lessonPath);
  assert.deepEqual(trBlocks,enBlocks);
  assert.equal(new Set(trBlocks).size,trBlocks.length);
  assert.equal(trBlocks.length,90);
  assert.equal(tr.questions.length,11);assert.equal(en.questions.length,11);
  assert.equal(tr.labFamily,'exactness');
  assert.equal(tr.studySupport.paths.length,2);
  for(const path of tr.studySupport.paths)assert.equal(path.steps.length,5);
  assert.equal(tr.studySupport.predictions.length,2);
  assert.equal(tr.guidedTools.examClinic.length,4);
  for(const item of tr.guidedTools.examClinic){assert.ok(item.statement&&item.trap);assert.equal(item.steps.length,5);assert.match(item.badge,/5 PUAN/);}
  const mapping=JSON.parse(readFileSync('dist/'+tr.mathPath,'utf8'));
  assert.deepEqual(Object.keys(mapping),trBlocks);
  for(const math of Object.values(mapping))assert.match(math,/<math[^>]*><mrow>/);
});
