import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("connection failed", error.message);
  }
};

export default connectDb;
