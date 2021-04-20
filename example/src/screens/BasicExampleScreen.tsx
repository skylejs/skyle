import React, { PureComponent } from 'react';
import { StyleSheet, styled, View, Easing } from 'skyle';

@styled
export default class BasicExampleScreen extends PureComponent {
  styles = styles;

  state = {
    input: '',
    change: false,
  };

  render() {
    return <View style={this.styles.root} />;
  }
}

const styles = StyleSheet.create((o) => ({
  root: {
    flexDirection: 'column',
  },
  test1: {
    marginLeft: 200,
    width: 300,
    height: 300,
    transition: [
      ['scale', 800, Easing.bounce],
      [['opacity', 'backgroundColor'], 3000, Easing.elastic(0.7)],
    ],
    opacity: o.state.change ? 1 : 0.1,
    backgroundColor: 'purple',
    transform: [{ scale: o.state.change ? 0.4 : 1 }],
    cursor: 'pointer',

    '&:nth-child(2)': {
      backgroundColor: 'red',
    },
  },
  root2: {
    marginLeft: 50,
    height: 300,
    width: 300,
    transition: [
      [['scale', 'backgroundColor'], 1000, Easing.elastic(1.2)],
      ['borderRadius', 1200, 'ease-in'],
    ],
    transform: [{ scale: 1 }],
    backgroundColor: 'magenta',
    border: [10, 'dotted', 'red'],
    padding: '10% 5px',

    '&:hover': {
      transform: [{ scale: 1.5 }],
      backgroundColor: 'gray',
      borderRadius: 1000,
    },
    '&:active': {
      transform: [{ scale: 0.8 }],
      backgroundColor: 'blue',
    },
    '&:last-child': {
      backgroundColor: 'orange',
    },
  },
  input: {
    backgroundColor: '#aaa',
    color: '#000',
    fontSize: 16,
    padding: 5,
    transition: 'background-color 1000ms, borderWidth 2.5s ease-in-out',

    '&:first-child:focus': {
      color: 'red',
      backgroundColor: '#eee',
      borderWidth: 5,
      borderColor: 'blue',
    },

    '&::placeholder': {
      content: 'Wassup',
      color: 'magenta',
    },

    '&::selection': {
      backgroundColor: 'red',
    },
  },
  root3: {
    marginLeft: 100,
    height: 400,
    width: 400,
    padding: '10% 5px',
    transition: [['backgroundColor'], 600, Easing.linear],
    opacity: 1,
    backgroundColor: o.state.change ? o.theme.colors.primary : o.theme.colors.secondary,

    '@media web': {
      background: 'pink',
    },
  },
  text: {
    fontSize: 30,
    color: 'purple',
    padding: 20,
    transition: [['color', 'fontSize'], 400, Easing.linear],

    '&:hover': {
      fontSize: 60,
    },
    '&::before': {
      content: 'What da fooq',
      color: 'green',
    },
    '&::after': {
      content: '',
      width: 30,
      height: 30,
      backgroundColor: 'blue',
    },
  },
  button: {
    labelStyle: {
      color: 'red',
    },
  },
  list: {
    transition: ['width', 800, 'easeInOut'],
    backgroundColor: 'white',
    width: 200,
    overflow: 'visible',

    '&:hover': {
      width: 500,
    },
  },
  listItem: {
    transition: [['backgroundColor', 'scale'], 500, 'ease-in-out'],
    backgroundColor: 'red',
    fontSize: 16,

    // '&:first-child': {
    //   backgroundColor: 'green',
    // },
    // '&:last-child': {
    //   backgroundColor: 'pink',
    // },
    '&:nth-child(3)': {
      backgroundColor: 'green',
    },
    '&:hover': {
      transform: [{ scale: 1.5 }],
    },
    '&:active': {
      backgroundColor: 'red',
    },
  },
}));
