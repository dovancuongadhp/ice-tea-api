import mongoose, { Schema } from "mongoose";

const User = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: String,
  age: Number,
  address: String,
  phoneNumber: String,
});
export default mongoose.model("User", User);
