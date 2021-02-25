const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const CharRouter = require("./character/CharacterRouter");
const errorHandler = require("./errors/ErrorHandler");

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());

app.use(CharRouter);
app.use(errorHandler);

console.log("[environment]:", process.env.NODE_ENV);

module.exports = app;
