DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS workspaces;
-- Your database schema goes here --
CREATE TABLE channels(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), channel VARCHAR(32), messages jsonb, thread text[]);
CREATE TABLE users(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), username VARCHAR(32), info jsonb, access text[]);
CREATE TABLE workspaces(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), code VARCHAR(32), title VARCHAR(32), channels text[]);