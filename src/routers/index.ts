import UsersRouter from "./UsersRouter";
import ProductsRouter from "./ProductsRouter";
import AuthRouter from "./AuthRouter";
export default function AllRouter(app) {
  // --> Mapping all Routers
  app.use("/api-users", UsersRouter);
  app.use("/api-products",ProductsRouter);
  app.use(AuthRouter);
}
