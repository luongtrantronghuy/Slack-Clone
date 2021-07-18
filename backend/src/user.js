const db = require('./db');

exports.getUser = async (req, res) => {
  const user = await db.selectUser(req.user.username);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).send();
  }
};
