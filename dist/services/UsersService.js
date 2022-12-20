"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const ErrorResponse_1 = require("../models/ErrorResponse");
const ErrorsCode_1 = require("../types/ErrorsCode");
const repositories_1 = require("../repositories");
class UserService {
    constructor() {
        this.userRepository = (0, repositories_1.default)().usersRepository();
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const listUsers = yield this.userRepository.find();
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
        });
    }
    getUserById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(_id);
                const userDto = {
                    _id: String(user._id),
                    fullName: String(user.fullName),
                    email: String(user.email),
                    age: String(user.age),
                    address: String(user.address),
                    phoneNumber: String(user.phoneNumber),
                    role: String(user.role)
                };
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.FAILED, message: 'Dont found user !', data: null });
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                const userDto = {
                    _id: String(user._id),
                    fullName: String(user.fullName),
                    email: String(user.email),
                    age: String(user.age),
                    address: String(user.address),
                    phoneNumber: String(user.phoneNumber),
                    role: String(user.role)
                };
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.FAILED, message: 'Dont found user !', data: null });
            }
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = Object.assign(Object.assign({}, user), { role: String(types_1.USER_ROLE_TYPES.USER) });
            try {
                yield this.userRepository.create(newUser);
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
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.FAILED, message: 'Failed create new user !', data: null });
            }
        });
    }
    removeUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRepository.delete(_id);
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: `Remove user successfully`, data: null });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.FAILED, message: 'Failed remove user !', data: null });
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=UsersService.js.map