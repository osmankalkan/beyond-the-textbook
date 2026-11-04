"""Closed-subset LaTeX -> presentation MathML for reviewed inline formulas.

Only the commands listed below are accepted, so a typo or an unsupported
construct fails the build instead of reaching the reader. The output is plain
presentation MathML with an explicit mrow root; the caller wraps it in <math>.
"""

from .common import mi, mn, mo, row

THIN = '<mspace width="0.1667em"/>'
QUAD = '<mspace width="1em"/>'

OPERATORS = {
    '+': '+', '-': '−', '=': '=', '/': '/', ',': ',', ';': ';', ':': ':',
    '(': '(', ')': ')', '[': '[', ']': ']', '|': '&#124;', '.': '.', '!': '!',
    '<': '&lt;', '>': '&gt;', '?': '?', '*': '∗',
}

SYMBOLS = {
    'pi': mi('π'), 'infty': mi('∞'), 'e': mi('e'),
    'neq': mo('≠'), 'pm': mo('±'), 'mp': mo('∓'),
    'to': mo('→'), 'mapsto': mo('↦'),
    'le': mo('≤'), 'leq': mo('≤'), 'ge': mo('≥'), 'geq': mo('≥'),
    'cdot': mo('⋅'), 'times': mo('×'),
    'cdots': mo('⋯'), 'ldots': mo('…'), 'dots': mo('…'),
    'approx': mo('≈'), 'equiv': mo('≡'), 'sim': mo('∼'),
    'Longrightarrow': mo('⟹'), 'Rightarrow': mo('⇒'), 'iff': mo('⟺'),
    'Longleftrightarrow': mo('⟺'), 'implies': mo('⟹'), 'impliedby': mo('⟸'),
    'int': mo('∫'), 'sum': mo('∑'), 'partial': mo('∂'), 'prime': mo('′'),
    'in': mo('∈'),
    'vert': mo('&#124;'), 'mid': mo('&#124;'),
    '{': mo('{'), '}': mo('}'), '%': mo('%'),
}

