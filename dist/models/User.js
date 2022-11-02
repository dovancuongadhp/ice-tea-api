"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: String,
    age: Number,
    address: String,
    phoneNumber: String,
});
exports.default = mongoose_1.default.model("User", User);
//# sourceMappingURL=User.js.map