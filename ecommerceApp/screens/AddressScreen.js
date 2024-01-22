import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from '../UserContext';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { UIStyles } from '../styling/addingAddress/AddingAddress';

const AddressScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAddress = async (data) => {
    const address = {
      name: data.name,
      mobileNo: data.mobileNo,
      houseNo: data.houseNo,
      street: data.street,
      landmark: data.landmark,
      postalCode: data.postalCode,
    };

    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        "http://192.168.29.163:5000/user/addresses",
        { userId, address },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      Alert.alert("Success", "Address added successfully");
      setValue('name', '');
      setValue('mobileNo', '');
      setValue('houseNo', '');
      setValue('street', '');
      setValue('landmark', '');
      setValue('postalCode', '');

      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      Alert.alert("Error", "Failed to add address");
      console.log("error", error);
    }
  };

  return (
    <ScrollView style={UIStyles.scrollView}>
      <View style={UIStyles.sectionHeader} />
      <View style={UIStyles.formContainer}>
        <Text style={UIStyles.sectionTitle}>Add a new Address</Text>

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              placeholderTextColor={'black'}
              placeholder="India"
              style={UIStyles.inputField}
              {...field}
              editable={false} // Make it uneditable
            />
          )}
          name="country"
          defaultValue="India" // Set default value to "India"
        />

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholderTextColor={'black'}
              style={UIStyles.inputField}
              placeholder="Enter your name"
            />
          )}
          name="name"
          rules={{ required: 'Name is required' }}
        />
        {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholderTextColor={'black'}
              style={UIStyles.inputField}
              placeholder="Mobile No."
            />
          )}
          name="mobileNo"
          rules={{ required: 'Mobile No. is required' }}
        />
        {errors.mobileNo && <Text style={{ color: 'red' }}>{errors.mobileNo.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholderTextColor={'black'}
              style={UIStyles.inputField}
              placeholder="Flat,House No,Building,Company"
            />
          )}
          name="houseNo"
          rules={{ required: 'House No. is required' }}
        />
        {errors.houseNo && <Text style={{ color: 'red' }}>{errors.houseNo.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholderTextColor={'black'}
              style={UIStyles.inputField}
              placeholder="Area,Street,sector,village"
            />
          )}
          name="street"
          rules={{ required: 'Street is required' }}
        />
        {errors.street && <Text style={{ color: 'red' }}>{errors.street.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholderTextColor={'black'}
              style={UIStyles.inputField}
              placeholder="Landmark (Eg near bhubneswar)"
            />
          )}
          name="landmark"
          rules={{ required: 'Landmark is required' }}
        />
        {errors.landmark && <Text style={{ color: 'red' }}>{errors.landmark.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholderTextColor={'black'}
              style={UIStyles.inputField}
              placeholder="Pincode"
            />
          )}
          name="postalCode"
          rules={{ required: 'Pincode is required' }}
        />
        {errors.postalCode && <Text style={{ color: 'red' }}>{errors.postalCode.message}</Text>}

        <Pressable onPress={handleSubmit(handleAddress)} style={UIStyles.submitButtonContainer}>
          <Text style={UIStyles.submitButtonText}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default AddressScreen;

const styles = StyleSheet.create({});
