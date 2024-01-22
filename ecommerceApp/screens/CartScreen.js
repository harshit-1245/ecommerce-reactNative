import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector,useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import {decrementQuantity, incrementQuantity, removeFromCart} from "../redux/CartReducer"
import {useNavigation} from "@react-navigation/native"
import { cartItemStyles, cartScreenStyles } from '../styling/cartStyling/CartStyling';


const CartScreen = () => {
  const navigator = useNavigation()
  const dispatch=useDispatch()
  const cart = useSelector((state) => state.cart.cart);

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
    <ScrollView style={cartScreenStyles.container}>
      <View style={cartScreenStyles.searchBarContainer}>
        <Pressable style={cartScreenStyles.searchInputContainer}>
          <Feather style={cartScreenStyles.searchBarIcon} name="search" size={22} color="black" />
          <TextInput placeholder="Search Products" />
        </Pressable>
        <Feather style={cartScreenStyles.micIcon} name="mic" size={24} color="black" />
      </View>
      <View style={cartScreenStyles.subtotalContainer}>
        <Text style={cartScreenStyles.subtotalText}>Subtotal:</Text>
        <Text style={cartScreenStyles.subtotalValue}>{total}</Text>
      </View>
      <Text style={cartScreenStyles.emiText}>EMI details Available</Text>

      <Pressable onPress={() => navigator.navigate("Confirm")} style={cartScreenStyles.proceedButton}>
        <Text style={cartScreenStyles.proceedButtonText}>Proceed to buy ({cart.length}) items</Text>
      </Pressable>

      <View style={cartScreenStyles.divideLine} />

      <View style={cartScreenStyles.cartItemContainer}>
        {cart?.map((item, index) => (
          <View style={cartItemStyles.container} key={index}>
            <Pressable style={cartItemStyles.itemContainer}>
              <Image style={cartItemStyles.image} source={{ uri: item?.image }} />
              <View style={cartItemStyles.detailsContainer}>
                <Text numberOfLines={1} style={cartItemStyles.title}>
                  {item?.title}
                </Text>
                <Text numberOfLines={2} style={cartItemStyles.description}>
                  {item?.description}
                </Text>
                <View style={cartItemStyles.priceContainer}>
                  <Text style={cartItemStyles.price}>{item?.price}</Text>
                  <Image style={cartItemStyles.stockIcon} source={{ uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png' }} />
                  <Text style={cartItemStyles.inStock}>In Stock</Text>
                </View>
                <Text style={cartItemStyles.rating}>{item?.rating?.rate}</Text>
                <View style={cartItemStyles.quantityContainer}>
                  <Pressable onPress={() => decreaseQuantity(item)} style={cartItemStyles.quantityAdjustmentButton}>
                    <AntDesign name="minus" size={20} color="white" />
                  </Pressable>
                  <Text style={cartItemStyles.quantityText}>{item?.quantity}</Text>
                  <Pressable onPress={() => increaseQuantity(item)} style={cartItemStyles.quantityAdjustmentButton}>
                    <AntDesign name="plus" size={20} color="white" />
                  </Pressable>
                  <View style={cartItemStyles.deleteButtonContainer}>
                    <Pressable onPress={() => deleteQuantity(item)} style={cartItemStyles.deleteButton}>
                      <Text style={cartItemStyles.deleteButtonText}>Delete</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable style={cartItemStyles.laterOnSectionContainer}>
              <Pressable style={cartItemStyles.saveForLaterButton}>
                <Text style={cartItemStyles.laterButtonText}>Save For Later</Text>
              </Pressable>
              <Pressable style={cartItemStyles.seeMoreButton}>
                <Text style={cartItemStyles.laterButtonText}>See more like this</Text>
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
