const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    wins: Number,
    totalGames: Number,
    currentGame: {type: Schema.Types.ObjectId, ref: 'Game'}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);