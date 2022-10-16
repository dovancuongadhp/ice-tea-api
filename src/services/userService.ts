import { IUser } from "./interfaces/types";
import User from "../models/User";
import { mongooseConvert } from "../utils/mongoose";
class UserService {
  constructor() {}

  async getAllUsers() {
    const data = await User.find();
    return data;
  }

  addUser(user: IUser) {}
}
export default new UserService();
