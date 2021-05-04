import { toLength } from '../utils/values';
import isColor from '../utils/is-color';

export const boxShadowPreprocessor = (key: string, value: any) => {
  const valuesArr = typeof value === 'string' ? value.split(' ') : Array.isArray(value) ? value : [];

  const width = toLength(valuesArr[0]);
  const height = toLength(valuesArr[1]);

  if (valuesArr.length) {
    return {
      [key]: undefined,
      shadowOffset: { width, height },
      shadowRadius: isColor(valuesArr[2]) ? 0 : toLength(valuesArr[2]) || 0,
      shadowColor: isColor(valuesArr[2]) ? valuesArr[2] : valuesArr[3] || 'transparent',
      shadowOpacity: 1,
    };
  }

  return null;
};
