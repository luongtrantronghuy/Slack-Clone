const db = require('./db');

function orderMessages(messages) {
  if (messages.length == 0) {
    return messages;
  }
  const sorted = messages.sort((a,b) => new Date(a.sent_at) - new Date(b.sent_at));
  const ordered = [];
  let newTime = '';
  for (message of sorted) {
    newTime = '';
    const time = new Date(message.sent_at);
    let min = time.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    message.sent_at = time.getHours() + ':' + min;
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

exports.getDM = async (req, res) => {
  try {
    const messages = await db.getDM(req.user.username, req.params.username, req.query.thread);
    const ordered = orderMessages(messages);
    res.status(200).json(ordered);
  } catch(err) {
    res.status(404).send();
  }
};

exports.sendDM = async (req, res) => {
  try{
    const message = await db.sendDM(req.user.username, req.params.username, req.body, req.query.thread);
    res.status(201).json(message);
  } catch(err) {
    res.status(400).send();
  }
};
