import { IUser } from "./interfaces/types";
import UserModel from "../models/UserModel";
import { UserDto } from "dto/UserDto";
import ErrorResponse from "../models/ErrorResponse";
import { ERROR_CODE } from "../types/ErrorsCode";
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
    try{
        await newUser.save()
    }catch(error){
        return ErrorResponse({errorCode : ERROR_CODE.FAILED,message : error._message,data : null});
    }
    //oke
    const userDto = {
        _id: String(newUser.id),
        fullName: String(newUser.fullName),
        email: String(newUser.email),
        age : String(newUser.age),
        address: String(newUser.address),
        phoneNumber: String(newUser.phoneNumber)
    }
    return ErrorResponse({errorCode : ERROR_CODE.SUCCESSFULLY,message : "Successfully",data : userDto});
  }
 
}
export default new UserService();
