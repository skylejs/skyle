import { functionalNotation, toDecimal, toPx } from '../utils/values';

export const numeralPreprocessor = (key: string, value: any) => {
  if (typeof value === 'string') {
    const parsedValue = toPx(toDecimal(functionalNotation(value) || value, true), true);
    const rawValue = (`${parsedValue}`.endsWith('%') ? parsedValue : parseFloat(`${parsedValue}`)) || undefined;

    if (!rawValue) {
      return null;
    }

    return {
      [key]: rawValue,
    };
  }

  return null;
};
