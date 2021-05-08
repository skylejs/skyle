import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import { styled, StyleSheet } from 'skyle';
import { linking } from '../App';

interface HomeScreenProps {
  navigation: any;
}

@styled
class HomeScreen extends Component<HomeScreenProps> {
  styles = styles;

  render() {
    const { navigation } = this.props;

    const examples = Object.keys(linking.config.screens).filter((key) => key.endsWith('Example'));

    return (
      <ScrollView>
        <List.Section>
          <List.Subheader>Examples</List.Subheader>
          {examples.map((example) => (
            <List.Item
              key={example}
              title={example.split(/(?=[A-Z])/).join(' ')}
              onPress={() => navigation.navigate(example)}
            />
          ))}
        </List.Section>

        <View style={this.styles.test} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create(() => ({
  test: {
    width: '100%',
    height: 'env(safe-area-inset-bottom)',
    background: 'red',
  },
}));

export default HomeScreen;
