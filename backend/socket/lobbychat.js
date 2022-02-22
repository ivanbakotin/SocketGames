module.exports = function (socket, io) { 
  if (!socket.mute) {
    socket.on('send-message', (message, id) => {
      io.sockets.in(id).emit('receive-message', { 
        id: socket.id, 
        message: message, 
        nickname: socket.nickname 
      });
    })
  }
}