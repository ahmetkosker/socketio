const express = require("express");
var cors = require("cors");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const axios = require("axios");

app.use(cors());

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
});

io.on("connection", (socket) => {
  let UID = socket.handshake.query['UID']
  let newStatus = ""

  console.log("here")

  socket.on("ping", (status) => {
    newStatus = status
  });

  socket.on("disconnect", () => {
    if (newStatus !== "Görevde") {
      axios
        .post('https://statuschanger-lv73cppecq-ew.a.run.app', {
          UID,
          status: 'Dışarıda',
        }).then(res => console.log(res.data.status))
      console.log(`${socket.id} disconnected with UID ${UID}`);
    }
  });
});


app.get("/", (req, res) => {
  res.send("Welcome to the chat server");
});

server.listen(3002, () => {
  console.log("server is running");
});