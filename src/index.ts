import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import AllRouter from "./routers/index";
const app = express();
app.use(bodyParser.json());

// [LOGGER]
app.use(morgan("combined"));

// [ROUTERS]
AllRouter(app);

// [TEST JSON]
app.post("/post", (req, res) => {
  res.status(200).json(req.body);
});

app.listen(8000, () => {
  console.log("The application is listening on port 8000!");
});
