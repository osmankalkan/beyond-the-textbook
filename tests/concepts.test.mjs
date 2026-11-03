import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {lineFamily,lineInitialConstant,fallingBody,fallingBoundaryVelocity,regularInitialSolution,regularExistenceBound,singularInitialCase,singularBranch,delayedBranch,odeCandidate,heatCandidate} from '../dist/models.js';
import {getLesson,findLessonBySection,migrateNotesStore,migrateProgressStore,countLessonProgress} from '../dist/content.js';
const close=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);

test('Solution family: an initial point selects exactly its line constant',()=>{
  for(const [x0,y0]of [[0,1],[2,1],[-1,3],[.5,-2]]){
    const c=lineInitialConstant(x0,y0);close(lineFamily(x0,c),y0);
    close((lineFamily(x0+.01,c)-lineFamily(x0-.01,c))/.02,3);
  }
});

test('Falling-body IVP and BVP use downward-positive coordinates',()=>{
  const velocity=fallingBoundaryVelocity({time:2,distance:30});close(velocity,5.19);
  close(fallingBody(0,{velocity}).position,0);close(fallingBody(0,{velocity}).velocity,velocity);
  close(fallingBody(2,{velocity}).position,30);
  const upward=fallingBoundaryVelocity({time:3,distance:10});assert.ok(upward<0);
  close(fallingBody(3,{velocity:upward}).position,10);
  assert.throws(()=>fallingBoundaryVelocity({time:0,distance:1}),RangeError);
});

test('Regular IVP solution and conservative local existence bound',()=>{
  const p={x0:.5,y0:-1,a:.75,b:1.25};
  close(regularInitialSolution(p.x0,p).value,p.y0);
  for(const x of [-1,0,1]){
    const h=1e-5,derivative=(regularInitialSolution(x+h,p).value-regularInitialSolution(x-h,p).value)/(2*h);
    close(derivative,regularInitialSolution(x,p).value-x,1e-8);
  }
  const corners=[p.y0-p.b-p.x0+p.a,p.y0-p.b-p.x0-p.a,p.y0+p.b-p.x0+p.a,p.y0+p.b-p.x0-p.a];
  const bound=regularExistenceBound(p);close(bound.maximum,Math.max(...corners.map(Math.abs)));
  close(bound.h,Math.min(p.a,p.b/bound.maximum));
});

test('Book Example 1.1 distinguishes local uniqueness, no solution, and many C1 branches',()=>{
  assert.equal(singularInitialCase({x0:1,y0:2}).kind,'locally-unique');
  close(singularInitialCase({x0:-1,y0:2}).constant,2);
  assert.equal(singularInitialCase({x0:0,y0:1}).kind,'no-solution');
  assert.equal(singularInitialCase({x0:0,y0:0}).kind,'infinitely-many');
  const p={left:-1,right:2};
  for(const x of [-2,-.5,0,.5,2]){const y=singularBranch(x,p);close(x*y.derivative,2*y.value);}
  const epsilon=1e-7;
  close(singularBranch(0,p).value,0);close(singularBranch(0,p).derivative,0);
  close((singularBranch(epsilon,p).value-singularBranch(-epsilon,p).value)/(2*epsilon),0,1e-6);
});

test('Continuous non-Lipschitz field admits distinct delayed solutions with the same initial data',()=>{
  for(const wait of [0,.75,1.5]){
    close(delayedBranch(0,wait).value,0);
    for(const x of [-1,0,wait,wait+.1,2]){const y=delayedBranch(x,wait);close(y.derivative,Math.sqrt(Math.abs(y.value)));}
  }
  assert.notEqual(delayedBranch(1,0).value,delayedBranch(1,1.5).value);
});

test('Book Example 1.2: analytical derivatives and coefficient identity hold for free constants',()=>{
  for(const c1 of [-2,0,1])for(const c2 of [-1,0,2])for(const x of [-.5,0,.5,1.5]){
    const p={c1,c2},y=odeCandidate(x,p),h=1e-5;
    close((odeCandidate(x+h,p).value-odeCandidate(x-h,p).value)/(2*h),y.first,1e-7);
    close((odeCandidate(x+h,p).first-odeCandidate(x-h,p).first)/(2*h),y.second,3e-7);
    close(y.lhs,y.rhs,1e-10);close(y.residual,0);assert.equal(y.identitySatisfied,true);
  }
});

