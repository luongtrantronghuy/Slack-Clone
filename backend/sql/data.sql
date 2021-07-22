-- Format of "messages" column.
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
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-1','{"content": "First message in the asgn1 channel!","from": "molly","to": "assignment-1","sent": "2020-10-17T23:17:19Z"}', ARRAY ['{"content": "First message in all threads!","from": "anna","to": "","sent": "2020-11-17T23:17:19Z"}', '{"content": "Second message in the thread!","from": "anna","to": "","sent": "2021-01-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-1','{"content": "Second message in the asgn1 channel @anna! This is a long long long long long long long long long long long long long long long long long long long long long long long long long text","from": "anna","to": "assignment-1","sent": "2020-11-17T23:17:19Z"}', ARRAY ['{"content": "This message can have threads too!","from": "anna","to": "","sent": "2021-01-17T23:17:19Z"}', '{"content": "Yes","from": "molly","to": "","sent": "2021-01-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-2','{"content": "First message in the asgn2 channel!","from": "anna","to": "assignment-2","sent": "2020-10-17T23:17:19Z"}', ARRAY ['{"content": "Thread in assignment-2!","from": "molly","to": "","sent": "2020-10-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('assignment-2','{"content": "This message was sent on same day!","from": "anna","to": "assignment-2","sent": "2020-10-17T23:17:19Z"}', ARRAY ['{"content": "Thread in assignment-2 ^^","from": "molly","to": "","sent": "2020-10-17T23:17:19Z"}']);
INSERT INTO channels(channel, messages, thread) VALUES ('different-channel','{"content": "Different Channel","from": "anna","to": "different-channel","sent": "2020-10-17T23:17:19Z"}', ARRAY ['']);

-- User Table --
-- info:
-- {
--   "name": "string"
--   "username": "string"
--   "password": "string"
-- }
DELETE FROM users;
INSERT INTO users(username, info, access) VALUES ('molly', '{"name": "Molly Member", "password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y"}', ARRAY ['cse183']);
INSERT INTO users(username, info, access) VALUES ('mollysister', '{"name": "Molly Sister", "password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y"}', ARRAY ['cse183']);
INSERT INTO users(username, info, access) VALUES ('anna', '{"name": "Anna Admin", "password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze"}', ARRAY ['cse183', 'workspace2']);

DELETE FROM workspaces;
INSERT INTO workspaces(code, title, channels) VALUES ('cse183', 'CSE 183', ARRAY ['assignment-1', 'assignment-2']);
INSERT INTO workspaces(code, title, channels) VALUES ('workspace2', 'A different workspace', ARRAY ['different-channel']);

DELETE FROM channelAccess;
INSERT INTO channelAccess(title, users) VALUES ('assignment-1', ARRAY ['molly', 'anna']);
INSERT INTO channelAccess(title, users) VALUES ('assignment-2', ARRAY ['anna']);
INSERT INTO channelAccess(title, users) VALUES ('different-channel', ARRAY ['anna']);

DELETE FROM dm;
INSERT INTO dm(from_user, to_user, content, sent_at, thread) VALUES ('molly', 'anna', 'Hey! How are you doing?', '2020-10-17T23:17:19Z', ARRAY ['']);
INSERT INTO dm(from_user, to_user, content, sent_at, thread) VALUES ('anna', 'molly', 'Not bad, wbu', '2021-10-17T23:17:19Z', ARRAY ['{"content": "Thread here!","from_user": "anna","to_user": "molly","sent_at": "2020-10-17T23:17:19Z"}', '{"content": "Thread here too!","from_user": "molly","to_user": "anna","sent_at": "2021-10-17T23:17:19Z"}']);
INSERT INTO dm(from_user, to_user, content, sent_at, thread) VALUES ('anna', 'mollysister', 'Hi Molly Sister', '2021-10-17T23:17:19Z', ARRAY ['']);
