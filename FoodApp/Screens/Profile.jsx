import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { Icon, MD3Colors } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { base_url } from '../components/Base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get("window")
const Profile = ({navigation}) => {
  const [notification,setNotification] = useState(true)
  const showToast = (action) => {
    Toast.show({
        type: 'success',
        text1: `notifications has turned been ${action}`,
    });
}
  const showToast1 = (message) => {
    Toast.show({
        type: 'success',
        text1: `${message}`,
    });
}
  const handleNotification = ()=>{
    if(notification){
      setNotification(false)
      showToast("off")
    }else{
      setNotification(true)
      showToast("on")
    }
  }
  const[user,setUser] = useState()
  const fetchCurrentUser = async () => {
    try {
      const toke = await AsyncStorage.getItem("jwt");
      const token = JSON.parse(toke)
      const response = await fetch(`${base_url}/admin/user/id`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include JWT token in the Authorization header
        }
      });
      if (!response.ok) {
        setUser(false)
      }else{
        const result = await response.json();
        setUser(result)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          await fetchCurrentUser();
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [])
  );
 const submit = async(item)=>{
  if(item == "Log in"){
    navigation.navigate("Login")
  }else{
    await AsyncStorage.setItem("jwt","")
    showToast1("Logged out successfully")
    navigation.navigate("Sign")
  }
 }
 const profile = ()=>{
  if(user){
    navigation.navigate("Profile2",{user})
  }else{
    showToast1("Log in")
  }
 }
  return (
    <View style={{flex:1}}>
      <TouchableOpacity onPress={profile} style={{flex:0.3,flexDirection:"row",alignItems:"center",width:width-35,justifyContent:"space-around"}}>
        <Image style={{width:130,height:130,borderRadius:180}} source={{uri: user?user.image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOc9VDs02ZrmIC7pS3WzBTvXl8UrI3jwAOVQ&s"}}/>
        <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black"}}>{user?user.username:"User"}</Text>
        <Icon1 name="right" size={16} color="black"/>
      </TouchableOpacity>
      <View style={{flex:0.7,backgroundColor:"white"}}>
        <TouchableOpacity onPress={handleNotification} style={{flexDirection:"row",alignItems:"center",width:width-26,alignSelf:"center",marginVertical:10}}>
            <View style={{backgroundColor:"#e32f45",padding:3,borderRadius:4,marginRight:10}}>
              <Icon
                source="bell"
                color= "white"
                size={20}
              />
            </View>
            <Text style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",flexGrow:1}}>Notifications</Text>
            <Icon1 name="right" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>showToast1("Coming soon")} style={{flexDirection:"row",alignItems:"center",width:width-26,alignSelf:"center",marginVertical:10}}>
            <View style={{backgroundColor:"blue",padding:3,borderRadius:4,marginRight:10}}>
              <Icon
                source="crown"
                color= "white"
                size={20}
              />
            </View>
            <Text style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",flexGrow:1}}>Reward credits</Text>
            <Icon1 name="right" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center",width:width-26,alignSelf:"center",marginVertical:10}}>
            <View style={{backgroundColor:"black",padding:3,borderRadius:4,marginRight:10}}>
              <Icon1
                name="setting"
                color= "white"
                size={20}
              />
            </View>
            <Text style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",flexGrow:1}}>Settings</Text>
            <Icon1 name="right" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>showToast1("Coming soon")} style={{flexDirection:"row",alignItems:"center",width:width-26,alignSelf:"center",marginVertical:10}}>
            <View style={{backgroundColor:"green",padding:3,borderRadius:4,marginRight:10}}>
              <Icon2
                name="user-friends"
                color= "white"
                size={20}
              />
            </View>
            <Text style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",flexGrow:1}}>Invite Friends</Text>
            <Icon1 name="right" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>showToast1("Coming soon")} style={{flexDirection:"row",alignItems:"center",width:width-26,alignSelf:"center",marginVertical:10}}>
            <View style={{backgroundColor:"yellow",padding:3,borderRadius:4,marginRight:10}}>
              <Icon
                source="headset"
                color= "white"
                size={20}
              />
            </View>
            <Text style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",flexGrow:1}}>Help center</Text>
            <Icon1 name="right" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>showToast1("Coming soon")} style={{flexDirection:"row",alignItems:"center",width:width-26,alignSelf:"center",marginVertical:10}}>
            <View style={{backgroundColor:"blue",padding:3,borderRadius:4,marginRight:10}}>
              <Icon1
                name="infocirlce"
                color= "white"
                size={20}
              />
            </View>
            <Text style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",flexGrow:1}}>About us</Text>
            <Icon1 name="right" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>submit(user?"Log out":"Log in")} style={{flexDirection:"row",alignItems:"center",width:width-26,alignSelf:"center",marginVertical:10}}>
            <View style={{backgroundColor:"black",padding:3,borderRadius:4,marginRight:10}}>
              <Icon1
                name="user"
                color= "white"
                size={20}
              />
            </View>
            <Text style={{fontSize: 18,fontFamily:"Quicksand-Medium",color:"black",flexGrow:1}}>{user?"Log out":"Log in"}</Text>
            <Icon1 name="right" size={20} color="black"/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})