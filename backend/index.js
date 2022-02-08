const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static('public/js'));

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	  });
})

server.listen(3000, () => {
  	console.log('listening on *:3000');
})