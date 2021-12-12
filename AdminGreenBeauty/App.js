 import React, { useEffect } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { ActivityIndicator } from 'react-native-paper';
 import { AuthContext } from './Components/context';
 import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import MainBoard from './Pages/mainboard';
import LoginScreen from './Pages/login';
const Stack = createNativeStackNavigator();
const App = () =>{
  initialLoginSate = {
    isLoading:true,
    email: null,
    userToken: null,
  };

  const loginReducer = (prevState, action)=>{
    switch(action.type){
      case "RETRIVE_TOKEN":
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
        case "LOGIN":
          return{
            ...prevState,
            email: action.id,
            userToken:action.token,
            isLoading: false,
          }
        case "LOGOUT":
        return{
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false
        };
        case "REGISTER":
        return{
          ...prevState,
          email: action.id,
          isLoading: false,
        };
    }
  }
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginSate)

  const authContext = React.useMemo(()=>({
    signIn: async (email, password) => {
        try{
          await AsyncStorage.setItem('userToken', password)
          await AsyncStorage.setItem('id',email)
        }
        catch(e){
          console.log(e);
        }
      dispatch({type:"LOGIN", id: email, token: password})
    },
    signOut:async() =>{
      try{
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('id')
      }
      catch(e){
        console.log(e);
      }
      dispatch({type:"LOGOUT"})
    },
    signUp:() =>{

    }
  }),[]);

  useEffect(()=>{
    setTimeout(async()=>{
      //setisLoading(false);
      let userToken;
      userToken=null
      try{
        userToken = await AsyncStorage.getItem('userToken')
      }
      catch(e){
        console.log(e);
      }
      dispatch({type:"REGISTER",  token: userToken})
    },1000)
  },[]);

  if(loginState.isLoading)
  {
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken==null ? (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
          )
        :
        (
      <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Main" component={MainBoard}/>
      </Stack.Navigator>)
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;
