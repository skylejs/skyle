import { envFn } from '../functional-notations/env';
import { minFn, maxFn, calcFn, clampFn } from '../functional-notations/math';
import { toLength } from './values';

type FunctionalNotation = (...args: any) => string | number | undefined;

const functions: { [key: string]: FunctionalNotation } = {
  min: minFn,
  max: maxFn,
  calc: (e: string) => calcFn(e),
  clamp: (min: number, val: number, max: number) => clampFn(val, min, max),
  env: (v: string, o_fallback?: string | number) => envFn(v, o_fallback),
};

export function functionalNotation(value: string) {
  if (typeof value === 'string') {
    const funcName = value.split('(')[0];
    if (Object.keys(functions).includes(funcName)) {
      const values = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));

      if (!values) {
        return null;
      }

      const isArgs = values?.includes(',');
      const valueArgs =
        values
          ?.replace(/,\s*(?=[^)^)]*(?:\(|\(|$))/g, '##')
          ?.split('##')
          ?.map((v) => toLength(v.trim())) || [];

      const func = functions?.[funcName as keyof typeof functions];
      const args = getFunctionParams(func).filter((p) => !p.startsWith('o_'));

      if (args.length > 0 && args.length !== valueArgs.length) {
        console.log(func.prototype);
        console.error(
          `Function "${funcName}" is missing arguments. Expected ${func.length} but received ${valueArgs.length}`,
        );
        return null;
      }

      return isArgs ? func?.(...valueArgs) : func?.(values);
    }
  }
  return value;
}

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getFunctionParams(func: Function) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}
