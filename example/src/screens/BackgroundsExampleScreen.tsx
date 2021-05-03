import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useStyles, StyleSheet, Easing } from 'skyle';

const BackgroundsExampleScreen = () => {
  const s = useStyles(styles);

  return (
    <ScrollView {...s.scrollView}>
      <View style={s.view1}>
        <Text style={s.text1}>React!</Text>
      </View>
      <View style={s.view2} />
      <View style={s.view3} />
    </ScrollView>
  );
};

const styles = StyleSheet.create(() => ({
  scrollView: {
    contentContainerStyle: {
      ...StyleSheet.flexCenter,
      paddingY: 80,
    },
  },
  view1: {
    ...StyleSheet.flexCenter,
    width: 300,
    height: 300,
    background: `url(https://facebook.github.io/react/logo-og.png) stretch rgba(255, 0, 0, 0.1)`,
    overflow: 'hidden',
    transition: [['width', 'height', 'borderRadius'], 800, 'ease-in'],

    '&:active': {
      width: 220,
      height: 350,
      borderRadius: 100,
    },
  },
  text1: {
    fontSize: 30,
    color: '#fff',
    textShadow: '0px 0px 40px #000',
  },
  view2: {
    marginTop: 50,
    width: 250,
    height: 250,
    overflow: 'hidden',
    background: 'radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)',
    transition: [['borderRadius', 'scale'], 800, Easing.elastic(1.5)],

    '&:active': {
      borderRadius: 100,
      transform: [{ scale: 0.9 }],
    },
  },
  view3: {
    marginTop: 50,
    width: 350,
    height: 250,
    background:
      'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),' +
      'linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),' +
      'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
    transition: [['borderRadius', 'scale'], 800, Easing.elastic(1.5)],

    '&:active': {
      borderRadius: 100,
      transform: [{ scale: 0.7 }],
    },
  },
}));

export default BackgroundsExampleScreen;
