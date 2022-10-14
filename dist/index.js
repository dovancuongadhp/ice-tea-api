"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const index_1 = require("./routers/index");
const app = express();
app.use(bodyParser.json());
// [LOGGER]
app.use(morgan("combined"));
// [ROUTERS]
(0, index_1.default)(app);
// [TEST JSON]
app.post("/post", (req, res) => {
    res.status(200).json(req.body);
});
app.listen(8000, () => {
    console.log("The application is listening on port 8000!");
});
//# sourceMappingURL=index.js.map