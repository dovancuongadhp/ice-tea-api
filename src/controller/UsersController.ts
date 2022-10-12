import { Request, Response } from "express";
class UserController {
  constructor() {}
  index(req: Request, res: Response) {
    res.send("USER CONTROLLER");
  }
  addUser(req: Request, res: Response) {
    res.send("ADD USER");
  }
}
export default new UserController();
