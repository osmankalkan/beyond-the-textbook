import test from 'node:test';
import assert from 'node:assert/strict';
import {cooling,calibrateK,targetTime,halfLife,eulerCooling,building,buildingMetrics,rk4Step} from '../dist/models.js';
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
