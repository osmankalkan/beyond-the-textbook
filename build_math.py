"""Validate bilingual formula parity and generate each lesson's reviewed MathML."""
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from math_sources.heating_cooling import expressions as heating
from math_sources.introduction import expressions as introduction
from math_sources.concepts import FORMULAS as concepts

from math_sources.separation import expressions as separation
from math_sources.transformation import expressions as transformation
from math_sources.exactness import expressions as exactness
from math_sources.linear import expressions as linear
from math_sources.solvable import expressions as solvable
from math_sources.solvable_inline import INLINE as solvable_inline
from math_sources.inline_math import inline_math, render

ROOT = Path(__file__).parent / 'dist'
FORMULA_SETS = [
    ('lessons/xie-2010/2-1/lesson.md', 'lessons/xie-2010/2-1/lesson-en.md', 'lessons/xie-2010/2-1/math.json', separation),
    ('lessons/xie-2010/2-2/lesson.md', 'lessons/xie-2010/2-2/lesson-en.md', 'lessons/xie-2010/2-2/math.json', transformation),
    ('lessons/xie-2010/2-3/lesson.md', 'lessons/xie-2010/2-3/lesson-en.md', 'lessons/xie-2010/2-3/math.json', exactness),
    ('lessons/xie-2010/2-4/lesson.md', 'lessons/xie-2010/2-4/lesson-en.md', 'lessons/xie-2010/2-4/math.json', linear),
    ('lessons/xie-2010/2-5/lesson.md', 'lessons/xie-2010/2-5/lesson-en.md', 'lessons/xie-2010/2-5/math.json', solvable),
    ('lesson.md', 'lesson-en.md', 'math.json', heating),
    ('lessons/xie-2010/1-1/lesson.md', 'lessons/xie-2010/1-1/lesson-en.md', 'lessons/xie-2010/1-1/math.json', introduction),
    ('lessons/xie-2010/1-2/lesson.md', 'lessons/xie-2010/1-2/lesson-en.md', 'lessons/xie-2010/1-2/math.json', [item[2] for item in concepts]),
]

# Lessons may also auto-render their display blocks from the same closed LaTeX
# subset used for inline mathematics. Hand-tuned registries above still win
# when a lesson needs a particular composition.
AUTO_BLOCK_SETS = [
    ('lessons/xie-2010/2-6/lesson.md', 'lessons/xie-2010/2-6/lesson-en.md', 'lessons/xie-2010/2-6/math.json'),
    ('lessons/xie-2010/2-7/lesson.md', 'lessons/xie-2010/2-7/lesson-en.md', 'lessons/xie-2010/2-7/math.json'),
    ('lessons/xie-2010/4-1/lesson.md', 'lessons/xie-2010/4-1/lesson-en.md', 'lessons/xie-2010/4-1/math.json'),
    ('lessons/xie-2010/4-2/lesson.md', 'lessons/xie-2010/4-2/lesson-en.md', 'lessons/xie-2010/4-2/math.json'),
    ('lessons/xie-2010/4-3/lesson.md', 'lessons/xie-2010/4-3/lesson-en.md', 'lessons/xie-2010/4-3/math.json'),
    ('lessons/xie-2010/4-5/lesson.md', 'lessons/xie-2010/4-5/lesson-en.md', 'lessons/xie-2010/4-5/math.json'),
    ('lessons/xie-2010/6-1/lesson.md', 'lessons/xie-2010/6-1/lesson-en.md', 'lessons/xie-2010/6-1/math.json'),
    ('lessons/xie-2010/6-2/lesson.md', 'lessons/xie-2010/6-2/lesson-en.md', 'lessons/xie-2010/6-2/math.json'),
    ('lessons/xie-2010/6-3/lesson.md', 'lessons/xie-2010/6-3/lesson-en.md', 'lessons/xie-2010/6-3/math.json'),
    ('lessons/xie-2010/6-4/lesson.md', 'lessons/xie-2010/6-4/lesson-en.md', 'lessons/xie-2010/6-4/math.json'),
    ('lessons/xie-2010/6-5/lesson.md', 'lessons/xie-2010/6-5/lesson-en.md', 'lessons/xie-2010/6-5/math.json'),
    ('lessons/xie-2010/6-6/lesson.md', 'lessons/xie-2010/6-6/lesson-en.md', 'lessons/xie-2010/6-6/math.json'),
    ('lessons/xie-2010/6-7/lesson.md', 'lessons/xie-2010/6-7/lesson-en.md', 'lessons/xie-2010/6-7/math.json'),
    ('lessons/xie-2010/7-1/lesson.md', 'lessons/xie-2010/7-1/lesson-en.md', 'lessons/xie-2010/7-1/math.json'),
]

