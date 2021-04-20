export const borderSideRadiusPreprocessor = (key: string, value: any) => {
  const keyWords = key.split(/(?=[A-Z])/);
  const prefix = keyWords?.slice(0, -1).join('') || key;
  const suffix = keyWords.length > 1 ? keyWords?.slice(-1)[0] || '' : '';

  return {
    [`${key}`]: undefined,
    [`${prefix}Left${suffix}`]: value,
    [`${prefix}Right${suffix}`]: value,
  };
};
