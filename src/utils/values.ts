import { Dimensions } from 'react-native';
import { numeralPreprocessor } from '../preprocessors/numeral';
import type { EasingNameCamel, EasingNameDashed } from '../types';
import { Easing } from '..';

const RE_LENGTH_UNIT = /(cm|mm|Q|in|pt|pc|px|em|ex|ch|rem|lh|vw|vh|vmin|vmax)?\s*$/;
const RE_RESOLUTION_UNIT = /(dpi|dpcm|dppx)?\s*$/;

export function toDecimal(ratio: number | string, defaultRaw = false) {
  let decimal = +ratio;

  if (!decimal) {
    const numbers = `${ratio}`.match(/^(\d+)\s*\/\s*(\d+)$/) || [];
    decimal = +numbers[1] / +numbers[2];
  }

  return defaultRaw ? ratio : decimal;
}

export function toDpi(resolution: number | string, defaultRaw = false) {
  const value = parseFloat(`${resolution}`);
  const units = `${resolution}`.match(RE_RESOLUTION_UNIT)?.[1];

  switch (units) {
    case 'dpcm':
      return value / 2.54;
    case 'dppx':
      return value * 96;
    default:
      return defaultRaw ? resolution : value;
  }
}

export function toPx(length: number | string, defaultRaw = false) {
  const value = parseFloat(`${length}`);
  const units = `${length}`.match(RE_LENGTH_UNIT)?.[1];
  const dims = Dimensions.get('window');

  switch (units) {
    // Absolute
    case 'cm':
      return (value * 96) / 2.54;
    case 'mm':
      return (value * 96) / 2.54 / 10;
    case 'Q':
      return (value * 96) / 2.54 / 40;
    case 'in':
      return value * 96;
    case 'pt':
      return value * 72;
    case 'pc':
      return (value * 72) / 12;
    case 'px':
      return value;

    // Relative
    case 'em':
      return value * 16;
    case 'ex':
      return value * 16;
    case 'ch':
      return value * 16;
    case 'rem':
      return value * 16;
    case 'lh':
      return value * 16;
    case 'vw':
      return (dims.width / 100) * value;
    case 'vh':
      return (dims.height / 100) * value;
    case 'vmin':
      return (Math.min(dims.width, dims.height) / 100) * value;
    case 'vmax':
      return (Math.max(dims.width, dims.height) / 100) * value;
    default:
      return defaultRaw ? length : value;
  }
}

export function toDuration(duration?: number | string) {
  if (typeof duration === 'string') {
    const value = parseFloat(duration);
    duration = duration.endsWith('ms') ? value : value * 1000;
  }
  return duration;
}

export function toEasing(easing?: string) {
  return typeof easing === 'string'
    ? easing.includes('cubic-bezier')
      ? Easing.bezier(...bezierStringToArray(easing))
      : Easing[easing as EasingNameCamel] || Easing.functions[easing as EasingNameDashed]
    : easing;
}

function bezierStringToArray(str: string) {
  return str
    .split('cubic-bezier(')
    .pop()
    ?.split(')')[0]
    .split(',')
    .map((es) => +es) as [number, number, number, number];
}

export function toCamelCase(str: string) {
  return str.split('-').reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1));
}

export function deepEquals(a: object, b: object) {
  return a === b || JSON.stringify(a) === JSON.stringify(b);
}

export function calc(equation = '') {
  const splitValues = equation.split(/([+\-*/])/g);
  const parsedEquation = splitValues
    .map((v) => v.trim())
    .map((v) => (v.match(/[+\-*/]/) ? v : numeralPreprocessor('x', v)?.x || v));

  // eslint-disable-next-line no-eval
  return eval(parsedEquation.join(''));
}

export function clamp(val: number, min = 0, max = Number.MAX_VALUE) {
  return Math.min(Math.max(val, min), max);
}

//
type FunctionalNotation = (...args: any) => string | number;

const functions: { [key: string]: FunctionalNotation } = {
  calc: (e: string) => calc(e),
  min: Math.min,
  max: Math.max,
  clamp: (min: number, val: number, max: number) => clamp(val, min, max),
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
          ?.map((v) => v.trim())
          ?.map((v) => numeralPreprocessor('x', v)?.x || v) || [];

      const func = functions?.[funcName as keyof typeof functions];

      if (func.length > 0 && func.length !== valueArgs.length) {
        console.error(
          `Function "${funcName}" is missing arguments. Expected ${func.length} but received ${valueArgs.length}`,
        );
        return null;
      }

      return (isArgs ? func?.(...valueArgs) : func?.(values)) || value;
    }
  }
  return value;
}
