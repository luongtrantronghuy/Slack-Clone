-- Format of "messages" column.
-- "to" should be empty if not in dm.
-- "thread" column should be an array of strings
-- which would be parsed later as json objects
--
-- {
--   "content": "string"
--   "from": "string"
--   "to": "string"
--   "sent": "2020-11-17T23:17:19Z"
-- }

DELETE FROM channels;
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-1','{"content": "First message in the asgn1 channel!","from": "molly","to": "","sent": "2020-11-17T23:17:19Z"}', ARRAY ['{"content": "First message in all threads!","from": "anna","to": "","sent-at": "2020-11-17T23:17:19Z"}', '{"content": "Second message in the thread!","from": "anna","to": "","sent-at": "2021-1-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-1','{"content": "Second message in the asgn1 channel!","from": "anna","to": "","sent": "2021-1-17T23:17:19Z"}', ARRAY ['{"content": "This message can have threads too!","from": "anna","to": "","sent-at": "2021-1-17T23:17:19Z"}', '{"content": "Yes","from": "molly","to": "","sent-at": "2021-1-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-2','{"content": "First message in the asgn2 channel!","from": "anna","to": "","sent": "2020-10-17T23:17:19Z"}', ARRAY ['{"content": "Thread in assignment-2!","from": "molly","to": "","sent-at": "2020-10-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('dm','{"content": "Hi Molly Member, this is Anna Admin!","from": "anna","to": "molly","sent": "2020-10-17T23:17:19Z"}', ARRAY ['{"content": "hey from thread!","from": "molly","to": "anna","sent-at": "2020-11-17T23:17:19Z"}']);

-- User Table --
-- {
--   "name": "string"
--   "username": "string"
--   "password": "string"
-- }
DELETE FROM users;
INSERT INTO users(username, info) VALUES ('molly', '{"name": "Molly Member", "password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y"}');
INSERT INTO users(username, info) VALUES ('anna', '{"name": "Anna Admin", "password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze"}');

-- DELETE FROM workspaces;
-- INSERT INTO workspaces(name, channels) VALUES ('CSE 183', ARRAY ['assignment-1', 'assignment-2'])