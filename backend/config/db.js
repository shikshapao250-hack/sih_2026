import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './cred.env' });

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.log('MongoDB URI is empty. Please add MONGODB_URI in atlas-credentials.env');
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
