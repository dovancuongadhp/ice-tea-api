import UsersRouter from "./UsersRouter";
import ProductsRouter from "./ProductsRouter";
import AuthRouter from "./AuthRouter";
import { Application } from "express";

export default function appRouter(app: any) {
  // --> Mapping all Routers
  app.use("/api-users", UsersRouter);
  app.use("/api-products",ProductsRouter);
  app.use(AuthRouter);
}
