const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const secrets = require('../data/secrets');
const db = require('./db');

exports.login =  async (req, res) => {
  const {user, password} = req.body;
  const check = db.checkUser(user, password);
  if (check) {
    const accessToken = jwt.sign(
      {username: check.name},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256'
      });
    res.status(200).json({name: user, accessToken: accessToken});
  } else {
    res.status(401).send('Username or Password incorrect');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
