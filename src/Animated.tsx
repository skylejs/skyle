import React, { Component, DOMAttributes, ComponentType } from 'react';

import * as RN from 'react-native';

import type {
  AdjustedStyles,
  NativeStyles,
  Styles,
  TransitionDuration,
  TransitionShorthand,
  TransitionTimingFunction,
} from './types';
import { Easing } from '.';
import { flattenStyle, getDefaultStyleValue, wrapStyles } from './utils/styles';
import { calc, toCamelCase, toDuration, toEasing } from './utils/values';
import StyleSheet from './StyleSheet';
import { removeInvalidStyles, validStyles } from './utils/valid-styles';
import { preprocessStyles } from './hooks/useStyles';
import BoxShadow, { NATIVELY_SUPPORTED_PLATFORMS } from './components/BoxShadow';
import RelativeWrapper from './components/RelativeWrapper';
import BackgroundImage from './components/BackgroundImage';

overrideNative(RN.View);
overrideNative(RN.Text);
overrideNative(RN.Image);
overrideNative(RN.ScrollView);
overrideNative(RN.FlatList);
overrideNative(RN.SectionList);
overrideNative(RN.TextInput);

function overrideNative(nativeComp: any) {
  const NativeComp = Object.assign({}, nativeComp);
  const AnimatedComp = createComponent(NativeComp);
  nativeComp.render = (props: any, ref: any) => {
    nativeComp.render.displayName = nativeComp.displayName;
    if (
      props?.suppressHydrationWarning ||
      Object.keys(StyleSheet.flatten(props.style) || {})?.every(
        (k) =>
          validStyles.includes(k) &&
          !k.includes('&:') &&
          !(k.includes('shadow') && !NATIVELY_SUPPORTED_PLATFORMS.includes(RN.Platform.OS)),
      )
    ) {
      return <NativeComp ref={ref} {...props} />;
    }
    return <AnimatedComp forwardRef={ref} {...props} />;
  };
}

type NativeComponents = RN.View &
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

interface AnimatableComponentProps extends PlatformViewProps {
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

