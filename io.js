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

  // Handle torpedo fire
  socket.on('torpedo fire', ({row, col}) => {
    let game = users[socket.id].currentGame,
      shootingPlayer,
      opponent;
    
    if (users[socket.id]._id === game.player1.id) {
      shootingPlayer = game.player1;
      opponent = game.player2;
    } else {
      shootingPlayer = game.player2;
      opponent = game.player1;
    }

    // Check if the game actually exists
    if (game) {
      // Check if it is the shooting player's turn
      if (game.currentTurn === shootingPlayer.turnNo) {
        // Submit the shooting players shot
        if (game.fireTorpedo(row, col)) {
          // Shot was valid, check for a winner
          if (game.checkForWinner()) {
            game.gameOver = true;
            game.winner = shootingPlayer.id;
          }
          // switch current turn and send game state to both players
          game.currentTurn ? game.currentTurn = 0 : game.currentTurn = 1;
          io.to(`game ${game.id}`).emit('update game state', game);
        }
      }
    }

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
    let game = new Game(gameIdCounter++, users[players[0].id]._id, users[players[1].id]._id);

    // create new room for the game
    players[0].leave('waiting room');
    players[1].leave('waiting room');
    players[0].join(`game ${game.id}`);
    players[1].join(`game ${game.id}`);

    // Seed ships for development
    game.placeShipsForDevelopment(1);
    game.placeShipsForDevelopment(2);

    // emit join game to both players
    io.to(`game ${game.id}`).emit('join', game);

    // store game in users
    users[players[0].id].currentGame = game;
    users[players[1].id].currentGame = game;

    console.log(`${new Date().toISOString()} ${JSON.stringify(users[players[0].id].firstName)} and ${JSON.stringify(users[players[1].id].firstName)} have joined game ID ${game.id}`);
  }
}

module.exports = io;