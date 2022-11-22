import mongoose, { Schema } from "mongoose";

const User = new Schema({
  fullName: {type: String, required : [true,"fullName must be require"]},
  email : {type: String, required : [true,"email must be require"],unique : true},
  age: Number,
  address: String,
  phoneNumber: String,
  password : {type: String, required : [true,"password must be require"]},
});
export default mongoose.model("User", User);
