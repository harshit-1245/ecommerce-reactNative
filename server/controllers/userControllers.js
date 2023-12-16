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
    res.json(200).json({addresses})

  } catch (error) {
    res.status(500).json({message:"Error Retrieving Address"})
  }
})


module.exports={createUser,getUser,loginUser,verifying,saveAddress,getAdrress}