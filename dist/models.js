export const cooling = (t, {ambient, initial, k}) => ambient + (initial - ambient) * Math.exp(-k*t);
export const halfLife = k => Math.log(2)/k;
export function targetTime(target, p) {
  if (target === p.initial) return 0;
  const ratio = (target-p.ambient)/(p.initial-p.ambient);
  return ratio > 0 && ratio < 1 ? -Math.log(ratio)/p.k : null;
}
export function calibrateK(initial, ambient, observed, time) {
  const ratio = (observed-ambient)/(initial-ambient);
  if (!(ratio > 0 && ratio < 1 && time > 0)) throw new Error('Soğuma verileri tutarsız.');
  return -Math.log(ratio)/time;
}
export function eulerCooling(t, p, h) {
  let value=p.initial, elapsed=0;
  while (elapsed < t-1e-10) {const dt=Math.min(h,t-elapsed);value += -p.k*(value-p.ambient)*dt;elapsed += dt;}
  return value;
}
// tau = c/K1 (hours), ratio = K2/K1, period in hours.
export function buildingMetrics({tau, ratio, period, amplitude}) {
  const omega=2*Math.PI/period, decay=(1+ratio)/tau;
  const gain=1/Math.hypot(1+ratio,tau*omega), phase=Math.atan2(tau*omega,1+ratio);
  return {omega,decay,gain,phase,amplitude:amplitude*gain,lag:phase/omega};
}
export function buildingSteady(t,p) {
  const m=buildingMetrics(p);
  return p.setpoint + m.amplitude*Math.sin(m.omega*t-m.phase);
}
export function buildingTransient(t,p) {
  const m=buildingMetrics(p);
  return m.amplitude*Math.sin(m.phase)*Math.exp(-m.decay*t);
}
export function building(t,p) {
  const m=buildingMetrics(p);
  return p.setpoint + m.amplitude*(Math.sin(m.omega*t-m.phase)+Math.sin(m.phase)*Math.exp(-m.decay*t));
}
export function rk4Step(f,t,y,h) {
  const a=f(t,y),b=f(t+h/2,y+h*a/2),c=f(t+h/2,y+h*b/2),d=f(t+h,y+h*c);
  return y+h*(a+2*b+2*c+d)/6;
}

// §1.1: SI units; linear drag R = beta*v, flat ground and still air.
export function projectileState(t, {speed, angle, mass, drag, gravity = 9.81}) {
  if (![t,speed,angle,mass,drag,gravity].every(Number.isFinite) || t < 0 || speed < 0 || angle < 0 || angle > 90 || mass <= 0 || drag < 0 || gravity <= 0) throw new RangeError('Invalid projectile parameters');
  const radians=angle*Math.PI/180, vx0=speed*Math.cos(radians), vy0=speed*Math.sin(radians), rate=drag/mass;
  if (rate === 0) return {x:vx0*t,y:vy0*t-gravity*t*t/2,vx:vx0,vy:vy0-gravity*t};
  const z=rate*t;
  // Stable series avoid subtracting nearly equal values as drag approaches zero.
  const phi=Math.abs(z)<1e-4 ? 1-z/2+z*z/6-z*z*z/24 : -Math.expm1(-z)/z;
  const psi=Math.abs(z)<1e-4 ? .5-z/6+z*z/24-z*z*z/120 : (z+Math.expm1(-z))/(z*z);
  const attenuation=Math.exp(-z);
  return {x:vx0*t*phi,y:vy0*t*phi-gravity*t*t*psi,vx:vx0*attenuation,vy:vy0*attenuation-gravity*t*phi};
}
export function projectileFlightTime(parameters) {
  const start=projectileState(0,parameters);
  if (start.vy <= 0) return 0;
  let lower=0,upper=Math.max(1,2*start.vy/(parameters.gravity??9.81));
  while(projectileState(upper,parameters).y>0)upper*=2;
  for(let i=0;i<70;i++){const middle=(lower+upper)/2;if(projectileState(middle,parameters).y>0)lower=middle;else upper=middle;}
  return (lower+upper)/2;
}

// Concentrations are fractions (0..1), volume litres, time minutes, flows L/min.
export function mixingTankState(t,{volume,initial,inflow,outflow,inlet}) {
  if (![t,volume,initial,inflow,outflow,inlet].every(Number.isFinite) || t<0 || volume<=0 || inflow<0 || outflow<0 || initial<0 || initial>1 || inlet<0 || inlet>1) throw new RangeError('Invalid tank parameters');
  const change=inflow-outflow, currentVolume=volume+change*t;
  if(currentVolume<=0)throw new RangeError('The tank has emptied; the model is no longer valid');
  let attenuation;
  if(inflow===0)attenuation=1;
  else if(change===0)attenuation=Math.exp(-inflow*t/volume);
  else attenuation=Math.exp(-inflow*(Math.log1p(change*t/volume)/change));
  const concentration=inlet+(initial-inlet)*attenuation;
  return {volume:currentVolume,concentration,pollutant:currentVolume*concentration,rate:inflow===0?0:inflow*(inlet-concentration)/currentVolume};
}

// §1.2 domain functions are isolated; preserve a stable public model facade.
export {lineFamily,lineInitialConstant,fallingBody,fallingBoundaryVelocity,regularInitialSolution,regularExistenceBound,singularInitialCase,singularBranch,delayedBranch,odeCandidate,heatCandidate} from './models/concepts.js';
