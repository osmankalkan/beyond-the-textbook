from .common import row, mi, mn, mo, sub, frac, power, par, fun

def dot(value,order=1):return '<mover accent="true">'+value+'<mo>'+('˙' if order==1 else '¨')+'</mo></mover>'
def partial(value,variable,order=1):
    symbol=mo('∂') if order==1 else power(mo('∂'),mn(order))
    denominator=mi(variable) if order==1 else power(mi(variable),mn(order))
    return frac(symbol+value,mo('∂')+denominator)
x,y,t,m,beta,c,k=map(mi,['x','y','t','m','β','c','k'])
plus,minus,equals=mo('+'),mo('−'),mo('=')
xa,ca,ka,ma=sub('x','a'),sub('c','a'),sub('k','a'),sub('m','a')
q_in='<msub><mi>Q</mi><mtext>in</mtext></msub>'
q_out='<msub><mi>Q</mi><mtext>out</mtext></msub>'
c_in='<msub><mi>c</mi><mtext>in</mtext></msub>'
def evaluate(expr,args):return expr+par(args)
def lines(*items):return '<mtable columnalign="left" rowspacing="0.4em">'+''.join('<mtr><mtd>'+row(item)+'</mtd></mtr>' for item in items)+'</mtable>'
expressions=[
 m+dot(x,2)+plus+beta+dot(x)+equals+mn(0),
 m+dot(y,2)+plus+beta+dot(y)+equals+minus+m+mi('g'),
 fun('V',t)+equals+sub('V',0)+plus+par(q_in+minus+q_out)+t,
 fun('V',t)+frac(mi('d')+c,mi('d')+t)+plus+q_in+c+equals+q_in+c_in,
 frac(power(mi('d'),mn(2))+y,mi('d')+power(x,mn(2)))+equals+frac(fun('w',x),mi('H')),
 m+dot(y,2)+plus+c+dot(y)+plus+k+y+equals+minus+m+dot(sub('x',0),2),
 lines(m+dot(x,2)+plus+par(c+plus+ca)+dot(x)+plus+par(k+plus+ka)+x,minus+ca+dot(xa)+minus+ka+xa+equals+sub('F',0)+fun('sin',mi('Ω')+t)),
 ma+dot(xa,2)+plus+ca+dot(xa)+plus+ka+xa+minus+ca+dot(x)+minus+ka+x+equals+mn(0),
 mi('ρ')+mi('A')+partial(mi('v'),'t',2)+plus+mi('E')+mi('I')+partial(mi('v'),'x',4)+equals+mi('P')+fun('δ',x+minus+mi('U')+t),
 fun('v',x+mo(',')+mn(0))+equals+evaluate(partial(mi('v'),'t'),x+mo(',')+mn(0))+equals+mn(0),
 lines(fun('v',mn(0)+mo(',')+t)+equals+fun('v',mi('L')+mo(',')+t)+equals+mn(0),evaluate(partial(mi('v'),'x',2),mn(0)+mo(',')+t)+equals+evaluate(partial(mi('v'),'x',2),mi('L')+mo(',')+t)+equals+mn(0))
]
