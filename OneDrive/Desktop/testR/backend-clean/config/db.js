const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection secured");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
