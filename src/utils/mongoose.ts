export const mongooseConvert = {
  mutipleMongooseToObject: (mongooseArray) =>
    mongooseArray.map((mongoose) => mongoose.toObject()),
  mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};
