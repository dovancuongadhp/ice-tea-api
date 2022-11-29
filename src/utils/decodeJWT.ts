import jwt_decode from "jwt-decode";
interface TokenInfo{
    email : string;
    uid : string;
}
export function decodeJwt (token : string) {
    var decode_token = jwt_decode(token)
    return decode_token
}