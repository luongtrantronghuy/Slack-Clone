const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const idRe =
  '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

/**
  * @return {string}
*/
function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = '';
    r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
  * Returns all Messages in a channel (assignment-1, dm, etc.)
  * as well as their corresponding thread messages
  * @param {string} channel
  * @param {*} channelsList
  * @return {object}
*/
exports.selectAllChannels = async (channel, channelsList) => {
  let rowss = [];
  if (channel) {
    const select =
      `SELECT id, channel, messages, thread
      FROM channels WHERE channel='${channel}'`;
    const query = {
      text: select,
    };
    const {rows} = await pool.query(query);
    rowss = rows;
  } else if (channelsList.length > 0) {
    for (allowedChannel of channelsList) {
      const select =
        `SELECT id, channel, messages, thread
        FROM channels WHERE channel = '${allowedChannel}'`;
      const query = {
        text: select,
      };
      const {rows} = await pool.query(query);
      for (row of rows) {
        rowss.push(row);
      }
    }
  } else {
    return undefined;
  }
  const channels = [];
  for (row of rowss) {
    if (row.thread[0] != '') { // if thread is not empty, parse
      row.thread = row.thread.map((msg) => JSON.parse(msg));
    }
    row.messages = {id: row.id, ...row.messages, thread: row.thread};
    if (channels.length == 0) {
      channels.push({name: row.channel, messages: [row.messages]});
    } else {
      let found = false;
      for (channel of channels) {
        if (row.channel == channel.name) {
          channel.messages.push(row.messages);
          found = true;
        }
      }
      if (!found) {
        channels.push({name: row.channel, messages: [row.messages]});
      }
    }
  }
  return channels;
};

/** Get all message object given channel and id of message thread
 * @param {*} channel
 * @param {*} thread
 */
exports.getMessage = async (channel, thread) => {
  let select = `SELECT id, messages, thread FROM channels WHERE`;
  if (thread) {
    select += ` id='${thread}' AND`;
  }
  select += ` channel = '${channel}'`;
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  if (rows.length > 0) {
    const returnArray = [];
    for (row of rows) {
      row.messages.id = row.id;
      tempThread = [];
      for (mess of row.thread) {
        if (mess !== '') {
          const jsonObj = JSON.parse(mess);
          tempThread.push(jsonObj);
        }
      }
      row.messages.thread = tempThread;
      returnArray.push(row.messages);
    }
    if (thread) {
      return tempThread;
    } else {
      return returnArray;
    }
  } else {
    return undefined;
  }
};

/**
 *
 * @param {*} username
 * @return {*}
 */
exports.find = async (username) => {
  const select = `SELECT username, info, access FROM users
    WHERE username = '${username}'`;
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  if (rows.length == 0) {
    return undefined;
  } else {
    return rows[0];
  }
};

/**
 * return message if added sucessfully
 * else return undefined
 *
 * @param {*} body
 * @param {string} channel
 * @param {string} thread
 */
exports.sendNewMessage = async (body, channel, thread) => {
  if (body.content.length > 0) {
    let returnId = '';
    body.sent = new Date();
    if (thread && thread.match(idRe)) { // new message is for thread
      const check = `SELECT id FROM channels WHERE id = '${thread}'`;
      const query1 = {text: check};
      const {rows} = await pool.query(query1);
      if (rows.length > 0) { // if found id of message (thread), UPDATE
        returnId = thread;
        const json = JSON.stringify(body);
        const update = `UPDATE channels SET thread = array_append
            (thread, '${json}') WHERE id = '${thread}'`;
        const query = {
          text: update,
        };
        await pool.query(query);
      } else { // if message id (thread) is not found, return undefined
        return undefined;
      }
    } else { // if thread id not set. new message is for channel
      body.to = channel;
      const newId = createUUID();
      const insert = `INSERT INTO channels(id, channel, messages, thread)
          VALUES ($1, $2, $3, $4)`;
      const query = {
        text: insert,
        values: [newId, channel, body, []],
      };
      await pool.query(query);
      returnId = newId;
    }
    const select1 = `SELECT id, channel, messages, thread
        FROM channels WHERE id = '${returnId}'`;
    const query1 = {text: select1};
    const {rows} = await pool.query(query1);
    rows[0].thread = rows[0].thread.map((x) => JSON.parse(x));
    return rows;
  } else {
    return undefined;
  }
};

