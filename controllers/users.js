const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
}

function signup(req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.json({token: createJWT(user)});
    })
    // User data invalid (probably a duplicate email)
    .catch(err => {
      return res.status(400).json(err)});
}

function login(req, res) {

}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}