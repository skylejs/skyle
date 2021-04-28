import Base from '../base';

export const aliasPreprocessor = (key: string, value: any) => {
  const alias: any = {};
  Object.keys(Base.aliases).forEach((propKey) => {
    if (Base.aliases[propKey].includes(key)) {
      alias[propKey] = value;
    }
  });
  return alias || null;
};
