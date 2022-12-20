export default class UserModel {
  private fullName: string;
  private email: string;
  private age: number;
  private address: string;
  private phoneNumber: string;
  private password: string;
  private role: string;
  constructor(fullName: string, email: string, age: number, address: string, phoneNumber: string, password: string, role: string) {
    this.fullName = fullName;
    this.email = email;
    this.age = age;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.role = role;
  }
}
