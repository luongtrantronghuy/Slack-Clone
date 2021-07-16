-- Format of "messages" column.
-- "to" should be empty if not in dm.
-- "thread" column should be an array of messages
-- {
--   "content": "string"
--   "from": "string"
--   "to": "string"
--   "sent-at": "2020-11-17T23:17:19Z"
-- }

DELETE FROM channels;
-- Populate Your Tables Here --
INSERT INTO channels(channel, messages) VALUES ('assignment-1','{"content": "First message in the asgn1 channel!","from": "Adam","to": "","sent-at": "2020-11-17T23:17:19Z"}');
INSERT INTO channels(channel, messages) VALUES ('assignment-2','{"content": "First message in the asgn2 channel!","from": "Eve","to": "","sent-at": "2020-10-17T23:17:19Z"}');
INSERT INTO channels(channel, messages) VALUES ('dm','{"content": "Hi Adam, this is Eve!","from": "Eve","to": "Adam","sent-at": "2020-10-17T23:17:19Z"}');