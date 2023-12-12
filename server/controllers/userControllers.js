const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const nodemailer=require('nodemailer')
const User = require( '../models/userModel' )
const Order=require('../models/order')
const { text } = require( 'body-parser' )

//function to send verification email to the user
const sendVerificationEmail=async(email,verificationToken)=>{
//create a nodemailer

const transporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"harshitsingh@gmail.com",
    pass:"fnxk tzte ehab eblj",
  }
})
//compose the email message
const mailOptions={
  from:"amazon.com",
  to:email,
  subject:"Email Verification",
  text:`Please click the following link for verification : http://localhost:5000/verify/${verificationToken}`,
};
//send the mail
try {
  await transporter.sendMail(mailOptions)
} catch (error) {
  console.log("Error sending verification",error)
}


}

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
    return res.status(400).json({ message: "Email already exists" });
  }

  // Generate a more secure verification token
  const verificationToken = require('crypto').randomBytes(32).toString('hex');

  try {
    // Create a new User
    const newUser = new User({ name, email, password, verificationToken });
    
    // Save the new user
    await newUser.save();

    // Send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    // Return a success message or the created user
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
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



const loginUser=asyncHandler(async(req,res)=>{

})

module.exports={createUser,getUser,loginUser,verifying}