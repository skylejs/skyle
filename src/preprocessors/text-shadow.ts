import { toLength } from '../utils/values';
import validateColor from '../utils/validate-color';

export const textShadowPreprocessor = (key: string, value: any) => {
  const valuesArr = typeof value === 'string' ? value.split(' ') : Array.isArray(value) ? value : [];

  if (valuesArr.length) {
    return {
      [key]: undefined,
      textShadowOffset: {
        width: toLength(valuesArr[0]),
        height: toLength(valuesArr[1]),
      },
      textShadowRadius: validateColor(valuesArr[2]) ? 0 : toLength(valuesArr[2]),
      textShadowColor: validateColor(valuesArr[2]) ? valuesArr[2] : valuesArr[3] || 'transparent',
    };
  }

  return null;
};
