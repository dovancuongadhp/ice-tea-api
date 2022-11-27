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
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "log/access.log"), {
      flags: "a",
    }),
  })
);

// [LOGGER COMBINED]
// app.use(morgan('combined'));

// [CORS]
app.use(cors({ origin: '*' }));

// [ROUTERS]
AllRouter(app);

// [.ENV]
dotenv.config();

// [CONNECT MONGODB]
ConnectMongoDb();

// JWT
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.listen(process.env.PORT, () => {
  console.log('The application is listening on port 8000!');
});
