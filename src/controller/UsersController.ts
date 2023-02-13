import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import DataResponse from '../models/DataResponse';
import { ERROR_CODE } from '../types/ErrorsCode';
import { HTTP_CODE } from '../types/HttpCode';
import DataResponseList from '../models/DataResponseList';
interface CustomRequest extends Request {
  // thêm trường uid và Request (bên middleware authenToken đã assign uid nếu verify thành công)
  uid: string;
}

class UserController {
  constructor() {}
  // [GET]: getAllUsers
  async getListUser(req: CustomRequest, res: Response) {
    const uid = req.uid;
    console.log(uid)
    const listUser = await UsersService.getAllUsers();
    res.status(HTTP_CODE.OK).json(new DataResponseList(200, 'oke', listUser.length,listUser));
  }
  // [GET]: getUserById
  async getUserById(req: Request, res: Response) {
    const _id = String(req.params.id);
    const userById = await UsersService.getUserById(_id);
    if (userById.errorCode === ERROR_CODE.FAILED) {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, userById.message, userById.data));
    } else {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, userById.message, userById.data));
    }
  }
  // [GET]: getUserByEmail
  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.query;
    const userByEmail = await UsersService.getUserByEmail(email);
    if (userByEmail.errorCode === ERROR_CODE.FAILED) {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, userByEmail.message, userByEmail.data));
    } else {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, userByEmail.message, userByEmail.data));
    }
  }
  // [POST]: addUser
  async addUser(req: Request, res: Response) {
    const reponseService = await UsersService.addUser(req.body);
    if (reponseService.errorCode === ERROR_CODE.FAILED) {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, reponseService.message, reponseService.data));
    } else {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, reponseService.message, reponseService.data));
    }
  }
  // [DELETE]: removeUser
  async removeUser(req: Request, res: Response) {
    const _id = String(req.params.id);
    const reponseService = await UsersService.removeUser(_id);
    if (reponseService.errorCode === ERROR_CODE.FAILED) {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, reponseService.message, reponseService.data));
    } else {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, reponseService.message, reponseService.data));
    }
  }
}
export default new UserController();
