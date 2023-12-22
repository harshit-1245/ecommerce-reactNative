import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext';
import axios from "axios"
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const ConfirmationSCreen = () => {
  const [currentStep,setCurrentStep]=useState(0)
  const { userId, setUserId } = useContext(UserType);
 
  const [addresses,setAddresses]=useState([]);
 
  setUserId("6579b6c6705225971ae2e118")
  const steps = [
    {
      title : "Address",content:"Address Form"
    },
    {
      title : "Delivery",content:"Delivery options"
    },
    {
      title : "Payment",content:"Payment Details"
    },
    {
      title : "Place Order",content:"Order Summary"
    },

  ]
  const [selectedAddress,setSelectedAddress]=useState("")
  const [options,setOptions]=useState(false)

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
    <ScrollView style={{marginTop:55}}>
      <View style={{flex:1,paddingHorizontal:20,paddingTop:40}}>
        <View style={{flexDirection:"row",alignItems:"center",marginBottom:20,justifyContent:"space-between"}}>
           {steps?.map((step,index)=>(
            <View key={index} style={{justifyContent:"center",alignItems:"center"}}>
              {
                index > 0 && (
                  <View style={[{flex:1,height:2,backgroundColor:"green"},index<=currentStep && {backgroundColor:"green"}]}/>
                )
              }
              <View style={[{width:30,height:30,borderRadius:15,backgroundColor:"#ccc",justifyContent:"center",alignItems:"center"},index < currentStep && {backgroundColor:"green"}]}>
                {index < currentStep ?(
                <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>&#10003;</Text>
                ):(
                  <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>{index+1}</Text>
                )}
              </View>
              <Text style={{textAlign:"center",marginTop:8}}>{step.title}</Text>
            </View>
           ))}
        </View>
      </View>
      {currentStep == 0 && (
        <View style={{marginHorizontal:20}}>
          <Text style={{fontSize:16,fontWeight:"bold"}}>Select Delivery Address</Text>
          <Pressable>
             {addresses?.map((item,index)=>(
              <Pressable style={{borderWidth:1,borderColor:"#D0D0D0",padding:10,flexDirection:"row",alignItems:"center",gap:5,paddingBottom:17,marginVertical:7}} key={index}>
                {/* great logic here */}
                {selectedAddress && selectedAddress._id === item._id ?(
             <FontAwesome5 name="dot-circle" size={24} color="black" />
                ):(
                  <Entypo onPress={()=>setSelectedAddress(item)} name="circle" size={24} color="black" />
                
                )}
                 
                 <View style={{marginLeft:6}}>
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
                    <View>
                       {selectedAddress && selectedAddress?._id === item?._id && (
                        <Pressable 
                         onPress={()=>setCurrentStep(1)}
                        style={{
                          backgroundColor:"#008397",
                          padding:10,
                          borderRadius:20,
                          justifyContent:"center",
                          alignItems:"center",
                          marginTop:10
                        }}>
                          <Text style={{fontSize:15,fontWeight:"bold",color:"white"}}>Deliver to this address</Text>
                        </Pressable>
                       )}
                    </View>
                 </View>
              </Pressable>
             ))}
          </Pressable>
        </View>
      )}

  {currentStep ==1 && (
    <View style={{marginHorizontal:20}}>
      <Text style={{fontSize:20,fontWeight:"bold"}}>Choose the delivery options</Text>

      <View style={{flexDirection:"row",alignItems:"center",backgroundColor:"white",padding:8,gap:7,borderColor:"#D0D0D0",borderWidth:1,marginTop:10}}>
        {options ? (
        <FontAwesome5 onPress={()=>setOptions(!options)} name="dot-circle" size={24} color="#008397" />
        ):(
          <Entypo onPress={()=>setOptions(!options)} name="circle" size={24} color="black" />
        )}
     

      <Text style={{flex:1}}>
        <Text style={{color:"green",fontWeight:"500"}}>Tommorow by 10pm</Text>{" "}
        -Free delivery with your prime membership
      </Text>
      </View>
      <Pressable  
       onPress={()=>setCurrentStep(2)}
      style={{backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginTop:15}}>
        <Text style={{fontSize:18,fontWeight:"bold"}}>Continue</Text>
      </Pressable>
    </View>
  )}
        
    </ScrollView>
  )
}

export default ConfirmationSCreen