import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import Tabs from './navigation/Tabs'
import Toast from 'react-native-toast-message';
import { createStackNavigator } from '@react-navigation/stack';
import Profile2 from './Screens/Profile2';
import Product from './Screens/Product';
import ProductDetails from './Screens/ProductDetails';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Landing from './Screens/Landing';
import Forgot from './Screens/Forgot';
const Stack = createStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Tabs}/>
        <Stack.Screen name="Tabs" component={Tabs}/>
        <Stack.Screen name="Forgot" component={Forgot}/>
        <Stack.Screen name="Profile2" component={Profile2}/>
        <Stack.Screen name="Product" component={Product}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Sign" component={SignUp}/>
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})