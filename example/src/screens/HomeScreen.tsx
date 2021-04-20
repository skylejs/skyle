import React, { Component } from 'react';
import { List } from 'react-native-paper';
import { ScrollView } from 'skyle';
import { linking } from '../App';

interface HomeScreenProps {
  navigation: any;
}

class HomeScreen extends Component<HomeScreenProps> {
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
      </ScrollView>
    );
  }
}

export default HomeScreen;
