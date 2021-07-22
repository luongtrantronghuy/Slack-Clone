const db = require('./db');

exports.getUser = async (req, res) => {
  let username = undefined;
  if (Object.keys(req.query).length !== 0) {
    username = req.query.username;
  }
  const user = await db.selectUser(username, req.user.username);
  if (user.length > 0) {
    res.status(200).json(user);
  } else {
    res.status(400).send();
  }
};