# Optional named formula registries let activities use IDs rather than JSON order.
NAMED_SETS = {
    'lessons/xie-2010/1-2/math.json': {
        'definitions': concepts,
        'target': 'lessons/xie-2010/1-2/equations.js'
    }
}

# Lessons may also ship reviewed inline MathML for math written inside prose.
# The third element is a reviewed LaTeX->MathML table when hand tuning is
# needed, or None to render the closed subset in math_sources.inline_math.
INLINE_SETS = {
    'lessons/xie-2010/2-2/lesson.md': (
        'lessons/xie-2010/2-2/lesson-en.md',
        'lessons/xie-2010/2-2/inline.json',
        None,
    ),
    'lessons/xie-2010/2-3/lesson.md': (
        'lessons/xie-2010/2-3/lesson-en.md',
        'lessons/xie-2010/2-3/inline.json',
        None,
    ),
    'lessons/xie-2010/2-4/lesson.md': (
        'lessons/xie-2010/2-4/lesson-en.md',
        'lessons/xie-2010/2-4/inline.json',
        None,
    ),
    'lessons/xie-2010/2-5/lesson.md': (
        'lessons/xie-2010/2-5/lesson-en.md',
        'lessons/xie-2010/2-5/inline.json',
        solvable_inline,
    ),
    'lessons/xie-2010/2-6/lesson.md': (
        'lessons/xie-2010/2-6/lesson-en.md',
        'lessons/xie-2010/2-6/inline.json',
        None,
    ),
    'lessons/xie-2010/2-7/lesson.md': (
        'lessons/xie-2010/2-7/lesson-en.md',
        'lessons/xie-2010/2-7/inline.json',
        None,
    ),
    'lessons/xie-2010/4-1/lesson.md': (
        'lessons/xie-2010/4-1/lesson-en.md',
        'lessons/xie-2010/4-1/inline.json',
        None,
    ),
    'lessons/xie-2010/4-2/lesson.md': (
        'lessons/xie-2010/4-2/lesson-en.md',
        'lessons/xie-2010/4-2/inline.json',
        None,
    ),
    'lessons/xie-2010/4-3/lesson.md': (
        'lessons/xie-2010/4-3/lesson-en.md',
        'lessons/xie-2010/4-3/inline.json',
        None,
    ),
    'lessons/xie-2010/4-5/lesson.md': (
        'lessons/xie-2010/4-5/lesson-en.md',
        'lessons/xie-2010/4-5/inline.json',
        None,
    ),
    'lessons/xie-2010/6-1/lesson.md': (
        'lessons/xie-2010/6-1/lesson-en.md',
        'lessons/xie-2010/6-1/inline.json',
        None,
    ),
    'lessons/xie-2010/6-2/lesson.md': (
        'lessons/xie-2010/6-2/lesson-en.md',
        'lessons/xie-2010/6-2/inline.json',
        None,
    ),
    'lessons/xie-2010/6-3/lesson.md': (
        'lessons/xie-2010/6-3/lesson-en.md',
        'lessons/xie-2010/6-3/inline.json',
        None,
    ),
    'lessons/xie-2010/6-4/lesson.md': (
        'lessons/xie-2010/6-4/lesson-en.md',
        'lessons/xie-2010/6-4/inline.json',
        None,
    ),
    'lessons/xie-2010/6-5/lesson.md': (
        'lessons/xie-2010/6-5/lesson-en.md',
        'lessons/xie-2010/6-5/inline.json',
        None,
    ),
    'lessons/xie-2010/6-6/lesson.md': (
        'lessons/xie-2010/6-6/lesson-en.md',
        'lessons/xie-2010/6-6/inline.json',
        None,
    ),
    'lessons/xie-2010/6-7/lesson.md': (
        'lessons/xie-2010/6-7/lesson-en.md',
        'lessons/xie-2010/6-7/inline.json',
        None,
    ),
    'lessons/xie-2010/7-1/lesson.md': (
        'lessons/xie-2010/7-1/lesson-en.md',
        'lessons/xie-2010/7-1/inline.json',
        None,
    )
}

