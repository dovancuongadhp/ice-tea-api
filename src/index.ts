import * as express from "express";
import * as morgan from "morgan";
const app = express();

app.get("/", (req, res) => {
  res.send("Well done!");
});
app.get("/hello", (req, res) => {
  res.json({
    name: " do van cuong dep trai 123456",
    age: 123,
    address: "an duong hai phong",
  });
});
app.listen(8000, () => {
  console.log("The application is listening on port 3000!");
});
