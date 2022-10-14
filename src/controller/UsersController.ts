import { Request, Response } from "express";
import userService from "../services/userService";
import UserService from "../services/userService";
class UserController {
  constructor() {}
    index(req: Request, res: Response) {
    res.send("USER CONTROLLER INDEX");
    }
    getListUser(req,res){
      const listUser = new UserService().getAllUsers();
      res.status(200).json(listUser)
    }
    addUser(req: Request, res: Response) {
        res.send("ADD USER");
    }
    remove(req, res) {
        res.send("REMOVE USER");
    }
}
export default new UserController();
