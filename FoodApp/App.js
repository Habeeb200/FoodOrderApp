import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import Tabs from './navigation/Tabs'
import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <NavigationContainer>
      <Tabs/>
      <Toast />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})