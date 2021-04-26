export const placeContentPreprocessor = (key: string, value: any) => {
  const valuesArr = typeof value === 'string' ? value.split(' ') : Array.isArray(value) ? value : [];

  if (valuesArr.length) {
    return {
      [key]: undefined,
      alignContent: valuesArr[0],
      justifyContent: valuesArr[1] || valuesArr[0],
    };
  }

  return null;
};
