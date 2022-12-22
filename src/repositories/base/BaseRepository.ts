import { IWrite } from '../interfaces/Iwrite';
import { IRead } from '../interfaces/IRead';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _model: any;

  constructor(model: any) {
    this._model = model;
  }

  async create(item: any): Promise<boolean> {
    const newItem = new this._model(item);
    return newItem.save();
  }
  async update(_id: string, item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async delete(_id: string): Promise<boolean> {
    return this._model.findByIdAndRemove({ _id }).exec();
  }
  async find(): Promise<any> {
    return this._model.find().exec();
  }
  async findById(_id: string): Promise<any> {
    return this._model.findById({ _id }).exec();
  }
}
