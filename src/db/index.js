const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/nodejs-assignment`);
    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log("MongoDb connection error: ",err);
    process.exit(1);
  }
};

module.exports = {connectDb}