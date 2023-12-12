const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User = require( '../models/userModel' )


const getUser = asyncHandler(async (req, res) => {
   try {
     const users = await User.find();
     res.status(200).json({ users });
   } catch (error) {
     res.status(500).json({ message: 'Error fetching users' });
   }
 });


const createUser=asyncHandler(async(req,res)=>{
        const {firstname,email,password}=req.body;
           
        const emailPattern = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const namePattern = /^[A-Za-z\s]+$/;

          // Check if the email matches the regex pattern
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Check if the password matches the regex pattern
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Password does not meet requirements' });
  }

  // Check if the name matches the regex pattern
  if (!namePattern.test(firstname)) {
    return res.status(400).json({ message: 'Invalid name format' });
  }

  //for existing User
  const existingUser=await User.findOne({email});
  if(existingUser){
    res.status(409).json({message:"Email Already exist"})
  }

  const hashedPassword=await bcrypt.hash(password,10);
  try {
    const user=await User.create({firstname,email,password:hashedPassword})
    const token=jwt.sign({ userId:user._id},'your_secret_key');
    res.status(201).json({message:"user created successfully",user,token})
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }

})

const loginUser=asyncHandler(async(req,res)=>{
   const {email,password}=req.body;
   try {
    const user=await User.findOne({email});
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    //compare the provided password with the hashed password int the database

    const passwordMatch=await bcrypt.compare(password,user.password)
    // If passwords don't match, return an error
    if(!passwordMatch){
      return res.status(401).json({message:'Invalid Password'})
    }
    // Passwords match, create a JWT token for authentication

    const token =jwt.sign({userId:user._id},'your_secret_key');
    // Return success response with the user details and token
    res.status(200).json({message:'Login Successful',user,token});
   } catch (error) {
    res.status(500).json({message:'Error logging in'});
   }
})

module.exports={createUser,getUser,loginUser}