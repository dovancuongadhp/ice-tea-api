import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UsersService from './services/UsersService';
import ConnectMongoDb from './config/database';
import { ERROR_CODE } from './types/ErrorsCode';
import DataResponse from './models/DataResponse';
const app = express();
app.use(bodyParser.json());

// [CORS]
app.use(cors({ origin: '*' }));

// [.ENV]
dotenv.config();

// [CONNECT MONGODB]
ConnectMongoDb();

// ------------JWT-----------

let refreshTokenArr = [];

// login
app.post('/login', async function (req, res) {
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    res.status(400).send('All input is required');
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
    res.status(401).json(new DataResponse(401, 'Unregisterd user', null));
  }
});

// refresh token
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

// logout
app.post('/logout', (req, res) => {
  const refresh_token = req.body.token;
  refreshTokenArr = refreshTokenArr.filter((refToken) => refToken != refresh_token);
  res.sendStatus(200);
});

app.listen(8500, () => {
  console.log('AuthServer is listening on port 8500!');
});
