import mongoose, { Schema } from "mongoose";

const User = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    auto: true
  },
  fullName: {type: String, require : true},
  email : String ,
  age: Number,
  address: String,
  phoneNumber: String,
  password : String,
});
export default mongoose.model("User", User);
