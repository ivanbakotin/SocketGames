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

  socket.on('setup-lobby', () => {
    const id = crypto.randomBytes(16).toString('hex');
    socket.join(id);

    socket.lobby = { 
      id, // room id 
      host: true, 
      accepted: true,
      mute: false,
      ready: false,
    };

    socket.emit("send-link", id);
  })

  socket.on("leave-lobby", id => {
    socket.leave(id);
    global.getUsers(io, id);
  })

  socket.on("accept-request", (id, token) => {
    const player_socket = io.sockets.sockets.get(id);

    player_socket.join(token);   

    player_socket.lobby = { 
      id, 
      host: false, 
      accepted: true,
      mute: false,
      ready: false,
    };

    player_socket.emit("accepted", player_socket.lobby);

    global.getUsers(io, id);
  })

  socket.on("set-mute", id => {
    const player_socket = io.sockets.sockets.get(id);
    player_socket.lobby.mute = !player_socket.lobby.mute;
    global.getUsers(io, id);
  })

  socket.on("kick-player", (id, token) => {
    const player_socket = io.sockets.sockets.get(id);
    player_socket.leave(token);
    player_socket.emit("kicked");

    player_socket.lobby = { 
      host: false, 
      accepted: false,
      mute: false,
      ready: false,
    };

    global.getUsers(io, token);
  })

  socket.on("send-users", id => {
    global.getUsers(io, id);
  })

  socket.on("set-ready", id => {
    socket.ready = !socket.ready;
    global.getUsers(io, id);
  })

  socket.on("get-user", id => {
    io.sockets.in(id).emit('player-waiting', { id: socket.id, nickname: socket.nickname, lobby: socket.lobby, });
    socket.emit("receive-user", socket.lobby)
  })

  socket.on("start-game", id => {
    if (global.checkReady(io, id)) {
      io.sockets.in(id).emit('navigate-game');
    }
  })
}

//console.log(io.sockets.adapter.rooms)  get all rooms