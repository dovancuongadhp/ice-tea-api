"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    fullName: { type: String, required: [true, "fullName must be require"] },
    email: { type: String, required: [true, "email must be require"], unique: true },
    age: Number,
    address: String,
    phoneNumber: String,
    password: { type: String, required: [true, "password must be require"] },
});
exports.default = mongoose_1.default.model("User", User);
//# sourceMappingURL=UserModel.js.map