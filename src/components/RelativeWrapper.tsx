import React, { Component } from 'react';
import { View, ViewProps } from 'react-native';
import { styled } from '../styled-decorator';
import StyleSheet from '../StyleSheet';

interface RelativeWrapperProps extends ViewProps {
  children?: React.ReactNode;
}

class RelativeWrapper extends Component<RelativeWrapperProps> {
  styles = styles;

  render() {
    const { style: rawStyle = {}, children } = this.props;
    const style = StyleSheet.flatten(rawStyle);

    const {
      width,
      height,

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

      zIndex,
      transform,
      overflow,
    } = style;

    const outerStyle = {
      width,
      height,

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

      zIndex,
      transform,
      overflow,
    };

    return <View style={[this.styles.wrapper, outerStyle]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'visible',
    pointerEvents: 'box-none',
  },
});

export default styled(RelativeWrapper);
