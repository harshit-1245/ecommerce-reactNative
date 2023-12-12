const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is live at ${port}`.yellow.bold);
});
