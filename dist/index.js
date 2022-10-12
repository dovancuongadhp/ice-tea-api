"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
// LOGGER
morgan("combined");
// ROUTERS
// app.use(allRouter);
// allRouter();
const router = express.Router();
app.use("/test", router
    .get("/api", (req, res) => {
        res.send("test 1231233123");
    })
    .post("/post", (req, res) => {
        res.send("post");
    }));
app.listen(8000, () => {
    console.log("The application is listening on port 8000!");
});
//# sourceMappingURL=index.js.map