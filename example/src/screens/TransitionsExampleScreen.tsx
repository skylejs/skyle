import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, styled, Easing } from 'skyle';

@styled
class TransitionsExampleScreen extends PureComponent {
  styles = styles;
  state = {
    color: '#FF0000',
    backgroundColor: '#00FF00',
    size: 200,
    duration: 1000,
  };
  private _randomInterval?: NodeJS.Timeout;

  componentDidMount() {
    this._randomInterval = setInterval(() => {
      this.setRandomColor();
      this.setRandomBackgroundColor();
      this.setRandomSize();
    }, 2000);
  }

  componentWillUnmount() {
    if (this._randomInterval) clearInterval(this._randomInterval);
  }

  setRandomColor = () => {
    this.setState({ color: randomColor() });
  };

  setRandomBackgroundColor = () => {
    this.setState({ backgroundColor: randomColor() });
  };

  setRandomSize = () => {
    this.setState({ size: Math.floor(Math.random() * 300) + 100 });
  };

  render() {
    const { color, backgroundColor, size, duration } = this.state;

    return (
      <ScrollView contentContainerStyle={this.styles.root}>
        <View style={this.styles.transitionWrapper}>
          <Button mode='contained' {...this.styles.transitionBtn}>
            Text
          </Button>
        </View>
        <Text style={this.styles.text}>Text Color: {color}</Text>
        <Text style={this.styles.text}>Background Color: {backgroundColor}</Text>
        <Text style={this.styles.text}>Size: {size}</Text>

        <View style={this.styles.btns}>
          <Button mode='contained' onPress={this.setRandomColor} {...this.styles.btn}>
            Random Text Color
          </Button>
          <Button mode='contained' onPress={this.setRandomBackgroundColor} {...this.styles.btn}>
            Random Background Color
          </Button>
          <Button mode='contained' onPress={this.setRandomSize} {...this.styles.btn}>
            Random Size
          </Button>
        </View>
        <TextInput
          dense
          label='Duration'
          value={`${duration}`}
          style={this.styles.input}
          onChangeText={(val) => this.setState({ duration: +val })}
        />
      </ScrollView>
    );
  }
}

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const styles = StyleSheet.create((o) => ({
  root: {
    ...StyleSheet.flexCenter,
    flex: 1,
    padding: [20, 10],
  },
  transitionWrapper: {
    ...StyleSheet.flexCenter,
    width: '100%',
    height: 350,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  transitionBtn: {
    style: {
      ...StyleSheet.flexCenter,
      width: o.state.size,
      height: o.state.size,
      backgroundColor: o.state.backgroundColor,
      transition: [['backgroundColor', 'width', 'height'], o.state.duration, Easing.easeInOut],
    },
    labelStyle: {
      color: o.state.color,
      fontSize: 30,
      transition: ['color', 2000, 'linear'],
    },
  },
  text: {
    fontWeight: 'bold',
    margin: [5, 0],
  },
  btns: {
    padding: 10,
  },
  btn: {
    color: 'blue',
    style: {
      marginTop: 5,
    },
  },
  input: {
    width: 300,
  },
}));

export default TransitionsExampleScreen;
