import * as express from 'express';
import AuthController from '../controller/auth/AuthController';
const AuthRouter = express.Router();
// AuthRouter.use(authenToken);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/refreshToken', AuthController.refreshToken);
AuthRouter.post('/logout', AuthController.logout);
export default AuthRouter;