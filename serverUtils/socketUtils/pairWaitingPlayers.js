let getClientsInRoom = require('./getClientsInRoom');
let Game = require('./../../models/game');
let mongoose = require('mongoose');

module.exports = function(usersList, io) {
  let players = getClientsInRoom('waiting room', io);
  let users = usersList

  if (players.length >= 2) {
    // at least two players are waiting, let's pair them up
    let game = new Game({
      playerOne: mongoose.Types.ObjectId(users[players[0].id]._id),
      playerTwo: mongoose.Types.ObjectId(users[players[1].id]._id)
    });

    game.save()
      .then(game => {
        players[0].leave('waiting room');
        players[1].leave('waiting room');
        players[0].join(`game ${game._id}`);
        players[1].join(`game ${game._id}`);
        
        users[players[0].id].currentGame = game._id;
        users[players[1].id].currentGame = game._id;

        io.to(`game ${game._id}`).emit('join', game._id);

        console.log(`${new Date().toISOString()} ${users[players[0].id].firstName} and ${users[players[1].id].firstName} have joined game ID ${game._id}`);
        return users;
      })
      .catch()
  }
}