import { Dimensions } from 'react-native';
import type { EasingNameCamel, EasingNameDashed } from '../types';
import { Easing } from '..';
import { functionalNotation } from './functional-notation';

const RE_LENGTH_UNIT = /(cm|mm|Q|in|pt|pc|px|em|ex|ch|rem|lh|vw|vh|vmin|vmax)?\s*$/;
const RE_RESOLUTION_UNIT = /(dpi|dpcm|dppx)?\s*$/;

export function toDecimal(ratio: number | string, defaultRaw = false) {
  let decimal = +ratio;

  if (!isNaN(decimal)) {
    const numbers = `${ratio}`.match(/^(\d+)\s*\/\s*(\d+)$/) || [];
    decimal = +numbers[1] / +numbers[2];
    return decimal;
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

const LENGTH = /^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/i;
const ZERO = /^(\+|-)?(0*\.)?0+$/;

export function isLength(value: string | number) {
  return LENGTH.test(`${value}`) || ZERO.test(`${value}`);
}

export function toLength(value: string | number): string | number {
  const fnValue = functionalNotation(`${value}`);
  const parsedValue = toPx(toDecimal(`${fnValue || value}`, true), true);
  const rawValue = (`${parsedValue}`.endsWith('%') ? parsedValue : parseFloat(`${parsedValue}`)) || undefined;
  return rawValue ?? fnValue ?? value;
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