FUNCTIONS = {'ln', 'log', 'exp', 'sin', 'cos', 'tan', 'sec', 'csc', 'cot',
             'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'lim'}

GREEK = {
    'alpha': 'α', 'beta': 'β', 'gamma': 'γ', 'delta': 'δ', 'epsilon': 'ε',
    'zeta': 'ζ', 'eta': 'η', 'theta': 'θ', 'kappa': 'κ', 'lambda': 'λ',
    'mu': 'μ', 'nu': 'ν', 'xi': 'ξ', 'pi': 'π', 'rho': 'ρ', 'sigma': 'σ',
    'tau': 'τ', 'phi': 'φ', 'varphi': 'φ', 'chi': 'χ', 'psi': 'ψ', 'omega': 'ω',
    'Phi': 'Φ', 'Psi': 'Ψ', 'Delta': 'Δ', 'Omega': 'Ω', 'Sigma': 'Σ', 'Gamma': 'Γ',
    'Theta': 'Θ', 'Lambda': 'Λ', 'Pi': 'Π',
}

SPACES = {',': THIN, ';': QUAD, ':': QUAD, ' ': QUAD, '!': '',
          'quad': QUAD, 'qquad': QUAD + QUAD}

IGNORED = {'left', 'right', 'bigl', 'bigr', 'Bigl', 'Bigr', 'biggl', 'biggr',
           'displaystyle', 'limits'}


class LatexError(ValueError):
    pass


class _Parser:
    def __init__(self, source):
        self.text = source
        self.at = 0

    def fail(self, message):
        raise LatexError(f'{message} in {self.text!r} at {self.at}')

    def parse(self, stop=None):
        parts = []
        while self.at < len(self.text):
            char = self.text[self.at]
            if stop is not None and char == stop:
                break
            if char == ' ':
                self.at += 1
                continue
            if char == '{':
                self.at += 1
                parts.append(row(self.parse('}')))
                self.at += 1
            elif char in '([':
                parts.append(self.delimited(char))
            elif char == '\\':
                parts.append(self.command())
            elif char == '^':
                self.at += 1
                parts.append(self.scripts(parts.pop(), sup=True))
            elif char == '_':
                self.at += 1
                parts.append(self.scripts(parts.pop(), sup=False))
            elif char == "'":
                self.at += 1
                parts.append('<msup>' + parts.pop() + mo('′') + '</msup>')
            elif char.isdigit():
                start = self.at
                while self.at < len(self.text) and self.text[self.at].isdigit():
                    self.at += 1
                parts.append(mn(self.text[start:self.at]))
            elif char.isalpha():
                parts.append(mi(char))
                self.at += 1
            elif char in OPERATORS:
                parts.append(mo(OPERATORS[char]))
                self.at += 1
            else:
                self.fail(f'unsupported character {char!r}')
        return row(*parts)

    def atom(self):
        while self.text[self.at] == ' ':
            self.at += 1
        char = self.text[self.at]
        if char == '{':
            self.at += 1
            value = row(self.parse('}'))
            self.at += 1
            return value
        if char in '([':
            return self.delimited(char)
        if char == '\\':
            return self.command()
        if char.isdigit():
            start = self.at
            while self.at < len(self.text) and self.text[self.at].isdigit():
                self.at += 1
            return mn(self.text[start:self.at])
        if char.isalpha():
            self.at += 1
            return mi(char)
        self.at += 1
        return mo(OPERATORS[char])

    def delimited(self, opening):
        closing = ')' if opening == '(' else ']'
        self.at += 1
        inner = self.parse(closing)
        self.at += 1
        return row(mo(OPERATORS[opening]), inner, mo(closing))

    def scripts(self, base, sup):
        value = self.atom()
        tag = 'msup' if sup else 'msub'
        return '<' + tag + '>' + base + value + '</' + tag + '>'

    def group(self):
        if self.at < len(self.text) and self.text[self.at] == '{':
            self.at += 1
            value = row(self.parse('}'))
            self.at += 1
            return value
        return self.atom()

    def command(self):
        self.at += 1
        start = self.at
        while self.at < len(self.text) and self.text[self.at].isalpha():
            self.at += 1
        name = self.text[start:self.at]
        if not name:
            char = self.text[self.at]
            self.at += 1
            if char in SPACES:
                return SPACES[char]
            if char in SYMBOLS:
                return SYMBOLS[char]
            if char in '{}%':
                return mo(char)
            self.fail(f'unsupported command \\{char}')
        if name == 'frac':
            return '<mfrac>' + self.group() + self.group() + '</mfrac>'
        if name == 'sqrt':
            return '<msqrt>' + self.group() + '</msqrt>'
        if name == 'mathcal':
            content = self.group()
            if 'D' in content:
                return mi('𝒟')
            if 'L' in content:
                return mi('ℒ')
            return content
        if name in ('mathrm', 'operatorname', 'text', 'rm', 'mathbf'):
            return self.group()
        if name in ('tilde', 'bar', 'hat', 'vec', 'overline'):
            return self.group()
        if name in SPACES:
            return SPACES[name]
        if name in IGNORED:
            return ''
        if name in FUNCTIONS:
            return row('<mi mathvariant="normal">' + name + '</mi>', THIN)
        if name in GREEK:
            return mi(GREEK[name])
        if name in SYMBOLS:
            return SYMBOLS[name]
        self.fail(f'unsupported command \\{name}')


def render(latex):
    """Return the mrow body for a reviewed inline LaTeX token."""
    parser = _Parser(latex)
    body = parser.parse()
    if parser.at != len(latex):
        parser.fail('unbalanced delimiter')
    return body


def inline_math(latex):
    return '<math xmlns="http://www.w3.org/1998/Math/MathML">' + render(latex) + '</math>'
