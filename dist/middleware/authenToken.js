"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenToken = void 0;
const jwt = require("jsonwebtoken");
function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // Bearer [Token]
    const token = authorizationHeader.split(' ')[1];
    if (!token)
        res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err)
            res.sendStatus(403);
        next();
    });
}
exports.authenToken = authenToken;
//# sourceMappingURL=authenToken.js.map