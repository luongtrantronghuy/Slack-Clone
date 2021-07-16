DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS users;
-- Your database schema goes here --
CREATE TABLE channels(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), channel VARCHAR(32), messages jsonb);
CREATE TABLE users(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), info jsonb);