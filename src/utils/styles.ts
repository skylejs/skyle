import { StyleSheet } from 'react-native';
import type { StyleKeys, Styles } from '../types';

export const flattenStyle = (style: Styles) => {
  const flatStyle = Object.assign({}, StyleSheet.flatten(style));
  if (flatStyle.transform) {
    flatStyle.transform.forEach((transform) => {
      const key = Object.keys(transform)[0] as keyof typeof transform;
      flatStyle[key] = transform[key];
    });
    delete flatStyle.transform;
  }
  return flatStyle;
};

const DIRECTIONAL_FALLBACKS = {
  Top: ['Vertical', ''],
  Bottom: ['Vertical', ''],
  Vertical: [''],
  Left: ['Horizontal', ''],
  Right: ['Horizontal', ''],
  Horizontal: [''],
};

type FallbackKeys = keyof typeof DIRECTIONAL_FALLBACKS;

const DIRECTIONAL_SUFFICES = Object.keys(DIRECTIONAL_FALLBACKS) as FallbackKeys[];

export const getDefaultStyleValue = (key: StyleKeys, flatStyle: Styles): string | number => {
  if (key === 'backgroundColor') {
    return 'rgba(0,0,0,0)';
  }
  if (key === 'color' || key.indexOf('Color') !== -1) {
    return 'rgba(0,0,0,1)';
  }
  if (key.indexOf('rotate') === 0 || key.indexOf('skew') === 0) {
    return '0deg';
  }
  if (key === 'opacity' || key.indexOf('scale') === 0) {
    return 1;
  }
  if (key === 'fontSize') {
    return 14;
  }
  if (key.indexOf('margin') === 0 || key.indexOf('padding') === 0) {
    let suffix: FallbackKeys;
    for (let i = 0; i < DIRECTIONAL_SUFFICES.length; i++) {
      suffix = DIRECTIONAL_SUFFICES[i];
      if (key.substr(-suffix.length) === suffix) {
        const prefix = key.substr(0, key.length - suffix.length);
        const fallbacks = DIRECTIONAL_FALLBACKS[suffix];
        for (let fallback, j = 0; j < fallbacks.length; j++) {
          fallback = prefix + fallbacks[j];
          if (fallback in flatStyle) {
            return flatStyle[fallback as keyof typeof flatStyle] as string | number;
          }
        }
        break;
      }
    }
  }
  return 0;
};

// These styles need to be nested in a transform array
const TRANSFORM_STYLE_PROPERTIES = [
  'perspective',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scaleX',
  'scaleY',
  'skewX',
  'skewY',
  'translate',
  'translateX',
  'translateY',
];

// Transforms { translateX: 1 } to { transform: [{ translateX: 1 }]}
export const wrapTransforms = (style: Styles) => {
  let wrapped: any = {};
  const styleKeys = Object.keys(style) as (keyof typeof style)[];
  styleKeys.forEach((key) => {
    if (TRANSFORM_STYLE_PROPERTIES.indexOf(key) !== -1) {
      if (!wrapped.transform) {
        wrapped.transform = [];
      }
      wrapped.transform.push({
        [key]: style[key],
      });
    } else {
      wrapped[key] = style[key];
    }
  });
  return wrapped;
};
