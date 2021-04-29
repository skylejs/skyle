import type { Component, CSSProperties } from 'react';

import type * as RN from 'react-native';
import type { easingFunctions } from './easing';
import type { breakpoints } from './hooks/useBreakpoint';

export type EnvVariables = { [key: string]: string | number };

export type BreakpointKeys = typeof breakpoints[number];
export type BreakpointsKeyValue = { [key in BreakpointKeys]: number };

export interface BaseOptions {
  env?: Partial<EnvVariables>;
  breakpoints?: BreakpointsKeyValue;
}

export type NativeStyles = RN.ViewStyle & RN.TextStyle & RN.ImageStyle;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export type Fonts = {
  regular: {
    fontFamily: string;
    fontWeight: string;
  };
  medium: {
    fontFamily: string;
    fontWeight: string;
  };
  light: {
    fontFamily: string;
    fontWeight: string;
  };
  thin: {
    fontFamily: string;
    fontWeight: string;
  };
};

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    error: string;
    text: string;
  };
  fonts: Fonts;
};

export type EasingNameDashed = keyof typeof easingFunctions;

type CamelCase<S extends string> = S extends `${infer P1}-${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

export type EasingNameCamel = CamelCase<EasingNameDashed>;

export type EasingCamelFunctions = {
  [key in EasingNameCamel]: RN.EasingFunction;
};

type EasingFunctionsProps = EasingCamelFunctions & RN.Easing;

export interface ExtendedEasingProps extends EasingFunctionsProps {
  functions: { [name in EasingNameDashed]: RN.EasingFunction };
}

export type StylesProps = {
  theme: Theme;
  screen: RN.ScaledSize;
  window: RN.ScaledSize;
} & { [bp in BreakpointKeys]: Styles } & { [key: string]: any } & Component<any, any>;

type TransformKeys =
  | 'perspective'
  | 'rotate'
  | 'rotateX'
  | 'rotateY'
  | 'rotateZ'
  | 'scale'
  | 'scaleX'
  | 'scaleY'
  | 'skewX'
  | 'skewY'
  | 'translate'
  | 'translateX'
  | 'translateY';

export type ExtendedStyles = {
  paddingX?: number | string;
  paddingY?: number | string;
  marginX?: number | string;
  marginY?: number | string;
};

export type StyleKeys = keyof NativeStyles | keyof CSSProperties | keyof ExtendedStyles | TransformKeys;

type TransitionKeyValue<T> = { [key in StyleKeys]: T };

type TransitionPropertyKeys = StyleKeys | string;

export type TransitionDuration = number | string | TransitionKeyValue<number | string>;
export type TransitionDelay = TransitionDuration;
export type TransitionProperty = TransitionPropertyKeys | TransitionPropertyKeys[];
export type TransitionTimingFunction =
  | RN.EasingFunction
  | EasingNameDashed
  | EasingNameCamel
  | TransitionKeyValue<RN.EasingFunction | EasingNameDashed>[]
  | {};

export type TransitionShorthand =
  | [TransitionProperty?, (number | string)?, TransitionTimingFunction?, (number | string)?]
  | string
  | undefined;

export type TransitionStyles = {
  /**
   * #### ☁️ Skyle
   *
   * The **`transition`** CSS property is a shorthand property for `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.
   *
   * **Syntax**: `[<property>|[], <number>, <easing|Easing>]|[]`
   *
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition
   */
  transition?: TransitionShorthand | TransitionShorthand[];

  /**
   * #### ☁️ Skyle
   *
   * The **`transition-delay`** CSS property specifies the duration to wait before starting a property's transition effect when its value changes.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0`
   *
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-delay
   */
  transitionDelay?: TransitionDelay;

  /**
   * #### ☁️ Skyle
   *
   * The **`transition-duration`** CSS property sets the length of time a transition animation should take to complete. By default, the value is `0s`, meaning that no animation will occur.
   *
   * **Syntax**: `<time>#`
   *
   * **Initial value**: `0s`
   *
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-duration
   */
  transitionDuration?: TransitionDuration;

  /**
   * #### ☁️ Skyle
   *
   * The **`transition-property`** CSS property sets the CSS properties to which a transition effect should be applied.
   *
   * **Syntax**: `none | <property>`
   *
   * **Initial value**: all
   *
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-property
   */
  transitionProperty?: TransitionProperty;

  /**
   * #### ☁️ Skyle
   *
   * The **`transition-timing-function`** CSS property sets how intermediate values are calculated for CSS properties being affected by a transition effect.
   *
   * **Syntax**: `<easing|Easing>`
   *
   * **Initial value**: `ease`
   *
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/transition-timing-function
   */
  transitionTimingFunction?: TransitionTimingFunction;
};

