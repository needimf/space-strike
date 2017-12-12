// Load and initialize socket.io
const io = require('socket.io')();

// require app's game logic and constructors
let Game = require('./app/game');

// initialize users and gameIdGenerator
let users = {};
let gameIdCounter = 1;

io.on('connection', (socket) => {
  console.log(`${new Date().toISOString()} ID ${socket.id} connected.`);
  // add socket to user object
  users[socket.id] = JSON.parse(socket.request._query['user']);

  // join waiting room until there are enough players
  socket.join('waiting room');

  // handle socket disconnect
  socket.on('disconnect', () => {
    console.log(`${new Date().toISOString()} ID ${socket.id} disconnected.`);      
    delete users[socket.id];
  });

  // create games for players in waiting room
  pairWaitingPlayers();
});


function getClientsInRoom(room) {
  var clients = [];
  for (var clientId in io.sockets.adapter.rooms[room].sockets) {
    clients.push(io.sockets.connected[clientId]);
  }
  return clients;
}

function pairWaitingPlayers() {
  let players = getClientsInRoom('waiting room');
  if (players.length >= 2) {
    // at least two players are waiting, let's pair them up
    // create new game
    let game = new Game(gameIdCounter++, users[players[0].id]._id, users[players[1].id]._id);

    // create new room for the game
    players[0].leave('waiting room');
    players[1].leave('waiting room');
    players[0].join(`game ${game.id}`);
    players[1].join(`game ${game.id}`);
    
    io.to(`game ${game.id}`).emit('join', game);

    // store game in users
    users[players[0].id] = Object.assign({}, users[players[0].id], {currentGame: game});
    users[players[1].id] = Object.assign({}, users[players[1].id], {currentGame: game});

    console.log(`${new Date().toISOString()} ${JSON.stringify(users[players[0].id].firstName)} and ${JSON.stringify(users[players[1].id].firstName)} have joined game ID ${game.id}`);
  }
}

module.exports = io;