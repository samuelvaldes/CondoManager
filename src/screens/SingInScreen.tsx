import { PrivateValueStore, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { TouchableOpacity, View, ScrollView, Text, Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { RootStackParams } from '../navigation/Navigator';

type screenProp = StackNavigationProp<RootStackParams, 'SignInScreen'>;

export default function SignInScreen() {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation<screenProp>();

  const {form, error, onChange} = useForm({
    userName: '',
    passWord: ''
  });


  const getError = (campo:string) => {
    let message:string ='';
    const returnMessage = (msg:any) => {return (message=msg)}
    Object.entries(error).forEach(([key, value]) => {
      if (key === campo){
        returnMessage(value);
      }
    });
    return message;
  }


  return (
    
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={[
            styles.container,
            { flex:1,
              flexDirection:'column'
            }
          ]}
        >
          <View style={{backgroundColor:'white'}}>
            <Image 
              source={require('../assets/GAautomotriz.jpg')} 
              style={{
                margin:10,
                resizeMode: 'contain',
                height:70,
              }}
            />            
          </View>

          <View style={{
            flexDirection:'row',
            // backgroundColor:'red'
            }}
          >
            <View style={{flex:1}}></View>
            <View style={{flex:10}}>
            <Text style={{
              marginTop: 75,
              color: 'white',
              fontFamily:'verdana',
              fontSize:30,
              fontWeight:'bold',
            }}>
              Bienvenido
            </Text>
            </View>
            <View style={{flex:1}}></View>
          </View>

          <View style={{
            flex:2,
            // backgroundColor:'red'
            }}
          >
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:1}}></View>
              <View style={{flex:10}}>
                <Input
                  label='Usuario'
                  labelStyle={{fontSize:20, fontWeight:'bold', color:'white',marginTop:50}}
                  autoCompleteType={false}
                  autoCorrect={false}
                  placeholder="usuario"
                  containerStyle={styles.inputForm}
                  style = {{color:'white'}}
                  leftIcon = {
                      <Icon
                          name="person-outline"
                          color='white'
                          size={30}
                      />
                  }
                  errorStyle={{ fontSize:20, color: 'red' }}
                  errorMessage={getError('userName')}
                  onChangeText={(value) => 
                    onChange(
                       value, 
                      'userName',
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      'Debe ingresar una dirección de correo válida'
                    )
                  }
                />
              </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex:1,flexDirection:'row',}}>
              <View style={{flex:1}}></View>
              <View style={{flex:10}}>
                <Input
                    label='Contraseña'
                    labelStyle={{fontSize:20, fontWeight:'bold', color:'white'}}
                    autoCompleteType={false}
                    secureTextEntry={true}
                    placeholder="contraseña"
                    containerStyle={styles.inputForm}
                    style = {{color:'white'}}
                    leftIcon = {
                        <Icon
                            name="key-outline"
                            color='white'
                            size={30}
                        />
                    }
                    errorStyle={{ fontSize:20, color: 'red' }}
                    //errorMessage={error['passWord']}
                    errorMessage={getError('passWord')}
                    onChangeText={(value) => 
                      onChange(
                        value, 
                       'passWord',
                       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%#*?&])[A-Za-z\d$@$!%*?&]{8,15}/,
                       'La contraseña almenos es de 8 caracteres y debe tener un caracter especial'
                      )
                    }
                  />

              </View>
              <View style={{flex:1}}></View>
            </View>
          </View>

          <View
            style={{
              flex:1,
              marginTop:100,
              // backgroundColor:'yellow',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={ ()=>{
                // signIn
                 console.log(JSON.stringify(form,null,4)) 
                }
              }
              style={{
                height: 50,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius:10,
                backgroundColor: '#39B2E6'
              }}>
                <Text
                  style={{
                    fontSize:20,
                    color:'white',
                  }}
                >
                  Entrar
                </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#053b74',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#053b74",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  },
  inputForm:{
    width: "100%",
    marginTop: 20,
},
iconRight: {
  color: "#c1c1c1",
},
});