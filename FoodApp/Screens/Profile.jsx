import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Icon, MD3Colors } from 'react-native-paper';
const {width,height} = Dimensions.get("window")
const Profile = () => {
  return (
    <View style={{flex:1}}>
      <TouchableOpacity style={{flex:0.3,flexDirection:"row",alignItems:"center",width:width-35,justifyContent:"space-around"}}>
        <Image style={{width:130,height:130,borderRadius:180}} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOc9VDs02ZrmIC7pS3WzBTvXl8UrI3jwAOVQ&s"}}/>
        <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black"}}>Senior man</Text>
        <Icon1 name="right" size={16} color="black"/>
      </TouchableOpacity>
      <View style={{flex:0.7,backgroundColor:"white"}}>
        <TouchableOpacity>
          <View style={{flexDirection:"row"}}>
            <View style={{}}>
              <Icon
                source="bell"
                color= "red"
                size={20}
              />
            </View>
            <Text>Notifications</Text>
            <Icon1 name="right" size={16} color="black"/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})