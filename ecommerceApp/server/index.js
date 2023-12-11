const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const colors=require('colors');
const connectDB = require( './config/db' );
const app=express();
require('dotenv').config();


const port= process.env.PORT ||  5000


//-------------connect DB
connectDB();
//--------normal middlewares
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())

app.listen(port,()=>{
    console.log(`server live at ${port}`.yellow.bold)
})