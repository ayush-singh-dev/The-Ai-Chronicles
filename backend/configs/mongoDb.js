import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
if (!URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}
const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
      socketTimeoutMS: 30000, // Increase socket timeout to 30 seconds
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("connection failed", error.message);
    process.exit(1);
  }
};

export default connectDb;
