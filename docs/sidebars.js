module.exports = {
  docs: [
    'index',
    'get-started',
    'usage',
    'components',
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/shorthands',
        'features/units',
        'features/theming',
        'features/variables',
        'features/functional-notations',
        'features/aliases',
        'features/pointer-events',
        'features/spread-props',
        'features/media-queries',
        'features/breakpoints',
        'features/transitions',
        'features/pseudos',
        'features/preprocessors',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/basic',
        'examples/transitions',
        'examples/touchable',
        'examples/theme',
        'examples/media',
        'examples/variables',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/default',
        'api/decorator',
        'api/stylesheet',
        'api/properties',
        'api/easing',
        'api/match-media',
        'api/use-styles',
        'api/use-theme',
      ],
    },
  ],
};
