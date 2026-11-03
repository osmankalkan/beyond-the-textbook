from .common import mi, mn, mo, sub, frac, power, par, fun, derivative, sqrt

T,TM,TI,TB,TS,TA,T1=mi('T'),sub('T','m'),sub('T','i'),sub('T','B'),sub('T','S'),sub('T','A'),sub('T',1)
eq,minus,plus=mo('='),mo('−'),mo('+')
theta,t,k,r,tau,omega=map(mi,['θ','t','k','r','τ','ω'])
negkt=minus+k+t
bound=sqrt(mn(16)+minus+power(par(frac(mi('π'),mn(3))),mn(2)))+minus+mn(1)
expressions=[
 derivative(T)+eq+minus+k+par(T+minus+TM),
 '<mi mathvariant="normal">ln</mi>'+mo('|')+T+minus+TM+mo('|')+eq+negkt+plus+mi('C'),
 fun('T',t)+eq+TM+plus+par(TI+minus+TM)+power(mi('e'),negkt),
 sub('t','½')+eq+frac(fun('ln',mn(2)),k),
 k+eq+minus+frac(mn(1),mn(20))+fun('ln',frac(mn(60)+minus+mn(20),mn(100)+minus+mn(20)))+eq+frac(fun('ln',mn(2)),mn(20)),
 mi('c')+derivative(TB)+eq+mi('Q')+plus+sub('K',2)+par(TS+minus+TB)+minus+sub('K',1)+par(TB+minus+TA),
 tau+derivative(theta)+plus+par(mn(1)+plus+r)+theta+eq+T1+fun('sin',omega+t),
 mi('A')+eq+frac(T1,sqrt(power(par(mn(1)+plus+r),mn(2))+plus+power(par(tau+omega),mn(2)))),
 r+mo('≥')+bound+mo('≈')+mn('2.86049')
]
