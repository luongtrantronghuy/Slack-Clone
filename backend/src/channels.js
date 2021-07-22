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

function orderMessages(messages) {
  if (messages.length == 0) {
    return messages;
  }
  const sorted = messages.sort((a,b) => new Date(a.sent) - new Date(b.sent));
  const ordered = [];
  let newTime = '';
  for (message of sorted) {
    newTime = '';
    const time = new Date(message.sent);
    let min = time.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    message.sent = time.getHours() + ':' + min;
    const currDate = new Date();
    const day = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
      'Nov', 'Dec'];
    if (day === currDate.getDate() &&
      month === currDate.getMonth() &&
      year === currDate.getFullYear()) {
      newTime = 'Today';
    } else if (year === currDate.getFullYear()) {
      newTime = months[month] + ' ' + day;
    } else {
      newTime = day + ' '+ months[month] + ', ' + year.toString();
    }
    if (ordered.length == 0) {
      ordered.push({time: newTime, messages: [message]});
    } else {
      let found = false;
      for (obj of ordered) {
        if (newTime === obj.time) {
          obj.messages.push(message);
          found = true;
          break;
        }
      }
      if (!found){
        ordered.push({time: newTime, messages: [message]});
      }
    }
  }
  if (ordered.length > 0) {
    return ordered;
  } else {
    return undefined;
  }
};

exports.getMessage = async (req, res) => {
  try {
    const messages = await db.getMessage(req.params.channel, req.query.thread);
    const ordered = orderMessages(messages);
    res.status(200).json(ordered);
  } catch(err) {
    res.status(404).send();
  }
};
