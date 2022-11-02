import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import AllRouter from "./routers/index";
import * as cors from "cors";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import ConnectMongoDb from "./config/database";
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
app.use(cors({ origin: "*" }));

// [ROUTERS]
AllRouter(app);

// [.ENV]
dotenv.config();

// [CONNECT MONGODB]
ConnectMongoDb();

app.listen(process.env.PORT, () => {
  console.log("The application is listening on port 8000!");
});