    getAnimatedStyle(style: Styles, e: StateCallbackType) {
      // @ts-expect-error "_reactInternals" is a hack.
      const internal = this._reactInternals || this._reactInternalFiber;
      let pseudoStyles: Styles[] = [];
      const pseudoKeys = Object.keys(style || {}) as (keyof Styles)[];
      pseudoKeys
        .filter((s) => s.startsWith('&:'))
        .map((selector) => {
          const isValid = selector
            .split(':')
            .slice(1)
            ?.every((pseudo) => {
              const ownerChildCount = internal?._debugOwner?._debugOwner?.memoizedState?.last + 1;
              const index =
                internal._debugOwner?.type?.name === 'CellRenderer' ? internal._debugOwner?.index : internal.index;
              const pseudoName = pseudo.split('(')[0] || pseudo;
              const pseudoValue = pseudo.split('(').pop()?.split(')')[0] || '';
              switch (pseudoName) {
                case 'focus':
                case 'focus-visible':
                case 'focus-within':
                  return e.focused || this._ref?.isFocused?.();
                case 'hover':
                  return e.hovered;
                case 'active':
                  return e.pressed;
                case 'empty':
                  return !this.props.children && !this.props.value && !this.props.defaultValue;
                case 'optional':
                  return typeof this.props.required === undefined ? false : !this.props.required;
                case 'required':
                  return typeof this.props.required === undefined ? false : !this.props.required;
                case 'disabled':
                case 'read-only':
                  return typeof this.props.editable === undefined ? false : !this.props.editable;
                case 'enabled':
                case 'read-write':
                  return typeof this.props.editable === undefined ? true : this.props.editable;
                case 'placeholder-shown':
                  return (
                    !!this._ref?.props.placeholder &&
                    !this.props.children &&
                    !this.props.value &&
                    !this.props.defaultValue
                  );
                case 'first-child':
                  return index === 0;
                case 'last-child':
                  return index !== 0 && !internal.sibling;
                case 'nth-child':
                  if (pseudoValue === 'odd') {
                    return index !== 0 && index % 2 !== 0;
                  }
                  if (pseudoValue === 'even') {
                    return index % 2 === 0;
                  }
                  if (pseudoValue.includes('n')) {
                    const vals = pseudoValue.split('+');
                    const m = vals[0]
                      .replace(/ /g, '')
                      .replace(/-n/g, '-1')
                      .replace(/\+n/g, '+1')
                      .replace(/^n/g, '1')
                      .replace(/n/g, '*1');
                    const b = +(vals[1] || 0);
                    const num = (index + 1 - b) / calc(m);
                    return Number.isInteger(num) && num >= 0;
                  }
                  return index === +pseudoValue - 1;
                case 'nth-last-child':
                  const rIndex = ownerChildCount - index - 1;
                  if (pseudoValue === 'odd') {
                    return rIndex !== 0 && rIndex % 2 !== 0;
                  }
                  if (pseudoValue === 'even') {
                    return rIndex % 2 === 0;
                  }
                  if (pseudoValue.includes('n')) {
                    const vals = pseudoValue.split('+');
                    const m = vals[0]
                      .replace(/ /g, '')
                      .replace(/-n/g, '-1')
                      .replace(/\+n/g, '+1')
                      .replace(/^n/g, '1')
                      .replace(/n/g, '*1');
                    const b = +(vals[1] || 0);
                    const num = (rIndex + 1 - b) / calc(m);
                    return Number.isInteger(num) && num >= 0;
                  }
                  return rIndex === +pseudoValue - 1;
                case 'only-child':
                  return ownerChildCount === 1;
                default:
                  return false;
              }
            });

          if (isValid) {
            const pseudoStyle = style?.[selector];
            if (typeof pseudoStyle === 'object') {
              pseudoStyles.push(pseudoStyle as Styles);
            }
          }
        });

      const currStyle = Object.assign({}, style, ...pseudoStyles);
      const finish = flattenStyle(currStyle) as Styles;
      const finishKeys = Object.keys(finish) as (keyof Styles)[];

      finishKeys.filter((key) => key.startsWith('&:')).forEach((key) => delete finish[key]);

      const transitions = (typeof finish?.transition === 'string'
        ? [finish?.transition.split(',')?.map((t) => t.split(' ').filter((x) => !!x)) ?? finish?.transition].flat()
        : finish?.transition?.every((v) => Array.isArray(v))
        ? finish?.transition
        : [finish?.transition]) as TransitionShorthand[];

      let styles: {
        [key: string]: RN.Animated.Value | RN.Animated.AnimatedInterpolation;
      } = {};
      transitions
        .filter((t) => !!t)
        .map((trans) => {
          let transitionProperties = [trans?.[0] || finish?.transitionProperty || []]
            .flat()
            .map((x) => toCamelCase(x)) as (keyof Styles)[];

          transitionProperties = getTransitionProperties(transitionProperties);

          const duration = (trans?.[1] || finish?.transitionDuration) as TransitionDuration;
          const easing = (trans?.[2] || finish?.transitionTimingFunction) as TransitionTimingFunction;
          const delay = (trans?.[3] || finish?.transitionDelay) as TransitionDuration;

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

    getStyleProps(e: StateCallbackType, hasWrapper = false, hasBackgroundImage = false) {
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

            let combinedStyles: Styles = Object.assign({}, style, this.getAnimatedStyle(style, e));

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
      const { style } = this.props;

      // @ts-ignore
      const selectionStyle = style?.['&::selection'] || {};
      const selectionColor = selectionStyle.backgroundColor;

      // @ts-ignore
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

      const mockShadow =
        !NATIVELY_SUPPORTED_PLATFORMS.includes(RN.Platform.OS) && (style.elevation || 0) <= 0 && !!style.shadowColor;

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
                {hasBackgroundImage && <BackgroundImage {...this.getStyleProps(e)} />}
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
