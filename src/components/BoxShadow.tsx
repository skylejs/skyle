import React, { createRef, Component } from 'react';
import { Animated, Image, Platform, View, ViewProps, ViewStyle } from 'react-native';
import ViewShot from 'react-native-view-shot';
import StyleSheet from '../StyleSheet';
import { styled } from '../styled-decorator';
import { deepEquals } from '../utils/values';

export const NATIVELY_SUPPORTED_PLATFORMS = ['ios', 'web'];

interface BoxShadowProps extends ViewProps {
  children?: React.ReactNode;
}

class BoxShadow extends Component<BoxShadowProps> {
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
    outerStyle: {} as ViewStyle,
  };
  private _viewRef = createRef<ViewShot>();
  private _timeout?: number;
  private _isCapturing = false;

  componentDidMount() {
    this._recalculate();
  }

  componentDidUpdate(prevProps: BoxShadowProps) {
    if (!deepEquals(prevProps.style || {}, this.props.style || {}) && !this._isCapturing) {
      this._recalculate();
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  private _recalculate() {
    const { style: rawStyle = {} } = this.props;
    const style = StyleSheet.flatten(rawStyle);

    const {
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

      borderWidth,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    } = style;

    const outerStyle = {
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

      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    };

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
      (shadowRadius as Animated.Value).addListener(({ value }) => this.setState({ radius: Math.max(value / 6, 1) }));
    } else {
      this.setState({ radius });
    }

    let color = style.shadowColor as any;
    if (typeof color?._value !== 'undefined') {
      (color as Animated.Value).addListener(({ value }) => this.setState({ color: value }));
    } else {
      this.setState({ color });
    }

    const offset = {
      top: style.shadowOffset?.height || 0,
      left: style.shadowOffset?.width || 0,
    };
    const opacity = style.shadowOpacity || 1;

    this.setState(
      {
        outerStyle,
        shadowStyle,
        width,
        height,
        offset,
        opacity,
        borderWidth: borderWidth || this.state.borderWidth,
      },
      () => {
        setImmediate(this._capture);
      },
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
    const { bgUri, radius, color } = this.state;
    const { children } = this.props;

    return (
      <View style={this.styles.wrapper}>
        <ViewShot
          ref={this._viewRef}
          style={this.styles.shotView}
          options={{
            format: Platform.select({ android: 'webm', default: 'png' }),
            result: 'data-uri',
            width: 100,
            height: 100,
          }}>
          {<View style={this.styles.border} />}
        </ViewShot>

        {!!bgUri && (
          <Image
            source={{ uri: bgUri }}
            blurRadius={radius}
            style={this.styles.shadow}
            onLayout={this._capture}
            fadeDuration={0}
            // @ts-ignore tintColor missing type?
            tintColor={color}
            resizeMode='stretch'
            renderToHardwareTextureAndroid
          />
        )}

        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create((o) => ({
  wrapper: {
    position: 'relative',
    overflow: 'visible',
    pointerEvents: 'box-none',
    ...o.state.outerStyle,
  },
  shotView: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
  },
  border: {
    width: o.state.width,
    height: o.state.height,
    transform: [{ scale: 0.7 }],
    border: [o.state.borderWidth, 'solid', '#fff'],
    backgroundColor:
      (o.state.offset.top._value || o.state.offset.top) >= o.state.borderWidth ||
      (o.state.offset.left._value || o.state.offset.left) >= o.state.borderWidth
        ? '#fff'
        : 'transparent',
    ...o.state.shadowStyle,
  },
  shadow: {
    position: 'absolute',
    width: o.state.width,
    height: o.state.height,
    opacity: o.state.opacity,
    top: o.state.offset.top,
    left: o.state.offset.left,
    tintColor: o.state.color,
    transform: [{ scale: 1 / 0.7 }],
    overflow: 'visible',
    pointerEvents: 'none',
  },
}));

export default styled(BoxShadow);
