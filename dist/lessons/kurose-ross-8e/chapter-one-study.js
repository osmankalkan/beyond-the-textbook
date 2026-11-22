import {T, step} from '../../study/math.js';

export const explain = (tr, en, detailTr, detailEn) => step(tr, en, '', detailTr, detailEn);
export const score = (tr, en) => explain('Puanlama', 'Scoring', tr, en);

export function prediction(id, question, choices, answer, reason) {
  return {id, question, choices, answer, reason};
}

export function path(title, prompt, steps, reflection) {
  return {title, prompt, steps, reflection};
}

export function worked(points, title, statement, trap, steps) {
  return {badge: T(`${points} puan`, `${points} points`), title, statement, trap, steps};
}

export function choice(tag, title, prompt, choices, answer, hints, solution) {
  return {tag, title, text: prompt, choices, answer, hints, feedback: solution, solutionSummary: solution};
}

export function numeric(tag, title, prompt, unit, answer, hints, solution, tolerance = 0.001) {
  return {tag, title, text: prompt, unit, answer, hints, feedback: solution, solutionSummary: solution, tolerance};
}
