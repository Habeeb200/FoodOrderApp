import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
import { DATA,CATEGORIES, CATEGORIES2,CATEGORIES3,CATEGORIES4,CATEGORIES5 } from '../components/Categories';
import axios from 'axios';
const {width,height} = Dimensions.get("window")
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const handleCategoryPress = (title) => {
    setSelectedCategory(title);
  };
  const[show,setShow] = useState(true)
  return (
    <View style={{flex:1}} >
      {show?(
        <TouchableOpacity style={{...styles.shadow,alignSelf:"flex-end"}} onPress={()=>setShow(false)}>
        <View style={{
          width:47,
          height:47,
          borderRadius:35,
          backgroundColor: "#e32f45",
          justifyContent:"center",
          alignItems:"center",
          right:20,
          top:15
        }}>
          <Icon name="search" color="white" size={24}/>
        </View>
      </TouchableOpacity>
      ):<View style={{flexDirection:"row",alignItems:"center",marginVertical:10,alignSelf:"flex-end",marginRight:5}}>
        <TouchableOpacity onPress={()=>setShow(true)}>
          <Icon name="chevron-left" size={25} color="black"  />
        </TouchableOpacity>
          <Searchbar
            placeholder="Search" 
            
            style={{width:width-40,alignSelf:"flex-end",marginRight:3}}/>
      </View>
      }
      <View style={{left:20}}>
        <Text style={styles.text}>Food</Text>
        <Text style={styles.text}>Special for you</Text>
      </View>
      <View style={{marginTop:30,marginBottom:10,width:width-26,alignSelf:"center"}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={DATA}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item.title)} >
              <Text
                style={{
                  color: selectedCategory === item.title ? 'white' : 'black',
                  backgroundColor: selectedCategory === item.title ? '#e32f45' : 'transparent',
                  fontSize: 18,
                  fontFamily: "Quicksand-Medium",
                  paddingVertical: 6,
                  borderRadius: 20,
                  width:item.title == "All"?60:118,
                  textAlign:"center"
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>

        )}
      />
        </View>
        <FlatList        
        data={CATEGORIES}
        renderItem={({item}) => 
        {
        if(selectedCategory == "All"){
          return(
            <TouchableOpacity style={{alignSelf:"center",marginVertical:9}}>
                <View style={{flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,height:165,alignItems:"center"}}>
                  <Image source={item.image} style={{width:150,height:150,borderRadius:20,marginLeft:13,marginRight:20}}/>
                  <View>
                    <Text style={{fontSize: 18,color:"white",top:-25,backgroundColor:"#e32f45",width:125,padding:2,textAlign:"center",borderRadius:5,fontFamily:"Quicksand-Medium"}}>{item.categories}</Text>
                    <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>{item.title}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )
        }
      }
      }
        />
        <FlatList        
        data={CATEGORIES2}
        renderItem={({item}) => 
        {
        if(selectedCategory == "Cuisines"){
          return(
            <TouchableOpacity style={{alignSelf:"center",marginVertical:9}}>
                <View style={{flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,height:165,alignItems:"center"}}>
                  <Image source={{uri: item.image}} style={{width:150,height:150,borderRadius:20,marginLeft:13,marginRight:20}}/>
                  <View>
                    <Text style={{fontSize: 18,color:"white",top:-25,backgroundColor:"#e32f45",width:125,padding:2,textAlign:"center",borderRadius:5,fontFamily:"Quicksand-Medium"}}>{selectedCategory}</Text>
                    <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>{item.title}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )
        }
      }
      }
        />
      <FlatList        
        data={CATEGORIES3}
        renderItem={({item}) => 
        {
        if(selectedCategory == "Ingredients"){
          return(
            <TouchableOpacity style={{alignSelf:"center",marginVertical:9}}>
                <View style={{flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,height:165,alignItems:"center"}}>
                  <Image source={item.image} style={{width:150,height:150,borderRadius:20,marginLeft:13,marginRight:20}}/>
                  <View>
                    <Text style={{fontSize: 18,color:"white",top:-38,backgroundColor:"#e32f45",width:125,padding:2,textAlign:"center",borderRadius:5,fontFamily:"Quicksand-Medium"}}>{selectedCategory}</Text>
                    <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>{item.title}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )
        }
      }
      }
      />
      <FlatList        
        data={CATEGORIES4}
        renderItem={({item}) => 
        {
        if(selectedCategory == "Dietary"){
          return(
            <TouchableOpacity style={{alignSelf:"center",marginVertical:9}}>
                <View style={{flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,height:165,alignItems:"center"}}>
                  <Image source={item.image} style={{width:150,height:150,borderRadius:20,marginLeft:13,marginRight:20}}/>
                  <View>
                    <Text style={{fontSize: 18,color:"white",top:-38,backgroundColor:"#e32f45",width:125,padding:2,textAlign:"center",borderRadius:5,fontFamily:"Quicksand-Medium"}}>{selectedCategory}</Text>
                    <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>{item.title}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )
        }
      }
      }
      />
      <FlatList        
        data={CATEGORIES5}
        renderItem={({item}) => 
        {
        if(selectedCategory == "Preparation"){
          return(
            <TouchableOpacity style={{alignSelf:"center",marginVertical:9}}>
                <View style={{flexDirection:"row",width:width-25,backgroundColor:"white",borderRadius:15,height:165,alignItems:"center"}}>
                  <Image source={item.image} style={{width:150,height:150,borderRadius:20,marginLeft:13,marginRight:20}}/>
                  <View>
                    <Text style={{fontSize: 18,color:"white",top:-38,backgroundColor:"#e32f45",width:125,padding:2,textAlign:"center",borderRadius:5,fontFamily:"Quicksand-Medium"}}>{selectedCategory}</Text>
                    <Text style={{fontSize: 20,fontFamily:"Quicksand-Bold",color:"black",width:130}}>{item.title}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )
        }
      }
      }
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  shadow:{
    shadowColor: "#7f5DF0",
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  text:{
    fontSize:32,
    color:"black",
    fontFamily: "Quicksand-Bold",
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})