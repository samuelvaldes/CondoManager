import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SingInScreen from '../screens/SingInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen';
import PagosScreen from '../screens/PagosScreen';
import { AuthContext } from '../context/AuthContext';

export type RootStackParams= {
    HomeScreen: undefined;
    PagosScreen: undefined;
    SignInScreen: undefined;
    SignUpScreen: undefined;
    RecoverPasswordScreen:undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export default function Navigator() {
  const { authState } = useContext(AuthContext);
  const { isSignedIn } = authState;

  return (
    (!isSignedIn ?
    (
        <Stack.Navigator
            initialRouteName={!isSignedIn?'SignInScreen':'HomeScreen'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="SignInScreen" component={SingInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="RecoverPasswordScreen" component={RecoverPasswordScreen} />
        </Stack.Navigator>
    ) : (
        <Stack.Navigator
            initialRouteName={!isSignedIn?'SignInScreen':'HomeScreen'}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PagosScreen" component={PagosScreen}/>
        </Stack.Navigator>
    )
      )
  );
}
