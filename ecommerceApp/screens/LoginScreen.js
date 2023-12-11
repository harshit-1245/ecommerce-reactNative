import { StyleSheet, Text, View,SafeAreaView,Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons'; 
import {useNavigation} from "@react-navigation/native"

import React, { useState } from 'react'

const LoginScreen = () => {
  const navigation=useNavigation()
const [user,setUser]=useState({
  email:'',
  password:'',
})

const handleChange=(key,value)=>{
    setUser({...user,
    [key]:value
    });
}

  return (
    <>
    <SafeAreaView style={{flex:1 ,backgroundColor:"white",alignItems:"center"}}>
      <View style={{alignItems:'center'}}>
       
        <Image
        style={{width:150,height:150}}
        source={require('../assets/ecommerceImages/amazon.png')} //it is method of handling image
        />
      </View>
      <View>
            <Text style={{fontSize:17,fontWeight:"bold",marginTop:12,color:'#041E42'}}>Log In to your account</Text>
           </View>
      <KeyboardAvoidingView> 
           
           <View style={{marginTop:70}}>
            <View style={{flexDirection:"row",alignItems:'center',gap:5,backgroundColor:'#D0D0D0',paddingVertical:5,borderRadius:5,marginTop:30}}>
            <MaterialIcons style={{marginLeft:8}} name="email" size={24} color="black" />
           <TextInput
            style={{color:'gray',marginVertical:10,width:300,fontSize:user.email ? 16:16}}
            
            value={user.email}
            onChange={(text)=>handleChange('email',text)}
           placeholder='Enter your Email'/>
            </View>
            </View>
         <View style={{marginTop:10}}>
         <View style={{flexDirection:"row",alignItems:'center',gap:5,backgroundColor:'#D0D0D0',paddingVertical:5,borderRadius:5,marginTop:30}}>
         <FontAwesome5 style={{marginLeft:8}} name="key" size={24} color="black" />
           <TextInput
            style={{color:'gray',marginVertical:10,width:300,fontSize:user.password?16:16}}
            secureTextEntry={true}
            value={user.password}
            onChange={(text)=>handleChange('password',text)}
           placeholder='Enter your Password'/>
            </View>
         </View>

         <View style={{marginTop:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <Text>Keep me logged in</Text>
          <Text style={{color:'#007FFF',fontWeight:"500"}}>Forgot password</Text>
         </View>

         <View style={{marginTop:80}}/>
            
         <Pressable style={{width:200,backgroundColor:'#FEBE10',borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15}}>
               <Text style={{textAlign:"center",color:"white",fontSize:16,fontWeight:"bold"}}>Login</Text>
         </Pressable>

         <Pressable
              onPress={()=>navigation.navigate("Register")}
              style={{textAlign:"center",flexDirection: 'row', alignItems: 'center', marginTop: 15,marginLeft:60 }}>
  <Text style={{ color: 'gray', fontSize: 16 }}>Don't have an account? </Text>
  <Text style={{ color: '#007FFF', fontSize: 16, fontWeight: 'bold' }}>Sign Up</Text>
</Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  )
  }
export default LoginScreen

