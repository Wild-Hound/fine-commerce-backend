const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const app = express();
const portID = 5200;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.styhn.mongodb.net/db3?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getProducts = (req, res) => {
  client.connect(async (err) => {
    // connecting to database
    const collection = client.db("db3");
    // get all the products
    await collection
      .collection("products")
      .find({})
      .toArray((err, docs) => {
        console.log({ error: err });
        // sending found products
        res.send(JSON.stringify(docs));
      });
  });
};

const temp = (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify({ message: "recived", sender: req.body }));
};

app.get("/products", getProducts);
app.post("/test", temp);

app.listen(portID, () => {
  console.log("listening to port " + portID);
});
