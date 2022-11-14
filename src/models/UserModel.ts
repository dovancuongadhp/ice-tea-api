import mongoose, { Schema } from "mongoose";

const User = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    auto: true
  },
  fullName: {type: String, required : [true,"fullName must be require"]},
  email : {type: String, required : [true,"email must be require"],unique : true},
  age: Number,
  address: String,
  phoneNumber: String,
  password : {type: String, required : [true,"password must be require"]},
},{_id: false});
export default mongoose.model("User", User);
