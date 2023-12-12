import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { MaterialIcons, FontAwesome5,FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setConfirmPassword]=useState(false)



  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value
    });
  };

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
                value={user.firstname}
                onChangeText={(text) => handleChange('firstname', text)}
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
          <Pressable style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Register</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ textAlign: "center", flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 60 }}>
            <Text style={{ color: 'gray', fontSize: 16 }}>Already Registered? </Text>
            <Text style={{ color: '#007FFF', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
