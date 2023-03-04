import * as jwt from 'jsonwebtoken';
import ErrorResponse from '../../models/ErrorResponse';
import RefreshTokenModel from '../../entities/RefreshTokenModel';
import { ERROR_CODE } from '../../types/ErrorsCode';
import UsersRepository from '../../repositories/UsersRepository';
import ContainerRepo from '../../repositories';

class UserAuthService {
  private readonly userRepository: UsersRepository;
  constructor() {
    this.userRepository = ContainerRepo().usersRepository();
  }
  async authenticate({ email, password }: any) {
    const user = await this.userRepository.findByEmail(email);
    if (!(email && password)) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'All input is required', data: null });
    }
    if (!user) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Unregistered user', data: null });
    }
    if (user.password !== password) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Email & Password not matched', data: null });
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = this.generateJwtToken(user);
    const refreshToken = this.generateRefreshToken(user);

    //save refreshToken
    const newRefreshToken = new RefreshTokenModel({
      user: user._id,
      token: refreshToken,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    try {
      await newRefreshToken.save();
    } catch (error) {
      console.log('Save refresh_token error', error);
      return error;
    }
    return ErrorResponse({
      errorCode: ERROR_CODE.SUCCESSFULLY,
      message: 'Get access_token & refresh_token successfully',
      data: {
        access_token: jwtToken,
        refresh_token: refreshToken
      }
    });
  }
  async refreshToken({ token }: any) {
    try {
      // find refreshTokenCurrent in record
      const refreshTokenCurrent:any = await this.getRefreshToken(token);
      const { user } = refreshTokenCurrent;

      const new_refresh_token = this.generateRefreshToken(user);

      // replace old refresh token with a new one and save
      refreshTokenCurrent.revoked = Date.now();
      refreshTokenCurrent.replacedByToken = new_refresh_token;
      await refreshTokenCurrent.save();

      // save refresh token new record
      const newRecordRefreshToken = new RefreshTokenModel({
        user: user._id,
        token: new_refresh_token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
      await newRecordRefreshToken.save();

      const jwtToken = this.generateJwtToken(user);
      return ErrorResponse({
        errorCode: ERROR_CODE.SUCCESSFULLY,
        message: 'Refresh_token successfully',
        data: {
          access_token: jwtToken,
          refresh_token: new_refresh_token
        }
      });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: error, data: null });
    }
  }
  async revokeToken({ token }: any) {
    try {
      // find refreshToken in record
      const refreshToken:any = await this.getRefreshToken(token);
      // destroy in time
      refreshToken.revoked = Date.now();
      refreshToken.token = null;
      await refreshToken.save();
      return ErrorResponse({
        errorCode: ERROR_CODE.SUCCESSFULLY,
        message: 'Logout successfully',
        data: null
      });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: error, data: null });
    }
  }

  async removeAllRefreshToken({ token }: any) {
    try {
      // find refreshTokenCurrent in record
      const refreshTokenCurrent:any = await this.getRefreshToken(token);
      const { user } = refreshTokenCurrent;
      const userId = user._id;
      const userDeleteAllToken = await RefreshTokenModel.deleteMany({ user: user._id });
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: `Remove All Token Successfully ${userId}`, data: null });
    } catch (error) {
      console.log(error);
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: error, data: null });
    }
  }

  async getRefreshTokens(userId: any) {
    // check that user exists
    await this.getUser(userId);

    // return refresh tokens for user
    const refreshToken = await RefreshTokenModel.find({ user: userId });
    return refreshToken;
  }

  // -------helper functions-------

  async getUser(userId: any) {
    const _id = userId;
    const user = await this.userRepository.findById(_id);
    if (!user) throw 'User not found';
    return user;
  }
  async getRefreshToken(token: any) {
    // find refreshToken in record
    const refreshToken = await RefreshTokenModel.findOne({ token }).populate('user');
    if (!refreshToken) throw 'Invalid token';
    return refreshToken;
  }
  /** -----------------------
   *    GENERATE JWT TOKEN
   *  -----------------------
   */
  generateJwtToken(user: any) {
    return jwt.sign({ uid: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30d' });
  }

  generateRefreshToken(user: any) {
    return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET as string);
  }
}
export default new UserAuthService();
