const db = require('./db');

function getTime(sentTime) {
  const currDate = new Date();
    const time = new Date(sentTime);
    let newTime = '';
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
    let min = time.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    newTime = time.getHours() + ':' + min + ' ' + newTime;
    return newTime;
}

function orderMessages(messages, user) {
  if (messages.length == 0) {
    return messages;
  }
  const sorted = messages.sort((a,b) =>
    new Date(a.sent ? a.sent: a.sent_at) - new Date(b.sent ? b.sent : b.send_at));
  const ordered = [];
  let where = '';
  for (message of sorted) {
    const newTime = getTime(message.sent ? message.sent : message.sent_at);
    let to = '';
    if (message.sent_at) {
      if (message.to_user === user) {
        to = message.from_user;
      } else {
        to = message.to_user;
      }
      message.sent_at = newTime;
    } else {
      message.sent = newTime;
    }
    where = (message.to) ? message.to : to;
    if (ordered.length == 0) {
      ordered.push({in: where, messages: [message]});
    } else {
      let found = false;
      for (obj of ordered) {
        if (where === obj.in) {
          obj.messages.push(message);
          found = true;
          break;
        }
      }
      if (!found){
        ordered.push({in: where, messages: [message]});
      }
    }
  }
  if (ordered.length > 0) {
    return ordered;
  } else {
    return undefined;
  }
};

exports.findMessage = async (req, res) => {
  try {
    const workspaces = await db.getWorkspaces(req.user.access, undefined, req.user.username);
    let verifiedList = [];
    for (workspace of workspaces) {
      const verifiedChannels = await db.verifyChannels(workspace.channels, req.user.username);
      verifiedList = verifiedList.concat(verifiedChannels);
    }
    let allChannelMsg = [];
    for (list of verifiedList) {
      const msg = await db.getMessage(list);
      allChannelMsg = allChannelMsg.concat(msg);
    }
    const allDM = await db.getDM(req.user.username, undefined, undefined);
    // Find message with content
    const foundChannel = searchContent(allChannelMsg, req.query.content);
    const foundDM = searchContent(allDM, req.query.content);
    // Reorder the found messages
    const resultDM = orderMessages(foundDM, req.user.username);
    const resultChannel = orderMessages(foundChannel, req.user.username);
    const resultArray = resultChannel.concat(resultDM);
    res.status(200).json(resultArray)
  } catch(err) {
    res.status(404).send();
  }
};

searchContent = (messages, content) => {
  const resultArray = [];
  for (message of messages) {
    const tempThread = [];
    if (message.thread.length > 0) {
      for (threadMsg of message.thread) {
        const found = threadMsg.content.toLowerCase().indexOf(content.toLowerCase());
        if (found > -1) {
          const newTime = getTime(threadMsg.sent ? threadMsg.sent : threadMsg.sent_at);
          if (threadMsg.sent_at) {
            threadMsg.sent_at = newTime;
          } else {
            threadMsg.sent = newTime;
          }
          tempThread.push(threadMsg);
        }
      }
    }
    message.thread = tempThread;
    const found = message.content.toLowerCase().indexOf(content.toLowerCase());
    if (found > -1) {
      message.found = true;
      resultArray.push(message);
    } else if (message.thread.length > 0) {
      message.found = false;
      resultArray.push(message)
    }
  }
  return resultArray;
};
