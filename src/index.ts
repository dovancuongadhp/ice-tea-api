import express from 'express';
import appRoutes from './routers';
import appConfig from './config';
import Banner from './banner'

const app:express.Application = express();

// [CONFIG]
appConfig(app)

// [ROUTERS]
appRoutes(app);

// [BANNER]
Banner();

app.get('/hello',(req,res)=>{
    res.send('Hello World on port 8000')
})


const port = process.env.PORT
app.listen(port, () => {
  console.log(`The application is listening on port ${port}`);
});
