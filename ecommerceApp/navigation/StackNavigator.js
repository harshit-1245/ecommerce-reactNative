import { StyleSheet, Text, View} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from "../screens/RegisterScreen"
import HomeScreen from '../screens/HomeScreen'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons';
import ProductScreen from '../screens/ProductScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfirmationScreen from '../screens/ConfirmationSCreen';
import OrderScreen from '../screens/OrderScreen';


//--------------------> more like react routing
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab=createBottomTabNavigator();
  const BottomTabs=()=>{
    return(
      <Tab.Navigator>
        <Tab.Screen 
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel:"Home",
          tabBarLabelStyle:{color:"#008E97"},
          headerShown:false,
          tabBarIcon:({focused})=>
          focused ? (
            <Entypo name="home" size={24} color="#008E97" />
          ):(
            <AntDesign name="home" size={24} color="black" />
          )
        }}
        />
{/* for profile */}
{/* basically you move towars screens if you click on icons */}
<Tab.Screen 
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel:"Profile",
          tabBarLabelStyle:{color:"#008E97"},
          headerShown:false,
          tabBarIcon:({focused})=>
          focused ? (
            <Ionicons name="person" size={24} color="#008E97" />
          ):(
            <Ionicons name="person-outline" size={24} color="black" />
          )
        }}
        />
   {/* for cart */}
<Tab.Screen 
        name='Cart'
        component={CartScreen}
        options={{
          tabBarLabel:"Cart",
          tabBarLabelStyle:{color:"#008E97"},
          headerShown:false,
          tabBarIcon:({focused})=>
          focused ? (
            <AntDesign name="shoppingcart" size={24} color="#008E97" />
          ):(
            <AntDesign name="shoppingcart" size={24} color="black" />
          )
        }}
        />

      </Tab.Navigator>
    )
  }

  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}} />
        <Stack.Screen name='Info' component={ProductScreen}  options={{headerShown:false}}/>
        <Stack.Screen name='Address' component={AddAddressScreen} options={{headerShown:false}} />
        <Stack.Screen name='Add' component={AddressScreen}  options={{headerShown:false}}/>
        <Stack.Screen name='Confirm' component={ConfirmationScreen}  options={{headerShown:false}}/>
        <Stack.Screen name='Order' component={OrderScreen}  options={{headerShown:false}}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})