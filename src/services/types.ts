export interface IUser {
  _id: number | string;
  fullName: string;
  age: number;
  email : string;
  address: string;
  phoneNumber: string;
  password : string;
}
export enum USER_ROLE_TYPES {
    ADMIN = 1,
    USER = 0
}
