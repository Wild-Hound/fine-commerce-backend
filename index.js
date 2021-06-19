const express = require("express");
const app = express();
const portID = 5200;

const getProducts = (req, res) => {
  res.send("hello world");
};

app.get("/", getProducts);

app.listen(portID, () => {
  console.log("listening to port " + portID);
});
