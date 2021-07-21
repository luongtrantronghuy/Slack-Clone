const db = require('./db');

function orderMessages(messages) {
  const sorted = messages.sort((a,b) => new Date(a.sent) - new Date(b.sent));
  const ordered = [];
  let newTime = '';
  for (message of sorted) {
    newTime = '';
    const time = new Date(message.sent_at);
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
    const messages = await db.getDM(req.user.username, req.params.username);
    const ordered = orderMessages(messages);
    res.status(200).json(ordered);
  } catch(err) {
    res.status(404).send();
  }
};
