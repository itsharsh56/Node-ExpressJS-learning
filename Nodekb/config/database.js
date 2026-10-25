import mongoose from 'mongoose';

// Connect the application to MongoDB
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from the .env file');
  }

  // Current Mongoose versions do not require the old connection options
  const connection = await mongoose.connect(process.env.MONGODB_URI);

  console.log(`MongoDB connected`);
};

export default connectDB;