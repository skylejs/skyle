export const borderPreprocessor = (_key: string, value: any) => {
  const valuesArr = typeof value === 'string' ? value.split(' ') : Array.isArray(value) ? value : [];

  if (valuesArr.length) {
    return {
      border: undefined,
      borderWidth: valuesArr[0],
      borderStyle: valuesArr[1],
      borderColor: valuesArr[2],
    };
  }

  return null;
};
