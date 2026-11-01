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
export function building(t,p) {
  const m=buildingMetrics(p);
  return p.setpoint + m.amplitude*(Math.sin(m.omega*t-m.phase)+Math.sin(m.phase)*Math.exp(-m.decay*t));
}
export function rk4Step(f,t,y,h) {
  const a=f(t,y),b=f(t+h/2,y+h*a/2),c=f(t+h/2,y+h*b/2),d=f(t+h,y+h*c);
  return y+h*(a+2*b+2*c+d)/6;
}
