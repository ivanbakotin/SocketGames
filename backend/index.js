const path = require("path")
const express = require("express");
const http = require("http");
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const crypto = require("crypto");

const io = require("socket.io")(server, {
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"]
	}
})

io.on("connection", socket => {

  const token = crypto.randomBytes(4).toString('hex');
  socket.nickname = "Player" + token;

  require('./socket/global.js')(socket, io);

})

server.listen(port, () => console.log(`Listening on port ${port}`));

//remove player from lobby as host
//declare host
//dont display button
// maybe game list then game