import mongoose from "mongoose";

const Mongo_URI: string | undefined = process.env.MONGO_URI;

const connectDB = async (): Promise<void> => {
  try {
    if (Mongo_URI) {
      await mongoose.connect(Mongo_URI);
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`ERROR: ${error.message}`);
    } else {
      console.log("An unknown error occurred while Connecting MongoDB");
    }
    process.exit(1);
  }
};

export default connectDB;
