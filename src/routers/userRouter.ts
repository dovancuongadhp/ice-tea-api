import * as express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("user router");
});

export default userRouter;
