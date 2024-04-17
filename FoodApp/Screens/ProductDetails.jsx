import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import Icon3 from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
const{width,height} = Dimensions.get("window")
const ProductDetails = ({route,navigation}) => {
    const{item} = route.params
    let [num,setNum] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const allData = await AsyncStorage.getItem('favorites');
                const allrealData = JSON.parse(allData) || [];
                const isCurrentlyFavorite = allrealData.some(product => product._id === item._id);
                setIsFavorite(isCurrentlyFavorite);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFavoriteStatus();
    }, [item._id]);

    const showToast = (item, action) => {
        Toast.show({
            type: 'success',
            text1: `${item.productname} has been ${action} favorites`,
        });
    };
    const showToast1 = (item) => {
        Toast.show({
            type: 'success',
            text1: `${item.productname} has been added to cart successfully`,
        });
    };

    const favorites = async item => {
        try {
            const allData = await AsyncStorage.getItem('favorites');
            const allrealData = JSON.parse(allData) || [];
            const isCurrentlyFavorite = allrealData.some(product => product._id === item._id);

            if (isCurrentlyFavorite) {
                const newFavorites = allrealData.filter(product => product._id !== item._id);
                await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
                showToast(item, 'removed from');
            } else {
                const newFavorites = [...allrealData, item];
                await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
                showToast(item, 'added to');
            }

            setIsFavorite(!isCurrentlyFavorite); // Update isFavorite state
        } catch (err) {
            console.log(err);
        }
    };
    const getCart=async(item)=>{
        const data = await AsyncStorage.getItem("cart")
        const cartData = JSON.parse(data) ||  []
        const alreadyInCart = cartData.find((cart)=>cart._id == item._id)
        if(alreadyInCart){
            const itemadded = {...alreadyInCart,num:num,price:item.productprice*num}
            const otherData = cartData.filter((cart)=>cart._id != item._id)
            const allCart = [...otherData,itemadded]
            try{
                await AsyncStorage.setItem("cart",JSON.stringify(allCart))
            }catch(err){
                console.log(err)
            }
            showToast1(item)
        }else{
            const itemAdded = {...item,num:num,price:item.productprice*num}
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
    <View style={{flex:1,backgroundColor:"white"}}>
        <Image style={{flex:0.45}} source={{uri: item.productimage}} />
        <View style={{flex:0.55,backgroundColor:"white",borderTopLeftRadius:30,bottom:30}}>
            <View  style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginVertical:10,width:width -40,alignSelf:"center"}}>
                <TouchableOpacity onPress={()=>favorites(item)} >
                    <Icon name="heart" size={35} color={isFavorite ? "#e32f45" : "gray"}/>
                </TouchableOpacity>
                <Text style={{textAlign:"center",fontSize: 20,color:"black",padding:2,borderRadius:5,fontFamily:"Quicksand-SemiBold"}}><Icon1 name="naira-sign" size={15} color="black"/>{item.productprice}</Text>
            </View>
            <View style={{width:width-40,alignSelf:"center",flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                <Text style={{fontSize: 24,color:"black",fontFamily:"Quicksand-Bold"}}>{item.productname}</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                        <TouchableOpacity onPress={()=>{
                        num--
                        setNum(num)
                        }}>
                        <Icon3 name="minuscircleo" size={20} color="#e32f45" />
                      </TouchableOpacity>
                      <Text style={{fontSize: 20,fontFamily:"Quicksand-SemiBold",color:"black",marginHorizontal:10}}>{num}</Text>
                      <TouchableOpacity onPress={()=>{
                        num++
                        setNum(num)
                        }}>
                        <Icon3 name="pluscircleo" size={20} color="#e32f45"/>
                      </TouchableOpacity>
                </View>
            </View>
            <View style={{width:width-40,justifyContent:"space-between",marginTop:10,alignSelf:"center"}}>
                <Text style={{fontSize: 19,color:"black",fontFamily:"Quicksand-Bold"}}>About the food</Text>
                <Text style={{fontSize: 16,color:"black",fontFamily:"Quicksand-Medium"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex mollitia laboriosam unde, perferendis fugit velit officia harum. Vel fuga veniam eaque aut porro, at error quisquam tempore modi laboriosam nobis.</Text>
            </View>
            <View style={{width:width-40,justifyContent:"space-between",marginTop:10,alignSelf:"center",flexDirection:"row",alignItems:"center"}}>
                <View>
                    <Text style={{fontSize: 18,color:"black",fontFamily:"Quicksand-Medium"}}>Total</Text>
                    <Text style={{fontSize: 20,color:"black",fontFamily:"Quicksand-Bold"}}><Icon1 name="naira-sign" size={15} color="black"/>{item.productprice*num}</Text>
                </View>
                <TouchableOpacity onPress={()=>getCart(item)} style={{backgroundColor:"#e32f45",width:190,paddingVertical:13,paddingHorizontal:5,borderRadius:10,alignItems:"center"}}>
                        <Text style={{color:"white",fontFamily:"Quicksand-SemiBold",fontSize: 18,}}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({})