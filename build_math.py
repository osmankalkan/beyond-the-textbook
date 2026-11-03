"""Validate bilingual formula parity and generate each lesson's reviewed MathML."""
import json
import re
from pathlib import Path
from math_sources.heating_cooling import expressions as heating
from math_sources.introduction import expressions as introduction

ROOT = Path(__file__).parent / 'dist'
FORMULA_SETS = [
    ('lesson.md', 'lesson-en.md', 'math.json', heating),
    ('lessons/xie-2010/1-1/lesson.md', 'lessons/xie-2010/1-1/lesson-en.md', 'lessons/xie-2010/1-1/math.json', introduction),
]

def blocks(path):
    return [match.strip() for match in re.findall(r'\$\$\s*([\s\S]*?)\s*\$\$', (ROOT / path).read_text())]

def main():
    outputs = []
    for tr_path, en_path, target, expressions in FORMULA_SETS:
        tr, en = blocks(tr_path), blocks(en_path)
        if tr != en:
            raise ValueError(f'Bilingual formula mismatch: {tr_path} / {en_path}')
        if len(tr) != len(expressions) or len(set(tr)) != len(tr):
            raise ValueError(f'Formula count or uniqueness mismatch: {tr_path}')
        mapping = {latex: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>' + expression + '</mrow></math>' for latex, expression in zip(tr, expressions)}
        outputs.append((ROOT / target, mapping))
    # Validate every source before modifying any generated file.
    for path, mapping in outputs:
        path.write_text(json.dumps(mapping, ensure_ascii=False))
        print(f'{path.relative_to(ROOT)}: {len(mapping)} reviewed formula blocks')

if __name__ == '__main__':
    main()
