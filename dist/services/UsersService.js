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
const UserModel_1 = require("../models/UserModel");
const ErrorResponse_1 = require("../models/ErrorResponse");
const ErrorsCode_1 = require("../types/ErrorsCode");
class UserService {
    constructor() { }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const listUsers = yield UserModel_1.default.find().exec();
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
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findById({ _id: id });
                const userDto = {
                    _id: String(user._id),
                    fullName: String(user.fullName),
                    email: String(user.email),
                    age: String(user.age),
                    address: String(user.address),
                    phoneNumber: String(user.phoneNumber)
                };
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({
                    errorCode: ErrorsCode_1.ERROR_CODE.FAILED,
                    message: 'Dont found user',
                    data: null
                });
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({ email: email });
                const userDto = {
                    _id: String(user._id),
                    fullName: String(user.fullName),
                    email: String(user.email),
                    age: String(user.age),
                    address: String(user.address),
                    phoneNumber: String(user.phoneNumber)
                };
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.FAILED, message: 'Dont found user', data: null });
            }
        });
    }
    getUserByEmailAuth(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({ email: email });
                const userDto = {
                    _id: String(user._id),
                    fullName: String(user.fullName),
                    email: String(user.email),
                    age: String(user.age),
                    address: String(user.address),
                    phoneNumber: String(user.phoneNumber),
                    password: String(user.password)
                };
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.FAILED, message: 'Dont found user', data: null });
            }
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new UserModel_1.default(user);
            try {
                yield newUser.save();
                //oke
                const userDto = {
                    _id: String(newUser._id),
                    fullName: String(newUser.fullName),
                    email: String(newUser.email),
                    age: String(newUser.age),
                    address: String(newUser.address),
                    phoneNumber: String(newUser.phoneNumber)
                };
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: userDto });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.FAILED, message: 'Failed create new user !', data: null });
            }
        });
    }
    removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            try {
                const userFindById = yield UserModel_1.default.findOne({ _id: id });
                yield UserModel_1.default.deleteOne({ _id: id });
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.SUCCESSFULLY, message: `Remove User ${userFindById.fullName} Successfully`, data: null });
            }
            catch (error) {
                return (0, ErrorResponse_1.default)({ errorCode: ErrorsCode_1.ERROR_CODE.FAILED, message: 'Failed remove user !', data: null });
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=UsersService.js.map