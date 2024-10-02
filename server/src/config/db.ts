import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectToDatabase;
