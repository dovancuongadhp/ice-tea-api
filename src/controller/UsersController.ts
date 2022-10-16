import { Request, Response } from "express";
import UserService from "../services/userService";
import User from "../models/User";
import userService from "../services/userService";

class UserController {
  constructor() {}
  index(req, res) {
    res.send("USER CONTROLLER INDEX");
  }
  async getListUser(req, res) {
    const userList = await userService.getAllUsers();
    res.status(200).json(userList);
  }
  addUser(req: Request, res: Response) {
    res.send("ADD USER");
  }
  remove(req, res) {
    res.send("REMOVE USER");
  }
}
export default new UserController();
