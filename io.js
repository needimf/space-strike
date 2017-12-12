function connectIo(server) {

  const io = require('socket.io')(server);
  
  let players = {}

  io.on('connection', (socket) => {
    console.log('connected')
    socket.on('add-player-to-list', (player) => {
      players[socket.id] = player;
      console.log(players)
      io.sockets.emit('players-currently-in-list', {players})
    })

    socket.on('disconnect', () => {
      delete players[socket.id];
      io.sockets.emit('players-currently-in-list', {players});    
    })
  })
}

module.exports = connectIo;