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
  *
  * @param {string} channel
  * @return {object}
*/
exports.selectAllChannels = async (channel) => {
  let select = 'SELECT id, channel, messages, thread FROM channels';
  if (channel) {
    select += ` WHERE channel = '${channel}'`;
  }
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  const channels = [];
  for (row of rows) {
    console.log(rows);
    if (row.thread[0] != '') { // if thread is empty, ignore
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

exports.selectUser = async (username) => {
  const select = `SELECT username, info, access FROM users WHERE username = '${username}'`
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  if (rows) {
    return {username: rows[0].username, name: rows[0].info.name, access: rows[0].access};
  } else {
    return undefined;
  }
};
