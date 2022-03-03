function checkGame() {

}

function updatePlayers(io, id) {

  const clients = io.sockets.adapter.rooms.get(id);

    if (clients) {

      const users =  [];

      for (const clientId of clients) {
        const clientSocket = io.sockets.sockets.get(clientId);

        users.push({
          nickname: clientSocket.nickname,
          sign: clientSocket.sign,
          move: clientSocket.move,
          score: clientSocket.score,
        })
      }

      io.sockets.in(id).emit('get-players', users);
    } 
}

module.exports = function (socket, io) { 

  let board = [ {sign: "",}, {sign: "",}, {sign: "",},
                  {sign: "",}, {sign: "",}, {sign: "",},
                  {sign: "",}, {sign: "",}, {sign: "",}];

  socket.on("tic-tac-toe-setup", id => {
    const clients = io.sockets.adapter.rooms.get(id);

    if (clients) {

      const users =  [];

      let i = 0;

      for (const clientId of clients) {
        const clientSocket = io.sockets.sockets.get(clientId);

        clientSocket.score = 0;
        
        if (i) {
          clientSocket.sign = "X"
          clientSocket.move = true;
        } else {
          clientSocket.sign = "0"
          clientSocket.move = false;
        }

        users.push({
          nickname: clientSocket.nickname,
          sign: clientSocket.sign,
          move: clientSocket.move,
          score: clientSocket.score,
        })

        i++;
      }

      io.sockets.in(id).emit('get-players', users);
      io.sockets.in(id).emit('move-made-tic', board);
    } 
  })

  socket.on("make-move-tic", (index, id) => {

    if (socket.move && !board[index].sign) {  

      socket.move = false;
      board[index].sign = socket.sign;
  
      if (checkGame()) {
  
      }

      socket.broadcast.to(id).emit("update-board", board);
      socket.broadcast.to(id).emit("send-move");
      io.sockets.in(id).emit('move-made-tic', board); 
    }
  })

  socket.on("set-move", id => {
    socket.move = true;
    updatePlayers(io, id)
  })

  socket.on("set-board", data => {
    board = data;
  })

  socket.on("leave-game-tic", id => {
    //make other player leave
    socket.leave(id);
  })

  socket.on("reset-game-tic", () => {

  })
}