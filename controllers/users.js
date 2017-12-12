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
  User.findOne({email: req.body.email}).exec().then(user => {
    if (!user) return res.status(401).json({err: 'Invalid credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        let token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'Invalid credentials'});
      }
    });
  }).catch(err => res.status(401).json(err));
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}