def blocks(path):
    return [match.strip() for match in re.findall(r'\$\$\s*([\s\S]*?)\s*\$\$', (ROOT / path).read_text())]

def inline_tokens(path):
    return list(dict.fromkeys(match.strip() for match in re.findall(r'\\\((.+?)\\\)', (ROOT / path).read_text())))

def main():
    outputs = []
    for tr_path, en_path, target, expressions in FORMULA_SETS:
        tr, en = blocks(tr_path), blocks(en_path)
        if tr != en:
            raise ValueError(f'Bilingual formula mismatch: {tr_path} / {en_path}')
        if len(tr) != len(expressions) or len(set(tr)) != len(tr):
            raise ValueError(f'Formula count or uniqueness mismatch: {tr_path}')
        named = NAMED_SETS.get(target)
        if named:
            definitions = named['definitions']
            if tr != [item[1] for item in definitions] or len({item[0] for item in definitions}) != len(definitions):
                raise ValueError(f'Named formula registry mismatch: {tr_path}')
            aliases = {key: latex for key, latex, _ in definitions}
            outputs.append((ROOT / named['target'], '// Generated by build_math.py; edit math_sources instead.\nexport const EQUATIONS = Object.freeze(' + json.dumps(aliases, ensure_ascii=False) + ');\n'))
        mapping = {latex: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>' + expression + '</mrow></math>' for latex, expression in zip(tr, expressions)}
        outputs.append((ROOT / target, mapping))
    for tr_path, en_path, target in AUTO_BLOCK_SETS:
        tr, en = blocks(tr_path), blocks(en_path)
        if tr != en:
            raise ValueError(f'Bilingual formula mismatch: {tr_path} / {en_path}')
        if len(set(tr)) != len(tr):
            raise ValueError(f'Formula uniqueness mismatch: {tr_path}')
        mapping = {
            latex: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">'
                   + render(latex) + '</math>'
            for latex in tr
        }
        outputs.append((ROOT / target, mapping))
    for tr_path, (en_path, target, expressions) in INLINE_SETS.items():
        tr, en = inline_tokens(tr_path), inline_tokens(en_path)
        if set(tr) != set(en):
            raise ValueError(f'Bilingual inline formula mismatch: {tr_path} / {en_path}')
        if expressions is None:
            mapping = {latex: inline_math(latex) for latex in tr}
        else:
            if set(tr) != set(expressions):
                missing = sorted(set(tr) - set(expressions))
                extra = sorted(set(expressions) - set(tr))
                raise ValueError(f'Inline formula registry mismatch: {tr_path} (missing {missing}, extra {extra})')
            mapping = {latex: '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>' + expressions[latex] + '</mrow></math>' for latex in tr}
        outputs.append((ROOT / target, mapping))
    # Validate every source before modifying any generated file.
    namespace = '{http://www.w3.org/1998/Math/MathML}'
    for path, mapping in outputs:
        if isinstance(mapping, str):
            continue
        for latex, math in mapping.items():
            try:
                root = ET.fromstring(math)
            except ET.ParseError as error:
                raise ValueError(f'Malformed MathML for {latex!r} in {path}: {error}') from error
            if root.tag != namespace + 'math' or root[0].tag != namespace + 'mrow':
                raise ValueError(f'MathML root must be math/mrow for {latex!r} in {path}')
            if path.name == 'inline.json' and '|' in math:
                raise ValueError(f'Inline MathML for {latex!r} in {path} contains a literal pipe, which would break a GFM table cell; write &#124; instead')
    auto_targets = {target for _, _, target in AUTO_BLOCK_SETS}
    for path, mapping in outputs:
        path.write_text(mapping if isinstance(mapping, str) else json.dumps(mapping, ensure_ascii=False))
        if isinstance(mapping, str):
            print(f'{path.relative_to(ROOT)}: generated')
        else:
            relative = path.relative_to(ROOT).as_posix()
            if path.name == 'inline.json':
                kind = 'inline formulas'
            elif relative in auto_targets:
                kind = 'auto-rendered formula blocks'
            else:
                kind = 'reviewed formula blocks'
            print(f'{relative}: {len(mapping)} {kind}')

if __name__ == '__main__':
    main()
