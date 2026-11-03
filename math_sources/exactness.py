"""Reviewed §2.3 MathML, in bilingual Markdown order."""
from .common import row, mi, mn, mo, frac, power, sqrt, fun, sub

sp = '<mspace width="1em"/>'
dq = '<mspace width="2em"/>'
quad = '<mspace width="1em"/>'
implies = mo('⟹')


def par(*parts):
    return row(mo('('), *parts, mo(')'))


def brack(*parts):
    return row(mo('['), *parts, mo(']'))


def d(v):
    return row(mi('d'), v)


def pd(a, b):
    return frac(row(mo('∂'), a), row(mo('∂'), b))


def absm(*parts):
    return row(mo('|'), *parts, mo('|'))


def eq(*parts):
    return row(*parts)


def ln(v):
    return fun('ln', v)


def sin(v):
    return fun('sin', v)


def cos(v):
    return fun('cos', v)


def sec(v):
    return fun('sec', v)


def arctan(v):
    return fun('arctan', v)


def expm(*parts):
    return power(mi('e'), row(*parts))


def integral(v):
    return row(mo('∫'), v)


def prime(a):
    return power(a, mo('′'))


x, y, z, u, v, C, M, N, F, g, mu = (mi(s) for s in ('x', 'y', 'z', 'u', 'v', 'C', 'M', 'N', 'F', 'g', 'μ'))
alpha, beta = mi('α'), mi('β')
zero, one, two, three, four, five, six, seven, nine, twelve = (mn(s) for s in ('0', '1', '2', '3', '4', '5', '6', '7', '9', '12'))
plus, minus, equal = mo('+'), mo('−'), mo('=')
comma = mo(',')

