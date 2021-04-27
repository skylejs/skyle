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
      !JSON.stringify(props.style)?.includes('&:') &&
      Object.keys(Object.values(props.style || {}))?.every((k) => validStyles.includes(k))
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

          transitionProperties.map((key) => {
            const keyWords = key.split(/(?=[A-Z])/);
            const prefix = keyWords?.slice(0, -1).join('') || key;
            const suffix = keyWords.length > 1 ? keyWords?.slice(-1)[0] || '' : '';

            if (validStyles.includes(`${prefix}TopLeft${suffix}`)) {
              transitionProperties = transitionProperties.filter((v) => v !== key);
              transitionProperties.push(
                ...([
                  `${prefix}TopLeft${suffix}`,
                  `${prefix}TopRight${suffix}`,
                  `${prefix}BottomLeft${suffix}`,
                  `${prefix}BottomRight${suffix}`,
                ] as (keyof Styles)[]),
              );
            }
          });

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

    getStyleProps(e: StateCallbackType) {
      const props = this.props;
      const propKeys = Object.keys(this.props) as (keyof typeof props)[];
      const stylePropKeys = propKeys.filter((key) => key.toLowerCase().startsWith('style'));

      let numberStyles: any[] = [];
      let styles = stylePropKeys.map((key) => {
        const styleArr = [props[key]].flat() as Styles[];
        const st = styleArr
          .map((c) => (Array.isArray(c) ? RN.StyleSheet.flatten(c) : c))
          .map((style) => {
            if (Number.isInteger(style)) {
              numberStyles.push(style);
              return;
            }

            let combinedStyles: Styles = Object.assign({}, style, this.getAnimatedStyle(style, e));
            combinedStyles = removeInvalidStyles(combinedStyles);

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
      let { forwardRef, style, as, onFocus, onBlur, ...otherProps } = this.props;
      style = StyleSheet.flatten(style);
      const styleKeys = Object.keys(style ?? {});

      // @ts-ignore
      const before = (style?.['&::before'] || {}) as RN.TextStyle;
      // @ts-ignore
      const after = (style?.['&::after'] || {}) as RN.TextStyle;

      const beforeContent = before?.content;
      const afterContent = after?.content;

      const BeforeComponent = typeof beforeContent !== 'undefined' ? Text : undefined;
      const AfterComponent = typeof afterContent !== 'undefined' ? Text : undefined;

      const AnimatedComponent = this.AnimatedComponent || RN.Animated.createAnimatedComponent(as || WrappedComponent);
      this.AnimatedComponent = AnimatedComponent;

      const content = (e: StateCallbackType) => (
        <>
          {!!BeforeComponent && <BeforeComponent style={before}>{beforeContent}</BeforeComponent>}
          <AnimatedComponent
            ref={(r: NativeComponents) => {
              typeof forwardRef === 'function' && forwardRef(r);
              this._ref = r;
            }}
            {...this.getPseudoProps()}
            {...this.getStyleProps(e)}
            pointerEvents={StyleSheet.flatten(style)?.pointerEvents}
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
          {!!AfterComponent && <AfterComponent style={after}>{afterContent}</AfterComponent>}
        </>
      );

      const needsPressable = styleKeys.some(
        (k) => k.includes(':hover') || k.includes(':active') || k.includes(':focus'),
      );

      return needsPressable ? (
        <RN.Pressable>{(e: StateCallbackType) => content(e)}</RN.Pressable>
      ) : (
        content({ hovered: false, pressed: false, focused: false })
      );
    }
  };
}

export const View = RN.View;
export const Text = RN.Text;
export const Image = RN.Image;
export const ScrollView = RN.ScrollView;
export const FlatList = RN.FlatList;
export const SectionList = RN.SectionList;
export const TextInput = RN.TextInput;
