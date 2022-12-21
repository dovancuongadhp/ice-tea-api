import { BaseRepository } from './base/BaseRepository';

export default class ProductsRepository extends BaseRepository<any> {
  // custom methods
  async findByEmail(email: string) {
    return this._model.findOne({ email });
  }
}
