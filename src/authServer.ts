import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
const app = express();
app.use(bodyParser.json());

// [CORS]
app.use(cors({ origin: '*' }));

// [.ENV]
dotenv.config();

// ------------JWT-----------
let refreshTokenArr = [];

// refresh token
app.post('/refreshToken',(req,res)=>{
    const refreshToken = req.body.token;
    if(!refreshToken) res.sendStatus(401);
    if(!refreshTokenArr.includes(refreshToken)) res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err : any, data : any) => {
        if (err) res.sendStatus(403);
        const access_token = jwt.sign({email : data.email},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '60s' })
        res.json({access_token})
      });
});
// login get token
app.post('/login', (req, res) => {
    const data = req.body;
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
    const refresh_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);

    refreshTokenArr.push(refresh_token)
    return res.json({access_token,refresh_token});
  });
  

app.listen(8500, () => {
  console.log('AuthServer is listening on port 8500!');
});
