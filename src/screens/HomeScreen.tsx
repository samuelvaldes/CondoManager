import { View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/core';
import { RootStackParams } from '../navigation/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';

type homeScreenProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

export default function HomeScreen() {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation<homeScreenProp>();

  return (
    <View style={{flex:1, flexDirection:'column'}}>
      <Button
        title='SignOut'
        onPress={signOut}
      />
      <Button
        title='Pagos'
        onPress={ () => navigation.navigate('PagosScreen') }
      />             
    </View>
  );
}
