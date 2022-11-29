import mongoose,{Schema} from "mongoose";

const RefreshToken = new Schema({
    user : {type: Schema.Types.ObjectId,ref: 'User'},
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    revoked: Date,
    replacedByToken: String
})
export default mongoose.model("RefreshTokenModel",RefreshToken)