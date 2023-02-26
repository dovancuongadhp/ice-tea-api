import ProductDto from 'dto/ProductDto';
import ContainerRepo from '../repositories';
import ProductsRepository from 'repositories/ProductsRepository';
import ErrorResponse from '../models/ErrorResponse';
import { ERROR_CODE } from '../types/ErrorsCode';
import Product from '../entities/Product';

class ProductService {
  private readonly productRepository: ProductsRepository;
  constructor() {
    this.productRepository = ContainerRepo().productsRepository();
  }
  async getAllProducts(page:any,pageSize:any): Promise<ProductDto[]> {
    // const listProduct = await this.productRepository.find();
    const skipRecord = (page*pageSize) - pageSize
    const listProduct = await Product.find().skip(skipRecord).limit(pageSize || 10);
    const listProductDto: ProductDto[] = listProduct.map((product) => {
      return {
        _id: String(product._id),
        nameProduct: String(product.nameProduct),
        price: String(product.price),
        amount: String(product.amount),
        description: String(product.description)
      };
    });
    return listProductDto;
  }
  async getProductById(id: string) {
    try {
      const productById = await this.productRepository.findById(id);
      if (productById === null) {
        return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Dont found product !', data: null });
      }
      const productDto: ProductDto = {
        _id: String(productById._id),
        nameProduct: String(productById.nameProduct),
        price: String(productById.price),
        amount: String(productById.amount),
        description: String(productById.description)
      };
      return ErrorResponse({ errorCode: ERROR_CODE.SUCCESSFULLY, message: 'Successfully', data: productDto });
    } catch (error) {
      return ErrorResponse({ errorCode: ERROR_CODE.FAILED, message: 'Dont found product !', data: null });
    }
  }
  async addProduct() {}
  async removeProduct() {}
}
export default new ProductService();
