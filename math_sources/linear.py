"""Reviewed §2.4 MathML, in bilingual Markdown order."""
from .common import row, mi, mn, mo, frac, power, sqrt, fun, sub

sp = '<mspace width="1em"/>'
dq = '<mspace width="2em"/>'


def par(*parts):
    return row(mo('('), *parts, mo(')'))


def brack(*parts):
    return row(mo('['), *parts, mo(']'))


def d(v):
    return row(mi('d'), v)


def absm(*parts):
    return row(mo('|'), *parts, mo('|'))


def ln(v):
    return fun('ln', v)


def sin(v):
    return fun('sin', v)


def sinm(*parts):
    return fun('sin', row(*parts))


def cos(v):
    return fun('cos', v)


def tan(v):
    return fun('tan', v)


def sec(v):
    return fun('sec', v)


def expm(*parts):
    return power(mi('e'), row(*parts))


def integral(v):
    return row(mo('∫'), v)


def prime(a):
    return power(a, mo('′'))


x, y, u, C, M, N, P, Q, mu = (mi(s) for s in ('x', 'y', 'u', 'C', 'M', 'N', 'P', 'Q', 'μ'))
n = mi('n')
zero, one, two, three, four, five = (mn(s) for s in ('0', '1', '2', '3', '4', '5'))
plus, minus, equal, comma = mo('+'), mo('−'), mo('='), mo(',')
cdot, neq, implies, colon = mo('·'), mo('≠'), mo('⟹'), mo(':')
lt, gt = mo('<'), mo('>')

