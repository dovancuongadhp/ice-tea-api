import UserController from "../controller/UsersController";
import * as express from "express";

const userRouter = express.Router();
userRouter.get("/getIndex", UserController.index);
userRouter.get("/allUser",UserController.getListUser)
export default userRouter;