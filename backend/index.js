const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const crypto = require("crypto");

app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static('public/js'));

io.on('connection', (socket) => {

    socket.on('get-link', () => {
		const id = crypto.randomBytes(16).toString("hex");
		socket.emit('send-link', id);
	})
})

server.listen(3000, () => {
  	console.log('listening on *:3000');
})
