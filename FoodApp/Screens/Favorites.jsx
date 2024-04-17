import { Image, StyleSheet, Text, View,Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/FontAwesome6';
const {width,height} = Dimensions.get("window")
const Favorites = () => {
  const [color,setColor] = useState("#e32f45")
  const [products,setProducts] = useState([])
  const fetchData=async()=>{
    const data = await AsyncStorage.getItem("favorites")
    const realdata = JSON.parse(data) || []
    setProducts(realdata)
  }
  useEffect(()=>{
    fetchData()
  },[products])
  const showToast = (item, action) => {
    Toast.show({
        type: 'success',
        text1: `${item.productname} has been ${action} favorites`,
    });
}
const showToast1 = (item) => {
  Toast.show({
      type: 'success',
      text1: `${item.productname} has been added to cart successfully`,
  });
};
const favorites = async (item) => {
    // Toggle isFavorite property of the item
    const updatedProducts = products.map(product => {
        if (product._id === item._id) {
            return { ...product, isFavorite: !product.isFavorite }
        }
        return product
    })
    setProducts(updatedProducts)
    // Update AsyncStorage accordingly
    try {
        const allData = await AsyncStorage.getItem("favorites")
        const allrealData = JSON.parse(allData) || []
        const isCurrentlyFavorite = allrealData.some(product => product._id === item._id)
        if (isCurrentlyFavorite) {
            const newFavorites = allrealData.filter(product => product._id !== item._id)
            await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
            showToast(item, "removed from")
        } else {
            const newFavorites = [...allrealData, item]
            await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
            showToast(item, "added to")
        }
    } catch (err) {
        console.log(err)
    }
}
const getCart=async(item)=>{
  const data = await AsyncStorage.getItem("cart")
  const cartData = JSON.parse(data) ||  []
  const alreadyInCart = cartData.find((cart)=>cart._id == item._id)
  if(alreadyInCart){
      const itemadded = {...alreadyInCart,num:1,price:item.productprice*1}
      const otherData = cartData.filter((cart)=>cart._id != item._id)
      const allCart = [...otherData,itemadded]
      try{
          await AsyncStorage.setItem("cart",JSON.stringify(allCart))
      }catch(err){
          console.log(err)
      }
      showToast1(item)
  }else{
      const itemAdded = {...item,num:1,price:item.productprice*1}
      const otherData = cartData.filter((cart)=>cart._id != item._id)
      const allCart = [...otherData,itemAdded]
      try{
          await AsyncStorage.setItem("cart",JSON.stringify(allCart))
      }catch(err){
          console.log(err)
      }
      showToast1(item)
  }
}
  return (
    <View style={{flex: 1}}>
      <Navbar screen="Favorites"/>
      {!products.length ? <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",textAlign:"center"}}>No favorites have been added</Text>:
         <FlatList
         showsVerticalScrollIndicator={false}
         data={products}
         renderItem={({item}) =>
           <View style={{alignSelf:"center",flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,alignItems:"center",marginVertical:5,padding:4}}>
           <Image source={{uri: item.productimage}} style={{width:110,height:130,borderRadius:20,marginLeft:7,marginRight:7}}/>
           <View>
             <View style={{marginBottom:50,flexDirection:"row",justifyContent:"space-between",width:200}}>
               <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>{item.productname}</Text>
               <TouchableOpacity onPress={()=>favorites(item)}>
                 <Icon name="heart" size={30} color={color}/>
               </TouchableOpacity>
             </View>
             <View style={{flexDirection:"row",justifyContent:"space-between",width:205,alignItems:"center"}}>
               <Text style={{fontSize: 17,fontFamily:"Quicksand-Bold",color:"black"}}><Icon1 name="naira-sign" size={15} color="black"/>{item.productprice}</Text>
               <TouchableOpacity onPress={()=>getCart(item)} style={{backgroundColor:"#e32f45",width:100,paddingVertical:11,paddingHorizontal:5,borderRadius:10,alignItems:"center"}}>
                 <Text style={{color:"white",fontFamily:"Quicksand-Medium"}}>Add to cart</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
         }
       />
      }
      </View>
  )
}

export default Favorites

const styles = StyleSheet.create({})