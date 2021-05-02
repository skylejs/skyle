import React from 'react';
import { Provider as StyleProvider } from 'skyle';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';

import BasicExampleScreen from './screens/BasicExampleScreen';
import TransitionsExampleScreen from './screens/TransitionsExampleScreen';
import FormExampleScreen from './screens/FormExampleScreen';
import TouchableExampleScreen from './screens/TouchableExampleScreen';
import ThemeExampleScreen from './screens/ThemeExampleScreen';
import ShadowsExampleScreen from './screens/ShadowsExampleScreen';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export const linking = {
  prefixes: [],
  config: {
    screens: {
      Home: '',
      BasicExample: 'example/basic',
      TouchableExample: 'example/touchable',
      TransitionsExample: 'example/transitions',
      ThemeExample: 'example/theme',
      ShadowsExample: 'example/shadows',
      FormExample: 'example/form',
    },
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <StyleProvider>
      <StatusBar backgroundColor='#fff' style='dark' />
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{ animationEnabled: true, gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }}>
          <Stack.Screen name='Home' component={HomeScreen} />

          <Stack.Screen name='BasicExample' component={BasicExampleScreen} />
          <Stack.Screen name='TouchableExample' component={TouchableExampleScreen} />
          <Stack.Screen name='TransitionsExample' component={TransitionsExampleScreen} />
          <Stack.Screen name='ThemeExample' component={ThemeExampleScreen} />
          <Stack.Screen name='ShadowsExample' component={ShadowsExampleScreen} />
          <Stack.Screen name='FormExample' component={FormExampleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StyleProvider>
  );
}
