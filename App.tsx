import 'react-native-gesture-handler';
import { Alert, AppRegistry, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

import Navigator from './src/navigation/Navigator';
import { AuthProvider } from './src/context/AuthContext';

function requestUserPermission() {
  const enabled=null;
  const authStatus =  messaging().requestPermission({
    announcement: true,
  }).then((status)=>{
    if (status === messaging.AuthorizationStatus.AUTHORIZED ||
    status === messaging.AuthorizationStatus.PROVISIONAL){
        console.log('Authorization status:', status);
    }
  });
}
// Register background handler
const backgroundMessage = messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent('app', () => App);

export default function App() {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);

  useEffect(() => {

    requestUserPermission();
    const foregroundMessage = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return ()=>{
       foregroundMessage();
       backgroundMessage;

    }
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