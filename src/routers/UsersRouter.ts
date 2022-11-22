import UsersController from "../controller/UsersController";
import * as express from "express";

const UsersRouter = express.Router();
UsersRouter.get("/getIndex", UsersController.index);
UsersRouter.get("/getAllUsers",UsersController.getListUser)
UsersRouter.get("/getUserById/:id",UsersController.getUserById)
UsersRouter.get("/getUserByEmail",UsersController.getUserByEmail)
UsersRouter.post("/addUser",UsersController.addUser)
export default UsersRouter;