DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS workspaces;
DROP TABLE IF EXISTS channelAccess;
DROP TABLE IF EXISTS dm;
-- Your database schema goes here --
CREATE TABLE channels(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), channel VARCHAR(32), messages jsonb, thread text[]);
CREATE TABLE users(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), username VARCHAR(32), info jsonb, access text[]);
CREATE TABLE workspaces(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), code VARCHAR(32), title VARCHAR(32), channels text[]);
CREATE TABLE channelAccess(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(32), users text[]);
CREATE TABLE dm(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), from_user VARCHAR(32), to_user VARCHAR(32), content TEXT, sent_at TEXT, thread text[]);
