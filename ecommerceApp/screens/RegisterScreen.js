import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Network from 'expo-network';
import axios from "axios"

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const user = {
        name: name,
        email: email,
        password: password,
        // Add a field for confirm password here if needed
      };
   
  
      const response = await axios.post('http://192.168.77.201:5000/user/register', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        console.log(response.data);
        alert('Registration successful. You have been registered successfully.');
        setName('');
        setEmail('');
        setPassword('');
      } 
     Alert.alert('Registration successful. You have been registered successfully.');
    } catch (error) {
      Alert.alert('Registration Error: ' + error.message);
      
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: 'center' }}>
        <Image
          style={{marginTop:50, width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
        </View>

        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#041E42' }}>
            Register For Shopping
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name='drive-file-rename-outline'
                size={24}
                color='black'
              />
              <TextInput
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder='Enter your Name'
              />
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name='email'
                size={24}
                color='black'
              />
              <TextInput
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='Enter your Email'
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <FontAwesome5
                style={{ marginLeft: 8 }}
                name='key'
                size={24}
                color='black'
              />
              <TextInput
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder='Enter your Password'
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <FontAwesome5
                style={{ marginLeft: 8 }}
                name='key'
                size={24}
                color='black'
              />
              <TextInput
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder='Enter your Confirm Password'
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }} />
          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: '#FEBE10',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={{
              textAlign: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              marginLeft: 60,
            }}
          >
            <Text style={{ color: 'gray', fontSize: 16 }}>
              Already Registered?{' '}
            </Text>
            <Text style={{ color: '#007FFF', fontSize: 16, fontWeight: 'bold' }}>
              Login
            </Text>
          </Pressable>
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
