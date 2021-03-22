//Require Packages//
const express = require("express");
const rowdy = require("rowdy-logger");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./models");

//Config Express App//
const app = express();
const PORT = process.env.PORT || 3000;
const rowdyResults = rowdy.begin(app);

//Middleware//
app.use(morgan("tiny"));
app.use(cors());
//request body parser
app.use(express.json());

//Custom Middleware//
// app.use((req, res, next) => {
//   console.log("Hello from a Middleware!🤘");
//   next();
// });

//Test Route// GET(index route)
app.get("/", (req, res) => {
  res.json({ msg: "Hello World 👋 🌎" });
});

//Controllers//
// app.use("/api-v1/users", require("./controllers/api-v1/usersController");
app.use("/api-v1/users", require("./controllers/usersController"));

//Tell Express to Listen on Port//
app.listen(PORT, () => {
  rowdyResults.print();
  console.log(`🚢: ${PORT}`);
});
