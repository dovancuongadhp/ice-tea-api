import { Request, Response, query } from 'express';
import ProductsService from '../services/ProductsService';
import { HTTP_CODE } from '../types/HttpCode';
import DataResponse from '../models/DataResponse';
import { ERROR_CODE } from '../types/ErrorsCode';
import DataResponseList from '../models/DataResponseList';
class ProductsController {
  constructor() {}
  // [GET]: getAllProducts
  async getListProduct(req: Request, res: Response) {
    const {page,pageSize} = req.query
    const listProduct = await ProductsService.getAllProducts(page,pageSize);
    res.status(HTTP_CODE.OK).json(new DataResponseList(200, 'oke', listProduct.length, listProduct));
  }
  // [GET]: getProductById
  async getProductById(req: Request, res: Response) {
    const _id = String(req.params.id);
    const productById = await ProductsService.getProductById(_id);
    if (productById.errorCode === ERROR_CODE.FAILED) {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, productById.message, productById.data));
    } else {
      res.status(HTTP_CODE.OK).json(new DataResponse(200, productById.message, productById.data));
    }
  }
  addProduct(req: Request, res: Response) {}
  removeProduct(req: Request, res: Response) {}
}
export default new ProductsController();
