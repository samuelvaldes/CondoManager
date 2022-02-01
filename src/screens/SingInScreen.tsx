import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { RootStackParams } from '../navigation/Navigator';

type screenProp = StackNavigationProp<RootStackParams, 'SignInScreen'>;

export default function SignInScreen() {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation<screenProp>();

  return (
    <View style={{flex:1, flexDirection:'column'}}>
      <Button
        title='SignIn'
        onPress={signIn}
      />      
      <Button
        title='SignUp'
        onPress={()=>navigation.navigate('SignUpScreen')}
      />
      <Button
        title='RestorePassword'
        onPress={()=>navigation.navigate('RecoverPasswordScreen')}
      />
    </View>
  );
}
