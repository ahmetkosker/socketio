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

io.on("connection", (socket) => {
  let UID = socket.handshake.query['UID']
  let newStatus = ""

  axios
    .post('https://statuschanger-lv73cppecq-ew.a.run.app', {
      UID,
      status: 'Çevrim içi',
    }).then(res => console.log(res.data.status))

  console.log(`${socket.id} connected with UID ${UID}`);

  socket.on("ping", (status) => {

    console.log(`${socket.id} pinged with status ${status}`)
    newStatus = status
  });

  socket.on("disconnect", () => {
    if (newStatus !== "Görevde") {
      axios
        .post('https://statuschanger-lv73cppecq-ew.a.run.app', {
          UID,
          status: 'Dışarıda',
        }).then(res => console.log(res.data.status))
    }
    console.log(`${socket.id} disconnected with UID ${UID}`);

  });
});


app.get("/", (req, res) => {
  res.send("Welcome to the chattttttt server");
});

server.listen(3002, () => {
  console.log("server is running");
});