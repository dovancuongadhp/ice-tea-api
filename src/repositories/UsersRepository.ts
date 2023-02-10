import UserModel from "../models/UserModel"
import { BaseRepository } from "./base/BaseRepository"

export default class UsersRepository extends BaseRepository<UserModel>{
    // custom methods
    async findByEmail(email : string){
        return this._model.findOne({email})
    }
}