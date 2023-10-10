const express = require("express");
var cors = require("cors");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const axios = require("axios");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  let UID = socket.handshake.query["UID"];

  console.log(`${socket.id} connected with UID ${UID}`);

  socket.on("disconnect", async (socket) => {
    try {
      await axios
        .post("https://statuschanger-lv73cppecq-ew.a.run.app", {
          UID: UID,
          status: "Dışarıda",
        })
        .then((res) => console.log(res.data.status));
    } catch (error) {
      console.error("Error while posting data to the API:", error);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the chat server");
});

server.listen(3002, () => {
  console.log("server is running");
});
