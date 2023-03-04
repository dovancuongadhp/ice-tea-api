import mongoose from 'mongoose';
export default async function ConnectMongoDb() {
  const urlMongoDb: string = process.env.MONGODB_URL as string;
  try {
    await mongoose.connect(urlMongoDb, () => {
      console.log('--> Connected to MongoDB <--');
    });
  } catch (error) {
    console.log('error mongoose', error);
  }
}
