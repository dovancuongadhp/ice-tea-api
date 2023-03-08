import express from 'express';
import AuthController from '@src/controller/auth/AuthController';
const AuthRouter = express.Router();
// AuthRouter.use(authenToken);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/refreshToken', AuthController.refreshToken);
AuthRouter.post('/logout', AuthController.logout);
AuthRouter.post('/logoutAll',AuthController.logoutAll);
export default AuthRouter;