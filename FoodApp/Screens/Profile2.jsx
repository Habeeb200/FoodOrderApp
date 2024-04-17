import { Alert, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Avatar } from 'react-native-paper'
import { base_url } from '../components/Base';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const{width,height}= Dimensions.get("window")
const Profile2 = ({route,navigation}) => {
    const {user} =route.params
    const pickImage = ()=>{
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
          };
      
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('Image picker error: ', response.error);
            } else {
              let imageUri = response.uri || response.assets?.[0]?.uri;
              setUserDetails({...userDetails,image:imageUri});
            }
          });
      }
    const[userDetails,setUserDetails] = useState({
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      username: "",
      email:"",
      phone: "",
      address: ""
    })
    const fetchUserData = async()=>{
      const response = await fetch(`${base_url}/admin/users/${user.username}`)
      const result = await response.json()
      setUserDetails({
        ...userDetails,
        username: result.username,
        email: result.email,
        phone: result.phone.toString(),
        address: result.address,
        image: result.image,
      });
    }
    const saveData = async()=>{
      const response = await axios.put(`${base_url}/admin/update/${user._id}`,userDetails)
      if(response){
        showToast1("User updated successfully")
      }
    }
    useFocusEffect(
      React.useCallback(() => {
        const fetchData = async () => {
          try {
            await fetchUserData();
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [])
    );
    const showToast1 = (message) => {
      Toast.show({
          type: 'success',
          text1: `${message}`,
      });
  }
  return (
      <>
        <Navbar screen="Edit Profile"/>
        <View style={{flex:1,justifyContent:"center"}}>
        <View style={{width:width-26,backgroundColor:"white",alignSelf:"center",borderRadius:9,elevation:3,height:460}}>
            <View style={{alignItems:"center",bottom:70}}>
                <Image
                    source={{ uri: userDetails.image }}
                    style={{ width: 150, height: 150, borderRadius: 90 }}
                />
                <TouchableOpacity
                    style={{
                    marginTop: -38,
                    marginRight: -97,
                    marginBottom:20
                    }}
                    onPress={pickImage}
                    >
                    <Avatar.Icon
                    size={37}
                    icon="camera"
                    style={{ backgroundColor: "black" }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:8}}>
                <Text style={{fontSize: 17,fontFamily:"Quicksand-Light",color:"black"}}>Username</Text>
                <TextInput value={user.username} onChangeText={(text)=>setUserDetails({...userDetails,username:text})} style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}/>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:8}}>
                <Text style={{fontSize: 17,fontFamily:"Quicksand-Light",color:"black"}}>Email</Text>
                <TextInput value={userDetails.email} onChangeText={(text)=>setUserDetails({...userDetails,email:text})} style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}/>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:8}}>
                <Text style={{fontSize: 17,fontFamily:"Quicksand-Light",color:"black"}}>Phone</Text>
                <TextInput value={userDetails.phone} keyboardType='phone-pad' onChangeText={(text)=>setUserDetails({...userDetails,phone:text})} style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}/>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:8}}>
                <Text style={{fontSize: 17,fontFamily:"Quicksand-Light",color:"black"}}>Address</Text>
                <TextInput value={userDetails.address} onChangeText={(text)=>setUserDetails({...userDetails,address:text})} style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}/>
            </View>
            <TouchableOpacity onPress={saveData} style={{backgroundColor:"#e32f45",width:width-45,paddingVertical:13,borderRadius:10,alignItems:"center",marginTop:15,alignSelf:"center"}}>
                        <Text style={{color:"white",fontFamily:"Quicksand-SemiBold",fontSize: 19,}}>Save</Text>
            </TouchableOpacity>
        </View>
        </View>
      </>
  )
}

export default Profile2

const styles = StyleSheet.create({})