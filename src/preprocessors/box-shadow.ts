import validateColor from '../utils/validate-color';

export const boxShadowPreprocessor = (key: string, value: any) => {
  const valuesArr = typeof value === 'string' ? value.split(' ') : Array.isArray(value) ? value : [];

  if (valuesArr.length) {
    return {
      [key]: undefined,
      shadowOffset: {
        width: valuesArr[0],
        height: valuesArr[1],
      },
      shadowRadius: validateColor(valuesArr[2]) ? 0 : valuesArr[2],
      shadowColor: validateColor(valuesArr[2]) ? valuesArr[2] : valuesArr[3] || 'transparent',
      shadowOpacity: 1,
    };
  }

  return null;
};
