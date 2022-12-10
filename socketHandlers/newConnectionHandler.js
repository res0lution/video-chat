const serverStorage = require('../serverStore')

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user

  serverStorage.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  })
}

module.exports = newConnectionHandler