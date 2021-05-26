import React from 'react';
import { LogBox } from 'react-native';
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
import BackgroundsExampleScreen from './screens/BackgroundsExampleScreen';

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
      BackgroundsExample: 'example/backgrounds',
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

          <Stack.Screen name='BasicExample' component={BasicExampleScreen} options={{ title: 'Basic Example' }} />
          <Stack.Screen
            name='TouchableExample'
            component={TouchableExampleScreen}
            options={{ title: 'Touchable Example' }}
          />
          <Stack.Screen
            name='TransitionsExample'
            component={TransitionsExampleScreen}
            options={{ title: 'Transitions Example' }}
          />
          <Stack.Screen name='ThemeExample' component={ThemeExampleScreen} options={{ title: 'Theme Example' }} />
          <Stack.Screen name='ShadowsExample' component={ShadowsExampleScreen} options={{ title: 'Shadows Example' }} />
          <Stack.Screen
            name='BackgroundsExample'
            component={BackgroundsExampleScreen}
            options={{ title: 'Backgrounds Example' }}
          />
          <Stack.Screen name='FormExample' component={FormExampleScreen} options={{ title: 'Form Example' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </StyleProvider>
  );
}
