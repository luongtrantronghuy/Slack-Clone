-- Format of "messages" column.
-- "to" should be empty if not in dm.
-- "thread" column should be an array of strings
-- which would be parsed later as json objects
--
-- {
--   "content": "string"
--   "from": "string"
--   "to": "string"
--   "sent-at": "2020-11-17T23:17:19Z"
-- }

DELETE FROM channels;
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-1','{"content": "First message in the asgn1 channel!","from": "Adam","to": "","sent-at": "2020-11-17T23:17:19Z"}', ARRAY ['{"content": "First message in all threads!","from": "Eve","to": "","sent-at": "2020-11-17T23:17:19Z"}', '{"content": "Second message in the thread!","from": "Eve","to": "","sent-at": "2021-1-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-1','{"content": "Second message in the asgn1 channel!","from": "Eve","to": "","sent-at": "2021-1-17T23:17:19Z"}', ARRAY ['{"content": "This message can have threads too!","from": "Eve","to": "","sent-at": "2021-1-17T23:17:19Z"}', '{"content": "Yes","from": "Adam","to": "","sent-at": "2021-1-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-2','{"content": "First message in the asgn2 channel!","from": "Eve","to": "","sent-at": "2020-10-17T23:17:19Z"}', ARRAY ['{"content": "Thread in assignment-2!","from": "Adam","to": "","sent-at": "2020-10-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('dm','{"content": "Hi Adam, this is Eve!","from": "Eve","to": "Adam","sent-at": "2020-10-17T23:17:19Z"}', ARRAY ['{"content": "hey from thread!","from": "Adam","to": "Eve","sent-at": "2020-11-17T23:17:19Z"}']);

-- User Table --
-- {
--   "name": "string"
--   "user-name": "string"
--   "password": "string"
-- }
DELETE FROM users;
INSERT INTO users(info) VALUES ('{"name": "Adam", "user-name": "adam123", "password": "adam123"}');
INSERT INTO users(info) VALUES ('{"name": "Eve", "user-name": "eve123", "password": "eve123"}');