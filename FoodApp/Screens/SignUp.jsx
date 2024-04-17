import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { base_url } from '../components/Base';
import Toast from 'react-native-toast-message';
const{width,height} = Dimensions.get("window")

const SignUp = ({navigation}) => {
  const[loading,setLoading]= useState(false)
  let[userDetails,setUserDetails]= useState({
    username: "",
    password: "",
    password2: ""
  })
  const showToast = (message,type) => {
    Toast.show({
      type: `${type}`,
      text1: `${message}`,
    });
  }
  const submit=async()=>{
    if(!userDetails.username || !userDetails.password || !userDetails.password2){
      showToast("All fields are required","error")
    }else if(userDetails.password != userDetails.password2){
      showToast("Password do not match","error")
    }else if(userDetails.password.length <7){
      showToast("Password must have more that 7 characters","error")
    }else{
      try{
        setLoading(true)
        await axios.post(`${base_url}/user/signup`,userDetails)
        showToast("Successfully Signed up","success")
        setUserDetails({...userDetails,username:"",password:"",password2:""})
        setLoading(false)
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
            <Text style={{fontSize: 28,fontFamily:"Quicksand-Bold",color:"black"}}>Sign up</Text>
            <View style={{flexDirection:"row",alignItems:"center",borderBottomWidth:1,width:width-50,padding:10,marginTop:10}}>
                <Icon2 name="user" size={26} color="black"/>
                <TextInput value={userDetails.username} onChangeText={(text)=>setUserDetails({...userDetails,username: text})} placeholder='Username' style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",width:width-80}}/>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",borderBottomWidth:1,width:width-50,padding:10,marginVertical:10}}>
                <Icon2 name="lock" size={26} color="black"/>
                <TextInput value={userDetails.password} placeholder='Password' onChangeText={(text)=>setUserDetails({...userDetails,password: text})}  secureTextEntry style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",width:width-80}}/>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",borderBottomWidth:1,width:width-50,padding:10}}>
                <Icon2 name="lock" size={26} color="black"/>
                <TextInput value={userDetails.password2} onChangeText={(text)=>setUserDetails({...userDetails,password2: text})} placeholder='Re-enter Password' secureTextEntry style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",width:width-80}}/>
            </View>
            <TouchableOpacity onPress={submit} style={{backgroundColor:"#e32f45",width:width-45,paddingVertical:13,borderRadius:10,alignItems:"center",marginTop:25}}>
                        <Text style={{color:"white",fontFamily:"Quicksand-SemiBold",fontSize: 19,}}>Sign up</Text>
            </TouchableOpacity>
        <View style={{marginTop:20}}>
            <Text style={{color:"black",fontFamily:"Quicksand-Medium",fontSize: 16,alignSelf:"center",right:12}}>
              Already have an account? <Text onPress={()=>navigation.navigate("Login")} style={{color:"#e32f45"}}>Sign in</Text>
            </Text>
        </View>
        </View>
    </>
  )
}

export default SignUp

const styles = StyleSheet.create({})