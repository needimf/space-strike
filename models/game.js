const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    playerOne: {type: Schema.Types.ObjectId, ref: 'User'},
    playerTwo: {type: Schema.Types.ObjectId, ref: 'User'},
    playerOneGrids: {
      primaryGrid: [],
      trackingGrid: []
    },
    playerTwoGrids: {
      primaryGrid: [],
      trackingGrid: []
    },
    gameOver: Boolean,
    winner: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Game', gameSchema);