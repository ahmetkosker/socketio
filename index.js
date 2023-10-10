const express = require("express");
var cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the chat server");
});

app.listen(3002, () => {
  console.log("server is running");
});
