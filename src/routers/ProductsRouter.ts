import * as express from 'express';
import ProductsController from "../controller/ProductsController";
const productRouter = express.Router();

productRouter.get('/getAllProducts',ProductsController.getListProduct)
productRouter.get('/getProductById/:id',ProductsController.getProductById)
productRouter.get('/addProduct',ProductsController.addProduct)
productRouter.get('removeProductById/:id',ProductsController.removeProduct)
export default productRouter;