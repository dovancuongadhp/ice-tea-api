"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("Well done!");
});
app.get("/hello", (req, res) => {
    res.json({
        name: " do van cuong dep trai 1234",
        age: 123,
        address: "an duong hai phong",
    });
});
app.listen(8000, () => {
    console.log("The application is listening on port 3000!");
});
//# sourceMappingURL=index.js.map