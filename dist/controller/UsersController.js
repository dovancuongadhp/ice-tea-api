"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
class UserController {
    constructor() { }
    index(req, res) {
        res.send("USER CONTROLLER INDEX");
    }
    getListUser(req, res) {
        const listUser = new userService_1.default().getAllUsers();
        res.status(200).json(listUser);
    }
    addUser(req, res) {
        res.send("ADD USER");
    }
    remove(req, res) {
        res.send("REMOVE USER");
    }
}
exports.default = new UserController();
//# sourceMappingURL=UsersController.js.map