"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersController_1 = require("../controller/UsersController");
const express = require("express");
const userRouter = express.Router();
userRouter.get("/getIndex", UsersController_1.default.index);
userRouter.get("/allUser", UsersController_1.default.getListUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map