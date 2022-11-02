"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConvert = void 0;
exports.mongooseConvert = {
    mutipleMongooseToObject: (mongooseArray) => mongooseArray.map((mongoose) => mongoose.toObject()),
    mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};
//# sourceMappingURL=mongoose.js.map