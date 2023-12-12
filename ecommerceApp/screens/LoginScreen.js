import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios"

const LoginScreen = () => {
  const [data,setData]=useState([])
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value
    });
  };

  const getApi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user');
      setData(response.data)
      console.log(response.data);
     
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  };

 getApi()
  
 

  const handleLogin=()=>{
    
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ width: 150, height: 150 }}
            source={require('../assets/ecommerceImages/amazon.png')}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: '#041E42' }}>Log In to your account</Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ marginTop: 70 }}>
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
          <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text>Keep me logged in</Text>
            <Text style={{ color: '#007FFF', fontWeight: "500" }}>Forgot password</Text>
          </View>
          <View style={{ marginTop: 80 }} />
          <Pressable
          onPress={handleLogin}
           style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ textAlign: "center", flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 60 }}>
            <Text style={{ color: 'gray', fontSize: 16 }}>Don't have an account? </Text>
            <Text style={{ color: '#007FFF', fontSize: 16, fontWeight: 'bold' }}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
