import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from '../UserContext';
import axios from "axios"
import { useNavigation } from '@react-navigation/native';
import { Buffer } from 'buffer';



const AddressScreen = () => {
  const navigation=useNavigation();
  const [addedAddress, setAddedAddress] = useState(false);
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  setUserId("65888d264f4043dae8abf341")


const addingAddress=()=>{
  setAddedAddress(true);
  setTimeout(() => {
    setAddedAddress(false)
  },1000);
}
const handleAddress = async () => {
  const address = {
    name,
    mobileNo,
    houseNo,
    street,
    landmark,
    postalCode
  };

  try {
    const authToken = await AsyncStorage.getItem("authToken");
    const response = await axios.post(
      "http://192.168.29.163:5000/user/addresses",
      { userId, address },
      {
        headers: {
          Authorization: `Bearer ${authToken}` // Send the token in the headers for authentication
        }
      }
    );

    Alert.alert("Success", "Address added successfully");
    setName("");
    setMobileNo("");
    setHouseNo("");
    setStreet("");
    setLandmark("");
    setPostalCode("");

    setTimeout(() => {
      navigation.goBack();
    }, 500);
  } catch (error) {
    Alert.alert("Error", "Failed to add address");
    console.log("error", error);
  }
};




  return (
    <ScrollView style={{marginTop:50}}>
      <View style={{height:50,backgroundColor:"#00CED1"}} />
     <View style={{padding:10}}>
       <Text style={{fontSize:17,fontWeight:"bold"}}>Add a new Address</Text>
        
        <TextInput
        
        placeholderTextColor={"black"} placeholder='India' style={{
          padding:10,
          borderColor:"#D0D0D0",
          borderWidth:1,
          marginTop:10,
          borderRadius:5,
        }} />
     
     <View style={{marginVertical:10}}>
     <Text style={{fontSize:15,fontWeight:"bold"}}>Full name (first and last name)</Text>
     <TextInput 
     value={name}
     onChangeText={(text)=>setName(text)}
     placeholderTextColor={"black"}
     style={{
      padding:10,
      borderColor:"#D0D0D0",
      borderWidth:1,
      marginTop:10,
      borderRadius:5,
     }}
     placeholder='Enter your name'
     />
     </View>
     <View style={{marginVertical:10}}>
     <Text style={{fontSize:15,fontWeight:"bold"}}>Mobile Number</Text>
     <TextInput 
     value={mobileNo}
     onChangeText={(text)=>setMobileNo(text)}
     placeholderTextColor={"black"}
     style={{
      padding:10,
      borderColor:"#D0D0D0",
      borderWidth:1,
      marginTop:10,
      borderRadius:5,
     }}
     placeholder='Mobile No.'
     />
     </View>
     <View style={{marginVertical:10}}>
     <Text style={{fontSize:15,fontWeight:"bold"}}>Flat,House No,Building,Company</Text>
     <TextInput 
      value={houseNo}
      onChangeText={(text)=>setHouseNo(text)}
     placeholderTextColor={"black"}
     style={{
      padding:10,
      borderColor:"#D0D0D0",
      borderWidth:1,
      marginTop:10,
      borderRadius:5,
     }}
    
     />
     </View>
     <View style={{marginVertical:10}}>
     <Text style={{fontSize:15,fontWeight:"bold"}}>Area,Street,sector,village</Text>
     <TextInput 
     value={street}
     onChangeText={(text)=>setStreet(text)}
     placeholderTextColor={"black"}
     style={{
      padding:10,
      borderColor:"#D0D0D0",
      borderWidth:1,
      marginTop:10,
      borderRadius:5,
     }}
     
     />
     </View>
     <View style={{marginVertical:10}}>
     <Text style={{fontSize:15,fontWeight:"bold"}}>Landmark</Text>
     <TextInput 
     value={landmark}
     onChangeText={(text)=>setLandmark(text)}
     placeholderTextColor={"black"}
     style={{
      padding:10,
      borderColor:"#D0D0D0",
      borderWidth:1,
      marginTop:10,
      borderRadius:5,
     }}
     placeholder='Eg near bhubneswar'
     />
     </View>
     <View style={{marginVertical:10}}>
     <Text style={{fontSize:15,fontWeight:"bold"}}>Pincode</Text>
     <TextInput 
     value={postalCode}
     onChangeText={(text)=>setPostalCode(text)}
     placeholderTextColor={"black"}
     style={{
      padding:10,
      borderColor:"#D0D0D0",
      borderWidth:1,
      marginTop:10,
      borderRadius:5,
     }}
     placeholder='Pincode'
     />
     </View>
 <Pressable
 onPress={handleAddress}
  style={{
    backgroundColor:"#FFC72C",
    padding:19,
    borderRadius:6,
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,
  }}
 >
 {addedAddress ?(
   <Text style={{fontWeight:"600",fontSize:15}}>Added Address</Text>
 ):(
<Text style={{fontWeight:"600",fontSize:15}}>Add Address</Text>
 )}


 </Pressable>

     </View>
    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})