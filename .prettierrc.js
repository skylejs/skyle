module.exports = {
  printWidth: 120,
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 300,
      },
    },
  ],
};
