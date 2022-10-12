import userRouter from "./userRouter";
import * as express from "express";
export default function AllRouter(app) {
  // Router for user
  app.use("/users", userRouter);
  //   app.use("/products");
  //   app.use("/example");
}
