const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  if (!url) throw new Error("MONGODB_URL missing");
  return mongoose.connect(url);
}

module.exports = { connectToMongoDB };
