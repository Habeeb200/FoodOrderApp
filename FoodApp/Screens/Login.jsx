import { ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';
const{width,height} = Dimensions.get("window")
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { base_url } from '../components/Base';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  let[userDetails,setUserDetails]= useState({
    username: "",
    password: "",
  })
  const[loading,setLoading]= useState(false)
  const showToast = (message,type) => {
    Toast.show({
      type: `${type}`,
      text1: `${message}`,
    });
  }
  const submit=async()=>{
    if(!userDetails.username || !userDetails.password){
      showToast("All fields are required","error")
    }else{
      try{
        setLoading(true)
        const response = await axios.post(`${base_url}/user/login`,userDetails)
        await AsyncStorage.setItem("jwt",JSON.stringify(response.data))
        showToast("Successfully Logged in","success")
        setUserDetails({...userDetails,username:"",password:""})
        setLoading(false)
        navigation.navigate("Tabs")
      }catch(err){
        showToast(err,"error")
        console.log(err)
        setLoading(false)
        setUserDetails({...userDetails,username:"",password:"",password2:""})
      }
    }
  }
  if(loading){
    return(
      <View style={{flex:1,justifyContent:"center"}}>
        <ActivityIndicator size={70}/>
      </View>
    )
  }
  return (
    <>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{left:25,marginTop:20}}>
        <Icon2 name="left" color="black" size={28}/>
      </TouchableOpacity>
        <View style={{flex:1,left:25,justifyContent:"center"}}>
            <Text style={{fontSize: 28,fontFamily:"Quicksand-Bold",color:"black"}}>Sign in</Text>
            <View style={{flexDirection:"row",alignItems:"center",borderBottomWidth:1,width:width-50,padding:10,marginVertical:10}}>
                <Icon2 name="user" size={26} color="black"/>
                <TextInput value={userDetails.username} onChangeText={(text)=>setUserDetails({...userDetails,username: text})} placeholder='Username' style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",width:width-80}}/>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",borderBottomWidth:1,width:width-50,padding:10}}>
                <Icon2 name="lock" size={26} color="black"/>
                <TextInput value={userDetails.password} onChangeText={(text)=>setUserDetails({...userDetails,password: text})} placeholder='Password' secureTextEntry style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",width:width-80}}/>
            </View>
            <TouchableOpacity onPress={submit} style={{backgroundColor:"#e32f45",width:width-45,paddingVertical:13,borderRadius:10,alignItems:"center",marginTop:25}}>
                        <Text style={{color:"white",fontFamily:"Quicksand-SemiBold",fontSize: 19,}}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Forgot")}>
                <Text style={{color:"black",fontFamily:"Quicksand-Medium",fontSize: 16,alignSelf:"flex-end",right:46,marginTop:15}}>Forgot Password?</Text>
            </TouchableOpacity>
        <View style={{marginTop:20}}>
            <Text style={{color:"black",fontFamily:"Quicksand-Medium",fontSize: 16,alignSelf:"center",right:12}}>
              Don't have an account? <Text onPress={()=>navigation.navigate("Sign")} style={{color:"#e32f45"}}>Sign up</Text>
            </Text>
        </View>
        </View>
    </>
  )
}

export default Login

const styles = StyleSheet.create({})