/** Pure analytic IVP families, all with x0=0 and k>0. No plot sampling crosses poles. */
export function separableDomain(kind,y0,k=1){
 if(!Number.isFinite(y0)||!Number.isFinite(k)||k<=0)throw new RangeError('Finite data and k>0 required');
 if(kind==='linear')return [-Infinity,Infinity];
 if(kind==='square')return y0===0?[-Infinity,Infinity]:y0>0?[-Infinity,1/(k*y0)]:[1/(k*y0),Infinity];
 if(kind==='logistic'){
  if(y0>=0&&y0<=1)return [-Infinity,Infinity];
  const pole=Math.log((y0-1)/y0)/k;return y0>1?[pole,Infinity]:[-Infinity,pole];
 }
 if(kind==='tangent'){const bound=Math.sqrt(2*(Math.PI/2-Math.atan(y0))/k);return [-bound,bound];}
 throw new Error('Unknown separable family');
}
export function separableValue(kind,x,y0,k=1){
 const [lo,hi]=separableDomain(kind,y0,k);
 if(!Number.isFinite(x)||x<=lo||x>=hi)return NaN;
 if(kind==='linear')return y0*Math.exp(k*x*x/2);
 if(kind==='square')return y0===0?0:y0/(1-k*y0*x);
 if(kind==='logistic'){const e=Math.exp(k*x);return y0===0?0:y0===1?1:y0*e/(1+y0*(e-1));}
 return Math.tan(Math.atan(y0)+k*x*x/2);
}
export function separableSlope(kind,x,y,k=1){
 if(kind==='linear')return k*x*y;
 if(kind==='square')return k*y*y;
 if(kind==='logistic')return k*y*(1-y);
 if(kind==='tangent')return k*x*(1+y*y);
 throw new Error('Unknown separable family');
}
