import mongoose from "mongoose";

const connectMogoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Mongodb Connected successfully");
  } catch (err) {
    console.error("Error in connecting to mongodb", err);
  }
};

export default connectMogoDB;