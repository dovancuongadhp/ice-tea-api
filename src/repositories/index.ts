import User from '../entities/User';
import Product from '../entities/Product';
import ProductsRepository from './ProductsRepository';
import UsersRepository from './UsersRepository';

// Container mapping all repositories
export default function ContainerRepo() {
  function usersRepository() {
    return new UsersRepository(User);
  }
  function productsRepository(){
    return new ProductsRepository(Product);
  }
  return {
    usersRepository,
    productsRepository
  };
}
