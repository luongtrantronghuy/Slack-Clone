const db = require('./db');

exports.getAll = async (req, res) => {
  const channels = await db.selectAllChannels(req.query.channel);
  if (channels.length == 0) {
    res.status(404).send();
  } else {
    if (req.query.from) {
      const newMail = await db.filterFrom(channels, req.query.channel);
      if (newMail) {
        res.status(200).json(newMail);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(200).json(channels);
    }
  }
};