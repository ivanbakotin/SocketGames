const global = require("../utils/global.js");
const crypto = require("crypto");

module.exports = function (socket, io) {

  socket.on("set-nickname", (nickname, id) => {
    socket.nickname = nickname;
    if (id) global.getUsers(io, id);
  })

  socket.on('get-link', () => {
    const id = crypto.randomBytes(16).toString('hex');
    socket.emit("send-link", id);
  })

  socket.on("join-room", id => {
    socket.ready = false;
    socket.counter = 0;
    socket.join(id);
    global.getUsers(io, id);
  })

  socket.on("send-users", id => {
    global.getUsers(io, id);
  })

  socket.on("set-ready", id => {
    socket.ready = !socket.ready ;
    global.getUsers(io, id);
  })

  socket.on("start-game", id => {
    if (global.checkReady(io, id)) {
      io.sockets.in(id).emit('navigate-game');
    }
  })

  socket.on("leave-lobby", id => {
    socket.leave(id);
    global.getUsers(io, id);
  })

  socket.on('drawing', (data) => io.sockets.in(data.id).emit('drawing', data));
}