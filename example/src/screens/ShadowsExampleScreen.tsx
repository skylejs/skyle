import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useStyles, StyleSheet, Easing } from 'skyle';

const ShadowsExampleScreen = () => {
  const s = useStyles(styles);

  return (
    <ScrollView contentContainerStyle={s.scrollView}>
      <Text style={s.text1}>The quick brown fox</Text>
      <Text style={s.text2}>The quick brown fox</Text>

      <View style={s.view1} />
      <View style={s.view2} />
      <View style={s.view3} />
    </ScrollView>
  );
};

const styles = StyleSheet.create(() => ({
  scrollView: {
    flexGrow: 1,
  },
  view1: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    border: [15, 'solid', 'green'],
    backgroundColor: '#ff0000',
    boxShadow: '10px 10px 5px blue',
    transition: [['boxShadow'], 800],

    '&:active': {
      boxShadow: '12px 12px 40px blue',
    },
  },
  view2: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 100,
    border: [15, 'solid', 'lime'],
    backgroundColor: 'yellow',
    boxShadow: '30px 30px 0px #00cc00',
    transition: [['boxShadow'], 800, Easing.elastic(2)],

    '&:active': {
      boxShadow: '20px 20px 0px yellow',
    },
  },
  view3: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    margin: [100, 0],
    backgroundColor: 'white',
    boxShadow: '1px 1px 15px gray',
    transition: [['width', 'boxShadow', 'borderRadius'], 500],

    '&:active': {
      width: 205,
      borderRadius: 100,
    },
  },
  text1: {
    margin: [50, 0, 5, 0],
    textAlign: 'center',
    width: '100%',
    height: 60,
    color: 'blue',
    fontSize: 25,
    transition: [['textShadow'], 1000],
    textShadow: '0px 2px 10px #ff0000',

    '&:active': {
      textShadow: '15px 15px 30px #0044ff',
    },
  },
  text2: {
    margin: [5, 0],
    textAlign: 'center',
    width: '100%',
    height: 100,
    color: 'blue',
    fontSize: 35,
    transition: [['textShadow'], 800, Easing.easeInOut],
    textShadow: '0px 0px 5px #8400ff',

    '&:active': {
      textShadow: '0px 0px 10px #00fff2',
    },
  },
}));

export default ShadowsExampleScreen;
