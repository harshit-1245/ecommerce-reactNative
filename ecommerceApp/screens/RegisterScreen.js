import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5,FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import * as Network from "expo-network"


const RegisterScreen = () => {
  const [ipAddress,setIpAddress]=useState(undefined)
  
  const navigation = useNavigation();
  const [data,setData]=useState({})
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

const getIpAddress=async()=>{
  const ip=await Network.getIpAddressAsync();
  setIpAddress(ip);
}
getIpAddress();
  
 const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value
    });
  };

  
  
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!ipAddress) return;

        const response = await fetch(`http://192.168.29.163:5000/user`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error, e.g., show an alert or update state to display error messages
      }
    };

    fetchData();
  }, [ipAddress]);
  
 
  
  
 
  // Data will be logged once the fetch operation is completed and state is updated
  
 
  const handleRegister=()=>{

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Image style={{ width: 150, height: 150 }} source={require('../assets/ecommerceImages/amazon.png')} />
        </View>
    
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: '#041E42' }}>Register For Shopping</Text>
        </View>
     
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <MaterialIcons style={{ marginLeft: 8 }} name="drive-file-rename-outline" size={24} color="black" />
              <TextInput
                style={{ color: 'gray', marginVertical: 10, width: 300, fontSize: 16 }}
                value={user.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder='Enter your Name'
              />
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="black" />
              <TextInput
                style={{ color: 'gray', marginVertical: 10, width: 300, fontSize: 16 }}
                value={user.email}
                onChangeText={(text) => handleChange('email', text)}
                placeholder='Enter your Email'
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <FontAwesome5 style={{ marginLeft: 8 }} name="key" size={24} color="black" />
              <TextInput
                style={{ color: 'gray', marginVertical: 10, width: 300, fontSize: 16 }}
                secureTextEntry={true}
                value={user.password}
                onChangeText={(text) => handleChange('password', text)}
                placeholder='Enter your Password'
              />
                  
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <FontAwesome5 style={{ marginLeft: 8 }} name="key" size={24} color="black" />
              <TextInput
                style={{ color: 'gray', marginVertical: 10, width: 300, fontSize: 16 }}
                secureTextEntry={true}
                value={user.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
                placeholder='Enter your Confirm Password'
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }} />
          <Pressable
           onPress={handleRegister}
          style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Register</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ textAlign: "center", flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 60 }}>
            <Text style={{ color: 'gray', fontSize: 16 }}>Already Registered? </Text>
            <Text style={{ color: '#007FFF', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
          </Pressable>
        </View>
        <View>

</View>



       

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
