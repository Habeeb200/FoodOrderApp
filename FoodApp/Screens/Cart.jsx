import { Image, StyleSheet, Text, View,Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
const {width,height} = Dimensions.get("window")
const Cart = () => {
  const [color,setColor] = useState("#e32f45")
  let [num,setNum] = useState(1)
  const showToast = (text) => {
    Toast.show({
      type: 'success',
      text1: text,
    });
  }
  return (
    <View style={{flex:1}}>
      <View style={{flex:0.65}}>
      <Navbar screen="Shopping Cart"/>
      <View style={{alignSelf:"center",marginVertical:9}}>
                <View style={{flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,height:155,alignItems:"center"}}>
                  <Image source={require("../assets/Food/cuisine.jpg")} style={{width:110,height:140,borderRadius:20,marginLeft:7,marginRight:7}}/>
                  <View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                      <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>Cuisine</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:205,alignItems:"center",marginVertical:20}}>
                      <Text style={{fontSize: 17,fontFamily:"Quicksand-Bold",color:"black"}}>NGN 4000</Text>
                      <TouchableOpacity onPress={()=>showToast("Cuisine has been removed from cart")}>
                        <Icon2 name="cancel" size={30} color={color}/>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",width:70,justifyContent:"space-between"}}>
                      <TouchableOpacity onPress={()=>{
                        num--
                        setNum(num)
                        }}>
                        <Icon3 name="minuscircleo" size={20} color={color} />
                      </TouchableOpacity>
                      <Text style={{fontSize: 20,fontFamily:"Quicksand-SemiBold",color:"black"}}>{num}</Text>
                      <TouchableOpacity onPress={()=>{
                        num++
                        setNum(num)
                        }}>
                        <Icon3 name="pluscircleo" size={20} color={color}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
      </View>
      </View>
    <View style={{flex:0.35,backgroundColor:"white"}}>
      <View style={{flexDirection:"row",justifyContent:"space-between",width: width -25,alignSelf:"center",marginVertical:5}}>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>Subtotal</Text>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>NGN 4000</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",width: width -25,alignSelf:"center"}}>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>Discount</Text>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>NGN 0.00</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",width: width -25,alignSelf:"center",marginVertical:5}}>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>Delivery</Text>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>NGN 50</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",width: width -25,alignSelf:"center",marginVertical:5}}>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Bold",color:"black"}}>Total</Text>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Bold",color:"black"}}>NGN 4050</Text>
      </View>
      <TouchableOpacity style={{alignSelf:"center",backgroundColor:color,width: width - 25,alignItems:"center",padding:5,borderRadius:10}} onPress={()=>showToast("Your order has been successfully placed")}>
        <Text style={{fontSize: 22,fontFamily:"Quicksand-Bold",color:"white"}}>Checkout</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})