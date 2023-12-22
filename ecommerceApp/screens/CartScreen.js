import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector,useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import {decrementQuantity, incrementQuantity, removeFromCart} from "../redux/CartReducer"
import {useNavigation} from "@react-navigation/native"


const CartScreen = () => {
  const navigator = useNavigation()
  const dispatch=useDispatch()
  const cart = useSelector((state) => state.cart.cart);
console.log("hii");
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

 const increaseQuantity=(item)=>{
   dispatch(incrementQuantity(item))
 }

 const decreaseQuantity=(item)=>{
  dispatch(decrementQuantity(item))
 }

 const deleteQuantity=(item)=>{
  dispatch(removeFromCart(item))
 }


  return (
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: 'white' }}>
      <View style={{ backgroundColor: '#00CED1', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <Feather style={{ paddingLeft: 10 }} name="search" size={22} color="black" />
          <TextInput placeholder="Search Products" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '400' }}>Subtotal:</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

      <Pressable
      onPress={()=>navigator.navigate("Confirm")}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Proceed to buy ({cart.length}) items</Text>
      </Pressable>

      {/* Divide line */}
      <View style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 16 }} />

      {/* Cart items */}
      <View style={{ marginHorizontal: 10 }}>
       
        {cart?.map((item, index) => (
          <View style={{ backgroundColor: 'white', marginVertical: 10, padding: 10,gap:10 }} key={index}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: 100, height: 100, resizeMode: 'contain', marginRight: 10 }} source={{ uri: item?.image }} />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>
                  {item?.title}
                </Text>
                <Text numberOfLines={2} style={{ fontSize: 14, marginBottom: 8, color: 'grey' }}>
                  {item?.description}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>{item?.price}</Text>
                  <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5 }} source={{ uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png' }} />
                  <Text style={{ color: 'green' }}>In Stock</Text>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 8 }}>{item?.rating?.rate}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 
        
                  {/* Quantity adjustment */}
                  <Pressable 
                  onPress={()=>decreaseQuantity(item)}
                  style={{ backgroundColor: '#4CAF50', padding: 8, borderRadius: 5, marginRight: 10 }}>
                    <AntDesign name="minus" size={20} color="white" />
                  </Pressable>
                  <Text style={{ fontSize: 16, marginRight: 10 }}>{item?.quantity}</Text>
                  <Pressable 
                   onPress={()=>increaseQuantity(item)} //calling from redux
                  style={{ backgroundColor: '#4CAF50', padding: 8, borderRadius: 5 }}>
                    <AntDesign name="plus" size={20} color="white" />
                  </Pressable>
                   {/* Delete button */}
                   <View style={{padding:10}}>
                   <Pressable 
                   onPress={()=>deleteQuantity(item)}
                   style={{ backgroundColor: 'black', padding: 8, borderRadius: 5, marginRight: 10 }}>
                    <Text style={{color:"white"}}>Delete</Text>
                  </Pressable>
                  </View>
                </View>
              </View>
            </Pressable>
            {/* later on section */}
           <Pressable style={{flexDirection:"row",alignItems:"center",gap:10,marginBottom:15}}>
            <Pressable
            style={{backgroundColor:"white",paddingHorizontal:8,paddingVertical:10,borderRadius:5,borderColor:"#C0C0C0",borderWidth:0.6}}
            >
              <Text>Save For Later</Text>
            </Pressable>
            <Pressable
            style={{backgroundColor:"white",paddingHorizontal:8,paddingVertical:10,borderRadius:5,borderColor:"#C0C0C0",borderWidth:0.6}}
            >
              <Text>See more like this</Text>
            </Pressable>
            </Pressable>
          </View>
      
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
