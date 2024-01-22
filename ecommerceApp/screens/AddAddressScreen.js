import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import commonStyles from '../styling/AddAddressStyling/AddAddressUI';
import { UserType } from '../UserContext';

const AddAddressScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://192.168.29.163:7000/user/${userId}`);
        const data = await response.json();

        SetUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  console.log(userId);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`http://192.168.29.163:5000/user/address/${userId}`);
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // Using useFocus so it updates so much faster, when we navigate back it refreshes back

  useFocusEffect(
    useCallback(() => {
      fetchAddress();
    }, [])
  );

  const renderAddressItem = ({ item }) => (
    <Pressable style={commonStyles.addressItem}>
      <View style={commonStyles.addressHeader}>
        <Text style={commonStyles.addressText}>{item?.name}</Text>
        <Entypo name="location-pin" size={24} color="red" />
      </View>
      <Text style={{ fontSize: 15, color: '#181818' }}>{item?.houseNo},{item?.landmark}</Text>
      <Text style={{ fontSize: 15, color: '#181818' }}>{item?.street}</Text>
      <Text style={{ fontSize: 15, color: '#181818' }}>India, Varanasi</Text>
      <Text style={{ fontSize: 15, color: '#181818' }}>{item?.mobileNo}</Text>
      <Text style={{ fontSize: 15, color: '#181818' }}>{item?.postalCode}</Text>

      <View style={commonStyles.actionsContainer}>
        <Pressable style={commonStyles.actionButton}>
          <Text>Edit</Text>
        </Pressable>
        <Pressable style={commonStyles.actionButton}>
          <Text>Remove</Text>
        </Pressable>
        <Pressable style={commonStyles.actionButton}>
          <Text>Set as default</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={addresses}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderAddressItem}
      ListHeaderComponent={() => (
        <>
          <View style={commonStyles.searchBarContainer}>
            <Pressable style={commonStyles.searchInputContainer}>
              <Feather style={commonStyles.searchBarIcon} name="search" size={22} color="black" />
              <TextInput placeholder="Search Products" />
            </Pressable>
            <Feather name="mic" style={commonStyles.micIcon} />
          </View>

          <View style={commonStyles.addressContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Address</Text>
            <Pressable onPress={() => navigation.navigate('Add')} style={commonStyles.addAddressButton}>
              <Text>Add a new Address</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </Pressable>
          </View>
        </>
      )}
    />
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
