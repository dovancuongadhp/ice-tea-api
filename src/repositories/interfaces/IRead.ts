export interface IRead<T> {
  find(): Promise<T[]>;
  findById(_id: string): Promise<T>;
}
