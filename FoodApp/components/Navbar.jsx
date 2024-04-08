import { Dimensions, ScrollViewComponent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';
const {width,height} = Dimensions.get("window")
const Navbar = ({screen}) => {
  return (
    <View style={{flexDirection:"row",justifyContent:"center",width:width,marginTop:10}}>
      <Text style={{fontFamily:"Quicksand-SemiBold",fontSize:22,color:"black"}}>{screen}</Text>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({})