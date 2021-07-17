const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

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
    row.thread = row.thread.map(msg => JSON.parse(msg));
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
  let select = `SELECT user-name, password FROM users
    WHERE user-name = ${username}`;
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  if (rows.length == 0) {
    return undefined;
  } else {
    return rows;
  }
};
