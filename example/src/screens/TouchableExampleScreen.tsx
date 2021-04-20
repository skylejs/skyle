import React, { PureComponent } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { StyleSheet, styled, Easing } from 'skyle';

@styled
export default class TouchableExampleScreen extends PureComponent {
  styles = styles;

  render() {
    return (
      <ScrollView contentContainerStyle={this.styles.root}>
        <Image source={{ uri: 'https://picsum.photos/id/237/200/300' }} style={this.styles.transitionView} />
        <View style={this.styles.transitionView} />
        <View style={this.styles.transitionView} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create(() => ({
  root: {
    ...StyleSheet.flexCenter,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: ['5%', 0],
  },
  transitionView: {
    width: 'max(calc(50vw - 250), 250)',
    height: 'clamp(300, 10vw, calc(500-100))',
    backgroundColor: 'purple',
    margin: 20,
    border: [6, 'solid', 'green'],
    borderRadius: [20, '5vw'],
    transition: [['backgroundColor', 'scale', 'borderRadius'], 800, Easing.elastic(1.2)],

    '&:hover': {
      backgroundColor: 'green',
    },

    '&:active': {
      transform: [{ scale: 0.7 }],
      borderRadius: 200,
    },
  },
}));
