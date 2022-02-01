import 'react-native-gesture-handler';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigator from './src/navigation/Navigator';

export default function App() {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);

  return (
    <NavigationContainer>
      <Navigator/>        
    </NavigationContainer>
  );
}

const AppState = ({children}:{children:any}) => {

  return { children }

}
