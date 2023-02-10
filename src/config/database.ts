import * as mongoose from 'mongoose';
export default async function ConnectMongoDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, () => {
      console.log('--> Connected to MongoDB <--');
    });
  } catch (error) {
    console.log('error mongoose', error);
  }
}
