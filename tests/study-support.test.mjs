import test from 'node:test';
import assert from 'node:assert/strict';
import {getLesson} from '../dist/content.js';
test('Every developed foundation topic has complete bilingual reasoning and exam cases',()=>{
 for(const section of ['1.1','1.2','2.1','2.2','2.3'])for(const lang of ['tr','en']){
  const lesson=getLesson('xie-2010:'+section,lang).lesson;
  assert.equal(lesson.studySupport.paths.length,2);
  for(const path of lesson.studySupport.paths){assert.equal(path.steps.length,5);for(const st of path.steps){assert.ok(st.label&&st.math&&st.text);assert.ok(!st.math.includes('<mtext>'));}}
  for(const pred of lesson.studySupport.predictions){assert.ok(pred.question&&pred.context&&pred.reason&&pred.try);assert.ok(pred.answer>=0&&pred.answer<pred.choices.length);}
  for(const c of lesson.guidedTools.examClinic){assert.ok(c.statement&&c.trap);assert.ok(c.steps.length>=4);}
 }
 assert.equal(getLesson('xie-2010:2.1','tr').lesson.questions.length,11);
 assert.equal(getLesson('xie-2010:2.2','tr').lesson.questions.length,11);
 assert.equal(getLesson('xie-2010:2.3','tr').lesson.questions.length,11);
 // The first three question indices retain the meaning of existing progress records.
 assert.equal(getLesson('xie-2010:2.1','tr').lesson.questions[1].answer,2);
});
