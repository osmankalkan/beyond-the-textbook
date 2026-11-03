"""Dependency-free MathML presentation helpers."""
def row(*parts):return '<mrow>'+''.join(parts)+'</mrow>'
def mi(v):return '<mi>'+v+'</mi>'
def mn(v):return '<mn>'+str(v)+'</mn>'
def mo(v):return '<mo>'+v+'</mo>'
def sub(a,b):return '<msub>'+mi(a)+(mn(b) if str(b).isdigit() else mi(b))+'</msub>'
def frac(a,b):return '<mfrac>'+row(a)+row(b)+'</mfrac>'
def power(a,b):return '<msup>'+a+row(b)+'</msup>'
def par(v):return row(mo('('),v,mo(')'))
def sqrt(v):return '<msqrt>'+v+'</msqrt>'
def fun(n,v):return row('<mi mathvariant="normal">'+n+'</mi>',par(v))
def derivative(v):return frac(mi('d')+v,mi('d')+mi('t'))
