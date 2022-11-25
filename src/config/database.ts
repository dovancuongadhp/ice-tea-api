import * as mongoose from "mongoose";
export default async function ConnectMongoDb() {
  mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("--> Connected to MongoDB <--");
  });
}
