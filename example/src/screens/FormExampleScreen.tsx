import React, { PureComponent } from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { StyleSheet, styled, TextInput } from 'skyle';

@styled
class FormExampleScreen extends PureComponent {
  styles = styles;
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    submitting: false,
  };

  submit = () => {
    this.setState({ submitting: true });
    setTimeout(() => this.setState({ submitting: false }), 4000);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={this.styles.root}>
        <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={this.styles.image} />
        <TextInput
          style={this.styles.input}
          placeholder='First Name'
          value={this.state.firstName}
          onChangeText={(firstName) => this.setState({ firstName })}
        />
        <TextInput
          style={this.styles.input}
          placeholder='Last Name'
          value={this.state.lastName}
          onChangeText={(lastName) => this.setState({ lastName })}
        />
        <TextInput
          style={this.styles.input}
          placeholder='Email'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={this.styles.input}
          placeholder='Password'
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
        />

        <Button mode='contained' loading={this.state.submitting} {...this.styles.submitBtn} onPress={this.submit}>
          Submit
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create((o) => ({
  root: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    margin: [50, 0],
    width: 120,
    height: 120,
    borderRadius: 100,
    boxShadow: '0px 0px 20px #999',
  },
  input: {
    backgroundColor: '#e9e9e9',
    margin: [5, 0],
    width: 300,
    color: 'blue',
    fontSize: 16,
    padding: [10, 20],
    transition: 'backgroundColor 300ms linear',

    '&:focus': {
      color: '#03c987',
      backgroundColor: '#fff',
    },

    '&::placeholder': {
      color: 'green',
    },

    '&::selection': {
      backgroundColor: 'red',
    },
  },
  submitBtn: {
    color: o.state.submitting ? '#407bfa' : '#0051ff',
    style: {
      width: 150,
      marginTop: 20,
    },
  },
}));

export default FormExampleScreen;
