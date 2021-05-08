import { toLength } from '../utils/values';

export const minFn = Math.min;
export const maxFn = Math.max;

export function calcFn(equation = '') {
  const splitValues = equation.split(/([+\-*/])/g);
  const parsedEquation = splitValues.map((v) => v.trim()).map((v) => (v.match(/[+\-*/]/) ? v : toLength(v) || v));

  // eslint-disable-next-line no-eval
  return eval(parsedEquation.join(''));
}

export function clampFn(val: number, min = 0, max = Number.MAX_VALUE) {
  return Math.min(Math.max(val, min), max);
}
