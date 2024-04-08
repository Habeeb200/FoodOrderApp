import { Image, StyleSheet, Text, View,Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
const {width,height} = Dimensions.get("window")
const Favorites = () => {
  const [color,setColor] = useState("#e32f45")
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Cuisine has been removed from favorites',
    });
  }
  return (
    <View style={{flex: 1}}>
      <Navbar screen="Favorites"/>
      <View style={{alignSelf:"center",marginVertical:9}}>
                <View style={{flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,height:155,alignItems:"center"}}>
                  <Image source={require("../assets/Food/cuisine.jpg")} style={{width:110,height:140,borderRadius:20,marginLeft:7,marginRight:7}}/>
                  <View>
                    <View style={{marginBottom:60,flexDirection:"row",justifyContent:"space-between"}}>
                      <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>Cuisine</Text>
                      <TouchableOpacity onPress={showToast}>
                        <Icon name="heart" size={30} color={color}/>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:205,alignItems:"center"}}>
                      <Text style={{fontSize: 17,fontFamily:"Quicksand-Bold",color:"black"}}>NGN 4000</Text>
                      <TouchableOpacity style={{backgroundColor:"#e32f45",width:100,paddingVertical:11,paddingHorizontal:5,borderRadius:10,alignItems:"center"}}>
                        <Text style={{color:"white",fontFamily:"Quicksand-Medium"}}>Add to cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
      </View>
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({})