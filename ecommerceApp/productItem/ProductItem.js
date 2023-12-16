import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import {addToCart} from "../redux/CartReducer"

const ProductItem = ({item}) => {
  const dispatch=useDispatch();
  const [addedToCart,setAddedToCart]=useState(false)

  const addItemToCart=(item)=>{
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000);
  }

  return (
   
      <Pressable style={{marginHorizontal:20,marginVertical:25}}>
        <Image style={{width:150,height:150,resizeMode:"contain"}} source={{uri:item?.image}} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 150, marginTop: 10 }}>
  {item?.title}
</Text>
  <View style={{marginTop:5,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
  <Text style={{fontSize:15,fontWeight:"bold"}}>&#8377;{item?.price}</Text>
  <Text style={{color:"#FFC72C",fontWeight:"bold"}}>{item?.rating?.rate} ratings</Text>
  </View>

  <Pressable 
  onPress={()=>addItemToCart(item)}
  style={{backgroundColor:"#FFC72C",
   padding:10,
   borderRadius:20,
   justifyContent:"center",
   alignItems:"center",
   marginHorizontal:10,
}}>
     {addedToCart ?(
        <Text style={{fontWeight:"bold"}}>Added To Cart</Text>
     ):(
      <Text style={{fontWeight:"bold"}}>Add To Cart</Text>
     )}

     
  </Pressable>
  
      </Pressable>
 
  )
}

export default ProductItem