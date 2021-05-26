import { toLength } from '../utils/values';
import isColor from '../utils/is-color';

export const textShadowPreprocessor = (key: string, value: any) => {
  const valuesArr = typeof value === 'string' ? value.split(' ') : Array.isArray(value) ? value : [];

  const width = +(toLength(valuesArr[0]) || 0) || 0;
  const height = +(toLength(valuesArr[1]) || 0) || 0;

  if (valuesArr.length) {
    return {
      [key]: undefined,
      textShadowOffset: { width, height },
      textShadowRadius: isColor(valuesArr[2]) ? 0 : toLength(valuesArr[2]) || 0,
      textShadowColor: isColor(valuesArr[2]) ? valuesArr[2] : valuesArr[3] || 'transparent',
    };
  }

  return null;
};
