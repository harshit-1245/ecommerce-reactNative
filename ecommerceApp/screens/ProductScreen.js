import { View, Text, ScrollView, Pressable, TextInput, Dimensions, ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import {useDispatch} from "react-redux"
import {addToCart} from "../redux/CartReducer"
import {useSelector} from "react-redux"

const ProductScreen = () => {
  const dispatch=useDispatch();
  const [addedToCart,setAddedToCart]=useState(false);
  const route=useRoute();
  const {width}=Dimensions.get("window")
  const navigation=useNavigation()
  const height=(width * 100)/100;

   const addItemToCart=(item)=>{
     setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(()=>{
         setAddedToCart(false)
        },6000)
   }
   const cart=useSelector((state)=>state.cart.cart)
   console.log(cart)


  return (
   <ScrollView style={{marginTop:55,flex:1,backgroundColor:"white"}} showsVerticalScrollIndicator={false} >
     <View style={{backgroundColor:"#00CED1",padding:10,flexDirection:"row",alignItems:"center"}}>
          <Pressable style={{flexDirection:"row",alignItems:"center",marginHorizontal:7,gap:10,backgroundColor:"white",borderRadius:3,height:38,flex:1}}>
          <Feather style={{paddingLeft:10}} name="search" size={22} color="black" />
          <TextInput placeholder='Search Products'/>
          </Pressable>
          <Feather name="mic" size={24} color="black" />

        </View>
        {/*  */}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {route.params.carouseImages.map((item,index)=>(
          <ImageBackground style={{width,height,marginTop:25,resizeMode:"contain"}}
           source={{uri:item}}
           key={index}
          >
          <View
              style={{
                width:"103%",
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                 
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View >
            {/* Heart */}
            <View  style={{
                  width: 40,
                  height: 40,
                 
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop:"auto",
                  marginLeft:10,
                  marginBottom:20,
                }}>
            <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
        </ScrollView>
        {/* information of a product */}
        <View style={{padding:10}}>
          <Text style={{fontSize:15,fontWeight:"500"}}>{route?.params?.title}</Text>
          <Text style={{fontWeight:"600",fontSize:18,marginTop:6}}>&#8377;{route?.params?.price}</Text>
        </View>
        {/* border part */}
        <Text style={{height:1,borderColor:"#D0D0D0",borderWidth:1}} />
          
       <View style={{flexDirection:"row",alignItems:"center",padding:10}}>
        <Text>Color:</Text>
        <Text style={{fontSize:15,fontWeight:"bold"}}>{route?.params?.color}</Text>

       </View>

        <View style={{flexDirection:"row",alignItems:"center",padding:10}}>
          <Text>Size:</Text>
          <Text style={{fontSize:15,fontWeight:"bold"}}>{route?.params?.size}</Text>

        </View>

        <Text style={{height:1,borderColor:"#D0D0D0",borderWidth:1}} />

        <View style={{padding:10}}>
         <Text  style={{fontSize:15,fontWeight:"bold",marginVertical:5}}>Total: &#8377;{route?.params?.price}</Text>
         <Text style={{color:"#00CED1"}}>Free delivery by 3PM.Order within 10hrs 30mins</Text>
         <View style={{flexDirection:"row",marginVertical:5,alignItems:"center",gap:5}}>
        <EvilIcons name="location" size={24} color="black" />
        <Text style={{fontSize:15,fontWeight:"500"}}>Deliver To Harshit - Varansi 232103</Text>
        </View>
        </View>
      
       <Text style={{color:"green",marginHorizontal:10,fontWeight:"500"}}>IN Stock</Text>
       <Pressable 
       onPress={()=>addItemToCart(route?.params?.item)}
       style={{backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginHorizontal:10,marginVertical:10}}>

        {addedToCart ?(
             <Text style={{fontWeight:"500"}}>Added to Cart</Text>
        ):(
          <Text style={{fontWeight:"500"}}>Add to Cart</Text>
        )}
         
       </Pressable>
        
        <Pressable style={{backgroundColor:"#FFAC1C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginHorizontal:10,marginVertical:10}}>
          <Text style={{fontWeight:"500"}}>Buy Now</Text>
        </Pressable>
   </ScrollView>
  )
}

export default ProductScreen