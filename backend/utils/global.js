function getUsers(io, id) {

  const clients = io.sockets.adapter.rooms.get(id);

  if (clients) {

    const users = [];
  
    for (const clientId of clients ) {
      const clientSocket = io.sockets.sockets.get(clientId);
      users.push({ id: clientId, nickname: clientSocket.nickname, ready: clientSocket.ready });
    }
      
    io.sockets.in(id).emit('get-users', users);
  } 
}

function checkReady(io, id) {
  const clients = io.sockets.adapter.rooms.get(id);
  
  for (const clientId of clients ) {
    const clientSocket = io.sockets.sockets.get(clientId);
    if (!clientSocket.ready) {
      return false;
    }
  }

  return true;
}

module.exports = { getUsers, checkReady };