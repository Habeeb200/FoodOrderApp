import { Image, StyleSheet, Text, View,Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState,useCallback, useRef } from 'react'
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome6';
import { useFocusEffect } from '@react-navigation/native';
import { base_url } from '../components/Base';
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
const {width,height} = Dimensions.get("window")
const Cart = ({navigation}) => {
  const paystackWebViewRef = useRef(paystackProps.PayStackRef); 
  const [color,setColor] = useState("#e32f45")
  let [num,setNum] = useState(1)
  const showToast = (item) => {
    Toast.show({
      type: 'success',
      text1: `${item.productname} has been successfully removed from cart`,
    });
  }
  const showToast1 = (message) => {
    Toast.show({
      type: 'success',
      text1: `${message}`,
    });
  }
  const discount = 0
  const delivery = 50
  const[allCart,setCart] = useState([])
  let [total,setTotal] = useState(0)
  const increase=async(item)=>{
    const findProduct = allCart.find((cart)=>cart._id == item._id)
    if(findProduct){
      const newProduct = {...findProduct,num: item.num+=1}
      const otherProduct  = allCart.filter((cart)=>cart._id != item._id)
      const allProduct = [newProduct,...otherProduct]
      setCart(allProduct)
      const realtotal = item.num * item.productprice
      setTotal(realtotal)
      try{
        await AsyncStorage.setItem("cart",JSON.stringify(allProduct))
      }catch(err){
        console.log(err)
      }
    }else{
      console.log("Item not found")
    }
  }
  const decrease=async(item)=>{
    const findProduct = allCart.find((cart)=>cart._id == item._id)
    if(findProduct){
      const newProduct = {...findProduct,num: item.num-=1}
      const otherProduct  = allCart.filter((cart)=>cart._id != item._id)
      const allProduct = [newProduct,...otherProduct]
      setCart(allProduct)
      const realtotal = item.num * item.productprice
      setTotal(realtotal)
      try{
        await AsyncStorage.setItem("cart",JSON.stringify(allProduct))
      }catch(err){
        console.log(err)
      }
    }else{
      console.log("Item not found")
    }
  }
  const fetchData = async () => {
    const data = await AsyncStorage.getItem("cart");
    const allData = JSON.parse(data);
    let totalPrice = 0;
    if(allData){
      allData.forEach((data) => {
        totalPrice += data.price;
      });
      setCart(allData);
      setTotal(totalPrice);
    }
  }
 const removeProduct=async(item)=>{
    const particularProduct = allCart.find((product)=>product._id == item._id)
    if(particularProduct){
      const otherProduct = allCart.filter((product)=>product._id != item._id)
      setCart(otherProduct)
      try{
        await AsyncStorage.setItem("cart",JSON.stringify(otherProduct))
        showToast(item)
      }catch(err){
        console.log(err)
      }
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
    try{
      fetchData()
      fetchCurrentUser()
    }catch(err){
      console.log(err);
    }
  }, [])
);
  const checkout=async()=>{
    if(!user){
      showToast1("You have to be logged in")
      navigation.navigate("Login")
    }else{
      paystackWebViewRef.current.startTransaction()
    }
  }
  return (
    <View style={{flex:1}}>
      <Navbar screen="Shopping Cart"/>
      <View style={{flex:0.65}}>
      <View style={{alignSelf:"center"}}>
      <Paystack
        paystackKey="pk_test_215e131b1fcfb45b168c78508ed83ee53d0e52a7"
        paystackSecretKey="sk_test_8e806842a61f7c324badbdd8fb11f86b8b07b1a0"
        billingEmail="habeebajayi3@gmail.com"
        billingName="Habeeb"
        currency='NGN'
        billingMobile = "09045579254"
        amount={total}
        onCancel={(e) => {
          console.log(e)
        }}
        onSuccess={(res) => {
          console.log(res)
        }}
        ref={paystackWebViewRef}
      />
        {!allCart.length?(
            <View style={{justifyContent:"center"}}>
            <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",marginTop:90}}>No product in cart</Text>
          </View>
        ):
        ( 
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allCart}
          renderItem={({item}) =>
          <View style={{alignSelf:"center",flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,alignItems:"center",marginVertical:5,padding:4}}>
          <Image source={{uri: item.productimage}} style={{width:110,height:140,borderRadius:20,marginLeft:7,marginRight:7}}/>
          <View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>{item.productname}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:205,alignItems:"center",marginVertical:20}}>
              <Text style={{fontSize: 17,fontFamily:"Quicksand-Bold",color:"black"}}><Icon1 name="naira-sign" size={15} color="black"/>{item.price}</Text>
              <TouchableOpacity onPress={()=>removeProduct(item)}>
                <Icon2 name="cancel" size={30} color={color}/>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",width:70,justifyContent:"space-between"}}>
              <TouchableOpacity onPress={()=>decrease(item)}>
                <Icon3 name="minuscircleo" size={20} color={color} />
              </TouchableOpacity>
              <Text style={{fontSize: 20,fontFamily:"Quicksand-SemiBold",color:"black"}}>{item.num}</Text>
              <TouchableOpacity onPress={()=>increase(item)}>
                <Icon3 name="pluscircleo" size={20} color={color}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        }
      />
        )
        
        }
            
                
      </View>
      </View>

  <View style={{flex:0.40,backgroundColor:"white"}}>
      <View style={{flexDirection:"row",justifyContent:"space-between",width: width -25,alignSelf:"center",marginVertical:5}}>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>Subtotal</Text>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}><Icon1 name="naira-sign" size={15} color="black"/> {total}</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",width: width -25,alignSelf:"center"}}>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>Discount</Text>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}><Icon1 name="naira-sign" size={15} color="black"/> {discount}.00</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",width: width -25,alignSelf:"center",marginVertical:5}}>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}>Delivery</Text>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Medium",color:"black"}}><Icon1 name="naira-sign" size={15} color="black"/> {!allCart.length?0:delivery}</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",width: width -25,alignSelf:"center",marginVertical:7}}>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Bold",color:"black"}}>Total</Text>
        <Text style={{fontSize: 17,fontFamily:"Quicksand-Bold",color:"black"}}><Icon1 name="naira-sign" size={15} color="black"/>{total+discount+delivery}</Text>
      </View>
      <TouchableOpacity style={{alignSelf:"center",backgroundColor:color,width: width - 25,alignItems:"center",padding:5,borderRadius:10}} onPress={checkout}>
        <Text style={{fontSize: 22,fontFamily:"Quicksand-Bold",color:"white"}}>Checkout</Text>
      </TouchableOpacity>

      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})