// @ts-ignore TODO: add in TypeScript 4.3
type NthChild = `&:nth-child(${string})`;

export type PseudoClassesStyles = {
  '&:hover'?: Styles;
  '&:active'?: Styles;
  '&:focus'?: Styles;
  '&:empty'?: Styles;
  '&:optional'?: Styles;
  '&:required'?: Styles;
  '&:read-only'?: Styles;
  '&:read-write'?: Styles;
  '&:first-child'?: Styles;
  '&:last-child'?: Styles;

  // TODO: add template string literal (TS 4.3)
  '&:nth-child'?: Styles;
};

export type PseudoElementsStyles = {
  '&::before'?: Styles;
  '&::after'?: Styles;
};

export type EasingType = RN.EasingFunction | EasingNameDashed;
export type BorderStyle = 'solid' | 'dotted' | 'dashed';
type Distance = number | string | [number | string, number | string, (number | string)?, (number | string)?];
type Border = number | string | [number | string, BorderStyle?, RN.ColorValue?];

export type AdjustedStyles = {
  position?: 'relative' | 'absolute' | 'fixed';
  padding?: Distance;
  margin?: Distance;

  border?: Border;
  borderRadius?: Distance;
  borderWidth?: Distance;
  borderTopRadius?: number | string;
  borderBottomRadius?: number | string;

  boxShadow?: [number | string, number | string, (number | string)?, string?] | string;
  textShadow?: [number | string, number | string, number | string, (number | string)?, string?] | string;

  /**
   *
   * In the absence of auto property, none is much like CSS's none value. box-none is as if you had applied the CSS class:
   *
   * .box-none {
   *   pointer-events: none;
   * }
   * .box-none * {
   *   pointer-events: all;
   * }
   *
   * box-only is the equivalent of
   *
   * .box-only {
   *   pointer-events: all;
   * }
   * .box-only * {
   *   pointer-events: none;
   * }
   *
   * But since pointerEvents does not affect layout/appearance, and we are already deviating from the spec by adding additional modes,
   * we opt to not include pointerEvents on style. On some platforms, we would need to implement it as a className anyways. Using style or not is an implementation detail of the platform.
   */
  pointerEvents?: 'auto' | 'none' | 'box-only' | 'box-none';

  color?: string;
};
export type NonePseudoStyles = Omit<TransitionStyles & { content?: string }, keyof AdjustedStyles> & AdjustedStyles;
export type PseudoStyles = NonePseudoStyles & PseudoClassesStyles & PseudoElementsStyles;
export type NoOverlapNativeStyles = Omit<NativeStyles, keyof AdjustedStyles>;
export type Styles = NoOverlapNativeStyles & ExtendedStyles & PseudoStyles;

export type StyleSheetStyles = {
  [key: string]: Styles | StyleSheetStyles;
};

export type PreprocessorReturnType = { [key: string]: any } | null;
export type Preprocessor = { [key: string]: (key: string, value: any) => PreprocessorReturnType };

export type Alias = { [key: string]: string[] };

declare module 'react-native' {
  export interface ViewStyle extends PseudoStyles {}
  export interface ImageStyle extends PseudoStyles {}
}
