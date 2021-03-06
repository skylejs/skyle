import { toLength } from '../utils/values';

export const numeralPreprocessor = (key: string, value: any) => {
  if (typeof value === 'string') {
    const parsedValue = toLength(value) || '';

    if (isNaN(+parsedValue)) {
      return null;
    }

    return {
      [key]: parsedValue,
    };
  }

  return null;
};
