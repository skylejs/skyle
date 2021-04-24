import React from 'react';
import { useStyles, StyleSheet, View } from 'skyle';

const App = () => {
  const s = useStyles(styles);

  return <View style={s.view} />;
};

const styles = StyleSheet.create((o) => ({
  view: {
    width: 100,
    height: 100,
    backgroundColor: o.theme.colors.primary,
    transition: ['backgroundColor', 500],

    '&:active': {
      backgroundColor: 'red',
    },
  },
}));

export default App;