test('A zero ODE residual at one point cannot substitute for the interval identity',()=>{
  const p={sine:-39/125,cosine:27/125},coefficients=odeCandidate(0,p);
  const angle=Math.atan2(-coefficients.cosCoefficient,coefficients.sinCoefficient),x=angle/3;
  close(odeCandidate(x,p).residual,0,1e-10);
  assert.equal(odeCandidate(x,p).identitySatisfied,false);
  assert.ok(Math.abs(odeCandidate(0,p).residual)>1);
});

test('Book Example 1.3: PDE, initial profile and endpoints are independent checks',()=>{
  const p={length:2,amplitude:2,mode:3,decayFactor:1},x=.37,time=.2;
  const candidate=heatCandidate(x,time,p);close(candidate.expectedDecay,Math.PI*Math.PI/4);
  assert.equal(candidate.equationSatisfied,true);assert.equal(candidate.initialSatisfied,true);assert.equal(candidate.boundarySatisfied,true);
  close(candidate.firstTime,candidate.secondSpace/9);close(candidate.residual,0);
  close(heatCandidate(0,time,p).value,0);close(heatCandidate(2,time,p).value,0);
  close(heatCandidate(x,0,p).value,2*Math.sin(3*Math.PI*x/2));
  const h=1e-4;
  close((heatCandidate(x,time+h,p).value-heatCandidate(x,time-h,p).value)/(2*h),candidate.firstTime,1e-7);
  close((heatCandidate(x+h,time,p).value-2*candidate.value+heatCandidate(x-h,time,p).value)/(h*h),candidate.secondSpace,1e-6);
  const differentInitial=heatCandidate(x,time,{...p,mode:1});
  assert.equal(differentInitial.equationSatisfied,true);assert.equal(differentInitial.boundarySatisfied,true);assert.equal(differentInitial.initialSatisfied,false);
});

test('Heat node residual and zero amplitude do not mask which conditions are satisfied',()=>{
  const p={length:3,amplitude:2,mode:3,decayFactor:1.5},atNode=heatCandidate(0,.5,p);
  close(atNode.residual,0);assert.equal(atNode.equationSatisfied,false);
  assert.equal(atNode.initialSatisfied,true);assert.equal(atNode.boundarySatisfied,true);
  const zero=heatCandidate(.5,.5,{...p,amplitude:0});
  assert.equal(zero.equationSatisfied,true);assert.equal(zero.initialSatisfied,false);
  assert.throws(()=>heatCandidate(.5,.5,{...p,mode:1.5}),RangeError);
});

test('Concept catalog, classifier traps, named formulas and progress stay consistent',async()=>{
  const tr=getLesson('xie-2010:1.2','tr'),en=getLesson('xie-2010:1.2','en');
  assert.equal(tr.lesson.classificationCases.length,8);assert.equal(tr.lesson.questions.length,14);
  assert.deepEqual(tr.lesson.activities.map(item=>item.id),['classification','families','uniqueness','verification']);
  assert.equal(findLessonBySection(tr.book,'2.1').id,'xie-2010:2.1');
  assert.equal(findLessonBySection(tr.book,'2.2').id,'xie-2010:2.2');
  const cases=Object.fromEntries(tr.lesson.classificationCases.map(item=>[item.id,item]));
  assert.equal(cases.squared.answers.order,'1');assert.equal(cases.squared.answers.linearity,'nonlinear');
  assert.equal(cases.swapped.answers.linearity,'linear');assert.equal(cases.biharmonic.answers.order,'4');
  assert.equal(cases.heat.answers.type,'pde');assert.equal(cases.poisson.answers.homogeneity,'nonhomogeneous');
  const json=JSON.parse(await fs.readFile(new URL('../dist/'+tr.lesson.mathPath,import.meta.url),'utf8'));
  assert.equal(Object.keys(tr.lesson.equations).length,38);
  assert.deepEqual(Object.keys(tr.lesson.equations),Object.keys(en.lesson.equations));
  for(const key of Object.values(tr.lesson.equations))assert.ok(json[key]);
  for(const item of tr.lesson.classificationCases)assert.ok(tr.lesson.equations[item.formula]);
  for(const proof of Object.values(tr.lesson.proofs))for(const step of proof)for(const id of step.formulas)assert.ok(tr.lesson.equations[id]);
  const notes=migrateNotesStore({'xie-2010:1.1':'Earlier topic'});assert.equal(notes['xie-2010:1.1'],'Earlier topic');assert.equal(notes['xie-2010:1.2'],'');
  const progress=migrateProgressStore({'xie-2010:1.1':{lesson:true,solved:[1]}});assert.deepEqual(progress['xie-2010:1.2'],{lesson:false,solved:[]});
  assert.deepEqual(countLessonProgress({lesson:true,solved:[0,13]},tr.lesson),{completed:3,total:15,percent:20});
});
