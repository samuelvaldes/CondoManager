import { PrivateValueStore, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, View, ScrollView, Text, Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { RootStackParams } from '../navigation/Navigator';
import { useState } from 'react';

type screenProp = StackNavigationProp<RootStackParams, 'SignInScreen'>;

export default function SignInScreen() {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation<screenProp>();

  const {form, error, isError, onChange} = useForm({
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
  const getFieldValue = (campo:string) => {
    let message:string ='';
    const returnMessage = (msg:any) => {return (message=msg)}
    Object.entries(form).forEach(([key, value]) => {
      if (key === campo){
        returnMessage(value);
      }
    });    
    return message;
  }

  const logIn = async(form:any)=> {
    
    const {userName, passWord} = form;

    //console.log('-------->>> user: ' + userName + ' Pass: ' + passWord);

    const userCredential = await auth().signInWithEmailAndPassword(userName,passWord)
      .then(()=> {
          console.log('usuario firmado');
          signIn();          
      })
      .catch((err)=>{
        console.error('Error: ' + err);
      })

      console.log(userCredential + '<<<-----------');
      
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
                  rightIcon= {
                    <Icon
                      name="information-circle-outline"
                      color='white'
                      size={30}
                      onPress={ ()=>
                        Alert.alert("Información", "Debe ingresar su correo electrónico corporativo, \n"
                         + "Si no tiene usuario, debe solicitarlo a la mesa de ayuda con un ticket")
                      }
                    />
                  }                  
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
                    rightIcon= {
                      <Icon
                        name="information-circle-outline"
                        color='white'
                        size={30}
                        onPress={ ()=>
                          Alert.alert("Información","La contraseña debe estar compuesta por: \n" +
                          "* Entre 8 y 15 caracteres \n" +
                          "* Una mayúscula, \n" +
                          "* Una minúscula, \n" +
                          "* Un número y \n" +
                          "* Un caracter de los siguientes $@$!%#*?&",
                          [
                            { text: "OK"}
                          ]
                          )
                        }
                      />
                    }
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
                       'Ingrese una contraseña válida'
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
              onPress={ 
                ()=>logIn(form)
              }
              style={{
                height: 50,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius:10,
                backgroundColor: isError ? '#abc9d6' : getFieldValue('passWord') === '' ? '#abc9d6' : '#39B2E6',
              }}
              disabled={isError ? true : getFieldValue('passWord') === '' ? true : false }
              activeOpacity={isError ? 0.2 : 1}
              >
                <Text
                  style={{
                    fontSize:20,
                    color:'white',
                    opacity: isError ? 0.3 : 1
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