const path = require("path")
const express = require("express");
const http = require("http");
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"]
	}
})

io.on("connection", socket => {
  require('./socket/global.js')(socket, io);
  require('./socket/lobbyplayers.js')(socket, io);
  require('./socket/lobbychat.js')(socket, io);
  require('./socket/gameDrawing.js')(socket, io);
})

server.listen(port, () => console.log(`Listening on port ${port}`));

//remove player from lobby as host
//accept player in lobby
//add copy url
//forbid taken nickname in group