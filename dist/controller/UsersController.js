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
const UsersService_1 = require("../services/UsersService");
const DataResponse_1 = require("../models/DataResponse");
const ErrorsCode_1 = require("../types/ErrorsCode");
class UserController {
    constructor() { }
    // [GET]: getAllUsers
    getListUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userList = yield UsersService_1.default.getAllUsers();
            res.status(200).json(new DataResponse_1.default(200, 'oke', userList));
        });
    }
    // [GET]: getUserById
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = String(req.params.id);
            const userById = yield UsersService_1.default.getUserById(_id);
            if (userById.errorCode === ErrorsCode_1.ERROR_CODE.FAILED) {
                res.status(200).json(new DataResponse_1.default(200, userById.message, userById.data));
            }
            else {
                res.status(200).json(new DataResponse_1.default(200, userById.message, userById.data));
            }
        });
    }
    // [GET]: getUserByEmail
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.query;
            const userByEmail = yield UsersService_1.default.getUserByEmail(email);
            if (userByEmail.errorCode === ErrorsCode_1.ERROR_CODE.FAILED) {
                res.status(200).json(new DataResponse_1.default(200, userByEmail.message, userByEmail.data));
            }
            else {
                res.status(200).json(new DataResponse_1.default(200, userByEmail.message, userByEmail.data));
            }
        });
    }
    // [POST]: addUser
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reponseService = yield UsersService_1.default.addUser(req.body);
            if (reponseService.errorCode === ErrorsCode_1.ERROR_CODE.FAILED) {
                res.status(200).json(new DataResponse_1.default(200, reponseService.message, reponseService.data));
            }
            else {
                res.status(200).json(new DataResponse_1.default(200, reponseService.message, reponseService.data));
            }
        });
    }
    // [DELETE]: removeUser
    removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = String(req.params.id);
            const reponseService = yield UsersService_1.default.removeUser(_id);
            if (reponseService.errorCode === ErrorsCode_1.ERROR_CODE.FAILED) {
                res.status(200).json(new DataResponse_1.default(200, reponseService.message, reponseService.data));
            }
            else {
                res.status(200).json(new DataResponse_1.default(200, reponseService.message, reponseService.data));
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UsersController.js.map