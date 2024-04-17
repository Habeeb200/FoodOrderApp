import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';
const{width,height} = Dimensions.get("window")
const Forgot = ({navigation}) => {
    let[userDetails,setUserDetails]= useState({
        email: "",
        password: "",
      })
  return (
<>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{left:25,marginTop:20}}>
        <Icon2 name="left" color="black" size={28}/>
      </TouchableOpacity>
        <View style={{flex:1,left:25,justifyContent:"center"}}>
            <Text style={{fontSize: 28,fontFamily:"Quicksand-Bold",color:"black"}}>Forgot password</Text>
            <View style={{flexDirection:"row",alignItems:"center",borderBottomWidth:1,width:width-50,padding:10,marginVertical:10}}>
                <Icon2 name="user" size={26} color="black"/>
                <TextInput value={userDetails.email} onChangeText={(text)=>setUserDetails({...userDetails,email: text})} placeholder='Email' style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",width:width-80}}/>
            </View>
            <TouchableOpacity style={{backgroundColor:"#e32f45",width:width-45,paddingVertical:13,borderRadius:10,alignItems:"center",marginTop:25}}>
                <Text style={{color:"white",fontFamily:"Quicksand-SemiBold",fontSize: 19,}}>Recover password</Text>
            </TouchableOpacity>
        </View>
    </>  )
}

export default Forgot

const styles = StyleSheet.create({})