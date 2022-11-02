import UsersRouter from "./UsersRouter";
import ProductsRouter from "./ProductsRouter";
export default function AllRouter(app) {
  // --> Mapping all Routers
  app.use("/api-users", UsersRouter);
  app.use("/api-products",ProductsRouter);
}
