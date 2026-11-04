import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getMathReference, MATH_REFERENCE} from '../dist/lessons/math-reference.js';
import {getLesson} from '../dist/content.js';
import {ui} from '../dist/i18n.js';

const developedSections=['1.1','1.2','2.1','2.2','2.3','2.4','2.5','2.6','2.7','3.1','4.1','4.2','4.3','4.5','6.1','6.2'];
const wrap=fragment=>`<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>${fragment}</mrow></math>`;

function assertBalancedMarkup(markup,label){
  const stack=[];
  for(const match of markup.matchAll(/<\/?([a-z][a-z0-9]*)\b[^>]*>/g)){
    const closing=match[0].startsWith('</');
    if(closing){
      assert.equal(stack.pop(),match[1],`${label}: unmatched </${match[1]}>`);
    }else{
      stack.push(match[1]);
    }
  }
  assert.deepEqual(stack,[],`${label}: unclosed tags`);
}

test('Every developed section has section-specific derivative and integral rules',()=>{
  for(const section of developedSections){
    const reference=getMathReference(section,'tr');
    assert.ok(reference,`missing reference for §${section}`);
    assert.ok(reference.derivative.length>=4,`§${section} needs enough derivative rules`);
    assert.ok(reference.integral.length>=4,`§${section} needs enough integral rules`);
    for(const item of [...reference.derivative,...reference.integral]){
      assert.ok(item.label,`§${section} has an unlabelled rule`);
      assert.ok(item.math,`§${section} has an empty formula`);
    }
    assert.equal(new Set(reference.derivative.map(item=>item.math)).size,reference.derivative.length,`§${section} repeats a derivative`);
    assert.equal(new Set(reference.integral.map(item=>item.math)).size,reference.integral.length,`§${section} repeats an integral`);
  }
});

test('Rules follow the mathematical focus of each lesson',()=>{
  const has=(section,kind,label)=>getMathReference(section,'en')[kind].some(item=>item.label===label);
  assert.ok(has('2.1','integral','Partial fractions'));
  assert.ok(has('2.2','derivative','Quotient rule'));
  assert.ok(has('2.3','derivative','Total differential'));
  assert.ok(has('2.3','derivative','Mixed partial derivative'));
  assert.ok(has('2.3','integral','Potential function'));
  assert.ok(has('2.4','integral','Integration by parts'));
  assert.ok(has('2.5','derivative','Parametric derivative'));
  assert.ok(has('2.5','derivative','Inverse derivative'));
  assert.ok(has('2.6','integral','Repeated integration'));
  assert.ok(has('3.1','integral','Scaled exponential'));
  assert.ok(has('4.1','derivative','The D operator'));
  assert.ok(has('4.1','derivative','Linearity'));
  assert.ok(has('4.1','integral','Linearity'));
  assert.ok(has('4.2','derivative','Hyperbolic cosine'));
  assert.ok(has('4.3','integral','Inverse operator'));
  assert.ok(has('4.5','derivative','Euler operator'));
  assert.ok(has('6.1','derivative','Transform of derivative'));
  assert.ok(has('6.1','integral','Kernel integral'));
  assert.ok(has('6.2','derivative','Second shifting theorem'));
  assert.ok(has('6.2','integral','Delayed step integral'));
  assert.ok(!has('2.3','derivative','Parametric derivative'));
  assert.ok(!has('1.1','derivative','The D operator'));
});

test('Reference labels are bilingual while formulas stay identical',()=>{
  for(const section of developedSections){
    const tr=getMathReference(section,'tr'),en=getMathReference(section,'en');
    for(const kind of ['derivative','integral']){
      assert.equal(tr[kind].length,en[kind].length);
      assert.notDeepEqual(tr[kind].map(item=>item.label),en[kind].map(item=>item.label),`§${section} ${kind} labels are not localized`);
      assert.deepEqual(tr[kind].map(item=>item.math),en[kind].map(item=>item.math),`§${section} ${kind} formulas drift by language`);
    }
  }
  assert.equal(getMathReference('9.9','tr'),null);
  assert.equal(getMathReference('1.1','en').derivative[0].math,getMathReference('1.1','tr').derivative[0].math);
});

test('Every reference formula is balanced MathML under an mrow root',()=>{
  for(const [section,entry] of Object.entries(MATH_REFERENCE)){
    for(const item of [...entry.derivative,...entry.integral]){
      const markup=wrap(item.math);
      assert.match(markup,/<math[^>]*><mrow>/);
      assertBalancedMarkup(markup,`§${section} ${item.label.tr}`);
      assert.ok(!item.math.includes('\\'),`§${section} ${item.label.tr}: raw LaTeX leaked into MathML`);
      assert.ok(!item.math.includes('$'),`§${section} ${item.label.tr}: raw math delimiter leaked into MathML`);
      assert.ok(!item.math.includes('<mtext>'),`§${section} ${item.label.tr}: formulas should not need mtext`);
    }
  }
});

test('Lesson markup, app wiring and UI labels expose the reference drawer',()=>{
  const html=readFileSync('dist/index.html','utf8');
  for(const id of ['math-reference-open','math-reference-dialog','math-reference-title','math-reference-close','math-reference-derivative','math-reference-integral']){
    assert.match(html,new RegExp(`id="${id}"`),`missing #${id}`);
  }
  const app=readFileSync('dist/app.js','utf8');
  assert.match(app,/getMathReference/);
  assert.match(app,/renderMathReference\(\)/);
  assert.match(app,/showModal\(\)/);
  for(const lang of ['tr','en']){
    for(const key of ['mathReferenceOpen','mathReferenceOpenHint','mathReferenceTitle','mathReferenceDerivative','mathReferenceIntegral','mathReferenceClose','mathReferenceEmpty']){
      assert.ok(ui(lang,key),`missing ${lang}.${key}`);
      assert.notEqual(ui(lang,key),ui(lang==='tr'?'en':'tr',key),`${key} is not localized`);
    }
    assert.match(ui(lang,'mathReferenceEyebrow','3.1'),/§3\.1/);
    assert.match(ui(lang,'mathReferenceIntro','3.1'),/§3\.1/);
  }
  for(const section of developedSections){
    assert.equal(getLesson(`xie-2010:${section}`,'tr').lesson.section,section);
  }
});
