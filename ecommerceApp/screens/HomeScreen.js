import { View, Text, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react'
import {SliderBox} from "react-native-image-slider-box"
import ProductItem from "../productItem/ProductItem"
import { list } from '../Products/list';
import {images} from "../Products/imagesForSlide"
import {deals} from "../Products/deals"
import {offers} from "../Products/offers"
import axios from "axios"
import DropDownPicker from "react-native-dropdown-picker"


const HomeScreen = () => {
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
        <View style={{flexDirection:"row",alignItems:"center",gap:5,padding:10,backgroundColor:"#AFEEEE"}}>
        <EvilIcons name="location" size={24} color="black" />
        <Pressable>
          <Text style={{fontSize:13,fontWeight:"500"}}>Deliver to Harshit -Varansi 232103</Text>
        </Pressable>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
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
            <Pressable key={index} style={{ width: '50%', padding: 5 }}>
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
             <Text style={{padding:10,fontSize:18,fontWeight:"bold"}}>Today's Deal</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {offers.map((item,index)=>(
              <Pressable key={index} style={{marginVertical:10,alignItems:"center",justifyContent:"center"}} >
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
             <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {filter.map((item, index) => (
          <View key={index} style={{ width: '48%', marginBottom: 10 }}>
            <ProductItem item={item} />
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen