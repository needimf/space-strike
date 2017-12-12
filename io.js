// Load and initialize socket.io
const io = require('socket.io')();

// require models and mongoose
let Game = require('./models/game');
let mongoose = require('mongoose');

// initialize users and gameIdGenerator
let users = {};
let gameIdCounter = 1;

io.on('connection', (socket) => {
  console.log(`${new Date().toISOString()} ID ${socket.id} connected.`);
  // add socket to user object
  users[socket.id] = {}

  // add user information to user object
  socket.on('add user to list', (data) => {
    users[socket.id] = Object.assign({}, users[socket.id], data.user);
    socket.emit('added', JSON.stringify(users))
  });

  // join waiting room until there are enough players
  socket.join('waiting room');

  // handle socket disconnect
  socket.on('disconnect', () => {
    console.log(`${new Date().toISOString()} ID ${socket.id} disconnected.`);      
    delete users[socket.id];
  });

  socket.on('button', () => {
    io.sockets.emit('button sent back');
  })

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
    let game = gameIdCounter++;

    // create new room for the game
    players[0].leave('waiting room');
    players[1].leave('waiting room');
    players[0].join(`game ${game}`);
    players[1].join(`game ${game}`);
    
    io.to(`game ${game}`).emit('join', game);

    // store game in users
    users[players[0].id] = Object.assign({}, users[players[0].id], {currentGame: game});
    users[players[1].id] = Object.assign({}, users[players[1].id], {currentGame: game});

    io.to(`game ${game}`).emit('join', game);

    console.log(`${new Date().toISOString()} ${JSON.stringify(users[players[0].id])} and ${JSON.stringify(users[players[1].id])} have joined game ID ${game}`);
    console.log(users);
  }
}

module.exports = io;