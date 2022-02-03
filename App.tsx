import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

import Navigator from './src/navigation/Navigator';
import { AuthProvider } from './src/context/AuthContext';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    announcement: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export default function App() {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <NavigationContainer>
      <AppState>
        <Navigator/> 
      </AppState>       
    </NavigationContainer>
  );
}

const AppState = ({children}:{children:any}) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}