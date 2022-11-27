"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersController_1 = require("../controller/UsersController");
const express = require("express");
const authenToken_1 = require("../middleware/authenToken");
const UsersRouter = express.Router();
UsersRouter.get('/getAllUsers', authenToken_1.authenToken, UsersController_1.default.getListUser);
UsersRouter.get('/getUserById/:id', UsersController_1.default.getUserById);
UsersRouter.get('/getUserByEmail', UsersController_1.default.getUserByEmail);
UsersRouter.post('/addUser', UsersController_1.default.addUser);
UsersRouter.delete('/removeUserById/:id', UsersController_1.default.removeUser);
exports.default = UsersRouter;
//# sourceMappingURL=UsersRouter.js.map