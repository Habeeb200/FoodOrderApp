import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Home from '../Screens/Home'
import Favorites from '../Screens/Favorites'
import Cart from '../Screens/Cart'
import Orders from '../Screens/Orders'
import Profile from '../Screens/Profile'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Icon, MD3Colors } from 'react-native-paper';
const Tab = createBottomTabNavigator()
const CustomTabBarButton = ({children,onPress})=>(
  <TouchableOpacity onPress={onPress} style={{top:-30,justifyContent:"center",alignItems:"center",...styles.shadow}}>
    <View style={{
      width:70,
      height:70,
      borderRadius:35,
      backgroundColor: "#e32f45"
    }}>
      {children}
    </View>
  </TouchableOpacity>
)
const Tabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        style:{
          position: "absolute",
          bottom:30,
          left: 20,
          right:20,
          elevation:0,
          backgroundColor: "#ffffff",
          borderRadius: 50,
          height: 140,
          ...styles.shadow
        }
      }}
    >
        <Tab.Screen name='Home' component={Home} options={{
          tabBarIcon: ({focused})=>(
            <View style={{alignItems:"center",justifyContent:"center",top:10}}>
             <Icon1 name="home" size={30} color={focused ? "#e32f45" : "#748c94"}/>
              <Text style={{color: focused ? "#e32f45" : "#748c94",fontSize:12,paddingBottom:17,fontFamily: "Quicksand-SemiBold"}}>HOME</Text>
            </View>
          ),
        }}/>
        <Tab.Screen name='Favorite' component={Favorites} options={{
          tabBarIcon: ({focused})=>(
            <View style={{alignItems:"center",justifyContent:"center",top:10}}>
             <Icon1 name="heart" size={30} color={focused ? "#e32f45" : "#748c94"}/>
              <Text style={{color: focused ? "#e32f45" : "#748c94",fontSize:12,paddingBottom:17,fontFamily: "Quicksand-SemiBold"}}>FAVORITES</Text>
            </View>
          ),
        }}/>
        <Tab.Screen name='Cart' component={Cart} options={{
          tabBarIcon:({focused})=>(
            <Icon1 name="shopping-cart" size={40} color="#ffffff"/>
          ),
          tabBarButton:(props)=>(
            <CustomTabBarButton {...props} />
          )
        }}/>
        <Tab.Screen name='Order' component={Orders} options={{
          tabBarIcon: ({focused})=>(
            <View style={{alignItems:"center",justifyContent:"center",top:10}}>
            <Icon1 name="list-alt" size={30} color={focused ? "#e32f45" : "#748c94"}/>
             <Text style={{color: focused ? "#e32f45" : "#748c94",fontSize:12,paddingBottom:17,fontFamily: "Quicksand-SemiBold"}}>ORDERS</Text>
           </View>
          ),
        }}/>
        <Tab.Screen name='Settings' component={Profile} options={{
          tabBarIcon: ({focused})=>(
            <View style={{alignItems:"center",justifyContent:"center",top:10}}>
              <Icon
                source="account-edit"
                color={focused ? "#e32f45" : "#748c94"}
                size={30}
              />
              <Text style={{color: focused ? "#e32f45" : "#748c94",fontSize:12,paddingBottom:17,fontFamily: "Quicksand-SemiBold"}}>PROFILE</Text>
            </View>
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({
  shadow:{
    shadowColor: "#7f5DF0",
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})