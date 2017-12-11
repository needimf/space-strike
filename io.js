const io = require('socket.io')();

io.on('connection', (socket) => {
  console.log('connected')
  if (io.engine.clientsCount === 2) {
    console.log('2 players')
    io.emit('get-opponent-grid')
  }

  socket.on('get-players-in-waiting-room', () => {
    console.log('I like coconuts');
  })
  socket.on('initial-grid-send', (data) => {
    console.log(data)
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
})

// const battle = io.of('/battle');
// const battleRoomNo = 1;
// battle.on('connection', (socket) => {

//   // Create new room if two players are in a room
//   if(io.nsps['/battle'].adapter.rooms[`room-${battleRoomNo}`] && io.nsps['/battle'].adapter.rooms[`room-${battleRoomNo}`].length > 1) battleRoomNo++;
//   socket.join(`room-${battleRoomNo}`);

//   if(io.nsps['/battle'].adapter.rooms)
// })


module.exports = io;