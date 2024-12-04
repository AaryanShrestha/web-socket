const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/errors");

var corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataApi = require("./router/dataRouter");

app.use("/", dataApi);

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
