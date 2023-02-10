import mongoose, { Schema } from "mongoose";

const Product = new Schema({
    nameProduct: String,
    price: Number,
    amount: Number,
    description: String
})

export default mongoose.model('Product',Product);