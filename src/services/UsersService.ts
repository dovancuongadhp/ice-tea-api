import { IUser } from "./interfaces/types";
import UserModel from "../models/UserModel";
import { UserDto } from "dto/UserDto";
class UserService {
  constructor() {}

  async getAllUsers(): Promise<UserDto[]> {
    const listUsers = await UserModel.find().exec();
    const listUsersDto = listUsers.map(user => {
        return {
            _id : String(user._id),
            fullName : user.fullName,
            age : user.age,
            email : user.email ,
            address : user.address,
            phoneNumber : user.phoneNumber
        }
    })
    return listUsersDto;
  }
  async getUserById(id : any):Promise<UserDto> {
    const user = await UserModel.findById({_id : id});
    console.log(user)
    const userDto:UserDto = {
        _id: String(user.id),
        fullName: String(user.fullName),
        email: String(user.email),
        age : String(user.age),
        address: String(user.address),
        phoneNumber: String(user.phoneNumber)
    }
    return userDto;
  }
  async addUser(user: IUser) {
    const newUser = new UserModel(user);
    await newUser.save()
    const userDto:UserDto = {
        _id: String(newUser._id),
        fullName: String(newUser.fullName),
        email: String(newUser.email),
        age : String(newUser.age),
        address: String(newUser.address),
        phoneNumber: String(newUser.phoneNumber)
    }
    return userDto;
  }

 
}
export default new UserService();
