import { toDecimal, toDpi, toPx } from '../utils/values';

const RE_MEDIA_QUERY = /^(?:(only|not)?\s*([_a-z][_a-z0-9-]*)|(\([^)]+\)))(?:\s*and\s*(.*))?$/i;
const RE_MQ_EXPRESSION = /^\(\s*([_a-z-][_a-z0-9-]*)\s*(?::\s*([^)]+))?\s*\)$/;
const RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/;

type MatchedExpression = {
  feature?: string;
  modifier?: string;
  value: string | number;
};

type MatchedQuery = {
  type: string;
  inverse: boolean;
  expressions: MatchedExpression[];
};

function matchQuery(mediaQuery: string, values: { [key: string]: string | number | boolean }) {
  return parseQuery(mediaQuery).some((query) => {
    const inverse = query.inverse;

    // Either the parsed or specified `type` is "all", or the types must be
    // equal for a match.
    const typeMatch = query.type === 'all' || values.type === query.type;

    // Quit early when `type` doesn't match, but take "not" into account.
    if ((typeMatch && inverse) || !(typeMatch || inverse)) {
      return false;
    }

    const expressionsMatch = query.expressions.every((expression) => {
      let feature = expression.feature,
        modifier = expression.modifier,
        expValue = expression.value,
        value = values[feature || ''];

      // Missing or falsy values don't match.
      if (!value) {
        return false;
      }

      switch (feature) {
        case 'orientation':
        case 'direction':
        case 'scan':
        case 'prefers-color-scheme':
          return `${value}`.toLowerCase() === `${expValue}`.toLowerCase();

        case 'width':
        case 'height':
        case 'device-width':
        case 'device-height':
          expValue = toPx(expValue) ?? expValue;
          value = toPx(`${value}`) ?? value;
          break;

        case 'resolution':
          expValue = toDpi(expValue);
          value = toDpi(`${value}`);
          break;

        case 'aspect-ratio':
        case 'device-aspect-ratio':
          expValue = toDecimal(expValue) ?? expValue;
          value = toDecimal(`${value}`) ?? value;
          break;

        case 'grid':
        case 'color':
        case 'color-index':
        case 'monochrome':
          expValue = parseInt(`${expValue}`, 10) || 1;
          value = parseInt(`${value}`, 10) || 0;
          break;
      }

      switch (modifier) {
        case 'min':
          return value >= expValue;
        case 'max':
          return value <= expValue;
        default:
          return value === expValue;
      }
    });

    return (expressionsMatch && !inverse) || (!expressionsMatch && inverse);
  });
}

function parseQuery(mediaQuery: string) {
  return mediaQuery.split(',').map((query) => {
    query = query.trim();

    let captures = query.match(RE_MEDIA_QUERY);

    // Media Query must be valid.
    if (!captures) {
      throw new SyntaxError('Invalid CSS media query: "' + query + '"');
    }

    const modifier = captures[1];
    const type = captures[2];
    const parsed = {} as MatchedQuery;
    const expressionsStr = ((captures[3] || '') + (captures[4] || '')).trim();

    parsed.inverse = !!modifier && modifier.toLowerCase() === 'not';
    parsed.type = type ? type.toLowerCase() : 'all';

    // Check for media query expressions.
    if (!expressionsStr) {
      parsed.expressions = [];
      return parsed;
    }

    // Split expressions into a list.
    const expressions = expressionsStr.match(/\([^)]+\)/g);

    // Media Query must be valid.
    if (!expressions) {
      throw new SyntaxError('Invalid CSS media query: "' + query + '"');
    }

    parsed.expressions = expressions.map((expression) => {
      captures = expression.match(RE_MQ_EXPRESSION);

      // Media Query must be valid.
      if (!captures) {
        throw new SyntaxError('Invalid CSS media query: "' + query + '"');
      }

      const feature = captures[1].toLowerCase().match(RE_MQ_FEATURE);

      return {
        modifier: feature?.[1],
        feature: feature?.[2],
        value: captures[2],
      };
    });

    return parsed;
  });
}

export default {
  match: matchQuery,
  parse: parseQuery,
};
