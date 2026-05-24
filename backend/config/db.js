import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;
export const connectDB = async () => {
  await mongoose.connect(MONGO_URI).then(() => {
    console.log("✨ Database is in its Lover era — fully connected");
  });
};
