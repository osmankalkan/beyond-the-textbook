"""Reviewed §2.5 inline MathML for the lesson prose (LaTeX -> presentation MathML)."""
from .common import row, mi, mn, mo, frac, power, sqrt, sub

one, two, three, four, nine = (mn(s) for s in ('1', '2', '3', '4', '9'))
zero = mn('0')

x, y, p, C, a, f, g = (mi(s) for s in ('x', 'y', 'p', 'C', 'a', 'f', 'g'))
F = mi('F')
phi, varphi, psi = mi('ϕ'), mi('φ'), mi('ψ')

plus, minus, equal, comma = mo('+'), mo('−'), mo('='), mo(',')
slash = mo('/')
neq, le, gt, lt = mo('≠'), mo('≤'), mo('>'), mo('&lt;')
pm, mapsto = mo('±'), mo('↦')
thin, dq = '<mspace width="0.1667em"/>', '<mspace width="2em"/>'
apart = mo('∂')


def d(v):
    return row(mi('d'), v)


def prime(v):
    return power(v, mo('′'))


def pd(v):
    return row(apart, v)


def par(*parts):
    return row(mo('('), *parts, mo(')'))


def frac_par(a, b):
    return frac(row(a), row(b))


def msubsup(base, lower, upper):
    return '<msubsup>' + base + row(lower) + row(upper) + '</msubsup>'


INLINE = {
    "p=y'": row(p, equal, prime(y)),
    'F(x,y,p)=0': row(F, par(row(x, comma, y, comma, p)), equal, zero),
    'y': y,
    'x': x,
    'p': p,
    'y=f(x,p)': row(y, equal, f, par(row(x, comma, p))),
    'p=f_x+f_p\\,dp/dx': row(p, equal, sub('f', 'x'), plus, sub('f', 'p'), thin, d(p), slash, d(x)),
    'x=g(y,p)': row(x, equal, g, par(row(y, comma, p))),
    '1/p=g_y+g_p\\,dp/dy': row(frac(one, p), equal, sub('g', 'y'), plus, sub('g', 'p'), thin, d(p), slash, d(y)),
    'y=xp+f(p)': row(y, equal, row(x, p), plus, f, par(p)),
    "(x+f'(p))\\,dp/dx=0": row(par(row(x, plus, prime(f), par(p))), thin, d(p), slash, d(x), equal, zero),
    'C': C,
    'dx': d(x),
    '\\varphi(x,p,C)=0': row(varphi, par(row(x, comma, p, comma, C)), equal, zero),
    'y=f(x,p(x,C))': row(y, equal, f, par(row(x, comma, p, par(row(x, comma, C))))),
    'dx/dy=1/p': row(d(x), slash, d(y), equal, frac(one, p)),
    '\\psi(y,p,C)=0': row(psi, par(row(y, comma, p, comma, C)), equal, zero),
    'p=0': row(p, equal, zero),
    '-x=0': row(minus, x, equal, zero),
    'x=0': row(x, equal, zero),
    'p\\neq0': row(p, neq, zero),
    '(p^2+1)': par(row(power(p, two), plus, one)),
    'C\\mapsto1/C': row(C, mapsto, frac(one, C)),
    'p=\\pm1': row(p, equal, pm, one),
    'y=0': row(y, equal, zero),
    'dp/dx=0': row(d(p), slash, d(x), equal, zero),
    'p=C': row(p, equal, C),
    '\\sqrt{1+C^2}': sqrt(row(one, plus, power(C, two))),
    'x=-p/\\sqrt{1+p^2}': row(x, equal, minus, p, slash,
                                sqrt(row(one, plus, power(p, two)))),
    'y=1/\\sqrt{1+p^2}': row(y, equal, frac(one, sqrt(row(one, plus, power(p, two))))),
    'y<0': row(y, lt, zero),
    'x_0^2+y_0^2=1': row(msubsup('x', zero, two), plus, msubsup('y', zero, two), equal, one),
    'y_0>0': row(sub('y', '0'), gt, zero),
    "y'=-x/y": row(prime(y), equal, frac(row(minus, x), y)),
    "x=-f'(p)": row(x, equal, minus, prime(f), par(p)),
    'f': f,
    '-y=0': row(minus, y, equal, zero),
    'yp^2+1=0': row(y, power(p, two), plus, one, equal, zero),
    'p^2=-1/y': row(power(p, two), equal, frac(row(minus, one), y)),
    'y^2p^2=-y': row(power(y, two), power(p, two), equal, minus, y),
    'y\\le0': row(y, le, zero),
    'p^2=a^2/x': row(power(p, two), equal, frac(power(a, two), x)),
    'x=a^2/p^2': row(x, equal, frac(power(a, two), power(p, two))),
    'y=2a^2/p': row(y, equal, frac(row(two, power(a, two)), p)),
    'x>0': row(x, gt, zero),
    'a>0': row(a, gt, zero),
    'y=2a\\sqrt x': row(y, equal, two, a, sqrt(x)),
    'y=-2a\\sqrt x': row(y, equal, minus, two, a, sqrt(x)),
    "2yy'=4a^2": row(two, y, prime(y), equal, four, power(a, two)),
    "y'=2a^2/y": row(prime(y), equal, frac(row(two, power(a, two)), y)),
    'x=x(p)': row(x, equal, x, par(p)),
    'y=f(x(p),p)': row(y, equal, f, par(row(x, par(p), comma, p))),
    'y=y(p)': row(y, equal, y, par(p)),
    'x=g(y(p),p)': row(x, equal, g, par(row(y, par(p), comma, p))),
    'y=Cx+f(C)': row(y, equal, row(C, x), plus, f, par(C)),
    "y=f(p)-pf'(p)": row(y, equal, f, par(p), minus, row(p, prime(f), par(p))),
    'y=xp+p^2': row(y, equal, row(x, p), plus, power(p, two)),
    'y=Cx+C^2': row(y, equal, row(C, x), plus, power(C, two)),
    'y=-x^2/4': row(y, equal, frac(row(minus, power(x, two)), four)),
    'y=xp+1/p': row(y, equal, row(x, p), plus, frac(one, p)),
    'y=Cx+1/C': row(y, equal, row(C, x), plus, frac(one, C)),
    'y^2=4x': row(power(y, two), equal, four, x),
    'y^2p^2+3xp-y=0': row(power(y, two), power(p, two), plus, three, row(x, p), minus, y, equal, zero),
    'y^3=3Cx+C^2': row(power(y, three), equal, three, row(C, x), plus, power(C, two)),
    '9x^2+4y^3=0': row(nine, power(x, two), plus, four, power(y, three), equal, zero),
    'xp^2-2yp-x=0': row(x, power(p, two), minus, two, row(y, p), minus, x, equal, zero),
    '2y=Cx^2-1/C': row(two, y, equal, row(C, power(x, two)), minus, frac(one, C)),
    '\\partial f/\\partial p': frac(row(pd(f)), row(pd(p))),
    '\\partial g/\\partial p': frac(row(pd(g)), row(pd(p))),
}
