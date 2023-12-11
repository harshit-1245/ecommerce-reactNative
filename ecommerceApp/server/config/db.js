const { MongoClient } = require('mongodb');
require('dotenv').config();
const colors = require('colors');

const connectDB = async () => {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("MongoDB connected!".green.bold);
    return client; // Returning the connected client if needed
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
