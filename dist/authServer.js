"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UsersService_1 = require("./services/UsersService");
const database_1 = require("./config/database");
const ErrorsCode_1 = require("./types/ErrorsCode");
const DataResponse_1 = require("./models/DataResponse");
const app = express();
app.use(bodyParser.json());
// [CORS]
app.use(cors({ origin: '*' }));
// [.ENV]
dotenv.config();
// [CONNECT MONGODB]
(0, database_1.default)();
// ------------JWT ------------
let refreshTokenArr = [];
console.log(refreshTokenArr);
// login
app.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            return res.status(400).send('All input is required');
        }
        // find user by email
        const userFindByEmail = yield UsersService_1.default.getUserByEmailAuth(email);
        if (userFindByEmail.errorCode == ErrorsCode_1.ERROR_CODE.SUCCESSFULLY && userFindByEmail.data.email == email && userFindByEmail.data.password == password) {
            const uid = userFindByEmail.data._id;
            const access_token = jwt.sign({ uid, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            const refresh_token = jwt.sign({ uid, email }, process.env.REFRESH_TOKEN_SECRET);
            refreshTokenArr.push(refresh_token);
            return res.json({ access_token, refresh_token });
        }
        else {
            console.log('Email & Password does not match');
            return res.status(401).json(new DataResponse_1.default(401, 'Unregisterd user', null));
        }
    });
});
// refresh token
app.post('/refreshToken', (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken)
        res.sendStatus(401);
    if (!refreshTokenArr.includes(refreshToken))
        res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err)
            res.sendStatus(403);
        const access_token = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        res.json({ access_token });
    });
});
// logout
app.post('/logout', (req, res) => {
    const refresh_token = req.body.token;
    refreshTokenArr = refreshTokenArr.filter((refToken) => refToken != refresh_token);
    res.sendStatus(200);
});
app.listen(8500, () => {
    console.log('AuthServer is listening on port 8500!');
});
//# sourceMappingURL=authServer.js.map