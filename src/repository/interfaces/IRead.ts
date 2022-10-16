export interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(_id: string): Promise<T>;
}
