import React, { createRef, PureComponent } from 'react';
import { Animated, Platform, View, ViewProps, ViewStyle } from 'react-native';
import StyleSheet from '../StyleSheet';
import { styled } from '../styled-decorator';
import { deepEquals } from '../utils/values';
import type ViewShotType from 'react-native-view-shot';
import NoFlickerImage from './NoFlickerImage';

const NATIVELY_SUPPORTED_PLATFORMS = ['ios', 'web'] as typeof Platform.OS[];
const IS_NATIVELY_SUPPORTED = NATIVELY_SUPPORTED_PLATFORMS.includes(Platform.OS);

let ViewShot: typeof ViewShotType;
try {
  if (IS_NATIVELY_SUPPORTED) {
    throw Error();
  }
  ViewShot = require('react-native-view-shot').default;
} catch (err) {}

interface BoxShadowProps extends ViewProps {
  children?: React.ReactNode;
}

class BoxShadow extends PureComponent<BoxShadowProps> {
  static isNativelySupported() {
    return IS_NATIVELY_SUPPORTED;
  }

  styles = styles;
  state = {
    bgUri: '',
    prevUri: '',
    width: 0,
    height: 0,
    radius: 0,
    offset: { top: 0, left: 0 },
    color: '',
    opacity: 1,
    borderWidth: 3,
    shadowStyle: {} as ViewStyle,
  };
  private _viewRef = createRef<ViewShotType>();
  private _isCapturing = false;

  componentDidMount() {
    this._recalculate();
  }

  componentDidUpdate(prevProps: BoxShadowProps) {
    if (!deepEquals(prevProps.style || {}, this.props.style || {}) && !this._isCapturing) {
      this._recalculate();
    }
  }

  private _recalculate() {
    const { style: rawStyle = {} } = this.props;
    const style = StyleSheet.flatten(rawStyle);

    const {
      borderWidth,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    } = style;

    const shadowStyle = {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    };

    const width = style.width || 0;
    const height = style.height || 0;

    const shadowRadius = style.shadowRadius as any;
    let radius = Math.max(shadowRadius / 6, 1);
    if (typeof shadowRadius?._value !== 'undefined') {
      (shadowRadius as Animated.Value).addListener(({ value }) => {
        this.setState({ radius: Math.max(value / 6, 1) });
      });
    } else {
      this.setState({ radius });
    }

    const color = style.shadowColor;
    const offset = {
      top: style.shadowOffset?.height || 0,
      left: style.shadowOffset?.width || 0,
    };
    const opacity = style.shadowOpacity || 1;

    this.setState(
      {
        shadowStyle,
        width,
        height,
        color,
        offset,
        opacity,
        borderWidth: borderWidth || this.state.borderWidth,
      },
      () => setImmediate(this._capture),
    );
  }

  private _capture = async () => {
    try {
      if (this._isCapturing) {
        return;
      }
      this._isCapturing = true;
      const dataUri = await this._viewRef.current?.capture?.();

      this.setState({ bgUri: dataUri }, () => (this._isCapturing = false));
    } catch (err) {}
  };

  render() {
    const { bgUri, radius } = this.state;
    const { children } = this.props;

    return (
      <>
        <ViewShot
          ref={this._viewRef}
          style={this.styles.shotView}
          options={{
            format: Platform.select({ android: 'webm', default: 'png' }),
            result: 'data-uri',
            width: 100,
            height: 100,
          }}>
          <View style={this.styles.border} />
        </ViewShot>

        {!!bgUri && (
          <NoFlickerImage
            source={{ uri: bgUri }}
            blurRadius={radius}
            style={this.styles.shadow}
            onLayout={this._capture}
            fadeDuration={0}
          />
        )}

        {children}
      </>
    );
  }
}

const styles = StyleSheet.create((o) => ({
  shotView: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
  },
  border: {
    animate: true,
    width: o.state.width,
    height: o.state.height,
    transform: [{ scale: 0.7 }],
    borderColor: o.state.color,
    borderWidth:
      (o.state.offset.top._value || o.state.offset.top) >= o.state.borderWidth ||
      (o.state.offset.left._value || o.state.offset.left) >= o.state.borderWidth
        ? o.state.width
        : o.state.borderWidth,
    ...o.state.shadowStyle,
  },
  shadow: {
    position: 'absolute',
    width: o.state.width,
    height: o.state.height,
    opacity: o.state.opacity,
    top: o.state.offset.top,
    left: o.state.offset.left,
    transform: [{ scale: 1 / 0.7 }],
    overflow: 'visible',
    pointerEvents: 'none',
  },
}));

export default styled(BoxShadow);
