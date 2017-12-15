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
    wins: {type: Number, default: 0},
    totalGames: {type: Number, default: 0},
    currentGame: {type: Number, default: null},
    turnNo: {type: Number, default: null}
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
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
}

module.exports = mongoose.model('User', userSchema);