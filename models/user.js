const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

let userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {type: String, required: true, lowercase: true, unique: true},
    password: String,
    wins: Number,
    totalGames: Number,
    currentGame: {type: Schema.Types.ObjectId, ref: 'Game'}
  },
  {
    timestamps: true
  }
);

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

userSchema.pre('save', function(next) {
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);

    this.password = hash;
    next();
  })
})

module.exports = mongoose.model('User', userSchema);