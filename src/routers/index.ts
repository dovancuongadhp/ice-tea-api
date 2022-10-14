import userRouter from "./userRouter";
import productRouter from "./productRouter";
export default function AllRouter(app) {
  // --> Mapping all Routers
  app.use("/users", userRouter);
  app.use("/products",productRouter);
}
