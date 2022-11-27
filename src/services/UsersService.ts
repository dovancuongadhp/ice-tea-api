import { IUser } from './types';
import UserModel from '../models/UserModel';
import { UserDto } from 'dto/UserDto';
import ErrorResponse from '../models/ErrorResponse';
import { ERROR_CODE } from '../types/ErrorsCode';
class UserService {
  constructor() {}

  async getAllUsers(): Promise<UserDto[]> {
    const listUsers = await UserModel.find().exec();
    const listUsersDto = listUsers.map((user) => {
      return {
        _id: String(user._id),
        fullName: user.fullName,
        age: user.age,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber
      };
    });
    return listUsersDto;
  }

  async getUserById(id: any) {
    try {
      const user = await UserModel.findById({ _id: id });
      const userDto: UserDto = {
        _id: String(user._id),
        fullName: String(user.fullName),
        email: String(user.email),
        age: String(user.age),
        address: String(user.address),
        phoneNumber: String(user.phoneNumber)
      };
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
    } catch (error) {
      return ErrorResponse({
        errorCode: ERROR_CODE.FAILED,
        message: 'Dont found user',
        data: null
      });
    }
  }

  async getUserByEmail(email: any) {
    try {
      const user = await UserModel.findOne({ email: email });
      const userDto: UserDto = {
        _id: String(user._id),
        fullName: String(user.fullName),
        email: String(user.email),
        age: String(user.age),
        address: String(user.address),
        phoneNumber: String(user.phoneNumber)
      };
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Dont found user', data: null });
    }
  }
  async getUserByEmailAuth(email: any) {
    try {
      const user = await UserModel.findOne({ email: email });
      const userDto = {
        _id: String(user._id),
        fullName: String(user.fullName),
        email: String(user.email),
        age: String(user.age),
        address: String(user.address),
        phoneNumber: String(user.phoneNumber),
        password: String(user.password)
      };
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Dont found user', data: null });
    }
  }

  async addUser(user: IUser) {
    const newUser = new UserModel(user);
    try {
      await newUser.save();
      //oke
      const userDto = {
        _id: String(newUser._id),
        fullName: String(newUser.fullName),
        email: String(newUser.email),
        age: String(newUser.age),
        address: String(newUser.address),
        phoneNumber: String(newUser.phoneNumber)
      };
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Failed create new user !', data: null });
    }
  }
  async removeUser(id: any) {
    console.log(id);
    try {
      const userFindById = await UserModel.findOne({ _id: id });
      await UserModel.deleteOne({ _id: id });
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: `Remove User ${userFindById.fullName} Successfully`, data: null });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Failed remove user !', data: null });
    }
  }
}
export default new UserService();
