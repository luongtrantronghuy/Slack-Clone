const db = require('./db');

/**
 * Returns all the channels and their messages and thread messages
 * optional query for channel id (which is used to identify thread)
 *
 * @param {*} req
 * @param {*} res
 */
exports.getAll = async (req, res) => {
  const workspaces = await db.getWorkspaces(req.user.access);
  // workspaces[0] is temporary solution
  // should be the current workspace
  const channelList = await db.verifyChannels(workspaces[0].channels, req.user.username);
  if (!channelList) {
    res.status(404).send();
  }
  const channels = await db.selectAllChannels(req.query.channel, channelList);
  if (channels.length == 0) {
    res.status(404).send();
  } else {
    res.status(200).json(channels);
  }
};

/**
 * Add new Message to either a channel
 * or a thread of a message (based on id)
 *
 * @param {*} req
 * @param {*} res
 */
exports.sendMessage = async (req, res) => {
  const message = await db.sendNewMessage(req.body,
      req.params.channel, req.query.thread);
  if (message) {
    res.status(201).json(message[0]);
  } else {
    res.status(400).send();
  }
};

exports.getMessage = async (req, res) => {
  const messages = await db.getMessage(req.params.channel);
  if (messages.length > 0) {
    res.status(200).json(messages);
  } else {
    res.status(404).send();
  }
};
