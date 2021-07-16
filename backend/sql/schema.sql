DROP TABLE IF EXISTS channels;
-- Your database schema goes here --
CREATE TABLE channels(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), channel VARCHAR(32), messages jsonb, thread jsonb[]);