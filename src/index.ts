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
const app = express();
app.use(bodyParser.json());

// [LOGGER]
/** 
 * Print Logger
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "log/access.log"), {
      flags: "a",
    }),
  })
);

*/

// [LOGGER COMBINED]
app.use(morgan('combined'));
// [CORS]
app.use(cors({ origin: '*' }));

// [ROUTERS]
AllRouter(app);

// [.ENV]
dotenv.config();

// [CONNECT MONGODB]
ConnectMongoDb();

// JWT

const productList = [
  {
    id: 1,
    name: 'iphone 14',
    price: '200$'
  },
  {
    id: 2,
    name: 'Macbook pro',
    price: '300$'
  }
];

app.post('/login', (req, res) => {
  const data = req.body;
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100s' });
  return res.json(accessToken);
});

app.get('/productList', authenToken, (req, res) => {
  res.json({ status: 200, data: productList });
});

function authenToken(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  // Beaer [Token]
  const token = authorizationHeader.split(' ')[1];
  if (!token) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    if (err) res.sendStatus(403);
    next();
  });
}

app.listen(process.env.PORT, () => {
  console.log('The application is listening on port 8000!');
});
