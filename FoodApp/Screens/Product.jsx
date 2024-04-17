import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import { base_url } from '../components/Base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height} = Dimensions.get("window")

const Product = ({route,navigation}) => {
    const {category}  = route.params
    const[products,setProducts] = useState([])
    const [color,setColor] = useState("gray")
    const [allfavorites,setFavorites] = useState([])
    const fetchData = async () => {
      try {
          const response = await fetch(`${base_url}/admin/products/${category}`)
          const fetchedProducts = await response.json()
          // Load favorite products from AsyncStorage
          const allData = await AsyncStorage.getItem("favorites")
          const favoriteProducts = JSON.parse(allData) || []
          // Merge fetched products with favorite products from AsyncStorage
          const productsWithFavorites = fetchedProducts.map(item => ({
              ...item,
              isFavorite: favoriteProducts.some(favorite => favorite._id === item._id)
          }))
  
          setProducts(productsWithFavorites)
      } catch (err) {
          console.log(err)
      }
  }

  useEffect(() => {
      fetchData()
  }, [])

  const showToast = (item, action) => {
      Toast.show({
          type: 'success',
          text1: `${item.productname} has been ${action} favorites`,
      });
  }

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
  return (
    <View style={{flex:1}}>
        <Navbar screen={category}/>
        <FlatList       
        data={products}
        renderItem={({item}) => 
        {
          return(
            <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails",{item})}  style={{alignSelf:"center",marginVertical:9}}>
                <View style={{flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,height:165,alignItems:"center"}}>
                  <Image source={{uri: item.productimage}} style={{width:150,height:150,borderRadius:20,marginLeft:13,marginRight:20}}/>
                  <View>
                      <TouchableOpacity onPress={()=>favorites(item)} style={{alignSelf:"flex-end"}}>
                        <Icon name="heart" size={30} color={item.isFavorite ? "#e32f45" : "gray"}/>
                      </TouchableOpacity>
                    <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130,marginVertical:18}}>{item.productname.length>11?item.productname.slice(0,11)+"...":item.productname}</Text>
                    <Text style={{textAlign:"center",fontSize: 16,color:"white",backgroundColor:"#e32f45",width:75,padding:2,borderRadius:5,fontFamily:"Quicksand-SemiBold"}}><Icon1 name="naira-sign" size={15} color="white"/>{item.productprice}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )
        }
      }
      />
    </View>
  )
}

export default Product

const styles = StyleSheet.create({})