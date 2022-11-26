import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
const app = express();
app.use(bodyParser.json());


// [LOGGER COMBINED]
app.use(morgan('combined'));
// [CORS]
app.use(cors({ origin: '*' }));

// JWT



app.post('/login', (req, res) => {
  const data = req.body;
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10000s' });
  return res.json(accessToken);
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

app.listen(5500, () => {
  console.log('The authServer is listening on port 5500!');
});
