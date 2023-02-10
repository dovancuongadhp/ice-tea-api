import User from '../entities/User';
import UsersRepository from './UsersRepository';

// Container mapping all repositories
export default function ContainerRepo() {
  function usersRepository() {
    return new UsersRepository(User);
  }
  return {
    usersRepository
  };
}
