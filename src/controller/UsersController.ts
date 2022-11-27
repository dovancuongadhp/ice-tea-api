import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import DataResponse from '../models/DataResponse';
import { ERROR_CODE } from '../types/ErrorsCode';

class UserController {
  constructor() {}
  // [GET]: getAllUsers
  async getListUser(req: Request, res: Response) {
    const userList = await UsersService.getAllUsers();
    res.status(200).json(new DataResponse(200, 'oke', userList));
  }
  // [GET]: getUserById
  async getUserById(req: Request, res: Response) {
    const id = String(req.params.id);
    const userById = await UsersService.getUserById(id);
    if (userById.errorCode === ERROR_CODE.FAILED) {
      res.status(200).json(new DataResponse(200, userById.message, userById.data));
    } else {
      res.status(200).json(new DataResponse(200, userById.message, userById.data));
    }
  }
  // [GET]: getUserByEmail
  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.query;
    const userByEmail = await UsersService.getUserByEmail(email);
    if (userByEmail.errorCode === ERROR_CODE.FAILED) {
      res.status(200).json(new DataResponse(200, userByEmail.message, userByEmail.data));
    } else {
      res.status(200).json(new DataResponse(200, userByEmail.message, userByEmail.data));
    }
  }
  // [POST]: addUser
  async addUser(req: Request, res: Response) {
    const reponseService = await UsersService.addUser(req.body);
    if (reponseService.errorCode === ERROR_CODE.FAILED) {
      res.status(200).json(new DataResponse(200, reponseService.message, reponseService.data));
    } else {
      res.status(200).json(new DataResponse(200, reponseService.message, reponseService.data));
    }
  }
  // [DELETE]: removeUser
  async removeUser(req: Request, res: Response) {
    const id = String(req.params.id);
    const reponseService = await UsersService.removeUser(id);
    if (reponseService.errorCode === ERROR_CODE.FAILED) {
      res.status(200).json(new DataResponse(200, reponseService.message, reponseService.data));
    } else {
      res.status(200).json(new DataResponse(200, reponseService.message, reponseService.data));
    }
  }
}
export default new UserController();
