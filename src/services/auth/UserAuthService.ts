import * as jwt from 'jsonwebtoken';
import ErrorResponse from '../../models/ErrorResponse';
import RefreshTokenModel from '../../models/RefreshTokenModel';
import UserModel from '../../models/UserModel';
import { ERROR_CODE } from '../../types/ErrorsCode';
class UserAuthService {
  async authenticate({ email, password }: any) {
    const user = await UserModel.findOne({ email });
    console.log("data user find",user,password)
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

    return {
      access_token: jwtToken,
      refresh_token: refreshToken
    };
  }
  async revokeToken({ token }: any) {
    // find refreshToken in record
    const refreshToken = await this.getRefreshToken(token);
    refreshToken.revoked = Date.now();
    await refreshToken.save();
  }
  async getRefreshTokens(userId: any) {
    // check that user exists
    const user = await this.getUser(userId);

    // return refresh tokens for user
    const refreshToken = await RefreshTokenModel.find({ user: userId });
    return refreshToken;
  }

  // helper functions

  async getUser(userId: any) {
    const user = await UserModel.findById({ _id: userId });
    if (!user) throw 'User not found';
    return user;
  }
  async getRefreshToken(token: any) {
    // find refreshToken in record
    const refreshToken = await (await RefreshTokenModel.findOne({ token })).populated('user');
    if (!refreshToken) throw 'Invalid token';
    return refreshToken;
  }
  /** -----------------------
   *    GENERATE JWT TOKEN
   *  -----------------------
   */
  generateJwtToken(user: any) {
    return jwt.sign({ uid: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  }

  generateRefreshToken(user: any) {
    return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET);
  }
}
export default new UserAuthService();
