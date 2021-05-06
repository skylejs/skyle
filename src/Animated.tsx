import React, { Component, DOMAttributes, ComponentType } from 'react';

import * as RN from 'react-native';

import type {
  AdjustedStyles,
  NativeStyles,
  Styles,
  StyleSheetStyles,
  TransitionDuration,
  TransitionTimingFunction,
} from './types';
import { Easing } from '.';
import { flattenStyle, getDefaultStyleValue, wrapStyles } from './utils/styles';
import { toCamelCase, toDuration, toEasing } from './utils/values';
import StyleSheet from './StyleSheet';
import { removeInvalidStyles } from './utils/valid-styles';
import { preprocessStyles } from './hooks/useStyles';
import BoxShadow from './components/BoxShadow';
import RelativeWrapper from './components/RelativeWrapper';
import BackgroundImage from './components/BackgroundImage';
import { overrideNative } from './override-native';
import { isValidPseudoClass } from './utils/valid-pseudo-class';

overrideNative(RN.View);
overrideNative(RN.Text);
overrideNative(RN.Image);
overrideNative(RN.ScrollView);
overrideNative(RN.FlatList);
overrideNative(RN.SectionList);
overrideNative(RN.TextInput);

export type NativeComponents = RN.View &
  RN.Text &
  RN.Image &
  RN.ScrollView &
  RN.FlatList &
  RN.SectionList &
  RN.TextInput &
  ComponentType<any>;

type FocusEvent = RN.NativeSyntheticEvent<RN.TextInputFocusEventData>;

type StateCallbackType = Readonly<{
  focused: boolean;
  hovered: boolean;
  pressed: boolean;
}>;

type PlatformViewProps = Omit<DOMAttributes<RN.View>, keyof AdjustedStyles> &
  RN.TextInputProps & {
    required?: boolean;
  };

export interface AnimatableComponentProps extends PlatformViewProps {
  forwardRef?: Function;
  style?: RN.StyleProp<NativeStyles>;
  as?: ComponentType<any>;
}

