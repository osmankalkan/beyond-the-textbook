"""Reviewed §2.2 MathML, in bilingual Markdown order."""
from .common import row, mi, mn, mo, frac, power, sqrt, fun, sub

sp = '<mspace width="1em"/>'


def par(*parts):
    return row(mo('('), *parts, mo(')'))


def d(v):
    return row(mi('d'), v)


def absm(*parts):
    return row(mo('|'), *parts, mo('|'))


def eq(*parts):
    return row(*parts)


def ln(*parts):
    return fun('ln', row(*parts))


def arctan(v):
    return fun('arctan', v)


def tan(v):
    return fun('tan', v)


def f(v):
    return row(mi('f'), par(v))


x, y, v, C, X, Y, A = (mi(s) for s in ('x', 'y', 'v', 'C', 'X', 'Y', 'A'))
one, two, three, four, five, six, seven, fifteen = (mn(s) for s in ('1', '2', '3', '4', '5', '6', '7', '15'))
zero = mn('0')
plus, minus = mo('+'), mo('−')
equal = mo('=')

expressions = [
    # 1-3: homogeneous form
    eq(frac(d(y), d(x)), equal, f(frac(y, x))),
    eq(y, equal, v, x, mo(','), sp, frac(d(y), d(x)), equal, v, plus, x, frac(d(v), d(x))),
    eq(frac(d(v), row(f(v), minus, v)), equal, frac(d(x), x)),

    # 4-9: Example 2.4
    eq(frac(d(y), d(x)), plus, frac(x, y), plus, two, equal, zero, mo(','), sp, y, par(zero), equal, one),
    eq(v, plus, x, frac(d(v), d(x)), equal, minus, par(frac(one, v), plus, two)),
    eq(x, frac(d(v), d(x)), equal, minus, frac(power(par(v, plus, one), two), v)),
    eq(frac(v, power(par(v, plus, one), two)), d(v), equal, minus, frac(d(x), x)),
    eq(ln(absm(v, plus, one)), plus, frac(one, par(v, plus, one)), equal, minus, ln(absm(x)), plus, C),
    eq(ln(absm(y, plus, x)), plus, frac(x, par(y, plus, x)), equal, C),

    # 10-13: Example 2.5
    eq(x, par(ln(x), minus, ln(y)), d(y), minus, y, d(x), equal, zero, mo(','), sp,
       x, mo('>'), zero, mo(','), sp, y, mo('>'), zero),
    eq(x, frac(d(v), d(x)), equal, minus, frac(row(v, par(one, plus, ln(v))), ln(v))),
    eq(frac(ln(v), row(v, par(one, plus, ln(v)))), d(v), equal, minus, frac(d(x), x)),
    eq(frac(y, row(one, plus, ln(y), minus, ln(x))), equal, C, mo(','), sp, y, equal, frac(x, mi('e'))),

    # 14-15: Example 2.6
    eq(par(y, plus, x), d(y), plus, par(x, minus, y), d(x), equal, zero),
    eq(ln(par(power(x, two), plus, power(y, two))), plus, two, arctan(frac(y, x)), equal, C),

    # 16-18: Example 2.7
    eq(frac(d(y), d(x)), equal, frac(row(two, x, minus, y, plus, one), row(x, minus, two, y, plus, one))),
    eq(x, equal, X, minus, frac(one, three), mo(','), sp, y, equal, Y, plus, frac(one, three)),
    eq(power(x, two), minus, x, y, plus, power(y, two), plus, x, minus, y, plus, frac(one, three), equal, A),

    # 19-20: Example 2.8
    eq(frac(d(y), d(x)), equal, frac(row(x, minus, y, plus, five), row(two, x, minus, two, y, minus, two))),
    eq(frac(x, two), minus, y, plus, six, ln(absm(x, minus, y, minus, seven)), equal, C, mo(','), sp,
       x, minus, y, equal, seven),

    # 21-22: Example 2.9
    eq(frac(d(y), d(x)), equal, power(par(x, plus, y), two)),
    eq(y, equal, tan(row(x, plus, C)), minus, x),

    # 23-24: Example 2.10
    eq(frac(d(y), d(x)), equal,
       frac(row(power(y, six), minus, two, power(x, two)), row(two, x, power(y, five), plus, power(x, two), power(y, two)))),
    eq(power(par(power(y, three), minus, three, x), seven), power(par(power(y, three), plus, two, x), three),
       equal, C, power(x, fifteen)),

    # 25-27: Example 2.11
    eq(frac(x, y), frac(d(y), d(x)), equal, f(row(x, y)), mo(','), sp, y, mo('≠'), zero),
    eq(x, frac(d(v), d(x)), equal, v, par(one, plus, f(v))),
    eq(ln(absm(frac(y, x))), minus, frac(row(power(x, two), power(y, two)), four), equal, C),

    # 28-29: Example 2.12
    eq(frac(d(y), d(x)), equal,
       frac(row(sqrt(row(x, plus, y)), minus, sqrt(row(x, minus, y))),
            row(sqrt(row(x, plus, y)), plus, sqrt(row(x, minus, y)))),
       mo(','), sp, x, mo('>'), zero, mo(','), sp, absm(y), mo('<'), x),
    eq(power(y, two), equal, minus, two, C, x, minus, power(C, two)),

    # 30-32: transformation summary
    eq(frac(d(y), d(x)), equal, f(frac(y, x)), mo('⇒'), v, equal, frac(y, x)),
    eq(frac(d(y), d(x)), equal,
       frac(row(sub('a', '1'), x, plus, sub('b', '1'), y, plus, sub('c', '1')),
            row(sub('a', '2'), x, plus, sub('b', '2'), y, plus, sub('c', '2')))),
    eq(frac(d(v), row(v, par(one, plus, f(v)))), equal, frac(d(x), x)),

    # 33-36: experiment families
    eq(power(x, two), plus, power(y, two), equal, A, x, mo(','), sp, A, equal,
       frac(row(power(sub('x', '0'), two), plus, power(sub('y', '0'), two)), sub('x', '0'))),
    eq(power(x, two), minus, x, y, plus, power(y, two), equal, A),
    eq(y, plus, x, equal, tan(row(x, plus, C))),
    eq(power(x, two), minus, power(y, two), equal, power(par(x, plus, C), two)),
]