_b = [
    # 1-4: exact differential and potential
    eq(M, par(x, comma, y), d(x), plus, N, par(x, comma, y), d(y), equal, zero),
    eq(d(u), equal, pd(u, x), d(x), plus, pd(u, y), d(y)),
    eq(pd(M, y), equal, pd(N, x)),
    eq(u, par(x, comma, y), equal, C),

    # 5-10: Example 2.13
    eq(par(six, x, power(y, two), plus, four, power(x, three), y), d(x),
       plus, par(six, power(x, two), y, plus, power(x, four), plus, expm(y)), d(y), equal, zero),
    eq(pd(M, y), equal, twelve, x, y, plus, four, power(x, three), equal, pd(N, x)),
    eq(u, par(x, comma, y), equal, three, power(x, two), power(y, two), plus, power(x, four), y, plus, g, par(y),
       comma, sp, pd(u, y), equal, six, power(x, two), y, plus, power(x, four), plus, prime(g), par(y)),
    eq(prime(g), par(y), equal, expm(y), comma, sp, u, par(x, comma, y), equal,
       three, power(x, two), power(y, two), plus, power(x, four), y, plus, expm(y)),
    eq(three, power(x, two), power(y, two), plus, power(x, four), y, plus, expm(y), equal, C),
    eq(par(six, x, power(y, two), d(x), plus, six, power(x, two), y, d(y)),
       plus, par(four, power(x, three), y, d(x), plus, power(x, four), d(y)),
       plus, expm(y), d(y), equal, zero),

    # 11-13: Example 2.14
    eq(par(minus, y, sin(x), plus, expm(x), sin(row(two, y))), d(x),
       plus, par(cos(x), plus, two, expm(x), cos(row(two, y))), d(y), equal, zero),
    eq(par(minus, y, sin(x), d(x), plus, cos(x), d(y)),
       plus, par(expm(x), sin(row(two, y)), d(x), plus, two, expm(x), cos(row(two, y)), d(y)), equal, zero),
    eq(minus, y, cos(x), plus, expm(x), sin(row(two, y)), equal, C),

    # 14-17: Example 2.15
    eq(two, x, par(three, x, plus, y, minus, y, expm(minus, power(x, two))), d(x),
       plus, par(power(x, two), plus, three, power(y, two), plus, expm(minus, power(x, two))), d(y), equal, zero),
    eq(pd(M, y), equal, two, x, minus, two, x, expm(minus, power(x, two)), equal, pd(N, x)),
    eq(par(two, x, y, d(x), plus, power(x, two), d(y)),
       plus, par(expm(minus, power(x, two)), d(y), minus, two, x, y, expm(minus, power(x, two)), d(x)),
       plus, par(six, power(x, two), d(x), plus, three, power(y, two), d(y)), equal, zero),
    eq(power(x, two), y, plus, y, expm(minus, power(x, two)), plus, two, power(x, three), plus, power(y, three), equal, C),

    # 18-20: Example 2.16
    eq(par(frac(one, y), sin(frac(x, y)), minus, frac(y, power(x, two)), cos(frac(y, x)), plus, one), d(x),
       plus, par(frac(one, x), cos(frac(y, x)), minus, frac(x, power(y, two)), sin(frac(x, y)), plus, frac(one, power(y, two))), d(y), equal, zero),
    eq(par(frac(one, y), sin(frac(x, y)), d(x), minus, frac(x, power(y, two)), sin(frac(x, y)), d(y)),
       plus, par(minus, frac(y, power(x, two)), cos(frac(y, x)), d(x), plus, frac(one, x), cos(frac(y, x)), d(y)),
       plus, d(x), plus, frac(d(y), power(y, two)), equal, zero),
    eq(minus, cos(frac(x, y)), plus, sin(frac(y, x)), plus, x, minus, frac(one, y), equal, C),

    # 21-24: integrating factors
    eq(mu, par(x, comma, y), M, par(x, comma, y), d(x), plus, mu, par(x, comma, y), N, par(x, comma, y), d(y), equal, zero),
    eq(frac(one, mu), frac(d(mu), d(x)), equal, frac(one, N), par(pd(M, y), minus, pd(N, x))),
    eq(mu, par(x), equal, fun('exp', integral(row(frac(one, N), par(pd(M, y), minus, pd(N, x)), d(x))))),
    eq(mu, par(y), equal, fun('exp', integral(row(frac(one, M), par(pd(N, x), minus, pd(M, y)), d(y))))),

    # 25-27: Example 2.17
    eq(three, par(power(x, two), plus, power(y, two)), d(x),
       plus, x, par(power(x, two), plus, three, power(y, two), plus, six, y), d(y), equal, zero),
    eq(frac(one, M), par(pd(N, x), minus, pd(M, y)), equal,
       frac(row(par(row(three, power(x, two), plus, three, power(y, two), plus, six, y)), minus, six, y),
            row(three, par(row(power(x, two), plus, power(y, two))))),
       equal, one, comma, sp, mu, par(y), equal, expm(y)),
    eq(expm(y), x, par(power(x, two), plus, three, power(y, two)), equal, C),

    # 28-31: Example 2.18
    eq(y, par(two, x, minus, y, plus, two), d(x), plus, two, par(x, minus, y), d(y), equal, zero),
    eq(frac(one, N), par(pd(M, y), minus, pd(N, x)), equal,
       frac(row(par(row(two, x, minus, two, y, plus, two)), minus, two), row(two, par(row(x, minus, y)))),
       equal, one, comma, sp, mu, par(x), equal, expm(x)),
    eq(expm(x), y, par(two, x, minus, y), equal, C),
    eq(y, equal, zero, comma, sp, y, equal, two, x),

    # 32-34: Example 2.19
    eq(y, par(power(cos(x), three), plus, y, sin(x)), d(x),
       plus, cos(x), par(sin(x), cos(x), plus, two, y), d(y), equal, zero),
    eq(frac(one, N), par(pd(M, y), minus, pd(N, x)), equal, frac(row(two, sin(x)), cos(x)),
       comma, sp, mu, par(x), equal, power(sec(x), two)),
    eq(y, sin(x), plus, frac(power(y, two), cos(x)), equal, C),

    # 35-39: Example 2.20
    eq(frac(power(x, two), row(x, M, plus, y, N)), par(pd(N, x), minus, pd(M, y)), equal, F, par(frac(y, x))),
    eq(mu, par(x, comma, y), equal, fun('exp', integral(row(F, par(u), d(u)))), comma, sp, u, equal, frac(y, x)),
    eq(par(two, x, plus, two, x, y, minus, y, minus, power(y, two)), d(x),
       plus, par(power(x, two), plus, x, plus, x, y), d(y), equal, zero),
    eq(frac(power(x, two), row(x, M, plus, y, N)), par(pd(N, x), minus, pd(M, y)), equal, one,
       comma, sp, mu, equal, expm(frac(y, x))),
    eq(power(x, two), par(one, plus, y), expm(frac(y, x)), equal, C),

    # 40-44: inspection formulas
    eq(d(par(row(x, y))), equal, y, d(x), plus, x, d(y)),
    eq(d(frac(y, x)), equal, frac(row(x, d(y), minus, y, d(x)), power(x, two)),
       comma, sp, d(frac(x, y)), equal, frac(row(y, d(x), minus, x, d(y)), power(y, two))),
    eq(d(par(arctan(frac(y, x)))), equal, frac(row(x, d(y), minus, y, d(x)), row(power(x, two), plus, power(y, two)))),
    eq(d(par(row(frac(one, two), ln(row(power(x, two), plus, power(y, two)))))), equal,
       frac(row(x, d(x), plus, y, d(y)), row(power(x, two), plus, power(y, two)))),
    eq(d(par(sqrt(row(power(x, two), mo('±'), power(y, two))))), equal,
       frac(row(x, d(x), mo('±'), y, d(y)), sqrt(row(power(x, two), mo('±'), power(y, two))))),

    # 45-48: Example 2.21
    eq(par(three, power(x, four), plus, y), d(x), plus, par(two, power(x, two), y, minus, x), d(y), equal, zero),
    eq(power(x, two), par(three, power(x, two), d(x), plus, two, y, d(y)), plus, par(y, d(x), minus, x, d(y)), equal, zero),
    eq(three, power(x, two), d(x), plus, two, y, d(y), minus, frac(row(x, d(y), minus, y, d(x)), power(x, two)), equal, zero),
    eq(power(x, three), plus, power(y, two), minus, frac(y, x), equal, C),

    # 49-52: Example 2.22
    eq(par(x, plus, power(x, two), y, plus, power(y, three)), d(x),
       plus, par(y, plus, power(x, three), plus, x, power(y, two), minus, power(x, two), power(y, two), minus, power(y, four)), d(y), equal, zero),
    eq(brack(x, plus, y, par(row(power(x, two), plus, power(y, two)))), d(x),
       plus, brack(y, plus, x, par(row(power(x, two), plus, power(y, two))), minus, power(y, two), par(row(power(x, two), plus, power(y, two)))), d(y), equal, zero),
    eq(frac(row(x, d(x), plus, y, d(y)), row(power(x, two), plus, power(y, two))),
       plus, par(row(y, d(x), plus, x, d(y))), minus, power(y, two), d(y), equal, zero),
    eq(frac(one, two), ln(row(power(x, two), plus, power(y, two))), plus, x, y, minus, frac(one, three), power(y, three), equal, C),

    # 53-56: Example 2.23
    eq(par(two, x, sqrt(x), plus, power(x, two), plus, power(y, two)), d(x),
       plus, two, y, sqrt(x), d(y), equal, zero),
    eq(two, sqrt(x), par(x, d(x), plus, y, d(y)), plus, par(power(x, two), plus, power(y, two)), d(x), equal, zero),
    eq(two, frac(row(x, d(x), plus, y, d(y)), row(power(x, two), plus, power(y, two))),
       plus, frac(d(x), sqrt(x)), equal, zero),
    eq(ln(row(power(x, two), plus, power(y, two))), plus, two, sqrt(x), equal, C),

    # 57-60: Example 2.24
    eq(power(y, two), d(x), plus, par(x, y, plus, power(y, two), minus, one), d(y), equal, zero),
    eq(y, par(y, d(x), plus, x, d(y)), plus, par(power(y, two), minus, one), d(y), equal, zero),
    eq(y, equal, zero),
    eq(x, y, plus, frac(one, two), power(y, two), minus, ln(absm(y)), equal, C, comma, sp, y, equal, zero),

    # 61-64: Example 2.25
    eq(x, y, d(x), minus, par(power(x, two), plus, power(x, two), y, plus, power(y, three)), d(y), equal, zero),
    eq(x, par(y, d(x), minus, x, d(y)), minus, y, par(power(x, two), plus, power(y, two)), d(y), equal, zero),
    eq(x, d(par(arctan(frac(x, y)))), minus, y, d(y), equal, zero),
    eq(ln(row(one, plus, frac(power(x, two), power(y, two)))), minus, two, y, equal, C, comma, sp, y, equal, zero),

    # 65-66: groups theorem
    eq(sub('μ', '1'), sub('M', '1'), d(x), plus, sub('μ', '1'), sub('N', '1'), d(y), equal, d(sub('v', '1')),
       comma, sp, sub('μ', '2'), sub('M', '2'), d(x), plus, sub('μ', '2'), sub('N', '2'), d(y), equal, d(sub('v', '2'))),
    eq(sub('μ', '1'), sub('g', '1'), par(sub('v', '1')), equal, sub('μ', '2'), sub('g', '2'), par(sub('v', '2')), equal, mu, par(x, comma, y)),

    # 67-71: Example 2.26
    eq(par(four, x, y, plus, three, power(y, four)), d(x), plus, par(two, power(x, two), plus, five, x, power(y, three)), d(y), equal, zero),
    eq(par(four, x, y, d(x), plus, two, power(x, two), d(y)), plus, par(three, power(y, four), d(x), plus, five, x, power(y, three), d(y)), equal, zero,
       comma, sp, two, d(par(row(power(x, two), y))), equal, four, x, y, d(x), plus, two, power(x, two), d(y)),
    eq(sub('μ', '2'), par(x), equal, power(x, frac(seven, five)), comma, sp, sub('v', '2'), equal, power(x, frac(twelve, five)), power(y, four)),
    eq(mu, equal, power(x, two), y),
    eq(power(x, four), power(y, two), plus, power(x, three), power(y, five), equal, C),

    # 72-76: Example 2.27
    eq(par(five, x, y, minus, three, power(y, three)), d(x), plus, par(three, power(x, two), minus, seven, x, power(y, two)), d(y), equal, zero),
    eq(par(five, x, y, d(x), plus, three, power(x, two), d(y)), plus, par(minus, three, power(y, three), d(x), minus, seven, x, power(y, two), d(y)), equal, zero),
    eq(sub('μ', '1'), equal, power(x, row(minus, frac(one, three))), comma, sub('v', '1'), equal, power(x, frac(five, three)), y,
       comma, sp, sub('μ', '2'), equal, power(x, frac(two, seven)), comma, sub('v', '2'), equal, power(x, frac(nine, seven)), power(y, three)),
    eq(alpha, equal, frac(one, two), comma, beta, equal, frac(one, six), comma, mu, equal, power(x, frac(one, two)), power(y, frac(one, two))),
    eq(power(x, frac(three, two)), power(y, frac(three, two)), par(x, minus, power(y, two)), equal, C),

    # 77-80: Example 2.28
    eq(par(y, d(x), minus, x, d(y)), plus, sqrt(row(x, y)), d(y), equal, zero, comma, sp, x, mo('>'), zero, comma, sp, y, mo('>'), zero),
    eq(minus, d(frac(y, x)), plus, power(x, row(minus, frac(three, two))), power(y, frac(one, two)), d(y), equal, zero),
    eq(power(x, row(minus, frac(one, two))), power(y, row(minus, frac(one, two))), d(x),
       plus, par(minus, power(x, frac(one, two)), power(y, row(minus, frac(three, two))), plus, frac(one, y)), d(y), equal, zero),
    eq(two, sqrt(frac(x, y)), plus, ln(y), equal, C),

    # 81-85: Example 2.29
    eq(par(x, y, expm(frac(x, y)), plus, power(y, four)), d(x), minus, power(x, two), expm(frac(x, y)), d(y), equal, zero,
       comma, sp, y, mo('≠'), zero),
    eq(expm(frac(x, y)), d(par(frac(x, y))), plus, frac(power(y, two), x), d(x), equal, zero),
    eq(frac(power(x, two), power(y, two)), expm(frac(x, y)), d(par(frac(x, y))), plus, x, d(x), equal, zero),
    eq(integral(row(power(z, two), expm(z), d(z))), equal, expm(z), par(row(power(z, two), minus, two, z, plus, two))),
    eq(expm(frac(x, y)), par(row(frac(power(x, two), power(y, two)), minus, frac(row(two, x), y), plus, two)),
       plus, frac(power(x, two), two), equal, C),

    # 86: decision summary
    eq(mu, par(x), equal, fun('exp', integral(row(frac(row(pd(M, y), minus, pd(N, x)), N), d(x)))),
       comma, sp, mu, par(y), equal, fun('exp', integral(row(frac(row(pd(N, x), minus, pd(M, y)), M), d(y))))),

    # 87-90: experiment families
    eq(u, par(x, comma, y), equal, power(x, two), plus, x, y, plus, power(y, two)),
    eq(u, par(x, comma, y), equal, expm(x), y, par(two, x, minus, y)),
    eq(u, par(x, comma, y), equal, x, y, plus, frac(one, two), power(y, two), minus, ln(y)),
    eq(u, par(x, comma, y), equal, ln(row(power(x, two), plus, power(y, two))), plus, two, sqrt(x)),
]


