"""Reviewed §2.5 MathML, in bilingual Markdown order."""
from .common import row, mi, mn, mo, frac, power, sqrt, sub

one, two, three, four, five, nine = (mn(s) for s in ('1', '2', '3', '4', '5', '9'))
zero = mn('0')

x, y, p, C, a, f, g = (mi(s) for s in ('x', 'y', 'p', 'C', 'a', 'f', 'g'))
phi, varphi, psi = mi('ϕ'), mi('φ'), mi('ψ')
F = mi('F')

plus, minus, equal, comma = mo('+'), mo('−'), mo('='), mo(',')
thin = '<mspace width="0.1667em"/>'
quad = '<mspace width="1em"/>'
dq = '<mspace width="2em"/>'
implies = mo('⟹')
neq, forAll, gt = mo('≠'), mo('∀'), mo('>')
apart = mo('∂')


def d(v):
    return row(mi('d'), v)


def par(*parts):
    return row(mo('('), *parts, mo(')'))


def pd(v):
    return row(apart, v)


def prime(v):
    return power(v, mo('′'))


def absm(v):
    return row(mo('|'), v, mo('|'))


def ln(v):
    return row('<mi mathvariant="normal">ln</mi>', par(v))


def arrow(*parts):
    return row(*parts)


expressions = [
    # 1-3: parameter p, general family and singular solution
    row(F, par(x, comma, y, comma, p), equal, zero, dq, p, equal, prime(y)),
    row(y, equal, phi, par(x, comma, C)),
    row(y, equal, psi, par(x), comma, dq, psi, par(x), neq, phi, par(x, comma, C),
        quad, forAll, C),

    # 4-7: equations solvable for y
    row(y, equal, f, par(x, comma, p)),
    row(p, equal, frac(pd(f), row(apart, x)), plus, frac(pd(f), row(apart, p)),
        frac(row(d(p)), row(d(x)))),
    row(d(y), equal, frac(pd(f), row(apart, x)), d(x), plus,
        frac(pd(f), row(apart, p)), d(p)),
    row(x, equal, x, par(p), comma, dq, y, equal, f, par(x, par(p), comma, p)),

    # 8-11: equations solvable for x
    row(x, equal, g, par(y, comma, p)),
    row(frac(one, p), equal, frac(pd(g), row(apart, y)), plus,
        frac(pd(g), row(apart, p)), frac(row(d(p)), row(d(y)))),
    row(d(x), equal, frac(pd(g), row(apart, y)), d(y), plus,
        frac(pd(g), row(apart, p)), d(p)),
    row(y, equal, y, par(p), comma, dq, x, equal, g, par(y, par(p), comma, p)),

    # 12-17: Example 2.35
    row(x, equal, p, plus, power(p, four), comma, dq, p, equal, prime(y)),
    row(frac(row(d(x)), row(d(p))), equal, one, plus, four, power(p, three), comma, dq,
        frac(row(d(y)), row(d(p))), equal, p, plus, four, power(p, four)),
    row(frac(one, p), equal, par(one, plus, four, power(p, three)),
        frac(row(d(p)), row(d(y))), quad, implies, quad,
        d(y), equal, par(p, plus, four, power(p, four)), d(p)),
    row(y, equal, frac(one, two), power(p, two), plus, frac(four, five),
        power(p, five), plus, C),
    row(x, equal, p, plus, power(p, four), comma, dq, y, equal,
        frac(one, two), power(p, two), plus, frac(four, five), power(p, five), plus, C),
    row(frac(row(d(y)), row(d(x))), equal,
        frac(row(d(y), mo('/'), d(p)), row(d(x), mo('/'), d(p))), equal,
        frac(row(p, plus, four, power(p, four)),
             row(one, plus, four, power(p, three))), equal, p),

    # 18-23: Example 2.36
    row(x, power(p, two), minus, two, y, p, minus, x, equal, zero),
    row(y, equal, frac(row(x, par(row(power(p, two), minus, one))), row(two, p)),
        equal, frac(x, two), par(p, minus, frac(one, p))),
    row(p, equal, frac(one, two), par(p, minus, frac(one, p)), plus, frac(x, two),
        par(one, plus, frac(one, power(p, two))), frac(row(d(p)), row(d(x)))),
    row(power(p, two), plus, one, neq, zero, quad, implies, quad,
        frac(row(power(p, two), plus, one), p), equal,
        frac(row(x, par(row(power(p, two), plus, one))), power(p, two)),
        frac(row(d(p)), row(d(x))), quad, implies, quad,
        frac(row(d(p)), p), equal, frac(row(d(x)), x)),
    row(ln(absm(p)), equal, ln(absm(x)), plus, ln(absm(C)), quad, implies, quad, p, equal, C, x),
    row(two, y, equal, C, power(x, two), minus, frac(one, C)),

    # 24-27: Example 2.37
    row(y, equal, x, p, plus, sqrt(row(one, plus, power(p, two)))),
    row(p, equal, p, plus, par(x, plus, frac(p, sqrt(row(one, plus, power(p, two))))),
        frac(row(d(p)), row(d(x))), quad, implies, quad,
        par(x, plus, frac(p, sqrt(row(one, plus, power(p, two))))),
        frac(row(d(p)), row(d(x))), equal, zero),
    row(y, equal, C, x, plus, sqrt(row(one, plus, power(C, two)))),
    row(power(x, two), plus, power(y, two), equal, one, comma, dq, y, gt, zero),

    # 28-31: Clairaut theory
    row(y, equal, x, p, plus, f, par(p)),
    row(p, equal, p, plus, par(x, plus, prime(f), par(p)), frac(row(d(p)), row(d(x))),
        quad, implies, quad, par(x, plus, prime(f), par(p)),
        frac(row(d(p)), row(d(x))), equal, zero),
    row(y, equal, C, x, plus, f, par(C)),
    row(x, equal, minus, prime(f), par(p), comma, dq,
        y, equal, f, par(p), minus, p, prime(f), par(p)),

    # 32-37: Example 2.38
    row(power(y, two), power(p, two), plus, three, x, p, minus, y, equal, zero),
    row(x, equal, frac(row(y, minus, power(y, two), power(p, two)), row(three, p)),
        equal, frac(one, three), par(frac(y, p), minus, power(y, two), p)),
    row(frac(one, p), equal, frac(one, three), par(frac(one, p), minus, two, y, p), minus,
        frac(one, three), par(frac(y, power(p, two)), plus, power(y, two)),
        frac(row(d(p)), row(d(y)))),
    row(par(y, power(p, two), plus, one),
        par(frac(y, p), frac(row(d(p)), row(d(y))), plus, two), equal, zero),
    row(frac(row(d(p)), p), equal, minus, frac(row(two, d(y)), y), quad, implies, quad,
        p, equal, frac(C, power(y, two)), quad, implies, quad,
        power(y, three), minus, three, C, x, minus, power(C, two), equal, zero),
    row(power(x, two), equal, minus, frac(row(four, power(y, three)), nine), quad, implies, quad,
        nine, power(x, two), plus, four, power(y, three), equal, zero),

    # 38-41: Example 2.39
    row(y, equal, x, p, plus, frac(power(a, two), p), comma, dq, p, neq, zero),
    row(p, equal, p, plus, par(x, minus, frac(power(a, two), power(p, two))),
        frac(row(d(p)), row(d(x))), quad, implies, quad,
        par(x, minus, frac(power(a, two), power(p, two))),
        frac(row(d(p)), row(d(x))), equal, zero),
    row(y, equal, C, x, plus, frac(power(a, two), C)),
    row(power(y, two), equal, four, power(a, two), x),

    # 42: verification statement
    row(F, par(x, comma, y, par(x), comma, prime(y), par(x)), equal, zero, comma, dq,
        p, equal, prime(y)),
]
