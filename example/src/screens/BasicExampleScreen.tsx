import React from 'react';
import { View } from 'react-native';
import { useStyles, StyleSheet } from 'skyle';

const BasicExampleScreen = () => {
  const s = useStyles(styles);

  return <View style={s.view} />;
};

const styles = StyleSheet.create(() => ({
  view: {
    width: 300,
    height: 300,
    backgroundColor: 'red',
    transition: [['width', 'backgroundColor'], 500],

    '&:active': {
      backgroundColor: 'blue',
    },
  },
}));

export default BasicExampleScreen;
