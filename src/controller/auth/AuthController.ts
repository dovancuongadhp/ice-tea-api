import { Request, Response } from 'express';
import DataResponse from '../../models/DataResponse';
import { ERROR_CODE } from '../../types/ErrorsCode';
import UserAuthService from '../../services/auth/UserAuthService';
import { setTokenCookie } from '../../utils/setCookie';
class AuthController {
  constructor() {}
  async login(req: Request, res: Response, next: any) {
    const { email, password } = req.body;
    const response = await UserAuthService.authenticate({ email, password });
    if (response.errorCode === ERROR_CODE.FAILED) {
      res.status(403).json(new DataResponse(403, response.message, response.data));
    } else {
      const refresh_token = response.data.refresh_token;
      setTokenCookie(res, refresh_token);
      res.status(200).json(new DataResponse(200, response.message, response.data));
    }
  }
  async logout(req: Request, res: Response, next: any) {
    // accept token from request body or cookie
    const token = req.body.token || req.cookies.refreshToken;
    const response = await UserAuthService.revokeToken({ token });
    if (response.errorCode === ERROR_CODE.FAILED) {
      res.status(403).json(new DataResponse(200, response.message, response.data));
    } else {
      res.status(200).json(new DataResponse(200, response.message, response.data));
    }
  }
  async logoutAll(req: Request, res: Response, next: any) {
    const token = req.body.token || req.cookies.refresh_token;
    const response = await UserAuthService.removeAllRefreshToken({ token });
    if (response.errorCode === ERROR_CODE.FAILED) {
      res.status(403).json(new DataResponse(200, response.message, response.data));
    } else {
      res.status(200).json(new DataResponse(200, response.message, response.data));
    }
  }
  async refreshToken(req: Request, res: Response, next: any) {
    const token = req.cookies.refresh_token;
    const response = await UserAuthService.refreshToken({ token });
    if (response.errorCode === ERROR_CODE.FAILED) {
      res.status(403).json(new DataResponse(403, response.message, response.data));
    } else {
      const refresh_token = response.data.refresh_token;
      setTokenCookie(res, refresh_token);
      res.status(200).json(new DataResponse(200, response.message, response.data));
    }
  }
}
export default new AuthController();
