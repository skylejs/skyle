import { useEffect, useState } from 'react';

import Skyle from '../base';
import { Dimensions } from 'react-native';
import type { Styles, StyleSheetStyles } from '../types';
import { useTheme } from './useTheme';
import { deepEquals } from '../utils/values';
import { matchMedia } from '../media';
import { safeAreaInsets } from '../context';

export const useStyles = <T,>(styles: T, args?: any): T => {
  const [builtStyles, setBuiltStyles] = useState<StyleSheetStyles>({});
  const theme = useTheme();

  useEffect(() => {
    const newStyles = computeStyles({ __styleSheet: styles, props: { theme }, ...args });
    if (!deepEquals(newStyles, builtStyles)) {
      setBuiltStyles(newStyles);
    }
  }, [builtStyles, styles, theme, args]);

  return builtStyles as any;
};

export function computeStyles(comp: any) {
  const createStyle = comp.__styleSheet;
  let computedStyle =
    typeof createStyle === 'function'
      ? createStyle?.(Object.assign(comp, { theme: comp.__theme }, getMediaQueryProps()))
      : createStyle;

  // Merge every media-queried style if valid.
  Object.keys(computedStyle).map((name) => {
    Object.keys(computedStyle[name]).map((key) => {
      if (key.startsWith('@media ')) {
        const query = key.split('@media ')[1];
        const queryList = matchMedia(query);
        if (queryList.matches) {
          computedStyle[name] = Object.assign(computedStyle[name], computedStyle[name][key]);
        }
        delete computedStyle[name][key];
      }
    });
  });

  // Preprocess styles.
  computedStyle = preprocessStyles(computedStyle);
  // Preprocess extended styles.
  computedStyle = preprocessStyles(computedStyle);

  return computedStyle;
}

export function preprocessStyles(styles: StyleSheetStyles) {
  let processedStyles = styles;
  const processedStyleKeys = Object.keys(processedStyles) as (keyof typeof processedStyles)[];
  processedStyleKeys.map((name) =>
    (Object.keys(processedStyles[name] || {}) as (keyof Styles)[]).map((key) => {
      if (!Array.isArray(processedStyles[name][key]) && typeof processedStyles[name][key] === 'object') {
        // @ts-ignore
        processedStyles[name][key] = preprocessStyles({ r: processedStyles[name][key] as StyleSheetStyles }).r;
        return;
      }
      // Merge every sub media-queried style if valid.
      if (key.startsWith('@media ')) {
        const query = key.split('@media ')[1];
        const queryList = matchMedia(query);
        if (queryList.matches) {
          processedStyles[name] = Object.assign(processedStyles[name], processedStyles[name][key]);
        }
        delete processedStyles[name][key];
      }

      const processor = Skyle.preprocessors[key];
      const value = processedStyles[name][key];

      // Apply all preprocessors for the current property.
      processedStyles[name] = Object.assign(
        processedStyles[name],
        ...Object.keys(Skyle.preprocessors).map((pName) => {
          if (pName.startsWith('_')) {
            return Skyle.preprocessors[pName]?.(key, value);
          }
          return undefined;
        }),
        processor?.(key, value),
      );

      // Filter undefined styles.
      (Object.keys(processedStyles[name]) as (keyof Styles)[]).map((p) => {
        if (typeof processedStyles[name][p] === 'undefined') {
          delete processedStyles[name][p];
        }
      });
    }),
  );

  return processedStyles;
}

/**
 * Get Media Query-specific props to be passed down to StyleSheet.
 * This function gets called on every rerender of the StyleSheet in order to pass updated values.
 */
export function getMediaQueryProps() {
  return {
    screen: Dimensions.get('screen'),
    window: Dimensions.get('window'),

    insets: safeAreaInsets,

    // Convert breakpoints to media queries.
    xs: `@media (max-width: ${Skyle.breakpoints.xs})`,
    sm: `@media (min-width: ${Skyle.breakpoints.xs + 1}) and (max-width: ${Skyle.breakpoints.sm})`,
    md: `@media (min-width: ${Skyle.breakpoints.sm + 1}) and (max-width: ${Skyle.breakpoints.md})`,
    lg: `@media (min-width: ${Skyle.breakpoints.md + 1}) and (max-width: ${Skyle.breakpoints.lg})`,
    xl: `@media (min-width: ${Skyle.breakpoints.lg + 1})`,

    smDown: `@media (max-width: ${Skyle.breakpoints.md})`,
    mdDown: `@media (max-width: ${Skyle.breakpoints.md})`,
    lgDown: `@media (max-width: ${Skyle.breakpoints.lg})`,

    smUp: `@media (max-width: ${Skyle.breakpoints.md})`,
    mdUp: `@media (min-width: ${Skyle.breakpoints.sm})`,
    lgUp: `@media (min-width: ${Skyle.breakpoints.md})`,
  };
}
