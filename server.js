//Require Packages//
const express = require("express");
const rowdy = require("rowdy-logger");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

//Config Express App//
const app = express();
const PORT = process.env.PORT || 3001;
const rowdyResults = rowdy.begin(app);

//Middleware//
app.use(morgan("tiny"));
app.use(cors());
//request body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  //Mongoose Config//
  const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/fortunetellerdb";

  //Connect to MONGO_URI//
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;

  //Database Methods for Debugging//
  db.once("open", () => {
    console.log(`👐 mongoDB connection @ ${db.host}: ${db.port} 👐`);
  });
  db.on("error", (err) => {
    console.error(`☠️ ☠️ ☠️ Oh no! Something is wrong with the DB!\n ${err}`);
  });
  ///////ELSE//////////
} else {
  //mongoDB atlas code//
  const MongoClient = require("mongodb").MongoClient;

  const uri = process.env.ATLAS_URI;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });

  //Connect to URI//
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;

  //Database Methods for Debugging//
  db.once("open", () => {
    console.log(`👐 mongoDB connection @ ${db.host}: ${db.port} 👐`);
  });
  db.on("error", (err) => {
    console.error(`🤯 🤯 🤯 Oh no! Something is wrong with the DB!\n ${err}`);
  });
}

//Test Route// GET(index route)
app.get("/", (req, res) => {
  res.json({ msg: "Hello World 👋 🌎" });
});

//Controllers//
app.use("/api-v1/auth-lock", require("./controllers/api-v1/AuthLockedRoute"));
app.use("/api-v1/users", require("./controllers/api-v1/usersController"));
app.use("/api-v1/users", require("./controllers/api-v1/wisdomController"));

//Tell Express to Listen on Port//
app.listen(PORT, () => {
  rowdyResults.print();
  console.log(`🚢: ${PORT}`);
});
