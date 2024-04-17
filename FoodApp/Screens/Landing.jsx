import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DATA } from '../components/Categories'
const {width,height} = Dimensions.get("window")
const Landing = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <FlatList
        horizontal={true}   
        data={DATA}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => 
        {
          return(
            <Image source={item.image} style={{width:300,height:320,marginHorizontal:15,borderRadius:15,marginTop:60}}/>
          )
      }
      }
      />
      <Text style={{color:"black",fontFamily:"Quicksand-SemiBold",fontSize: 19,textAlign:"center"}}>Order up satisfaction, one bite at a time!</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{backgroundColor:"#e32f45",width:width-45,paddingVertical:13,borderRadius:10,alignItems:"center",alignSelf:"center",marginVertical:20}}>
            <Text style={{color:"white",fontFamily:"Quicksand-SemiBold",fontSize: 19,}}>Login</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("Sign")} style={{backgroundColor:"#e32f45",width:width-45,paddingVertical:13,borderRadius:10,alignItems:"center",alignSelf:"center",marginBottom:100}}>
            <Text style={{color:"white",fontFamily:"Quicksand-SemiBold",fontSize: 19,}}>Sign up</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({})