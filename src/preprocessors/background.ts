import { isLength } from '../utils/values';
import type {
  BackgroundAttachment,
  BackgroundClip,
  BackgroundOrigin,
  BackgroundSize,
  BackgroundRepeat,
  BackgroundPosition,
  CSSProperty,
} from '../types';
import isColor from '../utils/is-color';

// https://developer.mozilla.org/en-US/docs/Web/CSS/background#formal_definition
const INITIAL_PROPERTIES = {
  backgroundImage: undefined as CSSProperty,
  backgroundPosition: [0, 0] as BackgroundPosition[],
  backgroundSize: ['auto', 'auto'] as BackgroundSize[],
  backgroundRepeat: 'repeat' as BackgroundRepeat,
  backgroundAttachment: 'scroll' as BackgroundAttachment,
  backgroundClip: 'border-box' as BackgroundClip,
  backgroundOrigin: 'padding-box' as BackgroundOrigin,
};

type BackgroundProperties = keyof typeof INITIAL_PROPERTIES;

const IMAGE_KEYWORDS = [
  'url',
  'linear-gradient',
  'radial-gradient',
  'repeating-linear-gradient',
  'repeating-radial-gradient',
];
const POSITION_KEYWORDS = ['top', 'right', 'bottom', 'left'];
const SIZE_KEYWORDS = ['contain', 'cover', 'stretch'];
const ATTACHMENT_KEYWORDS = ['scroll', 'fixed', 'local'];
const ORIGIN_KEYWORDS = ['border-box', 'padding-box', 'content-box'];
const CLIP_KEYWORDS = [...ORIGIN_KEYWORDS, 'text'];
const REPEAT_KEYWORDS = ['repeat-x', 'repeat-y', 'repeat', 'space', 'round', 'no-repeat'];

export const backgroundPreprocessor = (key: string, value: any) => {
  if (value.includes('<svg')) {
    return {
      [key]: undefined,
      backgroundImage: [value],
    };
  }
  const bgArr: (string | undefined)[][] =
    typeof value === 'string'
      ? value
          .replace(/(hsl|hsla|rgb|rgba)\((.*?)\)/gi, (match) =>
            match.replace(/ /g, '').replace(/\(/g, '[').replace(/\)/g, ']').replace(/,/g, '|'),
          )
          .replace(new RegExp(`(${IMAGE_KEYWORDS.join('|')})\\((.*?)\\)`, 'gi'), (match) =>
            match.replace(/ /g, '^').replace(/,/g, '*'),
          )
          .split(',')
          .map((v) => v.trim().split(' '))
      : Array.isArray(value)
      ? value.every((v) => Array.isArray(v))
        ? value
        : [value]
      : [];

  const finalProperties: { [key in BackgroundProperties]?: any } = {};
  let backgroundColor: string | undefined;

  bgArr.forEach((bgProps) => {
    const bgProperties: { [key in BackgroundProperties]?: any } = {
      backgroundImage: undefined,
      backgroundPosition: [],
      backgroundSize: [],
      backgroundRepeat: undefined,
      backgroundAttachment: undefined,
      backgroundClip: undefined,
      backgroundOrigin: undefined,
    };
    const slashIndex = bgProps.indexOf('/');

    bgProps.forEach((val = '', i) => {
      val = val.replace(/\^/g, ' ').replace(/\*/g, ',').replace(/\|/g, ',').replace(/\[/g, '(').replace(/\]/g, ')');
      if (isColor(val)) {
        backgroundColor = val;
        bgProps[i] = undefined;
        return;
      }
      if (IMAGE_KEYWORDS.some((k) => val.includes(k))) {
        bgProperties.backgroundImage = val.replace('*', ',').replace('*', ',').replace('[', '(').replace(']', ')');
        bgProps[i] = undefined;
        return;
      }
      if (REPEAT_KEYWORDS.includes(val)) {
        bgProperties.backgroundRepeat = val;
        bgProps[i] = undefined;
        return;
      }
      if (ATTACHMENT_KEYWORDS.includes(val)) {
        bgProperties.backgroundAttachment = val;
        bgProps[i] = undefined;
        return;
      }
      if (ORIGIN_KEYWORDS.includes(val)) {
        if (bgProperties.backgroundOrigin === INITIAL_PROPERTIES.backgroundOrigin) {
          bgProperties.backgroundOrigin = val;
        }
        bgProperties.backgroundClip = val;
        bgProps[i] = undefined;
        return;
      }
      if (CLIP_KEYWORDS.includes(val)) {
        bgProperties.backgroundClip = val;
        bgProps[i] = undefined;
        return;
      }
      if (slashIndex <= 0) {
        bgProperties.backgroundPosition?.push(val);
        return;
      }
    });

    if (slashIndex > 0) {
      const pos: BackgroundPosition = [];
      const size: BackgroundSize = [];

      bgProps.forEach((v = '', i) => {
        if (i < slashIndex && (isLength(v) || POSITION_KEYWORDS.includes(v))) {
          pos.push(v);
        } else if (i > slashIndex && (isLength(v) || SIZE_KEYWORDS.includes(v))) {
          size.push(v);
        }
      });

      bgProperties.backgroundPosition = pos;
      bgProperties.backgroundSize = size;
    }

    const bgPropKeys = Object.keys(bgProperties) as BackgroundProperties[];
    bgPropKeys.forEach((property) => {
      const val = [...(finalProperties[property] || []), bgProperties[property]];
      finalProperties[property] = !val.flat().length ? undefined : val;
    });
  });

  if (bgArr.length) {
    return {
      [key]: undefined,
      backgroundColor,
      ...finalProperties,
    };
  }

  return {
    [key]: undefined,
  };
};
