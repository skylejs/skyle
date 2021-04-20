import React, { PureComponent } from 'react';
import { Switch } from 'react-native-paper';
import { setTheme, StyleSheet, styled, View, ScrollView } from 'skyle';

const themes = {
  light: {
    colors: {
      primary: 'red',
      background: '#eee',
    },
  },
  dark: {
    colors: {
      primary: 'blue',
      background: '#222',
    },
  },
};

@styled
export default class ThemeExampleScreen extends PureComponent {
  styles = styles;

  state = {
    theme: 'light',
  };

  render() {
    const { theme } = this.state;

    return (
      <ScrollView contentContainerStyle={this.styles.root}>
        <Switch
          value={theme === 'dark'}
          onValueChange={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            this.setState({ theme: newTheme });
            setTheme(themes[newTheme]);
          }}
        />

        <View style={this.styles.transitionView} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create((o) => ({
  root: {
    flex: 1,
    ...StyleSheet.flexCenter,
    padding: ['5%', 0],
    backgroundColor: o.theme.colors.background,
    transition: ['backgroundColor', 800],
  },
  transitionView: {
    width: 250,
    height: 250,
    backgroundColor: o.theme.colors.primary,
    margin: 20,
    border: [6, 'dotted', 'red'],
    transition: [['backgroundColor', 'scale', 'borderRadius'], 800],

    '&:hover': {
      backgroundColor: 'green',
    },

    '&:active': {
      transform: [{ scale: 0.7 }],
      borderRadius: 200,
    },
  },
}));
