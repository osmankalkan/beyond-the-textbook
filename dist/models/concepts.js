/** Pure functions for §1.2; no parsing, DOM, localization or learner storage. */
const finite=(...values)=>{if(!values.every(Number.isFinite))throw new RangeError('Parameters must be finite');};

export function lineFamily(x,constant){finite(x,constant);return 3*x+constant;}
export function lineInitialConstant(x0,y0){finite(x0,y0);return y0-3*x0;}

export function fallingBody(t,{gravity=9.81,position=0,velocity=0}={}){
  finite(t,gravity,position,velocity);
  if(gravity<=0)throw new RangeError('Gravity must be positive');
  return {position:position+velocity*t+gravity*t*t/2,velocity:velocity+gravity*t,acceleration:gravity};
}
export function fallingBoundaryVelocity({time,distance,gravity=9.81,position=0}){
  finite(time,distance,gravity,position);
  if(time<=0||gravity<=0)throw new RangeError('Positive final time and gravity required');
  return (distance-position)/time-gravity*time/2;
}

export function regularInitialSolution(x,{x0,y0}){
  finite(x,x0,y0);
  const value=x+1+(y0-x0-1)*Math.exp(x-x0);
  return {value,derivative:value-x};
}
export function regularExistenceBound({x0,y0,a=1,b=1}){
  finite(x0,y0,a,b);
  if(a<=0||b<=0)throw new RangeError('Rectangle sides must be positive');
  const maximum=Math.abs(y0-x0)+a+b;
  return {maximum,h:Math.min(a,b/maximum)};
}
export function singularInitialCase({x0,y0}){
  finite(x0,y0);
  if(x0!==0)return {kind:'locally-unique',constant:y0/(x0*x0),side:Math.sign(x0)};
  return {kind:y0===0?'infinitely-many':'no-solution'};
}
export function singularBranch(x,{left,right}){
  finite(x,left,right);
  const constant=x<0?left:right;
  return {value:constant*x*x,derivative:2*constant*x};
}
export function delayedBranch(x,wait){
  finite(x,wait);if(wait<0)throw new RangeError('Nonnegative waiting time required');
  const elapsed=Math.max(0,x-wait);
  return {value:elapsed*elapsed/4,derivative:elapsed/2};
}

// Example 1.2, y''+3y'-4y=6 sin(3x). Every derivative is explicit.
export function odeCandidate(x,{c1=1,c2=1,sine=-39/125,cosine=-27/125}={}){
  finite(x,c1,c2,sine,cosine);
  const a=c1*Math.exp(-4*x),b=c2*Math.exp(x),sin=Math.sin(3*x),cos=Math.cos(3*x);
  const value=a+b+sine*sin+cosine*cos;
  const first=-4*a+b+3*sine*cos-3*cosine*sin;
  const second=16*a+b-9*sine*sin-9*cosine*cos;
  const sinCoefficient=-13*sine-9*cosine-6,cosCoefficient=9*sine-13*cosine;
  const residual=sinCoefficient*sin+cosCoefficient*cos;
  const identitySatisfied=Math.abs(sinCoefficient)<1e-10&&Math.abs(cosCoefficient)<1e-10;
  return {value,first,second,lhs:second+3*first-4*value,rhs:6*sin,residual,sinCoefficient,cosCoefficient,identitySatisfied};
}

// Example 1.3. Alpha=1/9, target initial profile 2 sin(3πx/L).
export function heatCandidate(x,t,{length=3,amplitude=2,mode=3,decayFactor=1}={}){
  finite(x,t,length,amplitude,mode,decayFactor);
  if(length<=0||t<0||!Number.isInteger(mode)||mode<1||decayFactor<0)throw new RangeError('Invalid heat candidate parameters');
  const wave=mode*Math.PI/length,expectedDecay=wave*wave/9,decay=decayFactor*expectedDecay;
  const value=amplitude*Math.sin(wave*x)*Math.exp(-decay*t);
  const firstTime=-decay*value,secondSpace=-wave*wave*value;
  const residualCoefficient=expectedDecay-decay;
  return {
    value,firstTime,secondSpace,expectedDecay,decay,residualCoefficient,
    residual:residualCoefficient*value,
    equationSatisfied:amplitude===0||Math.abs(residualCoefficient)<1e-12*Math.max(1,expectedDecay),
    boundarySatisfied:true,
    initialSatisfied:amplitude===2&&mode===3
  };
}
