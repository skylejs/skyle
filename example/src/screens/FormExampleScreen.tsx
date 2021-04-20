import React, { PureComponent } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, styled, View, TextInput } from 'skyle';

@styled
export default class FormExampleScreen extends PureComponent {
  styles = styles;

  render() {
    return (
      <View style={this.styles.root}>
        <TextInput style={this.styles.input} placeholder='Test' />
        <TextInput style={this.styles.input} placeholder='Test' />
        <TextInput style={this.styles.input} placeholder='Test' />
        <TextInput style={this.styles.input} placeholder='Test' />

        <Button mode='contained'>Submit</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create(() => ({
  root: {
    ...StyleSheet.flexCenter,
    padding: '10%',
  },
  input: {
    backgroundColor: '#ddd',
    margin: [5, 0],
    width: 300,
    color: 'blue',
    fontSize: 16,
    padding: [10, 20],
    transition: 'backgroundColor 300ms linear',

    '&:focus': {
      color: 'orange',
      backgroundColor: '#bbb',
    },

    '&::placeholder': {
      color: 'green',
    },

    '&::selection': {
      backgroundColor: 'red',
    },
  },
}));
