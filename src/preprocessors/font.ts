import { isLength } from '../utils/values';

export const FONT_VARIANT_KEYWORDS = [
  'normal',
  'small-caps',
  'oldstyle-nums',
  'lining-nums',
  'tabular-nums',
  'proportional-nums',
];
export const FONT_STYLE_KEYWORDS = ['normal', 'italic'];
export const FONT_WEIGHT_KEYWORDS = ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

export const fontPreprocessor = (key: string, value: any) => {
  const valuesArr = typeof value === 'string' ? value.split(' ') : Array.isArray(value) ? value : [];

  const fontStyles: any = {};

  valuesArr.forEach((val, i) => {
    val = `${val}`.trim();
    if (FONT_STYLE_KEYWORDS.includes(val)) {
      fontStyles.fontStyle = val;
      return;
    }
    if (FONT_VARIANT_KEYWORDS.includes(val)) {
      fontStyles.fontVariant = val;
      return;
    }
    if (isLength(val)) {
      if (valuesArr[i - 1].includes('/')) {
        fontStyles.lineHeight = val;
        return;
      } else if (FONT_WEIGHT_KEYWORDS.includes(val) && isLength(valuesArr[i + 1])) {
        fontStyles.fontWeight = val;
        return;
      } else {
        fontStyles.fontSize = val;
        return;
      }
    }
    fontStyles.fontFamily = val;
  });

  return {
    [key]: undefined,
    ...fontStyles,
  };
};
