const global = require("../utils/global.js");
const crypto = require("crypto");

module.exports = function (socket, io) {

  const token = crypto.randomBytes(4).toString('hex');
  socket.nickname = "Player" + token;

  socket.on("set-nickname", (nickname, id) => {
    socket.nickname = nickname;
    global.getUsers(io, id);
  })

  socket.on("send-users", id => {
    global.getUsers(io, id);
  })

  socket.on("get-user", () => {
    socket.emit("receive-user", socket.lobby)
  })
}
