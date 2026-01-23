const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  if (!url) throw new Error("MONGODB_URL missing");
  
  // Configure for serverless environment
  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  };
  
  return mongoose.connect(url, options);
}

module.exports = { connectToMongoDB };