expressions = [
    # 1-9: linear first-order theory
    row(prime(y), plus, P, par(x), y, equal, Q, par(x)),
    row(M, par(x, comma, y), equal, P, par(x), y, minus, Q, par(x), comma, dq, N, par(x, comma, y), equal, one),
    row(frac(row(sub('M', 'y'), minus, sub('N', 'x')), N), equal, P, par(x)),
    row(mu, par(x), equal, expm(integral(row(P, par(x), d(x))))),
    row(prime(par(mu, y)), equal, mu, Q),
    row(mu, y, equal, integral(row(mu, Q, d(x))), plus, C),
    row(y, equal, expm(minus, integral(row(P, d(x)))),
        par(integral(row(Q, expm(integral(row(P, d(x)))), d(x))), plus, C)),
    row(frac(d(x), d(y)), plus, P, par(y), x, equal, Q, par(y)),
    row(x, equal, expm(minus, integral(row(P, par(y), d(y)))),
        par(integral(row(Q, par(y), expm(integral(row(P, par(y), d(y)))), d(y))), plus, C)),

    # 10-19: Example 2.30
    row(prime(y), equal, one, plus, three, y, tan(x)),
    row(prime(y), minus, three, tan(x), y, equal, one, comma, dq, P, par(x), equal, minus, three, tan(x), comma, sp, Q, par(x), equal, one),
    row(integral(row(P, d(x))), equal, integral(row(minus, three, tan(x), d(x))), equal, three, ln(absm(cos(x)))),
    row(mu, equal, expm(three, ln(absm(cos(x)))), equal, power(cos(x), three)),
    row(d(par(y, power(cos(x), three))), equal, power(cos(x), three), d(x)),
    row(integral(row(power(cos(x), three), d(x))), equal,
        integral(row(par(one, minus, power(sin(x), two)), d(par(sin(x)))))),
    row(integral(row(power(cos(x), three), d(x))), equal, sin(x), minus, frac(power(sin(x), three), three)),
    row(y, power(cos(x), three), equal, sin(x), minus, frac(power(sin(x), three), three), plus, C),
    row(y, equal, power(sec(x), three), par(sin(x), minus, frac(power(sin(x), three), three), plus, C)),
    row(prime(y), equal, one, plus, three, y, tan(x), comma, dq, cos(x), neq, zero),

    # 20-32: Example 2.31
    row(y, d(x), minus, par(expm(y), plus, two, x, y, minus, two, x), d(y), equal, zero),
    row(y, equal, zero),
    row(frac(d(x), d(y)), plus, frac(row(two, par(one, minus, y)), y), x, equal, frac(expm(y), y)),
    row(P, par(y), equal, frac(row(two, par(one, minus, y)), y), comma, dq, Q, par(y), equal, frac(expm(y), y)),
    row(integral(row(P, d(y))), equal, integral(row(par(frac(two, y), minus, two), d(y))),
        equal, two, ln(absm(y)), minus, two, y),
    row(mu, equal, expm(two, ln(absm(y)), minus, two, y), equal, power(y, two), expm(minus, two, y)),
    row(mu, Q, equal, power(y, two), expm(minus, two, y), cdot, frac(expm(y), y), equal, y, expm(minus, y)),
    row(d(par(x, power(y, two), expm(minus, two, y))), equal, y, expm(minus, y), d(y)),
    row(integral(row(y, expm(minus, y), d(y))), equal, minus, par(y, plus, one), expm(minus, y)),
    row(x, power(y, two), expm(minus, two, y), equal, C, minus, par(y, plus, one), expm(minus, y)),
    row(x, power(y, two), equal, C, expm(two, y), minus, expm(y), par(y, plus, one)),
    row(C, equal, one, dq, implies, dq, y, equal, zero),
    row(frac(d(x), d(y)), equal, frac(expm(y), y), plus, two, x, par(one, minus, frac(one, y)), comma, dq, y, neq, zero),

    # 33-41: Example 2.32
    row(frac(d(y), d(x)), equal, frac(one, row(x, cos(y), plus, sinm(two, y))), comma, dq, cos(y), neq, zero),
    row(frac(d(x), d(y)), minus, cos(y), x, equal, sinm(two, y)),
    row(P, par(y), equal, minus, cos(y), comma, dq, Q, par(y), equal, sinm(two, y)),
    row(integral(row(P, d(y))), equal, minus, sin(y), comma, dq, mu, equal, expm(minus, sin(y))),
    row(d(par(x, expm(minus, sin(y)))), equal, sinm(two, y), expm(minus, sin(y)), d(y)),
    row(integral(row(sinm(two, y), expm(minus, sin(y)), d(y))), equal,
        integral(row(two, u, expm(minus, u), d(u)))),
    row(integral(row(two, u, expm(minus, u), d(u))), equal, minus, two, expm(minus, u), par(u, plus, one)),
    row(x, expm(minus, sin(y)), equal, C, minus, two, expm(minus, sin(y)), par(sin(y), plus, one)),
    row(x, equal, C, expm(sin(y)), minus, two, par(sin(y), plus, one)),

    # 42-48: Bernoulli theory
    row(prime(y), plus, P, par(x), y, equal, Q, par(x), power(y, n)),
    row(n, equal, zero, colon, sp, prime(y), plus, P, par(x), y, equal, Q, par(x)),
    row(n, equal, one, colon, sp, prime(y), equal, par(Q, par(x), minus, P, par(x)), y),
    row(y, equal, zero, sp, par(n, gt, zero)),
    row(u, equal, power(y, row(one, minus, n))),
    row(power(y, row(one, minus, n)), equal, u, comma, dq, power(y, row(minus, n)),
        frac(d(y), d(x)), equal, frac(one, row(one, minus, n)), frac(d(u), d(x))),
    row(frac(d(u), d(x)), plus, par(one, minus, n), P, par(x), u, equal,
        par(one, minus, n), Q, par(x)),

    # 49-61: Example 2.33
    row(two, x, y, prime(y), equal, power(y, two), minus, two, power(x, three), comma, dq, y, par(one), equal, two),
    row(prime(y), minus, frac(one, row(two, x)), y, equal, minus, power(x, two), power(y, row(minus, one)),
        comma, dq, n, equal, minus, one),
    row(y, prime(y), minus, frac(one, row(two, x)), power(y, two), equal, minus, power(x, two)),
    row(u, equal, power(y, two), comma, dq, prime(u), equal, two, y, prime(y)),
    row(prime(u), minus, frac(one, x), u, equal, minus, two, power(x, two)),
    row(mu, equal, frac(one, x)),
    row(prime(par(frac(u, x))), equal, minus, two, x),
    row(frac(u, x), equal, minus, power(x, two), plus, C),
    row(u, equal, x, par(C, minus, power(x, two))),
    row(power(y, two), equal, x, par(C, minus, power(x, two))),
    row(four, equal, one, par(C, minus, one), dq, implies, dq, C, equal, five),
    row(power(y, two), equal, x, par(five, minus, power(x, two)), comma, dq,
        y, equal, sqrt(row(x, par(five, minus, power(x, two))))),
    row(one, lt, x, lt, sqrt(five)),

    # 62-73: Example 2.34
    row(three, y, d(x), minus, par(x, plus, three, power(x, four), y, ln(y)), d(y), equal, zero,
        comma, dq, y, gt, zero),
    row(frac(d(x), d(y)), minus, frac(one, row(three, y)), x, equal, power(x, four), ln(y),
        comma, dq, n, equal, four),
    row(power(x, row(minus, four)), frac(d(x), d(y)), minus, frac(one, row(three, y)),
        power(x, row(minus, three)), equal, ln(y)),
    row(u, equal, power(x, row(minus, three)), comma, dq, prime(u), equal,
        minus, three, power(x, row(minus, four)), prime(x)),
    row(prime(u), plus, frac(one, y), u, equal, minus, three, ln(y)),
    row(mu, equal, expm(integral(row(frac(one, y), d(y)))), equal, y),
    row(d(par(y, u)), equal, minus, three, y, ln(y), d(y)),
    row(integral(row(minus, three, y, ln(y), d(y))), equal, minus, three,
        par(frac(power(y, two), two), ln(y), minus, frac(power(y, two), four))),
    row(integral(row(minus, three, y, ln(y), d(y))), equal,
        frac(three, four), power(y, two), par(one, minus, two, ln(y))),
    row(y, u, equal, frac(three, four), power(y, two), par(one, minus, two, ln(y)), plus, C),
    row(u, equal, frac(one, y), brack(C, minus, frac(three, four), power(y, two),
        par(two, ln(y), minus, one))),
    row(power(x, three), equal, frac(row(four, y), row(four, C, minus, three, power(y, two),
        par(two, ln(y), minus, one)))),

    # 74-77: decision summary
    row(prime(y), plus, P, par(x), y, equal, Q, par(x), dq, implies, dq,
        mu, equal, expm(integral(row(P, d(x))))),
    row(prime(y), plus, P, par(x), y, equal, Q, par(x), power(y, n), comma,
        n, neq, zero, comma, one, dq, implies, dq, u, equal, power(y, row(one, minus, n))),
    row(frac(d(x), d(y)), plus, P, par(y), x, equal, Q, par(y), dq, implies, dq,
        mu, equal, expm(integral(row(P, d(y))))),
    row(y, equal, zero, sp, par(n, gt, zero), comma, dq, cos(x), neq, zero, comma, dq, y, neq, zero),
]