# Merged review steps: adjacent reviewed fragments joined by an explicit arrow.
def step(first, second):
    return row(first, quad, implies, quad, second)


expressions = [
    _b[0],
    row(_b[1], comma, _b[2], quad, implies, quad, _b[3]),
    _b[4], _b[5], _b[6],
    step(_b[7], _b[8]),
    _b[9],
    _b[10], step(_b[11], _b[12]),
    _b[13], _b[14], _b[15], _b[16],
    _b[17], _b[18], _b[19],
    _b[20], _b[21],
    row(_b[22], dq, _b[23]),
    _b[24], step(_b[25], _b[26]),
    _b[27], step(_b[28], _b[29]), _b[30],
    _b[31], step(_b[32], _b[33]),
    step(_b[34], _b[35]), _b[36], step(_b[37], _b[38]),
    _b[44], step(_b[45], _b[46]), _b[47],
    _b[48], _b[49], step(_b[50], _b[51]),
    _b[52], _b[53], step(_b[54], _b[55]),
    _b[56], _b[57], _b[59],
    _b[60], step(_b[61], _b[62]), _b[63],
    _b[64], _b[65],
    _b[66], _b[67], step(_b[68], _b[69]), _b[70],
    _b[71], _b[72], _b[73], step(_b[74], _b[75]),
    _b[76], _b[77], step(_b[78], _b[79]),
    _b[80], _b[81], _b[82], step(_b[83], _b[84]),
    _b[85],
    _b[86], _b[87], _b[88], _b[89],
]
