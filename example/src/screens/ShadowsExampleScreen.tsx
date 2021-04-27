import React from 'react';
import { Text, View } from 'react-native';
import { useStyles, StyleSheet } from 'skyle';

const ShadowsExampleScreen = () => {
  const s = useStyles(styles);

  return (
    <View>
      <View style={s.view} />

      <Text style={s.text}>The quick brown fox</Text>
    </View>
  );
};

const styles = StyleSheet.create(() => ({
  view: {
    width: 300,
    height: 300,
    marginTop: 100,
    alignSelf: 'center',
    backgroundColor: 'red',
    boxShadow: '5px 5px 5px orange',
    transition: [['boxShadow', 'backgroundColor'], 500],

    '&:active': {
      backgroundColor: 'blue',
      boxShadow: '10px 10px 10px yellow',
    },
  },
  text: {
    marginTop: 50,
    textAlign: 'center',
    width: '100%',
    height: 100,
    color: 'blue',
    fontSize: 25,
    transition: [['textShadowColor', 'textShadowRadius', 'textShadowOffsetWidth', 'textShadowOffsetHeight'], 1000],
    textShadow: '0px 2px 5px #ff0000',

    '&:active': {
      textShadow: '15px 15px 30px #0044ff',
    },
  },
}));

export default ShadowsExampleScreen;