export function createComponent<T extends NativeComponents>(WrappedComponent: T) {
  return class AnimatableComponent extends Component<AnimatableComponentProps> {
    // @ts-expect-error "render" is private.
    static displayName = `Skyle(${WrappedComponent.displayName || WrappedComponent.render?.displayName})`;
    _ref!: NativeComponents;
    AnimatedComponent!: RN.Animated.AnimatedComponent<NativeComponents>;
    values: { [key: string]: RN.Animated.Value } = {};

    getAnimatedStyle(style: Styles) {
      const finish = flattenStyle(style) as Styles;
      const finishKeys = Object.keys(finish) as (keyof Styles)[];

      finishKeys.filter((key) => key.startsWith('&:')).forEach((key) => delete finish[key]);

      let transitionProperties = [finish?.transitionProperty || []]
        .flat()
        .map((x) => toCamelCase(x)) as (keyof Styles)[];

      transitionProperties = getTransitionProperties(transitionProperties);

      let styles: {
        [key: string]: RN.Animated.Value | RN.Animated.AnimatedInterpolation;
      } = {};
      [transitionProperties]
        .flat()
        ?.filter((t) => !!t)
        .map((_p, i) => {
          const tdr = [finish?.transitionDuration].flat();
          const ttf = [finish?.transitionTimingFunction].flat();
          const tdy = [finish?.transitionDelay].flat();

          const duration = (tdr?.[i] || tdr?.[0] || tdr) as TransitionDuration;
          const easing = (ttf?.[i] || ttf?.[0] || ttf) as TransitionTimingFunction;
          const delay = (tdy?.[i] || tdy?.[0] || tdy) as TransitionDuration;

          transitionProperties.map((property) => {
            const isColor = property.toLowerCase().indexOf('color') >= 0;
            const value = (finish[property] || 1) as string | number;
            this.values[property] =
              this.values[property] ||
              new RN.Animated.Value(+(isColor ? 0 : value || getDefaultStyleValue(property, finish)));
            styles[property] = this.values[property];

            if (isColor) {
              styles[property] = this.values[property].interpolate({
                inputRange: [0, 1],
                // @ts-expect-error
                outputRange: [this.values[property]?._children[0]?.__getValue() || value, value],
              });
              this.values[property].setValue(0);
            }

            const pDuration =
              typeof duration === 'string' || typeof duration === 'number'
                ? toDuration(duration)
                : toDuration(duration?.[property]);
            const pDelay =
              typeof delay === 'string' || typeof delay === 'number'
                ? toDuration(delay)
                : toDuration(delay?.[property]);
            const pEasing = typeof easing === 'string' ? toEasing(easing) : (easing as RN.EasingFunction);

            this.animate(this.values[property], isColor ? 1 : parseFloat(String(value)), pDuration, pEasing, pDelay);
          });
        });

      return wrapStyles(Object.assign({}, finish, styles));
    }

    getStyleProps(e: StateCallbackType, hasWrapper = false, hasBackgroundImage = false, animate = true) {
      const props = this.props;
      const propKeys = Object.keys(this.props) as (keyof typeof props)[];
      const stylePropKeys = propKeys.filter((key) => key.toLowerCase().startsWith('style'));

      let numberStyles: any[] = [];
      let styles = stylePropKeys.map((key) => {
        const styleArr = [props[key]].flat() as Styles[];
        const st = styleArr
          .map((c) => (Array.isArray(c) ? RN.StyleSheet.flatten(c) : c))
          .map((style: Styles) => {
            if (Number.isInteger(style)) {
              numberStyles.push(style);
              return;
            }

            // @ts-expect-error "_reactInternals" is a hack.
            const internal = this._reactInternals || this._reactInternalFiber;
            let pseudoStyles: Styles[] = [];
            const pseudoKeys = Object.keys(style || {}) as (keyof Styles)[];
            const pseudoClassKeys = pseudoKeys.filter((s) => s.startsWith('&:'));
            pseudoClassKeys.map((selector) => {
              const isValid = selector
                .split(':')
                .slice(1)
                ?.every((pseudo) => isValidPseudoClass(pseudo, this._ref, this.props, internal, e));

              if (isValid) {
                const pseudoStyle = style?.[selector];
                if (typeof pseudoStyle === 'object') {
                  pseudoStyles.push(pseudoStyle as Styles);
                }
              }
            });

            const currStyle = Object.assign({}, style, ...pseudoStyles);

            const animatedStyle = animate ? this.getAnimatedStyle(currStyle) : {};
            let combinedStyles: Styles = Object.assign({}, currStyle, animatedStyle);

            if (hasWrapper) {
              combinedStyles = removeInvalidStyles(combinedStyles);
              const {
                /* eslint-disable @typescript-eslint/no-unused-vars */
                margin,
                marginHorizontal,
                marginVertical,
                marginTop,
                marginRight,
                marginBottom,
                marginLeft,

                position,
                left,
                right,
                bottom,
                top,

                flex,
                alignSelf,
                flexBasis,
                flexGrow,
                flexShrink,

                zIndex,
                transform,

                backgroundImage,
                backgroundPosition,
                backgroundSize,
                backgroundRepeat,
                backgroundAttachment,
                backgroundClip,
                backgroundOrigin,
                /* eslint-enable */
                ...remainingStyle
              } = combinedStyles;

              if (hasBackgroundImage) {
                delete remainingStyle.backgroundColor;
              }
              combinedStyles = remainingStyle;
            }

            return combinedStyles;
          });

        const flattenedStyles = RN.StyleSheet.flatten([...numberStyles, ...st]);

        return {
          [key]: flattenedStyles,
        };
      });

      return Object.assign({}, ...styles);
    }

    getPseudoProps() {
      const { style: rawStyle = {} } = this.props;
      const style = StyleSheet.flatten(rawStyle) as StyleSheetStyles;

      const selectionStyle = style?.['&::selection'] || {};
      const selectionColor = selectionStyle.backgroundColor;

      const placeholderStyle = style?.['&::placeholder'] || {};
      const placeholderTextColor = placeholderStyle.color;
      const placeholder = placeholderStyle.content;

      return { selectionColor, placeholderTextColor, placeholder };
    }

    animate(value: RN.Animated.Value, toValue: number, duration = 1000, easing = Easing.ease, delay = 0) {
      if (!value) {
        return;
      }
      RN.Animated.timing(value, {
        toValue,
        duration,
        delay,
        easing,
        useNativeDriver: false,
      }).start();
    }

    render() {
      const { forwardRef, style: rawStyle, as, onFocus, onBlur, ...otherProps } = this.props;
      const style = StyleSheet.flatten(rawStyle);
      const styleKeys = Object.keys(style ?? {});

      const before = (style?.['&::before'] || {}) as RN.TextStyle;
      const after = (style?.['&::after'] || {}) as RN.TextStyle;

      const beforeContent = before?.content;
      const afterContent = after?.content;

      const BeforeComponent = typeof beforeContent !== 'undefined' ? Text : undefined;
      const AfterComponent = typeof afterContent !== 'undefined' ? Text : undefined;

      const AnimatedComponent = this.AnimatedComponent || RN.Animated.createAnimatedComponent(as || WrappedComponent);
      this.AnimatedComponent = AnimatedComponent;

      const needsPressable = styleKeys.some(
        (k) => k.includes(':hover') || k.includes(':active') || k.includes(':focus'),
      );

      const mockShadow = !BoxShadow.isNativelySupported() && (style.elevation || 0) <= 0 && !!style.shadowColor;

      const hasBackgroundImage = !!style.backgroundImage;

      const needsWrapper = mockShadow || hasBackgroundImage;

      const renderComponent = (e: StateCallbackType) => (
        <AnimatedComponent
          ref={(r: NativeComponents) => {
            typeof forwardRef === 'function' && forwardRef(r);
            this._ref = r;
          }}
          {...this.getPseudoProps()}
          {...this.getStyleProps(e, needsWrapper, hasBackgroundImage)}
          pointerEvents={style.pointerEvents}
          onFocus={(ev: FocusEvent) => {
            if (typeof this._ref?.isFocused === 'function') {
              this.forceUpdate();
            }
            onFocus?.(ev);
          }}
          onBlur={(ev: FocusEvent) => {
            if (typeof this._ref?.isFocused === 'function') {
              this.forceUpdate();
            }
            onBlur?.(ev);
          }}
          {...otherProps}
        />
      );

      const renderContent = (e: StateCallbackType) => {
        return (
          <>
            {!!BeforeComponent && <BeforeComponent style={before}>{beforeContent}</BeforeComponent>}

            {needsWrapper ? (
              <RelativeWrapper {...this.getStyleProps(e)}>
                {hasBackgroundImage && <BackgroundImage {...this.getStyleProps(e, false, false, false)} />}
                {mockShadow && <BoxShadow {...this.getStyleProps(e)} />}

                {renderComponent(e)}
              </RelativeWrapper>
            ) : (
              renderComponent(e)
            )}

            {!!AfterComponent && <AfterComponent style={after}>{afterContent}</AfterComponent>}
          </>
        );
      };

      return needsPressable ? (
        <RN.Pressable>{(e: StateCallbackType) => renderContent(e)}</RN.Pressable>
      ) : (
        renderContent({ hovered: false, pressed: false, focused: false })
      );
    }
  };
}

const getTransitionProperties = (transitionProperties: string[]) => {
  const blankTransitionStyles: any = { r: {} };
  transitionProperties.forEach((key) => (blankTransitionStyles.r[key] = '0'));

  let transitionStyles = preprocessStyles(blankTransitionStyles);
  transitionStyles = preprocessStyles(blankTransitionStyles);

  return Object.keys(flattenStyle(transitionStyles.r)) as (keyof Styles)[];
};

export const View = RN.View;
export const Text = RN.Text;
export const Image = RN.Image;
export const ScrollView = RN.ScrollView;
export const FlatList = RN.FlatList;
export const SectionList = RN.SectionList;
export const TextInput = RN.TextInput;
