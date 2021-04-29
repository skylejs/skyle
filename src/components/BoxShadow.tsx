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
    width: 0,
    height: 0,
    radius: 0,
    offset: { top: 0, left: 0 },
    color: '',
    opacity: 1,
    borderRadius: 0,
    outerStyle: {} as ViewStyle,
    shadowStyle: {} as ViewStyle,
  };
  private _viewRef = createRef<ViewShot>();
  private _timeout?: NodeJS.Timeout;
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

      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,

      borderTopStartRadius,
      borderTopEndRadius,
      borderBottomStartRadius,
      borderBottomEndRadius,
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
    };

    const shadowStyle = {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,

      borderTopStartRadius,
      borderTopEndRadius,
      borderBottomStartRadius,
      borderBottomEndRadius,
    };

    const width = style.width || 0;
    const height = style.height || 0;

    const shadowRadius = style.shadowRadius as any;
    let radius = shadowRadius / 20;
    if (typeof shadowRadius._value !== 'undefined') {
      (shadowRadius as Animated.Value).addListener(({ value }) => this.setState({ radius: value / 20 }));
    } else {
      this.setState({ radius });
    }

    let color = style.shadowColor;
    const offset = {
      top: style.shadowOffset?.height || 0,
      left: style.shadowOffset?.width || 0,
    };
    const opacity = style.shadowOpacity || 1;
    const borderRadius = radius;

    this.setState(
      {
        outerStyle,
        shadowStyle,
        width,
        height,
        offset,
        color,
        opacity,
        borderRadius,
        zIndex: style.zIndex || 0,
      },
      () => {
        this._timeout && clearTimeout(this._timeout);
        this._timeout = setTimeout(this._capture, 0);
      },
    );
  }

  private _capture = async () => {
    try {
      this._isCapturing = true;
      const dataUri = await this._viewRef.current?.capture?.();
      this.setState({ bgUri: dataUri || '' }, () => {
        this._isCapturing = false;
      });
    } catch (err) {}
  };

  render() {
    const { bgUri, radius, color } = this.state;
    const { children } = this.props;

    return (
      <View style={this.styles.wrapper}>
        {!bgUri && (
          <ViewShot
            ref={this._viewRef}
            style={this.styles.shotView}
            options={{
              format: Platform.select({ android: 'webm', default: 'png' }),
              result: 'data-uri',
              width: 100,
              height: 100,
              quality: 0.01,
            }}>
            {<View style={this.styles.border} />}
          </ViewShot>
        )}
        {children}
        {!!bgUri && (
          <Image
            source={{ uri: bgUri }}
            blurRadius={radius}
            style={this.styles.shadow}
            fadeDuration={0}
            // @ts-ignore tintColor missing type?
            tintColor={color}
            resizeMode='stretch'
          />
        )}
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
    backgroundColor: '#fff',
    transform: [{ scale: 0.2 }],
    ...o.state.shadowStyle,
  },
  shadow: {
    position: 'absolute',
    width: o.state.width,
    height: o.state.height,
    opacity: o.state.opacity,
    marginTop: o.state.offset.top,
    marginLeft: o.state.offset.left,
    tintColor: o.state.color,
    zIndex: -1,
    transform: [{ scale: 5 }],
    pointerEvents: 'none',
  },
}));

export default styled(BoxShadow);
