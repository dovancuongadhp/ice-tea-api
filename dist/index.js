"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const index_1 = require("./routers/index");
const cors = require("cors");
const dotenv = require("dotenv");
const database_1 = require("./config/database");
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
(0, index_1.default)(app);
// [.ENV]
dotenv.config();
// [CONNECT MONGODB]
(0, database_1.default)();
// JWT
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.listen(process.env.PORT, () => {
    console.log('The application is listening on port 8000!');
});
//# sourceMappingURL=index.js.map