import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import AllRouter from "./routers/index";
const app = express();
app.use(bodyParser.json());
// LOGGER
morgan("combined");

// ROUTERS
AllRouter(app);

app.listen(8000, () => {
  console.log("The application is listening on port 8000!");
});
