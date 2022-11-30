import { Request, Response } from 'express';
import DataResponse from '../../models/DataResponse';
import { ERROR_CODE } from '../../types/ErrorsCode';
import UserAuthService from '../../services/auth/UserAuthService';
class AuthController {
  constructor() {}
  async login(req: Request, res: Response, next: any) {
    const { email, password } = req.body;
    const response = await UserAuthService.authenticate({ email, password });
    if (response.errorCode === ERROR_CODE.FAILED) {
      res.status(403).json(new DataResponse(403, response.message, 'Forbidden'));
    } else {
      res.status(200).json(new DataResponse(200, response.message, response));
    }
  }
  async logout(req: Request, res: Response, next: any) {
    const {token} = req.body;

  }
  async refreshToken(req: Request, res: Response, next: any) {
    const {token} = req.body;
    const response = await UserAuthService.refreshToken({token})
    return null;

  }
}
export default new AuthController();
