export const distancePreprocessor = (key: string, value: any) => {
  const valuesArr = typeof value === 'string' ? value.split(' ') : Array.isArray(value) ? value : [];
  const keyWords = key.split(/(?=[A-Z])/);
  const prefix = keyWords?.slice(0, -1).join('') || key;
  const suffix = keyWords.length > 1 ? keyWords?.slice(-1)[0] || '' : '';

  if (valuesArr.length === 2) {
    if (suffix.toLowerCase() === 'radius') {
      return {
        [`${key}`]: undefined,
        [`${prefix}TopLeft${suffix}`]: valuesArr[0],
        [`${prefix}TopRight${suffix}`]: valuesArr[0],
        [`${prefix}BottomRight${suffix}`]: valuesArr[1],
        [`${prefix}BottomLeft${suffix}`]: valuesArr[1],
      };
    }
    return {
      [`${key}`]: undefined,
      [`${prefix}Top${suffix}`]: valuesArr[0],
      [`${prefix}Right${suffix}`]: valuesArr[1],
      [`${prefix}Bottom${suffix}`]: valuesArr[0],
      [`${prefix}Left${suffix}`]: valuesArr[1],
    };
  } else if (valuesArr.length === 4) {
    if (suffix.toLowerCase() === 'radius') {
      return {
        [`${key}`]: undefined,
        [`${prefix}TopLeft${suffix}`]: valuesArr[0],
        [`${prefix}TopRight${suffix}`]: valuesArr[1],
        [`${prefix}BottomRight${suffix}`]: valuesArr[2],
        [`${prefix}BottomLeft${suffix}`]: valuesArr[3],
      };
    }
    return {
      [`${key}`]: undefined,
      [`${prefix}Top${suffix}`]: valuesArr[0],
      [`${prefix}Right${suffix}`]: valuesArr[1],
      [`${prefix}Bottom${suffix}`]: valuesArr[2],
      [`${prefix}Left${suffix}`]: valuesArr[3],
    };
  }

  return {
    [`${key}`]: undefined,
    [`${prefix}Top${suffix}`]: value,
    [`${prefix}Bottom${suffix}`]: value,
    [`${prefix}Left${suffix}`]: value,
    [`${prefix}Right${suffix}`]: value,
  };
};
