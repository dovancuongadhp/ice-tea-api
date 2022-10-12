import UserController from "../controller/UsersController";
import * as express from "express";

const userRouter = express.Router();

// userRouter.get("/", (req, res) => {
//   res.send("user router");
// });
userRouter.get("/getIndex", UserController.index);
export default userRouter;
