import React, { createRef, Component } from 'react';
import { ImageBackground, Platform, View, ViewProps, ViewStyle } from 'react-native';
import ViewShot from 'react-native-view-shot';
import StyleSheet from '../StyleSheet';
import { styled } from '../styled-decorator';

export const NATIVELY_SUPPORTED_PLATFORMS = ['ios', 'web'];

interface BoxShadowProps extends ViewProps {
  children?: React.ReactNode;
}

@styled
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

  componentDidMount() {
    this._recalculate();
  }

  componentDidUpdate(prevProps: BoxShadowProps) {
    if (prevProps !== this.props) {
      this._recalculate();
    }
  }

  private _recalculate() {
    this.setState({ bgUri: '' });

    let { style = {} } = this.props;
    style = StyleSheet.flatten(style);

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

    const width = +(style.width || 0);
    const height = +(style.height || 0);
    const radius = +(style.shadowRadius || 0) * 8;
    const offset = {
      top: style.shadowOffset?.height || 0,
      left: style.shadowOffset?.width || 0,
    };
    const color = style.shadowColor;
    const opacity = style.shadowOpacity || 1;
    const borderRadius = (radius || 1) / 30;

    this.setState(
      {
        outerStyle,
        shadowStyle,
        width,
        height,
        radius,
        offset,
        color,
        opacity,
        borderRadius,
        zIndex: style.zIndex || 0,
      },
      () => setTimeout(this._capture, 1),
    );
  }

  private _capture = async () => {
    const dataUri = await this._viewRef.current?.capture?.();
    this.setState({ bgUri: dataUri || '' });
  };

  render() {
    const { bgUri, color } = this.state;
    const { children } = this.props;

    return (
      <View style={this.styles.wrapper}>
        <ViewShot
          ref={this._viewRef}
          style={this.styles.shotView}
          options={{
            format: Platform.select({ android: 'webm', default: 'png' }),
            result: 'data-uri',
            width: 50,
            height: 50,
            quality: 0.01,
          }}>
          <View style={this.styles.border} />
        </ViewShot>
        {children}
        {!!bgUri && (
          <ImageBackground
            source={{ uri: bgUri }}
            blurRadius={1}
            style={this.styles.shadow}
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
    margin: o.state.radius,
    ...o.state.shadowStyle,
  },
  shadow: {
    position: 'absolute',
    top: -o.state.radius,
    left: -o.state.radius,
    width: o.state.width + o.state.radius * 2,
    height: o.state.height + o.state.radius * 2,
    opacity: o.state.opacity,
    margin: [o.state.offset.top, o.state.offset.left],
    zIndex: o.state.zIndex - 1,
    pointerEvents: 'none',
  },
}));

export default BoxShadow;
