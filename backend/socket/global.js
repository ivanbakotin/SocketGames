const global = require("../utils/global.js");
const crypto = require("crypto");

module.exports = function (socket, io) {

  const token = crypto.randomBytes(4).toString('hex');
  socket.nickname = "Player" + token;
  socket.emit("get-user-data", { nickname: socket.nickname, id: socket.id })
  
  socket.on("set-nickname", (nickname, id) => {
    socket.nickname = nickname;
    global.getUsers(io, id);
  })

  socket.on('get-link', () => {
    const id = crypto.randomBytes(16).toString('hex');
    socket.emit("send-link", id);
  })

  socket.on("join-lobby", id => {
    socket.ready = false;
    socket.join(id);
    global.getUsers(io, id);
  })

  socket.on("leave-lobby", id => {
    socket.leave(id);
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
}