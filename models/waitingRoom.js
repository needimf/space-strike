const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waitingRoomSchema = new Schema(
  {
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('WaitingRoom', waitingRoomSchema);