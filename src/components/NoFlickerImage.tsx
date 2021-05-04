import React, { PureComponent } from 'react';
import { Image, StyleSheet, Platform, ImageProps } from 'react-native';

class NoFlickerImage extends PureComponent<ImageProps> {
  state = {
    source: this.props.source,
  };

  onSourceLoaded = () => {
    if (this.state.source !== this.props.source) {
      this.setState({ source: this.props.source });
    }
  };

  render() {
    if (Platform.OS !== 'android') {
      return <Image {...this.props} />;
    }

    return (
      <>
        <Image {...this.props} style={styles.hide} onLoad={this.onSourceLoaded} />
        <Image {...this.props} fadeDuration={0} source={this.state.source} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
});

export default NoFlickerImage;
