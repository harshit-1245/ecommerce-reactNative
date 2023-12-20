import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState,useContext, useId } from 'react'
import {Feather} from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import axios from "axios"
import { UserType } from '../UserContext';


const AddAddressScreen = () => {
  const { userId, setUserId } = useContext(UserType);
    const navigation=useNavigation();
    const [addresses,setAddresses]=useState([]);
   
    setUserId("6579b6c6705225971ae2e118")
  
    const fetchAddress=async()=>{
      try {
         const response=await axios.get(`http://192.168.77.201:5000/user/address/${userId}`)
          const {addresses} = response.data;

          setAddresses(addresses)
      } catch (error) { 
        console.error(error)
      }
    }
  useEffect(()=>{
    fetchAddress()
  },[])

 

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:50}}>
      <View style={{backgroundColor:"#00CED1",padding:10,flexDirection:"row",alignItems:"center"}}>
          <Pressable style={{flexDirection:"row",alignItems:"center",marginHorizontal:7,gap:10,backgroundColor:"white",borderRadius:3,height:38,flex:1}}>
          <Feather style={{paddingLeft:10}} name="search" size={22} color="black" />
          <TextInput placeholder='Search Products'/>
          </Pressable>
          <Feather name="mic" size={24} color="black" />
     </View>

       <View style={{padding:10}}>
              <Text style={{fontSize:20,fontWeight:"bold"}}>Your Address</Text>
              <Pressable 
              onPress={()=>navigation.navigate("Add")}
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between",
                    marginTop:10,
                    borderColor:"#D0D0D0",
                    borderWidth:1,
                    borderLeftWidth:0,
                    borderRightWidth:0,
                    paddingVertical:7,
                    paddingHorizontal:5
                }}
              >
                <Text>Add a new Address</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </Pressable>

               <Pressable>
                {/* adding address */}
                 {addresses?.map((item,index)=>(
                  <Pressable key={index}
                  style={{borderWidth:1,borderColor:"#D0D0D0",padding:10,flexDirection:"column",gap:5,marginVertical:5}}
                  >
                    <View style={{flexDirection:"row",alignItems:"center",gap:3}}>
                      <Text style={{fontSize:15,fontWeight:"bold"}}>{item?.name}</Text>
                      <Entypo name="location-pin" size={24} color="redng bh h" />
                    </View>
                    <Text style={{fontSize:15,color:"#181818"}}>{item?.houseNo},{item?.landmark}</Text>
                    <Text style={{fontSize:15,color:"#181818"}}>{item?.street}</Text>
                    <Text style={{fontSize:15,color:"#181818"}}>India,Varanasi</Text>
                    <Text style={{fontSize:15,color:"#181818"}}>{item?.mobileNo}</Text>
                    <Text style={{fontSize:15,color:"#181818"}}>{item?.postalCode}</Text>

                    <View style={{flexDirection:"row",alignItems:"center",gap:10,marginTop:7}}>
                      <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0",alignItems:"center"}}>
                             <Text>Edit</Text>
                      </Pressable>
                      <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0",alignItems:"center"}}>
                             <Text>Remove</Text>
                      </Pressable>
                      <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0",alignItems:"center"}}>
                             <Text>Set as default</Text>
                      </Pressable>
                    </View>

                  </Pressable>
                 ))}
               </Pressable>

       </View>
    </ScrollView>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({})