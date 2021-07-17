const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secrets = require('../data/secrets');
const db = require('./db');

exports.authenticate = async (req, res) => {
  const {username, password} = req.body;
  const user = await db.find(username);
  let check = false;
  if (user) {
    check = (user.username === username) &&
      (bcrypt.compareSync(password, user.password));
  }
  if (check) {
    const accessToken = jwt.sign(
        {username: user.username, role: user.role},
        secrets.accessToken, {
          expiresIn: '30m',
          algorithm: 'HS256',
        });
    console.log({name: user.name, accessToken: accessToken});
    res.status(200).json({name: user.name, accessToken: accessToken});
  } else {
    res.status(401).send('Username or password incorrect');
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
