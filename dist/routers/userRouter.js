"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userRouter = express.Router();
userRouter.get("/user", (req, res) => {
    res.send("user router");
});
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map