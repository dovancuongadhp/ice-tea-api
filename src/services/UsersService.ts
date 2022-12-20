import { IUser, USER_ROLE_TYPES } from './types';
import { UserDto } from 'dto/UserDto';
import ErrorResponse from '../models/ErrorResponse';
import { ERROR_CODE } from '../types/ErrorsCode';
import DIContainer from '../repositories';
import UsersRepository from 'repositories/UsersRepository';
class UserService {
  private readonly userRepository: UsersRepository;
  constructor() {
    this.userRepository = DIContainer().usersRepository();
  }

  async getAllUsers(): Promise<UserDto[]> {
    const listUsers = await this.userRepository.find();
    const listUsersDto = listUsers.map((user) => {
      return {
        _id: String(user._id),
        fullName: String(user.fullName),
        email: String(user.email),
        age: String(user.age),
        address: String(user.address),
        phoneNumber: String(user.phoneNumber),
        role: String(user.role)
      };
    });
    return listUsersDto;
  }

  async getUserById(_id: any) {
    try {
      const user = await this.userRepository.findById(_id);
      const userDto: UserDto = {
        _id: String(user._id),
        fullName: String(user.fullName),
        email: String(user.email),
        age: String(user.age),
        address: String(user.address),
        phoneNumber: String(user.phoneNumber),
        role: String(user.role)
      };
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Dont found user !', data: null });
    }
  }

  async getUserByEmail(email: any) {
    try {
      const user = await this.userRepository.findByEmail(email);
      const userDto: UserDto = {
        _id: String(user._id),
        fullName: String(user.fullName),
        email: String(user.email),
        age: String(user.age),
        address: String(user.address),
        phoneNumber: String(user.phoneNumber),
        role: String(user.role)
      };
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Dont found user !', data: null });
    }
  }

  async addUser(user: IUser) {
    const newUser = { ...user, role: String(USER_ROLE_TYPES.USER) };
    try {
      await this.userRepository.create(newUser);
      //oke
      const userDto = {
        _id: String(newUser._id),
        fullName: String(newUser.fullName),
        email: String(newUser.email),
        age: String(newUser.age),
        address: String(newUser.address),
        phoneNumber: String(newUser.phoneNumber),
        role: String(newUser.role)
      };
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Failed create new user !', data: null });
    }
  }

  async removeUser(_id: any) {
    try {
      await this.userRepository.delete(_id);
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: `Remove user successfully`, data: null });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Failed remove user !', data: null });
    }
  }
}
export default new UserService();