exports.selectUser = async (username, currentUser) => {
  let select = `SELECT username, info, access FROM users`;
  if (username) {
    select += ` WHERE username = '${username}'`;
  } else {
    select += ` WHERE username != '${currentUser}'`;
  }
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  if (rows) {
    const returnArray = [];
    for (row of rows) {
      const user = {username: row.username,
        name: row.info.name, access: row.access};
      returnArray.push(user);
    }
    return returnArray;
  } else {
    return undefined;
  }
};

exports.getWorkspaces = async (access, code, username) => {
  const response = [];
  if (code) {
    const select =
      `SELECT title, channels
      FROM workspaces WHERE code = '${code}'`;
    const query = {
      text: select,
    };
    const {rows} = await pool.query(query);
    if (rows.length > 0) {
      response.push({name: rows[0].title, channels: rows[0].channels});
    }
  } else if (access.length > 0) {
    for (code of access) {
      const select =
        `SELECT title, channels
        FROM workspaces WHERE code = '${code}'`;
      const query = {
        text: select,
      };
      const {rows} = await pool.query(query);
      if (rows.length > 0) {
        response.push({name: rows[0].title, channels: rows[0].channels});
      }
    }
  } else {
    return undefined;
  }
  if (response.length > 0) {
    for (channel of response[0].channels) {
      const select =
        `SELECT users
        FROM channelAccess WHERE title = '${channel}'`;
      const query = {
        text: select,
      };
      const {rows} = await pool.query(query);
      let found = false;
      for (row of rows[0].users) {
        if (row === username) {
          found = true;
          break;
        }
      }
      if (!found) {
        const index = response[0].channels.indexOf(channel);
        if (index > -1) {
          response[0].channels.splice(index, 1);
        }
      }
    }
    return response;
  } else {
    return undefined;
  }
};

exports.verifyChannels = async (channelList, username) => {
  const verifiedList = [];
  if (channelList.length > 0) {
    for (channel of channelList) {
      const select =
        `SELECT users
        FROM channelAccess WHERE title = '${channel}'`;
      const query = {
        text: select,
      };
      const {rows} = await pool.query(query);
      if (rows) {
        const users = rows[0].users;
        for (user of users) {
          if (username === user) {
            verifiedList.push(channel);
            break;
          }
        }
      }
    }
    if (verifiedList.length > 0) {
      return verifiedList;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

exports.getDM = async (currUser, user2, thread) => {
  let select =
    'SELECT id, from_user, to_user, content, sent_at, thread FROM dm';
  select += ` WHERE `;
  if (thread) {
    select += `(id= '${thread}')`;
  } else if (user2) {
    select += `((from_user='${currUser}' AND to_user='${user2}')
    OR (from_user='${user2}' AND to_user='${currUser}'))`;
  } else {
    select += `(from_user='${currUser}' OR to_user='${currUser}')`;
  }
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  if (rows) {
    for (row of rows) {
      const tempThread = [];
      for (mess of row.thread) {
        if (mess !== '') {
          const jsonObj = JSON.parse(mess);
          tempThread.push(jsonObj);
        }
      }
      row.thread = tempThread;
    }
    if (thread) {
      return rows[0].thread;
    } else {
      return rows;
    }
  } else {
    return undefined;
  }
};

exports.sendDM = async (currUser, user2, body, thread) => {
  let returnID = '';
  const newDate = new Date().toISOString();
  if (thread && thread.match(idRe)) {
    returnId = thread;
    body.sent_at = newDate;
    body.from_user = currUser;
    body.to_user = user2;
    const json = JSON.stringify(body);
    const update = `UPDATE dm SET thread = array_append
        (thread, '${json}') WHERE id= '${thread}'`;
    const query = {
      text: update,
    };
    await pool.query(query);
    returnID = thread;
  } else {
    const newID = createUUID();
    const insert =
      `INSERT INTO dm(id, from_user, to_user, content, sent_at, thread)
      VALUES ($1, $2, $3, $4, $5, $6)`;
    const query = {
      text: insert,
      values: [newID, currUser, user2, body.content, newDate, []],
    };
    await pool.query(query);
    returnID = newID;
  }
  const select1 = `SELECT id, from_user, to_user, content, sent_at, thread
      FROM dm WHERE id = '${returnID}'`;
  const query1 = {text: select1};
  const {rows} = await pool.query(query1);
  if (rows.length > 0) {
    rows[0].thread = rows[0].thread.map((x) => JSON.parse(x));
    if (thread) {
      return rows[0].thread;
    } else {
      return rows[0];
    }
  } else {
    return undefined;
  }
};
