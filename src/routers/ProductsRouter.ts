import * as express from 'express';
import ProductsController from "../controller/ProductsController";
const productRouter = express.Router();

productRouter.get('/allProduct',ProductsController.getListProduct)

export default productRouter;