import { View, Text, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {SliderBox} from "react-native-image-slider-box"
import ProductItem from "../productItem/ProductItem"
import { list } from '../Products/list';
import {images} from "../Products/imagesForSlide"
import {deals} from "../Products/deals"
import {offers} from "../Products/offers"
import axios from "axios"
import DropDownPicker from "react-native-dropdown-picker"
import { useNavigation } from "@react-navigation/native";
import {useSelector} from "react-redux"
import {BottomModal, ModalContent, SlideAnimation} from "react-native-modals"
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { UserType } from '../UserContext';





const HomeScreen = () => {
  const {userId,setUserId}=useContext(UserType)
  const navigation=useNavigation()
  const [open,setOpen]=useState(false);
  const [category,setCategory]=useState("jwelery")
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const [filter,setFilter]=useState([])
  

  const [products, setProducts] = useState([]);

  const [modalVisible,setModelVisible]=useState(false)

  useEffect(()=>{
    const fetchApi=async()=>{
      try {
        const response=await axios.get('https://fakestoreapi.com/products');
         setProducts(response.data);
         setFilter(response.data)
      } catch (error) {
        console.error(error)
      }
     
    }
    fetchApi();
  },[])





  const filterProduct=(cat)=>{
    const updateList=products.filter((x)=>x.category === cat);
    setFilter(updateList);
  }
  

const onGenderOpen= useCallback(()=>{
   setOpen(!open)
},[])
 //using useSelector
 const cart=useSelector((state)=>state.cart.cart)
 

const pickerStyle = {
  borderColor: "#B7B7B7",
  height: 30,
};

// Conditionally apply marginBottom based on the 'open' state
if (open) {
  pickerStyle.marginBottom = 50;
} else {
  pickerStyle.marginBottom = 15;
}






  return (

    <>
    <SafeAreaView style={{paddingTop:Platform.OS === 'android' ? 40 :0,flex:1,backgroundColor:"white"}} >
      <ScrollView>
        {/* This is search bar in top side */}
        <View style={{backgroundColor:"#00CED1",padding:10,flexDirection:"row",alignItems:"center"}}>
          <Pressable style={{flexDirection:"row",alignItems:"center",marginHorizontal:7,gap:10,backgroundColor:"white",borderRadius:3,height:38,flex:1}}>
          <Feather style={{paddingLeft:10}} name="search" size={22} color="black" />
          <TextInput placeholder='Search Products'/>
          </Pressable>
          <Feather name="mic" size={24} color="black" />

        </View>
        {/* Address part in here */}
        <Pressable 
         onPress={()=>setModelVisible(!modalVisible)}
        style={{flexDirection:"row",alignItems:"center",gap:5,padding:10,backgroundColor:"#AFEEEE"}}>
        <EvilIcons name="location" size={24} color="black" />
        <Pressable>
          <Text style={{fontSize:13,fontWeight:"500"}}>Deliver to Harshit -Varansi 232103</Text>
        </Pressable>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Pressable>
        {/* scroll categories width scroll horizontally */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection:"row"}}>
        {list.map((item)=>(
       
          <Pressable key={item.id}>
          <Image style={{margin:10,width:50,height:50,resizeMode:"contain"}} source={{uri:item.image}}/>
          <Text style={{textAlign:"center",fontSize:12,fontWeight:"500",marginTop:5}}>{item.name}</Text>
          </Pressable>
        ))}
        </View>
        {/* the length error because it should have something to slide */}
        </ScrollView>
       <SliderBox 
        images={images}
       
        autoPlay
        circleLoop
        dotColor="#13274F"
        inactiveDotColor="#90A4AE"
        imageComponentStyle={{width:"100%"}}
       />
         
         {/* Trending section */}
         <Text style={{padding:10,fontSize:18,fontWeight:"bold"}}>Trending Deals of the week</Text>
         <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {deals.map((item,index) => (
            <Pressable 
            onPress={()=>
            navigation.navigate("Info",{
              id: item.id,
              title: item.title,
              price: item?.price,
              carouseImages: item?.carouselImages,
              color:item?.color,
              size: item?.size,
              oldPrice: item?.oldPrice,
              item : item,

            })
            }
            key={index} style={{ width: '50%', padding: 5 }}>
              <Image
                style={{ width: '100%', height: 200, resizeMode: "cover" }} // Adjust dimensions and resizeMode as needed
                source={{ uri: item?.image }}
              />
            </Pressable>
          ))}
        </View>
        {/* border */}
        <Text style={{height:1,borderColor:"#D0D0D0",borderWidth:2,marginTop:15}} />
            
            {/* Todays deal section */}
             <Text style={{padding:10,fontSize:19,fontWeight:"bold"}}>Today's Deal</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {offers.map((item,index)=>(
              <Pressable 
              //we are sending offer details nothing else
              onPress={()=>navigation.navigate("Info",{
                id:item?.id,
                title:item?.title,
                price:item?.price,
                carouseImages: item?.carouselImages, //we can design the image using this
                color: item?.color,
                size: item?.size,
                oldPrice: item?.oldPrice,
                item:item, //this is helpful redux
              })}
              key={index} style={{marginVertical:10,alignItems:"center",justifyContent:"center"}} >
                <Image style={{width:150,height:150,resizeMode:"contain"}} source={{uri:item?.image}} />
               <View 
               style={{backgroundColor:"#E31837",
               paddingVertical:5,
               width:130,
               justifyContent:"center",
               alignItems:"center",
               marginTop:10,
               borderRadius:4
               
              }}
               >
                <Text style={{fontSize:13,fontWeight:"bold",color:"white",textAlign:"center"}}>Upto {item?.offer} Off</Text>

               </View>

              </Pressable>
             ))}
             </ScrollView>

             <Text style={{height:1,borderColor:"#D0D0D0",borderWidth:2,marginTop:15}} />

             <View style={{
          marginHorizontal: 10,
          marginTop: 20,
          width: "45%",
        }}>
          <DropDownPicker
            style={pickerStyle}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="Choose category"
            placeholderStyle={{ color: "#808080" }} // Adjust placeholder style if needed
            onOpen={onGenderOpen}
            onChangeValue={(value)=>{
              setCategory(value); // Set the category state based on selected value
          filterProduct(value);
            }}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

          
             {/* Product section */}
            
             <View 
             
             style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
       {filter.map((item, index) => (
         <View key={index} style={{ width: '48%', marginBottom: 10 }}>
           <ProductItem item={item} />
         </View>
       ))}
     </View>
          
            
      </ScrollView>
    </SafeAreaView>

    {/*Now designing Bottom MOdals  */}

   <BottomModal
    onBackdropPress={()=>setModelVisible(!modalVisible)}
    swipeDirection={["up","down"]}
    swipeThreshold={200}
    modalAnimation={
      new SlideAnimation({
        slideFrom:"bottom"
      })
    }
    onHardwareBackPress={()=>setModalVisible(!modalVisible)}
    visible={modalVisible}
    onTouchOutside={()=>setModelVisible(!modalVisible)}
   >
    {/* You will see after animation has done */}
       <ModalContent  style={{width:"100%",height:400}}>
             <View style={{marginBottom:8}}>
              <Text style={{fontSize:16,fontWeight:"500"}}>Choose your Location</Text>

              <Text style={{marginTop:5,fontSize:16,color:"gray"}}>Select a delivery loaction to see product vailability and delivery options </Text>
             </View>
             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Already added addresses */}

              <Pressable 
              onPress={()=>{
                setModelVisible(false);
                navigation.navigate("Address");
              }}
              style={{width:140,height:140,borderColor:"#D0D0D0",marginTop:10,borderWidth:1,padding:10,
            justifyContent:"center",alignItems:"center"}}>
                <Text style={{textAlign:"center",color:"#066b2",fontWeight:"500"}}>Add an Address or pick-up point</Text>

              </Pressable>
             </ScrollView>
             <View>
              <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
              <EvilIcons name="location" size={24} color="black" />
              <Text style={{color:"#006b2",fontWeight:"400"}}>Enter Indian Pincode</Text>
              </View>
              <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
              <Ionicons name="locate" size={24} color="#0066b2" />
              <Text style={{color:"#006b2",fontWeight:"400"}}>Use my current location</Text>
              </View>
              <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
              <AntDesign name="earth" size={24} color="#0066b2" />
              <Text style={{color:"#006b2",fontWeight:"400"}}>Deliver outside India</Text>
              </View>
              
             </View>
       </ModalContent>
   </BottomModal>
    </>
  )
}

export default HomeScreen