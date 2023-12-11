import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native'

import React from 'react'

const LoginScreen = () => {
  return (
    <SafeAreaView style={{flex:1 ,backgroundColor:"white",alignItems:"center"}}>
      <View>
        
        <Image
        style={{width:150,height:150}}
        source={{
          uri: '../assets/ecommerceImages/amazon.png',
        }}
        />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

