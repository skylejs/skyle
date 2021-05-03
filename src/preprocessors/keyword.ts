const KEYWORDS = ['inherit', 'initial', 'unset', 'none', 'auto'];

export const keywordPreprocessor = (key: string, value: any) => {
  // TODO - implement keyword functionality
  // Right now, the keywords are ignored.
  return {
    [key]: KEYWORDS.includes(`${value}`.trim().toLowerCase()) ? null : value,
  };
};
