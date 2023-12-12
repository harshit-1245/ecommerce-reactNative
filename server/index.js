const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Define the CORS options


// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is live at ${port}`.yellow.bold);
});
