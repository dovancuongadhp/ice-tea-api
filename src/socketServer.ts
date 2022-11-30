import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import ConnectMongoDb from './config/database';
import { Server } from 'socket.io';
import { createServer } from "http";
const app = express();
app.use(bodyParser.json());


// [.ENV]
dotenv.config();

// [CONNECT MONGODB]
// ConnectMongoDb();

const httpServer = createServer(app);
const io = new Server(httpServer)

app.use(express.static(__dirname + '/page'))
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/page/index.html')
})

io.on("connection",(socket)=>{
    socket.on('on-chat',(data) => {
        io.emit('user-chat',data)
    })
})

// start : yarn startSocketServer
httpServer.listen(3333, () => {
    console.log('Socket port 3333!');
});
  