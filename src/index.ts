import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import AllRouter from './routers/index';
import * as cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import ConnectMongoDb from './config/database';
// SERVICE USER
import UsersService from './services/UsersService';
import { ERROR_CODE } from './types/ErrorsCode';
import DataResponse from './models/DataResponse';
const app = express();
app.use(bodyParser.json());

// [LOGGER]
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "log/access.log"), {
      flags: "a",
    }),
  })
);

// [CORS]
app.use(cors({ origin: '*' }));

// [ROUTERS]
AllRouter(app);

// [.ENV]
dotenv.config();

// [CONNECT MONGODB]
ConnectMongoDb();

// SET HEADERS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
/** -----------------------
 *      AUTHENTICATION
 *  -----------------------
 */

 let refreshTokenArr = [];
 console.log(refreshTokenArr)
 
 app.post('/login', async function (req, res) {
   const { email, password } = req.body;
   // Validate user input
   if (!(email && password)) {
     return res.status(400).send('All input is required');
   }
   // find user by email
   const userFindByEmail = await UsersService.getUserByEmailAuth(email);
 
   if (userFindByEmail.errorCode == ERROR_CODE.SUCCESSFULLY && userFindByEmail.data.email == email && userFindByEmail.data.password == password) {
     const uid = userFindByEmail.data._id;
     const access_token = jwt.sign({ uid, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
     const refresh_token = jwt.sign({ uid, email }, process.env.REFRESH_TOKEN_SECRET);
     refreshTokenArr.push(refresh_token);
     return res.json({ access_token, refresh_token });
   } else {
     console.log('Email & Password does not match');
     return res.status(401).json(new DataResponse(401, 'Unregisterd user', null));
   }
 });
 
 app.post('/refreshToken', (req, res) => {
   const refreshToken = req.body.token;
   if (!refreshToken) res.sendStatus(401);
   if (!refreshTokenArr.includes(refreshToken)) res.sendStatus(403);
 
   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, data: any) => {
     if (err) res.sendStatus(403);
     const access_token = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
     res.json({ access_token });
   });
 });
 
 app.post('/logout', (req, res) => {
   const refresh_token = req.body.token;
   refreshTokenArr = refreshTokenArr.filter((refToken) => refToken != refresh_token);
   res.sendStatus(200);
 });

 
app.listen(process.env.PORT, () => {
  console.log('The application is listening on port 8000!');
});
