// import { WebSocketServer } from "ws";

// const server = new WebSocketServer({ port: 8080 });

// let data = {
//   firstCard: {
//     type: "spade",
//     number: 1,
//   },
//   secondCard: {
//     type: "heart",
//     number: 3,
//   },
// };

// const playerList = [];

// server.on("connection", function connection(ws) {
//   ws.on("message", function message(data) {
//     // console.log("received: %s", JSON.parse(data));
//     const playerData = JSON.parse(data);
//     playerList.push(playerData);
//   });

//   ws.send("something");
// });

// const express = require("express");
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const httpServer = createServer(app);

const options = {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["casino-header"],
    credentials: true,
  },
};

const io = new Server(httpServer, options);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("receive_chips", (data) => {
    console.log(data);
    socket.broadcast.emit("broadcast", {
      message: "broadcastMsg",
    });
  });
});

httpServer.listen(3000, () => {
  console.log("listening on 3000");
});
