const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const crypto=require('crypto')

const User = require( '../models/userModel' )
const Order=require('../models/order')
const { text } = require( 'body-parser' )

const secretKey="your_secret_key"

//function to send verification email to the user


const getUser = asyncHandler(async (req, res) => {
   try {
     const users = await User.find();
     res.status(200).json({ users });
   } catch (error) {
     res.status(500).json({ message: 'Error fetching users' });
   }
 });


 const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Generate a more secure verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = new User({ name, email, password: hashedPassword, verificationToken });

    // Save the new user
    await newUser.save();

    // Send verification email to the user
    

    // Return a success message or the created user
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
});

//endpoint for verifytoken
const verifying=asyncHandler(async(req,res)=>{
  try {
    const token =req.params.token;

    //Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

       //Mark the user as verified
       user.verified = true;
       user.verificationToken = undefined;
       await user.save();
       res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
})



const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login Failed' });
  }
});

const saveAddress=asyncHandler(async(req,res)=>{
 try {
   const {userId,address}=req.body;
   //find the user by user id
   const user=await User.findById(userId)
   if(!user){
    return res.status(404).json({message:"user not found"})

   }
   //add the new address to the user address's array
   //push(address) is going to save inside user address
   user.addresses.push(address)
   //save and updated user in the backend
   await user.save()

   res.status(200).json({message:"Adrress added Successfully"})

 } catch (error) {
   res.status(500).json({message:"Error Adding Address"})
 }
})

//enpoint to get data
const getAdrress=asyncHandler(async(req,res)=>{
  try {
    //accessing the id
    const userId=req.params.userId;

    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    const addresses=user.addresses;
    res.status(200).json({addresses})

  } catch (error) {
    res.status(500).json({message:"Error Retrieving Address"})
  }
})

const storeOrder = asyncHandler(async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an array of product objects from the cart items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image
    }));

    // Create a new order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    });

    await order.save();

    // Update user's orders array by pushing the new order's ID
    user.orders.push(order._id);
    await user.save();

    return res.status(201).json({ message: "Order created successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

const getProfile=asyncHandler(async(req,res)=>{
  try {
     const userId = req.params.userId;
     const user = await User.findById(userId);

     if(!user){
      res.status(404).json({message:"User not found"})
     }

     res.status(200).json({user})
  } catch (error) {
    res.status(500).json({message:"server error while profile fetching"})
  }
})

const getOrders=asyncHandler(async(req,res)=>{
  try {
    const userId = req.params.userId;
    const orders = await Order.find({user:userId}).populate("user")
    if(!orders){
      return res.status(404).json({message:"No orders found for this user"})
    }
    res.status(200).json({orders})
  } catch (error) {
    res.status(500).json({message:"Server error while getting error"})
  }
})


module.exports={createUser,getUser,loginUser,verifying,saveAddress,getAdrress,storeOrder,getProfile,getOrders}