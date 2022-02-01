import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SingInScreen from '../screens/SingInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen';
import PagosScreen from '../screens/PagosScreen';

const Stack = createStackNavigator();
const isSigned = false;

export default function Navigator() {
  return (
    (!isSigned ?
    (
        <Stack.Navigator
            initialRouteName={!isSigned?'SignInScreen':'HomeScreen'}
        >
            <Stack.Screen name="SignInScreen" component={SingInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="RecoverPasswordScreen" component={RecoverPasswordScreen} />
        </Stack.Navigator>
    ) : (
        <Stack.Navigator
            initialRouteName={!isSigned?'SignInScreen':'HomeScreen'}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PagosScreen" component={PagosScreen}/>
        </Stack.Navigator>
    )
      )
  );
}
